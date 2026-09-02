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
 * Sixth statewide Texas Wildlife Management Area authority wave.
 *
 * These records cover current TPWD areas where public access is restricted,
 * permit-controlled, or unavailable. Copy intentionally leads with those
 * constraints so Texas Defined does not imply state-park-style walk-in access.
 * Placeholder imagery keeps every record staged behind the existing indexing
 * readiness gate until destination-specific licensed photography is attached.
 */
export const wildlifeManagementAreaWave6Destinations: Destination[] = [
  wma({
    slug: "dr-wintermann-wildlife-management-area",
    name: "D.R. Wintermann Wildlife Management Area",
    summary: "D.R. Wintermann WMA is a 246-acre Wharton County coastal-prairie and wetland management site created from a former rice farm, serving primarily as a waterfowl sanctuary and demonstration landscape for wetland management.",
    region: "gulf-coast",
    nearestTown: "Wharton",
    county: "Wharton County",
    coordinates: { lat: 29.31, lng: -96.1 },
    bestSeason: "Winter for migratory waterfowl, cranes and bald eagles, but visitation must be arranged with the area manager rather than treated as ordinary public access.",
    entryNote: "Limited access only. TPWD directs visitors and groups to contact the area manager for details before visiting. There are no restroom facilities and visitors must bring drinking water.",
    highlights: ["246-acre wetland and coastal-prairie site", "Waterfowl sanctuary", "Sandhill cranes and wintering birds", "Wetland-management demonstration landscape"],
    body: [
      "D.R. Wintermann WMA occupies a former rice farm in Wharton County where part of the property was converted to managed wetland habitat. Its flat coastal-prairie setting is used primarily as a waterfowl sanctuary and as an outdoor laboratory for wetland and prairie management.",
      "Seasonal wildlife can include bald eagles, sandhill cranes, geese, teal, ducks, ibis, doves and neotropical migrants, making the site important for conservation and education even though it is not operated as a conventional public attraction.",
      "Access is the controlling trip-planning fact. TPWD lists the WMA as limited access and instructs visitors and groups to contact the area manager before arrival. Do not plan an unscheduled walk-in visit.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=44",
  }),
  wma({
    slug: "mason-mountain-wildlife-management-area",
    name: "Mason Mountain Wildlife Management Area",
    summary: "Mason Mountain WMA is a 5,500-acre Hill Country research and wildlife-management property north of Mason, with rugged canyons, caliche hills, granite outcrops and carefully controlled public access.",
    region: "hill-country",
    nearestTown: "Mason",
    county: "Mason County",
    coordinates: { lat: 30.82, lng: -99.22 },
    bestSeason: "Access depends on scheduled research, education, tours and hunting opportunities rather than season alone; check TPWD before planning any visit.",
    entryNote: "Mason Mountain WMA is not open to unsupervised visitation. Most public use is limited to research, education, drawn hunts, seminars and pre-arranged tours. Hiking, biking, driving and wildlife viewing are limited to the 200-acre demonstration site when access is available.",
    highlights: ["5,500-acre Llano Uplift research landscape", "Wildlife-management demonstration site", "Native and research-managed wildlife", "Pre-arranged educational access"],
    body: [
      "Mason Mountain WMA was acquired by TPWD in 1997 after operating as an exotic-game ranch. Today it supports ecological research in the Central Mineral Region and demonstrates wildlife-management practices relevant to Hill Country private lands.",
      "The rough landscape includes steep canyons, caliche hills and granite outcrops. Native wildlife includes white-tailed deer, bobwhite quail, javelina, wild turkey, mourning dove and numerous smaller mammals, reptiles and migratory birds, while limited exotic ungulates remain part of research and management programs.",
      "This is not a normal walk-in destination. TPWD restricts unsupervised visitation; the majority of the WMA is used through research, educational programs, drawn hunts, seminars and arranged tours. The 200-acre demonstration site is the limited public-use area for activities such as hiking and wildlife viewing.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=14",
  }),
  wma({
    slug: "matador-wildlife-management-area",
    name: "Matador Wildlife Management Area",
    summary: "Matador WMA protects 28,183 acres of Rolling Plains habitat in Cottle County, including mesquite uplands, shinnery-oak rangeland, gravel hills and bottomlands managed for research, wildlife management and regulated public use.",
    region: "panhandle-plains",
    nearestTown: "Paducah",
    county: "Cottle County",
    coordinates: { lat: 34.14, lng: -100.25 },
    address: "3036 FM 3256, Paducah, TX 79248",
    bestSeason: "Fall through spring for cooler wildlife viewing and hiking; public access remains subject to permits, registration and closures for Special Permit hunts.",
    entryNote: "Open year-round except when the entire area closes for Special Permit hunts. All public users must check in and out. Adults using the WMA for non-hunting activities need the applicable Limited Public Use permit; hunting follows APH or drawn-hunt rules.",
    highlights: ["28,183 acres of Rolling Plains habitat", "Shinnery oak and mesquite uplands", "Wildlife research and management", "Permit-based hiking, camping and wildlife viewing"],
    body: [
      "TPWD purchased Matador WMA in 1959 using Pittman-Robertson funds for wildlife research, management and public use. Its large Cottle County landscape represents the central Rolling Plains through mesquite uplands, shinnery-oak range, gravelly hills and bottomland habitat.",
      "The WMA supports regulated hunting as well as camping, driving, fishing, hiking and wildlife viewing. Tours are also offered periodically and can be arranged for groups, expanding its educational role beyond the hunting program.",
      "Public use is structured rather than unrestricted. Every user must register on entry and departure, adults need the permit appropriate to their activity, restricted areas remain off limits, and Special Permit hunts can close the entire WMA.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=15",
  }),
  wma({
    slug: "yoakum-dunes-wildlife-management-area",
    name: "Yoakum Dunes Wildlife Management Area",
    summary: "Yoakum Dunes WMA protects High Plains dune and rangeland habitat near Plains for conservation work that includes lesser prairie-chicken habitat, but TPWD currently keeps the WMA closed to public recreation.",
    region: "panhandle-plains",
    nearestTown: "Plains",
    county: "Yoakum County",
    coordinates: { lat: 33.2, lng: -102.83 },
    bestSeason: "No public recreation season is currently available because TPWD lists the WMA as closed to the public.",
    entryNote: "This WMA is NOT currently open to the public. Do not travel there expecting hunting, birding, hiking or other recreational access; TPWD states that future public use will depend on resource assessment and management decisions.",
    highlights: ["High Plains dune conservation", "Lesser prairie-chicken habitat", "Established as a WMA in 2014", "Currently closed to public recreation"],
    body: [
      "The Texas Parks and Wildlife Commission authorized Yoakum Dunes WMA in 2014 to expand conservation in the western Panhandle and South Plains, where dune systems and surrounding rangelands provide important habitat for species including the lesser prairie chicken.",
      "TPWD has described hunting, birding and other compatible recreation as possible future uses, but the agency has not opened the property for those activities while on-site resources and management needs are assessed.",
      "For travelers, the current rule is simple: this is an authority and conservation page, not a recommendation to visit. TPWD explicitly lists Yoakum Dunes WMA as not currently open to the public.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=111",
  }),
];
