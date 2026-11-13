import type { FootballProgramEditorial } from './program-editorial';

// Forsan Buffaloes: 2025 official appointment and 2026–28 UIL, not third-party scores.
const FORSAN: FootballProgramEditorial = {
  slug: 'forsan',
  intro: 'Forsan Buffaloes football represents Forsan ISD in Howard County. UIL assigns Forsan to eleven-man Class 2A Division I, District 4 for 2026–28. Forsan ISD announced Casey Thompson as its athletic director and head football coach on February 26, 2025, and the current district staff directory continues to list him in both roles.',
  theme: { accentHex: '#5B7183', label: 'Independent TexasDefined editorial accent; not official Buffaloes colors or licensed school art.' },
  seo: {
    title: 'Forsan Buffaloes Football | 2026 UIL District, Coach & Campus',
    description: 'Forsan Buffaloes 2A Division I District 4, official 2025 Casey Thompson appointment, campus, and athletics visitor sources.'
  },
  campus: { address: '411 West 6th St, Forsan, TX 79733', sourceUrl: 'https://www.forsan.esc18.net/', sourceLabel: 'Forsan ISD official school contact address', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Forsan ISD official varsity football notices and event-host details', sourceUrl: 'https://www.forsan.esc18.net/athletics', sourceLabel: 'Forsan ISD official athletics and football links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'School campus contact is not a verified stadium gate',
    body: 'Forsan ISD lists 411 West 6th St, Forsan TX 79733 and 432-457-2223. Its athletics site lists football among several sports and distinguishes medical/eligibility forms. Confirm the specific varsity fixture, host, kickoff, tickets and accessible entrance before travel.',
    sourceUrl: 'https://www.forsan.esc18.net/athletics',
    sourceLabel: 'Forsan ISD official athletics portal',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Forsan in Class 2A Division I District 4 for eleven-man football. This is the competition assignment, not a 2026 score or current standing.',
    'Forsan ISD lists 411 West 6th St, Forsan TX 79733 and telephone 432-457-2223. The district operates the Forsan junior-high/high-school campus; do not infer a stadium entrance from the school office.',
    'On February 26, 2025, Forsan ISD announced Casey Thompson as its new athletic director/head football coach. The current school staff directory confirms that same role; older school handbooks can list different staff.',
    'The official athletics portal links football and athletic forms, but game-day tickets, stadium parking and accessibility remain host-specific.',
    'No third-party 2026 result, unverified playoff stadium, ticket price or school-owned image is reproduced.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL football district', body: 'Forsan is in eleven-man Class 2A Division I District 4.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: 'February 26, 2025', title: 'District-appointed football coach', body: 'Forsan ISD announced Casey Thompson as athletic director and head football coach.', sourceUrl: 'https://www.forsan.esc18.net/article/2051772', sourceLabel: 'Official Forsan ISD coaching announcement' },
    { date: '2026', title: 'Current school staff listing', body: 'The district staff directory lists Casey Thompson as athletic director/head football coach.', sourceUrl: 'https://www.forsan.esc18.net/staff?page_no=5', sourceLabel: 'Forsan ISD official staff directory' }
  ],
  faq: [
    { question: 'What UIL district is Forsan in for 2026?', answer: 'Class 2A Division I District 4, eleven-man football, in the official 2026–28 UIL alignment.' },
    { question: 'Who coaches Forsan football?', answer: 'Forsan ISD appointed Casey Thompson in February 2025 and continues to list him as athletic director/head football coach.' },
    { question: 'Where is Forsan ISD?', answer: 'The district lists 411 West 6th St, Forsan TX 79733. Verify the actual football venue and gate with the host.' },
    { question: 'Where can I check the current varsity schedule?', answer: 'Use Forsan ISD athletics and verify the specific game host for kickoff, tickets, parking and accessibility.' }
  ],
  coach: {
    name: 'Casey Thompson',
    title: 'School-listed athletic director and head football coach',
    sourceUrl: 'https://www.forsan.esc18.net/article/2051772',
    sourceLabel: 'Forsan ISD official February 2025 coaching appointment',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018ForsanEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'forsan' ? FORSAN : undefined;
}
