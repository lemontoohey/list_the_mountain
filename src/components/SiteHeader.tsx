"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[9997] border-b border-brand-accent/20 bg-brand-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-parchment transition-colors hover:text-brand-accent"
        >
          List the Mountain
        </Link>
        <Link
          href="/#enquire"
          className="border border-brand-parchment/40 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-parchment/80 transition-colors hover:border-brand-accent hover:text-brand-accent"
        >
          REQUEST ACCESS
        </Link>
      </div>
    </header>
  );
}
