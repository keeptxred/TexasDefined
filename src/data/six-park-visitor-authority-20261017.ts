import type { Destination } from "./types";

/** Exact TPWD visitor source research dated October 17, 2026.
 * Original place-specific images, geography and substantial previous content
 * remain intact. A read official page != full editorial/photo/SEO acceptance.
 */
type ParkGuide = Pick<Destination, "entryNote"|"body"|"highlights"|"visitorFaqs">;
const PARK_GUIDES: Readonly<Record<string,ParkGuide>> = {
  "abilene-state-park": {
  "entryNote": "TPWD October 2026 alerts: Lake Abilene is closed to boating, kayak rentals, swimming and fishing because of low water. Abilene State Park swimming pool is closed for renovations. Wood, charcoal and pellet fires prohibited; propane cooking stoves allowed.",
  "body": [
    "Abilene State Park is a historic woodland escape south of Abilene, where Civilian Conservation Corps buildings and campground trails make an appealing outdoor day even while some popular aquatic activities are unavailable. The park has separate developed camping sections such as Brushy Trail, Oak Grove and Pecan Grove, plus group areas. Campers should use TPWD's loop map and reservation categories rather than assuming every pad accommodates a large recreational vehicle.",
    "Do not plan this park as an October 2026 swimming-pool getaway. TPWD's pool page explicitly says the pool is closed for renovations, even though the page still describes ticket prices and seasonal ticket sales for normal operating periods. Those published price references are not proof of reopening. The former CCC pool may be a point of historical interest, but current access must be verified directly with TPWD before any itinerary promises swimming.",
    "Lake Abilene has a separate access road southwest of the main park entrance. Its posted low-water alert closes the boat ramps and suspends kayak rentals; swimming and fishing are not allowed. This is a lake-specific closure, not a statement that every campsite, woodland trail or park building is closed. Travelers must also respect seasonal authorized-hunt lake closures listed on the official alert and should not transfer lake launch instructions into a route to the main camping entrance.",
    "TPWD's August 11 fire notice prohibits wood, charcoal and pellet fires and permits containerized cooking fuel such as propane. This matters even in campground areas with visible fixed grills. For a first trip, prioritize a signed forest walk, CCC buildings and a picnic in a permitted area, then confirm camping and accessible facilities with the park. Families with a primary goal of swimming or paddling should choose an independently verified open alternative instead of relying on old pool or lake photographs."
  ],
  "highlights": [
    "Historic CCC structures and shaded campground trails",
    "Park swimming pool closed for renovations—not a currently bookable pool outing",
    "Lake Abilene restrictions: no fishing, swimming, ramps or kayak rental",
    "Distinct campsite loops and access for trailers, tents and group lodging"
  ],
  "visitorFaqs": [
    {
      "question": "Can I swim in Abilene State Park's historic pool now?",
      "answer": "No. TPWD labels the pool closed for renovations; published ordinary ticket prices do not establish that it has reopened.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    },
    {
      "question": "Can I fish or launch a kayak on Lake Abilene?",
      "answer": "No. The low-water notice closes ramps and suspends kayaking, swimming and fishing at the lake; verify any future change with TPWD.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    },
    {
      "question": "Are charcoal campfires permitted at Abilene State Park?",
      "answer": "No. TPWD's August 2026 rule prohibits wood, charcoal and pellet fires, but permits containerized propane cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    }
  ]
},
  "balmorhea-state-park": {
  "entryNote": "San Solomon Springs pool normally open 8 a.m.–7:30 p.m. or sunset, whichever comes first, with no lifeguards; the normal pool closes about a week annually for cleaning, typically in early May. Scuba divers need an advance park day pass and pay a separate diving charge. Alert details could not be independently retrieved Oct 17, 2026.",
  "body": [
    "Balmorhea State Park preserves the striking contrast between desert scenery and a large spring-fed swimming pool. San Solomon Springs supports clear water and aquatic life, but this is an active public swimming facility rather than an unrestricted natural lake. The historic CCC-era park setting, pool facilities and San Solomon Springs Courts offer different activities and reservations; renting a room is not automatically a license for any diving service.",
    "TPWD lists the pool open during ordinary operations from 8 a.m. until 7:30 p.m. or sunset, whichever comes first. No lifeguard is on duty, the pool reaches depths near 25 feet, and swimmers younger than fifteen require continuous responsible adult supervision. Only soft-sided inflatable floats within stated size limits are allowed; paddles, powered devices and oversized flotation equipment are not. Treat published hours as general rules subject to posted cleaning and park alerts.",
    "Swimming has no extra separate admission beyond a park day-use fee, but scuba diving is different. Divers and instructors are told to reserve day-use entry before traveling and pay the additional diving fee at check-in. If visiting with limited swimming skills or children, do not portray the deep pool as a uniformly shallow wading area. Confirm accessible entry options and note that TPWD describes restroom accessibility limitations at some older facilities.",
    "For overnight visits, 18 back-in water/electric campsites are distinct from 15 pull-through spaces, and some individual locations are tent-only or prohibit tents. Check the reserved site and equipment before arriving after dark, when gate codes and check-in conditions apply. TPWD notes an annual weeklong pool closure typically in early May for cleaning. The separately published active-alert details could not be fetched during October 17 research, so the guide must not claim that no temporary closure or condition is in force."
  ],
  "highlights": [
    "Clear spring-fed San Solomon Springs pool and desert setting",
    "No lifeguard: supervised swimming, 25-foot depth and seasonal closing rules",
    "Separate advance-access requirements for scuba divers",
    "Historic San Solomon Springs Courts and distinct RV campsite categories"
  ],
  "visitorFaqs": [
    {
      "question": "Is a lifeguard on duty at Balmorhea's spring-fed pool?",
      "answer": "No. TPWD says swimmers enter at their own risk, children under fifteen require adult supervision and the pool reaches deep water.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/balmorhea/swimming-and-scuba-diving"
    },
    {
      "question": "Do scuba divers need separate access arrangements?",
      "answer": "Yes. Divers and instructors must reserve a park day-use pass to guarantee entry and pay an additional diving fee at check-in.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/balmorhea/swimming-and-scuba-diving"
    },
    {
      "question": "Is the Balmorhea pool open without interruption year-round?",
      "answer": "No. TPWD describes an annual cleaning closure, typically about one week in early May, plus other possible alerts. Verify conditions for the exact visit.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/balmorhea/swimming-and-scuba-diving"
    }
  ]
},
  "buescher-state-park": {
  "entryNote": "Lake lower than normal in October 2026; cabins, Oak Haven and Lakeview campground areas no longer have lake views or access. Fishing remains possible from designated day-use picnic and canoe-launch areas. Wood/charcoal fires prohibited; propane cooking stoves allowed.",
  "body": [
    "Buescher State Park is a quieter Lost Pines-area destination east of Bastrop, sharing a regional landscape and scenic drive context with neighboring Bastrop State Park. The park's Civilian Conservation Corps buildings, forested trails and compact lake support a modest camping or walking weekend without assuming a large reservoir excursion. Buescher's cabins and campsites offer distinct equipment rules and should be booked by specific named loop.",
    "The most consequential current lake fact is low water. The June 2026 TPWD alert says that cabins and the Oak Haven and Lakeview campgrounds do not currently have a view of or access to the lake. That overrides older advertisements of lake-view cabins or waterfront campsites. TPWD says fishing is still available from designated day-use picnic and canoe-launch locations; it does not say the entire lake is closed to every visitor.",
    "Accommodation types matter: Cozy Circle and Oak Haven have electrical campsites, Lakeview's water-only sites are for tents rather than ordinary RV parking, and walk-in primitive camping is reserved and accessed differently. Some sites require carrying gear away from parking, and Lakeview has Friday/Saturday minimum-stay restrictions. Select the right campground, especially when fishing access now involves a separate day-use approach.",
    "The August 24, 2026 fire restriction prohibits both wood and charcoal while permitting containerized propane cooking. TPWD's park visitor materials also identify woods hiking, biking, paddling where conditions permit and group facilities. A good first-day itinerary combines a signed forest walk, the CCC landscape and any verified lakefront day-use spot; an overnight visitor should not expect a short walk from a cabin to the water under present low-lake conditions."
  ],
  "highlights": [
    "30-acre Buescher park lake with reduced access due to low water",
    "CCC-built cabins and historic group picnic shelter",
    "Wooded hiking and cycling near neighboring Bastrop State Park",
    "Separate Cozy Circle, Oak Haven, Lakeview and primitive tent accommodations"
  ],
  "visitorFaqs": [
    {
      "question": "Can I see the Buescher lake from a lakeview campsite?",
      "answer": "Not under the June 2026 low-water alert. TPWD says cabins, Oak Haven and Lakeview campsites have no lake view or lake access at current levels.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    },
    {
      "question": "Is fishing still possible at Buescher?",
      "answer": "Yes, TPWD lists fishing from the designated picnic and canoe-launch day-use areas despite low lake water.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    },
    {
      "question": "Are wood and charcoal fires permitted?",
      "answer": "No. TPWD prohibits both under the August 24 ban but permits containerized propane cooking stoves.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    }
  ]
},
  "caprock-canyons-state-park": {
  "entryNote": "TPWD\u0027s April 10, 2026 notice says the marked Lake Theo swimming area, boat ramp and fishing pier are closed because of low water, but lake swimming is still permitted. Ask TPWD where lawful swimming access remains before entering the water. Observe bison from at least 50 yards. The park trails and separate long-distance Trailway need different maps; primitive Trailway camps have no potable water or campfires.",
  "body": [
    "Caprock Canyons State Park and Trailway near Quitaque combine redrock escarpment landscapes, a protected Texas bison herd and a long rail-trail corridor. The signed routes inside the state park are not the same as every mile of the Trailway, and choosing a long-distance segment requires a separate map and access plan. TPWD describes more than twenty-five miles of park trails and an approximately ninety-mile combined trail network when the Trailway is counted.",
    "Bison are large, fast wild animals that routinely travel road and recreation areas. TPWD requires visitors to give the herd at least fifty yards of space and never surround, honk at or pressure animals out of a road. If a bison lowers its head, paws at the ground, raises its tail or changes behavior because of a nearby visitor, retreat. Do not recommend close photographs, touching calves or driving through a herd as a safe family activity.",
    "Lake Theo is a small no-wake recreation lake with fishing and swimming opportunities. TPWD\u0027s April 10, 2026 alert closes the marked swim area, boat ramp and fishing pier because of low lake levels but explicitly says swimming in the lake is still permitted. Do not interpret an overall permission to swim as permission to enter a closed area; confirm exactly where the park allows access. The main park campgrounds, Lake Theo walk-ins and remote primitive areas have distinct electrical hookup, restroom and water arrangements.",
    "The Trailway's primitive sites are not short car-camping options: TPWD lists a minimum seven-mile hike or bike approach, no potable water, pack-out trash rules and no campfires, though containerized stoves may be permitted. Download the separate park and Trailway maps, reserve entry during busy seasons and fill the vehicle before entering remote roads. The separate active-alert detail was not independently retrievable on October 17, so any trail, water or local-water-system advisory should be confirmed directly with TPWD before travel."
  ],
  "highlights": [
    "Free-ranging Texas State Bison Herd; stay at least 50 yards away",
    "Redrock canyon hikes and the separate Caprock Trailway",
    "Lake Theo swimming and water recreation subject to level and access",
    "Trailway primitive camping with long hike and no water"
  ],
  "visitorFaqs": [
    {
      "question": "How close may visitors approach the Caprock Canyons bison?",
      "answer": "TPWD instructs visitors to stay at least fifty yards away, yield on the road and retreat if an animal changes behavior.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/caprock-canyons/bison"
    },
    {
      "question": "Are Trailway primitive campsites drive-up RV spots?",
      "answer": "No. TPWD lists at least a seven-mile hike or bike to primitive Trailway camping and no potable water.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/caprock-canyons/bison"
    },
    {
      "question": "Can I swim in Lake Theo without checking current conditions?",
      "answer": "No. TPWD\u0027s April 10, 2026 alert says the marked Lake Theo swimming area is closed due to low lake levels but swimming in the lake is still allowed. Ask park staff about approved shoreline access and conditions.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/caprock-canyons/alert"
    }
  ]
},
  "colorado-bend-state-park": {
  "entryNote": "Whole park closed to regular visitors Oct 19, 5 p.m.–Oct 22, 2 p.m.; Nov 5–8, Nov 16–19, Dec 3–6 and Dec 14–17, 2026 for permitted hunts. Gorman Springs and part of Old Gorman Road trails closed for tree maintenance. Wood/charcoal fires banned; propane cooking only.",
  "body": [
    "Colorado Bend State Park along the Colorado River is a rugged Hill Country destination with more than thirty-five miles of hiking and cycling routes, spring-fed pools, river paddling and underground cave tours. These activities are not interchangeable: swimming at Spicewood Springs is described by TPWD as a separate designated experience, while the fragile Gorman Falls waterfall and travertine formations must be protected from entering, climbing, fishing, wading or swimming.",
    "The fall access schedule is especially important in October 2026. TPWD lists complete regular-public closures from 5 p.m. October 19 to 2 p.m. October 22, November 5–8, November 16–19, December 3–6 and December 14–17 for permitted hunting. These are not partial-trail warnings. The Gorman Springs Trail and part of the Old Gorman Road Trail are separately closed for tree work under a September notice; other properly opened trails may have different status outside the whole-park closure windows.",
    "TPWD's July 21, 2026 burn ban rules out both wood and charcoal fires; cooking with a containerized propane stove is allowed subject to current restrictions. Wilderness camps do not have the same water and restroom amenities as developed riverside areas. Some campsites require walking gear to the river, while others require longer backcountry hikes. Cave tours require reservations, and visitors should not assume they can enter undeveloped caves alone.",
    "Gorman Falls is a seventy-foot natural attraction reached on rocky and sometimes slippery terrain. Avoid promising it as a wheelchair-accessible or stroller-ready path. On hot days TPWD recommends carrying roughly a liter of water per person per hour of hiking, and much of the park is exposed. A realistic trip chooses one major outing—falls, Spicewood swimming, river paddling or a reserved cave tour—then checks TPWD alerts and reservation inventory for that exact date."
  ],
  "highlights": [
    "Gorman Falls: protected fragile travertine, no swimming or climbing",
    "Spicewood Springs: separate designated swimming area",
    "Backcountry and riverside campground equipment limits",
    "Partial trail maintenance and whole-park seasonal hunt closures"
  ],
  "visitorFaqs": [
    {
      "question": "Can visitors swim in Gorman Falls?",
      "answer": "No. TPWD prohibits swimming, wading, climbing and fishing in the fragile falls and creek area. Spicewood Springs is a separate permitted swimming location.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/colorado-bend/alert"
    },
    {
      "question": "Is Colorado Bend open October 20, 2026?",
      "answer": "No for ordinary visitors. TPWD lists an October 19 at 5 p.m. to October 22 at 2 p.m. whole-park permitted-hunt closure.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/colorado-bend/alert"
    },
    {
      "question": "Can I use a charcoal grill at Colorado Bend in October 2026?",
      "answer": "No. The TPWD burn restriction bans wood and charcoal fires but allows containerized propane cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/colorado-bend/alert"
    }
  ]
},
  "fort-parker-state-park": {
  "entryNote": "Both TPWD fishing piers remain closed under January 2025 notice; road resurfacing from Oct 2026 through May 2027 can temporarily close facilities, campsites and trails, with nature center renovations expected into spring 2027. Wood/charcoal ban, propane allowed.",
  "body": [
    "Fort Parker State Park occupies a green crossroads of the Navasota River and Lake Fort Parker south of Mexia, with camping, small-craft paddling, hiking and Civilian Conservation Corps history. TPWD promotes the 5.3-mile Limestone Bluffs Paddling Trail for suitable paddlers who confirm current river conditions and a legal launch and return. A historic group barracks and cabin accommodation system is not a typical waterfront hotel, so booking rules should be checked before promising beds, showers or pet accommodation.",
    "Visitors relying on fishing piers need a warning at the top of their trip plan: TPWD's January 2025 alert states both fishing piers are closed. That is not the same as a lakewide fishing ban, and visitors should use only lawful, currently accessible fishing locations. The park still advertises kayak and canoe rentals during suitable weather, but exact launch and rental points can change with event notices and road work.",
    "TPWD announced October 2026 through May 2027 road resurfacing, with possible temporary campsite, trail and facility closures. Other construction is affecting the day-use, cabin, screened-shelter and campground zones, and the Nature Center is undergoing renovations expected into spring 2027. Booking a cabin does not establish a quiet resort-like setting while this work proceeds. Travelers should confirm their exact campground loop and parking route before arriving.",
    "Camp choices include water/electric spaces, one specialized tent-only electric site, water-only tent sites and a separately supervised youth group area. The fixed site facilities and shower distances vary by loop. The July 28, 2026 burn ban prohibits wood and charcoal fires but allows containerized propane cooking stoves. A responsible visit combines a permitted wooded walk with CCC interpretation or a verified lake activity rather than assuming the closed fishing piers or renovated facilities will be available."
  ],
  "highlights": [
    "750-acre Fort Parker Lake, paddling and Navasota River landscape",
    "Both park fishing piers currently closed",
    "CCC history and group barracks campus with distinct booking rules",
    "Road and Nature Center construction through 2027"
  ],
  "visitorFaqs": [
    {
      "question": "Are Fort Parker's fishing piers open?",
      "answer": "No. Both piers were listed closed in the January 2025 TPWD notice; other legal fishing access must be checked separately.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert/"
    },
    {
      "question": "Will construction affect a Fort Parker camping reservation?",
      "answer": "Possibly. TPWD describes resurfacing from October 2026 through May 2027 and related intermittent campground and facility disruptions.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert/"
    },
    {
      "question": "Can I use wood or charcoal for a campfire?",
      "answer": "No. The park's 2026 burn notice prohibits wood and charcoal fires and allows containerized propane cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert/"
    }
  ]
},
};
export function applySixParkVisitorAuthorityGuide(destination: Destination): Destination {
  const update=PARK_GUIDES[destination.slug];
  if (!update || !(destination.officialUrl ?? "").startsWith("https://tpwd.texas.gov/state-parks/")) return destination;
  const existing=(destination.body??[]).filter(Boolean);
  const prior=existing.join(" ");
  const added=update.body.filter(p=>!prior.includes(p.slice(0,85)));
  return {
    ...destination,
    entryNote:update.entryNote,
    highlights:update.highlights,
    body: prior.length>1800 ? [...existing,...added] : update.body,
    visitorFaqs:[...(destination.visitorFaqs??[]).filter(q=>!update.visitorFaqs?.some(f=>f.question===q.question)),...(update.visitorFaqs??[])],
    sourceCheckedAt:"2026-10-17"
  };
}
