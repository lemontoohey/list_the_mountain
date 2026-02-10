/**
 * Auto-Heal Archive: copy real content from original-site-archive into scraped-content
 * when a page is missing or is a placeholder. Uses mapping from GAP_ANALYSIS.md.
 */
const fs = require("fs");
const path = require("path");

const MAPPING = {
  "natural-features": "natural-features-head",
  destinations: "tourist-destinations",
  indigenous: "indigenous-head",
  "work-places": "work-sites",
  science: "science-head",
  adventures: "adventure-point",
  tracks: "walking-tracks",
  "mountain-huts": "mountain-huts-head",
  shelters: "shelters-head",
  "political-flashpoints": "political-flashpoints-head",
  "ceremonial-grounds": "ceremonial-grounds-head",
  "water-features": "pure-springs-head",
  artistic: "landscapes",
  "living-wonders": "living-wonders-head",
  "mind-fields": "mind-fields-head",
  geoheritage: "new-page",
};

const ARCHIVE_ROOT = path.join(__dirname, "..", "original-site-archive");
const PROJECT_CONTENT = path.join(__dirname, "..", "scraped-content");

function findDataJsonFiles(dir, base = "") {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const rel = base ? `${base}${path.sep}${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      results.push(...findDataJsonFiles(path.join(dir, ent.name), rel));
    } else if (ent.name === "data.json") {
      results.push(rel);
    }
  }
  return results;
}

function heal() {
  console.log("🩹 Auto-Healing the Archive...");
  let healedCount = 0;

  for (const [archiveSlug, projectFolder] of Object.entries(MAPPING)) {
    const archivePath = path.join(ARCHIVE_ROOT, archiveSlug);
    if (!fs.existsSync(archivePath)) continue;

    const dataFiles = findDataJsonFiles(archivePath);
    for (const fileRel of dataFiles) {
      const dirname = path.dirname(fileRel);
      const articleSlug =
        dirname === "." || dirname === ""
          ? null
          : dirname.split(path.sep).join("/");
      if (articleSlug == null) continue;

      const dataPath = path.join(archivePath, fileRel);
      let rawData;
      try {
        rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      } catch (e) {
        console.warn("  ⚠️ Skip (invalid JSON):", fileRel);
        continue;
      }

      if (!rawData.paragraphs || rawData.paragraphs.length === 0) continue;

      const targetDir = path.join(PROJECT_CONTENT, projectFolder);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

      const targetPath = path.join(targetDir, `${articleSlug}.json`);
      let shouldOverwrite = true;
      if (fs.existsSync(targetPath)) {
        try {
          const existing = JSON.parse(fs.readFileSync(targetPath, "utf8"));
          if (
            existing.paragraphs &&
            existing.paragraphs.length > 2 &&
            !existing._placeholder
          ) {
            shouldOverwrite = false;
          }
        } catch (_) {}
      }

      if (shouldOverwrite) {
        const images = (rawData.images || []).map((src) => {
          const s = typeof src === "string" ? src : src.src || src.url;
          if (s && s.startsWith("//")) return { src: "https:" + s };
          return { src: s };
        });
        const payload = {
          url: rawData.url,
          title: rawData.title || articleSlug.replace(/-/g, " "),
          paragraphs: rawData.paragraphs,
          images,
        };
        fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2));
        healedCount++;
        console.log("  ✓", projectFolder + "/" + articleSlug + ".json");
      }
    }
  }

  console.log(`\n✅ Healed ${healedCount} articles with real content.`);
}

heal();
