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
 * Twenty-fourth statewide museum wave. This group closes four current county-
 * history gaps from the original museum inventory after reconciliation against
 * the Wave 23 canonical catalog and current institutional visitor sources.
 */
export const statewideMuseumExpansionWave24Destinations: Destination[] = [
  {
    id: "museum-statewide-wave24-ellis-county",
    brandId: "texasdefined",
    slug: "ellis-county-museum-waxahachie",
    name: "Ellis County Museum",
    summary: "The Ellis County Museum occupies an 1889 landmark on Waxahachie's courthouse square and preserves county history through artifacts, photographs, archives and exhibits tied to settlement, commerce, transportation and everyday life across Ellis County.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Waxahachie",
    county: "Ellis County",
    coordinates: { lat: 32.38487, lng: -96.8477 },
    hero: museumPlaceholder("Ellis County Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for combining it with the Ellis County Courthouse, downtown architecture and a Waxahachie walking itinerary.",
    entryNote: "Admission is currently free. The museum lists Monday-Saturday hours from 10 a.m. to 5 p.m. and Sunday from noon to 4 p.m.; verify holiday or special-event changes before making a dedicated trip.",
    highlights: ["1889 historic building", "Ellis County local history", "Courthouse-square setting", "Photographs, artifacts and archives"],
    body: [
      "The Ellis County Museum gives Waxahachie's celebrated courthouse square a dedicated county-history institution rather than leaving the surrounding historic buildings without interpretive context. Its 1889 home is itself part of the story, connecting collections to the commercial district that grew around county government and rail-era development.",
      "Inside, artifacts, photographs and documentary material follow communities across Ellis County through settlement, agriculture, transportation, business and changing everyday life. The museum's countywide mission makes it useful beyond a single-city narrative even though its downtown location makes it easy to include in a Waxahachie visit.",
      "For TexasDefined, this page creates a canonical Ellis County history anchor that can cross-link courthouse architecture, Waxahachie, county travel, railroad history and nearby heritage destinations while preserving the museum as a distinct visitor stop."
    ],
    officialUrl: "https://www.elliscountymuseum.org/planyourvisit",
    managingAuthority: "Ellis County Museum",
    address: "201 S College St, Waxahachie, TX 75165",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave24-denton-courthouse",
    brandId: "texasdefined",
    slug: "courthouse-on-the-square-museum-denton",
    name: "Courthouse-on-the-Square Museum",
    summary: "Denton County's Courthouse-on-the-Square Museum interprets local history inside the restored 1896 courthouse at the center of downtown Denton, combining county collections with one of North Texas's most recognizable historic civic buildings.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Denton",
    county: "Denton County",
    coordinates: { lat: 33.215, lng: -97.13298 },
    hero: museumPlaceholder("Courthouse-on-the-Square Museum"),
    bestSeason: "Year-round museum; fall through spring is especially comfortable for pairing it with Denton's walkable downtown square and other Denton County heritage stops.",
    entryNote: "Denton County currently lists free admission, Monday-Friday hours from 10 a.m. to 4 p.m. and Saturday hours from 11 a.m. to 3 p.m.; the museum is closed Sundays. Check county notices for holiday or courthouse-event changes.",
    highlights: ["1896 Denton County Courthouse", "Free county-history museum", "Historic downtown Denton", "Restored civic architecture"],
    body: [
      "The Courthouse-on-the-Square Museum works because the building and the collections reinforce one another. The 1896 courthouse remains the architectural centerpiece of downtown Denton, while museum interpretation inside helps visitors understand the county institutions, communities and people that developed around it.",
      "The courthouse was restored in the early 2000s and continues to function as a preserved public landmark rather than a detached architectural relic. Exhibitions and county-history material add context to the square, making the site useful to visitors who might otherwise photograph the exterior and leave without understanding its civic role.",
      "For TexasDefined, the museum gives Denton County a strong county-history node that can connect Denton city coverage, courthouse-square architecture, North Texas road trips and nearby cultural destinations through one current canonical page."
    ],
    officialUrl: "https://www.dentoncounty.gov/Facilities/Facility/Details/CourthouseontheSquare-Museum-11",
    managingAuthority: "Denton County Office of History and Culture",
    address: "110 W Hickory St, Denton, TX 76201",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave24-lampasas-county",
    brandId: "texasdefined",
    slug: "lampasas-county-museum",
    name: "Lampasas County Museum",
    summary: "The Lampasas County Museum preserves local photographs, artifacts, documents and rotating exhibits that interpret Lampasas County's springs, settlement, ranching, business and community life from a downtown museum near the city's historic core.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Lampasas",
    county: "Lampasas County",
    coordinates: { lat: 31.066314, lng: -98.179125 },
    hero: museumPlaceholder("Lampasas County Museum"),
    bestSeason: "Year-round when galleries are accessible; spring and fall are especially comfortable for combining the museum with Hancock Springs, downtown Lampasas and Hill Country drives.",
    entryNote: "CURRENT IMPROVEMENT WORK: the museum's 2026 updates describe roof and structural work and the temporary movement or reworking of exhibits. The site still publishes Friday-Saturday hours from 10 a.m. to 4 p.m., but verify current public access before making a special trip. Admission is donation-supported.",
    highlights: ["Lampasas County history", "Local photographs and archives", "Rotating community exhibits", "Downtown Lampasas heritage"],
    body: [
      "The Lampasas County Museum provides the county-level context behind a Hill Country town better known to many travelers for mineral springs and historic downtown architecture. Local artifacts, photographs and documentary collections connect those landmarks to the people, businesses and rural communities that shaped the county.",
      "The museum is currently working through physical improvements, so accurate status guidance matters more than repeating a normal-hours listing. Roof and structural work has required exhibits to be moved or reconsidered, and TexasDefined's page treats current access as something travelers should confirm rather than assuming every gallery is operating normally.",
      "For TexasDefined, the museum creates a stable county-history URL that can link Lampasas, Hancock Springs, ranching, Hill Country travel and county authority content. The same page can be updated as renovation work progresses without creating a temporary replacement destination."
    ],
    officialUrl: "https://www.lampasasmuseum.org/",
    managingAuthority: "Lampasas County Museum Foundation",
    address: "303 S Western Ave, Lampasas, TX 76550",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave24-comanche-county",
    brandId: "texasdefined",
    slug: "comanche-county-historical-museum",
    name: "Comanche County Historical Museum",
    summary: "The Comanche County Historical Museum uses more than fourteen exhibit rooms and a large regional collection to interpret Native and pioneer history, ranching, agriculture, veterans, communities and family stories from across Comanche County.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Comanche",
    county: "Comanche County",
    coordinates: { lat: 31.898076, lng: -98.618822 },
    hero: museumPlaceholder("Comanche County Historical Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall work especially well for combining Comanche with the Texas Forts Trail and surrounding rural heritage destinations.",
    entryNote: "The museum currently lists Thursday-Saturday hours from 10 a.m. to 4 p.m. at 402 Moorman Road. School, private and group tours can be arranged; verify holiday and special-event schedules before traveling.",
    highlights: ["Fourteen-plus exhibit rooms", "Comanche County pioneer history", "Veterans and community collections", "Texas Forts Trail connection"],
    body: [
      "The Comanche County Historical Museum has enough space to tell local history community by community rather than compressing the county into a few display cases. Its collections cover settlement, ranching, agriculture, military service, schools, businesses and family life across a wide rural area.",
      "The museum's scale—roughly 50,000 square feet according to its current visitor information—allows specialized rooms and donated collections to remain tied to their local context. That is especially valuable in a county where many small communities have lost historic commercial buildings and institutions over time.",
      "For TexasDefined, this destination strengthens Comanche County's authority layer and creates natural links to the Texas Forts Trail, nearby frontier sites, ranching history and county travel pages while avoiding a generic regional-history substitute."
    ],
    officialUrl: "https://www.comanchecountytxmuseum.com/about-us",
    managingAuthority: "Comanche County Historical Museum",
    address: "402 Moorman Rd, Comanche, TX 76442",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
