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
      "Use the UIL state schedule to choose the classification and championship match that anchors your visit because matches run throughout all three days.",
      "Curtis Culwell Center is the confirmed 2026 championship venue; recheck UIL ticket, parking and entry guidance for the exact day you attend.",
      "Build Garland and Dallas County stops around the fixed match schedule rather than assuming every session uses the same arrival or ticket rules.",
    ],
    officialUrl: "https://www.uiltexas.org/volleyball/state",
    officialSourceLabel: "UIL Volleyball State Tournament official page",
    sourceCheckedAt: checkedAt,
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
    summary: "The 2026 UIL Cross Country State Championships are scheduled for November 6–7 at Old Settlers Park in Round Rock.",
    whyItMatters: "UIL cross-country championship weekend brings boys and girls races across Texas public-school classifications to Old Settlers Park over two mornings of statewide finals.",
    planningNotes: [
      "Check the UIL race schedule for the classification and start time you want because championship races are staggered throughout Friday and Saturday mornings.",
      "Old Settlers Park is the confirmed 2026 site; use current UIL guidance for spectator access, parking and weather-related updates before traveling.",
      "Use Round Rock and Williamson County planning after the race window is fixed, especially if you are attending an early-morning championship.",
    ],
    officialUrl: "https://www.uiltexas.org/cross-country/state",
    officialSourceLabel: "UIL Cross Country State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Use the UIL state page for the final mat schedule, weigh-in timing and championship-session details because those operational pieces can be published after the dates are fixed.",
      "The Berry Center in Cypress is the confirmed 2027 venue; check current UIL spectator and parking guidance before event day.",
      "Plan any Houston-area stops around the tournament schedule rather than describing the event simply as downtown Houston; Cypress is the host community.",
    ],
    officialUrl: "https://www.uiltexas.org/wrestling/state",
    officialSourceLabel: "UIL Wrestling State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Use the UIL conference schedule to choose the correct competition day because classifications are distributed across the four-day championship window.",
      "The Fort Worth Convention Center is the confirmed 2027 venue; review UIL spectator guidance for tickets, downtown parking and any updated performance-order information.",
      "Allow extra downtown travel time on championship weekend and build broader Fort Worth plans only after the team's performance day is known.",
    ],
    officialUrl: "https://www.uiltexas.org/spirit/spirit-state-championships",
    officialSourceLabel: "UIL Spirit State Championships official page",
    sourceCheckedAt: checkedAt,
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH4_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch4BySlug(slug: string) {
  return bySlug.get(slug);
}
