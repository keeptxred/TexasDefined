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
  season?: {
    record: string;
    verifiedAt: string;
    sourceUrl: string;
    sourceLabel: string;
    games: Array<{
      date: string;
      opponent: string;
      site: 'Home' | 'Away' | 'Neutral';
      district?: boolean;
      result?: string;
    }>;
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
  "amarillo-caprock": {
    "slug": "amarillo-caprock",
    "theme": {
      "accentHex": "#7E1C34",
      "label": "Editorial maroon accent; verify exact official Caprock school color before representing it as school branding"
    },
    "seo": {
      "title": "Amarillo Caprock Longhorns Football: 2026 Schedule, History & Tickets",
      "description": "Independent Caprock Longhorns football guide: 2026 UIL 5A Division I District 2, coach Rowdy Freeman, verified season records, Dick Bivins tickets and official links."
    },
    "coach": {
      "name": "Rowdy Freeman",
      "title": "2026 football coach per MaxPreps; Amarillo ISD independently lists him as campus athletic director",
      "sourceUrl": "https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/history/",
      "sourceLabel": "MaxPreps 2026 coaching listing; Amarillo ISD CHS directory corroborates athletic director only",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "3001 E 34th Ave, Amarillo, TX 79103",
      "phone": "806-326-2200",
      "sourceUrl": "https://www.amaisd.org/chs",
      "sourceLabel": "Amarillo ISD official Caprock campus",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Official Amarillo ISD football schedules and digital tickets",
      "sourceUrl": "https://www.amaisd.org/133763_3",
      "sourceLabel": "Amarillo ISD Athletics — school schedules and tickets",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "1–4 in published completed games through October 2, 2026; October 9 fixture not counted as a result",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/schedule/",
      "sourceLabel": "MaxPreps October 3 schedule snapshot",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Pampa",
          "site": "Away",
          "result": "W 29–12"
        },
        {
          "date": "Sept. 3",
          "opponent": "Palo Duro",
          "site": "Home",
          "result": "L 3–28"
        },
        {
          "date": "Sept. 10",
          "opponent": "Canyon",
          "site": "Home",
          "result": "L 7–37"
        },
        {
          "date": "Sept. 25",
          "opponent": "Lubbock Monterey",
          "site": "Home",
          "district": true,
          "result": "L 0–24"
        },
        {
          "date": "Oct. 2",
          "opponent": "Abilene",
          "site": "Away",
          "district": true,
          "result": "L 0–42"
        },
        {
          "date": "Oct. 9",
          "opponent": "Frenship",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 15",
          "opponent": "Lubbock",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Tascosa",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 29",
          "opponent": "Frenship Memorial",
          "site": "Home",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Amarillo",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Dick Bivins Stadium",
      "address": "Amarillo, Texas — confirm exact game gate using AISD athletics",
      "sourceUrl": "https://www.amaisd.org/133763_3",
      "sourceLabel": "Amarillo ISD official Athletics ticket and venue policy",
      "verifiedAt": "2026-10-09",
      "note": "AISD posts 2026 varsity advance tickets at $8 adult / $3 student, $10 at Dick Bivins gate, and a stadium clear-bag policy. Tickets are sold through HomeTown; presale deadlines and assigned field depend on the specific game. The school campus address is not a verified stadium entrance. Confirm ADA entrance, parking and bag details with AISD before travel."
    },
    "overview": [
      "Caprock High School's Longhorns are one of four Amarillo ISD varsity football communities. The school sits at 3001 East 34th Avenue, while district athletics coordinates varsity football ticketing and stadium policies. Caprock is not Amarillo High's Golden Sandies, and their separate histories must not be blended.",
      "Caprock's 2026–28 UIL alignment is Class 5A Division I, District 2. Its league schedule includes Abilene, Lubbock Monterey, Frenship, Lubbock, Tascosa, Frenship Memorial and Amarillo. UIL district membership is a two-year alignment, not a championship or a record for games already played.",
      "The Dave Campbell's Texas Football historical program summary lists eight playoff appearances, no state-title game appearances, and no football state championships. This contrasts with Caprock's actual multiple GIRLS WRESTLING state titles prominently documented by Amarillo ISD. TexasDefined does not transfer those wrestling honors to the football team.",
      "The 2018 Longhorns went 8–4 according to the DCTF historical season index, versus 3–7 in both 2024 and 2025. These year-separated records give more meaningful context than an invented dynasty. A 2026 scores snapshot shows an opening win at Pampa and four subsequent recorded losses through October 2, not an outcome for the October 9 game.",
      "The Caprock High campus lists Rowdy Freeman as athletic director; MaxPreps lists Freeman as 2026 head football coach. The district coaching-contact directory is linked from its athletics page, but a separate official head-coach job title was not independently confirmed. Fans should rely on the official district schedule and ticket portal for last-minute changes.",
      "Dick Bivins Stadium is named by the independent DCTF team profile, and Amarillo ISD publishes varsity ticket prices and an actual clear-bag policy. Fans should not navigate to the school campus when the ticket specifies a different stadium; event-specific accessible arrival and parking remain to be verified."
    ],
    "milestones": [
      {
        "date": "2018",
        "title": "Eight-win playoff-era season",
        "body": "The Longhorns' 8–4 campaign is visible in Dave Campbell's historical program records; unlike a state title it is not a championship claim.",
        "sourceUrl": "https://www.texasfootball.com/team/amarillo-caprock-longhorns",
        "sourceLabel": "DCTF Caprock season history"
      },
      {
        "date": "2024–25",
        "title": "Two consecutive 3–7 finishes",
        "body": "DCTF records Caprock at 3–7 in 2024 and 2025; the records are distinct from the ongoing 2026 schedule.",
        "sourceUrl": "https://www.texasfootball.com/team/amarillo-caprock-longhorns",
        "sourceLabel": "DCTF historical season index"
      },
      {
        "date": "2026–28",
        "title": "UIL 5A Division I, District 2",
        "body": "UIL realignment places the Longhorns in the seven-opponent Panhandle and West Texas district for 2026–28.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "UIL 2026 alignment"
      },
      {
        "date": "Aug. 28, 2026",
        "title": "Season-opening victory at Pampa",
        "body": "Caprock's posted season ledger begins with a 29–12 win at Pampa; later listed games must be separately confirmed as they finish.",
        "sourceUrl": "https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/schedule/",
        "sourceLabel": "MaxPreps 2026 schedule"
      }
    ],
    "faq": [
      {
        "question": "Has Amarillo Caprock won a UIL football state championship?",
        "answer": "No football state title appears in Dave Campbell's Texas Football program history, which lists eight playoff appearances and zero championship-game appearances. Caprock's documented wrestling state championships belong to a different sport."
      },
      {
        "question": "Who coaches the Caprock Longhorns in 2026?",
        "answer": "MaxPreps identifies Rowdy Freeman as the 2026 football head coach; the school's current official directory identifies him as athletic director. Consult the official athletic-staff directory for any subsequent changes."
      },
      {
        "question": "What district is Caprock in for 2026?",
        "answer": "The UIL 2026–28 football realignment places Caprock in 5A Division I District 2 with Abilene, Amarillo, Tascosa, Frenship, Frenship Memorial, Lubbock and Lubbock Monterey."
      },
      {
        "question": "Where are Caprock football games played?",
        "answer": "Dick Bivins Stadium is the team's listed stadium, but verify each home game's actual site and entrance on the official Amarillo ISD schedule and ticket listing."
      },
      {
        "question": "How much are Caprock tickets in 2026?",
        "answer": "Amarillo ISD lists District 2-5A varsity presale prices of $8 for adults and $3 for students, and a $10 stadium-gate price at Dick Bivins. Prices and availability should be reconfirmed on game day."
      }
    ]
  },
  "amarillo": {
    "slug": "amarillo",
    "theme": {
      "accentHex": "#B68D30",
      "label": "Original Sandies gold editorial accent; not a licensed school emblem"
    },
    "seo": {
      "title": "Amarillo Sandies Football: Four State Titles, 2026 & Dick Bivins Stadium",
      "description": "Amarillo High Sandies football since 1908: four UIL titles, Blair Cherry and Howard Lynch, Tascosa rivalry, 2026 District 2 schedule and Dick Bivins Stadium."
    },
    "coach": {
      "name": "Chad Dunnam",
      "title": "2026 Amarillo High head football coach, corroborated by official Sandies program and Amarillo ISD",
      "sourceUrl": "https://www.sandiesfootball.com/contact",
      "sourceLabel": "Amarillo Sandies football program coaching staff roster",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "4225 Danbury Drive, Amarillo, TX 79109",
      "sourceUrl": "https://www.ahsfhs.org/national/teams/teampage.asp?Team=Amarillo",
      "sourceLabel": "Amarillo High historical program directory; campus address not stadium gate",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "2026 Sandies fixtures and recorded finals",
      "sourceUrl": "https://txprepfootball.com/schools/amarillo-sandies/",
      "sourceLabel": "Texas Prep Football dated 2026 schedule",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "2–1 in the three independently sourced 2026 finals through Sept. 11; subsequent results not verified",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://txprepfootball.com/schools/amarillo-sandies/",
      "sourceLabel": "Texas Prep Football 2026 score ledger",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Palo Duro",
          "site": "Away",
          "result": "W 21–7"
        },
        {
          "date": "Sept. 4",
          "opponent": "Cleveland",
          "site": "Home",
          "result": "L 28–35"
        },
        {
          "date": "Sept. 11",
          "opponent": "Midland",
          "site": "Away",
          "result": "W 17–14"
        },
        {
          "date": "Oct. 2",
          "opponent": "Tascosa",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 9",
          "opponent": "Lubbock Monterey",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Abilene",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 22",
          "opponent": "Frenship",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Lubbock",
          "site": "Away",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Caprock",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Dick Bivins Stadium",
      "address": "Amarillo, Texas — verify match-day stadium gate, parking and accessibility with Amarillo ISD",
      "sourceUrl": "https://www.ahsfhs.org/national/teams/teampage.asp?Team=Amarillo",
      "sourceLabel": "Independent Amarillo Sandies team stadium directory",
      "verifiedAt": "2026-10-09",
      "note": "The historic program directory lists Dick Bivins Stadium; its school contact address 4225 Danbury Drive is not a verified spectator entrance. Event tickets, parking, accessible arrival, bags and assigned stadium for each home game require Amarillo ISD confirmation. No school/stadium photo is republished without documented usage permission."
    },
    "overview": [
      "The Amarillo High Golden Sandstorm, widely called the Sandies, has played football since 1908, except for a 1917 interruption reported in the team's historical archive. It became a UIL charter member in 1920. Its first major defining period produced three consecutive Texas state championships in 1934, 1935 and 1936, followed by a fourth in 1940.",
      "The official UIL championship record gives unusual detail to that run: Amarillo beat Corpus Christi 48–0 in 1934, Greenville 13–7 in 1935, Kerrville 10–6 in 1936 and Temple 20–7 in 1940. Amarillo also finished runner-up to Tyler in 1930 and Waco in the 1948 Class 2A final. Four crowns must not be confused with the number of finals.",
      "Blair Cherry coached the 1934–36 three-peat. The Texas High School Football Hall of Fame credits Cherry with an 85–5–1 record across seven Amarillo seasons and later a Southwest Conference title at Texas. Howard Lynch's succeeding era yielded the 1940 state football crown and the 1948 final appearance. The current program history identifies Stan Maudlin among the historic Amarillo players who went on to collegiate success.",
      "The Sandies' own history page enumerates dozens of district championship seasons and the Amarillo–Tascosa football series: 45 wins, 21 losses and three ties at its published snapshot. That is a documented local rivalry, unlike merely grouping every present district opponent as a traditional rival. The exact series tally is a dated school-site figure, not a live result after 2026.",
      "The 2026–28 UIL alignment places Amarillo in Class 5A Division I District 2; its posted 2026 league games include Tascosa, Monterey, Abilene, Frenship, Lubbock and Caprock. The Amarillo Sandies football program's coaching roster names Chad Dunnam head football coach, while Amarillo ISD's official campus staff list corroborates his athletic director position.",
      "The three cross-checked early 2026 game finals include a 21–7 win over Palo Duro, 28–35 loss to Cleveland and 17–14 win at Midland. Since later dates in the retrieved results schedule did not include independently established finals, this page does not make a misleading October 9 live-record claim. Dick Bivins Stadium is the named historical venue; a verified game ticket should determine the entrance and parking, not the Danbury Drive school-campus address."
    ],
    "milestones": [
      {
        "date": "1908–1920",
        "title": "The Golden Sandstorm emerges",
        "body": "The Sandies' program history dates continuous football to 1908 except for 1917 and identifies Amarillo as a UIL charter member in 1920.",
        "sourceUrl": "https://www.sandiesfootball.com/history",
        "sourceLabel": "Amarillo Sandies football official team history"
      },
      {
        "date": "1930",
        "title": "Runner-up before the golden era",
        "body": "The official UIL results give Tyler a 25–13 win over Amarillo in the 1930 championship game.",
        "sourceUrl": "https://wwwprod.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL historical state finals"
      },
      {
        "date": "1934–1936",
        "title": "Three consecutive championships under Blair Cherry",
        "body": "UIL final scores were 48–0 over Corpus Christi, 13–7 over Greenville and 10–6 over Kerrville. Cherry's career is documented by the Texas High School Football Hall of Fame.",
        "sourceUrl": "https://www.texasfootball.com/hof-blair-cherry",
        "sourceLabel": "Texas High School Football Hall of Fame"
      },
      {
        "date": "1940",
        "title": "Fourth Amarillo state championship",
        "body": "Amarillo defeated Temple 20–7, the Sandies' fourth UIL title, under Howard Lynch.",
        "sourceUrl": "https://wwwprod.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL 1940 championship results"
      },
      {
        "date": "1948",
        "title": "State title-game return",
        "body": "Waco beat Amarillo 21–0 in the 1948 Class 2A final; it was a runner-up result, not a fifth championship.",
        "sourceUrl": "https://wwwprod.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL 1948 championship results"
      },
      {
        "date": "2026–28",
        "title": "5A Division I District 2",
        "body": "The 2026 league slate includes Tascosa, Monterey, Abilene, Frenship, Lubbock and Caprock; check updated school schedules before travel.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "UIL 2026–28 football alignment"
      }
    ],
    "faq": [
      {
        "question": "How many state football championships has Amarillo High won?",
        "answer": "Four: 1934 over Corpus Christi, 1935 over Greenville, 1936 over Kerrville and 1940 over Temple, according to UIL's historical football finals."
      },
      {
        "question": "Who coached Amarillo's 1930s three-peat?",
        "answer": "Blair Cherry led the 1934–36 championships and is a Texas High School Football Hall of Fame inductee."
      },
      {
        "question": "Is Amarillo–Tascosa a documented football rivalry?",
        "answer": "Yes. The Sandies' official team history publishes their head-to-head series as 45 Amarillo wins, 21 losses and three ties in its historical snapshot; later results can change that record."
      },
      {
        "question": "Where do the Sandies play home games?",
        "answer": "Dick Bivins Stadium is the venue in Amarillo program histories. Check the assigned game's ticket and Amarillo ISD for current gate, parking, accessible entry and bag procedures."
      },
      {
        "question": "What is Amarillo's 2026 classification?",
        "answer": "UIL Class 5A Division I, District 2 for 2026–28. The team name is Golden Sandstorm or Sandies, not the Amarillo Tascosa Rebels."
      },
      {
        "question": "Who is the 2026 head coach?",
        "answer": "The Sandies football program's published coaching roster lists Chad Dunnam as head football coach; Amarillo ISD lists him as athletic director."
      }
    ]
  },
  "alvord": {
    "slug": "alvord",
    "theme": {
      "accentHex": "#B78C35",
      "label": "Original warm-gold Bulldogs editorial accent, not an official licensed school mark"
    },
    "seo": {
      "title": "Alvord Bulldogs Football: 2025 District Title, 2026 Scores & Tickets",
      "description": "Alvord Bulldogs football: 2025 9–3 district undefeated season, Matt Fanning athletics, 2026 2A Division I District 6 results and official cash-ticket guidance."
    },
    "coach": {
      "name": "Matt Fanning",
      "title": "Official Alvord ISD athletic director; 2025 varsity head coach per historical roster (2026 head-coach confirmation pending)",
      "sourceUrl": "https://www.alvordisd.net/athletics",
      "sourceLabel": "Official Alvord ISD Bulldog Athletics leadership and ticket rules",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1049 West Bypass 287, Alvord, TX 76225",
      "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/schedule/",
      "sourceLabel": "MaxPreps high-school campus directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alvord ISD 2026 varsity and sub-varsity football schedule",
      "sourceUrl": "https://www.alvordisd.net/athletics",
      "sourceLabel": "Official Alvord ISD athletics — downloadable master football schedule",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "4–1 through September 25, 2026; district opening October 9",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/schedule/",
      "sourceLabel": "MaxPreps varsity result ledger through Sept. 25",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Howe",
          "site": "Home",
          "result": "W 30–20"
        },
        {
          "date": "Sept. 4",
          "opponent": "Lindsay",
          "site": "Away",
          "result": "W 42–19"
        },
        {
          "date": "Sept. 11",
          "opponent": "Petrolia",
          "site": "Away",
          "result": "W 49–8"
        },
        {
          "date": "Sept. 18",
          "opponent": "Era",
          "site": "Home",
          "result": "W 28–6"
        },
        {
          "date": "Sept. 25",
          "opponent": "Collinsville",
          "site": "Home",
          "result": "L 35–62"
        },
        {
          "date": "Oct. 9",
          "opponent": "Olney",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Muenster",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Tioga",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Nocona",
          "site": "Away",
          "district": true
        },
        {
          "date": "Nov. 7",
          "opponent": "Chico",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Alvord ISD home football field — exact current stadium name/gate not yet corroborated",
      "address": "Alvord, Wise County — verify entrance directly with school athletics",
      "sourceUrl": "https://www.alvordisd.net/athletics",
      "sourceLabel": "Alvord ISD official athletics and football documents",
      "verifiedAt": "2026-10-09",
      "note": "Alvord ISD's current athletics page explicitly says home games are cash only, while a third-party October 9 Olney-away schedule displays an online 'buy tickets' link: these refer to different event hosts and are not inherently inconsistent. Check away-game tickets with the host district, and do not assume the school's 1049 West Bypass 287 mailing address is a stadium entrance or ADA route. Official site links its 2026 varsity/master schedule and roster."
    },
    "overview": [
      "The Alvord Bulldogs play a distinctive small-school football schedule in Wise County. UIL places Alvord in Class 2A Division I District 6 for 2026–28, matching a district slate against Olney, Muenster, Tioga, Nocona and Chico. These are current alignment peers, not evidence of a historic named rivalry trophy.",
      "Alvord's 2025 football season was an important local benchmark: the MaxPreps final history shows 9–3 overall and a perfect 6–0 district record, with head coach Matt Fanning named for that year. In November the Bulldogs beat Hico 51–14 in the playoff opener before falling to Carlisle 41–23, a verified postseason narrative rather than a fabricated state-final appearance.",
      "The official Alvord ISD athletics page currently names Matt Fanning athletic director, provides the school athletic-office telephone and downloadable 2026 varsity football schedule and roster. Its public leadership listing does not explicitly confirm the 2026 varsity head coach, so this editorial does not conflate his verified 2025 head-coach attribution with a new 2026 appointment.",
      "Alvord started 2026 by winning 30–20 over Howe, 42–19 at Lindsay, 49–8 at Petrolia and 28–6 over Era. A 62–35 loss to Collinsville September 25 left the Bulldogs 4–1 before district play; an October 9 game at Olney was scheduled but not assigned a result at the October 9 research cutoff.",
      "For actual game-night planning, Alvord ISD's current athletics notice says home games are cash only. That local rule must not be applied to away contests—MaxPreps links online tickets for the scheduled Olney match, whose host determines admission. School campus mailing information also is not proof of the spectator gate or accessible parking.",
      "Alvord's 2024 season finished 4–7, and earlier varsity history lists Marcus Grgurich coaching in that year. Distinguishing the 2024, 2025 and 2026 sources avoids silently assigning the wrong staff to this season."
    ],
    "milestones": [
      {
        "date": "2024",
        "title": "Four-win predecessor season",
        "body": "MaxPreps 2024 history lists Alvord 4–7 under Marcus Grgurich; this is a dated prior coaching era.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/history/",
        "sourceLabel": "MaxPreps prior season and staff"
      },
      {
        "date": "2025",
        "title": "Undefeated district slate",
        "body": "The 2025 Bulldogs went 6–0 in league play and 9–3 overall, with Matt Fanning named as head coach in that season.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/25-26/schedule/",
        "sourceLabel": "MaxPreps 2025 football standings and playoffs"
      },
      {
        "date": "Nov. 2025",
        "title": "Hico playoff victory and Carlisle exit",
        "body": "Alvord beat Hico 51–14, then lost to Carlisle 41–23 in the next playoff contest.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/25-26/schedule/",
        "sourceLabel": "MaxPreps archived 2025 bracket games"
      },
      {
        "date": "Sept. 18, 2026",
        "title": "Four straight wins to open 2026",
        "body": "A 28–6 victory against Era followed wins over Howe, Lindsay and Petrolia, setting a four-win beginning.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/schedule/",
        "sourceLabel": "MaxPreps 2026 game results"
      },
      {
        "date": "Sept. 25, 2026",
        "title": "Collinsville turns the tide",
        "body": "Alvord fell 35–62 to Collinsville, making its date-stamped September finish 4–1.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvord/alvord-bulldogs/football/schedule/",
        "sourceLabel": "MaxPreps September 25 final"
      },
      {
        "date": "2026–28",
        "title": "2A Division I District 6 opponents",
        "body": "Official UIL alignment places Alvord in District 6; the posted schedule names Olney, Muenster, Tioga, Nocona and Chico.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL 2026–28 2A Division I alignment"
      }
    ],
    "faq": [
      {
        "question": "What was Alvord's 2025 football record?",
        "answer": "Nine wins and three losses overall, including an undefeated 6–0 district record. The Bulldogs beat Hico in the playoffs and then lost to Carlisle."
      },
      {
        "question": "Who is Alvord's current athletic director and football coach?",
        "answer": "Alvord ISD identifies Matt Fanning as athletic director, and the 2025 MaxPreps team history lists him as that season's head football coach. An independently current district 2026 football head-coach appointment still requires confirmation."
      },
      {
        "question": "What is Alvord's 2026 UIL district?",
        "answer": "Class 2A Division I District 6, with Olney, Muenster, Tioga, Nocona and Chico among its scheduled league opponents."
      },
      {
        "question": "How are Alvord home football tickets sold?",
        "answer": "Alvord ISD's athletics notice says home games are cash only. Away stadium tickets may be sold differently by the host; for Olney, a third-party schedule provides an online ticket link."
      },
      {
        "question": "Where is Alvord's home football stadium?",
        "answer": "The exact current stadium name, spectator entrance and accessible parking were not independently established from the district sources reviewed. Call Alvord ISD athletics or follow its varsity match-day information."
      },
      {
        "question": "What was Alvord's 2026 record before league play?",
        "answer": "Alvord was 4–1 through September 25 with four consecutive opening wins followed by a loss to Collinsville; the October 9 Olney league opener required a new result check."
      }
    ]
  },
  "alvin-shadow-creek": {
    "slug": "alvin-shadow-creek",
    "theme": {
      "accentHex": "#007C92",
      "label": "Original ocean-blue Sharks editorial accent; official UIL historical identity includes black, silver and ocean blue, not licensed logo"
    },
    "seo": {
      "title": "Shadow Creek Sharks Football: 2019 State Champions, 2026 Results & Freedom Field",
      "description": "Shadow Creek Sharks football: 2018 runner-up, 2019 UIL state title over Denton Ryan, 2026 6A District 19 scores, colors and Freedom Field guide."
    },
    "campus": {
      "address": "11850 Broadway, Pearland, TX 77584",
      "sourceUrl": "https://www.maxpreps.com/tx/pearland/shadow-creek-sharks/football/schedule/",
      "sourceLabel": "MaxPreps Shadow Creek high-school directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Shadow Creek Sharks 2026 varsity fixtures and dated finals",
      "sourceUrl": "https://www.maxpreps.com/tx/pearland/shadow-creek-sharks/football/schedule/",
      "sourceLabel": "MaxPreps 2026 score listing, updated October 4",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "4–1 through October 2, 2026 (3–0 district)",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/pearland/shadow-creek-sharks/football/schedule/",
      "sourceLabel": "MaxPreps completed varsity scores through Oct. 2",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Humble Summer Creek",
          "site": "Home",
          "result": "W 24–14"
        },
        {
          "date": "Sept. 3",
          "opponent": "Fort Bend Ridge Point",
          "site": "Away",
          "result": "L 7–28"
        },
        {
          "date": "Sept. 18",
          "opponent": "Brazoswood",
          "site": "Home",
          "district": true,
          "result": "W 61–0"
        },
        {
          "date": "Sept. 24",
          "opponent": "Pasadena Dobie",
          "site": "Away",
          "district": true,
          "result": "W 67–2"
        },
        {
          "date": "Oct. 2",
          "opponent": "Pearland Dawson",
          "site": "Home",
          "district": true,
          "result": "W 44–7"
        },
        {
          "date": "Oct. 9",
          "opponent": "Pasadena Memorial",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Manvel",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Alvin",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Pearland",
          "site": "Home",
          "district": true
        },
        {
          "date": "Nov. 5",
          "opponent": "Pasadena Sam Rayburn",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Freedom Field",
      "address": "Alvin ISD, Pearland/Iowa Colony-area venue network — confirm game-specific event gate",
      "sourceUrl": "https://www.texasfootball.com/team/alvin-shadow-creek-sharks/",
      "sourceLabel": "Dave Campbell's Shadow Creek stadium listing",
      "verifiedAt": "2026-10-09",
      "note": "The October 2 Dawson final on MaxPreps identifies Freedom Field for that specific Shadow Creek contest. Dave Campbell also lists it as the program stadium but shows implausible capacity '10', which is deliberately not repeated. Campus address 11850 Broadway does not identify the stadium gate. Alvin ISD and current match tickets should confirm venue, parking, clear-bag and accessible-entrance rules separately."
    },
    "overview": [
      "Shadow Creek's Sharks have one of the most extraordinary modern Texas high-school football opening chapters. The Alvin ISD program reached the Class 5A Division I state final in each of its first two varsity seasons, losing in 2018 to Dallas Highland Park and winning the 2019 title over Denton Ryan, 28–22. Dave Campbell's title-game recap reports a combined 31–1 record through those first two years.",
      "The official UIL 2019–20 championship archive names Alvin Shadow Creek as champion and Denton Ryan as runner-up with a 28–22 final. Dave Campbell's detailed account recounts a final-play pass breakup by T.J. Marshall to preserve the six-point championship margin. It is a distinctive finish, not a generic football milestone.",
      "The UIL's historic 2018–19 Shadow Creek team profile verifies the Sharks name and school colors black, silver and ocean blue. That official archive identifies Brad Butler as coach for the historical team; it does NOT independently establish a current 2026 head-coach appointment. Later staffing must be checked against current Alvin ISD athletics.",
      "Current UIL alignment puts Shadow Creek in Class 6A District 19, a different football classification from its 2019 5A championship. The group includes Alvin High, another distinct Alvin ISD program, while Iowa Colony's Pioneers compete in 5A Division I District 11 and are based in Iowa Colony rather than at Shadow Creek's Pearland campus.",
      "Through the October 2, 2026 scores, the Sharks stood 4–1, with 24–14 over Summer Creek, a 7–28 loss at Ridge Point, then district wins over Brazoswood 61–0, Dobie 67–2 and Dawson 44–7. The October 9 Pasadena Memorial game remained scheduled as of the October 4 source update and is not represented as a completed win.",
      "The school and stadium are distinct venues for planning. Shadow Creek High's official school locality is Pearland, and MaxPreps reports its Broadway campus address. An October 2 match was played at Freedom Field, but the team's real game-specific ticket instructions should decide which stadium, entrance and accessible parking families use."
    ],
    "milestones": [
      {
        "date": "2018",
        "title": "State runner-up in first varsity season",
        "body": "Dave Campbell's 2019 championship retrospective records Shadow Creek losing its first varsity-season state final to Dallas Highland Park and then returning to the title game the next year.",
        "sourceUrl": "https://www.texasfootball.com/article/2019/12/26/alvin-shadow-creek-28-denton-ryan-22-2019-5a-di-texas-high-school-football-championship-recap",
        "sourceLabel": "Dave Campbell's Shadow Creek first-two-years retrospective"
      },
      {
        "date": "Dec. 2019",
        "title": "First UIL state championship",
        "body": "UIL confirms Shadow Creek 28, Denton Ryan 22, for the Class 5A Division I football championship.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/f6ecdc319151b973627d86e50f92072a/P72",
        "sourceLabel": "Official UIL 2019–20 championship archive"
      },
      {
        "date": "Dec. 2019",
        "title": "Final-play goal-line defense",
        "body": "The championship recap describes T.J. Marshall deflecting Denton Ryan's last-second end-zone attempt to preserve the 28–22 title win.",
        "sourceUrl": "https://www.texasfootball.com/article/2019/12/26/alvin-shadow-creek-28-denton-ryan-22-2019-5a-di-texas-high-school-football-championship-recap",
        "sourceLabel": "Dave Campbell's game-ending play report"
      },
      {
        "date": "2022",
        "title": "Eleven-win 6A-era season",
        "body": "The school program archive records an 11–1 2022 season, showing strong success after the early 5A title run.",
        "sourceUrl": "https://www.texasfootball.com/team/alvin-shadow-creek-sharks/",
        "sourceLabel": "Dave Campbell's past seasons"
      },
      {
        "date": "Oct. 2, 2026",
        "title": "District-opening three-win sequence",
        "body": "Shutout over Brazoswood 61–0, win over Dobie 67–2 and Dawson 44–7 brought the Sharks to 3–0 in District 19 and 4–1 overall.",
        "sourceUrl": "https://www.maxpreps.com/tx/pearland/shadow-creek-sharks/football/schedule/",
        "sourceLabel": "MaxPreps Oct. 4 score update"
      },
      {
        "date": "2026–28",
        "title": "Class 6A District 19",
        "body": "The Sharks moved beyond their historical 5A championship classification and are part of the 2026–28 UIL 6A District 19 alignment.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf",
        "sourceLabel": "Official UIL alignment"
      }
    ],
    "faq": [
      {
        "question": "Did Shadow Creek win the 2019 Texas state football championship?",
        "answer": "Yes. The UIL records Alvin Shadow Creek defeating Denton Ryan 28–22 in the 2019 Class 5A Division I title game."
      },
      {
        "question": "Was Shadow Creek a state finalist in 2018 too?",
        "answer": "Yes. Dave Campbell's 2019 championship recap documents back-to-back final trips in the team's first two varsity seasons; the 2018 first trip ended in a loss to Dallas Highland Park."
      },
      {
        "question": "Is Shadow Creek in Pearland or Alvin?",
        "answer": "Shadow Creek High School's campus is in Pearland at 11850 Broadway, but the school belongs to Alvin ISD. Its Sharks are separate from the district's Alvin Yellowjackets and Iowa Colony Pioneers."
      },
      {
        "question": "Where do the Shadow Creek Sharks play home games?",
        "answer": "The current 2026 team listing names Freedom Field, and the October 2 Dawson result identifies it for that match. Confirm every game's actual stadium gate, ticketing, parking and ADA arrival directions with Alvin ISD."
      },
      {
        "question": "What was Shadow Creek's 2026 football record through October 2?",
        "answer": "Four wins, one loss overall and three wins in district, after wins over Brazoswood, Dobie and Dawson. October 9 and later finals were not verified at this checkpoint."
      },
      {
        "question": "Who coaches the Sharks in 2026?",
        "answer": "UIL's historical 2018–19 team lists Brad Butler, but that record is not proof of a 2026 appointment. The current head coach requires a dated Alvin ISD staff source."
      }
    ]
  },
  "alvin-iowa-colony": {
    "slug": "alvin-iowa-colony",
    "theme": {
      "accentHex": "#287B71",
      "label": "Original teal Pioneers editorial accent, not licensed uniform artwork"
    },
    "seo": {
      "title": "Iowa Colony Pioneers Football: Ray Garza, Three 12-Win Years & 2026",
      "description": "Iowa Colony Pioneers football: Ray Garza and three 12-win 2023–25 seasons, 2026 UIL 5A District 11 scores and Freedom Field visitor advice."
    },
    "coach": {
      "name": "Ray Garza",
      "title": "Head coach attributed to 2026–27 varsity season roster",
      "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/history/",
      "sourceLabel": "MaxPreps 2026 Iowa Colony coach and past-season listings",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "3700 Davenport Parkway, Iowa Colony, TX 77583",
      "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
      "sourceLabel": "MaxPreps Iowa Colony High School campus directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Iowa Colony Pioneers 2026 varsity schedule and results",
      "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
      "sourceLabel": "MaxPreps 2026 team schedule snapshot, last updated Sept. 26",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "2–3 through September 25, 2026; later October finals not verified",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
      "sourceLabel": "MaxPreps 2026 completed varsity scores",
      "games": [
        {
          "date": "Aug. 27",
          "opponent": "The Woodlands College Park",
          "site": "Home",
          "result": "L 10–38"
        },
        {
          "date": "Sept. 4",
          "opponent": "Manvel",
          "site": "Home",
          "result": "L 7–37"
        },
        {
          "date": "Sept. 11",
          "opponent": "Pasadena",
          "site": "Home",
          "district": true,
          "result": "W 62–0"
        },
        {
          "date": "Sept. 17",
          "opponent": "Katy Freeman",
          "site": "Away",
          "district": true,
          "result": "W 31–16"
        },
        {
          "date": "Sept. 25",
          "opponent": "Angleton",
          "site": "Home",
          "district": true,
          "result": "L 24–34"
        },
        {
          "date": "Oct. 2",
          "opponent": "Friendswood",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 9",
          "opponent": "Richmond Randle",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Victoria East",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Fort Bend Dulles",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 29",
          "opponent": "South Houston",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Freedom Field — listed district venue",
      "address": "Iowa Colony/Alvin ISD district athletic facilities; confirm field and ticket gate for each home game",
      "sourceUrl": "https://www.texasfootball.com/team/iowa-colony-pioneers",
      "sourceLabel": "Dave Campbell's Iowa Colony team stadium directory",
      "verifiedAt": "2026-10-09",
      "note": "Texas Football lists Freedom Field for the Pioneers and displays '10' as its stadium capacity, clearly not a safe independently verified stadium seating figure. Do not publish that number as capacity. The school campus address at 3700 Davenport Parkway is NOT proof of Freedom Field's visitor entrance. Confirm the actual assigned stadium, gate, parking, ADA facilities and tickets with Alvin ISD."
    },
    "overview": [
      "Iowa Colony High School's Pioneers are a rapidly developing Alvin ISD football program, distinct from the district's original Alvin Yellowjackets and neighboring Shadow Creek Sharks. The published varsity history begins in 2022 with a 2–7 season; the program's later results show a notably rapid rise without a state championship.",
      "MaxPreps records three consecutive twelve-win seasons: 12–1 in 2023, then 12–2 in both 2024 and 2025. The 2026 coach listing names Ray Garza. These are independently useful year-by-year milestones, not a vague assertion of long-standing tradition or a claim of winning a UIL state title.",
      "The Dave Campbell team archive reports three playoff appearances and zero championship-game appearances or state championships, consistent with the three recent postseason teams. Its displayed Freedom Field capacity reads '10', which is obviously not a plausible public spectator capacity and is deliberately excluded from this page.",
      "The 2026–28 UIL alignment places Iowa Colony in Class 5A Division I District 11. The Pioneers' 2026 early slate included defeats to College Park and Manvel, a 62–0 league win over Pasadena, a 31–16 victory at Katy Freeman and a 34–24 loss to Angleton. The last cross-checked five-game snapshot is 2–3 through September 25; Friendswood on October 2 must be verified before revising that record.",
      "The October 9 fixture with Richmond Randle is another significant current district game, but the program's 2025 Randle defeat (49–42) should not be transposed to 2026. The opponent list also includes Victoria East, Dulles and South Houston.",
      "The program is officially named for Iowa Colony, Brazoria County, despite the site registry's longer 'alvin-iowa-colony' slug. Use the correct locality on maps, SEO and reciprocal pages. Alvin ISD operates district athletic facilities; the high school's mailing address is not the verified Freedom Field football ticket gate."
    ],
    "milestones": [
      {
        "date": "2022",
        "title": "A new program's opening record",
        "body": "The available Iowa Colony football history records a 2–7 2022 season, followed by substantial improvement.",
        "sourceUrl": "https://www.texasfootball.com/team/iowa-colony-pioneers",
        "sourceLabel": "Dave Campbell's Pioneers past seasons"
      },
      {
        "date": "2023",
        "title": "Twelve wins in second published season",
        "body": "The Pioneers finished 12–1 in 2023 in both the Dave Campbell and MaxPreps archives.",
        "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/history/",
        "sourceLabel": "MaxPreps football past-season history"
      },
      {
        "date": "2024–25",
        "title": "Two more twelve-win campaigns",
        "body": "Iowa Colony reached 12–2 in each of the 2024 and 2025 seasons, giving the program three consecutive twelve-win years.",
        "sourceUrl": "https://www.texasfootball.com/team/iowa-colony-pioneers",
        "sourceLabel": "Dave Campbell's program record"
      },
      {
        "date": "Sept. 11, 2026",
        "title": "Shutout start to district play",
        "body": "The Pioneers beat Pasadena 62–0 in a documented Class 5A District 11 league game.",
        "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
        "sourceLabel": "MaxPreps current varsity results"
      },
      {
        "date": "Sept. 25, 2026",
        "title": "Angleton ends two-game winning sequence",
        "body": "Angleton defeated Iowa Colony 34–24, bringing the known five-game season snapshot to 2–3.",
        "sourceUrl": "https://www.maxpreps.com/tx/iowa-colony/iowa-colony-pioneers/football/schedule/",
        "sourceLabel": "MaxPreps Angleton final"
      },
      {
        "date": "2026–28",
        "title": "5A Division I District 11",
        "body": "The published UIL alignment and game list include Pasadena, Freeman, Angleton, Friendswood, Randle, Victoria East, Dulles and South Houston.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "UIL 2026–28 alignment"
      }
    ],
    "faq": [
      {
        "question": "Is Iowa Colony the same team as Alvin Yellowjackets?",
        "answer": "No. Iowa Colony High School fields the Pioneers, a separate Alvin ISD high-school team located in Iowa Colony, Brazoria County."
      },
      {
        "question": "Who coaches Iowa Colony football in 2026?",
        "answer": "The MaxPreps 2026–27 program history identifies Ray Garza as head football coach; verify any subsequent district appointments directly with Alvin ISD."
      },
      {
        "question": "How many consecutive 12-win football years has Iowa Colony had?",
        "answer": "Three: 2023 was 12–1, and both 2024 and 2025 finished 12–2 in the historical team results."
      },
      {
        "question": "Does Iowa Colony have a football state title?",
        "answer": "No title-game appearance or state championship is reported in Dave Campbell's current Iowa Colony program history."
      },
      {
        "question": "Where does Iowa Colony play home football?",
        "answer": "The team directory lists Freedom Field. The source's capacity field shows '10', which cannot be treated as verified spectator capacity. Confirm actual game stadium and entrance with Alvin ISD."
      },
      {
        "question": "What is Iowa Colony's 2026 football district?",
        "answer": "UIL Class 5A Division I, District 11 for the 2026–28 realignment cycle. Scores here are dated through September 25, not a live standings feed."
      }
    ]
  },
  "alvin": {
    "slug": "alvin",
    "theme": {
      "accentHex": "#BB9B35",
      "label": "Original Yellowjackets gold editorial accent; not a licensed athletics logo"
    },
    "seo": {
      "title": "Alvin Yellowjackets Football: 2026 Results, District 19 & Memorial Stadium",
      "description": "Alvin Yellowjackets high-school football: 2026 UIL 6A District 19, dated scores, historical playoff record, Memorial Stadium and Alvin ISD opponents."
    },
    "coach": {
      "name": "Matthew Bass",
      "title": "Alvin High assistant athletic director and head football coach, official school staff",
      "sourceUrl": "https://www.alvinisd.net/o/ahs/staff",
      "sourceLabel": "Alvin High official staff directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "802 South Johnson Street, Alvin, TX 77511",
      "sourceUrl": "https://www.maxpreps.com/tx/alvin/alvin-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps UIL partner school contact and team schedule",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alvin Yellowjackets 2026 varsity games and score updates",
      "sourceUrl": "https://www.maxpreps.com/tx/alvin/alvin-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps varsity season schedule last updated September 26",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "0–5 through Sept. 24, 2026 (0–3 District 19)",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/alvin/alvin-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps 2026 scored-games snapshot",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Fort Bend Clements",
          "site": "Home",
          "result": "L 30–48"
        },
        {
          "date": "Sept. 3",
          "opponent": "Baytown Sterling",
          "site": "Away",
          "result": "L 10–41"
        },
        {
          "date": "Sept. 11",
          "opponent": "Pearland Dawson",
          "site": "Away",
          "district": true,
          "result": "L 17–44"
        },
        {
          "date": "Sept. 18",
          "opponent": "Pasadena Memorial",
          "site": "Home",
          "district": true,
          "result": "L 41–43"
        },
        {
          "date": "Sept. 24",
          "opponent": "Manvel",
          "site": "Away",
          "district": true,
          "result": "L 0–53"
        },
        {
          "date": "Oct. 9",
          "opponent": "Pearland",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Pasadena Sam Rayburn",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Shadow Creek",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Brazoswood",
          "site": "Away",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Pasadena Dobie",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Memorial Stadium (Alvin)",
      "address": "Alvin, Brazoria County — game-night entry address and parking not independently verified",
      "sourceUrl": "https://www.texasfootball.com/team/alvin-yellowjackets",
      "sourceLabel": "Dave Campbell's Alvin football program venue",
      "verifiedAt": "2026-10-09",
      "note": "Alvin's stadium listing names Memorial Stadium and estimates capacity at 7,400; a nearby school campus mailing address is not validated as its ticket-scanning or accessible entrance. This Memorial Stadium must not be confused with similarly named facilities in other cities. Confirm a particular date's venue, gate, parking, ADA access and bag rules through Alvin ISD."
    },
    "overview": [
      "Alvin High School's Yellowjackets are a separate UIL football program from the district's newer Iowa Colony Pioneers and Shadow Creek Sharks. Alvin plays in Class 6A District 19 for the 2026–28 realignment, a school-specific identity important on city, county and district pages that otherwise may collapse the three Alvin ISD names into one team.",
      "The historical Dave Campbell archive reports eight Alvin football playoff appearances, zero state championship-game appearances and zero football state titles. This is an actual football history, but it does not justify a synthetic state-final milestone or a borrowed Shadow Creek 2019 title.",
      "The recent program-history table documents 0–10 in 2019, 4–6 in 2022, 2–8 in 2023 and consecutive 3–7 finishes in 2024 and 2025. Those records help explain the current rebuilding context without suggesting that lack of a title means the school lacks local football heritage. Alvin High's official current staff directory identifies Matthew Bass as assistant athletic director and head football coach.",
      "The first five recorded 2026 varsity contests were losses against Fort Bend Clements, Baytown Sterling, Pearland Dawson, Pasadena Memorial and Manvel. The closest was the September 18 home loss to Pasadena Memorial, 43–41. With no newer cross-checked final in the inspected schedule, Alvin stood 0–5 through September 24, and October 9 Pearland remained a scheduled game.",
      "The October 23 date against fellow Alvin ISD program Shadow Creek is a particularly meaningful district fixture, but not a verified annual named rivalry or guarantee of this year's game result. The Yellowjackets also face Pearland, Sam Rayburn, Brazoswood and Dobie on the published slate.",
      "Texas Football identifies Alvin's stadium as Memorial Stadium with an estimated capacity of 7,400. Its location and game-night access requirements should be checked separately from the high-school contact address at 802 South Johnson Street. The real match ticket is the appropriate source for current entry and parking."
    ],
    "milestones": [
      {
        "date": "Program history",
        "title": "Eight recorded playoff seasons",
        "body": "Dave Campbell's Alvin directory records eight playoff appearances but no football state-title games or state crowns.",
        "sourceUrl": "https://www.texasfootball.com/team/alvin-yellowjackets",
        "sourceLabel": "Dave Campbell's team history"
      },
      {
        "date": "2019",
        "title": "Winless recorded season",
        "body": "The recent-history table lists an 0–10 2019 season, a reference point for later improvement, not a claim of the program's entire history.",
        "sourceUrl": "https://www.texasfootball.com/team/alvin-yellowjackets",
        "sourceLabel": "Texas Football archived seasons"
      },
      {
        "date": "2024–25",
        "title": "Consecutive three-win years",
        "body": "The team's season history records 3–7 finishes in both 2024 and 2025.",
        "sourceUrl": "https://www.texasfootball.com/team/alvin-yellowjackets",
        "sourceLabel": "Program past-season table"
      },
      {
        "date": "Sept. 18, 2026",
        "title": "Two-point district setback",
        "body": "Alvin's 41–43 loss to Pasadena Memorial was its closest of five finished 2026 games in the dated scorebook.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvin/alvin-yellowjackets/football/schedule/",
        "sourceLabel": "MaxPreps season scores"
      },
      {
        "date": "Oct. 23, 2026",
        "title": "Scheduled Alvin ISD matchup",
        "body": "The 2026 schedule lists fellow Alvin ISD school Shadow Creek at Alvin; do not present this scheduled meeting as a completed result.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvin/alvin-yellowjackets/football/schedule/",
        "sourceLabel": "MaxPreps Oct. 23 fixture"
      },
      {
        "date": "2026–28",
        "title": "Class 6A District 19",
        "body": "UIL places Alvin in District 19 alongside Shadow Creek and other southeast Houston-area programs.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf",
        "sourceLabel": "Official UIL 6A alignment"
      }
    ],
    "faq": [
      {
        "question": "Are Alvin Yellowjackets and Shadow Creek the same team?",
        "answer": "No. Alvin High fields the Yellowjackets; Alvin Shadow Creek High fields the Sharks, and Iowa Colony High fields the Pioneers. These have separate team pages and football histories."
      },
      {
        "question": "How many state football titles has Alvin High won?",
        "answer": "The Dave Campbell's team history lists no state football championships or championship-game appearances and eight playoff appearances."
      },
      {
        "question": "Where do Alvin Yellowjackets play home games?",
        "answer": "Texas Football names Memorial Stadium in Alvin. Current spectator gate and accessible parking instructions need confirmation with Alvin ISD; the school address is not automatically the stadium entrance."
      },
      {
        "question": "What UIL district is Alvin in for 2026?",
        "answer": "Class 6A District 19 in the 2026–28 alignment, including Alvin ISD's Shadow Creek."
      },
      {
        "question": "What happened in Alvin's September 18, 2026 game?",
        "answer": "Alvin fell 43–41 to Pasadena Memorial in a close district game."
      },
      {
        "question": "Who is Alvin's 2026 head coach?",
        "answer": "Alvin High's official current staff directory names Matthew Bass assistant athletic director and head football coach."
      }
    ]
  },
  "alvarado": {
    "slug": "alvarado",
    "theme": {
      "accentHex": "#883E39",
      "label": "Original terracotta Indians editorial theme, not licensed school artwork"
    },
    "seo": {
      "title": "Alvarado Indians Football: 2024–25 Playoff Runs, 2026 & Charles Head Stadium",
      "description": "Alvarado Indians football: 2011 state-final history, 2024 and 2025 12-plus win seasons, 2026 UIL District 4 scores, coach Aubrey Sims and Charles Head Stadium."
    },
    "coach": {
      "name": "Aubrey Sims",
      "title": "Alvarado High athletic director and head football coach, current official school leadership",
      "sourceUrl": "https://ahs.alvaradoisd.net/about/leadership",
      "sourceLabel": "Alvarado High official leadership",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1301 South Parkway, Alvarado, TX 76009",
      "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/",
      "sourceLabel": "MaxPreps school address and 2026 schedule",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alvarado 2026 varsity results and upcoming district games",
      "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/",
      "sourceLabel": "MaxPreps published Oct. 6 2026 scoreboard",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "2–3 through October 1, 2026; 2–0 District 4",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/",
      "sourceLabel": "MaxPreps dated Alvarado season ledger",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Joshua",
          "site": "Home",
          "result": "L 13–34"
        },
        {
          "date": "Sept. 4",
          "opponent": "Kennedale",
          "site": "Away",
          "result": "L 26–35"
        },
        {
          "date": "Sept. 11",
          "opponent": "Fort Worth Arlington Heights",
          "site": "Home",
          "result": "L 19–44"
        },
        {
          "date": "Sept. 25",
          "opponent": "Godley",
          "site": "Home",
          "district": true,
          "result": "W 24–21"
        },
        {
          "date": "Oct. 1",
          "opponent": "Carrollton Ranchview",
          "site": "Away",
          "district": true,
          "result": "W 38–35"
        },
        {
          "date": "Oct. 9",
          "opponent": "River Oaks Castleberry",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Lake Dallas",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Springtown",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Aubrey",
          "site": "Home",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Decatur",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Charles Head Stadium",
      "address": "Alvarado, Johnson County — spectator entrance requires local confirmation",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alvarado-indians",
      "sourceLabel": "Dave Campbell's Alvarado Indians stadium record",
      "verifiedAt": "2026-10-09",
      "note": "The program archive calls Alvarado's field Charles Head Stadium with a historical 4,100-seat estimate. That number does not establish current accessibility or ticket inventory. The high school campus address at 1301 South Parkway is not a verified stadium gate. Confirm event venue, visitor entrance, parking, clear-bag and tickets through Alvarado ISD."
    },
    "overview": [
      "Alvarado's Indians have one verified football state-final appearance and a long playoff tradition but no state football championship according to Dave Campbell's archive: one title-game appearance, 36 playoff seasons and zero titles. That distinction is fundamental to the program's story. Historical final-year, opponent and score require a contemporaneous archive before being put into a state-final headline.",
      "The Johnson County team returned to sustained postseason success in the last two seasons. MaxPreps past-season history records Alvarado 13–1 in 2024 and 12–1 in 2025, with Casey Walraven listed as head coach in both campaigns. Alvarado High's current official leadership page identifies Aubrey Sims as athletic director and head football coach, succeeding Casey Walraven, who coached the 2024 and 2025 teams.",
      "Alvarado enters the 2026–28 cycle in Class 4A Division I District 4. Rather than using a 2025 opponent group, the published 2026 calendar shows district games against Godley, Carrollton Ranchview, Castleberry, Lake Dallas, Springtown, Aubrey and Decatur.",
      "The Indians opened 2026 with three non-district losses, then won two tight district games: Godley 24–21 on September 25 and Ranchview 38–35 on October 1. That produces a dated 2–3 overall and 2–0 district record as of October 9; the October 9 Castleberry game is not represented as finished.",
      "Dave Campbell's program ledger places Alvarado at Charles Head Stadium and reports a historical capacity of 4,100. School campus and stadium entrance may differ, and actual ticket procedures and accessible parking need confirmation from the district. The football page should remain useful for visiting fans without fabricating gate numbers."
    ],
    "milestones": [
      {
        "date": "Program history",
        "title": "State final reached; no state title",
        "body": "Texas Football reports one state-title-game appearance and 36 playoff appearances but no UIL football crown.",
        "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alvarado-indians",
        "sourceLabel": "Dave Campbell's Alvarado football archive"
      },
      {
        "date": "2024",
        "title": "Thirteen-win postseason campaign",
        "body": "Alvarado's 2024–25 team history records a 13–1 season under coach Casey Walraven.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/history/",
        "sourceLabel": "MaxPreps previous-season history"
      },
      {
        "date": "2025",
        "title": "Another twelve-win season",
        "body": "The 2025 varsity archive records 12–1 with Casey Walraven as head coach in that season.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/history/",
        "sourceLabel": "MaxPreps 2025 history"
      },
      {
        "date": "Sept. 25, 2026",
        "title": "First District 4 victory",
        "body": "Alvarado beat Godley 24–21 to turn the page after three non-district defeats.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/",
        "sourceLabel": "MaxPreps 2026 schedule"
      },
      {
        "date": "Oct. 1, 2026",
        "title": "Tight Ranchview road win",
        "body": "The Indians defeated Carrollton Ranchview 38–35, reaching a 2–0 district start.",
        "sourceUrl": "https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/",
        "sourceLabel": "MaxPreps Oct. 6 result snapshot"
      },
      {
        "date": "2026–28",
        "title": "Class 4A Division I District 4",
        "body": "UIL realignment places Alvarado in District 4 and the 2026 schedule lists Castleberry, Lake Dallas, Springtown, Aubrey and Decatur in the district run.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/4AD1FB2026.pdf",
        "sourceLabel": "UIL 2026 football alignment"
      }
    ],
    "faq": [
      {
        "question": "Has Alvarado won a Texas football state championship?",
        "answer": "Dave Campbell's reports one state-title-game appearance and zero state championships. The exact historical title-game opponent and year should be verified in UIL archives before publication."
      },
      {
        "question": "How successful was Alvarado in 2024 and 2025?",
        "answer": "The MaxPreps historical ledger lists 13–1 in 2024 and 12–1 in 2025, with Casey Walraven identified as coach for those two seasons."
      },
      {
        "question": "Who coaches Alvarado football in 2026?",
        "answer": "Alvarado High's current official leadership directory names Aubrey Sims athletic director and head football coach; historical records identify Casey Walraven as coach for the 2024 and 2025 seasons."
      },
      {
        "question": "What district is Alvarado in this season?",
        "answer": "Class 4A Division I, District 4 for the 2026–28 UIL cycle."
      },
      {
        "question": "Where does Alvarado play at home?",
        "answer": "Dave Campbell's names Charles Head Stadium in Alvarado. Confirm its actual game-night gate, parking, accessibility and ticket policy through the school; the campus address alone is not a verified entrance."
      },
      {
        "question": "What was Alvarado's record through October 1, 2026?",
        "answer": "Two wins, three losses overall and 2–0 in district after 24–21 over Godley and 38–35 over Ranchview. Later finals require updated sources."
      }
    ]
  },
  "alto": {
    "slug": "alto",
    "theme": {
      "accentHex": "#8C9E16",
      "label": "Original yellow-green Jackets milestone accent, not licensed school artwork"
    },
    "seo": {
      "title": "Alto Yellowjackets Football: 2006–07 State Titles, 2026 & Cam'Ron Matthews Field",
      "description": "Alto Yellowjackets football: 2006 and 2007 UIL state championships, 2026 District 11 scores, 40 playoff appearances and Cam'Ron Matthews Field."
    },
    "coach": {
      "name": "Scott Ponder",
      "title": "Alto ISD athletic director and head football coach, confirmed in current official staff directory",
      "sourceUrl": "https://www.alto.esc7.net/staff?page_no=5",
      "sourceLabel": "Alto ISD current staff directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "248 County Road 2429, Alto, TX 75925",
      "sourceUrl": "https://www.maxpreps.com/tx/alto/alto-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps UIL partner Alto High School directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alto Yellowjackets 2026 varsity schedule and verified results",
      "sourceUrl": "https://www.maxpreps.com/tx/alto/alto-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps, updated October 8, 2026",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "1–5 through Oct. 2, 2026 (district 0–2)",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/alto/alto-yellowjackets/football/schedule/",
      "sourceLabel": "MaxPreps published completed Alto games, October 8 update",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Groveton",
          "site": "Away",
          "result": "L 30–32"
        },
        {
          "date": "Sept. 4",
          "opponent": "West Sabine",
          "site": "Home",
          "result": "L 20–60"
        },
        {
          "date": "Sept. 11",
          "opponent": "Normangee",
          "site": "Away",
          "result": "W 38–9"
        },
        {
          "date": "Sept. 18",
          "opponent": "Corrigan-Camden",
          "site": "Home",
          "result": "L 7–34"
        },
        {
          "date": "Sept. 26",
          "opponent": "Overton",
          "site": "Home",
          "district": true,
          "result": "L 19–35"
        },
        {
          "date": "Oct. 2",
          "opponent": "Grapeland",
          "site": "Away",
          "district": true,
          "result": "L 21–28"
        },
        {
          "date": "Oct. 9",
          "opponent": "Mount Enterprise",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Cushing",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 29",
          "opponent": "Tenaha",
          "site": "Home",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Cross Roads",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Cam'Ron Matthews Field",
      "address": "Alto, Cherokee County, Texas — football spectator gate not independently verified",
      "sourceUrl": "https://www.texasfootball.com/team/alto-yellowjackets",
      "sourceLabel": "Dave Campbell's Alto Yellowjackets program history and venue",
      "verifiedAt": "2026-10-09",
      "note": "Dave Campbell's directory lists Cam'Ron Matthews Field and a 1,770 historical seating estimate, but does not establish this season's ticket-scanning gate, parking, accessible arrival route, admission rules or stadium capacity certification. The high school school-address directory is not necessarily the spectator entrance. Confirm a particular match's gate and game-day rules with Alto ISD."
    },
    "overview": [
      "Alto High School's Yellowjackets own one of East Texas' clearest consecutive-championship stories. The University Interscholastic League archive identifies Alto as the 2006 Class 1A Division I football champion, beating McCamey 42–13, followed by the 2007 Class 1A Division II title over Seymour, 22–0. Those historical classifications do not match the Jackets' 2026 position in 2A Division II.",
      "The UIL results distinguish the two championships by division and opponent, both important details in a program often summarized as merely 'two-time champions.' Dave Campbell's current Alto team directory reports two state titles, three state-final appearances and 40 playoff appearances overall. The third final came in a different season; without validating its opponent and year here, this page does not invent an additional title-game result.",
      "The 2026–28 UIL alignment places Alto in Class 2A Division II District 11. Its current rivals on the league schedule include Overton, Grapeland, Mount Enterprise, Cushing, Tenaha and Cross Roads. These are district opponents; long-term series histories and special rivalry trophies should be described only when documented by original school or game sources.",
      "The current Yellowjackets began 2026 with a narrow 32–30 loss at Groveton, a 60–20 defeat by West Sabine, a 38–9 road win at Normangee and losses to Corrigan-Camden, Overton and Grapeland. The MaxPreps schedule published October 8 records Alto at 1–5 through the October 2 Grapeland result. The October 9 Mount Enterprise contest had no verified final at this research cutoff.",
      "Alto's recent seasons include an 11–1 2019 team and a 4–6 2025 finish in Dave Campbell's historical season table. Those figures show competitive swings since the title years without artificially adding state championships or assuming the 2019 record implies a state final.",
      "The current football venue is listed as Cam'Ron Matthews Field. A third-party estimated capacity of 1,770 is context rather than a validated ticket supply or accessibility guarantee; actual gates, parking and school announcements should come from Alto ISD. Alto ISD's official 2026 staff directory identifies Scott Ponder as athletic director and head football coach; his hiring was announced January 12, 2026."
    ],
    "milestones": [
      {
        "date": "2006",
        "title": "First consecutive state championship",
        "body": "Alto defeated McCamey 42–13 for the UIL Class 1A Division I championship.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL football 2006 championship results"
      },
      {
        "date": "2007",
        "title": "Repeat in a different 1A division",
        "body": "The Jackets beat Seymour 22–0 for the UIL 1A Division II title, the second championship in consecutive seasons.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P208",
        "sourceLabel": "UIL 2007–08 official football archive"
      },
      {
        "date": "2019",
        "title": "Eleven-win modern benchmark",
        "body": "The Dave Campbell program history lists Alto at 11–1 in 2019, a strong later-era season separate from the 2006–07 championship runs.",
        "sourceUrl": "https://www.texasfootball.com/team/alto-yellowjackets",
        "sourceLabel": "Dave Campbell's past season archive"
      },
      {
        "date": "2025",
        "title": "Four-win season before current realignment",
        "body": "The program archive reports a 4–6 2025 campaign. That prior year should not be confused with the 2026 six-game snapshot.",
        "sourceUrl": "https://www.texasfootball.com/team/alto-yellowjackets",
        "sourceLabel": "Team history archive"
      },
      {
        "date": "Sept. 11, 2026",
        "title": "Yellowjackets win at Normangee",
        "body": "Alto's only win in the first six completed games was 38–9 at Normangee, according to the dated current varsity schedule.",
        "sourceUrl": "https://www.maxpreps.com/tx/alto/alto-yellowjackets/football/schedule/",
        "sourceLabel": "MaxPreps 2026 game results"
      },
      {
        "date": "2026–28",
        "title": "2A Division II District 11 slate",
        "body": "UIL aligns Alto in District 11; its 2026 remaining schedule lists Mount Enterprise, Cushing, Tenaha and Cross Roads after October 2.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official UIL football realignment"
      }
    ],
    "faq": [
      {
        "question": "How many state football titles has Alto won?",
        "answer": "Two. Alto beat McCamey 42–13 in the 2006 1A Division I final and Seymour 22–0 in the 2007 1A Division II final, according to UIL's official championship archive."
      },
      {
        "question": "What is Alto's 2026 UIL classification?",
        "answer": "Class 2A Division II, District 11. The program's historical 2006–07 1A divisions are not its 2026 alignment."
      },
      {
        "question": "Where do Alto Yellowjackets play?",
        "answer": "Dave Campbell's directory lists Cam'Ron Matthews Field in Alto, with a historical 1,770 seating estimate. Visitors should confirm current stadium entry, tickets, parking and accessibility with Alto ISD."
      },
      {
        "question": "How many times has Alto reached the state football final?",
        "answer": "The Texas Football program history reports three title-game appearances, two of them victories in 2006 and 2007. A third specific final year is not asserted here without corroboration."
      },
      {
        "question": "What was Alto's 2026 record through October 2?",
        "answer": "The October 8 MaxPreps snapshot showed one win and five losses following a 21–28 loss at Grapeland. October 9 and later game scores were not yet confirmed."
      },
      {
        "question": "Who is Alto's head football coach in 2026?",
        "answer": "Alto ISD's current official staff directory names Scott Ponder athletic director and head football coach; the district announced his appointment January 12, 2026."
      }
    ]
  },
  "altair-rice": {
    "slug": "altair-rice",
    "theme": {
      "accentHex": "#7C322A",
      "label": "Original Raiders wine-red editorial accent, not official athletics artwork or validated school uniform colors"
    },
    "seo": {
      "title": "Rice Consolidated Raiders Football: 2026 Schedule, History & Stadium",
      "description": "Altair Rice Consolidated Raiders football: 2026 UIL 3A District 14, Brad Dumont, playoff history, Rice Veterans' Memorial Stadium and Colorado County visitor facts."
    },
    "coach": {
      "name": "Brad Dumont",
      "title": "2026 head football coach attributed by MaxPreps season history; official district hiring date not independently verified",
      "sourceUrl": "https://www.maxpreps.com/tx/altair/rice-consolidated-raiders/football/history/",
      "sourceLabel": "MaxPreps 2026–27 Raiders football coach and season history",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1095 Raider Drive, Altair, TX 77412",
      "phone": "979-234-3531 ext. 1200",
      "sourceUrl": "https://ricehs.ricecisd.org/athletics",
      "sourceLabel": "Official Rice Consolidated High School athletics/contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Rice Consolidated Raiders 2026 varsity schedule",
      "sourceUrl": "https://www.pigskinprep.com/archive/Schedulespdf/Altair%20Rice%20Consolidated.pdf",
      "sourceLabel": "Published 2026 Raider Football Schedule — includes varsity home/away and district games",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "3–1 through September 18, 2026; later Boling and Industrial results not confirmed",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.texasfootball.com/team/rice-consolidated-raiders",
      "sourceLabel": "Dave Campbell's Texas Football 2026 score snapshot",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Houston Wheatley",
          "site": "Home",
          "result": "W 24–22"
        },
        {
          "date": "Sept. 4",
          "opponent": "Hempstead",
          "site": "Home",
          "result": "W 48–9"
        },
        {
          "date": "Sept. 10",
          "opponent": "Schulenburg",
          "site": "Away",
          "result": "W 63–27"
        },
        {
          "date": "Sept. 18",
          "opponent": "Edna",
          "site": "Home",
          "result": "L 14–27"
        },
        {
          "date": "Oct. 2",
          "opponent": "Boling",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 9",
          "opponent": "Vanderbilt Industrial",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Wallis Brazos",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "East Bernard",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "Tidehaven",
          "site": "Home",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Van Vleck",
          "site": "Away",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Rice Veterans' Memorial Stadium",
      "address": "Altair, Texas — exact spectator gate and parking location not independently established",
      "sourceUrl": "https://www.texasfootball.com/team/rice-consolidated-raiders",
      "sourceLabel": "Dave Campbell's stadium and 2026 team history",
      "verifiedAt": "2026-10-09",
      "note": "The program reference names Rice Veterans' Memorial Stadium and estimates historical capacity at 4,393. This is not proof of the present seat count or any 2026 ADA entrance policy. The official high-school contact uses 1095 Raider Drive, while the Rice CISD athletic district pages may show 1094 Raider Drive; neither address is independently confirmed as the event's spectator gate. Verify tickets, parking, bag procedures, and accessible entry with the school for the assigned match."
    },
    "overview": [
      "Rice Consolidated football represents the Raiders of Rice Consolidated High School in Altair, Colorado County. The school and its Rice CISD district are entirely different from Rice University's Houston Owls; the Raiders participate in Texas UIL Class 3A Division II, District 14 for the 2026–28 alignment.",
      "The Raiders have documented playoff tradition rather than a state championship. Dave Campbell's history archive records 22 playoff appearances with zero championship-game appearances and zero football state titles. Listing real postseason experience is valuable without inflating district wins or ordinary playoffs into a state final.",
      "The school's recent years show sharply contrasting results: a 7–4 2024 season followed by 1–9 in 2025, in the same historical archive. MaxPreps' 2026–27 team history associates head coach Brad Dumont with these seasons; an up-to-date Rice CISD appointment announcement was not independently confirmed, so coaching attribution remains explicit.",
      "The 2026 Raiders opened with three wins in a row: 24–22 over Houston Wheatley, 48–9 over Hempstead and 63–27 at Schulenburg, before a 14–27 loss to Edna on September 18. That puts the last cross-checked snapshot at 3–1 before the October district fixtures; score feeds inspected still omitted later final scores, so this is a dated rather than live record.",
      "The dated published 2026 varsity schedule assigns district games to Boling, Industrial, Brazos, East Bernard, Tidehaven and Van Vleck, with some opponents requiring longer rural road travel. The Oct. 9 Industrial game is listed as away; do not send travelling fans to the Altair campus for an away fixture.",
      "Rice Veterans' Memorial Stadium is the venue named by the Texas Football program directory. High school campus location, athletic-office mailing address, and a particular stadium entrance are separate pieces of visitor information; TexasDefined does not substitute any of the former for an unverified game-night gate. School athletics contacts should supply current parking and accessible entrances."
    ],
    "milestones": [
      {
        "date": "Program history",
        "title": "Twenty-two reported playoff appearances",
        "body": "Dave Campbell's football archive lists 22 Raider playoff appearances, zero title-game appearances and zero state football championships.",
        "sourceUrl": "https://www.texasfootball.com/team/rice-consolidated-raiders",
        "sourceLabel": "Dave Campbell's Rice Consolidated history"
      },
      {
        "date": "2024",
        "title": "Seven-win postseason season",
        "body": "Rice Consolidated finished 7–4 in 2024 according to the program's past-season ledger and entered postseason play.",
        "sourceUrl": "https://www.texasfootball.com/team/rice-consolidated-raiders",
        "sourceLabel": "Program season results"
      },
      {
        "date": "2025",
        "title": "One-win campaign",
        "body": "The following year the archive records a 1–9 finish; 2025 and 2026 records must not be conflated.",
        "sourceUrl": "https://www.maxpreps.com/tx/altair/rice-consolidated-raiders/football/history/",
        "sourceLabel": "MaxPreps verified previous season listings"
      },
      {
        "date": "Sept. 10, 2026",
        "title": "Third consecutive win at Schulenburg",
        "body": "The 2026 results archive documents a 63–27 victory at Schulenburg, following wins over Wheatley and Hempstead.",
        "sourceUrl": "https://www.texasfootball.com/team/rice-consolidated-raiders",
        "sourceLabel": "Dave Campbell's 2026 results"
      },
      {
        "date": "Sept. 18, 2026",
        "title": "Edna ends undefeated start",
        "body": "Rice Consolidated lost 14–27 to Edna, leaving a documented 3–1 start before district games.",
        "sourceUrl": "https://www.maxpreps.com/tx/altair/rice-consolidated-raiders/football/",
        "sourceLabel": "MaxPreps Edna match report"
      },
      {
        "date": "2026–28",
        "title": "3A Division II District 14",
        "body": "The 2026 varsity schedule lists six district opponents beginning with Boling, plus Industrial, Brazos, East Bernard, Tidehaven and Van Vleck.",
        "sourceUrl": "https://www.pigskinprep.com/archive/Schedulespdf/Altair%20Rice%20Consolidated.pdf",
        "sourceLabel": "Published Raider 2026 varsity schedule"
      }
    ],
    "faq": [
      {
        "question": "Is Altair Rice Consolidated the same as Rice University?",
        "answer": "No. Rice Consolidated High School's Raiders are in Altair, Colorado County, and compete in UIL high-school football. Rice University's Owls are a separate collegiate program in Houston."
      },
      {
        "question": "Has Rice Consolidated won a UIL football state championship?",
        "answer": "The Dave Campbell's historical program archive lists zero title-game appearances and zero championships, with 22 reported playoff appearances."
      },
      {
        "question": "Who coaches Rice Consolidated football in 2026?",
        "answer": "MaxPreps' 2026–27 school program history lists Brad Dumont as head coach. For changes and verified athletic department appointments, use Rice CISD athletics."
      },
      {
        "question": "What district do the Raiders belong to?",
        "answer": "UIL Class 3A Division II District 14 in the 2026–28 cycle, with Boling, Industrial, Brazos, East Bernard, Tidehaven and Van Vleck on the posted 2026 district schedule."
      },
      {
        "question": "Where does Rice Consolidated play home games?",
        "answer": "The school program directory identifies Rice Veterans' Memorial Stadium in Altair. The school address 1095 Raider Drive is verified for the campus but not independently verified as a stadium gate."
      },
      {
        "question": "What was Rice Consolidated's 2026 record through September 18?",
        "answer": "Three wins and one loss, following victories over Wheatley, Hempstead and Schulenburg and a loss to Edna. Later scores require fresh checking."
      }
    ]
  },
  "alpine": {
    "slug": "alpine",
    "theme": {
      "accentHex": "#6A3B24",
      "label": "Original desert-rust Bucks editorial accent, not official team branding"
    },
    "seo": {
      "title": "Alpine Bucks Football: 2026 Coach, District, Buck Stadium & History",
      "description": "Alpine Bucks football guide: 2026 coach Jerry Dominguez, 3A Division II district opponents, playoff history, Buck Stadium and official school visitor resources."
    },
    "coach": {
      "name": "Jerry Dominguez",
      "title": "Athletic director (official Alpine ISD) and 2026 head football coach (MaxPreps attribution)",
      "sourceUrl": "https://alpine.esc18.net/staff-directory",
      "sourceLabel": "Official Alpine ISD current staff directory (athletic director)",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "300 East Hendryx Avenue, Alpine, TX 79830",
      "phone": "432-837-7710",
      "sourceUrl": "https://alpine.esc18.net/high-school",
      "sourceLabel": "Alpine High School official contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alpine Bucks 2026 varsity schedule and scores",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
      "sourceLabel": "Dave Campbell's Texas Football season snapshot",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "1–3 through September 18, 2026; newer district-game finals not independently checked",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
      "sourceLabel": "Dave Campbell's 2026 Alpine season listing",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "McCamey",
          "site": "Home",
          "result": "L 0–51"
        },
        {
          "date": "Sept. 4",
          "opponent": "Fabens",
          "site": "Away",
          "result": "W 19–16"
        },
        {
          "date": "Sept. 11",
          "opponent": "Clint Mountain View",
          "site": "Home",
          "result": "L 9–34"
        },
        {
          "date": "Sept. 18",
          "opponent": "Kermit",
          "site": "Away",
          "result": "L 14–34"
        }
      ]
    },
    "venue": {
      "name": "Buck Stadium",
      "address": "Alpine, Texas — stadium spectator entrance and parking address unverified",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
      "sourceLabel": "Dave Campbell's Alpine Bucks venue and program record",
      "verifiedAt": "2026-10-09",
      "note": "The football program directory identifies Buck Stadium and reports a 2,000-seat historical estimate. That estimate is not a current accessibility certification or verified sellable inventory. Alpine High School's 300 East Hendryx Avenue campus and the district office at 704 West Sul Ross Avenue are separate addresses; neither should be promoted as the stadium game-night entrance without the school's event directions. Obtain current stadium entrance, visitor parking, ticket and accessible route directions directly from Alpine ISD."
    },
    "overview": [
      "Alpine Bucks football reflects a Big Bend-area high-school program with a substantial playoff history but without a verified state championship. Dave Campbell's historical profile documents 44 playoff appearances, zero championship-game appearances and zero state football titles. Those are cumulative reported milestones, not an invitation to claim a semifinal or state final that lacks a dated source.",
      "The current 2026 school athletics directory identifies Jerry Dominguez as Alpine ISD's athletic director; the 2026 MaxPreps team staff lists Dominguez as football head coach. An official November 2025 board record also recognizes the athletic director and identifies Brylon Lawson-Young in the coaching program. Older athletic staff references can lag a coaching transition, so this page distinguishes which job title was independently established by the district and which came from a third-party season roster.",
      "Alpine football is aligned for the 2026–28 UIL cycle in Class 3A Division II District 3. This placement is not determined by whether opponents are geographically close to the Big Bend; consult UIL's current alignment and the school for the official district slate. The program's documented 2025 record was 2–9, a distinct prior season and not an estimate of 2026 results.",
      "The early 2026 score ledger shows a 19–16 road victory over Fabens, sandwiched between losses to McCamey, Clint Mountain View and Kermit. The four-game snapshot stood at 1–3 through September 18; later Van Horn and Coahoma fixture results are deliberately not inferred from old schedules. Fans should use team and district updates for current standings, travel details and kickoff changes.",
      "Buck Stadium is the locally listed football home for the Bucks, but its reported seating estimate and the official high-school mailing address do not independently establish which gate, ticketing rules, parking surface or wheelchair-accessible entrance is in use for a specific contest. For out-of-town visitors travelling across Brewster County, that distinction is consequential.",
      "The Alpine football program is connected to the city's outdoor-sports and Big Bend regional culture, but the team is neither Sul Ross State University's Lobos nor a college football program. The high school and its opponents deserve independent sourcing, not borrowed college venue information."
    ],
    "milestones": [
      {
        "date": "Program history",
        "title": "More than forty reported playoff appearances",
        "body": "Dave Campbell's school directory lists 44 postseason appearances but no football state-final appearances or state championships for the Bucks.",
        "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
        "sourceLabel": "Dave Campbell's Alpine Bucks history"
      },
      {
        "date": "2025",
        "title": "Two-win prior campaign",
        "body": "The archived school season summary records Alpine at 2–9 for 2025; this does not establish the 2026 record.",
        "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
        "sourceLabel": "Program season archive"
      },
      {
        "date": "Nov. 2025",
        "title": "Athletic department continuity documented",
        "body": "The school board's November 2025 minutes name athletic director Jerry Dominguez and recognize Brylon Lawson-Young for work in football coaching.",
        "sourceUrl": "https://static1.squarespace.com/static/5df26417b47f8d120024c8f5/t/69655a9c8345875a67f15fca/1768250012439/Boardmin%2B11.19.2025%2B-%2BRegular%2BMeeting.pdf",
        "sourceLabel": "Alpine ISD board minutes"
      },
      {
        "date": "Sept. 4, 2026",
        "title": "Fabens road win",
        "body": "The Alpine 2026 ledger lists a 19–16 win at Fabens during the non-district opening weeks.",
        "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=alpine-bucks",
        "sourceLabel": "Dave Campbell's score ledger"
      },
      {
        "date": "2026–28",
        "title": "Current UIL realignment cycle",
        "body": "Alpine competes in 3A Division II District 3 for the 2026–28 cycle; consult UIL for the published opponent set.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/3AD2FB2026.pdf",
        "sourceLabel": "UIL 2026–28 football alignment"
      }
    ],
    "faq": [
      {
        "question": "Has Alpine won a UIL state football championship?",
        "answer": "The historical Alpine Bucks program directory reports no state football final appearances or championships, while listing 44 playoff appearances. An ordinary playoff berth is not a state title."
      },
      {
        "question": "Who leads Alpine football in 2026?",
        "answer": "Alpine ISD's official current staff directory identifies Jerry Dominguez as athletic director; the 2026 MaxPreps staff directory identifies him as head football coach. School staff changes should be checked against Alpine ISD."
      },
      {
        "question": "Where do Alpine Bucks home games take place?",
        "answer": "The football program reference lists Buck Stadium in Alpine. The stadium entry gate, ticket office, visitor parking and accessible routes were not confirmed from that source, and should be checked with Alpine ISD."
      },
      {
        "question": "What district does Alpine play in for 2026?",
        "answer": "UIL Class 3A Division II District 3 for the 2026–28 realignment period."
      },
      {
        "question": "Is Alpine High School the same as Sul Ross State?",
        "answer": "No. Alpine High School fields the Bucks; Sul Ross State University is a different school and football program, so its venues and schedules do not apply."
      },
      {
        "question": "What is Alpine's verified 2026 start?",
        "answer": "A dated four-game snapshot through September 18 shows a 1–3 record including a 19–16 win at Fabens. Later results and schedules need a fresher source."
      }
    ]
  },
  "allen": {
    "slug": "allen",
    "theme": {
      "accentHex": "#103F79",
      "label": "Original Eagle-blue editorial timeline color, not an official logo"
    },
    "seo": {
      "title": "Allen Eagles Football: Five State Titles, Lee Wiginton & 2026 Stadium Guide",
      "description": "Allen Eagles football history: 2008–2017 five UIL titles, Kyler Murray era, coach Lee Wiginton, 2026 District 6 schedule and Eagle Stadium entrance rules."
    },
    "coach": {
      "name": "Lee Wiginton",
      "title": "Head football coach (since June 2022)",
      "sourceUrl": "https://www.alleneaglesfb.com/coaching-staff",
      "sourceLabel": "Allen Eagles football official 2026 coaching directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "301 Rivercrest Boulevard, Allen, TX 75002 (high-school campus, not automatic gate entrance)",
      "sourceUrl": "https://www.maxpreps.com/tx/allen/allen-eagles/football/schedule/",
      "sourceLabel": "Allen High School current varsity directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Official Allen Eagles 2026 varsity football schedule",
      "sourceUrl": "https://www.alleneaglesfb.com/schedule",
      "sourceLabel": "Allen Eagles football team site",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "5–0 through September 25, 2026; October 9 McKinney result not yet verified",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/allen/allen-eagles/football/schedule/",
      "sourceLabel": "MaxPreps 2026 varsity result snapshot",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Duncanville",
          "site": "Home",
          "result": "W 26–7"
        },
        {
          "date": "Sept. 4",
          "opponent": "DeSoto",
          "site": "Home",
          "result": "W 50–6"
        },
        {
          "date": "Sept. 11",
          "opponent": "Southlake Carroll",
          "site": "Away",
          "result": "W 56–35"
        },
        {
          "date": "Sept. 17",
          "opponent": "Prosper",
          "site": "Away",
          "district": true,
          "result": "W 51–21"
        },
        {
          "date": "Sept. 25",
          "opponent": "Princeton",
          "site": "Home",
          "district": true,
          "result": "W 65–7"
        },
        {
          "date": "Oct. 9",
          "opponent": "McKinney",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 15",
          "opponent": "Prosper Rock Hill",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Dallas Jesuit",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 30",
          "opponent": "McKinney Boyd",
          "site": "Away",
          "district": true
        },
        {
          "date": "Nov. 5",
          "opponent": "Prosper Walnut Grove",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Eagle Stadium",
      "address": "155 Rivercrest Boulevard, Allen, TX 75002 — official district football event address",
      "sourceUrl": "https://www.allenisd.org/",
      "sourceLabel": "Allen ISD event calendar lists October 23 Eagle Stadium match address",
      "verifiedAt": "2026-10-09",
      "note": "Allen ISD's August 25, 2026 published Eagle Stadium procedures specify visitor tickets enter from the visitor side, while home-side ticket holders can use either side; metal detectors at all entrances and a no-bag line are provided. Clear totes must be at most 12×12×6 inches, or use a one-gallon clear storage bag; clutches at most 4.5×6.5 inches. Gate tickets are card-only and the district requests the HomeTown Fan app for tickets. Verify accessible arrival and parking with Allen ISD directly; published seating policy is not an accessible-route map."
    },
    "overview": [
      "Allen High School's Eagles are one of North Texas' most decorated modern UIL football programs, with five state championships: 2008, 2012, 2013, 2014 and 2017. Allen ISD's own athletics department publishes exactly those five football titles; the 2012–14 three-title run and the later 2017 win belong to the Eagles, not a neighboring Collin County school.",
      "Allen football history reaches back to 1936 according to the program's own Protect the Tradition history. That football history records the five title seasons, 18,000-seat Eagle Stadium and multiple state semifinal appearances. Enrollment and win-tally summaries on promotional pages can use different counting windows; a documented title list is stronger than a guessed program-wide percentage.",
      "The 2013 championship team was led by quarterback Kyler Murray during the Tom Westerberg years; Dave Campbell's 2026 program retrospective identifies the 2013 Eagles as one of the top teams in state history and reports 807 points that season. Tom Westerberg coached Allen's 2012–14 champion era, followed by Terry Gambill for the 2017 UIL crown. These coaching eras should not be conflated with the current staff.",
      "The current Allen Eagles team directory names Lee Wiginton head coach, hired in June 2022, with John Broom offensive coordinator and Chase Hargis defensive coordinator. This is an important 2026 update: older season archives still display Terry Gambill or Tom Westerberg as coaches for their own historical seasons. Allen's 2026–28 alignment puts it in 6A District 6 with McKinney, Princeton, Prosper and other North Texas opponents.",
      "Allen's 2026 season opened with wins over Duncanville 26–7, DeSoto 50–6, Southlake Carroll 56–35, Prosper 51–21 and Princeton 65–7. The Oct. 9 McKinney contest is scheduled but no result was verified in this October 9 snapshot. Those results do not by themselves establish a current playoff championship or completed unbeaten season.",
      "Eagle Stadium is a practical part of Allen's football story. Allen ISD's 2026 security release establishes actual visitor-side gate direction, transparent bag restrictions, card-only gate purchases and metal screening. Its event calendar places football at 155 Rivercrest Boulevard; avoid directing visitors to the nearby high-school campus contact address as though it were necessarily their ticket-scanning entrance."
    ],
    "milestones": [
      {
        "date": "1936",
        "title": "Program origins",
        "body": "The Eagles' official football history places Allen's program founding in 1936.",
        "sourceUrl": "https://www.alleneaglesfb.com/protect-the-tradition",
        "sourceLabel": "Allen Eagles football program history"
      },
      {
        "date": "2008",
        "title": "First championship in the modern five-title sequence",
        "body": "Allen ISD identifies 2008 as the Eagles' first of five UIL football state-title years in its published list.",
        "sourceUrl": "https://www.allenisd.org/page/athletics",
        "sourceLabel": "Allen ISD football championship archive"
      },
      {
        "date": "2012–2014",
        "title": "Three consecutive UIL crowns",
        "body": "Allen won championships in 2012, 2013 and 2014. The 2013 Kyler Murray-led team scored 807 points in Dave Campbell's modern retrospective.",
        "sourceUrl": "https://www.texasfootball.com/amp/article/2026/05/20/allen-eagles-where-everything-is-bigger-%E2%80%93-and-better",
        "sourceLabel": "Dave Campbell's Texas Football Allen retrospective"
      },
      {
        "date": "2017",
        "title": "Fifth state football championship",
        "body": "The school district's five-title list culminates with 2017; this championship occurred in Terry Gambill's coaching era.",
        "sourceUrl": "https://www.allenisd.org/page/athletics",
        "sourceLabel": "Official Allen ISD athletic championship list"
      },
      {
        "date": "June 2022",
        "title": "Lee Wiginton begins Allen coaching tenure",
        "body": "The team site identifies Lee Wiginton as head coach since June 2022 and gives his previous coaching background.",
        "sourceUrl": "https://www.alleneaglesfb.com/coaches/lee-wiginton",
        "sourceLabel": "Allen Eagles official coach biography"
      },
      {
        "date": "Aug. 25, 2026",
        "title": "New-season stadium entrance and safety policies",
        "body": "Allen ISD published 2026–27 stadium procedures covering ticket sides, metal detectors, bag dimensions and card-only gate admission.",
        "sourceUrl": "https://www.allenisd.org/article/3092730",
        "sourceLabel": "Allen ISD 2026 stadium rules"
      },
      {
        "date": "Sept. 2026",
        "title": "Five wins to open season",
        "body": "The Eagles' first five completed match records include wins over Duncanville, DeSoto and Southlake Carroll before district wins against Prosper and Princeton.",
        "sourceUrl": "https://www.maxpreps.com/tx/allen/allen-eagles/football/schedule/",
        "sourceLabel": "2026 varsity score listing"
      }
    ],
    "faq": [
      {
        "question": "How many UIL state football championships has Allen won?",
        "answer": "Five: 2008, 2012, 2013, 2014 and 2017, according to Allen ISD's athletics title listing."
      },
      {
        "question": "Who is Allen's football head coach in 2026?",
        "answer": "Allen's current team coaching staff identifies Lee Wiginton as head football coach, with John Broom coordinating offense and Chase Hargis defense."
      },
      {
        "question": "Did Kyler Murray win a state title at Allen?",
        "answer": "Yes. The celebrated 2013 Allen championship team was led by quarterback Kyler Murray, who is a key figure in the school's Tom Westerberg-era three-title run."
      },
      {
        "question": "Which UIL district does Allen play in for 2026?",
        "answer": "Class 6A District 6 for the 2026–28 cycle, including Prosper, McKinney, Princeton, McKinney Boyd, Rock Hill, Walnut Grove and Dallas Jesuit."
      },
      {
        "question": "Where is Eagle Stadium and how should visiting fans enter?",
        "answer": "Allen ISD lists football events at 155 Rivercrest Boulevard in Allen. Its 2026 stadium rules direct holders of visitor tickets to enter on the visitor side, require metal screening, and provide a no-bag line. Confirm parking and accessible entry with the district."
      },
      {
        "question": "What is the current Eagle Stadium bag and ticket policy?",
        "answer": "The district's August 2026 stadium policy permits a clear tote up to 12×12×6 inches or one-gallon clear bag, plus a small clutch up to 4.5×6.5 inches. Gate tickets require a debit or credit card, and the district encourages HomeTown Fan tickets."
      }
    ]
  },
  "all-saints-fort-worth": {
    "slug": "all-saints-fort-worth",
    "theme": {
      "accentHex": "#4E3C79",
      "label": "Original purple Saints editorial accent; not official school artwork or confirmed uniform-color palette"
    },
    "seo": {
      "title": "Fort Worth All Saints Football: 2024–25 TAPPS Titles, Aaron Beck & 2026",
      "description": "All Saints’ Episcopal School Fort Worth football: undefeated 2024 and 2025 TAPPS Division II titles, coach Aaron Beck, 2026 schedule and McNair Stadium visitor guide."
    },
    "coach": {
      "name": "Aaron Beck",
      "title": "Head football coach and school athletic director",
      "sourceUrl": "https://www.aseschool.org/community/news/details/~board/all-school-news/post/three-state-championships-this-fall",
      "sourceLabel": "All Saints' Episcopal School official 2025 football championship announcement",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "9700 Saints Circle, Fort Worth, TX 76108",
      "phone": "817-560-5700",
      "sourceUrl": "https://www.aseschool.org/about/campus-map",
      "sourceLabel": "All Saints' Episcopal School official campus map and contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "All Saints 2026 varsity game results and upcoming TAPPS fixtures",
      "sourceUrl": "https://www.maxpreps.com/tx/fort-worth/all-saints-saints/football/",
      "sourceLabel": "MaxPreps football team results, reviewed Oct. 9, 2026",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "5–2 (October 2 result included; later games pending)",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.maxpreps.com/tx/fort-worth/all-saints-saints/football/",
      "sourceLabel": "2026 MaxPreps varsity match results with Oct. 2 Fort Worth Christian final",
      "games": [
        {
          "date": "Aug. 21",
          "opponent": "Parish Episcopal",
          "site": "Home",
          "result": "W 31–11"
        },
        {
          "date": "Aug. 28",
          "opponent": "Liberty Christian",
          "site": "Home",
          "result": "L 35–38"
        },
        {
          "date": "Sept. 4",
          "opponent": "The Woodlands John Cooper",
          "site": "Away",
          "result": "W 44–7"
        },
        {
          "date": "Sept. 11",
          "opponent": "Prestonwood Christian",
          "site": "Away",
          "result": "W 42–14"
        },
        {
          "date": "Sept. 17",
          "opponent": "Lovejoy",
          "site": "Home",
          "result": "L 28–30"
        },
        {
          "date": "Sept. 25",
          "opponent": "Gunter",
          "site": "Away",
          "result": "W 25–9"
        },
        {
          "date": "Oct. 2",
          "opponent": "Fort Worth Christian",
          "site": "Home",
          "district": true,
          "result": "W 37–7"
        },
        {
          "date": "Oct. 9",
          "opponent": "Fort Worth Southwest Christian",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Grapevine Faith Christian",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 23",
          "opponent": "Midland Christian",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "McNair Stadium — school campus athletic venue",
      "address": "9700 Saints Circle, Fort Worth, TX 76108 (school campus; verify stadium entrance separately)",
      "sourceUrl": "https://www.aseschool.org/about/campus-map",
      "sourceLabel": "Official All Saints campus map identifies McNair Stadium",
      "verifiedAt": "2026-10-09",
      "note": "All Saints' official map places McNair Stadium among its campus athletics facilities and distinguishes Normandale Street main entrance from Longvue Avenue west entrance. That map does not designate either as the correct gate for every football game; ticket instructions should control entrance, accessible access, bag rules and parking. The school's planned Field House and Promenade are fundraising/development proposals, not independently confirmed completed 2026 match-day amenities."
    },
    "development": {
      "title": "Proposed field house and spectator promenade",
      "body": "The school has promoted a new field house including athletic training, locker rooms, restrooms and a pedestrian connection to outdoor athletic venues. Its capital campaign description should not be read as proof these facilities were finished for the 2026 season.",
      "sourceUrl": "https://www.aseschool.org/give/saints-elevate/field-house",
      "sourceLabel": "All Saints' Episcopal School field-house fundraising proposal",
      "verifiedAt": "2026-10-09"
    },
    "overview": [
      "Fort Worth All Saints' Episcopal School has a distinctive championship history in private-school eleven-man football. The school's own December 2025 announcement documents consecutive undefeated TAPPS Division II state titles in 2024 and 2025, each season finishing 14–0. The program's school identity is the Saints, and this Fort Worth campus must not be confused with All Saints schools in Tyler or Lubbock.",
      "All Saints capped 2025 by defeating Houston Second Baptist 34–16 in the TAPPS Division II title game on December 5. The school described that repeat as the first back-to-back undefeated title run in TAPPS eleven-man history. This is a SCHOOL-sourced association milestone, not a claim that the team holds the all-time UIL winning streak; school coverage also attributes a lengthy streak across its 2024–25 campaigns.",
      "The official school championship report credits head football coach Aaron Beck and recognizes Hudson Reasor as the offensive MVP and Kingston Beyer as defensive MVP of the 2025 championship game according to TXPS Media. The school leadership roster separately lists Aaron Beck as athletic director and assistant head of school for external operations, grounding his campus role in a current primary source.",
      "The school plays private-school football in the TAPPS Division II District 1 grouping, not UIL Conference 6A or the independent SPC schedule shown by some stale third-party indexes. The 2026 district slate includes Fort Worth Christian, Southwest Christian, Grapevine Faith Christian and Midland Christian; the private association context matters when comparing their championship records with public UIL programs.",
      "Through the reported October 2, 2026 result, the Saints stood 5–2: 31–11 over Parish Episcopal; a close 35–38 loss to Liberty Christian; wins at Cooper 44–7 and Prestonwood 42–14; a 28–30 loss to Lovejoy; then victories against Gunter 25–9 and Fort Worth Christian 37–7. This dated snapshot does not include any October 9 game result and should not be presented as live standings.",
      "The school lists McNair Stadium on its 147-acre Fort Worth campus map, and its 2026 admission page advertised a complimentary-ticket Friday Night Lights visit for the October 2 game. That invitation is date-specific, not proof all games are free or that the school campus postal address identifies the ticket-scanning gate. The announced new field house remains a project until its opening is established."
    ],
    "milestones": [
      {
        "date": "2024",
        "title": "First undefeated title in a two-year run",
        "body": "The school reports a 14–0 TAPPS Division II championship season in 2024, the first of consecutive undefeated title campaigns.",
        "sourceUrl": "https://www.aseschool.org/community/news/details/~board/all-school-news/post/three-state-championships-this-fall",
        "sourceLabel": "All Saints' Episcopal School official championship recap"
      },
      {
        "date": "Dec. 5, 2025",
        "title": "Consecutive TAPPS Division II championships",
        "body": "All Saints defeated Houston Second Baptist 34–16 for the 2025 TAPPS Division II title, completing another 14–0 season; the school attributes an association-first consecutive undefeated 11-man championship feat.",
        "sourceUrl": "https://www.aseschool.org/community/news/details/~board/all-school-news/post/three-state-championships-this-fall",
        "sourceLabel": "School official 2025 football championship account"
      },
      {
        "date": "2025",
        "title": "Reasor and Beyer recognized in title game",
        "body": "The school reports TXPS Media naming Hudson Reasor offensive MVP and Kingston Beyer defensive MVP for the December 2025 championship.",
        "sourceUrl": "https://www.aseschool.org/community/news/details/~board/all-school-news/post/three-state-championships-this-fall",
        "sourceLabel": "School championship account"
      },
      {
        "date": "Aug.–Sept. 2026",
        "title": "Early season tests against Liberty and Lovejoy",
        "body": "The Saints sustained narrow defeats to Liberty Christian (35–38) and Lovejoy (28–30), alongside wins over Parish Episcopal, Cooper, Prestonwood and Gunter.",
        "sourceUrl": "https://www.maxpreps.com/tx/fort-worth/all-saints-saints/football/schedule/",
        "sourceLabel": "MaxPreps 2026 varsity results"
      },
      {
        "date": "Oct. 2, 2026",
        "title": "District-opening win against Fort Worth Christian",
        "body": "The school's MaxPreps 2026 game record shows a 37–7 result against Fort Worth Christian at All Saints Episcopal's home field.",
        "sourceUrl": "https://www.maxpreps.com/tx/fort-worth/all-saints-saints/football/",
        "sourceLabel": "MaxPreps Fort Worth Christian game result"
      }
    ],
    "faq": [
      {
        "question": "How many straight TAPPS football championships has Fort Worth All Saints won?",
        "answer": "The school documents consecutive Division II titles in 2024 and 2025, both with 14–0 seasons; the 2025 state final was a 34–16 win against Houston Second Baptist."
      },
      {
        "question": "Who coaches All Saints football?",
        "answer": "The school's own 2025 football-title announcement names Aaron Beck head football coach, and its leadership page lists him as athletic director and assistant head of school for external operations."
      },
      {
        "question": "Is Fort Worth All Saints in UIL football?",
        "answer": "No. It competes in private-school TAPPS football (Division II District 1 in the 2025–26 team listings). It should not be assigned a public UIL classification or conflated with Tyler's All Saints Trojans."
      },
      {
        "question": "Where is All Saints' McNair Stadium?",
        "answer": "The official campus map identifies McNair Stadium at All Saints' Fort Worth campus, 9700 Saints Circle. Check the specific match ticket or the school for which gate, parking zone, accessible entry and bag policy to use."
      },
      {
        "question": "Was the All Saints new field house completed in 2026?",
        "answer": "The school's field-house page describes a proposed capital improvement with a promenade and new athletic amenities. The source does not establish completion or opening dates, so these are not guaranteed current visitor facilities."
      },
      {
        "question": "What was All Saints' record as of October 2, 2026?",
        "answer": "The 2026 team ledger showed five wins and two losses after a 37–7 victory over Fort Worth Christian. October 9 and later games must be confirmed from newer results."
      }
    ]
  },
  "alief-taylor": {
    "slug": "alief-taylor",
    "theme": {
      "accentHex": "#315F4D",
      "label": "Original deep-green Lions editorial accent; not an official athletics logo or independently confirmed uniform palette"
    },
    "seo": {
      "title": "Alief Taylor Lions Football: 2026 Scores, District 20 & Program Guide",
      "description": "Alief Taylor Lions football: UIL 6A District 20, verified 2026 season results, Alief opponents, coaching-source details and Houston game-day resources."
    },
    "coach": {
      "name": "Shawn Gray",
      "title": "Head coach attributed by the 2026 MaxPreps team/staff listings; official district confirmation pending",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/staff/",
      "sourceLabel": "MaxPreps Alief Taylor varsity staff directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "7555 Howell Sugar Land Road, Houston, TX 77083",
      "phone": "281-988-3500",
      "sourceUrl": "https://taylor.aliefisd.net/events",
      "sourceLabel": "Alief Taylor High School official events/contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alief Taylor varsity 2026 games and current results (verify new finals before attending)",
      "sourceUrl": "https://www.si.com/high-school/stats/texas/football/teams/250856-alief-taylor-lions/games",
      "sourceLabel": "High School On SI / Scorebook Live, October 9 dated check",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "5–1 overall / 3–1 district, through Oct. 2, 2026",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.si.com/high-school/stats/texas/football/teams/250856-alief-taylor-lions/games",
      "sourceLabel": "Scorebook Live dated 2026 game ledger",
      "games": [
        {
          "date": "Aug. 28",
          "opponent": "Westbury",
          "site": "Home",
          "result": "W 39–0"
        },
        {
          "date": "Sept. 4",
          "opponent": "Dobie",
          "site": "Home",
          "result": "W 47–30"
        },
        {
          "date": "Sept. 11",
          "opponent": "Houston Heights",
          "site": "Away",
          "district": true,
          "result": "W 38–24"
        },
        {
          "date": "Sept. 18",
          "opponent": "Alief Elsik",
          "site": "Home",
          "district": true,
          "result": "W 49–0"
        },
        {
          "date": "Sept. 24",
          "opponent": "Bellaire",
          "site": "Away",
          "district": true,
          "result": "W 48–8"
        },
        {
          "date": "Oct. 2",
          "opponent": "Alief Hastings",
          "site": "Home",
          "district": true,
          "result": "L 23–27"
        },
        {
          "date": "Oct. 10",
          "opponent": "Stratford",
          "site": "Away",
          "district": true
        },
        {
          "date": "Oct. 16",
          "opponent": "Memorial",
          "site": "Home",
          "district": true
        },
        {
          "date": "Oct. 22",
          "opponent": "Westside",
          "site": "Away",
          "district": true
        },
        {
          "date": "Nov. 6",
          "opponent": "Lamar",
          "site": "Home",
          "district": true
        }
      ]
    },
    "venue": {
      "name": "Alief ISD game facilities — Crump Stadium for documented Sept. 18 Elsik contest",
      "address": "Houston, Texas — game-specific stadium entrance not independently verified",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/",
      "sourceLabel": "MaxPreps Alief Taylor Sept. 18 venue listing",
      "verifiedAt": "2026-10-09",
      "note": "The September 18 Taylor–Elsik score explicitly records a Crump Stadium game, but that does not establish that every Taylor home fixture uses the same entrance or that the Howell Sugar Land Road school campus is the stadium gate. Check the district and event ticket for the venue, parking, accessible entry and bag rules. A separate Alief ISD event gives a Crump address at 12321 Alief Clodine Road; a state press-box construction registration uses High Star Drive. Neither document verifies the entrance for every Lions game."
    },
    "overview": [
      "The Alief Taylor Lions are Alief ISD's own Houston football program, distinct from the neighboring Alief Elsik Rams and Alief Hastings Fighting Bears. UIL's 2026–28 alignment places Taylor in Conference 6A District 20. The official alphabetical alignment reports 2,783 for Taylor's realignment enrollment; it is an alignment figure rather than a claim about a specific 2026 game-night attendance.",
      "Taylor opened 2026 with five straight varsity wins, shutting out Westbury 39–0 and Alief Elsik 49–0. The first district stretch also included a 38–24 road win over Heights and a 48–8 victory at Bellaire. That sequence gives the Lions a distinctive current-season story without making an unverified claim about program records or district championships.",
      "Hastings ended Taylor's unbeaten start with a 27–23 district win on October 2. As of the October 9 research checkpoint, independently cross-checked secondary score ledgers stood at 5–1 overall and 3–1 in District 20. Upcoming Stratford, Memorial, Westside and Lamar fixtures should not be presented as completed games. The standalone MaxPreps schedule snapshot lags behind the October 2 result, so the dated season ledger and official team updates take precedence.",
      "The 2026 MaxPreps personnel listing identifies Shawn Gray as Taylor's head coach, with Wale Okunnu and Chris Maple among assistant staff. An independent current Alief ISD announcement has not been located for all those appointments; the attribution is deliberate and visitors should follow the district athletics office for personnel changes.",
      "Alief's district grouping makes the Elsik and Hastings games particularly useful context for Lions supporters. The two 2026 results are documented football matchups, not proof of an annual named rivalry trophy. The Taylor school address is verified by the school itself, while a football ticket's assigned stadium gate and parking remain game-specific.",
      "This editorial record focuses on independently verifiable 2026 achievements and primary UIL classification rather than inventing older state finals, notable alumni or school traditions. Additional historical claims require year-specific UIL archives and school records before publication."
    ],
    "milestones": [
      {
        "date": "2026–28",
        "title": "Conference 6A, District 20 alignment",
        "body": "UIL's published realignment places Alief Taylor in Class 6A District 20, with a reported realignment enrollment of 2,783.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf",
        "sourceLabel": "Official UIL 2026–28 alphabetical alignment"
      },
      {
        "date": "Aug. 28, 2026",
        "title": "Opening-night shutout",
        "body": "Taylor opened the varsity schedule with a 39–0 win against Westbury in the 2026 results ledger.",
        "sourceUrl": "https://www.si.com/high-school/stats/texas/football/teams/250856-alief-taylor-lions/games",
        "sourceLabel": "Scorebook Live 2026 results"
      },
      {
        "date": "Sept. 18, 2026",
        "title": "49–0 meeting with Elsik",
        "body": "The Lions defeated fellow Alief ISD program Elsik 49–0; the MaxPreps match record identifies Crump Stadium for this specific contest.",
        "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/",
        "sourceLabel": "MaxPreps Alief Taylor 2026 game recap"
      },
      {
        "date": "Sept. 24, 2026",
        "title": "Five-win opening streak",
        "body": "A 48–8 victory at Bellaire extended Taylor's season start to five consecutive wins.",
        "sourceUrl": "https://www.si.com/high-school/stats/texas/football/teams/250856-alief-taylor-lions/games",
        "sourceLabel": "Scorebook Live season record"
      },
      {
        "date": "Oct. 2, 2026",
        "title": "Hastings wins close Alief matchup",
        "body": "Taylor's five-win streak ended in a 27–23 District 20 loss to Alief Hastings, leaving the Lions 5–1 through six games.",
        "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/",
        "sourceLabel": "MaxPreps Oct. 2 game score"
      }
    ],
    "faq": [
      {
        "question": "What is Alief Taylor's football classification in 2026?",
        "answer": "UIL lists Alief Taylor in Conference 6A District 20 for the 2026–28 cycle; the published realignment enrollment is 2,783."
      },
      {
        "question": "What was the Lions' record through October 2, 2026?",
        "answer": "Taylor stood 5–1 overall and 3–1 in district games, with a five-win opening streak followed by a 27–23 loss to Alief Hastings. This is a dated snapshot, not a live standings feed."
      },
      {
        "question": "Who is the 2026 Alief Taylor football coach?",
        "answer": "MaxPreps' 2026 football staff listing identifies Shawn Gray as head coach. District appointment confirmation and subsequent staff changes should be checked with Alief ISD."
      },
      {
        "question": "Are Taylor, Elsik and Hastings the same football program?",
        "answer": "No. They are separate Alief ISD high-school teams. In 2026 Taylor defeated Elsik 49–0 and lost to Hastings 27–23; these are documented league meetings rather than evidence of an officially named rivalry trophy."
      },
      {
        "question": "Where does Alief Taylor play football games?",
        "answer": "A September 18, 2026 game record specifically names Crump Stadium for the Lions' contest with Elsik. Venue, game-specific entrance, parking, accessible seating and ticketing should be confirmed with Alief ISD before travel; the school campus address is not automatically the stadium gate."
      },
      {
        "question": "Did Alief Taylor win a state championship?",
        "answer": "This page does not claim a UIL state title. No championship result has been independently established in the research cited here; use official UIL championship archives for historical title verification."
      }
    ]
  },
  "alief-hastings": {
    "slug": "alief-hastings",
    "theme": {
      "accentHex": "#73442E",
      "label": "Original warm-brown Bears editorial accent, not official school artwork or a verified uniform palette"
    },
    "seo": {
      "title": "Alief Hastings Fighting Bears: 1997 State Final & 2026 Guide",
      "description": "Alief Hastings Fighting Bears football: 1997 UIL state finalist, coach Michael Carter, 2026 District 20, Crump Stadium and current schedule."
    },
    "coach": {
      "name": "Michael Carter",
      "title": "Head football coach named in 2026–27 team season history (third-party)",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-hastings-fighting-bears/football/history/",
      "sourceLabel": "MaxPreps current Alief Hastings staff and historical seasons",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "4410 Cook Road, Houston, TX 77072",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-hastings-fighting-bears/football/schedule/",
      "sourceLabel": "Alief Hastings 2026 football school directory",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Hastings Fighting Bears 2026 varsity schedule and scores",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-hastings-fighting-bears/football/schedule/",
      "sourceLabel": "MaxPreps UIL-partner football schedule last updated October 7",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Alief ISD Crump Stadium (confirm each Hastings game location)",
      "address": "12321 Alief Clodine Road, Houston, TX 77072 — Alief district event address",
      "sourceUrl": "https://www.aliefisd.net/o/fce/live-feed",
      "sourceLabel": "Alief ISD official Crump Stadium event announcement for October 2026",
      "verifiedAt": "2026-10-09",
      "note": "Alief ISD publicly directs visitors to Crump Stadium at 12321 Alief Clodine Road for an October 2026 event. A separate TDLR project registers press-box reconstruction at 12321 High Star Drive: the different published frontage addresses may describe the same campus complex and should not be used interchangeably as verified admission gates. District athletics and the scheduled game ticket link control current stadium entrance, parking, accessible access, seating and field assignment. The TDLR projected July 2026 press-box completion is not proof of completion."
    },
    "overview": [
      "The Alief Hastings Fighting Bears represent a distinct Houston-area football program whose greatest UIL playoff achievement is documented at the state championship-game level. Hastings reached the 1997 Class 5A Division II state final, losing 59–20 to Lewisville Marcus. UIL records one state-final appearance, zero state championships. This history must not be conflated with nearby Alief Elsik Rams or Alief Taylor Lions.",
      "The 1997 runner-up campaign is Hastings' strongest documented football milestone. The official championship table identifies opponent and result; it doesn't support describing the Bears as former state champions. The program's longer competitive history includes 16 playoff appearances in Dave Campbell's team archive, but that tally is not a state title count.",
      "The school is listed in modern sources as the Fighting Bears. Its 2026 MaxPreps history names Michael Carter as head coach, with Carter also associated with 2024 and 2025 campaigns. The coach name is attributed to the third-party current season listing rather than presented as an independently observed 2026 district board announcement.",
      "The 2026–28 UIL football alignment places Hastings in Class 6A District 20 with neighboring Alief Elsik and Alief Taylor, plus Houston-area schools. The annual district grouping creates relevant links among these teams but does not establish unsupported rivalry trophy traditions.",
      "The 2025 MaxPreps archive records Hastings at 1–9, including a 47–14 win over Bellaire and a 27–18 loss to Elsik. For 2026, a MaxPreps October 7 snapshot listed a 3–3 team, featuring wins over Cypress Park 23–21, Westside 56–0 and Alief Taylor 27–23, ahead of future games against Heights, Elsik and Bellaire. Because the schedule posted an October 8 Lamar matchup without a final result, no October 9 live record is claimed.",
      "Dave Campbell's Texas Football lists Crump Stadium as Hastings' home venue and estimates its historic capacity at 8,600. A 2026 Alief ISD family-event notice places Crump Stadium at 12321 Alief Clodine Road, while a separate state press-box renovation filing uses 12321 High Star Drive. These public address differences must be clarified by the district before giving spectators a gate, and construction registration does not certify completed ADA access."
    ],
    "milestones": [
      {
        "date": "1997",
        "title": "Fighting Bears reach the state final",
        "body": "UIL's official 5A Division II final records Lewisville Marcus 59, Alief Hastings 20. It is Hastings' only recorded state football championship-game appearance.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL 1997 football state championship results"
      },
      {
        "date": "2018",
        "title": "A seven-win modern season",
        "body": "Dave Campbell's Hastings history records a 7–5 season in 2018, a modern reference point for a program with several postseason appearances.",
        "sourceUrl": "https://www.texasfootball.com/team/alief-hastings-bears",
        "sourceLabel": "Dave Campbell's historical season archive"
      },
      {
        "date": "2025",
        "title": "Program works through a rebuilding year",
        "body": "The MaxPreps 2025 schedule records Hastings finishing 1–9; its 2026 coach listing still names Michael Carter, distinct from earlier eras.",
        "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-hastings-bears/football/25-26/schedule/",
        "sourceLabel": "MaxPreps prior varsity season results"
      },
      {
        "date": "2025–26",
        "title": "Crump Stadium press-box project registered",
        "body": "TDLR's public architectural-barriers record registers a $10 million estimated press-box rebuilding project with forecast completion in July 2026; registration is not an as-built completion certificate.",
        "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Print/TABS2025021812",
        "sourceLabel": "Official TDLR Crump press box work"
      },
      {
        "date": "2026",
        "title": "A competitive opening six games",
        "body": "MaxPreps' October 7 schedule recorded a 3–3 start including a 27–23 district win over Alief Taylor; October 8 and later results require current confirmation.",
        "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-hastings-fighting-bears/football/schedule/",
        "sourceLabel": "MaxPreps October 7, 2026 Hastings results"
      },
      {
        "date": "2026–28",
        "title": "Class 6A District 20",
        "body": "UIL places Hastings in District 20 alongside Alief Elsik, Alief Taylor and other Houston-area competitors in the 2026–28 realignment.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf",
        "sourceLabel": "Official UIL 6A district alignment"
      }
    ],
    "faq": [
      {
        "question": "Has Alief Hastings won a state football championship?",
        "answer": "No. Hastings reached the 1997 UIL 5A Division II state final and lost 59–20 to Lewisville Marcus. Official UIL records list one championship-game appearance and no championship wins."
      },
      {
        "question": "Who is the Hastings Fighting Bears coach for 2026?",
        "answer": "MaxPreps lists Michael Carter as head football coach for the 2026–27 season. It is a third-party staff record; verify subsequent appointments directly with Alief ISD."
      },
      {
        "question": "Where do Alief Hastings football games take place?",
        "answer": "Dave Campbell's lists Crump Stadium as the Hastings venue. Alief ISD advertises its Crump event entrance as 12321 Alief Clodine Road, but a separate stadium project filing uses 12321 High Star Drive; confirm game-specific gate/parking with the district."
      },
      {
        "question": "What is the 2026 Hastings football record?",
        "answer": "The dated MaxPreps October 7 source showed 3–3 after six reported games; it did not provide a final score for October 8. Check the current live team schedule for any newer result."
      },
      {
        "question": "What 2026 UIL district contains Hastings?",
        "answer": "Hastings plays UIL 6A District 20, alongside fellow Alief programs Elsik and Taylor and other Houston-area teams, for the 2026–28 period."
      },
      {
        "question": "Did the Crump Stadium renovation finish in July 2026?",
        "answer": "The TDLR filing lists a projected July 2026 completion for the press box. It does not verify actual completion or the state of spectator access, so contact Alief ISD for current conditions."
      }
    ]
  },
  "alief-elsik": {
    "slug": "alief-elsik",
    "theme": {
      "accentHex": "#36634A",
      "label": "Original muted-green football chronology (editorial choice, not a verified school-color assertion or official logo)"
    },
    "seo": {
      "title": "Alief Elsik Rams Football: 1990s Playoffs & 2026 Team Guide",
      "description": "Alief Elsik Rams football in Houston: coach Shea Rodriguez, 1990s UIL quarterfinal runs, 2026 District 20 opponents, school campus and current game-day links."
    },
    "coach": {
      "name": "Shea Rodriguez",
      "title": "2026 varsity head football coach as listed on UIL-partner MaxPreps staff",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/staff/",
      "sourceLabel": "MaxPreps 2026–27 Alief Elsik football staff updated September 4, 2026",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "12601 High Star Drive, Houston, TX 77072 (school postal directory may use 77411-0068)",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/schedule/",
      "sourceLabel": "MaxPreps 2026 varsity schedule school location; confirm campus visitors with Alief ISD",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alief Elsik 2026 varsity game results and remaining fixtures",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/schedule/",
      "sourceLabel": "MaxPreps UIL-partner dated schedule updated October 3",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Alief ISD scheduled football facility — verify event-specific stadium",
      "address": "Houston / Alief ISD, Texas; do not assume school campus is the game venue",
      "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/schedule/",
      "sourceLabel": "School-linked MaxPreps schedule for home versus away designation",
      "verifiedAt": "2026-10-09",
      "note": "A varsity listing may say 'home' without proving the game's spectator-stadium gate is on the high school campus. District football facilities, parking, tickets and accessible entry must be confirmed with Alief ISD athletics for the specific Elsik game. The postal campus listing is not a stadium entrance."
    },
    "overview": [
      "Alief Elsik High School's Rams represent the southwest Houston Alief community. This is a distinct football program from neighboring Alief Hastings Bears and Alief Taylor Lions. Its UIL history is most clearly documented through competitive 1990s playoff runs rather than a nonexistent state football title; the official all-time football championship table does not list an Elsik state crown.",
      "The UIL's 1990 state bracket documents Elsik beating Houston Madison 28–14 in bi-district play and Houston Milby 24–12 in the area round. Its regional run ended 24–12 against Humble Kingwood. Those results show a real postseason achievement, not a championship-game appearance.",
      "An independent game-by-game playoff archive records even deeper 1992 and 1993 runs: in 1992 Elsik beat Houston Lamar 27–9 and Jersey Village 12–7 before losing to Aldine Eisenhower 24–16; in 1993 Elsik beat Lamar 24–7 and Cypress Creek 7–3 before losing to Eisenhower 31–12. Such quarterfinal-era games deserve more space than interchangeable descriptions of the Alief district.",
      "Current program leadership is separately documented: MaxPreps' September 2026 football staff list identifies Shea Rodriguez as head coach with assistant coaches, including James Robinson and Daric Zeno. The source is a UIL-partner roster, not an Alief ISD appointment announcement. Check the district before relying on staffing details for a future season.",
      "For the 2026–28 UIL alignment Elsik is in 6A District 20; current Houston-region opponents include Alief Hastings and Alief Taylor as well as other Houston-area district schools. This is a modern competitive grouping, not evidence that every present opponent is a centuries-old rivalry.",
      "The MaxPreps October 3 snapshot showed Elsik 1–5 after an early win against Westside (55–7) and losses to West Fork, Dekaney, Alief Taylor, Lamar and Heights. The remaining scheduled October games included Bellaire, Alief Hastings and Stratford. Results and kickoff times are changeable and must be checked against the live schedule, especially for ticketing, venue and accessibility."
    ],
    "milestones": [
      {
        "date": "1990",
        "title": "A UIL regional playoff run",
        "body": "Elsik beat Houston Madison 28–14 and Houston Milby 24–12 before a 24–12 regional loss to Humble Kingwood.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/playoff_text/90at_bfb.html",
        "sourceLabel": "UIL official 1990–91 playoff results"
      },
      {
        "date": "1992",
        "title": "Quarterfinal-era victories",
        "body": "Independent historical scores record wins over Houston Lamar and Jersey Village before a 24–16 playoff loss to Aldine Eisenhower.",
        "sourceUrl": "https://www.texashighschoolfootballhistory.com/Playoff%20Scores%20A-B.html",
        "sourceLabel": "Texas High School Football History game results"
      },
      {
        "date": "1993",
        "title": "Another deep postseason",
        "body": "Elsik beat Houston Lamar and Cypress Creek before Eisenhower ended the Rams' run, 31–12, according to the independent archival result list.",
        "sourceUrl": "https://www.texashighschoolfootballhistory.com/Playoff%20Scores%20A-B.html",
        "sourceLabel": "Historical independent Elsik playoff archive"
      },
      {
        "date": "2026",
        "title": "Shea Rodriguez listed as head coach",
        "body": "The September-updated MaxPreps staff listing identifies Shea Rodriguez as Elsik's 2026 football head coach. It is a third-party staff source, not an official district hiring release.",
        "sourceUrl": "https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/staff/",
        "sourceLabel": "MaxPreps UIL-partner 2026 Rams staff"
      },
      {
        "date": "2026–28",
        "title": "Modern UIL 6A District 20",
        "body": "UIL aligns Elsik with neighboring Alief and Houston-area programs in Class 6A District 20; this is not a historical title-game qualification.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf",
        "sourceLabel": "UIL official 2026–28 6A alignment"
      }
    ],
    "faq": [
      {
        "question": "What is Alief Elsik's football team called?",
        "answer": "The Rams. Elsik is a separate Alief ISD football program from Alief Hastings and Alief Taylor."
      },
      {
        "question": "Who coaches Alief Elsik football in 2026?",
        "answer": "The UIL-partner MaxPreps staff page lists Shea Rodriguez as the 2026 varsity head coach, dated September 2026. Reconfirm with Alief ISD for later staff changes."
      },
      {
        "question": "Has Elsik reached the UIL football state championship game?",
        "answer": "The official UIL all-time football finals do not list Elsik as a state title-game participant. The Rams' historical postseason results include deep playoff runs in 1990, 1992 and 1993."
      },
      {
        "question": "How far did Elsik advance in 1990?",
        "answer": "To the regional round after wins against Houston Madison and Houston Milby. Humble Kingwood defeated Elsik 24–12 in the regional game."
      },
      {
        "question": "Which division does Elsik compete in during 2026?",
        "answer": "UIL Class 6A, District 20 for the 2026–28 alignment. The individual division split used in some lower classes does not apply here."
      },
      {
        "question": "Where do visiting fans find the Elsik football stadium and tickets?",
        "answer": "Check the specific game's school/district schedule and Alief ISD athletics. A listing of the school's High Star Drive campus does not establish a game-day stadium entrance, parking plan or ADA gate."
      }
    ]
  },
  "alice": {
    "slug": "alice",
    "theme": {
      "accentHex": "#B56B29",
      "label": "Original burnt-orange editorial history cards inspired by verified Alice Coyotes football uniforms and stadium coverage; not an official district logo"
    },
    "seo": {
      "title": "Alice Coyotes Football: New 2026 Memorial Stadium & Program Guide",
      "description": "Alice Coyotes football: new 2026 Memorial Stadium, coach Joe Castellano, 4A Division I District 16, consecutive 2023–24 district titles and game-day planning."
    },
    "coach": {
      "name": "Joe (J.R.) Castellano",
      "title": "Alice ISD athletic director and Alice Coyotes head football coach",
      "sourceUrl": "https://www.aliceisd.net/en-US/athletics-640d1b62/coaching-staff-6d5e1b54",
      "sourceLabel": "Official Alice ISD 2026 athletics coach roster",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1 Coyote Trail, Alice, TX 78332",
      "phone": "361-664-0126",
      "sourceUrl": "https://ahs.aliceisd.net/en-US/athletics-dc57d034",
      "sourceLabel": "Official Alice High School campus and athletics",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Official Alice High 2026 football schedule, clear-bag and visitor updates",
      "sourceUrl": "https://ahs.aliceisd.net/en-US/athletics-dc57d034",
      "sourceLabel": "Alice High official 2026 athletics schedule and stadium visitor policies",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "New Alice Memorial Stadium (opened September 2026)",
      "address": "212 North Stadium Road, Alice, TX 78332",
      "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Project/TABS2025013898",
      "sourceLabel": "TDLR official new Alice Memorial Stadium construction location",
      "verifiedAt": "2026-10-09",
      "note": "Alice ISD's rebuilt Memorial Stadium opened for football on September 11, 2026, with a KIII report describing 6,000 seats and a reported $38 million completed-project cost. The Texas state construction filing identifies the new stadium at 212 N. Stadium Road and a separate estimated $30 million registered project budget—these two cost figures are different types of estimates/reports, not proof of a discrepancy in expenditure. The original 1947-era Skydome was demolished after 2024, and Alice played temporary home dates in San Diego during 2025. Never send 2026 fans to San Diego as if it remains the home venue. Consult the official Alice athletics stadium clear-bag and student expectations documents for present-day ticketing, security, parking and accessible gates."
    },
    "development": {
      "title": "Memorial Stadium rebuilding completed to opening in September 2026",
      "body": "The district's 2024-bond stadium redesign followed the old Alice Memorial Stadium's final 2024 football season; a TDLR project registered in March 2025 planned construction of a new facility on North Stadium Road. Contemporary 3NEWS/KIII September 12, 2026 reporting confirms the new 6,000-seat Memorial Stadium hosted its first 2026 home football contest against Palmview, with Alice winning 28–7. This is documented opening evidence, not merely a forecast construction completion date. Individual seating sections, ADA routes, parking and ticket availability still require current school confirmation.",
      "sourceUrl": "https://sports.yahoo.com/articles/alice-isd-opens-38-million-043331335.html",
      "sourceLabel": "KIII 3NEWS September 12, 2026 report of stadium opening",
      "verifiedAt": "2026-10-09"
    },
    "overview": [
      "Alice football has a distinct South Texas identity: the Coyotes play for Alice High School in Jim Wells County, with a local history extending far beyond one modern UIL realignment. The school documents decades of district and playoff achievements at old Memorial Stadium, affectionately called the Skydome, but the UIL state-final archives do not identify Alice as a state football champion. Local and third-party claims about historical district titles must not be promoted as UIL state crowns.",
      "An important recent period came under coach Joe (J.R.) Castellano. The official Alice High School football page documents the Coyotes beating Roma 34–14 in 2024 to secure a second consecutive district title, the school's first such back-to-back streak in 39 years. MaxPreps lists the 2023 campaign at 10–2 and the 2024 season at 8–4, including playoff appearances. These are different seasons from the one-win 2025 rebuilding campaign.",
      "Memorial Stadium itself underwent a major generational replacement. Alice ISD's original Skydome hosted its last high school game in 2024, before being demolished and rebuilt. The district carried out temporary 2025 home games at San Diego High School. The newly built Memorial Stadium at 212 North Stadium Road opened Friday, September 11, 2026: Alice beat La Joya Palmview 28–7 in the opening contest, according to contemporary KIII reporting. Fans now need directions for the rebuilt home stadium, not the old 2025 temporary facility.",
      "Construction records from the Texas Department of Licensing and Regulation describe a new football venue with locker rooms, restrooms, concessions, bleachers, press box and parking facilities at the 212 N. Stadium Rd site. The official registration's $30 million estimate differs from the approximately $38 million KIII reported for the finished venue; TexasDefined presents each figure with its source and does not describe either as independently audited final expenses. KIII reported an approximate 6,000-seat stadium, separate from older capacity claims about the demolished Skydome.",
      "The UIL's 2026–28 football alignment returns Alice to Class 4A Division I, District 16. Its new league has Edcouch-Elsa, Hidalgo Early College, Pharr Valley View and Zapata. These are current district opponents, not opponents copied from the 2025 5A Division II schedule; the Coyotes' current posted 2026 early-season results include five wins before district play, but scorekeeping from MaxPreps is a dated third-party record and not a guarantee of today's live standing.",
      "The school maintains a contemporary athletics page with the 2026 football schedule, stadium clear-bag rules and student expectations for Memorial Stadium. Its athletic department confirms head coach and AD Joe Castellano, while the regular Alice High campus is at 1 Coyote Trail. That campus address is distinct from the new football stadium's North Stadium Road site. Verify the gate, parking lot, accessible seating, admission and changing kickoff through Alice ISD instead of assuming old Memorial Stadium policies carried over."
    ],
    "milestones": [
      {
        "date": "2023",
        "title": "First title in a back-to-back district run",
        "body": "MaxPreps' season archive records the Coyotes at 10–2 in 2023. The school's later 2024 announcement describes that season as the first of two consecutive district championships.",
        "sourceUrl": "https://www.maxpreps.com/tx/alice/alice-coyotes/football/history/",
        "sourceLabel": "Alice season archive and school district-title history"
      },
      {
        "date": "2024",
        "title": "Alice wins a second consecutive district crown",
        "body": "The official Alice High School football news archive says a 34–14 win over Roma earned a second straight district title, the first back-to-back district champions for Alice in 39 years.",
        "sourceUrl": "https://ahs.aliceisd.net/en-US/football-e260d291",
        "sourceLabel": "Alice High official football celebration"
      },
      {
        "date": "2024–25",
        "title": "Farewell to the old Skydome",
        "body": "The old Memorial Stadium played its final football dates in 2024; Alice used nearby San Diego High for home games during 2025 while the facility was demolished and replaced.",
        "sourceUrl": "https://sports.yahoo.com/articles/alice-isd-opens-38-million-043331335.html",
        "sourceLabel": "KIII reporting on the 2024–26 stadium transition"
      },
      {
        "date": "Sept. 11, 2026",
        "title": "New Memorial Stadium opens with a Coyote win",
        "body": "Alice beat Palmview 28–7 in the replacement Memorial Stadium's opening game; KIII reported the approximately 6,000-seat stadium's debut on September 12.",
        "sourceUrl": "https://sports.yahoo.com/articles/alice-isd-opens-38-million-043331335.html",
        "sourceLabel": "KIII 3NEWS grand opening coverage"
      },
      {
        "date": "2026",
        "title": "A new construction project comes into use",
        "body": "A state architectural-barriers project record identifies the new 212 N. Stadium Rd Memorial Stadium, including press box, seating, restrooms, concessions, locker rooms and planned parking.",
        "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Project/TABS2025013898",
        "sourceLabel": "Texas TDLR project TABS2025013898"
      },
      {
        "date": "2026–28",
        "title": "Back to Class 4A Division I",
        "body": "UIL assigns Alice to District 16 with Edcouch-Elsa, Hidalgo Early College, Pharr Valley View and Zapata, replacing Alice's older 2025 5A Division II peers.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/4AD1FB2026.pdf",
        "sourceLabel": "UIL official 2026–28 4A Division I alignment"
      },
      {
        "date": "Oct. 2026",
        "title": "Joe Castellano directs Coyotes football",
        "body": "The official Alice ISD athletics directory identifies Joe Castellano as athletic director and head football coach; Alice High continues to publish the 2026 current schedule and stadium policies.",
        "sourceUrl": "https://www.aliceisd.net/en-US/athletics-640d1b62/coaching-staff-6d5e1b54",
        "sourceLabel": "Alice ISD football leadership"
      }
    ],
    "faq": [
      {
        "question": "Where do the Alice Coyotes play football in 2026?",
        "answer": "At the rebuilt Alice Memorial Stadium, opened September 11, 2026, at 212 North Stadium Road in Alice. The 2025 temporary home dates in San Diego were during construction, not the 2026 regular home-field location."
      },
      {
        "question": "How many seats does the new Memorial Stadium have?",
        "answer": "KIII 3NEWS reported an approximately 6,000-seat venue when it opened in September 2026. For accessible seating and currently available admission, consult the school's stadium visitor and athletics pages directly."
      },
      {
        "question": "Who is Alice High School's 2026 football coach?",
        "answer": "Alice ISD identifies Joe (J.R.) Castellano as its athletic director and Coyotes head football coach on its official staff directory."
      },
      {
        "question": "What is Alice's UIL football classification for 2026–28?",
        "answer": "Class 4A Division I, District 16, alongside Edcouch-Elsa, Hidalgo Early College, Pharr Valley View and Zapata. The older 2025 5A Division II district is no longer the current grouping."
      },
      {
        "question": "Did Alice win consecutive district titles?",
        "answer": "Yes. Alice High officially celebrated its 2024 win over Roma by saying that it secured a second consecutive football district championship, something the program had not done for 39 years. A district championship is distinct from a UIL state title."
      },
      {
        "question": "What happened to the historic Skydome?",
        "answer": "The original Alice Memorial Stadium's final high-school football season was in 2024, followed by demolition and construction of its replacement. The new Memorial Stadium opened in September 2026. Photographs of the old stadium must be labeled historical."
      },
      {
        "question": "Where do I find current Alice stadium tickets and clear-bag rules?",
        "answer": "Alice High School's official athletics page links the 2026 football schedule, Memorial Stadium clear-bag rules and student expectations. Confirm ticket availability, individual game venue, parking and accessible entrances through the school rather than relying on last year's temporary stadium arrangements."
      }
    ]
  },
  "aledo": {
    "slug": "aledo",
    "theme": {
      "accentHex": "#D76619",
      "label": "Original orange-and-black editorial timeline based on UIL 2023 Aledo championship roster; not the Bearcats official trademark or a photograph"
    },
    "seo": {
      "title": "Aledo Bearcats Football: 12 UIL State Titles & 2026 Class 6A",
      "description": "Aledo Bearcats football history: 12 championships, 2026 move to UIL 6A District 3, coach Robby Jones, the 136-game district streak and Tim Buchanan Stadium."
    },
    "coach": {
      "name": "Robby Jones",
      "title": "2026 head football coach",
      "sourceUrl": "https://www.aledoisdathletics.com/sport/football/boys/?tab=staff",
      "sourceLabel": "Official Aledo ISD Athletics 2026–27 varsity football staff",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1000 Bailey Ranch Road, Aledo, TX 76008",
      "sourceUrl": "https://ahs.aledoisd.org/parents-students/aledo-high-school-graduation-information/class-of-2026-graduation",
      "sourceLabel": "Official Aledo High School campus and stadium event address",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Official 2026 Aledo football varsity schedule and season information",
      "sourceUrl": "https://www.aledoisdathletics.com/sport/football/boys?tab=schedule",
      "sourceLabel": "Aledo ISD Athletics official current football schedule",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Tim Buchanan Stadium",
      "address": "1000 Bailey Ranch Road, Aledo, TX 76008",
      "sourceUrl": "https://www.aledoisdathletics.com/buchanan-stadium",
      "sourceLabel": "Official Aledo Athletics Buchanan Stadium clear-bag policies",
      "verifiedAt": "2026-10-09",
      "note": "Aledo ISD identifies Tim Buchanan Stadium at 1000 Bailey Ranch Road as its varsity football ground. The official stadium page sets a clear-bag policy: 12×6×12 inches maximum for transparent bags, one-gallon transparent freezer bags and small clutches subject to current detailed restrictions; medically necessary items may be excepted. Consult that official policy, the assigned game's ticket page and athletics staff for currently available tickets, permitted items, parking and ADA gates. Do not copy high-school graduation's special guest access/ticket rules into a varsity football visit."
    },
    "overview": [
      "Aledo's Bearcats entered fall 2026 with 12 official Texas UIL state football championships, the most recorded for an eleven-man Texas high school program. The winning seasons in the UIL ledger are 1998, 2009, 2010, 2011, 2013, 2014, 2016, 2018, 2019, 2020, 2022 and 2023. This isn't a claim of a new 2024–2026 crown: Aledo was a 2025 state semifinalist, and the school board's 2026 commendation did not award a thirteenth championship.",
      "The central 2026 program story is not another generic state-title tally; it is Aledo's first season in UIL Class 6A. The official 2026–28 realignment assigns the Bearcats to Region I, District 3 alongside Arlington, Arlington Bowie, Arlington Sam Houston, Arlington Lamar, Arlington Martin, Granbury and Weatherford. Older pages showing 5A Division I are historical and must not be published as Aledo's current 2026 division.",
      "Robby Jones is the current Aledo ISD-listed head football coach. The athletics department separately lists Brad McCone as assistant head coach/defensive coordinator, Joe Williams as offensive coordinator, Stephen Reves as co-defensive coordinator and Doug Wheeler as co-offensive coordinator. These are current official assignments, unlike historical tenures of dynasty architect Tim Buchanan and successor Steve Wood.",
      "Aledo's long run of district wins ended September 25, 2026 with a 35–21 home defeat against Arlington Martin. Contemporary local coverage counts 136 consecutive district wins before the loss, a remarkable streak that crossed earlier alignments but is no longer active. The Bearcats had extended it with a 69–0 victory at Granbury a week earlier. It would be inaccurate to keep describing the streak as unbroken or to infer the Arlington Martin game eliminated Aledo from postseason contention.",
      "In 2023 Robby Jones's 5A Division I Bearcats finished an undefeated championship season after a 16–0 final, as the UIL's pre-final state-team archive records the first 15 victories. Aledo's athletic successes span multiple coaching eras, so the 1998 championship, three straight 2009–11 trophies and later 2018–20 stretch should be credited to the correct periods rather than assumed to belong to the current roster or a single head coach.",
      "For visiting supporters, Aledo's Tim Buchanan Stadium sits at 1000 Bailey Ranch Road. Aledo ISD's official athletics page specifies clear-bag sizes and prohibited bags, and the official 2026 schedule identifies home and away venues including the October 9 Arlington Bowie matchup. The home ground should not be confused with away sites or a separate middle-school stadium. The available original stadium and athlete photos on school and sports publisher websites are not licensed for TexasDefined republishing; the original year-based championship chronology is a more truthful image-rights alternative."
    ],
    "milestones": [
      {
        "date": "1998",
        "title": "The first Bearcats state football championship",
        "body": "UIL championship history records Aledo's first state title in 1998, launching its modern all-time-title record.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time football championship appearances"
      },
      {
        "date": "2009–2011",
        "title": "Three successive state crowns",
        "body": "Aledo won the 2009, 2010 and 2011 state football titles in a three-season sequence, part of its documented 12-championship history.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL official all-time title years"
      },
      {
        "date": "2018–2020",
        "title": "Another three-year run",
        "body": "The UIL all-time ledger documents Aledo championships in 2018, 2019 and 2020. The 2020 trophy was described by the local board as the school's tenth state football title.",
        "sourceUrl": "https://aledoledger.com/answers/bearcats-state-titles/",
        "sourceLabel": "Aledo Ledger analysis citing school board commendations and UIL history"
      },
      {
        "date": "2022–2023",
        "title": "Titles eleven and twelve",
        "body": "Aledo claimed consecutive 2022 and 2023 UIL football crowns; the 2023 championship raised the total to twelve, as reported in December 2023 school-board minutes.",
        "sourceUrl": "https://www.uiltexas.org/football/all-time-appearances",
        "sourceLabel": "UIL all-time championship record"
      },
      {
        "date": "Feb. 2026",
        "title": "Aledo joins 6A football",
        "body": "The UIL's 2026–28 realignment puts Aledo in Class 6A District 3 for the first time, against six Arlington ISD schools, Granbury and Weatherford.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2026_RR-Packet.pdf",
        "sourceLabel": "Official UIL 6A realignment"
      },
      {
        "date": "Sept. 25, 2026",
        "title": "The district streak ends at 136",
        "body": "Arlington Martin beat Aledo 35–21 at Tim Buchanan Stadium, ending the Bearcats' 136-game district winning streak. This is a dated completed game, not an ongoing unbeaten district streak.",
        "sourceUrl": "https://sports.yahoo.com/articles/down-bearcats-arlington-martin-ends-024149692.html",
        "sourceLabel": "September 2026 report on Arlington Martin district win"
      },
      {
        "date": "2026",
        "title": "Robby Jones leads Aledo into a new division",
        "body": "Aledo ISD's live varsity staff page identifies Robby Jones as head coach, with Brad McCone and Joe Williams in coordinating roles, while the varsity schedule provides current game locations.",
        "sourceUrl": "https://www.aledoisdathletics.com/sport/football/boys/?tab=staff",
        "sourceLabel": "Official Aledo 2026 varsity football staff"
      }
    ],
    "faq": [
      {
        "question": "How many state football championships has Aledo won?",
        "answer": "Twelve UIL state football championships through the 2023 season: 1998, 2009, 2010, 2011, 2013, 2014, 2016, 2018, 2019, 2020, 2022 and 2023. Neither the 2024 nor 2025 season added another official football title."
      },
      {
        "question": "Is Aledo football in 5A or 6A for 2026?",
        "answer": "6A. The official UIL 2026–28 realignment places Aledo in Region I, District 3. Older 5A Division I state-title results describe previous seasons, not 2026 placement."
      },
      {
        "question": "Who is the 2026 Aledo Bearcats football coach?",
        "answer": "Aledo ISD Athletics identifies Robby Jones as current head coach. Its current staff directory names Brad McCone assistant head coach/defensive coordinator and Joe Williams offensive coordinator, among other assistants."
      },
      {
        "question": "Did Aledo's long district winning streak end?",
        "answer": "Yes. Arlington Martin beat Aledo 35–21 on September 25, 2026, ending 136 straight Aledo district football victories. It would be misleading to say that streak remains active after that date."
      },
      {
        "question": "Where is Aledo's home football stadium?",
        "answer": "Tim Buchanan Stadium is at 1000 Bailey Ranch Road, Aledo, TX 76008. The Aledo ISD athletics stadium page publishes current clear-bag restrictions and contact/venue resources."
      },
      {
        "question": "What bags can fans bring into Tim Buchanan Stadium?",
        "answer": "Aledo ISD requires transparent bags no larger than 12×6×12 inches, permits one-gallon clear freezer bags and certain small clutches, and provides exceptions for medically necessary items. Read the complete official stadium policy before traveling."
      },
      {
        "question": "Who are Aledo's district opponents in 2026–28?",
        "answer": "Arlington, Arlington Bowie, Arlington Sam Houston, Arlington Lamar, Arlington Martin, Granbury and Weatherford are the UIL 6A District 3 rivals for this current cycle. Dates/times are on Aledo ISD's live varsity schedule."
      }
    ]
  },
  "albany": {
    "slug": "albany",
    "theme": {
      "accentHex": "#B52C32",
      "label": "Original red-and-white editorial timeline cards from UIL's recorded Albany Lions school colors; not a team crest, official artwork or documentary photo"
    },
    "seo": {
      "title": "Albany Lions Football: Four State Titles, Denney Faith & Stadium",
      "description": "Albany Lions football: state titles in 1960, 1961, 2022 and 2023, coach Denney Faith, 2026 UIL District 7 and historic Robert Nail Memorial Stadium."
    },
    "coach": {
      "name": "Denney Faith",
      "title": "Current Albany Lions head football coach",
      "sourceUrl": "https://www.albanyisd.net/apps/pages/index.jsp?type=d&uREC_ID=582174",
      "sourceLabel": "Albany ISD 2026–27 official athletics and varsity schedule directory",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "501 East South First Street, Albany, TX 76430",
      "phone": "325-762-3974",
      "sourceUrl": "https://albanyisd.net/",
      "sourceLabel": "Albany ISD official Albany Junior/Senior High School campus",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Albany ISD 2026 football schedule and broadcast resources",
      "sourceUrl": "https://albanyisd.net/apps/pages/index.jsp?pREC_ID=1155137&type=d&uREC_ID=582174",
      "sourceLabel": "Albany ISD official football athletics page",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Robert Nail Memorial Stadium — Denney Faith Field",
      "address": "Historic gate near Central Street and North Walnut Street, Albany, Texas; confirm official game entrance and parking",
      "sourceUrl": "https://www.hmdb.org/m.asp?m=85275",
      "sourceLabel": "Texas historical marker at Albany's first public school and stadium gateway",
      "verifiedAt": "2026-10-09",
      "note": "Robert Nail Memorial Stadium incorporates the stone arches of Albany's historic first public school gateway near Central Street and North Walnut Street. Independent stadium guides call the playing surface Denney Faith Field and report historic stone terrace seating; third-party seat counts and accessibility descriptions may be outdated. The Albany Junior/Senior High campus's postal address (501 East South 1st) is not a verified spectator entrance. Confirm assigned game stadium, current ticketing, ADA seating, access path and parking with Albany ISD football at 325-762-3974."
    },
    "overview": [
      "Albany's Lions are one of the distinctive small-town programs in Texas football history, with four confirmed UIL state championships across two eras: Class 1A titles in 1960 and 1961, then Class 2A Division II victories in 2022 and 2023. The UIL championship ledger records the early finals and modern team archives document the consecutive Mart games. Those eras' classifications should not be confused with the 2026–28 2A Division II district.",
      "In 1960 Albany shut out Crosby 20–0 to win its first Class 1A title; a year later it defeated Hull-Daisetta 18–12 for another championship. These were more than 60 years before the Lions' next state crown. Official historical archives preserve the records, including older spellings of school names. This page reports the actual opponent and result without attributing the games to today's coaching staff.",
      "The third championship came in December 2022, when Albany upset perennial power Mart 41–21 in the 2A Division II final. Dave Campbell's account names Coy Lefevre, Wyatt Windham and Tye Edgar as key figures, with coach Denney Faith earning his first state football title. It was not an undefeated Albany season; the final record was 14–2 according to contemporary game reporting.",
      "Albany completed the back-to-back modern run with a 28–10 win over Mart in December 2023. The Lions finished 16–0, according to championship-day reporting, and the victory was built around a defense that generated three turnovers. The official UIL pre-final team listing shows a 15–0 entering-final record, so these numbers describe two different points of the same season rather than conflicting championships.",
      "Faith remains Albany's school-listed head coach in the 2026–27 Albany ISD athletics directory. That directory also links the varsity, JV and junior-high football schedules and an Albany ISD broadcast channel. The Lions are now in Class 2A Division II, District 7, competing against Cross Plains, Goldthwaite, Hamlin, Miles, Stamford and Winters. These are present-cycle district opponents, and historic games with rival towns require separate dated evidence.",
      "Albany's home-ground experience is unusual: Robert Nail Memorial Stadium, with its old stone school gateway embedded in the grounds, relates physically to the town's first public school built in 1884. A local historical marker documents the original arches and their relocation. Independent stadium descriptions call the playing surface Denney Faith Field. The venue's historic identity is worth studying, but publicly visible stadium photographs from commercial travel sites cannot be republished without a license, and families should contact the district for accessible gates, tickets and parking."
    ],
    "milestones": [
      {
        "date": "1960",
        "title": "The first Albany state football crown",
        "body": "Official UIL archives list Albany beating Crosby 20–0 in the 1960 Class 1A state championship final.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL historical football champions"
      },
      {
        "date": "1961",
        "title": "A second 1A title in succession",
        "body": "The UIL championship results name Albany 18, Hull-Daisetta 12, for the 1961 Class 1A football crown.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P576",
        "sourceLabel": "UIL 1961–62 football state archive"
      },
      {
        "date": "2022",
        "title": "Albany ends a 61-year wait",
        "body": "Denney Faith's Lions defeated Mart 41–21 for the 2022 2A Division II state championship, ending a title drought since 1961.",
        "sourceUrl": "https://www.texasfootball.com/article/2022/12/14/albany-mart-state",
        "sourceLabel": "Dave Campbell's 2022 championship recap"
      },
      {
        "date": "2023",
        "title": "The Lions repeat with an undefeated season",
        "body": "Albany beat Mart 28–10 in the 2A Division II final to finish 16–0, completing back-to-back state championship seasons.",
        "sourceUrl": "https://www.houstonchronicle.com/texas-sports-nation/hs-sports/football/article/uil-state-football-championships-recaps-18553887.php",
        "sourceLabel": "2023 championship report and official UIL state team archive"
      },
      {
        "date": "Historic grounds",
        "title": "An 1884 school gateway survives by the field",
        "body": "A historical marker at Robert Nail Memorial Stadium preserves archways from Albany's early public-school buildings, tying today's football entry to the town's educational history.",
        "sourceUrl": "https://www.hmdb.org/m.asp?m=85275",
        "sourceLabel": "Albany's first public school historical marker"
      },
      {
        "date": "2026–28",
        "title": "Denney Faith leads Albany in District 7",
        "body": "Albany ISD currently identifies Faith as football head coach; UIL places the Lions in 2A Division II, District 7 with Cross Plains, Goldthwaite, Hamlin, Miles, Stamford and Winters.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official UIL 2026–28 football district alignment"
      }
    ],
    "faq": [
      {
        "question": "How many Texas football state championships has Albany won?",
        "answer": "Four UIL football championships: 1960 over Crosby (20–0), 1961 over Hull-Daisetta (18–12), 2022 over Mart (41–21), and 2023 over Mart (28–10). The first pair were historical Class 1A and the modern pair were 2A Division II."
      },
      {
        "question": "Who coaches Albany football in 2026?",
        "answer": "Albany ISD's current athletics directory lists Denney Faith as head football coach and provides the varsity, junior varsity and junior-high schedules along with the football office phone, 325-762-3974."
      },
      {
        "question": "Did Albany finish the 2023 season unbeaten?",
        "answer": "Yes. Albany entered the December 2023 final at 15–0 according to UIL's state-team profile, then beat Mart 28–10 to finish 16–0. These figures reflect before and after the final, not a disagreement about which team won."
      },
      {
        "question": "Where do the Albany Lions play home games?",
        "answer": "Robert Nail Memorial Stadium in Albany, with the playing field called Denney Faith Field in independent stadium accounts. The historic stone arch entrance near Central and North Walnut marks part of the old first-school site; contact Albany ISD for the current entrance, accessible seating and parking."
      },
      {
        "question": "What is special about the stadium entrance?",
        "answer": "A local historical marker identifies surviving stone arches from Albany's first public-school buildings, some on their original site and some repositioned. This distinguishes the stadium from a generic newly constructed football facility."
      },
      {
        "question": "What UIL district does Albany play in for 2026–28?",
        "answer": "Class 2A Division II, District 7, alongside Cross Plains, Goldthwaite, Hamlin, Miles, Stamford and Winters. Those are current football district peers, not a blanket claim about historic rivalries."
      },
      {
        "question": "Where do I find current Albany Lions football scores and tickets?",
        "answer": "Albany ISD provides official varsity, JV and junior-high football schedules and broadcasts. The UIL scoreboard can provide coach-submitted results; confirm the assigned stadium, updated kickoff, ticket rules and accessibility directly with the district."
      }
    ]
  },
  "alba-golden": {
    "slug": "alba-golden",
    "theme": {
      "accentHex": "#BC2938",
      "label": "Original editorial red accent inspired by KLTV-documented red, blue and white Alba-Golden school colors; no school logo reproduced"
    },
    "seo": {
      "title": "Alba-Golden Panthers Football: 2026 Coach, District & Team History",
      "description": "Alba-Golden Panthers football in Wood County: 2026 coach Drew Webster, UIL District 10 opponents, recent seasons, campus stadium and official athletics links."
    },
    "coach": {
      "name": "Drew Webster",
      "title": "Head football coach and athletic director, per May 2026 East Texas news report",
      "sourceUrl": "https://www.kltv.com/2022/05/25/alba-golden-panthers/",
      "sourceLabel": "KLTV Alba-Golden 2026 program preview, updated May 27, 2026",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "1373 County Road 2377, Alba, TX 75410",
      "phone": "903-768-2472",
      "sourceUrl": "https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?County=Wood+County&ID=480765000053&Search=1&State=48",
      "sourceLabel": "NCES 2025–26 Alba-Golden secondary campus, Wood County",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Alba-Golden Panthers 2026 fixtures and posted results",
      "sourceUrl": "https://www.texasfootball.com/team/alba-golden-panthers",
      "sourceLabel": "Dave Campbell's Texas Football team 2026 schedule",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Alba-Golden Stadium",
      "address": "1373 County Road 2377, Alba, TX 75410",
      "sourceUrl": "https://www.kltv.com/2022/05/25/alba-golden-panthers/",
      "sourceLabel": "KLTV school stadium listing and 2026 program preview",
      "verifiedAt": "2026-10-09",
      "note": "KLTV publishes the stadium address as 1373 County Road 2377, the same as the verified Alba-Golden campus; Dave Campbell's lists Alba-Golden Stadium with estimated 400-seat capacity. Neither source confirms current 2026 stadium admission prices, parking arrangements, accessible gates or seating inventory. Check the individual game's site and contact Alba-Golden ISD at 903-768-2472 before travel; do not confuse a directory estimate with certified usable seating."
    },
    "overview": [
      "Alba-Golden's Panthers play eleven-man football for a public school district based along County Road 2377 in Wood County, East Texas. Its local school identity is red, blue and white, and the football program has genuine team photographs on the district athletics site, but those pictures have not been shown to carry a republication license. This independent guide uses the school's real colors only as editorial accents, not a copied paw-print emblem.",
      "The Panthers have a more recent football story than the state's long-established championship dynasties. Dave Campbell's Texas Football lists no UIL state football titles or title-game appearances for Alba-Golden, but reports eight playoff appearances across the program's tracked seasons. That makes verified postseason participation and growth more useful subjects than a made-up state championship narrative.",
      "An independently recorded 7–4 season in 2023 marked one of Alba-Golden's stronger recent campaigns; MaxPreps also records that season as a postseason year. In 2024 the sports archives disagree about the final season total (Dave Campbell's shows 5–4 while MaxPreps lists 5–5), so this profile does not publish a falsely definitive record for that year. Both sources identify a much more difficult 2025 season, with only one win reported and an unusually difficult league slate.",
      "KLTV's May 27, 2026 season preview names Drew Webster head coach and describes the club looking to rebound from 1–9 in 2025. MaxPreps separately identifies Webster as Alba-Golden's athletic director, but its varsity football staff roster contains only assistant Riley Stack, without a verified current head-coach field. The dated regional report is therefore the identified source for Webster's football coaching title; no unverified 2026 assistants or personal details are added.",
      "The 2026–28 UIL realignment places Alba-Golden in 2A Division I, District 10, alongside Cayuga, Como-Pickton, Frankston, Hawkins, Kerens and Price Carlisle. This is a different district grouping from the 2025 Panthers' league, so older games against Honey Grove, Rivercrest or Omaha Pewitt must not be presented as this cycle's district fixtures. The 2026 list includes games against Kerens, Frankston, Cayuga, Price Carlisle, Hawkins and Como-Pickton; check school announcements before traveling.",
      "Dave Campbell's archive showed an early-October 2026 1–4 snapshot with a 34–8 victory over Detroit and competitive defeats to Linden-Kildare and Cushing among the reported results. The third-party schedule still has some unreported scores for October 2 and later fixtures, so this dated sample is not a current/live standings assertion. Alba-Golden's stadium is listed at the school's 1373 CR 2377 address; venue entrance, parking, available seats and ADA accommodations require direct district confirmation."
    ],
    "milestones": [
      {
        "date": "2021",
        "title": "A six-win season in recent program history",
        "body": "The Texas Football season archive lists Alba-Golden at 6–5 in 2021, providing a recent postseason reference for the Panthers' smaller-school football story.",
        "sourceUrl": "https://www.texasfootball.com/team/alba-golden-panthers",
        "sourceLabel": "Dave Campbell's Panthers historical season records"
      },
      {
        "date": "2023",
        "title": "The Panthers reach seven wins",
        "body": "Both Dave Campbell's and MaxPreps record a 7–4 season in 2023, with a postseason appearance according to the MaxPreps season record.",
        "sourceUrl": "https://www.maxpreps.com/tx/alba/alba-golden-panthers/football/history/",
        "sourceLabel": "MaxPreps historical football seasons"
      },
      {
        "date": "2024",
        "title": "An archive discrepancy worth recording",
        "body": "Dave Campbell's season index counts five wins and four losses; MaxPreps lists five wins and five losses. The discrepancy remains explicitly unresolved rather than creating a false agreed record.",
        "sourceUrl": "https://www.texasfootball.com/team/alba-golden-panthers",
        "sourceLabel": "Dave Campbell's football history (compare MaxPreps 2024 season)"
      },
      {
        "date": "2025",
        "title": "A one-win rebuilding year",
        "body": "KLTV's 2026 preseason preview describes Alba-Golden finishing 1–9 in 2025 under Drew Webster; the school returned to practice focused on a rebound.",
        "sourceUrl": "https://www.kltv.com/2022/05/25/alba-golden-panthers/",
        "sourceLabel": "KLTV regional 2026 Alba-Golden season preview"
      },
      {
        "date": "2026",
        "title": "Drew Webster and the next campaign",
        "body": "The updated May 2026 KLTV report names Drew Webster head football coach and confirms school colors red, blue and white, distinct from the MaxPreps page's assistant-only coach list.",
        "sourceUrl": "https://www.kltv.com/2022/05/25/alba-golden-panthers/",
        "sourceLabel": "KLTV high school football preview"
      },
      {
        "date": "2026–28",
        "title": "A new 2A Division I District 10",
        "body": "UIL assigned Alba-Golden to District 10 against Cayuga, Como-Pickton, Frankston, Hawkins, Kerens and Price Carlisle; these are the current competitive peers, not necessarily historic rivals.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL official 2026–28 2A Division I realignment"
      }
    ],
    "faq": [
      {
        "question": "Who coaches Alba-Golden football in 2026?",
        "answer": "KLTV's May 2026 football preview identifies Drew Webster as Alba-Golden's head coach. MaxPreps identifies him as athletic director but lists an assistant, Riley Stack, on the separate football staff page. Check the school's athletics department for any staff changes after the May preview."
      },
      {
        "question": "What are Alba-Golden's school mascot and colors?",
        "answer": "The team is the Panthers, and a May 2026 KLTV preview lists red, blue and white as the school colors. Original editorial highlights use this palette but do not reproduce the school's official paw logo."
      },
      {
        "question": "Does Alba-Golden have a football state championship?",
        "answer": "Dave Campbell's Texas Football reports no UIL state titles or championship-game appearances for this program but tracks eight playoff appearances. A successful playoff season is not the same as a state-final appearance."
      },
      {
        "question": "What district does Alba-Golden compete in?",
        "answer": "UIL 2A Division I, District 10 for 2026–28. Opponents are Cayuga, Como-Pickton, Frankston, Hawkins, Kerens and Price Carlisle; older league lists should not be treated as this year's grouping."
      },
      {
        "question": "Where is Alba-Golden Stadium?",
        "answer": "KLTV lists Alba-Golden's stadium at 1373 County Road 2377 in Alba, Texas, the school's Wood County campus location. Dave Campbell's estimates 400 seats but stadium gate, accessible seating, tickets and parking must be reconfirmed with Alba-Golden ISD."
      },
      {
        "question": "How did Alba-Golden perform in 2025?",
        "answer": "KLTV's 2026 preseason preview reports a 1–9 campaign in 2025. Different third-party sports archives disagree on the preceding 2024 full record; that discrepancy is explicitly flagged instead of being silently resolved."
      },
      {
        "question": "Can I use a schedule page as proof of a current kickoff?",
        "answer": "No. Dave Campbell's and MaxPreps are useful dated schedule sources, but a missing result or listed opponent does not guarantee the time, venue, gate or ticket price. Confirm with Alba-Golden ISD athletics before making travel plans."
      }
    ]
  },
  "agua-dulce": {
    "slug": "agua-dulce",
    "theme": {
      "accentHex": "#83384D",
      "label": "Original editorial maroon accents drawn from commonly published Longhorn school identity; the school has not supplied a current official color code or licensed crest"
    },
    "seo": {
      "title": "Agua Dulce Longhorns Football: 2026 District, Coach & Stadium",
      "description": "Agua Dulce Longhorns football: Jason Calvez, 2026 UIL 2A Division II District 16, recent playoff seasons, official school contacts and football-field improvements."
    },
    "coach": {
      "name": "Jason Calvez",
      "title": "School athletic director and reported head football coach in 2026 preseason interview",
      "sourceUrl": "https://www.kiiitv.com/video/sports/high-school/friday-night-sports-blitz/agua-dulce-full-interview-with-hc-jason-calvez/503-bbadabc4-73fd-47c0-b117-631696795951",
      "sourceLabel": "KIII 3NEWS 2026 on-camera head coach interview; official Agua Dulce ISD directory verifies athletic director role",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "One Longhorn Drive, Agua Dulce, TX 78330",
      "phone": "361-998-2542",
      "sourceUrl": "https://www.adisd.net/directory",
      "sourceLabel": "Official Agua Dulce ISD directory and campus contact",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Agua Dulce Longhorns 2026 results and game schedule",
      "sourceUrl": "https://www.maxpreps.com/tx/agua-dulce/agua-dulce-longhorns/football/schedule/",
      "sourceLabel": "UIL-partner MaxPreps team schedule — verify current changes directly with school",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Agua Dulce ISD football field",
      "address": "One Longhorn Drive, Agua Dulce, TX 78330; specific game entry and parking rules unverified",
      "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026016320",
      "sourceLabel": "Texas Department of Licensing and Regulation football-field bleacher project",
      "verifiedAt": "2026-10-09",
      "note": "Texas state architectural-barriers project TABS2026016320 names the Agua Dulce ISD football field at One Longhorn Drive. It registered an estimated $500,000 project to replace existing bleachers with a projected Aug. 31, 2026 completion; registration does not confirm actual completion or ADA certification. Separate state project TABS2026018319 covers west-campus sidewalks and new concession/restroom structures, with a projected Dec. 1, 2026 completion. The school must confirm actual stadium access, completed works, ticketing, parking, accessible seating and the assigned field for the specific game. Contact district athletics at 361-998-2542 ext. 5."
    },
    "development": {
      "title": "Two separate 2026 football-area facility projects",
      "body": "Texas licensing records distinguish an athletic-field bleacher replacement (registered March 31, planned May–August 2026, estimated $500,000) from broader west-campus athletic work (registered April 22, planned June–December 2026, estimated $1 million). Both records describe intended work and estimated schedules, not independently certified as-built completion or public ADA access. Contact Agua Dulce ISD before arriving at a game for current bleacher/sidewalk/restroom readiness.",
      "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026018319",
      "sourceLabel": "Texas TDLR west-campus athletics construction record",
      "verifiedAt": "2026-10-09"
    },
    "overview": [
      "Agua Dulce's Longhorns play eleven-man Texas high school football at a rural public school rooted in Nueces County southwest of Corpus Christi. The Longhorns have their own district, campus and traditions and should never be confused with the University of Texas Longhorns. Agua Dulce ISD lists the secondary athletics department on its One Longhorn Drive campus and publishes direct contact details for athletic director Jason Calvez.",
      "KIII 3NEWS interviewed Jason Calvez as the Longhorns' head football coach entering the 2026 season. Agua Dulce ISD independently lists him as athletic director, and MaxPreps historical rosters place him in the football head-coach role for multiple recent seasons. These sources corroborate current program leadership without assuming a given season's student roster is unchanged.",
      "The 2026–28 UIL realignment assigns Agua Dulce to Class 2A Division II, District 16 with Ben Bolt-Palito Blanco, La Villa, Riviera Kaufer, Santa Maria and Woodsboro. For visiting fans, the posted school schedule includes travel to Woodsboro and Ben Bolt and home dates against La Villa, Riviera Kaufer and Santa Maria. These are this cycle's opponents, not claims about a century of historic rivalries or a live scoreboard.",
      "Recent varsity archives show the Longhorns returned to a consistent postseason conversation: MaxPreps records 7–3 in 2024 and 7–4 in 2025, including a 2025 playoff appearance that ended against Yorktown. Those are historical results from a third-party team-maintained database, not official UIL state championship records. The UIL all-time state-finals table does not list Agua Dulce as a champion or title-game finalist.",
      "The program also appears in older UIL historical postseason archives, including the late 1980s and mid-1990s when the Longhorns met opponents such as Flatonia, Runge and Menard. The 1996 archive reports a narrow Menard 14–13 result over Agua Dulce; it is a dated historical playoff result, not a 2026 district fixture. These state records provide a useful history trail without inventing program founding years or an unverified district-title total.",
      "An important game-day change is unfolding on school grounds. Two March–April 2026 TDLR registrations cover replacement football bleachers and additional west-campus athletic construction, including sidewalks and football-field concession/restroom facilities. The filings projected different completion dates, but registration by itself does NOT mean seating and accessible routes are open and usable on October 9. One Longhorn Drive is the site named in state filings; families should call school athletics for gate, parking and access status rather than assume the works are complete."
    ],
    "milestones": [
      {
        "date": "1988–1996",
        "title": "Recorded South Texas playoff matchups",
        "body": "UIL postseason archives list Agua Dulce in 1988 and in the mid-1990s, including games against Flatonia, Runge and Menard. These are specific postseason records, not undocumented state-final appearances.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/playoff_text/96at_bfb.html",
        "sourceLabel": "UIL 1996–97 official historical bracket results"
      },
      {
        "date": "2024",
        "title": "Seven-win Longhorns season",
        "body": "MaxPreps' historical team table records Agua Dulce finishing 7–3 under Jason Calvez, evidence of a recent competitive season rather than a state title.",
        "sourceUrl": "https://www.maxpreps.com/tx/agua-dulce/agua-dulce-longhorns/football/history/",
        "sourceLabel": "MaxPreps 2024 Agua Dulce season archive"
      },
      {
        "date": "2025",
        "title": "Another playoff campaign",
        "body": "Agua Dulce's 2025 history records a 7–4 season with a postseason meeting against Yorktown, shown in the varsity highlights. These are historical, not 2026 results.",
        "sourceUrl": "https://www.maxpreps.com/tx/agua-dulce/agua-dulce-longhorns/football/media/videos/",
        "sourceLabel": "MaxPreps 2025 Longhorn playoff highlight archive"
      },
      {
        "date": "March 2026",
        "title": "Football bleacher replacement registered",
        "body": "Texas TDLR registered a public $500,000 bleacher replacement at Agua Dulce ISD's football field at One Longhorn Drive. Projected completion date was August 31; no as-built completion is guaranteed by this record.",
        "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026016320",
        "sourceLabel": "Official TDLR project TABS2026016320"
      },
      {
        "date": "April 2026",
        "title": "Broader west-campus improvements registered",
        "body": "A separate estimated $1 million project listed new sidewalks, concession and restroom facilities serving the football field and broader athletic grounds, with estimated December 1 completion.",
        "sourceUrl": "https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026018319",
        "sourceLabel": "Official TDLR project TABS2026018319"
      },
      {
        "date": "2026–28",
        "title": "UIL 2A Division II District 16",
        "body": "The official alignment places Agua Dulce with Ben Bolt-Palito Blanco, La Villa, Riviera Kaufer, Santa Maria and Woodsboro for the 2026–28 cycle, independent of prior seasons' classification.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "UIL official 2026–28 2A Division II alignment"
      }
    ],
    "faq": [
      {
        "question": "Who is Agua Dulce's football head coach in 2026?",
        "answer": "KIII 3NEWS interviewed Jason Calvez as the 2026 Longhorns head football coach. Agua Dulce ISD's official staff directory separately lists him as athletic director and provides the athletics-office extension. Confirm later staff changes with the district."
      },
      {
        "question": "What district do the Agua Dulce Longhorns play in?",
        "answer": "Class 2A Division II, District 16 for the UIL 2026–28 realignment, with Ben Bolt-Palito Blanco, La Villa, Riviera Kaufer, Santa Maria and Woodsboro."
      },
      {
        "question": "Where is Agua Dulce's football field?",
        "answer": "A Texas TDLR construction record identifies Agua Dulce ISD's football field at One Longhorn Drive, Agua Dulce, TX 78330. Actual ticket booth, accessible gate and parking arrangements are not supplied by that record; call the school at 361-998-2542 ext. 5."
      },
      {
        "question": "Were the stadium bleachers replaced in 2026?",
        "answer": "Texas state records show a registered football-field bleacher replacement with estimated completion August 31, 2026, and a separate west-campus athletics project estimated for December 1. Registration and forecast dates do not establish actual completion; verify access with Agua Dulce ISD before attending."
      },
      {
        "question": "Has Agua Dulce won a UIL state football championship?",
        "answer": "The official UIL football all-time state-final appearances table does not list Agua Dulce among state champions or championship-game finalists. The Longhorns do have documented postseason appearances in older UIL brackets and in recent team archives."
      },
      {
        "question": "Does Agua Dulce High School serve Nueces County?",
        "answer": "Yes. The district's One Longhorn Drive campus is in Nueces County according to the NCES federal directory and TDLR's athletics-field filing. The wider Agua Dulce district also serves communities beyond the immediate town; do not assume the campus is in Jim Wells County."
      },
      {
        "question": "Where can visiting supporters confirm 2026 kickoff, tickets and stadium access?",
        "answer": "Use Agua Dulce's athletics office and updated school/team schedule. The district is carrying out registered football-area work, so current entry routes, bleacher access, restrooms and parking must be confirmed, not inferred from planning filings."
      }
    ]
  },
  "ackerly-sands": {
    "slug": "ackerly-sands",
    "theme": {
      "accentHex": "#71513D",
      "label": "Original brown-and-white editorial highlights sourced to Sands CISD's own alma mater; no official seal, logo or documentary football image is reproduced"
    },
    "seo": {
      "title": "Ackerly Sands Mustangs Football: Coach, 2026 UIL District & History",
      "description": "Sands Mustangs six-man football: 2026 coach Billy Grumbles, return to 1A Division I, 2025 playoff near miss, school traditions, current scores and Mustang Field."
    },
    "coach": {
      "name": "Billy Grumbles",
      "title": "Head football coach — appointed June 2026",
      "sourceUrl": "https://www.pressreporter.com/issues/2026-06-16/pages/6/",
      "sourceLabel": "Lamesa Press-Reporter June 16 2026 Sands coaching transition",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "Sands CISD, 201 First Street, Ackerly, TX 79713 (NCES physical district address; district site publishes 501 1st Street)",
      "phone": "432-217-2637",
      "sourceUrl": "https://sands.esc17.net/page/contact",
      "sourceLabel": "Sands CISD official contact — 501 1st St listed; NCES 201 First St differs",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Sands Mustangs 2026 six-man scores and upcoming district fixtures",
      "sourceUrl": "https://www.texasfootball.com/team/sands-mustangs",
      "sourceLabel": "Dave Campbell's Texas Football 2026 schedule and results (dated, third-party)",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Mustang Field (name reported by Texas football reference)",
      "address": "Ackerly, Dawson County, Texas — confirm actual stadium gate directly with Sands CISD",
      "sourceUrl": "https://www.texasfootball.com/team/sands-mustangs",
      "sourceLabel": "Dave Campbell's Texas Football — Sands Mustang Field venue reference",
      "verifiedAt": "2026-10-09",
      "note": "Dave Campbell's identifies Mustang Field and an estimated 150-seat capacity; no dated district stadium entrance address, ADA seating, parking or ticketing policy was independently found. Sands CISD's website says 501 1st Street while the federal NCES district directory reports 201 First Street, so do not assume either postal address is the stadium gate. Call Sands CISD at 432-217-2637 and confirm the actual 2026 scheduled field, kickoff, seating and admission before travel."
    },
    "overview": [
      "The Sands Mustangs are a six-man football program serving tiny Ackerly in Dawson County. Sands Consolidated ISD publishes a distinctive school alma mater honoring its brown and white colors; its football culture also features a school-published Sands fight song and Mustangs team identity. Those details are genuine school sources, not an invented mascot or generic small-town football story.",
      "For the 2026–28 UIL football realignment, Ackerly Sands moved into Class 1A Division I, District 5, with Borden County, Ira, Lamesa Klondike, O'Donnell and Westbrook. UIL's enrollment list reports 58 students for football realignment, which is different from the K–12 Sands CISD total published by NCES. In contrast, the Mustangs played in 1A Division II in 2024 and 2025; older schedule and postseason labels should not be silently reused as their current classification.",
      "The coaching staff underwent an unusually important 2026 transition. A June 16 local newspaper report states former head coach Jacob Massey resigned, Billy Grumbles was promoted from offensive coordinator to head coach, and longtime Sands coach and current district superintendent Wayne Henderson returned to the sidelines as defensive coordinator. Some sports-site season histories still identify Massey as '2026 head coach'; that entry predates the documented district coaching change and is not used as the current official appointment.",
      "Grumbles' move into football leadership also connects Sands basketball history to its gridiron program. The Lamesa Press-Reporter reports more than 400 boys basketball wins before he stepped away after 2024–25 and describes years of football work under Steve Keith and Jacob Massey. Henderson previously coached Sands football before becoming superintendent. This is a specific multi-generation local coaching story, not a claim that either coach won an unverified football state championship.",
      "The Mustangs entered this season after consecutive playoff trips. Dave Campbell's program archive reports 8–4 in 2024 and 7–4 in 2025, with zero UIL football state titles or state-championship-game appearances. A 2025 Division II playoff run included an 82–48 win against Whitharral and a narrow 58–57 loss to Miami, confirmed by contemporary reporting. The one-point exit is a meaningful program milestone, not a state-final loss.",
      "As of the October 9, 2026 research snapshot, Dave Campbell's Texas Football lists Sands 4–1 before its scheduled district opener at Ira, following a 124–74 opening win over Valley, a 58–0 win over Kress, a 47–89 loss to Water Valley and wins against Garden City and Whitharral. These results are third-party dated scores subject to later correction; use the current score page and Sands CISD contact for today's exact kickoff or ticketing instead of relying on a static 2026 snapshot. The school contact page and NCES directory conflict on whether the physical address is 501 or 201 First Street, so visitor directions must be independently confirmed."
    ],
    "milestones": [
      {
        "date": "1997–2002",
        "title": "A notable six-man playoff era",
        "body": "The independent SixManFootball statistical database reports six consecutive Sands playoff appearances from 1997 through 2002, including an eleven-game streak in 1997. This is a third-party archival summary, not a state-championship claim.",
        "sourceUrl": "https://sixmanfootball.com/teams/sands-mustangs.1546/",
        "sourceLabel": "SixManFootball Sands Mustangs historical statistics"
      },
      {
        "date": "2024",
        "title": "A return to the postseason",
        "body": "Dave Campbell's Sands archive lists an 8–4 season and a football playoff appearance in 2024 while the Mustangs competed in the lower six-man division.",
        "sourceUrl": "https://www.texasfootball.com/team/sands-mustangs",
        "sourceLabel": "Dave Campbell's Sands past seasons"
      },
      {
        "date": "2025",
        "title": "An area playoff heartbreak",
        "body": "Sands defeated Whitharral 82–48 and then fell to Miami 58–57 in the 2025 Division II playoffs; the local June 2026 report also recalls the one-point area-round finish.",
        "sourceUrl": "https://www.pressreporter.com/issues/2026-06-16/pages/6/",
        "sourceLabel": "Lamesa Press-Reporter retrospective on the 2025 Sands season"
      },
      {
        "date": "June 2026",
        "title": "Grumbles promoted; Henderson returns",
        "body": "The June 16 local report records Billy Grumbles taking the head football role after Jacob Massey's departure, with superintendent and former head coach Wayne Henderson becoming defensive coordinator.",
        "sourceUrl": "https://www.pressreporter.com/issues/2026-06-16/pages/6/",
        "sourceLabel": "Lamesa Press-Reporter June 2026 coaching change"
      },
      {
        "date": "2026–28",
        "title": "The Mustang move to Division I",
        "body": "UIL placed Ackerly Sands in 1A Six-Man Division I, District 5, with Borden County, Ira, Lamesa Klondike, O'Donnell and Westbrook, and published 58 as realignment enrollment.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf",
        "sourceLabel": "Official UIL 2026–28 six-man Division I realignment"
      },
      {
        "date": "Aug.–Sept. 2026",
        "title": "A high-scoring start under new leadership",
        "body": "The Texas Football score archive shows a 124–74 win over Valley and a 4–1 pre-district record through September 25. Date-specific, third-party game data; not a live future win-loss guarantee.",
        "sourceUrl": "https://www.texasfootball.com/team/sands-mustangs",
        "sourceLabel": "Dave Campbell's dated 2026 varsity results"
      }
    ],
    "faq": [
      {
        "question": "Who is the Sands Mustangs head football coach in 2026?",
        "answer": "A June 16, 2026 local report says Billy Grumbles succeeded Jacob Massey as head coach, and superintendent/former coach Wayne Henderson returned as defensive coordinator. MaxPreps still carries Massey for the 2026 season, so the documented coaching transition takes precedence; contact Sands CISD for any later change."
      },
      {
        "question": "Does Ackerly Sands play six-man football, and which UIL district?",
        "answer": "Yes. Ackerly Sands is in UIL 1A Six-Man Division I, District 5 for the 2026–28 realignment, alongside Borden County, Ira, Lamesa Klondike, O'Donnell and Westbrook. It previously played in Division II."
      },
      {
        "question": "Has Sands won a football state championship?",
        "answer": "The football championship archives and Dave Campbell's program reference do not record a Sands football state title or state title-game appearance. The Mustangs have reached the playoffs repeatedly; the 2025 Division II area loss to Miami was by one point."
      },
      {
        "question": "What are Sands CISD's school colors?",
        "answer": "Brown and white. The Sands CISD official alma mater explicitly says 'Honor your brown and white,' and refers to the Mustangs. The page uses original brown-and-white editorial accents rather than an unauthorised team logo."
      },
      {
        "question": "Where is the Sands Mustangs football field?",
        "answer": "Dave Campbell's Texas Football calls the venue Mustang Field in Ackerly and estimates 150 seats, but a precise current stadium gate, ticketing and accessibility map are not verified. School sources disagree on 201 versus 501 First Street, so call Sands CISD at 432-217-2637 before driving."
      },
      {
        "question": "What changed for Sands football after the 2025 season?",
        "answer": "The 2025 Mustangs lost 58–57 to Miami in the Division II area playoffs. In June 2026 Billy Grumbles was named head coach and Wayne Henderson returned as defensive coordinator; UIL also placed Sands back in six-man Division I for the new cycle."
      },
      {
        "question": "Where can I see the current Sands football schedule?",
        "answer": "Use Dave Campbell's current Sands page or the UIL partner schedule and confirm kickoff details with Sands CISD. A 4–1 result on October 9 reflects a dated source snapshot, not continuously updated scores or an official game cancellation notice."
      }
    ]
  },
  "abilene-wylie": {
    "slug": "abilene-wylie",
    "theme": {
      "accentHex": "#5D358A",
      "label": "Original purple-and-gold research accents reflecting the UIL-documented Bulldog colors; not an official crest or historical photo"
    },
    "seo": {
      "title": "Abilene Wylie Bulldogs Football: 2004 Title, Coach & Stadium",
      "description": "Abilene Wylie Bulldogs football history: 2004 state title over Cuero, four UIL finals, coach Clay Martin, Hugh Sandifer Stadium and 2026 district schedule."
    },
    "coach": {
      "name": "Clay Martin",
      "title": "Wylie High School head football coach",
      "sourceUrl": "https://www.wyliebulldogathletics.com/sport/football/boys/?tab=staff",
      "sourceLabel": "Wylie High official 2026–27 football coaching staff",
      "verifiedAt": "2026-10-09"
    },
    "campus": {
      "address": "4502 Antilley Road, Abilene, TX 79606",
      "phone": "325-255-1908",
      "sourceUrl": "https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=484650005293",
      "sourceLabel": "NCES 2025–26 Abilene Wylie High campus, Taylor County",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Wylie Bulldogs athletics — current 2026 football schedule",
      "sourceUrl": "https://www.wyliebulldogathletics.com/sport/football/boys/?tab=schedule",
      "sourceLabel": "Official Wylie High School varsity football schedule",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "Hugh Sandifer Stadium",
      "address": "4502 Antilley Road, Abilene, TX 79606",
      "sourceUrl": "https://www.wyliebulldogathletics.com/facilities",
      "sourceLabel": "Official Wylie Bulldogs Athletics stadium and directions",
      "verifiedAt": "2026-10-09",
      "note": "Wylie High School's official facilities directory places Hugh Sandifer Stadium at 4502 Antilley Road and identifies it as the home field for Bulldog football and soccer. The Dog House is a distinct indoor training facility at the same address, not the public stadium seating or ticket entrance. Ticket prices, parking, ADA gates and particular game assignments should be checked through the current school schedule or Wylie athletics office, 325-690-1181. Abilene Wylie's Sandifer Stadium must not be confused with Abilene ISD's Shotwell Stadium."
    },
    "overview": [
      "The Abilene Wylie Bulldogs have one UIL football state championship and three further championship-game appearances, all documented in UIL's all-time finals ledger. The title came in 2004, when Wylie defeated Cuero 17–14 in Class 3A Division I. The state-final seasons of 2000, 2009 and 2016 were runner-up finishes, not additional championships. These historic classifications differ from the school's current 2026–28 5A Division II placement.",
      "Hugh Sandifer coached the Bulldogs for more than three decades, from 1985 until retirement at the close of the 2019–20 academic year. Wylie school journalism reports his teams made 24 consecutive playoff appearances from 1994 through 2017, compiled an overall 285–127–4 record and reached four championship games. His 2004 team featured future college and NFL quarterback Case Keenum, who engineered a fourth-quarter rally against Cuero. Those details describe Sandifer's era, not the present coaching staff.",
      "The 2000 championship run ended in a 14–10 loss to Gatesville. Sandifer's Bulldogs returned in 2004 to beat Cuero by a field goal, lost the 2009 final to Gilmer 43–26 and reached the 2016 4A Division I final before losing 31–17 to Carthage. This timeline, supported by UIL championship archives, gives the school's complete title-game record without conflating different divisions or calling four appearances four state titles.",
      "Wylie's 2016 state-finals roster from UIL lists coach Hugh Sandifer, assistant Clay Martin and school colors purple and gold. Martin appears as head football coach in the **current 2026–27 official Wylie athletics staff directory**, with Jason Meng coordinating offense and Matt Kates coordinating defense. The two sources establish a coaching lineage while keeping historical staff titles separate from today's assignments.",
      "A dated August 27, 2026 Wylie athletics season preview explains that the 2025 Bulldogs missed the playoffs after finishing 3–3 in district play. It documents close defeats to Palo Duro and Lubbock Cooper and a win over crosstown Abilene Cooper, but these are **2025 results**, not the 2026 season record. Wylie's current official schedule lists 2026 games and should be rechecked close to kickoff for changes, venue and ticket announcements.",
      "Abilene Wylie High School belongs to its own **Wylie ISD in Abilene**, whose campus is at 4502 Antilley Road, Taylor County—not the separate Wylie ISD northeast of Dallas and not Abilene ISD's Abilene High or Cooper High. The Bulldogs compete in UIL 5A Division II District 2 in 2026–28, a league that includes Abilene Cooper, Amarillo Palo Duro, Lubbock Cooper, Lubbock Coronado and Wichita Falls Legacy and Memorial. Nearby Cooper is an actual recent district opponent, while the state-final history stretches far beyond today's division."
    ],
    "milestones": [
      {
        "date": "1985",
        "title": "Hugh Sandifer takes charge",
        "body": "Wylie school journalism records Hugh Sandifer beginning his long football coaching tenure in 1985. He later led 24 straight playoff appearances beginning in 1994.",
        "sourceUrl": "https://wyliegrowl.com/sandifers-retire/",
        "sourceLabel": "Wylie school newspaper — Sandifer retirement history"
      },
      {
        "date": "2000",
        "title": "First state-final appearance of this era",
        "body": "UIL's historic final lists Gatesville beating Abilene Wylie 14–10, a runner-up result rather than a title.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL football champions and runners-up"
      },
      {
        "date": "2004",
        "title": "Bulldogs win the Class 3A Division I title",
        "body": "Wylie defeated Cuero 17–14 for its only UIL football state championship. Wylie school journalism identifies Case Keenum as quarterback in the fourth-quarter comeback.",
        "sourceUrl": "https://www.uiltexas.org/football/archives/P232",
        "sourceLabel": "Official UIL 2004–05 championship result"
      },
      {
        "date": "2009",
        "title": "Another state-final run",
        "body": "Abilene Wylie returned to the UIL 3A Division I final, losing to Gilmer 43–26; the date and score belong to the 2009 championship, not a 2026 fixture.",
        "sourceUrl": "https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html",
        "sourceLabel": "UIL historical final results"
      },
      {
        "date": "2016",
        "title": "Fourth state-final appearance",
        "body": "Coach Hugh Sandifer's 12–1 Wylie team reached the 4A Division I title game and lost to Carthage 31–17. UIL identifies assistant Clay Martin on that 2016 team.",
        "sourceUrl": "https://www.uiltexas.org/football/state-team/abilene-wylie-2016-2017-football",
        "sourceLabel": "UIL 2016–17 official Abilene Wylie team record"
      },
      {
        "date": "2026",
        "title": "Clay Martin's Bulldogs in 5A Division II",
        "body": "The current Wylie athletics directory lists Clay Martin as head coach and the UIL places Abilene Wylie in 5A Division II, District 2 for the 2026–28 cycle.",
        "sourceUrl": "https://www.wyliebulldogathletics.com/sport/football/boys/?tab=staff",
        "sourceLabel": "Official Wylie athletics 2026–27 football staff"
      }
    ],
    "faq": [
      {
        "question": "How many state football championships has Abilene Wylie won?",
        "answer": "One: 2004, when the Bulldogs beat Cuero 17–14 in the UIL Class 3A Division I final. Wylie was a runner-up in 2000, 2009 and 2016, giving the Bulldogs four state-final appearances."
      },
      {
        "question": "Was Case Keenum on Abilene Wylie's state championship team?",
        "answer": "Yes. Wylie school journalism's history of coach Hugh Sandifer names future quarterback Case Keenum as the 2004 state-title quarterback who led a fourth-quarter rally over Cuero. The UIL officially records Wylie's 17–14 victory."
      },
      {
        "question": "Who is the 2026 Abilene Wylie head coach?",
        "answer": "Wylie Bulldog Athletics names Clay Martin as head football coach, Jason Meng as offensive coordinator and Matt Kates as defensive coordinator. UIL's 2016 archive also lists Martin as an assistant on that earlier team."
      },
      {
        "question": "Where is Hugh Sandifer Stadium?",
        "answer": "Wylie High School Athletics lists Hugh Sandifer Stadium at 4502 Antilley Road, Abilene, TX 79606. It is distinct from Abilene ISD's Shotwell Stadium. Check the official schedule for your game's assignment and parking/ticket rules."
      },
      {
        "question": "Is Abilene Wylie the same school as the Wylie Pirates near Dallas?",
        "answer": "No. Abilene Wylie is the Bulldogs program in Wylie ISD based in Abilene and Taylor County. The other Wylie ISD northeast of Dallas has different campuses and athletic teams."
      },
      {
        "question": "What district is Abilene Wylie in for 2026–28?",
        "answer": "UIL Class 5A Division II, District 2. Current-cycle district opponents include Abilene Cooper, Amarillo Palo Duro, Lubbock Cooper, Lubbock Coronado, Wichita Falls Legacy and Wichita Falls Memorial."
      },
      {
        "question": "How do I find Wylie football tickets and current kickoff times?",
        "answer": "Check the official Wylie Bulldogs Athletics 2026 varsity schedule and contact the athletic department at 325-690-1181 for current admissions, venue assignment, parking and accessible entrances. Do not rely on older ticket or game-date notices."
      }
    ]
  },
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
  "shamrock": {
    "slug": "shamrock",
    "theme": {
      "accentHex": "#1F6B45",
      "label": "Green editorial accent inspired by Shamrock's Fighting Irish identity; not official team artwork"
    },
    "seo": {
      "title": "Shamrock Fighting Irish Football: 2026 Schedule, Coach & UIL District",
      "description": "Shamrock Fighting Irish football: Nate Skelton, 2026 results and schedule, 2A Division II District 5 opponents, UIL enrollment context and El Paso Field."
    },
    "coach": {
      "name": "Nate Skelton",
      "title": "Athletic director and head football coach",
      "sourceUrl": "https://www.shamrockisd.net/47588_2",
      "sourceLabel": "Shamrock ISD — Athletic Director",
      "verifiedAt": "2026-10-09"
    },
    "schedule": {
      "label": "Shamrock ISD 2026 football schedule",
      "sourceUrl": "https://www.shamrockisd.net/34143_3",
      "sourceLabel": "Shamrock ISD official athletic schedules",
      "verifiedAt": "2026-10-09"
    },
    "season": {
      "record": "1–4",
      "verifiedAt": "2026-10-09",
      "sourceUrl": "https://www.texasfootball.com/team/shamrock-irish",
      "sourceLabel": "Dave Campbell's Texas Football — Shamrock 2026 schedule snapshot",
      "games": [
        { "date": "Aug. 27", "opponent": "Winters", "site": "Home", "result": "W 15–8" },
        { "date": "Sept. 4", "opponent": "Stinnett West Texas", "site": "Home", "result": "L 13–61" },
        { "date": "Sept. 11", "opponent": "Vega", "site": "Away", "result": "L 20–52" },
        { "date": "Sept. 18", "opponent": "Seymour", "site": "Home", "result": "L 8–52" },
        { "date": "Sept. 25", "opponent": "Olton", "site": "Away", "result": "L 0–64" },
        { "date": "Oct. 9", "opponent": "Wellington", "site": "Away", "district": true },
        { "date": "Oct. 16", "opponent": "Clarendon", "site": "Away", "district": true },
        { "date": "Oct. 23", "opponent": "Quanah", "site": "Home", "district": true },
        { "date": "Nov. 6", "opponent": "Wheeler", "site": "Home", "district": true }
      ]
    },
    "campus": {
      "address": "100 S Illinois Street, Shamrock, TX 79079",
      "phone": "806-256-3492",
      "sourceUrl": "https://www.shamrockisd.net/",
      "sourceLabel": "Shamrock ISD official site",
      "verifiedAt": "2026-10-09"
    },
    "venue": {
      "name": "El Paso Field",
      "address": "Shamrock, Texas — confirm the current entrance and parking instructions with Shamrock ISD",
      "sourceUrl": "https://www.texasfootball.com/team/shamrock-irish",
      "sourceLabel": "Dave Campbell's Texas Football — Shamrock program history",
      "verifiedAt": "2026-10-09",
      "note": "Dave Campbell's Texas Football identifies El Paso Field as Shamrock's stadium and reports a capacity of 2,500. The source reviewed does not provide a verified gate address, parking map or accessibility instructions, so TexasDefined does not infer those details. Confirm the assigned venue and arrival information with Shamrock ISD before traveling."
    },
    "overview": [
      "Shamrock's team identity is the Fighting Irish. Shamrock ISD's current coaching pages identify Nate Skelton as athletic director and head football coach and list the current football staff, including offensive coordinator Thomas Hays and defensive coordinator Larry McNew.",
      "For the 2026–28 UIL cycle, Shamrock competes in Class 2A Division II, District 5 with Clarendon, Memphis, Quanah, Wellington and Wheeler. UIL's alphabetical enrollment file reports 100.5 students and a submitted conference of 1A, while the final football alignment places Shamrock in 2A Division II. TexasDefined therefore treats the enrollment figure and final football placement as separate facts rather than incorrectly calling 105–175.5 Shamrock's enrollment band.",
      "The 2026 season snapshot was checked October 9 with Shamrock at 1–4 before district play. The schedule table on this profile is a dated editorial snapshot; Shamrock ISD's official athletic schedule remains the first place to confirm a changed kickoff or school-issued update."
    ],
    "milestones": [
      {
        "date": "2026",
        "title": "Nate Skelton leads the program",
        "body": "Shamrock ISD identifies Nate Skelton as athletic director and head football coach on its current athletics pages.",
        "sourceUrl": "https://www.shamrockisd.net/47588_2",
        "sourceLabel": "Shamrock ISD"
      },
      {
        "date": "2026–28",
        "title": "2A Division II, District 5",
        "body": "The final UIL football alignment places Shamrock in 2A Division II, District 5 even though the alphabetical enrollment file reports 100.5 and a submitted conference of 1A.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official UIL football alignment"
      }
    ],
    "faq": [
      {
        "question": "What is Shamrock's football team called?",
        "answer": "Shamrock ISD identifies its athletics program as the Shamrock Fighting Irish."
      },
      {
        "question": "Who is the Shamrock head football coach?",
        "answer": "Shamrock ISD identifies Nate Skelton as athletic director and head football coach."
      },
      {
        "question": "Why is Shamrock in 2A Division II with a UIL enrollment of 100.5?",
        "answer": "UIL's alphabetical enrollment file reports 100.5 and a submitted conference of 1A, while the final 2026–28 football alignment places Shamrock in 2A Division II. TexasDefined treats those as separate official facts and uses the final alignment for competition placement instead of pretending the normal 2A Division II cutoff is Shamrock's enrollment band."
      },
      {
        "question": "Where does Shamrock play home football games?",
        "answer": "Dave Campbell's Texas Football identifies El Paso Field as Shamrock's stadium. Confirm the specific game venue, entrance and parking instructions with Shamrock ISD before travel."
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
