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
 * Twenty-second statewide museum wave. These active North Texas institutions
 * have current visitor information and defensible OpenStreetMap/Wikidata-backed
 * geospatial records, so they can enter the canonical destination graph without
 * inferred coordinates.
 */
export const statewideMuseumExpansionWave22Destinations: Destination[] = [
  {
    id: "museum-statewide-wave22-ellis-county",
    brandId: "texasdefined",
    slug: "ellis-county-museum-waxahachie",
    name: "Ellis County Museum",
    summary: "Ellis County Museum occupies an 1889 former Masonic lodge on Waxahachie's historic courthouse square and interprets county history through agriculture, railroads, architecture, local people, rotating exhibits, archives and interactive displays.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Waxahachie",
    county: "Ellis County",
    coordinates: { lat: 32.38478, lng: -96.84756 },
    hero: museumPlaceholder("Ellis County Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially good for combining the galleries with Waxahachie's courthouse square and historic neighborhoods.",
    entryNote: "Admission is currently free, with donations accepted. The museum lists Monday-Saturday hours from 10 a.m. to 5 p.m. and Sunday noon to 4 p.m.; verify holiday or event changes before traveling.",
    highlights: ["1889 downtown building", "Ellis County local history", "Archives and research library", "Waxahachie courthouse-square setting"],
    body: [
      "Ellis County Museum gives Waxahachie's celebrated architecture a county-history anchor. The museum's building is itself part of the story: an 1889 structure on the historic square that later became home to collections documenting the people and industries that shaped Ellis County.",
      "Exhibits move from early settlement and agriculture through railroads, Victorian architecture, local sports, scientific achievements and community life. Archives and a research library extend the institution beyond a visitor attraction, while rotating displays keep the public galleries from becoming a fixed chronology.",
      "For TexasDefined, this destination strengthens both Ellis County and Waxahachie authority. It can cross-link the historic courthouse, Gingerbread architecture, downtown itineraries and county history through a dedicated canonical page rather than leaving the museum as a passing attraction mention."
    ],
    officialUrl: "https://www.elliscountymuseum.org/planyourvisit",
    managingAuthority: "Ellis County Museum, Inc.",
    address: "201 S College St, Waxahachie, TX 75165",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave22-denton-courthouse",
    brandId: "texasdefined",
    slug: "denton-county-courthouse-on-the-square-museum",
    name: "Denton County Courthouse-on-the-Square Museum",
    summary: "Denton County's 1896 Courthouse-on-the-Square houses a free county-history museum in the center of downtown Denton, pairing changing exhibitions and local collections with one of North Texas's best-known historic courthouse buildings.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Denton",
    county: "Denton County",
    coordinates: { lat: 33.215, lng: -97.13307 },
    hero: museumPlaceholder("Denton County Courthouse-on-the-Square Museum"),
    bestSeason: "Year-round museum; fall through spring is particularly comfortable for exploring the surrounding Denton square before or after the galleries.",
    entryNote: "The Denton County facility currently lists free admission, Monday-Friday museum hours from 10 a.m. to 4 p.m. and Saturday from 11 a.m. to 3 p.m. It is closed Sundays and most major holiday weekends.",
    highlights: ["1896 historic courthouse", "Denton County history", "Changing exhibitions", "John B. Denton burial site"],
    body: [
      "The Courthouse-on-the-Square Museum lets visitors encounter county history inside one of Denton's most recognizable landmarks. Built in 1896 from Texas limestone, granite and sandstone, the courthouse is both the museum's setting and its largest artifact.",
      "Denton County's Office of History & Culture uses the building for changing exhibitions, lectures and community programs alongside permanent local-history interpretation. John B. Denton, the namesake of both city and county, is buried on the courthouse grounds, tying the square directly to the county's civic story.",
      "A canonical TexasDefined page makes the museum a natural bridge among Denton city coverage, courthouse architecture, county history and the walkable downtown square. It also keeps the building's museum function distinct from a generic courthouse listing."
    ],
    officialUrl: "https://www.dentoncounty.gov/Facilities/Facility/Details/CourthouseontheSquare-Museum-11",
    managingAuthority: "Denton County Office of History & Culture",
    address: "110 W Hickory St, Denton, TX 76201",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave22-heritage-farmstead",
    brandId: "texasdefined",
    slug: "heritage-farmstead-museum-plano",
    name: "Heritage Farmstead Museum",
    summary: "Plano's Heritage Farmstead Museum preserves an 1891 Blackland Prairie farmstead with 15 historic buildings, a Victorian farmhouse, farm animals, gardens and more than 10,000 objects and archival materials tied to North Texas agricultural life.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Plano",
    county: "Collin County",
    coordinates: { lat: 33.0192, lng: -96.73158 },
    hero: museumPlaceholder("Heritage Farmstead Museum"),
    bestSeason: "Fall through spring for comfortable time on the outdoor farm grounds; the historic house and exhibits add year-round interest during public hours.",
    entryNote: "The museum currently welcomes visitors Thursday through Saturday from 10 a.m. to 2 p.m. at 1900 W 15th Street. Admission and special-event pricing vary, so check the official visitor page before arrival.",
    highlights: ["1891 Wilson House", "15 historic buildings", "Blackland Prairie farm life", "10,000+ objects and archival materials"],
    body: [
      "Heritage Farmstead Museum preserves a rural landscape inside modern Plano, making it especially useful for understanding what Collin County looked like before suburban development transformed the region. The 1891 Wilson House anchors a complex of historic buildings, gardens and working-farm elements.",
      "The museum interprets Blackland Prairie agriculture through architecture, domestic life, animals, tools and a collection of more than 10,000 objects and archival materials. School programs and hands-on experiences make the farmstead an active educational site rather than a preserved house viewed only from a distance.",
      "For TexasDefined, the destination adds historical depth to Collin County coverage that otherwise tends to emphasize modern growth. It cross-links Plano, Blackland Prairie history, family attractions and North Texas agriculture while remaining distinct from the county's art, railroad and natural-science museums."
    ],
    officialUrl: "https://www.heritagefarmstead.org/visit/",
    managingAuthority: "Heritage Farmstead Association",
    address: "1900 W 15th St, Plano, TX 75075",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
