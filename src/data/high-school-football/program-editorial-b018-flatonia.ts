import type { FootballProgramEditorial } from './program-editorial';

// Flatonia: school-published athletics and state UIL; third-party game results excluded.
const FLATONIA: FootballProgramEditorial = {
  slug: 'flatonia',
  intro: 'Flatonia Bulldogs football represents Flatonia ISD in Fayette County. The 2026–28 UIL alignment places Flatonia in eleven-man Class 2A Division I, District 15. Flatonia Secondary School publishes the campus address and the district provides athletics links and Rank One forms; these are not substitutes for a current host’s ticket and venue announcement.',
  theme: { accentHex: '#725F80', label: 'Independent TexasDefined editorial accent; not an official Bulldog logo, color certification or licensed photograph.' },
  seo: {
    title: 'Flatonia Bulldogs Football | 2026 UIL District & Visitor Sources',
    description: 'Flatonia Bulldogs 2A Division I District 15, official secondary campus, athletics contacts, Rank One links and game-day verification.'
  },
  campus: { address: '400 E 4th St, Flatonia, TX 78941', sourceUrl: 'https://sec.flatoniaisd.net/', sourceLabel: 'Flatonia Secondary School official campus and contacts', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Flatonia ISD football athletics and current Rank One schedule before travel', sourceUrl: 'https://www.flatoniaisd.net/athletics', sourceLabel: 'Flatonia ISD official athletics and football links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Verify a specific playoff host before traveling',
    body: 'Flatonia ISD lists the Bulldogs football program and Rank One athletics resources, but its general athletics page does not establish the entrance, admission or parking for each game. Confirm the current opponent, neutral-site stadium, host, kickoff and accessibility through a dated official event notice.',
    sourceUrl: 'https://www.flatoniaisd.net/generalinfo',
    sourceLabel: 'Flatonia ISD official athletics general information and Rank One resources',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The UIL 2026–28 alphabetical alignment places Flatonia in eleven-man Class 2A Division I District 15. The school’s conference assignment is not evidence of a 2026 win-loss record.',
    'Flatonia Secondary School, home of the Bulldogs, lists 400 E 4th St, Flatonia TX 78941 and telephone 361-865-2941. Its secondary principal is Gabriel Adamek. This is a school contact address, not proof of a specific game venue.',
    'Flatonia ISD’s athletics site lists its football program among multiple sports; its general athletics information links Rank One Sport and the 2026–27 district executive committee meeting agenda. The correct varsity game should be verified with the school or host.',
    'A November 13 bi-district playoff against Dilley has been reported by third-party sources, but the official Flatonia ISD pages inspected here do not establish that game’s final venue and ticket rules. This guide therefore does not assert a school-confirmed venue, final score or price.',
    'No unsupported current head coach, season record, stadium gate, accessible parking guarantee or copyrighted school image is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL football alignment', body: 'Flatonia is in Class 2A Division I District 15, eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Secondary campus and school contact', body: 'Flatonia Secondary School lists 400 E 4th St and telephone 361-865-2941, with Gabriel Adamek as secondary principal.', sourceUrl: 'https://sec.flatoniaisd.net/', sourceLabel: 'Official Flatonia Secondary School' },
    { date: '2026–27', title: 'Athletics source and current forms', body: 'Flatonia ISD athletics links football and Rank One Sport, including the current district athletics resources.', sourceUrl: 'https://www.flatoniaisd.net/generalinfo', sourceLabel: 'Official Flatonia ISD athletics general information' }
  ],
  faq: [
    { question: 'Which UIL football district is Flatonia in for 2026?', answer: 'Class 2A Division I District 15 for eleven-man football, per UIL’s 2026–28 alphabetical alignment.' },
    { question: 'Where is Flatonia Secondary School?', answer: '400 E 4th St, Flatonia TX 78941. Verify the actual stadium for the specific football fixture.' },
    { question: 'Where can I check Flatonia athletics?', answer: 'Use the Flatonia ISD athletics and general information pages for football and Rank One links, then confirm the current host event.' },
    { question: 'Does the campus address confirm the playoff venue?', answer: 'No. A campus address is not a neutral-site stadium notice. Confirm the actual host, kickoff, admission and accessible entry before traveling.' }
  ]
};

export function getBatch018FlatoniaEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'flatonia' ? FLATONIA : undefined;
}
