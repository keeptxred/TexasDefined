import type { SportsVenueEnrichment, SportsVenuePlanningLink } from './sports-venue-enrichment';

const reviewedAt = '2026-09-10';

type SportsVenueVisitorFacts = {
  address?: string;
  capacity?: string;
  opened?: string;
  homeTeams: readonly string[];
  playingSurface?: string;
  leagueOrConference?: string;
  accessibility?: string;
  bagAndEntry?: string;
};

type SportsVenueSourceReview = {
  reviewedAt: string;
  authoritativeSources: readonly SportsVenuePlanningLink[];
};

export type SportsVenueQualityProfileWave2 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  dkr: [
    { label: 'DKR-Texas Memorial Stadium facility page', url: 'https://texaslonghorns.com/facilities/memorial-stadium/1' },
    { label: '2026 Texas football fan guide', url: 'https://texaslonghorns.com/sports/2026/2/10/football-fan-guide' },
    { label: '2026 Texas gameday parking', url: 'https://texaslonghorns.com/sports/2026/1/27/parking-information' },
  ],
  dellDiamond: [
    { label: 'Dell Diamond ballpark profile', url: 'https://www.milb.com/news/gcs-7906284' },
    { label: 'Dell Diamond directions and parking', url: 'https://www.milb.com/round-rock/ballpark/directions-and-parking' },
    { label: 'Dell Diamond fan FAQ', url: 'https://www.milb.com/round-rock/ballpark/faqs' },
    { label: 'Round Rock Express standings', url: 'https://www.milb.com/round-rock/standings' },
  ],
  foster: [
    { label: 'Foster Pavilion facility and gameday guide', url: 'https://baylorbears.com/facilities/foster-pavilion/1358' },
    { label: 'Foster Pavilion opening night', url: 'https://baylorbears.com/news/2024/1/3/mens-basketball-a-night-to-remember' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE2: Record<string, SportsVenueQualityProfileWave2> = {
  'darrell-k-royal-texas-memorial-stadium': {
    visitorFacts: {
      address: '2139 San Jacinto Blvd., Austin, TX 78712',
      capacity: '100,119',
      opened: '1924',
      homeTeams: ['Texas Longhorns football'],
      playingSurface: 'FieldTurf',
      leagueOrConference: 'NCAA Division I FBS — Southeastern Conference (SEC)',
      accessibility: 'Texas Athletics publishes current ADA seating, accessible-entry gates, parking and shuttle guidance in its football fan guide and gameday maps. Those event-day materials should control the visit.',
      bagAndEntry: 'Texas Athletics uses a clear-bag policy and, for the 2026 football season, lists general stadium gates opening two hours before kickoff. Both are event-day policies and should be rechecked before travel.',
    },
    editorialStory: 'Darrell K Royal–Texas Memorial Stadium opened in 1924 as Texas Memorial Stadium and has expanded repeatedly from its original 27,000-seat design to an official capacity of 100,119. The south end-zone redevelopment opened for fans in 2021, the same era in which Texas installed the current FieldTurf surface. Its century of expansion is the venue story; generic Austin weekend language is not.',
    sourceReview: { reviewedAt, authoritativeSources: sources.dkr },
  },
  'dell-diamond': {
    visitorFacts: {
      address: '3400 E. Palm Valley Blvd., Round Rock, TX 78665',
      capacity: '8,631 permanent seats plus space for about 3,000 on the outfield lawn',
      opened: '2000',
      homeTeams: ['Round Rock Express'],
      playingSurface: 'TifTuf Bermuda grass',
      leagueOrConference: 'Triple-A — Pacific Coast League; Texas Rangers affiliate',
      accessibility: 'Dell Diamond states that surrounding lots include accessible parking, all entrances are ADA accessible and ADA seating is available throughout the ballpark.',
      bagAndEntry: 'Dell Diamond is a clear-bag venue. The current Express FAQ also says standard game gates open about one hour before first pitch, but gate timing is explicitly subject to change.',
    },
    editorialStory: 'Dell Diamond has been the Round Rock Express home since the franchise began play in 2000. Its 8,631 permanent seats are supplemented by an outfield lawn for roughly 3,000 more fans, and the current TifTuf Bermuda surface reflects the ballpark’s long emphasis on natural-grass field quality. The venue also hosts UIL and college baseball, but those event calendars should not be frozen into evergreen copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.dellDiamond },
  },
  'foster-pavilion': {
    visitorFacts: {
      capacity: '7,000+ including standing-room space for about 500 spectators',
      opened: 'January 2024',
      homeTeams: ['Baylor Bears men’s basketball', 'Baylor Bears women’s basketball'],
      leagueOrConference: 'NCAA Division I — Big 12 Conference',
      accessibility: 'Baylor publishes current accessible parking and shuttle information with Foster Pavilion gameday guidance, including an ADA-accessible Ferrell Center shuttle for the 2025–26 season. Because those operations can change, the current facility page should control.',
      bagAndEntry: 'Foster Pavilion uses Baylor’s clear-bag policy and a no-re-entry policy. Baylor currently lists arena gates opening 60 minutes before men’s and women’s basketball tipoff; verify the event guide before travel.',
    },
    editorialStory: 'Foster Pavilion opened to the public in January 2024 as Baylor basketball’s riverfront home after 35 seasons in the Ferrell Center. The 223,547-square-foot pavilion and development center was designed for 7,000-plus fans and places the arena on the Brazos River edge of downtown Waco, making its campus-city connection more useful than generic “sports weekend” filler.',
    sourceReview: { reviewedAt, authoritativeSources: sources.foster },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE2: Record<string, SportsVenueEnrichment> = {
  'darrell-k-royal-texas-memorial-stadium': {
    city: 'Austin',
    capacity: '100,119',
    opened: '1924',
    primaryEvents: ['Texas Longhorns football', 'SEC college-football games'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE2['darrell-k-royal-texas-memorial-stadium'].editorialStory,
    parking: 'Texas Athletics publishes season-specific football parking and traffic maps. For 2026, permit lots generally open at 7 a.m. on gamedays and at 6 a.m. for 11 a.m. kickoffs; use the current parking map and assigned permit rather than a generic downtown parking recommendation.',
    arrival: 'Texas Athletics currently lists general stadium gates opening two hours before kickoff and requires fans to enter through the gate assigned on their mobile ticket. Because traffic flow, gate assignments and parking operations are season-specific, confirm the current football fan guide before leaving for campus.',
    stayAndEat: 'The stadium sits on the University of Texas campus immediately north of downtown Austin. Campus and nearby central-Austin lodging can be practical for football, but dining or sightseeing districts should be treated as separate choices rather than automatically packaged into every game-day itinerary.',
    nearby: 'Moody Center and other UT athletics facilities are defensible campus connections. Broader Austin attractions should appear only when the page can explain a real geographic or editorial relationship.',
    planningLinks: [...sources.dkr],
    imageBrief: 'Darrell K Royal–Texas Memorial Stadium on the University of Texas campus, showing the football bowl and central Austin campus context without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'dell-diamond': {
    city: 'Round Rock',
    capacity: '8,631 permanent seats plus about 3,000 outfield-lawn capacity',
    opened: '2000',
    primaryEvents: ['Round Rock Express Triple-A baseball', 'UIL state baseball tournament games', 'College and special-event baseball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE2['dell-diamond'].editorialStory,
    parking: 'Dell Diamond is at 3400 E. Palm Valley Boulevard and publishes direct approach routes from I-35, SH 45 and SH 130. Express-game parking is cashless and event parking prices can change, so the current directions-and-parking page should control rather than an evergreen price claim.',
    arrival: 'The Express FAQ currently says standard game gates open about one hour before first pitch, while some special events use different timing. Arrive according to the specific event page and keep the ticket ready before reaching the entrance.',
    stayAndEat: 'The useful geography is east Round Rock along US 79 and the immediate ballpark area. Austin is a separate destination roughly south of the venue and should not be presented as if Dell Diamond were a downtown-Austin ballpark.',
    nearby: 'Old Settlers Park and Round Rock’s other sports facilities are the strongest same-area connections. Unrelated Williamson County attractions should not be added solely to create internal links.',
    planningLinks: [...sources.dellDiamond],
    imageBrief: 'Dell Diamond in Round Rock with the natural-grass baseball field, seating bowl and outfield lawn visible; no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'foster-pavilion': {
    city: 'Waco',
    capacity: '7,000+ including about 500 standing-room spaces',
    opened: 'January 2024',
    primaryEvents: ['Baylor Bears men’s basketball', 'Baylor Bears women’s basketball', 'Concerts and public events when scheduled'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE2['foster-pavilion'].editorialStory,
    parking: 'Baylor separates Bear Foundation reserved parking from public parking and publishes current shuttle and walking options for Foster Pavilion. Public visitors should use the current facility guidance because garage access, shuttle service and construction impacts can change by season.',
    arrival: 'Baylor currently lists general basketball gates opening 60 minutes before tipoff. The pavilion uses mobile tickets and venue-specific entrance assignments, so verify the current game guide before arriving rather than relying on a fixed year-round rule.',
    stayAndEat: 'Foster Pavilion is on the Brazos River at the downtown edge of Baylor’s campus, so downtown Waco and the university are genuinely connected to the arena visit. That relationship is strong enough to describe without turning the page into a generic Central Texas weekend itinerary.',
    nearby: 'The Baylor campus, Brazos Riverwalk and downtown Waco are the relevant immediate context. McLane Stadium is another Baylor sports venue, but it should be presented as a separate stop rather than as part of the pavilion itself.',
    planningLinks: [...sources.foster],
    imageBrief: 'Foster Pavilion on the Brazos River in Waco, showing the modern arena exterior and riverfront campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave2(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE2[slug];
}

export function getSportsVenueQualityProfileWave2(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE2[slug];
}
