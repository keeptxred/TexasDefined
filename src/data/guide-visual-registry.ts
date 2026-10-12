import type { ImageRef } from "./types";

/**
 * Item-level free-reuse photographs for the four Texas home-and-nature guides.
 * Locations of general/species photographs are stated accurately; non-Texas
 * specimens are NOT passed off as photographs taken in Texas.
 */
export type GovernedGuideVisual = {
  image: ImageRef;
  caption: string;
  licenseUrl: string;
  sourceUrl: string;
  reviewDate: string;
};
function commons(filename: string, alt: string, credit: string, width: number, height: number, caption: string, licenseUrl: string): GovernedGuideVisual {
  return {
    image: { src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=1200`, alt, credit, width, height },
    caption,
    licenseUrl,
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename).replace(/%20/g, "_")}`,
    reviewDate: "2026-10-12",
  };
}
export const texasHomeNatureGuideVisuals: Record<string, GovernedGuideVisual> = {
  "texas-birds-guide": commons(
    "Northern Mockingbird in Texas.jpg",
    "Northern mockingbird photographed in Texas perched on a branch",
    "Robert Nunnally · CC BY 2.0 · Wikimedia Commons",
    1200, 900,
    "A northern mockingbird photographed in Texas by Robert Nunnally (2013). This is a species example, not a live birding-condition image.",
    "https://creativecommons.org/licenses/by/2.0/",
  ),
  "texas-snakes-guide": commons(
    "Western Diamondback Rattlesnake (Crotalus atrox). (c9800f43-155d-451f-67ed-2351f00c6791).JPG",
    "Western diamondback rattlesnake coiled in a defensive posture",
    "U.S. National Park Service · Public domain · Wikimedia Commons",
    1200, 1600,
    "Western diamondback rattlesnake photographed by the National Park Service in New Mexico in 2010; the species is also native to Texas. Do not approach snakes for identification.",
    "https://commons.wikimedia.org/wiki/Commons:Public_domain",
  ),
  "texas-pests-guide": commons(
    "Aedes aegypti - Dengue Mosquito.jpg",
    "Close-up photograph of an Aedes aegypti mosquito",
    "Apurv013 · CC0 1.0 · Wikimedia Commons",
    1200, 1600,
    "Aedes aegypti mosquito shown as an identification example; photographed outside Texas and not evidence of any local mosquito outbreak.",
    "https://creativecommons.org/publicdomain/zero/1.0/",
  ),
  "texas-pool-guide": commons(
    "The backyard and swimming pool of a house in Corinda, Queensland.jpg",
    "Wide photograph of a residential in-ground swimming pool and surrounding backyard",
    "Kgbo · CC BY-SA 4.0 · Wikimedia Commons",
    1200, 560,
    "An illustrative residential swimming pool photographed in Queensland, Australia, not a Texas installation. Operating guidance in this guide is Texas-focused.",
    "https://creativecommons.org/licenses/by-sa/4.0/",
  ),
};
