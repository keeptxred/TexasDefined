import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayBatch9Enrichment {
  body: ArticleBlock[];
  sourceName?: string;
  sourceUrl?: string;
  internalLinks?: ArticleInternalLink[];
  relatedDestinations?: string[];
  relatedCollections?: string[];
}

const spring: ArticleBlock[] = [
  { type: "heading", text: "Spring is a moving target, not a fixed Texas date" },
  { type: "paragraph", text: "A strong spring weekend starts with the region because Texas warms and blooms on different schedules. South Texas may already feel like late spring while the Panhandle is still dealing with cold fronts. Hill Country wildflowers can look very different from East Texas forests or Gulf Coast migration stops in the same week. Use current weather, bloom reports and park alerts close to departure rather than treating a month on the calendar as proof that every classic spring activity is ready." },
  { type: "paragraph", text: "Spring is popular because it combines longer daylight with more comfortable temperatures across much of the state, but it also brings thunderstorms, festival traffic and fast-changing outdoor conditions. Build each day around one weather-sensitive anchor and one backup. A wildflower loop can pair with a courthouse town. A park hike can pair with a museum or food stop. Birding can be moved earlier in the day if storms or heat are expected later." },
  { type: "heading", text: "Wildflower trips work best when flowers are one layer of the day" },
  { type: "paragraph", text: "Bluebonnet country around Ennis, Washington County and the Hill Country can be spectacular, but bloom density varies from year to year. Do not trespass or stop in unsafe roadside locations for a denser patch. Use public access, legal parking and established routes. A flower trip should still work if the most famous field is past peak, crowded or inaccessible. Pair the drive with a historic square, state park, local meal or scenic road so the day retains value independent of one photograph." },
  { type: "paragraph", text: "Photography is better when the group is patient about light and access. Early and late hours can improve color and reduce heat, while a longer lens can create the appearance of a dense field without requiring people to trample flowers. Leave plants upright and avoid blocking narrow roads. The goal is to enjoy a seasonal landscape without damaging the thing everyone came to see." },
  { type: "heading", text: "Hill Country spring weekends need reservations and restraint" },
  { type: "paragraph", text: "Enchanted Rock, Fredericksburg, Wimberley, Blanco and other Hill Country destinations draw heavily in spring. Secure park access where recommended, book lodging before major festival or wildflower weekends, and choose a small radius. A good spring trip might combine one hike, one small town and one food or heritage stop. Trying to add every famous town can turn a pleasant two-day weekend into repeated traffic and parking problems." },
  { type: "paragraph", text: "Weather can flip quickly. A mild morning may lead to thunderstorms or a warmer afternoon. Check radar and local forecasts before exposed hikes or river plans, and do not treat a scenic low-water crossing as safe merely because the road was open earlier. Spring flexibility is part of the itinerary, not evidence that the trip was poorly planned." },
  { type: "heading", text: "The coast becomes a migration destination" },
  { type: "paragraph", text: "Rockport, Aransas-area communities and other Gulf Coast stops can be especially rewarding in spring because migration adds another reason to travel. Birding works best early, when temperatures are lower and activity is often higher. Use established wildlife sites and respect closures or nesting areas. A coastal weekend can combine birding with seafood, historic districts and waterfront time so non-birders are not asked to spend every hour scanning trees and marshes." },
  { type: "paragraph", text: "The coast also requires a weather backup. Wind, rain and storms can affect boat trips and outdoor viewing, so check operators and managing authorities before assuming every activity will run. A museum, historic neighborhood or long lunch can keep the trip intact when the Gulf changes the plan." },
  { type: "heading", text: "Palo Duro and Guadalupe Mountains become easier before summer heat" },
  { type: "paragraph", text: "Spring can open longer hiking windows in the Panhandle and far West Texas, but visitors should not assume cool conditions. Exposed trails can still warm quickly, and wind or late cold fronts may matter. Start early, carry sufficient water and check current park conditions. The advantage of spring is not guaranteed comfort; it is a wider range of workable days than midsummer usually provides." },
  { type: "paragraph", text: "Because these destinations require substantial driving for many Texans, give the outdoor anchor enough time. A canyon or mountain weekend should not be treated as a photo stop between distant cities. Stay regionally focused, use nearby towns for food and lodging, and leave room for one lighter scenic or historical activity." },
  { type: "heading", text: "Spring festivals can justify the whole trip if the event is the anchor" },
  { type: "paragraph", text: "Round Top, small-town festivals, cultural events and city weekends can all become spring anchors. Check official dates and parking or shuttle information because event logistics often matter more than the attraction list. Build the rest of the weekend around the event's fixed time rather than trying to squeeze it into an already full itinerary." },
  { type: "paragraph", text: "The best spring Texas weekend uses seasonality without becoming dependent on one fragile condition. Choose a region where wildflowers, hiking, migration, food or festivals give you a reason to go now, then add enough nonseasonal value that a rainstorm or late bloom does not erase the trip." },
];

const fall: ArticleBlock[] = [
  { type: "heading", text: "Texas fall is several different seasons happening on different clocks" },
  { type: "paragraph", text: "Autumn does not move evenly from the Panhandle to the Gulf. North Texas may feel comfortable while South Texas is still hot, and fall color in East Texas or the Hill Country can peak weeks apart. The strongest fall weekends are built around regional conditions rather than a generic October assumption. Check current forecasts, park updates and event calendars before deciding whether the trip should emphasize hiking, festivals, football, foliage or the coast." },
  { type: "paragraph", text: "Fall is also one of the busiest event seasons. State Fair weekends, football games, Wurstfest, Hill Country festivals and college-town schedules can affect hotel prices, traffic and parking. If an event is the reason for the trip, reserve around it early. If it is not, consider avoiding the highest-demand weekend and enjoying the same region with less logistical friction." },
  { type: "heading", text: "State Fair season is a Dallas trip, not just a fairground visit" },
  { type: "paragraph", text: "The State Fair of Texas can fill most of a day, especially for first-time visitors. Do not pair it with a long list of distant DFW attractions on the same date. Use transit or current parking guidance, arrive with a realistic food and activity budget, and leave the evening flexible. A second day can then focus on Dallas museums, neighborhoods or another part of the region without making the fair feel like an obstacle course." },
  { type: "paragraph", text: "Demand can raise lodging prices around major weekends, so compare staying near transit with staying farther out and driving. The cheaper room is not necessarily cheaper once parking, tolls and time are added. Treat the event as the anchor and optimize the rest of the trip around reducing travel friction." },
  { type: "heading", text: "Lost Maples is worth planning only when current conditions justify the demand" },
  { type: "paragraph", text: "Lost Maples attracts attention for fall color, but timing varies with weather. Secure access when reservations are recommended and check current reports rather than assuming a famous week will repeat every year. Even when color is strong, the park is still a hiking destination, so footwear, water and trail ability matter. A foliage trip should not become a dangerous rush to reach one overlook before sunset." },
  { type: "paragraph", text: "Pair the park with nearby Hill Country towns or scenic roads so the weekend remains useful if color is early, late or uneven. This is the broader Texas fall rule: use seasonal phenomena as an enhancement, not the only reason the trip can succeed." },
  { type: "heading", text: "West Texas and the Panhandle gain longer hiking windows" },
  { type: "paragraph", text: "Palo Duro, Caprock Canyons, Big Bend and the Davis Mountains can become much more comfortable as summer heat loosens its grip. That does not eliminate risk. Exposed terrain still requires water, daylight planning and current weather awareness. Cold fronts can produce large temperature swings, and remote destinations still require fuel and lodging planning." },
  { type: "paragraph", text: "The benefit of fall is time. A trail that would be impractical at midday in August may fit comfortably into a cooler day. Use that extra margin to explore one park well instead of using improved weather as permission to add more driving." },
  { type: "heading", text: "Football weekends work when the game is allowed to dominate the schedule" },
  { type: "paragraph", text: "High-school and college football can make a town feel completely different on a fall Friday or Saturday. If that atmosphere is the point, arrive early enough to experience the surrounding community rather than treating the stadium as a sealed venue. Eat locally, walk the campus or square and understand parking before game traffic peaks. The event becomes a travel experience when the town around it remains visible." },
  { type: "paragraph", text: "Football also creates predictable congestion. Do not schedule a long restaurant reservation across town shortly before kickoff or assume normal drive times after the game. A simple plan with one game, one meal and one local exploration block usually works better than an ambitious city itinerary." },
  { type: "heading", text: "The Gulf Coast can become easier after peak summer" },
  { type: "paragraph", text: "Fall can improve walking, birding and waterfront time on parts of the Gulf Coast, but hurricane season and tropical weather remain relevant. Check forecasts and official local information before departure. A shoulder-season trip can offer lower heat and different wildlife activity, but flexibility matters more than the promise of perfect weather." },
  { type: "paragraph", text: "The best Texas fall weekend chooses one seasonal advantage—cooler hiking, foliage, a major event, football or coast weather—and builds a coherent regional trip around it. Fall is varied enough that travelers do not need to chase every tradition in the same month." },
];

const winter: ArticleBlock[] = [
  { type: "heading", text: "Winter is useful because Texas becomes easier to walk in many places" },
  { type: "paragraph", text: "Winter shifts the travel advantage toward destinations where summer heat limits how long people want to stay outside. San Antonio, Galveston, Houston, Fort Worth, El Paso and West Texas can all support long walking days when conditions are mild. The tradeoff is variability: a pleasant afternoon can be followed by a hard cold front. Pack layers and build at least one indoor anchor into the trip rather than assuming 'Texas winter' always means warmth." },
  { type: "paragraph", text: "Shorter daylight also matters. A winter itinerary that looks easy on a map can push scenic drives or hikes into darkness earlier than expected. Start outdoor anchors sooner, especially in remote areas, and use evenings for food, museums, music or holiday events. That rhythm often produces a more comfortable trip than trying to imitate a summer schedule with fewer daylight hours." },
  { type: "heading", text: "Big Bend and the Davis Mountains are classic winter choices for a reason" },
  { type: "paragraph", text: "Cooler days can make desert hiking much more attractive, but winter does not remove exposure, altitude or remoteness. Check current park weather, road conditions and trail information. Carry water, plan fuel and do not assume every cold front is mild. Freezing nights are possible, particularly at elevation. A winter Big Bend trip should still be treated as a remote outdoor itinerary, not a climate loophole." },
  { type: "paragraph", text: "The Davis Mountains, Fort Davis and nearby communities can create a lower-mileage alternative or companion trip. Historic sites, scenic roads and night-sky activities give winter visitors several ways to use the region without committing every day to a long hike. Keep the itinerary geographically tight and let daylight determine how much driving belongs in one day." },
  { type: "heading", text: "San Antonio works especially well when holiday events or museums are part of the plan" },
  { type: "paragraph", text: "Winter gives San Antonio a natural indoor-outdoor balance. The missions, neighborhoods and River Walk can fill mild daylight hours, while museums, dining and seasonal events provide evening structure. Holiday periods can be crowded, so use official event calendars and reserve lodging or major experiences early when a specific date matters." },
  { type: "paragraph", text: "After the holidays, demand may change and the city can feel different. The history, food and museums remain, which makes San Antonio one of the least season-dependent weekend choices in the state. A winter traveler who wants reliability should value that depth more than a destination whose appeal rests entirely on one outdoor condition." },
  { type: "heading", text: "The coast becomes a birding and architecture trip more than a swimming trip" },
  { type: "paragraph", text: "Rockport and other coastal communities can be excellent in winter for birding, wildlife observation and seafood, while Galveston rewards architecture and history walks in cooler temperatures. Gulf water and weather may not suit a beach-swimming itinerary, but that does not make the coast off-season. It simply changes what the trip is for." },
  { type: "paragraph", text: "Wind and cold fronts can still make exposed waterfronts uncomfortable, so plan an indoor backup. Museums, historic districts, shops and long lunches can absorb the middle of a difficult weather day. Coastal winter travel works best when the traveler is interested in the place, not only the beach." },
  { type: "heading", text: "Houston and Fort Worth are strong cold-weather fallbacks" },
  { type: "paragraph", text: "Large museums, food neighborhoods, performance venues and indoor attractions make Houston and Fort Worth resilient when winter weather is unpredictable. A city weekend can still include walking and outdoor districts when conditions are good, but it does not collapse if rain or a cold front arrives. That reliability is valuable for travelers booking far in advance." },
  { type: "paragraph", text: "Keep the geography controlled. Houston in particular punishes itineraries that bounce across the metro for individual restaurant names. Choose a museum district, neighborhood or event anchor and cluster meals nearby. Winter may reduce heat, but it does not reduce distance." },
  { type: "heading", text: "Palo Duro and El Paso require a forecast-first approach" },
  { type: "paragraph", text: "The Panhandle and far West Texas can deliver beautiful clear winter days, but cold, wind, ice or snow are possible. Check road and park conditions close to departure. Do not assume a scenic drive or trail is open because the metro forecast looks mild. If conditions are favorable, cooler temperatures can make canyon and mountain exploration excellent. If not, the safer choice may be a museum, historic site or a delayed outdoor block." },
  { type: "paragraph", text: "The best winter Texas weekend is flexible by design. Choose destinations with at least one strong indoor option, respect shorter daylight and use the season to enjoy places that are difficult in peak heat. Winter is not a lesser Texas travel season; it simply rewards travelers who plan for variability instead of pretending the forecast is guaranteed." },
];

const kids: ArticleBlock[] = [
  { type: "heading", text: "Age changes what a successful Texas trip looks like" },
  { type: "paragraph", text: "A toddler, a nine-year-old and a teenager can all enjoy Texas, but not with the same schedule. Toddlers need short transitions, shade, reliable meals and room for naps or early bedtime. Elementary-age children can handle longer activity blocks when there is a clear theme such as dinosaurs, wildlife, caves or a hands-on museum. Teenagers often want more autonomy, stronger experiences and fewer activities that feel designed for small children. Build the itinerary around the youngest traveler's hard limits, then give older children one or two choices that feel specifically theirs." },
  { type: "paragraph", text: "One major outing per half day is usually enough. Texas distances make ambitious family schedules especially fragile because a late departure, traffic or a long meal can push the next activity into heat or closing time. Leave room for snacks, bathrooms, downtime and spontaneous stops. Family travel improves when the schedule is easier than the adults think they can handle." },
  { type: "heading", text: "Toddlers do best with short outdoor windows and a strong backup" },
  { type: "paragraph", text: "For very young children, choose places where the experience begins quickly. A short nature loop, beach morning, shaded park, zoo or compact historic area works better than a remote trailhead followed by a long exposed hike. In hot weather, outdoor time should shift earlier, with indoor or shaded activities later. Always follow current heat and water-safety guidance and never rely on a stroller or carrier as protection from extreme conditions." },
  { type: "paragraph", text: "Coastal weekends can work well if the beach is only one part of the day. Pair an early beach block with an aquarium, museum, historic district or long lunch. Hill Country trips can pair a small-town walk with a short nature stop. The objective is not to prove that toddlers can keep up with an adult itinerary; it is to make the destination accessible enough that everyone is still enjoying the trip by dinner." },
  { type: "heading", text: "Elementary-age kids often respond well to a clear trip theme" },
  { type: "paragraph", text: "Dinosaurs, wildlife, caves, trains, missions and state parks all give younger school-age children a story to follow. Glen Rose and Dinosaur Valley can become a geology-and-fossil weekend when current river conditions support track viewing. San Antonio can combine missions with family attractions. Brazos Bend can turn wildlife observation into the anchor, provided families maintain safe distance from alligators and follow park rules." },
  { type: "paragraph", text: "Give children a job: choose the next trail, keep a wildlife list, find three architectural details, compare two regional foods or help read a map. Participation converts waiting and walking into part of the activity. It also reduces the temptation to fill every quiet moment with another attraction." },
  { type: "heading", text: "Tweens can handle more challenge when the objective is visible" },
  { type: "paragraph", text: "Palo Duro Canyon, cavern trips, paddling, longer state-park walks and city museum weekends can work well for tweens because the destination offers a concrete payoff. The key is not assuming age equals outdoor readiness. Heat tolerance, hiking experience, swimming ability and comfort with heights vary widely. Pick routes based on the actual child, not the difficulty label on a family travel list." },
  { type: "paragraph", text: "Let tweens influence one meal or stop each day. A trip feels less imposed when they can choose between a museum and a short hike, or between two food options. That small amount of control often matters more than adding another kid-branded attraction." },
  { type: "heading", text: "Teen trips improve when the experience feels real rather than juvenile" },
  { type: "paragraph", text: "Big Bend stargazing, challenging hikes, Houston food neighborhoods, major museums, live music, sports and urban photography can all give teenagers a reason to care about the destination. Do not build the entire weekend around attractions designed for younger siblings. When ages are mixed, alternate who gets the primary anchor. A teen may tolerate a children's museum more happily when the next block is a concert, food stop or landscape they chose." },
  { type: "paragraph", text: "Remote outdoor trips require adult judgment even when teenagers are capable hikers. Water, weather, daylight, trail conditions and cell-service limits still control the plan. Independence should mean participation in decisions, not transferring safety responsibility to the child." },
  { type: "heading", text: "Mixed-age families need destinations with layers" },
  { type: "paragraph", text: "San Antonio, Galveston, Houston, Fort Worth, the Hill Country and many lake destinations work well for mixed ages because one region can support several activity levels. A grandparent can choose a museum or scenic stop while older kids take a longer trail. Younger children can return to lodging for a rest while others explore a walkable district. Destinations with multiple layers reduce the pressure for every person to love every hour." },
  { type: "paragraph", text: "Lodging can be part of the strategy. A central location, kitchenette, pool, cabin or easy parking may matter more to family comfort than a more stylish room. Choose the feature that removes the biggest friction point for your group. A family trip is successful when logistics support the activities rather than constantly competing with them." },
  { type: "heading", text: "Use a family trip test before making reservations" },
  { type: "paragraph", text: "Ask whether the destination offers a primary activity the children care about, an easier backup, food at predictable times, manageable driving and a weather plan. Then check current operating rules for the exact venues involved. Age recommendations, water access, trail conditions and event policies can change. A list can suggest the trip; the official venue should determine whether the activity fits your family now." },
  { type: "paragraph", text: "The best Texas family trip is not the one with the largest number of attractions. It is the one where children have enough variety to stay engaged, adults have enough margin to make safe decisions and the region itself remains visible. Build around attention span, heat, distance and one memorable shared experience per day." },
];

const food: ArticleBlock[] = [
  { type: "heading", text: "A food weekend should explain why the food belongs to the place" },
  { type: "paragraph", text: "Texas food travel becomes more interesting when the trip is organized around regional traditions instead of a list of famous restaurants. Lockhart makes sense because Central Texas barbecue grew out of meat-market and community traditions. San Antonio tells a different story through Tex-Mex, Mexican American food, markets and neighborhood institutions. Houston's value comes from the scale of its international food communities. El Paso and the Rio Grande Valley reflect border geography. Galveston and the upper coast connect seafood to port and Gulf history." },
  { type: "paragraph", text: "The goal is not to settle which city has the state's best food. It is to understand why a specific meal tastes and feels different there. Build each day around one major food anchor, one smaller tasting or bakery stop and one non-food activity. That pacing protects both appetite and attention." },
  { type: "heading", text: "Lockhart is strongest when barbecue is treated as a comparison, not a contest" },
  { type: "paragraph", text: "Several long-running barbecue institutions make Lockhart ideal for tasting differences in brisket, sausage, ribs and sides without spending the whole weekend driving. Order smaller portions, share when possible and walk the historic square between meals. The useful question is not which pit wins a universal ranking. Notice smoke level, bark, fat rendering, sausage texture, service style and the way each business fits the town." },
  { type: "paragraph", text: "A longer Central Texas food trip can add Luling, Taylor or another meat-market tradition, but avoid turning the route into five heavy meals in a day. One or two serious stops plus history, architecture or a scenic road produces a better weekend and makes the differences easier to remember." },
  { type: "heading", text: "San Antonio rewards travelers who treat breakfast, lunch and dinner differently" },
  { type: "paragraph", text: "A San Antonio food weekend can begin with breakfast tacos or pan dulce, move through a market or neighborhood lunch and save dinner for a long-established Tex-Mex or Mexican restaurant. Puffy tacos, chili history, bakeries and regional dishes can all appear without forcing every meal into the same category. Pair food with the missions, historic neighborhoods or museums so the city remains more than a dining map." },
  { type: "paragraph", text: "Ask what a restaurant is known for rather than ordering the same dish everywhere. That approach respects the fact that Mexican, Tex-Mex and South Texas traditions overlap without being identical. It also makes the trip less vulnerable to arguments over which label is supposedly correct." },
  { type: "heading", text: "Houston is a neighborhood-planning problem before it is a restaurant-planning problem" },
  { type: "paragraph", text: "Houston's food strength is range: Vietnamese, Nigerian, Indian, Pakistani, Chinese, Mexican, Cajun, barbecue, Gulf Coast and many other traditions operate across a very large metro. The mistake is choosing one restaurant from every list and spending the weekend crossing town. Pick one or two neighborhoods or corridors per day, then choose meals within that geography. The result is more eating and exploring with less time in traffic." },
  { type: "paragraph", text: "A Houston food weekend can also include markets, bakeries, grocery stores and coffee shops that reveal community life beyond a destination restaurant. Leave room for one unplanned recommendation from someone local. In a city this large, the meal you did not research may be the one that best explains the neighborhood." },
  { type: "heading", text: "El Paso and the Rio Grande Valley should not be collapsed into one border-food category" },
  { type: "paragraph", text: "El Paso's Chihuahuan Desert setting and border history create a food culture that differs from San Antonio and the Lower Rio Grande Valley. The Valley has its own mix of ranching, citrus, seafood and family restaurant traditions. Both deserve trips built around place rather than a generic 'Tex-Mex' label. Travelers learn more when they let each region define its own specialties." },
  { type: "paragraph", text: "Pair meals with local history, markets, wildlife or scenic drives. That keeps food connected to the landscape and reduces the tendency to treat border communities as one interchangeable culinary zone. If time is short, choose one region and explore it well rather than trying to compare hundreds of miles in a weekend." },
  { type: "heading", text: "Galveston and the Gulf Coast make seafood meaningful when the waterfront remains part of the trip" },
  { type: "paragraph", text: "A Gulf food weekend works best when seafood is paired with port history, historic districts, birding or waterfront time. The setting explains why the meal belongs there. Weather and season can change outdoor plans, so keep an indoor historical or cultural backup and avoid making one boat trip the only reason the weekend works." },
  { type: "paragraph", text: "Look beyond the most photographed plate. Gulf Coast food traditions can include shrimp, oysters, fish, Cajun-influenced dishes and neighborhood restaurants shaped by working-waterfront communities. Ask what is local or seasonal rather than assuming every seafood menu tells the same story." },
  { type: "heading", text: "Czech and German heritage routes are strongest when baking and sausage are paired with history" },
  { type: "paragraph", text: "West, Fredericksburg, New Braunfels and other Central Texas communities can support food travel rooted in immigration and settlement history. Bakeries, sausage traditions, beer culture and historic architecture become more meaningful when visitors understand why those communities formed where they did. A food stop plus a museum, church, dance hall or historic district creates a richer route than a pastry-only detour." },
  { type: "paragraph", text: "Do not get trapped by terminology arguments. The distinction between a fruit-filled kolache and a sausage-filled klobasnek matters historically, but everyday Texas usage is messy. Taste the food, learn the tradition and let the local context be more important than winning a vocabulary debate." },
  { type: "heading", text: "Use appetite and geography as hard itinerary limits" },
  { type: "paragraph", text: "Three heavy meals in one day rarely improve a food trip. Share portions, use breakfast and bakery stops strategically and build walking or cultural activities between major meals. Also respect metro scale and highway distance. A Houston restaurant, Lockhart barbecue stop and San Antonio dinner do not belong in the same day simply because all three appear on a statewide list." },
  { type: "paragraph", text: "The best Texas food weekend leaves you understanding a region rather than merely remembering a reservation list. Choose one city or corridor, identify the food traditions that belong there, add one non-food anchor and keep enough appetite and time for a local recommendation you did not know about before arriving." },
];

export const texasGatewayBatch9SecondaryEnrichment: Record<string, GatewayBatch9Enrichment> = {
  "best-spring-weekend-trips-in-texas": {
    body: spring,
    sourceName: "Travel Texas — Texas Road Trips",
    sourceUrl: "https://www.traveltexas.com/things-to-do/road-trips/",
    internalLinks: [
      { href: "/article/bluebonnet-photo-etiquette-and-best-practices", label: "Bluebonnet photo etiquette" },
      { href: "/explore/state-parks", label: "Texas state parks" },
      { href: "/events", label: "Texas events" },
    ],
    relatedDestinations: ["enchanted-rock", "caddo-lake", "palo-duro-canyon"],
  },
  "best-fall-weekend-trips-in-texas": {
    body: fall,
    sourceName: "Texas Parks and Wildlife Department — Texas State Parks",
    sourceUrl: "https://tpwd.texas.gov/state-parks/",
    internalLinks: [
      { href: "/texas-state-fair", label: "State Fair of Texas guide" },
      { href: "/events", label: "Texas events" },
      { href: "/explore/road-trips", label: "Texas road trips" },
    ],
    relatedDestinations: ["lost-maples", "palo-duro-canyon", "big-bend-chisos-basin"],
  },
  "best-winter-weekend-trips-in-texas": {
    body: winter,
    sourceName: "Travel Texas — Plan Ahead",
    sourceUrl: "https://www.traveltexas.com/plan-ahead/",
    internalLinks: [
      { href: "/article/big-bend-in-winter", label: "Big Bend in winter" },
      { href: "/explore/outdoors", label: "Texas outdoors" },
      { href: "/browse/cities", label: "Browse Texas cities" },
    ],
    relatedDestinations: ["big-bend-chisos-basin", "palo-duro-canyon", "san-antonio"],
  },
  "best-texas-trips-with-kids-by-age": {
    body: kids,
    sourceName: "Texas Parks and Wildlife Department — Texas State Parks",
    sourceUrl: "https://tpwd.texas.gov/state-parks/",
    internalLinks: [
      { href: "/explore/state-parks", label: "Texas state parks" },
      { href: "/explore/lakes-rivers", label: "Texas lakes and rivers" },
      { href: "/events", label: "Texas events" },
    ],
    relatedDestinations: ["dinosaur-valley", "brazos-bend-state-park", "palo-duro-canyon", "san-antonio"],
  },
  "best-texas-weekend-trips-for-food-lovers": {
    body: food,
    sourceName: "Travel Texas — Eat and Drink",
    sourceUrl: "https://www.traveltexas.com/things-to-do/eat-drink/",
    internalLinks: [
      { href: "/explore/food-bbq", label: "Texas food and barbecue" },
      { href: "/article/texas-food-road-trip-bucket-list", label: "Texas food road-trip bucket list" },
      { href: "/explore/road-trips", label: "Texas road trips" },
    ],
    relatedCollections: ["smoke-and-salt"],
    relatedDestinations: ["lockhart", "san-antonio", "galveston-island", "fredericksburg"],
  },
};
