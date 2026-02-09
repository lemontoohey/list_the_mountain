"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "WATER FEATURES", // Hero Title
    "Waterfalls",
    "St Crispins Well",
    "Flora Falls",
    "Strickland Falls",
    "Turana Pallapoirena / Snow",
    "Spring Water",
    "Wellington Falls",
    "6 Lesser Falls",
    "Gentle Annie Falls",
    "Featherstones Cascades",
    "Silver Falls",
    "New Town Falls",
    "O'Gradys Falls",
    "Disappearing Tarn",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/5f563722-dffd-4315-9628-33b510876361/Screen%2BShot%2B2020-11-08%2Bat%2B9.07.27%2Bpm.png?format=original", alt: "Waterfalls" },
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
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612918976636-604OS2R2O35UUJN9ED8Q/2048.jpg?format=original", alt: "Kannah/DISAPPEARING TARN" },
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

export default function PureSpringsHeadPage() {
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
            </div>
          </section>
        );
      })}
    </main>
  );
}
