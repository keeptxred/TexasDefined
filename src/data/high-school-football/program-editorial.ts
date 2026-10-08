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
  notice?: { title: string; body: string; sourceUrl: string; sourceLabel: string; verifiedAt: string };
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
  photo?: { src: string; width: number; height: number; alt: string; caption: string; credit: string; sourceUrl: string; license: string; licenseUrl: string };
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
      "sourceUrl": "https://wphs.wpisd.com/28755_3",
      "sourceLabel": "Wills Point High School 2026–27 coaches",
      "verifiedAt": "2026-10-08"
    },
    "schedule": {
      "label": "Wills Point ISD calendar — verify 2026 game times",
      "sourceUrl": "https://wpisd.com/page/page_calendar?calID=122113",
      "sourceLabel": "Official Wills Point ISD event calendar",
      "verifiedAt": "2026-10-08"
    },
    "campus": {
      "address": "1800 W South Commerce Street, Wills Point, TX 75169",
      "phone": "903-873-2371",
      "sourceUrl": "https://wphs.wpisd.com/3209_3",
      "sourceLabel": "Official Wills Point High School ticket information and campus contact (2025 prices may be outdated)",
      "verifiedAt": "2026-10-08"
    },
    "venue": {
      "name": "Ken Autry Davis Field",
      "address": "785 Wingo Way, Wills Point, TX",
      "sourceUrl": "https://wp-abc.org/pages/our-facilities",
      "sourceLabel": "Wills Point Athletic Booster Club facilities",
      "verifiedAt": "2026-10-08",
      "note": "The booster club identifies Ken Autry Davis Field at 785 Wingo Way as the Tigers' football stadium and reports seating for 4,047 (a separate Texas football reference lists 3,000, so capacity estimates disagree). The official high school ticket page links GoFan but contains 2025-specific dates and prices. Check that page and the current Wills Point ISD event calendar for actual 2026 gate times, admission, accessibility and parking instructions before traveling. The high school campus at 1800 W South Commerce Street is not the field address."
    },
    "overview": [
      "Wills Point's football story includes a state championship: the UIL all-time appearances archive lists the Tigers as 1965 Class 1A state champions. The official 1965–66 UIL football archive records a 14–0 state-final win over White Deer. The 1965 1A designation must not be confused with Wills Point's 2026–28 4A Division II placement.",
      "For the 2026–28 realignment, Wills Point is a 4A Division II, District 7 team. The district opponents shown elsewhere on this profile reflect that cycle rather than an all-time rivals list.",
      "The high school identifies James Boxley as head football coach, appointed in February 2023; its 2026–27 coaching directory names Steve Oliver as offensive coordinator and Flint Bigham as defensive coordinator. For games at Ken Autry Davis Field, follow the linked school ticket information and district event calendar rather than assuming old posted prices, kickoffs or parking policies apply."
    ],
    "milestones": [
      {
        "date": "1965",
        "title": "A UIL football championship",
        "body": "The UIL 1965–66 championship archive records Wills Point winning the Class 1A state final over White Deer by 14–0.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P528",
        "sourceLabel": "UIL official football state archives"
      },
      {
        "date": "2023",
        "title": "James Boxley becomes head coach",
        "body": "The high school's athletics page dates Boxley's athletic director and head football coach appointment to February 2023.",
        "sourceUrl": "https://wphs.wpisd.com/3184_3",
        "sourceLabel": "Wills Point High School athletics"
      },
      {
        "date": "2026–27",
        "title": "The school-listed coaching staff",
        "body": "Wills Point High School identifies James Boxley as head football coach, Steve Oliver as offensive coordinator and Flint Bigham as defensive coordinator for 2026–27.",
        "sourceUrl": "https://wphs.wpisd.com/28755_3",
        "sourceLabel": "Official Wills Point 2026–27 coaches"
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
        "answer": "Yes. UIL's 1965–66 football state archive identifies Wills Point as the Class 1A champion, with a 14–0 victory over White Deer."
      },
      {
        "question": "Who coaches Wills Point football?",
        "answer": "Wills Point High School lists James Boxley as head football coach in its 2026–27 coaches directory, alongside offensive coordinator Steve Oliver and defensive coordinator Flint Bigham. The school dates Boxley’s coaching appointment to February 2023."
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
      "description": "Abbott Panthers six-man football: 2015 state champions, three finals appearances, historical halfback Willie Nelson and the 2026 UIL alignment."
    },
    "campus": {
      "address": "219 S. First Street, Abbott, TX 76621",
      "sourceUrl": "https://www.abbottisd.org/",
      "sourceLabel": "Abbott Independent School District",
      "verifiedAt": "2026-10-08"
    },
    "coach": {
      "name": "Kyle Crawford",
      "title": "Athletic director and head football coach",
      "sourceUrl": "https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=623415&type=u&uREC_ID=421837",
      "sourceLabel": "Abbott ISD — Kyle Crawford official staff profile",
      "verifiedAt": "2026-10-08"
    },
    "schedule": {
      "label": "Abbott ISD current events and varsity football dates",
      "sourceUrl": "https://www.abbottisd.org/apps/events/",
      "sourceLabel": "Abbott ISD official 2026 events calendar",
      "verifiedAt": "2026-10-08"
    },
    "venue": {
      "name": "Panther Field",
      "address": "Abbott, Texas — confirm the stadium entry address with Abbott ISD",
      "sourceUrl": "https://www.texasfootball.com/team/abbott-panthers",
      "sourceLabel": "Dave Campbell's Texas Football — Abbott venue",
      "verifiedAt": "2026-10-08",
      "note": "Dave Campbell's Texas Football calls the Abbott six-man venue Panther Field and lists a reported capacity of 250; neither a current stadium entrance address nor admission/parking/accessibility rules have been independently verified. Abbott ISD's official campus contact is 219 S. First Street, (254) 582-3011, and the Texas licensing registry lists a separate athletic fieldhouse project at 201 3rd Street. Neither fact alone proves the game-night gate address. Verify the current district calendar and call the school before traveling."
    },
    "photo": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/9/96/Willie-Nelson-Highschool.jpg",
      "width": 134,
      "height": 200,
      "alt": "Archival Abbott High School football portrait of Willie Nelson wearing football headgear, labeled Left Halfback",
      "caption": "Abbott High School football halfback Willie Nelson, circa 1950. An authentic archival portrait—not an image of the modern Panthers program.",
      "credit": "Abbott High School",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Willie-Nelson-Highschool.jpg",
      "license": "U.S. public domain (published without copyright notice)",
      "licenseUrl": "https://commons.wikimedia.org/wiki/File:Willie-Nelson-Highschool.jpg#Licensing"
    },
    "overview": [
      "Abbott is a Hill County six-man program with one state championship, earned in 2015 by defeating Crowell 40–30 in the UIL 1A Six-Man Division I final. The UIL archival finals also record losses to Throckmorton 72–30 in 2012 and Westbrook in 2022. These are three championship-game appearances in different seasons, not three titles.",
      "Coaching generations matter in Abbott: UIL's 2022 state-team archive lists Terry J Crawford as head coach that season, with Kyle Crawford among the assistants. Abbott ISD now identifies Kyle Crawford as its athletic director and head football coach on his own district staff page. The old 2022 roster and the current district staff page describe different eras; do not conflate them.",
      "Abbott reached the 2024 state semifinals, where UIL's Gordon team record documents a 77–36 result. In the 2026–28 alignment Abbott competes in Class 1A Division I, District 14. The official district events calendar lists a 2026 varsity home game against Coolidge on October 9 at 7:30 p.m.; this is a dated calendar entry, not a guarantee that kickoff, venue access or ticket arrangements will not change. Use the linked calendar and school contact for confirmation.",
      "Abbott also has a notable football alumnus: future musician Willie Nelson played left halfback for the school in the late 1940s. PBS identifies Nelson as an Abbott football halfback, and a former teammate’s family recalled their six-man playing days in 2019 reporting. His surviving Abbott High School portrait is archival evidence of the earlier era, not evidence of current-team achievements."
    ],
    "milestones": [
      {
        "date": "Circa 1950",
        "title": "Willie Nelson played halfback for Abbott",
        "body": "Before his country-music career, Willie Nelson played Abbott High School football as a halfback. A contemporary teammate’s family specifically recalls the six-man team; PBS also documents his position.",
        "sourceUrl": "https://www.pbs.org/kenburns/country-music/willie-nelson-biography",
        "sourceLabel": "PBS Country Music biography; see also KWTX 2019 teammate recollections"
      },
      {
        "date": "2012",
        "title": "A state-final appearance",
        "body": "Abbott lost the 2012 UIL Class 1A Six-Man Division I championship final to Throckmorton 72–30.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P148",
        "sourceLabel": "UIL 2012–13 official state championship results"
      },
      {
        "date": "2015",
        "title": "Six-man state champions",
        "body": "Abbott defeated Crowell 40–30 in the 2015 UIL Class 1A Six-Man Division I state championship final, its lone UIL football title.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P98",
        "sourceLabel": "UIL 2015–16 official state championship results"
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
        "question": "Did Willie Nelson play football for Abbott High School?",
        "answer": "Yes. PBS identifies Willie Nelson as an Abbott High School football halfback, and KWTX recorded a former teammate’s family describing their small six-man team. An Abbott High School football portrait of Nelson from about 1950 is preserved on Wikimedia Commons."
      },
      {
        "question": "How many football state titles has Abbott won?",
        "answer": "The UIL all-time record lists one Abbott title (2015), plus state-final appearances in 2012 and 2022."
      },
      {
        "question": "Does Abbott play six-man or 11-man football?",
        "answer": "Abbott is in UIL 1A Division I six-man football, District 14, for the 2026–28 alignment."
      },
      {
        "question": "Who is Abbott's head football coach?",
        "answer": "Abbott ISD identifies Kyle Crawford as its athletic director and head football coach on his district staff page. UIL lists Terry J Crawford for the historical 2022–23 team, when Kyle was among the assistants. The two records describe different seasons."
      },
      {
        "question": "Where should visiting supporters look for Abbott football games and tickets?",
        "answer": "Abbott's official district events calendar publishes current varsity dates. Dave Campbell's Texas Football calls the home venue Panther Field, but its stadium entrance address, admission and parking/accessibility policies are not confirmed by the sources reviewed. Contact Abbott ISD at (254) 582-3011 and use the live school calendar before traveling."
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
    "photo": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/6/62/KatyHighSchool.JPG",
          "width": 800,
          "height": 614,
          "alt": "Katy High School entrance sign reading Home of Champions in an archival photograph",
          "caption": "Katy High School’s “Home of Champions” sign, shown in a historic image uploaded in 2009. This is not a current game photograph.",
          "credit": "Sskiles22",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:KatyHighSchool.JPG",
          "license": "Public domain (uploader dedication)",
          "licenseUrl": "https://commons.wikimedia.org/wiki/File:KatyHighSchool.JPG#Licensing"
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
  "fort-davis": {
    "slug": "fort-davis",
    "theme": {
      "accentHex": "#407A41",
      "label": "Green and gold from Fort Davis ISD's published spirit references"
    },
    "seo": {
      "title": "Fort Davis Indians Football: 2026 Season Canceled & 2003 Final",
      "description": "Fort Davis Indians six-man football: district canceled the 2026 season because of low participation; explore its 2003 state-final run and UIL alignment."
    },
    "notice": {
      "title": "Fort Davis ISD canceled the 2026 football season",
      "body": "On August 20, 2026, Superintendent Jason Crow announced cancellation of both high-school and middle-school football because too few students could participate. Although UIL's 2026–28 alignment still lists Fort Davis in 1A Division II District 5, that alignment does not mean games are being played in 2026. Check Fort Davis ISD for any future change.",
      "sourceUrl": "https://www.firstalert7.com/2026/08/20/fort-davis-cancels-2026-football-season/",
      "sourceLabel": "First Alert 7 reporting Fort Davis ISD's August 20 announcement",
      "verifiedAt": "2026-10-08"
    },
    "photo": {
          "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Bart_Coan_Field_from_west.jpg/960px-Bart_Coan_Field_from_west.jpg",
          "width": 960,
          "height": 720,
          "alt": "Bart Coan Field in Fort Davis viewed from the west stands during the September 2020 Balmorhea game",
          "caption": "Bart Coan Field during the September 4, 2020 Fort Davis–Balmorhea game. Historical photograph; Fort Davis canceled its 2026 football season.",
          "credit": "Fortguy",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bart_Coan_Field_from_west.jpg",
          "license": "CC BY-SA 4.0; displayed at reduced size without editorial alterations",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "overview": [
      "Fort Davis' Indians are a Jeff Davis County six-man football program with a documented UIL state-finals appearance in 2003. The UIL all-time register credits the team with one championship-game appearance and no state football title.",
      "The 2003 championship game was unusually close: Fort Davis finished runner-up to Strawn by a score of 67–62. That history gives this small Davis Mountains program a distinct place in Texas six-man football.",
      "For the 2026–28 alignment, UIL assigned Fort Davis to Class 1A Division II, District 5, alongside Dell City, Marfa and Sierra Blanca. But Fort Davis ISD announced August 20 that the 2026 middle- and high-school football seasons were canceled due to low participation. Do not use the alignment list as a 2026 game schedule.",
      "Fort Davis ISD's public materials identify its teams as the Indians and promote green-and-gold school spirit. Its staff page currently identifies Gary Beam as athletic director, but that alone does not establish a current head-football-coach assignment."
    ],
    "milestones": [
      {
        "date": "2003",
        "title": "Five points from a six-man state crown",
        "body": "Fort Davis played in the 2003 six-man state championship, losing a 67–62 final to Strawn. UIL lists it as the team's only state-final appearance.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time football appearances"
      },
      {
        "date": "2026–28",
        "title": "Assigned to UIL District 5",
        "body": "The official 1A Division II realignment includes Fort Davis, Dell City, Marfa and Sierra Blanca. Alignment does not establish that actual 2026 games will take place.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf",
        "sourceLabel": "UIL football alignment"
      },
      {
        "date": "August 20, 2026",
        "title": "Football season canceled",
        "body": "Fort Davis ISD announced that insufficient student participation required canceling the entire 2026 football season for both high school and middle school.",
        "sourceUrl": "https://www.firstalert7.com/2026/08/20/fort-davis-cancels-2026-football-season/",
        "sourceLabel": "Local reporting of superintendent's announcement"
      }
    ],
    "faq": [
      {
        "question": "Is Fort Davis playing high school football in 2026?",
        "answer": "No. According to the Fort Davis ISD superintendent's August 20 announcement, the 2026 football season was canceled for both high school and middle school because of low participation. Verify any subsequent changes with the district."
      },
      {
        "question": "Has Fort Davis won a Texas six-man state championship?",
        "answer": "UIL's all-time football register credits Fort Davis with one state-final appearance, in 2003, but no state title. It lost that final to Strawn 67–62."
      },
      {
        "question": "What UIL district was Fort Davis assigned for 2026?",
        "answer": "Fort Davis remains listed in UIL Class 1A Division II, District 5 for the 2026–28 realignment, even though the school canceled its 2026 football season."
      }
    ]
  },
  "southlake-carroll": {
    "slug": "southlake-carroll",
    "theme": {
      "accentHex": "#176B4A",
      "label": "Dragon green with white and black, grounded in the team's UIL identity"
    },
    "seo": {
      "title": "Southlake Carroll Dragons Football: 8 State Titles & 2026 Team",
      "description": "Southlake Carroll Dragons football: eight actual state titles, coach Lee Munn, Dragon Stadium and official 2026 schedule; 2003 runner-up clarified."
    },
    "coach": {
      "name": "Lee Munn",
      "title": "Head football coach, appointed February 2, 2026",
      "sourceUrl": "https://www.dragonsportsnetwork.com/news/110554",
      "sourceLabel": "Carroll ISD official coaching announcement",
      "verifiedAt": "2026-10-08"
    },
    "schedule": {
      "label": "Official 2026 Carroll varsity football schedule and ticket information",
      "sourceUrl": "https://www.southlakecarroll.edu/district-information/district-departments/athletics",
      "sourceLabel": "Carroll ISD Athletics",
      "verifiedAt": "2026-10-08"
    },
    "overview": [
      "Southlake Carroll's Dragons have won eight Texas football state championships: 1988, 1992, 1993, 2002, 2004, 2005, 2006 and 2011. Carroll ISD explicitly refers to eight titles in its official 2026 football announcement.",
      "The 2003 state final is a historic near miss, not a ninth title. UIL's own account says Katy defeated the Dragons 16–15. An inconsistent UIL all-time summary currently marks 2003 as a Carroll title, so TexasDefined cross-checks that entry against the direct game record and Carroll ISD rather than copying the erroneous number.",
      "Carroll ISD named Lee Munn head coach on February 2, 2026 after he had served as associate head coach and defensive coordinator. For the 2026–28 UIL realignment, Southlake Carroll competes in 6A District 4.",
      "The 2026 varsity schedule assigns home games to Dragon Stadium but also includes away sites and the season-opening Cotton Bowl matchup against Jenks. Fans should confirm the particular stadium, admission rules and kickoff through Carroll ISD Athletics rather than presume every game takes place at Dragon Stadium."
    ],
    "milestones": [
      {
        "date": "1988–1993",
        "title": "The first three championship seasons",
        "body": "The Dragons won state championships in 1988, 1992 and 1993, before the turn-of-century 5A title runs.",
        "sourceUrl": "https://www.southlakecarroll.edu/district-information/district-departments/athletics/dragon-state-championships",
        "sourceLabel": "Carroll ISD state championship list"
      },
      {
        "date": "2002–2006",
        "title": "Four more titles and a 2003 near miss",
        "body": "Carroll won titles in 2002, 2004, 2005 and 2006. Katy beat Carroll in the 2003 5A Division II final, 16–15; 2003 was not a Dragons championship.",
        "sourceUrl": "https://www.uiltexas.org/100/football",
        "sourceLabel": "UIL 100-year football game retrospective"
      },
      {
        "date": "2011",
        "title": "The eighth state championship",
        "body": "Carroll ISD lists football among its 2011–12 state championships, bringing the program's recognized total to eight.",
        "sourceUrl": "https://www.southlakecarroll.edu/district-information/district-departments/athletics/dragon-state-championships",
        "sourceLabel": "Official Carroll ISD championship history"
      },
      {
        "date": "2024",
        "title": "Another trip to the state final",
        "body": "The UIL 2024–25 archive documents Carroll's run to the 6A Division II state championship game under then-coach Riley Dodge.",
        "sourceUrl": "https://www.uiltexas.org/football/state-team-mp-archive/southlake-carroll-2024-2025-football",
        "sourceLabel": "UIL 2024–25 Carroll state-team record"
      },
      {
        "date": "2026",
        "title": "Lee Munn named head coach",
        "body": "Carroll ISD appointed Lee Munn as head football coach February 2, 2026 after eight years with the staff.",
        "sourceUrl": "https://www.dragonsportsnetwork.com/news/110554",
        "sourceLabel": "Official Carroll athletics news"
      }
    ],
    "faq": [
      {
        "question": "How many football championships has Southlake Carroll actually won?",
        "answer": "Eight: 1988, 1992, 1993, 2002, 2004, 2005, 2006 and 2011. An erroneous UIL summary marks 2003 as a ninth win, but UIL's direct 2003 game recap and Carroll ISD confirm Katy won that final."
      },
      {
        "question": "Who coaches Southlake Carroll football in 2026?",
        "answer": "Carroll ISD named Lee Munn head football coach on February 2, 2026, following his service as associate head coach and defensive coordinator."
      },
      {
        "question": "Where do the Carroll Dragons play home games?",
        "answer": "The Dragons use Dragon Stadium for listed home dates, but the official 2026 schedule also assigns other venues, including the Cotton Bowl for the August 27 opener. Confirm each game on Carroll ISD Athletics."
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
