import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-02";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Fifty-fourth statewide museum wave. This record reconciles the audit's
 * generic Palo Pinto County museum wording to the active Old Jail Museum
 * Complex operated by the county's historical organizations.
 */
export const statewideMuseumExpansionWave54Destinations: Destination[] = [
  {
    id: "museum-statewide-wave54-palo-pinto-old-jail",
    brandId: "texasdefined",
    slug: "old-jail-museum-complex-palo-pinto",
    name: "Old Jail Museum Complex",
    summary: "Palo Pinto's Old Jail Museum Complex centers on the county's 1880 sandstone jail and expands into pioneer cabins, ranching and railroad exhibits, agricultural equipment, Fort Black Springs and a genealogy-oriented welcome center.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Palo Pinto",
    county: "Palo Pinto County",
    coordinates: { lat: 32.76798, lng: -98.29930 },
    hero: museumPlaceholder("Old Jail Museum Complex"),
    bestSeason: "March through early December, when regular public hours operate; spring and fall are especially comfortable for exploring the outdoor buildings and grounds.",
    entryNote: "The complex currently opens Thursday through Saturday from 10 a.m. to 3 p.m., from the first weekend of March through the second weekend of December. Admission is free, and special or group visits can be arranged in advance.",
    highlights: [
      "1880 Palo Pinto County sandstone jail",
      "Pioneer cabins and ranching exhibits",
      "Reconstructed Fort Black Springs",
      "Jean Price Welcome Center and genealogy resources",
    ],
    body: [
      "The Old Jail Museum Complex is the active county-history destination behind older generic Palo Pinto County museum references. Its anchor is the native-sandstone county jail completed in 1880, where the first floor once served county offices and later the jailer's family while prisoners occupied the upper floor. A steel trap door was installed for hangings in the early twentieth century but was never used. The jail was vacated in 1941 and later restored for museum use by the Palo Pinto County Historical Association.",
      "Today the site extends well beyond the jail. The grounds include the Dog Trot Moseley Cabin, Johnson Cabin, Roe-Maddox Cabin, Carriage House, Barrows-Edgin Log Cabin and a reconstructed Fort Black Springs structure. Exhibits inside and outside interpret ranching, farming, medicine, railroads, domestic life, military service and the material culture of generations of Palo Pinto County residents.",
      "The Jean Price Welcome Center adds genealogy and document resources, making the complex useful both to travelers and local-history researchers. Texas Time Travel places Palo Pinto in the Forts Trail Region, while TexasDefined groups this North-Central Texas destination within its broader Prairies & Lakes discovery region. Using the current Old Jail Museum Complex identity gives the county one clear canonical heritage page rather than reviving an obsolete generic museum name.",
    ],
    officialUrl: "https://www.palopintohistory.com/museum.html",
    managingAuthority: "Palo Pinto County Historical Association",
    address: "231 S 5th Ave, Palo Pinto, TX 76484",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
