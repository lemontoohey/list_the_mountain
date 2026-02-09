"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "pure WATER",
    "Waterfalls",
    "Pure Drinking Water",
    "HERITAGE SIGNIFICANCE",
    "ABOUT US            CONTACT US           searcH        Media"
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/5f563722-dffd-4315-9628-33b510876361/Screen%2BShot%2B2020-11-08%2Bat%2B9.07.27%2Bpm.png?format=original", alt: "" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735590169959-FTCUXZSOHX1S8K9PIWNX/Jigsaws-pt.png?format=original", alt: "St Crispins Well" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735859398026-LLI357H13A139IXFCAY8/Collins-Cap-Waterfall_August_12_1905-crop-1.jpg?format=original", alt: "Flora Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1721807294313-UO25W527GZYK8BS82EPB/Screen%252BShot%252B2023-06-30%252Bat%252B10.51.40%252Bpm.jpg?format=original", alt: "Strickland Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1615691105689-0NX5SQTP6OHVR7UKN9XR/Screen%2BShot%2B2021-03-14%2Bat%2B2.04.04%2Bpm.jpg?format=original", alt: "Turana Pallapoirena/Snow" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613104574835-8XB5KPQGTYK2H0R6M36R/Jigsaws-cs.png?format=original", alt: "SPRING WATER" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1611968234073-VZ93VZDTY5LBP46VXJFG/scout_map_600dpi-crop.jpg?format=original", alt: "Kannamayete/WELLINGTON FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612918871851-UJHU6IWPNSWHOM78YGL3/_A150014-2.jpg?format=original", alt: "Lia teruttena/6 LESSER FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1606203930517-I5ISDX44PKDUJPUYV1Y1/Jigsaws-gentle-annie.png?format=original", alt: "GENTLE ANNIE FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605478976671-BUATKY9OX9VVXBV0Y221/Jigsaws+Featherstone.png?format=original", alt: "FEATHERSTONES Cascades" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612876901774-QCK6RQKT1ESR7PZLQAUZ/Jigsaws-sf.png?format=original", alt: "SILVER FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605477184001-9K0UZ1TRZMH6SB274I9K/Jigsaws+NT+Falls.png?format=original", alt: "NEW TOWN FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605477055791-RODS2ENNGQJAJL5N333X/Jigsaws+O+Grady.png?format=original", alt: "O'GRADYS FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612918976636-604OS2R2O35UUJN9ED8Q/2048.jpg?format=original", alt: "Kannah/DISAPPEARING TARN" }
  ],
  paragraphs: [
    "The palawa have many words for different states of water and the mountain’s lower waterfalls would have been well-known  and visited on hot days. They also, potentially, became refuges in calamitous bushfires. “The rivers and the valleys, the landscapes and the river systems: they are all part of our stories,” says Sharnie Read, the TAC Aboriginal Heritage Officer.",
    "Adventurous early Hobartians could wade up Hobart Rivulet almost to the foot of the Organ Pipes, passing several waterfalls, but the first period of mountain waterfall appreciation commenced in the 1840s with the public adoration of Wellington Falls—“The Falls” on the mountain. A second gush of appreciation came in the 1880s, Another burst in the 1930s with waterfall postcards proliferating, some hand-tinted, out of the developing tanks of John Beattie’s photographic studio.  This appreciation encouraged the building of tracks to the best known / closest falls.",
    "Yet after a century, the Hodgman map of 1936 marks only four: O’Grady’s, Featherstone Cascades, New Town and Gentle Annie. Today, the mountain’s water lovers extoll more than a dozen easily approached tumbling vistas, several with scenic admiration bridges.",
    "The drinking water catchments within Wellington Park provide 20% of greater Hobart’s drinking water.",
    "Waterfalls cultural value is aesthetic and social. Waterfalls were one of the key attractors for track-making, hut-building and mountain visiting. Wellington Park Management Trust has given several of these waterfalls heritage code recognition (i.e. a HH number.) Several Wellington Park falls appear on top-10 lists of Tasmanian waterfalls."
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

export default function PureSpringsHeadPage() {
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
      </section>

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
                  src={CONTENT.images[1].src}
                  alt={CONTENT.images[1].alt || ""}
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
              {CONTENT.headings[1] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[2] ?? "List the Mountain."}
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
                  src={CONTENT.images[2].src}
                  alt={CONTENT.images[2].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[3].src}
                  alt={CONTENT.images[3].alt || ""}
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
              {CONTENT.headings[3] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[4] ?? "List the Mountain."}
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
                  src={CONTENT.images[4].src}
                  alt={CONTENT.images[4].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[5].src}
                  alt={CONTENT.images[5].alt || ""}
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
              {CONTENT.headings[5] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[6] ?? "List the Mountain."}
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
                  src={CONTENT.images[6].src}
                  alt={CONTENT.images[6].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[7].src}
                  alt={CONTENT.images[7].alt || ""}
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
              {CONTENT.headings[7] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[8] ?? "List the Mountain."}
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
                  src={CONTENT.images[8].src}
                  alt={CONTENT.images[8].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[9].src}
                  alt={CONTENT.images[9].alt || ""}
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
              {CONTENT.headings[9] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[10] ?? "List the Mountain."}
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
                  src={CONTENT.images[10].src}
                  alt={CONTENT.images[10].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[11].src}
                  alt={CONTENT.images[11].alt || ""}
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
              {CONTENT.headings[11] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[12] ?? "List the Mountain."}
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
                  src={CONTENT.images[12].src}
                  alt={CONTENT.images[12].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[13].src}
                  alt={CONTENT.images[13].alt || ""}
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
              {CONTENT.headings[13] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
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
              {CONTENT.headings[14] ?? "List the Mountain."}
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
                  src={CONTENT.images[14].src}
                  alt={CONTENT.images[14].alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
                  src={CONTENT.images[15].src}
                  alt={CONTENT.images[15].alt || ""}
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
              {CONTENT.headings[15] ?? ""}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
