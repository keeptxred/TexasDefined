import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curated: Record<string, Partial<Destination>> = {
  "mother-neff-state-park": {
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
    summary: "An East Texas reservoir park near Longview with pine and hardwood forest, fishing, lakeside camping and a footbridge to an island trail on Martin Creek Lake.",
    nearestTown: "Tatum",
    bestSeason: "Fall through spring for camping and trails; fishing is a year-round draw",
    entryNote: "The lake also supports power-generation infrastructure, so follow posted boating zones and check current park and water conditions.",
    highlights: ["Fishing for bass, catfish and crappie", "Island trail reached by pedestrian bridge", "Lakeside camping beneath East Texas woods", "Boating and paddling access"],
    body: [
      "Martin Creek Lake State Park is built for an easygoing East Texas lake weekend. Forest reaches close to the shoreline, campsites keep visitors near the water and the island trail adds a memorable short walk without demanding a long hike.",
      "Fishing is a major reason to come, with boating and paddling extending access beyond the bank. On land, the pine-and-hardwood setting provides shade and a quieter counterpoint to larger reservoir parks.",
      "Check current lake conditions and any boating restrictions before launching. In warm weather, plan around East Texas heat and humidity and keep an eye on thunderstorms that can build quickly."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake",
  },
  "atlanta-state-park": {
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
