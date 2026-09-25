import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface EventRecordWithWindows extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: EventRecordWithWindows[] = [
  {
    slug: "blanco-market-day",
    name: "Blanco Market Day 2026",
    city: "Blanco",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-10-17",
    endDate: "2026-12-19",
    occurrenceWindows: [
      { label: "October Market Day", startDate: "2026-10-17", endDate: "2026-10-17" },
      { label: "November Market Day", startDate: "2026-11-21", endDate: "2026-11-21" },
      { label: "Christmas Market", startDate: "2026-12-19", endDate: "2026-12-19" },
    ],
    dateNote:
      "After the September 24 source check, the remaining 2026 Blanco Market Days are October 17, November 21 and December 19. December 19 is identified by the organizer as the Christmas Market. These are three separate Saturdays, not continuous programming between October 17 and December 19.",
    venue: "Old Blanco County Courthouse grounds",
    officialUrl: "https://www.historicblanco.org/market-day",
    sourceCheckedAt: "2026-09-24",
    whyItMatters:
      "Blanco Market Day turns the Old Blanco County Courthouse square into a recurring small-town market rather than a once-a-year festival footprint. The series is organized by the courthouse preservation organization, so the market directly reinforces Blanco's historic-square visitor core while giving travelers a predictable Saturday anchor for downtown shops, food and nearby attractions.",
    planningSections: [
      {
        title: "Use the three remaining 2026 Saturdays, not the full date span",
        body:
          "The organizer lists October 17, November 21 and December 19 as the remaining 2026 Market Days after this guide's September 24 source check. December 19 is the Christmas Market. Texas Defined models those as separate occurrence windows so a visitor does not mistake the intervening weeks for continuous market days.",
      },
      {
        title: "The remaining markets use the regular 9 a.m.–4 p.m. schedule",
        body:
          "The current organizer page says Market Day normally runs from 9 a.m. to 4 p.m. on the third Saturday from March through December. The reduced 9 a.m.–3 p.m. summer hours apply to June and July, so the October, November and December dates remain within the regular published schedule unless the organizer posts a change.",
      },
      {
        title: "Start with the courthouse square",
        body:
          "The market is outdoors on the grounds of the Old Blanco County Courthouse at 300 Main Street. The courthouse directions page says parking is available around three sides of the square. Because the market occupies the historic center of town, arrive with enough time to park and walk rather than treating it like a roadside store with a dedicated lot.",
      },
      {
        title: "Make the courthouse part of the visit",
        body:
          "The Old Blanco County Courthouse visitor center and museum currently operate during the day on Saturdays. If both are open as published, combining the market with the building gives the visit more historical context than shopping alone. Recheck the courthouse page before travel for holiday or event-specific changes.",
      },
      {
        title: "Use Blanco for the rest of the day",
        body:
          "Blanco State Park, Buggy Barn Museum, the town's brewery and distillery cluster, downtown food and the larger Blanco County network are close enough to build around a market morning. Keep the market as the fixed event block, then choose one or two complementary stops instead of trying to cover the entire county in one day.",
      },
      {
        title: "Do not project the 2026 calendar into 2027",
        body:
          "The preservation society describes Market Day as a third-Saturday series from March through December, but the current event page publishes the specific 2026 calendar. Texas Defined does not convert that recurrence into unannounced 2027 dates; the organizer's next-year calendar should replace the current occurrence set when published.",
      },
    ],
    relatedLinks: [
      { href: "/destination/old-blanco-county-courthouse", label: "Old Blanco County Courthouse", description: "Tour the historic building and understand the preservation story behind the market venue." },
      { href: "/destination/blanco", label: "Explore Blanco", description: "Plan food, downtown, river access and other stops around Market Day." },
      { href: "/destination/blanco-state-park", label: "Blanco State Park", description: "Add a separate river block when current park and water conditions cooperate." },
      { href: "/destination/buggy-barn-museum-blanco", label: "Buggy Barn Museum", description: "Add Blanco's horse-drawn transportation and film-history collection." },
      { href: "/county/blanco", label: "Explore Blanco County", description: "Continue toward Johnson City, Hye, LBJ history and the wider Hill Country." },
      { href: "/events/hill-country-events", label: "Hill Country events", description: "Compare other source-checked event dates in the region." },
    ],
    sources: [
      { label: "Old Blanco County Courthouse — Blanco Market Day", url: "https://www.historicblanco.org/market-day" },
      { label: "Old Blanco County Courthouse — home", url: "https://www.historicblanco.org/" },
      { label: "Old Blanco County Courthouse — directions and parking", url: "https://www.historicblanco.org/directions" },
      { label: "Old Blanco County Courthouse — visitor center", url: "https://www.historicblanco.org/visitors-center" },
      { label: "Old Blanco County Courthouse Preservation Society — about", url: "https://www.historicblanco.org/about" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche49Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
