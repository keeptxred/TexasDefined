export type FootballProgramEditorial = {
  slug: string;
  coach?: {
    name: string;
    title: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  campus?: {
    address: string;
    phone?: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  schedule?: {
    label: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  venue?: {
    name: string;
    address: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    note: string;
  };
  development?: {
    title: string;
    body: string;
    sourceUrl: string;
    sourceLabel: string;
    verifiedAt: string;
  };
  seasonSnapshot?: {
    seasonLabel: string;
    overallRecord?: string;
    districtRecord?: string;
    verifiedAt: string;
    sourceUrl: string;
    sourceLabel: string;
    nextGame?: {
      dateLabel: string;
      opponent: string;
      site: string;
      district?: boolean;
    };
    games: Array<{
      dateLabel: string;
      opponent: string;
      site: string;
      result?: string;
      district?: boolean;
    }>;
  };
  overview: string[];
  faq: Array<{ question: string; answer: string }>;
};

const PROGRAM_EDITORIAL: Record<string, FootballProgramEditorial> = {
  spring: {
    slug: 'spring',
    coach: {
      name: 'KaRon Coleman Sr.',
      title: 'Head football coach / high-school athletic coordinator',
      sourceUrl: 'https://www.springisd.org/o/shs/staff?page_no=2',
      sourceLabel: 'Spring High School staff directory',
      verifiedAt: '2026-10-05',
    },
    campus: {
      address: '19428 I-45 North, Spring, TX 77373',
      phone: '281-891-7000',
      sourceUrl: 'https://www.springisd.org/o/shs',
      sourceLabel: 'Spring High School',
      verifiedAt: '2026-10-05',
    },
    schedule: {
      label: '2026–27 football schedule',
      sourceUrl: 'https://www.springisd.org/o/shs/page/athletics',
      sourceLabel: 'Spring High School Athletics',
      verifiedAt: '2026-10-05',
    },
    venue: {
      name: 'Planet Ford Stadium',
      address: '23802 Cypresswood Dr., Spring, TX 77373',
      sourceUrl: 'https://www.springisd.org/page/sports-facilities/',
      sourceLabel: 'Spring ISD Sports Facilities',
      verifiedAt: '2026-10-05',
      note: 'Spring ISD lists Planet Ford Stadium as a district sports facility. Spring High played the first football game there when the stadium opened in 2019. Confirm the current Spring High schedule for the specific game and venue assignment.',
    },
    development: {
      title: 'A new Spring High School campus is under construction',
      body: 'Spring ISD reported in May 2026 that construction of the new Spring High School was ahead of schedule and that the football field at the new athletics complex had reached final grade. Campus and facility details can change quickly during this project, so current game-day and enrollment information should be checked against district sources.',
      sourceUrl: 'https://shs.springisd.org/o/shs/article/2878042',
      sourceLabel: 'Spring High School construction update',
      verifiedAt: '2026-10-05',
    },
    overview: [
      'Spring High School is a Spring ISD varsity football program in north Harris County. The school identifies its teams as the Lions and uses green and white as its school colors.',
      'For 2026, Spring High School lists KaRon Coleman Sr. as its high-school athletic coordinator, and the school announced him as the new Spring High football head coach earlier in the year. The school also publishes its current football schedule through the athletics page.',
      'Spring ISD operates Planet Ford Stadium on Cypresswood Drive as a district football facility. Because district venues can host multiple schools and events, fans should confirm the exact venue, ticketing and arrival information for each game.',
    ],
    faq: [],
  },
  shamrock: {
    slug: 'shamrock',
    coach: {
      name: 'Nate Skelton',
      title: 'Athletic Director / Head Football Coach',
      sourceUrl: 'https://www.shamrockisd.net/34144_3',
      sourceLabel: 'Shamrock ISD coaching staff',
      verifiedAt: '2026-10-07',
    },
    campus: {
      address: '100 S Illinois Street, Shamrock, TX 79079',
      phone: '806-256-3492',
      sourceUrl: 'https://www.shamrockisd.net/',
      sourceLabel: 'Shamrock ISD',
      verifiedAt: '2026-10-07',
    },
    schedule: {
      label: '2026 football schedule',
      sourceUrl: 'https://www.shamrockisd.net/34143_3',
      sourceLabel: 'Shamrock ISD Athletic Schedules',
      verifiedAt: '2026-10-07',
    },
    venue: {
      name: 'El Paso Field',
      address: '100 S Illinois Street, Shamrock, TX 79079',
      sourceUrl: 'https://texasbob.com/stadium/stadium.php?id=757',
      sourceLabel: 'TexasBob stadium directory',
      verifiedAt: '2026-10-07',
      note: 'El Paso Field is listed as Shamrock ISD\'s home football venue. Confirm the current Shamrock ISD schedule for the exact matchup, kickoff time and any game-day changes before travel.',
    },
    seasonSnapshot: {
      seasonLabel: '2026 varsity football',
      overallRecord: '1–4',
      districtRecord: '0–0',
      verifiedAt: '2026-10-07',
      sourceUrl: 'https://www.texasfootball.com/team/shamrock-irish',
      sourceLabel: 'Dave Campbell\'s Texas Football — Shamrock 2026 schedule',
      nextGame: {
        dateLabel: 'Oct. 9, 2026',
        opponent: 'Wellington',
        site: 'Away',
        district: true,
      },
      games: [
        { dateLabel: 'Aug. 27', opponent: 'Winters', site: 'Neutral · Seymour', result: 'W 15–8' },
        { dateLabel: 'Sept. 4', opponent: 'West Texas', site: 'Home', result: 'L 13–61' },
        { dateLabel: 'Sept. 11', opponent: 'Vega', site: 'Away', result: 'L 20–52' },
        { dateLabel: 'Sept. 18', opponent: 'Seymour', site: 'Home', result: 'L 8–52' },
        { dateLabel: 'Sept. 25', opponent: 'Olton', site: 'Away', result: 'L 0–64' },
        { dateLabel: 'Oct. 9', opponent: 'Wellington', site: 'Away', district: true },
        { dateLabel: 'Oct. 16', opponent: 'Clarendon', site: 'Away', district: true },
        { dateLabel: 'Oct. 23', opponent: 'Quanah', site: 'Home', district: true },
        { dateLabel: 'Oct. 30', opponent: 'Memphis', site: 'Away', district: true },
        { dateLabel: 'Nov. 6', opponent: 'Wheeler', site: 'Home', district: true },
      ],
    },
    overview: [
      'Shamrock High School represents Shamrock ISD in Wheeler County and identifies its football program as the Fighting Irish. For the 2026–28 UIL cycle, Shamrock competes in 2A Division II District 5 in 11-man football.',
      'UIL reports a 2026–28 realignment enrollment of 100.5 and an alphabetical submitted conference of 1A, while the final football alignment places Shamrock in 2A Division II. TexasDefined treats the final UIL football alignment as authoritative for competition and separately shows the reported enrollment so the exception is explicit rather than hidden.',
      'Shamrock ISD lists Nate Skelton as Athletic Director and head football coach and publishes a dedicated 2026 football schedule. El Paso Field is the sourced home football venue associated with the Fighting Irish.',
    ],
    faq: [
      {
        question: 'Why is Shamrock in 2A Division II football if UIL lists enrollment at 100.5?',
        answer: 'UIL\'s 2026–28 alphabetical listing reports Shamrock at 100.5 with a submitted conference of 1A, while the final football alignment places the 11-man program in 2A Division II District 5. The final football alignment controls competition; the raw enrollment should not be presented as if it falls inside the standard 2A Division II cutoff band.',
      },
    ],
  },
};

export function getFootballProgramEditorial(slug: string) {
  return PROGRAM_EDITORIAL[slug] ?? null;
}
