const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// The 16 Head Pages
const categories = [
  { slug: 'natural-features-head', url: 'https://listthemountain.org/natural-features-head' },
  { slug: 'tourist-destinations', url: 'https://listthemountain.org/tourist-destinations' },
  { slug: 'indigenous-head', url: 'https://listthemountain.org/indigenous-head' },
  { slug: 'work-sites', url: 'https://listthemountain.org/work-sites' },
  { slug: 'science-head', url: 'https://listthemountain.org/science-head' },
  { slug: 'adventure-point', url: 'https://listthemountain.org/adventure-point' },
  { slug: 'walking-tracks', url: 'https://listthemountain.org/walking-tracks' },
  { slug: 'mountain-huts-head', url: 'https://listthemountain.org/mountain-huts-head' },
  { slug: 'shelters-head', url: 'https://listthemountain.org/shelters-head' },
  { slug: 'political-flashpoints-head', url: 'https://listthemountain.org/political-flashpoints-head' },
  { slug: 'ceremonial-grounds-head', url: 'https://listthemountain.org/ceremonial-grounds-head' },
  { slug: 'pure-springs-head', url: 'https://listthemountain.org/pure-springs-head' },
  { slug: 'landscapes', url: 'https://listthemountain.org/landscapes' },
  { slug: 'living-wonders-head', url: 'https://listthemountain.org/living-wonders-head' },
  { slug: 'mind-fields-head', url: 'https://listthemountain.org/mind-fields-head' },
  { slug: 'new-page', url: 'https://listthemountain.org/new-page' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const SCRAPED_DIR = path.join(__dirname, '..', 'scraped-content');
const NAV_PATTERN = /about\s*us|contact\s*us|search|media/i;

function slugify(text) {
  return String(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

/** Fallback: get article URLs from content.json when HTML has no links (JS-rendered site). */
function getLinksFromContentJson(categorySlug) {
  const contentPath = path.join(SCRAPED_DIR, categorySlug, 'content.json');
  if (!fs.existsSync(contentPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    const images = data.images || [];
    const links = [];
    let start = 1;
    if (images.length > 1 && images[0].src === images[1].src) start = 2;
    const seen = new Set();
    for (let i = start; i < images.length; i++) {
      const img = images[i];
      const text = (img?.alt || '').trim();
      if (!text || /list\s*the\s*mountain/i.test(text) || NAV_PATTERN.test(text)) continue;
      const slug = slugify(text);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      links.push(`https://listthemountain.org/${categorySlug}/${slug}`);
    }
    return links;
  } catch {
    return [];
  }
}

async function run() {
  for (const cat of categories) {
    console.log(`\n--- Processing Category: ${cat.slug} ---`);

    let realLinks = [];
    try {
      const { data } = await axios.get(cat.url, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0' } });
      const $ = cheerio.load(data);

      $('.sqs-block-image a, .sqs-gallery-design-grid-slide a, a[href*="/' + cat.slug + '/"]').each((i, el) => {
        const href = $(el).attr('href');
        if (href && !href.includes('squarespace.com') && !href.startsWith('#')) {
          const fullUrl = href.startsWith('http') ? href : `https://listthemountain.org${href.startsWith('/') ? href : '/' + href}`;
          if (fullUrl.includes(`/${cat.slug}/`) && fullUrl !== cat.url) realLinks.push(fullUrl);
        }
      });

      realLinks = [...new Set(realLinks)];
      if (realLinks.length === 0) {
        realLinks = getLinksFromContentJson(cat.slug);
        if (realLinks.length > 0) console.log(`(No links in HTML; using ${realLinks.length} URLs from content.json)`);
      }
      console.log(`Found ${realLinks.length} article link(s).`);
    } catch (e) {
      console.error(`Failed to load category ${cat.url}: ${e.message}`);
      realLinks = getLinksFromContentJson(cat.slug);
      if (realLinks.length > 0) console.log(`Using ${realLinks.length} URLs from content.json.`);
    }

    if (realLinks.length === 0) {
      console.log(`  No article links. Skipping.`);
      continue;
    }

    const dir = path.join(SCRAPED_DIR, cat.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const articleUrl of realLinks) {
      if (articleUrl === cat.url || articleUrl === 'https://listthemountain.org/') continue;

      const slug = articleUrl.split('?')[0].split('/').filter(Boolean).pop() || 'article';
      const savePath = path.join(dir, `${slug}.json`);

      try {
        console.log(`  Scraping: ${slug}...`);
        const { data: articleData } = await axios.get(articleUrl, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0' } });
        const $a = cheerio.load(articleData);

        const title = $a('h1').first().text().trim();
        const contentHtml = $a('.sqs-block-html .sqs-block-content').html() || '';
        const paragraphs = [];
        $a('.sqs-block-html p').each((i, el) => paragraphs.push($a(el).text().trim()));

        const images = [];
        $a('article img, main img, .sqs-block-content img').each((i, el) => {
          const src = $a(el).attr('src') || $a(el).attr('data-src');
          if (src) images.push({ src: src.startsWith('http') ? src : `https://listthemountain.org${src}`, alt: ($a(el).attr('alt') || '').trim() });
        });

        if (!title) {
          console.log(`  Skip (no title): ${slug}`);
          continue;
        }

        const json = { url: articleUrl, title, contentHtml, paragraphs, images };
        fs.writeFileSync(savePath, JSON.stringify(json, null, 2));
        console.log(`  Saved ${slug}.json`);
      } catch (e) {
        const is404 = e.response?.status === 404 || /404/.test(e.message);
        if (is404) {
          const titleFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          const json = { url: articleUrl, title: titleFromSlug, contentHtml: '', paragraphs: [], images: [], _placeholder: true };
          fs.writeFileSync(savePath, JSON.stringify(json, null, 2));
          console.log(`  404 → placeholder ${slug}.json`);
        } else {
          console.error(`  Failed ${articleUrl}: ${e.message}`);
        }
      }
      await sleep(500);
    }
  }
  console.log('\n--- Deep scrape v2 complete ---');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
