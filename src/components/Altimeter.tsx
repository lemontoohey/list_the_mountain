"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Altimeter() {
  const { scrollYProgress } = useScroll();

  const topPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="pointer-events-none fixed right-8 top-0 bottom-0 z-[9998] flex w-px justify-center"
      aria-hidden
    >
      {/* Razor-thin vertical line - full height */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brand-accent/30" />

      {/* Diamond that moves down the line with scroll */}
      <motion.div
        className="absolute left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand-accent"
        style={{ top: topPercent }}
      />
    </div>
  );
}
