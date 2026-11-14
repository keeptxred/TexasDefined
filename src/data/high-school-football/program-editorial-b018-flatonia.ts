import type { FootballProgramEditorial } from './program-editorial';

// Flatonia: school/UIL identity with separately attributed AP November 13 playoff result.
const FLATONIA: FootballProgramEditorial = {
  slug: 'flatonia',
  intro: 'Flatonia Bulldogs football represents Flatonia ISD in Fayette County. The 2026–28 UIL alignment places Flatonia in eleven-man Class 2A Division I, District 15. Flatonia Secondary School publishes the campus address and the district provides athletics links and Rank One forms. The Associated Press reported a 35–20 win over Dilley in the November 13 bi-district playoff; that result is independently reported, not a school-posted final or proof of a particular stadium entrance.',
  theme: { accentHex: '#725F80', label: 'Independent TexasDefined editorial accent; not an official Bulldog logo, color certification or licensed photograph.' },
  seo: {
    title: 'Flatonia Bulldogs Football | 2026 UIL District & Visitor Sources',
    description: 'Flatonia Bulldogs UIL 2A Division I District 15, official school sources and independently reported 35–20 November 13 playoff result.'
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
    'The Associated Press November 13 Texas prep results list Flatonia 35, Dilley 20 in the Class 2A Division I bi-district round; Sports Illustrated’s high-school results independently match the final. Neither report is a first-party Flatonia ISD venue announcement, so no specific spectator entrance, local parking or ticket rule is inferred.',
    'The Bulldogs’ dated playoff result and the 2026–28 UIL district answer different questions: the AP result documents one completed game, while UIL establishes competition placement. For the next matchup, use the current school or actual host’s athletics notice rather than reusing a previous stadium or ticket policy.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL football alignment', body: 'Flatonia is in Class 2A Division I District 15, eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Secondary campus and school contact', body: 'Flatonia Secondary School lists 400 E 4th St and telephone 361-865-2941, with Gabriel Adamek as secondary principal.', sourceUrl: 'https://sec.flatoniaisd.net/', sourceLabel: 'Official Flatonia Secondary School' },
    { date: '2026–27', title: 'Athletics source and current forms', body: 'Flatonia ISD athletics links football and Rank One Sport, including the current district athletics resources.', sourceUrl: 'https://www.flatoniaisd.net/generalinfo', sourceLabel: 'Official Flatonia ISD athletics general information' },
    { date: 'November 13, 2026', title: 'Flatonia advances past Dilley in bi-district', body: 'The Associated Press statewide prep-football results record Flatonia 35, Dilley 20 in Class 2A Division I. This is attributed independent reporting, not claimed as a school-issued game record.', sourceUrl: 'https://www.chron.com/sports/article/friday-s-scores-22530090.php', sourceLabel: 'Associated Press November 13 Texas prep-football scoreboard' }
  ],
  faq: [
    { question: 'Which UIL football district is Flatonia in for 2026?', answer: 'Class 2A Division I District 15 for eleven-man football, per UIL’s 2026–28 alphabetical alignment.' },
    { question: 'Where is Flatonia Secondary School?', answer: '400 E 4th St, Flatonia TX 78941. Verify the actual stadium for the specific football fixture.' },
    { question: 'Where can I check Flatonia athletics?', answer: 'Use the Flatonia ISD athletics and general information pages for football and Rank One links, then confirm the current host event.' },
    { question: 'What was the November 13 Flatonia–Dilley bi-district result?', answer: 'Associated Press Texas prep scores report Flatonia defeated Dilley 35–20 on November 13, 2026. This is a separately attributed published result, not a school-certified score.' },
    { question: 'Does the campus address confirm the playoff venue?', answer: 'No. Flatonia Secondary School’s address is not a neutral-site entrance notice. Confirm the actual event host, kickoff, admission and accessible entry for any future game.' }
  ]
};

export function getBatch018FlatoniaEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'flatonia' ? FLATONIA : undefined;
}
