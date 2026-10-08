import type { Article, ArticleBlock } from "../types";

const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

// These are body fragments, not standalone Articles. The canonical Article owner
// remains seasonal-intent-articles.ts; this module only keeps the long-form copy
// maintainable without creating a second resolver or competing canonical source.
export const seasonalIntentDepthBlocks: Record<string, ArticleBlock[]> = {
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
  "east-texas-fall-colors": [
    h("Quick answer: when and where to go"),
    p("For an East Texas foliage trip, use mid-November through early December as a broad planning window, not a prediction of peak color. Individual trees and parks may change earlier or later, and dry weather, warm autumns, rain and wind can shorten the show. Start with Daingerfield State Park for a compact lake-and-forest walk, Caddo Lake for bronze bald cypress and swamp scenery, Tyler State Park for accessible pine-and-hardwood trails, or Lake Bob Sandlin for lakeside color. Before leaving, check the specific park's alerts, forecast and recent images; this page does not claim to report live foliage conditions."),
    h("The best East Texas fall-color stops at a glance"),
    list(
      "Daingerfield State Park — best first stop for a compact lake surrounded by colorful mixed woodland; check the park's open trails and day-use availability.",
      "Caddo Lake State Park — distinctive copper and bronze bald-cypress setting, especially from permitted water access; plan around weather and navigation safety.",
      "Lake Bob Sandlin State Park — shoreline and woodland color with lake reflections, a useful companion to Daingerfield.",
      "Tyler State Park — a practical base for a walking and camping weekend amid pines and deciduous hardwoods.",
      "Cooper Lake State Park — another northeast-Texas public-park alternative if your preferred stop has limited availability.",
      "Martin Creek Lake State Park — a further East Texas option for a quieter forest-and-water visit; confirm that conditions and the landscape fit your foliage expectations."
    ),
    h("How to interpret a fall-color calendar"),
    p("Late October: treat foliage as a scouting opportunity, not an assured peak; many Piney Woods trees may remain green. Early to mid-November: start checking recent photographs and official park updates, as some mixed hardwoods may be turning. Mid- to late November: often the most useful general window to consider northeast-Texas trips. Late November to early December: some trees can retain color, but a cold front or strong wind may strip leaves quickly. These are approximate regional planning periods, not verified dates for 2026 or forecasts for individual parks."),
    h("Daingerfield State Park: the easy lake-and-forest outing"),
    p("Daingerfield works well for travelers who want autumn color without spending all day in a car or navigating remote timberland. The wooded shores of Little Pine Lake bring evergreen pines and color-changing hardwoods into the same frame. Start at designated public lakeshore areas and choose a park trail appropriate to your group. Walk slowly where leaves cover roots and uneven ground; a shoreline reflection photo may be better than a rushed long hike."),
    p("Before traveling, consult the official park page for operating alerts, trails, fees, day-use reservations and campsite availability: https://tpwd.texas.gov/state-parks/daingerfield . Do not assume a particular trail is open simply because the park appears in a seasonal guide."),
    h("Caddo Lake State Park: bald cypress rather than mountain maples"),
    p("Caddo Lake's signature autumn look comes from bald cypress, a deciduous conifer that turns bronze or russet before shedding its needles. Moss-draped trunks, sheltered water and changing light create a different experience from a red-maple forest. The state park near Karnack provides a public starting point, while other locations around the wider lake have different owners, launches and access rules. Uncertain is the name of a nearby Texas community, not a foliage-condition rating."),
    p("A shore-based visit can be rewarding, but the lake's branching channels often reward a properly planned guided boating or paddling outing. Do not enter unfamiliar channels without a route, suitable flotation, weather awareness and a safe return plan. Respect private docks and shorelines. Check official access and alerts at https://tpwd.texas.gov/state-parks/caddo-lake and do not confuse a tour operator's availability with state-park access."),
    h("Lake Bob Sandlin State Park: a second lakeside option"),
    p("Lake Bob Sandlin pairs wooded trails and accessible shoreline with broad views over water. That makes it useful when the light is soft and breezes are calm enough for reflections. As at Daingerfield, the exact color depends on the mix of trees in the section you visit; a wide lake photograph alone does not prove the forest is at peak."),
    p("Use the official park page, https://tpwd.texas.gov/state-parks/lake-bob-sandlin , for current trails, parking, closures and reservations. Visitors combining parks should allow time for actual walking and daylight photography rather than checking off several entrances."),
    h("Tyler State Park: a flexible weekend base"),
    p("Tyler State Park is a strong option for travelers staying near Tyler because it combines forest, lake, campgrounds and multiple ways to explore without relying on one scenic overlook. Mixed hardwoods can produce pockets of color within an otherwise green pine landscape. Choose a shorter loop if the goal is leisurely foliage photography; choose longer trails for a hiking-focused trip."),
    p("Confirm specific trail conditions and day-use entry with https://tpwd.texas.gov/state-parks/tyler . A visit to Tyler should be planned around current park conditions, not a promise that every wooded road in the area will have bright color."),
    h("Two worthwhile backup parks"),
    p("Cooper Lake State Park and Martin Creek Lake State Park broaden the public-access options, especially if lodging, weather or entry availability rules out your original plan. They are alternatives rather than guarantees of superior color. Compare recent park photographs and official updates before adding substantial driving time."),
    p("Check https://tpwd.texas.gov/state-parks/cooper-lake and https://tpwd.texas.gov/state-parks/martin-creek-lake for current visitor information. When color is weak, a lakeside walk, birding stop or picnic can still make the outing worthwhile."),
    h("Suggested one-day route: Daingerfield and Lake Bob Sandlin"),
    p("For a northeast-Texas day, choose Daingerfield as your main morning walk, then continue to Lake Bob Sandlin for a slower afternoon shoreline visit if park access and daylight allow. This is a flexible two-stop outline, not an optimized or timed navigation route. Verify both parks' reservations and driving directions before departure. Spending more time at one park often gives better photographs than racing between several."),
    h("Suggested weekend: Tyler with a Caddo Lake alternative"),
    p("For an easy hiking weekend, stay in or near Tyler and dedicate one day to Tyler State Park, with the next day reserved for another public woodland destination according to current color reports. For a more distinctive wetland-focused trip, stay near Caddo Lake and plan one park visit plus a guided water outing, weather permitting. Because these are different geographic clusters, avoid presenting all four headline parks as an effortless single-day circuit."),
    h("How to find color that is actually happening this week"),
    list(
      "Check the Texas Parks and Wildlife fall-for-parks guide and each park's current alerts: https://tpwd.texas.gov/state-parks/parks/things-to-do/fall-for-parks .",
      "Look for dated, location-specific photographs from an official park account or a clearly identified recent visitor, not an undated promotional image.",
      "Compare the past week's cold fronts, rain and wind to anticipate leaf drop; severe weather and closures take priority over scenery.",
      "Reserve day passes or camping where required, and verify operating hours and any watercraft or trail restrictions before you drive.",
      "Keep a nearby backup stop and be prepared for green woods or brown leaves instead of peak orange and red."
    ),
    h("Which trees create the color?"),
    p("Sweetgum can show red, purple and yellow; oaks and hickories contribute yellow, tan and russet; bald cypress can turn coppery brown above water. Pines remain largely green. Species mix, soil moisture and seasonal stress vary even within a single park, so East Texas foliage is usually a patchwork rather than a uniform canopy."),
    h("Photography, families and accessibility"),
    p("Calm mornings improve chances of lake reflections; overcast light can reduce harsh contrast on colorful leaves. Wear shoes for damp ground and hidden roots, bring insect protection and check sunset before starting a long trail. For families or visitors with mobility limitations, inspect the park's published trail descriptions and accessibility details first rather than assuming a lakeside trail is paved or step-free. Respect wildlife and leave leaves and branches in place."),
    h("Frequently asked questions"),
    h("Does East Texas have fall colors?"),
    p("Yes. Deciduous hardwoods and bald cypress change color among evergreen pines. The mix differs by park and by year."),
    h("Is October too early?"),
    p("Not always, but late October is less reliable than a flexible November plan for much of East Texas. Check recent park-specific evidence before committing to a long drive."),
    h("Where can I see fall foliage without a boat?"),
    p("Daingerfield, Tyler and Lake Bob Sandlin state parks have land-based public recreation opportunities; confirm which paths and viewing areas are available before visiting. Caddo Lake also has park access on land, though its cypress channels are particularly distinctive from the water."),
    h("Are the colors at peak right now?"),
    p("This guide intentionally does not display an unverified live peak-color status. The most reliable answer comes from a recent dated local report and the park's alerts. A generalized seasonal window cannot establish today's conditions."),
    h("Sources and verification"),
    p("Primary reference: Texas Parks and Wildlife Department, Fall for Parks (https://tpwd.texas.gov/state-parks/parks/things-to-do/fall-for-parks), plus the official individual state-park pages linked in the destination sections above. Those pages should be checked again immediately before travel. Historical seasonal guidance here is not a live 2026 field report; no current peak date, trail opening, ticket availability or entry price is independently certified by this article."),
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

const wordCount = (blocks: ArticleBlock[]) => blocks.reduce((total, block) => {
  const text = block.type === "list" ? block.items.join(" ") : "text" in block ? block.text : "";
  return total + (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0);
}, 0);

export function applySeasonalIntentDepth(article: Article): Article {
  const additions = seasonalIntentDepthBlocks[article.slug];
  if (!additions) return article;
  const body = [...article.body, ...additions];
  return {
    ...article,
    body,
    readingMinutes: Math.max(3, Math.ceil(wordCount(body) / 200)),
  };
}
