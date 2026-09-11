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

export type SportsVenueQualityProfileWave3 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  baylorBallpark: [
    { label: 'Baylor Ballpark facility page', url: 'https://baylorbears.com/facilities/baylor-ballpark/1198' },
    { label: 'Baylor Ballpark historical facility guide', url: 'https://baylorbears.com/sports/2018/5/16/facilities-ballpark-html' },
    { label: 'Baylor baseball schedule', url: 'https://baylorbears.com/sports/baseball/schedule' },
  ],
  cutx: [
    { label: 'Credit Union of Texas Event Center arena overview', url: 'https://www.cutxeventcenter.com/arena-info/about-the-arena' },
    { label: 'Directions and parking', url: 'https://www.cutxeventcenter.com/92/Directions-Parking' },
    { label: 'Arena A-Z guide', url: 'https://www.cutxeventcenter.com/plan-your-visit/a-z-guide' },
    { label: 'Arena bag policy', url: 'https://www.cutxeventcenter.com/plan-your-visit/bag-policy' },
  ],
  reedArena: [
    { label: 'Reed Arena facility page', url: 'https://12thman.com/facilities/reed-arena' },
    { label: 'Reed Arena A-Z guide', url: 'https://12thman.com/facilities/a-to-z/reed-arena' },
    { label: 'Texas A&M basketball parking', url: 'https://transport.tamu.edu/Parking/events/basketball.aspx' },
  ],
  whataburgerField: [
    { label: 'Whataburger Field official guide', url: 'https://www.milb.com/corpus-christi/ballpark' },
    { label: 'Whataburger Field A-Z guide', url: 'https://www.milb.com/corpus-christi/ballpark/guide' },
    { label: 'Whataburger Field event-space facts', url: 'https://www.milb.com/corpus-christi/ballpark/field' },
    { label: 'Corpus Christi Hooks front office', url: 'https://www.milb.com/corpus-christi/team/front-office' },
  ],
  memorialPark: [
    { label: 'Memorial Park Golf Course', url: 'https://www.memorialparkgolf.com/memorial-park-golf-course' },
    { label: 'Memorial Park Golf Course contact and address', url: 'https://www.memorialparkgolf.com/contact' },
    { label: 'City of Houston golf courses', url: 'https://www.houstontx.gov/parks/golf.html' },
    { label: 'City of Houston Houston Open history', url: 'https://www.houstontx.gov/events/houston-open-golf.html' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE3: Record<string, SportsVenueQualityProfileWave3> = {
  'baylor-ballpark': {
    visitorFacts: {
      capacity: '5,000',
      opened: 'First season 1999; completed for the 2000 season and dedicated in 2001',
      homeTeams: ['Baylor Bears baseball'],
      leagueOrConference: 'NCAA Division I — Big 12 Conference',
      accessibility: 'Baylor describes four entrances into the main grandstand plus an additional ramp for disabled fans. Current game-day parking and access instructions should control because athletics operations can change by event.',
    },
    editorialStory: 'Baylor Ballpark began hosting the Bears in 1999 while construction continued, was completed for the 2000 season and dedicated in 2001. In January 2026 Baylor introduced the Magnolia Field name, with the naming gift supporting refreshed branding, the main entrance and a new turf halo. The red-brick, exposed-green-steel ballpark sits in the Jim and Julie Turner Riverfront Athletic Complex on the Brazos River, giving the venue a specific riverfront-campus identity.',
    sourceReview: { reviewedAt, authoritativeSources: sources.baylorBallpark },
  },
  'credit-union-of-texas-event-center': {
    visitorFacts: {
      address: '200 E. Stacy Road #1350, Allen, TX 75002',
      capacity: '7,000+',
      homeTeams: ['Allen Americans'],
      leagueOrConference: 'ECHL hockey plus multipurpose arena events',
      accessibility: 'The arena offers assistive listening devices at the Jack Henry Desk and publishes event-day drop-off guidance near Allen Community Ice Rink. Guests needing accommodations should use the current arena accessibility and A-Z guidance.',
      bagAndEntry: 'The arena uses a clear-bag and small-clutch policy for most events, including Allen Americans games, while some events can be more restrictive. Doors typically open one hour before the event start time; the individual event page should control.',
    },
    editorialStory: 'Credit Union of Texas Event Center is a City of Allen-owned and managed 7,000-plus-seat arena formerly known as Allen Event Center. The venue hosts more than 100 events annually and serves as the Allen Americans’ ECHL home while also handling concerts, graduations, trade shows and touring sports. Its location inside The Village at Allen is operationally important because event parking is directed to the South Parking Garage rather than the surrounding uncovered retail lots.',
    sourceReview: { reviewedAt, authoritativeSources: sources.cutx },
  },
  'reed-arena': {
    visitorFacts: {
      address: '730 Olsen Blvd., College Station, TX 77843',
      capacity: '12,989',
      opened: 'Fall 1998',
      homeTeams: ['Texas A&M men’s basketball', 'Texas A&M women’s basketball', 'Texas A&M volleyball'],
      leagueOrConference: 'NCAA Division I — Southeastern Conference (SEC)',
      accessibility: 'Texas A&M identifies Lot 102 as Reed Arena’s designated ADA parking area for basketball and provides accessible seating and guest-services guidance. Event-specific parking maps should control.',
      bagAndEntry: 'Texas A&M and the SEC use the 12-1-1 clear-bag policy at Reed Arena, with bags searched at entry. Non-athletics events can apply additional restrictions, so the event-specific guide should be checked before travel.',
    },
    editorialStory: 'Reed Arena opened in fall 1998 as Texas A&M’s 12,989-seat special-events center on the west side of campus. It is the home of Aggie men’s and women’s basketball and volleyball and also hosts commencement, concerts and other university events. The building is named for Dr. Chester J. Reed and Billie Jean Reed, whose land gift helped create the funding base for the facility.',
    sourceReview: { reviewedAt, authoritativeSources: sources.reedArena },
  },
  'whataburger-field': {
    visitorFacts: {
      address: '734 E. Port Avenue, Corpus Christi, TX 78401',
      capacity: '5,391 stadium seats plus 288 suite-level seats; field-and-concourse event capacity up to 10,400',
      opened: '2005',
      homeTeams: ['Corpus Christi Hooks'],
      leagueOrConference: 'Double-A — Texas League; Houston Astros affiliate',
      accessibility: 'The Hooks publish accessible seating throughout the ballpark and ADA parking in the South and West lots. Visitors who need accessible seating should use the current ballpark guide or ticket office.',
      bagAndEntry: 'Each fan may bring one bag no larger than 16 by 16 inches; larger bags must be clear plastic or vinyl and all bags are searched. Standard Hooks-game gates currently open 60 minutes before first pitch and 90 minutes before premium giveaway dates, but the current event page should control.',
    },
    editorialStory: 'Whataburger Field opened in 2005 as the $25 million home of the Corpus Christi Hooks on former Port of Corpus Christi cotton-warehouse land. Its wood beams, corrugated siding and antique cotton presses deliberately reference the site’s industrial history, while oceangoing ships remain visible on the nearby channel. That harbor-front setting—not generic Gulf Coast tourism language—is the ballpark’s defining visitor context.',
    sourceReview: { reviewedAt, authoritativeSources: sources.whataburgerField },
  },
  'memorial-park-golf-course': {
    visitorFacts: {
      address: '1001 E Memorial Loop Drive, Houston, TX 77007',
      opened: 'July 1936; major modern renovation completed before the Houston Open returned in 2020',
      homeTeams: [],
      leagueOrConference: 'City of Houston municipal golf course; PGA TOUR and major-championship host',
    },
    editorialStory: 'Memorial Park Golf Course grew from a nine-hole sand-green course associated with Camp Logan and convalescent soldiers into the municipal course John Bredemus redesigned in the 1930s and opened in July 1936. It hosted the Houston Open repeatedly in the mid-20th century, then underwent a major Astros Golf Foundation-led renovation before the tournament returned in 2020. Its public-municipal identity and tournament history are the durable story, not resort-style golf copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.memorialPark },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE3: Record<string, SportsVenueEnrichment> = {
  'baylor-ballpark': {
    city: 'Waco',
    capacity: '5,000',
    opened: 'First season 1999; completed for the 2000 season and dedicated in 2001',
    primaryEvents: ['Baylor Bears baseball', 'Big 12 college-baseball series', 'NCAA postseason baseball when awarded'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE3['baylor-ballpark'].editorialStory,
    parking: 'Baylor directs baseball visitors through its current game-day and facility information. Parking around the riverfront athletics complex is limited and can change with concurrent campus events, so use the current Baylor directions and event instructions rather than assuming ordinary campus spaces are available.',
    arrival: 'Magnolia Field at Baylor Ballpark is in the Jim and Julie Turner Riverfront Athletic Complex along University Parks Drive. Major conference and postseason dates warrant extra time for parking and the walk to the ballpark; do not infer a universal gate-opening time from ticket-office hours.',
    stayAndEat: 'The Brazos River, Baylor campus and downtown edge are genuinely part of the ballpark’s geography. Keep lodging and dining recommendations tied to that Waco riverfront context rather than padding the guide with unrelated Central Texas attractions.',
    nearby: 'Foster Pavilion and McLane Stadium are meaningful Baylor sports connections, while the riverfront complex itself includes other university athletics facilities. Present them as separate stops, not as if every facility is at the same entrance.',
    planningLinks: [...sources.baylorBallpark],
    imageBrief: 'Magnolia Field at Baylor Ballpark in Waco, showing the red-brick and green-steel grandstand, baseball field and Brazos River campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'credit-union-of-texas-event-center': {
    city: 'Allen',
    capacity: '7,000+',
    primaryEvents: ['Allen Americans ECHL hockey', 'Indoor sports and ice events', 'Concerts, graduations and touring events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE3['credit-union-of-texas-event-center'].editorialStory,
    parking: 'The venue directs event traffic to the South Parking Garage and explicitly says event-day parking is not permitted in the uncovered retail lots surrounding the arena. Follow arena signs and the event page instead of choosing the nearest retail space.',
    arrival: 'Doors typically open one hour before the event start time, and the arena publishes a south-side drop-off and pick-up area near Allen Community Ice Rink for most events. Because concerts and touring events can apply different entry rules, use the current event page before leaving.',
    stayAndEat: 'The arena sits inside The Village at Allen, where lodging, restaurants and shopping are genuinely adjacent; the venue itself identifies a Courtyard by Marriott next door. That immediate mixed-use district is the useful visitor context rather than broad Dallas-area sightseeing.',
    nearby: 'Allen Community Ice Rink and The Village at Allen are the strongest immediate connections. Eagle Stadium is elsewhere in Allen and should be treated as a separate sports stop rather than venue-adjacent.',
    planningLinks: [...sources.cutx],
    imageBrief: 'Credit Union of Texas Event Center in Allen with the arena exterior, South Parking Garage and mixed-use Village at Allen context visible; no added logos or text.',
    verifiedAt: reviewedAt,
  },
  'reed-arena': {
    city: 'College Station',
    capacity: '12,989',
    opened: 'Fall 1998',
    primaryEvents: ['Texas A&M men’s basketball', 'Texas A&M women’s basketball', 'Texas A&M volleyball and major university events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE3['reed-arena'].editorialStory,
    parking: 'Texas A&M uses event-specific parking around Reed Arena. Basketball guidance identifies designated surrounding lots and Lot 102 for ADA parking; campus permit rules can also change outside event operations, so use Transportation Services and the current event map rather than an old lot routine or fixed price.',
    arrival: 'Reed Arena is on west campus at 730 Olsen Boulevard. Major Aggie events can overlap with other campus traffic, so choose the correct event parking area before entering west campus and allow time for the walk and security screening.',
    stayAndEat: 'For an arena-focused trip, the Texas A&M campus and College Station are the relevant geography. Choose lodging for practical campus access rather than turning every basketball visit into a generic Bryan–College Station attraction list.',
    nearby: 'Kyle Field and Olsen Field at Blue Bell Park are meaningful same-campus sports landmarks, but each has its own parking and event operations and should be treated as a separate stop.',
    planningLinks: [...sources.reedArena],
    imageBrief: 'Reed Arena on the Texas A&M campus in College Station during a basketball event, showing the arena and west-campus setting without added logos or text.',
    verifiedAt: reviewedAt,
  },
  'whataburger-field': {
    city: 'Corpus Christi',
    capacity: '5,391 stadium seats plus 288 suite-level seats; event capacity up to 10,400',
    opened: '2005',
    primaryEvents: ['Corpus Christi Hooks Double-A baseball', 'Texas League series', 'Concerts, festivals and special field events when scheduled'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE3['whataburger-field'].editorialStory,
    parking: 'The Hooks publish current ballpark parking guidance, including ADA spaces in the South and West lots and pass-controlled parking in the West Lot. Prices and special-event layouts can change, so use the current A-Z guide rather than preserving an evergreen parking price.',
    arrival: 'For standard Hooks games, the current guide lists gates opening 60 minutes before first pitch and 90 minutes before premium giveaway dates. Special events can use different timing, so the individual event or team guide should override that baseball pattern.',
    stayAndEat: 'Whataburger Field is a harbor-front Corpus Christi ballpark at 734 E. Port Avenue, not a suburban complex. Downtown and the working port are the defensible surrounding context; beach or island trips should be treated as separate itinerary decisions.',
    nearby: 'The Port of Corpus Christi channel and downtown waterfront explain the ballpark setting. Broader Coastal Bend attractions should appear only when a guide gives them enough travel time and editorial relevance.',
    planningLinks: [...sources.whataburgerField],
    imageBrief: 'Whataburger Field in Corpus Christi with the baseball grandstand, industrial cotton-warehouse design cues and harbor channel context visible; no added logos or text.',
    verifiedAt: reviewedAt,
  },
  'memorial-park-golf-course': {
    city: 'Houston',
    opened: 'July 1936; major renovation completed before tournament golf returned in 2020',
    primaryEvents: ["Texas Children’s Houston Open", 'Chevron Championship', 'Public municipal golf'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE3['memorial-park-golf-course'].editorialStory,
    parking: 'Paid parking is available in the golf-course and other Memorial Park lots, with the official course directing visitors to meters, the ParkHouston app or phone payment. Tournament weeks use separate spectator logistics, so the tournament’s current transportation plan should supersede ordinary public-play parking.',
    arrival: 'Public play should be planned around a confirmed tee time. The course is closed on Tuesdays for routine maintenance while the driving range follows separate hours; tournament and championship weeks can further change normal access.',
    stayAndEat: 'Memorial Park Golf Course is a public municipal course inside Houston’s Memorial Park, so the relevant context is the park and nearby central-Houston neighborhoods rather than a self-contained golf resort.',
    nearby: 'The broader Memorial Park trail and recreation system is the immediate companion destination. Other Houston attractions require a separate travel decision and should not be described as golf-course adjacent without evidence.',
    planningLinks: [...sources.memorialPark],
    imageBrief: 'Memorial Park Golf Course in Houston showing the mature-tree municipal championship layout and public-park setting; no added tournament logos or text.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave3(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE3[slug];
}

export function getSportsVenueQualityProfileWave3(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE3[slug];
}
