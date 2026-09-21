import type { Destination } from "./types";
const TPWD = "Texas Parks and Wildlife Department";
const curated: Record<string, Partial<Destination>> = {
  "lake-bob-sandlin-state-park": { summary: "A wooded Northeast Texas park on Lake Bob Sandlin where pine and hardwood forest reaches the shoreline, with fishing, paddling, swimming and lakeside camping near Pittsburg.", nearestTown: "Pittsburg", bestSeason: "Spring and fall for camping and trails; warm months for lake recreation", entryNote: "Check swimming, boating and lake conditions before a water-focused visit.", highlights: ["Lake Bob Sandlin fishing and paddling", "Pine and hardwood forest", "Lakeside camping", "Swimming and birding"], body: ["Lake Bob Sandlin State Park sits in the transition toward East Texas, where wooded shoreline gives a reservoir visit more shade and enclosure than many open-water parks.", "Fishing and paddling anchor the lake experience, while short forest walks and campsites near the water make the park easy to settle into for a weekend.", "Check lake and weather conditions before launching or swimming, and plan summer activity for cooler parts of the day."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-bob-sandlin" },
  "lake-brownwood-state-park": { summary: "A historic CCC park on Lake Brownwood with stone architecture, wooded shoreline, fishing, paddling and cabins that preserve the feel of early Texas state-park recreation.", nearestTown: "Brownwood", bestSeason: "Fall through spring for camping and trails; summer for lake activities", entryNote: "Lake levels influence swimming and boating access; check current conditions and facility availability.", highlights: ["CCC-built stone structures", "Lake Brownwood fishing and boating", "Historic cabins and group facilities", "Shoreline trails and camping"], body: ["Lake Brownwood State Park is as much about park history as the reservoir. Civilian Conservation Corps crews left substantial stone buildings and recreation structures that give the property a strong 1930s identity.", "The lake adds fishing, boating and seasonal swimming, while cabins and campsites make the park a practical overnight stop in west-central Texas.", "Check lake levels and current facility notices before arrival, especially when swimming or launching a boat is central to the trip."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-brownwood" },
  "lake-casa-blanca-international-state-park": { summary: "A Laredo lake park on the edge of the South Texas brush country, offering fishing, paddling, swimming, camping and an accessible outdoor stop close to the city.", nearestTown: "Laredo", bestSeason: "Fall through spring; summer requires strong heat precautions", entryNote: "South Texas heat can be extreme. Check lake conditions, carry water and favor mornings or evenings in hot months.", highlights: ["Lake Casa Blanca fishing", "Paddling and boating", "Swimming and lakeside picnics", "Convenient access from Laredo"], body: ["Lake Casa Blanca International State Park gives Laredo a substantial outdoor recreation area without requiring a long drive into remote South Texas.", "The reservoir supports fishing, paddling, boating and swimming, while campsites and picnic areas make it useful for both local day trips and overnight travelers.", "Heat is the major planning factor. In summer, shift strenuous activity away from midday, carry ample water and check current water and weather notices."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-casa-blanca" },
  "lake-corpus-christi-state-park": { summary: "A South Texas reservoir park near Mathis with fishing, boating, swimming and a landmark CCC-built stone pavilion overlooking Lake Corpus Christi.", nearestTown: "Mathis", bestSeason: "Fall through spring for camping and fishing; summer for water recreation with heat precautions", entryNote: "Reservoir levels can materially change shoreline and boat access. Check lake conditions before traveling.", highlights: ["CCC-built stone pavilion", "Lake Corpus Christi fishing", "Boating and paddling", "Camping and seasonal swimming"], body: ["Lake Corpus Christi State Park combines reservoir recreation with one of the state system's memorable Civilian Conservation Corps structures: a large stone pavilion positioned above the lake.", "Fishing and boating are central to most visits, with camping and swimming adding reasons to stay longer. The open South Texas setting makes sunsets and broad water views part of the experience.", "Water levels fluctuate, so confirm boat-ramp and swimming conditions before departure. Summer visitors should plan carefully for heat and sun exposure."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-corpus-christi" },
  "lake-livingston-state-park": { summary: "A Piney Woods reservoir park north of Houston with fishing, paddling, boating, forest trails and campsites along one of East Texas' largest lakes.", nearestTown: "Livingston", bestSeason: "Fall through spring for camping and trails; fishing is popular year-round", entryNote: "Large open water can become rough in wind and storms. Check forecasts and lake notices before boating or paddling.", highlights: ["Lake Livingston fishing", "Piney Woods shoreline", "Boating and paddling", "Family camping and nature trails"], body: ["Lake Livingston State Park puts a broad East Texas reservoir against a wooded shoreline, creating an easy lake escape within reach of Houston.", "Fishing is a major draw, while paddling, boating, camping and short forest trails allow groups with different interests to share the same trip.", "Treat the reservoir like large water rather than a protected pond. Wind and thunderstorms can change conditions quickly, so check forecasts before launching."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-livingston" },
  "lake-somerville-state-park": { summary: "A pair of state-park units on Lake Somerville connected by the Lake Somerville Trailway, combining fishing, paddling, camping, horseback riding and prairie-and-woodland trails between Austin and Houston.", nearestTown: "Somerville", bestSeason: "Fall through spring for trail use; warm months for lake recreation", entryNote: "Birch Creek and Nails Creek are separate units. Confirm which unit, trail status and lake conditions before navigating.", highlights: ["Birch Creek and Nails Creek units", "Lake Somerville Trailway", "Fishing, paddling and boating", "Hiking, biking and equestrian use"], body: ["Lake Somerville State Park is really two destinations linked by water and trail. Birch Creek and Nails Creek sit on different parts of the reservoir, and choosing the right unit matters when meeting a group or starting a route.", "The Trailway expands the park beyond shoreline recreation, while fishing, paddling and camping make the lake itself the main warm-weather draw.", "Check unit-specific alerts and Trailway conditions before departure. Flooding and wet weather can affect trails even when ordinary day-use areas remain open."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-somerville" },
  "lake-whitney-state-park": { summary: "A limestone-shore reservoir park north of Waco with clear-water swimming, fishing, boating, camping and broad Lake Whitney views along the Brazos River system.", nearestTown: "Whitney", bestSeason: "Spring through fall for water recreation; cooler months for camping and fishing", entryNote: "Lake levels and weather affect swimming and boat access. Limestone shorelines can be uneven and slick.", highlights: ["Lake Whitney swimming", "Fishing and boating", "Limestone shoreline", "Camping with open-water views"], body: ["Lake Whitney State Park sits on a broad, often strikingly blue reservoir edged by limestone country. Water is the reason most visitors come, whether to swim, fish, boat or simply camp near the shoreline.", "The park's open views distinguish it from heavily forested East Texas lakes, and sunsets across the reservoir can be a highlight of an overnight stay.", "Check lake levels, swim conditions and wind before departure. Wear appropriate footwear around uneven limestone and use extra caution near wet rock."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/lake-whitney" },
  "lyndon-b-johnson-state-park-and-historic-site": {
    summary:
      "A free Texas state park and living-history site on the Pedernales River near Stonewall, centered on the Sauer-Beckmann Farm, German-Texan farm life, bison and longhorns, historic cabins and the gateway into the adjacent LBJ Ranch district.",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area", "san-antonio-area"],
      countySlugs: ["gillespie"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Stonewall",
    county: "Gillespie",
    coordinates: { lat: 30.237656, lng: -98.626279 },
    bestSeason:
      "Fall through spring for the most comfortable walking and farm demonstrations; spring and summer are the park's busiest seasons, while summer visitors should plan around heat and the separate seasonal swimming-pool schedule.",
    entryNote:
      "Texas Parks and Wildlife currently charges no entrance fee. The Sauer-Beckmann Living History Farm is open 10 a.m.-4 p.m. October through May and 9 a.m.-3 p.m. June through September, and is closed the last Tuesday of each month plus Thanksgiving, Christmas and New Year's Day. Grounds, nature trails and day-use picnic areas remain open until dark. The 2026 swimming-pool season ended August 16; verify future pool dates and any active park alerts before travel.",
    highlights: [
      "Sauer-Beckmann Living History Farm with seasonal daily interpretation",
      "Free state-park admission",
      "German-Texan farm buildings dating to the nineteenth and early twentieth centuries",
      "Texas longhorn and American bison herds",
      "Pedernales River landscape, nature trail and picnic areas",
      "Historic Danz and Behrens cabins",
      "Direct gateway to the adjacent LBJ Ranch district of the national historical park",
      "Seasonal public swimming pool and reservable group facilities",
    ],
    body: [
      "Lyndon B. Johnson State Park & Historic Site is not simply the parking area for the LBJ Ranch. It preserves a separate layer of Hill Country history: the German-Texan farming landscape that surrounded the Johnson family and shaped the Pedernales valley long before Lyndon Johnson became president. The state park sits two miles east of Stonewall on U.S. 290 and directly across the river corridor from the ranch district of Lyndon B. Johnson National Historical Park.",
      "The Sauer-Beckmann Living History Farm is the park's defining experience. Johann and Christine Sauer settled the property in 1869, and the family expanded the original rock-and-log farmstead as their household grew. One of their children, Augusta Sauer Lindig, later served as midwife at Lyndon B. Johnson's birth. Emil and Otto Beckmann moved onto the property in 1900, and the farm's preserved buildings now interpret rural life around 1918 rather than presenting the site as a static furnished house.",
      "The living-history format matters because work is part of the interpretation. Depending on the day and season, visitors may encounter demonstrations tied to food preparation, gardening, livestock, household work or farm routines. The experience is strongest when given time to watch and ask questions rather than treating the farm as a quick photo stop between wineries and the LBJ Ranch.",
      "Several earlier structures broaden the story beyond the Sauer-Beckmann farmstead. The Danz family built a dogtrot cabin overlooking the Pedernales valley in the 1860s, and TPWD also preserves the Behrens cabin. Together with the farm buildings, they show how German immigrant families adapted architecture, agriculture and household life to the Texas Hill Country.",
      "The park also protects the agricultural landscape itself. American bison and Texas longhorns are maintained here, reinforcing the ranching and livestock history of the region. A nature trail, picnic areas and river-country scenery make it possible to spend time outdoors even when the farm buildings are closed.",
      "Admission is currently free, which makes the park unusually easy to add to a U.S. 290 itinerary. The main planning constraint is time rather than cost: the farm closes earlier than the broader park grounds, has seasonal hours and is closed the last Tuesday of every month plus major winter holidays. Arrive early enough to experience the living-history farm before continuing to the LBJ Ranch or west toward Stonewall and Fredericksburg.",
      "The state and national sites should be planned together but not confused. Texas Parks and Wildlife manages the state park and Sauer-Beckmann Farm, while the National Park Service manages the LBJ Ranch, Texas White House complex, Junction School, family cemetery and other federal historic resources. Their hours, alerts and access rules can differ on the same day.",
      "The park's seasonal swimming pool is a separate recreational layer rather than the main reason to visit. TPWD ended the 2026 pool season on August 16 and advises visitors to check current weekly schedules when the pool is operating. Future pool dates, fees and operating days should always be verified directly with the park.",
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson",
    reservationUrl: "https://texasstateparks.reserveamerica.com/",
    sourceCheckedAt: CHECKED,
    address: "199 Park Road 52, Stonewall, TX 78671",
    directions:
      "The park is on U.S. 290 about 2 miles east of Stonewall and 14 miles west of Johnson City. Enter on Park Road 52; the park is also adjacent to Ranch Road 1 and the LBJ Ranch corridor.",
    accessibilityNotes:
      "The park has developed visitor facilities, but historic buildings, farm surfaces and natural paths can vary. The group hall has a wheelchair-accessible cement route to the interior but is not fully ADA accessible. Contact the park directly for current mobility access to specific farm buildings, trails or programs.",
    areaGuide: {
      intro:
        "Use the state park as the living-history anchor of the Stonewall corridor, then connect it with the LBJ Ranch, Hye, Johnson City and Fredericksburg rather than treating it as an isolated roadside stop.",
      nearbyAttractions: [
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The adjacent federal park includes the LBJ Ranch district, Junction School, family cemetery and other presidential-history resources.",
          proximity: "Adjacent / across the Pedernales corridor",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Hye",
          description:
            "The small U.S. 290 community east of Stonewall adds distillery, winery and postal-history stops along the same corridor.",
          proximity: "East on U.S. 290",
          href: "/destination/hye",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "A major Hye visitor destination for Texas whiskey tours, tastings and distillery history.",
          proximity: "Hye",
          href: "/destination/garrison-brothers-distillery-hye",
        },
      ],
      foodAndDrink: [
        {
          name: "Stonewall and Hye",
          description:
            "Wineries, tasting rooms, distillery experiences and local food stops line the U.S. 290 corridor on both sides of the park.",
          proximity: "Along U.S. 290",
          href: "/destination/hye",
        },
        {
          name: "Fredericksburg",
          description:
            "The largest concentration of restaurants, tasting rooms and visitor services in the western Hill Country corridor.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg",
        },
      ],
      lodging: [
        {
          name: "Fredericksburg and Stonewall corridor",
          description:
            "Use Fredericksburg for the broadest lodging inventory or choose smaller Hill Country stays around Stonewall and Hye for a quieter base.",
          proximity: "West and east along U.S. 290",
          href: "/destination/fredericksburg",
        },
        {
          name: "Johnson City",
          description:
            "Johnson City lodging works well for travelers combining the park with Science Mill, downtown museums and Blanco County attractions.",
          proximity: "About 14 miles east",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Stonewall / Pedernales corridor",
          description:
            "The state park, LBJ Ranch, orchards, wineries and small-town stops form one continuous historic and agricultural landscape.",
          proximity: "At the park",
        },
      ],
      familyStops: [
        {
          name: "Sauer-Beckmann Living History Farm",
          description:
            "The farm's demonstrations, livestock and historic buildings give families a more active experience than a conventional house museum.",
          proximity: "Inside the state park",
        },
        {
          name: "Science Mill",
          description:
            "Johnson City's hands-on STEM museum gives families a strong indoor companion stop on the same regional trip.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Fredericksburg",
          description:
            "Continue west for German-Texan history, museums, Main Street, wineries and Enchanted Rock access.",
          proximity: "About 18 miles west",
          href: "/destination/fredericksburg",
        },
        {
          name: "Johnson City",
          description:
            "Continue east for LBJ's boyhood history, Science Mill, the motorcycle museum and downtown visitor services.",
          proximity: "About 14 miles east",
          href: "/destination/johnson-city",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The park connects presidential history to the German-Texan farm culture and Pedernales River landscape that shaped the wider region, while the Sauer-Beckmann Farm preserves working rural interpretation rather than only architecture.",
      assessment: {
        recommendedVisit:
          "Plan 2 to 4 hours for the state park and living-history farm; allow a full day if you also want the adjacent LBJ Ranch district.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Strong for families interested in animals, hands-on history and outdoor space; the free admission also makes it easy to combine with another Hill Country stop.",
        firstTimeValue:
          "Very high for visitors who want to understand the Hill Country context around LBJ rather than seeing only presidential buildings.",
      },
      itineraries: [
        {
          label: "Living-history visit",
          duration: "2–3 hours",
          steps: [
            "Arrive while Sauer-Beckmann Farm is open and confirm the seasonal closing time.",
            "Give the farm enough time for demonstrations, historic buildings and questions with interpreters.",
            "Add the nature trail, longhorns, bison and picnic areas before leaving the state park.",
          ],
        },
        {
          label: "LBJ history day",
          duration: "Full day",
          steps: [
            "Start at LBJ State Park and Sauer-Beckmann Farm for the regional and farm-life context.",
            "Continue into the adjacent LBJ Ranch district of the national historical park.",
            "Finish in Stonewall, Hye or Johnson City depending on food and lodging plans.",
          ],
        },
        {
          label: "U.S. 290 Hill Country day",
          duration: "Full day",
          steps: [
            "Use the state park as the morning history anchor.",
            "Continue east to Hye or Johnson City for distillery, museum or food stops.",
            "Or continue west toward Fredericksburg for wineries, German-Texan history and overnight lodging.",
          ],
        },
      ],
      sources: [
        {
          label: "Texas Parks & Wildlife — LBJ State Park & Historic Site",
          url: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson",
          scope:
            "Current farm hours, closures, entrance fee, facilities, contact information and visitor planning.",
        },
        {
          label: "Texas Parks & Wildlife — park history",
          url: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson/history",
          scope:
            "Sauer, Beckmann and Danz family history, preserved structures, bison and longhorn context.",
        },
        {
          label: "Texas Parks & Wildlife — directions",
          url: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson/map",
          scope:
            "Current address, coordinates and U.S. 290 / Park Road 52 access.",
        },
        {
          label: "Texas Parks & Wildlife — swimming pool",
          url: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson/fees-facilities/swimming-pool",
          scope:
            "Current 2026 pool-season status and seasonal operating guidance.",
        },
      ],
    },
  },
  "palmetto-state-park": { summary: "A small, lush park near Gonzales where dwarf palmettos, swampy lowlands, the San Marcos River and a CCC-built landscape create scenery that feels unexpectedly subtropical for Central Texas.", nearestTown: "Gonzales", bestSeason: "Fall through spring for hiking; warm months for paddling with humidity precautions", entryNote: "Low areas can be wet or muddy after rain. Bring insect protection in warm weather and check trail conditions.", highlights: ["Dwarf palmetto groves", "San Marcos River paddling and fishing", "CCC-built structures", "Wetland and woodland trails"], body: ["Palmetto State Park is one of Central Texas' ecological surprises. Dense dwarf palmettos and wet lowlands give portions of the park a subtropical appearance far removed from the dry Hill Country stereotype.", "Trails, the San Marcos River and a small oxbow lake support hiking, paddling, fishing and birding, while CCC structures add historic character.", "Expect humidity, insects and potentially muddy trails in warm or wet periods. Those same conditions are part of what supports the unusual vegetation that makes the park worth visiting."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/palmetto" },
  "possum-kingdom-state-park": { summary: "A rugged lake park west of Fort Worth on Possum Kingdom Reservoir, with clear-water swimming, boating, fishing and camping beneath the limestone breaks of the Brazos River country.", nearestTown: "Caddo", bestSeason: "Spring through fall for lake recreation; cooler months for camping and fishing", entryNote: "Possum Kingdom is a large reservoir with changing wind and weather. Check lake and boating conditions before launching.", highlights: ["Possum Kingdom Lake swimming", "Boating and fishing", "Limestone Brazos River scenery", "Lakeside camping"], body: ["Possum Kingdom State Park gives direct public access to one of North Texas' most dramatic reservoirs. Limestone hills and clear open water create scenery more rugged than many metro-area lakes.", "Swimming, boating and fishing dominate warm-weather visits, while campsites make it possible to stay for sunrise and quieter evening water.", "Large-reservoir conditions deserve respect. Wind, storms and boat traffic can change the experience quickly, so check forecasts and use appropriate flotation before heading onto the water."], managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/possum-kingdom" },
};
export function applyCuratedDestinationBatch7(destination: Destination): Destination { const override=curated[destination.slug]; return override ? {...destination,...override,hero:override.hero?{...destination.hero,...override.hero}:destination.hero}:destination; }
export function applyCuratedDestinationsBatch7(destinations: Destination[]): Destination[] { return destinations.map(applyCuratedDestinationBatch7); }
