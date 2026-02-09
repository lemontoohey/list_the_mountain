"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "GEOHERITAGE",
    "ABOUT US · CONTACT US · SEARCH · MEDIA",
  ],
  images: [
    "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png",
    "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png",
  ],
} as const;

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
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export default function NewPage() {
  const heroWords = CONTENT.headings[0].split(" ").filter(Boolean);

  return (
    <main className="bg-[#111111]">
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={CONTENT.images[0]}
          alt=""
          fill
          className="object-cover -z-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[#111111]/60" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.h1
            className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-4xl font-bold tracking-wider text-[#F5F5F5] drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {heroWords.length > 0 ? (
              heroWords.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))
            ) : (
              <motion.span
                variants={word}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-block"
              >
                {CONTENT.headings[0]}
              </motion.span>
            )}
          </motion.h1>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-hidden />

      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.45fr_0.55fr]">
          <motion.div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <Image
              src={CONTENT.images[0]}
              alt="List the Mountain"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            {...sectionAnimation}
          >
            <p className="max-w-prose text-lg leading-relaxed text-[#F5F5F5]/90">
              {CONTENT.headings[1]}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.55fr_0.45fr]">
          <motion.div
            className="order-2 flex flex-col justify-center md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <p className="max-w-prose text-lg leading-relaxed text-[#BDB7AB]">
              List the Mountain — geoheritage.
            </p>
          </motion.div>
          <motion.div
            className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-sm md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <Image
              src={CONTENT.images[1]}
              alt="List the Mountain"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
