import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { findBestMatch } from "@/lib/content-utils";
import { ArticlePageContent } from "@/components/ArticlePageContent";

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

  return <ArticlePageContent data={data} category={category} slug={slug} />;
}
