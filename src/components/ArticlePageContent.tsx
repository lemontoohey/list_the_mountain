"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { playSnowCrunch } from "@/components/Audio/PageTransitionSound";

const HERO_STENCIL_FILTER =
  "grayscale(1) contrast(300%) brightness(0.6) sepia(100%) hue-rotate(-50deg) saturate(400%)";

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  }),
} as const;

const word = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

const bodyContainer = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  }),
} as const;

const paragraph = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

const STENCIL_FILTER =
  "grayscale(1) contrast(300%) brightness(0.6) sepia(100%) hue-rotate(-50deg) saturate(400%)";

export type ArticleData = {
  title?: string;
  _placeholder?: boolean;
  images?: { src: string; alt?: string }[];
  paragraphs?: string[];
  contentHtml?: string;
};

type Props = {
  data: ArticleData;
  category: string;
  slug: string;
  nextSlug?: string | null;
  nextTitle?: string | null;
  nextImageSrc?: string | null;
};

function normalizeImgSrc(src: string) {
  if (typeof src !== "string") return "";
  return src.startsWith("//") ? "https:" + src : src;
}

export function ArticlePageContent({ data, category, slug, nextSlug, nextTitle, nextImageSrc }: Props) {
  const heroImage =
    data.images && data.images.length > 0 ? data.images[0].src : null;
  const heroAlt = data.images?.[0]?.alt ?? data.title ?? "";
  const titleText = data.title?.replace(/-/g, " ") ?? slug.replace(/-/g, " ");
  const heroWords = titleText.split(" ");
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-brand-background text-brand-parchment selection:bg-brand-accent selection:text-brand-background">
      <nav className="fixed top-0 left-0 z-50 p-6 mix-blend-difference">
        <Link
          href={`/${category}`}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-parchment transition-colors hover:text-brand-accent"
        >
          <span className="block h-px w-8 bg-brand-parchment transition-all group-hover:w-12 group-hover:bg-brand-accent" />
          Back to Collection
        </Link>
      </nav>

      {/* Cinematic hero: Next.js Image, blur until loaded; stencil → full color; fallback bg on error */}
      <section className="relative h-screen min-h-[100vh] w-full overflow-hidden bg-brand-background">
        {heroImage ? (
          <>
            {/* Full-color layer (underneath) */}
            <div className="absolute inset-0">
              <Image
                src={normalizeImgSrc(heroImage)}
                alt={heroAlt}
                fill
                className={`object-cover opacity-80 transition-[filter] duration-500 ${heroLoaded ? "blur-0" : "blur-md"}`}
                sizes="100vw"
                unoptimized
                priority
                onLoad={() => setHeroLoaded(true)}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            {/* Stencil layer: fades out over 2s (darkroom develop / decrypt) */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              aria-hidden
            >
              <Image
                src={normalizeImgSrc(heroImage)}
                alt=""
                fill
                className="object-cover mix-blend-screen"
                style={{ filter: HERO_STENCIL_FILTER }}
                sizes="100vw"
                unoptimized
                priority
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 bg-brand-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-background/20 to-brand-background" />

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 md:p-12 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="font-brand-header flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-4xl font-bold uppercase leading-none tracking-poster text-brand-parchment md:text-6xl lg:text-7xl"
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
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent/90">
            DESCEND
          </span>
          <motion.span
            className="block text-brand-accent"
            animate={{ y: [0, 4, 0], opacity: [0.9, 0.5, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>
      </section>

      <section className="relative px-6 py-12 md:px-12 md:py-24">
        <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-brand-accent" />

        <div className="mx-auto max-w-prose">
          {data._placeholder ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
              <div className="h-px w-12 bg-brand-accent/50" />
              <p className="font-serif text-2xl italic text-brand-parchment/60">
                &ldquo;The archives are currently being digitized.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-brand-accent">
                Content Coming Soon
              </p>
              <div className="h-px w-12 bg-brand-accent/50" />
            </div>
          ) : (
            <motion.div
              className="space-y-8 font-sans font-light leading-loose text-brand-parchment/90 md:text-lg"
              variants={bodyContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {data.paragraphs &&
                data.paragraphs.map((p: string, i: number) => (
                  <motion.p key={i} variants={paragraph} transition={{ duration: 0.5, ease: "easeOut" }}>
                    {p}
                  </motion.p>
                ))}

              {(!data.paragraphs || data.paragraphs.length === 0) &&
                data.contentHtml && (
                  <motion.div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.contentHtml }}
                    variants={paragraph}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                )}
            </motion.div>
          )}

          {/* CONTINUE EXPEDITION — next site in category */}
          {nextSlug && nextTitle && !data._placeholder && (
            <motion.section
              className="mt-20 border-t border-brand-accent/20 pt-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-cormorant text-2xl font-semibold uppercase tracking-wide text-brand-parchment/90 md:text-3xl">
                CONTINUE EXPEDITION
              </h2>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-brand-accent/70">
                SEQUENCE STATUS: PENDING // PROCEED TO NEXT SITE
              </p>
              <Link
                href={`/${category}/${nextSlug}`}
                className="group mt-6 block"
                onClick={() => playSnowCrunch()}
              >
                <div className="relative min-h-[180px] overflow-hidden rounded border border-brand-parchment/20 bg-brand-background/80 transition-colors group-hover:border-brand-accent/40">
                  {nextImageSrc && (
                    <div className="absolute inset-0 opacity-30 mix-blend-screen transition-opacity group-hover:opacity-50">
                      <Image
                        src={normalizeImgSrc(nextImageSrc)}
                        alt=""
                        fill
                        className="object-cover"
                        style={{ filter: STENCIL_FILTER }}
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="relative z-10 p-8 md:p-10">
                    <h2 className="font-cormorant text-3xl font-semibold uppercase tracking-wide text-brand-parchment md:text-4xl">
                      {nextTitle.replace(/-/g, " ")}
                    </h2>
                    <span className="mt-4 inline-block font-mono text-[9px] uppercase tracking-widest text-brand-accent group-hover:underline">
                      CONTINUE EXPEDITION →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}
        </div>
      </section>
    </main>
  );
}
