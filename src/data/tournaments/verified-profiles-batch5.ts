export interface VerifiedTournamentBatch5Profile {
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

export const VERIFIED_TOURNAMENT_BATCH5_PROFILES: readonly VerifiedTournamentBatch5Profile[] = [
  {
    slug: "the-texas-relays",
    name: "Clyde Littlefield Texas Relays",
    categoryLabel: "Track & Endurance Competitions",
    categoryPath: "/events/tournaments-track-endurance",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    venue: "Mike A. Myers Stadium",
    startDate: "2027-03-31",
    endDate: "2027-04-03",
    dateLabel: "March 31–April 3, 2027",
    summary: "The 2027 Clyde Littlefield Texas Relays are scheduled for March 31–April 3 at Mike A. Myers Stadium in Austin.",
    whyItMatters: "The Texas Relays are one of the state’s signature track-and-field meets, bringing elite high school, collegiate and professional competition to the University of Texas over four days.",
    planningNotes: [
      "Use Texas Athletics for the final 2027 session schedule and accepted-entry information because event fields and competition times are published closer to the meet.",
      "Mike A. Myers Stadium is the established Texas Relays venue; ticketing and spectator-entry details should be reconfirmed once the 2027 event page is fully published.",
      "Build additional Austin and Travis County plans around the competition session you intend to attend rather than assuming each day follows the same timetable.",
    ],
    officialUrl: "https://texaslonghorns.com/sports/2013/10/25/relays_1025133745",
    officialSourceLabel: "University of Texas Athletics Texas Relays future dates",
    sourceCheckedAt: checkedAt,
  },
  {
    slug: "worlds-championship-bar-b-que-contest",
    name: "World’s Championship Bar-B-Que Contest",
    categoryLabel: "Culinary & BBQ Competitions",
    categoryPath: "/events/tournaments-culinary-bbq",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    venue: "NRG Park",
    startDate: "2027-02-25",
    endDate: "2027-02-27",
    dateLabel: "February 25–27, 2027",
    summary: "The 2027 World’s Championship Bar-B-Que Contest runs February 25–27 at NRG Park, immediately before the Houston Livestock Show and Rodeo.",
    whyItMatters: "More than 250 barbecue teams compete at the Rodeo’s three-day cook-off, making the contest both a serious Texas barbecue championship and one of Houston’s largest pre-Rodeo public events.",
    planningNotes: [
      "A public admission ticket includes the public music venues, carnival admission and a complimentary barbecue plate, but it does not provide access to private team tents.",
      "The official 2027 schedule runs Thursday evening, Friday afternoon and evening, and Saturday from morning through the awards presentation, so choose your day around the experience you want.",
      "Treat the cook-off as a separate ticketed event from the March 2–21 Houston Livestock Show and Rodeo and verify transportation guidance before traveling to NRG Park.",
    ],
    officialUrl: "https://www.rodeohouston.com/worlds-championship-bar-b-que/",
    officialSourceLabel: "Houston Livestock Show and Rodeo World’s Championship Bar-B-Que official page",
    sourceCheckedAt: checkedAt,
  },
];

const bySlug = new Map(VERIFIED_TOURNAMENT_BATCH5_PROFILES.map((profile) => [profile.slug, profile]));

export function verifiedTournamentBatch5BySlug(slug: string) {
  return bySlug.get(slug);
}
