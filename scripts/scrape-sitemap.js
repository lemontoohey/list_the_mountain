const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const CATEGORY_MAP = {
  "natural-features-head": "natural-features-head",
  "tourist-destinations": "tourist-destinations",
  "indigenous-head": "indigenous-head",
  "work-sites": "work-sites",
  "science-head": "science-head",
  "adventure-point": "adventure-point",
  "walking-tracks": "walking-tracks",
  "mountain-huts-head": "mountain-huts-head",
  "shelters-head": "shelters-head",
  "political-flashpoints-head": "political-flashpoints-head",
  "ceremonial-grounds-head": "ceremonial-grounds-head",
  "pure-springs-head": "pure-springs-head",
  landscapes: "landscapes",
  "living-wonders-head": "living-wonders-head",
  "mind-fields-head": "mind-fields-head",
  "new-page": "new-page",
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

    for (const url of urls) {
      let matchedCategory = null;
      for (const key of Object.keys(CATEGORY_MAP)) {
        if (url.includes(`/${key}/`) && url !== `https://listthemountain.org/${key}`) {
          matchedCategory = CATEGORY_MAP[key];
          break;
        }
      }

      if (matchedCategory) {
        const slug = url.split("?")[0].split("/").filter(Boolean).pop();
        if (!slug) continue;

        console.log(`Scraping: [${matchedCategory}] ${slug}`);

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
            const savePath = path.join(scrapedDir, matchedCategory, `${slug}.json`);
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
    }

    console.log(`\nDone. Scraped ${scraped} article(s).`);
  } catch (e) {
    console.error("Sitemap error:", e.message);
    process.exit(1);
  }
}

run();
