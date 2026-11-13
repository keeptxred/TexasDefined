import type { FootballProgramEditorial } from './program-editorial';

// Dulles Vikings: 2026 UIL 5A reclassification and first-party campus identity.
const DULLES: FootballProgramEditorial = {
  slug: 'fort-bend-dulles',
  intro: 'Fort Bend Dulles Vikings football represents John Foster Dulles High School in Sugar Land, Fort Bend County. The 2026–28 UIL alignment places Dulles in eleven-man Class 5A Division I, District 11 after competing in Class 6A in the prior cycle. The school is Fort Bend ISD’s historic 1959 flagship campus, not Dulles Middle School.',
  theme: { accentHex: '#62728A', label: 'Independent TexasDefined editorial accent; not a licensed Vikings logo or official team color.' },
  seo: {
    title: 'Fort Bend Dulles Vikings Football | 2026 UIL 5A & Campus Guide',
    description: 'Dulles Vikings 2026–28 5A Division I District 11, official Sugar Land high-school campus, classification change and game-day source links.'
  },
  campus: { address: '550 Dulles Avenue, Sugar Land, TX 77478', sourceUrl: 'https://dhs.fortbendisd.gov/', sourceLabel: 'John Foster Dulles High School official school site', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Fort Bend ISD’s current varsity football schedule for Dulles and actual host stadium', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity athletics calendar', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Dulles High and Dulles Middle are different campuses',
    body: 'Dulles High School is at 550 Dulles Avenue, Sugar Land TX 77478, phone 281-634-5600. Dulles Middle School has a different address and sub-varsity programs. Select the high-school varsity fixture in Fort Bend ISD’s calendar; confirm host stadium, tickets, parking and accessible entry.',
    sourceUrl: 'https://dhs.fortbendisd.gov/',
    sourceLabel: 'Official Dulles High School campus and contact',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Fort Bend Dulles in Class 5A Division I District 11 for eleven-man football. Do not carry forward the previous 6A district or treat conference realignment as a performance ranking.',
    'John Foster Dulles High School lists 550 Dulles Avenue, Sugar Land TX 77478 and telephone 281-634-5600. The school’s 2024–25 official profile describes it as Fort Bend ISD’s flagship high school, opened in 1959.',
    'Dulles High’s current administrative team identifies Corey Stewart as principal. His official biography mentions earlier middle-school football coaching; that does not make him the current varsity head coach.',
    'Third-party sources disagree on Dulles’s 2026 head football coach. The first-party school sources checked do not confirm a current appointment, so no coach is asserted here.',
    'The Fort Bend ISD varsity calendar is the source for event hosts and stadiums. A school address is not proof of a game-night gate, ticket price or accessible parking.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL Class 5A Division I assignment', body: 'Dulles is in 5A Division I District 11 for eleven-man football, distinct from its prior 6A alignment.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '1959', title: 'Fort Bend ISD flagship campus', body: 'The school’s official profile identifies Dulles as Fort Bend ISD’s flagship high school, opened in 1959.', sourceUrl: 'https://www.fortbendisd.com/cms/lib/TX01917858/Centricity/Domain/839/DHS%20profile%20July%202024.pdf', sourceLabel: 'Official Dulles High School campus profile' },
    { date: '2026–27', title: 'Current school administration', body: 'Dulles High School lists Corey Stewart as principal and provides a current campus administration directory.', sourceUrl: 'https://dhs.fortbendisd.gov/our-school', sourceLabel: 'Dulles High School official administration' }
  ],
  faq: [
    { question: 'Which UIL football district is Dulles in for 2026?', answer: 'Class 5A Division I District 11, according to UIL’s 2026–28 realignment.' },
    { question: 'Where is Dulles High School?', answer: '550 Dulles Avenue, Sugar Land TX 77478; do not confuse it with Dulles Middle School.' },
    { question: 'Who is the current Dulles varsity football coach?', answer: 'The first-party sources reviewed do not establish a current appointment. Confirm with Fort Bend ISD athletics rather than relying on inconsistent third-party lists.' },
    { question: 'Where do I verify game times and tickets?', answer: 'Use Fort Bend ISD’s varsity athletics calendar and the actual host’s game-day notice.' }
  ]
};

export function getBatch018FortBendDullesEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-dulles' ? DULLES : undefined;
}
