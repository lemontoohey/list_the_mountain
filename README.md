# List the Mountain

A premium, luxury-brand website for **List the Mountain**, built with Next.js, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Smooth scroll:** Lenis (@studio-freight/lenis)
- **Font:** Inter (next/font/google)

## Design

- **Background:** Dark charcoal (`#111111`)
- **Text:** Soft off-white (`#F5F5F5`)
- **Accent:** Muted gold (`#BDB7AB`)
- Custom cursor (“compass point”), staggered hero animations, and scroll-triggered section reveals.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/natural-features` | Natural features (legacy) |
| `/natural-features-head` | Beauty spots |
| `/pure-springs-head` | Water features |
| `/ceremonial-grounds-head` | Ceremonial grounds |
| `/political-flashpoints-head` | Political flashpoints |
| `/mind-fields-head` | Landscapes of the mind |
| `/landscapes` | Mountain art / aesthetic landscapes |
| `/shelters-head` | Shelter sheds |
| `/mountain-huts-head` | Mountain huts |
| `/walking-tracks` | Walking tracks |
| `/adventure-point` | Recreational playgrounds |
| `/living-wonders-head` | Living wonders |
| `/science-head` | Scientific landscape |
| `/work-sites` | Work sites |
| `/indigenous-head` | Indigenous landscape |
| `/tourist-destinations` | Tourist destinations |
| `/new-page` | Geoheritage |

## Project structure

- `src/app/` — App Router pages and layout
- `src/components/` — `SmoothScroll`, `CustomCursor`
- `scraped-content/` — Per-page content JSON (headings, paragraphs, images)

## Build

```bash
npm run build
npm start
```

Static export writes to `out/`. Local preview: `npx serve out` (then open the URL with basePath, e.g. `/list_the_mountain`).

## Deploy (GitHub Pages)

Pushes to `main` trigger the **Deploy Next.js site to Pages** workflow.

- **If the site doesn’t update:** Open the repo on GitHub → **Actions**. Check the latest run for that workflow. If it’s red, open the run and expand the failing step (often **Build with Next.js**) to see the error.
- **Repo Settings → Pages:** Source must be **GitHub Actions** (not “Deploy from a branch”) for this workflow to deploy.
- The site is served at your Pages URL with base path `/list_the_mountain` (e.g. `https://<user>.github.io/list_the_mountain/`).

## License

Private / List the Mountain.
