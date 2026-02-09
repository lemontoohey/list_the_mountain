"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
};

const word = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sectionAnimation = {
  viewport: { once: true as const },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export function HeadPageGallery({ headings, images, pageSlug, realSlugs }: HeadPageGalleryProps) {
  if (!headings?.length || !images?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background">
        <p className="text-brand-parchment">Content not found.</p>
      </main>
    );
  }

  const heroWords = headings[0].split(" ");
  // Image index 0 is hero, 1+ are content
  const contentImages = images.slice(1);

  return (
    <main className="bg-brand-background">
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={images[0].src}
          alt={images[0].alt || ""}
          fill
          className="object-cover -z-20"
          priority
          sizes="100vw"
        />
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
        const heading = headings[index] ?? "List the Mountain.";
        const isImageLeft = i % 2 === 0;
        const realSlug = realSlugs[i] ?? heading.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

        return (
          <section
            key={index}
            className="group/section relative px-6 py-20 md:py-28 lg:px-12"
          >
            {/* Vertical Line Decoration */}
            {isImageLeft && (
              <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-accent/40 hidden md:block" aria-hidden />
            )}

            <div className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.45fr_0.55fr] md:pl-8 ${isImageLeft ? "" : "md:grid-cols-[0.55fr_0.45fr]"}`}>

              {/* Image Block */}
              <div className={isImageLeft ? "order-1" : "order-1 md:order-2"}>
                <Link href={`/${pageSlug}/${realSlug}`} className="group block w-full h-full">
                  <motion.div
                    className="relative aspect-square w-full overflow-hidden md:aspect-[4/3]"
                    initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    {...sectionAnimation}
                  >
                    <div className="absolute inset-0 rounded-sm border-2 border-brand-accent/80 bg-brand-background p-3 md:p-5 transition-colors duration-300 group-hover:border-brand-accent">
                      <div className="relative h-full w-full overflow-hidden rounded-sm">
                        <Image
                          src={img.src}
                          alt={img.alt || ""}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 45vw"
                        />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Text Block */}
              <motion.div
                className={`flex flex-col justify-center ${isImageLeft ? "order-2" : "order-2 md:order-1"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                {...sectionAnimation}
              >
                <p className="max-w-prose text-lg leading-relaxed text-brand-parchment/90 font-light transition-colors duration-300 group-hover/section:text-brand-accent">
                  {heading}
                </p>
              </motion.div>

            </div>
          </section>
        );
      })}
    </main>
  );
}
