import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "shelters-head";

const CONTENT = {
  headings: [
    "Shelter Sheds",
    "The Sheltered Landscape",
    "Black Man's Cave",
    "Ladies' shelters",
    "Rocky's hideout",
    "Springs shelter sheds",
    "Tree shelters",
    "Ski huts",
    "Rock Cabin",
    "Lower chalet",
    "Upper chalet",
    "Junction Cabin",
    "Old Hobartians",
    "Lone Cabin",
    "Lakin's Lair",
    "Luckman's Hut",
    "Rock (Log) Cabin",
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697778788878-FGBZ195DLX2SPL9T9G0N/image.jpeg?format=original", alt: "The Sheltered Landscape" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356273661-71SRQEWNMKZ72PBDL3HB/03.png?format=original", alt: "Black Man's Cave" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356520550-FN40S8A85JBIH9YNPR0Q/06.jpg?format=original", alt: "Ladies' shelters" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356277749-3R1A9EEX8BJTNQ8CU08P/08.png?format=original", alt: "Rocky's hideout" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356269560-44C9LNYDGTCM4RQZI1RY/02.jpg?format=original", alt: "Springs shelter sheds" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356287813-TM8PTJT69ARM7K1HQZBD/18.jpg?format=original", alt: "Tree shelters" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356273989-IIJPRANFCWZXIAA75I5B/04.png?format=original", alt: "Ski huts" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356287002-Y97PA4W6L1FX6HFJKKMY/17.png?format=original", alt: "Rock Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356285124-WLBMR0HLY24XLF0WOM22/15.jpg?format=original", alt: "Lower chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356286141-I4YPTKO6ZZWJXO6UP8OO/16.jpg?format=original", alt: "Upper chalet" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356280983-1UPEJ7UCJDWA3366EU6W/12.png?format=original", alt: "Junction Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356279375-E8PRKVXADQQXY84PS22C/10.png?format=original", alt: "Old Hobartians" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356277069-U8B1QNLMENO9P472F3B9/07.jpg?format=original", alt: "Lone Cabin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356278156-4CTMZ0WI8SXSC9LNJ94E/09.jpg?format=original", alt: "Lakin's Lair" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356281556-7EA9889W0D4Y8B99XDER/13.jpg?format=original", alt: "Luckman's Hut" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613356281943-EZSZLIZ8VQETWV3PNERY/14.png?format=original", alt: "Rock (Log) Cabin" },
  ],
};

export default async function SheltersHeadPage() {
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
