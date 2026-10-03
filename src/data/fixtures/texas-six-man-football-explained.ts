import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasSixManFootballExplainedArticle: Article = {
  id: "evergreen-texas-six-man-football-explained",
  brandId: "texasdefined",
  slug: "texas-six-man-football-rules-explained",
  title: "Texas Six-Man Football: Rules, Scoring & How It Works",
  dek: "A visual guide to Texas six-man football: the 80-yard field, 15-yard first downs, exchange rule, scoring, 45-point rule, UIL divisions and where to find a team.",
  category: "sports",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Bart_Coan_Field_from_west.jpg",
    alt: "Six-man football game at Bart Coan Field on the Fort Davis High School campus in Fort Davis, Texas",
    width: 3264,
    height: 2448,
    credit: "Fortguy · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-19",
  updatedAt: "2026-10-03",
  readingMinutes: 8,
  tags: ["texas six-man football", "six player football rules", "1A football Texas", "45 point rule", "UIL football", "small town Texas football"],
  featured: false,
  sourceName: "University Interscholastic League",
  sourceUrl: "https://www.uiltexas.org/football/rules-guidelines",
  internalLinks: [
    { href: "/article/texas-high-school-football-classifications-1a-6a", label: "Texas high school football classifications explained", description: "See how 1A through 6A, Division I and II, enrollment cutoffs and realignment fit together." },
    { href: "/article/texas-high-school-football-playoffs-explained", label: "How the Texas high school football playoffs work", description: "Follow district qualification, playoff brackets, neutral sites and the road to the state championships." },
    { href: "/texas-high-school-football-teams", label: "Find a Texas high school football team", description: "Search current UIL programs and identify which schools play six-man or 11-man football." },
    { href: "/sports/friday-night-lights", label: "Friday Night Lights, Defined", description: "Explore the broader traditions, stadiums and community culture of Texas high school football." },
    { href: "https://www.uiltexas.org/football/rules-guidelines", label: "UIL football rules and guidelines", description: "Use the official UIL rules page for the current six-player comparison and annual football amendments." },
    { href: "https://www.uiltexas.org/files/athletics/2026-UIL-6-Player-Exceptions-to-NCAA-Rules_AUGUST_2026_REVISION.pdf", label: "2026 UIL six-player football rules", description: "Read the current official UIL exceptions for six-player football, effective August 28, 2026." },
    { href: "https://www.uiltexas.org/athletics/conference-cutoffs", label: "2026–28 UIL conference cutoffs", description: "Confirm the current 1A and Division I/II enrollment ranges." },
    { href: "https://www.uiltexas.org/football/playoff-brackets", label: "UIL football playoff brackets", description: "See current 1A six-man Division I and Division II playoff information." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Six-man football looks familiar until the field suddenly opens. There is a snap, blocking, backfield action and a goal line, but with only six players per side every matchup carries more space. One missed tackle can become a touchdown before the defense has time to recover."),
    p("The visual guide above shows the rule changes first: six players, an 80-by-40-yard field, 15 yards for a first down, different kicking values, the exchange rule and the 45-point ending rule. The rest of this guide explains what those rules do to the game and why six-man football became such a durable part of small-town Texas."),

    h("Who plays six-man football in Texas?"),
    p("UIL six-man football is associated with Conference 1A. For the 2026–28 alignment, 1A includes schools with 104.9 students or fewer in grades 9–12 for classification purposes, and UIL lists 159 football schools in 1A for the current alignment."),
    p("A small school is not automatically locked into six-man football. UIL realignment policy allows qualifying 1A schools to choose 1A six-man football or participate in 2A eleven-man football while remaining 1A for other applicable activities. Use the current UIL alignment or the TexasDefined team finder to confirm what a particular school actually plays."),

    h("What the rules change on Friday night"),
    p("The smaller field does not make six-man football feel cramped. Removing five defenders creates far more open grass per player, so pursuit angles and open-field tackling become unusually important. Offenses can use the space horizontally, force defenders into isolated choices and turn a small mistake into a long scoring play."),
    p("The exchange rule is one of the biggest adjustments for an eleven-man fan. On most running plays, the player who receives the snap cannot simply carry the ball beyond the neutral zone. The ball must first be exchanged with another offensive player, such as by handoff or backward pass. The original snap receiver can get the ball back after the exchange, which encourages motion and misdirection."),
    p("Six-player eligibility also changes the defense's pre-snap assumptions. All players may become receiving threats under the six-man exceptions, including the snapper in qualifying situations. Combine that with the extra space and the result is an offense in which defenders have fewer safe clues about where the ball is going."),

    h("Scoring changes strategy"),
    p("A touchdown remains worth 6 points, but the kicking values are reversed from what most eleven-man fans expect. A field goal is worth 4 points. After a touchdown, a successful place kick or drop kick is worth 2 points, while a successful run or pass try is worth 1. A dependable kicker can therefore change the arithmetic of a close six-man game."),
    p("Games also use 10-minute quarters. If one team leads by 45 or more points at halftime, the game ends; if the margin reaches 45 during the second half, the contest ends at that point. It is an ending rule, not simply a running-clock rule."),

    h("Why six-man is so closely tied to small-town Texas"),
    p("Six-man football solves a practical roster problem. A high school with only a few dozen students may not be able to sustain an eleven-man team with enough depth to practice and compete safely. Six-man preserves football for communities where a conventional roster would be unrealistic."),
    p("That practical adaptation developed its own culture. In many 1A communities, the football roster represents a meaningful share of the high-school population, and the same students may also participate in other sports, agriculture programs, band, academics and community activities. The game is not a miniature version of big-school football; it is a format built around the scale of the community."),

    h("Division I, Division II and the playoffs"),
    p("For the 2026–28 alignment, 1A Division I covers enrollment from 57.6 through 104.9 and Division II covers 57.5 and below. The division is established before the season begins."),
    p("The top two teams from each 1A six-man district advance to the playoffs. Division I and Division II use separate brackets and each crowns its own state champion."),

    h("Where to watch six-man football in Texas"),
    p("The fastest way to understand six-man football is to see it in person. Start with the TexasDefined team finder to locate 1A programs and district pages, then confirm the current schedule through the school or UIL before traveling."),
    list(
      "Use the TexasDefined team finder to identify current 1A programs.",
      "Open a team or district page for the school, classification and local context.",
      "Confirm the school's current schedule before traveling; dates, sites and kickoff times can change.",
      "During the postseason, use the official UIL bracket pages to confirm matchups and advancement."
    ),

    h("Official rules used for this guide"),
    p("TexasDefined checks this guide against the current UIL football rules and guidelines, UIL six-player exceptions, conference cutoff numbers and UIL playoff information. UIL updates rules and alignments over time, so the official UIL sources linked below remain the controlling references for current competition rules."),
  ],
};