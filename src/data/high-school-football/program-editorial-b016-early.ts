import type { FootballProgramEditorial } from './program-editorial';

// Batch016 source-authored Early guide. Not a production Chrome certificate.
const EARLY: FootballProgramEditorial = {
  slug: 'early',
  intro: 'Early High School is in Brown County, but its campus address is not a verified football stadium entrance. The UIL 2026–28 realignment places Early in Conference 3A Division I, District 3, while Early ISD publishes current football schedules and tickets through its athletics department.',
  theme: { accentHex: '#476781', label: 'Original TexasDefined editorial accent; not an official school color, logo or photograph.' },
  seo: {
    title: 'Early High School Football | UIL District 3 & Official Game Resources',
    description: 'Early High football visitor guide: UIL 3A Division I District 3 opponents, official campus address, district schedule and ticket sources, and game-day verification tips.'
  },
  campus: {
    address: '115 Sudderth Dr, Early, TX 76802',
    sourceUrl: 'https://high.earlyisd.net/',
    sourceLabel: 'Early High School official campus contact',
    verifiedAt: '2026-11-08'
  },
  schedule: {
    label: 'Check Early ISD football schedule, ticketing and athletics notices',
    sourceUrl: 'https://www.earlyisd.net/athletics',
    sourceLabel: 'Official Early ISD athletics schedule and ticketing directory',
    verifiedAt: '2026-11-08'
  },
  notice: {
    title: 'Confirm the actual host venue before traveling',
    body: '115 Sudderth Drive is the high school campus address, not an independently verified stadium entrance. Use the specific game listing or host school notice for venue, admission and accessibility information.',
    sourceUrl: 'https://high.earlyisd.net/',
    sourceLabel: 'Official campus address; stadium gate not established',
    verifiedAt: '2026-11-08'
  },
  overview: [
    'Early High School identifies its campus at 115 Sudderth Drive in Early, Brown County. That is a useful school contact location, but it should not be substituted for a game-specific stadium gate or visitor parking entrance.',
    'UIL’s 2026–28 Conference 3A Division I football alignment lists Early in District 3 alongside Ingram Moore, Llano, San Angelo Texas Leadership and Wall. This is an alignment, not a claim that any particular fixture has been played.',
    'Early ISD operates an athletics page linking to its football schedule and ticketing information. Check the date, host, kickoff and venue there before making plans; an opponent’s campus is not necessarily the event venue.',
    'Early ISD’s athletics contact lists Marvin Wilson as athletic director. That administrative role is not evidence of a current head-football-coach appointment.',
    'This guide does not infer 2026 wins, losses, standings, admission prices, parking or accessibility policies, or image rights from incomplete sources.'
  ],
  milestones: [
    {
      date: '2026–28',
      title: 'UIL 3A Division I, District 3 alignment',
      body: 'Early is grouped with Ingram Moore, Llano, San Angelo Texas Leadership and Wall in the UIL alignment. Check UIL for later amendments.',
      sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/3AD1FB2026.pdf',
      sourceLabel: 'UIL official football district alignment'
    },
    {
      date: '2026',
      title: 'Official school campus address',
      body: 'Early High School publishes 115 Sudderth Dr, Early, TX 76802 as its campus contact address, not as a football spectator gate.',
      sourceUrl: 'https://high.earlyisd.net/',
      sourceLabel: 'Early High School official site'
    },
    {
      date: '2026',
      title: 'Official athletics information',
      body: 'Early ISD provides football schedules and ticketing links and identifies Marvin Wilson as athletic director; neither listing alone proves a particular game venue or head coach.',
      sourceUrl: 'https://www.earlyisd.net/athletics',
      sourceLabel: 'Early ISD athletics'
    }
  ],
  faq: [
    { question: 'Which football district is Early in for 2026?', answer: 'UIL places Early in Conference 3A Division I, District 3 with Ingram Moore, Llano, San Angelo Texas Leadership and Wall. Consult the UIL alignment for revisions.' },
    { question: 'Where is Early High School?', answer: 'The official campus contact address is 115 Sudderth Dr, Early, TX 76802. Confirm the game venue separately.' },
    { question: 'Where can I find Early football schedules and tickets?', answer: 'Use the Early ISD athletics directory at https://www.earlyisd.net/athletics and verify the host event before traveling.' },
    { question: 'Does the campus address identify the stadium entrance?', answer: 'No. The campus contact address does not independently establish a stadium gate, parking or accessibility route.' }
  ]
};

export function getBatch016EarlyEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'early' ? EARLY : undefined;
}
