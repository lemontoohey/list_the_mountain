"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const MAIN_HEADING = "The Unspoiled Grandeur of the Mountain";
const BODY_1 =
  "Our mountain is a testament to the raw, untamed beauty of the natural world. From the highest, wind-swept peaks to the serene, hidden valleys, every element tells a story of geological time and ecological resilience. We believe that connecting with these natural features is essential for understanding our own place in the world and the importance of stewardship.";
const SUB_1 = "Majestic Peaks and Rugged Ridges";
const BODY_2 =
  "The skyline is dominated by a series of majestic peaks, each with its own unique character. These rocky sentinels are the result of millions of years of tectonic uplift and glacial carving. The ridges that connect them offer challenging traverses and breathtaking panoramic views, reminding us of the rewards that come from persevering through difficulty.";
const SUB_2 = "Pristine Alpine Lakes";
const BODY_3 =
  "Nestled in the high-altitude basins are pristine alpine lakes, their waters a brilliant turquoise fed by glacial melt. These tranquil oases provide a stark contrast to the ruggedness of the surrounding rock. They serve as a place for quiet reflection, a symbol of purity, and a vital source of life for the mountain's ecosystem.";

const HEADER_IMG = "https://images.unsplash.com/photo-1589834390031-1829311317d7";
const CONTENT_IMG = "https://images.unsplash.com/photo-1507501739272-54d97375a359";

export default function NaturalFeaturesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={HEADER_IMG}
          alt="Mountain grandeur"
          fill
          className="object-cover -z-10"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.h1
            className="text-center text-4xl font-bold text-[#F5F5F5] drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {MAIN_HEADING}
          </motion.h1>
        </div>
      </section>

      {/* Intro paragraph */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-2xl text-center text-[#F5F5F5]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg leading-relaxed">{BODY_1}</p>
        </motion.div>
      </section>

      {/* Peaks — content left */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-2xl font-semibold text-[#F5F5F5] md:text-3xl">
              {SUB_1}
            </h2>
            <p className="leading-relaxed text-[#F5F5F5]/90">{BODY_2}</p>
          </motion.div>
        </div>
      </section>

      {/* Lakes — image right, text left */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <motion.div
            className="max-w-xl flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-2xl font-semibold text-[#F5F5F5] md:text-3xl">
              {SUB_2}
            </h2>
            <p className="leading-relaxed text-[#F5F5F5]/90">{BODY_3}</p>
          </motion.div>
          <motion.div
            className="relative aspect-[4/3] w-full flex-[1.2] overflow-hidden rounded-lg md:max-w-[55%] md:flex-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={CONTENT_IMG}
              alt="Alpine lakes"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
