export type FootballProgramEditorial = {
  slug: string;
  coach?: {
    name: string;
    title: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  campus?: {
    address: string;
    phone?: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  schedule?: {
    label: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  venue?: {
    name: string;
    address: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    note: string;
  };
  development?: {
    title: string;
    body: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  theme?: { accentHex: string; label: string };
  seo?: { title: string; description: string };
  milestones?: Array<{ date: string; title: string; body: string; sourceUrl: string; sourceLabel: string }>;
  overview: string[];
  faq: Array<{ question: string; answer: string }>;
};

const PROGRAM_EDITORIAL: Record<string, FootballProgramEditorial> = {
  "wills-point": {
    "slug": "wills-point",
    "theme": {
      "accentHex": "#285DA4",
      "label": "Blue-and-white editorial accents based on district-published school colors"
    },
    "seo": {
      "title": "Wills Point Tigers Football: 1965 State Title, Coach & UIL District",
      "description": "Wills Point Tigers football: 1965 state championship, coach James Boxley, Ken Autry Davis Field and current 2026–28 UIL opponents."
    },
    "coach": {
      "name": "James Boxley",
      "title": "Athletic director and head football coach",
      "sourceUrl": "https://wphs.wpisd.com/3184_3",
      "sourceLabel": "Wills Point High School Athletics",
      "verifiedAt": "2026-10-08"
    },
    "venue": {
      "name": "Ken Autry Davis Field",
      "address": "785 Wingo Way, Wills Point, TX",
      "sourceUrl": "https://wp-abc.org/pages/our-facilities",
      "sourceLabel": "Wills Point Athletic Booster Club facilities",
      "verifiedAt": "2026-10-08",
      "note": "The booster club identifies Ken Autry Davis Field as the Tigers' dedicated football stadium. Verify the current game venue, parking and ticket instructions with the school before traveling."
    },
    "overview": [
      "Wills Point's football story includes a state championship: the UIL all-time appearances archive lists the Tigers as 1965 state champions, in the historical 3A classification. That achievement is separate from the 2026 competition assignment.",
      "For the 2026–28 realignment, Wills Point is a 4A Division II, District 7 team. The district opponents shown elsewhere on this profile reflect that cycle rather than an all-time rivals list.",
      "The high school identifies James Boxley as its athletic director and head football coach, a position he assumed in February 2023. For fans visiting Ken Autry Davis Field, the booster club documents the facility while the school remains the current source for game-specific details."
    ],
    "milestones": [
      {
        "date": "1965",
        "title": "A UIL football championship",
        "body": "The UIL all-time football records recognize Wills Point as a state champion in the historical 3A classification.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time appearances"
      },
      {
        "date": "2023",
        "title": "James Boxley becomes head coach",
        "body": "The high school's athletics page dates Boxley's athletic director and head football coach appointment to February 2023.",
        "sourceUrl": "https://wphs.wpisd.com/3184_3",
        "sourceLabel": "Wills Point High School athletics"
      },
      {
        "date": "2026–28",
        "title": "The 4A Division II era",
        "body": "The current UIL cycle places Wills Point in Class 4A Division II, District 7.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/4AD2FB2026.pdf",
        "sourceLabel": "Official UIL district alignment"
      }
    ],
    "faq": [
      {
        "question": "Did Wills Point ever win a state football title?",
        "answer": "Yes. The UIL's historical archive lists Wills Point as a 1965 state football champion under the old 3A classification."
      },
      {
        "question": "Who coaches Wills Point football?",
        "answer": "Wills Point High School identifies James Boxley as its head football coach and athletic director; the school dates the role to February 2023."
      },
      {
        "question": "Where is Wills Point's home football field?",
        "answer": "The Wills Point Athletic Booster Club documents Ken Autry Davis Field at 785 Wingo Way. Confirm the assigned venue for the specific game."
      }
    ]
  },
  "abbott": {
    "slug": "abbott",
    "theme": {
      "accentHex": "#96712B",
      "label": "Old-gold editorial accents with black, from the UIL's Abbott football team record"
    },
    "seo": {
      "title": "Abbott Panthers Six-Man Football: 2015 Title & Finals History",
      "description": "Abbott Panthers six-man football history: 2015 UIL title, 2012 and 2022 finals, a 2024 semifinal and current 1A Division I opponents."
    },
    "campus": {
      "address": "219 S. First Street, Abbott, TX 76621",
      "sourceUrl": "https://www.abbottisd.org/",
      "sourceLabel": "Abbott Independent School District",
      "verifiedAt": "2026-10-08"
    },
    "overview": [
      "Abbott is a Hill County six-man program with one state championship, won in 2015. UIL's all-time history also lists the Panthers as finalists in 2012 and 2022, providing a clear timeline of three championship-game appearances.",
      "UIL's 2022 state-team archive lists Terry J Crawford as head coach that season and shows Abbott entering the championship game against Westbrook. This is historical coaching evidence and should not be described as a current 2026 appointment.",
      "Abbott reached the 2024 state semifinals, where UIL's Gordon team record documents a 77–36 result. The school competes in Class 1A Division I, District 14 in 2026–28; specific 2026 coaches, tickets and venues should be confirmed from Abbott ISD."
    ],
    "milestones": [
      {
        "date": "2012",
        "title": "A state-final appearance",
        "body": "Abbott reached the UIL Class 1A Division I championship game.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time state appearances"
      },
      {
        "date": "2015",
        "title": "Six-man state champions",
        "body": "The Panthers' 2015 six-man title is the program's state championship recorded by UIL.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time state appearances"
      },
      {
        "date": "2022",
        "title": "Another championship game",
        "body": "Abbott met Westbrook in the 1A Division I final. The UIL team archive identifies Terry J Crawford as 2022–23 head coach.",
        "sourceUrl": "https://www.uiltexas.org/football/state-team/abbott-2022-2023-boys-football",
        "sourceLabel": "UIL 2022–23 Abbott team"
      },
      {
        "date": "2024",
        "title": "State-semifinal run",
        "body": "Gordon's UIL season archive records a 77–36 semifinal victory over Abbott.",
        "sourceUrl": "https://www.uiltexas.org/football/state-team-mp-archive/gordon-2024-2025-football",
        "sourceLabel": "UIL 2024–25 Gordon team"
      }
    ],
    "faq": [
      {
        "question": "How many football state titles has Abbott won?",
        "answer": "The UIL all-time record lists one Abbott title (2015), plus state-final appearances in 2012 and 2022."
      },
      {
        "question": "Does Abbott play six-man or 11-man football?",
        "answer": "Abbott is in UIL 1A Division I six-man football, District 14, for the 2026–28 alignment."
      },
      {
        "question": "Was Terry J Crawford Abbott's head coach?",
        "answer": "The UIL 2022–23 state-team page names Terry J Crawford as Abbott's coach for that season. That source does not verify the current 2026 head coach."
      }
    ]
  },
  "katy": {
    "slug": "katy",
    "theme": {
      "accentHex": "#B52334",
      "label": "Katy red and white editorial accents"
    },
    "seo": {
      "title": "Katy Tigers Football: Nine Texas State Titles & 2026 Schedule",
      "description": "Explore the Katy Tigers' nine Texas football championships, coach Gary Joseph, the Mike Johnston legacy, Red Sea tradition and 2026 schedule."
    },
    "coach": {
      "name": "Gary Joseph",
      "title": "Head football coach",
      "sourceUrl": "https://katyabc.org/sport/football/",
      "sourceLabel": "Katy Athletic Booster Club football coaching staff",
      "verifiedAt": "2026-10-08"
    },
    "schedule": {
      "label": "2026 team schedule and assigned venues",
      "sourceUrl": "https://www.katyfb.com/schedule",
      "sourceLabel": "Katy Football team schedule",
      "verifiedAt": "2026-10-08"
    },
    "overview": [
      "Nine state championships distinguish the Katy Tigers: 1959, 1997, 2000, 2003, 2007, 2008, 2012, 2015 and 2020. Those seasons are recorded in the Katy Athletic Booster Club's published football record book and tracked in UIL's state-final archive.",
      "The City of Katy's February 2026 proclamation credits Mike Johnston with 200 wins and three state titles during his 1982–2003 tenure as head coach. Katy's current booster club coaching directory lists Gary Joseph as head coach.",
      "The Katy Athletic Booster Club calls the program's intensely supportive local following the Red Sea. The team's published 2026 schedule assigns games between Legacy Stadium and Rhodes Stadium, making the specific date, venue and ticket source more useful to visiting supporters than a single presumed home ground."
    ],
    "milestones": [
      {
        "date": "1959",
        "title": "Katy's first state championship",
        "body": "Katy ISD identifies the 1959 football championship as the district's first state team title.",
        "sourceUrl": "https://www.katyisd.org/athletics/home",
        "sourceLabel": "Katy ISD Athletics"
      },
      {
        "date": "1982–2003",
        "title": "The Mike Johnston era",
        "body": "The City of Katy honored Johnston's tenure, including 200 wins and three UIL state titles.",
        "sourceUrl": "https://www.cityofkaty.com/home/showpublisheddocument/10910/639057350123070000",
        "sourceLabel": "City of Katy 2026 proclamation"
      },
      {
        "date": "2015",
        "title": "An undefeated title season",
        "body": "The program's football record book includes 2015 among its undefeated championship seasons.",
        "sourceUrl": "https://katyabc.org/wp-content/uploads/2024/02/record_book_02.26.24.pdf",
        "sourceLabel": "Katy football record book"
      },
      {
        "date": "2020",
        "title": "Title number nine",
        "body": "The 2020 state championship completed the nine-title sequence documented in the published Katy football archive.",
        "sourceUrl": "https://katyabc.org/wp-content/uploads/2024/02/record_book_02.26.24.pdf",
        "sourceLabel": "Katy football record book"
      }
    ],
    "faq": [
      {
        "question": "How many state football championships has Katy High School won?",
        "answer": "The Katy Athletic Booster Club record book lists nine: 1959, 1997, 2000, 2003, 2007, 2008, 2012, 2015 and 2020."
      },
      {
        "question": "Who is Katy Tigers football's head coach?",
        "answer": "The Katy Athletic Booster Club's football directory lists Gary Joseph as head coach."
      },
      {
        "question": "Which stadium hosts Katy's 2026 football games?",
        "answer": "The current team schedule assigns games to Legacy Stadium and Rhodes Stadium. Always confirm the specific game's venue and ticket information."
      }
    ]
  },
  spring: {
    slug: 'spring',
    coach: {
      name: 'KaRon Coleman Sr.',
      title: 'Head football coach / high-school athletic coordinator',
      sourceUrl: 'https://www.springisd.org/o/shs/staff?page_no=2',
      sourceLabel: 'Spring High School staff directory',
      verifiedAt: '2026-10-05',
    },
    campus: {
      address: '19428 I-45 North, Spring, TX 77373',
      phone: '281-891-7000',
      sourceUrl: 'https://www.springisd.org/o/shs',
      sourceLabel: 'Spring High School',
      verifiedAt: '2026-10-05',
    },
    schedule: {
      label: '2026–27 football schedule',
      sourceUrl: 'https://www.springisd.org/o/shs/page/athletics',
      sourceLabel: 'Spring High School Athletics',
      verifiedAt: '2026-10-05',
    },
    venue: {
      name: 'Planet Ford Stadium',
      address: '23802 Cypresswood Dr., Spring, TX 77373',
      sourceUrl: 'https://www.springisd.org/page/sports-facilities/',
      sourceLabel: 'Spring ISD Sports Facilities',
      verifiedAt: '2026-10-05',
      note: 'Spring ISD lists Planet Ford Stadium as a district sports facility. Spring High played the first football game there when the stadium opened in 2019. Confirm the current Spring High schedule for the specific game and venue assignment.',
    },
    development: {
      title: 'A new Spring High School campus is under construction',
      body: 'Spring ISD reported in May 2026 that construction of the new Spring High School was ahead of schedule and that the football field at the new athletics complex had reached final grade. Campus and facility details can change quickly during this project, so current game-day and enrollment information should be checked against district sources.',
      sourceUrl: 'https://shs.springisd.org/o/shs/article/2878042',
      sourceLabel: 'Spring High School construction update',
      verifiedAt: '2026-10-05',
    },
    overview: [
      'Spring High School is a Spring ISD varsity football program in north Harris County. The school identifies its teams as the Lions and uses green and white as its school colors.',
      'For 2026, Spring High School lists KaRon Coleman Sr. as its high-school athletic coordinator, and the school announced him as the new Spring High football head coach earlier in the year. The school also publishes its current football schedule through the athletics page.',
      'Spring ISD operates Planet Ford Stadium on Cypresswood Drive as a district football facility. Because district venues can host multiple schools and events, fans should confirm the exact venue, ticketing and arrival information for each game.',
    ],
    faq: [],
  },
};

export function getFootballProgramEditorial(slug: string) {
  return PROGRAM_EDITORIAL[slug] ?? null;
}
