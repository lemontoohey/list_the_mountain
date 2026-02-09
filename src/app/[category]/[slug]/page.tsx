import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findBestMatch } from "@/lib/content-utils";

export const dynamic = "force-static";

/** Pre-render all known category/slug pairs from scraped-content */
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "scraped-content");
  const params: { category: string; slug: string }[] = [];
  try {
    const categories = await fs.readdir(contentDir);
    for (const category of categories) {
      const catPath = path.join(contentDir, category);
      const stat = await fs.stat(catPath);
      if (!stat.isDirectory()) continue;
      const files = await fs.readdir(catPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          params.push({ category, slug: file.replace(/\.json$/, "") });
        }
      }
    }
  } catch {
    // no scraped-content or empty
  }
  return params;
}

async function getArticleData(category: string, slug: string) {
  const filePath = path.join(process.cwd(), "scraped-content", category, `${slug}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  let data = await getArticleData(category, slug);

  if (!data) {
    const matchedSlug = await findBestMatch(category, slug.replace(/-/g, " "));
    if (matchedSlug && matchedSlug !== slug) {
      const matchedData = await getArticleData(category, matchedSlug);
      if (matchedData) {
        redirect(`/${category}/${matchedSlug}`);
      }
    }
    data = {
      title: slug.replace(/-/g, " "),
      _placeholder: true,
      images: [],
    };
  }

  const heroImage =
    data.images && data.images.length > 0 ? data.images[0].src : null;
  const heroAlt =
    data.images?.[0]?.alt ?? data.title ?? "";

  return (
    <main className="min-h-screen bg-brand-background text-brand-parchment selection:bg-brand-accent selection:text-brand-background">
      {/* Navigation: Back Button */}
      <nav className="fixed top-0 left-0 z-50 p-6 mix-blend-difference">
        <Link
          href={`/${category}`}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-parchment transition-colors hover:text-brand-accent"
        >
          <span className="block h-px w-8 bg-brand-parchment transition-all group-hover:w-12 group-hover:bg-brand-accent" />
          Back to Collection
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-background/20 to-brand-background" />

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 md:p-12 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-brand-header text-4xl font-bold uppercase leading-none tracking-poster text-brand-parchment md:text-6xl lg:text-7xl">
              {data.title?.replace(/-/g, " ") ?? slug.replace(/-/g, " ")}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative px-6 py-12 md:px-12 md:py-24">
        <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-brand-accent" />

        <div className="mx-auto max-w-prose">
          {data._placeholder ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
              <div className="h-px w-12 bg-brand-accent/50" />
              <p className="font-serif text-2xl italic text-brand-parchment/60">
                &ldquo;The archives are currently being digitized.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-brand-accent">
                Content Coming Soon
              </p>
              <div className="h-px w-12 bg-brand-accent/50" />
            </div>
          ) : (
            <div className="space-y-8 font-sans font-light leading-loose text-brand-parchment/90 md:text-lg">
              {data.paragraphs &&
                data.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}

              {(!data.paragraphs || data.paragraphs.length === 0) &&
                data.contentHtml && (
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.contentHtml }}
                  />
                )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
