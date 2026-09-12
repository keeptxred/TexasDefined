export interface VerifiedTournamentOccurrenceWindow {
  label?: string;
  startDate: string;
  endDate?: string;
}

export interface VerifiedTournamentBatch8Profile {
  slug: string;
  name: string;
  eventCategory: "sport" | "culture";
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
  occurrenceWindows?: readonly VerifiedTournamentOccurrenceWindow[];
}

const checkedAt = "2026-09-05";

export const VERIFIED_TOURNAMENT_BATCH8_PROFILES: readonly VerifiedTournamentBatch8Profile[] = [
  {
    slug: "the-frisco-bowl",
    name: "Frisco Bowl",
    eventCategory: "sport",
    categoryLabel: "Football Bowls & Classics",
    categoryPath: "/events/tournaments-football",
    city: "Frisco",
    countySlug: "collin",
    countyName: "Collin County",
    venue: "Ford Center at The Star",
    startDate: "2026-12-23",
    endDate: "2026-12-23",
    dateLabel: "December 23, 2026",
    summary: "The 2026 Frisco Bowl is scheduled for December 23 at Ford Center at The Star in Frisco, with kickoff at 8 p.m. Central.",
    whyItMatters: "The Frisco Bowl is an ESPN Events-owned NCAA postseason game that gives North Texas another nationally televised bowl night and turns The Star into a destination for visiting teams and fans during Bowl Season.",
    planningNotes: [
      "The official Frisco Bowl and ESPN Events sources list December 23, 2026, with an 8 p.m. Central kickoff; recheck the bowl site after team selections for matchup and final gameday details.",
      "The 2026 game is at Ford Center at The Star, not Toyota Stadium, so use The Star's current parking, entry and bag-policy information when planning arrival.",
      "Frisco is hosting two separate ESPN bowl games in December 2026; verify that tickets, parking and event communications specifically reference the Frisco Bowl on December 23 rather than the December 15 Frisco Football Classic.",
    ],
    officialUrl: "https://thefriscobowl.com/",
    officialSourceLabel: "Frisco Bowl official site",
    sourceCheckedAt: checkedAt,
  },
  {
    slug: "uil-state-marching-band-championships",
    name: "UIL State Marching Band Championships",
    eventCategory: "culture",
    categoryLabel: "Dance, Cheer & Music Competitions",
    categoryPath: "/events/tournaments-dance-cheer-music",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "Alamodome",
    startDate: "2026-11-02",
    endDate: "2026-11-11",
    dateLabel: "November 2–4 and November 9–11, 2026",
    summary: "The 2026 UIL State Marching Band Championships are scheduled in two Alamodome windows: Classes 1A/3A/5A on November 2–4 and Classes 2A/4A/6A on November 9–11.",
    whyItMatters: "UIL's state marching contests bring Texas high school bands through preliminaries and finals by classification, creating two distinct championship trips to San Antonio rather than one continuous multi-day event.",
    planningNotes: [
      "Use the detailed UIL State Open Class Marching Band Contest page for the competition sessions: 1A/3A/5A run November 2–4, while 2A/4A/6A run November 9–11 at the Alamodome.",
      "Do not treat November 2–11 as one continuous event. Choose the classification window first, then use UIL's posted performance schedule for the exact prelim or final session you need.",
      "The broader UIL calendar card begins the first event block on November 1, while the detailed contest schedule starts performances November 2; Texas Defined uses the more specific session schedule and recommends a final UIL check before travel.",
    ],
    officialUrl: "https://www.uiltexas.org/music/marching-band/state",
    officialSourceLabel: "UIL State Open Class Marching Band Contest official page",
    sourceCheckedAt: checkedAt,
    occurrenceWindows: [
      { label: "1A/3A/5A contests", startDate: "2026-11-02", endDate: "2026-11-04" },
      { label: "2A/4A/6A contests", startDate: "2026-11-09", endDate: "2026-11-11" },
    ],
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH8_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch8BySlug(slug: string) {
  return bySlug.get(slug);
}
