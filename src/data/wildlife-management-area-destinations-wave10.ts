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
 * Tenth statewide Texas Wildlife Management Area authority wave.
 *
 * This wave closes the remaining current-name gaps found by reconciling the
 * checked-in WMA catalog against TPWD's statewide directory on 2026-09-02.
 * Access language intentionally distinguishes open public land from limited,
 * escorted and conservation-only properties. Shared placeholder photography
 * keeps every record behind the existing destination-readiness/indexing gate
 * until destination-specific licensed imagery is attached.
 */
export const wildlifeManagementAreaWave10Destinations: Destination[] = [
  wma({
    slug: "mcgillivray-leona-mckie-muse-wildlife-management-area",
    name: "McGillivray and Leona McKie Muse Wildlife Management Area",
    summary: "McGillivray and Leona McKie Muse WMA protects nearly 1,973 acres of northeastern Brown County grassland, shrubland and limestone-ridgetop habitat used for Cross Timbers wildlife research, management demonstrations and controlled public hunts.",
    region: "panhandle-plains",
    nearestTown: "May",
    county: "Brown County",
    coordinates: { lat: 31.891006, lng: -98.83599 },
    address: "13549 CR 478, May, TX 76857",
    bestSeason: "Access is governed by scheduled workshops, field days, tours and public hunts rather than by a normal daily recreation season.",
    entryNote: "Limited public access only. TPWD currently opens the WMA for scheduled land-management workshops, field days, WMA tours and designated public hunts. Do not plan an unscheduled walk-in visit; confirm the current event or hunt opportunity before traveling.",
    highlights: ["1,972.5-acre Cross Timbers research landscape", "Native grassland and mixed-oak restoration", "Texas horned lizard and habitat research", "Scheduled workshops, tours and public hunts"],
    body: [
      "The Muse WMA occupies a varied Cross Timbers landscape of open grassland, shrubland and limestone ridgetops in northeastern Brown County. McGillivray and Leona McKie Muse donated the property to TPWD in 2000, and it was established as a wildlife management area in 2006.",
      "Habitat work has focused on restoring native plant communities, reducing woody encroachment and improving surface-water availability. The site has also supported research involving Texas horned lizards, mesquite restoration, white-tailed deer browse and environmental-DNA methods for semi-aquatic turtles.",
      "This is an authority page for a working research and management property, not a recommendation for casual drop-in recreation. Public access is limited to scheduled programs and authorized hunts, so current TPWD information should control every visit plan.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=110",
  }),
  wma({
    slug: "pat-murphy-wildlife-management-area",
    name: "Pat Murphy Wildlife Management Area",
    summary: "Pat Murphy WMA is an 889-acre Northern Rolling Plains unit in Lipscomb County combining mid-grass prairie, restored Conservation Reserve Program grassland and creek-bottom habitat near the Oklahoma border.",
    region: "panhandle-plains",
    nearestTown: "Lipscomb",
    county: "Lipscomb County",
    coordinates: { lat: 36.3, lng: -100.25 },
    bestSeason: "Spring and fall for moderate temperatures, prairie birds and wildlife viewing, while special-permit hunts can temporarily close the WMA.",
    entryNote: "Open year-round except for Special Permit hunts. The WMA is walk-in only, registration is required, camping is not allowed and visitors should bring drinking water. Adults must follow the current APH/LPU permit rules for their activity.",
    highlights: ["889 acres of Northern Rolling Plains habitat", "Mid-grass prairie and restored CRP", "Lesser prairie-chicken and quail country", "Walk-in hiking and wildlife viewing"],
    body: [
      "The W. A. 'Pat' Murphy Unit of Gene Howe WMA preserves a compact but diverse Panhandle landscape near the Texas-Oklahoma border. Mid-grass prairie, restored CRP fields and creek-bottom vegetation support a wildlife community that includes bobwhite and scaled quail, Rio Grande turkey, pronghorn, deer and prairie reptiles.",
      "The unit is also used for education and research, so visitors may encounter flags, traps or other study markers that should never be disturbed.",
      "Public access is intentionally low-impact. Visitors enter on foot, must register, cannot camp and should arrive self-sufficient because there are no restrooms or drinking-water facilities. Special hunts can close the WMA temporarily.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=51",
  }),
  wma({
    slug: "paul-toni-fox-burns-wildlife-management-area",
    name: "Paul and Toni Fox Burns Wildlife Management Area",
    summary: "Paul and Toni Fox Burns WMA protects 2,178 acres of rolling grassland, limestone uplands and mixed-oak habitat in northeastern Brown County, expanding TPWD's Cross Timbers research and habitat-demonstration network near the Muse WMA.",
    region: "panhandle-plains",
    nearestTown: "May",
    county: "Brown County",
    coordinates: { lat: 31.91, lng: -98.91 },
    address: "4567 CR 477, May, TX 76857",
    bestSeason: "Access is tied to scheduled management workshops, field days, tours and drawn public hunts rather than a normal daily visitor season.",
    entryNote: "Limited public access only. TPWD currently allows entry for scheduled workshops, field days, WMA tours and public hunts. There are no visitor facilities and unscheduled walk-in recreation should not be assumed.",
    highlights: ["2,178-acre Cross Timbers landscape", "Native-grass and brush-restoration work", "Black-capped vireo and turkey habitat", "Joint management with nearby Muse WMA"],
    body: [
      "The Burns WMA preserves part of the historic Colonel Burns Ranch in Brown County. TPWD acquired the property in 2023 through private donation and Pittman-Robertson wildlife-restoration funding after years of conservation work on the ranch.",
      "Mechanical brush reduction and native-grass restoration have created a strong demonstration landscape for landowners while supporting white-tailed deer, Rio Grande wild turkey, black-capped vireos, pollinators and other Cross Timbers wildlife.",
      "The property operates jointly with the nearby Muse WMA and remains a controlled-access research and management site. Travelers should only plan a visit around a current TPWD workshop, tour or authorized hunt.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=204",
  }),
  wma({
    slug: "playa-lakes-wildlife-management-area",
    name: "Playa Lakes Wildlife Management Area",
    summary: "Playa Lakes WMA is a three-unit Panhandle Plains system protecting more than 1,100 acres of playa-lake, grassland and wetland habitat at the Armstrong, Dimmitt and Taylor Lakes units in Castro and Donley counties.",
    region: "panhandle-plains",
    nearestTown: "Clarendon",
    county: "Castro and Donley counties",
    coordinates: { lat: 34.86, lng: -100.8 },
    bestSeason: "Fall through early spring for migratory waterfowl and shorebirds, with access depending heavily on which of the three units is being visited.",
    entryNote: "This is a distributed three-unit WMA, not one continuous property. Armstrong is currently restricted to wildlife viewing from surrounding public roads; Dimmitt is closed to ordinary public access except with TPWD escort or authorized activities; Taylor Lakes is open year-round except Special Permit hunts and offers registered public wildlife viewing, including an accessible observation blind. Select a unit and verify its current rules before traveling.",
    highlights: ["Armstrong, Dimmitt and Taylor Lakes units", "Playa-lake waterfowl habitat", "Roadside and observation-blind birding", "Castro and Donley County prairie wetlands"],
    body: [
      "Playa Lakes WMA protects three separate Panhandle Plains sites whose shallow seasonal wetlands are important to migratory waterfowl and shorebirds. The units share an ecological purpose but do not share a single entrance or access policy.",
      "Armstrong is primarily a road-viewing conservation site, while Dimmitt is much more restricted and ordinarily requires TPWD authorization or escort. Taylor Lakes near Clarendon is the most visitor-oriented unit, with restored grassland, pasture, wetlands and an observation blind that can provide excellent winter waterfowl viewing.",
      "TexasDefined treats the three units as one canonical WMA authority page so travelers can understand the system without mistaking the units for interchangeable attractions. Current TPWD unit pages and hunt notices remain the final source for access on a specific date.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/maps/?action=getMap&region=1",
  }),
  wma({
    slug: "roger-r-fawcett-wildlife-management-area",
    name: "Roger R. Fawcett Wildlife Management Area",
    summary: "Roger R. Fawcett WMA protects nearly 5,459 acres of Palo Pinto County Cross Timbers, where old-growth post oak and blackjack oak woodlands, grassland savannas, sandstone outcrops and ponds support wildlife research and controlled public use.",
    region: "panhandle-plains",
    nearestTown: "Gordon",
    county: "Palo Pinto County",
    coordinates: { lat: 32.58, lng: -98.29 },
    address: "4730 FM 2692, Gordon, TX 76453",
    bestSeason: "Access is controlled through scheduled workshops, field days, tours and public hunts; spring and fall offer the most moderate conditions when an authorized opportunity is available.",
    entryNote: "Limited public access only. Entry is offered during scheduled workshops, field days, WMA tours and public hunts. Four-wheel drive can be advisable during wet conditions, and visitors should not assume ordinary daily walk-in access.",
    highlights: ["5,458.7-acre Cross Timbers preserve", "Old-growth post oak and blackjack oak", "Grassland savanna and sandstone terrain", "Research, demonstrations and controlled hunting"],
    body: [
      "Roger R. Fawcett WMA preserves a large, topographically varied Cross Timbers landscape south of the Palo Pinto Mountains. More than 350 feet of elevation change separates sandstone ridges, oak woodland, savanna and lower drainage areas.",
      "TPWD acquired the property in 2015 with Pittman-Robertson funds for habitat management, research and compatible public use. Ponds and small lakes add waterfowl habitat to a property otherwise strongly defined by woodland and grassland wildlife.",
      "Public access is scheduled rather than continuous. Visitors should confirm a current workshop, tour or hunting opportunity before making the trip and should expect rough road conditions after rain.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=203",
  }),
  wma({
    slug: "sierra-diablo-wildlife-management-area",
    name: "Sierra Diablo Wildlife Management Area",
    summary: "Sierra Diablo WMA protects 11,624 acres of rugged desert mountains along the Hudspeth-Culberson county line and is a foundational Texas sanctuary for desert bighorn sheep conservation and restoration.",
    region: "big-bend",
    nearestTown: "Van Horn",
    county: "Hudspeth and Culberson counties",
    coordinates: { lat: 31.2, lng: -105.1 },
    bestSeason: "There is no ordinary public recreation season; access is restricted because of sensitive desert bighorn sheep habitat and must be arranged with TPWD.",
    entryNote: "RESTRICTED ACCESS. Sierra Diablo WMA is not a conventional walk-in wildlife destination. TPWD restricts entry because of sensitive desert bighorn sheep habitat and directs prospective visitors to call for details. There are no restrooms or drinking water, and a high-clearance 4x4 is recommended when authorized access is granted.",
    highlights: ["Desert bighorn sheep sanctuary", "11,624 acres of Sierra Diablo mountains", "Rugged canyons and high desert terrain", "Restricted conservation and research access"],
    body: [
      "Sierra Diablo WMA was acquired in 1945 to protect the last remaining desert bighorn sheep in Texas and became a cornerstone of the state's bighorn restoration program. The property now supports the state's largest free-ranging population according to TPWD.",
      "The landscape is exceptionally rugged, with steep canyons, high mountain terrain and sharp drops toward the surrounding desert. Desert mule deer and other Trans-Pecos wildlife also use the area, but bighorn conservation remains the defining management purpose.",
      "This page exists to document an important Texas conservation landscape, not to encourage casual visitation. Access is restricted and must be coordinated with TPWD; travelers should not navigate to the WMA expecting an open gate, trailhead or visitor facility.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=21",
  }),
  wma({
    slug: "teacup-mountain-wildlife-management-area",
    name: "Teacup Mountain Wildlife Management Area",
    summary: "Teacup Mountain WMA spans 11,091 acres along the Foard-Hardeman county line, protecting rough Rolling Plains breaks, intermittent creeks, mesquite-juniper uplands and Pease River floodplain under a TPWD-U.S. Army Corps of Engineers conservation agreement.",
    region: "panhandle-plains",
    nearestTown: "Crowell",
    county: "Foard and Hardeman counties",
    coordinates: { lat: 34.06, lng: -99.78 },
    bestSeason: "Fall through spring for cooler hiking, birding and camping; the WMA closes during Special Permit hunts and summer heat can be severe.",
    entryNote: "Open year-round except for Special Permit hunts. Access is walk-in, visitors must register through TPWD's current on-site registration process, and adults need the applicable APH or LPU permit. The terrain is remote and rugged with no drinking water, so plan for heat, weather and limited communications.",
    highlights: ["11,091-acre Rolling Plains landscape", "Pease River floodplain", "Hiking, camping, fishing and birding", "Joint TPWD-U.S. Army Corps conservation management"],
    body: [
      "Teacup Mountain WMA protects a large public landscape where rough break escarpments descend toward intermittent creeks and the Pease River floodplain. Mesquite and juniper uplands contrast with lower riparian habitat across the Foard-Hardeman county line.",
      "The WMA offers one of the broader recreation mixes in the current TPWD system: hunting, fishing, hiking, bird watching, bicycling, camping, nature study and photography are all part of the public-use program when the area is open.",
      "Its openness should not be confused with developed-park conditions. Access is on foot, registration and permits apply, Special Permit hunts can close the property, and visitors need to carry their own water while planning for rugged terrain, changing weather and weak communications.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=205",
    managingAuthority: "U.S. Army Corps of Engineers and Texas Parks and Wildlife Department",
  }),
];
