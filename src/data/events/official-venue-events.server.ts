import type { TexasEventRecord } from "./texas-event-record";

/**
 * Manually verified, first-party venue schedule snapshots.
 * Add an event only with a dated primary-source URL; do not claim to
 * automatically mirror the venue calendar. Expired records naturally vanish
 * from upcoming queries. A separate official-calendar link always remains.
 *
 * Source: https://www.choctawstadium.com/stadium-events/ (checked 2026-10-08).
 */
const choctawGames = [
  [
    "2026-10-08",
    "Martin vs. Sam Houston",
    "martin-vs-sam-houston-20261008"
  ],
  [
    "2026-10-16",
    "Lamar vs. Sam Houston",
    "lamar-vs-sam-houston-20261016"
  ],
  [
    "2026-10-23",
    "Arlington vs. Bowie",
    "arlington-vs-bowie-20261023"
  ],
  [
    "2026-10-30",
    "Aledo vs. Sam Houston",
    "aledo-vs-sam-houston-20261030"
  ],
  [
    "2026-11-05",
    "Sam Houston vs. Bowie",
    "sam-houston-vs-bowie-20261105"
  ]
] as const;

export function getOfficialVenueEventSnapshots(): TexasEventRecord[] {
  return choctawGames.map(([startDate, title, sourceSlug]): TexasEventRecord => {
    const url = `https://www.choctawstadium.com/event/${sourceSlug}/`;
    return {
      id: `official-venue:choctaw-stadium:${startDate}`,
      slug: sourceSlug,
      title,
      summary: "Arlington-area high-school football at Choctaw Stadium. Verify the schedule, admission and any changes with the stadium before traveling.",
      guidePath: `/events?venue=sports-venue%3Achoctaw-stadium&start=${startDate}&end=${startDate}#calendar`,
      startDate,
      startTime: "7:00 PM",
      venueId: "sports-venue:choctaw-stadium",
      venueName: "Choctaw Stadium",
      venuePath: "/sports-venue/choctaw-stadium",
      city: "Arlington",
      countySlug: "tarrant",
      countyName: "Tarrant County",
      region: "prairies-lakes",
      category: "sport",
      officialEventUrl: url,
      ticketing: {
        links: [{
          provider: "official",
          officialTicketUrl: "https://gofan.co/app/school/TX11743?activity=Football&gender=Boys&level=Varsity",
          saleStatus: "unknown",
          source: { kind: "official-venue", name: "Choctaw Stadium official event page", url },
          lastVerifiedAt: "2026-10-08",
          priority: 0,
        }],
        offers: [],
      },
      status: "scheduled",
      lastVerifiedAt: "2026-10-08",
      lastUpdatedAt: "2026-10-08",
      sourceName: "Choctaw Stadium official event calendar",
    };
  });
}
