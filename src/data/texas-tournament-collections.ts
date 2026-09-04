export type TexasTournamentCategory = "golf" | "rodeo-ranch" | "football" | "basketball" | "baseball-softball" | "soccer" | "tennis-pickleball" | "volleyball" | "motorsports-cycling" | "track-endurance" | "fishing" | "shooting-archery" | "combat-sports" | "chess-mind-sports" | "esports-tabletop-arcade" | "culinary-bbq" | "dance-cheer-music" | "aquatics-water-sports" | "traditional-recreation" | "academic-agricultural" | "multi-sport" | "rugby-polo-field-sports";

export interface TexasTournamentCategoryDefinition {
  slug: TexasTournamentCategory;
  label: string;
  title: string;
  description: string;
  path: string;
  collectionSlug: string;
}

export interface TournamentCollectionDefinition {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  lead: string;
  planningTitle: string;
  planningIntro: string;
  planningPoints: [string, string, string];
  kind: "tournament";
  value?: TexasTournamentCategory;
  relatedPaths: string[];
}

export const TEXAS_TOURNAMENT_CATEGORIES: readonly TexasTournamentCategoryDefinition[] = [
  { slug: "golf", label: "Golf Tournaments", title: "Texas Golf Tournaments", description: "Golf tournaments, championships and competitive golf events across Texas.", path: "/events/tournaments-golf", collectionSlug: "tournaments-golf" },
  { slug: "rodeo-ranch", label: "Rodeo & Ranch Tournaments", title: "Texas Rodeo & Ranch Tournaments", description: "Rodeo, ranch, barrel racing and western competition events across Texas.", path: "/events/tournaments-rodeo-ranch", collectionSlug: "tournaments-rodeo-ranch" },
  { slug: "football", label: "Football Bowls & Classics", title: "Texas Football Bowls & Classics", description: "College, high school and showcase football competitions and classics across Texas.", path: "/events/tournaments-football", collectionSlug: "tournaments-football" },
  { slug: "basketball", label: "Basketball Tournaments", title: "Texas Basketball Tournaments", description: "College, high school, youth and showcase basketball tournaments across Texas.", path: "/events/tournaments-basketball", collectionSlug: "tournaments-basketball" },
  { slug: "baseball-softball", label: "Baseball & Softball Tournaments", title: "Texas Baseball & Softball Tournaments", description: "Baseball and softball tournaments from youth showcases to statewide championships.", path: "/events/tournaments-baseball-softball", collectionSlug: "tournaments-baseball-softball" },
  { slug: "soccer", label: "Soccer Tournaments", title: "Texas Soccer Tournaments", description: "Youth, amateur, collegiate and showcase soccer tournaments across Texas.", path: "/events/tournaments-soccer", collectionSlug: "tournaments-soccer" },
  { slug: "tennis-pickleball", label: "Tennis & Pickleball Tournaments", title: "Texas Tennis & Pickleball Tournaments", description: "Tennis and pickleball tournaments, championships and competitive events across Texas.", path: "/events/tournaments-tennis-pickleball", collectionSlug: "tournaments-tennis-pickleball" },
  { slug: "volleyball", label: "Volleyball Tournaments", title: "Texas Volleyball Tournaments", description: "Indoor, beach, youth, collegiate and championship volleyball tournaments across Texas.", path: "/events/tournaments-volleyball", collectionSlug: "tournaments-volleyball" },
  { slug: "motorsports-cycling", label: "Motorsports & Cycling Races", title: "Texas Motorsports & Cycling Competitions", description: "Motorsports, cycling and competitive racing events across Texas.", path: "/events/tournaments-motorsports-cycling", collectionSlug: "tournaments-motorsports-cycling" },
  { slug: "track-endurance", label: "Track & Endurance Competitions", title: "Texas Track, Cross Country & Endurance Events", description: "Track, cross-country, marathon, triathlon and endurance competitions across Texas.", path: "/events/tournaments-track-endurance", collectionSlug: "tournaments-track-endurance" },
  { slug: "fishing", label: "Fishing Tournaments", title: "Texas Fishing Tournaments", description: "Freshwater, saltwater and competitive angling tournaments across Texas.", path: "/events/tournaments-fishing", collectionSlug: "tournaments-fishing" },
  { slug: "shooting-archery", label: "Shooting & Archery Tournaments", title: "Texas Shooting & Archery Tournaments", description: "Shooting, clay-target and archery tournaments across Texas.", path: "/events/tournaments-shooting-archery", collectionSlug: "tournaments-shooting-archery" },
  { slug: "combat-sports", label: "Martial Arts & Combat Sports", title: "Texas Martial Arts & Combat Competitions", description: "Martial arts, boxing, grappling, wrestling and combat-sport competitions across Texas.", path: "/events/tournaments-combat-sports", collectionSlug: "tournaments-combat-sports" },
  { slug: "chess-mind-sports", label: "Chess & Mind Sports", title: "Texas Chess & Mind Sport Tournaments", description: "Chess, bridge, quiz and strategy competitions across Texas.", path: "/events/tournaments-chess-mind-sports", collectionSlug: "tournaments-chess-mind-sports" },
  { slug: "esports-tabletop-arcade", label: "Esports, Tabletop & Arcade", title: "Texas Esports, Tabletop & Arcade Tournaments", description: "Esports, tabletop gaming, pinball and arcade tournaments across Texas.", path: "/events/tournaments-esports-tabletop-arcade", collectionSlug: "tournaments-esports-tabletop-arcade" },
  { slug: "culinary-bbq", label: "Culinary & BBQ Competitions", title: "Texas BBQ & Culinary Competitions", description: "Barbecue cook-offs, culinary contests and food competitions across Texas.", path: "/events/tournaments-culinary-bbq", collectionSlug: "tournaments-culinary-bbq" },
  { slug: "dance-cheer-music", label: "Dance, Cheer & Music Competitions", title: "Texas Dance, Cheer & Music Competitions", description: "Dance, cheer, marching, band and music competitions across Texas.", path: "/events/tournaments-dance-cheer-music", collectionSlug: "tournaments-dance-cheer-music" },
  { slug: "aquatics-water-sports", label: "Swimming, Diving & Water Sports", title: "Texas Aquatics & Water Sport Competitions", description: "Swimming, diving, rowing, sailing, surfing and water-sport competitions across Texas.", path: "/events/tournaments-aquatics-water-sports", collectionSlug: "tournaments-aquatics-water-sports" },
  { slug: "traditional-recreation", label: "Traditional Sports & Recreation", title: "Texas Traditional Sport & Recreation Tournaments", description: "Bowling, darts, billiards, horseshoes, disc golf and other recreational competitions across Texas.", path: "/events/tournaments-traditional-recreation", collectionSlug: "tournaments-traditional-recreation" },
  { slug: "academic-agricultural", label: "Academic, Agricultural & Trade Competitions", title: "Texas Academic, Agricultural & Trade Competitions", description: "Academic, agricultural, robotics, trade and specialty competitions across Texas.", path: "/events/tournaments-academic-agricultural", collectionSlug: "tournaments-academic-agricultural" },
  { slug: "multi-sport", label: "Youth, Amateur & Multi-Sport", title: "Texas Youth, Amateur & Multi-Sport Tournaments", description: "Youth, amateur and multi-sport tournaments and festival-style competitions across Texas.", path: "/events/tournaments-multi-sport", collectionSlug: "tournaments-multi-sport" },
  { slug: "rugby-polo-field-sports", label: "Rugby, Polo & Field Sports", title: "Texas Rugby, Polo & Field Sport Tournaments", description: "Rugby, lacrosse, polo, handball, kickball and field-sport tournaments across Texas.", path: "/events/tournaments-rugby-polo-field-sports", collectionSlug: "tournaments-rugby-polo-field-sports" },
] as const;

const hubPath = "/events/tournaments";
const verificationNote = "This directory begins with a curated Texas Defined seed inventory. Tournament names and general locations can be browsed now, while dates, venues, eligibility, tickets and organizer details remain subject to first-party verification before an individual guide is opened to search indexing.";

export const TOURNAMENT_COLLECTIONS: readonly TournamentCollectionDefinition[] = [
  {
    slug: "tournaments",
    path: hubPath,
    title: "Texas Tournaments: Sports, Competitions & Championships",
    eyebrow: "Texas tournament directory",
    description: "Browse Texas tournaments and competitions by sport, activity and location, from golf, rodeo and youth sports to fishing, BBQ, chess, esports, academic contests and more.",
    lead: `Texas competition culture is much broader than a single sports calendar. This statewide directory organizes 250 tournament and competition seeds across ${TEXAS_TOURNAMENT_CATEGORIES.length} categories, with county connections where the supplied location is specific enough to map confidently. ${verificationNote}`,
    planningTitle: "Choose the competition first, then verify the current occurrence",
    planningIntro: "Tournament names can be durable while dates, venues, divisions and entry rules change. Use the directory to discover the right competition, then treat the organizer as the final source for the current edition.",
    planningPoints: [
      "Start with the category and location that match your trip or participation goal; statewide and rotating events may not return to the same venue every year.",
      "Before booking travel or entering a bracket, verify the current date, venue, eligibility, registration deadline and spectator policy with the event organizer.",
      "Use Texas Defined county, venue, lodging and Explore guides to build the rest of the trip once the current tournament occurrence is confirmed.",
    ],
    kind: "tournament",
    relatedPaths: TEXAS_TOURNAMENT_CATEGORIES.map((category) => category.path),
  },
  ...TEXAS_TOURNAMENT_CATEGORIES.map((category): TournamentCollectionDefinition => ({
    slug: category.collectionSlug,
    path: category.path,
    title: category.title,
    eyebrow: category.label,
    description: category.description,
    lead: `${category.description} Texas Defined groups the seed inventory into a permanent category page so readers can compare names and locations without relying on a dated one-off list. ${verificationNote}`,
    planningTitle: `How to use the ${category.label.toLowerCase()} directory`,
    planningIntro: "Use the location and competition summary for discovery, then verify the current edition with the organizer before committing to travel, registration or tickets.",
    planningPoints: [
      "Confirm the current event year and host venue because annual and rotating tournaments can change locations or formats.",
      "Check divisions, qualification rules, registration deadlines or ticket sessions directly with the organizer before making nonrefundable plans.",
      "Open the connected county and Texas travel guides after the event location is confirmed to plan lodging, food, parking and nearby stops.",
    ],
    kind: "tournament",
    value: category.slug,
    relatedPaths: [hubPath, "/events/sports-events"],
  })),
];

export const TOURNAMENT_COLLECTION_BY_SLUG = new Map(
  TOURNAMENT_COLLECTIONS.map((collection) => [collection.slug, collection]),
);
