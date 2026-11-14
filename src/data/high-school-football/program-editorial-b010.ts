import type { FootballProgramEditorial } from './program-editorial';

/** First five source-controlled Batch 010 program guides. Date-specific official
 * school and UIL sources; do not turn schedules into scores or copy marks. */
const BATCH010_EDITORIAL: Record<string, FootballProgramEditorial> = {
  "college-station": {
    "slug": "college-station",
    "intro": "College Station High's Cougars are a separate Brazos County program from A&M Consolidated, even though both belong to College Station ISD. UIL places both in 2026–28 5A Division I District 12, but the Cougars' own school staff directory and athletics site identify Stoney Pryor as head football coach and campus athletic coordinator. It would be wrong to import Brandon Schmidt, the coach at A&M Consolidated, into this school. The current official athletics site is the appropriate place to confirm Cougar-specific changes, schedules and ticket instructions, not a district-wide generic opponent feed.",
    "theme": {
      "accentHex": "#4A5E69",
      "label": "Original TexasDefined editorial color accent; no official school palette, mascot art, seal or team photo assumed."
    },
    "seo": {
      "title": "College Station Cougars Football | 2026 5A Division I District 12",
      "description": "College Station Cougars guide: UIL 5A Division I District 12, Stoney Pryor source-qualified staff, dated school schedule, history and game-day caveats."
    },
    "coach": {
      "name": "Stoney Pryor",
      "title": "2026 source-qualified high-school football head coach (see roster and first-party school evidence)",
      "sourceUrl": "https://cshs.csisd.org/about-us/directory",
      "sourceLabel": "School-owned athletics directory or dated 2026 season football roster",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 College Station Cougars varsity schedule and school news",
      "sourceUrl": "https://www.cscougars.org/",
      "sourceLabel": "School- or district-operated 2026 athletics portal",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.cscougars.org/"
    },
    "development": {
      "title": "What makes this football program and school different",
      "body": "College Station High and A&M Consolidated share district governance and the current UIL 5A Division I District 12 alignment, but have separately staffed football programs. CSHS's official directory lists Stoney Pryor as head football coach/athletic coordinator, with other coaches performing distinct sports roles. The Cougar athletics portal links team information and updates. A cross-campus game or published fixture never merges the schools' season records. A venue name or campus address is not evidence of game-day gate access.",
      "sourceUrl": "https://www.cscougars.org/directory",
      "sourceLabel": "Independent current school portal or appropriately dated season context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28",
        "title": "Shared 5A Division I District 12 alignment",
        "body": "UIL places College Station High and A&M Consolidated in the same district while each remains a distinct high-school program.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 campus directory",
        "title": "Stoney Pryor named as Cougars head coach",
        "body": "The College Station High directory lists Stoney Pryor as head football coach and campus athletics coordinator.",
        "sourceUrl": "https://cshs.csisd.org/about-us/directory",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 athletics",
        "title": "Official Cougar athletics portal",
        "body": "The school athletics site publishes team and event navigation, separately from the A&M Consolidated Tigers portal.",
        "sourceUrl": "https://www.cscougars.org/",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "College Station Cougars competes as the Cougars in brazos County, Texas.",
      "The UIL 2026–28 alignment places the school in 5A Division I District 12.",
      "Stoney Pryor is tied to the specifically identified 2026 program; do not merge different school coaches or past assignments.",
      "Schedules and school event notices are not a complete, certified season record or venue-access guarantee."
    ],
    "faq": [
      {
        "question": "Who coaches College Station High football?",
        "answer": "CSHS's school directory names Stoney Pryor head football coach and campus athletic coordinator."
      },
      {
        "question": "Does A&M Consolidated share the Cougars' coach?",
        "answer": "No. The two CSISD high schools have separate coaching staffs, though both are in UIL 5A Division I District 12."
      },
      {
        "question": "Where are current Cougar game details?",
        "answer": "Use College Station High's official athletics site for school-specific schedule and ticket updates rather than inferring details from the other CSISD campus."
      }
    ]
  },
  "college-station-a-and-m-consolidated": {
    "slug": "college-station-a-and-m-consolidated",
    "intro": "A&M Consolidated High School's Tigers are the College Station ISD's own separate Brazos County football program in 2026–28 UIL 5A Division I District 12. The school's official staff directory and Tigers athletics coaching directory identify Brandon Schmidt as head football coach, not College Station Cougars coach Stoney Pryor. The Tigers' coaching portal also distinguishes staff responsibilities, including football operations and assistants. Both school campuses may meet as opponents, but their coaching, identities, game records and home-event notices must remain separate.",
    "theme": {
      "accentHex": "#6A513B",
      "label": "Original TexasDefined editorial color accent; no official school palette, mascot art, seal or team photo assumed."
    },
    "seo": {
      "title": "A&M Consolidated Tigers Football | 2026 5A Division I District 12",
      "description": "A&M Consolidated Tigers guide: UIL 5A Division I District 12, Brandon Schmidt source-qualified staff, dated school schedule, history and game-day caveats."
    },
    "coach": {
      "name": "Brandon Schmidt",
      "title": "2026 source-qualified high-school football head coach (see roster and first-party school evidence)",
      "sourceUrl": "https://amchs.csisd.org/about-us/staff-directory",
      "sourceLabel": "School-owned athletics directory or dated 2026 season football roster",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 A&M Consolidated Tigers varsity schedule and school news",
      "sourceUrl": "https://www.consoltigers.org/",
      "sourceLabel": "School- or district-operated 2026 athletics portal",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.consoltigers.org/"
    },
    "development": {
      "title": "What makes this football program and school different",
      "body": "A&M Consolidated's school directory lists Brandon Schmidt as head football coach and campus athletic coordinator, and its Tigers athletics site independently gives his football-specific role. The 2026 team coaching directory enumerates separate football operations and assistant assignments, which cannot be presented as the College Station High Cougars staff. UIL lists both CSISD high schools in 5A Division I District 12 for 2026–28; shared alignment is not a shared team. The official school/athletics sources should govern any later updates to staffing and visitor information.",
      "sourceUrl": "https://www.consoltigers.org/coaches-directory",
      "sourceLabel": "Independent current school portal or appropriately dated season context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28",
        "title": "Consolidated remains in 5A Division I District 12",
        "body": "The UIL alignment identifies the Tigers separately from the Cougars in the same classification and district.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 first-party staff",
        "title": "Brandon Schmidt coaches the Tigers",
        "body": "The school-controlled A&M Consolidated staff directory lists Brandon Schmidt head football coach and campus athletic coordinator.",
        "sourceUrl": "https://amchs.csisd.org/about-us/staff-directory",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 coaching directory",
        "title": "Distinct Tiger football operations roles",
        "body": "The Tigers official athletics coaching directory independently identifies Schmidt and assistant football coaches.",
        "sourceUrl": "https://www.consoltigers.org/coaches-directory",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "A&M Consolidated Tigers competes as the Tigers in brazos County, Texas.",
      "The UIL 2026–28 alignment places the school in 5A Division I District 12.",
      "Brandon Schmidt is tied to the specifically identified 2026 program; do not merge different school coaches or past assignments.",
      "Schedules and school event notices are not a complete, certified season record or venue-access guarantee."
    ],
    "faq": [
      {
        "question": "Who is A&M Consolidated's head coach?",
        "answer": "The official A&M Consolidated High staff directory and Tigers athletics pages name Brandon Schmidt."
      },
      {
        "question": "Are the Tigers and Cougars the same football program?",
        "answer": "No. Both are CSISD schools in Brazos County and 2026 UIL 5A Division I District 12, but their campus identities and coaching staffs are different."
      },
      {
        "question": "Where should Tiger fans find schedule and visitor updates?",
        "answer": "Start with A&M Consolidated High's official Tigers athletics website, not the separate Cougar portal."
      }
    ]
  },
  "colleyville-heritage": {
    "slug": "colleyville-heritage",
    "intro": "Colleyville Heritage High School's Panthers compete in Tarrant County under the 2026–28 UIL Class 5A Division II District 3 alignment. The official GCISD school staff directory names Jerry Edwards as head high-school football coach/coordinator, and the Panthers' own football coaching site agrees. GCISD's historical 2023 appointment report and 2025 coaching recognition provide dated program history, not a guarantee of a particular 2026 record. The separate team portal details coaching roles, while upcoming game times and ticket terms remain contingent on current organizer notices.",
    "theme": {
      "accentHex": "#564D6C",
      "label": "Original TexasDefined editorial color accent; no official school palette, mascot art, seal or team photo assumed."
    },
    "seo": {
      "title": "Colleyville Heritage Panthers Football | 2026 5A Division II District 3",
      "description": "Colleyville Heritage Panthers guide: UIL 5A Division II District 3, Jerry Edwards source-qualified staff, dated school schedule, history and game-day caveats."
    },
    "coach": {
      "name": "Jerry Edwards",
      "title": "2026 source-qualified high-school football head coach (see roster and first-party school evidence)",
      "sourceUrl": "https://chhs.gcisd.net/staff?page_no=3",
      "sourceLabel": "School-owned athletics directory or dated 2026 season football roster",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Colleyville Heritage Panthers varsity schedule and school news",
      "sourceUrl": "https://www.colleyvilleheritagefootball.com/",
      "sourceLabel": "School- or district-operated 2026 athletics portal",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.colleyvilleheritagefootball.com/"
    },
    "development": {
      "title": "What makes this football program and school different",
      "body": "GCISD's live campus staff directory names Jerry Edwards head football coach and coordinator. The Panthers football site gives his role and identifies Jeremy Snyder as assistant head coach/offensive coordinator, among separate staff. A 2025 district news report noted an award for Edwards but its quoted 2025 win-loss status cannot be promoted as the 2026 result. UIL realignment currently places Colleyville Heritage in 5A Division II District 3. Distinguish the Colleyville high school from other Heritage-named teams in Texas and from its own prior seasons.",
      "sourceUrl": "https://www.colleyvilleheritagefootball.com/page/show/3512131-coaches",
      "sourceLabel": "Independent current school portal or appropriately dated season context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "July 2023",
        "title": "School district announces Jerry Edwards appointment",
        "body": "GCISD's historical board announcement placed Edwards as the Colleyville Heritage boys athletic coordinator and head football coach.",
        "sourceUrl": "https://www.gcisd.net/article/1170513",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 2025",
        "title": "Coach recognized in a dated season",
        "body": "A GCISD story reports Dave Campbell's Texas Football recognition of Edwards in 2025; the article's historical win-loss details do not become 2026 standings.",
        "sourceUrl": "https://www.gcisd.net/article/2521848",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026",
        "title": "Current school staff listing",
        "body": "The school-operated GCISD staff directory continues to list Jerry Edwards in the football head coach/coordinator role.",
        "sourceUrl": "https://chhs.gcisd.net/staff?page_no=3",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Colleyville Heritage Panthers competes as the Panthers in tarrant County, Texas.",
      "The UIL 2026–28 alignment places the school in 5A Division II District 3.",
      "Jerry Edwards is tied to the specifically identified 2026 program; do not merge different school coaches or past assignments.",
      "Schedules and school event notices are not a complete, certified season record or venue-access guarantee."
    ],
    "faq": [
      {
        "question": "Who is Colleyville Heritage football's head coach?",
        "answer": "GCISD's current campus staff listing identifies Jerry Edwards as head football coach/coordinator."
      },
      {
        "question": "What UIL district is Colleyville Heritage in?",
        "answer": "UIL places the Panthers in Class 5A Division II District 3 for the 2026–28 cycle."
      },
      {
        "question": "Is a 2025 coach-of-the-week story a 2026 result?",
        "answer": "No. It is a historical distinction; current season standings require separate verified 2026 results."
      }
    ]
  },
  "collinsville": {
    "slug": "collinsville",
    "intro": "Collinsville High School's Pirates are the Grayson County, Texas football program in UIL 2A Division II District 9 for 2026–28, not the Collinsville Kahoks in Illinois. Collinsville ISD publishes an explicitly dated 2026–27 varsity football schedule; the 2026 MaxPreps varsity staff record lists Garrett Patterson as head football coach, independently consistent with district documents identifying him in athletic leadership. The schedule must not be interpreted as a complete results ledger, and Illinois team rosters, coaching and schedules must never be mixed into this Texas school.",
    "theme": {
      "accentHex": "#5E536D",
      "label": "Original TexasDefined editorial color accent; no official school palette, mascot art, seal or team photo assumed."
    },
    "seo": {
      "title": "Collinsville Pirates Football | 2026 2A Division II District 9",
      "description": "Collinsville Pirates guide: UIL 2A Division II District 9, Garrett Patterson source-qualified staff, dated school schedule, history and game-day caveats."
    },
    "coach": {
      "name": "Garrett Patterson",
      "title": "2026 source-qualified high-school football head coach (see roster and first-party school evidence)",
      "sourceUrl": "https://www.maxpreps.com/tx/collinsville/collinsville-pirates/football/staff/",
      "sourceLabel": "School-owned athletics directory or dated 2026 season football roster",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Collinsville Pirates varsity schedule and school news",
      "sourceUrl": "https://collinsvilleisd.org/football-schedules",
      "sourceLabel": "School- or district-operated 2026 athletics portal",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://collinsvilleisd.org/football-schedules"
    },
    "development": {
      "title": "What makes this football program and school different",
      "body": "The Texas Collinsville ISD site publishes a dated 2026–27 varsity football schedule and identifies the local school and district. The Texas 2026 MaxPreps partner roster names Garrett Patterson head football coach, with separate assistants. The district's prior staff documentation lists the same name as athletic director but does not independently establish today's coaching role; the season-qualified roster supplies that distinction. Search results can mistakenly return a Collinsville, Illinois team called the Kahoks, whose IHSA staff and records have no relevance to the Grayson County Pirates. UIL realignment identifies District 9 in 2A Division II.",
      "sourceUrl": "https://www.collinsvilleisd.org/84274_4?articleID=73300",
      "sourceLabel": "Independent current school portal or appropriately dated season context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "August 13, 2026",
        "title": "2026–27 varsity schedule posted",
        "body": "Collinsville ISD published a current-season Texas Pirates varsity football schedule with a dated school announcement.",
        "sourceUrl": "https://www.collinsvilleisd.org/84274_4?articleID=73300",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "September 18, 2026",
        "title": "Season-labeled varsity staff roster",
        "body": "The 2026 Texas Collinsville Pirates roster identifies Garrett Patterson head coach and names assistants.",
        "sourceUrl": "https://www.maxpreps.com/tx/collinsville/collinsville-pirates/football/staff/",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026–28",
        "title": "Texas UIL District 9 placement",
        "body": "UIL assigns Collinsville High to 2A Division II District 9, distinct from similarly named Illinois programs.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Collinsville Pirates competes as the Pirates in grayson County, Texas.",
      "The UIL 2026–28 alignment places the school in 2A Division II District 9.",
      "Garrett Patterson is tied to the specifically identified 2026 program; do not merge different school coaches or past assignments.",
      "Schedules and school event notices are not a complete, certified season record or venue-access guarantee."
    ],
    "faq": [
      {
        "question": "Is this the Illinois Collinsville team?",
        "answer": "No. These are the Collinsville Pirates of Grayson County, Texas, not the Collinsville Kahoks in Illinois."
      },
      {
        "question": "Who is listed as the Texas Collinsville head coach in 2026?",
        "answer": "The 2026 Texas varsity staff page lists Garrett Patterson; the district source separately confirms athletic leadership but is not a fresh head-coach record."
      },
      {
        "question": "Where is the official Pirates schedule?",
        "answer": "Collinsville ISD publishes a dated 2026–27 varsity football schedule on its district website."
      }
    ]
  },
  "colmesneil": {
    "slug": "colmesneil",
    "intro": "Colmesneil High School's Bulldogs are a Tyler County, Texas program in UIL Class 2A Division II District 12 for 2026–28. Colmesneil ISD lists Chad Coker as athletic director, and the season-labeled 2026 varsity team history identifies him as head football coach. A separately reproduced 2026 preseason schedule still names Chris Hicks, who was the prior head coach; a contemporary April 2026 local report describes Hicks's departure and Coker's appointment as athletic director. Those sources should be reconciled with clear dates rather than quietly replacing a current coach with an old schedule footer.",
    "theme": {
      "accentHex": "#4B5F4F",
      "label": "Original TexasDefined editorial color accent; no official school palette, mascot art, seal or team photo assumed."
    },
    "seo": {
      "title": "Colmesneil Bulldogs Football | 2026 2A Division II District 12",
      "description": "Colmesneil Bulldogs guide: UIL 2A Division II District 12, Chad Coker source-qualified staff, dated school schedule, history and game-day caveats."
    },
    "coach": {
      "name": "Chad Coker",
      "title": "2026 source-qualified high-school football head coach (see roster and first-party school evidence)",
      "sourceUrl": "https://www.colmesneilisd.net/page/athletics/",
      "sourceLabel": "School-owned athletics directory or dated 2026 season football roster",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Colmesneil Bulldogs varsity schedule and school news",
      "sourceUrl": "https://www.colmesneilisd.net/page/athletics/",
      "sourceLabel": "School- or district-operated 2026 athletics portal",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.colmesneilisd.net/page/athletics/"
    },
    "development": {
      "title": "What makes this football program and school different",
      "body": "Colmesneil ISD's official athletics page names Chad Coker athletic director, provides a separate football varsity/junior-high schedule link and identifies district coach contacts without labeling every listed person a varsity head coach. The 2026 varsity staff/history roster names Coker head coach. A pre-season schedule PDF preserved by Pigskin Prep identifies Chris Hicks, who the Tyler County Booster reported had departed for Hull-Daisetta earlier that spring. That evidence is a coaching transition, not a license to publish the older PDF's coach as current or infer any game's score. For the October/November calendar use the official school announcements; venue entrances and public tickets remain event-specific.",
      "sourceUrl": "https://www.maxpreps.com/tx/colmesneil/colmesneil-bulldogs/football/history/",
      "sourceLabel": "Independent current school portal or appropriately dated season context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "April 2026",
        "title": "Chad Coker appointed athletic director",
        "body": "The Tyler County Booster reported the local district's April 21 board action appointing Coker, and described Chris Hicks's departure.",
        "sourceUrl": "https://www.easttexasnews.com/tyler-county-booster/tyler-county-booster/stories/coker-named-colmesneil-ad,88675",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 athletic directory",
        "title": "District currently names Chad Coker",
        "body": "Colmesneil ISD's official athletics page lists Chad Coker as athletic director and links varsity and junior-high football calendars separately.",
        "sourceUrl": "https://www.colmesneilisd.net/page/athletics/",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 varsity staff",
        "title": "Head-coach record reconciled",
        "body": "The 2026 varsity history names Chad Coker head coach, while a prior-season coach listing names Chris Hicks; check changes against school sources.",
        "sourceUrl": "https://www.maxpreps.com/tx/colmesneil/colmesneil-bulldogs/football/history/",
        "sourceLabel": "Official school, UIL or date-qualified published historical record",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Colmesneil Bulldogs competes as the Bulldogs in tyler County, Texas.",
      "The UIL 2026–28 alignment places the school in 2A Division II District 12.",
      "Chad Coker is tied to the specifically identified 2026 program; do not merge different school coaches or past assignments.",
      "Schedules and school event notices are not a complete, certified season record or venue-access guarantee."
    ],
    "faq": [
      {
        "question": "Who coaches Colmesneil football in 2026?",
        "answer": "The season-labeled 2026 varsity record names Chad Coker; Colmesneil ISD separately lists him as athletic director. An older schedule footer names predecessor Chris Hicks."
      },
      {
        "question": "What UIL district is Colmesneil in?",
        "answer": "UIL 2026–28 assigns Colmesneil to Class 2A Division II District 12."
      },
      {
        "question": "Why does an old school schedule name Chris Hicks?",
        "answer": "The schedule appears to predate the April 2026 coaching transition. Verify new fixtures through Colmesneil ISD rather than using the old coach line as current."
      }
    ]
  },
  "clute-brazoswood": {
    "slug": "clute-brazoswood",
    "intro": "Brazoswood High's Buccaneers represent Clute in Brazoria County, competing in UIL Class 6A District 19 during the 2026–28 cycle. Brazosport ISD's own athletic staff directory names Eric Luster athletic campus coordinator and football head coach, separating that responsibility from its assistant-coach, coordinator and trainer listings. School newsletters advertised varsity home dates at Hopper Field on August 28, September 10 and October 2, 2026. Those dated announcements are useful for understanding the home calendar, but do not establish final scores or an up-to-date gate, parking or ticket policy.",
    "theme": {
      "accentHex": "#314C69",
      "label": "Original TexasDefined editorial styling for Brazoswood Buccaneers; not official colors, logo or school artwork."
    },
    "seo": {
      "title": "Brazoswood Buccaneers Football | 2026 6A District 19",
      "description": "Brazoswood Buccaneers 2026 football reference: UIL 6A District 19, source-qualified coach Eric Luster, current school calendar and visitor guidance."
    },
    "coach": {
      "name": "Eric Luster",
      "title": "Brazoswood athletic campus coordinator and football head coach",
      "sourceUrl": "https://www.brazosportisd.net/programs/b_i_s_d_athletics/athletic_contacts/brazoswood_high_school_athletic_staff",
      "sourceLabel": "2026 official school or season-labeled athletics staff evidence, reviewed 2026-10-28",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Brazoswood Buccaneers football schedules and school-controlled updates",
      "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29288932&portalId=417913",
      "sourceLabel": "District schedule or explicitly labeled 2026 varsity football source",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29288932&portalId=417913"
    },
    "venue": {
      "name": "Hopper Field",
      "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29346863&portalId=417913",
      "sourceLabel": "Brazoswood High dated 2026 home-game newsletter",
      "verifiedAt": "2026-10-28",
      "note": "Hopper Field is a named venue for these dated contests, not proof of particular gates, accessible parking or ticket availability."
    },
    "development": {
      "title": "Program-specific 2026 staff, district and source review",
      "body": "The school-controlled roster distinguishes Eric Luster's football head-coach role from other athletics leadership. Brazoswood's published weekly newsletters name Hopper Field in Freeport for selected 2026 games even though the school campus is in Clute; that geographical distinction is critical for visiting fans. A dated fixture listing cannot establish an overall season record, and an announced game location is not a guarantee of a particular entrance.",
      "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29346863&portalId=417913",
      "sourceLabel": "School/district athletics or season-labeled staff context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "August 28, 2026",
        "title": "School-advertised first home game",
        "body": "Brazoswood's official weekly newsletter identified a 7 p.m. first varsity home football game at Hopper Field.",
        "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29288932&portalId=417913",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "September 10, 2026",
        "title": "Homecoming football calendar",
        "body": "The school listed its homecoming varsity contest at Hopper Field, separate from a junior-varsity entry.",
        "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29323581&portalId=417913",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 2, 2026",
        "title": "Another school-announced home fixture",
        "body": "A school newsletter advertised an October 2 varsity home game at Hopper Field; it was a schedule notice, not a score result.",
        "sourceUrl": "https://www.brazosportisd.net/cms/One.aspx?pageId=29346863&portalId=417913",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Brazoswood Buccaneers represents its own brazoria County Texas school, not a similarly named campus or college.",
      "UIL's current 2026–28 alignment is 6A District 19; do not substitute historical district labels.",
      "Eric Luster is reported with the qualified role: Brazoswood athletic campus coordinator and football head coach.",
      "Use the linked school schedule for fixtures; incomplete score sources never imply a complete current win-loss record."
    ],
    "faq": [
      {
        "question": "Who coaches Brazoswood varsity football?",
        "answer": "The Brazosport ISD official athletics staff directory identifies Eric Luster as football head coach and Brazoswood athletics campus coordinator."
      },
      {
        "question": "Where is the Buccaneers' home venue?",
        "answer": "Brazoswood newsletters identify Hopper Field in Freeport for specified 2026 home fixtures. Consult the current host announcement for admission, gates, parking and accessibility."
      },
      {
        "question": "What UIL district is Brazoswood in?",
        "answer": "UIL's 2026–28 alignment lists Brazoswood in 6A District 19. Division I and Division II refer to subsequent 6A playoff brackets, not separate regular-season districts."
      }
    ]
  },
  "clyde": {
    "slug": "clyde",
    "intro": "Clyde High School's Bulldogs compete in Callahan County in UIL Class 3A Division I District 2 for 2026–28. The 2026 MaxPreps team staff page lists Danny Dudgeon head coach and Colby Rowley assistant coach, while Clyde CISD's own athletics information independently refers families to Coach Dudgeon for paperwork. An older District 3-3A fan-information label on the school schedule hub is not the current UIL alignment. Clyde also publishes links to athletics calendars and a HUDL livestream; those are tools for following the team, not independently verified current scores.",
    "theme": {
      "accentHex": "#355D59",
      "label": "Original TexasDefined editorial styling for Clyde Bulldogs; not official colors, logo or school artwork."
    },
    "seo": {
      "title": "Clyde Bulldogs Football | 2026 3A Division I District 2",
      "description": "Clyde Bulldogs 2026 football reference: UIL 3A Division I District 2, source-qualified coach Danny Dudgeon, current school calendar and visitor guidance."
    },
    "coach": {
      "name": "Danny Dudgeon",
      "title": "2026 season-labeled varsity head coach; Clyde ISD athletics contact",
      "sourceUrl": "https://www.maxpreps.com/tx/clyde/clyde-bulldogs/football/staff/",
      "sourceLabel": "2026 official school or season-labeled athletics staff evidence, reviewed 2026-10-28",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Clyde Bulldogs football schedules and school-controlled updates",
      "sourceUrl": "https://www.clydeisd.org/page/athleticschedules",
      "sourceLabel": "District schedule or explicitly labeled 2026 varsity football source",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.clydeisd.org/page/athleticschedules"
    },
    "development": {
      "title": "Program-specific 2026 staff, district and source review",
      "body": "Clyde CISD's athletics pages offer the Bulldogs football schedule, Rank One athletics paperwork and a school-described HUDL Focus streaming service. A schedule or livestream availability notice is not a promise of a particular game, published final or free stream. The official 2026–28 UIL Class 3A Division I realignment places Clyde in District 2, while older fan information can still refer to the previous District 3. The season-labeled varsity coaching roster and first-party athletics contact are cited separately.",
      "sourceUrl": "https://www.clydeisd.org/page/athleticinformation",
      "sourceLabel": "School/district athletics or season-labeled staff context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28 UIL realignment",
        "title": "District 2 classification",
        "body": "The official 3A Division I alignment lists Clyde in District 2 rather than the older District 3 referenced by some fan resources.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "September 26, 2026",
        "title": "2026 varsity staff listing",
        "body": "The season-specific football staff page identifies head coach Danny Dudgeon and assistant coach Colby Rowley.",
        "sourceUrl": "https://www.maxpreps.com/tx/clyde/clyde-bulldogs/football/staff/",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 athletics season",
        "title": "School-operated livestream and schedules",
        "body": "Clyde CISD describes HUDL Focus cameras at its field and lists athletics schedule links; access is subject to current school notice.",
        "sourceUrl": "https://www.clydeisd.org/page/athleticinformation",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Clyde Bulldogs represents its own callahan County Texas school, not a similarly named campus or college.",
      "UIL's current 2026–28 alignment is 3A Division I District 2; do not substitute historical district labels.",
      "Danny Dudgeon is reported with the qualified role: 2026 season-labeled varsity head coach; Clyde ISD athletics contact.",
      "Use the linked school schedule for fixtures; incomplete score sources never imply a complete current win-loss record."
    ],
    "faq": [
      {
        "question": "Who is Clyde's 2026 football head coach?",
        "answer": "The 2026 varsity staff roster names Danny Dudgeon, who is also an athletics contact on Clyde CISD's site."
      },
      {
        "question": "Which district contains the Clyde Bulldogs?",
        "answer": "The current UIL alignment places Clyde in Class 3A Division I District 2; an older District 3 fan heading is not the current realignment."
      },
      {
        "question": "Does Clyde livestream football games?",
        "answer": "Clyde CISD identifies a HUDL-based livestream service. Verify the availability, fee and schedule for an individual contest with the school."
      }
    ]
  },
  "coahoma": {
    "slug": "coahoma",
    "intro": "Coahoma High School's Bulldogs play Texas eleven-man football in Howard County as UIL Class 3A Division II District 3 during 2026–28. The Coahoma ISD staff directory identifies Chris Joslin as athletic director and the season-labeled varsity football staff list separately names him head coach. Those two sources serve different roles. This Texas school is unrelated to Coahoma Community College's football program in Mississippi; its collegiate coaches and results must never be blended into the Bulldogs high-school profile.",
    "theme": {
      "accentHex": "#65513B",
      "label": "Original TexasDefined editorial styling for Coahoma Bulldogs; not official colors, logo or school artwork."
    },
    "seo": {
      "title": "Coahoma Bulldogs Football | 2026 3A Division II District 3",
      "description": "Coahoma Bulldogs 2026 football reference: UIL 3A Division II District 3, source-qualified coach Chris Joslin, current school calendar and visitor guidance."
    },
    "coach": {
      "name": "Chris Joslin",
      "title": "Coahoma ISD athletic director; 2026 varsity-listed football head coach",
      "sourceUrl": "https://www.coahomaisd.com/o/district/staff",
      "sourceLabel": "2026 official school or season-labeled athletics staff evidence, reviewed 2026-10-28",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Coahoma Bulldogs football schedules and school-controlled updates",
      "sourceUrl": "https://www.maxpreps.com/tx/coahoma/coahoma-bulldogs/football/schedule/",
      "sourceLabel": "District schedule or explicitly labeled 2026 varsity football source",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.maxpreps.com/tx/coahoma/coahoma-bulldogs/football/schedule/"
    },
    "development": {
      "title": "Program-specific 2026 staff, district and source review",
      "body": "Coahoma ISD supplies the athletics leadership confirmation through its own staff directory. A dated 2026 UIL-partner varsity roster independently confirms the football coaching role, while the UIL's 3A Division II District 3 alignment supplies the current conference rather than an older scoreboard classification. Public schedule links are helpful for planned opponents and upcoming games, but the site must not infer a district record, updated final or tournament outcome without a permitted, dated result citation.",
      "sourceUrl": "https://www.maxpreps.com/tx/coahoma/coahoma-bulldogs/football/staff/",
      "sourceLabel": "School/district athletics or season-labeled staff context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28 classification",
        "title": "Coahoma's current UIL alignment",
        "body": "The 2026–28 3A Division II alignment assigns the Texas Coahoma Bulldogs to District 3.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/3AD2FB2026.pdf",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "August 29, 2026",
        "title": "Varsity coaching roster review",
        "body": "The 2026 varsity staff record names Chris Joslin head coach and identifies the accompanying assistant staff.",
        "sourceUrl": "https://www.maxpreps.com/tx/coahoma/coahoma-bulldogs/football/staff/",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 28, 2026",
        "title": "First-party athletics leadership cross-check",
        "body": "Coahoma ISD lists Chris Joslin as athletic director; this alone would not prove his head-coach appointment.",
        "sourceUrl": "https://www.coahomaisd.com/o/district/staff",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Coahoma Bulldogs represents its own howard County Texas school, not a similarly named campus or college.",
      "UIL's current 2026–28 alignment is 3A Division II District 3; do not substitute historical district labels.",
      "Chris Joslin is reported with the qualified role: Coahoma ISD athletic director; 2026 varsity-listed football head coach.",
      "Use the linked school schedule for fixtures; incomplete score sources never imply a complete current win-loss record."
    ],
    "faq": [
      {
        "question": "Who coaches Coahoma's varsity football team?",
        "answer": "The 2026 season varsity staff listing names Chris Joslin head coach; Coahoma ISD separately lists him as athletic director."
      },
      {
        "question": "What UIL classification is Coahoma?",
        "answer": "UIL lists Coahoma in Class 3A Division II District 3 for the 2026–28 cycle."
      },
      {
        "question": "Is this Coahoma Community College?",
        "answer": "No. This page is for Coahoma High School in Howard County, Texas, not the Mississippi community college."
      }
    ]
  },
  "coldspring-oakhurst": {
    "slug": "coldspring-oakhurst",
    "intro": "Coldspring-Oakhurst's Trojans represent San Jacinto County in UIL Class 3A Division I District 10 for the 2026–28 cycle. Coldspring-Oakhurst CISD's current coaching directory and district administration page both identify Chad Allen as director of athletics and head football coach. Some older high-school contact copy has referred to another athletics leader; it should not displace the current first-party staff directory. The district offers separately labeled varsity/JV and junior-high football schedules, so lower-grade dates should not appear as varsity game results.",
    "theme": {
      "accentHex": "#5F4A3C",
      "label": "Original TexasDefined editorial styling for Coldspring-Oakhurst Trojans; not official colors, logo or school artwork."
    },
    "seo": {
      "title": "Coldspring-Oakhurst Trojans Football | 2026 3A Division I District 10",
      "description": "Coldspring-Oakhurst Trojans 2026 football reference: UIL 3A Division I District 10, source-qualified coach Chad Allen, current school calendar and visitor guidance."
    },
    "coach": {
      "name": "Chad Allen",
      "title": "District-listed director of athletics and head football coach",
      "sourceUrl": "https://www.cocisd.org/departments/athletics/coaching-staff",
      "sourceLabel": "2026 official school or season-labeled athletics staff evidence, reviewed 2026-10-28",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Coldspring-Oakhurst Trojans football schedules and school-controlled updates",
      "sourceUrl": "https://www.cocisd.org/departments/athletics/schedules",
      "sourceLabel": "District schedule or explicitly labeled 2026 varsity football source",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.cocisd.org/departments/athletics/schedules"
    },
    "development": {
      "title": "Program-specific 2026 staff, district and source review",
      "body": "The current COCISD district administration and coaching pages independently place Chad Allen over the football and athletics programs. The school athletics schedules page directs visitors to the current varsity/JV football resource and also distinguishes junior-high fixtures. Older references to Cody Day on a different schedule/contact page are historical or ambiguous and must not be silently reused as the current head coach. Stadium entrance, tickets, weather changes and final standings are separate claims requiring current authorized evidence.",
      "sourceUrl": "https://www.cocisd.org/about-us/administration",
      "sourceLabel": "School/district athletics or season-labeled staff context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28 UIL alignment",
        "title": "Division I District 10",
        "body": "UIL places the Trojans in Class 3A Division I District 10, distinct from other 3A Division II programs.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 coaching appointment",
        "title": "School-operated coaching directory",
        "body": "COCISD's athletics staff page lists Chad Allen as athletics director and head football coach.",
        "sourceUrl": "https://www.cocisd.org/departments/athletics/coaching-staff",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 varsity schedule",
        "title": "Current football schedule published",
        "body": "The school's athletics schedule hub separates varsity/JV football from its junior-high program.",
        "sourceUrl": "https://www.cocisd.org/departments/athletics/schedules",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Coldspring-Oakhurst Trojans represents its own san jacinto County Texas school, not a similarly named campus or college.",
      "UIL's current 2026–28 alignment is 3A Division I District 10; do not substitute historical district labels.",
      "Chad Allen is reported with the qualified role: District-listed director of athletics and head football coach.",
      "Use the linked school schedule for fixtures; incomplete score sources never imply a complete current win-loss record."
    ],
    "faq": [
      {
        "question": "Who is the Trojans' current head football coach?",
        "answer": "COCISD's current district coaching and administration listings identify Chad Allen as head football coach and athletics director."
      },
      {
        "question": "Which district do Coldspring-Oakhurst Trojans play in?",
        "answer": "Their 2026–28 UIL placement is Class 3A Division I District 10."
      },
      {
        "question": "Where are the official game dates?",
        "answer": "COCISD publishes its varsity/JV football calendar through the athletics schedule page; check event notices for kickoff, venues and changes."
      }
    ]
  },
  "coleman": {
    "slug": "coleman",
    "intro": "Coleman High School's Bluecats represent Coleman County in UIL Class 2A Division I District 7 for the 2026–28 football cycle. Both Coleman ISD and the high-school athletics page specifically describe Zach Edington as *interim* football head coach and athletics director. Dropping the interim qualifier would change the school's statement and suggest a permanent appointment that its own page does not document. Coleman High provides a 2026–27 high-school football schedule, which is distinct from its junior-high schedule and is not by itself a record of final scores.",
    "theme": {
      "accentHex": "#36577D",
      "label": "Original TexasDefined editorial styling for Coleman Bluecats; not official colors, logo or school artwork."
    },
    "seo": {
      "title": "Coleman Bluecats Football | 2026 2A Division I District 7",
      "description": "Coleman Bluecats 2026 football reference: UIL 2A Division I District 7, source-qualified coach Zach Edington, current school calendar and visitor guidance."
    },
    "coach": {
      "name": "Zach Edington",
      "title": "Coleman ISD athletics director and expressly interim head football coach",
      "sourceUrl": "https://www.colemanisd.net/departments/athletics",
      "sourceLabel": "2026 official school or season-labeled athletics staff evidence, reviewed 2026-10-28",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Coleman Bluecats football schedules and school-controlled updates",
      "sourceUrl": "https://chs.colemanisd.net/departments/athletics",
      "sourceLabel": "District schedule or explicitly labeled 2026 varsity football source",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://chs.colemanisd.net/departments/athletics"
    },
    "development": {
      "title": "Program-specific 2026 staff, district and source review",
      "body": "Coleman ISD lists Zach Edington with an interim head-coach role and names James Bailey, Brock Bouldin, Rusty Clippinger, Keith Meador and David Story among assistants. The high-school athletics hub offers the 2026–27 football schedule and a separate official livestream link. Existing historical football articles may describe prior head coaches, but the district's current-season interim listing must take precedence. Ticket inventory, stadium entrance and season wins cannot be extrapolated from the school staff and schedule pages.",
      "sourceUrl": "https://chs.colemanisd.net/departments/athletics",
      "sourceLabel": "School/district athletics or season-labeled staff context",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "July 20, 2026",
        "title": "Interim leadership announcement",
        "body": "A contemporary regional news report described Coleman ISD's choice of long-time assistant Zach Edington as interim coach for 2026–27.",
        "sourceUrl": "https://sports.yahoo.com/articles/coleman-isd-taps-longtime-assistant-220406667.html",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026–28 realignment",
        "title": "Class 2A Division I District 7",
        "body": "UIL's official alignment lists Coleman as a 2A Division I District 7 school.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026–27 football schedule",
        "title": "School football calendar and staff roles",
        "body": "Coleman High separately lists a 2026–27 varsity schedule and an interim head football coach.",
        "sourceUrl": "https://chs.colemanisd.net/departments/athletics",
        "sourceLabel": "Dated first-party school, official UIL or qualified independent historical source",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Coleman Bluecats represents its own coleman County Texas school, not a similarly named campus or college.",
      "UIL's current 2026–28 alignment is 2A Division I District 7; do not substitute historical district labels.",
      "Zach Edington is reported with the qualified role: Coleman ISD athletics director and expressly interim head football coach.",
      "Use the linked school schedule for fixtures; incomplete score sources never imply a complete current win-loss record."
    ],
    "faq": [
      {
        "question": "Who leads Coleman football in 2026?",
        "answer": "Coleman ISD identifies Zach Edington as the *interim* head football coach and athletic director, not a confirmed permanent appointee."
      },
      {
        "question": "Which UIL classification includes Coleman?",
        "answer": "Coleman competes in Class 2A Division I District 7 under the 2026–28 UIL realignment."
      },
      {
        "question": "Where can fans find the Bluecats' schedule?",
        "answer": "Coleman High's official athletics page links the 2026–27 high-school football schedule. Confirm individual games and admission separately."
      }
    ]
  },
  "cleveland-tarkington": {
    "slug": "cleveland-tarkington",
    "intro": "The Tarkington Longhorns are a separate Liberty County football program from nearby Cleveland High. UIL places Tarkington in Class 3A Division I District 10 for 2026–28. Tarkington ISD introduced Coach Howard as its new athletic director after a March 2026 vacancy, while the 2026 varsity roster identifies Jake Howard as head football coach. The district’s own October calendar names A. L. Nelson Stadium for its October 15 home contest against Kirbyville and October 30 meeting with East Chambers; that is an event venue, not the district office mailing address.",
    "theme": {
      "accentHex": "#694E38",
      "label": "Original TexasDefined warm-brown visual styling, not a school-approved Longhorn mark or photo."
    },
    "seo": {
      "title": "Tarkington Longhorns Football | Jake Howard & 2026 District 10",
      "description": "Tarkington High football guide: 2026 3A Division I District 10, district-announced Coach Howard, A. L. Nelson Stadium and first-party dated schedule."
    },
    "coach": {
      "name": "Jake Howard",
      "title": "2026 varsity-listed head football coach; separately announced district athletic director",
      "sourceUrl": "https://www.tarkingtonisd.net/about-tisd/district-news/details/~board/showcases-1/post/new-athletic-director-announced",
      "sourceLabel": "Tarkington ISD announces Coach Howard as athletic director; MaxPreps 2026 staff confirms Jake Howard coaches varsity",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "2770 FM 163, Cleveland, TX 77327 (Tarkington High mailing/campus listing; district office physical address differs)",
      "sourceUrl": "https://www.tarkingtonisd.net/departments/athletics",
      "sourceLabel": "Tarkington ISD official district physical-versus-mailing address",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Tarkington ISD October 2026 athletics calendar and event details",
      "sourceUrl": "https://www.tarkingtonisd.net/calendar",
      "sourceLabel": "Tarkington ISD official October 2026 school calendar",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.tarkingtonisd.net/calendar"
    },
    "venue": {
      "name": "A. L. Nelson Stadium",
      "sourceUrl": "https://www.tarkingtonisd.net/calendar",
      "sourceLabel": "Tarkington ISD first-party October 15 and October 30 home football fixture location",
      "verifiedAt": "2026-10-28",
      "note": "District calendar names the stadium but does not certify a specific spectator gate, accessible parking space or purchase terms. Check the event and HomeTown ticket portal."
    },
    "development": {
      "title": "A new district athletics director, a new UIL cycle and carefully separated addresses",
      "body": "Tarkington ISD's own new-athletic-director announcement credits Coach Howard's prior four seasons at Willis, a span when the Willis program accumulated a reported 40–10 record. That is a Willis coaching-history fact, not a Tarkington 2026 win-loss record. Tarkington's 2026 Longhorn opponent calendar includes Kirbyville, Buna and East Chambers; its advertised A. L. Nelson Stadium and district-office address are not interchangeable with Tarkington High's campus. Use district ticket and calendar notices for genuine event changes.",
      "sourceUrl": "https://www.tarkingtonisd.net/about-tisd/district-news/details/~board/showcases-1/post/new-athletic-director-announced",
      "sourceLabel": "District-controlled appointment and 40–10 Willis-history report",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "March 2026",
        "title": "District recruits a new football/athletics leader",
        "body": "Tarkington ISD's athletic director hiring followed a March vacancy. The district identified Coach Howard as incoming athletics leader and described his previous Willis experience.",
        "sourceUrl": "https://www.tarkingtonisd.net/about-tisd/district-news/details/~board/showcases-1/post/new-athletic-director-announced",
        "sourceLabel": "First-party coach announcement",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 15, 2026",
        "title": "Kirbyville home contest on district calendar",
        "body": "Tarkington's October event entry advertised varsity football against Kirbyville at A. L. Nelson Stadium, not a result.",
        "sourceUrl": "https://www.tarkingtonisd.net/calendar",
        "sourceLabel": "First-party October calendar",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 30, 2026",
        "title": "East Chambers home fixture",
        "body": "The district’s October 30 schedule lists East Chambers at A. L. Nelson Stadium; the future game has no published final on October 28.",
        "sourceUrl": "https://www.tarkingtonisd.net/calendar",
        "sourceLabel": "First-party future varsity fixture",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Cleveland Tarkington is the 3A Division I District 10 Longhorns; it is not the Cleveland Indians varsity team.",
      "Tarkington ISD announced Coach Howard as athletic director; the 2026 roster separately labels Jake Howard football head coach.",
      "Tarkington ISD's October 2026 calendar names A. L. Nelson Stadium for specified home fixtures but does not license a universal stadium gate or seating map.",
      "District office physical address, FM 163 mailing address and actual game-venue directions should remain clearly distinct."
    ],
    "faq": [
      {
        "question": "Who coaches the 2026 Tarkington Longhorns?",
        "answer": "The 2026 varsity staff feed lists Jake Howard head coach, and Tarkington ISD separately introduced Coach Howard as its new district athletic director."
      },
      {
        "question": "Does Tarkington play in the same district as Cleveland?",
        "answer": "No. In the UIL 2026–28 cycle, Tarkington is in Class 3A Division I District 10; nearby Cleveland High is a separate varsity program."
      },
      {
        "question": "Where do Tarkington varsity home games take place?",
        "answer": "Tarkington's school calendar names A. L. Nelson Stadium for October 15 and October 30 home games. Consult each current event listing for spectator admission, accessible entry and exact directions."
      }
    ]
  },
  "clifton": {
    "slug": "clifton",
    "intro": "Clifton High’s Cubs are a Bosque County UIL Class 3A Division II District 5 team, not a Class 3A Division I team. Clifton ISD's official athletics staff page explicitly names Brent Finney athletic director and head football coach. An older season-history page inconsistently lists Corey Waller for 2026 even though the current 2026 staff page also identifies Finney as head coach; the district’s own staffing takes precedence. Clifton posted an official 2026 varsity schedule including Comanche, Hamilton, Dublin and the October 30 Tolar home game.",
    "theme": {
      "accentHex": "#3E6550",
      "label": "Original TexasDefined evergreen editorial accent; no copied Cubs mascot, uniform photo or official crest."
    },
    "seo": {
      "title": "Clifton Cubs Football | Brent Finney, 2026 UIL 3A District 5",
      "description": "Clifton Cubs guide with verified Brent Finney athletics role, 2026 District 5 opponents, Cub Stadium and source-dated schedule cautions."
    },
    "coach": {
      "name": "Brent Finney",
      "title": "Athletic Director / Head Football Coach on the official Clifton ISD athletics staff directory",
      "sourceUrl": "https://www.cliftonisd.org/o/cisda/staff",
      "sourceLabel": "Clifton ISD official athletics staff; conflicting historical third-party coach field not used",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "1101 N Ave Q, Clifton, TX 76634 (school campus, not confirmed gate)",
      "sourceUrl": "https://www.maxpreps.com/tx/clifton/clifton-cubs/football/staff/",
      "sourceLabel": "2026 UIL-partner school campus listing",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "2026 Clifton varsity 3A Division II District 5 football schedule",
      "sourceUrl": "https://www.pigskinprep.com/archive/Schedulespdf/Clifton.pdf",
      "sourceLabel": "2026 Clifton team schedule reproduced by Pigskin Prep; district staff controls coaching",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.cliftonisd.org/o/cisda"
    },
    "venue": {
      "name": "Cub Stadium",
      "sourceUrl": "https://www.texasfootball.com/team/clifton-cubs",
      "sourceLabel": "Dave Campbell’s Texas Football Clifton team/stadium listing",
      "verifiedAt": "2026-10-28",
      "note": "A reported stadium name is not a verified accessible spectator entrance or current ticket-price guarantee."
    },
    "development": {
      "title": "3A Division II District 5 opponents and a source conflict over the head coach",
      "body": "Clifton’s 2026 football schedule places the Cubs with Comanche, Rio Vista, Eastland, Hamilton, Dublin, Tolar and Millsap. The school-owned staff listing names Brent Finney athletic director and head football coach, whereas the MaxPreps historical 2026–27 season card inconsistently lists Corey Waller; the separate current MaxPreps roster also identifies Finney as head coach. Preserve that discrepancy and privilege the school primary source. Dave Campbell’s program history lists zero state football titles and one title-game appearance; an imagined championship should never appear.",
      "sourceUrl": "https://www.cliftonisd.org/o/cisda/staff",
      "sourceLabel": "Official Clifton ISD current coach-role evidence",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2025 season",
        "title": "Eight-win prior-season Cubs",
        "body": "The retrospective team history shows Clifton finished 8–3 in 2025, a historical record not the 2026 standing.",
        "sourceUrl": "https://www.texasfootball.com/team/clifton-cubs",
        "sourceLabel": "DCTF season-history listing",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 schedule",
        "title": "District 5 rematch sequence",
        "body": "Clifton’s published fall schedule lists a September 18 Comanche game, October 16 visit to Hamilton and an October 30 Tolar home fixture.",
        "sourceUrl": "https://www.pigskinprep.com/archive/Schedulespdf/Clifton.pdf",
        "sourceLabel": "2026 schedule reproduced from school handout",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 28, 2026",
        "title": "District-first coaching attribution",
        "body": "Current official Clifton ISD directory explicitly identifies Brent Finney athletic director/head coach despite different historic season-feed attribution.",
        "sourceUrl": "https://www.cliftonisd.org/o/cisda/staff",
        "sourceLabel": "Official athletics staff directory",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Clifton Cubs compete in 2026 3A Division II District 5 in Bosque County.",
      "Clifton ISD’s current first-party staff directory names Brent Finney head football coach; third-party archived coach fields conflict and should not override this.",
      "The published 2026 schedule names opponents and home dates; schedules must not be converted into results.",
      "Cub Stadium is the reported game venue, while its actual entrances and access policies require event-level checks."
    ],
    "faq": [
      {
        "question": "Who is the Clifton football head coach in 2026?",
        "answer": "The current Clifton ISD athletics staff directory lists Brent Finney as athletic director and head football coach; a secondary year-history attribution differs."
      },
      {
        "question": "Which UIL division includes Clifton?",
        "answer": "UIL 2026–28 puts Clifton in Class 3A Division II District 5."
      },
      {
        "question": "Does Clifton have a state football championship?",
        "answer": "Dave Campbell’s program history lists no state football championships and one state title-game appearance."
      }
    ]
  },
  "clint": {
    "slug": "clint",
    "intro": "Clint High School's Lions are the original Clint ISD campus program, separate from district siblings Horizon Scorpions and Mountain View Lobos. UIL aligns Clint in Class 4A Division II District 1 for 2026–28. The actual first-party Clint High football staff page names Rosuel Martinez head coach, with David Gardea offensive coordinator and Armando Resendiz defensive coordinator; a secondary roster spells his first name differently. Clint High lists an on-campus academic address of 13890 Alameda Avenue, not a confirmed field entrance.",
    "theme": {
      "accentHex": "#4A536D",
      "label": "Original TexasDefined slate editorial treatment; not Clint Lions official colors or artwork."
    },
    "seo": {
      "title": "Clint Lions Football | Rosuel Martinez & UIL 4A District 1",
      "description": "Clint High Lions 2026 football: school-confirmed Rosuel Martinez staff, 4A Division II District 1 and official Clint ISD schedules."
    },
    "coach": {
      "name": "Rosuel Martinez",
      "title": "Head Football Coach; district also lists Clint High School athletic coordinator",
      "sourceUrl": "https://chs.clintweb.net/athletics/football",
      "sourceLabel": "Clint High first-party coaching roster; preserves Rosuel spelling over secondary Rosvel",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "13890 Alameda Ave, Clint, TX 79836 (academic campus, football gate not independently verified)",
      "sourceUrl": "https://chs.clintweb.net/athletics",
      "sourceLabel": "Clint High official school address",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Clint High 2026 varsity and JV schedules",
      "sourceUrl": "https://chs.clintweb.net/athletics",
      "sourceLabel": "School-owned football schedules and event-ticket access",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://chs.clintweb.net/athletics"
    },
    "development": {
      "title": "Three Clint ISD football teams, three separate coaches and divisions",
      "body": "Clint High's 2026 Lions are coached by Rosuel Martinez, with Gardea and Resendiz listed as coordinators. Horizon High's Scorpions have a separate coordinator (Omar Garcia) and compete in 5A Division I District 1; Mountain View’s Lobos have DJ Check and the same 4A Division II district as Clint. Clint ISD’s official athletics directory lists each school coordinator separately, so a shared district site never justifies blending rosters, scores or stadium information.",
      "sourceUrl": "https://www.clintweb.net/departments/athletic-services/directory-of-athletics",
      "sourceLabel": "Clint ISD first-party three-campus athletic-coordinator directory",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026 alignment",
        "title": "Clint Lions in 4A Division II District 1",
        "body": "Clint and Mountain View share a 4A Division II football district, while Horizon competes in 5A Division I; they are distinct varsity programs.",
        "sourceUrl": "https://realignment.uiltexas.org/",
        "sourceLabel": "UIL 2026–28 football reclassification portal",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 staff",
        "title": "Clint High identifies its full coaching roles",
        "body": "Official school page names Rosuel Martinez head coach, David Gardea offensive and Armando Resendiz defensive coordinator.",
        "sourceUrl": "https://chs.clintweb.net/athletics/football",
        "sourceLabel": "Clint High school-owned staff page",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 fixtures",
        "title": "Varsity schedule maintained by school athletics",
        "body": "Clint High publishes a 2026 varsity schedule in its athletics section, as well as a separate JV listing.",
        "sourceUrl": "https://chs.clintweb.net/athletics",
        "sourceLabel": "Official athletics schedule and ticket navigation",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Clint Lions are a 2026 Class 4A Division II District 1 program in El Paso County.",
      "The first-party head coach is Rosuel Martinez; verify that spelling rather than following a secondary Rosvel variant.",
      "The academic campus is on Alameda Avenue; current spectator gate, cash/card policy and accessible parking require district confirmation.",
      "Horizon and Mountain View are separate Clint ISD schools with different mascots and, in Horizon’s case, a different UIL classification."
    ],
    "faq": [
      {
        "question": "Who coaches Clint High School varsity football?",
        "answer": "Clint High lists Rosuel Martinez as head football coach, David Gardea offensive coordinator and Armando Resendiz defensive coordinator."
      },
      {
        "question": "Are Clint, Horizon and Mountain View one school team?",
        "answer": "No. These are three independent Clint ISD campuses and varsity programs with distinct coaching staff and UIL alignments."
      },
      {
        "question": "What division does Clint play in during 2026?",
        "answer": "UIL 2026–28 places Clint in 4A Division II District 1."
      }
    ]
  },
  "clint-horizon": {
    "slug": "clint-horizon",
    "intro": "Clint Horizon High School's Scorpions are a separate Horizon City campus within Clint ISD. The official district athletic-coordinator directory assigns Horizon to Omar Garcia and the 2026 varsity roster independently lists him head football coach. Horizon's 2026–28 placement is UIL Class 5A Division I District 1, while fellow Clint ISD campuses Clint High and Mountain View play Class 4A Division II. Horizon's own school profile documents the Scorpions mascot and a 2002 opening date.",
    "theme": {
      "accentHex": "#555B65",
      "label": "Original TexasDefined silver/slate editorial treatment. Horizon's first-party school profile names black and silver school colors; no school logo reproduced."
    },
    "seo": {
      "title": "Clint Horizon Scorpions Football | Omar Garcia & 2026 5A",
      "description": "Horizon Scorpions football: official Clint ISD Omar Garcia athletics role, 2026 UIL 5A Division I District 1, Horizon City campus and accurate 2026 schedule cautions."
    },
    "coach": {
      "name": "Omar Garcia",
      "title": "Horizon High athletic coordinator on district roster; 2026 varsity-listed head football coach",
      "sourceUrl": "https://www.clintweb.net/departments/athletic-services/directory-of-athletics",
      "sourceLabel": "Clint ISD current High Schools Athletic Coordinators directory; 2026 MaxPreps staff corroborates head coach",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "14651 Horizon Blvd, Horizon City, TX 79928 (official academic campus; separate event venue may apply)",
      "sourceUrl": "https://hhs.clintweb.net/our-school/about-horizon",
      "sourceLabel": "Horizon High School official campus overview and location",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Horizon High athletics schedule and Scorpions football page",
      "sourceUrl": "https://hhs.clintweb.net/athletics",
      "sourceLabel": "School athletics football navigation",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://hhs.clintweb.net/athletics"
    },
    "development": {
      "title": "Horizon City identity and an outdated lower-level schedule warning",
      "body": "Horizon High opened in 2002, and its own school site confirms the Scorpions name. The first-party athletics section separately lists varsity, JV and ninth-grade football, but the currently indexed JV table includes Wednesday dates and November/December fixtures that do not correspond to the 2026 varsity regular season. Do not treat that outdated lower-level table as an active varsity schedule. Instead confirm current games from the varsity listing and district athletics; a 5A Division I school is not interchangeable with Clint and Mountain View in 4A Division II.",
      "sourceUrl": "https://hhs.clintweb.net/athletics/football/schedules",
      "sourceLabel": "School-owned varsity/JV/ninth-grade labels; JV content needs fresh-season confirmation",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2002",
        "title": "Horizon High opens",
        "body": "The school's own campus profile lists 2002 opening, Scorpions mascot, and black and silver school colors.",
        "sourceUrl": "https://hhs.clintweb.net/our-school/about-horizon",
        "sourceLabel": "Official Horizon High history and mascot profile",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 staff",
        "title": "Omar Garcia identified on athletics directory",
        "body": "Clint ISD assigns Omar Garcia to Horizon High and the current varsity staff feed independently calls him head coach.",
        "sourceUrl": "https://www.clintweb.net/departments/athletic-services/directory-of-athletics",
        "sourceLabel": "Official coordinator role listing",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "2026 realignment",
        "title": "5A Division I District 1 placement",
        "body": "Horizon joins UIL 5A Division I District 1 for the current realignment, unlike Clint High and Mountain View's 4A Division II alignment.",
        "sourceUrl": "https://realignment.uiltexas.org/",
        "sourceLabel": "UIL realignment portal",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Horizon High is the Scorpions school in Horizon City, opened in 2002 and distinct from the Clint High Lions.",
      "Omar Garcia is named current Horizon athletic coordinator by Clint ISD; a contemporary staff feed lists him varsity head coach.",
      "2026 UIL classification is Class 5A Division I District 1, not 4A Division II.",
      "Some indexed lower-level schedules appear outdated; use only the clearly labeled 2026 varsity schedule before making game-day decisions."
    ],
    "faq": [
      {
        "question": "Who is Horizon High's 2026 football head coach?",
        "answer": "Clint ISD's athletics directory lists Omar Garcia as Horizon athletic coordinator, and the current 2026 varsity coaching roster lists him head coach."
      },
      {
        "question": "Is Clint Horizon in the same UIL division as Clint High?",
        "answer": "No. Horizon's 2026 program is 5A Division I District 1; Clint High is 4A Division II District 1."
      },
      {
        "question": "When did Horizon High School open?",
        "answer": "Horizon High's first-party school history lists 2002."
      }
    ]
  },
  "clint-mountain-view": {
    "season": {
      "record": "3–5 overall, 1–1 in district through October 23, 2026 (MaxPreps source snapshot updated October 27; not UIL-certified)",
      "sourceUrl": "https://www.maxpreps.com/tx/el-paso/mountain-view-lobos/football/schedule/",
      "sourceLabel": "Dated 2026-10-27 team schedule listing eight specific finals; not future fixtures",
      "verifiedAt": "2026-10-28",
      "games": [
        {
          "date": "2026-08-28",
          "opponent": "Chaparral",
          "site": "Home",
          "result": "L 21-23"
        },
        {
          "date": "2026-09-04",
          "opponent": "Horizon",
          "site": "Away",
          "result": "L 27-28"
        },
        {
          "date": "2026-09-11",
          "opponent": "Alpine",
          "site": "Away",
          "result": "W 34-9"
        },
        {
          "date": "2026-09-18",
          "opponent": "San Elizario",
          "site": "Home",
          "result": "W 31-6"
        },
        {
          "date": "2026-09-25",
          "opponent": "Ysleta",
          "site": "Away",
          "result": "L 28-49"
        },
        {
          "date": "2026-10-02",
          "opponent": "Austin",
          "site": "Home",
          "result": "L 3-56"
        },
        {
          "date": "2026-10-09",
          "opponent": "Irvin",
          "site": "Away",
          "result": "L 22-27",
          "district": true
        },
        {
          "date": "2026-10-23",
          "opponent": "Fabens",
          "site": "Home",
          "result": "W 22-18",
          "district": true
        }
      ]
    },
    "slug": "clint-mountain-view",
    "intro": "Mountain View High School's Lobos play UIL Class 4A Division II District 1 in eastern El Paso County, distinct from both the Clint Lions and Horizon Scorpions. Clint ISD's athletic-services directory independently lists DJ Check as the Mountain View athletic coordinator, and the contemporary 2026 varsity staff names him head football coach. Mountain View High publishes its own 2026–27 football announcement and keeps its academic campus at 14964 Greg Drive.",
    "theme": {
      "accentHex": "#575A46",
      "label": "Original TexasDefined olive/slate style; not official Lobos colors, mascot logo or school-owned player images."
    },
    "seo": {
      "title": "Clint Mountain View Lobos Football | DJ Check, 2026 4A",
      "description": "Mountain View Lobos football near El Paso: Clint ISD DJ Check athletics leadership, 2026 UIL 4A Division II District 1 and official school calendar."
    },
    "coach": {
      "name": "DJ Check",
      "title": "District-listed Mountain View High athletic coordinator; 2026 varsity-listed head football coach",
      "sourceUrl": "https://www.clintweb.net/departments/athletic-services/directory-of-athletics",
      "sourceLabel": "First-party Clint ISD campus coordinator directory and corresponding 2026 roster head-coach listing",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "14964 Greg Dr, El Paso, TX 79938 (school campus, stadium entrance not individually verified)",
      "sourceUrl": "https://mvhs.clintweb.net/",
      "sourceLabel": "Mountain View official first-party high school page",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Mountain View 2026–27 football announcements",
      "sourceUrl": "https://mvhs.clintweb.net/",
      "sourceLabel": "Mountain View first-party August 20, 2026 football announcement",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://mvhs.clintweb.net/"
    },
    "development": {
      "title": "2026 4A Division II realignment and an explicitly dated football snapshot",
      "body": "Mountain View competed in 4A Division I during the 2025 season and recorded a 3–7 result then; its 2026 classification is 4A Division II District 1, the same district as Clint High but not Horizon High. The secondary schedule has eight actual game finals through October 23 and future games October 30 at Bowie and November 6 against Clint. These future fixtures are not completed results. Coach DJ Check is independently corroborated by the district and varsity staff pages.",
      "sourceUrl": "https://www.maxpreps.com/tx/el-paso/mountain-view-lobos/football/schedule/",
      "sourceLabel": "MaxPreps current 2026 dated schedule through October 23 and upcoming fixtures",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2025 season",
        "title": "Previous-year 4A Division I assignment",
        "body": "MaxPreps historical archive shows a 3-7 finish in 2025 in Class 4A Division I; that alignment has since changed.",
        "sourceUrl": "https://www.maxpreps.com/tx/el-paso/mountain-view-lobos/football/history/",
        "sourceLabel": "Year-specific Mountain View program history",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "August 20, 2026",
        "title": "School publishes 2026–27 football announcement",
        "body": "The district-controlled campus news feed includes its 2026.27 Football post, distinct from the previous-season roster.",
        "sourceUrl": "https://mvhs.clintweb.net/",
        "sourceLabel": "Mountain View first-party current-season announcement",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "October 23, 2026",
        "title": "Reported home win against Fabens",
        "body": "The dated varsity schedule reports a 22-18 Mountain View home victory; it does not confer UIL-official standing or guarantee future results.",
        "sourceUrl": "https://www.maxpreps.com/tx/el-paso/mountain-view-lobos/football/schedule/",
        "sourceLabel": "Third-party score listing dated October 23",
        "verifiedAt": "2026-10-28"
      },
      {
        "date": "November 6, 2026",
        "title": "Cross-district-campus matchup with Clint",
        "body": "The varsity schedule lists Clint as a future 4A Division II District 1 opponent; no final score is available on October 28.",
        "sourceUrl": "https://www.maxpreps.com/tx/el-paso/mountain-view-lobos/football/schedule/",
        "sourceLabel": "Current dated 2026 fixture listing",
        "verifiedAt": "2026-10-28"
      }
    ],
    "overview": [
      "Mountain View Lobos play UIL Class 4A Division II District 1 in the 2026 realignment.",
      "Clint ISD names DJ Check athletic coordinator for Mountain View; the 2026 varsity roster names him football head coach.",
      "The campus is on Greg Drive in El Paso, and should not be confused with Clint High on Alameda Avenue or Horizon in Horizon City.",
      "Older 2025 results, currently reported October finals and future November games belong to separate time periods."
    ],
    "faq": [
      {
        "question": "Who coaches Mountain View Lobos football?",
        "answer": "Clint ISD lists DJ Check as Mountain View High athletic coordinator, and the 2026 varsity roster identifies him head football coach."
      },
      {
        "question": "Is Mountain View in the same district as Horizon High?",
        "answer": "No. Mountain View and Clint High are 4A Division II District 1 for 2026–28, while Horizon High is 5A Division I District 1."
      },
      {
        "question": "What is the latest source-dated 2026 result cited on this page?",
        "answer": "The October 23 varsity schedule reports Mountain View beat Fabens 22-18; remaining October 30 and November 6 games are future fixtures, not results."
      }
    ]
  },
  "clarendon": {
    "slug": "clarendon",
    "intro": "The Clarendon Broncos play in UIL 2A Division II District 5 for 2026–28 against Memphis, Quanah, Shamrock, Wellington and Wheeler. Clarendon CISD offers a first-party 26/27 Bronco football schedule, and its own athletic live feed identifies Coach Whitaker. Independent 2026 staff listings name Brenton Whitaker head coach; stale October opponent feeds should not be mistaken for a finished season.",
    "theme": {
      "accentHex": "#6F422C",
      "label": "Original TexasDefined saddle-brown editorial styling, not official Bronco trademarks or team photography."
    },
    "seo": {
      "title": "Clarendon Broncos Football | Coach Brenton Whitaker & 2026 District 5",
      "description": "Clarendon Broncos 2026 football: UIL 2A Division II District 5, Coach Brenton Whitaker, first-party schedules and source-dated opponent guidance."
    },
    "coach": {
      "name": "Brenton Whitaker",
      "title": "2026 varsity head coach; corroborated by school-owned athletics posts",
      "sourceUrl": "https://www.clarendonisd.net/live-feed",
      "sourceLabel": "Clarendon CISD official live feed uses Coach Whitaker; 2026 MaxPreps staff/history provides first name",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Clarendon CISD 2026–27 Bronco football schedules",
      "sourceUrl": "https://www.clarendonisd.net/",
      "sourceLabel": "First-party homepage links current printable Bronco football schedule",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.clarendonisd.net/"
    },
    "development": {
      "title": "District 5-2A Division II and visitor-information cautions",
      "body": "UIL's 2026–28 alignment joins Clarendon with Memphis, Quanah, Shamrock, Wellington and Wheeler. Clarendon CISD publishes a current varsity football schedule and event-specific ticket navigation; its September 11 Plains game-day notice specified cash-only admission for that away contest. An away-host instruction must not be generalized into a permanent Clarendon home-gate policy.",
      "sourceUrl": "https://www.clarendonisd.net/live-feed",
      "sourceLabel": "School-owned September game-day instructions and Whitaker posts",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2026–28",
        "title": "UIL 2A Division II District 5",
        "body": "Clarendon and five regional opponents are assigned to District 5 for this realignment cycle.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "UIL official football alignment"
      },
      {
        "date": "2026 season",
        "title": "Bronco printable calendar published",
        "body": "Clarendon CISD's current website displays a 26/27 Bronco football schedule link and ticket navigation.",
        "sourceUrl": "https://www.clarendonisd.net/",
        "sourceLabel": "Clarendon CISD official school site"
      },
      {
        "date": "2026",
        "title": "Brenton Whitaker on current coaching list",
        "body": "Current 2026 varsity history names Brenton Whitaker; the district posts gameday and team updates under Coach Whitaker.",
        "sourceUrl": "https://www.maxpreps.com/tx/clarendon/clarendon-broncos/football/history/",
        "sourceLabel": "Dated staff roster with first-party corroboration"
      }
    ],
    "overview": [
      "Clarendon is the Broncos in Donley County, not the other towns using a Broncos mascot.",
      "The 2026–28 UIL assignment is 2A Division II District 5, with matchups against Wellington, Wheeler and Shamrock.",
      "Current school-owned posts use Coach Whitaker, and 2026 roster history supplies Brenton Whitaker's full name.",
      "Game dates, admission and live win-loss standings need school/host confirmation; a cash-only away notice does not set all home-ticket policies."
    ],
    "faq": [
      {
        "question": "Who coaches Clarendon football in 2026?",
        "answer": "2026 varsity history lists Brenton Whitaker, and Clarendon CISD's current athletics feed publishes posts by Coach Whitaker."
      },
      {
        "question": "What football district includes Clarendon in 2026?",
        "answer": "UIL Class 2A Division II District 5."
      },
      {
        "question": "Where are Clarendon varsity football schedules?",
        "answer": "Clarendon CISD links its printable 26/27 Bronco football schedule from the official district site."
      }
    ]
  },
  "clarksville": {
    "slug": "clarksville",
    "intro": "Clarksville's Tigers compete in UIL 2A Division II District 10 in 2026–28 with Big Sandy, Detroit, Linden-Kildare, Maud and Simms Bowie. A 2026 program history listing identifies Thavis Miller as head coach, and the team's October 24 Big Sandy win was posted as a named, dated game result. That is not an official final 2026 district standing.",
    "theme": {
      "accentHex": "#7B4B35",
      "label": "Original TexasDefined editorial warm-brown panel, not a Clarksville logo or published uniform palette."
    },
    "seo": {
      "title": "Clarksville Tigers Football | Thavis Miller & 2026 UIL District 10",
      "description": "Clarksville Tigers football in Red River County: 2026 UIL 2A Division II District 10, Thavis Miller and dated Big Sandy result."
    },
    "coach": {
      "name": "Thavis Miller",
      "title": "2026 head football coach in current team history and season listing",
      "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/history/",
      "sourceLabel": "MaxPreps 2026–27 named head-coach record; first-party role not independently located",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "1500 W Main St, Clarksville, TX 75426 (school campus, not stadium entry)",
      "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/",
      "sourceLabel": "Current MaxPreps UIL-partner school location",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Clarksville Tigers 2026 schedule and dated finals",
      "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/",
      "sourceLabel": "2026 published schedule and October 24 Big Sandy result",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/schedule/"
    },
    "development": {
      "title": "Season context after the Big Sandy district fixture",
      "body": "The October 24 2026 Big Sandy away game is listed as a 50–14 Clarksville win. UIL's district table includes Detroit, Linden-Kildare, Maud and Simms Bowie as other opponents. A third-party score must be labeled with its date and source rather than inflated into an official current UIL playoff seed or a forecast for the remaining October 30 and November 6 fixtures.",
      "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/",
      "sourceLabel": "MaxPreps October 25 ranking update and game card",
      "verifiedAt": "2026-10-28"
    },
    "season": {
      "record": "Latest individually identified district result: October 24 Big Sandy W 50–14; not a complete verified season record",
      "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/",
      "sourceLabel": "Dated October 24 Big Sandy 50–14 result and remaining fixtures",
      "verifiedAt": "2026-10-28",
      "games": [
        {
          "date": "2026-10-24",
          "opponent": "Big Sandy",
          "site": "Away",
          "district": true,
          "result": "W 50-14"
        }
      ]
    },
    "milestones": [
      {
        "date": "2026 realignment",
        "title": "District 10-2A Division II",
        "body": "Clarksville shares the UIL 2026–28 district with Big Sandy, Detroit, Linden-Kildare, Maud and Simms Bowie.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official UIL table"
      },
      {
        "date": "October 24, 2026",
        "title": "Tigers win at Big Sandy",
        "body": "A current 2026 team page records Clarksville's 50–14 win; later games are still scheduled at the reporting date.",
        "sourceUrl": "https://www.maxpreps.com/tx/clarksville/clarksville-tigers/football/",
        "sourceLabel": "MaxPreps October 25 season snapshot"
      }
    ],
    "overview": [
      "This Clarksville football program is the Red River County Tigers, not a similarly named out-of-state school.",
      "2026 district opponents are established by UIL's 2A Division II District 10 alignment.",
      "The current season history names Thavis Miller; school-controlled confirmation of the full current staffing role remains desirable.",
      "The October 24 Big Sandy final is a dated score snapshot and does not guarantee a district finish or playoff slot."
    ],
    "faq": [
      {
        "question": "Who coaches Clarksville football in 2026?",
        "answer": "The 2026 varsity season history lists Thavis Miller as head coach; the full role is sourced to that roster, not a district appointment notice."
      },
      {
        "question": "What district is Clarksville in?",
        "answer": "UIL 2A Division II District 10 for 2026–28."
      },
      {
        "question": "Did Clarksville beat Big Sandy?",
        "answer": "Its published October 24, 2026 result is a 50–14 win at Big Sandy, subject to corrections by the official teams."
      }
    ]
  },
  "claude": {
    "slug": "claude",
    "intro": "Claude's Mustangs play UIL six-man Class 1A Division I football in District 1, not eleven-man 2A. Claude ISD maintains a first-party 2026 varsity schedule and head-injury return-to-play policy, while its schedule lists Brantlee Lemons head coach. A separate team source dates the program's move into six-man football to 2018.",
    "theme": {
      "accentHex": "#375D86",
      "label": "Original TexasDefined royal-blue editorial treatment; no official Claude image, crest or player photo used."
    },
    "seo": {
      "title": "Claude Mustangs Six-Man Football | Brantlee Lemons & 2026 UIL 1A",
      "description": "Claude Mustangs six-man football: first-party 2026 schedule, Brantlee Lemons, UIL 1A Division I District 1 and school-controlled athletics policy."
    },
    "coach": {
      "name": "Brantlee Lemons",
      "title": "2026 varsity head football coach (school-published schedule)",
      "sourceUrl": "https://www.claudeisd.net/athletics",
      "sourceLabel": "Claude ISD current official athletics schedule; varsity PDF names Brantlee Lemons",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "500 W 5th St, Claude, TX 79019 (school campus, not verified football gate)",
      "sourceUrl": "https://www.claudeisd.net/athletics",
      "sourceLabel": "Claude ISD official contact address",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Claude ISD official 2026 six-man football schedule",
      "sourceUrl": "https://www.claudeisd.net/athletics",
      "sourceLabel": "Current school-owned 2026 football schedule and athletics page",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://www.claudeisd.net/athletics"
    },
    "venue": {
      "name": "Claude Mustangs Field",
      "sourceUrl": "https://sixmanfootball.com/teams/claude-mustangs.1108/",
      "sourceLabel": "Six-Man Football 2026 team profile lists stadium",
      "verifiedAt": "2026-10-28",
      "note": "The stadium name does not prove spectator gate, cash admissions or accessibility arrangements. Verify with Claude ISD."
    },
    "development": {
      "title": "A six-man program distinct from Claude's earlier formats",
      "body": "Independent six-man program history lists Claude's transition to the six-man game in 2018. The 2025 Mustangs went 8–3 in current history records under Brantlee Lemons. The school distributes a 2026 varsity schedule and separately posts return-to-play protocols; neither historical record nor protocol establishes an outcome for unplayed 2026 fixtures.",
      "sourceUrl": "https://sixmanfootball.com/teams/claude-mustangs.1108/",
      "sourceLabel": "Community six-man school history, league, mascot, head coach and stadium",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2018",
        "title": "Six-man era begins",
        "body": "The six-man football team directory dates Claude's six-man start to 2018.",
        "sourceUrl": "https://sixmanfootball.com/teams/claude-mustangs.1108/",
        "sourceLabel": "Six-Man Football history listing"
      },
      {
        "date": "2025",
        "title": "Eight-win season",
        "body": "Year-specific 2025 team history reports 8–3 under coach Brantlee Lemons.",
        "sourceUrl": "https://www.maxpreps.com/tx/claude/claude-mustangs/football/history/",
        "sourceLabel": "MaxPreps season history"
      },
      {
        "date": "2026",
        "title": "2026 varsity schedule and UIL 1A district",
        "body": "Claude ISD posts the varsity schedule; UIL places Claude among the District 1 six-man Division I programs.",
        "sourceUrl": "https://www.claudeisd.net/athletics",
        "sourceLabel": "Official Claude ISD current athletics"
      }
    ],
    "overview": [
      "Claude Mustangs compete in UIL six-man 1A Division I District 1, rather than an eleven-man district.",
      "Claude ISD's first-party 2026 football schedule names Brantlee Lemons as head coach; his 2025 historical record was 8–3.",
      "The school is in Armstrong County, with a campus address on West 5th Street; the game-field name is not an admission-gate instruction.",
      "District opponents and game times may change, so the official athletics calendar controls travel."
    ],
    "faq": [
      {
        "question": "Is Claude six-man or eleven-man football?",
        "answer": "Claude plays UIL Conference 1A Division I six-man football."
      },
      {
        "question": "Who coaches Claude football?",
        "answer": "The published 2026 Claude ISD football schedule identifies Brantlee Lemons as head coach."
      },
      {
        "question": "When did Claude begin six-man play?",
        "answer": "Six-Man Football's team history lists a 2018 start; this is community history, not a separate UIL championship claim."
      }
    ]
  },
  "cleburne": {
    "slug": "cleburne",
    "intro": "The Cleburne Yellow Jackets play 2026–28 UIL 5A Division I District 8. Their school-operated athletics schedule publishes named 2026 finals, home Yellow Jacket Stadium assignments and visiting venues; as of October 23 it showed eight played varsity games and two remaining. February 2026 coverage identifies AJ Sheppard head coach. Cleburne's city address and opponent schedules must not be merged with Cedar Hill's or the former Class 5A league alignment.",
    "theme": {
      "accentHex": "#7B5B34",
      "label": "Original TexasDefined ochre editorial accent, not a copied Yellow Jacket logo or football image."
    },
    "seo": {
      "title": "Cleburne Yellow Jackets Football | 2026 Scores, AJ Sheppard & District 8",
      "description": "Cleburne Yellow Jackets football: school-owned 2026 game scores and stadium listings, head coach AJ Sheppard, UIL 5A Division I District 8."
    },
    "coach": {
      "name": "AJ Sheppard",
      "title": "2026 head football coach confirmed in dated local coverage",
      "sourceUrl": "https://www.ntxvarsitysports.com/cleburne-sports-update-2-5-2026/",
      "sourceLabel": "February 5 2026 Cleburne team report and coach attribution",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Cleburne ISD official varsity football schedule and results",
      "sourceUrl": "https://athletics.c-isd.com/sport/football/boys/?tab=schedule",
      "sourceLabel": "School-operated 2026–27 schedule, dated varsity finals and home/away venues",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://athletics.c-isd.com/sport/football/boys/?tab=schedule"
    },
    "venue": {
      "name": "Yellow Jacket Stadium",
      "sourceUrl": "https://athletics.c-isd.com/sport/football/boys/?tab=schedule",
      "sourceLabel": "Cleburne ISD's own 2026 home varsity venue",
      "verifiedAt": "2026-10-28",
      "note": "Published home game location does not certify a universal stadium entrance, parking rules, bag restrictions or ADA services."
    },
    "season": {
      "record": "0–8 in eight school-listed varsity finals through October 23, 2026; October 30 and November 5 still scheduled",
      "sourceUrl": "https://athletics.c-isd.com/sport/football/boys/?tab=schedule",
      "sourceLabel": "Cleburne High school athletics current scorecard",
      "verifiedAt": "2026-10-28",
      "games": [
        {
          "date": "2026-08-28",
          "opponent": "Granbury",
          "site": "Home",
          "result": "L 27-54"
        },
        {
          "date": "2026-09-03",
          "opponent": "Fort Worth Arlington Heights",
          "site": "Away",
          "result": "L 0-63"
        },
        {
          "date": "2026-09-11",
          "opponent": "Arlington Sam Houston",
          "site": "Home",
          "result": "L 0-62"
        },
        {
          "date": "2026-09-18",
          "opponent": "Mansfield Legacy",
          "site": "Away",
          "district": true,
          "result": "L 14-62"
        },
        {
          "date": "2026-09-25",
          "opponent": "Burleson Centennial",
          "site": "Home",
          "district": true,
          "result": "L 7-55"
        },
        {
          "date": "2026-10-09",
          "opponent": "Midlothian",
          "site": "Away",
          "district": true,
          "result": "L 14-69"
        },
        {
          "date": "2026-10-16",
          "opponent": "Lancaster",
          "site": "Home",
          "district": true,
          "result": "L 0-75"
        },
        {
          "date": "2026-10-23",
          "opponent": "Mansfield Summit",
          "site": "Away",
          "district": true,
          "result": "L 7-55"
        }
      ]
    },
    "development": {
      "title": "District 8 brings a demanding 5A Division I schedule",
      "body": "A February Cleburne-area preview identified AJ Sheppard as head coach and a 2026 eight-team district that includes Cedar Hill, DeSoto, Lancaster, Midlothian, Burleson Centennial and two Mansfield programs. The school-owned final-score feed has eight recorded losses by October 23, but the Cedar Hill and DeSoto games had not yet been completed at that snapshot. These dated results should not be presented as a finalized 2026 record.",
      "sourceUrl": "https://www.ntxvarsitysports.com/cleburne-sports-update-2-5-2026/",
      "sourceLabel": "Cleburne February 2026 re-districting preview",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "February 2026",
        "title": "New 5A Division I District 8 opponents announced",
        "body": "Cleburne was placed in a district with DeSoto, Lancaster, Cedar Hill, Burleson Centennial, Midlothian and Mansfield schools.",
        "sourceUrl": "https://www.ntxvarsitysports.com/cleburne-sports-update-2-5-2026/",
        "sourceLabel": "Local Cleburne sports roundup"
      },
      {
        "date": "August–October 2026",
        "title": "Official game-by-game record",
        "body": "Cleburne ISD published eight final scores from August 28 through October 23 while listing Cedar Hill and DeSoto as later games.",
        "sourceUrl": "https://athletics.c-isd.com/sport/football/boys/?tab=schedule",
        "sourceLabel": "Cleburne High school-controlled game listing"
      }
    ],
    "overview": [
      "Cleburne's Yellow Jackets compete in 5A Division I District 8 for 2026–28.",
      "The 2026 program was coached by AJ Sheppard according to dated Cleburne sports reporting.",
      "Official Cleburne High schedule lists eight 2026 finals through October 23, with a further two varsity dates not yet settled in that source snapshot.",
      "Home Yellow Jacket Stadium is a location designation; host-specific tickets, parking and entrance details require official verification."
    ],
    "faq": [
      {
        "question": "Who is the Cleburne head football coach?",
        "answer": "February 2026 Cleburne sports coverage names AJ Sheppard as the head coach."
      },
      {
        "question": "How many 2026 finals appear in the school's October 23 score feed?",
        "answer": "Eight, with two later varsity games against Cedar Hill and DeSoto still on the school-operated calendar."
      },
      {
        "question": "Where does Cleburne play home games?",
        "answer": "School athletics lists Yellow Jacket Stadium for its 2026 varsity home games; verify the exact entrance and game-day policies directly."
      }
    ]
  },
  "cleveland": {
    "slug": "cleveland",
    "intro": "Cleveland High School's Indians compete in 2026 UIL Class 6A District 13. Cleveland ISD's first-party staff directory identifies Ajani Sanders as the campus athletics coordinator, and its 2026 football roster separately labels him head coach. These complementary sources should not be confused with a different Cleveland High School outside Texas or with a former coaching staff.",
    "theme": {
      "accentHex": "#673E36",
      "label": "Original TexasDefined reddish-slate editorial style, not an official Cleveland Indians logo or copyrighted football photograph."
    },
    "seo": {
      "title": "Cleveland Indians Football | Ajani Sanders, 2026 UIL 6A District 13",
      "description": "Cleveland Texas High Indians football: Ajani Sanders, official campus athletics directory, 2026 UIL 6A District 13, school contacts and source-cautious results."
    },
    "coach": {
      "name": "Ajani Sanders",
      "title": "2026 head football coach on team roster; Cleveland ISD first-party campus athletics coordinator",
      "sourceUrl": "https://www.maxpreps.com/tx/cleveland/cleveland-indians/football/staff/",
      "sourceLabel": "2026 MaxPreps named head coach, cross-checked with Cleveland ISD staff directory",
      "verifiedAt": "2026-10-28"
    },
    "campus": {
      "address": "1600 E Houston St, Cleveland, TX 77327 (current first-party campus address; other directories may be outdated)",
      "sourceUrl": "https://chs.clevelandisd.org/staff/?page_no=25",
      "sourceLabel": "Cleveland High School official campus directory footer and Sanders staff listing",
      "verifiedAt": "2026-10-28"
    },
    "schedule": {
      "label": "Cleveland Texas 2026 varsity football schedule",
      "sourceUrl": "https://www.maxpreps.com/tx/cleveland/cleveland-indians/football/",
      "sourceLabel": "UIL partner current team listing",
      "verifiedAt": "2026-10-28",
      "officialScheduleUrl": "https://chs.clevelandisd.org/"
    },
    "development": {
      "title": "First-party athletics coordinator versus roster title",
      "body": "Cleveland ISD itself calls Ajani Sanders the campus athletics coordinator, and current UIL-partner football staff calls him head coach. A 2025 student athletic handbook independently names him the high-school boys coordinator; that is a year-specific organization chart, not an admission rule. Cleveland's 2025 football archive lists an 0–10 season, which must never be carried forward as its 2026 win-loss or seeding status.",
      "sourceUrl": "https://chs.clevelandisd.org/staff/?page_no=25",
      "sourceLabel": "Cleveland High official 2026 staff page and campus address",
      "verifiedAt": "2026-10-28"
    },
    "milestones": [
      {
        "date": "2024",
        "title": "Previous coaching era",
        "body": "The year-specific 2024 season roster attributes the team to Quirino Silva; it is a historical listing, not a present-tense head-coach claim.",
        "sourceUrl": "https://www.maxpreps.com/tx/cleveland/cleveland-indians/football/history/",
        "sourceLabel": "MaxPreps 2024 coach archive"
      },
      {
        "date": "2025",
        "title": "2025 rebuilding season",
        "body": "The 2025 historical season archive reports an 0–10 mark under Ajani Sanders.",
        "sourceUrl": "https://www.maxpreps.com/tx/cleveland/cleveland-indians/football/history/",
        "sourceLabel": "MaxPreps 2025 football history"
      },
      {
        "date": "2026",
        "title": "UIL 6A District 13",
        "body": "The 2026 official alignment places Cleveland in Class 6A District 13.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6AFB2026.pdf",
        "sourceLabel": "Official UIL 2026 football realignment"
      }
    ],
    "overview": [
      "Cleveland High in this guide is the Liberty County Texas public school, not a school with the same name in another state.",
      "The school's first-party 2026 staff directory confirms Ajani Sanders as campus athletics coordinator; MaxPreps confirms his current football head-coach role.",
      "The 2026 UIL assignment is Conference 6A District 13; division I/II playoff placement is not predetermined by district realignment.",
      "An 0–10 2025 historical record is not evidence for any 2026 final standings; spectator venue and ticket policies require current official school information."
    ],
    "faq": [
      {
        "question": "Who is the head coach of Cleveland, Texas football in 2026?",
        "answer": "The current varsity staff roster names Ajani Sanders; Cleveland ISD's school directory independently lists him as campus athletics coordinator."
      },
      {
        "question": "What UIL football district is Cleveland in?",
        "answer": "Conference 6A District 13 for 2026–28."
      },
      {
        "question": "Is Cleveland's 0–10 record from 2026?",
        "answer": "No. The referenced 0–10 mark is from the 2025 historical season; check current game results before stating 2026 standings."
      }
    ]
  },
  "chilton": {
    "slug": "chilton",
    "intro": "Chilton's Pirates compete in UIL Class 2A Division II District 13 for the 2026–28 cycle. Chilton ISD publishes current sports fixtures and identifies Bennie Huitt as athletic director, while an August 2026 KWTX team preview names him head football coach. That preview calls the 2025 finish 10–2; it is historical, not a verified 2026 season record.",
    "theme": {
      "accentHex": "#324C67",
      "label": "Original TexasDefined navy editorial style, not an official Chilton school color code or logo."
    },
    "seo": {
      "title": "Chilton Pirates Football | Bennie Huitt, 2026 UIL 2A D-II",
      "description": "Chilton Pirates football in Falls County: 2026 UIL district, Bennie Huitt coach, dated 2025 playoff history, official school athletics and game-day caveats."
    },
    "coach": {
      "name": "Bennie Huitt",
      "title": "2026 head coach named by local preseason report; first-party district staff directory independently lists athletic director",
      "sourceUrl": "https://www.kwtx.com/2026/08/13/2-a-days-2026-chilton/?outputType=amp",
      "sourceLabel": "KWTX August 13 2026 preseason team interview; verify staff director at Chilton ISD",
      "verifiedAt": "2026-10-27"
    },
    "schedule": {
      "label": "Chilton ISD current football and athletics calendar",
      "sourceUrl": "https://www.chiltonisd.org/athletics",
      "sourceLabel": "Chilton ISD official athletics feed",
      "verifiedAt": "2026-10-27"
    },
    "development": {
      "title": "Pirates' recent playoff context",
      "body": "A local 2026 season preview records a 10–2 finish and second-round playoff trip in 2025, with 14 returning starters projected for 2026. Preseason projections are not final 2026 scores.",
      "sourceUrl": "https://www.kwtx.com/2026/08/13/2-a-days-2026-chilton/?outputType=amp",
      "sourceLabel": "KWTX 2026 preseason retrospective",
      "verifiedAt": "2026-10-27"
    },
    "milestones": [
      {
        "date": "2025",
        "title": "Ten-win season",
        "body": "KWTX's 2026 preseason preview reports the Pirates ended 2025 at 10–2 and reached the second playoff round.",
        "sourceUrl": "https://www.kwtx.com/2026/08/13/2-a-days-2026-chilton/?outputType=amp",
        "sourceLabel": "KWTX dated August 13 2026"
      },
      {
        "date": "2026–28",
        "title": "UIL realignment to 2A Division II District 13",
        "body": "The current UIL football alignment places Chilton in District 13.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf",
        "sourceLabel": "Official UIL 2026–28 alignment"
      }
    ],
    "overview": [
      "Falls County school; Class 2A Division II District 13 in the current UIL cycle.",
      "Chilton ISD names Bennie Huitt athletic director; 2026 local preview identifies him as head football coach.",
      "2025 10–2 is a specifically dated historical record from local reporting, not the current 2026 final.",
      "District athletics calendar, ticket policy and stadium-entry access should be rechecked for each game."
    ],
    "faq": [
      {
        "question": "What UIL district does Chilton play in for 2026?",
        "answer": "The UIL places the Chilton Pirates in Class 2A Division II District 13 for the 2026–28 alignment."
      },
      {
        "question": "Who coaches Chilton football?",
        "answer": "A KWTX August 2026 team preview identifies Bennie Huitt as head coach; Chilton ISD's current staff directory lists him as athletic director."
      },
      {
        "question": "Is Chilton's 10–2 record a 2026 final?",
        "answer": "No. That is the reported 2025 record cited in a 2026 preseason preview. Use the district's current athletics feed for this season's schedules."
      }
    ]
  },
  "china-spring": {
    "slug": "china-spring",
    "intro": "China Spring's Cougars are in UIL 4A Division I District 12 for 2026–28. The district announced Josh Gregory as head football coach on December 18, 2025 while retaining his athletic-director role, and its current coach directory repeats the combined title. Its 2025–26 all-sports Blue Cards are separate from current ticket inventory; Hudl online tickets and conditional at-gate sales require event-by-event confirmation.",
    "theme": {
      "accentHex": "#2F5370",
      "label": "Original TexasDefined navy editorial accent, not district-supplied brand artwork."
    },
    "seo": {
      "title": "China Spring Cougars Football | Josh Gregory & 2026 4A DI",
      "description": "China Spring Cougars football in McLennan County: verified Josh Gregory appointment, UIL 4A Division I District 12 and official game-day tickets."
    },
    "coach": {
      "name": "Josh Gregory",
      "title": "Current China Spring ISD athletic director and head varsity football coach",
      "sourceUrl": "https://www.chinaspringisd.net/article/2603451/",
      "sourceLabel": "China Spring ISD official December 18 2025 hiring announcement",
      "verifiedAt": "2026-10-27"
    },
    "schedule": {
      "label": "China Spring ISD athletics schedule and official ticket navigation",
      "sourceUrl": "https://www.chinaspringisd.net/page/athletics",
      "sourceLabel": "China Spring ISD official athletics schedule and ticketing instructions",
      "verifiedAt": "2026-10-27"
    },
    "development": {
      "title": "Official tickets and spectator guidance",
      "body": "China Spring ISD links Hudl online ticketing and says gate sales normally remain available. The district's Blue Card described on the page applies to 2025–26 regular-season games for eligible residents age 65 or older; do not presume 2026–27 card validity or seat availability.",
      "sourceUrl": "https://www.chinaspringisd.net/page/athletics",
      "sourceLabel": "China Spring ISD first-party athletics visitor instructions",
      "verifiedAt": "2026-10-27"
    },
    "milestones": [
      {
        "date": "2025-12-18",
        "title": "Josh Gregory appointed head football coach",
        "body": "China Spring ISD publicly appointed athletic director Josh Gregory to also lead varsity football, effective heading into the 2026 season.",
        "sourceUrl": "https://www.chinaspringisd.net/article/2603451/",
        "sourceLabel": "District announcement December 18 2025"
      },
      {
        "date": "2026–28",
        "title": "2026 UIL 4A Division I District 12 placement",
        "body": "UIL's new alignment places China Spring's varsity football program in Class 4A Division I District 12.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/4AD1FB2026.pdf",
        "sourceLabel": "UIL official alignment"
      }
    ],
    "overview": [
      "China Spring in McLennan County is in UIL 4A Division I District 12 for 2026–28.",
      "The current district coaching list unambiguously identifies Josh Gregory as both athletic director and head football coach.",
      "The district's website states it has 19 state championships across all sports, not 19 football titles.",
      "Hudl and on-site ticket availability are operator-controlled and can change by event."
    ],
    "faq": [
      {
        "question": "Who is China Spring's head football coach for 2026?",
        "answer": "Josh Gregory, officially appointed December 18, 2025 and currently listed as head coach and athletic director by China Spring ISD."
      },
      {
        "question": "Is China Spring in UIL 4A Division I?",
        "answer": "Yes. The UIL's 2026–28 realignment lists China Spring in 4A Division I District 12."
      },
      {
        "question": "Does a 2025–26 Blue Card guarantee 2026–27 admission?",
        "answer": "No. The athletics page describes the prior 2025–26 regular-season pass; the current season's card rules, tickets and gate sales require district confirmation."
      }
    ]
  },
  "christoval": {
    "slug": "christoval",
    "intro": "The Christoval Cougars represent Tom Green County in UIL 2A Division I District 4 for 2026–28. Christoval ISD announced Tanner McLean as athletic director and head football coach in 2025, lists him as AD now, and posts 2026 varsity fixtures on its calendar. A published October 30 Forsan home date is a schedule entry, not a verified final score or guaranteed kickoff.",
    "theme": {
      "accentHex": "#A84347",
      "label": "Original TexasDefined brick-red editorial typography, not licensed school insignia or certified hex."
    },
    "seo": {
      "title": "Christoval Cougars Football | Tanner McLean & 2026 UIL 2A",
      "description": "Christoval Cougars football: Tanner McLean's school-announced leadership, UIL 2A Division I District 4 and official Christoval ISD game calendar."
    },
    "coach": {
      "name": "Tanner McLean",
      "title": "Christoval ISD-announced head varsity football coach and current athletic director",
      "sourceUrl": "https://www.christovalisd.org/live-feed?page_no=33",
      "sourceLabel": "Christoval ISD first-party appointment on its live-feed archive",
      "verifiedAt": "2026-10-27"
    },
    "schedule": {
      "label": "Christoval ISD current 2026 football event calendar",
      "sourceUrl": "https://www.christovalisd.org/events",
      "sourceLabel": "Official Christoval ISD 2026 school event calendar",
      "verifiedAt": "2026-10-27"
    },
    "development": {
      "title": "Verify 2026 game times from the district",
      "body": "The district calendar lists varsity Sonora, Ozona, Reagan County, Ballinger and Forsan fixtures in October 2026. Earlier schedule images note that subvarsity times can change; don't convert calendar entries into score results or assume opponent school admission policies.",
      "sourceUrl": "https://www.christovalisd.org/events",
      "sourceLabel": "Christoval ISD live 2026 calendar",
      "verifiedAt": "2026-10-27"
    },
    "milestones": [
      {
        "date": "2025",
        "title": "Christoval hires Tanner McLean",
        "body": "The school announced Tanner McLean as athletic director and head football coach after his tenure at Comanche.",
        "sourceUrl": "https://www.christovalisd.org/live-feed?page_no=33",
        "sourceLabel": "Christoval ISD official appointment announcement"
      },
      {
        "date": "2026-10-30",
        "title": "Forsan home game scheduled",
        "body": "The district calendar lists a varsity home date against Forsan on October 30 at 7 p.m., subject to change. It is not a confirmed result.",
        "sourceUrl": "https://www.christovalisd.org/events",
        "sourceLabel": "Christoval ISD official October 2026 events"
      }
    ],
    "overview": [
      "Christoval's Cougars represent Tom Green County in 2A Division I District 4.",
      "Current district staff identifies Tanner McLean as AD and its earlier appointment names him varsity head coach.",
      "The Oct 30 Forsan fixture is a scheduled future event as of Oct 27; no completed-game record inferred.",
      "Some away schools impose cashless tickets or clear-bag rules; verify that specific host rather than assigning blanket home policies."
    ],
    "faq": [
      {
        "question": "Who coaches Christoval football?",
        "answer": "Christoval ISD announced Tanner McLean as head football coach and athletic director and still lists him on its school staff."
      },
      {
        "question": "What is Christoval's 2026 UIL football district?",
        "answer": "UIL 2A Division I District 4 for the 2026–28 cycle."
      },
      {
        "question": "Where can families confirm Christoval game-day changes?",
        "answer": "Use Christoval ISD's events calendar and the specific home or away host's tickets and access instructions."
      }
    ]
  },
  "cibolo-steele": {
    "slug": "cibolo-steele",
    "intro": "The Steele Knights in Cibolo compete in UIL 6A District 27 in 2026–28. Steele High School's current athletics page names David Saenz head coach/athletic coordinator. The district's coaching and venue material should be used for current schedule and fan policies; the campus address at 1300 FM 1103 is not independent evidence of a spectator stadium gate.",
    "theme": {
      "accentHex": "#48656D",
      "label": "Original TexasDefined slate-blue accent, not Steele official trademark, helmet or uniform graphic."
    },
    "seo": {
      "title": "Cibolo Steele Knights Football | David Saenz & 2026 6A",
      "description": "Steele Knights football in Guadalupe County: school-verified coach David Saenz, UIL 6A District 27, official athletics and Cibolo fan expectations."
    },
    "coach": {
      "name": "David Saenz",
      "title": "Steele High School head football coach and athletic coordinator",
      "sourceUrl": "https://www.scucisd.org/o/steele/page/athletics/",
      "sourceLabel": "Steele High School first-party athletics director/coach",
      "verifiedAt": "2026-10-27"
    },
    "schedule": {
      "label": "Steele High official sports schedules and fan/ticket information",
      "sourceUrl": "https://www.scucisd.org/o/steele/page/athletics/",
      "sourceLabel": "SCUC ISD Steele athletics page",
      "verifiedAt": "2026-10-27"
    },
    "development": {
      "title": "SCUC ISD stadium etiquette and entrances",
      "body": "Steele athletics publishes parent and fan expectations and links sports schedules and ticket information. The high school's campus listing at 1300 FM 1103 is not proof of the specific game stadium gate, parking, accessible entrance, or checkout conditions.",
      "sourceUrl": "https://www.scucisd.org/o/steele/staff?page_no=7",
      "sourceLabel": "SCUC ISD school staff and campus address; official athletics page for fan policies",
      "verifiedAt": "2026-10-27"
    },
    "milestones": [
      {
        "date": "2026–28",
        "title": "Steele joins UIL 6A District 27",
        "body": "Official UIL alignment lists the Knights in Class 6A District 27.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf",
        "sourceLabel": "UIL alignment"
      },
      {
        "date": "2026",
        "title": "David Saenz leads the Knights",
        "body": "The school athletics directory lists David Saenz as its head coach/athletic coordinator for this season.",
        "sourceUrl": "https://www.scucisd.org/o/steele/page/athletics/",
        "sourceLabel": "Steele High School official athletics staff"
      }
    ],
    "overview": [
      "Steele is Cibolo's UIL Class 6A District 27 varsity football program in Guadalupe County.",
      "The district's current athletics page names David Saenz head coach; school campus and stadium venue are not conflated.",
      "Current school schedule links and fan conduct requirements are first-party; don't infer ticket inventory.",
      "School colors, trademarks, player photos and logos are not reproduced from outside rights holders."
    ],
    "faq": [
      {
        "question": "Who is Cibolo Steele's head football coach?",
        "answer": "David Saenz is listed as head coach and athletic coordinator on Steele High School's first-party athletics page."
      },
      {
        "question": "What UIL district is Steele football in for 2026?",
        "answer": "UIL Class 6A District 27 for the 2026–28 alignment."
      },
      {
        "question": "Is 1300 FM 1103 the game-day spectator gate?",
        "answer": "Not necessarily. That is Steele High School's campus address; the host athletics department must confirm the actual stadium, gate and parking for a specific game."
      }
    ]
  },
  "cisco": {
    "slug": "cisco",
    "intro": "The Cisco Loboes represent Eastland County in UIL 2A Division I District 5 for 2026–28. Cisco ISD directly names Kevin Stennett head football coach and athletic director and separately lists Chesley Field at 901 W. Third Street. That published facility address identifies the field, but not a promised game-day gate, ticket inventory or accessible entrance.",
    "theme": {
      "accentHex": "#785A33",
      "label": "Original TexasDefined warm-gold editorial accent, not Cisco Loboes official licensed artwork."
    },
    "seo": {
      "title": "Cisco Loboes Football | Kevin Stennett, Chesley Field & 2026",
      "description": "Cisco Loboes football in Eastland County: UIL 2A Division I District 5, first-party coach Kevin Stennett, Chesley Field and official athletics sources."
    },
    "coach": {
      "name": "Kevin Stennett",
      "title": "Cisco ISD listed head football coach and athletic director",
      "sourceUrl": "https://www.ciscoisd.net/37047_3",
      "sourceLabel": "Cisco ISD first-party football coaching staff",
      "verifiedAt": "2026-10-27"
    },
    "venue": {
      "name": "Chesley Field",
      "address": "901 W 3rd St, Cisco, TX 76437",
      "note": "Cisco ISD's facilities directory expressly identifies Chesley Field at this address; it does not independently certify the spectator ticket gate, event parking or ADA route.",
      "sourceUrl": "https://ciscoisd.net/50644_2",
      "sourceLabel": "Cisco ISD official athletics facility addresses",
      "verifiedAt": "2026-10-27"
    },
    "schedule": {
      "label": "Cisco ISD Lobo football resources and athletics broadcasts",
      "sourceUrl": "https://ciscoisd.net/50644_2",
      "sourceLabel": "Cisco ISD official athletics page includes Lobo football and official broadcast links",
      "verifiedAt": "2026-10-27"
    },
    "milestones": [
      {
        "date": "2026",
        "title": "Kevin Stennett listed as Loboes head coach",
        "body": "Cisco ISD football coaching page identifies Kevin Stennett head coach, while athletics lists him as athletic director.",
        "sourceUrl": "https://www.ciscoisd.net/37047_3",
        "sourceLabel": "First-party coach and athletic director directory"
      },
      {
        "date": "2026–28",
        "title": "UIL 2A Division I District 5",
        "body": "The UIL places Cisco in Class 2A Division I District 5 for the current alignment cycle.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL official alignment"
      }
    ],
    "overview": [
      "Cisco Loboes football represents Eastland County in UIL 2A Division I District 5.",
      "Kevin Stennett is named head football coach by Cisco ISD and athletic director in its athletics office.",
      "Chesley Field is specifically named at 901 W Third Street on the school district facilities page.",
      "Football game ticket options, fan entry and live results remain season- and organizer-dependent."
    ],
    "faq": [
      {
        "question": "Who is Cisco's head football coach?",
        "answer": "Cisco ISD names Kevin Stennett head coach on its Lobo football page and athletic director on its athletics page."
      },
      {
        "question": "Where is Chesley Field in Cisco?",
        "answer": "Cisco ISD lists Chesley Field at 901 West Third Street, Cisco, Texas. Confirm the event's exact spectator entrance with the host."
      },
      {
        "question": "What UIL division is Cisco in?",
        "answer": "Cisco plays in Class 2A Division I District 5 under the 2026–28 football alignment."
      }
    ]
  }
};

export function getBatch010FootballProgramEditorial(slug: string): FootballProgramEditorial | undefined {
  return BATCH010_EDITORIAL[slug];
}
