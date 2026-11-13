import type { FootballProgramEditorial } from './program-editorial';

// Forestburg: school explicitly says six-man athletic complex is off-campus.
const FORESTBURG: FootballProgramEditorial = {
  slug: 'forestburg',
  intro: 'Forestburg Longhorns football represents Forestburg ISD in Montague County. UIL assigns the program to Class 1A Division II six-man District 10 for 2026–28. The school explicitly says its six-man football athletic complex is off the main campus, so the school address is not a verified stadium entrance.',
  theme: { accentHex: '#77634B', label: 'Original independent TexasDefined accent, not a licensed Longhorn mark or school color.' },
  seo: {
    title: 'Forestburg Longhorns Six-Man Football | UIL & Visitor Guide',
    description: 'Forestburg Longhorns six-man 1A Division II District 10, school-campus versus off-site athletic complex, official coach and visitor sources.'
  },
  campus: { address: '16346 FM 455, Forestburg, TX 76239', sourceUrl: 'https://forestburgisd.net/', sourceLabel: 'Forestburg ISD official school contact and campus', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Forestburg ISD athletics and the actual six-man game host for current fixtures', sourceUrl: 'https://www.forestburgisd.net/about-fisd', sourceLabel: 'Forestburg ISD official school and six-man athletics overview', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Six-man stadium complex is separate from the school',
    body: 'Forestburg ISD describes its Pre-K–12 school as one main building at 16346 FM 455 and says the athletic complex for six-man football games is located off the school site. Do not navigate to the school office assuming it is the football gate; confirm the actual complex address, parking and accessible entry with the game host.',
    sourceUrl: 'https://www.forestburgisd.net/about-fisd',
    sourceLabel: 'Forestburg ISD official facilities and six-man football description',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The official UIL 2026–28 1A Division II six-man District 10 includes Forestburg, Bowie Gold-Burg, Harrold, Throckmorton and Woodson. This is six-man football, not eleven-man play.',
    'Forestburg ISD lists 16346 FM 455, Forestburg TX 76239, telephone 940-964-2323. The school describes a single Pre-K–12 academic building and a separate off-site six-man football athletic complex.',
    'The school identifies Cori Hayes as athletic director on its About FISD page. That title alone does not establish a current head football coach, so no head-coach appointment is invented.',
    'The school publishes a 2026–27 athletics handbook and forms; visitors should check the actual game host for kickoff, venue, admission, parking and accessibility.',
    'A news report in October 2026 described hog damage to a junior-high practice field. This does not establish any restriction on varsity stadium access or cancellation, and no such inference is made.',
    'No fabricated game results, off-site stadium street address, parking promise, unlicensed school photo or coach title is asserted.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL six-man football district', body: 'Forestburg is in 1A Division II six-man District 10 with Bowie Gold-Burg, Harrold, Throckmorton and Woodson.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf', sourceLabel: 'Official UIL 2026–28 six-man alignment' },
    { date: '2026', title: 'Off-campus football complex', body: 'Forestburg ISD states that its six-man football athletic complex is off the main school site.', sourceUrl: 'https://www.forestburgisd.net/about-fisd', sourceLabel: 'Forestburg ISD official facilities description' },
    { date: '2026–27', title: 'Current athletic handbook', body: 'The district lists its 2026–27 athletic handbook and forms; confirm actual host visitor policies separately.', sourceUrl: 'https://forestburgisd.net/athletic-handbooks-and-forms', sourceLabel: 'Forestburg ISD official athletics forms' }
  ],
  faq: [
    { question: 'Does Forestburg play six-man football?', answer: 'Yes. UIL places Forestburg in 1A Division II six-man District 10 for 2026–28.' },
    { question: 'Is the football stadium at the school campus?', answer: 'The school says its six-man football athletic complex is off the school site. Confirm the current game entrance with the host.' },
    { question: 'Where is Forestburg ISD?', answer: 'The district lists 16346 FM 455, Forestburg TX 76239. That is the school contact, not a verified stadium gate.' },
    { question: 'Who is the current head football coach?', answer: 'Forestburg ISD names Cori Hayes as athletic director but the cited page does not confirm a current head-coach appointment. Ask the school for the latest football staff.' }
  ]
};

export function getBatch018ForestburgEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'forestburg' ? FORESTBURG : undefined;
}
