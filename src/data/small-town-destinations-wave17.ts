import type { Destination } from "./types";

/**
 * Source-researched, original TexasDefined town authority batch 17.
 * Each city is editorially different: antique-show planning, recurring market
 * logistics, and railroad/architectural history respectively.
 */
export const smallTownWave17Destinations: Destination[] = [
  {
    id: "small-town-round-top",
    brandId: "texasdefined",
    slug: "round-top",
    name: "Round Top",
    summary: "Round Top is a tiny Fayette County town whose antique-show corridors, preserved German-Texan buildings, Henkel Square and Festival Hill concert programs turn a quiet village into a major arts-and-design destination.",
    category: "small-towns",
    region: "prairies-lakes",
    nearestTown: "Round Top",
    county: "Fayette",
    coordinates: { lat: 30.0651, lng: -96.6960 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Round%20Top%20Historic%20Library%20--%20Round%20Top%2C%20Texas.jpg?width=1600",
      alt: "Historic wooden library building in Round Top, Fayette County, Texas",
      width: 2514, height: 2096, credit: "Jim Evans · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Spring and fall for antiques markets and comfortable walking; the town is much calmer outside major show weeks. Concert programming at Festival Hill offers another reason to plan a specific date.",
    entryNote: "The town center can be explored without a general admission ticket. Antique venues, private shows, concerts and special events each set separate dates, tickets, access and parking rules; dates and admission for one venue do not cover every show in the wider Warrenton–Round Top corridor.",
    highlights: ["Henkel Square Market", "historic Round Top buildings", "Round Top Antiques & Design Show", "Festival Hill", "Round Top Historic Library", "antique shopping", "live classical music", "Fayette County heritage"],
    body: [
      "Round Top is a small town with two very different rhythms. On most days, the compact historic area invites an unhurried walk between surviving nineteenth-century buildings, cafes, art galleries and local shops. During major antique-show seasons, collectors and designers spread across numerous independent venues in Round Top and surrounding communities. Planning a normal Saturday as though it were show week—or assuming every market is a single ticketed site—can produce a disappointing trip.",
      "The historical setting matters beyond antiques. German-Texan settlement, vernacular buildings, and later preservation helped give the historic center its appearance. Henkel Square is an interpretive shopping area occupying a collection of preserved buildings; it is not a municipal park or a conventional museum with one universal admission and operating schedule. The historic library is one especially tangible stop for travelers interested in the town's nineteenth-century fabric.",
      "The Round Top Festival Institute brings a separate cultural identity. Founded by pianist James Dick in 1971, Festival Hill supports music education and concerts at a substantial campus near town. Visitors interested in classical music should consult its own calendar and ticketing, not assume a public performance will coincide with an antique-shopping visit.",
      "For antiques, choose your geographic cluster before choosing lunch or lodging. The wider market often stretches along the Highway 237 corridor with separate operators and fields, and parking is not interchangeable across venues. Show dates can vary among organizers. Cross-check the town's official events calendar and the selected show's own published schedule instead of relying on a generic 'Antiques Week' label.",
      "For a non-show day, a more rewarding plan may be the town center, historic library, Henkel Square, a relaxed meal and Festival Hill if its grounds or performance program are accessible. A family visit should account for heat, uneven ground, antiques-shopping fatigue and different venue policies. Individual antique stores and historic buildings may have stairs or threshold barriers; contact each destination for specific accessible entrances.",
      "Round Top makes sense as part of a Fayette County road trip, but nearby Warrenton, Carmine, La Grange and Brenham are distinct communities with their own travel times and dates. Staying in the walkable center makes sense for a leisurely village visit; lodging farther from the center may be a practical choice for a show-week trip only after checking each venue's location."
    ],
    officialUrl: "https://www.visitroundtop.com/",
    sourceCheckedAt: "2026-10-12",
    directions: "Round Top is on Texas Highway 237 in Fayette County between the Brenham and La Grange areas. Verify your actual show venue; some popular fields and warehouses lie outside the incorporated town.",
    accessibilityNotes: "Historic buildings and market fields vary greatly. Seek accessible parking and entrances from each show operator, gallery, business or Festival Hill; uneven gravel, pasture paths and thresholds can affect mobility.",
    areaGuide: {
      intro: "Decide whether your goal is the quiet historic town, a particular antique show, or a ticketed music performance; the dates and logistics are different.",
      nearbyAttractions: [
        { name: "Henkel Square Market", description: "Preserved buildings and independent shops and cafes; confirm current tenant and opening information.", proximity: "Historic core", href: "https://www.visitroundtop.com/shopping/henkel-square-market" },
        { name: "Round Top Festival Institute", description: "Music campus founded in 1971; check its separate event and visitor schedules.", proximity: "Near town", href: "https://www.visitroundtop.com/things-to-do/round-top-festival-institute" },
        { name: "Round Top event calendar", description: "Check individual antique-market dates and smaller year-round events.", proximity: "Various venues", href: "https://www.visitroundtop.com/annual-events" }
      ],
      foodAndDrink: [{ name: "Historic core restaurants and cafes", description: "Browse walkable dining between shopping and galleries; show-week reservations may be advisable." }],
      lodging: [{ name: "Town center versus rural show-area stays", description: "Compare access to a particular show field and parking with the benefits of staying near the town center." }],
      neighborhoods: [{ name: "Henkel Square and the village core", description: "Concentrated historic buildings, cafes, galleries and shopping distinct from dispersed rural antique venues." }],
      familyStops: [{ name: "Historic village walk", description: "A short architectural walk can work for children; long market days need planned breaks and weather protection." }],
      sideTrips: [
        { name: "La Grange", description: "Connect Round Top to Fayette County history, museums and the county seat.", href: "/destination/la-grange" },
        { name: "Brenham", description: "A separate Washington County town known for historic streets, food and area attractions.", href: "/destination/brenham" },
        { name: "Fayette County", description: "Understand the other towns, settlement history and distances in Round Top's region.", href: "/county/fayette" }
      ],
    },
    visitorFaqs: [
      { question: "Are the Round Top antique markets open every weekend?", answer: "No. Major antiques events have their own spring and fall dates, and individual venues may maintain additional opening schedules. Round Top's everyday downtown and shops are a different trip.", sourceUrl: "https://www.visitroundtop.com/annual-events" },
      { question: "Does one antique-show ticket cover all Round Top venues?", answer: "No. The antiques corridor consists of independently operated venues, fields and events. Check each venue's admission and parking conditions before you go.", sourceUrl: "https://www.visitroundtop.com/annual-events" },
      { question: "What can I do in Round Top outside antique-show weeks?", answer: "Walk the historic village, visit Henkel Square, browse local shops and check Festival Hill for music programs; business and event schedules vary.", sourceUrl: "https://www.visitroundtop.com/things-to-do/round-top-festival-institute" },
    ],
    authorityGuide: {
      whyItMatters: "Round Top is not simply a flea market: it is a rare combination of a preserved historic Texas town, an internationally recognized design-shopping corridor and a serious classical-music institution. The most valuable independent guide distinguishes ordinary-town travel from operator-specific antiques and concert events.",
      assessment: { recommendedVisit: "3–5 hours for the historic core; a full day or multi-day stay for major antique-show venues", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Works for short cultural trips; antiques events require patience and frequent breaks.", firstTimeValue: "Strong when venue dates and geography are confirmed before travel." },
      itineraries: [
        { label: "Historic Round Top", duration: "Half day", steps: ["Start with the town's surviving historic core", "Walk Henkel Square and the library area", "Stop for a meal and visit galleries or shops open that day"] },
        { label: "Antiques-show day", duration: "Full day", steps: ["Pick specific independent show venues and check their dates", "Confirm entry and parking by venue and arrive early", "Plan breaks and a manageable afternoon shopping cluster"] },
        { label: "Music and heritage weekend", duration: "Two days", steps: ["Reserve a Festival Hill concert or program in advance", "Explore town architecture and historic shopping areas", "Use a separate half day for a Fayette County side trip"] }
      ],
      sources: [
        { label: "Town of Round Top — visitor bureau", url: "https://www.visitroundtop.com/", scope: "Official town visitor information and local businesses" },
        { label: "Town of Round Top — annual events", url: "https://www.visitroundtop.com/annual-events", scope: "Current antique-show and cultural-event scheduling" },
        { label: "Town of Round Top — Henkel Square", url: "https://www.visitroundtop.com/shopping/henkel-square-market", scope: "Preserved buildings, shops and public visitor details" },
        { label: "Town of Round Top — Festival Institute", url: "https://www.visitroundtop.com/things-to-do/round-top-festival-institute", scope: "Foundation history and institutional visitor information" },
        { label: "Wikimedia Commons — Historic Round Top Library", url: "https://commons.wikimedia.org/wiki/File:Round_Top_Historic_Library_--_Round_Top,_Texas.jpg", scope: "Exact hero photograph, Jim Evans, CC BY-SA 4.0 rights" },
      ],
    },
  },
  {
    id: "small-town-canton",
    brandId: "texasdefined",
    slug: "canton",
    name: "Canton",
    summary: "Canton is the Van Zandt County seat best known for the enormous recurring First Monday Trade Days market, but its courthouse square, parks, local-history stops and East Texas lakes also reward visits outside market weekends.",
    category: "small-towns",
    region: "piney-woods",
    nearestTown: "Canton",
    county: "Van Zandt",
    coordinates: { lat: 32.5566, lng: -95.8626 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Vanzandt%20courthouse%202010.jpg?width=1600",
      alt: "Van Zandt County Courthouse in downtown Canton, Texas",
      width: 2509, height: 1488, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
    bestSeason: "Spring and fall are most comfortable for outdoor market browsing. First Monday Trade Days operates in every season, including hot and rainy months; ordinary nonmarket weekends are quieter.",
    entryNote: "First Monday Trade Days does NOT take place on Monday. Its public market days are Thursday through Sunday immediately before the month's first Monday. Original First Monday Park admission is free, while city-operated parking and some private venues charge separately. Always confirm current parking and event details before traveling.",
    highlights: ["First Monday Trade Days", "Van Zandt County Courthouse", "historic downtown Canton", "Cherry Creek Park", "Old City Lake", "Mill Creek Reservoir", "antique shopping", "local history", "East Texas weekend trips"],
    body: [
      "The single most important Canton planning fact is the market calendar. The event is called First Monday Trade Days, but the Original First Monday Park opens to shoppers on the four days immediately before the first Monday of each month—Thursday through Sunday, not Monday. A traveler who arrives on Monday expecting full markets will have missed the recurring show. Exact monthly dates, vendor participation and grounds can vary, so check the official operator instead of treating a generic website calendar as permanent.",
      "First Monday is a sprawling multi-section experience rather than a compact town-square street fair. The city-operated Original First Monday Park provides trade centers, open shopping areas, parking and mapped entrances, while nearby independent market grounds may set different rules. The city's public FAQ reports free admission to its original park and separately priced parking; accessible parking and scooter rentals are offered at designated entrances. Bring comfortable walking shoes and a wagon for larger finds, and download a venue map before setting off.",
      "Canton is also the Van Zandt County seat. Its courthouse-centered historic downtown offers shopping, dining and local landmarks without depending on the market calendar. The courthouse itself is a prominent part of the town's identity; its historic status should not be confused with a promise that every courthouse office or interior room is a public tourist attraction.",
      "Beyond shopping, the town visitor bureau identifies Cherry Creek Park, Old City Lake and Mill Creek Reservoir as different recreation areas. The shaded Cherry Creek walking route and playground offer family-friendly breaks; Mill Creek has fishing and nature-focused facilities, subject to its separate access and boating rules. A regional park, lake or state-park excursion needs its own checks for seasonal access, water conditions and reservations.",
      "If traveling with children, keep the market plan short and practical: park at the right gate, decide in advance how you will reconnect if separated, plan heat and rest breaks, and distinguish private pet rules from Original First Monday Park policies. The city's FAQ permits leashed, nonaggressive dogs in the original park, but that does not automatically apply to all independent surrounding areas.",
      "A strong weekend plan can use an early market day followed by downtime in historic Canton, or skip the crowd entirely and focus on downtown, local museums and parks. Hotel rates and availability can be different on market weekends; compare lodging convenience to the gate you intend to use. For regional context, the Van Zandt County guide connects Canton to Wills Point, Grand Saline and the East Texas countryside."
    ],
    officialUrl: "https://www.firstmondaycanton.com/",
    sourceCheckedAt: "2026-10-12",
    directions: "Canton sits off Interstate 20 east of Dallas. For Original First Monday Park use the operator's parking map and correct entrance at 800 First Monday Lane rather than only navigating to the downtown courthouse square.",
    accessibilityNotes: "The city-operated Original First Monday Park lists accessible parking and scooter rentals, but market fields and private adjacent venues may have different surfaces and services. Verify an accessible route with the particular vendor cluster you plan to visit.",
    areaGuide: {
      intro: "Separate the enormous recurring market from the county-seat downtown and choose the itinerary that matches the date you will actually be in town.",
      nearbyAttractions: [
        { name: "Original First Monday Park FAQ", description: "The official date rules, free admission, accessible parking, scooters and current parking details.", proximity: "Market grounds", href: "https://www.firstmondaycanton.com/frequently-asked-questions" },
        { name: "Trade Days entrance maps", description: "Official walking and parking maps for the city's original market grounds.", proximity: "Market grounds", href: "https://www.firstmondaycanton.com/maps" },
        { name: "Cherry Creek Park and Mill Creek Reservoir", description: "Distinct parks, trails, playground and lake options managed separately from market sites.", proximity: "Around Canton", href: "https://www.visitcantontx.com/parks" }
      ],
      foodAndDrink: [{ name: "Market concessions and downtown restaurants", description: "Bring cash as some market vendors do not accept cards; downtown restaurants make a practical calmer stop." }],
      lodging: [{ name: "Market-gate convenience versus quiet town stays", description: "Book earlier for trade-days weekends and consider parking and access to your preferred market entrance." }],
      neighborhoods: [{ name: "Courthouse square and historical downtown", description: "Historic Van Zandt county-seat surroundings and year-round shops that operate outside Trade Days." }],
      familyStops: [{ name: "Cherry Creek Park", description: "Shaded walking and playground options for a different pace from the shopping crowds." }],
      sideTrips: [
        { name: "Van Zandt County", description: "Connect Canton to Grand Saline salt history, Wills Point and county attractions.", href: "/county/van-zandt" },
        { name: "Purtis Creek State Park", description: "Plan a separate fishing, hiking or camping outing with TPWD's current park access guidance.", href: "https://tpwd.texas.gov/state-parks/purtis-creek" }
      ],
    },
    visitorFaqs: [
      { question: "Is First Monday Trade Days open on Monday?", answer: "No. It is held Thursday, Friday, Saturday and Sunday immediately preceding the first Monday of each month, not on Monday.", sourceUrl: "https://www.firstmondaycanton.com/frequently-asked-questions" },
      { question: "Does Canton First Monday charge admission?", answer: "The city-operated Original First Monday Park has free admission, but city-operated parking and independent venues can charge separately. Verify the chosen entrance and lot.", sourceUrl: "https://www.firstmondaycanton.com/frequently-asked-questions" },
      { question: "Is First Monday accessible for wheelchairs or scooters?", answer: "The operator lists accessible parking at designated entrances and scooter rentals. Market terrain and privately managed adjacent grounds vary, so confirm the specific route.", sourceUrl: "https://www.firstmondaycanton.com/frequently-asked-questions" },
      { question: "Can I bring a dog to First Monday?", answer: "The Original First Monday Park permits non-aggressive dogs kept on leashes with owners cleaning up after them; other market properties may apply different restrictions.", sourceUrl: "https://www.firstmondaycanton.com/frequently-asked-questions" },
    ],
    authorityGuide: {
      whyItMatters: "Canton combines one of America's largest recurring shopping destinations with the normal functioning life of an East Texas county seat. Independent planning value comes from explaining exactly when the named market operates, which admission and parking rules apply to which grounds, and what visitors can do when Trade Days is not in session.",
      assessment: { recommendedVisit: "Half day for courthouse square; one full day for First Monday; two days to combine market and East Texas outdoors", physicalEffort: "Moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Good with shorter browsing sessions and accessible parking or child-wagon planning.", firstTimeValue: "Outstanding for market-focused trips when the calendar and parking are checked." },
      itineraries: [
        { label: "First Monday first-timer", duration: "One day during the market", steps: ["Confirm this month's Thursday–Sunday dates and pick an entrance", "Browse one or two market sections instead of every field", "Allow time for lunch, large-item pickup and a short downtown stop"] },
        { label: "Downtown and parks", duration: "Half to full day", steps: ["Explore the historic courthouse square", "Visit independent stores and local eateries", "Choose Cherry Creek Park or Old City Lake based on your group's interests"] },
        { label: "Van Zandt County weekend", duration: "Two days", steps: ["Spend the first day on a prebooked market or downtown plan", "Add a separate parks or historic-community outing", "Use the county guide for Wills Point and Grand Saline context"] }
      ],
      sources: [
        { label: "City of Canton — official Trade Days FAQ", url: "https://www.firstmondaycanton.com/frequently-asked-questions", scope: "Market day rules, fee distinctions, accessibility, cash and parking" },
        { label: "City of Canton — official market map", url: "https://www.firstmondaycanton.com/maps", scope: "Entrances, vendor grounds and parking" },
        { label: "Visit Canton — attractions", url: "https://www.visitcantontx.com/attractions", scope: "Downtown, family, museum and area attractions" },
        { label: "Visit Canton — local parks", url: "https://www.visitcantontx.com/parks", scope: "City lakes, trails and recreation context" },
        { label: "Wikimedia Commons — Canton courthouse image", url: "https://commons.wikimedia.org/wiki/File:Vanzandt_courthouse_2010.jpg", scope: "Exact hero photo and Larry D. Moore CC BY 4.0 licensing" },
      ],
    },
  },
  {
    id: "small-town-taylor",
    brandId: "texasdefined",
    slug: "taylor",
    name: "Taylor",
    summary: "Taylor is a Williamson County railroad and cotton-market town with a substantial historic downtown, a mapped architectural walking tour, barbecue and locally rooted restaurants, Heritage Square and extensive city-park recreation.",
    category: "small-towns",
    region: "prairies-lakes",
    nearestTown: "Taylor",
    county: "Williamson",
    coordinates: { lat: 30.5708, lng: -97.4094 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown%20Taylor%20Texas%20Wiki.jpg?width=1600",
      alt: "Historic commercial buildings along downtown Taylor, Texas",
      width: 3000, height: 1568, credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Fall through spring for a self-guided architecture walk; summer is better paced between morning streets, shaded parks and indoor food or cultural stops.",
    entryNote: "Downtown walks and public park grounds generally do not require a townwide ticket. Individual shops, museums, events, pools, pavilions and reserved facilities have their own schedules, admission or reservation rules. Confirm the current city visitor calendar before traveling for an event.",
    highlights: ["Taylor architectural walking tour", "historic downtown", "Heritage Square", "Murphy Park", "Blackland Prairie railroad history", "barbecue", "Second Saturday shopping", "Taylor Fest"],
    body: [
      "Taylor's downtown has an unusually legible railroad story. The original Taylor settlement grew at the intersection of railway service and the Blackland Prairie's cotton economy in the late nineteenth century, with a growing commercial district close to the rail corridor. The city's published historic walking tour explains these layers building by building rather than giving visitors a generic list of 'historic storefronts.'",
      "The Greater Taylor Chamber's self-guided architectural tour identifies more than twenty-five buildings and sites around the central streets. The tour is useful for travelers who want actual address-by-address interpretation, historic hotels, commercial architecture and surviving railroad associations. A smart first visit should use its current map rather than assume all identified buildings are public interiors or open museums.",
      "Heritage Square Park provides a convenient downtown pause near the shops and community events. Its amphitheater, play areas, shade and seasonal programming give visitors a reason to stay beyond a quick drive-through. Taylor also has more expansive recreation at Murphy Park, with athletic areas, playgrounds and picnic facilities; park amenities, including pool availability, can change seasonally.",
      "Food is another reason to build in time, particularly barbecue, bakeries and locally operated restaurants. Rather than proclaim one shop universally best or guarantee hours, compare current menus and choose a dining stop near the walking-tour route. Historic buildings can have steps and uneven sidewalks, and individual storefront accessibility should be checked in advance for travelers with mobility needs.",
      "An event-oriented visit should start with the tourism office's current calendar. Second Saturday shopping and Taylor Fest are community programs with separate schedules; annual traditions are not guaranteed to land on the same weekend each year. Avoid treating Taylor as a Dallas suburb: its identity is distinctly Williamson County and the east side of the Austin-area Blackland Prairie.",
      "For two days, combine a focused architecture walk and downtown food day with a separate day of parks, local-history stops, or a regionally appropriate side trip. Williamson County includes several very different city experiences, so the Taylor visitor plan and Georgetown/central-county destinations should remain distinct even when a longer weekend connects them."
    ],
    officialUrl: "https://taylormadetexas.com/",
    sourceCheckedAt: "2026-10-12",
    directions: "Taylor lies northeast of Austin near U.S. 79 and State Highway 95 in Williamson County. The historic walking-tour corridor and Murphy Park have different parking locations; use exact destination addresses rather than a generic city map pin.",
    accessibilityNotes: "Heritage Square and major city parks have developed facilities, but older downtown buildings and their individual entrances vary. Verify accessibility for a specific museum, restaurant or historic interior rather than assuming it from the sidewalk.",
    areaGuide: {
      intro: "Start with a mapped downtown walk, then choose between food and community culture, Heritage Square and larger city-park recreation.",
      nearbyAttractions: [
        { name: "Official historic architectural walking tour", description: "More than 25 addresses with building-by-building context and a self-guided map.", proximity: "Historic downtown", href: "https://taylormadetexas.com/about/architectural-walking-tour/" },
        { name: "Heritage Square", description: "Downtown amphitheater, shade, family and event gathering space.", proximity: "400 N. Main Street", href: "https://taylormadetexas.com/parks-recreation/" },
        { name: "Murphy Park", description: "A larger recreation park with picnic and sports facilities; verify pool season separately.", proximity: "1600 Veterans Drive", href: "https://taylormadetexas.com/parks-recreation/" }
      ],
      foodAndDrink: [{ name: "Historic downtown dining", description: "Compare barbecue, cafes and independent restaurants around the walking tour without assuming published hours remain current." }],
      lodging: [{ name: "Taylor and east Williamson County stays", description: "Compare room location with downtown plans rather than assuming all Williamson County attractions are in walking distance." }],
      neighborhoods: [{ name: "Architectural downtown and railway corridor", description: "Commercial blocks and historically significant sites interpreted through the official map." }],
      familyStops: [{ name: "Heritage Square and Murphy Park", description: "Short park stops with play or picnic opportunities offer breaks from the architecture tour." }],
      sideTrips: [
        { name: "Williamson County", description: "Place Taylor's railroad and prairie story in the wider county context.", href: "/county/williamson" },
        { name: "Historic walking-tour map", description: "Use the city's building-by-building self-guided route as an independent source.", href: "https://taylormadetexas.com/about/architectural-walking-tour/" }
      ],
    },
    visitorFaqs: [
      { question: "Does Taylor have a self-guided historic walking tour?", answer: "Yes. Taylor's visitor bureau provides a self-guided architectural walking tour with more than 25 named downtown locations and a downloadable map. The route does not guarantee public entry into private buildings.", sourceUrl: "https://taylormadetexas.com/about/architectural-walking-tour/" },
      { question: "What is there for families in downtown Taylor?", answer: "Heritage Square includes gathering and play areas; nearby Murphy Park offers larger recreation facilities. Verify current pool operations and reserved park programs.", sourceUrl: "https://taylormadetexas.com/parks-recreation/" },
      { question: "When should I visit for a community event?", answer: "Check the city's current events calendar for Second Saturday shopping, Taylor Fest and seasonal gatherings rather than relying on fixed annual assumptions.", sourceUrl: "https://taylormadetexas.com/about/events/" },
    ],
    authorityGuide: {
      whyItMatters: "Taylor preserves a substantial walkable rail-era commercial landscape alongside parks, living downtown businesses and Blackland Prairie community events. The independent visitor guide should connect specific building histories and addresses with practical stops, rather than reducing Taylor to a single food category or to Austin-area suburban growth.",
      assessment: { recommendedVisit: "3–5 hours for a downtown walking and dining trip; a full day when parks and events are included", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good if a long architecture walk is balanced with park and food breaks.", firstTimeValue: "Strong for architecture, rail and local-food interests east of Austin." },
      itineraries: [
        { label: "Historic downtown Taylor", duration: "3–4 hours", steps: ["Pick up or download the official architectural walking map", "Walk one manageable downtown section with actual building histories", "Add a meal and a break at Heritage Square"] },
        { label: "Food and parks", duration: "Full day", steps: ["Explore downtown shops and a local breakfast or lunch option", "Visit Heritage Square and any scheduled community event", "Continue to Murphy Park for a separate recreation stop"] },
        { label: "Prairie and heritage weekend", duration: "Two days", steps: ["Build the first day around Taylor's railroad and architecture", "Set aside the second for parks or a verified nearby museum", "Use Williamson County guidance for regional context and return route"] }
      ],
      sources: [
        { label: "Visit Taylor — official city visitor bureau", url: "https://taylormadetexas.com/", scope: "Destination context, downtown resources and local businesses" },
        { label: "Visit Taylor — architectural tour", url: "https://taylormadetexas.com/about/architectural-walking-tour/", scope: "Verified historic building addresses, rail corridor and walking map" },
        { label: "Visit Taylor — parks", url: "https://taylormadetexas.com/parks-recreation/", scope: "Heritage Square, Murphy Park and developed park facilities" },
        { label: "Visit Taylor — events", url: "https://taylormadetexas.com/about/events/", scope: "Event programming and seasonal dates" },
        { label: "Wikimedia Commons — Downtown Taylor", url: "https://commons.wikimedia.org/wiki/File:Downtown_Taylor_Texas_Wiki.jpg", scope: "Renelibrary, exact-location photograph and CC BY-SA 4.0 licensing" }
      ],
    },
  },
];
