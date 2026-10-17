/** Operator-backed Texas water-park census, reviewed 2026-10-17. One park per physical facility, not per brand. */
export type WaterParkSetting = "Indoor" | "Outdoor" | "Both";
export type WaterParkKind = "Destination park" | "Indoor resort park" | "Community water park" | "Indoor public park" | "Municipal water park" | "Campground water park" | "Resort beach water park" | "Resort water park" | "Inflatable lake water park";
export type WaterParkGuide = { slug: string; name: string; city: string; county?: string; region: string; authorityReady?: boolean; authorityEvidence?: { exactAddress: string; licensedImageSrc: string; imageCredit: string; accessVerifiedAt: string; rideHighlights: string[]; sourceUrls: string[] }; setting: WaterParkSetting; kind: WaterParkKind; admission: string; summary: string; distinctiveNote: string; officialUrl: string; reviewedAt: string; visitorFaqs?: {question: string; answer: string; sourceUrl: string}[]; visitorAddress?: string; visitorHighlights?: string[] };
export const texasWaterParks: WaterParkGuide[] = [
  {
    "slug": "schlitterbahn-new-braunfels",
    "name": "Schlitterbahn New Braunfels",
    "city": "New Braunfels",
    "county": "Comal",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and resort packages vary",
    "summary": "Multiple park areas and spring-fed river attractions shape an all-day Hill Country visit.",
    "distinctiveNote": "Plan around the official map and check whether the attraction area and season you want are operating.",
    "officialUrl": "https://www.sixflags.com/schlitterbahnnewbraunfels",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "schlitterbahn-galveston",
    "name": "Schlitterbahn Galveston",
    "city": "Galveston",
    "county": "Galveston",
    "region": "Gulf Coast",
    "setting": "Both",
    "kind": "Destination park",
    "admission": "Park admission; separate from nearby hotels",
    "summary": "Galveston's indoor and outdoor water-park complex is a separate attraction from the beach.",
    "distinctiveNote": "Schlitterbahn Galveston joined the Enchanted Parks family in 2026. The operator says Six Flags passes and memberships will no longer be honored here in 2027; check the Enchanted Parks ticket calendar and any operating indoor areas.",
    "officialUrl": "https://galvestonislandwaterpark.enchantedparks.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2109 Gene Lucas Blvd., Galveston, TX 77554",
    "visitorHighlights": [
      "Schlitterbahn Galveston became part of Enchanted Parks in 2026; its 2027 season pass is not the same as the former Six Flags membership.",
      "The current owner warns that Shipwreck Harbor, MASSIV, Whitewater River, Treasure Island Kids Pool, Infinity Swim-up Bar and Bahnzai Pipeline are unavailable.",
      "The operator lists free regular parking in Lot C and separately paid preferred parking in Lot B.",
      "Schlitterbahn Galveston has distinct river and slide areas, but the current temporarily unavailable attractions should not be promised as operating.",
      "The park's owner explains how qualifying older 2026 Six Flags passes are treated differently from renewed 2027 Six Flags passes."
    ],
    "visitorFaqs": [
      {
        "question": "Does a Six Flags membership work at Schlitterbahn Galveston in 2027?",
        "answer": "No. Enchanted Parks says renewed 2027 Six Flags passes are not valid for its Galveston waterpark; eligible 2026 multi-park passes purchased before the ownership cutoff have specific transitional benefits.",
        "sourceUrl": "https://galvestonislandwaterpark.enchantedparks.com/park-info/guest-faq/"
      },
      {
        "question": "Are MASSIV and Bahnzai Pipeline available?",
        "answer": "The park's official site currently lists MASSIV, Bahnzai Pipeline, Shipwreck Harbor and several other named attractions as unavailable. Check the operator's live attraction report instead of assuming they operate.",
        "sourceUrl": "https://galvestonislandwaterpark.enchantedparks.com/passes-and-tickets/upgrades/parking/"
      },
      {
        "question": "Is standard parking free at Schlitterbahn Galveston?",
        "answer": "Yes. The new operator identifies complimentary general parking in Lot C. Preferred parking in Lot B is a separately paid upgrade.",
        "sourceUrl": "https://galvestonislandwaterpark.enchantedparks.com/passes-and-tickets/upgrades/parking/"
      },
      {
        "question": "Where is the Galveston waterpark entrance?",
        "answer": "The Enchanted Parks operator lists 2109 Gene Lucas Boulevard, Galveston, Texas 77554, near Moody Gardens; this is not the New Braunfels Schlitterbahn location.",
        "sourceUrl": "https://galvestonislandwaterpark.enchantedparks.com/park-info/guest-faq/"
      }
    ]
  },
  {
    "slug": "typhoon-texas-katy",
    "name": "Typhoon Texas Houston (Katy)",
    "city": "Katy",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and season passes",
    "summary": "A west-Houston-area water park with slides, wave attractions and family play areas.",
    "distinctiveNote": "Search for the Katy/Houston location specifically; Typhoon Texas also operates near Austin.",
    "officialUrl": "https://typhoontexas.com/houston/hours-and-location/",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "typhoon-texas-austin",
    "name": "Typhoon Texas Austin (Pflugerville)",
    "city": "Pflugerville",
    "county": "Travis",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and season passes",
    "summary": "The Pflugerville water-park destination is an Austin-area alternative to Hill Country river swimming.",
    "distinctiveNote": "Verify the Austin/Pflugerville calendar rather than the operator's Katy calendar.",
    "officialUrl": "https://www.typhoontexas.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "18500 TX-130 N. Service Rd., Pflugerville, TX 78660",
    "visitorHighlights": [
      "Typhoon Texas Austin is located in Pflugerville and has its own daily event and operating calendar, separate from the Houston/Katy location.",
      "The Austin ride roster includes Derby Dash, The Duelin' Daltons, The Gully Washer and The Snake Pit.",
      "Less intense offerings include Buckaroo Bayou, Howdy Hollow, Lazy T River and Tidal Wave Bay.",
      "The October, November and December 2026 waterpark calendars currently show every day closed, so season-pass promotions do not mean fall slides are available.",
      "The Austin site offers location-specific Guest Relations support for visitors with accessibility questions and park-specific rides."
    ],
    "visitorFaqs": [
      {
        "question": "Is the Austin Typhoon Texas park open in October 2026?",
        "answer": "No. Its official Pflugerville calendar marks every day in October 2026 closed, along with November and December dates. Check the future summer calendar before traveling.",
        "sourceUrl": "https://typhoontexas.com/austin/hours-and-location/"
      },
      {
        "question": "How does the Austin location differ from Katy?",
        "answer": "The Pflugerville location has its own operating schedule and attractions such as Derby Dash, The Gully Washer, The Snake Pit, Buckaroo Bayou and Lazy T River. Do not use the Katy ticket calendar.",
        "sourceUrl": "https://typhoontexas.com/austin/attractions/"
      },
      {
        "question": "What is the correct Pflugerville street address?",
        "answer": "Typhoon Texas Austin lists 18500 TX-130 North Service Road, Pflugerville, Texas 78660, with its own guest services contact rather than the Houston phone and address.",
        "sourceUrl": "https://typhoontexas.com/austin/hours-and-location/"
      },
      {
        "question": "How can someone with accessibility needs plan rides?",
        "answer": "The park directs guests with disabilities to Guest Relations on arrival for information about available rides, accessibility and individual accommodations.",
        "sourceUrl": "https://typhoontexas.com/austin/faq/"
      }
    ]
  },
  {
    "slug": "hurricane-harbor-arlington",
    "name": "Six Flags Hurricane Harbor Arlington",
    "city": "Arlington",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Water-park ticket or qualifying pass; verify inclusions",
    "summary": "A major Arlington water park distinct from Six Flags Over Texas.",
    "distinctiveNote": "Do not assume admission to the neighboring theme park includes Hurricane Harbor.",
    "officialUrl": "https://www.sixflags.com/hurricaneharborarlington",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1800 E. Lamar Blvd., Arlington, TX 76006",
    "visitorHighlights": [
      "Hurricane Harbor Arlington introduced a 58,000-square-foot Splash Island family zone with a three-story climbing/water play structure.",
      "Splash Island includes 110 interactive water features, 17 family slides and a 1,000-gallon tipping water bucket.",
      "The park lists high-thrill attractions such as Der Stuka, Dive Bomber and Geronimo plus a separate lazy river.",
      "Six Flags reported ride upgrades to Sea Wolf, Raging Rapids and the Wave Pool in its 2026 season.",
      "Fast Lane is a separately purchased ride line-access upgrade and applies only to participating attractions.",
      "Arlington waterpark admission and qualifying combination passes should not be confused with a standard Six Flags Over Texas theme-park ticket."
    ],
    "visitorFaqs": [
      {
        "question": "What changed at Hurricane Harbor Arlington in 2026?",
        "answer": "The operator identifies Splash Island's 58,000-square-foot family water-play space, 110 interactive features, 17 slides and a 1,000-gallon dumping bucket as key additions.",
        "sourceUrl": "https://www.sixflags.com/blog/Hurricane-harbor-arlington-2026-opening"
      },
      {
        "question": "Are there gentler activities beyond thrill slides?",
        "answer": "Yes. Splash Island offers family water play, the park has a lazy river, and premium reserved shade areas and double-decker cabanas are available separately.",
        "sourceUrl": "https://www.sixflags.com/blog/Hurricane-harbor-arlington-2026-opening"
      },
      {
        "question": "Is Fast Lane included in standard admission?",
        "answer": "No. Six Flags describes Fast Lane as an optional paid upgrade with a separate wristband valid at participating waterpark rides, not a blanket way to skip every attraction.",
        "sourceUrl": "https://www.sixflags.com/blog/Hurricane-harbor-arlington-2026-opening"
      },
      {
        "question": "Can we assume admission to Six Flags Over Texas includes Hurricane Harbor?",
        "answer": "Not necessarily. These are distinct parks with different ticket and pass eligibility. Check the precise product and date before purchasing a waterpark visit.",
        "sourceUrl": "https://www.sixflags.com/hurricaneharbortexas"
      }
    ]
  },
  {
    "slug": "hurricane-harbor-splashtown",
    "name": "Six Flags Hurricane Harbor Splashtown",
    "city": "Spring",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Water-park admission and passes",
    "summary": "North Houston's established Splashtown water park operates under the Hurricane Harbor name.",
    "distinctiveNote": "Look for Spring/Splashtown rather than Hurricane Harbor Arlington when selecting tickets.",
    "officialUrl": "https://www.sixflags.com/hurricaneharborsplashtown",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "21300 Interstate 45 N., Spring, TX 77373",
    "visitorHighlights": [
      "Hurricane Harbor Splashtown is located north of Houston in Spring and operates as a separately named Six Flags waterpark.",
      "The park's attractions include high-thrill Big Spin water slides, a Hurricane Bay wave pool and a distinct lazy river.",
      "Family slide attractions and children's play are listed separately from the park's tallest waterslides.",
      "On-site food venues and optional dining bundles are advertised by the operator, with a separate current food-and-beverage policy.",
      "The park has its own special-event and chaperone policies, which may not match other Six Flags waterparks.",
      "Season passes and memberships have park-specific eligibility; check that the particular pass includes this Houston-area venue."
    ],
    "visitorFaqs": [
      {
        "question": "Is Hurricane Harbor Splashtown the Arlington waterpark?",
        "answer": "No. Splashtown is the Spring-area Hurricane Harbor facility near Houston with its own schedule and attraction inventory. Arlington is a separate physical waterpark.",
        "sourceUrl": "https://www.sixflags.com/splashtown"
      },
      {
        "question": "Does Splashtown have rides for people who avoid big slides?",
        "answer": "Yes. The operator identifies Hurricane Bay wave-pool attractions, lazy-river floating and several family pools in addition to larger water slides and Big Spin.",
        "sourceUrl": "https://www.sixflags.com/splashtown"
      },
      {
        "question": "Are all Six Flags season passes valid at Splashtown?",
        "answer": "Not automatically. The operator sells memberships and passes with differing park-access rules. Verify the specific product's Houston-area eligibility before purchasing.",
        "sourceUrl": "https://www.sixflags.com/splashtown"
      },
      {
        "question": "Do visitors need to check a separate park event calendar?",
        "answer": "Yes. Splashtown publishes its own dates, special events and chaperone policies; the nearby theme park or Arlington's Hurricane Harbor hours do not replace its calendar.",
        "sourceUrl": "https://www.sixflags.com/splashtown/frequently-asked-questions"
      }
    ]
  },
  {
    "slug": "aquatica-san-antonio",
    "name": "Aquatica San Antonio",
    "city": "San Antonio",
    "county": "Bexar",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Separate water-park admission or eligible combination ticket",
    "summary": "The SeaWorld-adjacent water park combines slides, family attractions and its own ticketing.",
    "distinctiveNote": "Check Aquatica access separately from SeaWorld San Antonio admission.",
    "officialUrl": "https://aquatica.com/san-antonio/",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "big-rivers-new-caney",
    "name": "Big Rivers Waterpark & Adventures",
    "city": "New Caney",
    "county": "Montgomery",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets, passes and attraction options",
    "summary": "A northeast-Houston family complex combining a water park with other adventures.",
    "distinctiveNote": "Read the ticket inclusions: water-park access and land attractions can be packaged differently.",
    "officialUrl": "https://bigriverswaterpark.com/",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "splashway-sheridan",
    "name": "Splashway Waterpark",
    "city": "Sheridan",
    "county": "Colorado",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and campground packages",
    "summary": "A destination water park with on-site camping options in rural Colorado County.",
    "distinctiveNote": "Decide whether this is a day trip or an overnight camping visit before comparing costs.",
    "officialUrl": "https://www.splashway.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5211 Main St., Sheridan, TX 77475",
    "visitorHighlights": [
      "The Sheridan park has two distinct wave-pool experiences, including the operator's larger Wavepool and smaller We Are Family wave beach connecting to the lazy river.",
      "Dueling Splash Blasters is a pair of water-coaster lanes with a published 42-inch minimum height and combined rider weight limits.",
      "The lazy river can be enjoyed with or without a tube; Minnow Pond is a children-focused low-thrill splash area with a posted 36-inch maximum height.",
      "Splashway has a separate campground with RV sites, cabins and other overnight stays; campground event scheduling does not establish whether the waterpark rides are operating.",
      "The waterpark and campground use separate ticket, lodging and seasonal booking functions, so the correct product matters when arranging a visit."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Splashway in Sheridan?",
        "answer": "The operator publishes 5211 Main Street, Sheridan, Texas 77475 for Splashway Waterpark and its campground. Lodging check-in and waterpark admission are different products.",
        "sourceUrl": "https://splashway.com/"
      },
      {
        "question": "How tall does a rider need to be for Dueling Splash Blasters?",
        "answer": "The operator lists at least 42 inches for Dueling Splash Blasters, with a combined rider weight of at least 175 pounds and no more than 450 pounds. Ride attendants enforce its posted limits.",
        "sourceUrl": "https://splashway.com/waterpark/attractions/"
      },
      {
        "question": "Are all attractions suitable for toddlers?",
        "answer": "No. Large water-coaster attractions have minimum rider heights, while Minnow Pond is specifically categorized for children 36 inches or shorter. Review rules for each planned attraction.",
        "sourceUrl": "https://splashway.com/waterpark/attractions/"
      },
      {
        "question": "Does camping admission mean the waterpark slides are operating in October?",
        "answer": "Not necessarily. Splashway promotes October campground Halloweekends separately from its seasonal waterpark schedule. Check the dated waterpark hours before assuming slides and wave pools are open.",
        "sourceUrl": "https://splashway.com/about/hours-directions/"
      }
    ]
  },
  {
    "slug": "beach-waterpark-south-padre",
    "name": "Beach Waterpark at Isla Blanca",
    "city": "South Padre Island",
    "county": "Cameron",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Water-park ticket; adjacent resort lodging sold separately",
    "summary": "The former Schlitterbahn South Padre attraction now operates as Beach Waterpark.",
    "distinctiveNote": "Do not confuse Beach Waterpark admission with the nearby resort or general beach access.",
    "officialUrl": "https://beachwaterparktx.com/waterpark-information",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "33261 State Park Rd. 100, South Padre Island, TX 78597",
    "visitorHighlights": [
      "Beach Waterpark at Isla Blanca is the former Schlitterbahn South Padre location, operated as a separate brand from the Galveston and New Braunfels parks.",
      "The operator offers high-thrill slides, family water-play attractions and gentler lazy-river activities.",
      "Tickets and season passes are specific to the waterpark and should not be confused with admission to the nearby public beach or resort lodging.",
      "Cabanas and palapa shade areas are bookable separately from the standard waterpark ticket.",
      "The operator publishes an individual seasonal operating calendar and special events rather than promising year-round park admission.",
      "On-site dining and restaurants are available; actual current food policy and ride restrictions should be checked on the venue's current park information page."
    ],
    "visitorFaqs": [
      {
        "question": "Is Beach Waterpark the same as Schlitterbahn Galveston?",
        "answer": "No. This is the former Schlitterbahn South Padre Island park, now known as Beach Waterpark at Isla Blanca, with its own entrance, ticket options and operating calendar.",
        "sourceUrl": "https://beachwaterparktx.com/waterpark-information"
      },
      {
        "question": "Does an Isla Blanca beach pass include waterpark slides?",
        "answer": "No. Beach Waterpark operates a separate admission system; its waterpark tickets should not be assumed to be included in general public beach or resort access.",
        "sourceUrl": "https://beachwaterparktx.com/waterpark-information"
      },
      {
        "question": "Are private cabanas available?",
        "answer": "Yes. The operator lists cabanas and palapas as separate premium shade and gathering choices, alongside standard waterpark attractions.",
        "sourceUrl": "https://beachwaterparktx.com/waterpark-information"
      },
      {
        "question": "Can travelers count on the waterpark being open every day?",
        "answer": "No. The operator publishes a season calendar with specific opening days and special events. Check the exact date before traveling to South Padre Island.",
        "sourceUrl": "https://beachwaterparktx.com/waterpark-information"
      }
    ]
  },
  {
    "slug": "wet-n-wild-waterworld-anthony",
    "name": "Wet N' Wild Waterworld",
    "city": "Anthony",
    "county": "El Paso",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets, passes and optional upgrades",
    "summary": "El Paso-area water-park destination near the Texas–New Mexico line.",
    "distinctiveNote": "Check the attraction calendar and the Anthony, Texas address before driving from El Paso.",
    "officialUrl": "https://wetnwildwaterworld.com/plan-your-visit",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "8804 S. Desert Blvd., Anthony, TX 79821",
    "visitorHighlights": [
      "Wet N' Wild Waterworld allows guests to bring their own picnic food and drinks without charging a general cooler fee, unlike most destination waterparks.",
      "Families can bring their own tables and chairs for free, or rent reserved picnic areas, including island-side options near the lazy river.",
      "The operator identifies a wavepool, lazy river, Kid's Adventure area and Volcano Lake zone as separate areas.",
      "Picnic cooking uses different rules for propane versus charcoal: guests may bring their own propane grill, but charcoal grilling is restricted to the park's approved rental equipment.",
      "Free tubes are offered at attractions in limited quantities; a personal tube rental and life-vest deposit are separate transactions."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Anthony waterpark?",
        "answer": "Wet N' Wild Waterworld lists 8804 South Desert Boulevard, Anthony, Texas, close to Interstate 10 Exit Zero. Actual operating days should be confirmed against its park calendar.",
        "sourceUrl": "https://wetnwildwaterworld.com/plan-your-visit"
      },
      {
        "question": "Can families bring their own food and coolers?",
        "answer": "Yes. This operator states outside food and beverages are welcome without a cooler fee; it prohibits glass containers and restricts some other items under its published safety policy.",
        "sourceUrl": "https://wetnwildwaterworld.com/plan-your-visit"
      },
      {
        "question": "Must we rent a picnic table?",
        "answer": "No. The park allows visitors to bring chairs and tables from home without charge, though it also sells reservable shaded picnic tables and premium seating subject to capacity.",
        "sourceUrl": "https://wetnwildwaterworld.com/plan-your-visit"
      },
      {
        "question": "Are there life jackets and tubes available?",
        "answer": "The park lists limited complimentary tubes at rides, optional paid personal tube rentals, and loaner life jackets available with a refundable deposit and valid identification.",
        "sourceUrl": "https://wetnwildwaterworld.com/plan-your-visit"
      }
    ]
  },
  {
    "slug": "hawaiian-falls-mansfield",
    "name": "Hawaiian Falls Mansfield",
    "city": "Mansfield",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day passes and seasonal options",
    "summary": "The Mansfield branch of the Hawaiian Falls water-park network.",
    "distinctiveNote": "Choose Mansfield in the operator's location selector; Waco and Roanoke have separate hours.",
    "officialUrl": "https://hfalls.com/mansfield/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "490 Heritage Parkway South, Mansfield, TX 76063",
    "visitorHighlights": [
      "The Mansfield park lists Lava Launch, Cliffhanger, Hawaiian Halfpipe, Lalana Peak and TikiTower among its individual water-slide attractions.",
      "Gentler visitor options at the Mansfield location include Kona Kooler lazy river and Methodist Mansfield Keiki Cove, with age and supervision rules distinct from major slides.",
      "Lava Launch requires 48 inches; Keiki Cove begins at 36 inches. Use the specific operator ride chart rather than a chain-wide height rule.",
      "The Mansfield operator's current site announces the 2026 waterpark season is over and points to reopening in May; 2027 season-pass sales do not imply the park is open today.",
      "Hawaiian Falls Mansfield confirms complimentary life jackets and floating tubes, with free standard parking; outside coolers may require a paid permit."
    ],
    "visitorFaqs": [
      {
        "question": "What are the main slides at Hawaiian Falls Mansfield?",
        "answer": "The Mansfield operator's own attraction list names Lava Launch, Cliffhanger, Hawaiian Halfpipe, Lalana Peak and TikiTower. Each ride has its own height, weight and supervision restrictions; the operator warns that availability may change for weather or maintenance.",
        "sourceUrl": "https://hfalls.com/mansfield/rides-attractions/"
      },
      {
        "question": "Is there something for younger children at Mansfield?",
        "answer": "Yes. Kona Kooler lazy river and Methodist Mansfield Keiki Cove are among the gentler choices in the Mansfield park's attractions list. Some children's slides have both minimum and maximum height requirements.",
        "sourceUrl": "https://hfalls.com/mansfield/rides-attractions/"
      },
      {
        "question": "Is Hawaiian Falls Mansfield open in October 2026?",
        "answer": "The park's own website announces its waterpark season has ended and points guests toward reopening next May. Future season-pass availability should not be mistaken for open slides today.",
        "sourceUrl": "https://hfalls.com/mansfield/"
      },
      {
        "question": "Where is Hawaiian Falls Mansfield?",
        "answer": "Use 490 Heritage Parkway South, Mansfield, TX 76063 for this physical park. The operator publishes its own parking and visitor information for Mansfield, separate from the Mansfield, Roanoke and Waco branches.",
        "sourceUrl": "https://hfalls.com/mansfield/directions/"
      }
    ]
  },
  {
    "slug": "hawaiian-falls-roanoke",
    "name": "Hawaiian Falls Roanoke",
    "city": "Roanoke",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and passes",
    "summary": "A northwest-DFW Hawaiian Falls location for families around Roanoke and Trophy Club.",
    "distinctiveNote": "Confirm the Roanoke schedule and age/height rules for its specific attractions.",
    "officialUrl": "https://hfalls.com/roanoke/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "290 W. Byron Nelson Blvd., Roanoke, TX 76262",
    "visitorHighlights": [
      "The Roanoke park lists Pipeline Plunge, Beach Blasters, The Rush and Hawaiian Halfpipe among its individual water-slide attractions.",
      "Gentler visitor options at the Roanoke location include Rainforest River Adventure, Coconut Cove and Mega WaterWorld, with age and supervision rules distinct from major slides.",
      "Pipeline Plunge requires 48 inches; several other slides require 40 or 42 inches. Use the specific operator ride chart rather than a chain-wide height rule.",
      "The Roanoke operator's current site announces the 2026 waterpark season is over and points to reopening in May; 2027 season-pass sales do not imply the park is open today.",
      "Hawaiian Falls Roanoke confirms complimentary life jackets and floating tubes, with free standard parking; outside coolers may require a paid permit."
    ],
    "visitorFaqs": [
      {
        "question": "What are the main slides at Hawaiian Falls Roanoke?",
        "answer": "The Roanoke operator's own attraction list names Pipeline Plunge, Beach Blasters, The Rush and Hawaiian Halfpipe. Each ride has its own height, weight and supervision restrictions; the operator warns that availability may change for weather or maintenance.",
        "sourceUrl": "https://hfalls.com/roanoke/rides-attractions/"
      },
      {
        "question": "Is there something for younger children at Roanoke?",
        "answer": "Yes. Rainforest River Adventure, Coconut Cove and Mega WaterWorld are among the gentler choices in the Roanoke park's attractions list. Some children's slides have both minimum and maximum height requirements.",
        "sourceUrl": "https://hfalls.com/roanoke/rides-attractions/"
      },
      {
        "question": "Is Hawaiian Falls Roanoke open in October 2026?",
        "answer": "The park's own website announces its waterpark season has ended and points guests toward reopening next May. Future season-pass availability should not be mistaken for open slides today.",
        "sourceUrl": "https://hfalls.com/roanoke/"
      },
      {
        "question": "Where is Hawaiian Falls Roanoke?",
        "answer": "Use 290 W. Byron Nelson Blvd., Roanoke, TX 76262 for this physical park. The operator publishes its own parking and visitor information for Roanoke, separate from the Mansfield, Roanoke and Waco branches.",
        "sourceUrl": "https://hfalls.com/roanoke/directions/"
      }
    ]
  },
  {
    "slug": "hawaiian-falls-waco",
    "name": "Hawaiian Falls Waco",
    "city": "Waco",
    "county": "McLennan",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and passes",
    "summary": "A Waco-area family water park separate from the surfing lagoon at Waco Surf.",
    "distinctiveNote": "Check the operator's Waco ticket page; do not use the Mansfield or Roanoke calendar.",
    "officialUrl": "https://hfalls.com/waco/",
    "reviewedAt": "2026-10-17",
    "visitorHighlights": [
      "The Waco park lists Tiki Tower Slides, Tempest Tower, The Rush and Tsunami among its individual water-slide attractions.",
      "Gentler visitor options at the Waco location include Breaker Bay pool, Kona Kooler and Keiki Cove, with age and supervision rules distinct from major slides.",
      "Tiki Tower Slides require 48 inches; some other rides require 42 inches. Use the specific operator ride chart rather than a chain-wide height rule.",
      "The Waco operator's current site announces the 2026 waterpark season is over and points to reopening in May; 2027 season-pass sales do not imply the park is open today."
    ],
    "visitorFaqs": [
      {
        "question": "What are the main slides at Hawaiian Falls Waco?",
        "answer": "The Waco operator's own attraction list names Tiki Tower Slides, Tempest Tower, The Rush and Tsunami. Each ride has its own height, weight and supervision restrictions; the operator warns that availability may change for weather or maintenance.",
        "sourceUrl": "https://hfalls.com/waco/rides-attractions/"
      },
      {
        "question": "Is there something for younger children at Waco?",
        "answer": "Yes. Breaker Bay pool, Kona Kooler and Keiki Cove are among the gentler choices in the Waco park's attractions list. Some children's slides have both minimum and maximum height requirements.",
        "sourceUrl": "https://hfalls.com/waco/rides-attractions/"
      },
      {
        "question": "Is Hawaiian Falls Waco open in October 2026?",
        "answer": "The park's own website announces its waterpark season has ended and points guests toward reopening next May. Future season-pass availability should not be mistaken for open slides today.",
        "sourceUrl": "https://hfalls.com/waco/"
      }
    ],
    "visitorAddress": "900 Lake Shore Drive, Waco, TX 76708"
  },
  {
    "slug": "hawaiian-waters-garland",
    "name": "Hawaiian Waters Garland",
    "city": "Garland",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and season passes",
    "summary": "The Garland Hawaiian Waters park is located by Cecil Winters Park.",
    "distinctiveNote": "The operator's Garland and The Colony parks have distinct operating calendars and park maps.",
    "officialUrl": "https://hawaiianwaters.com/hours-directions/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "4550 N. Garland Ave., Garland, TX 75040",
    "visitorHighlights": [
      "Hawaiian Waters Garland has its own park entrance and distinct daily attraction operating calendar, separate from the operator's other Texas location.",
      "The Garland waterpark publishes complimentary flotation tubes at the ride areas, with tubes restricted to the particular attraction.",
      "A complimentary first-come Coast Guard-approved life jacket program is available, while personal water wings, pool noodles and unapproved flotation devices are prohibited.",
      "General parking is free at Garland, though optional cabanas and keyless lockers cost extra.",
      "Bringing any outside food or drink other than sealed plain water requires a paid cooler ticket; bags and coolers are inspected and oversize containers may not be admitted.",
      "The operator's current website says the 2026 waterpark season has ended and advertises a future 2027 season rather than current regular waterpark hours."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Hawaiian Waters Garland?",
        "answer": "The correct Garland waterpark address is 4550 N. Garland Ave., Garland, TX 75040, separate from Hawaiian Waters' other park. Both facilities have location-specific calendars and park maps.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Is parking free at the Garland location?",
        "answer": "The operator publishes free general parking at Hawaiian Waters Garland and provides a map for its own physical entrance; private cabanas and lockers have separate fees.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Are floating tubes and safety vests included?",
        "answer": "Tubes are free for use at their assigned ride and approved life jackets are provided first come, first served. Guests cannot bring pool noodles, water wings or most inflatable floats.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Can we bring our own drinks or meals?",
        "answer": "The park requires a paid Cooler Pass for bags or containers carrying food or beverages other than factory-sealed plain water. Glass, alcohol and prepared restaurant meals are prohibited.",
        "sourceUrl": "https://hawaiianwaters.com/coolers/"
      },
      {
        "question": "Does the Garland park run regular waterpark hours in October?",
        "answer": "The official park website thanks guests for the 2026 season and promotes the 2027 season, not regular October waterpark hours. Check its next published season calendar before visiting.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      }
    ]
  },
  {
    "slug": "hawaiian-waters-the-colony",
    "name": "Hawaiian Waters The Colony",
    "city": "The Colony",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and season passes",
    "summary": "A separate Hawaiian Waters water park near Lewisville Lake and State Highway 121.",
    "distinctiveNote": "Check the The Colony calendar; special-ticket nights and seasonal closures are location specific.",
    "officialUrl": "https://hawaiianwaters.com/the-colony/hours-directions/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "4400 Paige Rd., The Colony, TX 75056",
    "visitorHighlights": [
      "Hawaiian Waters The Colony has its own park entrance and distinct daily attraction operating calendar, separate from the operator's other Texas location.",
      "The The Colony waterpark publishes complimentary flotation tubes at the ride areas, with tubes restricted to the particular attraction.",
      "A complimentary first-come Coast Guard-approved life jacket program is available, while personal water wings, pool noodles and unapproved flotation devices are prohibited.",
      "General parking is free at The Colony, though optional cabanas and keyless lockers cost extra.",
      "Bringing any outside food or drink other than sealed plain water requires a paid cooler ticket; bags and coolers are inspected and oversize containers may not be admitted.",
      "The operator's current website says the 2026 waterpark season has ended and advertises a future 2027 season rather than current regular waterpark hours."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Hawaiian Waters The Colony?",
        "answer": "The correct The Colony waterpark address is 4400 Paige Rd., The Colony, TX 75056, separate from Hawaiian Waters' other park. Both facilities have location-specific calendars and park maps.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Is parking free at the The Colony location?",
        "answer": "The operator publishes free general parking at Hawaiian Waters The Colony and provides a map for its own physical entrance; private cabanas and lockers have separate fees.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Are floating tubes and safety vests included?",
        "answer": "Tubes are free for use at their assigned ride and approved life jackets are provided first come, first served. Guests cannot bring pool noodles, water wings or most inflatable floats.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      },
      {
        "question": "Can we bring our own drinks or meals?",
        "answer": "The park requires a paid Cooler Pass for bags or containers carrying food or beverages other than factory-sealed plain water. Glass, alcohol and prepared restaurant meals are prohibited.",
        "sourceUrl": "https://hawaiianwaters.com/coolers/"
      },
      {
        "question": "Does the The Colony park run regular waterpark hours in October?",
        "answer": "The official park website thanks guests for the 2026 season and promotes the 2027 season, not regular October waterpark hours. Check its next published season calendar before visiting.",
        "sourceUrl": "https://hawaiianwaters.com/park-info/"
      }
    ]
  },
  {
    "slug": "splash-kingdom-canton",
    "name": "Splash Kingdom Paradise Island",
    "city": "Canton",
    "county": "Van Zandt",
    "region": "East Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets; some add-ons cost extra",
    "summary": "The Canton location of Splash Kingdom serves an East Texas road-trip market.",
    "distinctiveNote": "Operator policies distinguish admission, parking and cooler privileges; check the Canton booking page.",
    "officialUrl": "https://www.splashkingdomwaterpark.com/faqs/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "18814 Interstate 20, Canton, TX 75103",
    "visitorHighlights": [
      "Splash Kingdom Paradise Island has its own themed ride collection, including Pink Panic enclosed body slide, The Express steep straight-drop slide, and Bubble Bay play area.",
      "A key visitor restriction for this location: Pink Panic and The Express each specify a 42-inch minimum rider height and do not permit life jackets.",
      "The operator lists a separate daily-entry and season-pass schedule, plus location-dependent Twilight and Toddler Tuesday opportunities; confirm the dated location calendar.",
      "Splash Kingdom says all entering visitors need a ticket, including non-swimmers. Cooler admission is a separate paid product with size and content restrictions."
    ],
    "visitorFaqs": [
      {
        "question": "What attractions distinguish this Splash Kingdom location?",
        "answer": "The operator's specific Canton ride list names Pink Panic enclosed body slide, The Express steep straight-drop slide and Bubble Bay play area; it does not use a single identical ride inventory across the Canton, Greenville and Nacogdoches locations.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/canton-paradise-island/can-rides-attractions/"
      },
      {
        "question": "What rider restrictions should families check?",
        "answer": "Pink Panic and The Express each specify a 42-inch minimum rider height and do not permit life jackets. The individual attraction's posted guidance governs each visit, and closures or staffing restrictions can change ride availability.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/canton-paradise-island/can-rides-attractions/"
      },
      {
        "question": "Can non-swimming family members enter free?",
        "answer": "No. Splash Kingdom says it is a participation facility and everyone entering must hold a valid admission ticket, regardless of whether that person gets in the water.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      },
      {
        "question": "Can we bring a picnic cooler?",
        "answer": "The operator sells a one-time Cooler Pass for personal coolers up to 48 quarts. Glass and alcohol are prohibited, and outside grilled/restaurant food is excluded under the chain's current policy.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      }
    ]
  },
  {
    "slug": "splash-kingdom-greenville",
    "name": "Splash Kingdom Air Patrol",
    "city": "Greenville",
    "county": "Hunt",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and passes",
    "summary": "Splash Kingdom's aviation-themed Greenville branch is a separate park from Canton.",
    "distinctiveNote": "Use Air Patrol's calendar and ticket options instead of another Splash Kingdom branch.",
    "officialUrl": "https://www.splashkingdomwaterpark.com/faqs/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6501 Interstate 30, Greenville, TX 75402",
    "visitorHighlights": [
      "Splash Kingdom Air Patrol has its own themed ride collection, including Dogfight group of four racing body slides, Goose and Maverick tube slides, and The Jet Stream lazy river.",
      "A key visitor restriction for this location: Dogfight requires 42 inches; Goose and Maverick allow a 36-inch rider with an eligible 42-inch-or-taller companion.",
      "The operator lists a separate daily-entry and season-pass schedule, plus location-dependent Twilight and Toddler Tuesday opportunities; confirm the dated location calendar.",
      "Splash Kingdom says all entering visitors need a ticket, including non-swimmers. Cooler admission is a separate paid product with size and content restrictions."
    ],
    "visitorFaqs": [
      {
        "question": "What attractions distinguish this Splash Kingdom location?",
        "answer": "The operator's specific Greenville ride list names Dogfight group of four racing body slides, Goose and Maverick tube slides and The Jet Stream lazy river; it does not use a single identical ride inventory across the Canton, Greenville and Nacogdoches locations.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/greenville-air-patrol/gvl-rides-attractions/"
      },
      {
        "question": "What rider restrictions should families check?",
        "answer": "Dogfight requires 42 inches; Goose and Maverick allow a 36-inch rider with an eligible 42-inch-or-taller companion. The individual attraction's posted guidance governs each visit, and closures or staffing restrictions can change ride availability.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/greenville-air-patrol/gvl-rides-attractions/"
      },
      {
        "question": "Can non-swimming family members enter free?",
        "answer": "No. Splash Kingdom says it is a participation facility and everyone entering must hold a valid admission ticket, regardless of whether that person gets in the water.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      },
      {
        "question": "Can we bring a picnic cooler?",
        "answer": "The operator sells a one-time Cooler Pass for personal coolers up to 48 quarts. Glass and alcohol are prohibited, and outside grilled/restaurant food is excluded under the chain's current policy.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      }
    ]
  },
  {
    "slug": "splash-kingdom-nacogdoches",
    "name": "Splash Kingdom Timber Falls",
    "city": "Nacogdoches",
    "county": "Nacogdoches",
    "region": "East Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and passes",
    "summary": "The Nacogdoches Splash Kingdom location brings a family water-park option to Deep East Texas.",
    "distinctiveNote": "Consult Timber Falls ride-height rules and calendar rather than assuming other chain rules match.",
    "officialUrl": "https://www.splashkingdomwaterpark.com/faqs/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "401 N. University Drive, Nacogdoches, TX 75961",
    "visitorHighlights": [
      "Splash Kingdom Timber Falls has its own themed ride collection, including Treetop Drop high-speed slide, Timber Falls family/child splash structure, and Children's five-slide play area.",
      "A key visitor restriction for this location: Treetop Drop requires 42 inches and does not permit life jackets; the younger-child play area has a maximum 52-inch height except when accompanying children.",
      "The operator lists a separate daily-entry and season-pass schedule, plus location-dependent Twilight and Toddler Tuesday opportunities; confirm the dated location calendar.",
      "Splash Kingdom says all entering visitors need a ticket, including non-swimmers. Cooler admission is a separate paid product with size and content restrictions."
    ],
    "visitorFaqs": [
      {
        "question": "What attractions distinguish this Splash Kingdom location?",
        "answer": "The operator's specific Nacogdoches ride list names Treetop Drop high-speed slide, Timber Falls family/child splash structure and Children's five-slide play area; it does not use a single identical ride inventory across the Canton, Greenville and Nacogdoches locations.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/nacogdoches-timber-falls/nac-rides-attractions/"
      },
      {
        "question": "What rider restrictions should families check?",
        "answer": "Treetop Drop requires 42 inches and does not permit life jackets; the younger-child play area has a maximum 52-inch height except when accompanying children. The individual attraction's posted guidance governs each visit, and closures or staffing restrictions can change ride availability.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/nacogdoches-timber-falls/nac-rides-attractions/"
      },
      {
        "question": "Can non-swimming family members enter free?",
        "answer": "No. Splash Kingdom says it is a participation facility and everyone entering must hold a valid admission ticket, regardless of whether that person gets in the water.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      },
      {
        "question": "Can we bring a picnic cooler?",
        "answer": "The operator sells a one-time Cooler Pass for personal coolers up to 48 quarts. Glass and alcohol are prohibited, and outside grilled/restaurant food is excluded under the chain's current policy.",
        "sourceUrl": "https://www.splashkingdomwaterpark.com/faqs/"
      }
    ]
  },
  {
    "slug": "kalahari-round-rock",
    "name": "Kalahari Resorts Waterparks",
    "city": "Round Rock",
    "county": "Williamson",
    "region": "Central Texas",
    "setting": "Both",
    "kind": "Indoor resort park",
    "admission": "Resort stay or available day passes",
    "summary": "Kalahari's Round Rock resort contains a large year-round indoor water park plus seasonal outdoor water attractions.",
    "distinctiveNote": "The indoor water park operates separately from some outdoor features; pass dates and hours need checking.",
    "officialUrl": "https://www.kalahariresorts.com/texas-round-rock/parks-and-passes/indoor-waterpark/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "3001 Kalahari Blvd., Round Rock, TX 78665",
    "visitorHighlights": [
      "Kalahari Round Rock combines separately scheduled indoor and seasonal outdoor waterpark attractions, with its own admission calendar.",
      "Indoor attractions include Barreling Baboon, Kenya Korkscrew, Rippling Rhino and Screaming Hyena, which can have temporary ride closures.",
      "Limited day passes are offered to non-overnight visitors, but the park states that online purchase is the only way to guarantee admission.",
      "Children under 48 inches must wear an approved life jacket; loaners are limited, and guests under 14 must be accompanied by a parent or guardian.",
      "Day-pass guests should bring towels, because complimentary towel service is not included with their admission."
    ],
    "visitorFaqs": [
      {
        "question": "Can non-resort guests use the waterpark?",
        "answer": "Yes. The resort sells a limited number of day passes for indoor and outdoor waterparks, but recommends buying them online; ticket-desk walk-up sales may stop without warning.",
        "sourceUrl": "https://www.kalahariresorts.com/texas-round-rock/parks-and-passes/day-passes/waterpark-day-passes/"
      },
      {
        "question": "Does a day ticket include towels?",
        "answer": "No complimentary towel program is promised for day visitors. Kalahari asks day-pass guests to bring towels; towels can be purchased if necessary, while overnight guests have separate benefits.",
        "sourceUrl": "https://www.kalahariresorts.com/texas-round-rock/parks-and-passes/day-passes/waterpark-day-passes/"
      },
      {
        "question": "What do day-pass guests bring to check in?",
        "answer": "All party members must arrive together with the confirmation, the purchaser's payment card and government-issued photo identification. The operator warns that missing documentation can prevent entry.",
        "sourceUrl": "https://www.kalahariresorts.com/texas-round-rock/parks-and-passes/day-passes/waterpark-day-passes/"
      },
      {
        "question": "Are toddlers and young children subject to different restrictions?",
        "answer": "Ages two and under do not need a waterpark pass; children younger than 14 must be with a parent or guardian, and children under 48 inches must wear approved life jackets.",
        "sourceUrl": "https://www.kalahariresorts.com/texas-round-rock/parks-and-passes/day-passes/waterpark-day-passes/"
      }
    ]
  },
  {
    "slug": "great-wolf-grapevine",
    "name": "Great Wolf Lodge Grapevine",
    "city": "Grapevine",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor resort park",
    "admission": "Water-park access with resort stay; day passes may be offered",
    "summary": "A family lodge organized around an indoor water park in Grapevine.",
    "distinctiveNote": "Check current day-pass inventory if visiting without reserving an overnight room.",
    "officialUrl": "https://www.greatwolf.com/grapevine",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "100 Great Wolf Drive, Grapevine, TX 76051",
    "visitorHighlights": [
      "Grapevine's indoor waterpark is available to overnight guests as well as a limited number of separately ticketed day visitors.",
      "The resort sells full-day and half-day admission options; the half-day product begins in the late afternoon on the operator's booking calendar.",
      "The Raccoon Lagoon outdoor pool is seasonal, while the indoor heated waterpark uses a separate operating schedule.",
      "Day passes provide towels and Coast Guard-approved life jackets, but rented lockers and many dry-land entertainment options cost extra.",
      "The Grapevine attractions list includes outdoor tube slides Thunder Run and Lightning Falls, both requiring riders at least 42 inches tall."
    ],
    "visitorFaqs": [
      {
        "question": "Can non-hotel visitors buy waterpark admission?",
        "answer": "Yes. Great Wolf Lodge Grapevine offers dated full-day and half-day day passes with limited inventory. Check the calendar before going because sold-out dates may have no walk-up admission.",
        "sourceUrl": "https://www.greatwolf.com/grapevine/daypass"
      },
      {
        "question": "Are towels and life jackets free with day admission?",
        "answer": "The operator states that towels and life jackets are included with Grapevine waterpark passes; locker rentals and many dry-land attractions are separate purchases.",
        "sourceUrl": "https://www.greatwolf.com/grapevine/daypass"
      },
      {
        "question": "Can day guests bring their own food or coolers?",
        "answer": "No. The Grapevine day-pass terms prohibit outside food and coolers in the resort, so visitors should plan for available on-site dining and consult staff about any necessary exceptions.",
        "sourceUrl": "https://www.greatwolf.com/grapevine/daypass"
      },
      {
        "question": "Can we swim outdoors during the winter?",
        "answer": "The indoor waterpark has its own calendar, but the resort labels Raccoon Lagoon an outdoor seasonal pool. Confirm the planned date rather than treating all outdoor attractions as year-round.",
        "sourceUrl": "https://www.greatwolf.com/grapevine/water-park"
      }
    ]
  },
  {
    "slug": "great-wolf-webster",
    "name": "Great Wolf Lodge Houston/Webster",
    "city": "Webster",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Indoor",
    "kind": "Indoor resort park",
    "admission": "Water-park access with resort stay or available day pass",
    "summary": "A large indoor water park near NASA and the Clear Lake area.",
    "distinctiveNote": "Webster is a separate resort from the Grapevine location; look for its indoor-park day passes.",
    "officialUrl": "https://www.greatwolf.com/webster/waterpark-attractions/indoor-water-park",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1000 Great Wolf Way, Webster, TX 77598",
    "visitorHighlights": [
      "Webster's indoor waterpark spans approximately 92,000 square feet, with Slap Tail Pond wave pool and Crooked Creek lazy river.",
      "Texas Twirler is a Webster-specific funnel-style family raft ride with a posted 42-inch minimum height and 700-pound maximum raft weight.",
      "The twisting Forest Flume body slide requires at least 48 inches of height with a maximum individual rider weight of 280 pounds.",
      "The Otter Cave Waterworks four-level structure and Otter Springs younger-child area offer alternatives to the high-thrill slides.",
      "Day passes are available without an overnight reservation; MagiQuest and other dry-land attractions may require separate admission."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Houston-area Great Wolf Lodge?",
        "answer": "The Houston-area resort and its indoor waterpark are located at 1000 Great Wolf Way in Webster, Texas. This is a separate property from Great Wolf Lodge Grapevine.",
        "sourceUrl": "https://www.greatwolf.com/webster"
      },
      {
        "question": "Can visitors use the indoor park without booking a room?",
        "answer": "Yes. Webster offers day-pass access in addition to waterpark admission for overnight guests. Full-day and half-day admission prices and availability depend on the selected date.",
        "sourceUrl": "https://www.greatwolf.com/webster/daypass"
      },
      {
        "question": "What are the height limits for Texas Twirler and Forest Flume?",
        "answer": "The operator lists a minimum rider height of 42 inches for Texas Twirler and 48 inches for Forest Flume, along with separate published maximum raft or rider weights.",
        "sourceUrl": "https://www.greatwolf.com/webster/waterpark-attractions/indoor-water-park"
      },
      {
        "question": "Does the park have younger-child attractions?",
        "answer": "Yes. Otter Springs, Otter Cave Waterworks and other low-thrill pools and play areas are described separately from the tall thrill slides. Check each attraction's specific supervision rules.",
        "sourceUrl": "https://www.greatwolf.com/webster/waterpark-attractions/indoor-water-park"
      }
    ]
  },
  {
    "slug": "epic-waters-grand-prairie",
    "name": "Epic Waters Indoor Waterpark",
    "city": "Grand Prairie",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "Public day admission and group options",
    "summary": "A stand-alone indoor water park in Grand Prairie rather than a hotel-only pool complex.",
    "distinctiveNote": "Epic Waters is temporarily closed October 13–29, 2026, with reopening scheduled for Friday, October 30 at 10 a.m.; always confirm the live calendar before visiting.",
    "officialUrl": "https://epicwatersgp.com/",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "cove-lakefront-little-elm",
    "name": "The Cove at The Lakefront",
    "city": "Little Elm",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "Day passes and memberships",
    "summary": "An indoor Little Elm water park with slides, lazy river and surf simulation.",
    "distinctiveNote": "The Cove will close October 26–30, 2026, for annual maintenance and plans to reopen October 31. The park also uses school-year hours with some weekdays closed.",
    "officialUrl": "https://www.thecoveatthelakefront.com/hours",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "417 Lakefront Drive, Little Elm, TX 75068",
    "visitorHighlights": [
      "The Cove publishes school-year operation from August 10, 2026 to May 20, 2027, with Tuesdays and Wednesdays closed during regular hours.",
      "Guests must be at least 48 inches tall for the larger red, green and blue waterslides.",
      "FlowRider Double requires at least 42 inches for bodyboarding and 48 inches for standing surfing.",
      "This facility has no free spectator entry: both swimmers and non-swimmers must have admission or membership and complete waivers.",
      "Toddler Time is offered during special Monday and Thursday morning sessions on the published school-year schedule."
    ],
    "visitorFaqs": [
      {
        "question": "When is The Cove open during the school year?",
        "answer": "The Cove lists afternoon/evening hours on Monday and Thursday–Friday, daytime weekend hours, and Tuesday/Wednesday closures. Toddler Time has a separate schedule from regular admission.",
        "sourceUrl": "https://www.thecoveatthelakefront.com/hours"
      },
      {
        "question": "Can adults watch from the deck without paying?",
        "answer": "No. The facility explicitly describes itself as no-spectator admission; every person entering needs a valid membership or day pass, and legal guardians must complete minor waivers.",
        "sourceUrl": "https://www.thecoveatthelakefront.com/faq/"
      },
      {
        "question": "What are its waterslide and FlowRider height limits?",
        "answer": "The major red, green and blue slides require 48 inches. FlowRider allows bodyboarding at 42 inches and surfing at 48 inches; wristbands help lifeguards enforce the limits.",
        "sourceUrl": "https://www.thecoveatthelakefront.com/faq/"
      },
      {
        "question": "Are picnic coolers allowed?",
        "answer": "Yes, inspected coolers within the operator's stated maximum dimensions may enter for an additional fee. Glass containers, outside alcohol and food deliveries are prohibited.",
        "sourceUrl": "https://www.thecoveatthelakefront.com/faq/"
      }
    ]
  },
  {
    "slug": "waco-surf-waterpark",
    "name": "Waco Surf Waterpark",
    "city": "Waco",
    "county": "McLennan",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Separate waterpark, surf-session and lodging products",
    "summary": "A resort complex where the water park and surf lagoon are distinct experiences.",
    "distinctiveNote": "Book the correct water-park product instead of assuming a wave-surfing session includes slides.",
    "officialUrl": "https://wacosurf.com/water-park/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5347 Old Mexia Road, Waco, TX 76705",
    "visitorHighlights": [
      "Waco Surf states its dedicated Wedge slide and lazy-river waterpark is closed for the rest of the 2026 season, despite other property experiences operating.",
      "The Wedge is a 70-foot slide with four launch levels and a posted 44-inch minimum rider height; all Wedge riders must wear life jackets.",
      "An approximately one-mile lazy river provides tubes, with optional rented floating cooler tubes.",
      "Outside food and coolers are allowed on the waterpark side without glass, but the surf/beach side follows different admission and food rules.",
      "The standard waterpark pass does not include separate beach access; visitors may need to buy a combined ticket."
    ],
    "visitorFaqs": [
      {
        "question": "Are the Wedge slides operating in October 2026?",
        "answer": "No. The operator states that the waterpark portion is closed for the 2026 season and is expected back in 2027, even though surfing, lodging and other portions may have separate hours.",
        "sourceUrl": "https://wacosurf.com/water-park/"
      },
      {
        "question": "What are the Wedge height and flotation rules?",
        "answer": "Waco Surf lists at least 44 inches in height to ride the Wedge and requires every Wedge rider, including adults, to wear a life jacket.",
        "sourceUrl": "https://wacosurf.com/water-park/"
      },
      {
        "question": "Can we bring our own food or cooler?",
        "answer": "The operator explicitly allows coolers and food on the waterpark side without glass, but sets different food and carry-in restrictions for the surf and beach areas.",
        "sourceUrl": "https://wacosurf.com/water-park/"
      },
      {
        "question": "Does a waterpark pass include the separate beach?",
        "answer": "No. Waco Surf says standard waterpark admission does not include beach access, which can be added separately or purchased as part of a combined pass.",
        "sourceUrl": "https://wacosurf.com/water-park/"
      },
      {
        "question": "Are floating tubes provided?",
        "answer": "Yes. The operator provides regular lazy-river tubes at no charge; separate cooler tubes can be rented. Guests are required to stay on a tube during the float.",
        "sourceUrl": "https://wacosurf.com/water-park/"
      }
    ]
  },
  {
    "slug": "volente-beach",
    "name": "Volente Beach Water Park",
    "city": "Volente",
    "county": "Travis",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day admission; select attractions may run only on certain days",
    "summary": "A Lake Travis shoreline park mixing beach amenities with water slides and family attractions.",
    "distinctiveNote": "During shoulder dates the water slides may follow a shorter calendar than beach access.",
    "officialUrl": "https://www.volentebeach.com/waterpark",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "16107 FM 2769, Leander, TX 78641",
    "visitorHighlights": [
      "Volente Beach has four separately named major slides including Texas Twister, Roadrunner, Sidewinder and Flash Flood.",
      "A Pirate Ship splash area, a designated beach/lake-swimming area and a main pool offer alternatives to thrill slides.",
      "All slides require a minimum height of 42 inches; the Texas Twister requires 48 inches plus sufficient swimming ability.",
      "Full waterpark admission is a weekend offering in its published 2026 season, while weekday access is limited to beach and kiddie pool.",
      "Every person using the beach, pool or slides requires a qualifying wristband, and admission tickets are bought at the gate.",
      "The operator prohibits outside food, drinks and coolers; the site lists paid parking and locker options.",
      "The park's 2026 season ended by September 20, so do not promote slides as open this October."
    ],
    "visitorFaqs": [
      {
        "question": "Can families buy tickets online before arriving?",
        "answer": "The operator explicitly says its waterpark tickets are purchased at the entrance gate and a qualifying wristband is required for every person using its beach, pools or slides.",
        "sourceUrl": "https://www.volentebeach.com/waterpark"
      },
      {
        "question": "Are all slides available on weekdays?",
        "answer": "No. The 2026 operating notice describes full-slide waterpark access on Saturdays, Sundays and holidays, with limited beach/kiddie-pool-only access on other listed weekdays.",
        "sourceUrl": "https://www.volentebeach.com/waterpark"
      },
      {
        "question": "What height is needed for Texas Twister?",
        "answer": "All water slides have a minimum rider height of 42 inches; the Texas Twister specifically requires a minimum of 48 inches and adequate swimmer ability.",
        "sourceUrl": "https://www.volentebeach.com/waterpark"
      },
      {
        "question": "Can visitors bring a picnic cooler?",
        "answer": "No. Volente Beach explicitly bans outside food, beverages and coolers from its waterpark. On-site food and beverage service is provided by Beachside Billy's.",
        "sourceUrl": "https://www.volentebeach.com/waterpark"
      },
      {
        "question": "Are slides open in October 2026?",
        "answer": "The operator listed waterpark operation only through September 20 for the 2026 season. Reconfirm the next-season schedule instead of assuming autumn access.",
        "sourceUrl": "https://www.volentebeach.com/waterpark"
      }
    ]
  },
  {
    "slug": "camp-fimfo-hill-country",
    "name": "Camp Fimfo Texas Hill Country Water Park",
    "city": "New Braunfels",
    "county": "Comal",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground reservation or limited day park pass",
    "summary": "An outdoor water-play complex inside Camp Fimfo's New Braunfels campground.",
    "distinctiveNote": "Park passes are capacity-limited and not equivalent to unrestricted public water-park entry.",
    "officialUrl": "https://campfimfo.com/texas-hill-country/park-passes",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "520 Whitewater Way, New Braunfels, TX 78132",
    "visitorHighlights": [
      "The Hill Country campground's interactive water playground includes two standard and two kiddie slides, water cannons and a hydrostorm dumping bucket.",
      "Additional water slides include 242-foot and 334-foot tube slides with 42-inch minimum rider height.",
      "The larger 196-foot speed slides require a taller minimum of 48 inches.",
      "Day Camp Passes are sold only on limited spring and summer-to-October dates and require a confirmed reservation; day passes do not include all hilltop resort amenities.",
      "Some slides and water-play areas operate on weekends only in shoulder season, while the resort pools have separately published calendars.",
      "Food and nonalcoholic drinks are allowed with inspected coolers, while alcohol and glass are prohibited in the waterpark area."
    ],
    "visitorFaqs": [
      {
        "question": "Can visitors use Camp Fimfo without staying overnight?",
        "answer": "Yes. Camp Fimfo Texas Hill Country offers a limited number of Day Camp Passes on select dates, requiring a confirmed advance booking and excluding some hilltop resort amenities.",
        "sourceUrl": "https://campfimfo.com/texas-hill-country/park-passes"
      },
      {
        "question": "What is the minimum height for the large water slides?",
        "answer": "The operator lists 42 inches minimum for the two tube slides and 48 inches minimum for its speed slides. The interactive children's playground has its own age-appropriate structures.",
        "sourceUrl": "https://campfimfo.com/texas-hill-country/amenities"
      },
      {
        "question": "Are slides open every day in October?",
        "answer": "Not necessarily. The facility's dated 2026 amenity list says slides and water-play structures operated on weekends in the fall shoulder season; the separate pool and lodging calendars can differ.",
        "sourceUrl": "https://campfimfo.com/texas-hill-country/amenities"
      },
      {
        "question": "Can families pack snacks and a cooler?",
        "answer": "Yes. Camp Fimfo allows food and nonalcoholic drinks subject to cooler checks, but does not permit glass or outside alcohol and forbids food inside swimming pools.",
        "sourceUrl": "https://campfimfo.com/texas-hill-country/amenities/water-playground"
      }
    ]
  },
  {
    "slug": "camp-fimfo-waco",
    "name": "Camp Fimfo Waco Water Playground",
    "city": "Waco",
    "county": "McLennan",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground stay or limited park pass",
    "summary": "A campground-focused splash and water-slide area on the Brazos near Waco.",
    "distinctiveNote": "Check park-pass inventory and separate camping terms before planning a one-day visit.",
    "officialUrl": "https://campfimfo.com/waco/water-playground",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1000 Chickadee Ln., Waco, TX 76708",
    "visitorHighlights": [
      "The Waco Camp Fimfo water playground offers two standard waterslides, two smaller kiddie slides and interactive spray cannons.",
      "A hydrostorm dumping bucket anchors the children's water-play structure, separate from the resort's other camping attractions.",
      "Water playground admission is included for eligible overnight campers, while some dates offer a limited day-camping pass.",
      "The operator permits inspected food and drink coolers except for alcohol and glass containers in the pool/play zone.",
      "The campground describes early-access and post-checkout extended amenity use as a separate paid entitlement, subject to availability."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Camp Fimfo Waco's water playground?",
        "answer": "The operator lists its resort location at 1000 Chickadee Lane, Waco, Texas 76708. This is not the same facility as Camp Fimfo Texas Hill Country near New Braunfels.",
        "sourceUrl": "https://campfimfo.com/waco/water-playground"
      },
      {
        "question": "Do visitors have to rent a campsite?",
        "answer": "Not always. The operator sells limited Day Camp Passes on select dates as an alternative to an overnight reservation, with admission tied to a particular visit day.",
        "sourceUrl": "https://campfimfo.com/waco/water-playground"
      },
      {
        "question": "Can visitors bring their own food?",
        "answer": "Yes. Inspected coolers containing food and nonalcoholic beverages are permitted in the park area, provided they contain no glass or alcohol; food is forbidden within pools and spas.",
        "sourceUrl": "https://campfimfo.com/waco/water-playground"
      },
      {
        "question": "Can guests stay longer in the pools after check-out?",
        "answer": "The operator says early or extended resort access can be purchased for an additional fee if availability permits, but it does not include early lodging check-in or late room checkout.",
        "sourceUrl": "https://campfimfo.com/waco/water-playground"
      }
    ]
  },
  {
    "slug": "bahama-beach-dallas",
    "name": "Bahama Beach Waterpark",
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public day admission; city offers may apply",
    "summary": "A south-Dallas city water park built around slides, family swimming and lazy-river attractions.",
    "distinctiveNote": "Use Dallas Parks' official calendar for seasonal opening, closures and resident policies.",
    "officialUrl": "https://bahamabeachdallas.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1895 Campfire Circle, Dallas, TX 75232",
    "visitorHighlights": [
      "City-operated Bahama Beach includes two zero-depth beaches, a lazy river, and large thrill waterslides.",
      "The family splash playground includes a 1,000-gallon dumping bucket, a distinct lower-thrill option from major slides.",
      "Free life jackets and tubes for slides and the lazy river are offered, but guests cannot bring ordinary external rafts or water wings.",
      "The park inspects coolers and charges a separate cooler fee; glass containers, knives and alcohol are prohibited.",
      "Private shaded cabanas and reserved seating require separate bookings instead of being included automatically with admission."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Bahama Beach Waterpark?",
        "answer": "The City of Dallas lists Bahama Beach at 1895 Campfire Circle, Dallas, TX 75232, a different site from its municipal Cove and neighborhood aquatic centers.",
        "sourceUrl": "https://bahamabeachdallas.com/"
      },
      {
        "question": "Are life jackets and lazy-river tubes included?",
        "answer": "Yes. The operator says Coast Guard-approved life jackets are provided first come, first served and tubes for the slides and lazy river are free. Outside rafts and water wings are not allowed.",
        "sourceUrl": "https://bahamabeachdallas.com/m/faq?cat=15"
      },
      {
        "question": "Can visitors bring a food cooler?",
        "answer": "Bahama Beach's operator permits inspected coolers for a separately charged fee but prohibits outside catered meals, glass containers, knives and alcoholic beverages.",
        "sourceUrl": "https://bahamabeachdallas.com/m/faq?cat=15"
      },
      {
        "question": "Can we reserve a cabana?",
        "answer": "Yes. The official FAQ says guests may separately reserve cabanas and shaded seating for an additional charge; the standard admission price does not guarantee private reserved space.",
        "sourceUrl": "https://bahamabeachdallas.com/m/faq?cat=15"
      }
    ]
  },
  {
    "slug": "water-works-denton",
    "name": "Water Works Park",
    "city": "Denton",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public day tickets; aquatic center options vary",
    "summary": "The Denton municipal water park is separate from ordinary lap-swim services.",
    "distinctiveNote": "Check city renovation or maintenance notices before assuming slides are available.",
    "officialUrl": "https://www.dentonwaterworks.com/hours-info-rules",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2400 Long Rd., Denton, TX 76209",
    "visitorHighlights": [
      "The Denton waterpark's published October 2026 calendar marks it closed for the season; the operating season ended after Labor Day in September.",
      "Water Works Park has a wave pool and separate children's splash area; summer 2026 event programming also included wave-pool movie nights.",
      "Non-swimming adults have a separate admission category rather than free entry, and the park charges a daily cooler fee.",
      "Park rules require an adult in the water with children six and younger and anyone wearing a life jacket; children seven through fourteen need an accompanying adult at least sixteen.",
      "Free parking is offered by the Water Works Park/Denton Natatorium complex near the C. H. Collins Athletic Complex."
    ],
    "visitorFaqs": [
      {
        "question": "Can we go to Denton's Water Works Park in October?",
        "answer": "No. The park's current October 2026 calendar explicitly identifies its outdoor attractions as closed for the season. The posted regular 2026 opening season ended after Labor Day.",
        "sourceUrl": "https://www.dentonwaterworks.com/"
      },
      {
        "question": "Where should we park for Water Works?",
        "answer": "The visitor page lists 2400 Long Road, Denton, next to the natatorium and skate park by the C. H. Collins Athletic Complex. The operator says regular parking is free.",
        "sourceUrl": "https://www.dentonwaterworks.com/hours-info-rules"
      },
      {
        "question": "Do non-swimmers need tickets?",
        "answer": "Yes. Water Works publishes a separate non-swimmer admission category rather than treating spectators as automatically free. Group discounts and cooler fees have separate terms.",
        "sourceUrl": "https://www.dentonwaterworks.com/hours-info-rules"
      },
      {
        "question": "Can children swim alone?",
        "answer": "No. The park's rules require a supervising adult in the water for children six and under; visitors seven through fourteen must have an accompanying adult at least sixteen.",
        "sourceUrl": "https://www.dentonwaterworks.com/hours-info-rules"
      }
    ]
  },
  {
    "slug": "splash-dayz-white-settlement",
    "name": "Splash Dayz Waterpark",
    "city": "White Settlement",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public tickets and passes",
    "summary": "A family water park in White Settlement west of downtown Fort Worth.",
    "distinctiveNote": "Confirm the correct park entrance and current season through the operator rather than relying on older addresses.",
    "officialUrl": "https://www.splashdayz.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "405 N. Las Vegas Trail, White Settlement, TX 76108",
    "visitorHighlights": [
      "Splash Dayz White Settlement includes tube slides, wave pool, lazy river, mat-racing slide and a torpedo-style drop slide.",
      "A younger-child pool with water features and dedicated spray/splashpad areas complements the large slides.",
      "The park also offers sand-based playground areas, a café, vending outlets and rental cabanas.",
      "Splash Dayz operates an alcohol-free family waterpark according to its official venue description.",
      "The operator's website lists a separate event and party reservation program for schools, churches and other groups.",
      "Two official operator pages conflict on the street number, listing both 401 and 405 North Las Vegas Trail; phone or confirm directions before a trip."
    ],
    "visitorFaqs": [
      {
        "question": "Where is White Settlement's Splash Dayz?",
        "answer": "The park's current contact page lists 405 North Las Vegas Trail, but its About page lists 401 on the same street. Confirm the exact entrance with the operator before traveling.",
        "sourceUrl": "https://www.splashdayz.com/contact"
      },
      {
        "question": "Which attractions are there for older kids?",
        "answer": "The operator lists a wave pool, tube slides, a mat-racing slide, a torpedo-drop slide and a lazy river, alongside a children's pool and play spaces.",
        "sourceUrl": "https://www.splashdayz.com/about-us"
      },
      {
        "question": "Does the park sell food and offer cabanas?",
        "answer": "Yes. Splash Dayz lists a café, vending service, free general table and chair seating, and premium cabana or Splash Spot rentals.",
        "sourceUrl": "https://www.splashdayz.com/about-us"
      },
      {
        "question": "Can families bring alcoholic beverages?",
        "answer": "No. The official About page identifies Splash Dayz as an alcohol-free family waterpark, so visitors should not assume adult-only alcohol rules from other parks apply.",
        "sourceUrl": "https://www.splashdayz.com/about-us"
      }
    ]
  },
  {
    "slug": "pirates-bay-baytown",
    "name": "Pirates Bay Waterpark",
    "city": "Baytown",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public admission and seasonal passes",
    "summary": "Baytown's pirate-themed municipal water park includes slides and family play.",
    "distinctiveNote": "Use the Baytown location calendar, not similarly named Pirates' Cove near Fort Worth.",
    "officialUrl": "https://baytownpiratesbay.com/park-hours/",
    "reviewedAt": "2026-10-17"
  },
  {
    "slug": "wet-zone-rowlett",
    "name": "Wet Zone Waterpark",
    "city": "Rowlett",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City aquatic center day admission",
    "summary": "Rowlett's municipal water park caters to neighborhood family outings.",
    "distinctiveNote": "Check whether public sessions or special events are scheduled, particularly outside peak summer.",
    "officialUrl": "https://www.rowletttx.gov/179/Map-and-Directions",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5304 Main St., Rowlett, TX 75088",
    "visitorHighlights": [
      "Wet Zone Waterpark is a city-operated aquatics facility in Rowlett, directly behind the high school off Main Street.",
      "The operator provides a park layout map that identifies distinct family water-play and swimming areas rather than an ordinary neighborhood lap pool.",
      "Rowlett publishes detailed driving directions for visitors arriving from Garland, Dallas, Mesquite, Lewisville and Rockwall.",
      "Waterpark operating sessions and special-event dates need to be checked against the city calendar instead of assumed from older daily summer-hour displays."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Wet Zone Waterpark in Rowlett?",
        "answer": "The City of Rowlett lists Wet Zone at 5304 Main Street, Rowlett, Texas 75088, with the waterpark entrance behind the nearby high school.",
        "sourceUrl": "https://www.rowletttx.gov/179/Map-and-Directions"
      },
      {
        "question": "How can drivers reach the park from Rockwall or Garland?",
        "answer": "Rowlett publishes separate turn-by-turn approaches: from Garland via Highway 66 and Rowlett Road, or from Rockwall via I-30, Dalrock and Miller roads.",
        "sourceUrl": "https://www.rowletttx.gov/179/Map-and-Directions"
      },
      {
        "question": "Does Wet Zone offer the same hours all year?",
        "answer": "No. The city operates Wet Zone as a municipal outdoor waterpark; visitors should check actual scheduled pool sessions and special events before traveling, especially after summer.",
        "sourceUrl": "https://www.rowletttx.gov/179/Map-and-Directions"
      }
    ]
  },
  {
    "slug": "frisco-water-park",
    "name": "Frisco Water Park",
    "city": "Frisco",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Frisco Athletic Center policies and day passes",
    "summary": "The outdoor water-park component of the Frisco Athletic Center includes active-play attractions.",
    "distinctiveNote": "Differentiate the seasonal outdoor park from the center's indoor pool hours.",
    "officialUrl": "https://www.friscotexas.gov/1254/Frisco-Water-Park",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5828 Nancy Jane Lane, Frisco, TX 75035",
    "visitorHighlights": [
      "Frisco Water Park is part of the Frisco Athletic Center; eligible center members receive waterpark access as a membership benefit.",
      "Walnut's Treehouse combines three small slides and more than 85 water-spray features, with adult supervision for children younger than six.",
      "Preston Plunge is a 45-foot-high four-lane headfirst mat racer with a posted 42-inch minimum rider height.",
      "Pipeline and Green Gusher are separate enclosed/open waterslides with 48-inch minimum rider height.",
      "The city says the outdoor waterpark's 2026 season has ended; its recurring operating period runs from Memorial Day weekend through Labor Day."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Frisco Water Park?",
        "answer": "It is part of the Frisco Athletic Center, which lists its address as 5828 Nancy Jane Lane, Frisco, TX 75035. The outdoor waterpark uses the center's operator and visitor services.",
        "sourceUrl": "https://www.friscotexas.gov/1254/Frisco-Water-Park"
      },
      {
        "question": "How tall do riders need to be for Preston Plunge?",
        "answer": "Frisco lists a 42-inch minimum for the four-lane Preston Plunge mat racer; Pipeline and Green Gusher each require riders to be 48 inches or taller.",
        "sourceUrl": "https://www.friscotexas.gov/1254/Frisco-Water-Park"
      },
      {
        "question": "Is Frisco Water Park open in October 2026?",
        "answer": "No. The city labels the outdoor waterpark closed for the 2026 season, with a normal operating period from Memorial Day weekend to Labor Day and published summer 2027 hours.",
        "sourceUrl": "https://www.friscotexas.gov/1254/Frisco-Water-Park"
      },
      {
        "question": "Do Frisco Athletic Center members pay separate admission?",
        "answer": "The city says Frisco Athletic Center members receive free access to the outdoor waterpark as part of their membership. Nonmember admissions should be checked on the current city visitor page.",
        "sourceUrl": "https://www.friscotexas.gov/1254/Frisco-Water-Park"
      }
    ]
  },
  {
    "slug": "bedford-waterpark",
    "name": "Bedford Center YMCA Water Park",
    "city": "Bedford",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "YMCA day passes and membership options",
    "summary": "An outdoor water-park facility operated through The Bedford Center YMCA.",
    "distinctiveNote": "Resident, member and non-member admission rules can differ; check before travel.",
    "officialUrl": "https://www.bedfordtx.gov/waterpark",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2801 Forest Ridge Dr., Bedford, TX",
    "visitorHighlights": [
      "Bedford's outdoor waterpark is within The Bedford Center YMCA and offers two waterslides plus a lazy river.",
      "The city lists a separate splash pad/play feature, concessions, reclining chairs and optional cabanas.",
      "The park permits clear lazy-river innertubes provided on site but does not allow guests to bring outside pool floats.",
      "Children 13 or younger need a parent or guardian present; children younger than eight need a life jacket or to remain within an adult's arm's reach.",
      "The City of Bedford directs visitors to YMCA staff for current-season opening dates and details rather than guaranteeing operation solely from the city page."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Bedford's outdoor waterpark?",
        "answer": "It operates within The Bedford Center YMCA at 2801 Forest Ridge Drive, Bedford. The city encourages visitors to contact the YMCA for the current season and actual open dates.",
        "sourceUrl": "https://www.bedfordtx.gov/waterpark"
      },
      {
        "question": "Can visitors attend without being YMCA members?",
        "answer": "Yes. The city's current waterpark page describes separate Bedford-resident and nonresident day passes; memberships at The Bedford Center include admission. Check prices before travel.",
        "sourceUrl": "https://www.bedfordtx.gov/waterpark"
      },
      {
        "question": "Are outside food coolers and float rings allowed?",
        "answer": "The City of Bedford prohibits ordinary outside food, large coolers and outside floats. It allows a small drinks cooler subject to its posted limits and provides clear innertubes for the lazy river.",
        "sourceUrl": "https://www.bedfordtx.gov/waterpark"
      },
      {
        "question": "What supervision and life-jacket rules apply?",
        "answer": "Visitors 13 and younger must have a parent or guardian present, while children under eight must wear a life jacket or stay within an adult's arm's reach. Free first-come life jackets are listed.",
        "sourceUrl": "https://www.bedfordtx.gov/waterpark"
      }
    ]
  },
  {
    "slug": "rock-n-river-round-rock",
    "name": "Rock'N River Water Park",
    "city": "Round Rock",
    "county": "Williamson",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public municipal admission",
    "summary": "A Round Rock city water park with slides, an action river and family play areas.",
    "distinctiveNote": "This is a different attraction from Kalahari's resort water park in the same city.",
    "officialUrl": "https://www.roundrocktexas.gov/city-departments/parks-and-recreation/facilities/pools/rock-n-river-water-park/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "800 Harrell Parkway, Round Rock, TX",
    "visitorHighlights": [
      "Rock'N River is inside Old Settlers Park near Dell Diamond; its entrance guide lists 800 Harrell Parkway, distinct from the department's Palm Valley Boulevard contact address.",
      "Splashville's Yellow Sidewinder, Orange Outlaw and Blue Blaze slides require riders at least 40 inches tall.",
      "The Lookout waterslides require 48 inches, and The Quarry rock wall, diving platform and drop slide require both 48 inches and a swim test for guests younger than 16.",
      "Riders under 48 inches must wear a Coast Guard-approved life jacket in the Action River; life jackets are available on site without charge.",
      "The City of Round Rock announced a substantial 2026 expansion; check the dated operator guide rather than assuming every planned feature is available."
    ],
    "visitorFaqs": [
      {
        "question": "Which address reaches Rock'N River's waterpark entrance?",
        "answer": "The City of Round Rock's location FAQ gives 800 Harrell Parkway within Old Settlers Park, near Dell Diamond. The site also lists a separate 3300 East Palm Valley Boulevard department address.",
        "sourceUrl": "https://www.roundrocktexas.gov/city-departments/parks-and-recreation/facilities/pools/rock-n-river-water-park/rockn-river-faqs/"
      },
      {
        "question": "How tall do children need to be for the big slides?",
        "answer": "Splashville's three specified slides require a minimum of 40 inches and The Lookout slides require 48 inches. Each attraction has its own sign and requirements.",
        "sourceUrl": "https://www.roundrocktexas.gov/city-departments/parks-and-recreation/facilities/pools/rock-n-river-water-park/"
      },
      {
        "question": "Is a swim test needed for The Quarry?",
        "answer": "Yes. The city requires a minimum of 48 inches, and visitors younger than 16 must pass a free on-site swim test for The Quarry's rock wall, diving platform and drop-slide activities.",
        "sourceUrl": "https://www.roundrocktexas.gov/city-departments/parks-and-recreation/facilities/pools/rock-n-river-water-park/"
      },
      {
        "question": "Do children need life jackets in the Action River?",
        "answer": "Any guest below 48 inches must wear an approved Coast Guard life jacket in the Action River. The city states that loaner jackets are available on site at no cost.",
        "sourceUrl": "https://www.roundrocktexas.gov/city-departments/parks-and-recreation/facilities/pools/rock-n-river-water-park/"
      }
    ]
  },
  {
    "slug": "boomtown-bay-burkburnett",
    "name": "Boomtown Bay Family Aquatic Center",
    "city": "Burkburnett",
    "county": "Wichita",
    "region": "North Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City-operated admissions and passes",
    "summary": "Burkburnett's family aquatic park serves the northern Wichita Falls area.",
    "distinctiveNote": "Check the municipal calendar, since water-park operations concentrate in summer.",
    "officialUrl": "https://www.boomtownbay.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "104 Tommy Thornton Way, Burkburnett, TX 76354",
    "visitorHighlights": [
      "Boomtown Bay is a Burkburnett municipal waterpark with a winding 365-foot lazy river.",
      "The attraction roster describes high-thrill drop and twisting slides between roughly 20 and 60 feet in height.",
      "Family play includes a zero-depth children’s zone and a vortex pool attraction separate from conventional slide rides.",
      "Free on-site parking is provided, and the operator lists an overflow parking area on Davy Drive.",
      "The park sells separately reserved shaded cabanas, group pavilions and after-hours private park rentals.",
      "The 2026 posted schedule ran daily through August 9, then weekends until early September, with a Labor Day session."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Boomtown Bay?",
        "answer": "The Burkburnett operator lists 104 Tommy Thornton Way, Burkburnett, Texas 76354. It provides free on-site parking and a Davy Drive overflow lot.",
        "sourceUrl": "https://www.boomtownbay.com/"
      },
      {
        "question": "Can we use the lazy river without riding thrill slides?",
        "answer": "Yes. Boomtown Bay lists a winding 365-foot lazy river, a separate zero-depth children's area and a vortex pool alongside taller thrill slides.",
        "sourceUrl": "https://www.boomtownbay.com/"
      },
      {
        "question": "Are private parties or shade rentals available?",
        "answer": "Yes. The operator advertises separately bookable cabanas, pavilions and an evening whole-waterpark rental with limited after-hours availability.",
        "sourceUrl": "https://www.boomtownbay.com/"
      },
      {
        "question": "Is the waterpark normally open in mid-October?",
        "answer": "No regular October operation is posted in the 2026 season schedule. It ran daily through early August and on selected weekends until Labor Day; consult future dated schedules before visiting.",
        "sourceUrl": "https://www.boomtownbay.com/"
      }
    ]
  },
  {
    "slug": "castaway-cove-wichita-falls",
    "name": "Castaway Cove Waterpark",
    "city": "Wichita Falls",
    "county": "Wichita",
    "region": "North Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Day tickets and season passes",
    "summary": "A stand-alone family water park in Wichita Falls, with a separately published 2026 schedule.",
    "distinctiveNote": "Use the official operational calendar to confirm the day and current ticket type.",
    "officialUrl": "https://www.castawaycovewaterpark.com/plan-your-visit/hours-calendar/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1000 Central Fwy. E., Wichita Falls, TX 76301",
    "visitorHighlights": [
      "Castaway Cove has distinct attractions including Buccaneer Bay, Hideaway Harbor, Nellie's Rolling River, Pirate's Plunge and Shipwreck Beach.",
      "The operator also lists Storm Watch Tower, Annie's Quest, Cliffhanger and Tommie's Torrent as separate high-adventure attractions.",
      "Outside food, picnic coolers and beverages are prohibited inside the waterpark, though a picnic area is provided outside the gate.",
      "Guests age 14 and younger must have a responsible guardian at least age 18 on park grounds.",
      "Infants, toddlers and children age three or younger must use a designated swim diaper.",
      "The 2026 operator calendar is seasonal, with specific opening days and one-off special events rather than year-round waterpark hours."
    ],
    "visitorFaqs": [
      {
        "question": "Can families bring their own food or drink cooler?",
        "answer": "No. The operator prohibits picnics, coolers and outside food or beverages beyond the gate, but provides a separate guest picnic area outside the waterpark.",
        "sourceUrl": "https://www.castawaycovewaterpark.com/plan-your-visit/park-policies/"
      },
      {
        "question": "Are 14-year-old guests permitted to enter alone?",
        "answer": "No. Castaway Cove requires visitors age 14 and younger to have a guardian at least 18 years old present on park property throughout the visit.",
        "sourceUrl": "https://www.castawaycovewaterpark.com/plan-your-visit/park-policies/"
      },
      {
        "question": "What are some named attractions at Castaway Cove?",
        "answer": "The operator lists Shipwreck Beach, Nellie's Rolling River, Buccaneer Bay, Pirate's Plunge and several slides including Cliffhanger and Tommie's Torrent.",
        "sourceUrl": "https://www.castawaycovewaterpark.com/attractions/"
      },
      {
        "question": "Where is Castaway Cove located?",
        "answer": "The operator gives 1000 Central Freeway East, Wichita Falls, Texas 76301 as its official waterpark location. Its admission calendar changes by date and season.",
        "sourceUrl": "https://www.castawaycovewaterpark.com/plan-your-visit/directions/"
      }
    ]
  },
  {
    "slug": "nrh2o-north-richland-hills",
    "name": "NRH2O Family Water Park",
    "city": "North Richland Hills",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public tickets; North Richland Hills resident pricing available",
    "summary": "A long-running municipally owned water park with numerous slides and family attractions.",
    "distinctiveNote": "The operator offers resident-specific tickets requiring proof of city residency.",
    "officialUrl": "https://www.nrh2o.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "9001 Boulevard 26, North Richland Hills, TX 76180",
    "visitorHighlights": [
      "NRH2O identifies itself as the first municipal waterpark in Texas, opened in 1995, and advertises roughly 23 attractions across 17 acres.",
      "Attractions include named rides Riggamaroll, Accelerator, Blue Sky, Thunder, Double Dipper and Purplepalooza.",
      "The family attraction roster separately lists NRH2Ocean, Endless River, Frogstein's Splashatory and the Tadpole Swimming Hole.",
      "The operator sells different resident and general admission passes, as well as separately reserved cabanas and premium loungers.",
      "The venue currently advertises 2027 season passes; current-day access and special events should always be checked against its hours/calendar rather than inferred from pass availability."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the NRH2O entrance?",
        "answer": "NRH2O lists its North Richland Hills office and waterpark address as 9001 Boulevard 26, Texas 76180. Check the operator's directions and parking information for the exact entrance.",
        "sourceUrl": "https://www.nrh2o.com/"
      },
      {
        "question": "Is NRH2O a city-operated waterpark?",
        "answer": "Yes. The park says it opened in 1995 as Texas' first municipal waterpark and now includes numerous large slides, small-child areas, a river and wave-style attractions.",
        "sourceUrl": "https://www.nrh2o.com/"
      },
      {
        "question": "Are resident passes and private seating offered?",
        "answer": "The operator separately advertises North Richland Hills resident season passes and general ticket options, with additional paid cabanas, beachside bungalows and reserved seating.",
        "sourceUrl": "https://www.nrh2o.com/"
      },
      {
        "question": "Does a 2027 season-pass sale mean the park is open now?",
        "answer": "No. Season-pass presales describe future eligibility, not today's waterpark hours. Use the current park hours and events page before traveling, especially in fall or winter.",
        "sourceUrl": "https://www.nrh2o.com/"
      }
    ]
  },
  {
    "slug": "water-rampage-lubbock",
    "name": "Water Rampage",
    "city": "Lubbock",
    "county": "Lubbock",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Summer day admission and passes",
    "summary": "Lubbock's seasonal water park is a South Plains summer outing.",
    "distinctiveNote": "The 2026 water-park season has ended; confirm 2027 dates before planning.",
    "officialUrl": "https://waterrampage.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6602 Marsha Sharp Fwy., Lubbock, TX 79407",
    "visitorHighlights": [
      "Water Rampage is a seasonal Lubbock waterpark with an official notice that its 2026 operating season has ended.",
      "Pirate's Cove is a young-child water playground with a pirate ship, smaller slides and dumping bucket.",
      "Caribbean Adventure offers a wave pool, baby pool and lazy river as separate areas.",
      "The operator lists a separate 21-and-over lounge pool in addition to the family attractions.",
      "Guests may reserve party pavilions during the public day or reserve a distinct after-hours private event time slot.",
      "The park's booking policy does not promise refunds, and its stated rescheduling process requires advance notice."
    ],
    "visitorFaqs": [
      {
        "question": "Is Water Rampage open during October?",
        "answer": "No. The park's homepage explicitly says its 2026 season is closed and advertises a 2027 return; old dated event calendars do not establish current open hours.",
        "sourceUrl": "https://waterrampage.com/"
      },
      {
        "question": "What attractions are designed for young children?",
        "answer": "The operator's Pirate's Cove includes a pirate-ship-themed play structure, smaller water slides and a dumping bucket; adults can choose the separate lazy river and wave pool.",
        "sourceUrl": "https://waterrampage.com/attractions/"
      },
      {
        "question": "Can families book a pavilion or private evening?",
        "answer": "Yes. Water Rampage lists rentable day-party pavilions and separate after-hours event reservations, subject to capacity, date and its published nonrefund policy.",
        "sourceUrl": "https://waterrampage.com/"
      },
      {
        "question": "Where is Water Rampage?",
        "answer": "The official operator lists 6602 Marsha Sharp Freeway, Lubbock, Texas 79407. Confirm the live seasonal calendar before traveling to this outdoor park.",
        "sourceUrl": "https://waterrampage.com/"
      }
    ]
  },
  {
    "slug": "pirates-cove-burleson",
    "name": "Pirates' Cove Water Park",
    "city": "Burleson",
    "county": "Johnson",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Water-park admission; campground guest offers may differ",
    "summary": "A Burleson-area water park associated with the North Texas Jellystone campground.",
    "distinctiveNote": "Choose Pirates' Cove Burleson; it is not Baytown's municipal Pirates Bay.",
    "officialUrl": "https://piratescovefunzone.com/park-info/directions-parking/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2461 S. Burleson Blvd., Burleson, TX 76028",
    "visitorHighlights": [
      "Pirates' Cove offers Big Pirate Family Slides including the open Caribbean Cork Screw and enclosed Texas Swirl tube rides.",
      "Both Big Pirate Family Slides require a minimum of 48 inches and permit a combined tube weight of at most 395 pounds.",
      "Other attractions include the six-lane Big Pirate Blue Racer, the Big Pirate Kamikaze steep drop and Lazy Alligator River.",
      "Little Pirate Slide Structure provides smaller slides and adjacent shallow water; these beginner slides require a minimum height of 36 inches.",
      "Free visitor parking is available; the operator offers a separate overflow lot with a shuttle when its main lot fills.",
      "The operator identifies the waterpark as closed for its 2026 season, while the adjacent Pirates Cove arcade and grill remain open year-round."
    ],
    "visitorFaqs": [
      {
        "question": "Can we use the waterpark in October 2026?",
        "answer": "No. The operator says the Pirates' Cove waterpark is closed for the season; its arcade and grill follow a separate year-round operating schedule.",
        "sourceUrl": "https://piratescovefunzone.com/"
      },
      {
        "question": "How tall do riders need to be for the family tube slides?",
        "answer": "The Caribbean Cork Screw and Texas Swirl tube slides require at least 48 inches in height, and the operator lists a combined maximum of 395 pounds per two-person tube.",
        "sourceUrl": "https://piratescovefunzone.com/attraction/big-pirate-family-slides/"
      },
      {
        "question": "What slides are suitable for young children?",
        "answer": "The dedicated Little Pirate Slide Structure lists a 36-inch minimum height, with smaller slides next to a shallow activity pool. Parents may not ride those small slides together with children.",
        "sourceUrl": "https://piratescovefunzone.com/attraction/little-pirate-slide-structure/"
      },
      {
        "question": "Is parking free at Pirates' Cove?",
        "answer": "Yes. The operator lists free main-lot parking at 2461 South Burleson Boulevard and an overflow lot with a free shuttle when needed.",
        "sourceUrl": "https://piratescovefunzone.com/park-info/directions-parking/"
      },
      {
        "question": "Is Pirates' Cove the same as North Texas Jellystone Park?",
        "answer": "No. The waterpark is adjacent to North Texas Jellystone Park and promotes nearby overnight accommodation, but the campsite and the waterpark have separate booking and admission products.",
        "sourceUrl": "https://piratescovefunzone.com/"
      }
    ]
  },
  {
    "slug": "palm-beach-moody-gardens",
    "name": "Palm Beach at Moody Gardens",
    "city": "Galveston",
    "county": "Galveston",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Resort beach water park",
    "admission": "Attraction tickets; resort packages may differ",
    "summary": "A seasonal white-sand pool and water-play attraction at Moody Gardens.",
    "distinctiveNote": "Palm Beach uses a separate attraction calendar and should not be confused with Gulf beach access.",
    "officialUrl": "https://www.moodygardens.com/attractions/palm-beach",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1 Hope Blvd., Galveston, TX 77554",
    "visitorHighlights": [
      "Moody Gardens Palm Beach is a seasonal private white-sand beach attraction next to the complex's pyramid museums.",
      "Waterpark attractions include a 650-foot lazy river, a wave pool and two slides from an 18-foot-tall tower.",
      "An interactive splashpad has dumping buckets, spray arches and fountain features for younger visitors.",
      "Guests can separately reserve cabanas, loungers and covered party tents, while free beach seating and shade are available in limited quantities.",
      "The operator offers limited complimentary US Coast Guard-approved child life jackets and describes its own concessions including Shoreline Grill.",
      "Palm Beach admission is distinct from tickets to the Rainforest, Discovery and Aquarium Pyramids; seasonal pass options may combine attractions."
    ],
    "visitorFaqs": [
      {
        "question": "Does Palm Beach have both a wave pool and a lazy river?",
        "answer": "Yes. The operator lists both a 650-foot lazy river and separate wave pool, plus two 18-foot-tower slides and an interactive children’s splashpad.",
        "sourceUrl": "https://www.moodygardens.com/attractions/palmbeach"
      },
      {
        "question": "Can guests use the regular free shade chairs?",
        "answer": "The operator advertises some complimentary beach chairs and umbrellas in limited supply, as well as separately rented cabanas and loungers that may need advance booking.",
        "sourceUrl": "https://www.moodygardens.com/attractions/palmbeach"
      },
      {
        "question": "Are life jackets offered for children?",
        "answer": "Yes. Moody Gardens says a limited quantity of Coast Guard-approved children's life jackets is available free, or families may bring approved devices subject to operator rules.",
        "sourceUrl": "https://www.moodygardens.com/attractions/palmbeach"
      },
      {
        "question": "Does a Palm Beach ticket include the museum pyramids?",
        "answer": "Not automatically. Palm Beach is listed as a separate seasonal attraction. Some upgraded annual memberships include multiple pyramids and other experiences, so check the exact ticket inclusions.",
        "sourceUrl": "https://www.moodygardens.com/attractions/palmbeach"
      }
    ]
  },
  {
    "slug": "jolly-mon-lake-conroe",
    "name": "Jolly Mon Water Park",
    "city": "Montgomery",
    "county": "Montgomery",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Resort stay or available day passes",
    "summary": "Margaritaville Lake Resort's water park has a lazy river, slides and splash zone.",
    "distinctiveNote": "A named resort water park with advertised day passes; check resort access terms.",
    "officialUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/jolly-mon-water-park",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "600 Margaritaville Pkwy., Montgomery, TX 77356",
    "visitorHighlights": [
      "Jolly Mon Water Park is inside Margaritaville Lake Resort, with a themed Lay-Z River and giant-bucket Splash Zone.",
      "The Turn About waterslide complex has two slides dropping into a heated pool; the resort posts a minimum rider height of 48 inches.",
      "The resort also lists an infinity pool, a 5 o'Clock Somewhere swim-up pool and separately rentable private cabanas.",
      "Public day passes are offered with access to Jolly Mon and selected other resort amenities, separate from staying overnight.",
      "The resort's current day-pass guide lists the waterslides as operating on Fridays through Sundays, subject to the actual attraction calendar.",
      "The operator warns there is no lifeguard on duty in pool and slide zones, so adult supervision is particularly important."
    ],
    "visitorFaqs": [
      {
        "question": "Do guests need to reserve a hotel room to visit Jolly Mon?",
        "answer": "No. Margaritaville Lake Resort offers standalone day passes with access to the waterpark and selected additional amenities, subject to capacity and the selected date.",
        "sourceUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/jolly-mon-water-park"
      },
      {
        "question": "How tall must riders be for the Turn About slides?",
        "answer": "The resort states a minimum height of 48 inches for both Turn About slides and requires adult supervision for children using the waterpark areas.",
        "sourceUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/jolly-mon-water-park"
      },
      {
        "question": "Are the waterslides running daily?",
        "answer": "Not necessarily. The resort's current day-pass information describes waterslide operation Friday through Sunday, and calendar or maintenance changes may affect availability.",
        "sourceUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/day-passes-and-cabana-rentals"
      },
      {
        "question": "Are lifeguards stationed at the resort pools?",
        "answer": "The resort's posted general pool and slide safety policies warn that a lifeguard is not on duty and direct guests to supervise children rather than relying on staff surveillance.",
        "sourceUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/jolly-mon-water-park"
      },
      {
        "question": "Does renting a cabana replace buying admission?",
        "answer": "The resort promotes optional standard and family cabanas, plus separate day-pass products. Review the terms for the chosen cabana and date to determine whether waterpark admission is included.",
        "sourceUrl": "https://www.margaritavilleresorts.com/margaritaville-lake-resort-lake-conroe/experiences/jolly-mon-water-park"
      }
    ]
  },
  {
    "slug": "paradise-springs-grapevine",
    "name": "Paradise Springs Water Park",
    "city": "Grapevine",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Gaylord Texan resort guests; verify any other access",
    "summary": "A 10-acre seasonal water park at the Gaylord Texan resort near Lake Grapevine.",
    "distinctiveNote": "The resort lists a select-days season; a hotel reservation is the dependable access route.",
    "officialUrl": "https://www.marriott.com/gaylord-hotels/gaylord-texan-dallas-resort-vacations.mi",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1501 Gaylord Trail, Grapevine, TX 76051",
    "visitorHighlights": [
      "Paradise Springs is Gaylord Texan's distinct ten-acre seasonal waterpark overlooking the Lake Grapevine resort grounds.",
      "The resort describes a roughly 600-foot lazy river, a 27-foot waterslide and a separate zip line.",
      "Cabanas and premium poolside seating can be reserved separately; access is a benefit of eligible overnight resort stays.",
      "Gaylord Texan's 2026 operating calendar ran on specific weekends in May, daily for much of summer and weekends through September 20.",
      "The resort distinguishes its year-round indoor and outdoor hotel pools from the separately seasonal Paradise Springs waterpark."
    ],
    "visitorFaqs": [
      {
        "question": "Can non-hotel visitors buy a standalone Paradise Springs day ticket?",
        "answer": "Gaylord Texan's official 2026 package states Paradise Springs is exclusive to overnight resort guests. Do not assume a public day ticket can be bought without a hotel reservation.",
        "sourceUrl": "https://www.marriott.com/offers/summerfest-package-off-168275/dalgt-gaylord-texan-resort-and-convention-center"
      },
      {
        "question": "Is Paradise Springs open during October?",
        "answer": "Not under the published 2026 waterpark calendar. Gaylord Texan lists its seasonal operation through September 20, while other hotel swimming pools can remain open on separate dates.",
        "sourceUrl": "https://www.marriott.com/offers/summerfest-package-off-168275/dalgt-gaylord-texan-resort-and-convention-center"
      },
      {
        "question": "Which aquatic attractions does the resort have?",
        "answer": "The ten-acre Paradise Springs complex features a 600-foot lazy river, 27-foot waterslide and a zip line alongside reserved cabanas and resort seating.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/experiences/"
      },
      {
        "question": "Does staying at the hotel guarantee every waterslide is running?",
        "answer": "No. The resort maintains a dated seasonal waterpark calendar and may close or limit specific attractions for operations or weather. Check the exact resort stay and waterpark dates.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/experiences/"
      }
    ]
  },
  {
    "slug": "river-bluff-san-antonio",
    "name": "River Bluff Water Experience",
    "city": "San Antonio",
    "county": "Bexar",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "JW Marriott resort guests only",
    "summary": "The JW Marriott San Antonio Hill Country has a large outdoor water park with slides and lazy river.",
    "distinctiveNote": "The resort explicitly restricts water-park access to registered hotel guests.",
    "officialUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/experiences/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "23808 Resort Pkwy., San Antonio, TX 78261",
    "visitorHighlights": [
      "River Bluff Water Experience is a nine-acre JW Marriott San Antonio Hill Country waterpark exclusively for overnight resort guests.",
      "The site has a 1,100-foot lazy river and a distinct 650-foot Pedernales River water ride with stronger current.",
      "The Canyon Oak Twister and Hill Country Plunge body slides both require at least 48 inches of height.",
      "The resort posts 42-inch minimum for Cibolo Falls tube slide with an adult (48 inches unaccompanied), and 36-inch minimum for Pedernales Falls with an adult (48 inches unaccompanied).",
      "River Bluff also has a children's zero-depth pool, separate sandy-beach and activity pools, and an adults-only infinity pool.",
      "The property says guest wristbands are capped at five per room and prohibits outside food or coolers in its waterpark.",
      "Pools can operate year-round, weather permitting, but outdoor slides and lazy river require a minimum ambient temperature over 55 degrees."
    ],
    "visitorFaqs": [
      {
        "question": "Can someone buy River Bluff admission without a hotel reservation?",
        "answer": "No. The JW Marriott operator says pool and waterpark access is reserved exclusively for its overnight resort guests and provides no public day-pass entitlement.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/"
      },
      {
        "question": "Are water rides open year-round regardless of weather?",
        "answer": "Not necessarily. Pools and some amenities may run year-round, but the resort says slides, lazy river and children's pool open only when the weather permits and temperature is above 55 degrees.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/"
      },
      {
        "question": "What are the different height restrictions?",
        "answer": "Canyon Oak Twister and Hill Country Plunge require at least 48 inches. The resort lists lower thresholds for two tube slides when children ride with an adult, with 48 inches unaccompanied.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/"
      },
      {
        "question": "Can resort guests use the waterpark after check-out?",
        "answer": "The JW Marriott says its guests can enjoy waterpark facilities through both check-in and checkout days, and guests can ask the bell desk to store luggage when needed.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/"
      },
      {
        "question": "Are outside picnic coolers allowed?",
        "answer": "No. The hotel explicitly prohibits outside food and beverages in River Bluff Water Experience, although it provides free towels and attraction-specific tubes for eligible guests.",
        "sourceUrl": "https://www.marriott.com/en-us/hotels/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa/overview/"
      }
    ]
  },
  {
    "slug": "hill-country-hyatt-waterpark",
    "name": "Hyatt Regency Hill Country Water Park",
    "city": "San Antonio",
    "county": "Bexar",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Resort stay; confirm access arrangements",
    "summary": "A five-acre resort water park with Ramblin' River, surf machine and slides.",
    "distinctiveNote": "The resort describes year-round outdoor water-park operations, weather permitting.",
    "officialUrl": "https://www.hyatt.com/hyatt-regency/en-US/sanhc-hyatt-regency-hill-country-resort-and-villas",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "9800 Hyatt Resort Dr., San Antonio, TX 78251",
    "visitorHighlights": [
      "Hyatt Regency Hill Country's five-acre resort waterpark is a separate amenity from the nearby SeaWorld and Aquatica destinations.",
      "Water attractions include Ramblin' River floating, a surf-style water simulator, water slides and separate resort swimming pools.",
      "The resort describes waterpark operation as year-round, subject to maintenance and weather conditions.",
      "The operator additionally advertises a new Crystal Lagoon attraction at the property, but it should not be confused with the existing five-acre waterpark.",
      "The hotel has its own on-site waterpark concessions at Vince's Watering Hole, with seasonal and holiday hours distinct from the pool itself."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Hyatt Regency Hill Country's waterpark?",
        "answer": "The hotel lists 9800 Hyatt Resort Drive, San Antonio, Texas 78251. It is a different resort and waterpark from Hyatt Regency Lost Pines near Bastrop.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/sanhc-hyatt-regency-hill-country-resort-and-villas"
      },
      {
        "question": "Is the waterpark a separate theme park ticket?",
        "answer": "The five-acre waterpark is listed among Hyatt Regency Hill Country's on-site resort amenities. Visitors should confirm overnight-guest and any day-access eligibility with the hotel before arriving.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/sanhc-hyatt-regency-hill-country-resort-and-villas"
      },
      {
        "question": "Is the outdoor waterpark open all year?",
        "answer": "Hyatt describes its waterpark as open year-round, but any slides, surf attractions and individual pools may be restricted by temperature, weather or maintenance.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/sanhc-hyatt-regency-hill-country-resort-and-villas"
      },
      {
        "question": "Can guests find food next to the waterpark?",
        "answer": "Yes. Hyatt lists Vince's Watering Hole as an on-site waterpark food and bar outlet, with its own published hours that may not match the water-play schedule.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/sanhc-hyatt-regency-hill-country-resort-and-villas/dining"
      }
    ]
  },
  {
    "slug": "crooked-river-lost-pines",
    "name": "Crooked River Water Park",
    "city": "Bastrop",
    "county": "Bastrop",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Hyatt Regency Lost Pines resort stay; check any day offers",
    "summary": "A resort water park near Bastrop with a lazy river, waterslide and family pools.",
    "distinctiveNote": "This is the Hyatt Lost Pines facility, not Hyatt Regency Hill Country in San Antonio.",
    "officialUrl": "https://www.hyatt.com/hyatt-regency/en-US/auslp-hyatt-regency-lost-pines-resort-and-spa",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "575 Hyatt Lost Pines Rd., Lost Pines, TX 78612",
    "visitorHighlights": [
      "Crooked River Water Park belongs to Hyatt Regency Lost Pines resort near Bastrop, rather than the Hyatt Regency Hill Country property in San Antonio.",
      "The waterpark has a lazy river, two-story waterslide and separate younger-child splash areas.",
      "The resort has an adults-only pool distinct from the activity pool, water slides and family water play.",
      "The hotel's resort fee includes Crooked River access for registered guests alongside many other recreation amenities.",
      "The property also offers horseback riding, nature recreation and golf, but those resort activities may have separate booking or safety rules."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Crooked River Water Park?",
        "answer": "The resort lists 575 Hyatt Lost Pines Road, Lost Pines, Texas 78612, near Bastrop. Do not confuse it with Hyatt Regency Hill Country's waterpark in San Antonio.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/auslp-hyatt-regency-lost-pines-resort-and-spa"
      },
      {
        "question": "What is included in the resort fee?",
        "answer": "Hyatt's hotel policies list use of Crooked River's lazy river, waterslide, activity pool, adults-only pool and children's splash areas among the resort-fee amenities.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/auslp-hyatt-regency-lost-pines-resort-and-spa/policies"
      },
      {
        "question": "Does it have something for guests who avoid big slides?",
        "answer": "Yes. The property lists lazy-river floating, an activity pool and adults-only pool plus separate children's splash areas alongside the two-story waterslide.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/auslp-hyatt-regency-lost-pines-resort-and-spa"
      },
      {
        "question": "Is Crooked River a municipal day-ticket pool?",
        "answer": "No. It is an on-site Hyatt resort amenity linked to the property's lodging and resort-fee policies; ask the operator before assuming public non-guest entry is available.",
        "sourceUrl": "https://www.hyatt.com/hyatt-regency/en-US/auslp-hyatt-regency-lost-pines-resort-and-spa/policies"
      }
    ]
  },
  {
    "slug": "jadewaters-hilton-anatole",
    "name": "JadeWaters at Hilton Anatole",
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Hilton Anatole resort-stay access; verify current day options",
    "summary": "A Dallas hotel water-play complex with waterslides and a lazy river.",
    "distinctiveNote": "Unlike Bahama Beach's municipal day park, access here is tied to a hotel resort setting.",
    "officialUrl": "https://www.hilton.com/en/hotels/dfwanhh-hilton-anatole/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2201 N. Stemmons Fwy., Dallas, TX 75207",
    "visitorHighlights": [
      "JadeWaters is Hilton Anatole's three-acre resort aquatic complex inside its sculpture park, not a municipal Dallas waterpark.",
      "The waterpark contains a 630-foot lazy river, 7,000-square-foot beach-entry family pool and two 180-foot waterslides.",
      "A separate 4,000-square-foot Leisure Cove pool has a swim-up bar and can follow different operating hours from slides and river.",
      "JadeWaters normally runs a summer season but its fall 2026 calendar offers Fridays through Sundays until November 1, not daily weekday use.",
      "The Hilton operator requires hotel guests to wear wristbands for entry and reentry and lists seasonal JadeWaters access as part of the property amenity charge.",
      "Guests may reserve premium cabanas or daybeds separately, which are not part of basic hotel waterpark access."
    ],
    "visitorFaqs": [
      {
        "question": "Are the waterslides open on weekdays in October 2026?",
        "answer": "Not under the published fall schedule. Hilton Anatole shows its JadeWaters waterpark operating Friday through Sunday through November 1, while the separate Leisure Cove pool has daily hours.",
        "sourceUrl": "https://www.hilton.com/en/hotels/dfwanhh-hilton-anatole/jadewaters/"
      },
      {
        "question": "Is JadeWaters the same as Bahama Beach Dallas?",
        "answer": "No. JadeWaters is a hotel resort complex at 2201 North Stemmons Freeway, while Bahama Beach is a separately ticketed city-operated park at another address.",
        "sourceUrl": "https://www.hilton.com/en/hotels/dfwanhh-hilton-anatole/jadewaters/"
      },
      {
        "question": "Does the resort have a lazy river and big slides?",
        "answer": "Yes. Hilton Anatole lists a 630-foot lazy river, two 180-foot waterslides and a 7,000-square-foot beach-entry family pool, plus a separate Leisure Cove area.",
        "sourceUrl": "https://www.hilton.com/en/hotels/dfwanhh-hilton-anatole/jadewaters/"
      },
      {
        "question": "Who can enter JadeWaters?",
        "answer": "The hotel's terms describe JadeWaters as an amenity for registered guests and require entry wristbands. Hotel packages may include enhanced or guaranteed access, but public walk-in entitlement should not be assumed.",
        "sourceUrl": "https://www.hilton.com/en/hotels/dfwanhh-hilton-anatole/jadewaters/"
      }
    ]
  },
  {
    "slug": "morgans-inspiration-island",
    "name": "Morgan's Inspiration Island",
    "city": "San Antonio",
    "county": "Bexar",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Separate dual-park ticket; guests with disabilities may qualify for free admission",
    "summary": "Morgan's Wonderland's ultra-accessible water park emphasizes inclusive play, with multiple splash environments and waterproof wheelchairs.",
    "distinctiveNote": "The water park requires different admission from the theme park; waterproof wheelchairs are offered first-come, first-served.",
    "officialUrl": "https://morganswonderland.org/water-park-attractions/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5223 David Edwards Dr., San Antonio, TX 78233",
    "visitorHighlights": [
      "Morgan's Inspiration Island is designed as an ultra-accessible waterpark with five distinct themed water-play areas, rather than large conventional thrill-slide towers.",
      "Calypso Cove combines music and water play; Rainbow Reef supplies warmer splash-pad water; Will's Hang Ten Harbor features accessible surf-themed sprayers.",
      "Harvey's Hideaway Bay includes a treehouse and wheelchair-ramp access, while Shipwreck Island includes a pirate ship with a bucket and wheelchair-accessible water cannons.",
      "Guests may use a free waterproof wheelchair from the park's Wheelchair Valet subject to first-come availability; dedicated coverings support ventilators and tracheostomy equipment.",
      "Accessibility provisions include adult-sized changing tables and transfer lifts in two of the accessible changing rooms.",
      "Morgan's Wonderland general dry-park ticket does not by itself grant admission to the separate Inspiration Island waterpark; the operator requires an eligible dual-park ticket."
    ],
    "visitorFaqs": [
      {
        "question": "Does a regular Morgan's Wonderland ticket include the waterpark?",
        "answer": "No. The operator specifies separate dual-park admission for Morgan's Inspiration Island and says regular dry-park tickets are insufficient. A spectator also needs the appropriate waterpark ticket.",
        "sourceUrl": "https://morganswonderland.org/water-park-attractions/"
      },
      {
        "question": "Are waterproof wheelchairs provided?",
        "answer": "Yes. The operator provides waterproof manual and specialized transfer-support chairs without an additional fee, but availability is first come, first served rather than guaranteed by reservation.",
        "sourceUrl": "https://morganswonderland.org/water-park-attractions/"
      },
      {
        "question": "What if a visitor uses a ventilator or needs a transfer lift?",
        "answer": "The operator provides free waterproof ventilator bags and tracheostomy protection covers, and lists several accessible changing rooms with adult-sized tables; two have transfer lifts.",
        "sourceUrl": "https://morganswonderland.org/water-park-attractions/"
      },
      {
        "question": "Are children and adults able to share accessible splash areas?",
        "answer": "Yes. The five themed splash pads feature accessible features, including ramps, interactive water sprayers and wheelchair-accessible water cannons designed for inclusive play.",
        "sourceUrl": "https://morganswonderland.org/water-park-attractions/"
      },
      {
        "question": "Is the waterpark open on the dry park's October operating dates?",
        "answer": "Do not assume so. The operator advertises Inspiration Island during its separate summer-season calendar, while Morgan's Wonderland dry-park operation can continue on different dates.",
        "sourceUrl": "https://morganswonderland.org/tickets-passes/"
      }
    ]
  },
  {
    "slug": "canyon-aqua-park",
    "name": "Canyon Aqua Park",
    "city": "Canyon",
    "county": "Randall",
    "region": "Panhandle",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Session-based tickets and resident season passes",
    "summary": "Canyon's city-operated Aqua Park is a family water-play destination near Palo Duro Canyon.",
    "distinctiveNote": "The operator uses swimming sessions, and its 2026 season ran from May 23 through August 15.",
    "officialUrl": "https://www.canyontx.gov/511/About-Us",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1900 12th Ave., Canyon, TX 79015",
    "visitorHighlights": [
      "Canyon Aqua Park is located within Conner Park rather than being a standalone indoor pool.",
      "The city's current visitor page lists two separate general-admission swim sessions on weekdays and Saturdays, divided by a one-hour closure.",
      "Sunday general sessions use a separate afternoon/evening schedule from the Monday–Saturday sessions.",
      "The facility opened in 2017 and the City of Canyon describes summer demand of roughly 50,000 visitors.",
      "Tuesday and Thursday evening lap-swim offerings are separate from the general waterpark sessions and require their own admission."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Canyon Aqua Park located?",
        "answer": "The city lists Canyon Aqua Park inside Conner Park at 1900 12th Avenue, Canyon, Texas 79015. This is a named municipal family waterpark with separately scheduled sessions.",
        "sourceUrl": "https://www.canyontx.gov/511/About-Us"
      },
      {
        "question": "Can a ticket be used for the entire day?",
        "answer": "Do not assume so. The city's published waterpark hours divide general admission into two separate daytime/evening sessions, with a break in between. Confirm current re-entry rules with staff.",
        "sourceUrl": "https://www.canyontx.gov/511/About-Us"
      },
      {
        "question": "Are Sunday hours the same as other days?",
        "answer": "No. Canyon lists separate Sunday waterpark sessions in the afternoon and evening; Monday through Saturday use a different two-session schedule during the summer season.",
        "sourceUrl": "https://www.canyontx.gov/511/About-Us"
      },
      {
        "question": "Is lap swimming included in the normal waterpark session?",
        "answer": "The city separately advertises Tuesday and Thursday evening lap swimming with its own small admission charge. Check current seasonal waterpark dates before deciding which session to attend.",
        "sourceUrl": "https://www.canyontx.gov/511/About-Us"
      }
    ]
  },
  {
    "slug": "nessler-family-aquatics",
    "name": "Nessler Family Aquatics Center",
    "city": "Texas City",
    "county": "Galveston",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public admission with resident pricing",
    "summary": "A Texas City water-park-like municipal complex with lazy river, flume slides and children's play.",
    "distinctiveNote": "The published 2026 season ended September 7; city residency documentation affects admission rates.",
    "officialUrl": "https://texascitytx.gov/896/Nessler-Family-Aquatics-Center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1700 5th Avenue North, Texas City, TX 77590",
    "visitorHighlights": [
      "The Texas City park has an aquatic area with flume waterslides and a separate lazy river alongside children's water play.",
      "The city's waterslide regulations require riders to be at least 48 inches tall and enter the slide feet-first under lifeguard direction.",
      "Nessler Family Aquatics Center offers on-site restrooms and concessions; verify rules before bringing outside food or drinks.",
      "Texas City lists a Tuesday–Sunday summer schedule followed by weekend-only sessions late in the season.",
      "The operator confirms Labor Day, September 7, was the last day of the 2026 public swimming season, rather than year-round operation.",
      "Texas City uses a lottery-style process for private swim party reservations, with residency eligibility for some parties."
    ],
    "visitorFaqs": [
      {
        "question": "Can families swim here in October 2026?",
        "answer": "No. The official Texas City schedule identifies Labor Day, September 7, as the last day of the 2026 public season. Check next-season schedules before traveling.",
        "sourceUrl": "https://texascitytx.gov/896/Nessler-Family-Aquatics-Center"
      },
      {
        "question": "How tall must someone be to ride the waterslide?",
        "answer": "The Texas City waterslide rules require a minimum height of 48 inches. Riders must follow lifeguard instructions, slide feet first, and remove prohibited metal or sharp items.",
        "sourceUrl": "https://texascitytx.gov/896/Nessler-Family-Aquatics-Center"
      },
      {
        "question": "Where is the Nessler Aquatics Center?",
        "answer": "The operator lists the entrance at 1700 5th Avenue North, Texas City, Texas 77590. It is a municipal family facility with seasonal dates and separately administered private events.",
        "sourceUrl": "https://texascitytx.gov/896/Nessler-Family-Aquatics-Center"
      },
      {
        "question": "Can nonresidents reserve a private party?",
        "answer": "The city describes a resident-only reservation drawing for some high-demand private party dates. Confirm the current eligibility and reservation method rather than assuming normal ticket sales reserve the site.",
        "sourceUrl": "https://texascitytx.gov/896/Nessler-Family-Aquatics-Center"
      }
    ]
  },
  {
    "slug": "veterans-memorial-pool-cedar-park",
    "name": "Veterans Memorial Pool Water Playscape",
    "city": "Cedar Park",
    "county": "Williamson",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City pool day pass and summer pool passes",
    "summary": "Cedar Park's large interactive outdoor pool has a dump bucket, beach-entry playscape and a drop slide.",
    "distinctiveNote": "This is a compact city water-play facility, not a full-size slide park; the city says it reopens May 2027.",
    "officialUrl": "https://www.cedarparktexas.gov/facilities/facility/details/veteransmemorialpool-6",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2525 W. New Hope Drive, Cedar Park, TX 78613",
    "visitorHighlights": [
      "The municipal pool covers roughly 8,300 square feet of water, with a listed maximum facility occupancy of 450.",
      "The zero-depth beach-entry water-play area includes a giant dumping bucket and substantial interactive playscape.",
      "Older children have a separate mid-depth zone, a high diving platform and a drop slide.",
      "Shade and private pool reservations are separate products from ordinary day admission.",
      "The official city listing says Veterans Memorial Pool is closed for the season and plans to reopen in May 2027."
    ],
    "visitorFaqs": [
      {
        "question": "Can we visit Veterans Memorial Pool this fall?",
        "answer": "No. The City of Cedar Park identifies the waterpark-style pool as closed for the 2026 season, with a planned reopening in May 2027. The park should not be marketed as currently swimmable.",
        "sourceUrl": "https://www.cedarparktexas.gov/facilities/facility/details/veteransmemorialpool-6"
      },
      {
        "question": "Does the pool have activities for older children?",
        "answer": "Yes. The city lists a mid-depth play area, a large dive platform and a drop slide in addition to the zero-depth beach and younger-child giant-bucket playscape.",
        "sourceUrl": "https://www.cedarparktexas.gov/facilities/facility/details/veteransmemorialpool-6"
      },
      {
        "question": "Can families book shade seating or a private party?",
        "answer": "The operator offers separate poolside shade reservations, with different capacity tiers, and time-restricted evening private pool rentals. Admission alone does not guarantee a reserved shade zone.",
        "sourceUrl": "https://www.cedarparktexas.gov/facilities/facility/details/veteransmemorialpool-6"
      },
      {
        "question": "Where is Cedar Park's Veterans Memorial Pool?",
        "answer": "The city's published facility address is 2525 West New Hope Drive, Cedar Park, Texas 78613. Consult the facility calendar for future operating dates and special closures.",
        "sourceUrl": "https://www.cedarparktexas.gov/facilities/facility/details/veteransmemorialpool-6"
      }
    ]
  },
  {
    "slug": "apex-centre-mckinney",
    "name": "Apex Centre Leisure Water Park",
    "city": "McKinney",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Both",
    "kind": "Municipal water park",
    "admission": "Recreation-center membership or daily access under center rules",
    "summary": "McKinney's Apex Centre pairs a seasonal outdoor slide-and-river complex with indoor water-play facilities.",
    "distinctiveNote": "The outdoor slides and river are seasonal, while indoor leisure swimming has a separate schedule.",
    "officialUrl": "https://www.mckinneytexas.org/1744/Aquatics",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "3003 Alma Rd., McKinney, TX 75070",
    "visitorHighlights": [
      "The Apex Centre's seasonal outdoor leisure pool has a river channel, a separate family slide and a younger-child play structure.",
      "Four substantial outdoor body slides are listed: three enclosed flumes and one open-flume attraction.",
      "The outdoor leisure pool includes a water basketball hoop, while a separate shallow kiddie pool has zero-depth entry and its own small slide.",
      "Year-round indoor amenities include a separate leisure pool with river channel, water-play structure and an open-flume slide.",
      "The Apex Centre is a membership/day-pass recreation facility rather than a standalone waterpark ticket-only business.",
      "The city explicitly permits guests to bring food and coolers to its outdoor pools but prohibits glass items and alcohol."
    ],
    "visitorFaqs": [
      {
        "question": "Can nonmembers use McKinney's Apex Centre pools?",
        "answer": "The city publishes Apex Centre membership and day-pass rates and allows visitors to inquire at the front desk about access. Confirm that outdoor seasonal waterpark features are included on your selected date.",
        "sourceUrl": "https://www.mckinneytexas.org/1744/Aquatics"
      },
      {
        "question": "Are all water slides available year-round?",
        "answer": "No. The Apex Centre's outdoor leisure pool and kiddie pool operate seasonally, but the city describes its indoor leisure pool as open year-round. Individual slides may be temporarily unavailable.",
        "sourceUrl": "https://www.mckinneytexas.org/1744/Aquatics"
      },
      {
        "question": "May families bring their own picnic food?",
        "answer": "Yes. McKinney explicitly allows outside food and coolers at its outdoor leisure and kiddie pools, but glass containers and alcoholic beverages are prohibited.",
        "sourceUrl": "https://www.mckinneytexas.org/1744/Aquatics"
      },
      {
        "question": "What rides are in the outdoor versus indoor pools?",
        "answer": "The outdoor pool lists a river channel, family slide and four body slides. The separate indoor leisure pool has a play area and an open-flume slide, so these are not identical experiences.",
        "sourceUrl": "https://www.mckinneytexas.org/1744/Aquatics"
      }
    ]
  },
  {
    "slug": "strawberry-water-park-pasadena",
    "name": "Strawberry Water Park",
    "city": "Pasadena",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public day admissions with Pasadena resident discounts",
    "summary": "Pasadena's municipal Strawberry Water Park offers a lazy river, several slide options and obstacle features.",
    "distinctiveNote": "Pasadena confirms it is closed for the 2026 season; the water slides have minimum height rules.",
    "officialUrl": "https://www.pasadenatx.gov/941/Strawberry-Water-Park",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1114 Parkside, Pasadena, TX",
    "visitorHighlights": [
      "Strawberry Water Park includes a 330,000-gallon pool and lazy river, with three different slide options.",
      "The Pasadena facility offers an aquatics play unit, an inflatable obstacle course and a separate rope obstacle course.",
      "Water basketball and volleyball are listed alongside concession food and a rentable private party room.",
      "Guests shorter than 48 inches may not ride the water slides or use the inflatable obstacle course.",
      "The city reports a maximum guest capacity of 500, which can be lowered according to the required lifeguard-to-swimmer ratio.",
      "The facility's official visitor page identifies Strawberry Water Park as closed for the season as of October 2026."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Pasadena's Strawberry Water Park?",
        "answer": "Pasadena lists this location at 1114 Parkside. The municipal page describes this separately from ordinary neighborhood pools, with three slides, a river and obstacle areas.",
        "sourceUrl": "https://pasadenatx.gov/941/Strawberry-Water-Park"
      },
      {
        "question": "Can children shorter than 48 inches use the water slides?",
        "answer": "No. Pasadena specifically disallows guests below 48 inches from using the waterslides or inflatable obstacle course. Other play areas have their own age and supervision requirements.",
        "sourceUrl": "https://pasadenatx.gov/941/Strawberry-Water-Park"
      },
      {
        "question": "Does the park offer food or a private party space?",
        "answer": "Yes. Pasadena lists a public concession stand and a separate rentable party room. Check availability, capacity and applicable fees with the operator before planning a celebration.",
        "sourceUrl": "https://pasadenatx.gov/941/Strawberry-Water-Park"
      },
      {
        "question": "Is Strawberry Water Park open in October 2026?",
        "answer": "No. The city’s current official Strawberry Water Park page says the facility is closed for the season. The next operating calendar must be confirmed before travel.",
        "sourceUrl": "https://pasadenatx.gov/941/Strawberry-Water-Park"
      }
    ]
  },
  {
    "slug": "lake-conroe-splash-zone",
    "name": "Lake Conroe Splash Zone",
    "city": "Montgomery",
    "county": "Montgomery",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Inflatable lake water park",
    "admission": "Timed obstacle-course admission plus separate beach-park entry",
    "summary": "A floating inflatable course with slides and a water trampoline inside Lake Conroe Beach Park.",
    "distinctiveNote": "Participants must be at least six years old and wear provided life jackets; beach-park entry is separate.",
    "officialUrl": "https://www.lakeconroesplashzone.com/faqs",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "14968 TX-105, Montgomery, TX 77356",
    "visitorHighlights": [
      "Lake Conroe Splash Zone is a floating inflatable obstacle course inside Lake Conroe Beach Park, not a concrete slide park or hotel pool.",
      "Obstacles include floating climbs, slides and other interactive challenges; all participant sessions are supervised by staff.",
      "The operator sets a minimum participant age of six and requires every participant to wear a supplied life jacket.",
      "Each waterpark obstacle session lasts 45 minutes, with an advance reservation recommended because sessions can sell out.",
      "Admission to Lake Conroe Beach Park, including parking, is charged separately from the floating aqua-park session.",
      "Lake and weather conditions can cancel or reschedule sessions, so calendar availability is not a guarantee of safe water conditions."
    ],
    "visitorFaqs": [
      {
        "question": "Do children under six get access to the course?",
        "answer": "No. Lake Conroe Splash Zone's operator specifies that the floating water obstacle course is limited to participants age six and older.",
        "sourceUrl": "https://www.lakeconroesplashzone.com/faqs"
      },
      {
        "question": "How long is a waterpark session?",
        "answer": "Each booked session lasts 45 minutes. The operator recommends reservations ahead of time because session capacity is limited, but may accept walk-ins where space remains.",
        "sourceUrl": "https://www.lakeconroesplashzone.com/faqs"
      },
      {
        "question": "Are life jackets included and mandatory?",
        "answer": "Yes. Staff provide a life jacket to every participant, and wearing one is required regardless of age or swimming skill; an on-site briefing covers additional safety rules.",
        "sourceUrl": "https://www.lakeconroesplashzone.com/faqs"
      },
      {
        "question": "Is parking included with the obstacle-course ticket?",
        "answer": "Not automatically. Lake Conroe Splash Zone operates inside Lake Conroe Beach Park, where guests must buy a separate beach-park entry pass that covers parking and park amenities.",
        "sourceUrl": "https://www.lakeconroesplashzone.com/faqs"
      },
      {
        "question": "Where is the floating waterpark located?",
        "answer": "The operator gives the entrance as Lake Conroe Beach Park at 14968 Texas Highway 105 in Montgomery, Texas 77356; weather or lake conditions can cancel a reserved session.",
        "sourceUrl": "https://www.lakeconroesplashzone.com/faqs"
      }
    ]
  },
  {
    "slug": "conroe-water-park",
    "name": "Conroe Water Park",
    "city": "Conroe",
    "county": "Montgomery",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Municipal seasonal admission; verify 2027 reopening",
    "summary": "A Conroe city facility built around recreational water slides and shallow family play.",
    "distinctiveNote": "The city operates the water park separately from its year-round aquatic center; the 2026 seasonal calendar ended in September.",
    "officialUrl": "https://www.cityofconroe.org/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1207 Candy Cane Ln., Conroe, TX 77301",
    "visitorHighlights": [
      "Conroe Water Park is the seasonal slide and family water-play site at 1207 Candy Cane Lane, next door to the separate year-round Conroe Aquatic Center.",
      "Conroe Aquatic Center's official tourism listing gives 1205 Candy Cane Lane for its indoor/main aquatics facility, not the seasonal waterpark entrance.",
      "The outdoor waterpark has children's slides and family water recreation, rather than being a standard lap-only pool.",
      "Community visitor materials describe split morning and afternoon summer admission sessions with an intermediate closure; travelers should check the current year’s operator calendar.",
      "Fall opening should not be inferred from the adjacent indoor aquatics building, which runs a separate year-round schedule."
    ],
    "visitorFaqs": [
      {
        "question": "Is Conroe Water Park the same as the city's indoor aquatic center?",
        "answer": "No. The outdoor seasonal waterpark uses the 1207 Candy Cane Lane address, while the City of Conroe Aquatic Center is at 1205 Candy Cane Lane and has separate indoor aquatic programming.",
        "sourceUrl": "https://www.visitconroe.com/listing/conroe-aquatic-center/590/"
      },
      {
        "question": "Can families visit the outdoor slides in October?",
        "answer": "The published Conroe waterpark visitor listings describe a summer-only period, unlike the year-round indoor aquatic center. The city must confirm any future special October swim session.",
        "sourceUrl": "https://www.visitconroe.com/listing/conroe-aquatic-center/590/"
      },
      {
        "question": "Does the waterpark use a single continuous daytime ticket?",
        "answer": "Visitor materials describe separate morning and afternoon waterpark session blocks; current access and re-entry terms should be confirmed with the municipal operator before purchasing.",
        "sourceUrl": "https://www.visitconroe.com/listing/conroe-aquatic-center/590/"
      },
      {
        "question": "Where is Conroe's seasonal family waterpark?",
        "answer": "The outdoor waterpark is listed at 1207 Candy Cane Lane, Conroe, TX 77301, next to but distinct from the Conroe Aquatic Center at 1205 Candy Cane Lane.",
        "sourceUrl": "https://www.visitconroe.com/listing/conroe-aquatic-center/590/"
      }
    ]
  },
  {
    "slug": "summer-fun-belton",
    "name": "Summer Fun Water Park",
    "city": "Belton",
    "county": "Bell",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Tickets sold at gate, including family admission and special event policies",
    "summary": "Belton's family-run summer park offers pools, slides and a lazy river rather than a hotel-restricted water-play facility.",
    "distinctiveNote": "Parking is free, outside food is permitted subject to cooler rules, and seasonal operations stop in colder months.",
    "officialUrl": "https://www.summerfunwaterpark.com/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1410 Waco Rd., Belton, TX 76513",
    "visitorHighlights": [
      "Summer Fun Water Park is a family-owned seasonal Belton waterpark whose official site announces it is closed for winter.",
      "The operator lists free visitor parking and permits families to bring picnic food or drinks subject to a cooler fee.",
      "Water areas include a main swimming pool and lazy river, with separate swim-diaper and flotation rules for toddlers age two and younger.",
      "Day-visit tickets are sold at the gate rather than through an official advance online checkout.",
      "The operator also advertises separate adults-only evening events with different age, food and admission restrictions."
    ],
    "visitorFaqs": [
      {
        "question": "Is Summer Fun open in October 2026?",
        "answer": "The operator’s public homepage says the waterpark is closed for winter, so its old summer operating-hours text should not be treated as today's hours.",
        "sourceUrl": "https://www.summerfunwaterpark.com/"
      },
      {
        "question": "Can visitors bring food and a picnic cooler?",
        "answer": "Yes. The family-owned park allows outside food and beverages, subject to a cooler fee, but specifically prohibits glass containers.",
        "sourceUrl": "https://www.summerfunwaterpark.com/"
      },
      {
        "question": "Are parking and online advance tickets available?",
        "answer": "Regular visitor parking is free. The park says its normal day-visit tickets are purchased at the entrance gate rather than requiring advance online ticket purchases.",
        "sourceUrl": "https://www.summerfunwaterpark.com/"
      },
      {
        "question": "Can infants or toddlers use the pools?",
        "answer": "Children two and under can use the main swimming pool and lazy river with a swim diaper, an approved Coast Guard life jacket, and direct guardian supervision.",
        "sourceUrl": "https://www.summerfunwaterpark.com/"
      }
    ]
  },
  {
    "slug": "surf-and-swim-garland",
    "name": "Surf & Swim Wave Pool",
    "city": "Garland",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City-run wave-pool tickets and group options",
    "summary": "Garland's Surf & Swim is a municipal outdoor wave-pool complex rather than a multi-tower slide destination.",
    "distinctiveNote": "The 2026 summer season has ended; check the city's aquatic page for the next seasonal schedule and weather policies.",
    "officialUrl": "https://garlandtx.gov/3454/Surf-Swim",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "440 W. Oates Rd., Garland, TX 75043",
    "visitorHighlights": [
      "Garland's Surf & Swim advertises three water slides and the distinctive Murphy Wave wave machine.",
      "The full complex includes a lazy river, vortex spinning water feature and separate activity pool.",
      "Family amenities include a climbing wall, toddler pool, on-site concessions and rentable cabanas or a separate party area.",
      "Residents and nonresidents pay different admission categories, and the city charges an additional cooler fee.",
      "Children younger than 14 must be accompanied by an adult; glass, alcohol and commercial outside food are not permitted.",
      "The city identifies Surf & Swim as closed for the 2026 summer season, despite displaying summer hours for reference."
    ],
    "visitorFaqs": [
      {
        "question": "Is Garland's Surf & Swim open this October?",
        "answer": "No. Garland's official aquatic website says Surf & Swim is closed for the 2026 summer season. Its summer hours do not establish current operating access.",
        "sourceUrl": "https://www.garlandtx.gov/3454/Surf-Swim"
      },
      {
        "question": "Does Surf & Swim offer a traditional wave pool?",
        "answer": "The facility lists a Murphy Wave water-wave feature, three slides, a vortex, a lazy river and a distinct activity pool. It is not interchangeable with Garland's Holford Aquatic Center.",
        "sourceUrl": "https://www.garlandtx.gov/3454/Surf-Swim"
      },
      {
        "question": "What are the cooler and food policies?",
        "answer": "The city permits coolers for a separate admission fee, while banning outside commercial food, glass and alcohol. Review the current park policy before packing a family meal.",
        "sourceUrl": "https://www.garlandtx.gov/3454/Surf-Swim"
      },
      {
        "question": "Can a 12-year-old visit the park without an adult?",
        "answer": "No. Garland specifically requires children younger than 14 to be accompanied by an adult. Daycare and camp groups have additional required adult-to-child ratios.",
        "sourceUrl": "https://www.garlandtx.gov/3454/Surf-Swim"
      }
    ]
  },
  {
    "slug": "seguin-wave-pool",
    "name": "Seguin Wave Pool",
    "city": "Seguin",
    "county": "Guadalupe",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public wave-pool admission with age-based tickets",
    "summary": "Seguin's Max Starcke Park wave pool features a beach-entry wave basin and an adjacent kiddie splash pool.",
    "distinctiveNote": "The city explicitly marks the 2026 wave-pool season as finished and expects reopening in May 2027.",
    "officialUrl": "https://www.seguintexas.gov/785/Aquatics",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1 Wave Pool Drive, Seguin, TX 78155",
    "visitorHighlights": [
      "The Seguin Wave Pool is a municipal 15,000-square-foot wave pool inside Max Starcke Park East.",
      "The facility includes a zero-depth beach-style entry, separate splash pool and raindrop-mushroom play feature.",
      "The operator advertises reduced-price no-wave swim sessions and standard wave-operation admission as different experiences.",
      "The City of Seguin's 2026 swimming season ended on August 2, earlier than many Texas municipal waterparks.",
      "The city prominently says the Seguin Wave Pool is now closed for 2026 and is expected to reopen in May 2027."
    ],
    "visitorFaqs": [
      {
        "question": "Is Seguin Wave Pool still operating in 2026?",
        "answer": "No. Seguin's official aquatic page states the wave pool is closed for the 2026 season and expects to welcome swimmers again in May 2027; the past summer's tickets do not imply fall access.",
        "sourceUrl": "https://www.seguintexas.gov/785/Aquatics"
      },
      {
        "question": "Where is the Seguin Wave Pool?",
        "answer": "The city lists the wave pool at 1 Wave Pool Drive in Max Starcke Park East, Seguin, Texas 78155, rather than at the other recreation facilities elsewhere in town.",
        "sourceUrl": "https://www.seguintexas.gov/785/Aquatics"
      },
      {
        "question": "Is there a place for visitors who do not want waves?",
        "answer": "The 15,000-square-foot pool has zero-depth beach entry and a separate splash pool. The city also describes special discounted no-wave sessions when its wave feature is not operating.",
        "sourceUrl": "https://www.seguintexas.gov/785/Aquatics"
      },
      {
        "question": "Does everyone entering need a ticket?",
        "answer": "The city states all entering visitors must pay the appropriate admission rate, with a free-entry age category for children three and younger and other possible seasonal discounts.",
        "sourceUrl": "https://www.seguintexas.gov/785/Aquatics"
      }
    ]
  },
  {
    "slug": "jellystone-waller-waterpark",
    "name": "Jellystone Park Waller Water Park",
    "city": "Waller",
    "county": "Waller",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground admission or limited seasonal day-camp passes",
    "summary": "Jellystone Waller combines a lazy river, large slide, water playground and swimming pool as resort-style camping amenities.",
    "distinctiveNote": "Day camp passes are offered during peak dates, not as an unconditional year-round walk-in attraction.",
    "officialUrl": "https://wallerjellystonepark.com/things-to-do",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "34843 Betka Rd., Waller, TX 77484",
    "visitorHighlights": [
      "Waller's campground water attractions comprise a named JellyRoll waterslide, a lazy river and a separate interactive Water Playground.",
      "The campground also operates an activity pool with three basketball hoops, not simply a collection of one-slide hotel pools.",
      "For 2026, JellyRoll, lazy river and splash attractions open daily March 6–22 and May 22–August 9, then on weekends March 23–May 21 and August 10–November 1.",
      "Guests can book a separate Day Camp Pass on eligible peak-season dates and selected Friday–Sunday off-peak periods; overnight cabins and RV sites are different products.",
      "The adjacent Pic-A-Nic Basket Cafe offers on-site food, while nearby activities include mini golf and jumping pillows.",
      "Jellystone Waller is a camp-resort with seasonal water attractions; longer-term campground availability does not establish the slides are open."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Waller Jellystone waterpark?",
        "answer": "The operator lists its camp-resort at 34843 Betka Road, Waller, Texas 77484. The JellyRoll slide, water playground and lazy river are on-site resort amenities.",
        "sourceUrl": "https://wallerjellystonepark.com/things-to-do"
      },
      {
        "question": "Can guests visit the waterpark without renting a campsite?",
        "answer": "Yes. The operator advertises Day Camp Passes with use of the activity pool, Water Playground, lazy river and water-slide attractions on designated dates. Advance reservations are recommended.",
        "sourceUrl": "https://wallerjellystonepark.com/blog/access-the-best-texas-water-park-with-a-day-pass"
      },
      {
        "question": "Is the Waller lazy river open every day in October?",
        "answer": "No. The 2026 attraction schedule lists weekend-only operation from August 10 through November 1 rather than daily fall hours. Confirm the specific weekend and activity schedule.",
        "sourceUrl": "https://wallerjellystonepark.com/things-to-do"
      },
      {
        "question": "Are waterpark and campground reservations identical?",
        "answer": "No. An overnight cabin or RV stay and a limited day-access ticket are different products; the operator publishes waterpark activity calendars independent of year-round campsite availability.",
        "sourceUrl": "https://wallerjellystonepark.com/blog/access-the-best-texas-water-park-with-a-day-pass"
      }
    ]
  },
  {
    "slug": "jellystone-guadalupe-river-waterpark",
    "name": "Jellystone Park Guadalupe River Water Park",
    "city": "Kerrville",
    "county": "Kerr",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground reservation or peak-season day passes",
    "summary": "The Kerrville campground's water facilities include large slides, an interactive playground and three outdoor swimming pools.",
    "distinctiveNote": "An indoor heated swimming pool is a separate amenity, not the indoor water park; outdoor rides have their own seasonal schedule.",
    "officialUrl": "https://jellystoneguadalupe.com/things-to-do/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2605 Junction Hwy., Kerrville, TX 78028",
    "visitorHighlights": [
      "The Guadalupe River Jellystone resort has three separate signature slides named Guadaloop-de-loop, River Racers and Kerrville Korkscrew.",
      "An interactive Water Playground adds two lower slides, a hydrostorm tipping bucket, water cannons and spray features.",
      "The camp-resort offers three substantial outdoor pools in addition to its children's water-play area.",
      "Guests may also find an indoor heated swimming pool, but it is a separate conventional pool and not a full indoor waterpark.",
      "Spring non-peak water features were scheduled on weekends beginning March 23, 2026, while the major slide group operated daily during the summer peak season.",
      "Day Camp Passes are available during peak season; cabin and RV reservations are separately sold."
    ],
    "visitorFaqs": [
      {
        "question": "Does this Jellystone location have three named thrill slides?",
        "answer": "Yes. Its official 2026 summer activity listing names Guadaloop-de-loop, River Racers and Kerrville Korkscrew, separate from the toddler-friendly water playground.",
        "sourceUrl": "https://jellystoneguadalupe.com/blog/seasonal-bliss-experience-jellystone-park-guadalupe-river-through-every-season"
      },
      {
        "question": "Can families use the playground rather than big slides?",
        "answer": "Yes. The operator describes two smaller playground slides, a tipping hydrostorm bucket, spray features and water cannons, plus three outdoor swimming pools.",
        "sourceUrl": "https://jellystoneguadalupe.com/things-to-do/"
      },
      {
        "question": "Is it an indoor waterpark during winter?",
        "answer": "No. The campground's indoor heated pool is a separate ordinary pool; the larger outdoor slides and interactive Water Playground use a seasonal and weather-dependent calendar.",
        "sourceUrl": "https://jellystoneguadalupe.com/things-to-do/"
      },
      {
        "question": "Can families visit without booking a cabin or RV site?",
        "answer": "The operator sells Day Camp Passes in peak season, subject to availability and applicable park access rules. The campground also offers overnight lodging and RV reservations.",
        "sourceUrl": "https://jellystoneguadalupe.com/things-to-do/"
      }
    ]
  },
  {
    "slug": "jellystone-hill-country-water-zone",
    "name": "Jellystone Park Hill Country Water Zone",
    "city": "Canyon Lake",
    "county": "Comal",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground stay or available day-camp passes",
    "summary": "The Canyon Lake campground has a water-play zone with slides, blasters and interactive features for younger guests.",
    "distinctiveNote": "The heated indoor swimming pool is not a full indoor water park; day passes and outdoor water playground follow separate access rules.",
    "officialUrl": "https://jellystonehillcountry.com/things-to-do",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "12915 FM 306, Canyon Lake, TX 78133",
    "visitorHighlights": [
      "The Hill Country Jellystone campground has a dinosaur-themed interactive Water Playground with spray cannons, slides, blasters and a hydrostorm water bucket.",
      "Two separate outdoor family pools operate on a seasonal schedule, while the resort's heated indoor pool is a distinct ordinary swimming pool.",
      "Outdoor Water Playground and Splash Pad are scheduled weekends only August 10–November 1, 2026, after daily summer operation.",
      "The heated indoor pool is advertised for all-season use and must not be treated as a year-round multi-slide waterpark.",
      "The waterpark complements nearby river-tubing shuttles, mini-golf and other campground activities that have their own admissions or reservation eligibility.",
      "Day Camp Passes are sometimes available for non-overnight visitors; the operator does not promise unrestricted daily access."
    ],
    "visitorFaqs": [
      {
        "question": "Is the dinosaur-themed water playground open on an October weekday?",
        "answer": "The 2026 operator schedule lists the interactive Water Playground for weekends only August 10–November 1, so ordinary weekday slides should not be promised in October.",
        "sourceUrl": "https://jellystonehillcountry.com/things-to-do"
      },
      {
        "question": "Does the campground have a year-round indoor waterpark?",
        "answer": "No. Its heated indoor swimming pool is advertised year-round, but the dinosaur water playground and two outdoor pools have their own separate seasonal schedules.",
        "sourceUrl": "https://jellystonehillcountry.com/things-to-do"
      },
      {
        "question": "Are Day Camp Passes offered to non-overnight guests?",
        "answer": "The resort says it sells Day Camp Passes, but availability and eligible attractions change by season. Visitors must check the chosen date before traveling.",
        "sourceUrl": "https://jellystonehillcountry.com/things-to-do"
      },
      {
        "question": "Where is the Hill Country Jellystone facility?",
        "answer": "The operator lists its camp-resort at 12915 Farm to Market 306 in Canyon Lake, Texas 78133. It is distinct from the Guadalupe River Jellystone location in Kerrville.",
        "sourceUrl": "https://jellystonehillcountry.com/things-to-do"
      }
    ]
  },
  {
    "slug": "jellystone-tyler-water-zone",
    "name": "Jellystone Park Tyler Water Zone",
    "city": "Tyler",
    "county": "Smith",
    "region": "East Texas",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground booking or capacity-limited visitor pass",
    "summary": "Tyler's Jellystone camp-resort offers a heated interactive water playground and family pool rather than large thrill-slide towers.",
    "distinctiveNote": "This is a smaller campground water-play complex; verify access to the seasonal water playground separately from cabin availability.",
    "officialUrl": "https://jellystonetyler.com/things-to-do",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5583 FM 16 East, Tyler, TX 75706",
    "visitorHighlights": [
      "The Tyler Jellystone campground has a smaller interactive Water Playground with water blasters, cannons and child-friendly slides, not destination-sized thrill towers.",
      "The campground's spacious swimming pool is a separate family attraction from the themed interactive playground.",
      "Additional camping amenities include a jumping pillow, mini-golf and laser tag with activity times distinct from water play.",
      "Cabin, RV and tent stays can be booked separately, and the campground publishes amenity access and seasonal limitations.",
      "An on-site Campfire Canteen provides food service; its dining hours should not be treated as water-slide operating hours."
    ],
    "visitorFaqs": [
      {
        "question": "Is Tyler Jellystone a big high-thrill waterpark?",
        "answer": "No. Its published visitor features center on a heated interactive children's Water Playground with small slides and water sprayers alongside a separate pool.",
        "sourceUrl": "https://jellystonetyler.com/things-to-do"
      },
      {
        "question": "Can families camp at this site instead of visiting for the day?",
        "answer": "Yes. The campground offers cabins, RV sites and tent accommodation. Access to the seasonal water-play equipment depends on the dates and selected stay or day-visit arrangements.",
        "sourceUrl": "https://jellystonetyler.com/things-to-do"
      },
      {
        "question": "Are other family activities included on site?",
        "answer": "The resort lists mini-golf, a jumping pillow and laser tag alongside the swimming pool and Water Playground. Each activity can have separate operating hours or age limits.",
        "sourceUrl": "https://jellystonetyler.com/things-to-do"
      },
      {
        "question": "Where is Tyler Jellystone Park?",
        "answer": "The operator lists 5583 Farm to Market 16 East, Tyler, Texas 75706, a different water-play facility from the Waller and Guadalupe River Jellystone resorts.",
        "sourceUrl": "https://jellystonetyler.com/things-to-do"
      }
    ]
  },
  {
    "slug": "rob-fleming-aquatic-center",
    "name": "Rob Fleming Aquatic Center",
    "city": "The Woodlands",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Township aquatic day tickets and seasonal passes",
    "summary": "The Woodlands township describes Rob Fleming as a resort-style water park with a 500-foot lazy river and a two-story flume slide.",
    "distinctiveNote": "The facility's 2026 aquatic season is over; check the township for 2027 opening dates rather than assuming sprayground hours apply.",
    "officialUrl": "https://www.thewoodlandsparks.com/Aquatics/Pools/Pool-Locations/Rob-Fleming-Aquatic-Center",
    "reviewedAt": "2026-10-17",
    "county": "Harris",
    "visitorAddress": "6055 Creekside Forest Dr., The Woodlands, TX 77389",
    "visitorHighlights": [
      "Rob Fleming Aquatic Center is the township-operated resort-style waterpark within Rob Fleming Park in The Woodlands.",
      "Its key attractions are a 500-foot lazy river, a two-story flume waterslide and a separate zero-depth-entry pool.",
      "The interactive family play structure includes a 150-gallon dumping bucket, while separate lap lanes support conventional swimming.",
      "The township advertises shaded seating and on-site concessions for summertime visitors rather than overnight resort stays.",
      "The township explicitly states all pools are closed for the remainder of the 2026 season; its unrelated splashgrounds remain open through October 31.",
      "The adjacent Rob Fleming Recreation Center at 6464 Creekside Forest Drive is a separate building from Rob Fleming Park's 6055 Creekside Forest Drive location."
    ],
    "visitorFaqs": [
      {
        "question": "Can we use Rob Fleming's lazy river this October?",
        "answer": "No. The Woodlands Township says all pools, including Rob Fleming Aquatic Center, are closed for the remainder of 2026. Its separate community spraygrounds remain available through October 31.",
        "sourceUrl": "https://www.thewoodlandsparks.com/Aquatics/Pools/Pool-Locations/Rob-Fleming-Aquatic-Center"
      },
      {
        "question": "What makes this park different from a basic pool?",
        "answer": "The township's official list includes a 500-foot lazy river, two-story flume slide, zero-depth family pool and play area with a 150-gallon dumping bucket.",
        "sourceUrl": "https://www.thewoodlandsparks.com/Aquatics/Pools/Pool-Locations/Rob-Fleming-Aquatic-Center"
      },
      {
        "question": "Where should families navigate to reach Rob Fleming Park?",
        "answer": "The township lists Rob Fleming Park at 6055 Creekside Forest Drive; the neighboring Rob Fleming Recreation Center has a different address at 6464 Creekside Forest Drive.",
        "sourceUrl": "https://www.thewoodlandsparks.com/Aquatics/Pools/Pool-Locations/Rob-Fleming-Aquatic-Center"
      },
      {
        "question": "Is this an overnight resort waterpark?",
        "answer": "No. Despite its resort-style layout, Rob Fleming is a municipal/township aquatics venue, with typical seasonal visitor admission and separate city recreation services.",
        "sourceUrl": "https://www.thewoodlandsparks.com/Aquatics/Pools/Pool-Locations/Rob-Fleming-Aquatic-Center"
      }
    ]
  },
  {
    "slug": "zenner-killeen",
    "name": "Zenner Family Aquatic Center",
    "city": "Killeen",
    "county": "Bell",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City-operated public water-play admission",
    "summary": "Killeen's Zenner aquatic facility features a slide tower, children's slides, water playground and beach-style zero-depth entry.",
    "distinctiveNote": "The posted 2026 season concluded on Labor Day; future slide use and admission require the city calendar.",
    "officialUrl": "https://killeentexas.gov/Facilities/Facility/Details/Zenner-Family-Aquatic-Center-10",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1800 E. Stan Schlueter Loop, Killeen, TX 76542",
    "visitorHighlights": [
      "Zenner Family Aquatic Center operates a 25-meter family pool with a diving board and a separate zero-depth entrance.",
      "Its named slide types include a bowl slide, plunge slide, open-flume racing slide and enclosed racing slide.",
      "Interactive water attractions include a spray playground, two smaller children's slides and a separate splash pad.",
      "The City of Killeen operated the park from May 23 through Labor Day in 2026, with Mondays generally closed.",
      "The facility supports private rental pavilions, shaded deck seating, family restrooms and organized adaptive swim activities.",
      "Outside food and drink are prohibited, and separate youth identification/supervision rules apply to unaccompanied teenagers."
    ],
    "visitorFaqs": [
      {
        "question": "Which slides are at Zenner Aquatic Center?",
        "answer": "Killeen officially lists a bowl slide, plunge slide, open and closed racing flumes, plus two children's playground slides and a splash pad.",
        "sourceUrl": "https://www.killeentexas.gov/Facilities/Facility/Details/Family-Aquatic-Center-10"
      },
      {
        "question": "Is Zenner open during the school year?",
        "answer": "The posted city aquatic calendar operated from May 23 through September 7, 2026. That season is complete; dates for any future public waterpark session must be checked.",
        "sourceUrl": "https://www.killeentexas.gov/Facilities/Facility/Details/Family-Aquatic-Center-10"
      },
      {
        "question": "Can a 14-year-old enter without a guardian?",
        "answer": "No. Killeen requires visitors ages 13 or 14 to be accompanied by an adult at least 18. Older teens may need a completed parent or guardian youth-ID form.",
        "sourceUrl": "https://www.killeentexas.gov/Facilities/Facility/Details/Family-Aquatic-Center-10"
      },
      {
        "question": "Does Killeen let families bring picnic coolers?",
        "answer": "No. The municipal facility's official rules prohibit outside food and drinks; the park advertises separate party pavilion rentals and visitor facilities.",
        "sourceUrl": "https://www.killeentexas.gov/Facilities/Facility/Details/Family-Aquatic-Center-10"
      }
    ]
  },
  {
    "slug": "marine-park-fort-worth",
    "name": "Marine Park Aquatic Center",
    "city": "Fort Worth",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public seasonal aquatic admission and group rentals",
    "summary": "A compact Fort Worth summer aquatic center with a large water slide, interactive water features and family swimming.",
    "distinctiveNote": "This is smaller than an all-day destination water park; its city-operated slide and splash-play sessions are seasonal.",
    "officialUrl": "https://www.fortworthtexas.gov/departments/parks/services/pools-and-aquatics/marine-park-pool-aquatic-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "303 NW 20th St., Fort Worth, TX 76106",
    "visitorHighlights": [
      "Marine Park Aquatic Center is a compact municipal family swim venue rather than a large destination waterpark.",
      "Its family pool features a substantial slide plus separate interactive water spray/play fixtures.",
      "The city lists daily public swim sessions only during summer, with Mondays closed during the main season.",
      "Fort Worth's posted 2026 pre-season was weekends in late May/early June, regular season June 9–August 9, and post-season weekends through Labor Day.",
      "Proper swimming attire is required and the city publishes daily public admission categories for children, adults and eligible discounted groups."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Marine Park's aquatic center?",
        "answer": "The City of Fort Worth lists it inside Marine Park at 303 Northwest 20th Street, Fort Worth, TX 76106. It is smaller than a regional all-day thrill waterpark.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/services/pools-and-aquatics/marine-park-pool-aquatic-center"
      },
      {
        "question": "Does Marine Park have a large water slide?",
        "answer": "Yes. Fort Worth identifies a recreational slide and interactive water features alongside general family swimming. It is not represented as a large multi-tower thrill complex.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/services/pools-and-aquatics/marine-park-pool-aquatic-center"
      },
      {
        "question": "Can families visit in October 2026?",
        "answer": "No regular October waterpark hours appear in the city's published season. Its 2026 seasonal operation ends after Labor Day, including the final post-season weekend.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/services/pools-and-aquatics/marine-park-pool-aquatic-center"
      },
      {
        "question": "Are Mondays ordinary open-swim days?",
        "answer": "No. The published regular municipal 2026 season is closed on Mondays, with scheduled public swims on other dates; preseason and postseason are primarily weekend operation.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/services/pools-and-aquatics/marine-park-pool-aquatic-center"
      }
    ]
  },
  {
    "slug": "adventure-cove-abilene",
    "name": "Adventure Cove Water Park",
    "city": "Abilene",
    "county": "Taylor",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public admission and seasonal city recreation passes",
    "summary": "Abilene's Adventure Cove has major body slides, a lazy river, beach entry and themed family water play.",
    "distinctiveNote": "The city's current operator page says Adventure Cove is closed for the remainder of 2026 and plans to welcome guests in 2027.",
    "officialUrl": "https://abilenetx.gov/384/Adventure-Cove",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2742 S. 9th St., Abilene, TX 79605",
    "visitorHighlights": [
      "Abilene's Adventure Cove combines zero-depth beach-entry play, a lazy river and taller body slides.",
      "The park sells different admission rates by rider height, distinguishing children below 48 inches from taller visitors.",
      "Guests need to measure at least 48 inches to use its main water slides.",
      "Everyone entering the facility pays admission, including non-swimming spectators; children under 15 require an accompanying adult.",
      "Only Coast Guard-approved flotation devices are allowed and outside food and drink are prohibited.",
      "The city website says the facility is closed for the remainder of the 2026 season and will return in 2027."
    ],
    "visitorFaqs": [
      {
        "question": "Can children shorter than 48 inches ride the slides?",
        "answer": "No. The official Abilene park rules prohibit guests below 48 inches from riding the larger slides; separate lower-height admission exists for other permitted play zones.",
        "sourceUrl": "https://abilenetx.gov/384/Adventure-Cove"
      },
      {
        "question": "Are children allowed to enter without an adult?",
        "answer": "Children below age 15 must be accompanied by an adult throughout the waterpark. The city says everyone entering needs a paid ticket, even if they do not intend to swim.",
        "sourceUrl": "https://abilenetx.gov/384/Adventure-Cove"
      },
      {
        "question": "Can we bring a picnic into Adventure Cove?",
        "answer": "No. The park prohibits outside food and beverages and only permits U.S. Coast Guard-approved flotation devices. It does provide on-site food service.",
        "sourceUrl": "https://abilenetx.gov/384/Adventure-Cove"
      },
      {
        "question": "Is Adventure Cove available in October 2026?",
        "answer": "No. The city has marked the park closed for the 2026 season and notes it expects to reopen in 2027. Check the city's next official dates for any future visit.",
        "sourceUrl": "https://abilenetx.gov/384/Adventure-Cove"
      }
    ]
  },
  {
    "slug": "stamper-aquatic-longview",
    "name": "Stamper Park Family Aquatic Center",
    "city": "Longview",
    "county": "Gregg",
    "region": "East Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public inexpensive day admission and seasonal city programs",
    "summary": "The newly built Longview park includes a flume slide, interactive play structure, children's slides and zero-entry swimming.",
    "distinctiveNote": "Stamper Park's aquatic facility debuted in 2026; the official schedule varies by day and can extend into September.",
    "officialUrl": "https://longviewtexas.gov/4447/Stamper-Park-Family-Aquatic-Center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "501 Fair St., Longview, TX 75601",
    "visitorHighlights": [
      "Stamper Park Family Aquatic Center opened in summer 2026 after replacement of the previous city pool.",
      "The municipal pool has a zero-depth beach entrance, with a maximum depth of four feet and an approximate capacity of 76,155 gallons.",
      "Attractions include one main water slide plus a family play structure with spray jets, climbing decks and a smaller slide.",
      "The shallow interactive zone includes bubblers, alongside basketball and volleyball areas in the main recreational pool.",
      "Support amenities include family changing rooms, cantilevered shade structures and seating areas.",
      "The city advertised weekend aquatic sessions through September 27, 2026, making October visits outside the listed season."
    ],
    "visitorFaqs": [
      {
        "question": "Is Stamper Park an older traditional lap pool?",
        "answer": "No. Longview rebuilt the aquatic center and opened it in summer 2026, adding a zero-entry leisure zone, water slide, play structure and spray features.",
        "sourceUrl": "https://longviewtexas.gov/4447/Stamper-Park-Family-Aquatic-Center"
      },
      {
        "question": "What is the depth range?",
        "answer": "The city lists a zero-depth shallow beach entry and a maximum pool depth of four feet; there are separate water play and recreational swimming portions.",
        "sourceUrl": "https://longviewtexas.gov/4447/Stamper-Park-Family-Aquatic-Center"
      },
      {
        "question": "Can guests play basketball or volleyball in the water?",
        "answer": "Yes. The pool plan includes water basketball and volleyball areas in its recreational-swim section, with a separate water slide and toddler-friendly spray zone.",
        "sourceUrl": "https://longviewtexas.gov/4447/Stamper-Park-Family-Aquatic-Center"
      },
      {
        "question": "Does Stamper Park operate water rides in October 2026?",
        "answer": "The city's 2026 calendar advertises weekend aquatic sessions only through September 27. Check for any special event rather than assuming regular October swimming.",
        "sourceUrl": "https://longviewtexas.gov/4447/Stamper-Park-Family-Aquatic-Center"
      }
    ]
  },
  {
    "slug": "sun-valley-lewisville",
    "name": "Sun Valley Aquatic Center",
    "city": "Lewisville",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public seasonal day admission; resident rate rules may apply",
    "summary": "Lewisville's Sun Valley aquatic park contains two looping slides, a lazy river, activity pool and tot area.",
    "distinctiveNote": "Sun Valley officially closed for the 2026 season and expects to return in 2027; its schedule differs from Lewisville's indoor recreation centers.",
    "officialUrl": "https://www.playlewisville.com/facilities/aquatics/sun-valley-aquatic-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "801 S. Valley Pkwy., Lewisville, TX 75067",
    "visitorHighlights": [
      "Sun Valley is a seasonal outdoor Lewisville family aquatic center behind Lewisville High School, distinct from the indoor Thrive recreation complex.",
      "The park features two double-loop waterslides, lazy river, lily-pad crossing play area and a separate toddler pool.",
      "A 25-yard competition pool is also offered, with a lap lane available on selected open-swim days.",
      "The site offers reserved Partybrella shaded gathering areas, along with a water-play leisure pool and vending facilities.",
      "Official 2026 operation ended by August 30 for regular public swimming, while special dog events may use separate dates.",
      "The operator requires proof of residency to access the Lewisville local rate, and twilight entry is separately priced."
    ],
    "visitorFaqs": [
      {
        "question": "Is Sun Valley the same facility as indoor Thrive?",
        "answer": "No. Sun Valley is the seasonal outdoor waterpark at 801 South Valley Parkway, whereas the Thrive indoor pools and slides are at a separate Lewisville recreation center.",
        "sourceUrl": "https://www.playlewisville.com/facilities/aquatics/sun-valley-aquatic-center"
      },
      {
        "question": "What are the waterpark attractions?",
        "answer": "The city lists two looping slides, a lazy river, a lily-pad activity zone, a toddler pool and a separate competition pool with lap swimming.",
        "sourceUrl": "https://www.playlewisville.com/facilities/aquatics/sun-valley-aquatic-center"
      },
      {
        "question": "Can families use the park in October?",
        "answer": "The operator says Sun Valley is closed for the 2026 season and looks ahead to 2027. The site's old summer schedule is not a current operating calendar.",
        "sourceUrl": "https://www.playlewisville.com/facilities/aquatics/sun-valley-aquatic-center"
      },
      {
        "question": "Is Lewisville resident admission cheaper?",
        "answer": "Yes. The park lists separate resident and nonresident categories and states that local residency must be proved to obtain the resident rate.",
        "sourceUrl": "https://www.playlewisville.com/facilities/aquatics/sun-valley-aquatic-center"
      }
    ]
  },
  {
    "slug": "lakeway-swim-center",
    "name": "Lakeway Swim Center Leisure Water Park",
    "city": "Lakeway",
    "county": "Travis",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public daily admission with separate resident discounts",
    "summary": "Lakeway's recreation pool includes two large body slides, a children's frog slide, lily pads and zero-depth play area.",
    "distinctiveNote": "As of October 2026, the family leisure pool and water slides are seasonally closed even though lap swimming continues.",
    "officialUrl": "https://www.lakeway-tx.gov/84/Swim-Center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "3103 Lakeway Blvd., Lakeway, TX 78738",
    "visitorHighlights": [
      "The Lakeway Swim Center combines a year-round heated six-lane lap pool with a distinct seasonal family leisure pool.",
      "The seasonal family pool has a zero-depth entrance, a frog-themed slide, lily-pad crossing features and two larger body slides.",
      "Outdoor amenities include tiered sunning space, shade umbrellas, picnic tables, locker areas and showers.",
      "The City of Lakeway's October 2026 advisory says ONLY lap swimming is available; the leisure pool and Frog Slide area are closed for the season.",
      "The city separately lists swim lessons and water aerobics; those programs should not be mistaken for an open waterpark ticket."
    ],
    "visitorFaqs": [
      {
        "question": "Can visitors use the Frog Slide in October 2026?",
        "answer": "No. The City of Lakeway's current notice says only lap swimming is allowed and the leisure pool, including the Frog Slide area, is closed for the season.",
        "sourceUrl": "https://www.lakeway-tx.gov/84/Swim-Center"
      },
      {
        "question": "Which portions of the facility operate year-round?",
        "answer": "Lakeway identifies a heated six-lane 25-yard lap pool that operates year-round. Its separate zero-depth family pool, lily pads and waterslides have a seasonal calendar.",
        "sourceUrl": "https://www.lakeway-tx.gov/84/Swim-Center"
      },
      {
        "question": "Where is the swim center?",
        "answer": "The city lists Lakeway Swim Center at 3103 Lakeway Boulevard, Lakeway, Texas 78738. Check the current aquatics calendar rather than navigating to a separate sports center.",
        "sourceUrl": "https://www.lakeway-tx.gov/84/Swim-Center"
      },
      {
        "question": "Can families plan a full waterpark day in winter?",
        "answer": "No. The city's fall notice limits use to lap swimming, which is not equivalent to its seasonal waterslide and leisure-pool experience. Verify the summer reopening date with the operator.",
        "sourceUrl": "https://www.lakeway-tx.gov/84/Swim-Center"
      }
    ]
  },
  {
    "slug": "el-paso-camp-cohen",
    "name": "Camp Cohen Water Park",
    "city": "El Paso",
    "county": "El Paso",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City water-park general admission or neighborhood pass",
    "summary": "The city's Camp Cohen location is one of four themed El Paso Water Parks, not a second name for Wet 'N' Wild Waterworld.",
    "distinctiveNote": "Find it at 9700 Gateway North Boulevard and select the correct city-park admission product and season.",
    "officialUrl": "https://epwaterparks.com/camp-cohen.php",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "9700 Gateway N Blvd., El Paso, TX",
    "visitorHighlights": [
      "The Falls offers three distinctly named flumes: Lightning Bolt, Monsoon Plunge and Thunder Run.",
      "Rain Roamer current channel and Poppy Island interactive playground connect to the Shallow Waters pool.",
      "Rapid Waters recreation pool includes the Warrior Wall climbing challenge and an adjacent deep-water drop.",
      "Wild Lagoon offers a zero-entry children's water-play area separate from the big slides."
    ],
    "visitorFaqs": [
      {
        "question": "What slides are at Camp Cohen?",
        "answer": "The Falls tower lists three slides: enclosed Lightning Bolt and Monsoon Plunge plus open-air Thunder Run. Consult the operator for exact rider restrictions and any temporary closures.",
        "sourceUrl": "https://epwaterparks.com/camp-cohen.php"
      },
      {
        "question": "Where do visitors enter Camp Cohen Water Park?",
        "answer": "The official operator lists the Camp Cohen Water Park facility at 9700 Gateway N Blvd., El Paso, TX. El Paso operates four separate themed waterpark locations with different attractions and entrances, so select this exact park when navigating.",
        "sourceUrl": "https://epwaterparks.com/camp-cohen.php"
      },
      {
        "question": "Can children six or younger swim without an accompanying adult?",
        "answer": "No. El Paso Water Parks requires an adult to stay within arm's reach of children age six or younger, and those children must wear a properly fitted Coast Guard-approved Type II or III life jacket.",
        "sourceUrl": "https://epwaterparks.com/camp-cohen.php"
      },
      {
        "question": "Can we rent shade and bring a cooler?",
        "answer": "The operator advertises separate paid cabana and cooler-pass products rather than including them in ordinary admission. Confirm the park's current day-specific availability and the policy before arrival.",
        "sourceUrl": "https://epwaterparks.com/camp-cohen.php"
      }
    ]
  },
  {
    "slug": "el-paso-chapoteo",
    "name": "Chapoteo Water Park",
    "city": "El Paso",
    "county": "El Paso",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City general admission, seasonal passes, and special-event tickets",
    "summary": "Chapoteo is its own El Paso city water park with slides, family play and an attraction calendar separate from the other municipal branches.",
    "distinctiveNote": "The city's published entrance is 1225 Giles Road and special events may require tickets that do not transfer between parks.",
    "officialUrl": "https://epwaterparks.com/chapoteo.php",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1225 Giles Rd., El Paso, TX",
    "visitorHighlights": [
      "Calavera Plunge offers enclosed racing flumes distinct from the other three municipal water parks.",
      "Chalupa Springs leisure pool is linked to the Rio Sereno current channel and Sirenita Reef play structure.",
      "Lago Azul pool includes a climbing challenge named El Valiente above a 12.5-foot deep-water area.",
      "Lagarto Lagoon provides zero-depth entry and kid-focused splash features, separate from the larger rides."
    ],
    "visitorFaqs": [
      {
        "question": "What makes Chapoteo different from Camp Cohen?",
        "answer": "Chapoteo has its own Calavera Plunge slide set, Chalupa Springs leisure pool, Rio Sereno channel and Lagarto Lagoon, rather than Camp Cohen's separate Falls and Wild Lagoon attractions.",
        "sourceUrl": "https://epwaterparks.com/chapoteo.php"
      },
      {
        "question": "Where do visitors enter Chapoteo Water Park?",
        "answer": "The official operator lists the Chapoteo Water Park facility at 1225 Giles Rd., El Paso, TX. El Paso operates four separate themed waterpark locations with different attractions and entrances, so select this exact park when navigating.",
        "sourceUrl": "https://epwaterparks.com/chapoteo.php"
      },
      {
        "question": "Can children six or younger swim without an accompanying adult?",
        "answer": "No. El Paso Water Parks requires an adult to stay within arm's reach of children age six or younger, and those children must wear a properly fitted Coast Guard-approved Type II or III life jacket.",
        "sourceUrl": "https://epwaterparks.com/chapoteo.php"
      },
      {
        "question": "Can we rent shade and bring a cooler?",
        "answer": "The operator advertises separate paid cabana and cooler-pass products rather than including them in ordinary admission. Confirm the park's current day-specific availability and the policy before arrival.",
        "sourceUrl": "https://epwaterparks.com/chapoteo.php"
      }
    ]
  },
  {
    "slug": "el-paso-lost-kingdom",
    "name": "Lost Kingdom Water Park",
    "city": "El Paso",
    "county": "El Paso",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City day admission or qualifying location/City Wave passes",
    "summary": "Lost Kingdom is a separate El Paso city-operated water park with its own adventure theme, ticketing and accessible facilities.",
    "distinctiveNote": "Use the operator's entrance at 6001 Hughey Drive; the city runs four distinct locations with different calendars.",
    "officialUrl": "https://epwaterparks.com/lost-kingdom.php",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6001 Hughey Dr., El Paso, TX",
    "visitorHighlights": [
      "Temple Drop has two flumes, one enclosed and one open, with access from a standalone water-slide tower.",
      "The Forgotten Cenote leisure pool has its own family slide and access to the Turtle Tides current channel.",
      "Mayan Lanes recreation pool has The Ruins climbing-wall challenge over its deep-water play area.",
      "Macaw Lagoon is a separate zero-depth interactive splash pool for young visitors."
    ],
    "visitorFaqs": [
      {
        "question": "What are Lost Kingdom's main attractions?",
        "answer": "Lost Kingdom's operator names Temple Drop, the Forgotten Cenote family slide, Turtle Tides, The Ruins wall and Macaw Lagoon. These are location-specific, not a shared chain-wide ride list.",
        "sourceUrl": "https://epwaterparks.com/lost-kingdom.php"
      },
      {
        "question": "Where do visitors enter Lost Kingdom Water Park?",
        "answer": "The official operator lists the Lost Kingdom Water Park facility at 6001 Hughey Dr., El Paso, TX. El Paso operates four separate themed waterpark locations with different attractions and entrances, so select this exact park when navigating.",
        "sourceUrl": "https://epwaterparks.com/lost-kingdom.php"
      },
      {
        "question": "Can children six or younger swim without an accompanying adult?",
        "answer": "No. El Paso Water Parks requires an adult to stay within arm's reach of children age six or younger, and those children must wear a properly fitted Coast Guard-approved Type II or III life jacket.",
        "sourceUrl": "https://epwaterparks.com/lost-kingdom.php"
      },
      {
        "question": "Can we rent shade and bring a cooler?",
        "answer": "The operator advertises separate paid cabana and cooler-pass products rather than including them in ordinary admission. Confirm the park's current day-specific availability and the policy before arrival.",
        "sourceUrl": "https://epwaterparks.com/lost-kingdom.php"
      }
    ]
  },
  {
    "slug": "el-paso-oasis",
    "name": "Oasis Water Park",
    "city": "El Paso",
    "county": "El Paso",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City water-park tickets or location/City Wave passes",
    "summary": "Oasis is the far-east El Paso city water-park location, offering a themed water-slide outing in the Beast-area complex.",
    "distinctiveNote": "The operator lists 13501 Jason Crandall Drive as the address; compare summer opening hours with the nearby natatorium separately.",
    "officialUrl": "https://epwaterparks.com/oasis",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "13501 Jason Crandall Dr., El Paso, TX",
    "visitorHighlights": [
      "Flash Flood Rush is an on-site wave-surfing simulator with bodyboarding as well as surf-style riding.",
      "Hueco Plunge is the park's dual slide tower with two winding water flumes.",
      "Gravity Challenge is the park's named water-climbing wall; the adjacent Sunset Lagoon connects to Driftwood Channel.",
      "Rain Puddle Kiddie Pool offers zero-depth children's play, while Adventure Point serves a different younger-child group."
    ],
    "visitorFaqs": [
      {
        "question": "Does Oasis have a surfing attraction?",
        "answer": "Yes. Oasis lists Flash Flood Rush, a powered artificial wave ride where guests can practice bodyboarding or surfing subject to the venue's specific ride requirements.",
        "sourceUrl": "https://epwaterparks.com/oasis"
      },
      {
        "question": "Where do visitors enter Oasis Water Park?",
        "answer": "The official operator lists the Oasis Water Park facility at 13501 Jason Crandall Dr., El Paso, TX. El Paso operates four separate themed waterpark locations with different attractions and entrances, so select this exact park when navigating.",
        "sourceUrl": "https://epwaterparks.com/oasis"
      },
      {
        "question": "Can children six or younger swim without an accompanying adult?",
        "answer": "No. El Paso Water Parks requires an adult to stay within arm's reach of children age six or younger, and those children must wear a properly fitted Coast Guard-approved Type II or III life jacket.",
        "sourceUrl": "https://epwaterparks.com/oasis"
      },
      {
        "question": "Can we rent shade and bring a cooler?",
        "answer": "The operator advertises separate paid cabana and cooler-pass products rather than including them in ordinary admission. Confirm the park's current day-specific availability and the policy before arrival.",
        "sourceUrl": "https://epwaterparks.com/oasis"
      }
    ]
  },
  {
    "slug": "hurricane-harbor-san-antonio",
    "name": "Six Flags Hurricane Harbor San Antonio",
    "city": "San Antonio",
    "county": "Bexar",
    "region": "Hill Country",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Separate water-park add-on or eligible Six Flags pass; confirm current ticket terms",
    "summary": "Hurricane Harbor at Six Flags Fiesta Texas is a large water park with a Texas-shaped wave pool, multi-slide complexes and a lazy river.",
    "distinctiveNote": "This water-park section was formerly called White Water Bay; it is distinct from Aquatica San Antonio. Fiesta Texas theme-park tickets do not all include water-park access.",
    "officialUrl": "https://www.sixflags.com/fiestatexas/water-park-information",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "17000 IH-10 West, San Antonio, TX 78257",
    "visitorHighlights": [
      "Hurricane Harbor San Antonio is a waterpark section of Six Flags Fiesta Texas, previously known as White Water Bay, and not the separately ticketed Aquatica park.",
      "The park features a Texas-shaped wave pool, slide towers, activity pools and a separate lazy-river attraction.",
      "The Fiesta Texas amusement park operates outside the waterpark's seasonal dates; theme-park opening does not establish that Hurricane Harbor's pools are open.",
      "Waterpark admission and eligible season-pass access vary by ticket level, so visitors must check the exact Fiesta Texas pass entitlement.",
      "Official waterpark access information describes optional cabanas, life jackets and locker rentals, with individual water slides operating under distinct rider restrictions.",
      "The official waterpark-information page contains historical operating-date references; visitors should instead check the live current calendar for future seasonal openings."
    ],
    "visitorFaqs": [
      {
        "question": "Is Hurricane Harbor the same place as Aquatica San Antonio?",
        "answer": "No. Hurricane Harbor is inside Six Flags Fiesta Texas at 17000 IH-10 West, whereas Aquatica is a separate SeaWorld waterpark in San Antonio with its own ticket products.",
        "sourceUrl": "https://www.sixflags.com/fiestatexas/water-park-information"
      },
      {
        "question": "Can guests use the waterpark whenever Fiesta Texas is open?",
        "answer": "No. The amusement park can be open when the seasonal Hurricane Harbor waterpark is not operating. Verify the exact date on the current waterpark calendar.",
        "sourceUrl": "https://www.sixflags.com/fiestatexas/water-park-information"
      },
      {
        "question": "Does an ordinary Fiesta Texas ticket include all waterpark features?",
        "answer": "Not necessarily. Six Flags sells several admission/pass tiers and waterpark access may require a qualifying pass or added admission. Check your specific ticket benefits before travel.",
        "sourceUrl": "https://www.sixflags.com/fiestatexas/water-park-information"
      },
      {
        "question": "Which physical address should visitors enter?",
        "answer": "Six Flags publishes 17000 Interstate Highway 10 West, San Antonio, Texas 78257 for its Fiesta Texas entrance; Hurricane Harbor is within that park.",
        "sourceUrl": "https://www.sixflags.com/fiestatexas/directions"
      }
    ]
  },
  {
    "slug": "thrive-indoor-lewisville",
    "name": "Thrive Indoor Aquatics Water Park",
    "city": "Lewisville",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "Thrive recreation-center membership or qualifying public day pass",
    "summary": "Lewisville's Thrive recreation center features an indoor zero-entry leisure pool, indoor lazy river and two three-story enclosed water slides.",
    "distinctiveNote": "Slides require riders at least 48 inches tall and operate on a separate daily schedule that can be adjusted for lifeguard staffing or classes; Thrive is not the Sun Valley outdoor park.",
    "officialUrl": "https://www.lewisvillethrive.com/aquatics",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1950 S. Valley Pkwy., Lewisville, TX 75067",
    "visitorHighlights": [
      "Thrive Aquatics is Lewisville's indoor recreation water-play center, distinct from the separate Sun Valley outdoor aquatic complex.",
      "The indoor leisure pool has zero-depth water entry, a current channel and active toddler spray/play features.",
      "Two enclosed waterslides descend from a three-story slide tower; riders must be at least 48 inches tall.",
      "Thrive's school-year operating hours divide lap pools, leisure/play structure and the major slides into different time blocks.",
      "Weekday afternoon slide sessions depend on qualified lifeguard coverage and may close without advance notice for safety or staffing.",
      "The operator's 2026–27 school-year program schedule runs from August 10 through May 21, 2027."
    ],
    "visitorFaqs": [
      {
        "question": "Are Thrive's two large slides open whenever the pool is open?",
        "answer": "No. Thrive publishes a separate slide operating schedule and explicitly says slides depend on lifeguard availability, guest numbers and other safety factors.",
        "sourceUrl": "https://www.lewisvillethrive.com/aquatics"
      },
      {
        "question": "What is the height requirement for the slide tower?",
        "answer": "The operator lists two enclosed slides roughly three stories high, with a minimum rider height of 48 inches for both attractions.",
        "sourceUrl": "https://www.lewisvillethrive.com/aquatics"
      },
      {
        "question": "Is this the same as Lewisville Sun Valley waterpark?",
        "answer": "No. Thrive is an indoor recreation center at 1950 South Valley Parkway, distinct from the city's outdoor Sun Valley Aquatic Center and its separate summer calendar.",
        "sourceUrl": "https://www.lewisvillethrive.com/aquatics"
      },
      {
        "question": "Does the indoor leisure pool have a lazy river?",
        "answer": "Yes. The recreation center lists an indoor current channel, a zero-entry pool and separate water play structures; exact availability depends on its scheduled pool and class hours.",
        "sourceUrl": "https://www.lewisvillethrive.com/aquatics"
      }
    ]
  },
  {
    "slug": "sisters-mercy-laredo",
    "name": "Sisters of Mercy Water Park",
    "city": "Laredo",
    "county": "Webb",
    "region": "South Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Laredo municipal aquatic admission with limited seasonal public sessions",
    "summary": "Laredo's Sisters of Mercy Water Park is a municipal facility with a lazy river, two water slides, a main pool and a children's pool.",
    "distinctiveNote": "Visit Laredo identifies this park at 2201 Zacatecas Street; the city listed it in its 2026 summer pool season with closed Mondays and separate session schedules.",
    "officialUrl": "https://visitlaredo.com/directory/sisters-of-mercy-water-park/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2201 Zacatecas St., Laredo, TX 78046",
    "visitorHighlights": [
      "Visit Laredo lists Sisters of Mercy Water Park at 2201 Zacatecas Street on Laredo's south side.",
      "The municipal facility has two substantial waterslides and a lazy river, alongside an ordinary swimming pool.",
      "A separate smaller children's pool serves families who do not need the slides or lazy-river attractions.",
      "Visit Laredo publishes a city destination listing and operator telephone contact; current municipal session times must be checked directly before traveling.",
      "The 2026 swim season was scheduled separately from other Laredo outdoor pools, with Mondays normally closed."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Sisters of Mercy Water Park?",
        "answer": "Visit Laredo lists this named park at 2201 Zacatecas Street, Laredo, Texas 78046. It is a municipal family attraction on the south side of the city.",
        "sourceUrl": "https://visitlaredo.com/directory/sisters-of-mercy-water-park/"
      },
      {
        "question": "What aquatic attractions does it have?",
        "answer": "The official city tourism directory identifies a main pool, separate smaller children's pool, lazy river and two substantial waterslides.",
        "sourceUrl": "https://visitlaredo.com/directory/sisters-of-mercy-water-park/"
      },
      {
        "question": "Does it have the same schedule as all city pools?",
        "answer": "No. Laredo's parks and aquatics sessions can vary by venue and season. Check current city aquatics schedules and the tourism directory's operator phone before visiting.",
        "sourceUrl": "https://visitlaredo.com/directory/sisters-of-mercy-water-park/"
      }
    ]
  },
  {
    "slug": "plano-carpenter-park-indoor",
    "name": "Carpenter Park Indoor Water Play",
    "city": "Plano",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "Recreation center daily admission or Plano recreation membership",
    "summary": "Carpenter Park Recreation Center has an indoor current channel, a toddler play area with spray features, and a large water slide.",
    "distinctiveNote": "Plano's fall 2026 schedule separates current-channel access from the slide and play-area hours; the indoor pool is an alternative to the city's summer-only Jack Carter Pool.",
    "officialUrl": "https://www.plano.gov/recreation-centers-pools",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6701 Coit Rd., Plano, TX 75024",
    "visitorHighlights": [
      "Carpenter Park Recreation Center has an indoor current channel, recreation pool, waterslide and a younger-child water-play area.",
      "Plano's fall 2026 calendar distinguishes current-channel operation from its separately scheduled play-area and slide sessions.",
      "On Saturdays and Sundays the city posts combined open-swim periods with river, water-play features and slides instead of uninterrupted weekday availability.",
      "Indoor pool lap-swim sessions may be closed for scheduled programs even when the recreation center building itself is open.",
      "The City of Plano operates Carpenter as a membership/daily admission recreation center; it is not an overnight resort."
    ],
    "visitorFaqs": [
      {
        "question": "Does Carpenter Park's lazy river operate throughout all business hours?",
        "answer": "No. Plano's fall 2026 calendar gives the current channel specific hours, and different times for the play area and slide; weekdays can include programming closures.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "When can families expect the full indoor water-play features?",
        "answer": "The City of Plano posts combined open swim with the river, play features and slides on weekend afternoons, subject to special events or maintenance.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "Where is Carpenter Park Recreation Center?",
        "answer": "The city lists Carpenter Park Recreation Center at 6701 Coit Road, Plano, Texas 75024, a distinct facility from Oak Point and Tom Muehlenbeck recreation centers.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools"
      },
      {
        "question": "Does the recreation center being open mean all slides are operating?",
        "answer": "No. The city publishes independent pool and slide hours, and pool lanes may be unavailable for classes. Confirm the specific waterplay session before traveling.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      }
    ]
  },
  {
    "slug": "plano-oak-point-aquatic",
    "name": "Oak Point Recreation Center Aquatics",
    "city": "Plano",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Both",
    "kind": "Indoor public park",
    "admission": "Recreation center daily admission or qualifying city recreation pass",
    "summary": "Oak Point has an indoor family-leisure pool with a slide and a separate seasonal outdoor aquatic area with a wave pool and play tower.",
    "distinctiveNote": "The City of Plano posted pool maintenance October 15–18, 2026; confirm indoor pool reopening and outdoor seasonal hours before visiting.",
    "officialUrl": "https://www.plano.gov/oak-point-recreation-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6000 Jupiter Rd., Plano, TX 75074",
    "visitorHighlights": [
      "Oak Point Recreation Center provides an indoor leisure/swimming pool and a separate seasonal outdoor aquatic area.",
      "The outdoor aquatics section, including its summertime play features, is listed closed for the 2026 season.",
      "The City of Plano announced the indoor pool closed October 15–18, 2026 for maintenance, so the center's general building hours do not guarantee pool access.",
      "Special sensory-friendly swim sessions are separately scheduled at the indoor pool, not a normal outdoor-waterpark ticket.",
      "Plano maintains different resident and nonresident daily admission rates, with memberships available for recreation centers."
    ],
    "visitorFaqs": [
      {
        "question": "Can we swim at Oak Point during October 15–18, 2026?",
        "answer": "The City's current Oak Point notice says the pool is closed October 15 through October 18 for maintenance; confirm reopening before making the trip.",
        "sourceUrl": "https://www.plano.gov/oak-point-recreation-center"
      },
      {
        "question": "Is the outdoor wave and water-play area open this October?",
        "answer": "No. Plano lists Oak Point's outdoor pool closed for the 2026 season; it has different dates from the indoor pool and its fall leisure-swim schedule.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "What is the Oak Point entrance address?",
        "answer": "The City of Plano lists Oak Point Recreation Center at 6000 Jupiter Road, Plano, Texas 75074. It is a separate venue from Carpenter Park and Tom Muehlenbeck.",
        "sourceUrl": "https://www.plano.gov/oak-point-recreation-center"
      },
      {
        "question": "Are there separate activities for sensory-sensitive swimmers?",
        "answer": "Yes. The city's aquatics calendar schedules selected sensory swim sessions at Oak Point's indoor pool, with regular admission rules; these are not daily general waterpark sessions.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      }
    ]
  },
  {
    "slug": "plano-tom-muehlenbeck",
    "name": "Tom Muehlenbeck Recreation Center Water Play",
    "city": "Plano",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Both",
    "kind": "Indoor public park",
    "admission": "Plano recreation center daily admission or qualifying membership",
    "summary": "Tom Muehlenbeck Recreation Center has an indoor leisure pool with slide, vortex and current channel plus an outdoor seasonal aquatic complex with three slides.",
    "distinctiveNote": "The outdoor section has a separate summer operating season; indoor drop-slide and flume-slide hours also differ from regular lap and leisure swims.",
    "officialUrl": "https://www.plano.gov/recreation-centers-pools",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5801 W. Parker Rd., Plano, TX 75093",
    "visitorHighlights": [
      "Tom Muehlenbeck Recreation Center has an indoor leisure pool with a current channel, vortex and slide, plus seasonal outdoor water-play facilities.",
      "The outdoor waterpark area's three slides have a distinct summer schedule, while indoor play and slide sessions continue at selected school-year hours.",
      "Plano's October 2026 schedule identifies the outdoor pool as closed for the season despite regular indoor recreation center opening hours.",
      "Weekday indoor leisure sessions are divided between adults-only swim and family open swim, so not every posted pool hour is child-slide time.",
      "Toddler-oriented summer splash sessions on the outdoor features are separate from regular public recreation swim."
    ],
    "visitorFaqs": [
      {
        "question": "Can kids use the outdoor slides in October?",
        "answer": "No. The city identifies Tom Muehlenbeck's outdoor pool closed for 2026, although the indoor leisure pool still has selected fall opening sessions.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "Are the indoor slides open when the center opens at 5 AM?",
        "answer": "Not automatically. Plano posts a separate indoor leisure-pool schedule and maintains adult-only periods distinct from family play and slide times.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "What is the street address of this center?",
        "answer": "The City of Plano lists Tom Muehlenbeck Recreation Center at 5801 West Parker Road, Plano, Texas 75093, distinct from the Carpenter and Oak Point facilities.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools"
      },
      {
        "question": "Are toddler sessions the same as public family open swim?",
        "answer": "No. The operator advertised specially scheduled outdoor Tot Splash Time for young children during summer, with ordinary daily admission rules but separate visit hours.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      }
    ]
  },
  {
    "slug": "plano-jack-carter",
    "name": "Jack Carter Pool",
    "city": "Plano",
    "county": "Collin",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Plano city seasonal pool admission with resident and nonresident rates",
    "summary": "Jack Carter's large outdoor water recreation complex features a dual-rider tube slide, body slide, lazy river, surfing simulator and deep-water pool.",
    "distinctiveNote": "The City of Plano lists the outdoor facility as closed for the 2026 season; check its dedicated recreation schedule before planning for summer 2027.",
    "officialUrl": "https://www.plano.gov/parks-facilities-rentals",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2601 Pleasant Valley Dr., Plano, TX 75023",
    "visitorHighlights": [
      "Jack Carter Pool is a distinct outdoor Plano waterpark with a lazy river, a separate surf simulator and a tot play pool.",
      "The venue's outdoor attractions include body and double-rider tube slides, rather than just a competition lap pool.",
      "The pool has on-site concessions and other family recreation amenities under city management.",
      "Plano lists Jack Carter Pool closed for the 2026 season as of October, unlike its year-round indoor recreation centers.",
      "The city uses separate summer pool pricing and resident/nonresident admission categories; it is not covered by assuming a recreation center is currently open."
    ],
    "visitorFaqs": [
      {
        "question": "Can someone visit Jack Carter's lazy river during October?",
        "answer": "No. Plano's current fall pool bulletin lists Jack Carter Outdoor Pool closed for the season, even though other city indoor recreation pools operate during fall.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      },
      {
        "question": "What activities make Jack Carter more than a lap pool?",
        "answer": "The city lists a lazy river, surf simulator, tot pool and large slides, alongside ordinary swimming and concessions at this distinct outdoor attraction.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools"
      },
      {
        "question": "Where is Jack Carter Pool?",
        "answer": "The City of Plano locates Jack Carter Pool at 2601 Pleasant Valley Drive in Plano, Texas, a separate location from the Oak Point, Carpenter and Tom Muehlenbeck recreation centers.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools"
      },
      {
        "question": "Are Jack Carter tickets valid at every Plano indoor pool?",
        "answer": "Do not assume so. Plano operates Jack Carter as an outdoor seasonal pool and sells admission under city aquatics programs, with different schedules and facility rules by site.",
        "sourceUrl": "https://www.plano.gov/recreation-centers-pools?contentId=99bed988-7d28-4fac-bb66-78a9e7284b1f"
      }
    ]
  },
  {
    "slug": "jellystone-wichita-falls",
    "name": "Jellystone Park Wichita Falls Water Playground",
    "city": "Wichita Falls",
    "county": "Wichita",
    "region": "North Texas",
    "setting": "Outdoor",
    "kind": "Campground water park",
    "admission": "Campground reservation or eligible day-group program; check access rules",
    "summary": "Jellystone Park Wichita Falls offers a water playground with two larger slides, two kiddie slides and a tipping water bucket, alongside three outdoor pools.",
    "distinctiveNote": "The operator's 2026 seasonal calendar distinguishes peak water-play hours from campground operations that remain open throughout the year.",
    "officialUrl": "https://wichitafallsjellystonepark.com/things-to-do",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "14145 U.S. 287 North, Wichita Falls, TX 76310",
    "visitorHighlights": [
      "The Wichita Falls Jellystone campground's Water Playground features two larger slides, two smaller child slides and an interactive tipping water bucket.",
      "Three outdoor pools provide a distinct swimming option from the Water Playground's spray cannons and slides.",
      "Non-aquatic activities include fishing at a pond, mini golf and a jumping pillow as separate campground recreation options.",
      "The operator offers more than one lodging format, including RV campsites and cabins, with seasonal availability for water amenities.",
      "Day-camp activity access and attraction hours must be checked for the intended visit, as campground operations continue outside the summer water-play season."
    ],
    "visitorFaqs": [
      {
        "question": "Are there waterslides for different ages?",
        "answer": "The resort describes two larger waterslides and two kiddie slides in its interactive Water Playground, which also has spray blasters, cannons and a tipping bucket.",
        "sourceUrl": "https://wichitafallsjellystonepark.com/things-to-do"
      },
      {
        "question": "Are there swimming pools separate from the water playground?",
        "answer": "Yes. The official Wichita Falls Jellystone listing describes three outdoor swimming pools in addition to the themed Water Playground and water slides.",
        "sourceUrl": "https://wichitafallsjellystonepark.com/things-to-do"
      },
      {
        "question": "Can campers do things besides swim?",
        "answer": "The park lists mini-golf, a fishing pond, jumping pillows and themed family activities. Dates for particular activities may differ from the water-play timetable.",
        "sourceUrl": "https://wichitafallsjellystonepark.com/things-to-do"
      },
      {
        "question": "Where is the Wichita Falls campground waterpark?",
        "answer": "The operator lists 14145 U.S. Highway 287 North, Wichita Falls, Texas 76310. It is a campground water-play zone, not a separately situated municipal waterpark.",
        "sourceUrl": "https://wichitafallsjellystonepark.com/things-to-do"
      }
    ]
  },
  {
    "slug": "brenham-blue-bell-leisure",
    "name": "Blue Bell Aquatic Center Leisure Water Park",
    "city": "Brenham",
    "county": "Washington",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public daily aquatic-center admission and city-resident discounts",
    "summary": "Brenham's Blue Bell Aquatic Center has an ice-cream-themed outdoor leisure pool, Big Yellow Slide, Sundae Slide and interactive children's water play.",
    "distinctiveNote": "The two indoor pools are for competition and therapy, not an indoor water park; the outdoor leisure pool runs seasonally from Memorial Day to Labor Day.",
    "officialUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/blue_bell_aquatic_center.php",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1800 E. Tom Green St., Brenham, TX 77833",
    "visitorHighlights": [
      "Brenham's Blue Bell Aquatic Center has three distinct pools: year-round indoor competition and therapy pools, and a separate seasonal outdoor leisure waterpark.",
      "The outdoor ice-cream-themed family leisure pool includes Big Yellow Slide, Sundae Slide and a Popsicle Walk water-crossing feature.",
      "The Big Yellow Slide normally requires a 48-inch minimum rider height; shorter qualified riders may be screened with an on-site lifeguard swim test under city rules.",
      "The outdoor family leisure pool follows a summer Memorial Day-through-Labor Day schedule rather than sharing the indoor pool's year-round operation.",
      "Food and beverages are subject to the center's poolside rules; the city directs guests to its visitor policies and permit requirements for private parties."
    ],
    "visitorFaqs": [
      {
        "question": "Can visitors ride the outdoor slides in October?",
        "answer": "No. Brenham's indoor competition and therapy pools operate through the year, but the waterpark's separate outdoor leisure pool normally closes after Labor Day.",
        "sourceUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/blue_bell_aquatic_center.php"
      },
      {
        "question": "Does the Big Yellow Slide have a height limit?",
        "answer": "The official city venue details specify a 48-inch minimum for Big Yellow Slide, with a supervised swimming-ability qualification route for some shorter children under current staff rules.",
        "sourceUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/blue_bell_aquatic_center.php"
      },
      {
        "question": "Are the competition pool and the waterpark the same?",
        "answer": "No. Blue Bell Aquatic Center operates an indoor competition pool, an indoor therapy pool and a distinct outdoor ice-cream-themed leisure area with slides and water play.",
        "sourceUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/blue_bell_aquatic_center.php"
      },
      {
        "question": "What is the exact visitor address?",
        "answer": "The City of Brenham lists Blue Bell Aquatic Center at 1800 East Tom Green Street, Brenham, Texas 77833. Check the outdoor leisure area's separate dates before arriving.",
        "sourceUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/blue_bell_aquatic_center.php"
      }
    ]
  },
  {
    "slug": "quillian-noahs-ark-houston",
    "name": "Quillian Center Noah's Ark Pool",
    "city": "Houston",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Community water park",
    "admission": "Quillian Center seasonal public swim admission or private pool rental",
    "summary": "Quillian Center's Noah's Ark water-play pool combines a ship-shaped play structure with three small slides, spray features and a separate pool with a large slide.",
    "distinctiveNote": "The Quillian Center operator says its 2026 public-swim season is over, although private pool events may still be booked into October; check which pool the reservation includes.",
    "officialUrl": "https://www.quilliancenter.org/swimming-pools",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "10570 Westpark Dr., Houston, TX 77042",
    "visitorHighlights": [
      "The Quillian Center includes a large traditional pool with diving boards and a major slide alongside a separate young-child Noah's Ark play pool.",
      "The shallow Noah's Ark area has a ship-shaped climbing/play structure with three small slides and a crawl-through passage.",
      "The small-child play area adds a mushroom water feature, a rainbow slide and spray fixtures inspired by Noah's animals.",
      "Separate on-site concessions sell food, while outside food and drink are prohibited within the fenced pool gates.",
      "Quillian advertises ordinary public pool access during summer but separate private-party bookings on certain other days or beyond the public season.",
      "The operator's 2026 listed summer pool season has ended; do not assume an October private event means regular admission is available."
    ],
    "visitorFaqs": [
      {
        "question": "Is Noah's Ark a pool for small children or a large water-slide park?",
        "answer": "It is a shallow themed play pool especially designed for preschool and early elementary ages, with a ship structure, small slides and interactive water features.",
        "sourceUrl": "https://www.quilliancenter.org/swimming-pools"
      },
      {
        "question": "Does Quillian Center have a bigger pool as well?",
        "answer": "Yes. It operates a larger swimming pool with a significant slide and two diving boards, separate from Noah's Ark shallow children's play area.",
        "sourceUrl": "https://www.quilliancenter.org/swimming-pools"
      },
      {
        "question": "Can families bring outside picnic food into the pool area?",
        "answer": "No. The center prohibits food and drink inside the fenced pools and directs guests to concessions or designated tables outside the pool gates.",
        "sourceUrl": "https://www.quilliancenter.org/swimming-pools"
      },
      {
        "question": "Are private parties available after the normal summer season?",
        "answer": "The operator offers private pool-party bookings on selected dates separate from standard daily admission. A private reservation is not evidence that a walk-in public swim session is scheduled.",
        "sourceUrl": "https://www.quilliancenter.org/swimming-pools"
      }
    ]
  },
  {
    "slug": "heights-family-richardson",
    "name": "Heights Family Aquatic Center",
    "city": "Richardson",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public daily municipal admission; city residents receive discounted pricing",
    "summary": "The renovated Heights Family Aquatic Center includes a lazy river, vortex pool, zero-entry pool, family water slides and a children's splash play area.",
    "distinctiveNote": "The City of Richardson reports the aquatic center reopened after improvements in May 2026; the regular summer season ended September 7 and slide riders must meet posted height rules.",
    "officialUrl": "https://www.cor.net/departments/parks-recreation/aquatics/heights-aquatic-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "709 W. Arapaho Rd., Richardson, TX 75080",
    "visitorHighlights": [
      "Heights Family Aquatic Center is Richardson's large municipal summer waterpark, separate from its smaller Canyon Creek, Cottonwood, Glenville and Terrace pools.",
      "Water features include a lazy river, a zero-entry pool, water slides and an interactive children's splash area.",
      "The municipal complex offers shaded family seating and leisure swimming alongside designated lap-swim facilities.",
      "Richardson's 2026 public swim season ran through September 7, with weekends-only operation late in the summer.",
      "Admission applies to all visiting guests age four and up, including people who choose not to swim.",
      "The city's youth-safety guidance requires close adult supervision for children under nine and arm's-reach supervision under seven."
    ],
    "visitorFaqs": [
      {
        "question": "Is Richardson Heights Aquatic Center open now in October 2026?",
        "answer": "No. The city says its public swimming pools are closed for the 2026 season, with anticipated reopening in summer 2027.",
        "sourceUrl": "https://www.cor.net/departments/parks-recreation/aquatics"
      },
      {
        "question": "Are spectators free at Heights?",
        "answer": "No. Richardson requires daily or season admission for every entrant age four or older, even those who will not be swimming.",
        "sourceUrl": "https://www.cor.net/departments/parks-recreation/aquatics/heights-aquatic-center"
      },
      {
        "question": "Does the facility provide activities for different swim abilities?",
        "answer": "Yes. Heights offers a zero-entry leisure area, a lazy river, children’s splash features and slides in addition to lap swimming and reserved shaded space.",
        "sourceUrl": "https://www.cor.net/departments/parks-recreation/aquatics/heights-aquatic-center"
      },
      {
        "question": "Can young children swim without a nearby adult?",
        "answer": "No. Richardson requires adults to supervise guests under nine, with an adult remaining within arm’s reach of every child younger than seven.",
        "sourceUrl": "https://www.cor.net/departments/parks-recreation/aquatics"
      }
    ]
  },
  {
    "slug": "bellaire-family-aquatic",
    "name": "Bellaire Town Square Family Aquatic Center",
    "city": "Bellaire",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public city aquatic admission and resident/nonresident daily rates",
    "summary": "Bellaire Town Square's seasonal leisure pool combines water-play facilities with a waterslide and family-focused aquatic recreation.",
    "distinctiveNote": "The city's off-season hours apply to the separate competition pool for lap swimming only; do not mistake fall lap hours for water-slide operating hours.",
    "officialUrl": "https://www.bellairetx.gov/720/Aquatics",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "7001 Fifth St., Bellaire, TX 77401",
    "visitorHighlights": [
      "Bellaire Town Square Family Aquatic Center includes the city’s seasonal leisure waterpark as well as a separate competition/lap-swimming pool.",
      "Off-season access at this Fifth Street facility is limited to lap swimming in the competition pool, not the seasonal slides or leisure-pool attractions.",
      "The City of Bellaire also operates Evergreen Pool and Elaine Wood Therapy Pool at 4500 Evergreen Street, a separate location not to be confused with the Town Square waterpark.",
      "The 2026 family leisure pool opened weekends in May and extended to a full daily summer schedule beginning June 6; it closed for the season in September.",
      "Resident and nonresident day-admission costs differ, with separate off-season lap-swim pricing; proof of residency is needed for resident memberships.",
      "Private pool rentals are not available in the off-season, and booking table space does not automatically include guest swimming admission."
    ],
    "visitorFaqs": [
      {
        "question": "Is the Bellaire waterpark open in October?",
        "answer": "No. The City of Bellaire states that only competition-pool lap swimming is offered at the Fifth Street center during the off-season; the leisure waterpark follows a separate summer calendar.",
        "sourceUrl": "https://www.bellairetx.gov/720/Aquatics"
      },
      {
        "question": "Can a non-Bellaire resident visit the aquatic center?",
        "answer": "Yes. The city has separate admission tiers for residents and nonresidents and sells some membership options, but leisure-pool entry is limited to its posted seasonal hours.",
        "sourceUrl": "https://www.bellairetx.gov/865/Aquatics-Pricing-and-Membership"
      },
      {
        "question": "Where is the town square facility rather than Evergreen Pool?",
        "answer": "Bellaire Town Square Family Aquatic Center is at 7001 Fifth Street. Evergreen Pool and the Elaine Wood Therapy Pool are separate at 4500 Evergreen Street.",
        "sourceUrl": "https://www.bellairetx.gov/720/Aquatics"
      },
      {
        "question": "Are private waterpark parties available in autumn?",
        "answer": "No. The City of Bellaire's rentals page states no private pool rentals are available during the September-to-May off-season; future reservations and table rentals use separate terms.",
        "sourceUrl": "https://bellairetx.gov/723/Pool-Rentals"
      }
    ]
  },
  {
    "slug": "taylor-roznovak-aquatic",
    "name": "Doris Roznovak Aquatic Center",
    "city": "Taylor",
    "county": "Williamson",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal city day admission and family punch passes",
    "summary": "Taylor's rebuilt Doris Roznovak Aquatic Center reopened in May 2026 with a new family pool, play structure and water slide.",
    "distinctiveNote": "The City of Taylor confirms the facility is closed for the 2026 season; the nearby public splash pads are separate, free attractions and are not duplicate water-park listings.",
    "officialUrl": "https://taylortx.gov/746/Swimming-Pool-Splash-Pads",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1600 Veterans Dr., Taylor, TX",
    "visitorHighlights": [
      "Doris Roznovak Aquatic Center is Taylor's rebuilt family pool with a named water-slide and interactive recreation area.",
      "The city sells separate daily admission for toddlers, children, adults and older visitors, with optional multisession punch passes.",
      "Children under age 14 may not visit the main city pool unless accompanied by an adult.",
      "The municipal site states Roznovak Aquatic Center is closed for the season as of October 2026.",
      "Taylor's free Robinson Park and Heritage Square splash pads operate at separate addresses and should not be confused with Roznovak's admission-based pool."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Roznovak Aquatic Center?",
        "answer": "Taylor lists its municipal family aquatic center at 1600 Veterans Drive. It is not the same location as Robinson Park or Heritage Square splash pads.",
        "sourceUrl": "https://www.taylortx.gov/746/Swimming-Pool-Splash-Pads"
      },
      {
        "question": "Can children enter the pool without an adult?",
        "answer": "No. Taylor states that children younger than 14 cannot be in the pool without an accompanying adult responsible for supervision.",
        "sourceUrl": "https://www.taylortx.gov/746/Swimming-Pool-Splash-Pads"
      },
      {
        "question": "Is the aquatic center open for fall weekends?",
        "answer": "No. The City of Taylor's current aquatic facility listing labels the Roznovak center closed for the 2026 season. Its two public splash pads also use separate seasonal dates.",
        "sourceUrl": "https://www.taylortx.gov/746/Swimming-Pool-Splash-Pads"
      },
      {
        "question": "Are free splash pads included at the aquatic center?",
        "answer": "The city operates separate free community splash pads at Robinson Park and Heritage Square, with different addresses and rules. Do not treat those as identical to the paid Roznovak center.",
        "sourceUrl": "https://www.taylortx.gov/746/Swimming-Pool-Splash-Pads"
      }
    ]
  },
  {
    "slug": "pampa-h2o-aquatic-center",
    "name": "Pampa H2O Aquatic Center",
    "city": "Pampa",
    "county": "Gray",
    "region": "Panhandle",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal city aquatic center admission; check local and visitor rates",
    "summary": "Pampa's outdoor family aquatic park features a lazy river, three large waterslides, a pool for lap swimming and children's water play with a dumping bucket.",
    "distinctiveNote": "The City of Pampa's facility planning materials describe seasonal Memorial Day through Labor Day operations; a 2027 state ride-sticker register lists its flume slides and slide bowl, but the city must confirm each summer's actual schedule.",
    "officialUrl": "https://www.pampaedc.com/community",
    "reviewedAt": "2026-10-17",
    "visitorHighlights": [
      "The city's annual budget records three large waterslides, not simply the lazy river described on some visitor directories.",
      "Pampa H2O contains a family leisure channel and a children's water-play structure with a dumping bucket.",
      "A certified 25-meter competition pool with two diving boards serves more experienced swimmers alongside the family park.",
      "The facility spans approximately 7,600 square feet of water surface and provides a 2,700-square-foot bathhouse.",
      "The City of Pampa describes a seasonal opening window from Memorial Day through Labor Day rather than year-round outdoor operation."
    ],
    "visitorFaqs": [
      {
        "question": "Does Pampa H2O have a lazy river?",
        "answer": "Yes. The local economic development corporation confirms a lazy river and full funnel-style water slide, alongside a lap pool and family seating areas.",
        "sourceUrl": "https://www.pampaedc.com/community"
      },
      {
        "question": "Can families visit Pampa H2O in October?",
        "answer": "The city describes this as a seasonal outdoor facility and has not established a regular October waterpark calendar; check directly with Parks and Recreation before visiting.",
        "sourceUrl": "https://www.pampaedc.com/community"
      },
      {
        "question": "Does Pampa H2O operate as a public municipal park?",
        "answer": "Pampa's official local economic-development listing identifies H2O as a family-oriented aquatic park with substantial water-play features, separate from ordinary neighborhood splash pads.",
        "sourceUrl": "https://www.pampaedc.com/community"
      },
      {
        "question": "Are current slide hours guaranteed on published visitor listings?",
        "answer": "No. A description of the park's slide equipment is not proof that each attraction operates on a given day. Confirm the live operating season and availability with the city.",
        "sourceUrl": "https://www.pampaedc.com/community"
      }
    ],
    "visitorAddress": "1400 N. Sumner St., Pampa, TX 79065"
  },
  {
    "slug": "alice-natatorium-waterpark",
    "name": "Alice Natatorium Outdoor Waterpark",
    "city": "Alice",
    "county": "Jim Wells",
    "region": "South Texas",
    "setting": "Both",
    "kind": "Municipal water park",
    "admission": "Indoor pool and outdoor waterpark may have separate public admission and swim schedules",
    "summary": "Alice's natatorium complex includes a year-round indoor swimming pool plus a separate outdoor leisure area with water slides, interactive water play and family splash zones.",
    "distinctiveNote": "The YMCA's operator page distinguishes indoor pool hours from outdoor waterpark amenities and warns that outdoor access is seasonal; verify 2026 public sessions, rates and slide access before driving.",
    "officialUrl": "https://ymca-cc.org/alice-natatorium/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "723 FM 1554, Alice, TX 78332",
    "visitorHighlights": [
      "Alice Natatorium combines a year-round indoor pool with a distinct seasonal outdoor waterpark section under YMCA of the Coastal Bend management.",
      "The YMCA posts separate indoor and outdoor admission classes; its published outdoor attraction hours do not cover every school-year weekday.",
      "YMCA lifeguards supervise the aquatic zones, while programs such as swim lessons and swim-team sessions sometimes close the indoor pool to general public swim.",
      "The operator's posted outside-waterpark cooler fee is separate from admission; alcoholic beverages are prohibited and re-entry after leaving is not allowed.",
      "The facility runs lessons and group exercise classes that use the indoor pool year-round, so those hours are not evidence of outdoor slides operating."
    ],
    "visitorFaqs": [
      {
        "question": "Is Alice's outdoor waterpark open on October 17?",
        "answer": "The YMCA's operating schedule describes seasonal outdoor amenities through October 1, so visitors should not assume the outdoor waterpark is open later in October; confirm the latest reopening date with the operator.",
        "sourceUrl": "https://ymca-cc.org/alice-natatorium/"
      },
      {
        "question": "Can families use the indoor pool when the waterpark is closed?",
        "answer": "The YMCA provides separate indoor public swimming and lessons. Outdoor waterpark dates are not equivalent to year-round indoor pool access or aquatic class schedules.",
        "sourceUrl": "https://ymca-cc.org/alice-natatorium/"
      },
      {
        "question": "What are the food and re-entry restrictions?",
        "answer": "The operator lists a separate paid cooler permit, prohibits alcohol and states that guests who leave cannot re-enter the outdoor waterpark on the same admission.",
        "sourceUrl": "https://ymca-cc.org/alice-natatorium/"
      },
      {
        "question": "Where is the Alice Natatorium?",
        "answer": "The operator lists its campus at 723 Farm to Market Road 1554, Alice, Texas 78332. It is a different location from Corpus Christi's YMCA facilities.",
        "sourceUrl": "https://ymca-cc.org/alice-natatorium/"
      }
    ]
  },
  {
    "slug": "el-campo-aquatic-center",
    "name": "El Campo Aquatic Center",
    "city": "El Campo",
    "county": "Wharton",
    "region": "Gulf Coast",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "City aquatic-center daily admission or membership; open-swim schedules differ from lessons and teams",
    "summary": "El Campo's city-run indoor aquatic center contains three heated pools, including a family leisure pool with an 85-foot waterslide, spray features, floating lily pads and a water mushroom.",
    "distinctiveNote": "The center opened in 2005 and is designed for year-round recreation; swim teams, lessons and therapy also use the site, so check public leisure-pool availability and child supervision rules before visiting.",
    "officialUrl": "https://cityofelcampo.recdesk.com/Community/Facility/Detail?facilityId=9",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2613 Blossom Meyer, El Campo, TX 77437",
    "visitorHighlights": [
      "The El Campo Aquatic Center has three heated pools, including an eight-lane 25-yard competition pool, a leisure pool and a large hot tub.",
      "The family leisure pool has an 85-linear-foot water slide, interactive water mushroom and floating lily-pad crossings.",
      "The city operates the facility year-round on an indoor recreation timetable, unlike many summer-only outdoor waterparks.",
      "Visitors under 13 must be accompanied by someone older than 16, while children five and under need an adult older than 16 in the water.",
      "Outside food and drinks and inflatable float toys are prohibited, with separate rules for children accessing the hot tub.",
      "The complex opened in January 2005 after a local Rotary Club and community-funding initiative."
    ],
    "visitorFaqs": [
      {
        "question": "Can young children swim without adults?",
        "answer": "No. The city requires a person older than 16 to accompany all visitors under 13, and children aged five and under must have the accompanying person in the water with them.",
        "sourceUrl": "https://cityofelcampo.recdesk.com/Community/Facility/Detail?facilityId=9"
      },
      {
        "question": "Does this park have a regular lap pool as well as water slides?",
        "answer": "Yes. Its three heated pool sections include an eight-lane competition pool and a separate leisure area with an 85-foot water slide, lily pads and mushroom spray feature.",
        "sourceUrl": "https://cityofelcampo.recdesk.com/Community/Facility/Detail?facilityId=9"
      },
      {
        "question": "Can we bring outside food or inflatables?",
        "answer": "No. El Campo's facility rules prohibit outside food or beverages and inflatable equipment, along with other posted restrictions for use of the hot tub.",
        "sourceUrl": "https://cityofelcampo.recdesk.com/Community/Facility/Detail?facilityId=9"
      },
      {
        "question": "Where is El Campo Aquatic Center?",
        "answer": "The city's booking portal lists 2613 Blossom Meyer, El Campo, Texas 77437. Its posted public recreation hours vary by weekday and it also hosts swim teams and lessons.",
        "sourceUrl": "https://cityofelcampo.recdesk.com/Community/Facility/Detail?facilityId=9"
      }
    ]
  },
  {
    "slug": "mesquite-city-lake-aquatic",
    "name": "Brunhilde Nystrom City Lake Aquatic Center",
    "city": "Mesquite",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal city day admission with published resident and nonresident rates",
    "summary": "Mesquite's City Lake Aquatic Center is a sizeable municipal family-swim complex that combines seasonal recreation, water-slide attractions and shaded areas for group outings.",
    "distinctiveNote": "The City of Mesquite lists 2026 summer service and separate reservation hours for the 500-person complex; the Texas ride-sticker register corroborates the city's open-body flume slides, but verify slide operations directly.",
    "officialUrl": "https://cityofmesquite.com/3491/Brunhilde-Nystrom-City-Lake-Aquatic-Cent",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "200 Parkview St., Mesquite, TX 75149",
    "visitorHighlights": [
      "Brunhilde Nystrom City Lake Aquatic Center is a named City of Mesquite public family aquatic venue and distinct from its natatorium or the Town East and Vanston pools.",
      "City records describe summer public swim sessions and a separate weekday twilight-discount category.",
      "The facility offers rentable shaded structures and whole-waterpark private events, with a published capacity of up to 500 guests.",
      "Mesquite lists different daily swimming admission categories for residents, nonresidents, senior visitors and children age two and under.",
      "2026 whole-facility rental availability ran May 29 to September 6 on selected Thursdays through Sundays, not year-round autumn evenings.",
      "The site has water-slide infrastructure listed in city and ride-registration records; individual slide operation is subject to confirmation."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Brunhilde Nystrom City Lake Aquatic Center?",
        "answer": "The City of Mesquite lists 200 Parkview Street, Mesquite, Texas 75149. It is separate from the city's natatorium and other neighborhood pools.",
        "sourceUrl": "https://cityofmesquite.com/3491/Brunhilde-Nystrom-City-Lake-Aquatic-Cent"
      },
      {
        "question": "Are private whole-facility pool parties available?",
        "answer": "The city offered private rental sessions for groups of up to 500 on selected summer evenings, separate from general swimming admission. Check next season's calendar before booking.",
        "sourceUrl": "https://cityofmesquite.com/1419/Swimming-Pools"
      },
      {
        "question": "Is this an ordinary free city swimming pool?",
        "answer": "No. The operator publishes paid resident and nonresident day admission plus separately priced shade structures, swimming passes and private facility rentals.",
        "sourceUrl": "https://cityofmesquite.com/3491/Brunhilde-Nystrom-City-Lake-Aquatic-Cent"
      },
      {
        "question": "Are evening and weekend hours always the same?",
        "answer": "No. The official 2026 city schedule distinguishes regular public sessions, select weekend hours and discounted weekday twilight admission. Fall reopening is not implied.",
        "sourceUrl": "https://cityofmesquite.com/3491/Brunhilde-Nystrom-City-Lake-Aquatic-Cent"
      }
    ]
  },
  {
    "slug": "desoto-moseley-pool",
    "name": "Moseley Pool Water Park",
    "city": "DeSoto",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal City of DeSoto admission with separate resident and nonresident rates",
    "summary": "DeSoto's waterpark-style Moseley Pool provides a beach-style zero-depth entry, two large waterslides, spray stations, water play fixtures and a separate lap-swim area.",
    "distinctiveNote": "The city's 2026 public schedule has ended and its official page is preparing for summer 2027. Check resident pricing, no-cash admission policy, slide rules and reopen dates with DeSoto Parks and Recreation.",
    "officialUrl": "https://www.desototexas.gov/661/Moseley-Pool",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1300 Honor Dr., DeSoto, TX 75115",
    "visitorHighlights": [
      "Moseley Pool offers beach-style zero-depth entry, two large water slides, family spray stations and a separate lap-swimming area.",
      "The 2026 public swimming season closed on Labor Day September 7; the city is preparing a separate 2027 summer calendar.",
      "DeSoto lists standard pool concessions, lockers, restrooms and shaded family seating.",
      "The city's admission policy is cashless: credit cards are accepted and outside food and beverages are prohibited.",
      "Group reservations for camps and schools require an approved swimming agreement in advance; groups arriving unbooked cannot enter under group rules.",
      "Resident and nonresident prices differ, and the city lists specific reduced-price categories for children and seniors."
    ],
    "visitorFaqs": [
      {
        "question": "Can families visit Moseley Pool during October 2026?",
        "answer": "No. The city says the 2026 season has ended and plans to reopen in summer 2027. Its old seasonal weekday and weekend hours are not current opening hours.",
        "sourceUrl": "https://www.desototexas.gov/661/Moseley-Pool"
      },
      {
        "question": "Does Moseley Pool accept cash admission?",
        "answer": "No. DeSoto's current pool policies require credit card payment and prohibit outside food and drinks. Guests can use on-site concession services.",
        "sourceUrl": "https://www.desototexas.gov/661/Moseley-Pool"
      },
      {
        "question": "How can a school or camp organize a group visit?",
        "answer": "The city requires organized groups to schedule admission in advance under an approved Swim Agreement. An unreserved group arriving without that agreement cannot enter as a group.",
        "sourceUrl": "https://www.desototexas.gov/661/Moseley-Pool"
      },
      {
        "question": "Where is DeSoto's Moseley Pool?",
        "answer": "The City of DeSoto lists the aquatic center at 1300 Honor Drive, DeSoto, Texas 75115, with two major slides and a zero-depth beach-style entrance.",
        "sourceUrl": "https://www.desototexas.gov/661/Moseley-Pool"
      }
    ]
  },
  {
    "slug": "edinburg-municipal-waterpark",
    "name": "Edinburg Municipal Waterpark",
    "city": "Edinburg",
    "county": "Hidalgo",
    "region": "South Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public city seasonal swim sessions and family admission rates",
    "summary": "Edinburg's multi-pool municipal waterpark features a 125-foot figure-eight waterslide, family leisure swimming, water basketball, shaded tables and an accessible Pirates Cove water-play section.",
    "distinctiveNote": "The City of Edinburg lists its outdoor aquatic season as April through September and describes Pirates Cove as a separate new water-play area within its aquatic offerings; check posted session times and slide access before arrival.",
    "officialUrl": "https://www.cityofedinburg.com/community/parks_recreation/aquatics_division.php",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "125 Mark S. Peña Dr., Edinburg, TX 78539",
    "visitorHighlights": [
      "Edinburg Municipal Waterpark is a three-pool city-operated outdoor waterpark, not the city office at 315 Mark S. Peña Drive.",
      "The venue features a 125-foot figure-eight waterslide, water basketball and a large family leisure-swim area.",
      "Pirates Cove is an additional interactive play area within Edinburg's municipal aquatics offering, not a separate standalone ticketed waterpark.",
      "BBQ grills and picnic tables with shade canopies support family outings during the active swim season.",
      "The city explicitly lists water wheelchairs as available, a meaningful accessibility feature for waterpark visitors.",
      "The Aquatics Division's outdoor pool facilities operate April through September, so the general waterpark is not advertised for October."
    ],
    "visitorFaqs": [
      {
        "question": "Is Edinburg's waterpark operating in October?",
        "answer": "The official city Aquatics Division says outdoor pool facilities run April through September. October admission should not be assumed without a special schedule.",
        "sourceUrl": "https://www.cityofedinburg.com/community/parks_recreation/aquatics_division.php"
      },
      {
        "question": "Where is the Edinburg Municipal Waterpark?",
        "answer": "The city lists the waterpark at 125 Mark S. Peña Drive, Edinburg, Texas 78539, distinct from the Parks and Recreation office at 315 Mark S. Peña Drive.",
        "sourceUrl": "https://www.cityofedinburg.com/community/parks_recreation/aquatics_division.php"
      },
      {
        "question": "What does the waterpark have beyond its main pool?",
        "answer": "The city identifies three pools, a 125-foot figure-eight slide, water basketball and its newer Pirates Cove family-play section, along with shaded barbecue and picnic facilities.",
        "sourceUrl": "https://www.cityofedinburg.com/community/parks_recreation/aquatics_division.php"
      },
      {
        "question": "Are accessible water wheelchairs available?",
        "answer": "Yes. The City's current aquatics page explicitly lists water wheelchairs for the waterpark. Visitors should contact staff to confirm availability for their visit date.",
        "sourceUrl": "https://www.cityofedinburg.com/community/parks_recreation/aquatics_division.php"
      }
    ]
  },
  {
    "slug": "midland-doug-russell",
    "name": "Doug Russell Aquatic Center",
    "city": "Midland",
    "county": "Midland",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal Midland public aquatic-center admission with day passes and swim punch cards",
    "summary": "Midland's Doug Russell outdoor aquatics complex offers public swim sessions alongside a multi-slide tower, larger body slides and water-play features recorded in the city's renovation program.",
    "distinctiveNote": "Midland's official 2026 swimming calendar lists Doug Russell's last opening date as September 7. Its municipal renovation materials include slide painting, tower repairs and feature replacement; confirm which rides will be operational for the 2027 season.",
    "officialUrl": "https://www.midlandtexas.gov/facilities/facility/details/doug-russell-pool-4",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "900 N. Midland Dr., Midland, TX 79703",
    "visitorHighlights": [
      "Doug Russell Aquatic Center is one of Midland's outdoor municipal aquatic venues, separate from Washington Aquatic Center.",
      "The 2026 city schedule lists its last public swimming session on September 7, and the late-season August pool rotation operated only one of the two sites on given days.",
      "Thursday Family Night permits additional evening swimming time compared with regular public swim dates.",
      "Unlike Washington Aquatic Center, Doug Russell is listed closed on Tuesdays during its regular summer season.",
      "The venue includes shaded seating, picnic tables, restrooms, concessions and a municipal swimming pool, with slides subject to city maintenance and reopening checks.",
      "Children 14 and younger must have a supervising adult over age 18 under the city's aquatics policies."
    ],
    "visitorFaqs": [
      {
        "question": "Is Doug Russell Aquatics open in October?",
        "answer": "No. Midland's 2026 schedule says the final Doug Russell public swim was September 7, Labor Day. Future dates need confirmation on the official city swim calendar.",
        "sourceUrl": "https://midlandtexas.gov/swim"
      },
      {
        "question": "What address should visitors use for Doug Russell?",
        "answer": "The city lists 900 North Midland Drive, Midland, Texas 79703; Washington Aquatic Center is a separate location at 1601 East Indiana Avenue.",
        "sourceUrl": "https://midlandtexas.gov/facilities/facility/details/doug-russell-pool-4"
      },
      {
        "question": "Are Tuesdays generally available for open swimming?",
        "answer": "No. During the 2026 regular summer schedule the city lists Tuesday as closed at Doug Russell, with additional evening hours on Thursday Family Nights.",
        "sourceUrl": "https://midlandtexas.gov/swim"
      },
      {
        "question": "Can children attend without adults?",
        "answer": "The city requires swimmers age 14 and younger to attend with a supervising adult over 18 years old. Pool visitors must also follow the city's posted safety regulations.",
        "sourceUrl": "https://midlandtexas.gov/swim"
      }
    ]
  },
  {
    "slug": "pharr-aquatic-center",
    "name": "Pharr Aquatic Center Water Park",
    "city": "Pharr",
    "county": "Hidalgo",
    "region": "South Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City of Pharr summer waterpark admission; separate from year-round Natatorium programming",
    "summary": "Pharr's Aquatic Center at 1000 South Fir Street has a seasonal aquatic park with a lazy river, waterslides, children's play structure, kiddie pool, leisure pool, shaded seating and snack bar.",
    "distinctiveNote": "The City of Pharr distinguishes the summer-only aquatic park from its separate natatorium at 3001 North Cage Boulevard. The outdoor season is listed for June and July; verify updated pool hours before traveling.",
    "officialUrl": "https://pharr-tx.gov/government/departments/parks-recreation/find-a-park/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1000 S. Fir St., Pharr, TX 78577",
    "visitorHighlights": [
      "Pharr's seasonal outdoor Aquatic Center offers a separate family waterpark with lazy river and waterslides, not simply its year-round natatorium pool.",
      "Additional municipal amenities include a young-child play structure, kiddie pool and ordinary leisure-swimming sections.",
      "The City of Pharr's park directory lists a summer-only outdoor waterpark at 1000 South Fir Street.",
      "The Pharr Natatorium is a different indoor swimming complex at 3001 North Cage Boulevard; indoor swim hours there should not be misreported as outdoor waterpark availability.",
      "Families can find shaded seating and an on-site snack bar at the seasonal family aquatic center, subject to current-day operations."
    ],
    "visitorFaqs": [
      {
        "question": "Is the 1000 South Fir outdoor waterpark year-round?",
        "answer": "No. The city publishes an outdoor summer swim season, distinct from the separate natatorium. Check current posted seasonal waterpark opening dates before visiting.",
        "sourceUrl": "https://pharr-tx.gov/government/departments/parks-recreation/find-a-park/"
      },
      {
        "question": "Where is Pharr's Aquatic Center waterpark?",
        "answer": "The official city parks directory places the outdoor Aquatic Center at 1000 South Fir Street, Pharr, Texas 78577, not at the natatorium's North Cage Boulevard address.",
        "sourceUrl": "https://pharr-tx.gov/government/departments/parks-recreation/find-a-park/"
      },
      {
        "question": "Does this park have water slides and a lazy river?",
        "answer": "Yes. Pharr identifies a lazy river, slides, children's interactive play structure and additional leisure pool areas as the outdoor waterpark's major recreation attractions.",
        "sourceUrl": "https://pharr-tx.gov/government/departments/parks-recreation/find-a-park/"
      },
      {
        "question": "Is the natatorium in the same building?",
        "answer": "No. Pharr's City facilities listings distinguish the seasonal outdoor Aquatic Center on South Fir from the municipal Natatorium at 3001 North Cage Boulevard.",
        "sourceUrl": "https://pharr-tx.gov/government/departments/parks-recreation/find-a-park/"
      }
    ]
  },
  {
    "slug": "garland-holford-aquatic",
    "name": "Holford Aquatic Center",
    "city": "Garland",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Summer municipal pool admission; resident and nonresident day rates and cabana reservations",
    "summary": "Garland's Holford Aquatic Center at 2322 Homestead Place features two waterslides, a current channel, lap lanes, a family activity pool, tot pool, cabanas and a concessions area.",
    "distinctiveNote": "The City of Garland confirms its 2026 outdoor aquatics season at Holford ended August 9. This recently rebuilt venue is separate from Surf & Swim, which has its own slides and seasonal calendar.",
    "officialUrl": "https://www.garlandtx.gov/3513/Holford-Pool",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2322 Homestead Place, Garland, TX 75044",
    "visitorHighlights": [
      "Holford Aquatic Center is a separate Garland municipal aquatic park off Shiloh Road next to a recreation center.",
      "The park offers two waterslides, a current channel, lap lanes, a young-child tot pool and a separate activity pool.",
      "Visitors may rent cabanas, private party decks or a party room in addition to general admission.",
      "Residents have distinct weekday and full-season pass choices, while general day admission has resident versus nonresident tiers.",
      "The operator imposes a separate cooler fee, prohibits commercial outside food and requires children under age 14 to be accompanied by an adult.",
      "The city's current page reports Holford closed for the 2026 summer season, while lap walking/swimming programs have their own dated schedules."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Holford Aquatic Center?",
        "answer": "Holford is located at 2322 Homestead Place, Garland, Texas 75044. It is separate from Surf & Swim and from the city's other aquatic facilities.",
        "sourceUrl": "https://www.garlandtx.gov/3513/Holford-Pool"
      },
      {
        "question": "Are there waterslides and an area for small children?",
        "answer": "Yes. Garland lists two water slides, a current channel, a tot pool and an activity pool, with a separate lap-lane space for athletic swimming.",
        "sourceUrl": "https://www.garlandtx.gov/3513/Holford-Pool"
      },
      {
        "question": "Are Holford's weekday passes available to everyone?",
        "answer": "The city describes resident-specific weekday and full-season passes for its 2026 summer season. Nonresidents have separate daily admission pricing, and future pass rules may change.",
        "sourceUrl": "https://www.garlandtx.gov/3513/Holford-Pool"
      },
      {
        "question": "Is Holford operating regular waterpark hours now?",
        "answer": "No. Garland's visitor page says the aquatic center is closed for the 2026 summer season. Any adult fitness sessions use their own dated schedule.",
        "sourceUrl": "https://www.garlandtx.gov/3513/Holford-Pool"
      }
    ]
  },
  {
    "slug": "big-spring-russ-mcewen",
    "name": "Russ McEwen Family Aquatic Center",
    "city": "Big Spring",
    "county": "Howard",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal City of Big Spring aquatic-center public admission and rental options",
    "summary": "Inside Big Spring's Comanche Trail Park, the Russ McEwen Family Aquatic Center has a lazy river, two water slides, a zero-entry leisure pool, crossing activities, and interactive children's water play.",
    "distinctiveNote": "The City of Big Spring provides a 2026 ticket and concessions page with a Splash Cash card system and lists the entrance at 911 Golf Course Road. Seasonal public admission dates should be verified for the next summer before visiting.",
    "officialUrl": "https://www.bigspringtx.gov/342/Russ-McEwen-Family-Aquatic-Center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "911 Golf Course Rd., Big Spring, TX 79720",
    "visitorHighlights": [
      "Big Spring's municipal aquatic center was built as a 9,376-square-foot leisure pool and supporting bathhouse inside Comanche Trail Park.",
      "The water attractions include two full-size water slides, lazy river, zero-depth pool entry and a climbable play structure.",
      "Family attractions include a water-crossing feature and adjacent sand-play zones, rather than only traditional lap lanes.",
      "The bathhouse provides changing and shower facilities and public concessions along with shaded seating areas.",
      "In 2026 the city introduced a Splash Cash card exclusively for concession spending, while normal admission is purchased at the entrance.",
      "The municipal schedule identifies Mondays as closed days during the posted regular summer operation."
    ],
    "visitorFaqs": [
      {
        "question": "What features are at the Big Spring aquatic center?",
        "answer": "The city's facility history lists two waterslides, a lazy river, zero-depth entry, climbing play structure, water-crossing activity and shaded sand-play amenities at the municipal leisure pool.",
        "sourceUrl": "https://www.bigspringtx.gov/Facilities/Facility/Details/Russ-McEwen-Family-Aquatic-Center-7"
      },
      {
        "question": "Can visitors buy snacks with cash directly at the stand?",
        "answer": "The 2026 visitor information says concessions only accept a prepaid/reloadable Splash Cash card. Cash can be used at the front admission booth to load a card, but not for purchases inside.",
        "sourceUrl": "https://www.bigspringtx.gov/342/Russ-McEwen-Family-Aquatic-Center"
      },
      {
        "question": "Where is the waterpark entrance?",
        "answer": "The City of Big Spring lists the aquatic center at 911 Golf Course Road inside Comanche Trail Park, Big Spring, Texas 79720, and publishes a seasonal opening schedule.",
        "sourceUrl": "https://www.bigspringtx.gov/342/Russ-McEwen-Family-Aquatic-Center"
      },
      {
        "question": "Are Mondays a good time for a visit?",
        "answer": "No. The posted municipal waterpark operating schedule closes the center on Mondays. Tuesday through Sunday use distinct hours, subject to current seasonal status.",
        "sourceUrl": "https://www.bigspringtx.gov/342/Russ-McEwen-Family-Aquatic-Center"
      }
    ]
  },
  {
    "slug": "splash-shack-cedar-park",
    "name": "Splash Shack Kids Indoor Water Park",
    "city": "Cedar Park",
    "county": "Williamson",
    "region": "Central Texas",
    "setting": "Indoor",
    "kind": "Community water park",
    "admission": "Ticketed indoor children's water-play park; each child ticket includes one accompanying adult; extra adult tickets require a child",
    "summary": "Splash Shack is a 10,000-square-foot indoor micro water park for children, centered on a 30-foot interactive splash structure with several slides and a large tipping-water bucket.",
    "distinctiveNote": "This is designed mainly for children around ages 1–10, not an adult thrill-ride water park. The operator prohibits adult-only admission and unattended minors; paid admission is required even for non-swimming adults, with a one-entry policy.",
    "officialUrl": "https://splashshacktx.com/",
    "reviewedAt": "2026-10-17",
    "visitorFaqs": [
      {
        "question": "Can adults visit Splash Shack without a child?",
        "answer": "No. Every adult must accompany a child, and the park does not sell standalone adult admission. Each child admission includes one accompanying adult.",
        "sourceUrl": "https://splashshacktx.com/rules/"
      },
      {
        "question": "Is Splash Shack an outdoor summer-only water park?",
        "answer": "No. It is a ticketed indoor micro water park. Its currently advertised 2026 public sessions are Wednesday through Sunday, with private events on other days.",
        "sourceUrl": "https://splashshacktx.com/"
      },
      {
        "question": "Can I leave and return on the same admission?",
        "answer": "No. The operator states that each admission is for a single entry and re-entry is not permitted.",
        "sourceUrl": "https://splashshacktx.com/faq/"
      }
    ],
    "visitorAddress": "1801 Clover Lane, Cedar Park, TX 78613",
    "visitorHighlights": [
      "Splash Shack is a weather-independent indoor micro waterpark designed for children, not a conventional open-air seasonal thrill park.",
      "One paid child ticket includes admission for one accompanying adult; additional adults must be with a child and may incur an extra charge.",
      "The operator prohibits adult-only admission; every adult entrant must accompany a child.",
      "Tickets offer one-time entry, with no re-entry, and buying online does not guarantee immediate entry if maximum capacity causes a waiting queue.",
      "Regular public play is scheduled Wednesday through Sunday, with private group or family events possible by advance booking on other days."
    ]
  },
  {
    "slug": "forest-oasis-woodlands-resort",
    "name": "Forest Oasis Waterpark & Lazy River",
    "city": "The Woodlands",
    "county": "Montgomery",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Resort water park",
    "admission": "Included for registered Woodlands Resort hotel guests; limited non-hotel day passes may be purchased subject to availability",
    "summary": "The Woodlands Resort's Forest Oasis Waterpark features a 1,005-foot lazy river, a 30-foot slide tower with double-helix slides, cascading waterfalls, family pools and a children's sprayground.",
    "distinctiveNote": "The waterpark is open year-round but major slides are seasonal: double-helix slides are closed September–March, and the lazy-river slide is limited in October and closed November–March. The resort says the river is not heated.",
    "officialUrl": "https://woodlandsresort.com/experiences/waterpark/",
    "reviewedAt": "2026-10-17",
    "visitorFaqs": [
      {
        "question": "Can visitors without a hotel reservation use Forest Oasis?",
        "answer": "Yes, when capacity allows. The Woodlands Resort sells non-hotel day passes through ResortPass, with availability and prices set for the visit date.",
        "sourceUrl": "https://woodlandsresort.com/experiences/waterpark/"
      },
      {
        "question": "Are the Forest Oasis water slides open all year?",
        "answer": "No. The resort says the double-helix slides close September through March, while the lazy-river slide has limited October operation and closes November through March.",
        "sourceUrl": "https://woodlandsresort.com/experiences/waterpark/"
      },
      {
        "question": "Is the lazy river heated?",
        "answer": "No. The resort states that its pools are heated seasonally, but the 1,005-foot lazy river is not heated.",
        "sourceUrl": "https://woodlandsresort.com/experiences/waterpark/"
      }
    ],
    "visitorAddress": "2301 N. Millbend Dr., The Woodlands, TX 77380",
    "visitorHighlights": [
      "Forest Oasis at The Woodlands Resort has a 1,005-foot lazy river, separate double-helix waterslides and family water-play pools.",
      "The operator specifies that the lazy river is not heated, even when other pools are heated seasonally.",
      "The double-helix slides close from September through March; another lazy-river slide has limited October service before its November-to-March closure.",
      "Resort overnight guests have waterpark access, while limited non-stay day passes may be available through a separate inventory service.",
      "Visitor dining and optional cabana/lounge rentals are offered on site, but they may have different calendar and pricing rules than park admission."
    ]
  },
  {
    "slug": "lagoonfest-texas-city",
    "name": "Lagoonfest Texas Aqua Adventure Park",
    "city": "Texas City",
    "county": "Galveston",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Inflatable lake water park",
    "admission": "Seasonal advance online-only Adventure Aqua Pass; capped daily admission; some kayaks, boards and private rentals are extra",
    "summary": "Lagoonfest Texas is a beach-club-style crystal lagoon in Texas City with a large floating Aqua Course, bumper boats, designated swimming and optional on-water rentals.",
    "distinctiveNote": "The 2026 operator plan limits daily attendance to 500 people and restricts access to part of the lagoon during enhancements. The Aqua Course requires guests to be at least 6 years old and 42 inches tall; 2026 gate ticket sales are unavailable.",
    "officialUrl": "https://lagoonfesttexas.com/",
    "reviewedAt": "2026-10-17",
    "visitorFaqs": [
      {
        "question": "Can I buy 2026 Lagoonfest tickets at the entrance?",
        "answer": "No. The operator's 2026 Summerfest program requires tickets purchased online in advance and says gate sales are unavailable.",
        "sourceUrl": "https://lagoonfesttexas.com/"
      },
      {
        "question": "Does admission include the floating Aqua Course?",
        "answer": "For the advertised 2026 Adventure Aqua Pass, yes. Bumper boats and the Aqua Course are included, while kayaks, paddleboards and other rentals cost extra.",
        "sourceUrl": "https://lagoonfesttexas.com/"
      },
      {
        "question": "Are there age and height rules for the Aqua Course?",
        "answer": "Yes. The operator requires participants to be at least 6 years old and at least 42 inches tall.",
        "sourceUrl": "https://lagoonfesttexas.com/"
      }
    ],
    "visitorAddress": "12600 Crystal View Blvd., Texas City, TX 77568",
    "visitorHighlights": [
      "Lagoonfest's large swimming lagoon and floating Aqua Course are distinct from traditional tower-style waterslides.",
      "Its advertised 2026 Adventure Aqua Pass includes bumper boats and the Aqua Course plus standard admission, but kayaks and paddleboards require additional rental payments.",
      "The operator sets Aqua Course eligibility at age six and a minimum height of 42 inches; bumper boats have different driver and passenger restrictions.",
      "The operator describes a limited 500-guest daily capacity and a restricted lagoon footprint during 2026 enhancements.",
      "The Lagoonfest homepage contains conflicting generic gate-sale wording, but its 2026 Adventure Pass section says advance online purchase is required; visitors should book in advance.",
      "A dedicated deeper-water recreation area is separated from shallow permitted swimming sections for safety."
    ]
  },
  {
    "slug": "angel-lagoon-dayton",
    "name": "Angel Lagoon Aqua Adventure Park",
    "city": "Dayton",
    "county": "Liberty",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Inflatable lake water park",
    "admission": "Ticketed lagoon beach admission; floating Aqua Course and watercraft sessions sold separately",
    "summary": "Angel Lagoon is a public-access crystal lagoon near Dayton with sandy beach recreation, kayaking, stand-up paddling and a ticketed floating Aqua Course obstacle attraction.",
    "distinctiveNote": "The operator lists the Aqua Course as a paid 30-minute activity for visitors age 6+ and at least 42 inches tall. Its new water slide is explicitly listed as 'coming soon' and must not be portrayed as already open.",
    "officialUrl": "https://angellagoon.com/attractions/",
    "reviewedAt": "2026-10-17",
    "visitorFaqs": [
      {
        "question": "Is the Angel Lagoon water slide operating?",
        "answer": "The operator's attraction page currently lists the water slide as 'Coming Soon.' Do not rely on it being open for your visit.",
        "sourceUrl": "https://angellagoon.com/attractions/"
      },
      {
        "question": "Is the Aqua Course included with normal admission?",
        "answer": "No. The current operator ticket menu lists Aqua Course sessions separately from general admission, and each session lasts 30 minutes.",
        "sourceUrl": "https://angellagoon.com/tickets/"
      },
      {
        "question": "What age and height are required for the Aqua Course?",
        "answer": "The listed minimums are age 6 and 42 inches in height. A life jacket is required and provided.",
        "sourceUrl": "https://angellagoon.com/attractions/"
      }
    ],
    "visitorAddress": "15 River Ranch Blvd., Dayton, TX 77635",
    "visitorHighlights": [
      "Angel Lagoon offers lagoon swimming and sandy beach relaxation alongside a separately ticketed floating Aqua Course.",
      "The operator requires Aqua Course participants to be at least six years old and 42 inches tall, and provides mandatory life jackets.",
      "The advertised Aqua Course sessions run for 30 minutes, with their cost separate from ordinary lagoon admission.",
      "A waterslide appearing on the operator's attractions page is specifically labeled Coming Soon and must not be presented as operating.",
      "Daily swimming/beach admission includes parking, while Shoreline Grill can be accessed without buying a lagoon day ticket."
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-cove-crawford",
    "name": "The Cove at Crawford",
    "visitorAddress": "375 S. Prairie Creek Rd., Dallas, TX 75217",
    "visitorHighlights": [
      "Lazy river and current-channel family recreation",
      "Waterslide, water basketball and climbing wall",
      "Toddler play pool, crossing activity and family changing rooms"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Crawford's large City of Dallas regional aquatic center combines a lazy river, slides, toddler water play, a climbing wall and lap swimming at a separate South Dallas park site.",
    "distinctiveNote": "The 2026 regular public season ended August 9. The operator lists Crawford as closed Tuesdays during summer, so do not rely on an old daily-hours widget for current access.",
    "officialUrl": "https://dallasaquatics.org/Facilities/Facility/Details/The-Cove-at-Crawford-33",
    "visitorFaqs": [
      {
        "question": "Does The Cove at Crawford operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/The-Cove-at-Crawford-33"
      },
      {
        "question": "Which day is The Cove at Crawford regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Tuesdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/The-Cove-at-Crawford-33"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-cove-fretz",
    "name": "The Cove at Fretz Park",
    "visitorAddress": "14778 Hillcrest Rd., Dallas, TX 75254",
    "visitorHighlights": [
      "Lazy river and water crossing activity",
      "Waterslide, diving board and climbing wall",
      "Toddler pool, concessions and shaded gathering areas"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "North Dallas's Cove at Fretz Park features a lazy river, slide and climbing wall, plus an interactive toddler pool and fitness or lap-swim programming on separate schedules.",
    "distinctiveNote": "The City of Dallas says the regular 2026 season ended August 9 and Fretz is closed Wednesdays in that schedule; pool lessons and private rentals are not proof that slides are open.",
    "officialUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Fretz-Aquatic-Center-31",
    "visitorFaqs": [
      {
        "question": "Does The Cove at Fretz Park operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Fretz-Aquatic-Center-31"
      },
      {
        "question": "Which day is The Cove at Fretz Park regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Wednesdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Fretz-Aquatic-Center-31"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-cove-samuell-grand",
    "name": "The Cove at Samuell Grand",
    "visitorAddress": "3201 Samuell Blvd., Dallas, TX 75223",
    "visitorHighlights": [
      "Lazy river and open family water play",
      "Waterslide, water basketball and crossing feature",
      "Toddlers' play pool and accessible family changing rooms"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "The Cove at Samuell Grand is the regional water-recreation complex in East Dallas with a lazy river, multiple water-play features, slides and dedicated toddler facilities.",
    "distinctiveNote": "The official 2026 site lists Thursdays as the regular closed day and August 9 as the end of the regular season. Samuell Grand Recreation Center hours are not aquatic park ride hours.",
    "officialUrl": "https://www.dallasaquatics.org/facilities/facility/details/The-Cove-at-Samuell-Grand-32",
    "visitorFaqs": [
      {
        "question": "Does The Cove at Samuell Grand operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://www.dallasaquatics.org/facilities/facility/details/The-Cove-at-Samuell-Grand-32"
      },
      {
        "question": "Which day is The Cove at Samuell Grand regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Thursdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://www.dallasaquatics.org/facilities/facility/details/The-Cove-at-Samuell-Grand-32"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-bachman-aquatic",
    "name": "Bachman Aquatic Center",
    "visitorAddress": "2750 Bachman Dr., Dallas, TX 75220",
    "visitorHighlights": [
      "Lazy river, slide and crossing activity",
      "Climbing wall, diving board and water basketball",
      "Toddler pool, accessible features and family changing rooms"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Bachman Aquatic Center has a current-channel family play area, slides, climbing wall and toddler pool near Bachman Lake, separate from the adjacent indoor swimming pool.",
    "distinctiveNote": "Bachman's municipal 2026 outdoor season started a week ahead of the smaller Dallas centers and ended August 9; its outdoor center closes Mondays. The indoor pool is a different facility.",
    "officialUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Bachman-Aquatic-Center-47",
    "visitorFaqs": [
      {
        "question": "Does Bachman Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 23–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Bachman-Aquatic-Center-47"
      },
      {
        "question": "Which day is Bachman Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Mondays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Bachman-Aquatic-Center-47"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-kidd-springs-aquatic",
    "name": "Kidd Springs Aquatic Center",
    "visitorAddress": "807 W. Canty St., Dallas, TX 75203",
    "visitorHighlights": [
      "Outdoor waterslide and interactive toddler pool",
      "Climbing wall, diving board and water basketball",
      "Family changing room and shaded picnic space"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "In Dallas's Oak Cliff area, Kidd Springs offers public summer slides, climbing-wall recreation, a toddler water-play area and separate lap or learn-to-swim programming.",
    "distinctiveNote": "The City's 2026 listing places Kidd Springs in the community aquatic tier, with Mondays closed and the regular public season ending August 9. Do not confuse swim-team practice with open-slide hours.",
    "officialUrl": "https://dallasaquatics.org/facilities/facility/details/Kidd-Springs-Aquatic-Center-41",
    "visitorFaqs": [
      {
        "question": "Does Kidd Springs Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/facilities/facility/details/Kidd-Springs-Aquatic-Center-41"
      },
      {
        "question": "Which day is Kidd Springs Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Mondays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/facilities/facility/details/Kidd-Springs-Aquatic-Center-41"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-lake-highlands-north-aquatic",
    "name": "Lake Highlands North Aquatic Center",
    "visitorAddress": "9400 Church Rd., Dallas, TX 75238",
    "visitorHighlights": [
      "Outdoor flume-style waterslide and toddler pool",
      "Climbing wall and diving board",
      "Water basketball, concessions and family changing rooms"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Lake Highlands North's municipal aquatic center has an outdoor slide, children's interactive area, climbing wall and lap pool with separate program time blocks.",
    "distinctiveNote": "The operator lists Thursdays closed and August 9 as the 2026 regular season's last date. A separate free Lake Highlands North sprayground is a different facility and is not duplicated in this guide.",
    "officialUrl": "https://dallasaquatics.org/facilities/facility/details/Lake-Highlands-North-Aquatic-Center-42",
    "visitorFaqs": [
      {
        "question": "Does Lake Highlands North Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/facilities/facility/details/Lake-Highlands-North-Aquatic-Center-42"
      },
      {
        "question": "Which day is Lake Highlands North Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Thursdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/facilities/facility/details/Lake-Highlands-North-Aquatic-Center-42"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-exline-aquatic",
    "name": "Exline Neighborhood Aquatic Center",
    "visitorAddress": "2530 Eugene St., Dallas, TX 75215",
    "visitorHighlights": [
      "Neighborhood-scale outdoor pool and slide",
      "Toddler pool with interactive water-play area",
      "Water basketball, optional climbing wall and picnic spaces"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Exline is a smaller South Dallas neighborhood aquatic center, with a family slide, children's pool, summer recreation and swim classes rather than a large destination lazy river.",
    "distinctiveNote": "The city's 2026 listing marks Tuesdays closed during its May 30–August 9 summer season. The municipal feature list labels some amenities optional, so ask staff about slide operation.",
    "officialUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Exline-Aquatic-Center-44",
    "visitorFaqs": [
      {
        "question": "Does Exline Neighborhood Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Exline-Aquatic-Center-44"
      },
      {
        "question": "Which day is Exline Neighborhood Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Tuesdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://www.dallasaquatics.org/Facilities/Facility/Details/Exline-Aquatic-Center-44"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-harry-stone-aquatic",
    "name": "Harry Stone Neighborhood Aquatic Center",
    "visitorAddress": "2403 Millmar Dr., Dallas, TX 75228",
    "visitorHighlights": [
      "Neighborhood-scale slide and swimming pool",
      "Toddler water-play area and water basketball",
      "Picnic shelters and seasonal family aquatics"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Harry Stone offers East Dallas neighborhood-scale family water recreation with an outdoor slide, toddler area and summer swim programming; it is not a standalone major theme park.",
    "distinctiveNote": "The city's seasonal listing shows Mondays closed and the regular 2026 season ending August 9. Some items in the official feature list are optional; check specific ride availability.",
    "officialUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Harry-Stone-Aquatic-Center-46",
    "visitorFaqs": [
      {
        "question": "Does Harry Stone Neighborhood Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Harry-Stone-Aquatic-Center-46"
      },
      {
        "question": "Which day is Harry Stone Neighborhood Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Mondays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Harry-Stone-Aquatic-Center-46"
      }
    ]
  },
  {
    "city": "Dallas",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "reviewedAt": "2026-10-17",
    "slug": "dallas-tietze-aquatic",
    "name": "Tietze Neighborhood Aquatic Center",
    "visitorAddress": "6115 Llano Ave., Dallas, TX 75206",
    "visitorHighlights": [
      "Seasonal outdoor pool with flume-style slide",
      "Toddler pool, climbing wall and water basketball",
      "Concessions, family changing rooms and shade structures"
    ],
    "admission": "City of Dallas seasonal daily admission; resident rates require proof of Dallas city residence",
    "summary": "Tietze Aquatic Center combines a compact family waterslide, toddler water play, climbing wall and a separate swimming area in a smaller Dallas city aquatic setting.",
    "distinctiveNote": "The Dallas operator lists Tuesdays closed during its May 30–August 9 regular 2026 summer season; do not confuse this rebuilt aquatic center with the separate Tietze lap pool.",
    "officialUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Tietze-Aquatic-Center-43",
    "visitorFaqs": [
      {
        "question": "Does Tietze Neighborhood Aquatic Center operate year-round?",
        "answer": "No. The official City of Dallas facility page lists its regular 2026 outdoor season as May 30–August 9; verify the next season's calendar rather than assuming rides run in October.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Tietze-Aquatic-Center-43"
      },
      {
        "question": "Which day is Tietze Neighborhood Aquatic Center regularly closed during the summer?",
        "answer": "Its published 2026 summer schedule shows Tuesdays closed. Check special programs, private rentals and seasonal changes before visiting.",
        "sourceUrl": "https://dallasaquatics.org/Facilities/Facility/Details/Tietze-Aquatic-Center-43"
      }
    ]
  },
  {
    "slug": "burgers-lake-fort-worth",
    "name": "Burger's Lake",
    "city": "Fort Worth",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Destination park",
    "admission": "Ticketed spring-fed swimming park; Great White Slides require a separate paid slide pass",
    "reviewedAt": "2026-10-17",
    "summary": "Fort Worth's historic spring-fed swimming and recreation park has a sandy shore, multiple diving boards, traditional slides and a separate launch-slide attraction called the Great White Slides.",
    "distinctiveNote": "The operator lists 2026 weekend operation until Labor Day. The Great White Slides need an add-on pass, a signed waiver, a rider at least 48 inches tall and a life jacket even for strong swimmers; ordinary entry does not include those launch slides.",
    "officialUrl": "https://burgerslake.com/",
    "visitorAddress": "1200 Meandering Road, Fort Worth, TX 76114",
    "visitorHighlights": [
      "Spring-fed swim lake, sandy beachfront and six separate diving boards",
      "Three traditional slides, kids splash pad and group picnic/grilling areas",
      "Great White launch slides separately ticketed with height and flotation rules"
    ],
    "visitorFaqs": [
      {
        "question": "Are Burger's Lake's Great White Slides included with general admission?",
        "answer": "No. The operator lists an additional all-day slide pass on top of general admission; its season pass also excludes the Great White Slides.",
        "sourceUrl": "https://burgerslake.com/"
      },
      {
        "question": "What are the requirements to ride the Great White Slides?",
        "answer": "Riders must be at least 48 inches tall, wear a provided life jacket, ride feet first and sign a waiver; a guardian must be present to sign for minors.",
        "sourceUrl": "https://burgerslake.com/the-great-white-slides"
      }
    ]
  },
  {
    "slug": "thompson-park-amarillo",
    "name": "Thompson Park Pool Family Water Park",
    "city": "Amarillo",
    "county": "Potter",
    "region": "Panhandle",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Amarillo Parks & Recreation seasonal pool admission and season pass; city child supervision and clear-bag policies apply",
    "reviewedAt": "2026-10-17",
    "summary": "Amarillo's Thompson Park Pool is a substantial public water-play complex with a lazy river, two runout slides, zero-depth entry, toddler splash area, shade shelters and concessions.",
    "distinctiveNote": "The City of Amarillo's 2026 schedule runs daily May 23 through August 16, then weekends through September 7. The separate Southeast and Southwest municipal pools were closed in 2026 for structural assessment; do not treat them as substitutes.",
    "officialUrl": "https://www.amarilloparks.org/programs-events/aquatics/pools/thompson-pool",
    "visitorAddress": "3500 E. Chaparral, Amarillo, TX 79107",
    "visitorHighlights": [
      "Lazy river and two runout waterslides in a seasonal outdoor city pool",
      "Zero-depth family entry with toddler splash area and sun shelf deck",
      "Shade shelters, lifejackets, lockers, concessions and an ADA pool lift"
    ],
    "visitorFaqs": [
      {
        "question": "When did Thompson Park Pool's 2026 season end?",
        "answer": "Amarillo posted everyday public operation May 23 to August 16 and weekend-only operation August 17 to Labor Day, September 7; confirm next year's dates with the city.",
        "sourceUrl": "https://www.amarilloparks.org/programs-events/aquatics/pools/thompson-pool"
      },
      {
        "question": "Can families bring outside food or ordinary bags?",
        "answer": "The City of Amarillo posts a clear-bag rule and prohibits outside food or beverages; consult the facility's current rules before packing.",
        "sourceUrl": "https://www.amarilloparks.org/home/showpublisheddocument/37435/638527696660830000"
      }
    ]
  },
  {
    "slug": "adamson-lagoon-college-station",
    "name": "Adamson Lagoon Pool",
    "city": "College Station",
    "county": "Brazos",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal City of College Station day admission and optional multi-swim passes; current 2026 schedule has ended",
    "reviewedAt": "2026-10-17",
    "summary": "The City of College Station describes Adamson Lagoon as a tropical-themed miniature water park, with an Olympic-size pool, two large waterslides, a separate baby pool, bathhouse and concessions.",
    "distinctiveNote": "The City listed weekend operations August 15–September 7, 2026 for late summer. A proposed October 2026 capital project involving new replacement slides is a future improvement; only the two existing water slides are verified for the 2026 visitor guide.",
    "officialUrl": "https://www.cstx.gov/parks-recreation-culture/swimming-and-aquatics/",
    "visitorAddress": "1900 Anderson Street, College Station, TX",
    "visitorHighlights": [
      "Two large outdoor water slides and an Olympic-size swimming pool",
      "Separate baby pool and tropical-themed miniature-waterpark setting",
      "Lifeguarded seasonal public admission with bathhouse and concessions"
    ],
    "visitorFaqs": [
      {
        "question": "How many Adamson Lagoon waterslides are confirmed in 2026?",
        "answer": "The City of College Station's 2026 visitor directory describes two large existing waterslides. New slides mentioned in a later municipal capital proposal should not be presented as already open.",
        "sourceUrl": "https://www.cstx.gov/parks-recreation-culture/swimming-and-aquatics/"
      },
      {
        "question": "Does the City of College Station require an adult to accompany children?",
        "answer": "Its posted pool rules require guests younger than 14 to be accompanied by a guardian older than 18, with close adult supervision for children who cannot swim independently.",
        "sourceUrl": "https://www.cstx.gov/parks-recreation-culture/swimming-and-aquatics/"
      }
    ]
  },
  {
    "slug": "calypso-cove-baytown",
    "name": "Calypso Cove",
    "city": "Baytown",
    "county": "Harris",
    "region": "Houston area",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal City of Baytown pay-at-gate admission; separate from Pirates Bay Waterpark",
    "reviewedAt": "2026-10-17",
    "summary": "Calypso Cove is Baytown's family-oriented water-play venue inside N. C. Foote Park, offering waterslides, play zones, pool recreation and private rentals distinct from the larger Pirates Bay attraction.",
    "distinctiveNote": "The Baytown operator states the 2026 season is now closed. The venue lists discounted weekday admission, separate higher weekend entry, and paid cooler permits; even guests who are not swimming need a ticket.",
    "officialUrl": "https://baytownpiratesbay.com/calypso-cove/",
    "visitorAddress": "2428 W. Main Street, Baytown, TX 77520",
    "visitorHighlights": [
      "Family waterslides and shallow play areas at N. C. Foote Park",
      "Separate affordable City of Baytown pool admission from Pirates Bay",
      "Private evening rentals and operator-provided first-come lifejackets"
    ],
    "visitorFaqs": [
      {
        "question": "Is Calypso Cove part of Pirates Bay's same physical water park?",
        "answer": "No. Calypso Cove is at N. C. Foote Park on W. Main Street and has its own venue page and gate admission; Pirates Bay is a different Baytown facility.",
        "sourceUrl": "https://baytownpiratesbay.com/calypso-cove/"
      },
      {
        "question": "Is parking free and can visitors bring a cooler?",
        "answer": "The operator lists free parking and a separate cooler-ticket charge for qualifying personal coolers; glass, alcohol and certain outside food are restricted.",
        "sourceUrl": "https://baytownpiratesbay.com/calypso-cove/"
      }
    ]
  },
  {
    "slug": "champions-club-southlake",
    "name": "Champions Club Indoor Aquatics Center",
    "city": "Southlake",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Indoor",
    "kind": "Indoor public park",
    "admission": "City of Southlake Champions Club membership, visitor or eligible day pass; confirm slide access and visitor eligibility with operator",
    "reviewedAt": "2026-10-17",
    "summary": "Southlake's climate-controlled Champions Club Aquatics Center pairs two timed racing waterslides with a resistance river, zero-depth toddler pool, lap lanes, spa and family activity area.",
    "distinctiveNote": "Current Southlake schedules distinguish open swim from slide hours; published fall slide sessions are substantially shorter than the building's fitness hours. Confirm nonmember admission before visiting; the operator posts child-supervision requirements.",
    "officialUrl": "https://www.experiencesouthlaketexas.com/359/Aquatics",
    "visitorAddress": "285 Shady Oaks Drive, Southlake, TX 76092",
    "visitorHighlights": [
      "Two timed racing waterslides in an indoor leisure pool facility",
      "Resistance river and shallow toddler play pool separate from the lap lanes",
      "Distinct fall open-swim and slide time windows with posted child-supervision rules"
    ],
    "visitorFaqs": [
      {
        "question": "Do Champions Club's waterslides operate the entire time its pool is open?",
        "answer": "No. The City of Southlake maintains a separate water-slide calendar. Its current fall schedule lists shorter slide sessions than the open-swim hours and early-morning fitness access.",
        "sourceUrl": "https://www.experiencesouthlaketexas.com/500/Aquatic-Center-Hours"
      },
      {
        "question": "Does Champions Club have both a toddler play area and an indoor river?",
        "answer": "Yes. The city's Aquatics Center amenity listing confirms a shallow toddler pool, a resistance river, dedicated lap lanes and dual racing slides.",
        "sourceUrl": "https://www.experiencesouthlaketexas.com/359/Aquatics"
      }
    ]
  },
  {
    "slug": "mcdonald-ymca-fort-worth",
    "name": "William M. McDonald YMCA Outdoor Water Park",
    "city": "Fort Worth",
    "county": "Tarrant",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Community water park",
    "admission": "Seasonal YMCA outdoor water-park access; membership, rentals and guest/day-pass eligibility must be checked directly",
    "reviewedAt": "2026-10-17",
    "summary": "The YMCA of Fort Worth's William M. McDonald center operates a seasonal outdoor water-park pool, with slides and family play areas distinct from its gym, walking track and indoor community programs.",
    "distinctiveNote": "The current YMCA facility page confirms a seasonal outdoor water park but does not guarantee public walk-in entry for nonmembers. Its own rental documentation shows a slide tower and summer pool parties, subject to seasonal reservations and availability.",
    "officialUrl": "https://ymcafw.org/locations/mcdonald/",
    "visitorAddress": "2701 Moresby Street, Fort Worth, TX 76105",
    "visitorHighlights": [
      "Seasonal YMCA outdoor water-park section separate from gym and playhouse",
      "Outdoor twisting slide structure shown in the YMCA operator's rental packet",
      "Reservation-based summer pool parties and group water-play programming"
    ],
    "visitorFaqs": [
      {
        "question": "Can nonmembers buy a walk-in day ticket at William M. McDonald YMCA?",
        "answer": "The facility page confirms the seasonal outdoor water park but does not publish unconditional general-public walk-in terms. Check the YMCA directly for current guest passes or authorized rentals.",
        "sourceUrl": "https://ymcafw.org/locations/mcdonald/"
      },
      {
        "question": "Are year-round YMCA building hours the same as the outdoor waterpark's?",
        "answer": "No. The operator describes the water park as seasonal; its regular weekday and weekend building-hours listing is not a guarantee of open summer pools or slides.",
        "sourceUrl": "https://ymcafw.org/locations/mcdonald/"
      }
    ]
  },
  {
    "slug": "lions-junction-temple",
    "name": "Lions Junction Family Water Park",
    "city": "Temple",
    "county": "Bell",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal Temple Parks & Recreation water park admission; verify tickets and next season calendar on the city's aquatics portal",
    "reviewedAt": "2026-10-17",
    "summary": "Lions Junction is the City of Temple's named outdoor family water park at the South Fifth Street recreational complex, with public seasonal aquatics and end-of-season community programming.",
    "distinctiveNote": "The City of Temple's August 2026 release confirms that its September 12 Dunkin' Doggies event marked the close of the season; during that dog-only event humans were not permitted in the water. Individual rides and 2027 admission were not separately verified.",
    "officialUrl": "https://city-of-temple.prowly.com/468828-city-of-temple-parks-recreation-closes-out-summer-with-dunkin-doggies",
    "visitorAddress": "5000 S. 5th Street, Temple, TX",
    "visitorFaqs": [
      {
        "question": "Was Lions Junction Family Water Park operating for Temple's 2026 season?",
        "answer": "Yes. Temple Parks & Recreation's August 2026 release specifically identifies Lions Junction as its family water park and explains the end-of-season event at that venue.",
        "sourceUrl": "https://city-of-temple.prowly.com/468828-city-of-temple-parks-recreation-closes-out-summer-with-dunkin-doggies"
      },
      {
        "question": "Could people swim during the September 12, 2026 Dunkin' Doggies event?",
        "answer": "No. The City of Temple said its September 12 end-of-season event was reserved for dogs and that human swimmers were not allowed in the water attractions.",
        "sourceUrl": "https://city-of-temple.prowly.com/468828-city-of-temple-parks-recreation-closes-out-summer-with-dunkin-doggies"
      }
    ],
    "visitorHighlights": [
      "Lions Junction is a City of Temple seasonal family waterpark at 5000 South 5th Street, not an indoor year-round leisure pool.",
      "Temple Parks and Recreation officially confirmed the facility operated during summer 2026.",
      "The city used Lions Junction for a special end-of-season Dunkin' Doggies event on September 12, 2026.",
      "At that September event the pool and water-play features were reserved for dogs, and city instructions expressly disallowed people in the water.",
      "Specific slide types, height restrictions and waterpark feature inventories remain unverified by the city release; do not list imagined attractions."
    ]
  },
  {
    "slug": "irving-cimarron-family-aquatic",
    "name": "Cimarron Family Aquatic Center",
    "city": "Irving",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Seasonal City of Irving public swim admission; verify resident and nonresident prices with Irving Aquatics",
    "summary": "Cimarron Family Aquatic Center near Cimarron Park combines a zero-depth family swimming area, aquatic playground, water slides and waterfall with a separate five-lane lap pool.",
    "distinctiveNote": "The Irving operator page says its 2026 outdoor season has ended and the facility is scheduled for summer 2027. A temporary mechanical closure earlier in summer 2026 was followed by an announced July reopening; do not treat that old alert as a permanent closure.",
    "officialUrl": "https://irvingtx.gov/cimarron-family-aquatic-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "199 Red River Trail, Irving, TX 75063",
    "visitorHighlights": [
      "Family splash pool and aquatic play area with zero-depth entry",
      "Water slides and waterfall alongside a separate five-lane lap pool",
      "Water wheelchairs, locker rooms with showers and on-site concessions"
    ],
    "visitorFaqs": [
      {
        "question": "Is Cimarron Family Aquatic Center open in October 2026?",
        "answer": "No. The City of Irving lists this outdoor family aquatic center as closed for the 2026 season and expects it to reopen for summer 2027; confirm next season's opening announcement.",
        "sourceUrl": "https://irvingtx.gov/cimarron-family-aquatic-center"
      },
      {
        "question": "Can younger children use the water slides at Cimarron?",
        "answer": "The city lists a slide minimum of 48 inches tall or passing the swim test, along with a 300-pound rider weight limit and no flotation devices on the slide. Check the lifeguard's instructions when you arrive.",
        "sourceUrl": "https://irvingtx.gov/cimarron-family-aquatic-center"
      },
      {
        "question": "Does Cimarron offer accessible aquatic facilities?",
        "answer": "The City of Irving lists accessible facility features and water wheelchairs at Cimarron. Contact Irving Aquatics in advance to confirm the specific entry and assistance arrangements needed by your group.",
        "sourceUrl": "https://irvingtx.gov/cimarron-family-aquatic-center"
      }
    ]
  },
  {
    "slug": "irving-west-aquatic-center",
    "name": "West Irving Aquatic Center",
    "city": "Irving",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Outdoor seasonal public aquatic admission, with current day fees maintained by City of Irving Aquatics",
    "summary": "West Irving Aquatic Center is a city-operated summer water-play complex combining a zero-depth entry splash pool, children's water playground and slides with a separate five-lane swimming pool.",
    "distinctiveNote": "The city's visitor page confirms West Irving has closed for the 2026 outdoor season and is expected to reopen for summer 2027. Weather and lightning can close the pool temporarily, with no rain checks on the posted policy.",
    "officialUrl": "https://irvingtx.gov/west-irving-aquatic-center",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "3701 Conflans Road, Irving, TX 75061",
    "visitorHighlights": [
      "Public family-water-play area with zero-depth entry and spray features",
      "Water slides and a separate five-lane lap pool for swimming",
      "Accessible facilities and water wheelchairs, plus changing rooms and concessions"
    ],
    "visitorFaqs": [
      {
        "question": "When will West Irving Aquatic Center reopen?",
        "answer": "The city labels the facility closed for the 2026 season and indicates a planned summer 2027 reopening. No specific opening day is guaranteed; consult Irving Aquatics before planning the trip.",
        "sourceUrl": "https://irvingtx.gov/west-irving-aquatic-center"
      },
      {
        "question": "Can visitors take food and coolers into the park?",
        "answer": "According to Irving's facility rules, food and coolers are allowed at outdoor family aquatic parks, but glass and alcohol are prohibited. The city also notes cooler inspections and a possible fee for oversized coolers.",
        "sourceUrl": "https://irvingtx.gov/west-irving-aquatic-center"
      },
      {
        "question": "Are the water slides suitable for small children?",
        "answer": "Slide riders must generally be at least 48 inches tall or pass a swim test. The city also prohibits flotation devices on slides and requires one feet-first rider at a time, so check the rules before arrival.",
        "sourceUrl": "https://irvingtx.gov/west-irving-aquatic-center"
      }
    ]
  },
  {
    "slug": "irving-lee-aquatic-park",
    "name": "Lee Aquatic Park",
    "city": "Irving",
    "county": "Dallas",
    "region": "Dallas–Fort Worth",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City of Irving public seasonal pool admission; verify fees and seasonal sessions directly",
    "summary": "Lee Aquatic Park offers family water play with a zero-depth entry splash pool, interactive aquatic playground and water slides, alongside separate lap lanes in northwest Irving.",
    "distinctiveNote": "Lee Aquatic Park extended its 2026 public season to selected September weekends, unlike some Irving pools. That promotion is over; do not treat an old September schedule as proof of October operation.",
    "officialUrl": "https://irvingtx.gov/lee-aquatic-park",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "3000 Pamela Drive, Irving, TX 75062",
    "visitorHighlights": [
      "Children's water playground and splash-pool zone with zero-depth entry",
      "Water slides plus separate swimming lanes and on-site changing facilities",
      "Accessible aquatics amenities; operator lists complementary life jackets"
    ],
    "visitorFaqs": [
      {
        "question": "Was Lee Aquatic Park open later than the other Irving summer pools?",
        "answer": "Yes. The City of Irving announced weekend swimming sessions through September 2026 at Lee Aquatic Park. Those were temporary seasonal hours, not a year-round reopening.",
        "sourceUrl": "https://irvingtx.gov/lee-aquatic-park"
      },
      {
        "question": "What rules apply to children and slides?",
        "answer": "The city requires adult supervision for children under 12 and close, within-arm's-reach supervision of younger swimmers. Slides generally require a height of at least 48 inches or a passed swim test.",
        "sourceUrl": "https://irvingtx.gov/lee-aquatic-park"
      },
      {
        "question": "Does Lee Aquatic Park provide life jackets and accessibility help?",
        "answer": "The City of Irving says life jackets are available free of charge and that accessible entry options exist. Contact staff ahead of time to confirm accommodations and equipment availability for a particular visit.",
        "sourceUrl": "https://irvingtx.gov/lee-aquatic-park"
      }
    ]
  },
  {
    "slug": "san-angelo-municipal-pool",
    "name": "San Angelo Municipal Pool Water Slides",
    "city": "San Angelo",
    "county": "Tom Green",
    "region": "West Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Public City of San Angelo pool admission; 2026 published rates $6 ages 3–64, $4 seniors 65+, free ages two and younger",
    "summary": "San Angelo Municipal Pool is an outdoor public recreation pool with two substantial waterslides, family swimming, seasonal day admission and rentable shaded table and umbrella spaces.",
    "distinctiveNote": "The city's June 22, 2026 announcement confirms the facility reopened after a delayed start caused by repairs. Its posted season ended in August; the webpage's summer operating hours do not mean rides are operating in October.",
    "officialUrl": "https://www.sanangelo.gov/facilities/facility/details/Municipal-Pool-4",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "18 E Avenue A, San Angelo, TX 76903",
    "visitorHighlights": [
      "Two separate municipal water slides, each subject to a 48-inch minimum rider height",
      "Outdoor seasonal family swimming with public day admission and posted occupancy limit",
      "Party rental availability and shaded umbrella-and-table rentals under city supervision"
    ],
    "visitorFaqs": [
      {
        "question": "Can children shorter than 48 inches ride the San Angelo pool slides?",
        "answer": "No. The City of San Angelo lists a minimum height of 48 inches for either of the pool's two water slides. Confirm updated rules with lifeguards before arriving.",
        "sourceUrl": "https://www.sanangelo.gov/facilities/facility/details/Municipal-Pool-4"
      },
      {
        "question": "Is the Municipal Pool water park open in October?",
        "answer": "The 2026 city season ended in August. The June 22, 2026 city announcement documented delayed seasonal reopening after repairs, but it does not establish slide operating hours in October or a 2027 opening date.",
        "sourceUrl": "https://www.sanangelo.gov/m/NewsFlash/Home/Detail/210"
      },
      {
        "question": "Does the City of San Angelo Municipal Pool accept cash?",
        "answer": "No. The city explicitly lists credit and debit cards as its only accepted on-site payment methods in the 2026 visitor guidance. It also disallows outside food and drinks.",
        "sourceUrl": "https://www.sanangelo.gov/facilities/facility/details/Municipal-Pool-4"
      }
    ]
  },
  {
    "slug": "bill-witt-aquatic-center-corpus-christi",
    "name": "Bill Witt Aquatic Center",
    "city": "Corpus Christi",
    "county": "Nueces",
    "region": "Gulf Coast",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "City of Corpus Christi public swim admission; city publishes free admission at all municipal pools, check any reservation fees separately",
    "summary": "Bill Witt Aquatic Center is a city-operated summer aquatics complex with two large water slides, a beach-entry family leisure pool with interactive play features, and a separate ten-lane competition pool.",
    "distinctiveNote": "The City of Corpus Christi places Bill Witt in its summer-only pool list, separate from year-round Collier Pool and the Natatorium. Free standard city pool admission does not guarantee slides are available outside the summer operating season.",
    "officialUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/parks-and-facilities/pools/",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "6809 Yorktown Boulevard, Corpus Christi, TX 78414",
    "visitorHighlights": [
      "Two large outdoor water slides connected with seasonal municipal family aquatics",
      "Separate beach-entry leisure pool with interactive play features and shaded areas",
      "Ten-lane 25-meter pool for lap swimming and hosted meets with locker facilities"
    ],
    "visitorFaqs": [
      {
        "question": "Is Bill Witt open for water-slide swimming during fall and winter?",
        "answer": "Not under the normal city pool schedule: Bill Witt is explicitly listed as a summer pool. The current fall-to-spring municipal calendar is for year-round facilities. Verify any exceptions before visiting.",
        "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/parks-and-facilities/pools/"
      },
      {
        "question": "Does Bill Witt Aquatic Center charge the usual city swim admission?",
        "answer": "The City of Corpus Christi's aquatics page advertises free pool admission at city pools. That describes ordinary public swim; call the aquatics department about rentals, reservations or special events.",
        "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/parks-and-facilities/pools/"
      },
      {
        "question": "Is Bill Witt just a lap-swimming pool?",
        "answer": "No. The city's facility overview identifies a separate leisure pool with beach-inspired entry and interactive water features, as well as two large slides and the competition pool.",
        "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/parks-and-facilities/pools/"
      }
    ]
  },
  {
    "slug": "bartholomew-pool-austin",
    "name": "Bartholomew Pool Water Slides",
    "city": "Austin",
    "county": "Travis",
    "region": "Central Texas",
    "setting": "Outdoor",
    "kind": "Municipal water park",
    "admission": "Fee-charging City of Austin aquatic facility; posted seasonal admission applies, confirm current slide/play-water session access",
    "summary": "Bartholomew Pool in Austin combines recreational and activity pools, a shallow zero-entry wading area, water slides and lily-pad play activities alongside year-round lap swimming.",
    "distinctiveNote": "Austin Parks and Recreation states that slides, wading pool and activity/recreation pools are closed October 1, 2026 through March 12, 2027. The lap pool remains open: this does NOT mean the water-park attractions are available during winter.",
    "officialUrl": "https://www.austintexas.gov/parks/locations/bartholomew-pool",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1800 E. 51st St., Austin, TX 78723",
    "visitorHighlights": [
      "Water slides and an activity/recreational swimming area during eligible staffed seasons",
      "Zero-depth family wading pool and seasonal lily-pad water-play features",
      "Accessible aquatic entry options including chair lift and ADA stairs"
    ],
    "visitorFaqs": [
      {
        "question": "Can visitors use Bartholomew Pool slides in October 2026?",
        "answer": "No. The City of Austin lists both slides and recreation/activity pools as closed from October 1, 2026 through March 12, 2027. Only lap swimming is listed as available during that interval.",
        "sourceUrl": "https://www.austintexas.gov/parks/locations/bartholomew-pool"
      },
      {
        "question": "Are slides and lily pads always open whenever the pool is open?",
        "answer": "No. Austin's official facility page warns that water slides, lily pads and wading amenities depend on sufficient lifeguard staffing and may close independently of lap-pool hours.",
        "sourceUrl": "https://www.austintexas.gov/parks/locations/bartholomew-pool"
      },
      {
        "question": "What accessible water entry does Bartholomew Pool provide?",
        "answer": "Austin Parks and Recreation lists a chair lift and ADA stairs at this facility. Contact the city about current equipment availability and additional mobility needs before visiting.",
        "sourceUrl": "https://www.austintexas.gov/parks/locations/bartholomew-pool"
      }
    ]
  },
  {
    "slug": "flower-mound-cac-water-park",
    "name": "Flower Mound Community Activity Center Water Park",
    "city": "Flower Mound",
    "county": "Denton",
    "region": "Dallas–Fort Worth",
    "setting": "Both",
    "kind": "Municipal water park",
    "admission": "Community Activity Center swim day pass or applicable membership; special parties and cooler entry have separate policies",
    "summary": "Flower Mound Community Activity Center combines a seasonal outdoor municipal water park with indoor recreational swimming that includes a slide, diving board and aqua-climbing walls on scheduled play-swim sessions.",
    "distinctiveNote": "Flower Mound's town schedule separates indoor play-swim hours from the outdoor water park season, which usually runs Memorial Day to Labor Day. A special September 26, 2026 dog-swim event at the outdoor water park is not proof of general October guest access.",
    "officialUrl": "https://www.flower-mound.com/cachours",
    "reviewedAt": "2026-10-17",
    "visitorAddress": "1200 Gerault Road, Flower Mound, TX 75028",
    "visitorHighlights": [
      "Outdoor seasonal water park with designated shade pavilions and party access",
      "Indoor recreational swimming with a slide, diving board and aqua-climbing walls",
      "Distinct posted hours for lap lanes, indoor play swimming and the outdoor summer water park"
    ],
    "visitorFaqs": [
      {
        "question": "Does Flower Mound's outdoor water park stay open year-round?",
        "answer": "No. The Town of Flower Mound says the outdoor water park follows the school summer calendar, generally Memorial Day through Labor Day. The indoor pool has separate, more extensive operating hours.",
        "sourceUrl": "https://www.flower-mound.com/cachours"
      },
      {
        "question": "Can visitors use the indoor slide whenever the indoor pool is open?",
        "answer": "Not necessarily. The published CAC indoor pool calendar separates lap-lane hours from play-swim hours when the slide and climbing walls are available. Confirm the specific session before travelling.",
        "sourceUrl": "https://www.flower-mound.com/cachours"
      },
      {
        "question": "Is the outdoor water park at the same site as the Community Activity Center?",
        "answer": "Yes. Flower Mound lists the outdoor park and shaded party pavilions at the Community Activity Center at 1200 Gerault Road, distinct from free spray-only neighborhood splash pads.",
        "sourceUrl": "https://www.flower-mound.com/birthdayparty"
      }
    ]
  }
];
export const texasWaterParksBySlug = new Map(texasWaterParks.map((park) => [park.slug, park]));
export const texasWaterParkRegions = [...new Set(texasWaterParks.map((park) => park.region))].sort();
export const waterParkRoute = (slug: string) => `/explore/water-parks/${slug}`;
