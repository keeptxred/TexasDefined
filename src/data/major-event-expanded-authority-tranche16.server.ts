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
    startDate: "2027-03-11",
    endDate: "2027-03-13",
    dateNote: "The Sweetwater Chamber of Commerce now lists the Sweetwater Jaycees 69th Annual Rattlesnake Round Up for March 11–13, 2027. This confirms the date range and venue, not individual-day operating hours, admission or every activity. Confirm the organizer's final detailed schedule before travel.",
    venue: "Nolan County Coliseum",
    officialUrl: "https://sweetwatertexas.org/event/sweetwater-jaycees-69th-annual-rattlesnake-round-up/",
    sourceCheckedAt: "2026-11-07",
    whyItMatters: "Sweetwater's roundup began in 1958 and has become the city's signature March event, pairing the Nolan County Coliseum's rattlesnake demonstrations with a wider weekend of parades, carnival activity and community traditions. It is one of the most distinctive reasons to make a dedicated trip to Sweetwater, especially when combined with the city's aviation and West Texas history.",
    planningSections: [
      { title: "2027 dates: what we know", body: "The Sweetwater Chamber of Commerce lists the 69th annual Sweetwater Jaycees roundup for March 11–13, 2027, at Nolan County Coliseum. These are the chamber's published event dates, superseding the earlier estimate based on the usual second-weekend pattern. Daily shows, admission and related activities still require the organizer's current program." },
      { title: "What happens during roundup weekend", body: "The City of Sweetwater describes live rattlesnake demonstrations, parades, carnival activity and more around the annual event. The Nolan County Coliseum says the tradition started in 1958 and continues there each March, making the roundup both a visitor event and a long-running part of Sweetwater's civic identity." },
      { title: "Tickets, hours and the 2027 schedule", body: "Year-specific daily hours, admission details and the full 2027 program are not yet posted in the current official sources. Use the official event site for the final schedule before purchasing tickets or committing to a specific arrival time." },
      { title: "Make a weekend of Sweetwater", body: "The roundup can anchor a broader Nolan County trip. The National WASP WWII Museum at Avenger Field and the Pioneer City County Museum add two strong history stops, while the county guide connects the event to more of Sweetwater and the surrounding Big Country." },
    ],
    relatedLinks: [
      { href: "/destination/national-wasp-wwii-museum-sweetwater", label: "National WASP WWII Museum", description: "Visit Avenger Field and explore the story of the Women Airforce Service Pilots who trained in Sweetwater during World War II." },
      { href: "/destination/pioneer-city-county-museum-sweetwater", label: "Pioneer City County Museum", description: "Add Sweetwater and Nolan County history to the roundup weekend." },
      { href: "/county/nolan", label: "Explore Nolan County", description: "Find more places, communities and local resources around Sweetwater." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas spring events." },
    ],
    sources: [
      { label: "City of Sweetwater visitor guide — annual roundup recurrence and weekend activities", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
      { label: "Nolan County Coliseum annual-events page — roundup history and recurrence", url: "https://www.nolancountycoliseum.com/events" },
      { label: "Sweetwater Chamber confirmed 2027 Jaycees 69th annual dates and venue", url: "https://sweetwatertexas.org/event/sweetwater-jaycees-69th-annual-rattlesnake-round-up/" },
      { label: "Sweetwater Chamber historical 2026 roundup listing", url: "https://sweetwatertexas.org/event/sweetwater-jaycees-68th-annual-worlds-largest-rattlesnake-roundup/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche16Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
