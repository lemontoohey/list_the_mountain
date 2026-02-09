import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-6">
      <main className="flex max-w-2xl flex-col items-center gap-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#F5F5F5] md:text-5xl">
          List the Mountain
        </h1>
        <p className="text-lg text-[#F5F5F5]/80">
          Discover the unspoiled grandeur of the mountain.
        </p>
        <Link
          href="/natural-features"
          className="rounded-full border border-[#F5F5F5] bg-transparent px-8 py-3 text-[#F5F5F5] transition-colors hover:bg-[#F5F5F5] hover:text-[#111111]"
        >
          Explore natural features
        </Link>
      </main>
    </div>
  );
}
