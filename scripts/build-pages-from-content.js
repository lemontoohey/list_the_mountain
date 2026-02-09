// Reads scraped-content/<slug>/content.json and regenerates each app route page
// with CONTENT synced from the JSON (headings, paragraphs, images with src+alt).
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SCRAPED = path.join(ROOT, "scraped-content");
const APP = path.join(ROOT, "src", "app");

const slugs = fs.readdirSync(SCRAPED).filter((f) => {
  const p = path.join(SCRAPED, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, "content.json"));
});

function escapeForJs(str) {
  if (str == null) return "undefined";
  return JSON.stringify(String(str));
}

function loadContent(slug) {
  const file = path.join(SCRAPED, slug, "content.json");
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  const c = data.content || {};
  const headings = Array.isArray(c.headings) ? c.headings : [];
  const paragraphs = Array.isArray(c.paragraphs) ? c.paragraphs : [];
  const images = Array.isArray(data.images)
    ? data.images.map((img) => ({
        src: img.src || "",
        alt: img.alt != null ? String(img.alt) : "",
      }))
    : [];
  return { headings, paragraphs, images };
}

function toPascal(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function generatePageTsx(slug, content) {
  const { headings, paragraphs, images } = content;
  const hasParagraphs = paragraphs.length > 0;
  const componentName = toPascal(slug) + "Page";

  const headingsStr = "[\n    " + headings.map((h) => escapeForJs(h)).join(",\n    ") + "\n  ]";
  const paragraphsStr = "[\n    " + paragraphs.map((p) => escapeForJs(p)).join(",\n    ") + "\n  ]";
  const imagesStr =
    "[\n    " +
    images.map((img) => `{ src: ${escapeForJs(img.src)}, alt: ${escapeForJs(img.alt)} }`).join(",\n    ") +
    "\n  ]";

  let cont = `const CONTENT = {
  headings: ${headingsStr},
  images: ${imagesStr},
`;
  if (hasParagraphs) cont += `  paragraphs: ${paragraphsStr},\n`;
  cont += `};\n`;

  const sections = [];
  for (let i = 1; i < images.length; i++) {
    const heading = headings[i] != null ? headings[i] : "";
    const alt = images[i].alt || "List the Mountain";
    const isLeft = (i - 1) % 2 === 0;
    if (isLeft) {
      sections.push(`
      {/* Section: image left, text right */}
      <section className="relative px-6 py-20 md:py-28 lg:px-12">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-accent/40 hidden md:block" aria-hidden />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.45fr_0.55fr] md:pl-8">
          <motion.div
            className="relative aspect-square w-full overflow-hidden md:aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-sm border-2 border-brand-accent bg-brand-background p-3 md:p-5">
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image
                  src={CONTENT.images[${i}].src}
                  alt={CONTENT.images[${i}].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="max-w-prose text-lg leading-relaxed text-brand-parchment/90">
              {CONTENT.headings[${i}] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>`);
    } else {
      sections.push(`
      {/* Section: text left, image right */}
      <section className="relative px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.55fr_0.45fr]">
          <motion.div
            className="order-2 flex flex-col justify-center md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="max-w-prose text-lg leading-relaxed text-brand-accent font-light">
              {CONTENT.headings[${i}] ?? "List the Mountain."}
            </p>
          </motion.div>
          <motion.div
            className="relative order-1 aspect-[4/3] w-full md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-sm border-2 border-brand-accent bg-brand-background p-3 md:p-5">
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image
                  src={CONTENT.images[${i}].src}
                  alt={CONTENT.images[${i}].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>`);
    }
  }

  const introSection = hasParagraphs
    ? `
      {/* Intro paragraph */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-prose text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-lg leading-relaxed text-brand-parchment">
            {CONTENT.paragraphs[0]}
          </p>
        </motion.div>
      </section>`
    : `
      <section className="py-24 md:py-32" aria-hidden />`;

  return `"use client";

import Image from "next/image";
import { motion } from "framer-motion";

${cont}

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  }),
};

const word = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ${componentName}() {
  if (!CONTENT?.headings?.length || !CONTENT?.images?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background">
        <p className="text-brand-parchment">Content not found.</p>
      </main>
    );
  }
  const heroWords = CONTENT.headings[0].split(" ");

  return (
    <main className="bg-brand-background">
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={CONTENT.images[0].src}
          alt={CONTENT.images[0].alt || ""}
          fill
          className="object-cover -z-20"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 -z-10 bg-brand-background/60"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.h1
            className="font-brand-header flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-4xl font-bold uppercase tracking-poster text-brand-parchment drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {heroWords.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-block"
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>
${introSection}
${sections.join("")}
    </main>
  );
}
`;
}

for (const slug of slugs) {
  const content = loadContent(slug);
  const pageDir = path.join(APP, slug);
  if (!fs.existsSync(pageDir)) {
    console.warn("Skip (no app route):", slug);
    continue;
  }
  const pagePath = path.join(pageDir, "page.tsx");
  const tsx = generatePageTsx(slug, content);
  fs.writeFileSync(pagePath, tsx, "utf8");
  console.log("Updated:", pagePath);
}

console.log("Done. Pages built from scraped content.");
