/**
 * Content scraper for listthemountain.org
 * Fetches each URL, extracts headings, paragraphs, and images,
 * then saves structured JSON into scraped-content/<slug>/content.json
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://listthemountain.org';

const urls = [
  'https://listthemountain.org/natural-features-head',
  'https://listthemountain.org/tourist-destinations',
  'https://listthemountain.org/indigenous-head',
  'https://listthemountain.org/work-sites',
  'https://listthemountain.org/science-head',
  'https://listthemountain.org/living-wonders-head',
  'https://listthemountain.org/adventure-point',
  'https://listthemountain.org/walking-tracks',
  'https://listthemountain.org/mountain-huts-head',
  'https://listthemountain.org/shelters-head',
  'https://listthemountain.org/landscapes',
  'https://listthemountain.org/mind-fields-head',
  'https://listthemountain.org/political-flashpoints-head',
  'https://listthemountain.org/ceremonial-grounds-head',
  'https://listthemountain.org/pure-springs-head',
  'https://listthemountain.org/new-page',
];

const SCRAPED_DIR = path.join(__dirname, 'scraped-content');

/**
 * Derive folder name from URL path (e.g. /natural-features-head -> natural-features-head)
 */
function getSlug(url) {
  try {
    const parsed = new URL(url);
    const slug = parsed.pathname.replace(/^\/|\/$/g, '') || 'index';
    return slug;
  } catch {
    return url.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-');
  }
}

/**
 * Resolve image src to absolute URL
 */
function resolveImageSrc(src, pageUrl) {
  if (!src || typeof src !== 'string') return null;
  const trimmed = src.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  try {
    return new URL(trimmed, pageUrl).href;
  } catch {
    return new URL(trimmed, BASE_URL).href;
  }
}

/**
 * Scrape one page and return structured data
 */
async function scrapePage(url) {
  const slug = getSlug(url);
  const dirPath = path.join(SCRAPED_DIR, slug);

  console.log(`Scraping: ${url} -> ${dirPath}`);

  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ListTheMountain-Scraper/1.0)',
      Accept: 'text/html',
    },
    maxRedirects: 5,
    validateStatus: (status) => status >= 200 && status < 400,
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const pageTitle = ($('title').text() || '').trim();

  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  const paragraphs = [];
  $('p').each((_, el) => {
    const text = $(el).text().trim();
    if (text) paragraphs.push(text);
  });

  const images = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    const fullSrc = resolveImageSrc(src, url);
    if (fullSrc) {
      images.push({ src: fullSrc });
    }
  });

  const data = {
    url,
    pageTitle,
    content: {
      headings,
      paragraphs,
    },
    images,
  };

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const jsonPath = path.join(dirPath, 'content.json');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  -> ${jsonPath}`);
  return { slug, url, success: true };
}

async function main() {
  if (!fs.existsSync(SCRAPED_DIR)) {
    fs.mkdirSync(SCRAPED_DIR, { recursive: true });
  }

  const results = [];
  for (const url of urls) {
    try {
      const result = await scrapePage(url);
      results.push(result);
    } catch (err) {
      console.error(`Failed: ${url}`, err.message);
      results.push({ slug: getSlug(url), url, success: false, error: err.message });
    }
  }

  const ok = results.filter((r) => r.success).length;
  const fail = results.filter((r) => !r.success).length;
  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`);
  if (fail > 0) {
    results.filter((r) => !r.success).forEach((r) => console.log(`  - ${r.url}: ${r.error}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
