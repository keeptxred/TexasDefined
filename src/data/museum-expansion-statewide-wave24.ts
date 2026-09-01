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
 * Twenty-fourth statewide museum wave after canonical reconciliation. Ellis
 * County Museum and Denton County Courthouse-on-the-Square Museum are owned by
 * their earlier Wave 22 canonical records; this file retains only the museum
 * destinations that were genuinely new in Wave 24.
 */
export const statewideMuseumExpansionWave24Destinations: Destination[] = [
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
