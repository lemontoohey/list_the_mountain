import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "ceremonial-grounds-head";

const CONTENT = {
  headings: [
    "Ceremonial Grounds",
    "Ceremonial Landscapes",
    "Monuments",
    "Cenotaphs",
    "Cemeteries",
    "Festivals",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697783873376-ZQWUB9A2BXDEUV7L9O1Z/Screen%2BShot%2B2023-10-16%2Bat%2B9.07.31%2Bam.jpeg?format=original", alt: "Ceremonial Landscapes" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697404327331-PGXGP608VMXBJIZG5W1W/FerntreeBowerBeattie1-1.jpg?format=original", alt: "Monuments" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697408187684-EC7NLZ4DRHLOYUVBPTZB/02.jpg?format=original", alt: "Cenotaphs" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613267345180-B3Z67ECFENQXMNJERSEE/03.jpg?format=original", alt: "Cemeteries" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613267345715-753EA1WPRQXK3WY7G8BN/04.jpg?format=original", alt: "Festivals" },
  ],
};

export default async function CeremonialGroundsHeadPage() {
  const contentImages = CONTENT.images.slice(1);
  const realSlugs = await Promise.all(
    contentImages.map((_, i) =>
      findBestMatch(PAGE_SLUG, CONTENT.headings[i + 1] ?? contentImages[i]?.alt ?? "List the Mountain.")
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
