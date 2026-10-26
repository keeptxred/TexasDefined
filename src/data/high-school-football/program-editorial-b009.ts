import type { FootballProgramEditorial } from './program-editorial';

// Five individually sourced programs in Batch 009. No unlicensed imagery or inferred final 2026 record.
const BATCH009_EDITORIAL: Record<string, FootballProgramEditorial> = {
  "carrollton-turner": {
    "slug": "carrollton-turner",
    "intro": "R. L. Turner High School's Lions are a distinct CFBISD program in UIL 5A Division I District 6 alongside Creekview and Newman Smith. Current school staff names Michael Farda head football coach and campus athletic coordinator. An October 15 football feed still showed later district games as future fixtures; it must not be presented as a complete October 26 record.",
    "theme": {
      "accentHex": "#60416A",
      "label": "Original TexasDefined purple-gray editorial treatment, not an official R. L. Turner school color or logo."
    },
    "seo": {
      "title": "Carrollton R. L. Turner Lions Football | Michael Farda & 2026 District 6",
      "description": "R. L. Turner Lions football guide: Michael Farda, UIL 5A Division I District 6, school vs Standridge Stadium and dated season results."
    },
    "coach": {
      "name": "Michael Farda",
      "title": "Head Football Coach / High School Athletic Coordinator",
      "sourceUrl": "https://turner.cfbisd.edu/campus-information/staff-directory",
      "sourceLabel": "R. L. Turner High School official staff directory",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "1600 S Josey Ln, Carrollton, TX 75006 (school campus; not football entry gate)",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/",
      "sourceLabel": "UIL-partner campus listing",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Turner varsity football results and scheduled fixtures",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/schedule/",
      "sourceLabel": "MaxPreps schedule updated October 15, before the October 23 round",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.cfbisd.edu/departments/athletics"
    },
    "venue": {
      "name": "Standridge Stadium",
      "address": "1330 Valwood Pkwy, Carrollton, TX 75006",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "CFBISD athletics stadium and ticket information",
      "verifiedAt": "2026-10-26",
      "note": "The district stadium is separate from Turner High's Josey Lane campus; game venue, bags, tickets and accessibility are event-specific."
    },
    "season": {
      "record": "1-5 in the October 15 schedule snapshot; later October results not certified by this source",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/schedule/",
      "sourceLabel": "MaxPreps 2026 dated schedule and final-score snapshot",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-08-28",
          "opponent": "Ranchview",
          "site": "Away",
          "result": "L 27-41"
        },
        {
          "date": "2026-09-04",
          "opponent": "Wilmer-Hutchins",
          "site": "Home",
          "result": "W 39-32"
        },
        {
          "date": "2026-10-02",
          "opponent": "Creekview",
          "site": "Home",
          "district": true,
          "result": "L 7-21"
        },
        {
          "date": "2026-10-09",
          "opponent": "Highland Park",
          "site": "Away",
          "district": true,
          "result": "L 7-62"
        }
      ]
    },
    "development": {
      "title": "The Carrollton district campuses are not the same football team",
      "body": "Turner, Creekview and Newman Smith play in the same 2026 5A Division I District 6 but maintain independent coaching staffs and results. Turner played Ranchview in a season opener even though Ranchview is placed in 4A Division I District 4. Shared CFBISD venue operations do not make these school records interchangeable.",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "Official CFBISD four-campus athletics index",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2025 season",
        "title": "Five-win Lions season",
        "body": "The season-history archive records 5-5 in 2025 under Michael Farda, distinct from unfinished 2026 results.",
        "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/history/",
        "sourceLabel": "MaxPreps annual history"
      },
      {
        "date": "September 4, 2026",
        "title": "Turner defeats Wilmer-Hutchins",
        "body": "The October 15 schedule feed records a 39-32 non-district victory.",
        "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/schedule/",
        "sourceLabel": "MaxPreps dated schedule"
      },
      {
        "date": "October 2, 2026",
        "title": "District meeting with Creekview",
        "body": "Turner lost 21-7 to Creekview; this is a Carrollton-school rivalry game, not a shared roster.",
        "sourceUrl": "https://www.maxpreps.com/tx/carrollton/turner-lions/football/schedule/",
        "sourceLabel": "MaxPreps dated district final"
      }
    ],
    "overview": [
      "Turner's mascot is the Lions and its head coach is Michael Farda, independently named by the official school staff directory.",
      "UIL 2026–28 assigns Turner to 5A Division I District 6, also containing Creekview and Newman Smith.",
      "Ranchview is in the same CFBISD system but a different 4A district; the varsity programs should not be combined.",
      "CFBISD manages Standridge Stadium; the school campus and stadium have different addresses."
    ],
    "faq": [
      {
        "question": "Who is R. L. Turner's head football coach?",
        "answer": "The school's current official directory identifies Michael Farda as head football coach and high-school athletic coordinator."
      },
      {
        "question": "Is Turner in the same football district as Ranchview?",
        "answer": "No. Turner is in UIL 5A Division I District 6 in 2026–28, while Ranchview competes in 4A Division I District 4."
      },
      {
        "question": "Where should visiting fans check stadium information?",
        "answer": "Use CFBISD Athletics for Standridge Stadium and event-specific tickets, directions, clear-bag and accessibility instructions."
      }
    ]
  },
  "carthage": {
    "slug": "carthage",
    "intro": "The Carthage Bulldogs entered the 2026 season as defending Class 4A Division II state champions after completing 2025 as the program's eleventh football title. Coach Scott Surratt is named on the team's first-party current varsity staff. Carthage's own athletics site reports a 37-13 October 23 district win against Pleasant Grove, and controls the Bulldog Stadium schedule and online tickets.",
    "theme": {
      "accentHex": "#A52D31",
      "label": "Original TexasDefined cardinal editorial palette; Carthage UIL records list red and white, but no official logo or copyrighted photography is used."
    },
    "seo": {
      "title": "Carthage Bulldogs Football | Scott Surratt, 11 Titles & 2026 Scores",
      "description": "Carthage Bulldogs football: first-party Scott Surratt coaching, 2025 state title, 2026 District 8 results, Bulldog Stadium and official ticket policy."
    },
    "coach": {
      "name": "Scott Surratt",
      "title": "Athletic Director and Head Football Coach",
      "sourceUrl": "https://www.carthagebulldogs.org/sport/football/boys/?tab=staff",
      "sourceLabel": "Carthage official varsity football staff directory",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "1600 W Panola St, Carthage, TX 75633 (campus; check Bulldog Stadium event entry)",
      "sourceUrl": "https://www.maxpreps.com/tx/carthage/carthage-bulldogs/football/",
      "sourceLabel": "UIL-partner school campus address",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Official 2026 varsity schedule and confirmed scores",
      "sourceUrl": "https://www.carthagebulldogs.org/sport/football/boys/?tab=schedule",
      "sourceLabel": "Official Carthage Bulldogs 2026 schedule",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.carthagebulldogs.org/sport/football/boys/?tab=schedule"
    },
    "venue": {
      "name": "Bulldog Stadium",
      "sourceUrl": "https://www.carthagebulldogs.org/sport/football/boys/?tab=schedule",
      "sourceLabel": "Official Carthage athletics lists home varsity games at Bulldog Stadium",
      "verifiedAt": "2026-10-26",
      "note": "Official ticket site controls sales and gate information; do not interpret the school's address as one certified entrance."
    },
    "season": {
      "record": "7-0 through October 23, 2026, from seven listed varsity finals",
      "sourceUrl": "https://www.carthagebulldogs.org/",
      "sourceLabel": "Carthage official 2026 final score card and current calendar",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-08-28",
          "opponent": "Henderson",
          "site": "Away",
          "result": "W 49-10"
        },
        {
          "date": "2026-09-04",
          "opponent": "Pine Tree",
          "site": "Home",
          "result": "W 67-36"
        },
        {
          "date": "2026-09-18",
          "opponent": "Spring Legacy",
          "site": "Home",
          "result": "W 41-14"
        },
        {
          "date": "2026-09-25",
          "opponent": "West Orange-Stark",
          "site": "Away",
          "result": "W 23-7"
        },
        {
          "date": "2026-10-09",
          "opponent": "Pittsburg",
          "site": "Away",
          "district": true,
          "result": "W 62-35"
        },
        {
          "date": "2026-10-15",
          "opponent": "Spring Hill",
          "site": "Away",
          "district": true,
          "result": "W 63-13"
        },
        {
          "date": "2026-10-23",
          "opponent": "Pleasant Grove",
          "site": "Home",
          "district": true,
          "result": "W 37-13"
        }
      ]
    },
    "development": {
      "title": "Eleven state titles, with the next one still unwon",
      "body": "Carthage claimed its eleventh football state title in the 2025 season, making the 2026 campaign a bid for a possible twelfth—not an already secured title. The Bulldogs began 2026 7-0 with the October 23 official Pleasant Grove final. Scott Surratt remains the school-confirmed head coach. School-owned ticketing, roster and schedule pages carry more weight than a preseason projection.",
      "sourceUrl": "https://www.kltv.com/2026/08/12/next-one-carthage-bulldogs-relish-process-quest-12th-title/",
      "sourceLabel": "KLTV contemporaneous 2026 profile and 11-title count",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2008–2010",
        "title": "Early Surratt-era three-peat",
        "body": "UIL records Carthage's three consecutive 3A-era football state crowns in 2008, 2009 and 2010.",
        "sourceUrl": "https://www.uiltexas.org/100/football",
        "sourceLabel": "UIL centennial coach history"
      },
      {
        "date": "2025",
        "title": "Eleventh state football title",
        "body": "Carthage won the 2025 Class 4A Division II championship; the 2026 season started with aspirations for title number twelve.",
        "sourceUrl": "https://www.kltv.com/2026/08/12/next-one-carthage-bulldogs-relish-process-quest-12th-title/",
        "sourceLabel": "KLTV August 2026 retrospective"
      },
      {
        "date": "October 23, 2026",
        "title": "Bulldogs defeat Pleasant Grove",
        "body": "The official athletic home scoreboard lists the varsity 37-13 district final.",
        "sourceUrl": "https://www.carthagebulldogs.org/",
        "sourceLabel": "Official Carthage Athletics October 23 final"
      }
    ],
    "overview": [
      "Carthage's first-party athletic site names Scott Surratt head football coach and athletics director.",
      "The Bulldogs are the defending 2025 Class 4A Division II state champions, with 11 program football championships entering 2026.",
      "The source-backed record through October 23 is 7-0, a dated regular-season standing—not a 2026 title or playoff guarantee.",
      "Bulldog Stadium home games and the school-controlled Hometown Ticketing link require event-specific checks; TexasDefined is not the official ticket seller."
    ],
    "faq": [
      {
        "question": "How many state football championships has Carthage won entering 2026?",
        "answer": "Carthage entered 2026 with eleven program state football titles, including its 2025 Class 4A Division II championship."
      },
      {
        "question": "Who coaches Carthage football?",
        "answer": "Scott Surratt is the current coach listed on the official Carthage Bulldogs varsity staff page."
      },
      {
        "question": "Where can fans buy official Carthage football tickets?",
        "answer": "Use the official Carthage Athletics ticket-information page and linked Hometown Ticketing portal; TexasDefined does not sell school-issued tickets."
      }
    ]
  },
  "castle-hills": {
    "slug": "castle-hills",
    "intro": "The Christian School at Castle Hills Eagles play TAPPS six-man football, not UIL 1A–6A football. Castle Hills' first-party 2026 staff and football pages identify Matt Garza as the varsity head coach, with assistant Andrew Anderson. The school publishes a football visitor guide at Wheatley Heights Sports Complex, which is different from its Northwest Military Highway academic campus.",
    "theme": {
      "accentHex": "#294B57",
      "label": "Original TexasDefined muted teal editorial styling, not a certified school uniform color or reused Eagles logo."
    },
    "seo": {
      "title": "Castle Hills Eagles Six-Man Football | Matt Garza & Visitor Guide",
      "description": "Christian School at Castle Hills Eagles TAPPS six-man football: Matt Garza, 2026 program sources, Wheatley Heights stadium and official visitor guidance."
    },
    "coach": {
      "name": "Matt Garza",
      "title": "Varsity Head Football Coach / Defensive Coordinator",
      "sourceUrl": "https://castlehills.school/football/",
      "sourceLabel": "The Christian School at Castle Hills official football staff listing",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "2216 NW Military Hwy, San Antonio, TX 78213 (school campus; away from stadium)",
      "sourceUrl": "https://castlehills.school/visitors/",
      "sourceLabel": "School-controlled athletics visitors' guide",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Castle Hills 2026 TAPPS six-man schedule and team updates",
      "sourceUrl": "https://www.maxpreps.com/tx/san-antonio/the-christian-school-at-castle-hills-eagles/football/",
      "sourceLabel": "2026 MaxPreps TAPPS school schedule, independently cross-check school event page",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://castlehills.school/football/"
    },
    "venue": {
      "name": "Wheatley Heights Sports Complex",
      "address": "200 Noblewood Dr, San Antonio, TX 78220",
      "sourceUrl": "https://castlehills.school/visitors/",
      "sourceLabel": "First-party Castle Hills football visitor guide explicitly names external facility and parking",
      "verifiedAt": "2026-10-26",
      "note": "The first-party visitor guide describes the main parking lot, restrooms, and concessions; posted admission prices differ across its current and older school-hosted guides, so recheck before traveling."
    },
    "development": {
      "title": "A TAPPS six-man school with two separate locations",
      "body": "The Christian School at Castle Hills uses its Northwest Military Highway address for the academic campus but directs football visitors to Wheatley Heights Sports Complex on Noblewood Drive. The varsity program competes in TAPPS Six-Man Division I District 3 in the 2026 history snapshot, and is distinct from the UIL 1A six-man classifications. School-specific visitor rules take priority over generalized stadium claims.",
      "sourceUrl": "https://castlehills.school/visitors/",
      "sourceLabel": "Castle Hills official varsity football visitors' guide",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2025 season",
        "title": "Six-man Eagles recorded 7-4",
        "body": "The 2025 season history lists 7-4 and a 3-0 district record under Matt Garza; no 2026 final record is implied.",
        "sourceUrl": "https://www.maxpreps.com/tx/san-antonio/the-christian-school-at-castle-hills-eagles/football/history/",
        "sourceLabel": "MaxPreps TAPPS year-specific season archive"
      },
      {
        "date": "2026",
        "title": "Varsity program led by Matt Garza",
        "body": "Castle Hills' first-party football page names Matt Garza varsity coach, with Andrew Anderson on the varsity staff.",
        "sourceUrl": "https://castlehills.school/football/",
        "sourceLabel": "School program staff page"
      },
      {
        "date": "2026 visitor information",
        "title": "Football hosted away from academic campus",
        "body": "First-party visitor instructions direct supporters to Wheatley Heights Sports Complex on Noblewood Drive.",
        "sourceUrl": "https://castlehills.school/visitors/",
        "sourceLabel": "School official visitor guide"
      }
    ],
    "overview": [
      "Castle Hills is a TAPPS private-school six-man football program in San Antonio, not a member of the current UIL football district dataset.",
      "The school identifies Matt Garza as varsity head coach and Andrew Anderson as assistant.",
      "Official visitors must use the Wheatley Heights Sports Complex venue directions rather than the academic campus address.",
      "Admission rates differ across separately published school-owned visitor pages, so this profile avoids unverified current pricing."
    ],
    "faq": [
      {
        "question": "Does Castle Hills compete in UIL football?",
        "answer": "No. Its 2026 season listings place the Eagles in TAPPS Six-Man Division I District 3."
      },
      {
        "question": "Who coaches Castle Hills varsity football?",
        "answer": "Matt Garza is listed as varsity head football coach on the Christian School at Castle Hills official football page."
      },
      {
        "question": "Where do the Eagles host varsity football?",
        "answer": "The school-controlled visitor guide identifies Wheatley Heights Sports Complex, 200 Noblewood Drive, San Antonio, separate from the academic campus."
      }
    ]
  },
  "castroville-medina-valley": {
    "slug": "castroville-medina-valley",
    "intro": "The Medina Valley Panthers returned from UIL 6A competition to 5A Division I District 14 for 2026. Head coach Andrew Britt leads a flexbone option offense that opened 8-0 following the October 23 63-10 win over MacArthur at Panther Stadium in Castroville, keeping their bid for a second straight district championship alive rather than already won.",
    "theme": {
      "accentHex": "#2D6042",
      "label": "Original TexasDefined evergreen editorial treatment for the Panthers, not an official school insignia or licensed team image."
    },
    "seo": {
      "title": "Castroville Medina Valley Panthers Football | Andrew Britt & 2026 8-0 Start",
      "description": "Medina Valley Panthers: Andrew Britt's flexbone offense, UIL 5A Division I District 14, October 23 MacArthur 63-10 and Panther Stadium."
    },
    "coach": {
      "name": "Andrew Britt",
      "title": "Head football coach in 2026",
      "sourceUrl": "https://gmg-ksat-prod.cdn.arcpublishing.com/sports/2026/08/20/medina-valley-panthers-drop-to-class-5a-eyeing-district-title-defense/",
      "sourceLabel": "KSAT August 20, 2026 season interview and head coach verification",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "8395 FM 471 S, Castroville, TX 78009 (campus, not spectator entrance)",
      "sourceUrl": "https://www.maxpreps.com/tx/castroville/medina-valley-panthers/football/schedule/",
      "sourceLabel": "UIL partner high school profile address",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Medina Valley athletics and 2026 Panther schedule",
      "sourceUrl": "https://www.mvisd.com/apps/pages/index.jsp?type=d&uREC_ID=4387644",
      "sourceLabel": "Official Medina Valley ISD athletics hub",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.mvisd.com/apps/pages/index.jsp?type=d&uREC_ID=4387644"
    },
    "venue": {
      "name": "Panther Stadium",
      "sourceUrl": "https://www.expressnews.com/sports/high-school/article/medina-valley-rushing-duo-powers-panthers-22492130.php",
      "sourceLabel": "October 23, 2026 game reporting places MacArthur final at Panther Stadium in Castroville",
      "verifiedAt": "2026-10-26",
      "note": "The published stadium name is not a confirmed 2026 spectator gate or ADA path; check district game-day information."
    },
    "season": {
      "record": "8-0 overall and 5-0 District 14-5A Division I through October 23, 2026",
      "sourceUrl": "https://www.expressnews.com/sports/high-school/article/medina-valley-rushing-duo-powers-panthers-22492130.php",
      "sourceLabel": "October 24 San Antonio Express-News district standings and 63-10 final",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-08-29",
          "opponent": "Churchill",
          "site": "Away",
          "result": "W 59-21"
        },
        {
          "date": "2026-09-05",
          "opponent": "Warren",
          "site": "Away",
          "result": "W 63-20"
        },
        {
          "date": "2026-09-11",
          "opponent": "United South",
          "site": "Home",
          "result": "W 30-19"
        },
        {
          "date": "2026-09-25",
          "opponent": "Nixon",
          "site": "Home",
          "district": true,
          "result": "W 52-24"
        },
        {
          "date": "2026-10-02",
          "opponent": "Southside",
          "site": "Away",
          "district": true,
          "result": "W 62-7"
        },
        {
          "date": "2026-10-09",
          "opponent": "Winn",
          "site": "Home",
          "district": true,
          "result": "W 59-0"
        },
        {
          "date": "2026-10-16",
          "opponent": "Laredo Martin",
          "site": "Away",
          "district": true,
          "result": "W 84-0"
        },
        {
          "date": "2026-10-23",
          "opponent": "San Antonio MacArthur",
          "site": "Home",
          "district": true,
          "result": "W 63-10"
        }
      ]
    },
    "development": {
      "title": "From 6A to 5A with a successful flexbone approach",
      "body": "Medina Valley played Class 6A football during the 2024–25 cycle, then rejoined 5A Division I in 2026. Coach Andrew Britt switched to a flexbone/triple-option rushing attack in 2024; the 2026 first-year starting quarterback Hunter Hurtado and runners Kourtney Bratcher and Kevin Straughter powered the unbeaten start. The October 23 63-10 home victory did not settle the remaining district schedule.",
      "sourceUrl": "https://www.expressnews.com/sports/high-school/article/football-medina-valley-flexbone-option-offense-22477166.php",
      "sourceLabel": "October 2026 Express-News flexbone analysis and coach history",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2025",
        "title": "Ten-win season in Class 6A",
        "body": "The 2025 Panthers finished 10-3 with a district championship in the prior Class 6A alignment.",
        "sourceUrl": "https://www.maxpreps.com/tx/castroville/medina-valley-panthers/football/history/",
        "sourceLabel": "MaxPreps year-specific program history"
      },
      {
        "date": "August 2026",
        "title": "Return to 5A Division I",
        "body": "The school moved back from 6A to UIL 5A Division I District 14 for the current two-year realignment cycle.",
        "sourceUrl": "https://gmg-ksat-prod.cdn.arcpublishing.com/sports/2026/08/20/medina-valley-panthers-drop-to-class-5a-eyeing-district-title-defense/",
        "sourceLabel": "KSAT 2026 team preview"
      },
      {
        "date": "October 23, 2026",
        "title": "Panthers defeat MacArthur 63-10",
        "body": "A reported 458-yard team rushing attack helped Medina Valley improve to 8-0 and 5-0 in district.",
        "sourceUrl": "https://www.expressnews.com/sports/high-school/article/medina-valley-rushing-duo-powers-panthers-22492130.php",
        "sourceLabel": "San Antonio Express-News firsthand October 23 coverage"
      }
    ],
    "overview": [
      "Medina Valley is the Panthers program in Castroville, with UIL 2026–28 5A Division I District 14 alignment.",
      "Andrew Britt is the current head coach; the 2026 offense uses a flexbone/triple-option scheme rather than an assumed generic spread system.",
      "The 2026 Panthers were 8-0 through October 23 after beating MacArthur; remaining games and postseason qualification were not yet settled.",
      "Panther Stadium is the site of the October 23 game, with parking and accessibility subject to district event confirmation."
    ],
    "faq": [
      {
        "question": "What is Medina Valley's UIL district in 2026?",
        "answer": "The Panthers returned to Class 5A Division I and compete in District 14 for the 2026–28 realignment."
      },
      {
        "question": "Who coaches Medina Valley?",
        "answer": "Andrew Britt is the current Medina Valley football coach in 2026, according to KSAT's August season preview and October reporting."
      },
      {
        "question": "Did Medina Valley complete an undefeated 2026 season?",
        "answer": "Not yet. The team was 8-0 through October 23, but its remaining games and postseason were still ahead."
      }
    ]
  },
  "cayuga": {
    "slug": "cayuga",
    "intro": "Cayuga ISD's Wildcats compete in UIL 2A Division I District 10 in 2026–28. The official district athletics page names Jacob Magee athletic director and head football coach, and its own football page publishes downloadable schedules with a reminder that game times can change. The school's physical campus is near Tennessee Colony in Anderson County, not a stadium address inferred from the Cayuga mailing name.",
    "theme": {
      "accentHex": "#9C5632",
      "label": "Original TexasDefined warm copper editorial accent; no claimed Cayuga uniform color, logo or school photography."
    },
    "seo": {
      "title": "Cayuga Wildcats Football | Jacob Magee, 2026 UIL District 10 & Schedules",
      "description": "Cayuga Wildcats football guide: official coach Jacob Magee, UIL 2A Division I District 10, Anderson County campus and first-party 2026 schedules."
    },
    "coach": {
      "name": "Jacob Magee",
      "title": "Athletic Director and Head Football Coach",
      "sourceUrl": "https://www.cayugaisd.com/athletics",
      "sourceLabel": "Cayuga ISD official 2026 athletics coaching roster",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "17750 N US Hwy 287, Tennessee Colony, TX 75861 (school campus; stadium entrance unverified)",
      "sourceUrl": "https://www.cayugaisd.com/football",
      "sourceLabel": "Cayuga ISD official football page physical campus address",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Cayuga ISD 2026 football schedules",
      "sourceUrl": "https://www.cayugaisd.com/football",
      "sourceLabel": "Official district downloadable season schedules and warning that start times may change",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.cayugaisd.com/football"
    },
    "development": {
      "title": "Use school-controlled schedules before inferred current standings",
      "body": "Cayuga ISD expressly publishes downloadable 2026 football schedules and cautions that times may change through SportsYou. UIL realignment for 2026–28 places the Wildcats in 2A Division I District 10, a change from their 2025 district. The older MaxPreps season-history entry reports 6-5 in 2025 and names Jacob Magee, but its current-season summary fields are internally inconsistent; this page avoids an unsourced October 2026 win-loss total.",
      "sourceUrl": "https://www.cayugaisd.com/football",
      "sourceLabel": "Cayuga first-party fixtures and event-change warning",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2025 season",
        "title": "Wildcats finish 6-5",
        "body": "The year-specific 2025 archive shows Cayuga at 6-5 in its previous UIL district.",
        "sourceUrl": "https://www.maxpreps.com/tx/cayuga/cayuga-wildcats/football/history/",
        "sourceLabel": "MaxPreps historical 2025 records"
      },
      {
        "date": "2026 alignment",
        "title": "2A Division I District 10",
        "body": "UIL assigns Cayuga to District 10 for 2026–28, distinct from its 2025 district.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf",
        "sourceLabel": "UIL authoritative realignment PDF"
      },
      {
        "date": "2026 season",
        "title": "District publishes live athletics schedules",
        "body": "School-owned athletics pages link its 26-27 schedules and explicitly warn that event times can change.",
        "sourceUrl": "https://www.cayugaisd.com/football",
        "sourceLabel": "Official Cayuga football athletics page"
      }
    ],
    "overview": [
      "Cayuga's first-party athletics site identifies Jacob Magee as athletic director and head football coach.",
      "The school's official physical address is on Highway 287 near Tennessee Colony in Anderson County; it is distinct from the name of its mailing community.",
      "UIL 2026–28 places Cayuga in 2A Division I District 10; historical 2025 standings belong to a previous realignment.",
      "When current score feeds disagree, the official 2026 football schedule and school announcements control trip planning. No fabricated 2026 wins are published."
    ],
    "faq": [
      {
        "question": "Who is the Cayuga head football coach?",
        "answer": "Cayuga ISD's official athletics page names Jacob Magee athletic director and head football coach."
      },
      {
        "question": "Which football district is Cayuga in for 2026?",
        "answer": "Cayuga competes in UIL 2A Division I District 10 for the 2026–28 cycle."
      },
      {
        "question": "Where is Cayuga ISD's physical school campus?",
        "answer": "The official football page lists 17750 N US Highway 287, Tennessee Colony, Texas; this does not establish the football spectator entrance."
      }
    ]
  },
  "canyon-west-plains": {
    "slug": "canyon-west-plains",
    "campus": {
        "address": "10576 Arden Road, Amarillo, TX 79119 (West Plains High campus; not football entrance)",
        "sourceUrl": "https://wphs.canyonisd.net/our-campus",
        "sourceLabel": "West Plains High official school campus information",
        "verifiedAt": "2026-10-26"
    },
    "intro": "The West Plains Wolves opened in 2022 as Canyon ISD's newer varsity football program. They are distinct from Canyon High's Eagles, compete in UIL 4A Division I District 2 in 2026 and reached the 2024 state semifinals. After founding coach Adam Cummings moved into district administration, the school promoted Jeff Lofton in May 2026.",
    "theme": {
      "accentHex": "#35516C",
      "label": "Original TexasDefined editorial accent, not an official school color, logo or school photograph."
    },
    "seo": {
      "title": "Canyon West Plains Wolves Football | Jeff Lofton & 2026 UIL District 2",
      "description": "West Plains Wolves football: Jeff Lofton, Canyon ISD's 2022 launch, 2024 state semifinal run and 2026 District 2 sources."
    },
    "coach": {
      "name": "Jeff Lofton",
      "title": "Head football coach appointed May 2026",
      "sourceUrl": "https://www.newschannel10.com/2026/05/12/west-plains-promotes-jeff-lofton-head-football-coach/",
      "sourceLabel": "KFDA report of Canyon ISD appointment",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "West Plains 2026 football schedule",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=canyon-west-plains-wolves",
      "sourceLabel": "Dave Campbell's Texas Football schedule",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.texasfootball.com/team/default.aspx?url=canyon-west-plains-wolves"
    },
    "venue": {
      "name": "Happy State Bank Stadium",
      "sourceUrl": "https://www.texasfootball.com/team/default.aspx?url=canyon-west-plains-wolves",
      "sourceLabel": "Dave Campbell's team venue listing",
      "verifiedAt": "2026-10-26",
      "note": "Verify the specific game assignment, tickets, parking and accessible entrance with Canyon ISD."
    },
    "development": {
      "title": "From founding coach to the second head coach",
      "body": "Adam Cummings launched West Plains football in 2022 and reached the 2024 4A Division I semifinals before moving into Canyon ISD leadership in April 2026. Jeff Lofton, the founding staff's associate head coach, was promoted in May; a semifinal berth must not be mislabeled a state title.",
      "sourceUrl": "https://www.newschannel10.com/2026/04/13/west-plains-high-school-football-coach-adam-cummings-moves-new-canyon-isd-role/",
      "sourceLabel": "KFDA program history 2022–25",
      "verifiedAt": "2026-10-26"
    },
    "season": {
      "record": "4-3 after October 16, 2026 Canyon game; later results not certified",
      "sourceUrl": "https://www.maxpreps.com/tx/football/game/canyon-vs-west-plains-amarillo/10-16-2026/?c=28a1b81a-20dd-443b-8042-050efaa42125&tab=Recap",
      "sourceLabel": "MaxPreps October 16 result",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-10-16",
          "opponent": "Canyon",
          "site": "Home",
          "district": true,
          "result": "W 18-16"
        }
      ]
    },
    "milestones": [
      {
        "date": "2022",
        "title": "First varsity season",
        "body": "West Plains opened with Adam Cummings leading the football program and reached the playoffs.",
        "sourceUrl": "https://www.newschannel10.com/2026/04/13/west-plains-high-school-football-coach-adam-cummings-moves-new-canyon-isd-role/",
        "sourceLabel": "KFDA season-by-season history"
      },
      {
        "date": "2024",
        "title": "State semifinal season",
        "body": "The Wolves finished 11-4 and lost to Celina in the Class 4A Division I semifinals.",
        "sourceUrl": "https://www.newschannel10.com/2026/04/13/west-plains-high-school-football-coach-adam-cummings-moves-new-canyon-isd-role/",
        "sourceLabel": "KFDA retrospective"
      },
      {
        "date": "May 2026",
        "title": "Jeff Lofton appointed",
        "body": "Canyon ISD promoted Lofton after Cummings entered district administration.",
        "sourceUrl": "https://www.presspass.news/2026/05/12/canyon-isd-announces-jeff-lofton-as-the-new-west-plains-head-football-coach/",
        "sourceLabel": "Press Pass Sports board decision"
      }
    ],
    "overview": [
      "West Plains is the Canyon ISD Wolves program founded in 2022, separate from Canyon High's Eagles.",
      "Its current 2026–28 UIL 4A Division I District 2 pairing includes Canyon and Randall.",
      "The Wolves reached a 2024 state semifinal, not a state championship; 2026 scores remain dated snapshots."
    ],
    "faq": [
      {
        "question": "Who is West Plains' 2026 football coach?",
        "answer": "Jeff Lofton was promoted in May 2026 after Adam Cummings became a Canyon ISD administrator."
      },
      {
        "question": "Did West Plains win the 2024 state championship?",
        "answer": "No. West Plains reached the 2024 4A Division I semifinals and lost to Celina."
      }
    ]
  },
  "carrizo-springs": {
    "slug": "carrizo-springs",
    "campus": {
        "address": "335 FM Road 1917, Carrizo Springs, TX 78834 (high school campus, not a stadium gate)",
        "sourceUrl": "https://cshs.cscisd.net/",
        "sourceLabel": "Carrizo Springs High official school campus home",
        "verifiedAt": "2026-10-26"
    },
    "intro": "The Carrizo Springs Wildcats represent a Dimmit County UIL 3A Division I District 14 program. Carrizo Springs CISD publishes varsity schedules and district-controlled home-game tickets at Frank Carter Stadium; the page separates official athletic director information from uncertain head-coach attribution.",
    "theme": {
      "accentHex": "#785A3D",
      "label": "Original TexasDefined warm editorial accent, not a school-certified color or official Wildcat mark."
    },
    "seo": {
      "title": "Carrizo Springs Wildcats Football | 2026 District 14 & Frank Carter Stadium",
      "description": "Carrizo Springs Wildcats: UIL 3A Division I District 14, Frank Carter Stadium, official tickets, sourced schedules and coach-verification cautions."
    },
    "schedule": {
      "label": "CISD football schedule and athletics information",
      "sourceUrl": "https://cscisd.net/191557_3",
      "sourceLabel": "Carrizo Springs CISD official athletics",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://cscisd.net/191557_3"
    },
    "venue": {
      "name": "Frank Carter Stadium",
      "sourceUrl": "https://events.hometownticketing.com/boxoffice/carrizospringsisd/entity/schools/1",
      "sourceLabel": "District official ticket portal names varsity stadium",
      "verifiedAt": "2026-10-26",
      "note": "Event tickets and stadium entry/parking/accessible seating depend on each district-controlled event."
    },
    "development": {
      "title": "Verify coach attribution before assigning a full name",
      "body": "CISD officially identifies Giovanni Gonzalez as athletics director, while a football roster abbreviates head coach as G. Gonzalez. The abbreviation alone does not prove that both roles belong to the same person. Separate October 16 Devine recap and schedule feeds also disagree by one point; the older verified 3-4 record is dated, not carried forward as the final 2026 standing.",
      "sourceUrl": "https://cscisd.net/191557_3",
      "sourceLabel": "Official CISD athletics staff and 2026 schedule",
      "verifiedAt": "2026-10-26"
    },
    "season": {
      "record": "3-4 through October 16, 2026; subsequent scores unconfirmed",
      "sourceUrl": "https://www.maxpreps.com/tx/carrizo-springs/carrizo-springs-wildcats/football/schedule/",
      "sourceLabel": "MaxPreps 2026 season schedule",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-09-18",
          "opponent": "Poteet",
          "site": "Away",
          "district": true,
          "result": "W 50-0"
        },
        {
          "date": "2026-10-09",
          "opponent": "Lytle",
          "site": "Home",
          "district": true,
          "result": "W 52-13"
        }
      ]
    },
    "milestones": [
      {
        "date": "2026 realignment",
        "title": "3A Division I District 14",
        "body": "UIL places Carrizo Springs in District 14 for the 2026–28 cycle.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf",
        "sourceLabel": "UIL official alignment"
      },
      {
        "date": "October 2026",
        "title": "Varsity games listed at Frank Carter Stadium",
        "body": "The official district ticket service lists Carrizo Springs home football events at this venue.",
        "sourceUrl": "https://events.hometownticketing.com/boxoffice/carrizospringsisd/entity/schools/1",
        "sourceLabel": "District ticket site"
      }
    ],
    "overview": [
      "Carrizo Springs is a Dimmit County Wildcats program; its current district is 3A Division I District 14.",
      "The district operates its own athletics schedules and external Hometown Ticketing portal.",
      "The publicly abbreviated football coach listing is not enough to assert a complete name or conflate duties.",
      "The campus address, spectator gate and current ticket inventory require separate confirmation."
    ],
    "faq": [
      {
        "question": "What is Carrizo Springs football's 2026 UIL district?",
        "answer": "The Wildcats compete in 3A Division I District 14."
      },
      {
        "question": "Where are official Carrizo Springs home-game tickets?",
        "answer": "Carrizo Springs CISD links to its own Hometown Ticketing event portal; TexasDefined does not sell school-issued tickets."
      }
    ]
  },
  "carrollton-creekview": {
    "slug": "carrollton-creekview",
    "intro": "Creekview's Mustangs are a Carrollton-Farmers Branch ISD team in UIL 5A Division I District 6, distinct from Newman Smith's Trojans and R. L. Turner's Lions. The 2026 football staff identifies Dusty Ortiz as head coach. CFBISD publishes Standridge Stadium and district-run ticket guidance.",
    "theme": {
      "accentHex": "#4B5A70",
      "label": "TexasDefined original neutral-blue editorial accent, not a certified Creekview school color or mark."
    },
    "seo": {
      "title": "Carrollton Creekview Mustangs Football | Dusty Ortiz & 2026 District 6",
      "description": "Creekview football: head coach Dusty Ortiz, 5A Division I District 6, Standridge Stadium, official CFBISD athletics and 2026 score context."
    },
    "coach": {
      "name": "Dusty Ortiz",
      "title": "Head coach on current 2026 football staff",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/creekview-mustangs/football/staff/",
      "sourceLabel": "Current football staff directory",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "3201 Old Denton Rd, Carrollton, TX 75007 (school campus, not stadium gate)",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/creekview-mustangs/football/",
      "sourceLabel": "UIL-partner school page",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "2026 Creekview varsity schedule",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/creekview-mustangs/football/",
      "sourceLabel": "Current varsity football results",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.cfbisd.edu/departments/athletics"
    },
    "venue": {
      "name": "Standridge Stadium",
      "address": "1330 Valwood Pkwy, Carrollton, TX 75006",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "CFBISD official shared football stadium address",
      "verifiedAt": "2026-10-26",
      "note": "Not every Creekview event is necessarily at the district stadium; confirm the listed venue and rules per game."
    },
    "development": {
      "title": "Standridge is not Creekview's campus address",
      "body": "CFBISD publishes Standridge Stadium at 1330 Valwood Parkway, while Creekview High's campus appears on Old Denton Road. Creekview, Newman Smith and Turner are distinct schools in the same 2026 UIL district. Use the separate district and school pages rather than merging their result histories.",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "CFBISD campus roster, stadium and tickets",
      "verifiedAt": "2026-10-26"
    },
    "season": {
      "record": "1-7 through October 23, 2026",
      "sourceUrl": "https://www.dentoncountyfb.com/team/carrollton-creekview-mustangs/",
      "sourceLabel": "Denton County Football 2026 results",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-10-02",
          "opponent": "Carrollton Turner",
          "site": "Away",
          "district": true,
          "result": "W 21-7"
        },
        {
          "date": "2026-10-23",
          "opponent": "Birdville",
          "site": "Away",
          "district": true,
          "result": "L 20-56"
        }
      ]
    },
    "milestones": [
      {
        "date": "2026",
        "title": "5A Division I District 6",
        "body": "Creekview's current alignment puts the team with Newman Smith and Turner.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "UIL final alignment"
      },
      {
        "date": "October 23, 2026",
        "title": "Birdville defeats Creekview",
        "body": "Denton County Football's game ledger records a 56-20 Birdville win.",
        "sourceUrl": "https://www.dentoncountyfb.com/team/carrollton-creekview-mustangs/",
        "sourceLabel": "Current regional results"
      }
    ],
    "overview": [
      "Creekview Mustangs compete in 5A Division I District 6 for 2026–28.",
      "Dusty Ortiz appears as head coach in the current varsity staff listing.",
      "CFBISD's stadium address is separate from the campus location and is not a universal game assignment."
    ],
    "faq": [
      {
        "question": "Who coaches Creekview football?",
        "answer": "The current 2026 varsity staff lists Dusty Ortiz as head coach."
      },
      {
        "question": "Is Creekview High School located at Standridge Stadium?",
        "answer": "No. Creekview's campus is on Old Denton Road and the district stadium is on Valwood Parkway."
      }
    ]
  },
  "carrollton-ranchview": {
    "slug": "carrollton-ranchview",
    "intro": "The Ranchview Wolves football program is indexed by UIL as Carrollton Ranchview, but the school campus is physically in Irving, Texas. Ranchview competes in 4A Division I District 4 for 2026–28, while CFBISD's Creekview, Smith and Turner programs compete in 5A Division I District 6. The school officially identifies Richard Leonard as its head football coach.",
    "theme": {
      "accentHex": "#3E6255",
      "label": "TexasDefined original forest-green editorial accent; no school trademark, official color or third-party photograph."
    },
    "seo": {
      "title": "Carrollton Ranchview Wolves Football | Richard Leonard, Irving Campus & UIL 4A",
      "description": "Ranchview Wolves football: Richard Leonard, Irving campus, UIL 4A Division I District 4, CFBISD tickets and dated 2026 results."
    },
    "coach": {
      "name": "Richard Leonard",
      "title": "Head Football Coach / High School Athletic Coordinator",
      "sourceUrl": "https://ranchview.cfbisd.edu/campus-information/staff-directory?const_page=1",
      "sourceLabel": "Ranchview High School official staff directory",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "8401 Valley Ranch Pkwy E, Irving, TX 75063",
      "sourceUrl": "https://ranchview.cfbisd.edu/campus-information/staff-directory?const_page=1",
      "sourceLabel": "Official school campus address",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Ranchview varsity football results",
      "sourceUrl": "https://www.maxpreps.com/tx/irving/ranchview-wolves/football/",
      "sourceLabel": "UIL-partner Ranchview 2026 season results",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.cfbisd.edu/departments/athletics"
    },
    "venue": {
      "name": "Standridge Stadium",
      "address": "1330 Valwood Pkwy, Carrollton, TX 75006",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "CFBISD district stadium listing",
      "verifiedAt": "2026-10-26",
      "note": "This stadium is district-run but individual Ranchview fixtures and visitor parking must be confirmed."
    },
    "development": {
      "title": "Why UIL's Carrollton label must not dictate travel directions",
      "body": "Ranchview High's school-controlled staff directory publishes an Irving campus address. Its 4A football district also differs from other 5A CFBISD campuses. Do not confuse the high-school site with Standridge Stadium, use Carrollton as the physical campus city, or merge two separate school districts' football schedules.",
      "sourceUrl": "https://ranchview.cfbisd.edu/campus-information/staff-directory?const_page=1",
      "sourceLabel": "Ranchview campus address and head-coach role",
      "verifiedAt": "2026-10-26"
    },
    "season": {
      "record": "2-5 through October 16, 2026; later results await confirmation",
      "sourceUrl": "https://www.maxpreps.com/tx/irving/ranchview-wolves/football/",
      "sourceLabel": "MaxPreps dated 2026 scores",
      "verifiedAt": "2026-10-26",
      "games": [
        {
          "date": "2026-08-28",
          "opponent": "Carrollton Turner",
          "site": "Home",
          "result": "W 41-27"
        },
        {
          "date": "2026-10-16",
          "opponent": "Aubrey",
          "site": "Away",
          "district": true,
          "result": "L 14-66"
        }
      ]
    },
    "milestones": [
      {
        "date": "2026–28",
        "title": "4A Division I District 4",
        "body": "The UIL alignment gives Ranchview its own 4A competition structure.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/4AD1FB2026.pdf",
        "sourceLabel": "UIL final alignment"
      },
      {
        "date": "October 16, 2026",
        "title": "Aubrey wins 66-14",
        "body": "Ranchview's most recently reconciled snapshot was 2-5 after the Aubrey loss.",
        "sourceUrl": "https://www.maxpreps.com/tx/irving/ranchview-wolves/football/",
        "sourceLabel": "Current MaxPreps season feed"
      }
    ],
    "overview": [
      "Ranchview High is in Irving although the team appears as Carrollton Ranchview in UIL listings.",
      "Richard Leonard is the first-party listed head football coach and athletics coordinator.",
      "The 2026–28 alignment is 4A Division I District 4, not Creekview's 5A district.",
      "CFBISD stadium and ticket arrangements require game-specific confirmation."
    ],
    "faq": [
      {
        "question": "Is Ranchview High in Irving?",
        "answer": "Yes. Its official campus address is 8401 Valley Ranch Parkway East, Irving."
      },
      {
        "question": "Who is the head coach?",
        "answer": "Ranchview High's staff directory identifies Richard Leonard."
      }
    ]
  },
  "carrollton-smith": {
    "slug": "carrollton-smith",
    "intro": "Newman Smith Trojans football is a separate Carrollton-Farmers Branch ISD program in UIL 5A Division I District 6. Official Newman Smith High staffing and the current roster list Keith Houston as head coach, whereas stale historical season metadata still lists Robert Boone; school-controlled current information takes precedence for the present coaching role.",
    "theme": {
      "accentHex": "#765C4D",
      "label": "Original TexasDefined editorial copper-slate treatment, not a school-certified color or official Trojan insignia."
    },
    "seo": {
      "title": "Carrollton Newman Smith Trojans Football | Keith Houston & District 6",
      "description": "Newman Smith Trojans: 2026 school-confirmed coach Keith Houston, UIL 5A Division I District 6, school history and CFBISD stadium/tickets."
    },
    "coach": {
      "name": "Keith Houston",
      "title": "Head Football Coach – HS Athletic Coordinator",
      "sourceUrl": "https://smith.cfbisd.edu/campus-information/staff-directory",
      "sourceLabel": "Newman Smith High current official staff directory",
      "verifiedAt": "2026-10-26"
    },
    "campus": {
      "address": "2335 N Josey Ln, Carrollton, TX 75006 (campus, not stadium gate)",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/newman-smith-trojans/football/",
      "sourceLabel": "UIL-partner school campus listing",
      "verifiedAt": "2026-10-26"
    },
    "schedule": {
      "label": "Newman Smith current schedule",
      "sourceUrl": "https://www.maxpreps.com/tx/carrollton/newman-smith-trojans/football/",
      "sourceLabel": "Current MaxPreps roster and season feed",
      "verifiedAt": "2026-10-26",
      "officialScheduleUrl": "https://www.cfbisd.edu/departments/athletics"
    },
    "venue": {
      "name": "Standridge Stadium",
      "address": "1330 Valwood Pkwy, Carrollton, TX 75006",
      "sourceUrl": "https://www.cfbisd.edu/departments/athletics",
      "sourceLabel": "Official CFBISD district stadium",
      "verifiedAt": "2026-10-26",
      "note": "Confirm each Newman Smith home game's event venue; the campus address is separate."
    },
    "development": {
      "title": "Prefer current first-party coach attribution over stale historical shells",
      "body": "The school directory and current football roster identify Keith Houston as head coach. A legacy MaxPreps season-history entry instead lists Robert Boone, including an unrefreshed 2026 shell. The correct approach is to keep historic coach data year-specific without making it a competing present-tense assertion.",
      "sourceUrl": "https://smith.cfbisd.edu/campus-information/staff-directory",
      "sourceLabel": "Newman Smith current head coach on school-owned directory",
      "verifiedAt": "2026-10-26"
    },
    "milestones": [
      {
        "date": "2024",
        "title": "Trojans posted an 8-3 season",
        "body": "Historical results record an 8-3 2024 season, not a 2026 record.",
        "sourceUrl": "https://www.maxpreps.com/tx/carrollton/newman-smith-trojans/football/history/",
        "sourceLabel": "MaxPreps historical season listing"
      },
      {
        "date": "2025",
        "title": "Trojans posted a 6-5 season",
        "body": "Historical results record 6-5 for the 2025 season.",
        "sourceUrl": "https://www.maxpreps.com/tx/carrollton/newman-smith-trojans/football/history/",
        "sourceLabel": "MaxPreps season history"
      },
      {
        "date": "2026–28",
        "title": "5A Division I District 6",
        "body": "UIL aligns Newman Smith with Creekview and R. L. Turner.",
        "sourceUrl": "https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf",
        "sourceLabel": "UIL final football alignment"
      }
    ],
    "overview": [
      "Newman Smith is the Trojans program, separate from CFBISD's Creekview Mustangs and Turner Lions.",
      "The current school-controlled directory confirms coach Keith Houston.",
      "The 2026–28 UIL alignment is 5A Division I District 6; past years' results must not be presented as 2026 standings.",
      "Standridge is a district stadium, not the address of Newman Smith's campus."
    ],
    "faq": [
      {
        "question": "Who coaches Newman Smith football in 2026?",
        "answer": "Newman Smith High's official staff directory names Keith Houston as head football coach and campus athletic coordinator."
      },
      {
        "question": "Why does an older school-history page list Robert Boone?",
        "answer": "It carries historical season fields, some outdated; current school directory information is used for present roles."
      }
    ]
  }
};

export function getBatch009FootballProgramEditorial(slug: string): FootballProgramEditorial | undefined {
  return BATCH009_EDITORIAL[slug];
}
