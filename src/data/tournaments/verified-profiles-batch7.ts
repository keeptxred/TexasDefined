export interface VerifiedTournamentBatch7Profile {
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
}

const checkedAt = "2026-09-05";

export const VERIFIED_TOURNAMENT_BATCH7_PROFILES: readonly VerifiedTournamentBatch7Profile[] = [
  {
    slug: "ironman-texas",
    name: "Memorial Hermann IRONMAN Texas",
    eventCategory: "sport",
    categoryLabel: "Track & Endurance Competitions",
    categoryPath: "/events/tournaments-track-endurance",
    city: "The Woodlands",
    countySlug: "montgomery",
    countyName: "Montgomery County",
    venue: "Northshore Park / The Woodlands",
    startDate: "2027-04-24",
    endDate: "2027-04-24",
    dateLabel: "April 24, 2027",
    summary: "Memorial Hermann IRONMAN Texas is scheduled for April 24, 2027 in The Woodlands, with the race anchored around Lake Woodlands, Town Green Park and The Woodlands Waterway.",
    whyItMatters: "IRONMAN Texas is one of the state's signature endurance events, bringing a full-distance 2.4-mile swim, 112-mile bike leg and 26.2-mile run to The Woodlands and serving as a major destination weekend for athletes and spectators.",
    planningNotes: [
      "Visit The Woodlands publishes April 24, 2027 as the confirmed host date, and The Woodlands Township's host agreement reserves the local event footprint for that date; recheck IRONMAN's athlete guide when the 2027 edition is released.",
      "The race begins around Lake Woodlands and uses multiple public spaces and road segments rather than one closed arena, so spectator access, road closures and parking should be planned from the current race-week guidance.",
      "Use The Woodlands and Montgomery County as the trip base, but remember the bike course extends beyond the immediate park footprint and can affect regional road access on race day.",
    ],
    officialUrl: "https://www.visitthewoodlands.com/event/memorial-hermann-ironman-texas/2980/",
    officialSourceLabel: "Visit The Woodlands official IRONMAN Texas host page",
    sourceCheckedAt: checkedAt,
  },
  {
    slug: "world-skeet-shooting-championships",
    name: "World Skeet Championships",
    eventCategory: "sport",
    categoryLabel: "Shooting & Archery Tournaments",
    categoryPath: "/events/tournaments-shooting-archery",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "National Shooting Complex",
    startDate: "2026-09-25",
    endDate: "2026-10-03",
    dateLabel: "September 25–October 3, 2026",
    summary: "The 2026 World Skeet Championships run September 25 through October 3 at the National Shooting Complex in San Antonio.",
    whyItMatters: "The World Skeet Championships are the National Skeet Shooting Association's premier annual championship, bringing competitors to the association's San Antonio home range for a multi-day world-title program.",
    planningNotes: [
      "The NSSA championship page lists the main 2026 championship window as September 25 through October 3; use the current event program for individual gauges, practice and registration timing.",
      "NSSA's first-timer guidance begins arrival-oriented event information on September 24, so competitors should distinguish early check-in or preliminary activity from the published main championship start date.",
      "The National Shooting Complex is a large northwest San Antonio range; use current grounds maps, registration instructions and lodging guidance before selecting daily arrival times.",
    ],
    officialUrl: "https://mynssa.nssa-nsca.org/find-a-shoot/world-championship/",
    officialSourceLabel: "NSSA World Skeet Championships official page",
    sourceCheckedAt: checkedAt,
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH7_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch7BySlug(slug: string) {
  return bySlug.get(slug);
}
