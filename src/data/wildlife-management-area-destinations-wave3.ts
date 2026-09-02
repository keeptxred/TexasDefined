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

function wma(input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt">): Destination {
  return {
    ...input,
    id: `texas-wma-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wmaPlaceholder(input.name),
    managingAuthority: input.managingAuthority ?? "Texas Parks and Wildlife Department",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * First Pineywoods Wildlife Management Area authority wave.
 *
 * TPWD's current Pineywoods inventory contains eleven WMAs. This wave adds the
 * first five visitor-relevant authorities while preserving the normal
 * destination-photo readiness gate until subject-specific imagery is attached.
 */
export const wildlifeManagementAreaWave3Destinations: Destination[] = [
  wma({
    slug: "alabama-creek-wildlife-management-area",
    name: "Alabama Creek Wildlife Management Area",
    summary: "Alabama Creek WMA covers 14,561 acres in Trinity County within Davy Crockett National Forest, combining pine-hardwood forest, Neches River habitat and public access for wildlife viewing, hiking, camping, fishing and hunting.",
    region: "piney-woods",
    nearestTown: "Groveton",
    county: "Trinity County",
    coordinates: { lat: 31.07, lng: -95.17 },
    bestSeason: "Fall through spring for cooler hiking, wildlife viewing and camping; summer visits require planning for heat, humidity and mosquitoes.",
    entryNote: "Open year-round, although interior roads can close seasonally. TPWD currently does not require a permit for non-consumptive use; hunting requires the applicable public-hunting permit and license. Bring drinking water and check current access before traveling.",
    highlights: ["Davy Crockett National Forest", "Neches River habitat", "Primitive camping", "Hiking and wildlife viewing"],
    body: ["Alabama Creek WMA is a large Pineywoods management area embedded within Davy Crockett National Forest and operated through a cooperative agreement between TPWD and the U.S. Forest Service.", "Its forest-management work creates a mix of pine, hardwood and riparian habitats used by deer, turkey, squirrels, migratory birds and other East Texas wildlife.", "The WMA is intentionally primitive. Visitors should use current Forest Service and TPWD maps, carry water and be prepared for seasonal road closures, insects and hunting activity."],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=25",
    managingAuthority: "U.S. Forest Service and Texas Parks and Wildlife Department",
  }),
  wma({
    slug: "alazan-bayou-wildlife-management-area",
    name: "Alazan Bayou Wildlife Management Area",
    summary: "Alazan Bayou WMA protects 2,063 acres of mature bottomland hardwood forest and old-field habitat along the Angelina River south of Nacogdoches.",
    region: "piney-woods",
    nearestTown: "Nacogdoches",
    county: "Nacogdoches County",
    coordinates: { lat: 31.51, lng: -94.69 },
    address: "8096 FM 2782, Nacogdoches, TX 75964",
    bestSeason: "Fall through spring for comfortable wildlife viewing and camping; winter and early spring flooding can reshape access in the Angelina River bottomlands.",
    entryNote: "Open year-round and registration is required. Visitors age 17 and older currently need either an Annual Public Hunting Permit or Limited Public Use Permit. Primitive camping is available; bring water and insect protection.",
    highlights: ["Angelina River bottomlands", "Mature hardwood forest", "Wintering waterfowl habitat", "Primitive camping"],
    body: ["Alazan Bayou preserves mature East Texas bottomland hardwoods along the Angelina River, with Loco Bayou and Moral Creek adding additional wetland and floodplain habitat.", "Seasonal overbank flooding is part of the WMA's ecology and supports waterfowl, deer, turkey, squirrels and other wildlife, but it can also limit practical access.", "Visitors should register, carry the required public-use permit when applicable and check current water and road conditions before entering."],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=26",
  }),
  wma({
    slug: "angelina-neches-dam-b-wildlife-management-area",
    name: "Angelina-Neches/Dam B Wildlife Management Area",
    summary: "Angelina-Neches/Dam B WMA spans 12,636 acres where the Angelina and Neches rivers meet B.A. Steinhagen Reservoir, protecting extensive floodplain, slough and bottomland forest habitat in Jasper and Tyler counties.",
    region: "piney-woods",
    nearestTown: "Jasper",
    county: "Jasper and Tyler counties",
    coordinates: { lat: 30.85, lng: -94.18 },
    bestSeason: "Fall through spring for cooler paddling, fishing, hiking and wildlife viewing; high water and summer heat can make access more difficult.",
    entryNote: "Open year-round. Much of the area is accessible primarily by boat; TPWD says non-consumptive users do not currently need a public-hunting permit. Airboats are prohibited. Bring water and check reservoir and access conditions.",
    highlights: ["Angelina and Neches river confluence", "B.A. Steinhagen Reservoir", "Bottomland hardwoods and cypress", "Boat-based wildlife access"],
    body: ["Angelina-Neches/Dam B WMA occupies a large river-and-reservoir landscape where flat floodplain ridges, sloughs, hardwood bottoms and open water create unusually diverse East Texas habitat.", "The WMA is managed cooperatively with the U.S. Army Corps of Engineers, and most of the area is best approached from public boat ramps around B.A. Steinhagen Reservoir.", "Visitors can fish, paddle, hike, camp and watch wildlife, but should plan around water levels, boat access, heat and current hunting rules."],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=27",
    managingAuthority: "U.S. Army Corps of Engineers and Texas Parks and Wildlife Department",
  }),
  wma({
    slug: "bannister-wildlife-management-area",
    name: "Bannister Wildlife Management Area",
    summary: "Bannister WMA covers 25,695 acres of Angelina National Forest in San Augustine County on a peninsula extending into Sam Rayburn Reservoir, with extensive forest recreation and Eastern wild turkey habitat.",
    region: "piney-woods",
    nearestTown: "Broaddus",
    county: "San Augustine County",
    coordinates: { lat: 31.27, lng: -94.19 },
    bestSeason: "Fall through spring for hiking, biking, camping and wildlife viewing; portions can close seasonally to protect turkey brood habitat.",
    entryNote: "Open year-round under U.S. Forest Service and TPWD rules, with seasonal restrictions in some turkey-management areas. Primitive camping is available. Bring drinking water and verify current forest-road and hunt conditions.",
    highlights: ["Angelina National Forest", "Sam Rayburn Reservoir peninsula", "Eastern wild turkey habitat", "Hiking, biking and primitive camping"],
    body: ["Bannister WMA is a large cooperative wildlife-management area within Angelina National Forest rather than a conventional fenced park or single-entry preserve.", "Forest management supports deer, turkey and a broad Pineywoods wildlife community, while proximity to Sam Rayburn Reservoir expands fishing and outdoor recreation opportunities.", "Some sections close during sensitive turkey brooding periods, so current Forest Service and TPWD information should guide route planning."],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=28",
    managingAuthority: "U.S. Forest Service and Texas Parks and Wildlife Department",
  }),
  wma({
    slug: "caddo-lake-wildlife-management-area",
    name: "Caddo Lake Wildlife Management Area",
    summary: "Caddo Lake WMA protects 8,124 acres of bald-cypress swamp, seasonally flooded bottomland hardwoods and pine-hardwood uplands around one of Texas's most distinctive wetland landscapes.",
    region: "piney-woods",
    nearestTown: "Jefferson",
    county: "Marion and Harrison counties",
    coordinates: { lat: 32.68, lng: -94.12 },
    address: "4752 FM 805, Jefferson, TX 75657",
    bestSeason: "Fall through spring for cooler paddling, birding and hiking; warm months bring high heat, humidity and heavy insect activity.",
    entryNote: "Open year-round except during annual drawn hunts. TPWD currently requires an Annual Public Hunting Permit or Limited Public Use permit for land-based entry. Primitive camping is available and some access points are boat-oriented.",
    highlights: ["Bald-cypress swamp", "Ramsar wetland landscape", "Canoeing and kayaking", "Birding and primitive camping"],
    body: ["Caddo Lake WMA protects state-managed wetlands and forests within the larger Caddo Lake ecosystem, including permanently flooded cypress swamp and seasonally flooded hardwood bottoms.", "The area was acquired for conservation beginning in 1992, and the surrounding Caddo Lake wetland complex received international Ramsar recognition for its ecological importance.", "Visitors can bird, hike, paddle, photograph wildlife and camp primitively, but should plan around permit requirements, drawn-hunt closures, heat and limited facilities."],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=104",
  }),
];
