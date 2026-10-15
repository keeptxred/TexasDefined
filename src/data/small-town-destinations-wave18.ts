import type { Destination } from "./types";

/**
 * Independently researched visitor destinations, statewide town wave 18.
 * These are incorporated cities in their own right. "small-towns" is the
 * existing Explore town-trip taxonomy, NOT an assertion about population
 * or municipal legal classification.
 */
export const smallTownWave18Destinations: Destination[] = [
  {
    id: "small-town-waxahachie",
    brandId: "texasdefined",
    slug: "waxahachie",
    name: "Waxahachie",
    summary: "Waxahachie combines an exceptionally detailed 1895 Romanesque courthouse, surviving cotton-boom commercial blocks, Victorian neighborhoods and community festivals with historic Getzendaner Park on Waxahachie Creek.",
    category: "small-towns",
    region: "prairies-lakes",
    nearestTown: "Waxahachie",
    county: "Ellis",
    coordinates: { lat: 32.386, lng: -96.8477 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ellis%20County%20Courthouse%2C%20Waxahachie%2C%20Texas%20%286884671962%29.jpg?width=1600",
      alt: "Richardsonian Romanesque Ellis County Courthouse and clock tower in Waxahachie",
      width: 3957, height: 3060,
      credit: "Nicolas Henderson · cropped by Jim Evans · CC BY 2.0 · Wikimedia Commons",
    },
    bestSeason: "Spring for milder walking temperatures, blooming crape myrtles later in the warm season, and fall for outdoor streets and town festivals. Confirm each annual event date independently.",
    entryNote: "Historic downtown streets and Getzendaner Park are publicly accessible; festivals, guided home tours and ticketed venues each have separate schedules and charges. Courthouse offices are working county government facilities, not a freely explorable museum.",
    highlights: ["Ellis County Courthouse", "historic downtown Waxahachie", "Victorian houses", "Getzendaner Park", "Chautauqua Auditorium", "Hachie Hearts public art trail", "Gingerbread Trail home tours", "Crape Myrtle Festival"],
    body: [
      "Waxahachie is one of North Texas's most rewarding places to understand the cotton boom through streets and buildings rather than a single museum exhibit. Founded in 1850, the Ellis County seat developed into an agricultural and commercial center as cotton production expanded. The late-nineteenth-century economy shaped its elaborate courthouse, downtown storefronts and residential neighborhoods. The city documents this relationship directly in its official local history.",
      "The 1895 Ellis County Courthouse is the organizing landmark for a first visit. Designed by J. Riely Gordon in the Richardsonian Romanesque tradition, its red sandstone, arches, carved details and prominent clock tower deserve time from more than one side of the square. It remains a functioning courthouse. Visitors can appreciate the exterior and courthouse square without assuming access to offices, security-controlled courtrooms or interior public tours.",
      "Walk beyond the courthouse to understand the broader late-Victorian town. Downtown shopping, coffee, local dining, historic facades and preserved residential architecture reflect Waxahachie's longer commercial history. Some older structures remain private homes or businesses and are not public exhibits. The city's advertised Gingerbread Trail events make a different, ticket-specific experience from everyday neighborhood walking; never confuse the two.",
      "Getzendaner Park provides a valuable change of pace and a more accessible family-oriented stop. The city's park department identifies a 33-acre creekside property established in 1889, containing the Chautauqua Auditorium, walking and picnic opportunities, and the M&M ADA-compliant playground. The city's stated inclusive-play facility is useful practical information, but it does not establish that every historic venue in town is fully barrier-free.",
      "The official visitor office lists public art and events such as the Hachie Hearts Trail, crape-myrtle celebrations, seasonal community festivals and the Scarborough Renaissance Festival in the area. These programs have differing locations, dates and admission requirements. Some take place outside the walkable courthouse district. Planning around the event's actual entrance and calendar is important, especially for a full-day family outing.",
      "For a first trip, begin with courthouse architecture and downtown, then build a second segment around Getzendaner Park or a scheduled cultural event. Travelers drawn to historical architecture may prefer a half day of measured walking rather than attempting every seasonal festival in one visit. The broader Ellis County guide distinguishes nearby Ennis and rural cotton-country heritage from the Waxahachie center."
    ],
    officialUrl: "https://www.waxahachietx.gov/101/Visit",
    sourceCheckedAt: "2026-10-12",
    directions: "Waxahachie is in Ellis County south of Dallas, accessed from I-35E. For the courthouse square, navigate to downtown Waxahachie rather than to festival grounds; Getzendaner Park is at 400 S. Grand Avenue.",
    accessibilityNotes: "The city describes an ADA-compliant playground at Getzendaner Park. Historic interiors, Victorian houses, courthouse offices and festival grounds have different accessibility conditions; check each venue's entrance and event accommodations.",
    visitorFaqs: [
      { question: "When was the Ellis County Courthouse built?", answer: "The present courthouse was completed in 1895 during Waxahachie's cotton-driven growth. It remains a working county building, and interior access should not be assumed.", sourceUrl: "https://www.waxahachietx.gov/242/About-Waxahachie" },
      { question: "Is there an accessible family playground in Waxahachie?", answer: "Yes. The municipal Getzendaner Park page identifies the M&M ADA-compliant playground within the historic park, alongside picnic facilities, trails and the Chautauqua Auditorium.", sourceUrl: "https://www.waxahachietx.gov/643/Getzendaner-Park" },
      { question: "Are the Gingerbread Trail and local festivals open every weekend?", answer: "No. Special home tours and seasonal events have independently published schedules and sometimes require tickets. The historic downtown and outdoor courthouse square are separate year-round experiences.", sourceUrl: "https://www.waxahachietx.gov/101/Visit" }
    ],
    areaGuide: {
      intro: "Use the courthouse square for architectural interpretation; plan Getzendaner Park and special events as separate stops with their own access and time requirements.",
      nearbyAttractions: [
        { name: "Ellis County Courthouse", description: "Exterior architecture and county-seat history. This is a government courthouse rather than a general admission museum.", proximity: "Downtown square", href: "https://www.waxahachiecvb.com/business/ellis-county-courthouse" },
        { name: "Getzendaner Park", description: "33-acre park, historic Chautauqua Auditorium, trails and inclusive playground.", proximity: "400 S. Grand Avenue", href: "https://www.waxahachietx.gov/643/Getzendaner-Park" },
        { name: "Waxahachie events and public art", description: "Separate downtown art routes and date-specific festivals listed by the municipal visitors office.", proximity: "Various sites", href: "https://www.waxahachietx.gov/101/Visit" }
      ],
      foodAndDrink: [{ name: "Downtown restaurants and cafes", description: "Find a walkable meal around the square; verify individual hours, especially around festival dates." }],
      lodging: [{ name: "Historic core versus interstate hotels", description: "Choose walkability to downtown or practical road-trip access depending on the itinerary." }],
      neighborhoods: [{ name: "Historic courthouse and Victorian residential districts", description: "Compare public commercial streets with privately owned period homes. Admire historic houses from public rights of way unless a scheduled tour admits visitors." }],
      familyStops: [{ name: "Getzendaner Park", description: "Park walking and the municipal inclusive playground can balance a downtown architecture outing." }],
      sideTrips: [
        { name: "Ellis County", description: "Explore Ennis, cotton-country history and the county's other communities.", href: "/county/ellis" },
        { name: "Official city visit calendar", description: "Verify annual festival dates, routes and admission separately from ordinary downtown access.", href: "https://www.waxahachietx.gov/101/Visit" }
      ],
    },
    authorityGuide: {
      whyItMatters: "Waxahachie concentrates the architectural evidence of a major Texas cotton economy in a legible civic square, while Getzendaner Park shows a different history of community gathering and inclusive recreation. An independent authority guide separates documented heritage from festival marketing and tells visitors what they can actually enter.",
      assessment: { recommendedVisit: "4–6 hours for downtown, courthouse exterior and Getzendaner Park; longer for a scheduled festival", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good when architectural stops are interspersed with the park and playground.", firstTimeValue: "Strong historic architecture and civic-heritage day trip south of Dallas." },
      itineraries: [
        { label: "Courthouse and downtown", duration: "3–4 hours", steps: ["Circle the courthouse and note exterior stonework and tower from the square", "Walk the historic commercial blocks and choose a local meal", "Add public art or architecture stops open that day"] },
        { label: "Heritage and family afternoon", duration: "5–6 hours", steps: ["Explore the county courthouse square and Waxahachie's cotton history", "Break for lunch", "Continue to Getzendaner Park and the inclusive playground"] },
        { label: "Festival-focused weekend", duration: "1–2 days", steps: ["Confirm actual festival or guided-house-tour dates and admissions", "Keep a separate block for uncrowded downtown architecture", "Schedule park time and an Ellis County side trip only as time allows"] }
      ],
      sources: [
        { label: "City of Waxahachie — town history", url: "https://www.waxahachietx.gov/242/About-Waxahachie", scope: "1850 founding, cotton industry and 1895 courthouse" },
        { label: "City of Waxahachie — official visitor attractions", url: "https://www.waxahachietx.gov/101/Visit", scope: "Annual events, historic downtown, public art and visitor context" },
        { label: "City of Waxahachie — Getzendaner Park", url: "https://www.waxahachietx.gov/643/Getzendaner-Park", scope: "Exact park acreage, site features, ADA playground and address" },
        { label: "Waxahachie Convention & Visitors Bureau — courthouse", url: "https://www.waxahachiecvb.com/business/ellis-county-courthouse", scope: "Ellis County Courthouse as historic visitor landmark" },
        { label: "Wikimedia Commons — Waxahachie courthouse photo", url: "https://commons.wikimedia.org/wiki/File:Ellis_County_Courthouse,_Waxahachie,_Texas_(6884671962).jpg", scope: "Nicolas Henderson image, Jim Evans crop, CC BY 2.0 with attribution" }
      ],
    },
  },
  {
    id: "small-town-weatherford",
    brandId: "texasdefined",
    slug: "weatherford",
    name: "Weatherford",
    summary: "Weatherford links an 1886 Parker County courthouse and historic square with Chandor Gardens, the Doss Heritage & Culture Center and the working ranch and horse culture of the Western Cross Timbers.",
    category: "small-towns",
    region: "prairies-lakes",
    nearestTown: "Weatherford",
    county: "Parker",
    coordinates: { lat: 32.7593, lng: -97.7972 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Parker%20County%20Courthouse%20Weatherford%20Wiki%20%281%20of%201%29.jpg?width=1600",
      alt: "Historic Parker County Courthouse in Weatherford, Texas",
      width: 1800, height: 1200,
      credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Fall through spring for courthouse-square walking and city trails; summer visits benefit from early outdoor time and planned museum breaks. Check Chandor Gardens for seasonal event closures.",
    entryNote: "Downtown public streets are free to visit. Chandor Gardens, cultural venues, museums and special events have their own charges and posted hours. The city has announced a Chandor Gardens public closure October 14–29, 2026 for Jack-O'-Lantern Nights; check the current municipal notice before planning a garden visit.",
    highlights: ["Parker County Courthouse", "historic Weatherford square", "Chandor Gardens", "Chandor Nature Trail", "Doss Heritage & Culture Center", "First Monday Trade Days", "Western Cross Timbers", "Parker County horse heritage"],
    body: [
      "Weatherford's square works best when understood as a county-seat landscape, not merely a shopping stop west of Fort Worth. The Parker County Courthouse, built in 1886, anchors historic commercial blocks, offices and restaurants. A visit can connect Western Cross Timbers geography with the movement of people, cattle, rail transport and later equestrian culture across Parker County. Much of the architecture is best appreciated on a self-guided walk from the public streets.",
      "The courthouse is a working government building. Historic exterior observation and downtown shopping are different from entering active courtrooms, office areas or secured spaces. The city's official historic-landmark information describes additional houses and sites, but some remain privately owned. If a tour is advertised for a particular building, verify the event organizer and the exact route rather than assuming open access.",
      "Chandor Gardens provides a distinctive counterpoint to the courthouse. Portraitist Douglas Chandor and his wife Ina created formal landscape rooms influenced by English and Chinese design starting in the 1930s, and the city now owns the property. Its public garden paths and seasonal exhibitions are not the same as interior access to the former mansion. The city states that the mansion interior is ordinarily open on a specific limited schedule, not every day, while the gardens are ticketed separately.",
      "Accessibility planning matters at Chandor Gardens. The landscaped property includes winding paths and changes in grade; the adjacent municipal Chandor Nature Trail is an outdoor half-mile route through two Western Cross Timbers habitats rather than a paved museum gallery. Visitors using mobility aids should check route conditions and the venue's available facilities in advance.",
      "The Doss Heritage & Culture Center at 1400 Texas Drive interprets Parker County history, culture and Western heritage. As an independent museum, it sets its own operating hours and exhibitions. Pairing an afternoon at the Doss with a downtown morning creates a useful heritage itinerary without implying that every horse-training ranch is a walk-in tourist attraction. Private stables and ranches should be visited only when an operator explicitly offers an appointment.",
      "For a full day, stay focused: courthouse square, local dining, the Doss and a scheduled Chandor Gardens visit can easily fill the time. Festival and trade-day weekends may change parking and restaurant availability. The Parker County guide provides additional context on other communities, the county's landscape and visitor trips beyond the city."
    ],
    officialUrl: "https://www.weatherfordtx.gov/688/Welcome-to-Weatherford",
    sourceCheckedAt: "2026-10-12",
    directions: "Weatherford lies west of Fort Worth along I-20 and U.S. 180. Downtown courthouse square, Chandor Gardens at 711 W. Lee Avenue, and the Doss Center at 1400 Texas Drive are distinct stops; navigate to each exact entrance.",
    accessibilityNotes: "Chandor Gardens has historical paths and grading that may require advance questions about an accessible route. Museum access should be confirmed with the Doss Center; the courthouse's office access is unrelated to a public visitor tour.",
    visitorFaqs: [
      { question: "Is Chandor Gardens open during October 14–29, 2026?", answer: "The city has posted an October 14–29 closure for preparation and presentation of Jack-O'-Lantern Nights, with ticketed event dates October 22–24. Verify current status and whether a separate visit is possible before travel.", sourceUrl: "https://weatherfordtx.gov/170/Chandor-Gardens" },
      { question: "Can I tour Chandor's house every day?", answer: "No. The city lists ordinary garden visiting hours and says the mansion interior opens only on the second Tuesday of each month. Special closures or event access can change that schedule.", sourceUrl: "https://weatherfordtx.gov/170/Chandor-Gardens" },
      { question: "Where can I learn about Parker County history indoors?", answer: "The Doss Heritage & Culture Center operates at 1400 Texas Drive and interprets Parker County history and western heritage. Check the museum's independently posted hours before traveling.", sourceUrl: "https://dosscenter.org/" }
    ],
    areaGuide: {
      intro: "Choose separately between a walkable county-seat square, a scheduled garden visit, a history museum and open-air trails. Their hours and admissions are not interchangeable.",
      nearbyAttractions: [
        { name: "Chandor Gardens", description: "City-operated formal gardens; timed events, seasonal closures and mansion-interior access differ.", proximity: "711 W. Lee Avenue", href: "https://weatherfordtx.gov/170/Chandor-Gardens" },
        { name: "Doss Heritage & Culture Center", description: "Independent exhibitions on Parker County and western heritage; confirm museum hours.", proximity: "1400 Texas Drive", href: "https://dosscenter.org/" },
        { name: "Chandor Nature Trail", description: "Municipal half-mile Western Cross Timbers trail with different habitats and outdoor surfaces.", proximity: "Near Chandor Gardens", href: "https://www.weatherfordtx.gov/3384/Chandor-Nature-Trail" }
      ],
      foodAndDrink: [{ name: "Courthouse-square restaurants and shops", description: "Use the downtown walking block for local dining and historic storefronts. Hours vary by business." }],
      lodging: [{ name: "Historic center versus interstate hotels", description: "Compare on-foot access to the square with parking convenience for separate museums and parks." }],
      neighborhoods: [{ name: "Courthouse square and protected historic landmarks", description: "The city records early private homes and historic commercial properties. Respect private access restrictions.", href: "https://weatherfordtx.gov/3735/Weatherfords-Local-Historic-Landmarks" }],
      familyStops: [{ name: "Doss Center and scheduled garden visits", description: "Pair manageable history exhibits with a booked garden or nature stop suited to the group's mobility." }],
      sideTrips: [
        { name: "Parker County", description: "Explore Western Cross Timbers history and surrounding places outside Weatherford.", href: "/county/parker" },
        { name: "Weatherford historic landmarks", description: "Use city documentation to select actual structures and follow their public-access limits.", href: "https://weatherfordtx.gov/3735/Weatherfords-Local-Historic-Landmarks" }
      ],
    },
    authorityGuide: {
      whyItMatters: "Weatherford is a distinctive working county seat where the 1886 courthouse, locally documented architecture, Chandor's private-to-public gardens and a serious regional-history museum create a multi-layered visit. A useful guide distinguishes public space, private ranches, ticketed gardens and confirmed museum access instead of treating all attractions as drop-in sites.",
      assessment: { recommendedVisit: "4–7 hours for square, museum and a garden stop; 1–2 days with special events and trails", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good for history-loving families; garden grades and closure dates require checking.", firstTimeValue: "Strong for courthouse architecture and a combination of art, gardens and local heritage." },
      itineraries: [
        { label: "County-seat heritage", duration: "Half day", steps: ["Walk the courthouse square and review the city's landmark descriptions", "Stop for a downtown meal", "Visit the Doss Center during posted opening hours"] },
        { label: "Art and gardens", duration: "Full day", steps: ["Verify Chandor Gardens is open on the actual travel date", "Explore the public formal gardens and available exhibits", "Balance with downtown shopping or a short separate nature-trail outing"] },
        { label: "Western Cross Timbers weekend", duration: "Two days", steps: ["Use day one for city heritage and cultural institutions", "Reserve any ranch-related or event access with its independent operator", "Choose an appropriate county outdoor excursion and allow driving time"] }
      ],
      sources: [
        { label: "City of Weatherford — official welcome and visitor context", url: "https://www.weatherfordtx.gov/688/Welcome-to-Weatherford", scope: "Historic square, gardens and public visitor access" },
        { label: "City of Weatherford — Chandor Gardens", url: "https://weatherfordtx.gov/170/Chandor-Gardens", scope: "Official admission, opening hours and October 2026 closure notice" },
        { label: "City of Weatherford — local historic landmarks", url: "https://weatherfordtx.gov/3735/Weatherfords-Local-Historic-Landmarks", scope: "Documented building histories and Chandor estate" },
        { label: "City of Weatherford — Chandor Nature Trail", url: "https://www.weatherfordtx.gov/3384/Chandor-Nature-Trail", scope: "Half-mile ecology and natural trail description" },
        { label: "Doss Heritage & Culture Center — official museum", url: "https://dosscenter.org/", scope: "Institutional history, mission, visitor address and hours" },
        { label: "Wikimedia Commons — Weatherford courthouse", url: "https://commons.wikimedia.org/wiki/File:Parker_County_Courthouse_Weatherford_Wiki_(1_of_1).jpg", scope: "Renelibrary, 2022 courthouse image and CC BY-SA 4.0" }
      ],
    },
  },
  {
    id: "small-town-grapevine",
    brandId: "texasdefined",
    slug: "grapevine",
    name: "Grapevine",
    summary: "Grapevine combines a historic North Texas Main Street with the Cotton Belt depot, Grapevine Vintage Railroad and TEXRail airport access, plus a lakefront and a busy calendar of festivals and holiday events.",
    category: "small-towns",
    region: "prairies-lakes",
    nearestTown: "Grapevine",
    county: "Tarrant",
    coordinates: { lat: 32.9344, lng: -97.0781 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cotton%20Belt%20Railroad%20Industrial%20Historic%20District%20in%20Grapevine%2CTX.jpg?width=1600",
      alt: "Historic Cotton Belt train depot, railroad tracks and station building in Grapevine",
      width: 5184, height: 3456,
      credit: "Abbie Myers · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Spring and fall for comfortable downtown walks and lake outings; holiday weeks for specialty events, but expect more crowds, ticket demand and altered parking conditions.",
    entryNote: "Historic Main Street is public space, not a ticketed theme park. The Vintage Railroad uses reserved excursions and train-specific boarding windows, and the TEXRail commuter line is a separate transit service with its own fares and timetable. Main Station and special events can change garage prices.",
    highlights: ["Historic Main Street District", "Cotton Belt Historic Depot", "Grapevine Vintage Railroad", "Grapevine Main Station", "TEXRail airport connection", "Lake Grapevine", "seasonal festivals", "historic Palace Theatre"],
    body: [
      "Grapevine is best understood as two linked but operationally different railway experiences. The historic Cotton Belt Depot and preserved downtown commercial streets reflect the city's rail and settlement history. Nearby Grapevine Main Station is a modern transit, dining and hotel development serving the Trinity Metro TEXRail line to DFW Airport and downtown Fort Worth. The Grapevine Vintage Railroad offers separate ticketed heritage excursions from its historic depot; taking TEXRail does not constitute a vintage-train ticket.",
      "For most first-time visitors, the Main Street Historic District is the strongest starting point. Walk preserved storefronts, galleries and independent businesses, and see the depot before deciding whether to enter museums or book attractions. Main Station adds restaurants, visitor information and an observation tower. Published schedules and fees for the observation deck and private businesses can change, so treat the visitors bureau's current page as the final source.",
      "The Vintage Railroad deserves its own planning block. The visitor bureau places the Cotton Belt Depot at 705 S. Main Street and states that boarding begins 20 minutes before scheduled departure. Passengers should arrive early enough to check in, collect assigned passes and hear platform instructions. The operating timetable changes for special seasonal trips, summer dates and holiday excursions; not every vintage train travels to the same destination or offers the same experience.",
      "Travelers arriving from DFW Airport can use TEXRail, the commuter service linking Terminal B to Grapevine/Main Street and downtown Fort Worth. That is a genuine alternative to driving for a downtown-focused visit. A person staying near the lake or farther from Main Street should check local connecting transport rather than assume that every Grapevine attraction is on the rail line.",
      "Parking is more nuanced than a generic 'free downtown parking' claim. The official visitors bureau lists several free surface lots and curbside options, while the Main Parking Garage at 255 E. Dallas Road has a time-based fee after its initial free period and can charge differently during special events. Confirm the current pricing and ADA-designated spaces before setting out; the Vintage Railroad's nearby boarding platform and the garage are not the same entrance.",
      "Grapevine Lake extends a trip beyond the downtown corridor into outdoor recreation, trails and water-based visitor plans. For boating, swimming, lake water levels or overnight uses, treat lake-specific city and park rules as separate planning requirements. Holiday festivals and annual Main Street programs can fill hotels and parking lots, so a relaxed downtown-and-rail weekend should be planned around the actual event calendar, not a generic travel season."
    ],
    officialUrl: "https://www.grapevinetexasusa.com/",
    sourceCheckedAt: "2026-10-12",
    directions: "Historic Main Street is near Dallas Road in Grapevine. The Vintage Railroad boards at 705 S. Main; Grapevine Main Station is at 815 S. Main. TEXRail connects DFW Airport Terminal B and downtown Fort Worth to the Grapevine/Main Street station.",
    accessibilityNotes: "The city visitor bureau lists ADA-accessible downtown parking locations and a visitor shuttle capable of carrying wheelchair users. Vintage-train coaches may have historic boarding constraints; request current accessibility arrangements from railroad staff before buying tickets.",
    visitorFaqs: [
      { question: "Are TEXRail and the Grapevine Vintage Railroad the same train?", answer: "No. TEXRail is modern scheduled commuter rail linking DFW Airport and Fort Worth with the Grapevine/Main Street station. Grapevine Vintage Railroad sells separate historic rail excursions boarding from the Cotton Belt Depot.", sourceUrl: "https://www.grapevinetexas.gov/532/Public-Transportation" },
      { question: "When should I arrive for the Grapevine Vintage Railroad?", answer: "The official operator says boarding begins 20 minutes before departure and requires check-in for seat assignments. Arrive earlier during special events and follow the specific excursion instructions.", sourceUrl: "https://www.grapevinetexasusa.com/gvrr/plan-your-visit/faqs/" },
      { question: "Is downtown Grapevine parking free?", answer: "Several city-listed lots and street spaces are free. Main Station Garage offers an initial free period followed by hourly charges and can use special-event pricing. Verify the operator's current parking details.", sourceUrl: "https://www.grapevinetexasusa.com/plan-your-visit/parking/" },
      { question: "Can I reach downtown Grapevine from DFW Airport without a car?", answer: "Yes. TEXRail serves DFW Airport Terminal B and Grapevine/Main Street. Check the current Trinity Metro schedule and any last-mile needs for destinations away from downtown.", sourceUrl: "https://www.grapevinetexas.gov/532/Public-Transportation" }
    ],
    areaGuide: {
      intro: "Make historic Main Street and its two different railway services the organizing route. Treat lake recreation and seasonal events as separately scheduled experiences.",
      nearbyAttractions: [
        { name: "Grapevine Vintage Railroad", description: "Ticketed heritage excursions from the Cotton Belt Depot, with its own check-in time and train schedules.", proximity: "705 S. Main Street", href: "https://www.grapevinetexasusa.com/gvrr/plan-your-visit/" },
        { name: "Grapevine Main Station", description: "TEXRail stop, dining, visitor information and a separately priced observation tower.", proximity: "815 S. Main Street", href: "https://www.grapevinetexasusa.com/grapevine-main-station/" },
        { name: "Downtown parking guide", description: "Exact locations, ADA options and garage pricing, which can change for special events.", proximity: "Historic Main Street District", href: "https://www.grapevinetexasusa.com/plan-your-visit/parking/" }
      ],
      foodAndDrink: [{ name: "Historic Main Street and Harvest Hall", description: "Choose casual food-hall dining or independent restaurants along downtown. Hours and individual operators vary." }],
      lodging: [{ name: "Main Street stays versus lake and airport hotels", description: "Downtown accommodations support a car-light visit; lake and airport properties may need a separate transport plan." }],
      neighborhoods: [{ name: "Historic Main Street and the Cotton Belt railroad district", description: "Preserved commercial blocks and distinct old-depot heritage architecture beside the modern Main Station complex." }],
      familyStops: [{ name: "Vintage Railroad and public Main Street walks", description: "Choose an age-suitable heritage excursion, reserve tickets and allow time for station check-in and meals." }],
      sideTrips: [
        { name: "Tarrant County", description: "Place Grapevine among the county's other historic towns, recreation places and DFW transit links.", href: "/county/tarrant" },
        { name: "Grapevine Lake", description: "Outdoor stops must be planned around current city recreation and boating rules.", href: "https://www.grapevinetexas.gov/" }
      ],
    },
    authorityGuide: {
      whyItMatters: "Grapevine offers an unusually practical meeting point between preserved North Texas railroad heritage, a working airport-linked commuter service and a separately operated historic excursion railroad. An independent visitor guide must distinguish stations, ticket systems, boarding points, accessible connections and parking rules rather than treating everything labeled 'the train' as interchangeable.",
      assessment: { recommendedVisit: "4–6 hours for Main Street; 1–2 days when a reserved train ride, museums, lake and festival are added", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Strong for rail-interested families when excursions are reserved and train boarding requirements checked.", firstTimeValue: "Excellent for an airport-accessible historic downtown with optional ticketed experiences." },
      itineraries: [
        { label: "Car-light historic Main Street", duration: "4–5 hours", steps: ["Arrive by TEXRail or at an identified downtown parking lot", "Walk Main Street, Cotton Belt Depot and visitor information", "Visit selected shops and dine near Main Station"] },
        { label: "Vintage railroad day", duration: "Full day", steps: ["Reserve an excursion through the railroad's official operator", "Check in at the correct depot before boarding begins", "Use the remaining day for downtown and a separate rail-history stop"] },
        { label: "Festival and lake weekend", duration: "Two days", steps: ["Verify festival calendars and secure any ticketed excursions", "Explore Main Street and choose a dining or cultural evening", "Use a separate second-day plan for lake recreation or a regional transit outing"] }
      ],
      sources: [
        { label: "Grapevine Convention & Visitors Bureau — rail excursions", url: "https://www.grapevinetexasusa.com/gvrr/plan-your-visit/", scope: "Heritage excursions, tickets and separate rail operator identity" },
        { label: "Grapevine Convention & Visitors Bureau — boarding FAQ", url: "https://www.grapevinetexasusa.com/gvrr/plan-your-visit/faqs/", scope: "Boarding window, required check-in and historic depot access" },
        { label: "Grapevine Convention & Visitors Bureau — downtown parking", url: "https://www.grapevinetexasusa.com/plan-your-visit/parking/", scope: "Specific downtown lots, accessible parking and special-event garage policy" },
        { label: "City of Grapevine — public transport", url: "https://www.grapevinetexas.gov/532/Public-Transportation", scope: "TEXRail airport and Fort Worth service, accessible shuttle" },
        { label: "Grapevine Main Station — visitor bureau", url: "https://www.grapevinetexasusa.com/grapevine-main-station/", scope: "Modern station location, visitor services and observation tower" },
        { label: "Wikimedia Commons — historic Cotton Belt Depot", url: "https://commons.wikimedia.org/wiki/File:Cotton_Belt_Railroad_Industrial_Historic_District_in_Grapevine,TX.jpg", scope: "Abbie Myers photograph and CC BY-SA 4.0 reuse" }
      ],
    },
  },
];
