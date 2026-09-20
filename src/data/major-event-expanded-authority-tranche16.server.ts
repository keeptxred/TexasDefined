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
    dateNote: "The 2027 dates are a planning window derived from the event's standing second-weekend-in-March schedule. A dedicated 2027 organizer program has not yet been published, so confirm final dates, hours and admission before travel.",
    venue: "Nolan County Coliseum",
    officialUrl: "http://www.rattlesnakeroundup.net/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "Sweetwater's roundup began in 1958 and has become the city's signature March event, pairing the Nolan County Coliseum's rattlesnake demonstrations with a wider weekend of parades, carnival activity and community traditions. It is one of the most distinctive reasons to make a dedicated trip to Sweetwater, especially when combined with the city's aviation and West Texas history.",
    planningSections: [
      { title: "2027 dates: what we know", body: "Sweetwater's city visitor guide describes the roundup as the second full weekend in March, while the Nolan County Coliseum describes it as an annual second-weekend event. That standing pattern points to Friday, March 12 through Sunday, March 14, 2027. Treat those dates as the planning window until the Sweetwater Jaycees publish the year-specific schedule." },
      { title: "What happens during roundup weekend", body: "The City of Sweetwater describes live rattlesnake demonstrations, parades, carnival activity and more around the annual event. The Nolan County Coliseum says the tradition started in 1958 and continues there each March, making the roundup both a visitor event and a long-running part of Sweetwater's civic identity." },
      { title: "Tickets, hours and the 2027 schedule", body: "Year-specific daily hours, admission details and the full 2027 program are not yet posted in the current official sources. Use the official event site for the final schedule before purchasing tickets or committing to a specific arrival time." },
      { title: "Make a weekend of Sweetwater", body: "The roundup can anchor a broader Nolan County trip. The National WASP WWII Museum at Avenger Field and the Pioneer City County Museum add two strong history stops, while the county guide connects the event to more of Sweetwater and the surrounding Big Country." },
    ],
    relatedLinks: [
      { href: "/destination/national-wasp-wwii-museum-sweetwater", label: "National WASP WWII Museum", description: "Visit Avenger Field and explore the story of the Women Airforce Service Pilots who trained in Sweetwater during World War II." },
      { href: "/destination/pioneer-city-county-museum-sweetwater", label: "Pioneer City County Museum", description: "Add Sweetwater and Nolan County history to the roundup weekend." },
      { href: "/article/nolan-county-sweetwater-wasp-wind-railroads-big-country-texas", label: "Nolan County guide", description: "Go deeper on Sweetwater, railroads, wind energy, aviation history and the surrounding county." },
      { href: "/county/nolan", label: "Explore Nolan County", description: "Find more places, communities and local resources around Sweetwater." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas spring events." },
    ],
    sources: [
      { label: "City of Sweetwater visitor guide — annual roundup recurrence and weekend activities", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
      { label: "Nolan County Coliseum annual-events page — roundup history and recurrence", url: "https://www.nolancountycoliseum.com/events" },
      { label: "Sweetwater Chamber confirmed 2026 roundup listing", url: "https://sweetwatertexas.org/event/sweetwater-jaycees-68th-annual-worlds-largest-rattlesnake-roundup/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche16Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
