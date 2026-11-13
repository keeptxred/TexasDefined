import type { FootballProgramEditorial } from './program-editorial';

// Florence: official high-school contact, current staff directory, UIL 2026–28.
const FLORENCE: FootballProgramEditorial = {
  slug: 'florence',
  intro: 'Florence Buffaloes football represents Florence ISD in Williamson County. UIL places Florence in eleven-man Class 3A Division II, District 13 for 2026–28. The high school publishes its FM 970 campus contact and identifies Quentin Posey as athletic director and head football coach.',
  theme: { accentHex: '#5C7284', label: 'Independent TexasDefined editorial accent, not a school mark, licensed Buffaloes photo or official team color.' },
  seo: {
    title: 'Florence Buffaloes Football | 2026 UIL District, Coach & Campus',
    description: 'Florence Buffaloes 3A Division II District 13, official high school campus and coach Quentin Posey, school contacts and visitor verification.'
  },
  campus: { address: '401 FM 970, Florence, TX 76527', sourceUrl: 'https://www.florenceisd.net/o/fhs/page/florence-high-school-links/', sourceLabel: 'Florence High School official campus and phone', verifiedAt: '2026-11-13' },
  schedule: { label: 'Confirm the current football fixture with Florence ISD athletics and the event host', sourceUrl: 'https://www.florenceisd.net/o/fhs/', sourceLabel: 'Florence High School official athletics and school notices', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Do not substitute the district administration address',
    body: 'Florence High School lists 401 FM 970, phone 254-793-2495. Florence ISD administration lists 306 College Avenue, a separate office. Confirm the football host stadium, gate, tickets and accessible parking for the actual fixture before traveling.',
    sourceUrl: 'https://www.florenceisd.net/o/fhs/page/florence-high-school-links/',
    sourceLabel: 'Florence High School official campus contact',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The 2026–28 UIL alphabetical alignment assigns Florence to 3A Division II District 13, eleven-man football. District placement does not establish the team’s 2026 results or standing.',
    'Florence High School lists 401 FM 970, Florence TX 76527, telephone 254-793-2495. The state school report card independently confirms that physical campus address.',
    'Florence High School’s official staff directory lists Quentin Posey as athletic director/head football coach and Russell Porterfield as principal. Do not confuse the coach’s school title with an unrelated Florence athletics listing.',
    'The district administrative office is listed at 306 College Avenue, separate from the high school campus. A school address alone is not proof of an event’s stadium entrance or parking conditions.',
    'No unsourced final score, 2026 winning record, ticket price, accessibility guarantee or rights to reproduce school-owned photography is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL football classification', body: 'Florence is in eleven-man Class 3A Division II District 13.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '2026', title: 'High school campus and contact', body: 'Florence High School lists 401 FM 970, Florence TX 76527 and 254-793-2495.', sourceUrl: 'https://www.florenceisd.net/o/fhs/page/florence-high-school-links/', sourceLabel: 'Florence High School official campus directory' },
    { date: '2026', title: 'School-listed athletics director and head coach', body: 'The high school staff directory identifies Quentin Posey as athletic director and head football coach.', sourceUrl: 'https://www.florenceisd.net/o/fhs/staff?page_no=4', sourceLabel: 'Florence High School official staff directory' }
  ],
  faq: [
    { question: 'Which UIL district is Florence in for 2026?', answer: 'Class 3A Division II District 13 for eleven-man football, according to the UIL 2026–28 alignment.' },
    { question: 'Where is Florence High School?', answer: '401 FM 970, Florence TX 76527. District administration is at 306 College Avenue, a different address.' },
    { question: 'Who does Florence High School list as head football coach?', answer: 'The official staff directory lists Quentin Posey as athletic director/head football coach. Recheck the school for changes.' },
    { question: 'Where should football visitors go?', answer: 'Check the current event host’s stadium, ticket and accessibility information. The high-school campus contact is not a verified gate for every game.' }
  ],
  coach: {
    name: 'Quentin Posey',
    title: 'School-listed athletic director and head football coach',
    sourceUrl: 'https://www.florenceisd.net/o/fhs/staff?page_no=4',
    sourceLabel: 'Florence High School official staff directory',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FlorenceEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'florence' ? FLORENCE : undefined;
}
