import type { FootballProgramEditorial } from './program-editorial';

// Fort Bend Clements Rangers: dated district football reporting and separate stadium.
const CLEMENTS: FootballProgramEditorial = {
  slug: 'fort-bend-clements',
  intro: 'Fort Bend Clements Rangers football represents William P. Clements High School in Sugar Land, Fort Bend County. UIL assigns Clements to Class 6A District 21 for 2026–28. Fort Bend ISD’s October 2026 student reporting identifies Bobby Darnell as head football coach, and the district’s November varsity calendar lists a game at Mercer Stadium rather than the Clements campus.',
  theme: { accentHex: '#61748B', label: 'Independent TexasDefined editorial accent; not official Rangers colors or licensed school artwork.' },
  seo: {
    title: 'Fort Bend Clements Rangers Football | 2026 UIL & Stadium Guide',
    description: 'Clements Rangers 6A District 21, school-published coach Bobby Darnell, official Sugar Land campus and Mercer Stadium host verification.'
  },
  campus: { address: '4200 Elkins Dr., Sugar Land, TX 77479', sourceUrl: 'https://chs.fortbendisd.gov/', sourceLabel: 'William P. Clements High School official school contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use Fort Bend ISD The Bend varsity football schedule and current host notice', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official athletics varsity calendar', verifiedAt: '2026-11-13' },
  notice: {
    title: 'The school campus and Mercer Stadium are different venues',
    body: 'Clements High School lists 4200 Elkins Dr., Sugar Land, while Fort Bend ISD’s November 6 varsity calendar lists Bush at Clements at Mercer Stadium. Do not treat the campus address as a stadium gate. Confirm the current fixture, host, ticket link, parking and accessible entrance with Fort Bend ISD athletics.',
    sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules',
    sourceLabel: 'Official Fort Bend ISD varsity football schedule and venue',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alignment places Fort Bend Clements in eleven-man Class 6A District 21. District assignment is not a season record or a statement of wins.',
    'William P. Clements High School lists 4200 Elkins Dr., Sugar Land TX 77479, telephone 281-634-2150 and principal Tara Baker. Fort Bend ISD’s campus directory writes Elkins Road; both refer to the same school contact, not an automatic stadium gate.',
    'Fort Bend ISD published an October 22, 2026 student-written feature on Clements football player Lamar Lewis, explicitly quoting head coach Bobby Darnell. This is a dated first-party coaching attribution, not a stale third-party roster.',
    'The district’s November 6 varsity calendar identifies Bush at Clements at Mercer Stadium. The named stadium is separate from the school’s Elkins Drive address; verify the host’s current ticket and access rules.',
    'No unsupported game score, ticket price, parking guarantee, photo reuse rights or general claim that all Clements home games use the same venue is made.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL Class 6A district', body: 'Fort Bend Clements is in Class 6A District 21.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: 'October 22, 2026', title: 'District-published football coach attribution', body: 'Fort Bend ISD student journalism names Bobby Darnell as Clements head football coach in a player feature.', sourceUrl: 'https://www.fortbendisd.gov/our-district/around-the-bend/details/~board/around-the-bend/post/student-storytellers-the-faith-family-and-focus-behind-lamar-lewis', sourceLabel: 'Official Fort Bend ISD October 2026 student-written feature' },
    { date: 'November 6, 2026', title: 'Mercer Stadium varsity fixture', body: 'The district varsity calendar lists Bush at Clements at Mercer Stadium; a dated venue notice, not a permanent school stadium assertion.', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule' }
  ],
  faq: [
    { question: 'What UIL district is Fort Bend Clements in for 2026?', answer: 'Class 6A District 21 in the 2026–28 UIL alignment.' },
    { question: 'Who is the school-documented head football coach?', answer: 'Fort Bend ISD’s October 22, 2026 student feature identifies Bobby Darnell as head coach. Recheck school athletics for changes.' },
    { question: 'Where is Clements High School?', answer: '4200 Elkins Dr., Sugar Land TX 77479. The district campus directory also calls the road Elkins Road.' },
    { question: 'Was the November 6 Bush–Clements game at the campus?', answer: 'No. The official Fort Bend ISD varsity schedule lists Mercer Stadium. Confirm the event host’s actual ticket and gate instructions.' }
  ],
  coach: {
    name: 'Bobby Darnell',
    title: 'Head football coach identified in district-published October 2026 reporting',
    sourceUrl: 'https://www.fortbendisd.gov/our-district/around-the-bend/details/~board/around-the-bend/post/student-storytellers-the-faith-family-and-focus-behind-lamar-lewis',
    sourceLabel: 'Fort Bend ISD official October 22, 2026 school football feature',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FortBendClementsEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-clements' ? CLEMENTS : undefined;
}
