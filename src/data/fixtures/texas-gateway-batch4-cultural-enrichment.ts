import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayCulturalEnrichment {
  body: ArticleBlock[];
  sourceName?: string;
  sourceUrl?: string;
  internalLinks?: ArticleInternalLink[];
  relatedCollections?: string[];
  relatedDestinations?: string[];
}

const sayings: ArticleBlock[] = [
  { type: "heading", text: "Texas speech is regional, generational and situational" },
  { type: "paragraph", text: "A useful guide to Texas sayings starts by admitting that there is no single Texas dialect. East Texas speech often shares features with the broader South, ranching and oil-field communities developed their own shorthand, the Rio Grande Valley reflects a long bilingual border culture, and large metros mix people from every part of the country and world. A phrase that sounds completely ordinary in one family may be rare two counties away. That variation is part of the story rather than an exception to it." },
  { type: "paragraph", text: "Expressions such as 'fixin’ to,' 'might could' and 'y’all' work because they carry more meaning than their literal words suggest. 'Fixin’ to' signals near-future intent. 'Might could' leaves room for possibility without commitment. 'All y’all' can clarify that every member of a group is included. None of those phrases requires a cowboy setting; they survive because they are efficient pieces of everyday speech." },
  { type: "heading", text: "Ranching metaphors survive far beyond ranches" },
  { type: "paragraph", text: "Phrases such as 'all hat, no cattle,' 'that dog won’t hunt' and 'this ain’t my first rodeo' make sense even when the speaker works in an office. Their staying power comes from metaphor. They compress a judgment—more appearance than substance, an argument that will not work, experience gained the hard way—into an image listeners understand immediately. That is why Texas-flavored expressions travel well beyond the industries or communities that helped popularize them." },
  { type: "paragraph", text: "Tone matters just as much as dictionary meaning. 'Bless your heart' can be sincere sympathy, gentle teasing or criticism depending on speaker, relationship and delivery. 'Over yonder' can indicate anything from across the room to beyond the next pasture. A newcomer who translates words without listening to context can miss the actual message." },
  { type: "heading", text: "Do not mistake a colorful saying for a universal rule" },
  { type: "paragraph", text: "Some items on any Texas-sayings list are broadly Southern rather than uniquely Texan, and some are much more common among older speakers. Others live most strongly in particular trades, rural communities or families. That does not make them fake; it means language follows people and place. Texas is large enough to contain several overlapping speech traditions at once." },
  { type: "paragraph", text: "Visitors do not need to perform an accent or force unfamiliar expressions into conversation. The better approach is to listen. Notice which phrases appear naturally, ask what an unfamiliar expression means, and pay attention to how language shifts as a trip moves from Houston to East Texas, San Antonio to the Hill Country, or El Paso toward the Permian Basin. Speech is one more map of the state." },
  { type: "heading", text: "A practical translation rule" },
  { type: "paragraph", text: "When a phrase sounds strange, translate the situation before translating the words. Is someone making a plan, softening a disagreement, exaggerating for humor, describing distance or judging whether an idea will work? Once the social job of the phrase is clear, the literal wording usually becomes much easier to understand." },
];

const foodArguments: ArticleBlock[] = [
  { type: "heading", text: "Most Texas food arguments are really arguments about region and memory" },
  { type: "paragraph", text: "The state is too large for one universal food tradition. Central Texas meat-market barbecue developed differently from East Texas chopped-beef and pork traditions. South Texas and San Antonio shaped their own taco and Tex-Mex cultures. Czech and German communities left baking and sausage traditions across Central Texas. Gulf Coast seafood, West Texas chuck-wagon history and border cooking add still more layers. When Texans argue over the 'right' version of a dish, they are often defending the version tied to family or place." },
  { type: "paragraph", text: "That is why a visitor learns more by tasting several versions than by asking for one definitive winner. Order lean and fatty brisket at different pits. Compare flour and corn tortillas in places that make them fresh. Try chili in more than one setting. Visit a Czech bakery and learn why a fruit-filled kolache and a sausage-filled klobasnek are technically different even though everyday Texas speech often blurs the terms." },
  { type: "heading", text: "Barbecue debates reveal different ideas about what the meat should do" },
  { type: "paragraph", text: "Sauce is the classic example. Some diners see sauce as part of the meal; others treat it as unnecessary when brisket is seasoned, smoked and rendered well. Fatty versus lean brisket is another choice disguised as a dispute: the point and flat offer different textures, and a good counter can usually serve both. Sausage, ribs, turkey and sides create the same pattern. The useful question is not which preference is morally correct but what style a particular pit is trying to execute." },
  { type: "paragraph", text: "Even side dishes carry local expectations. Pickles, onions and white bread are familiar companions at many barbecue counters because they cut richness and require no elaborate preparation. Potato salad, beans, slaw and desserts vary widely. A plate that looks incomplete to one Texan may look exactly right to another." },
  { type: "heading", text: "Tex-Mex arguments are often boundary arguments" },
  { type: "paragraph", text: "Breakfast tacos versus burritos, puffy versus crispy tacos, queso consistency and the meaning of 'Tex-Mex' all raise the same question: where does one food tradition end and another begin? In practice those boundaries move. Restaurants borrow ideas, families adapt recipes and cities develop specialties that outsiders later treat as statewide standards." },
  { type: "paragraph", text: "For travelers, that fluidity is useful. Instead of ordering the same dish in every city, ask what a restaurant or town is known for. San Antonio, the Rio Grande Valley, Houston, Austin, El Paso and smaller communities can all offer different answers to the question 'What should I eat in Texas?'" },
  { type: "heading", text: "How to turn the argument into a food road trip" },
  { type: "paragraph", text: "Pick one debate and compare it across two or three stops rather than trying to settle 25 arguments at once. Build a barbecue day around brisket and sausage, a bakery loop around Czech and German communities, or a taco weekend that compares neighborhoods and cities. Keep notes on texture, seasoning, smoke, tortilla style and regional specialties. The point is not to crown Texas's only correct version; it is to understand why so many versions inspire loyalty." },
];

const roadside: ArticleBlock[] = [
  { type: "heading", text: "The road network explains why Texas road trips feel different" },
  { type: "paragraph", text: "The official Texas tourism site describes more than 79,000 miles of roads crossing the state, but the memorable part is how quickly the road type changes. Interstates move traffic between major metros. U.S. and state highways connect regional centers. Farm-to-market and ranch-to-market roads often carry travelers through working agricultural landscapes, small communities and scenic country that major highways bypass. A road shield can therefore tell you something about the landscape before the scenery does." },
  { type: "paragraph", text: "Leaving the interstate also changes the pace of discovery. Courthouse domes begin appearing above downtowns, water towers advertise school mascots, railroad tracks explain why a commercial strip exists, and grain elevators or cotton infrastructure reveal the local economy. Those features are not roadside decoration placed for visitors. They are evidence of how towns were built and what kept them alive." },
  { type: "heading", text: "Texas infrastructure is part of the scenery" },
  { type: "paragraph", text: "Pumpjacks, transmission lines, wind turbines, irrigation systems, cattle guards and long fence lines make energy and agriculture visible from the road. Their concentration changes by region. West Texas and the Permian Basin show one energy landscape; Panhandle wind farms show another. Rice country near the Gulf Coast, cotton country on the plains and cattle country farther west create different roadside patterns." },
  { type: "paragraph", text: "Water infrastructure is equally revealing. In flatter country, a water tower can identify a town long before its business district appears. In the Hill Country, low-water-crossing signs and flood gauges remind travelers that clear creeks can change quickly after heavy rain. The safest road trip notices those signs as operating information, not merely as local color." },
  { type: "heading", text: "Historic markers turn random pull-offs into context" },
  { type: "paragraph", text: "Texas historical markers can explain settlements, battle sites, schools, churches, ranches and transportation routes that are otherwise easy to miss. A marker does not automatically make a shoulder safe for parking, so use designated pull-offs and legal parking. When a marker is accessible, reading it can turn an ordinary stretch of road into a link between the present landscape and the people who shaped it." },
  { type: "paragraph", text: "The same principle applies to courthouse squares. Rather than photographing the dome from the car, park legally and walk one block around the square. Look for the old hotel, bank, theater, newspaper office or railroad connection. The buildings often explain why the courthouse occupies the center of local life." },
  { type: "heading", text: "Use the roadside to choose the next stop" },
  { type: "paragraph", text: "A good Texas road trip leaves room for evidence-based detours. A bakery sign in a Czech-settlement corridor, a state-park sign near a canyon, a historic-district marker or a town advertising a local festival can justify a stop when time allows. The goal is not to pull over for everything; it is to recognize which roadside details point toward a deeper story." },
  { type: "paragraph", text: "Keep fuel range, daylight, weather and distance in the plan. In sparsely populated parts of Texas, the next gas station, restaurant or reliable cell signal can be much farther away than a metro-area driver expects. The open road is part of the attraction, but it rewards travelers who treat scale as a planning fact rather than a surprise." },
];

const birds: ArticleBlock[] = [
  { type: "heading", text: "Texas birding changes dramatically by region" },
  { type: "paragraph", text: "Texas Parks and Wildlife organizes its Great Texas Wildlife Trails into nine regional driving maps, which is a useful clue for casual birders: there is no single statewide bird list that captures what you are likely to notice. The Lower Rio Grande Valley is known for South Texas specialties such as Green Jays, Great Kiskadees and Plain Chachalacas. The Central Coast adds Whooping Cranes and coastal migrants. The Panhandle brings open-country birds and wintering cranes, while East Texas forests support an entirely different set of species." },
  { type: "paragraph", text: "That regional variety means beginners do not need to chase rare birds to have a meaningful trip. Start with the conspicuous birds that define the landscape: herons and egrets along the coast, vultures riding thermals over highways, mockingbirds in neighborhoods, scissor-tailed flycatchers on roadside wires, grackles in city parking lots and raptors over open country. Learning those common species makes unusual sightings easier to recognize later." },
  { type: "heading", text: "Migration turns ordinary places into seasonal birding stops" },
  { type: "paragraph", text: "TPWD notes that Texas offers year-round birding, with spring and hummingbird migrations, summer nesting, fall hawk watches and winter residents. The Gulf Coast is especially important during migration because birds crossing or moving around the Gulf concentrate in suitable habitat. A coastal woodland, wetland or island that looks quiet in another season can become extremely active during a migration window." },
  { type: "paragraph", text: "For travelers, this is a reason to check season as carefully as location. A site famous for spring migrants may offer a completely different experience in January. Conversely, winter can be the right time for cranes, waterfowl and South Texas specialties. The official wildlife-trail maps are useful because they combine geography with established viewing sites rather than relying on random roadside stops." },
  { type: "heading", text: "Birding works best when you slow down" },
  { type: "paragraph", text: "You do not need expensive equipment to start. Binoculars help, but listening and watching behavior can be just as useful. Spend several minutes in one place instead of walking continuously. Watch fence lines, water edges, dead snags, flowering plants and the transition between two habitat types. Early morning often brings more activity and cooler conditions, especially in summer." },
  { type: "paragraph", text: "Respect nesting areas, posted closures and wildlife-management rules. Do not push closer for a photo if a bird repeatedly alarms, leaves a nest or changes behavior because of your presence. At wildlife management areas, TPWD notes that permits or site-specific access rules may apply. Check the managing authority before assuming a viewing site operates like a normal city park." },
  { type: "heading", text: "Turn birding into a Texas road-trip layer" },
  { type: "paragraph", text: "Birding does not need to replace the rest of a trip. Add a wildlife-trail loop to a beach weekend, stop at a wetland before a Gulf Coast museum day, visit a bird blind while camping at a state park or use a Valley birding site as the morning anchor before food and cultural stops. That approach makes wildlife part of Texas travel rather than a specialized activity reserved for experts." },
];

const wildflowers: ArticleBlock[] = [
  { type: "heading", text: "Bluebonnets are only the beginning" },
  { type: "paragraph", text: "TxDOT's Wildflower Program says more than 5,000 species of wildflowers, along with native grasses, flourish along Texas roadsides. That scale explains why a spring drive can change color repeatedly as soil, rainfall, elevation and region change. Bluebonnets attract the most attention, but paintbrushes, coreopsis, phlox, winecups, black-eyed Susans, sunflowers and many other species create different displays through the year." },
  { type: "paragraph", text: "A useful wildflower trip therefore starts with habitat rather than a single famous flower. Hill Country limestone roadsides, Blackland Prairie remnants, coastal prairie, Piney Woods openings and West Texas desert landscapes support different combinations. A route that looks spectacular one year may be subdued the next because rainfall and temperature affect germination and bloom timing." },
  { type: "heading", text: "Roadside mowing is part of the wildflower story" },
  { type: "paragraph", text: "TxDOT manages roadside vegetation in ways intended to support native species while still meeting safety and maintenance needs. Delayed mowing in appropriate areas allows flowers to bloom and set seed. That is why apparently untidy roadside vegetation can be intentional habitat management rather than neglect. Travelers should enjoy those displays without treating the right-of-way as an unrestricted walking or parking area." },
  { type: "paragraph", text: "Wildflower viewing should never override traffic safety. Use legal parking and established public access. Avoid stopping in travel lanes, on blind curves or on shoulders that cannot fully accommodate the vehicle. Do not cross fences into private land for a denser patch. A smaller public field with safe access is a better destination than a perfect private pasture." },
  { type: "heading", text: "Different seasons produce different flower trips" },
  { type: "paragraph", text: "Spring produces the famous bluebonnet-and-paintbrush combinations in many regions, but late spring and summer bring other species into prominence. Fall can produce another wave of color after rain. West Texas desert blooms can be especially dependent on recent weather, making current reports more valuable than fixed annual dates." },
  { type: "paragraph", text: "For photography, focus on composition rather than density. A low angle can make a modest roadside patch fill the frame. Longer focal lengths compress flowers visually without requiring people to stand inside the thickest growth. Early and late light reduces glare and often improves color. Most importantly, leaving plants upright and able to set seed protects the display for later visitors and future seasons." },
  { type: "heading", text: "Build a wildflower loop with a backup purpose" },
  { type: "paragraph", text: "Because bloom quality is weather-dependent, pair a flower route with a courthouse town, state park, historic site, café or scenic drive. If one field is past peak, the day still works. This is especially useful for long-distance travelers who cannot easily move a trip by a week when conditions change." },
];

const onlyInTexas: ArticleBlock[] = [
  { type: "heading", text: "An 'only in Texas' weekend should combine things that belong together" },
  { type: "paragraph", text: "The strongest Texas weekends are not built from unrelated bucket-list stops. They combine landscape, food, history and community in one region. A Hill Country weekend might pair a two-lane drive, a German-settlement town, a spring or state natural area and a dance hall. A Gulf Coast weekend can combine birding, seafood, beach time and a historic port. A Panhandle trip can connect canyon hiking, Route 66 history and open-range scenery." },
  { type: "paragraph", text: "The official Texas tourism site promotes road trips precisely because the state is geographically broad enough for those regional combinations. Trying to collect San Antonio, Big Bend, Galveston and Dallas in one long weekend misses the advantage. Pick one part of the state and let the road between stops become part of the experience." },
  { type: "heading", text: "Use one anchor experience to choose the region" },
  { type: "paragraph", text: "Start with the thing you care about most: barbecue, swimming, music, history, wildlife, desert scenery, beaches or small towns. Then add two complementary stops within a reasonable driving radius. A barbecue-focused weekend works better when the food stops are separated by a historic town or park instead of three enormous meals in a row. An outdoor weekend benefits from an indoor historic or food stop during the hottest part of the day." },
  { type: "paragraph", text: "This anchor-first approach also makes seasonal planning easier. Spring wildflowers work with Hill Country and prairie road trips. Summer favors water, caves and evening events. Fall expands hiking, camping and festival options. Winter can make West Texas desert and canyon travel more comfortable while South Texas remains attractive for wildlife." },
  { type: "heading", text: "Keep the driving proportional to the experience" },
  { type: "paragraph", text: "Texas distances tempt travelers into ambitious maps. A weekend should not become two full days of windshield time unless the drive itself is the goal. Check actual travel times, include fuel and meal stops, and remember that scenic two-lane routes are often slower than interstate estimates. Two memorable destinations with time to explore usually outperform six rushed photo stops." },
  { type: "paragraph", text: "In remote regions, plan fuel range and cell-service gaps. In popular Hill Country or coastal destinations, account for weekend traffic and parking. At state parks, check day-use reservations or capacity before departure. At festivals and major events, reserve lodging early enough that the trip does not force an hour-long commute from the nearest available room." },
  { type: "heading", text: "A Texas weekend is better when one stop is local, not famous" },
  { type: "paragraph", text: "Include one courthouse square, neighborhood restaurant, local museum, historic marker, independent shop or community event that was not the reason you booked the trip. Those smaller stops create contrast with the headline attraction and make regional differences easier to notice. They also reduce the sense that every Texas trip is the same set of famous landmarks repeated in a different order." },
  { type: "paragraph", text: "The result should feel coherent when you describe it afterward: a canyon-and-Route-66 weekend, a Czech-and-German food loop, a missions-and-Tex-Mex weekend, a coast-and-birding trip, or a river-and-dance-hall Hill Country loop. That is more distinctly Texas than simply driving the greatest possible number of miles." },
];

export const texasGatewayBatch4CulturalEnrichment: Record<string, GatewayCulturalEnrichment> = {
  "texas-sayings-outsiders-need-translated": {
    body: sayings,
    internalLinks: [
      { href: "/article/unwritten-rules-of-texas-etiquette", label: "Unwritten rules of Texas etiquette" },
      { href: "/texas-icons", label: "Texas icons and cultural figures" },
    ],
    relatedDestinations: ["fredericksburg", "san-antonio"],
  },
  "texas-foods-people-argue-about": {
    body: foodArguments,
    internalLinks: [
      { href: "/article/texas-food-road-trip-bucket-list", label: "Texas food road-trip bucket list" },
    ],
    relatedCollections: ["smoke-and-salt"],
    relatedDestinations: ["lockhart"],
  },
  "things-you-see-on-a-texas-road-trip": {
    body: roadside,
    sourceName: "Travel Texas — Texas Road Trips",
    sourceUrl: "https://www.traveltexas.com/things-to-do/road-trips/",
    internalLinks: [
      { href: "/historic-sites", label: "Texas historic sites" },
      { href: "/small-towns", label: "Texas small towns" },
    ],
    relatedDestinations: ["fredericksburg", "palo-duro-canyon"],
  },
  "texas-birds-you-will-actually-notice": {
    body: birds,
    sourceName: "Texas Parks and Wildlife Department — Great Texas Wildlife Trails",
    sourceUrl: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/",
    internalLinks: [
      { href: "/outdoors", label: "Texas outdoors" },
      { href: "/state-parks", label: "Texas state parks" },
      { href: "/beaches-coast", label: "Texas beaches and coast" },
    ],
    relatedDestinations: ["mustang-island-state-park", "brazos-bend-state-park"],
  },
  "texas-wildflowers-beyond-bluebonnets": {
    body: wildflowers,
    sourceName: "Texas Department of Transportation — Wildflower Program",
    sourceUrl: "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers/wildflower-program.html",
    internalLinks: [
      { href: "/article/bluebonnet-photo-etiquette-and-best-practices", label: "Bluebonnet photo etiquette" },
      { href: "/road-trips", label: "Texas road trips" },
    ],
    relatedDestinations: ["enchanted-rock", "lost-maples"],
  },
  "only-in-texas-weekend-ideas": {
    body: onlyInTexas,
    sourceName: "Travel Texas — Texas Road Trips",
    sourceUrl: "https://www.traveltexas.com/things-to-do/road-trips/",
    internalLinks: [
      { href: "/road-trips", label: "Texas road trips" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/events", label: "Texas events" },
    ],
    relatedDestinations: ["fredericksburg", "palo-duro-canyon"],
  },
};
