import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "plano-balloon-festival",
    name: "H-E-B | Central Market Plano Balloon Festival",
    city: "Plano",
    countySlug: "collin",
    countyName: "Collin County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-09-17",
    endDate: "2026-09-20",
    venue: "Oak Point Park / Red Tail Pavilion",
    officialUrl: "https://www.planoballoonfest.org/",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "The Plano Balloon Festival is a four-day North Texas destination event built around scheduled hot-air-balloon launches and glows, live entertainment, family attractions, food and a long-running nonprofit festival tradition in Collin County.",
    planningSections: [
      { title: "Use September 17-20 as the confirmed 2026 festival window", body: "The organizer publishes festival operating hours for Thursday, September 17 through Sunday, September 20, 2026 at Oak Point Park. Thursday and Friday are evening-focused, Saturday runs from early morning through night, and Sunday closes after the morning program." },
      { title: "Treat balloon activity as weather-dependent", body: "The organizer explicitly warns that launches, displays, glows and tethered rides can be restricted by wind or adverse weather. Build the trip around the festival weekend, but check the same-day official schedule before counting on a specific balloon activity." },
      { title: "Plan arrival around the program you value most", body: "Morning balloon launches, evening glows, fireworks, stage entertainment and family attractions occur at different times. Review the official schedule before choosing parking and arrival time rather than assuming every marquee activity runs continuously." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-collin", label: "Explore Collin County", description: "Build more Plano and Collin County stops around the festival." },
      { href: "/event/great-texas-balloon-race", label: "Great Texas Balloon Race", description: "Compare another major Texas hot-air-balloon destination event." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall festivals across Texas." },
    ],
    sources: [
      { label: "Plano Balloon Festival official hours and directions", url: "https://www.planoballoonfest.org/directions.aspx" },
      { label: "Plano Balloon Festival official 2026 schedule", url: "https://www.planoballoonfest.org/events" },
      { label: "Plano Balloon Festival official festival facts", url: "https://www.planoballoonfest.org/p/about" },
    ],
  },
  {
    slug: "cottonwood-art-festival",
    name: "Cottonwood Art Festival",
    city: "Richardson",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-10-03",
    endDate: "2026-10-04",
    venue: "Cottonwood Park",
    officialUrl: "https://cottonwoodartfestival.com/",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "Cottonwood Art Festival turns Richardson's Cottonwood Park into a large juried outdoor art destination with nationally selected artists, live music, food and hands-on children's programming, extending a local festival tradition that began in 1969.",
    planningSections: [
      { title: "Use October 3-4 as the confirmed fall 2026 window", body: "The organizer publishes the fall festival for Saturday, October 3 and Sunday, October 4, 2026 at Cottonwood Park, with longer Saturday hours and a Sunday afternoon close." },
      { title: "Plan for an outdoor art-festival footprint", body: "The festival describes nearly 200 exhibiting artists selected from a much larger applicant pool, plus food, music and children's activities. Comfortable walking time matters more here than a single stage schedule, so leave room to browse rather than trying to rush the grounds." },
      { title: "Keep the spring 2027 return on the calendar", body: "The organizer already publishes May 1-2, 2027 as the next spring Cottonwood Art Festival. Texas Defined keeps this page anchored to the nearer fall 2026 occurrence while noting that the same event identity returns in spring." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build more Richardson and Dallas County stops around the festival." },
      { href: "/event/main-st-fort-worth-arts-festival", label: "MAIN ST. Fort Worth Arts Festival", description: "Compare another large North Texas juried arts festival." },
      { href: "/events", label: "Texas events calendar", description: "Find more Texas arts and culture events." },
    ],
    sources: [
      { label: "Cottonwood Art Festival official information", url: "https://cottonwoodartfestival.com/information/" },
      { label: "Cottonwood Art Festival official site", url: "https://cottonwoodartfestival.com/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche37Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
