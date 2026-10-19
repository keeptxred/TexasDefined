import type { Destination } from "./types";

/**
 * Franklin Mountains is a multi-access urban wilderness. Keep exact visitor
 * logistics distinct from generic desert safety advice, with TPWD as source
 * of truth for prices, operations, trails and campsite inventory.
 * Official facts checked October 19, 2026.
 */
export function applyFranklinMountainsVisitorAuthority(destination: Destination): Destination {
  if (destination.slug !== "franklin-mountains-state-park") return destination;

  return {
    ...destination,
    summary: "El Paso's nearly 27,000-acre mountain wilderness offers more than 100 miles of Chihuahuan Desert trails, rugged North Franklin Peak climbs, mountain biking, rock climbing and primitive camping in the Tom Mays Unit.",
    hero: { ...destination.hero, alt: "Prickly pear cactus in the Tom Mays Unit of Franklin Mountains State Park, El Paso, Texas" },
    coordinates: { lat: 31.910522, lng: -106.518182 },
    address: "2900 Tom Mays Access Rd., El Paso, TX 79911",
    directions: "For park headquarters, day-use facilities and camping, use the Tom Mays Unit off Trans Mountain Road (Loop 375), about 3.5 miles east of I-10. Other trailheads have separate access: McKelligon Canyon from Fred Wilson Road, Ron Coleman Trail at Smugglers Pass on Loop 375, and the northeast trails at the end of Jon Cunningham Boulevard near Chuck Heinrich Memorial Park. Do not route northeast hikers to Tom Mays by default.",
    bestSeason: "October through April for most hiking; spring and fall can be pleasant but busy. Check heat, wind, storms and TPWD alerts year-round.",
    entryNote: "TPWD lists adult day admission at $5; children 12 and younger enter free. The usual gate schedule is 8 a.m.–5 p.m.; Friday–Sunday gates open at 6:30 a.m. from the first Saturday in April through the first Saturday in September. Office hours are 8 a.m.–4 p.m. Capacity is limited: reserve camping and, ideally, day-use passes before arriving. Check current alerts and prices.",
    reservationUrl: "https://texasstateparks.reserveamerica.com/",
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains",
    sourceCheckedAt: "2026-10-19",
    highlights: [
      "North Franklin Peak: strenuous 8-mile hike to 7,192 feet",
      "Nature Walk and Tom Mays bird blind: an easier family introduction",
      "Tin Mines and Cardiac Road–Maze trails from the northeast side",
      "Primitive Tom Mays camping without drinking-water or electric hookups",
      "Designated climbing areas and more than 100 miles of hiking and biking routes",
    ],
    body: [
      "The striking thing about Franklin Mountains State Park is its setting: almost 27,000 acres of steep Chihuahuan Desert relief rise right through El Paso. The park is not one trailhead. Its west-side Tom Mays facilities, northeast trail network, McKelligon Canyon and Smugglers Pass approach provide noticeably different outings.",
      "For a first visit, choose a route before choosing an entrance. Tom Mays has the ¾-mile Nature Walk, a bird blind and access to the demanding North Franklin Peak route. The northeast side has the Cardiac Road–Maze Loop and the longer Tin Mines walk, reached near Chuck Heinrich Memorial Park. Check the official interactive trails map rather than relying on a generic city-center navigation pin.",
      "The mountains reveal some of the Borderland's geology in plain sight: uplifted and faulted rock exposures testify to the region's complex history and the Rio Grande rift. North Franklin Peak reaches 7,192 feet; the exposed approach involves substantial climbing and is unsuitable as a casual family stroll.",
      "Chihuahuan Desert plant communities include sotol, lechuguilla, yucca, ocotillo and cacti. The park shelters mule deer, reptiles and many birds, and its Tom Mays bird blind is a rewarding low-mileage nature stop. Wildlife is never guaranteed, and visitors should leave plants, rocks and animals undisturbed.",
      "TPWD identifies primitive overnight camping only in the Tom Mays Unit: 14 walk-in tent sites, five self-contained drive-up RV sites and group camps. There is no water or electricity at the campsites. An RV campsite is not an RV hookup; carry water for drinking, food preparation and cleaning.",
      "The park is shared by hikers, mountain bikers, climbers and wildlife watchers. TPWD permits climbing at designated locations in McKelligon Canyon and Sneed's Cory in the Tom Mays Unit. Carry proper equipment, avoid unmarked shortcuts, observe trail-use rules and check wind, lightning and summer heat before committing to exposed routes.",
    ],
    visitorFaqs: [
      { question: "How much does Franklin Mountains State Park cost?", answer: "TPWD lists $5 per day for adults and free admission for children 12 and under. Primitive campsites have separate nightly charges. Verify up-to-date fees and purchase passes with TPWD before arrival.", sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains" },
      { question: "Which entrance should I use?", answer: "Use Tom Mays for park headquarters, camping, the Nature Walk and North Franklin Peak. Use the northeast access near Chuck Heinrich Memorial Park for Tin Mines and Cardiac Road–Maze. McKelligon Canyon and Smugglers Pass/Ron Coleman have separate trailheads. Follow the official park map.", sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/map" },
      { question: "Can you camp with an RV, water and electricity?", answer: "TPWD lists five primitive drive-up sites for self-contained RVs. There are no water or electric hookups. There are also 14 walk-in tent sites and group sites in Tom Mays; reserve in advance.", sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/fees-facilities/campsites" },
      { question: "Is North Franklin Peak an easy hike?", answer: "No. TPWD rates the 8-mile summit outing strenuous and estimates four to six hours. It is exposed and rocky, and hikers should prepare for large elevation changes, weather shifts and abundant water needs.", sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit" },
      { question: "Are dogs allowed at Franklin Mountains State Park?", answer: "Pets are allowed under state-park rules; keep dogs on a leash no longer than six feet, carry water and clean up waste. Pets generally cannot enter state park buildings. Confirm any special restrictions with park staff.", sourceUrl: "https://tpwd.texas.gov/publications/pwdpubs/media/park_maps/pwd_mp_p4501_124d.pdf" },
      { question: "Does the park have drinking water or showers at campsites?", answer: "TPWD explicitly says the primitive campsites lack water, and its campsite inventory does not promise showers. Bring all water you will need and call (915) 444-9100 to verify current restrooms and accessible facilities.", sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/fees-facilities/campsites" },
    ],
    authorityGuide: {
      whyItMatters: "The rugged Franklins make El Paso unusual: from a city street, visitors can reach steep desert ridges, long mountain-bike routes and primitive overnight camps. Knowing which entrance matches your itinerary matters as much as choosing the trail.",
      assessment: {
        recommendedVisit: "A morning for Nature Walk or a half-day for Tin Mines; allow a full day for North Franklin Peak and extra time for the correct access point.",
        physicalEffort: "Moderate to high",
        weatherExposure: "Fully outdoors",
        planningLevel: "High",
        familyFit: "Nature Walk and the bird blind can work for families; peak routes and long exposed trails are not beginner outings.",
        firstTimeValue: "The Tom Mays Nature Walk is the best low-commitment introduction; choose your trailhead in advance.",
      },
      itineraries: [
        { label: "First-time nature outing", duration: "1–2 hours", steps: ["Enter the Tom Mays Unit with a day pass.", "Walk the ¾-mile Nature Walk and visit the bird blind.", "Spend time photographing the desert slopes, then depart before the hottest hours."] },
        { label: "Half-day northeast hike", duration: "3–4 hours", steps: ["Reserve admission in advance and use northeast access near Chuck Heinrich Memorial Park.", "Hike the 6-mile Tin Mines round trip with sufficient water.", "Return to El Paso for an indoor museum or meal; do not add a second exposed hike without time and water."] },
        { label: "Experienced summit outing", duration: "4–6 hours", steps: ["Check weather, alerts and official trail map and start early from Tom Mays.", "Hike the strenuous 8-mile North Franklin Peak route.", "Descend before dark; allow additional time for breaks and a safety margin."] },
      ],
      sources: [
        { label: "TPWD park overview, fees and hours", url: "https://tpwd.texas.gov/state-parks/franklin-mountains", scope: "park size, operations, day-use fee, elevation, climate, rock climbing and conservation" },
        { label: "TPWD directions and entrance map", url: "https://tpwd.texas.gov/state-parks/franklin-mountains/map", scope: "four access points, headquarters address and coordinates" },
        { label: "TPWD trail recommendations", url: "https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit", scope: "trail distances, difficulty and time estimates" },
        { label: "TPWD campsite listings", url: "https://tpwd.texas.gov/state-parks/franklin-mountains/fees-facilities/campsites", scope: "site counts, prices, vehicle restrictions and no-water/no-electric facilities" },
        { label: "TPWD natural history", url: "https://tpwd.texas.gov/state-parks/franklin-mountains/nature", scope: "bird life, mammals, Chihuahuan Desert plants" },
        { label: "University of Texas Bureau of Economic Geology", url: "https://www.beg.utexas.edu/texas-through-time/franklin-mountains.html", scope: "regional geology and exposed rock formations" },
      ],
    },
  };
}
