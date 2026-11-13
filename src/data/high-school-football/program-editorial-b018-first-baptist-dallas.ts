import type { FootballProgramEditorial } from './program-editorial';

// First Baptist Academy Dallas is TAPPS/private, never assign a UIL district.
const FBA: FootballProgramEditorial = {
  slug: 'first-baptist-dallas',
  intro: 'First Baptist Academy Saints are a Dallas private-school football program governed by TAPPS, not a UIL district team. The academy says its on-campus stadium is at its Samuell Boulevard campus and documents its 2013 and 2023 TAPPS state titles. Verify the host’s current game notice rather than assuming every game is on campus.',
  theme: { accentHex: '#61718C', label: 'Independent TexasDefined editorial accent, not a licensed Saints logo or official team color.' },
  seo: {
    title: 'First Baptist Academy Dallas Saints Football | TAPPS & Stadium Guide',
    description: 'Dallas First Baptist Academy Saints TAPPS football, 2013 and 2023 school-documented championships, Samuell Boulevard campus and official athletics visitor links.'
  },
  campus: { address: '7898 Samuell Blvd., Dallas, TX 75228', sourceUrl: 'https://fbacademy.com/about/our-campus/', sourceLabel: 'First Baptist Academy official campus and on-campus athletic facilities', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check First Baptist Academy athletics calendar and the game host for the current TAPPS fixture', sourceUrl: 'https://fbacademy.com/athletics/athletics-info/', sourceLabel: 'First Baptist Academy official athletics schedule and ticket links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Private-school TAPPS venue; confirm the game host',
    body: 'First Baptist Academy says it has an on-campus football/soccer/track stadium at 7898 Samuell Blvd. Its visitor page describes school-day ID and security procedures, but these are not automatically game-night ticket or accessibility policies. The official athletics page links schedules and tickets; confirm the specific fixture and host before traveling.',
    sourceUrl: 'https://fbacademy.com/about/our-campus/',
    sourceLabel: 'First Baptist Academy campus facilities and visitor security',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'First Baptist Academy Dallas competes in TAPPS private-school football. The school’s own football page documents TAPPS state championships in 2013 and 2023, and identifies the 2023 title as Division IV. Do not place the Saints in a UIL classification or district.',
    'The school lists its campus and on-campus football/soccer/track stadium at 7898 Samuell Blvd., Dallas, TX 75228, telephone 972-453-1321. NCES has a different street number, 7894 Samuell Blvd.; use the school’s current first-party visitor address and confirm the host before travel.',
    'The school football page describes Jason Lovvorn’s tenure and its 2023 undefeated title season. Its current contact page identifies him as head of school. Do not infer a current 2026 head-coach appointment solely from historical coaching achievements.',
    'First Baptist Academy’s athletics page offers ticket and schedule links. The school’s campus security procedures describe school-day visitors; game-day ticketing, parking and accessibility should be confirmed with the event host.',
    'The school’s published 2023 championship history is a dated achievement, not a 2026 season result. No unlicensed logo, roster photo, new win-loss record or unsupported ticket price is asserted.'
  ],
  milestones: [
    { date: '2013', title: 'School-documented TAPPS title', body: 'The academy’s football program page lists a 2013 TAPPS state championship.', sourceUrl: 'https://fbacademy.com/athletics/dallas-football-program/', sourceLabel: 'First Baptist Academy official football history' },
    { date: '2023', title: 'TAPPS Division IV state champions', body: 'The school documents its 2023 undefeated TAPPS Division IV state championship and the season’s named athletes.', sourceUrl: 'https://fbacademy.com/athletics/dallas-football-program/', sourceLabel: 'First Baptist Academy official football program' },
    { date: '2026', title: 'Campus stadium and current visitor sources', body: 'First Baptist Academy lists 7898 Samuell Blvd. and an on-campus football stadium; current game tickets must be checked through athletics and the actual host.', sourceUrl: 'https://fbacademy.com/about/our-campus/', sourceLabel: 'First Baptist Academy official campus and facilities' }
  ],
  faq: [
    { question: 'Is First Baptist Academy Dallas a UIL football team?', answer: 'No. The Saints compete under TAPPS private-school governance; UIL district tables do not apply.' },
    { question: 'Where is First Baptist Academy’s football campus?', answer: 'The school lists 7898 Samuell Blvd., Dallas TX 75228, and an on-campus football stadium. Confirm the actual game host and entrance.' },
    { question: 'What state football championships does the school document?', answer: 'The academy lists TAPPS state titles in 2013 and 2023, including the 2023 Division IV championship.' },
    { question: 'Who is the current head coach?', answer: 'The school documents Jason Lovvorn’s historical coaching career but currently lists him as head of school. Check its athletics office for a current season-specific head-coach appointment.' }
  ]
};

export function getBatch018FirstBaptistDallasEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'first-baptist-dallas' ? FBA : undefined;
}
