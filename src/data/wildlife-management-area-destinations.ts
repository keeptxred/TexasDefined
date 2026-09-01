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
    id: `wildlife-management-area-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wmaPlaceholder(input.name),
    managingAuthority: "Texas Parks and Wildlife Department",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * First source-checked Texas Wildlife Management Area authority batch.
 *
 * These records intentionally retain the destination-photo placeholder until a
 * subject-specific licensed image is attached. The normal destination audit
 * therefore keeps them out of indexable destination/sitemap surfaces while
 * current TPWD names, access restrictions and visitor context are preserved.
 */
export const wildlifeManagementAreaDestinations: Destination[] = [
  wma({
    slug: "alazan-bayou-wildlife-management-area",
    name: "Alazan Bayou Wildlife Management Area",
    summary: "Alazan Bayou Wildlife Management Area protects 2,063 acres of bottomland hardwood forest, old fields and wetland habitat along the Angelina River south of Nacogdoches, with wildlife viewing, primitive camping, fishing and regulated public hunting.",
    region: "piney-woods",
    nearestTown: "Nacogdoches",
    county: "Nacogdoches County",
    coordinates: { lat: 31.482959, lng: -94.751877 },
    address: "8096 FM 2782, Nacogdoches, TX 75964",
    bestSeason: "Fall through spring for cooler hiking, wintering waterfowl and birding; expect heat, humidity, mosquitoes and seasonal flooding in warmer months.",
    entryNote: "The area is open year-round, but registration is required and visitors 17 and older need an Annual Public Hunting or Limited Public Use permit. Check TPWD for hunt dates and current access before visiting.",
    highlights: ["Angelina River bottomland hardwoods", "Marsh wildlife-viewing deck", "Birding and wildlife watching", "Primitive camping and fishing"],
    body: [
      "Alazan Bayou preserves a mature East Texas bottomland landscape beside the Angelina River, Loco Bayou and Moral Creek. TPWD acquired the property in 1991 to conserve hardwood habitat that floods seasonally and supports waterfowl, white-tailed deer, turkey, rabbits, squirrels, feral hogs and a broad range of birds.",
      "A wildlife-viewing deck overlooks marsh habitat at the end of the west-side road, while fishing is allowed in the bayou, river and creek. The area also supports primitive camping and other low-development public uses, making it a more rustic destination than a conventional state park.",
      "Visitors should plan around the WMA permit and registration rules rather than treating the property as unrestricted parkland. TPWD notes that there are no restroom facilities, drinking water should be carried in, and summer heat, insects and winter-to-spring flooding can materially change conditions."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=26",
  }),
  wma({
    slug: "big-lake-bottom-wildlife-management-area",
    name: "Big Lake Bottom Wildlife Management Area",
    summary: "Big Lake Bottom Wildlife Management Area protects about 4,253 acres of Trinity River floodplain and bottomland hardwood forest southwest of Palestine, with foot-access birding, wildlife viewing, fishing, primitive camping and regulated hunts.",
    region: "prairies-lakes",
    nearestTown: "Palestine",
    county: "Anderson County",
    coordinates: { lat: 31.7047, lng: -95.8389 },
    address: "Entrance at the end of County Road 2901, Anderson County, TX",
    bestSeason: "Fall through spring for cooler conditions and wildlife activity, but floodwater and saturated soils can make the area inaccessible at any season.",
    entryNote: "Registration is required. The primitive WMA has no roads, few trails, no potable water or restrooms, and can close for drawn hunts or become inaccessible during Trinity River flooding. Visitors 17 and older need the appropriate APH or LPU permit.",
    highlights: ["Trinity River floodplain", "Bottomland hardwood forest", "Birding and wildlife viewing", "Primitive foot-access recreation"],
    body: [
      "Big Lake Bottom protects a remnant of Post Oak Savannah bottomland hardwood habitat along the Trinity River. The low, alluvial landscape is intentionally wet: TPWD notes that shallow floodwater can cover portions of the WMA for weeks and that high water or saturated soils sometimes make the property inaccessible for extended periods.",
      "The WMA is deliberately primitive. There are no roads and few trails, so birding, wildlife viewing and hiking are foot-access experiences rather than developed-park outings. Wildlife can include deer, squirrels, raccoons, beavers, wood ducks, pileated woodpeckers, turkeys and other floodplain species.",
      "Trip planning should begin with TPWD's current rules and water conditions. Access from the Trinity River is prohibited, users must enter at designated points and register, and adults need the appropriate public-use permit depending on whether they are hunting or participating in non-consumptive recreation."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=1",
  }),
  wma({
    slug: "black-gap-wildlife-management-area",
    name: "Black Gap Wildlife Management Area",
    summary: "Black Gap Wildlife Management Area protects roughly 103,000 acres of Chihuahuan Desert, canyon and Rio Grande habitat beside Big Bend National Park, supporting desert bighorn sheep, black bears, mule deer, javelina, raptors and remote backcountry recreation.",
    region: "big-bend",
    nearestTown: "Marathon",
    county: "Brewster County",
    coordinates: { lat: 29.56353, lng: -102.89794 },
    address: "55 miles south of Marathon, then about 18 miles on FM 2627, Brewster County, TX",
    bestSeason: "Fall through early spring for milder desert temperatures; some canyon, Rio Grande and headquarters access is restricted from March 1 through August 31.",
    entryNote: "Black Gap is remote and registration is required. The WMA closes for special-permit hunts, some recreation zones have seasonal restrictions, and high-clearance or four-wheel-drive preparation is appropriate for primitive roads. Verify TPWD access before departure.",
    highlights: ["103,000-acre Chihuahuan Desert landscape", "Desert bighorn and black bear habitat", "Rio Grande and canyon country", "Remote hiking, biking and wildlife viewing"],
    body: [
      "Black Gap is one of the largest and most remote wildlife management areas in Texas, stretching from desert flats and rugged mountains to roughly 25 miles of Rio Grande frontage. It borders Big Bend National Park and functions first as a wildlife-management, research and demonstration landscape rather than as a conventional recreation park.",
      "Wildlife viewing can include mule deer, javelina, desert bighorn sheep, black bears, ringtails, coyotes, quail, falcons, golden eagles and seasonal songbirds. Maravillas and Brushy canyons are notable birding landscapes, while primitive roads also support carefully planned biking, driving and equestrian use where open.",
      "Remoteness and seasonal restrictions are central to planning. TPWD requires registration, closes the area for special-permit hunts and restricts access to Maravillas and Horse canyons, the Rio Grande and the headquarters campsite from March 1 through August 31. Visitors should carry water, fuel and emergency supplies appropriate for Big Bend backcountry travel."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=2",
  }),
  wma({
    slug: "caddo-lake-wildlife-management-area",
    name: "Caddo Lake Wildlife Management Area",
    summary: "Caddo Lake Wildlife Management Area protects more than 8,000 acres of bald-cypress swamp, bottomland hardwoods and upland forest around the Caddo Lake wetland complex, with birding, paddling, hiking, fishing and primitive camping.",
    region: "piney-woods",
    nearestTown: "Jefferson",
    county: "Marion and Harrison counties",
    coordinates: { lat: 32.736254, lng: -94.125741 },
    address: "4752 FM 805, Jefferson, TX 75657",
    bestSeason: "Fall through spring for comfortable paddling, hiking and birding; warm months bring high heat, humidity and insects.",
    entryNote: "The WMA is open year-round except during annual drawn hunts. Land-based non-consumptive use requires an LPU permit for adults 17 and older, hunting requires the applicable APH permit, and land visitors may face hunter-orange requirements during hunting seasons.",
    highlights: ["Bald-cypress swamp", "Ramsar wetland landscape", "Canoeing and kayaking", "Birding, hiking and primitive camping"],
    body: [
      "Caddo Lake WMA protects a broad wetland-and-forest mosaic in Marion and Harrison counties. Permanently flooded bald-cypress swamp transitions into seasonally flooded bottomland hardwoods and mixed pine-hardwood uplands, creating habitat for waterfowl, woodland birds, mammals, reptiles and amphibians.",
      "Public use extends beyond hunting. TPWD identifies wildlife viewing, birding, hiking, canoeing, kayaking, fishing, nature photography and primitive camping among the area's opportunities, with information stations and access points around the south and west sides of the WMA.",
      "The permit rules matter because this is managed public wildlife land, not unrestricted lakefront parkland. Adults entering land for non-consumptive recreation generally need a Limited Public Use permit, the area closes for annual drawn hunts and visitors should check current hunting-season safety requirements before walking the property."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=104",
  }),
  wma({
    slug: "chaparral-wildlife-management-area",
    name: "Chaparral Wildlife Management Area",
    summary: "Chaparral Wildlife Management Area protects 15,200 acres of South Texas brush country in La Salle and Dimmit counties and serves as a major TPWD research, demonstration, wildlife-management and public-use site.",
    region: "south-texas",
    nearestTown: "Cotulla",
    county: "La Salle and Dimmit counties",
    coordinates: { lat: 28.324716, lng: -99.406704 },
    address: "64 Chaparral WMA Dr, Cotulla, TX 78014",
    bestSeason: "April 1 through August 31 is the dependable general-public-use window; cooler spring mornings are especially useful for wildlife viewing and nature trails.",
    entryNote: "General non-consumptive public use is normally available April 1 through August 31 and is restricted during scheduled hunt periods. Visitors 17 and older generally need APH or LPU permits, except for the driving tour and nature trails. Registration is required.",
    highlights: ["South Texas brush-country ecology", "Wildlife research and demonstrations", "Arena Rojo accessible nature trail", "White-tailed deer, javelina and quail habitat"],
    body: [
      "Chaparral is one of TPWD's signature South Texas wildlife research landscapes. Purchased in 1969, the WMA represents Rio Grande Plains brush country and has supported long-running work on white-tailed deer, javelina, bobwhite quail, Texas tortoises, Texas horned lizards, feral hogs and habitat-management practices.",
      "Public access is structured around the WMA's research and hunting calendar. Nature tours, educational programs and a half-mile wheelchair-accessible trail near headquarters provide non-hunting ways to experience the brush country, while the larger property remains a working wildlife-management area.",
      "The strongest general-use planning window is April through August, because special public hunts are commonly scheduled from September through March. Visitors should still confirm current dates with TPWD and understand which activities require an Annual Public Hunting or Limited Public Use permit."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=45",
  }),
  wma({
    slug: "elephant-mountain-wildlife-management-area",
    name: "Elephant Mountain Wildlife Management Area",
    summary: "Elephant Mountain Wildlife Management Area protects 23,147 acres south of Alpine for desert bighorn conservation, wildlife research and compatible public use across Chihuahuan Desert scrub, grassland, riparian and mountain habitats.",
    region: "big-bend",
    nearestTown: "Alpine",
    county: "Brewster County",
    coordinates: { lat: 30.02039, lng: -103.50736 },
    address: "Along SH 118 about 26 miles south of Alpine, Brewster County, TX",
    bestSeason: "May 1 through August 30 for the annual driving-tour window; fall through spring generally offers cooler desert conditions for permitted activities outside hunt closures.",
    entryNote: "Registration is required and the entire WMA closes for special hunts. Adults generally need APH or LPU permits except for the driving tour. The slopes and summit of Elephant Mountain are closed to protect the desert bighorn herd, and high-clearance or four-wheel-drive vehicles are recommended on primitive roads.",
    highlights: ["Desert bighorn conservation", "23,147-acre Trans-Pecos landscape", "Seasonal wildlife driving tour", "Desert grassland and mountain habitat"],
    body: [
      "Elephant Mountain was acquired in 1985 specifically to advance desert bighorn and large-game conservation, wildlife research and compatible public recreation. The 6,225-foot mountain rises nearly 2,000 feet above the surrounding tableland and anchors a mix of desert scrub, grassland, riparian zones, juniper-pinyon-oak woodland and canyon habitat.",
      "Desert bighorn are the defining conservation story, but TPWD also identifies mule deer, pronghorn, coyotes, scaled quail, rattlesnakes, lizards and other Trans-Pecos wildlife. A seasonal driving tour provides one of the clearest public-access opportunities without opening sensitive mountain slopes to disturbance.",
      "The property should not be approached like an unrestricted hiking mountain. The slopes and top of Elephant Mountain are closed for bighorn protection, public-use zones vary, roads are primitive and the entire WMA can close for special hunts. Check the current TPWD page before making the long drive south from Alpine."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=7",
  }),
];
