import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Individually researched annual-event guides added October 21, 2026.
// Past-edition dates intentionally remain expired until organizers announce a new occurrence.
type FestivalEventRecord = MajorEventAuthorityRecord & { occurrenceWindows?: Array<{label?: string; startDate: string; endDate?: string}> };
const records: FestivalEventRecord[] = [
  {
    slug: "diwalisa-san-antonio",
    name: "DiwaliSA Festival of Lights",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "culture",
    startDate: "2026-11-07",
    endDate: "2026-11-07",
    venue: "Arneson River Theater and Hemisfair",
    officialUrl: "https://anujasa.com/diwalisa",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "DiwaliSA brings Indian music, dance, food, rangoli and lamps to two downtown San Antonio gathering places. This city-cohosted evening honors the Festival of Lights and the city's connection with Chennai, India; it is not the separate Houston Diwali celebration.",
    quickFacts: [
      {
        label: "Confirmed date",
        value: "Saturday, November 7, 2026"
      },
      {
        label: "Organizers",
        value: "Anuja SA and City of San Antonio"
      },
      {
        label: "Published hours",
        value: "4:30 p.m. to midnight"
      },
      {
        label: "Downtown footprint",
        value: "Arneson River Theater and Hemisfair"
      }
    ],
    planningSections: [
      {
        title: "Understand the two-location setting",
        body: "The 2026 organizer names both Arneson River Theater and Hemisfair. Look up the current performance map and arrival instructions before choosing a parking garage; these are distinct downtown areas, not a single gate."
      },
      {
        title: "Make time for the evening performances",
        body: "The organizer describes live dance, music, food vendors, lights and rangoli. Performances and vendor participation can change; choose your must-see program from the current schedule rather than assuming every act performs all night."
      },
      {
        title: "Plan a downtown San Antonio evening",
        body: "Downtown traffic and pedestrian movement can be heavier during large celebrations. Consider one parking location or available public transit and allow room for a River Walk visit; review accessibility and street closure announcements directly with the organizers."
      },
      {
        title: "Respect the cultural setting",
        body: "Diwali is a festival with religious and cultural significance for many communities. Enjoy the public performances and traditions respectfully, and ask before photographing individual participants or ceremonial activities."
      }
    ],
    relatedLinks: [
      {
        href: "/county/bexar",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/houston-diwali-festival-of-lights",
        label: "Houston Diwali",
        description: "Compare another verified Texas Festival of Lights event."
      }
    ],
    sources: [
      {
        label: "Anuja SA 2026 event and hours",
        url: "https://anujasa.com/diwalisa"
      },
      {
        label: "Visit San Antonio 2026 listing",
        url: "https://www.visitsanantonio.com/event/diwalisa-2026/12629/"
      }
    ]
  },
  {
    slug: "homestead-fair-waco",
    name: "Homestead Fair",
    city: "Waco",
    countySlug: "mclennan",
    countyName: "McLennan County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-11-27",
    endDate: "2026-11-29",
    venue: "Homestead Heritage, 747 Dry Creek Road",
    officialUrl: "https://www.homesteadfair.com/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "At Homestead Fair, a working-farm setting becomes a three-day Thanksgiving-weekend introduction to handmade crafts, farm animals, draft-horse demonstrations, cooking and music. A free admission policy does not mean that parking and optional experiences are free.",
    quickFacts: [
      {
        label: "2026 dates",
        value: "November 27–29, 2026"
      },
      {
        label: "Grounds admission",
        value: "Free; parking pass required"
      },
      {
        label: "Friday–Saturday",
        value: "9 a.m.–9 p.m."
      },
      {
        label: "Sunday",
        value: "10 a.m.–5 p.m."
      }
    ],
    planningSections: [
      {
        title: "Separate admission from parking and activities",
        body: "The organizer lists general admission as free, with a per-vehicle weekend parking pass. Optional make-your-own crafts, rides and other experiences may involve separate purchases; check current availability and pass terms on the official ticket page."
      },
      {
        title: "Pick a practical workshop itinerary",
        body: "More than two dozen crafts compete for attention with animal programs, blacksmithing, glassblowing, cooking and family activities. Select a few time-sensitive demonstrations before arrival, then explore the rest of the farm without rushing from one side to another."
      },
      {
        title: "Use the posted opening hours rather than a generic festival timetable",
        body: "Friday and Saturday grounds are scheduled 9 a.m. to 9 p.m.; Sunday is shorter, ending at 5 p.m. Organizers describe concerts and craft schedules separately, and the online activity list remains preliminary."
      },
      {
        title: "Plan for a rural-property visit",
        body: "The site is at 747 Dry Creek Road, outside the downtown Waco grid. Arrive with your parking instructions and a family meeting point. Ask the organizer about step-free workshop access, service animals and current weather contingency plans instead of presuming every farm area is identical."
      }
    ],
    relatedLinks: [
      {
        href: "/county/mclennan",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/waco-wonderland",
        label: "Waco Wonderland",
        description: "Compare Waco's early-December downtown celebration."
      }
    ],
    sources: [
      {
        label: "Homestead Fair official program, dates and admission",
        url: "https://www.homesteadfair.com/"
      },
      {
        label: "Homestead Fair preliminary schedule",
        url: "https://www.homesteadfair.com/schedule/"
      },
      {
        label: "Official parking and ticket details",
        url: "https://www.homesteadfair.com/tickets/"
      }
    ]
  },
  {
    slug: "waco-wonderland",
    name: "Waco Wonderland",
    city: "Waco",
    countySlug: "mclennan",
    countyName: "McLennan County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-12-04",
    endDate: "2026-12-06",
    venue: "Heritage Square, Downtown Waco",
    officialUrl: "https://www.wacowonderland.com/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "Waco Wonderland transforms Heritage Square into a downtown holiday gathering with the parade, tree lighting, Santa visits, a market and family rides. Visitors should distinguish free festival access from paid attraction wristbands.",
    quickFacts: [
      {
        label: "2026 festival",
        value: "December 4–6"
      },
      {
        label: "Location",
        value: "Heritage Square, downtown Waco"
      },
      {
        label: "General admission",
        value: "Free"
      },
      {
        label: "Rides",
        value: "Separate wristband purchase"
      }
    ],
    planningSections: [
      {
        title: "Know what requires a wristband",
        body: "The organizers describe free entrance, Santa photos and the overall downtown celebration, while the Ferris wheel, snow tube hills and trackless train require ride wristbands for guests aged one and above. Recheck this year's online terms before purchasing."
      },
      {
        title: "Plan around parade and fireworks notices",
        body: "The festival lists a downtown holiday parade, lighting activities and fireworks; precise street closures and the final 2026 fireworks timetable were still being finalized when checked October 21. Verify published day-by-day times rather than quoting old schedules."
      },
      {
        title: "Allow a walkable downtown itinerary",
        body: "Heritage Square is near restaurants and downtown shopping. Organizers give 300 Austin Avenue as the visitor location; check the current parking plan and road restrictions before attempting to arrive during parade staging."
      },
      {
        title: "Prepare for outdoor winter activities",
        body: "Snow tubing and the Ferris wheel are weather- and operationally sensitive. Keep young children together in the market and ride lines; ask the organizer about accessible attractions and stroller access where needed."
      }
    ],
    relatedLinks: [
      {
        href: "/county/mclennan",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/homestead-fair-waco",
        label: "Homestead Fair",
        description: "Another family-friendly Waco holiday-weekend destination."
      }
    ],
    sources: [
      {
        label: "Official Waco Wonderland event and attractions",
        url: "https://www.wacowonderland.com/"
      },
      {
        label: "Official accessibility, admission and ride details",
        url: "https://www.wacowonderland.com/contact"
      },
      {
        label: "Baylor Waco listing confirming 2026 dates",
        url: "https://waco.web.baylor.edu/event/2026/1557149"
      }
    ]
  },
  {
    slug: "whooping-crane-festival",
    name: "Whooping Crane Festival",
    city: "Port Aransas",
    countySlug: "nueces",
    countyName: "Nueces County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2027-02-25",
    endDate: "2027-02-28",
    venue: "Port Aransas Civic Center and offsite nature excursions",
    officialUrl: "https://www.portaransas.org/whooping-crane-festival/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "This annual coastal gathering connects birders with the endangered whooping crane's winter habitat through speaker sessions, birding excursions, boat tours and photography workshops. Guided field trips and boat outings require separate planning; some are not at the Civic Center.",
    quickFacts: [
      {
        label: "Confirmed edition",
        value: "February 25–28, 2027"
      },
      {
        label: "Festival hub",
        value: "Port Aransas Civic Center"
      },
      {
        label: "Experiences",
        value: "Birding trips, boat trips, nature tours and talks"
      },
      {
        label: "Check-in",
        value: "Paperless; present purchaser ID for purchased outings"
      }
    ],
    planningSections: [
      {
        title: "Reserve the particular field trip before accommodation",
        body: "Boat outings, nature tours and photography workshops have different departure points, group capacities, prices and weather risks. Select and book the specific outing through the festival program before deciding which mornings are free."
      },
      {
        title: "Do not assume the speakers' schedule is the boat schedule",
        body: "The Civic Center hosts festival activity, while excursions travel to coastal and wetland habitats. The official 2027 page currently retains some 2026 check-in hours as historical information; do not apply those hours to 2027."
      },
      {
        title: "Prepare for responsible wildlife watching",
        body: "Keep distance from endangered birds, respect refuge access rules and follow guides' instructions. Binoculars and weather-appropriate clothing help; boat tours may have different mobility requirements, seasickness risks and child policies."
      },
      {
        title: "Build a multi-day Port Aransas visit",
        body: "Birding-focused visitors can connect the festival with Port Aransas nature preserves and area coastal attractions. Confirm ferry delays, boating weather and any beach access rules before committing to a tight itinerary."
      }
    ],
    relatedLinks: [
      {
        href: "/county/nueces",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/texas-sandfest",
        label: "Texas SandFest",
        description: "A different springtime Port Aransas travel anchor."
      }
    ],
    sources: [
      {
        label: "Port Aransas Tourism Bureau 2027 festival",
        url: "https://www.portaransas.org/whooping-crane-festival/the-2027-festival/"
      },
      {
        label: "Port Aransas Whooping Crane Festival overview",
        url: "https://www.portaransas.org/whooping-crane-festival/"
      }
    ]
  },
  {
    slug: "dallas-international-film-festival",
    name: "Dallas International Film Festival",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-04-22",
    endDate: "2027-04-29",
    venue: "Multiple Dallas-area screening venues; see official program",
    officialUrl: "https://diffdallas.org/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "Dallas International Film Festival brings independent and international filmmakers into conversation with North Texas audiences. The permanent guide helps readers plan passes, screening travel and industry sessions while leaving the still-developing 2027 film lineup to the organizer.",
    quickFacts: [
      {
        label: "Confirmed 2027 dates",
        value: "April 22–29, 2027"
      },
      {
        label: "Host",
        value: "DIFF Dallas"
      },
      {
        label: "Scope",
        value: "Film screenings, filmmaker events and education"
      },
      {
        label: "Venues",
        value: "Check current program; multiple screening sites"
      }
    ],
    planningSections: [
      {
        title: "Wait for the program before selecting films",
        body: "The organizing nonprofit has confirmed the festival dates while submissions are open; individual film schedules, venue rooms, access tiers and Q&A sessions remain dependent on programming announcements. Do not mistake dates for a complete screening calendar."
      },
      {
        title: "Choose a pass based on the experience",
        body: "A film-screening visitor, an industry participant and a person attending one filmmaker conversation may require different products. Confirm eligibility, entry windows, age ratings and ticket-refund terms through DIFF's official purchase channels."
      },
      {
        title: "Minimize cross-town transfers",
        body: "Dallas theaters are not all in one contiguous venue. Group screenings by neighborhood when the final schedule comes out, account for rush-hour travel and reserve accessible seating or captioning accommodations with the specific venue."
      },
      {
        title: "Use Dallas as the base, not an assumed venue",
        body: "Downtown and the Arts District can make sense as trip bases, but avoid recommending a specific hotel before the 2027 screening list. Check each event address on the organizer's program."
      }
    ],
    relatedLinks: [
      {
        href: "/county/dallas",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/worldfest-houston",
        label: "WorldFest-Houston",
        description: "Compare another Texas international film festival."
      }
    ],
    sources: [
      {
        label: "DIFF Dallas official 2027 dates and festival mission",
        url: "https://diffdallas.org/"
      }
    ]
  },
  {
    slug: "worldfest-houston",
    name: "WorldFest-Houston International Film Festival",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2027-04-30",
    endDate: "2027-05-08",
    venue: "Houston screening venues; see published 2027 program",
    officialUrl: "https://www.worldfest.org/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "WorldFest-Houston's 60th edition focuses on independent film and international storytellers. The festival's 2027 dates are announced, but submissions and juror recruitment are still underway; specific public screenings and venues should not be asserted until the final program.",
    quickFacts: [
      {
        label: "60th festival edition",
        value: "April 30–May 8, 2027"
      },
      {
        label: "Organizer",
        value: "Houston International Film Festival, Inc."
      },
      {
        label: "Festival focus",
        value: "International independent cinema"
      },
      {
        label: "2027 schedule",
        value: "Films and screening venues to be announced"
      }
    ],
    planningSections: [
      {
        title: "Distinguish film submissions from visitor ticket sales",
        body: "The site prominently features submission deadlines and jury participation. These are industry opportunities, not public admission passes. Use only the announced screening and ticket program when arranging a visitor trip."
      },
      {
        title: "Plan by the final screening venue map",
        body: "A festival window spanning more than one week does not indicate where each film screens. Wait for theater addresses, ticket types and screening times before making rigid dinner, parking or lodging reservations."
      },
      {
        title: "Explore filmmaker programming appropriately",
        body: "WorldFest recognizes emerging and established international filmmakers; seminars, awards and showcases can carry different attendance rules from general screenings. Check individual sessions for access requirements and accessibility services."
      },
      {
        title: "Make a sensible Houston itinerary",
        body: "Houston's arts districts, museums and dining can complement a festival visit. Account for traffic, heat and possible storm conditions; treat the published organizer schedule as the source for any final travel commitment."
      }
    ],
    relatedLinks: [
      {
        href: "/county/harris",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/dallas-international-film-festival",
        label: "Dallas International Film Festival",
        description: "Compare another Texas film festival."
      }
    ],
    sources: [
      {
        label: "WorldFest official 60th-edition dates and nonprofit organizer",
        url: "https://www.worldfest.org/"
      },
      {
        label: "WorldFest 2027 submissions and deadlines",
        url: "https://www.worldfest.org/film-submission"
      }
    ]
  },
  {
    slug: "waco-independent-film-festival",
    name: "Waco Independent Film Festival",
    city: "Waco",
    countySlug: "mclennan",
    countyName: "McLennan County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-07-15",
    endDate: "2027-07-18",
    venue: "Downtown Waco theaters; exact screenings TBA",
    officialUrl: "https://www.wacoindie.com/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "Waco Indie combines a compact downtown film-festival atmosphere with screenings, conversations and filmmaker recognition. The announced July 2027 physical festival is distinct from the online encore that starts after the in-person edition.",
    quickFacts: [
      {
        label: "In-person 2027 festival",
        value: "July 15–18, 2027"
      },
      {
        label: "Online encore",
        value: "July 18–24, 2027"
      },
      {
        label: "Organizing nonprofit",
        value: "Heart of Texas Film Society"
      },
      {
        label: "Program",
        value: "Individual screening lineup to be announced"
      }
    ],
    planningSections: [
      {
        title: "Separate theater dates from online encore access",
        body: "The festival advertises a four-day downtown Waco in-person event followed by an online encore. A ticket or pass for one format should not be assumed to include the other; check which films are licensed for streaming."
      },
      {
        title: "Plan around a screening or filmmaker event",
        body: "Venue doors, Q&As and sell-outs matter more than a general multi-day date. Choose the sessions you most want, then use downtown Waco dining and walkable activities around those fixed times."
      },
      {
        title: "Check the venue before buying parking or lodging",
        body: "Past editions used downtown movie houses, including the Waco Hippodrome. The 2027 festival has announced the city and dates, but current individual screening locations must be verified on the final program."
      },
      {
        title: "Accessible filmgoing takes advance coordination",
        body: "Ask the festival or individual theater about captioning, wheelchair seating, sensory needs and showtimes before purchasing restricted admission, especially for one-off independent screenings."
      }
    ],
    relatedLinks: [
      {
        href: "/county/mclennan",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/waco-wonderland",
        label: "Waco Wonderland",
        description: "Another major downtown Waco cultural gathering."
      }
    ],
    sources: [
      {
        label: "Waco Indie organizer and 2027 public dates",
        url: "https://www.wacoindie.com/"
      },
      {
        label: "Official submission platform confirming 2027 edition",
        url: "https://filmfreeway.com/WacoIndie"
      }
    ]
  },
  {
    slug: "texas-international-fishing-tournament",
    name: "Texas International Fishing Tournament",
    city: "South Padre Island",
    countySlug: "cameron",
    countyName: "Cameron County",
    region: "gulf-coast",
    category: "sport",
    startDate: "2027-07-28",
    endDate: "2027-08-01",
    venue: "South Padre Island and Port Isabel tournament locations",
    officialUrl: "https://www.tift.org/",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "The Texas International Fishing Tournament brings saltwater anglers and families to South Padre Island and Port Isabel. Participants need rules, registration, a captains meeting and boating logistics; spectators should not assume registration events are public tournament fishing times.",
    quickFacts: [
      {
        label: "Official 2027 event window",
        value: "July 28–August 1, 2027"
      },
      {
        label: "Locations",
        value: "South Padre Island and Port Isabel"
      },
      {
        label: "Activities",
        value: "Junior and adult fishing divisions, registration and awards"
      },
      {
        label: "Participation",
        value: "Confirm 2027 rules, entry and boat requirements"
      }
    ],
    planningSections: [
      {
        title: "Understand the full tournament window",
        body: "The organizer publishes July 28 through August 1 for 2027, but the visible detailed registration and captains-meeting timetable still contains prior-edition material. Do not present older times as the 2027 official schedule."
      },
      {
        title: "Read rules before entering",
        body: "Tournament divisions, species, measuring, weigh-in, fishing boundaries, age categories and captain requirements can change. Registered anglers should review the specific 2027 official rules and weather directives rather than relying on summaries."
      },
      {
        title: "Families and spectators need different plans",
        body: "A junior angler's experience differs from offshore adult competition, and casual visitors may enjoy the awards or waterfront without participating. Confirm access to ceremonies and viewing areas with the organizers."
      },
      {
        title: "Prepare for Gulf Coast conditions",
        body: "Tropical weather, waves and fishing conditions can affect small craft and offshore schedules. Select lodging with realistic marina access and follow Coast Guard, port and tournament notices."
      }
    ],
    relatedLinks: [
      {
        href: "/county/cameron",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/sports-events",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/texas-sandfest",
        label: "Texas SandFest",
        description: "Compare a Port Aransas coastal festival, not the same event."
      }
    ],
    sources: [
      {
        label: "Texas International Fishing Tournament organizer and 2027 dates",
        url: "https://www.tift.org/"
      }
    ]
  },
  {
    slug: "texas-food-truck-showdown",
    name: "Texas Food Truck Showdown",
    city: "Waco",
    countySlug: "mclennan",
    countyName: "McLennan County",
    region: "prairies-lakes",
    category: "food",
    startDate: "2026-04-11",
    endDate: "2026-04-11",
    venue: "Heritage Square, Downtown Waco",
    officialUrl: "https://thetexasfoodtruckshowdown.com/",
    sourceCheckedAt: "2026-10-21",
    dateNote: "The organizer confirms only April 11, 2026; no verified 2027 date, so this is a past-edition evergreen guide.",
    whyItMatters: "Organized by the Greater Waco Chamber of Commerce, this competitive food-truck day pairs signature-dish voting with family activities and full-menu sales later in the evening. Its 2026 edition has ended, and the 2027 event date is not yet confirmed.",
    quickFacts: [
      {
        label: "Last confirmed date",
        value: "April 11, 2026 — completed"
      },
      {
        label: "Organizer",
        value: "Greater Waco Chamber of Commerce"
      },
      {
        label: "2026 location",
        value: "Heritage Square, Waco"
      },
      {
        label: "Next edition",
        value: "2027 date not announced"
      }
    ],
    planningSections: [
      {
        title: "Understand how the competition works",
        body: "During the 2026 competition window, participating trucks exchanged signature-dish tastings for special Tasty Tickets. After competition, vendors shifted to full-menu sales. Never assume those ticket types or vendor schedules automatically carry over to a later year."
      },
      {
        title: "Build a daytime or evening visit",
        body: "The organizer's 2026 program included judging, public votes, a pop-up market, music, a kids zone and a doggy derby. Those were edition-specific activities; the next schedule must confirm what returns."
      },
      {
        title: "Use an organizer-confirmed date",
        body: "Although the Waco Chamber calls the Showdown annual, it has not published a specific 2027 event date as of this check. Keep the permanent authority guide available, but show April 2026 as completed rather than rolling it forward."
      },
      {
        title: "Treat the downtown footprint as a walking festival",
        body: "Heritage Square is near Waco's restaurant core. Once a new edition is announced, follow the official location map for truck lines, traffic, accessible paths and parking; avoid reusing a 2026 vehicle entry plan."
      }
    ],
    relatedLinks: [
      {
        href: "/county/mclennan",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/food-festivals",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/brazos-nights-waco",
        label: "Brazos Nights",
        description: "Another downtown Waco gathering with a different format."
      }
    ],
    sources: [
      {
        label: "Greater Waco Chamber 2026 event details",
        url: "https://business.wacochamber.com/events/Details/2026-texas-food-truck-showdown-1646517"
      },
      {
        label: "Official Showdown organizer and competition schedule",
        url: "https://thetexasfoodtruckshowdown.com/schedule-of-events/"
      }
    ]
  },
  {
    slug: "san-jacinto-day-celebration",
    name: "San Jacinto Day Celebration and Battle Reenactment",
    city: "La Porte",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-04-18",
    endDate: "2026-04-18",
    venue: "San Jacinto Battleground State Historic Site",
    officialUrl: "https://www.sanjacinto-museum.org/Visit/Calendar/San_Jacinto_Day_Celebration/",
    sourceCheckedAt: "2026-10-21",
    dateNote: "The latest confirmed 2026 special event is over. Preserve the date as history; 2027 celebration is unannounced.",
    whyItMatters: "The San Jacinto Day Celebration uses living-history demonstrations and reenactments to interpret the April 1836 battle, an essential turning point in Texas independence. The verified public program took place April 18, 2026; the museum has not confirmed a 2027 reenactment.",
    quickFacts: [
      {
        label: "Last confirmed program",
        value: "April 18, 2026 — completed"
      },
      {
        label: "2026 public hours",
        value: "10 a.m.–4 p.m."
      },
      {
        label: "2026 reenactment times",
        value: "11 a.m. and 2 p.m."
      },
      {
        label: "Next edition",
        value: "Check the museum for a confirmed 2027 program"
      }
    ],
    planningSections: [
      {
        title: "Know the difference between history and reenactment",
        body: "April 21, 1836 is the historic battle date. The 2026 public celebration took place Saturday, April 18, with reenactments at 11 a.m. and 2 p.m. Do not advertise April 21 as an annual reenactment appointment."
      },
      {
        title: "Verify an announced edition before traveling",
        body: "The organizer and Texas Historical Commission announced a 190th-anniversary public program in 2026. A future special event could change its staging, weather policy, admission or living-history activities. Read the museum's actual future event announcement."
      },
      {
        title: "Expect noise and outdoor conditions",
        body: "Living-history interpreters, cannon fire and blank musket demonstrations can be loud and startling. For families with small children, plan hearing protection and a comfortable distance, and check accessible paths on the historic grounds."
      },
      {
        title: "Make it an educational regional trip",
        body: "Combine historical context with the San Jacinto Monument, battleground interpretation and La Porte-area sites. Check current monument, museum and grounds hours separately from any special-event schedule."
      }
    ],
    relatedLinks: [
      {
        href: "/county/harris",
        label: "Explore the host county",
        description: "Find nearby destinations and locally relevant places to stay."
      },
      {
        href: "/events/arts-culture",
        label: "More Texas events",
        description: "Compare other source-checked festivals and recurring gatherings."
      },
      {
        href: "/event/washington-on-the-brazos-texas-independence-day",
        label: "Texas Independence Day at Washington-on-the-Brazos",
        description: "Compare a different chapter of Texas independence history."
      },
      {
        href: "/events/texas-independence",
        label: "Texas Independence commemorations",
        description: "Compare March 2 heritage events and San Jacinto observances."
      }
    ],
    sources: [
      {
        label: "San Jacinto Museum official 2026 celebration and reenactment",
        url: "https://www.sanjacinto-museum.org/Visit/Calendar/San_Jacinto_Day_Celebration/"
      },
      {
        label: "Texas Historical Commission San Jacinto Battleground",
        url: "https://thc.texas.gov/historic-sites/san-jacinto-battleground"
      }
    ]
  },
  {
    slug: "cliburn-international-young-pianists-competition",
    name: "Cliburn International Competition for Young Pianists",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-06-10",
    endDate: "2027-06-19",
    venue: "Southern Methodist University and Morton H. Meyerson Symphony Center",
    officialUrl: "https://cliburn.org/competitions/2027-young-pianists",
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "The Cliburn's 2027 Dallas competition showcases outstanding young pianists ages 13–17 in a sequence of juried recitals and a final with the Dallas Symphony Orchestra. This is a distinct competition from the main Van Cliburn International Piano Competition, which is not an annual Fort Worth event.",
    quickFacts: [
      {
        label: "Confirmed competition",
        value: "June 10–19, 2027"
      },
      {
        label: "Age eligibility",
        value: "Competition for pianists 13–17"
      },
      {
        label: "Preliminary and semifinal",
        value: "SMU campus, Dallas"
      },
      {
        label: "Final round",
        value: "Meyerson Symphony Center with Dallas Symphony Orchestra"
      }
    ],
    planningSections: [
      {
        title: "Choose the competition round to attend",
        body: "Preliminary and semifinal recitals are scheduled on the SMU campus while the six finalists appear with the Dallas Symphony Orchestra at the Morton H. Meyerson Symphony Center. This is not one continuous concert at a single building; confirm the published round-by-round visitor program."
      },
      {
        title: "Do not confuse contestant applications with tickets",
        body: "The organizer's current page emphasizes pianist applications, due November 17, 2026, while visitor tickets are expected to go on sale in January 2027. An application deadline does not mean an audience seat is available for purchase yet."
      },
      {
        title: "Plan different transport for the SMU and Meyerson venues",
        body: "SMU's Caruth Auditorium and the downtown Arts District's Meyerson Symphony Center require separate route and parking decisions. Read each venue's accessible seating and ticket policies before buying a multi-round visit."
      },
      {
        title: "Follow the young musicians respectfully",
        body: "The competition includes fellowships and adjudicated performances for minors. Respect photography and recording rules, quiet during recitals and the organizer's child-protection policies; do not treat rehearsals or private workshops as public access."
      }
    ],
    relatedLinks: [
      {
        href: "/county/dallas",
        label: "Dallas County guide",
        description: "Find nearby arts venues and trip-planning stops."
      },
      {
        href: "/events/arts-culture",
        label: "Texas cultural events",
        description: "Compare other major film, arts and performance competitions."
      },
      {
        href: "/event/dallas-international-film-festival",
        label: "Dallas International Film Festival",
        description: "Explore a different Dallas arts festival with its own dates and ticket program."
      }
    ],
    sources: [
      {
        label: "The Cliburn 2027 competition overview, dates and venues",
        url: "https://cliburn.org/competitions/2027-young-pianists"
      },
      {
        label: "Cliburn official rules and schedule",
        url: "https://cliburn.org/competitions/2027-young-pianists/application-and-rules"
      }
    ]
  }
];

const bySlug = new Map(records.map((event) => [event.slug, event]));
export function getExpandedMajorEventAuthorityTranche20261021Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
