import type { Destination } from "./types";

/**
 * October 17, 2026 park-by-park source-based editorial copy. The primary
 * public TPWD pages and dated alert URLs are linked in the authority facts
 * registry. This is destination content, NOT automatic site acceptance.
 * Never use this to certify photo rights, accessible rendering or SEO.
 */
type ParkUpdate = Pick<Destination, "highlights"|"entryNote"|"body"|"visitorFaqs">;
const PARK_UPDATES: Readonly<Record<string, ParkUpdate>> = {
  "atlanta-state-park": {
  "highlights": [
    "Wright Patman Lake fishing and two park boat ramps",
    "4.8 miles of hiking trails through pine and hardwood",
    "58 reservable campsites in three named camping areas",
    "Designated swimming and paddling with no lifeguard"
  ],
  "entryNote": "October 17, 2026 TPWD review: wood and charcoal fires prohibited; containerized fuel stoves permitted. Regular visitors are excluded during specified December 2026 and January 2027 permitted-hunting closures. Reserve day use or overnight entry; check the current TPWD alert.",
  "body": [
    "Atlanta State Park stands along Wright Patman Lake in the far northeast corner of Texas, where pines and hardwoods provide a shaded contrast to more exposed reservoir parks. The 33,750-surface-acre lake is the geographic center of the visit; the park itself has two boat ramps, designated swimming and shoreline fishing. Water recreation depends on real lake levels and weather, and TPWD warns that its designated swimming area has no lifeguard.",
    "For a walk-focused visit, choose one of the park's 4.8 miles of trails, which include a shorter 0.8-mile nature trail. The forest is good for birding and spring or autumn color, so an itinerary need not be built around summer swimming. TPWD also advertises geocaching, bicycles on hilly roads and nature programs that include Caddo history. Keep the emerald ash borer county quarantine in mind: do not move firewood out of the affected area.",
    "The 58 campsites are not interchangeable. Knights Bluff, Wilkins Creek and White Oak Ridge have different site dimensions, electrical service and distances to restrooms. Fourteen sites have sewer service in addition to the water-and-electric service present at the full camping inventory; guests should pick the exact named campsite type, especially for a large RV or specific accessibility requirement. The separate group pavilion is a different reservation from an overnight campsite.",
    "The TPWD park alert checked October 17, 2026 lists a ban on both wood and charcoal fires, with containerized fuel stoves allowed. It also announces closures to ordinary visitors from noon November 30 to 8 a.m. December 4, noon December 27 to 8 a.m. December 31, and noon January 15 to 8 a.m. January 19 for permitted hunts. These restrictions matter far more to a weekend plan than the general statement that the park is usually open daily. Reconfirm dates and entry before purchasing supplies or driving to the gate."
  ],
  "visitorFaqs": [
    {
      "question": "Can I make a campfire at Atlanta State Park?",
      "answer": "TPWD's October 17 alert lists a burn ban prohibiting wood and charcoal fires; containerized fuel stoves may be used. Recheck before travel.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/atlanta/alert"
    },
    {
      "question": "Can I visit Atlanta during the winter hunting closures?",
      "answer": "No. TPWD lists complete regular-public closures on specified dates in December 2026 and January 2027, with access limited to permitted hunters.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/atlanta/alert"
    }
  ]
},
  "bonham-state-park": {
  "highlights": [
    "65-acre Bonham State Park Lake with 5-mph boat limit",
    "8.75 miles of hiking and mountain biking trails",
    "Civilian Conservation Corps history and preserved park landscape",
    "Separate individual campsites and organized group camp"
  ],
  "entryNote": "TPWD's current park homepage indicates an active alert, but the detailed alert was inaccessible during October 17, 2026 research; contact the park directly for restrictions. Individual reservations and the separate organized group camp require different arrangements.",
  "body": [
    "Bonham State Park is a comparatively compact North Texas outing centered on a 65-acre lake and a landscape shaped by Civilian Conservation Corps work during the Great Depression. That origin is not a decorative detail: the trails, lake setting and built features make it a place to combine a low-key outdoor day with an introduction to New Deal-era park construction. The lake and surrounding hills offer a very different pace from a large interstate reservoir.",
    "Hikers and cyclists have 8.75 miles of trails to choose from. The easier 1.3-mile Lake Loop connects close lake views and plant life, while the 2.7-mile Bois d'Arc Trail explores more challenging CCC-era terrain. TPWD recommends using its trails information to choose an appropriate route and stresses that trail surfaces and weather can change the difficulty. For children or mixed-mobility groups, choose the trail before committing to a time or distance.",
    "Lake recreation includes fishing, swimming and small-craft paddling; boats must observe the posted 5-mph speed limit. TPWD provides a pier and ramp and advertises canoe, kayak and paddle-boat rentals generally from 8 a.m. until 3 p.m., weather permitting. Those are operator-provided conditions, not a guaranteed rental appointment. If fishing from the park, check the park's tackle availability, bait and current Texas state-park fishing rules.",
    "Overnight choices include individual water-and-electric campsites and a separately booked group camping area, plus other group facilities with different capacities. Do not compare the group camp with an ordinary one-family RV site or assume they share the same online reservation path. During the October 17 source check the TPWD landing page signaled active alerts but the alert detail could not be retrieved; the guide must not imply that no restrictions are in force. Call the park before booking a trip dependent on a trail or swimming area."
  ],
  "visitorFaqs": [
    {
      "question": "How long are Bonham State Park's hiking trails?",
      "answer": "TPWD lists 8.75 miles of hiking and biking trails, including the 1.3-mile Lake Loop and 2.7-mile Bois d'Arc Trail.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/bonham"
    },
    {
      "question": "Does the lake allow high-speed boating?",
      "answer": "No. TPWD reports a 5-mph speed limit on the 65-acre park lake.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/bonham"
    },
    {
      "question": "Are there any current Bonham State Park alerts?",
      "answer": "TPWD's public landing page displayed an active-alert notice during review, but the detailed notice was unavailable. Ask the park about current closures before leaving.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/bonham"
    }
  ]
},
  "daingerfield-state-park": {
  "highlights": [
    "74-acre Little Pine Lake for paddling and fishing",
    "2.4-mile Rustling Leaves loop and 0.8-mile Mountain View Trail",
    "CCC-built Bass Lodge, group hall and pavilion",
    "Cabins, full-hookup and tent-only camping categories"
  ],
  "entryNote": "Daingerfield displayed an active TPWD park-alert banner on October 17, 2026, but the alert details could not be independently retrieved. Verify current access before reserving cabins, paddling equipment or camping.",
  "body": [
    "Daingerfield State Park is built around 74-acre Little Pine Lake under dense Northeast Texas pine and hardwood forest. The setting lends itself to a quieter combination of walking, fishing, paddling and a lakeside overnight stop rather than a full-scale motorboat trip. TPWD notes a 5-mph limit on lake boats and offers a fishing pier, boat ramp and a variety of rentable paddle craft. Fishing rules and seasonal rentals need checking for the specific visit.",
    "Choose a trail by terrain rather than mileage alone. The 2.4-mile Rustling Leaves Trail circles the lake and is described as an easier park walk, while the shorter 0.8-mile Mountain View Trail climbs to a high point. Forest shade is not a substitute for water or heat planning during summer, and surfaces can be slick after rain. TPWD identifies the park as a spring-wildflower and autumn-color destination, with birding possible throughout the year.",
    "The Civilian Conservation Corps history gives Daingerfield a second point of interest beyond the lake. CCC crews built the dam and facilities including Bass Lodge, the group hall and pavilion. Today the park has a mix of individual campsites, historic cabins and group facilities; it is essential to distinguish a Cedar Ridge tent-only site from a Big Pine full-hookup pull-through or a staffed rental cabin. The store and equipment rental desk run on their own schedules.",
    "TPWD's main visitor guide reported an active-alert banner on October 17, 2026, but the linked alert was unavailable to independently verify the exact restriction. No claim of fully open trails, unrestricted fires or guaranteed rentals is made here. Before travel, check directly with TPWD and make sure the chosen campsite or cabin is still in service. The primary entrance is on Park Road 17 east of Daingerfield, and drivers should choose the correct campground after entering."
  ],
  "visitorFaqs": [
    {
      "question": "Is Little Pine Lake a large motorboating lake?",
      "answer": "No. It is 74 acres, and TPWD sets a 5-mph speed limit. Fishing, low-speed boating and paddling are featured.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/daingerfield"
    },
    {
      "question": "What hikes can I do at Daingerfield?",
      "answer": "TPWD describes the 2.4-mile Rustling Leaves lake circuit and a steeper 0.8-mile Mountain View Trail.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/daingerfield"
    },
    {
      "question": "Are all Daingerfield facilities open?",
      "answer": "TPWD flags an active alert, but detail could not be independently read October 17, 2026. Ask the park before booking a particular cabin, trail or rental.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/daingerfield"
    }
  ]
},
  "cooper-lake-state-park": {
  "highlights": [
    "Two separate gates: Doctors Creek and South Sulphur",
    "Jim Chapman Lake fishing, paddling and swimming",
    "South Sulphur's 10.5-mile Buggy Whip Equestrian Trail",
    "Unit-specific cabins, screened shelters and electric sites"
  ],
  "entryNote": "October 17, 2026 TPWD alerts: South Sulphur bans wood fires but allows charcoal on supervised grills; Honey Creek launch closed for low water, Lone Pine ramp closes October 31 for an event, Coyote Run partially closes in December and the entire park closes January 8–11, 2027 to ordinary visitors.",
  "body": [
    "Cooper State Park is a two-unit system on Jim Chapman Lake, not one campground on a single road. Doctors Creek lies to the north and South Sulphur to the south. That distinction changes the visitor's drive, the correct trailhead, which cabins and campsite categories are available and whether a particular boat ramp works. Pick the exact unit before following directions or choosing an online campground reservation.",
    "On the water, both units provide access for fishing, swimming and paddling, and TPWD says single and double kayaks may be rented at either unit. There are shore, pier and boat fishing options; the Texas state-park fishing license exemption differs by where the angler fishes. South Sulphur also has screened shelters, cabins with kitchens and bathrooms, and a distinct equestrian campground. None of those should be assumed available at Doctors Creek without confirming the specific listing.",
    "An equestrian weekend is different from a swimming outing. TPWD's 10.5-mile Buggy Whip Trail at South Sulphur crosses wooded hills and creek gullies, requires negative Coggins documentation for horses and may close after rain. The park's Coyote Run Trail has a separate December hunting-period closure; that is not interchangeable with the horseback trail. Consult the unit's trail map and current conditions before packing animals or planning a long route.",
    "The TPWD alert reviewed October 17, 2026 says South Sulphur prohibits wood fires, while charcoal grilling under safe supervision and containerized stoves remain allowed. Honey Creek ramp is closed for low lake levels; TPWD distinguishes other open launch ramps and announces a special Lone Pine ramp closure October 31. Coyote Run closes December 4–21, while ordinary access to the entire park closes January 8–11, 2027. These are date- and unit-specific restrictions, not evidence that every Cooper Lake visitor activity is unavailable."
  ],
  "visitorFaqs": [
    {
      "question": "Are Doctors Creek and South Sulphur the same entrance?",
      "answer": "No. TPWD treats them as separate Cooper State Park units on opposite shores of Jim Chapman Lake, with different campgrounds and access.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/cooper-lake"
    },
    {
      "question": "Can I use a charcoal grill during the South Sulphur burn ban?",
      "answer": "As checked October 17, TPWD restricts wood fires, but allows charcoal on safely supervised grills and containerized fuel stoves.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/cooper-lake/alert"
    },
    {
      "question": "Is Honey Creek boat ramp open?",
      "answer": "The Honey Creek ramp at South Sulphur was closed for low water; check the current TPWD alert for which alternate ramps remain open.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/cooper-lake/alert"
    }
  ]
},
  "lake-bob-sandlin-state-park": {
  "highlights": [
    "9,000-acre lake with fishing pier, kayak rentals and ramp",
    "3.3 miles of woodland hiking and biking trails",
    "75 developed electric/water campsites plus primitive hike-ins",
    "Meeting point of two East Texas ecological regions"
  ],
  "entryNote": "TPWD burn ban dated October 15, 2026 prohibits wood and charcoal fires throughout Lake Bob Sandlin State Park; containerized fuel stoves are allowed. Primitive campgrounds also forbid ground fires and require a substantial walk from parking.",
  "body": [
    "Lake Bob Sandlin State Park is interesting for more than its large reservoir. TPWD describes it as the meeting point of two ecological regions, producing a varied landscape of large trees and grassland habitat. Visitors can pair lake fishing with birding and woodland walks, particularly during cooler autumn or spring weather. The adjacent lake is roughly 9,000 acres, but a developed state-park camping loop is a much smaller, managed part of the shore.",
    "The state park has 3.3 miles of wooded trails suitable for walking or biking. Water activities include fishing from a lighted pier, designated shoreline access and a boat ramp, along with kayak rentals whose availability should be checked. TPWD also identifies smaller managed fishing waters, including a Trout Pond and Brim Pond. Anglers should distinguish shore or pier exemptions from the fishing-license rules that apply to fishing from a boat.",
    "Camping choices strongly shape the trip. TPWD lists 75 developed water-and-electric campsites; some are close to the lake, while sixteen primitive hike-in sites are in the woods closer to Two-Acre Pond and require carrying gear as much as a mile from parking. These primitive areas have different toilets and are not RV pads or a guaranteed lakefront camping reservation. Cabins and screened shelters are alternative stay types, subject to their own booking conditions.",
    "A TPWD alert dated October 15, 2026 prohibits both wood and charcoal fires across the park, while allowing containerized fuel stoves such as propane. The primitive sites have an additional standing prohibition on ground fires. Do not rely on the gift shop's general firewood listing as permission to burn firewood during the current ban. Before a lake or fishing-focused trip, confirm the official alert and whether swimming and ramp access match recent water levels."
  ],
  "visitorFaqs": [
    {
      "question": "Can I burn charcoal at Lake Bob Sandlin?",
      "answer": "No. TPWD's October 15, 2026 ban includes both wood and charcoal fires, though cooking with containerized fuel stoves is permitted.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/alert"
    },
    {
      "question": "Are primitive campsites beside the lake?",
      "answer": "Not necessarily. The 16 primitive hike-in sites lie in a different wooded area, and some require a one-mile walk from parking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/fees-facilities/campsites"
    },
    {
      "question": "Does every fishing activity qualify for a license exemption?",
      "answer": "No. TPWD specifically distinguishes state-park shoreline/pier fishing from fishing out of a boat; confirm the current rules for your method.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin"
    }
  ]
},
  "lake-brownwood-state-park": {
  "highlights": [
    "Historic Civilian Conservation Corps architecture",
    "Nearly six miles of hiking with 2.9-mile Nopales Ridge bike route",
    "7,300-acre Lake Brownwood fishing, swimming and boating",
    "Renovation and hunting restrictions affecting facilities and access"
  ],
  "entryNote": "TPWD's October 17, 2026 alert: wood fires banned but charcoal grills and fuel stoves allowed; CCC recreation hall, cabins, group lodges and Lakeside Trail closed for renovations. Regular visitors excluded December 4–9, 2026 and January 3–8, 2027 hunting windows.",
  "body": [
    "Lake Brownwood State Park is a strong Civilian Conservation Corps history destination in addition to a lake outing. CCC crews built roads, stone buildings, cabins, lodges and public gathering spaces, including a historic staircase used when visitors arrived by boat for gatherings and dances. Much of that architecture remains part of the park's identity, but restoration schedules mean the mere presence of a historic building does not establish that it can be entered or booked.",
    "The 7,300-surface-acre lake supports swimming, fishing, paddling and motorboating; TPWD advertises kayak rentals at a self-service kiosk near the boat ramp. On land, the park describes nearly six miles of trails. The 2.9-mile Nopales Ridge Trail is the one open to bicycling—other trails are not automatically bike routes. Trail choices should also account for the ongoing Lakeside Trail closure, not just the mileage printed on an older map.",
    "Overnight facilities historically include 20 full-hookup campsites, other water-and-electric and tent-only areas, screened shelters, cabins and lodges. The reservation distinction is crucial: campground loops have separate equipment limits, and historic cabins and group lodges are not currently bookable merely because an undated promotional paragraph describes them. The park has closed those buildings for renovations; check the TPWD listing before proposing a family vacation or promoting a stay in a historic cabin.",
    "The TPWD alert checked October 17, 2026 prohibits wood fires but permits charcoal grilling and fuel stoves; do not convert this into a total charcoal restriction. Renovations announced August 2025 closed the recreation hall, group lodges, cabins and Lakeside Trail with an approximate 18-month timeline. Ordinary visitors are also excluded during full-park hunting closures December 4–9, 2026, and January 3–8, 2027. For any trip involving hiking, historic facilities or overnight lodging, the dated TPWD notice takes precedence over general promotional text."
  ],
  "visitorFaqs": [
    {
      "question": "Are Lake Brownwood's historic cabins open for booking?",
      "answer": "TPWD's active alert lists cabins and group lodges closed for renovations. Check official notices for any reopening before reserving or advertising them.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-brownwood/alert"
    },
    {
      "question": "Can I cycle every hiking trail at Lake Brownwood?",
      "answer": "No. TPWD states that the 2.9-mile Nopales Ridge Trail is the only hiking trail open to bicycles.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-brownwood"
    },
    {
      "question": "Are charcoal fires banned at Lake Brownwood?",
      "answer": "TPWD lists a wood-fire ban but allows charcoal cooking and containerized fuel stoves as of October 17, 2026.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-brownwood/alert"
    }
  ]
},
};

export function applyStateParkSixAuthorityWave(destination: Destination): Destination {
  const update = PARK_UPDATES[destination.slug];
  if (!update || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl ?? "")) return destination;
  // Older imported destination bodies can be very short or generic. Preserve
  // already-substantive unique research, but never erase dated closure facts.
  const existing = (destination.body ?? []).filter((p) => p.trim());
  const sourceSpecific = update.body;
  const existingText = existing.join(" ").toLowerCase();
  const newParagraphs = sourceSpecific.filter((p) => !existingText.includes(p.toLowerCase().slice(0, 90)));
  const body = existing.join(" ").length > 1800 ? [...existing, ...newParagraphs] : [...sourceSpecific];
  return {
    ...destination,
    highlights: update.highlights,
    entryNote: update.entryNote,
    body,
    visitorFaqs: [...(destination.visitorFaqs ?? []).filter((old) => !update.visitorFaqs?.some((fresh) => fresh.question === old.question)), ...(update.visitorFaqs ?? [])],
    sourceCheckedAt: "2026-10-17",
  };
}
