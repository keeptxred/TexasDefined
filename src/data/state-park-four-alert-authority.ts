import type { Destination } from "./types";
/** Four 2026 park-specific notices tied to TPWD originals. No synthetic all-clear or invented closures. */
const parkNotes: Readonly<Record<string, { entryNote: string; body: string[]; visitorFaqs: NonNullable<Destination["visitorFaqs"]> }>> = {
  "dinosaur-valley-state-park": {
  "entryNote": "TPWD 2026 burn ban: no wood or charcoal fires; containerized fuel stoves allowed. All regular park access closes December 6–10, 2026 and January 10–14, 2027 for permitted hunting. Check Paluxy River track access after rain.",
  "body": [
    "Dinosaur Valley's visitor experience revolves around tracks preserved in limestone along the Paluxy River, so the activity a visitor actually gets depends on water level and the named track site rather than simply whether the front gate is open. The park's electric, walk-in and remote primitive campsite classes also have distinct requirements; remote sites involve mandatory river crossing, and access can be impossible during high water.",
    "The TPWD park alert available through the official index reports a wood AND charcoal fire ban dating from August 24, 2026. It permits containerized fuel stoves for cooking but not a conventional campsite fire or charcoal grill. The notice separately identifies full-park closures for ordinary visitors from 10 p.m. December 6 until noon December 10, 2026, and from 10 p.m. January 10 until noon January 14, 2027, for permitted hunting.",
    "A visitor planning to see tracks should verify water levels, track-site access and guided programs before travel, rather than interpreting a historic photograph of exposed tracks as a promise they will be visible. The detailed alert page could not be reloaded on October 17, so confirm the latest official restrictions and reserve day passes or sites when necessary."
  ],
  "visitorFaqs": [
    {
      "question": "Are wood or charcoal fires allowed at Dinosaur Valley?",
      "answer": "No, the TPWD alert index lists a 2026 burn ban on both. Containerized fuel stoves such as propane can be used for cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/dinosaur-valley/alert"
    },
    {
      "question": "Is Dinosaur Valley open during winter permitted hunts?",
      "answer": "TPWD lists full regular-visitor closures December 6–10, 2026, and January 10–14, 2027. Confirm times before travel.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/dinosaur-valley/alert"
    }
  ]
},
  "caddo-lake-state-park": {
  "entryNote": "The TPWD boat ramp has been closed for low lake water since August 28, 2026, and an August 13 ban prohibits wood and charcoal fires; propane/containerized fuel cooking remains permitted. Verify permitted paddling access separately.",
  "body": [
    "Caddo Lake State Park is both a historic CCC-built camping destination and a gateway to a complex cypress-and-bayou lake ecosystem. Getting onto the water is a separate logistical question from booking a cabin or campsite: motorboats, kayak launches and guided paddle trips use different access points and may be affected differently by water levels. The existence of a water-focused park never guarantees every kind of boat launch is usable.",
    "TPWD's alert index identifies a low-water closure of the park's boat ramp beginning August 28, 2026, and an August 13 burn ban that prohibits both wood and charcoal. Containerized fuel stoves may still be used for cooking. This is not evidence that the entire lake or all paddling access has shut down; a visitor must confirm the exact access point and appropriate craft with TPWD or the managing outfitter.",
    "Campers should distinguish Woodpecker Hollow RV-only full-hookup campsites, Armadillo Run/Squirrel Haven electric campsites and the tent-only Mill Pond sites. A car or RV reservation is not transferable to another loop without checking the permitted equipment. The October 17 live detail fetch failed, so treat the previously published official alert as a reason to call ahead rather than an independently verified all-clear."
  ],
  "visitorFaqs": [
    {
      "question": "Can I launch a motorboat at Caddo Lake State Park?",
      "answer": "TPWD reported its boat ramp closed due to low water. Check for reopening and separate legal launches rather than assuming the park's ramp works.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/caddo-lake/alert"
    },
    {
      "question": "Can I use charcoal at Caddo Lake State Park?",
      "answer": "TPWD lists a burn ban on wood and charcoal fires. Cooking on containerized fuel stoves is allowed, subject to the latest alert.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/caddo-lake/alert"
    }
  ]
},
  "brazos-bend-state-park": {
  "entryNote": "TPWD 2026 burn restrictions prohibit WOOD fires but permit charcoal or containerized cooking stoves. Full park hunting closures November 17–19 and December 15–17; October 24–25 restriction applies only to group campground and pavilion.",
  "body": [
    "Brazos Bend is a wildlife-watching state park southwest of Houston with wetland trails and lakes where alligators, birds and other animals are part of the visit. Its developed Burr Oak and Red Buckeye campgrounds, short-walk primitive sites and restricted youth-group facilities represent different booking needs. The group's pavilion closure is not a closure of every lakeside walking route or of the whole state park.",
    "The TPWD official park alert available from its published index names a wood-fire burn ban dating to August 28, 2026. This rule permits charcoal cooking and containerized fuel stoves, so it should never be summarized as 'no charcoal allowed'. It also lists complete closures to ordinary visitors November 17–19 and December 15–17, 2026, for permitted hunting. A narrower October 24–25 closure affects only the group camp and pavilion.",
    "Plan hiking around the weather, marked wetlands and wildlife safety; keep a wide berth from alligators, use designated paths and never approach or feed animals. Book campsites and day entry when needed, and confirm the latest TPWD alert before departure. The live detail page was unavailable during the October 17 review, so recheck the stated restrictions with the park rather than relying on old listings."
  ],
  "visitorFaqs": [
    {
      "question": "Is charcoal cooking prohibited at Brazos Bend?",
      "answer": "No. The TPWD wood-fire ban expressly permits charcoal and containerized fuel stoves for cooking under the referenced notice.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/brazos-bend/alert"
    },
    {
      "question": "Will the whole park close October 24–25?",
      "answer": "No, the TPWD alert identifies only the group camp area and pavilion for October 24–25; separate whole-park hunting closures occur November 17–19 and December 15–17.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/brazos-bend/alert"
    }
  ]
},
  "government-canyon-state-natural-area": {
  "entryNote": "TPWD October 16 burn ban prohibits wood and charcoal fires; cooking stoves allowed. Visitor Center closed October 22; full natural-area hunting closures occur in November, December and January. Reserve and check affected dates.",
  "body": [
    "Government Canyon State Natural Area near San Antonio protects an important Hill Country landscape, including a protected habitat area whose trail access is seasonal. Visitors should not interpret a single state-natural-area map pin as permission to use every trail all year: TPWD restricts its protected habitat trails to September through February, while other open areas still have weather and special-event restrictions. The demanding route to dinosaur tracks crosses rocky terrain and prohibits pets.",
    "TPWD's October 16, 2026 burn ban covers both wood and charcoal fires; containerized cooking-fuel stoves may be used. The Visitor Center closes on October 22, with self-pay and online reservations serving as stated alternatives. That single-day building closure is not itself a full-area closure, and a visitor planning a trail day must distinguish the park's different access controls.",
    "The official park alert also lists entire-natural-area closures to ordinary visitors from late November 16 to early November 20, late November 30 to early December 7, late January 4 to early January 8, and late January 11 to early January 15 for permitted hunting. Confirm the exact 10 p.m./7 a.m. boundary times with the TPWD notice and reserve day use or walk-in tent camping in advance. RV guests should not mistake the area's walk-in tent pads for developed hookup sites."
  ],
  "visitorFaqs": [
    {
      "question": "Can I make a charcoal fire at Government Canyon?",
      "answer": "No. TPWD's October 16, 2026 burn ban prohibits both charcoal and wood fires; containerized fuel stoves may be used for cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/government-canyon/alert"
    },
    {
      "question": "Does the October 22 Visitor Center closure close every trail?",
      "answer": "The alert announces the Visitor Center closure on that date and gives self-pay/online alternatives. Separately listed hunting windows are whole-area closures; follow posted current restrictions.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/government-canyon/alert"
    },
    {
      "question": "Can I bring an RV to Government Canyon's walk-in campsites?",
      "answer": "The TPWD individual and group tent campsites require carrying gear from parking; they do not provide drive-in RV hookup sites.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/government-canyon/alert"
    }
  ]
},
};
export function applyFourParkAlertAuthority(destination: Destination): Destination {
  const facts = parkNotes[destination.slug];
  if (!facts || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl ?? "")) return destination;
  const text = (destination.body ?? []).join(" ");
  return {
    ...destination,
    entryNote: facts.entryNote,
    body: [...(destination.body ?? []), ...facts.body.filter(p => !text.includes(p.slice(0, 85)))],
    visitorFaqs: [
      ...(destination.visitorFaqs ?? []).filter(old => !facts.visitorFaqs.some(f => f.question === old.question)),
      ...facts.visitorFaqs
    ],
    sourceCheckedAt: "2026-10-17"
  };
}
