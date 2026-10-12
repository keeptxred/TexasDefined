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
