import type { TexasEvent, TexasRegion } from "./types";

export interface MajorEventSource {
  label: string;
  url: string;
}

export interface MajorEventPlanningSection {
  title: string;
  body: string;
}

export interface MajorEventRelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface MajorEventAuthorityRecord {
  slug: string;
  name: string;
  city: string;
  countySlug?: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  startDate: string;
  endDate?: string;
  dateNote?: string;
  venue?: string;
  officialUrl: string;
  sourceCheckedAt: string;
  summary: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}

/**
 * First verified promotion batch from the 75-event planning inventory supplied
 * to Texas Defined in August 2026. The inventory is a discovery seed only:
 * dates here are promoted only after checking an official organizer or host source.
 *
 * This intentionally corrects seed-date conflicts when the official source differs.
 * In particular, official sources currently list SXSW 2027 for March 15-21 and
 * Texas SandFest 2027 for April 16-18.
 */
export const majorEventAuthorityRecords: MajorEventAuthorityRecord[] = [
  {
    slug: "grapefest",
    name: "GrapeFest",
    city: "Grapevine",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "food",
    startDate: "2026-09-17",
    endDate: "2026-09-20",
    venue: "Historic Downtown Grapevine",
    officialUrl: "https://www.grapevinetexasusa.com/grapefest/general-information/",
    sourceCheckedAt: "2026-08-26",
    summary: "GrapeFest is Grapevine's four-day wine festival, filling historic downtown with tastings, food, live entertainment and festival programming.",
    whyItMatters: "The festival is one of North Texas's strongest fall travel anchors because it combines a walkable historic downtown with a large, scheduled event rather than asking visitors to build an itinerary from unrelated stops.",
    planningSections: [
      { title: "Choose the day before you choose the hotel", body: "The official schedule runs Thursday through Sunday, but admission rules and hours change by day. Decide whether you want the lighter Thursday atmosphere, a Friday evening visit or the full Saturday crowd before locking in lodging and arrival time." },
      { title: "Treat downtown as the venue", body: "GrapeFest takes over Grapevine's historic core, so the useful planning unit is the whole downtown district rather than one building. Build extra walking time into the day and use the organizer's current parking and transportation instructions before leaving home." },
      { title: "Make it a North Texas weekend", body: "A festival visit works well as the anchor for a broader Grapevine stay. Keep the event itself as the fixed point, then add nearby dining, Main Street browsing and other Tarrant County stops around the hours you actually plan to attend." },
    ],
    relatedLinks: [
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare GrapeFest with other fall fairs, festivals and statewide events." },
      { href: "/county/tarrant", label: "Explore Tarrant County", description: "Connect the festival with the wider North Texas county guide." },
    ],
    sources: [
      { label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" },
    ],
  },
  {
    slug: "texas-renaissance-festival",
    name: "Texas Renaissance Festival",
    city: "Todd Mission",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-10-10",
    endDate: "2026-11-29",
    dateNote: "Open Saturdays and Sundays during the published season, plus Thanksgiving Friday; check the official calendar before traveling.",
    venue: "Texas Renaissance Festival",
    officialUrl: "https://www.texrenfest.com/",
    sourceCheckedAt: "2026-08-26",
    summary: "The Texas Renaissance Festival is a multi-week fall festival in Todd Mission built around themed weekends, stage shows, food, shopping and a large purpose-built festival village.",
    whyItMatters: "Unlike a one-day fair, this is a repeat-weekend destination that can shape an entire fall trip. The themed-weekend structure means the best weekend for one visitor may not be the best weekend for another.",
    planningSections: [
      { title: "Pick the theme, not just the date", body: "The published season spans multiple weekends. Start with the official themed-weekend calendar, then choose the date that matches the experience you want instead of assuming every weekend is interchangeable." },
      { title: "Plan for a full outdoor day", body: "The festival footprint is large and most visitors spend hours moving between stages, shops and food areas. Comfortable footwear, weather planning and a realistic arrival window matter more here than they do for a short indoor event." },
      { title: "Recheck the calendar before the drive", body: "The season is not continuous daily operation. Texas Defined treats the published opening and closing dates as the season boundary, while the organizer's calendar remains the authority for individual operating days and special programming." },
    ],
    relatedLinks: [
      { href: "/events", label: "Browse the Texas events calendar", description: "See other major fall festivals and weekend events across the state." },
    ],
    sources: [
      { label: "Texas Renaissance Festival official site", url: "https://www.texrenfest.com/" },
    ],
  },
  {
    slug: "texas-rose-festival",
    name: "Texas Rose Festival",
    city: "Tyler",
    countySlug: "smith",
    countyName: "Smith County",
    region: "piney-woods",
    category: "culture",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
    venue: "Tyler",
    officialUrl: "https://www.texasrosefestival.org/",
    sourceCheckedAt: "2026-08-26",
    summary: "The Texas Rose Festival is Tyler's long-running October celebration of the city's rose-growing heritage, with ceremonial events, a parade and festival traditions spread across the city.",
    whyItMatters: "The festival turns Tyler's rose identity into a concentrated travel window, giving visitors a reason to connect horticulture, civic tradition and an East Texas weekend rather than treating the rose story as a single attraction stop.",
    planningSections: [
      { title: "Build around the official program", body: "The festival includes multiple scheduled components rather than one continuous fairground program. Use the official event schedule to decide which ceremonies, parade activities or public events matter to your trip." },
      { title: "Leave room for Tyler beyond the festival", body: "The festival is strongest when used as the anchor for a city weekend. Reserve time outside the scheduled program for Tyler's rose-related attractions and other Smith County stops instead of stacking every hour with festival programming." },
      { title: "Expect October demand", body: "A named statewide festival compresses visitor demand into a short window. Confirm lodging, parking and event-access details early, then check the organizer again close to departure for schedule changes." },
    ],
    relatedLinks: [
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare Tyler's festival with other fall events across Texas." },
      { href: "/county/smith", label: "Explore Smith County", description: "Use the county guide to plan more of the East Texas trip." },
    ],
    sources: [
      { label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" },
    ],
  },
  {
    slug: "wurstfest",
    name: "Wurstfest",
    city: "New Braunfels",
    countySlug: "comal",
    countyName: "Comal County",
    region: "hill-country",
    category: "food",
    startDate: "2026-11-06",
    endDate: "2026-11-15",
    venue: "Wurstfest grounds",
    officialUrl: "https://wurstfest.com/",
    sourceCheckedAt: "2026-08-26",
    summary: "Wurstfest is New Braunfels's ten-day German-Texan festival, pairing food, music and heritage programming with one of the Hill Country's most distinctive cultural destinations.",
    whyItMatters: "Wurstfest is valuable for Texas Defined because it connects a current travel event to the deeper German-Texan story already visible across Hill Country towns, dance halls, food traditions and historic communities.",
    planningSections: [
      { title: "Choose weekday or weekend deliberately", body: "A ten-day run gives visitors more flexibility than a single-weekend festival. Weekends usually concentrate demand, while a weekday visit may make it easier to combine the event with downtown New Braunfels and other Comal County stops." },
      { title: "Use the festival as a heritage gateway", body: "The event makes more sense when paired with the German-Texan history of the region. Leave time for New Braunfels beyond the festival grounds rather than treating Wurstfest as an isolated evening attraction." },
      { title: "Check the official daily schedule", body: "Entertainment, admission details and operating hours can vary by day. Use the organizer's current schedule for the exact day you plan to attend, especially if a specific act or activity is the reason for your trip." },
    ],
    relatedLinks: [
      { href: "/german-czech-texas-towns", label: "Explore German and Czech Texas towns", description: "Connect Wurstfest with the larger settlement and heritage story." },
      { href: "/county/comal", label: "Explore Comal County", description: "Build the festival into a broader New Braunfels and Hill Country itinerary." },
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare Wurstfest with other major fall events." },
    ],
    sources: [
      { label: "Wurstfest official site", url: "https://wurstfest.com/" },
    ],
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    name: "Fort Worth Stock Show & Rodeo",
    city: "Fort Worth",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "rodeo",
    startDate: "2027-01-15",
    endDate: "2027-02-06",
    venue: "Will Rogers Memorial Center and Dickies Arena",
    officialUrl: "https://www.fwssr.com/",
    sourceCheckedAt: "2026-08-26",
    summary: "The Fort Worth Stock Show & Rodeo opens the Texas winter rodeo calendar with weeks of livestock shows, rodeo performances, trade exhibits and Western events in Fort Worth's cultural district.",
    whyItMatters: "This is not only a ticketed rodeo performance. It is a multi-week livestock and Western-culture event that can support several kinds of visits, from a single arena night to a full day built around stock-show grounds and Fort Worth attractions.",
    planningSections: [
      { title: "Decide whether you are planning a rodeo night or a stock-show day", body: "The official event spans many days and different program types. Start with the specific rodeo performance, livestock competition or grounds activity you care about, because arrival time and ticket needs differ." },
      { title: "Treat the cultural district as part of the trip", body: "The event sits in one of Fort Worth's strongest visitor areas. A practical itinerary can pair the stock show with nearby museums, dining and other Tarrant County stops instead of making a separate cross-city trip." },
      { title: "Use the official FAQ for final logistics", body: "Grounds hours, rodeo entry, carnival operations and other practical details are published by the organizer and can change. Recheck those details shortly before attending." },
    ],
    relatedLinks: [
      { href: "/county/tarrant", label: "Explore Tarrant County", description: "Connect the stock show with more Fort Worth trip planning." },
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare the Fort Worth event with other rodeos and winter events." },
    ],
    sources: [
      { label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" },
      { label: "FWSSR official visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" },
    ],
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    name: "San Antonio Stock Show & Rodeo",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "rodeo",
    startDate: "2027-02-11",
    endDate: "2027-02-28",
    venue: "Frost Bank Center and Freeman Coliseum grounds",
    officialUrl: "https://www.sarodeo.com/",
    sourceCheckedAt: "2026-08-26",
    summary: "The San Antonio Stock Show & Rodeo combines PRCA rodeo competition, concerts, livestock programming and fairground activity during an 18-day February run.",
    whyItMatters: "For visitors, the event can be either the centerpiece of a San Antonio weekend or one major night inside a broader city trip. That makes it a natural bridge between Texas Defined's event, county and destination planning layers.",
    planningSections: [
      { title: "Start with the performance you actually want", body: "Concert and rodeo programming changes by date. Pick the performance first, then plan lodging and other San Antonio activities around that fixed time rather than choosing a weekend before checking the lineup." },
      { title: "Budget time for the grounds", body: "The rodeo experience extends beyond an arena seat. If livestock exhibits, fair attractions or food are part of the plan, arrive early enough to use the grounds before the ticketed performance." },
      { title: "Use official day-of information", body: "Parking, entry rules, show times and ticket availability are operational details. Texas Defined summarizes the trip pattern, but the organizer remains the final source for the day you attend." },
    ],
    relatedLinks: [
      { href: "/county/bexar", label: "Explore Bexar County", description: "Build the rodeo into a larger San Antonio visit." },
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare major Texas rodeos and seasonal events." },
    ],
    sources: [
      { label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" },
      { label: "Visit San Antonio 2027 rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" },
    ],
  },
  {
    slug: "sxsw",
    name: "South by Southwest (SXSW)",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2027-03-15",
    endDate: "2027-03-21",
    venue: "Downtown Austin venues",
    officialUrl: "https://sxsw.com/",
    sourceCheckedAt: "2026-08-26",
    summary: "SXSW brings innovation, film and television, music and comedy programming into downtown Austin for a concentrated week of conferences, screenings, showcases and events.",
    whyItMatters: "SXSW changes the normal rhythm of central Austin. Visitors who would usually improvise a downtown weekend need to plan around credentials, distributed venues, transportation and unusually high event demand.",
    planningSections: [
      { title: "Know which SXSW you are attending", body: "SXSW is a collection of overlapping conferences and festivals rather than a single venue event. Start with the badge, festival or program that matters to you, then build the day around its official schedule." },
      { title: "Plan for movement between venues", body: "Programming is distributed across downtown Austin. Walking time, transit decisions and schedule gaps are part of the event experience, so avoid treating back-to-back sessions at different venues as if they were in one convention hall." },
      { title: "Book the trip around event demand", body: "The event concentrates visitors in central Austin. Lodging location and transportation strategy can matter as much as the individual session list, especially if several days of programming are part of the trip." },
    ],
    relatedLinks: [
      { href: "/county/travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." },
      { href: "/events", label: "Browse the Texas events calendar", description: "See other major Texas festivals and cultural events." },
    ],
    sources: [
      { label: "SXSW official 2027 dates announcement", url: "https://sxsw.com/news/2026/south-by-southwest-2027-dates-announced/" },
      { label: "SXSW official site", url: "https://sxsw.com/" },
    ],
  },
  {
    slug: "texas-sandfest",
    name: "Texas SandFest",
    city: "Port Aransas",
    countySlug: "nueces",
    countyName: "Nueces County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2027-04-16",
    endDate: "2027-04-18",
    venue: "Port Aransas beach festival grounds",
    officialUrl: "https://www.texassandfest.org/",
    sourceCheckedAt: "2026-08-26",
    summary: "Texas SandFest brings large-scale sand sculpture, artists and festival activity to the beach in Port Aransas for a three-day Gulf Coast event.",
    whyItMatters: "SandFest is a particularly strong travel event because the venue is also the destination. Visitors are balancing festival access, beach conditions, lodging and island transportation at the same time.",
    planningSections: [
      { title: "Plan the island stay before the festival day", body: "Port Aransas lodging and transportation are part of the event strategy. Decide whether you are staying on the island or driving in before choosing arrival time, because the festival adds traffic and pedestrian demand to an already popular beach destination." },
      { title: "Read the current prohibited-items guidance", body: "A beach festival can have different rules from an ordinary beach day. The organizer publishes current guidance on pets, coolers, shade structures, wagons and other items, so check that list while packing." },
      { title: "Give the sculptures enough time", body: "This is not just a quick stage performance. Leave a broad viewing window for the sculpture areas and festival grounds, then place beach time, meals and other Port Aransas stops around it rather than trying to rush through the event." },
    ],
    relatedLinks: [
      { href: "/county/nueces", label: "Explore Nueces County", description: "Use the county guide to expand the Gulf Coast trip beyond the festival." },
      { href: "/events", label: "Browse the Texas events calendar", description: "Compare SandFest with other spring events across Texas." },
    ],
    sources: [
      { label: "Texas SandFest official site", url: "https://www.texassandfest.org/" },
      { label: "Texas SandFest official know-before-you-go guide", url: "https://www.texassandfest.org/knowbeforeyougo" },
    ],
  },
];

export const verifiedMajorEventOccurrences: TexasEvent[] = majorEventAuthorityRecords.map((event) => ({
  id: `authority:${event.slug}:${event.startDate}`,
  brandId: "texasdefined",
  slug: `${event.slug}-${event.startDate}`,
  name: event.name,
  blurb: event.summary,
  city: event.city,
  region: event.region,
  startDate: event.startDate,
  endDate: event.endDate,
  category: event.category,
  venue: event.venue,
  officialUrl: event.officialUrl,
  sourceName: event.sources[0]?.label,
  sourceCheckedAt: event.sourceCheckedAt,
}));

const bySlug = new Map(majorEventAuthorityRecords.map((event) => [event.slug, event]));
const byNormalizedName = new Map(majorEventAuthorityRecords.map((event) => [normalizeEventName(event.name), event]));

function normalizeEventName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function getMajorEventAuthority(slug: string): MajorEventAuthorityRecord | undefined {
  return bySlug.get(slug);
}

export function getMajorEventAuthorityByName(name: string): MajorEventAuthorityRecord | undefined {
  return byNormalizedName.get(normalizeEventName(name));
}

export function majorEventGuidePath(name: string): string | undefined {
  const event = getMajorEventAuthorityByName(name);
  return event ? `/event/${event.slug}` : undefined;
}

export function majorEventsForCounty(countySlug: string): MajorEventAuthorityRecord[] {
  return majorEventAuthorityRecords
    .filter((event) => event.countySlug === countySlug)
    .sort((left, right) => left.startDate.localeCompare(right.startDate));
}
