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

export type SportsVenueQualityProfile = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  amon: [
    { label: 'TCU stadium facility facts', url: 'https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-football-html' },
    { label: 'TCU football A-Z guide', url: 'https://gofrogs.com/sports/2020/6/1/football-a-z-guide' },
    { label: 'TCU football parking', url: 'https://gofrogs.com/sports/2018/7/13/gameday-parking-html' },
    { label: 'TCU clear-bag policy', url: 'https://gofrogs.com/sports/2020/6/8/clear-bag-policy' },
  ],
  ford: [
    { label: 'SMU Ford Stadium facility page', url: 'https://smumustangs.com/facilities/gerald-j-ford-stadium/2' },
    { label: 'SMU football parking', url: 'https://smumustangs.com/sports/2016/6/8/parking' },
    { label: 'Ford Stadium policies', url: 'https://smumustangs.com/sports/2018/8/29/stadium-policies-gerald-j-ford-stadium' },
    { label: 'SMU athletics bag policy', url: 'https://smumustangs.com/sports/2024/10/31/smu-athletics-bag-policy' },
  ],
  globeLife: [
    { label: 'Rangers Globe Life Field facts', url: 'https://www.mlb.com/rangers/ballpark/facts-figures' },
    { label: 'Globe Life Field parking', url: 'https://globelifefield.com/parking/' },
    { label: 'Globe Life Field accessibility', url: 'https://globelifefield.com/accessibility/' },
    { label: 'Globe Life Field bag policy', url: 'https://globelifefield.com/bag-policy/' },
  ],
  aac: [
    { label: 'American Airlines Center overview', url: 'https://www.americanairlinescenter.com/about-aacenter/' },
    { label: 'AAC parking and transit', url: 'https://www.americanairlinescenter.com/parking' },
    { label: 'AAC accessibility', url: 'https://www.americanairlinescenter.com/ada-accessibility-information' },
    { label: 'AAC arena FAQ and bag policy', url: 'https://www.americanairlinescenter.com/arena-faq' },
  ],
  tms: [
    { label: 'Texas Motor Speedway directions and parking', url: 'https://www.texasmotorspeedway.com/fans/directions-parking/' },
    { label: 'Texas Motor Speedway fan FAQ', url: 'https://www.texasmotorspeedway.com/fans/' },
    { label: 'Texas Motor Speedway track facts', url: 'https://www.texasmotorspeedway.com/media/track-facts/track-facts.html' },
    { label: 'Texas Motor Speedway history', url: 'https://www.texasmotorspeedway.com/media/news/texas-motor-speedway-history-racing-excellence-since-1997.html' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES: Record<string, SportsVenueQualityProfile> = {
  'amon-g-carter-stadium': {
    visitorFacts: {
      address: '2850 Stadium Drive, Fort Worth, TX 76109',
      capacity: '46,000',
      opened: '1930',
      homeTeams: ['TCU Horned Frogs football'],
      playingSurface: 'Natural grass (Moncrief Field)',
      leagueOrConference: 'NCAA Division I FBS — Big 12 Conference',
      accessibility: 'TCU lists accessible seating throughout the stadium, ADA parking in the Lot 5/LaDainian Tomlinson Garage area and Guest Services near Section 102; current parking availability should be confirmed before the game.',
      bagAndEntry: 'TCU uses a clear-bag policy and currently lists stadium gates opening 90 minutes before football kickoff. Treat both as game-day policies and verify them in the current Football A-Z Guide before travel.',
    },
    editorialStory: 'Amon G. Carter Stadium has been TCU football’s home since 1930. The university completed a $164 million rebuild for the 2012 season, opened the east-side Legends Club & Suites in 2020, and refreshed the stadium again in 2026 with a replacement natural-grass field, upgraded LED lighting and a new south video board.',
    sourceReview: { reviewedAt, authoritativeSources: sources.amon },
  },
  'gerald-j-ford-stadium': {
    visitorFacts: {
      capacity: '33,200',
      opened: '2000',
      homeTeams: ['SMU Mustangs football'],
      playingSurface: 'Natural grass',
      leagueOrConference: 'NCAA Division I FBS — Atlantic Coast Conference (ACC)',
      accessibility: 'SMU lists ADA seating at the top row of the lower level, ADA spaces in cash and credential lots, Gate 2 drop-off and golf-cart shuttle assistance.',
      bagAndEntry: 'Ford Stadium uses SMU’s clear-bag policy, security screening and a no-re-entry policy. Current stadium policies should control because event operations can change.',
    },
    editorialStory: 'Gerald J. Ford Stadium opened in 2000 as SMU football’s on-campus home. The $100 million Garry Weber End Zone Complex opened before the 2024 season, and SMU installed a natural-grass field in 2025. Those changes are more useful history than a season-specific home-game count.',
    sourceReview: { reviewedAt, authoritativeSources: sources.ford },
  },
  'globe-life-field': {
    visitorFacts: {
      address: '734 Stadium Drive, Arlington, TX 76011',
      capacity: 'Approximately 40,300',
      opened: '2020',
      homeTeams: ['Texas Rangers'],
      playingSurface: 'Synthetic grass — Shaw Sports Turf B1K system',
      leagueOrConference: 'Major League Baseball — American League',
      accessibility: 'The ballpark provides accessible parking in general lots on a first-come basis, ADA shuttle service from parking areas, accessible seating and complimentary wheelchair escorts.',
      bagAndEntry: 'Globe Life Field publishes event-specific entry rules. Its general policy limits bags to 16 x 16 x 8 inches and prohibits backpacks and coolers, with medical and diaper-bag exceptions; Rangers games and other events can have different food or entry rules.',
    },
    editorialStory: 'Globe Life Field opened in 2020 as the Texas Rangers’ third home in Arlington. The retractable-roof ballpark replaced the club’s 1994–2019 home across the district and uses a purpose-designed synthetic playing surface, making the roof and field system central to the venue’s story rather than generic Metroplex travel language.',
    sourceReview: { reviewedAt, authoritativeSources: sources.globeLife },
  },
  'american-airlines-center': {
    visitorFacts: {
      address: '2500 Victory Avenue, Dallas, TX 75219',
      capacity: '20,000 basketball / 18,532 hockey',
      opened: '2001',
      homeTeams: ['Dallas Mavericks', 'Dallas Stars'],
      leagueOrConference: 'NBA and NHL',
      accessibility: 'AAC lists accessible parking in Lot F and the Lexus Garage, wheelchair escort service, assistive-listening receivers and other accessibility services; parking spaces are first-come and event rates vary.',
      bagAndEntry: 'AAC permits small wallets/clutches at all entrances and larger permitted purses only through designated X-ray entrances; backpacks and large totes are prohibited. All guests are subject to security screening, so the current arena FAQ should control.',
    },
    editorialStory: 'American Airlines Center opened in 2001 in Victory Park as the shared home of the NBA’s Dallas Mavericks and NHL’s Dallas Stars. Its retractable seating changes the arena from a roughly 20,000-seat basketball configuration to an 18,532-seat hockey rink, a more distinctive fact than generic downtown-weekend framing.',
    sourceReview: { reviewedAt, authoritativeSources: sources.aac },
  },
  'texas-motor-speedway': {
    visitorFacts: {
      address: '3545 Lone Star Circle, Fort Worth, TX 76177',
      opened: '1997',
      homeTeams: [],
      playingSurface: '1.5-mile oval; 58-foot minimum width',
      leagueOrConference: 'Major NASCAR and motorsports events',
      accessibility: 'Texas Motor Speedway publishes accessible parking locations and event-day mobility information in its track facts, maps and fan guidance; visitors should use the current event map for the active configuration.',
      bagAndEntry: 'Race-day policies vary by event. The speedway’s Fan FAQ is the authoritative source for permitted bags, coolers, cashless operations and other current entry restrictions.',
    },
    editorialStory: 'Texas Motor Speedway debuted with its first NASCAR weekend in April 1997. The 1.5-mile oval sits within a 1,500-acre property with extensive parking and camping infrastructure, so the scale of the speedway and its race-day traffic system—not generic Fort Worth sightseeing—is the relevant visitor context.',
    sourceReview: { reviewedAt, authoritativeSources: sources.tms },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION: Record<string, SportsVenueEnrichment> = {
  'amon-g-carter-stadium': {
    city: 'Fort Worth',
    capacity: '46,000',
    opened: '1930; rebuilt stadium reopened for the 2012 season',
    primaryEvents: ['TCU Horned Frogs football', 'Armed Forces Bowl and other football events'],
    history: SPORTS_VENUE_QUALITY_PROFILES['amon-g-carter-stadium'].editorialStory,
    parking: 'TCU states that lots adjacent to Amon G. Carter Stadium are season-parking areas and directs football visitors to its current game-day parking map. Use the assigned lot or current public/remote option rather than assuming campus lots are open on football Saturdays.',
    arrival: 'TCU’s current Football A-Z Guide lists stadium gates opening 90 minutes before kickoff. Because gate assignments, rideshare locations and traffic controls are game-day operations, confirm the current guide and parking map before leaving for campus.',
    stayAndEat: 'The useful event-day geography is the TCU campus and nearby University Drive/Berry Street area. Treat downtown Fort Worth, the Cultural District and the Stockyards as separate itinerary choices rather than implying they are adjacent to the stadium.',
    nearby: 'Ed and Rae Schollmaier Arena and TCU’s other athletics facilities are the defensible same-campus connections; unrelated Tarrant County attractions should not be presented as venue-adjacent solely for internal linking.',
    planningLinks: [...sources.amon],
    imageBrief: 'Amon G. Carter Stadium on the TCU campus, showing the football bowl, natural-grass Moncrief Field and recognizable Fort Worth campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'gerald-j-ford-stadium': {
    city: 'University Park',
    capacity: '33,200',
    opened: '2000',
    primaryEvents: ['SMU Mustangs football', 'ACC college-football games'],
    history: SPORTS_VENUE_QUALITY_PROFILES['gerald-j-ford-stadium'].editorialStory,
    parking: 'SMU publishes a football-specific parking map and warns that nearby University Park and Highland Park streets include resident-only parking areas. Use designated SMU game-day parking or the instructions tied to a parking credential rather than neighborhood street parking.',
    arrival: 'Ford Stadium is embedded in the SMU campus and surrounding residential street grid. Parking, security screening and gate operations are event-specific, so the current SMU parking page and Ford Stadium policies should control the arrival plan.',
    stayAndEat: 'For a football-focused visit, choose lodging and meals for practical access to SMU rather than treating downtown Dallas as automatically part of the event. The Mockingbird/US-75 corridor and campus are the immediate geography that matters.',
    nearby: 'Moody Coliseum, the Garry Weber End Zone Complex and other SMU athletics facilities are meaningful on-campus connections. Broader Dallas attractions should appear only when there is a separate editorial reason to recommend them.',
    planningLinks: [...sources.ford],
    imageBrief: 'Gerald J. Ford Stadium on the SMU campus with the field and Collegiate-Georgian campus context visible; no added logos or text.',
    verifiedAt: reviewedAt,
  },
  'globe-life-field': {
    city: 'Arlington',
    capacity: 'Approximately 40,300',
    opened: '2020',
    primaryEvents: ['Texas Rangers home games', 'Ballpark tours', 'Concerts and other large events'],
    history: SPORTS_VENUE_QUALITY_PROFILES['globe-life-field'].editorialStory,
    parking: 'All Globe Life Field parking lots are cashless and lot opening times vary by event. For Rangers regular-season games, the current A-to-Z guide lists lots opening two hours before afternoon first pitches and two and a half hours before night games, with Opening Day and postseason timing subject to change.',
    arrival: 'Use the specific event’s parking instructions before entering the Arlington Entertainment District. AT&T Stadium and Choctaw Stadium share the same district, so overlapping events can change traffic patterns; the event page should override a generic arrival rule.',
    stayAndEat: 'Texas Live! and the immediate Arlington Entertainment District are genuinely adjacent pre- or post-event options. A Dallas or Fort Worth stop is a separate trip decision and should not be presented as though it is part of the ballpark neighborhood.',
    nearby: 'AT&T Stadium, Choctaw Stadium and Texas Live! are the strongest geographically defensible nearby connections because they occupy the same Arlington sports-and-entertainment district.',
    planningLinks: [...sources.globeLife],
    imageBrief: 'Globe Life Field in Arlington with its retractable-roof structure and immediate entertainment-district context visible; no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'american-airlines-center': {
    city: 'Dallas',
    capacity: '20,000 basketball / 18,532 hockey',
    opened: '2001',
    primaryEvents: ['Dallas Mavericks home games', 'Dallas Stars home games', 'Concerts and arena events'],
    history: SPORTS_VENUE_QUALITY_PROFILES['american-airlines-center'].editorialStory,
    parking: 'AAC’s Lexus Garage opens at noon on event days; other arena parking lots generally open two hours before the event. Those hours remain subject to event and management changes, and the arena publishes current parking instructions before each visit.',
    arrival: 'Victory Station directly serves the arena via DART Green and Orange Line trains, while Trinity Railway Express service also uses Victory Station but does not run regular Sunday service unless specifically scheduled. Compare transit with event parking instead of assuming a drive-in plan.',
    stayAndEat: 'Victory Park is the arena’s immediate district, with restaurants and hotels around the venue. Broader downtown Dallas sightseeing should not be inserted merely to make the page look like a weekend itinerary.',
    nearby: 'Victory Station and the surrounding Victory Park blocks are the most useful immediate context. Other Dallas attractions should be linked only when their proximity or editorial relevance is clear.',
    planningLinks: [...sources.aac],
    imageBrief: 'American Airlines Center in Victory Park, Dallas, with the arena exterior and immediate transit-oriented district context visible; no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'texas-motor-speedway': {
    city: 'Fort Worth',
    opened: '1997',
    primaryEvents: ['NASCAR race weekends', 'Motorsports events', 'Speedway camping and fan events'],
    history: SPORTS_VENUE_QUALITY_PROFILES['texas-motor-speedway'].editorialStory,
    parking: 'Texas Motor Speedway separates free general parking from preferred, express, camping and infield access and publishes route-specific directions for each area. The property is large enough that the correct lot and approach route should be chosen before driving to the speedway.',
    arrival: 'For major race weekends, the speedway’s current Fan FAQ recommends arriving at least two hours before the race. Treat that as race-day guidance rather than a permanent rule for every concert, dirt-track event or special event hosted on the property.',
    stayAndEat: 'Texas Motor Speedway is not a walkable central-Fort-Worth venue. Camping is part of the speedway property, while off-site lodging and dining require a driving plan; avoid presenting downtown Fort Worth as if it were the venue’s immediate neighborhood.',
    nearby: 'The speedway’s own 1,500-acre property, camping areas and fan facilities are the primary event context. Central Fort Worth attractions should not be forced into the page as “nearby” solely because the venue uses a Fort Worth mailing address.',
    planningLinks: [...sources.tms],
    imageBrief: 'Wide view of Texas Motor Speedway showing the 1.5-mile oval, grandstands and scale of the Fort Worth race complex; no added sponsor marks or text.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediation(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION[slug];
}

export function getSportsVenueQualityProfile(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES[slug];
}
