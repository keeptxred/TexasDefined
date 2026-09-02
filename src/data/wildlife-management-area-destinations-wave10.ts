import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-02";

function wmaPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function wma(
  input: Omit<
    Destination,
    "id" | "brandId" | "category" | "hero" | "sourceCheckedAt" | "managingAuthority"
  > & { managingAuthority?: string },
): Destination {
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
 * Tenth statewide Texas Wildlife Management Area authority wave.
 *
 * Reconciled against TPWD's current statewide WMA directory on 2026-09-02.
 * The three Playa Lakes units remain separate because TPWD lists them as
 * separate current entities with materially different public-access rules.
 * Placeholder imagery intentionally keeps every record behind the existing
 * destination-readiness/indexing gate until licensed subject-specific imagery
 * is attached.
 */
export const wildlifeManagementAreaWave10Destinations: Destination[] = [
  wma({
    slug: "mcgillivray-leona-mckie-muse-wildlife-management-area",
    name: "McGillivray and Leona McKie Muse Wildlife Management Area",
    summary:
      "McGillivray and Leona McKie Muse WMA protects 1,972.5 acres of northeastern Brown County grassland, shrubland and limestone-ridgetop habitat used for Cross Timbers wildlife research, management demonstrations and controlled public hunts.",
    region: "panhandle-plains",
    nearestTown: "May",
    county: "Brown County",
    coordinates: { lat: 31.891006, lng: -98.83599 },
    address: "13549 CR 478, May, TX 76857",
    bestSeason:
      "Access is governed by scheduled workshops, field days, tours and public hunts rather than by a normal daily recreation season.",
    entryNote:
      "Limited public access only. TPWD currently opens the WMA for scheduled land-management workshops, field days, WMA tours and designated public hunts. Do not plan an unscheduled walk-in visit; confirm a current event or hunt opportunity before traveling.",
    highlights: [
      "1,972.5-acre Cross Timbers research landscape",
      "Grassland, shrubland and limestone ridges",
      "Wildlife research and habitat demonstrations",
      "Scheduled workshops, tours and public hunts",
    ],
    body: [
      "The Muse WMA occupies a varied Cross Timbers landscape of open grassland, shrubland and limestone ridgetops in northeastern Brown County. McGillivray and Leona McKie Muse donated the property to TPWD in 2000, and it was later established as a wildlife management area.",
      "TPWD uses the property to demonstrate habitat-development and wildlife-management practices, conduct applied research and manage indigenous and migratory wildlife populations. The mix of upland grass, mixed-oak communities and lower drainages gives the property strong research and demonstration value.",
      "This is a working research and management property rather than a casual drop-in park. Public access is limited to scheduled programs and authorized hunts, so current TPWD information should control every visit plan.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=110",
  }),
  wma({
    slug: "pat-murphy-wildlife-management-area",
    name: "Pat Murphy Wildlife Management Area",
    summary:
      "Pat Murphy WMA is an 889-acre Northern Rolling Plains unit in Lipscomb County combining mid-grass prairie, restored Conservation Reserve Program grassland and creek-bottom habitat near the Oklahoma border.",
    region: "panhandle-plains",
    nearestTown: "Lipscomb",
    county: "Lipscomb County",
    coordinates: { lat: 35.9128, lng: -100.2882 },
    bestSeason:
      "Spring and fall for moderate temperatures, prairie birds and wildlife viewing, while Special Permit hunts can temporarily close the WMA.",
    entryNote:
      "Open year-round except for Special Permit hunts. The WMA is walk-in only, registration is required, camping is not allowed and visitors should bring drinking water. Adults must follow current TPWD APH/LPU permit rules for their activity.",
    highlights: [
      "889 acres of Northern Rolling Plains habitat",
      "Mid-grass prairie and restored CRP",
      "Quail, turkey, pronghorn and prairie wildlife",
      "Walk-in hiking and wildlife viewing",
    ],
    body: [
      "The W. A. 'Pat' Murphy Unit of Gene Howe WMA preserves a compact but diverse Panhandle landscape near the Texas-Oklahoma border. Mid-grass prairie, restored CRP fields and creek-bottom vegetation support a broad Rolling Plains wildlife community.",
      "The unit is also used for education and research, so visitors may encounter flags, traps or other study markers that should never be disturbed. Wildlife can include bobwhite and scaled quail, Rio Grande turkey, pronghorn, deer and prairie reptiles.",
      "Public access is intentionally low-impact. Visitors enter on foot, must register, cannot camp and should arrive self-sufficient because there are no restrooms or drinking-water facilities. Special hunts can close the WMA temporarily.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=51",
  }),
  wma({
    slug: "paul-toni-fox-burns-wildlife-management-area",
    name: "Paul and Toni Fox Burns Wildlife Management Area",
    summary:
      "Paul and Toni Fox Burns WMA protects 2,178 acres of rolling grassland, limestone uplands and mixed-oak habitat in northeastern Brown County, expanding TPWD's Cross Timbers research and habitat-demonstration network near the Muse WMA.",
    region: "panhandle-plains",
    nearestTown: "May",
    county: "Brown County",
    coordinates: { lat: 31.91, lng: -98.91 },
    address: "4567 CR 477, May, TX 76857",
    bestSeason:
      "Access is tied to scheduled management workshops, field days, tours and drawn public hunts rather than a normal daily visitor season.",
    entryNote:
      "Limited public access only. TPWD currently allows entry for scheduled workshops, field days, WMA tours and public hunts. There are no visitor facilities and unscheduled walk-in recreation should not be assumed.",
    highlights: [
      "2,178-acre Cross Timbers landscape",
      "Native-grass and brush-restoration work",
      "Mixed-oak wildlife habitat",
      "Joint management with nearby Muse WMA",
    ],
    body: [
      "The Burns WMA preserves part of the historic Colonel Burns Ranch in Brown County. TPWD acquired the property in 2023 through private donation and Pittman-Robertson wildlife-restoration funding after years of conservation work on the ranch.",
      "Mechanical brush reduction and native-grass restoration created a useful demonstration landscape for landowners while supporting white-tailed deer, Rio Grande wild turkey, black-capped vireos, pollinators and other Cross Timbers wildlife.",
      "The property operates jointly with the nearby Muse WMA and remains a controlled-access research and management site. Travelers should only plan a visit around a current TPWD workshop, tour or authorized hunt.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=204",
  }),
  wma({
    slug: "playa-lakes-armstrong-unit-wildlife-management-area",
    name: "Playa Lakes WMA Armstrong Unit",
    summary:
      "The 160-acre Playa Lakes WMA Armstrong Unit in Castro County protects a playa lake, surrounding grassland and reseeded farmland used by migratory waterfowl and shorebirds.",
    region: "panhandle-plains",
    nearestTown: "Dimmitt",
    county: "Castro County",
    coordinates: { lat: 34.52, lng: -102.5 },
    bestSeason:
      "Fall through spring for migratory waterfowl and shorebirds viewed from surrounding public roads.",
    entryNote:
      "ROAD-VIEWING ONLY. TPWD does not allow visitors onto the Armstrong Unit. The property is open to observation from surrounding public county roads year-round; bring binoculars and do not cross onto WMA land.",
    highlights: [
      "160-acre Castro County playa",
      "Roadside wildlife viewing only",
      "Migratory waterfowl and shorebirds",
      "Grassland and reseeded farmland habitat",
    ],
    body: [
      "The Armstrong Unit is one of TPWD's Playa Lakes WMA properties in the Texas Panhandle. A playa basin surrounded by grassland and restored farmland provides seasonal water and feeding habitat in an otherwise intensively farmed landscape.",
      "Waterfowl, shorebirds, geese and sandhill cranes can use the site during migration and winter when water conditions are favorable. Because playa wetlands naturally fluctuate, bird abundance can vary substantially with recent rainfall.",
      "This is not a walk-in destination. TPWD explicitly limits public use to viewing the property from surrounding county roads, so visitors should remain on public rights-of-way and never enter the unit itself.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=53",
  }),
  wma({
    slug: "playa-lakes-dimmitt-unit-wildlife-management-area",
    name: "Playa Lakes WMA Dimmitt Unit",
    summary:
      "The 422-acre Playa Lakes WMA Dimmitt Unit in Castro County combines restored native grassland with a 77-acre playa basin managed for soil, water and wildlife conservation.",
    region: "panhandle-plains",
    nearestTown: "Dimmitt",
    county: "Castro County",
    coordinates: { lat: 34.55, lng: -102.31 },
    bestSeason:
      "There is no ordinary public recreation season because the unit is closed to general visitation and access requires TPWD authorization or escort.",
    entryNote:
      "CLOSED TO ORDINARY PUBLIC ACCESS. TPWD states that the unit is closed at all times for general access and that entry requires department escort. Selected authorized hunts may occur, but travelers should not navigate there expecting recreational access.",
    highlights: [
      "422-acre conservation tract",
      "77-acre playa basin",
      "Restored native grassland",
      "Department-escort access only",
    ],
    body: [
      "The Dimmitt Unit was acquired to demonstrate soil, water and wildlife conservation practices on a landscape dominated by former farmland. Most of the tract has been planted to native grasses around a substantial playa basin.",
      "The playa and shelterbelt add habitat diversity for Panhandle wildlife, while the restored uplands demonstrate how agricultural landscapes can be managed for conservation value.",
      "The access rule is the defining trip-planning fact: TPWD lists the unit as closed to ordinary public visitation and requires department escort for authorized access. This page documents the conservation property rather than recommending a casual visit.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=50",
  }),
  wma({
    slug: "playa-lakes-taylor-lakes-unit-wildlife-management-area",
    name: "Playa Lakes WMA Taylor Lakes Unit",
    summary:
      "The 525-acre Playa Lakes WMA Taylor Lakes Unit near Clarendon protects restored grassland, pasture and wetland habitat used by wintering waterfowl, shorebirds and other Rolling Plains wildlife.",
    region: "panhandle-plains",
    nearestTown: "Clarendon",
    county: "Donley County",
    coordinates: { lat: 34.86, lng: -100.8 },
    bestSeason:
      "Late fall through winter for waterfowl at the observation blind, with spring also productive for migrating birds.",
    entryNote:
      "Open year-round except for Special Permit hunts. On-site registration is required for public access. TPWD specifically allows use of the wildlife-viewing blind without a permit; other activities remain subject to current WMA permit and hunt rules. Bring drinking water because there are no restroom facilities.",
    highlights: [
      "525 acres near Clarendon",
      "Restored grassland, pasture and wetlands",
      "Wintering waterfowl",
      "Wheelchair-accessible wildlife-viewing blind",
    ],
    body: [
      "Taylor Lakes is the most visitor-oriented of the three current Playa Lakes WMA units. Its low-lying lakes and managed wetlands sit within restored grassland and pasture, creating a dependable wildlife-viewing destination when seasonal water is present.",
      "Wintering ducks and other waterfowl are a primary draw, and TPWD maintains an observation blind that is wheelchair accessible. Birding quality still depends on water and migration conditions, so recent rainfall can strongly influence a visit.",
      "Public access is more open than at the Armstrong and Dimmitt units but still follows WMA rules. Visitors must register, should check Special Permit hunt closures before departure and should arrive with their own drinking water.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=19",
  }),
  wma({
    slug: "roger-r-fawcett-wildlife-management-area",
    name: "Roger R. Fawcett Wildlife Management Area",
    summary:
      "Roger R. Fawcett WMA protects 5,458.7 acres of Palo Pinto County Cross Timbers, where old-growth post oak and blackjack oak woodlands, grassland savannas and sandstone outcrops support wildlife research and controlled public use.",
    region: "panhandle-plains",
    nearestTown: "Gordon",
    county: "Palo Pinto County",
    coordinates: { lat: 32.58, lng: -98.29 },
    address: "4730 FM 2692, Gordon, TX 76453",
    bestSeason:
      "Access is controlled through scheduled workshops, field days, tours and public hunts; spring and fall offer moderate conditions when an authorized opportunity is available.",
    entryNote:
      "Limited public access only. Entry is offered during scheduled workshops, field days, WMA tours and public hunts. Do not assume ordinary daily walk-in access; verify a current TPWD opportunity before traveling.",
    highlights: [
      "5,458.7-acre Cross Timbers preserve",
      "Old-growth post oak and blackjack oak",
      "Grassland savanna and sandstone terrain",
      "Research, demonstrations and controlled hunting",
    ],
    body: [
      "Roger R. Fawcett WMA preserves a large, topographically varied Cross Timbers landscape in south-central Palo Pinto County. More than 350 feet of elevation change separates sandstone ridges, oak woodland, savanna and lower drainage areas.",
      "TPWD acquired the property in 2015 with Pittman-Robertson funds for habitat management, research and compatible public use. Ponds and small lakes add water habitat to a property otherwise strongly defined by woodland and grassland wildlife.",
      "Public access is scheduled rather than continuous. Visitors should confirm a current workshop, tour or hunting opportunity before making the trip instead of assuming an open gate or conventional day-use trailhead.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=203",
  }),
  wma({
    slug: "sierra-diablo-wildlife-management-area",
    name: "Sierra Diablo Wildlife Management Area",
    summary:
      "Sierra Diablo WMA protects 11,624 acres of rugged desert mountains along the Hudspeth-Culberson county line and is a foundational Texas sanctuary for desert bighorn sheep conservation and restoration.",
    region: "big-bend",
    nearestTown: "Van Horn",
    county: "Hudspeth and Culberson counties",
    coordinates: { lat: 31.47, lng: -105.01 },
    bestSeason:
      "There is no ordinary public recreation season; access is restricted because of sensitive desert bighorn sheep habitat and must be authorized by TPWD.",
    entryNote:
      "RESTRICTED ACCESS. TPWD states that Sierra Diablo WMA is closed at all times to ordinary public visitation. Authorized drawn hunters are escorted through private ranches and locked gates. There are no restrooms or drinking water, and high-clearance 4x4 vehicles are recommended for authorized access.",
    highlights: [
      "Desert bighorn sheep sanctuary",
      "11,624 acres of Sierra Diablo mountains",
      "Rugged canyons and high-desert terrain",
      "Restricted escorted access",
    ],
    body: [
      "Sierra Diablo WMA was acquired in 1945 to protect the last remaining desert bighorn sheep in Texas and became a cornerstone of the state's bighorn restoration program. The mountain property remains managed primarily around that sensitive conservation mission.",
      "The landscape is exceptionally rugged, with steep canyons, high mountain terrain and sharp drops toward the surrounding desert. Desert mule deer and other Trans-Pecos wildlife also use the area, but bighorn conservation remains the defining management purpose.",
      "This page documents an important Texas conservation landscape rather than encouraging casual visitation. TPWD lists the WMA as closed to ordinary public access, and authorized drawn-hunt access requires departmental escort through locked private-property gates.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=21",
  }),
  wma({
    slug: "teacup-mountain-wildlife-management-area",
    name: "Teacup Mountain Wildlife Management Area",
    summary:
      "Teacup Mountain WMA spans 11,091 acres along the Foard-Hardeman county line, protecting rough Rolling Plains breaks, intermittent creeks, mesquite-juniper uplands and Pease River floodplain under a TPWD-U.S. Army Corps of Engineers conservation agreement.",
    region: "panhandle-plains",
    nearestTown: "Crowell",
    county: "Foard and Hardeman counties",
    coordinates: { lat: 34.06, lng: -99.78 },
    bestSeason:
      "Fall through spring for cooler hiking, birding and camping; the WMA closes during Special Permit hunts and summer heat can be severe.",
    entryNote:
      "Open year-round except for Special Permit hunts. Public use is walk-in, visitors must register through TPWD's eOSR system, and adults need the applicable APH or LPU permit. Camping is limited to the designated camping area, and visitors should bring drinking water.",
    highlights: [
      "11,091-acre Rolling Plains landscape",
      "Pease River floodplain",
      "Hiking, camping, fishing and birding",
      "TPWD-U.S. Army Corps conservation management",
    ],
    body: [
      "Teacup Mountain WMA protects a large public landscape where rough break escarpments descend toward intermittent creeks and the Pease River floodplain. Mesquite and juniper uplands contrast with lower riparian habitat across the Foard-Hardeman county line.",
      "The WMA offers one of the broader recreation mixes in the current TPWD system: hunting, fishing, hiking, bird watching, bicycling, camping, nature study and photography are available when the area is open.",
      "Its public access should not be confused with developed-park conditions. Registration and permits apply, Special Permit hunts can close the property, camping is limited to a designated primitive area and visitors need to carry their own drinking water.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=205",
    managingAuthority: "U.S. Army Corps of Engineers and Texas Parks and Wildlife Department",
  }),
];
