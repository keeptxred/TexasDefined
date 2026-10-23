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
    sourceCheckedAt: "2026-10-21",
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
        body: "The seasonal train runs November 27 through December 30, but December 3 departures are special excursions from Historic Stockyards Station in Fort Worth rather than Grapevine. No trains operate December 24 or 25. Select the correct station and dated departure before arranging travel; arriving downtown does not confer a train seat."
      },
      {
        title: "Use free parking and avoid closure traps",
        body: "The city lists free downtown parking at Grapevine Convention Center with a shuttle and at several Dallas Road/Main Street locations. Some historic Main Street blocks close to cars on designated dates, so follow current city guidance rather than relying on an ordinary weekday navigation route."
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
        url: "https://www.grapevinetexasusa.com/articles/post/2026-writers-reference-guide-to-the-christmas-capital-of-texas//"
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
    sourceCheckedAt: "2026-10-21",
    whyItMatters: "Austin's Trail of Lights fills Zilker Park with illuminated displays, family-friendly traditions and a citywide holiday atmosphere. The most important decision is not which decorations to see, but how the selected night changes admission and how visitors reach the car-restricted park.",
    quickFacts: [
      {
        label: "Confirmed dates",
        value: "December 10–23, 2026"
      },
      {
        label: "Public hours",
        value: "7–10 p.m.; ZIP and Platinum early entry at 6 p.m."
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
        body: "The official 2026 FAQ makes general admission free for all ages on December 10, 11 and 13–17. On December 12 and 18–23, regular general admission costs $8 for guests ages 12 and older, plus taxes and fees. Free general admission does not automatically include upgrades."
      },
      {
        title: "Compare GA, shuttle, ZIP and Platinum",
        body: "The official shuttle ticket includes general admission on participating nights. ZIP provides 6 p.m. entry and lounge benefits, while Platinum has separate premium access and amenities. Select one eligible product rather than buying a redundant general-admission ticket."
      },
      {
        title: "Reserve parking before the drive",
        body: "Organizers say Zilker Park advance parking is online only and no parking is sold on site. Expect holiday traffic, pedestrian controls and walking distances; the shuttle may be the easier choice for families on peak nights."
      },
      {
        title: "Know the walk and weather implications",
        body: "The lights cover a large outdoor trail. Wear comfortable footwear and layers, allow time for the entry queue and confirm mobility-access details before choosing upgraded tickets. The event proceeds in ordinary rain but can close for extreme weather or city-park closures."
      },
      {
        title: "Pets are restricted",
        body: "The official policy prohibits pets other than qualifying service animals. Families with pets should plan care rather than expecting to bring dogs through the trail."
      },
      {
        title: "Pair with Austin without overpacking the night",
        body: "Use daylight for Barton Springs/Zilker-area sights or downtown Austin, then plan the lights as the fixed evening event. Downtown hotel choice should reflect shuttle access and holiday traffic rather than distance alone."
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
        url: "https://austintrailoflights.org/event-faqs"
      },
      {
        label: "City of Austin event and access information",
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
    officialUrl: "https://www.santas-wonderland.com/",
    sourceCheckedAt: "2026-10-21",
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
        body: "The published season spans November 13, 2026 to January 3, 2027; use the operator's ticket calendar for available entry dates and times. A date range does not guarantee identical programs, activity hours or admission every evening."
      },
      {
        title: "Understand admission versus add-ons",
        body: "The park offers regular entry and other ticket products including seasonal and carriage options. Some experiences or conveniences may not be covered by basic admission. Compare the checkout inclusions and parking rules for the exact product before paying."
      },
      {
        title: "Check the attendance forecast",
        body: "Santa's Wonderland maintains a forecast based on earlier seasons. Treat it as a planning aid, not a guarantee; school breaks, weekends and good weather can still create lines. Earlier arrival and pre-purchased tickets can make the evening easier."
      },
      {
        title: "Plan for outdoor terrain and changing weather",
        body: "The destination involves moving through outdoor areas after dark. Wear layers and walking shoes, check whether strollers or wheelchairs can use all desired activities, and avoid promising that any particular snow attraction is available on every visit."
      },
      {
        title: "Build the College Station itinerary realistically",
        body: "An evening at Santa's Wonderland can consume most of the night. Put Texas A&M-area landmarks, Bryan restaurants or museums earlier in the day and consider nearby lodging if driving from Houston or Austin with small children."
      },
      {
        title: "Avoid outdated historical price claims",
        body: "Advance discounted and date-restricted products are sold as seasonal promotions. The operator's displayed $35 Super Saver checkout includes its ticket fee but excludes sales tax; do not treat it as the universal 2026 gate price."
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
      }
    ],
    dateNote: "Season spans November 13–January 3; exact operational nights and prices depend on the current official ticket calendar."
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
    venue: "Houston Zoo, Hermann Park",
    officialUrl: "https://www.houstonzoo.org/events/zoolights/",
    sourceCheckedAt: "2026-10-21",
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
        body: "Zoo Lights is a separate nighttime experience with timed admission. Daytime zoo reservations and animal viewing expectations differ; visitors should not assume nighttime light admission includes the regular daytime animal experience."
      },
      {
        title: "Know the 2026 hours and exceptions",
        body: "The published season is November 19 through January 3, on select dates. Gates run 5:30–10:30 p.m. with last entry 9:30 p.m.; the zoo lists December 9 and Christmas Eve as closures. Christmas night, however, has Zoo Lights admission in 2026."
      },
      {
        title: "Choose your sensory experience",
        body: "November 30 is a designated Sensory Inclusive Night with reduced volume and fewer flashing effects. Visitors who prefer quieter programming should confirm current arrangements and the venue's available quiet spaces."
      },
      {
        title: "Expect thematic changes, not a carbon copy of last year",
        body: "New 2026 installations include Gateway to Wonder animal lanterns, Celestial Flight in the century-old oaks, Candy Cane Lane, Campfire Canyon and the Frosted Forest. Verify which special performances or food offerings run on your date."
      },
      {
        title: "Parking and timing around Hermann Park",
        body: "The main Zoo Lights entrance is at 6200 Hermann Park Drive; the Medical Center zoo entrance is closed. Holiday and Museum District traffic can make arriving at an exact entry slot harder than on a daytime visit."
      },
      {
        title: "Pair with Houston without rushing",
        body: "Museum District and Hermann Park are close by. Use a museum or garden in daylight, have dinner, then take a separate timed Zoo Lights walk. Make hotel reservations only after choosing the actual ticket date."
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
      }
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
    sourceCheckedAt: "2026-10-21",
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
        body: "Moody Gardens says ICE LAND is kept at 9°F. Heavy winter layers, suitable shoes and gloves are prudent even on a mild Galveston evening, especially for small children. Confirm the operator's coat and accessory guidance."
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
        body: "The official 2026 ICE LAND page lists $35 adult and $29 qualifying child/senior admission, with bundles varying by date and extras. Verify checkout inclusions, hours, refund policy and current capacity before purchasing."
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
    venue: "Dallas Arboretum and Botanical Garden",
    officialUrl: "https://www.dallasarboretum.org/events-activities/holiday-at-the-arboretum/",
    sourceCheckedAt: "2026-10-21",
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
        value: "9 a.m.–4 p.m."
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
        body: "Daytime and Holiday at Night are separately priced, with different access windows and lighting conditions. The organization lists daytime 9 a.m.–4 p.m. and nighttime 5–10 p.m.; verify the exact booking date before assuming all areas are open."
      },
      {
        title: "Understand date-variable tickets",
        body: "The official seasonal page lists adult daytime admission roughly $21.95–$25.95 and nighttime general admission $35–$40, with an online-only Night Owl option at $15. The final checkout price can vary, and member/Museums for All access follows different rules."
      },
      {
        title: "Do not miss the Christmas Village and DeGolyer House",
        body: "The holiday experience extends beyond the gazebos, including a Christmas Village and interior seasonal décor. Families who want photos and leisurely strolling should budget more than a quick pass-through and check house access schedules."
      },
      {
        title: "Plan parking and accessibility",
        body: "The grounds are extensive; assess stroller and mobility needs, garden paths and transport from parking before visiting after dark. Check weather policies and which seasonal features are in operation on the purchased date."
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
      }
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
    venue: "Space Center Houston",
    officialUrl: "https://spacecenter.org/galaxy-lights/",
    sourceCheckedAt: "2026-10-21",
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
        body: "The organizer advertises Galaxy Lights on select dates from November 14 through January 3. Use the live ticket calendar to verify evening start and end times and availability; the date range does not imply the show operates every night."
      },
      {
        title: "Understand Galaxy Lights versus daytime admission",
        body: "Space Center Houston's daytime exhibitions and evening Galaxy Lights products have different admission terms. Confirm whether the specific ticket or package includes anything beyond the holiday installation before relying on it for daytime visits."
      },
      {
        title: "Look for space-specific seasonal highlights",
        body: "The 2026 edition promotes illuminated science-fiction and space scenes and a new galactic snow slide. Additional interactive effects vary; the park is not the same experience as a zoo light walk or traditional drive-through display."
      },
      {
        title: "Plan for outdoor weather and status changes",
        body: "The operator says most light displays are outdoors and publishes the evening's weather-related status by 4 p.m. Wear appropriate footwear and layers and check the current status rather than assuming a rain forecast always closes the event."
      },
      {
        title: "Make the NASA-area weekend cohesive",
        body: "Use daytime NASA-site attractions, the Clear Lake waterfront or Kemah on a separate portion of the day, then return for the light show. Stay in the Clear Lake/Webster area if the following morning involves another attraction."
      },
      {
        title: "Do not invent Ticketmaster inventory",
        body: "The operator's own ticket checkout is the reliable admissions path unless a properly matched live affiliate listing exists. A generic Ticketmaster search is not a Galaxy Lights admission ticket."
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
    venue: "Concho River / 598 W. First Street",
    officialUrl: "https://www.conchochristmascelebration.com/tour-of-lights",
    sourceCheckedAt: "2026-10-21",
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
        body: "The annual Community Christmas Tree Lighting begins at 5:15 p.m. December 5 and a downtown parade begins at 6 p.m. Those have a different footprint than the vehicle route, so plan parking and timing separately rather than trying to drive both events simultaneously."
      },
      {
        title: "Add downtown San Angelo",
        body: "Concho Avenue, historic downtown and the riverfront can be explored before dusk. Visitors traveling from farther away may want one overnight rather than driving home after a late-night light tour."
      },
      {
        title: "Respect local traffic controls",
        body: "Use the posted entrance address and follow staff or municipal signage. Do not stop the vehicle for photos where prohibited or block access for local residents."
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
      }
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
    sourceCheckedAt: "2026-10-21",
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
        title: "Treat tickets and donations carefully",
        body: "Historic editions were offered free with donations welcomed. Check the live 2026 church page for any reservation or ticket changes; do not attach an affiliate admission checkout to a community church event."
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
