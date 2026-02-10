"use client";

import { useState, useEffect } from "react";

const LINES = [
  "DECRYPTING: Walking Tracks...",
  "FETCHING DATA: Site No. 42...",
  "SIGNAL STRENGTH: STABLE",
  "ARCHIVE INDEX: LOADED",
  "AUTHENTICATING: OK",
  "DECRYPTING: Mountain Huts...",
  "FETCHING DATA: Site No. 07...",
  "SIGNAL STRENGTH: STABLE",
  "ROUTE: natural-features-head",
  "DECRYPTING: Beauty Spots...",
  "FETCHING DATA: Site No. 12...",
  "SIGNAL STRENGTH: STABLE",
];

export default function LogFeed() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setOffset((o) => (o + 1) % LINES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const lineHeight = 20;
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-[100] h-[100px] w-[240px] overflow-hidden rounded border border-brand-parchment/10 bg-brand-background/90 font-mono text-[9px] leading-relaxed tracking-wider text-brand-parchment/50"
      aria-hidden
    >
      <div
        className="flex flex-col py-2 pl-3 pr-2 transition-transform duration-1000 ease-out"
        style={{ transform: `translateY(-${offset * lineHeight}px)` }}
      >
        {[...LINES, ...LINES].map((line, i) => (
          <span key={i} style={{ height: lineHeight, flexShrink: 0 }}>{line}</span>
        ))}
      </div>
    </div>
  );
}
