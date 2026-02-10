"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const DEFAULT_HERO =
  "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original";

const SECTIONS = [
  { href: "/natural-features-head", label: "Beauty Spots", hero: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697799083755-W6NDLF4O6GR1P6RFHUC5/Screen+Shot+2023-10-19+at+1.38.12+pm.jpeg?format=original" },
  { href: "/pure-springs-head", label: "Water Features", hero: DEFAULT_HERO },
  { href: "/ceremonial-grounds-head", label: "Ceremonial Grounds", hero: DEFAULT_HERO },
  { href: "/political-flashpoints-head", label: "Political Flashpoints", hero: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697672102227-0C7AOHLX8KTYCS7WNMRR/aerial%2Bphoto4.jpeg?format=original" },
  { href: "/mind-fields-head", label: "Mind Fields", hero: DEFAULT_HERO },
  { href: "/landscapes", label: "Landscapes", hero: DEFAULT_HERO },
  { href: "/shelters-head", label: "Shelters", hero: DEFAULT_HERO },
  { href: "/mountain-huts-head", label: "Mountain Huts", hero: DEFAULT_HERO },
  { href: "/walking-tracks", label: "Walking Tracks", hero: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613358243122-H1ZE5BQGOK92H25QQ7AV/01.png?format=original" },
  { href: "/adventure-point", label: "Adventure Point", hero: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697777593739-QIT6BUT20E1DJIWZOQPZ/Jigsaws-climber.jpg?format=original" },
  { href: "/living-wonders-head", label: "Living Wonders", hero: DEFAULT_HERO },
  { href: "/science-head", label: "Science", hero: DEFAULT_HERO },
  { href: "/work-sites", label: "Work Sites", hero: DEFAULT_HERO },
  { href: "/indigenous-head", label: "Indigenous", hero: DEFAULT_HERO },
  { href: "/tourist-destinations", label: "Tourist Destinations", hero: DEFAULT_HERO },
  { href: "/new-page", label: "More", hero: DEFAULT_HERO },
  { href: "/natural-features", label: "Natural Features (intro)", hero: DEFAULT_HERO },
];

const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" },
  }),
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background pt-24">
      <main className="relative mx-auto flex w-full max-w-2xl flex-col px-6 pb-32 pt-12">
        <motion.ul
          className="flex flex-col items-center gap-6 border border-transparent"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.1 },
            },
          }}
        >
          {SECTIONS.map((section, i) => (
            <motion.li
              key={section.href}
              custom={i}
              variants={listItemVariants}
              className="flex justify-center"
            >
              <Link
                href={section.href}
                className="font-brand-header text-4xl uppercase tracking-tighter text-brand-parchment transition-colors duration-300 hover:text-[#D94A38] md:text-5xl"
              >
                {section.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </main>
    </div>
  );
}
