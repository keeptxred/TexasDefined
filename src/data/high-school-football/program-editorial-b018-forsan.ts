import type { FootballProgramEditorial } from './program-editorial';

// Forsan: official coaching and neutral-site game facts; separate attributed Nov13 press final.
const FORSAN: FootballProgramEditorial = {
  slug: 'forsan',
  intro: 'Forsan Buffaloes football represents Forsan ISD in Howard County. UIL assigns Forsan to eleven-man Class 2A Division I, District 4 for 2026–28. Forsan ISD identifies Casey Thompson as athletic director/head football coach. For its November 13 bi-district game against Abernathy, the school identified Wigwam Stadium in Seminole and designated Forsan the home team; independent regional reporting records a 35–28 Forsan win.',
  theme: { accentHex: '#5B7183', label: 'Independent TexasDefined editorial accent; not official Buffaloes colors or licensed school art.' },
  seo: {
    title: 'Forsan Buffaloes Football | 2026 UIL District, Coach & Campus',
    description: 'Forsan Buffaloes 2A Division I District 4, official Casey Thompson coaching appointment, school-confirmed Seminole playoff venue and 35–28 reported final.'
  },
  campus: { address: '411 West 6th St, Forsan, TX 79733', sourceUrl: 'https://www.forsan.esc18.net/', sourceLabel: 'Forsan ISD official school contact address', verifiedAt: '2026-11-13' },
  schedule: { label: 'Check Forsan ISD official varsity football notices and event-host details', sourceUrl: 'https://www.forsan.esc18.net/athletics', sourceLabel: 'Forsan ISD official athletics and football links', verifiedAt: '2026-11-13' },
  notice: {
    title: 'Forsan’s November 13 playoff was at Wigwam Stadium, Seminole',
    body: 'Forsan ISD’s dated live-feed notice identifies its November 13, 2026 bi-district game against Abernathy at 7 p.m. at Wigwam Stadium in Seminole and designates Forsan the home team. That is a game-specific neutral-site destination, not the Forsan campus at 411 West 6th Street. The notice links a Seminole-hosted ticket page; its link and admission/accessibility terms are not assurances for a future game.',
    sourceUrl: 'https://www.forsan.esc18.net/live-feed',
    sourceLabel: 'Forsan ISD first-party November 13 playoff/game-day notice',
    verifiedAt: '2026-11-14'
  },
  overview: [
    'UIL’s 2026–28 alphabetical alignment places Forsan in Class 2A Division I District 4 for eleven-man football. This is the competition assignment, not a 2026 score or current standing.',
    'Forsan ISD lists 411 West 6th St, Forsan TX 79733 and telephone 432-457-2223. The district operates the Forsan junior-high/high-school campus; do not infer a stadium entrance from the school office.',
    'On February 26, 2025, Forsan ISD announced Casey Thompson as its new athletic director/head football coach. The current school staff directory confirms that same role; older school handbooks can list different staff.',
    'For the November 13 Abernathy playoff, the school’s live feed specified 7 p.m. at Wigwam Stadium in Seminole, with Forsan designated the home team despite playing away from the school campus. Its host ticket link was for that dated fixture; spectators should check each new game’s actual venue and host policy.',
    'The Midland Reporter-Telegram’s November 14 account records Forsan rallying from a 14-point fourth-quarter deficit to beat Abernathy 35–28; it identifies Owen Bishop, Ashton Ellis and Cole Wyatt in the comeback. That is attributed independent game reporting, not a result taken from the school’s pregame calendar. It also does not determine the next game’s venue or ticket rules.'
  ],
  milestones: [
    { date: '2026–28', title: 'Official UIL football district', body: 'Forsan is in eleven-man Class 2A Division I District 4.', sourceUrl: 'https://realignment.uiltexas.org/alignments/2026/Alpha_26-28.pdf', sourceLabel: 'UIL official 2026–28 alphabetical alignment' },
    { date: 'February 26, 2025', title: 'District-appointed football coach', body: 'Forsan ISD announced Casey Thompson as athletic director and head football coach.', sourceUrl: 'https://www.forsan.esc18.net/article/2051772', sourceLabel: 'Official Forsan ISD coaching announcement' },
    { date: '2026', title: 'Current school staff listing', body: 'The district staff directory lists Casey Thompson as athletic director/head football coach.', sourceUrl: 'https://www.forsan.esc18.net/staff?page_no=5', sourceLabel: 'Forsan ISD official staff directory' },
    { date: 'November 13, 2026', title: 'Neutral-site bi-district venue', body: 'Forsan ISD’s first-party live feed identified Wigwam Stadium in Seminole, 7 p.m. versus Abernathy, and Forsan as the designated home team.', sourceUrl: 'https://www.forsan.esc18.net/live-feed', sourceLabel: 'Forsan ISD November 2026 playoff game-day announcement' },
    { date: 'November 13, 2026', title: 'Forsan wins 35–28 over Abernathy', body: 'The Midland Reporter-Telegram reported the Buffaloes came back from 14 points down in the fourth quarter to beat Abernathy 35–28 in bi-district play.', sourceUrl: 'https://www.mrt.com/sports/highschool/article/big-spring-permian-forsan-advance-uil-football-22530172.php', sourceLabel: 'Midland Reporter-Telegram November 14 independently reported game recap' }
  ],
  faq: [
    { question: 'What UIL district is Forsan in for 2026?', answer: 'Class 2A Division I District 4, eleven-man football, in the official 2026–28 UIL alignment.' },
    { question: 'Who coaches Forsan football?', answer: 'Forsan ISD appointed Casey Thompson in February 2025 and continues to list him as athletic director/head football coach.' },
    { question: 'Where is Forsan ISD?', answer: 'The district lists 411 West 6th St, Forsan TX 79733. Verify the actual football venue and gate with the host.' },
    { question: 'Where was Forsan’s November 13 playoff against Abernathy?', answer: 'Forsan ISD listed Wigwam Stadium in Seminole at 7 p.m., with Forsan designated the home team. This differs from the school campus; verify each future game’s site.' },
    { question: 'What was the Forsan–Abernathy bi-district score?', answer: 'The Midland Reporter-Telegram reported a 35–28 Forsan victory on November 13, 2026, including a fourth-quarter comeback. This is an independently attributed score.' },
    { question: 'Where can I check the current varsity schedule?', answer: 'Use Forsan ISD athletics and the dated host notice for kickoff, current tickets, parking and accessibility. A prior playoff venue is not a permanent home-game assignment.' }
  ],
  coach: {
    name: 'Casey Thompson',
    title: 'School-listed athletic director and head football coach',
    sourceUrl: 'https://www.forsan.esc18.net/article/2051772',
    sourceLabel: 'Forsan ISD official February 2025 coaching appointment',
    verifiedAt: '2026-11-13'
  }
};

export function getBatch018ForsanEditorial(slug: string): FootballProgramEditorial | undefined {
  return slug === 'forsan' ? FORSAN : undefined;
}
