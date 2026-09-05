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
      "Use the UIL state-championship page to choose the specific classification and game day before buying tickets or arranging travel.",
      "AT&T Stadium hosts multiple title games across four days, so parking, gate and session logistics should be checked for the exact day you plan to attend.",
      "Use Texas Defined's Tarrant County and football coverage to build a broader Arlington or Fort Worth trip around championship day.",
    ],
    officialUrl: "https://www.uiltexas.org/football/state",
    officialSourceLabel: "UIL Football State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Check the UIL schedule for the classification and tip time you want because championship games run throughout all three days.",
      "Use current Alamodome and UIL guidance for parking, entry and ticket details rather than assuming one session covers the full tournament.",
      "Pair championship attendance with Bexar County and San Antonio planning once your game day is fixed.",
    ],
    officialUrl: "https://www.uiltexas.org/basketball/state-boys",
    officialSourceLabel: "UIL Boys Basketball State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Choose the classification and game time from the current UIL schedule before committing to a specific day or ticket session.",
      "Recheck Alamodome access, parking and UIL ticket information close to the event because operational details can change after dates are set.",
      "Use the Bexar County connection to turn a championship visit into a broader San Antonio trip without crowding the game-day schedule.",
    ],
    officialUrl: "https://www.uiltexas.org/basketball/state-girls",
    officialSourceLabel: "UIL Girls Basketball State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Use the UIL championship schedule to match your trip to the classification and game time you want to see.",
      "Dell Diamond is the confirmed championship venue for 2027; recheck UIL ticket and venue-access guidance before traveling.",
      "Build any additional Round Rock or Williamson County stops around the game schedule rather than assuming a full free day between sessions.",
    ],
    officialUrl: "https://www.uiltexas.org/baseball/state",
    officialSourceLabel: "UIL Baseball State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Use the UIL schedule to select the classification and championship game that anchors your visit.",
      "McCombs Field is the confirmed 2027 venue; check current UIL and venue instructions for tickets, parking and entry close to travel.",
      "Keep Austin and Travis County sightseeing secondary to the championship schedule on game day, then add nearby stops around the fixed event window.",
    ],
    officialUrl: "https://www.uiltexas.org/softball/state",
    officialSourceLabel: "UIL Softball State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Match the classification and boys or girls final you want to the current UIL schedule before choosing your travel day.",
      "Birkelbach Field is the confirmed 2027 championship site; use UIL guidance for final ticket, entry and weather-related instructions.",
      "Use Georgetown and Williamson County planning around the championship window after the match schedule is fixed.",
    ],
    officialUrl: "https://www.uiltexas.org/soccer/state",
    officialSourceLabel: "UIL Soccer State Championships official page",
    sourceCheckedAt: checkedAt,
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
      "Check the UIL round-by-round schedule before traveling because classifications and disciplines are assigned to specific venues and times.",
      "This guide covers the individual state tournament; UIL team tennis is a separate championship and should not be treated as the same event.",
      "Use Bexar County and San Antonio planning only after identifying the exact tennis venue and match window you need.",
    ],
    officialUrl: "https://www.uiltexas.org/tennis/state",
    officialSourceLabel: "UIL Tennis State Tournament official page",
    sourceCheckedAt: checkedAt,
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
      "Use the tournament's official schedule for the exact session and round you want because the published event window spans qualifying and main-draw play.",
      "Parking and shuttle arrangements around River Oaks are event-specific, so review the organizer's current FAQ before driving to the club.",
      "Pair the tournament with Harris County and Houston planning after choosing your session, especially if attending multiple days.",
    ],
    officialUrl: "https://www.mensclaycourt.com/",
    officialSourceLabel: "U.S. Men’s Clay Court Championship official site",
    sourceCheckedAt: checkedAt,
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH3_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch3BySlug(slug: string) {
  return bySlug.get(slug);
}
