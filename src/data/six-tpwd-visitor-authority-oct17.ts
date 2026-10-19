import type { Destination } from "./types";
/**
 * Six independently sourced October 17, 2026 TPWD operational authority guides.
 * No generic statewide access assumptions; retain older verified destination
 * identities, original photographs, county links, and longer unique research.
 */
const SIX_PARK_VISITOR_GUIDES: Readonly<Record<string, {
  entryNote:string;
  body:string[];
  visitorFaqs: NonNullable<Destination["visitorFaqs"]>;
}>> = {
  "abilene-state-park": {
  "entryNote": "Lake Abilene boat ramps, fishing, swimming and kayak rentals are unavailable due to low water, and the separate park swimming pool is closed for renovation. Current ban prohibits wood, charcoal and pellet fires; propane cooking allowed. TPWD lists scheduled lake-only hunt closures.",
  "body": [
    "Abilene State Park, southwest of town near Buffalo Gap, is not a guarantee of access to Lake Abilene. The state park's campground, woodland trails and historic facilities have separate entry from the reservoir road. TPWD's official October 2026 alert lists Lake Abilene boat ramps closed, kayaking rentals suspended, and swimming and fishing prohibited because of low water. The reservoir's hunting closure dates do not automatically indicate that every state park campsite is closed.",
    "TPWD also reports that the Abilene State Park swimming pool is closed for renovation. That is a different aquatic amenity from Lake Abilene: an old pool photograph or seasonal fee table must not be used as an opening promise. Families seeking a water day should choose another verified destination instead of driving here expecting pool access or a boat launch.",
    "The August 11, 2026 burn ban prohibits wood, charcoal and pellet fires, while containerized cooking fuel such as propane remains allowed under the posted notice. Campsites in Brushy Trail, Oak Grove and Pecan Grove have varying utilities and restroom distances; the Group Trailer Area is another arrangement. Select the reservation's precise loop and review local restrictions rather than making campfire assumptions based on a campsite image.",
    "Lake Abilene also has separately posted permit-only hunting closure dates in late fall and winter. TPWD's alert page does not specify years for every listed lake closure; confirm those exact date ranges with park staff before planning a specific winter fishing or wildlife day. The park's existing outdoor and historic features remain options subject to normal day passes and any new notices."
  ],
  "visitorFaqs": [
    {
      "question": "Can I launch a boat or fish in Lake Abilene right now?",
      "answer": "TPWD's active alert closes boat ramps and prohibits fishing and swimming because of low water; kayaking rentals are also suspended. Check for official reopening.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    },
    {
      "question": "Is the Abilene State Park swimming pool open?",
      "answer": "No. TPWD's separately published renovation notice lists it closed. Do not rely on older seasonal pool information.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    },
    {
      "question": "Are charcoal or wood fires allowed?",
      "answer": "No. The posted burn ban prohibits wood, charcoal and pellets; contained propane cooking equipment is still permitted.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/abilene/alert"
    }
  ]
},
  "buescher-state-park": {
  "entryNote": "Lake water is low: cabin, Oak Haven and Lakeview campground access and lake views are unavailable, while the picnic/canoe-launch day-use area still permits fishing. No wood or charcoal fires; contained fuel stoves permitted.",
  "body": [
    "Buescher State Park near Smithville has a wooded, historic CCC landscape linked to Bastrop State Park by the hilly twelve-mile Park Road 1C. Its small lake, cabin sites and campground loops are not all along the same accessible shore. A visitor choosing a cabin for a lake view needs to read the current TPWD notice: the lake has fallen too low to be viewed or accessed from the cabins, Oak Haven or Lakeview campsites.",
    "TPWD's June 22, 2026 notice still allows fishing from the day-use picnic and canoe-launch areas. That is not a promise of shore fishing beside a cabin or campground tent. The August 24 burn ban also prohibits wood and charcoal fires, though contained-fuel stoves such as propane remain acceptable for cooking under the official notice.",
    "The different overnight choices matter for booking. Cozy Circle and Oak Haven are water-and-electric campsite loops, while Lakeview includes tent-only water sites, some requiring a walk from the parking area. The five primitive walk-in sites are first-arrival use rather than ordinary advance online reservations. Historic CCC-built cabins have separate facility arrangements and do not each contain full private bathrooms.",
    "Visitors can still enjoy forest hiking and biking even when a lakeside cabin view is unavailable. TPWD lists nearly six miles of park trails; CCC Crossover and Big Tree Trace are not open to mountain biking, while other trails are. A first visit can pair a short woodland walk with the historic CCC features, and driving the scenic connector to Bastrop should be planned with sufficient daylight and road conditions in mind."
  ],
  "visitorFaqs": [
    {
      "question": "Can I walk from my Buescher cabin to the water?",
      "answer": "Not under the June 2026 low-water notice. TPWD reports no access or views from cabins and Oak Haven/Lakeview campsites; fishing remains possible in specified day-use areas.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    },
    {
      "question": "Are all campsites suitable for RVs?",
      "answer": "No. Lakeview's water-only sites are tent-only, and primitive sites are walk-in. Select Cozy Circle/Oak Haven or another documented RV-compatible option.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    },
    {
      "question": "May I burn charcoal at Buescher?",
      "answer": "No. TPWD's burn ban prohibits wood and charcoal fires but permits contained cooking fuel stoves.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/buescher/alert"
    }
  ]
},
  "eisenhower-state-park": {
  "entryNote": "Because of road construction TPWD directs drivers to Highway 75 Exit 72. Fossil Ridge fishing pier is closed. Trails may close in wet conditions, and trail status must be checked before walking or biking.",
  "body": [
    "Eisenhower State Park overlooks Lake Texoma near Denison, with rocky shoreline, camping loops and trails that are easy to confuse with a general Lake Texoma boat launch. The official park map distinguishes developed overnight sites, walk-in areas and shoreline facilities. Visitors should decide whether their priority is fishing, walking, camping or exploring lakeside scenery before following a broad reservoir map pin.",
    "TPWD's April 28, 2026 road notice instructs visitors to use Highway 75 Exit 72 during construction. A May 7 alert closes the Fossil Ridge fishing pier. That is a specific pier closure, not a statement that every Lake Texoma fishing opportunity has ended. The park also says trails close after wet weather; review its separate trail-status updates immediately before a planned hike or mountain-bike trip.",
    "Eisenhower offers several campsite types. The full-hookup, electric, Elm Point premium water-only and Armadillo Hill/Fossil Ridge water-only sites have different service arrangements. Water spigots may be shared between premium and regular water-only campsites rather than located at each individual tent pad. A small number of overflow spaces are not advance-reservable, so they should not be advertised as confirmed bookings.",
    "During a weekend visit, reserve the exact site suited to the vehicle, check construction routing and bring a backup walk if rain closes the planned trail. Families expecting a convenient fishing pier should not assume that the closed Fossil Ridge pier is accessible, especially when the park still advertises general fishing. The operator's live notices are more reliable than generalized campground lists for same-day use."
  ],
  "visitorFaqs": [
    {
      "question": "Which Highway 75 exit should I use?",
      "answer": "TPWD's 2026 construction notice directs traffic to Exit 72; check updated routing before traveling.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/eisenhower/alert"
    },
    {
      "question": "Can I fish from Fossil Ridge pier?",
      "answer": "No. TPWD lists the Fossil Ridge fishing pier closed, although the notice does not prohibit all fishing around Lake Texoma.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/eisenhower/alert"
    },
    {
      "question": "Are all trails open after rain?",
      "answer": "No. TPWD closes trails during wet conditions. Consult the current park trail status.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/eisenhower/alert"
    }
  ]
},
  "fort-boggy-state-park": {
  "entryNote": "Part of Lake Trail is closed for maintenance, but other trails are open under TPWD's alert. The entire park closes to regular visitors Nov 15–20 and Nov 29–Dec 4, 2026, and Jan 17–22, 2027 for permitted hunts.",
  "body": [
    "Fort Boggy State Park near Centerville offers a small lake, wooded trails, picnic areas and a few overnight cabins in a quieter setting than many reservoir parks. It is a place where choosing one feasible walk or a lake day makes more sense than advertising an extensive trail network regardless of actual maintenance conditions.",
    "TPWD's June 28, 2026 alert says a large portion of Lake Trail is closed because of maintenance and wet conditions. The agency describes all other trails as open under that dated notice. That is neither a full-park hiking closure nor confirmation of a lake trail loop; follow current maps and trail barricades, and avoid planning a loop that requires the restricted segment.",
    "Entire-park hunting closures affect ordinary visitors from noon November 15 to 2 p.m. November 20, noon November 29 to 2 p.m. December 4 in 2026, and noon January 17 to 2 p.m. January 22 in 2027. Only permitted hunters may enter during these periods. Regular visitors planning a winter cabin stay or a day pass should compare the exact check-in and checkout dates to the closure notice.",
    "The park has five cabins plus primitive hike-in camping, and the cabins require a walk from main parking rather than offering a drive-up resort-style front door. TPWD identifies accessible amenities, including cabin five. Families should check the specific cabin's linens, shower arrangement and current reservation rules rather than infer details from a generic park lodging gallery. An ordinary daytime lake walk remains feasible outside restrictions if staff confirms open trails."
  ],
  "visitorFaqs": [
    {
      "question": "Is the Fort Boggy Lake Trail fully open?",
      "answer": "No. TPWD reports a large part closed for maintenance and wet conditions; other trails remained open under its dated notice.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-boggy/alert"
    },
    {
      "question": "Will the entire park close for permitted hunts?",
      "answer": "Yes, for the November 15–20 and November 29–December 4, 2026 windows and January 17–22, 2027; confirm precise hours and current alerts.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-boggy/alert"
    },
    {
      "question": "Can I park beside a Fort Boggy cabin?",
      "answer": "Not generally. TPWD says the cabins require a walk from parking; cabin five offers accessible design features.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-boggy/alert"
    }
  ]
},
  "fort-parker-state-park": {
  "entryNote": "Both fishing piers closed. Low lake water makes motorboat launching inadvisable. Road and nature-center construction may close camping and trail areas through May 2027. Current ban prohibits wood/charcoal but allows propane.",
  "body": [
    "Fort Parker State Park surrounds a lake and a wooded historic landscape near Mexia and Groesbeck, with a mixture of lakeside campsites, cabins and paddling opportunities. Some brochures still feature two fishing piers and scenic reservoir boating. Those features do not establish that the piers or a low-water trailer launch are currently usable.",
    "TPWD's active alert lists both fishing piers closed, warns against launching motorized boats at low lake elevation and describes construction noise and facility interruptions. TxDOT road resurfacing is scheduled from October 2026 through May 2027, with temporary campsite, trail and facility closures possible. Nature Center renovations were expected to extend through spring 2027. A visitor looking for a particular pier, museum program or quiet cabin should confirm access before booking.",
    "The July 28, 2026 burn ban prohibits wood and charcoal fires but allows propane and other containerized cooking fuel. This matters for visitors expecting a lakeside grill; camping equipment shown in photographs does not override TPWD's actual fire restriction. Park camping distinguishes twenty-four electric/water sites, a separate electric tent-only site and water-only tent spaces with shared spigots.",
    "Camping and nearby history can still make the trip worthwhile if a planned fishing-pier outing is unavailable. Choose an officially accessible shore location or trail, check whether roadwork affects the reserved area, and use the park's current map to reach the correct entrance. Do not treat the supervised youth-group area as a regular private family campsite."
  ],
  "visitorFaqs": [
    {
      "question": "Are Fort Parker's fishing piers open?",
      "answer": "No. TPWD's current alert lists both fishing piers closed.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert"
    },
    {
      "question": "Can I launch a motorized boat at Fort Parker?",
      "answer": "TPWD warns that low lake levels make motorized launching inadvisable; consult the park before towing a boat.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert"
    },
    {
      "question": "Will road construction affect campsites?",
      "answer": "Possibly. TPWD plans resurfacing through May 2027 and warns that some facilities, trails and campsites may close temporarily.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert"
    }
  ]
},
  "galveston-island-state-park": {
  "entryNote": "Fountains serving campsites 71–95 are out of service and certain storm-damaged boardwalks are closed. A September 28, 2026 high-tide forecast was time-limited: confirm new tides and road closures, not that old prediction.",
  "body": [
    "Galveston Island State Park has two meaningfully different experiences: Gulf-facing beachside recreation and bayside wetlands, paddling and birding across the island. Campsites on the bay side are about a mile and a half from the Gulf beach, and booking a bayside site does not put a tent directly beside the surf. Storm tides, wind and sea conditions can affect which parts of the park are practical for a particular visit.",
    "The TPWD alert says drinking fountains near campsites 71 through 95 are out of service because of a water-line break. Campers in that range should bring their own water and confirm the nearest working source at check-in. Flood damage also leaves certain boardwalks closed. These are precise facility restrictions, not grounds to declare that every birding trail or boardwalk is inaccessible.",
    "The same TPWD alert retains a September 28 notice forecasting higher tides over the following week. By October 17 that forecast is historical, not a prediction of current or future flooding. Check the latest tide guidance and road-access messages instead of repeating the old alert as if it said a high tide is occurring now.",
    "Camping options differ by side of the park and by tent versus RV suitability. Some beachside tent-platform sites do not have adjacent vehicle parking, while certain bayside water-only sites prohibit vehicles longer than eighteen feet. Choose by the actual campground map, check weather and beach safety, and never assume that a bay camping reservation includes a gulf-front site or safe ocean swimming."
  ],
  "visitorFaqs": [
    {
      "question": "Do campsites 71–95 have working drinking fountains?",
      "answer": "No. TPWD lists their drinking fountains out of service; check with staff for working water and bring enough.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/galveston-island/alert"
    },
    {
      "question": "Are all Galveston Island boardwalks closed?",
      "answer": "No. TPWD identifies certain flood-damaged boardwalks; follow posted closures and current trail maps.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/galveston-island/alert"
    },
    {
      "question": "Is a September high-tide alert still a forecast for today?",
      "answer": "No. Its forecast covered a week after September 28, 2026. Check updated coastal tide and road conditions for the actual travel date.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/galveston-island/alert"
    }
  ]
},
};
export function applySixParkOctoberVisitorAuthority(destination:Destination):Destination {
  const facts=SIX_PARK_VISITOR_GUIDES[destination.slug];
  if (!facts || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl ?? "")) return destination;
  const old=(destination.body ?? []).filter(Boolean);
  const oldText=old.join(" ");
  const additions=facts.body.filter(p=>!oldText.includes(p.slice(0,95)));
  return {
    ...destination,
    entryNote:facts.entryNote,
    body:oldText.length>1900 ? [...old,...additions] : facts.body,
    visitorFaqs:[...(destination.visitorFaqs ?? []).filter(q=>!facts.visitorFaqs.some(n=>n.question===q.question)),...facts.visitorFaqs],
    sourceCheckedAt:"2026-10-17",
  };
}
