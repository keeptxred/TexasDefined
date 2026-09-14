import type { Article, ArticleBlock } from "../types";

const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const depthBySlug: Record<string, ArticleBlock[]> = {
  "bluebonnets-near-austin": [
    h("How to time an Austin bluebonnet day"),
    p("Austin-area bloom timing moves with winter cold, late freezes, spring warmth and rainfall. A weekend that was excellent last year can be early or late the next year. Treat statewide bloom forecasts as a starting point, then look for same-week reports from the Wildflower Center, local parks, Highland Lakes communities and the managing authority for any recreation area you plan to enter."),
    p("A useful Austin strategy is to choose a corridor rather than a single field. West toward Marble Falls, Burnet and Llano gives you multiple public stops, historic downtowns and scenic roads. Southwest toward Johnson City and Blanco trades broad lake-country fields for Hill Country roads and town stops. If the flowers disappoint at one location, the day still works."),
    h("Photography without creating a roadside hazard"),
    p("The prettiest patch is not automatically a legal or safe place to stop. Rural roads around Austin can have narrow shoulders, blind curves and fast traffic. Keep the entire vehicle off the travel lane, do not cross fences or cattle guards without permission, and avoid trampling a field simply to make the photograph look denser. For children, pets or portrait sessions, a public park or garden is usually the better choice."),
    list("Check bloom reports within a few days of the trip.", "Build the route around two or three public stops instead of one viral field.", "Carry water and sun protection even on mild spring days.", "Keep dogs leashed where required and away from roadside traffic.", "Have a non-flower stop ready so a weak bloom does not waste the drive."),
    h("What to do when the bloom is weak"),
    p("Spring in Central Texas is broader than bluebonnets. Indian paintbrush, coreopsis, evening primrose and other wildflowers can carry a drive when bluebonnets are sparse. The Lady Bird Johnson Wildflower Center, Highland Lakes towns, local trails and historic districts also make the trip worthwhile without depending on one peak-bloom photograph."),
  ],
  "bluebonnets-near-houston": [
    h("Why Washington County is the safest bet from Houston"),
    p("Houston sits east of the best-known bluebonnet belt, so a dependable day usually starts by accepting a longer drive. Washington County works because it offers many possible roads and stops within one compact region. Brenham, Chappell Hill, Independence and Washington-on-the-Brazos give you several anchors instead of forcing the day to succeed or fail on one roadside field."),
    p("Rainfall can vary sharply between Houston and the Brazos Valley. A wet winter near home does not guarantee the same conditions farther west. Check local visitor reports and current photos before leaving, and remember that social posts often circulate after the field has already changed."),
    h("Make the route work even without peak flowers"),
    p("A strong Houston-to-bluebonnet itinerary pairs flowers with a town or historic site. Downtown Brenham, Washington-on-the-Brazos, Chappell Hill and nearby farm roads can fill a day without turning it into aimless driving. This also reduces the temptation to stop unsafely every time a patch appears beside a highway."),
    h("Roadside and private-property rules"),
    p("Much of the most photogenic land in Washington County is private. An unfenced field is not an invitation, and a highway shoulder is not automatically a safe parking area. Use public pull-offs and designated attractions, keep gates clear, and never park in a way that blocks farm equipment or local traffic."),
    list("Leave Houston early enough to avoid turning the return drive into rush-hour traffic.", "Check Washington County and Brenham-area bloom reports the same week.", "Prefer public sites for family photographs.", "Plan food, history or a downtown stop as part of the route.", "Expect the bloom to move north and west as the season progresses."),
  ],
  "bluebonnets-near-dallas-fort-worth": [
    h("Use Ennis as a system, not a single stop"),
    p("The advantage of Ennis is organization. The mapped Bluebonnet Trails and local monitoring give North Texas visitors a way to follow current conditions rather than guessing which county road might be best. Trail routing can change with the bloom, so use the current official map and reports instead of a route saved from a previous year."),
    p("North Texas often peaks later than Washington County or parts of the Hill Country. That can extend the statewide season, but it also means a warm spring or late cold snap can move expectations by days or weeks. The useful question is not 'Is April the right month?' but 'What are the Ennis trails reporting this week?'"),
    h("Crowds change the experience"),
    p("Peak weekends can turn quiet country roads into slow-moving sightseeing routes. Go early, avoid stopping in travel lanes, and use designated parking where available. If you want portraits rather than a driving tour, choose a public access point where people can get out of the vehicle without stepping into traffic."),
    h("Build a North Texas spring day"),
    p("Downtown Ennis, Czech heritage, local restaurants and festival programming make useful secondary stops. Farther west, North Texas parks and prairie landscapes can add wildflowers even when a particular Ennis field is below expectations. A good route gives you more than one reason to leave Dallas or Fort Worth."),
    list("Check the official Ennis trail report immediately before departure.", "Expect slower driving on popular trail weekends.", "Do not enter private fields without permission.", "Bring water, sunscreen and allergy medication if needed.", "Use current festival dates separately from bloom forecasts; the two do not always peak together."),
  ],
  "bluebonnets-near-san-antonio": [
    h("San Antonio sits between two bloom zones"),
    p("The city can reach both earlier South Texas wildflower country and the higher Hill Country. That makes San Antonio flexible: a warm early spring may favor roads south and southwest, while a later weekend can justify driving north toward Blanco, Johnson City, Fredericksburg and the Highland Lakes. Do not assume one direction wins every year."),
    p("The best route depends on current reports and the kind of day you want. Families usually benefit from public parks, gardens and town stops. Photographers willing to drive longer may prefer a Hill Country loop, but should still plan legal pull-offs and avoid treating ranchland as public scenery."),
    h("Use towns as anchors"),
    p("Poteet, Pleasanton, New Braunfels, Blanco and Johnson City can each serve as a practical anchor depending on the direction of travel. A town gives you parking, food and another activity while you evaluate nearby roads. It also makes the day less dependent on a single field surviving wind, mowing or an unexpected dry spell."),
    h("Heat and traffic arrive before summer"),
    p("Spring afternoons around San Antonio can already be hot, and rural highways can carry fast traffic. Start early, carry drinking water and avoid roadside stops with limited sight distance. When children or pets are involved, the safer public site is almost always worth choosing over the more dramatic shoulder-side patch."),
    list("Check reports from the week you travel.", "Match the route to the current north-south progression of the bloom.", "Stay outside fences and closed gates unless you have permission.", "Avoid walking in tall grass without watching for uneven ground, insects and snakes.", "Pair flowers with a town, park or historic stop so the trip has a backup plan."),
  ],
  "texas-bluebonnet-festivals": [
    h("Festival weekend is not a bloom guarantee"),
    p("Bluebonnet festivals are scheduled months in advance; flowers respond to weather. A festival can land before, during or after the strongest local bloom. That is not a failure of the event. It is a reason to think of the festival as the dependable part of the trip and the flowers as the seasonal bonus."),
    h("Burnet, Ennis and Chappell Hill offer different weekends"),
    p("Burnet works naturally with a Highland Lakes drive and nearby Marble Falls or Llano. Ennis pairs organized trail routes with a North Texas downtown and typically later seasonal timing. Chappell Hill sits inside Washington County, where Brenham, Independence and Washington-on-the-Brazos turn a festival visit into a broader spring road trip."),
    p("Those differences matter when choosing between events. A family focused on carnival-style programming may value a different festival than a photographer who wants miles of driving between public flower stops. Read the current organizer schedule instead of assuming every bluebonnet festival offers the same mix of vendors, music, parades and trails."),
    h("Plan parking and crowds before arrival"),
    p("Small-town street networks can be overwhelmed by peak festival traffic. Check official parking, shuttle and road-closure information before the trip. Arriving near opening time usually makes it easier to park, eat locally and leave time for a scenic drive after the busiest festival hours."),
    list("Verify the current year's festival date with the organizer.", "Check bloom reports separately from the event calendar.", "Use official parking and shuttle information.", "Keep roadside flower stops legal and completely clear of traffic.", "Add a nearby history, food or park stop so the weekend is valuable in any bloom year."),
  ],
  "is-it-illegal-to-pick-bluebonnets-in-texas": [
    h("The myth hides several real rules"),
    p("Texas does not have a special statewide criminal law that makes every act of picking a bluebonnet illegal. That does not mean every flower is available to take. Property ownership, park regulations, protected-resource rules and ordinary traffic laws can make the same act legal in one place and prohibited in another."),
    h("Private land is the clearest boundary"),
    p("A field beside a road may belong to a ranch, farm, business or homeowner even when there is no visible fence. Entering without permission can be trespassing. Picking flowers does not create a special exception, and a popular social-media photo location does not become public through repetition."),
    h("Public land can have its own protections"),
    p("State parks, natural areas, wildlife refuges, city preserves and other public lands commonly restrict removal of plants or disturbance of natural resources. Follow the rules of the managing agency. The fact that a flower species is common statewide does not override a site's resource-protection rules."),
    h("Highway rights-of-way are a safety problem first"),
    p("Even where a roadside flower is not separately protected, stopping can be dangerous or unlawful if the vehicle blocks traffic, sits in a prohibited area or requires people to cross an active roadway. Never assume a patch inside a highway right-of-way is a safe family-photo location."),
    list("Ask permission before entering private property.", "Follow the specific park or preserve rules where you are visiting.", "Keep vehicles fully clear of travel lanes and obey parking restrictions.", "Leave flowers in place when possible so other visitors can enjoy them and plants can set seed.", "Use public gardens, parks and designated trails for portraits rather than risky roadside shoulders."),
    h("The practical Texas rule"),
    p("The simplest guidance is more useful than the old myth: admire bluebonnets where you have a legal right to be, obey the rules of that property, do not create a traffic hazard and leave the display intact. That approach works whether or not a particular blossom is covered by a special statute."),
  ],
  "best-christmas-lights-in-texas": [
    h("Choose the setting, not only the bulb count"),
    p("The strongest Texas light displays are memorable because they belong to a place. San Antonio drapes cypress trees above the River Walk. Hill Country towns use courthouse squares and old commercial streets. Grapevine layers lights across an entire downtown Christmas program. Marshall builds its season around the historic Harrison County courthouse. The setting is what separates a destination from a neighborhood drive-through."),
    h("San Antonio: the River Walk after Thanksgiving"),
    p("The San Antonio River Walk's official calendar says the downtown holiday lights switch on with the Ford Holiday River Parade the day after Thanksgiving and remain on nightly into early January. For 2026, the parade and lighting ceremony are scheduled for November 27, and the River Walk advertises roughly 200,000 lights. Walking the public River Walk to see the lights is free; cruises, restaurant packages and most reserved parade seating cost extra."),
    h("Grapevine: make Main Street the base"),
    p("Grapevine markets itself as the Christmas Capital of Texas and announced more than 1,400 events across 40 days for the 2026 season, beginning with the Carol of Lights on November 23. That does not mean every attraction is free. Use Historic Main Street and its public decorations as the base, then decide whether a train ride, ice rink, show or other ticketed attraction is worth adding."),
    h("Hill Country and East Texas alternatives"),
    p("Johnson City is known for an unusually concentrated Hill Country display, while Marshall's Wonderland of Lights uses the courthouse square as its visual center. Dates, operating nights and paid add-ons change by season, so verify the current tourism-office schedule before building a hotel reservation around a display."),
    list("Visit on a weeknight when possible for easier parking and walking.", "Separate free public displays from ticketed rides, skating, cruises and reserved seating.", "Check road closures and shuttle plans before arriving at popular downtowns.", "Pair lights with a town worth visiting before dark.", "Confirm current-year dates; holiday pages age quickly."),
  ],
  "texas-christmas-train-rides": [
    h("Two Texas rail experiences lead the list"),
    p("The Texas State Railroad in East Texas and Grapevine Vintage Railroad in North Texas are the two names most families encounter first. Both operate on real railroad infrastructure and build seasonal programming around established depots, which gives the day more sense of place than a temporary attraction."),
    h("Texas State Railroad: plan around Palestine"),
    p("The Texas State Railroad's licensed Polar Express experience is one of the state's highest-demand holiday train products. Families should verify the current departure station, class of service, age policy and cancellation terms before buying. Popular dates can sell out well before December, especially weekend evening departures."),
    h("Grapevine: the train is one part of a larger Christmas trip"),
    p("Grapevine's North Pole Express operates within the city's larger Christmas Capital of Texas season. For 2026, the published schedule includes departures beginning November 27. The advantage is that families can combine the train with Main Street decorations, the Christmas market and other downtown activity rather than driving home immediately after the ride."),
    h("Tickets are only part of the planning"),
    p("Holiday trains create a fixed departure time, so parking and arrival buffers matter. Read the operator's check-in instructions, arrive earlier than you would for an ordinary attraction, and confirm whether strollers, wheelchairs, outside food or car seats create special logistics. Weather can also affect what children should wear while waiting outdoors even if the railcar is enclosed."),
    list("Buy from the railroad or official event seller, not an unfamiliar resale link.", "Confirm the exact station and boarding time.", "Read refund and exchange rules before purchasing a large family block.", "Plan a meal or downtown activity around the departure instead of cutting the schedule too close.", "Recheck the operator's notice page on the day of travel."),
  ],
  "free-christmas-events-in-texas": [
    h("Start with a free anchor, then decide what deserves a ticket"),
    p("A low-cost Christmas trip works best when the main atmosphere does not depend on admission. Public river walks, courthouse squares, decorated downtowns, tree lightings and parades can supply most of the evening. Paid extras—train rides, skating, cruises, premium parade seats or indoor attractions—then become optional rather than the price of having anything to do."),
    h("San Antonio River Walk: a verified free 2026 option"),
    p("The San Antonio River Walk is one of the clearest statewide examples because the managing organization explicitly says visiting the holiday lights is free. In 2026, the lights are scheduled to switch on with the Ford Holiday River Parade on November 27 and remain on nightly into early January. The downtown display uses about 200,000 lights in the cypress trees, and the River Walk itself is a public park open around the clock."),
    p("The parade is different from the nightly light display. Most reserved parade viewing is ticketed, but the 2026 organizer also lists a first-come, first-served free viewing area between Pecan Street and Richmond Avenue. Later in December, official River Walk artisan shows are listed as free and open to the public. Food, parking, cruises and restaurant packages can still add cost, so 'free event' does not mean a zero-dollar evening."),
    h("Grapevine: use the public downtown before buying add-ons"),
    p("Grapevine's 2026 Christmas season begins November 23 and spans more than 1,400 events over 40 days. Many signature attractions are ticketed, but visitors can still use Historic Main Street, public decorations and the downtown atmosphere as the base of a lower-cost visit. The city also says its complimentary Christmas Capital shuttle returns November 27, 2026, which can reduce the parking problem on busy dates."),
    h("Courthouse squares and city traditions"),
    p("Across Texas, courthouse towns and municipal downtowns hold tree lightings, parades, public concerts and walk-through displays. Marshall, Johnson City, Georgetown and many smaller communities use public streets and squares as the stage. The exact free programming changes each year, so confirm the city, chamber or tourism-office calendar before driving and never assume a prior year's free attraction has the same schedule."),
    h("What can still cost money on a 'free' holiday night"),
    list("Downtown or event parking.", "Food, hot chocolate and restaurant reservations.", "Ice skating, carnival rides, trains or river cruises.", "Reserved parade seating or VIP viewing.", "Professional photos, souvenirs and vendor purchases."),
    h("A practical free-first itinerary"),
    p("Arrive before sunset, park once, walk the downtown or river corridor while businesses are still open, eat before peak dinner demand if you are buying a meal, then stay for the lights after dark. Families with young children should identify restrooms and a warm-up stop before the evening gets crowded. The best free event is the one that still works after you account for parking, weather and the distance everyone has to walk."),
    p("Because holiday schedules change every season, this guide should be used to choose the kind of destination, not as a substitute for the current organizer calendar. Verify dates and any admission language before leaving home. That small check is what keeps a free Christmas outing from turning into an unexpected ticket purchase at the gate."),
  ],
  "east-texas-fall-colors": [
    h("East Texas usually runs later than the Hill Country"),
    p("The Piney Woods often develops its strongest color after the state's better-known Hill Country maple season. Cold fronts, rainfall and tree stress all affect the display, so late October can still look mostly green while November produces stronger hardwood color. Follow current park updates instead of booking around a fixed annual peak date."),
    h("Caddo Lake is about cypress as much as hardwoods"),
    p("At Caddo Lake, fall is not a conventional hill-and-maple scene. Bald cypress can turn rusty orange and bronze over dark water while evergreen vegetation stays in the frame. The effect is strongest from water level, making a legal guided paddle or launch-based outing more revealing than a quick overlook."),
    h("Daingerfield, Lake Bob Sandlin and Tyler give you backups"),
    p("Northeast Texas is useful because several state parks sit within a manageable driving region. Daingerfield combines a compact lake with mixed forest, Lake Bob Sandlin adds broad shoreline woods, and Tyler State Park gives visitors another pine-and-hardwood setting. If one park's color is early or late, the trip does not have to fail."),
    h("Weather changes the photography"),
    p("Cloudy weather can deepen saturated leaf color, while calm mornings help with lake reflections. After heavy rain, trails may be muddy and low areas wet. Check park alerts, daylight hours and reservation requirements before driving, especially on the first strong-color weekends when demand rises."),
    list("Use current Texas Parks and Wildlife updates where available.", "Build the trip around two nearby parks rather than one foliage report.", "Bring footwear for wet trails and leaf-covered roots.", "Stay through early or late light for better reflections.", "Do not treat private timberland as public access simply because a road passes through it."),
  ],
  "hill-country-fall-colors": [
    h("The Hill Country fall season follows water and elevation"),
    p("Central Texas does not turn color evenly. Cypress along the Frio and Guadalupe can change at a different pace from upland oaks, and the famous Uvalde bigtooth maples at Lost Maples respond to their own canyon conditions. A statewide fall forecast is less useful than current information from the exact river corridor or park you plan to visit."),
    h("Lost Maples requires reservation strategy"),
    p("Lost Maples State Natural Area earns the attention because its concentrated maple habitat is unusual in Texas. It also has limited capacity and heavy demand during peak foliage. Reserve entry before making lodging plans, then check the park's current foliage updates. Arriving without a reservation on a peak weekend is a poor way to test whether the leaves are good."),
    h("Garner and the Frio offer a broader landscape"),
    p("Garner State Park combines cypress-lined water, limestone hills and broad river views. The color may be less concentrated than a maple canyon, but the setting gives photographers reflections and layered terrain. It also pairs naturally with nearby scenic roads, making the area useful when Lost Maples is full."),
    h("The Guadalupe corridor is the easier Central Texas option"),
    p("Guadalupe River State Park and river country around Canyon Lake and New Braunfels can provide cypress color without the longer drive to the western Hill Country. Conditions vary substantially by rainfall and temperature, so use this corridor as a flexible option rather than a guaranteed substitute."),
    list("Reserve high-demand parks before driving.", "Check current foliage and river conditions.", "Expect peak timing to shift from year to year.", "Plan for shorter daylight and cooler evenings even when afternoons are warm.", "Use river corridors, not a single famous tree, as the basis of the route."),
  ],
  "best-texas-state-parks-for-fall-colors": [
    h("Pick the park by the kind of fall color you want"),
    p("Texas fall is not one statewide leaf show. Lost Maples is about rare maples in canyon country. Garner and Guadalupe River are about cypress and water. East Texas parks mix hardwood color with evergreen pine. Davis Mountains and other western parks can surprise visitors with high-elevation pockets rather than continuous forest."),
    h("For concentrated color: Lost Maples"),
    p("Lost Maples State Natural Area is the obvious choice when the goal is a dedicated foliage hike. Its weakness is popularity: capacity is limited and the best weekends can fill early. Treat a reservation as part of the trip, not something to check after booking lodging."),
    h("For river color: Garner and Guadalupe River"),
    p("Garner State Park's Frio River and Guadalupe River State Park both use water to amplify the season. Cypress reflections can matter as much as hillside color, and both parks can remain worthwhile even when the leaf display is not at a dramatic peak."),
    h("For a forest feel: Daingerfield, Tyler and Lake Bob Sandlin"),
    p("East Texas offers the closest Texas version of a broad woodland fall. Pines provide a green background while sweetgum, oak, hickory and other hardwoods add color. These parks often peak later than Lost Maples, which can extend the season for travelers willing to move east."),
    h("How to choose the weekend"),
    p("Use park-specific updates, weather history and current photographs rather than an evergreen list of peak dates. Cold nights can accelerate change, drought can dull it, wind can strip leaves quickly, and rain can improve or complicate a hiking weekend. The same park can look very different seven days apart."),
    list("Reserve popular parks early but keep the route flexible.", "Check trail and weather alerts the day before travel.", "Pair two nearby parks when possible.", "Bring layers for large morning-to-afternoon temperature swings.", "Treat published peak dates as historical guidance, not promises."),
  ],
};

const wordsInBlock = (block: ArticleBlock): number => {
  if (block.type === "list") return block.items.join(" ").match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;
  if ("text" in block) return block.text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;
  return 0;
};

export const seasonalIntentDepthSlugs = Object.freeze(Object.keys(depthBySlug));

export function enrichSeasonalIntentArticle(article: Article): Article {
  const additions = depthBySlug[article.slug];
  if (!additions) return article;
  const body = [...article.body, ...additions];
  const wordCount = body.reduce((total, block) => total + wordsInBlock(block), 0);
  return {
    ...article,
    body,
    readingMinutes: Math.max(3, Math.ceil(wordCount / 200)),
  };
}
