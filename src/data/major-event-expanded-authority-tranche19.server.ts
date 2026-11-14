import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "san-antonio-marathon",
    name: "San Antonio Marathon Weekend",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "sport",
    startDate: "2026-12-04",
    endDate: "2026-12-06",
    dateNote: "San Antonio Sports confirms the 2026 San Antonio Marathon weekend for December 4-6, with the SATX 5K on Friday and the marathon and half marathon on Sunday. This replaces the supplied seed inventory's obsolete Rock 'n' Roll San Antonio label: the Rock 'n' Roll Running Series left San Antonio after its 2024 event, and the locally organized San Antonio Marathon is now the current signature race weekend.",
    venue: "Hemisfair and downtown San Antonio",
    officialUrl: "https://sanantoniomarathon.com/",
    sourceCheckedAt: "2026-11-07",
    whyItMatters: "San Antonio Marathon Weekend is the city's current signature distance-running event, pairing a downtown 5K with marathon and half-marathon courses centered on Hemisfair. The locally organized weekend succeeds the former Rock 'n' Roll San Antonio era while keeping a major December running event in the Alamo City.",
    planningSections: [
      { title: "Use the current San Antonio Sports schedule", body: "The locally organized event runs December 4–6, 2026. The SATX 5K is Friday December 4 at 8 p.m.; the Sunday December 6 marathon and half marathon start at Hemisfair at 7:15 a.m. The Health & Fitness Expo runs before race day. Do not follow obsolete Rock 'n' Roll San Antonio schedules or purchase tickets from a similarly named older race." },
      { title: "Choose your race-day logistics before downtown fills", body: "The marathon and half marathon start at Hemisfair Sunday December 6 at 7:15 a.m. with a seven-hour marathon and four-hour half-marathon course limit. Friday's SATX 5K runs at 8 p.m. The organizer has published detailed street-closure and no-parking plans; review the current course and pedestrian-access map before driving into downtown." },
      { title: "Make the weekend part of a San Antonio visit", body: "The downtown start and finish make the race easy to pair with central San Antonio attractions. Give yourself recovery time and avoid scheduling a tightly packed sightseeing day immediately after the marathon if you are racing the full distance." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a wider San Antonio and Bexar County itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas sports and winter events." },
    ],
    sources: [
      { label: "San Antonio Marathon official site", url: "https://sanantoniomarathon.com/" },
      { label: "San Antonio Marathon 2026 official courses and exact race starts", url: "https://sanantoniomarathon.com/courses/" },
      { label: "San Antonio Marathon official 2026 road closures", url: "https://sanantoniomarathon.com/streetclosures/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche19Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
