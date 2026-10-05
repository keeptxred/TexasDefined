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
  title: "Texas Colorado River Guide: Highland Lakes, Austin, History & Things to Do",
  dek: "Follow Texas' Colorado River from West Texas through the Highland Lakes and Austin to Matagorda Bay, with reservoirs, tributaries, recreation, ecology, flood history and places to visit.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg", alt: "Limestone river channel and flowing water in the Colorado River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", updatedAt: "2026-10-05", readingMinutes: 20,
  tags: ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Austin water", "Lake Travis", "Lake Buchanan", "Texas rivers", "Texas Hill Country"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  internalLinks: [
    riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "/article/lake-buchanan-water-system-guide", label: "Lake Buchanan water system", description: "See how the upper Highland Lakes store and move Colorado River water." },
    { href: "/article/lake-travis-water-system-guide", label: "Lake Travis water system", description: "Understand the reservoir that shapes recreation, flood storage and water supply upstream of Austin." },
    { href: "/state-park/colorado-bend-state-park", label: "Colorado Bend State Park", description: "Explore canyon country, springs and the Colorado River upstream of the Highland Lakes." },
    { href: "/state-park/inks-lake-state-park", label: "Inks Lake State Park", description: "Visit a public park in the Highland Lakes chain." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/", label: "TWDB Colorado River Basin", description: "Official basin overview with tributaries, reservoirs and water-planning context." },
    { href: "https://www.lcra.org/water/river-and-reservoir-conditions/", label: "LCRA river and reservoir conditions", description: "Current Highland Lakes levels, river conditions and lower Colorado water information." },
    { href: "https://waterdata.usgs.gov/tx/nwis/rt", label: "USGS Texas water data", description: "Current streamflow and river-stage observations across Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: ["pedernales-falls-state-park", "colorado-bend-state-park", "inks-lake-state-park"],
  body: [
    p("Texas has its own Colorado River, entirely separate from the Colorado River that carved the Grand Canyon. The Texas Colorado rises in West Texas, crosses the center of the state, runs through the Highland Lakes and Austin, and eventually reaches Matagorda Bay on the Gulf Coast."),
    p("That route makes the Colorado one of the best rivers for understanding how West Texas runoff, Hill Country tributaries, reservoirs, cities, agriculture and coastal ecosystems fit together. The river is long, but much of its watershed is relatively dry. That is why river length and water yield tell different stories."),

    h("Texas Colorado River at a glance"),
    list(
      "Source region: West Texas, with headwaters and tributaries collecting runoff before the river crosses central Texas.",
      "Mouth: Matagorda Bay on the Texas coast.",
      "Major tributaries: Concho, San Saba, Llano and Pedernales rivers, plus numerous creeks.",
      "Major reservoirs: Lake Buchanan, Inks Lake, Lake LBJ, Lake Marble Falls, Lake Travis, Lake Austin and Lady Bird Lake.",
      "Major cities and regions: San Angelo basin connections, the Hill Country, Marble Falls, Lakeway, Austin, Bastrop, La Grange and the lower coastal plain.",
      "Major uses: municipal supply, flood management, hydropower, agriculture, recreation, wildlife habitat and industrial water."
    ),

    h("Why such a long river can have modest flow"),
    p("TWDB identifies the Colorado as one of Texas' longest rivers and one of its largest basins, but its average flow is lower than several shorter rivers farther east. The explanation is climate. Large parts of the upper basin are dry, evaporation is high and rainfall can be highly variable."),
    p("This is a useful Texas water lesson. A large watershed does not guarantee a large dependable water supply. The amount of runoff a basin produces depends on rainfall, soils, vegetation, geology, reservoir losses and the timing of storms."),

    h("The upper basin begins in drier West Texas"),
    p("The upper Colorado drains broad areas of West Texas before the river approaches the Hill Country. This part of the basin is more water-constrained than the lower reaches. Long dry periods can be interrupted by intense storms that send sudden pulses downstream."),
    p("Reservoirs and tributaries in the upper basin help regulate and store that water, but drought remains a defining pressure. The upper basin is therefore a reminder that the Colorado's famous lakes near Austin depend on water collected far beyond the city's skyline."),

    h("The Concho system links West Texas to the Colorado"),
    p("The Concho River system is one of the major upper-basin networks. Tributaries around San Angelo eventually feed the Colorado, connecting West Texas communities to the same watershed that later supplies the Highland Lakes and Central Texas."),
    p("On a map, the Concho can look like a separate river system. Hydrologically, it is part of the Colorado story. Rainfall in that tributary network can influence storage and downstream conditions many miles away."),

    h("The San Saba and Llano bring the river into Hill Country terrain"),
    p("As the basin reaches central Texas, tributaries such as the San Saba and Llano add water from very different geology and landscapes. Granite, limestone, springs, ranch country and steeper valleys become more prominent."),
    p("The Llano is especially important because it helps connect the western Hill Country to the Colorado. Its clear-water reaches and rocky channel contrast sharply with broader, muddier parts of the main stem, showing how different tributaries can contribute distinct water and sediment characteristics."),

    h("Colorado Bend State Park: river, canyon and springs"),
    p("Colorado Bend State Park sits on the Colorado upstream of the Highland Lakes and is one of the best places to experience the river before it becomes a chain of large reservoirs. The park combines river access, rugged limestone-and-canyon scenery, springs and hiking."),
    p("The park also illustrates the basin's groundwater connection. Springs and seepage from limestone terrain feed local streams and help create habitats that differ from the drier uplands around them."),
    { type: "image", image: { src: "/images/state-parks/colorado-bend-state-park.jpg", alt: "Colorado River and rugged limestone country at Colorado Bend State Park", width: 1600, height: 1071, credit: "Randall Chancellor · CC BY-SA 2.0 · Wikimedia Commons" }, caption: "Upstream of the Highland Lakes, the Colorado still reads as a free-flowing river through rugged Central Texas country." },

    h("Lake Buchanan: the upper anchor of the Highland Lakes"),
    p("Lake Buchanan is the largest of the Highland Lakes by surface area and one of the key storage reservoirs in the lower Colorado system. Buchanan Dam helps store water collected from a large upstream watershed before it moves through the chain toward Austin."),
    p("For visitors, Lake Buchanan is a boating, fishing and lakeside-recreation destination. For Central Texas water planning, it is part of a managed storage system whose levels rise and fall with inflows, drought, evaporation and releases."),

    h("Inks Lake and Lake LBJ: the river becomes a chain of lakes"),
    p("Below Buchanan, the Colorado moves through Inks Lake and Lake LBJ. These reservoirs are smaller than Buchanan and Travis but make the river's managed character visually obvious: one named lake flows into another while remaining part of the same river."),
    p("Inks Lake State Park provides one of the easiest public places to experience this section, with camping, paddling, fishing and shoreline access."),
    { type: "image", image: { src: "/images/state-parks/inks-lake-state-park.jpg", alt: "Rocky shoreline and open water at Inks Lake State Park on the Colorado River", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "The Highland Lakes are not separate from the Colorado River; they are impoundments along the same connected water system." },

    h("Lake Travis: recreation, storage and drought in one landscape"),
    p("Lake Travis is the reservoir many Central Texans associate most strongly with the Colorado. Its long coves and limestone shoreline support marinas, boating, swimming areas and lakeside communities, but the reservoir is also a major storage component for the lower Colorado system."),
    p("Lake level changes can be dramatic during extended drought. Those exposed shorelines are not just a recreation issue; they are a visible measure of how much stored water remains in a system serving cities, agriculture and downstream needs."),

    h("The Pedernales joins the Colorado west of Austin"),
    p("The Pedernales River drains part of the Hill Country and enters the Colorado near Lake Travis. Its limestone channels, shallow rapids and flash-flood behavior make it one of the basin's most distinctive tributaries."),
    p("Pedernales Falls State Park is one of the best places to see that tributary geology, but visitors should treat flood warnings seriously. Hill Country streams can rise rapidly after heavy rain upstream, even when local weather appears calm."),

    h("Austin: the Colorado becomes an urban river"),
    p("Through Austin, the Colorado is transformed into a sequence of urban reservoirs and river reaches, including Lake Austin and Lady Bird Lake. Trails, bridges, paddling, parks and downtown development make this one of the most visible river corridors in Texas."),
    p("The urban appearance can hide the larger system. Water arriving in Austin reflects rainfall and reservoir storage across a much larger basin, while releases downstream affect communities, farms and ecosystems beyond the city."),
    h("Why Lady Bird Lake is still the Colorado River"),
    p("Lady Bird Lake may look like a standalone urban lake, but it is an impoundment of the Colorado. That distinction matters because the water continues downstream into the lower basin. The name of the local water body changes; the river system does not."),

    h("Downstream from Austin: Bastrop, La Grange and the lower basin"),
    p("Below Austin, the river leaves the urban reservoir chain and crosses a greener, flatter landscape. Bastrop, Smithville, La Grange and other communities sit within a lower basin shaped by agriculture, floodplains, tributaries and a warmer, more humid climate."),
    p("The river here is less visually dramatic than the Highland Lakes, but it is hydrologically important. Water released from upstream reservoirs moves through this reach on its way toward rice-growing areas, industry and the coast."),

    h("Flooding is part of the Colorado's identity"),
    p("The Colorado has a long flood history. Intense rain over the Hill Country or lower basin can send large volumes into the river quickly. The Highland Lakes system was built partly to help manage floods, especially through the large storage reservoirs."),
    p("Flood-control infrastructure reduces risk but does not eliminate it. Tributaries below major dams can still produce dangerous rises, and extreme storms can create conditions beyond ordinary operating ranges. Check National Weather Service warnings and USGS gauges during wet weather."),

    h("Why the Highland Lakes matter for water supply"),
    p("The Highland Lakes are often described primarily as recreation destinations, but their deeper importance is storage. Central Texas rainfall is highly variable, so reservoirs capture water during wetter periods for use during drier ones."),
    p("That role is increasingly visible during drought. When inflows stay low, lake levels fall, recreation access changes and water-use restrictions can tighten. The same shoreline can therefore be a tourism landscape and a public-water indicator at the same time."),

    h("Fishing, swimming and boating"),
    p("The Colorado basin offers extensive fishing and boating, especially in the Highland Lakes. Species vary by reservoir and river reach, with bass, catfish, sunfish and other freshwater species common in different parts of the system."),
    p("Swimming conditions are site-specific. Use designated public areas where available, watch for changing lake levels, submerged hazards, boat traffic and harmful algal or bacterial advisories. In the Hill Country, flash flooding can change conditions quickly."),

    h("Wildlife and ecology along the Colorado"),
    p("Because the basin crosses such different climates, its habitats change dramatically from west to east. Upper reaches include drier grassland and scrub. Hill Country sections add limestone canyons, springs and riparian woodland. Lower reaches support broader floodplain forests, wetlands and coastal habitats."),
    list(
      "Hill Country: cypress, oak-juniper woodland, limestone springs and rocky tributaries.",
      "Reservoirs: open-water habitat for fish, waterfowl and shoreline wildlife.",
      "Lower river: bottomland hardwoods, sandbars and broad floodplain habitat.",
      "Coastal reach: freshwater and sediment entering Matagorda Bay and connected estuarine systems."
    ),

    h("Where the Colorado reaches the coast"),
    p("The river eventually enters Matagorda Bay, where freshwater from the basin meets the coastal estuary. That connection is important for salinity, sediment and ecological conditions in the bay."),
    p("It also shows why upstream water decisions can have coastal consequences. A river does not stop mattering once it leaves the last city; its final flows support an estuarine environment with fisheries, wetlands and wildlife."),

    h("Best places to experience the Texas Colorado"),
    list(
      "Colorado Bend State Park — best for a rugged pre-reservoir river landscape.",
      "Lake Buchanan — best for seeing the scale of upper Highland Lakes storage.",
      "Inks Lake State Park — best for easy public access to the reservoir chain.",
      "Lake Travis — best for dramatic reservoir-level changes, boating and limestone shoreline.",
      "Austin — best for seeing the Colorado as an urban recreation corridor.",
      "Bastrop and La Grange — best for understanding the lower river outside the big-city setting.",
      "Matagorda Bay — best for seeing where the river becomes part of the Gulf Coast system."
    ),

    h("A three-day Colorado River road trip"),
    p("Day one: begin around Colorado Bend State Park and Lake Buchanan to see the river before and after it enters the Highland Lakes system."),
    p("Day two: follow the chain through Inks Lake and Lake Travis, then continue into Austin to see the river as an urban reservoir corridor."),
    p("Day three: continue downstream through Bastrop and La Grange toward the lower coastal plain. The full trip to Matagorda Bay is long, but the changing landscape makes the river's statewide scale obvious."),

    h("Frequently asked questions about the Texas Colorado River"),
    h("Is the Colorado River in Texas the same river as the Grand Canyon Colorado?"),
    p("No. Texas has a separate Colorado River that begins and ends within the state. The Colorado River of the western United States flows through the Grand Canyon and reaches Mexico."),
    h("Does the Texas Colorado River flow through Austin?"),
    p("Yes. Through Austin, the river is impounded as Lake Austin and Lady Bird Lake before continuing downstream."),
    h("What are the Highland Lakes?"),
    p("The Highland Lakes are a chain of reservoirs on the lower Colorado in Central Texas, including Buchanan, Inks, LBJ, Marble Falls, Travis and Austin."),
    h("Can you swim in the Colorado River?"),
    p("Swimming depends on the specific lake or river reach. Use designated public areas when available and check current water, weather and health advisories."),
    h("Can you kayak the Colorado River?"),
    p("Yes, many sections and reservoirs are paddled. Conditions vary by flow, wind, dam releases, access and boat traffic, so check the specific reach before launching."),
    h("Why does Lake Travis get so low?"),
    p("Lake Travis is a storage reservoir in a highly variable climate. Extended drought, low inflows, evaporation and water use can lower the lake substantially."),
    h("Where does the Texas Colorado River end?"),
    p("It reaches Matagorda Bay on the Texas coast."),
    h("What is the best place to see the river?"),
    p("For natural scenery, Colorado Bend and the Hill Country reservoirs are strong choices. For an urban experience, Austin makes the river especially visible."),

    h("What the Colorado teaches about Texas"),
    p("The Texas Colorado is a long river running through a relatively dry basin, which means storage matters enormously. Its famous lakes are not separate attractions but pieces of one managed river system."),
    p("Follow the river from West Texas to Matagorda Bay and the pattern becomes clear: tributaries collect water, reservoirs hold it, cities and farms depend on it, floods reshape it and the remaining flow eventually becomes part of a coastal estuary. That connected story is the real Colorado River guide.")
  ],
};

export const texasGuadalupeRiverGuideArticle: Article = {
  id: "evergreen-texas-guadalupe-river-guide", brandId: "texasdefined", slug: "texas-guadalupe-river-guide",
  title: "Guadalupe River Guide: Hill Country, Canyon Lake, Tubing, Fishing & History",
  dek: "Follow the Guadalupe from Kerr County springs and cypress-lined Hill Country reaches through Canyon Lake, New Braunfels, Seguin and the coastal plain to San Antonio Bay.",
  category: "lakes-rivers",
  hero: { src: "/images/editorial/texas-guadalupe-river.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  authorId: "a-marisol", publishedAt: "2026-08-16", updatedAt: "2026-10-05", readingMinutes: 20,
  tags: ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "New Braunfels tubing", "Texas springs", "Guadalupe fishing", "Texas rivers"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  internalLinks: [
    riversLink, basinsLink, aquifersLink, reservoirsLink, collectionLink,
    { href: "/state-park/guadalupe-river-state-park", label: "Guadalupe River State Park", description: "Plan a public river visit in the Hill Country." },
    { href: "/state-park/palmetto-state-park", label: "Palmetto State Park", description: "See a very different lower-basin landscape near the San Marcos-Guadalupe system." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp", label: "TWDB Guadalupe River Basin", description: "Official basin overview covering the river, tributaries, reservoirs and groundwater connection." },
    { href: "https://tpwd.texas.gov/state-parks/guadalupe-river", label: "Guadalupe River State Park", description: "Official TPWD visitor information and current park conditions." },
    { href: "https://waterdata.usgs.gov/tx/nwis/rt", label: "USGS Texas water data", description: "Current streamflow and river-stage observations for Texas." },
  ], relatedCollections: [],
  relatedDestinations: ["guadalupe-river-state-park", "palmetto-state-park"],
  body: [
    p("The Guadalupe is one of the rivers that most clearly shows why Texas water cannot be divided neatly into 'river water' and 'groundwater.' It begins in the Hill Country, is influenced by springs and aquifers, passes through Canyon Lake and New Braunfels, receives the San Marcos River, then crosses the coastal plain before reaching San Antonio Bay."),
    p("For visitors, the Guadalupe is tubing, paddling, fishing, cypress shade and clear Hill Country water. For communities, it is water supply, flood risk, reservoir storage, habitat and a river whose flow can change dramatically with drought and rainfall."),

    h("Guadalupe River at a glance"),
    list(
      "Headwaters: Kerr County and the central Texas Hill Country.",
      "Mouth: San Antonio Bay on the Texas coast.",
      "Major tributaries: Comal, San Marcos and Blanco river systems, plus numerous Hill Country creeks.",
      "Major reservoir: Canyon Lake.",
      "Major places: Kerrville, Comfort, Canyon Lake, New Braunfels, Seguin, Gonzales, Victoria-region connections and the coastal plain.",
      "Major recreation: tubing, paddling, swimming, fishing, camping and wildlife watching."
    ),

    h("Where the Guadalupe begins"),
    p("The Guadalupe rises in Kerr County, where multiple forks and spring-influenced streams gather through the Hill Country. The upper river is defined by limestone, shallow riffles, clear pools, bald cypress and a relatively narrow valley."),
    p("That scenery is not accidental. Hill Country geology allows rainfall to move through fractured limestone, recharge aquifers and reappear through springs and seeps. The river's flow is therefore tied closely to groundwater conditions."),

    h("Kerrville and the upper river"),
    p("Around Kerrville, the Guadalupe becomes a defining part of the city landscape. Parks, crossings and riverside development make the channel visible, but the upper river remains sensitive to drought."),
    p("During wet periods, the river can look abundant and clear. During prolonged dry weather, spring flow and tributary contribution can fall sharply. That variability is part of the river's natural behavior, not a contradiction."),

    h("Why cypress trees define the Hill Country Guadalupe"),
    p("Bald cypress line many Hill Country reaches because they tolerate periodic flooding and root near reliable water. Their shade, exposed roots and broad trunks have become one of the visual signatures of the river."),
    p("They are also reminders that floods are normal ecological events. The same high water that threatens people and infrastructure can redistribute sediment, reshape banks and support floodplain processes."),

    h("Guadalupe River State Park: one of the best public access points"),
    p("Guadalupe River State Park protects a scenic reach of river north of San Antonio. Limestone banks, cypress trees, shallow gravel bars and clear water make it one of the most accessible places to experience the river without relying on private tubing access."),
    p("Activities vary with conditions, but the park supports hiking, camping, paddling, fishing and water recreation when the river is suitable. Visitors should check current flow and park notices because drought or flooding can change access."),
    { type: "image", image: { src: "/images/state-parks/guadalupe-river-state-park.jpg", alt: "Clear water and cypress-lined banks at Guadalupe River State Park", width: 1600, height: 1115, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "The upper Guadalupe is famous for limestone, cypress shade and clear Hill Country water." },

    h("Canyon Lake: the river becomes a major reservoir"),
    p("Canyon Lake impounds the Guadalupe upstream of New Braunfels. The reservoir is a central part of the modern river system, providing flood-control and water-supply benefits while supporting boating, fishing and lakeside recreation."),
    p("The dam also changes downstream flow. Releases can make the river below Canyon Dam very different from an undammed Hill Country stream, especially during drought or high-water operations."),

    h("The Guadalupe below Canyon Dam"),
    p("The stretch below Canyon Dam is one of Texas' most famous recreation reaches. Cold releases from deeper reservoir water can support trout stocking and create conditions unlike those farther downstream."),
    p("This section is also heavily used for tubing and paddling. Flow matters enormously: too little water can expose rocks and make trips difficult, while high releases can create dangerous current. Trip operators and visitors need current flow information, not assumptions based on a previous season."),

    h("New Braunfels: where the Comal meets the Guadalupe"),
    p("At New Braunfels, the Guadalupe receives the Comal River, one of the shortest major rivers in Texas and a strongly spring-fed system. The Comal's clear, relatively constant spring water contrasts with the more variable Guadalupe."),
    p("This confluence makes New Braunfels one of the best places in Texas to see the relationship between aquifers, springs, recreation and river flow. It is also why groundwater management in the Edwards Aquifer can matter to surface-water ecosystems."),

    h("Tubing the Guadalupe"),
    p("Tubing is part of the Guadalupe's public identity, especially around New Braunfels and downstream reaches. But tubing conditions change with flow, weather, dam releases, local rules and access."),
    p("A safe tubing plan should include current flow, legal public or commercial access, life-jacket needs, weather, trip length and local restrictions. A river that was easy to float last weekend may be very different after a storm or release change."),

    h("The San Marcos River joins the Guadalupe"),
    p("The San Marcos River enters the Guadalupe farther downstream, bringing another major spring-fed system into the basin. San Marcos Springs, fed by the Edwards Aquifer, sustain one of Texas' most biologically distinctive river environments."),
    p("Once the San Marcos joins the Guadalupe, the river carries water that originated in several very different settings: Hill Country runoff, Canyon Lake storage and powerful aquifer-fed springs."),

    h("Seguin and the middle Guadalupe"),
    p("Around Seguin, the Guadalupe is broader and more developed than the upper Hill Country reaches. Dams, impoundments, homes, bridges and recreation have long shaped the local river landscape."),
    p("This area shows why the Guadalupe cannot be described only as a tubing river. It is also an infrastructure corridor and community water resource with a long history of mills, power generation and settlement."),

    h("Gonzales and the river's Texas history"),
    p("The Guadalupe basin is closely tied to early Texas settlement and the Texas Revolution. Gonzales, near the Guadalupe, became one of the most important early flashpoints of the conflict in 1835."),
    p("Long before Anglo-American settlement, Indigenous peoples traveled and lived throughout the basin. Spanish colonial routes, ranching, missions and later town development all used the river corridor as a geographic reference."),

    h("The river leaves the Hill Country"),
    p("As the Guadalupe moves southeast, limestone hills give way to flatter prairie and coastal-plain landscapes. The channel broadens, water becomes more sediment-rich and floodplains become more extensive."),
    p("This transition is one of the most important parts of the river story. The Guadalupe most visitors photograph near New Braunfels is only one reach of a river that eventually becomes a lower-coast waterway."),

    h("Flooding and flash floods"),
    p("The Guadalupe has a serious flood history. Steep Hill Country tributaries, intense thunderstorms and thin soils can move water into channels quickly. Downstream, broader floodplains can carry large volumes through communities and agricultural areas."),
    p("Canyon Lake provides flood-control storage, but it cannot eliminate all risk. Heavy rain below the dam can raise downstream tributaries independently, and extreme basin-wide events can overwhelm normal expectations. Check National Weather Service warnings and USGS gauges during wet weather."),

    h("Why groundwater matters so much"),
    p("The Guadalupe basin receives important spring flow from aquifer systems, especially through the Comal and San Marcos. Those springs support endangered species, recreation, municipal economies and base flow during dry periods."),
    p("That means pumping and aquifer levels are not merely underground concerns. Groundwater decisions can affect visible rivers, spring discharge and downstream habitat."),

    h("Fishing the Guadalupe"),
    p("Fishing changes by reach. The cold-water section below Canyon Dam is nationally known for a put-and-take trout fishery during cooler months, while other sections support bass, sunfish, catfish and native species."),
    p("Regulations can vary by location and season. Check current Texas Parks and Wildlife rules for the exact reach, especially below Canyon Dam where special regulations may apply."),

    h("Swimming and paddling"),
    p("Many reaches are used for swimming and paddling, but the river should never be treated as uniformly safe. Current, submerged rocks, low-head dams, private property, storm runoff and changing releases all matter."),
    p("Use established public access or reputable operators, wear appropriate flotation, and avoid entering the river when flood warnings are active."),

    h("Wildlife and ecology"),
    p("The upper river supports cypress-lined riparian habitat, turtles, fish, birds and Hill Country mammals. Spring-fed tributaries support rare aquatic species. Lower reaches add wider floodplain forests, wetlands and coastal-plain wildlife."),
    p("The basin's ecology is especially sensitive because some species depend on relatively stable spring flow. Drought and groundwater decline can therefore create ecological effects long before the main river appears completely dry."),

    h("Palmetto State Park and the lower-basin transition"),
    p("Palmetto State Park, near the San Marcos River portion of the basin, protects a humid lowland landscape that feels very different from the classic Hill Country Guadalupe. Dwarf palmettos, swampy habitat and riparian forest show how quickly the basin changes as it moves toward the coastal plain."),
    { type: "image", image: { src: "/images/state-parks/palmetto-state-park.jpg", alt: "Lush riparian vegetation at Palmetto State Park in the Guadalupe basin", width: 1600, height: 1066, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "Downstream, the Guadalupe basin becomes flatter, greener and more humid than its Hill Country headwaters." },

    h("Where the Guadalupe reaches the coast"),
    p("The Guadalupe ultimately reaches San Antonio Bay, connecting interior Texas runoff and spring water to a coastal estuary. Freshwater inflow influences salinity and habitat conditions in the bay."),
    p("This coastal connection is why water management upstream can matter far beyond recreation towns. The river supports a linked system from aquifer-fed springs to estuarine habitat."),

    h("Best places to experience the Guadalupe"),
    list(
      "Kerrville — best for an accessible upper-river city experience.",
      "Guadalupe River State Park — best for public Hill Country river access and cypress scenery.",
      "Canyon Lake — best for reservoir boating, fishing and understanding river regulation.",
      "New Braunfels — best for tubing culture and the Comal-Guadalupe spring connection.",
      "Seguin — best for seeing the middle river as a community and infrastructure corridor.",
      "Gonzales — best for adding early Texas history to the river trip.",
      "Palmetto State Park — best for seeing the basin transition toward the coastal plain."
    ),

    h("When to visit"),
    list(
      "Spring: green scenery and comfortable weather, but thunderstorms can create dangerous rises.",
      "Summer: peak tubing season, with high heat and variable flows; reservations and access planning matter.",
      "Fall: often excellent for camping, paddling and lower crowds.",
      "Winter: cooler, quieter and important for trout fishing below Canyon Dam."
    ),

    h("Frequently asked questions about the Guadalupe River"),
    h("Where does the Guadalupe River start?"),
    p("The river rises in Kerr County in the Texas Hill Country, where multiple forks and spring-influenced streams combine."),
    h("Where does the Guadalupe River end?"),
    p("It reaches San Antonio Bay on the Texas coast."),
    h("Can you tube the Guadalupe River?"),
    p("Yes, tubing is popular in several reaches, especially around New Braunfels, but current flow, access and local rules should be checked before every trip."),
    h("Can you swim in the Guadalupe River?"),
    p("Many public areas allow swimming when conditions are suitable. Safety depends on current, depth, weather, access and local advisories."),
    h("Why is the Guadalupe River so clear?"),
    p("Many Hill Country reaches receive clear spring and groundwater contributions and flow over limestone and gravel. Clarity can change quickly after rain."),
    h("Does Canyon Lake control the Guadalupe River?"),
    p("Canyon Dam strongly influences the river below the reservoir, but tributaries and rainfall downstream can still change flow independently."),
    h("What fish are in the Guadalupe River?"),
    p("Depending on the reach, anglers may find bass, sunfish, catfish and stocked rainbow trout below Canyon Dam during the cooler season."),
    h("Why does the Guadalupe flood so fast?"),
    p("Steep Hill Country terrain, intense thunderstorms and fast runoff can move water into the river quickly, creating flash-flood conditions."),

    h("What the Guadalupe teaches about Texas water"),
    p("The Guadalupe makes groundwater visible. Springs, aquifers, tributaries, Canyon Lake and downstream estuaries all belong to one connected system."),
    p("That is why the river is more than a recreation destination. It is one of Texas' clearest examples of how geology, groundwater, flood control, tourism, ecology and coastal water needs overlap in a single basin.")
  ],
};

export const texasTrinityRiverGuideArticle: Article = {
  id: "evergreen-texas-trinity-river-guide", brandId: "texasdefined", slug: "texas-trinity-river-guide",
  title: "Trinity River Guide: Dallas-Fort Worth, Reservoirs, Wildlife & Gulf Coast",
  dek: "Follow the Trinity River system from its North Texas forks through Dallas-Fort Worth, East Texas reservoirs and bottomland forests to Trinity Bay, with water supply, flooding, recreation and history.",
  category: "lakes-rivers",
  hero: { src: "/images/editorial/texas-trinity-river.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", updatedAt: "2026-10-05", readingMinutes: 20,
  tags: ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Lake Livingston", "Texas reservoirs", "Trinity River wildlife", "Texas rivers"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  internalLinks: [
    riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "/state-park/lake-livingston-state-park", label: "Lake Livingston State Park", description: "Explore the lower Trinity's largest reservoir landscape." },
    { href: "/state-park/cedar-hill-state-park", label: "Cedar Hill State Park", description: "Visit Joe Pool Lake in the upper Trinity watershed near Dallas-Fort Worth." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp", label: "TWDB Trinity River Basin", description: "Official basin overview covering the forks, reservoirs, metropolitan demand and downstream transfers." },
    { href: "https://waterdata.usgs.gov/tx/nwis/rt", label: "USGS Texas water data", description: "Current streamflow and river-stage observations for Texas." },
  ], relatedCollections: [],
  relatedDestinations: ["lake-livingston-state-park", "cedar-hill-state-park"],
  body: [
    p("The Trinity River is easy to overlook because much of its upper basin is hidden beneath the urban geography of Dallas-Fort Worth. Yet the river system is one of the most important pieces of infrastructure and ecology in Texas, linking the Metroplex to reservoirs, East Texas forests, agricultural land and Trinity Bay near the Gulf."),
    p("Unlike the Rio Grande or Red River, the Trinity basin lies entirely within Texas. That makes it a particularly useful example of how one state manages a river from urban headwaters and reservoirs to the coast."),

    h("Trinity River at a glance"),
    list(
      "Basin: the largest major river basin located entirely within Texas.",
      "Upper system: West Fork, Clear Fork, Elm Fork and East Fork networks across North Texas.",
      "Major reservoirs: Lake Bridgeport, Eagle Mountain, Lake Worth, Grapevine, Lewisville, Ray Roberts, Lavon, Ray Hubbard and Lake Livingston, among others.",
      "Major cities and regions: Fort Worth, Dallas, the broader Metroplex, East Texas and the upper Gulf Coast.",
      "Mouth: Trinity Bay, part of the Galveston Bay system.",
      "Major roles: municipal water supply, flood management, recreation, wildlife habitat, wastewater return flows and downstream freshwater inflow."
    ),

    h("Why the Trinity is the river system behind Dallas-Fort Worth"),
    p("Dallas-Fort Worth sits across several forks and tributaries of the upper Trinity. The modern metro area can make the watershed difficult to see because highways, levees, reservoirs and urban development obscure the original drainage pattern."),
    p("But rainfall across the Metroplex still follows that pattern. Water moves into creeks, forks and reservoirs before joining the main Trinity and eventually flowing southeast toward the coast."),

    h("The West Fork and Fort Worth"),
    p("The West Fork runs through the Fort Worth side of the basin and is heavily influenced by reservoirs built for water supply and flood control. Lake Bridgeport, Eagle Mountain Lake and Lake Worth are part of this connected system."),
    p("Fort Worth's river corridor has become a recreation and redevelopment focus, but the underlying purpose of the basin remains practical: move stormwater safely, store water and maintain supply for a growing metropolitan region."),

    h("The Clear Fork"),
    p("The Clear Fork joins the West Fork in Fort Worth and drains part of the western Metroplex. Like other urban streams, it has been altered by flood-control projects, development and engineered channels."),
    p("Its presence is easy to miss from a regional map, yet it is one of the pieces that explain why Fort Worth parks, trails and flood infrastructure follow certain corridors."),

    h("The Elm Fork and northern reservoirs"),
    p("The Elm Fork drains parts of North Texas and is connected to major reservoirs including Ray Roberts and Lewisville. Those lakes are not isolated recreation sites; they are part of the water-supply and flood-management network serving the Metroplex."),
    p("As development expands northward, watershed management becomes more important because pavement and drainage changes can alter how quickly stormwater reaches creeks and reservoirs."),

    h("The East Fork and eastern Metroplex"),
    p("The East Fork system drains the eastern side of Dallas-Fort Worth and includes reservoirs such as Lavon and Ray Hubbard. These water bodies support recreation and municipal supply while feeding the larger Trinity system."),
    p("Together, the forks show why the 'Trinity River' is really a network. The main stem downstream of Dallas represents water gathered across a huge urban and suburban region."),

    h("Dallas and the leveed Trinity corridor"),
    p("Through Dallas, the Trinity flows within a broad flood-control corridor framed by levees. The river can look surprisingly small inside that open space during normal flow, which is one reason visitors sometimes underestimate its flood potential."),
    p("The wide corridor is there because the river needs room during high water. Historic floods helped shape Dallas flood-control planning, and the levee system remains a major part of the city's relationship with the river."),

    h("Why a small-looking river can have a huge basin"),
    p("A river's normal channel does not reveal the size of its watershed. The upper Trinity collects runoff from a dense metropolitan area containing millions of people, roads, roofs, parking lots and storm drains."),
    p("During heavy rain, that runoff can arrive quickly. Reservoirs, levees and floodways reduce risk, but the scale of the watershed means flood management remains a permanent concern."),

    h("Reservoirs are the Metroplex's hidden water map"),
    p("North Texas relies on a broad network of reservoirs because local rainfall is variable and population demand is enormous. Different cities and water districts draw from different combinations of lakes, some within the Trinity basin and some connected through regional transfers."),
    p("That complexity is why a single city tap cannot be understood by looking at the nearest river. Metroplex water systems are regional, interconnected and increasingly dependent on long-distance planning."),

    h("Joe Pool Lake and Cedar Hill State Park"),
    p("Joe Pool Lake lies in the upper Trinity watershed on the south side of the Metroplex. Cedar Hill State Park provides public shoreline, camping, fishing and views across the reservoir."),
    p("The park is useful for understanding how recreation and water infrastructure overlap in North Texas. A lake can be a weekend destination while also functioning within the basin's engineered water landscape."),
    { type: "image", image: { src: "/images/state-parks/cedar-hill-state-park.jpg", alt: "Joe Pool Lake shoreline at Cedar Hill State Park in the Trinity River basin", width: 1600, height: 1067, credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" }, caption: "Reservoirs throughout the Metroplex make the upper Trinity's managed water system visible." },

    h("Below Dallas: the river leaves the Metroplex"),
    p("Once the Trinity moves southeast beyond Dallas-Fort Worth, the landscape becomes less urban and more agricultural and forested. The river widens, meanders and crosses broad floodplains."),
    p("This downstream reach is essential to understanding the river. The Trinity is not only a Metroplex drainage channel; it continues for hundreds of miles through rural Texas before reaching the Gulf Coast system."),

    h("Bottomland forests and wildlife"),
    p("The lower Trinity supports large areas of bottomland hardwood forest, wetlands, sloughs and floodplain habitat. These environments support white-tailed deer, feral hogs, waterfowl, wading birds, alligators, turtles and numerous fish species."),
    p("Flooding is part of the ecology. Seasonal high water spreads across lowlands, moves nutrients and creates habitat that would not exist if the river were confined permanently to a narrow channel."),

    h("Lake Livingston: the lower Trinity's giant reservoir"),
    p("Lake Livingston is one of the largest reservoirs in Texas by surface area and a major feature of the lower Trinity. The reservoir stores water and supports recreation while serving water-supply needs downstream and in the greater Houston region."),
    p("Its scale makes the Trinity feel more like an inland sea than a river in places. But the lake remains part of the same system carrying water from North Texas toward the coast."),
    { type: "image", image: { src: "/images/state-parks/lake-livingston-state-park.jpg", alt: "Open water and forested shoreline at Lake Livingston on the Trinity River", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" }, caption: "Lake Livingston is one of the defining lower-basin features of the Trinity River." },

    h("How Trinity water connects to the Houston region"),
    p("The lower Trinity is an important source for water users beyond communities directly on the river. Regional water systems move Trinity basin water toward the Houston metropolitan area, illustrating how modern water geography does not always follow natural basin boundaries."),
    p("That makes the Trinity a statewide infrastructure story: rainfall in North and East Texas can ultimately support water demand far from the river's visible channel."),

    h("Flooding on the Trinity"),
    p("The Trinity has a long history of damaging floods in both urban and rural reaches. In Dallas-Fort Worth, intense rainfall can drive rapid runoff into forks and creeks. Downstream, broad floodplains can remain inundated for extended periods."),
    p("Reservoirs, levees and forecasting reduce risk but cannot remove it. During heavy rain, use National Weather Service warnings and USGS gauges rather than judging conditions by a single local view of the river."),

    h("Fishing and paddling"),
    p("Fishing opportunities vary widely across the basin, from Metroplex reservoirs to Lake Livingston and the lower river. Catfish, bass, crappie, sunfish, gar and other species occur in different habitats."),
    p("Paddling is possible on selected reaches and reservoirs, but access, current, boat traffic, low-head structures and private property can complicate trips. Use established public access and check current conditions before launching."),

    h("Water quality and an urban river"),
    p("The Trinity receives runoff and treated wastewater from one of the largest metropolitan areas in the country. That makes water quality management a major part of the river's modern story."),
    p("Treated wastewater return flows can also become an important component of downstream flow during dry periods. In a heavily urbanized basin, the water cycle includes treatment plants, reservoirs and reuse as well as rainfall and natural tributaries."),

    h("Where the Trinity reaches the coast"),
    p("The Trinity enters Trinity Bay, part of the larger Galveston Bay estuary. Freshwater inflow from the river affects salinity, sediment and habitat conditions in the bay."),
    p("This connection means North Texas water management has coastal consequences. Reservoir storage and downstream flow affect not only cities and farms but also an estuarine ecosystem hundreds of miles away."),

    h("Best places to experience the Trinity basin"),
    list(
      "Fort Worth river corridor — best for seeing the West Fork in an urban setting.",
      "Dallas Trinity corridor — best for understanding levees, floodways and the scale of the upper basin.",
      "Cedar Hill State Park — best for an accessible Metroplex reservoir experience.",
      "Rural lower Trinity — best for seeing a broad, meandering floodplain river outside the city.",
      "Lake Livingston State Park — best for the lower basin's reservoir and forest landscape.",
      "Trinity Bay — best for understanding where inland water becomes part of the Gulf Coast estuary."
    ),

    h("A three-day Trinity River road trip"),
    p("Day one: start in Fort Worth and Dallas to see the forks, levees and urban river corridor. Add a Metroplex reservoir such as Joe Pool Lake if time allows."),
    p("Day two: drive southeast into the rural middle basin, watching the landscape shift from urban development to pasture, forest and broad floodplain."),
    p("Day three: spend time at Lake Livingston, then continue toward Trinity Bay to understand how the river's inland water system connects to the Gulf Coast."),

    h("Frequently asked questions about the Trinity River"),
    h("Where does the Trinity River start?"),
    p("The Trinity forms from several major forks in North Texas, including the West, Clear, Elm and East Fork systems."),
    h("Does the Trinity River run through Dallas?"),
    p("Yes. The river passes through a broad leveed flood-control corridor in Dallas."),
    h("Does the Trinity River run through Fort Worth?"),
    p("The West Fork and Clear Fork run through Fort Worth and join within the city."),
    h("What is the biggest lake on the Trinity River?"),
    p("Lake Livingston is one of the largest and most important reservoirs in the lower Trinity basin."),
    h("Can you swim in the Trinity River?"),
    p("Swimming should be treated as site-specific. Use designated public swimming areas at reservoirs and parks, and check current advisories rather than assuming the main river is safe."),
    h("Can you kayak the Trinity River?"),
    p("Some reaches are paddled, but access, flow, hazards and water quality vary. Established public access points are the best starting point."),
    h("Where does the Trinity River end?"),
    p("The river reaches Trinity Bay, part of the Galveston Bay system on the Texas coast."),
    h("Why is the Trinity important to Dallas-Fort Worth?"),
    p("Its forks, reservoirs and connected regional systems support water supply, stormwater management, flood control and recreation across the Metroplex."),

    h("What the Trinity teaches about Texas"),
    p("The Trinity shows that a river can become almost invisible beneath a modern metropolitan area while still organizing the region's water, floodplain and reservoir system."),
    p("Follow it from the Metroplex to Trinity Bay and the hidden map appears: urban forks become a main river, reservoirs store supply, bottomland forests absorb floods, Lake Livingston anchors the lower basin and the remaining freshwater eventually reaches the coast.")
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