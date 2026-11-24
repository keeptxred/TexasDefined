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
    dateNote: "The October 18, 2026 fundraiser at Laguna Gloria is complete. The published museum event page describes the fifth edition, not a 2027 booking window. No next-edition date is confirmed in this guide.",
    venue: "The Contemporary Austin — Laguna Gloria",
    officialUrl: "https://thecontemporaryaustin.org/event/the-very-rary-2026/",
    sourceCheckedAt: "2026-11-24",
    whyItMatters: "The Very ‘Rary is The Contemporary Austin's annual all-ages art fundraiser at Laguna Gloria, drawing more than 1,000 children and family members for hands-on art, performances and installations while supporting the museum's K-12 arts education programs.",
    planningSections: [
      { title: "Use the confirmed three-hour event window", body: "The 2026 event ran 2–5 p.m. with sponsor entry from 1 p.m. The museum listed $40 general admission and $35 members, including food and drink. Its summary said age four and under was free but its ticket details said under four; verify the next edition’s child-ticket rule directly rather than assuming either interpretation or a repeated price." },
      { title: "Expect an all-ages art experience", body: "The organizer describes a once-a-year afternoon with hands-on artmaking, wearable design, interactive installations and performances across the sculpture park. Families should review the current activity lineup and ticket terms before choosing how long to stay." },
      { title: "Plan for the Laguna Gloria campus", body: "Laguna Gloria is a 14-acre lakeside sculpture park rather than a conventional indoor event hall. For the 2026 event, the museum used complimentary off-site shuttles from the Austin State Supported Living Center and Camp Mabry, where adult passengers needed government ID. On-site parking was unavailable; the front gate served accessibility drop-offs. This was a special-event arrangement, not the park's everyday parking policy. Check the new event map before travel." },
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
