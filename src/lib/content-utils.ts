import { promises as fs } from "fs";
import path from "path";

const fileCache: Record<string, string[]> = {};

/** Returns sorted (alphabetical) slugs for a category, excluding content.json. */
export async function getCategorySlugs(category: string): Promise<string[]> {
  const dirPath = path.join(process.cwd(), "scraped-content", category);
  try {
    const files = await fs.readdir(dirPath);
    return files
      .filter((f) => f.endsWith(".json") && f !== "content.json")
      .map((f) => f.replace(".json", ""))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

/**
 * Finds the closest matching real article slug for a given placeholder title.
 * Uses keyword search against scraped-content filenames so e.g. "Fern Gully" → fern-tree-valley.
 */
export async function findBestMatch(
  category: string,
  placeholderTitle: string
): Promise<string> {
  const placeholderSlug = placeholderTitle
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    if (!fileCache[category]) {
      const dirPath = path.join(process.cwd(), "scraped-content", category);
      const files = await fs.readdir(dirPath);
      fileCache[category] = files
        .filter((f) => f.endsWith(".json"))
        .map((file) => file.replace(".json", ""));
    }

    const realSlugs = fileCache[category];

    if (realSlugs.includes(placeholderSlug)) {
      return placeholderSlug;
    }

    const titleWords = placeholderTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 1);
    const slugWords = placeholderSlug.split("-").filter(Boolean);

    const byKeywordScore = realSlugs
      .map((slug) => {
        const slugLower = slug.toLowerCase();
        let score = 0;
        for (const word of titleWords) {
          if (slugLower.includes(word)) score += word.length;
        }
        for (const word of slugWords) {
          if (slugLower.includes(word)) score += word.length;
        }
        return { slug, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (byKeywordScore.length > 0) {
      const best = byKeywordScore[0].slug;
      if (typeof console !== "undefined" && console.debug) {
        console.debug(
          `[findBestMatch] ${category}/${placeholderTitle} → keyword match "${best}"`
        );
      }
      return best;
    }

    const firstWord = slugWords[0];
    if (firstWord) {
      const match = realSlugs.find((s) => s.includes(firstWord));
      if (match) {
        if (typeof console !== "undefined" && console.debug) {
          console.debug(
            `[findBestMatch] ${category}/${placeholderTitle} → first word "${match}"`
          );
        }
        return match;
      }
    }

    if (typeof console !== "undefined" && console.warn) {
      console.warn(
        `[findBestMatch] No match for category="${category}" title="${placeholderTitle}" (slug="${placeholderSlug}"). Returning placeholder; article may show "Archives being digitized".`
      );
    }
    return placeholderSlug;
  } catch (err) {
    if (typeof console !== "undefined" && console.error) {
      console.error(
        `[findBestMatch] Error for category="${category}" title="${placeholderTitle}":`,
        err
      );
    }
    return placeholderSlug;
  }
}
