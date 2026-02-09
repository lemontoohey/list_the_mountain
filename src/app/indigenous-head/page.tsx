import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "indigenous-head";

const CONTENT = {
  headings: [
    "INDIGENOUS", // Hero Title
    "Indigenous Landscape",
    "Wooreddy's Lookout",
    "Spirit of Place",
    "Mountain Fire",
    "First Ascent",
    "Goat Hills Village",
    "Black Rock",
    "9 Ways to Say Mountain",
    "A Wide Farm",
    "Stone Tools",
    "A Higher Place",
    "Mother of All Life",
    "Turikina Truwala",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1698214922259-V8WPOXXINJEZ4SG4K6B4/thumbnail_1_grande.jpg?format=original", alt: "Indigenous Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353141601-EL86INXG4F7S4TEV7MQM/10.jpg?format=original", alt: "Wooreddy's lookout" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353144089-JIGSZG5T0YTYKLQGEYHC/02.png?format=original", alt: "Spirit of place" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353137151-VQIJ4P3QIQ9U08HIHQAZ/03.jpg?format=original", alt: "Mountain fire" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353137448-HQICVOPRYYHM6JCOS6KF/04.jpg?format=original", alt: "First ascent" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353141427-FIHAEKCTT4N6ZZHRLPGT/09.jpg?format=original", alt: "Goat Hills Village" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353139205-TO5GYPTQITEAQC4XF094/05.png?format=original", alt: "Black Rock" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353142698-7ZQXOQYY2229R97W2N8Q/11.jpg?format=original", alt: "9 ways to say mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353140227-VT8QQBAD7FU4TLDKHR39/08.jpg?format=original", alt: "A wide farm" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353139639-IQN8LW2NR37WQ091DRBQ/06.jpeg?format=original", alt: "Stone tools" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353140735-NMO0HXYZD9014SIQ0AJU/07.jpg?format=original", alt: "A higher place" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613353143469-NRG7D3RS6WU3JK3226WN/12.jpg?format=original", alt: "Mother of all life" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1617242206871-J4QIWC6GZPI3SJ3SKWSW/image-asset.jpeg?format=original", alt: "turikina truwala" },
  ],
};

export default async function IndigenousHeadPage() {
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
