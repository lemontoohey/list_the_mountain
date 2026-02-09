import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "science-head";

const CONTENT = {
  headings: [
    "The Scientific Landscape",
    "Scientific Landscape",
    "Brown's Botanical Bible",
    "Meterological Stations",
    "Cosmic Observatory",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697755221813-OGBUEZHKPL0101RWXHKT/COSE_Environment-Geo-Heritage-Shoot-105%2B2.jpeg?format=original", alt: "Scientific Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613355346811-DF170UWGO94WTYGJYPUK/08.jpg?format=original", alt: "Brown's Botanical bible" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613355345597-WCIG0IJXGXSSHMAOH4IH/06.jpg?format=original", alt: "Meterological Stations" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613355347893-UCXKS3HWSNCY3MDA71VZ/10.jpg?format=original", alt: "Cosmic Observatory" },
  ],
};

export default async function ScienceHeadPage() {
  const contentImages = CONTENT.images.slice(1);
  const realSlugs = await Promise.all(
    contentImages.map((_, i) =>
      findBestMatch(PAGE_SLUG, CONTENT.headings[i + 1] ?? "List the Mountain.")
    )
  );
  return (
    <HeadPageGallery
      headings={CONTENT.headings}
      images={CONTENT.images}
      pageSlug={PAGE_SLUG}
      realSlugs={realSlugs}
    />
  );
}
