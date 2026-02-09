"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const PAGE_SLUG = "political-flashpoints-head";

const CONTENT = {
  headings: [
    "POLITICAL FLASHPOINTS", // Hero Title
    "The Political Landscape",
    "Fern-Hookers",
    "Forest Vandals",
    "Utopia",
    "Teetotallers",
    "Big Bend Chalet",
    "Glass Coaches",
    "Ogilvie's Scar",
    "Pinnacle Beacon",
    "The Condoms",
    "Anti-Nuke Peacenik",
    "The Castle",
    "The Carbuncle",
    "Indigenous Protected Area",
    "Zipline",
    "Heritage",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697672102227-0C7AOHLX8KTYCS7WNMRR/aerial%2Bphoto4.jpeg?format=original", alt: "The Political Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069938-PP20KXZSDTTBWEV0GQK0/07.png?format=original", alt: "Fern-hookers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1619564681469-YNHGNXEI9JGUTHPEOXDC/image-asset.jpeg?format=original", alt: "Forest Vandals" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069053-KOFOWUGTA7MC8X9V2ZPH/05.jpg?format=original", alt: "Utopia" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354073509-OP0KE8LKBFRL8NZNL3ZN/08.png?format=original", alt: "Teetotallers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684294681692-SDHK1V55RADZQ57RH6KR/Screen+Shot+2023-05-16+at+10.44.37+pm.png?format=original", alt: "Big Bend Chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1651634187089-UGD3E1CWWM6W2SO4HMIP/14.png?format=original", alt: "Glass coaches" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069390-6SO4OT9N755FTP7RID30/06.jpg?format=original", alt: "Ogilvie's Scar" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1650345106033-Q7R3ZODH4VULTTD3Y0TX/nla.news-page000001829547-nla.news-article30061849-L5-caf49d3fda4e28bc7f18e86f46cb7a1f-0001.jpg?format=original", alt: "Pinnacle beacon" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684387066003-HYRWO2BRA46Y30VPWGZ0/IMG_4910.jpg?format=original", alt: "The Condoms" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684385935729-Y7MPM2ZJ5VPZF18Q5I3P/10.jpeg?format=original", alt: "Anti-nuke Peacenik" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354068335-BL7Z429SJFUJB2E6A2LT/03.jpg?format=original", alt: "The Castle" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684381209273-CO9D00HJR20D9HJIOJP6/Pinnacles_Summit_Mount_Wellington_Hobart_Tasmania_AU_4908.jpg?format=original", alt: "The Carbuncle" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354067534-PKDFGL9TVKMUWIVIVF60/02.png?format=original", alt: "Indigenous Protected Area" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1724471336537-ATU0ORGL4XG1S7X40GHV/Screenshot%2B2024-08-24%2Bat%2B1.46.54%25E2%2580%25AFPM.jpg?format=original", alt: "Zipline" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1724475359541-6Q3GRAHMYKFAZ75DTQ9W/Jigsaws-im.png?format=original", alt: "Heritage" },
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

export default function PoliticalFlashpointsHeadPage() {
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
