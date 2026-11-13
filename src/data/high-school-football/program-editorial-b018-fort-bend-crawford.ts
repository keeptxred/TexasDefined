import type { FootballProgramEditorial } from './program-editorial';

// Crawford Chargers: 2026 school-reported coach and first-week win, no guessed season record.
const CRAWFORD: FootballProgramEditorial = {
  slug: 'fort-bend-crawford',
  intro: 'Fort Bend Crawford Chargers football represents Almeta Crawford High School in Rosharon, Fort Bend County, not Crawford High School in McLennan County. UIL places Fort Bend Crawford in eleven-man Class 5A Division II District 11 for 2026–28. Fort Bend ISD named David Jackson 5A Coach of Week 1 after the school’s 51–24 victory over La Porte.',
  theme: { accentHex: '#617A86', label: 'Independent TexasDefined editorial accent, not licensed Chargers artwork or official school colors.' },
  seo: {
    title: 'Fort Bend Crawford Chargers Football | 2026 UIL & Coach Guide',
    description: 'Fort Bend Crawford Chargers 5A Division II District 11, official Rosharon campus and Fort Bend ISD September 2026 coach/game report.'
  },
  campus: { address: '801 Caldwell Ranch Blvd., Rosharon, TX 77583', sourceUrl: 'https://achs.fortbendisd.gov/', sourceLabel: 'Almeta Crawford High School official campus and contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Fort Bend ISD varsity calendar for Crawford Chargers fixtures and venues', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Do not confuse Crawford Chargers with other Crawford schools',
    body: 'Almeta Crawford High School lists 801 Caldwell Ranch Blvd. in Rosharon. Fort Bend ISD’s September 1 report names David Jackson as Crawford head football coach and documents a 51–24 win against La Porte. The November varsity calendar lists Crawford at Terry with Traylor Stadium as the venue. Confirm host, tickets and accessible entrance for each game.',
    sourceUrl: 'https://thebend.fortbendisd.gov/news/news-details/~board/around-the-bend/post/crawford-high-school-head-football-coach-wasnamed-dave-campbells-texas-football5a-coach-of-week-1',
    sourceLabel: 'Official Fort Bend ISD September 1, 2026 Crawford football report',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment assigns Fort Bend Crawford to 5A Division II District 11 for eleven-man football. This is not Crawford High School in McLennan County.',
    'Almeta Crawford High School’s campus is at 801 Caldwell Ranch Blvd., Rosharon TX 77583, telephone 281-327-6730, according to Fort Bend ISD’s 2026–27 campus directory.',
    'Fort Bend ISD reported September 1, 2026 that head coach David Jackson earned Dave Campbell’s 5A Coach of Week 1 recognition following Crawford’s 51–24 victory against La Porte. The district also describes the prior inaugural varsity team’s two-round playoff run, not a 2026 final season record.',
    'The district’s November 6 varsity schedule lists Crawford at Terry at Traylor Stadium. Do not substitute the school’s Rosharon campus as the road-game stadium.',
    'No other unverified 2026 results, admission prices, stadium gate details, accessibility guarantees or unlicensed photos are asserted.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL 5A Division II district', body: 'Fort Bend Crawford is assigned to Class 5A Division II District 11.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: 'September 1, 2026', title: 'Coach and dated first-week result', body: 'Fort Bend ISD named David Jackson 5A Coach of Week 1 after Crawford defeated La Porte 51–24.', sourceUrl: 'https://thebend.fortbendisd.gov/news/news-details/~board/around-the-bend/post/crawford-high-school-head-football-coach-wasnamed-dave-campbells-texas-football5a-coach-of-week-1', sourceLabel: 'Official district September 2026 football report' },
    { date: 'November 6, 2026', title: 'Road venue in district schedule', body: 'The district varsity schedule lists Crawford at Terry at Traylor Stadium; verify host details for actual attendance.', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule' }
  ],
  faq: [
    { question: 'Is Fort Bend Crawford the same as Crawford High School near Waco?', answer: 'No. Almeta Crawford High School is a Fort Bend ISD campus in Rosharon.' },
    { question: 'What UIL district is Crawford in for 2026?', answer: 'Class 5A Division II District 11 in the official 2026–28 UIL alignment.' },
    { question: 'Who is Crawford’s school-documented football coach?', answer: 'Fort Bend ISD identified David Jackson as head football coach in its September 1, 2026 report.' },
    { question: 'Where is Crawford High School?', answer: '801 Caldwell Ranch Blvd., Rosharon TX 77583; verify the host venue for each game.' }
  ],
  coach: {
    name: 'David Jackson',
    title: 'Head football coach named in official September 2026 district report',
    sourceUrl: 'https://thebend.fortbendisd.gov/news/news-details/~board/around-the-bend/post/crawford-high-school-head-football-coach-wasnamed-dave-campbells-texas-football5a-coach-of-week-1',
    sourceLabel: 'Fort Bend ISD September 1, 2026 football report',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FortBendCrawfordEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-crawford' ? CRAWFORD : undefined;
}
