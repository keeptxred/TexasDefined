import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHighSchoolFootball2026CalendarArticle: Article = {
  id: "evergreen-texas-high-school-football-2026-calendar",
  brandId: "texasdefined",
  slug: "texas-high-school-football-2026-season-calendar",
  title: "Texas High School Football 2026 Calendar: Every UIL Week, Playoff Round & State Final",
  dek: "The official 2026–27 UIL football calendar runs from August practices and Week One through November district certification, five playoff weeks and 12 state championship games at AT&T Stadium.",
  category: "sports",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg?width=1600",
    alt: "AT&T Stadium in Arlington, Texas, site of the 2026 UIL football state championships",
    width: 1600,
    height: 1067,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-19",
  readingMinutes: 10,
  tags: [
    "texas high school football calendar",
    "uil football dates 2026",
    "texas football playoffs 2026",
    "texas high school football state championships",
    "uil football schedule",
    "att stadium high school football",
  ],
  featured: false,
  sourceName: "University Interscholastic League",
  sourceUrl: "https://www.uiltexas.org/football",
  internalLinks: [
    {
      href: "/article/texas-high-school-football-scores-schedules",
      label: "Texas high school football scores and schedules",
      description: "Use the UIL Texas Scoreboard and school sources for current weekly matchups and submitted results.",
    },
    {
      href: "/article/texas-high-school-football-playoffs-explained",
      label: "How the UIL football playoffs work",
      description: "Understand district qualification, bi-district, the 6A Division I/II split and the path through the state bracket.",
    },
    {
      href: "/texas-high-school-football-teams",
      label: "Find any current UIL football program",
      description: "Search all 1,268 UIL football programs by school, ISD, city or county.",
    },
    {
      href: "/texas-high-school-football-districts",
      label: "Browse all 192 UIL football districts",
      description: "See every current 2026–28 football district and its member schools.",
    },
    {
      href: "/sports/friday-night-lights",
      label: "Friday Night Lights, Defined",
      description: "Explore the culture, traditions, stadiums and game-day side of Texas high school football.",
    },
    {
      href: "https://www.uiltexas.org/football",
      label: "Official UIL football calendar",
      description: "Use UIL's football page for the current 2026–27 calendar and any date changes.",
    },
    {
      href: "https://www.uiltexas.org/football/state",
      label: "Official UIL state championship schedule",
      description: "See the 12 championship time slots at AT&T Stadium in Arlington.",
    },
    {
      href: "https://www.uiltexas.org/football/playoff-brackets",
      label: "Official UIL playoff brackets",
      description: "Follow the live postseason bracket once district representatives are certified.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas high school football follows a statewide UIL calendar, but the season is easier to track when you separate four different clocks: preseason practice and scrimmages, the 11 possible regular-season playing weeks, district certification, and the five-week playoff run that leads into four days of state championships."),
    p("The dates below are the current 2026–27 UIL football dates. Individual schools do not necessarily play on every listed date, and kickoff times, bye weeks, stadium assignments and local schedule changes still need to be confirmed with the school or district."),
    h("The short version"),
    list(
      "Week One: August 27–29, 2026.",
      "Week Eleven: November 5–7.",
      "District certification deadline: November 7.",
      "Playoff Week One: November 12–14.",
      "Playoff Week Five: December 10–12, with a December 9 exception available for 2A Division II.",
      "State championships: December 16–19 at AT&T Stadium in Arlington.",
      "Twelve UIL football state champions will be crowned: Division I and Division II in each classification from 1A through 6A."
    ),
    h("Preseason dates depend on spring training"),
    p("UIL uses two preseason tracks. Schools in 1A through 4A, 5A and 6A schools without spring training, and all incoming ninth graders can begin conditioning August 3, full contact August 8 and their first scrimmage August 13. A second scrimmage can be played August 20."),
    p("5A and 6A schools that used spring training begin conditioning August 10, full contact August 15 and may play their first scrimmage August 20. Their second scrimmage date is August 27."),
    p("Schools using an August 27 scrimmage option cannot also treat that date as a Week One varsity game under the applicable UIL scrimmage rules. The school schedule remains the best source for whether a particular program begins in Week One or later."),
    h("The 11 possible regular-season playing weeks"),
    list(
      "Week One — August 27, 28 and 29.",
      "Week Two — September 3, 4 and 5.",
      "Week Three — September 10, 11 and 12.",
      "Week Four — September 17, 18 and 19.",
      "Week Five — September 24, 25 and 26.",
      "Week Six — October 1, 2 and 3.",
      "Week Seven — October 8, 9 and 10.",
      "Week Eight — October 15, 16 and 17.",
      "Week Nine — October 22, 23 and 24.",
      "Week Ten — October 29, 30 and 31.",
      "Week Eleven — November 5, 6 and 7."
    ),
    p("UIL allows schools 11 weeks to play a maximum of 10 games. That is why an open date or bye week can appear in a team's schedule even though the statewide calendar continues every week."),
    h("Why November 7 matters"),
    p("November 7 is the UIL district-certification deadline for the 2026 football season. By that point, districts must have determined and certified the teams that advance to the postseason."),
    p("District certification is separate from the UIL Texas Scoreboard. Scores and schedules can flow through MaxPreps, but the district chair still handles the official certification process. That distinction is why a partial score feed should never be treated as the final playoff order."),
    h("The 2026 playoff calendar"),
    list(
      "Playoff Week One — November 12, 13 and 14.",
      "Playoff Week Two — November 19, 20 and 21.",
      "Playoff Week Three — November 26, 27 and 28.",
      "Playoff Week Four — December 3, 4 and 5.",
      "Playoff Week Five — December 10, 11 and 12. UIL notes that 2A Division II may play on December 9.",
      "State Championships — December 16, 17, 18 and 19."
    ),
    h("Yes, one playoff round lands on Thanksgiving week"),
    p("The third playoff week is November 26–28. That places part of the regional playoff calendar directly on Thanksgiving weekend, one of the distinctive travel and scheduling features of a deep Texas football run."),
    p("Families following a team into that round should verify the actual game day and neutral-site location as soon as the schools announce them. The statewide window tells you when the round can be played; the participating schools control the practical trip details."),
    h("The 12 state championship games"),
    p("UIL's 2026 state championship schedule is set for AT&T Stadium in Arlington from Wednesday, December 16 through Saturday, December 19."),
    list(
      "Wednesday, December 16 — 1A Division II at 11:00 a.m.; 1A Division I at 2:00 p.m.; 2A Division II at 7:00 p.m.",
      "Thursday, December 17 — 3A Division II at 11:00 a.m.; 2A Division I at 3:00 p.m.; 3A Division I at 7:00 p.m.",
      "Friday, December 18 — 5A Division II at 11:00 a.m.; 4A Division II at 3:00 p.m.; 6A Division II at 7:00 p.m.",
      "Saturday, December 19 — 5A Division I at 11:00 a.m.; 4A Division I at 3:00 p.m.; 6A Division I at 7:00 p.m."
    ),
    h("How the calendar connects to classifications"),
    p("Classes 1A through 5A are already assigned to Division I or Division II before the season. In 6A, four teams qualify from each district, then the two larger-enrollment qualifiers enter Division I and the two smaller-enrollment qualifiers enter Division II."),
    p("That is why the calendar can list twelve championship slots even though Texas has six UIL classifications: each classification ultimately crowns a Division I and Division II football champion."),
    h("How to use this calendar with the team finder"),
    p("Start with a school profile to confirm classification and district. Use the district page to understand the current competitive group. Use the UIL Texas Scoreboard and school sources for the weekly schedule and score. Then move to the official playoff bracket after district certification."),
    p("The statewide calendar tells you when a round can happen. It does not tell you that a specific school has a game that week. Eliminated teams are finished, teams can have regular-season bye weeks, and local game dates can move within the UIL window."),
    h("Planning a state championship trip"),
    p("AT&T Stadium hosts all twelve UIL football state championship games. The four-day format means the useful planning question is not simply 'When are the championships?' but which classification and division your team would enter if it reaches Arlington."),
    p("If you are attending regardless of matchup, Wednesday emphasizes the smallest classifications, Thursday is built around 2A and 3A, Friday contains the Division II finals from 4A through 6A, and Saturday closes with the Division I finals from 5A, 4A and 6A."),
    h("What can still change"),
    p("UIL's football page is the controlling source for the statewide calendar. Individual schedules can change because of weather, venue conflicts or school decisions, and UIL can revise published information. TexasDefined therefore treats these dates as the current 2026–27 framework, not a substitute for a school's final game-day notice."),
    h("The simplest takeaway"),
    p("The regular-season clock ends with district certification on November 7. The postseason begins the following week. Five playoff windows narrow the field, and the surviving twelve finalists arrive at AT&T Stadium for championships December 16–19."),
    p("That structure makes the season much easier to follow: school schedule for this week's game, district page for competitive context, UIL bracket for the postseason path, and the statewide calendar for the bigger timeline.")
  ],
};
