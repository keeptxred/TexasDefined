import type { MajorEventAuthorityRecord } from "./major-event-authority.server";
import { getExpandedMajorEventAuthorityTranche35Server } from "./major-event-expanded-authority-tranche35.server";

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
    sourceCheckedAt: "2026-11-27",
    whyItMatters: "Formula E brings its all-electric world championship to Circuit of The Americas for the first Austin E-Prix, adding a new international motorsports weekend to the city's already deep racing calendar and marking one of the series' limited U.S. stops.",
    planningSections: [
      { title: "Race date is February 6; confirm the date on each ticket product", body: "Formula E's current Austin event page and global calendar both list Saturday, February 6, 2027 at COTA. The November 27 official ticket module now shows February 6 for both the main straight and Turn 15 grandstands, resolving the earlier February 5 label conflict. Both list general admission at $64 adult and $32 ages 3–15; confirm checkout fees and availability." },
      { title: "Plan for a COTA race day", body: "Circuit of The Americas sits southeast of central Austin and major race days can materially change traffic and parking demand. Use official transportation and parking guidance rather than normal venue assumptions." },
      { title: "Treat this as a new Austin event with provisional session details", body: "The 2027 race is Formula E's first Austin E-Prix and is set to debut its GEN4 competition cars. The organizer includes live music with race admission and describes a post-podium headline performance, interactive Fan Village and racing simulators. Artists and detailed race-session times remain unannounced; do not infer practice or qualifying times." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more of Austin and Travis County around the race." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas motorsports and sports events." },
    ],
    sources: [
      { label: "Current official championship calendar", url: "https://www.fiaformulae.com/en/calendar" },
      { label: "Formula E official Season 13 calendar", url: "https://www.fiaformulae.com/en/news/1074658/season-13-calendar-where-will-formula-e-be-racing-in-2026-27" },
      { label: "Formula E official Austin calendar announcement", url: "https://www.fiaformulae.com/en/news/1074657/formula-e-and-fia-unveil-record-breaking-21-race-2026-27-calendar-for-gen4-era" },
      { label: "Formula E — current Austin race and ticket information", url: "https://www.fiaformulae.com/en/austin" },
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
    officialUrl: "https://www.nascaratcota.com/",
    sourceCheckedAt: "2026-11-24",
    whyItMatters: "NASCAR returns to Circuit of The Americas for a March 5-7, 2027 road-course weekend, with national-series action culminating in the DuraMAX Texas Grand Prix and extending Austin's role as one of the country's most varied motorsports destinations.",
    planningSections: [
      { title: "Use March 5-7 as the race-weekend window", body: "NASCAR's official 2027 schedule announcement confirms the COTA weekend for March 5-7, with the Cup Series DuraMAX Texas Grand Prix on Sunday, March 7. The race organizer now identifies Friday March 5 as O'Reilly Auto Parts Series practice and qualifying, Saturday March 6 as that series' race and Sunday March 7 as the Cup Series race. The weekend is not three equivalent race days; check the dated session schedule for the specific ticket you buy." },
      { title: "Plan the circuit trip before arrival", body: "COTA is outside central Austin, so parking, shuttle and road-access choices matter. The organizer's Friday ticket page identifies Lot A as a closer preferred-parking option for Main Grandstand and Turn 1 seats and Lot E for Turns 12 and 15. These are separately offered parking products, not automatic admission benefits. Confirm your day's current parking map before buying." },
      { title: "Separate the weekend from Austin's other COTA events", body: "Formula 1, Formula E and other series use the same facility under different schedules and policies. Use NASCAR's current weekend guide for ticket access, allowed items, camping and fan programming. The official 2027 Sunday ticket page differentiates reserved grandstands from general admission at designated viewing areas; general admission does not provide a reserved seat or grandstand access. Compare single-day and weekend products before buying. The promoter advertises select youth weekend tickets from $10 for children 12 and under; verify the product and checkout conditions." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Turn the COTA weekend into a broader Austin-area trip." },
      { href: "/event/formula-1-united-states-grand-prix", label: "Formula 1 United States Grand Prix", description: "Compare another major COTA race weekend." },
      { href: "/events", label: "Texas events calendar", description: "Find other Texas sports and destination events." },
    ],
    sources: [
      { label: "NASCAR official 2027 schedule announcement", url: "https://www.nascar.com/news-media/2026/08/12/2027-nascar-schedule-announcements-latest-dates-tracks-and-changes/" },
      { label: "NASCAR official 2027 national-series schedule", url: "https://www.nascar.com/news-media/2026/08/26/2027-nascar-schedule-confirmed-dates-tracks-for-all-three-national-series/" },
      { label: "COTA official 2027 race weekend", url: "https://circuitoftheamericas.com/event/nascar/" },
      { label: "NASCAR at COTA official Friday program and preferred parking", url: "https://www.nascaratcota.com/events/nascar-friday/" },
      { label: "NASCAR at COTA official Saturday race", url: "https://www.nascaratcota.com/events/nascar-oreilly-auto-parts-series-race/" },
      { label: "NASCAR at COTA official Sunday ticket products", url: "https://www.nascaratcota.com/events/duramax-texas-grand-prix/tickets/" },
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
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "Texas Motor Speedway's 2027 NASCAR weekend delivers three consecutive days of national-series racing, beginning with the Craftsman Truck Series, continuing with the O'Reilly Auto Parts Series and ending with Sunday's Cup Series WÜRTH 400 presented by LIQUI MOLY.",
    planningSections: [
      { title: "Plan for three consecutive race days", body: "Texas Motor Speedway confirms a race every day from Friday, April 30 through Sunday, May 2, 2027. The Truck Series opens Friday, the O'Reilly Auto Parts Series races Saturday and the Cup Series WÜRTH 400 headlines Sunday." },
      { title: "Use the May 2 Cup race product and check youth-ticket conditions", body: "Texas Motor Speedway confirms the NASCAR Cup Series WÜRTH 400 on Sunday, May 2, 2027 and the Friday–Sunday tripleheader. The track currently advertises free youth admission Friday and Saturday and $10 on Sunday, subject to its stated age and accompanying-adult rules. Check exact seating and camping products and any updated race-session times before purchase." },
      { title: "Remember the speedway is in Denton County", body: "Although the venue uses a Fort Worth postal address, Texas Motor Speedway is in Denton County. The guide uses Denton County for local context rather than assuming the Fort Worth postal name determines the county." },
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
  return bySlug.get(slug) ?? getExpandedMajorEventAuthorityTranche35Server(slug);
}
