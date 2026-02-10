# Gap Analysis: original-site-archive vs scraped-content

**Date:** February 2025  
**Purpose:** Compare the excavated site (original-site-archive/) with our app content (scraped-content/) and fix pages that show "Archives being Digitized."

---

## 1. Category / folder mapping

| Original site (archive) | Our app (scraped-content) |
|-------------------------|----------------------------|
| natural-features        | natural-features-head      |
| mountain-huts           | mountain-huts-head         |
| indigenous              | indigenous-head            |
| work-places             | work-sites                 |
| tracks                  | walking-tracks             |
| destinations            | tourist-destinations      |
| shelters                | shelters-head              |
| science                 | science-head               |
| political-flashpoints   | political-flashpoints-head|
| mind-fields             | mind-fields-head           |
| living-wonders          | living-wonders-head         |
| ceremonial-grounds      | ceremonial-grounds-head    |
| adventures              | adventure-point            |
| water-features          | pure-springs-head          |
| artistic                | landscapes (in our app)     |
| (various galleries)     | — index/gallery pages       |

---

## 2. Pages that were showing "Archives being Digitized"

These are pages where `findBestMatch` could not resolve a slug (build logs showed warnings):

| Category           | Gallery heading / title   | Resolved slug              | Fix applied |
|--------------------|---------------------------|----------------------------|-------------|
| mind-fields-head   | The Sacred Hill           | `the-sacred-hill`          | **Added** `scraped-content/mind-fields-head/the-sacred-hill.json` (content from our-sacred-hill). |
| mind-fields-head   | The Intangible Landscape  | `the-intangible-landscape` | **Added** `scraped-content/mind-fields-head/the-intangible-landscape.json` (content from intangible-landscape). |

Other build warnings (e.g. living-wonders-head, landscapes, new-page) are due to **CONTENT.headings** in the section page files containing placeholder entries like "List the Mountain." or nav text instead of real item titles. Those are data-cleaning issues in the page files (headings arrays), not missing scraped JSON. HeadPageGallery now falls back to **image alt** when a heading is missing.

---

## 3. Where original-site-archive has more content than we use

- **original-site-archive** has 287 pages (sitemap); many are index/gallery pages (0–30 words, many images).
- **scraped-content** has 392 JSON files across 17 categories; we use a subset of article pages that match our routes and `findBestMatch` logic.
- Sections such as **destinations**, **nominations**, **geoheritage**, **artistic** (partially mapped to landscapes), **water-features** (pure-springs-head) have full article content in the archive; we already have substantial overlap. Gaps are mostly slug naming (e.g. `the-sacred-hill` vs `our-sacred-hill`), which we fixed above.

---

## 4. Fixes applied (Phase 2)

1. **mind-fields-head**
   - Created `the-sacred-hill.json` so the link from "The Sacred Hill" resolves (same content as `our-sacred-hill.json`, title set to "The Sacred Hill").
   - Created `the-intangible-landscape.json` so "The Intangible Landscape" resolves (same content as `intangible-landscape.json`).

2. **HeadPageGallery** (already done earlier)
   - Heading fallback: `headings[index] ?? (img.alt || "List the Mountain.")` so missing headings use image alt text.

No files were moved from original-site-archive into scraped-content; the missing articles already had equivalent content under different slugs, so we added the alternate slug files.

---

## 5. If you still see "Archives being Digitized"

1. Check the **browser console** and **build logs** for `[findBestMatch] No match for category="…" title="…"`. That title is what the gallery uses for that card.
2. Either add a **CONTENT.headings** entry for that card (so the title matches an existing slug) or add a new JSON file in `scraped-content/<category>/<slug>.json` where `<slug>` is the normalised form of that title (e.g. "The X" → `the-x.json`).
3. To backfill from the archive: copy `original-site-archive/<orig-category>/<orig-slug>/data.json`, convert to our format (title, paragraphs, images: `[{ src }]`), and save as `scraped-content/<our-category>/<slug>.json`.
