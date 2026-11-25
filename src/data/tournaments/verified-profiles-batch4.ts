export interface VerifiedTournamentBatch4Profile {
  slug: string;
  name: string;
  categoryLabel: string;
  categoryPath: string;
  city: string;
  countySlug: string;
  countyName: string;
  venue: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  summary: string;
  whyItMatters: string;
  planningNotes: readonly [string, string, string];
  officialUrl: string;
  officialSourceLabel: string;
  sourceCheckedAt: string;
}

const checkedAt = "2026-09-05";

export const VERIFIED_TOURNAMENT_BATCH4_PROFILES: readonly VerifiedTournamentBatch4Profile[] = [
  {
    slug: "uil-volleyball-state-tournament",
    name: "UIL Volleyball State Tournament",
    categoryLabel: "Volleyball Tournaments",
    categoryPath: "/events/tournaments-volleyball",
    city: "Garland",
    countySlug: "dallas",
    countyName: "Dallas County",
    venue: "Curtis Culwell Center",
    startDate: "2026-11-19",
    endDate: "2026-11-21",
    dateLabel: "November 19–21, 2026",
    summary: "The 2026 UIL Volleyball State Tournament runs November 19–21 at the Curtis Culwell Center in Garland.",
    whyItMatters: "The UIL volleyball championship brings Texas public-school title matches across classifications to one North Texas arena over three concentrated days.",
    planningNotes: [
      "UIL confirms November 19–21, 2026 at Curtis Culwell Center in Garland. Thursday has 1A and 2A finals, Friday has 3A/4A finals, and Saturday has 5A/6A finals; verify the division-specific match time in the published UIL state schedule.",
      "Curtis Culwell Center is the official 2026 venue. UIL says live match webcasts are carried on the NFHS Network with a subscription; do not advertise them as universally free or confuse the volleyball stream with the free football championship broadcast arrangement. Verify current venue admission and parking rules before travel.",
      "Build Garland and Dallas County stops around the fixed match schedule rather than assuming every session uses the same arrival or ticket rules.",
    ],
    officialUrl: "https://www.uiltexas.org/volleyball/state",
    officialSourceLabel: "UIL Volleyball State Tournament official page",
    sourceCheckedAt: "2026-11-07",
  },
  {
    slug: "uil-cross-country-state-championships",
    name: "UIL Cross Country State Championships",
    categoryLabel: "Track & Endurance Competitions",
    categoryPath: "/events/tournaments-track-endurance",
    city: "Round Rock",
    countySlug: "williamson",
    countyName: "Williamson County",
    venue: "Old Settlers Park",
    startDate: "2026-11-06",
    endDate: "2026-11-07",
    dateLabel: "November 6–7, 2026",
    summary: "The 2026 UIL Cross Country State Championships were held November 6–7 at Old Settlers Park in Round Rock.",
    whyItMatters: "UIL cross-country championship weekend brings boys and girls races across Texas public-school classifications to Old Settlers Park over two mornings of statewide finals.",
    planningNotes: [
      "The November 6–7, 2026 meet is complete. UIL’s results show Friday races for 2A, 4A and 6A and Saturday races for 1A, 3A and 5A. The organizer has not confirmed the next edition in the reviewed schedule.",
      "The 2026 meet used 3,200-meter courses for 1A–4A girls and 5-kilometer courses for 5A–6A girls and all boys divisions. UIL links full official race results from each classification’s row; those results are historical, not a future start list.",
      "For a future spectator trip, wait for UIL’s next dated race schedule and venue-access instructions. The 2026 event took place at Old Settlers Park in Round Rock.",
    ],
    officialUrl: "https://www.uiltexas.org/cross-country/state",
    officialSourceLabel: "UIL Cross Country State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-wrestling-state-championships",
    name: "UIL Wrestling State Championships",
    categoryLabel: "Martial Arts & Combat Sports",
    categoryPath: "/events/tournaments-combat-sports",
    city: "Cypress",
    countySlug: "harris",
    countyName: "Harris County",
    venue: "Berry Center",
    startDate: "2027-02-12",
    endDate: "2027-02-13",
    dateLabel: "February 12–13, 2027",
    summary: "The 2027 UIL Wrestling State Championships are scheduled for February 12–13 at the Berry Center in Cypress.",
    whyItMatters: "The UIL wrestling championships concentrate Texas public-school boys and girls title brackets at the Berry Center, creating a two-day statewide championship event in northwest Harris County.",
    planningNotes: [
      "UIL confirms the 2027 state tournament February 12–13 at Berry Center in Cypress. Its state website still displays a timetable labelled 2025–2026; those mat and weigh-in times should not be reused as a confirmed 2027 schedule. Check the 2027 event-day update before planning session arrival.",
      "The official 2026–27 UIL wrestling calendar identifies February 5–6 regionals followed by February 12–13 state finals. Confirm whether the spectator session you want is boys or girls and obtain current parking and digital ticket instructions before departure.",
      "Plan any Houston-area stops around the tournament schedule rather than describing the event simply as downtown Houston; Cypress is the host community.",
    ],
    officialUrl: "https://www.uiltexas.org/wrestling/state",
    officialSourceLabel: "UIL Wrestling State Championships official page",
    sourceCheckedAt: "2026-11-15",
  },
  {
    slug: "uil-spirit-state-championships",
    name: "UIL Spirit State Championships",
    categoryLabel: "Dance, Cheer & Music Competitions",
    categoryPath: "/events/tournaments-dance-cheer-music",
    city: "Fort Worth",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    venue: "Fort Worth Convention Center",
    startDate: "2027-01-13",
    endDate: "2027-01-16",
    dateLabel: "January 13–16, 2027",
    summary: "The 2027 UIL Spirit State Championships run January 13–16 at the Fort Worth Convention Center.",
    whyItMatters: "UIL Spirit brings Texas school cheer programs across classifications and the coed division to downtown Fort Worth for four days of qualifying and state-final performances.",
    planningNotes: [
      "UIL confirms January 13–16, 2027 at Fort Worth Convention Center, but division-by-day classifications and spectator maps are still marked TBA. Buy the correct classification ticket only after checking UIL's current performance order.",
      "Spectator tickets are digital through HomeTown Ticketing and sold by conference. UIL states there are no refunds; the scanned ticket is exchanged for a venue-entry wristband. Review the official spectator information before purchase.",
      "The Fort Worth Stock Show Parade may affect downtown traffic and parking on Saturday morning. Allow additional arrival time, and verify your team's conference and day before committing to other Fort Worth plans.",
    ],
    officialUrl: "https://www.uiltexas.org/spirit/spirit-state-championships",
    officialSourceLabel: "UIL Spirit State Championships official page",
    sourceCheckedAt: "2026-11-15",
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH4_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch4BySlug(slug: string) {
  return bySlug.get(slug);
}
