"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const PAGE_SLUG = "walking-tracks";

const CONTENT = {
  headings: [
    "WALKING TRACKS", // Hero Title
    "The Track Landscape",
    "Zig Zag",
    "Organ Pipes",
    "Ploughed Fields",
    "Ice House",
    "Fingerpost",
    "Wellington Falls",
    "New Town Way",
    "Kangaroo Valley",
    "Pipeline",
    "Fern Glade",
    "Red Paint",
    "Shoobridge",
    "Betts Vale & Circle",
    "Myrtle Gully",
    "Breakneck",
    "Hunters",
    "Cathedral Rock",
    "Milles",
    "Sawmill",
    "South Wellington",
    "Ploughed Fields Map",
    "Jigsaws",
    "Lenah Valley",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358243122-H1ZE5BQGOK92H25QQ7AV/01.png?format=original", alt: "The Track Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358242631-0TJ09GQDKM9H7TW2IPVS/02.png?format=original", alt: "Zig Zag" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358244003-H8ND1XWA1VTT471GBX84/03.jpg?format=original", alt: "Organ Pipes" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358245020-JL3ONH9K7U89Q539QRIV/04.jpg?format=original", alt: "Ploughed Fields" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358245503-03YGH56Z7JK5DQUFSACU/05.jpg?format=original", alt: "Ice House" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358246735-QLG1KY6L8Z6996NSDM2L/06.png?format=original", alt: "Fingerpost" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358247842-KAZAHQXPPV0SYF44PRRT/07.jpg?format=original", alt: "Wellington Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358248133-GZO3G11G0VSUN8H79VAF/08.png?format=original", alt: "New Town Way" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358252860-R51G28KDD6EK6Z0OI8FZ/09.png?format=original", alt: "Kangaroo Valley" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358255582-LIBROWBR3K3G7IJIL0PA/11.png?format=original", alt: "Pipeline" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358257146-2G6FP8YBRMY18NK25YQ6/12.png?format=original", alt: "Fern Glade" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358606141-QP617HT5R41VAG1HJ10S/13.png?format=original", alt: "Red Paint" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358258377-4SBQ1WKDSROMFHL0K8N9/14.jpg?format=original", alt: "Shoobridge" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358259848-02YN0XSPLZUCWWK3PFGX/15.png?format=original", alt: "Betts Vale & Circle" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358543640-P66ZPR0W18BMZIOZ05AE/16.png?format=original", alt: "Myrtle Gully" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358543882-KIFEJTSMTT4R93DWJRBP/17.jpg?format=original", alt: "Breakneck" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1646024047375-95CYKBM1ATY93WHR3IX9/image-asset.jpeg?format=original", alt: "Hunters" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1647492617905-EI55TMWB3JZ6JPPY6TB1/cathedral-rock.jpg?format=original", alt: "Cathedral Rock" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1649823765451-1WJH15EZF7QHULN9R8GV/milles+track.jpg?format=original", alt: "Milles" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1649827315576-4TP364NVNT2BE8SGIA45/sawmill+map.jpg?format=original", alt: "Sawmill" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1650243835077-E67M06UGSG1V5ROKCXFL/south-wellington-hodgman-crop.jpg?format=original", alt: "South Wellington" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1725345773733-RKMGBG0HRTYNLEGV3A6I/ploughed-map.jpg?format=original", alt: "Ploughed Fields" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735559103403-NK6FEX7TX2W2R3OQUZ75/Jigsaws-pt.png?format=original", alt: "Jigsaws-pt.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735939117168-1BI7W8EBY7JHSRMCCDFY/20.png?format=original", alt: "Lenah Valley" },
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

export default function WalkingTracksPage() {
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
