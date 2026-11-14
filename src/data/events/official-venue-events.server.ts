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
      summary: "Arlington-area high-school football at Choctaw Stadium. The stadium publishes a shared GoFan school listing and says game tickets go on sale the preceding Sunday. Open this exact stadium game page to choose the correct matchup; a general school listing is not a verified game-specific checkout.",
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
      // The stadium sends ALL 2026 fixtures to the same GoFan school catalog,
      // including games not yet on sale. Until the organizer publishes a URL
      // identifying this precise game, do not label the catalog as a verified
      // event-specific "Official Tickets" checkout. The exact official game
      // page above still links to the stadium's approved GoFan selector.
      status: "scheduled",
      lastVerifiedAt: "2026-10-08",
      lastUpdatedAt: "2026-10-08",
      sourceName: "Choctaw Stadium official event calendar",
    };
  });
}
