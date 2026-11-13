import type { FootballProgramEditorial } from './program-editorial';

// Fort Bend Bush: distinguish current school identity from stale third-party coaches.
const BUSH: FootballProgramEditorial = {
  slug: 'fort-bend-bush',
  intro: 'Fort Bend Bush Broncos football represents George Bush High School in Richmond, Fort Bend County. UIL assigns Bush to Class 6A District 21 for 2026–28. The school’s official contact is 6707 FM 1464, Richmond TX 77407; it is not a Houston Bush campus or the separate Fort Bend Austin Bulldogs.',
  theme: { accentHex: '#706A82', label: 'Independent TexasDefined editorial accent, not official Broncos colors or licensed school logo.' },
  seo: {
    title: 'Fort Bend Bush Broncos Football | 2026 UIL & School Guide',
    description: 'Fort Bend Bush Broncos 6A District 21, official Richmond school campus, current district contacts and game-day visitor verification.'
  },
  campus: { address: '6707 FM 1464, Richmond, TX 77407', sourceUrl: 'https://bhs.fortbendisd.gov/', sourceLabel: 'George Bush High School official campus and contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check George Bush High School and Fort Bend ISD athletics for current varsity fixtures', sourceUrl: 'https://bhs.fortbendisd.gov/', sourceLabel: 'George Bush High School official news and school calendar', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Verify the host and the current football staff',
    body: 'George Bush High School lists 6707 FM 1464 and telephone 281-634-6060. Third-party football sites name Colonious McNeal as 2026 coach, while older sources name other staff; the official school pages checked here do not independently confirm a current football head-coach appointment. Ask Fort Bend ISD athletics for the current staff, stadium and tickets.',
    sourceUrl: 'https://bhs.fortbendisd.gov/',
    sourceLabel: 'Official George Bush High School contact',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment lists Fort Bend Bush in eleven-man Class 6A District 21, alongside other Fort Bend ISD programs. Alignment does not prove a season result or district standing.',
    'George Bush High School’s official website lists 6707 FM 1464, Richmond TX 77407, telephone 281-634-6060, with principal Mario MacDonald. The 2026–27 Fort Bend ISD campus directory confirms that address.',
    'The school’s official site identifies the Broncos and publishes a 2025–26 TEA B accountability rating. This campus-specific school context is distinct from the football season and must not be treated as a team ranking.',
    'Third-party 2026 football rosters list Colonious McNeal as head coach, but older directories have other names. Because the first-party school sources checked do not verify the current football appointment, this guide does not assert a current head coach.',
    'Confirm the specific Fort Bend ISD football game host, kickoff, stadium, admission, parking and accessible entry. No unsourced final scores, stadium gates or copyrighted school images are claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL Class 6A district', body: 'Fort Bend Bush is assigned to Class 6A District 21 for eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Official Richmond campus', body: 'George Bush High School lists 6707 FM 1464, Richmond TX 77407 and 281-634-6060.', sourceUrl: 'https://bhs.fortbendisd.gov/', sourceLabel: 'George Bush High School official website' },
    { date: '2025–26', title: 'School accountability context', body: 'The official Bush High School site reports a B accountability rating for 2025–26, a school measure unrelated to football standings.', sourceUrl: 'https://bhs.fortbendisd.gov/', sourceLabel: 'Official Bush High School news and school profile' }
  ],
  faq: [
    { question: 'What UIL district is Fort Bend Bush in for 2026?', answer: 'Class 6A District 21, according to the UIL 2026–28 alignment.' },
    { question: 'Where is George Bush High School?', answer: '6707 FM 1464, Richmond TX 77407, telephone 281-634-6060.' },
    { question: 'Who is the current Bush football coach?', answer: 'The official school pages checked do not verify a current appointment; ask Fort Bend ISD athletics. Third-party names are not treated as first-party confirmation.' },
    { question: 'Are Fort Bend Bush and Fort Bend Austin the same team?', answer: 'No. Bush Broncos are at 6707 FM 1464 in Richmond; Austin Bulldogs are a separate Sugar Land school.' }
  ]
};

export function getBatch018FortBendBushEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-bush' ? BUSH : undefined;
}
