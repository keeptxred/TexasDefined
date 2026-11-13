import type { FootballProgramEditorial } from './program-editorial';

// Batch018: first individually sourced Fabens guide. NOT production certified.
const FABENS: FootballProgramEditorial = {
  slug: 'fabens',
  intro: 'Fabens Wildcats represent Fabens ISD in El Paso County. The UIL 2026–28 football alignment places Fabens in Class 4A Division II, District 1. Fabens High School lists its campus on NE G Avenue, while the district athletics office publishes a separate NE 4th Street contact address. Neither address establishes the stadium entrance for a particular game.',
  theme: { accentHex: '#356778', label: 'Original independent TexasDefined accent; not a school color or licensed mascot.' },
  seo: {
    title: 'Fabens Wildcats Football | UIL District, Campus & Game-Day Sources',
    description: 'Fabens Wildcats 2026–28 UIL 4A Division II District 1, school campus and athletics-office contacts, official sources and game-day verification.'
  },
  campus: {
    address: '601 NE G Avenue, Fabens, TX 79838',
    sourceUrl: 'https://fhs.fabensisd.net/',
    sourceLabel: 'Fabens High School official campus contact',
    verifiedAt: '2026-11-13'
  },
  schedule: {
    label: 'Check Fabens ISD athletics and the actual event host for the latest varsity fixture',
    sourceUrl: 'https://www.fabensisd.net/departments/athletics/wildcats',
    sourceLabel: 'Fabens ISD official athletics department',
    verifiedAt: '2026-11-13'
  },
  notice: {
    title: 'Campus and athletics-office addresses are different',
    body: 'The high school lists 601 NE G Avenue; Fabens ISD athletics lists 600 NE 4th Street and (915) 765-2634. Neither contact address verifies a game-night stadium gate, ticket entrance, parking or accessible entry. Ask the actual host before traveling.',
    sourceUrl: 'https://www.fabensisd.net/departments/athletics/wildcats',
    sourceLabel: 'Fabens ISD athletics office address and phone',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'Fabens competes in the 2026–28 UIL 4A Division II District 1 grouping with Clint, Clint Mountain View, El Paso Bowie and El Paso Irvin. The alignment names peers, not completed game results or host stadiums.',
    'Fabens High School is the school campus at 601 NE G Avenue. The district athletics office gives 600 NE 4th Street, phone (915) 765-2634. Keep those locations distinct when planning a visit.',
    'Fabens ISD is an El Paso County school district. The Wildcats are not El Paso ISD Bowie or Irvin, even though UIL places them in the same football district.',
    'For a specific game, verify varsity versus junior varsity, kickoff, venue, admission and accessibility with Fabens ISD athletics and the actual host. A third-party schedule alone is not a first-party event confirmation.',
    'No unverified current coach, 2026 score, season record, stadium gate, accessible parking guarantee or licensed school photo is asserted.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL football classification', body: 'Fabens is in 4A Division II District 1 with Clint, Clint Mountain View, El Paso Bowie and El Paso Irvin.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/4AD2FB2026.pdf', sourceLabel: 'Official UIL 2026–28 football alignment' },
    { date: '2026', title: 'Official campus contact', body: 'Fabens High School lists 601 NE G Avenue, Fabens, TX 79838. A campus address does not prove a stadium gate.', sourceUrl: 'https://fhs.fabensisd.net/', sourceLabel: 'Fabens High School' },
    { date: '2026', title: 'Separate athletics contact', body: 'Fabens ISD athletics lists 600 NE 4th Street and (915) 765-2634. Verify the host venue before attending.', sourceUrl: 'https://www.fabensisd.net/departments/athletics/wildcats', sourceLabel: 'Fabens ISD athletics' }
  ],
  faq: [
    { question: 'What UIL district is Fabens in for 2026?', answer: 'Class 4A Division II, District 1, according to the official 2026–28 UIL alignment. Check UIL for subsequent amendments.' },
    { question: 'Where is Fabens High School?', answer: 'The school lists 601 NE G Avenue, Fabens, TX 79838. This is the campus contact, not a verified stadium entrance.' },
    { question: 'Why does Fabens athletics have a different address?', answer: 'Fabens ISD athletics lists 600 NE 4th Street. The district publishes it as an athletics-office contact, not proof of the location of each game.' },
    { question: 'How do I check tickets and kickoff?', answer: 'Start with the Fabens ISD athletics page and confirm the specific fixture, host, stadium, admission and accessibility before traveling.' }
  ]
};

export function getBatch018FirstFabensEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fabens' ? FABENS : undefined;
}
