import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "mind-fields-head";

const CONTENT = {
  headings: [
    "Landscapes of the Mind", // Hero Title
    "The Intangible Landscape",
    "The Sacred Hill",
    "Emotional Territory",
    "Genius Loci",
    "Literary Monuments",
    "Trove",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1698215609148-924B32OKD5QELSQ2IAFY/IMG_5425.jpeg?format=original", alt: "Intangible Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613281128682-F8XBV0GHVRX93J5549A1/02.jpg?format=original", alt: "Sacred hill" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613281128934-ZN9TQ87CRYOJO8A0VVPY/04.jpg?format=original", alt: "Emotional territory" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613281129941-W7LIR5X4MUB4EM1PTOVZ/05.jpg?format=original", alt: "Genius loci" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613281127923-600ZNW0MR4WGPZECGUH8/03.jpg?format=original", alt: "Literary monuments" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613281129512-10FUAEUYDX2AN7HGIGOF/06.jpg?format=original", alt: "Trove" },
  ],
};

export default async function MindFieldsHeadPage() {
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
