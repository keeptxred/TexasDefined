import type { ArticleBlock } from "../types";

interface GatewaySeasonalEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
}

const summer: ArticleBlock[] = [
  { type: "heading", text: "Build a Texas summer day around the temperature curve" },
  { type: "paragraph", text: "The most useful Texas summer itinerary is not a normal itinerary with extra water added. It changes the order of the day. Put exposed walking, hiking, paddling setup and other strenuous outdoor activity near sunrise. Use late morning for a transition stop, spend the hottest hours in museums, restaurants, caves or other shaded and indoor spaces, then return outdoors in the evening. That rhythm turns heat management into trip design instead of an emergency adjustment after someone is already exhausted." },
  { type: "paragraph", text: "Texas Parks and Wildlife's current heat-safety guidance makes the reason plain: high temperatures can be dangerous to people and dogs, and park visitors should plan, hydrate, dress for heat, use the buddy system and recognize heat illness. In June 2026, TPWD reported 169 heat-related incidents in Texas state parks during 2025, including six involving pets. That is a strong argument for treating timing, water and route length as core planning variables rather than optional comfort upgrades." },
  { type: "heading", text: "Choose summer destinations that naturally reduce exposure" },
  { type: "paragraph", text: "Spring-fed pools, rivers, lakes, Gulf beaches, caverns and heavily shaded forest destinations can work well in summer because the main attraction helps offset the heat. Even then, access rules and conditions matter. Swimming areas can close, rivers can change after rain, popular parks can reach capacity and Gulf weather can change quickly. Check the managing authority before a long drive rather than assuming last year's access or water conditions still apply." },
  { type: "paragraph", text: "Cities also become easier when the itinerary is built in short outdoor segments. Instead of crossing an entire downtown on foot at 3 p.m., pair one walkable district with a museum, long lunch, market, historic interior or hotel break. Resume outdoor sightseeing closer to sunset. Baseball, night markets, evening concerts and stargazing can shift memorable activities into the cooler half of the day." },
  { type: "heading", text: "Heat safety changes with the landscape" },
  { type: "paragraph", text: "Desert, canyon and exposed-rock environments can be less forgiving than a shaded city park. TPWD notes that some canyon locations can be hotter than surrounding areas and that certain trails may close during heat advisories. Remote areas add another problem: cell service and water sources cannot be assumed. Carry the water you need, tell someone your route, keep a map available and turn around before fatigue turns a pleasant hike into a rescue problem." },
  { type: "paragraph", text: "Pets need a separate plan. A dog will often keep following even when pavement or trail surfaces are too hot. TPWD recommends carrying water for pets, checking trail restrictions and considering surface temperature. A summer trip that works for adults may not be appropriate for a dog at the same hour or on the same route." },
  { type: "heading", text: "A practical three-part summer itinerary" },
  { type: "paragraph", text: "Morning: choose the most exposed attraction and start early. Midday: move indoors or underground, eat, recharge and check weather. Evening: return to a riverfront, ballpark, town square, beach, scenic overlook or event after the worst heat has passed. For multi-day trips, alternate high-exposure days with lower-exposure days rather than stacking several long hikes back to back." },
  { type: "paragraph", text: "That structure is more useful than chasing a mythical 'cool' Texas summer destination. Most of the state will be hot. The winning strategy is to choose activities that fit the season, use the clock intelligently and keep enough flexibility to shorten an outdoor segment when conditions are worse than expected." },
];

const fall: ArticleBlock[] = [
  { type: "heading", text: "Texas fall is a travel window, not one foliage weekend" },
  { type: "paragraph", text: "Texas fall works differently from the compact leaf-peeping season associated with colder states. The state is large enough that comfortable temperatures, foliage, festivals and camping conditions arrive at different times in different regions. The practical advantage is a long road-trip season: a traveler can use early fall for higher-elevation or northern destinations, then follow cooler weather and color into other parts of the state as the season develops." },
  { type: "paragraph", text: "Texas Parks and Wildlife highlights fall color well beyond Lost Maples, including cottonwoods at Caprock Canyons and hardwoods in East Texas parks such as Daingerfield and Martin Creek Lake. That diversity makes a better planning strategy than assuming one famous park is the only fall destination. Lost Maples is worth seeing, but it is also one of the places where demand can concentrate most heavily when color peaks." },
  { type: "heading", text: "Pair fall color with a second reason to make the drive" },
  { type: "paragraph", text: "A strong fall trip still works if the leaves are early, late or less vivid than expected. Pair a foliage destination with a historic town, barbecue stop, state park hike, scenic drive, winery, museum, football weekend or small-town event. That way weather-dependent color improves the trip without becoming the entire trip. East Texas forest routes pair naturally with lakes and historic downtowns, while Hill Country loops can combine river scenery, German-settlement towns and state natural areas." },
  { type: "paragraph", text: "Cooler weather also reopens activities that are difficult in midsummer. Longer hikes, primitive camping, courthouse walks, canyon trips and outdoor historic sites become more comfortable. Fall therefore has value even in places without dramatic foliage. Palo Duro, Caprock Canyons and Big Bend can be appealing because reduced heat changes what visitors can reasonably do during daylight hours." },
  { type: "heading", text: "Reservations matter more than spontaneity at popular parks" },
  { type: "paragraph", text: "TPWD notes that camping is especially popular in fall and recommends reservations. The same logic applies to day-use access at high-demand parks and lodging in small towns during festivals or peak-color weekends. If a marquee destination is full, build a backup around a nearby park or town instead of forcing the trip into an overcrowded site." },
  { type: "paragraph", text: "Check current park alerts before departure. Burn bans, trail work, prescribed burns, weather, capacity limits and special events can change the best plan. A flexible loop with two or three possible outdoor stops is usually more resilient than a schedule that depends on one trail being open at one exact hour." },
  { type: "heading", text: "A simple fall weekend formula" },
  { type: "paragraph", text: "Choose one outdoor anchor, one town or cultural stop and one food stop. Add a scenic road between them and leave enough unscheduled time for a trail, festival or roadside discovery. That produces a distinctly Texas fall weekend without turning the trip into a race between 20 bucket-list items." },
  { type: "paragraph", text: "The season is also ideal for revisiting familiar places. A spring wildflower road, summer swimming town or winter birding destination can feel completely different once evenings cool and community calendars fill with football, fairs, harvest events and holiday preparations." },
];

const winter: ArticleBlock[] = [
  { type: "heading", text: "Winter expands the parts of Texas that are hardest in summer" },
  { type: "paragraph", text: "Texas winter is valuable less because the state becomes uniformly cold than because heat stops controlling so many itineraries. Desert parks, canyon landscapes, urban walking routes and long scenic drives become easier to use for full days. Big Bend, Guadalupe Mountains, Palo Duro and other exposed destinations can offer dramatically different trip possibilities when daytime temperatures are lower." },
  { type: "paragraph", text: "That does not make winter predictable. Texas Parks and Wildlife trail guidance stresses preparing for rapid weather changes and wearing layers. A mild morning can be followed by strong wind, rain or a sharp temperature drop, and freezing weather can affect roads, water systems and park operations. Check the forecast and current park alerts close to departure rather than packing for the monthly average." },
  { type: "heading", text: "Use regional contrast to build a winter trip" },
  { type: "paragraph", text: "South Texas and the Rio Grande Valley can be attractive for wildlife and birding while higher elevations in West Texas may be much colder. Gulf Coast towns can offer mild walking weather between fronts. Hill Country cabins and small-town squares create a different kind of trip centered on food, history and evening atmosphere. The state is large enough that a cold spell in one region does not automatically make the same itinerary appropriate everywhere else." },
  { type: "paragraph", text: "Winter also suits trips where the experience matters more than swimming or foliage: San Antonio missions, Galveston architecture, courthouse towns, museums, barbecue road trips, caverns, dance halls and historic sites. These destinations give a traveler indoor or sheltered options when weather changes unexpectedly." },
  { type: "heading", text: "Cold-weather camping needs a real backup plan" },
  { type: "paragraph", text: "Shorter daylight and cold overnight temperatures change camping logistics. Arrive with enough time to set up before dark, carry layers appropriate to the forecast, and know whether your site has electricity, water and nearby shelter. Do not assume a warm afternoon means a warm night. In remote areas, keep the vehicle fueled and avoid depending on cellular coverage as the only source of maps or emergency communication." },
  { type: "paragraph", text: "Wind can matter as much as temperature in exposed West Texas and Panhandle landscapes. Check trail conditions and park guidance before attempting high ridges or long backcountry routes. If freezing precipitation is possible, road conditions can become the deciding factor even when the attraction itself remains open." },
  { type: "heading", text: "Build flexibility into every winter weekend" },
  { type: "paragraph", text: "A useful winter itinerary has an outdoor Plan A and an indoor Plan B in the same general area. Pair a hike with a museum, a scenic drive with a historic district, or a birding stop with a food destination. If a front arrives early, you can change the order without abandoning the trip." },
  { type: "paragraph", text: "The reward is access to a quieter, more walkable Texas. Winter can make long hikes possible, reduce midday heat on historic sites, improve comfort on city walks and open a season of road trips that would be exhausting in August. The key is respecting the variability rather than assuming Texas winter is either always mild or always severe." },
];

export const texasGatewayBatch3SeasonalEnrichment: Record<string, GatewaySeasonalEnrichment> = {
  "things-to-do-in-texas-summer-without-melting": {
    body: summer,
    sourceName: "Texas Parks and Wildlife Department — Heat Safety",
    sourceUrl: "https://tpwd.texas.gov/state-parks/park-information/safety/heat-safety-info",
  },
  "texas-fall-bucket-list": {
    body: fall,
    sourceName: "Texas Parks and Wildlife Department — Fall for Parks",
    sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/fall-for-parks",
  },
  "texas-winter-bucket-list": {
    body: winter,
    sourceName: "Texas Parks and Wildlife Department — Trail Safety",
    sourceUrl: "https://tpwd.texas.gov/state-parks/park-information/safety/trail-safety/",
  },
};
