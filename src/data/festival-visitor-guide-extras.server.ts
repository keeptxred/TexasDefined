import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

/**
 * Festival-specific independently edited visitor depth for TexasDefined's established
 * canonical event pages. These are supplementary, NOT replacements for each event's
 * source-controlled dates, tickets, accessibility policies or 2027 announcements.
 *
 * Checked against relevant first-party organizer/visitor sources 2026-10-21.
 * Editorial refresh must not turn an unrelated attraction product into admission.
 */
type Extras = Pick<MajorEventAuthorityRecord, "planningSections" | "relatedLinks" | "sources"> &
  { slug: string; quickFacts?: NonNullable<MajorEventAuthorityRecord["quickFacts"]> };
const festivalGuideExtras: readonly Extras[] = [
  {
    "slug": "texas-renaissance-festival",
    "quickFacts": [
      {
        "label": "2026 gates",
        "value": "9 a.m.–8 p.m.; final entry at 7 p.m. on published operating days"
      },
      {
        "label": "Festival address",
        "value": "21778 FM 1774, Todd Mission, Texas"
      },
      {
        "label": "Season pattern",
        "value": "Saturdays, Sundays and Thanksgiving Friday — not daily"
      }
    ],
    "planningSections": [
      {
        "title": "Choosing the right 2026 weekend",
        "body": "Unlike a one-day fair, the Texas Renaissance Festival changes atmosphere by themed weekend. Choose the costume theme, entertainment and crowd experience you actually want before you choose lodging or tickets; consult the current organizer calendar rather than assuming the same lineup operates every Saturday."
      },
      {
        "title": "A practical route through the grounds",
        "body": "Treat this as an all-day walking event with multiple stages, artisan shops and food stops. Pick two or three must-see shows, leave a generous buffer between them, and plan to explore nearby merchant areas instead of racing from performance to performance."
      },
      {
        "title": "Families, accessibility and weather",
        "body": "Make a shade, water, restroom and meeting-point plan before entering. Wheelchair and stroller suitability can differ across outdoor paths after rain; check current festival accessibility, permitted items and parking instructions rather than assuming a fully paved venue."
      },
      {
        "title": "Buying admissions without a bad surprise",
        "body": "Use the festival's official ticket categories and date-specific inventory. Camping, parking upgrades and admission may be separate purchases; a weekend pass is not the same thing as an individual single-day ticket. TexasDefined does not present Viator city tours as festival tickets."
      },
      {
        "title": "Important 2026 on-site change",
        "body": "The Wyrmwood Public House announced that it would not reopen for the remainder of the 2026 season following fire damage. Do not plan your day around that location without checking its own updates; performances may be relocated."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/grimes",
        "label": "Grimes County guide",
        "description": "Continue into historic small towns and local attractions around Todd Mission."
      },
      {
        "href": "/event/dickens-on-the-strand",
        "label": "Dickens on The Strand",
        "description": "Compare another theatrical, costume-friendly seasonal outing."
      }
    ],
    "sources": [
      {
        "label": "Texas Renaissance Festival hours and official 2026 season",
        "url": "https://www.texrenfest.com/"
      },
      {
        "label": "Texas Renaissance Festival official ticket information",
        "url": "https://www.texrenfest.com/p/ticket-info/general-ticket-info"
      }
    ]
  },
  {
    "slug": "wurstfest",
    "quickFacts": [
      {
        "label": "2026 dates",
        "value": "November 6–15"
      },
      {
        "label": "Admission pattern",
        "value": "Free Monday–Thursday; paid Fridays, Saturdays and first Sunday"
      },
      {
        "label": "Children",
        "value": "Ages 12 and under admitted free every day"
      },
      {
        "label": "Location",
        "value": "Near Landa Park and the Comal River in New Braunfels"
      }
    ],
    "planningSections": [
      {
        "title": "Which 2026 day offers the best value?",
        "body": "The published 2026 calendar makes Monday–Thursday admission free, with free weekday gates opening at 5 p.m. are $15 online or $20 at the gate; Saturdays are $25 online or $30 at the gate. The final Sunday becomes free after 3 p.m. These are entry prices, not an all-inclusive food or drink pass; verify before purchasing."
      },
      {
        "title": "Plan around the entertainment—not just the gate",
        "body": "The 65th anniversary program advertises multiple stages and a large slate of polka, yodeling, dance and German-Texan entertainment. Choose a few acts using the official daily lineup, then allow time for food and craft areas rather than treating the grounds like a continuous concert."
      },
      {
        "title": "Parking, shuttle and the walk back",
        "body": "The festival is in the Landa Park area, not in a downtown convention hall. Consider the official shuttle or a ride service before deciding where to park, and avoid assuming the quickest entrance at arrival will be the best exit after the music."
      },
      {
        "title": "New Braunfels is part of the story",
        "body": "Wurstfest is a useful starting point for the region's German-Texan settlement, sausage-making and community dance traditions. An overnight plan can pair the festival with downtown New Braunfels, the Comal River and nearby Gruene without relying on a single crowded event day."
      }
    ],
    "relatedLinks": [
      {
        "href": "/destination/new-braunfels",
        "label": "New Braunfels",
        "description": "City attractions, river access and trip planning beyond festival gates."
      },
      {
        "href": "/german-czech-texas-towns",
        "label": "German and Czech Texas towns",
        "description": "Explore the larger history behind the music and food."
      }
    ],
    "sources": [
      {
        "label": "Wurstfest official 2026 prices and hours",
        "url": "https://wurstfest.com/"
      },
      {
        "label": "Wurstfest organizer entertainment calendar",
        "url": "https://wurstfest.com/entertainment/"
      }
    ]
  },
  {
    "slug": "dickens-on-the-strand",
    "quickFacts": [
      {
        "label": "2026 festival",
        "value": "December 4–6"
      },
      {
        "label": "Friday access",
        "value": "Fezziwig's Friday, 5–9 p.m., free"
      },
      {
        "label": "Saturday / Sunday",
        "value": "Saturday 10 a.m.–9 p.m.; Sunday noon–6 p.m."
      },
      {
        "label": "Venue",
        "value": "The Strand historic district, Galveston"
      }
    ],
    "planningSections": [
      {
        "title": "How much will 2026 admission cost?",
        "body": "The Galveston Historical Foundation lists free Friday admission, with paid Saturday and Sunday entry. The initial published standard admission is $20 for adults and $13 for ages 7–12, with children 6 and under free; advance prices increase by $5 on November 20. Special experiences or VIP access are separate. Check live checkout before buying."
      },
      {
        "title": "Walkable districts and accessible arrival",
        "body": "The festival closes parts of the historic downtown street grid. Paid street parking and garages are available nearby; the organizer's map identifies accessible parking on Market Street and near 20th Street. Contact the Historical Foundation in advance about specific access needs."
      },
      {
        "title": "What to wear and what to leave behind",
        "body": "Victorian dress is encouraged, and the organizer advertises a gate-admission discount for Victorian costume—but verify the current terms before assuming it applies to online purchases. Pets, ice chests and recreational wheeled devices are restricted; costume props can be screened."
      },
      {
        "title": "A family-friendly Galveston weekend",
        "body": "Choose a few stage performances and parades, then add historic buildings, maritime history and an island meal before or after the festival. Avoid scheduling every stop inside the crowded paid district; nearby historic sites may have separate hours and admissions."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/galveston",
        "label": "Galveston County",
        "description": "Historic neighborhoods, museums, seawall and island stops."
      },
      {
        "href": "/event/marfa-lights-festival",
        "label": "Marfa Lights Festival",
        "description": "Compare a different small-town Texas tradition."
      }
    ],
    "sources": [
      {
        "label": "Galveston Historical Foundation 2026 tickets and special events",
        "url": "https://www.galvestonhistory.org/events/dickens-on-the-strand/tickets"
      },
      {
        "label": "Dickens official map, parking, accessibility and restricted items",
        "url": "https://www.galvestonhistory.org/events/dickens-on-the-strand/map"
      }
    ]
  },
  {
    "slug": "houston-livestock-show-rodeo",
    "quickFacts": [
      {
        "label": "Next confirmed season",
        "value": "March 2–21, 2027"
      },
      {
        "label": "Location",
        "value": "NRG Park, Houston"
      },
      {
        "label": "Admission distinction",
        "value": "Grounds ticket does not admit you to the rodeo/concert performance"
      }
    ],
    "planningSections": [
      {
        "title": "Grounds access versus rodeo-and-concert seats",
        "body": "Decide whether the goal is livestock, food and grounds activities or an arena rodeo-and-concert performance. Grounds admission by itself does not enter the stadium; conversely, verify whether your chosen arena ticket includes the relevant grounds access. Children, special days and multi-day packages have separate terms."
      },
      {
        "title": "Where to buy: avoid a false Ticketmaster promise",
        "body": "RODEOHOUSTON's official ticket portal points to its own approved sales channels, including AXS account services. TexasDefined must not relabel unrelated Houston experiences or secondary listings as official rodeo tickets. Choose the performance date and verify the organizer's approved checkout."
      },
      {
        "title": "NRG Park without the car headache",
        "body": "NRG Park hosts multiple simultaneous activities over a large footprint. Check the current park-and-ride, METRORail, parking, security and prohibited-item guidance before travel. Public transportation is worth comparing against on-site parking, particularly when stadium concerts finish at night."
      },
      {
        "title": "What to do with a full rodeo day",
        "body": "Consider separating animal exhibits, livestock competitions, food and shopping from the stadium performance. Leave arrival and walking buffers; not every exhibit, livestock competition or attraction is operating throughout every day."
      },
      {
        "title": "If you are traveling from out of town",
        "body": "Book for the actual show date, not just the broad rodeo season. Use the NRG area or a METRORail-connected location as your lodging starting point, then add Houston museums, parks or dining as a separate experience."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/harris",
        "label": "Harris County",
        "description": "Houston history, museums and nearby stops."
      },
      {
        "href": "/event/san-antonio-stock-show-rodeo",
        "label": "San Antonio Stock Show & Rodeo",
        "description": "Compare the different ticket and venue arrangements at another Texas rodeo."
      }
    ],
    "sources": [
      {
        "label": "RODEOHOUSTON 2027 official tickets and eligibility",
        "url": "https://www.rodeohouston.com/tickets/"
      },
      {
        "label": "RODEOHOUSTON planning and arrival guidance",
        "url": "https://www.rodeohouston.com/plan-your-visit/"
      }
    ]
  },
  {
    "slug": "san-antonio-stock-show-rodeo",
    "quickFacts": [
      {
        "label": "2027 dates",
        "value": "February 11–28"
      },
      {
        "label": "Rodeo venue",
        "value": "Frost Bank Center"
      },
      {
        "label": "Ticketing",
        "value": "Ticketmaster lists individual 2027 performances, plus grounds and parking products"
      }
    ],
    "planningSections": [
      {
        "title": "Ticket types that look alike but are not the same",
        "body": "Ticketmaster lists separate arena performances, parking permits and grounds passes. Select the exact rodeo-and-concert performance, not an identically dated parking listing. Ticketmaster's event descriptions state that an arena rodeo ticket includes fairgrounds admission, while an individual grounds ticket does not promise an arena seat."
      },
      {
        "title": "Choose the performance and the day",
        "body": "Rodeo competition, post-rodeo concerts and daytime livestock exhibitions have different clocks. Arena shows can run for hours before music begins; choose dates using the announced performer lineup and confirm the latest start time and admissibility restrictions before booking."
      },
      {
        "title": "Avoid a venue mix-up",
        "body": "The larger livestock exposition uses the Freeman Coliseum/Frost Bank Center campus. Check whether your ticket is for the Frost Bank Center arena or for exhibition and fairground activities, then choose the right parking area and entrance."
      },
      {
        "title": "Accessibility and family considerations",
        "body": "Accessible arena seating, mobility access and restrictions on bags and strollers are governed by the venue and ticket type. Families should check child admission thresholds and the full rodeo-plus-concert duration before purchasing late shows."
      },
      {
        "title": "San Antonio beyond the arena",
        "body": "A weekend can connect the livestock exposition with historic San Antonio, the missions or the River Walk. Leave generous time for transit: the rodeo grounds are not in the downtown pedestrian core."
      }
    ],
    "relatedLinks": [
      {
        "href": "/sports-venue/freeman-coliseum",
        "label": "Freeman Coliseum",
        "description": "Venue logistics in the larger stock show campus."
      },
      {
        "href": "/article/san-antonio-stock-show-rodeo-history-guide",
        "label": "History of the San Antonio Rodeo",
        "description": "How the stock show developed and why it matters."
      }
    ],
    "sources": [
      {
        "label": "Ticketmaster official 2027 San Antonio Rodeo event listings",
        "url": "https://www.ticketmaster.com/san-antonio-stock-show-and-rodeo-tickets/artist/804262"
      },
      {
        "label": "San Antonio Rodeo official organizer",
        "url": "https://www.sarodeo.com/"
      }
    ]
  },
  {
    "slug": "sxsw",
    "quickFacts": [
      {
        "label": "Next event",
        "value": "March 15–21, 2027"
      },
      {
        "label": "Footprint",
        "value": "Multiple downtown Austin venues"
      },
      {
        "label": "Primary decision",
        "value": "Choose conference or festival credential before lodging"
      }
    ],
    "planningSections": [
      {
        "title": "Badge strategy before anything else",
        "body": "SXSW is not a single ticketed music concert. Conference access, music, film and other programs can have separate registration privileges and capacity limits. Start with the official badge comparison and decide which programming you must enter before paying for a credential."
      },
      {
        "title": "A day-by-day Austin plan beats a wish list",
        "body": "Map each must-attend session to the exact venue; add realistic walking time and leave unscheduled blocks for admission queues or sessions that fill. A downtown hotel can be strategically valuable if many events are on foot."
      },
      {
        "title": "Free programs are not automatically universal access",
        "body": "Public activations and separately ticketed shows may exist during SXSW without providing all badge-holder benefits. Check organizer and individual venue pages rather than promising universal free entry."
      },
      {
        "title": "Protect the trip against expensive mistakes",
        "body": "Do not rely on last year's badge prices, venue assignments or unofficial resale offers. The organizer controls official registration and access rules. Viator sightseeing links on this page, if offered, are for unrelated Austin activities rather than festival passes."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/travis",
        "label": "Travis County",
        "description": "Austin destinations and trip planning."
      },
      {
        "href": "/event/austin-city-limits-music-festival",
        "label": "ACL Music Festival",
        "description": "Compare another major Austin festival with very different ticketing."
      }
    ],
    "sources": [
      {
        "label": "SXSW official dates and registration guidance",
        "url": "https://sxsw.com/"
      },
      {
        "label": "SXSW official purchase portal",
        "url": "https://cart.sxsw.com/"
      }
    ]
  },
  {
    "slug": "fiesta-san-antonio",
    "quickFacts": [
      {
        "label": "2027 citywide season",
        "value": "April 15–25"
      },
      {
        "label": "River Parade",
        "value": "April 19, 2027"
      },
      {
        "label": "Battle of Flowers Parade",
        "value": "April 23, 2027"
      },
      {
        "label": "Fiesta Flambeau Parade",
        "value": "April 24, 2027"
      }
    ],
    "planningSections": [
      {
        "title": "Know the four anchor events",
        "body": "The Texas Cavaliers River Parade, Battle of Flowers Parade and nighttime Fiesta Flambeau Parade are distinct ticketing and route experiences; Fiesta Carnival is another separate option. Do not assume a ticket for one parade admits you to another, or that every Fiesta event is free."
      },
      {
        "title": "Choose parade viewing before making dinner plans",
        "body": "For the 2027 published schedule, the River Parade is April 19 at 7 p.m., Battle of Flowers is April 23 with a 10:30 a.m. parade, and Fiesta Flambeau is April 24 at 7:45 p.m. Route, reserved-seating prices and start points must be rechecked on each event's own page."
      },
      {
        "title": "A citywide festival needs neighborhood planning",
        "body": "The carnival is advertised at Alamodome Parking Lot C, but Fiesta includes venues well beyond that area. Plan a single neighborhood or downtown cluster per outing, and allow for parade road closures and public transit changes."
      },
      {
        "title": "Understand the cultural context",
        "body": "Fiesta grew out of the Battle of Flowers commemoration and now includes numerous community and nonprofit celebrations. Give independently organized cultural events their proper names instead of treating the entire 11-day program as one corporate event."
      },
      {
        "title": "Book complementary tours on the right day",
        "body": "A San Antonio history or missions tour can help visitors understand the city between Fiesta commitments, but it does not include event admission. Check tour departure locations against parade street closures."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/bexar",
        "label": "Bexar County",
        "description": "City history and attractions around Fiesta."
      },
      {
        "href": "/event/san-antonio-stock-show-rodeo",
        "label": "San Antonio Rodeo",
        "description": "Another citywide trip anchor in a different season."
      }
    ],
    "sources": [
      {
        "label": "Fiesta 2027 official parade and carnival schedule",
        "url": "https://fiestasanantonio.org/parade/"
      },
      {
        "label": "Fiesta San Antonio event calendar",
        "url": "https://fiestasanantonio.org/schedule/"
      }
    ]
  },
  {
    "slug": "texas-sandfest",
    "quickFacts": [
      {
        "label": "2027 dates",
        "value": "April 16–18"
      },
      {
        "label": "Beach footprint",
        "value": "Between Beach Markers 13 and 17"
      },
      {
        "label": "Daily hours",
        "value": "9 a.m.–7:30 p.m.; ticket sales close earlier"
      },
      {
        "label": "Restrictions",
        "value": "Service animals only; no coolers or outside alcohol"
      }
    ],
    "planningSections": [
      {
        "title": "Know the exact stretch of beach",
        "body": "The organizer places Texas SandFest between Beach Markers 13 and 17. Use the official entrance and accessible-route instructions instead of navigating only to the center of Port Aransas; island traffic and beach access vary during the festival."
      },
      {
        "title": "Arrival, wristbands and reentry in 2027",
        "body": "The official guide lists early will-call collection at the North Gate April 13–15 from 9 a.m. to 6 p.m. During the festival, both gate areas handle will call and wristbands support multi-day reentry. Ticket sales and the Master's Gallery close at 6:30 p.m., before the 7:30 p.m. festival closing."
      },
      {
        "title": "Heat, sand and accessibility",
        "body": "A beach festival is not a paved museum. Prepare for sun, wind, sand and changing weather; consider mobility and stroller limitations and consult the latest published accessibility arrangements. Do not rely on a generic beach packing list: coolers and outside alcohol are prohibited."
      },
      {
        "title": "Beyond the sculpting competition",
        "body": "If staying overnight, separate sculpture viewing from the island's water activities, restaurants and nearby coastal parks. Tour and boat inventory will vary by operator, weather and season, and is not included with SandFest admission."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/nueces",
        "label": "Nueces County",
        "description": "Port Aransas and coastal attractions around the festival."
      },
      {
        "href": "/event/luling-watermelon-thump",
        "label": "Luling Watermelon Thump",
        "description": "Compare a family-friendly Texas event farther inland."
      }
    ],
    "sources": [
      {
        "label": "Texas SandFest 2027 know-before-you-go rules",
        "url": "https://www.texassandfest.org/knowbeforeyougo"
      },
      {
        "label": "Texas SandFest official home",
        "url": "https://www.texassandfest.org/"
      }
    ]
  },
  {
    "slug": "luling-watermelon-thump",
    "quickFacts": [
      {
        "label": "Town",
        "value": "Luling, Caldwell County"
      },
      {
        "label": "Known for",
        "value": "Watermelon judging, seed-spitting and small-town festivities"
      },
      {
        "label": "Future dates",
        "value": "Verify the 2027 program with the organizer before booking"
      }
    ],
    "planningSections": [
      {
        "title": "See more than the seed-spitting contest",
        "body": "Luling's Watermelon Thump brings together a parade, watermelon-themed competitions and live entertainment. The contest is a signature part of the tradition, but exact event-day activities can differ; select your visit from the current program rather than a generic four-day date span."
      },
      {
        "title": "Downtown street access and festival timing",
        "body": "The heart of the event is in the small-town core. Check organizers' current street closures, parking guidance, daytime heat precautions and concert admission terms; free public celebration spaces do not necessarily mean every music performance has free admission."
      },
      {
        "title": "Turn the visit into a Caldwell County day trip",
        "body": "Luling offers local barbecue, a distinctive painted water tower and oilfield heritage. Travelers can combine it with nearby Lockhart, but should not schedule an off-site meal so tightly that they miss the desired parade or contest."
      },
      {
        "title": "What is not a ticket listing",
        "body": "Do not display a generic Viator experience in another city as a ticket to the Watermelon Thump. Use the official organizer for competition rules, admission and the festival program."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/caldwell",
        "label": "Caldwell County",
        "description": "Connect Luling with Lockhart and nearby history."
      },
      {
        "href": "/event/texas-citrus-fiesta",
        "label": "Texas Citrus Fiesta",
        "description": "Compare another Texas agricultural celebration."
      }
    ],
    "sources": [
      {
        "label": "Luling Watermelon Thump official organizer",
        "url": "https://www.watermelonthump.com/"
      }
    ]
  },
  {
    "slug": "galveston-juneteenth-celebrations",
    "quickFacts": [
      {
        "label": "Historic place",
        "value": "Galveston, Texas"
      },
      {
        "label": "Commemoration",
        "value": "June 19"
      },
      {
        "label": "Historical foundation",
        "value": "June 19, 1865 public announcement of freedom in Galveston"
      }
    ],
    "planningSections": [
      {
        "title": "Understand what happened in Galveston",
        "body": "Juneteenth commemorates June 19, 1865, when Union General Gordon Granger's General Order No. 3 announced emancipation in Texas following the Civil War. The long history of Black Texans celebrating freedom deserves thoughtful context distinct from individual concerts or vendor markets."
      },
      {
        "title": "The holiday is not one ticketed event",
        "body": "Galveston-area observances, readings, worship services, museum programs, parades and cultural festivals are planned by different organizations. Dates and admission rules vary. List an event's actual sponsor and precise location rather than suggesting one pass covers the holiday."
      },
      {
        "title": "Explore the heritage with care",
        "body": "Pair community celebrations with interpretive stops connected to emancipation and African American history. Guided local-history tours may provide context, but no commercial activity replaces first-person stories or the historical record."
      },
      {
        "title": "Accessible and respectful participation",
        "body": "Some observances are in outdoor parks while others are in museums or historic buildings. Check each host's physical access arrangements, public hours, parking and photography rules; avoid turning commemorative ceremonies into generic photo opportunities."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/galveston",
        "label": "Galveston County",
        "description": "Explore historic sites, communities and the island."
      },
      {
        "href": "/article/galveston-county-island-port-juneteenth-texas",
        "label": "Galveston history and Juneteenth",
        "description": "Local historical context for the commemoration."
      }
    ],
    "sources": [
      {
        "label": "National Park Service Juneteenth history",
        "url": "https://www.nps.gov/subjects/npscelebrates/juneteenth.htm"
      },
      {
        "label": "Galveston Island Juneteenth visitor context",
        "url": "https://www.visitgalveston.com/events/annual-events/juneteenth/"
      }
    ]
  },
  {
    "slug": "marfa-lights-festival",
    "quickFacts": [
      {
        "label": "2026 confirmed event",
        "value": "September 4–6 (completed)"
      },
      {
        "label": "Next year's schedule",
        "value": "Not yet confirmed by the supplied 2026 Visit Marfa listing"
      },
      {
        "label": "Place",
        "value": "Marfa, Presidio County"
      }
    ],
    "planningSections": [
      {
        "title": "Two experiences with similar names",
        "body": "The Marfa Lights Festival is a weekend celebration of music, vendors and small-town culture. The unexplained lights are a separate nighttime-viewing attraction east of town. The festival does not promise that mysterious lights will appear during your visit."
      },
      {
        "title": "Do not confuse the 2026 festival with a future date",
        "body": "Visit Marfa confirms the 39th annual festival for September 4–6, 2026. That window is historical now; confirm a year-specific organizer announcement before marketing a 2027 festival or making nonrefundable reservations."
      },
      {
        "title": "West Texas driving and late-night logistics",
        "body": "Marfa is far from major metropolitan areas, and night travel involves dark highways and wildlife. Plan fuel, lodging, weather and return-driving before the evening program; build one or two daytime art and architecture stops into the trip."
      },
      {
        "title": "Where to view the actual Marfa Lights",
        "body": "Use a public, permitted viewing location and follow posted safety guidance. The lights are an atmospheric local mystery, not an event ticket or something an organizer can schedule or guarantee."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/presidio",
        "label": "Presidio County",
        "description": "Marfa's geography, history and surrounding towns."
      },
      {
        "href": "/event/texas-renaissance-festival",
        "label": "Texas Renaissance Festival",
        "description": "Contrast a staged themed experience with a West Texas community celebration."
      }
    ],
    "sources": [
      {
        "label": "Visit Marfa 39th Annual Marfa Lights Festival",
        "url": "https://visitmarfa.com/events/39th-annual-marfa-lights-festival"
      },
      {
        "label": "Visit Marfa current event calendar",
        "url": "https://visitmarfa.com/events/"
      }
    ]
  },
  {
    "slug": "austin-city-limits-music-festival",
    "quickFacts": [
      {
        "label": "2026 schedule",
        "value": "October 2–4 and 9–11 (completed)"
      },
      {
        "label": "Venue",
        "value": "Zilker Park, Austin"
      },
      {
        "label": "Passes",
        "value": "Single-day and multi-day festival inventory are distinct products"
      }
    ],
    "planningSections": [
      {
        "title": "Choose the weekend by the actual lineup",
        "body": "ACL takes place over two separate festival weekends. Do not assume every musician performs on both weekends or that their stage time is identical. Pick your preferred artists and compare each weekend's actual lineup before arranging a hotel."
      },
      {
        "title": "Zilker Park transport is a decision, not a footnote",
        "body": "Build your approach around the organizer's current shuttle, pedestrian and ride-share guidance. Road restrictions and departure crowds can make a nearby pickup look deceptively convenient; prearrange a meeting point for your group."
      },
      {
        "title": "A heat-conscious Austin day",
        "body": "The park is an outdoor setting with long distances between stages. Hydration, sun protection, an approved bag and a sensible afternoon rest period can matter more than arriving hours before every act. Check allowed items and weather plans in the current official FAQ."
      },
      {
        "title": "Separate festival passes from Austin attractions",
        "body": "Austin tours and attractions can be worthwhile between festival days or for nonattending friends. Their Viator listings do not confer entrance to Zilker Park or to an ACL stage. Future-year pricing should not be copied from the completed 2026 edition."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/travis",
        "label": "Travis County",
        "description": "Austin-area parks, city attractions and day trips."
      },
      {
        "href": "/event/sxsw",
        "label": "South by Southwest",
        "description": "Compare Austin's spring conference and music festival."
      }
    ],
    "sources": [
      {
        "label": "ACL Festival official organizer and current ticket info",
        "url": "https://www.aclfestival.com/"
      }
    ]
  },
  {
    "slug": "texas-citrus-fiesta",
    "quickFacts": [
      {
        "label": "Location",
        "value": "Mission, Texas — Rio Grande Valley"
      },
      {
        "label": "Signature events",
        "value": "Parade of Oranges and citrus-themed traditions"
      },
      {
        "label": "Date confidence",
        "value": "Check future editions directly with the organizer"
      }
    ],
    "planningSections": [
      {
        "title": "What the Citrus Fiesta celebrates",
        "body": "The annual celebration connects the Rio Grande Valley's citrus-growing heritage with community parades, themed costumes and local agriculture. The program combines multiple activities rather than one show in a single ticketed venue."
      },
      {
        "title": "Parade versus pageant or gala",
        "body": "A parade audience member, contestant family and gala attendee can have different entry requirements and times. Consult each current official event page and distinguish public streetside viewing from ticketed indoor or special events."
      },
      {
        "title": "Build a Mission and Valley itinerary",
        "body": "Mission can be paired with local nature sites, Rio Grande Valley heritage and regional food. Plan for cross-city distances rather than assuming every advertised activity is walkable from a single festival parking spot."
      },
      {
        "title": "Keep archive dates from masquerading as new tickets",
        "body": "The supplied 2026 January celebration is over. Until the organizer posts the next confirmed schedule and admissions, do not imply that 2026 prices or dates still apply, and do not market a generic Viator city activity as festival admission."
      }
    ],
    "relatedLinks": [
      {
        "href": "/county/hidalgo",
        "label": "Hidalgo County",
        "description": "Explore Mission and the Rio Grande Valley."
      },
      {
        "href": "/event/luling-watermelon-thump",
        "label": "Luling Watermelon Thump",
        "description": "Compare another agriculture-rooted Texas tradition."
      }
    ],
    "sources": [
      {
        "label": "Texas Citrus Fiesta official organizer",
        "url": "https://www.texascitrusfiesta.com/"
      }
    ]
  }
];

const extrasBySlug = new Map(festivalGuideExtras.map((record) => [record.slug, record]));

export const upgradedFestivalGuideSlugs = festivalGuideExtras.map((record) => record.slug);

export function expandFestivalGuide(event: MajorEventAuthorityRecord): MajorEventAuthorityRecord {
  const extras = extrasBySlug.get(event.slug);
  if (!extras) return event;
  return {
    ...event,
    quickFacts: [...(event.quickFacts ?? []), ...(extras.quickFacts ?? [])]
      .filter((fact, index, facts) => facts.findIndex((candidate) => candidate.label === fact.label) === index),
    planningSections: [...event.planningSections, ...extras.planningSections]
      .filter((section, index, sections) => sections.findIndex((candidate) => candidate.title === section.title) === index),
    relatedLinks: [...event.relatedLinks, ...extras.relatedLinks]
      .filter((link, index, links) => links.findIndex((candidate) => candidate.href === link.href) === index),
    sources: [...event.sources, ...extras.sources]
      .filter((source, index, sources) => sources.findIndex((candidate) => candidate.url === source.url) === index),
  };
}
