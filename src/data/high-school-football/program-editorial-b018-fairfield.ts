import type { FootballProgramEditorial } from './program-editorial';

// Independently sourced Fairfield Eagles guide; no inferred playoff result.
const FAIRFIELD: FootballProgramEditorial = {
  slug: 'fairfield',
  intro: 'Fairfield Eagles football represents Fairfield ISD in Freestone County. UIL places Fairfield in Class 3A Division I, District 9 for 2026–28. The school lists 631 Post Oak Road as its campus, while the school athletics program published a separate November 13 bi-district playoff trip to Willis: the campus is not the game venue.',
  theme: { accentHex: '#577184', label: 'Original TexasDefined editorial accent, not a licensed Eagles logo or school color certification.' },
  seo: {
    title: 'Fairfield Eagles Football | 2026 UIL District & Playoff Visitor Guide',
    description: 'Fairfield Eagles 2026 UIL 3A Division I District 9, official campus and dated playoff visitor instructions, venue and ticket sources.'
  },
  campus: { address: '631 Post Oak Road, Fairfield, TX 75840', sourceUrl: 'https://fairfieldisd.net/fairfieldhighschool', sourceLabel: 'Fairfield ISD official high school campus directory', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use the official Fairfield Eagles football page for current fixtures, announcements and tickets', sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/', sourceLabel: 'Fairfield Eagles official athletics football announcements', verifiedAt: '2026-11-13' },
  notice: {
    title: 'November 13 playoff: the school is the visitor in Willis',
    body: 'Fairfield athletics announced a Friday, November 13, 2026, 7 p.m. bi-district game against East Chambers at Berton A. Yates Stadium in Willis, with Fairfield designated the visiting team. The November 9 notice lists online admission ($8 adults, $5 students), a clear-bag policy and metal detectors. Confirm updates with the actual host before departure. This is an announced fixture, not a final score.',
    sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/',
    sourceLabel: 'Fairfield Eagles official November 9, 2026 bi-district visitor notice',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The 2026–28 UIL 3A Division I District 9 groups Fairfield with Crockett, Diboll, Huntington, Palestine Westwood and Trinity. The alignment establishes district peers, not a 2026 season record.',
    'Fairfield High School lists its campus at 631 Post Oak Road, Fairfield, TX 75840, telephone (903) 389-4177. That address is a school contact, not a guarantee of where football games are played.',
    'The Fairfield athletics page published a November 9 notice for a November 13 bi-district playoff against East Chambers at Berton A. Yates Stadium in Willis. Fairfield is the visitor; do not navigate to the Fairfield school campus expecting that game.',
    'For the announced Willis fixture, the school lists online tickets, $8 adult/$5 student admission, a clear-bag policy and metal detectors. Policies, kickoff and venue are specific to this notice and may change; check the host before traveling.',
    'The November 13 playoff is an announced future event as of this editorial verification, not a completed result. No unsourced final score, current coach, stadium entrance, parking guarantee or licensed school photo is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL district alignment', body: 'Fairfield is in 3A Division I District 9 with Crockett, Diboll, Huntington, Palestine Westwood and Trinity.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf', sourceLabel: 'Official UIL 2026–28 3A Division I football alignment' },
    { date: '2026', title: 'Official high-school campus', body: 'Fairfield High School lists 631 Post Oak Road, Fairfield, TX 75840, telephone (903) 389-4177.', sourceUrl: 'https://fairfieldisd.net/fairfieldhighschool', sourceLabel: 'Fairfield ISD high school directory' },
    { date: 'November 9, 2026', title: 'School-published playoff travel notice', body: 'Fairfield announced a November 13, 7 p.m. bi-district game versus East Chambers in Willis, with Fairfield as visitor and event-specific ticket and security rules.', sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/', sourceLabel: 'Fairfield Eagles football official announcement' }
  ],
  faq: [
    { question: 'What UIL district is Fairfield in for 2026?', answer: '3A Division I District 9, according to the official UIL 2026–28 alignment.' },
    { question: 'Where is Fairfield High School?', answer: '631 Post Oak Road, Fairfield, Texas 75840. The campus address does not establish the venue for every football game.' },
    { question: 'Where was Fairfield scheduled to play East Chambers on November 13?', answer: 'The school announced Berton A. Yates Stadium in Willis, with Fairfield as the visiting team. Confirm any changes with the game host.' },
    { question: 'What are the published ticket and entry rules for the November 13 playoff?', answer: 'Fairfield’s November 9 announcement listed online tickets, $8 adult and $5 student admission, a clear-bag policy and metal detectors. Those details are specific to the announced fixture.' }
  ]
};

export function getBatch018FairfieldEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fairfield' ? FAIRFIELD : undefined;
}
