"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const PAGE_SLUG = "shelters-head";

const CONTENT = {
  headings: [
    "SHELTER SHEDS", // Hero Title
    "The Sheltered Landscape",
    "Black Man's Cave",
    "Ladies' Shelters",
    "Rocky's Hideout",
    "Springs Shelter Sheds",
    "Tree Shelters",
    "Ski Huts",
    "Rock Cabin",
    "Lower Chalet",
    "Upper Chalet",
    "Junction Cabin",
    "Old Hobartians",
    "Lone Cabin",
    "Lakin's Lair",
    "Luckman's Hut",
    "Rock (Log) Cabin",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697778788878-FGBZ195DLX2SPL9T9G0N/image.jpeg?format=original", alt: "The Sheltered Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356273661-71SRQEWNMKZ72PBDL3HB/03.png?format=original", alt: "Black Man's Cave" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356520550-FN40S8A85JBIH9YNPR0Q/06.jpg?format=original", alt: "Ladies' shelters" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356277749-3R1A9EEX8BJTNQ8CU08P/08.png?format=original", alt: "Rocky's hideout" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356269560-44C9LNYDGTCM4RQZI1RY/02.jpg?format=original", alt: "Springs shelter sheds" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356287813-TM8PTJT69ARM7K1HQZBD/18.jpg?format=original", alt: "Tree shelters" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356273989-IIJPRANFCWZXIAA75I5B/04.png?format=original", alt: "Ski huts" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356287002-Y97PA4W6L1FX6HFJKKMY/17.png?format=original", alt: "Rock Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356285124-WLBMR0HLY24XLF0WOM22/15.jpg?format=original", alt: "Lower chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356286141-I4YPTKO6ZZWJXO6UP8OO/16.jpg?format=original", alt: "Upper chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356280983-1UPEJ7UCJDWA3366EU6W/12.png?format=original", alt: "Junction Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356279375-E8PRKVXADQQXY84PS22C/10.png?format=original", alt: "Old Hobartians" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356277069-U8B1QNLMENO9P472F3B9/07.jpg?format=original", alt: "Lone Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356278156-4CTMZ0WI8SXSC9LNJ94E/09.jpg?format=original", alt: "Lakin's Lair" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356281556-7EA9889W0D4Y8B99XDER/13.jpg?format=original", alt: "Luckman's Hut" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356281943-EZSZLIZ8VQETWV3PNERY/14.png?format=original", alt: "Rock (Log) Cabin" },
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

export default function SheltersHeadPage() {
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
