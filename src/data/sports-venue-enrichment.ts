export type SportsVenuePlanningLink = {
  label: string;
  url: string;
};

export type SportsVenueEnrichment = {
  city: string;
  capacity?: string;
  opened?: string;
  primaryEvents: string[];
  history?: string;
  parking: string;
  arrival: string;
  stayAndEat: string;
  nearby: string;
  planningLinks: SportsVenuePlanningLink[];
  imageBrief: string;
  verifiedAt: string;
};

const verifiedAt = '2026-08-13';

export const SPORTS_VENUE_ENRICHMENT: Record<string, SportsVenueEnrichment> = {
  'att-stadium': {
    city: 'Arlington',
    primaryEvents: ['Dallas Cowboys home games', 'College football and major sporting events', 'Stadium tours, concerts and special events'],
    parking: 'AT&T Stadium says approximately 12,000 spaces are distributed across 15 numbered stadium lots, with nearly 12,000 additional spaces in lettered lots around the Rangers ballpark available on event days. Parking passes are lot-specific for many events.',
    arrival: 'For Cowboys games, stadium parking generally opens about five hours before kickoff. Tailgating is limited to designated perimeter spaces, so fans planning a full pregame should arrive early and confirm the assigned lot before driving to Arlington.',
    stayAndEat: 'The stadium sits in Arlington’s major entertainment district. For a sports weekend, lodging near the stadium district reduces the need to move a car between a game, restaurants and nearby attractions.',
    nearby: 'Globe Life Field and other Arlington entertainment attractions make this one of the easiest Texas venues to turn into a multi-event sports weekend.',
    planningLinks: [
      { label: 'Official parking guide', url: 'https://attstadium.com/stadium-info/parking/' },
      { label: 'Stadium A–Z guide', url: 'https://attstadium.com/stadium-info/a-to-z-guide/' },
      { label: 'Cowboys game-day timing', url: 'https://attstadium.com/gameday/' },
    ],
    imageBrief: 'Wide exterior architectural view of AT&T Stadium in Arlington on a clear Texas evening, emphasizing the stadium scale and event-day setting; no logos added, no text overlay.',
    verifiedAt,
  },
  'texas-motor-speedway': {
    city: 'Fort Worth',
    primaryEvents: ['Major NASCAR race weekends', 'Track and motorsports events', 'Camping and fan-weekend experiences'],
    parking: 'Texas Motor Speedway publishes separate free general, preferred, express, camping and infield parking routes. Its official track facts list tens of thousands of paved, gravel and grass parking spaces across the property.',
    arrival: 'The speedway recommends arriving at least two hours before the race start so fans can park, find seats and take in pre-race activities. Most parking is free during major race weekends, while preferred and specialty parking require the appropriate pass.',
    stayAndEat: 'Race weekends are better treated as full-day or multi-day trips than as quick event visits. Lodging in north Fort Worth or the Alliance corridor can reduce the amount of post-race driving.',
    nearby: 'The speedway is a destination on its own; pair it with Fort Worth only when the race schedule leaves a real half-day or evening window.',
    planningLinks: [
      { label: 'Directions and parking', url: 'https://www.texasmotorspeedway.com/fans/directions-parking/' },
      { label: 'Fan FAQ', url: 'https://www.texasmotorspeedway.com/fans/' },
      { label: 'Official track facts', url: 'https://www.texasmotorspeedway.com/media/track-facts/track-facts.html' },
    ],
    imageBrief: 'Texas Motor Speedway grandstands and oval from a high wide angle during daylight, showing the scale of the racing complex and Texas sky; no sponsor text added.',
    verifiedAt,
  },
  'circuit-of-the-americas': {
    city: 'Austin',
    primaryEvents: ['Formula 1 United States Grand Prix', 'MotoGP', 'Major racing, driving and entertainment events'],
    parking: 'COTA’s official arrival guidance says cars parking on-site during major event weekends need a pre-purchased parking pass. Routes vary by assigned lot, with specific approaches published for different lot groups.',
    arrival: 'Treat the assigned parking lot as part of the ticket plan rather than deciding where to park after reaching COTA Boulevard. Major race weekends create heavy traffic, so route planning and an early arrival window are essential.',
    stayAndEat: 'For marquee weekends, lodging should be chosen around the full Austin trip rather than proximity alone. Keep the race day itself lightly scheduled because arrival and departure can consume a large part of the day.',
    nearby: 'COTA is southeast of central Austin, so downtown dining, music and attractions are best planned for a different day or a clearly separated evening window.',
    planningLinks: [
      { label: 'Getting to COTA', url: 'https://circuitoftheamericas.com/getting-to-cota/' },
      { label: 'COTA official site', url: 'https://circuitoftheamericas.com/' },
    ],
    imageBrief: 'Sweeping daylight view of Circuit of The Americas with the observation tower and race circuit visible, Austin-area landscape in the distance; no added race-car branding or text.',
    verifiedAt,
  },
  'pga-frisco-fields-ranch': {
    city: 'Frisco',
    primaryEvents: ['Fields Ranch East and West championship golf', '2027 PGA Championship host campus', 'Public short-course, putting and golf-development experiences'],
    history: 'PGA Frisco is a 660-acre public-private golf campus that combines Fields Ranch, the PGA of America headquarters, the PGA District and Omni PGA Frisco Resort & Spa.',
    parking: 'Access differs between resort, district, daily golf and championship-event use. Golfers and tournament spectators should use the official PGA Frisco or event instructions for the specific visit rather than assuming normal daily access applies.',
    arrival: 'Fields Ranch East is designed as a walking-only experience with a caddie required for each player unless a medical cart exemption is approved. Tee times, caddie arrangements and course-maintenance closures should be checked before travel.',
    stayAndEat: 'The Omni PGA Frisco Resort and PGA District make it possible to build lodging, dining and golf into the same destination rather than commuting between unrelated parts of the metroplex.',
    nearby: 'The campus works well as the anchor for a Frisco sports weekend, with other major Frisco venues and attractions available elsewhere in the city.',
    planningLinks: [
      { label: 'PGA Frisco golf', url: 'https://www.pgafrisco.com/golf/' },
      { label: 'Courses and programs', url: 'https://www.pgafrisco.com/golf/golf-courses-programs/' },
      { label: 'PGA District', url: 'https://www.pgafrisco.com/pga-district/' },
    ],
    imageBrief: 'Golden-hour aerial of a North Texas championship golf course at PGA Frisco, native grasses, strategic bunkers, clubhouse and resort context; no text overlay.',
    verifiedAt,
  },
  'kyle-field': {
    city: 'College Station',
    capacity: '102,733',
    opened: 'Original field 1905; redeveloped stadium debuted in 2015',
    primaryEvents: ['Texas A&M Aggies football', 'SEC game-day weekends', 'Kyle Field tours and special events'],
    history: 'Texas A&M traces Kyle Field to 1905. The university’s two-phase $485 million redevelopment debuted for the 2015 season and established the current 102,733-seat configuration.',
    parking: 'Texas A&M directs football visitors to Transportation Services for current game-day parking and traffic plans. For stadium tours, the university recommends the Gene Stallings public parking garage across from the north end of Kyle Field.',
    arrival: 'Aggie game day starts well before kickoff. The official A–Z guide notes that Spirit Walk takes place about two hours and fifteen minutes before kickoff, so visitors who want the campus traditions should plan to be in the stadium area early.',
    stayAndEat: 'A Kyle Field trip is best planned as an Aggieland weekend: stay near campus or on a shuttle-friendly route and leave room for campus traditions and College Station dining before or after the game.',
    nearby: 'The Texas A&M campus is part of the experience. Related campus athletic venues and university landmarks can fill the rest of a football weekend without a long drive.',
    planningLinks: [
      { label: 'Kyle Field official guide', url: 'https://12thman.com/facilities/kyle-field' },
      { label: 'Kyle Field A–Z', url: 'https://12thman.com/facilities/a-to-z/kyle-field' },
      { label: 'Kyle Field tours', url: 'https://12thman.com/kyle-field-facility-tours' },
    ],
    imageBrief: 'Wide exterior and bowl view of Kyle Field on a bright College Station game day, emphasizing the enormous multi-deck stadium and Aggieland setting; no added logos or text.',
    verifiedAt,
  },
  'ufcu-disch-falk-field': {
    city: 'Austin',
    capacity: '7,211',
    opened: '1975; major renovation completed in 2009',
    primaryEvents: ['Texas Longhorns baseball', 'SEC series and rivalry weekends', 'NCAA postseason baseball'],
    history: 'The University of Texas says Disch-Falk Field opened in 1975 and underwent a major renovation in 2009. The ballpark remains the Longhorns’ primary baseball home and has continued to receive player-development upgrades.',
    parking: 'UT publishes venue-specific accessibility, parking and baseball fan-guide information from the official facility page. Campus event parking can change by date, so the current baseball parking instructions should control the trip plan.',
    arrival: 'For a weekend series, plan around first pitch and campus parking rather than treating the ballpark as a drive-up suburban venue. Postseason and rivalry dates merit more arrival buffer.',
    stayAndEat: 'The ballpark’s central Austin location makes it easy to combine a series with campus, East Austin and downtown dining, but lodging and parking demand rise sharply on major university weekends.',
    nearby: 'Texas Memorial Stadium, the university campus and central Austin attractions make Disch-Falk especially strong for a broader Longhorns sports weekend.',
    planningLinks: [
      { label: 'Official facility page', url: 'https://texaslonghorns.com/facilities/ufcu-disch-falk-field/11' },
    ],
    imageBrief: 'College baseball evening at UFCU Disch-Falk Field in Austin, wide view across the diamond toward the seating bowl under stadium lights; no added logos or text.',
    verifiedAt,
  },
  'will-rogers-memorial-center': {
    city: 'Fort Worth',
    capacity: 'Will Rogers Coliseum: 5,652 permanent seats',
    primaryEvents: ['Equestrian championships', 'Rodeo and Western-sports competitions', 'Livestock shows and large multi-day events'],
    history: 'The City of Fort Worth operates the historic Will Rogers Memorial Center as a multi-building Western-sports and events campus with arenas, livestock facilities, exhibit space and RV capacity.',
    parking: 'The city operates multiple parking facilities across and around the Will Rogers campus, and parking operations change with the event. Large livestock and equestrian dates should be planned from the event-specific grounds map and parking instructions.',
    arrival: 'This is a large campus rather than a single front-door arena. Confirm which arena, exhibit building or livestock area is hosting the event before choosing a parking entrance.',
    stayAndEat: 'The center is in Fort Worth’s Cultural District and the city notes that museums, restaurants and hotels surround the complex. Dickies Arena is next door.',
    nearby: 'This is one of the strongest Texas venues for combining sport and sightseeing: the Cultural District’s museums and central Fort Worth are natural additions to a multi-day event.',
    planningLinks: [
      { label: 'Will Rogers Memorial Center', url: 'https://www.fortworthtexas.gov/departments/public-events/will-rogers-memorial-center' },
      { label: 'Fort Worth public-events parking', url: 'https://www.fortworthtexas.gov/departments/public-events' },
    ],
    imageBrief: 'Historic Will Rogers Memorial Center and equestrian complex in Fort Worth’s Cultural District, broad architectural view with Texas Western character; no text overlay.',
    verifiedAt,
  },
  'memorial-park-golf-course': {
    city: 'Houston',
    opened: '1936; major modern renovation completed after the 2019 closure',
    primaryEvents: ["Texas Children’s Houston Open", 'Chevron Championship', 'Public championship golf'],
    history: 'Memorial Park Golf Course opened in July 1936. Houston later restored the course, and a major modern renovation led by the Astros Golf Foundation and architect Tom Doak prepared it to again host elite tournament golf.',
    parking: 'The course uses paid Memorial Park parking. The official course site directs visitors to parking meters, the ParkHouston app or phone payment and publishes the applicable parking zone.',
    arrival: 'Public play requires tee-time planning, and the course is closed on Tuesdays for routine maintenance while the driving range operates on a different schedule. Tournament weeks use separate spectator logistics.',
    stayAndEat: 'Because Memorial Park is close to central Houston, visitors can pair golf with nearby neighborhoods and restaurants without treating the course as an isolated resort stay.',
    nearby: 'The broader Memorial Park is part of the destination and can add walking, recreation and green space to a Houston golf trip.',
    planningLinks: [
      { label: 'Memorial Park Golf Course', url: 'https://www.memorialparkgolf.com/memorial-park-golf-course' },
      { label: 'Course contact and map', url: 'https://www.memorialparkgolf.com/contact' },
    ],
    imageBrief: 'Public championship golf at Memorial Park in Houston, mature trees, broad fairway and tournament-ready greens with urban Houston context subtly visible; no text overlay.',
    verifiedAt,
  },
  'waco-surf': {
    city: 'Waco',
    primaryEvents: ['Wave-pool surfing', 'Surf instruction and private sessions', 'Waterpark and resort stays'],
    parking: 'Waco Surf is a self-contained destination at 5347 Old Mexia Road. Visitors should use the property’s current booking and arrival instructions because surf sessions, waterpark access and lodging can have different reservation requirements.',
    arrival: 'Treat the reserved surf session or waterpark window as the fixed point of the day. The property publishes separate operating hours for the surf lagoon, waterpark, training facilities and restaurants.',
    stayAndEat: 'Waco Surf offers on-site lodging and multiple food-and-drink options, allowing visitors to build a stay-and-surf trip without commuting back into central Waco between sessions.',
    nearby: 'For a longer Waco trip, reserve a separate block for city attractions rather than squeezing them between fixed surf sessions.',
    planningLinks: [
      { label: 'Waco Surf trip planning', url: 'https://wacosurf.com/contact/' },
      { label: 'Park rules', url: 'https://wacosurf.com/park-rules/' },
    ],
    imageBrief: 'Texas wave-pool surfing at Waco Surf, clean blue artificial wave with a surfer in motion and Central Texas resort setting, photorealistic travel-editorial look; no text overlay.',
    verifiedAt,
  },
};

export function getSportsVenueEnrichment(slug: string) {
  return SPORTS_VENUE_ENRICHMENT[slug];
}

export function sportsVenueMapUrl(name: string, countySlug?: string) {
  const county = countySlug ? `, ${countySlug.replaceAll('-', ' ')} County` : '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}${county}, Texas`)}`;
}
