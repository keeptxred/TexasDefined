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
    dateNote: "The City of Sweetwater says the roundup is held on the second full weekend in March, and the Nolan County Coliseum says it is hosted annually on the second weekend in March. Applying that published recurrence to 2027 yields March 12-14. Recheck the organizer when the dedicated 2027 schedule is released.",
    venue: "Nolan County Coliseum",
    officialUrl: "http://www.rattlesnakeroundup.net/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Sweetwater Jaycees World's Largest Rattlesnake Roundup is one of West Texas' most distinctive long-running civic events, drawing visitors to Nolan County for a multi-day program centered on the roundup along with a parade, carnival, demonstrations and related community events.",
    planningSections: [
      { title: "Use the second-full-weekend rule as the planning window", body: "Sweetwater's city visitor page states that the roundup is held on the second full weekend in March, while the Nolan County Coliseum describes it as an annual second-weekend event. Texas Defined maps that recurrence to March 12-14, 2027 while leaving year-specific hours, tickets and program details to the future organizer schedule." },
      { title: "Expect several related events rather than one attraction", body: "The city and local host sources describe a broader weekend that can include the roundup, parade, carnival, demonstrations and other community activities. Check the final 2027 program before travel so you know which pieces are at the coliseum and which occur elsewhere in Sweetwater." },
      { title: "Build in Sweetwater and Nolan County", body: "The roundup can anchor a wider West Texas weekend. Leave room for Sweetwater's railroad and aviation history, local museums and other Nolan County stops instead of treating the visit as only a few hours at the coliseum." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-nolan", label: "Explore Nolan County", description: "Connect the roundup to Sweetwater and the surrounding Big Country." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas spring events." },
    ],
    sources: [
      { label: "City of Sweetwater visitor guide", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
      { label: "Nolan County Coliseum annual-events page", url: "https://www.nolancountycoliseum.com/events" },
      { label: "Sweetwater Chamber 2026 roundup listing", url: "https://sweetwatertexas.org/event/sweetwater-jaycees-68th-annual-worlds-largest-rattlesnake-roundup/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche16Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
