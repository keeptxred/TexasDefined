import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHighSchoolFootballScoresSchedulesArticle: Article = {
  id: "evergreen-texas-high-school-football-scores-schedules",
  brandId: "texasdefined",
  slug: "texas-high-school-football-scores-schedules",
  title: "Texas High School Football Scores & Schedules: How to Follow the 2026 Season",
  dek: "Use the UIL Texas Scoreboard, school sources and the official playoff brackets to follow current Texas high school football schedules and results without mistaking incomplete score submissions for official district standings.",
  category: "sports",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eagle_Stadium.jpg?width=1600",
    alt: "Eagle Stadium football field in Allen, Texas",
    width: 800,
    height: 499,
    credit: "Aerial Photography, Inc. · CC BY-SA 3.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-19",
  readingMinutes: 9,
  tags: [
    "texas high school football scores",
    "texas high school football schedules",
    "uil football scoreboard",
    "texas football results",
    "2026 texas high school football",
    "uil maxpreps",
  ],
  featured: false,
  sourceName: "University Interscholastic League",
  sourceUrl: "https://www.uiltexas.org/athletics/uil-maxpreps",
  internalLinks: [
    {
      href: "/texas-high-school-football-teams",
      label: "Find any current UIL football program",
      description: "Search all 1,268 current UIL programs by school, ISD, city or county, then open the school research profile.",
    },
    {
      href: "/texas-high-school-football-districts",
      label: "Browse all 192 current UIL football districts",
      description: "See the current 2026–28 district membership for every UIL football classification and division.",
    },
    {
      href: "/article/texas-high-school-football-2026-season-calendar",
      label: "2026 Texas high school football season calendar",
      description: "See every UIL playing week, the November 7 district-certification deadline, five playoff weeks and all 12 state-final time slots.",
    },
    {
      href: "/article/texas-high-school-football-playoffs-explained",
      label: "How the Texas high school football playoffs work",
      description: "Understand district qualification, bi-district, Division I and II, neutral sites and the path to the state finals.",
    },
    {
      href: "/sports/friday-night-lights",
      label: "Friday Night Lights, Defined",
      description: "Connect the current season with Texas football culture, traditions, stadiums and game-day planning.",
    },
    {
      href: "/sports-venues/high-school-football",
      label: "Texas high school football stadiums",
      description: "Use TexasDefined stadium guides for parking, arrival and venue planning after confirming the current game site.",
    },
    {
      href: "https://www.uiltexas.org/maxpreps/",
      label: "UIL Texas Scoreboard gateway",
      description: "Open the UIL-hosted MaxPreps scoreboard system for current schedules and scores.",
    },
    {
      href: "https://www.uiltexas.org/athletics/uil-maxpreps",
      label: "How UIL and MaxPreps data works",
      description: "Read the UIL explanation of score reporting, schedule completeness, postseason requirements and scoreboard limitations.",
    },
    {
      href: "https://www.uiltexas.org/football/playoff-brackets",
      label: "Official 2026–27 UIL football playoff brackets",
      description: "Use the current UIL bracket page for postseason matchups, submitted results and advancement.",
    },
    {
      href: "https://www.uiltexas.org/football",
      label: "UIL football season information",
      description: "Check current football dates, rules, manuals and state-championship information directly with UIL.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas high school football changes every week. A school profile, classification page or historical record can tell you where a program fits, but the current schedule and the latest score need a source designed for live season information."),
    p("For UIL football, the controlling statewide score-and-schedule system is the UIL Texas Scoreboard, which is powered by information submitted through MaxPreps. UIL says the scoreboard currently carries scores and weekly schedules for football and several other sports."),
    h("The short answer"),
    list(
      "Use the UIL Texas Scoreboard for current UIL football scores and weekly schedules.",
      "Treat the scoreboard as submission-dependent: UIL says completeness depends on information supplied by schools and coaches to MaxPreps.",
      "Do not treat the UIL Texas Scoreboard as an official district-standings table. UIL says standings are planned for the future, not part of the current scoreboard.",
      "Use the participating school or district for the final word on kickoff time, venue, ticketing, postponements and other game-day logistics.",
      "Once the postseason begins, use the official UIL playoff brackets for the controlling bracket path and submitted playoff results."
    ),
    h("Why UIL uses MaxPreps"),
    p("UIL partners with MaxPreps to collect scores, manage postseason bracket information and power the Texas Scoreboard. Once a participating school or coach submits team information to MaxPreps, that information can flow into the UIL system."),
    p("The partnership matters because Texas high school football has more than a thousand UIL programs. A statewide score system only works if schools have a consistent place to report schedules and results."),
    h("What the UIL Texas Scoreboard includes"),
    p("UIL says the Texas Scoreboard currently includes scores and weekly schedules for football, volleyball, basketball, soccer, baseball and softball. For football fans, that makes it the statewide starting point for checking whether a result or upcoming game has been reported."),
    p("TexasDefined treats that scoreboard as a current-season source, not as a replacement for the school itself. If a game has been moved, canceled, delayed or assigned to a different stadium, the participating schools and districts remain the most practical place to verify the final game-day details."),
    h("Why a missing score does not necessarily mean a game was not played"),
    p("UIL explicitly says scoreboard completeness depends on participation by schools and coaches. During the regular season, UIL encourages programs to keep MaxPreps current, but the reporting requirement becomes especially important for playoff teams."),
    p("That means a blank result, incomplete schedule or delayed update should be read as a data-availability problem first. TexasDefined does not convert missing scoreboard data into a loss, cancellation or forfeit unless a controlling source says so."),
    h("Why TexasDefined does not publish 'official standings' from the scoreboard"),
    p("The UIL MaxPreps FAQ says standings and stat leaderboards are planned additions to the Texas Scoreboard rather than current features. District certification also remains a separate UIL process handled by the district chair."),
    p("Because of that distinction, TexasDefined will not manufacture an official-looking district standings table by simply counting whatever regular-season scores happen to be present in a submission-dependent feed. A complete district record requires knowing which games count as district contests, how ties are handled and what the district certifies to UIL."),
    h("Scores, schedules and standings are three different things"),
    list(
      "Schedule: the listed date, opponent, time and site for a game.",
      "Score: the reported result of a game that has been played.",
      "District record: results specifically from games designated as district contests.",
      "District standings: the ordered district finish used for playoff qualification and certification.",
      "Playoff bracket: the UIL postseason path after district representatives are certified."
    ),
    p("Those pieces are related, but they are not interchangeable. A team can have an excellent overall record and still sit behind another team in district play. A nondistrict loss can affect perception without directly changing the district qualification order."),
    h("How to verify an upcoming game"),
    p("Start with the UIL Texas Scoreboard to see whether the current matchup is listed. Then check the school's athletics page or district athletics office for the final kickoff time, stadium, ticket link and any weather or security update."),
    p("For stadium planning, use TexasDefined's venue guides only after the current site is confirmed. Shared district stadiums are common, and a school's usual venue does not guarantee that every home-designated game is played there."),
    h("How to verify a final score"),
    p("For a completed regular-season game, compare the UIL Texas Scoreboard with the participating schools when a result looks missing or inconsistent. UIL says fans can submit scores through MaxPreps for verification, while schools and coaches maintain their own team information."),
    p("For playoff games, the reporting chain is stronger: UIL requires advancing teams to submit playoff results through MaxPreps, and the score reported by the coach feeds the UIL bracket."),
    h("What changes in the playoffs"),
    p("After districts certify their representatives, the official UIL playoff bracket becomes the best statewide map of the postseason. The bracket shows the competition path, and advancing teams are required to report playoff results and next-round information."),
    p("The bracket does not replace school-level game logistics. A matchup can be correct in the bracket while the participating schools provide the most current ticket, parking, broadcast or weather information."),
    h("Where district standings fit"),
    p("District standings determine who advances, but UIL district certification is not performed through MaxPreps. UIL says the district chair still submits the district certification form by the required deadline."),
    p("That is why TexasDefined's district pages currently focus on the official 2026–28 membership and classification structure. We will add standings only when they can be maintained from a source that represents the certified district picture rather than a partial reconstruction."),
    h("A practical Friday-night workflow"),
    list(
      "Find the school in the TexasDefined statewide football directory.",
      "Open the current UIL district page to understand the competitive group.",
      "Check the UIL Texas Scoreboard for the latest submitted schedule or result.",
      "Verify the game site, kickoff time and tickets with the school or district before traveling.",
      "Use the TexasDefined stadium guide for parking and arrival when a verified venue guide exists.",
      "During the postseason, move to the official UIL playoff bracket for the controlling advancement path."
    ),
    h("The 2026 season endpoint"),
    p("UIL lists the 2026 football state championships for December 16–19 at AT&T Stadium in Arlington. Between now and then, regular-season schedules, district play and playoff rounds will keep changing the live picture every week."),
    p("The stable reference layer around that changing season includes every current UIL program, every current UIL football district, classifications, enrollment context, school profiles, championship history and stadium research. The UIL scoreboard and school sources supply the details that have to stay live."),
    h("The simplest takeaway"),
    p("Use UIL for the statewide score-and-schedule feed, use the school for last-mile game details, use the district structure to understand what the matchup means, and use the playoff bracket once the postseason begins."),
    p("Most importantly, do not confuse incomplete live submissions with an official standings table. A missing or partial result should be labeled as incomplete rather than turned into a false ranking.")
  ],
};
