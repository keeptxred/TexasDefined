import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curated: Record<string, Partial<Destination>> = {
  "mother-neff-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $2 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/mother-neff", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Gate and visitor center", detail: "The park gate is open daily 8 a.m.–8 p.m.; the visitor center is open 9 a.m.–4 p.m. and closes from noon to 1 p.m. on weekdays.", sourceUrl: "https://tpwd.texas.gov/state-parks/mother-neff", checkedAt: "2026-10-21" },
      { topic: "access", label: "South gate closure", detail: "The entrance gate at the south end of the park is closed indefinitely. Use the park's published directions to the operating gate.", sourceUrl: "https://tpwd.texas.gov/state-parks/mother-neff", checkedAt: "2026-10-21" },
    ],
    summary: "Texas' first state park, a compact Central Texas landscape of prairie, limestone bluffs, wooded creek bottoms and a historic Civilian Conservation Corps legacy near the Leon River.",
    nearestTown: "Moody",
    bestSeason: "Fall through spring for comfortable hiking and prairie walks",
    entryNote: "A smaller park that works well as a half-day stop; check current trail and facility notices before arrival.",
    highlights: ["Texas' first state park", "CCC-built structures and historic park landscape", "Prairie and limestone bluff trails", "Birding and family-friendly nature walks"],
    body: [
      "Mother Neff occupies an outsized place in Texas park history. Land donated by Isabella Eleanor Neff became the nucleus of what is recognized as the state's first state park, and later Civilian Conservation Corps work helped shape the visitor landscape still seen today.",
      "The park is compact enough to explore without turning the day into an endurance hike. Trails move between prairie, wooded creek bottoms and limestone terrain, while historic structures give the visit a second layer beyond scenery.",
      "Treat Mother Neff as a slower, history-rich park rather than a checklist of major attractions. Cooler months are especially pleasant for walking, birding and exploring the CCC-era landscape."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/mother-neff",
  },
  "lockhart-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $3 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/lockhart", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Gate hours and seasonal office", detail: "Park open daily 6 a.m.–10 p.m. Office March–September: 7:30 a.m.–7 p.m. except Wednesday until 5 p.m.; October–February: 7:30 a.m.–5 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/lockhart", checkedAt: "2026-10-21" },
      { topic: "swimming", label: "Pool season", detail: "The swimming pool season typically runs from Memorial Day weekend through Labor Day weekend; check park notices for current pool access.", sourceUrl: "https://tpwd.texas.gov/state-parks/lockhart", checkedAt: "2026-10-21" },
    ],
    summary: "A small Central Texas state park beside Clear Fork Creek, notable for wooded trails, a historic CCC-built recreation landscape and the only golf course in the Texas State Park system.",
    nearestTown: "Lockhart",
    bestSeason: "Fall through spring for hiking and golf; summer visits are best early or late in the day",
    entryNote: "Easy to combine with a Lockhart day trip; verify golf-course hours and current park conditions before visiting.",
    highlights: ["Historic nine-hole state-park golf course", "Civilian Conservation Corps structures", "Short wooded and creekside trails", "Close access to Lockhart's historic downtown"],
    body: [
      "Lockhart State Park is different from Texas' big landscape parks. Its appeal comes from a compact mix of recreation, history and shade just outside one of the state's best-known small towns.",
      "The nine-hole golf course is the unusual centerpiece, while trails and CCC-era stonework make the park useful even for visitors who never pick up a club. Clear Fork Creek and wooded terrain soften the surrounding prairie landscape.",
      "Because the park is small, it fits naturally into a broader Lockhart itinerary. Pair a few hours outdoors with the courthouse square, local history or the city's barbecue traditions rather than expecting a full wilderness day."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/lockhart",
  },
  "longhorn-cavern-state-park": {
    visitorFacts: [
      { topic: "hours", label: "Park grounds and holiday", detail: "Park grounds and facilities open daily except December 25. Tour schedules are provided separately by the cavern operator.", sourceUrl: "https://tpwd.texas.gov/state-parks/longhorn-cavern", checkedAt: "2026-10-21" },
      { topic: "reservations", label: "Cavern tour admission and schedule", detail: "Cave-tour fees and times are set by the cave-tour operator; check the tour schedule or contact the park before visiting.", sourceUrl: "https://tpwd.texas.gov/state-parks/longhorn-cavern", checkedAt: "2026-10-21" },
      { topic: "camping", label: "Day-use only park", detail: "Longhorn Cavern State Park has no overnight camping; TPWD directs overnight visitors to nearby Inks Lake State Park.", sourceUrl: "https://tpwd.texas.gov/state-parks/longhorn-cavern", checkedAt: "2026-10-21" },
    ],
    summary: "A Hill Country cavern carved by ancient underground water, explored on guided tours beneath a historic 1930s Civilian Conservation Corps park landscape near Burnet.",
    nearestTown: "Burnet",
    bestSeason: "Year-round; the cavern offers a naturally cooler underground outing during hot weather",
    entryNote: "Cavern access is by guided tour and tour availability is separate from ordinary park entry. Reserve popular tour times ahead.",
    highlights: ["Guided walking tours through Longhorn Cavern", "Distinctive water-carved underground passages", "CCC-era stone architecture above ground", "Hill Country overlooks and historic park grounds"],
    body: [
      "Longhorn Cavern is less about a surface trail system and more about the geology beneath it. Ancient water shaped long passages and smooth limestone forms that differ from the dripstone-heavy caves many visitors expect.",
      "Guided tours are the primary way into the cavern, and the experience is complemented by Civilian Conservation Corps stonework on the surface. The historic buildings and observation areas make the park worth exploring before or after a tour.",
      "Book the cavern experience first and build the rest of the visit around that time. Comfortable walking shoes are useful underground, and the cave's stable temperature makes this one of the Hill Country's dependable hot-weather outings."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/longhorn-cavern",
  },
  "martin-dies-jr-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $4 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park and headquarters schedule", detail: "The park is open daily 6 a.m.–10 p.m. Headquarters opens 8:30 a.m.–noon and 1:15–5 p.m., with a midday closure.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr", checkedAt: "2026-10-21" },
    ],
    summary: "An East Texas park where the Angelina and Neches river country meets the edge of the Big Thicket, with paddling, cypress-lined sloughs, fishing and forest camping around the B.A. Steinhagen Reservoir.",
    nearestTown: "Jasper",
    bestSeason: "Fall through spring for paddling, hiking and camping with lower heat and humidity",
    entryNote: "Water levels and weather influence paddling conditions; summer heat, insects and storms require preparation.",
    highlights: ["Paddling through East Texas sloughs and cypress habitat", "Fishing and boating on B.A. Steinhagen Reservoir", "Pine and hardwood forest trails", "Birding and wildlife at the edge of the Big Thicket region"],
    body: [
      "Martin Dies, Jr. State Park feels distinctly East Texan. Water, pine forest, hardwood bottomland and cypress habitat meet around B.A. Steinhagen Reservoir, creating a park better understood from a canoe or quiet shoreline than from a scenic overlook.",
      "Paddling is a signature experience, but fishing, camping, birding and short forest walks make it easy to build a relaxed weekend. The landscape changes subtly with water level and season, rewarding repeat visits.",
      "Warm-season humidity and insects can be intense, while storms can quickly alter conditions on open water. Check forecasts and park alerts, carry appropriate insect protection and use a life jacket when paddling."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr",
  },
  "mission-tejas-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $4 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/mission-tejas", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Days of operation", detail: "Texas Parks and Wildlife lists the park as open daily; verify current gate access and conditions before arrival.", sourceUrl: "https://tpwd.texas.gov/state-parks/mission-tejas", checkedAt: "2026-10-21" },
    ],
    summary: "A quiet East Texas history-and-nature park preserving a 1930s reconstruction of Mission San Francisco de los Tejas, the Rice Family Log Home and pineywoods trails along El Camino Real.",
    nearestTown: "Grapeland",
    bestSeason: "Fall through spring for comfortable hiking and historical exploration",
    entryNote: "Allow time for both the historic structures and trails; check interpretive-building access and current park notices before traveling.",
    highlights: ["Mission San Francisco de los Tejas reconstruction", "Rice Family Log Home", "El Camino Real history", "Pineywoods hiking and camping"],
    body: [
      "Mission Tejas connects two stories that are easy to miss when driving modern East Texas highways: the Spanish mission era and the much longer travel corridor of El Camino Real. The park's reconstructed mission and preserved log home make those stories tangible.",
      "Beyond the historic structures, trails run through the Piney Woods and give the park the feel of a small forest retreat. It works particularly well for travelers who want history without giving up an outdoor component.",
      "Spend time with the interpretive material rather than treating the mission as a quick photo stop. The combination of architecture, road history and forest landscape is what makes the park distinctive."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/mission-tejas",
  },
  "meridian-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $5 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/meridian", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park and office hours", detail: "The park is open daily 6 a.m.–10 p.m.; office hours are daily 8:15 a.m.–4:45 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/meridian", checkedAt: "2026-10-21" },
    ],
    summary: "A small limestone-and-cedar park northwest of Waco centered on a spring-fed lake built by the Civilian Conservation Corps, with trails, fishing, paddling and historic stonework.",
    nearestTown: "Meridian",
    bestSeason: "Fall through spring for hiking; warm months add swimming and paddling",
    entryNote: "The park is compact and popular for weekend camping; reserve campsites and check lake conditions before water activities.",
    highlights: ["Spring-fed Lake Meridian", "CCC-built stone structures", "Bosque County limestone and cedar trails", "Fishing, paddling and seasonal swimming"],
    body: [
      "Meridian State Park is a classic small Texas park built around water. Civilian Conservation Corps crews created the lake and much of the stone infrastructure, leaving a landscape where recreation and park history are tightly connected.",
      "A loop around the lake introduces the limestone-and-cedar terrain, while fishing and paddling make the water more than scenery. The scale is manageable for families and for travelers who want an outdoor stop without committing to a large backcountry park.",
      "Camping weekends can be busy despite the park's small footprint. Reserve ahead when staying overnight and check current swimming or water notices before planning the day around the lake."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/meridian",
  },
  "martin-creek-lake-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission and capacity", detail: "Entry is $4 daily for visitors 13 and older; younger children enter free. Reserve ahead; capacity is limited.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/entrance-fees", checkedAt: "2026-11-21" },
      { topic: "hours", label: "Park gate and holiday office hours", detail: "Gate: 6 a.m.–10 p.m. daily. Office closes at noon on Thanksgiving and all day December 25.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake", checkedAt: "2026-11-21" },
      { topic: "reservations", label: "Reserve day use or overnight lodging", detail: "Book this park directly online or call (512) 389-8900.", sourceUrl: "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121", checkedAt: "2026-11-21" },
      { topic: "access", label: "Wheelchair-accessible features", detail: "Accessible headquarters/restrooms, pier, island bridge and picnic sites. Cabins with bathrooms and pavilion have accessible features but are not fully ADA compliant.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake/fees-facilities/martin-creek-lake-accessibility", checkedAt: "2026-11-21" },
      { topic: "access", label: "Invasive ants", detail: "Argentine ants occur at some campsites; inspect gear before leaving and notify park staff.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake/alert", checkedAt: "2026-11-21" },
      { topic: "access", label: "Firewood movement restrictions", detail: "Buy local firewood (emerald ash borer quarantine); check current fire rules.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake", checkedAt: "2026-11-21" },
    ],
    summary: "Martin Creek Lake State Park near Tatum: compare three trails, warm-water fishing, boat access, island camping, cabins, day passes and accessible facilities.",
    nearestTown: "Tatum",
    address: "9515 County Road 2181D, Tatum, TX 75691-3425",
    coordinates: { lat: 32.277950, lng: -94.566051 },
    directions: "From Tatum, take TX-43 southwest 3.5 miles, then turn south on County Road 2183. About 20 miles southeast of Longview.",
    bestSeason: "Fall and winter for forest walks and fishing; spring and summer are busiest. Plan for heat and thunderstorms.",
    entryNote: "Reserve day use or lodging. Entry $4 per day ages 13+, under 13 free; overnight fees extra. Park: (903) 836-4336.",
    highlights: ["Old Henderson Road Loop, Harmony Hill and Island Trails", "Lighted fishing pier and four-lane boat ramp", "Island walk-in tent sites, screened shelters and cabins", "286-acre park opened in 1976", "Accessible pier, bridge and picnic sites"],
    body: [
      "The 286-acre park sits on a 4,981-acre cooling-water reservoir. It suits short wooded walks and shore fishing rather than long backcountry hikes.",
      "Pair pier fishing with the 0.9-mile island walk, or explore the 1.4-mile Old Henderson Road and 1.7-mile Harmony Hill loops to discover the area's former trade route and settlement.",
      "Developed camps suit RV or tent camping; primitive island sites require carrying supplies across a footbridge. Shelters and cottages provide roofs without private bathrooms. Compare specific hookups in the separate RV guide."
    ],
    sourceCheckedAt: "2026-11-21",
    updatedAt: "2026-11-21",
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake",
    reservationUrl: "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121",
  },
  "atlanta-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $3 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/atlanta", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Daily park hours", detail: "The park is open daily from 6 a.m. to 10 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/atlanta", checkedAt: "2026-10-21" },
    ],
    summary: "A wooded Northeast Texas park on Wright Patman Lake, combining tall pines, hardwood forest, swimming, fishing, paddling and lakeside camping near Texarkana.",
    nearestTown: "Atlanta",
    bestSeason: "Spring and fall for camping and trails; summer is popular for lake recreation",
    entryNote: "Swimming and boating conditions vary with weather and lake levels; check current alerts before a water-focused visit.",
    highlights: ["Wright Patman Lake shoreline", "Pine and hardwood forest", "Swimming, fishing and paddling", "Lakeside campsites and birding"],
    body: [
      "Atlanta State Park brings a distinctly wooded character to Wright Patman Lake. Tall pines and hardwoods frame much of the shoreline, giving campsites and picnic areas more shade than visitors may expect from a reservoir park.",
      "The lake drives the itinerary: swimming, fishing, paddling and boating are the main warm-weather activities, while forest walks and birding make spring and fall especially comfortable.",
      "This is a straightforward park to enjoy, but water conditions still matter. Check lake levels, swimming notices and forecasts before departure, particularly after storms or during periods of extreme summer heat."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/atlanta",
  },
  "bonham-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $4 daily; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/bonham", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park and office hours", detail: "The park is open daily 6 a.m.–10 p.m.; office hours are 8:15 a.m.–4:45 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/bonham", checkedAt: "2026-10-21" },
    ],
    summary: "A compact North Texas park built by the Civilian Conservation Corps around a small lake, with wooded trails, paddling, fishing and historic stone-and-timber structures northeast of Dallas.",
    nearestTown: "Bonham",
    bestSeason: "Fall through spring for trails and picnics; warm months suit paddling and swimming when open",
    entryNote: "Because the lake and park are small, verify swimming status and capacity before making a water-focused trip.",
    highlights: ["CCC-built park architecture", "Small lake for fishing and paddling", "Wooded hiking and biking trails", "Easy North Texas day-trip scale"],
    body: [
      "Bonham State Park is one of the state's intimate CCC-era parks. The small lake, stonework and wooded slopes fit together at a human scale, making it a good choice when the goal is a relaxed outdoor day rather than a major expedition.",
      "Trails circle through forest and connect naturally with the lake, where fishing and paddling are popular. Historic structures add visual character and help explain how early state-park development shaped the site.",
      "The park's compact size is an advantage for families and day trips, but it also means busy periods can feel full. Check current alerts and water-use conditions before leaving home."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/bonham",
  },
  "buescher-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Day-use admission", detail: "Adults 13 and older pay $5 daily; children 12 and younger enter free. TPWD lists a separate adult group day-use rate.", sourceUrl: "https://tpwd.texas.gov/state-parks/buescher", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Daily park hours", detail: "The park is open daily from 6 a.m. to 10 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/buescher", checkedAt: "2026-10-21" },
    ],
    summary: "A wooded park near Smithville connected to Bastrop State Park by a scenic road, with a small lake, CCC history and trails through recovering Lost Pines habitat.",
    nearestTown: "Smithville",
    bestSeason: "Fall through spring for hiking and cycling; warm months work well for paddling and fishing",
    entryNote: "Wildfire and storm recovery can affect trails and vegetation. Check current closures before planning the Bastrop-Buescher scenic drive or longer hikes.",
    highlights: ["Scenic Park Road 1C connection with Bastrop State Park", "Small lake for paddling and fishing", "CCC-era park structures", "Lost Pines ecology and wildfire recovery landscape"],
    body: [
      "Buescher State Park is best understood as part of the larger Lost Pines story. Its forest, lake and CCC landscape connect naturally with nearby Bastrop State Park, while the winding road between them is itself one of the area's signature drives.",
      "The small lake supports paddling and fishing, and trails move through a landscape shaped by both the distinctive Lost Pines ecosystem and major wildfires. That recovery is part of what visitors see rather than something hidden from view.",
      "Check trail closures and road conditions before setting out, particularly after severe weather. Combining Buescher with Bastrop makes a strong full-day itinerary without requiring long-distance driving between stops."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/buescher",
  },
};

export function applyCuratedDestinationBatch5(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch5(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch5);
}
