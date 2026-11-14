import type { FootballProgramEditorial } from './program-editorial';

// Batch018 cohort 3: Floresville ISD official high school, athletics and UIL sources.
const FLORESVILLE: FootballProgramEditorial = {
  slug: 'floresville',
  intro: 'Floresville Tigers football represents Floresville ISD in Wilson County. UIL places the Tigers in eleven-man Class 4A Division I, District 14 for 2026–28. The high school and athletics department use Tiger Lane, distinct from the district administration office on 5th Street. In the November 13, 2026 bi-district playoff, Floresville beat Fredericksburg 32–28 according to contemporaneous Associated Press regional results; verify any later matchup and tickets separately with the host.',
  theme: { accentHex: '#5B7186', label: 'Original independent TexasDefined accent, not school-owned Tigers artwork or a certified team color.' },
  seo: {
    title: 'Floresville Tigers Football | 2026 UIL District, Coach & Visitor Guide',
    description: 'Floresville Tigers UIL 4A Division I District 14, official Tiger Lane campus and coach, Nov. 13 32–28 playoff result, and visitor sources.'
  },
  campus: { address: '1813 Tiger Lane, Floresville, TX 78114', sourceUrl: 'https://www.fisd.us/page/contact-us/', sourceLabel: 'Floresville ISD official high school contact directory', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Floresville ISD athletics for the latest Tigers varsity schedule and host tickets', sourceUrl: 'https://tigersjags.fisd.us/', sourceLabel: 'Floresville ISD official Tigers and Jaguars athletics portal', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Check varsity versus sub-varsity and actual host tickets',
    body: 'Floresville ISD athletics lists schedules, home tickets and staff contacts at 1813 Tiger Lane, telephone 830-393-5370. The district office is at 1200 5th Street. Neither a campus address nor a generic home-ticket button proves the venue or admission rules for an away or neutral-site game; check the actual host.',
    sourceUrl: 'https://tigersjags.fisd.us/',
    sourceLabel: 'Official Floresville ISD athletics schedule and home-ticket hub',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The UIL 2026–28 realignment places Floresville in Class 4A Division I District 14 for eleven-man football. District peers include La Vernia, Medina Valley Creek View, Pleasanton, San Antonio Kennedy, Somerset and Uvalde. District alignment is not a scorecard.',
    'Floresville High School’s official contact directory lists 1813 Tiger Lane, Floresville TX 78114, telephone 830-393-5370, with Holden Barrett as principal. The district office is at 1200 5th Street.',
    'The Floresville ISD athletics portal serves both Tigers and Jaguars programs, so select the Floresville High School varsity Tigers fixture rather than a different campus, sport or age level.',
    'The athletics staff directory lists Ilyan Martinez as athletic director/head football coach. It separately identifies Israel Aguero as assistant head football coach, avoiding confusion between those roles.',
    'Associated Press statewide bi-district results identify Floresville 32, Fredericksburg 28 on November 13, 2026. This documented result follows a specific completed playoff; it is not a live standings table or a guarantee of a subsequent round’s opponent. The Floresville ISD athletics portal supplies schedule and home-ticket links, but host-specific kickoff, parking, accessible entry and any later venue require new confirmation.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL football alignment', body: 'Floresville is in Class 4A Division I District 14 for eleven-man football.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Floresville High School campus', body: 'The district lists 1813 Tiger Lane and 830-393-5370 for the high school, distinct from the 1200 5th Street administration office.', sourceUrl: 'https://www.fisd.us/page/contact-us/', sourceLabel: 'Floresville ISD official high school contact directory' },
    { date: '2026', title: 'School-listed football staff', body: 'Floresville ISD athletics lists Ilyan Martinez as athletic director/head football coach and Israel Aguero as assistant head football coach.', sourceUrl: 'https://tigersjags.fisd.us/o/tigersjags/staff/', sourceLabel: 'Official Floresville ISD athletics staff directory' },
    { date: 'November 13, 2026', title: 'Floresville edges Fredericksburg in the bi-district round', body: 'Associated Press statewide opening-round results report Floresville 32, Fredericksburg 28 in 4A Division I. The published result is independent news reporting, separate from the district’s first-party venue and coaching facts.', sourceUrl: 'https://sports.yahoo.com/articles/first-round-texas-high-school-041943907.html', sourceLabel: 'Associated Press statewide high school football opening-round score report' }
  ],
  faq: [
    { question: 'What UIL district is Floresville in for 2026?', answer: 'Class 4A Division I District 14 for eleven-man football, under the 2026–28 UIL alignment.' },
    { question: 'Where is Floresville High School?', answer: '1813 Tiger Lane, Floresville TX 78114. The district administration office is at 1200 5th Street.' },
    { question: 'Who does the school list as head football coach?', answer: 'Floresville ISD athletics lists Ilyan Martinez as athletic director/head football coach. Israel Aguero is listed as assistant head football coach.' },
    { question: 'Where are schedules and tickets?', answer: 'The official Floresville ISD athletics portal links schedules and home tickets. Verify the specific varsity game host, venue and entry rules.' },
    { question: 'What was the November 13 Floresville–Fredericksburg playoff result?', answer: 'Contemporaneous statewide results report Floresville won 32–28 in the UIL Class 4A Division I bi-district round. The result does not confirm a future opponent, ticket price or stadium gate.' }
  ],
  coach: {
    name: 'Ilyan Martinez',
    title: 'School-listed athletic director and head football coach',
    sourceUrl: 'https://tigersjags.fisd.us/o/tigersjags/staff/',
    sourceLabel: 'Floresville ISD official athletics staff directory',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FloresvilleEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'floresville' ? FLORESVILLE : undefined;
}
