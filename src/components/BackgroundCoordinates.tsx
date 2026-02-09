"use client";

import { motion } from "framer-motion";

const COORDINATES = [
  { label: "LAT 42.8° S", position: "top-right" },
  { label: "LON 147.2° E", position: "bottom-left" },
  { label: "EL 1271M", position: "top-left" },
  { label: "GRID 55H", position: "bottom-right" },
];

const positionClasses: Record<string, string> = {
  "top-right": "top-8 right-8 md:top-12 md:right-12",
  "bottom-left": "bottom-8 left-8 md:bottom-12 md:left-12",
  "top-left": "top-[40%] left-6 md:left-12",
  "bottom-right": "bottom-[30%] right-6 md:right-12",
};

export default function BackgroundCoordinates() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {COORDINATES.map(({ label, position }, i) => (
        <motion.span
          key={position}
          className={`absolute font-sans text-[10px] tracking-widest text-brand-accent ${positionClasses[position]}`}
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 8 + i * 1.2,
            repeat: Infinity,
            repeatDelay: 2 + (i % 3),
          }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}
