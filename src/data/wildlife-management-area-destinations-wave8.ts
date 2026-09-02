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
 * Eighth statewide Texas Wildlife Management Area authority wave.
 *
 * Adds Kerr WMA, the verified current TPWD gap found after reconciling this
 * batch against the already-merged Wave 1 catalog. Subject-specific imagery is
 * intentionally deferred to the normal destination-readiness gate.
 */
export const wildlifeManagementAreaWave8Destinations: Destination[] = [
  wma({
    slug: "kerr-wildlife-management-area",
    name: "Kerr Wildlife Management Area",
    summary: "Kerr Wildlife Management Area protects 6,459 acres near Hunt at the headwaters of the North Fork Guadalupe River, serving as TPWD's Edwards Plateau research and demonstration site for white-tailed deer, Hill Country habitat and wildlife management.",
    region: "hill-country",
    nearestTown: "Hunt",
    county: "Kerr County",
    coordinates: { lat: 30.0621, lng: -99.504 },
    address: "2625 FM 1340, Hunt, TX 78024",
    bestSeason: "Fall through spring for mild Hill Country wildlife viewing; public access is suspended during special-permit hunts.",
    entryNote: "Public access is available year-round in designated areas except during special-permit hunts, but hours vary by entrance. The main entrance is generally open weekdays, while Schumacher Road provides daylight wildlife-viewing access daily. Registration is required, camping is not permitted, and hunting is only through TPWD drawn hunts.",
    highlights: ["North Fork Guadalupe River headwaters", "White-tailed deer research", "Four-mile educational driving tour", "Hill Country birding and wildlife viewing"],
    body: [
      "Kerr WMA has served for decades as TPWD's Edwards Plateau laboratory for habitat management and wildlife research. The Donnie E. Harmel White-tailed Deer Research Facility is closely associated with the area's long-running deer studies.",
      "For non-hunters, the most accessible experiences include a paved four-mile educational auto tour on weekdays and daily daylight wildlife viewing from the Schumacher entrance. The WMA also protects river frontage and habitat used by a broad Hill Country bird community.",
      "Access remains subordinate to research and wildlife management. Visitors must register, should verify hunt closures before arrival, cannot camp on the WMA, and should pay attention to the different operating hours for the main and Schumacher entrances.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=12",
  }),
];
