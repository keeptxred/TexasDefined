import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayGeneralEnrichment {
  body: ArticleBlock[];
  sourceName?: string;
  sourceUrl?: string;
  internalLinks?: ArticleInternalLink[];
  relatedDestinations?: string[];
  relatedCollections?: string[];
}

const noHiking: ArticleBlock[] = [
  { type: "heading", text: "A good Texas trip does not require trail mileage" },
  { type: "paragraph", text: "Texas travel is often marketed through parks, canyons and hiking, but the state has just as much trip value in historic districts, museums, food towns, scenic drives, music venues, beaches, riverfront communities and courthouse squares. The useful planning move is to identify what you do enjoy rather than treating hiking as the default activity that must be removed. A traveler who likes architecture can build an excellent Galveston weekend. A food-focused traveler can spend two days in San Antonio, Houston or Lockhart. A history traveler can connect missions, museums and historic sites without needing a trail map." },
  { type: "paragraph", text: "This also matters for mixed-interest groups. One person may want an outdoor element while another does not want a strenuous walk. Choose destinations where the outdoor component can be scenic driving, a waterfront, a shaded short path, a birding stop, a historic plaza or a park picnic rather than an all-day hike. That keeps the trip shared instead of splitting the group into separate vacations." },
  { type: "heading", text: "Cities work best when you choose a compact theme" },
  { type: "paragraph", text: "San Antonio can support a history-and-food weekend around missions, museums, plazas and neighborhoods. Houston can become a museum-and-food trip with very little need for long outdoor exposure. Fort Worth works well for museums, the Stockyards and evening entertainment. Dallas can be organized around arts, architecture and restaurants. El Paso combines museums, food and scenic driving. The key is to avoid turning a city weekend into a cross-metro checklist; choose one or two districts per day and let meals or indoor attractions define the pace." },
  { type: "paragraph", text: "Museums are especially useful because they make Texas weather less decisive. A summer thunderstorm, winter cold front or hot afternoon does not have to cancel the whole day. Check hours and timed-entry requirements, then build a flexible outdoor stop around the indoor anchor. A city itinerary with one major museum in the middle of the day is often more resilient than a schedule that depends on perfect weather from breakfast to sunset." },
  { type: "heading", text: "Small towns can carry a weekend through food, history and music" },
  { type: "paragraph", text: "Fredericksburg, Brenham, Granbury, Jefferson, Gruene and other historic communities offer a different kind of low-hiking trip. Courthouse squares, museums, shops, bakeries, dance halls and scenic roads provide enough structure for a one- or two-night stay. The point is not that every small town offers the same amenities; it is that a traveler can choose a town where the built environment and local culture are the attraction rather than a nearby trail." },
  { type: "paragraph", text: "Food can become the itinerary rather than just a break between attractions. A barbecue route, Tex-Mex weekend, Czech bakery loop or Gulf Coast seafood trip creates its own sequence of stops. Leave enough time between meals for a historic district, museum, local shop or scenic drive so the weekend does not become three heavy meals and a hotel room. The best food trips explain the place that produced the food." },
  { type: "heading", text: "Scenic driving is legitimate travel, but it still needs a plan" },
  { type: "paragraph", text: "A Hill Country loop, West Texas highway, Gulf Coast route or Piney Woods drive can deliver landscape without requiring a hike, but avoid treating roadside shoulders as viewpoints by default. Use legal pull-offs, public parks, visitor centers and towns for stops. Check fuel range and current road conditions on long rural segments. Scenic driving is most satisfying when there is a reason to get out of the car every hour or two—lunch, a courthouse square, a historic marker, a museum or a safe overlook." },
  { type: "paragraph", text: "Travelers who avoid hiking because of heat, mobility, footwear, injury or simple preference should also distinguish between 'no hiking' and 'no walking.' Historic districts and museums can still involve substantial standing and walking. Check accessibility, parking and distances for the specific attraction if those factors matter. The goal is a trip built around your actual comfort level rather than a generic category label." },
  { type: "heading", text: "Choose one anchor and one optional outdoor layer" },
  { type: "paragraph", text: "A practical formula is one major indoor or cultural anchor, one food experience, one scenic or historic drive and one optional low-effort outdoor stop. That can mean a museum plus barbecue plus a courthouse town; a coastal architecture weekend plus seafood plus sunrise at the seawall; or a San Antonio history trip plus an evening river walk. Texas is large enough that removing hiking does not shrink the possibilities very much—it simply changes what counts as the centerpiece." },
];

const rainy: ArticleBlock[] = [
  { type: "heading", text: "Rain changes the safe itinerary before it changes the fun one" },
  { type: "paragraph", text: "A rainy Texas weekend can still work well, but the first decision is whether the weather is merely inconvenient or potentially hazardous. Heavy thunderstorms can bring flash flooding, lightning, hail and poor visibility. National Weather Service guidance is clear that flooded roads should not be crossed. Check the forecast, local warnings and current road conditions before substituting a scenic back road or river crossing for the original plan. An indoor itinerary is only useful if the trip to reach it is safe." },
  { type: "paragraph", text: "Once safety is settled, rain is a reason to reorganize rather than cancel. Put museums, historic buildings, food halls, markets, aquariums, science centers and other indoor anchors in the wettest part of the day. Leave architecture walks, courthouse squares and short outdoor stops flexible enough to move between showers. A hotel located near several indoor options can be worth more than a cheaper room that requires repeated long drives in bad weather." },
  { type: "heading", text: "Major cities offer the strongest weather-proof weekends" },
  { type: "paragraph", text: "Houston, Dallas, Fort Worth, San Antonio and Waco all have enough indoor attractions to support a full day without pretending the weather is good. The best approach is to choose a theme: art and food, Texas history, science and family attractions, architecture and museums, or live music and restaurants. A theme keeps a rainy weekend from becoming random indoor errands and reduces the number of times the group has to move the car through heavy rain." },
  { type: "paragraph", text: "Check attraction hours and ticket rules before leaving the hotel. Rainy weekends can push many visitors toward the same indoor places, increasing parking pressure and timed-entry demand. Keep one secondary museum, restaurant district or covered attraction in reserve. A backup plan should be geographically close enough to use without crossing the entire city when conditions deteriorate." },
  { type: "heading", text: "Food trips become especially useful when outdoor plans collapse" },
  { type: "paragraph", text: "Barbecue, Tex-Mex, bakeries, food markets and regional restaurants give a rainy trip structure without requiring sustained outdoor time. Build a food route around neighborhoods or a compact region instead of driving long distances between famous stops. Add one museum, historic building or shop between meals. This works particularly well in Houston, San Antonio, Fort Worth and Central Texas towns where food and local history naturally overlap." },
  { type: "paragraph", text: "Small towns can still work when rain is light and roads are normal, but a courthouse-square itinerary may be less resilient than a major-city one because indoor hours are limited. Confirm museums and shops are actually open on the day of the trip. If the forecast calls for repeated severe storms rather than ordinary rain, moving the trip or choosing a closer city base is often the better decision." },
  { type: "heading", text: "Do not use caves, rivers or low-water roads as casual rain backups" },
  { type: "paragraph", text: "Some attractions sound weather-proof but can be affected by rainfall or severe weather in ways visitors do not see from a hotel window. River conditions can change, low-water crossings can become dangerous, and outdoor access around caves or parks may be restricted. Check the managing authority rather than assuming an attraction is safe because part of it is indoors. Never drive around a barricade to preserve an itinerary." },
  { type: "paragraph", text: "Lightning also changes outdoor timing. A break in rain does not necessarily mean a thunderstorm has passed. Use current weather information and follow venue instructions before returning to beaches, open plazas, exposed trails or water. The goal is not to maximize every available dry minute; it is to keep the trip enjoyable without converting weather inconvenience into avoidable risk." },
  { type: "heading", text: "Build the rainy weekend around optionality" },
  { type: "paragraph", text: "The strongest rainy plan has one indoor anchor, two nearby alternatives and meals that do not require crossing the city. Choose lodging with easy access to that cluster and keep outdoor pieces optional. If the forecast improves, add the courthouse walk, beach sunset or neighborhood architecture loop. If it worsens, the trip still has a complete identity. Flexibility is what makes a rainy Texas weekend successful—not pretending the original sunny-weather itinerary still applies." },
];

const tooHot: ArticleBlock[] = [
  { type: "heading", text: "Extreme heat should change the trip structure, not just the packing list" },
  { type: "paragraph", text: "When Texas heat becomes dangerous, a trip built around midday outdoor activity needs more than extra water. Heat risk depends on temperature, humidity, sun exposure, exertion, age, health and acclimatization. National Weather Service and public-health guidance emphasizes reducing exposure and recognizing heat illness early. The practical travel response is to move optional outdoor activity to the coolest part of the day, use indoor or shaded anchors through the afternoon, and treat air conditioning and drinking water as part of the itinerary rather than as conveniences." },
  { type: "paragraph", text: "This is especially important for visitors who are not acclimated to Texas summer conditions. A morning that feels manageable can become a very different environment by midafternoon. Do not use a fixed mileage or sightseeing target to decide whether to keep going. If someone becomes dizzy, confused, faint, nauseated or unusually weak, stop the activity and respond according to heat-illness guidance. A vacation schedule is never more important than getting a person cooled and evaluated when needed." },
  { type: "heading", text: "Museum-and-food cities are the simplest hot-weather solution" },
  { type: "paragraph", text: "Houston, Dallas, Fort Worth, San Antonio and Austin all support weekends where museums, food, music and indoor attractions carry the hottest hours. Schedule any outdoor architecture, riverfront or neighborhood walk early, then move indoors before heat builds. Return outside near evening if conditions are reasonable. This daypart structure produces a fuller trip than trying to endure an exposed outdoor attraction at two in the afternoon and then losing the rest of the day to exhaustion." },
  { type: "paragraph", text: "Hotel location matters more in extreme heat because every extra drive can involve a hot parked vehicle and another exposed walk across pavement. A centrally located room near restaurants or attractions can reduce transitions. Never leave children, dependent adults or pets in a parked vehicle, even for a short stop. If the vehicle air-conditioning is not functioning reliably, address that before beginning a long summer road trip." },
  { type: "heading", text: "Water destinations still require heat planning" },
  { type: "paragraph", text: "Swimming, beaches and rivers can feel like automatic heat solutions, but they do not eliminate sun exposure, dehydration or hot parking areas. Confirm that the swimming area is open and safe, use shade and sun protection, and keep drinking water available. Rivers and spring-fed destinations may have capacity limits or changing access rules. The trip should still have an indoor or shaded fallback rather than assuming the entire day can be spent in the water." },
  { type: "paragraph", text: "The Gulf Coast can be appealing because of water and breeze, but humidity can increase heat stress. Plan beach time around morning and evening, then use museums, restaurants, aquariums or a hotel break during the hottest period. Check weather for thunderstorms as well as heat. A summer coastal trip often works best when it is designed around two short outdoor windows instead of one continuous day on the sand." },
  { type: "heading", text: "Caves and higher-elevation destinations can help, but they are not universal escapes" },
  { type: "paragraph", text: "Caverns provide a cooler attraction once visitors are underground, but parking, queues and surface walking still happen in outdoor heat. Check tour requirements and accessibility. Panhandle and West Texas destinations may have cooler mornings or elevations that change conditions, but they can also experience intense sun and large daily temperature swings. Use the actual forecast for the destination rather than assuming a region is always cooler than the metro you left." },
  { type: "paragraph", text: "State parks are not automatically excluded, but a hot-weather park visit should be conservative. Choose short early activities, confirm water availability and closures, and know when to turn around. Exposed desert, canyon and rock terrain can become dangerous quickly. When heat alerts are in effect, an indoor trip is not a lesser version of Texas travel; it is often the more responsible choice." },
  { type: "heading", text: "Build a summer weekend that succeeds even if the afternoon disappears" },
  { type: "paragraph", text: "A resilient hot-weather itinerary has a strong morning, an indoor afternoon and a flexible evening. That might be sunrise on the coast, a museum and lunch, then seafood near sunset; an early historic walk in San Antonio followed by museums and dinner; or a short morning drive followed by a food-focused city afternoon. If the heat becomes more severe than expected, the day still works without forcing people to stay outside simply because the original itinerary said they should." },
];

const easy: ArticleBlock[] = [
  { type: "heading", text: "An easy weekend begins with fewer decisions" },
  { type: "paragraph", text: "The lowest-friction Texas weekends usually share the same structure: one lodging base, one anchor destination, a small number of optional stops and little dependence on timed activities. Easy does not mean boring. It means the trip can survive a late departure, weather change, restaurant wait or tired traveler without the entire schedule collapsing. That makes towns such as Fredericksburg, Granbury, Brenham, Wimberley, Boerne, Jefferson, Waco, Gruene and Rockport-Fulton useful because the destination itself provides enough food, scenery and local character to fill gaps between specific attractions." },
  { type: "paragraph", text: "Choose distance conservatively. A destination that is technically reachable for a weekend may not be easy if Friday traffic consumes the evening and Sunday requires an early checkout followed by several hours of driving. If the point is to reduce planning, a closer place often wins. Use the farther destination when the scenery or experience is meaningfully different, not simply because a list ranks it higher." },
  { type: "heading", text: "One walkable or compact district reduces friction" },
  { type: "paragraph", text: "Historic downtowns and courthouse squares simplify a weekend because food, shops, architecture and local history can be close together. Park once when conditions allow, walk at a comfortable pace and let the district provide unscheduled discoveries. This works in many small Texas towns, but confirm business hours because Sunday and Monday schedules can be limited. An easy trip becomes frustrating when the entire plan depends on businesses that are closed." },
  { type: "paragraph", text: "Compact does not always mean fully walkable for every traveler. Heat, uneven sidewalks, parking distance and mobility needs can change the experience. If those factors matter, choose a hotel and attractions based on the actual travel party rather than the town's marketing language. The simplest trip is the one that removes the group's specific friction points." },
  { type: "heading", text: "Use one reservation at most as the anchor" },
  { type: "paragraph", text: "A state-park entry, museum ticket, dinner reservation or scheduled tour can give the weekend structure without turning every hour into an appointment. Put that one fixed commitment in the middle of the trip and keep surrounding stops optional. If the destination requires multiple reservations, long transfers or rigid entry windows, it may still be a great trip—but it no longer belongs in the easiest category." },
  { type: "paragraph", text: "State parks can fit an easy weekend when access is confirmed in advance and the park is close to the lodging base. The mistake is assuming outdoor recreation is automatically spontaneous. High-demand parks, seasonal swimming areas and popular fall destinations may require reservations or can reach capacity. Check the official site before leaving and keep a town-based backup plan." },
  { type: "heading", text: "Food and scenic driving are useful low-planning anchors" },
  { type: "paragraph", text: "A town known for barbecue, bakeries, Tex-Mex or seafood can support a weekend with minimal scheduling. Pick one meal worth planning around and let the rest remain flexible. Scenic driving works the same way: choose a loop with two or three towns or public stops, keep fuel range in mind and avoid adding distant detours just because they appear on a map. The goal is a day that still feels complete if one stop is skipped." },
  { type: "paragraph", text: "Weather should influence the easy-trip category before departure. A beach trip during a severe-storm forecast, a Hill Country trip during a major event weekend or an outdoor itinerary during extreme heat may require more contingency planning than expected. When conditions add complexity, switch destinations rather than forcing the original choice to remain 'easy.'" },
  { type: "heading", text: "Leave space in the schedule on purpose" },
  { type: "paragraph", text: "The most important part of a low-planning weekend is unassigned time. Leave room to sit over breakfast, stop at a local shop, take a scenic road slowly or return to the hotel before dinner. Texas distances and weather already introduce uncertainty; the itinerary does not need to add more. A successful easy weekend should be describable in one sentence—one town, one main experience and a handful of choices—not as a spreadsheet that happens to fit between Friday and Sunday." },
];

export const texasGatewayBatch11GeneralEnrichment: Record<string, GatewayGeneralEnrichment> = {
  "best-texas-trips-if-you-dont-like-hiking": {
    body: noHiking,
    sourceName: "Travel Texas — Things to Do",
    sourceUrl: "https://www.traveltexas.com/things-to-do/",
    internalLinks: [
      { href: "/explore/historic-sites", label: "Texas historic sites" },
      { href: "/explore/food-bbq", label: "Texas food and BBQ" },
    ],
    relatedDestinations: ["san-antonio", "galveston", "fredericksburg"],
  },
  "best-things-to-do-in-texas-on-a-rainy-weekend": {
    body: rainy,
    sourceName: "National Weather Service — Flood Safety",
    sourceUrl: "https://www.weather.gov/safety/flood",
    internalLinks: [
      { href: "/texas-weather", label: "Texas weather guide" },
      { href: "/explore/historic-sites", label: "Texas historic sites" },
    ],
    relatedDestinations: ["houston", "fort-worth", "san-antonio"],
  },
  "best-texas-trips-when-its-too-hot-outside": {
    body: tooHot,
    sourceName: "National Weather Service — Heat Safety",
    sourceUrl: "https://www.weather.gov/safety/heat",
    internalLinks: [
      { href: "/texas-weather", label: "Texas weather guide" },
      { href: "/explore/caverns", label: "Texas caverns" },
    ],
    relatedDestinations: ["houston", "san-antonio", "galveston"],
  },
  "best-easy-texas-weekend-trips": {
    body: easy,
    sourceName: "Travel Texas — Road Trips",
    sourceUrl: "https://www.traveltexas.com/things-to-do/road-trips/",
    internalLinks: [
      { href: "/explore/small-towns", label: "Texas small towns" },
      { href: "/explore/road-trips", label: "Texas road trips" },
    ],
    relatedDestinations: ["fredericksburg", "granbury", "brenham"],
  },
};
