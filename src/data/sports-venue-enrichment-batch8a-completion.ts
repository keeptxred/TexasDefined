import type { SportsVenueEnrichment } from './sports-venue-enrichment';

const verifiedAt = '2026-08-13';

export const SPORTS_VENUE_ENRICHMENT_BATCH8A_COMPLETION: Record<string, SportsVenueEnrichment> = {
  'reliant-stadium': {
    city: 'Houston', capacity: '72,220', opened: '2002',
    primaryEvents: ['Houston Texans home games', 'RODEOHOUSTON', 'International soccer, concerts and major stadium events'],
    history: 'Reliant Stadium opened in 2002 as Houston’s retractable-roof NFL stadium. In August 2026 the venue returned to the Reliant Stadium name after operating for years as NRG Stadium, while remaining the home of the Houston Texans and the signature stadium at NRG Park.',
    parking: 'Texans gameday parking is overwhelmingly pre-paid. Most parking lots open four hours before kickoff, while Platinum opens five hours before kickoff; the team publishes lot-specific approach routes for major event days.',
    arrival: 'Fans without a parking pass should consider METRORail or rideshare. The Texans designate Yellow Lot 35 near Gate 16B off Main Street for rideshare and taxi activity, and METRORail serves home games.',
    stayAndEat: 'The stadium is beside the Texas Medical Center and convenient to Museum District and central Houston lodging, making rail-connected hotels a practical alternative to driving directly into a major-event lot.',
    nearby: 'NRG Park, the Texas Medical Center, Houston Museum District and Hermann Park can turn a Texans or rodeo trip into a broader Houston weekend.',
    planningLinks: [
      { label: 'Texans stadium A–Z guide', url: 'https://www.houstontexans.com/stadium/a-z-guide' },
      { label: 'Parking and tailgating', url: 'https://www.houstontexans.com/stadium/parking-tailgating/' },
      { label: 'Stadium maps', url: 'https://www.houstontexans.com/stadium/maps' },
    ],
    imageBrief: 'Reliant Stadium in Houston at dusk during a major event, wide exterior travel-editorial view with arriving fans, no added logos or text.', verifiedAt,
  },
  'comerica-center': {
    city: 'Frisco', primaryEvents: ['Texas Legends basketball', 'Dallas Pulse volleyball', 'Hockey, skating and touring arena events'],
    parking: 'General event parking is centered on Garage E, with Garage F used on an event-by-event basis. Texas Legends parking uses both garages, and accessible spaces are available on each level subject to availability.',
    arrival: 'The arena sits in Frisco’s sports-and-entertainment district on Avenue of the Stars. Choose the appropriate garage before entering the district and arrive early when nearby venues also have events.',
    stayAndEat: 'Comerica Center is surrounded by Frisco hotels, restaurants and sports destinations, so an arena event can be paired easily with a broader Frisco weekend.',
    nearby: 'The Star, Riders Field and Toyota Stadium are close enough to make this part of a multi-venue Frisco sports itinerary.',
    planningLinks: [
      { label: 'Directions and parking', url: 'https://www.comericacenter.com/directions-parking' },
      { label: 'Plan your visit', url: 'https://www.comericacenter.com/plan-your-visit' },
      { label: 'Events calendar', url: 'https://www.comericacenter.com/events' },
    ],
    imageBrief: 'Comerica Center in Frisco on an event night with nearby sports-district context, polished travel-editorial photography, no added text.', verifiedAt,
  },
  'riders-field': {
    city: 'Frisco', opened: '2003', primaryEvents: ['Frisco RoughRiders home games', 'College and specialty baseball events', 'Family promotions and community events'],
    history: 'Riders Field has been home to the Frisco RoughRiders, the Double-A affiliate of the Texas Rangers, since 2003. Its distinctive architecture and later additions—including the outfield Lazy River—have made it one of the state’s most recognizable minor-league ballparks.',
    parking: 'Game parking can be purchased in advance. Lots normally open two hours before the scheduled game time, accessible parking is available in Lot B, and fans are encouraged to pre-purchase for busy dates.',
    arrival: 'Ballpark gates generally open about one hour before first pitch. The Home Plate Gate is at Diamond Drive and RoughRiders Trail, with a second entrance at the Left Field Gate.',
    stayAndEat: 'Frisco’s hotel and restaurant inventory makes Riders Field an easy family-weekend anchor, particularly when paired with another event elsewhere in the sports district.',
    nearby: 'Comerica Center, The Star and Toyota Stadium give visiting baseball fans several nearby sports-tourism options.',
    planningLinks: [
      { label: 'Parking and directions', url: 'https://www.milb.com/frisco/ballpark/parking' },
      { label: 'Know before you go', url: 'https://www.milb.com/frisco/ballpark/know-before-you-go' },
      { label: 'Riders Field guide', url: 'https://www.milb.com/frisco/ballpark/ballpark' },
    ],
    imageBrief: 'Riders Field in Frisco during a summer evening baseball game, distinctive architecture and family atmosphere, no added logos or text.', verifiedAt,
  },
  'credit-union-of-texas-event-center': {
    city: 'Allen', capacity: '7,000+', primaryEvents: ['Allen Americans hockey', 'Boxing, skating and indoor sports', 'Concerts, graduations and touring events'],
    history: 'The City of Allen-owned arena, formerly Allen Event Center, hosts more than 100 events in a typical year and is home to the ECHL’s Allen Americans while also accommodating national competitions and touring entertainment.',
    parking: 'Event visitors should use the South Parking Garage; uncovered retail parking around the arena is not event parking. The venue advertises free South Garage parking for many ticketed events.',
    arrival: 'The arena is immediately off Stacy Road near US 75. Because it shares The Village at Allen with retail and dining, follow arena parking signs rather than using the closest retail lot.',
    stayAndEat: 'Hotels, restaurants and shopping are within walking distance, including lodging immediately next to the arena.',
    nearby: 'Allen shopping and dining plus Eagle Stadium elsewhere in the city can support a fuller North Texas sports weekend.',
    planningLinks: [
      { label: 'Directions and parking', url: 'https://www.cutxeventcenter.com/plan-your-visit/directions-parking' },
      { label: 'Plan your visit', url: 'https://www.cutxeventcenter.com/31/Plan-Your-Visit' },
      { label: 'Events', url: 'https://www.cutxeventcenter.com/events' },
    ],
    imageBrief: 'Credit Union of Texas Event Center in Allen at dusk with the surrounding mixed-use district and event arrivals visible, no added logos or text.', verifiedAt,
  },
  'moody-coliseum-smu': {
    city: 'University Park', primaryEvents: ['SMU men’s basketball', 'SMU women’s basketball', 'SMU volleyball and campus events'],
    parking: 'For 2026-27 men’s basketball, general parking is designated in Binkley and Meadows Parking Centers and is cashless. Women’s basketball generally routes traffic through SMU Boulevard to free parking in Moody Garage, with exceptions possible on doubleheader dates.',
    arrival: 'Moody Coliseum is embedded in the SMU campus, so visitors should use the current sport-specific parking map instead of relying on ordinary weekday campus assumptions.',
    stayAndEat: 'University Park, Highland Park and nearby central Dallas provide a broad hotel and dining base for ACC basketball weekends.',
    nearby: 'Gerald J. Ford Stadium and the rest of the SMU campus make it easy to combine a game with a university visit, while central Dallas attractions are a short trip away.',
    planningLinks: [
      { label: 'SMU parking', url: 'https://smumustangs.com/sports/2016/6/8/parking.aspx' },
      { label: 'Moody Coliseum policies', url: 'https://smumustangs.com/sports/2018/11/8/stadium-policies-moody-coliseum.aspx' },
      { label: 'Tickets and seating', url: 'https://app.smumustangs.com/SeatPricing' },
    ],
    imageBrief: 'Moody Coliseum on the SMU campus during a basketball night, lively collegiate atmosphere and campus architecture, no added text.', verifiedAt,
  },
  'unt-coliseum': {
    city: 'Denton', primaryEvents: ['North Texas men’s basketball', 'North Texas women’s basketball', 'University and special events'],
    history: 'UNT Coliseum is better known as the Super Pit and remains the home of Mean Green men’s and women’s basketball. UNT announced new premium courtside seating and parking allocation changes for the 2026-27 season.',
    parking: 'UNT is reallocating high-demand Highland Street basketball parking for 2026-27 according to donor levels and priority rank. General visitors should use current Mean Green basketball parking information rather than assuming prior-season lots remain unchanged.',
    arrival: 'The Super Pit sits within the UNT athletics campus in Denton. Build in time for campus circulation and walking, especially while the 2026 parking changes are implemented.',
    stayAndEat: 'Downtown Denton and the university district offer a compact restaurant, music and lodging environment for an overnight game trip.',
    nearby: 'DATCU Stadium and the broader UNT campus give visitors another sports stop, while the Denton Square provides the strongest off-campus visitor cluster.',
    planningLinks: [
      { label: 'The Super Pit', url: 'https://meangreensports.com/facilities/the-super-pit/5' },
      { label: '2026 seating and parking changes', url: 'https://meangreensports.com/news/2026/3/26/general-unt-athletics-announces-super-pit-re-seating-and-parking-changes' },
    ],
    imageBrief: 'The Super Pit in Denton during a North Texas basketball game, packed collegiate arena atmosphere, no added logos or text.', verifiedAt,
  },
  'rice-stadium': {
    city: 'Houston', capacity: '47,000', opened: '1950', primaryEvents: ['Rice Owls football', 'University ceremonies', 'Major campus and special events'],
    history: 'Rice Stadium opened in 1950 and remains one of Houston’s most historically significant sports venues. It hosted President John F. Kennedy’s 1962 moon speech and Super Bowl VIII, and Rice describes 2026 as the start of a transformational period tied to its Gateway Project.',
    parking: 'Rice Athletics publishes event-specific parking and booking links for the stadium. Visitors should choose a stadium lot or transit plan before entering the campus street network.',
    arrival: 'The campus location offers both driving and METRORail options. Allow time for the walk from parking or rail and check current renovation guidance as the Gateway Project advances.',
    stayAndEat: 'The Texas Medical Center, Museum District and nearby central Houston neighborhoods provide abundant hotels and restaurants for a Rice football weekend.',
    nearby: 'Reckling Park, the Rice campus, Hermann Park, the Museum District and the Texas Medical Center form a dense visitor cluster around the stadium.',
    planningLinks: [
      { label: 'Rice Stadium facility page', url: 'https://riceowls.com/facilities/rice-stadium/3' },
      { label: 'Maps and directions', url: 'https://riceowls.com/sports/2018/7/17/facilities-driving-parking-directions-html' },
      { label: 'Rice Athletics parking', url: 'https://riceowls.com/sports/2022/7/7/rice-athletics-parking' },
    ],
    imageBrief: 'Historic Rice Stadium in Houston on a college football evening with campus context, classic Texas sports travel photography, no added text.', verifiedAt,
  },
  'constellation-field': {
    city: 'Sugar Land', primaryEvents: ['Sugar Land Space Cowboys home games', 'Specialty baseball and community events', 'Fireworks and family promotions'],
    history: 'Constellation Field is home to the Sugar Land Space Cowboys, the Houston Astros’ Triple-A affiliate. The 2026 schedule contains 75 home games and the venue also hosts specialty baseball events and community programming.',
    parking: 'The ballpark has more than 2,000 spaces in Lots A and B. Standard Space Cowboys parking is cheaper when bought before game day, accessible parking is available in both lots, and tailgating is not permitted under the team’s agreement with the City of Sugar Land.',
    arrival: 'Parking lots generally open two hours before posted gate time. Gates usually open one hour before first pitch, or 90 minutes before first pitch on many giveaway dates.',
    stayAndEat: 'Sugar Land provides family-friendly lodging and dining for visitors who want to make a Space Cowboys game part of a suburban Houston weekend.',
    nearby: 'Sugar Land Town Square, local museums and Fort Bend County attractions are natural additions before or after a game.',
    planningLinks: [
      { label: 'Directions and parking', url: 'https://www.milb.com/sugar-land/ballpark/directions' },
      { label: 'Pre-purchase parking', url: 'https://www.milb.com/sugar-land/tickets/parking' },
      { label: '2026 promotions', url: 'https://www.milb.com/sugar-land/tickets/promotions' },
    ],
    imageBrief: 'Constellation Field in Sugar Land during a summer evening baseball game with family-friendly atmosphere, no added text.', verifiedAt,
  },
};

export function getSportsVenueEnrichmentBatch8ACompletion(slug: string) {
  return SPORTS_VENUE_ENRICHMENT_BATCH8A_COMPLETION[slug];
}
