import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "parker-county-peach-festival",
    name: "Parker County Peach Festival",
    city: "Weatherford",
    countySlug: "parker",
    countyName: "Parker County",
    region: "prairies-lakes",
    category: "food",
    startDate: "2027-07-10",
    endDate: "2027-07-10",
    dateNote: "The organizer confirms the 42nd annual Parker County Peach Festival for Saturday, July 10, 2027 from 8 a.m. to 4 p.m. in Historic Downtown Weatherford and notes that the festival is always held on the second Saturday in July.",
    venue: "Historic Downtown Weatherford",
    officialUrl: "https://www.parkercountypeachfestival.org/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Parker County Peach Festival turns Weatherford's peach-growing identity into one of North Texas' largest one-day food and community festivals, combining local produce, food, arts and crafts, entertainment, children's activities and long-running traditions downtown.",
    planningSections: [
      { title: "Treat it as a concentrated one-day trip", body: "The organizer confirms the 2027 festival for 8 a.m. to 4 p.m. on Saturday, July 10. With more than 200 arts, crafts, food and activity booths plus two entertainment stages and two children's areas, an early arrival gives visitors the most useful planning margin." },
      { title: "Use the transportation plan", body: "The festival takes over Historic Downtown Weatherford. Check the organizer's current map, parking and shuttle information before traveling rather than assuming normal downtown parking will be available." },
      { title: "Build the day around Parker County peaches", body: "The festival's identity is agricultural rather than generic fairground entertainment. Make room for peach food, local growers, the Peach Food Competition and other traditions before filling the schedule with unrelated stops." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-parker", label: "Explore Parker County", description: "Connect the festival to Weatherford and the surrounding county." },
      { href: "/events", label: "Texas events calendar", description: "Compare other summer food festivals and small-town events." },
    ],
    sources: [
      { label: "Parker County Peach Festival official site", url: "https://www.parkercountypeachfestival.org/" },
      { label: "Parker County Peach Festival visitor information", url: "https://www.parkercountypeachfestival.org/information.html" },
    ],
  },
  {
    slug: "buc-days",
    name: "Buc Days",
    city: "Corpus Christi",
    countySlug: "nueces",
    countyName: "Nueces County",
    region: "gulf-coast",
    category: "rodeo",
    startDate: "2027-04-29",
    endDate: "2027-05-09",
    dateNote: "The organizer confirms the 2027 Buc Days festival window for April 29 through May 9. Individual attractions, rodeo performances, parades and concerts have their own schedules within that period, so use the official daily calendar before traveling.",
    venue: "Buc Days Festival Grounds and Hilliard Center",
    officialUrl: "https://bucdays.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Buc Days is a Corpus Christi spring tradition that combines the waterfront city's rodeo heritage with a carnival, parades, concerts, professional bull riding and youth programming, making the festival useful as both an event destination and a Gulf Coast trip anchor.",
    planningSections: [
      { title: "Choose the attraction before choosing the day", body: "The overall 2027 festival runs April 29 through May 9, but the rodeo, PBR, concerts, parades, carnival and other programs do not all operate on identical schedules. Start with the official event calendar for the attraction that matters most." },
      { title: "Rodeo visitors should target May 4-8", body: "The organizer lists Rodeo Corpus Christi for May 4-8, 2027 at 7 p.m. at Hilliard Center Arena. Treat those performances as fixed appointments and leave time for festival-ground activities before the arena event." },
      { title: "Use the festival as a Corpus Christi anchor", body: "Buc Days can support more than a single-event visit. Build waterfront, food and other Nueces County stops around the scheduled festival attraction instead of treating each component as a separate trip." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Build a broader Corpus Christi and Gulf Coast itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas rodeos and spring festivals." },
    ],
    sources: [
      { label: "Buc Days official site", url: "https://bucdays.com/" },
      { label: "Buc Days Stripes Carnival 2027", url: "https://bucdays.com/attractions/stripes-carnival/" },
      { label: "Rodeo Corpus Christi official page", url: "https://bucdays.com/rodeo-pbr/rodeo-corpus-christi/" },
    ],
  },
  {
    slug: "valero-texas-open",
    name: "Valero Texas Open",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "sport",
    startDate: "2027-03-29",
    endDate: "2027-04-04",
    venue: "TPC San Antonio — Oaks Course",
    officialUrl: "https://valerotexasopen.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Valero Texas Open gives San Antonio a nationally significant PGA TOUR week at TPC San Antonio, pairing elite professional golf with a Hill Country resort setting and a long-running Texas tournament tradition.",
    planningSections: [
      { title: "Use the full tournament week as the planning window", body: "The tournament's official fact sheet confirms March 29 through April 4, 2027. Practice, hospitality and competition days serve different kinds of visitors, so choose the day based on whether you want tournament rounds or the broader event-week experience." },
      { title: "Plan around TPC San Antonio", body: "The tournament is played on the Oaks Course at TPC San Antonio. Review official parking, shuttle, ticket and spectator policies before departure because a resort-course PGA TOUR event does not function like a walk-up municipal course visit." },
      { title: "Connect tournament day to San Antonio", body: "The golf event can be the fixed point of a larger San Antonio stay. Pair the tournament with other Bexar County attractions while protecting enough time for transportation, entry and walking the course." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a wider San Antonio itinerary around tournament week." },
      { href: "/sports", label: "Texas sports", description: "Explore more Texas sports destinations and events." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas events." },
    ],
    sources: [
      { label: "Valero Texas Open official site", url: "https://valerotexasopen.com/" },
      { label: "Valero Texas Open 2027 fact sheet", url: "https://valerotexasopen.com/facts/" },
      { label: "PGA TOUR 2027 schedule", url: "https://www.pgatour.com/article/news/latest/2026/08/26/pga-tour-announces-2027-schedule-through-tour-championship" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche14Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
