import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-6">
      <main className="flex max-w-2xl flex-col items-center gap-10 text-center">
        <h1 className="font-brand-header text-4xl font-bold uppercase tracking-poster text-brand-parchment md:text-5xl">
          List the Mountain
        </h1>
        <p className="text-lg text-brand-parchment/80">
          Discover the unspoiled grandeur of the mountain.
        </p>
        <Link
          href="/natural-features"
          className="rounded-full border border-brand-parchment bg-transparent px-8 py-3 text-brand-parchment transition-colors hover:bg-brand-parchment hover:text-brand-background"
        >
          Explore natural features
        </Link>
      </main>
    </div>
  );
}
