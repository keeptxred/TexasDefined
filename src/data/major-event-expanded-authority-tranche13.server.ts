import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "gillespie-county-fair",
    name: "Gillespie County Fair",
    city: "Fredericksburg",
    countySlug: "gillespie",
    countyName: "Gillespie County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2026-08-27",
    endDate: "2026-08-30",
    venue: "Gillespie County Fairgrounds",
    officialUrl: "https://gillespiefair.com/gillespie-county-fair",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Gillespie County Fair is a durable Hill Country travel anchor because it combines livestock and agricultural exhibits, carnival traditions, community competitions and live pari-mutuel horse racing in Fredericksburg during one concentrated late-summer weekend.",
    planningSections: [
      { title: "Choose the fair day around the program", body: "The organizer lists the 138th Gillespie County Fair for Thursday through Sunday, August 27-30, 2026. Livestock, exhibits and midway activity vary by day, so use the current fair schedule before deciding when to arrive." },
      { title: "Save Saturday or Sunday for horse racing", body: "The organizer says the final two days of the 2026 fair include live pari-mutuel horse racing. Visitors coming primarily for racing should build the trip around Saturday or Sunday and verify race-day ticket details before leaving." },
      { title: "Pair the fair with Fredericksburg", body: "The fairgrounds are close enough to Fredericksburg to make the event the fixed point of a broader Hill Country weekend. Leave time for the town and Gillespie County rather than treating the fair as a drive-in-only stop." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-gillespie", label: "Explore Gillespie County", description: "Connect the fair to Fredericksburg and the surrounding Hill Country." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fairs, festivals and late-summer events." },
    ],
    sources: [
      { label: "Gillespie County Fair official fair page", url: "https://gillespiefair.com/gillespie-county-fair" },
      { label: "Gillespie County Fair & Festivals Association", url: "https://gillespiefair.com/" },
    ],
  },
  {
    slug: "north-texas-fair-rodeo",
    name: "North Texas Fair & Rodeo",
    city: "Denton",
    countySlug: "denton",
    countyName: "Denton County",
    region: "prairies-lakes",
    category: "rodeo",
    startDate: "2026-08-21",
    endDate: "2026-08-30",
    venue: "North Texas Fair & Rodeo grounds",
    officialUrl: "https://ntfair.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The North Texas Fair & Rodeo gives Denton a ten-night late-summer destination built around rodeo competition, country music, livestock shows, family attractions and a community-supported fair tradition.",
    planningSections: [
      { title: "Start with the exact night", body: "The organizer confirms the 98th annual fair for August 21-30, 2026 and describes ten nights of rodeo, music, livestock and attractions. Pick the performance or rodeo night first because the lineup changes across the run." },
      { title: "Budget time beyond the headline show", body: "The grounds include livestock shows, kid and family zones and other fair attractions. Arrive earlier than the main performance if those are part of the trip rather than treating admission as a single-show ticket." },
      { title: "Use Denton as the trip base", body: "The fair works naturally with a Denton visit. Build dining, downtown and other Denton County stops around the fixed event time instead of making separate cross-region trips." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-denton", label: "Explore Denton County", description: "Build a broader North Texas itinerary around the fair." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas rodeos and county fairs." },
    ],
    sources: [
      { label: "North Texas Fair & Rodeo official site", url: "https://ntfair.com/" },
    ],
  },
  {
    slug: "austin-chronicle-hot-sauce-festival",
    name: "Austin Chronicle Hot Sauce Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "food",
    startDate: "2026-08-30",
    endDate: "2026-08-30",
    dateNote: "The 36th annual festival is scheduled for Sunday, August 30, 2026 from 3-9 p.m. at Radio/East. The organizer says the event benefits the Central Texas Food Bank.",
    venue: "Radio/East",
    officialUrl: "https://www.austinchronicle.com/hot-sauce/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Austin Chronicle Hot Sauce Festival combines one of Austin's long-running food traditions with a major tasting competition, live music and a charitable mission supporting the Central Texas Food Bank.",
    planningSections: [
      { title: "Plan around the confirmed six-hour window", body: "The organizer lists the 2026 festival for Sunday, August 30 from 3-9 p.m. at Radio/East. Arrive early if broad tasting access and People's Choice voting are priorities, then use the published stage and awards times to shape the rest of the visit." },
      { title: "Know the entry rules before going", body: "The organizer identifies the event as cashless and says dogs, coolers and walk-up hot-sauce entries are not permitted. Check the festival FAQ again before departure for any operational changes." },
      { title: "Make it an East Austin stop", body: "The festival can anchor an afternoon and evening in Austin rather than consuming an entire weekend. Pair it with nearby food, music or other Travis County stops while leaving enough time for lines and tasting." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect the festival to a wider Austin itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas food festivals and summer events." },
    ],
    sources: [
      { label: "Austin Chronicle Hot Sauce Festival official page", url: "https://www.austinchronicle.com/hot-sauce/" },
      { label: "Austin Chronicle 2026 festival event listing", url: "https://calendar.austinchronicle.com/event/austin-chronicle-hot-sauce-festival-14037057" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche13Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
