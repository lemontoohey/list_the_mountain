const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

/**
 * Map sitemap URL path segment (no -head suffix) → our scraped-content folder name.
 * Live site uses: natural-features, destinations, mountain-huts, tracks, indigenous, etc.
 */
const SITEMAP_CATEGORY_TO_OUR_FOLDER = {
  "natural-features": "natural-features-head",
  destinations: "tourist-destinations",
  "mountain-huts": "mountain-huts-head",
  tracks: "walking-tracks",
  indigenous: "indigenous-head",
  "work-sites": "work-sites",
  "work-places": "work-sites",
  science: "science-head",
  adventure: "adventure-point",
  adventures: "adventure-point",
  shelters: "shelters-head",
  political: "political-flashpoints-head",
  "political-flashpoints": "political-flashpoints-head",
  ceremonial: "ceremonial-grounds-head",
  "ceremonial-grounds": "ceremonial-grounds-head",
  water: "pure-springs-head",
  "water-features": "pure-springs-head",
  landscapes: "landscapes",
  artistic: "landscapes",
  "living-wonders": "living-wonders-head",
  "mind-fields": "mind-fields-head",
  "new-page": "new-page",
  geoheritage: "new-page",
  hcc: "new-page",
  nominations: "new-page",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log("Fetching sitemap...");
  try {
    const { data: xml } = await axios.get("https://listthemountain.org/sitemap.xml", {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; listthemountain-rebuild)" },
    });
    const $ = cheerio.load(xml, { xmlMode: true });

    const urls = [];
    $("loc").each((i, el) => {
      urls.push($(el).text().trim());
    });

    console.log(`Found ${urls.length} total URLs in sitemap.`);

    const scrapedDir = path.join(__dirname, "..", "scraped-content");
    let scraped = 0;
    const skippedCategories = new Set();

    for (const url of urls) {
      const pathname = new URL(url).pathname;
      const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
      if (segments.length < 2) continue;

      const sitemapCategory = segments[0];
      const slug = segments[segments.length - 1];
      const ourFolder = SITEMAP_CATEGORY_TO_OUR_FOLDER[sitemapCategory];

      if (!ourFolder) {
        skippedCategories.add(sitemapCategory);
        continue;
      }

      console.log(`Scraping: [${ourFolder}] ${slug}`);

        try {
          const { data: html } = await axios.get(url, {
            timeout: 15000,
            headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0" },
          });
          const $page = cheerio.load(html);

          const title = $page("h1").first().text().trim();
          const paragraphs = [];
          $page(".sqs-block-html p").each((i, el) => {
            const text = $page(el).text().trim();
            if (text) paragraphs.push(text);
          });

          const images = [];
          $page("article img, main img, .sqs-block-content img").each((i, el) => {
            const src = $page(el).attr("data-src") || $page(el).attr("src");
            if (src) {
              const full = src.startsWith("http") ? src : `https://listthemountain.org${src.startsWith("/") ? src : "/" + src}`;
              images.push({ src: full, alt: ($page(el).attr("alt") || "").trim() });
            }
          });

          if (title) {
            const savePath = path.join(scrapedDir, ourFolder, `${slug}.json`);
            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(
              savePath,
              JSON.stringify(
                { url, title, paragraphs, images },
                null,
                2
              ),
              "utf8"
            );
            scraped++;
          }
        } catch (e) {
          console.error(`  Error: ${e.message}`);
        }

        await sleep(500);
    }

    if (skippedCategories.size > 0) {
      console.log(`\nSkipped (no mapping): ${[...skippedCategories].sort().join(", ")}`);
    }
    console.log(`\nDone. Scraped ${scraped} article(s).`);
  } catch (e) {
    console.error("Sitemap error:", e.message);
    process.exit(1);
  }
}

run();
