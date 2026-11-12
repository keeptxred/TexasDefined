/**
 * Trip-specific editorial choices for the 17 sports collections.
 * These are durable planning distinctions, not live parking, ticket or access promises.
 * Venue links appear only when the corresponding guide passes the indexability gate.
 */
export interface SportsVenueTripDecision {
  title: string;
  detail: string;
  venueSlug?: string;
}

export const SPORTS_VENUE_TRIP_DECISIONS: Record<string, readonly SportsVenueTripDecision[]> = {
  'dallas-fort-worth': [
    { title: 'Arlington for NFL and MLB', detail: 'The Cowboys and Rangers play in the same Arlington entertainment district. For a two-event weekend, check both calendars before booking a hotel; a Dallas address is not the same as staying near the stadiums.', venueSlug: 'att-stadium' },
    { title: 'Dallas for arena nights', detail: 'An event at American Airlines Center calls for a different arrival plan from an Arlington game. Look at downtown and Victory Park transit and parking options rather than choosing accommodations for the whole metroplex.', venueSlug: 'american-airlines-center' },
    { title: 'Frisco for golf and suburban events', detail: 'PGA Frisco and the northern suburbs suit a different itinerary from downtown Dallas. Compare the course or event location with your lodging before committing to long cross-region drives.', venueSlug: 'pga-frisco-fields-ranch' },
  ],
  houston: [
    { title: 'Downtown baseball and basketball', detail: 'Daikin Park and Toyota Center are downtown destinations. An Astros game or Rockets night can fit with downtown dining, but the event calendar should drive parking and hotel decisions.', venueSlug: 'daikin-park' },
    { title: 'Soccer in EaDo', detail: 'Shell Energy Stadium sits just east of downtown and has nearby METRORail service. Check the service schedule and your return journey as carefully as the trip to the match.', venueSlug: 'shell-energy-stadium' },
    { title: 'Texans football at Reliant Stadium', detail: 'A Texans game is not a downtown stadium visit. Plan for the stadium south of downtown near the Texas Medical Center, and verify the event-specific transit, parking and gate rules before departure.', venueSlug: 'reliant-stadium' },
  ],
  'austin-central-texas': [
    { title: 'Race weekend at COTA', detail: 'Circuit of The Americas is southeast of central Austin. Treat race-day transport as part of the event, and do not assume that a downtown hotel means a short arrival.', venueSlug: 'circuit-of-the-americas' },
    { title: 'An Austin FC match', detail: 'Q2 Stadium is a north Austin soccer destination. Compare current transit and parking instructions with the event date; an MLS match and a COTA weekend are different trips.', venueSlug: 'q2-stadium' },
    { title: 'Minor-league baseball in Round Rock', detail: 'Dell Diamond makes sense as a north-metro baseball outing. Match the hotel, dinner stop and return route to Round Rock rather than crossing Austin without a reason.', venueSlug: 'dell-diamond' },
  ],
  'san-antonio': [
    { title: 'Downtown stadium events', detail: 'Alamodome football and large events fit a downtown San Antonio itinerary. Check the event operator’s entry and parking instructions before relying on an ordinary downtown parking routine.', venueSlug: 'alamodome' },
    { title: 'Basketball and arena events', detail: 'Frost Bank Center events involve a different part of the city from the Alamodome. For a Spurs trip, build the evening around the arena location instead of assuming the River Walk is next door.', venueSlug: 'frost-bank-center' },
    { title: 'Stock show and rodeo grounds', detail: 'Rodeo visits can involve grounds activities as well as an arena performance. Check which buildings the ticket covers, the daily schedule and where the event directs vehicles.', venueSlug: 'freeman-coliseum' },
  ],
  waco: [
    { title: 'Baylor football by the Brazos', detail: 'McLane Stadium puts game day near Baylor and the riverfront. Plan campus access and the walk to your seats before filling the rest of the day with Waco stops.', venueSlug: 'mclane-stadium' },
    { title: 'A basketball-focused weekend', detail: 'A Baylor basketball trip is shorter and more campus-centered than a football Saturday. Use the specific arena schedule rather than borrowing McLane Stadium’s traffic plan.', venueSlug: 'foster-pavilion' },
    { title: 'Rodeo or surf rather than a game', detail: 'Waco also draws visitors for Western-sports events and organized surf sessions. Confirm the actual booking or event format first: those trips have different arrival and equipment needs.' },
  ],
  'college-station': [
    { title: 'Kyle Field on football Saturday', detail: 'A Texas A&M football weekend takes over more of the campus and surrounding streets than an ordinary visit. Verify the current Aggie game-day map and plan where your group will meet after the game.', venueSlug: 'kyle-field' },
    { title: 'Reed Arena for an indoor game', detail: 'Basketball and arena events use their own entrances, parking arrangements and start times. A football parking pass does not establish where to park for a Reed Arena event.', venueSlug: 'reed-arena' },
    { title: 'Baseball at Blue Bell Park', detail: 'A series at Olsen Field at Blue Bell Park can mean separate start times across multiple days. Check the complete series schedule before choosing a single-day itinerary.' },
  ],
  'el-paso': [
    { title: 'Football beside the UTEP campus', detail: 'Sun Bowl Stadium sits in the university area against the Franklin Mountains. Check official event parking and walking directions instead of assuming the downtown baseball route works here.', venueSlug: 'sun-bowl-stadium' },
    { title: 'A downtown ballpark night', detail: 'Southwest University Park is a downtown baseball choice, distinct from the campus stadium. Downtown hotels and restaurants may be more practical for that trip.', venueSlug: 'southwest-university-park' },
    { title: 'Plan around the event, not just the city', detail: 'El Paso’s major sports venues are not interchangeable. A bowl game can have a very different crowd, traffic pattern and schedule from a regular-season baseball outing.' },
  ],
  lubbock: [
    { title: 'Texas Tech football', detail: 'Galaxy Stadium is the university’s football ground, formerly called Jones AT&T Stadium. Use the current athletics parking, shuttle and gate instructions; older maps may still use the prior venue name.', venueSlug: 'jones-att-stadium' },
    { title: 'United Supermarkets Arena nights', detail: 'United Supermarkets Arena hosts basketball and other indoor events with different arrival needs. For a single arena event, do not plan around football Saturday’s campus traffic assumptions.', venueSlug: 'united-supermarkets-arena' },
    { title: 'Make the travel distance count', detail: 'Lubbock is far from Texas’s largest metros. For an evening event, compare overnight lodging with a late return drive before buying tickets.' },
  ],
  football: [
    { title: 'NFL-scale event weekends', detail: 'The Cowboys’ Arlington stadium supports a different kind of visit from most campus grounds: allow for major-event routing and check whether another entertainment-district event is scheduled.', venueSlug: 'att-stadium' },
    { title: 'College football Saturdays', detail: 'Kyle Field illustrates how a university game day includes traditions, campus walks and parking restrictions beyond the game itself. Consult the school’s own plan for the specific date.', venueSlug: 'kyle-field' },
    { title: 'Friday nights at district stadiums', detail: 'High-school venues may serve several schools and can host neutral-site playoffs. Check the actual home-team assignment, ticket seller and district policies rather than treating every stadium as a single team’s home.', venueSlug: 'eagle-stadium-allen' },
  ],
  baseball: [
    { title: 'Major League Baseball', detail: 'Globe Life Field in Arlington and Daikin Park in Houston are retractable-roof MLB trips with different downtown and entertainment-district settings. Seat location, roof status and official game calendar all matter.', venueSlug: 'globe-life-field' },
    { title: 'Minor-league baseball', detail: 'Dell Diamond shows the appeal of a local baseball outing without building an entire trip around an MLB stadium. Promotional nights and tournament dates can change normal parking patterns.', venueSlug: 'dell-diamond' },
    { title: 'College series', detail: 'College baseball often means several games on consecutive days. Check the venue and complete series schedule before committing to lodging or assuming a single admission covers the weekend.' },
  ],
  basketball: [
    { title: 'Downtown NBA nights', detail: 'Toyota Center is a Houston downtown arena. Check the game’s start time and garage or transit plan; an arena arrival is not interchangeable with NRG stadium parking.', venueSlug: 'toyota-center-houston' },
    { title: 'College basketball', detail: 'Reed Arena and other campus venues make it easier to combine a game with a university visit, but campus parking and ticket windows may change from one opponent to the next.', venueSlug: 'reed-arena' },
    { title: 'Special events in multipurpose arenas', detail: 'Basketball buildings often host concerts and other competitions. Confirm the event’s seating configuration and entry policy rather than relying on the arena’s usual basketball setup.' },
  ],
  motorsports: [
    { title: 'International race weekends', detail: 'COTA’s major race dates can involve long walks, assigned parking routes and an all-day schedule. Select transport and lodging around the race circuit, not simply around downtown Austin.', venueSlug: 'circuit-of-the-americas' },
    { title: 'Oval and NASCAR-style events', detail: 'Texas Motor Speedway is a separate North Texas travel destination from Dallas or Fort Worth arena events. Review its current event-specific parking approach and gate opening.', venueSlug: 'texas-motor-speedway' },
    { title: 'Participant-focused tracks', detail: 'Not every track is open for casual spectators every day. Road-course and driver-program facilities may require registration, waivers or a particular organizer’s invitation; check access before traveling.' },
  ],
  'college-sports': [
    { title: 'Football as a campus visit', detail: 'A trip to Kyle Field is also a Texas A&M campus weekend. Traditions and pedestrian routes can shape your whole Saturday; official athletics guidance should determine parking and access.', venueSlug: 'kyle-field' },
    { title: 'Riverfront Baylor weekends', detail: 'McLane Stadium anchors a different college-football setting beside the Brazos. Compare riverfront activity and campus access with the stadium’s own event instructions.', venueSlug: 'mclane-stadium' },
    { title: 'Indoor sports and shorter trips', detail: 'United Supermarkets Arena and other university buildings can anchor basketball or volleyball outings without a football-style tailgate plan. Follow each sport’s schedule and venue rules.', venueSlug: 'united-supermarkets-arena' },
  ],
  'high-school-football': [
    { title: 'A district stadium is not one school', detail: 'Eagle Stadium and many large Texas district facilities serve school programs and special events. Confirm the actual teams and host arrangements before relying on a name or a generic schedule.', venueSlug: 'eagle-stadium-allen' },
    { title: 'Playoff games can move', detail: 'Neutral-site UIL playoff assignments and kickoff times change by round. Check the current UIL bracket and the participating schools before booking a long trip.' },
    { title: 'Treat the venue as a school facility', detail: 'Families, students, bands and visiting supporters share these grounds. Use the school district’s current ticket, bag and accessible-arrival rules; do not assume professional-stadium amenities.' },
  ],
  'rodeo-western': [
    { title: 'Fort Worth’s Western-sports campus', detail: 'Will Rogers Memorial Center includes multiple buildings and event uses. The correct arrival point depends on the show, performance or equestrian competition, not merely the complex’s street address.', venueSlug: 'will-rogers-memorial-center' },
    { title: 'A Stockyards rodeo night', detail: 'Cowtown Coliseum is a different Fort Worth experience from the Will Rogers grounds. Check its own show calendar and Stockyards parking before setting off.', venueSlug: 'cowtown-coliseum' },
    { title: 'San Antonio stock-show visits', detail: 'Freeman Coliseum-area grounds events may span several buildings and ticket types. Confirm whether your admission covers the grounds, the performance or both.', venueSlug: 'freeman-coliseum' },
  ],
  golf: [
    { title: 'Playing a course versus watching an event', detail: 'PGA Frisco combines golf-related visitor attractions and tournament activity. Availability to play, book a lesson or enter a ticketed competition should be checked separately.', venueSlug: 'pga-frisco-fields-ranch' },
    { title: 'Private-club tournaments', detail: 'Colonial Country Club is a historic tournament venue, not a promise of public tee times. Spectators should use the tournament operator’s current ticket, shuttle and bag rules.', venueSlug: 'colonial-country-club' },
    { title: 'Public golf in Houston', detail: 'Memorial Park Golf Course has a different access model from a private-club tournament. Tee-time reservation and spectator-event arrangements are separate questions.', venueSlug: 'memorial-park-golf-course' },
  ],
  soccer: [
    { title: 'Q2 Stadium for an MLS match', detail: 'Q2 Stadium is purpose-built for soccer in north Austin. Its match-day transit and parking choices are not the same as visiting the University of Texas or COTA.', venueSlug: 'q2-stadium' },
    { title: 'Houston Dynamo and Dash games', detail: 'Shell Energy Stadium’s EaDo setting makes rail and downtown access worth considering. Confirm the service and match-specific instructions for the date you attend.', venueSlug: 'shell-energy-stadium' },
    { title: 'Big matches in multipurpose grounds', detail: 'International fixtures and tournaments can use much larger stadiums than a regular MLS match. Check the precise host, seating configuration and event operator before booking travel.' },
  ],
};

export function sportsVenueTripDecisions(slug: string): readonly SportsVenueTripDecision[] {
  return SPORTS_VENUE_TRIP_DECISIONS[slug] ?? [];
}
