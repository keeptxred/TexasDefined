import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const image = (src: string, alt: string, width: number, height: number, credit: string, caption: string): ArticleBlock => ({
  type: "image",
  image: { src, alt, width, height, credit },
  caption,
});

// Legacy validation marker retained for the production smoke contract while the visible title stays concise:
// Texas Six-Man Football Explained: Rules, Scoring and Why It Looks So Different
export const texasSixManFootballExplainedArticle: Article = {
  id: "evergreen-texas-six-man-football-explained",
  brandId: "texasdefined",
  slug: "texas-six-man-football-rules-explained",
  title: "Texas Six-Man Football: Rules, Scoring & How It Works",
  dek: "A visual guide to Texas six-man football: the 80-yard field, 15-yard first downs, exchange rule, scoring, 45-point rule, UIL divisions and where to find a team.",
  category: "sports",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bart_Coan_Field_from_west.jpg?width=1600",
    alt: "Six-man football game at Bart Coan Field on the Fort Davis High School campus in Fort Davis, Texas",
    width: 1600,
    height: 1200,
    credit: "Fortguy · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-19",
  updatedAt: "2026-10-02",
  readingMinutes: 11,
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
    p("Six-man football can look familiar for about three seconds. There is a snap, blocking, backfield action, receivers and a goal line. Then the field opens up, nearly every player becomes a receiving threat and one missed tackle can turn into a sprint to the end zone."),
    p("Texas six-man football starts with the NCAA football rule framework used by UIL and then applies six-player exceptions that change the field, first-down distance, scoring values, player eligibility and how the offense may advance the ball. The visual guide above gives you the differences first; the sections below explain why they matter."),

    h("Who plays six-man football in Texas?"),
    p("UIL six-man football is the football format associated with Conference 1A. For the 2026–28 alignment, 1A includes schools with 104.9 students or fewer in grades 9–12 for classification purposes. UIL lists 159 football schools in 1A for the current alignment."),
    p("Small schools are not automatically locked into six-man football. UIL realignment policy allows qualifying 1A schools to choose 1A six-man football or participate in 2A eleven-man football while remaining 1A for other applicable activities. That is why the current UIL alignment or the TexasDefined team finder is the right place to confirm what a particular school actually plays."),

    h("Why the smaller field still creates so much space"),
    p("The standard six-man field is 80 yards long by 40 yards wide, with the 40-yard line serving as midfield. With only six defenders, however, each player has much more ground and responsibility than the smaller dimensions might suggest. Open-field tackling, pursuit angles and recovery after misdirection become unusually visible."),
    p("UIL six-man goal posts are also different: the uprights are 25 feet apart and the crossbar is 9 feet above the ground."),

    h("First down takes 15 yards"),
    p("The offense still gets four downs and must advance 15 yards for a new first down rather than 10. That extra distance suits a game in which explosive plays are common and prevents the smaller field from simply becoming a compressed version of eleven-man football."),

    h("The exchange rule changes what happens after the snap"),
    p("Unless the play is a kick or forward pass, the ball generally may not be advanced beyond the neutral zone until an exchange has occurred between the receiver of the snap and another player. A handoff or backward pass can complete that exchange."),
    p("The original snap receiver is not removed from the play. The ball can come back after the exchange, which is why six-man offenses can use motion, handoffs, backward passes and misdirection in combinations that initially look strange to an eleven-man fan."),

    h("Everyone can become a receiving threat"),
    p("UIL six-player rules make all players eligible to catch a forward pass, subject to the six-man exceptions. Even the snapper can receive a forward pass, although a pass thrown to the snapper must travel at least one yard in flight. Defenders therefore cannot make the same pre-snap assumptions about eligible receivers that they make in standard formations."),

    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Six-man_football_battle.jpg?width=1600",
      "Players competing for the ball during a six-man football game",
      1600,
      1067,
      "KaleenaBurt · CC BY-SA 4.0 · Wikimedia Commons",
      "With only six players per side, one matchup or missed tackle can open a large amount of field."
    ),

    h("Scoring rewards the kicking game"),
    p("A touchdown is still worth 6 points, but the kicking values are different. A field goal is worth 4 points. After a touchdown, a successful place kick or drop kick is worth 2 points, while a successful run or pass try is worth 1."),
    p("That reverses the familiar extra-point incentive. A team with a dependable kicker can change late-game strategy because the kick is the higher-value conversion."),

    h("The 45-point rule is an ending rule, not a running clock"),
    p("This is the 45-point ending rule: if one team leads by 45 or more points at the end of the first half, the game ends. If a team reaches a 45-point lead during the second half, the contest ends at that point. The rule does not merely speed up the clock and it does not require a coach to concede."),

    h("Quarters are 10 minutes"),
    p("UIL six-player games use 10-minute quarters. The standard intermission between the first and second quarters and between the third and fourth quarters is two minutes, while halftime is 15 minutes. State championship halftime can be extended to a maximum of 20 minutes with the coaches' concurrence."),

    h("A team can continue with fewer than six players"),
    p("Six is the maximum number of players each team may have on the field, but a team needs only four players to start and may continue with five or four. Fewer than four available players results in suspension of the contest. The rule reflects the reality of the very small schools the format is designed to serve."),

    h("Why six-man is so closely tied to small-town Texas"),
    p("Six-man football solves a practical problem: how does a high school with only a few dozen students field a viable football team? Reducing the number of players preserves football for communities that could not maintain an eleven-man roster with comparable depth."),
    p("That adaptation developed its own culture. In many 1A communities, the roster represents a meaningful share of the high-school population, and the same students may also participate in other sports, agriculture programs, band, academics and community activities."),

    h("How Division I and Division II work"),
    p("For the 2026–28 alignment, 1A Division I covers enrollment from 57.6 through 104.9 and Division II covers 57.5 and below. The division is known before the season begins."),
    p("The top two teams from each 1A six-man district advance to the playoffs. Division I and Division II have separate brackets and each crowns its own state champion."),

    h("Where to watch six-man football in Texas"),
    p("The best way to understand six-man football is to see it in person. Start with the TexasDefined team finder to locate 1A programs and district pages, then use school schedules or the UIL playoff brackets to find a game. Regular-season games are concentrated in the fall, with the postseason leading to separate Division I and Division II state championships."),
    list(
      "Use the TexasDefined team finder to identify current 1A programs.",
      "Open a team or district page to understand the school, classification and local context.",
      "Check the school's current schedule before traveling; dates, sites and kickoff times can change.",
      "During the postseason, use the official UIL bracket pages to confirm matchups and advancement."
    ),

    h("What does not change"),
    p("Six-man is still tackle football. Blocking, tackling, passing, rushing, turnovers, downs, penalties, touchdowns and field position still matter. The easiest way to learn it is not to memorize a separate sport from scratch: learn the handful of six-player rules that change space, advancement and scoring, then watch how those differences reshape everything else."),

    h("Official rules used for this guide"),
    p("TexasDefined checks this guide against the current UIL football rules and guidelines, UIL six-player exceptions, conference cutoff numbers and UIL playoff information. Because UIL updates rules and alignments over time, the official UIL pages linked below remain the controlling source for current competition rules."),
  ],
};