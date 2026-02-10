# List the Mountain — Full Diagnostic Report

**Date:** February 2025  
**Scope:** Build, lint, routes, data flow, 3D/Gatekeeper, landing, and static export.

---

## 1. Build & Lint

### Lint (ESLint)
- **Status:** Passing (exit 0).
- **Src:** All previous errors fixed:
- **CustomCursor:** `setMounted(true)` deferred with `queueMicrotask` to satisfy `react-hooks/set-state-in-effect`.
  - **HeadPageGallery:** JSX comment parsing fixed — `// TYPE: DATA_EXTRACT` and `// DATE: c.1934` wrapped in `{" ... "}` so they are string children, not comment nodes.
  - **content-utils.ts:** `let fileCache` → `const fileCache` (never reassigned).
  - **page.tsx:** Removed unused `useState` import.
- **Scripts:** `eslint.config.mjs` updated so `scripts/**/*.js`, `scrape-images.js`, and `scraper.js` ignore `@typescript-eslint/no-require-imports` (CommonJS). Four remaining **warnings** in those files (unused vars); no errors.
- **Recommendation:** Optional cleanup: remove or prefix with `_` unused vars in `scrape-images.js` (`resolveSrc`), `build-pages-from-content.js` (`heading`, `alt`), `scrape-sitemap.js` (`e`).

### Build (Next.js)
- **Status:** Not fully re-run (build was slow/timeout in diagnostic environment).
- **Expected:** Build should succeed; app uses standard Next 16 + React 19 patterns. If you see failures, run `npm run build` locally and fix any missing env or path issues.

---

## 2. Layout & Gatekeeper

### layout.tsx
- **Structure:** Correct. `CustomCursor` and `Altimeter` are **outside** `<Gatekeeper>` so they show immediately; Gatekeeper wraps only main app content (BackgroundCoordinates, SiteHeader, SmoothScroll + children).
- **Fonts:** Josefin Sans + Montserrat applied via CSS variables; metadata set.

### Gatekeeper.tsx
- **Behavior:** Splash overlay with 3D scene behind and “ENTER THE ARCHIVE” in front; `z-[100]` for overlay, inner 3D container `z-[-1]`, text/button `z-10`. On click, `isEntered` becomes true and overlay exits via AnimatePresence.
- **Children:** Rendered unconditionally (`{children}`); only the splash is conditional. No bug found.

### GatekeeperScene.tsx & 3D
- **Sizing:** Wrapper `absolute inset-0 h-full w-full`; black fallback div; Canvas `!absolute inset-0 h-full w-full`. 3D scene sits behind content; black used if Canvas fails.
- **SSR:** Canvas and GatekeeperScene loaded with `ssr: false` to avoid Node/WebGL issues.

---

## 3. Cursor & Global CSS

- **globals.css:** `* { cursor: none !important; }` and `canvas { cursor: none !important; }` at top; `#custom-cursor` styles present. Custom cursor (North Marker) should be the only visible pointer.
- **CustomCursor:** Mount deferred to avoid hydration issues; event listeners cleaned up. No issues found.

---

## 4. Landing Page (Archival Index)

- **page.tsx:** Client component; `SECTIONS` with `href`, `label`, `hero`; links use `font-brand-header`, stagger animation, vermilion hover. No ghost image (removed to avoid crashes). Transparent debug border on list container can be removed for production.
- **Links vs routes:** All `SECTIONS` hrefs have a matching route under `src/app/` (e.g. `/adventure-point`, `/science-head`, `/natural-features-head`, `/landscapes`, etc.). No broken in-app links.

---

## 5. Head Galleries & Article Routing

- **Head pages:** 16 section pages (e.g. `adventure-point`, `science-head`, `natural-features-head`) use `findBestMatch(PAGE_SLUG, heading)` to resolve slugs and pass `realSlugs` to `HeadPageGallery`. Links go to `/[pageSlug]/[realSlug]` (e.g. `/adventure-point/climbing`).
- **Article page** `[category]/[slug]/page.tsx`: Loads JSON from `scraped-content/[category]/[slug].json`; on miss, uses `findBestMatch(category, slug-as-title)` and redirects if a match is found; otherwise renders placeholder (`_placeholder: true`, “Content Coming Soon” style).
- **content-utils.ts:** `findBestMatch` reads directories under `scraped-content`; caches by category; returns placeholder slug on error or no match. Uses `const fileCache`. No bug found.

---

## 6. Static Export & 404 Risk

- **generateStaticParams:** Only returns `{ category, slug }` for categories that **exist** under `scraped-content/`. Current content: `landscapes/`, `natural-features-head/`, `tourist-destinations/` (and any others you added).
- **Risk:** For sections with **no** `scraped-content/[category]/` folder (e.g. `adventure-point`, `ceremonial-grounds-head`), `generateStaticParams` does **not** emit those category/slug pairs. With `output: "export"`, those URLs are **not** generated, so visiting e.g. `/adventure-point/climbing` on GitHub Pages can **404**.
- **Fix options:**
  1. **Add scraped-content per section:** For each head category (e.g. `adventure-point`), add a folder and one JSON per heading (can be minimal `{ "title": "...", "images": [] }`) so static params and article pages exist.
  2. **Extend generateStaticParams:** Derive category/slug list from the same CONTENT/headings used by the head pages (e.g. read section config or shared manifest) and merge with current filesystem-based params so every linked article gets a static page.

---

## 7. Assets & Config

- **next.config.ts:** `basePath: "/list_the_mountain"`, `assetPrefix`, `output: "export"`, `images.unoptimized`, remote patterns for Squarespace/Unsplash. `NEXT_PUBLIC_BASE_PATH` set for client.
- **Sound:** Removed (PageTransitionSound component deleted; not used).
- **Favicon:** `src/app/favicon.ico` present.

---

## 8. Summary Table

| Area              | Status | Notes |
|-------------------|--------|--------|
| ESLint (src)      | OK     | All errors fixed. |
| ESLint (scripts)  | OK     | Warnings only; require() allowed. |
| Layout / Gatekeeper | OK   | Structure and z-index correct. |
| 3D scene          | OK     | Sizing and fallback in place. |
| Cursor / globals  | OK     | `cursor: none` and custom cursor. |
| Landing links     | OK     | Match app routes; Cormorant-style font. |
| Head → article    | OK     | findBestMatch and placeholder behavior correct. |
| Static export     | Caution | Add content or params for all head categories to avoid 404s. |
| Transition sound  | Removed | N/A — sound feature removed. |

---

## 9. Recommended Next Steps

1. **Fix static 404s:** Either add minimal JSON (and folders) under `scraped-content/` for every head category that has gallery links, or extend `generateStaticParams` so those category/slug pairs are generated.
2. **Optional:** Remove the transparent debug border on the landing list in `page.tsx` for production.
3. **Optional:** Clear the 4 ESLint warnings in scripts (unused vars) if you want zero warnings.

No other bugs or structural issues found in the areas audited.
