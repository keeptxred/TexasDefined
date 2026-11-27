export interface VerifiedTournamentBatch3Profile {
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

export const VERIFIED_TOURNAMENT_BATCH3_PROFILES: readonly VerifiedTournamentBatch3Profile[] = [
  {
    slug: "uil-football-state-championships",
    name: "UIL Football State Championships",
    categoryLabel: "Football Bowls & Classics",
    categoryPath: "/events/tournaments-football",
    city: "Arlington",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    venue: "AT&T Stadium",
    startDate: "2026-12-16",
    endDate: "2026-12-19",
    dateLabel: "December 16–19, 2026",
    summary: "The 2026 UIL Football State Championships run December 16–19 at AT&T Stadium in Arlington.",
    whyItMatters: "UIL football championship week brings every Texas public-school football classification to one Arlington venue, making it one of the state's most concentrated high-school sports traditions.",
    planningNotes: [
      "UIL’s official 2026 bracket-free title schedule lists December 16: 1A Six-Man Division II 11 a.m., 1A Six-Man Division I 2 p.m., 2A Division II 7 p.m.; December 17: 3A Division II 11 a.m., 2A Division I 3 p.m., 3A Division I 7 p.m.; December 18: 5A Division II 11 a.m., 4A Division II 3 p.m., 6A Division II 7 p.m.; December 19: 5A Division I 11 a.m., 4A Division I 3 p.m., 6A Division I 7 p.m., all at AT&T Stadium. Participating teams are not yet shown and must not be invented.",
      "UIL and broadcaster Nexstar announced free access to all 12 title games across participating Texas television stations and streaming platforms for December 16–19. Channel and device access depends on market and distributor; confirm official UIL media information rather than assuming one statewide channel. AT&T Stadium ticketing and parking are separate from watching remotely; plan around the actual title-game session, not a generic all-day ticket assumption.",
      "Use Texas Defined's Tarrant County and football coverage to build a broader Arlington or Fort Worth trip around championship day.",
    ],
    officialUrl: "https://www.uiltexas.org/football/state",
    officialSourceLabel: "UIL Football State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-boys-basketball-state-tournament",
    name: "UIL Boys Basketball State Championships",
    categoryLabel: "Basketball Tournaments",
    categoryPath: "/events/tournaments-basketball",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "Alamodome",
    startDate: "2027-03-11",
    endDate: "2027-03-13",
    dateLabel: "March 11–13, 2027",
    summary: "The 2027 UIL Boys Basketball State Championships are scheduled for March 11–13 at the Alamodome in San Antonio.",
    whyItMatters: "The UIL boys basketball championships concentrate Texas public-school title games across classifications into a single San Antonio weekend.",
    planningNotes: [
      "The provisional UIL schedule assigns 1A and 2A finals to March 11, 3A and 4A to March 12, and 5A and 6A to March 13. Each day lists two late-morning or early-afternoon games and two evening games.",
      "The three days are at the Alamodome; the schedule is subject to change and the school fields are still blank. Check UIL and venue ticket and entry rules before choosing a session.",
      "Pair championship attendance with Bexar County and San Antonio planning once your game day is fixed.",
    ],
    officialUrl: "https://www.uiltexas.org/basketball/state-boys",
    officialSourceLabel: "UIL Boys Basketball State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-girls-basketball-state-tournament",
    name: "UIL Girls Basketball State Championships",
    categoryLabel: "Basketball Tournaments",
    categoryPath: "/events/tournaments-basketball",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "Alamodome",
    startDate: "2027-03-04",
    endDate: "2027-03-06",
    dateLabel: "March 4–6, 2027",
    summary: "The 2027 UIL Girls Basketball State Championships are scheduled for March 4–6 at the Alamodome in San Antonio.",
    whyItMatters: "The UIL girls basketball championships bring Texas public-school title games across classifications to the Alamodome over one concentrated championship weekend.",
    planningNotes: [
      "The provisional UIL schedule assigns 1A and 2A finals to March 4, 3A and 4A to March 5, and 5A and 6A to March 6. Division II precedes Division I within each classification.",
      "The official schedule lists four finals per day at the Alamodome but does not yet identify competing schools. Check for changes and session-specific admission before buying.",
      "Use the Bexar County connection to turn a championship visit into a broader San Antonio trip without crowding the game-day schedule.",
    ],
    officialUrl: "https://www.uiltexas.org/basketball/state-girls",
    officialSourceLabel: "UIL Girls Basketball State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-baseball-state-tournament",
    name: "UIL Baseball State Championships",
    categoryLabel: "Baseball & Softball Tournaments",
    categoryPath: "/events/tournaments-baseball-softball",
    city: "Round Rock",
    countySlug: "williamson",
    countyName: "Williamson County",
    venue: "Dell Diamond",
    startDate: "2027-06-10",
    endDate: "2027-06-12",
    dateLabel: "June 10–12, 2027",
    summary: "The 2027 UIL Baseball State Championships are scheduled for June 10–12 at Dell Diamond in Round Rock.",
    whyItMatters: "The UIL baseball championships bring public-school title games across classifications to Dell Diamond, creating a three-day statewide high-school baseball destination in Round Rock.",
    planningNotes: [
      "UIL assigns the 2A and 3A finals to Thursday June 10, the 4A and 5A finals to Friday June 11, and the 1A and 6A finals to Saturday June 12. Thursday and Friday have four scheduled games, Saturday three. Choose your classification before making travel plans.",
      "The published Dell Diamond schedule gives morning, midday and afternoon or evening start times. School matchups remain blank; confirm the participating teams and separate ticket arrangements with UIL before purchase.",
      "Build any additional Round Rock or Williamson County stops around the game schedule rather than assuming a full free day between sessions.",
    ],
    officialUrl: "https://www.uiltexas.org/baseball/state",
    officialSourceLabel: "UIL Baseball State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-softball-state-tournament",
    name: "UIL Softball State Championships",
    categoryLabel: "Baseball & Softball Tournaments",
    categoryPath: "/events/tournaments-baseball-softball",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    venue: "Red & Charline McCombs Field",
    startDate: "2027-06-03",
    endDate: "2027-06-05",
    dateLabel: "June 3–5, 2027",
    summary: "The 2027 UIL Softball State Championships are scheduled for June 3–5 at Red & Charline McCombs Field in Austin.",
    whyItMatters: "The UIL softball championships concentrate Texas public-school title games across classifications at the University of Texas softball venue over three days.",
    planningNotes: [
      "The UIL schedule assigns 2A and 3A finals to June 3, 4A and 5A to June 4, and 1A and 6A to June 5. The first game each day is scheduled for 10 a.m.; the competing schools are not yet listed.",
      "The finals are scheduled for McCombs Field in Austin. UIL’s official 2027 schedule is available on its tournament page; confirm the specific game’s admission and venue access rather than reusing last season’s terms.",
      "Keep Austin and Travis County sightseeing secondary to the championship schedule on game day, then add nearby stops around the fixed event window.",
    ],
    officialUrl: "https://www.uiltexas.org/softball/state",
    officialSourceLabel: "UIL Softball State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-soccer-state-championships",
    name: "UIL Soccer State Championships",
    categoryLabel: "Soccer Tournaments",
    categoryPath: "/events/tournaments-soccer",
    city: "Georgetown",
    countySlug: "williamson",
    countyName: "Williamson County",
    venue: "Birkelbach Field",
    startDate: "2027-04-08",
    endDate: "2027-04-10",
    dateLabel: "April 8–10, 2027",
    summary: "The 2027 UIL Soccer State Championships are scheduled for April 8–10 at Birkelbach Field in Georgetown.",
    whyItMatters: "The UIL soccer championships bring boys and girls public-school title matches across classifications to Georgetown for a three-day statewide final series.",
    planningNotes: [
      "UIL’s published 2027 schedule assigns 4A finals to April 8, 5A to April 9 and 6A to April 10. Each day has four matches, with the Division II girls followed by boys and then the Division I girls and boys.",
      "Birkelbach Field in Georgetown hosts the finals. UIL’s postseason manual sets March 16 as the district-champion deadline; final participants are not yet listed. Check the actual tournament ticket and access arrangements once announced.",
      "Use Georgetown and Williamson County planning around the championship window after the match schedule is fixed.",
    ],
    officialUrl: "https://www.uiltexas.org/soccer/state",
    officialSourceLabel: "UIL Soccer State Championships official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "uil-tennis-state-tournaments",
    name: "UIL Tennis State Tournament",
    categoryLabel: "Tennis & Pickleball Tournaments",
    categoryPath: "/events/tournaments-tennis-pickleball",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    venue: "North East ISD & Northside ISD tennis venues",
    startDate: "2027-05-06",
    endDate: "2027-05-07",
    dateLabel: "May 6–7, 2027",
    summary: "The 2027 UIL Tennis State Tournament is scheduled for May 6–7 across North East ISD and Northside ISD tennis venues in San Antonio.",
    whyItMatters: "UIL's individual tennis state tournament brings singles, doubles and mixed-doubles championships across classifications to San Antonio over two days.",
    planningNotes: [
      "The published UIL 2027 schedule assigns 1A–2A to Blossom Tennis Center, 3A–4A to Annemarie Tennis Center and 5A–6A to Northside Tennis Center. Use the correct classification and venue before making travel plans.",
      "Thursday May 6 covers the opening rounds and quarterfinals; Friday May 7 covers semifinals and finals. This is the individual tournament, not team tennis. Times and dates remain subject to change.",
      "Use Bexar County and San Antonio planning only after identifying the exact tennis venue and match window you need.",
    ],
    officialUrl: "https://www.uiltexas.org/tennis/state",
    officialSourceLabel: "UIL Tennis State Tournament official page",
    sourceCheckedAt: "2026-11-24",
  },
  {
    slug: "us-mens-clay-court-championships",
    name: "U.S. Men’s Clay Court Championship",
    categoryLabel: "Tennis & Pickleball Tournaments",
    categoryPath: "/events/tournaments-tennis-pickleball",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    venue: "River Oaks Country Club",
    startDate: "2027-03-27",
    endDate: "2027-04-04",
    dateLabel: "March 27–April 4, 2027",
    summary: "The 2027 U.S. Men’s Clay Court Championship is scheduled for March 27–April 4 at River Oaks Country Club in Houston.",
    whyItMatters: "Houston's long-running professional clay-court tournament is a distinctive Texas stop on the men's tennis calendar, pairing ATP-level competition with River Oaks Country Club's red-clay courts.",
    planningNotes: [
      "The published 2027 schedule starts qualifying March 27–28 at 11 a.m.; main-draw play begins March 29 at 1 p.m. March 30 through April 2 have separate day and evening sessions, with April 2 quarterfinals. April 3 is semifinal day and April 4 lists doubles final at noon and singles final at 2:30 p.m. Confirm the actual order of play before travel.",
      "Parking and shuttle arrangements around River Oaks are event-specific, so review the organizer's current FAQ before driving to the club.",
      "The organizer announced November 17 that 2023 champion Frances Tiafoe was its first 2027 player commitment and that Tommy Paul won the 2026 singles title. A commitment is not a final draw or guaranteed appearance; check current entry and session information.",
    ],
    officialUrl: "https://www.mensclaycourt.com/",
    officialSourceLabel: "U.S. Men’s Clay Court Championship official site",
    sourceCheckedAt: "2026-11-27",
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH3_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch3BySlug(slug: string) {
  return bySlug.get(slug);
}
