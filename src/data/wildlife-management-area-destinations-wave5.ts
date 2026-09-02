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
 * Fifth statewide Texas Wildlife Management Area authority wave.
 *
 * This wave fills current TPWD Pineywoods-area gaps. The shared destination
 * placeholder intentionally keeps each record staged behind the existing
 * destination-readiness/indexing gate until licensed subject imagery exists.
 */
export const wildlifeManagementAreaWave5Destinations: Destination[] = [
  wma({
    slug: "alabama-creek-wildlife-management-area",
    name: "Alabama Creek Wildlife Management Area",
    summary: "Alabama Creek WMA covers 14,561 acres in Trinity County within Davy Crockett National Forest, combining East Texas forest habitat with public hunting, wildlife viewing and primitive outdoor recreation.",
    region: "piney-woods",
    nearestTown: "Apple Springs",
    county: "Trinity County",
    coordinates: { lat: 31.05, lng: -95.2 },
    bestSeason: "Fall through spring for cooler forest hiking and wildlife viewing; summer requires heat, humidity and insect preparation.",
    entryNote: "The WMA is open year-round, but hunting, vehicle use and other activities follow current TPWD and U.S. Forest Service rules. Primitive camping is available; bring drinking water and do not expect restroom facilities.",
    highlights: ["14,561 acres in Davy Crockett National Forest", "Pineywoods wildlife habitat", "Primitive camping", "Hunting and wildlife viewing"],
    body: [
      "Alabama Creek WMA is part of Davy Crockett National Forest and is operated through an agreement between TPWD and the U.S. Forest Service. It was established for public hunting and wildlife viewing while forest-management work supports habitat for a broad range of East Texas species.",
      "The landscape offers more than hunting: forest roads and access points support hiking, wildlife viewing and other low-impact recreation, while primitive camping provides a basic overnight option.",
      "This is national-forest-style public land rather than a developed state park. Visitors should carry water, prepare for mosquitoes and summer heat, and confirm current TPWD and Forest Service access rules before arrival.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=25",
  }),
  wma({
    slug: "angelina-neches-dam-b-wildlife-management-area",
    name: "Angelina-Neches/Dam B Wildlife Management Area",
    summary: "Angelina-Neches/Dam B WMA protects 12,636 acres around the Angelina-Neches river system and B.A. Steinhagen Reservoir, combining bottomland hardwoods, cypress wetlands, upland forest and open water in Jasper and Tyler counties.",
    region: "piney-woods",
    nearestTown: "Town Bluff",
    county: "Jasper and Tyler counties",
    coordinates: { lat: 30.84, lng: -94.18 },
    bestSeason: "Fall through spring for mild temperatures, waterfowl and bottomland wildlife; summer is hot and humid.",
    entryNote: "Open year-round, with activity-specific TPWD rules for hunting and public use. Primitive camping is available, but visitors should bring water and expect limited developed facilities.",
    highlights: ["B.A. Steinhagen Reservoir", "Angelina and Neches river habitat", "Bottomland hardwood and cypress wetlands", "Fishing, hiking and wildlife viewing"],
    body: [
      "Angelina-Neches/Dam B WMA spans a large river-and-reservoir complex where East Texas bottomland forests meet B.A. Steinhagen Reservoir. Floodplain hardwoods, cypress, pine uplands and open water create varied habitat in one public-land system.",
      "Public recreation includes fishing, hiking, biking, wildlife viewing, photography, primitive camping and regulated hunting. Water levels and seasonal flooding can change how easily some areas can be reached.",
      "Visitors should treat the area as a working wildlife landscape, not a developed park: check current TPWD rules, carry drinking water, and prepare for heat, humidity, insects and wet ground.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=27",
  }),
  wma({
    slug: "bannister-wildlife-management-area",
    name: "Bannister Wildlife Management Area",
    summary: "Bannister WMA covers 25,695 acres in San Augustine County within Angelina National Forest on a forested peninsula reaching into Sam Rayburn Reservoir.",
    region: "piney-woods",
    nearestTown: "Broaddus",
    county: "San Augustine County",
    coordinates: { lat: 31.22, lng: -94.2 },
    bestSeason: "Fall through spring for cooler forest recreation; check seasonal turkey-restoration access restrictions before visiting in spring and early summer.",
    entryNote: "The WMA is open year-round, but some sections close seasonally for Eastern wild turkey brooding, when only hikers and bicyclists may use those areas. Primitive camping is available and facilities are limited.",
    highlights: ["25,695 acres of Angelina National Forest", "Sam Rayburn Reservoir peninsula", "Eastern wild turkey restoration habitat", "Hiking, biking and primitive camping"],
    body: [
      "Bannister WMA is managed through an agreement with the U.S. Forest Service as part of Angelina National Forest. Its position on a peninsula extending into Sam Rayburn Reservoir gives the area a mix of upland forest and reservoir-edge habitat.",
      "The property is also an Eastern wild turkey restoration site. TPWD restricts portions during brooding season, making current access notices especially important for spring visitors.",
      "Outside those restrictions, the national-forest setting supports a range of outdoor recreation. Bring water, expect mosquitoes and summer humidity, and do not rely on developed restroom facilities.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=28",
  }),
  wma({
    slug: "caddo-lake-wildlife-management-area",
    name: "Caddo Lake Wildlife Management Area",
    summary: "Caddo Lake WMA protects 8,124 acres in Marion and Harrison counties, including permanently flooded bald-cypress swamp, seasonally flooded bottomland hardwoods and mixed pine-hardwood uplands around an internationally important wetland.",
    region: "piney-woods",
    nearestTown: "Karnack",
    county: "Marion and Harrison counties",
    coordinates: { lat: 32.7, lng: -94.14 },
    address: "4752 FM 805, Jefferson, TX 75657",
    bestSeason: "Fall through spring for cooler paddling, birding and wildlife viewing; spring migration is especially productive.",
    entryNote: "The WMA is open year-round except during annual drawn hunts and is entry-by-permit for land-based public use. TPWD accepts an Annual Public Hunting Permit or Limited Public Use permit; verify current hunt closures before entering.",
    highlights: ["8,124-acre Ramsar-associated wetland", "Flooded bald-cypress swamp", "Canoeing and kayaking", "Birding and nature photography"],
    body: [
      "Caddo Lake WMA protects one of Texas's most distinctive wetland landscapes. Permanently flooded bald-cypress swamp transitions into bottomland hardwood and pine-hardwood forest, creating habitat for waterfowl, woodland wildlife and a rich bird community.",
      "The area supports birding, hiking, canoeing, kayaking, nature photography, fishing, primitive camping and regulated hunting. Motorized off-road vehicles and airboats are prohibited under current TPWD rules.",
      "Unlike a conventional park, land entry is permit-based and annual drawn hunts can close the area. Visitors should confirm the current public-use calendar, carry water and prepare for heat, humidity and insects.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=104",
  }),
  wma({
    slug: "moore-plantation-wildlife-management-area",
    name: "Moore Plantation Wildlife Management Area",
    summary: "Moore Plantation WMA covers 26,772 acres in Sabine and Jasper counties within Sabine National Forest, protecting Pineywoods habitat that includes important red-cockaded woodpecker country.",
    region: "piney-woods",
    nearestTown: "Hemphill",
    county: "Sabine and Jasper counties",
    coordinates: { lat: 31.35, lng: -93.85 },
    bestSeason: "Fall through spring for cooler hiking and wildlife viewing; warm months require mosquito and heat preparation.",
    entryNote: "Open year-round under TPWD, U.S. Forest Service and Public Hunting Lands rules. Outdoor uses include wildlife viewing, camping, hiking, bicycling and horseback riding; bring drinking water and expect limited facilities.",
    highlights: ["26,772 acres in Sabine National Forest", "Red-cockaded woodpecker habitat", "Pineywoods forest management", "Hiking, biking, camping and horseback riding"],
    body: [
      "Moore Plantation WMA is managed cooperatively by the U.S. Forest Service, TPWD and adjacent landowners. Most of the property is national-forest land where timber, prescribed fire and threatened-species management shape the habitat.",
      "Red-cockaded woodpeckers are among the most important conservation species associated with the area. TPWD monitors wildlife conditions while hunting and other public uses operate through the broader public-land system.",
      "Wildlife viewing, camping, hiking, bicycling and horseback riding make the WMA useful beyond hunting. Visitors should still expect a lightly developed forest experience with mosquitoes, heat and limited services.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=31",
  }),
  wma({
    slug: "north-toledo-bend-wildlife-management-area",
    name: "North Toledo Bend Wildlife Management Area",
    summary: "North Toledo Bend WMA protects 3,650 acres in Shelby County beside Toledo Bend Reservoir, combining Pineywoods habitat with access to one of the largest reservoirs in the South.",
    region: "piney-woods",
    nearestTown: "Joaquin",
    county: "Shelby County",
    coordinates: { lat: 31.85, lng: -93.95 },
    bestSeason: "Fall through spring for mild forest conditions and lake-oriented recreation; summer heat and humidity can be severe.",
    entryNote: "Open year-round and managed under a license agreement with the Sabine River Authority of Texas. Primitive camping is available; bring drinking water and expect no restroom facilities.",
    highlights: ["3,650 acres beside Toledo Bend Reservoir", "Sabine River watershed", "Primitive camping", "Fishing, hiking and wildlife viewing"],
    body: [
      "North Toledo Bend WMA lies along Toledo Bend Reservoir in Shelby County and is managed through an agreement with the Sabine River Authority of Texas. The reservoir forms part of the Texas-Louisiana boundary along the Sabine River.",
      "The area's public-use mix includes fishing, hiking, horseback riding, wildlife viewing, hunting and primitive camping, making it a flexible public-land stop for travelers along the northern reservoir.",
      "Facilities are minimal. Visitors should carry water, prepare for mosquitoes and summer humidity, and verify current TPWD rules before combining a WMA visit with reservoir recreation.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=33",
  }),
  wma({
    slug: "old-sabine-bottom-wildlife-management-area",
    name: "Old Sabine Bottom Wildlife Management Area",
    summary: "Old Sabine Bottom WMA protects 5,727 acres of Sabine River bottomland hardwood forest northeast of Lindale in Smith County, with oak, elm and ash habitat supporting deer, turkey, waterfowl, hogs and squirrels.",
    region: "piney-woods",
    nearestTown: "Lindale",
    county: "Smith County",
    coordinates: { lat: 32.57, lng: -95.35 },
    address: "21187 CR 4106, Lindale, TX 75771",
    bestSeason: "Fall through spring for cooler hiking and wildlife viewing; wet-weather conditions can make boots essential.",
    entryNote: "Open year-round except for Special Permit hunts. TPWD currently advises that the duck-marsh road is closed until further notice, so check current access before planning a route through the WMA.",
    highlights: ["5,727 acres of Sabine River bottomland", "Mature hardwood forest", "Deer, turkey and waterfowl habitat", "Seasonal wetland conditions"],
    body: [
      "Old Sabine Bottom WMA meanders between the old Sabine River channel and the present river northeast of Lindale. Its bottomland hardwood forest includes large stands of oak, elm and ash with a dense, diverse understory.",
      "Wildlife populations vary with annual water conditions, but the landscape can support squirrels, deer, hogs, turkey and waterfowl. Roads and trails also provide opportunities for wildlife viewing when conditions allow.",
      "Flooded or muddy ground is common enough that TPWD specifically recommends preparation for wet conditions. The duck-marsh road is currently closed until further notice, and special-permit hunts can close the WMA.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=34",
  }),
  wma({
    slug: "sam-houston-national-forest-wildlife-management-area",
    name: "Sam Houston National Forest Wildlife Management Area",
    summary: "Sam Houston National Forest WMA spans 161,508 acres across Montgomery, San Jacinto and Walker counties, pairing a vast East Texas national-forest landscape with public hunting, camping, hiking, bicycling and wildlife viewing.",
    region: "piney-woods",
    nearestTown: "Huntsville",
    county: "Montgomery, San Jacinto and Walker counties",
    coordinates: { lat: 30.55, lng: -95.45 },
    bestSeason: "Fall through spring for comfortable hiking and camping; summer visits require heat, humidity and insect preparation.",
    entryNote: "Open year-round under TPWD and U.S. Forest Service rules. Both primitive and developed designated campsites are available, while horses and ATVs on designated trails require the applicable U.S. Forest Service permit.",
    highlights: ["161,508-acre national-forest WMA", "Camping and long-distance hiking", "Pineywoods wildlife habitat", "Joint TPWD–U.S. Forest Service management"],
    body: [
      "Sam Houston National Forest WMA is the largest Pineywoods WMA in the current TPWD directory, stretching across three counties under an agreement with the U.S. Forest Service.",
      "The forest supports public hunting and fishing alongside camping, hiking, bicycling and wildlife viewing. Designated camping ranges from primitive sites to more developed facilities, and some accessible amenities are available.",
      "Because national-forest and WMA rules overlap, visitors should check both agencies when planning specialized activities. Horse and ATV use on designated trails requires a Forest Service permit under current TPWD guidance.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=30",
  }),
  wma({
    slug: "white-oak-creek-wildlife-management-area",
    name: "White Oak Creek Wildlife Management Area",
    summary: "White Oak Creek WMA protects about 25,777 acres of bottomland hardwood forest at the confluence of the Sulphur River and White Oak Creek across Bowie, Cass, Morris and Titus counties.",
    region: "piney-woods",
    nearestTown: "Omaha",
    county: "Bowie, Cass, Morris and Titus counties",
    coordinates: { lat: 33.17, lng: -94.75 },
    address: "33948 Hwy 77, Omaha, TX 75571",
    bestSeason: "Fall through spring for cooler hiking and wildlife viewing; avoid high-water periods when heavy rain floods bottomland access.",
    entryNote: "Open year-round except when the entire area closes for Special Permit hunts. Flooding can occur rapidly after heavy rain; there are no restroom facilities, and visitors should bring drinking water.",
    highlights: ["25,777 acres of bottomland hardwoods", "Sulphur River and White Oak Creek confluence", "Fishing and horseback riding", "Wildlife viewing and public hunting"],
    body: [
      "White Oak Creek WMA is a large northeast Texas bottomland system managed under a license agreement with the U.S. Army Corps of Engineers. The Sulphur River and White Oak Creek shape a forested floodplain spread across four counties.",
      "Hiking, fishing, horseback riding and wildlife viewing complement the area's public hunting program. Wetland and river conditions make the landscape productive for wildlife but also create significant access variability.",
      "TPWD warns that heavy rain can flood the area and require visitors to move to higher ground. Bring water, prepare for mosquitoes, poison ivy and venomous snakes, and confirm special-hunt closures before arrival.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=35",
  }),
];
