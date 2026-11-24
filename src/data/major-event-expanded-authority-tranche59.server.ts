import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Organizer-reviewed, destination-scale Christmas attractions. The 2026–27
// event season is dated; ticket pricing, availability and time slots are not.
interface ChristmasExtendedRecord extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: ChristmasExtendedRecord[] = [
  {
    slug: "gaylord-texan-ice",
    "name": "Gaylord Texan ICE! featuring Harry Potter 2026–27",
    "city": "Grapevine",
    "countySlug": "tarrant",
    "countyName": "Tarrant County",
    "region": "prairies-lakes",
    "category": "seasonal",
    "startDate": "2026-11-13",
    "endDate": "2027-01-03",
    "venue": "Gaylord Texan Resort & Convention Center · Lake Grapevine",
    "officialUrl": "https://tickets.gaylordtexan.com/eventperformances.asp?evt=243",
    "sourceCheckedAt": "2026-11-24",
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
        "value": "Timed ticket required; children 3 and under free, guests under 18 must have a paid adult"
      }
    ],
    planningSections: [
      {
        title: "Book the exact ICE! time, not just the holiday resort visit",
        "body": "Gaylord's official ICE! ticket page confirms November 13, 2026–January 3, 2027. Choose a specific date and entry time: early or late admission is not permitted. Children ages three and under enter free; guests under 18 must be accompanied by a paid adult. Tickets are non-refundable, and parking charges and taxes are additional. A resort hotel reservation is not by itself an ICE! ticket."
      },
      {
        title: "Prepare for the cold-room experience",
        "body": "The official event page confirms the display stays near 9°F and provides parkas. Allow approximately 20–40 minutes inside, plus arrival and other activities; wear closed-toe shoes, full-length trousers and warm layers. Young children may need extra insulation. Visitors with cold-sensitivity or access concerns should consult the current organizer guidance before purchasing."
      },
      {
        title: "Compare resort attractions as separate purchases",
        "body": "The current official ticket page names three separate passes, not a single all-inclusive ICE! admission. Silver advertises up to 20% savings and includes ICE!, ice tubing, a scavenger hunt, a Harry Potter Cookie Kit and Butterbeer; Gold adds a Christmas Carousel and Snowball Build & Blast with advertised savings up to 30%; Ultimate Holi-DAY advertises savings up to 40% and includes most holiday activities and shows. These are maximum advertised savings, not a guaranteed price or inclusion of every attraction. Confirm the actual selected date, time and age-based eligibility at checkout."
      },
      {
        title: "Use the right Grapevine base",
        "body": "Gaylord Texan is located at Lake Grapevine rather than on Historic Main Street. Determine whether you will visit the resort only, or also downtown Grapevine and the North Pole Express; allocate realistic driving, parking and check-in time."
      },
      {
        title: "Plan a family day without double-booking",
        "body": "A sensible visit uses one scheduled indoor anchor—ICE!—and a separate downtown or resort activity if energy allows. Weekends close to Christmas and school breaks can be crowded; verify parking, transportation and stroller accommodations directly."
      },
      {
        title: "Compare lodging without implying event access",
        "body": "Hotel stays may simplify an evening visit but are optional. The resort has a time-limited Cyber Sale for eligible room/ICE! holiday packages with a November 30 booking deadline and travel dates through January 3; do not assume every room rate includes admission. Compare the package’s explicit ICE! tickets and restrictions against separate tickets plus non-resort lodging. General hotel affiliate links elsewhere on TexasDefined are not ICE! admission."
      }
    ],
    relatedLinks: [
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
        "label": "Gaylord Texan direct dated ICE! tickets, entry rules and 2026–27 calendar",
        "url": "https://tickets.gaylordtexan.com/eventperformances.asp?evt=243"
      },
      {
        "label": "Gaylord Texan November 30 booking-deadline package",
        "url": "https://www.marriott.com/offers/cyber-sale-on-ice-packages-holiday-stays-off-260149/dalgt-gaylord-texan-resort-and-convention-center"
      },
      {
        "label": "Gaylord Hotels 2026 ICE! themed announcements",
        "url": "https://www.gaylordhotels.com/the-immersive-christmas-experience-ice-expands-to-eight-resorts-with-new-themes-including-harry-potter-home-alone-and-disney-tim-burton-s-the-nightmare-before-christmas"
      }
    ],
    "dateNote": "This is the published resort season window; use the hotel’s date-specific availability and official checkout for ICE! tickets."
  },
  {
    slug: "grand-prairie-prairie-lights",
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
    "sourceCheckedAt": "2026-11-24",
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
    planningSections: [
      {
        title: "Treat this as a car-based evening",
        "body": "This display is primarily experienced by driving through a controlled light route. Confirm any pedestrian or midway activities on the current event site before planning to park and walk. The route length and slow moving cars require more time than a typical park drive."
      },
      {
        title: "Choose arrival timing before deciding on dinner",
        "body": "Entry lanes can be busy around holiday weekends. Allow extra time for the drive-in queue, food stops and the actual circuit; do not combine the night with another timed DFW performance unless the gap is generous."
      },
      {
        title: "Check the ticket's vehicle terms",
        "body": "The city lists a $50 regular general-admission car pass and conditional $35 early-week admission November 30–December 4 with code EARLY26. That is not an all-season price. The city also advertises special theme nights: Nov. 30 first 200 arriving vehicles receive a tree ornament; Dec. 1 is a children’s bike-donation drive (first 100 contributing guests through the gate receive free admission, and other new-bike donors receive $30 off); Dec. 2 is dog night at Holiday Village; Dec. 3 features live reindeer. These offers apply only on their stated dates and can depend on capacity, vehicle type and the city’s event rules. Verify current tickets before driving."
      },
      {
        title: "Do not confuse walk-through previews with drive-through nights",
        "body": "Before regular nightly vehicle admission begins November 26, the city schedules a motorcycle preview November 20, pedestrian Sneak-A-Peek November 21–22 and a bicycle ride November 23. These are separate special events with distinct access and ticketing; a standard Prairie Lights car pass is not a general walk-through ticket."
      },
      {
        title: "Follow Lynn Creek Park entrance guidance",
        "body": "The official address is 5610 Lake Ridge Parkway. Use the current Prairie Lights traffic and entrance instructions rather than relying on a generic park trailhead pin, particularly during peak nights."
      },
      {
        title: "Bring the family comfortable and safe",
        "body": "The evening is vehicle centered, so pack snacks, water and whatever young children need for a potentially slow queue. Keep drivers attentive and follow the event's rules on windows, headlights and stopping for photos."
      },
      {
        title: "Pair with Grand Prairie and Arlington sensibly",
        "body": "An earlier daytime stop near Joe Pool Lake, Grand Prairie or Arlington can make a good day trip. Nearby hotel searching only makes sense for groups traveling from farther away, not every local family driving in for an hour."
      }
    ],
    relatedLinks: [
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
      },
      {
        "label": "City of Grand Prairie — November 2026 special previews and season announcement",
        "url": "https://www.gptx.org/Newsroom/Special-Events-at-Prairie-Lights-2026"
      }
    ],
    "dateNote": "The City of Grand Prairie confirms every night November 26–December 31, 6–10 p.m.; recheck weather, traffic and ticket details."
  },
  {
    slug: "moody-gardens-holiday-in-the-gardens",
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
    "sourceCheckedAt": "2026-11-21",
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
        "value": "Mile-long trail, 5:30–10 p.m.; check daily operating calendar"
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
        "value": "Lights Trail from $24; ICE LAND from $29; Holiday Evening Pass from $55"
      }
    ],
    planningSections: [
      {
        title: "Pick a lights-only visit or the Holiday Pass",
        "body": "The Nov. 21 organizer price guide lists the trail from $24, ICE LAND from $29 and the Holiday Evening Pass from $55. The evening pass begins at 4 p.m. and combines ICE LAND, the trail, Aquarium Pyramid, one 3D and one 4D film, four Arctic Slide rides for guests at least 36 inches tall, one Kiddie Train ride for children no taller than 48 inches, and rink admission. Skate rentals cost extra. Choose a single attraction if time or height limits make the bundled activities impractical."
      },
      {
        title: "Know the ICE LAND temperature",
        "body": "ICE LAND's 2026 Caribbean theme is inside a 9°F exhibit. Wear cold-weather layers and closed shoes even if the rest of Galveston is mild. Recheck child age limits and current ice-slide rules."
      },
      {
        title: "Leave enough time for the full bayfront route",
        "body": "The light display extends about a mile. Weather, accessibility needs and the age of children can change how quickly the group moves. A simple trail ticket requires less time than adding several indoor films or skating."
      },
      {
        title: "Use the official event calendar, not a season-long guess",
        "body": "The current operating calendar lists ICE LAND, skating and the Arctic Slide from noon to 10 p.m.; the trail opens at 5:30 p.m. Trains operate from 2–4:30 p.m. and 5:30–10 p.m., with Santa photos scheduled from 6–10 p.m. Use the daily calendar for your date, particularly if combining the Aquarium Pyramid, films or separately scheduled shows."
      },
      {
        title: "Compare tickets directly with organizers",
        "body": "For lower-priced tickets, the organizer identifies Value Nights as Sunday through Thursday between November 30 and December 17. Prices depend on the date and age group. Adult tickets cover ages 13–64; child and senior tickets cover ages 4–12 and 65+, respectively. Confirm the actual date-specific price and refund terms at checkout."
      },
      {
        title: "Make a Galveston coastal holiday itinerary",
        "body": "Pair an afternoon at the island's historic district, Seawall or attractions with a fixed Moody Gardens evening; return to the island for Dickens on The Strand only if your travel dates overlap."
      },
      {
        title: "Parking and overnight considerations",
        "body": "Moody Gardens advertises free parking for the season. The resort hotel offers separately priced rooms and packages, while other Galveston lodging may be more practical for travelers visiting multiple island neighborhoods."
      }
    ],
    relatedLinks: [
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
        "label": "Moody Gardens daily operating calendar",
        "url": "https://www.moodygardens.com/visitor-info/hours"
      },
      {
        "label": "Moody Gardens 2026 details and Holiday Pass",
        "url": "https://www.moodygardens.com/holiday-season/things-to-do"
      }
    ],
    "dateNote": "Moody Gardens confirms Holiday in the Gardens November 21, 2026–January 2, 2027. The current daily calendar lists the mile-long Holiday Lights Trail from 5:30 to 10 p.m. A Holiday Pass is valid after 4 p.m., with skate rentals extra; specific shows and attractions may use their own daily schedules."
  },
  {
    slug: "grapevine-north-pole-express",
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
    "sourceCheckedAt": "2026-11-21",
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
        "value": "Check-in begins 20 minutes before departure; arrive more than an hour early for parking and activities"
      }
    ],
    planningSections: [
      {
        title: "Buy the precise boarding time from Grapevine's approved ticketing",
        "body": "Use Grapevine's official railroad or Christmas ticketing links rather than unverified resellers. The city says everyone age two and older needs a ticket, benches normally seat two and prices vary by departure; its published September 2026 guide quoted roughly $45–$50 per passenger. Verify the actual date, price and boarding station in checkout. A generic Main Street event page is not proof of a seat."
      },
      {
        title: "December 3 has a different departure station",
        "body": "The organizer's current date-by-date 2026 schedule explicitly lists December 3 departures from Historic Stockyards Station in Fort Worth at 1:30, 3:00, 4:30, 6:00 and 7:30 p.m.—not from Grapevine. An earlier September announcement described December 3 as a no-service date for the regular Grapevine operation; the detailed dated schedule is the more specific guidance for these Fort Worth departures. Check the station on your purchased ticket before traveling."
      },
      {
        title: "Do not book for Christmas Eve or Christmas Day",
        "body": "The 2026 schedule skips December 24–25, with final departures December 26–30. December 6 has no 6:30 p.m. boarding, December 8 lists daytime sessions only through 2:30 p.m., December 10 and 17 have a final 4 p.m. boarding, and December 26 starts at 2 p.m. Confirm the exact date and time in official checkout."
      },
      {
        title: "Arrive earlier than the boarding time",
        "body": "Times on the official schedule are boarding times. The operator recommends arriving more than an hour early for parking, ticket collection and Christmas Market activities. Check-in begins 20 minutes before departure, and doors close five minutes before departure. Late guests cannot board."
      },
      {
        title: "Compare with The Polar Express before buying",
        "body": "Texas has distinct holiday railroad products with different operators and departure depots. The North Pole Express is Grapevine's themed train; the licensed Polar Express rides in Galveston and Palestine are not interchangeable tickets."
      },
      {
        title: "Combine the train with downtown Grapevine carefully",
        "body": "Choose one train departure as the fixed anchor. Historic Main Street decorations and free-to-walk surroundings can extend the visit, but holiday closures, weather and crowds affect parking and restaurant plans."
      },
      {
        title: "Know inclusions and extras",
        "body": "The organizer describes singalongs, Santa and Mrs. Claus, a cookie and chocolate snow milk served in a souvenir mug. It also lists one 4-by-6-inch Santa photo per family at the Grapevine Christmas Market General Store, before or after the ride; extra photos cost separately. Confirm the inclusions for your selected station and ticket."
      }
    ],
    relatedLinks: [
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
        "label": "Grapevine 2026 North Pole Express ticket announcement and age/bench rules",
        "url": "https://www.grapevinetexasusa.com/articles/post/christmas-tickets-on-sale-oct-1/"
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
    slug: "dallas-zoo-lights",
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
    "sourceCheckedAt": "2026-11-21",
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
    planningSections: [
      {
        title: "Use the dated Zoo Lights calendar, not the continuous range",
        "body": "Use the public-night calendar instead of treating the seasonal range as continuous. December 1 is a separate members-only event, and December 24–25 are closed. The November 17 sensory-friendly event is already past, not a general-public operating night. For a future sensory-friendly visit, ask the Zoo about any additional sessions rather than assuming another date."
      },
      {
        title: "Understand the evening ticket",
        "body": "Evening admission starts at $19. Dual through Passport members receive a 20% discount, and Patron and higher members receive free evening admission. For an extra $10 on an eligible Lights ticket, the Combo allows entry from 2:30 p.m.; visit Wilds of Africa first because that area closes at 5 p.m. A regular daytime ticket is not enough for the evening. Combo guests can use their issued re-entry sticker if they leave and return. Tickets are nonrefundable; contact Guest Services at 469-554-7501 about date exchanges."
      },
      {
        title: "Animals generally are not part of the evening visit",
        "body": "The operator says most animals are resting before the lights begin. The walk-through area uses Main Entrance, ZooNorth and the tunnel; don't market Zoo Lights as a nighttime animal safari."
      },
      {
        title: "Plan parking or the DART Red Line",
        "body": "Public parking is $15 and separate from admission; Dallas Zoo members park free. A single parking purchase covers both portions of a Combo visit. Reserve parking ahead on high-demand nights or consider the DART Red Line; check the evening return timetable. Arrive near the time printed on your ticket rather than assuming unrestricted entry."
      },
      {
        title: "Compare timed add-on extras separately",
        "body": "An igloo is an optional reservation, not an admission ticket: the Zoo lists a basic public rental at $200 for up to six guests, with 90-minute slots from 5:30–7 p.m. or 7:30–9 p.m. Food packages cost extra unless specifically included. Compare the total cost of admission plus the rental before booking, and do not reserve an igloo that overlaps your arrival window."
      },
      {
        title: "Check group mobility and outdoor weather",
        "body": "Use the Zoo's digital map to plan a walk within the main entrance, ZooNorth and tunnel areas. The Comfort Station in Guest Services remains open during Lights. The event generally proceeds in rain; severe weather updates go to ticket holders by email. Check current accessibility and stroller guidance separately before traveling."
      },
      {
        title: "Build a Dallas holiday afternoon",
        "body": "A daytime city stop or an earlier zoo visit can pair with the evening lights, but choose one neighborhood and avoid trying to reach another major DFW holiday attraction across rush-hour traffic."
      }
    ],
    relatedLinks: [
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
        "label": "Dallas Zoo holiday attraction details, admission and re-entry FAQ",
        "url": "https://www.dallaszoo.com/zoo-lights/"
      },
      {
        "label": "Dallas Zoo parking and general guest information",
        "url": "https://www.dallaszoo.com/plan-your-visit/general-information/"
      }
    ],
    "dateNote": "The official Dallas Zoo 2026–27 calendar lists select evenings November 13–January 3, 5:30–9 p.m. General admission begins at $19 and public parking is $15; December 24 and 25 are CLOSED. Do not treat the broad seasonal range as daily operation or mistake daytime zoo tickets for evening admission.",
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
  },
  {
    slug: "christmas-in-gusherville",
    name: "Christmas in Gusherville — Gladewater Holiday Open House",
    city: "Gladewater",
    countySlug: "gregg",
    countyName: "Gregg and Upshur counties",
    region: "piney-woods",
    category: "seasonal",
    startDate: "2026-11-14",
    endDate: "2026-11-14",
    venue: "Historic Downtown Gladewater, Texas",
    officialUrl: "https://gladewaterchamber.org/",
    sourceCheckedAt: "2026-11-22",
    seoTitle: "Christmas in Gusherville: Gladewater Holiday Open House & Visitor Guide",
    seoDescription: "Explore Gladewater's annual Christmas in Gusherville downtown holiday open house, 2026 event highlights, tree lighting, and how to check future dates.",
    whyItMatters: "Christmas in Gusherville is Gladewater's small-town kickoff to the holiday season. The Chamber of Commerce and historic downtown businesses put the oil-boom town's walkable antique district at the center of an evening of carolers, carriage rides, shopping, hot chocolate and a public Christmas tree lighting. Gladewater spans Gregg and Upshur counties, so the celebration belongs in both county itineraries. The November 14, 2026 edition has ended; no 2027 date is yet confirmed.",
    quickFacts: [
      { label: "Last confirmed edition", value: "Saturday, November 14, 2026; 4–7:30 p.m." },
      { label: "2026 tree lighting", value: "6 p.m. (past edition, not a 2027 schedule)" },
      { label: "Host", value: "Gladewater Chamber of Commerce and downtown merchants" },
      { label: "Setting", value: "Historic Downtown Gladewater, across Gregg and Upshur counties" },
      { label: "Next annual edition", value: "Date and program not yet announced; verify with the Chamber" },
    ],
    planningSections: [
      { title: "What happened in 2026 — and what is not yet announced", body: "The Gladewater Mirror's November 11, 2026 local calendar confirmed the Saturday, November 14 evening from 4 to 7:30 p.m., with the community tree lighting scheduled for 6 p.m. That date has passed. The event is annual, but neither the exact 2027 Saturday nor next year's hours, rides or lighting program should be assumed from 2026. Check the Gladewater Chamber of Commerce before setting travel plans." },
      { title: "Explore downtown instead of arriving only for the tree", body: "Make historic downtown the centerpiece of the visit. Browse Gladewater's antique shops and small businesses, then allow time for the evening decorations, carolers and community gathering. Individual shops may operate different hours, so check the participating merchants and any street-closure map the Chamber publishes for the next edition." },
      { title: "Carriage rides, carolers and hot chocolate are edition-specific", body: "The 2026 program included carriage rides, Christmas carolers and free hot chocolate. These are features of the verified past edition, not guarantees of identical programming in a future year. Ask the Chamber whether there are ride queues, restrictions, fees, accessibility options or bad-weather changes before a future visit." },
      { title: "Plan the tree lighting and after-dark family visit", body: "In 2026 the downtown tree lighting was scheduled for 6 p.m. Within the 4–7:30 p.m. evening window, a family could walk the shops before the lighting, then enjoy the decorated streets afterward. Keep children near you along busy downtown streets, use marked crossings and confirm lighting time and any accessible viewing options from the organizer each season." },
      { title: "Choose a sensible parking plan", body: "The event occupies Gladewater's historic downtown rather than an outlying fairground. Use signed public parking and the current city or Chamber notice for any temporary street closures; do not assume curb parking is available beside the tree or carriage staging area. The specific 2027 parking and closure plan has not yet been released." },
      { title: "Pair the holiday visit with Gladewater history", body: "Gladewater grew first around the railroad and later with the East Texas oil boom. A daytime stop at the Gladewater Museum, if open, or a downtown walk through its antique district adds local context before the holiday gathering. Museum hours and seasonal opening days should be confirmed independently." },
      { title: "Remember Gladewater has two county connections", body: "Gladewater crosses the Gregg–Upshur county line. The city and its downtown celebration are relevant to visitors researching Longview and Kilgore to the southeast as well as Gilmer and Upshur County to the north. Use the two county guides for nearby destinations rather than duplicating the same Christmas event under separate names." },
      { title: "Follow the organizer for the next edition", body: "The Gladewater Chamber of Commerce is the first place to look for a newly announced date, participants, schedules or weather advisories. The 2026 local newspaper preview is retained below as a historical occurrence source. TexasDefined should publish an upcoming calendar record only after a current-year organizer or equally reliable dated announcement verifies it." },
    ],
    relatedLinks: [
      { href: "/county/gregg", label: "Gregg County visitor guide", description: "Explore Gladewater, Longview and Kilgore's oil and railroad heritage" },
      { href: "/county/upshur", label: "Upshur County visitor guide", description: "Plan Gladewater and Gilmer stops across the county boundary" },
      { href: "/events/christmas-events", label: "Texas Christmas and holiday events", description: "Browse verified holiday celebrations and current schedules" },
      { href: "/events/november-events", label: "November events in Texas", description: "Find the season's early holiday markets and festivals" },
    ],
    sources: [
      { label: "Gladewater Chamber of Commerce — official event organizer", url: "https://gladewaterchamber.org/" },
      { label: "Gladewater Mirror — November 11, 2026 holiday open house program and hours", url: "https://www.gladewatermirror.com/event-season-starts-saturday-with-slew-of-local-activities" },
      { label: "Gladewater Mirror — 2025 annual Holiday Open House organizer and prior edition", url: "https://www.gladewatermirror.com/holiday-happenings-arrive-downtown-soon-after-octobers-festivities" },
    ],
    dateNote: "The November 14, 2026 event has concluded. This is a permanent historical/annual planning guide, not an announcement of a 2027 date.",
  }
];

const bySlug = new Map(records.map((event) => [event.slug, event] as const));

export function getExpandedMajorEventAuthorityTranche59Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
