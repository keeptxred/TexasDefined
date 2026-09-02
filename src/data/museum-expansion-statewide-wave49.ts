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
 * Forty-ninth statewide museum wave. This Port Arthur record adds the active
 * Museum of the Gulf Coast authority destination for southeast Texas and the
 * adjacent southwest Louisiana cultural region.
 */
export const statewideMuseumExpansionWave49Destinations: Destination[] = [
  {
    id: "museum-statewide-wave49-museum-of-the-gulf-coast",
    brandId: "texasdefined",
    slug: "museum-of-the-gulf-coast-port-arthur",
    name: "Museum of the Gulf Coast",
    summary: "Museum of the Gulf Coast in Port Arthur preserves the history and culture of southeast Texas and southwest Louisiana through more than 35,000 collection objects, regional history galleries, maritime interpretation, art and halls of fame devoted to music, sports and notable Gulf Coast figures.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Port Arthur",
    county: "Jefferson County",
    coordinates: { lat: 29.87316, lng: -93.93291 },
    hero: museumPlaceholder("Museum of the Gulf Coast"),
    bestSeason: "Year-round for indoor galleries; fall through spring is especially comfortable for combining the museum with Port Arthur, Sabine Pass and other upper Gulf Coast heritage stops.",
    entryNote: "The museum currently publishes Monday-Saturday hours from 9 a.m. to 5 p.m. and is closed Sundays and major holidays. Current general admission is $8 for adults, with reduced rates for seniors, college students and children. Check the museum's current visitor information before a dedicated trip for holiday closures, special events or admission changes.",
    highlights: [
      "More than 35,000 collection objects",
      "Music Hall of Fame including Janis Joplin and other Gulf Coast artists",
      "Sports and Notable People halls of fame",
      "Regional maritime, cultural and art collections",
    ],
    body: [
      "Museum of the Gulf Coast is Port Arthur's principal regional history museum, interpreting the distinctive culture of southeast Texas and neighboring southwest Louisiana. Its collections span community life, maritime history, industry, exploration, art, music and sports, giving visitors a broad view of how the upper Gulf Coast developed and how people from the region influenced Texas and American culture.",
      "The museum reports more than 35,000 objects and a 39,000-square-foot facility. Its permanent galleries include regional history and maritime material, rare books and cartography, work associated with Port Arthur-born artist Robert Rauschenberg, and three prominent halls of fame devoted to music, sports and notable people. The music collection is especially recognizable because Port Arthur native Janis Joplin is among the artists interpreted there, alongside other performers with Gulf Coast roots.",
      "The institution is administered by the Port Arthur Historical Society in partnership with the City of Port Arthur. Texas Time Travel places it in the Forest Trail Region, while TexasDefined groups the destination in the broader Gulf Coast region used across the Explore catalog. The museum's current six-day visitor schedule and active 2026 programming support treating it as a current standalone authority destination rather than a generic Port Arthur historical listing.",
    ],
    officialUrl: "https://www.museumofthegulfcoast.org/",
    managingAuthority: "Port Arthur Historical Society in partnership with the City of Port Arthur",
    address: "700 Procter St, Port Arthur, TX 77640",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
