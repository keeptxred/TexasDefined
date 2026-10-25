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
  }
};

export function getBatch008FootballProgramEditorial(slug: string) {
  return BATCH008_EDITORIAL[slug];
}
