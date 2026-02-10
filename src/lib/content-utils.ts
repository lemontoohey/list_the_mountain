import { promises as fs } from "fs";
import path from "path";

const fileCache: Record<string, string[]> = {};

/**
 * Finds the closest matching real article slug for a given placeholder title.
 * Example: findBestMatch('natural-features-head', 'Fern Gully') => 'fern-tree-valley'
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

    const placeholderWords = placeholderSlug.split("-").filter(Boolean);
    const firstWord = placeholderWords[0];
    if (firstWord) {
      const match = realSlugs.find((slug) => slug.includes(firstWord));
      if (match) {
        if (typeof console !== "undefined" && console.debug) {
          console.debug(
            `[findBestMatch] ${category}/${placeholderTitle} → matched by first word to "${match}"`
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
