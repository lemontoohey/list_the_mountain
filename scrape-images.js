/**
 * Scrape the original URL of every photo on listthemountain.org
 * Uses Puppeteer to run the site's JS, collects all img + background-image URLs,
 * then normalizes Squarespace CDN URLs to ?format=original and saves a deduplicated list.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://listthemountain.org';

const urls = [
  'https://listthemountain.org/',
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
 * Convert a Squarespace (or any) image URL to its original/full-size form.
 * Squarespace: add or set format=original to get the uploaded resolution.
 */
function toOriginalUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed.startsWith('http') ? trimmed : new URL(trimmed, BASE_URL).href);
    // Squarespace CDN: request original size
    if (u.hostname === 'images.squarespace-cdn.com' || u.hostname.endsWith('.squarespace-cdn.com')) {
      u.searchParams.set('format', 'original');
      return u.toString();
    }
    // Other URLs: strip common resize/quality params to get canonical "original" if desired
    // (optional: u.searchParams.delete('w'); u.searchParams.delete('h'); etc.)
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * Resolve relative or protocol-relative src to absolute URL
 */
function resolveSrc(src, pageUrl) {
  if (!src || !src.trim()) return null;
  const s = src.trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('//')) return 'https:' + s;
  try {
    return new URL(s, pageUrl).href;
  } catch {
    return new URL(s, BASE_URL).href;
  }
}

/**
 * Prefer system Chrome/Chromium so the script works without running
 * `npx puppeteer browsers install chrome` first.
 */
function getChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  if (process.platform === 'darwin') {
    const paths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      process.env.HOME + '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ];
    const fs = require('fs');
    for (const p of paths) {
      if (p && fs.existsSync(p)) return p;
    }
  }
  return undefined;
}

async function main() {
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
      console.error('\nPuppeteer could not find Chrome. Run one of:\n');
      console.error('  npx puppeteer browsers install chrome\n');
      console.error('  (or install Google Chrome from https://www.google.com/chrome/)\n');
      throw err;
    }
    throw err;
  }

  const imageToPages = new Map(); // originalUrl -> [pageUrl, ...]
  const imageToAlt = new Map();   // originalUrl -> alt (first seen)

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    for (const url of urls) {
      console.log(`Loading: ${url}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.evaluate(() => new Promise((r) => setTimeout(r, 2000)));
      } catch (e) {
        console.warn(`  Failed to load: ${e.message}`);
        continue;
      }

      const pageUrl = page.url();
      const collected = await page.evaluate((baseUrl) => {
        const out = [];
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

        document.querySelectorAll('img').forEach((el) => {
          const src = el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('data-srcset')?.split(/\s+/)[0];
          const href = resolve(src);
          if (href) out.push({ href, alt: (el.getAttribute('alt') || '').trim() });
        });

        document.querySelectorAll('[style*="background-image"]').forEach((el) => {
          const style = (el.getAttribute('style') || '').trim();
          const m = style.match(/url\s*\(\s*['"]?([^'")]+)['"]?\s*\)/);
          if (m && m[1]) {
            const href = resolve(m[1].trim());
            if (href) out.push({ href, alt: '' });
          }
        });

        document.querySelectorAll('[data-background-image]').forEach((el) => {
          const href = resolve(el.getAttribute('data-background-image'));
          if (href) out.push({ href, alt: '' });
        });

        return out;
      }, BASE_URL);

      for (const { href, alt } of collected) {
        const original = toOriginalUrl(href);
        if (!original) continue;
        if (!imageToPages.has(original)) {
          imageToPages.set(original, []);
          if (alt) imageToAlt.set(original, alt);
        }
        const pages = imageToPages.get(original);
        if (!pages.includes(pageUrl)) pages.push(pageUrl);
      }
    }

    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }

  const images = Array.from(imageToPages.entries()).map(([originalUrl, seenOnPages]) => ({
    originalUrl,
    alt: imageToAlt.get(originalUrl) || '',
    seenOnPages,
  }));

  fs.mkdirSync(SCRAPED_DIR, { recursive: true });
  const outPath = path.join(SCRAPED_DIR, 'all-images.json');
  fs.writeFileSync(outPath, JSON.stringify({ scrapedAt: new Date().toISOString(), count: images.length, images }, null, 2), 'utf8');
  console.log(`\nWrote ${images.length} original image URLs to ${outPath}`);

  const flatListPath = path.join(SCRAPED_DIR, 'all-image-urls.txt');
  fs.writeFileSync(flatListPath, images.map((i) => i.originalUrl).join('\n'), 'utf8');
  console.log(`Wrote URL list to ${flatListPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
