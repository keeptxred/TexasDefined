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
    reservations: destination.slug === "longhorn-cavern-state-park"
      ? "https://www.visitlonghorncavern.com/"
      : destination.reservationUrl?.startsWith("https://") ? destination.reservationUrl : "https://texasstateparks.reserveamerica.com/",
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
  "falcon-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/falcon/fees-facilities/campsites",
    restrooms: "Javelina Run full hookups have nearby restrooms; Mesquite Bend electric loop restroom is wheelchair accessible. Black Bass Loop water sites also have restrooms nearby.",
    parking: "Javelina Run (#201–231) and Mesquite Bend (#101–131) are separate pull-through loops. Black Bass (#43–79) is a water-site loop whose 36 sites cannot be reserved in advance.",
    camping: "31 full-hookup Javelina Run pull-through camps with water/sewer and 30/50 amps; 31 Mesquite Bend water/electric pull-through camps with 30/50 amps; 36 Black Bass water-area sites without reservation availability.",
    maps: "Use official state park and camp-loop maps to locate boat and fishing access separately from each named camping loop.",
  },
  "kickapoo-cavern-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/kickapoo-cavern/fees-facilities/campsites",
    restrooms: "Five full-hookup campsite pads and ten water-only sites have shower restrooms nearby. Full-hookup pads #1, #3, #5 and #7 have wheelchair-accessible paths to bathrooms; group sites #17 and #19 also provide accessible paths.",
    parking: "The five developed full-hookup pads cannot fit vehicles over 36 feet. Towing a separate vehicle behind a motorhome requires disconnecting it at the parking lot. Ten water-only sites accept only tents and small campers, not large motorhomes or fifth wheels.",
    camping: "5 full-hookup sites with electric/water/sewer; 10 shared-spigot water-only campsites; a 5-site group camp. TPWD explicitly requires all campers to REMOVE THEIR OWN TRASH because the park has no refuse disposal facilities.",
    access: "The park's accessible full-hookup site numbers are 1, 3, 5 and 7; group sites 17 and 19 also have accessible concrete paths. Confirm actual tour availability for restricted cave areas separately from camping.",
    maps: "Consult official campground map and route directions before arriving with an oversized RV or intending a cave tour.",
  },
  "old-tunnel-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/old-tunnel",
    parking: "Day-use trail and observation areas are reached from 10619 Old San Antonio Road, Fredericksburg. Because cell service is limited, save the prebooked bat-emergence ticket as a screenshot before arriving.",
    camping: "NO OVERNIGHT CAMPING is permitted. Bring drinking water: TPWD confirms none is provided anywhere in this day-use bat habitat park. No pets, alcohol or smoking.",
    access: "Trail access year-round sunrise–5 p.m. During bat season (May 1–October 31), staying after 5 p.m. requires advance-purchased bat-viewing tickets for EVERY visitor, including infants; no onsite ticket sales. The lower viewing area is open Thursday–Sunday and excludes children under four.",
    maps: "TPWD has an interpretive guide, bird checklist and designated-viewing-area access information. The upper and lower bat viewing areas have distinct capacities (100 upper/70 lower).",
  },
  "bentsen-rio-grande-valley-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley",
    restrooms: "TPWD lists showers and restrooms at the park's bookable primitive campsites; it does not claim facilities at every blind, viewing tower or remote trail.",
    parking: "PRIVATE CARS ARE NOT ALLOWED INSIDE THE PARK. Leave your vehicle at the headquarters on FM 2062 near Mission, then travel on foot, by bicycle, or on an official tram tour. Do not send vehicles to interior bird blinds or the Hawk Tower.",
    camping: "Primitive campsite reservations exist; the park is not a normal drive-to-your-tent or RV campground. Restrooms/showers are available but campers must reach sites using the park's no-private-vehicle transport restrictions.",
    access: "The park operates 7 a.m.–10 p.m.; the 1.8-mile Rio Grande Trail is wheelchair accessible but prohibits bicycles. A two-story accessible Hawk Observation Tower is available; park tram tours vary by schedule.",
    maps: "TPWD offers park and trail maps, a Spanish trails map and bird checklist for its World Birding Center main headquarters location.",
  },
  "dinosaur-valley-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/dinosaur-valley/fees-facilities/campsites",
    restrooms: "TPWD lists no restrooms or showers at the South Primitive walk-in sites or the remote hike-in camps. Sauropod and Theropod group campers must walk about 400 yards to shower restrooms; drinking water is at group parking.",
    parking: "Thirty-six electric campsite pads accommodate trailers no longer than 35 feet because of winding roads and trees. Eight primitive walk-in sites require hiking 1/3–1/2 mile; seven remote hike-in sites are 1–2.5 miles away and REQUIRE WADING THE RIVER.",
    camping: "36 electric campsites with 30-amp hookup and water; 8 primitive walk-ins with no water or bathrooms at the campsite; 7 hike-in primitive camps with no water/restrooms/ground fires and mandatory river crossing. Two group sites accommodate 40 and 20, respectively.",
    access: "River-crossing camps may be inaccessible at high water. Check current river conditions with TPWD at (254) 897-4588 and arrive before dark. Primitive hike-in sites have no ground fires; horses are prohibited in the listed campsite areas.",
    maps: "Use official park and trails maps for Paluxy River crossings and each separate group/electric/primitive area.",
  },
  "lost-maples-state-natural-area": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lost-maples/fees-facilities/campsites",
    restrooms: "30 developed electrical campsites have shower restrooms nearby. The 30 primitive hike-in campsites do not list adjacent showers or drinking water.",
    parking: "Developed electric sites have back-in RV parking; two vehicles allowed per site. The primitive overnight sites require walking 1–3.2 miles over rugged trails. Park notes no cell service, so download campsite and trail maps before arrival.",
    camping: "30 developed electric campsites with water and 30-amp service, plus 30 reserved primitive hike-in sites for at most six people each. Primitive sites have NO potable water and prohibit fires; only containerized fuel stoves allowed.",
    access: "Fall foliage crowds and changing conditions make reservations essential. No reliable cell service in the park. Off-trail hiking and rock climbing prohibited in backcountry. Carry adequate drinking water.",
    maps: "Official park, primitive camp and trails maps are essential to identify the reserved backcountry site and route.",
  },
  "colorado-bend-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/colorado-bend/fees-facilities/campsites",
    restrooms: "28 walk-in riverside tent sites have restrooms nearby; backcountry River and Windmill hike-in camps explicitly have NO toilets and NO water. Grey Fox/Canyon group camps have composting toilets; River Group composting toilet within 0.25 mile.",
    parking: "15 drive-up primitive sites #35–47 allow only self-contained RVs up to 20 feet and have no hookups or sewage dump. 28 riverside walk-in sites require a 50-yard carry. Windmill backcountry is a 1-mile hike from its trailhead, five miles from main river campground.",
    camping: "15 drive-up primitive camps with nearby shared potable water, no hookups or sewer dump; 28 tent-only walk-in sites with water in area; wilderness River/Windmill hike-in sites with NO water/restrooms or open fires. Separate 16-person Grey Fox and Canyon and 48-person River Group camps have different facilities.",
    access: "Backcountry camping permits are location-specific, with at most four campers together at each River/Windmill backcountry area. No open fires in wilderness camps. Bring all drinking water and carry out trash.",
    maps: "Use TPWD's park and trail maps to distinguish drive-up 20-foot RV sites, tent-only riverwalk sites and remote Windmill or River backcountry access.",
  },
  "franklin-mountains-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/fees-facilities/campsites",
    parking: "All overnight sites are in the Tom Mays Unit (31.908166, -106.525458). Five self-contained drive-up RV sites are RV1–RV5; some walk-in tent sites C1, C2, C3 and C5 require a high-clearance vehicle to reach the parking approach.",
    camping: "5 drive-up self-contained RV campsites with NO electricity or water; 14 walk-in tent sites with NO water; 2 double-sized group tent sites (#36, #38) for 20 people each and one #39 for 30 people, all with NO water. Plan drinking water before travel.",
    access: "The 14 walk-in tent campsites include C1–C5, 25–28, 31, 37, 41, 42 and 44. Some remote parking requires high-clearance. Park's campsite source does not verify restrooms/showers at the sites; do not assume amenities are present.",
    maps: "Official Tom Mays Unit parking and hiking maps are needed; Franklin Mountains are broad and other trailheads are not equivalent to camping access.",
  },
  "longhorn-cavern-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/longhorn-cavern",
    parking: "Enter grounds at 6211 Park Road 4 S., Burnet, TX 78611. Grounds are open to the public without a tour purchase; allow separate arrival/check-in time for the guided cavern tour operator.",
    camping: "Longhorn Cavern is explicitly DAY USE ONLY: NO overnight camping or RV campsites. Nearby Inks Lake State Park has the regional state-park overnight camping inventory.",
    access: "Park grounds are free to enter. The cavern itself requires a separately purchased guided tour from VisitLonghornCavern.com, not a standard Texas State Parks campsite or admission reservation. Grounds and facilities close December 25.",
    maps: "TPWD offers a separate official park map, interpretive CCC guide and bird checklist; the cavern tour has its own operator schedule.",
  },
  "garner-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/garner/fees-facilities/campsites",
    restrooms: "TPWD lists shower restrooms near Rio Frio/Live Oak 50-amp sites and near River Crossing/Shady Meadows 30-amp sites. Oakmont electric sites list ordinary restrooms nearby; choose the right loop before assuming a shower distance.",
    parking: "Old Garner Oakmont and Pecan Grove campsites are not waterfront. Pecan Grove water-only sites allow small pop-ups and RVs 20 feet or less. Excess vehicles require park approval and can incur a fee.",
    camping: "New Garner: 12 full-hookup Shady Meadows pull-through sites (no tents or shade); 137 50-amp Rio Frio/Live Oak sites; 35 30-amp River Crossing/Shady Meadows sites; 75 water-only sites. Old Garner: 39 Oakmont electric and 49 Pecan Grove water-only sites.",
    access: "Live Oak and Persimmon Hill camping areas have winter closures in January and February. The full-hookup Shady Meadows loop prohibits tents; arrival at any 'Garner' map pin does not guarantee the correct campground entrance.",
    maps: "Use the official campground and park maps to distinguish New Garner from Old Garner, Rio Frio, Pecan Grove, River Crossing and Oakmont camping areas.",
  },
  "enchanted-rock-state-natural-area": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/campsites",
    restrooms: "The 35 walk-in water campsites list shower restrooms nearby. Remote Moss Lake and Walnut Springs sites offer composting toilets but no drinking water; Buzzards Roost group camp also uses a composting toilet.",
    parking: "Walk-in campsites are tent-only. Primitive camps require carrying gear 1–3 miles over rugged trail. Buzzards Roost group camp has 25 dedicated parking spaces but requires an additional 0.25-mile walk to the site.",
    camping: "35 walk-in water sites; 20 remote primitive sites (8 Moss Lake, 12 Walnut Springs) without water or ground fires; Buzzards Roost group camp sleeps up to 50, is not a car-camping loop and also forbids fires.",
    access: "Primitive areas prohibit charcoal or other ash-producing ground fires. Fuel stoves that can be fully switched off are allowed. Hammocks are prohibited in primitive zones, and shelter/tree restrictions apply to frontcountry sites.",
    maps: "Consult TPWD park/trail maps and designated campsite locations; these overnight sites are not all near the Summit Trail parking area.",
  },
  "brazos-bend-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/brazos-bend/fees-facilities/campsites",
    restrooms: "TPWD lists restrooms with showers near the Burr Oak 50-amp and Red Buckeye 30-amp camping loops, and showers near the six primitive walk-in sites. Youth group restrooms are much farther away, about one-quarter mile.",
    parking: "Six walk-in primitive sites require carrying gear 35–70 yards; their parking lot is between sites 232 and 234. Youth group sites require a separate 25–50-yard walk and can be used only by qualified nonprofit youth groups.",
    camping: "40 premium 50-amp sites at Burr Oak, 33 regular 30-amp sites at Red Buckeye, six walk-in primitive sites with nearby water, plus restricted group areas for nonprofit youth groups only.",
    maps: "Use TPWD's park map for the separate Burr Oak, Red Buckeye, primitive walk-in and youth-group locations rather than assuming all camping loops are contiguous.",
  },
  "guadalupe-river-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/guadalupe-river/fees-facilities/campsites",
    restrooms: "Turkey Sink's 48 50-amp sites and Cedar Sage's 37 30-amp sites have shower restrooms nearby. Wagon Ford's nine walk-in river-terrace sites list restrooms and water near a shared walkway, not at every tent pad.",
    parking: "Wagon Ford walk-in campers must carry their gear 50–100 yards from parking down to the river terrace; the site is not a drive-up RV camping area.",
    camping: "Turkey Sink: 48 sites with 50-amp electricity and water. Cedar Sage: 37 with 30-amp electricity and water. Wagon Ford: nine tent-only walk-in water sites without electricity. Generators prohibited in all three areas.",
    maps: "Use the state park map to find Turkey Sink, Cedar Sage, Wagon Ford and designated Guadalupe River access; riverside camping does not imply a safe swimming area at every site.",
  },
  "mckinney-falls-state-park": {
    checkedAt: "2026-10-12",
    sourceUrl: "https://tpwd.texas.gov/state-parks/mckinney-falls/fees-facilities/campsites",
    restrooms: "TPWD lists restrooms with showers near both major electric campsite types: the twelve 50/30/20-amp sites and 69 30/20-amp sites.",
    parking: "Sites 8 and 18 and sites 62 and 65 are described by TPWD as useful nearby pairs for groups; verify exact vehicle-size requirements with the campsite map and booking inventory.",
    camping: "Twelve electric sites provide 50/30/20-amp hookups, and 69 provide 30/20-amp hookups. Both types include water, tent pads and nearby shower restrooms.",
    maps: "Use TPWD's park and trail maps to distinguish the campground from lower and upper falls access points and changing creek conditions.",
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
