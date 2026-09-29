import type { TexasEvent, TexasRegion } from "./types";

export interface TemporalEventDirectoryItem {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  detail: string;
  startDate: string;
  endDate?: string;
  sourceCheckedAt?: string;
}

export interface TemporalEventCollectionDefinition {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  lead: string;
  planningTitle: string;
  planningIntro: string;
  planningPoints: [string, string, string];
  relatedPaths: string[];
  minimumIndexableItems: number;
  indexPolicy: "always-noindex" | "qualified";
  filterKind: "this-weekend" | "this-month" | "month" | "fall" | "christmas" | "county-fairs" | "houston-area" | "dfw-area" | "austin-area" | "san-antonio-area" | "houston-weekend" | "dfw-weekend" | "austin-weekend" | "san-antonio-weekend";
  month?: number;
}

export interface ResolvedTemporalEventCollection extends TemporalEventCollectionDefinition {
  title: string;
  description: string;
  lead: string;
  dateContext: string;
  items: TemporalEventDirectoryItem[];
  shouldIndex: boolean;
  indexabilityNote: string;
}

const temporalCollections: TemporalEventCollectionDefinition[] = [
  {
    slug: "this-weekend",
    path: "/events/this-weekend",
    title: "Things to Do in Texas This Weekend",
    eyebrow: "Texas This Weekend",
    description: "Find source-verified things to do in Texas this weekend, with permanent event guides, official sources and practical trip-planning links.",
    lead: "Texas This Weekend is a rolling Friday-through-Sunday guide built from Texas Defined's source-checked event authority catalog rather than a dump of one-line listings. Every recommendation links to a permanent guide with the organizer source, date context and nearby trip-planning paths.",
    planningTitle: "Pick one anchor event, then build the weekend around it",
    planningIntro: "A statewide weekend list can make destinations look closer together than they are. Choose the event first, then use its city, county and regional links to keep the rest of the trip geographically realistic.",
    planningPoints: [
      "Open the permanent event guide and recheck the official organizer before leaving; operating hours, tickets, road closures and weather procedures can still change.",
      "Use the host city and county as the planning radius instead of stacking unrelated events from opposite sides of Texas into one itinerary.",
      "This permanent weekend URL rolls forward automatically. It is indexable only when at least four source-verified event guides qualify for the current Friday-through-Sunday window.",
    ],
    relatedPaths: ["/events/houston-this-weekend", "/events/dallas-this-weekend", "/events/austin-this-weekend", "/events/san-antonio-this-weekend", "/events/this-month", "/events/fall-festivals"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "this-weekend",
  },
  {
    slug: "this-month",
    path: "/events/this-month",
    title: "Texas Events This Month",
    eyebrow: "Current month",
    description: "Browse source-verified Texas events happening this month, including festivals, fairs, rodeos, music, food, culture and seasonal traditions.",
    lead: "This rolling monthly guide only includes first-class event records with a current verified occurrence. It is a discovery layer over permanent event pages, not a replacement for the organizer's day-by-day operating schedule.",
    planningTitle: "Use the month view to compare weekends, then narrow by place",
    planningIntro: "The most useful comparison is usually not which event is biggest, but which event fits the region, drive time and kind of trip you want.",
    planningPoints: [
      "Compare date windows first, then open the event guide for the exact city, county, venue and current source check.",
      "For multi-day fairs and festivals, choose the specific performance, parade, competition or operating day before booking lodging.",
      "This rolling month view stays noindex so search engines are directed toward permanent event guides and durable seasonal or regional landing pages.",
    ],
    relatedPaths: ["/events/this-weekend", "/events/rodeos", "/events/arts-culture"],
    minimumIndexableItems: 6,
    indexPolicy: "always-noindex",
    filterKind: "this-month",
  },
  {
    slug: "september-events",
    path: "/events/september-events",
    title: "September Events in Texas",
    eyebrow: "September calendar",
    description: "Plan September events in Texas with verified dates for fairs, rodeos, Oktoberfests, music, food and community festivals across the state.",
    lead: "September is one of Texas's busiest event months, with county fairs, rodeos, Oktoberfests, music weekends and the opening of major fall traditions. This page rolls to the next September planning season without creating a new thin year URL every twelve months.",
    planningTitle: "Treat September as the start of Texas fall-event season",
    planningIntro: "Heat can still be significant, while school calendars and football weekends affect travel demand. Use the event's own guide for exact operating details and the surrounding destination links for the rest of the trip.",
    planningPoints: [
      "Use the verified date window shown on the permanent guide; do not assume an annual event repeats on the same weekend next year.",
      "For outdoor fairs and downtown festivals, plan around afternoon heat, shade, hydration and the organizer's weather policy.",
      "When next September is not yet source-rich enough, the stable page remains available but is automatically withheld from indexing until verified inventory catches up.",
    ],
    relatedPaths: ["/events/fall-festivals", "/events/county-fairs", "/events/rodeos"],
    minimumIndexableItems: 6,
    indexPolicy: "qualified",
    filterKind: "month",
    month: 9,
  },
  {
    slug: "october-events",
    path: "/events/october-events",
    title: "October Events in Texas",
    eyebrow: "October calendar",
    description: "Plan October events in Texas with verified dates for fairs, festivals, Oktoberfests, music, food, heritage and fall traditions.",
    lead: "October is one of the strongest Texas event months, spanning the State Fair season, Oktoberfests, heritage weekends, food festivals and cooler-weather outdoor traditions. This stable page advances to the next October after the month passes and only opens to indexing when enough source-verified event guides qualify.",
    planningTitle: "Build an October weekend around one region",
    planningIntro: "Texas event density is high in October, but the state is too large to treat the month as one compact itinerary. Start with one anchor event, then use city, county and nearby-destination links to keep the weekend realistic.",
    planningPoints: [
      "Use the verified date window on each permanent guide and recheck the organizer before travel; annual traditions do not always repeat on the same weekend.",
      "Expect popular fair, Hill Country and metro weekends to tighten lodging and parking earlier than an ordinary October weekend.",
      "If the next October inventory is not yet source-rich enough, this stable URL remains useful to readers but is automatically withheld from indexing.",
    ],
    relatedPaths: ["/events/fall-festivals", "/events/food-festivals", "/events/county-fairs"],
    minimumIndexableItems: 6,
    indexPolicy: "qualified",
    filterKind: "month",
    month: 10,
  },
  {
    slug: "november-events",
    path: "/events/november-events",
    title: "November Events in Texas",
    eyebrow: "November calendar",
    description: "Plan November events in Texas with verified dates for festivals, food weekends, heritage events, races, fairs and early holiday traditions.",
    lead: "November bridges Texas fall-festival season and the first major holiday events. This stable discovery page rolls to the next November automatically and stays indexable only while the verified event inventory is deep enough to satisfy the search intent.",
    planningTitle: "Use November weather and geography to your advantage",
    planningIntro: "Cooler temperatures make longer outdoor days easier, but holiday openings and major event weekends can still create sharp demand in individual towns and metro districts.",
    planningPoints: [
      "Confirm event-day operating hours and weather procedures directly with the organizer close to departure.",
      "Pair a festival or race with nearby food, museum, park or small-town coverage instead of crossing the state for a second unrelated event.",
      "The page automatically noindexes when the next November has too few verified guides, preventing a thin seasonal page from lingering in search.",
    ],
    relatedPaths: ["/events/fall-festivals", "/events/christmas-events", "/events/arts-culture"],
    minimumIndexableItems: 6,
    indexPolicy: "qualified",
    filterKind: "month",
    month: 11,
  },
  {
    slug: "december-events",
    path: "/events/december-events",
    title: "December Events in Texas",
    eyebrow: "December calendar",
    description: "Plan December events in Texas with verified dates for holiday lights, parades, markets, performances, festivals and winter traditions.",
    lead: "December event planning in Texas is dominated by holiday traditions, downtown parades, light displays, markets and limited-run performances. This stable page advances annually and only surfaces occurrences backed by the event authority catalog.",
    planningTitle: "Separate the holiday tradition from the operating schedule",
    planningIntro: "Many December events run on selected nights rather than every day. Open the permanent guide, then use the organizer schedule as the final authority for the exact night you plan to attend.",
    planningPoints: [
      "Check whether the attraction is a single-night parade, a weekend market or a multi-week display before choosing travel dates.",
      "Build an indoor backup option into outdoor holiday trips because rain, wind or cold fronts can alter programs.",
      "The page remains crawl-safe by automatically withholding itself from indexing whenever the next December inventory falls below the verified-guide threshold.",
    ],
    relatedPaths: ["/events/christmas-events", "/events/seasonal-events", "/events/arts-culture"],
    minimumIndexableItems: 6,
    indexPolicy: "qualified",
    filterKind: "month",
    month: 12,
  },
  {
    slug: "fall-festivals",
    path: "/events/fall-festivals",
    title: "Texas Fall Festivals",
    eyebrow: "Fall festival season",
    description: "Find source-verified Texas fall festivals from September through November, including food, music, heritage, fairs and seasonal celebrations.",
    lead: "Texas fall-event season stretches from September fairgrounds and Oktoberfests into October heritage weekends and November food and cultural traditions. This finite seasonal page rolls forward annually and only surfaces events whose occurrence is backed by the authority catalog.",
    planningTitle: "Choose the region before you choose the second festival",
    planningIntro: "Fall brings strong event density across Texas, but a statewide calendar can hide long distances. Build around one anchor festival and add nearby destinations in the same corridor.",
    planningPoints: [
      "Use September through November as the discovery window, then verify the event's exact operating dates on its permanent guide.",
      "Reserve earlier for major Hill Country, DFW, Austin, San Antonio and Gulf Coast weekends where event demand can tighten lodging across a wider area.",
      "Pair festivals with city, county, food, museum and history coverage so the trip remains worthwhile even if weather changes outdoor programming.",
    ],
    relatedPaths: ["/events/september-events", "/events/food-festivals", "/events/seasonal-events"],
    minimumIndexableItems: 6,
    indexPolicy: "qualified",
    filterKind: "fall",
  },
  {
    slug: "christmas-events",
    path: "/events/christmas-events",
    title: "Texas Christmas & Holiday Events",
    eyebrow: "Holiday event calendar",
    description: "Plan verified Texas Christmas and holiday events, parades, markets and seasonal traditions with official-source dates and permanent guides.",
    lead: "Holiday events are especially vulnerable to stale search results because parade routes, opening nights and ticket rules change every year. Texas Defined keeps a stable holiday discovery page but only includes named holiday traditions with a source-checked occurrence.",
    planningTitle: "Separate the annual tradition from this season's schedule",
    planningIntro: "A familiar event name does not make last year's date current. Use the permanent guide and organizer source for the season shown, especially for parades, markets and limited-run performances.",
    planningPoints: [
      "Confirm the exact night or weekend before booking; holiday programs often have discontinuous operating dates or separate ticketed components.",
      "Check parking, road closures and weather procedures close to departure because many holiday traditions use downtown streets and outdoor public spaces.",
      "Use nearby destination, museum and food links to build an indoor backup plan for cold fronts or rain.",
    ],
    relatedPaths: ["/events/seasonal-events", "/events/this-month", "/events/arts-culture"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "christmas",
  },
  {
    slug: "county-fairs",
    path: "/events/county-fairs",
    title: "Texas County Fairs & Fairgrounds Events",
    eyebrow: "County fair calendar",
    description: "Browse verified Texas county fairs and fairground traditions with current dates, official sources, rodeo links and county trip-planning context.",
    lead: "County fairs are among Texas's most durable recurring community events, but schedules can combine livestock shows, rodeos, carnivals, parades and food competitions across different days. This page only surfaces permanent guides that clearly identify a fair occurrence.",
    planningTitle: "Choose the fair day by the activity you actually want",
    planningIntro: "A ten-day fair window may include only a few rodeo nights, livestock competitions or parade times. Use the organizer schedule as the operating document after choosing the event guide here.",
    planningPoints: [
      "Identify the rodeo, livestock, carnival, concert or parade day before planning arrival time and admission.",
      "Use the linked county guide to add nearby stops instead of treating a fairground visit as an isolated drive.",
      "Recheck parking, gate hours, cashless-payment rules, bag policies and weather procedures directly with the fair before travel.",
    ],
    relatedPaths: ["/events/rodeos", "/events/fall-festivals", "/events/food-festivals"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "county-fairs",
  },
  {
    slug: "houston-area-events",
    path: "/events/houston-area-events",
    title: "Houston-Area Events & Festivals",
    eyebrow: "Greater Houston calendar",
    description: "Find verified Houston-area events, festivals, rodeos, fairs and cultural weekends across Harris, Fort Bend, Montgomery and Brazoria counties.",
    lead: "Greater Houston event travel works best when the exact venue and county come first. This collection keeps the metro scope finite and source-qualified while connecting major Houston events with nearby county fairs, arts weekends and Gulf Coast traditions.",
    planningTitle: "Plan Houston by venue and side of town",
    planningIntro: "A Houston-area label can hide an hour or more of driving. Choose lodging and other stops around the actual venue rather than around a generic central point on the metro map.",
    planningPoints: [
      "Use the event guide's venue, city and county before choosing a hotel or assuming downtown is the best base.",
      "For NRG Park, downtown, fairgrounds and suburban events, use the organizer or venue's current parking and transit guidance instead of a metro-wide rule of thumb.",
      "Connect the event to nearby food, museums, attractions and county pages so the trip stays geographically compact.",
    ],
    relatedPaths: ["/events/gulf-coast-events", "/events/rodeos", "/events/arts-culture"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "houston-area",
  },
  {
    slug: "dallas-fort-worth-events",
    path: "/events/dallas-fort-worth-events",
    title: "Dallas-Fort Worth Events & Festivals",
    eyebrow: "DFW event calendar",
    description: "Plan verified Dallas-Fort Worth events, fairs, festivals, rodeos, races and cultural weekends across the core North Texas counties.",
    lead: "DFW has enough major recurring events to deserve a metro-specific discovery layer, but Dallas, Fort Worth, Arlington, Grapevine, McKinney, Denton and Waxahachie are not interchangeable locations. This page keeps the metro grouping useful while preserving city and county context on every guide.",
    planningTitle: "Use the host city, not just the DFW label",
    planningIntro: "Metro-wide discovery is useful for comparison; trip planning should narrow immediately to the event's actual city, venue and transportation pattern.",
    planningPoints: [
      "Choose the event first, then use its Dallas, Tarrant, Collin, Denton, Ellis or Rockwall County context to keep the itinerary compact.",
      "Check municipal street closures for downtown festivals and venue-specific parking or rail options for fairgrounds, stadiums and arenas.",
      "Use nearby museums, food, attractions and city guides as the second layer instead of crossing the entire metro between unrelated stops.",
    ],
    relatedPaths: ["/events/north-texas-events", "/events/county-fairs", "/events/food-festivals"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "dfw-area",
  },
  {
    slug: "austin-area-events",
    path: "/events/austin-area-events",
    title: "Austin-Area Events & Festivals",
    eyebrow: "Greater Austin calendar",
    description: "Find verified Austin-area events, festivals, races, music weekends and cultural events across Travis, Williamson, Hays and Bastrop counties.",
    lead: "Austin event planning is easiest when the actual venue and corridor come first. This collection groups source-verified events across the central metro without pretending that downtown Austin, Round Rock, Dripping Springs and Bastrop are the same trip.",
    planningTitle: "Plan Austin by venue and corridor",
    planningIntro: "Choose the event first, then keep lodging, food and other stops close to the actual venue rather than using a generic downtown starting point.",
    planningPoints: [
      "Use the event guide's city, county and venue before choosing lodging or parking.",
      "For large downtown, campus and circuit weekends, recheck the organizer or venue for closures, shuttles and entry rules.",
      "Use nearby county, food, park and destination links to turn the event into a geographically compact trip.",
    ],
    relatedPaths: ["/events/austin-this-weekend", "/events/hill-country-events", "/events/music-festivals"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "austin-area",
  },
  {
    slug: "san-antonio-area-events",
    path: "/events/san-antonio-area-events",
    title: "San Antonio-Area Events & Festivals",
    eyebrow: "San Antonio calendar",
    description: "Find verified San Antonio-area festivals, rodeos, cultural events and weekend traditions across Bexar, Comal, Guadalupe and Kendall counties.",
    lead: "San Antonio-area event travel spans downtown, the fairgrounds, New Braunfels, Boerne and other nearby communities with very different parking and lodging patterns. This collection keeps the discovery broad while preserving the host city and county on every permanent guide.",
    planningTitle: "Use the host community as the trip anchor",
    planningIntro: "A regional label is useful for discovery, but event-day logistics should narrow immediately to the actual venue and host community.",
    planningPoints: [
      "Confirm the exact venue and event-day transportation plan before booking around a generic central San Antonio location.",
      "Use county and nearby-town links to add missions, food, parks and heritage stops that fit the same corridor.",
      "Recheck outdoor event weather and operating details close to departure, especially during spring festival and rodeo seasons.",
    ],
    relatedPaths: ["/events/san-antonio-this-weekend", "/events/south-texas-events", "/events/hill-country-events"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "san-antonio-area",
  },
  {
    slug: "houston-this-weekend",
    path: "/events/houston-this-weekend",
    title: "Things to Do in Houston This Weekend",
    eyebrow: "Houston this weekend",
    description: "Find source-verified Houston events this weekend across Harris, Fort Bend, Montgomery and Brazoria counties, with permanent guides and official sources.",
    lead: "This rolling Houston weekend guide only includes events with a verified occurrence and a permanent Texas Defined planning page. It is designed for a real Friday-through-Sunday decision: choose the event, confirm the venue, then keep the rest of the itinerary on the same side of the metro when possible.",
    planningTitle: "Choose the event before crossing Houston",
    planningIntro: "Greater Houston distances are large enough that two events with the same metro label can belong to completely different day plans.",
    planningPoints: [
      "Start with the actual venue and county, then choose lodging, food and attractions nearby.",
      "Recheck parking, transit, gate hours and weather procedures directly with the organizer before leaving.",
      "This URL rolls forward every week and is only indexable when at least four verified Houston-area guides qualify for the current weekend.",
    ],
    relatedPaths: ["/events/houston-area-events", "/events/this-weekend", "/events/gulf-coast-events"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "houston-weekend",
  },
  {
    slug: "dallas-this-weekend",
    path: "/events/dallas-this-weekend",
    title: "Things to Do in Dallas-Fort Worth This Weekend",
    eyebrow: "DFW this weekend",
    description: "Find source-verified Dallas-Fort Worth events this weekend across the core North Texas counties, with permanent guides and official sources.",
    lead: "This rolling DFW weekend guide compares verified events across Dallas, Fort Worth, Arlington and surrounding core counties while keeping the host city visible. It avoids treating the Metroplex as one interchangeable location.",
    planningTitle: "Narrow the Metroplex before building the day",
    planningIntro: "Choose the event and host city first; then use nearby venue, food and attraction links instead of stacking unrelated stops across the entire region.",
    planningPoints: [
      "Check the host city, venue and parking or rail plan before deciding where to stay.",
      "Use permanent event guides for current date context and official organizer links rather than relying on an old search snippet.",
      "The page rolls to each new weekend automatically and only enters the sitemap when at least four verified DFW event guides qualify.",
    ],
    relatedPaths: ["/events/dallas-fort-worth-events", "/events/this-weekend", "/events/north-texas-events"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "dfw-weekend",
  },
  {
    slug: "austin-this-weekend",
    path: "/events/austin-this-weekend",
    title: "Things to Do in Austin This Weekend",
    eyebrow: "Austin this weekend",
    description: "Find source-verified Austin-area events this weekend across Travis, Williamson, Hays and Bastrop counties, with official sources and permanent guides.",
    lead: "This rolling Austin weekend guide filters the authority catalog to events whose verified occurrence overlaps Friday through Sunday. Each result keeps the actual city and county visible so readers can plan around downtown, suburban and Hill Country corridors realistically.",
    planningTitle: "Keep the weekend on one Austin corridor",
    planningIntro: "An Austin-area event can be downtown, at a circuit, in a suburban venue or in a nearby Hill Country community. The host place matters more than the metro label.",
    planningPoints: [
      "Anchor the day to the event's actual venue and use nearby destination links for the rest of the itinerary.",
      "Recheck parking, street closures, transit and entry rules for large downtown, campus and circuit events.",
      "The page rolls forward weekly and is automatically noindex when fewer than four verified events qualify.",
    ],
    relatedPaths: ["/events/austin-area-events", "/events/this-weekend", "/events/hill-country-events"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "austin-weekend",
  },
  {
    slug: "san-antonio-this-weekend",
    path: "/events/san-antonio-this-weekend",
    title: "Things to Do in San Antonio This Weekend",
    eyebrow: "San Antonio this weekend",
    description: "Find source-verified San Antonio-area events this weekend across Bexar, Comal, Guadalupe and Kendall counties, with official sources and permanent guides.",
    lead: "This rolling San Antonio weekend guide only includes source-qualified event occurrences that overlap Friday through Sunday. It keeps downtown, fairground, New Braunfels, Boerne and nearby-community trips distinct enough to plan well.",
    planningTitle: "Use the host city and venue as the planning radius",
    planningIntro: "The San Antonio corridor is large enough that a regional weekend list is useful for discovery but not as a single compact itinerary.",
    planningPoints: [
      "Open the permanent event guide for the exact venue, date context and organizer source before travel.",
      "Pair the event with nearby missions, food, museums, parks or small towns in the same corridor.",
      "The page rolls forward automatically and stays out of the sitemap whenever fewer than four verified guides qualify.",
    ],
    relatedPaths: ["/events/san-antonio-area-events", "/events/this-weekend", "/events/south-texas-events"],
    minimumIndexableItems: 4,
    indexPolicy: "qualified",
    filterKind: "san-antonio-weekend",
  },
];

export const TEMPORAL_EVENT_COLLECTIONS = temporalCollections;
export const TEMPORAL_EVENT_COLLECTION_BY_SLUG = new Map(temporalCollections.map((item) => [item.slug, item]));

function texasDateParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: "year" | "month" | "day") => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: value("year"), month: value("month"), day: value("day") };
}

function isoFromParts(year: number, month: number, day: number) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isoToUtcDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

function addDays(iso: string, days: number) {
  const date = isoToUtcDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return isoFromParts(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

function lastDayOfMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
}

function dateLabel(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const startDate = isoToUtcDate(start);
  const endDate = isoToUtcDate(end);
  if (start === end) return formatter.format(startDate);
  return `${formatter.format(startDate)}–${formatter.format(endDate)}`;
}

function overlaps(event: TemporalEventDirectoryItem, start: string, end: string) {
  const eventEnd = event.endDate ?? event.startDate;
  return event.startDate <= end && eventEnd >= start;
}

function resolveWeekend(today: string) {
  const date = isoToUtcDate(today);
  const weekday = date.getUTCDay();
  const daysToFriday = weekday === 0 ? -2 : weekday === 6 ? -1 : (5 - weekday + 7) % 7;
  const start = addDays(today, daysToFriday);
  return { start, end: addDays(start, 2) };
}

function resolveMonth(year: number, month: number) {
  return { start: isoFromParts(year, month, 1), end: isoFromParts(year, month, lastDayOfMonth(year, month)) };
}

function resolveSeasonYear(todayParts: ReturnType<typeof texasDateParts>, seasonEndMonth: number) {
  return todayParts.month > seasonEndMonth ? todayParts.year + 1 : todayParts.year;
}

function holidayName(name: string) {
  return /(christmas|holiday|dickens|nutcracker|lights|river parade)/i.test(name);
}

function countyFairName(name: string) {
  return /\b(countounty fair|county fair|fair & rodeo|fair and rodeo|state fair)\b/i.test(name);
}

function resolveFilter(definition: TemporalEventCollectionDefinition, events: TemporalEventDirectoryItem[], now: Date) {
  const parts = texasDateParts(now);
  const today = isoFromParts(parts.year, parts.month, parts.day);
  let start = today;
  let end = today;
  let filtered: TemporalEventDirectoryItem[] = [];

  switch (definition.filterKind) {
    case "this-weekend": {
      ({ start, end } = resolveWeekend(today));
      filtered = events.filter((event) => overlaps(event, start, end));
      break;
    }
    case "this-month": {
      ({ start, end } = resolveMonth(parts.year, parts.month));
      filtered = events.filter((event) => overlaps(event, start, end));
      break;
    }
    case "month": {
      const month = definition.month ?? parts.month;
      const year = parts.month > month ? parts.year + 1 : parts.year;
      ({ start, end } = resolveMonth(year, month));
      filtered = events.filter((event) => overlaps(event, start, end));
      break;
    }
    case "fall": {
      const year = resolveSeasonYear(parts, 11);
      start = isoFromParts(year, 9, 1);
      end = isoFromParts(year, 11, 30);
      filtered = events.filter((event) => event.category !== "sport" && overlaps(event, start, end));
      break;
    }
    case "christmas": {
      const year = parts.month === 1 && parts.day <= 5 ? parts.year - 1 : parts.year;
      start = isoFromParts(year, 11, 15);
      end = isoFromParts(year + 1, 1, 5);
      filtered = events.filter((event) => holidayName(event.name) && overlaps(event, start, end));
      break;
    }
    case "county-fairs": {
      start = today;
      end = addDays(today, 550);
      filtered = events.filter((event) => countyFairName(event.name) && (event.endDate ?? event.startDate) >= today);
      break;
    }
    case "houston-area": {
      start = today;
      end = addDays(today, 550);
      const counties = new Set(["Harris County", "Fort Bend County", "Montgomery County", "Brazoria County"]);
      filtered = events.filter((event) => counties.has(event.countyName ?? "") && (event.endDate ?? event.startDate) >= today);
      break;
    }
    case "dfw-area": {
      start = today;
      end = addDays(today, 550);
      const counties = new Set(["Dallas County", "Tarrant County", "Collin County", "Denton County", "Ellis County", "Rockwall County"]);
      filtered = events.filter((event) => counties.has(event.countyName ?? "") && (event.endDate ?? event.startDate) >= today);
      break;
    }
    case "austin-area": {
      start = today;
      end = addDays(today, 550);
      const counties = new Set(["Travis County", "Williamson County", "Hays County", "Bastrop County"]);
      filtered = events.filter((event) => counties.has(event.countyName ?? "") && (event.endDate ?? event.startDate) >= today);
      break;
    }
    case "san-antonio-area": {
      start = today;
      end = addDays(today, 550);
      const counties = new Set(["Bexar County", "Comal County", "Guadalupe County", "Kendall County"]);
      filtered = events.filter((event) => counties.has(event.countyName ?? "") && (event.endDate ?? event.startDate) >= today);
      break;
    }
    case "houston-weekend":
    case "dfw-weekend":
    case "austin-weekend":
    case "san-antonio-weekend": {
      ({ start, end } = resolveWeekend(today));
      const countyGroups: Record<"houston-weekend" | "dfw-weekend" | "austin-weekend" | "san-antonio-weekend", Set<string>> = {
        "houston-weekend": new Set(["Harris County", "Fort Bend County", "Montgomery County", "Brazoria County"]),
        "dfw-weekend": new Set(["Dallas County", "Tarrant County", "Collin County", "Denton County", "Ellis County", "Rockwall County"]),
        "austin-weekend": new Set(["Travis County", "Williamson County", "Hays County", "Bastrop County"]),
        "san-antonio-weekend": new Set(["Bexar County", "Comal County", "Guadalupe County", "Kendall County"]),
      };
      const counties = countyGroups[definition.filterKind];
      filtered = events.filter((event) => counties.has(event.countyName ?? "") && overlaps(event, start, end));
      break;
    }
  }

  return {
    start,
    end,
    items: filtered.sort((left, right) => left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name)),
  };
}

export function resolveTemporalEventCollectionServer(slug: string, events: TemporalEventDirectoryItem[], now = new Date()): ResolvedTemporalEventCollection | null {
  const definition = TEMPORAL_EVENT_COLLECTION_BY_SLUG.get(slug);
  if (!definition) return null;
  const { start, end, items } = resolveFilter(definition, events, now);
  const dateContext = dateLabel(start, end);
  const rollingTitle = definition.filterKind === "this-weekend"
    || definition.filterKind === "this-month"
    || definition.filterKind.endsWith("-weekend");
  const dynamicTitle = rollingTitle ? `${definition.title}: ${dateContext}` : definition.title;
  const shouldIndex = definition.indexPolicy === "qualified" && items.length >= definition.minimumIndexableItems;
  const indexabilityNote = definition.indexPolicy === "always-noindex"
    ? "This rolling date view is intentionally noindex,follow so search engines prioritize durable event guides and stable seasonal or regional landing pages."
    : shouldIndex
      ? "This stable collection currently meets the verified-guide threshold for indexing."
      : "This stable collection remains available for readers but is temporarily noindex until enough verified guides qualify; Texas Defined does not pad thin date views with weak listings.";

  return {
    ...definition,
    title: dynamicTitle,
    description: `${definition.description} Current verified window: ${dateContext}.`,
    lead: `${definition.lead} Current verified window: ${dateContext}.`,
    dateContext,
    items,
    shouldIndex,
    indexabilityNote,
  };
}
