import type { FootballProgramEditorial } from './program-editorial';

// Elkins Knights: official 2025 school coaching document and 2026 UIL district.
const ELKINS: FootballProgramEditorial = {
  slug: 'fort-bend-elkins',
  intro: 'Fort Bend Elkins Knights football represents Lawrence E. Elkins High School in Missouri City, Fort Bend County. UIL assigns Elkins to eleven-man Class 6A District 21 for 2026–28. An official school athletics presentation identifies Trae Grimes as co-campus coordinator and head football coach.',
  theme: { accentHex: '#5B6E88', label: 'Independent TexasDefined editorial accent, not an official Knights crest, color certification or licensed school photo.' },
  seo: {
    title: 'Fort Bend Elkins Knights Football | 2026 UIL & School Guide',
    description: 'Elkins Knights 6A District 21, official Missouri City campus, school-documented coach Trae Grimes and varsity visitor information.'
  },
  campus: { address: '7007 Knights Court, Missouri City, TX 77459', sourceUrl: 'https://ehs.fortbendisd.gov/', sourceLabel: 'Lawrence E. Elkins High School official campus and contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use Fort Bend ISD’s current varsity football calendar and host-specific venue details', sourceUrl: 'https://thebend.fortbendisd.gov/athletics-home/schedules', sourceLabel: 'Fort Bend ISD official varsity football schedule', verifiedAt: '2026-11-13' },
  notice: {
    title: 'School campus is not a blanket stadium assignment',
    body: 'Elkins High School is at 7007 Knights Court, Missouri City TX 77459, telephone 281-634-2600. The school’s coaching document identifies Trae Grimes as head football coach. Fort Bend ISD’s athletics calendar controls event-specific venue and host information; confirm current tickets, gates and accessible entry.',
    sourceUrl: 'https://ehs.fortbendisd.gov/',
    sourceLabel: 'Elkins High School official campus information',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Fort Bend Elkins in eleven-man Class 6A District 21. A UIL district is not a current season record.',
    'Lawrence E. Elkins High School is at 7007 Knights Court, Missouri City TX 77459, telephone 281-634-2600, with principal Courtney Muceus according to Fort Bend ISD’s campus directory and school website.',
    'A Fort Bend ISD Elkins football parent presentation names Trae Grimes as co-campus coordinator and head football coach. This is a first-party school document, though staff can change and should be checked before future seasons.',
    'The school’s current administration page describes Courtney Muceus’s previous work at First Colony Middle School. That school connection does not make the two campuses interchangeable for athletics.',
    'For each Knights varsity game, confirm the actual Fort Bend ISD host stadium, kickoff, tickets and accessibility. No unsourced final score, stadium gate or licensed school image is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL 6A District 21', body: 'Fort Bend Elkins is assigned to Class 6A District 21 for eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2025', title: 'School-documented football coach', body: 'Elkins High School’s parent presentation names Trae Grimes co-campus coordinator/head football coach.', sourceUrl: 'https://www.fortbendisd.com/cms/lib/TX01917858/Centricity/Domain/191/Elkins%20HS%20Parent%20Meeting%20-%20June%2026.pdf', sourceLabel: 'Official Elkins High School parent presentation' },
    { date: '2026–27', title: 'Official high-school administration', body: 'Elkins High School identifies Courtney Muceus as principal and provides current campus contacts.', sourceUrl: 'https://ehs.fortbendisd.gov/our-school/administrative-team', sourceLabel: 'Elkins High School official administration' }
  ],
  faq: [
    { question: 'Which UIL district is Elkins in for 2026?', answer: 'Class 6A District 21 for eleven-man football, per UIL’s 2026–28 alignment.' },
    { question: 'Where is Elkins High School?', answer: '7007 Knights Court, Missouri City TX 77459. Confirm the actual stadium for each football fixture.' },
    { question: 'Who is the school-documented head football coach?', answer: 'An official Elkins High School parent presentation identifies Trae Grimes. Recheck the current school directory before future seasons.' },
    { question: 'Where can I check tickets and stadium?', answer: 'Use Fort Bend ISD’s current varsity athletics calendar and the specific game host’s visitor notice.' }
  ],
  coach: {
    name: 'Trae Grimes',
    title: 'Head football coach in school-published parent presentation; verify changes',
    sourceUrl: 'https://www.fortbendisd.com/cms/lib/TX01917858/Centricity/Domain/191/Elkins%20HS%20Parent%20Meeting%20-%20June%2026.pdf',
    sourceLabel: 'Official Elkins High School football parent presentation',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FortBendElkinsEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'fort-bend-elkins' ? ELKINS : undefined;
}
