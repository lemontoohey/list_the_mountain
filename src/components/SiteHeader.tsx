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
      </div>
    </header>
  );
}
