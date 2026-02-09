"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const item = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: (SECTIONS.length - 1 - i) * 0.06, duration: 0.4, ease: "easeOut" },
  },
});

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<typeof SECTIONS[0] | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col bg-brand-background pt-24"
      onMouseMove={onMouseMove}
    >
      <main className="relative mx-auto flex w-full max-w-2xl flex-col px-6 pb-32 pt-12">
        <motion.ul
          className="flex flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
        >
          {SECTIONS.map((section, i) => (
            <motion.li
              key={section.href}
              variants={item(i)}
              className="flex justify-center"
            >
              <Link
                href={section.href}
                className="font-brand-header text-4xl uppercase tracking-tighter text-brand-parchment transition-colors duration-300 hover:text-[#D94A38] md:text-5xl"
                onMouseEnter={() => setHovered(section)}
                onMouseLeave={() => setHovered(null)}
              >
                {section.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Ghost image: follows cursor when a link is hovered */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="ghost"
              className="pointer-events-none fixed z-50 h-40 w-56 overflow-hidden rounded border border-brand-accent/30 bg-brand-background/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              style={{
                left: mouse.x,
                top: mouse.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  filter: "grayscale(1) contrast(200%) brightness(0.8)",
                  mixBlendMode: "multiply",
                }}
              >
                <Image
                  src={hovered.hero}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="224px"
                  unoptimized
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
