import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "the-very-rary",
    name: "The Very ‘Rary",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    dateNote: "The Contemporary Austin confirms The Very ‘Rary 2026 for Sunday, October 18 from 2-5 p.m. at Laguna Gloria. The supplied discovery inventory names a March 2027 ‘Critter Ball,’ but that label is not present in the museum's current event calendar. Texas Defined therefore uses the organizer-confirmed annual family fundraiser without asserting that it is a formal rename or successor to the seed entry.",
    venue: "The Contemporary Austin — Laguna Gloria",
    officialUrl: "https://thecontemporaryaustin.org/event/the-very-rary-2026/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Very ‘Rary is The Contemporary Austin's annual all-ages art fundraiser at Laguna Gloria, drawing more than 1,000 children and family members for hands-on art, performances and installations while supporting the museum's K-12 arts education programs.",
    planningSections: [
      { title: "Use the confirmed three-hour event window", body: "The museum lists The Very ‘Rary 2026 for Sunday, October 18 from 2-5 p.m. at Laguna Gloria. Treat that organizer-published window as the fixed appointment and recheck ticket availability and arrival instructions shortly before the event." },
      { title: "Expect an all-ages art experience", body: "The organizer describes a once-a-year afternoon with hands-on artmaking, wearable design, interactive installations and performances across the sculpture park. Families should review the current activity lineup and ticket terms before choosing how long to stay." },
      { title: "Plan for the Laguna Gloria campus", body: "Laguna Gloria is a 14-acre lakeside sculpture park rather than a conventional indoor event hall. Check current parking, accessibility and weather guidance, and leave enough time to move through the grounds." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect the event to a broader Austin arts and culture itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts, family and fall events." },
    ],
    sources: [
      { label: "The Contemporary Austin — The Very ‘Rary 2026", url: "https://thecontemporaryaustin.org/event/the-very-rary-2026/" },
      { label: "The Contemporary Austin — The Very ‘Rary annual event", url: "https://thecontemporaryaustin.org/the-very-rary/" },
      { label: "The Contemporary Austin — event support", url: "https://thecontemporaryaustin.org/support/event-support/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche24Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
