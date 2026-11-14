import type { FootballProgramEditorial } from './program-editorial';

// Falls City: school-published stadium directions distinct from school check-in.
const FALLS_CITY: FootballProgramEditorial = {
  slug: 'falls-city',
  intro: 'Falls City Beavers football is a Karnes County school program. UIL’s 2026–28 alignment places Falls City in eleven-man Class 2A Division II, District 15. Unlike generic stadium advice, Falls City ISD publishes separate addresses and access directions for the school office and Beaver Stadium.',
  theme: { accentHex: '#6A547B', label: 'Independent TexasDefined editorial accent; not official team colors or a school logo.' },
  seo: {
    title: 'Falls City Beavers Football | Beaver Stadium & 2026 UIL District',
    description: 'Falls City Beavers: 55-8 November 12 playoff win over Agua Dulce, 2A Division II District 15, Beaver Stadium directions and school schedules.'
  },
  campus: { address: '700 N. Nelson St., Falls City, TX 78113', sourceUrl: 'https://www.fcisd.net/contact-us/visiting-campus', sourceLabel: 'Falls City ISD official school check-in and parking directions', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check the separate official 2026 varsity football schedule, not JV or junior-high schedules', sourceUrl: 'https://www.fcisd.net/athletics/athletic-schedules', sourceLabel: 'Falls City ISD official varsity, JV and JH schedule directory', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Beaver Stadium has its own address and access route',
    body: 'Falls City ISD directs Beaver Stadium visitors to 525 N. Nelson St., opposite the school at 700 N. Nelson St. The district says two parking entrances are north of the stadium, with two stadium gates shown on its visitor map. For school-day visits, the front office is on the south side of campus and the northwest lot is reserved for students and staff. Confirm any game-specific accessibility, parking or admission changes with the host.',
    sourceUrl: 'https://www.fcisd.net/contact-us/visiting-campus',
    sourceLabel: 'Falls City ISD published school and Beaver Stadium visitor directions',
    verifiedAt: '2026-11-13'
  },
  overview: [
    'UIL lists Falls City in 2026–28 2A Division II District 15 with Charlotte, Louise, Pettus, Three Rivers and Yorktown. This is eleven-man football; the school’s small enrollment does not imply six-man competition.',
    'Falls City High School shares the Falls City ISD campus at 700 N. Nelson St. NCES lists the same physical high-school address. Visitors checking in at the school should use the south-side front office, not the northwest student/staff lot.',
    'The district explicitly gives Beaver Stadium as 525 N. Nelson St. Its visitor page describes parking north of the stadium and two designated gates on its map. This is a stronger venue source than assuming the campus address is the stadium.',
    'The district athletics page names Will Kirchhoff athletic director and links current football schedules, coaching staff and visitor parking. The separate 2026 varsity, JV and junior-high schedules should not be confused.',
    'MaxPreps’ November 12 varsity playoff result shows Falls City beating Agua Dulce 55–8, a 47-point first-round margin, and standing 8–3 overall with a 5–0 district record as of November 14. MaxPreps labels that fixture a home game, which does not independently establish the physical stadium; use the published Falls City ISD venue directions and confirm a future playoff host independently. No unverified accessibility guarantee, future kickoff or school-artwork license is implied.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL district', body: 'Falls City is in eleven-man 2A Division II District 15 with Charlotte, Louise, Pettus, Three Rivers and Yorktown.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/2026_RR-Packet.pdf', sourceLabel: 'UIL 2026–28 official district alignment packet' },
    { date: '2026', title: 'Two separate visitor addresses', body: 'School: 700 N. Nelson St.; Beaver Stadium: 525 N. Nelson St. Falls City ISD publishes different parking and entrance instructions for each.', sourceUrl: 'https://www.fcisd.net/contact-us/visiting-campus', sourceLabel: 'Falls City ISD official visitor directions' },
    { date: '2026', title: 'School-published varsity football schedule', body: 'Falls City ISD separately links 2026 varsity, JV and junior-high football schedules; verify the varsity listing and actual host.', sourceUrl: 'https://www.fcisd.net/athletics/athletic-schedules', sourceLabel: 'Falls City ISD athletics schedules' },
    { date: 'Nov. 12, 2026', title: 'Opening playoff result verified against the varsity scoreboard', body: 'Falls City defeated Agua Dulce 55–8 in the UIL Class 2A Division II playoff opener, standing 8–3 overall and 5–0 in district at the November 14 check. The scoreboard’s home designation is not proof of game-site address or entry arrangements.', sourceUrl: 'https://www.maxpreps.com/tx/falls-city/falls-city-beavers/football/schedule/', sourceLabel: 'MaxPreps UIL-linked 2026 varsity results checked November 14' }
  ],
  faq: [
    { question: 'Which UIL football district is Falls City in for 2026?', answer: 'Class 2A Division II District 15, eleven-man football, according to the official 2026–28 UIL packet.' },
    { question: 'What address should I use for Beaver Stadium?', answer: 'Falls City ISD publishes 525 N. Nelson St., Falls City, TX 78113, for Beaver Stadium; the school office is at 700 N. Nelson St.' },
    { question: 'Where do visitors park?', answer: 'The district describes two parking entrances north of Beaver Stadium and a separate school front-office lot. Check its official visitor map and game-specific host instructions.' },
    { question: 'Where is the 2026 varsity football schedule?', answer: 'The Falls City ISD athletics schedules page links varsity, JV and junior-high schedules separately; select varsity and verify any updates.' },
    { question: 'How did Falls City open the 2026 UIL football playoffs?', answer: 'The November 12 MaxPreps varsity final reports Falls City 55, Agua Dulce 8 in Class 2A Division II. Its 8–3 overall and 5–0 district records are snapshots checked November 14, not claims about later playoff rounds.' }
  ]
};

export function getBatch018FallsCityEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'falls-city' ? FALLS_CITY : undefined;
}
