import type { FootballProgramEditorial } from './program-editorial';

// Farwell: official UIL/district stadium notice; Nov13 score independently attributed to KCBD.
const FARWELL: FootballProgramEditorial = {
  slug: 'farwell',
  intro: 'Farwell Steers football represents Farwell ISD in Parmer County. The 2026–28 UIL alignment places the Steers in eleven-man Class 2A Division I, District 2. The district designated Farwell the home team for its November 13 bi-district game against Spearman at Happy State Bank Stadium in Canyon, not at the Farwell campus. KCBD subsequently reported Spearman won 64–33; that result is independently reported, not a school-issued final.',
  theme: { accentHex: '#52718A', label: 'Independent TexasDefined editorial accent; not an official school color, logo or licensed photo.' },
  seo: {
    title: 'Farwell Steers Football | 2026 UIL District & Canyon Playoff Guide',
    description: 'Farwell Steers 2A Division I District 2, official Canyon playoff site, November 13 independently reported 33–64 result, and district sources.'
  },
  campus: { address: '801 Avenue G, Farwell, TX 79325', sourceUrl: 'https://www.farwellschools.org/upload/page/0018/docs/Campus%20Improvement%20Plans/2025-26/2025%2026%20Farwell%20High%20School%20Campus%20Improvement%20Plan%208%2028%202025.pdf', sourceLabel: 'Farwell ISD high school campus improvement plan, physical address', verifiedAt: '2026-11-13' },
  schedule: { label: 'Consult Farwell ISD varsity football schedule and dated district news for updates', sourceUrl: 'https://www.farwellschools.org/', sourceLabel: 'Farwell ISD official athletics and football schedule links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'November 13 Farwell–Spearman game was held in Canyon',
    body: 'Farwell ISD identified Farwell as the designated home team for the November 13 bi-district playoff against Spearman, played at Happy State Bank Stadium in Canyon. The November 4 school notice advertised $5 admission and THSCA/district passes for that completed fixture. KCBD separately reported a 64–33 Spearman win. Neither the pregame notice nor that news report establishes next-game pricing, gate access or a school-issued final.',
    sourceUrl: 'https://www.farwellschools.org/page/article/1671',
    sourceLabel: 'Farwell ISD official November 4, 2026 playoff announcement',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The UIL 2026–28 alphabetical listing places Farwell in 2A Division I District 2 for eleven-man football. The alignment is not a schedule or a current win-loss record.',
    'Farwell High School’s campus improvement plan lists 801 Avenue G, Farwell TX 79325. Farwell ISD administration lists a different contact address, 805 Avenue G. Neither address is the venue for the announced November 13 playoff.',
    'On November 4, Farwell ISD announced a November 13, 4 p.m. bi-district game against Spearman at Happy State Bank Stadium in Canyon. Farwell is the designated home team despite playing outside Farwell; do not confuse home-team designation with home-campus location.',
    'The November 4 school notice advertised $5 admission, acceptance of THSCA/district passes and early dismissal at 12:40 p.m. for the November 13 playoff. Those historical logistics do not provide a ticket link or admission policy for any later event.'
    'KCBD’s November 13 regional scoreboard recorded Spearman 64, Farwell 33. The dated district notice establishes the opponent and neutral-site travel facts; KCBD is the separately identified final-score source. For current personnel or future scores, return to updated district and athletics notices rather than relying on older staff directories.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL district assignment', body: 'Farwell Steers are in Class 2A Division I District 2, eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical realignment' },
    { date: '2025–26', title: 'School campus identity', body: 'The Farwell ISD campus improvement plan identifies Farwell High School at 801 Avenue G; district administration uses 805 Avenue G.', sourceUrl: 'https://www.farwellschools.org/upload/page/0018/docs/Campus%20Improvement%20Plans/2025-26/2025%2026%20Farwell%20High%20School%20Campus%20Improvement%20Plan%208%2028%202025.pdf', sourceLabel: 'Official Farwell High School campus improvement plan' },
    { date: 'November 4, 2026', title: 'Bi-district travel announcement', body: 'Farwell ISD scheduled Spearman at 4 p.m. November 13 in Canyon, with Farwell the designated home team; $5 admission and THSCA/district passes applied to this fixture.', sourceUrl: 'https://www.farwellschools.org/page/article/1671', sourceLabel: 'Farwell ISD official pregame playoff notice' },
    { date: 'November 13, 2026', title: 'Spearman–Farwell playoff final independently reported', body: 'KCBD NewsChannel 11 reported Spearman 64, Farwell 33 in its regional bi-district scoreboard. This is a sourced press report, separate from the school’s earlier game-day announcement.', sourceUrl: 'https://www.fox34.com/2026/11/14/end-zone-final-scores-bi-district-playoffs-tapps-semifinal/', sourceLabel: 'KCBD Lubbock regional high-school playoff scoreboard' }
  ],
  faq: [
    { question: 'What UIL district is Farwell in for 2026?', answer: 'Class 2A Division I District 2, eleven-man football, in the UIL 2026–28 alignment.' },
    { question: 'Where is Farwell High School?', answer: 'The official campus improvement plan lists 801 Avenue G, Farwell TX 79325; the district administrative office is separately listed at 805 Avenue G.' },
    { question: 'Where did Farwell play Spearman on November 13?', answer: 'Farwell ISD identified Happy State Bank Stadium in Canyon for the 4 p.m. bi-district playoff and designated Farwell the home team; that designation did not make it a Farwell-campus game.' },
    { question: 'Who won the November 13 Farwell–Spearman playoff?', answer: 'KCBD’s November 13 regional scoreboard reports Spearman defeated Farwell 64–33. This is attributed to contemporaneous local sports reporting, not represented as a school-published score.' }
    { question: 'What tickets were announced for the November 13 game?', answer: 'Farwell ISD’s November 4 notice listed $5 admission and THSCA/district passes for that completed playoff. Those are not current prices or rules for a later fixture.' }
  ]
};

export function getBatch018FarwellEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'farwell' ? FARWELL : undefined;
}
