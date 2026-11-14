import type { FootballProgramEditorial } from './program-editorial';

// Fairfield Eagles guide: source-verified November 13 playoff final (school athletics, November 14).
const FAIRFIELD: FootballProgramEditorial = {
  slug: 'fairfield',
  intro: 'Fairfield Eagles football represents Fairfield ISD in Freestone County. UIL places Fairfield in Class 3A Division I, District 9 for 2026–28. The school lists 631 Post Oak Road as its campus, while the November 13 bi-district playoff was played at a separate Willis stadium. Fairfield athletics now reports the Eagles fell 39–64 to East Chambers, an official posted final rather than an inferred result.',
  theme: { accentHex: '#577184', label: 'Original TexasDefined editorial accent, not a licensed Eagles logo or school color certification.' },
  seo: {
    title: 'Fairfield Eagles Football | 2026 UIL District & Playoff Visitor Guide',
    description: 'Fairfield Eagles UIL 3A Division I District 9, official 2026 playoff final versus East Chambers, Willis venue and school sources.'
  },
  campus: { address: '631 Post Oak Road, Fairfield, TX 75840', sourceUrl: 'https://fairfieldisd.net/fairfieldhighschool', sourceLabel: 'Fairfield ISD official high school campus directory', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Fairfield Eagles official football schedule for reported finals and future fixtures', sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/?tab=schedule', sourceLabel: 'Fairfield Eagles school athletics schedule and posted results', verifiedAt: '2026-11-14' },
  notice: {
    title: 'November 13 playoff final: Fairfield 39, East Chambers 64',
    body: 'The school’s own football schedule now records a 39–64 loss against East Chambers in the November 13, 2026 bi-district playoff at Berton A. Yates Stadium, Willis. Fairfield was the visiting team. Its November 9 pregame notice listed $8 adult/$5 student online admission, a clear-bag policy and metal detectors; those were historical rules for that fixture, not current ticketing advice for another event.',
    sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/?tab=schedule',
    sourceLabel: 'Fairfield Eagles athletics: November 13 official final and November 9 pregame notice',
    verifiedAt: '2026-11-14'
  },
  overview: [
    'The 2026–28 UIL 3A Division I District 9 groups Fairfield with Crockett, Diboll, Huntington, Palestine Westwood and Trinity. The alignment establishes district peers, not a 2026 season record.',
    'Fairfield High School lists its campus at 631 Post Oak Road, Fairfield, TX 75840, telephone (903) 389-4177. That address is a school contact, not a guarantee of where football games are played.',
    'Fairfield’s athletics page identifies the November 13 bi-district game against East Chambers at Berton A. Yates Stadium in Willis, not at the Fairfield school campus. Its official football schedule now marks the result as a 39–64 loss. The distinct Willis location explains why a campus-address map is not a reliable game-day route.',
    'The November 9 school notice supplied online ticketing, $8 adult/$5 student admission, a clear-bag policy and metal detectors for the Willis playoff. Those prices and security rules belong to a completed November 13 game; they do not establish admission or accessibility procedures for future Fairfield games.',
    'Fairfield’s 2026 playoff season ended with the school-posted November 13 final against East Chambers. For later seasons, distinguish the UIL realignment district from a new season’s standings, and consult the dated Fairfield athletics calendar for the actual game host and venue.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL district alignment', body: 'Fairfield is in 3A Division I District 9 with Crockett, Diboll, Huntington, Palestine Westwood and Trinity.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf', sourceLabel: 'Official UIL 2026–28 3A Division I football alignment' },
    { date: '2026', title: 'Official high-school campus', body: 'Fairfield High School lists 631 Post Oak Road, Fairfield, TX 75840, telephone (903) 389-4177.', sourceUrl: 'https://fairfieldisd.net/fairfieldhighschool', sourceLabel: 'Fairfield ISD high school directory' },
    { date: 'November 9, 2026', title: 'School-published playoff travel notice', body: 'Fairfield announced a November 13, 7 p.m. bi-district game versus East Chambers in Willis, with Fairfield as visitor and event-specific ticket and security rules.', sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/', sourceLabel: 'Fairfield Eagles football official announcement' },
    { date: 'November 13, 2026', title: 'Bi-district playoff final on the school schedule', body: 'Fairfield Eagles athletics records a 39–64 playoff loss versus East Chambers in Willis. A completed final is distinct from the November 9 pregame ticket notice.', sourceUrl: 'https://www.fairfieldeagles.net/sport/football/boys/?tab=schedule', sourceLabel: 'Fairfield Eagles first-party schedule and final result' }
  ],
  faq: [
    { question: 'What UIL district is Fairfield in for 2026?', answer: '3A Division I District 9, according to the official UIL 2026–28 alignment.' },
    { question: 'Where is Fairfield High School?', answer: '631 Post Oak Road, Fairfield, Texas 75840. The campus address does not establish the venue for every football game.' },
    { question: 'Where was Fairfield scheduled to play East Chambers on November 13?', answer: 'The school announced Berton A. Yates Stadium in Willis, with Fairfield as the visiting team. Confirm any changes with the game host.' },
    { question: 'What was the November 13 Fairfield–East Chambers playoff result?', answer: 'The Fairfield Eagles official athletics schedule records a 39–64 bi-district loss to East Chambers at Berton A. Yates Stadium in Willis on November 13, 2026.' },
    { question: 'What were the published ticket and entry rules for the November 13 playoff?', answer: 'Fairfield’s November 9 pregame announcement listed online tickets, $8 adult and $5 student admission, a clear-bag policy and metal detectors. Those historical rules are not a ticket quote for any upcoming game.' }
  ]
};

export function getBatch018FairfieldEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fairfield' ? FAIRFIELD : undefined;
}
