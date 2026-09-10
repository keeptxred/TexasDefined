import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "sweetwater-rattlesnake-roundup",
    name: "Sweetwater Jaycees World's Largest Rattlesnake Roundup",
    city: "Sweetwater",
    countySlug: "nolan",
    countyName: "Nolan County",
    region: "panhandle",
    category: "culture",
    startDate: "2027-03-12",
    endDate: "2027-03-14",
    dateNote: "Sweetwater Rattlesnake Roundup 2027 planning window: March 12-14. The City of Sweetwater says the roundup is held on the second full weekend in March, and the Nolan County Coliseum says it is hosted annually on the second weekend in March. Those standing recurrence rules map to March 12-14 in 2027, but a dedicated 2027 organizer schedule has not yet been published; confirm the final dates, hours and program before travel.",
    venue: "Nolan County Coliseum",
    officialUrl: "http://www.rattlesnakeroundup.net/",
    sourceCheckedAt: "2026-09-10",
    whyItMatters: "The Sweetwater Jaycees World's Largest Rattlesnake Roundup is one of West Texas' most distinctive long-running civic events. Searchers looking for the Sweetwater Rattlesnake Roundup 2027 need a clear planning window plus an equally clear distinction between the standing March recurrence and the not-yet-published 2027 schedule.",
    planningSections: [
      { title: "Sweetwater Rattlesnake Roundup 2027: March 12-14 planning window", body: "The City of Sweetwater describes the roundup as the second full weekend in March, while the Nolan County Coliseum describes it as an annual second-weekend event. In 2027, that recurrence points to Friday, March 12 through Sunday, March 14. Texas Defined treats those dates as a recurrence-derived planning window—not a dedicated 2027 announcement—until the organizer publishes the year-specific schedule." },
      { title: "What the roundup weekend usually includes", body: "Sweetwater's current city visitor guide describes live rattlesnake demonstrations, parades, carnivals and more around the annual roundup. The local Chamber's confirmed 2026 listing ran Friday through Sunday at the Nolan County Coliseum, supporting the multi-day pattern, but 2026 hours and program details should not be carried forward as 2027 facts." },
      { title: "Wait for the 2027 schedule before locking in hours or tickets", body: "A dedicated 2027 program, daily hours and ticket details are not yet published in the current official sources. Use March 12-14 for lodging and broad trip planning, then recheck the Sweetwater Jaycees, City of Sweetwater and Nolan County Coliseum before purchasing or building a day-by-day itinerary." },
      { title: "Build in Sweetwater and Nolan County", body: "The roundup can anchor a wider West Texas weekend. Sweetwater's visitor guide highlights the National WASP WWII Museum, Pioneer City-County Museum, local parks and lakes, making it practical to build a broader Nolan County trip around the roundup instead of treating the coliseum as the only stop." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-nolan", label: "Explore Nolan County", description: "Connect the roundup to Sweetwater and the surrounding Big Country." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas spring events." },
    ],
    sources: [
      { label: "City of Sweetwater visitor guide — annual roundup recurrence", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
      { label: "Nolan County Coliseum annual-events page", url: "https://www.nolancountycoliseum.com/events" },
      { label: "Sweetwater Chamber confirmed 2026 roundup listing", url: "https://sweetwatertexas.org/event/sweetwater-jaycees-68th-annual-worlds-largest-rattlesnake-roundup/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche16Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
