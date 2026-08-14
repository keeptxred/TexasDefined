import type { SportsVenueEnrichment } from './sports-venue-enrichment';

const verifiedAt = '2026-08-13';

export const SPORTS_VENUE_ENRICHMENT_BATCH8B_COMPLETION: Record<string, SportsVenueEnrichment> = {
  'nelson-wolff-stadium': {
    city: 'San Antonio', opened: '1994', primaryEvents: ['San Antonio Missions home games', 'Other baseball events', 'Community and non-baseball events'],
    history: 'Nelson W. Wolff Municipal Stadium has been the San Antonio Missions’ home since 1994 and remains the city’s active Double-A ballpark in 2026 while San Antonio works toward a future downtown stadium.',
    parking: 'Parking prices vary by Missions game or special event and should be checked on the specific event page. The facility is cashless, including parking, box office and concessions.',
    arrival: 'Gates normally open one hour before game time unless the event page says otherwise. A new clear-bag policy began in May 2026, so visitors should review current guidance before leaving.',
    stayAndEat: 'The ballpark is west of central San Antonio, so River Walk or downtown visitors should treat the game as a separate drive rather than assuming the stadium is walkable from downtown hotels.',
    nearby: 'Downtown San Antonio, the River Walk and other city attractions can round out a Missions weekend when enough travel time is reserved around the game.',
    planningLinks: [
      { label: 'Know before you go', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/know-before-you-go' },
      { label: 'Wolff Stadium FAQ', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/faq' },
      { label: 'Missions schedule', url: 'https://www.milb.com/san-antonio/schedule' },
    ],
    imageBrief: 'Nelson Wolff Stadium in San Antonio on a warm evening with a Double-A baseball crowd and classic minor-league atmosphere, no added text.', verifiedAt,
  },
  'momentum-bank-ballpark': {
    city: 'Midland', capacity: '4,709 seats; 6,669 including grass berm areas', opened: '2002',
    primaryEvents: ['Midland RockHounds home games', 'College and high-school baseball', 'Specialty baseball and community events'],
    history: 'Momentum Bank Ballpark opened in 2002 and is home to the Midland RockHounds, the Double-A affiliate of the Athletics. The family-oriented complex includes a splashpad, playground, basketball court, suites and picnic areas.',
    parking: 'General parking is free, with space for more than 3,500 cars plus buses. Accessible spaces are reserved for properly tagged vehicles, while a separate reserved lot serves certain premium patrons.',
    arrival: 'Gate timing varies by day: some games open 30 minutes before first pitch while many Thursday-through-Saturday dates open an hour ahead. Check the current schedule and promotion before choosing an arrival time.',
    stayAndEat: 'The ballpark is in Midland’s sports-and-entertainment area rather than downtown, so lodging along a direct Loop 250 or central Midland route can simplify a West Texas baseball weekend.',
    nearby: 'Midland museums, restaurants and other Permian Basin attractions can fill the rest of the trip without requiring a long regional detour.',
    planningLinks: [
      { label: 'Momentum Bank Ballpark', url: 'https://www.milb.com/midland/ballpark' },
      { label: 'Ballpark A–Z guide', url: 'https://www.milb.com/midland/ballpark/ballpark-guidelines' },
      { label: 'RockHounds schedule', url: 'https://www.milb.com/midland/schedule' },
    ],
    imageBrief: 'Momentum Bank Ballpark in Midland during a West Texas sunset baseball game, family areas and broad sky visible, no added text.', verifiedAt,
  },
  'bowers-stadium': {
    city: 'Huntsville', primaryEvents: ['Sam Houston Bearkats football', 'College football game days', 'Athletic and special stadium events'],
    parking: 'Sam Houston publishes a dedicated Bowers Stadium parking map for 2026. Premium and pass parking uses designated areas near the stadium, while broader campus parking options and traffic controls can differ by event.',
    arrival: 'Treat the campus parking map as the source of truth on game day. Stadium-adjacent parking has historically opened several hours before kickoff, so an early campus arrival remains the safer plan.',
    stayAndEat: 'Huntsville’s compact size makes it practical to combine a Bearkats game with downtown dining, campus stops and local history attractions.',
    nearby: 'The Sam Houston State campus, downtown Huntsville and Sam Houston Memorial Museum provide natural additions to a football trip.',
    planningLinks: [
      { label: 'Bowers Stadium facility page', url: 'https://gobearkats.com/facilities/elliott-t-bowers-stadium/2' },
      { label: 'Bowers Stadium fan guide', url: 'https://gobearkats.com/sports/2020/4/30/bowers-stadium-fan-guide-from-a-to-z' },
      { label: '2026 parking map', url: 'https://gobearkats.com/documents/2025/11/26/bowers_stadium_map.pdf' },
    ],
    imageBrief: 'Bowers Stadium in Huntsville on a Sam Houston football game day with campus tailgating and East Texas atmosphere, no added logos or text.', verifiedAt,
  },
  'lupton-stadium': {
    city: 'Fort Worth', primaryEvents: ['TCU Horned Frogs baseball', 'Big 12 baseball series', 'NCAA postseason and special college baseball events'],
    history: 'Lupton Stadium is TCU baseball’s Fort Worth home and regularly hosts high-level college baseball. TCU’s 2026 schedule features a substantial home slate alongside major neutral-site games nearby in Arlington.',
    parking: 'TCU sells and allocates baseball parking through its ticketing system, and availability can change by season. For individual events, follow current Lupton Stadium parking instructions rather than assuming a campus lot is open.',
    arrival: 'The ballpark sits within TCU’s athletics district, so arrive early enough to park and walk through campus. Lot assignments and general-admission procedures can differ for postseason events.',
    stayAndEat: 'Fort Worth lodging near TCU or the central city works well for a baseball weekend and makes it easy to add dining, museums or another sports venue.',
    nearby: 'Amon G. Carter Stadium, Dickies Arena, Will Rogers Memorial Center and central Fort Worth create a deep sports-and-culture itinerary around TCU baseball.',
    planningLinks: [
      { label: 'Lupton Stadium facility guide', url: 'https://gofrogs.com/sports/2018/7/13/facilities-tcu-facilities-baseball-html' },
      { label: 'TCU baseball tickets and parking', url: 'https://gofrogs.com/sports/2018/7/8/baseball-tickets' },
      { label: 'TCU ticket office', url: 'https://gofrogs.com/sports/2018/7/6/tickets-home' },
    ],
    imageBrief: 'Lupton Stadium in Fort Worth during a TCU baseball night game with campus atmosphere and packed grandstand, no added logos or text.', verifiedAt,
  },
  'baylor-ballpark': {
    city: 'Waco', primaryEvents: ['Baylor Bears baseball', 'Big 12 series', 'College baseball tournaments and postseason games'],
    history: 'Magnolia Field at Baylor Ballpark is Baylor baseball’s home along the Brazos River. Baylor scheduled 29 home games there in 2026, including major conference series that make spring baseball a recurring visitor draw in Waco.',
    parking: 'Baylor’s visitor and athletics parking rules vary by event and time of day. Baseball visitors should follow current Baylor Ballpark directions and parking information rather than treating ordinary campus spaces as unrestricted event parking.',
    arrival: 'The riverfront campus setting is straightforward once parked, but major conference weekends can concentrate traffic around University Parks Drive. Arrive early enough to walk from the designated visitor area.',
    stayAndEat: 'Baylor Ballpark works naturally with downtown Waco hotels, riverfront attractions and Baylor campus visits for a one- or two-night spring weekend.',
    nearby: 'McLane Stadium, Foster Pavilion, the Brazos River and central Waco attractions create several easy additions to a baseball trip.',
    planningLinks: [
      { label: 'Baylor Ballpark', url: 'https://baylorbears.com/sports/2018/5/16/facilities-ballpark-html' },
      { label: 'Directions and parking', url: 'https://baylorbears.com/sports/2018/5/16/travel-driving-bay-travel-driving-html' },
      { label: 'Baylor baseball schedule', url: 'https://baylorbears.com/sports/baseball/schedule' },
    ],
    imageBrief: 'Baylor Ballpark on the Brazos River in Waco during a spring baseball game, riverfront and campus context visible, no added logos or text.', verifiedAt,
  },
  'reckling-park': {
    city: 'Houston', primaryEvents: ['Rice Owls baseball', 'College baseball series', 'Postseason and special baseball events'],
    parking: 'Rice offers both advance and game-day baseball parking, with current general parking listed at $12 and donor lots assigned by pass level. The university publishes a dedicated Reckling Park parking map.',
    arrival: 'Rice Athletics and METRO Houston provide a useful car-free option: baseball ticket holders can use METRORail to and from Rice baseball games, with the Dryden/TMC station just over half a mile from the park’s main entrance.',
    stayAndEat: 'The Texas Medical Center and Museum District offer a large hotel and restaurant base, and rail access makes Reckling Park unusually convenient for visitors staying near central Houston.',
    nearby: 'Rice Stadium, the Rice campus, Hermann Park, the Museum District and the Texas Medical Center can all be combined with a baseball visit.',
    planningLinks: [
      { label: 'Reckling Park facility page', url: 'https://riceowls.com/facilities/reckling-park/5' },
      { label: 'Rice Athletics parking', url: 'https://riceowls.com/sports/2022/7/7/rice-athletics-parking' },
      { label: 'Maps and transit directions', url: 'https://riceowls.com/sports/2018/7/17/facilities-driving-parking-directions-html' },
    ],
    imageBrief: 'Reckling Park on the Rice University campus during an evening college baseball game with Houston campus context, no added logos or text.', verifiedAt,
  },
  'xtreme-raceway-park': {
    city: 'Ferris', primaryEvents: ['Drag racing', 'Bracket and specialty race events', 'Test-and-tune and enthusiast events'],
    history: 'Xtreme Raceway Park was developed by racers with an emphasis on the fan and competitor experience after the closure of Texas Raceway. The facility includes covered viewing areas near the starting line and a large shaded pavilion for long race days.',
    parking: 'Event layout and spectator access vary with the racing calendar, so visitors should use the current event listing and track instructions rather than assuming a single universal parking pattern.',
    arrival: 'The track is on the northbound I-45 service road in Ferris, with access around exits 262 and 263A depending on travel direction. Drag-racing events can run for many hours, so arrive with enough buffer for ticketing and finding a viewing area.',
    stayAndEat: 'Ferris is close enough to the southern Dallas metro area for day trips, while visitors attending multi-day race programs may prefer lodging along the I-45 corridor.',
    nearby: 'Texas Motorplex in Ennis and southern Dallas County attractions make this part of a broader North Texas drag-racing corridor.',
    planningLinks: [
      { label: 'Xtreme Raceway Park', url: 'https://www.xtremeracewaypark.com/' },
      { label: 'Track information', url: 'https://www.xtremeracewaypark.com/track-info/' },
      { label: 'Events calendar', url: 'https://www.xtremeracewaypark.com/events/' },
    ],
    imageBrief: 'Xtreme Raceway Park in Ferris during an evening drag-racing event with starting-line action, spectators and Texas sky, no added logos or text.', verifiedAt,
  },
  'jamail-texas-swimming-center': {
    city: 'Austin', opened: '1977', primaryEvents: ['Texas Longhorns swimming and diving', 'National and regional championship meets', 'UIL, club and elite aquatic competition'],
    history: 'Completed in 1977 and named for Lee and Joe Jamail in 1993, the Texas Swimming Center was modeled after the pool used for the 1972 Munich Olympics. The complex includes a 50-meter competition pool, deep diving well and championship diving towers and is home to the Texas Swimming and Diving Hall of Fame.',
    parking: 'Coaches, athletes and spectators are directed to three garages near the swimming center. Event-specific meet information can override ordinary parking guidance, and posted university restrictions remain enforced.',
    arrival: 'The center is at Martin Luther King Jr. Boulevard and Robert Dedman Drive on the southeast side of the UT campus. The public may watch many practices and classes from the grandstands, but deck access is restricted and the facility is not generally open for public recreational swimming.',
    stayAndEat: 'The UT campus and downtown Austin provide abundant lodging and dining, and the venue is close enough to other Longhorn sports facilities to support a multi-event weekend.',
    nearby: 'Moody Center, DKR, UFCU Disch-Falk Field, the UT campus and central Austin attractions form a dense sports-tourism cluster around the swimming center.',
    planningLinks: [
      { label: 'Texas Swimming Center', url: 'https://tsc.utexas.edu/' },
      { label: 'Parking', url: 'https://tsc.utexas.edu/parking' },
      { label: 'Facilities and public-access rules', url: 'https://tsc.utexas.edu/facilities' },
    ],
    imageBrief: 'Lee and Joe Jamail Texas Swimming Center in Austin during a major swim meet, competition pool and spectator grandstands visible, no text overlay.', verifiedAt,
  },
};

export function getSportsVenueEnrichmentBatch8BCompletion(slug: string) {
  return SPORTS_VENUE_ENRICHMENT_BATCH8B_COMPLETION[slug];
}
