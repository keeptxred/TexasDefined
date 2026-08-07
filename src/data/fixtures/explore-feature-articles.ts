import bigBend from "@/assets/big-bend.jpg";
import blueHole from "@/assets/blue-hole.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import enchantedRock from "@/assets/enchanted-rock.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import wildlife from "@/assets/wildlife.jpg";
import bbqBrisket from "@/assets/bbq-brisket.jpg";

import type { Article, ArticleBlock, CategorySlug, ImageRef, TexasRegion } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const quote = (text: string): ArticleBlock => ({ type: "quote", text });

const makeArticle = (record: {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: CategorySlug;
  region?: TexasRegion;
  hero: ImageRef;
  publishedAt: string;
  tags: string[];
  relatedDestinations?: string[];
  body: ArticleBlock[];
}): Article => ({
  brandId: "texasdefined",
  authorId: "a-hollis",
  readingMinutes: 1,
  relatedCollections: [],
  relatedDestinations: record.relatedDestinations ?? [],
  ...record,
});

export const exploreFeatureArticles: Article[] = [
  makeArticle({
    id: "explore-feature-major-springs",
    slug: "texas-major-springs-clear-water-guide",
    title: "Where Texas Comes Up From the Ground",
    dek: "A field guide to the springs that feed swimming holes, rivers and whole communities — and why the clearest water in Texas is also some of the most fragile.",
    category: "major-springs",
    region: "hill-country",
    hero: image(blueHole, "Clear spring-fed water beneath bald cypress trees in the Texas Hill Country"),
    publishedAt: "2026-08-07",
    tags: ["springs", "hill country", "swimming", "aquifers"],
    relatedDestinations: ["blue-hole-wimberley"],
    body: [
      p("Texas has a habit of hiding its best water underground. Drive through enough limestone country in August and the landscape looks sun-bleached, brittle and nearly empty of moisture. Then a creek bends under a stand of bald cypress and the water turns clear enough to count stones on the bottom. That abrupt change is the signature of a spring: groundwater reaching daylight."),
      p("The famous spring-fed places are easy to treat as isolated swimming holes, but they are really windows into much larger systems. Rain falls miles away, works through fractures and porous rock, collects in aquifers and eventually reappears at the surface. A pool in San Marcos, a swimming hole in Wimberley and a river reach west of Austin can all be expressions of groundwater that began somewhere else entirely."),
      h("The springs that shape a trip"),
      p("Central Texas has several clusters worth understanding before you plan around them. San Marcos Springs rise at the headwaters of the San Marcos River and support one of the most ecologically unusual spring systems in the state. Comal Springs in New Braunfels feed the short, clear Comal River before it joins the Guadalupe. Barton Springs in Austin emerges along the Balcones Fault Zone and has anchored swimming culture there for generations. Farther west, spring-fed reaches of the Frio, Nueces and Devils rivers create startling ribbons of clear water through dry country."),
      p("Wimberley offers perhaps the easiest introduction to the Hill Country spring landscape. Blue Hole sits on Cypress Creek beneath huge trees, while nearby Jacob's Well marks an artesian spring and cave system that has become a symbol of both the beauty and vulnerability of groundwater. Swimming access at spring-fed sites can change with drought and conservation conditions, so current rules matter more than an old travel article."),
      h("Why the water feels different"),
      p("Spring water tends to emerge at a relatively stable temperature compared with sun-warmed surface water. That is why a July plunge can feel shockingly cold even when the parking lot is baking. The clarity comes from groundwater moving through rock rather than carrying the same load of suspended sediment that a storm-fed creek might. But clear does not mean invulnerable. Aquifers can respond to drought, pumping and contamination, and spring flow can fall dramatically when recharge is poor."),
      quote("A Texas spring looks permanent right up until the year it reminds you that it is not."),
      h("How to visit without loving a spring to death"),
      list(
        "Check the managing authority before you drive. Reservations, swimming closures and drought restrictions can change faster than guidebooks.",
        "Use established access points. Spring banks and aquatic vegetation are part of the system, not extra shoreline for a shortcut.",
        "Skip soaps, shampoos and anything else that belongs in a drain rather than a creek.",
        "Treat private-property boundaries seriously. Many spring runs cross private land even when the water itself looks inviting.",
        "If a site limits capacity, consider that a feature. The best spring day is one where the water still feels like the reason you came."
      ),
      h("The best season is not always midsummer"),
      p("Late spring and early summer get the attention because swimming is the obvious draw, but shoulder seasons can be better for actually seeing a spring system. March and April bring cooler hiking weather and stronger vegetation around many waterways. September and October can offer warm afternoons without the full crush of summer visitors. Drought changes everything, so recent flow conditions should outrank any generic seasonal advice."),
      p("The larger lesson is that spring country is not a collection of blue dots on a map. It is a connected groundwater landscape. Once you see it that way, the Hill Country makes more sense: the limestone, the cypress, the sudden clear pools and the fierce local arguments over pumping are all parts of the same story."),
    ],
  }),
  makeArticle({
    id: "explore-feature-state-parks",
    slug: "texas-state-parks-first-timers-guide",
    title: "The Texas State Park You Should Start With",
    dek: "There is no single best park. There is a best first park for the kind of Texas you want to understand — canyon, coast, granite, forest or river.",
    category: "state-parks",
    region: "hill-country",
    hero: image(enchantedRock, "Pink granite dome at Enchanted Rock State Natural Area beneath a wide Texas sky"),
    publishedAt: "2026-08-07",
    tags: ["state parks", "camping", "hiking", "weekend"],
    relatedDestinations: ["enchanted-rock", "palo-duro-canyon"],
    body: [
      p("Texas state parks are easiest to understand as a sampler of the state rather than a ranking. The system can put you on a granite dome before breakfast, under East Texas pines by lunch on another weekend, and at the bottom of a red-rock canyon the next. Picking a first park is less about finding the universally best one than deciding which Texas landscape you want to meet first."),
      h("For the classic Hill Country introduction"),
      p("Enchanted Rock is the cleanest answer. The pink granite dome rises abruptly north of Fredericksburg and turns a relatively short outing into a genuine summit experience. The exposed rock makes weather matter: summer heat can be severe, thunderstorms change the character of the dome quickly, and busy weekends reward advance planning. Go early, carry more water than the distance seems to justify and spend time away from the main summit route if you want quiet."),
      h("For the biggest visual surprise"),
      p("Palo Duro Canyon is difficult to beat. The approach across the Panhandle trains your eye on flat horizon, then the road drops through layers of red, orange and white rock. Hiking on the canyon floor feels different from standing at the rim, but temperature matters more there than many first-time visitors expect. A mild morning above the canyon can become a punishing afternoon below it."),
      h("For water instead of rock"),
      p("Look toward parks and natural areas along spring-fed rivers and reservoirs. Garner State Park is famous for the Frio River and summer traditions, while other parks offer quieter paddling, fishing and shoreline camping. Water levels and swimming conditions can change by season and drought, so the useful question is not merely whether a park has water, but what the water is doing right now."),
      h("For East Texas shade"),
      p("The Piney Woods state parks feel almost like a different state. Tall pines, darker soils, wetlands and hardwood bottoms replace the limestone and open scrub many travelers associate with Texas. These parks are especially good for people who think a Texas park must involve heat and exposed rock. In the right season, a shaded forest trail is the better argument."),
      quote("The state park system makes more sense when you stop asking which park is best and start asking which Texas you have not seen yet."),
      h("The reservation habit that saves a weekend"),
      list(
        "Reserve popular parks before building the rest of the trip around them, especially on spring and fall weekends.",
        "Read the specific park alerts, not just the general park description.",
        "Check trail closures, burn bans, river conditions and gate hours before leaving home.",
        "Carry offline directions where cell service is unreliable.",
        "In summer, plan mileage around heat rather than ambition."
      ),
      p("A first state-park trip should leave you wanting a second one, not proving something. Pick a landscape, give it most of a day, and let the park teach you how much Texas changes between regions."),
    ],
  }),
  makeArticle({
    id: "explore-feature-national-parks",
    slug: "texas-national-parks-big-bend-guadalupe-guide",
    title: "Two National Parks, Two Completely Different Texases",
    dek: "Big Bend and Guadalupe Mountains are both desert parks, but they ask different things of a traveler. Here is how to choose between them — or plan for both.",
    category: "national-parks",
    region: "big-bend",
    hero: image(bigBend, "Chisos Mountains rising from the desert in Big Bend National Park"),
    publishedAt: "2026-08-07",
    tags: ["national parks", "big bend", "guadalupe mountains", "west texas"],
    body: [
      p("Texas has two national parks that people routinely bundle together under the phrase West Texas, even though they deliver very different trips. Big Bend is a huge border landscape of river canyons, desert roads and the Chisos Mountains. Guadalupe Mountains is steeper, more concentrated and dominated by hiking into high country above the Chihuahuan Desert. The distance between them is large enough that treating them as a quick two-stop weekend is usually a planning mistake."),
      h("Choose Big Bend if you want range"),
      p("Big Bend rewards travelers who want to move through several landscapes in one park. You can watch sunrise in the desert, spend midday near the Rio Grande and finish in cooler mountain air. The scale is the central fact: drives inside the park take real time, fuel planning matters and a point that looks nearby on a map may still be an hour away. The best Big Bend itineraries are intentionally incomplete."),
      p("First-time visitors often build around the Chisos Basin, Santa Elena Canyon and one of the Rio Grande corridors. That is enough. Trying to add every scenic road and trail usually turns the trip into windshield time. Give the park at least two full days if you can, and three makes the experience much more forgiving."),
      h("Choose Guadalupe Mountains if you want the hike"),
      p("Guadalupe Mountains National Park is the stronger choice when the trip is organized around walking. Guadalupe Peak, the highest point in Texas, is the obvious headline, but the park also protects canyons, springs and high-elevation woodland that feel disconnected from the surrounding desert. Distances can be shorter than Big Bend, yet the terrain makes the days more physically demanding."),
      p("Wind is part of the park. Exposed routes can become unpleasant or unsafe in strong conditions, and weather at elevation can differ sharply from what the highway suggests. A hiking plan should have an alternate route rather than a single must-do trail."),
      h("Can you do both?"),
      p("Yes, but the drive between the parks is not a transfer you hide between breakfast and dinner. Treat it as a travel day and use the route to reset expectations. Big Bend is about breadth and remoteness; Guadalupe is about vertical relief and concentrated effort. Seeing both on one trip works best when you have enough days to let each keep its own personality."),
      list(
        "Carry more water than you think you need, especially outside winter.",
        "Download maps and reservations before losing service.",
        "Do not build a desert itinerary around summer midday hiking.",
        "Fuel whenever the opportunity is convenient rather than waiting for the tank to become the problem.",
        "Leave night sky time unscheduled. West Texas after dark is part of the park experience."
      ),
      quote("The mistake is thinking remoteness is an inconvenience to work around. In both parks, remoteness is the thing you came for."),
      p("If this is your first national-park trip in Texas, pick one and stay longer. Big Bend is the better introduction to the scale of far West Texas. Guadalupe Mountains is the better introduction to how mountainous the state can become when the plains finally break upward."),
    ],
  }),
  makeArticle({
    id: "explore-feature-caverns",
    slug: "texas-caverns-caves-first-timers-guide",
    title: "Texas Underground",
    dek: "The state’s limestone hides rooms, rivers and formations you would never guess were beneath the highway. A first-timer’s guide to seeing caves without turning them into a checklist.",
    category: "caverns",
    region: "hill-country",
    hero: image(enchantedRock, "Texas Hill Country limestone landscape above a network of caves and caverns"),
    publishedAt: "2026-08-07",
    tags: ["caverns", "caves", "hill country", "geology"],
    body: [
      p("Much of Central Texas looks solid from the road: limestone hills, cedar, thin soil and exposed ledges. Underground, the same rock can be hollowed into passages, chambers and drainage systems built by water over immense spans of time. That contrast is what makes Texas cave country interesting. The surface tells you almost nothing about the space beneath it."),
      h("Start with a developed cavern"),
      p("For a first visit, a commercial or publicly managed show cave is the right introduction. Developed caverns provide marked routes, lighting, guides and controlled access while still putting you close to formations that took thousands of years to grow. Natural Bridge Caverns near San Antonio is one of the best-known examples, while Inner Space Cavern near Georgetown, Longhorn Cavern State Park and Caverns of Sonora each show a different version of Texas karst geology."),
      p("Do not expect every cave to look the same. Some are broad and theatrical, others narrow and dry, and some are more interesting for geology or human history than for giant formations. Longhorn Cavern, for example, carries a very different visual character from heavily decorated rooms farther west."),
      h("The temperature trick"),
      p("Caves maintain relatively stable temperatures compared with the surface, which makes a summer visit appealing but can also fool people into dressing for the parking lot. Humidity, wet floors and long periods underground make light layers and shoes with real traction more useful than sandals chosen for a 100-degree afternoon."),
      h("Why touching matters"),
      p("Formations grow from mineral-laden water depositing tiny amounts of material. Oils and dirt from hands can discolor surfaces or interfere with continued growth. The no-touch rule is not theatrical museum behavior; it is basic cave preservation. The same goes for staying on the route. Cave floors and pools can contain features that are easy to damage and impossible to replace on a human timeline."),
      list(
        "Reserve specialty tours well ahead if you want crawling, rappelling or less-developed passages.",
        "Ask about stairs and mobility requirements before buying tickets; cave routes can be more strenuous than their distance suggests.",
        "Leave food, gum and loose gear behind unless the operator specifically permits them.",
        "Never enter an undeveloped cave on private land without permission, expertise and appropriate equipment.",
        "Treat bats as wildlife, not props. Seasonal closures may protect colonies during sensitive periods."
      ),
      quote("A cave is one of the few Texas landscapes where the best view begins by going the wrong direction — down."),
      h("Make the cave the center of the day"),
      p("The best cave trip is not three caverns in one afternoon. Pick one, take the longer tour if your schedule and mobility allow it, then spend the rest of the day above ground nearby. Cave country overlaps some of the best small towns, river corridors and limestone scenery in the state. Seeing both levels of the landscape makes each one more understandable."),
    ],
  }),
  makeArticle({
    id: "explore-feature-beaches-coast",
    slug: "texas-coast-beaches-guide",
    title: "How to Pick the Right Texas Beach",
    dek: "The Texas coast is not one beach repeated for 367 miles. Barrier islands, fishing towns and bays each reward a different kind of weekend.",
    category: "beaches-coast",
    region: "gulf-coast",
    hero: image(roadTrip, "Open road leading toward the Texas Gulf Coast"),
    publishedAt: "2026-08-07",
    tags: ["gulf coast", "beaches", "barrier islands", "weekend"],
    body: [
      p("The mistake people make with the Texas coast is talking about it as one destination. Galveston, Surfside, Port Aransas, Mustang Island, Padre Island and South Padre all face the same Gulf, but they produce different trips. Some are built for a quick city escape, some for fishing and beach driving, and some for the kind of long horizon where the road finally runs out."),
      h("For the easiest weekend from a major city"),
      p("Galveston is the practical answer for Houston. The island combines beach time with historic neighborhoods, restaurants, museums and enough indoor options to rescue a stormy afternoon. The water is not Caribbean blue, and that is not a defect unique to Galveston; sediment carried by Gulf currents often gives the upper Texas coast its familiar brown-green color."),
      h("For a slower island town"),
      p("Port Aransas and Mustang Island are better when the beach is the organizing principle of the trip. Fishing, golf carts, beach access and casual restaurants shape the rhythm. Busy summer weekends can feel crowded, but mornings and shoulder seasons show why people return. If your ideal day involves coffee, sand, seafood and no major attraction schedule, this is the stronger fit."),
      h("For undeveloped shoreline"),
      p("Padre Island National Seashore is the coast stripped back to dune, wind, surf and long distance. It is one of the best places in Texas to understand a barrier island as a living landscape rather than a strip of beachfront development. Driving conditions change, soft sand can stop an unprepared vehicle, and tides and weather deserve respect. The remoteness becomes more noticeable the farther you travel from pavement."),
      h("For the resort version"),
      p("South Padre Island delivers the most conventional beach-vacation infrastructure in Texas: taller hotels, broader tourism services, nightlife and easy access to the Lower Laguna Madre. It is farther for most Texans, but the water can be clearer than farther north and the island works well for travelers who want beach time without giving up restaurants and organized activities."),
      list(
        "Check rip-current and surf conditions before entering the water.",
        "Never assume beach-driving conditions are constant from one access point to the next.",
        "Bring shade. Gulf wind can hide how quickly sun exposure adds up.",
        "During sea-turtle nesting season, follow posted guidance and report animals or nests to the proper authorities rather than approaching them.",
        "After major storms, verify beach access and local conditions before traveling."
      ),
      quote("The best Texas beach is not the prettiest one in a photograph. It is the stretch of coast that matches the weekend you actually want."),
      p("Choose the coast by purpose: Galveston for variety, Port Aransas for a beach-town weekend, Padre Island National Seashore for wild shoreline, and South Padre for a fuller resort trip. Once you stop expecting one island to do everything, the Texas coast becomes much easier to love."),
    ],
  }),
  makeArticle({
    id: "explore-feature-historic-sites",
    slug: "texas-historic-sites-roadmap",
    title: "Texas History Is Better When You Stand Where It Happened",
    dek: "Missions, battlefields, courthouses and museums make more sense as a road map than a timeline. These are the places that turn state history back into geography.",
    category: "historic-sites",
    region: "prairies-lakes",
    hero: image(smallTown, "Historic Texas courthouse square in warm evening light"),
    publishedAt: "2026-08-07",
    tags: ["history", "missions", "museums", "courthouses"],
    body: [
      p("Texas history is usually taught as a sequence of dates, flags and battles. On the ground it feels less orderly. A Spanish mission sits inside a modern city. A courthouse square still organizes a town built around nineteenth-century commerce. A battlefield that changed a republic can be reached from a freeway exit. Geography makes the stories overlap in a way textbooks rarely do."),
      h("Begin with San Antonio’s missions"),
      p("The San Antonio missions are the clearest place to see the Spanish colonial period as a system rather than a single famous building. The Alamo carries enormous symbolic weight, but the larger mission trail shows churches, irrigation, agriculture and community life across multiple sites. Visiting more than one mission changes the scale of the story."),
      h("Then follow the revolution east"),
      p("San Felipe de Austin, Washington-on-the-Brazos, Gonzales, Goliad and San Jacinto form a rough geographic arc through the Texas Revolution. You do not need to visit them in one trip. In fact, spreading them out works better. Each site explains a different piece: settlement, convention, uprising, military disaster and final battlefield."),
      h("Use courthouses to understand the towns"),
      p("County courthouses are among the best surviving civic landmarks in Texas. Around them grew banks, stores, newspapers, hotels and law offices. In towns where the square remains intact, walking one block in each direction can reveal the original logic of the place. Preservation varies widely, but the courthouse still works as a compass."),
      h("Museums are strongest with a specific question"),
      p("A giant museum can become a blur if you arrive with the assignment to learn Texas history. Pick a narrower question instead: cattle, oil, borderlands, Black history, Tejano culture, spaceflight, railroads, German immigration, Czech communities or the military. The state is too large for one museum to explain it honestly."),
      list(
        "Read the site’s current interpretation rather than relying on a decades-old plaque or childhood memory.",
        "Give outdoor sites time; landscapes often explain why an event happened where it did.",
        "Look for local museums in addition to major institutions. Small collections often preserve the most place-specific material.",
        "Treat cemeteries and memorial spaces as active places of remembrance, not scenery.",
        "Pair a historic site with the modern town around it. History did not stop when the marker went up."
      ),
      quote("The advantage of standing at the real place is that the landscape gets a vote in the story."),
      p("A good Texas history trip should complicate what you thought you knew. If a site only confirms a slogan, keep looking. The strongest places add people, geography and consequence back into the story."),
    ],
  }),
  makeArticle({
    id: "explore-feature-road-trips",
    slug: "texas-road-trip-how-to-plan",
    title: "The Texas Road Trip Is About What You Refuse to Skip",
    dek: "The best drives are not built from maximum mileage. They are built around one landscape, a few deliberate stops and enough empty road to let Texas change around you.",
    category: "road-trips",
    region: "hill-country",
    hero: image(roadTrip, "Two-lane Texas road stretching toward the horizon"),
    publishedAt: "2026-08-07",
    tags: ["road trips", "scenic drives", "weekend", "texas travel"],
    body: [
      p("A Texas road trip can fail by being too successful on paper. Add Fredericksburg, Big Bend, Marfa, Palo Duro and the coast to one map and the route looks impressive until you realize the vacation has become a series of fuel stops. The state rewards a different approach: choose one region, let the roads get smaller and protect enough unscheduled time for the place between attractions."),
      h("Pick a landscape before you pick stops"),
      p("Hill Country loops work because the limestone, rivers, ranch roads and towns reinforce one another. A Panhandle trip works when Palo Duro, Caprock country and long plains drives share the same horizon. East Texas road trips should lean into forest, lakes and old towns rather than trying to bolt on Austin. The route gains coherence when the scenery changes gradually instead of through a six-hour transfer."),
      h("Two-lane roads are slower for a reason"),
      p("Farm-to-market and ranch roads can produce the best drives in the state, but they are not scenic shortcuts. Expect livestock, cyclists, low-water crossings, school traffic and stretches without fuel. Speed is the enemy of the thing you came to see. If the schedule only works by driving every mile at the posted limit, the schedule does not work."),
      h("Build around three anchors"),
      p("For a two-day trip, three anchors are usually enough: one landscape, one town and one meal or activity you care about. Everything else can be optional. That structure leaves room for the courthouse you did not know was there, the swimming hole that has an opening, or the pie place with a line out the door."),
      list(
        "Download the route before leaving reliable service.",
        "Fuel early in rural areas rather than turning the last quarter-tank into a decision.",
        "Never cross moving water over a roadway; low-water crossings are not a test of confidence.",
        "Check park reservations and seasonal road closures before the trip, not from the gate.",
        "Leave one meal unplanned. Small-town discoveries are part of the route."
      ),
      quote("The memorable Texas drive is rarely the one with the most pins. It is the one where the map finally stops feeling like the point."),
      p("A road trip works when the day still has room in it. Choose less, drive smaller roads, and let the state reveal itself at the speed of a courthouse square, a river crossing and a two-lane horizon."),
    ],
  }),
  makeArticle({
    id: "explore-feature-small-towns",
    slug: "texas-small-towns-how-to-visit",
    title: "How to Read a Texas Small Town",
    dek: "Start at the courthouse, find the old commercial street, ask what still opens before eight and stay long enough to see the town as more than a photo stop.",
    category: "small-towns",
    region: "prairies-lakes",
    hero: image(smallTown, "Historic courthouse square in a Texas small town at golden hour"),
    publishedAt: "2026-08-07",
    tags: ["small towns", "courthouse squares", "weekend", "main street"],
    body: [
      p("The quickest way to misunderstand a Texas small town is to arrive, photograph the courthouse, buy something labeled local and leave in forty minutes. The better towns reveal themselves slowly. Their useful landmarks are not always the prettiest buildings; they are the places that tell you what the town was built to do and what it still does now."),
      h("Start with the square"),
      p("In county seats, the courthouse is often the original organizing device. Walk the full square before choosing a shop. Look up at second-story windows, old bank lettering and faded signs. The ground floor may have changed tenants dozens of times while the upper floors still show the scale and ambition of the town when rail, cotton, cattle or oil money was moving through it."),
      h("Find the business locals use on Tuesday"),
      p("A destination restaurant can be excellent, but the better clue is the breakfast counter, hardware store, feed store, bakery or cafe that has to survive the rest of the week. Those places tell you whether the town is functioning as a community or mainly as a weekend backdrop. Neither is automatically bad, but they create different visits."),
      h("Ask what made the town"),
      p("Texas towns often make more sense once you know the original economic reason for the place. Some were railroad stops. Some were county seats. Others grew around cotton, cattle, timber, oil, military posts or immigration communities. The architecture, street grid and local museum usually become more legible once that first purpose is clear."),
      h("Stay through late afternoon"),
      p("Morning belongs to deliveries and coffee. Midday belongs to visitors. Late afternoon is when a town often settles back into itself. That is the moment to walk residential blocks around the center, notice churches and schools, and see whether the square is still part of everyday life."),
      list(
        "Park once and walk when the town allows it.",
        "Respect private buildings even when their architecture is photogenic.",
        "Check opening days; many small-town businesses close early or keep limited weekday hours.",
        "Use local museums as orientation, not as an obligation.",
        "Buy something from a business that could plausibly still be there next year because you did."
      ),
      quote("A good small-town visit leaves you knowing what the place does, not just what its courthouse looks like."),
      p("The towns worth returning to are rarely perfect. They have empty storefronts next to restored ones, old families next to newcomers, and history that is still being argued over. That tension is not a flaw in the experience. It is the experience."),
    ],
  }),
  makeArticle({
    id: "explore-feature-food-bbq",
    slug: "texas-food-beyond-brisket-guide",
    title: "Texas Is Bigger Than Brisket",
    dek: "Barbecue deserves the attention, but a real Texas food trip also means tortillas, kolaches, Gulf seafood, border cooking and the dishes that belong to specific towns.",
    category: "food-bbq",
    region: "hill-country",
    hero: image(bbqBrisket, "Sliced smoked brisket on butcher paper at a Texas barbecue joint"),
    publishedAt: "2026-08-07",
    tags: ["food", "barbecue", "tex-mex", "texas travel"],
    body: [
      p("Brisket has become shorthand for Texas food, and it earned the role. A properly smoked brisket is one of the state’s great edible arguments. But organizing an entire food trip around barbecue alone misses the reason Texas eating is interesting: the state is a collision of cattle culture, Gulf seafood, Mexican and Tejano cooking, Czech and German migration, Southern traditions and whatever a town learned to make with the ingredients and labor it had."),
      h("Start with barbecue, but order past brisket"),
      p("Central Texas barbecue makes the clearest introduction because the method is so exposed. Salt, pepper, smoke, time and meat leave little room to hide. Order brisket, then add sausage. Sausage often tells you more about a place’s butcher roots and willingness to make rather than simply smoke. Pork ribs, turkey and house specialties can show how far a pit has moved from the old meat-market model."),
      h("Breakfast is where Texas gets regional"),
      p("Breakfast tacos in San Antonio, Austin and South Texas are not interchangeable, and neither are kolaches and klobasneks from Czech-influenced communities. The most useful food travel happens before the destination restaurants open. Bakeries, taquerias and cafes reveal what a town feeds itself when nobody is writing a review."),
      h("Follow the Gulf inland"),
      p("Shrimp, oysters, redfish and other Gulf seafood shape menus far beyond the immediate coast. The best seafood trip pays attention to season, harvest conditions and preparation rather than assuming proximity alone guarantees quality. A simple plate in a working port can be more revealing than an elaborate coastal menu built mainly for visitors."),
      h("Border food is not one cuisine"),
      p("El Paso, the Rio Grande Valley, Laredo and San Antonio each sit inside different food histories. Calling all of it Tex-Mex flattens distinctions that become obvious once you travel. Flour tortillas, barbacoa, carne guisada, enchiladas and breakfast plates change in style, texture and emphasis across regions."),
      list(
        "Order the specialty a place is known for before improvising your own combination.",
        "If a barbecue joint sells by weight, ask for smaller portions of more meats rather than one giant order.",
        "Do not confuse a long line with automatic quality, but understand that limited production can make sellouts real.",
        "Leave room for bakeries and breakfast; food trips collapse when every meal is treated like dinner.",
        "Ask what is local to the town, not just local to Texas."
      ),
      quote("The best Texas food question is not ‘What should I eat?’ It is ‘What does this place make that the next town does differently?’"),
      p("Brisket can start the trip. It should not end the curiosity. Texas food becomes much more interesting once you stop looking for one statewide cuisine and start following the regional ones."),
    ],
  }),
  makeArticle({
    id: "explore-feature-outdoors",
    slug: "texas-outdoors-seasons-guide",
    title: "The Secret to Texas Outdoors Is Picking the Right Month",
    dek: "Heat, migration, wildflowers, river flow and hunting seasons can completely change the same landscape. A calendar is often more useful than a bucket list.",
    category: "outdoors",
    region: "hill-country",
    hero: image(wildlife, "White-tailed deer at the edge of Texas brush country near dusk"),
    publishedAt: "2026-08-07",
    tags: ["outdoors", "wildlife", "seasons", "hiking"],
    body: [
      p("Texas outdoor advice often fails because it treats place as the only variable. In a state this large, month can matter just as much as location. A trail that is generous in February can be punishing in July. A quiet coastal refuge can fill with migrating birds weeks later. A Hill Country roadside can go from brown to bluebonnet and back again in the time it takes spring to move north."),
      h("Winter belongs to distance"),
      p("Cool months are the time for exposed landscapes: Big Bend, Guadalupe Mountains, desert roads, long prairie trails and places where shade is scarce. Winter weather can still change quickly, especially at elevation, but the season opens routes that become much harder once heat dominates the day."),
      h("Spring belongs to movement"),
      p("Wildflowers get the photographs, but bird migration is the larger event. The Gulf Coast sits on a major migration corridor, and spring weather can concentrate birds dramatically after a difficult crossing. Inland, Hill Country flowers and rising temperatures make March and April ideal for mixed trips that combine walking, scenic drives and town stops."),
      h("Summer belongs to water and dawn"),
      p("Texas does not shut down outdoors in summer; it changes the schedule. Spring-fed swimming, paddling, shaded forest and very early trail starts make more sense than exposed midday mileage. Heat illness is not solved by toughness. The practical summer skill is knowing when to stop, turn around or choose water instead."),
      h("Fall belongs to the return"),
      p("September can still feel like summer, but October and November reopen much of the state. Migrating birds move south, camping becomes comfortable again and many parks enter their best weekend weather. Fall color is limited compared with northern states, yet pockets of hardwood forest and river corridors can still put on a real show."),
      list(
        "Check sunrise, forecast and heat index rather than relying on seasonal averages.",
        "Carry offline maps in remote areas.",
        "Know whether hunting seasons affect the public land you plan to use.",
        "Give wildlife distance; binoculars are better than another ten steps closer.",
        "Treat water availability as a current condition, not a permanent feature on a map."
      ),
      quote("In Texas, the difference between a perfect hike and a miserable one can be six weeks."),
      p("The best outdoor calendar is flexible. Pick the season first, then the region that is coming into its own. Texas is too large to have one outdoor season, which is exactly why there is almost always somewhere worth going."),
    ],
  }),
];
