import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Fifty-third statewide museum wave. This Lufkin record adds Texas Forestry
 * Museum, the state's dedicated forestry-history museum and an active Piney
 * Woods destination with indoor, outdoor and family-learning exhibits.
 */
export const statewideMuseumExpansionWave53Destinations: Destination[] = [
  {
    id: "museum-statewide-wave53-texas-forestry-museum",
    brandId: "texasdefined",
    slug: "texas-forestry-museum-lufkin",
    name: "Texas Forestry Museum",
    summary: "Texas Forestry Museum in Lufkin interprets the forests and forest industries of Texas through sawmill, paper-mill, logging-railroad, conservation and family-learning exhibits, with free admission and an outdoor interpretive trail.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Lufkin",
    county: "Angelina County",
    coordinates: { lat: 31.35044, lng: -94.70444 },
    hero: museumPlaceholder("Texas Forestry Museum"),
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for combining the galleries with the outdoor logging equipment, trail and other Piney Woods stops.",
    entryNote: "The museum currently publishes Monday-Saturday hours of 10 a.m.-5 p.m. and closes on major holidays. Admission is free, with donations welcomed. Group history tours should be scheduled in advance, and visitors should confirm holiday hours before a dedicated trip.",
    highlights: [
      "Sawmill Town and East Texas logging-history exhibits",
      "Historic locomotive, caboose and outdoor railroad equipment",
      "Paper Mill interpretation and forestry-industry collections",
      "Children's Wing, nature playscape and accessible paved trail",
    ],
    body: [
      "Texas Forestry Museum tells the story of the forests that shaped East Texas and the industries, communities and transportation networks that grew around them. The museum describes its mission as collecting, preserving, exhibiting and interpreting objects, papers and photographs connected to forests, forestry professions and forest-related industries across Texas, with public education and sound forestry practices central to that work.",
      "Its visitor experience moves between industrial history and the living forest. Sawmill Town explores daily life and work in East Texas mill communities, the Paper Mill exhibit explains a major regional industry, and the outdoor railroad area preserves a locomotive, caboose and related logging equipment. The museum also maintains collections and research resources documenting forestry, logging, mills and the people whose work transformed timber into one of the region's defining economic foundations.",
      "The museum is also built for repeat family visits rather than a single static-gallery stop. Current visitor information highlights a Children's Wing, scavenger hunts, a nature playscape, an accessible paved trail and scheduled educational programs, while the institution continues to host lectures and community events. Free admission and regular six-day public hours make the Texas Forestry Museum a strong standalone TexasDefined authority destination for understanding both the cultural history and continuing stewardship of the Piney Woods.",
    ],
    officialUrl: "https://www.treetexas.com/",
    managingAuthority: "Texas Forestry Museum",
    address: "1905 Atkinson Dr, Lufkin, TX 75901",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
