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
 * Twenty-ninth statewide museum wave. This source-clean North Texas record
 * reconciles the audit's Morton Museum of Cooke County entry to the active
 * institution and its current Gainesville visitor information.
 */
export const statewideMuseumExpansionWave29Destinations: Destination[] = [
  {
    id: "museum-statewide-wave29-morton-cooke-county",
    brandId: "texasdefined",
    slug: "morton-museum-of-cooke-county",
    name: "Morton Museum of Cooke County",
    summary: "Morton Museum of Cooke County occupies Gainesville's 1884 former city hall, fire station and calaboose, preserving local artifacts, photographs, architectural pieces and research collections that document the people and communities of Cooke County.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Gainesville",
    county: "Cooke County",
    coordinates: { lat: 33.62295, lng: -97.14522 },
    hero: museumPlaceholder("Morton Museum of Cooke County"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for pairing the museum with downtown Gainesville, the courthouse square and nearby historic neighborhoods.",
    entryNote: "The museum currently lists Tuesday-Friday hours from 9 a.m. to 3 p.m. and Saturday from 10 a.m. to 2 p.m. Donations are accepted. Verify holiday and special-event changes before making a dedicated trip.",
    highlights: [
      "1884 Gainesville city hall, fire station and calaboose",
      "Cooke County local-history collections",
      "Photographic and genealogy research resources",
      "Historic stained glass and salvaged local architectural details",
    ],
    body: [
      "Morton Museum of Cooke County turns one of Gainesville's earliest civic buildings into the county's dedicated historical museum. The structure was built in 1884 to serve as city hall, a fire station and the city calaboose, so the building itself preserves a tangible piece of Gainesville's municipal story alongside the collections inside.",
      "The museum was established in 1968 by the Cooke County Heritage Society after local preservationists organized to save the building from demolition. Its collections and services extend beyond display galleries: the museum maintains historic photographs and supports genealogy and local-history research, giving residents and visitors a place to investigate people, properties and communities across Cooke County.",
      "Architectural pieces rescued from other Gainesville landmarks are incorporated into the museum, including stained glass and features associated with the Bailey-Dougherty home and other local buildings. For TexasDefined, the destination creates a stable Cooke County cultural-history authority page that can connect downtown Gainesville, courthouse-square discovery, historic homes and regional North Texas travel without reducing the museum to a list-only mention.",
    ],
    officialUrl: "https://www.mortonmuseum.org/morton-museum",
    managingAuthority: "Cooke County Heritage Society",
    address: "210 S Dixon St, Gainesville, TX 76240",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
