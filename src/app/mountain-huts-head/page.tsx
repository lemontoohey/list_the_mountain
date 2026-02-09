"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "MOUNTAIN HUTS", // Hero Title
    "The Architectural Landscape",
    "Goat Hills",
    "Earliest Hut",
    "Waratah",
    "Fern Retreat",
    "Wellington",
    "Bluebell",
    "Forest",
    "Brushy Creek",
    "Wattle Grove",
    "Falls",
    "Cascade",
    "Clematis",
    "Myrtle 1",
    "Fern Grove",
    "Musk",
    "Cluster Grove",
    "Wattle Grove 2",
    "Pitman & Scarr's",
    "Madison Square",
    "Myrtle 2",
    "Old Mill Cabin",
    "Old Log Hut",
    "McRobies Gully",
    "Grasstree",
    "Viktor's Temple",
    "Black Snake Camp",
    "Ellis & Sansom Bros.",
    "Thark",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697778455234-5A0MNBMVA74Y7I1YSH5E/image.jpeg?format=original", alt: "The Architectural Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351629156-R8EHBMTKX80A6MLBKTP4/02.jpg?format=original", alt: "Goat Hills" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351641674-0ILNG8N1JEATK4CIXX1T/16.jpg?format=original", alt: "Earliest hut" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351644241-FW3V9JKO4S88Z8ABPJL2/20.jpg?format=original", alt: "Waratah" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351630990-SJ48ZN9M0JNB7E6DKSIV/03.jpg?format=original", alt: "Fern Retreat" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351635991-3P5BGPPSVQ7EFT5P93ZL/09.jpg?format=original", alt: "Wellington" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351640374-ZZLTECIGJB5XZCK3IVF6/14.jpg?format=original", alt: "Bluebell" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351633111-DYLEC5C5XHQZ31NTQDSF/06.jpg?format=original", alt: "Forest" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361313836-94OGINWCF9FST3NXR5RT/009.jpg?format=original", alt: "Brushy Creek" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361309769-EH3DBQ3J6AVVIHJQMD3M/004.jpg?format=original", alt: "Wattle Grove" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351634348-WD0S91GVT1JXJ6ZMN1XF/07.jpg?format=original", alt: "Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361307044-L11Q378BIJC2CX1A6PPL/002.jpg?format=original", alt: "Cascade" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351632485-90XX4YY8Q6HRBDN6IM6H/05.jpg?format=original", alt: "Clematis" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351639683-DZG08VHCS4KMKIOP6QZ0/13.jpg?format=original", alt: "Myrtle 1" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351643135-Y2CR26FHSL13Z65JC5CO/18.jpg?format=original", alt: "Fern Grove" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361307026-4X18IHPFCQUKKZY5OS3D/001.jpg?format=original", alt: "Musk" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351642996-RXSAOTUZP4GIC6NCE4ON/19.jpg?format=original", alt: "Cluster Grove" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351637220-ZT0TSCLSS8KFPIP2070L/10.jpg?format=original", alt: "Wattle Grove 2" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361310510-T51OH083UBMBD1M2GJVQ/005.jpg?format=original", alt: "Pitman & Scarr's" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351642136-KLHVFBD3SGY4SQFLM2DV/17.jpg?format=original", alt: "Madison Square" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351635328-YBKJ7KW2SHKANF9RVY72/08.jpg?format=original", alt: "Myrtle 2" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351638239-U444RRM42D28AJDKAQ30/11.jpg?format=original", alt: "Old Mill Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613352233334-G4R7I71MLZGUV7KZDNDG/oldloghut.jpg?format=original", alt: "Old Log Hut" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351640896-CWWQU6K9UYPY113ARYL7/15.jpg?format=original", alt: "McRobies Gully" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613351631408-IQSEZB2SDMECG3ZXE94R/04.jpg?format=original", alt: "Grasstree" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361309480-AY4I98Y293EA74TZLWT0/003.jpg?format=original", alt: "Viktor's Temple" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361311773-QD9L54OWSIQWY372DISM/006.jpg?format=original", alt: "Black Snake Camp" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361312596-MJE24LCLZJKRG6ATJDJW/007.jpg?format=original", alt: "Ellis & Sansom Bros." },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613361313198-NLJ0H17K4R65G9E0HT3E/008.jpg?format=original", alt: "Thark" },
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

export default function MountainHutsHeadPage() {
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
