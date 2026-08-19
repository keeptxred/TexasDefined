import type { ImageRef } from "./types";

/**
 * Exact-subject historic-site photographs whose item-level Wikimedia Commons
 * license and attribution were verified before publication.
 */
export const historicSiteRemoteHeroes: Record<string, ImageRef> = {
  "eisenhower-birthplace": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2022_03_26_Eisenhour_Birth_Place%2C_Denison%2C_TX_%2828%29.jpg?width=1600",
    alt: "Eisenhower Birthplace State Historic Site in Denison, Texas",
    width: 1600,
    height: 900,
    credit: "E's & D's Adventures in Life · CC BY 2.0 · Wikimedia Commons",
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
};
