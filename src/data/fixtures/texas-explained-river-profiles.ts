import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const collectionLink = { href: "/texas-explained", label: "Texas Explained", description: "Connect this river with the larger systems, landscapes and settlement patterns that shape Texas." };
const riversLink = { href: "/article/texas-rivers-explained", label: "The rivers that built Texas", description: "Return to the statewide guide and compare the major river systems side by side." };
const basinsLink = { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "See why watershed boundaries matter more than county lines when following water across the state." };
const aquifersLink = { href: "/article/texas-aquifers-springs-explained", label: "Texas aquifers and springs", description: "Add the groundwater systems that feed, sustain or interact with many Texas rivers." };
const reservoirsLink = { href: "/article/texas-lakes-reservoirs-explained", label: "Why Texas built so many reservoirs", description: "Understand the dams and stored-water systems layered onto Texas rivers." };

export const texasBrazosRiverGuideArticle: Article = {
  id: "evergreen-texas-brazos-river-guide", brandId: "texasdefined", slug: "texas-brazos-river-guide",
  title: "Brazos River Guide: History, Reservoirs, Fishing & Places to Visit",
  dek: "Follow the Brazos from its West Texas forks to the Gulf, with major reservoirs, tributaries, wildlife, history, recreation, floodplain geography and the best places to experience the river.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg", alt: "Open water and wooded shoreline in the Brazos River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", updatedAt: "2026-10-05", readingMinutes: 22,
  tags: ["Brazos River", "Brazos River basin", "Texas rivers", "Texas water", "Texas geography", "Brazos history", "Brazos fishing", "Brazos reservoirs", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  internalLinks: [
    riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "/article/possum-kingdom-water-system-guide", label: "Possum Kingdom water system", description: "See how one of the Brazos' best-known reservoirs fits into the larger river system." },
    { href: "/article/lake-whitney-water-system-guide", label: "Lake Whitney water system", description: "Follow the Brazos through one of its major Central Texas reservoirs." },
    { href: "/state-park/brazos-bend-state-park", label: "Brazos Bend State Park", description: "Explore lower-basin wetlands, wildlife and floodplain habitat near Houston." },
    { href: "/state-park/lake-whitney-state-park", label: "Lake Whitney State Park", description: "Plan a visit to limestone shoreline and open water on the middle Brazos." },
    { href: "/state-park/lake-somerville-birch-creek-unit-state-park", label: "Lake Somerville State Park", description: "Camp, hike and paddle around a major reservoir in the Brazos basin." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp", label: "TWDB Brazos River Basin", description: "Official Texas Water Development Board basin overview, tributaries, reservoirs and water-supply context." },
    { href: "https://www.brazos.org/", label: "Brazos River Authority", description: "Current basin operations, reservoirs, water-supply information and river-management resources." },
    { href: "https://waterdata.usgs.gov/tx/nwis/rt", label: "USGS Texas water data", description: "Current river-stage and streamflow observations for gauges across Texas." },
  ], relatedCollections: [], relatedDestinations: ["brazos-bend-state-park", "lake-somerville-birch-creek-unit-state-park", "lake-whitney-state-park"],
  body: [
    p("The Brazos is one of the best rivers for understanding Texas as a connected landscape. It begins at the confluence of the Salt Fork and Double Mountain Fork in Stonewall County, then crosses a huge sweep of the state before reaching the Gulf of Mexico near Freeport. Between those points, the Brazos links dry headwaters, working ranch country, reservoir chains, prairie, limestone country, college towns, historic settlements, broad floodplains and the humid coastal plain."),
    p("A road map makes the Brazos look like one blue line. In reality, it is a basin: thousands of tributaries, lakes, flood-control structures, farms, cities, wetlands and groundwater systems that all influence the same river. To understand the Brazos, it helps to follow the river from upstream to downstream and notice how the landscape changes around it."),

    h("Brazos River at a glance"),
    list(
      "Source: the confluence of the Salt Fork and Double Mountain Fork in Stonewall County.",
      "Mouth: the Gulf of Mexico on the upper Texas coast near Freeport.",
      "Scale: one of Texas' largest river basins and one of the state's longest major rivers.",
      "Major tributaries: Salt Fork, Double Mountain Fork, Clear Fork, Leon, Little, Lampasas, Navasota, Paluxy and Nolan, among many others.",
      "Major reservoirs: Possum Kingdom, Granbury, Whitney, Waco and Somerville, plus many smaller impoundments across the basin.",
      "Major landscapes: Rolling Plains, Cross Timbers, Central Texas limestone country, Blackland Prairie, Post Oak country and Gulf Coastal Plain.",
      "Major uses: municipal water, agriculture, industry, flood management, recreation, fishing, wildlife habitat and historical settlement."
    ),

    h("Why the Brazos matters so much"),
    p("The Texas Water Development Board identifies the Brazos as the second-largest river basin by area within Texas. It is also one of the state's longest rivers and, by TWDB's long-term basin statistics, carries the largest average annual flow volume of any Texas river. Those measurements are not interchangeable. A river can be long but dry, or drain a large area without producing much runoff. The Brazos stands out because it ranks near the top by several measures at once."),
    p("The Brazos also matters because it crosses so many different kinds of Texas. Conditions that affect the basin in the west are not the same as conditions near Waco, the Brazos Valley or the Gulf. Drought, groundwater decline, reservoir operations, urban growth and coastal flooding all belong to the same river system, even when they occur hundreds of miles apart."),

    h("Where the Brazos begins"),
    p("The modern main stem begins where the Salt Fork and Double Mountain Fork meet in Stonewall County. Those forks gather runoff from a broad, relatively dry part of northwest and west-central Texas. The upper basin receives less reliable rainfall than the lower basin, so water supply there depends heavily on the timing of storms, reservoir storage and the relationship between surface water and groundwater."),
    p("This is also where the Brazos story connects to the Ogallala Aquifer and other groundwater systems. TWDB has long noted that declining groundwater availability can increase pressure on surface-water supplies. The practical lesson is simple: rivers and aquifers cannot be planned as completely separate resources. When groundwater becomes harder or more expensive to use, communities may look toward the river system for more supply."),

    h("The upper Brazos: drier country and big distances"),
    p("Upstream of the Cross Timbers, the basin feels different from the Brazos most people picture near College Station or Richmond. Rainfall is lower, tributaries can be intermittent or flashy, and long stretches of ranch and farm country dominate the watershed. The channel can widen into sandy reaches, then tighten where geology changes."),
    p("Floods still matter here. Dry-country rivers can rise quickly when intense thunderstorms hit the right part of a watershed. Because the upper basin is large, a storm far from the main river can send water downstream through a fork or tributary before communities on the main stem see the rise."),

    h("Possum Kingdom: the Brazos becomes a reservoir landscape"),
    p("Possum Kingdom Lake is one of the Brazos' most recognizable transformations. The reservoir sits behind Morris Sheppard Dam in a rugged section of the river west of Mineral Wells. Steep limestone and sandstone country, cliffs, coves and deep open water make the landscape look very different from the sandy upper river."),
    p("For recreation, Possum Kingdom is known for boating, fishing, camping and dramatic shoreline scenery. For the river system, it is storage and infrastructure: water held behind a dam, released according to operating needs and passed downstream into the next reaches of the Brazos."),
    { type: "image", image: { src: "/images/state-parks/lake-mineral-wells-state-park.jpg", alt: "Rocky Cross Timbers landscape near the middle-upper Brazos basin", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "The Brazos crosses rugged Cross Timbers country before continuing toward the larger Central Texas reservoir system." },

    h("Lake Granbury and the growing middle basin"),
    p("Farther downstream, Lake Granbury creates another major reservoir reach. Around Granbury, the Brazos is part water-supply system, part recreation corridor and part real-estate landscape. Homes, marinas and local tourism sit directly beside infrastructure that also helps regulate water in the basin."),
    p("This section demonstrates a recurring Brazos pattern: the river often becomes most visible to the public where it has been impounded. The named lake may feel like a separate destination, but hydrologically it remains part of the same river moving toward the Gulf."),

    h("Lake Whitney: limestone country on the Brazos"),
    p("Lake Whitney is one of the major Central Texas reservoirs on the Brazos. Limestone bluffs, broad water and state-park access make it one of the easiest places to see the river as both a natural corridor and a managed reservoir."),
    p("Lake Whitney State Park provides camping, shoreline access, swimming areas when conditions allow, paddling and fishing opportunities. Visitors should still check current park notices, lake levels, weather and water conditions rather than assuming every shoreline area is open or safe year-round."),
    { type: "image", image: { src: "/images/state-parks/lake-whitney-state-park.jpg", alt: "Lake Whitney shoreline and open water on the Brazos River", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "At Lake Whitney, the Brazos becomes broad reservoir water framed by Central Texas limestone country." },

    h("Waco: where the Brazos becomes an urban river"),
    p("At Waco, the Brazos moves through one of the river's best-known urban reaches. Bridges, trails, parks and the confluence area with the Bosque system make the river a visible part of the city instead of a distant boundary or reservoir shoreline."),
    p("The Waco reach also shows why river cities are shaped by both access and risk. The river supported settlement, movement and commerce, but the same floodplain that creates fertile land can become dangerous during major rises. Modern levees, dams, forecasts and reservoir operations reduce some risks, but no infrastructure removes flood risk completely."),

    h("The Little, Leon and Lampasas systems enlarge the basin"),
    p("The middle Brazos is fed by major tributary networks that drain large parts of Central Texas. The Leon and Lampasas combine through the Little River system, connecting the Brazos to landscapes around Temple, Belton, Killeen and the surrounding counties. These tributaries matter for water supply, flood behavior, habitat and reservoir operations."),
    p("Following tributaries on a map makes the basin easier to understand. Water that enters the Little River far from the Brazos main stem can eventually reach the same channel downstream. That is why watershed boundaries matter more than county lines when talking about river management."),

    h("The Navasota River and Lake Somerville"),
    p("Farther southeast, the Navasota River joins the Brazos after draining a broad part of east-central Texas. Lake Somerville sits within this larger tributary network and is one of the basin's major recreation and storage landscapes."),
    p("Lake Somerville State Park's Birch Creek and Nails Creek units give visitors access to camping, hiking, horseback riding, paddling, fishing and shoreline habitat. The lake is especially useful for understanding that the Brazos basin is not just the main river: tributary reservoirs can be central parts of the same water system."),
    { type: "image", image: { src: "/images/state-parks/lake-somerville-birch-creek-unit-state-park.jpg", alt: "Lake Somerville shoreline and woodland in the Brazos River basin", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "Lake Somerville sits on a Brazos tributary system and shows how reservoirs throughout the watershed are connected to the main river." },

    h("College Station, Bryan and the Brazos Valley"),
    p("The phrase Brazos Valley usually refers to the region around Bryan, College Station and nearby counties where the river is a defining geographic feature even when it does not run through the middle of every community. Here the basin shifts into a greener landscape with more reliable rainfall, larger tributaries and a long history of agriculture and settlement."),
    p("The river's broad floodplain becomes more visible in this part of Texas. Flat land near the channel can be productive, but it is also land the river may reclaim during major floods. That tension—fertile floodplain versus flood exposure—is part of the Brazos story all the way to the coast."),

    h("Washington-on-the-Brazos and the river's historical importance"),
    p("The Brazos is inseparable from the story of early Anglo-American settlement and the Republic of Texas. Washington-on-the-Brazos, where the Texas Declaration of Independence was adopted in 1836, sits near the river. The river corridor also connected farms, plantations, ferries, towns and trade routes through the nineteenth century."),
    p("Long before those events, Indigenous peoples lived, traveled and traded through the basin. The Brazos name itself is tied to Spanish colonial-era naming, and the river became a geographic reference point on maps long before modern dams or highways existed."),
    p("A useful way to read Brazos history is to avoid treating the river as background scenery. It was transportation, boundary, water source, flood hazard and settlement corridor. Communities grew where crossings, ferries and fertile land made the river useful, even though floods regularly reminded settlers that the channel could not be controlled."),

    h("The plantation and cotton era changed the lower Brazos"),
    p("In the nineteenth century, the lower Brazos became one of the most important agricultural corridors in Texas. Enslaved labor supported cotton and sugar production on plantations across parts of the lower valley, especially where fertile alluvial soils made large-scale agriculture profitable."),
    p("That history remains important to understanding the landscape. Broad floodplains, old settlement patterns, historic plantation sites and transportation routes are all connected to the river's economic role. A complete Brazos guide should acknowledge that prosperity along the lower river was often built through slavery and later systems of unequal labor and land ownership."),

    h("Why the Brazos floods"),
    p("The Brazos drains an enormous area, and the basin can receive very different weather at the same time. Multi-day rain across Central and Southeast Texas, tropical systems near the coast, or concentrated storms over tributaries can all raise the river."),
    p("Flooding becomes especially serious on the broad lower floodplain, where the channel has room to spread beyond its banks. Reservoirs and flood-control projects can reduce some peaks, but they do not make the river flood-proof. Anyone living, camping or traveling near the Brazos should use current National Weather Service forecasts, local emergency information and USGS river gauges during wet weather."),

    h("The lower Brazos: wider, slower and more coastal"),
    p("Below the Brazos Valley, the river crosses a lower, flatter landscape toward Richmond, Rosenberg and Fort Bend County before continuing to the Gulf. Here the river is wider, the floodplain broadens and the surrounding environment becomes more humid."),
    p("Levees, agriculture, suburban growth, roads and industry all compete for space near the lower river. The river still carries sediment, shifts within its floodplain over long periods and responds to major storms. Development can make the landscape look fixed, but the underlying river system remains dynamic."),

    h("Brazos Bend State Park: lower-basin wildlife without standing on the main channel"),
    p("Brazos Bend State Park protects wetlands, lakes, bottomland forest and prairie near the lower Brazos. The park is famous for alligators and birdlife, but its real value in this guide is ecological: it shows the kind of wetland and floodplain habitat associated with the lower basin."),
    p("Visitors should not confuse the park's lakes with the Brazos main stem. The park sits within the larger lower-basin landscape and provides an accessible way to see floodplain ecology, especially for travelers coming from Houston."),
    { type: "image", image: { src: "/images/state-parks/brazos-bend-state-park.jpg", alt: "Wetland habitat at Brazos Bend State Park in the lower Brazos basin", width: 1600, height: 1280, credit: "Mike Fisher · CC BY 2.0 · Wikimedia Commons" }, caption: "The lower Brazos basin supports wetlands and bottomland habitat that look nothing like the drier upper reaches." },

    h("Where the Brazos reaches the Gulf"),
    p("The Brazos reaches the Gulf of Mexico near Freeport on the upper Texas coast. By this point, water from a vast interior basin has passed through forks, tributaries, reservoirs, cities, farms and floodplains before entering a coastal environment shaped by tides, sediment, storms and industry."),
    p("The mouth is not just an endpoint on a map. It is where the river's sediment, freshwater and nutrients meet the coastal system. Changes far upstream can therefore have downstream consequences for estuarine and Gulf environments."),

    h("Why the Brazos looks brown"),
    p("River color changes with flow, sediment, algae, depth, wind and recent rainfall. The Brazos often carries suspended sediment, especially during or after runoff events, which can give the water a tan or brown appearance. That does not automatically mean the water is polluted."),
    p("At the same time, color alone cannot tell you whether water is safe for swimming or drinking. Bacteria, contaminants, harmful algal blooms and other hazards are not reliably visible. Use local health advisories and current agency information before making water-contact decisions."),

    h("Can you swim in the Brazos?"),
    p("There is no single yes-or-no answer for the entire river. Some reservoir parks maintain designated swimming areas when conditions permit. Other reaches may have strong current, submerged debris, steep banks, private property, poor access, bacterial concerns or rapidly changing water levels."),
    p("The safest approach is to treat swimming as a site-specific decision. Use designated public access where possible, obey posted warnings, avoid flood conditions and never assume that a calm-looking main-stem reach is safe simply because the surface appears smooth."),

    h("Can you kayak or canoe the Brazos?"),
    p("Yes, many stretches of the Brazos and its reservoirs are paddled, but conditions vary enormously. Reservoir shorelines can be exposed to wind and boat traffic, while river reaches may contain low-water hazards, snags, strong current or difficult access."),
    p("Texas public-water law can be complicated, and access points matter. Do not assume that every bridge crossing or riverbank provides lawful public entry. Plan around established public parks, paddling access, marinas and other clearly authorized locations, and check current flow before launching."),

    h("Fishing the Brazos"),
    p("Fishing opportunities change by reach. Reservoirs such as Possum Kingdom, Whitney, Waco and Somerville support established recreational fisheries, while the river itself contains channel catfish, flathead catfish, gar, freshwater drum, sunfish and other species depending on location and habitat."),
    p("Species regulations, bag limits, consumption advisories and access rules can change. Use current Texas Parks and Wildlife information for the specific lake or river reach you plan to fish rather than relying on a statewide summary."),

    h("Wildlife along the Brazos"),
    p("The basin is too large for a single wildlife list. Upper reaches support species associated with open ranch country and drier grasslands. Central reaches add Cross Timbers and prairie habitat. Lower reaches support bottomland forest, wetlands, alligators, wading birds and migratory species."),
    list(
      "Birds: herons, egrets, kingfishers, raptors, waterfowl and seasonal migrants.",
      "Mammals: white-tailed deer, raccoons, bobcats, coyotes, beavers and river otters in suitable habitat.",
      "Reptiles: turtles, snakes and American alligators in the lower basin.",
      "Fish: catfish, gar, drum, sunfish and reservoir sport fish depending on the reach.",
      "Floodplain habitat: oxbows, wetlands, riparian woodland and sandbars that change as water levels rise and fall."
    ),

    h("Best places to experience the Brazos basin"),
    list(
      "Possum Kingdom Lake — best for dramatic reservoir scenery, boating and understanding the river in rugged Cross Timbers country.",
      "Lake Whitney State Park — best for a public campground-and-lake experience on the middle Brazos.",
      "Waco — best for seeing the Brazos as an urban river with bridges, parks and trails.",
      "Washington-on-the-Brazos — best for connecting the river to Texas independence history.",
      "Lake Somerville State Park — best for seeing a major tributary reservoir within the larger Brazos system.",
      "Brazos Bend State Park — best for lower-basin wetlands, alligators and birding near Houston.",
      "Richmond and Fort Bend County — best for seeing how the lower river meets one of Texas' fastest-growing suburban regions.",
      "Freeport area — best for understanding where the river completes its trip to the Gulf."
    ),

    h("A three-day Brazos road-trip idea"),
    p("Day one: start around Possum Kingdom or Mineral Wells to see the rugged upper-middle basin. Spend time on overlooks, reservoir shoreline and the Cross Timbers landscape."),
    p("Day two: continue toward Lake Whitney and Waco. Visit Lake Whitney State Park, then follow the Brazos into Waco for an urban-river contrast. If time allows, continue southeast toward the Brazos Valley."),
    p("Day three: visit Washington-on-the-Brazos, then continue toward the lower basin. For wildlife, detour to Brazos Bend State Park; for the river's final chapter, continue toward Fort Bend County and the coast near Freeport. This is a long route, so it works best as a sampler rather than an attempt to trace every mile."),

    h("When to visit"),
    list(
      "Spring: green landscapes, active wildlife and generally comfortable temperatures, but thunderstorms can raise river levels quickly.",
      "Summer: best for lake recreation when heat is manageable, but midday temperatures can be dangerous and open-water storms can build fast.",
      "Fall: often one of the best all-around seasons for camping, hiking and paddling because temperatures are lower and weather can be more stable.",
      "Winter: good for birding and quieter parks, though cold fronts and strong winds can make reservoir conditions rough."
    ),

    h("What to check before a river trip"),
    list(
      "USGS gauges for current river stage and streamflow.",
      "National Weather Service forecasts and flood warnings.",
      "Texas Parks and Wildlife park closures, fishing rules and water-contact notices where applicable.",
      "Reservoir operators for lake levels, releases and access changes.",
      "Local public-access rules before launching, swimming or entering riverbanks.",
      "Heat, lightning and wind forecasts; Texas river trips can become dangerous even when water levels look normal."
    ),

    h("Brazos River history in a short timeline"),
    list(
      "Before European colonization: Indigenous peoples live, travel, hunt and trade throughout the watershed.",
      "Spanish colonial period: the river appears in exploration, mission and mapping records and acquires the name Brazos.",
      "1820s–1830s: Anglo-American settlement expands along the lower river and tributaries.",
      "1836: delegates at Washington-on-the-Brazos declare Texas independence.",
      "1800s: ferries, plantations, farms and towns develop along the river corridor; slavery is central to the lower-basin cotton and sugar economy.",
      "1900s: major dams and reservoirs increasingly turn the river into a managed water-supply and flood-control system.",
      "Today: the basin supports millions of people, major cities, agriculture, industry, recreation and critical wildlife habitat while facing drought, flood and growth pressures."
    ),

    h("How the Brazos compares with other Texas rivers"),
    p("Compared with the Colorado, the Brazos drains a larger and generally wetter basin and carries more average annual flow. Compared with the Trinity, it crosses a broader slice of the state and reaches farther into drier western country. Compared with the Rio Grande, the Brazos is not an international boundary and receives more runoff from humid parts of Texas."),
    p("Those comparisons are useful because they show why Texas rivers cannot be ranked by a single number. Length, basin area, water yield, reservoir storage, ecological value and population served all tell different stories."),

    h("Frequently asked questions about the Brazos River"),
    h("Where does the Brazos River start?"),
    p("The main Brazos begins at the confluence of the Salt Fork and Double Mountain Fork in Stonewall County. Those forks drain a broad area of northwest and west-central Texas."),
    h("Where does the Brazos River end?"),
    p("The Brazos reaches the Gulf of Mexico near Freeport on the upper Texas coast."),
    h("Why is the Brazos River brown?"),
    p("Suspended sediment often gives the Brazos a tan or brown appearance, especially after runoff. Color by itself does not tell you whether the water is safe or polluted."),
    h("Can you swim in the Brazos River?"),
    p("Swimming safety depends on the exact location, current, access, recent weather and water-quality conditions. Use designated public swimming areas where available and obey current advisories."),
    h("Can you kayak the Brazos River?"),
    p("Yes, many reaches are paddled, but access, flow, hazards and distance between take-outs vary. Check river gauges and use established public access points."),
    h("What are the biggest lakes on the Brazos?"),
    p("Possum Kingdom, Granbury, Whitney, Waco and Somerville are among the best-known major reservoirs in the Brazos basin, along with numerous additional lakes on tributaries."),
    h("What cities are on or near the Brazos?"),
    p("Waco, the Bryan–College Station region, Richmond, Rosenberg and communities near the lower river are among the best-known population centers connected to the Brazos. Many other towns sit on tributaries or reservoirs within the basin."),
    h("Does the Brazos River flood?"),
    p("Yes. The Brazos has a long flood history, especially across the broad lower floodplain. Reservoirs and levees reduce some risks but do not eliminate flooding."),
    h("What fish live in the Brazos?"),
    p("Catfish, gar, freshwater drum, sunfish and many other species occur in the river, while reservoirs support additional sport fisheries. Species mix changes by reach."),
    h("What is the best place to see the Brazos?"),
    p("For scenery, Possum Kingdom and Lake Whitney are strong choices. For history, Washington-on-the-Brazos is hard to beat. For wildlife near Houston, Brazos Bend State Park is one of the most accessible lower-basin destinations."),

    h("The central Brazos lesson"),
    p("The Brazos is not one landscape and not one kind of river. It is a dry-country headwater system, a chain of reservoirs, an urban river, a historic settlement corridor, an agricultural floodplain and a Gulf-bound coastal river at different points along the same route."),
    p("That is what makes the Brazos one of the best geographic guides to Texas. Follow it from the western forks to the coast and you move through several different Texases while staying inside one watershed. The river connects them all."),
  ],
};

export const texasColoradoRiverGuideArticle: Article = {
  id: "evergreen-texas-colorado-river-guide", brandId: "texasdefined", slug: "texas-colorado-river-guide",
  title: "The Colorado River Explained: The Texas River That Runs Through Austin",
  dek: "Texas' Colorado River begins far west of Austin and runs entirely within the state to Matagorda Bay. Its long, relatively dry basin and chain of reservoirs show why river length and water yield are not the same thing.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg", alt: "Limestone river channel and flowing water in the Colorado River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Texas rivers", "Austin water", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  internalLinks: [riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/", label: "TWDB Colorado River Basin", description: "Official basin overview with river path, tributaries, reservoirs and water-planning context." },
  ], relatedCollections: [], relatedDestinations: ["pedernales-falls-state-park"],
  body: [
    p("Texas has its own Colorado River, separate from the Colorado River that carved the Grand Canyon. The Texas Colorado rises in West Texas, runs through the center of the state and eventually reaches Matagorda Bay and the Gulf. It is one of the clearest examples of how a river can be extremely long without producing an equally large volume of water."),
    h("A long river across a relatively dry basin"),
    p("TWDB describes the Colorado Basin as the third largest river basin by area within Texas. The Colorado is the second-longest river in the state, yet only sixth in average annual flow volume. A large portion of its watershed lies in relatively arid parts of Texas, so the basin produces less runoff per unit of land than wetter river systems farther east."),
    p("That contrast is useful: a river's length does not tell you how much water it carries. Rainfall, evaporation, soils, vegetation, geology and the timing of storms all help determine how much water a basin actually yields."),
    h("The tributaries explain the Hill Country connection"),
    p("The Colorado's tributary network includes the Concho, Llano, Pedernales and San Saba rivers as well as Pecan Bayou and many creeks. Those tributaries connect landscapes that can feel unrelated when you drive across them. The Pedernales and Llano are associated with the Hill Country; the main Colorado reaches Austin and then continues toward the Coastal Plain."),
    h("The reservoir chain is part of the river's modern identity"),
    p("TWDB lists Lake Buchanan, Inks Lake, Lake LBJ, Lake Marble Falls, Lake Travis, Lake Austin and Lady Bird Lake among the reservoirs in the Colorado basin, along with many others farther upstream and downstream. Around Central Texas, that sequence makes it easy to forget that these named lakes are pieces of a river system."),
    p("Reservoirs store water, support recreation and help manage supply, but they also mean the Colorado is heavily managed. TWDB identifies balancing human water demands and environmental needs as an important issue in the basin."),
    h("Why Austin looks like a river-and-reservoir city"),
    p("In Austin, the Colorado is visible as a broad urban water corridor, but the water arriving there is the product of an enormous upstream basin. The lakes above the city are not isolated attractions; they are connected storage on the same river. Downstream, the Colorado continues through a very different landscape before reaching Matagorda Bay."),
    h("How to read the Colorado basin on a Texas map"),
    p("To follow the Texas Colorado, start west of the Hill Country and move downstream through its tributaries and reservoir chain rather than treating Austin as the beginning of the story. The Concho, Llano, San Saba and Pedernales connect distinct landscapes to the same drainage system. Lake Buchanan and the Highland Lakes then make the managed character of the river especially visible. That upstream-to-downstream view explains why conditions far from Austin can still belong to the same Colorado River water story."),
    h("What this river teaches about Texas water"),
    list(
      "Long rivers can have relatively modest average flow when much of the watershed is dry.",
      "Tributaries connect West Texas, the Hill Country, Austin and the Coastal Plain inside one basin.",
      "Named lakes can be sequential reservoirs on a single river system.",
      "Urban water, recreation and environmental flows all depend on the same connected watershed.",
      "The basin changes character dramatically from its western headwaters to the Gulf Coast."
    ),
    h("The Colorado is a map of Central Texas water"),
    p("Following the Texas Colorado from west to east explains a surprising amount about the state. The river links dry interior country to spring-fed tributaries, a reservoir chain, one of Texas' largest cities and finally a coastal bay. It is a river where geography and infrastructure are almost impossible to separate—and that is exactly why it belongs at the center of any explanation of Texas water."),
  ],
};

export const texasGuadalupeRiverGuideArticle: Article = {
  id: "evergreen-texas-guadalupe-river-guide", brandId: "texasdefined", slug: "texas-guadalupe-river-guide",
  title: "The Guadalupe River Explained: Springs, Canyon Lake and a Hill Country River",
  dek: "The Guadalupe begins in the Hill Country, receives important spring-fed tributaries and flows toward San Antonio Bay. Its basin makes the groundwater-surface-water connection unusually easy to see.",
  category: "lakes-rivers",
  hero: { src: "/images/editorial/texas-guadalupe-river.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  internalLinks: [riversLink, basinsLink, aquifersLink, reservoirsLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp", label: "TWDB Guadalupe River Basin", description: "Official basin overview describing the river, tributaries, reservoirs and groundwater-surface-water issue." },
    { href: "https://tpwd.texas.gov/state-parks/guadalupe-river", label: "Guadalupe River State Park", description: "Official TPWD visitor information for public river access, recreation and current park conditions." },
  ], relatedCollections: [], relatedDestinations: ["guadalupe-river-state-park"],
  body: [
    p("The Guadalupe is the river many Texans picture when they think about the Hill Country: clear water, limestone, cypress roots and recreation. But the basin is more complicated than a float trip. It connects spring-fed streams, aquifers, Canyon Lake, fast-growing communities and a river that ultimately leaves the hills and flows toward San Antonio Bay."),
    h("Where the Guadalupe begins and where it goes"),
    p("TWDB traces the Guadalupe from the confluence of its North and South forks in Kerr County to San Antonio Bay. The basin is entirely within Texas. Important streams inside it include the Blanco, Comal and San Marcos rivers as well as Sandies and Coleto creeks."),
    p("That list matters because some of the best-known spring systems in Central Texas feed rivers inside the same basin. The Guadalupe is therefore a good place to see how groundwater can become surface water and how aquifer conditions can show up in river flow."),
    h("Groundwater and river flow are connected here"),
    p("TWDB identifies overpumping of underlying aquifers as a major concern in the Guadalupe basin. Cities and irrigators have historically relied on groundwater, and because groundwater and surface water interact, heavy pumping can reduce base flows in the Guadalupe and tributaries."),
    p("Base flow is the portion of streamflow sustained between rain events, often by groundwater discharge. In a spring-influenced river system, that connection helps explain why river conditions cannot be understood from rainfall alone."),
    h("Canyon Lake changed the river's modern water system"),
    p("Canyon Lake sits on the Guadalupe northwest of New Braunfels. TWDB identifies the project as a U.S. Army Corps of Engineers reservoir used for flood control, hydropower, water supply and recreation. Downstream communities experience a river whose flow reflects both natural watershed conditions and managed reservoir releases."),
    h("The river changes as it leaves the Hill Country"),
    p("Upstream, limestone terrain and clear water dominate the popular image of the Guadalupe. Farther downstream, the river moves into lower, warmer country and becomes part of a larger coastal drainage system. The recreational Hill Country river and the lower-basin water-supply river are the same connected system."),
    h("Why public access matters"),
    p("TPWD notes that Texas rivers provide recreation to millions of people and maintains paddling trails and leased-access programs in multiple basins. Guadalupe River State Park adds a major public access point with river frontage for swimming, paddling, fishing and other uses. Access is not the same everywhere along a Texas river, so public parks and designated access sites matter."),
    h("How to read the Guadalupe basin on a Texas map"),
    p("The Guadalupe is easiest to understand by following the change from Hill Country headwaters to the coastal plain. Its North and South forks meet in Kerr County, spring-influenced tributaries add water farther downstream, and Canyon Lake inserts a major managed reservoir into the system before the river leaves the limestone country. Continuing the map toward San Antonio Bay shows that the familiar recreation corridor is only the upper and middle portion of a connected basin with different downstream landscapes and demands."),
    h("What the Guadalupe teaches"),
    list(
      "A river can be strongly influenced by groundwater as well as direct runoff.",
      "Spring-fed tributaries make aquifer conditions visible at the surface.",
      "A major reservoir can reshape flood control, water supply and downstream flow management.",
      "The familiar Hill Country reach is only one part of a basin that continues toward the coast.",
      "Recreation, municipal supply and ecosystem needs all depend on the same connected water system."
    ),
    h("A small basin with an outsized Texas identity"),
    p("The Guadalupe basin is much smaller than the Brazos, Colorado or Rio Grande basins, but it concentrates many of the water questions Texans care about: springs, aquifer pumping, reservoirs, public river access, flood risk and rapid growth. That makes it one of the most useful rivers for understanding how Texas water works at human scale."),
  ],
};

export const texasTrinityRiverGuideArticle: Article = {
  id: "evergreen-texas-trinity-river-guide", brandId: "texasdefined", slug: "texas-trinity-river-guide",
  title: "The Trinity River Explained: The River System Behind Dallas-Fort Worth",
  dek: "The Trinity River basin is entirely inside Texas and sits beneath much of Dallas-Fort Worth's water story. Its forks, reservoirs and downstream exports connect a major metro area with the Gulf Coast.",
  category: "lakes-rivers",
  hero: { src: "/images/editorial/texas-trinity-river.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  internalLinks: [riversLink, basinsLink, reservoirsLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp", label: "TWDB Trinity River Basin", description: "Official basin overview covering the forks, reservoirs, metropolitan demand and downstream water exports." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("For millions of North Texans, the Trinity River is easy to overlook because the basin is more visible as lakes, creeks, levees and urban greenways than as one dramatic river canyon. Hydrologically, though, the Trinity is one of the most important river systems in the state."),
    h("The largest basin entirely inside Texas"),
    p("TWDB describes the Trinity Basin as the largest river basin whose watershed area lies entirely within Texas. The main river forms near Dallas where the Elm and West forks come together, then flows southeast toward Trinity Bay and the Gulf of Mexico."),
    p("The basin also includes the Clear, East, Elm and West forks plus Cedar, Chambers and Richland creeks. In a heavily urbanized region, those tributaries and forks are part of the same watershed even when they look like separate local waterways."),
    h("Dallas-Fort Worth sits in the upper basin"),
    p("TWDB specifically identifies the Dallas-Fort Worth metropolitan area as a major upper-basin demand center. That makes the Trinity a useful example of an urban river system where water supply cannot be understood by looking at the river channel alone. Reservoirs distributed around North Texas are a central part of how the region stores and manages water."),
    h("A network of reservoirs supports the metro area"),
    p("TWDB lists reservoirs such as Lewisville Lake, Grapevine Lake, Ray Roberts Lake, Lake Bridgeport, Eagle Mountain Lake, Lake Worth, Cedar Creek Reservoir, Richland-Chambers Reservoir and Lake Livingston within the basin. Different reservoirs serve different combinations of supply, flood-control and recreational purposes, but together they show how engineered storage became inseparable from the natural watershed."),
    h("The basin connects DFW to Houston-area demand"),
    p("The Trinity is not only a North Texas water story. TWDB notes that water from the lower basin is exported to the Houston area. Increasing demand in both metropolitan regions makes balancing human needs and environmental requirements an important basin issue."),
    p("That connection is easy to miss on a road map. Dallas-Fort Worth and Houston feel like separate urban systems, but statewide water infrastructure can link their needs through the same river basin."),
    h("Why the river can feel less obvious than the basin"),
    p("In many places, people interact with the Trinity system through reservoirs, tributaries, parks or flood-control corridors rather than the main stem. That does not make the river less important. It means the functional watershed is broader than the landscape most residents see day to day."),
    h("How to read the Trinity basin on a North Texas map"),
    p("A map of the Trinity makes more sense when the forks and reservoirs are treated as one network. The Elm and West forks converge near Dallas, while other forks, creeks and storage lakes spread the watershed across a much larger part of North Texas. From there the main river continues southeast toward Trinity Bay. Reading the basin this way connects familiar local names—lakes, creeks and urban corridors—to the larger water system that supports metropolitan demand and carries water toward the coast."),
    h("What the Trinity teaches"),
    list(
      "A major river basin can be heavily urban even when the river itself is not the region's dominant visual landmark.",
      "Forks and tributaries make local creeks part of a much larger watershed.",
      "Reservoir networks are fundamental to metropolitan water supply.",
      "Water can be moved between demand centers, so a basin can serve people far from the main river.",
      "Rapid growth makes water-supply planning and environmental-flow questions increasingly connected."
    ),
    h("The hidden water map under North Texas"),
    p("The Trinity explains why North Texas water is a regional system rather than a city-by-city system. Lakes that look independent on a recreation map, creeks that feel local and the river corridor through Dallas all belong to one basin that continues to the Gulf. Understanding that network makes the water infrastructure of Dallas-Fort Worth far easier to read."),
  ],
};

export const texasRioGrandeGuideArticle: Article = {
  id: "evergreen-texas-rio-grande-river-guide", brandId: "texasdefined", slug: "texas-rio-grande-river-guide",
  title: "Rio Grande in Texas: River Guide, Big Bend, Reservoirs & Border History",
  dek: "Follow the Rio Grande through Texas from El Paso and Big Bend to Amistad, Laredo, Falcon Reservoir and the Lower Rio Grande Valley, with river access, history, ecology and water-management context.",
  category: "lakes-rivers", region: "big-bend",
  hero: { src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", alt: "Blue water and limestone shoreline at Amistad in the Rio Grande basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", updatedAt: "2026-10-02", readingMinutes: 24,
  tags: ["Rio Grande", "Rio Grande Texas", "Big Bend", "Santa Elena Canyon", "Amistad Reservoir", "Falcon Reservoir", "Lower Rio Grande Valley", "Texas rivers", "Texas borderlands"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  internalLinks: [
    riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "/destination/big-bend-national-park", label: "Big Bend National Park", description: "Plan the Texas park where the Rio Grande cuts Santa Elena, Mariscal and Boquillas canyons." },
    { href: "/destination/amistad-national-recreation-area", label: "Amistad National Recreation Area", description: "Explore the international reservoir and recreation landscape near Del Rio." },
    { href: "/county/maverick", label: "Maverick County", description: "Continue downriver through Eagle Pass and a border county organized around the Rio Grande." },
    { href: "/county/webb", label: "Webb County", description: "See how the river shapes Laredo, trade, water supply and the South Texas borderlands." },
    { href: "/county/starr", label: "Starr County", description: "Follow the river into Roma, Rio Grande City and the historic lower-valley borderlands." },
    { href: "/article/texas-us-mexican-war-palo-alto-guide", label: "The U.S.–Mexican War in South Texas", description: "Add the border dispute, Nueces Strip and Treaty of Guadalupe Hidalgo to the river's political history." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/", label: "TWDB Rio Grande River Basin", description: "Official Texas basin overview covering geography, tributaries, reservoirs and interstate and international allocation." },
    { href: "https://www.nps.gov/bibe/planyourvisit/river-trips.htm", label: "NPS Big Bend river trips", description: "Official trip-planning information for Santa Elena, Mariscal, Boquillas and other Rio Grande reaches in Big Bend." },
    { href: "https://www.nps.gov/rigr/planyourvisit/riverregs.htm", label: "NPS Rio Grande river regulations", description: "Current permit, safety and river-use requirements for Big Bend and the Rio Grande Wild & Scenic River." },
    { href: "https://www.ibwc.gov/power-plants-dams/", label: "IBWC Amistad and Falcon dams", description: "Official International Boundary and Water Commission information for the two major international storage dams on the Rio Grande." },
    { href: "https://www.ibwc.gov/water-data/", label: "IBWC Rio Grande water data", description: "Current flow, reservoir and water-data resources for the international river system." },
  ],
  relatedCollections: [],
  relatedDestinations: ["big-bend-national-park", "amistad-national-recreation-area", "bentsen-rio-grande-valley-state-park"],
  body: [
    p("The Rio Grande is not one Texas landscape and not just a line on a border map. In Texas it begins as the international river at El Paso, bends through some of the most remote desert in the United States, cuts the great canyons of Big Bend, receives the Pecos and Devils rivers, widens into Amistad, passes Eagle Pass and Laredo, is stored again at Falcon, then enters the irrigated Lower Rio Grande Valley before reaching the Gulf of Mexico. To understand the river, you have to follow that entire journey."),
    p("That journey also explains why the Rio Grande is unlike every other major Texas river. The water arriving in Texas has already crossed Colorado and New Mexico. Major tributaries arrive from both the United States and Mexico. Reservoirs are operated internationally. Cities and farms depend on allocations governed by interstate compacts and international agreements. At the same time, the river is a recreation corridor, wildlife habitat, historic travel route and one of the state's defining physical features."),

    h("Rio Grande quick guide"),
    list(
      "Texas reach: the river forms the U.S.–Mexico boundary from El Paso to the Gulf of Mexico.",
      "Texas basin scale: the Rio Grande has the largest watershed area in Texas of any major river basin.",
      "Signature Texas scenery: Santa Elena, Mariscal and Boquillas canyons in Big Bend.",
      "Major Texas tributaries: the Pecos and Devils rivers, plus smaller desert and lower-valley streams.",
      "Major international reservoirs: Amistad near Del Rio and Falcon southeast of Laredo.",
      "Major Texas cities on or near the river: El Paso, Presidio, Del Rio, Eagle Pass, Laredo, Roma, Rio Grande City and Brownsville-area communities.",
      "Best-known recreation corridor: Big Bend and the Rio Grande Wild & Scenic River, where current permit and safety rules should always be checked before launching.",
      "Lower-river identity: irrigation, agriculture, border communities, wildlife habitat and one of North America's most distinctive subtropical transition zones."
    ),

    { type: "image", image: { src: "/images/editorial/rio-grande-texas-route-map.svg", alt: "Schematic route of the Rio Grande through Texas from El Paso to Big Bend, Amistad, Laredo, Falcon Reservoir, the Lower Rio Grande Valley and the Gulf of Mexico", width: 1600, height: 900 }, caption: "A simplified downstream route through Texas. This schematic is for orientation, not navigation." },

    h("Where the Rio Grande begins—and where Texas enters the story"),
    p("The Rio Grande rises in the San Juan Mountains of Colorado and flows south through New Mexico before reaching the El Paso area. The Texas Water Development Board identifies it as a 1,896-mile river overall, with 889 miles associated with Texas. From El Paso downstream, the river is the international boundary between the United States and Mexico until it reaches the Gulf."),
    p("That upstream geography matters. El Paso does not sit near the beginning of the river; it sits far downstream from the headwaters. Snowpack, reservoirs, irrigation and water-management decisions in Colorado and New Mexico are already part of the river's story before the channel becomes the Texas–Mexico boundary."),

    h("El Paso: where the river becomes Texas' international river"),
    p("At El Paso, the Rio Grande enters one of the most urbanized reaches of its Texas course. The river passes between El Paso and Ciudad Juárez, linking two large cities that share a desert environment and a water system that cannot be understood within a single municipal boundary. Levees, diversion works, irrigation infrastructure and highly managed flows make this stretch very different from the free-looking canyon river farther downstream."),
    p("For a traveler, El Paso is useful because it makes the international character of the river immediately visible. For a water planner, it demonstrates something even more important: the Rio Grande is already an allocated and engineered system long before it reaches the remote landscapes most visitors associate with West Texas."),

    h("Presidio and the Rio Conchos: a major change in the river"),
    p("Farther downstream, the Rio Grande reaches the Presidio–Ojinaga area, where the Rio Conchos enters from Mexico. The Conchos drains a large part of northern Mexico and is one of the most consequential tributaries in the lower river system. After this confluence, the Rio Grande continues toward the Big Bend country with a different hydrologic story than the river above Presidio."),
    p("This is one reason the Texas reach cannot be explained only with Texas tributaries. Water can arrive from an upstream U.S. state or from a Mexican watershed, then continue past Texas communities whose supply and ecology depend on the combined system."),

    h("Big Bend: the Rio Grande becomes a canyon river"),
    p("Big Bend is the stretch that turns the Rio Grande from an abstract boundary into one of Texas' most dramatic landscapes. The river arcs around the southern edge of Big Bend National Park and cuts three major canyons—Santa Elena, Mariscal and Boquillas—through resistant rock. Here, the international boundary can be a ribbon of water only a short distance across, while cliffs rise hundreds or more than a thousand feet above the channel."),
    p("The National Park Service treats the Rio Grande as a central part of the park experience. Visitors can reach overlooks, short hiking trails, historic sites and river-access points, while properly prepared river runners can float designated segments. Conditions vary enormously with flow, weather and the length of trip, so a beautiful canyon view should not be confused with easy river travel."),

    { type: "image", image: { src: "/images/explore/national-parks/big-bend-national-park.jpg", alt: "Big Bend National Park landscape above the Rio Grande canyon country in West Texas", width: 1600, height: 2133, credit: "Betty Alex (U.S. National Park Service) · Public domain · Wikimedia Commons" }, caption: "Big Bend is the most visually dramatic Texas reach of the Rio Grande, where the river cuts through desert and limestone canyon country." },

    h("Santa Elena Canyon: the classic Rio Grande view"),
    p("Santa Elena Canyon is the most recognizable Rio Grande scene in Texas. The river slices through a massive limestone wall along the western side of Big Bend National Park, with Mexico on one side and Texas on the other. A popular trail approaches the canyon mouth, while river trips can enter the gorge when conditions and regulations permit."),
    p("The important planning point is that river conditions are not fixed. A section that looks gentle at one flow can become technically different after a rise, and low water can create its own problems. Anyone planning a float should use current National Park Service river information rather than treating a general travel article as a launch guide."),

    h("Mariscal and Boquillas: the river keeps changing"),
    p("Mariscal Canyon is shorter and more remote, while Boquillas Canyon carries the river past enormous limestone walls on the eastern side of the park. NPS describes Boquillas as one of the park's three major Rio Grande canyons and provides both an overlook and a trail to the canyon entrance. Downstream, the protected Rio Grande Wild & Scenic River continues beyond the national park boundary."),
    p("Near Boquillas, the river is also part of a legal international crossing. The Boquillas Port of Entry allows eligible visitors with proper documents to cross to Boquillas del Carmen, Mexico, when the port is open. Hours and requirements can change, so visitors should verify the current NPS and border-entry information before planning around the crossing."),

    h("Can you paddle the Rio Grande in Big Bend?"),
    p("Yes, but the answer depends on the reach, water level, trip length and current regulations. NPS identifies multiple river-trip options, from the popular Santa Elena segment to longer Boquillas and Lower Canyons trips. A backcountry use permit is required before placing or operating watercraft on the Rio Grande within Big Bend National Park, and additional rules apply to overnight trips downstream in the Wild & Scenic River corridor."),
    p("That is why this guide treats paddling as a planning category rather than a promise that any particular section is floatable on a given date. The Rio Grande is highly variable. Check current flow, weather, access, permit and take-out information directly with the National Park Service before launching."),

    h("The Pecos River joins the Rio Grande above Amistad"),
    p("East of Big Bend, the Pecos River enters the Rio Grande near the upper end of Amistad Reservoir. The Pecos drains an enormous arid watershed stretching through New Mexico and West Texas. Its confluence is one of the best reminders that the Rio Grande basin is a network, not a single channel."),
    p("The Pecos also brings its own interstate water-management history. The Pecos River Compact between New Mexico and Texas is one of several agreements that shape water in the larger Rio Grande system. A map that follows only the main stem misses these legal and hydrologic connections."),

    h("The Devils River adds one of Texas' clearest spring-fed tributaries"),
    p("The Devils River enters the Rio Grande system at Amistad from the north. It is famous for clear water, limestone country and a relatively undeveloped corridor. That character contrasts sharply with the Rio Grande's broad international watershed, but the two become one system at the reservoir."),
    p("This confluence is a good example of why Texas rivers can look unrelated in photographs while still being directly connected. A spring-fed tributary, a desert-border river and a large international reservoir can all be parts of the same basin."),

    h("Amistad: where the Rio Grande becomes a vast international reservoir"),
    p("Near Del Rio and Ciudad Acuña, Amistad Dam impounds the Rio Grande into one of the river's two major international reservoirs in Texas. The International Boundary and Water Commission says Amistad was built primarily for flood control and water-conservation storage for both countries, with hydroelectric generation also part of the project."),
    p("For travelers, Amistad National Recreation Area transforms the river into a broad reservoir landscape of open water, desert shoreline and limestone. Boating, fishing and shoreline recreation make this one of the most accessible places to experience the Rio Grande basin without undertaking a remote canyon trip."),
    p("For the water system, the reservoir has another role entirely: it stores and regulates water in a basin where runoff is limited and highly variable. The same place can therefore be understood as a recreation destination, an international infrastructure project and a central piece of downstream water management."),

    h("Eagle Pass and Maverick County: the river as city edge"),
    p("Below Amistad, the Rio Grande passes Eagle Pass and Piedras Negras. Here the river again becomes an urban border rather than a remote desert corridor. Bridges, water-supply infrastructure, trade and daily cross-border relationships dominate the landscape more than canyon scenery."),
    p("This is also where the river's role as a municipal resource becomes impossible to separate from its political role. The same channel that defines the international line also supports communities on both banks."),

    h("Laredo and Webb County: one of the river's major urban reaches"),
    p("At Laredo and Nuevo Laredo, the Rio Grande passes one of the largest trade gateways on the U.S.–Mexico border. The river is a water source, an international boundary and the physical line around which a binational metropolitan area developed. Upstream releases, reservoir storage, water quality and drought conditions all matter here."),
    p("A statewide guide should not treat Laredo as a side note. The city shows how the Rio Grande shifts identities again: from national-park river to reservoir system to a heavily used urban waterway supporting one of North America's most important commercial corridors."),

    h("Falcon Reservoir: the second great storage point"),
    p("Farther downstream, Falcon Dam creates Falcon International Reservoir between Texas and Tamaulipas. Like Amistad, Falcon is jointly tied to flood control, conservation storage and hydropower. Together, Amistad and Falcon are the two dominant storage projects on the international reach of the river."),
    p("Falcon also marks a geographic transition. Upstream, much of the river passes through dry South Texas brush country. Downstream, the river increasingly enters the agricultural and urban system associated with the Lower Rio Grande Valley."),

    h("Roma and Rio Grande City: historic settlements along the lower river"),
    p("Starr County contains some of the Rio Grande's strongest surviving borderland townscapes. Roma's historic district looks across the river toward Mexico, while Rio Grande City grew from a river crossing and trade corridor. These communities help explain why the lower river was a transportation and settlement axis long before modern highways and international bridges."),
    p("The river here is neither the canyon wilderness of Big Bend nor the large open water of Amistad. It is a lived border landscape, surrounded by towns, ranch country, irrigated land and a long record of movement between both sides."),

    h("The Lower Rio Grande Valley: irrigation changed the landscape"),
    p("By the time the river reaches Hidalgo and Cameron counties, the surrounding landscape has changed again. Large irrigation networks helped transform the Lower Rio Grande Valley into one of Texas' major agricultural regions, historically supporting citrus, vegetables and other crops. Cities such as Mission, McAllen, Pharr, Edinburg, Harlingen and Brownsville grew within this larger river-and-irrigation economy even when not every city sits directly on the main channel."),
    p("The term 'Valley' can be misleading to visitors expecting a steep mountain valley. The Lower Rio Grande Valley is largely a broad, low coastal plain. Its identity comes from the river, irrigation, subtropical climate, border culture and ecological transition rather than dramatic relief."),

    { type: "image", image: { src: "/images/state-parks/world-birding-center-bentsen-rio-grande-valley-state-park.jpg", alt: "Woodland and resaca habitat at Bentsen-Rio Grande Valley State Park in South Texas", width: 1600, height: 800, credit: "William L. Farr · CC BY-SA 4.0 · Wikimedia Commons" }, caption: "The lower basin supports subtropical thornscrub, resacas and exceptional bird habitat that looks completely different from the river's West Texas reaches." },

    h("Why the lower river is an ecological crossroads"),
    p("The lower basin sits where temperate and subtropical species overlap. Rio Grande floodplain forests, resacas, thornscrub and restored habitat support wildlife that many visitors associate more with northeastern Mexico than with the rest of Texas. The region is especially famous for birding because numerous tropical species reach or approach the northern edge of their U.S. range here."),
    p("Bentsen-Rio Grande Valley State Park and other World Birding Center sites preserve pieces of this habitat. They are important not because they show a pristine version of the entire river, but because they protect remnants of a floodplain ecosystem heavily altered elsewhere by agriculture, cities, roads, levees and water-control infrastructure."),

    h("Does the Rio Grande always reach the Gulf?"),
    p("The river's Gulf outlet is the end of the basin, but the mouth is dynamic. Sediment, waves, storms, tides, channel conditions and low flows can all change the final connection between river and sea. In drought and low-flow periods, the river's lower reach can look very different from the broad, continuously flowing river people imagine from a map."),
    p("That variability is part of the central Rio Grande story: a river can define nearly 900 miles of the Texas border and still have relatively low watershed yield compared with wetter Texas basins."),

    h("Why such a huge basin can produce relatively little water"),
    p("TWDB lists the Rio Grande as the largest major river basin by area in Texas, with 49,387 square miles of basin area inside the state. Yet the agency lists average annual flow far below several smaller, wetter East Texas systems. The reason is climate: much of the watershed is arid or semiarid, so evaporation is high and runoff is limited."),
    p("This distinction matters whenever someone assumes a large basin must mean a large dependable supply. Basin area tells you how much land drains toward the river. It does not tell you how much water that land will reliably produce."),

    h("The treaties and compacts are part of the river itself"),
    p("The Rio Grande cannot be explained with geography alone. Water in the system is apportioned through a layered legal framework that includes the Rio Grande Compact among Colorado, New Mexico and Texas; the Pecos River Compact between New Mexico and Texas; the 1906 Convention; and the 1944 water treaty between the United States and Mexico."),
    p("Those agreements answer different questions in different parts of the system, but the practical point is simple: Texas is not free to treat the entire river as water originating within its own borders. Upstream states and Mexico are part of the same operating reality."),

    h("What Amistad and Falcon actually do"),
    p("The two international reservoirs are sometimes described mainly as large fishing and boating lakes. They are much more than that. Their dams store water, help manage floods and support hydroelectric generation while the countries maintain separate ownership accounting within a shared reservoir system."),
    p("IBWC publishes current Rio Grande flow and reservoir data, including Amistad and Falcon storage. Those real-time conditions are more useful for understanding the system today than a fixed percentage copied into an evergreen article, because reservoir levels can change materially with drought, releases and inflows."),

    h("Fishing, boating and swimming: what visitors should know"),
    p("The Rio Grande offers fishing and boating opportunities, but rules and practical conditions vary widely by location. Amistad and Falcon are large reservoir fisheries. Big Bend river trips operate under National Park Service rules. Other reaches may have limited public access, strong currents, private-property constraints, border considerations or water-quality questions."),
    p("Swimming should never be treated as universally safe simply because a reach is scenic. Check local conditions, access rules and agency advisories. In remote West Texas, heat and rescue distance can be as important as the water itself. In reservoir country, wind and open-water exposure may be the larger hazard."),

    h("Where to experience the Rio Grande in Texas"),
    list(
      "El Paso — best for understanding the urban international river and upper Texas reach.",
      "Presidio — best for seeing the river near the Rio Conchos confluence and entering the Big Bend borderlands.",
      "Santa Elena Canyon — the classic Big Bend canyon view and one of the most recognizable river landscapes in Texas.",
      "Boquillas Canyon and Rio Grande Village — strong options for hiking, overlooks and understanding the eastern Big Bend river corridor.",
      "Amistad National Recreation Area — best for broad reservoir scenery, boating and a close look at the managed international river near Del Rio.",
      "Eagle Pass and Laredo — best for understanding the Rio Grande as an urban water source, border and trade corridor.",
      "Falcon Reservoir — another major place to see the river transformed into international storage and recreation water.",
      "Roma and Rio Grande City — strong choices for borderland history tied directly to the river.",
      "Bentsen-Rio Grande Valley State Park and the lower valley — best for the basin's subtropical ecology and birdlife."
    ),

    h("A short history of how the river became the boundary"),
    p("The Rio Grande was not always accepted as the international boundary of Texas. After the Texas Revolution, the Republic of Texas claimed the Rio Grande as its southern and western boundary, while Mexico disputed that claim and treated the Nueces River as the relevant boundary in the northeast. The contested land between the Nueces and Rio Grande became one of the central geographic disputes preceding the U.S.–Mexican War."),
    p("The Treaty of Guadalupe Hidalgo in 1848 established the Rio Grande as the international boundary from the Gulf upstream toward the El Paso area, with later agreements and boundary work addressing the practical problem of using a shifting river as a political line. Floods and channel changes made that work anything but simple."),

    h("Why the river is also a Texas cultural corridor"),
    p("Communities along the Rio Grande do not fit neatly into a story of two separate worlds divided by water. Long before the modern border, Indigenous routes, Spanish settlements, ranching networks, trade and family ties crossed what later became the international line. El Paso and Juárez, Eagle Pass and Piedras Negras, Laredo and Nuevo Laredo, Roma and Ciudad Miguel Alemán, and Brownsville and Matamoros all illustrate forms of paired border geography."),
    p("That does not erase the legal significance of the border. It explains why the river is simultaneously a national boundary and a regional connector—two roles that can exist at the same time."),

    h("How to read the Rio Grande on a Texas map"),
    p("Start at El Paso and move downstream rather than looking only for famous attractions. Trace the river southeast toward Presidio and the Rio Conchos, then through the Big Bend arc. Continue east to the Pecos and Devils confluences and Amistad. From there, follow the river past Eagle Pass and Laredo to Falcon Reservoir, then into Starr, Hidalgo and Cameron counties before the Gulf."),
    p("That route reveals the river's logic. Desert city becomes remote canyon. Canyon becomes reservoir. Reservoir becomes urban border. Urban border becomes another reservoir, then an irrigated subtropical plain. No single photograph can represent the Rio Grande because the river keeps changing what kind of Texas landscape it occupies."),

    h("Frequently asked questions about the Rio Grande in Texas"),
    p("Where is the prettiest part of the Rio Grande in Texas? For dramatic scenery, the Big Bend canyon country—especially Santa Elena Canyon—is the best-known reach. Amistad offers a very different kind of broad blue-water desert scenery, while the lower valley is more important for ecology and bird habitat than canyon views."),
    p("Can you float the Rio Grande? Yes in designated reaches, especially around Big Bend, but permits, flows, access and skill requirements matter. Use current NPS river-trip and regulation pages before planning a launch."),
    p("Is the Rio Grande entirely in Texas? No. It begins in Colorado, crosses New Mexico and then forms the Texas–Mexico boundary from El Paso to the Gulf. Its watershed also includes major tributaries in Mexico."),
    p("What are the biggest Rio Grande reservoirs in Texas? Amistad International Reservoir near Del Rio and Falcon International Reservoir downstream of Laredo are the two major international storage reservoirs on the Texas reach."),
    p("What are the most important Texas tributaries? The Pecos and Devils rivers are the most prominent Texas tributaries commonly highlighted in statewide basin descriptions, while many smaller creeks and channels also contribute to the system."),
    p("Why is the Rio Grande sometimes low? Much of the basin is arid or semiarid, and the river is heavily allocated and managed. Snowpack, drought, tributary inflows, reservoir storage, irrigation and upstream obligations all influence the amount of water moving through a particular reach."),

    h("What the Rio Grande teaches about Texas"),
    list(
      "A river can be a natural system, international boundary, water-supply network and recreation corridor at the same time.",
      "The biggest watershed in Texas does not produce the state's biggest average flow because climate matters as much as area.",
      "Big Bend's famous canyons are only one chapter in a river that also passes major cities, reservoirs and agricultural regions.",
      "Pecos, Devils and Mexican tributaries show why the river must be understood as a basin rather than a single channel.",
      "Amistad and Falcon make storage, flood control and international management visible on the landscape.",
      "The Lower Rio Grande Valley shows how irrigation, wildlife habitat, urban growth and river management overlap.",
      "Texas cannot understand this river by looking only inside Texas; the Rio Grande is interstate and international from its headwaters to its mouth."
    ),

    h("One river, several different Texases"),
    p("The Rio Grande is one of the best geographic guides to Texas because it refuses to stay one thing. At El Paso it is an urban desert river. In Big Bend it is a canyon-cutting wilderness corridor. At Amistad and Falcon it becomes international infrastructure and open water. At Eagle Pass and Laredo it is a city edge and water source. In the Lower Rio Grande Valley it supports irrigation, subtropical habitat and a dense chain of border communities before reaching the Gulf."),
    p("Follow the river from beginning to end and the central lesson is not that the Rio Grande divides Texas from Mexico. It is that this one water system connects an extraordinary range of landscapes, communities and histories—and that understanding those connections is the only way to understand the river itself."),
  ],
};

export const texasExplainedRiverProfileArticles: Article[] = [
  texasBrazosRiverGuideArticle,
  texasColoradoRiverGuideArticle,
  texasGuadalupeRiverGuideArticle,
  texasTrinityRiverGuideArticle,
  texasRioGrandeGuideArticle,
];