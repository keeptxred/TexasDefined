import type { FootballProgramEditorial } from './program-editorial';

// Forney Jackrabbits: distinguish from separate North Forney Falcons campus.
const FORNEY: FootballProgramEditorial = {
  slug: 'forney',
  intro: 'Forney Jackrabbits football represents Forney High School in Kaufman County, not North Forney High School’s Falcons. UIL places Forney in eleven-man Class 6A District 10 for 2026–28. The district lists Jeff Fleener as Forney High’s athletic coordinator/head football coach and Marcus Shavers separately for North Forney. The campus address and a game venue are not interchangeable: the school’s November 6 varsity calendar identified City Bank Stadium at 800 FM 741, not the campus’s 1800 College Avenue contact address.',
  theme: { accentHex: '#596D80', label: 'Independent TexasDefined editorial accent, not an official Jackrabbits mark or licensed school photo.' },
  seo: {
    title: 'Forney Jackrabbits Football | 2026 UIL 6A & Game-Day Guide',
    description: 'Forney Jackrabbits 6A District 10, school-listed Jeff Fleener, official campus versus dated City Bank Stadium venue, and North Forney distinction.'
  },
  campus: { address: '1800 College Ave, Forney, TX 75126', sourceUrl: 'https://fhs.forneyisd.net/about-us/contact-us', sourceLabel: 'Forney High School official campus contact', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use Forney High School Jackrabbit Athletics and current event-host ticket notices', sourceUrl: 'https://fhs.forneyisd.net/athletics', sourceLabel: 'Forney High School official Jackrabbit Athletics link', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Forney Jackrabbits are not North Forney Falcons',
    body: 'Forney ISD operates two distinct high-school football programs. Forney High School lists 1800 College Ave and coach Jeff Fleener; North Forney High School has its own campus and head coach Marcus Shavers. Confirm the exact school, stadium, host, tickets and accessible entrance before traveling.',
    sourceUrl: 'https://www.forneyisd.net/departments/athletics/high-school-athletics',
    sourceLabel: 'Forney ISD official separate high-school football staff and athletics links',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alignment lists Forney in eleven-man Class 6A District 10. The 6A conference does not use Division I or II district labels in this alignment; do not import a lower-classification division.',
    'Forney High School is at 1800 College Ave, Forney TX 75126, telephone 469-762-4200. Forney ISD administration is at 600 S Bois D’Arc Street; the separate North Forney campus is not the Jackrabbits campus.',
    'Forney ISD athletics lists Jeff Fleener as athletic coordinator/head football coach for the Jackrabbits. It lists Marcus Shavers separately for the North Forney Falcons, a distinct 6A program.',
    'The Forney High School athletics page links the Jackrabbit Athletics site; its homepage provides an athletics ticket link. Forney High’s November 6, 2026 home varsity calendar listed City Bank Stadium at 800 FM 741, Forney, rather than the 1800 College Avenue campus address. It is a dated event listing, not a claim that every game takes place there or that a particular entrance is open.',
    'Forney High’s November 5 school calendar separately listed ninth-grade football at City Bank Stadium and junior-varsity football at Lobo Stadium in Longview. This demonstrates why spectators must distinguish team level and actual opponent/host venue; use the school’s current calendar and athletics tickets for each matchup.',
    'No invented 2026 win-loss record, game score, universal stadium policy or copyrighted school artwork is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL Class 6A district', body: 'Forney is in eleven-man Class 6A District 10; North Forney is a separate school in the same district.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: '2026', title: 'Official Jackrabbits campus', body: 'Forney High School lists 1800 College Ave, Forney TX 75126 and 469-762-4200.', sourceUrl: 'https://fhs.forneyisd.net/about-us/contact-us', sourceLabel: 'Forney High School official contact' },
    { date: '2026', title: 'Two separate football coaching staffs', body: 'Forney ISD lists Jeff Fleener for the Forney Jackrabbits and Marcus Shavers for North Forney Falcons.', sourceUrl: 'https://www.forneyisd.net/departments/athletics/high-school-athletics', sourceLabel: 'Forney ISD official high school athletics directory' },
    { date: 'Nov. 5–6, 2026', title: 'School calendar confirms venue varies by team level', body: 'The November 6 varsity Longview fixture was listed at Forney City Bank Stadium, 800 FM 741, while the November 5 JV Longview fixture was listed at Lobo Stadium in Longview. These were dated schedule entries, not blanket venue or entrance guarantees.', sourceUrl: 'https://fhs.forneyisd.net/calendar', sourceLabel: 'Forney High School official November 2026 event calendar' }
  ],
  faq: [
    { question: 'What UIL district is Forney in for 2026?', answer: 'Class 6A District 10 for eleven-man football, according to the official 2026–28 UIL alignment.' },
    { question: 'Are Forney and North Forney the same team?', answer: 'No. The Jackrabbits and Falcons are distinct Forney ISD high-school programs with different campuses and coaches.' },
    { question: 'Who is Forney High School’s football coach?', answer: 'The Forney ISD athletics directory identifies Jeff Fleener as the Jackrabbits’ athletic coordinator/head football coach.' },
    { question: 'Where is Forney High School?', answer: 'The school contact address is 1800 College Ave, Forney TX 75126; that alone does not establish the address of a football game.' },
    { question: 'Where did Forney High list its November 6, 2026 varsity game?', answer: 'The school’s official event calendar listed City Bank Stadium at 800 FM 741, Forney for the varsity Longview game. For a future game or a different team level, confirm the current dated calendar entry, host, ticketing and accessible entry.' }
  ],
  coach: {
    name: 'Jeff Fleener',
    title: 'School-listed athletic coordinator and head football coach',
    sourceUrl: 'https://www.forneyisd.net/departments/athletics/high-school-athletics',
    sourceLabel: 'Forney ISD official high school athletics directory',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018ForneyEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'forney' ? FORNEY : undefined;
}
