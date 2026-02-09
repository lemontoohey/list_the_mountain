"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "pure WATER",
    "Waterfalls",
    "Pure Drinking Water",
    "HERITAGE SIGNIFICANCE",
  ],
  paragraphs: [
    "The palawa have many words for different states of water and the mountain's lower waterfalls would have been well-known  and visited on hot days. They also, potentially, became refuges in calamitous bushfires. \"The rivers and the valleys, the landscapes and the river systems: they are all part of our stories,\" says Sharnie Read, the TAC Aboriginal Heritage Officer.",
    "Adventurous early Hobartians could wade up Hobart Rivulet almost to the foot of the Organ Pipes, passing several waterfalls, but the first period of mountain waterfall appreciation commenced in the 1840s with the public adoration of Wellington Falls—\"The Falls\" on the mountain. A second gush of appreciation came in the 1880s, Another burst in the 1930s with waterfall postcards proliferating, some hand-tinted, out of the developing tanks of John Beattie's photographic studio.  This appreciation encouraged the building of tracks to the best known / closest falls.",
    "Yet after a century, the Hodgman map of 1936 marks only four: O'Grady's, Featherstone Cascades, New Town and Gentle Annie. Today, the mountain's water lovers extoll more than a dozen easily approached tumbling vistas, several with scenic admiration bridges.",
    "The drinking water catchments within Wellington Park provide 20% of greater Hobart's drinking water.",
    "Waterfalls cultural value is aesthetic and social. Waterfalls were one of the key attractors for track-making, hut-building and mountain visiting. Wellington Park Management Trust has given several of these waterfalls heritage code recognition (i.e. a HH number.) Several Wellington Park falls appear on top-10 lists of Tasmanian waterfalls.",
  ],
  images: [
    "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png",
    "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png",
    "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/5f563722-dffd-4315-9628-33b510876361/Screen%2BShot%2B2020-11-08%2Bat%2B9.07.27%2Bpm.png",
  ],
} as const;

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
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

export default function PureSpringsHeadPage() {
  const heroWords = CONTENT.headings[0].split(" ");

  return (
    <main className="bg-[#111111]">
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={CONTENT.images[0]}
          alt=""
          fill
          className="object-cover -z-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[#111111]/65" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.h1
            className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-4xl font-bold tracking-wider text-[#F5F5F5] drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl"
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

      {/* Intro: first paragraph */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-prose text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          {...sectionAnimation}
        >
          <p className="text-lg leading-relaxed text-[#F5F5F5]">
            {CONTENT.paragraphs[0]}
          </p>
        </motion.div>
      </section>

      {/* Layout A: Image left, text right — Waterfalls */}
      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.45fr_0.55fr]">
          <motion.div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <Image
              src={CONTENT.images[1]}
              alt="Water features"
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
            <h2 className="mb-6 text-2xl font-semibold tracking-wide text-[#F5F5F5] md:text-3xl">
              {CONTENT.headings[1]}
            </h2>
            <p className="max-w-prose text-lg leading-relaxed text-[#F5F5F5]/90">
              {CONTENT.paragraphs[1]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Layout B: Text left, image right — Pure Drinking Water */}
      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.55fr_0.45fr]">
          <motion.div
            className="order-2 flex flex-col justify-center md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <h2 className="mb-6 text-2xl font-semibold tracking-wide text-[#F5F5F5] md:text-3xl">
              {CONTENT.headings[2]}
            </h2>
            <p className="max-w-prose text-lg leading-relaxed text-[#F5F5F5]/90">
              {CONTENT.paragraphs[2]}
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-[#F5F5F5]/90">
              {CONTENT.paragraphs[3]}
            </p>
          </motion.div>
          <motion.div
            className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-sm md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            {...sectionAnimation}
          >
            <Image
              src={CONTENT.images[2]}
              alt="Wellington Park water"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Full-width: HERITAGE SIGNIFICANCE */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-screen-lg text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          {...sectionAnimation}
        >
          <h2 className="mb-8 text-2xl font-semibold tracking-wide text-[#BDB7AB] md:text-3xl">
            {CONTENT.headings[3]}
          </h2>
          <p className="mx-auto max-w-prose text-lg leading-relaxed text-[#F5F5F5]/90">
            {CONTENT.paragraphs[4]}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
