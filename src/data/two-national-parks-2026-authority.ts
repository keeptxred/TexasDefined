import type { Destination, DestinationAuthorityGuide } from "./types";

/** October 17, 2026 official NPS operator review.
 * Do not confuse Big Bend's canceled Chisos Basin project closure with
 * genuine storm-damaged road access, or Guadalupe's Mountain-Time gates
 * with Central Time. Existing licensed exact-place hero is preserved.
 */
interface FederalParkFacts {
  code: string; summary: string; entry: string; highlights: string[];
  body: string[]; faqs: Array<[string,string]>;
  sources: Array<[string,string,string]>;
  itineraries: DestinationAuthorityGuide["itineraries"];
}
const PARK_FACTS: Readonly<Record<string,FederalParkFacts>> = {
  "big-bend-national-park": {
  "code": "bibe",
  "summary": "Explore Big Bend's Chisos Mountains, Chihuahuan Desert and Rio Grande canyons using current NPS road closures, campground reservations and correct 2026 Chisos Basin construction status.",
  "entry": "As of the October 15, 2026 NPS conditions update, the planned 2026 Chisos Basin shutdown was canceled. Chisos facilities remain accessible subject to real local notices; many primitive roads and the Cottonwood–Santa Elena paved link are closed after storms. All frontcountry NPS campsites require reservations.",
  "highlights": [
    "Chisos Basin access remains available despite canceled renovation closure",
    "Santa Elena Canyon: Terlingua Creek crossing varies with floods",
    "Ross Maxwell Scenic Drive: check closure and turnaround",
    "Campground and remote backcountry permitting are distinct"
  ],
  "body": [
    "Big Bend National Park covers an immense region of Chihuahuan Desert, Chisos Mountains and Rio Grande canyons. It is not a single trailhead or a quick detour: Panther Junction, the Chisos Basin, Rio Grande Village and Santa Elena Canyon are separated by large driving distances. Organize the trip by geographic district, verify fuel and drinking-water stops before entering, and allow a day for even one demanding hiking area rather than relying on short map distances.",
    "The most important 2026 visitor correction is construction status. The National Park Service announced that the planned Chisos Mountains Lodge reconstruction and Chisos Basin closure would not proceed as originally scheduled because of funding and design complications. Older NPS pages still describe a May 2026 shutdown, but the agency's April 2026 cancellation notice and October 15 conditions page show Chisos Basin visitor services operating with their own posted hours. Do not cancel a trip or advertise a closure on the strength of the obsolete construction timeline.",
    "Severe-weather and flood damage still create genuine closures elsewhere. In its October 15 conditions update, NPS listed the paved connection from Cottonwood Campground toward Santa Elena Canyon, Old Maverick, Grapevine Hills, Hot Springs, Paint Gap, River Road East and West, portions of Glenn Springs, Old Ore and Black Gap among closed or restricted roads. These are dated conditions, not permanent classifications. Use official NPS current notices on the morning of travel; an ordinary sedan, rental SUV or RV must never be directed onto high-clearance four-wheel-drive primitive roads.",
    "The famous Santa Elena Canyon Trail begins with a crossing of Terlingua Creek. Mud, flash floods or current water can make the crossing impassable, even if the canyon is visible from the road. Do not encourage hikers to ford flowing water or continue across a washed-out entry. Likewise, a Rio Grande boating itinerary depends on water levels, backcountry permits, legal launch/landing rules and shuttles. A scenic photograph of the river is no substitute for a current river report.",
    "NPS requires reservations for developed park campgrounds rather than assuming first-come sites, and a separate backcountry permit for designated remote camps and river trips. No dispersed roadside 'boondocking' is allowed wherever a vehicle can pull off; stay at the exact permitted site. NPS prohibits wood and ground fires across the park but permits charcoal in suitable above-ground grills under its standing rules, subject to any stricter temporary fire notice. Check campground and concessions status independently, as seasonal Cottonwood closures and changing Chisos restaurant service affect meal and lodging plans."
  ],
  "faqs": [
    [
      "Did Big Bend close the Chisos Basin in 2026?",
      "No. The planned construction-related Chisos Basin closure was canceled, according to the NPS April 2026 notice. Check current 2026 conditions for real temporary closures and facility hours."
    ],
    [
      "Can I drive to Santa Elena Canyon on any park road?",
      "No. NPS listed multiple roads and the Cottonwood–Santa Elena paved connection closed after 2026 storms. Use official current conditions and never substitute an unsuitable dirt road."
    ],
    [
      "Do Big Bend's NPS campgrounds accept walk-in overnight arrivals?",
      "No. NPS states developed campgrounds require advance reservations. Backcountry camps and river trips need separate permits, and arbitrary roadside camping is not permitted."
    ]
  ],
  "sources": [
    [
      "NPS Big Bend current closures",
      "https://www.nps.gov/bibe/planyourvisit/conditions.htm",
      "2026 roads, visitor facilities and Santa Elena access"
    ],
    [
      "NPS canceled Chisos construction",
      "https://www.nps.gov/bibe/planyourvisit/construction-cancelled.htm",
      "Construction closure canceled; supersedes old project schedule"
    ],
    [
      "NPS campground rules",
      "https://www.nps.gov/bibe/planyourvisit/camping.htm",
      "Developed campground reservations and fire restrictions"
    ],
    [
      "NPS permits and reservations",
      "https://www.nps.gov/bibe/planyourvisit/permitsandreservations.htm",
      "Backcountry, river and campground permits"
    ]
  ],
  "itineraries": [
    {
      "label": "Chisos-and-desert orientation",
      "duration": "Half to full day",
      "steps": [
        "Review NPS road/visitor-center conditions at Panther Junction",
        "Visit the Chisos Basin only if the road remains officially open",
        "Choose one signed trail suited to heat and ability",
        "Return with adequate fuel and daylight"
      ]
    },
    {
      "label": "Ross Maxwell scenic corridor",
      "duration": "Half day or more",
      "steps": [
        "Confirm that the chosen paved scenic segments are open",
        "Use accessible, signed overlooks rather than closed dirt roads",
        "Check Santa Elena Canyon Trail's Terlingua Creek crossing",
        "Turn around if water or closure blocks legal access"
      ]
    },
    {
      "label": "Overnight backcountry plan",
      "duration": "Two or more days",
      "steps": [
        "Select a specific legally accessible campsite/route",
        "Obtain the correct NPS reservation or backcountry permit",
        "Carry self-sufficient water and emergency provisions",
        "Confirm current weather, trail and road conditions before departure"
      ]
    }
  ]
},
  "guadalupe-mountains-national-park": {
  "code": "gumo",
  "summary": "Hike Guadalupe Peak, the Pine Springs area and McKittrick Canyon with accurate Mountain Time visitor schedules, trail elevation gain, short-day gate closures and limited West Texas services.",
  "entry": "Park generally open year-round, but Guadalupe Mountains follows MOUNTAIN TIME, not Central Time. Pine Springs Visitor Center 8 a.m.–4 p.m. Mountain; McKittrick Canyon gate is locked at 5 p.m. Mountain. Guadalupe Peak is an 8.4-mile round trip with about 3,000 feet of climbing.",
  "highlights": [
    "Guadalupe Peak: Texas highest natural point, strenuous climb",
    "Pine Springs visitor center and campground gateway",
    "McKittrick Canyon day-use gate closes at 5 p.m. Mountain",
    "Pinery Butterfield stage station history near Pine Springs"
  ],
  "body": [
    "Guadalupe Mountains National Park protects a sharply rising Permian fossil-reef landscape at the western edge of Texas. Pine Springs, McKittrick Canyon and Dog Canyon are separate visitor areas that cannot be compressed into one general-use pin. The park is in the Mountain Time Zone, an easily overlooked one-hour difference from many Texas travelers' expectations; an unreliable cellular phone clock can compound mistakes when gates close.",
    "Guadalupe Peak is the state's highest natural point, but the summit hike should not be described as an easy overlook walk. NPS lists a 4.2-mile climb each way from Pine Springs with approximately 3,000 feet of elevation gain, meaning an 8.4-mile round trip with steep switchbacks and long stretches exposed to wind. Hiking time depends on conditions and experience. Carry substantial water and food, use durable trail shoes, and choose a shorter signed route if the weather or abilities do not support an all-day ascent.",
    "Visitor services follow separate schedules. NPS lists Pine Springs Visitor Center open around 8 a.m. to 4 p.m. Mountain Time, except several major holidays. McKittrick Canyon is a day-use area open about 8 a.m. to 5 p.m. Mountain Time, and its entrance gate is locked at 5 p.m. The McKittrick contact station and Dog Canyon Ranger Station operate intermittently, depending on staffing; do not advertise these as reliably staffed each day just because the area itself is accessible.",
    "The desert environment can change rapidly. Winter can bring icy sections and severe winds at elevation, while summer brings punishing heat on exposed climbs. Pine Springs and Dog Canyon camps differ in road access and amenities, and backpackers need to check current wilderness permit rules separately from developed camping. In this remote part of West Texas, food, fuel and lodgings are not immediately inside the park; begin the drive with adequate supplies and know where you will sleep.",
    "An ideal first visit distinguishes short historical interpretation from a demanding mountaineering hike. The Pinery interpretive route near Pine Springs provides Butterfield Overland Mail history, while the McKittrick Canyon corridor offers seasonally changing vegetation and long trails within specific gate hours. Do not recommend both a summit climb and a late-day McKittrick outing on a tight schedule: time-zone errors and the locked gate can turn that into an unsafe plan."
  ],
  "faqs": [
    [
      "What time zone is Guadalupe Mountains National Park in?",
      "Mountain Time. Check your watch rather than assuming the Central Time used by most of Texas."
    ],
    [
      "How long is the Guadalupe Peak Trail?",
      "NPS lists a 4.2-mile climb each way, around 8.4 miles round trip, with roughly 3,000 feet of elevation gain."
    ],
    [
      "Can I leave McKittrick Canyon after 5 p.m.?",
      "No. NPS states its gate closes and locks at 5 p.m. Mountain; all visitors must exit on time."
    ]
  ],
  "sources": [
    [
      "NPS Guadalupe Mountains operating hours",
      "https://www.nps.gov/gumo/planyourvisit/hours.htm",
      "Mountain Time and separately managed park contact points"
    ],
    [
      "NPS Guadalupe Mountains trail descriptions",
      "https://www.nps.gov/gumo/planyourvisit/trails.htm",
      "Peak ascent distances, elevation and short trail options"
    ],
    [
      "NPS Guadalupe Mountains visitor planning",
      "https://www.nps.gov/gumo/planyourvisit/index.htm",
      "Visitor areas, camping and trail planning"
    ],
    [
      "NPS Guadalupe Mountains conditions",
      "https://www.nps.gov/gumo/planyourvisit/conditions.htm",
      "Latest operational alerts"
    ]
  ],
  "itineraries": [
    {
      "label": "Short Pine Springs and Pinery visit",
      "duration": "1–3 hours",
      "steps": [
        "Check the Pine Springs Visitor Center's Mountain Time hours",
        "Review fossil-reef/geology interpretation",
        "Walk a signed short route toward the historic Pinery site if accessible",
        "Check the current weather and return before dark"
      ]
    },
    {
      "label": "Guadalupe Peak summit day",
      "duration": "Most of a full day",
      "steps": [
        "Begin early at the Pine Springs trailhead",
        "Carry enough water, food and weather protection for an 8.4-mile climb",
        "Use only the signed hiking trail and avoid dangerous shortcuts",
        "Turn back in severe wind, thunderstorm or unsafe conditions"
      ]
    },
    {
      "label": "McKittrick Canyon visit",
      "duration": "Half day or more",
      "steps": [
        "Check access and travel time to the separate McKittrick entrance",
        "Arrive within the posted 8 a.m.–5 p.m. Mountain window",
        "Walk an appropriate canyon route and avoid late-day overcommitment",
        "Exit the gate before it locks at 5 p.m."
      ]
    }
  ]
},
};

export function applyTwoNationalParkAuthorities(destination: Destination): Destination {
  const patch = PARK_FACTS[destination.slug];
  if (!patch) return destination;
  try {
    const u = new URL(destination.officialUrl ?? "");
    if (u.protocol!=="https:" || !["nps.gov","www.nps.gov"].includes(u.hostname) ||
       !(u.pathname===`/${patch.code}` || u.pathname.startsWith(`/${patch.code}/`))) return destination;
  } catch { return destination; }
  const before = (destination.body ?? []).filter(Boolean);
  const prior = before.join(" ");
  const additions = patch.body.filter(p=>!prior.includes(p.slice(0,90)));
  return {
    ...destination,
    summary: patch.summary, entryNote:patch.entry,
    highlights:patch.highlights,
    body: prior.length>2000 ? [...before,...additions] : patch.body,
    visitorFaqs: [...(destination.visitorFaqs ?? []).filter(old=>!patch.faqs.some(([q])=>q===old.question)),
      ...patch.faqs.map(([question,answer])=>({question,answer,sourceUrl:patch.sources[0][1]}))],
    authorityGuide: {
      whyItMatters: patch.body[0].slice(0,225),
      assessment: {
        recommendedVisit: patch.entry,
        physicalEffort: "Moderate to high",
        weatherExposure: "Mostly outdoors",
        planningLevel: "High",
        familyFit: "Choose an itinerary by actual district, day length, safety and visitor fitness, not by park-map proximity",
        firstTimeValue: patch.highlights[0]
      },
      itineraries: patch.itineraries,
      sources: patch.sources.map(([label,url,scope])=>({label,url,scope}))
    },
    sourceCheckedAt:"2026-10-17"
  };
}
