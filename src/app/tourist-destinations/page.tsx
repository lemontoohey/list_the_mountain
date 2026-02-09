import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "tourist-destinations";

const CONTENT = {
  headings: [
    "TOURIST DESTINATIONS", // Hero Title
    "The Visited Landscape",
    "Pinnacle Beacon",
    "Woods' Hostel",
    "Gadd's Hostel",
    "Springs Hotel",
    "The Bower",
    "Pinnacle Drive",
    "Exhibition Gardens",
    "Tea Gardens",
    "Observation Shelter",
    "Pillinger Drive",
  ],
  images: [
    // Hero background (single logo; duplicate at index 1 in scraped data omitted)
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357284717-P2XRZU6FB6W5LDOTBZ2L/01.png?format=original", alt: "The Visited Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357289487-G2UT9FDY0EX3SNUNJGJO/04.png?format=original", alt: "Pinnacle Beacon" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357291528-GC5IA8T55NMGTQTBWREU/03.png?format=original", alt: "Woods' hostel" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357305219-0TZEUYV7DKBH8OBG7E7D/17.png?format=original", alt: "Gadd's hostel" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357286928-NYEIM0NQGE142XJ0SH8O/02.png?format=original", alt: "Springs Hotel" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357297149-B6QH3NYDSJ3H5Y6XIA8S/10.jpg?format=original", alt: "The Bower" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357290874-2PYWE1RBMJ0N6GBQ9H0U/05.jpg?format=original", alt: "Pinnacle Drive" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357295137-0HEF0W6VV91PPESJ1ZI6/09.jpg?format=original", alt: "Exhibition Gardens" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613357301602-OSAUZFOGTGHBWX43OWOR/15.png?format=original", alt: "Tea gardens" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1651632960990-B6BOLF0W4EOE2HUZHAJC/pinnacle26.jpg?format=original", alt: "Observation Shelter" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735474350321-QO9CQMDZ4QAHQ82GC875/pillinger-drive_1.jpg?format=original", alt: "Pillinger Drive" },
  ],
};

export default async function TouristDestinationsPage() {
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
