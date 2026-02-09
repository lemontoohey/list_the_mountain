import Link from "next/link";

const SECTIONS = [
  { href: "/natural-features-head", label: "Beauty Spots" },
  { href: "/pure-springs-head", label: "Water Features" },
  { href: "/ceremonial-grounds-head", label: "Ceremonial Grounds" },
  { href: "/political-flashpoints-head", label: "Political Flashpoints" },
  { href: "/mind-fields-head", label: "Mind Fields" },
  { href: "/landscapes", label: "Landscapes" },
  { href: "/shelters-head", label: "Shelters" },
  { href: "/mountain-huts-head", label: "Mountain Huts" },
  { href: "/walking-tracks", label: "Walking Tracks" },
  { href: "/adventure-point", label: "Adventure Point" },
  { href: "/living-wonders-head", label: "Living Wonders" },
  { href: "/science-head", label: "Science" },
  { href: "/work-sites", label: "Work Sites" },
  { href: "/indigenous-head", label: "Indigenous" },
  { href: "/tourist-destinations", label: "Tourist Destinations" },
  { href: "/new-page", label: "More" },
  { href: "/natural-features", label: "Natural Features (intro)" },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background pt-20">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12 px-6 pb-24 pt-8 text-center">
        <h1 className="font-display text-4xl font-bold uppercase tracking-[0.2em] text-brand-parchment md:text-5xl">
          List the Mountain
        </h1>
        <p className="text-lg text-brand-parchment/80">
          Discover the unspoiled grandeur of the mountain.
        </p>
        <section className="w-full text-left">
          <h2 className="font-display mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Explore all sections
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {SECTIONS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded border border-brand-parchment/20 bg-brand-parchment/5 px-4 py-3 text-brand-parchment transition-colors hover:border-brand-accent/50 hover:bg-brand-accent/10 hover:text-brand-parchment"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
