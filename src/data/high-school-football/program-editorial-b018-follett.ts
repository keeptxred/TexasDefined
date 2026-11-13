import type { FootballProgramEditorial } from './program-editorial';

// Follett Panthers: six-man football, never an eleven-man opponent table.
const FOLLETT: FootballProgramEditorial = {
  slug: 'follett',
  intro: 'Follett Panthers football is a Lipscomb County six-man program. UIL assigns Follett to Class 1A Division II six-man District 1 for 2026–28, with Groom, Hedley, Lefors, McLean and Miami. The district’s athletics page distinguishes varsity and junior-high football schedules and provides a local school contact.',
  theme: { accentHex: '#617F74', label: 'Independent TexasDefined editorial accent; no school-owned Panther mark or licensed photograph.' },
  seo: {
    title: 'Follett Panthers Six-Man Football | 2026 UIL District & Visitor Guide',
    description: 'Follett Panthers 1A Division II six-man District 1, official school contact, football schedule and verified UIL district peers.'
  },
  campus: { address: '205 E Ivanhoe Ave, Follett, TX 79034', sourceUrl: 'https://www.follettisd.net/page/contact', sourceLabel: 'Follett ISD official contact address and phone', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use the Follett ISD varsity football schedule, not the separate junior-high schedule', sourceUrl: 'https://www.follettisd.net/page/athletics', sourceLabel: 'Follett ISD official athletics and football schedule links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Six-man fixtures require their own host verification',
    body: 'Follett ISD publishes separate varsity/JV and junior-high football schedule links and lists its school contact at 205 E Ivanhoe Ave, telephone 806-653-2301. Confirm the specific six-man game host, kickoff, stadium, admission and accessible entry rather than assuming the district office is the stadium gate.',
    sourceUrl: 'https://www.follettisd.net/page/athletics',
    sourceLabel: 'Follett ISD official athletics schedule directory',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 Class 1A Division II alignment places Follett in six-man District 1 with Groom, Hedley, Lefors, McLean and Miami. These are six-man district peers, not eleven-man opponents.',
    'Follett ISD lists 205 E Ivanhoe Ave, Follett TX 79034, telephone 806-653-2301. This contact address alone does not prove the entrance to a particular game.',
    'The school athletics page separately lists varsity/JV football and junior-high football. Verify the varsity six-man schedule rather than importing junior-high dates or an unsourced third-party score.',
    'The school staff directory lists Tad Smith as athletic director. It does not establish that he is the current head football coach; older and third-party coaching lists have changed, so a first-party current appointment is needed before naming one.',
    'No fabricated 2026 score, school logo rights, universal accessibility condition, stadium gate or unsupported coaching attribution is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL six-man alignment', body: 'Follett is in 1A Division II six-man District 1 with Groom, Hedley, Lefors, McLean and Miami.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf', sourceLabel: 'UIL official 2026–28 1A Division II six-man alignment' },
    { date: '2026', title: 'District campus contact', body: 'Follett ISD lists 205 E Ivanhoe Ave and 806-653-2301.', sourceUrl: 'https://www.follettisd.net/page/contact', sourceLabel: 'Official Follett ISD contact page' },
    { date: '2026', title: 'Separate varsity and junior-high schedules', body: 'Follett ISD athletics links varsity/JV and junior-high football schedules separately.', sourceUrl: 'https://www.follettisd.net/page/athletics', sourceLabel: 'Official Follett ISD athletics' }
  ],
  faq: [
    { question: 'Does Follett play six-man football?', answer: 'Yes. UIL lists Follett in Class 1A Division II six-man District 1 for 2026–28.' },
    { question: 'Which schools share Follett’s district?', answer: 'Groom, Hedley, Lefors, McLean and Miami in the official six-man District 1 alignment.' },
    { question: 'Where is Follett ISD?', answer: 'The district lists 205 E Ivanhoe Ave, Follett TX 79034. Verify the specific game venue and stadium gate with the host.' },
    { question: 'Who is Follett’s current head football coach?', answer: 'The school staff directory lists Tad Smith as athletic director, but does not establish a current head football coach. Check the school for an updated appointment.' }
  ]
};

export function getBatch018FollettEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'follett' ? FOLLETT : undefined;
}
