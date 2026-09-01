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
 * Second statewide Texas Wildlife Management Area authority wave.
 *
 * This wave completes the remaining Prairies & Lakes WMAs in TPWD's current
 * regional inventory after Gus Engeling and Keechi Creek were added in Wave 1.
 * Records remain staged behind the normal destination-photo readiness gate until
 * subject-specific licensed imagery is attached.
 */
export const wildlifeManagementAreaWave2Destinations: Destination[] = [
  wma({
    slug: "big-lake-bottom-wildlife-management-area",
    name: "Big Lake Bottom Wildlife Management Area",
    summary: "Big Lake Bottom WMA protects about 4,253 acres of Trinity River floodplain and increasingly rare bottomland hardwood habitat southwest of Palestine in Anderson County.",
    region: "prairies-lakes",
    nearestTown: "Palestine",
    county: "Anderson County",
    coordinates: { lat: 31.63, lng: -95.75 },
    bestSeason: "Fall through spring for cooler hiking, birding and wildlife viewing, while recognizing that Trinity River flooding can make the area inaccessible at any season.",
    entryNote: "Open year-round except during drawn hunts. Daily on-site registration is required, there are no public roads inside the WMA, and adult non-hunting visitors generally need an Annual Public Hunting or Limited Public Use permit. Check flood conditions before traveling.",
    highlights: ["Trinity River floodplain", "Bottomland hardwood forest", "Birding and wildlife viewing", "Primitive foot-access recreation"],
    body: [
      "Big Lake Bottom preserves a relict tract of bottomland hardwood forest in the Post Oak Savannah, a habitat type diminished across Texas by wetland loss and river modification.",
      "Most of the WMA lies within the Trinity River floodplain, and shallow floodwater or saturated black-clay soils can close practical access for extended periods. That hydrology is also central to the habitat's ecological value.",
      "The area is deliberately primitive: visitors enter at designated points, travel on foot and should bring water, navigation, insect protection and current TPWD access information."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=1",
  }),
  wma({
    slug: "caddo-national-grasslands-wildlife-management-area",
    name: "Caddo National Grasslands Wildlife Management Area",
    summary: "Caddo National Grasslands WMA covers more than 16,000 acres in Fannin County across the Bois d'Arc Creek and Ladonia units, combining federal grasslands with TPWD-managed public hunting and wildlife recreation.",
    region: "prairies-lakes",
    nearestTown: "Honey Grove",
    county: "Fannin County",
    coordinates: { lat: 33.72, lng: -95.91 },
    bestSeason: "Fall through spring for comfortable hiking, camping and wildlife viewing; hunting seasons require extra attention to current unit rules and safety requirements.",
    entryNote: "Open year-round. The land is administered by the U.S. Forest Service under a cooperative wildlife-management agreement with TPWD. Hunters need current public-hunting permits and on-site registration; non-hunting access follows federal grassland rules.",
    highlights: ["Bois d'Arc Creek Unit", "Ladonia Unit", "Hiking, camping and equestrian access", "Public hunting and fishing"],
    body: [
      "Caddo National Grasslands WMA is unusual in the Texas system because the underlying land is federal National Grassland property while wildlife-management and public-hunting programs are coordinated with TPWD.",
      "The WMA is divided between the larger Bois d'Arc Creek Unit near Honey Grove and the fragmented Ladonia Unit, so route planning should begin with a specific tract or recreation objective rather than a single central entrance.",
      "Its mix of grassland, woods, ponds and streams supports hunting, fishing, camping, hiking, bicycling, horseback riding and wildlife viewing within current Forest Service and TPWD rules."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=4",
    managingAuthority: "U.S. Forest Service and Texas Parks and Wildlife Department",
  }),
  wma({
    slug: "cedar-creek-islands-wildlife-management-area",
    name: "Cedar Creek Islands Wildlife Management Area",
    summary: "Cedar Creek Islands WMA protects three small islands totaling about 160 acres in Cedar Creek Reservoir that function as important seasonal rookeries for egrets, herons, cormorants and other colonial waterbirds.",
    region: "prairies-lakes",
    nearestTown: "Seven Points",
    county: "Henderson County",
    coordinates: { lat: 32.29, lng: -96.17 },
    bestSeason: "Fall and winter for reservoir wildlife viewing without disturbing spring and summer nesting colonies.",
    entryNote: "Open year-round, but the public is not permitted to land on the islands. Wildlife viewing is from boats or reservoir banks only, and the rookery islands should not be disturbed during spring or summer nesting season.",
    highlights: ["Colonial waterbird rookeries", "Egrets, herons and cormorants", "Three protected reservoir islands", "Boat-based wildlife viewing"],
    body: [
      "Cedar Creek Islands WMA is a conservation site rather than a walk-on recreation destination. Big Island, Bird Island and the third protected island provide nesting habitat in the middle of a heavily used North Texas reservoir.",
      "The islands are especially valuable during the breeding season, when colonial waterbirds gather in large numbers. TPWD therefore keeps visitors off the land itself and directs observation to boats or shore-based viewpoints.",
      "A good visit treats distance as part of the experience: use optics, avoid approaching active rookeries and combine the stop with other Cedar Creek Reservoir recreation rather than attempting to enter the WMA islands."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=5",
  }),
  wma({
    slug: "cooper-wildlife-management-area",
    name: "Cooper Wildlife Management Area",
    summary: "Cooper WMA spans about 14,480 acres in Delta and Hopkins counties beside Jim Chapman Lake, with public hunting, fishing, hiking, biking and wildlife viewing on U.S. Army Corps of Engineers land managed cooperatively with TPWD.",
    region: "prairies-lakes",
    nearestTown: "Sulphur Springs",
    county: "Delta and Hopkins counties",
    coordinates: { lat: 33.32, lng: -95.61 },
    address: "829 CR 4795, Sulphur Springs, TX 75482",
    bestSeason: "Fall through spring for mild temperatures, migration and open-country wildlife viewing; heavy rain can flood roads and low areas.",
    entryNote: "Open year-round. Non-hunting visitors can use the WMA for fishing, hiking, biking and wildlife viewing, while hunters must follow current TPWD public-hunting requirements. Flooding can make some roads impassable.",
    highlights: ["Jim Chapman Lake shoreline", "14,480-acre public wildlife area", "Hiking and biking", "Waterfowl and public hunting habitat"],
    body: [
      "Cooper WMA surrounds portions of Jim Chapman Lake and provides a broad public-land buffer of fields, timber, wetlands and reservoir-edge habitat in northeast Texas.",
      "The property is managed under agreement with the U.S. Army Corps of Engineers, while TPWD administers wildlife and public-hunting programs. That shared structure makes current activity-specific rules important for visitors.",
      "Hiking, bicycling, fishing and wildlife viewing are available outside hunt-specific restrictions, but visitors should carry water and check road conditions after heavy rain."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=6",
    managingAuthority: "U.S. Army Corps of Engineers and Texas Parks and Wildlife Department",
  }),
  wma({
    slug: "mo-neasloney-wildlife-management-area",
    name: "M.O. Neasloney Wildlife Management Area",
    summary: "M.O. Neasloney WMA is a 100-acre Gonzales County wildlife education center with an interpretive nature trail, demonstration habitat projects and facilities used for school field tours and conservation education.",
    region: "prairies-lakes",
    nearestTown: "Gonzales",
    county: "Gonzales County",
    coordinates: { lat: 29.42, lng: -97.53 },
    address: "20700 SH 80 N, Gonzales, TX 78629",
    bestSeason: "Fall through spring for comfortable trail walking and outdoor education; visits should be arranged around the WMA's reservation and program schedule.",
    entryNote: "Access is reservation-oriented rather than conventional daily park admission. Contact the WMA office for current availability. Registration is required for scheduled use.",
    highlights: ["Wildlife education center", "One-mile interpretive nature trail", "Habitat-management demonstrations", "School and youth field programs"],
    body: [
      "M.O. Neasloney WMA was donated to TPWD to serve as a wildlife education center and remains focused more on teaching and demonstration than on broad open-access recreation.",
      "A roughly one-mile undeveloped nature trail passes habitat-management projects, while the classroom and picnic facilities support school groups, workshops and conservation programs.",
      "Because public use is tied to reservations and scheduled events, travelers should call ahead rather than treating Neasloney like a state park with guaranteed walk-in access."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=13",
  }),
  wma({
    slug: "pat-mayse-wildlife-management-area",
    name: "Pat Mayse Wildlife Management Area",
    summary: "Pat Mayse WMA protects 8,925 acres along the western side of Pat Mayse Reservoir northwest of Paris, mixing hardwood timber, abandoned fields, streams and reservoir habitat used for hunting, fishing, hiking and primitive camping.",
    region: "prairies-lakes",
    nearestTown: "Paris",
    county: "Lamar County",
    coordinates: { lat: 33.86, lng: -95.56 },
    bestSeason: "Fall through spring for hiking, wildlife viewing and fishing, while special-permit hunts can temporarily close the entire WMA.",
    entryNote: "Open year-round except during special-permit hunts. Non-hunting activities do not currently require the APH/LPU permit, but hiking is closed during drawn public hunts. There is no potable water or developed restroom infrastructure on the WMA.",
    highlights: ["Pat Mayse Reservoir", "Hardwood timber and old fields", "Primitive camping", "Fishing and natural-road hiking"],
    body: [
      "Pat Mayse WMA occupies a large mosaic of upland woods, bottomlands, old fields, streams and reservoir water on the western side of Pat Mayse Reservoir.",
      "The area is primarily managed as public hunting land, but fishing, hiking, horseback use, wildlife viewing and primitive camping create additional ways to experience the property outside closure periods.",
      "There are no developed hiking trails and many interior routes are old logging roads, so visitors should bring water, download current maps and verify hunt closures before arrival."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=18",
  }),
  wma({
    slug: "richland-creek-wildlife-management-area",
    name: "Richland Creek Wildlife Management Area",
    summary: "Richland Creek WMA protects about 14,500 acres of wetlands and bottomland hardwoods between Richland-Chambers Reservoir and the Trinity River in Freestone and Navarro counties.",
    region: "prairies-lakes",
    nearestTown: "Streetman",
    county: "Freestone and Navarro counties",
    coordinates: { lat: 31.98, lng: -96.12 },
    address: "1670 FM 488, Streetman, TX 75859",
    bestSeason: "Fall through spring for waterfowl, wading birds and migratory songbirds; check hunt closures and wet-road conditions before visiting.",
    entryNote: "Public-use availability varies by the Carl Frentress and Trinity units and portions can close for hunting. Check TPWD's current public-hunting search and WMA notices before entering.",
    highlights: ["Managed wetland habitat", "Trinity River bottomland hardwoods", "Waterfowl and wading birds", "Carl Frentress and Trinity units"],
    body: [
      "Richland Creek WMA was created to compensate for habitat losses associated with construction of Richland-Chambers Reservoir and now protects a major wetland-and-bottomland complex in the Trinity River basin.",
      "The north Carl Frentress Unit emphasizes managed wetlands that attract waterfowl, shorebirds and wading birds, while the south Trinity Unit is dominated by bottomland hardwood forest important to migratory songbirds and white-tailed deer.",
      "Because unit-level hunting schedules can change access, wildlife viewers and hikers should confirm current closure dates rather than assuming every part of the WMA is open simultaneously."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=23",
  }),
  wma({
    slug: "tawakoni-wildlife-management-area",
    name: "Tawakoni Wildlife Management Area",
    summary: "Tawakoni WMA consists of three units totaling about 2,335 acres around Lake Tawakoni east of Dallas, preserving prairie, drainage and reservoir-edge habitat for wildlife and public recreation.",
    region: "prairies-lakes",
    nearestTown: "Quinlan",
    county: "Hunt and Van Zandt counties",
    coordinates: { lat: 32.88, lng: -95.98 },
    bestSeason: "Fall through spring for waterfowl, woodland birds and comfortable hiking or fishing around Lake Tawakoni.",
    entryNote: "Open year-round, with activity-specific hunting and permit rules. The Pawnee Inlet, Caddo Creek and Duck Cove units have separate access points, so choose a unit before traveling. Bring drinking water; restroom facilities are not available on the WMA.",
    highlights: ["Lake Tawakoni shoreline habitat", "Pawnee Inlet Unit", "Caddo Creek Unit", "Duck Cove Unit"],
    body: [
      "Tawakoni WMA is distributed across three separate units around Lake Tawakoni rather than concentrated behind one entrance. Together they protect prairie, creek drainage and reservoir-edge habitat east of the Dallas-Fort Worth metroplex.",
      "The units support white-tailed deer, waterfowl, dove, squirrels, rabbits, furbearers and a broad bird community, while fishing, hiking, camping and regulated hunting connect the WMA to the larger lake recreation landscape.",
      "Trip planning should begin with the intended unit because each has different road access. Current TPWD maps and hunting information are the safest guide for entry points and seasonal restrictions."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=24",
  }),
];
