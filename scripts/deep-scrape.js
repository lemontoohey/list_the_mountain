/**
 * Deep scrape: fetch "Head" category pages, discover child article URLs,
 * then scrape each article and save to scraped-content/[category-slug]/[article-slug].json
 *
 * Uses axios + cheerio. Adds delay between requests. Handles errors gracefully.
 * On 404, writes a placeholder JSON (title + image from content.json) so app routes have data.
 *
 * Usage:
 *   node scripts/deep-scrape.js              # Fetch live site; on 404 write placeholder
 *   node scripts/deep-scrape.js --placeholders-only   # No network; generate all placeholders from content.json
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://listthemountain.org';
const DELAY_MS = 2000;
const SCRAPED_DIR = path.join(__dirname, '..', 'scraped-content');

const categories = [
  'https://listthemountain.org/natural-features-head',
  'https://listthemountain.org/tourist-destinations',
  'https://listthemountain.org/indigenous-head',
  'https://listthemountain.org/work-sites',
  'https://listthemountain.org/science-head',
  'https://listthemountain.org/adventure-point',
  'https://listthemountain.org/walking-tracks',
  'https://listthemountain.org/mountain-huts-head',
  'https://listthemountain.org/shelters-head',
  'https://listthemountain.org/political-flashpoints-head',
  'https://listthemountain.org/ceremonial-grounds-head',
  'https://listthemountain.org/pure-springs-head',
];

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Get category slug from URL (e.g. natural-features-head) */
function getCategorySlug(url) {
  try {
    const p = new URL(url).pathname.replace(/^\/|\/$/g, '');
    return p || 'unknown';
  } catch {
    return 'unknown';
  }
}

/** Get article slug from URL (last path segment) */
function getArticleSlug(url) {
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || 'index';
  } catch {
    return 'index';
  }
}

/** Slugify text for fallback URL building */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/** Resolve URL relative to base */
function resolveUrl(href, base) {
  if (!href || !href.trim()) return null;
  const s = href.trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  try {
    return new URL(s, base).href;
  } catch {
    return null;
  }
}

/** Normalize image URL to original (Squarespace) */
function toOriginalImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    const u = new URL(url.startsWith('http') ? url : new URL(url, BASE_URL).href);
    if (u.hostname.includes('squarespace-cdn.com')) {
      u.searchParams.set('format', 'original');
      return u.toString();
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * From a Head page HTML, find links that point to child articles:
 * same path prefix + one more segment (e.g. /natural-features-head/fern-gully)
 */
function getChildLinksFromHtml(html, categoryUrl) {
  const $ = cheerio.load(html);
  const basePath = new URL(categoryUrl).pathname.replace(/^\//, '').replace(/\/$/, '');
  const basePathWithSlash = `/${basePath}/`;
  const seen = new Set();
  const links = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const full = resolveUrl(href, categoryUrl);
    if (!full) return;
    try {
      const u = new URL(full);
      if (u.origin !== new URL(BASE_URL).origin) return;
      const pathname = u.pathname;
      if (!pathname.startsWith(basePathWithSlash)) return;
      const rest = pathname.slice(basePathWithSlash.length);
      if (!rest || rest.includes('/')) return; // single segment only
      if (seen.has(full)) return;
      seen.add(full);
      links.push(full);
    } catch {
      // ignore
    }
  });

  return links;
}

/** Nav/junk heading patterns to never use as article slugs */
const NAV_PATTERN = /about\s*us|contact\s*us|search|media/i;

/**
 * Fallback: build child URLs from content.json using image alts (content images only).
 * Index 0 = hero; skip duplicate logo at 1 if same src as 0; rest = section images → use alt as slug.
 */
function getChildLinksFromContentJson(categorySlug) {
  const items = getChildArticlesFromContentJson(categorySlug);
  return items.map(({ slug }) => `${BASE_URL}/${categorySlug}/${slug}`);
}

/**
 * Get list of { slug, title, image } for each content article from content.json.
 * Used for placeholder generation (no network).
 */
function getChildArticlesFromContentJson(categorySlug) {
  const contentPath = path.join(SCRAPED_DIR, categorySlug, 'content.json');
  if (!fs.existsSync(contentPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    const images = data.images || [];
    const headings = data.content?.headings || data.headings || [];
    const items = [];
    const seen = new Set();

    let startIndex = 1;
    if (images.length > 1 && images[0].src === images[1].src) startIndex = 2;

    for (let i = startIndex; i < images.length; i++) {
      const img = images[i];
      const text = (img?.alt || headings[i] || '').trim();
      if (!text) continue;
      if (/list\s*the\s*mountain/i.test(text)) continue;
      if (NAV_PATTERN.test(text)) continue;
      const slug = slugify(text);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      items.push({
        slug,
        title: text,
        image: img ? { src: toOriginalImageUrl(img.src), alt: (img.alt || text).trim() } : null,
      });
    }
    return items;
  } catch {
    return [];
  }
}

/** Build placeholder article JSON (when live site returns 404 or --placeholders-only). */
function buildPlaceholderArticle(articleUrl, slug, title, image) {
  return {
    url: articleUrl,
    pageTitle: title,
    mainHeading: title,
    date: '',
    content: {
      paragraphs: [],
      lists: [],
      blockquotes: [],
    },
    images: image ? [image] : [],
    _placeholder: true,
  };
}

/**
 * Scrape one article page: extract h1, date, body (p, lists, blockquotes), images
 */
function extractArticleContent(html, articleUrl) {
  const $ = cheerio.load(html);

  const mainHeading = $('h1').first().text().trim() || '';

  let date = '';
  $('time[datetime]').each((_, el) => {
    const d = $(el).attr('datetime') || $(el).text().trim();
    if (d) date = d;
  });
  if (!date) {
    const dateEl = $('[class*="date"], .published, .post-date').first();
    if (dateEl.length) date = dateEl.text().trim();
  }

  const paragraphs = [];
  $('article p, main p, .content p, .post-body p, [class*="body"] p, .sqs-block-content p').each(
    (_, el) => {
      const t = $(el).text().trim();
      if (t) paragraphs.push(t);
    }
  );
  if (paragraphs.length === 0) $('p').each((_, el) => {
    const t = $(el).text().trim();
    if (t) paragraphs.push(t);
  });

  const lists = [];
  $('article ul, article ol, main ul, main ol, .content ul, .content ol, .post-body ul, .post-body ol').each(
    (_, el) => {
      const items = [];
      $(el)
        .find('li')
        .each((_, li) => {
          const t = $(li).text().trim();
          if (t) items.push(t);
        });
      if (items.length) lists.push({ type: $(el).prop('tagName')?.toLowerCase() || el.name || 'ul', items });
    }
  );
  if (lists.length === 0) {
    $('ul, ol').each((_, el) => {
      const items = [];
      $(el)
        .find('li')
        .each((_, li) => {
          const t = $(li).text().trim();
          if (t) items.push(t);
        });
      if (items.length) lists.push({ type: $(el).prop('tagName')?.toLowerCase() || el.name || 'ul', items });
    });
  }

  const blockquotes = [];
  $('article blockquote, main blockquote, .content blockquote, .post-body blockquote, blockquote').each(
    (_, el) => {
      const t = $(el).text().trim();
      if (t) blockquotes.push(t);
    }
  );

  const images = [];
  $('article img, main img, .content img, .post-body img, .sqs-block-content img').each((_, el) => {
    const src =
      $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-srcset')?.split(/\s+/)[0];
    const full = src ? resolveUrl(src, articleUrl) : null;
    if (full)
      images.push({
        src: toOriginalImageUrl(full),
        alt: ($(el).attr('alt') || '').trim(),
      });
  });
  if (images.length === 0)
    $('img').each((_, el) => {
      const src =
        $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-srcset')?.split(/\s+/)[0];
      const full = src ? resolveUrl(src, articleUrl) : null;
      if (full)
        images.push({
          src: toOriginalImageUrl(full),
          alt: ($(el).attr('alt') || '').trim(),
        });
    });

  return {
    url: articleUrl,
    pageTitle: $('title').first().text().trim() || mainHeading,
    mainHeading,
    date,
    content: {
      paragraphs,
      lists,
      blockquotes,
    },
    images,
  };
}

async function fetchWithRetry(url, retries = 2) {
  const ua =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await axios.get(url, {
        timeout: 15000,
        maxRedirects: 5,
        validateStatus: (s) => s >= 200 && s < 400,
        headers: { 'User-Agent': ua },
        responseType: 'text',
      });
      return res.data;
    } catch (err) {
      if (i === retries) throw err;
      await delay(1000 * (i + 1));
    }
  }
}

/** Write placeholder article JSON from content.json data (no network). */
function runPlaceholdersOnly() {
  if (!fs.existsSync(SCRAPED_DIR)) fs.mkdirSync(SCRAPED_DIR, { recursive: true });

  let total = 0;
  for (const categoryUrl of categories) {
    const categorySlug = getCategorySlug(categoryUrl);
    const categoryDir = path.join(SCRAPED_DIR, categorySlug);
    if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

    const articles = getChildArticlesFromContentJson(categorySlug);
    if (articles.length === 0) continue;

    console.log(`\n--- ${categorySlug}: ${articles.length} placeholder(s) ---`);
    for (const { slug, title, image } of articles) {
      const articleUrl = `${BASE_URL}/${categorySlug}/${slug}`;
      const data = buildPlaceholderArticle(articleUrl, slug, title, image);
      const outPath = path.join(categoryDir, `${slug}.json`);
      fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  OK ${slug}.json`);
      total++;
    }
  }
  console.log(`\n--- Done. Wrote ${total} placeholder article(s). ---`);
}

async function main() {
  const placeholdersOnly = process.argv.includes('--placeholders-only');
  if (placeholdersOnly) {
    runPlaceholdersOnly();
    return;
  }

  if (!fs.existsSync(SCRAPED_DIR)) {
    fs.mkdirSync(SCRAPED_DIR, { recursive: true });
  }

  const failed = [];
  let totalSaved = 0;
  const articleInfosByCategory = new Map(); // categorySlug -> getChildArticlesFromContentJson(...)

  for (const categoryUrl of categories) {
    const categorySlug = getCategorySlug(categoryUrl);
    const categoryDir = path.join(SCRAPED_DIR, categorySlug);
    if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

    console.log(`\n--- Category: ${categorySlug} (${categoryUrl}) ---`);

    let articleUrls = [];

    try {
      const html = await fetchWithRetry(categoryUrl);
      await delay(DELAY_MS);
      articleUrls = getChildLinksFromHtml(html, categoryUrl);
      if (articleUrls.length === 0) {
        articleUrls = getChildLinksFromContentJson(categorySlug);
        if (articleUrls.length > 0)
          console.log(`  (using ${articleUrls.length} URLs from content.json fallback)`);
      }
      if (articleUrls.length > 0) console.log(`  Found ${articleUrls.length} article link(s).`);
    } catch (err) {
      console.error(`  Failed to fetch head page: ${err.message}`);
      articleUrls = getChildLinksFromContentJson(categorySlug);
      if (articleUrls.length > 0)
        console.log(`  Using ${articleUrls.length} URLs from content.json fallback.`);
    }

    const articles = getChildArticlesFromContentJson(categorySlug);
    articleInfosByCategory.set(categorySlug, articles);

    if (articleUrls.length === 0) {
      console.log(`  No article URLs to scrape. Skipping.`);
      continue;
    }

    for (const articleUrl of articleUrls) {
      const articleSlug = getArticleSlug(articleUrl);
      const outPath = path.join(categoryDir, `${articleSlug}.json`);

      try {
        const html = await fetchWithRetry(articleUrl);
        await delay(DELAY_MS);
        const data = extractArticleContent(html, articleUrl);
        fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
        const c = data.content;
        console.log(
          `  OK ${articleSlug}.json (h1, ${c.paragraphs.length} p, ${c.lists.length} lists, ${c.blockquotes.length} blockquotes, ${data.images.length} images)`
        );
        totalSaved++;
      } catch (err) {
        const is404 = err.response?.status === 404 || /status code 404/.test(err.message);
        const infos = articleInfosByCategory.get(categorySlug) || [];
        const info = infos.find((a) => a.slug === articleSlug);
        if (is404 && info) {
          const placeholder = buildPlaceholderArticle(articleUrl, articleSlug, info.title, info.image);
          fs.writeFileSync(outPath, JSON.stringify(placeholder, null, 2), 'utf8');
          console.log(`  404 → placeholder ${articleSlug}.json`);
          totalSaved++;
        } else {
          console.error(`  FAIL ${articleUrl}: ${err.message}`);
          failed.push({ url: articleUrl, error: err.message });
        }
      }
    }
  }

  console.log(`\n--- Done. Saved ${totalSaved} article(s). Failed: ${failed.length} ---`);
  if (failed.length > 0) {
    failed.forEach(({ url, error }) => console.log(`  - ${url}\n    ${error}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
