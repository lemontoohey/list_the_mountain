const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "scraped-content");
const slugs = fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isDirectory());
let hasError = false;
for (const slug of slugs) {
  const file = path.join(dir, slug, "content.json");
  try {
    const raw = fs.readFileSync(file, "utf8");
    const j = JSON.parse(raw);
    const c = j.content || j;
    const h = c.headings || [];
    const p = c.paragraphs || [];
    const im = j.images || [];
    const urls = (im || []).map((i) => i.src).filter(Boolean);
    const invalidUrl = urls.find((u) => !u.startsWith("https://"));
    if (h.length === 0 || im.length === 0) {
      console.log("FAIL", file, "headings=" + h.length, "images=" + im.length);
      hasError = true;
    } else {
      console.log("OK", slug, "headings=" + h.length, "paragraphs=" + p.length, "images=" + im.length);
    }
    if (invalidUrl) {
      console.log("  INVALID URL:", invalidUrl);
      hasError = true;
    }
  } catch (e) {
    console.log("ERROR", file, e.message);
    hasError = true;
  }
}
process.exit(hasError ? 1 : 0);
