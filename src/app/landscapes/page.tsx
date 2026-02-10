import { findBestMatch } from "@/lib/content-utils";
import { HeadPageGallery } from "@/components/HeadPageGallery";

const PAGE_SLUG = "landscapes";

const CONTENT = {
  headings: [
    "mountain art",
    "ABOUT US            CONTACT US           searcH        Media"
  ],
  images: [
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/2af1aced-55f2-4fa2-90e8-55de2a0bf0ad/Small+new+logo.png?format=original", alt: "List the mountain" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697800629453-BBZCZNS47GXTUTLPICUW/Screen+Shot+2023-10-19+at+1.37.32+pm.jpeg?format=original", alt: "Aesthetic Landscapes" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613363462178-LJLVTP577845EVZ7LISH/05.jpg?format=original", alt: "Lycett" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613363463102-YODSXV9KT3DF7Q43ZVEM/04.jpg?format=original", alt: "Duterrau" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256163390-0EPAZP39SA7L4C5PA8RA/05glover.jpg?format=original", alt: "Glover" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613363461280-81LGI8EI4VACEHHE657U/03.jpg?format=original", alt: "Gritten" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256174769-S3K5VPX9MV016GZ1T96A/20guerard.jpg?format=original", alt: "von Guerard" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256163980-RXEP11XOD0LIOEPMETDD/06bull.jpg?format=original", alt: "Bull" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256168251-4IAILH7FJFD20GY642XR/11simp.jpg?format=original", alt: "de Wesselow" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613363461059-IJX6OH6O0RZ8SXOH3SG4/01.jpg?format=original", alt: "Prout" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256174331-18TVZI860K6E44DOLY8D/19piguenit.jpg?format=original", alt: "Piguenit" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256173150-OA73QWZFKFNK8R34K29W/17clifford.jpg?format=original", alt: "Clifford" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1698029486625-IAEHHDFJMJMRMF3LYTA1/Screen+Shot+2023-10-19+at+1.38.12+pm.jpeg?format=original", alt: "North" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256157266-RJC3JRPBO8337TP8HGB1/02forrest.jpg?format=original", alt: "Forrest" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256169447-NUK6ITPSWB8VH6HRCT7D/12louisa.jpg?format=original", alt: "Meredith" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1617252141085-2P2UWEKLJD9NXO4FIS6X/image-asset.jpeg?format=original", alt: "Lloyd" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256171295-OBDMPS7U1L6C035J306S/14spurling.jpg?format=original", alt: "Spurling" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256173871-SOJP4OETTL9WX9YYC298/18allport.jpg?format=original", alt: "Allport" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256171020-94ZFPGVCGJ0SUUUTLUX6/13beattie.jpg?format=original", alt: "Beattie" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1690171029654-KWPE7W5UIHNO67SU662W/09rees.jpg?format=original", alt: "Rees" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1617500456443-5JNDSRI35S0IIFHOV4IN/risdon.jpg?format=original", alt: "de Quincey" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613363460655-KF49A24VPIYX5R567JPW/02.jpg?format=original", alt: "Stephenson" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256167749-CMR64A8JSG8PBF5Q4EER/10dombr.png?format=original", alt: "Dombrovskis" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1615778264941-074J57VXJP0I20LARBEI/Screen+Shot+2021-03-15+at+2.13.05+pm.png?format=original", alt: "Edgar" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256164226-LBEV7TDGS92QID16QM8H/07giles.jpg?format=original", alt: "Giles" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256171825-O2OT38LZ9Q9W4S0DJFUJ/15ross.jpg?format=original", alt: "Ross" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256172604-M4CDJYBB6EQ1N42YVEWF/16blakers.jpg?format=original", alt: "Blakers" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1613256159399-Q4APZG9WZBYY63UIVECC/03dyer.jpg?format=original", alt: "Dyer" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1685753876626-YC5421UB0X1FF60XLUEE/image-asset.jpeg?format=original", alt: "BROWN" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697801936459-NZIZMIPH19APLONWP8HJ/boulderfieldsandbushlands2023.jpeg?format=original", alt: "Bradbury" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1697801549301-XUHCCNRALR5B549NNK93/xx-banksia.jpg?format=original", alt: "Uptin" },
    { src: "https://images.squarespace-cdn.com/content/v1/5e2a284b3aae396709cfaaf3/1684566747387-UQWJXPR8H4PSXHV5ND24/elizabeth%252Bbarsham.jpg?format=original", alt: "Singularities" }
  ],
};


export default async function LandscapesPage() {
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
