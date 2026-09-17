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

export type SportsVenueQualityProfileWave8 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  wolff: [
    { label: 'Wolff Stadium official ballpark page', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium' },
    { label: 'Wolff Stadium FAQ', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/faq' },
    { label: 'Wolff Stadium A-Z guide', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/a-z-guide' },
  ],
  retama: [
    { label: 'Retama Park live racing', url: 'https://www.retamapark.com/horseracing/live-racing' },
    { label: 'Retama Park horse racing', url: 'https://www.retamapark.com/horseracing' },
    { label: 'Retama Park events', url: 'https://www.retamapark.com/events' },
  ],
  momentum: [
    { label: 'Momentum Bank Ballpark official page', url: 'https://www.milb.com/midland/ballpark' },
    { label: 'Momentum Bank Ballpark A-Z guide', url: 'https://www.milb.com/midland/ballpark/ballpark-guidelines' },
    { label: 'RockHounds official site', url: 'https://www.milb.com/midland' },
  ],
  bowers: [
    { label: 'Bowers Stadium facility page', url: 'https://gobearkats.com/facilities/bowers-stadium/22' },
    { label: 'Sam Houston athletics', url: 'https://gobearkats.com/' },
  ],
  mckinney: [
    { label: 'McKinney ISD Stadium', url: 'https://www.mckinneyisd.net/page/mckinney-isd-stadium' },
    { label: 'McKinney stadium directions and parking', url: 'https://www.mckinneyisd.net/page/stadium-direction-parking' },
    { label: 'McKinney ISD athletics tickets', url: 'https://www.mckinneyisd.net/o/as/page/tickets/' },
  ],
  prosper: [
    { label: 'Children’s Health Stadium official page', url: 'https://www.prosper-isd.net/page/childrens-health-stadium-at-pisd' },
    { label: 'Prosper ISD athletics', url: 'https://www.prosper-isd.net/o/athletics' },
  ],
  ratliff: [
    { label: 'Ratliff Stadium policies', url: 'https://www.ectorcountyisd.org/departments/athletics-pe/ratliff-stadium-policy-regulations' },
    { label: 'Ector County ISD athletics tickets', url: 'https://www.ectorcountyisd.org/departments/athletics-pe/tickets' },
    { label: 'Ector County ISD athletics', url: 'https://www.ectorcountyisd.org/departments/athletics-pe' },
  ],
  mesquite: [
    { label: 'Mesquite ISD stadium directions', url: 'https://www.mesquiteisd.org/stadium-directions' },
    { label: 'Mesquite ISD athletics security', url: 'https://www.mesquiteisd.org/143659_3' },
    { label: 'Mesquite ISD athletics', url: 'https://www.mesquiteisd.org/departments/athletics' },
  ],
  lupton: [
    { label: 'TCU Lupton Stadium facility page', url: 'https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-baseball-html.aspx' },
    { label: 'TCU baseball', url: 'https://gofrogs.com/sports/baseball' },
  ],
  reckling: [
    { label: 'Rice Reckling Park facility page', url: 'https://riceowls.com/sports/2018/7/17/facilities-reckling-park-html' },
    { label: 'Rice baseball', url: 'https://riceowls.com/sports/baseball' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE8: Record<string, SportsVenueQualityProfileWave8> = {
  'nelson-wolff-stadium': {
    visitorFacts: {
      address: '5757 US Hwy 90 West, San Antonio, TX 78227',
      capacity: '6,200 fixed seats plus a left-field grass berm for approximately 3,000',
      opened: 'April 18, 1994',
      homeTeams: ['San Antonio Missions'],
      leagueOrConference: 'Double-A Texas League — San Diego Padres affiliate',
      accessibility: 'The Missions publish current guest-service and accessibility information for Wolff Stadium. Event-specific mobility or seating questions should be checked against the current ballpark guide.',
      bagAndEntry: 'A clear-bag policy took effect May 5, 2026: clear totes up to 12 by 12 by 6 inches and small clutches up to 5 by 9 inches are permitted, with medical and manufactured diaper-bag exceptions. All bags are subject to search.',
    },
    editorialStory: 'Nelson W. Wolff Municipal Stadium opened in 1994 and remains the San Antonio Missions’ west-side home. The ballpark combines 6,200 fixed seats with a left-field grass berm for roughly 3,000 more fans, while its U.S. 90 setting, current entry rules and Double-A Padres affiliation provide a more useful visitor frame than generic San Antonio baseball copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.wolff },
  },
  'retama-park': {
    visitorFacts: {
      opened: '1995',
      homeTeams: [],
      leagueOrConference: 'Texas pari-mutuel horse racing and year-round simulcast wagering',
      bagAndEntry: 'Retama Park currently requires clear bags no larger than 12 by 6 by 12 inches, allows one-gallon clear freezer bags and small clutches up to 5 by 7 inches, and permits inspected medical bags. Special events can add restrictions.',
    },
    editorialStory: 'Retama Park opened in 1995 in Selma and remains a San Antonio-area horse-racing destination built around live racing and year-round simulcast wagering. Its current racing calendar, clear-bag policy and Retama Parkway arrival pattern are more useful to visitors than generic San Antonio entertainment copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.retama },
  },
  'momentum-bank-ballpark': {
    visitorFacts: {
      address: '5514 Champions Drive, Midland, TX 79706',
      capacity: '4,709 seats; grass berm areas raise total capacity to 6,669',
      opened: '2002',
      homeTeams: ['Midland RockHounds'],
      leagueOrConference: 'Double-A Texas League — Athletics affiliate',
      bagAndEntry: 'Momentum Bank Ballpark is cashless and uses a clear-bag policy, with medical bags and small 4.5 by 6.5 inch clutches permitted. Gate times vary by day and can change, so the current A-Z guide should control.',
    },
    editorialStory: 'Momentum Bank Ballpark opened in 2002 as the Midland RockHounds’ West Texas home. It combines 4,709 seats with berm space for a 6,669 total capacity and remains the Double-A home of the Athletics organization; current gate and event rules should control rather than generic Midland family-entertainment copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.momentum },
  },
  'bowers-stadium': {
    visitorFacts: {
      address: '620 Bowers Blvd., Huntsville, TX 77340',
      capacity: '14,000',
      opened: 'September 13, 1986',
      homeTeams: ['Sam Houston Bearkats football'],
      leagueOrConference: 'NCAA Division I FBS — Conference USA',
      accessibility: 'Sam Houston publishes current facility and football event information. Parking, accessible routes and any construction-related changes should be checked against the current game-day plan.',
    },
    editorialStory: 'Bowers Stadium opened in 1986 as Sam Houston football’s 14,000-seat home in Huntsville and is named for former university president Elliott T. Bowers. Current official materials place the stadium in a major modernization era, so durable stadium history and live game-day guidance are safer than freezing transitional construction details.',
    sourceReview: { reviewedAt, authoritativeSources: sources.bowers },
  },
  'mckinney-isd-stadium': {
    visitorFacts: {
      address: '4201 S. Hardin Blvd., McKinney, TX 75070',
      homeTeams: ['McKinney ISD football programs'],
      leagueOrConference: 'Texas high-school football, UIL playoffs and NCAA Division II championship events',
      accessibility: 'McKinney ISD publishes home- and visitor-side directions and accessible parking information. Current district event maps should control because routing changes with the event.',
      bagAndEntry: 'McKinney ISD uses a clear-bag policy and current varsity ticketing is electronic. Visitors should load tickets before arrival and use the designated home or visitor approach.',
    },
    editorialStory: 'McKinney ISD Stadium is the district’s South Hardin Boulevard football and community-event anchor and has hosted the NCAA Division II Football Championship since 2018. Current e-ticket, clear-bag, parking-side and approved-tailgate rules are more defensible visitor facts than repeating an unsupported seat count.',
    sourceReview: { reviewedAt, authoritativeSources: sources.mckinney },
  },
  'childrens-health-stadium-prosper': {
    visitorFacts: {
      address: '2000 Stadium Drive, Prosper, TX 75078',
      capacity: '12,000',
      homeTeams: ['Prosper ISD football programs'],
      leagueOrConference: 'Texas high-school football, UIL events and district ceremonies',
      accessibility: 'Prosper ISD identifies ADA ramps at all four entrances and accessible seating for district events. Event-specific parking and seating guidance should be checked before travel.',
      bagAndEntry: 'Prosper ISD currently requires clear bags for ticketed athletics and fine-arts events and uses cashless payments. Stadium maps and prohibited-item rules remain event-controlled.',
    },
    editorialStory: 'Children’s Health Stadium is Prosper ISD’s 12,000-seat district stadium at 2000 Stadium Drive, serving multiple high schools as well as graduations and district events. Current clear-bag, cashless and event-specific gate and parking guidance provide more value than generic North Dallas suburb copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.prosper },
  },
  'ratliff-stadium': {
    visitorFacts: {
      homeTeams: ['Permian Panthers football', 'Odessa High football'],
      leagueOrConference: 'Texas high-school football, UIL playoffs and track events',
      accessibility: 'Ector County ISD publishes current Ratliff Stadium policy and event information. Visitors should use the district’s current traffic, ticketing and accessibility instructions rather than older third-party venue summaries.',
    },
    editorialStory: 'Ratliff Stadium is one of the defining high-school football settings in West Texas, serving Ector County ISD and the Odessa programs whose football culture became nationally recognizable through Friday Night Lights. The district’s current traffic, ticket and stadium-policy information is more reliable for visitors than an unverified capacity or address copied from secondary listings.',
    sourceReview: { reviewedAt, authoritativeSources: sources.ratliff },
  },
  'mesquite-memorial-stadium': {
    visitorFacts: {
      address: '2411 W. Scyene Rd., Mesquite, TX 75149',
      homeTeams: ['Mesquite ISD football and soccer programs'],
      leagueOrConference: 'Texas high-school football, soccer and UIL events',
      bagAndEntry: 'Mesquite ISD currently permits clear bags up to 12 by 12 by 6 inches, small clutches up to 5.5 by 8.5 inches and one-gallon clear freezer bags, with stated medical, diaper and camera exceptions.',
    },
    editorialStory: 'Memorial Stadium is Mesquite ISD’s W. Scyene Road football and soccer venue, serving district games and high-school event traffic. Its current clear-bag and security rules make district guidance the useful planning source rather than an unsupported capacity figure or generic Dallas-area copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.mesquite },
  },
  'lupton-stadium': {
    visitorFacts: {
      address: '3700 Berry Street, Fort Worth, TX 76109',
      capacity: '4,500',
      opened: '2003',
      homeTeams: ['TCU Horned Frogs baseball'],
      playingSurface: 'Natural grass',
      leagueOrConference: 'NCAA Division I — Big 12 Conference',
      accessibility: 'TCU publishes current facility and baseball information. Parking, accessible routes and postseason operations should be checked against the current event plan.',
    },
    editorialStory: 'Charlie and Marie Lupton Baseball Stadium at Williams-Reilly Field opened in 2003 as TCU baseball’s 4,500-seat natural-grass home on Berry Street. Its close-to-the-field design, postseason history and TCU campus setting make it a distinct Fort Worth college-baseball venue rather than generic Metroplex sports copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.lupton },
  },
  'reckling-park': {
    visitorFacts: {
      capacity: '6,193',
      opened: '2000',
      homeTeams: ['Rice Owls baseball'],
      leagueOrConference: 'NCAA Division I baseball',
      accessibility: 'Rice Athletics publishes current facility and campus information. Event parking and accessible routes should be checked against the current baseball or campus plan.',
    },
    editorialStory: 'Reckling Park opened in 2000 on the former Cameron Field site as Rice baseball’s on-campus home. Current Rice baseball materials list 6,193 seats, while the park’s campus and Texas Medical Center setting and long postseason history provide a stronger visitor story than generic Houston baseball copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.reckling },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE8: Record<string, SportsVenueEnrichment> = {
  'nelson-wolff-stadium': {
    city: 'San Antonio',
    capacity: '6,200 fixed seats plus a grass berm for approximately 3,000',
    opened: '1994',
    primaryEvents: ['San Antonio Missions Double-A baseball', 'Texas League games', 'Ballpark special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['nelson-wolff-stadium'].editorialStory,
    parking: 'Wolff Stadium uses first-base and third-base parking approaches around its U.S. 90 site. Prices and operating details can change, so use the current Missions guide rather than an evergreen dollar amount.',
    arrival: 'The ballpark is at 5757 US Hwy 90 West. Current Missions guidance normally opens gates one hour before game time; the event schedule and entry policy should control on special-event dates.',
    stayAndEat: 'The stadium is on San Antonio’s west side rather than downtown. Lodging or dining should be chosen for the U.S. 90 corridor or the broader trip rather than implying River Walk walkability.',
    nearby: 'The immediate west-side San Antonio context is more defensible than downtown attractions presented as stadium-adjacent.',
    planningLinks: [...sources.wolff],
    imageBrief: 'Nelson W. Wolff Municipal Stadium in San Antonio during a Missions baseball game, showing the seating bowl and west-side ballpark setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'retama-park': {
    city: 'Selma',
    opened: '1995',
    primaryEvents: ['Live Quarter Horse racing', 'Year-round simulcast wagering', 'Special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['retama-park'].editorialStory,
    parking: 'Retama Park currently offers free parking for live-racing and simulcast guests, but special-event operations can differ. Use the current event page rather than treating today’s parking policy as permanent.',
    arrival: 'Retama Park is in Selma off the I-35/Retama Parkway corridor. Live racing, simulcast days and special events have different schedules, so confirm the current gate and post time before travel.',
    stayAndEat: 'Selma and the northeast San Antonio corridor are the useful immediate geography. Downtown San Antonio is a separate destination rather than track-adjacent.',
    nearby: 'The track’s same-property racing and simulcast uses are the strongest connections; other San Antonio-area stops should be itinerary-driven.',
    planningLinks: [...sources.retama],
    imageBrief: 'Retama Park in Selma during live horse racing, showing the track, grandstand and northeast San Antonio-area setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'momentum-bank-ballpark': {
    city: 'Midland',
    capacity: '4,709 seats; 6,669 total with berm areas',
    opened: '2002',
    primaryEvents: ['Midland RockHounds Double-A baseball', 'Texas League games', 'Ballpark community events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['momentum-bank-ballpark'].editorialStory,
    parking: 'The ballpark is part of Midland’s sports complex. Use current RockHounds directions and event instructions; gate timing varies by day and should not be reduced to one permanent rule.',
    arrival: 'Momentum Bank Ballpark is at 5514 Champions Drive. The current A-Z guide controls clear-bag, cashless, re-entry and gate procedures, which can differ by event or day of week.',
    stayAndEat: 'Midland is the correct visitor frame. The ballpark should not be treated as a generic West Texas stop without acknowledging its local sports-complex setting.',
    nearby: 'Same-complex sports facilities and Midland destinations are appropriate only when they fit the actual itinerary.',
    planningLinks: [...sources.momentum],
    imageBrief: 'Momentum Bank Ballpark in Midland during a RockHounds game, showing the seating bowl, berm areas and West Texas setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'bowers-stadium': {
    city: 'Huntsville',
    capacity: '14,000',
    opened: '1986',
    primaryEvents: ['Sam Houston Bearkats football', 'College football', 'Track and university events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['bowers-stadium'].editorialStory,
    parking: 'Bowers Stadium is part of the Sam Houston athletics campus. Current football maps and construction-sensitive instructions should control because the west-side modernization can affect circulation.',
    arrival: 'The stadium is at 620 Bowers Boulevard in Huntsville. For high-demand games, allow time for university traffic and use the current game-day route rather than an older parking assumption.',
    stayAndEat: 'Sam Houston and Huntsville are the immediate visitor context. Broader East Texas attractions should not be presented as stadium-adjacent without a real itinerary connection.',
    nearby: 'Other Sam Houston athletics and campus facilities are the strongest direct relationships.',
    planningLinks: [...sources.bowers],
    imageBrief: 'Bowers Stadium at Sam Houston in Huntsville during a football game, showing the university setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'mckinney-isd-stadium': {
    city: 'McKinney',
    primaryEvents: ['McKinney ISD varsity football', 'UIL playoff football', 'NCAA Division II Football Championship'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['mckinney-isd-stadium'].editorialStory,
    parking: 'McKinney ISD publishes separate home-side and visitor-side approaches plus accessible parking information. Parking on surrounding private business property is prohibited, so the district map should control.',
    arrival: 'The stadium is at 4201 S. Hardin Boulevard near Highway 121. Current varsity admission is electronic, and large playoff/championship crowds make preselected parking and entry important.',
    stayAndEat: 'McKinney and the Highway 121 corridor are the relevant visitor geography. Historic downtown can support a longer trip but is not part of the stadium grounds.',
    nearby: 'District athletics facilities and McKinney destinations should be linked only when the event itinerary supports them.',
    planningLinks: [...sources.mckinney],
    imageBrief: 'McKinney ISD Stadium during a major high-school or NCAA Division II football event, showing the modern district venue without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'childrens-health-stadium-prosper': {
    city: 'Prosper',
    capacity: '12,000',
    primaryEvents: ['Prosper ISD varsity football', 'UIL events', 'Graduations and district ceremonies'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['childrens-health-stadium-prosper'].editorialStory,
    parking: 'Prosper ISD publishes stadium maps, parking and tailgating guidance. District events can use different sides of the complex, so confirm the event map before arrival.',
    arrival: 'The stadium is at 2000 Stadium Drive in Prosper. Clear-bag and cashless policies apply to current ticketed district events; allow time for security on high-attendance dates.',
    stayAndEat: 'Prosper and the north Collin County/Frisco corridor are the practical visitor frame without implying that other North Texas sports venues are adjacent.',
    nearby: 'Prosper ISD facilities and local dining/lodging are the strongest defensible connections; broader Frisco attractions are separate trip choices.',
    planningLinks: [...sources.prosper],
    imageBrief: 'Children’s Health Stadium in Prosper during a Texas high-school football night, showing the district stadium and North Texas setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'ratliff-stadium': {
    city: 'Odessa',
    primaryEvents: ['Permian Panthers football', 'Odessa High football', 'UIL playoff football and track events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['ratliff-stadium'].editorialStory,
    parking: 'Ector County ISD publishes Ratliff Stadium policies, traffic procedures and ticket information. Rivalry and playoff games can use dedicated traffic controls, so the current district plan should control.',
    arrival: 'Treat a major Permian or Odessa game as a large community event. Allow time for district traffic management, ticket entry and the walk from parking rather than relying on an unsupported venue-capacity estimate.',
    stayAndEat: 'Odessa is the correct immediate frame. Midland can be part of a broader Permian Basin trip, but it should not be described as stadium-adjacent.',
    nearby: 'Ector County ISD athletics and Odessa destinations are the strongest local connections; broader Permian Basin stops are separate itinerary choices.',
    planningLinks: [...sources.ratliff],
    imageBrief: 'Ratliff Stadium in Odessa on a West Texas high-school football night with packed stands and open-sky atmosphere, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'mesquite-memorial-stadium': {
    city: 'Mesquite',
    primaryEvents: ['Mesquite ISD varsity football', 'UIL football and soccer events', 'District athletic competitions'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['mesquite-memorial-stadium'].editorialStory,
    parking: 'Mesquite ISD publishes stadium directions and event procedures. Visitors should confirm the hosting venue and current entrance plan rather than using the school-campus address.',
    arrival: 'Memorial Stadium is at 2411 W. Scyene Road. Current clear-bag and security procedures should be reviewed before a varsity or playoff event.',
    stayAndEat: 'Mesquite’s east-Dallas-area location is the relevant context. A broader Dallas trip is possible but should not be presented as if downtown attractions are next to the stadium.',
    nearby: 'Mesquite ISD facilities and local dining are defensible connections; broader Dallas destinations should be itinerary-driven.',
    planningLinks: [...sources.mesquite],
    imageBrief: 'Mesquite Memorial Stadium during a North Texas high-school football event with field, stands and marching-band atmosphere, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'lupton-stadium': {
    city: 'Fort Worth',
    capacity: '4,500',
    opened: '2003',
    primaryEvents: ['TCU Horned Frogs baseball', 'Big 12 baseball series', 'NCAA postseason baseball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['lupton-stadium'].editorialStory,
    parking: 'Lupton Stadium is part of the TCU athletics campus. Current baseball and postseason event instructions should control parking and access instead of a generic Fort Worth parking plan.',
    arrival: 'The ballpark is at 3700 Berry Street. Rivalry and NCAA postseason games can increase campus traffic, so event-specific TCU guidance should control arrival.',
    stayAndEat: 'TCU and southwest-central Fort Worth are the immediate context. The Stockyards and downtown are separate visitor districts.',
    nearby: 'Amon G. Carter Stadium and other TCU athletics facilities are direct campus relationships.',
    planningLinks: [...sources.lupton],
    imageBrief: 'Lupton Stadium at TCU during a college baseball game, showing the natural-grass field and Fort Worth campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'reckling-park': {
    city: 'Houston',
    capacity: '6,193',
    opened: '2000',
    primaryEvents: ['Rice Owls baseball', 'College baseball series', 'NCAA postseason baseball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE8['reckling-park'].editorialStory,
    parking: 'Reckling Park is on the Rice University campus. Current baseball and campus parking instructions should control rather than stale event-lot assumptions.',
    arrival: 'The ballpark sits on the Rice campus near the Texas Medical Center. Allow time for campus circulation and event-specific parking before first pitch.',
    stayAndEat: 'Rice University, the Texas Medical Center and nearby central-Houston neighborhoods are the useful geography. Downtown sports districts are separate.',
    nearby: 'Rice Stadium and other Rice athletics facilities are direct campus relationships; Hermann Park and the Museum District are nearby city destinations but separate from the ballpark.',
    planningLinks: [...sources.reckling],
    imageBrief: 'Reckling Park at Rice University during a baseball game, showing the ballpark and Houston campus/medical-center context without added text or logos.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave8(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE8[slug];
}

export function getSportsVenueQualityProfileWave8(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE8[slug];
}
