import type { TexasEventRecord } from "./texas-event-record";

/**
 * 2027 weekend dates as explicitly scheduled on the original Tyler County
 * Dogwood Festival Association website in Woodville, TEXAS.
 * Current subpage program details still show 2026 and must NEVER be reused
 * as 2027 hours, admission, performances, or parade route.
 */
const records: TexasEventRecord[] = [
  {
    id: "curated-tyler-county-dogwood-2027:festival-of-the-arts",
    slug: "tyler-county-dogwood-festival-of-the-arts",
    title: "Tyler County Dogwood Festival — Festival of the Arts Weekend",
    summary: "The Tyler County Dogwood Festival Association in Woodville schedules its Festival of the Arts Weekend for March 21, 2027. Its detailed Festival of the Arts subpage still displays a 2026 program, so its dinner and museum activity hours, ticket prices, and venues should NOT be assumed for 2027. Confirm the updated program with the organizer before traveling.",
    guidePath: "/events?location=county%3Atyler&start=2027-03-21&end=2027-03-21#calendar",
    startDate: "2027-03-21",
    city: "Woodville",
    countySlug: "tyler",
    countyName: "Tyler County",
    region: "east-texas",
    category: "culture",
    venueName: "Woodville and Tyler County Dogwood Festival sites (2027 locations to be confirmed)",
    officialEventUrl: "https://www.tylercountydogwoodfestival.org/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Tyler County Dogwood Festival Association — original 2027 festival dates",
  },
  {
    id: "curated-tyler-county-dogwood-2027:western-weekend",
    slug: "tyler-county-dogwood-western-weekend",
    title: "Tyler County Dogwood Festival — Western Weekend",
    summary: "The official Tyler County Dogwood Festival website confirms Western Weekend March 26–27, 2027, in the Woodville area. The separate Western Weekend detail page continues to list March 27–28, 2026 activities. Those are prior-edition parade, rodeo and mutton-busting times, NOT a verified 2027 daily schedule. Confirm the 2027 venue, rodeo times and admission with the association.",
    guidePath: "/events?location=county%3Atyler&start=2027-03-26&end=2027-03-27#calendar",
    startDate: "2027-03-26",
    endDate: "2027-03-27",
    city: "Woodville",
    countySlug: "tyler",
    countyName: "Tyler County",
    region: "east-texas",
    category: "culture",
    venueName: "Woodville area Dogwood Festival venues (confirm 2027 rodeo and parade access)",
    officialEventUrl: "https://www.tylercountydogwoodfestival.org/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Tyler County Dogwood Festival Association — original 2027 festival dates",
  },
  {
    id: "curated-tyler-county-dogwood-2027:queens-weekend",
    slug: "tyler-county-dogwood-queens-weekend",
    title: "Tyler County Dogwood Festival — Queen's Weekend",
    summary: "The Tyler County Dogwood Festival Association schedules Queen's Weekend for April 3, 2027, in Woodville. Its Queen's Weekend subpage currently shows its April 4, 2026 Dogwood Dash, parade, arts and coronation schedule; those precise program hours, roads and admission rules have NOT been verified for 2027. Check the original association's new edition schedule before visiting.",
    guidePath: "/events?location=county%3Atyler&start=2027-04-03&end=2027-04-03#calendar",
    startDate: "2027-04-03",
    city: "Woodville",
    countySlug: "tyler",
    countyName: "Tyler County",
    region: "east-texas",
    category: "culture",
    venueName: "Woodville town festival area (confirm individual 2027 sites)",
    officialEventUrl: "https://www.tylercountydogwoodfestival.org/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Tyler County Dogwood Festival Association — original 2027 festival dates",
  },
];

export function getVerifiedTylerCountyDogwoodEvents2027(): TexasEventRecord[] {
  return records.map(event => ({...event}));
}
