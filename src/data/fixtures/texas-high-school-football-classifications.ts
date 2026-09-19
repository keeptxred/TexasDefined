import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHighSchoolFootballClassificationsArticle: Article = {
  id: "evergreen-texas-high-school-football-classifications",
  brandId: "texasdefined",
  slug: "texas-high-school-football-classifications-1a-6a",
  title: "What Do 1A, 2A, 3A, 4A, 5A and 6A Mean in Texas High School Football?",
  dek: "Texas high school football classifications are based on school enrollment, not team strength. Here is how UIL classes, divisions, districts and media rankings fit together for 2026–28.",
  category: "sports",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Celina_High_School%2C_Friday_Night_Football.jpg?width=2042",
    alt: "Celina High School football field under the Friday night lights in Celina, Texas",
    width: 2042,
    height: 719,
    credit: "Heidi Knapp · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-18",
  readingMinutes: 7,
  tags: [
    "texas high school football",
    "uil classifications",
    "texas football rankings",
    "6A football",
    "5A football",
    "six-man football",
  ],
  featured: false,
  sourceName: "University Interscholastic League",
  sourceUrl: "https://www.uiltexas.org/athletics/conference-cutoffs",
  internalLinks: [
    {
      href: "/article/texas-high-school-football-newcomers",
      label: "Texas high school football for newcomers",
      description: "Start with the bigger picture of Friday night football culture, districts, rivalries and the playoff season.",
    },
    {
      href: "/sports/friday-night-lights",
      label: "Friday Night Lights, Defined",
      description: "Explore Texas high school football traditions, stadiums, homecoming and the season arc.",
    },
    {
      href: "/sports-venues/high-school-football",
      label: "Texas high school football stadiums",
      description: "Browse landmark stadiums and game-night destinations across the state.",
    },
    {
      href: "https://www.uiltexas.org/athletics/conference-cutoffs",
      label: "Official UIL conference cutoffs",
      description: "See the current 2026–27 and 2027–28 enrollment ranges directly from the UIL.",
    },
    {
      href: "https://www.uiltexas.org/football/alignments",
      label: "Official UIL football alignments",
      description: "See the current districts for every UIL football classification and division.",
    },
    {
      href: "https://www.texasfootball.com/rankings/",
      label: "Dave Campbell's Texas Football rankings",
      description: "See current media rankings by classification and division.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("If you are new to Texas high school football, labels such as 6A, 5A Division I and 2A Division II can sound like rankings of how good a team is. They are not. In UIL football, the classification tells you primarily how large a school is. A team can be winless and still be 6A, while an undefeated state champion can come from 2A or 1A."),
    p("The University Interscholastic League, or UIL, organizes most public-school competition in Texas. Every two years, it uses enrollment figures to reclassify schools and redraw districts. The current alignment covers the 2026–27 and 2027–28 school years."),
    h("The short answer: 1A is smallest and 6A is largest"),
    p("UIL classifications run from 1A through 6A. The higher the number, the larger the school's enrollment range. The system is intended to keep schools competing against others with roughly similar student populations rather than regularly matching a tiny rural school against a campus with several thousand students."),
    list(
      "Class 6A: 2,215 students and above.",
      "Class 5A: 1,305 to 2,214 students.",
      "Class 4A: 550 to 1,304 students.",
      "Class 3A: 246 to 549 students.",
      "Class 2A: 105 to 245 students.",
      "Class 1A: 104.9 students and below."
    ),
    p("Those are the UIL conference cutoffs for 2026–28. They can change at the next biennial realignment, so an older article may show different numbers even though the basic 1A-to-6A structure is the same."),
    h("Why some classes say Division I and Division II"),
    p("Football adds another layer. For the 2026–28 alignment, Classes 1A through 5A are divided into Division I and Division II by enrollment before the season. Division I contains the larger schools within that classification and Division II contains the smaller schools."),
    list(
      "5A Division I: 1,870 to 2,214; 5A Division II: 1,305 to 1,869.",
      "4A Division I: 896 to 1,304; 4A Division II: 550 to 895.",
      "3A Division I: 367 to 549; 3A Division II: 246 to 366.9.",
      "2A Division I: 175.6 to 245.9; 2A Division II: 105 to 175.5.",
      "1A Division I: 57.6 to 104.9; 1A Division II: 57.5 and below."
    ),
    p("That means a 4A Division I school does not move into Division II because it had a bad season. Its division is determined by enrollment, not wins, losses, coaching quality or program reputation."),
    h("6A works differently in the playoffs"),
    p("Class 6A is the important exception. UIL does not publish a fixed 6A Division I and Division II enrollment cutoff with the other pre-season division breaks. Instead, 6A schools compete together in district play. When the four playoff qualifiers from a district are known, the two larger-enrollment qualifiers go into the Division I playoff bracket and the two smaller qualifiers go into Division II."),
    p("So when someone says a 6A team is 'Division I' or 'Division II,' that usually describes its playoff bracket for that season, not a permanent preseason classification in the same way as 5A Division I or 4A Division II."),
    h("What makes 1A different"),
    p("Class 1A UIL football is six-man football rather than the standard 11-man game played in Classes 2A through 6A. Six-man football uses a smaller field and modified rules designed for schools that may not have enough students to sustain a traditional 11-man roster."),
    p("The result is one of the most distinctive versions of football in Texas. A 1A Division II program may come from a school with only a few dozen students, yet it still has its own district race, playoff bracket and state championship path."),
    h("Classification is not the same as district"),
    p("A classification tells you the school's enrollment tier. A district is the smaller geographic group of schools it plays for UIL standings. For example, a 5A Division I team is placed into a 5A Division I district with other schools in its general part of Texas."),
    p("District records matter because they determine playoff qualification. Nondistrict games can build a résumé, settle a rivalry or prepare a team for league play, but they do not change a school's classification."),
    h("So what are the rankings you see every week?"),
    p("Media rankings are separate from UIL classification. Outlets such as Dave Campbell's Texas Football publish polls that rank teams based on performance and expectations. In 2026, Dave Campbell's weekly statewide rankings list 6A as one group, then separate 5A Division I, 5A Division II and the corresponding divisions down through 1A six-man."),
    p("Those rankings are editorial or statistical evaluations. They do not decide which classification a school belongs to, which district it plays in or whether it qualifies for the playoffs. A team can be ranked No. 1 in 3A Division II and still be much smaller than an unranked 6A school."),
    h("What about statewide or 'pound-for-pound' lists?"),
    p("Some publications and computer systems also compare teams across classification lines. Those lists answer a different question: not 'Who is best in 4A Division I?' but 'How do teams compare across the entire state?' The methodology varies. Some emphasize current results, some use computer ratings, and some measure program strength across multiple seasons."),
    p("That is why a statewide list can place a smaller-school powerhouse ahead of a much larger school. The list is comparing football performance, while the UIL classification is still describing enrollment."),
    h("An easy way to read a Texas football label"),
    p("When you see something like '5A Division II No. 3,' read it in three pieces. '5A' is the enrollment classification. 'Division II' is the smaller-enrollment half of 5A football. 'No. 3' is a media ranking within that group. Only the first two are part of the UIL competitive structure."),
    p("Likewise, if a school is described simply as '6A,' that tells you it has at least 2,215 students under the 2026–28 cutoff. It does not tell you whether the team is good, whether it is favored to win its district or which 6A playoff division it will ultimately enter."),
    h("Why the cutoffs move"),
    p("Texas school enrollment changes constantly. Fast-growing suburbs add campuses, established schools gain or lose students, and small districts can shift enough to cross a classification line. UIL therefore reclassifies and realigns on a two-year cycle rather than locking schools into one tier indefinitely."),
    p("That is also why the number 2,215 matters now but should not be treated as permanent. For 2024–26, the 6A cutoff was 2,275. The new 2026–28 alignment lowered it to 2,215."),
    h("The simplest takeaway"),
    p("The easiest way to remember the system is this: classification measures school size; division further separates football schools by enrollment; district determines the local competition and playoff race; rankings are outside evaluations of team strength."),
    p("Once those four ideas are separated, the alphabet soup starts to make sense—and a Friday night scoreboard becomes much easier to read.")
  ],
};
