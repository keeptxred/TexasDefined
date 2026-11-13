import type { FootballProgramEditorial } from './program-editorial';

// Brooks County ISD first-party sources and UIL 2026–28; no game results inferred.
const FALFURRIAS: FootballProgramEditorial = {
  slug: 'falfurrias',
  intro: 'Falfurrias High School’s Jerseys football program is a Brooks County ISD campus in Brooks County, Texas. UIL’s 2026–28 alignment places Falfurrias in Class 3A Division II, District 16. The campus publishes a Jersey Drive address and its own athletics page with football schedules, ticketing and coach contacts.',
  theme: { accentHex: '#476B72', label: 'Original independent TexasDefined accent; not a school logo, team color certification or licensed photo.' },
  seo: {
    title: 'Falfurrias Jerseys Football | UIL District, Coach & Visitor Guide',
    description: 'Falfurrias Jerseys football: UIL 2026–28 3A Division II District 16, official Brooks County campus, coach and athletics visitor sources.'
  },
  campus: { address: '100 Jersey Drive, Falfurrias, TX 78355', sourceUrl: 'https://fhs.bcisd.us/connect/campus-directory', sourceLabel: 'Falfurrias High School official campus directory', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check the high school athletics page for football schedule and Hometown Ticketing', sourceUrl: 'https://fhs.bcisd.us/activities/athletics', sourceLabel: 'Falfurrias High School official athletics page', verifiedAt: '2026-11-13' },
  notice: {
    title: 'School campus and district office are different contacts',
    body: 'Falfurrias High School lists 100 Jersey Drive and 361-325-8091. Brooks County ISD lists its district office at 200 W. Bennett Street. Use the high school athletics page for football schedules and Hometown Ticketing, and verify the actual host stadium and entry rules for each fixture.',
    sourceUrl: 'https://fhs.bcisd.us/activities/athletics',
    sourceLabel: 'Official Falfurrias High School athletics visitor information',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment identifies Falfurrias as an eleven-man football program in 3A Division II District 16. This is a district assignment, not a season scorecard.',
    'The campus is at 100 Jersey Drive, Falfurrias, Texas 78355; the school lists telephone 361-325-8091. The district administrative office at 200 W. Bennett Street is not the campus or a verified football entrance.',
    'Falfurrias High School’s own athletics page lists football schedules and Hometown Ticketing. It identifies Lamar Rodriguez as head coach, while the Brooks County ISD athletics department separately lists him as athletic director.',
    'For each game, confirm the current opponent, home or away designation, stadium, kickoff, ticket provider and accessible entry with the event host. A campus address alone does not establish the stadium gate.',
    'No unverified 2026 wins, final scores, ticket prices, venue entrances or school-logo reuse rights are asserted.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL eleven-man football district', body: 'Falfurrias is assigned to 3A Division II District 16 in the official UIL alphabetical realignment.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '2026', title: 'School campus and contact', body: 'Falfurrias High School lists 100 Jersey Drive, Falfurrias TX 78355 and telephone 361-325-8091.', sourceUrl: 'https://fhs.bcisd.us/connect/campus-directory', sourceLabel: 'Official Falfurrias High School campus directory' },
    { date: '2026', title: 'School-listed football coach', body: 'The high school athletics page identifies Lamar Rodriguez as head football coach; the district athletics department also lists him as athletic director.', sourceUrl: 'https://fhs.bcisd.us/activities/athletics', sourceLabel: 'Official Falfurrias High School athletics coach directory' }
  ],
  faq: [
    { question: 'Which UIL district is Falfurrias in for 2026?', answer: 'UIL lists Falfurrias in 3A Division II District 16 for eleven-man football during 2026–28.' },
    { question: 'Where is Falfurrias High School?', answer: 'The campus lists 100 Jersey Drive, Falfurrias, Texas 78355; this is not a guaranteed football stadium entrance.' },
    { question: 'Who does the school list as head football coach?', answer: 'The Falfurrias High School athletics page identifies Lamar Rodriguez. Recheck the official directory for coaching changes.' },
    { question: 'Where can I verify the football schedule and tickets?', answer: 'The official high school athletics page links football schedules and Hometown Ticketing. Confirm the specific game host and current admission rules.' }
  ],
  coach: {
    name: 'Lamar Rodriguez',
    title: 'School-listed head football coach; verify changes before each season',
    sourceUrl: 'https://fhs.bcisd.us/activities/athletics',
    sourceLabel: 'Falfurrias High School official athletics coach listing',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FalfurriasEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'falfurrias' ? FALFURRIAS : undefined;
}
