import type { FootballProgramEditorial } from './program-editorial';

// Batch018 cohort 2 Farwell: official UIL, district campus and dated neutral-site fixture.
const FARWELL: FootballProgramEditorial = {
  slug: 'farwell',
  intro: 'Farwell Steers football represents Farwell ISD in Parmer County. The 2026–28 UIL alignment places the Steers in eleven-man Class 2A Division I, District 2. The district’s November 4 announcement calls Farwell the designated home team for a November 13 bi-district playoff against Spearman, even though the game is scheduled at Happy State Bank Stadium in Canyon.',
  theme: { accentHex: '#52718A', label: 'Independent TexasDefined editorial accent; not an official school color, logo or licensed photo.' },
  seo: {
    title: 'Farwell Steers Football | 2026 UIL District & Canyon Playoff Guide',
    description: 'Farwell Steers 2A Division I District 2, official high school campus and school-announced November 13 neutral-site Spearman playoff travel details.'
  },
  campus: { address: '801 Avenue G, Farwell, TX 79325', sourceUrl: 'https://www.farwellschools.org/upload/page/0018/docs/Campus%20Improvement%20Plans/2025-26/2025%2026%20Farwell%20High%20School%20Campus%20Improvement%20Plan%208%2028%202025.pdf', sourceLabel: 'Farwell ISD high school campus improvement plan, physical address', verifiedAt: '2026-11-13' },
  schedule: { label: 'Consult Farwell ISD varsity football schedule and dated district news for updates', sourceUrl: 'https://www.farwellschools.org/', sourceLabel: 'Farwell ISD official athletics and football schedule links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'November 13 playoff: designated home team, but game in Canyon',
    body: 'Farwell ISD announced a 4 p.m. Friday, November 13 bi-district playoff against Spearman at Happy State Bank Stadium in Canyon. Farwell is the designated home team, but the stadium is not Farwell High School. The November 4 school notice lists $5 admission for all and accepts THSCA/district passes; it says more ticket-purchase details would follow. Verify the host’s current entry, parking and ticket instructions.',
    sourceUrl: 'https://www.farwellschools.org/page/article/1671',
    sourceLabel: 'Farwell ISD official November 4, 2026 playoff announcement',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The UIL 2026–28 alphabetical listing places Farwell in 2A Division I District 2 for eleven-man football. The alignment is not a schedule or a current win-loss record.',
    'Farwell High School’s campus improvement plan lists 801 Avenue G, Farwell TX 79325. Farwell ISD administration lists a different contact address, 805 Avenue G. Neither address is the venue for the announced November 13 playoff.',
    'On November 4, Farwell ISD announced a November 13, 4 p.m. bi-district game against Spearman at Happy State Bank Stadium in Canyon. Farwell is the designated home team despite playing outside Farwell; do not confuse home-team designation with home-campus location.',
    'The school notice says $5 admission for all, accepts THSCA and district passes, and announced 12:40 p.m. early dismissal. The announcement did not provide a final ticket checkout link, so check the actual host before traveling.',
    'Farwell ISD lists Derrick Shelton as athletic director, not explicitly as head football coach in the cited administration directory. Do not promote that title or assert a final playoff result without a new first-party source.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL district assignment', body: 'Farwell Steers are in Class 2A Division I District 2, eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical realignment' },
    { date: '2025–26', title: 'School campus identity', body: 'The Farwell ISD campus improvement plan identifies Farwell High School at 801 Avenue G; district administration uses 805 Avenue G.', sourceUrl: 'https://www.farwellschools.org/upload/page/0018/docs/Campus%20Improvement%20Plans/2025-26/2025%2026%20Farwell%20High%20School%20Campus%20Improvement%20Plan%208%2028%202025.pdf', sourceLabel: 'Official Farwell High School campus improvement plan' },
    { date: 'November 4, 2026', title: 'Bi-district travel announcement', body: 'Farwell ISD scheduled Spearman at 4 p.m. November 13 in Canyon, Farwell designated home team; $5 admission, THSCA/district passes accepted. No final result implied.', sourceUrl: 'https://www.farwellschools.org/page/article/1671', sourceLabel: 'Farwell ISD official playoff notice' }
  ],
  faq: [
    { question: 'What UIL district is Farwell in for 2026?', answer: 'Class 2A Division I District 2, eleven-man football, in the UIL 2026–28 alignment.' },
    { question: 'Where is Farwell High School?', answer: 'The official campus improvement plan lists 801 Avenue G, Farwell TX 79325; the district administrative office is separately listed at 805 Avenue G.' },
    { question: 'Where was the November 13 Farwell–Spearman playoff scheduled?', answer: 'Happy State Bank Stadium in Canyon, at 4 p.m., according to Farwell ISD’s November 4 announcement. Farwell was designated the home team; this is not a game result.' },
    { question: 'What tickets were announced?', answer: 'The school listed $5 admission for all and acceptance of THSCA/district passes, with further purchase details to follow. Verify the event host’s current link and rules.' }
  ]
};

export function getBatch018FarwellEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'farwell' ? FARWELL : undefined;
}
