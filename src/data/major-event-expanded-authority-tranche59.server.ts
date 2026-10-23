import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Organizer-reviewed, destination-scale Christmas attractions. The 2026–27
// event season is dated; ticket pricing, availability and time slots are not.
interface ChristmasExtendedRecord extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: ChristmasExtendedRecord[] = [
  {
    "slug": "gaylord-texan-ice",
    "name": "Gaylord Texan ICE! featuring Harry Potter 2026–27",
    "city": "Grapevine",
    "countySlug": "tarrant",
    "countyName": "Tarrant County",
    "region": "prairies-lakes",
    "category": "seasonal",
    "startDate": "2026-11-13",
    "endDate": "2027-01-03",
    "venue": "Gaylord Texan Resort & Convention Center · Lake Grapevine",
    "officialUrl": "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/overview/",
    "sourceCheckedAt": "2026-10-23",
    "seoTitle": "Gaylord Texan ICE! 2026: Harry Potter, Tickets & Grapevine Christmas",
    "seoDescription": "Plan Gaylord Texan ICE! featuring Harry Potter, Nov. 13, 2026–Jan. 3, 2027: timed tickets, cold-room advice, resort attractions and a Grapevine holiday weekend.",
    "whyItMatters": "ICE! is a ticketed resort attraction, not the free historic Grapevine Main Street Christmas experience. In the 2026–27 season, Gaylord Texan displays ice-carved scenes themed to Harry Potter in a temperature-controlled cold room with ice slides, with separate resort holiday offerings. It is especially worthwhile for travelers who want to pair a centerpiece indoor experience with a full Grapevine Christmas trip.",
    "quickFacts": [
      {
        "label": "Published season",
        "value": "November 13, 2026–January 3, 2027"
      },
      {
        "label": "2026 theme",
        "value": "ICE! featuring Harry Potter"
      },
      {
        "label": "Setting",
        "value": "Gaylord Texan Resort at Lake Grapevine"
      },
      {
        "label": "Cold-room temperature",
        "value": "Approximately 9°F; parkas supplied by ICE! operator"
      },
      {
        "label": "Booking",
        "value": "Choose a dated admission slot; resort rooms and other activities are separate products"
      }
    ],
    "planningSections": [
      {
        "title": "Book the exact ICE! time, not just the holiday resort visit",
        "body": "The published November–January season does not imply unlimited daily capacity. Select a dated entry from the official Gaylord Texan ticket options and confirm ticket type, age limits, cancellation rules and taxes before relying on a reservation. A hotel room is not automatically admission to ICE!."
      },
      {
        "title": "Prepare for the cold-room experience",
        "body": "The icy exhibit is maintained around 9°F. The ICE! attraction provides signature parkas, but closed-toe shoes, full-length trousers and warm layers are still appropriate. Young children may need extra insulation. Guests sensitive to cold or needing accessibility accommodations should consult the event's current access guidelines."
      },
      {
        "title": "Compare resort attractions as separate purchases",
        "body": "The holiday event can include other seasonal activities and packages beyond ICE!. Check whether a bundle genuinely covers your preferred activities and dates; do not treat every decorating, show, photograph, skating or hotel amenity as included with one ticket."
      },
      {
        "title": "Use the right Grapevine base",
        "body": "Gaylord Texan is located at Lake Grapevine rather than on Historic Main Street. Determine whether you will visit the resort only, or also downtown Grapevine and the North Pole Express; allocate realistic driving, parking and check-in time."
      },
      {
        "title": "Plan a family day without double-booking",
        "body": "A sensible visit uses one scheduled indoor anchor—ICE!—and a separate downtown or resort activity if energy allows. Weekends close to Christmas and school breaks can be crowded; verify parking, transportation and stroller accommodations directly."
      },
      {
        "title": "Compare lodging without implying event access",
        "body": "Hotel stays may simplify a late holiday evening but are optional. Compare Gaylord packages to other Grapevine/DFW lodging based on the actual night and group requirements. General hotel affiliate links elsewhere on TexasDefined are not ICE! admission."
      }
    ],
    "relatedLinks": [
      {
        "href": "/event/grapevine-christmas-capital-of-texas",
        "label": "Grapevine Christmas Capital of Texas",
        "description": "Compare downtown holiday events with separately operated Gaylord resort attractions"
      },
      {
        "href": "/events/christmas-events",
        "label": "Texas Christmas events calendar",
        "description": "Browse verified light displays, parades and train departures"
      },
      {
        "href": "/county/tarrant",
        "label": "Tarrant County visitor guide",
        "description": "Build a practical Grapevine and DFW holiday weekend"
      },
      {
        "href": "/event/grapevine-north-pole-express",
        "label": "North Pole Express train guide",
        "description": "A separate, timed family train ride that can complement ICE!"
      }
    ],
    "sources": [
      {
        "label": "Gaylord Texan official 2026 ICE! and resort page",
        "url": "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/overview/"
      },
      {
        "label": "Gaylord Hotels 2026 ICE! themed announcements",
        "url": "https://www.gaylordhotels.com/the-immersive-christmas-experience-ice-expands-to-eight-resorts-with-new-themes-including-harry-potter-home-alone-and-disney-tim-burton-s-the-nightmare-before-christmas"
      }
    ],
    "dateNote": "This is the published resort season window; use the hotel’s date-specific availability and official checkout for ICE! tickets."
  },
  {
    "slug": "grand-prairie-prairie-lights",
    "name": "Prairie Lights in Grand Prairie 2026",
    "city": "Grand Prairie",
    "countySlug": "dallas",
    "countyName": "Dallas County",
    "region": "prairies-lakes",
    "category": "seasonal",
    "startDate": "2026-11-26",
    "endDate": "2026-12-31",
    "venue": "Lynn Creek Park · 5610 Lake Ridge Parkway, Grand Prairie",
    "officialUrl": "https://www.gptx.org/Community-Calendar/Prairie-Lights-2026",
    "sourceCheckedAt": "2026-10-23",
    "seoTitle": "Prairie Lights 2026 Grand Prairie: Dates, Drive-Through & Parking",
    "seoDescription": "Prairie Lights at Lynn Creek Park runs nightly Nov. 26–Dec. 31, 2026, 6–10 p.m. Plan drive-through admission, peak holiday traffic and a DFW light-filled day trip.",
    "whyItMatters": "Grand Prairie's Prairie Lights is a signature two-mile drive-through light park at Lynn Creek Park, with millions of lights arranged along the vehicle route. Unlike a downtown free-to-walk display, admission and the driving queue are part of the experience. The city confirms nightly 6–10 p.m. operation from Thanksgiving through New Year's Eve 2026.",
    "quickFacts": [
      {
        "label": "2026 season",
        "value": "November 26–December 31, 2026"
      },
      {
        "label": "Nightly hours",
        "value": "6–10 p.m."
      },
      {
        "label": "Location",
        "value": "Lynn Creek Park at Joe Pool Lake"
      },
      {
        "label": "Experience",
        "value": "Approximately two-mile driving route"
      },
      {
        "label": "Admission",
        "value": "Ticketed per current city/operator checkout; check vehicle category and current price"
      }
    ],
    "planningSections": [
      {
        "title": "Treat this as a car-based evening",
        "body": "This display is primarily experienced by driving through a controlled light route. Confirm any pedestrian or midway activities on the current event site before planning to park and walk. The route length and slow moving cars require more time than a typical park drive."
      },
      {
        "title": "Choose arrival timing before deciding on dinner",
        "body": "Entry lanes can be busy around holiday weekends. Allow extra time for the drive-in queue, food stops and the actual circuit; do not combine the night with another timed DFW performance unless the gap is generous."
      },
      {
        "title": "Check the ticket's vehicle terms",
        "body": "Published pricing can depend on vehicle type, purchase timing or add-on experiences. Verify the permitted occupancy and whether online booking is required. The city's listing confirms the dates but does not promise a fixed all-season price."
      },
      {
        "title": "Follow Lynn Creek Park entrance guidance",
        "body": "The official address is 5610 Lake Ridge Parkway. Use the current Prairie Lights traffic and entrance instructions rather than relying on a generic park trailhead pin, particularly during peak nights."
      },
      {
        "title": "Bring the family comfortable and safe",
        "body": "The evening is vehicle centered, so pack snacks, water and whatever young children need for a potentially slow queue. Keep drivers attentive and follow the event's rules on windows, headlights and stopping for photos."
      },
      {
        "title": "Pair with Grand Prairie and Arlington sensibly",
        "body": "An earlier daytime stop near Joe Pool Lake, Grand Prairie or Arlington can make a good day trip. Nearby hotel searching only makes sense for groups traveling from farther away, not every local family driving in for an hour."
      }
    ],
    "relatedLinks": [
      {
        "href": "/event/grapevine-christmas-capital-of-texas",
        "label": "Grapevine Christmas Capital",
        "description": "Compare a holiday town walking experience with Prairie Lights' drive-through route"
      },
      {
        "href": "/events/christmas-events",
        "label": "Texas Christmas calendar",
        "description": "Find alternative light displays for your chosen December evening"
      },
      {
        "href": "/county/dallas",
        "label": "Dallas County travel guide",
        "description": "Build a DFW family outing"
      },
      {
        "href": "/event/gaylord-texan-ice",
        "label": "Gaylord Texan ICE!",
        "description": "Contrast an indoor ice-sculpture attraction with outdoor driving lights"
      }
    ],
    "sources": [
      {
        "label": "City of Grand Prairie — Prairie Lights 2026",
        "url": "https://www.gptx.org/Community-Calendar/Prairie-Lights-2026"
      },
      {
        "label": "Prairie Lights organizer",
        "url": "https://prairielights.org/"
      }
    ],
    "dateNote": "The City of Grand Prairie confirms every night November 26–December 31, 6–10 p.m.; recheck weather, traffic and ticket details."
  },
  {
    "slug": "moody-gardens-holiday-in-the-gardens",
    "name": "Moody Gardens Holiday in the Gardens 2026–27",
    "city": "Galveston",
    "countySlug": "galveston",
    "countyName": "Galveston County",
    "region": "gulf-coast",
    "category": "seasonal",
    "startDate": "2026-11-21",
    "endDate": "2027-01-02",
    "venue": "Moody Gardens · 1 Hope Boulevard, Galveston",
    "officialUrl": "https://www.moodygardens.com/holiday-season",
    "sourceCheckedAt": "2026-10-23",
    "seoTitle": "Moody Gardens Holiday in the Gardens 2026: Lights, ICE LAND & Tickets",
    "seoDescription": "Holiday in the Gardens runs Nov. 21, 2026–Jan. 2, 2027. Compare the Galveston lights trail, ICE LAND, holiday passes, free parking and family attractions.",
    "whyItMatters": "Holiday in the Gardens is the resort-wide Galveston holiday festival that connects the mile-long Holiday Lights Trail (formerly Festival of Lights), the independently featured ICE LAND: Caribbean Christmas, holiday films, skating, slides, dining and shows. Visitors should decide between a light-trail outing and a multi-attraction evening before choosing admissions.",
    "quickFacts": [
      {
        "label": "2026–27 season",
        "value": "November 21, 2026–January 2, 2027"
      },
      {
        "label": "Holiday lights",
        "value": "A mile-long trail, generally nightly 6–10 p.m.; check live operating calendar"
      },
      {
        "label": "ICE LAND 2026 theme",
        "value": "Caribbean Christmas"
      },
      {
        "label": "Parking",
        "value": "Moody Gardens advertises free festival parking"
      },
      {
        "label": "Ticket choice",
        "value": "Single-attraction or multi-attraction Holiday Pass; not all products cover the same experiences"
      }
    ],
    "planningSections": [
      {
        "title": "Pick a lights-only visit or the Holiday Pass",
        "body": "The Holiday Lights Trail, ICE LAND, skating, movies and other programs may be ticketed separately or included in specific bundled products. A pass marketed for after-4-p.m. use should not be assumed valid earlier in the day."
      },
      {
        "title": "Know the ICE LAND temperature",
        "body": "ICE LAND's 2026 Caribbean theme is inside a 9°F exhibit. Wear cold-weather layers and closed shoes even if the rest of Galveston is mild. Recheck child age limits and current ice-slide rules."
      },
      {
        "title": "Leave enough time for the full bayfront route",
        "body": "The light display extends about a mile. Weather, accessibility needs and the age of children can change how quickly the group moves. A simple trail ticket requires less time than adding several indoor films or skating."
      },
      {
        "title": "Use the official event calendar, not a season-long guess",
        "body": "Moody Gardens markets the season from November 21 to January 2, with light-trail operating hours published separately. Individual films, dining events and holiday shows can have selected days and showtimes."
      },
      {
        "title": "Compare tickets directly with organizers",
        "body": "The site publishes 2026 prices and Holiday Pass options, but promotional offers may expire and change. Use the linked operator ticket page for live date pricing, inclusions and refunds rather than relying on stale third-party listings."
      },
      {
        "title": "Make a Galveston coastal holiday itinerary",
        "body": "Pair an afternoon at the island's historic district, Seawall or attractions with a fixed Moody Gardens evening; return to the island for Dickens on The Strand only if your travel dates overlap."
      },
      {
        "title": "Parking and overnight considerations",
        "body": "Moody Gardens advertises free parking for the season. The resort hotel offers separately priced rooms and packages, while other Galveston lodging may be more practical for travelers visiting multiple island neighborhoods."
      }
    ],
    "relatedLinks": [
      {
        "href": "/event/moody-gardens-ice-land",
        "label": "Moody Gardens ICE LAND",
        "description": "Go deeper on the separately ticketed cold-room attraction"
      },
      {
        "href": "/event/dickens-on-the-strand",
        "label": "Dickens on The Strand",
        "description": "Combine two distinct Galveston holiday traditions"
      },
      {
        "href": "/county/galveston",
        "label": "Galveston County guide",
        "description": "Plan more island activities around the evening light trail"
      },
      {
        "href": "/events/christmas-events",
        "label": "Texas Christmas calendar",
        "description": "Compare Gulf Coast and statewide light displays"
      }
    ],
    "sources": [
      {
        "label": "Moody Gardens official Holiday in the Gardens 2026",
        "url": "https://www.moodygardens.com/holiday-season"
      },
      {
        "label": "Moody Gardens holiday FAQ",
        "url": "https://www.moodygardens.com/holiday-season/faq"
      },
      {
        "label": "Moody Gardens 2026 details and Holiday Pass",
        "url": "https://www.moodygardens.com/holiday-season/things-to-do"
      }
    ],
    "dateNote": "The overall festival season spans these dates. Always check the separate operating times for ICE LAND, lights, shows, skating and dining."
  },
  {
    "slug": "grapevine-north-pole-express",
    "name": "Grapevine Santa's North Pole Express 2026",
    "city": "Grapevine",
    "countySlug": "tarrant",
    "countyName": "Tarrant County",
    "region": "prairies-lakes",
    "category": "seasonal",
    "startDate": "2026-11-27",
    "endDate": "2026-12-30",
    "venue": "Grapevine Vintage Railroad · Grapevine / December 3 Fort Worth Stockyards",
    "officialUrl": "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/dates-times/",
    "sourceCheckedAt": "2026-10-23",
    "seoTitle": "Grapevine North Pole Express 2026: Train Dates, Tickets & Boarding",
    "seoDescription": "Find 2026 Grapevine North Pole Express boarding dates Nov. 27–Dec. 30, special Fort Worth Dec. 3 departures, holiday closures, official tickets and arrival tips.",
    "whyItMatters": "The North Pole Express is a timed, ticketed Grapevine Vintage Railroad holiday excursion, not the same attraction as the licensed Polar Express rail events elsewhere in Texas. Most departures board in Grapevine, but the organizer publishes a special December 3, 2026 Fort Worth Stockyards departure series. December 24 and 25 do not operate.",
    "quickFacts": [
      {
        "label": "Season",
        "value": "November 27–December 30, 2026, selected departure schedules"
      },
      {
        "label": "2026 special location",
        "value": "December 3 departs Historic Stockyards Station, Fort Worth"
      },
      {
        "label": "Closed dates",
        "value": "December 24–25; December 3 does not depart Grapevine Station"
      },
      {
        "label": "Boarding",
        "value": "Doors close five minutes before departure"
      },
      {
        "label": "Check-in",
        "value": "Begins about 20 minutes before boarding; arrive more than an hour early for parking and activities"
      }
    ],
    "planningSections": [
      {
        "title": "Buy the precise boarding time from Grapevine's approved ticketing",
        "body": "Use the city's official Grapevine Christmas or railroad ticketing sites. The organizer cautions against unofficial resale and does not guarantee third-party tickets. A generic Grapevine Main Street event page is not proof of a train seat."
      },
      {
        "title": "December 3 has a different departure station",
        "body": "The 2026 dated departures page identifies Historic Stockyards Station in Fort Worth for December 3 trains. Do not arrive at Grapevine's normal departure location for that special date. Check the printed station and current ticket confirmation."
      },
      {
        "title": "Do not book for Christmas Eve or Christmas Day",
        "body": "The 2026 schedule skips December 24–25; the final departures are on December 26–30. Date-specific sessions and space can sell out independently even when the broader Christmas Capital celebration continues."
      },
      {
        "title": "Arrive earlier than the boarding time",
        "body": "The operator recommends more than an hour early for parking, ticket collection, market activities and photographs. Train check-in begins around 20 minutes before departure and doors close five minutes before it; late guests cannot board."
      },
      {
        "title": "Compare with The Polar Express before buying",
        "body": "Texas has distinct holiday railroad products with different operators and departure depots. The North Pole Express is Grapevine's themed train; the licensed Polar Express rides in Galveston and Palestine are not interchangeable tickets."
      },
      {
        "title": "Combine the train with downtown Grapevine carefully",
        "body": "Choose one train departure as the fixed anchor. Historic Main Street decorations and free-to-walk surroundings can extend the visit, but holiday closures, weather and crowds affect parking and restaurant plans."
      },
      {
        "title": "Know inclusions and extras",
        "body": "The organizer lists songs, elves, treats and Santa-related experiences with varying ticket products. Check the exact 2026 ticket detail for photo or souvenir inclusions and do not infer that every market purchase is included."
      }
    ],
    "relatedLinks": [
      {
        "href": "/event/grapevine-christmas-capital-of-texas",
        "label": "Grapevine Christmas Capital",
        "description": "Plan the wider downtown Christmas itinerary"
      },
      {
        "href": "/article/texas-christmas-train-rides",
        "label": "Texas Christmas train rides",
        "description": "Compare Grapevine with Galveston and Palestine rail excursions"
      },
      {
        "href": "/event/gaylord-texan-ice",
        "label": "Gaylord Texan ICE!",
        "description": "Pair a resort holiday attraction with a rail trip"
      },
      {
        "href": "/events/christmas-events",
        "label": "Christmas calendar",
        "description": "Find the exact 2026 Grapevine and Fort Worth train operating windows"
      }
    ],
    "sources": [
      {
        "label": "Grapevine 2026 Santa's North Pole Express dates and boarding times",
        "url": "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/dates-times/"
      },
      {
        "label": "Grapevine approved train ticket and resale policy",
        "url": "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/"
      },
      {
        "label": "Grapevine official Christmas attraction ticket hub",
        "url": "https://www.grapevinetexasusa.com/christmas-capital-of-texas/purchase-tickets/"
      }
    ],
    "dateNote": "This is a season envelope, not a nightly venue event. The accompanying Christmas calendar records show the true departure windows; December 3 boards in Fort Worth and December 24–25 do not operate.",
    "occurrenceWindows": [
      {
        "label": "Grapevine departures Nov 27–Dec 2",
        "startDate": "2026-11-27",
        "endDate": "2026-12-02"
      },
      {
        "label": "Fort Worth Stockyards departures",
        "startDate": "2026-12-03"
      },
      {
        "label": "Grapevine departures Dec 4–23",
        "startDate": "2026-12-04",
        "endDate": "2026-12-23"
      },
      {
        "label": "Grapevine departures Dec 26–30",
        "startDate": "2026-12-26",
        "endDate": "2026-12-30"
      }
    ]
  },
  {
    "slug": "dallas-zoo-lights",
    "name": "Dallas Zoo Lights 2026–27",
    "city": "Dallas",
    "countySlug": "dallas",
    "countyName": "Dallas County",
    "region": "prairies-lakes",
    "category": "seasonal",
    "startDate": "2026-11-13",
    "endDate": "2027-01-03",
    "venue": "Dallas Zoo · 650 South R.L. Thornton Freeway, Dallas",
    "officialUrl": "https://www.dallaszoo.com/event/lights/",
    "sourceCheckedAt": "2026-10-23",
    "seoTitle": "Dallas Zoo Lights 2026: Select Dates, Tickets, Parking & Hours",
    "seoDescription": "Plan Dallas Zoo Lights 2026–27 on select nights Nov. 13–Jan. 3, 5:30–9 p.m. Check ticketed nights, Combo Ticket options, parking and Christmas closures.",
    "whyItMatters": "Dallas Zoo Lights is a nighttime walk-through holiday attraction using illuminated themes, lanterns and more than two million lights. It does not operate on every night between November 13 and January 3. The Zoo's official schedule and your exact ticket date are essential because Christmas Eve and Christmas Day are closed.",
    "quickFacts": [
      {
        "label": "2026–27 schedule",
        "value": "Selected nights November 13, 2026–January 3, 2027"
      },
      {
        "label": "Evening hours",
        "value": "5:30–9 p.m. on confirmed dates"
      },
      {
        "label": "Ticket type",
        "value": "Zoo Lights evening admission; daytime zoo and combo admission are separate"
      },
      {
        "label": "Parking",
        "value": "The Zoo lists $15 public parking and free member parking; recheck pricing"
      },
      {
        "label": "Holiday closure",
        "value": "No Zoo Lights December 24–25"
      }
    ],
    "planningSections": [
      {
        "title": "Use the dated Zoo Lights calendar, not the continuous range",
        "body": "The zoo lists exact nights in November, December and January. There are breaks between windows, including November 16–17 and December 24–25, so do not assume the attraction opens simply because the date is between launch and closing."
      },
      {
        "title": "Understand the evening ticket",
        "body": "Zoo Lights is a ticketed nighttime light experience. A regular daytime general admission ticket is different from evening admission; the Zoo also advertises a combined visit option for guests who want to see animals earlier in the day."
      },
      {
        "title": "Animals generally are not part of the evening visit",
        "body": "The operator says most animals are resting before the lights begin. The walk-through area uses Main Entrance, ZooNorth and the tunnel; don't market Zoo Lights as a nighttime animal safari."
      },
      {
        "title": "Plan parking or the DART Red Line",
        "body": "The Zoo advertises public parking for a fee while some membership tiers park free. During popular nights parking may fill; the Zoo specifically suggests considering DART Red Line access. Double-check public transport frequency for your preferred ending time."
      },
      {
        "title": "Compare timed add-on extras separately",
        "body": "Holiday igloos, packages, souvenirs, photo opportunities and food can be optional purchases. Confirm what's included in the basic ticket rather than assuming featured promotions are automatically bundled."
      },
      {
        "title": "Check group mobility and outdoor weather",
        "body": "Guests will walk through exterior exhibits at night. Allow time for a loop, mobility access, food breaks and cold/rain considerations. Consult the Zoo's official guest guidance for stroller and accessibility policies."
      },
      {
        "title": "Build a Dallas holiday afternoon",
        "body": "A daytime city stop or an earlier zoo visit can pair with the evening lights, but choose one neighborhood and avoid trying to reach another major DFW holiday attraction across rush-hour traffic."
      }
    ],
    "relatedLinks": [
      {
        "href": "/event/holiday-at-the-dallas-arboretum",
        "label": "Holiday at the Dallas Arboretum",
        "description": "Compare Dallas walk-through Christmas attractions"
      },
      {
        "href": "/event/grand-prairie-prairie-lights",
        "label": "Prairie Lights in Grand Prairie",
        "description": "Compare Zoo Lights walking route to drive-through lights"
      },
      {
        "href": "/county/dallas",
        "label": "Dallas County visitor guide",
        "description": "Plan nearby daytime attractions and travel"
      },
      {
        "href": "/events/christmas-events",
        "label": "Texas Christmas calendar",
        "description": "Choose a verified Dallas Zoo Lights operating night"
      }
    ],
    "sources": [
      {
        "label": "Dallas Zoo Lights official 2026 event calendar and ticket options",
        "url": "https://www.dallaszoo.com/event/lights/"
      },
      {
        "label": "Dallas Zoo holiday attraction details",
        "url": "https://www.dallaszoo.com/zoo-lights/"
      },
      {
        "label": "Dallas Zoo parking and general guest information",
        "url": "https://www.dallaszoo.com/plan-your-visit/general-information/"
      }
    ],
    "dateNote": "The event operates selected nights only; the accompanying Christmas calendar shows 6 documented windows rather than counting closed dates between them.",
    "occurrenceWindows": [
      {
        "label": "Nov 13–15",
        "startDate": "2026-11-13",
        "endDate": "2026-11-15"
      },
      {
        "label": "Nov 18–29",
        "startDate": "2026-11-18",
        "endDate": "2026-11-29"
      },
      {
        "label": "Dec 2–6",
        "startDate": "2026-12-02",
        "endDate": "2026-12-06"
      },
      {
        "label": "Dec 9–13",
        "startDate": "2026-12-09",
        "endDate": "2026-12-13"
      },
      {
        "label": "Dec 16–23",
        "startDate": "2026-12-16",
        "endDate": "2026-12-23"
      },
      {
        "label": "Dec 26–Jan 3",
        "startDate": "2026-12-26",
        "endDate": "2027-01-03"
      }
    ]
  }
];

const bySlug = new Map(records.map((event) => [event.slug, event] as const));

export function getExpandedMajorEventAuthorityTranche59Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
