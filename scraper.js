/**
 * Content scraper for listthemountain.org (JavaScript-rendered site)
 * Uses Puppeteer to load each page, wait for content to render, then extracts
 * headings, paragraphs, blockquotes, and images into scraped-content/<slug>/content.json
 */

const puppeteer = require('puppeteer');
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

function getSlug(url) {
  try {
    const parsed = new URL(url);
    const slug = parsed.pathname.replace(/^\/|\/$/g, '') || 'index';
    return slug;
  } catch {
    return url.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-');
  }
}

function getChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  if (process.platform === 'darwin') {
    const paths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      (process.env.HOME || '') + '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ];
    for (const p of paths) {
      if (p && fs.existsSync(p)) return p;
    }
  }
  return undefined;
}

/**
 * Normalize image URL to original (Squarespace: add format=original)
 */
function toOriginalImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    const u = new URL(url.startsWith('http') ? url : new URL(url, BASE_URL).href);
    if (u.hostname === 'images.squarespace-cdn.com' || u.hostname.endsWith('.squarespace-cdn.com')) {
      u.searchParams.set('format', 'original');
      return u.toString();
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Scrape one page using Puppeteer (full JS-rendered DOM)
 */
async function scrapePage(page, url) {
  const slug = getSlug(url);
  const dirPath = path.join(SCRAPED_DIR, slug);

  console.log(`Scraping: ${url} -> ${dirPath}`);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  const data = await page.evaluate((baseUrl) => {
    const resolve = (src) => {
      if (!src || !src.trim()) return null;
      const s = src.trim();
      if (s.startsWith('http://') || s.startsWith('https://')) return s;
      if (s.startsWith('//')) return 'https:' + s;
      try {
        return new URL(s, baseUrl).href;
      } catch {
        return new URL(s, baseUrl).href;
      }
    };

    const pageTitle = (document.querySelector('title') && document.title) ? document.title.trim() : '';

    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (text) headings.push(text);
    });

    const paragraphs = [];
    document.querySelectorAll('p').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (text) paragraphs.push(text);
    });

    const blockquotes = [];
    document.querySelectorAll('blockquote').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (text) blockquotes.push(text);
    });

    const images = [];
    document.querySelectorAll('img').forEach((el) => {
      const src = el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('data-srcset')?.split(/\s+/)[0];
      const fullSrc = resolve(src);
      if (fullSrc) {
        images.push({
          src: fullSrc,
          alt: (el.getAttribute('alt') || '').trim(),
        });
      }
    });

    document.querySelectorAll('[style*="background-image"]').forEach((el) => {
      const style = el.getAttribute('style') || '';
      const match = style.match(/url\s*\(\s*['"]?([^'")]+)['"]?\s*\)/);
      if (match && match[1]) {
        const fullSrc = resolve(match[1].trim());
        if (fullSrc && !images.some((i) => i.src === fullSrc)) {
          images.push({ src: fullSrc, alt: '' });
        }
      }
    });

    document.querySelectorAll('[data-background-image]').forEach((el) => {
      const href = resolve(el.getAttribute('data-background-image'));
      if (href && !images.some((i) => i.src === href)) {
        images.push({ src: href, alt: '' });
      }
    });

    return {
      url: window.location.href,
      pageTitle,
      content: {
        headings,
        paragraphs,
        blockquotes,
      },
      images,
    };
  }, BASE_URL);

  data.url = url;
  data.images = data.images.map((img) => ({
    src: toOriginalImageUrl(img.src),
    alt: img.alt || '',
  }));

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const jsonPath = path.join(dirPath, 'content.json');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  const c = data.content;
  console.log(`  -> ${jsonPath} (${c.headings.length} headings, ${c.paragraphs.length} paragraphs, ${c.blockquotes.length} blockquotes, ${data.images.length} images)`);
  return { slug, url, success: true };
}

async function main() {
  if (!fs.existsSync(SCRAPED_DIR)) {
    fs.mkdirSync(SCRAPED_DIR, { recursive: true });
  }

  const executablePath = getChromePath();
  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };
  if (executablePath) launchOpts.executablePath = executablePath;

  let browser;
  try {
    browser = await puppeteer.launch(launchOpts);
  } catch (err) {
    if (/Could not find Chrome|Failed to launch/i.test(err.message)) {
      console.error('\nPuppeteer could not find Chrome. Run: npm run install:browser\n');
      throw err;
    }
    throw err;
  }

  const results = [];
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    for (const url of urls) {
      try {
        const result = await scrapePage(page, url);
        results.push(result);
      } catch (err) {
        console.error(`Failed: ${url}`, err.message);
        results.push({ slug: getSlug(url), url, success: false, error: err.message });
      }
    }
  } finally {
    await browser.close();
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
