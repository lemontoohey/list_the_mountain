/**
 * Deep Scrape / Excavation of listthemountain.org
 * - Crawls every link from sitemap
 * - Extracts content from Squarespace selectors (.sqs-block-content, .sqs-block-image, .sqs-gallery-item)
 * - Images: uses data-src when present, appends ?format=original for high-res
 * - Output: original-site-archive/ by category, then SITE_TREE.md
 */
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://listthemountain.org";
const ARCHIVE_DIR = path.join(__dirname, "..", "original-site-archive");

function normalizeImageUrl(src) {
  if (!src || !src.trim()) return null;
  let s = src.trim();
  if (s.startsWith("//")) s = "https:" + s;
  if (!s.startsWith("http")) s = SITE_URL + (s.startsWith("/") ? s : "/" + s);
  if (s.includes("format=")) s = s.replace(/format=[^&]+/, "format=original");
  else s += (s.includes("?") ? "&" : "?") + "format=original";
  return s;
}

function extractImages($) {
  const seen = new Set();
  const images = [];

  // Squarespace: data-src often holds the real high-res URL
  $(".sqs-block-image img, .sqs-gallery-item img, .sqs-block-content img, img[data-src], img[data-srcset]").each((i, el) => {
    const $el = $(el);
    let src = $el.attr("data-src") || $el.attr("src");
    const srcset = $el.attr("data-srcset");
    if (srcset) {
      const first = srcset.split(",")[0].trim().split(/\s+/)[0];
      if (first) src = first;
    }
    if (!src) return;
    const url = normalizeImageUrl(src);
    if (url && !seen.has(url)) {
      seen.add(url);
      images.push(url);
    }
  });

  // Fallback: any img on the page
  $("img").each((i, el) => {
    const $el = $(el);
    let src = $el.attr("data-src") || $el.attr("src");
    const url = normalizeImageUrl(src);
    if (url && !seen.has(url)) {
      seen.add(url);
      images.push(url);
    }
  });

  return images;
}

function extractText($) {
  const headings = [];
  const paragraphs = [];

  $(".sqs-block-content h1, .sqs-block-content h2, .sqs-block-content h3, .sqs-block-content h4").each((i, el) => {
    const t = $(el).text().trim();
    if (t) headings.push({ tag: el.name, text: t });
  });

  $(".sqs-block-content p, .sqs-block-content blockquote, .sqs-block-content li, .sqs-block-content .sqs-html-content p").each((i, el) => {
    const t = $(el).text().trim();
    if (t.length > 10) paragraphs.push(t);
  });

  // Fallback: general page text
  if (paragraphs.length === 0) {
    $("p, blockquote, li").each((i, el) => {
      const t = $(el).text().trim();
      if (t.length > 10) paragraphs.push(t);
    });
  }

  return { headings, paragraphs };
}

async function excavate() {
  console.log("⛏️ Starting Full Site Excavation...");
  if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  let xml;
  try {
    const res = await axios.get(`${SITE_URL}/sitemap.xml`, { timeout: 15000 });
    xml = res.data;
  } catch (e) {
    console.error("❌ Failed to fetch sitemap:", e.message);
    process.exit(1);
  }

  const $xml = cheerio.load(xml, { xmlMode: true });
  const urls = [];
  $xml("loc").each((i, el) => urls.push($xml(el).text().trim()));

  console.log(`🔎 Found ${urls.length} potential excavation sites.`);

  const report = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const pathPart = url.replace(SITE_URL, "").replace(/^\/|\/$/g, "") || "home";
      const slug = pathPart.replace(/\//g, path.sep);
      const folderPath = path.join(ARCHIVE_DIR, slug);
      const dir = path.dirname(folderPath);
      if (dir !== ARCHIVE_DIR && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

      process.stdout.write(`⛏️ [${i + 1}/${urls.length}] ${pathPart} ... `);

      const { data: html } = await axios.get(url, { timeout: 15000, maxRedirects: 5 });
      const $ = cheerio.load(html);

      const title = $("h1").first().text().trim() || pathPart.split("/").pop() || "home";
      const { headings, paragraphs } = extractText($);
      const images = extractImages($);

      const wordCount = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
      const pageData = {
        url,
        title,
        wordCount,
        imageCount: images.length,
        headings,
        paragraphs,
        images,
      };

      const dataPath = path.join(folderPath, "data.json");
      fs.writeFileSync(dataPath, JSON.stringify(pageData, null, 2));

      report.push(`- [${pathPart}](${url}): ${wordCount} words, ${images.length} images`);
      console.log(`${wordCount} words, ${images.length} images`);
    } catch (e) {
      console.error(`\n❌ Failed ${url}: ${e.message}`);
      report.push(`- [${url.replace(SITE_URL, "").replace(/^\/|\/$/g) || "home"}](${url}): **FAILED** ${e.message}`);
    }
  }

  const treePath = path.join(ARCHIVE_DIR, "SITE_TREE.md");
  fs.writeFileSync(
    treePath,
    "# Original Site Tree\n\nGenerated by scripts/excavate-site.js\n\n" + report.join("\n")
  );
  console.log("\n✅ Excavation Complete. See original-site-archive/SITE_TREE.md");
}

excavate();
