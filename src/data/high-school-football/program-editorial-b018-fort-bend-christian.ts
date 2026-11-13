import type { FootballProgramEditorial } from './program-editorial';

// Fort Bend Christian Academy is TAPPS, not Fort Bend ISD or UIL.
const FBCA: FootballProgramEditorial = {
  slug: 'fort-bend-christian',
  intro: 'Fort Bend Christian Academy Eagles football is a TAPPS private-school program in Sugar Land, not a Fort Bend ISD UIL team. The academy publishes distinct Upper School football-stadium and Lower/Middle School campus addresses and appointed Kendrick Kitchens head football coach effective June 1, 2026.',
  theme: { accentHex: '#6D6B87', label: 'Independent TexasDefined editorial accent, not a licensed Eagles mark or official school color.' },
  seo: {
    title: 'Fort Bend Christian Eagles Football | TAPPS Stadium & Coach Guide',
    description: 'Fort Bend Christian Academy TAPPS football, official Sugar Land Upper School stadium access, 2026 Kendrick Kitchens appointment and school athletics calendar.'
  },
  campus: { address: '1250 Seventh Street, Sugar Land, TX 77478', sourceUrl: 'https://www.fortbendchristian.org/about/campus', sourceLabel: 'Fort Bend Christian Academy official Upper School and football complex directions', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use the academy’s Upper School athletics calendar and Rank One for the current football fixture', sourceUrl: 'https://www.fortbendchristian.org/athletics/calendar', sourceLabel: 'Fort Bend Christian Academy official athletics calendar', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Football complex is at the Upper School, not the Lower/Middle School',
    body: 'The academy places its Upper School and Eagles Athletic Complex, including football stadium, at 1250 Seventh Street, Sugar Land. It directs visitors to the driveway left of the baseball field visible from Seventh Street. Its Lower/Middle School is separately at 1201 Lakeview Drive. Confirm the game-specific gate, parking and accessible route with the host.',
    sourceUrl: 'https://www.fortbendchristian.org/about/campus',
    sourceLabel: 'Academy’s first-party campus map and football stadium access directions',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'Fort Bend Christian Academy is a private TAPPS athletics program, not a Fort Bend ISD UIL school. Its athletics page describes a TAPPS 5A school, but that school-level classification is not automatically the football division or district; use the current TAPPS football alignment for that claim.',
    'The Upper School and Eagles football athletic complex are at 1250 Seventh Street, Sugar Land TX 77478, telephone 281-263-9175. The Lower/Middle School campus at 1201 Lakeview Drive is a separate visitor destination.',
    'The school’s campus map says to enter the athletic complex through the driveway to the left of the baseball field on Seventh Street. It does not guarantee that every game uses the same gate or that accessible parking is universally available.',
    'On April 2, 2026, the academy announced Kendrick Kitchens as new head football coach effective June 1, after serving as offensive coordinator/quarterbacks coach. The current school coaches directory confirms him as head football coach.',
    'The academy publishes Upper School athletics calendars and Rank One links. No unsourced 2026 final scores, playoff bracket, ticket price, school-owned photograph or UIL district assignment is claimed.'
  ],
  milestones: [
    { date: 'April 2, 2026', title: 'School-announced head coach appointment', body: 'The academy appointed Kendrick Kitchens head football coach effective June 1, 2026.', sourceUrl: 'https://www.fortbendchristian.org/about/news/detail/~board/news/post/kendrick-kitchens-named-head-football-coach', sourceLabel: 'Official Fort Bend Christian Academy coaching announcement' },
    { date: '2026', title: 'Upper School stadium visitor directions', body: 'The academy places its football stadium at the 1250 Seventh Street Upper School complex, distinct from the Lower/Middle School at 1201 Lakeview Drive.', sourceUrl: 'https://www.fortbendchristian.org/about/campus', sourceLabel: 'Academy official campus map and visitor directions' },
    { date: '2026', title: 'TAPPS athletics and calendar', body: 'The academy describes its TAPPS athletics program and links its Upper School calendar and Rank One.', sourceUrl: 'https://www.fortbendchristian.org/athletics', sourceLabel: 'Fort Bend Christian Academy official athletics portal' }
  ],
  faq: [
    { question: 'Is Fort Bend Christian Academy a UIL football team?', answer: 'No. The Eagles are a TAPPS private-school program; do not apply Fort Bend ISD UIL district tables.' },
    { question: 'Where is the football stadium?', answer: 'The school identifies its Upper School Eagles Athletic Complex at 1250 Seventh Street, Sugar Land, with an entrance driveway left of the baseball field.' },
    { question: 'Who is the head football coach?', answer: 'The academy appointed Kendrick Kitchens effective June 1, 2026, and its current coaches page lists him.' },
    { question: 'Is the Lower/Middle School campus the stadium?', answer: 'No. The Lower/Middle School is at 1201 Lakeview Drive; the Upper School and football complex are at 1250 Seventh Street.' }
  ],
  coach: {
    name: 'Kendrick Kitchens',
    title: 'Academy-appointed head football coach effective June 1, 2026',
    sourceUrl: 'https://www.fortbendchristian.org/about/news/detail/~board/news/post/kendrick-kitchens-named-head-football-coach',
    sourceLabel: 'Official April 2, 2026 coaching announcement',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FortBendChristianEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-christian' ? FBCA : undefined;
}
