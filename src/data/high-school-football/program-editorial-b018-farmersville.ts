import type { FootballProgramEditorial } from './program-editorial';

// Farmersville: official high school and Rank One varsity calendar, not scraped results.
const FARMERSVILLE: FootballProgramEditorial = {
  slug: 'farmersville',
  intro: 'Farmersville Fighting Farmers football represents Farmersville ISD in Collin County. UIL places the program in 2026–28 Class 4A Division II, District 7. The high school publishes its campus address, a 2026 varsity football calendar through Rank One, and the athletics director/head football coach.',
  theme: { accentHex: '#765A47', label: 'Independent TexasDefined editorial accent, not an official school color or licensed mascot.' },
  seo: {
    title: 'Farmersville Fighting Farmers Football | 2026 UIL & Game-Day Guide',
    description: 'Farmersville Fighting Farmers 4A Division II District 7, official 2026 varsity schedule, campus, coach and school-hosted ticket information.'
  },
  campus: { address: '499 North State Hwy 78, Farmersville, TX 75442', sourceUrl: 'https://highschool.farmersvilleisd.net/apps/pages/index.jsp?pREC_ID=988724&type=d&uREC_ID=456405', sourceLabel: 'Farmersville High School official campus overview', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use the official 2026 varsity football Rank One calendar, not the JV calendar', sourceUrl: 'https://highschool.farmersvilleisd.net/apps/pages/index.jsp?pREC_ID=1043869&type=d&uREC_ID=456318', sourceLabel: 'Farmersville High School 2026–27 official athletic schedules', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Verify ticket provider and game venue with the host',
    body: 'The school’s home-game ticket notice links TicketSpicket, while the current district homepage promotes Hometown Ticketing. Those pages are not consistent enough to claim a single permanent provider. Open the actual host’s event-specific ticket link and verify kickoff, venue and accessible entry before purchasing or traveling.',
    sourceUrl: 'https://www.farmersvilleisd.net/',
    sourceLabel: 'Farmersville ISD current home-game ticket announcements',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Farmersville in eleven-man 4A Division II District 7. A conference/district assignment does not establish a completed 2026 win-loss record.',
    'Farmersville High School lists its physical campus at 499 North State Hwy 78, Farmersville, TX 75442, telephone 972-782-7757. The district administration offices use a different address, 501A Hwy 78 N.',
    'The high school’s 2026–27 athletics page uses Rank One for current schedules and links a separate 2026 varsity football schedule. Do not confuse varsity, junior varsity or other sport calendars.',
    'The official athletics schedule page lists Zac Quinlan as athletic director and head football coach. The high school publishes the school contact and calendar in the same directory.',
    'Farmersville ISD’s homepage advertises Hometown Ticketing, while an older high-school home-game notice refers to TicketSpicket. Rather than assume one provider for every fixture, follow the current event-specific host link.',
    'No unsourced final scores, stadium entrance, ticket prices, parking/accessibility guarantee or licensed team image is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL football alignment', body: 'Farmersville is assigned to Class 4A Division II District 7, eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical realignment' },
    { date: '2026', title: 'Official school contact', body: 'The high school lists 499 North State Hwy 78 and 972-782-7757, separate from district administration.', sourceUrl: 'https://highschool.farmersvilleisd.net/apps/pages/index.jsp?pREC_ID=988724&type=d&uREC_ID=456405', sourceLabel: 'Farmersville High School official About Us' },
    { date: '2026–27', title: 'Varsity schedule and school-listed coach', body: 'The athletics page links the 2026 varsity football Rank One schedule and lists Zac Quinlan as athletic director/head football coach.', sourceUrl: 'https://highschool.farmersvilleisd.net/apps/pages/index.jsp?pREC_ID=1043869&type=d&uREC_ID=456318', sourceLabel: 'Farmersville High School official athletics schedules' }
  ],
  faq: [
    { question: 'Which UIL district is Farmersville in for 2026?', answer: 'Class 4A Division II District 7 in the official 2026–28 UIL realignment.' },
    { question: 'Where is Farmersville High School?', answer: '499 North State Hwy 78, Farmersville, Texas 75442. Confirm the specific football stadium with the event host.' },
    { question: 'Who is the school-listed football coach?', answer: 'The 2026–27 athletics page identifies Zac Quinlan as athletic director and head football coach. Recheck for changes.' },
    { question: 'Where are current varsity fixtures and tickets?', answer: 'Use the official 2026 varsity Rank One calendar and the specific host event’s current ticket link; school and district notices have referenced different providers.' }
  ],
  coach: {
    name: 'Zac Quinlan',
    title: 'School-listed athletic director and head football coach',
    sourceUrl: 'https://highschool.farmersvilleisd.net/apps/pages/index.jsp?pREC_ID=1043869&type=d&uREC_ID=456318',
    sourceLabel: 'Farmersville High School official 2026–27 athletics schedule page',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FarmersvilleEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'farmersville' ? FARMERSVILLE : undefined;
}
