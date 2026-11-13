import type { FootballProgramEditorial } from './program-editorial';

// Hightower Hurricanes: school history and separate Hall Stadium address.
const HIGHTOWER: FootballProgramEditorial = {
  slug: 'fort-bend-hightower',
  intro: 'Fort Bend Hightower Hurricanes football represents L.V. Hightower High School in Missouri City, Fort Bend County. UIL places Hightower in Class 6A District 21 for 2026–28. The campus is at 3333 Hurricane Lane; Fort Bend ISD separately identifies Hall Stadium at 3335 Hurricane Lane for a dated district event.',
  theme: { accentHex: '#6A7286', label: 'Independent TexasDefined editorial accent, not licensed Hurricanes school artwork or official colors.' },
  seo: {
    title: 'Fort Bend Hightower Hurricanes Football | UIL & Hall Stadium Guide',
    description: 'Hightower Hurricanes 6A District 21, L.V. Hightower campus history, school and Hall Stadium addresses and current Fort Bend ISD varsity sources.'
  },
  campus: { address: '3333 Hurricane Lane, Missouri City, TX 77459', sourceUrl: 'https://hhs.fortbendisd.gov/our-school', sourceLabel: 'L.V. Hightower High School official campus and history', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Fort Bend ISD’s current varsity football calendar and specific game host', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Hall Stadium and the high-school campus have different street numbers',
    body: 'Hightower High School lists 3333 Hurricane Lane, Missouri City. The school’s official Band Night announcement identifies Hall Stadium at 3335 Hurricane Lane, with event-specific home-side seating. That Band Night seating notice does not automatically apply to football tickets or accessible entry. Confirm each game’s host and rules.',
    sourceUrl: 'https://hhs.fortbendisd.gov/',
    sourceLabel: 'Hightower High School official campus and Hall Stadium event announcement',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alignment assigns Hightower to eleven-man Class 6A District 21. This does not establish its current football standing.',
    'L.V. Hightower High School is at 3333 Hurricane Lane, Missouri City TX 77459, telephone 281-634-5240. Its official school history explains that the campus is named for longtime Fort Bend educator Lockhart Valentine Hightower.',
    'The school describes L.V. Hightower’s 30-year Fort Bend ISD career, including athletics administration at Dulles, and offers medical science and digital media career academies. This is unique school history, not a claim about varsity results.',
    'The school’s September 2026 Band Night notice identifies Hall Stadium at 3335 Hurricane Lane, separate from the high-school address. Band Night’s free admission and home-side seating are not general football policies.',
    'A 2026 third-party varsity schedule names Cornelius Anthony as football coach, but the first-party school pages checked here do not confirm his current head-coach appointment; no current coach is asserted.',
    'No unverified football score, parking promise, accessible gate or school-owned image rights are claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL 6A District 21', body: 'Fort Bend Hightower is in Class 6A District 21 for eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Campus namesake and school history', body: 'The school is named for longtime Fort Bend educator L.V. Hightower and describes its medical science and digital media academies.', sourceUrl: 'https://hhs.fortbendisd.gov/our-school', sourceLabel: 'Official Hightower High School history' },
    { date: 'September 2026', title: 'Hall Stadium location in school notice', body: 'Hightower High School’s Band Night announcement lists Hall Stadium at 3335 Hurricane Lane; event-specific conditions do not automatically apply to football.', sourceUrl: 'https://hhs.fortbendisd.gov/', sourceLabel: 'Hightower High School official event announcement' }
  ],
  faq: [
    { question: 'What UIL district is Hightower in for 2026?', answer: 'Class 6A District 21, under the official 2026–28 alignment.' },
    { question: 'What is the difference between Hightower High and Hall Stadium addresses?', answer: 'The school is at 3333 Hurricane Lane; the school’s Band Night announcement lists Hall Stadium at 3335 Hurricane Lane. Verify the actual football host.' },
    { question: 'Who was L.V. Hightower?', answer: 'The school was named for Lockhart Valentine Hightower, a longtime Fort Bend ISD educator and athletics administrator.' },
    { question: 'Where do I confirm football tickets and access?', answer: 'Use Fort Bend ISD’s varsity schedule and the host’s specific game-day ticket, parking and accessibility notice.' }
  ]
};

export function getBatch018FortBendHightowerEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-hightower' ? HIGHTOWER : undefined;
}
