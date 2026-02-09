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

## License

Private / List the Mountain.
