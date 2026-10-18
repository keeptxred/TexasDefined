import type { ImageRef } from "./types";

/**
 * Source checked 2026-10-18. Exact Devils River watershed/Dolan Falls
 * photograph from Wikimedia Commons. This deliberately supersedes the old
 * generated image-map entry "Devils River (174119081).jpg", whose bytes
 * depict a millipede rather than the destination's river landscape.
 *
 * The Dolan Falls vicinity includes independently managed protected land;
 * depicting the waterfall DOES NOT promise public access to the falls.
 * Direct immutable Commons image URL is used pending a locally materialized,
 * independently source-verified high-resolution replacement.
 * Original photo is 800 x 415, not artificially labeled 1600 x 1066.
 */
export const DEVILS_RIVER_LANDSCAPE_IMAGE: ImageRef = {
  src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Devils_River_-_Dolan_Falls_%28174119624%29.jpg",
  alt: "Dolan Falls flowing through the limestone-lined Devils River in southwest Texas; the falls are not an advertised public trailhead",
  width: 800,
  height: 415,
  credit: "Clinton & Charles Robertson · CC BY-SA 2.0 · Wikimedia Commons · Original, not modified",
};

export const DEVILS_RIVER_LANDSCAPE_RIGHTS = {
  slug: "devils-river-state-natural-area",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Devils_River_-_Dolan_Falls_(174119624).jpg",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  author: "Clinton & Charles Robertson",
  license: "CC BY-SA 2.0",
  sourceTitle: "Devils River - Dolan Falls (174119624).jpg",
  accessCaution: "Dolan Falls is not a general-access visitor entrance. Use the official TPWD unit maps and permitted entry rules.",
} as const;

export function verifiedDevilsRiverPhotoRights(hero: ImageRef) {
  if (hero.src !== DEVILS_RIVER_LANDSCAPE_IMAGE.src
    || !hero.credit?.includes(DEVILS_RIVER_LANDSCAPE_RIGHTS.author)
    || !hero.credit.includes(DEVILS_RIVER_LANDSCAPE_RIGHTS.license)) return null;
  return DEVILS_RIVER_LANDSCAPE_RIGHTS;
}
