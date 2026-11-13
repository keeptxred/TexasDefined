import type { FootballProgramEditorial } from './program-editorial';

// Floydada Whirlwinds: school-district coaching appointment supersedes stale third-party roster.
const FLOYDADA: FootballProgramEditorial = {
  slug: 'floydada',
  intro: 'Floydada Whirlwinds football represents Floydada Collegiate ISD in Floyd County. UIL assigns Floydada to eleven-man Class 2A Division I, District 2 for 2026–28. The district’s February 2026 board agenda approved Jeff Smith as athletic director/head football coach, and the current district staff directory lists him in that role.',
  theme: { accentHex: '#6A6884', label: 'Independent TexasDefined editorial accent; no school-owned mascot artwork or official team-color claim.' },
  seo: {
    title: 'Floydada Whirlwinds Football | 2026 UIL & Verified Coach Guide',
    description: 'Floydada Whirlwinds 2A Division I District 2, verified 2026 Jeff Smith appointment, official athletics and campus-address verification.'
  },
  campus: { address: '618 S Tree St, Floydada, TX 79235', sourceUrl: 'https://www.esc17.net/page/district.floydada', sourceLabel: 'Region 17 ESC Floydada High School campus directory (2024 listing; verify current access)', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Floydada Collegiate ISD athletics for current varsity football notices', sourceUrl: 'https://www.floydadaisd.esc17.net/athletics/', sourceLabel: 'Floydada Collegiate ISD official athletics portal', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Campus address sources differ; verify before visiting',
    body: 'Region 17 ESC’s campus directory lists Floydada High School at 618 S Tree St, but a 2025–26 Floydada Collegiate ISD handbook lists a junior-high/high-school campus contact at 215 N White. The district office is 226 W California St. Because these addresses differ, confirm the current high-school entrance and actual game venue directly with the district rather than assuming one is the stadium.',
    sourceUrl: 'https://www.floydadaisd.esc17.net/athletics/',
    sourceLabel: 'Floydada Collegiate ISD official athletics contact',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'The UIL 2026–28 alphabetical alignment lists Floydada as eleven-man Class 2A Division I District 2. A classification and district assignment do not establish a current season record.',
    'The Region 17 ESC directory lists Floydada High School at 618 S Tree St, while the 2025–26 district handbook lists 215 N White for its junior-high/high-school campus contact. Do not quietly choose a stadium entrance from these conflicting school-address references.',
    'Floydada Collegiate ISD’s February 12, 2026 board agenda includes employment of Jeff Smith as athletic director/head football coach; the current district staff page independently lists the same title. Older third-party coaching rosters naming J.R. Compton should not override that dated district evidence.',
    'The district athletics page is the appropriate first-party starting point for current varsity game notices; it lists the district office at 226 W California St, not necessarily the stadium.',
    'No unsourced 2026 scores, field entrance, accessibility promise, copyrighted image or outdated coach attribution is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL football district', body: 'Floydada is in eleven-man 2A Division I District 2.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: 'February 12, 2026', title: 'District coaching appointment', body: 'The school board agenda includes employment of Jeff Smith as athletic director/head football coach.', sourceUrl: 'https://manuals.boardbook.org/Public/Agenda/2287?meeting=729438', sourceLabel: 'Floydada Collegiate ISD official board agenda' },
    { date: '2026', title: 'Current staff directory confirmation', body: 'Floydada Collegiate ISD lists Jeff Smith as athletic director/head football coach; verify updates each season.', sourceUrl: 'https://www.floydadaisd.esc17.net/staff?page_no=6', sourceLabel: 'Floydada Collegiate ISD official staff listing' }
  ],
  faq: [
    { question: 'Which UIL district is Floydada in for 2026?', answer: 'Class 2A Division I District 2, eleven-man football, in the official 2026–28 alignment.' },
    { question: 'Who is the current school-listed head football coach?', answer: 'Floydada Collegiate ISD’s 2026 board agenda and staff directory identify Jeff Smith. Older third-party lists may be stale.' },
    { question: 'Where is Floydada High School?', answer: 'Region 17 ESC lists 618 S Tree St, while a 2025–26 district handbook lists 215 N White for a combined secondary campus. Confirm the current entrance with the school.' },
    { question: 'Where can I verify the game schedule and stadium?', answer: 'Start with Floydada Collegiate ISD athletics and confirm the actual host, venue, tickets and accessibility for the fixture.' }
  ],
  coach: {
    name: 'Jeff Smith',
    title: 'District-listed athletic director and head football coach',
    sourceUrl: 'https://www.floydadaisd.esc17.net/staff?page_no=6',
    sourceLabel: 'Floydada Collegiate ISD official current staff directory',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FloydadaEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'floydada' ? FLOYDADA : undefined;
}
