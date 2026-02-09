"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

const bodyContainer = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  }),
};

const paragraph = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
};

export function ArticlePageContent({ data, category, slug }: Props) {
  const heroImage =
    data.images && data.images.length > 0 ? data.images[0].src : null;
  const heroAlt = data.images?.[0]?.alt ?? data.title ?? "";
  const titleText = data.title?.replace(/-/g, " ") ?? slug.replace(/-/g, " ");
  const heroWords = titleText.split(" ");

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

      <section className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
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
        </div>
      </section>
    </main>
  );
}
