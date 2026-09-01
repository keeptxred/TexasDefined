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
 * Thirty-second statewide museum wave. This source-clean Piney Woods record
 * reconciles the audit's Sabine County museum entry to the active historic jail
 * museum and memorial library on Hemphill's courthouse square.
 */
export const statewideMuseumExpansionWave32Destinations: Destination[] = [
  {
    id: "museum-statewide-wave32-sabine-county-jail-museum",
    brandId: "texasdefined",
    slug: "sabine-county-jail-museum-and-virgie-speights-memorial-library",
    name: "Sabine County Jail Museum and Virgie Speights Memorial Library",
    summary: "Sabine County Jail Museum and Virgie Speights Memorial Library preserves county history inside Hemphill's early-twentieth-century former jail, combining local artifacts and genealogy resources with the building's surviving cells, gallows space and courthouse-square setting.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Hemphill",
    county: "Sabine County",
    coordinates: { lat: 31.34264, lng: -93.85012 },
    hero: museumPlaceholder("Sabine County Jail Museum and Virgie Speights Memorial Library"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining the museum with Hemphill's courthouse square, Sabine National Forest and Toledo Bend-area heritage sites.",
    entryNote: "The City of Hemphill currently publishes Wednesday-Saturday hours from 9 a.m. to 2 p.m.; local visitor information lists admission as free. Verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "1904 former Sabine County jail",
      "Historic cells, gallows space and trap door",
      "Sabine County artifacts and local-history exhibits",
      "Genealogy and rare-book resources in the memorial library",
    ],
    body: [
      "Sabine County Jail Museum and Virgie Speights Memorial Library occupies the former county jail on Hemphill's courthouse square, giving visitors both a local-history collection and an unusually intact piece of civic architecture. The jail was commissioned in 1903, completed in 1904 and used by Sabine County for decades before being adapted for museum and library use.",
      "The building itself is a major part of the interpretation. Texas Historical Commission records identify it as a Recorded Texas Historic Landmark and note its Victorian design, locally supplied brick and a 1925 interior remodeling by the Southern Steel Company. Inside, visitors can see historic cells, the former hanging area and trap-door features alongside artifacts that document Sabine County communities and families.",
      "The museum also functions as a research stop through the Virgie Speights Memorial Library, where genealogy materials and rare books extend the experience beyond the jail exhibits. Current regional heritage sources place the attraction in the Texas Forest Trail region, making this canonical TexasDefined destination a useful anchor for linking Hemphill, Sabine County, the courthouse square, nearby historic markers and other Piney Woods destinations without reducing the site to a thin directory entry.",
    ],
    officialUrl: "https://www.cityofhemphill.com/1205/Historic-Jail-Museum",
    managingAuthority: "Sabine County Historical Society",
    address: "201 Main St, Hemphill, TX 75948",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
