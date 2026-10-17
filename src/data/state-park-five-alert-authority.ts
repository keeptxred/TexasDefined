import type { Destination } from "./types";
/** Five operator-source-grounded visitor guides checked 2026-10-17. No duplicate destinations or automatic authority certification. */
const FIVE_PARKS: Readonly<Record<string, { entryNote: string; body: string[]; visitorFaqs: NonNullable<Destination["visitorFaqs"]> }>> = {
  "bastrop-state-park": {
  "entryNote": "No wood or charcoal fires under 2026 TPWD burn ban; containerized fuel stoves for cooking permitted. Main lake reopened but not stocked—use Lake Mina for fishing.",
  "body": [
    "Bastrop State Park offers the historic Civilian Conservation Corps pine-forest park experience near Bastrop, where scenic Park Road 1C links the broader Lost Pines landscape to Buescher State Park. Choosing the actual campsite loop matters: Piney Hill has full-hookup RV sites but prohibits tents, Copperas Creek accepts different equipment, and Deer Run and Creekside involve tent-only or walk-in camping with separate parking rules.",
    "TPWD's August 2026 burn restriction rules out BOTH wood and charcoal fires, while containerized cooking-fuel stoves are allowed. The main lake has reopened after work but TPWD warns that it is not stocked, so anglers should not treat 'lake open' as 'stocked fishing.' The agency directs fishing visitors to Lake Mina. Check the current alert and water conditions before planning a lake-focused trip."
  ],
  "visitorFaqs": [
    {
      "question": "Can I use charcoal at Bastrop State Park?",
      "answer": "No. TPWD's 2026 burn-ban notice forbids wood and charcoal fires while permitting containerized cooking-fuel stoves.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/bastrop/alert/"
    },
    {
      "question": "Can I fish the main lake at Bastrop?",
      "answer": "The main lake is open but was not stocked under the checked notice. TPWD identifies Lake Mina as the fishing alternative; verify conditions before travel.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/bastrop/alert/"
    }
  ]
},
  "cedar-hill-state-park": {
  "entryNote": "TPWD advises advance day-use reservations, weather- and maintenance-dependent trail openings, and campsite preparation for non-stinging Argentine ants.",
  "body": [
    "Cedar Hill State Park sits on Joe Pool Lake in the Dallas–Fort Worth area and combines prairie remnants, limestone hills, water recreation and the Penn Farm historic landscape. That variety makes a one-day plan possible, but a Penn Farm walking visit, a DORBA mountain-bike outing, a Shoreline Trail walk and overnight primitive camping have different maps, surfaces and equipment needs. TPWD provides separate recreational trail and interpretive maps, including the farm self-guided material.",
    "TPWD advises reservations during busy weekends and holidays. Trails may close during wet weather or maintenance to protect the landscape; an older dated 'all trails open' banner should never override the latest trail-status feed. Argentine ants have been found in some campsites. TPWD says they do not sting, but campers should inspect and protect their gear and vehicles, and avoid applying indiscriminate treatments that harm the park's natural resources."
  ],
  "visitorFaqs": [
    {
      "question": "Are Cedar Hill's trails always open?",
      "answer": "No. TPWD closes trails for wet weather and maintenance; check the current trail-status notice even if an earlier posting said all trails were open.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/cedar-hill/alert"
    },
    {
      "question": "What should campers know about Argentine ants?",
      "answer": "TPWD reports non-stinging invasive Argentine ants in some campsites and advises precautions around camping equipment and vehicles.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/cedar-hill/alert"
    }
  ]
},
  "lake-livingston-state-park": {
  "entryNote": "Lake Livingston boat ramp water very low, with exposed trees/stumps. Campsite improvements may cause temporary closures through December 2026. Confirm your booked loop and launch.",
  "body": [
    "Lake Livingston State Park is a Pineywoods reservoir destination north of Houston that pairs boating, fishing and swimming with wooded campsites and park trails. A campground booking and a boating plan are not the same decision: Piney Shores, Red Oak, Yaupon, Pin Oak, Hercules and Briar have different RV, electric, tent and minimum-stay rules. In particular, Briar's water-only sites prohibit RVs and generators. Follow the exact reserved loop rather than a broad 'lake campsite' description.",
    "TPWD's August 26, 2026 alert says water at the boat ramp is very low, creating a hazard from exposed trees and stumps. It does not guarantee that launching a boat is safe simply because lake recreation is still listed. The September 9 construction notice also anticipates temporary campsite closures through December 2026. Travelers should reconfirm the named site and ramp conditions before setting off, especially with a large trailer or an itinerary built around fishing from a boat."
  ],
  "visitorFaqs": [
    {
      "question": "Is the Lake Livingston boat ramp safe to use?",
      "answer": "TPWD warns of very low ramp water and exposed trees and stumps. Inspect current official conditions and avoid assuming normal launch access.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-livingston/alert"
    },
    {
      "question": "Will all Lake Livingston campsites be available in late 2026?",
      "answer": "Not necessarily. TPWD announced construction and temporary campsite closures through December 2026, so confirm the exact reserved site.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-livingston/alert"
    }
  ]
},
  "lake-mineral-wells-state-park": {
  "entryNote": "Strict TPWD Aug 30, 2026 fire ban prohibits ALL fires, including wood, charcoal, and even propane/containerized fuel stoves. Check before bringing cooking gear.",
  "body": [
    "Lake Mineral Wells State Park and its Trailway present different experiences: the lake and park campsites are clustered around the developed recreation area, while the longer linear former-railway corridor serves riders, hikers and cyclists beyond the ordinary park loop. TPWD lists Live Oak and Plateau electric camps, Post Oak water-only sites, a Cross Timbers equestrian campground and remote primitive camps that require a significant walk. Do not confuse a trailway destination with the campground's main entrance or assume every camping area has drinking water.",
    "The official August 30, 2026 park notice is unusually strict: it prohibits ALL fires, including wood, charcoal and containerized cooking stoves such as propane. This is materially different from common Texas burn bans where propane remains permitted. Camping and meal plans need to account for that prohibition—never suggest switching from a campfire to propane as an automatic solution here. Confirm TPWD's current restrictions before travel and prepare a fire-free meal plan if still in effect."
  ],
  "visitorFaqs": [
    {
      "question": "Can I cook on a propane stove at Lake Mineral Wells during the burn ban?",
      "answer": "No. Unlike bans that exempt propane, TPWD's August 30 notice explicitly prohibits containerized fuel stoves along with wood and charcoal fires.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/alert"
    },
    {
      "question": "Are the park camping loops and Trailway the same entrance?",
      "answer": "No. The main lake campsites and linear Trailway have different approaches and trailheads. Use the official maps to reach the intended site.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/alert"
    }
  ]
},
  "lake-somerville-state-park": {
  "entryNote": "Birch Creek Unit has a wood-only burn ban; charcoal and containerized fuel stoves allowed. Birch Creek pavilion and pier closures plus waterfowl-season partial trail closures require unit-specific planning.",
  "body": [
    "Lake Somerville is a two-unit park complex with Birch Creek and Nails Creek located on different approaches to the reservoir, linked by a long Trailway. The named entrance dictates where the campsites, equestrian facilities, trail access and lakeside recreation can actually be found. TPWD distinguishes Birch Creek's developed camps from Nails Creek's equestrian sites and remote primitive Trailway camping; water and restroom availability vary accordingly.",
    "TPWD's September 2026 notice bans WOOD fires at Birch Creek while allowing supervised charcoal cooking and containerized fuel stoves. Do not apply this particular unit rule to Nails Creek without checking its notice. The Birch Creek pavilions are closed and the fishing pier remains out of service. Flag Pond and Waldo's Loop areas may close from sunrise to noon during named duck and other waterfowl hunt seasons, but those partial trail restrictions are not a statement that both whole park units close for the day."
  ],
  "visitorFaqs": [
    {
      "question": "Is charcoal allowed at the Birch Creek Unit?",
      "answer": "Under the checked TPWD notice, Birch Creek prohibits wood fires but permits charcoal cooking and containerized fuel stoves. Confirm the current alert.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-somerville/alert"
    },
    {
      "question": "Are all Lake Somerville trails closed during waterfowl hunts?",
      "answer": "No. TPWD identifies specific Flag Pond and Waldo's Loop areas with sunrise-to-noon restrictions during designated seasons; the entire two-unit system is not described as closed.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-somerville/alert"
    }
  ]
},
};
export function applyFiveParkAuthorityAlerts(destination: Destination): Destination {
  const facts = FIVE_PARKS[destination.slug];
  if (!facts || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl ?? "")) return destination;
  const previous = (destination.body ?? []).join(" ");
  return {
    ...destination,
    entryNote: facts.entryNote,
    body: [...(destination.body ?? []), ...facts.body.filter(p=>!previous.includes(p.slice(0,85)))],
    visitorFaqs: [
      ...(destination.visitorFaqs ?? []).filter(q=>!facts.visitorFaqs.some(f=>f.question===q.question)),
      ...facts.visitorFaqs
    ],
    sourceCheckedAt: "2026-10-17"
  };
}
