import type { Destination, ImageRef } from "./types";

/**
 * Exact-subject historic-site photographs whose item-level Wikimedia Commons
 * license and attribution were verified before publication.
 */
export const historicSiteRemoteHeroes: Record<string, ImageRef> = {
  "caddo-mounds-state-historic-site": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Caddo_Mound_TX.jpg",
    alt: "Caddo mound at Caddo Mounds State Historic Site near Alto, Texas",
    width: 802,
    height: 538,
    credit: "N. Saum · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "eisenhower-birthplace": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2022_03_26_Eisenhour_Birth_Place%2C_Denison%2C_TX_%2828%29.jpg?width=1600",
    alt: "Eisenhower Birthplace State Historic Site in Denison, Texas",
    width: 1600,
    height: 900,
    credit: "E's & D's Adventures in Life · CC BY 2.0 · Wikimedia Commons",
  },
  "fort-griffin": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/0011FortGriffinTxAdminBuilding.jpg",
    alt: "Ruins of the administration building at Fort Griffin State Historic Site in Texas",
    width: 1024,
    height: 685,
    credit: "Mark Fisher · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "fort-mckavett": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_McKavett%2C_Texas.jpg?width=1600",
    alt: "Historic soldiers barracks at Fort McKavett State Historic Site in Texas",
    width: 1600,
    height: 782,
    credit: "SimpleeRandom · CC0 · Wikimedia Commons",
  },
  "french-legation": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/French_legation_2006.jpg?width=1600",
    alt: "French Legation historic house in Austin, Texas",
    width: 1600,
    height: 1049,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  "fulton-mansion": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fulton_mansion_2006.jpg?width=1600",
    alt: "George W. Fulton Mansion in Fulton, Texas",
    width: 1600,
    height: 1408,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  "goodnight-ranch": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Charles_Goodnight_Ranch_House.jpg?width=1600",
    alt: "Charles and Mary Ann Goodnight Ranch House near Goodnight, Texas",
    width: 1600,
    height: 1200,
    credit: "Pi3.124 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "landmark-inn": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Landmark_inn_2010.jpg?width=1600",
    alt: "Landmark Inn State Historic Site in Castroville, Texas",
    width: 1600,
    height: 1039,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  "magoffin-home": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Magoffin_home_2009.jpg?width=1600",
    alt: "Magoffin Home State Historic Site in El Paso, Texas",
    width: 1600,
    height: 965,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  "old-socorro-mission": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Socorro_Mission%2C_Mission_Trail%2C_El_Paso%2C_Texas_%282b1d2a78-155d-451f-679e-7d70fee5ef0f%29.jpg",
    alt: "Socorro Mission on the Mission Trail in Socorro, Texas",
    width: 1600,
    height: 1069,
    credit: "National Park Service · Public domain · Wikimedia Commons",
  },
  "port-isabel-lighthouse": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
    alt: "Port Isabel Lighthouse in Port Isabel, Texas",
    width: 1600,
    height: 1200,
    credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "presidio-la-bahia": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Presidio_Nuestra_Senora_de_Loreto_de_la_Bahia%2C_commonly_known_as_Presidio_La_Bahia%2C_Goliad%2C_Texas.jpg?width=1600",
    alt: "Presidio La Bahía in Goliad, Texas",
    width: 1600,
    height: 1195,
    credit: "Jkulick · CC BY-SA 4.0 · Wikimedia Commons",
  },
};

export function enrichHistoricSiteRemoteHero(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;
  const hero = historicSiteRemoteHeroes[destination.slug];
  return hero ? { ...destination, hero } : destination;
}
