import type { Destination } from "./types";

/** An official TPWD state-park property; do not confuse a separately listed RV business with the park. */
export function isTexasStateParkDestination(destination: Destination): boolean {
  if (destination.category === "rv-parks") return false;
  if (!/\bstate park\b|\bstate natural area\b|\bindian lodge\b/i.test(destination.name)) return false;
  return /^https:\/\/tpwd\.texas\.gov\/state-parks\/[a-z0-9-]+\/?(?:[?#].*)?$/i.test(destination.officialUrl ?? "");
}

/** Link only to known TPWD resource patterns; do not assert an amenity is present without specific evidence. */
export function stateParkOfficialResources(destination: Destination) {
  if (!isTexasStateParkDestination(destination)) return null;
  const official = (destination.officialUrl ?? "").split(/[?#]/)[0].replace(/\/$/, "");
  return {
    official,
    map: `${official}/map`,
    feesAndFacilities: `${official}/fees-facilities`,
    reservations: destination.reservationUrl?.startsWith("https://") ? destination.reservationUrl : "https://texasstateparks.reserveamerica.com/",
  };
}

export type VerifiedParkFacilityNotes = {
  checkedAt: string;
  sourceUrl: string;
  restrooms?: string;
  parking?: string;
  camping?: string;
  access?: string;
  maps?: string;
};

/** Claims below have specific official source pages; absence means "not yet independently checked", not "no facility". */
export const VERIFIED_PARK_FACILITIES: Readonly<Record<string, VerifiedParkFacilityNotes>> = {
  "palo-duro-canyon-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map",
    parking: "The headquarters and gate are on Park Road 5, about 12 miles east of Canyon. Follow the park map to individual trailheads and campsites; do not treat the canyon entrance as every trailhead.",
    access: "TPWD currently lists gate hours 7:30 a.m.–10 p.m. Trails may close because of wet weather, poor conditions or excessive heat. Verify the trail-status alerts immediately before hiking.",
    maps: "TPWD provides the park map, trails map and interactive trails map.",
  },
  "caprock-canyons-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons/map",
    parking: "Enter from FM 1065 north of Quitaque; use the separate state-park and Trailway maps to choose actual parking and trail access.",
    access: "TPWD notes all roads within the park are paved, but nearby unpaved roads can become dangerously slippery following heavy rain. Bison share developed park areas; give them space.",
    maps: "Separate park, park trails and Trailway maps are available; the Trailway is not the same as the park's main hiking trail system.",
  },
  "big-bend-ranch-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map",
    parking: "Check in first at Barton Warnock (east) or Fort Leaton (west) along FM 170 before driving to an interior campsite. Maps distinguish river-road access from Sauceda interior routes.",
    access: "Sauceda Ranch Road is 27 miles of rugged dirt road from FM 170; RVs and trailers are not recommended. The old north entrance is permanently closed. Route to the correct unit, not simply the park's map pin.",
    maps: "TPWD supplies a complex overview plus several regional topographic, Closed Canyon and Contrabando Trail System maps.",
  },
  "mustang-island-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/mustang-island/fees-facilities/campsites",
    restrooms: "TPWD lists restroom-and-shower facilities near the 48 developed electric campsites. Primitive beach campsites may be 50 yards to 1.5 miles from a restroom; a bathhouse is near headquarters.",
    parking: "Developed campgrounds are behind the dunes, approximately 400 yards from the beach; primitive drive-up camping is in the designated 1.5-mile beach zone, subject to conditions.",
    camping: "48 electric campsites with water and 50 non-reservable primitive drive-up beach sites; primitive camping may close for weather. TPWD says the Gulf swimming area has no lifeguards.",
    maps: "TPWD publishes an official park map and separate Mustang Island paddling-trail map.",
  },
  "goose-island-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/goose-island/fees-facilities/campsites/",
    restrooms: "TPWD lists showers and restrooms near the Bayfront camping loop; wooded electric and walk-in sites have different proximity and features.",
    parking: "22 wooded walk-in tent campsites may require carrying equipment up to 150 yards from parking. Waterfront, wooded and overflow sites have different vehicle rules.",
    camping: "TPWD lists 40 Bayfront electric sites, 53 wooded electric sites and 22 walk-in water sites. A small number of full-hookup sites are not reservable in advance; call for availability.",
    maps: "TPWD publishes the park map; inspect it for the Bayfront and Wooded Area loops and the Big Tree access.",
  },
  "sea-rim-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/sea-rim/fees-facilities/campsites",
    parking: "15 developed electric sites occupy the Piping Plover loop near the dune boardwalk. Primitive beach camping is west of the developed section and may close due to tides or storm conditions.",
    camping: "TPWD lists 15 electric sites with water and 75 primitive beach sites. Primitive sites are first-come, not advance reservable, and can be closed by high tides.",
    access: "State Highway 87 is closed between Sea Rim and High Island; approach from Port Arthur/Sabine Pass. Call for camping access and coastal conditions before travel.",
    maps: "TPWD provides park and trails maps, plus an interactive trails map.",
  },
  "fort-boggy-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/fort-boggy/fees-facilities/accessibility-information",
    restrooms: "TPWD confirms restrooms and an outdoor shower near the lake. Camping-area bathrooms include accessible features, including grab bars, roll-in considerations and a fold-down shower seat.",
    parking: "Wheelchair-friendly day-use picnic sites and pavilion have adjacent ADA parking and paved access. Five cabins are reached by a walk from the main parking area; cabin 5 has wheelchair access.",
    camping: "Five cabins are available, including accessible cabin 5, as well as hike-in primitive campsites. Cabin pets are prohibited. Verify cabin linens, check-in requirements and shower distances before booking.",
    maps: "TPWD publishes a park map showing the small lake, day-use, cabin and trail areas.",
  },
  "copper-breaks-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/copper-breaks/fees-facilities/campsites",
    restrooms: "TPWD lists restrooms near Comanche electric sites and restrooms with showers near Kiowa water campsites.",
    parking: "Comanche and Kiowa are distinct camping areas; equestrian camping is near Big Pond. Select a specific area and consult the park and trail maps.",
    camping: "24 electric campsites in the Comanche area (30/50 amp), 11 water sites in Kiowa (tent-only), and equestrian-water camping are listed. The site type determines RV eligibility.",
    maps: "TPWD publishes park, trails and interactive trail maps.",
  },
  "san-angelo-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/san-angelo/map",
    parking: "Use the South Shore gatehouse to check in and obtain the code for the locked North Shore gate. The park has geographically separate north and south camping, trail and recreation areas.",
    access: "TPWD's South Shore gatehouse is listed 8:30 a.m.–4:30 p.m. daily; the North Shore gate is locked. Verify vehicle access before navigating directly to a northern trailhead.",
    maps: "TPWD supplies a park map and separate North Unit and South Unit trail maps.",
  },
  "abilene-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/abilene/map",
    parking: "Follow FM 89 through Buffalo Gap to Park Road 32; use the official park map for campground and day-use parking rather than relying solely on the park's location pin.",
    access: "TPWD says the park has capacity limits and recommends reserving camping and day passes before arrival. Pool hours are a separate facility-specific operation and must be checked independently.",
    maps: "TPWD publishes park, trails and interactive trails maps.",
  },
  "daingerfield-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/daingerfield/map",
    parking: "The park entrance is on Park Road 17 off Highway 49, east of Daingerfield. Use TPWD's park map for lakefront, trail and camping parking zones.",
    access: "TPWD currently lists gate hours 6 a.m.–10 p.m.; park office and park store follow shorter schedules, so check them before arriving for equipment or supplies.",
    maps: "TPWD publishes separate park and trails maps.",
  },
  "mission-tejas-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/mission-tejas/fees-facilities/accessibility-information",
    restrooms: "TPWD confirms accessible restrooms at headquarters and day-use areas, but the historic CCC camping-area restroom is not accessible. Developed campsites have showers nearby; remote primitive sites have no on-site water.",
    parking: "The day-use pavilion has accessible parking and a paved sidewalk. Primitive campsites may require hiking 0.5–1 mile over steep, uneven trail rather than parking beside the tent.",
    camping: "TPWD lists 12 electric campsites, three electric tent-only sites, two water sites and five primitive sites. Exact access, reservation methods and showers vary by category.",
    maps: "TPWD publishes park and trails maps; the history of Mission San Francisco de los Tejas and Rice Family Log Home is interpreted through separate visitor materials.",
  },
  "estero-llano-grande-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/estero-llano-grande/fees-facilities/estero-llano-grande-accessibility",
    restrooms: "TPWD verifies wheelchair-accessible restrooms at the Visitor Center and restrooms near the group hall. This wetland birding park is not advertised as an individual campground.",
    parking: "Approach from FM 1015 south of U.S. Highway 83 at Weslaco. Visitor center access is wheelchair-friendly; verify designated parking space details with the park before visiting.",
    access: "Open daily 8 a.m.–5 p.m.; accessible areas include portions of Camino de Aves, Green Jay, Spoonbill Boardwalk, Wader's Trail and Tropical Area, though some routes flood after rain.",
    maps: "TPWD offers park, trail and Spanish-language trail maps plus Braille loan maps. Park staff can reserve a Grit Freedom Chair or motorized Trackchair.",
  },
  "ray-roberts-lake-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake/fees-facilities/campsites",
    restrooms: "Developed electrical sites at Isle du Bois and Johnson Branch list shower restrooms nearby. Walk-in primitive sites list ordinary restrooms; their exact distance differs by loop. Several accessible sites are named in TPWD's source.",
    parking: "Use Isle du Bois 100 PW 4137, Pilot Point or Johnson Branch 100 PW 4153, Valley View. Walk-in primitive sites require carrying gear between 1/8 and 1/4 mile depending on the unit.",
    camping: "Isle du Bois: 13 higher-amperage plus 102 ordinary electric sites and 53 walk-in primitive sites. Johnson Branch: 11 higher-amperage, 93 ordinary electric and 70 walk-in primitive sites. Both have specific accessible campsite numbers.",
    access: "October 9, 2026 official park update: Johnson Branch DORBA trails open; Isle du Bois equestrian/DORBA open; Greenbelt south of Overlook closed. Recheck trail alerts after weather.",
    maps: "Separate park maps for Isle du Bois and Johnson Branch plus a complex overview and distinct trails maps.",
  },
  "lake-somerville-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lake-somerville/fees-facilities/campsites",
    restrooms: "Birch Creek electrical loops list restrooms nearby; Nails Creek Cedar Creek and equestrian loops have separate restroom locations. Wolf Pond and Flag Pond primitive trail camps have chemical toilets but no potable water.",
    parking: "Birch Creek (Park Road 57, Somerville) and Nails Creek (FM 180, Ledbetter) are separate park entrances on different sides of the lake. Note the 13-foot 4-inch FM 60 bridge near Deanville when taking a tall RV to Birch Creek.",
    camping: "Birch Creek: 99 ordinary electrical sites plus 10 water-only equestrian sites. Nails Creek: 20 regular electrical, 20 equestrian electrical and 10 equestrian water sites. Flag Pond and Wolf Pond walk/hike/horse primitive Trailway sites have NO drinking water.",
    access: "Park hours 6 a.m.–10 p.m.; separate Birch Creek, Nails Creek and 13.11-mile Trailway entrances and maps. Some primitive and group sites cannot be reserved ahead; verify water levels, active alerts and bookings.",
    maps: "TPWD issues separate maps for Birch Creek Unit, Nails Creek Unit and the 13.11-mile Trailway, plus individual trails maps.",
  },
  "hill-country-state-natural-area": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/hill-country/fees-facilities/campsites",
    restrooms: "West Verde Creek and Chaquita Falls walk-in camps have chemical toilets nearby; Comanche Bluff has vault toilets nearby. TPWD has not verified an equivalent restroom at each remote wilderness campsite.",
    parking: "West Verde Creek campsites require carrying equipment up to 50 yards from parking, Comanche Bluff up to 25 yards and Chaquita Falls up to 75 yards. Backcountry sites can require hikes of 2.3–3.25 miles.",
    camping: "Three West Verde Creek, three Comanche Bluff and four Chaquita Falls creekside walk-in sites have water nearby. Butterfly Springs (2 sites), Hermit's Shack (3) and Wilderness (5) hike-in areas have NO water and prohibit ground fires.",
    access: "October 5, 2026 official alert reported all trails open but an active burn ban. Mud can close trails after rain. Park office 8:15 a.m.–4:45 p.m.; reserve day-use ahead.",
    maps: "TPWD provides the separate park and trail maps, interpretive guide and bird checklist.",
  },
  "palo-pinto-mountains-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains/fees-facilities/campsites",
    restrooms: "Warbler Ridge's 23 electric sites have shower-equipped restrooms nearby. Painted Stick's 12 walk-in sites have vault toilets nearby; the 13 primitive hike-in sites have composting toilets and no water.",
    parking: "Enter via Park Road 77 north of Strawn. Walk-in and hike-in camping do not place vehicle parking at the tent; primitive sites require approximately a two-mile walk.",
    camping: "Warbler Ridge: 23 electric sites with 20/30/50-amp service. Painted Stick: 12 walk-in water sites. Primitive: 13 hike-in sites without water; no campfires at the primitive sites.",
    maps: "TPWD publishes park and trails maps. More than 16 miles of multiuse trails, including about 1.25 accessible miles, require separate trail and accessibility planning.",
  },
  "goliad-state-park-and-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/goliad/map",
    parking: "Enter from U.S. 183/77A just south of Goliad and use the park map for parking distinct from the Mission Espíritu Santo buildings.",
    access: "TPWD lists park operations 8 a.m.–10 p.m. while headquarters and historic buildings normally operate 8:30 a.m.–4:30 p.m.",
    maps: "TPWD publishes separate park and Mission Espíritu Santo maps. Other Goliad heritage sites are independent destinations.",
  },
  "hueco-tanks-state-park-and-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/hueco-tanks",
    parking: "Approach from U.S. Highway 62/180 via Ranch Road 2775 to Hueco Tanks Road; TPWD warns GPS may misdirect drivers. Orientation/check-in is required.",
    camping: "TPWD lists 20 campsites. Visits to North Mountain and restricted cultural sites have separate permit or tour restrictions, and charcoal or wood fires are prohibited.",
    access: "Only 70 self-guided North Mountain visitor permits are available daily. Guided tours must be booked at least a week ahead; orientations are required annually. Most trails prohibit pets.",
    maps: "Use official park and trails maps; climbing and rock-art access follow protected-area-specific rules.",
  },
  "lyndon-b-johnson-state-park-and-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson/map",
    parking: "Enter on Park Road 52 near Stonewall from U.S. 290. Use the state-park map for visitors center, Sauer-Beckmann Farm and day-use parking.",
    access: "State-park admission is free. Sauer-Beckmann Farm has seasonal operating hours and is closed on the final Tuesday each month; federal LBJ Ranch tours have separate NPS operating status.",
    maps: "TPWD publishes a park map and interpretive guide. The adjacent NPS national historical park is independently administered.",
  },
  "honey-creek-state-natural-area": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/newsmedia/releases/?req=20260807a",
    restrooms: "TPWD confirms one restroom at the new public trailhead off Park Road 31, opened August 8, 2026. Other restroom locations or shower facilities are not verified.",
    parking: "Use the reserved-access public trailhead off Park Road 31; TPWD has not confirmed the number or accessibility of individual parking spaces in its current visitor notice.",
    camping: "TPWD does not list public camping as part of the new Honey Creek trailhead access. Bring your own drinking water: TPWD confirms there is no public water-refill station.",
    access: "The new trailhead is open daily 7 a.m.–7 p.m., with reserved day passes and gate instructions. Public trails are distinct from guided creek tours; pets are permitted on trails but not on creek tours.",
    maps: "TPWD supplies a downloadable public trails map and describes the 0.7-mile accessible Box Turtle Trail and 1.7-mile moderate Roadrunner Trail.",
  },
  "fort-richardson-state-park-state-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/fort-richardson/fees-facilities/campsites",
    restrooms: "TPWD lists restrooms with showers near the West Camping Loop's full-hookup and electric campsites. Verify the nearest available facility on the park map.",
    parking: "TPWD describes back-in parking for the full-hookup campsites, some pull-through electric sites, and a group camp reached on foot from its parking area.",
    camping: "TPWD lists four full-hookup campsites in the West Camping Loop and additional electric, group, and overflow camping options. Verify availability and current prices.",
    maps: "The official park map page provides park, trails, and trailway maps.",
  },
  "seminole-canyon-state-park-and-historic-site": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/seminole-canyon/map",
    parking: "The park headquarters is reached from US Highway 90 west of Comstock; use TPWD's park map for designated parking and tour meeting points.",
    access: "TPWD lists the park headquarters at 29.700094, -101.312875. Check current tour access and active park alerts before traveling.",
    maps: "The official map page links park and trails maps and an interactive trails map.",
  },
  "lake-arrowhead-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lake-arrowhead/map",
    parking: "TPWD provides directions to the park entrance from FM 1954, approximately seven miles south of Wichita Falls; use the park map to select the appropriate parking area.",
    access: "The park headquarters address is 229 Park Road 63, Wichita Falls, TX 76310. Confirm current lake and park alerts.",
    maps: "The official map page provides park and trails maps, including an interactive trails map.",
  },
};
