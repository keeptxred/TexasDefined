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
 * Thirtieth statewide museum wave. This source-clean East Texas record adds
 * the active Heritage Museum of Montgomery County and its current Conroe
 * visitor information.
 */
export const statewideMuseumExpansionWave30Destinations: Destination[] = [
  {
    id: "museum-statewide-wave30-heritage-montgomery-county",
    brandId: "texasdefined",
    slug: "heritage-museum-of-montgomery-county",
    name: "Heritage Museum of Montgomery County",
    summary: "Heritage Museum of Montgomery County in Conroe interprets the county's people, communities, lumber and oil history through collections housed in the historic Grogan-Cochran home, the Strake-Gray oilfield house and outdoor exhibits.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Conroe",
    county: "Montgomery County",
    coordinates: { lat: 30.32149, lng: -95.47256 },
    hero: museumPlaceholder("Heritage Museum of Montgomery County"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining the museum with downtown Conroe, nearby parks and Piney Woods outings.",
    entryNote: "The museum currently publishes Wednesday-Saturday hours from 9 a.m. to 4 p.m. Current visitor information should be checked before a dedicated trip for holiday, program or special-event changes.",
    highlights: [
      "Historic Grogan-Cochran home",
      "Strake-Gray oilfield house and roughneck history",
      "Montgomery County lumber and oil exhibits",
      "Oral histories, research collection and outdoor artifacts",
    ],
    body: [
      "Heritage Museum of Montgomery County preserves the county's story through a museum complex anchored by the Grogan-Cochran home, a 1924 residence connected to families that operated numerous area sawmills. The home was donated for museum use and moved to Conroe's Candy Cane Park area in 1985, giving the institution a historic setting that directly reflects the county's lumber-era development.",
      "The museum's interpretation extends into Montgomery County's oil history through the Strake-Gray oilfield house and a roughneck bunkhouse, while permanent and temporary exhibits document local people, towns, industries, communications and community life. Outdoor displays include equipment and artifacts tied to transportation, agriculture, timber and oilfield work, creating a broader local-history experience than a single indoor gallery.",
      "Research resources and oral histories make the museum useful beyond casual sightseeing. The institution maintains a county-focused resource collection and educational programming while current Conroe tourism material identifies it as a place to learn about Montgomery County's role in Texas history. For TexasDefined, this creates a canonical Montgomery County cultural-history destination that can connect Conroe, county discovery and Piney Woods travel without duplicating list-only museum coverage.",
    ],
    officialUrl: "https://www.heritagemuseum.us/",
    managingAuthority: "Heritage Museum of Montgomery County",
    address: "1506 Interstate 45 N, Conroe, TX 77301",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
