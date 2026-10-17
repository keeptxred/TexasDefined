import type { Destination } from "./types";

/** October 17, 2026 editorial source review: official TPWD operational rules.
 * This curation augments existing authority destinations, never certifies
 * images, indexed production HTML, affiliates, or ongoing live accuracy.
 */
interface ParkPatch { entryNote: string; body: string[]; visitorFaqs: NonNullable<Destination["visitorFaqs"]> }
const PARK_VISITOR_PATCHES: Readonly<Record<string, ParkPatch>> = {
  "tyler-state-park": {
  "entryNote": "October 17, 2026: EZ and A–D cycling loops closed for event, but Whispering Pines/Lakeshore remain open to walkers; boat rentals limited by low water and suspended above heat index 100°F. Check updated TPWD alerts before travel.",
  "body": [
    "Tyler State Park centers on a small wooded Pineywoods lake with named loops serving different activities. Lakeshore and Whispering Pines walking options are not interchangeable with the park's EZ and A–D mountain-bike trail loops. A visitor planning a hike, ride or paddling rental should consult the relevant official map and current dated notice before arriving; a trail closure for a bike event does not mean the whole park has closed.",
    "An October 9 TPWD notice closes EZ and A, B, C and D loops on October 17 for a scheduled event while leaving Whispering Pines and Lakeshore trails open to foot traffic. Treat this as a one-day event restriction, not a permanent trail condition. Boat rentals are separately limited by low lake levels, and TPWD says rentals are unavailable on days when the heat index exceeds 100°F. Call about equipment availability before planning an afternoon on the water.",
    "Camping requires choosing a real campground type. Lakeview includes full-hookup camps that permit tents, while Big Pine full-hookup sites are RV-only; Cedar Point electrical sites and the water-only loops are different categories, and some pads require RV jack pads. TPWD lists minimum-night rules for Friday–Saturday and major holiday bookings. The state park's forest setting is well suited to a walk, lakeview picnic or CCC-history visit without trying to complete every trail in one day.",
    "TPWD also prohibits grills and deep fryers in specified day-use zones near the swim area, store and playground. It forbids swimming or diving around the fishing piers and boat ramp and night swimming outside the posted hours. Those specific restrictions matter more to families than a generic park activities list. Use the park's exact day-use directions and reserve in advance when capacity is tight."
  ],
  "visitorFaqs": [
    {
      "question": "Are all trails closed at Tyler State Park on October 17, 2026?",
      "answer": "No. TPWD closes the EZ and A–D loops for a special event that day, while Whispering Pines and Lakeshore remain open for foot traffic.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/tyler/alert"
    },
    {
      "question": "Can I count on boat rentals at Tyler State Park?",
      "answer": "No. TPWD reports limitations from low lake levels and no boat rentals when the heat index exceeds 100°F. Check with the park.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/tyler/alert"
    },
    {
      "question": "Do Tyler's Big Pine campsites allow tents?",
      "answer": "No. TPWD's Big Pine full-hookup sites are RV-only; other named campground loops have different equipment rules.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/tyler/alert"
    }
  ]
},
  "huntsville-state-park": {
  "entryNote": "TPWD full-park hunt closures exclude ordinary visitors December 4, 3 p.m.–December 9, 6 a.m. (2026), and January 11, 3 p.m.–January 14, 2 p.m. (2027). Check exact dates before reserving Lake Raven camping or activities.",
  "body": [
    "Huntsville State Park is an East Texas Pineywoods retreat around 210-acre Lake Raven, where fishing, birding, hiking, canoeing and wooded camping are the central experiences. Its setting in the Sam Houston National Forest area can make it tempting to treat every park activity as interchangeable, but the lake, trails and three campground areas have different capacity and access conditions. The official park map is the starting point for identifying a suitable outing.",
    "TPWD lists whole-park permitted-hunting closures for ordinary visitors beginning 3 p.m. December 4 and ending 6 a.m. December 9, 2026, and from 3 p.m. January 11 to 2 p.m. January 14, 2027. These are not merely partial trail restrictions. Anyone planning a December camping stay or an early-January lake day should check against those windows before purchasing a pass or organizing a group trip.",
    "The lake is home to fish and wildlife, and visitors can seek a guided ranger activity or a quiet day of paddling when conditions permit. Do not imply that a scheduled fishing-with-a-ranger event guarantees a rental or a campsite on the same date. Lakeside recreation demands ordinary wildlife awareness and water safety; visitors should use official boat areas, follow posted lake rules and avoid feeding animals.",
    "Raven Hill offers a different camping configuration from Coloneh and Prairie Branch. TPWD records 23 full-hookup sites, 77 water/electric sites and 54 water-only sites, but pad lengths vary, and not all full-hookup spaces fit large equipment. Friday and Saturday overnight bookings have a two-night minimum. A family may get much more value from choosing one lake activity and one walk than from assuming every camping loop or path is equally accessible."
  ],
  "visitorFaqs": [
    {
      "question": "Is Huntsville State Park open to regular visitors during its winter hunts?",
      "answer": "No. The park-wide hunt closures run December 4–9, 2026 and January 11–14, 2027 with the precise entry times stated in the TPWD notice.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/huntsville/alert"
    },
    {
      "question": "Is Lake Raven suitable for a visit without camping?",
      "answer": "Yes. Fishing and paddling are day-use activities when park access and conditions permit; choose the official lake facilities and check any reservations.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/huntsville/alert"
    },
    {
      "question": "Are all Huntsville full-hookup campsites suitable for a large RV?",
      "answer": "No. TPWD lists different pad lengths in Raven Hill, and visitors must match their equipment to the exact reserved site.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/huntsville/alert"
    }
  ]
},
  "pedernales-falls-state-park": {
  "entryNote": "Wood and charcoal fires banned; containerized fuel stoves allowed. Electric/water campground closes for construction beginning January 1, 2027; no reliable reopening date. Whole-park hunt closures November 21–24, December 13–17, January 18–22.",
  "body": [
    "Pedernales Falls State Park protects a dramatic stretch of limestone where the Pedernales River spills across wide rock shelves. The signature falls overlook is not an authorized swimming hole. TPWD warns against entering the falls area to swim, wade or tube, and the river can rise quickly after distant rainfall. Visitors looking for a lawful swim should follow the park's designated river recreation rules rather than jumping in at the scenic overlook.",
    "The August 25, 2026 burn ban prohibits both wood and charcoal fires, with containerized fuel cooking stoves allowed. The park also has whole-park closures for permitted hunts on November 21–24 and December 13–17, 2026, and January 18–22, 2027, with overnight-to-afternoon cutoff times on the TPWD alert. A one-day hike and a multi-night camping plan are affected differently, so verify the exact reservation dates and the current notice.",
    "TPWD has announced that the water/electric campground will close for construction beginning January 1, 2027. Agency pages have shown different projected finish windows; it would be misleading to promise an exact reopening. Twin Falls Trail is listed as remaining open during the work, subject to its own safety and weather conditions. The primitive Wolf Ridge area is a separate backcountry experience that requires a hike, carried water and arrival during staffed check-in hours.",
    "For a first visit, prioritize the signed falls viewing route and a separate marked trail or permitted river activity only if conditions allow. The steep limestone and occasional flash flooding deserve greater attention than a generic drive-time or Instagram photograph. TPWD advises advance day-use reservations on busy weekends and holidays, and the park can fill before walk-in visitors arrive."
  ],
  "visitorFaqs": [
    {
      "question": "Can I swim in the Pedernales Falls overlook area?",
      "answer": "No. The falls viewing area is not the designated swimming area, and dangerous water surges can occur. Consult TPWD's separate recreation-zone instructions.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/pedernales-falls/alert"
    },
    {
      "question": "Will the developed campground remain open in January 2027?",
      "answer": "No. TPWD schedules a construction closure starting January 1, 2027. The finish date should be checked directly rather than assumed.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/pedernales-falls/alert"
    },
    {
      "question": "Are wood and charcoal campfires allowed in late 2026?",
      "answer": "No. The August 25 TPWD ban prohibits both while allowing containerized fuel stoves for cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/pedernales-falls/alert"
    }
  ]
},
  "mckinney-falls-state-park": {
  "entryNote": "Wood fires prohibited by August 11 TPWD burn ban, but charcoal and propane/containerized stoves permitted for cooking. Advance weekend day passes highly recommended; Onion Creek water can block trail crossings.",
  "body": [
    "McKinney Falls State Park is an accessible Austin-area choice for observing Onion Creek cascading over rock ledges, but access to Upper and Lower Falls is not a guarantee of safe swimming on every day. Water may rise after rainfall, and the park's creek-crossing trails can become inaccessible even when the main entrance remains open. A visit should begin by reading the current TPWD conditions and choosing signed trails that do not require unsafe water crossings.",
    "TPWD's August 11, 2026 burn ban is wood-only: charcoal cooking and containerized fuel stoves such as propane are allowed. This distinction is important because nearby Texas parks enforce stricter no-charcoal bans. Fires still belong only where otherwise lawful, and the dated alert rather than a general campground photo determines whether wood fires may be used.",
    "TPWD warns that this park frequently reaches day-use capacity on weekends, school breaks and holidays. Visitors without advance passes can be turned away even while existing camping reservations are admitted. Families driving from Austin should not assume that a short journey allows a spontaneous entrance on busy dates; secure a day-use permit through the official Texas State Parks booking channel first.",
    "The developed campground has both 50/30/20-amp and 30/20-amp electric site types with different individual campsite dimensions, and walking routes range from easy paved segments to rockier creek terrain. Use the park trail map rather than crossing Onion Creek at an unofficial point. The site can work for a short nature outing or a weekend, but the ideal schedule depends on flow, weather and whether your selected campsite is actually available."
  ],
  "visitorFaqs": [
    {
      "question": "Is charcoal prohibited at McKinney Falls?",
      "answer": "No. The current TPWD notice bans wood fires while allowing charcoal and containerized fuel stoves for cooking.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/mckinney-falls/alert"
    },
    {
      "question": "Do I need a day-use reservation?",
      "answer": "TPWD strongly recommends advance passes on weekends, holidays and school breaks because the park often reaches capacity.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/mckinney-falls/alert"
    },
    {
      "question": "Are creek-crossing trails always accessible?",
      "answer": "No. Onion Creek levels after rain can make crossings dangerous or impassable, even when other park areas remain open.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/mckinney-falls/alert"
    }
  ]
},
  "guadalupe-river-state-park": {
  "entryNote": "Wood and charcoal fires prohibited under August 21 ban; propane/containerized cooking stoves allowed. Bring drinking water, follow signed trails, and avoid full-park hunts November 20–24, 2026 and January 11–15, 2027.",
  "body": [
    "Guadalupe River State Park combines Hill Country riverside recreation with wooded walking routes, and the park's actual entrance and activity zone should be chosen before departure. The river can offer swimming, paddling or fishing when safe, but changing flow and debris can make an appealing stretch unsafe. A social path down to the river is not proof of sanctioned access; TPWD specifically tells visitors to remain on marked trails after hazardous debris.",
    "The August 21, 2026 burn ban forbids BOTH wood and charcoal fires while allowing containerized cooking stoves. TPWD also asks guests to help conserve water and bring their own drinking supply. That request is relevant even for a short day trip: riverside water is not a substitute for potable drinking water, and high heat or long trails increase the need to carry it.",
    "Entire-park permitted-hunting closures exclude ordinary visitors from 8 p.m. November 20 to noon November 24, 2026, and from 8 p.m. January 11 to noon January 15, 2027. These are dates when booking a typical family river outing would be inappropriate. A separate August trail-status notice reported official trails open but warned against social tracks; current rain and river conditions can supersede an earlier all-open status.",
    "The campgrounds have distinct requirements. Turkey Sink's 50-amp sites and Cedar Sage's 30-amp sites are developed electric camping areas, while Wagon Ford sites require carrying gear 50–100 yards to the river terrace and do not permit RV camping. TPWD prohibits generators in these camping areas. A riverside tent site should never be portrayed as a guarantee of safe wading beside the tent, especially after upstream rain."
  ],
  "visitorFaqs": [
    {
      "question": "Can I use charcoal at Guadalupe River State Park?",
      "answer": "No. TPWD's August 21 notice prohibits wood and charcoal fires; containerized fuel cooking stoves are allowed.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/guadalupe-river/alert"
    },
    {
      "question": "When does the whole park close for hunts?",
      "answer": "The listed full closures are November 20–24, 2026 and January 11–15, 2027, with evening start and noon reopening times.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/guadalupe-river/alert"
    },
    {
      "question": "Can I pitch a drive-up RV at Wagon Ford?",
      "answer": "No. Wagon Ford is a tent-only walk-in camping area with a 50–100-yard gear carry.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/guadalupe-river/alert"
    }
  ]
},
  "lost-maples-state-natural-area": {
  "entryNote": "As of TPWD's October 14, 2026 report, sycamores were turning yellow while bigtooth maples were still green—not peak color. October–November day passes often sell out. Download maps; cell service is unreliable.",
  "body": [
    "Lost Maples State Natural Area is best understood as a protected limestone-canyon ecosystem along the Sabinal River, where rare stands of Uvalde bigtooth maple draw fall visitors. The color spectacle depends on weather rather than a fixed annual date. A mid-October photo from a previous year is not evidence that the leaves are currently red, and a thoughtful guide should use TPWD's current weekly foliage report instead of declaring 'peak fall color' without checking.",
    "The official October 14, 2026 report says sycamores have begun to yellow, but bigtooth maples remain green. TPWD intends to post roughly weekly through November. The busiest October and November weekends fill the limited parking supply and the natural area can close to additional day visitors. Buy a valid day pass in advance, especially around Thanksgiving, and make sure a guided-program registration is separate from admission.",
    "Visitors can explore more than ten miles of designated trails, but steep climbs, rock ledges and fragile shallow-rooted maples demand care. Do not hike off trail or scramble on protected rock faces. The area has little to no reliable cell service; download the official trail map before reaching FM 187, carry drinking water and use the recorded foliage report or official site to decide whether a particular autumn photography trip is worthwhile.",
    "Camping ranges from 30 developed water-and-electric sites to separate hike-in primitive sites reached over rugged terrain. Primitive sites have no potable water and prohibit campfires, although containerized cooking stoves may be allowed under their specific rules; check active alerts before packing fuel. Visitors who prefer limited walking can see some landscape from the entrance road, but the longer canyon overlooks involve steep routes and cannot be promoted as universally wheelchair accessible."
  ],
  "visitorFaqs": [
    {
      "question": "Are the maples at peak color in mid-October 2026?",
      "answer": "No. TPWD's October 14 report says the bigtooth maples are still green, while some sycamores are turning yellow. Consult the weekly foliage updates.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lost-maples/foliage-reports"
    },
    {
      "question": "Do I need a fall day-use reservation at Lost Maples?",
      "answer": "Yes for reliable entry. TPWD warns that peak-season lots routinely fill and advance passes are the best way to guarantee admission.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lost-maples/foliage-reports"
    },
    {
      "question": "Will I have reliable phone service on Lost Maples trails?",
      "answer": "No. TPWD says cell service is unavailable or unreliable; download official maps and plan before entering the natural area.",
      "sourceUrl": "https://tpwd.texas.gov/state-parks/lost-maples/foliage-reports"
    }
  ]
},
};

export function applyTPWDSixNewVisitorGuides(destination: Destination): Destination {
  const patch = PARK_VISITOR_PATCHES[destination.slug];
  if (!patch || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(destination.officialUrl ?? "")) return destination;
  const existingBody = (destination.body ?? []).filter(Boolean);
  const existingText = existingBody.join(" ");
  // Protect older substantive park research: append only new distinct material.
  const sourceParagraphs = patch.body.filter(p => !existingText.includes(p.slice(0, 95)));
  const body = existingText.length > 1600 ? [...existingBody, ...sourceParagraphs] : patch.body;
  return {
    ...destination,
    entryNote: patch.entryNote,
    body,
    visitorFaqs: [
      ...(destination.visitorFaqs ?? []).filter(old => !patch.visitorFaqs.some(now => now.question === old.question)),
      ...patch.visitorFaqs
    ],
    sourceCheckedAt: "2026-10-17"
  };
}
