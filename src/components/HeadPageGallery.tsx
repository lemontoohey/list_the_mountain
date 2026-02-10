"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useHoverTick } from "@/hooks/useHoverTick";

interface HeadPageGalleryProps {
  headings: string[];
  images: { src: string; alt: string }[];
  pageSlug: string;
  realSlugs: string[];
}

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

const sectionAnimation = {
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

function normalizeImgSrc(src: string) {
  if (typeof src !== "string") return "";
  return src.startsWith("//") ? "https:" + src : src;
}

export function HeadPageGallery({ headings, images, pageSlug, realSlugs }: HeadPageGalleryProps) {
  const { onMouseEnter: onHoverTick } = useHoverTick();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [loadedCards, setLoadedCards] = useState<Set<number>>(new Set());

  if (!headings?.length || !images?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background">
        <p className="text-brand-parchment">Content not found.</p>
      </main>
    );
  }

  const heroWords = headings[0].split(" ");
  const contentImages = images.slice(1);

  return (
    <main className="bg-brand-background">
      {/* Hero — Next.js Image with blur placeholder; fallback bg on error */}
      <section className="relative min-h-screen w-full overflow-hidden bg-brand-background">
        <div className="absolute inset-0 -z-20">
          <Image
            src={normalizeImgSrc(images[0].src)}
            alt={images[0].alt || ""}
            fill
            className={`object-cover transition-[filter] duration-500 ease-out ${heroLoaded ? "blur-0" : "blur-md"}`}
            sizes="100vw"
            unoptimized
            priority
            onLoad={() => setHeroLoaded(true)}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-brand-background/60" aria-hidden />
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

      <section className="py-24 md:py-32" aria-hidden />

      {contentImages.map((img, i) => {
        const index = i + 1;
        const heading = headings[index] ?? (img.alt || "List the Mountain.");
        const isImageLeft = i % 2 === 0;
        const realSlug = realSlugs[i] ?? heading.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        const siteNo = index < 10 ? "0" + index : String(index);

        return (
          <section
            key={index}
            className="group/section relative px-6 py-12 md:py-16 lg:px-12"
          >
            {isImageLeft && (
              <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-accent/20 hidden md:block" aria-hidden />
            )}

            <div className={`mx-auto max-w-6xl md:pl-8 ${isImageLeft ? "" : ""}`}>
              <Link
                href={`/${pageSlug}/${realSlug}`}
                className="group block"
                onMouseEnter={onHoverTick}
              >
                <motion.div
                  className="relative min-h-[200px] overflow-hidden rounded border border-brand-parchment/20 bg-brand-background/80 p-6 transition-all duration-500 ease-out group-hover:shadow-[0_0_50px_-10px_rgba(217,74,56,0.5)] md:min-h-[240px] md:p-8"
                  initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  {...sectionAnimation}
                >
                  {/* Image: Next.js Image, stencil on hover; blur until loaded; fallback bg on error */}
                  <div className="absolute inset-0 overflow-hidden rounded bg-brand-background">
                    <Image
                      src={normalizeImgSrc(img.src)}
                      alt={img.alt || heading}
                      fill
                      className={`object-cover opacity-0 mix-blend-screen transition-all duration-500 group-hover:opacity-90 ${loadedCards.has(i) ? "blur-0" : "blur-sm"}`}
                      style={{
                        filter: "grayscale(1) contrast(300%) brightness(0.6) sepia(100%) hue-rotate(-50deg) saturate(400%)",
                      }}
                      sizes="(max-width: 768px) 100vw, 672px"
                      unoptimized
                      loading="lazy"
                      onLoad={() => setLoadedCards((s) => new Set(s).add(i))}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  {/* Metadata block: foreground — monospace detail */}
                  <div className="relative z-10 font-mono text-[9px] tracking-widest text-brand-parchment/60 transition-colors duration-300 group-hover:text-brand-parchment">
                    <p className="font-brand-header text-lg uppercase tracking-widest text-brand-accent md:text-xl">
                      SITE NO. {siteNo} — {heading}
                    </p>
                    <p className="mt-2 text-[9px]">
                      REF: TAS-42.{index}{" // TYPE: DATA_EXTRACT"}
                    </p>
                    <p className="mt-1 text-[9px]">
                      STATUS: CLASSIFIED{" // DATE: c.1934"}
                    </p>
                    <p className="mt-4 text-brand-accent/80 group-hover:text-brand-accent">
                      [CLICK TO INSPECT SOURCE]
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </section>
        );
      })}
    </main>
  );
}
