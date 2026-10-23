import type { TexasEventRecord } from "./texas-event-record";

/**
 * First-party-verified community Christmas occurrences for 2026–27.
 * A supplied candidate is not a calendar occurrence until its organizer
 * provides the exact operating date(s). No speculative dates or affiliate
 * ticket links are introduced here. Split non-contiguous runs into windows
 * so the shared day-by-day calendar does not invent open nights.
 *
 * Sources were reviewed October 23, 2026. The 250-item intake remains a
 * research backlog; these records are the source-qualified first wave.
 */
const verifiedOccurrences: ReadonlyArray<Pick<TexasEventRecord,
  "slug" | "title" | "summary" | "city" | "countySlug" | "countyName" |
  "region" | "startDate" | "endDate" | "venueName" | "officialEventUrl" | "sourceName"
>> = [
  {
    "slug": "el-paso-winterfest-lights",
    "title": "El Paso WinterFest · downtown lights and holiday attractions",
    "city": "El Paso",
    "region": "big-bend",
    "countySlug": "el-paso",
    "countyName": "El Paso County",
    "startDate": "2026-11-21",
    "endDate": "2027-01-03",
    "venueName": "San Jacinto Plaza and downtown El Paso",
    "officialEventUrl": "https://www.epwinterfest.com/about",
    "sourceName": "El Paso WinterFest / City of El Paso",
    "summary": "The city's downtown WinterFest runs November 21, 2026–January 3, 2027. San Jacinto Plaza lights shine nightly during the festival season; market, skating, parade and entertainment schedules are separate. Recheck the official event calendar before booking activities."
  },
  {
    "slug": "el-paso-winterfest-kickoff",
    "title": "El Paso WinterFest kickoff and lights parade",
    "city": "El Paso",
    "region": "big-bend",
    "countySlug": "el-paso",
    "countyName": "El Paso County",
    "startDate": "2026-11-21",
    "venueName": "Downtown El Paso · San Jacinto Plaza",
    "officialEventUrl": "https://www.epwinterfest.com/",
    "sourceName": "El Paso WinterFest organizer",
    "summary": "WinterFest launches November 21 with the Scherr Legate Lights Parade at 6 p.m. The wider season continues afterward; confirm individual attraction dates on the organizer calendar."
  },
  {
    "slug": "fort-worth-parade-of-lights",
    "title": "GM Financial Parade of Lights",
    "city": "Fort Worth",
    "region": "prairies-lakes",
    "countySlug": "tarrant",
    "countyName": "Tarrant County",
    "startDate": "2026-11-22",
    "venueName": "Downtown Fort Worth",
    "officialEventUrl": "https://www.fortworthparadeoflights.org/",
    "sourceName": "Downtown Fort Worth Initiatives",
    "summary": "Downtown Fort Worth's illuminated parade begins at 6 p.m. November 22. Street closures start earlier; reserved viewing seats are a separate paid option."
  },
  {
    "slug": "cuero-christmas-in-the-park",
    "title": "Cuero's Christmas in the Park",
    "city": "Cuero",
    "region": "gulf-coast",
    "countySlug": "dewitt",
    "countyName": "DeWitt County",
    "startDate": "2026-11-23",
    "venueName": "Cuero Municipal Park",
    "officialEventUrl": "https://www.cuerochristmasinthepark.org/",
    "sourceName": "Cuero Christmas in the Park organizer",
    "summary": "Free, drive-through light displays open nightly 6–10 p.m. from the Monday before Thanksgiving through New Year's Day; visitors stay in their vehicles.",
    "endDate": "2027-01-01"
  },
  {
    "slug": "fredericksburg-nights-of-lights-opening",
    "title": "Fredericksburg Christmas Nights of Lights · opening nights",
    "city": "Fredericksburg",
    "region": "hill-country",
    "countySlug": "gillespie",
    "countyName": "Gillespie County",
    "startDate": "2026-11-24",
    "venueName": "Marktplatz",
    "officialEventUrl": "https://www.visitfredericksburgtx.com/events/major-events-festivals/holiday-lights/",
    "sourceName": "Visit Fredericksburg",
    "summary": "The Christmas Pyramid and Community Christmas Tree light up at Marktplatz, with a 6 p.m. nightly countdown. This calendar window stops before the December 4 exception.",
    "endDate": "2026-12-03"
  },
  {
    "slug": "grand-prairie-prairie-lights",
    "title": "Prairie Lights at Lynn Creek Park",
    "city": "Grand Prairie",
    "region": "prairies-lakes",
    "countySlug": "dallas",
    "countyName": "Dallas County",
    "startDate": "2026-11-26",
    "venueName": "Lynn Creek Park · Joe Pool Lake",
    "officialEventUrl": "https://www.gptx.org/Community-Calendar/Prairie-Lights-2026",
    "sourceName": "City of Grand Prairie",
    "summary": "Drive-through light display open nightly from 6–10 p.m. November 26–December 31. Check the city link for current pricing and ticket options.",
    "endDate": "2026-12-31"
  },
  {
    "slug": "boerne-dickens-on-main",
    "title": "Boerne Dickens on Main",
    "city": "Boerne",
    "region": "hill-country",
    "countySlug": "kendall",
    "countyName": "Kendall County",
    "startDate": "2026-11-27",
    "venueName": "Historic Hill Country Mile",
    "officialEventUrl": "https://www.ci.boerne.tx.us/2490/Dickens-on-Main",
    "sourceName": "City of Boerne",
    "summary": "Historic downtown's November 27–28 celebration features music, street performances, children's crafts, holiday shops and seasonal festivities. Street closures affect parking.",
    "endDate": "2026-11-28"
  },
  {
    "slug": "johnson-city-lights-spectacular",
    "title": "Johnson City Lights Spectacular",
    "city": "Johnson City",
    "region": "hill-country",
    "countySlug": "blanco",
    "countyName": "Blanco County",
    "startDate": "2026-11-27",
    "venueName": "Historic courthouse square and PEC headquarters",
    "officialEventUrl": "https://lightsspectacular.com/faqs",
    "sourceName": "Johnson City Lights Spectacular organizer",
    "summary": "Free downtown courthouse and PEC light displays illuminate the season nightly from dusk until midnight. Holiday attractions and individual activities may have separate schedules.",
    "endDate": "2027-01-03"
  },
  {
    "slug": "mckinney-home-for-holidays",
    "title": "McKinney Home for the Holidays",
    "city": "McKinney",
    "region": "prairies-lakes",
    "countySlug": "collin",
    "countyName": "Collin County",
    "startDate": "2026-11-27",
    "venueName": "Historic Downtown McKinney",
    "officialEventUrl": "https://downtownmckinney.com/events/home-for-the-holidays",
    "sourceName": "McKinney Main Street",
    "summary": "Free Thanksgiving-weekend festival November 27–29 with downtown tree lighting, performers, small-business shopping and family attractions; paid activities vary.",
    "endDate": "2026-11-29"
  },
  {
    "slug": "wimberley-trail-of-lights",
    "title": "Wimberley Trail of Lights",
    "city": "Wimberley",
    "region": "hill-country",
    "countySlug": "hays",
    "countyName": "Hays County",
    "startDate": "2026-11-28",
    "venueName": "EmilyAnn Theatre & Gardens",
    "officialEventUrl": "https://emilyann.org/trailoflights",
    "sourceName": "EmilyAnn Theatre & Gardens",
    "summary": "A free, donation-supported walking trail November 28–December 26. December 24–25 are lights-only nights; hours, entertainment and parking directions vary by date.",
    "endDate": "2026-12-26"
  },
  {
    "slug": "marble-falls-walkway-of-lights",
    "title": "Marble Falls Walkway of Lights",
    "city": "Marble Falls",
    "region": "hill-country",
    "countySlug": "burnet",
    "countyName": "Burnet County",
    "startDate": "2026-11-29",
    "endDate": "2027-01-02",
    "venueName": "Lakeside Park & Beach",
    "officialEventUrl": "https://visitmarblefalls.org/christmas-season/",
    "sourceName": "Visit Marble Falls",
    "summary": "Visit Marble Falls lists the Walkway of Lights at Lakeside Park & Beach for November 29, 2026–January 2, 2027. Confirm individual viewing hours and weather procedures before visiting. The separate Light Up Parade is December 4."
  },
  {
    "slug": "grapevine-parade-of-lights-2026",
    "title": "Grapevine Parade of Lights",
    "city": "Grapevine",
    "region": "prairies-lakes",
    "countySlug": "tarrant",
    "countyName": "Tarrant County",
    "startDate": "2026-12-03",
    "venueName": "Historic Main Street",
    "officialEventUrl": "https://www.grapevinechamber.org/christmas-parade/",
    "sourceName": "Grapevine Chamber of Commerce",
    "summary": "The 47th annual Grapevine Parade of Lights runs Thursday, December 3 at 7 p.m. along Main Street. Check the parade route, traffic closures and parking guidance; this is a distinct scheduled parade inside Grapevine's broader Christmas Capital season."
  },
  {
    "slug": "san-marcos-sights-sounds-week1",
    "title": "San Marcos Sights & Sounds of Christmas · first weekend",
    "city": "San Marcos",
    "region": "hill-country",
    "countySlug": "hays",
    "countyName": "Hays County",
    "startDate": "2026-12-03",
    "venueName": "San Marcos City Park",
    "officialEventUrl": "https://sights-n-sounds.org/arrive/",
    "sourceName": "Sights & Sounds of Christmas organizer",
    "summary": "The first of two separately scheduled festival weekends, December 3–5, with carnival attractions and holiday entertainment. Visit the organizer for tickets and session details.",
    "endDate": "2026-12-05"
  },
  {
    "slug": "brenham-christmas-stroll-parade",
    "title": "Brenham Christmas Stroll and Lighted Parade · first weekend",
    "city": "Brenham",
    "region": "prairies-lakes",
    "countySlug": "washington",
    "countyName": "Washington County",
    "startDate": "2026-12-04",
    "venueName": "Downtown Brenham",
    "officialEventUrl": "https://jingle.cityofbrenham.org/",
    "sourceName": "City of Brenham",
    "summary": "December 4–5 shopping and markets culminate in the lighted downtown parade at 6 p.m. Saturday December 5; some Breakfast with Santa sessions require reservations.",
    "endDate": "2026-12-05"
  },
  {
    "slug": "georgetown-christmas-stroll",
    "title": "Georgetown Christmas Stroll",
    "city": "Georgetown",
    "region": "hill-country",
    "countySlug": "williamson",
    "countyName": "Williamson County",
    "startDate": "2026-12-04",
    "venueName": "Historic Downtown Georgetown Square",
    "officialEventUrl": "https://www.dgagtx.org/Christmas-Stroll-Guests",
    "sourceName": "Downtown Georgetown Association",
    "summary": "Free three-day December 4–6 Christmas Stroll around the square with a parade, marketplace and live entertainment; individual activities may differ by day.",
    "endDate": "2026-12-06"
  },
  {
    "slug": "fredericksburg-nights-of-lights-main",
    "title": "Fredericksburg Christmas Nights of Lights · December nights",
    "city": "Fredericksburg",
    "region": "hill-country",
    "countySlug": "gillespie",
    "countyName": "Gillespie County",
    "startDate": "2026-12-05",
    "venueName": "Marktplatz",
    "officialEventUrl": "https://www.visitfredericksburgtx.com/events/major-events-festivals/holiday-lights/",
    "sourceName": "Visit Fredericksburg",
    "summary": "Christmas Pyramid and tree-lighting countdown each evening at Marktplatz. December 4 and December 31 are exceptions, so they are excluded from this calendar window.",
    "endDate": "2026-12-30"
  },
  {
    "slug": "san-marcos-sights-sounds-week2",
    "title": "San Marcos Sights & Sounds of Christmas · second weekend",
    "city": "San Marcos",
    "region": "hill-country",
    "countySlug": "hays",
    "countyName": "Hays County",
    "startDate": "2026-12-10",
    "venueName": "San Marcos City Park",
    "officialEventUrl": "https://sights-n-sounds.org/arrive/",
    "sourceName": "Sights & Sounds of Christmas organizer",
    "summary": "The festival's second verified weekend runs December 10–12; separate from the December 3–5 dates. Consult official admission and carnival rules before booking.",
    "endDate": "2026-12-12"
  },
  {
    "slug": "brenham-cold-nights-holiday-tunes-2026",
    "title": "Brenham Cold Nights, Holiday Tunes",
    "city": "Brenham",
    "region": "prairies-lakes",
    "countySlug": "washington",
    "countyName": "Washington County",
    "startDate": "2026-12-11",
    "venueName": "Downtown Brenham",
    "officialEventUrl": "https://jingle.cityofbrenham.org/",
    "sourceName": "City of Brenham",
    "summary": "Friday, December 11 at 7 p.m. is the free Cold Nights, Holiday Tunes outdoor concert in Commerce Street Parking Lot E. The official organizer does not publish a second December 12 date for this performance; the December 4–5 Christmas Stroll and parade are separate."
  },
  {
    "slug": "fredericksburg-nights-of-lights-final",
    "title": "Fredericksburg Christmas Nights of Lights · final nights",
    "city": "Fredericksburg",
    "region": "hill-country",
    "countySlug": "gillespie",
    "countyName": "Gillespie County",
    "startDate": "2027-01-01",
    "venueName": "Marktplatz",
    "officialEventUrl": "https://www.visitfredericksburgtx.com/events/major-events-festivals/holiday-lights/",
    "sourceName": "Visit Fredericksburg",
    "summary": "The final five January evenings of the 2026–27 Marktplatz lighting program; December 31 is omitted because the special New Year's Eve event replaces the regular countdown.",
    "endDate": "2027-01-05"
  }
];

function texasTodayIso(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function getVerifiedChristmasCommunityEvents2026(now = new Date()): TexasEventRecord[] {
  const today = texasTodayIso(now);
  return verifiedOccurrences
    .filter((occurrence) => (occurrence.endDate ?? occurrence.startDate) >= today)
    .map((occurrence) => ({
      ...occurrence,
      id: `christmas-community:${occurrence.slug}:${occurrence.startDate}`,
      guidePath: `/events/christmas-events#christmas-community-${occurrence.slug}`,
      category: "seasonal" as const,
      status: "scheduled" as const,
      lastVerifiedAt: "2026-10-23",
      lastUpdatedAt: "2026-10-23",
    }))
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title));
}
