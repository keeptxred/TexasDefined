import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function wmaPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function wma(input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt" | "managingAuthority">): Destination {
  return {
    ...input,
    id: `texas-wma-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wmaPlaceholder(input.name),
    managingAuthority: "Texas Parks and Wildlife Department",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * Fourth statewide Texas Wildlife Management Area authority wave.
 *
 * Chaparral and James E. Daughtrey are already canonicalized in Wave 1. Keep
 * this wave limited to Las Palomas so the preserved catalog does not carry
 * duplicate destination records with conflicting TPWD identifiers.
 *
 * The shared destination-photo placeholder intentionally keeps the record
 * staged behind the existing destination-readiness/indexing gate until
 * subject-specific licensed imagery is attached.
 */
export const wildlifeManagementAreaWave4Destinations: Destination[] = [
  wma({
    slug: "las-palomas-wildlife-management-area",
    name: "Las Palomas Wildlife Management Area",
    summary: "Las Palomas Wildlife Management Area is a network of 18 Lower Rio Grande Valley units protecting Tamaulipan thornscrub, grassland, farmland and wetlands across Starr, Hidalgo, Cameron and Willacy counties.",
    region: "south-texas",
    nearestTown: "Weslaco",
    county: "Starr, Hidalgo, Cameron and Willacy counties",
    coordinates: { lat: 26.16, lng: -97.99 },
    address: "154-B Lakeview Dr, Weslaco, TX 78596",
    bestSeason: "Fall through spring for comfortable hiking, birding and Lower Rio Grande Valley wildlife viewing; unit-level hunt schedules can temporarily close non-hunting access.",
    entryNote: "Selected public-use units are generally available during daylight hours for hiking, bicycling and wildlife viewing, but non-hunting activities close during public hunts. Visitors age 17 and older generally need an Annual Public Hunting or Limited Public Use permit, and daily entry and exit registration is required through TPWD's current on-site registration process. Choose a specific unit and verify its current rules before traveling.",
    highlights: ["18 Lower Rio Grande Valley units", "Tamaulipan thornscrub", "White-winged dove conservation history", "Birding, hiking and wildlife viewing"],
    body: [
      "Las Palomas is not one contiguous preserve. Its 18 units are scattered across the Lower Rio Grande Valley, where TPWD has protected and restored tracts of thornscrub, grassland, agricultural edge and wetland habitat in a region transformed by intensive development and farming.",
      "The WMA was historically associated with protection of white-winged dove nesting habitat, but its units now support a broader South Texas wildlife community and provide strategically placed public lands within one of the country's most distinctive birding regions.",
      "Public access is unit-specific. Anacua, Arroyo Colorado, Baird, Carricitos, Chapote, Ebony, Longoria, Taormina and Tucker are among the units TPWD identifies for public use, so a successful visit starts by selecting a unit, reviewing its map and checking hunt closures before departure."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=47",
  }),
];
