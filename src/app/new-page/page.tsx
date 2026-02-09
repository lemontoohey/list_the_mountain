"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CONTENT = {
  headings: [
    "GEOHERITAGE",
    "ABOUT US            CONTACT US           searcH        Media"
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293823224-3AI9JHRR676EXXUY8ARM/Jigsaws-dwg.png?format=original", alt: "Local Geoheritage Sites" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293824421-4Z3XJTWYKP70NC86NBG8/Jigsaws-cr-1.png?format=original", alt: "Jigsaws-cr-1.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293826181-H5MU76CPYAYHBL2Y8QE7/Jigsaws-tors.png?format=original", alt: "Jigsaws-tors.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293827551-HRBQGUG1BVAPF0CVFH32/Jigsaws-cr.png?format=original", alt: "Jigsaws-cr.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1740822504987-ANSEYKZH6ORNDTXJFKD6/image-asset.jpeg?format=original", alt: "ROCKING STONE" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1740822753318-Z0LCRG33MZ9D7ECYTBL0/Screen%2BShot%2B2020-02-28%2Bat%2B11.59.17%2Bam.png?format=original", alt: "The GeoHeritage Landscape" }
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

export default function NewPagePage() {
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

      <section className="py-24 md:py-32" aria-hidden />

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
    </main>
  );
}
