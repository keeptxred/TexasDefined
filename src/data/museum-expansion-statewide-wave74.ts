import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-18";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Seventy-fourth statewide museum wave. This record reconciles the audit's
 * generic "Wilson County Historical Museum" wording to the active Wilson
 * County Jailhouse Museum operated by the Wilson County Historical Society.
 */
export const statewideMuseumExpansionWave74Destinations: Destination[] = [
  {
    id: "museum-statewide-wave74-wilson-county-jailhouse-museum",
    brandId: "texasdefined",
    slug: "wilson-county-jailhouse-museum-floresville",
    name: "Wilson County Jailhouse Museum",
    summary: "Wilson County Jailhouse Museum preserves county history inside Floresville's 1887 former jail and sheriff's residence, where original cells, living quarters, photographs, documents and local-history displays interpret nearly a century of law enforcement and community life.",
    category: "historic-sites",
    region: "south-texas",
    geography: {
      primaryRegionId: "south-texas",
      subregionIds: ["south-texas-brush-country"],
      countySlugs: ["wilson"],
      travelRegionIds: ["south-texas"],
    },
    nearestTown: "Floresville",
    county: "Wilson County",
    coordinates: { lat: 29.133774, lng: -98.156952 },
    hero: museumPlaceholder("Wilson County Jailhouse Museum"),
    bestSeason: "Year-round on scheduled museum weekends; fall through spring is especially comfortable for combining the jailhouse with the Floresville courthouse square and other Wilson County heritage stops.",
    entryNote: "Current 2026 visitor notices list museum tours on the second and fourth Saturday of each month from 10 a.m. to 3 p.m. The Wilson County Historical Society page lists $3 admission for ages 13 and up, while July and August 2026 Wilson County News notices say admission is currently free. Check the museum's current notice before visiting if the fee matters to your plans.",
    highlights: [
      "1887 James Riely Gordon jail and sheriff's residence",
      "Original two-level cell blocks and surviving jail interior",
      "Wilson County photographs, documents and local-history artifacts",
      "Restored courthouse-square landmark reopened to public tours",
    ],
    body: [
      "Wilson County Jailhouse Museum occupies one of Floresville's most important surviving public buildings. County officials commissioned architect James Riely Gordon in 1887 to design a jail that combined the sheriff's family residence with a secure prisoner area. The front rooms served domestic and administrative functions, while prefabricated cell blocks filled the rear portion of the second floor. The building remained the county jail until 1974, preserving an unusually tangible record of how county law enforcement and family life once shared the same structure.",
      "Wilson County established the building as a museum in 1989, and the historical society now uses it to preserve photographs, documents, artifacts and stories connected to the county. Heavy rain and building damage later forced a long rehabilitation campaign, but the society held a grand reopening in September 2023 after roughly five years of restoration work. Restoration remains an ongoing preservation project even while the museum is open for scheduled tours, so visitors see both a historic artifact and an active conservation effort.",
      "The museum's location on the north side of the courthouse square makes it a natural starting point for Floresville history. It complements the county guide's broader stories of ranching, farming, migration and the San Antonio River by bringing visitors into the rooms and cells where county government once exercised one of its most visible responsibilities. For TexasDefined, the Jailhouse Museum is therefore the clean canonical identity behind the audit's older generic Wilson County museum label, while other Wilson County museums remain separate community institutions.",
    ],
    officialUrl: "https://www.wilsoncountyhistory.org/jailhouse-museum",
    managingAuthority: "Wilson County Historical Society",
    address: "1140 C St, Floresville, TX 78114",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
