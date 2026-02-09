"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const PAGE_SLUG = "work-sites";

const CONTENT = {
  headings: [
    "WORK SITES", // Hero Title
    "Working Landscape",
    "Fur",
    "Wood",
    "Beer",
    "Water",
    "Ice",
    "Earths",
    "Roadways",
    "Energy Chocolate",
    "Worker Accommodation",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697754627788-YJGODCQ6ZBX7SJGDEPL7/Loggers+%282%29.jpeg?format=original", alt: "Working Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359469167-KYGFW46S4QHGLWPCTS5D/18.jpg?format=original", alt: "Fur" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359458416-9744GRFV08GTW48FA2VH/07.png?format=original", alt: "Wood" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359459079-16W1VZ0K27EAXL5FPOK0/09.jpg?format=original", alt: "Beer" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359450723-7UP22VE51MWBJMO1Z33U/04.png?format=original", alt: "Water" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359457045-WFO8AW4UFVQFJHBDQRG4/06.jpg?format=original", alt: "Ice" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359458210-DIKLUEKGBVJUYQG0C0JV/08.jpg?format=original", alt: "Earths" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359465399-LR6PD74TD21P45XS3VHR/14.jpg?format=original", alt: "Roadways" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1698134005667-CYDH2YXV44YO184I5YH4/269580-small.jpg?format=original", alt: "Energy chocolate" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359451040-769U9CENI8F906LPYVEP/05.jpg?format=original", alt: "Worker accomodation" },
  ],
};

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

export default function WorkSitesPage() {
  if (!CONTENT?.headings?.length || !CONTENT?.images?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-background">
        <p className="text-brand-parchment">Content not found.</p>
      </main>
    );
  }
  const heroWords = CONTENT.headings[0].split(" ");
  const contentImages = CONTENT.images.slice(1);

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

      <section className="py-24 md:py-32" aria-hidden />

      {contentImages.map((img, i) => {
        const index = i + 1;
        const heading = CONTENT.headings[index] ?? "List the Mountain.";
        const isImageLeft = i % 2 === 0;

        if (isImageLeft) {
          return (
            <section
              key={index}
              className="relative px-6 py-20 md:py-28 lg:px-12"
            >
              <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-accent/40 hidden md:block" aria-hidden />
              <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.45fr_0.55fr] md:pl-8">
                <Link href={`/${PAGE_SLUG}/${slugify(heading)}`}>
                  <motion.div
                    className="relative aspect-square w-full overflow-hidden md:aspect-[4/3]"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    {...sectionAnimation}
                  >
                    <div className="absolute inset-0 rounded-sm border-2 border-brand-accent bg-brand-background p-3 md:p-5">
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
                <motion.div
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  {...sectionAnimation}
                >
                  <p className="max-w-prose text-lg leading-relaxed text-brand-parchment/90">
                    {heading}
                  </p>
                </motion.div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={index}
            className="relative px-6 py-20 md:py-28 lg:px-12"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.55fr_0.45fr]">
              <motion.div
                className="order-2 flex flex-col justify-center md:order-1"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                {...sectionAnimation}
              >
                <p className="max-w-prose text-lg leading-relaxed text-brand-accent font-light">
                  {heading}
                </p>
              </motion.div>
              <Link href={`/${PAGE_SLUG}/${slugify(heading)}`}>
                <motion.div
                  className="relative order-1 aspect-[4/3] w-full md:order-2"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  {...sectionAnimation}
                >
                  <div className="absolute inset-0 rounded-sm border-2 border-brand-accent bg-brand-background p-3 md:p-5">
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
          </section>
        );
      })}
    </main>
  );
}
