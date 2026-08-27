import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayCulturalEnrichment {
  body: ArticleBlock[];
  sourceName?: string;
  sourceUrl?: string;
  internalLinks?: ArticleInternalLink[];
  relatedCollections?: string[];
  relatedDestinations?: string[];
}

const etiquette: ArticleBlock[] = [
  { type: "heading", text: "Texas manners are local habits, not a personality test" },
  { type: "paragraph", text: "The useful way to understand Texas etiquette is to separate courtesy from stereotype. The state includes large international cities, border communities, ranch country, college towns, suburbs and small county seats, so no single set of manners applies everywhere. What does travel well is a practical style of consideration: do not create work for the next person, respect property boundaries, make room when someone needs it, and pay attention to local conditions before assuming your normal routine is universal." },
  { type: "paragraph", text: "That is why a door held for the next person, a brief wave on an empty rural road or a neighbor checking after a storm can feel familiar without being uniquely Texan. These habits work because they reduce friction. A newcomer does not need to imitate an accent, force 'sir' and 'ma'am' into every sentence or perform friendliness. Being observant, useful and respectful is a better guide than trying to pass a cultural test." },
  { type: "heading", text: "Road etiquette changes when distance and weather matter" },
  { type: "paragraph", text: "Driving habits are one of the first places regional etiquette becomes practical. On a two-lane road, do not pressure a slower driver into an unsafe maneuver, but use legal passing opportunities and pullouts when appropriate. At fuel stops, finish the transaction and move the vehicle before shopping if pumps are crowded. On rural roads, remember that farm equipment, livestock trailers, cyclists and wildlife can turn a normal-speed drive into a slower one with little warning." },
  { type: "paragraph", text: "Weather creates its own rules. Do not drive around barricades because a flooded crossing looks shallow, and do not stop in a traffic lane for bluebonnets, wildlife or a scenic photograph. If a severe storm is approaching, local warnings take priority over a sightseeing schedule. Courtesy on the road includes not making emergency crews solve a problem created by an avoidable decision." },
  { type: "heading", text: "Private land is private even when the view looks public" },
  { type: "paragraph", text: "Texas travel often puts attractive ranches, fields, creek crossings and wildflowers directly beside public roads. A fence, cattle guard, open gate or dirt track does not create public access. Stay on legal rights-of-way and designated public land unless the owner has clearly granted permission. That matters during wildflower season, hunting season and rural events when visitors may be tempted to step beyond a fence for a photograph or shortcut." },
  { type: "paragraph", text: "The same respect applies after access is granted. Leave gates as you found them unless the owner tells you otherwise, keep vehicles on approved routes, do not disturb livestock or equipment, and pack out what you brought in. A guest who makes themselves easy to host is more likely to be welcomed back than one who treats working land like a themed attraction." },
  { type: "heading", text: "Small-town friendliness still has boundaries" },
  { type: "paragraph", text: "In many smaller communities, casual conversation with a stranger is ordinary. A cashier may ask where you are headed, someone on a courthouse square may recommend lunch, or a local may explain why an event matters. That friendliness is not an obligation to share personal information, and it should not be treated as permission to pry. The useful rule is to match the other person's level of conversation and leave room for a polite ending." },
  { type: "paragraph", text: "Community events deserve the same awareness. County fairs, school football games, rodeos, church festivals and volunteer fundraisers may welcome visitors, but they still function as local gathering places. Learn basic event rules, avoid blocking residents' access, follow parking instructions and remember that the point is not only entertainment. These events often fund organizations, celebrate local history or mark traditions that existed long before they became road-trip stops." },
  { type: "heading", text: "Food etiquette is mostly about keeping the line moving" },
  { type: "paragraph", text: "At a busy barbecue counter, taco line or bakery, read the menu before reaching the front when possible. Ask questions when you need help, but recognize that a lunch rush is different from a quiet afternoon. At meat-market-style barbecue, ordering by weight may be normal; at another restaurant, plates may be the standard. Watch how the line works before assuming the service model is wrong." },
  { type: "paragraph", text: "If you are invited to a home, bringing a small contribution is usually appreciated when practical, but the host's instructions matter more than a generic rule. If they say not to bring anything, do not turn the visit into a contest over hospitality. Help with obvious cleanup, respect house rules and do not overstay simply because the conversation is friendly." },
  { type: "heading", text: "Good Texas etiquette adapts to the place" },
  { type: "paragraph", text: "Houston apartment life, a Hill Country ranch, a Valley family gathering and a Panhandle farm community can have very different expectations. Observe first. Ask when access, parking, dress or local custom is unclear. The strongest unwritten rule is not a phrase or gesture; it is recognizing that Texas is large enough for several versions of normal to exist at the same time." },
];

const myths: ArticleBlock[] = [
  { type: "heading", text: "The easiest Texas myth to retire is the idea that one landscape explains the state" },
  { type: "paragraph", text: "Texas stretches from Gulf beaches and marshes to Piney Woods forests, Blackland Prairie, limestone Hill Country, Panhandle plains, mountain desert and the Rio Grande Valley. Calling the whole state desert is no more useful than calling the whole state coastal. The landscape changes because rainfall, elevation, soils and ecosystems change, and those physical differences shape agriculture, architecture, recreation and even the way cities use water." },
  { type: "paragraph", text: "That variety also explains why weather stereotypes fail. Houston humidity, Amarillo wind, El Paso dryness and Dallas severe-storm seasons do not feel interchangeable. A traveler who packs for 'Texas weather' without checking the specific region can be wrong in several directions at once." },
  { type: "heading", text: "Cowboy culture is real, but it is not everyone's daily life" },
  { type: "paragraph", text: "Ranching, rodeo, stock shows and Western traditions are genuine parts of Texas history and modern culture, but millions of Texans live in metropolitan neighborhoods, work in medicine, energy, education, logistics, technology, manufacturing and countless other fields, and rarely interact with a ranch. Boots can be work gear, formal wear, fashion or something a person never owns. A real tradition becomes less accurate, not more accurate, when it is used as a costume for everyone." },
  { type: "paragraph", text: "The same applies to music. Country and Western music are major Texas traditions, but so are Tejano, conjunto, blues, gospel, zydeco, hip-hop, rock, classical, regional Mexican music and many scenes built by individual cities and communities. Texas music history is more interesting when those traditions are allowed to overlap instead of competing for one official soundtrack." },
  { type: "heading", text: "Texas food is regional before it is universal" },
  { type: "paragraph", text: "Barbecue and Tex-Mex deserve their reputations, but they are not the whole menu. Gulf seafood, Czech and German baking, East Texas Southern cooking, border foodways, Vietnamese and Cajun influence around Houston, South Texas ranch cooking and West Texas traditions all belong in the story. Even within barbecue, Central Texas meat-market traditions are not identical to East Texas or South Texas approaches." },
  { type: "paragraph", text: "Food arguments are often signs of regional loyalty rather than proof that one side is ignorant. Beans in chili, sauce on brisket, flour versus corn tortillas and what counts as a kolache can produce strong opinions because food carries family and place. Visitors learn more by tasting competing versions than by trying to identify a single official answer." },
  { type: "heading", text: "The four largest metros are not interchangeable" },
  { type: "paragraph", text: "Houston, Dallas-Fort Worth, San Antonio and Austin are all large Texas metros, but their histories, industries, street patterns, demographics, food scenes and relationships to surrounding regions differ. Houston's port and energy history, San Antonio's missions and borderlands context, DFW's paired-city metroplex and Austin's government and university role produce different urban identities. Treating them as the same city with different skylines erases the reasons each grew the way it did." },
  { type: "paragraph", text: "Smaller metros and regional centers complicate the picture further. El Paso looks west and south across a binational region; Corpus Christi is organized around the coast; Lubbock and Amarillo reflect plains agriculture and regional trade; the Rio Grande Valley functions through a chain of communities rather than one dominant central city. Texas is easier to understand as several connected regions than as one giant cultural block." },
  { type: "heading", text: "No state income tax does not answer the whole cost question" },
  { type: "paragraph", text: "Texas does not levy a state personal income tax, but households still encounter property taxes, sales taxes, insurance costs, utility costs, tolls, local fees and housing prices that vary widely by location. Saying 'Texas has no income tax' is accurate; saying that therefore every Texan has a low total tax or living-cost burden is not. Comparisons need to account for the specific household, property and city." },
  { type: "paragraph", text: "The same caution applies to claims that every Texas city is cheap. Housing costs can differ dramatically within one metro, and insurance, commuting, cooling, property taxes and childcare can change the real budget. Statewide averages are useful background, not a substitute for city-level planning." },
  { type: "heading", text: "Texas history is longer than the Alamo and more complicated than a slogan" },
  { type: "paragraph", text: "The Alamo is one important site in the Texas Revolution, but Texas history includes thousands of years of Indigenous history, Spanish colonization, Mexican Texas, the Republic, statehood, slavery and the Civil War, Reconstruction, cattle drives, railroads, oil, border change, migration, civil-rights struggles, military history and modern urbanization. No single battle explains the whole state." },
  { type: "paragraph", text: "Texas also did not move directly from frontier to modern state without outside influence. Indigenous nations, Mexican and Tejano communities, German and Czech immigrants, Black Texans, later domestic migration and global immigration all shaped language, food, music, politics and settlement. The state's identity is cumulative." },
  { type: "heading", text: "The most durable myth is that there is one correct way to be Texan" },
  { type: "paragraph", text: "A ranch family in the Panhandle, a Vietnamese American family on the Gulf Coast, a multigenerational Tejano family in South Texas and a newcomer in a Dallas suburb can all belong to Texas without sharing the same traditions. State symbols and common stories create a layer of shared identity, but regional and family cultures sit underneath it. Texas becomes more understandable when difference is treated as part of the definition instead of a contradiction." },
];

const summer: ArticleBlock[] = [
  { type: "heading", text: "A Texas summer changes the clock before it changes the calendar" },
  { type: "paragraph", text: "The practical adjustment is not simply accepting that afternoons are hot. People begin moving errands, workouts, yard work, dog walks and outdoor attractions toward morning or evening because the middle of the day carries a higher heat load. That shift is especially noticeable in places where summer heat persists for long stretches and nighttime temperatures stay high enough that houses, pavement and vehicles never fully cool." },
  { type: "paragraph", text: "Regional differences still matter. Gulf Coast humidity can make evaporation less effective, while West Texas dryness can hide how much water a person is losing. The Panhandle may cool more at night than Houston. The same statewide temperature number can therefore produce very different comfort and risk depending on humidity, wind, shade and overnight lows." },
  { type: "heading", text: "Shade becomes part of the route plan" },
  { type: "paragraph", text: "After one full summer, a shaded parking space, tree-covered trail, covered playground or north-facing patio starts to look like infrastructure. Visitors often judge an attraction by distance alone; residents learn to ask where the shade is, how far the walk is from the car, whether there is indoor recovery space and how much of the itinerary happens on exposed pavement." },
  { type: "paragraph", text: "That changes road trips too. A state park hike may become a sunrise activity followed by a museum or long lunch. A courthouse-square walk may work better in the morning. A swimming hole can require advance reservations, and a beach day still needs sun and heat planning even with water nearby. The best summer itinerary alternates exposure and recovery instead of stacking outdoor stops until everyone is exhausted." },
  { type: "heading", text: "Cars reveal how much heat is stored in ordinary surfaces" },
  { type: "paragraph", text: "Steering wheels, seat-belt hardware, dashboards and child seats can become painfully hot after a parked car sits in direct sun. Residents learn to ventilate the vehicle, use shade when practical and check surfaces before placing a child in a seat. A parked vehicle is never a safe place to leave a child, dependent adult or pet while running an errand, even when the stop is expected to be brief." },
  { type: "paragraph", text: "Vehicle planning also changes for long drives. Water, phone charging, tire condition and a realistic fuel or charging margin matter more when a breakdown can leave people on exposed pavement. Air conditioning that seems merely uncomfortable when weak in spring can become an urgent repair in peak summer." },
  { type: "heading", text: "Home cooling becomes a system instead of an appliance" },
  { type: "paragraph", text: "A first Texas summer teaches homeowners that comfort depends on more than the thermostat. Filter condition, duct performance, insulation, solar gain, window coverings, shade, air leaks and equipment maintenance all affect how hard the air conditioner works. A west-facing room can behave differently from the rest of the house, and an attic can store enough heat to make late afternoon the hardest part of the day." },
  { type: "paragraph", text: "A sensible household also has a plan for cooling failure. That means knowing who to call, keeping phones charged, identifying a safe cooled place to go if indoor temperatures become dangerous, and recognizing that vulnerable people may need help before everyone else feels uncomfortable. A broken air conditioner during extreme heat is not the same maintenance problem as a broken appliance in mild weather." },
  { type: "heading", text: "Water habits become automatic" },
  { type: "paragraph", text: "People who spend time outside stop waiting until they feel thirsty to think about hydration. Water moves into the car, work bag, sports bag and road-trip kit. Outdoor plans start including refill points. Alcohol and heavy meals are treated differently before long periods in the heat because the body still has to manage temperature and fluid balance." },
  { type: "paragraph", text: "Pools, lakes and rivers can create a false sense that heat no longer matters. Sun exposure continues, decks and rocks become hot, and swimmers still need drinking water. Natural swimming areas also add current, depth and access risks. Cooling off in water is useful; it is not a substitute for supervision, sun protection or weather awareness." },
  { type: "heading", text: "Summer storms change plans quickly" },
  { type: "paragraph", text: "Long hot stretches can be interrupted by thunderstorms that bring lightning, wind and heavy rain with little patience for an outdoor schedule. Residents learn to watch radar before committing to a lake afternoon, sports practice or long drive and to leave water when thunder is heard. A storm that feels welcome because it lowers the temperature can still produce dangerous wind, hail or flash flooding." },
  { type: "paragraph", text: "The first drops of rain after a dry period can also make roads slick, and intense downpours can overwhelm drainage faster than newcomers expect. Summer driving therefore requires both heat preparation and storm flexibility." },
  { type: "heading", text: "September does not guarantee fall" },
  { type: "paragraph", text: "Calendar expectations are one of the last habits to change. Stores may display fall merchandise while afternoons still behave like midsummer. Outdoor-event planning often remains heat-aware well into September, and warm spells can return after brief cool fronts. The first sustained period of lower humidity or genuinely cool mornings feels significant because daily routines finally expand back into the afternoon." },
  { type: "paragraph", text: "Living through a Texas summer is less about collecting complaints than learning systems: when to go outside, where shade matters, how the house holds heat, what the car needs, how much water to carry and when a storm changes the plan. Once those adjustments become routine, summer is still demanding, but it stops being surprising." },
];

export const texasGatewayBatch5CulturalEnrichment: Record<string, GatewayCulturalEnrichment> = {
  "unwritten-rules-of-texas-etiquette": {
    body: etiquette,
    internalLinks: [
      { href: "/article/texas-sayings-outsiders-need-translated", label: "Texas sayings outsiders may hear" },
      { href: "/article/bluebonnet-photo-etiquette-and-best-practices", label: "Bluebonnet photo etiquette" },
      { href: "/article/what-to-keep-in-car-for-texas-road-trip", label: "What to keep in the car on a Texas road trip" },
      { href: "/small-towns", label: "Texas small towns" },
      { href: "/road-trips", label: "Texas road trips" },
    ],
  },
  "texas-myths-outsiders-still-believe": {
    body: myths,
    internalLinks: [
      { href: "/texas-facts", label: "100 essential Texas facts" },
      { href: "/things-unique-to-texas", label: "Things unique to Texas" },
      { href: "/texas-history", label: "Texas history" },
      { href: "/article/texas-regions-that-feel-like-different-states", label: "Texas regions that feel like different states" },
      { href: "/article/texas-foods-people-argue-about", label: "Texas foods people argue about" },
    ],
  },
  "things-you-understand-after-a-texas-summer": {
    body: summer,
    sourceName: "National Weather Service Fort Worth/Dallas — Heat Safety",
    sourceUrl: "https://www.weather.gov/safety/heat",
    internalLinks: [
      { href: "/article/texas-weather-surprises-newcomers", label: "Texas weather surprises newcomers" },
      { href: "/article/open-pool-for-texas-summer", label: "Open a Texas pool for summer" },
      { href: "/article/things-to-do-in-texas-summer-without-melting", label: "Texas summer activities with less heat exposure" },
      { href: "/home-garden", label: "Texas home and garden" },
      { href: "/outdoors", label: "Texas outdoors" },
    ],
  },
};
