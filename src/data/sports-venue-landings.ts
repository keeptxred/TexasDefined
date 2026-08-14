import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

export type SportsVenueLanding = {
  slug: string;
  kind: 'market' | 'theme';
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  planning: readonly [string, string, string];
  counties?: readonly string[];
  tagsAny?: readonly string[];
  tagsAll?: readonly string[];
};

export const SPORTS_VENUE_LANDINGS: readonly SportsVenueLanding[] = [
  {
    slug: 'dallas-fort-worth', kind: 'market', eyebrow: 'North Texas sports travel',
    title: 'Dallas–Fort Worth stadiums, arenas and sports venues',
    seoTitle: 'Dallas–Fort Worth Stadiums, Arenas & Sports Venues',
    description: 'Plan sports trips across Dallas, Arlington, Fort Worth, Frisco, Denton and the wider DFW area with verified venue guides for pro teams, college sports, racing, golf and Friday night football.',
    intro: 'North Texas has the deepest concentration of major sports destinations in the state. A single DFW trip can revolve around an NFL or MLB game in Arlington, an NBA or NHL night in Dallas, championship golf in Frisco, college football in Fort Worth or a race weekend north or south of the urban core.',
    planning: ['Choose the venue first, then build around its part of the metroplex; cross-metro drives can be substantial.', 'For Arlington and Frisco event weekends, lodging location can matter as much as the ticket because venues cluster away from central Dallas.', 'Check official venue parking and event rules before departure; major-event traffic plans often change by event.'],
    counties: ['dallas', 'tarrant', 'collin', 'denton', 'ellis', 'wise'],
  },
  {
    slug: 'houston', kind: 'market', eyebrow: 'Houston sports travel',
    title: 'Houston stadiums, arenas, ballparks and sports venues',
    seoTitle: 'Houston Stadiums, Arenas, Ballparks & Sports Venues',
    description: 'Browse Houston-area sports venues for Astros, Rockets, Texans, Dynamo, college sports, horse racing, golf, high-school football, motorsports and Sugar Land baseball.',
    intro: 'Houston sports trips spread across downtown, the Texas Medical Center and university areas, the Reliant complex, northwest Harris County, Katy, Sugar Land and the wider Gulf Coast. That makes venue-specific planning especially useful: the right hotel or meal stop for one event may be inconvenient for another.',
    planning: ['Match lodging to the venue district rather than assuming every Houston sports destination is close to downtown.', 'Use official event-day access guidance for downtown and Reliant-area events, where street closures and parking inventory can change.', 'Pair the event with same-county attractions only after checking actual drive times; the Houston region covers a large footprint.'],
    counties: ['harris', 'fort-bend', 'brazoria'],
  },
  {
    slug: 'austin-central-texas', kind: 'market', eyebrow: 'Austin and Central Texas sports travel',
    title: 'Austin and Central Texas stadiums, tracks and sports venues',
    seoTitle: 'Austin & Central Texas Stadiums, Tracks & Sports Venues',
    description: 'Plan Austin-area sports weekends around Longhorns football and baseball, Austin FC, Circuit of The Americas, Moody Center, Round Rock, Cedar Park and San Marcos.',
    intro: 'Austin and the surrounding Central Texas corridor combine major college sports, MLS, international motorsports, minor-league baseball, arena events and large youth-tournament facilities. The venues stretch from central Austin to Cedar Park, Round Rock, San Marcos and COTA, so a useful game-day plan starts with geography.',
    planning: ['For COTA weekends, treat the race circuit as its own travel zone rather than a downtown Austin venue.', 'University of Texas event days can reshape traffic and parking across central Austin; use official campus and venue guidance.', 'Round Rock and Cedar Park venues can support their own north-metro stay instead of requiring a central Austin hotel.'],
    counties: ['travis', 'williamson', 'hays'],
  },
  {
    slug: 'san-antonio', kind: 'market', eyebrow: 'San Antonio sports travel',
    title: 'San Antonio arenas, stadiums and sports venues',
    seoTitle: 'San Antonio Arenas, Stadiums & Sports Venues',
    description: 'Browse San Antonio sports destinations for Spurs basketball, UTSA football, rodeo, minor-league baseball, championship golf, horse racing and shooting sports.',
    intro: 'San Antonio sports travel is broader than a single downtown district. Major events take place around the Alamodome, Frost Bank Center and Freeman Coliseum, while baseball, golf, racing and championship shooting draw visitors to other parts of Bexar County.',
    planning: ['Downtown lodging works well for Alamodome events, but other San Antonio venues may favor a different part of the city.', 'Rodeo and major arena weekends can create overlapping demand around the Frost Bank Center and Freeman Coliseum complex.', 'Build extra time into cross-city trips when combining an event with River Walk, missions or other visitor stops.'],
    counties: ['bexar'],
  },
  {
    slug: 'waco', kind: 'market', eyebrow: 'Waco sports travel',
    title: 'Waco stadiums, arenas and sports destinations',
    seoTitle: 'Waco Stadiums, Arenas & Sports Destinations',
    description: 'Plan Waco sports trips around Baylor football, basketball and baseball, the Heart O’ Texas rodeo complex and Waco Surf.',
    intro: 'Waco has an unusually varied sports-travel mix for its size: Big 12 football, basketball and baseball sit alongside Western-sports events and a destination surf facility. That makes the city useful for both traditional game weekends and sports-focused family trips.',
    planning: ['Baylor event weekends can concentrate demand around campus and the Brazos River corridor.', 'For multi-day tournaments or Western-sports events, verify event-specific schedules before choosing lodging.', 'Waco’s central location makes it practical to combine a sports event with a broader Central Texas road trip.'],
    counties: ['mclennan'],
  },
  {
    slug: 'college-station', kind: 'market', eyebrow: 'Aggieland sports travel',
    title: 'College Station stadiums and Texas A&M sports venues',
    seoTitle: 'College Station & Texas A&M Sports Venues',
    description: 'Plan College Station sports weekends around Kyle Field, Reed Arena and Olsen Field at Blue Bell Park with verified visitor guidance.',
    intro: 'College Station is one of Texas’s clearest destination sports towns. Texas A&M football, basketball and baseball can each fill an entire weekend, and the concentration of major venues around campus means the traditions, tailgating and surrounding districts are part of the experience.',
    planning: ['Reserve lodging early for major football weekends because game-day demand extends across College Station and Bryan.', 'Use Texas A&M’s official transportation and parking guidance; campus access patterns can differ by sport and event.', 'Allow time for campus traditions and pregame activity rather than treating the venue as a simple arrive-and-leave stop.'],
    counties: ['brazos'],
  },
  {
    slug: 'el-paso', kind: 'market', eyebrow: 'El Paso sports travel',
    title: 'El Paso stadiums, arenas and sports venues',
    seoTitle: 'El Paso Stadiums, Arenas & Sports Venues',
    description: 'Browse El Paso sports venues for UTEP football and basketball, the Sun Bowl and downtown minor-league baseball.',
    intro: 'El Paso’s major spectator venues connect university traditions with a downtown baseball experience and one of Texas’s best-known bowl-game settings. Sports trips here also have a distinctive border-city context that rewards planning beyond the event itself.',
    planning: ['Sun Bowl and UTEP events are closely tied to the university area, while baseball is centered downtown.', 'Build in extra travel time for major bowl and rivalry weekends when visitor volume is higher than a routine home date.', 'Use official venue guidance for parking and entry, then pair the event with El Paso attractions based on actual drive time.'],
    counties: ['el-paso'],
  },
  {
    slug: 'lubbock', kind: 'market', eyebrow: 'Lubbock sports travel',
    title: 'Lubbock and Texas Tech sports venues',
    seoTitle: 'Lubbock & Texas Tech Stadiums and Sports Venues',
    description: 'Plan Lubbock sports trips around Galaxy Stadium and United Supermarkets Arena for Texas Tech football, basketball and major West Texas events.',
    intro: 'Texas Tech turns Lubbock into a major West Texas sports destination. Football weekends and arena events bring visitors from across a wide regional catchment, and the city’s relative isolation makes advance planning for lodging and travel especially valuable.',
    planning: ['For marquee football weekends, reserve lodging early because alternatives outside Lubbock may require long drives.', 'Use Texas Tech’s official event-day guidance for campus parking, shuttles and entry rules.', 'Treat the trip as a full West Texas weekend; the distance from other major metros makes same-day out-and-back travel less practical for many visitors.'],
    counties: ['lubbock'],
  },
  {
    slug: 'football', kind: 'theme', eyebrow: 'Texas football destinations',
    title: 'Texas football stadiums worth planning a trip around',
    seoTitle: 'Texas Football Stadiums: NFL, College & Friday Night Lights',
    description: 'Browse Texas football stadiums across the NFL, major college programs and landmark high-school venues with visitor-focused game-day guides.',
    intro: 'Football is one of the clearest ways sports becomes Texas travel. The statewide venue list stretches from NFL-scale stadiums and SEC or Big 12 Saturdays to district stadiums that turn Friday night football into a regional event.',
    planning: ['Confirm the exact game-day parking plan rather than relying on a venue’s normal-day map.', 'College and high-school venues may use school-specific bag, re-entry and tailgating rules.', 'For rivalry, playoff and marquee dates, lodging demand can rise well beyond the immediate city.'],
    tagsAny: ['football'],
  },
  {
    slug: 'baseball', kind: 'theme', eyebrow: 'Texas baseball trips',
    title: 'Texas baseball stadiums and ballparks',
    seoTitle: 'Texas Baseball Stadiums & Ballparks: MLB, MiLB & College',
    description: 'Explore Texas baseball parks from MLB destinations to minor-league and major college ballparks, with trip-planning context for each venue.',
    intro: 'Texas baseball travel ranges from major-league weekends in Arlington and Houston to downtown minor-league parks and college series that can define a spring weekend. Smaller parks often make it easier to combine the game with local food, downtown districts and family attractions.',
    planning: ['Check first-pitch time and sun exposure before choosing seats or pregame plans.', 'Minor-league and college schedules can offer easier family-trip options than major-league weekends.', 'For postseason and rivalry series, expect parking and lodging demand to differ from a normal regular-season date.'],
    tagsAny: ['baseball'],
  },
  {
    slug: 'basketball', kind: 'theme', eyebrow: 'Texas basketball trips',
    title: 'Texas basketball arenas and major indoor venues',
    seoTitle: 'Texas Basketball Arenas: NBA, WNBA & College Venues',
    description: 'Browse Texas basketball arenas for NBA, WNBA and major college programs, with visitor guidance for game nights and event weekends.',
    intro: 'Texas basketball venues range from downtown NBA arenas to campus buildings where conference play can create a destination weekend. Because many arenas also host concerts and other events, access and parking plans often vary by date.',
    planning: ['Check the event-specific parking map even if you have visited the arena for another type of event.', 'Downtown arenas can pair naturally with nearby dining, while campus venues may require a different arrival strategy.', 'Conference rivalry and postseason dates can create demand patterns closer to football weekends than routine games.'],
    tagsAny: ['basketball'],
  },
  {
    slug: 'motorsports', kind: 'theme', eyebrow: 'Racing Texas',
    title: 'Texas racetracks and motorsports destinations',
    seoTitle: 'Texas Racetracks & Motorsports Destinations',
    description: 'Plan Texas motorsports trips for Formula 1, NASCAR, NHRA, road courses, drag racing and enthusiast track weekends.',
    intro: 'Motorsports venues behave differently from stadiums. Race weekends can occupy an entire day or several days, parking fields can be enormous, and the best lodging may be far from the track. Texas has everything from international race weekends to regional road courses and drag strips.',
    planning: ['Treat major race weekends as multi-day events and review track-specific arrival windows before leaving.', 'Pack for exposure: many motorsports venues involve long outdoor days and significant walking.', 'Choose lodging based on the track’s highway access and event traffic plan, not simply the nearest major downtown.'],
    tagsAny: ['motorsports'],
  },
  {
    slug: 'college-sports', kind: 'theme', eyebrow: 'Texas college traditions',
    title: 'Texas college stadiums, arenas and ballparks',
    seoTitle: 'Texas College Sports Venues: Stadiums, Arenas & Ballparks',
    description: 'Explore major Texas college sports venues for football, basketball, baseball, aquatics and destination game weekends.',
    intro: 'College sports turn campuses into travel destinations. Texas’s major programs draw alumni, visiting fans and families for football Saturdays, basketball rivalry nights, baseball series and championship events where the campus experience matters almost as much as the seat.',
    planning: ['University parking and traffic plans can change dramatically on event days; use the athletic department’s current guidance.', 'Leave time for campus traditions, tailgating and pedestrian congestion around major football venues.', 'For multi-game baseball or tournament weekends, compare campus-area lodging with nearby city districts before booking.'],
    tagsAny: ['college'],
  },
  {
    slug: 'high-school-football', kind: 'theme', eyebrow: 'Friday night lights',
    title: 'Texas high-school football stadium landmarks',
    seoTitle: 'Texas High-School Football Stadiums & Friday Night Lights',
    description: 'Visit landmark Texas high-school football stadiums associated with Friday night lights, UIL playoffs and regional football culture.',
    intro: 'Texas high-school football can fill stadiums at a scale that surprises out-of-state visitors. The most notable district venues host rivalry games, bands, playoff crowds and community traditions that make Friday night football a genuine cultural travel experience.',
    planning: ['District policies for tickets, bags and parking vary; confirm the host school’s current rules before traveling.', 'UIL playoff games may bring neutral-site crowds from multiple communities and can change normal parking patterns.', 'These are working school facilities, so plan respectfully around student, band and family activity.'],
    tagsAny: ['high-school'], tagsAll: ['football'],
  },
  {
    slug: 'rodeo-western', kind: 'theme', eyebrow: 'Western sports Texas',
    title: 'Texas rodeo, equestrian and Western-sports venues',
    seoTitle: 'Texas Rodeo, Equestrian & Western-Sports Venues',
    description: 'Explore Texas rodeo grounds, equestrian complexes and Western-sports venues that anchor livestock shows, championships and travel weekends.',
    intro: 'Western sports are both competition and living Texas culture. Rodeo grounds and equestrian complexes can host long event calendars with livestock shows, cutting, reining, barrel racing, stock shows and championship events that bring competitors and spectators from far beyond the host city.',
    planning: ['Check the specific event schedule; large grounds can host several competitions or show components at once.', 'Western-sports events often start early and run long, so lodging and meal planning matter more than for a two-hour game.', 'Venue footwear, weather exposure and parking surfaces may differ substantially from an indoor arena visit.'],
    tagsAny: ['rodeo', 'equestrian', 'western-sports'],
  },
  {
    slug: 'golf', kind: 'theme', eyebrow: 'Championship golf Texas',
    title: 'Texas tournament and destination golf venues',
    seoTitle: 'Texas Tournament & Destination Golf Venues',
    description: 'Browse Texas golf venues tied to major championships, PGA TOUR and LPGA events, historic tournaments and destination golf trips.',
    intro: 'Tournament golf travel is less about a single fixed seat and more about a full day on the grounds. Texas hosts historic PGA TOUR stops, major-championship venues, public championship golf and resort destinations where spectators and golfers may build an entire weekend around the course.',
    planning: ['Review tournament-specific parking and shuttle instructions; spectator parking is often remote from the course.', 'Expect long walking distances and limited shade compared with stadium sports.', 'For destination-golf trips, separate spectator-event logistics from tee-time or resort planning.'],
    tagsAny: ['golf'],
  },
  {
    slug: 'soccer', kind: 'theme', eyebrow: 'Texas soccer trips',
    title: 'Texas soccer stadiums and major match venues',
    seoTitle: 'Texas Soccer Stadiums & Major Match Venues',
    description: 'Explore Texas soccer venues for MLS, NWSL and major matches, from purpose-built stadiums to large multi-use destinations.',
    intro: 'Texas soccer travel spans purpose-built MLS stadiums, NWSL matches and major multi-use venues capable of hosting international or special-event crowds. The best trip plan depends heavily on whether the match is a routine league date or a marquee event with larger regional demand.',
    planning: ['Use the specific match page for gate and parking details because configurations can change for special events.', 'Purpose-built soccer stadiums and giant multi-use stadiums create very different arrival and seating experiences.', 'For major international or tournament matches, book lodging earlier than you would for a normal league date.'],
    tagsAny: ['soccer'],
  },
] as const;

export const SPORTS_VENUE_LANDING_PATHS = SPORTS_VENUE_LANDINGS.map((landing) => `/sports-venues/${landing.slug}` as const);

export function sportsVenueLanding(slug: string) {
  return SPORTS_VENUE_LANDINGS.find((landing) => landing.slug === slug);
}

export function matchesSportsVenueLanding(entity: TexasEntityRecord, landing: SportsVenueLanding) {
  const tags = new Set(entity.tags ?? []);
  const countyMatch = !landing.counties?.length || Boolean(entity.countySlug && landing.counties.includes(entity.countySlug));
  const anyTagMatch = !landing.tagsAny?.length || landing.tagsAny.some((tag) => tags.has(tag));
  const allTagMatch = !landing.tagsAll?.length || landing.tagsAll.every((tag) => tags.has(tag));
  return countyMatch && anyTagMatch && allTagMatch;
}

export function sportsVenueLandingLinksForVenue(entity: TexasEntityRecord) {
  const market = SPORTS_VENUE_LANDINGS.find((landing) => landing.kind === 'market' && matchesSportsVenueLanding(entity, landing));
  const themes = SPORTS_VENUE_LANDINGS.filter((landing) => landing.kind === 'theme' && matchesSportsVenueLanding(entity, landing)).slice(0, 3);
  return [market, ...themes].filter((landing): landing is SportsVenueLanding => Boolean(landing));
}
