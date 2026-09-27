import type { SportsVenuePhoto } from './sports-venue-images';

/** Documentary-only Wave 7 venue photos. Ambiguous or unlicensed venues intentionally fall back. */
export const sportsVenuePhotoAdditionsWave7: Record<string, SportsVenuePhoto> = {
  "round-rock-sports-center": {
    slug: "round-rock-sports-center",
    alt: "Round Rock Sports Center in Round Rock, Texas",
    imageUrl: "/images/sports-venues/round-rock-sports-center.jpg",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Round_Rock_Sports_Center,_Texas_(47603155501).jpg",
    sourceName: "Wikimedia Commons",
    author: "Tony Webster from Minneapolis, Minnesota, United States",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    width: 1600,
    height: 989,
  },
  "texas-motorplex": {
    slug: "texas-motorplex",
    alt: "Texas Motorplex in Ennis, Texas",
    imageUrl: "/images/sports-venues/texas-motorplex.jpg",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Ennis_September_2017_30_(Texas_Motorplex).jpg",
    sourceName: "Wikimedia Commons",
    author: "Michael Barera",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    width: 1600,
    height: 1067,
  },
};

export function getSportsVenuePhotoAdditionWave7(slug: string) {
  return sportsVenuePhotoAdditionsWave7[slug];
}
