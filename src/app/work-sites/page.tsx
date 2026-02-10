import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "work-sites";

const CONTENT = {
  headings: [
    "A Landscape for Working",
    "Working Landscape",
    "Fur",
    "Wood",
    "Beer",
    "Water",
    "Ice",
    "Earths",
    "Roadways",
    "Energy chocolate",
    "Worker accomodation",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697754627788-YJGODCQ6ZBX7SJGDEPL7/Loggers+%282%29.jpeg?format=original", alt: "Working Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359469167-KYGFW46S4QHGLWPCTS5D/18.jpg?format=original", alt: "Fur" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359458416-9744GRFV08GTW48FA2VH/07.png?format=original", alt: "Wood" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359459079-16W1VZ0K27EAXL5FPOK0/09.jpg?format=original", alt: "Beer" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359450723-7UP22VE51MWBJMO1Z33U/04.png?format=original", alt: "Water" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359457045-WFO8AW4UFVQFJHBDQRG4/06.jpg?format=original", alt: "Ice" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359458210-DIKLUEKGBVJUYQG0C0JV/08.jpg?format=original", alt: "Earths" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359465399-LR6PD74TD21P45XS3VHR/14.jpg?format=original", alt: "Roadways" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1698134005667-CYDH2YXV44YO184I5YH4/269580-small.jpg?format=original", alt: "Energy chocolate" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613359451040-769U9CENI8F906LPYVEP/05.jpg?format=original", alt: "Worker accomodation" },
  ],
};

export default async function WorkSitesPage() {
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
