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
 * Seventh statewide Texas Wildlife Management Area authority wave.
 *
 * Candy Cain Abshier and Justin Hurst are already canonicalized in Wave 1.
 * This wave contains the remaining unique Gulf Coast WMA records so preserved
 * catalog deduplication does not carry dead copies of those destinations.
 * Placeholder imagery keeps these records staged behind the normal destination
 * readiness gate until licensed subject-specific imagery is attached.
 */
export const wildlifeManagementAreaWave7Destinations: Destination[] = [
  wma({
    slug: "atkinson-island-wildlife-management-area",
    name: "Atkinson Island Wildlife Management Area",
    summary: "Atkinson Island Wildlife Management Area protects about 150 acres on the northern end of Atkinson Island in Galveston Bay, preserving brackish marsh, shoreline and a small woodlot used by shorebirds, wading birds and migrants.",
    region: "gulf-coast",
    nearestTown: "Baytown",
    county: "Harris and Chambers counties",
    coordinates: { lat: 29.62, lng: -94.92 },
    bestSeason: "Fall through spring for mild temperatures, migratory birds and coastal wildlife viewing.",
    entryNote: "Access is by boat only and there are no developed visitor facilities. Adult visitors generally need a Limited Public Use or Annual Public Hunting permit for WMA access. The area is managed as a wildlife preserve rather than a hunting destination; verify current TPWD conditions before launching.",
    highlights: ["Boat-only Galveston Bay access", "Brackish marsh and shoreline", "Shorebirds and wading birds", "Migratory bird habitat"],
    body: [
      "Atkinson Island WMA occupies the northern portion of an island in Galveston Bay, where marsh, shoreline and woody cover create a compact but important coastal bird habitat.",
      "The WMA is best approached as a boat-based wildlife-viewing destination. Its isolation protects the habitat but also means visitors should bring water, weather protection, navigation and all necessary safety equipment.",
      "Because this is a working wildlife area rather than a developed park, trip planning should start with current TPWD access rules and marine conditions.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=35",
  }),
  wma({
    slug: "nannie-m-stringfellow-wildlife-management-area",
    name: "Nannie M. Stringfellow Wildlife Management Area",
    summary: "Nannie M. Stringfellow Wildlife Management Area protects about 3,666 acres of San Bernard River floodplain and coastal bottomland hardwood forest in Brazoria County.",
    region: "gulf-coast",
    nearestTown: "Brazoria",
    county: "Brazoria County",
    coordinates: { lat: 29.0, lng: -95.64 },
    address: "2317 C.R. 316, Brazoria, TX 77422",
    bestSeason: "Fall through spring for floodplain birds and cooler conditions, when access is offered through a current special-hunt or TPWD-authorized opportunity.",
    entryNote: "TPWD currently lists the WMA as open for special hunts only; ordinary daily walk-in access should not be assumed. The floodplain is also subject to frequent flooding. Check current TPWD access notices before planning a visit.",
    highlights: ["San Bernard River floodplain", "Bottomland hardwood forest", "Migratory songbird habitat", "Special-hunt access"],
    body: [
      "Nannie M. Stringfellow WMA preserves a substantial tract of floodplain forest in a part of the upper Texas coast where intact bottomland hardwood habitat has become increasingly valuable.",
      "The San Bernard River shapes both the site's ecology and its practical access: periodic flooding is normal and supports the forested wetland system.",
      "The property transferred to TPWD ownership in 2019 and remains access-limited, so travelers should not treat it as a conventional open-day-use destination.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=105",
  }),
  wma({
    slug: "redhead-pond-wildlife-management-area",
    name: "Redhead Pond Wildlife Management Area",
    summary: "Redhead Pond Wildlife Management Area is a 37-acre freshwater wetland in Corpus Christi's Flour Bluff neighborhood protected for wintering redhead ducks, other waterfowl and coastal birds.",
    region: "gulf-coast",
    nearestTown: "Corpus Christi",
    county: "Nueces County",
    coordinates: { lat: 27.65, lng: -97.3 },
    bestSeason: "Late fall through winter for redheads, goldeneyes, mergansers and other wintering waterfowl.",
    entryNote: "Open year-round for day-use hiking and wildlife viewing, and TPWD currently requires no WMA permit for entry. Trails are unimproved and can be muddy or overgrown; there are no restrooms or drinking-water facilities.",
    highlights: ["Wintering redhead ducks", "Freshwater wetland", "Wildlife-viewing platform", "Easy access from Corpus Christi"],
    body: [
      "Redhead Pond provides an unusually accessible pocket of managed freshwater habitat within Corpus Christi, only a short drive from the city's developed areas.",
      "The observation platform and pond edges can produce close views of wintering waterfowl, including species that are less consistently visible elsewhere along the coast.",
      "The site remains deliberately primitive: expect grass, mud and uneven ground rather than a developed park trail system.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=42",
  }),
  wma({
    slug: "tony-houseman-blue-elbow-swamp-wildlife-management-area",
    name: "Tony Houseman/Blue Elbow Swamp Wildlife Management Area",
    summary: "Tony Houseman/Blue Elbow Swamp Wildlife Management Area protects more than 3,300 acres of Sabine River swamp and bottomland habitat in Orange County at the Texas-Louisiana border.",
    region: "gulf-coast",
    nearestTown: "Orange",
    county: "Orange County",
    coordinates: { lat: 30.12, lng: -93.74 },
    bestSeason: "Fall through spring for cooler boardwalk walks, birding and swamp wildlife viewing; high water can affect access after heavy rain.",
    entryNote: "Open year-round. The easiest public introduction is the TxDOT Travel Information Center on I-10 between Orange and the Sabine River, where a roughly 600-foot boardwalk enters the swamp. Boats are needed to explore much of the wider WMA. Check current TPWD hunting and permit requirements for activities beyond the travel-center viewing area.",
    highlights: ["Sabine River swamp", "600-foot interpretive boardwalk", "Texas-Louisiana border habitat", "Fishing, canoeing and wildlife viewing"],
    body: [
      "Tony Houseman/Blue Elbow Swamp WMA is a cooperative conservation project of TPWD and the Texas Department of Transportation protecting a large tract of wet bottomland at Texas's eastern edge.",
      "The I-10 Texas Travel Information Center provides the most straightforward public access and interpretive context, with a boardwalk extending into the swamp.",
      "Beyond that developed viewing point, the WMA is a wet landscape where boats are often necessary and heavy rain can raise water levels quickly; ATVs, airboats and horses are prohibited.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=38",
  }),
  wma({
    slug: "welder-flats-wildlife-management-area",
    name: "Welder Flats Wildlife Management Area",
    summary: "Welder Flats Wildlife Management Area protects 1,480 acres of submerged coastal wetlands in San Antonio Bay near Seadrift, including shallow-water habitat used by waterfowl, shorebirds, fish and wintering whooping cranes.",
    region: "gulf-coast",
    nearestTown: "Seadrift",
    county: "Calhoun County",
    coordinates: { lat: 28.29, lng: -96.67 },
    bestSeason: "Late fall through winter for whooping cranes and waterfowl, with fishing and wildlife viewing available year-round when marine conditions allow.",
    entryNote: "Open year-round for saltwater fishing, duck hunting and wildlife viewing. No WMA permit is currently required, but access is by boat only and hunting or fishing requires the appropriate licenses, stamps and endorsements. The WMA itself is submerged; surrounding exposed dry land is private property.",
    highlights: ["San Antonio Bay", "Submerged coastal wetlands", "Wintering whooping cranes", "Boat-only fishing and wildlife viewing"],
    body: [
      "Welder Flats is fundamentally an aquatic WMA rather than a walkable preserve. Its shallow bay habitat supports fish, submerged vegetation and the birds that depend on them.",
      "Whooping cranes are among the most notable winter visitors, while waterfowl, wading birds and shorebirds use the surrounding bay system throughout the season.",
      "Every visit is governed by boat logistics and marine weather. Visitors must remain aware that exposed shoreline and dry land around the WMA are privately owned and are not part of the public wildlife area.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=43",
  }),
];
