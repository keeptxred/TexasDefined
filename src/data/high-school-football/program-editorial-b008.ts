import type { FootballProgramEditorial } from './program-editorial';

const BATCH008_EDITORIAL: Record<string, FootballProgramEditorial> = {
  buckholts: {
    slug: 'buckholts',
    intro: "Buckholts is a Milam County six-man program in UIL 1A Division II District 15. Its 2026 record needs careful sourcing: named-opponent results support one win through October 23, while MaxPreps also carries a 56-0 October 16 result against a placeholder 'Varsity Opponent' and subsequently labels the team 2-6. TexasDefined keeps that discrepancy visible instead of treating a placeholder as a verified school opponent.",
    theme: { accentHex: '#6B1F2A', label: 'Original TexasDefined maroon editorial treatment; not a certified Buckholts school color or official logo.' },
    seo: {
      title: 'Buckholts Badgers Football | 2026 Six-Man Scores & District 15 Guide',
      description: 'Buckholts Badgers six-man football: UIL 1A Division II District 15, 2026 named-opponent results, Apple Springs final, current roster-source coach note and schedule cautions.'
    },
    coach: {
      name: 'Jimmy Freeman',
      title: 'Current roster-listed head coach; school-first-party confirmation still needed',
      sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/roster/all-time/',
      sourceLabel: 'MaxPreps 2026 Buckholts roster lists Jimmy Freeman as head coach; 2025 roster listed Zack White, so the current attribution is date-sensitive and secondary-source based',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '203 S. 10th, Buckholts, TX 76518 (school address; football spectator gate not independently verified)',
      sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/',
      sourceLabel: 'MaxPreps UIL-partner Buckholts school page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Buckholts 2026 football schedule and current result feed',
      sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/schedule/',
      sourceLabel: 'MaxPreps UIL-partner schedule, cross-checked against October 23 statewide score reports',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/schedule/'
    },
    season: {
      record: "1-6 in verified named-opponent results through Oct. 23; MaxPreps separately reports 2-6 by counting a 56-0 'Varsity Opponent' placeholder on Oct. 16",
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/',
      sourceLabel: 'MaxPreps named-game results through Oct. 23 plus statewide Apple Springs 68-20 final; placeholder-opponent discrepancy retained',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr',
      games: [
        { date: '2026-08-28', opponent: 'Texas School for the Deaf', site: 'Away', result: 'L 32-64' },
        { date: '2026-09-04', opponent: 'Evant', site: 'Away', result: 'L 20-68' },
        { date: '2026-09-11', opponent: 'Nazarene Christian Academy', site: 'Away', result: 'L 0-47' },
        { date: '2026-09-18', opponent: 'Penelope', site: 'Away', result: 'L 0-50' },
        { date: '2026-09-26', opponent: 'Texas Empowerment Academy', site: 'Home', result: 'W 38-33' },
        { date: '2026-10-02', opponent: 'Oglesby', site: 'Home', result: 'L 0-76' },
        { date: '2026-10-23', opponent: 'Apple Springs', site: 'Away', district: true, result: 'L 20-68' },
        { date: '2026-10-30', opponent: 'High Island', site: 'Home', kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Calvert', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    development: {
      title: 'Why the 2026 record needs a source note',
      body: "Buckholts has a clean named-opponent ledger through October 23, including a 38-33 win over Texas Empowerment Academy and the 68-20 district loss at Apple Springs. MaxPreps also generated a 56-0 October 16 win over a generic 'Varsity Opponent' and then described Buckholts as 2-6. Because that opponent is not an identified school, TexasDefined does not silently convert it into a verified program result.",
      sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/schedule/',
      sourceLabel: 'MaxPreps current schedule/recap discrepancy; Apple Springs final independently appears in statewide October 23 results',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2025', title: 'Three-win season before the current realignment', body: 'MaxPreps history lists Buckholts at 3-7 in 2025 under Zack White, before the 2026 District 15 alignment and current roster coaching change.', sourceUrl: 'https://www.maxpreps.com/tx/buckholts/buckholts-badgers/football/history/', sourceLabel: 'MaxPreps Buckholts football history' },
      { date: 'September 26, 2026', title: 'Badgers edge Texas Empowerment Academy 38-33', body: 'The named-opponent win is supported by a game page with a Buckholts-provided final score.', sourceUrl: 'https://www.maxpreps.com/tx/football/game/buckholts-vs-texas-empowerment-academy-austin/9-26-2026/?c=4905af68-7fb8-44d6-bf39-463987b56471&tab=Recap', sourceLabel: 'MaxPreps game recap' },
      { date: 'October 23, 2026', title: 'Apple Springs wins the district matchup 68-20', body: 'Statewide final-score roundups and the current MaxPreps recap agree on the 68-20 Apple Springs final.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr', sourceLabel: 'High School On SI statewide final scores' }
    ],
    overview: [
      'Buckholts competes in UIL Conference 1A six-man Division II District 15. The format is six-man football, not a small-school version of the eleven-man alignment.',
      'The current MaxPreps roster lists Jimmy Freeman as head coach, while the 2025 history lists Zack White. Because a Buckholts ISD first-party football staff page was not located during this checkpoint, the coaching change is attributed to the current roster source rather than presented as district-certified.',
      "The 2026 named-opponent ledger is intentionally separated from MaxPreps' placeholder 'Varsity Opponent' entry. That keeps the page useful without inventing an opponent identity or silently accepting a generated cumulative record.",
      'The school address is not treated as a verified spectator gate. Fans should confirm the current game location before travel, especially for six-man schedules that can use neutral or shared fields.'
    ],
    faq: [
      { question: 'Does Buckholts play six-man football?', answer: 'Yes. UIL places Buckholts in Conference 1A Division II District 15 for the 2026-28 cycle, which is six-man football.' },
      { question: 'Who is the Buckholts football head coach in 2026?', answer: 'The current MaxPreps roster lists Jimmy Freeman. The same history page lists Zack White for 2025, and TexasDefined has not found a Buckholts ISD first-party coaching page to independently certify the change.' },
      { question: 'Why does TexasDefined not simply call Buckholts 2-6?', answer: "MaxPreps counts a 56-0 October 16 entry against a generic 'Varsity Opponent.' TexasDefined keeps the named-opponent results separate until that placeholder can be tied to a real school." },
      { question: 'What was Buckholts latest verified result?', answer: 'Apple Springs defeated Buckholts 68-20 on October 23, 2026, a final also listed in statewide score reporting.' }
    ]
  },
  'buda-hays': {
    slug: 'buda-hays',
    intro: 'Hays High School returned to UIL Class 6A in 2026 and entered District 26 with a 4-1 start before three straight district losses left the Hawks 4-4 after the October 23 Dripping Springs game. The page distinguishes the current Mark Torres era, the 2020 regional-final run and the modern Hawks identity from older branding.',
    theme: { accentHex: '#0033A0', label: 'Hays CISD official Royal Blue primary color used as an editorial accent; no school logo reproduced.' },
    seo: {
      title: 'Buda Hays Hawks Football | 2026 Scores, Mark Torres & Bob Shelton Stadium',
      description: 'Hays Hawks football in Buda: Mark Torres, 2026 Class 6A District 26 results, 2020 regional-final context, Bob Shelton Stadium and official Hays CISD sources.'
    },
    coach: {
      name: 'Mark Torres',
      title: 'Head football coach and Hays High athletic coordinator',
      sourceUrl: 'https://www.hayscisd.net/o/hhs/page/athletics',
      sourceLabel: 'Hays High School official athletics page lists Mark Torres as athletic coordinator; current 2026 roster sources identify him as head football coach',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '4800 Jack C. Hays Trail, Buda, TX 78610',
      phone: '512-268-2911',
      sourceUrl: 'https://www.hayscisd.net/o/hhs',
      sourceLabel: 'Hays High School official campus page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Official Hays High 2026-27 football schedule documents and athletics hub',
      sourceUrl: 'https://www.hayscisd.net/o/hhs/documents/extracurriculars/football/24373431',
      sourceLabel: 'Hays High School official football documents directory plus current score cross-checks',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.hayscisd.net/o/hhs/documents/extracurriculars/football/24373431'
    },
    season: {
      record: '4-4 overall through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/buda/hays-hawks/football/',
      sourceLabel: 'Current MaxPreps Hays results cross-checked with Hays Free Press and statewide October 23 finals',
      latestResultSourceUrl: 'https://www.haysfreepress.com/article/26884%2Chays-hawks-falter-against-bowie-bulldogs',
      games: [
        { date: '2026-08-28', opponent: 'San Marcos', site: 'Away', result: 'W 29-27' },
        { date: '2026-09-04', opponent: 'Seguin', site: 'Home', result: 'W 54-0' },
        { date: '2026-09-11', opponent: 'Killeen Harker Heights', site: 'Away', result: 'L 35-42' },
        { date: '2026-09-17', opponent: 'Leander', site: 'Home', result: 'W 45-13' },
        { date: '2026-09-25', opponent: 'Buda Johnson', site: 'Away', district: true, result: 'W 41-28' },
        { date: '2026-10-02', opponent: 'Austin High', site: 'Home', district: true, result: 'L 28-35' },
        { date: '2026-10-08', opponent: 'Austin Bowie', site: 'Away', district: true, result: 'L 6-36' },
        { date: '2026-10-23', opponent: 'Dripping Springs', site: 'Home', district: true, result: 'L 0-42' },
        { date: '2026-10-30', opponent: 'Del Valle', site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-05', opponent: 'Austin Akins', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Bob Shelton Stadium',
      address: '4800 Jack C. Hays Trail, Buda, TX 78610',
      sourceUrl: 'https://www.hayscisd.net/page/athletics',
      sourceLabel: 'Hays CISD official athletics hub links Shelton Stadium; current Hays and district event sources place Hays home football there',
      verifiedAt: '2026-10-25',
      note: 'Confirm the current schedule and district ticket office before travel. The campus/stadium address does not by itself certify a specific spectator entrance, parking path or accessible seating location.'
    },
    development: {
      title: 'Back in 6A with a different offensive identity',
      body: 'Hays returned to Class 6A in 2026 for the first time since 2021. A 2026 season preview describes eight returning starters on each side of the ball under third-year coach Mark Torres. The program historically used the Slot-T, while Torres arrived in 2024 from Pebble Hills with a spread-oriented background. The 4-1 start included the first Buda Bowl win over Johnson before district losses to Austin High, Bowie and Dripping Springs.',
      sourceUrl: 'https://texashsfootball.com/buda-hays-hawks-2026-season-preview/',
      sourceLabel: 'Texas HS Football 2026 season preview, Hays Free Press coaching history and current district results',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2020', title: 'Regional-final season', body: 'Hays went 10-4 in 2020 and reached a regional final, the program benchmark repeatedly cited in current season previews.', sourceUrl: 'https://www.texasfootball.com/team/buda-hays-consolidated-hawks', sourceLabel: "Dave Campbell's Texas Football program history" },
      { date: '2021', title: 'Hawks identity becomes the modern school mascot', body: 'Hays CISD retired the former mascot and adopted Hawks, keeping red and blue as official colors.', sourceUrl: 'https://www.hayscisd.net/o/hhs/page/school-history/', sourceLabel: 'Hays High School official school history' },
      { date: 'September 25, 2026', title: 'First Buda Bowl goes to Hays, 41-28', body: 'Hays Free Press identified the first Hays-Johnson football meeting as the inaugural Buda Bowl, with Hays winning the District 26 opener.', sourceUrl: 'https://www.haysfreepress.com/article/26832%2Chays-hawks-claim-victory-over-johnson-jags-in-inaugural-buda-bowl', sourceLabel: 'Hays Free Press local game coverage' },
      { date: 'October 23, 2026', title: 'Dripping Springs shuts out Hays 42-0', body: 'The loss moved Hays to 4-4 and extended its losing streak to three games.', sourceUrl: 'https://www.maxpreps.com/m/news/3fUvVWSn202D14K7AOgbyg/football-recap-tough-loss-for-hays.htm', sourceLabel: 'MaxPreps current game recap; statewide finals agree' }
    ],
    overview: [
      'Jack C. Hays High School is a Hays CISD campus in Buda. The school identifies its teams as the Hawks and lists red and blue as its official colors.',
      'Mark Torres is Hays High School athletic coordinator and the current football head coach. He took over in 2024 after coaching at Pebble Hills in El Paso.',
      "Dave Campbell's credits Hays with 25 playoff appearances, no state football title and one title-game appearance. The 2020 team went 10-4 and reached a regional final; current pages should not confuse that deep playoff run with a championship.",
      'The 2026 Hawks returned to 6A and began 4-1 before district defeats to Austin High, Bowie and Dripping Springs. The current record is a dated snapshot, not a final-season claim.',
      'Bob Shelton Stadium is the district football venue associated with Hays home games. Fans should still use Hays CISD ticket and event information for the exact entrance, parking and accessibility instructions.'
    ],
    faq: [
      { question: 'Who coaches Hays High School football in 2026?', answer: 'Mark Torres. Hays High School lists him as athletic coordinator, and current 2026 football roster sources identify him as the Hawks head coach.' },
      { question: 'What is Hays football record after October 23, 2026?', answer: 'Hays is 4-4 after a 42-0 loss to Dripping Springs on October 23.' },
      { question: 'Did Hays win a state championship in 2020?', answer: "No. The 2020 Hawks went 10-4 and reached a regional final. Dave Campbell's program history lists zero state titles." },
      { question: 'What are Hays High School official colors?', answer: 'Hays High School lists red and blue; the district brand guide specifies Royal Blue and Scarlet Red as the primary approved colors.' }
    ]
  },
  'buda-johnson': {
    slug: 'buda-johnson',
    intro: 'Moe & Gene Johnson High School is a young Hays CISD program whose recent football history already includes a 2024 regional-semifinal run. In 2026, Sam Carlin leads the Jaguars in District 26-6A; a difficult 1-5 start was followed by decisive district wins over Del Valle and Akins, bringing Johnson to 3-5 through October 16.',
    theme: { accentHex: '#111111', label: 'Black editorial accent drawn from Hays CISD official Johnson black-and-gold identity; no school logo reproduced.' },
    seo: {
      title: 'Buda Johnson Jaguars Football | 2026 Scores, Sam Carlin & Buda Bowl',
      description: 'Buda Johnson Jaguars football: Sam Carlin, 2026 District 26-6A scores, 2024 regional semifinal, first Buda Bowl and Hays CISD sources.'
    },
    coach: {
      name: 'Sam Carlin',
      title: 'Head football coach / athletic coordinator',
      sourceUrl: 'https://www.hayscisd.net/o/jhs/page/head-coaches',
      sourceLabel: 'Johnson High School official head-coaches page lists Coach Carlin as Head Football Coach/Athletic Coordinator',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '4260 FM 967, Buda, TX 78610',
      phone: '512-268-8512',
      sourceUrl: 'https://www.hayscisd.net/o/jhs/',
      sourceLabel: 'Johnson High School official campus page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Johnson 2026 football schedule and Hays CISD athletics',
      sourceUrl: 'https://www.maxpreps.com/tx/buda/johnson-jaguars/football/schedule/',
      sourceLabel: 'Current MaxPreps UIL-partner schedule cross-checked with Johnson and Hays CISD official athletics pages',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.hayscisd.net/o/jhs/page/head-coaches'
    },
    season: {
      record: '3-5 overall, 2-2 district through October 16, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/buda/johnson-jaguars/football/schedule/',
      sourceLabel: 'Current MaxPreps Johnson schedule/results',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/buda/johnson-jaguars/football/',
      games: [
        { date: '2026-08-27', opponent: 'Austin Anderson', site: 'Home', result: 'L 6-34' },
        { date: '2026-09-04', opponent: 'San Antonio Pieper', site: 'Away', result: 'L 13-56' },
        { date: '2026-09-11', opponent: 'Round Rock Westwood', site: 'Home', result: 'W 29-26' },
        { date: '2026-09-18', opponent: 'Alamo Heights', site: 'Away', result: 'L 9-58' },
        { date: '2026-09-25', opponent: 'Buda Hays', site: 'Home', district: true, result: 'L 28-41' },
        { date: '2026-10-02', opponent: 'Dripping Springs', site: 'Away', district: true, result: 'L 21-49' },
        { date: '2026-10-09', opponent: 'Del Valle', site: 'Home', district: true, result: 'W 63-7' },
        { date: '2026-10-16', opponent: 'Austin Akins', site: 'Away', district: true, result: 'W 95-0' },
        { date: '2026-10-29', opponent: 'Austin High', site: 'Home', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-06', opponent: 'Austin Bowie', site: 'Away', district: true, kickoff: '7:30 PM' }
      ]
    },
    venue: {
      name: 'Bob Shelton Stadium',
      address: '4800 Jack C. Hays Trail, Buda, TX 78610',
      sourceUrl: 'https://www.hayscisd.net/page/athletics',
      sourceLabel: "Hays CISD official athletics hub links Shelton Stadium; Dave Campbell's identifies it as Johnson's stadium",
      verifiedAt: '2026-10-25',
      note: 'Johnson also plays away and district games at other Austin-area venues. Confirm each game location and current Hays CISD ticket instructions rather than assuming every listed home event uses the same entrance.'
    },
    development: {
      title: 'A young program with a 2024 regional-semifinal benchmark',
      body: 'Johnson reached the regional semifinals in 2024, then fell to 3-7 in 2025. The 2026 season preview identified Sam Carlin in his third season with 11 returning starters. After a 1-5 start that included the first Buda Bowl loss to Hays, Johnson answered with 63-7 over Del Valle and 95-0 over Akins before its late-October open date.',
      sourceUrl: 'https://texashsfootball.com/?p=110753',
      sourceLabel: 'Texas HS Football 2026 Johnson preview, official Johnson coach page and current results',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2021', title: 'Nine-win season establishes an early program high', body: "Dave Campbell's lists Johnson at 9-2 in 2021, one of the strongest early seasons in the young program's record.", sourceUrl: 'https://www.texasfootball.com/team/buda-johnson-jaguars', sourceLabel: "Dave Campbell's Texas Football program history" },
      { date: '2024', title: 'Jaguars reach the regional semifinals', body: 'Current season previews describe Johnson as reaching the regional semifinals in 2024 before missing the postseason in 2025.', sourceUrl: 'https://texashsfootball.com/?p=110753', sourceLabel: 'Texas HS Football 2026 season preview' },
      { date: 'September 25, 2026', title: 'First Buda Bowl: Hays 41, Johnson 28', body: 'Hays Free Press documented the first football meeting between the two Buda schools and identified it as the inaugural Buda Bowl.', sourceUrl: 'https://www.haysfreepress.com/article/26832%2Chays-hawks-claim-victory-over-johnson-jags-in-inaugural-buda-bowl', sourceLabel: 'Hays Free Press local coverage' },
      { date: 'October 16, 2026', title: 'Johnson follows 63-7 with a 95-0 district win', body: 'Johnson defeated Del Valle 63-7 and Akins 95-0 in consecutive District 26 games, moving to 3-5 overall and 2-2 in district.', sourceUrl: 'https://www.maxpreps.com/tx/buda/johnson-jaguars/football/schedule/', sourceLabel: 'MaxPreps current 2026 Johnson schedule' }
    ],
    overview: [
      'Moe & Gene Johnson High School is a Hays CISD campus in Buda. The district athletic handbook identifies the Jaguars and lists black and gold as the official school colors.',
      'Johnson High School itself lists Sam Carlin as Head Football Coach/Athletic Coordinator, giving the page a first-party current coaching source.',
      "Dave Campbell's program history lists two playoff appearances, no state football titles and no state-final appearances. The 2024 regional-semifinal run is a major program milestone but not a state championship.",
      'The 2026 Jaguars are 3-5 through October 16 after consecutive district wins over Del Valle and Akins. Austin High and Austin Bowie remain on the schedule; no future outcome is pre-filled.',
      'Johnson and Hays share the Hays CISD football ecosystem, including Bob Shelton Stadium, but the school campus at 4260 FM 967 is distinct from the stadium address.'
    ],
    faq: [
      { question: 'Who coaches Johnson High School football in Buda?', answer: 'Sam Carlin. Johnson High School officially lists Coach Carlin as Head Football Coach/Athletic Coordinator.' },
      { question: 'What is Buda Johnson football record through October 16, 2026?', answer: 'Johnson is 3-5 overall and 2-2 in District 26-6A after wins over Del Valle and Akins.' },
      { question: 'Has Buda Johnson won a football state title?', answer: "No. Dave Campbell's program history lists no state titles or title-game appearances; the 2024 team reached the regional semifinals." },
      { question: 'What was the first Buda Bowl?', answer: 'Hays and Johnson met in football for the first time on September 25, 2026. Hays Free Press called the District 26 opener the inaugural Buda Bowl; Hays won 41-28.' }
    ]
  },
  buffalo: {
    slug: 'buffalo',
    intro: "Buffalo High School's Bison are a Leon County Class 3A Division II program in District 11. The 2026 team opened 5-1, then lost 27-14 at Teague to sit 5-2 through October 16. The October 23 Mildred game has multiple schedule listings but no trustworthy final in the sources reviewed on October 25, so TexasDefined leaves that outcome unresolved instead of manufacturing a score.",
    theme: { accentHex: '#552583', label: 'Original TexasDefined purple editorial treatment inspired by Buffalo Athletics branding; not a copied school logo or seal.' },
    seo: {
      title: 'Buffalo Bison Football | 2026 Scores, Trent Jones & District 11 Guide',
      description: 'Buffalo Bison football: 2026 District 11-3A Division II results, Trent Jones athletics leadership, Leon County context and current schedule-source cautions.'
    },
    coach: {
      name: 'Trent Jones',
      title: 'Athletics director; current Buffalo football staff attribution',
      sourceUrl: 'https://bjh.buffaloisd.net/438865_2',
      sourceLabel: 'Buffalo ISD athletics page identifies Trent Jones as Athletics Director; Buffalo Athletics contact uses his district email and current football program link',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '1724 N Buffalo Avenue, Buffalo, TX 75831',
      phone: '903-322-2473',
      sourceUrl: 'https://bhs.buffaloisd.net/',
      sourceLabel: 'Buffalo High School official campus homepage',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Buffalo ISD football and current 2026 result sources',
      sourceUrl: 'https://www.buffaloisd.net/football',
      sourceLabel: 'Buffalo ISD official football hub, cross-checked with UIL-partner and statewide score sources',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.buffaloisd.net/football'
    },
    season: {
      record: '5-2 through October 16, 2026; October 23 Mildred final not independently verified at this checkpoint',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/buffalo/buffalo-bison/football/schedule/',
      sourceLabel: 'MaxPreps named results through Rice, High School On SI Teague final and Pigskin Prep district ledger; Mildred outcome intentionally left unresolved',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-16-01m53bh2k5w8',
      games: [
        { date: '2026-08-28', opponent: 'Iola', site: 'Away', result: 'W 35-0' },
        { date: '2026-09-04', opponent: 'Leon', site: 'Home', result: 'W 35-19' },
        { date: '2026-09-11', opponent: 'Anderson-Shiro', site: 'Home', result: 'W 28-0' },
        { date: '2026-09-18', opponent: 'Thrall', site: 'Away', result: 'L 28-38' },
        { date: '2026-09-25', opponent: 'Warren', site: 'Away', result: 'W 59-19' },
        { date: '2026-10-09', opponent: 'Rice', site: 'Home', district: true, result: 'W 56-14' },
        { date: '2026-10-16', opponent: 'Teague', site: 'Away', district: true, result: 'L 14-27' },
        { date: '2026-10-23', opponent: 'Mildred', site: 'Home', district: true },
        { date: '2026-10-30', opponent: 'Elkhart', site: 'Away', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Blooming Grove', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    development: {
      title: 'A 5-0 defensive start before District 11 tightened',
      body: 'Buffalo opened 2026 with shutouts of Iola and Anderson-Shiro and reached 5-1 after a 56-14 district win over Rice. Teague then beat Buffalo 27-14 on October 16. The October 23 Mildred matchup appears on MaxPreps, statewide schedules and district schedule pages, but the sources reviewed on October 25 do not supply a reliable final, so the page does not infer one.',
      sourceUrl: 'https://www.maxpreps.com/tx/buffalo/buffalo-bison/football/schedule/',
      sourceLabel: 'MaxPreps current schedule, High School On SI Oct. 16 finals and Pigskin Prep District 11 ledger',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: 'August 28, 2026', title: 'Buffalo opens with a 35-0 shutout at Iola', body: 'The season began with a road shutout, followed two weeks later by another shutout against Anderson-Shiro.', sourceUrl: 'https://www.maxpreps.com/tx/buffalo/buffalo-bison/football/schedule/', sourceLabel: 'MaxPreps Buffalo 2026 schedule' },
      { date: 'October 9, 2026', title: 'Bison open district play with 56-14 over Rice', body: 'The Rice win moved Buffalo to 5-1 and 1-0 in District 11.', sourceUrl: 'https://www.maxpreps.com/tx/buffalo/buffalo-bison/football/schedule/', sourceLabel: 'MaxPreps Buffalo schedule' },
      { date: 'October 16, 2026', title: 'Teague hands Buffalo a 27-14 district loss', body: 'Statewide final-score reporting and the district ledger agree on the 27-14 Teague final.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-16-01m53bh2k5w8', sourceLabel: 'High School On SI statewide Oct. 16 finals' }
    ],
    overview: [
      'Buffalo High School is in Buffalo, Leon County, and its official site uses the Bison identity. Buffalo Athletics likewise brands the program as Bison Athletics.',
      'Buffalo ISD identifies Trent Jones as athletics director and publishes a dedicated football hub. The page does not overstate that athletics-director title into a school-certified head-coach title where the first-party page does not explicitly do so.',
      'UIL places Buffalo in Class 3A Division II District 11 for 2026-28. The current record is a dated source snapshot, not a final-season record.',
      'The October 23 Mildred game is deliberately shown without a result until a reliable final can be tied to the matchup. A scheduled game is not evidence of an outcome.'
    ],
    faq: [
      { question: 'What district is Buffalo football in for 2026?', answer: 'UIL places Buffalo in Class 3A Division II District 11 for the 2026-28 alignment cycle.' },
      { question: 'What is Buffalo football record through October 16, 2026?', answer: 'Buffalo is 5-2 through the verified October 16 loss at Teague. The October 23 Mildred result remains unresolved in the sources reviewed October 25.' },
      { question: 'Who leads Buffalo ISD athletics?', answer: 'Buffalo ISD identifies Trent Jones as Athletics Director. TexasDefined does not convert that title into a stronger first-party head-coach claim without a source that says so explicitly.' },
      { question: 'Why is there no Mildred score on this page yet?', answer: 'The matchup is verified on multiple schedules, but the sources reviewed on October 25 did not provide a reliable final. TexasDefined does not guess missing scores.' }
    ]
  },
  bullard: {
    slug: 'bullard',
    intro: "Bullard High School's Panthers compete in UIL Class 4A Division I District 8. Bullard ISD named longtime Panther assistant Colton Bradford head coach in 2023, and the current 2026 roster still lists Bradford. The Panthers are 1-7 through the October 23 loss at Henderson, with Jacksonville and Pine Tree remaining.",
    theme: { accentHex: '#B3202A', label: 'Original TexasDefined red editorial accent reflecting Bullard High fight-song red/white/blue identity; no district logo reproduced.' },
    seo: {
      title: 'Bullard Panthers Football | 2026 Scores, Colton Bradford & District 8',
      description: 'Bullard Panthers football: Colton Bradford, 2026 District 8-4A Division I results, Panther identity, Henderson final and Bullard ISD sources.'
    },
    coach: {
      name: 'Colton Bradford',
      title: 'Head football coach',
      sourceUrl: 'https://www.bullardisd.net/departments/communicationspr/news/news-details/~board/district-news/post/colton-bradford-named-head-football-coach',
      sourceLabel: 'Bullard ISD official April 2023 appointment; current 2026 MaxPreps roster still lists C. Bradford as head coach',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '1426 S Houston St, Bullard, TX 75757',
      phone: '903-894-3272',
      sourceUrl: 'https://bhs.bullardisd.net/',
      sourceLabel: 'Bullard High School official campus site',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Bullard 2026 varsity football schedule and current results',
      sourceUrl: 'https://www.maxpreps.com/tx/bullard/bullard-panthers/football/schedule/',
      sourceLabel: 'UIL-partner current schedule, with Bullard ISD coaching and school identity sourced first-party',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.maxpreps.com/tx/bullard/bullard-panthers/football/schedule/'
    },
    season: {
      record: '1-7 overall, 0-5 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/bullard/bullard-panthers/football/schedule/',
      sourceLabel: 'MaxPreps schedule updated Oct. 24; Henderson schedule independently shows the 59-28 Oct. 23 final',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/henderson/henderson-lions/football/schedule/',
      games: [
        { date: '2026-08-28', opponent: 'Mabank', site: 'Home', result: 'W 63-21' },
        { date: '2026-09-04', opponent: 'Caddo Mills', site: 'Away', result: 'L 21-36' },
        { date: '2026-09-11', opponent: 'Ford', site: 'Home', result: 'L 19-20' },
        { date: '2026-09-18', opponent: 'Kilgore', site: 'Away', district: true, result: 'L 6-40' },
        { date: '2026-09-25', opponent: 'Palestine', site: 'Home', district: true, result: 'L 21-35' },
        { date: '2026-10-02', opponent: 'Lindale', site: 'Away', district: true, result: 'L 28-55' },
        { date: '2026-10-16', opponent: 'Chapel Hill', site: 'Home', district: true, result: 'L 35-55' },
        { date: '2026-10-23', opponent: 'Henderson', site: 'Away', district: true, result: 'L 28-59' },
        { date: '2026-10-30', opponent: 'Jacksonville', site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-06', opponent: 'Pine Tree', site: 'Home', district: true, kickoff: '7:30 PM' }
      ]
    },
    development: {
      title: 'Bradford era continues through a difficult District 8 schedule',
      body: 'Bullard ISD promoted Colton Bradford from defensive coordinator to head coach in April 2023 after Scott Callaway stepped away from coaching. The 2026 Panthers opened with a 63-21 win over Mabank but entered late October on a seven-game losing streak against a schedule that includes Kilgore, Lindale, Chapel Hill and Henderson. The current page reports that record plainly rather than presenting stale early-season standings.',
      sourceUrl: 'https://www.bullardisd.net/departments/communicationspr/news/news-details/~board/district-news/post/colton-bradford-named-head-football-coach',
      sourceLabel: 'Bullard ISD official Bradford appointment plus Oct. 24 current score ledger',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2018-2020', title: 'Three straight bi-district playoff appearances under the staff Bradford later led', body: 'Bullard ISD said Bradford served as defensive coordinator during a five-year period that included bi-district playoff appearances in 2018, 2019 and 2020.', sourceUrl: 'https://www.bullardisd.net/departments/communicationspr/news/news-details/~board/district-news/post/colton-bradford-named-head-football-coach', sourceLabel: 'Bullard ISD official coaching announcement' },
      { date: 'April 25, 2023', title: 'Colton Bradford promoted to head football coach', body: 'The district promoted Bradford after Scott Callaway retired from coaching while remaining athletic director.', sourceUrl: 'https://www.bullardisd.net/departments/communicationspr/news/news-details/~board/district-news/post/colton-bradford-named-head-football-coach', sourceLabel: 'Bullard ISD' },
      { date: 'October 23, 2026', title: 'Henderson beats Bullard 59-28', body: 'The current Bullard and Henderson schedules agree on the District 8 final, moving Bullard to 1-7 overall.', sourceUrl: 'https://www.maxpreps.com/tx/bullard/bullard-panthers/football/schedule/', sourceLabel: 'MaxPreps current Bullard schedule' }
    ],
    overview: [
      'Bullard High School identifies its community as Panther Nation, and its fight song explicitly refers to the Panthers and red, white and blue.',
      'Bullard ISD officially appointed Colton Bradford head football coach in 2023. Current 2026 roster data continues to list Bradford, so the coaching attribution is not based on an old staff archive alone.',
      'The current UIL alignment places Bullard in 4A Division I District 8. Older third-party pages can still show Division II, so the final 2026-28 UIL alignment controls this page.',
      'The Panthers are 1-7 through October 23. Jacksonville and Pine Tree remain future games and are not assigned outcomes in advance.',
      'Bullard ISD publishes specific high-school traffic-flow guidance near the stadium, but that school-day traffic page is not treated as a complete football parking or accessibility policy.'
    ],
    faq: [
      { question: 'Who is the Bullard football head coach?', answer: 'Colton Bradford. Bullard ISD officially promoted him to head football coach in April 2023, and the current 2026 roster still lists Bradford.' },
      { question: 'Is Bullard 4A Division I or Division II in 2026?', answer: 'The final UIL 2026-28 football alignment places Bullard in Class 4A Division I District 8. Stale third-party labels showing Division II do not override the final UIL alignment.' },
      { question: 'What is Bullard football record after October 23, 2026?', answer: 'Bullard is 1-7 overall and 0-5 in district after a 59-28 loss at Henderson.' },
      { question: 'What are Bullard High School colors?', answer: 'Bullard High School fight-song text explicitly references red, white and blue. TexasDefined does not reproduce the district logo, whose external use requires district approval.' }
    ]
  },
  buna: {
    slug: 'buna',
    intro: "Buna's Cougars have turned a pair of 1-9 seasons into a 6-3 start in 2026. Kevin Terrier is the current head coach listed for the 2026 roster. Buna beat Coldspring-Oakhurst 20-8 on October 15 and Tarkington 46-0 on October 23, moving to 2-3 in District 10-3A Division I before the Kirbyville finale.",
    theme: { accentHex: '#1F5E3B', label: 'Original TexasDefined green editorial treatment; not a Buna ISD logo, seal or certified school color.' },
    seo: {
      title: 'Buna Cougars Football | 2026 Scores, Kevin Terrier & Cougar Stadium',
      description: 'Buna Cougars football: Kevin Terrier, 2026 District 10-3A Division I results, 46-0 Tarkington win, Cougar Stadium and Buna ISD sources.'
    },
    coach: {
      name: 'Kevin Terrier',
      title: '2026 head football coach',
      sourceUrl: 'https://www.maxpreps.com/tx/buna/buna-cougars/football/history/',
      sourceLabel: 'MaxPreps 2026 football history identifies Kevin Terrier as head coach; current team page abbreviates him as K. Terrier',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '711 County Road 734, Buna, TX 77612',
      phone: '409-994-4811',
      sourceUrl: 'https://hs.bunaisd.net/',
      sourceLabel: 'Buna High School official campus homepage; controls over conflicting third-party 177 FM 253 address',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Buna High official calendar and current 2026 football results',
      sourceUrl: 'https://hs.bunaisd.net/page/page_calendar?calID=133822',
      sourceLabel: 'Buna High official calendar confirms Oct. 23 senior-night varsity game and Oct. 30 Kirbyville trip; results cross-checked with current score sources',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://hs.bunaisd.net/page/page_calendar?calID=133822'
    },
    season: {
      record: '6-3 overall, 2-3 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/buna/buna-cougars/football/schedule/',
      sourceLabel: 'MaxPreps results through Coldspring-Oakhurst plus High School On SI Oct. 23 final Buna 46, Tarkington 0',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr',
      games: [
        { date: '2026-08-28', opponent: 'Kountze', site: 'Away', result: 'W 27-7' },
        { date: '2026-09-04', opponent: 'Woodville', site: 'Home', result: 'W 29-20' },
        { date: '2026-09-11', opponent: 'Huntington', site: 'Away', result: 'W 48-0' },
        { date: '2026-09-18', opponent: 'South Beauregard', site: 'Home', result: 'W 37-21' },
        { date: '2026-09-25', opponent: 'East Chambers', site: 'Home', district: true, result: 'L 7-35' },
        { date: '2026-10-02', opponent: 'Orangefield', site: 'Away', district: true, result: 'L 7-20' },
        { date: '2026-10-09', opponent: 'Anahuac', site: 'Home', district: true, result: 'L 40-41' },
        { date: '2026-10-15', opponent: 'Coldspring-Oakhurst', site: 'Away', district: true, result: 'W 20-8' },
        { date: '2026-10-23', opponent: 'Tarkington', site: 'Home', district: true, result: 'W 46-0' },
        { date: '2026-10-30', opponent: 'Kirbyville', site: 'Away', district: true, kickoff: '7:30 PM' }
      ]
    },
    venue: {
      name: 'Cougar Stadium',
      address: 'Buna, TX — verify current game entrance through Buna ISD',
      sourceUrl: 'https://www.texasfootball.com/team/buna-cougars',
      sourceLabel: "Dave Campbell's Texas Football identifies Cougar Stadium and 5,000 capacity; exact public gate/address not independently certified here",
      verifiedAt: '2026-10-25',
      note: 'Buna High official campus address is 711 County Road 734. A separate third-party football page uses 177 FM 253; TexasDefined does not collapse those into a claimed spectator gate.'
    },
    development: {
      title: 'A six-win rebound after consecutive 1-9 seasons',
      body: "Dave Campbell's lists Buna at 1-9 in both 2024 and 2025. The 2026 Cougars opened 4-0, lost their first three district games by scores that included a one-point 41-40 Anahuac result, then recovered with a 20-8 win at Coldspring-Oakhurst and a 46-0 senior-night shutout of Tarkington. That makes the current season a substantial rebound without pretending it is complete before the Kirbyville game.",
      sourceUrl: 'https://www.texasfootball.com/team/buna-cougars',
      sourceLabel: "Dave Campbell's historical seasons and current schedule, plus Oct. 23 statewide final",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2018', title: 'Buna posts an 8-3 season', body: "Dave Campbell's historical records list the 2018 Cougars at 8-3, one of the stronger recent seasons before the 2024-25 downturn.", sourceUrl: 'https://www.texasfootball.com/team/buna-cougars', sourceLabel: "Dave Campbell's Buna history" },
      { date: '2024-2025', title: 'Back-to-back 1-9 seasons', body: 'The program entered 2026 after consecutive 1-9 finishes, making the current rebound materially different from the prior two years.', sourceUrl: 'https://www.texasfootball.com/team/buna-cougars', sourceLabel: "Dave Campbell's past seasons" },
      { date: 'October 23, 2026', title: 'Buna shuts out Tarkington 46-0', body: 'The senior-night district win moved Buna to 6-3 overall and gave the Cougars a second straight district victory.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr', sourceLabel: 'High School On SI statewide Oct. 23 finals' }
    ],
    overview: [
      'Buna High School is a Buna ISD campus in Jasper County. The school homepage uses the Cougars identity and publishes the official academic-campus address as 711 County Road 734.',
      'Kevin Terrier is the full current head-coach name shown in MaxPreps 2026 history; the current team page abbreviates the same coach as K. Terrier.',
      "Dave Campbell's credits Buna with 18 football playoff appearances but no state title or state-final appearance. The 2018 8-3 season supplies recent history without inventing a championship claim.",
      'The 2026 Cougars are 6-3 through the October 23 Tarkington shutout, with Kirbyville remaining. No future result is pre-filled.',
      'Cougar Stadium is sourced by Dave Campbell’s, but the page does not claim that the academic campus address or the separate third-party FM 253 address is the exact spectator entrance.'
    ],
    faq: [
      { question: 'Who coaches Buna football in 2026?', answer: 'Kevin Terrier. MaxPreps 2026 history gives the full name; the current team page abbreviates him as K. Terrier.' },
      { question: 'What is Buna football record after October 23, 2026?', answer: 'Buna is 6-3 overall and 2-3 in district after a 46-0 win over Tarkington.' },
      { question: 'Has Buna won a football state championship?', answer: "No. Dave Campbell's lists 18 playoff appearances, zero state titles and zero title-game appearances." },
      { question: 'Why does TexasDefined use 711 County Road 734 for Buna High?', answer: 'That is the address on the official Buna High School site. A third-party football page lists 177 FM 253, so TexasDefined keeps the official campus address and does not claim either address is a verified spectator gate.' }
    ]
  },
  burkburnett: {
    slug: 'burkburnett',
    intro: "Burkburnett's Bulldogs are in UIL Class 4A Division II District 4 and have rebounded sharply from recent losing seasons. The official Burkburnett ISD athletics staff identifies Jody Littleton as Athletic Director/Head Football Coach. That first-party listing controls over a conflicting MaxPreps history entry that labels Alex Wright head coach for 2026. The Bulldogs are 5-3 through the October 23 loss at Graham.",
    theme: { accentHex: '#7A1E2C', label: 'Original TexasDefined Bulldog editorial treatment; no Burkburnett ISD logo or seal reproduced.' },
    seo: {
      title: 'Burkburnett Bulldogs Football | 2026 Scores, Jody Littleton & Bulldog Stadium',
      description: 'Burkburnett Bulldogs football: Jody Littleton, 2026 District 4-4A Division II results, Graham final, Bulldog Stadium parking policy and Wichita County context.'
    },
    coach: {
      name: 'Jody Littleton',
      title: 'Athletic Director / Head Football Coach',
      sourceUrl: 'https://www.burkburnettisd.org/o/athletics/staff',
      sourceLabel: 'Burkburnett ISD Athletics official staff directory; controls over conflicting MaxPreps 2026 coach label',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '109 W. Kramer Rd, Burkburnett, TX 76354',
      phone: '940-569-1411',
      sourceUrl: 'https://www.burkburnettisd.org/o/bhs/page/about',
      sourceLabel: 'Burkburnett High School official campus page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Burkburnett 2026 current football results',
      sourceUrl: 'https://www.maxpreps.com/tx/burkburnett/burkburnett-bulldogs/football/schedule/',
      sourceLabel: 'UIL-partner current result feed, cross-checked with statewide Oct. 23 finals and Burkburnett ISD staff/venue pages',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.burkburnettisd.org/o/athletics'
    },
    season: {
      record: '5-3 overall, 1-2 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burkburnett/burkburnett-bulldogs/football/schedule/',
      sourceLabel: 'MaxPreps results through Iowa Park plus statewide Oct. 23 Graham final',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr',
      games: [
        { date: '2026-08-28', opponent: 'Western Hills', site: 'Away', result: 'W 44-13' },
        { date: '2026-09-04', opponent: 'Krum', site: 'Away', result: 'L 14-48' },
        { date: '2026-09-11', opponent: 'Ranchview', site: 'Home', result: 'W 34-31' },
        { date: '2026-09-18', opponent: 'Lake Worth', site: 'Home', result: 'W 56-6' },
        { date: '2026-09-25', opponent: 'Gainesville', site: 'Home', result: 'W 64-0' },
        { date: '2026-10-02', opponent: 'Brock', site: 'Away', district: true, result: 'L 7-72' },
        { date: '2026-10-16', opponent: 'Iowa Park', site: 'Home', district: true, result: 'W 21-13' },
        { date: '2026-10-23', opponent: 'Graham', site: 'Away', district: true, result: 'L 0-70' },
        { date: '2026-10-30', opponent: 'Mineral Wells', site: 'Home', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Bridgeport', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Bulldog Stadium',
      address: 'Near Burkburnett High School on W. Kramer Rd, Burkburnett, TX 76354',
      sourceUrl: 'https://www.burkburnettisd.org/o/athletics/page/event-policy',
      sourceLabel: 'Burkburnett ISD Athletics official event policy provides separate home/visitor entrance rules and stadium parking directions',
      verifiedAt: '2026-10-25',
      note: 'Burkburnett ISD says home and visitor fans use separate entrances and may not cross over. Its event-policy page also publishes parking directions from I-44.'
    },
    development: {
      title: 'A 2026 rebound with an official-source coaching conflict resolved',
      body: 'Burkburnett went 2-8 in 2024 and 1-9 in 2025 in the MaxPreps history feed, then opened 2026 at 5-3 through October 23. The same third-party history labels Alex Wright as 2026 head coach, but Burkburnett ISD currently identifies Jody Littleton as Athletic Director/Head Football Coach. TexasDefined uses the district source and documents the conflict rather than blending the two identities.',
      sourceUrl: 'https://www.burkburnettisd.org/o/athletics/staff',
      sourceLabel: 'Burkburnett ISD official staff plus MaxPreps season history',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2024-2025', title: 'Two difficult seasons precede the current rebound', body: 'MaxPreps history lists Burkburnett at 2-8 in 2024 and 1-9 in 2025 before the five-win start in 2026.', sourceUrl: 'https://www.maxpreps.com/tx/burkburnett/burkburnett-bulldogs/football/history/', sourceLabel: 'MaxPreps Burkburnett history' },
      { date: 'September 25, 2026', title: 'Bulldogs shut out Gainesville 64-0', body: 'The home win pushed Burkburnett to four victories before district play tightened the schedule.', sourceUrl: 'https://www.maxpreps.com/tx/burkburnett/burkburnett-bulldogs/football/schedule/', sourceLabel: 'MaxPreps current schedule' },
      { date: 'October 23, 2026', title: 'Graham wins the district matchup 70-0', body: 'Statewide final-score reporting lists Graham 70, Burkburnett 0.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr', sourceLabel: 'High School On SI statewide Oct. 23 finals' }
    ],
    overview: [
      'Burkburnett High School is a Wichita County campus at 109 W. Kramer Rd. The district athletics site uses the Bulldogs identity and publishes a dedicated Bulldog Stadium event policy.',
      'Jody Littleton is the current first-party Athletic Director/Head Football Coach. A conflicting third-party 2026 history label is explicitly rejected in favor of the district staff directory.',
      'UIL places Burkburnett in Class 4A Division II District 4 for 2026-28.',
      'The Bulldogs are 5-3 through October 23 after a 70-0 loss to undefeated Graham. Mineral Wells and Bridgeport remain future games.',
      'Unlike many school pages, Burkburnett ISD publishes useful stadium operating detail: separate fan entrances and parking directions. Those first-party details are linked rather than guessed.'
    ],
    faq: [
      { question: 'Who is the Burkburnett football head coach in 2026?', answer: 'Burkburnett ISD officially lists Jody Littleton as Athletic Director/Head Football Coach. A conflicting MaxPreps history entry says Alex Wright, but the current district source controls this page.' },
      { question: 'What is Burkburnett football record after October 23, 2026?', answer: 'Burkburnett is 5-3 overall and 1-2 in district after a 70-0 loss at Graham.' },
      { question: 'Where does Burkburnett play home football games?', answer: 'Burkburnett ISD identifies Bulldog Stadium and publishes separate home/visitor entrance rules plus parking directions on its athletics event-policy page.' },
      { question: 'What classification is Burkburnett in?', answer: 'UIL places Burkburnett in Class 4A Division II District 4 for the 2026-28 cycle.' }
    ]
  },
  burkeville: {
    slug: 'burkeville',
    intro: "Burkeville is a Newton County six-man program with genuine state-championship history. Dave Campbell's credits the Mustangs with two state titles and three title-game appearances, while historical schedule records identify the championship years as 1986 and 2001. In 2026, Keith Hendrix is the current coach and Burkeville is 3-4 after the October 22 district loss at Chester.",
    theme: { accentHex: '#1D4E89', label: 'Original TexasDefined blue Mustang editorial treatment inspired by Burkeville school-spirit presentation; no official logo reproduced.' },
    seo: {
      title: 'Burkeville Mustangs Football | 2026 Six-Man Scores, Keith Hendrix & History',
      description: 'Burkeville Mustangs six-man football: Keith Hendrix, 1986 and 2001 title history, 2026 District 13 results, Chester score discrepancy and Newton County guide.'
    },
    coach: {
      name: 'Keith Hendrix',
      title: '2026 head football coach',
      sourceUrl: 'https://www.maxpreps.com/tx/burkeville/burkeville-mustangs/football/history/',
      sourceLabel: 'MaxPreps 2026 history lists Keith Hendrix; 2025 history lists Aaron Hallford, making the coaching change date-sensitive',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '231 CR 2099, Burkeville, TX 75932',
      phone: '409-565-2201',
      sourceUrl: 'https://www.burkevilleisd.org/',
      sourceLabel: 'Burkeville ISD official homepage',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Burkeville ISD football schedule and current results',
      sourceUrl: 'https://www.burkevilleisd.org/athletics',
      sourceLabel: 'Burkeville ISD official athletics schedule confirms district dates; current game results cross-checked against MaxPreps, statewide finals and Pigskin Prep',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.burkevilleisd.org/athletics'
    },
    season: {
      record: '3-4 overall, 0-1 district through October 22, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burkeville/burkeville-mustangs/football/',
      sourceLabel: 'MaxPreps game ledger through Legacy Christian plus statewide/Pigskin Chester final; Chester score-source disagreement disclosed',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-thursday-october-22-2026-01m5mdmq0eey',
      games: [
        { date: '2026-08-29', opponent: "O'Connell", site: 'Home', result: 'W 47-0' },
        { date: '2026-09-04', opponent: 'Alpha Omega Academy', site: 'Away', result: 'L 8-54' },
        { date: '2026-09-10', opponent: 'High Island', site: 'Home', result: 'W 68-6' },
        { date: '2026-09-17', opponent: 'Baytown Christian', site: 'Home', result: 'L 22-40' },
        { date: '2026-10-03', opponent: 'Calvert', site: 'Home', result: 'W 59-37' },
        { date: '2026-10-09', opponent: 'Legacy Christian Academy', site: 'Away', result: 'L 18-63' },
        { date: '2026-10-22', opponent: 'Chester', site: 'Away', district: true, result: 'L 12-62 (statewide/Pigskin; SETXsports reports 12-61)' },
        { date: '2026-10-30', opponent: "Leverett's Chapel", site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-05', opponent: 'Union Hill', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Roy Harper Stadium',
      address: 'Burkeville, TX 75932 — verify current entrance through Burkeville ISD',
      sourceUrl: 'https://www.texasfootball.com/team/burkeville-mustangs',
      sourceLabel: "Dave Campbell's Texas Football identifies Roy Harper Stadium and an 800 capacity; first-party spectator-gate detail not located",
      verifiedAt: '2026-10-25',
      note: 'Burkeville ISD publishes the district campus address at 231 CR 2099. TexasDefined does not assume that address describes a specific stadium gate or accessibility route.'
    },
    development: {
      title: 'Championship history meets a modern six-man rebuilding cycle',
      body: "Dave Campbell's credits Burkeville with two state titles, three state-final appearances and 25 playoff appearances. Historical football records identify the title seasons as 1986 and 2001. The modern program has played short/incomplete-looking schedules in several recent seasons, and 2026 includes source conflicts: DCTF still labels the O'Connell opener cancelled even though both Burkeville and O'Connell MaxPreps pages record a 47-0 played final, while Chester's October 22 final appears as 62-12 in statewide/Pigskin sources and 61-12 at SETXsports.",
      sourceUrl: 'https://www.texasfootball.com/team/burkeville-mustangs',
      sourceLabel: "Dave Campbell's program history, MaxPreps opponent corroboration and current score feeds",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '1986', title: 'Burkeville wins a state football championship', body: "Historical program records identify 1986 as one of Burkeville's two championship seasons; DCTF independently reports two total state titles.", sourceUrl: 'https://www.lonestarfootball.net/team.asp?S=&T=1591', sourceLabel: 'Lone Star Football Network historical team record' },
      { date: '2001', title: 'Mustangs add a second state championship', body: 'Historical program records identify 2001 as Burkeville’s second state-title season.', sourceUrl: 'https://www.lonestarfootball.net/team.asp?S=&T=1591', sourceLabel: 'Lone Star Football Network historical team record' },
      { date: 'August 29, 2026', title: "Burkeville opens with a 47-0 win over O'Connell", body: "Both teams' MaxPreps pages record the played final, contradicting an older DCTF schedule state that still labels the game cancelled.", sourceUrl: 'https://www.maxpreps.com/tx/galveston/oconnell-buccaneers/football/', sourceLabel: "O'Connell opponent page corroborates Burkeville's 47-0 final" },
      { date: 'October 22, 2026', title: 'Chester result carries a one-point source discrepancy', body: 'High School On SI and Pigskin Prep report Chester 62-12; SETXsports reports 61-12. TexasDefined records the controlling two-source 62-12 result and preserves the disagreement.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-thursday-october-22-2026-01m5mdmq0eey', sourceLabel: 'High School On SI Thursday finals' }
    ],
    overview: [
      'Burkeville ISD is in Newton County and uses the Mustangs identity. The official district site publishes 231 CR 2099 as the district address.',
      'Keith Hendrix is the current 2026 head coach in the current history feed; Aaron Hallford was listed for 2025.',
      'Burkeville plays UIL 1A Division I six-man football in District 13 for 2026-28.',
      "The program's historical résumé is real: two state titles, three title-game appearances and 25 playoff appearances according to Dave Campbell's. The title years are recorded as 1986 and 2001 by historical team records.",
      'Current score conflicts are not hidden. The page explicitly discloses both the Chester one-point discrepancy and the stale DCTF cancelled label for a verified played O’Connell opener.'
    ],
    faq: [
      { question: 'Does Burkeville play six-man football?', answer: 'Yes. UIL places Burkeville in 1A Division I District 13 for the 2026-28 six-man alignment.' },
      { question: 'Who coaches Burkeville football in 2026?', answer: 'Keith Hendrix is listed as the 2026 head coach. The same history feed lists Aaron Hallford in 2025.' },
      { question: 'How many football state titles has Burkeville won?', answer: "Dave Campbell's lists two state titles and three title-game appearances. Historical team records identify the championship seasons as 1986 and 2001." },
      { question: 'What was the Burkeville-Chester score on October 22?', answer: 'High School On SI and Pigskin Prep report Chester 62, Burkeville 12. SETXsports reports 61-12, so TexasDefined explicitly notes the one-point source disagreement.' }
    ]
  },
  burleson: {
    slug: 'burleson',
    intro: "Burleson High School's Elks are a Johnson County Class 5A Division II District 7 program. Burleson ISD officially lists Phillip Tanner as Campus Athletic Coordinator/Head Football Coach. The 2026 Elks are 2-6 overall and 2-3 in district through the October 23 loss to Midlothian Heritage, with Seguin and Joshua remaining.",
    theme: { accentHex: '#C8102E', label: 'Original TexasDefined red editorial accent based on Burleson High official red/white/black school colors; no Elk logo reproduced.' },
    seo: {
      title: 'Burleson Elks Football | 2026 Scores, Phillip Tanner & BISD Stadium',
      description: 'Burleson Elks football: Phillip Tanner, 2026 District 7-5A Division II results, Midlothian Heritage final, Johnson County campus and BISD Stadium context.'
    },
    coach: {
      name: 'Phillip Tanner',
      title: 'Campus Athletic Coordinator / Head Football Coach',
      sourceUrl: 'https://www.burlesonisd.net/departments/athletics-interscholastic-activities',
      sourceLabel: 'Burleson ISD official district athletics staff',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '100 Elk Drive, Burleson, TX 76028',
      phone: '817-245-0000',
      sourceUrl: 'https://bhs.burlesonisd.net/our-school/about-us',
      sourceLabel: 'Burleson High School official About Us page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Burleson High official football schedule access and current results',
      sourceUrl: 'https://bhs.burlesonisd.net/activities',
      sourceLabel: 'Burleson High official activities page links football schedules through Rank One and lists current staff; results cross-checked with MaxPreps',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://bhs.burlesonisd.net/activities'
    },
    season: {
      record: '2-6 overall, 2-3 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burleson/burleson-elks/football/schedule/',
      sourceLabel: 'MaxPreps result feed through Ennis plus published Oct. 23 Midlothian Heritage final',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/football/game/burleson-vs-midlothian-heritage/10-23-2026/?c=79ea9be0-ab44-44f5-8704-aac4a2dec165&tab=Matchup',
      games: [
        { date: '2026-08-28', opponent: 'Keller', site: 'Home', result: 'L 14-55' },
        { date: '2026-09-04', opponent: 'Burleson Centennial', site: 'Home', result: 'L 3-28' },
        { date: '2026-09-11', opponent: 'Birdville', site: 'Home', result: 'L 20-49' },
        { date: '2026-09-18', opponent: 'Mansfield Timberview', site: 'Away', district: true, result: 'L 0-64' },
        { date: '2026-09-25', opponent: 'Everman', site: 'Home', district: true, result: 'W 23-20' },
        { date: '2026-10-09', opponent: 'Corsicana', site: 'Away', district: true, result: 'W 49-21' },
        { date: '2026-10-16', opponent: 'Ennis', site: 'Away', district: true, result: 'L 3-41' },
        { date: '2026-10-23', opponent: 'Midlothian Heritage', site: 'Home', district: true, result: 'L 7-45' },
        { date: '2026-10-29', opponent: 'Arlington Seguin', site: 'Away', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Joshua', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'BISD Stadium / Burleson Stadium',
      address: 'Burleson, TX — use Burleson ISD event listing for current game location',
      sourceUrl: 'https://bhs.burlesonisd.net/',
      sourceLabel: "Burleson High calendar identifies BISD Stadium for home football events; Dave Campbell's lists Burleson Stadium with 7,500 capacity",
      verifiedAt: '2026-10-25',
      note: 'The October 30 Arlington Seguin event is currently shown by the school as Location TBD, so TexasDefined does not assign a stadium in advance.'
    },
    development: {
      title: 'Phillip Tanner era follows the Kitna period',
      body: "Burleson's 2021 team went 8-4 and won its first playoff game since 2015 under Jon Kitna. MaxPreps history lists Kitna through 2024 and Phillip Tanner in 2025; Burleson ISD currently lists Tanner as head football coach. The 2026 Elks opened 0-4, then beat Everman and Corsicana before losses to Ennis and Midlothian Heritage.",
      sourceUrl: 'https://www.burlesonisd.net/departments/athletics-interscholastic-activities',
      sourceLabel: 'Burleson ISD current staff plus historical season records',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2021', title: 'Eight-win season and a playoff breakthrough', body: 'Burleson went 8-4 and beat Mesquite Poteet in the playoffs, its first postseason victory since 2015 according to contemporaneous local reporting.', sourceUrl: 'https://sports.yahoo.com/2022-season-preview-burleson-elks-035900833.html', sourceLabel: 'Cleburne Times-Review 2022 season preview via Yahoo Sports' },
      { date: '2025', title: 'Phillip Tanner listed as Burleson head coach', body: 'MaxPreps history lists Tanner for 2025, and the current Burleson ISD athletics directory confirms him as Campus Athletic Coordinator/Head Football Coach.', sourceUrl: 'https://www.burlesonisd.net/departments/athletics-interscholastic-activities', sourceLabel: 'Burleson ISD current athletics staff' },
      { date: 'October 23, 2026', title: 'Midlothian Heritage beats Burleson 45-7', body: 'The district loss moved the Elks to 2-6 overall and 2-3 in District 7.', sourceUrl: 'https://www.maxpreps.com/tx/football/game/burleson-vs-midlothian-heritage/10-23-2026/?c=79ea9be0-ab44-44f5-8704-aac4a2dec165&tab=Matchup', sourceLabel: 'MaxPreps final game page' }
    ],
    overview: [
      'Burleson High School is in Johnson County at 100 Elk Drive. Its official About Us page identifies the mascot as Elk and the colors as red, white and black.',
      'Phillip Tanner is the current first-party head football coach and campus athletic coordinator.',
      "Dave Campbell's lists 18 playoff appearances, zero state titles and zero state-final appearances for Burleson, with Burleson Stadium as the program venue.",
      'The 2026 Elks are 2-6 through October 23. Arlington Seguin and Joshua remain; the school currently marks the Seguin location TBD.',
      'Burleson High and Burleson Centennial are separate football programs. The September 4 Centennial game is an opponent matchup, not a duplicate school identity.'
    ],
    faq: [
      { question: 'Who coaches Burleson High School football?', answer: 'Phillip Tanner. Burleson ISD officially lists him as BHS Campus Athletic Coordinator / Head Football Coach.' },
      { question: 'What is Burleson football record after October 23, 2026?', answer: 'The Elks are 2-6 overall and 2-3 in district after a 45-7 loss to Midlothian Heritage.' },
      { question: 'What are Burleson High School colors and mascot?', answer: 'The official school page lists the mascot as Elk and the colors as red, white and black.' },
      { question: 'Has Burleson won a football state title?', answer: "No. Dave Campbell's lists 18 playoff appearances but zero state titles and zero title-game appearances." }
    ]
  },
  'burleson-centennial': {
    slug: 'burleson-centennial',
    intro: "Centennial High School's Spartans are Burleson ISD's separate 5A Division I program, not a second name for Burleson High. Burleson ISD officially lists Blake Meyer as Centennial Campus Athletic Coordinator/Head Football Coach. The 2026 Spartans are 5-3 overall and 2-3 in District 8 after Lancaster's 55-14 win on October 23.",
    theme: { accentHex: '#1F3A5F', label: 'Original TexasDefined Spartan editorial treatment; no Centennial or Burleson ISD logo reproduced.' },
    seo: {
      title: 'Burleson Centennial Spartans Football | 2026 Scores & Blake Meyer',
      description: 'Centennial Spartans football in Burleson: Blake Meyer, 2026 District 8-5A Division I results, 2022 12-2 benchmark and Johnson County sources.'
    },
    coach: {
      name: 'Blake Meyer',
      title: 'Campus Athletic Coordinator / Head Football Coach',
      sourceUrl: 'https://www.burlesonisd.net/departments/athletics-interscholastic-activities',
      sourceLabel: 'Burleson ISD official athletics staff directory',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '201 S. Hurst Rd., Burleson, TX 76028',
      phone: '817-245-0250',
      sourceUrl: 'https://chs.burlesonisd.net/our-school/about-us',
      sourceLabel: 'Centennial High School official About Us page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Centennial 2026 football schedule and current result feed',
      sourceUrl: 'https://www.chsspartanfootball.com/schedule',
      sourceLabel: 'Centennial Spartan Football schedule, cross-checked with UIL-partner and statewide results',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.chsspartanfootball.com/schedule'
    },
    season: {
      record: '5-3 overall, 2-3 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burleson/centennial-spartans/football/schedule/',
      sourceLabel: 'Current Centennial result feed plus statewide Oct. 23 Lancaster final',
      latestResultSourceUrl: 'https://www.mrt.com/sports/highschool/article/texas-statewide-high-school-football-scores-oct-22492121.php',
      games: [
        { date: '2026-08-28', opponent: 'Weatherford', site: 'Away', result: 'W 31-21' },
        { date: '2026-09-04', opponent: 'Burleson', site: 'Away', result: 'W 28-3' },
        { date: '2026-09-10', opponent: 'Ennis', site: 'Home', result: 'W 31-10' },
        { date: '2026-09-18', opponent: 'DeSoto', site: 'Home', district: true, result: 'L 3-29' },
        { date: '2026-09-25', opponent: 'Cleburne', site: 'Away', district: true, result: 'W 55-7' },
        { date: '2026-10-09', opponent: 'Mansfield Legacy', site: 'Home', district: true, result: 'W 35-7' },
        { date: '2026-10-16', opponent: 'Midlothian', site: 'Home', district: true, result: 'L 7-14' },
        { date: '2026-10-23', opponent: 'Lancaster', site: 'Away', district: true, result: 'L 14-55' },
        { date: '2026-10-30', opponent: 'Mansfield Summit', site: 'Home', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Cedar Hill', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Burleson Stadium / BISD Stadium',
      address: 'Burleson, TX — confirm the current event entrance through Burleson ISD',
      sourceUrl: 'https://www.texasfootball.com/team/default.aspx?url=burleson-centennial-spartans',
      sourceLabel: "Dave Campbell's identifies Burleson Stadium with 7,500 capacity; district event information controls current game logistics",
      verifiedAt: '2026-10-25',
      note: 'Centennial and Burleson High are separate programs that use the same district stadium system. Do not assume the Centennial campus address is the spectator entrance.'
    },
    development: {
      title: 'A program with a 12-win benchmark, now navigating District 8',
      body: "Dave Campbell's lists Centennial at 12-2 in 2022, 10-2 in both 2018 and 2019, 12 playoff appearances, and no state football title or title-game appearance. The 2026 team opened 3-0 and reached 5-1 before close loss to Midlothian and a 55-14 setback at Lancaster. That context gives the current season substance without manufacturing a championship history.",
      sourceUrl: 'https://www.texasfootball.com/team/default.aspx?url=burleson-centennial-spartans',
      sourceLabel: "Dave Campbell's Centennial program history",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: 'August 2010', title: 'Centennial opens as a separate Burleson high school', body: 'Centennial High School says it opened in August 2010 and identifies itself as Home of the Spartans.', sourceUrl: 'https://chs.burlesonisd.net/our-school/about-us', sourceLabel: 'Centennial High School official About Us' },
      { date: '2022', title: 'Spartans post a 12-2 season', body: "Dave Campbell's lists Centennial at 12-2 in 2022, the strongest recent season in the visible program history.", sourceUrl: 'https://www.texasfootball.com/team/default.aspx?url=burleson-centennial-spartans', sourceLabel: "Dave Campbell's program history" },
      { date: 'October 23, 2026', title: 'Lancaster beats Centennial 55-14', body: 'The statewide Associated Press score list records Lancaster 55, Burleson Centennial 14.', sourceUrl: 'https://www.mrt.com/sports/highschool/article/texas-statewide-high-school-football-scores-oct-22492121.php', sourceLabel: 'Associated Press statewide scores via Midland Reporter-Telegram' }
    ],
    overview: [
      'Centennial High School is a Johnson County campus at 201 S. Hurst Road in Burleson. Its official About Us page identifies the school as Home of the Spartans.',
      'Burleson ISD officially lists Blake Meyer as Centennial Campus Athletic Coordinator / Head Football Coach.',
      'UIL places Centennial in Class 5A Division I District 8 for 2026-28. Burleson High is a separate 5A Division II program.',
      "Dave Campbell's credits Centennial with 12 playoff appearances but no state title or state-final appearance. The 12-2 2022 season is a major program benchmark without being mislabeled a championship.",
      'Centennial is 5-3 through October 23, with Mansfield Summit and Cedar Hill remaining.'
    ],
    faq: [
      { question: 'Who coaches Burleson Centennial football?', answer: 'Blake Meyer. Burleson ISD officially lists him as Centennial Campus Athletic Coordinator / Head Football Coach.' },
      { question: 'Is Centennial the same football program as Burleson High?', answer: 'No. Centennial High and Burleson High are separate Burleson ISD campuses and separate UIL football programs.' },
      { question: 'What is Centennial football record after October 23, 2026?', answer: 'Centennial is 5-3 overall and 2-3 in District 8 after a 55-14 loss at Lancaster.' },
      { question: 'Has Centennial won a football state title?', answer: "No. Dave Campbell's lists zero state titles and zero title-game appearances; the 2022 Spartans went 12-2." }
    ]
  },
  burnet: {
    slug: 'burnet',
    intro: "Burnet High School's Bulldogs are in UIL Class 4A Division I District 12. First-party Burnet CISD pages identify Ben Speer as the 2026-27 head football coach. The Bulldogs are 1-7 after the October 23 Lampasas loss; their lone win is a 33-31 district road victory at China Spring.",
    theme: { accentHex: '#17823B', label: 'Original TexasDefined Kelly Green editorial treatment based on Ben Speer’s official Burnet High bio; no Bulldog logo reproduced.' },
    seo: {
      title: 'Burnet Bulldogs Football | 2026 Scores, Ben Speer & District 12',
      description: 'Burnet Bulldogs football: Ben Speer, 2026 District 12-4A Division I scores, China Spring win, Lampasas result and Burnet High sources.'
    },
    coach: {
      name: 'Ben Speer',
      title: 'Head Football Coach',
      sourceUrl: 'https://bhs.burnetcisd.net/apps/pages/index.jsp?pREC_ID=2222836&type=u&uREC_ID=1794188',
      sourceLabel: 'Burnet High School official Ben Speer staff page explicitly says he is serving as Head Football Coach in 2026-27',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '1000 The Green Mile, Burnet, TX 78611',
      phone: '512-756-6193',
      sourceUrl: 'https://bhs.burnetcisd.net/apps/pages/index.jsp?pREC_ID=1798197&type=d&uREC_ID=950381',
      sourceLabel: 'Burnet High School official football page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Burnet High football and district event schedule',
      sourceUrl: 'https://www.burnetcisd.net/apps/events/2026/10/',
      sourceLabel: 'Burnet CISD official October athletics events, cross-checked against current football score feeds',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.burnetcisd.net/apps/events/2026/10/'
    },
    season: {
      record: '1-7 overall, 1-2 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burnet/burnet-bulldogs/football/',
      sourceLabel: 'Current MaxPreps Burnet result feed, corroborated by live scoreboard sources',
      latestResultSourceUrl: 'https://www.si.com/high-school/stats/texas/29900-austin/football/scores?date=2026-10-23',
      games: [
        { date: '2026-08-28', opponent: 'Llano', site: 'Away', result: 'L 31-38' },
        { date: '2026-09-04', opponent: 'Taylor', site: 'Home', result: 'L 30-49' },
        { date: '2026-09-11', opponent: 'Lago Vista', site: 'Home', result: 'L 26-48' },
        { date: '2026-09-18', opponent: 'Blanco', site: 'Away', result: 'L 7-28' },
        { date: '2026-09-25', opponent: 'Gatesville', site: 'Home', result: 'L 7-42' },
        { date: '2026-10-09', opponent: 'China Spring', site: 'Away', district: true, result: 'W 33-31' },
        { date: '2026-10-16', opponent: 'Marble Falls', site: 'Away', district: true, result: 'L 16-34' },
        { date: '2026-10-23', opponent: 'Lampasas', site: 'Home', district: true, result: 'L 20-35' },
        { date: '2026-10-30', opponent: 'Stephenville', site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-06', opponent: 'Jarrell', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Bulldog Field',
      address: 'Burnet High School area, 1000 The Green Mile, Burnet, TX 78611',
      sourceUrl: 'https://www.texaschalktalk.com/2026/10/22/burnet-football-welcomes-lampasas/',
      sourceLabel: 'Texas Chalk Talk local coverage identifies the home venue as Bulldog Field; Burnet CISD official events confirm the home varsity date',
      verifiedAt: '2026-10-25',
      note: 'Use Burnet CISD event instructions for the exact spectator entrance, parking and accessibility route; the academic address is not itself a gate certification.'
    },
    development: {
      title: 'The China Spring breakthrough in a difficult 2026 season',
      body: 'Burnet opened 0-5 before earning a 33-31 district road win at China Spring on October 9. Losses at Marble Falls and to Lampasas followed, leaving the Bulldogs 1-7. Speer’s official school bio says 2026-27 is his sixth year at Burnet High and 24th as an educator, grounding the current coaching era in first-party information rather than a stale directory.',
      sourceUrl: 'https://bhs.burnetcisd.net/apps/pages/index.jsp?pREC_ID=2222836&type=u&uREC_ID=1794188',
      sourceLabel: 'Burnet High official Ben Speer biography and current score feeds',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2026-27 school year', title: 'Ben Speer begins his sixth year at Burnet High', body: 'Speer’s official staff page says he will serve as head football coach in his sixth year at Burnet High and 24th year in education.', sourceUrl: 'https://bhs.burnetcisd.net/apps/pages/index.jsp?pREC_ID=2222836&type=u&uREC_ID=1794188', sourceLabel: 'Burnet High official staff bio' },
      { date: 'October 9, 2026', title: 'Burnet breaks through at China Spring, 33-31', body: 'The road win ended an 0-5 start and gave Burnet its first District 12 victory.', sourceUrl: 'https://txprepfootball.com/schools/burnet/', sourceLabel: 'Texas Prep Football current result ledger' },
      { date: 'October 23, 2026', title: 'Lampasas beats Burnet 35-20', body: 'Multiple current scoreboards agree on the District 12 final at Burnet.', sourceUrl: 'https://www.si.com/high-school/stats/texas/29900-austin/football/scores?date=2026-10-23', sourceLabel: 'High School On SI Austin scoreboard' }
    ],
    overview: [
      'Burnet High School is in Burnet County at 1000 The Green Mile. Its official football page identifies Ben Speer as head coach.',
      'Speer’s first-party biography explicitly says he is serving as head football coach in 2026-27 and notes the Burnet community’s Kelly Green identity.',
      'UIL places Burnet in Class 4A Division I District 12 for the 2026-28 cycle.',
      'Burnet is 1-7 through October 23. The 33-31 China Spring win is the current season’s verified breakthrough; Stephenville and Jarrell remain.',
      'The home field is locally identified as Bulldog Field. Exact entrance, parking and accessibility details remain event-specific and are not invented.'
    ],
    faq: [
      { question: 'Who coaches Burnet football in 2026?', answer: 'Ben Speer. Burnet High School’s official staff page explicitly says he is serving as Head Football Coach in 2026-27.' },
      { question: 'What is Burnet football record after October 23, 2026?', answer: 'Burnet is 1-7 overall and 1-2 in district after a 35-20 loss to Lampasas.' },
      { question: 'What is Burnet’s 2026 win?', answer: 'Burnet defeated China Spring 33-31 on the road on October 9 for its first win of the season.' },
      { question: 'What color identity is sourced for Burnet?', answer: 'Ben Speer’s official Burnet High biography says his family is proud to wear Kelly Green. TexasDefined uses that as an editorial accent without reproducing an official logo.' }
    ]
  },
  burton: {
    slug: 'burton',
    intro: "Burton High School's Panthers are a Washington County Class 2A Division II District 13 program led by athletic director and head football coach Jason Hodde. Burton entered the October 23 Bremond showdown 4-0 in district play; Bremond won 36-13, leaving Burton 5-2 overall and 4-1 in district with Chilton and Somerville remaining.",
    theme: { accentHex: '#C1272D', label: 'Original TexasDefined red editorial treatment reflecting Burton’s Panther-pride school presentation; no school-owned photo or logo reproduced.' },
    seo: {
      title: 'Burton Panthers Football | 2026 Scores, Jason Hodde & Panther Stadium',
      description: 'Burton Panthers football: Jason Hodde, 2026 District 13-2A Division II results, Bremond 36-13 final, 2022 13-1 season and Panther Stadium.'
    },
    coach: {
      name: 'Jason Hodde',
      title: 'Athletic Director / Head Football Coach',
      sourceUrl: 'https://www.burtonisd.net/staff?page_no=2',
      sourceLabel: 'Burton ISD official staff directory identifies Jason Hodde as Athletic Director; current KBTX game coverage identifies him as Burton head coach',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '917 North Main, Burton, TX 77835',
      phone: '979-289-3830',
      sourceUrl: 'https://www.burtonisd.net/',
      sourceLabel: 'Burton ISD official site plus current school football directory',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Burton 2026 football schedule and current results',
      sourceUrl: 'https://www.maxpreps.com/tx/burton/burton-panthers/football/schedule/',
      sourceLabel: 'UIL-partner Burton schedule, cross-checked with local KBTX and KWHI game coverage',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.burtonisd.net/'
    },
    season: {
      record: '5-2 overall, 4-1 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/burton/burton-panthers/football/schedule/',
      sourceLabel: 'Current Burton schedule through Holland plus KBTX Oct. 23 Bremond final',
      latestResultSourceUrl: 'https://www.kbtx.com/2026/10/24/bremond-beats-burton-claim-top-spot-district-13-2a-division-ii/',
      games: [
        { date: '2026-08-28', opponent: 'Thorndale', site: 'Home', result: 'L 15-43' },
        { date: '2026-09-04', opponent: 'Hearne', site: 'Away', result: 'W 17-14' },
        { date: '2026-09-25', opponent: 'Milano', site: 'Away', district: true, result: 'W 61-0' },
        { date: '2026-10-02', opponent: 'Bartlett', site: 'Home', district: true, result: 'W 69-26' },
        { date: '2026-10-09', opponent: 'Snook', site: 'Away', district: true, result: 'W 56-0' },
        { date: '2026-10-16', opponent: 'Holland', site: 'Away', district: true, result: 'W 55-0' },
        { date: '2026-10-23', opponent: 'Bremond', site: 'Home', district: true, result: 'L 13-36' },
        { date: '2026-10-30', opponent: 'Chilton', site: 'Away', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Somerville', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Panther Stadium',
      address: '917 Main St, Burton, TX',
      sourceUrl: 'https://kwhi.com/events/2026-10-23/',
      sourceLabel: "KWHI local event listing places Burton-Bremond at Panther Stadium, 917 Main St; Dave Campbell's independently names Panther Stadium and 1,327 capacity",
      verifiedAt: '2026-10-25',
      note: 'Burton ISD warns that school website photographs are property of its photographer/yearbook staff; none are reused here. Verify current event entrance and parking locally.'
    },
    development: {
      title: 'A four-game district winning streak tested by No. 1 Bremond',
      body: 'Burton followed an opening loss to Thorndale with wins over Hearne, Milano, Bartlett, Snook and Holland. The Panthers and Bremond both entered October 23 at 4-0 in district, but Bremond won 36-13 to take the lead. Jason Hodde told KBTX before the game that it was a measuring stick rather than a must-win; the result leaves Burton with Chilton and Somerville still ahead.',
      sourceUrl: 'https://www.kbtx.com/2026/10/24/bremond-beats-burton-claim-top-spot-district-13-2a-division-ii/',
      sourceLabel: 'KBTX local game coverage and current schedule',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2022', title: 'Burton posts a 13-1 season', body: "Dave Campbell's lists Burton at 13-1 in 2022, the strongest recent visible season in the program archive.", sourceUrl: 'https://www.texasfootball.com/team/burton-panthers', sourceLabel: "Dave Campbell's Burton program history" },
      { date: '2016', title: 'Burton and Bremond meet in the state semifinals', body: 'KBTX says the programs had not met since Bremond beat Burton 50-31 in the 2016 state semifinals.', sourceUrl: 'https://www.kbtx.com/2026/10/21/burton-hosts-no-1-bremond-kbtx-game-week/', sourceLabel: 'KBTX pregame historical context' },
      { date: 'October 23, 2026', title: 'Bremond wins the district-lead matchup 36-13', body: 'Both teams entered 4-0 in district; KBTX reports Bremond led 22-7 at halftime and finished 36-13.', sourceUrl: 'https://www.kbtx.com/2026/10/24/bremond-beats-burton-claim-top-spot-district-13-2a-division-ii/', sourceLabel: 'KBTX postgame report' }
    ],
    overview: [
      'Burton High School is in Burton, Washington County. The district’s own site uses Panther-pride imagery and its staff directory identifies Jason Hodde as Athletic Director.',
      'KBTX current football coverage identifies Hodde as Burton head coach, connecting the first-party athletic-director record to the current football role.',
      "Dave Campbell's lists 19 playoff appearances, zero state titles and zero title-game appearances, plus Panther Stadium and a 13-1 2022 season.",
      'Burton is 5-2 overall and 4-1 in district after the October 23 loss to Bremond. Chilton and Somerville remain.',
      'Burton ISD explicitly states that photographs on its web pages belong to its photographer/yearbook staff. TexasDefined does not copy them; the page uses an original source-derived graphic instead.'
    ],
    faq: [
      { question: 'Who coaches Burton football in 2026?', answer: 'Jason Hodde. Burton ISD lists him as Athletic Director, and current KBTX football coverage identifies him as Burton head coach.' },
      { question: 'What is Burton football record after October 23, 2026?', answer: 'Burton is 5-2 overall and 4-1 in District 13 after a 36-13 loss to Bremond.' },
      { question: 'Has Burton won a football state title?', answer: "No. Dave Campbell's lists 19 playoff appearances but zero state titles and zero title-game appearances." },
      { question: 'What happened in the 2026 Burton-Bremond game?', answer: 'Both teams entered 4-0 in district. Bremond led 22-7 at halftime and won 36-13, according to KBTX.' }
    ]
  },
  bushland: {
    slug: 'bushland',
    intro: "Bushland's Falcons are a Potter County Class 3A Division I District 1 program with a sustained recent playoff record. The 2026 Falcons are 5-3 overall and 1-1 in district through the October 16 loss at Shallowater, with an October 23 open date before Brownfield and Dalhart. Current third-party staff data is messy, so TexasDefined separates William Rabson's roster-history head-coach listing from Josh Reynolds' first-party Bushland ISD athletic-director role.",
    theme: { accentHex: '#B3202A', label: 'Original TexasDefined Falcon editorial treatment; no Bushland ISD logo or school-owned photography reproduced.' },
    seo: {
      title: 'Bushland Falcons Football | 2026 Scores, District 1 & Falcon Stadium',
      description: 'Bushland Falcons football: 2026 District 1-3A Division I results, William Rabson coaching-source note, Falcon Stadium, title-game history and Potter County context.'
    },
    coach: {
      name: 'William Rabson',
      title: '2026 roster-history listed head coach; first-party football-title confirmation still needed',
      sourceUrl: 'https://www.maxpreps.com/tx/bushland/bushland-falcons/football/history/',
      sourceLabel: 'MaxPreps 2026 history singles William Rabson as head coach; current staff page inconsistently labels multiple people head coach, while Bushland ISD identifies Josh Reynolds as Athletic Director',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '18701 Jim Line Rd., Amarillo, TX 79124',
      phone: '806-322-1184',
      sourceUrl: 'https://hs.bushlandisd.net/',
      sourceLabel: 'Bushland High School official homepage',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Bushland 2026 Falcon football schedule',
      sourceUrl: 'https://www.bushlandisd.net/126053_2',
      sourceLabel: 'Bushland ISD official athletics department links the 2026-27 Falcon football schedule; results cross-checked against current game feeds',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.bushlandisd.net/126053_2'
    },
    season: {
      record: '5-3 overall, 1-1 district through October 16, 2026; open October 23',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/bushland/bushland-falcons/football/schedule/',
      sourceLabel: 'Current MaxPreps schedule; Hereford 57-21 corroborated by Prep Redzone while stale statewide/DCTF feeds carry conflicting values',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/football/game/bushland-vs-shallowater/10-16-2026/?c=8def681a-1672-4b75-b258-405e42567e7a',
      games: [
        { date: '2026-08-28', opponent: 'Seminole', site: 'Away', result: 'L 42-62' },
        { date: '2026-09-04', opponent: 'Canadian', site: 'Home', result: 'L 17-27' },
        { date: '2026-09-11', opponent: 'Dumas', site: 'Away', result: 'W 40-35' },
        { date: '2026-09-18', opponent: 'Lubbock Christian', site: 'Home', result: 'W 69-40' },
        { date: '2026-09-25', opponent: 'Hereford', site: 'Away', result: 'W 57-21' },
        { date: '2026-10-02', opponent: 'Slaton', site: 'Home', result: 'W 70-55' },
        { date: '2026-10-09', opponent: 'Denver City', site: 'Home', district: true, result: 'W 70-14' },
        { date: '2026-10-16', opponent: 'Shallowater', site: 'Away', district: true, result: 'L 28-49' },
        { date: '2026-10-30', opponent: 'Brownfield', site: 'Home', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Dalhart', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Falcon Stadium',
      address: 'Bushland / Amarillo area — confirm current entrance through Bushland ISD',
      sourceUrl: 'https://www.texasfootball.com/team/bushland-falcons',
      sourceLabel: "Dave Campbell's identifies Falcon Stadium and 3,000 capacity; Bushland ISD controls current ticketing and event logistics",
      verifiedAt: '2026-10-25',
      note: 'The official high-school campus address is 18701 Jim Line Rd. Exact stadium gate, parking and accessibility details are not inferred from the campus address.'
    },
    development: {
      title: 'Sustained recent success, with source conflicts kept visible',
      body: "Dave Campbell's lists Bushland at 12-1 in 2019, 11-2 in 2022 and 10-2 in both 2023 and 2024, with 17 playoff appearances, one state-final appearance and no state title. The 2026 data also exposes why source control matters: current MaxPreps and Prep Redzone game records agree Bushland beat Hereford 57-21, while stale statewide and DCTF feeds carry incompatible scores. TexasDefined uses the two matching game-specific sources and documents the conflict.",
      sourceUrl: 'https://www.texasfootball.com/team/bushland-falcons',
      sourceLabel: "Dave Campbell's program history plus game-specific result corroboration",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2019', title: 'Bushland posts a 12-1 season', body: "Dave Campbell's recent history lists a 12-1 2019 season as a modern program high point.", sourceUrl: 'https://www.texasfootball.com/team/bushland-falcons', sourceLabel: "Dave Campbell's Bushland history" },
      { date: 'September 25, 2026', title: 'Bushland beats Hereford 57-21 amid conflicting aggregate feeds', body: 'The game-specific MaxPreps box score and Prep Redzone final agree on 57-21. TexasDefined rejects incompatible 62-21 and 99-75 aggregate entries.', sourceUrl: 'https://prepredzone.com/game/tx/hereford-vs-bushland/', sourceLabel: 'Prep Redzone game final corroborates MaxPreps 57-21' },
      { date: 'October 16, 2026', title: 'Shallowater wins the district matchup 49-28', body: 'The loss moved Bushland to 5-3 overall and 1-1 in district entering its open week.', sourceUrl: 'https://www.maxpreps.com/tx/football/game/bushland-vs-shallowater/10-16-2026/?c=8def681a-1672-4b75-b258-405e42567e7a', sourceLabel: 'MaxPreps final game page' }
    ],
    overview: [
      'Bushland High School is in the Amarillo area and uses the Falcons identity on its official campus site. The official campus address is 18701 Jim Line Rd.',
      'Bushland ISD identifies Josh Reynolds as Athletic Director. MaxPreps history identifies William Rabson as 2026 head coach, but its staff page simultaneously labels multiple people head coach; the page therefore qualifies the football-title source rather than pretending the data is cleaner than it is.',
      'UIL places Bushland in Class 3A Division I District 1 for 2026-28.',
      "Dave Campbell's lists 17 playoff appearances, one state-final appearance and zero state titles.",
      'Bushland is 5-3 through October 16 and had no October 23 game. Brownfield and Dalhart remain.'
    ],
    faq: [
      { question: 'What is Bushland football record through October 23, 2026?', answer: 'Bushland is 5-3 overall and 1-1 in district through its October 16 loss at Shallowater; the Falcons had an open date October 23.' },
      { question: 'Who is listed as Bushland football head coach?', answer: 'MaxPreps 2026 history identifies William Rabson. Its separate staff page labels multiple people head coach, while Bushland ISD identifies Josh Reynolds as athletic director, so TexasDefined keeps the football-coach attribution qualified.' },
      { question: 'What was the Bushland-Hereford score?', answer: 'Game-specific MaxPreps and Prep Redzone records agree on Bushland 57, Hereford 21. Other aggregate feeds carry conflicting scores, which TexasDefined does not use.' },
      { question: 'Has Bushland won a state football title?', answer: "Dave Campbell's lists one state-final appearance and zero state titles." }
    ]
  },
  bynum: {
    slug: 'bynum',
    intro: "Bynum ISD's Bulldogs are a Hill County six-man program in UIL 1A Division II District 14. The 2026 Bulldogs are 1-7 and 0-2 in district through the October 16 Fannindel loss, with no October 23 game. Current roster data lists C. Morgan as head coach, but no first-party Bynum ISD page naming the football coach was found at this checkpoint, so the attribution remains qualified.",
    theme: { accentHex: '#7B1E3A', label: 'Original TexasDefined Bulldog editorial treatment; no Bynum ISD logo or school-owned imagery reproduced.' },
    seo: {
      title: 'Bynum Bulldogs Football | 2026 Six-Man Scores & District 14 Guide',
      description: 'Bynum Bulldogs six-man football: 2026 District 14 results, Bulldog Field, Hill County campus, current coach-source caveat and program history.'
    },
    coach: {
      name: 'C. Morgan',
      title: 'Current roster-listed head coach; first-party name/title confirmation still needed',
      sourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/',
      sourceLabel: 'Current MaxPreps team feed lists C. Morgan as Head Coach; Bynum ISD first-party coach page was not located',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '704 Toliver Ave., Bynum, TX 76631',
      phone: '254-531-2341',
      sourceUrl: 'https://www.bynumisd.net/contact-us',
      sourceLabel: 'Bynum ISD official contact page; explicitly identifies Hill County location',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Bynum 2026 six-man schedule and current results',
      sourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/schedule/',
      sourceLabel: 'UIL-partner current schedule; Bynum ISD official site supplies school identity and field/community context',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.bynumisd.net/'
    },
    season: {
      record: '1-7 overall, 0-2 district through October 16, 2026; open October 23',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/',
      sourceLabel: 'Current MaxPreps Bynum results',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/',
      games: [
        { date: '2026-08-28', opponent: 'Kopperl', site: 'Away', result: 'L 0-46' },
        { date: '2026-09-04', opponent: 'Morgan', site: 'Home', result: 'L 0-45' },
        { date: '2026-09-11', opponent: 'CenTex HomeSchool', site: 'Home', result: 'L 0-30' },
        { date: '2026-09-18', opponent: 'Waco Christian', site: 'Away', result: 'L 54-71' },
        { date: '2026-09-25', opponent: 'Blum', site: 'Home', result: 'L 43-58' },
        { date: '2026-10-02', opponent: 'Walnut Springs', site: 'Home', result: 'W 45-0' },
        { date: '2026-10-09', opponent: 'Oakwood', site: 'Home', district: true, result: 'L 0-45' },
        { date: '2026-10-16', opponent: 'Fannindel', site: 'Away', district: true, result: 'L 0-50' },
        { date: '2026-10-30', opponent: 'Mount Calm', site: 'Home', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Trinidad', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Bulldog Field',
      address: '704 Toliver Ave., Bynum, TX 76631 area',
      sourceUrl: 'https://www.texasfootball.com/team/bynum-bulldogs',
      sourceLabel: "Dave Campbell's identifies Bulldog Field and 250 capacity; Bynum ISD confirms its campus/football field at the Toliver location",
      verifiedAt: '2026-10-25',
      note: 'Bynum ISD held its October 22 fall festival on the football field. Exact game-night entrance and accessibility routing remain event-specific.'
    },
    development: {
      title: 'A small six-man program rebuilding after a winless 2025',
      body: "Dave Campbell's lists Bynum at 0-5 in 2025, 2-6 in 2024 and 5-2 in 2023, with three playoff appearances and no state final or title. The 2026 Bulldogs opened 0-5 before shutting out Walnut Springs 45-0, then dropped their first two district games to Oakwood and Fannindel.",
      sourceUrl: 'https://www.texasfootball.com/team/bynum-bulldogs',
      sourceLabel: "Dave Campbell's Bynum program history and current results",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2019', title: 'Bynum reaches seven wins', body: "Dave Campbell's lists the 2019 Bulldogs at 7-4, the strongest visible recent season in its archive.", sourceUrl: 'https://www.texasfootball.com/team/bynum-bulldogs', sourceLabel: "Dave Campbell's Bynum history" },
      { date: 'October 2, 2026', title: 'Bulldogs shut out Walnut Springs 45-0', body: 'The win ended Bynum’s 0-5 start and remains its verified victory through October 25.', sourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/', sourceLabel: 'MaxPreps current team feed' },
      { date: 'October 16, 2026', title: 'Fannindel beats Bynum 50-0', body: 'The district loss moved Bynum to 1-7 overall and 0-2 in district.', sourceUrl: 'https://www.maxpreps.com/tx/bynum/bynum-bulldogs/football/', sourceLabel: 'MaxPreps final result' }
    ],
    overview: [
      'Bynum ISD officially identifies itself as Home of the Bulldogs and gives 704 Toliver Ave. as its physical address in Hill County.',
      'Bynum plays UIL 1A Division II six-man football in District 14.',
      'Current roster data lists C. Morgan as head coach, but TexasDefined has not found a first-party Bynum ISD page certifying that football title.',
      "Dave Campbell's lists three playoff appearances, no state title and no title-game appearance, with Bulldog Field as the venue.",
      'Bynum is 1-7 through October 16, had no October 23 game, and closes with Mount Calm and Trinidad.'
    ],
    faq: [
      { question: 'Does Bynum play six-man football?', answer: 'Yes. UIL places Bynum in 1A Division II District 14 for the 2026-28 six-man cycle.' },
      { question: 'What is Bynum football record through October 23, 2026?', answer: 'Bynum is 1-7 overall and 0-2 in district through October 16 and did not play October 23.' },
      { question: 'Who coaches Bynum football?', answer: 'The current MaxPreps team feed lists C. Morgan as head coach. A first-party Bynum ISD football-coach page was not located, so TexasDefined keeps the attribution qualified.' },
      { question: 'Where is Bynum ISD?', answer: 'Bynum ISD says its physical address is 704 Toliver Ave. in Bynum, Hill County.' }
    ]
  },
  'caddo-mills': {
    slug: 'caddo-mills',
    intro: "Caddo Mills' Foxes are 7-1 overall and 4-0 in District 7-4A Division I after a 53-35 October 23 win over Ferris. Kodi Crane is the current boys athletic director on the official high-school staff and is identified as the football head coach by current roster data and Dave Campbell's historical coverage. The district is also in the middle of a stadium transition, making current event sources more useful than an old static venue address.",
    theme: { accentHex: '#188447', label: 'Original TexasDefined green editorial accent based on Caddo Mills High’s current Foxes green/black spirit presentation; no official logo reproduced.' },
    seo: {
      title: 'Caddo Mills Foxes Football | 2026 Scores, Kodi Crane & District 7',
      description: 'Caddo Mills Foxes football: Kodi Crane, 7-1 start, 53-35 Ferris win, District 7-4A Division I race, Hunt County campus and stadium-transition context.'
    },
    coach: {
      name: 'Kodi Crane',
      title: 'Boys Athletic Director / current football head coach',
      sourceUrl: 'https://www.caddomillsisd.org/o/cmhs/staff/',
      sourceLabel: 'Caddo Mills High official staff lists Kodi Crane as Boys Athletic Director; current MaxPreps roster and Dave Campbell’s historical coverage identify him as football head coach',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '3049 S. FM 36, Caddo Mills, TX 75135',
      phone: '903-527-3164',
      sourceUrl: 'https://www.caddomillsisd.org/o/cmhs/',
      sourceLabel: 'Caddo Mills High official current site; controls over stale third-party Gilmer Street addresses',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Official Caddo Mills 2026 varsity football schedule',
      sourceUrl: 'https://www.cmfoxathletics.com/sport/football/boys/?tab=schedule',
      sourceLabel: 'Official Caddo Mills High Athletics schedule, cross-checked with current result sources',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.cmfoxathletics.com/sport/football/boys/?tab=schedule'
    },
    season: {
      record: '7-1 overall, 4-0 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/caddo-mills/caddo-mills-foxes/football/schedule/',
      sourceLabel: 'Current game ledger through Kaufman plus Associated Press and Herald-Banner Ferris final',
      latestResultSourceUrl: 'https://sports.yahoo.com/articles/friday-night-roundup-035900330.html',
      games: [
        { date: '2026-08-28', opponent: 'Wills Point', site: 'Away', result: 'W 61-14' },
        { date: '2026-09-04', opponent: 'Bullard', site: 'Home', result: 'W 36-21' },
        { date: '2026-09-11', opponent: 'Canton', site: 'Home', result: 'L 40-48' },
        { date: '2026-09-17', opponent: 'Ford', site: 'Away', result: 'W 28-21' },
        { date: '2026-09-25', opponent: 'Life Waxahachie', site: 'Away', district: true, result: 'W 44-13' },
        { date: '2026-10-09', opponent: 'Mabank', site: 'Home', district: true, result: 'W 54-20' },
        { date: '2026-10-16', opponent: 'Kaufman', site: 'Away', district: true, result: 'W 38-35 (OT)' },
        { date: '2026-10-23', opponent: 'Ferris', site: 'Home', district: true, result: 'W 53-35' },
        { date: '2026-10-30', opponent: 'Sulphur Springs', site: 'Away', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Paris', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Ed Locker Stadium / current Caddo Mills home-football site',
      address: 'Caddo Mills, TX — use current CMISD event/ticket directions',
      sourceUrl: 'https://www.caddomillsisd.org/',
      sourceLabel: 'Caddo Mills ISD current live feed identifies the Oct. 23 Legendary Fox ceremony at Ed Locker Stadium and separately documents new-stadium construction at the high-school track/field area',
      verifiedAt: '2026-10-25',
      note: 'CMISD announced closure of the high-school track and field beginning March 11, 2026 for construction of a new stadium. Current game-day district information should control over old venue addresses.'
    },
    development: {
      title: 'A 7-1 start during a stadium-transition year',
      body: 'Caddo Mills improved to 7-1 and 4-0 in district by beating Ferris 53-35. The Herald-Banner reported Colton Ponton threw for 318 yards and five touchdowns while Steven Stiggers Jr. had 190 receiving yards and four scores. Off the field, CMISD has been building a new stadium at the high-school track/field site, so the page prioritizes current district event notices over stale venue listings.',
      sourceUrl: 'https://sports.yahoo.com/articles/friday-night-roundup-035900330.html',
      sourceLabel: 'Herald-Banner Friday Night Roundup via Yahoo Sports plus CMISD current construction/event notices',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2022', title: 'Kodi Crane documented as Caddo Mills head coach', body: "Dave Campbell's interviewed Kodi Crane as Caddo Mills head coach before the 2022 season; the current district staff still lists Crane as Boys Athletic Director.", sourceUrl: 'https://www.texasfootball.com/article/2022/03/06/texasfootballcom-interview-caddo-mills-head-coach-kodi-crane', sourceLabel: "Dave Campbell's Texas Football interview" },
      { date: 'October 16, 2026', title: 'Foxes edge Kaufman 38-35 in overtime', body: 'Caddo Mills won on the road in overtime to move to 6-1 and 3-0 in district.', sourceUrl: 'https://www.maxpreps.com/tx/football/game/caddo-mills-vs-kaufman/10-16-2026/?c=16da4f54-1ea5-4a16-809c-8be2690a7586', sourceLabel: 'MaxPreps final game page' },
      { date: 'October 23, 2026', title: 'Caddo Mills beats Ferris 53-35', body: 'The Foxes improved to 7-1 and 4-0 in district; local coverage highlighted five touchdown passes from Colton Ponton.', sourceUrl: 'https://sports.yahoo.com/articles/friday-night-roundup-035900330.html', sourceLabel: 'Herald-Banner Friday Night Roundup via Yahoo Sports' }
    ],
    overview: [
      'Caddo Mills High School’s current official site identifies the campus as Home of the Foxes at 3049 S. FM 36. Older football directories still show Gilmer Street addresses.',
      'The school’s current live feed repeatedly uses green and black Fox spirit presentation; TexasDefined uses green as an editorial accent without copying a logo.',
      'Kodi Crane is the official Boys Athletic Director and is identified as the football head coach by current roster/history sources.',
      'UIL places Caddo Mills in Class 4A Division I District 7. The Foxes are 7-1 and 4-0 in district after the Ferris win.',
      'CMISD is in a stadium-construction transition. Current district events identify Ed Locker Stadium for October 23 while the high-school track/field site is closed for new-stadium construction.'
    ],
    faq: [
      { question: 'Who coaches Caddo Mills football?', answer: 'Kodi Crane. Caddo Mills High officially lists him as Boys Athletic Director, while current football sources identify him as head coach.' },
      { question: 'What is Caddo Mills football record after October 23, 2026?', answer: 'The Foxes are 7-1 overall and 4-0 in district after beating Ferris 53-35.' },
      { question: 'Where is Caddo Mills High School now?', answer: 'The current official campus site lists 3049 S. FM 36, Caddo Mills, TX 75135. Older third-party football directories can still show prior Gilmer Street addresses.' },
      { question: 'Why does the venue section discuss construction?', answer: 'CMISD announced the high-school track and field would close beginning March 11, 2026 for new-stadium construction, while current district event posts still identify Ed Locker Stadium for home-football activities.' }
    ]
  },
  caldwell: {
    slug: 'caldwell',
    intro: "Caldwell's Hornets dropped from 4A Division II into UIL 3A Division I District 12 for 2026. Sean Witherwax is the current head coach in both current roster history and local 2026 preseason reporting. The Hornets are 2-6 after Franklin's 77-3 win on October 23, with Cameron Yoe and Rockdale remaining.",
    theme: { accentHex: '#F47C20', label: 'Original TexasDefined orange editorial treatment based on Caldwell ISD official Hornet orange/black spirit presentation; no district logo reproduced.' },
    seo: {
      title: 'Caldwell Hornets Football | 2026 Scores, Sean Witherwax & Hornet Stadium',
      description: 'Caldwell Hornets football: Sean Witherwax, 2026 District 12-3A Division I scores, Franklin result, Hornet Stadium game-night guidance and Burleson County context.'
    },
    coach: {
      name: 'Sean Witherwax',
      title: 'Head football coach',
      sourceUrl: 'https://www.kbtx.com/2026/08/19/hometown-heroes-caldwell-hornets/?outputType=amp',
      sourceLabel: 'KBTX August 2026 preseason profile identifies Sean Witherwax as Caldwell head coach; current MaxPreps staff/history agrees',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '550 County Rd. 307, Caldwell, TX 77836',
      sourceUrl: 'https://www.caldwellisd.net/o/chs',
      sourceLabel: 'Caldwell High School official campus site; current roster source uses the same campus address',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Caldwell 2026 football schedule and official Hornet event updates',
      sourceUrl: 'https://www.caldwellisd.net/o/chs/live-feed',
      sourceLabel: 'Caldwell ISD first-party live feed for Hornet game-night updates, cross-checked with current result feeds',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.caldwellisd.net/o/chs/live-feed'
    },
    season: {
      record: '2-6 overall, 1-4 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/caldwell/caldwell-hornets/football/schedule/',
      sourceLabel: 'Current MaxPreps schedule updated Oct. 24',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/caldwell/caldwell-hornets/football/schedule/',
      games: [
        { date: '2026-08-28', opponent: 'Brazos', site: 'Away', result: 'L 0-40' },
        { date: '2026-09-04', opponent: 'Somerville', site: 'Home', result: 'W 55-14' },
        { date: '2026-09-11', opponent: 'Lexington', site: 'Home', result: 'L 25-53' },
        { date: '2026-09-25', opponent: 'Lorena', site: 'Home', district: true, result: 'L 7-55' },
        { date: '2026-10-02', opponent: 'Troy', site: 'Away', district: true, result: 'L 28-54' },
        { date: '2026-10-09', opponent: 'McGregor', site: 'Away', district: true, result: 'W 42-40 (2OT)' },
        { date: '2026-10-16', opponent: 'Little River Academy', site: 'Home', district: true, result: 'L 28-46' },
        { date: '2026-10-23', opponent: 'Franklin', site: 'Away', district: true, result: 'L 3-77' },
        { date: '2026-10-30', opponent: 'Cameron Yoe', site: 'Home', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-06', opponent: 'Rockdale', site: 'Away', district: true, kickoff: '7:30 PM' }
      ]
    },
    venue: {
      name: 'Hornet Stadium',
      address: 'Caldwell High School area, Caldwell, TX',
      sourceUrl: 'https://www.caldwellisd.net/o/chs/live-feed',
      sourceLabel: 'Caldwell ISD first-party live feed names Hornet Stadium and publishes game-night entry rules',
      verifiedAt: '2026-10-25',
      note: 'Caldwell ISD says spectators should use the main parking lot and front gate for home football; back gates are reserved for band/coaches during designated entry times.'
    },
    development: {
      title: 'A 2026 classification drop and a continuing playoff rebuild',
      body: 'Caldwell moved from 4A Division II to 3A Division I in the 2026 realignment. KWHI’s preseason report said the Hornets entered the year after doubling their win total in 2025 and earning their first district win in five years, while KBTX described Witherwax as building toward the program’s first playoff berth since 2017. The 2026 team is 2-6 after Franklin, so the page keeps the rebuild grounded in current results.',
      sourceUrl: 'https://kwhi.com/2026/08/17/caldwell-football-preview/',
      sourceLabel: 'KWHI 2026 preseason realignment/history context and KBTX current coaching profile',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2017', title: 'Most recent playoff appearance before the current rebuild', body: 'KBTX and KWHI both identify 2017 as Caldwell’s most recent playoff season entering 2026.', sourceUrl: 'https://www.kbtx.com/2026/08/19/hometown-heroes-caldwell-hornets/?outputType=amp', sourceLabel: 'KBTX Hometown Heroes 2026 preview' },
      { date: 'October 9, 2026', title: 'Hornets win a 42-40 double-overtime game at McGregor', body: 'The district victory is Caldwell’s current 2026 conference win.', sourceUrl: 'https://www.maxpreps.com/tx/caldwell/caldwell-hornets/football/schedule/', sourceLabel: 'MaxPreps current schedule' },
      { date: 'October 23, 2026', title: 'Franklin beats Caldwell 77-3', body: 'The final moved Caldwell to 2-6 overall and 1-4 in district.', sourceUrl: 'https://www.maxpreps.com/tx/caldwell/caldwell-hornets/football/schedule/', sourceLabel: 'MaxPreps current schedule updated Oct. 24' }
    ],
    overview: [
      'Caldwell ISD’s first-party live feed uses Hornets identity and orange/black spirit presentation, including current football event instructions.',
      'Sean Witherwax is the current head coach in 2026 local reporting and current roster history.',
      'UIL places Caldwell in Class 3A Division I District 12 for 2026-28 after the program dropped from 4A Division II.',
      'The Hornets are 2-6 through October 23. Cameron Yoe and Rockdale remain.',
      'Hornet Stadium game-night guidance is unusually specific: Caldwell ISD says fans should use the main parking lot and front gate.'
    ],
    faq: [
      { question: 'Who coaches Caldwell football in 2026?', answer: 'Sean Witherwax. KBTX’s August 2026 Caldwell preview identifies him as head coach, and the current roster staff agrees.' },
      { question: 'What is Caldwell football record after October 23, 2026?', answer: 'Caldwell is 2-6 overall and 1-4 in district after a 77-3 loss at Franklin.' },
      { question: 'What classification is Caldwell in now?', answer: 'UIL places Caldwell in Class 3A Division I District 12 for the 2026-28 cycle; the program moved down from 4A Division II.' },
      { question: 'How should fans enter Hornet Stadium?', answer: 'Caldwell ISD says spectators should park in the main parking lot and use the front gate; back gates are reserved for band and coaches during designated entry times.' }
    ]
  },
  callisburg: {
    slug: 'callisburg',
    intro: "Callisburg's Wildcats are a Cooke County Class 3A Division II District 7 program. Current history identifies Eddie Gill as the 2026 head coach, but the current staff page also labels Corey Roberson head coach, so the role is not treated as perfectly clean. The Wildcats are 1-6 through the October 16 win over S&S Consolidated; the October 23 Blue Ridge matchup is verified, but a trustworthy final was not available in the sources reviewed October 25.",
    theme: { accentHex: '#2B5D9B', label: 'Original TexasDefined blue Wildcat editorial treatment; no Callisburg ISD logo or school-owned photo reproduced.' },
    seo: {
      title: 'Callisburg Wildcats Football | 2026 Scores, District 7 & Source Guide',
      description: 'Callisburg Wildcats football: 2026 District 7-3A Division II results, Eddie Gill coach-source note, S&S win, unresolved Blue Ridge final and Cooke County context.'
    },
    coach: {
      name: 'Eddie Gill',
      title: '2026 history-listed head coach; current staff page contains a conflicting second head-coach label',
      sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/history/',
      sourceLabel: 'MaxPreps 2026 history identifies Eddie Gill as head coach; current staff page also labels Corey Roberson head coach, so TexasDefined preserves the conflict',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '148 Dozier St., Gainesville, TX 76240',
      sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/',
      sourceLabel: 'Current UIL-partner Callisburg page; first-party campus source not located in this checkpoint',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Callisburg 2026 football schedule and current results',
      sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/schedule/',
      sourceLabel: 'Current UIL-partner schedule; Blue Ridge result intentionally left unresolved pending reliable final evidence',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/schedule/'
    },
    season: {
      record: '1-6 overall, 1-2 district through October 16, 2026; October 23 Blue Ridge final unresolved',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/schedule/',
      sourceLabel: 'Current Callisburg schedule through S&S Consolidated; Blue Ridge matchup pages still lack a final',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/',
      games: [
        { date: '2026-08-28', opponent: 'Bowie', site: 'Away', result: 'L 0-40' },
        { date: '2026-09-04', opponent: 'Millsap', site: 'Home', result: 'L 13-29' },
        { date: '2026-09-11', opponent: 'Tioga', site: 'Away', result: 'L 6-26' },
        { date: '2026-09-18', opponent: 'Pottsboro', site: 'Home', result: 'L 12-33' },
        { date: '2026-09-25', opponent: 'Howe', site: 'Home', district: true, result: 'L 0-39' },
        { date: '2026-10-02', opponent: 'Leonard', site: 'Away', district: true, result: 'L 8-14' },
        { date: '2026-10-16', opponent: 'S & S Consolidated', site: 'Home', district: true, result: 'W 53-7' },
        { date: '2026-10-23', opponent: 'Blue Ridge', site: 'Away', district: true },
        { date: '2026-10-30', opponent: 'Valley View', site: 'Home', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Bells', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    development: {
      title: 'First district win, with the Blue Ridge result still unresolved',
      body: 'Callisburg opened 0-6 before beating S&S Consolidated 53-7 on October 16. The October 23 Blue Ridge matchup is present in MaxPreps and High School On SI, but both sources still lack a final in the evidence reviewed October 25. TexasDefined therefore keeps Callisburg at 1-6 through the last verified game instead of guessing a new record.',
      sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/',
      sourceLabel: 'Current team page through S&S win; Blue Ridge final absent in available matchup pages',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: 'October 16, 2026', title: 'Wildcats break through with a 53-7 district win', body: 'Callisburg beat S&S Consolidated for its first win of the season and first district win.', sourceUrl: 'https://www.maxpreps.com/tx/gainesville/callisburg-wildcats/football/', sourceLabel: 'MaxPreps current Callisburg page' },
      { date: 'October 23, 2026', title: 'Blue Ridge matchup remains score-unresolved', body: 'The game is documented as scheduled, but the current matchup pages reviewed October 25 do not provide a reliable final. No score is inferred.', sourceUrl: 'https://www.si.com/high-school/stats/texas/football/games/6897370-callisburg-vs-blue-ridge', sourceLabel: 'High School On SI matchup page without final score' }
    ],
    overview: [
      'Callisburg plays UIL Class 3A Division II football in District 7 for 2026-28.',
      'Current history lists Eddie Gill as head coach. The separate current staff page also labels Corey Roberson head coach, so TexasDefined does not hide that source conflict.',
      'The Wildcats are 1-6 through the verified October 16 S&S Consolidated win.',
      'The October 23 Blue Ridge game is left without a result because current evidence proves the matchup but not a trustworthy final.',
      'Callisburg’s campus is in Cooke County; exact game-night venue and access details remain to be first-party verified.'
    ],
    faq: [
      { question: 'Who coaches Callisburg football in 2026?', answer: 'MaxPreps 2026 history identifies Eddie Gill, but the current staff page also labels Corey Roberson head coach. TexasDefined preserves that conflict rather than pretending the source data is unanimous.' },
      { question: 'What is Callisburg football record through October 25, 2026?', answer: 'The last verified record is 1-6 overall and 1-2 in district through the October 16 win over S&S Consolidated.' },
      { question: 'What happened in the Callisburg-Blue Ridge game?', answer: 'The October 23 matchup is verified, but the current matchup pages reviewed October 25 still do not supply a trustworthy final score.' },
      { question: 'What classification is Callisburg in?', answer: 'UIL places Callisburg in Class 3A Division II District 7 for the 2026-28 cycle.' }
    ]
  },
  calvert: {
    slug: 'calvert',
    intro: "Calvert's Trojans are a Robertson County UIL 1A Division II six-man program. Calvert ISD officially identifies Marcus Wortham as Athletic Director and Head Football Coach. The Trojans are 0-8 after a 46-45 October 23 loss to Brazos Valley, their closest result of the season, with district games at Apple Springs and Buckholts remaining.",
    theme: { accentHex: '#6A3D9A', label: 'Original TexasDefined purple editorial treatment based on Calvert ISD’s current purple/white Trojan spirit presentation; no district logo reproduced.' },
    seo: {
      title: 'Calvert Trojans Football | 2026 Six-Man Scores & Marcus Wortham',
      description: 'Calvert Trojans six-man football: Marcus Wortham, 2026 District 15 results, 46-45 Brazos Valley game, Robertson County campus and official Calvert ISD sources.'
    },
    coach: {
      name: 'Marcus Wortham',
      title: 'Athletic Director / Head Football Coach',
      sourceUrl: 'https://www.calvertisd.com/apps/pages/index.jsp?pREC_ID=2087222&type=d&uREC_ID=1985074',
      sourceLabel: 'Calvert ISD official Athletic Department page explicitly identifies Marcus Wortham as Athletic Director and Head Football Coach',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '310 Hickory St., Calvert, TX 77837',
      phone: '979-364-2824',
      sourceUrl: 'https://www.calvertisd.com/apps/pages/index.jsp?pREC_ID=2087222&type=d&uREC_ID=1985074',
      sourceLabel: 'Calvert ISD official athletics page lists the high-school athletics address',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Calvert ISD 2026-27 Trojan football schedule and current results',
      sourceUrl: 'https://www.calvertisd.com/apps/news/',
      sourceLabel: 'Calvert ISD official news publishes the 2026-27 Trojan football schedule; results cross-checked with current MaxPreps feed',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.calvertisd.com/apps/news/'
    },
    season: {
      record: '0-8 overall, 0-0 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/calvert/calvert-trojans/football/schedule/',
      sourceLabel: 'Current Calvert game ledger plus Oct. 24 Brazos Valley recap',
      latestResultSourceUrl: 'https://www.maxpreps.com/news/A__ApTJWA0OXOmeZ2V6W0A/football-recap-calvert-keeps-it-close-against-brazos-valley--how-to-watch.htm',
      games: [
        { date: '2026-08-28', opponent: 'BVCHEA HomeSchool', site: 'Away', result: 'L 13-54' },
        { date: '2026-09-04', opponent: 'Aquilla', site: 'Away', result: 'L 7-54' },
        { date: '2026-09-11', opponent: 'First Baptist Christian', site: 'Away', result: 'L 0-1 (forfeit)' },
        { date: '2026-09-18', opponent: 'Jonesboro', site: 'Home', result: 'L 7-52' },
        { date: '2026-09-24', opponent: 'Abbott', site: 'Home', result: 'L 8-72' },
        { date: '2026-10-03', opponent: 'Burkeville', site: 'Away', result: 'L 37-59' },
        { date: '2026-10-09', opponent: "Methodist Children's Home", site: 'Away', result: 'L 6-51' },
        { date: '2026-10-23', opponent: 'Brazos Valley', site: 'Home', result: 'L 45-46' },
        { date: '2026-10-30', opponent: 'Apple Springs', site: 'Away', district: true, kickoff: '7:00 PM' },
        { date: '2026-11-06', opponent: 'Buckholts', site: 'Away', district: true, kickoff: '7:00 PM' }
      ]
    },
    development: {
      title: 'A winless start with a one-point near-breakthrough',
      body: 'Calvert entered October 23 on a long losing streak and then produced its highest-scoring game of 2026, falling 46-45 to Brazos Valley. The game moved the Trojans to 0-8 but showed a very different offensive result from the earlier schedule. District play begins at Apple Springs on October 30, so the page does not pre-label the current district record beyond 0-0.',
      sourceUrl: 'https://www.maxpreps.com/news/A__ApTJWA0OXOmeZ2V6W0A/football-recap-calvert-keeps-it-close-against-brazos-valley--how-to-watch.htm',
      sourceLabel: 'MaxPreps Oct. 24 recap based on the recorded 46-45 final',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2025', title: 'Calvert finishes 4-6 before the current alignment', body: 'MaxPreps history lists the 2025 Trojans at 4-6 overall and 2-1 in district under Marcus Wortham.', sourceUrl: 'https://www.maxpreps.com/tx/calvert/calvert-trojans/football/history/', sourceLabel: 'MaxPreps Calvert history' },
      { date: '2026', title: 'Marcus Wortham remains first-party head football coach', body: 'Calvert ISD’s athletics page explicitly lists Wortham as both Athletic Director and Head Football Coach.', sourceUrl: 'https://www.calvertisd.com/apps/pages/index.jsp?pREC_ID=2087222&type=d&uREC_ID=1985074', sourceLabel: 'Calvert ISD Athletic Department' },
      { date: 'October 23, 2026', title: 'Brazos Valley edges Calvert 46-45', body: 'The one-point loss is Calvert’s closest 2026 result and its highest-scoring game through October 25.', sourceUrl: 'https://www.maxpreps.com/news/A__ApTJWA0OXOmeZ2V6W0A/football-recap-calvert-keeps-it-close-against-brazos-valley--how-to-watch.htm', sourceLabel: 'MaxPreps Oct. 24 recap' }
    ],
    overview: [
      'Calvert ISD uses Trojans identity and current purple/white school-spirit presentation on its official site.',
      'Marcus Wortham is a first-party verified Athletic Director and Head Football Coach.',
      'UIL places Calvert in 1A Division II District 15 six-man football for 2026-28.',
      'Calvert is 0-8 through the October 23 one-point loss to Brazos Valley. Apple Springs and Buckholts are its remaining listed district games.',
      'The September 11 First Baptist Christian entry is a 1-0 administrative forfeit result, not an on-field one-point game.'
    ],
    faq: [
      { question: 'Who coaches Calvert football?', answer: 'Marcus Wortham. Calvert ISD officially lists him as Athletic Director and Head Football Coach.' },
      { question: 'What is Calvert football record after October 23, 2026?', answer: 'Calvert is 0-8 after a 46-45 loss to Brazos Valley.' },
      { question: 'Does Calvert play six-man football?', answer: 'Yes. UIL places Calvert in 1A Division II District 15 for the 2026-28 six-man cycle.' },
      { question: 'Was the First Baptist Christian result a normal 1-0 football game?', answer: 'No. The September 11 schedule marks it as a 1-0 forfeit, an administrative result rather than an on-field score.' }
    ]
  },
  'cameron-yoe': {
    slug: 'cameron-yoe',
    intro: "Cameron Yoe is one of the deepest-history programs in this batch: four state championships, six title-game appearances and 49 playoff trips. The current 2026 team is unbeaten in the available game ledger, but the October 23 Little River Academy result is internally inconsistent across sources — KBTX reports a played 31-13 Cameron win, while MaxPreps currently shows a 13-10 forfeit entry. TexasDefined preserves that discrepancy instead of inventing a single uncontested official score.",
    theme: { accentHex: '#7A263A', label: 'Original TexasDefined maroon editorial treatment; no Cameron ISD logo or school-owned photography reproduced.' },
    seo: {
      title: 'Cameron Yoe Football | 2026 Scores, Aaron Babino & 4 State Titles',
      description: 'Cameron Yoe Yoemen football: Aaron Babino, four state titles, 2026 District 12-3A Division I run, Yoe Field and the disputed Little River Academy result.'
    },
    coach: {
      name: 'Aaron Babino',
      title: 'Athletic Director / Head Football Coach',
      sourceUrl: 'https://www.cameronisd.net/page/ath.Meet%20the%20Coaches',
      sourceLabel: 'Cameron ISD official Meet the Coaches page',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '303 E. 12th Street, Cameron, TX 76520',
      phone: '254-697-3902',
      sourceUrl: 'https://www.cameronisd.net/page/yhs.Home',
      sourceLabel: 'C.H. Yoe High School official campus page',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Cameron Yoe 2026 schedule and current result sources',
      sourceUrl: 'https://www.maxpreps.com/tx/cameron/ch-yoe-yoemen/football/schedule/',
      sourceLabel: 'Current UIL-partner schedule, cross-checked against KBTX local game reporting',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.cameronisd.net/page/yhs.Home'
    },
    season: {
      record: '8 wins in the current game ledger through October 23; Little River Academy final carries a source conflict',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/cameron/ch-yoe-yoemen/football/schedule/',
      sourceLabel: 'MaxPreps current ledger plus KBTX Oct. 24 played-game report',
      latestResultSourceUrl: 'https://www.kbtx.com/2026/10/24/cameron-yoe-stays-perfect-tops-academy-31-13/',
      games: [
        { date: '2026-08-28', opponent: 'Teague', site: 'Home', result: 'W 21-14' },
        { date: '2026-09-03', opponent: 'Whitney', site: 'Home', result: 'W 62-61' },
        { date: '2026-09-11', opponent: 'Salado', site: 'Home', result: 'W 38-23' },
        { date: '2026-09-25', opponent: 'McGregor', site: 'Away', district: true, result: 'W 46-9' },
        { date: '2026-10-02', opponent: 'Franklin', site: 'Home', district: true, result: 'W 43-42' },
        { date: '2026-10-09', opponent: 'Rockdale', site: 'Away', district: true, result: 'W 65-28' },
        { date: '2026-10-16', opponent: 'Troy', site: 'Home', district: true, result: 'W 40-26' },
        { date: '2026-10-23', opponent: 'Little River Academy', site: 'Away', district: true, result: 'W — KBTX 31-13 played final; MaxPreps shows 13-10 FF' },
        { date: '2026-10-30', opponent: 'Caldwell', site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-06', opponent: 'Lorena', site: 'Home', district: true, kickoff: '7:30 PM' }
      ]
    },
    venue: {
      name: 'Yoe Field',
      address: 'Cameron, TX',
      sourceUrl: 'https://www.texasfootball.com/team/cameron-yoe-yoemen',
      sourceLabel: "Dave Campbell's identifies Yoe Field and 3,640 capacity",
      verifiedAt: '2026-10-25',
      note: 'Cameron ISD ticket/event rules control game-night access; the school page notes pay-to-re-enter and no-smoking policies.'
    },
    development: {
      title: 'Four-title history, with a current result dispute handled transparently',
      body: "Dave Campbell's credits Cameron Yoe with four state championships — 1981, 2012, 2013 and 2014 — six title-game appearances and 49 playoff trips. The 2026 Yoemen have won every game in the current ledger, but the October 23 Academy result is not source-clean: KBTX reports a played 31-13 Cameron victory at John Glover Stadium, while MaxPreps shows 13-10 marked as a forfeit. TexasDefined reports the win and the disagreement rather than silently choosing one score.",
      sourceUrl: 'https://www.texasfootball.com/article/2026/05/14/cameron-yoe-yoemen-when-small-towns-produce-big-time-results',
      sourceLabel: "Dave Campbell's May 2026 Cameron Yoe history plus KBTX Oct. 24 game report",
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '1981, 2012-2014', title: 'Four state championships', body: 'Cameron Yoe owns four state titles, including three straight from 2012 through 2014.', sourceUrl: 'https://www.texasfootball.com/article/2026/05/14/cameron-yoe-yoemen-when-small-towns-produce-big-time-results', sourceLabel: "Dave Campbell's Cameron Yoe history" },
      { date: 'October 2, 2026', title: 'Yoemen edge Franklin 43-42', body: 'The one-point district win is part of Cameron’s unbeaten 2026 start.', sourceUrl: 'https://www.maxpreps.com/tx/cameron/ch-yoe-yoemen/football/schedule/', sourceLabel: 'MaxPreps current schedule' },
      { date: 'October 23, 2026', title: 'Academy win carries conflicting score treatment', body: 'KBTX reports Cameron 31-13 in a played game; MaxPreps currently shows Cameron 13-10 with an FF label. The disagreement remains visible.', sourceUrl: 'https://www.kbtx.com/2026/10/24/cameron-yoe-stays-perfect-tops-academy-31-13/', sourceLabel: 'KBTX local postgame report' }
    ],
    overview: [
      'C.H. Yoe High School is in Cameron, Milam County, at 303 E. 12th Street.',
      'Cameron ISD officially lists Aaron Babino as Athletic Director / Head Football Coach.',
      'UIL places Cameron Yoe in Class 3A Division I District 12 for 2026-28.',
      "The program owns four state titles, six title-game appearances and 49 playoff appearances according to Dave Campbell's.",
      'The October 23 Little River Academy win remains score-disputed between current sources and is not flattened into a false consensus.'
    ],
    faq: [
      { question: 'Who coaches Cameron Yoe football in 2026?', answer: 'Aaron Babino. Cameron ISD officially lists him as Athletic Director / Head Football Coach.' },
      { question: 'How many state football titles has Cameron Yoe won?', answer: 'Four: 1981, 2012, 2013 and 2014.' },
      { question: 'What happened in the Cameron Yoe-Little River Academy game?', answer: 'KBTX reports a played 31-13 Cameron win on October 23. MaxPreps currently shows a 13-10 Cameron win marked FF. TexasDefined preserves the source conflict.' },
      { question: 'Where does Cameron Yoe play?', answer: "Dave Campbell's identifies Yoe Field as the program stadium." }
    ]
  },
  campbell: {
    slug: 'campbell',
    intro: "Campbell's Indians are a Hunt County six-man program in UIL 1A Division I District 12. Campbell ISD officially lists Preston Compton as Head Football/AD. The 2026 record was fragmented across stale feeds, but current statewide reporting verifies a 70-46 district win over Saint Jo on October 22.",
    theme: { accentHex: '#8B1E2D', label: 'Original TexasDefined maroon six-man editorial treatment; no Campbell ISD logo or school-owned image reproduced.' },
    seo: {
      title: 'Campbell Indians Football | 2026 Six-Man Scores & Preston Compton',
      description: 'Campbell Indians six-man football: Preston Compton, 2026 District 12 results, Saint Jo 70-46 win, Hunt County campus and official Campbell ISD sources.'
    },
    coach: {
      name: 'Preston Compton',
      title: 'Head Football / Athletic Director',
      sourceUrl: 'https://www.campbellisd.org/campus-departments/athletics/football',
      sourceLabel: 'Campbell ISD official football page',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '409 W. North St., Campbell, TX 75422',
      sourceUrl: 'https://www.campbellisd.org/',
      sourceLabel: 'Campbell ISD official site; current football directories use the same high-school address',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Campbell ISD football and current six-man results',
      sourceUrl: 'https://www.campbellisd.org/campus-departments/athletics/football',
      sourceLabel: 'Campbell ISD official football staff page plus district calendar and current statewide score reporting',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.campbellisd.org/calendar2/'
    },
    season: {
      record: '4-4 in the best current combined ledger through October 22, 2026; some third-party schedules remain incomplete',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.texasfootball.com/team/campbell-indians',
      sourceLabel: 'DCTF early-season ledger, On3 Fannindel final, Campbell ISD schedule and Oct. 22 statewide Saint Jo final',
      latestResultSourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-thursday-october-22-2026-01m5mdmq0eey',
      games: [
        { date: '2026-08-27', opponent: 'Gordon', site: 'Home', result: 'L 12-57' },
        { date: '2026-09-03', opponent: 'Heritage Christian Academy', site: 'Away', result: 'L 12-62' },
        { date: '2026-09-11', opponent: 'Fannindel', site: 'Away', result: 'L 36-55' },
        { date: '2026-09-17', opponent: 'Greenville Homeschool Athletics', site: 'Home', result: 'W 61-30' },
        { date: '2026-09-24', opponent: 'Cedar Hill Newman', site: 'Home', result: 'W 75-24' },
        { date: '2026-10-02', opponent: 'East Texas Homeschool Sports', site: 'Home', result: 'L 8-56' },
        { date: '2026-10-22', opponent: 'Saint Jo', site: 'Home', district: true, result: 'W 70-46' },
        { date: '2026-10-29', opponent: 'Savoy', site: 'Away', district: true, kickoff: '7:30 PM' },
        { date: '2026-11-05', opponent: 'Fruitvale', site: 'Home', district: true, kickoff: '7:30 PM' }
      ]
    },
    development: {
      title: 'A fragmented 2026 data trail, anchored by first-party staff and a verified district win',
      body: "Campbell ISD supplies a clean first-party coaching source for Preston Compton, but the 2026 results are fragmented across stale schedule providers. DCTF captures Campbell’s early 2-3 start, On3 adds the Fannindel loss, MaxPreps shows the October 2 East Texas Homeschool loss, and statewide October 22 finals verify Campbell 70, Saint Jo 46. The page uses a combined dated ledger instead of pretending one incomplete feed is authoritative.",
      sourceUrl: 'https://www.campbellisd.org/campus-departments/athletics/football',
      sourceLabel: 'Campbell ISD first-party football page plus current multi-source results',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2025', title: 'Campbell posts a 7-3 season', body: "Dave Campbell's lists the 2025 Indians at 7-3, their strongest recent season in the visible archive.", sourceUrl: 'https://www.texasfootball.com/team/campbell-indians', sourceLabel: "Dave Campbell's Campbell history" },
      { date: 'October 22, 2026', title: 'Campbell beats Saint Jo 70-46', body: 'Statewide Thursday-night finals verify the District 12 win.', sourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-thursday-october-22-2026-01m5mdmq0eey', sourceLabel: 'High School On SI Thursday finals' }
    ],
    overview: [
      'Campbell ISD officially identifies Preston Compton as Head Football/AD.',
      'UIL places Campbell in 1A Division I District 12 six-man football for 2026-28.',
      "Dave Campbell's lists zero state titles, zero title-game appearances and zero playoff appearances in its current program-history summary.",
      'The 2026 schedule trail is incomplete across providers, so TexasDefined uses a combined source ledger and labels it as such.',
      'The latest verified result is Campbell 70, Saint Jo 46 on October 22.'
    ],
    faq: [
      { question: 'Who coaches Campbell football?', answer: 'Preston Compton. Campbell ISD officially lists him as Head Football/AD.' },
      { question: 'Does Campbell play six-man football?', answer: 'Yes. UIL places Campbell in 1A Division I District 12 for the 2026-28 six-man cycle.' },
      { question: 'What was the Campbell-Saint Jo score?', answer: 'Campbell won 70-46 on October 22, 2026, according to statewide final-score reporting.' },
      { question: 'Why does the Campbell record need a source note?', answer: 'Several current schedule providers are incomplete or stale, so TexasDefined combines dated results instead of treating one partial feed as complete.' }
    ]
  },
  canadian: {
    slug: 'canadian',
    intro: "Canadian's Wildcats are one of the strongest small-school football programs in Texas history. Canadian ISD's own football page documents four older state titles, while current historical sources add the 2020 championship for five total. Andy Cavalier remains the 2026 head coach. The Wildcats are 6-3 after a 49-7 district win at Childress on October 23.",
    theme: { accentHex: '#111111', label: 'Original TexasDefined black-and-gold Wildcat editorial treatment inspired by Canadian program presentation; no school-owned logo reproduced.' },
    seo: {
      title: 'Canadian Wildcats Football | 2026 Scores, Andy Cavalier & 5 State Titles',
      description: 'Canadian Wildcats football: Andy Cavalier, five state championships, 2026 District 1-3A Division II scores, Childress win and official Canadian ISD history.'
    },
    coach: {
      name: 'Andy Cavalier',
      title: 'Head football coach',
      sourceUrl: 'https://www.presspass.news/2026/08/10/canadian-wildcats-2026-football-preview/',
      sourceLabel: 'Press Pass Sports interviewed Canadian head football coach Andy Cavalier during 2026 fall workouts; current MaxPreps staff agrees',
      verifiedAt: '2026-10-25'
    },
    campus: {
      address: '621 South 5th St., Canadian, TX 79014',
      sourceUrl: 'https://www.canadianisd.net/canadian-high-school',
      sourceLabel: 'Canadian ISD official Canadian High School page; current football roster uses the same campus address',
      verifiedAt: '2026-10-25'
    },
    schedule: {
      label: 'Canadian 2026 football schedule and current results',
      sourceUrl: 'https://www.canadianisd.net/football',
      sourceLabel: 'Canadian ISD official football history page plus current schedule/result sources',
      verifiedAt: '2026-10-25',
      officialScheduleUrl: 'https://www.canadianisd.net/football'
    },
    season: {
      record: '6-3 overall, 3-0 district through October 23, 2026',
      verifiedAt: '2026-10-25',
      sourceUrl: 'https://www.maxpreps.com/tx/canadian/canadian-wildcats/football/schedule/',
      sourceLabel: 'Current schedule plus verified Dimmitt and Childress finals',
      latestResultSourceUrl: 'https://www.maxpreps.com/tx/football/game/canadian-vs-childress/10-23-2026/?c=aeff9426-687a-4d35-8ef4-bbab25b632f7',
      games: [
        { date: '2026-08-28', opponent: 'Panhandle', site: 'Home', result: 'W 63-38' },
        { date: '2026-09-04', opponent: 'Bushland', site: 'Away', result: 'W 27-17' },
        { date: '2026-09-11', opponent: 'Shallowater', site: 'Home', result: 'L 28-31' },
        { date: '2026-09-18', opponent: 'Canyon Randall', site: 'Away', result: 'L 28-35 (OT)' },
        { date: '2026-09-25', opponent: 'Pampa', site: 'Away', result: 'W 53-7' },
        { date: '2026-10-02', opponent: 'Dalhart', site: 'Home', result: 'L 7-26' },
        { date: '2026-10-09', opponent: 'Friona', site: 'Away', district: true, result: 'W 49-7' },
        { date: '2026-10-16', opponent: 'Dimmitt', site: 'Home', district: true, result: 'W 70-31' },
        { date: '2026-10-23', opponent: 'Childress', site: 'Away', district: true, result: 'W 49-7' },
        { date: '2026-11-06', opponent: 'River Road', site: 'Home', district: true, kickoff: '7:00 PM' }
      ]
    },
    venue: {
      name: 'Wildcats Stadium / Chris Koetting Field',
      address: 'Canadian, TX',
      sourceUrl: 'https://www.presspass.news/2026/08/29/canadian-offense-outshines-panhandle-for-season-opening-victory/',
      sourceLabel: 'Press Pass Sports identifies Chris Koetting Field at Wildcats Stadium in current 2026 coverage',
      verifiedAt: '2026-10-25',
      note: 'Use Canadian ISD event information for current ticketing, parking and accessibility details.'
    },
    development: {
      title: 'Five-title tradition under a current 6-3 team',
      body: "Canadian ISD's official football page documents state championships in 2007, 2008, 2014 and 2015. Current historical sources add the 2020 Class 3A Division II title, giving Canadian five total. Andy Cavalier entered 2026 after an 11-2 2025 season and a 35-7 record through three seasons at Canadian; the 2026 Wildcats are 6-3 after consecutive district wins over Friona, Dimmitt and Childress.",
      sourceUrl: 'https://www.canadianisd.net/football',
      sourceLabel: 'Canadian ISD official football history, current program history and 2026 Press Pass Sports preview',
      verifiedAt: '2026-10-25'
    },
    milestones: [
      { date: '2007, 2008, 2014, 2015, 2020', title: 'Five state championships', body: 'Canadian’s title history spans five championship seasons, with the first four documented on the school’s own football page and the 2020 title reflected in current historical records.', sourceUrl: 'https://www.canadianisd.net/football', sourceLabel: 'Canadian ISD official football history' },
      { date: '2023', title: 'Canadian posts a 14-1 season', body: 'Current program history lists the Wildcats at 14-1 in Andy Cavalier’s first season as head coach.', sourceUrl: 'https://www.maxpreps.com/tx/canadian/canadian-wildcats/football/history/', sourceLabel: 'MaxPreps Canadian history' },
      { date: 'October 23, 2026', title: 'Canadian beats Childress 49-7', body: 'The district road win moved the Wildcats to 6-3 overall and 3-0 in district.', sourceUrl: 'https://www.maxpreps.com/tx/football/game/canadian-vs-childress/10-23-2026/?c=aeff9426-687a-4d35-8ef4-bbab25b632f7', sourceLabel: 'MaxPreps final game page' }
    ],
    overview: [
      'Canadian High School is in Hemphill County and the official school page says Go Wildcats.',
      'Andy Cavalier remains the current head football coach in 2026 reporting and current team staff.',
      'UIL places Canadian in Class 3A Division II District 1.',
      'Canadian owns five state championships when the school’s four documented older titles are combined with the 2020 championship in current historical records.',
      'The Wildcats are 6-3 and unbeaten in district through October 23, with River Road remaining after the October 30 open date.'
    ],
    faq: [
      { question: 'Who coaches Canadian football in 2026?', answer: 'Andy Cavalier. Press Pass Sports interviewed him as Canadian head football coach during 2026 fall workouts, and the current staff page agrees.' },
      { question: 'How many state football titles has Canadian won?', answer: 'Five: 2007, 2008, 2014, 2015 and 2020.' },
      { question: 'What is Canadian football record after October 23, 2026?', answer: 'Canadian is 6-3 overall and 3-0 in district after a 49-7 win at Childress.' },
      { question: 'Where does Canadian play home football?', answer: 'Current 2026 coverage identifies Chris Koetting Field at Wildcats Stadium.' }
    ]
  },
  canton: {
    slug: 'canton',
    intro: "Canton's Eagles are 8-0 after a 48-14 District 9 win over Rusk on October 23. Canton High School lists Heath Ragle as athletic director, while the current UIL-partner football page identifies him as head coach. The page keeps that source distinction explicit.",
    theme: { accentHex: '#0B5D3B', label: 'Original TexasDefined green editorial treatment; no Canton ISD logo or school-owned photograph reproduced.' },
    seo: { title: 'Canton Eagles Football | 2026 Scores, Heath Ragle & District 9', description: 'Canton Eagles football: 8-0 start, Heath Ragle, 2026 4A Division II District 9 results, Rusk win, Canton High campus and official schedule links.' },
    coach: { name: 'Heath Ragle', title: 'Head football coach in current UIL-partner team data; Canton High lists him as Athletic Director', sourceUrl: 'https://hs.cantonisd.net/apps/pages/index.jsp?pREC_ID=staff&type=d&uREC_ID=91716', sourceLabel: 'Canton High football staff page plus current UIL-partner team staff', verifiedAt: '2026-10-25' },
    campus: { address: '1110 W Hwy 243, Canton, TX 75103', sourceUrl: 'https://hs.cantonisd.net/', sourceLabel: 'Canton High School official site', verifiedAt: '2026-10-25' },
    schedule: { label: 'Canton 2026 football schedule', sourceUrl: 'https://www.cantonisd.net/apps/pages/index.jsp?pREC_ID=1487211&type=d&uREC_ID=1271586', sourceLabel: 'Canton ISD 2026-27 athletic schedules', verifiedAt: '2026-10-25', officialScheduleUrl: 'https://www.cantonisd.net/apps/pages/index.jsp?pREC_ID=1487211&type=d&uREC_ID=1271586' },
    season: { record: '8-0 overall, 3-0 district through October 23, 2026', verifiedAt: '2026-10-25', sourceUrl: 'https://www.maxpreps.com/tx/canton/canton-eagles/football/', sourceLabel: 'UIL-partner current team page', latestResultSourceUrl: 'https://www.maxpreps.com/tx/canton/canton-eagles/football/', games: [
      { date: '2026-08-28', opponent: 'Jacksonville', site: 'Away', result: 'W 41-21' },
      { date: '2026-09-04', opponent: 'Commerce', site: 'Home', result: 'W 64-14' },
      { date: '2026-09-11', opponent: 'Caddo Mills', site: 'Away', result: 'W 48-40' },
      { date: '2026-09-17', opponent: 'Mount Vernon', site: 'Home', result: 'W 55-0' },
      { date: '2026-09-25', opponent: 'Wills Point', site: 'Home', result: 'W 71-0' },
      { date: '2026-10-09', opponent: 'Van', site: 'Away', district: true, result: 'W 58-42' },
      { date: '2026-10-16', opponent: 'Brownsboro', site: 'Away', district: true, result: 'W 55-0' },
      { date: '2026-10-23', opponent: 'Rusk', site: 'Home', district: true, result: 'W 48-14' },
      { date: '2026-10-30', opponent: 'Madisonville', site: 'Away', district: true, kickoff: '7:30 PM' }
    ] },
    development: { title: 'An unbeaten 2026 start with source-qualified coaching attribution', body: 'Canton opened 8-0 and 3-0 in district through the Rusk game. Canton High first-party pages list Heath Ragle as athletic director; the current UIL-partner football page identifies him as head coach. TexasDefined preserves both source roles instead of upgrading the first-party title.', sourceUrl: 'https://hs.cantonisd.net/apps/pages/index.jsp?pREC_ID=staff&type=d&uREC_ID=91716', sourceLabel: 'Canton High football staff page and current UIL-partner football record', verifiedAt: '2026-10-25' },
    milestones: [
      { date: '2025', title: 'Canton posts a 10-2 season', body: 'Current program history lists a 10-2 2025 finish.', sourceUrl: 'https://www.maxpreps.com/tx/canton/canton-eagles/football/history/', sourceLabel: 'UIL-partner Canton history' },
      { date: 'October 23, 2026', title: 'Canton reaches 8-0', body: 'The Eagles beat Rusk 48-14 to remain unbeaten.', sourceUrl: 'https://www.maxpreps.com/tx/canton/canton-eagles/football/', sourceLabel: 'UIL-partner Canton team page' }
    ],
    overview: ['Canton competes in UIL 4A Division II District 9 for 2026-28.', 'Canton High School is in Van Zandt County at 1110 W Hwy 243.', 'The Eagles are 8-0 through October 23, 2026.', 'Canton ISD publishes 2026-27 athletic schedules and event-ticket links.'],
    faq: [
      { question: 'Who coaches Canton football in 2026?', answer: 'Current UIL-partner team data identifies Heath Ragle as head coach; Canton High first-party pages list him as Athletic Director.' },
      { question: 'What is Canton football record after October 23, 2026?', answer: '8-0 overall and 3-0 in district after a 48-14 win over Rusk.' },
      { question: 'What district is Canton in?', answer: 'UIL 4A Division II District 9 for the 2026-28 alignment cycle.' },
      { question: 'Where can fans find the official schedule?', answer: 'Canton ISD publishes its 2026-27 athletic schedules and event ticket links on the district athletics schedule page.' }
    ]
  },
  canutillo: {
    slug: 'canutillo',
    intro: "Canutillo's Eagles are 6-2 after a weather-postponed district game against Chapin was completed October 24 as a 24-20 loss. Canutillo ISD identifies Scott Brooks as the long-tenured head football coach and says 2026 is his final season before retirement.",
    theme: { accentHex: '#F47A20', label: 'Original TexasDefined orange-and-blue editorial treatment; no Canutillo ISD logo or school-owned photograph reproduced.' },
    seo: { title: 'Canutillo Eagles Football | 2026 Scores & Scott Brooks Final Season', description: 'Canutillo Eagles football: Scott Brooks final season, 2026 5A Division II District 1 scores, Chapin weather-postponed final and official CISD schedule sources.' },
    coach: { name: 'Scott Brooks', title: 'Head football coach', sourceUrl: 'https://www.canutillo-isd.org/post-details/~board/superintendent/post/dr-borregos-canutillo-pop-vol-ii-edition-6', sourceLabel: 'Canutillo ISD August 2026 superintendent update identifies Brooks as coach and 2026 as his final season', verifiedAt: '2026-10-25' },
    campus: { address: '6675 S. Desert Blvd., El Paso, TX 79932', sourceUrl: 'https://www.canutillo-isd.org/parents/contact-us', sourceLabel: 'Canutillo ISD official contact directory', verifiedAt: '2026-10-25' },
    schedule: { label: 'Canutillo varsity football schedule', sourceUrl: 'https://www.canutillo-isd.org/departments/athletics/high-school-schedules', sourceLabel: 'Canutillo ISD high-school schedules', verifiedAt: '2026-10-25', officialScheduleUrl: 'https://www.canutillo-isd.org/departments/athletics/high-school-schedules' },
    season: { record: '6-2 overall, 2-1 district through October 24, 2026', verifiedAt: '2026-10-25', sourceUrl: 'https://www.maxpreps.com/tx/canutillo/canutillo-eagles/football/schedule/', sourceLabel: 'UIL-partner schedule plus October 24 statewide final', latestResultSourceUrl: 'https://www.houstonchronicle.com/sports/high-school/football/article/texas-high-school-football-scores-saturday-22492945.php', games: [
      { date: '2026-08-27', opponent: 'Americas', site: 'Home', result: 'W 28-20' },
      { date: '2026-09-04', opponent: 'Eastwood', site: 'Away', result: 'L 17-49' },
      { date: '2026-09-11', opponent: 'Parkland', site: 'Away', result: 'W 49-14' },
      { date: '2026-09-18', opponent: 'Horizon', site: 'Home', result: 'W 63-14' },
      { date: '2026-09-25', opponent: 'Hanks', site: 'Away', result: 'W 38-35' },
      { date: '2026-10-09', opponent: 'Del Valle', site: 'Home', district: true, result: 'W 28-12' },
      { date: '2026-10-15', opponent: 'Jefferson', site: 'Away', district: true, result: 'W 54-0' },
      { date: '2026-10-24', opponent: 'Chapin', site: 'Home', district: true, result: 'L 20-24' },
      { date: '2026-10-30', opponent: 'Burges', site: 'Home', district: true, kickoff: '7:00 PM' },
      { date: '2026-11-06', opponent: 'El Paso', site: 'Away', district: true, kickoff: '7:00 PM' }
    ] },
    venue: { name: 'Coach Julius & Irene Lowenberg Eagles Stadium', address: 'Canutillo, TX', sourceUrl: 'https://www.canutillo-isd.org/post-details/~board/redesign/post/chs-homecoming-2026', sourceLabel: 'Canutillo ISD 2026 homecoming announcement', verifiedAt: '2026-10-25', note: 'Use current CISD event information for parking, accessibility and ticket inventory.' },
    development: { title: 'Scott Brooks final season and a weather-shifted district result', body: 'Canutillo ISD announced 2026 as Scott Brooks final season after a 26-year head-coaching tenure. The October 23 Chapin game was postponed by severe weather and completed October 24, when Chapin won 24-20. The page dates the final to the day it was actually completed.', sourceUrl: 'https://www.canutillo-isd.org/post-details/~board/superintendent/post/dr-borregos-canutillo-pop-vol-ii-edition-6', sourceLabel: 'Canutillo ISD coach update plus October 24 statewide final', verifiedAt: '2026-10-25' },
    milestones: [
      { date: '2014', title: 'Canutillo reaches the state semifinals', body: 'Canutillo ISD cites a state-semifinal appearance during Brooks long tenure.', sourceUrl: 'https://www.canutillo-isd.org/post-details/~board/redesign/post/coach-brooks-among-top-5-longest-tenured-head-football-coaches-in-texas', sourceLabel: 'Canutillo ISD coach profile' },
      { date: '2026', title: 'Brooks final season', body: 'Canutillo ISD says 2026 is Scott Brooks final season before retirement.', sourceUrl: 'https://www.canutillo-isd.org/post-details/~board/superintendent/post/dr-borregos-canutillo-pop-vol-ii-edition-6', sourceLabel: 'Canutillo ISD superintendent update' }
    ],
    overview: ['Canutillo competes in UIL 5A Division II District 1.', 'Scott Brooks is in his final season as head coach in 2026.', 'Canutillo ISD publishes varsity football schedules and identifies the homecoming venue as Coach Julius & Irene Lowenberg Eagles Stadium.', 'The Chapin district game was postponed by weather and completed October 24 as a 24-20 Canutillo loss.'],
    faq: [
      { question: 'Who coaches Canutillo football in 2026?', answer: 'Scott Brooks. Canutillo ISD says 2026 is his final season before retirement.' },
      { question: 'What happened to the Canutillo-Chapin game?', answer: 'Severe weather postponed the October 23 game to October 24; Chapin then won 24-20.' },
      { question: 'Where does Canutillo play home football?', answer: 'Canutillo ISD identifies Coach Julius & Irene Lowenberg Eagles Stadium.' },
      { question: 'Where is the official Canutillo football schedule?', answer: 'Canutillo ISD publishes varsity football schedules on its high-school schedules page.' }
    ]
  },
  canyon: {
    slug: 'canyon',
    intro: "Canyon's Eagles are 5-3 after a 24-21 rivalry loss to Randall on October 23. Canyon High's current football page and staff directory identify Matt Lovorn as head football coach; a separate stale welcome page still says Todd Winfrey, so TexasDefined follows the current football-specific sources and records the discrepancy.",
    theme: { accentHex: '#5A2D82', label: 'Original TexasDefined purple Eagle editorial treatment; no Canyon ISD logo or school-owned photograph reproduced.' },
    seo: { title: 'Canyon Eagles Football | 2026 Scores, Matt Lovorn & District 2', description: 'Canyon Eagles football: Matt Lovorn, 2026 4A Division I District 2 results, Randall rivalry final, official Canyon ISD schedule and current staff sources.' },
    coach: { name: 'Matt Lovorn', title: 'Head football coach', sourceUrl: 'https://chs.canyonisd.net/football', sourceLabel: 'Canyon High current football page and staff directory; older welcome page still lists Todd Winfrey and is treated as stale', verifiedAt: '2026-10-25' },
    campus: { address: '1701 23rd Street, Canyon, TX 79015', sourceUrl: 'https://chs.canyonisd.net/contact-us', sourceLabel: 'Canyon High official contact page', verifiedAt: '2026-10-25' },
    schedule: { label: 'Canyon 2026 football schedule', sourceUrl: 'https://chs.canyonisd.net/football', sourceLabel: 'Canyon High official football page', verifiedAt: '2026-10-25', officialScheduleUrl: 'https://chs.canyonisd.net/football' },
    season: { record: '5-3 overall, 1-2 district through October 23, 2026', verifiedAt: '2026-10-25', sourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', sourceLabel: 'Press Pass Sports rivalry final plus current UIL-partner schedule', latestResultSourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', games: [
      { date: '2026-08-28', opponent: 'Snyder', site: 'Away', result: 'W 59-13' },
      { date: '2026-09-04', opponent: 'Tascosa', site: 'Home', result: 'L 27-28' },
      { date: '2026-09-10', opponent: 'Caprock', site: 'Away', result: 'W 37-7' },
      { date: '2026-09-17', opponent: 'Lubbock-Cooper', site: 'Home', result: 'W 49-24' },
      { date: '2026-09-24', opponent: 'Sanger', site: 'Neutral', result: 'W 38-28' },
      { date: '2026-10-09', opponent: 'Hereford', site: 'Away', district: true, result: 'W 52-7' },
      { date: '2026-10-16', opponent: 'West Plains', site: 'Away', district: true, result: 'L 16-18' },
      { date: '2026-10-23', opponent: 'Canyon Randall', site: 'Home', district: true, result: 'L 21-24' },
      { date: '2026-10-30', opponent: 'Pampa', site: 'Away', district: true, kickoff: '7:00 PM' },
      { date: '2026-11-06', opponent: 'Dumas', site: 'Home', district: true, kickoff: '7:00 PM' }
    ] },
    venue: { name: 'Happy State Bank Stadium', address: 'Canyon, TX', sourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', sourceLabel: 'Press Pass Sports current rivalry coverage', verifiedAt: '2026-10-25', note: 'Use Canyon ISD event information for current ticketing, parking and accessibility.' },
    development: { title: 'Current coach source corrected against a stale campus page', body: 'Canyon High current football and staff pages identify Matt Lovorn as head football coach. An older campus welcome page still lists Todd Winfrey. TexasDefined uses the football-specific current source and keeps the stale-page conflict documented rather than silently merging the names.', sourceUrl: 'https://chs.canyonisd.net/football', sourceLabel: 'Canyon High current football page and staff directory', verifiedAt: '2026-10-25' },
    milestones: [
      { date: '2026', title: 'Matt Lovorn leads the current Eagles', body: 'Canyon High current football and staff pages identify Lovorn as head coach.', sourceUrl: 'https://chs.canyonisd.net/football', sourceLabel: 'Canyon High official football page' },
      { date: 'October 23, 2026', title: 'Randall edges Canyon 24-21', body: 'The District 2 rivalry was decided late at Happy State Bank Stadium.', sourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', sourceLabel: 'Press Pass Sports game report' }
    ],
    overview: ['Canyon competes in UIL 4A Division I District 2.', 'Canyon High current football sources identify Matt Lovorn as head coach.', 'The Eagles are 5-3 and 1-2 in district through October 23.', 'Canyon and Randall share Happy State Bank Stadium for the rivalry context documented in current coverage.'],
    faq: [
      { question: 'Who coaches Canyon football in 2026?', answer: 'Matt Lovorn, according to Canyon High current football page and staff directory. An older welcome page still lists Todd Winfrey and is treated as stale.' },
      { question: 'What was the Canyon-Randall score?', answer: 'Randall beat Canyon 24-21 on October 23, 2026.' },
      { question: 'What district is Canyon in?', answer: 'UIL 4A Division I District 2.' },
      { question: 'Where is the official Canyon football schedule?', answer: 'Canyon High publishes the 2026 football schedule on its official football page.' }
    ]
  },
  'canyon-randall': {
    slug: 'canyon-randall',
    intro: "Randall's Raiders are 7-1 after beating rival Canyon 24-21 on October 23. Randall High officially identifies Dan Sherwood as head football coach, and Canyon ISD publishes the current football schedule and Ticket Spicket event access.",
    theme: { accentHex: '#6B7280', label: 'Original TexasDefined silver-and-black Raider editorial treatment; no Randall High logo or school-owned photograph reproduced.' },
    seo: { title: 'Randall Raiders Football | 2026 Scores, Dan Sherwood & District 2', description: 'Randall Raiders football: Dan Sherwood, 7-1 start, 2026 4A Division I District 2 results, Canyon rivalry win and official Randall High schedule sources.' },
    coach: { name: 'Dan Sherwood', title: 'Head football coach', sourceUrl: 'https://rhs.canyonisd.net/86735?personID=401086', sourceLabel: 'Randall High official staff directory', verifiedAt: '2026-10-25' },
    campus: { address: '9201 Bell Street, Amarillo, TX 79118', sourceUrl: 'https://rhs.canyonisd.net/campus-information', sourceLabel: 'Randall High official campus information', verifiedAt: '2026-10-25' },
    schedule: { label: 'Randall 2026 football schedule', sourceUrl: 'https://rhs.canyonisd.net/football', sourceLabel: 'Randall High official football page', verifiedAt: '2026-10-25', officialScheduleUrl: 'https://rhs.canyonisd.net/football' },
    season: { record: '7-1 overall, 2-1 district through October 23, 2026', verifiedAt: '2026-10-25', sourceUrl: 'https://www.presspass.news/2026/10/25/5-takeaways-from-week-9-across-the-texas-panhandle-and-south-plains/', sourceLabel: 'Press Pass Sports Week 9 standings plus current UIL-partner schedule', latestResultSourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', games: [
      { date: '2026-08-28', opponent: 'Roswell', site: 'Home', result: 'W 50-37' },
      { date: '2026-09-04', opponent: 'Memorial', site: 'Away', result: 'W 35-34 (OT)' },
      { date: '2026-09-11', opponent: 'Borger', site: 'Away', result: 'W 49-0' },
      { date: '2026-09-18', opponent: 'Canadian', site: 'Home', result: 'W 35-28 (OT)' },
      { date: '2026-09-24', opponent: 'Waco University', site: 'Neutral', result: 'W 36-7' },
      { date: '2026-10-09', opponent: 'Pampa', site: 'Away', district: true, result: 'W 61-17' },
      { date: '2026-10-15', opponent: 'Dumas', site: 'Home', district: true, result: 'L 19-28' },
      { date: '2026-10-23', opponent: 'Canyon', site: 'Away', district: true, result: 'W 24-21' },
      { date: '2026-10-30', opponent: 'West Plains', site: 'Home', district: true, kickoff: '7:00 PM' },
      { date: '2026-11-06', opponent: 'Hereford', site: 'Away', district: true, kickoff: '7:00 PM' }
    ] },
    venue: { name: 'Happy State Bank Stadium', address: 'Canyon, TX', sourceUrl: 'https://www.tpsnsports.com/2026/06/17/2026-randall-raiders-football-schedule/', sourceLabel: 'KFDA / Texas Panhandle Sports Network 2026 Randall schedule', verifiedAt: '2026-10-25', note: 'Randall High official homepage links Ticket Spicket; current event inventory and accessibility should be checked per event.' },
    development: { title: 'A 7-1 start and third straight rivalry win', body: 'Randall opened 7-1 and moved to 2-1 in District 2 after the 24-21 win over Canyon. Press Pass Sports reports it as Randall third straight victory in the rivalry and places the Raiders one game behind West Plains entering the October 30 meeting.', sourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', sourceLabel: 'Press Pass Sports rivalry report', verifiedAt: '2026-10-25' },
    milestones: [
      { date: 'October 23, 2026', title: 'Randall beats Canyon 24-21', body: 'The Raiders retained the rivalry GOAT trophy with a late defensive stop.', sourceUrl: 'https://www.presspass.news/2026/10/24/randall-raiders-edge-canyon-to-win-goat-battle-for-third-straight-year-in-district-2-4a-division-i-showdown/', sourceLabel: 'Press Pass Sports game report' },
      { date: '2026', title: 'Randall reaches 7-1', body: 'Week 9 standings place Randall at 7-1 overall and 2-1 in district.', sourceUrl: 'https://www.presspass.news/2026/10/25/5-takeaways-from-week-9-across-the-texas-panhandle-and-south-plains/', sourceLabel: 'Press Pass Sports Week 9 analysis' }
    ],
    overview: ['Randall competes in UIL 4A Division I District 2.', 'Randall High officially lists Dan Sherwood as head football coach.', 'The Raiders are 7-1 and 2-1 in district through October 23.', 'Randall High current campus is 9201 Bell Street in Amarillo; football games use district stadium facilities rather than the campus address.'],
    faq: [
      { question: 'Who coaches Randall football in 2026?', answer: 'Dan Sherwood, according to Randall High official staff directory.' },
      { question: 'What was the Randall-Canyon score?', answer: 'Randall won 24-21 on October 23, 2026.' },
      { question: 'What is Randall record after Week 9?', answer: '7-1 overall and 2-1 in district.' },
      { question: 'Where is the official Randall football schedule?', answer: 'Randall High publishes its football schedule on the official school football page.' }
    ]
  }
};

export function getBatch008FootballProgramEditorial(slug: string) {
  return BATCH008_EDITORIAL[slug];
}
