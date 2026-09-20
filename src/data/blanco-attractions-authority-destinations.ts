import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const blancoAttractionsAuthorityDestinations: Destination[] = [
  {
    id: "museum-buggy-barn-blanco",
    brandId: "texasdefined",
    slug: "buggy-barn-museum-blanco",
    name: "Buggy Barn Museum",
    summary:
      "Buggy Barn Museum in Blanco preserves more than 250 buggies, carriages and wagons from the 1800s and 1900s, including vehicles used in major film and television productions, with Pine Moore Old West Studio directly behind the museum.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Blanco",
    county: "Blanco",
    coordinates: { lat: 30.109159, lng: -98.417636 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Buggy Barn Museum in Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round. Most of the transportation collection is indoors, while Pine Moore Old West Studio adds an outdoor element that is most comfortable in spring, fall and mild winter weather.",
    entryNote:
      "The museum currently lists Monday-Friday hours of 9 a.m.-5 p.m., Saturday 9 a.m.-4 p.m. and Sunday closed. Admission is by donation with suggested rates of $15 adults, $12 seniors and veterans, and $10 children. The museum recommends allowing at least two hours for the collection and Old West town; verify current hours and rates before departure.",
    highlights: [
      "More than 250 historic buggies, carriages and wagons",
      "Vehicles dating from the 1800s through the early 1900s",
      "Collection representing 12 countries",
      "Film and television vehicles from productions including True Grit, 1883, 1923 and The Chosen",
      "Pine Moore Old West Studio directly behind the museum",
      "Self-guided and guided group-tour options",
    ],
    body: [
      "Buggy Barn Museum is one of Blanco's most distinctive history attractions because it focuses on the transportation technology that preceded the automobile. The museum says its collection contains more than 250 buggies, carriages and wagons from the nineteenth and early twentieth centuries, representing 12 countries and a wide range of agricultural, passenger and specialty uses.",
      "The collection is more than a line of decorative vehicles. The museum says roughly 95 percent of its carriages are original, with conservation work used where necessary to preserve structural integrity and appearance. Individual displays explain vehicle histories so visitors can tour independently, while guided visits are available for groups and school programs.",
      "Film history adds another layer. The museum identifies vehicles used in productions including the remake of True Grit, There Will Be Blood, Killers of the Flower Moon, 1883, 1923, Bass Reeves and The Chosen. For visitors interested in production design or period transportation, that makes the collection relevant beyond local history.",
      "Behind the museum, Pine Moore Old West Studio expands the experience into an outdoor period set with storefronts, a saloon, church, jail, marshal's office, stables and other Western-town structures. Museum visitors can see the exterior town environment during a normal visit; interior production access and private rentals require separate arrangements.",
      "The studio is an active production and event location rather than a static museum exhibit. Its current materials describe film, commercial, television, photo-shoot, wedding, corporate and private-event use, including a newer 3,000-square-foot flexible building. That gives the property unusual crossover value for film-history travelers, event planners and families.",
      "Because the museum sits on Main Street in Blanco, it is easy to combine with the Old Blanco County Courthouse, Blanco State Park and downtown food without turning the day into a driving itinerary. The museum itself recommends at least two hours, which is a useful planning baseline for first-time visitors.",
    ],
    managingAuthority: "Buggy Barn Museum",
    officialUrl: "https://buggybarnmuseum.com/",
    address: "1915 Main Street, Blanco, TX 78606",
    directions:
      "The museum is on Main Street/U.S. 281 in Blanco, north of the courthouse square. Use the official street address for navigation; onsite parking is available nearby according to the museum.",
    accessibilityNotes:
      "The museum welcomes school groups and guided tours, but the property combines indoor museum space with the outdoor Old West studio. Contact the museum directly if your visit depends on a specific step-free route or other mobility accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Buggy Barn as the history anchor for a Blanco day, then connect it with the courthouse square, river park and the town's craft beverage destinations.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "Use the town guide for the courthouse square, Blanco State Park, food, shops and additional local attractions.",
          proximity: "In town",
          href: "/destination/blanco",
        },
        {
          name: "Old Blanco County Courthouse",
          description:
            "The restored 1885 courthouse anchors downtown Blanco and adds political and architectural history.",
          proximity: "Downtown Blanco",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "A compact river park inside town with swimming, fishing, paddling, camping and shaded picnicking.",
          proximity: "South of downtown",
          href: "/destination/blanco-state-park",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Blanco",
          description:
            "Restaurants and cafes around Main Street and the square make a natural break before or after the museum.",
          proximity: "Minutes away",
          href: "/destination/blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Local inns, guesthouses and river-area stays keep the museum, state park and downtown within a short drive.",
          proximity: "In town",
          href: "/destination/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Main Street / U.S. 281",
          description:
            "The museum sits on Blanco's main north-south corridor, linking downtown with other Hill Country attractions.",
          proximity: "At the museum",
          href: "/destination/blanco",
        },
      ],
      familyStops: [
        {
          name: "Pine Moore Old West Studio",
          description:
            "The period-town setting behind the museum gives children and families a more immersive way to experience the transportation collection.",
          proximity: "Onsite",
          href: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
        },
        {
          name: "Blanco State Park",
          description:
            "Add river time, picnicking or a short outdoor block after the museum.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Continue north for Science Mill, LBJ history and the Texas Vintage Motorcycle Museum.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide for Hye, Johnson City, the Pedernales corridor and other Hill Country stops.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Buggy Barn preserves a large, specialized transportation collection while connecting horse-drawn vehicle history to modern film production through the adjacent Pine Moore Old West Studio.",
      assessment: {
        recommendedVisit:
          "Plan about 2 hours for the museum and exterior Old West town; history enthusiasts or guided groups may want longer.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Strong for families interested in vehicles, Western history, movies and hands-on visual learning.",
        firstTimeValue:
          "High because the collection and production-set combination is unusual even among Texas small-town museums.",
      },
      itineraries: [
        {
          label: "Museum-focused visit",
          duration: "2 hours",
          steps: [
            "Start with the carriage and wagon galleries.",
            "Read the individual vehicle histories rather than rushing the collection.",
            "Finish with the exterior Pine Moore Old West Studio area and gift shop.",
          ],
        },
        {
          label: "Blanco family half day",
          duration: "4–5 hours",
          steps: [
            "Spend the first block at Buggy Barn Museum.",
            "Eat around downtown Blanco and the courthouse square.",
            "Use Blanco State Park for an outdoor afternoon if river and weather conditions are favorable.",
          ],
        },
        {
          label: "Blanco County history day",
          duration: "Full day",
          steps: [
            "Use Buggy Barn as the transportation-history anchor.",
            "Add the Old Blanco County Courthouse and downtown.",
            "Continue toward Johnson City or another county heritage stop.",
          ],
        },
      ],
      sources: [
        {
          label: "Buggy Barn Museum — Blanco visitor page",
          url: "https://buggybarnmuseum.com/locations/blanco",
          scope: "Current hours, admission, address, parking and recommended visit length.",
        },
        {
          label: "Buggy Barn Museum — collection",
          url: "https://buggybarnmuseum.com/services/buggy-carriage-wagon-collection",
          scope: "Collection size, originality, countries represented, photography and film/television vehicle history.",
        },
        {
          label: "Buggy Barn Museum — Pine Moore Old West Studio",
          url: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
          scope: "Current Old West studio features, production uses and event-space context.",
        },
        {
          label: "Texas Historical Commission Atlas — Buggy Barn Museum",
          url: "https://atlas.thc.texas.gov/Details/4200001105",
          scope: "Independent museum listing and Blanco location confirmation.",
        },
      ],
    },
    featured: false,
  },
  {
    id: "distillery-milam-greene-blanco",
    brandId: "texasdefined",
    slug: "milam-greene-whiskey-distillery-blanco",
    name: "Milam & Greene Whiskey Distillery",
    summary:
      "Milam & Greene's Blanco distillery and tasting room combines Texas pot-distilling, barrel aging and blending with guided distillery tours, whiskey flights, cocktails, limited releases and a relaxed live-oak Hill Country setting.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Blanco",
    county: "Blanco",
    coordinates: { lat: 30.1122536, lng: -98.4177382 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Milam & Greene Whiskey Distillery in Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round; spring and fall are especially comfortable for the outdoor seating beneath the live oaks, while the tasting room and distillery tour work well during hot or wet weather.",
    entryNote:
      "The official visitor page currently lists tasting-room hours Monday-Wednesday noon-6 p.m., Thursday-Saturday noon-7 p.m., and Sunday closed. Distillery tours are bookable separately through the official Blanco Tours page. Hours, tour inventory and limited-release availability change, so use the live booking page as the final authority.",
    highlights: [
      "Working Blanco distillery and rickhouse",
      "Guided distillery tours",
      "Whiskey flights and cocktails",
      "Texas pot-distilled bourbon plus Kentucky-Texas aging and blending",
      "Distillery-only and limited-release bottles when available",
      "Outdoor seating beneath mature live oaks",
    ],
    body: [
      "Milam & Greene gives Blanco a whiskey destination that is more than a tasting bar. The company's current materials describe a production and blending program built around whiskey distilled in Texas and Kentucky, barrel aging in different climates and final blending work centered on Blanco.",
      "The distillery team includes founder Marsha Milam, CEO and master blender Heather Greene and master distiller Marlene Holmes. Milam & Greene describes Holmes as the 99th inductee to the Whisky Hall of Fame, and the company uses its Blanco operation to explore how the Texas climate changes barrel maturation.",
      "That climate work is part of the visitor story. Milam & Greene calls its place-driven maturation approach 'Texification,' and current limited releases emphasize whiskey aged or finished in Blanco rickhouses through Hill Country heat and cold. The company's 'The Answer' project even compared the same bourbon aged in Kentucky and Texas to examine climate effects.",
      "For visitors, the tasting room offers pours, flights, cocktails and bottle sales, while the official Blanco Tours page provides a separate way to book a distillery visit. Current visitor information lists the tasting room open six days a week and closed Sunday.",
      "The property is especially useful as a slower Hill Country stop rather than a quick retail visit. The live-oak setting, outdoor seating and recurring bottle-release or music programming can extend the stay, while limited expressions are sometimes available only in Blanco even after online inventory sells out.",
      "Because the distillery sits on the north side of Blanco, it pairs easily with Buggy Barn Museum, the courthouse square, Real Ale Brewing and Blanco State Park. That makes it possible to build a craft-and-history day without leaving the town area.",
    ],
    managingAuthority: "Milam & Greene Whiskey",
    officialUrl: "https://milamandgreenewhiskey.com/pages/visit-us",
    reservationUrl: "https://milamandgreenewhiskey.com/pages/blanco-tours",
    address: "208 Carlie Ln, Blanco, TX 78606",
    directions:
      "The distillery is at 208 Carlie Lane on the north side of Blanco, across from Blanco River Inn according to the official visitor page.",
    accessibilityNotes:
      "The property combines a tasting room, production environment, rickhouse areas and outdoor seating. Contact Milam & Greene directly before booking if your tour depends on a specific mobility accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Treat Milam & Greene as the whiskey anchor for a Blanco craft day, then connect it with the brewery, river, courthouse and transportation-history stops.",
      nearbyAttractions: [
        {
          name: "Buggy Barn Museum",
          description:
            "A large historic carriage and wagon collection with the Pine Moore Old West Studio directly behind it.",
          proximity: "Nearby on Main Street",
          href: "/destination/buggy-barn-museum-blanco",
        },
        {
          name: "Blanco",
          description:
            "Use the town guide for the courthouse square, Blanco State Park, food and additional local attractions.",
          proximity: "In town",
          href: "/destination/blanco",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "Blanco's long-running brewery and Real Spirits program add beer and grain-to-glass spirits to the same local craft cluster.",
          proximity: "North Blanco",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Blanco",
          description:
            "Use the square and Main Street for a meal before or after a tasting or tour.",
          proximity: "Minutes away",
          href: "/destination/blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Local inns and guesthouses are the safest option for visitors who do not want to drive after a whiskey-focused stop.",
          proximity: "In town",
          href: "/destination/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "North Blanco craft corridor",
          description:
            "Milam & Greene, Buggy Barn and Real Ale create a compact craft-and-attractions cluster north of the courthouse square.",
          proximity: "Around the distillery",
          href: "/destination/blanco",
        },
      ],
      familyStops: [
        {
          name: "Buggy Barn Museum",
          description:
            "A family-oriented history stop for groups whose day is not centered entirely on adult beverage destinations.",
          proximity: "Nearby",
          href: "/destination/buggy-barn-museum-blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "River access, picnicking and trails provide an outdoor counterpoint to the tasting room.",
          proximity: "In town",
          href: "/destination/blanco-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Hye",
          description:
            "Continue north toward Hye for Garrison Brothers and the U.S. 290 wine-and-spirits corridor.",
          proximity: "North toward U.S. 290",
          href: "/destination/hye",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to combine Blanco with Johnson City, Hye and Hill Country road trips.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Milam & Greene connects Blanco to the modern Texas whiskey story through active distilling, blending and barrel-aging work, while its climate-focused projects make the Hill Country environment part of the product rather than merely the setting.",
      assessment: {
        recommendedVisit:
          "Plan 1 to 2 hours for a tasting-room visit and longer when booking a distillery tour or attending a release event.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Best for adult whiskey-focused visitors; mixed-age groups should confirm current tour and tasting-room policies before arrival.",
        firstTimeValue:
          "High for whiskey travelers because the Blanco operation combines production, barrel aging, blending and direct-to-visitor releases.",
      },
      itineraries: [
        {
          label: "Tasting-room stop",
          duration: "1–1.5 hours",
          steps: [
            "Check current tasting-room hours and any special events.",
            "Choose a flight, pour or cocktail based on current availability.",
            "Ask about distillery-only or limited Blanco releases before leaving.",
          ],
        },
        {
          label: "Tour-focused visit",
          duration: "2–3 hours",
          steps: [
            "Book the Blanco tour in advance through the official page.",
            "Arrive with enough time to check in without rushing.",
            "Use the tasting room and outdoor area after the production tour.",
          ],
        },
        {
          label: "Blanco craft day",
          duration: "Full day",
          steps: [
            "Use Milam & Greene as the whiskey anchor.",
            "Add Real Ale Brewing for a different production perspective.",
            "Break up beverage stops with Buggy Barn, downtown Blanco or the state park.",
          ],
        },
      ],
      sources: [
        {
          label: "Milam & Greene — Visit Blanco",
          url: "https://milamandgreenewhiskey.com/pages/visit-us",
          scope: "Current tasting-room hours, address and visitor information.",
        },
        {
          label: "Milam & Greene — Blanco Tours",
          url: "https://milamandgreenewhiskey.com/pages/blanco-tours",
          scope: "Current distillery-tour booking route.",
        },
        {
          label: "Milam & Greene — official site",
          url: "https://milamandgreenewhiskey.com/",
          scope: "Current distillery team, production philosophy and Blanco-based whiskey program.",
        },
        {
          label: "Milam & Greene — Wildlife Collections",
          url: "https://milamandgreenewhiskey.com/pages/wildlife-collections",
          scope: "Current Blanco aging context and Texas-climate maturation examples.",
        },
      ],
    },
    featured: false,
  },
  {
    id: "historic-twin-sisters-dance-hall",
    brandId: "texasdefined",
    slug: "twin-sisters-dance-hall-blanco",
    name: "Twin Sisters Dance Hall",
    summary:
      "Twin Sisters Dance Hall south of Blanco is a volunteer-run nineteenth-century Hill Country dance hall that still hosts public dances, live bands, two-step lessons, fundraisers and community gatherings on its historic wooden floor.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Blanco",
    county: "Blanco",
    coordinates: { lat: 30.0025, lng: -98.4053 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Twin Sisters Dance Hall south of Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round for scheduled dances and special events; spring and fall are especially comfortable for the rural Hill Country setting, while summer events can be warm in the historic hall.",
    entryNote:
      "Twin Sisters publishes public dances and special events on its live calendar rather than maintaining one permanent visitor schedule. Current 2026 listings include first-Saturday dances, the September Raise the Roof fundraiser, October and November dances, the December Festival of Texas Fiddling and New Year's Eve. Check the official calendar for the exact band, ticket price, lessons and start time before driving out.",
    highlights: [
      "Historic dance hall built by German immigrants in the 1870s",
      "Public dances on the first Saturday of the month",
      "Live country, western and Texas dance music",
      "Historic wooden dance floor and communal-hall layout",
      "Volunteer-run 501(c)(3) preservation organization",
      "Special events including Raise the Roof and the Festival of Texas Fiddling",
    ],
    body: [
      "Twin Sisters Dance Hall is a living piece of Texas Hill Country culture rather than a preserved building that visitors only look at. The hall was built by German immigrants in the 1870s as a community gathering place and continues to function as a dance hall, meeting space, fundraiser venue and private-event location.",
      "The regular public-dance tradition is the heart of the experience. The hall's current materials say dances continue on the first Saturday of every month, supplemented by special events, dance lessons and larger fundraisers. Ticket prices and bands vary by date, so the live calendar matters more than a static admission figure.",
      "The building itself is part of the attraction. Texas Dance Hall Preservation describes the nineteenth-century hall beneath live oaks, with weathered exterior cladding, rows of windows, long communal tables and a wooden dance floor whose history reaches back generations. The setting explains why the hall feels different from a modern concert venue even when the event is contemporary.",
      "Preservation is also part of the modern story. Twin Sisters operates as a volunteer-run nonprofit, and fundraising events help pay for the ongoing maintenance of the historic building. The annual Raise the Roof weekend combines live music, dancing, food, contests, vendors and community activities specifically to support the hall.",
      "Current 2026 programming shows how broad the hall's role remains. In addition to monthly dances, the calendar includes the multi-day Festival of Texas Fiddling in December, with concerts, contests, workshops and all-day dancing, plus seasonal and New Year's events.",
      "The hall sits roughly six to seven miles south of Blanco on U.S. 281 near the historic Twin Sisters community. Visitors should treat it as a scheduled-event destination: verify the date, start time, ticket rules and food/beverage policies before leaving town, especially for a first visit after dark.",
    ],
    managingAuthority: "Twin Sisters Dance Hall, Inc.",
    officialUrl: "https://www.twinsistersdancehall.com/",
    reservationUrl: "https://www.twinsistersdancehall.com/calendar/",
    address: "6720 US-281, Blanco, TX 78606",
    directions:
      "Twin Sisters Dance Hall is south of Blanco on U.S. 281 near the Little Blanco River/FM 473 area. The hall warns that navigation can be imperfect, so review the current official directions before a nighttime event.",
    accessibilityNotes:
      "The venue is a historic rural dance hall. Contact the hall before purchasing tickets if your visit depends on a specific accessible parking, entrance, restroom or seating arrangement.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Plan Twin Sisters around an actual dance or special event, then use Blanco for dinner, lodging and daytime Hill Country stops.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "Downtown Blanco provides restaurants, lodging, the courthouse square and river access before or after an event.",
          proximity: "About 6–7 miles north",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "A compact river park inside Blanco for swimming, fishing, paddling, camping and picnicking.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Buggy Barn Museum",
          description:
            "A transportation-history museum and Old West production studio on Blanco's north side.",
          proximity: "In Blanco",
          href: "/destination/buggy-barn-museum-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Twin Sisters concessions and Old 300 BBQ",
          description:
            "The hall currently sells beverages and snacks, and its site lists Old 300 BBQ onsite for public dance nights.",
          proximity: "At the hall",
        },
        {
          name: "Downtown Blanco",
          description:
            "Use town restaurants for a full meal before an evening dance.",
          proximity: "About 6–7 miles north",
          href: "/destination/blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Staying in Blanco shortens the post-dance drive and keeps daytime attractions close.",
          proximity: "North of the hall",
          href: "/destination/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Twin Sisters community",
          description:
            "The rural community south of Blanco takes its name from nearby twin hills and retains the ranch-country setting that shaped the hall.",
          proximity: "At the hall",
          href: "/county/blanco",
        },
      ],
      familyStops: [
        {
          name: "Buggy Barn Museum",
          description:
            "A daytime history stop that works well before an evening dance.",
          proximity: "In Blanco",
          href: "/destination/buggy-barn-museum-blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "Use river time or a picnic as the outdoor portion of a family weekend.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Extend the dance-hall trip to Johnson City, Hye, breweries, distilleries and Pedernales-area attractions.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
        {
          name: "Texas Hill Country",
          description:
            "Use Twin Sisters as part of a broader Texas dance-hall and small-town route.",
          proximity: "Regional",
          href: "/explore/region/hill-country",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Twin Sisters preserves the social function that made Texas dance halls important in the first place: it remains a working community space where people still gather for live music and dancing rather than a heritage shell disconnected from its original use.",
      assessment: {
        recommendedVisit:
          "Plan an entire evening around a public dance; special festivals and fundraisers can justify a half-day or full-day visit.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mostly indoors",
        planningLevel: "Moderate",
        familyFit:
          "Good for families comfortable with live music and evening events; check the specific event's child pricing, schedule and policies.",
        firstTimeValue:
          "Very high for visitors who want an authentic Hill Country dance-hall experience rather than a modern honky-tonk approximation.",
      },
      itineraries: [
        {
          label: "First-Saturday dance",
          duration: "Evening",
          steps: [
            "Confirm the current band, doors, dance time and ticket price.",
            "Eat in Blanco or use the current hall food option.",
            "Arrive before the main dance block to get oriented and, when offered, join a two-step lesson.",
          ],
        },
        {
          label: "Blanco history day + dance",
          duration: "Full day",
          steps: [
            "Use Buggy Barn Museum or the courthouse square as the daytime history anchor.",
            "Take a meal break in Blanco.",
            "Drive south to Twin Sisters for the evening dance.",
          ],
        },
        {
          label: "Festival weekend",
          duration: "1–2 days",
          steps: [
            "Use the event calendar to choose Raise the Roof, the Festival of Texas Fiddling or another special program.",
            "Book Blanco-area lodging before a high-demand weekend.",
            "Treat published event schedules as live information and recheck before departure.",
          ],
        },
      ],
      sources: [
        {
          label: "Twin Sisters Dance Hall — official site",
          url: "https://www.twinsistersdancehall.com/",
          scope: "Current monthly-dance tradition, nonprofit status, onsite concessions and preservation mission.",
        },
        {
          label: "Twin Sisters Dance Hall — calendar",
          url: "https://www.twinsistersdancehall.com/calendar/",
          scope: "Current 2026 bands, special events, ticket prices and dance schedule.",
        },
        {
          label: "Twin Sisters Dance Hall — sponsorship history",
          url: "https://www.twinsistersdancehall.com/sponsorship/",
          scope: "1870s construction, German immigrant origins, volunteer management and preservation context.",
        },
        {
          label: "Texas Dance Hall Preservation — Twin Sisters history",
          url: "https://texasdancehall.org/the-twin-sisters-dance-hall-by-patrick-cox-ph-d/",
          scope: "Historic building character, community function and dance-hall history.",
        },
      ],
    },
    featured: false,
  },
];
