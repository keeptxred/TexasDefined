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

export type SportsVenueQualityProfileWave4 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  cota: [
    { label: 'Circuit of The Americas overview', url: 'https://circuitoftheamericas.com/about/' },
    { label: 'COTA circuit history', url: 'https://circuitoftheamericas.com/timeline/' },
    { label: 'Getting to COTA', url: 'https://circuitoftheamericas.com/getting-to-cota/' },
    { label: 'COTA contact and address', url: 'https://circuitoftheamericas.com/contact/' },
  ],
  cyFair: [
    { label: 'CFISD Cy-Fair FCU Stadium', url: 'https://www.cfisd.net/athletics/facilities/cy-fair-federal-credit-union-stadium' },
    { label: 'Berry Center stadium rules', url: 'https://berrycenter.cfisd.net/plan-your-visit/stadium-rules' },
    { label: 'Berry Center visitor planning', url: 'https://berrycenter.cfisd.net/plan-your-visit' },
  ],
  galaxy: [
    { label: 'Galaxy Stadium facility page', url: 'https://texastech.com/facilities/jones-at-t-stadium/2' },
    { label: '2026 Galaxy Stadium fan information', url: 'https://texastech.com/news/2026/9/2/football-texas-tech-announces-fan-information-for-2026-season' },
    { label: 'Gameday in Raiderland', url: 'https://texastech.com/sports/2026/7/15/gameday-in-raiderland' },
    { label: 'Galaxy Stadium naming announcement', url: 'https://texastech.com/news/2026/7/17/football-texas-tech-secures-landmark-naming-rights-agreement-with-galaxy' },
  ],
  moody: [
    { label: 'Moody Center fast facts', url: 'https://moodycenteratx.com/fast-facts/' },
    { label: 'Moody Center A-Z guide', url: 'https://moodycenteratx.com/a-z-guide/' },
    { label: 'Moody Center accessibility', url: 'https://moodycenteratx.com/accessibility/' },
    { label: 'Moody Center trip planning', url: 'https://moodycenteratx.com/plan-my-trip/' },
  ],
  q2: [
    { label: 'Q2 Stadium parking', url: 'https://www.austinfc.com/stadium/parking' },
    { label: 'Q2 Stadium A-Z guide', url: 'https://www.austinfc.com/stadium/az-guide' },
    { label: 'Q2 Stadium know before you go', url: 'https://www.austinfc.com/stadium/know-before-you-go' },
    { label: 'Q2 Stadium opening match', url: 'https://www.austinfc.com/news/austin-fc-earns-another-point-0-0-draw-against-san-jose-earthquakes' },
  ],
  rrMpc: [
    { label: 'Round Rock Multipurpose Complex overview', url: 'https://roundrockmpc.com/the-complex/' },
    { label: 'Round Rock Multipurpose Complex field layout', url: 'https://roundrockmpc.com/field-layout/' },
    { label: 'Round Rock Multipurpose Complex tournaments', url: 'https://roundrockmpc.com/tournaments/' },
    { label: 'Round Rock Multipurpose Complex location', url: 'https://roundrockmpc.com/location-contact/' },
  ],
  rrSportsCenter: [
    { label: 'Round Rock Sports Center overview', url: 'https://rrsportscenter.com/sports-center/' },
    { label: 'Round Rock Sports Center floorplans', url: 'https://rrsportscenter.com/floorplans/' },
    { label: 'Round Rock Sports Center tournaments', url: 'https://rrsportscenter.com/tournaments/' },
    { label: 'Round Rock Sports Center location', url: 'https://rrsportscenter.com/location-contact/' },
  ],
  samHouston: [
    { label: 'Sam Houston Race Park about', url: 'https://www.shrp.com/about-us' },
    { label: 'Sam Houston Race Park visitor guide', url: 'https://www.shrp.com/visit' },
    { label: 'Sam Houston Race Park contact and parking', url: 'https://www.shrp.com/about-us/contact-us' },
    { label: 'Sam Houston Race Park tickets', url: 'https://www.shrp.com/tickets' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE4: Record<string, SportsVenueQualityProfileWave4> = {
  'circuit-of-the-americas': {
    visitorFacts: {
      address: '9201 Circuit of The Americas Blvd., Austin, TX 78617',
      opened: '2012',
      homeTeams: [],
      playingSurface: '3.41-mile, 20-turn purpose-built road circuit',
      leagueOrConference: 'Formula 1 United States Grand Prix, MotoGP and other major motorsports',
      accessibility: 'COTA publishes event-specific ADA access and parking guidance and provides a dedicated accessibility contact. Major-event layouts can change, so the current event guide should control.',
    },
    editorialStory: 'Circuit of The Americas opened to the public in 2012 and hosted its inaugural Formula 1 United States Grand Prix that November. The purpose-built 3.41-mile, 20-turn circuit rises sharply to Turn 1 and sits on a large southeast-Austin property designed around international motorsports. Its scale, elevation and event traffic are the durable visitor story—not generic downtown-Austin weekend language.',
    sourceReview: { reviewedAt, authoritativeSources: sources.cota },
  },
  'cy-fair-fcu-stadium': {
    visitorFacts: {
      address: '8877 Barker Cypress Rd., Cypress, TX 77433',
      capacity: '11,000',
      homeTeams: ['Cypress-Fairbanks ISD high-school programs'],
      leagueOrConference: 'UIL high-school football, soccer, track and district events',
      bagAndEntry: 'CFISD currently allows fully transparent bags without a size limit and limits non-transparent bags to 6 by 9 by 5 inches, with medical exceptions after inspection. Stadium gates open one hour before game time, guests pass through metal detectors, tailgating is prohibited on CFISD property and re-entry is not allowed.',
    },
    editorialStory: 'Cy-Fair Federal Credit Union Stadium is CFISD’s 11,000-seat outdoor stadium at the Berry Center complex in Cypress. A 2016 naming-rights partnership gave the venue its current name, while the stadium continues to serve district football, soccer and track rather than a single school. The shared Berry Center campus and district operating rules—not generic northwest-Houston attractions—define the event-day experience.',
    sourceReview: { reviewedAt, authoritativeSources: sources.cyFair },
  },
  'jones-att-stadium': {
    visitorFacts: {
      opened: 'Texas Tech football home since 1947; Galaxy Stadium name began in 2026',
      homeTeams: ['Texas Tech Red Raiders football'],
      leagueOrConference: 'NCAA Division I FBS — Big 12 Conference',
      bagAndEntry: 'For the 2026 season, Texas Tech uses a clear-bag policy allowing clear bags up to 12 by 6 by 12 inches, one-gallon clear freezer bags, small clutches and inspected medical items. Most Galaxy Stadium gates open 90 minutes before kickoff, selected premium/student gates open two hours before kickoff and re-entry is not permitted without a new ticket.',
    },
    editorialStory: 'Texas Tech’s football stadium has anchored Red Raider game day since 1947 and took the Galaxy Stadium name for the 2026 season under a 15-year naming-rights agreement. The current visitor experience combines the historic campus venue with modern security, cashless operations, shuttle service and a stable TexasDefined route retained under the former Jones AT&T Stadium slug so older links do not break.',
    sourceReview: { reviewedAt, authoritativeSources: sources.galaxy },
  },
  'moody-center': {
    visitorFacts: {
      address: '2001 Robert Dedman Dr., Austin, TX 78712',
      capacity: '15,000+ for concerts; 10,000+ basketball configuration',
      opened: 'First public event April 20, 2022; grand opening April 29–30, 2022',
      homeTeams: ['Texas Longhorns men’s basketball', 'Texas Longhorns women’s basketball'],
      leagueOrConference: 'NCAA Division I — Southeastern Conference (SEC); major concert arena',
      accessibility: 'Moody Center publishes accessible seating on every level, accessible parking options, assistive-listening services and other accommodations. Event-specific parking and entry information should control because garage availability varies.',
      bagAndEntry: 'Moody Center currently permits bags up to 14 by 14 by 6 inches and small non-clear clutches within its published limit, with all guests subject to the current A-Z entry policy. Event promoters can impose additional restrictions.',
    },
    editorialStory: 'Moody Center opened in April 2022 on the University of Texas campus as the Longhorns’ basketball home and a concert-first arena. The 530,000-square-foot building scales from a 10,000-plus basketball configuration to more than 15,000 concert seats, making its campus-edge location, event configuration and central-Austin access more relevant than generic nightlife copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.moody },
  },
  'q2-stadium': {
    visitorFacts: {
      address: '10414 McKalla Place, Austin, TX 78758',
      capacity: '20,500+ seats; Austin FC sellouts have drawn 20,738',
      opened: 'First matches June 2021',
      homeTeams: ['Austin FC'],
      leagueOrConference: 'Major League Soccer',
      accessibility: 'Q2 Stadium provides accessible seating and circulation, accessible parking subject to availability, assistive-listening devices, wheelchair assistance and a sensory room. Current event guidance should control specific accommodations.',
      bagAndEntry: 'Q2 Stadium currently operates a no-bag policy, including clear bags, with limited exceptions for small clutches and medical, childcare or cultural items after screening. Re-entry is not permitted.',
    },
    editorialStory: 'Q2 Stadium opened for matches in June 2021 as Austin FC’s purpose-built North Austin home. The City of Austin-owned venue sits at McKalla Place and was designed around more than automobile access: CapMetro rail and buses, bicycles, rideshare and prepaid parking all shape match day. That mobility network and soccer-specific setting are the durable planning facts.',
    sourceReview: { reviewedAt, authoritativeSources: sources.q2 },
  },
  'round-rock-multipurpose-complex': {
    visitorFacts: {
      address: '2001 N. Kenney Fort Blvd., Round Rock, TX 78665',
      opened: 'Spring 2017',
      homeTeams: [],
      playingSurface: 'Five Tifway 419 Bermuda grass fields and five Prestige XT synthetic-turf fields',
      leagueOrConference: 'Tournament soccer, football, rugby, lacrosse, ultimate and other field sports',
    },
    editorialStory: 'Round Rock Multipurpose Complex opened for play in spring 2017 as a 60-acre expansion of Old Settlers Park. Its ten lighted fields split evenly between natural grass and synthetic turf, with separate grass and turf championship fields, 938 parking spaces and shaded permanent seating at the championship venues. The field assignment and tournament schedule—not generic Austin-area sightseeing—drive the visitor plan.',
    sourceReview: { reviewedAt, authoritativeSources: sources.rrMpc },
  },
  'round-rock-sports-center': {
    visitorFacts: {
      address: '2400 Chisholm Trail, Round Rock, TX 78681',
      capacity: 'More than 6,500 total; seating for more than 2,200 spectators',
      homeTeams: [],
      playingSurface: '63,995 square feet of flexible indoor playable space',
      leagueOrConference: 'Basketball, volleyball and multi-sport tournament venue',
    },
    editorialStory: 'Round Rock Sports Center is a 118,750-square-foot indoor tournament facility with 63,995 square feet of flexible playable space. It can be configured for eight high-school basketball courts, sixteen high-school volleyball courts or four NCAA basketball courts, while seating more than 2,200 spectators and accommodating more than 6,500 people overall. For traveling teams, court assignment and tournament timing matter more than generic city attractions.',
    sourceReview: { reviewedAt, authoritativeSources: sources.rrSportsCenter },
  },
  'sam-houston-race-park': {
    visitorFacts: {
      address: '7575 N. Sam Houston Parkway W., Houston, TX 77064',
      opened: '1994',
      homeTeams: [],
      leagueOrConference: 'Thoroughbred and Quarter Horse racing plus year-round simulcast wagering',
      accessibility: 'The race park’s dedicated 3,500-space parking lot includes 125 accessible spaces. Current racing or special-event instructions should control any event-specific accommodations and parking changes.',
      bagAndEntry: 'Sam Houston Race Park searches carried items and does not permit large bags or backpacks. Its current racing materials also publish a clear-bag standard for permitted clear bags, small clutches and inspected medical bags; visitors should use the current entry policy for the specific event.',
    },
    editorialStory: 'Sam Houston Race Park opened in 1994 as a northwest-Houston horse-racing and entertainment facility. The venue combines seasonal live Thoroughbred and Quarter Horse racing with simulcast wagering and a large dedicated parking operation. Live-racing dates, first-post times and event policies change, so the enduring guide should explain the track and its access rather than freeze one season’s calendar.',
    sourceReview: { reviewedAt, authoritativeSources: sources.samHouston },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE4: Record<string, SportsVenueEnrichment> = {
  'circuit-of-the-americas': {
    city: 'Austin',
    opened: '2012',
    primaryEvents: ['Formula 1 United States Grand Prix', 'MotoGP', 'Major motorsports, driving and entertainment events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['circuit-of-the-americas'].editorialStory,
    parking: 'Cars using COTA’s on-site lots during major event weekends need the appropriate pre-purchased parking pass, and the recommended approach route depends on the assigned lot. Choose the parking product and route before driving toward COTA Boulevard rather than trying to improvise near the circuit.',
    arrival: 'COTA is at 9201 Circuit of The Americas Boulevard southeast of central Austin. Major race weekends are large-property operations with controlled approaches, walking and event-specific gates, so the current event transportation guide should determine the arrival plan.',
    stayAndEat: 'The circuit is a destination-scale property rather than a downtown venue. Central Austin lodging or dining can be part of the broader trip, but race day itself should stay lightly scheduled because arrival and departure can consume substantial time.',
    nearby: 'COTA’s own circuit, amphitheater, karting and RV facilities are the most defensible immediate connections. Downtown Austin attractions are separate itinerary choices.',
    planningLinks: [...sources.cota],
    imageBrief: 'Circuit of The Americas southeast of Austin with the 20-turn road course, steep Turn 1 approach and observation-tower context visible; no added sponsor logos or text.',
    verifiedAt: reviewedAt,
  },
  'cy-fair-fcu-stadium': {
    city: 'Cypress',
    capacity: '11,000',
    primaryEvents: ['CFISD high-school football', 'High-school soccer and track', 'District and community stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['cy-fair-fcu-stadium'].editorialStory,
    parking: 'Cy-Fair FCU Stadium is part of the Berry Center complex at 8877 Barker Cypress Road. Use Berry Center’s current directions and event parking information because the campus has multiple facilities and entrances; CFISD also prohibits tailgating on district property.',
    arrival: 'For current CFISD stadium events, gates open one hour before game time and everyone entering must pass through a metal detector. The district also enforces no re-entry, so visitors should have tickets and permitted bags ready before entering.',
    stayAndEat: 'The relevant geography is Cypress and the Berry Center campus in northwest Harris County. Broader Houston attractions should be treated as separate drives rather than implied to be adjacent to the stadium.',
    nearby: 'The Berry Center’s other district facilities are the immediate event-campus connections. Other CFISD stadiums and Houston destinations should be presented as separate stops.',
    planningLinks: [...sources.cyFair],
    imageBrief: 'Cy-Fair Federal Credit Union Stadium at the Berry Center complex in Cypress during a Texas high-school football event, with district-campus context and no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'jones-att-stadium': {
    city: 'Lubbock',
    opened: 'Texas Tech football home since 1947; Galaxy Stadium name began in 2026',
    primaryEvents: ['Texas Tech Red Raiders football', 'Big 12 game weekends', 'Major stadium events when scheduled'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['jones-att-stadium'].editorialStory,
    parking: 'Texas Tech publishes season-specific football parking and shuttle information. For 2026, Citibus service begins three hours before kickoff and campus lot access is event-controlled; use the current football parking map instead of ordinary university-day parking assumptions.',
    arrival: 'Most Galaxy Stadium gates currently open 90 minutes before kickoff, while student, club, suite and selected premium gates open two hours before kickoff. Security screening, clear-bag enforcement and no-re-entry apply, so the current Gameday in Raiderland guide should control.',
    stayAndEat: 'Galaxy Stadium is a Texas Tech campus venue in Lubbock. Campus-adjacent lodging and dining can simplify football travel, but off-campus city attractions should remain separate itinerary choices rather than filler inside the venue guide.',
    nearby: 'United Supermarkets Arena and other Texas Tech athletics facilities are meaningful campus connections. Each should be treated as its own stop with separate event operations.',
    planningLinks: [...sources.galaxy],
    imageBrief: 'Galaxy Stadium on the Texas Tech campus in Lubbock during a football event, emphasizing the West Texas stadium and campus setting without added sponsor logos or text.',
    verifiedAt: reviewedAt,
  },
  'moody-center': {
    city: 'Austin',
    capacity: '15,000+ concerts; 10,000+ basketball configuration',
    opened: 'April 2022',
    primaryEvents: ['Texas Longhorns men’s basketball', 'Texas Longhorns women’s basketball', 'Major concerts and touring arena events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['moody-center'].editorialStory,
    parking: 'Moody Center uses nearby campus garages with event-specific availability and opening times. Pre-purchase the appropriate garage or choose another transportation mode before entering the UT campus-edge street network; the current event page should override generic parking assumptions.',
    arrival: 'The arena is at 2001 Robert Dedman Drive on the University of Texas campus. Heavy event traffic, campus activity and road closures can overlap, so follow Moody Center’s current trip-planning guidance and leave enough time for the walk and security screening.',
    stayAndEat: 'The UT campus edge and central Austin are genuinely connected to the arena. Keep lodging and dining suggestions tied to practical access rather than automatically turning every game or concert into a generic downtown entertainment itinerary.',
    nearby: 'DKR–Texas Memorial Stadium and other UT athletics facilities are defensible campus connections; downtown Austin remains a separate but nearby trip component.',
    planningLinks: [...sources.moody],
    imageBrief: 'Moody Center on the University of Texas campus edge in Austin, showing the modern arena and pedestrian event context without added logos or text.',
    verifiedAt: reviewedAt,
  },
  'q2-stadium': {
    city: 'Austin',
    capacity: '20,500+ seats',
    opened: '2021',
    primaryEvents: ['Austin FC home matches', 'Major soccer matches', 'Concerts and stadium events when scheduled'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['q2-stadium'].editorialStory,
    parking: 'Q2 Stadium strongly encourages pre-purchased parking and publishes current on-site and off-site lot guidance. Parking passes are mobile and match-day access can change, so choose parking, rail, bus, bicycle or rideshare before traveling to McKalla Place.',
    arrival: 'The stadium’s North Austin location is built around multiple transportation modes. CapMetro service, rideshare, bicycles and prepaid parking each have dedicated procedures; use the current match guide instead of improvising in the final blocks around the stadium.',
    stayAndEat: 'North Austin is the immediate lodging and dining geography. Central Austin can be part of a longer stay, but the stadium’s rail and transit links should be explained rather than assuming every visitor will drive downtown before or after a match.',
    nearby: 'McKalla Station and the immediate North Austin district are the strongest planning context. Other Austin attractions should be presented only when the guide accounts for travel time.',
    planningLinks: [...sources.q2],
    imageBrief: 'Q2 Stadium at McKalla Place in North Austin on match day with soccer-specific architecture and transit-oriented arrival context; no added logos or text.',
    verifiedAt: reviewedAt,
  },
  'round-rock-multipurpose-complex': {
    city: 'Round Rock',
    capacity: '938 parking spaces; shaded permanent seating for 250 at each championship field',
    opened: 'Spring 2017',
    primaryEvents: ['Soccer tournaments', 'Rugby, lacrosse, football and ultimate events', 'Regional and national field-sport championships'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['round-rock-multipurpose-complex'].editorialStory,
    parking: 'The 60-acre complex has 938 parking spaces serving ten fields. Tournament traffic can distribute differently depending on field assignments, so teams should know the field number and event check-in instructions before choosing where to enter and park.',
    arrival: 'Multi-field tournaments can start early and run in waves. Confirm the assigned field, first competition time and tournament check-in requirements before arriving at 2001 N. Kenney Fort Boulevard.',
    stayAndEat: 'This is a traveling-team facility inside Old Settlers Park. Hotel or meal planning should follow the tournament schedule and any organizer stay-to-play requirements rather than generic Austin-area tourism copy.',
    nearby: 'Old Settlers Park is the immediate geographic context; Round Rock’s other sports facilities are separate but relevant tournament-travel connections.',
    planningLinks: [...sources.rrMpc],
    imageBrief: 'Round Rock Multipurpose Complex within Old Settlers Park showing multiple grass and synthetic tournament fields, championship seating and large-field layout without added text.',
    verifiedAt: reviewedAt,
  },
  'round-rock-sports-center': {
    city: 'Round Rock',
    capacity: 'More than 6,500 total; seating for more than 2,200 spectators',
    primaryEvents: ['Basketball tournaments', 'Volleyball tournaments', 'Martial arts, gymnastics and other indoor competitions'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['round-rock-sports-center'].editorialStory,
    parking: 'The Sports Center publishes more than 700 on-site parking spaces. Large tournament waves can concentrate arrivals, so families should follow organizer instructions and know the assigned court and first competition time before reaching 2400 Chisholm Trail.',
    arrival: 'The facility can operate many courts simultaneously, including eight high-school basketball courts or sixteen high-school volleyball courts. Build arrival around check-in and court assignment rather than assuming a single spectator gate flow.',
    stayAndEat: 'This is a tournament-travel venue, so practical Round Rock lodging and meal timing matter more than padding the page with unrelated Austin sightseeing. Organizer hotel requirements should take priority when applicable.',
    nearby: 'Round Rock’s broader Sports Capital facility network can matter for teams playing across multiple sites, but each complex has a distinct address and should not be described as one contiguous campus.',
    planningLinks: [...sources.rrSportsCenter],
    imageBrief: 'Round Rock Sports Center during a large indoor basketball and volleyball tournament, showing the multi-court configuration and spectator mezzanine without added logos or text.',
    verifiedAt: reviewedAt,
  },
  'sam-houston-race-park': {
    city: 'Houston',
    opened: '1994',
    primaryEvents: ['Live Thoroughbred racing', 'Live Quarter Horse racing', 'Year-round simulcast racing and special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE4['sam-houston-race-park'].editorialStory,
    parking: 'Sam Houston Race Park has a dedicated 3,500-space lot with 125 accessible spaces. General parking is currently free for live racing and simulcast days, while concerts and other special events can use different fees or layouts; the specific event listing should control.',
    arrival: 'Live-racing calendars, gate times and first-post times change by meet, while simulcast operations follow a separate schedule. Confirm whether the visit is for live racing, simulcast wagering or a special event before leaving for the northwest-Houston track.',
    stayAndEat: 'The race park is in northwest Houston at 7575 N. Sam Houston Parkway W. Choose lodging around the track or the broader Houston trip, but do not imply downtown attractions are adjacent to the property.',
    nearby: 'The race park itself is the event anchor. Other Houston attractions should be scheduled as separate stops rather than squeezed into a live-racing card.',
    planningLinks: [...sources.samHouston],
    imageBrief: 'Sam Houston Race Park in northwest Houston during live horse racing with the track, grandstand and dedicated race-day setting visible; no added sponsor logos or text.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave4(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE4[slug];
}

export function getSportsVenueQualityProfileWave4(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE4[slug];
}
