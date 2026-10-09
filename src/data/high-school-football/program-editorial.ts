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
  "abilene-texas-leadership": {
    "slug": "abilene-texas-leadership",
    "theme": {
      "accentHex": "#755B38",
      "label": "Original neutral bronze research accents for a developing charter-school program; deliberately not presented as verified official school colors or logo"
    },
    "seo": {
      "title": "Abilene Texas Leadership Eagles Football: Webb Murphy & 2026",
      "description": "TLCA Abilene Eagles football guide: coach Webb Murphy, fifth 11-man season, 2026 UIL 2A Division I District 5, 187 enrollment and charter admissions."
    },
    "coach": {
      "name": "Webb Murphy",
      "title": "Abilene Texas Leadership athletic director and head football coach",
      "sourceUrl": "https://www.texasleadershipabilene.com/athletics/coaching-staff",
      "sourceLabel": "Official Texas Leadership of Abilene athletics coaching staff",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "3250 State Street, Abilene, TX 79603 (secondary campus)",
      "phone": "325-480-3500",
      "sourceUrl": "https://www.texasleadershipabilene.com/campus/secondary-campus",
      "sourceLabel": "Official TLCA Abilene secondary campus",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "TLCA Abilene football 2026 schedule and results (coach-submitted results may change)",
      "sourceUrl": "https://www.maxpreps.com/tx/abilene/texas-leadership-of-abilene-eagles/football/schedule/",
      "sourceLabel": "MaxPreps UIL partner — Abilene TLCA 2026 schedule",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "TLCA Abilene football — confirm each game's assigned field",
      "address": "Secondary school: 3250 State Street, Abilene, TX 79603; football field entrance is NOT verified",
      "sourceUrl": "https://www.texasleadershipabilene.com/athletics/coaching-staff",
      "sourceLabel": "Texas Leadership of Abilene official athletics office and coach",
      "verifiedAt": "2026-10-09",
      "note": "Texas Leadership publishes a secondary campus at 3250 State Street, but no current primary-source stadium gate, field address, ticketing, parking or ADA access policies could be independently confirmed. The 2026 schedule includes both home and away games; the secondary campus postal address must not be represented as a guaranteed stadium gate. Contact athletic director/head football coach Webb Murphy through the official athletic staff directory (Webb.Murphy@tlca-ab.com) or the school at 325-480-3500 before traveling."
    },
    "overview": [
      "Texas Leadership of Abilene, often shortened to TLCA Abilene, fields the Eagles in eleven-man UIL football while operating as a tuition-free public charter school. This is a separate program from Abilene High Eagles, Abilene Cooper Cougars, Abilene Wylie Bulldogs and the San Angelo campus of the Texas Leadership network. School names should not be merged merely because 'Eagles' or 'Texas Leadership' appears in multiple city listings.",
      "Unlike Abilene High's century of state championships, the TLCA Abilene 11-man program is relatively new. A local 2026 season preview describes this as the program's fifth 11-man football season; it also reports a winless 2025 campaign and a change in leadership for 2026. With no UIL state-final appearances in the authoritative UIL all-time list, this page focuses on program growth, its current staff and useful family logistics rather than inventing old title traditions.",
      "The school-published athletics coaching staff names Webb Murphy as athletic director and head football coach. It also lists James Ingram, Rhett May, Dylan Martin, Michael Miller and Toby White with football responsibilities, but does not publish precise 2026 positional assignments for each. A September 2026 MaxPreps roster also names Murphy as head coach. This is stronger than assigning him a role based only on a football results aggregator.",
      "The 2026–28 UIL realignment places Abilene Texas Leadership in 2A Division I District 5 with Anson, Cisco, De Leon, Hawley and Hico. The official UIL rank file assigns **187 reported enrollment for football realignment**, a value different in purpose from the charter network's larger K–12 campus student population. UIL membership does not establish a school's entire-student-body size or automatically prove any specific future football result.",
      "MaxPreps lists a 2026 varsity schedule including Hico, Anson, Cisco, De Leon and Hawley as district opponents, plus earlier nondistrict games. Results can change with coach/school submissions. A 2026 local preview described quarterback Tyler Johnston returning, but not a guaranteed current starter or season-long roster; prospective players and fans should review the latest school and official athletic schedule rather than rely on September previews as immutable.",
      "For families, the school operates a secondary campus at **3250 State Street**, distinct from its elementary campus on North 8th. Texas Leadership's public charter admission page says 2026–27 applications reopened after the lottery, with seats offered subject to availability or a waitlist. Admission to a public charter school does not guarantee UIL football eligibility for any individual; verify association transfer and residence rules separately. No official stadium street/gate location, admission policy or school-owned photo licensing was confirmed during this audit."
    ],
    "milestones": [
      {
        "date": "2009",
        "title": "The charter network begins",
        "body": "Texas Leadership's official Abilene homepage says the wider Texas Leadership public-school network opened its first school in 2009; this is the network's history, not evidence Abilene varsity 11-man football started that year.",
        "sourceUrl": "https://www.texasleadershipabilene.com/",
        "sourceLabel": "Official Texas Leadership of Abilene school history"
      },
      {
        "date": "2022–2026",
        "title": "A developing 11-man program",
        "body": "A regional 2026 football preview identifies the upcoming season as TLCA Abilene's fifth in eleven-man football. This is a reported program age, not a claim of historical UIL championship success.",
        "sourceUrl": "https://varsitypreview.net/tlca-anson-cisco-hawley-football-season-outlook-2026/",
        "sourceLabel": "Varsity Preview 2026 TLCA Abilene program report"
      },
      {
        "date": "2025",
        "title": "A difficult preceding season",
        "body": "The regional 2026 preseason preview reports that TLCA Abilene finished 2025 without a win; third-party schedules differ in completeness, so an all-time or official win-loss record is not manufactured here.",
        "sourceUrl": "https://varsitypreview.net/tlca-anson-cisco-hawley-football-season-outlook-2026/",
        "sourceLabel": "Varsity Preview — dated 2025 season context"
      },
      {
        "date": "2026",
        "title": "Webb Murphy leads the Eagles",
        "body": "The Abilene campus's own athletics coaching page identifies Webb Murphy as athletic director and head football coach and lists other football staff.",
        "sourceUrl": "https://www.texasleadershipabilene.com/athletics/coaching-staff",
        "sourceLabel": "Official TLCA Abilene coaching staff"
      },
      {
        "date": "2026–28",
        "title": "New UIL 2A Division I District 5",
        "body": "The UIL's official list puts TLCA Abilene with Anson, Cisco, De Leon, Hawley and Hico and reports 187 enrollment for the realignment cycle.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL official 2026–28 2A Division I alignment"
      },
      {
        "date": "2026–27",
        "title": "Tuition-free public-charter enrollment",
        "body": "The school network says applications have reopened after the 2026–27 lottery; offers and waiting lists depend on available seats, and football eligibility requires a separate UIL review.",
        "sourceUrl": "https://www.texasleadership.net/family-resources/enroll",
        "sourceLabel": "Official Texas Leadership 2026–27 enrollment policies"
      }
    ],
    "faq": [
      {
        "question": "Is Abilene Texas Leadership the same team as Abilene High?",
        "answer": "No. Texas Leadership of Abilene Eagles are a separate public-charter-school football program. Abilene High Eagles have a different campus, UIL classification, staff and history; Abilene Cooper and Abilene Wylie are separate again."
      },
      {
        "question": "Who coaches Texas Leadership of Abilene football in 2026?",
        "answer": "The school-published athletics staff directory lists Webb Murphy as athletic director and head football coach. The same directory lists James Ingram, Rhett May, Dylan Martin, Michael Miller and Toby White among football staff without reliably specifying each assistant's 2026 football position."
      },
      {
        "question": "What UIL division and district is TLCA Abilene in?",
        "answer": "For 2026–28, UIL Class 2A Division I, District 5, with Anson, Cisco, De Leon, Hawley and Hico. The UIL's 187 enrollment is a football-alignment count, not the entire K–12 charter network population."
      },
      {
        "question": "Has TLCA Abilene won a UIL football state title?",
        "answer": "No state-final appearances or state titles are listed for this particular Abilene school in the official UIL all-time appearances table. The 2026 regional preview describes its young 11-man program entering a fifth season."
      },
      {
        "question": "Where is Texas Leadership of Abilene's high school campus?",
        "answer": "The school lists the secondary campus at 3250 State Street, Abilene, TX 79603 and its telephone as 325-480-3500. This is not a verified 2026 varsity home-stadium gate; confirm each game's venue before visiting."
      },
      {
        "question": "Is Texas Leadership of Abilene a tuition-free public charter school?",
        "answer": "Yes. Texas Leadership describes its Abilene school as tuition-free and open for 2026–27 applications, subject to available places or a waitlist. Football eligibility is separately subject to UIL rules."
      },
      {
        "question": "Where are TLCA Abilene's football tickets and schedule?",
        "answer": "The MaxPreps UIL-partner schedule provides current posted game dates, but actual tickets, stadium entrance, parking and accessible seating should be confirmed directly through the school's athletics office; no verified official ticket URL was identified."
      }
    ]
  },
  "abilene-cooper": {
    "slug": "abilene-cooper",
    "theme": {
      "accentHex": "#2657A7",
      "label": "Original royal-blue editorial accents referencing Cooper's publicly reported school colors; not an official school seal or unlicensed photograph"
    },
    "seo": {
      "title": "Abilene Cooper Cougars Football: 1967 & 1996 State Finals",
      "description": "Abilene Cooper Cougars football: 1967 and 1996 UIL title games, Jack Mildren, Randy Allen, 2026 coach Scott Stewart, Shotwell Stadium and district guide."
    },
    "coach": {
      "name": "Scott Stewart",
      "title": "Head football coach and campus athletic coordinator — appointed May 27, 2026",
      "sourceUrl": "https://www.abileneisd.org/o/chs/article/2937582",
      "sourceLabel": "Cooper High School and Abilene ISD 2026 coaching appointment",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "3639 Sayles Boulevard, Abilene, TX 79605",
      "phone": "325-691-1000",
      "sourceUrl": "https://www.abileneisd.org/o/chs",
      "sourceLabel": "Official Cooper High School campus and contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Abilene ISD official 2026 football ticket and stadium safety notice",
      "sourceUrl": "https://www.abileneisd.org/article/2937209",
      "sourceLabel": "Abilene ISD 2026 football access update",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Shotwell Stadium / Shotwell Annex game-day district facilities",
      "address": "Abilene, Texas — current game-specific venue and gate from Abilene ISD",
      "sourceUrl": "https://www.abileneisd.org/article/2937209",
      "sourceLabel": "Abilene ISD Shotwell and Shotwell Annex official event guidance",
      "verifiedAt": "2026-10-09",
      "note": "Abilene ISD identifies Shotwell Stadium and Shotwell Annex as its 2026 football event facilities and requires clear bags. Cooper's on-campus multipurpose athletics building is known as 'The Den' but is not a substitute for the game-night venue or a claim every game is at Shotwell. The district's $35 2026 season ticket offer expired August 6; check current HomeTown Ticketing and call the district athletics office (325) 677-1444 ext. 3013 for the scheduled game's stadium, current ticket prices, accessible entries, and parking. The school campus at 3639 Sayles Boulevard is not a confirmed football-gate address."
    },
    "overview": [
      "Abilene Cooper's Cougars have twice reached UIL football state championship games without winning a state title. UIL records place Cooper in the 1967 Class 4A final and the 1996 Class 5A Division II final. This is a distinct history from crosstown Abilene High's seven titles and from the separate Abilene Wylie Bulldogs program.",
      "Cooper's 1967 run remains one of Texas football's notable near-misses. In the December 16 final at Amon Carter Stadium in Fort Worth, unbeaten Cooper faced unbeaten Austin Reagan. The Cougars led 19–7 at halftime, with quarterback Jack Mildren responsible for two rushing touchdowns and one passing score; Reagan rallied to win 20–19. UIL's centennial game review identifies a dramatic final drive stopped at the goal line. Cooper was the 1967 runner-up, not co-champion.",
      "In 1996 Cooper returned to the state final under coach Randy Allen. The Cougars lost 55–15 to Austin Westlake, whose UIL centennial record names future NFL quarterback Drew Brees. Abilene ISD also documents Allen's role as a senior running back on Cooper's 1967 runner-up team, head coach in 1991–98, and later Hall-of-Honor recognition. Treat 1967 and 1996 as separate seasons and accomplishments, not two championships.",
      "The documented Abilene High–Cooper 'Crosstown Showdown' began in 1961. Abilene ISD's published history of the first 62 meetings and its Shotwell Stadium visitor article includes every listed score through 2022; that is an independently sourced rivalry, unlike a generic district-opponents list. The same city rivalry may occur in non-district play: Abilene High plays UIL 5A Division I in 2026–28, while Cooper belongs to UIL 5A Division II, District 2.",
      "In May 2026 Abilene ISD named Scott Stewart Cooper's head football coach, following Aaron Roan's move to assistant director of athletics. The announcement describes Stewart as Cooper's former defensive coordinator and notes his prior role in 14 consecutive playoff seasons through 2025; it does not retroactively attribute every one of those seasons to him as head coach. Official Cooper High's current staff list separately confirms Stewart's head-coach title.",
      "The Cooper campus is at 3639 Sayles Boulevard in Taylor County. Its new multipurpose facility is called 'The Den,' according to an Abilene ISD facilities feature, but the district uses Shotwell facilities for varsity events. A 2026 game-day visit should use the current schedule, district stadium guidance and HomeTown Ticketing rather than expired August season-ticket prices. There is no verified 2026 admissions price, ADA gate, parking map or school/stadium photo reuse license recorded for this profile."
    ],
    "milestones": [
      {
        "date": "1960–1961",
        "title": "A new Cougars football era and crosstown series",
        "body": "Cooper opened as Abilene's second traditional high-school football identity, and Abilene ISD's archived Crosstown Showdown chronology begins with an Abilene High–Cooper meeting in 1961.",
        "sourceUrl": "https://www.abileneisd.org/article/1525088",
        "sourceLabel": "Abilene ISD official crosstown game history"
      },
      {
        "date": "1967",
        "title": "One point from the state title",
        "body": "Unbeaten Cooper fell to Austin Reagan 20–19 in the 4A final. UIL's centennial recap credits Jack Mildren with two rushing touchdowns and one passing touchdown, including a last drive to the Reagan goal line.",
        "sourceUrl": "https://www.uiltexas.org/100/memorable-games",
        "sourceLabel": "UIL official 1967 Cooper–Reagan game retrospective"
      },
      {
        "date": "1991–1998",
        "title": "Randy Allen leads the Cougars",
        "body": "Abilene ISD documents former 1967 Cooper runner Randy Allen as the Cougars' 1991–98 head coach with a 66–31–2 record before his later Highland Park championship career.",
        "sourceUrl": "https://www.abileneisd.org/o/aisd/article/1643303",
        "sourceLabel": "Abilene ISD historical Randy Allen recognition"
      },
      {
        "date": "1996",
        "title": "The second state championship appearance",
        "body": "UIL's official 1996–97 final results list Cooper as 5A Division II runner-up, 55–15 behind Austin Westlake and future NFL quarterback Drew Brees.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P312",
        "sourceLabel": "UIL 1996 football state archives"
      },
      {
        "date": "2024",
        "title": "The campus adds 'The Den'",
        "body": "Abilene ISD's campus facilities report distinguishes Cooper's multipurpose activity center, 'The Den,' from Abilene High's 'The Nest.' It is not a verified Shotwell stadium gate.",
        "sourceUrl": "https://www.abileneisd.org/o/ahs/article/1525931",
        "sourceLabel": "Abilene ISD campus sports-facilities feature"
      },
      {
        "date": "May 2026",
        "title": "Scott Stewart named head coach",
        "body": "Cooper's May 27, 2026 district announcement appoints Scott Stewart, previously defensive coordinator, to succeed Aaron Roan, now in a district athletics leadership role.",
        "sourceUrl": "https://www.abileneisd.org/o/chs/article/2937582",
        "sourceLabel": "Cooper High official 2026 hiring announcement"
      },
      {
        "date": "2026–28",
        "title": "Cooper plays 5A Division II District 2",
        "body": "The new UIL alignment places the Cougars with Abilene Wylie, Amarillo Palo Duro, Lubbock Cooper, Lubbock Coronado, Wichita Falls Legacy and Wichita Falls Memorial. Abilene High is in the separate 5A Division I district.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD2FB2026.pdf",
        "sourceLabel": "UIL official 2026–28 5A Division II alignments"
      }
    ],
    "faq": [
      {
        "question": "Has Abilene Cooper ever won a football state championship?",
        "answer": "Not in the official UIL championship records. Cooper reached the 1967 Class 4A final and the 1996 Class 5A Division II final, finishing runner-up in both seasons. Do not count either appearance as a title."
      },
      {
        "question": "What happened to Cooper in the 1967 final?",
        "answer": "Cooper lost 20–19 to Austin Reagan after leading 19–7 at halftime. UIL records quarterback Jack Mildren scoring on two runs and a pass, with the Cougars' late drive stopping at the Reagan goal line."
      },
      {
        "question": "Who is Cooper's head coach for 2026?",
        "answer": "Scott Stewart, appointed May 27, 2026 after previously coordinating Cooper's defense. He succeeded Aaron Roan, who became an Abilene ISD assistant director of athletics."
      },
      {
        "question": "Was Randy Allen a Cooper player and coach?",
        "answer": "Yes. Abilene ISD identifies Allen as a running back on Cooper's 1967 state-final team and later the Cougars' head football coach from 1991 through 1998, including the 1996 state-final appearance."
      },
      {
        "question": "What is the Abilene Crosstown Showdown?",
        "answer": "The long-running Abilene High Eagles versus Abilene Cooper Cougars football series dates to 1961. Abilene ISD provides a historical game-by-game results table; in the 2026 UIL alignment the two schools are in different divisions."
      },
      {
        "question": "Is Cooper's 'The Den' its football game stadium?",
        "answer": "No. Abilene ISD describes The Den as Cooper's on-campus multipurpose facility. Its varsity football events use district facilities including Shotwell Stadium and the Annex. Check the individual game assignment and venue gate before visiting."
      },
      {
        "question": "Are Cooper's $35 2026 season tickets still on sale?",
        "answer": "The district's May 28 offer was available only through August 6, 2026 and should not be shown as current. Look at up-to-date HomeTown Ticketing and the Abilene ISD athletics office for individual-game availability and prices."
      }
    ]
  },
  "abilene": {
    "slug": "abilene",
    "theme": {
      "accentHex": "#9B741F",
      "label": "Original black-and-gold editorial history accents based on Abilene High's documented school colors; no district trademark reproduced"
    },
    "seo": {
      "title": "Abilene High Eagles Football: Seven Titles, 49 Wins & 2026",
      "description": "Explore Abilene High Eagles football: seven UIL state titles, the historic 49-game streak, Chuck Moser, Steve Warren, Mike Fullen and Shotwell Stadium."
    },
    "coach": {
      "name": "Michael Fullen",
      "title": "Head football coach and high-school athletic coordinator (listed as Mike Fullen in sports coverage)",
      "sourceUrl": "https://www.abileneisd.org/o/ahs/staff?page_no=3",
      "sourceLabel": "Abilene High School official staff directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "2800 North 6th Street, Abilene, TX 79603",
      "phone": "325-677-1731",
      "sourceUrl": "https://www.abileneisd.org/o/ahs",
      "sourceLabel": "Abilene High School official campus",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "2026 Abilene ISD tickets, game-day policy and athletics updates",
      "sourceUrl": "https://www.abileneisd.org/article/2937209",
      "sourceLabel": "Abilene ISD 2026 football ticketing and clear-bag policy",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Shotwell Stadium",
      "address": "Abilene, Texas — confirm the specific event's stadium entrance with Abilene ISD",
      "sourceUrl": "https://www.abileneisd.org/article/2937209",
      "sourceLabel": "Abilene ISD 2026 Shotwell Stadium and Annex notice",
      "verifiedAt": "2026-10-09",
      "note": "Abilene ISD's May 2026 football announcement confirms district games at Shotwell Stadium and Shotwell Annex and a clear-bag-only spectator rule. The district used HomeTown Ticketing for 2026 season-ticket sales, but the published August 6 season-ticket deadline has already passed and those old $35 offers must NOT be treated as available on October 9. For current single-game admission, assigned venue, parking and ADA gates, confirm through the district athletic office at 325-677-1444 ext. 3013. Abilene High's 2800 N. 6th campus is not the Shotwell gate address."
    },
    "overview": [
      "Abilene High School's Eagles—historically nicknamed the Warbirds—belong to one of the oldest and most successful football stories in Texas. UIL's official all-time appearances table credits Abilene with seven championship seasons (1923, 1928, 1931, 1954, 1955, 1956 and 2009) in nine state-final appearances. The 1922 and 1927 championship-game losses count as appearances, not titles.",
      "The first three championships stretched across the early decades of UIL football: a 3–0 win over Waco in 1923, a 38–0 win over Port Arthur in 1928 and a 13–0 win over Beaumont in 1931. The 1928 undefeated 12–0–1 season under Dewey Mayhew is documented in UIL's century team archives. The 1923 team played under P. E. Shotwell, the coach whose name survives on Abilene's modern district stadium.",
      "Chuck Moser's 1954–56 dynasty turned the Eagles into a statewide phenomenon, winning three consecutive 4A titles. The Handbook of Texas documents a 49-game winning streak lasting from 1954 through the 1957 semifinal, amid city growth and the opening of Dyess Air Force Base. Its details include a chartered train carrying some 700 Eagle supporters to Odessa for a 1954 game. These are documented episodes of local football culture, not generic claims about any current season.",
      "The 49-game run ended in the 1957 playoffs in an unusual way: Abilene and Highland Park finished tied 20–20, but Highland Park advanced by the period's tie-breaking penetration rule. Abilene's historic school nickname Warbirds and high-school football museum are documented by the Texas State Historical Association; visiting families should check the current school directly before assuming museum hours or public access.",
      "In 2009 Steve Warren coached Abilene to a 15–0 UIL Class 5A Division II state championship, beating Katy 28–17. UIL's centennial record names Drew Carroll, Herschel Sims and championship-game MVP Ronnell Sims among contributors; these are players from that 2009 team, not a current roster. UIL's contemporary 2026–28 alignment places today's Eagles in Class 5A Division I, District 2, which must not be confused with their 2009 division.",
      "Abilene High School now lists Michael (Mike) Fullen as its head football coach and athletic coordinator. The annual Abilene High–Cooper matchup reflects the two-school community that emerged after Cooper opened toward the end of the 1950s; UIL's 2009 Abilene season record also documents an Abilene–Cooper meeting. Treat historic results as dated, not current 2026 game scores. The district's live stadium and ticketing sources are essential because the May 2026 season-ticket window ended in August."
    ],
    "milestones": [
      {
        "date": "1923",
        "title": "The Eagles' first state championship",
        "body": "Under P. E. Shotwell, Abilene defeated Waco 3–0 to win its first title. The later AISD football stadium bears Shotwell's name.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL all-time championship game results"
      },
      {
        "date": "1928 / 1931",
        "title": "Two more early crowns",
        "body": "Dewey Mayhew's 1928 Eagles beat Port Arthur 38–0 after a 12–0–1 season; in 1931 Abilene defeated Beaumont 13–0.",
        "sourceUrl": "https://www.uiltexas.org/100/football-teams",
        "sourceLabel": "UIL centennial 1928 championship team; see UIL winners archive"
      },
      {
        "date": "1954–1956",
        "title": "Chuck Moser's three straight state titles",
        "body": "Official finals: 1954 Houston S. F. Austin 14–7, 1955 Tyler 33–13, and 1956 Corpus Christi Ray 14–0. Moser coached all three.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL football championship scores"
      },
      {
        "date": "1954–1957",
        "title": "Forty-nine straight victories",
        "body": "The Handbook of Texas traces a 49-game Eagles winning streak over three-plus seasons, ending when a tied 1957 semifinal advanced Highland Park under the old penetration tie-break.",
        "sourceUrl": "https://www.tshaonline.org/handbook/entries/abilene-high-eagles-19541957",
        "sourceLabel": "Texas State Historical Association: Abilene High Eagles"
      },
      {
        "date": "2009",
        "title": "Fifteen wins and a seventh state crown",
        "body": "UIL's centennial team history names coach Steve Warren and lists Abilene at 15–0, culminating in the 28–17 5A Division II championship win over Katy.",
        "sourceUrl": "https://www.uiltexas.org/100/football-teams",
        "sourceLabel": "UIL centennial 2009 Abilene championship team"
      },
      {
        "date": "2026",
        "title": "Mike Fullen and current UIL realignment",
        "body": "Abilene High's official staff directory lists Michael Fullen as its head football coach and athletic coordinator. For the 2026–28 alignment the Eagles are UIL 5A Division I, District 2; consult the district for current kickoffs.",
        "sourceUrl": "https://www.abileneisd.org/o/ahs/staff?page_no=3",
        "sourceLabel": "Abilene High School current staff"
      }
    ],
    "faq": [
      {
        "question": "How many football state championships has Abilene High won?",
        "answer": "Seven UIL titles: 1923, 1928, 1931, 1954, 1955, 1956 and 2009. The UIL lists nine state-final appearances, including runner-up years 1922 and 1927."
      },
      {
        "question": "How long was the Abilene Eagles' famous winning streak?",
        "answer": "The Texas State Historical Association documents 49 straight wins from 1954 to 1957 under Chuck Moser's era. The streak ended at the 1957 semifinal when Highland Park advanced after a 20–20 tie under the old penetration tie-break."
      },
      {
        "question": "Who is Abilene High's head football coach in 2026?",
        "answer": "The school's current staff directory names Michael Fullen (often called Mike Fullen) as head football coach and athletic coordinator."
      },
      {
        "question": "Did Abilene High beat Katy in a state championship?",
        "answer": "Yes. Steve Warren's 15–0 2009 team defeated Katy 28–17 for the UIL Class 5A Division II crown. That historical classification is not Abilene's 2026–28 division."
      },
      {
        "question": "Where does Abilene High play, and how do I buy tickets?",
        "answer": "Abilene ISD uses Shotwell Stadium and its Annex for district football and states that clear bags are required. Its 2026 season-ticket window ended August 6. For game-specific venue, single-game ticketing, parking and accessible entrances, use current district athletics guidance at 325-677-1444 ext. 3013."
      },
      {
        "question": "What is the Abilene–Cooper football connection?",
        "answer": "Both schools belong to Abilene ISD; Cooper's arrival near the end of the 1950s changed Abilene's previously unified football culture. The UIL also documents their 2009 matchup. Current games and scores must be confirmed against current school sources."
      },
      {
        "question": "What were the Abilene Eagles called historically?",
        "answer": "The Texas State Historical Association refers to Abilene High's Eagles as the Warbirds when discussing the 1950s championship teams. The page uses the official present-day Eagles identity."
      }
    ]
  },
  "abernathy": {
    "slug": "abernathy",
    "theme": {
      "accentHex": "#742A3F",
      "label": "Original maroon-and-white editorial milestone accents based on the Antelopes' documented school colors; not an official logo"
    },
    "seo": {
      "title": "Abernathy Antelopes Football: 2016 Semifinal & 2026 Guide",
      "description": "Abernathy Antelopes football history: the 2016 state semifinal, district titles, coach Keith Bloskas, 2026–28 UIL District 3 and official game-day resources."
    },
    "coach": {
      "name": "Keith Bloskas",
      "title": "2026 athletic director and head football coach",
      "sourceUrl": "https://www.abernathyisd.com/131047_3",
      "sourceLabel": "Abernathy ISD Athletics (current leadership)",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "505 7th Street, Abernathy, TX 79311",
      "phone": "806-298-2563",
      "sourceUrl": "https://www.abernathyisd.com/",
      "sourceLabel": "Abernathy ISD official campus contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Abernathy ISD 2026 varsity football dates and changes",
      "sourceUrl": "https://www.abernathyisd.com/page/page_calendar?calID=138964",
      "sourceLabel": "Abernathy ISD official athletics events calendar",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Abernathy ISD football stadium",
      "address": "Abernathy, Texas — verify the game-day stadium gate with Abernathy ISD",
      "sourceUrl": "https://www.southernbleacher.com/listing/abernathy-independent-school-district/214/",
      "sourceLabel": "Southern Bleacher — Abernathy ISD stadium seating installation",
      "verifiedAt": "2026-10-09",
      "note": "Southern Bleacher documents an Abernathy ISD football-stadium bleacher project with 1,679 spectator seats in that installation. This is a contractor's project figure, not independently confirmed total current stadium capacity or a ticket inventory. School campus address (505 7th Street) is not a verified stadium entry gate. Check the assigned venue for the specific game and ask Abernathy ISD about entrance, parking, accessible seating and ticketing; no 2026 admission or parking policy was independently confirmed."
    },
    "overview": [
      "The Antelopes have a documented West Texas football history spanning multiple generations. Abernathy ISD's own football archive identifies district-title seasons beginning in 1951 and lists 2016 as the program's state-semifinal year. It also records quarterfinal appearances in 1951, 1985, 1987, 2014, 2016, 2018 and 2019; these are playoff milestones, not seven state championships.",
      "That 2016 run ended against Crawford in the UIL Class 2A Division I semifinals. Crawford's official 2016–17 UIL state-team playoff listing records a 42–7 win over Abernathy. This specific state-semifinal result explains the team's deep playoff era without inventing a championship or an unverified program-wide record.",
      "Abernathy ISD's public April 2026 announcement named Keith Bloskas its new athletic director and head football coach, replacing the earlier Justin Wiley-era listing still visible in an older high-school staff directory. The district's current athletics home also identifies Bloskas as athletic director. Fans seeking this season's staff and game updates should prioritize the newer district announcement and current official athletics resources rather than the legacy directory.",
      "The 2026–28 UIL alignment places Abernathy in Class 2A Division I, District 3 alongside New Deal, New Home, Post and Sundown. Those are present-cycle district opponents, not a claim that all four are historic rivals. The official district calendar lists 2026 varsity games and is preferable to an undated screenshot of the 2023 schedule still associated with the school football page.",
      "Antelope football is part of a town-wide school culture: the district advertised a 2026 homecoming 'Lighting of the A' and homecoming-court parade on September 30. Treat this as a documented school tradition and dated event, not evidence about any unverified rivalry series or football final. The Abernathy district covers parts of both Hale and Lubbock counties; visitors should confirm current school and stadium locations rather than assuming every address shown for the ISD is a field entrance."
    ],
    "milestones": [
      {
        "date": "1951",
        "title": "Early district crown and quarterfinal",
        "body": "Abernathy ISD's historical football accolades begin the documented list of district champions in 1951 and also identify a 1951 state-quarterfinal appearance.",
        "sourceUrl": "https://www.abernathyisd.com/131089_3",
        "sourceLabel": "Abernathy ISD football history"
      },
      {
        "date": "1984–1988",
        "title": "Five successive district-title seasons",
        "body": "The district's official history lists football district championships in 1984, 1985, 1986, 1987 and 1988, with quarterfinal trips in 1985 and 1987.",
        "sourceUrl": "https://www.abernathyisd.com/131089_3",
        "sourceLabel": "Abernathy ISD football honors archive"
      },
      {
        "date": "2016",
        "title": "The state-semifinal season",
        "body": "Abernathy's deepest postseason advancement in the district's recorded list was the 2016 state semifinal. Crawford's UIL state-team archive shows the semifinal ended 42–7 in Crawford's favor.",
        "sourceUrl": "https://www.uiltexas.org/football/state-team/crawford-2016-2017-football",
        "sourceLabel": "UIL official 2016–17 Crawford playoff results"
      },
      {
        "date": "2018–2019",
        "title": "Back-to-back quarterfinal runs",
        "body": "Abernathy ISD records state-quarterfinal appearances in both 2018 and 2019 and district championships in those same seasons.",
        "sourceUrl": "https://www.abernathyisd.com/131089_3",
        "sourceLabel": "Abernathy ISD football accolades"
      },
      {
        "date": "April 2026",
        "title": "A new football leadership chapter",
        "body": "Abernathy ISD publicly announced Keith Bloskas as its next athletic director and head football coach. The current district athletics page identifies him in athletic leadership; an older subsite directory still mentions Justin Wiley.",
        "sourceUrl": "https://www.abernathyisd.com/60549",
        "sourceLabel": "Abernathy ISD April 2026 athletics hiring announcement"
      },
      {
        "date": "2026–28",
        "title": "New District 3 competitors",
        "body": "UIL placed Abernathy in 2A Division I District 3 with New Deal, New Home, Post and Sundown for this alignment cycle; 2026 fixture times come from the district calendar, not the alignment list.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL 2026–28 2A Division I alignment"
      }
    ],
    "faq": [
      {
        "question": "Who is the Abernathy Antelopes head football coach in 2026?",
        "answer": "The district's April 2026 announcement named Keith Bloskas as the incoming athletic director and head football coach. Its current athletics home lists him as athletic director. An older high-school staff directory still names Justin Wiley, so the newer school district information takes precedence."
      },
      {
        "question": "Has Abernathy reached the Texas football state semifinals?",
        "answer": "Yes. Abernathy ISD lists 2016 as a state-semifinal season. The UIL's Crawford record documents a 42–7 semifinal loss for the Antelopes. The school archive does not describe 2016 as a state-title year."
      },
      {
        "question": "What district is Abernathy football in for 2026–28?",
        "answer": "UIL Class 2A Division I, District 3, with New Deal, New Home, Post and Sundown. Those are classification-cycle opponents rather than a verified list of historic rivalries."
      },
      {
        "question": "Where can I find the 2026 Abernathy football schedule?",
        "answer": "Use the Abernathy ISD athletics/events calendar for varsity dates, changes and school contacts. The district football page contains an older 2023 schedule image, so a dated image by itself is not the most reliable 2026 source."
      },
      {
        "question": "Where do fans park and buy tickets at Abernathy's stadium?",
        "answer": "The district calendar and athletics contact are the most dependable current resources. A stadium-seating contractor confirms an Abernathy ISD football facility but not its current entrance, accessible gates, parking rules or 2026 ticket policy. Verify the assigned game's venue directly with Abernathy ISD at 806-298-2563."
      },
      {
        "question": "What is the 'Lighting of the A' homecoming tradition?",
        "answer": "Abernathy ISD promoted a homecoming Lighting of the A and homecoming-court parade scheduled for September 30, 2026. This is a documented school-spirit event, not a claim that any specific historic rivalry game took place."
      }
    ]
  },
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
    "venue": {
      "name": "Bart Coan Field (historical Fort Davis home football venue)",
      "address": "Fort Davis ISD campus area, Fort Davis — confirm access with the district; no 2026 football games scheduled",
      "sourceUrl": "https://www.fdisd.com/article/239245",
      "sourceLabel": "Fort Davis ISD's 2020 Bart Coan Football Field announcement",
      "verifiedAt": "2026-10-08",
      "note": "Fort Davis ISD itself called the facility Bart Coan Football Field in its May 2020 recognition announcement. The image in this article shows a 2020 football game, NOT current play. The school canceled the entire 2026 football season; field visitor entrance, parking, admission, accessible access and any future games are unverified. Contact Fort Davis ISD before traveling."
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
