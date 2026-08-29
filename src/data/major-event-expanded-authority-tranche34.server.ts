import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "austin-e-prix",
    name: "Austin E-Prix",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "sport",
    startDate: "2027-02-06",
    endDate: "2027-02-06",
    venue: "Circuit of The Americas",
    officialUrl: "https://www.fiaformulae.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Formula E brings its all-electric world championship to Circuit of The Americas for the first Austin E-Prix, adding a new international motorsports weekend to the city's already deep racing calendar and marking one of the series' limited U.S. stops.",
    planningSections: [
      { title: "Anchor the trip on February 6", body: "Formula E and the FIA publish Austin at Circuit of The Americas for February 6, 2027 on the Season 13 calendar. Recheck the championship and COTA event pages closer to race day for session times, ticket products and support programming." },
      { title: "Plan for a COTA race day", body: "Circuit of The Americas sits southeast of central Austin and major race days can materially change traffic and parking demand. Use official transportation and parking guidance rather than normal venue assumptions." },
      { title: "Treat this as a new Austin event", body: "The 2027 race is Formula E's first Austin E-Prix. Do not assume operating patterns from Formula 1, MotoGP or NASCAR at the same circuit; use Formula E-specific event instructions when they are published." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more of Austin and Travis County around the race." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas motorsports and sports events." },
    ],
    sources: [
      { label: "Formula E official Season 13 calendar", url: "https://www.fiaformulae.com/en/news/1074658/season-13-calendar-where-will-formula-e-be-racing-in-2026-27" },
      { label: "Formula E official Austin calendar announcement", url: "https://www.fiaformulae.com/en/news/1074657/formula-e-and-fia-unveil-record-breaking-21-race-2026-27-calendar-for-gen4-era" },
    ],
  },
  {
    slug: "nascar-at-cota",
    name: "NASCAR at Circuit of The Americas",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "sport",
    startDate: "2027-03-05",
    endDate: "2027-03-07",
    venue: "Circuit of The Americas",
    officialUrl: "https://www.nascar.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "NASCAR returns to Circuit of The Americas for a March 5-7, 2027 road-course weekend, with national-series action culminating in the DuraMAX Texas Grand Prix and extending Austin's role as one of the country's most varied motorsports destinations.",
    planningSections: [
      { title: "Use March 5-7 as the race-weekend window", body: "NASCAR's official 2027 schedule announcement confirms the COTA weekend for March 5-7, with the Cup Series DuraMAX Texas Grand Prix on Sunday, March 7. Additional start times and on-track details can be added when NASCAR and COTA publish them." },
      { title: "Plan the circuit trip before arrival", body: "COTA is outside central Austin, so parking, shuttle and road-access choices matter. Recheck official race-weekend transportation instructions and allow extra time for peak arrival and departure periods." },
      { title: "Separate the weekend from Austin's other COTA events", body: "Formula 1, Formula E and other series use the same facility under different schedules and policies. Use NASCAR's current weekend guide for ticket access, allowed items, camping and fan programming." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Turn the COTA weekend into a broader Austin-area trip." },
      { href: "/event/formula-1-united-states-grand-prix", label: "Formula 1 United States Grand Prix", description: "Compare another major COTA race weekend." },
      { href: "/events", label: "Texas events calendar", description: "Find other Texas sports and destination events." },
    ],
    sources: [
      { label: "NASCAR official 2027 schedule announcement", url: "https://www.nascar.com/news-media/2026/08/12/2027-nascar-schedule-announcements-latest-dates-tracks-and-changes/" },
      { label: "NASCAR official 2027 national-series schedule", url: "https://www.nascar.com/news-media/2026/08/26/2027-nascar-schedule-confirmed-dates-tracks-for-all-three-national-series/" },
    ],
  },
  {
    slug: "texas-motor-speedway-nascar-weekend",
    name: "Texas Motor Speedway NASCAR Weekend",
    city: "Fort Worth",
    countySlug: "denton",
    countyName: "Denton County",
    region: "prairies-lakes",
    category: "sport",
    startDate: "2027-04-30",
    endDate: "2027-05-02",
    venue: "Texas Motor Speedway",
    officialUrl: "https://www.texasmotorspeedway.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Texas Motor Speedway's 2027 NASCAR weekend delivers three consecutive days of national-series racing, beginning with the Craftsman Truck Series, continuing with the O'Reilly Auto Parts Series and ending with Sunday's Cup Series WÜRTH 400 presented by LIQUI MOLY.",
    planningSections: [
      { title: "Plan for three consecutive race days", body: "Texas Motor Speedway confirms a race every day from Friday, April 30 through Sunday, May 2, 2027. The Truck Series opens Friday, the O'Reilly Auto Parts Series races Saturday and the Cup Series WÜRTH 400 headlines Sunday." },
      { title: "Use the speedway's current fan guidance", body: "The track publishes policies, ticket packages, camping options and mobile-app information for race weekends. Recheck those first-party resources before arrival because start times and detailed on-track schedules are still to be announced." },
      { title: "Remember the speedway is in Denton County", body: "Although the venue uses a Fort Worth postal address, Texas Motor Speedway is in Denton County. Texas Defined links this authority page to the correct county context rather than assuming the city name determines the county." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-denton", label: "Explore Denton County", description: "Connect the speedway to the county it actually occupies." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas motorsports weekends." },
    ],
    sources: [
      { label: "Texas Motor Speedway official 2027 NASCAR weekend announcement", url: "https://www.texasmotorspeedway.com/media/news/texas-motor-speedway-host-nascar-tripleheader-weekend-april-may.html" },
      { label: "NASCAR official 2027 national-series schedule", url: "https://www.nascar.com/news-media/2026/08/26/2027-nascar-schedule-confirmed-dates-tracks-for-all-three-national-series/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche34Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
