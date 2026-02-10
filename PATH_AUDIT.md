# Path Validation Audit

**Date:** February 2025  
**Purpose:** Ensure `scraped-content/` folder names match `PAGE_SLUG` values used in app pages so `findBestMatch` can resolve article links and avoid "Archives being digitized" placeholders.

## PAGE_SLUG values (from app)

| Page route                    | PAGE_SLUG                  |
|------------------------------|----------------------------|
| /adventure-point             | adventure-point            |
| /ceremonial-grounds-head     | ceremonial-grounds-head    |
| /indigenous-head             | indigenous-head            |
| /landscapes                  | landscapes                 |
| /living-wonders-head         | living-wonders-head        |
| /mind-fields-head            | mind-fields-head           |
| /mountain-huts-head           | mountain-huts-head         |
| /natural-features-head       | natural-features-head      |
| /new-page                    | new-page                   |
| /political-flashpoints-head  | political-flashpoints-head |
| /pure-springs-head           | pure-springs-head          |
| /science-head                | science-head               |
| /shelters-head               | shelters-head              |
| /tourist-destinations        | tourist-destinations       |
| /walking-tracks              | walking-tracks             |
| /work-sites                  | work-sites                 |

## scraped-content/ folders

- adventure-point  
- ceremonial-grounds-head  
- indigenous-head  
- landscapes  
- living-wonders-head  
- mind-fields-head  
- mountain-huts-head  
- natural-features-head  
- new-page  
- political-flashpoints-head  
- pure-springs-head  
- science-head  
- shelters-head  
- tourist-destinations  
- walking-tracks  
- work-sites  

## Result

**All PAGE_SLUG values have a matching folder in scraped-content/.** No renames needed.

Pages that do **not** use findBestMatch (no scraped-content required for gallery linking):

- /natural-features (intro page)

## Debugging "Archives being digitized"

If an article still shows the placeholder:

1. **Check the browser console** (and server logs when running `npm run dev`). `findBestMatch` now logs:
   - `[findBestMatch] No match for category="…" title="…"` when it falls back to the placeholder slug (article may have no JSON).
   - `[findBestMatch] Error for category="…" title="…"` when the category folder is missing or unreadable.

2. **Add or rename JSON files** in `scraped-content/<category>/` so that either:
   - The filename (without .json) equals the slug derived from the heading (e.g. "Goat Hills" → `goat-hills.json`), or  
   - The first word of the heading matches part of an existing slug (findBestMatch uses first-word fallback).

3. **Category folder missing?** Create `scraped-content/<PAGE_SLUG>/` and add at least one `.json` file for that section.

4. **"List the Mountain." or nav text in headings?** If build logs show many `title="List the Mountain."` or `title="ABOUT US CONTACT US search Media"`, the CONTENT.headings array in that section’s page file (e.g. `living-wonders-head/page.tsx`, `landscapes/page.tsx`) has placeholder or scraped nav entries. Trim the headings array so each item is the real section title; use the same number of headings as content images so `findBestMatch` gets the correct title for each link.
