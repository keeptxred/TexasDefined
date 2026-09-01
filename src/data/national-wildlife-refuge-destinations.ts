import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function refugePlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function refuge(input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt" | "managingAuthority">): Destination {
  return {
    ...input,
    id: `national-wildlife-refuge-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: refugePlaceholder(input.name),
    managingAuthority: "U.S. Fish and Wildlife Service",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * Canonical Texas National Wildlife Refuge authority inventory.
 *
 * These records intentionally retain the destination-photo placeholder until a
 * subject-specific, licensed image is attached. The normal destination audit
 * therefore keeps them out of indexable/public Explore surfaces while the
 * researched identities, official URLs and visitor context remain preserved.
 */
export const nationalWildlifeRefugeDestinations: Destination[] = [
  refuge({
    slug: "jocelyn-nungaray-national-wildlife-refuge",
    name: "Jocelyn Nungaray National Wildlife Refuge",
    summary: "Jocelyn Nungaray National Wildlife Refuge protects coastal marsh, prairie, bayou and shoreline habitat east of Houston, with the Shoveler Pond auto loop, boardwalks, wildlife blinds, fishing access and seasonal waterfowl opportunities.",
    region: "gulf-coast",
    nearestTown: "Anahuac",
    county: "Chambers County",
    coordinates: { lat: 29.611909, lng: -94.535005 },
    address: "4318 FM 1985, Anahuac, TX 77514",
    bestSeason: "Fall through spring for migratory birds and cooler wildlife watching; summer visits are best early in the day because of heat and insects.",
    entryNote: "The refuge is managed for wildlife first and access can vary by unit, season and hunting schedule. Check the current U.S. Fish and Wildlife Service visitor page before traveling.",
    highlights: ["Shoveler Pond auto loop", "Coastal marsh birding", "Boardwalk and wildlife blinds", "Fishing and seasonal waterfowl habitat"],
    body: [
      "The refuge formerly known as Anahuac National Wildlife Refuge anchors a broad stretch of upper Texas Coast habitat where freshwater and brackish wetlands, coastal prairie and bayous support waterfowl, shorebirds, alligators and other Gulf Coast wildlife. Its current federal name is Jocelyn Nungaray National Wildlife Refuge.",
      "For first-time visitors, the Shoveler Pond auto loop is the most accessible orientation to the landscape. Short trails, a marsh boardwalk, observation platforms and wildlife blinds let travelers slow down and scan habitat without committing to a long backcountry outing, while refuge shorelines and bayous add fishing access.",
      "Conditions on the upper coast are seasonal. Mosquitoes, heat, tropical weather, water levels and managed hunting periods can change the experience quickly, so this is a destination where checking current refuge alerts matters as much as choosing a season."
    ],
    officialUrl: "https://www.fws.gov/refuge/jocelyn-nungaray",
  }),
  refuge({
    slug: "aransas-national-wildlife-refuge",
    name: "Aransas National Wildlife Refuge",
    summary: "Aransas National Wildlife Refuge protects more than 115,000 acres along the central Texas Coast and is internationally known as the wintering home of the last wild flock of endangered whooping cranes.",
    region: "gulf-coast",
    nearestTown: "Austwell",
    county: "Aransas and Refugio counties",
    coordinates: { lat: 28.314, lng: -96.804 },
    address: "1 Wildlife Circle, Austwell, TX 77950",
    bestSeason: "Late fall through early spring for whooping cranes, waterfowl and comfortable coastal wildlife watching.",
    entryNote: "The auto tour and trails are generally open from sunrise to sunset, while visitor-center hours and entrance-fee procedures vary. Confirm current refuge alerts before arrival.",
    highlights: ["Wild whooping crane wintering grounds", "16-mile auto tour", "Observation towers and trails", "San Antonio Bay coastal habitat"],
    body: [
      "Aransas is one of the defining wildlife-conservation landscapes in Texas. The refuge was established in 1937 for migratory birds and other wildlife, and it later became central to the recovery story of the whooping crane after the wild population fell to only a handful of birds in the twentieth century.",
      "Visitors can experience the refuge through a long auto-tour route, walking trails, observation towers, a fishing pier and overlooks toward San Antonio Bay. The combination makes Aransas unusually approachable for travelers who want serious birding and wildlife observation without relying entirely on boat access.",
      "Whooping cranes are seasonal, not guaranteed sightings, and some refuge units have limited or no general public access. A strong visit plan treats the Austwell visitor area as the public anchor, checks current conditions and uses optics rather than approaching wildlife."
    ],
    officialUrl: "https://www.fws.gov/refuge/aransas",
  }),
  refuge({
    slug: "attwater-prairie-chicken-national-wildlife-refuge",
    name: "Attwater Prairie Chicken National Wildlife Refuge",
    summary: "Attwater Prairie Chicken National Wildlife Refuge west of Houston protects one of the largest remnants of native southeast Texas coastal prairie and the critically endangered Attwater's prairie-chicken.",
    region: "prairies-lakes",
    nearestTown: "Eagle Lake",
    county: "Colorado County",
    coordinates: { lat: 29.668, lng: -96.271 },
    address: "1206 APC NWR Road, Eagle Lake, TX 77434",
    bestSeason: "Late February through early April offers the best chance to experience prairie-chicken lekking activity; fall through spring is comfortable for prairie walks and drives.",
    entryNote: "Public trails and the auto-tour loop are generally open sunrise to sunset, but visitor-center schedules and guided van tours are seasonal. Check current refuge information and tour reservations.",
    highlights: ["Attwater's prairie-chicken conservation", "Native coastal prairie", "Auto-tour loop", "Guided seasonal van tours"],
    body: [
      "This refuge exists around one of Texas's rarest wildlife stories. Established in 1972, it protects coastal prairie for the Attwater's prairie-chicken, a grouse whose historic range once extended across large portions of the Gulf Coast prairie but was reduced dramatically by habitat loss and fragmentation.",
      "The landscape is valuable beyond a single species. Tallgrass prairie, wetlands and managed habitat support raptors, waterfowl, grassland birds, mammals and seasonal wildflowers, giving visitors a chance to understand what southeast Texas looked like before most native prairie was converted or developed.",
      "Prairie-chickens can be difficult to see, so expectations matter. The auto loop and trails provide independent access, while refuge-led van tours and spring programming can improve the odds of seeing or hearing birds without disturbing sensitive habitat."
    ],
    officialUrl: "https://www.fws.gov/refuge/attwater-prairie-chicken",
  }),
  refuge({
    slug: "balcones-canyonlands-national-wildlife-refuge",
    name: "Balcones Canyonlands National Wildlife Refuge",
    summary: "Balcones Canyonlands National Wildlife Refuge protects rugged Hill Country habitat northwest of Austin, including nesting grounds for the endangered golden-cheeked warbler and habitat historically important to the black-capped vireo.",
    region: "hill-country",
    nearestTown: "Marble Falls",
    county: "Burnet, Travis and Williamson counties",
    coordinates: { lat: 30.59, lng: -98.04 },
    address: "24518 E FM 1431, Marble Falls, TX 78654",
    bestSeason: "Spring for nesting songbirds and wildflowers; fall through spring for cooler hiking and observation-deck visits.",
    entryNote: "Public access is concentrated at designated trailheads and observation areas rather than across the entire refuge. Check current trail, fire-weather and seasonal notices before visiting.",
    highlights: ["Golden-cheeked warbler habitat", "Hill Country hiking", "Observation decks", "Rugged limestone-and-juniper landscape"],
    body: [
      "Balcones Canyonlands protects a patchwork of steep canyons, limestone hills, oak-juniper woodland and springs on the northeastern edge of the Texas Hill Country. The refuge was created in large part to protect nesting habitat for rare songbirds while also conserving water quality and a broader native ecosystem near a rapidly growing metro area.",
      "Unlike a conventional park with one central entrance, the refuge is experienced through selected public-use areas. Hiking trails and observation decks provide windows into a much larger conservation landscape, so visitors should choose a specific access point rather than navigating toward the geographic center of the refuge.",
      "Spring birding is a major draw, but the terrain can be rocky and exposed. Heat, drought and wildfire conditions matter in Central Texas, and visitors should carry water, respect closures and remain on designated routes to protect sensitive nesting and restoration areas."
    ],
    officialUrl: "https://www.fws.gov/refuge/balcones-canyonlands",
  }),
  refuge({
    slug: "big-boggy-national-wildlife-refuge",
    name: "Big Boggy National Wildlife Refuge",
    summary: "Big Boggy National Wildlife Refuge protects coastal marsh and bay habitat near Matagorda Bay, with public use focused on wildlife-dependent recreation and seasonal waterfowl hunting in a remote Texas Mid-Coast setting.",
    region: "gulf-coast",
    nearestTown: "Wadsworth",
    county: "Matagorda County",
    coordinates: { lat: 28.81, lng: -95.75 },
    bestSeason: "Fall through early spring for waterfowl, migratory birds and cooler coastal conditions.",
    entryNote: "Big Boggy is more remote and less developed for casual sightseeing than many refuges; some areas are reached through designated roads or by boat. Verify current access and hunting-season information before travel.",
    highlights: ["Matagorda Bay coastal marsh", "Migratory waterfowl habitat", "Remote wildlife observation", "Seasonal hunting and fishing access"],
    body: [
      "Big Boggy is part of the Texas Mid-Coast refuge landscape, protecting low coastal wetlands where marsh, bayous and estuarine waters support migratory birds and resident Gulf Coast wildlife. The setting is intentionally less developed than a recreation-focused park, which is central to its conservation value.",
      "Public access should be planned around designated refuge locations and current regulations. Roads near the refuge can feel isolated, and portions of the habitat are best understood from waterways or seasonal hunting areas rather than from a single visitor-center campus.",
      "For travelers, Big Boggy works best as a specialist birding, fishing or wildlife stop paired with nearby Matagorda Bay destinations. Weather, tides, insects and waterfowl seasons can materially affect access, so current federal refuge guidance should drive the final itinerary."
    ],
    officialUrl: "https://www.fws.gov/refuge/big-boggy",
  }),
  refuge({
    slug: "brazoria-national-wildlife-refuge",
    name: "Brazoria National Wildlife Refuge",
    summary: "Brazoria National Wildlife Refuge protects freshwater and saline coastal habitats south of Houston, supporting major concentrations of wintering waterfowl, shorebirds, wading birds and hundreds of other wildlife species.",
    region: "gulf-coast",
    nearestTown: "Lake Jackson",
    county: "Brazoria County",
    coordinates: { lat: 29.09, lng: -95.32 },
    bestSeason: "Late fall through spring for waterfowl and shorebirds; early mornings are best during warmer months.",
    entryNote: "Wildlife drives, trails and recreation areas can be affected by flooding, storms, prescribed management and seasonal hunting. Check the current refuge page before departure.",
    highlights: ["Big Slough auto-tour wildlife viewing", "Coastal waterfowl and shorebirds", "Freshwater and saline wetlands", "Cannan Bend Recreation Area"],
    body: [
      "Brazoria sits where Gulf influences and freshwater drainage create a mosaic of marshes, ponds, prairies and estuarine habitat. That mix makes the refuge one of the strongest birding landscapes on the upper Texas Coast, particularly when wintering waterfowl and shorebirds concentrate in managed wetlands.",
      "The Big Slough area gives visitors a practical way to scan habitat from a vehicle and short stops, while other recreation areas broaden the experience to freshwater lakes and coastal forest. The refuge is therefore useful both to dedicated birders and families looking for a low-barrier wildlife drive.",
      "Coastal conditions can change rapidly after heavy rain or tropical weather. Visitors should check road and trail notices, carry insect protection in warm weather and remember that refuge management may temporarily prioritize habitat work or hunting programs over general recreation."
    ],
    officialUrl: "https://www.fws.gov/refuge/brazoria",
  }),
  refuge({
    slug: "buffalo-lake-national-wildlife-refuge",
    name: "Buffalo Lake National Wildlife Refuge",
    summary: "Buffalo Lake National Wildlife Refuge south of Umbarger protects more than 7,600 acres of High Plains grassland and playa-country habitat where a former reservoir is now largely dry but wildlife viewing remains the central attraction.",
    region: "panhandle",
    nearestTown: "Umbarger",
    county: "Randall County",
    coordinates: { lat: 34.9, lng: -102.11 },
    address: "3 miles south of Umbarger on FM 168, Umbarger, TX 79091",
    bestSeason: "Spring and fall for migration and moderate temperatures; winter can bring raptors and open-country birds.",
    entryNote: "The historic lake is generally dry, so plan for a grassland-and-wildlife refuge rather than a conventional lake destination. Check fire-weather, road and camping conditions before arrival.",
    highlights: ["High Plains grasslands", "Prairie dogs and grassland birds", "Auto-tour road", "Hiking, camping and picnicking"],
    body: [
      "Buffalo Lake tells an unusual Panhandle water story. A reservoir created behind Umbarger Dam in the 1930s once drew major numbers of waterfowl, but declining spring flow and groundwater pressure eventually left the lake largely dry. The federal refuge remains important habitat even though the water feature in its name no longer defines the visit.",
      "Today the experience centers on open grasslands, playa-country ecology and wildlife such as prairie dogs, burrowing owls, sparrows, raptors and seasonal migrants. An auto-tour route, hiking, camping and picnicking make the refuge more accessible than its remote High Plains setting might suggest.",
      "Visitors should arrive prepared for wind, temperature swings and limited shade. The refuge is especially valuable as an ecological contrast to Palo Duro Canyon and Amarillo-area attractions, showing the broad grassland systems that shape the Llano Estacado and southern High Plains."
    ],
    officialUrl: "https://www.fws.gov/refuge/buffalo-lake",
  }),
  refuge({
    slug: "caddo-lake-national-wildlife-refuge",
    name: "Caddo Lake National Wildlife Refuge",
    summary: "Caddo Lake National Wildlife Refuge near Karnack protects bottomland hardwood forest, wetlands and former Longhorn Army Ammunition Plant lands beside the Caddo Lake ecosystem, with trails, wildlife viewing and layered military-industrial history.",
    region: "piney-woods",
    nearestTown: "Karnack",
    county: "Harrison County",
    coordinates: { lat: 32.67, lng: -94.18 },
    address: "15600 Highway 134, Karnack, TX 75661",
    bestSeason: "Fall through spring for comfortable hiking and birding; spring adds strong songbird activity and lush wetland scenery.",
    entryNote: "The refuge includes former military-industrial property and sensitive habitat, so visitors should stay on designated roads and trails and check current closures or hunting notices.",
    highlights: ["Bottomland hardwood forest", "Caddo Lake wetlands", "Former Longhorn Army Ammunition Plant", "Hiking and horseback trails"],
    body: [
      "Caddo Lake National Wildlife Refuge occupies land with two overlapping stories: one of East Texas bottomland forests and wetlands, and another of twentieth-century military industry. The refuge was established on portions of the former Longhorn Army Ammunition Plant and now protects habitat connected to the larger Caddo Lake ecosystem.",
      "Public trails and wildlife-observation areas let visitors explore forest, wetland edges and historic remnants without requiring a boat. The setting supports wood ducks, migratory songbirds, reptiles, mammals and rare species associated with the biologically rich Cypress Basin.",
      "This refuge pairs naturally with Caddo Lake State Park and Karnack-area paddling, but it should not be treated as interchangeable with those destinations. Federal refuge rules, hunting periods and site-specific access can differ, so travelers should check the current FWS map before exploring former industrial areas."
    ],
    officialUrl: "https://www.fws.gov/refuge/caddo-lake",
  }),
  refuge({
    slug: "hagerman-national-wildlife-refuge",
    name: "Hagerman National Wildlife Refuge",
    summary: "Hagerman National Wildlife Refuge overlays the Big Mineral Arm of Lake Texoma west of Sherman, combining marshes, bottomland woods, grasslands and managed fields that support more than 300 recorded bird species.",
    region: "prairies-lakes",
    nearestTown: "Sherman",
    county: "Grayson County",
    coordinates: { lat: 33.74, lng: -96.78 },
    bestSeason: "Late fall and winter for geese and waterfowl; spring for wildflowers and migrants; early mornings in summer.",
    entryNote: "Lake levels, flooding and habitat management can affect roads and trails. Tram tours and programs may require reservations, so verify current refuge and Friends of Hagerman schedules.",
    highlights: ["Lake Texoma shoreline", "Wildlife Drive", "Five hiking trails", "Seasonal snow geese and migratory birds"],
    body: [
      "Hagerman was established in 1946 over land associated with the Denison Dam project and today protects a varied Lake Texoma landscape of shallow marsh, creeks, bottomland hardwoods, grasslands and managed fields. That habitat diversity explains why the refuge supports such a large bird list.",
      "Wildlife Drive and a network of hiking trails make the refuge easy to sample at different levels of effort. Seasonal tram tours and nature programs add interpretation, while the shoreline setting creates opportunities to watch waterfowl, raptors, wading birds and resident wildlife from multiple vantage points.",
      "North Texas weather and Lake Texoma water levels can change trail and road conditions. Winter often produces the refuge's most dramatic concentrations of geese, while spring offers a different experience built around migrants, butterflies and flowering plants."
    ],
    officialUrl: "https://www.fws.gov/refuge/hagerman",
  }),
  refuge({
    slug: "laguna-atascosa-national-wildlife-refuge",
    name: "Laguna Atascosa National Wildlife Refuge",
    summary: "Laguna Atascosa National Wildlife Refuge protects more than 100,000 acres of South Texas brush, grassland, wetlands and coastal habitat and is a nationally important center for endangered ocelot conservation and bird diversity.",
    region: "south-texas",
    nearestTown: "Los Fresnos",
    county: "Cameron County",
    coordinates: { lat: 26.23, lng: -97.35 },
    address: "22817 Ocelot Road, Los Fresnos, TX 78566",
    bestSeason: "Late fall through spring for birding and cooler conditions; spring migration can be exceptional.",
    entryNote: "Some units and roads may close for habitat protection or other management needs. Confirm current trail closures, visitor-center hours, entrance fees and heat conditions before visiting.",
    highlights: ["Endangered ocelot habitat", "Exceptional bird diversity", "South Texas brushlands", "Wetlands and coastal prairie"],
    body: [
      "Laguna Atascosa is one of the most biologically distinctive federal refuges in Texas. Established in 1946 for wintering waterfowl, it now protects a much broader South Texas mosaic and plays a central role in conservation of the endangered ocelot, whose U.S. population is concentrated in this region.",
      "Birders know the refuge for a species list that ranks among the largest in the National Wildlife Refuge System. Brush-country birds, shorebirds, raptors, waterfowl and tropical species overlap here, making even short walks and observation stops potentially productive across different seasons.",
      "The environment can be unforgiving: heat, thorns, mosquitoes and limited shade are real planning factors. Visitors should bring water and sun protection, respect closed units and never expect an ocelot sighting; the refuge's value is the intact habitat supporting the entire community of wildlife."
    ],
    officialUrl: "https://www.fws.gov/refuge/laguna-atascosa",
  }),
  refuge({
    slug: "lower-rio-grande-valley-national-wildlife-refuge",
    name: "Lower Rio Grande Valley National Wildlife Refuge",
    summary: "Lower Rio Grande Valley National Wildlife Refuge protects a distributed wildlife corridor across deep South Texas, reconnecting thornscrub, resaca, river and brush habitats used by migratory birds and rare borderland species.",
    region: "south-texas",
    nearestTown: "Alamo",
    county: "Cameron, Hidalgo, Starr and Willacy counties",
    coordinates: { lat: 26.08, lng: -98.13 },
    bestSeason: "Fall through spring for cooler temperatures, migration and peak birding activity.",
    entryNote: "This is a geographically distributed refuge with multiple tracts and access points rather than one compact park. Choose a specific public-use unit and check current federal access notices before traveling.",
    highlights: ["Lower Rio Grande wildlife corridor", "Nearly 40,000 acres of public-use lands", "Birding and wildlife photography", "South Texas thornscrub and resaca habitat"],
    body: [
      "The Lower Rio Grande Valley refuge is best understood as a conservation corridor rather than a single enclosed destination. Since 1979, the U.S. Fish and Wildlife Service has assembled and restored tracts across the Valley to reconnect habitat in a region where agriculture, roads and urban growth fragmented native thornscrub and river landscapes.",
      "That distributed design protects movement routes for birds, mammals, reptiles and other species while giving visitors access to selected trails, observation decks and wildlife areas. Different units can feel completely different, from dry brush to wetlands and river-associated habitat.",
      "Trip planning therefore starts with selecting a named public-use area, not simply entering the refuge name in navigation. Border-area road conditions, weather, land-management projects and unit-specific rules can change, so the current FWS visitor map should be consulted before departure."
    ],
    officialUrl: "https://www.fws.gov/refuge/lower-rio-grande-valley",
  }),
  refuge({
    slug: "mcfaddin-national-wildlife-refuge",
    name: "McFaddin National Wildlife Refuge",
    summary: "McFaddin National Wildlife Refuge near Sabine Pass protects nearly 59,000 acres of freshwater, intermediate and brackish marsh, including one of the largest remaining freshwater marsh systems on the Texas Coast.",
    region: "gulf-coast",
    nearestTown: "Sabine Pass",
    county: "Jefferson County",
    coordinates: { lat: 29.67, lng: -94.07 },
    address: "5632 Clam Lake Road, Sabine Pass, TX 77655",
    bestSeason: "Fall through spring for waterfowl and comfortable coastal recreation; summer is hot, humid and insect-heavy.",
    entryNote: "The refuge is generally open during daylight hours, but storms, marsh conditions and hunting seasons can affect access. Check the current FWS page and coastal road status before driving south of Sabine Pass.",
    highlights: ["Freshwater and brackish marsh", "Fishing and crabbing", "Waterfowl habitat", "McFaddin Beach and coastal wildlife"],
    body: [
      "McFaddin protects an immense marsh landscape on the far upper Texas Coast near the Louisiana line. Freshwater marsh grades toward intermediate and brackish systems, creating a productive transition zone for waterfowl, fish, reptiles, mammals and the food webs of the chenier plain.",
      "Public recreation is closely tied to the water. Fishing, crabbing, wildlife watching, photography, beach access and seasonal waterfowl hunting are major uses, while the long coastal approach gives the refuge a more remote character than urban-adjacent wildlife areas.",
      "Hurricanes, tropical rainfall and marsh water levels can reshape access quickly. Travelers should check Highway 87 conditions, refuge alerts and hunting information before making the drive, and should carry water, insect protection and appropriate gear for an exposed Gulf Coast environment."
    ],
    officialUrl: "https://www.fws.gov/refuge/mcfaddin",
  }),
  refuge({
    slug: "muleshoe-national-wildlife-refuge",
    name: "Muleshoe National Wildlife Refuge",
    summary: "Muleshoe National Wildlife Refuge on the western High Plains is Texas's oldest national wildlife refuge and is especially known for winter concentrations of lesser sandhill cranes around playa wetlands and native grasslands.",
    region: "panhandle",
    nearestTown: "Muleshoe",
    county: "Bailey County",
    coordinates: { lat: 33.95, lng: -102.76 },
    bestSeason: "Late fall through early spring for sandhill cranes; spring and fall for migration and milder hiking weather.",
    entryNote: "This is a remote High Plains refuge with limited services. Check playa water conditions, weather, camping rules and seasonal hunting information before setting out.",
    highlights: ["Texas's oldest national wildlife refuge", "Lesser sandhill crane concentrations", "High Plains playa wetlands", "Hiking and primitive camping"],
    body: [
      "Established in 1935, Muleshoe is the oldest national wildlife refuge in Texas. Its conservation significance comes from the High Plains relationship between grassland and shallow playa basins, which can hold water episodically and become critical resting and feeding habitat for migratory birds.",
      "The refuge is best known for large numbers of lesser sandhill cranes that use the area between fall and spring. The spectacle depends on weather, water and migration timing, so the experience varies from year to year rather than functioning like a fixed attraction.",
      "Muleshoe's remoteness is part of its appeal. Visitors should expect wind, broad horizons, limited shade and fewer services than at a developed park, making advance fuel, water and weather planning important for photography, hiking or primitive camping."
    ],
    officialUrl: "https://www.fws.gov/refuge/muleshoe",
  }),
  refuge({
    slug: "neches-river-national-wildlife-refuge",
    name: "Neches River National Wildlife Refuge",
    summary: "Neches River National Wildlife Refuge near Jacksonville protects biologically rich bottomland hardwood forest and river habitat in East Texas for migratory birds, resident wildlife and the ecological integrity of the Neches watershed.",
    region: "piney-woods",
    nearestTown: "Jacksonville",
    county: "Anderson and Cherokee counties",
    coordinates: { lat: 31.97, lng: -95.28 },
    address: "262 W Highway 79, Jacksonville, TX 75766",
    bestSeason: "Fall through spring for cooler forest exploration and migration; spring brings strong songbird activity.",
    entryNote: "Public-use infrastructure is more limited than at many established recreation refuges. Confirm current access areas, maps and activity rules with FWS before planning a dedicated visit.",
    highlights: ["Neches River bottomland hardwoods", "Central Flyway migratory habitat", "East Texas forest ecology", "River-and-wetland conservation"],
    body: [
      "Neches River National Wildlife Refuge protects a stretch of East Texas bottomland hardwood forest whose value extends well beyond scenic woodland. Periodic flooding, sloughs, river channels and mature forest create a dynamic system used by migratory birds and a broad range of resident species.",
      "The refuge was established specifically to conserve migratory-bird habitat and the biological diversity of the bottomlands. That makes it an important counterpoint to reservoir and upland recreation sites elsewhere in the Piney Woods: the central story here is an intact river-floodplain system.",
      "Because visitor infrastructure and public access can evolve as refuge lands are managed and acquired, travelers should rely on current federal maps rather than old directions. This is best approached as a conservation-focused nature stop, with conditions determined by water levels and season."
    ],
    officialUrl: "https://www.fws.gov/refuge/neches-river",
  }),
  refuge({
    slug: "san-bernard-national-wildlife-refuge",
    name: "San Bernard National Wildlife Refuge",
    summary: "San Bernard National Wildlife Refuge protects more than 70,000 acres from Gulf beaches and coastal marshes inland through prairie, wetlands and bottomland forests along the Brazos and San Bernard river systems.",
    region: "gulf-coast",
    nearestTown: "Brazoria",
    county: "Brazoria and Matagorda counties",
    coordinates: { lat: 28.87, lng: -95.57 },
    address: "6801 CR 306, Brazoria, TX 77422",
    bestSeason: "Fall through spring for migratory birds and cooler hiking; spring migration is especially strong in forest tracts.",
    entryNote: "The refuge spans multiple recreation areas over a large landscape. Select a specific unit, check trail and hunt notices, and verify road conditions before arrival.",
    highlights: ["Coastal marsh and prairie", "Bottomland hardwood forests", "More than 300 bird species", "Multiple recreation areas and trails"],
    body: [
      "San Bernard is unusually diverse even by Texas Gulf Coast standards. Its protected lands extend from saline marsh and coastal prairie through freshwater wetlands and far inland into bottomland forests along the Brazos and San Bernard floodplains, creating habitat for both coastal and forest-dependent wildlife.",
      "That habitat range makes the refuge productive across seasons. Waterfowl and shorebirds dominate some winter landscapes, while spring migrants use inland forest tracts after crossing the Gulf. Multiple recreation areas and trails allow visitors to choose a coastal, wetland or woodland emphasis.",
      "The refuge is too geographically broad to treat as a single pin on a map. Travelers should decide which recreation area fits their goals and then verify current water, road, trail and hunting conditions, especially after heavy rain or tropical weather."
    ],
    officialUrl: "https://www.fws.gov/refuge/san-bernard",
  }),
  refuge({
    slug: "santa-ana-national-wildlife-refuge",
    name: "Santa Ana National Wildlife Refuge",
    summary: "Santa Ana National Wildlife Refuge near Alamo preserves 2,088 acres of subtropical South Texas habitat at the intersection of major migration routes, making it one of the Rio Grande Valley's premier birding destinations.",
    region: "south-texas",
    nearestTown: "Alamo",
    county: "Hidalgo County",
    coordinates: { lat: 26.08, lng: -98.14 },
    address: "3325 Green Jay Road, Alamo, TX 78516",
    bestSeason: "Late fall through spring for comfortable birding, winter specialties and migration; early morning is best in warm weather.",
    entryNote: "Trails are generally open sunrise to sunset, but individual levees or routes can close temporarily. Check current FWS closure notices, tram schedules and fees before arrival.",
    highlights: ["Rio Grande Valley specialty birds", "Subtropical thorn forest", "Observation tower and trails", "Butterflies and migration"],
    body: [
      "Santa Ana is small compared with many federal refuges, but its position near the Rio Grande gives it exceptional biological value. Subtropical forest, resacas, thornscrub and wetland edges support birds and butterflies whose U.S. ranges are concentrated in deep South Texas.",
      "The refuge is designed for close, low-impact exploration. A trail network, observation areas and seasonal interpretive programs let visitors search for green jays, great kiskadees, chachalacas, raptors and migrant warblers without needing to cover a huge landscape.",
      "Temporary route closures are part of managing a floodplain refuge, and summer heat can be severe. Visitors should check current notices, carry ample water and plan around early-day wildlife activity rather than assuming every trail or levee is always available."
    ],
    officialUrl: "https://www.fws.gov/refuge/santa-ana",
  }),
  refuge({
    slug: "texas-point-national-wildlife-refuge",
    name: "Texas Point National Wildlife Refuge",
    summary: "Texas Point National Wildlife Refuge near Sabine Pass protects marsh, chenier and coastal habitat at the far eastern end of the Texas Coast, supporting migratory birds, waterfowl and wildlife-dependent recreation near the Louisiana border.",
    region: "gulf-coast",
    nearestTown: "Sabine Pass",
    county: "Jefferson County",
    coordinates: { lat: 29.68, lng: -93.94 },
    bestSeason: "Fall through spring for migration and waterfowl; spring can be notable for Gulf-crossing songbirds using coastal habitat.",
    entryNote: "Coastal storms, road conditions and waterfowl seasons can affect access. Verify current FWS refuge information and Highway 87 conditions before making the drive.",
    highlights: ["Upper Coast marsh habitat", "Migratory bird corridor", "Waterfowl hunting", "Sabine Pass coastal landscape"],
    body: [
      "Texas Point sits at the extreme eastern edge of the Texas Coast, where marsh, coastal ridges and nearby Gulf waters create habitat used by resident wildlife and large numbers of migratory birds. Its position near Sabine Pass makes it part of the broader chenier-plain conservation landscape shared with McFaddin.",
      "The refuge is more about habitat and wildlife-dependent recreation than developed attractions. Birding, wildlife observation, photography and seasonal hunting are shaped by marsh conditions and the rhythms of migration rather than by a fixed visitor itinerary.",
      "The low coastal setting is vulnerable to storms, flooding and road disruptions. A successful trip checks current refuge notices and highway access first, then pairs Texas Point with other Sabine Pass or Sea Rim-area stops only when conditions make the coastal drive practical."
    ],
    officialUrl: "https://www.fws.gov/refuge/texas-point",
  }),
  refuge({
    slug: "trinity-river-national-wildlife-refuge",
    name: "Trinity River National Wildlife Refuge",
    summary: "Trinity River National Wildlife Refuge near Liberty protects roughly 30,000 acres of bottomland hardwood forest along the lower Trinity, with primitive trails, paddling, fishing and wildlife viewing across multiple public-use areas.",
    region: "piney-woods",
    nearestTown: "Liberty",
    county: "Liberty County",
    coordinates: { lat: 30.06, lng: -94.8 },
    address: "601 FM 1011, Liberty, TX 77575",
    bestSeason: "Fall through spring for hiking and birding; paddling conditions depend on river levels and weather.",
    entryNote: "The refuge is distributed across multiple day-use areas and many trails are primitive. Check current maps, flood conditions and access notices before choosing a trailhead or launch.",
    highlights: ["Lower Trinity bottomland hardwoods", "Primitive trail network", "Champion Lake paddling and fishing", "Alligators, kites and forest wildlife"],
    body: [
      "Trinity River National Wildlife Refuge was established in 1994 to protect one of the major remaining bottomland-hardwood systems along the lower Trinity River. Seasonal flooding, sloughs, lakes and forest create habitat for alligators, alligator gar, turtles, raptors, migratory birds and other species tied to river floodplains.",
      "Public access is spread across multiple day-use areas rather than centered on one developed campus. Primitive trails provide forest exploration, while Champion Lake and Pickett's Bayou support paddling, boating and fishing when water and weather conditions are suitable.",
      "Floodplain landscapes require flexible planning. Trails can be muddy or inundated, summer humidity is intense and river levels matter for boating, so visitors should choose a specific public-use area and consult current refuge information before driving into remote access roads."
    ],
    officialUrl: "https://www.fws.gov/refuge/trinity-river",
  }),
];

export const NATIONAL_WILDLIFE_REFUGE_SLUGS = nationalWildlifeRefugeDestinations.map((destination) => destination.slug);
