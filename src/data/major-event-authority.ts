import type { TexasEvent, TexasRegion } from "./types";

export interface MajorEventSource { label: string; url: string; }
export interface MajorEventPlanningSection { title: string; body: string; }
export interface MajorEventRelatedLink { href: string; label: string; description: string; }
export interface MajorEventAuthorityRecord {
  slug: string; name: string; city: string; countySlug?: string; countyName?: string;
  region: TexasRegion; category: TexasEvent["category"]; startDate: string; endDate?: string;
  dateNote?: string; venue?: string; officialUrl: string; sourceCheckedAt: string;
  summary: string; whyItMatters: string; planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[]; sources: MajorEventSource[];
}

// First verified tranche from the supplied 75-event inventory. The PDF is a discovery
// seed only; official organizer/host sources control dates. That check corrected the
// seed's SXSW 2027 dates to Mar 15-21 and Texas SandFest 2027 to Apr 16-18.
export const majorEventAuthorityRecords: MajorEventAuthorityRecord[] = [
  {
    slug: "grapefest", name: "GrapeFest", city: "Grapevine", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "food",
    startDate: "2026-09-17", endDate: "2026-09-20", venue: "Historic Downtown Grapevine", officialUrl: "https://www.grapevinetexasusa.com/grapefest/general-information/", sourceCheckedAt: "2026-08-26",
    summary: "GrapeFest is Grapevine's four-day wine festival, filling historic downtown with tastings, food, live entertainment and festival programming.",
    whyItMatters: "The festival is a strong North Texas fall-travel anchor because it combines a walkable historic downtown with a large scheduled event.",
    planningSections: [
      { title: "Choose the day first", body: "Admission rules and hours vary by day. Decide whether you want Thursday, Friday evening or the heavier weekend crowd before locking in lodging and arrival time." },
      { title: "Treat downtown as the venue", body: "Build in walking time and use the organizer's current parking and transportation instructions before leaving home." },
      { title: "Make it a weekend", body: "Keep the festival as the fixed point, then add Main Street, dining and other Tarrant County stops around the hours you plan to attend." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the North Texas trip." }],
    sources: [{ label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" }],
  },
  {
    slug: "texas-renaissance-festival", name: "Texas Renaissance Festival", city: "Todd Mission", region: "prairies-lakes", category: "culture",
    startDate: "2026-10-10", endDate: "2026-11-29", dateNote: "Open Saturdays and Sundays during the published season, plus Thanksgiving Friday; check the official calendar before traveling.", venue: "Texas Renaissance Festival", officialUrl: "https://www.texrenfest.com/", sourceCheckedAt: "2026-08-26",
    summary: "The Texas Renaissance Festival is a multi-week fall festival in Todd Mission built around themed weekends, stage shows, food, shopping and a purpose-built festival village.",
    whyItMatters: "This repeat-weekend destination can shape an entire fall trip, and the themed-weekend structure means the best weekend depends on the visitor.",
    planningSections: [
      { title: "Pick the theme first", body: "Start with the official themed-weekend calendar instead of assuming every weekend is interchangeable." },
      { title: "Plan for a full outdoor day", body: "Comfortable footwear, weather planning and a realistic arrival window matter across the large festival footprint." },
      { title: "Recheck operating days", body: "The published start and end dates mark the season boundary; the organizer's calendar remains authoritative for individual operating days." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "See other major fall festivals." }],
    sources: [{ label: "Texas Renaissance Festival official site", url: "https://www.texrenfest.com/" }],
  },
  {
    slug: "texas-rose-festival", name: "Texas Rose Festival", city: "Tyler", countySlug: "smith", countyName: "Smith County", region: "piney-woods", category: "culture",
    startDate: "2026-10-15", endDate: "2026-10-18", venue: "Tyler", officialUrl: "https://www.texasrosefestival.org/", sourceCheckedAt: "2026-08-26",
    summary: "The Texas Rose Festival is Tyler's October celebration of the city's rose-growing heritage, with ceremonial events, a parade and festival traditions across the city.",
    whyItMatters: "The festival turns Tyler's rose identity into a concentrated travel window that connects horticulture, civic tradition and an East Texas weekend.",
    planningSections: [
      { title: "Build around the program", body: "Use the official schedule to choose the ceremonies, parade activities and public events that matter to your trip." },
      { title: "Leave room for Tyler", body: "Reserve time outside the scheduled program for rose-related attractions and other Smith County stops." },
      { title: "Plan for October demand", body: "Confirm lodging, parking and event-access details early, then check the organizer again close to departure." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-smith", label: "Explore Smith County", description: "Plan more of the East Texas trip." }],
    sources: [{ label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" }],
  },
  {
    slug: "wurstfest", name: "Wurstfest", city: "New Braunfels", countySlug: "comal", countyName: "Comal County", region: "hill-country", category: "food",
    startDate: "2026-11-06", endDate: "2026-11-15", venue: "Wurstfest grounds", officialUrl: "https://wurstfest.com/", sourceCheckedAt: "2026-08-26",
    summary: "Wurstfest is New Braunfels's ten-day German-Texan festival, pairing food, music and heritage programming with a distinctive Hill Country destination.",
    whyItMatters: "Wurstfest connects a current travel event to the deeper German-Texan story visible across Hill Country towns, dance halls, food traditions and historic communities.",
    planningSections: [
      { title: "Choose weekday or weekend", body: "The ten-day run gives visitors flexibility; choose the day before arranging lodging and other New Braunfels stops." },
      { title: "Use it as a heritage gateway", body: "Leave time for New Braunfels beyond the festival grounds and connect the visit to the region's German-Texan history." },
      { title: "Check the daily schedule", body: "Entertainment, admission details and operating hours vary; use the organizer's current schedule for your exact day." },
    ],
    relatedLinks: [{ href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Wurstfest to the larger heritage story." }, { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a broader Hill Country itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wurstfest official site", url: "https://wurstfest.com/" }],
  },
  {
    slug: "fort-worth-stock-show-rodeo", name: "Fort Worth Stock Show & Rodeo", city: "Fort Worth", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "rodeo",
    startDate: "2027-01-15", endDate: "2027-02-06", venue: "Will Rogers Memorial Center and Dickies Arena", officialUrl: "https://www.fwssr.com/", sourceCheckedAt: "2026-08-26",
    summary: "The Fort Worth Stock Show & Rodeo opens the Texas winter rodeo calendar with livestock shows, rodeo performances, trade exhibits and Western events.",
    whyItMatters: "It supports several kinds of visits, from a single arena night to a full day built around the stock-show grounds and Fort Worth attractions.",
    planningSections: [
      { title: "Choose rodeo night or stock-show day", body: "Start with the specific performance, livestock competition or grounds activity you care about because arrival time and ticket needs differ." },
      { title: "Use the cultural district", body: "Pair the event with nearby museums, dining and other Tarrant County stops instead of making a separate cross-city trip." },
      { title: "Recheck final logistics", body: "Grounds hours, rodeo entry and other operational details can change; use the organizer's current visitor information." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the Fort Worth trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other rodeos and winter events." }],
    sources: [{ label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" }, { label: "FWSSR visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" }],
  },
  {
    slug: "san-antonio-stock-show-rodeo", name: "San Antonio Stock Show & Rodeo", city: "San Antonio", countySlug: "bexar", countyName: "Bexar County", region: "south-texas", category: "rodeo",
    startDate: "2027-02-11", endDate: "2027-02-28", venue: "Frost Bank Center and Freeman Coliseum grounds", officialUrl: "https://www.sarodeo.com/", sourceCheckedAt: "2026-08-26",
    summary: "The San Antonio Stock Show & Rodeo combines PRCA rodeo competition, concerts, livestock programming and fairground activity during an 18-day February run.",
    whyItMatters: "The event can be the centerpiece of a San Antonio weekend or one major night inside a broader city trip, linking event, county and destination planning.",
    planningSections: [
      { title: "Start with the performance", body: "Pick the concert or rodeo performance first, then plan lodging and other San Antonio activities around that fixed time." },
      { title: "Budget time for the grounds", body: "If livestock exhibits, fair attractions or food are part of the plan, arrive early enough to use the grounds before the performance." },
      { title: "Use official day-of information", body: "Recheck parking, entry rules, show times and ticket availability with the organizer before attending." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a larger San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare major Texas rodeos." }],
    sources: [{ label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" }, { label: "Visit San Antonio rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" }],
  },
  {
    slug: "sxsw", name: "South by Southwest (SXSW)", city: "Austin", countySlug: "travis", countyName: "Travis County", region: "hill-country", category: "culture",
    startDate: "2027-03-15", endDate: "2027-03-21", venue: "Downtown Austin venues", officialUrl: "https://sxsw.com/", sourceCheckedAt: "2026-08-26",
    summary: "SXSW brings innovation, film and television, music and comedy programming into downtown Austin for a concentrated week of conferences, screenings and showcases.",
    whyItMatters: "SXSW changes the normal rhythm of central Austin, so visitors need to plan around credentials, distributed venues, transportation and unusually high demand.",
    planningSections: [
      { title: "Know which SXSW you are attending", body: "Start with the badge, festival or program that matters to you, then build the day around its official schedule." },
      { title: "Plan for venue changes", body: "Programming is distributed across downtown; walking time, transit and schedule gaps are part of the event experience." },
      { title: "Book around event demand", body: "Lodging location and transportation strategy can matter as much as the session list when several days of programming are involved." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." }, { href: "/events", label: "Texas events calendar", description: "See other major cultural events." }],
    sources: [{ label: "SXSW official 2027 dates announcement", url: "https://sxsw.com/news/2026/south-by-southwest-2027-dates-announced/" }, { label: "SXSW official site", url: "https://sxsw.com/" }],
  },
  {
    slug: "texas-sandfest", name: "Texas SandFest", city: "Port Aransas", countySlug: "nueces", countyName: "Nueces County", region: "gulf-coast", category: "culture",
    startDate: "2027-04-16", endDate: "2027-04-18", venue: "Port Aransas beach festival grounds", officialUrl: "https://www.texassandfest.org/", sourceCheckedAt: "2026-08-26",
    summary: "Texas SandFest brings large-scale sand sculpture, artists and festival activity to the beach in Port Aransas for a three-day Gulf Coast event.",
    whyItMatters: "SandFest is a strong travel event because the venue is also the destination, combining festival access, beach conditions, lodging and island transportation.",
    planningSections: [
      { title: "Plan the island stay first", body: "Decide whether to stay on the island or drive in before choosing arrival time; the festival adds traffic and pedestrian demand." },
      { title: "Check prohibited items", body: "The organizer publishes current guidance on pets, coolers, shade structures, wagons and other items, so check the list while packing." },
      { title: "Give the sculptures time", body: "Leave a broad viewing window, then place beach time, meals and other Port Aransas stops around the festival." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Expand the Gulf Coast trip beyond the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring events." }],
    sources: [{ label: "Texas SandFest official site", url: "https://www.texassandfest.org/" }, { label: "Texas SandFest know-before-you-go guide", url: "https://www.texassandfest.org/knowbeforeyougo" }],
  },
];

export const verifiedMajorEventOccurrences: TexasEvent[] = majorEventAuthorityRecords.map((event) => ({
  id: `authority:${event.slug}:${event.startDate}`, brandId: "texasdefined", slug: `${event.slug}-${event.startDate}`,
  name: event.name, blurb: event.summary, city: event.city, region: event.region, startDate: event.startDate,
  endDate: event.endDate, category: event.category, venue: event.venue, officialUrl: event.officialUrl,
  sourceName: event.sources[0]?.label, sourceCheckedAt: event.sourceCheckedAt,
}));

const bySlug = new Map(majorEventAuthorityRecords.map((event) => [event.slug, event]));
const normalizeEventName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const byName = new Map(majorEventAuthorityRecords.map((event) => [normalizeEventName(event.name), event]));

export const getMajorEventAuthority = (slug: string) => bySlug.get(slug);
export const getMajorEventAuthorityByName = (name: string) => byName.get(normalizeEventName(name));
export const majorEventGuidePath = (name: string) => getMajorEventAuthorityByName(name) ? `/event/${getMajorEventAuthorityByName(name)!.slug}` : undefined;
export const majorEventsForCounty = (countySlug: string) => majorEventAuthorityRecords.filter((event) => event.countySlug === countySlug).sort((a, b) => a.startDate.localeCompare(b.startDate));
