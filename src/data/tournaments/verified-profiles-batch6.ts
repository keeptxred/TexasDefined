export interface VerifiedTournamentBatch6Profile {
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

export const VERIFIED_TOURNAMENT_BATCH6_PROFILES: readonly VerifiedTournamentBatch6Profile[] = [
  {
    slug: "nsca-national-sporting-clays-championship",
    name: "NSCA National Sporting Clays Championship",
    eventCategory: "sport",
    categoryLabel: "Shooting & Archery Tournaments",
    categoryPath: "/events/tournaments-shooting-archery",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "National Shooting Complex",
    startDate: "2027-10-16",
    endDate: "2027-10-24",
    dateLabel: "October 16–24, 2027",
    summary: "The 2027 NSCA National Sporting Clays Championship is scheduled for October 16–24 at the National Shooting Complex in San Antonio.",
    whyItMatters: "The National Sporting Clays Championship is the NSCA’s premier championship and brings top competitors from across the country to the association’s San Antonio headquarters for a nine-day national event.",
    planningNotes: [
      "Use the NSCA Championship Tour page for the current championship window and final event-program updates as registration and individual disciplines are published.",
      "The National Shooting Complex is on San Antonio’s northwest side at 5931 Roft Road; use the complex’s current maps, directions and event guidance before traveling.",
      "Plan San Antonio and Bexar County stops around the championship sessions you intend to attend or compete in rather than assuming every day uses the same schedule.",
    ],
    officialUrl: "https://nsca.nssa-nsca.org/nsca-championship-tour/",
    officialSourceLabel: "NSCA Championship Tour official page",
    sourceCheckedAt: checkedAt,
  },
  {
    slug: "texas-state-science-and-engineering-fair",
    name: "Texas Science & Engineering Fair",
    eventCategory: "culture",
    categoryLabel: "Academic, Agricultural & Trade Competitions",
    categoryPath: "/events/tournaments-academic-agricultural",
    city: "College Station",
    countySlug: "brazos",
    countyName: "Brazos County",
    venue: "Texas A&M University Student Recreation Center",
    startDate: "2027-04-02",
    endDate: "2027-04-03",
    dateLabel: "April 2–3, 2027",
    summary: "The 2027 Texas Science & Engineering Fair is scheduled for April 2–3 at Texas A&M University in College Station.",
    whyItMatters: "TXSEF is Texas’s statewide science and engineering competition for students who advance from regional fairs, bringing hundreds of projects, judges and STEM disciplines together at Texas A&M.",
    planningNotes: [
      "Students qualify through an eligible Texas Regional Fair, and the official FAQ lists a $50 per-student registration fee. Every project must submit a virtual board and overview video. Regional entry deadlines vary, and incomplete late registrations cannot compete; do not mistake the fair for public walk-in project entry.",
      "The official TXSEF site lists Texas A&M University in College Station. Family visitor access on Friday April 2 covers student check-in/display 9:30 a.m.–5 p.m. and Night at the ZACH 6–9 p.m.; Saturday April 3 judging-area access is restricted to finalists, staff and judges, so families cannot plan to watch judging inside.",
      "The organizer lists the Saturday April 3 awards ceremony for 7:30–9 p.m. and poster breakdown 9–10 p.m. Confirm the actual family arrival and awards access instructions rather than assuming the competition hall is open all day. Plan College Station lodging around the two distinct schedules.",
    ],
    officialUrl: "https://txsef.tamu.edu/",
    officialSourceLabel: "Texas A&M University Texas Science & Engineering Fair official site",
    sourceCheckedAt: "2026-11-24",
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH6_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch6BySlug(slug: string) {
  return bySlug.get(slug);
}
