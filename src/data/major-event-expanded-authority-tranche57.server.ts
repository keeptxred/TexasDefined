import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Individually sourced 2026–27 holiday guides; never substitute for live admission checkout.
interface ChristmasAuthorityRecord extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: ChristmasAuthorityRecord[] = [
  {
    slug: "grapevine-christmas-capital-of-texas",
    name: "Grapevine Christmas Capital of Texas 2026",
    city: "Grapevine",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-23",
    endDate: "2027-01-01",
    venue: "Historic Main Street, Grapevine",
    officialUrl: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/",
    sourceCheckedAt: "2026-11-10",
    whyItMatters: "Grapevine organizes an entire holiday destination rather than a single light show: the 2026 season brings more than 1,400 listed happenings across roughly 40 days, with illuminated Historic Main Street, a parade, the North Pole Express, drone performances, markets, skating and theatrical events. A smart visit starts with choosing the specific experience before locking in a date.",
    quickFacts: [
      {
        label: "Official kickoff",
        value: "November 23, 2026: Carol of Lights"
      },
      {
        label: "Parade of Lights",
        value: "December 3, 2026"
      },
      {
        label: "Drone show",
        value: "December 7, 2026; organizer's current guide lists 600 drones"
      },
      {
        label: "North Pole Express",
        value: "November 27–December 30, except listed closure days"
      },
      {
        label: "Admission",
        value: "Public Main Street atmosphere is free; trains, performances and skating can require separate tickets"
      }
    ],
    planningSections: [
      {
        title: "Choose the experience first, then the night",
        body: "The Christmas Capital is not one ticket or one venue. Historic Main Street is a free-to-walk backdrop, whereas North Pole Express, Palace Theatre programs, Peace Plaza skating and lodging-based experiences use separate reservations. Check the event-by-event city calendar."
      },
      {
        title: "Know the November kickoff and December headline dates",
        body: "The city's October 15 media guide lists Carol of Lights on Monday November 23, Parade of Lights on December 3 and the 600-drone Merry & Bright show on December 7. Crowds and road closures concentrate around these evenings."
      },
      {
        title: "Book North Pole Express separately",
        body: "The city publishes train trips November 27–December 30; on December 3 the date-by-date schedule directs riders to Historic Stockyards Station in Fort Worth, not Grapevine. The city also publishes no departures on December 24–25. Ticket-hub and detailed schedule wording may not list identical session counts, so the official ticket checkout and boarding station on the purchased ticket govern. A free visit to Main Street does not include a train seat."
      },
      {
        title: "Use free parking and check announced Main Street closures",
        body: "The organizer lists free parking and a free shuttle from the Grapevine Convention Center (1201 Municipal Way), plus free parking at 307 and 410 W. Dallas Road and 636 S. Main Street. Its October 2026 planning reference lists Main Street traffic closures starting November 22, December 3, December 7, December 11 and December 18, with varying reopening times. Check the current city street-closure map before selecting parking, especially for the December 3 parade and December 7 drone show."
      },
      {
        title: "Build a DFW holiday weekend",
        body: "A family can combine decorated Main Street, historic businesses, a seasonal train or theatre program, and daytime attractions without having to drive into Dallas. Grapevine also sits near DFW Airport; confirm operating hours for each separate attraction and book hotels according to the night's chosen events."
      },
      {
        title: "Separate city events from hotel attractions",
        body: "Gaylord Texan's ICE! and Lone Star Christmas are separately operated hotel attractions, not admission included in the city's Christmas Capital events. A hotel holiday package and a city train ticket are different products."
      }
    ],
    relatedLinks: [
      {
        href: "/county/tarrant",
        label: "Explore Tarrant County",
        description: "Plan local stops, dining and an overnight stay in Tarrant County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      },
      {
        href: "/article/texas-christmas-train-rides",
        label: "Holiday train rides in Texas",
        description: "Compare train trips before selecting a departure."
      }
    ],
    sources: [
      {
        label: "Grapevine CVB 2026 Christmas reference",
        url: "https://www.grapevinetexasusa.com/articles/post/2026-writers-reference-guide-to-the-christmas-capital-of-texas/"
      },
      {
        label: "Grapevine CVB holiday hub",
        url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/"
      },
      {
        label: "Grapevine CVB 2026 North Pole Express date-by-date and special Fort Worth December 3 schedule",
        url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/dates-times/"
      }
    ],
    dateNote: "The published 40-day holiday season begins November 23. Dates above represent the wider festive season, not nightly operation of every paid event."
  },
  {
    slug: "austin-trail-of-lights",
    name: "Austin Trail of Lights 2026",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2026-12-10",
    endDate: "2026-12-23",
    venue: "Zilker Metropolitan Park",
    officialUrl: "https://austintrailoflights.org/event-faqs",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Austin's Trail of Lights fills Zilker Park with illuminated displays, family-friendly traditions and a citywide holiday atmosphere. The most important decision is not which decorations to see, but how the selected night changes admission and how visitors reach the car-restricted park.",
    quickFacts: [
      {
        label: "Confirmed dates",
        value: "December 10–23, 2026"
      },
      {
        label: "Public hours",
        value: "7–10 p.m.; ZIP, Platinum and qualifying accessibility early entry at 6 p.m."
      },
      {
        label: "Free general admission",
        value: "December 10, 11 and 13–17"
      },
      {
        label: "Paid general admission",
        value: "December 12 and 18–23; $8 plus applicable fees for ages 12+"
      },
      {
        label: "Location",
        value: "Zilker Park, 2100 Barton Springs Road, Austin"
      }
    ],
    planningSections: [
      {
        title: "Pick a free or paid evening before buying",
        body: "The operator's current 2026 FAQ confirms public admission December 10–23 from 7–10 p.m. General admission is free for all ages December 10, 11 and 13–17. On December 12 and 18–23, regular admission is $8 for guests ages 12 and up, plus applicable taxes and fees. ZIP and Platinum products can enter from 6 p.m.; free general admission never includes those upgrades. The broader City of Austin event permit range begins December 4 but does not mean the public Trail is open then."
      },
      {
        title: "Compare GA, shuttle, ZIP and Platinum",
        body: "The shuttle runs December 12 and 18–23 from the Toney Burger Activity Center, with free parking there. Each shuttle pass includes general admission, so do not buy another gate ticket. Buses leave the center 5:30–8:30 p.m.; the last return leaves Zilker at 10:45 p.m. ZIP and Platinum are separate 6 p.m. entry products. On free GA nights no advance GA ticket is required."
      },
      {
        title: "Reserve parking before the drive",
        body: "Buy a Zilker parking pass online before driving; onsite sales are unavailable. Parking opens at 5:30 p.m. and the organizer instructs drivers to follow their pass directions rather than GPS. Neighborhood parking is prohibited; the 2026 street-closure schedule was still pending on November 21. The designated rideshare point is 2107 Veterans Drive, with a footbridge approach toward Stratford Drive. For transit, check CapMetro routes 3, 30 and 803 and the return timetable."
      },
      {
        title: "Know the walk and weather implications",
        body: "Plan for roughly one mile of displays plus the distance from parking. The organizer provides an accessible entrance at Lou Neff and Barton Springs roads, accessible toilets and an accessibility center, but not loan wheelchairs or accessible event shuttles. Guests with disabilities and up to three companions can enter from 6 p.m.; required admission still applies on paid nights. Purchase accessible parking in advance and follow the placard instructions. Some trail surfaces may become muddy in rain; check weather and contact the organizer about accommodation needs."
      },
      {
        title: "Pets are restricted",
        body: "The official policy prohibits pets other than qualifying service animals. Families with pets should plan care rather than expecting to bring dogs through the trail."
      },
      {
        title: "Pair with Austin without overpacking the night",
        body: "Choose the afternoon around your actual entry and transport plan. A free-night visit avoids admission costs, but it is not one of the scheduled shuttle nights. A south Austin shuttle visit on a paid night can remove the need to reserve Zilker parking. The separate December 4 Night Lights Preview Party is not a regular GA night. The official FAQ also identifies paid wheel and carousel rides and a family privacy tent near Santa's House."
      }
    ],
    relatedLinks: [
      {
        href: "/county/travis",
        label: "Explore Travis County",
        description: "Plan local stops, dining and an overnight stay in Travis County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      },
      {
        href: "/holiday/enchant-christmas-arlington",
      label: "Enchant Arlington 2026 status",
      description: "Read why the historic DFW event has no verified local 2026 dates."
    },
    {
      href: "/event/ford-holiday-river-parade",
        label: "San Antonio Holiday River Parade",
        description: "Compare another signature Texas holiday night."
      }
    ],
    sources: [
      {
        label: "Austin Trail of Lights 2026 official FAQ",
        url: "https://austintrailoflights.org/event-faqs/-2026-dates-time-gate-ticket-information-and-location"
      },
      {
        label: "City of Austin event permit information (permit period differs from public admissions)",
        url: "https://www.austintexas.gov/ace/events/trail-lights"
      }
    ]
  },
  {
    slug: "santas-wonderland-college-station",
    name: "Santa's Wonderland Christmas Experience 2026–27",
    city: "College Station",
    countySlug: "brazos",
    countyName: "Brazos County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-13",
    endDate: "2027-01-03",
    venue: "18898 State Highway 6, College Station",
    dateNote: "Santa’s Wonderland confirms its 2026–27 season November 13, 2026–January 3, 2027 at 18898 Highway 6 in College Station. The official calendar marks November 16–19 and November 30–December 1 closed. Remaining dates have varying opening hours; check the admission calendar before traveling.",
    officialUrl: "https://www.santas-wonderland.com/",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Santa's Wonderland is a destination-scale outdoor Christmas park rather than a roadside light display. Tickets, arrival traffic, activities and potential upgrades shape the experience; a family can devote an entire evening here and extend the trip into a Bryan–College Station weekend.",
    quickFacts: [
      {
        label: "2026–27 season",
        value: "November 13, 2026–January 3, 2027"
      },
      {
        label: "Location",
        value: "18898 Highway 6, College Station"
      },
      {
        label: "Tickets",
        value: "Date-dependent admission and upgrade options"
      },
      {
        label: "Crowds",
        value: "Operator publishes an attendance forecast; weekend peaks vary"
      }
    ],
    planningSections: [
      {
        title: "Check which nights actually operate",
        body: "The operating windows are November 13–15, November 20–29 and December 2–January 3. Thanksgiving opens at 6 p.m.; Christmas Eve and Christmas Day open at 4 p.m. Weekend opening times can be earlier. Choose an operating date before buying parking."
      },
      {
        title: "Understand admission versus add-ons",
        body: "General admission includes the hayride, snow playground, tubing and visiting Santa; ice skating and horse-drawn carriage rides are separate paid options. Compare included activities with the add-ons your family actually wants before choosing a ticket."
      },
      {
        title: "Check the attendance forecast",
        body: "Use the operator's date-specific forecast as a planning aid, not a guarantee. Free parking options vary by date; Dasher parking across Highway 6 uses a shuttle, while the closest Rudolph lot requires advance online purchase. Blitzen is free on designated late-season dates. Confirm the lot and arrival rules before driving."
      },
      {
        title: "Plan for outdoor terrain and changing weather",
        body: "Wear layers and walking shoes for an outdoor evening. Outside food and drinks are restricted, with exceptions for infant needs and food allergies; only service animals are permitted. Obtain a hand stamp before leaving if you intend to return. Weather can affect operations; check accessibility and weather notices for your chosen visit."
      },
      {
        title: "Build the College Station itinerary realistically",
        body: "An evening at Santa's Wonderland can consume most of the night. Put Texas A&M-area landmarks, Bryan restaurants or museums earlier in the day and consider nearby lodging if driving from Houston or Austin with small children."
      },
      {
        title: "Avoid outdated historical price claims",
        body: "On November 21, the operator listed gate tickets at $59.95 for adults and $54.95 for children ages 3–12. Its online any-day prices were $51.20 and $41 including ticket fees, before sales tax. A separate Super Saver offer ($40 adult, $35 child) was advertised through November 22 for eligible dates only; do not assume it is still available."
      }
    ],
    relatedLinks: [
      {
        href: "/county/brazos",
        label: "Explore Brazos County",
        description: "Plan local stops, dining and an overnight stay in Brazos County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      }
    ],
    sources: [
      {
        label: "Santa's Wonderland official ticket calendar",
        url: "https://www.santas-wonderland.com/pricing"
      },
      {
        label: "Visit College Station confirmed 2026 season",
        url: "https://visit.cstx.gov/events/santas-wonderland1-2/"
      },
      {
        label: "Santa's Wonderland attendance forecast",
        url: "https://www.santas-wonderland.com/attendance-forecast"
      },
      { label: "Official parking and arrival guidance", url: "https://www.santas-wonderland.com/parking" },
      { label: "Official visitor FAQ", url: "https://www.santas-wonderland.com/faqs" }
    ],
    occurrenceWindows: [
      { label: "Opening weekend", startDate: "2026-11-13", endDate: "2026-11-15" },
      { label: "November operating dates", startDate: "2026-11-20", endDate: "2026-11-29" },
      { label: "December through closing", startDate: "2026-12-02", endDate: "2027-01-03" },
    ],
  },
  {
    slug: "houston-zoo-lights",
    name: "Houston Zoo Lights 2026–27",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "seasonal",
    startDate: "2026-11-19",
    endDate: "2027-01-03",
    dateNote: "Houston Zoo Lights operates select nights November 19, 2026–January 3, 2027, 5:30–10:30 p.m. (last entry 9:30). Zoo Lights is closed December 9 and 24, OPEN Christmas night December 25 while daytime zoo admission is closed, and closes early at 9:30 p.m. on New Year’s Eve December 31.",
    venue: "Houston Zoo, Hermann Park",
    officialUrl: "https://www.houstonzoo.org/events/zoolights/",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Houston Zoo's seasonal light walk makes an accessible-in-city evening outing centered on illuminated animal scenes, themed displays and conservation storytelling. It is a separate nighttime ticket, not simply a continuation of ordinary daytime admission.",
    quickFacts: [
      {
        label: "Season",
        value: "November 19, 2026–January 3, 2027 (select nights)"
      },
      {
        label: "Zoo Lights hours",
        value: "5:30–10:30 p.m.; last entry 9:30 p.m."
      },
      {
        label: "Notable closures",
        value: "December 9 and December 24"
      },
      {
        label: "Sensory Inclusive Night",
        value: "November 30, 2026"
      },
      {
        label: "Christmas Day",
        value: "Zoo Lights open December 25; daytime zoo closed"
      },
      {
        label: "Address",
        value: "6200 Hermann Park Drive, Houston, TX 77030"
      }
    ],
    planningSections: [
      {
        title: "Buy the night ticket, not the daytime zoo pass",
        body: "Purchase a separate evening ticket for guests age three and older; children two and younger enter free. Tickets are tied to the selected date and are nonrefundable and nontransferable. Select the arrival time before booking dinner or other Museum District activities; Zoo Lights is not regular daytime animal viewing."
      },
      {
        title: "Know the 2026 hours and exceptions",
        body: "Zoo Lights runs on selected nights from November 19 through January 3, generally 5:30–10:30 p.m. with last entry at 9:30 p.m. December 9 and Christmas Eve are closed. On Thanksgiving and Christmas Day, the daytime zoo is closed but Zoo Lights opens at 5:30 p.m. New Year’s Eve December 31 has an earlier 9:30 p.m. closing, so check the date-specific event calendar."
      },
      {
        title: "Choose your sensory experience",
        body: "November 30 is a designated Sensory Inclusive Night with reduced volume and fewer flashing effects. Quiet spaces are available during the evening; visitors who prefer lower stimulation can plan around the designated November 30 program."
      },
      {
        title: "Expect thematic changes, not a carbon copy of last year",
        body: "New 2026 installations include Gateway to Wonder animal lanterns, Celestial Flight in the century-old oaks, Candy Cane Lane, Campfire Canyon and the Frosted Forest. Verify which special performances or food offerings run on your date."
      },
      {
        title: "Parking and timing around Hermann Park",
        body: "The main Zoo Lights entrance is at 6200 Hermann Park Drive; the Medical Center zoo entrance is closed. The zoo does not have dedicated parking; free public Hermann Park lots are shared with other destinations and may fill. Allow time to park and walk, and check evening transit options. Stroller and mobility-device rentals are card-only."
      },
      {
        title: "Pair with Houston without rushing",
        body: "Use a museum or garden in daylight, have dinner, then take the separate evening walk. The zoo lists designated appreciation nights December 14 for seniors age 65+, December 15 for first responders and service members, December 16 for college students and December 17 for educators. Check eligibility, identification and admission terms before choosing a date."
      }
    ],
    relatedLinks: [
  {
    href: "/holiday/magical-winter-lights",
    label: "Magical Winter Lights status",
    description: "Review what has and has not been confirmed for Rosenberg in the 2026-27 season."
  },
      {
        href: "/county/harris",
        label: "Explore Harris County",
        description: "Plan local stops, dining and an overnight stay in Harris County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      }
    ],
    sources: [
      {
        label: "Houston Zoo 2026 Zoo Lights page",
        url: "https://www.houstonzoo.org/events/zoolights/"
      },
      {
        label: "Houston Zoo October 14 release",
        url: "https://www.houstonzoo.org/about/newsroom/txu-energy-presents-zoo-lights-tickets-now-available/"
      },
      { label: "Houston Zoo operating hours and holiday exceptions", url: "https://www.houstonzoo.org/plan-your-visit/hours/" }
    ],
    // The operator separately calls out Dec 9 and Dec 24 closures; do
    // not count those days as operating nights in the shared calendar.
    occurrenceWindows: [
      { label: "Before Dec 9 closure", startDate: "2026-11-19", endDate: "2026-12-08" },
      { label: "After Dec 9 closure", startDate: "2026-12-10", endDate: "2026-12-23" },
      { label: "Christmas Day through Jan 3", startDate: "2026-12-25", endDate: "2027-01-03" },
    ]
  },
  {
    slug: "moody-gardens-ice-land",
    name: "Moody Gardens ICE LAND: Caribbean Christmas 2026–27",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "seasonal",
    startDate: "2026-11-21",
    endDate: "2027-01-02",
    venue: "Moody Gardens",
    officialUrl: "https://www.moodygardens.com/holiday-season/ice-land",
    sourceCheckedAt: "2026-11-07",
    whyItMatters: "ICE LAND is Galveston's signature indoor ice-sculpture centerpiece within the larger Holiday in the Gardens festival. The 2026 Caribbean Christmas theme uses more than two million pounds of ice in a nine-degree environment, and visitors often combine it with the outdoor Holiday Lights Trail and a Gulf Coast hotel weekend.",
    quickFacts: [
      {
        label: "Season",
        value: "November 21, 2026–January 2, 2027"
      },
      {
        label: "2026 theme",
        value: "Caribbean Christmas"
      },
      {
        label: "Ice sculpture environment",
        value: "About 9°F; bring warm layers"
      },
      {
        label: "Published ICE LAND admission",
        value: "$35 adult; $29 child ages 4–12 and seniors 65+"
      },
      {
        label: "Parking",
        value: "Moody Gardens advertises free holiday-festival parking"
      }
    ],
    planningSections: [
      {
        title: "Treat ICE LAND and Holiday Lights as distinct experiences",
        body: "An ICE LAND timed ticket does not automatically mean admission to every holiday attraction on campus. The Holiday Pass is a different product that bundles a wider set of activities. Compare price and the time you can realistically use."
      },
      {
        title: "Prepare for nine-degree temperatures",
        body: "Moody Gardens confirms ICE LAND is kept at 9°F and PROVIDES parkas. Bring warm socks, gloves, a hat and suitable shoes for comfort, especially with small children. The self-paced icy exhibit has stroller and wheelchair accessible paths; follow the current operator slide rules."
      },
      {
        title: "See the specific 2026 theme",
        body: "The Caribbean Christmas installation includes underwater-themed ice art with rays, turtles, tropical fish and sharks, plus the Giant Ice Slide and Shiver's Ice Bar. The theme changes by season; older generic Ice Land photos should not be labeled as 2026 Caribbean art."
      },
      {
        title: "Plan the lights and skating separately",
        body: "The outdoor Holiday Lights Trail is roughly a mile with more than two million lights. Skating, slide rides, 3D/4D films and shows have different ticket and scheduling rules. A rushed single-hour itinerary cannot cover all experiences."
      },
      {
        title: "Make the Galveston overnight worthwhile",
        body: "Moody Gardens promotes hotel holiday packages, which are separate from standalone attraction tickets. A family can add the Aquarium Pyramid, historic downtown Galveston or Seawall sightseeing in daylight and stay for evening attractions."
      },
      {
        title: "Check date-specific ticket availability",
        body: "The official 2026 ICE LAND page lists adult admission at $35 and ages 4–12 or seniors 65+ at $29. The separate Holiday Pass includes ICE LAND, Holiday Lights, films and other attractions after 4 p.m., but skate rentals are extra. ICE LAND opens November 21 through January 2; check dated tickets, hours and availability before buying."
      }
    ],
    relatedLinks: [
      {
        href: "/county/galveston",
        label: "Explore Galveston County",
        description: "Plan local stops, dining and an overnight stay in Galveston County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      },
      {
        href: "/destination/moody-gardens",
        label: "Moody Gardens visitor guide",
        description: "Plan the broader attraction complex and year-round experiences."
      }
    ],
    sources: [
      {
        label: "Moody Gardens official ICE LAND 2026 page",
        url: "https://www.moodygardens.com/holiday-season/ice-land"
      },
      {
        label: "Moody Gardens 2026 holiday festival",
        url: "https://www.moodygardens.com/holiday-season"
      },
      {
        label: "Moody Gardens October 2026 hotel getaway details",
        url: "https://www.moodygardens.com/press-releases/make-it-a-holiday-getaway"
      }
    ]
  },
  {
    slug: "holiday-at-the-dallas-arboretum",
    name: "Holiday at the Arboretum 2026–27",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-11",
    endDate: "2027-01-03",
    dateNote: "Official Holiday at the Arboretum runs November 11, 2026–January 3, 2027. Daytime admission is 9 a.m.–5 p.m.; separately ticketed Holiday at Night is 5–10 p.m. On Thanksgiving, Christmas Day and New Year’s Day the gardens close for DAYTIME admission but offer special holiday night access. November 20 has a private evening event, so check the date-specific booking calendar.",
    venue: "Dallas Arboretum and Botanical Garden",
    officialUrl: "https://www.dallasarboretum.org/events-activities/holiday-at-the-arboretum/",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Holiday at the Arboretum layers holiday-lit garden landscapes, the European-inspired Christmas Village and decorated DeGolyer House around its distinctive 12 Days of Christmas gazebo exhibition. The 2026–27 season is especially significant: the garden says it is the FINAL season for the 12 Days gazebos, making the date choice timely.",
    quickFacts: [
      {
        label: "Season",
        value: "November 11, 2026–January 3, 2027"
      },
      {
        label: "Special significance",
        value: "Final year of the 12 Days of Christmas gazebos"
      },
      {
        label: "Daytime hours",
        value: "9 a.m.–5 p.m."
      },
      {
        label: "Holiday at Night",
        value: "5–10 p.m.; dates and availability vary"
      },
      {
        label: "Location",
        value: "8525 Garland Road, Dallas"
      }
    ],
    planningSections: [
      {
        title: "This is the final 12 Days gazebo season",
        body: "The Dallas Arboretum says 2026 is the last holiday season for the glass-sided 12 Days of Christmas gazebos after twelve years. Do not treat the attraction as a permanent fixture guaranteed to continue into 2027–28."
      },
      {
        title: "Select daytime or nighttime access",
        body: "The holiday admission and regular-hours pages now list daytime admission from 9 a.m. to 5 p.m., with separately ticketed Holiday at Night from 5 to 10 p.m. A daytime ticket is not an evening ticket. Daytime access is unavailable Thanksgiving, Christmas Day and New Year’s Day even though the venue offers special evening Holiday Cheer admissions on those dates. The organizer also reserves November 20 for a private nighttime event. Choose the precise dated official ticket, not only the headline season."
      },
      {
        title: "Understand date-variable tickets",
        body: "On November 21, the garden listed adult daytime admission at $21.95–$25.95, child ages 3–12 at $17.95–$21.95, and evening general admission at $35–$40 online for ages three and up; under-three admission is free. Evening gate prices are $4 higher. Night Owl entry is $15 from 8:30 to 10 p.m. The $12 online Holiday Cheer evenings are November 26, December 24, 25 and 31, and January 1. Compare admission and available times in official checkout."
      },
      {
        title: "Do not miss the Christmas Village and DeGolyer House",
        body: "The Christmas Village and decorated DeGolyer House complement the gazebos. Santa visits run on selected days November 14–December 24 during noon–3 p.m. and 6–9 p.m. sessions; check the separate Santa and house schedules before choosing a ticket."
      },
      {
        title: "Plan parking and accessibility",
        body: "The 66-acre grounds allow wheelchairs and strollers; complimentary wheelchairs are first-come, first-served. Parking is listed at $15 per vehicle (member and eligible Museums for All exceptions); advance online purchase supports license-plate entry. Main parking is at 8525 Garland Road and the garage at 8720 Garland Road. Check which entrances operate for evening events."
      },
      {
        title: "Combine with a Dallas holiday itinerary",
        body: "White Rock Lake-adjacent lodging and downtown Dallas are different travel bases. Allow traffic time between the Arboretum, museums, festive dining and any second evening attraction."
      }
    ],
    relatedLinks: [
      {
        href: "/county/dallas",
        label: "Explore Dallas County",
        description: "Plan local stops, dining and an overnight stay in Dallas County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      }
    ],
    sources: [
      {
        label: "Dallas Arboretum 2026 holiday event and prices",
        url: "https://www.dallasarboretum.org/events-activities/holiday-at-the-arboretum/"
      },
      {
        label: "Dallas Arboretum main events calendar",
        url: "https://www.dallasarboretum.org/events-activities/"
      },
      { label: "Official admission hours and parking rates", url: "https://www.dallasarboretum.org/visitor-information/hours-and-admission/" },
      { label: "Visitor accessibility and parking FAQ", url: "https://www.dallasarboretum.org/visitor-information/planning-your-visit/visitor-faqs/" }
    ]
  },
  {
    slug: "galaxy-lights-space-center-houston",
    name: "Galaxy Lights at Space Center Houston 2026–27",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "seasonal",
    startDate: "2026-11-14",
    endDate: "2027-01-03",
    dateNote: "Official 2026–27 Galaxy Lights runs on select dates November 14, 2026–January 3, 2027, with a published 6–10 p.m. event window. The site posts weather-related operating status each event day by 4 p.m.; the season-long range does not imply every night is operating.",
    venue: "Space Center Houston",
    officialUrl: "https://spacecenter.org/galaxy-lights/",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Galaxy Lights transforms the Space Center Houston visitor campus into a space-themed nighttime holiday experience, with glowing cosmic installations and interactive areas that distinguish it from a conventional Christmas trail. It is a good anchor for a Clear Lake or NASA-area overnight trip.",
    quickFacts: [
      {
        label: "Published season",
        value: "Select dates November 14–January 3"
      },
      {
        label: "Location",
        value: "Space Center Houston, Clear Lake"
      },
      {
        label: "2026 addition",
        value: "New galactic snow slide"
      },
      {
        label: "Conditions",
        value: "Many displays outdoors; check daily event status"
      }
    ],
    planningSections: [
      {
        title: "Reserve an exact operating date",
        body: "Space Center Houston announces Galaxy Lights from November 14, 2026 through January 3, 2027 on SELECT dates with official 6–10 p.m. event hours. Allow approximately 90 minutes for the experience. Last admission is at 9 p.m.; use the individual date's ticket calendar rather than assuming every night in the season is open."
      },
      {
        title: "Understand Galaxy Lights versus daytime admission",
        body: "Galaxy Lights admission includes access to Space Center Houston exhibitions, but NASA Tram Tours and Starship Gallery are closed during the evening event. On November 21, the operator listed admission for ages four and older at $19.95–$27.95 depending on date, with children three and younger free. Groups of at least 20 can ask about discounted admission."
      },
      {
        title: "Look for space-specific seasonal highlights",
        body: "The 2026 edition promotes illuminated science-fiction and space scenes and a new galactic snow slide. Additional interactive effects vary; the park is not the same experience as a zoo light walk or traditional drive-through display."
      },
      {
        title: "Plan for outdoor weather and status changes",
        body: "The operator says most light displays are outdoors and publishes the evening's weather-related status by 4 p.m. Wear appropriate footwear and layers and check the current status rather than assuming rain always closes the event. The FAQ says tickets for evenings canceled by severe weather can be redeemed on another operating night through January 3, 2027. Select sensory-friendly nights offer reduced sensory effects and discounted admission."
      },
      {
        title: "Make the NASA-area weekend cohesive",
        body: "Use daytime NASA-site attractions, the Clear Lake waterfront or Kemah on a separate portion of the day, then return for the light show. Stay in the Clear Lake/Webster area if the following morning involves another attraction."
      },
      {
        title: "Choose a date and buy directly",
        body: "Use the Space Center Houston ticket link to confirm the date and current admission price. The organizer also lists musical performances on selected evenings, including the Space Center Intermediate Band on December 8."
      }
    ],
    relatedLinks: [
      {
        href: "/county/harris",
        label: "Explore Harris County",
        description: "Plan local stops, dining and an overnight stay in Harris County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      },
      {
        href: "/destination/space-center-houston",
        label: "Space Center Houston visitor guide",
        description: "Plan the year-round space museum around the holiday light show."
      }
    ],
    sources: [
      {
        label: "Space Center Houston Galaxy Lights official guide",
        url: "https://spacecenter.org/galaxy-lights/"
      }
    ]
  },
  {
    slug: "concho-christmas-tour-of-lights",
    name: "Concho Christmas Celebration Tour of Lights 2026",
    city: "San Angelo",
    countySlug: "tom-green",
    countyName: "Tom Green County",
    region: "panhandle",
    category: "seasonal",
    startDate: "2026-12-05",
    endDate: "2026-12-31",
    dateNote: "Concho Christmas Celebration confirms the San Angelo drive-through Tour of Lights December 5–31, 2026, daily 6–10 p.m. Sunday–Thursday and 6 p.m.–midnight Friday–Saturday. The 2.5-mile route enters at Bryant Boulevard and First Street (598 W. First Street). There is no mandatory entry ticket, and any voluntary donation must not be presented as a required fee.",
    venue: "Concho River / 598 W. First Street",
    officialUrl: "https://www.conchochristmascelebration.com/tour-of-lights",
    sourceCheckedAt: "2026-11-21",
    whyItMatters: "Concho Christmas is a long-running San Angelo community tradition built around a 2.5-mile drive of roughly three million lights along the Concho River. Unlike timed walk-through ticket destinations, the Tour of Lights is vehicle-based with no required admission charge and a suggested donation.",
    quickFacts: [
      {
        label: "Tour of Lights",
        value: "December 5–31, 2026"
      },
      {
        label: "Sunday–Thursday",
        value: "6–10 p.m."
      },
      {
        label: "Friday–Saturday",
        value: "6 p.m.–midnight"
      },
      {
        label: "Route",
        value: "2.5-mile drive along the Concho River"
      },
      {
        label: "Admission",
        value: "No admission fee; suggested $8 donation per vehicle"
      },
      {
        label: "Entrance",
        value: "598 W. First Street, San Angelo"
      }
    ],
    planningSections: [
      {
        title: "Understand the drive-through format",
        body: "The Tour of Lights is a 2.5-mile vehicle route rather than a ticketed walking maze. Allow time for a slow drive and possible queues. Enter at Bryant Boulevard and First Street, just north of the main post office."
      },
      {
        title: "Choose a day by crowd tolerance",
        body: "The published 2026 schedule runs December 5–31, 6–10 p.m. Sunday through Thursday and until midnight on Fridays and Saturdays. A weeknight may be calmer, although weather and school vacation schedules affect demand."
      },
      {
        title: "Know what free means",
        body: "The organization states there is no admission fee and requests a suggested $8 donation per vehicle. Do not describe the donation as a mandatory $8 ticket or sell third-party admission."
      },
      {
        title: "Do the opening-night festivities separately",
        body: "The December 5 tree lighting begins at 5:15 p.m. at Concho Avenue and Chadbourne Street; the downtown parade follows at 6 p.m. Arrive on foot for these downtown events, then plan the vehicle light-tour route separately."
      },
      {
        title: "Add downtown San Angelo",
        body: "Explore Concho Avenue and the riverfront before sunset. On the tour, look for community-sponsored oversized Christmas cards, animated Twelve Days of Christmas and the illuminated poinsettia hillside by the Convention and Visitors Bureau. An overnight stay makes it easier to combine the light tour with downtown San Angelo."
      },
      {
        title: "Respect local traffic controls",
        body: "Navigate to 598 W. First Street, then use posted tour directions rather than GPS once inside. The organizer warns of limited overhead clearance on the regular route; buses, RVs and other tall vehicles should use its separately mapped alternate route."
      }
    ],
    relatedLinks: [
      {
        href: "/county/tom-green",
        label: "Explore Tom Green County",
        description: "Plan local stops, dining and an overnight stay in Tom Green County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      }
    ],
    sources: [
      {
        label: "Concho Christmas official Tour of Lights 2026",
        url: "https://www.conchochristmascelebration.com/tour-of-lights"
      },
      {
        label: "Concho Christmas 2026 schedule and history",
        url: "https://www.conchochristmascelebration.com/"
      },
      { label: "Official driving and tall-vehicle routes", url: "https://www.conchochristmascelebration.com/concho-christmas-celebration-driving-route" },
      { label: "Community tree lighting", url: "https://www.conchochristmascelebration.com/tree-lighting-ceremony" },
      { label: "Downtown parade", url: "https://www.conchochristmascelebration.com/parade" }
    ]
  },
  {
    slug: "main-street-bethlehem-burnet",
    name: "Main Street Bethlehem Christmas Nativity — Burnet 2026",
    city: "Burnet",
    countySlug: "burnet",
    countyName: "Burnet County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2026-12-04",
    endDate: "2026-12-13",
    venue: "Main Street Bethlehem, Burnet",
    officialUrl: "https://www.fbcburnet.org/main-street-bethlehem",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "Main Street Bethlehem is Burnet's outdoor living-history-style interpretation of biblical Bethlehem, presented by First Baptist Church Burnet. Its two December weekends are a community and faith-based visitor tradition rather than a commercial holiday light park.",
    quickFacts: [
      {
        label: "Confirmed 2026 dates",
        value: "December 4–6 and December 11–13"
      },
      {
        label: "Time",
        value: "5:30–8:30 p.m. each listed night"
      },
      {
        label: "Admission",
        value: "Organizer describes a free public experience; check current entry instructions"
      },
      {
        label: "Location",
        value: "Downtown Burnet near 300 East Washington Street"
      }
    ],
    planningSections: [
      {
        title: "Do not visit on a weekday between the two weekends",
        body: "The 2026 organizer lists Friday–Sunday December 4–6 and Friday–Sunday December 11–13, 5:30–8:30 p.m. This is not a continuous December 4–13 nightly attraction."
      },
      {
        title: "Expect an immersive biblical recreation",
        body: "The event recreates the atmosphere of first-century Bethlehem with live scenes and costumed participants. Its emphasis is the Christian nativity story rather than a secular commercial light show; describe that clearly so travelers know what to expect."
      },
      {
        title: "Plan for a queue and outdoor walking",
        body: "Arrive comfortably before the last-entry window and dress for Central Texas December weather. The venue involves movement through recreated streets and exhibits; verify stroller, wheelchair and accessibility support with the church before visiting."
      },
      {
        title: "Be precise about parking and highways",
        body: "First Baptist's current visitor guidance says much parking is south of Highway 29; pedestrians must use marked crosswalks when crossing Highways 29 or 281. Do not encourage shortcuts across high-speed roads."
      },
      {
        title: "Admission is free; observe the church's current entry policy",
        body: "First Baptist Church Burnet explicitly says the December 2026 Main Street Bethlehem experience is free for everyone. The site prohibits large backpacks and requires clear bags and inspection of bags or purses at entry; pets are prohibited except for service animals. Donations support the presentation and local and global missions. Do not attach an affiliate checkout or promise reserved admission."
      },
      {
        title: "Make it a Burnet-area family trip",
        body: "Combine an afternoon on Burnet's square or in the Highland Lakes with an evening Bethlehem visit. Marble Falls and nearby Hill Country lodging are options, but holiday lighting, restaurants and individual attractions have their own schedules."
      }
    ],
    relatedLinks: [
      {
        href: "/county/burnet",
        label: "Explore Burnet County",
        description: "Plan local stops, dining and an overnight stay in Burnet County."
      },
      {
        href: "/events/christmas-events",
        label: "Texas Christmas events calendar",
        description: "Compare other seasonal events, dates and destinations."
      },
      {
        href: "/county/burnet",
        label: "Burnet County guide",
        description: "Plan the wider Highland Lakes visit."
      }
    ],
    sources: [
      {
        label: "First Baptist Church Burnet official 2026 schedule",
        url: "https://www.fbcburnet.org/main-street-bethlehem"
      },
      {
        label: "Main Street Bethlehem historical visitor context",
        url: "https://www.dailytrib.com/2021/11/10/online-reservation-required-for-main-street-bethlehem-burnet-event-still-free/"
      }
    ],
    dateNote: "The 2026 event operates December 4–6 and 11–13 only; not every night of the enclosing date range.",
    occurrenceWindows: [
      {
        label: "First weekend",
        startDate: "2026-12-04",
        endDate: "2026-12-06"
      },
      {
        label: "Second weekend",
        startDate: "2026-12-11",
        endDate: "2026-12-13"
      }
    ]
  }
];

const bySlug = new Map(records.map(event => [event.slug, event]));
export function getExpandedMajorEventAuthorityTranche57Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
