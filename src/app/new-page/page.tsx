import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "new-page";

const CONTENT = {
  headings: [
    "GEOHERITAGE",
    "ABOUT US            CONTACT US           searcH        Media"
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293823224-3AI9JHRR676EXXUY8ARM/Jigsaws-dwg.png?format=original", alt: "Local Geoheritage Sites" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293824421-4Z3XJTWYKP70NC86NBG8/Jigsaws-cr-1.png?format=original", alt: "Jigsaws-cr-1.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293826181-H5MU76CPYAYHBL2Y8QE7/Jigsaws-tors.png?format=original", alt: "Jigsaws-tors.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1736293827551-HRBQGUG1BVAPF0CVFH32/Jigsaws-cr.png?format=original", alt: "Jigsaws-cr.png" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1740822504987-ANSEYKZH6ORNDTXJFKD6/image-asset.jpeg?format=original", alt: "ROCKING STONE" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1740822753318-Z0LCRG33MZ9D7ECYTBL0/Screen%2BShot%2B2020-02-28%2Bat%2B11.59.17%2Bam.png?format=original", alt: "The GeoHeritage Landscape" }
  ],
};


export default async function NewPagePage() {
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
