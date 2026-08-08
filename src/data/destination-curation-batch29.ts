import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const curated: Record<string, Partial<Destination>> = {
  "abilene-state-park": {
    summary: "A shaded West Texas park southwest of Abilene where pecan groves, Elm Creek, Lake Abilene access and distinctive Civilian Conservation Corps stonework create an easy camping and family-recreation base.",
    nearestTown: "Tuscola",
    bestSeason: "Fall through spring for camping and trails; warm months for pool and water recreation when available",
    entryNote: "Lake and pool operations can vary with water conditions and season. Check current TPWD alerts and facility hours before a water-focused trip.",
    highlights: ["CCC-built stone structures", "Pecan and oak shade along Elm Creek", "Camping and short nature trails", "Lake Abilene access and family recreation"],
    body: [
      "Abilene State Park is a compact, historic park whose mature trees and stone architecture feel unexpectedly sheltered against the surrounding West Texas landscape. Civilian Conservation Corps work from the 1930s remains one of the strongest visual parts of the park.",
      "Camping, picnicking and easy trails make the park particularly useful for families and relaxed weekends. Lake Abilene access and seasonal water recreation broaden the trip when conditions cooperate.",
      "Because reservoir levels and seasonal facilities can change, check current park alerts before leaving. In hot weather, plan walks early and take advantage of the park's shaded developed areas."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/abilene",
  },
  "atlanta-state-park": {
    summary: "A quiet Northeast Texas park on Wright Patman Lake with tall pines, hardwood forest, fishing, paddling, swimming and wooded campsites near the Arkansas border.",
    nearestTown: "Atlanta",
    bestSeason: "Fall through spring for trails and camping; summer for lake recreation",
    entryNote: "Lake levels, swimming conditions and storm damage can affect shoreline access. Check current park alerts before arrival.",
    highlights: ["Wright Patman Lake shoreline", "Pine and hardwood forest", "Fishing and paddling", "Wooded camping and swimming"],
    body: [
      "Atlanta State Park sits in the far northeast corner of Texas where pine and hardwood forest reaches the edge of Wright Patman Lake. The result is a greener, quieter lake park than many of the state's open prairie reservoirs.",
      "Fishing, paddling and seasonal swimming are the obvious warm-weather activities, while shaded campsites and forest trails make the park comfortable for slower weekends.",
      "Check lake and weather conditions before traveling, especially after major storms. Summer humidity can be substantial, so mornings and evenings are the best time for trail use."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/atlanta",
  },
  "big-spring-state-park": {
    summary: "A small West Texas mesa-top park above Big Spring with a historic CCC scenic drive, limestone pavilion and broad views across the Permian Basin rather than a conventional lake-or-trail park experience.",
    nearestTown: "Big Spring",
    bestSeason: "Fall through spring; sunrise and sunset are especially pleasant in warmer months",
    entryNote: "This is primarily a scenic overlook and short-visit park. Check road and pavilion access before arrival, especially after severe weather.",
    highlights: ["CCC-built scenic drive", "Mesa-top pavilion", "Permian Basin overlooks", "Sunrise and sunset views"],
    body: [
      "Big Spring State Park occupies a mesa immediately south of town, giving visitors a quick elevation change and a broad view over the surrounding Permian Basin. It is more scenic overlook than backcountry destination.",
      "The looping park road and stone pavilion were shaped by Civilian Conservation Corps work, and that historic design is central to the visit. Short walks and viewpoints work well around sunrise or sunset.",
      "Treat the park as a one- or two-hour stop rather than planning a full hiking day. Wind and heat can be intense on the exposed mesa, so check weather and current access before driving up."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/big-spring",
  },
  "bonham-state-park": {
    summary: "A compact North Texas CCC park around a small wooded lake, with paddling, fishing, swimming, easy trails and historic stone structures less than two hours northeast of Dallas.",
    nearestTown: "Bonham",
    bestSeason: "Spring and fall for camping and trails; summer for lake recreation",
    entryNote: "The park is small and popular on pleasant weekends. Check swimming and lake conditions and reserve campsites ahead when staying overnight.",
    highlights: ["Small wooded lake", "CCC stonework", "Paddling and fishing", "Easy family trails and camping"],
    body: [
      "Bonham State Park is one of the state's smaller historic parks, which is part of its appeal. A wooded lake, short trails and Civilian Conservation Corps architecture create an easy day trip without a complicated itinerary.",
      "Paddling and fishing work well on the compact lake, while swimming and picnicking make warm-weather visits straightforward for families. The short trail network is more about a relaxed forest walk than mileage.",
      "Reserve overnight stays during popular seasons and check current swimming or lake notices before departure. The park's small scale means busy weekends can feel full quickly."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/bonham",
  },
  "buescher-state-park": {
    summary: "A Lost Pines companion to Bastrop State Park with a small lake, CCC structures, wooded camping and a scenic park road through recovering loblolly pine country east of Austin.",
    nearestTown: "Smithville",
    bestSeason: "Fall through spring for hiking and camping; mild summer mornings for paddling",
    entryNote: "Park Road 1C and trails can be affected by weather or maintenance. Check alerts before planning the scenic connection with Bastrop State Park.",
    highlights: ["Lost Pines landscape", "CCC-built structures", "Small lake for paddling and fishing", "Scenic Park Road 1C to Bastrop"],
    body: [
      "Buescher State Park is best understood with nearby Bastrop State Park. Both protect pieces of the unusual Lost Pines forest, but Buescher is smaller, quieter and centered around a compact lake and wooded campground.",
      "Civilian Conservation Corps structures and the scenic road linking the two parks add historical and road-trip value beyond the trail mileage. Paddling and fishing provide an easy alternative to hiking.",
      "Check road and trail alerts before using the Bastrop-Buescher connection, particularly after storms. A combined two-park day is often more rewarding than treating Buescher as an isolated stop."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/buescher",
  },
  "fort-boggy-state-park": {
    summary: "A lightly developed East-Central Texas park near Centerville with a small lake, fishing, swimming, cabins and quiet woods suited to simple family weekends rather than a packed attraction list.",
    nearestTown: "Centerville",
    bestSeason: "Fall through spring for trails and cabins; summer for swimming when conditions allow",
    entryNote: "Facilities are intentionally limited compared with larger parks. Check swimming, cabin and park-hour information before arrival.",
    highlights: ["Small fishing and swimming lake", "Cabins and picnic areas", "Quiet woodland trails", "Low-key family recreation"],
    body: [
      "Fort Boggy State Park is a small park where simplicity is the point. A compact lake, woods and a handful of developed facilities make it useful for travelers who want a quiet outdoor stop rather than a destination built around major landmarks.",
      "Fishing, swimming and short walks can fill an easy day, while cabins support overnight stays without requiring a large campground setup.",
      "Because the park has fewer facilities than many state parks, verify current hours and water-use conditions before arriving. It works best when expectations match its quiet scale."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/fort-boggy",
  },
  "martin-creek-lake-state-park": {
    summary: "An East Texas lake park near Longview with fishing, paddling, wooded camping and a historic island cemetery reached across a footbridge, set beside a warm-water reservoir used for power generation.",
    nearestTown: "Tatum",
    bestSeason: "Fall through spring for camping and trails; fishing is popular year-round",
    entryNote: "The lake can run warmer than typical reservoirs and power-plant operations influence conditions. Check fishing, swimming and park alerts before arrival.",
    highlights: ["Martin Creek Lake fishing", "Island cemetery and footbridge", "Paddling and camping", "East Texas forest shoreline"],
    body: [
      "Martin Creek Lake State Park combines a wooded East Texas campground with a reservoir whose temperature and ecology are influenced by nearby power generation. That makes the lake especially notable to anglers.",
      "The island cemetery connected by footbridge gives the park an unexpected historical element, while paddling, fishing and shoreline camping remain the main recreational draws.",
      "Check current lake and fishing conditions before departure, and do not assume water temperatures or seasonal patterns match a typical reservoir. Summer heat and humidity also make early activity more comfortable."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake",
  },
  "mckinney-falls-state-park": {
    summary: "An Austin state park where Onion Creek crosses broad limestone ledges at Upper and Lower Falls, combining swimming, hiking, camping and preserved homestead history inside the city limits.",
    nearestTown: "Austin",
    bestSeason: "Spring and fall for hiking; warm months for swimming when creek conditions are safe",
    entryNote: "Swimming depends on creek flow and water quality, and flash flooding can close areas quickly. Reserve busy dates and check current water conditions before arrival.",
    highlights: ["Upper Falls", "Lower Falls", "Onion Creek swimming and limestone ledges", "Rock Shelter Trail and McKinney homestead history"],
    body: [
      "McKinney Falls State Park feels surprisingly removed from Austin even though it sits inside the city. Onion Creek cuts across broad limestone shelves at two principal falls, creating swimming and viewing areas surrounded by oak-juniper woodland.",
      "The park also preserves traces of Thomas McKinney's nineteenth-century homestead and offers hiking and biking trails beyond the creek. Camping makes it possible to use the park as an urban outdoor base rather than just a day-use swimming hole.",
      "Creek conditions are the key variable. Heavy rain can create dangerous flash flooding, while drought can reduce water dramatically. Check TPWD alerts and water notices before building the day around swimming."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/mckinney-falls",
  },
  "san-angelo-state-park": {
    summary: "A large Concho Valley park around O.C. Fisher Reservoir with prairie trails, fishing, camping, wildlife viewing and herds of bison and Texas longhorns on the edge of San Angelo.",
    nearestTown: "San Angelo",
    bestSeason: "Fall through spring for hiking, biking and wildlife viewing; summer heat is intense",
    entryNote: "Reservoir levels can fluctuate widely and affect shoreline recreation. Check trail, water and wildlife-program status before arrival.",
    highlights: ["Bison and Texas longhorn herds", "O.C. Fisher Reservoir", "Miles of hiking, biking and equestrian trails", "Concho Valley prairie and wildlife"],
    body: [
      "San Angelo State Park spreads across a large piece of Concho Valley prairie, giving it more open-country character than a typical wooded lake park. Bison and Texas longhorn herds add a distinctive wildlife and ranching dimension.",
      "Trails support hiking, mountain biking and horseback riding, while O.C. Fisher Reservoir adds fishing and shoreline recreation when water levels permit.",
      "Water level and heat are the biggest planning variables. Check reservoir and park conditions before a water-focused visit, keep proper distance from large animals and carry ample water on exposed trails."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/san-angelo",
  },
  "stephen-f-austin-state-park": {
    summary: "A wooded Brazos River park west of Houston with easy hiking and biking, camping, golf and close proximity to the San Felipe de Austin State Historic Site.",
    nearestTown: "San Felipe",
    bestSeason: "Fall through spring for comfortable trails and camping",
    entryNote: "Low-lying trails can become muddy or flood after heavy rain. The adjacent San Felipe de Austin historic site has separate hours and admission policies.",
    highlights: ["Brazos River bottomland forest", "Easy hiking and biking", "Camping and golf", "Adjacent San Felipe de Austin history"],
    body: [
      "Stephen F. Austin State Park is a shaded Brazos River retreat that works especially well for relaxed camping, family walks and travelers interested in pairing outdoor time with early Texas history.",
      "The trail system moves through bottomland forest rather than dramatic elevation, while golf and camping broaden the recreation mix. Immediately nearby, San Felipe de Austin adds the story of one of Mexican Texas' most consequential early settlements.",
      "Heavy rain can make low trails muddy or inaccessible, so check conditions before arrival. If history is part of the trip, verify the neighboring historic site's schedule separately."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/stephen-f-austin",
  },
};

export function applyCuratedDestinationBatch29(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch29(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch29);
}
