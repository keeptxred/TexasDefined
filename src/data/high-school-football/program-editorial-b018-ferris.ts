import type { FootballProgramEditorial } from './program-editorial';

// Ferris Yellowjackets: separate school campus, athletics venue and dated calendar.
const FERRIS: FootballProgramEditorial = {
  slug: 'ferris',
  intro: 'Ferris Yellowjackets football represents Ferris ISD in Ellis County. UIL assigns Ferris to eleven-man Class 4A Division I, District 7 for 2026–28. The school’s athletics calendar distinguishes Yellowjacket Stadium home fixtures from road venues, while the high-school campus has its own 8th Street contact address.',
  theme: { accentHex: '#73614B', label: 'Independent TexasDefined editorial accent, not official Yellowjackets colors or licensed logo.' },
  seo: {
    title: 'Ferris Yellowjackets Football | 2026 UIL & Stadium Visitor Guide',
    description: 'Ferris Yellowjackets official 4A Division I District 7, high school campus, dated 2026 Yellowjacket Stadium schedule and coach contact.'
  },
  campus: { address: '1025 E 8th St, Ferris, TX 75125', sourceUrl: 'https://www.ferrisisd.org/about/contact-information', sourceLabel: 'Ferris ISD official campus directory', verifiedAt: '2026-11-13' },
  schedule: { label: 'Use the Ferris Yellowjackets official 2026–27 varsity football schedule', sourceUrl: 'https://www.jacketnationathletics.com/sport/football/boys/', sourceLabel: 'Ferris ISD Jacket Nation official varsity football schedule', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Yellowjacket Stadium is listed for home games, not every fixture',
    body: 'The school athletics schedule names Yellowjacket Stadium for 2026 home games against Dallas Pinkston, Carrollton Ranchview, Wills Point, Sulphur Springs, Life Waxahachie and Mabank. Road fixtures list other stadiums, including Raider Stadium at Sunnyvale and Homer Norville Field at Kaufman. Confirm the actual host, stadium address, gates, ticket rules and accessible parking before traveling.',
    sourceUrl: 'https://www.jacketnationathletics.com/sport/football/boys/',
    sourceLabel: 'Official Ferris ISD 2026–27 varsity football schedule',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Ferris in 4A Division I District 7 for eleven-man football. Do not infer the 2026 season record from district membership.',
    'Ferris High School’s physical campus is at 1025 E 8th St, Ferris TX 75125, telephone 972-544-3737. Ferris ISD lists district administration separately at 301 E 5th St.',
    'Ferris ISD’s official Jacket Nation varsity schedule lists Yellowjacket Stadium for multiple home games, while road games have different venues. The schedule labels Palmer and Mexia dates as scrimmages; they must not be presented as regular-season results.',
    'The school’s official athletics staff page identifies Tony Castillo as head football coach and lists coordinators separately. This is a school-published title, not an inferred assignment from a roster.',
    'The Ferris ISD district calendar distinguishes November 4 JV football versus Kaufman from November 5 varsity football at Kaufman. Check the correct level and current host notice.',
    'No unverified 2026 scores, stadium street address, gate details, universal accessibility promise or copyrighted Yellowjackets photo is claimed.'
  ],
  milestones: [
    { date: '2026–28', title: 'UIL football alignment', body: 'Ferris is in eleven-man Class 4A Division I District 7.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'Official UIL 2026–28 alphabetical alignment' },
    { date: '2026', title: 'High school campus', body: 'Ferris High School lists 1025 E 8th St, Ferris TX 75125, telephone 972-544-3737; district administration is at 301 E 5th St.', sourceUrl: 'https://www.ferrisisd.org/about/contact-information', sourceLabel: 'Ferris ISD official contact directory' },
    { date: '2026–27', title: 'Official football schedule and coach', body: 'Jacket Nation lists home fixtures at Yellowjacket Stadium and identifies Tony Castillo as head football coach on its staff tab.', sourceUrl: 'https://www.jacketnationathletics.com/sport/football/boys?tab=staff', sourceLabel: 'Ferris ISD official Jacket Nation football staff' }
  ],
  faq: [
    { question: 'What UIL district is Ferris in for 2026?', answer: 'Class 4A Division I District 7, according to the official 2026–28 UIL alphabetical alignment.' },
    { question: 'Where is Ferris High School?', answer: '1025 E 8th St, Ferris TX 75125. That is the campus contact, not proof of every football game entrance.' },
    { question: 'Who is the school-listed head football coach?', answer: 'The Ferris ISD Jacket Nation staff directory lists Tony Castillo. Recheck official athletics for changes.' },
    { question: 'Are all Ferris games at Yellowjacket Stadium?', answer: 'No. The official 2026–27 varsity calendar lists Yellowjacket Stadium for home fixtures and other venues for road games; confirm the specific event host.' }
  ],
  coach: {
    name: 'Tony Castillo',
    title: 'School-listed head football coach',
    sourceUrl: 'https://www.jacketnationathletics.com/sport/football/boys?tab=staff',
    sourceLabel: 'Official Ferris ISD Jacket Nation football coaching staff',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018FerrisEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'ferris' ? FERRIS : undefined;
}
