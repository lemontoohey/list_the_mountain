import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "political-flashpoints-head";

const CONTENT = {
  headings: [
    "Political Landscapes",
    "The Political Landscape",
    "Fern-hookers",
    "Forest Vandals",
    "Utopia",
    "Teetotallers",
    "Big Bend Chalet",
    "Glass coaches",
    "Ogilvie's Scar",
    "Pinnacle beacon",
    "The Condoms",
    "Anti-nuke Peacenik",
    "The Castle",
    "The Carbuncle",
    "Indigenous Protected Area",
    "Zipline",
    "Heritage",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697672102227-0C7AOHLX8KTYCS7WNMRR/aerial%2Bphoto4.jpeg?format=original", alt: "The Political Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069938-PP20KXZSDTTBWEV0GQK0/07.png?format=original", alt: "Fern-hookers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1619564681469-YNHGNXEI9JGUTHPEOXDC/image-asset.jpeg?format=original", alt: "Forest Vandals" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069053-KOFOWUGTA7MC8X9V2ZPH/05.jpg?format=original", alt: "Utopia" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354073509-OP0KE8LKBFRL8NZNL3ZN/08.png?format=original", alt: "Teetotallers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684294681692-SDHK1V55RADZQ57RH6KR/Screen+Shot+2023-05-16+at+10.44.37+pm.png?format=original", alt: "Big Bend Chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1651634187089-UGD3E1CWWM6W2SO4HMIP/14.png?format=original", alt: "Glass coaches" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354069390-6SO4OT9N755FTP7RID30/06.jpg?format=original", alt: "Ogilvie's Scar" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1650345106033-Q7R3ZODH4VULTTD3Y0TX/nla.news-page000001829547-nla.news-article30061849-L5-caf49d3fda4e28bc7f18e86f46cb7a1f-0001.jpg?format=original", alt: "Pinnacle beacon" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684387066003-HYRWO2BRA46Y30VPWGZ0/IMG_4910.jpg?format=original", alt: "The Condoms" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684385935729-Y7MPM2ZJ5VPZF18Q5I3P/10.jpeg?format=original", alt: "Anti-nuke Peacenik" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354068335-BL7Z429SJFUJB2E6A2LT/03.jpg?format=original", alt: "The Castle" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684381209273-CO9D00HJR20D9HJIOJP6/Pinnacles_Summit_Mount_Wellington_Hobart_Tasmania_AU_4908.jpg?format=original", alt: "The Carbuncle" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613354067534-PKDFGL9TVKMUWIVIVF60/02.png?format=original", alt: "Indigenous Protected Area" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1724471336537-ATU0ORGL4XG1S7X40GHV/Screenshot%2B2024-08-24%2Bat%2B1.46.54%25E2%2580%25AFPM.jpg?format=original", alt: "Zipline" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1724475359541-6Q3GRAHMYKFAZ75DTQ9W/Jigsaws-im.png?format=original", alt: "Heritage" },
  ],
};

export default async function PoliticalFlashpointsHeadPage() {
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
