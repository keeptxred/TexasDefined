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
 * Twenty-third statewide museum wave. These active county/city history museums
 * have current first-party visitor guidance plus defensible map-backed location
 * records, so they can join the canonical destination graph without inferred
 * coordinates.
 */
export const statewideMuseumExpansionWave23Destinations: Destination[] = [
  {
    id: "museum-statewide-wave23-montgomery-county-heritage",
    brandId: "texasdefined",
    slug: "heritage-museum-montgomery-county-conroe",
    name: "Heritage Museum of Montgomery County",
    summary: "Conroe's Heritage Museum of Montgomery County preserves the county's lumber, oil, civic and everyday history through historic houses, permanent galleries, temporary exhibits, children's interpretation and outdoor industrial artifacts beside Candy Cane Park.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Conroe",
    county: "Montgomery County",
    coordinates: { lat: 30.32149, lng: -95.47256 },
    hero: museumPlaceholder("Heritage Museum of Montgomery County"),
    bestSeason: "Year-round local-history stop; fall through spring is especially comfortable for combining the museum's outdoor displays with Conroe and Montgomery County touring.",
    entryNote: "The museum currently opens Wednesday through Saturday from 9 a.m. to 4 p.m. at 1506 Interstate 45 North. Verify holiday or special-event changes with the museum before making a dedicated trip.",
    highlights: ["1924 Grogan-Cochran Home", "Conroe oilfield history", "Montgomery County lumber heritage", "Historic buildings and outdoor artifacts"],
    body: [
      "The Heritage Museum of Montgomery County interprets a county transformed first by timber and later by oil. Its main 1924 Grogan-Cochran house connects directly to the families and sawmills that shaped the early local economy, while the Strake-Gray Oilfield House and roughneck material document the petroleum boom that changed Conroe in the twentieth century.",
      "Permanent galleries widen the story beyond industry. Exhibits trace Montgomery County communities, notable residents, civic milestones and everyday life, while children's spaces, temporary exhibits and local art make the museum useful to families and repeat visitors as well as researchers.",
      "For TexasDefined, the museum becomes a county-history anchor that can cross-link Conroe, The Woodlands-area context, Lake Conroe, lumber history and oil heritage without reducing Montgomery County to modern suburban growth."
    ],
    officialUrl: "https://www.heritagemuseum.us/",
    managingAuthority: "Heritage Museum of Montgomery County",
    address: "1506 Interstate 45 N, Conroe, TX 77301",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave23-frisco-heritage",
    brandId: "texasdefined",
    slug: "frisco-heritage-museum",
    name: "Frisco Heritage Museum",
    summary: "Frisco Heritage Museum is the City of Frisco's free local-history museum, pairing a 16,000-square-foot exhibit building with a four-acre heritage village of historic homes, a depot, schoolhouse, church, log cabin, steam locomotive and caboose.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Frisco",
    county: "Collin County",
    coordinates: { lat: 33.14878, lng: -96.83072 },
    hero: museumPlaceholder("Frisco Heritage Museum"),
    bestSeason: "Year-round museum; fall through spring is especially comfortable for walking the four-acre heritage village and rail displays outside the galleries.",
    entryNote: "Admission is currently free. The City of Frisco lists museum hours Tuesday through Saturday from 10 a.m. to 5 p.m. at 6455 Page Street; confirm holiday hours and special-program access before arrival.",
    highlights: ["16,000-square-foot city history museum", "Four-acre Heritage Village", "Historic depot and railroad equipment", "Rotating 2026 exhibitions"],
    body: [
      "Frisco Heritage Museum gives one of North Texas's fastest-growing cities a place to explain what existed before modern subdivisions, sports venues and corporate campuses. Its exhibits trace Frisco and the surrounding region through objects, archives and stories tied to settlement, agriculture, railroads and community growth.",
      "The museum building is only part of the visit. The surrounding Heritage Village preserves historic homes and civic structures alongside a depot, church, schoolhouse, log cabin, steam locomotive and caboose, letting visitors move between indoor interpretation and a reconstructed historic landscape.",
      "For TexasDefined, this page complements the separate Museum of the American Railroad authority already in Frisco. Cross-linking both destinations with Collin County and Frisco coverage creates a stronger local-history and transportation cluster without collapsing two distinct institutions into one listing."
    ],
    officialUrl: "https://www.friscotexas.gov/1355/Frisco-Heritage-Center",
    managingAuthority: "City of Frisco / Play Frisco Cultural Affairs",
    address: "6455 Page St, Frisco, TX 75034",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
