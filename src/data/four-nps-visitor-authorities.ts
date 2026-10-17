import type { Destination } from "./types";

/** Four exact-site NPS authority enrichments based on official visitor documents
 * checked October 17, 2026. Existing licensed hero, verified coordinates,
 * county relationships, and older unique research are always preserved.
 * This does not automatically certify full production/editorial acceptance.
 */
type NpsPatch = Pick<Destination, "summary"|"entryNote"|"highlights"|"body"|"visitorFaqs"|"authorityGuide">;
const SITE_PATCHES: Readonly<Record<string, NpsPatch>> = {
  "alibates-flint-quarries-national-monument": {
  "summary": "See the ancient flint quarry landscape of the Texas Panhandle on a reservation-only ranger-guided outing, with a challenging two-mile hike, geology and Indigenous craftsmanship interpreted by the National Park Service.",
  "entryNote": "The quarry trail requires an advance NPS reservation and ranger guidance; the 2-mile, about 2-hour outing is challenging, has stairs and can be canceled for extreme weather. Visitor center hours and program season differ; call the current NPS contact before traveling.",
  "highlights": [
    "Ancient multicolored Alibates flint source in the Canadian River region",
    "Reservation-only NPS quarry tour and two-mile challenging hike",
    "Visitor-center exhibits about Indigenous quarry use and geology",
    "Shorter self-guided interpretation near the visitor center"
  ],
  "body": [
    "Alibates Flint Quarries National Monument preserves a distinctive source of colorful flint in the Canadian River region of the Texas Panhandle. Native peoples used Alibates stone for tools and trade across a much broader region over thousands of years. The National Park Service interprets the geologic formation together with Indigenous history, rather than presenting the quarries as an ordinary roadside rock collection.",
    "The quarries are not a free-access trail that visitors can hike whenever they wish. An NPS ranger leads reserved tours, typically lasting about two hours and covering a roughly two-mile round trip with gravel, stairs and an elevation gain. The route is challenging and unsuitable for some visitors with limited mobility or relevant health restrictions. Dogs, smoking and off-trail travel are prohibited during the hike. Visitors must use the official reservation process and confirm the current departure time; the seasonal summer schedule differs from other times of year.",
    "Tour conditions can change rapidly in the High Plains. NPS cancels trips during weather advisories or hazardous heat, high wind, thunderstorms, dust, ice or rain. Long pants, sturdy closed-toe shoes, water and sun protection are appropriate; a generic short-sleeve stroll is not an accurate description of the guided quarry experience. No one should travel from Amarillo assuming an unreserved afternoon walk to the quarries will be admitted.",
    "The visitor center at 37084 Alibates Road provides an alternative starting place with exhibitions and a short self-guided walking option toward the Canadian River Valley. The NPS lists 9 a.m.–4 p.m. general hours and states that regular entrance and guided programs do not have a standard entrance fee, but permits for the quarry hike are still required. Nearby Lake Meredith offers a separate federal recreation experience rather than being the same quarry trail.",
    "To plan an educational day, start by booking the official ranger tour and checking weather. Arrive early at the appropriate visitor-center entrance, allow the full hike and interpretation period, and leave a separate block for the exhibits. If tour access is unavailable, visit the staffed center as allowed rather than trespassing onto protected quarry areas."
  ],
  "visitorFaqs": [
    {
      "question": "May I visit the Alibates flint quarries without booking a ranger tour?",
      "answer": "No. NPS states the quarry trail is accessible by reserved ranger-guided tour only. The visitor center has separate exhibits and a short self-guided option.",
      "sourceUrl": "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm"
    },
    {
      "question": "How difficult is an Alibates quarry tour?",
      "answer": "The guided trip is approximately two miles round trip, takes around two hours, includes stairs and uneven gravel, and can be canceled for adverse weather.",
      "sourceUrl": "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm"
    },
    {
      "question": "Is there a standard entrance charge for Alibates?",
      "answer": "NPS says entrance and its ranger-led programs are free, but quarry tour reservations are still required.",
      "sourceUrl": "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm"
    }
  ],
  "authorityGuide": {
    "whyItMatters": "Alibates Flint Quarries National Monument preserves a distinctive source of colorful flint in the Canadian River region of the Texas Panhandle. Native peoples used Alibates stone for tools and trade a",
    "assessment": {
      "recommendedVisit": "Confirm official access, hours and any guided visit before departing",
      "physicalEffort": "High",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Plan age, mobility and trip length around the specific NPS visitor requirements",
      "firstTimeValue": "Official interpretation and the exact park visitor entrance are more reliable than a broad location pin"
    },
    "itineraries": [
      {
        "label": "First-time focused visit",
        "duration": "1–3 hours as site conditions allow",
        "steps": [
          "Review the NPS status and operating rules",
          "Reach the exact authorized visitor facility",
          "Follow permitted on-site routes or scheduled ranger programs",
          "Leave time for the park's source-grounded interpretive exhibits"
        ]
      },
      {
        "label": "Regional history and landscape day",
        "duration": "Half to full day",
        "steps": [
          "Confirm the named NPS facility's access rules",
          "Start with the primary interpretation or ranger-led visit",
          "Choose one separately managed local history or nature stop",
          "Check return travel, heat and sunset rather than rushing distant stops"
        ]
      },
      {
        "label": "Quarry tour unavailable alternative",
        "duration": "About 1 hour",
        "steps": [
          "Check if quarry tours are running before making the drive",
          "Visit the NPS visitor center during staffed hours",
          "Use only the signed self-guided options allowed that day",
          "Do not attempt independent quarry entry"
        ]
      }
    ],
    "sources": [
      {
        "label": "NPS Alibates ranger-led quarry tours",
        "url": "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm",
        "scope": "Reservation, weather, grade and seasonal departures"
      },
      {
        "label": "NPS Alibates basic visitor information",
        "url": "https://www.nps.gov/alfl/planyourvisit/basicinfo.htm",
        "scope": "37084 Alibates Road, center and site access"
      },
      {
        "label": "NPS Alibates entrance fees",
        "url": "https://www.nps.gov/alfl/planyourvisit/fees.htm",
        "scope": "Official visitor fee policy"
      }
    ]
  }
},
  "chamizal-national-memorial": {
  "summary": "Explore a U.S.–Mexico border history memorial in El Paso, with a cultural center, changing exhibits, performance spaces and grounds interpreting the peaceful settlement of a long-running international boundary dispute.",
  "entryNote": "Chamizal grounds are generally open 7 a.m.–7 p.m. daily, while the Cultural Center's regular visitor services operate Tuesday–Saturday 10 a.m.–5 p.m. and are closed Sunday/Monday. Gates can close for federal holidays; do not confuse an evening theater event with staffed museum hours.",
  "highlights": [
    "U.S.–Mexico border treaty and peaceful boundary-dispute interpretation",
    "Separate cultural-center exhibit hours and daily memorial grounds",
    "El Paso cultural programming and outdoor open space",
    "National Park Service interpretation of binational civic history"
  ],
  "body": [
    "Chamizal National Memorial occupies a significant landscape within El Paso, commemorating the diplomatic settlement of a long dispute over where the Rio Grande boundary lay between the United States and Mexico. The memorial connects physical geography, river movement, law and binational relationships. Its cultural programs and interpretation should not be confused with an outdoor wilderness park or an ordinary picnic-only municipal green space.",
    "Visitors have two distinct operating schedules to consider. NPS lists the memorial gates and grounds open from 7 a.m. to 7 p.m. daily, subject to holiday exceptions. The Cultural Center generally provides park information, exhibits and store services Tuesday through Saturday, 10 a.m. to 5 p.m.; it is closed Sunday and Monday. An after-hours theater program may open the building for an event but does not mean the information desk, exhibitions and bookstore will also be staffed.",
    "The physical address is 800 South San Marcial Street, El Paso, and the grounds are accessed through official gates along San Marcial Street and Delta Drive. Cars left in the parking lot after closing can be towed under NPS policy. Families visiting in summer should plan for sun and heat exposure even if part of the trip includes indoor exhibition space.",
    "The site is most rewarding when viewed as part of El Paso's broader borderlands history. Review the official NPS interpretation before visiting, then consider nearby civic and historic sites on their own operating schedules. Chamizal's story is specifically one of diplomacy and contested river boundaries, not a national park with campground reservations, extensive trail permits or a wildlife-driving itinerary.",
    "For a focused visit, arrive during Cultural Center hours, explore the exhibits and understand the U.S.–Mexico territorial and cultural context before walking the grounds as time and weather allow. Double-check closure exceptions for Thanksgiving, Christmas and New Year's Day, and consult the park when accessibility accommodations or theater schedules are important."
  ],
  "visitorFaqs": [
    {
      "question": "Is Chamizal's Cultural Center open on Sunday?",
      "answer": "No. Regular NPS Cultural Center visitor hours are Tuesday–Saturday 10 a.m.–5 p.m.; Sunday and Monday are closed.",
      "sourceUrl": "https://www.nps.gov/cham/planyourvisit/hours.htm"
    },
    {
      "question": "Can I enter Chamizal memorial grounds after 7 p.m.?",
      "answer": "NPS lists grounds gate hours from 7 a.m. to 7 p.m. daily, with holiday exceptions. Entering outside gate hours is not permitted.",
      "sourceUrl": "https://www.nps.gov/cham/planyourvisit/hours.htm"
    },
    {
      "question": "Does an after-hours performance guarantee the museum is open?",
      "answer": "No. The Cultural Center can open for performances after normal hours without offering full regular visitor services.",
      "sourceUrl": "https://www.nps.gov/cham/planyourvisit/hours.htm"
    }
  ],
  "authorityGuide": {
    "whyItMatters": "Chamizal National Memorial occupies a significant landscape within El Paso, commemorating the diplomatic settlement of a long dispute over where the Rio Grande boundary lay between the United States a",
    "assessment": {
      "recommendedVisit": "Confirm official access, hours and any guided visit before departing",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Plan age, mobility and trip length around the specific NPS visitor requirements",
      "firstTimeValue": "Official interpretation and the exact park visitor entrance are more reliable than a broad location pin"
    },
    "itineraries": [
      {
        "label": "First-time focused visit",
        "duration": "1–3 hours as site conditions allow",
        "steps": [
          "Review the NPS status and operating rules",
          "Reach the exact authorized visitor facility",
          "Follow permitted on-site routes or scheduled ranger programs",
          "Leave time for the park's source-grounded interpretive exhibits"
        ]
      },
      {
        "label": "Regional history and landscape day",
        "duration": "Half to full day",
        "steps": [
          "Confirm the named NPS facility's access rules",
          "Start with the primary interpretation or ranger-led visit",
          "Choose one separately managed local history or nature stop",
          "Check return travel, heat and sunset rather than rushing distant stops"
        ]
      },
      {
        "label": "Grounds-only history visit",
        "duration": "About 45–90 minutes",
        "steps": [
          "Confirm the 7 a.m. to 7 p.m. memorial gate schedule",
          "Walk only open grounds in safe weather",
          "Use NPS history resources to understand the river-border settlement",
          "Exit and move vehicles before the gates close"
        ]
      }
    ],
    "sources": [
      {
        "label": "NPS Chamizal hours and exceptions",
        "url": "https://www.nps.gov/cham/planyourvisit/hours.htm",
        "scope": "Separate grounds and cultural center schedules"
      },
      {
        "label": "NPS Chamizal basic visiting details",
        "url": "https://www.nps.gov/cham/planyourvisit/basicinfo.htm",
        "scope": "Physical address, entry gates and visitor access"
      },
      {
        "label": "NPS Chamizal site history",
        "url": "https://www.nps.gov/cham/learn/historyculture/index.htm",
        "scope": "Boundary dispute and cultural history"
      }
    ]
  }
},
  "waco-mammoth-national-monument": {
  "summary": "See an Ice Age mammoth fossil nursery preserved in place beneath Waco Mammoth National Monument's dig shelter, reached by an accessible paved walk from the visitor center and guided interpretation.",
  "entryNote": "NPS lists 9 a.m.–5 p.m. daily except Thanksgiving, Christmas and New Year's Day. Dig Shelter access requires a fee; guided tours typically depart every 30 minutes, take 45–60 minutes and ordinarily require no reservation. Check current scheduling before travel.",
  "highlights": [
    "Columbian mammoth fossils displayed in their original excavation positions",
    "Guided Dig Shelter interpretation about the Ice Age and discovery",
    "Approximately 300-yard paved accessible approach from the Welcome Center",
    "NPS, Waco and Baylor University partnership preserving the site"
  ],
  "body": [
    "Waco Mammoth National Monument protects an exceptionally important paleontological site where remains of Columbian mammoths were discovered in a deposit containing evidence of a nursery herd. The attraction is not a replica skeleton placed in a standard natural-history museum: the Dig Shelter allows visitors to see fossil remains in situ, where they were originally uncovered. Interpretation should distinguish scientific evidence and current theories from an invented dramatic tale of what happened to the herd.",
    "The National Park Service manages the monument in partnership with the City of Waco and Baylor University. Visitors start at the Welcome Center, 6220 Steinbeck Bend Drive, and follow a paved approximately 300-yard route to the Dig Shelter. NPS says wheelchair access is supported on the approach and wheelchairs are available on site, but travelers with specific mobility needs should still confirm arrangements with staff.",
    "Published ordinary hours are 9 a.m. to 5 p.m. daily, except Thanksgiving, Christmas and New Year's Day. A fee is charged for Dig Shelter access, and the NPS describes guided tours departing approximately every 30 minutes and lasting 45 minutes to one hour, without a routine advance reservation requirement. A fee for the protected dig shelter is not the same as claiming all public outdoor grounds require paid entry.",
    "Food and drinks must be left outside the shelter under park rules. This is especially important for groups visiting with children who may be carrying snacks and water for the trail. Allow time for interpretation and questions rather than treating the excavation as a drive-through overlook. The compact footprint and scheduled tours make the monument well suited to a half-day Waco history-and-science itinerary.",
    "To build an accurate visit, check the NPS operating calendar, arrive at the Welcome Center during regular hours and join the next available guided group. Afterwards, consider other separately managed Waco museums or riverfront destinations. Avoid selling unverified tour tickets or implying that visitors can wander through the shelter unescorted outside its operating schedule."
  ],
  "visitorFaqs": [
    {
      "question": "Do I need advance reservations for a Waco Mammoth guided tour?",
      "answer": "NPS says regular guided tours generally begin every 30 minutes and no reservation is needed; always check current hours and special closures.",
      "sourceUrl": "https://www.nps.gov/waco/planyourvisit/index.htm"
    },
    {
      "question": "Is access to the Dig Shelter free?",
      "answer": "No. NPS says a Dig Shelter access fee applies. Confirm current amounts with official park information.",
      "sourceUrl": "https://www.nps.gov/waco/planyourvisit/index.htm"
    },
    {
      "question": "Can a wheelchair user reach the dig shelter?",
      "answer": "NPS identifies a roughly 300-yard accessible trail from the Welcome Center and wheelchairs available for loan; contact the site for particular needs.",
      "sourceUrl": "https://www.nps.gov/waco/planyourvisit/index.htm"
    }
  ],
  "authorityGuide": {
    "whyItMatters": "Waco Mammoth National Monument protects an exceptionally important paleontological site where remains of Columbian mammoths were discovered in a deposit containing evidence of a nursery herd. The attr",
    "assessment": {
      "recommendedVisit": "Confirm official access, hours and any guided visit before departing",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoors/outdoors",
      "planningLevel": "Moderate",
      "familyFit": "Plan age, mobility and trip length around the specific NPS visitor requirements",
      "firstTimeValue": "Official interpretation and the exact park visitor entrance are more reliable than a broad location pin"
    },
    "itineraries": [
      {
        "label": "First-time focused visit",
        "duration": "1–3 hours as site conditions allow",
        "steps": [
          "Review the NPS status and operating rules",
          "Reach the exact authorized visitor facility",
          "Follow permitted on-site routes or scheduled ranger programs",
          "Leave time for the park's source-grounded interpretive exhibits"
        ]
      },
      {
        "label": "Regional history and landscape day",
        "duration": "Half to full day",
        "steps": [
          "Confirm the named NPS facility's access rules",
          "Start with the primary interpretation or ranger-led visit",
          "Choose one separately managed local history or nature stop",
          "Check return travel, heat and sunset rather than rushing distant stops"
        ]
      },
      {
        "label": "Family science half-day",
        "duration": "About 2–3 hours",
        "steps": [
          "Begin at the 6220 Steinbeck Bend Drive Welcome Center",
          "Use the accessible trail to reach the paid Dig Shelter with a guide",
          "Follow the no-food and no-drink shelter rule",
          "Continue to another independently operated Waco science or history stop"
        ]
      }
    ],
    "sources": [
      {
        "label": "NPS Waco Mammoth plan a visit",
        "url": "https://www.nps.gov/waco/planyourvisit/index.htm",
        "scope": "Tours, duration and entrance logistics"
      },
      {
        "label": "NPS Waco Mammoth hours",
        "url": "https://www.nps.gov/waco/planyourvisit/hours.htm",
        "scope": "Daily hours, holiday closures and shelter access"
      },
      {
        "label": "NPS Waco Mammoth basic information",
        "url": "https://www.nps.gov/waco/planyourvisit/basicinfo.htm",
        "scope": "Visitor address and accessible route"
      }
    ]
  }
},
  "amistad-national-recreation-area": {
  "summary": "Plan boating, shoreline fishing and desert camping at the Rio Grande's international Amistad reservoir near Del Rio, where fluctuating water levels change boat-ramp access and NPS lake-use passes govern registered vessels.",
  "entryNote": "Do not assume a particular Amistad boat ramp is open: NPS updates operational statuses as reservoir levels shift. Motorized or Texas-registered vessels require an NPS Lake Use Pass. Most individual campsites are first-come/first-served, not ordinary reserved online sites.",
  "highlights": [
    "Amistad Reservoir's desert-water scenery and boating",
    "Ramp-by-ramp access subject to rapidly changing lake elevation",
    "Distinct NPS Lake Use Pass requirement for registered vessels",
    "First-come campgrounds around Del Rio and the reservoir"
  ],
  "body": [
    "Amistad National Recreation Area surrounds a large international reservoir on the Rio Grande near Del Rio, where boating, fishing, swimming, paddling and desert scenery depend on both federal recreation rules and the water level. Reservoir elevation is not fixed; drought, upstream inflows and water management can radically change the distance between the parking area and shoreline. A generic national park pin is not a substitute for selecting a legal boat launch.",
    "The National Park Service maintains a ramp-by-ramp status page covering access points such as Diablo East, Rough Canyon, Box Canyon, Spur 406, Spur 454 and other facilities. Some launch areas were restricted or closed during historic low-water periods, and NPS specifically warns that a ramp status can change quickly. Never promise that a motorized trailer launch works at every listed pier or that an old roadway serving as a low-water launch offers the same safety and grading as a constructed ramp.",
    "Motorized boats and other vessels requiring Texas registration need an NPS Amistad Lake Use Pass, sold through designated official channels. That pass requirement should not be confused with a standard national-park entrance charge or a commercial outfitter booking. NPS lists separate concession and commercial-use permit requirements for paid services and guides; do not represent a private trip as NPS-approved without checking authorization.",
    "Camping differs from state-park electrical reservations. NPS describes designated individual campsites at Governors Landing, Rough Canyon, San Pedro, Spur 406 and 277 North as largely first-come, first-served with campsite fees paid at official kiosks, the visitor center or Pay.gov. Group sites have separate reservation arrangements. Visitors should not be directed to buy a fictional reserved electric hookup at every Amistad campground.",
    "Low-water conditions can also create steep exposed ramps and long distances to docks for visitors with mobility needs. NPS describes a limited special parking-permit approach for qualified visitors at some launches but warns those ramp surfaces do not necessarily meet ADA grading standards. Check actual conditions, bring sun and drinking-water protection, and plan around an exact chosen access point rather than an approximate reservoir center."
  ],
  "visitorFaqs": [
    {
      "question": "Is every Amistad motorboat launch open?",
      "answer": "No. NPS keeps a ramp-by-ramp conditions table and warns statuses shift with reservoir elevation; confirm the exact launch before trailering a boat.",
      "sourceUrl": "https://www.nps.gov/amis/planyourvisit/conditions.htm"
    },
    {
      "question": "Do motorboats need a federal lake-use pass at Amistad?",
      "answer": "Yes. NPS requires a Lake Use Pass for motorized boats and vessels requiring Texas registration. Check current price and purchase methods.",
      "sourceUrl": "https://www.nps.gov/amis/planyourvisit/conditions.htm"
    },
    {
      "question": "Can I reserve an ordinary campsite at Amistad online?",
      "answer": "Most designated individual sites are first-come, first-served and permit payment is handled on site or through official channels; group areas follow different arrangements.",
      "sourceUrl": "https://www.nps.gov/amis/planyourvisit/conditions.htm"
    }
  ],
  "authorityGuide": {
    "whyItMatters": "Amistad National Recreation Area surrounds a large international reservoir on the Rio Grande near Del Rio, where boating, fishing, swimming, paddling and desert scenery depend on both federal recreati",
    "assessment": {
      "recommendedVisit": "Choose the actual usable boat ramp and NPS lake-use permit before hauling equipment",
      "physicalEffort": "Low to moderate",
      "weatherExposure": "Mixed indoor/outdoor",
      "planningLevel": "Moderate",
      "familyFit": "Plan age, mobility and trip length around the specific NPS visitor requirements",
      "firstTimeValue": "Official interpretation and the exact park visitor entrance are more reliable than a broad location pin"
    },
    "itineraries": [
      {
        "label": "First-time focused visit",
        "duration": "1–3 hours as site conditions allow",
        "steps": [
          "Review the NPS status and operating rules",
          "Reach the exact authorized visitor facility",
          "Follow permitted on-site routes or scheduled ranger programs",
          "Leave time for the park's source-grounded interpretive exhibits"
        ]
      },
      {
        "label": "Regional history and landscape day",
        "duration": "Half to full day",
        "steps": [
          "Confirm the named NPS facility's access rules",
          "Start with the primary interpretation or ranger-led visit",
          "Choose one separately managed local history or nature stop",
          "Check return travel, heat and sunset rather than rushing distant stops"
        ]
      },
      {
        "label": "Low-water conditions alternative",
        "duration": "Half-day",
        "steps": [
          "Read the live NPS ramp-by-ramp conditions table",
          "If the chosen boat ramp is unsafe, do not launch a trailered boat",
          "Choose only an NPS-permitted shore activity from a confirmed access point",
          "Make alternate lodging or park plans without assuming other ramps are open"
        ]
      }
    ],
    "sources": [
      {
        "label": "NPS Amistad current conditions",
        "url": "https://www.nps.gov/amis/planyourvisit/conditions.htm",
        "scope": "Ramp-level operational changes and water safety"
      },
      {
        "label": "NPS Amistad lake-use fees",
        "url": "https://www.nps.gov/amis/planyourvisit/fees.htm",
        "scope": "Registered-vessel permit requirements"
      },
      {
        "label": "NPS Amistad permits and campsite information",
        "url": "https://www.nps.gov/amis/planyourvisit/permitsandreservations.htm",
        "scope": "First-come campgrounds and fee collection"
      },
      {
        "label": "NPS Amistad accessibility",
        "url": "https://www.nps.gov/amis/planyourvisit/accessibility.htm",
        "scope": "Steep exposed boat ramps and accommodations"
      }
    ]
  }
},
};
export function applyFourFederalParkAuthorities(destination: Destination): Destination {
  const patch = SITE_PATCHES[destination.slug];
  if (!patch) return destination;
  const codeBySlug: Record<string, string> = {
    "alibates-flint-quarries-national-monument": "alfl",
    "chamizal-national-memorial": "cham",
    "waco-mammoth-national-monument": "waco",
    "amistad-national-recreation-area": "amis"
  };
  const code = codeBySlug[destination.slug];
  if (!code) return destination;
  try {
    const u = new URL(destination.officialUrl ?? "");
    if (u.protocol !== "https:" || !["nps.gov","www.nps.gov"].includes(u.hostname) || !(u.pathname===`/${code}` || u.pathname.startsWith(`/${code}/`))) return destination;
  } catch { return destination; }
  const existing = (destination.body ?? []).filter(Boolean);
  const combined = existing.join(" ");
  const added = patch.body.filter(p => !combined.includes(p.slice(0,90)));
  return {
    ...destination,
    summary: patch.summary,
    entryNote: patch.entryNote,
    highlights: patch.highlights,
    body: combined.length > 1800 ? [...existing, ...added] : patch.body,
    visitorFaqs: [...(destination.visitorFaqs ?? []).filter(old=>!patch.visitorFaqs?.some(f=>f.question===old.question)), ...(patch.visitorFaqs ?? [])],
    authorityGuide: patch.authorityGuide,
    sourceCheckedAt: "2026-10-17"
  };
}
