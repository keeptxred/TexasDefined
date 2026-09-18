import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave67Destinations } from "./museum-expansion-statewide-wave67";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-17";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-sixth statewide museum wave. This record uses the museum's current
 * City of Van Alstyne visitor identity and relocated Cartwright House address,
 * rather than the former downtown museum location.
 * Wave 67 is chained here so later museum expansion remains conflict-light.
 */
export const statewideMuseumExpansionWave66Destinations: Destination[] = [
  {
    id: "museum-statewide-wave66-van-alstyne-historical-museum",
    brandId: "texasdefined",
    slug: "van-alstyne-historical-museum",
    name: "Van Alstyne Historical Museum",
    summary: "Van Alstyne Historical Museum occupies the historic Cartwright House and preserves the city's development, rail-era history, community life, wartime correspondence and local collections in southern Grayson County.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["texoma"],
      countySlugs: ["grayson"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Van Alstyne",
    county: "Grayson County",
    coordinates: { lat: 33.420944, lng: -96.579989 },
    hero: museumPlaceholder("Van Alstyne Historical Museum"),
    bestSeason: "Year-round during posted museum hours; spring and fall are especially comfortable for pairing the museum with a walk through Van Alstyne's historic core.",
    entryNote: "The City of Van Alstyne currently lists public hours Wednesday-Friday from 10 a.m. to 4 p.m., with Monday-Tuesday and weekends closed. The museum recently relocated to 130 N. Waco Street, so use the current city page rather than older listings that still point to the former downtown location.",
    highlights: [
      "Historic Cartwright House setting",
      "Van Alstyne development and social-history collections",
      "Steam-locomotive-era and Main Street material",
      "World War II servicemen letters and community archives",
    ],
    body: [
      "Van Alstyne Historical Museum makes the building itself part of the visit. The City of Van Alstyne identifies the museum's home as the Cartwright House, a three-story residence constructed around 1890 by Dr. J. S. Cartwright on the east side of town. Around 1901, the house was moved on log rollers pulled by mules to the location where it now serves as the museum, giving the institution a direct physical connection to the community it interprets.",
      "Inside, the collection reaches beyond a single period. City visitor information highlights material on Van Alstyne's development and social life, the timber industry, the steam-locomotive era, a Main Street collection, prominent residents and civic leaders, letters sent home by local World War II servicemen, and fourth-grade history essays preserved from 1994 through 2019. That mix lets visitors move between transportation, work, wartime experience and everyday community memory rather than treating local history as one isolated event.",
      "The museum's current location also matters for trip planning because older directories can still lead visitors to its former downtown address. TexasDefined treats 130 N. Waco Street as the canonical visitor location and keeps this museum distinct from Sherman's and Denison's larger Grayson County history destinations. It works best as Van Alstyne's local-history anchor, connecting the town's preserved stories with the broader Texoma and Prairies & Lakes discovery graph.",
    ],
    officialUrl: "https://www.cityofvanalstyne.us/HistoricalMuseum",
    managingAuthority: "City of Van Alstyne / Van Alstyne Historical Museum",
    address: "130 N Waco St, Van Alstyne, TX 75495",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave67Destinations,
];
