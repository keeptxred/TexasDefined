import type { Article, ArticleBlock, ArticleInternalLink } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

interface AuthorityPatch {
  dek?: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  links: ArticleInternalLink[];
  blocks: ArticleBlock[];
}

const patches: Record<string, AuthorityPatch> = {
  "bluebonnet-season-field-guide": {
    dek: "Bluebonnet season is a moving Texas weather event, not one magic weekend. Follow bloom timing, soils, rain, safe roads and responsible photography instead of chasing one promised field.",
    tags: ["bluebonnet season", "texas wildflowers", "bluebonnet road trip", "wildflower safety", "spring in texas", "washington county"],
    sourceName: "Texas Department of Transportation Wildflower Program",
    sourceUrl: "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers.html",
    links: [
      { href: "/event/chappell-hill-bluebonnet-festival", label: "Chappell Hill Bluebonnet Festival", description: "Use the event guide and official Washington County wildflower map when planning a Brenham-area spring trip." },
      { href: "/explore/road-trips", label: "Texas road trips", description: "Build a spring drive that still works if one bloom report turns out to be stale." },
      { href: "/article/texas-native-garden-that-survives-august", label: "A garden that survives August", description: "Turn spring wildflower inspiration into a realistic Texas landscape plan." },
      { href: "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers/planting-bluebonnets.html", label: "TxDOT planting bluebonnets", description: "Official guidance on flowering season, seed maturity, planting and mowing." },
      { href: "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers/wildflower-program/planting-wildflowers.html", label: "TxDOT planting wildflowers", description: "Regional timing and establishment guidance for native roadside wildflowers." },
    ],
    blocks: [
      h("Bluebonnets bloom on a biological schedule, not a tourism calendar"),
      p("Texas spring marketing loves a fixed date. Bluebonnets do not. TxDOT says first flowers can open around mid-March in the southern part of the state while northern areas may not see first bloom until around May 1, and an individual flowering period lasts roughly a month. That statewide spread is the reason one county can look finished while another is just beginning."),
      p("The visible bloom is the end of a much longer story. Autumn germination, winter temperatures, rainfall, soil drainage, competition from grasses, mowing and spring warmth all shape the display. A wet week in March cannot fully rescue a poor establishment season, and one hard freeze or hot spell can change a field quickly. The most reliable bluebonnet plan is therefore flexible by design."),
      h("The famous routes are famous because they offer options"),
      p("Ennis, Washington County, Burnet County, Llano County and Hill Country routes draw visitors for good reason, but the real advantage is not that every mile blooms every year. These areas offer networks of farm roads, ranch roads, public parks, towns and side trips. If one stretch is weak, the day can keep moving."),
      p("Washington County is especially useful for a magazine-style spring trip because Brenham, Chappell Hill, Independence and the surrounding countryside can support a full day even when flowers are uneven. Ennis has long organized mapped bluebonnet drives. Burnet and Llano sit inside a broader Hill Country road-trip system where granite, lakes, small towns and ranch roads are attractions in their own right."),
      h("Rainfall is only part of the forecast"),
      p("People often ask whether a rainy winter guarantees a spectacular spring. It does not. Rainfall timing matters as much as a seasonal total, and too much rain can create vigorous competing grasses. Soil type matters. Roadside maintenance matters. Temperature matters. A good bloom year is the result of several conditions lining up, which is why local reports made close to the date of travel are more useful than confident statewide predictions made months ahead."),
      h("The roadside is habitat, not a set"),
      p("TxDOT’s wildflower program manages roadsides for native grasses and thousands of wildflower species, not just bluebonnets. A mature roadside can include Indian paintbrush, coreopsis, verbena, phlox, evening primrose and other species layered together. That diversity is part of the spectacle and part of the reason mowing schedules are timed around seed set."),
      p("Bluebonnets are annuals. The flowers people photograph in spring must mature and produce seed if the patch is going to renew itself naturally. TxDOT recommends allowing time after full bloom for seeds to mature before mowing. Crushing plants for photographs or repeatedly walking paths into dense stands may seem trivial at one family scale but becomes a real disturbance when thousands of visitors copy the same behavior."),
      h("A safe photograph is a better photograph"),
      list(
        "Use public land, designated pull-offs, parks and genuinely safe shoulders instead of improvising parking on a blind curve.",
        "Keep vehicles completely out of travel lanes and never block ranch gates or driveways.",
        "Photograph from the edge of a patch and use perspective rather than sending people into the densest flowers.",
        "Watch for fire ants, snakes, uneven ground, roadside debris and traffic before sitting children or pets down.",
        "Treat fences and gates as boundaries. A beautiful field behind a fence is still private property.",
        "If a stop feels chaotic, keep driving. Texas has more than one field."
      ),
      h("Planting bluebonnets is a fall decision"),
      p("The moment people want bluebonnets in their yard is usually the moment the plants are already flowering. Establishment works on the opposite schedule. TxDOT recommends planting before mid-December and emphasizes good seed-to-soil contact. Regional wildflower guidance generally points to fall planting because seeds and seedlings can establish before summer heat arrives."),
      p("The landscape lesson is bigger than bluebonnets. Native wildflowers perform best when matched to local soil, drainage, sun and region rather than chosen because they succeeded somewhere else in Texas. A seed mix from the Hill Country is not automatically right for a shaded Piney Woods yard or a wet Gulf Coast site."),
      h("Plan the second reason for the trip"),
      p("The strongest bluebonnet road trip has another reason to exist: a state park, historic site, courthouse square, bakery, barbecue stop, walking trail or small town. That makes the trip resilient to weak flowers and spreads visitors across a larger landscape instead of concentrating everybody on the same shoulder."),
      p("Bluebonnet season is best understood as a temporary statewide layer laid over ordinary Texas geography. Roadsides, fence lines and open fields become the attraction for a few weeks, then return to being infrastructure and working land. The trick is to enjoy the transformation without behaving as if it was built for you."),
    ],
  },

  "big-bend-in-winter": {
    dek: "Big Bend becomes more approachable in winter, not easy. Mild desert afternoons, freezing nights, long distances, scarce services and elevation-driven weather make preparation part of the experience.",
    tags: ["big bend winter", "big bend national park", "chisos mountains", "chihuahuan desert", "big bend hiking", "west texas road trip"],
    sourceName: "National Park Service — Big Bend National Park",
    sourceUrl: "https://www.nps.gov/bibe/",
    links: [
      { href: "/destination/big-bend-national-park", label: "Big Bend National Park guide", description: "Use the destination guide for park logistics, seasonality and trip planning." },
      { href: "/explore/national-parks", label: "Texas national parks", description: "Compare Big Bend with Guadalupe Mountains before planning a West Texas trip." },
      { href: "/article/texas-national-parks-big-bend-guadalupe-guide", label: "Big Bend or Guadalupe Mountains?", description: "See why Texas’s two national parks demand very different itineraries." },
      { href: "https://www.nps.gov/bibe/planyourvisit/weather.htm", label: "NPS Big Bend weather", description: "Official seasonal weather guidance and elevation-related temperature differences." },
      { href: "https://www.nps.gov/bibe/planyourvisit/conditions.htm", label: "NPS Big Bend current conditions", description: "Check closures, road conditions, water availability and active alerts before driving into the park." },
    ],
    blocks: [
      h("Winter solves the heat problem but creates a planning problem"),
      p("Big Bend in summer can be brutally hot on the desert floor. Winter changes the equation enough that long walks and lower-elevation exploration become realistic for many visitors, but it does not produce one uniform park climate. The Rio Grande corridor, Panther Junction and the Chisos Basin can feel like different seasons on the same day."),
      p("The National Park Service warns that winter conditions can range from below freezing to warm afternoons. Elevation is the reason. The park rises from low desert near the river into the Chisos Mountains, so a forecast from one station is not a complete plan. Pack for sun, wind and freezing temperatures even when the afternoon forecast looks comfortable."),
      h("Big Bend is bigger than a checklist"),
      p("One of the most common first-trip mistakes is treating Big Bend like a compact national park where every major attraction can be chained together. It cannot. Santa Elena Canyon, Chisos Basin, Rio Grande Village, Boquillas Canyon and the fossil or desert areas can require long drives between them. Scenic distance is still distance, and winter daylight is finite."),
      p("A better strategy is to give each day a geographic theme. One day can belong to the Chisos Mountains. Another can run west toward Ross Maxwell Scenic Drive and Santa Elena Canyon. Another can focus east toward Rio Grande Village and Boquillas Canyon. The park becomes calmer the moment you stop trying to cross it repeatedly."),
      h("Choose hikes by elevation and daylight"),
      p("Winter expands the hiking menu, but trail choice should still begin with daylight, temperature, wind and fitness. Chisos hikes can start cold and become comfortable. Desert hikes may warm quickly in direct sun. Canyon walks can hold shade and cooler air longer than surrounding terrain. The same layering system rarely feels perfect all day, which is why removable layers are more useful than one heavy jacket."),
      list(
        "Start long hikes early enough that a wrong turn, slow pace or photo stop does not turn into an after-dark return.",
        "Carry more water than cool weather makes you think you need; dry air and exertion still dehydrate hikers.",
        "Download maps and save essential information before leaving reliable service.",
        "Tell somebody your plan when heading onto a longer or more isolated trail.",
        "Treat current NPS road and trail conditions as part of the itinerary, not a last-minute formality."
      ),
      h("Camping and lodging require more advance thought in the good season"),
      p("Winter’s appeal creates its own constraint: everybody else can see the same weather chart. Popular campgrounds and Chisos-area lodging can fill, especially around holidays and school breaks. A flexible traveler should understand what requires reservations, what operates first-come or seasonally, and how far alternative lodging is from the park entrance."),
      p("Staying outside the park can work well, but ‘near Big Bend’ is a dangerous phrase. Terlingua and Study Butte are convenient for the west side. Marathon serves a different approach. Alpine is an excellent regional base for some trips but is not next door to the park. Add the actual gate-to-destination drive, not just the town name, before deciding where to sleep."),
      h("Fuel, food and water are itinerary items"),
      p("Big Bend punishes casual assumptions about services. Fill the tank before entering remote stretches, keep drinking water in the vehicle and know where food and fuel are available on the day you travel. A quarter tank that feels comfortable in Houston or Austin can become a poor decision in West Texas."),
      h("Winter is also dark-sky season"),
      p("Long nights are not only a limitation. Big Bend is internationally known for dark skies, and winter can turn sunset into the second half of the day rather than the end of it. Moon phase, cloud cover and cold temperatures all matter. Bring warm layers and give your eyes time to adjust instead of shining bright white lights across a campground or overlook."),
      h("A strong first winter itinerary"),
      list(
        "Day one: Panther Junction orientation, Chisos Basin and a hike sized to daylight and weather.",
        "Day two: Ross Maxwell Scenic Drive with geologic and desert stops, ending at Santa Elena Canyon when conditions allow.",
        "Day three: Rio Grande Village, Boquillas Canyon and the eastern side of the park, with enough margin for the long drive back.",
        "Extra day: repeat the region you liked most instead of inventing a cross-park marathon."
      ),
      p("Big Bend is a winter park because winter makes more of it physically available to ordinary travelers. It is not a winter park because winter makes it simple. The reward is a landscape large enough to make preparation feel small once you are finally standing in it."),
    ],
  },

  "palo-duro-lighthouse-walk": {
    dek: "The Lighthouse Trail is Palo Duro Canyon’s signature hike, but the real story is exposure: distance, canyon-floor heat, scarce shade and a final climb that arrives after the easy miles.",
    tags: ["palo duro canyon", "lighthouse trail", "texas panhandle", "state park hiking", "canyon heat safety", "amarillo day trip"],
    sourceName: "Texas Parks & Wildlife — Palo Duro Canyon State Park",
    sourceUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    links: [
      { href: "/destination/palo-duro-canyon-state-park", label: "Palo Duro Canyon State Park guide", description: "Use the destination page for park logistics, seasonality and nearby planning." },
      { href: "/explore/state-parks", label: "Texas state parks", description: "Compare Palo Duro with other Texas landscapes before building a trip." },
      { href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info", label: "TPWD Palo Duro trail guide", description: "Official trail distances, difficulty ratings and current safety guidance." },
      { href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/alerts", label: "Palo Duro park alerts", description: "Check weather closures, burn bans, hunting closures and heat restrictions before arrival." },
    ],
    blocks: [
      h("The canyon floor is a different climate from the rim"),
      p("Palo Duro’s first surprise is visual: the flat Panhandle breaks open beneath you. The second surprise is thermal. Texas Parks and Wildlife warns that the canyon can run hotter than the rim, and summer conditions can be dangerous enough to trigger midday trail closures. A pleasant morning at the visitor center is not proof that the return hike will be pleasant three hours later."),
      p("That matters especially on the Lighthouse Trail because the route is exposed and popular. TPWD lists it at 2.8 miles one way. The approach is not technically difficult for most of its length, which encourages people to keep going even when water, footwear, timing or heat should be telling them to turn around."),
      h("The easy-looking miles are the trap"),
      p("The Lighthouse appears to be close long before it is. The broad trail rolls through open canyon country, and the formation repeatedly looks reachable. Most of the route lacks the kind of deep shade that resets a hot-weather hike. By the time the final steeper approach arrives, the hiker has already spent miles in sun."),
      p("TPWD’s current trail guidance is unusually direct: many heat-related injuries and deaths involving people and pets occur on the Lighthouse Trail. The agency advises hikers to carry substantial water and to prepare for sun and heat. That warning should shape the entire day, not sit in the fine print beneath a bucket-list photo."),
      h("Start with a turnaround rule"),
      list(
        "Choose a latest turnaround time before leaving the trailhead, especially in warm months.",
        "Carry enough water for the full out-and-back distance and extra for delays; do not depend on feeling thirsty as your warning system.",
        "Protect skin and head from sun and wear footwear with enough traction for the rougher final approach.",
        "Check park alerts for weather, trail closures and heat restrictions before driving down into the canyon.",
        "If a person or pet is struggling on the outbound leg, turn around. The return is not shorter."
      ),
      h("The Lighthouse is not the only way to understand Palo Duro"),
      p("The fixation on one formation can shrink the park. Shorter trails, overlooks, CCC-era structures, the scenic road and geologic pullouts can produce a better first visit than forcing every traveler into the same 5.6-mile hike. Families, older visitors and anyone arriving in bad heat can still have a complete day without reaching the Lighthouse."),
      p("The road itself is interpretive. Driving from the rim to the floor exposes layers of geologic time in color bands and changing vegetation. Stop where the park wants you to stop, read the landscape and notice how quickly the walls change the horizon. Palo Duro is not a single hoodoo with parking."),
      h("Weather can close the canyon for reasons beyond heat"),
      p("Heavy rain can close trails and sections of Park Road 5 because the canyon concentrates runoff. Burn bans and scheduled hunting closures can also affect a trip. This is why the current park-alert page belongs next to the weather forecast in any serious plan. A state park is dynamic land, not a permanent attraction with fixed operating conditions."),
      h("Turn the hike into a full Panhandle day"),
      p("Amarillo gives visitors food, lodging and museum options before or after the park, while Canyon places you close to the entrance and West Texas A&M University. A strong itinerary uses the cool part of the day for hiking, the hot or windy part for driving and interpretation, and evening for food or the seasonal TEXAS Outdoor Musical when it fits the calendar."),
      p("The best first visit to Palo Duro is the one that leaves enough energy to look up from the Lighthouse. The canyon is the destination. The formation is the exclamation point."),
    ],
  },

  "hill-country-two-lane-loop": {
    dek: "A Hill Country road trip works best as a loose loop through granite, rivers, ranch roads and small towns—planned enough to stay safe, flexible enough to follow the road that looks better than the itinerary.",
    tags: ["hill country road trip", "texas scenic drives", "willow city loop", "fredericksburg", "llano", "johnson city", "wimberley"],
    sourceName: "DriveTexas — Texas Department of Transportation",
    sourceUrl: "https://drivetexas.org/",
    links: [
      { href: "/explore/region/hill-country", label: "Texas Hill Country guide", description: "Build alternate stops around parks, towns, rivers and seasonal conditions." },
      { href: "/explore/small-towns", label: "Texas small towns", description: "Add courthouse squares and local businesses without turning the drive into a checklist." },
      { href: "/article/bluebonnet-season-field-guide", label: "Chasing bluebonnet season", description: "Use the wildflower guide when spring bloom reports start reshaping Hill Country traffic." },
      { href: "https://drivetexas.org/", label: "DriveTexas", description: "Official TxDOT road-condition information for closures, construction and weather impacts." },
    ],
    blocks: [
      h("The best Hill Country route is not the shortest line between famous towns"),
      p("Interstate logic is the enemy of a good Hill Country drive. The region reveals itself on roads that follow water, ranch boundaries, limestone ridges and old settlement patterns rather than the fastest possible path. The objective is not to maximize attractions. It is to keep enough structure that the day has shape while leaving enough slack to stop when a courthouse square, river crossing or bakery gives you a better idea."),
      p("A useful backbone begins around Fredericksburg, works north toward granite country and Llano, then bends east and south through Johnson City toward the Wimberley or Dripping Springs side of the region. That is not the only loop. It is simply a route with enough geographic change to show why the Hill Country is more than one tourism town repeated across limestone."),
      h("Fredericksburg is a launch point, not the whole trip"),
      p("Leaving Fredericksburg early has two advantages: cooler roads and fewer crowds. Ranch Road 965 toward Enchanted Rock moves quickly from cultivated land into exposed granite and oak country. If the state natural area is part of the plan, treat its capacity and reservation rules as real constraints. A road trip should not spend its first two hours discovering that the marquee stop is unavailable."),
      h("Llano is where the route can change personality"),
      p("Llano works as a reset because it has fuel, food, a courthouse square and the river. From there the day can become more about barbecue, wildflowers, small towns or empty roads depending on season. In spring, bloom reports may pull traffic toward side roads. In summer, the real issue is heat. After heavy rain, the focus shifts to crossings and road conditions."),
      p("This is where DriveTexas earns a place in the trip plan. Scenic rural roads can be affected by flooding, construction or closures that do not show up in somebody else’s month-old itinerary. A low-water crossing should never become an adventure because the route looked pretty on a map."),
      h("Willow City requires restraint"),
      p("The Willow City Loop is famous for spring scenery, but much of the surrounding land is private ranch property. Wildflower season does not convert a fence line into public access or a narrow road into a parking lot. Keep moving when there is no safe place to stop, do not block gates and do not trade somebody else’s property rights for a photograph."),
      h("Johnson City is the hinge"),
      p("Johnson City sits where several versions of the trip become possible. Pedernales Falls can turn the day toward hiking. US 290 can turn it toward food, wineries and heavier traffic. Blanco can pull the route south. Dripping Springs can make the day more suburban and event-oriented. The town is useful precisely because it offers choices rather than one compulsory attraction."),
      h("Wimberley rewards the traveler who kept time in reserve"),
      p("Wimberley is easy to over-schedule because swimming holes, the square, Cypress Creek and nearby drives all look close on paper. Popular swimming destinations may require reservations or operate seasonally. Weekend traffic can absorb the margin that a map pretends does not exist. Arrive with one priority and one fallback instead of six ambitions."),
      h("Pack for a road, not a city day"),
      list(
        "Keep the fuel tank comfortably above empty; rural detours are easier when range is not part of the decision.",
        "Carry water even when the route is full of restaurants. Closures and delays happen.",
        "Download the route or save key turns before entering weak-service areas.",
        "Check weather and road conditions after heavy rain. Never drive into moving water.",
        "Respect private property on wildflower and ranch roads.",
        "Build one unplanned hour into the day. That hour is where the road trip usually becomes memorable."
      ),
      h("The loop changes with the season"),
      p("Spring emphasizes wildflowers and crowd management. Summer shifts the route toward early starts, shade and water. Fall is made for patios, town events and longer walking stops. Winter favors hiking, historic sites and the kind of clear-distance views that summer haze can soften. The same road is not the same trip in April and January."),
      p("The Hill Country is best when the road remains the connective tissue rather than dead time between attractions. Drive slowly enough to notice the change from granite to limestone, from ranch gate to river town, and from tourist corridor back to ordinary Texas. That change is the loop."),
    ],
  },
};

export function enrichLegacyTravelArticle(article: Article): Article {
  const patch = patches[article.slug];
  if (!patch) return article;
  const links = [...(article.internalLinks ?? [])];
  for (const link of patch.links) {
    if (!links.some((existing) => existing.href === link.href)) links.push(link);
  }
  return {
    ...article,
    dek: patch.dek ?? article.dek,
    tags: [...new Set([...article.tags, ...patch.tags])],
    sourceName: patch.sourceName,
    sourceUrl: patch.sourceUrl,
    internalLinks: links,
    body: [...article.body, ...patch.blocks],
  };
}
