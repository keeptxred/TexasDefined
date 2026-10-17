import type { Destination, DestinationAuthorityGuide, DestinationAuthoritySource } from "./types";

/** Remaining six NPS Texas sites: researched October 17, 2026.
 * Enrich canonical existing destinations without altering their original
 * place-specific photos, county assignments or managing authority.
 * Pending individual photo/production/editorial acceptance is NOT certified.
 */
interface NpsSiteFacts {
  code: string;
  summary: string;
  entryNote: string;
  highlights: string[];
  body: string[];
  faq: Array<[string,string]>;
  sources: Array<[string,string,string]>;
  plan: [string,string,string];
}
const FACTS: Readonly<Record<string, NpsSiteFacts>> = {
  "fort-davis-national-historic-site": {
  "code": "foda",
  "summary": "Explore restored frontier military buildings and Buffalo Soldiers history beneath the Davis Mountains, with separate National Park Service visitor-center hours, self-guided interpretation and connecting hiking routes.",
  "entryNote": "NPS grounds generally open 8 a.m.–5 p.m. Central; visitor center closes at 4:30 p.m. Holiday closures include Thanksgiving, Christmas, New Year's Day and MLK Day. Check current entrance fees and trail conditions before arriving.",
  "highlights": [
    "Restored nineteenth-century officers' quarters and army buildings",
    "Buffalo Soldiers and post-Civil War West Texas military history",
    "NPS visitor-center museum and introductory film",
    "Connections toward Davis Mountains hiking routes"
  ],
  "body": [
    "Fort Davis National Historic Site preserves one of the best surviving frontier military-post landscapes in the American Southwest. Fort buildings, surrounding hills and documented military history illuminate the soldiers, families and workers living in an isolated West Texas post. The story must include Black U.S. Army regiments later known as Buffalo Soldiers and the Indigenous peoples whose homelands and movement were affected by federal military expansion.",
    "The National Park Service lists the park grounds open from 8 a.m. to 5 p.m., while the visitor center generally closes at 4:30 p.m., both in Central Time. Holiday closures include Thanksgiving, Christmas, New Year's Day and Martin Luther King Jr. Day. Visitors may see restored and furnished historic buildings, follow self-guided interpretation and watch a short introductory park film. The normal park entrance fee is separate from any neighboring state-park fee or lodging reservation.",
    "Interpretation is distributed among parade-ground areas, restored structures and nearby terrain. Some hillside trails connect toward the adjacent Davis Mountains State Park; they are not all short, flat museum walks. Bring water and appropriate shoes, confirm the NPS trail map and distinguish which agency controls each entrance. A visit centered on a few buildings and the orientation film suits many families better than a strenuous afternoon hike.",
    "Fort Davis is in Jeff Davis County, not a stand-in for Big Bend National Park. The neighboring town, McDonald Observatory and Davis Mountains State Park can support a multi-day regional itinerary, but separate operators have their own tickets, arrival requirements and activity times. Allow at least a focused historic-site session to understand army life instead of treating the post as a quick drive-through photography stop.",
    "For a history-first visit, begin at the NPS visitor center, then work through buildings with interpretation of the post's changing garrison and local relationships. Pay attention to both preservation and absence: not every historic building survives or has been restored. Do not advertise unrelated exhibits, operating hours or modern military facilities as part of this federal historic site."
  ],
  "faq": [
    [
      "When are Fort Davis National Historic Site grounds open?",
      "NPS lists grounds 8 a.m.–5 p.m. Central, with the visitor center closing at 4:30 p.m. and exceptions for major holidays."
    ],
    [
      "Does Fort Davis have preserved historic buildings?",
      "Yes. The NPS interprets restored and furnished quarters and other fort structures; check accessibility of individual buildings and trails."
    ],
    [
      "Is admission to the adjacent state park included with Fort Davis?",
      "Do not assume so. Fort Davis National Historic Site and Davis Mountains State Park are administered separately."
    ]
  ],
  "sources": [
    [
      "NPS Fort Davis operating hours",
      "https://www.nps.gov/foda/planyourvisit/hours.htm",
      "Separate center, grounds, holidays and fees"
    ],
    [
      "NPS Fort Davis basic information",
      "https://www.nps.gov/foda/planyourvisit/basicinfo.htm",
      "Historic site address and visitor access"
    ],
    [
      "NPS Fort Davis historical interpretation",
      "https://www.nps.gov/foda/learn/historyculture/index.htm",
      "Historic garrison and people"
    ]
  ],
  "plan": [
    "Explore the NPS orientation and selected historic buildings",
    "Walk the restored parade ground and interpretive stops",
    "Confirm weather before choosing an adjacent trail"
  ]
},
  "lake-meredith-national-recreation-area": {
  "code": "lamr",
  "summary": "Camp, boat and explore High Plains canyon country at Lake Meredith, with NPS first-come camping, a small reservable full-hookup section at Sanford-Yake and no assumed all-lake launch availability.",
  "entryNote": "NPS lists most Lake Meredith camping free and first-come, with only 10 Sanford-Yake electric/water RV sites reservable for a fee by phone. Camping is limited to 14 consecutive days within 30 and 60 days per year. Boat and fire access needs current NPS checks.",
  "highlights": [
    "Canyon landscape and Lake Meredith shoreline access",
    "Mostly free, first-come NPS camping areas",
    "Ten specifically reservable Sanford-Yake electric/water RV sites",
    "Nearby Alibates flint quarry tours requiring separate reservations"
  ],
  "body": [
    "Lake Meredith National Recreation Area protects lake-and-canyon landscapes in the Texas Panhandle, with recreation that varies across shoreline access, campgrounds and water levels. It is a separate National Park Service unit from the nearby Alibates Flint Quarries monument. A visitor hoping to boat should choose an exact NPS-managed launch and verify current water conditions; an aerial reservoir photograph is not evidence that every old ramp reaches water safely.",
    "Camping is unusually important to describe accurately. NPS lists ten electric-and-water RV sites at Sanford-Yake that charge a fee and require a phone reservation. Other developed and dispersed park campsites are generally free and first-come, not automatically bookable through a standard Texas state-park reservation link. The official campsite description lists options for overlooks, shoreline and wooded campgrounds; amenities vary substantially between locations.",
    "The NPS camping rule generally allows fourteen consecutive days in any thirty-day period and no more than sixty total days per year. Campsites cannot be left unattended for more than twenty-four hours, and digging or grading campsites is prohibited. Fires are allowed only in specified above-ground grills and established rings, not in the backcountry. A current fire or weather order could impose stricter limits, so those standing rules are not permission to light a fire under an active ban.",
    "Visitors bringing an RV should clarify whether a selected campground actually has hookups, a restroom, a dump station or road conditions suitable for their vehicle. The mere presence of ten serviced sites does not make the rest of the area a full-service resort. Lake use, fishing and paddling should be planned around current ramp, boating and safety notices rather than assumed year-round availability.",
    "For a regional trip, pair an appropriate lake overlook with the NPS visitor interpretation and a separate, advance-reserved Alibates tour if weather and time permit. Take extra drinking water for the High Plains, note windy lake conditions and resist driving onto unmaintained shore or archaeological areas without permission. Confirm NPS camp location and check-in rules before nightfall."
  ],
  "faq": [
    [
      "Can I reserve every Lake Meredith campsite online?",
      "No. Most NPS sites are free first-come camping; only ten Sanford-Yake electric/water RV sites have a separate paid reservation process."
    ],
    [
      "How long can I camp at Lake Meredith?",
      "NPS generally permits up to fourteen consecutive nights within thirty days, subject to a sixty-day annual cap and other rules."
    ],
    [
      "Can I make a backcountry campfire?",
      "Not under the NPS standing rules. Fires belong only in designated elevated grills or existing rings, and additional fire restrictions may apply."
    ]
  ],
  "sources": [
    [
      "NPS Lake Meredith camping",
      "https://www.nps.gov/lamr/planyourvisit/camping.htm",
      "Reservation types, camping limits and fire rules"
    ],
    [
      "NPS Lake Meredith fees",
      "https://www.nps.gov/lamr/planyourvisit/fees.htm",
      "Free entrance distinction"
    ],
    [
      "NPS Lake Meredith visitor planning",
      "https://www.nps.gov/lamr/planyourvisit/index.htm",
      "Public facilities and current visiting"
    ]
  ],
  "plan": [
    "Confirm the exact shoreline access and current water conditions",
    "Choose free first-come versus Sanford-Yake RV reservation correctly",
    "Plan lake activities independently from the Alibates tour"
  ]
},
  "lyndon-b-johnson-national-historical-park": {
  "code": "lyjo",
  "summary": "Visit LBJ's Johnson City childhood sites and the separate Ranch near Stonewall with a free ranch driving permit, while the Texas White House and Hangar complex remain closed for rehabilitation.",
  "entryNote": "The Johnson City and LBJ Ranch park units are about 14 miles apart. A free ranch driving permit is issued at LBJ State Park visitor center; the Texas White House, Hangar and Lockheed JetStar complex remain closed for rehabilitation. NPS visitor facilities and ranch gates keep different schedules.",
  "highlights": [
    "Johnson City Boyhood Home, visitor center and settlement interpretation",
    "LBJ Ranch driving tour with a free state-park-issued permit",
    "Texas White House complex currently closed, not a bookable tour",
    "Separate Johnson City and Stonewall entry schedules"
  ],
  "body": [
    "Lyndon B. Johnson National Historical Park is not one walkable museum campus. The federal park interprets Johnson City, including the visitor center, boyhood home and Johnson Settlement, as well as the LBJ Ranch near Stonewall approximately fourteen miles away. Visitors who follow a single generic map pin can end up at the wrong unit or miss required ranch-driving arrangements.",
    "NPS states the Texas White House Complex remains closed for rehabilitation begun in January 2024. The Texas White House, Hangar visitor center, Lockheed JetStar and associated visitor areas are not available to tour. The LBJ Ranch driving route remains open under current conditions, with access to other named sites such as Junction School, reconstructed birthplace, family cemetery viewing area and show barn. Do not use an old White House tour photo or affiliate offer to imply the interior can be booked.",
    "The Ranch driving permit is free but still required. Visitors obtain it from the Lyndon B. Johnson State Park and Historic Site visitor center on Highway 290, not from a fictional national-park ticket booth on the ranch itself. The federal Ranch inbound gate generally opens at 9 a.m. and closes at 4:30 p.m., while the exit gate closes at 5 p.m. Johnson City's visitor center generally operates from 9 a.m. to 5 p.m. but its guided-program departure times vary.",
    "An efficient history itinerary starts with the Johnson City interpretation and settles on an actual same-day reservation or free driving permit if continuing toward Stonewall. Visitors with limited time can see one unit well; a half-day should not promise a White House interior visit. Ranger talks, the farm exhibits and family-history programs need checking for the chosen weekday.",
    "The nearby state historic site is a distinct Texas Parks and Wildlife property with a living-history farm, so fee-free federal admission does not mean every adjacent experience is operated by the same agency. Consult both operators' current site pages. A well-grounded guide explains the distinctions rather than conflating the National Historical Park with the state historic site."
  ],
  "faq": [
    [
      "Can I tour the Texas White House in October 2026?",
      "No. NPS says the Texas White House and Hangar complex remains closed for rehabilitation. The Ranch driving tour and other named sites may remain accessible."
    ],
    [
      "Where do I get an LBJ Ranch driving permit?",
      "At the Lyndon B. Johnson State Park and Historic Site visitor center near Stonewall; NPS says the permit is free but required."
    ],
    [
      "Are Johnson City and the LBJ Ranch at the same entrance?",
      "No. NPS reports two separate areas about fourteen miles apart, each with separate facility and gate arrangements."
    ]
  ],
  "sources": [
    [
      "NPS LBJ current closure conditions",
      "https://www.nps.gov/lyjo/planyourvisit/conditions.htm",
      "Texas White House and Hangar closures, gate hours"
    ],
    [
      "NPS LBJ plan your visit",
      "https://www.nps.gov/lyjo/planyourvisit/index.htm",
      "Two geographically distinct units and free ranch permit"
    ],
    [
      "NPS LBJ fees",
      "https://www.nps.gov/lyjo/planyourvisit/fees.htm",
      "Free entrance and permit requirements"
    ]
  ],
  "plan": [
    "Choose Johnson City and/or the Ranch rather than one generic pin",
    "Collect a free Ranch driving permit at the state historic site",
    "Avoid advertising the closed Texas White House complex as open"
  ]
},
  "padre-island-national-seashore": {
  "code": "pais",
  "summary": "Visit the federally protected North Padre Island shoreline south of Corpus Christi with NPS rules for Malaquite and other beaches, changing surf and rip currents, sand-driving limits and distinct camping areas.",
  "entryNote": "Check NPS tides, rip-current forecasts and beach water quality before entering the Gulf. North Beach, Malaquite, South Beach and 4WD Yarborough Pass have different driving/access requirements. Malaquite and Bird Island Basin campgrounds have separate facilities; alerts can override posted general openings.",
  "highlights": [
    "Malaquite Visitor Center beach access and Gulf scenery",
    "Long barrier-island habitat and coastal wildlife",
    "North and South Beach vehicle access subject to sand conditions",
    "Bird Island Basin camping and separately managed boat ramp"
  ],
  "body": [
    "Padre Island National Seashore protects a long undeveloped stretch of the barrier island near Corpus Christi. It is not the same place as the resort town of South Padre Island near the Rio Grande Valley. The protected beach, dunes, tidal flats and lagoon habitats are part of the experience, but visitors need to choose an exact access area rather than treating every mile of sand as a maintained city beach.",
    "NPS condition reports distinguish North Beach, Malaquite Beach, South Beach and the high-clearance Yarborough Pass road. Vehicle driving rules and sand conditions differ by zone, and deep soft sand can strand unsuitable vehicles. The current conditions page says beach access is normally open unless affected by specific alerts, but that status must be checked on the actual trip date. Do not claim a paved road or standard two-wheel-drive access for every remote stretch.",
    "Coastal risk is an immediate planning concern. NPS directs visitors to NOAA tide predictions and National Weather Service rip-current forecasts, along with Texas Beach Watch water quality reports. A photograph of calm surf cannot establish safe conditions tomorrow. Visitors should avoid dunes and sensitive nesting habitats except on approved paths, leave wildlife undisturbed and follow seasonal sea turtle protection instructions when they apply.",
    "Camping choices differ: Malaquite Campground and Bird Island Basin Campground are distinct NPS facilities, while primitive beach camping involves separate rules and road considerations. Bird Island Basin has a designated boating area. Neither an offshore surf-casting spot nor a Gulf-side beach automatically offers showers, drinking water or vehicle recovery. Confirm actual campground occupancy and permitted equipment with NPS.",
    "For a first trip, prioritize the Malaquite visitor area, a signed beach segment and a realistic time window around tides and wind. An extended south-beach drive should be attempted only when the current NPS conditions and your vehicle support it. A half-day beach stop can be rewarding without assuming miles of isolated driving are safe for every family."
  ],
  "faq": [
    [
      "Is Padre Island National Seashore the same as South Padre Island?",
      "No. The NPS seashore is on North Padre Island near Corpus Christi; South Padre Island is a different community much farther south."
    ],
    [
      "Can any vehicle reach Yarborough Pass?",
      "No. NPS identifies Yarborough Pass as a four-wheel-drive route; access and sand conditions must be checked before traveling."
    ],
    [
      "How should I assess swimming safety?",
      "Check NPS alerts, NOAA tides, the daily surf-zone rip-current forecast and Texas Beach Watch water-quality data. Do not rely on old photos."
    ]
  ],
  "sources": [
    [
      "NPS Padre Island conditions",
      "https://www.nps.gov/pais/planyourvisit/conditions.htm",
      "Access status, surf, water quality and beach zones"
    ],
    [
      "NPS Padre Island plan a visit",
      "https://www.nps.gov/pais/planyourvisit/index.htm",
      "Visitor center, activities and campground planning"
    ],
    [
      "NPS Padre Island driving guidance",
      "https://www.nps.gov/pais/planyourvisit/drivingdownisland.htm",
      "South Beach and four-wheel-drive access"
    ]
  ],
  "plan": [
    "Check tides, surf and rip-current conditions before arrival",
    "Choose Malaquite or another legally reachable beach zone",
    "Keep campground plans separate from remote beach-drive ambitions"
  ]
},
  "palo-alto-battlefield-national-historical-park": {
  "code": "paal",
  "summary": "Walk the preserved South Texas battlefield where U.S. and Mexican armies fought on May 8, 1846, with separate visitor-center hours and interpretation of the contested border and war from both nations' perspectives.",
  "entryNote": "NPS grounds are generally open daily 8 a.m.–5 p.m., with last new trail entry at 4:30 p.m. and gates locked at 5 p.m. Visitor Center is normally Tuesday–Saturday 9 a.m.–4 p.m., closed Sunday/Monday and sometimes subject to staffing closures. Official entrance is 7200 Paredes Line Road, not the downtown Brownsville mailing address.",
  "highlights": [
    "First major U.S.–Mexican War battlefield landscape (May 8, 1846)",
    "Exhibits interpreting U.S. and Mexican military perspectives",
    "Separate grounds, walking-trail and visitor-center schedules",
    "Protected coastal prairie near Brownsville"
  ],
  "body": [
    "Palo Alto Battlefield National Historical Park preserves the prairie landscape where American and Mexican armies fought on May 8, 1846, during the first major battle of the U.S.–Mexican War. Understanding this landscape requires context: the United States' annexation of Texas, competing claims about the Nueces and Rio Grande boundaries, and military maneuvers along the river were central to the conflict. The park's NPS interpretation includes viewpoints from both nations, rather than treating the battlefield as a simple celebration of a single army.",
    "Grounds typically open from 8 a.m. to 5 p.m. daily, but new trail access ends at 4:30 p.m. and all gates close at 5 p.m. The visitor center uses a different schedule, generally Tuesday through Saturday, 9 a.m.–4 p.m., and can close temporarily due to staffing. A Sunday stop may permit grounds access but not the exhibits or orientation film. Read current NPS hours before a long drive.",
    "The visitor entrance is 7200 Paredes Line Road north of Brownsville, near Los Fresnos, not the federal office mailing address on Harrison Street. Within the visitor center, NPS provides artifacts, interpretive media and a short film about the war. A short or moderate battlefield walk offers a different educational experience from a museum-only stop, and requires sun and weather planning across an exposed coastal prairie.",
    "The battlefield includes native habitat with grassland, mesquite and thorny vegetation. Visitors should stay on permitted routes and respect both sensitive flora and the site's historical resources. The NPS treats Palo Alto along with Resaca de la Palma Battlefield as part of the wider regional battle narrative; that does not mean both units share one parking entrance or the same open hours.",
    "An informed visit asks why armies were present, what the first clash meant for local communities and how the eventual conflict changed both countries. Bring water and sturdy walking shoes, spend time with source-based exhibits, and allow for visitor-center timing before the afternoon trail cutoff. NPS identifies this as a free admission site, but other separately operated regional attractions may have their own fees."
  ],
  "faq": [
    [
      "Can I visit Palo Alto Battlefield's museum on Sunday?",
      "The grounds can be open, but the NPS visitor center normally closes Sunday and Monday; check staffing notices before traveling."
    ],
    [
      "What time do the Palo Alto trails and gates close?",
      "NPS stops new trail entries at 4:30 p.m. and locks gates at 5 p.m.; vehicles must leave by closing."
    ],
    [
      "Is the site's mailing address the visitor entrance?",
      "No. Drive to 7200 Paredes Line Road in Brownsville. The downtown Harrison Street address is an administrative mailing address."
    ]
  ],
  "sources": [
    [
      "NPS Palo Alto hours",
      "https://www.nps.gov/paal/planyourvisit/hours.htm",
      "Different grounds and visitor center schedules"
    ],
    [
      "NPS Palo Alto basic info",
      "https://www.nps.gov/paal/planyourvisit/basicinfo.htm",
      "Physical entrance and safety times"
    ],
    [
      "NPS Palo Alto battle history",
      "https://www.nps.gov/paal/learn/historyculture/paloalto.htm",
      "1846 battle and interpretations"
    ]
  ],
  "plan": [
    "Reach the actual Paredes Line Road entrance during grounds hours",
    "Explore the visitor-center interpretation when staffed",
    "Finish walking routes before the 4:30 p.m. cutoff"
  ]
},
  "san-antonio-missions-national-historical-park": {
  "code": "saan",
  "summary": "Visit the four National Park Service Spanish colonial mission sites along San Antonio's Mission Reach, understanding active parish access and the separate status of the Alamo within the five-mission UNESCO World Heritage area.",
  "entryNote": "The NPS park includes Mission Concepción, Mission San José, Mission San Juan and Mission Espada; the Alamo is part of the UNESCO designation but is not one of these four NPS park sites. Historic churches remain active parishes; interiors may close for Mass, weddings and funerals. Review each mission's hours and Mission Reach route.",
  "highlights": [
    "Four NPS missions: Concepción, San José, San Juan and Espada",
    "Active Catholic parishes with services that affect church access",
    "Mission Reach trail linking river corridors and mission sites",
    "Historic acequias, ranching landscapes and Indigenous communities"
  ],
  "body": [
    "San Antonio Missions National Historical Park preserves four Spanish colonial mission complexes along the river south of downtown: Mission Concepción, Mission San José, Mission San Juan and Mission Espada. The Alamo, historically Mission Valero, is the fifth site in the wider UNESCO World Heritage group but is not administered as one of these four National Park Service mission complexes. A reliable guide must keep the NPS park's four sites separate from the broader five-site international designation.",
    "These missions represent more than surviving stone churches. They were colonial settlements, centers of farming and irrigation, and sites where Indigenous South Texans experienced missionary efforts and profound changes in community, labor and culture. Interpretive visits should acknowledge both Indigenous experiences and Spanish colonial institutions rather than presenting the story as an empty wilderness populated only by missionaries.",
    "All four mission churches are active Roman Catholic parishes administered by the Archdiocese of San Antonio. NPS notes church interiors may be unavailable during weddings, funerals, Mass and special services, even if exterior park grounds and visitor areas are open. Posted general church-access hours of roughly 9 a.m.–5 p.m. do not guarantee unrestricted entry into a service. Visitors should act respectfully at places of ongoing worship.",
    "NPS lists Mission San José visitor center open 9 a.m.–5 p.m. daily, while the Mission San Juan and Mission Espada contact stations and museums are typically 10 a.m.–4:30 p.m.; active church-parish interiors can close at other times for services. The park's mission sites are linked by modern roads and segments of the Mission Reach walking and biking trail. Their distances and entrances differ; Mission San José hosts the main NPS visitor center and interpretive facilities, while San Juan and Espada have different grounds and cultural landscapes. Irrigation features such as acequias and an aqueduct are part of the historical system but not every water channel is a public footpath.",
    "For a first visit, choose Mission San José to begin with museum context, then add one or two additional missions at a deliberate pace. Cyclists should check current trail conditions and legal crossings rather than assuming all four sites lie directly beside a single uninterrupted off-street path. The Alamo deserves its own distinct access plan and booking rules, not a fictional 'four missions plus Alamo' single national-park ticket."
  ],
  "faq": [
    [
      "Is the Alamo inside San Antonio Missions National Historical Park?",
      "No. The NPS park contains four missions—Concepción, San José, San Juan and Espada. The Alamo is the fifth UNESCO World Heritage mission but separately administered."
    ],
    [
      "Are the historic mission churches still used for worship?",
      "Yes. They remain active parishes, and interior visiting may be restricted for Mass, weddings, funerals or other church activities."
    ],
    [
      "Can I explore the park by bicycle?",
      "The Mission Reach connects mission areas by trails and streets, but access and crossings vary. Use NPS route maps and local trail conditions."
    ]
  ],
  "sources": [
    [
      "NPS San Antonio Missions plan a visit",
      "https://www.nps.gov/saan/planyourvisit/index.htm",
      "Four sites, active parishes and access"
    ],
    [
      "NPS UNESCO World Heritage explanation",
      "https://www.nps.gov/saan/learn/historyculture/world-heritage-site.htm",
      "Four NPS missions and distinct fifth Alamo"
    ],
    [
      "NPS San Antonio Missions trail planning",
      "https://www.nps.gov/saan/planyourvisit/biking.htm",
      "Mission Reach and travel between sites"
    ]
  ],
  "plan": [
    "Start at Mission San José's visitor center during NPS hours",
    "Choose which other mission entrances you can visit that day",
    "Respect active parish services and plan the Alamo separately"
  ]
},
};

function guide(facts:NpsSiteFacts): DestinationAuthorityGuide {
  const sources:DestinationAuthoritySource[] = facts.sources.map(([label,url,scope]) => ({label,url,scope}));
  return {
    whyItMatters: facts.body[0].slice(0,240),
    assessment: {
      recommendedVisit: facts.entryNote,
      physicalEffort: facts.code === "pais" || facts.code === "lamr" ? "Moderate" : "Low to moderate",
      weatherExposure: facts.code === "paal" || facts.code === "pais" || facts.code === "lamr" ? "Mostly outdoors" : "Mixed indoor/outdoor",
      planningLevel: "Moderate",
      familyFit: "Choose age-appropriate routes and verify official access, interpretation, weather and reservation conditions before arrival",
      firstTimeValue: facts.highlights[0],
    },
    itineraries: [
      { label:"First-time place-specific visit", duration:"About 1–3 hours or as facilities allow",
        steps:[facts.plan[0],facts.plan[1],facts.plan[2]] },
      { label:"Focused history or nature day", duration:"Half day",
        steps:["Confirm current NPS official hours, closures and admission rules",facts.plan[0],"Explore one signed interpretive route rather than assuming all site areas are public"] },
      { label:"Regional extension", duration:"Full day, including travel",
        steps:["Choose the federal park's exact visitor entrance",facts.plan[1],"Add another independently managed nearby attraction only after checking its own hours and access"] },
    ],
    sources,
  };
}

export function applyRemainingSixNpsAuthorities(destination: Destination): Destination {
  const facts = FACTS[destination.slug];
  if (!facts) return destination;
  try {
    const official = new URL(destination.officialUrl ?? "");
    if (official.protocol !== "https:" ||
      !["www.nps.gov","nps.gov"].includes(official.hostname) ||
      !(official.pathname === `/${facts.code}` || official.pathname.startsWith(`/${facts.code}/`))) return destination;
  } catch { return destination; }
  const existing = (destination.body ?? []).filter(Boolean);
  const prior = existing.join(" ");
  const newParagraphs = facts.body.filter(p => !prior.includes(p.slice(0,85)));
  return {
    ...destination,
    summary: facts.summary,
    entryNote: facts.entryNote,
    highlights: facts.highlights,
    body: prior.length > 2000 ? [...existing,...newParagraphs] : facts.body,
    visitorFaqs: [
      ...(destination.visitorFaqs ?? []).filter(old => !facts.faq.some(([q]) => q===old.question)),
      ...facts.faq.map(([question,answer])=>({question,answer,sourceUrl:facts.sources[0][1]}))
    ],
    authorityGuide: guide(facts),
    sourceCheckedAt: "2026-10-17"
  };
}
