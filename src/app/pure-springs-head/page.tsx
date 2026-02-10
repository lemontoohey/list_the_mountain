import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "pure-springs-head";

const CONTENT = {
  headings: [
    "Pure Water",
    "Water Features",
    "St Crispins Well",
    "Flora Falls",
    "Strickland Falls",
    "Turana Pallapoirena / Snow",
    "Spring Water",
    "Kannamayete / Wellington Falls",
    "Lia teruttena / 6 Lesser Falls",
    "Gentle Annie Falls",
    "Featherstones Cascades",
    "Silver Falls",
    "New Town Falls",
    "O'Gradys Falls",
    "Kannah / Disappearing Tarn",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/5f563722-dffd-4315-9628-33b510876361/Screen%2BShot%2B2020-11-08%2Bat%2B9.07.27%2Bpm.png?format=original", alt: "Water Features" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735590169959-FTCUXZSOHX1S8K9PIWNX/Jigsaws-pt.png?format=original", alt: "St Crispins Well" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1735859398026-LLI357H13A139IXFCAY8/Collins-Cap-Waterfall_August_12_1905-crop-1.jpg?format=original", alt: "Flora Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1721807294313-UO25W527GZYK8BS82EPB/Screen%252BShot%252B2023-06-30%252Bat%252B10.51.40%252Bpm.jpg?format=original", alt: "Strickland Falls" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1615691105689-0NX5SQTP6OHVR7UKN9XR/Screen%2BShot%2B2021-03-14%2Bat%2B2.04.04%2Bpm.jpg?format=original", alt: "Turana Pallapoirena/Snow" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613104574835-8XB5KPQGTYK2H0R6M36R/Jigsaws-cs.png?format=original", alt: "SPRING WATER" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1611968234073-VZ93VZDTY5LBP46VXJFG/scout_map_600dpi-crop.jpg?format=original", alt: "Kannamayete/WELLINGTON FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612918871851-UJHU6IWPNSWHOM78YGL3/_A150014-2.jpg?format=original", alt: "Lia teruttena/6 LESSER FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1606203930517-I5ISDX44PKDUJPUYV1Y1/Jigsaws-gentle-annie.png?format=original", alt: "GENTLE ANNIE FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605478976671-BUATKY9OX9VVXBV0Y221/Jigsaws+Featherstone.png?format=original", alt: "FEATHERSTONES Cascades" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612876901774-QCK6RQKT1ESR7PZLQAUZ/Jigsaws-sf.png?format=original", alt: "SILVER FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605477184001-9K0UZ1TRZMH6SB274I9K/Jigsaws+NT+Falls.png?format=original", alt: "NEW TOWN FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1605477055791-RODS2ENNGQJAJL5N333X/Jigsaws+O+Grady.png?format=original", alt: "O'GRADYS FALLS" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1612918976636-604OS2R2O35UUJN9ED8Q/2048.jpg?format=original", alt: "Kannah/DISAPPEARING TARN" },
  ],
};

export default async function PureSpringsHeadPage() {
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
