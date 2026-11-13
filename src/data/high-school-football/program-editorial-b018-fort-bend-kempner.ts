import type { FootballProgramEditorial } from './program-editorial';

// Kempner Cougars: current UIL 5A DII, avoid stale third-party 5A DI labels.
const KEMPNER: FootballProgramEditorial = {
  slug: 'fort-bend-kempner',
  intro: 'Fort Bend Kempner Cougars football represents I. H. Kempner High School in Sugar Land, Fort Bend County. UIL’s 2026–28 alignment places Kempner in eleven-man Class 5A Division II, District 11. The school publishes a Voss Road campus address and a detailed sports-medicine and parent injury-reporting resource.',
  theme: { accentHex: '#6B7189', label: 'Independent TexasDefined editorial accent, not licensed Cougars art or a school color certification.' },
  seo: {
    title: 'Fort Bend Kempner Cougars Football | 2026 UIL & Visitor Guide',
    description: 'Kempner Cougars 5A Division II District 11, official Sugar Land campus, sports-medicine contacts and Fort Bend ISD game-day sources.'
  },
  campus: { address: '14777 Voss Road, Sugar Land, TX 77498', sourceUrl: 'https://khs.fortbendisd.gov/', sourceLabel: 'I. H. Kempner High School official campus and contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Fort Bend ISD’s current varsity schedule and the specific game host', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule', verifiedAt: '2026-11-13' },
  notice: {
    title: 'School sports medicine is not the stadium visitor desk',
    body: 'Kempner High School lists 14777 Voss Road and 281-634-2300. Its sports-medicine page lists a separate training-room number, 281-634-2363, for student-athlete injury reporting. That is not a football ticket line or stadium accessibility contact; confirm actual host stadium, admission and parking with Fort Bend ISD athletics.',
    sourceUrl: 'https://khs.fortbendisd.gov/athletics/sports-medicine',
    sourceLabel: 'Official Kempner High School sports-medicine guidance',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The official UIL 2026–28 alphabetical alignment assigns Fort Bend Kempner to Class 5A Division II District 11 for eleven-man football. Third-party sites may label the division differently; the governing UIL alignment controls.',
    'I. H. Kempner High School lists 14777 Voss Road, Sugar Land TX 77498, telephone 281-634-2300 and principal Reginald Brown. The current school contact differs from old third-party postal ZIP variants.',
    'Kempner’s official sports-medicine page explains its concussion return-to-play process and gives the student-athlete training room telephone 281-634-2363. This resource is for athlete medical coordination, not public ticketing or stadium gate directions.',
    'The Fort Bend ISD athletics schedule lists a November 6 Kempner at Lamar varsity fixture at Traylor, demonstrating that school campus and game stadium may differ. Confirm the exact host for every date.',
    'Third-party 2026 rosters list Troy DeGar as coach, but the first-party Kempner school pages checked do not confirm the current head-coach appointment; no unsupported coach title, score, ticket price or school-owned image is asserted.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL Class 5A Division II district', body: 'Kempner is in eleven-man 5A Division II District 11.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Kempner campus and school identity', body: 'Kempner High School lists 14777 Voss Road, Sugar Land TX 77498 and principal Reginald Brown.', sourceUrl: 'https://khs.fortbendisd.gov/', sourceLabel: 'Official Kempner High School site' },
    { date: '2026', title: 'School-published sports-medicine resources', body: 'The school publishes student-athlete injury reporting and concussion protocols; these are not public stadium visitor policies.', sourceUrl: 'https://khs.fortbendisd.gov/athletics/sports-medicine', sourceLabel: 'Kempner High School official sports-medicine guidance' }
  ],
  faq: [
    { question: 'Which UIL football district is Kempner in for 2026?', answer: 'Class 5A Division II District 11, according to the official UIL 2026–28 alignment.' },
    { question: 'Where is Kempner High School?', answer: '14777 Voss Road, Sugar Land TX 77498, telephone 281-634-2300.' },
    { question: 'Is the sports-medicine training room the ticket contact?', answer: 'No. The training-room number is for student-athlete injury reporting. Use the game host for tickets, parking and accessible entry.' },
    { question: 'Where can I verify the varsity football venue?', answer: 'Use Fort Bend ISD’s current varsity schedule and host event notice; not all games are played at the school campus.' }
  ]
};

export function getBatch018FortBendKempnerEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-kempner' ? KEMPNER : undefined;
}
