import type { ArticleBlock } from "../types";

// Runtime-only depth enrichment for staged gateway QA. These records do not alter
// the explicit gateway index-ready allowlist or public discovery behavior.
interface GatewayEnrichment {
  body: ArticleBlock[];
  sourceName?: string;
  sourceUrl?: string;
}

const texanIdentity: ArticleBlock[] = [
  { type: "heading", text: "What these habits actually say about Texas" },
  { type: "paragraph", text: "Texas identity is regional before it is uniform. A person in El Paso can share the same statewide symbols as someone in Beaumont while living in a very different landscape, climate and food culture. The point of a list like this is not to turn Texans into stereotypes; it is to notice the small adaptations people make to distance, weather, local institutions and community traditions. Measuring trips in hours makes sense in a state where metro areas, state parks and family destinations can be separated by hundreds of miles. Watching radar becomes ordinary because severe weather can develop quickly. Seeking shade is not a personality trait so much as a practical response to long hot seasons." },
  { type: "paragraph", text: "Food habits reveal the same regional layering. Central Texas barbecue traditions, South Texas breakfast tacos, Czech and German baking traditions, Gulf Coast seafood and East Texas comfort food all belong to the same state without being interchangeable. Even the familiar argument over whether a sausage-filled Czech pastry should be called a kolache shows how immigrant food traditions were absorbed, adapted and renamed in everyday Texas speech. A useful Texas culture guide should preserve those distinctions instead of flattening them into one generic cowboy story." },
  { type: "heading", text: "Why courthouses, football fields and dance halls matter" },
  { type: "paragraph", text: "Many Texas communities were organized around civic buildings and gathering places long before modern shopping corridors arrived. County courthouses remain visual anchors in dozens of towns, and the Texas Historical Commission describes historic courthouses as widely recognized community assets tied to civic activity, history and culture. Friday-night football, county fairs, rodeos and dance halls play a similar social role: they are recurring places where residents see neighbors, mark seasons and pass local traditions between generations." },
  { type: "paragraph", text: "That is why the most recognizable Texas habits are often less about what someone owns than about how they use place. Knowing which farm-to-market road avoids traffic, which spring is worth the detour, which barbecue line is worth waiting in, or which courthouse square has a good festival is local knowledge accumulated over time. The habits feel normal because they solve practical problems while reinforcing a sense of belonging." },
  { type: "heading", text: "A better way to read the list" },
  { type: "paragraph", text: "Treat the 35 signs as conversation starters, not a residency test. A lifelong Houstonian may never have attended a small-town football game. A Panhandle family may have stronger rodeo traditions than Gulf Coast traditions. A recent arrival can quickly learn to plan around heat, weather and drive time without pretending to share someone else's childhood memories. Texas culture is strongest when the statewide shorthand leaves room for those differences." },
  { type: "paragraph", text: "For visitors, the practical lesson is to slow down enough to notice the local version of Texas rather than chasing only famous symbols. Spend time in a courthouse square, eat the regional specialty, read a historical marker, attend a community event and drive at least one route that is not the fastest possible line between two attractions. Those choices explain Texas culture far better than a checklist of hats, boots or slogans." },
];

const smallTownExperiences: ArticleBlock[] = [
  { type: "heading", text: "Why courthouse towns are such a useful way to explore Texas" },
  { type: "paragraph", text: "Texas has 254 counties, and county seats created a statewide network of courthouse towns that still gives travelers a practical framework for understanding local history. The Texas Historical Commission notes that courthouses were among the first permanent structures in many counties and remain important community landmarks. In smaller towns, the courthouse square often concentrates the oldest commercial buildings, civic monuments, museums, cafés and event spaces within a walkable area. That makes the square a better starting point than a random list of attractions." },
  { type: "paragraph", text: "The most rewarding small-town trips combine architecture with the reason the town exists. Railroad depots point to transportation history. Cotton gins, grain elevators and feed stores reveal agricultural economies. Churches and cemeteries can document settlement patterns. Dance halls and festival grounds show where immigrant traditions became local traditions. A courthouse alone is photogenic; a courthouse placed in that larger story becomes memorable." },
  { type: "heading", text: "Build loops instead of collecting town names" },
  { type: "paragraph", text: "A common mistake is trying to visit too many towns in one day. The better strategy is to choose two or three communities connected by a scenic or historically interesting road and give each enough time for one meal, one walk and one local story. In the Hill Country, that may mean pairing a German-settlement town with a state park or dance hall. In East Texas, it may mean combining a courthouse square with a forest or lake stop. In the Panhandle, long horizons and railroad history often become part of the drive itself." },
  { type: "paragraph", text: "This slower pattern also spreads travel spending more naturally. A locally owned café, museum donation, bookstore, antique shop or overnight stay contributes more to a community than a five-minute photo stop. It also gives travelers a chance to ask residents what is worth seeing nearby. Those conversations are often how lesser-known historic sites, scenic roads and seasonal events become part of the trip." },
  { type: "heading", text: "How to be a good guest in a small town" },
  { type: "paragraph", text: "Small-town travel works best when visitors remember that the square is not a theme park. Courthouses are working government buildings. Churches may be active congregations. Cemeteries require respect. Storefronts and homes are private property even when they are historic. Park legally, avoid blocking driveways or farm roads, ask before photographing people at close range, and check whether a museum or historic building is actually open before planning a long detour." },
  { type: "paragraph", text: "Season matters too. Summer midday heat can make a courthouse walk uncomfortable, while spring and fall are better for pairing towns with outdoor stops. December courthouse lightings can transform the same square that feels quiet in August. Festival weekends add energy but also parking pressure and limited lodging. Returning in a different season is not redundant; it is one of the best ways to see how community life changes through the year." },
];

const bluebonnetEtiquette: ArticleBlock[] = [
  { type: "heading", text: "Roadside safety comes before the photo" },
  { type: "paragraph", text: "Bluebonnet season turns ordinary highways and farm roads into destinations, which is exactly why parking behavior matters. TxDOT asks wildflower viewers to park away from traffic and not on top of flowers, and specifically discourages picture-taking that damages roadside blooms. A visually perfect patch is not a safe stopping place if there is no designated parking area, if the shoulder is narrow or soft, or if drivers approaching from either direction cannot see you in time." },
  { type: "paragraph", text: "The safest approach is to plan the stop before the flowers appear in the windshield. Use a known park, visitor center, public trail, festival site or other legal parking area when possible. If a roadside location does not provide enough room to get completely out of traffic, keep driving. Never send children across a roadway to reach a denser patch, and do not leave a vehicle partly in a travel lane while taking a quick photo." },
  { type: "heading", text: "Why trampling matters even when the flowers look abundant" },
  { type: "paragraph", text: "TxDOT's Wildflower Program manages roadsides to encourage native wildflowers and grasses, and the agency warns that heavy trampling can prevent flowers from surviving and setting seed. A single person sitting beside a sparse patch may cause little visible damage, but popular photo locations can receive hundreds of visitors. Repeated foot traffic creates flattened corridors, broken stems and compacted areas that remain obvious after the photographers leave." },
  { type: "paragraph", text: "That is why the low-impact photo usually looks better anyway. Position people on an existing path, bare spot or open edge and shoot across the flowers. A longer focal length can visually compress the field, making blooms appear denser without anyone standing in the middle of them. Shooting from a lower angle can fill the foreground with flowers while keeping feet on durable ground." },
  { type: "heading", text: "Bloom timing is regional, not a single statewide weekend" },
  { type: "paragraph", text: "TxDOT says bluebonnet flowering generally begins earlier in southern Texas and later farther north, with a typical flowering period of about a month. Rainfall, temperature and local soil conditions can shift the display from year to year. That makes current-condition checking more useful than relying on a date from last year's social-media post. A field that peaked two weeks ago may already be setting seed, while another region may just be starting." },
  { type: "paragraph", text: "In 2026 TxDOT added a wildflower layer to its statewide planning map to help drivers locate wildflower areas and safer places to plan stops. That kind of official planning tool is a better starting point than geotagging a private pasture or copying a roadside pin without knowing whether parking is legal." },
  { type: "heading", text: "Private land, livestock and the rest of the field" },
  { type: "paragraph", text: "Bluebonnets often grow on private ranches, farms and residential property. A fence, gate or open-looking pasture is not an invitation to enter. Ask permission before crossing onto private land, do not move gates, and keep pets controlled around livestock. In public areas, stay alert for fire ants, ticks, thorny plants, uneven ground and snakes rather than assuming a flower field is a manicured lawn." },
  { type: "paragraph", text: "The best etiquette standard is simple: leave the site looking unchanged. Take photos, not plants or props. Carry out trash. Use legal parking. Keep people and pets on durable surfaces where possible. If a location is already crowded or damaged, choose another stop. Bluebonnet season is a shared Texas tradition, and the goal is to leave the same display for the next family—and enough healthy plants to seed the next spring." },
];

export const texasGatewayBatch3CulturalEnrichment: Record<string, GatewayEnrichment> = {
  "you-know-youre-a-texan-if": {
    body: texanIdentity,
    sourceName: "Texas Historical Commission — Courthouse Preservation",
    sourceUrl: "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation",
  },
  "small-town-texas-experiences-everyone-should-have": {
    body: smallTownExperiences,
    sourceName: "Texas Historical Commission — Courthouse Preservation",
    sourceUrl: "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation",
  },
  "bluebonnet-photo-etiquette-and-best-practices": {
    body: bluebonnetEtiquette,
    sourceName: "Texas Department of Transportation — Wildflower Program",
    sourceUrl: "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers/wildflower-program.html",
  },
};
