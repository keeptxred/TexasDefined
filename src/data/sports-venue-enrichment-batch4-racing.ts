import type { SportsVenueEnrichment } from './sports-venue-enrichment';

const verifiedAt = '2026-08-13';

export const SPORTS_VENUE_ENRICHMENT_BATCH4_RACING: Record<string, SportsVenueEnrichment> = {
  'texas-motorplex': {
    city: 'Ennis',
    primaryEvents: ['NHRA and major drag-racing weekends', 'Stampede of Speed events', 'Drag racing, camping and fan experiences'],
    history: 'Texas Motorplex describes itself as the world’s first single-pour, post-tension concrete drag strip, a distinction that helped establish the Ennis facility as one of the state’s signature drag-racing destinations.',
    parking: 'Major events use event-specific parking passes and arrival instructions. The official visitor guide recommends bringing the parking pass, planning the route in advance and leaving early enough to make the most of the race weekend.',
    arrival: 'Texas Motorplex is on U.S. 287 south of Ennis rather than in a dense entertainment district. Treat travel time, gate rules and the event parking plan as part of the race-day itinerary, especially for NHRA weekends.',
    stayAndEat: 'For major race weekends, lodging in Ennis or along the I-35/I-45 approaches reduces the need for a long late-night drive after racing ends.',
    nearby: 'The track itself is the destination. Build other Ellis County stops around the race schedule rather than trying to leave and return during a major event day.',
    planningLinks: [
      { label: 'Plan a visit', url: 'https://www.texasmotorplex.com/plan-a-visit' },
      { label: 'Texas Motorplex', url: 'https://www.texasmotorplex.com/' },
    ],
    imageBrief: 'Texas drag strip at sunset with long concrete racing surface, grandstands and dramatic launch-area atmosphere, photorealistic Texas travel editorial, no logos or text.',
    verifiedAt,
  },
  'msr-houston': {
    city: 'Angleton',
    primaryEvents: ['Road-course track days', 'Member and guest driving', 'Racing schools, karting and private motorsports events'],
    history: 'MSR Houston occupies 163 acres south of Houston and includes a 2.38-mile, 17-turn road course, a karting circuit, large paddock and private garages. The main track can operate clockwise or counter-clockwise and is FIA approved.',
    parking: 'MSR Houston is primarily a participant-focused facility rather than a walk-up spectator stadium. Members, guests and event participants should check in at the front office and follow the assigned paddock, garage or event instructions on arrival.',
    arrival: 'All members and guests must sign in before track access, and drivers need to know the current track direction, conditions and session schedule. Driving experiences and rentals should be booked in advance rather than treated as a spontaneous visitor stop.',
    stayAndEat: 'Because the facility is near Angleton and roughly 35 miles south of downtown Houston, motorsports visitors should plan lodging around the track schedule first and Houston sightseeing second.',
    nearby: 'The Gulf Coast location makes MSR Houston useful as a specialized driving destination, but event days are best kept focused on the circuit and paddock.',
    planningLinks: [
      { label: 'MSR Houston facility', url: 'https://msrhouston.com/about/facility/' },
      { label: 'Track rules', url: 'https://msrhouston.com/about/track-rules/' },
      { label: 'Track calendar', url: 'https://msrhouston.com/calendar/' },
    ],
    imageBrief: 'Technical Texas road course near Houston with sports cars on a sweeping corner, paddock and flat Gulf Coast landscape visible, no logos or text.',
    verifiedAt,
  },
  'eagles-canyon-raceway': {
    city: 'Decatur',
    primaryEvents: ['Open track days', 'Club and enthusiast driving', 'Road racing and private motorsports events'],
    history: 'Eagles Canyon Raceway describes its North Texas facility as a private FIA-spec 2.7-mile road course with 15 turns, more than 200 feet of elevation change and a 2,200-foot back straight.',
    parking: 'This is a private road-course environment, so parking and paddock access depend on the specific event or registration. Drivers and guests should use the event instructions rather than assuming stadium-style public parking.',
    arrival: 'Confirm registration, track-day eligibility and event start time before driving to Decatur. The circuit publishes office hours and event contacts, and participant days can begin early.',
    stayAndEat: 'For multi-day events, Decatur and the north Fort Worth corridor provide practical lodging bases without forcing a long drive after a full day on track.',
    nearby: 'ECR works best as the centerpiece of an enthusiast weekend; add North Texas stops only when the track schedule leaves a clear evening or extra day.',
    planningLinks: [
      { label: 'Eagles Canyon Raceway', url: 'https://eaglescanyon.com/' },
      { label: 'Contact and track facts', url: 'https://eaglescanyon.com/contact-us/' },
    ],
    imageBrief: 'Rolling North Texas road course with elevation changes, fast sports car and broad ranch-country horizon, premium motorsports travel photography, no text overlay.',
    verifiedAt,
  },
  'houston-motorsports-park': {
    city: 'Houston',
    primaryEvents: ['Short-track oval racing', 'Drag-racing nights', 'Test-and-tune and grassroots motorsports'],
    parking: 'Houston Motorsports Park is a grassroots race facility with schedules that can change because of weather and event operations. Visitors should verify the current race listing and event instructions before driving to the track.',
    arrival: 'Race nights and test-and-tune sessions can have different gate and start times. Use the current official schedule and arrive early enough to handle tickets, pit or spectator access and any event-specific rules.',
    stayAndEat: 'Local visitors can treat HMP as an event-night destination; travelers coming from farther across Texas should choose northeast Houston lodging that avoids a long post-race cross-city drive.',
    nearby: 'This is a motorsports-first stop rather than a polished entertainment district, so pair other Houston attractions with a separate block of the trip.',
    planningLinks: [
      { label: 'Houston Motorsports Park', url: 'https://www.houstonmotorsportspark.com/' },
    ],
    imageBrief: 'Grassroots Houston short-track motorsports at night with oval track lights and drag-racing energy, realistic local-racing atmosphere, no logos or text.',
    verifiedAt,
  },
  'lone-star-park': {
    city: 'Grand Prairie',
    primaryEvents: ['Live Thoroughbred racing', 'Live Quarter Horse racing', 'Simulcast racing and major race-day events'],
    history: 'Lone Star Park is a major DFW racing destination with a multi-level glass-enclosed grandstand, Silks dining, suites and the year-round Bar & Book simulcast facility. The track reports hundreds of thousands of annual guests.',
    parking: 'General parking is normally free, with preferred and valet options available through designated gates. Special major event days can use different parking prices or procedures, so visitors should check the current event listing.',
    arrival: 'Gate and first-post times vary between Thoroughbred, Quarter Horse and special-event dates. Choose the admission gate based on ticket or dining needs and arrive before first post if the full race-day experience matters.',
    stayAndEat: 'Grand Prairie’s location between Dallas and Fort Worth makes Lone Star Park easy to combine with a Metroplex weekend while keeping lodging flexible.',
    nearby: 'The track sits within the broader Grand Prairie/Arlington visitor corridor, opening up sports and entertainment combinations on a multi-day trip.',
    planningLinks: [
      { label: 'Plan your visit', url: 'https://www.lonestarpark.com/plan-your-visit/' },
      { label: 'Getting here and parking', url: 'https://www.lonestarpark.com/getting-here/' },
      { label: 'Visitor FAQ', url: 'https://www.lonestarpark.com/faqs/' },
    ],
    imageBrief: 'Live horse racing at a large North Texas grandstand track in golden evening light, horses rounding the turn with spectators visible, no text overlay.',
    verifiedAt,
  },
  'sam-houston-race-park': {
    city: 'Houston',
    primaryEvents: ['Live Thoroughbred racing', 'Live Quarter Horse racing', 'Year-round simulcast racing and entertainment'],
    parking: 'Sam Houston Race Park has a dedicated 3,500-space parking lot, including accessible spaces. General parking is free for live racing and simulcast days, while other events may set separate parking fees.',
    arrival: 'Live-racing calendars change seasonally; the track also operates simulcast days. Confirm whether the visit is for live racing or simulcast wagering and use the current gate and post times before leaving home.',
    stayAndEat: 'The track is about 15 minutes from downtown Houston according to the venue, so visitors can stay either near northwest Houston for convenience or downtown for a broader city weekend.',
    nearby: 'Pair the race park with other Houston attractions on a separate day or half-day rather than trying to move between distant venues during a live-racing card.',
    planningLinks: [
      { label: 'Sam Houston Race Park', url: 'https://www.shrp.com/' },
      { label: 'Contact, hours and parking', url: 'https://www.shrp.com/about-us/contact-us' },
      { label: 'Tickets and racing hours', url: 'https://www.shrp.com/tickets' },
    ],
    imageBrief: 'Houston-area horse race track at twilight with illuminated grandstand, live racing and Gulf Coast evening sky, no added logos or text.',
    verifiedAt,
  },
  'retama-park': {
    city: 'Selma',
    opened: '1995',
    primaryEvents: ['Live Quarter Horse racing', 'Simulcast racing', 'Family events and special entertainment'],
    history: 'Retama Park is a Class 1 pari-mutuel racetrack in Selma, about 20 minutes from downtown San Antonio. The venue opened in 1995 and continues to host seasonal live Quarter Horse racing alongside simulcast wagering and special events.',
    parking: 'Parking is free year-round for live-racing and simulcast guests. The track publishes separate guidance for simulcast parking and visitor entry, and its main visit page lists directions from both Austin and San Antonio.',
    arrival: 'The venue publishes current live-race dates and notes that gates for regular simulcast operations open at 10:30 a.m. Wednesday through Sunday. Check the event calendar because live-racing and special-event schedules differ.',
    stayAndEat: 'Selma’s I-35 location makes Retama Park convenient for visitors staying in northeast San Antonio or along the corridor toward New Braunfels.',
    nearby: 'The venue itself highlights nearby attractions including Morgan’s Wonderland and Natural Bridge-area destinations, giving race visitors easy options for a broader family weekend.',
    planningLinks: [
      { label: 'Visit Retama Park', url: 'https://www.retamapark.com/visit' },
      { label: 'Retama Park', url: 'https://www.retamapark.com/' },
    ],
    imageBrief: 'South Texas horse racing venue in Selma with racetrack and grandstand under warm evening light, family-friendly travel-editorial scene, no text overlay.',
    verifiedAt,
  },
};

export function getSportsVenueEnrichmentBatch4Racing(slug: string) {
  return SPORTS_VENUE_ENRICHMENT_BATCH4_RACING[slug];
}
