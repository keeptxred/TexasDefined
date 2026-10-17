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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "400 N. Liberty Ave., New Braunfels, TX 78130",
    "visitorHighlights": [
      "The operator lists Master Blaster, Boogie Bahn Inland Surf Ride and Dragon's Revenge among its signature attractions; confirm individual ride operation on your visit date.",
      "The waterpark's main visitor entrance is 400 N. Liberty Avenue, whereas the resort check-in office uses a separate address at 305 W. Austin Street.",
      "The operator publishes a park-and-parking map and identifies free general parking, with optional separately priced preferred parking.",
      "Schlitterbahn spans separate park sections; the operator describes free trams linking original and east sections, so choose a starting area deliberately."
    ],
    "visitorFaqs": [
      {
        "question": "Where should day visitors park versus resort guests?",
        "answer": "Use the waterpark's 400 N. Liberty Avenue main entrance for the day park. The separately listed resort office and check-in are at 305 W. Austin Street; the operator says general parking is free.",
        "sourceUrl": "https://www.sixflags.com/schlitterbahnnewbraunfels/park-map-directions"
      },
      {
        "question": "Can we bring a cooler to Schlitterbahn?",
        "answer": "The operator explicitly welcomes coolers but sets size, content and entry-screening guidelines. Review its current cooler rules rather than assuming every container or item is allowed.",
        "sourceUrl": "https://www.sixflags.com/schlitterbahnnewbraunfels/waterpark-information"
      },
      {
        "question": "Will every water ride run on our visit date?",
        "answer": "No ride lineup is guaranteed. The operator warns that availability can be limited, and directs visitors to the dated operating schedule and current park map before choosing an arrival plan.",
        "sourceUrl": "https://www.sixflags.com/schlitterbahnnewbraunfels/park-map-directions"
      },
      {
        "question": "Is it useful to plan for more than one park section?",
        "answer": "Yes. The venue spans distinct sections rather than a single compact ride cluster, and the operator describes free connecting trams. Start with the rides your group cares about most and check the parking map.",
        "sourceUrl": "https://www.sixflags.com/blog/articles/5-tips-for-making-the-most-of-your-trip-to-schlitterbahn-new-braunfels"
      }
    ]
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "555 Katy Fort Bend Rd., Katy, TX 77494",
    "visitorHighlights": [
      "Lazy T River has three beach-entry points and is distinct from high-thrill attractions such as The Duelin' Daltons.",
      "Typhoon Jr. is a dedicated younger-child slide and splash area, while Tidal Wave Bay and The Snake Pit serve different play and thrill preferences.",
      "The Duelin' Daltons slide group has a posted 48-inch minimum rider height and ride-specific weight limits.",
      "The Houston operator lists free on-site tubes and parking with its advertised day ticket and pass packages; always verify the specific current offer.",
      "Free life jackets are provided at designated stations, while outside tubes and unapproved arm flotation devices are prohibited."
    ],
    "visitorFaqs": [
      {
        "question": "Where is the Houston/Katy water park?",
        "answer": "Use 555 Katy Fort Bend Road in Katy, rather than the operator's separate Austin/Pflugerville location. The location page provides the Houston park telephone number and current operating-calendar link.",
        "sourceUrl": "https://typhoontexas.com/houston/hours-and-location/"
      },
      {
        "question": "May families pack lunch or a cooler?",
        "answer": "Ordinary outside food is not admitted. The operator permits one factory-sealed water bottle per guest, empty refillable bottles, and small personal coolers holding ice and sealed water; medical and allergy accommodations have separate review procedures.",
        "sourceUrl": "https://typhoontexas.com/houston/faq/"
      },
      {
        "question": "Are there attractions specifically for little kids?",
        "answer": "Yes. The park lists Typhoon Jr., Buckaroo Bayou and Howdy Hollow in its Houston attraction collection. Individual junior slides have their own minimum and maximum heights, so compare those rules before promising a child a ride.",
        "sourceUrl": "https://typhoontexas.com/houston/attractions/"
      },
      {
        "question": "What is the policy for children at signature event days?",
        "answer": "The operator states that on designated signature event days, guests age 16 and younger must be accompanied by a responsible adult age 21 or older with valid identification. Confirm whether your chosen day is one of those special events.",
        "sourceUrl": "https://typhoontexas.com/houston/faq/"
      },
      {
        "question": "Can guests bring their own float rings?",
        "answer": "No outside tubes are allowed. The park supplies free life jackets and accepts approved personal life jackets under its published policy; ordinary arm floats do not qualify.",
        "sourceUrl": "https://typhoontexas.com/houston/faq/"
      }
    ]
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "10500 SeaWorld Drive, San Antonio, TX 78251",
    "visitorHighlights": [
      "Aquatica is a separately ticketed water park inside SeaWorld San Antonio's gates, with access via SeaWorld's main parking facilities.",
      "The operator lists Tikitapu Splash, water slides, river and pool areas, and optional paid animal experiences such as stingray encounters.",
      "A formal Ride Accessibility Program is offered through Guest Services; the operator publishes an extensive accessibility guide and ride-specific restrictions.",
      "Outside food and coolers are ordinarily prohibited, with bottled water and certain medical or infant-feeding exceptions; confirm accommodations in advance."
    ],
    "visitorFaqs": [
      {
        "question": "Does a SeaWorld San Antonio ticket get us into Aquatica?",
        "answer": "Not automatically. The operator says regular SeaWorld admission excludes Aquatica; guests need qualifying Aquatica-specific admission, a combined two-park ticket or a pass with the appropriate benefits.",
        "sourceUrl": "https://aquatica.com/san-antonio/faq/"
      },
      {
        "question": "Where do Aquatica visitors park?",
        "answer": "Guests use the main SeaWorld parking lot because Aquatica is located inside SeaWorld's gates. Parking may require a separate purchase unless a qualifying pass includes it.",
        "sourceUrl": "https://aquatica.com/san-antonio/faq/"
      },
      {
        "question": "What is covered by a basic Aquatica ticket?",
        "answer": "The operator says general water attractions, pools and beach areas are included, while cabanas, lockers, meals and merchandise are additional purchases. Check ticket eligibility and capacity for the planned date.",
        "sourceUrl": "https://aquatica.com/san-antonio/faq/"
      },
      {
        "question": "How can someone with access needs plan the park?",
        "answer": "Guest Services administers the Ride Accessibility Program and publishes individualized ride-access criteria, accessible parking information and companion-restroom locations. Review the guide before buying if particular rides matter.",
        "sourceUrl": "https://aquatica.com/san-antonio/guests-with-disabilities/"
      },
      {
        "question": "Can families bring their own meals?",
        "answer": "The park generally disallows outside food, drinks and coolers except water and approved dietary or infant-feeding accommodations. Review the park's official policy and contact the operator about specific health-related needs.",
        "sourceUrl": "https://aquatica.com/san-antonio/faq/"
      }
    ]
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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "23101 State Highway 242, New Caney, TX 77357",
    "visitorHighlights": [
      "Boca Chica Bay wave pool and the Rio GRAND lazy river are separate major attractions, not interchangeable with the dry-park features.",
      "Storm Surge is a group water attraction with a posted 48-inch minimum height and combined-rider weight limit.",
      "Frio Falls is a high-tower waterslide with a published 48-inch minimum rider height.",
      "Gator Splash is an interactive water-play structure with multiple slides and supervised-younger-child rules; specific slide minimums vary.",
      "The park lists Hatchling Hill's small-child slides and says life jackets and lazy-river tubes are provided without an additional rental charge."
    ],
    "visitorFaqs": [
      {
        "question": "What is the address of Big Rivers Waterpark?",
        "answer": "The operator lists Big Rivers Water Park at 23101 State Highway 242 in New Caney, Texas. Confirm navigation to the waterpark entrance rather than another nearby Grand Texas attraction.",
        "sourceUrl": "https://bigriverswaterpark.com/attractions/waterpark/"
      },
      {
        "question": "Are there attractions for very young children?",
        "answer": "Yes. Hatchling Hill includes smaller slides and Gator Splash is an interactive play complex, but the operator publishes distinct height thresholds and requires younger children to be supervised by a responsible person.",
        "sourceUrl": "https://bigriverswaterpark.com/attractions/waterpark/"
      },
      {
        "question": "What are the height requirements for the bigger slides?",
        "answer": "The operator lists a 48-inch minimum height for both Storm Surge and Frio Falls, along with rider or group weight restrictions. Requirements vary across other attractions; review the specific ride rules before visiting.",
        "sourceUrl": "https://bigriverswaterpark.com/attractions/waterpark/"
      },
      {
        "question": "Are tubes and life jackets extra?",
        "answer": "The operator's waterpark attraction guide says lazy-river tubes are free and complimentary life jackets are available for guests. Verify what other rentals or activities cost separately.",
        "sourceUrl": "https://bigriverswaterpark.com/attractions/waterpark/"
      }
    ]
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
    "reviewedAt": "2026-10-17"
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
    ]
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "2970 Epic Place, Grand Prairie, TX 75052",
    "visitorHighlights": [
      "The operator describes an 80,000-square-foot indoor park under a retractable roof; it is not a hotel-only pool.",
      "Lasso Loop, Yellowjacket Drop and a FlowRider surf attraction are part of the operator's featured lineup.",
      "The facility advertises a children's splash area, indoor lazy river and separate on-site arcade.",
      "The park explicitly posts a temporary closure October 13–29, 2026, with a planned reopening October 30 at 10 a.m.; reconfirm before traveling."
    ],
    "visitorFaqs": [
      {
        "question": "Can we visit Epic Waters during October 17–29, 2026?",
        "answer": "No. Epic Waters' current operator notice says the entire waterpark is temporarily closed October 13 through October 29, with a planned Friday, October 30 reopening at 10 a.m. Treat that as planned, not a guarantee.",
        "sourceUrl": "https://epicwatersgp.com/"
      },
      {
        "question": "Should tickets be bought before arriving?",
        "answer": "Yes. The operator's visitor guide recommends purchasing tickets online in advance; admission at the door is not guaranteed and may be subject to higher pricing or capacity limitations.",
        "sourceUrl": "https://epicwatersgp.com/plan/today-at-epic-waters/"
      },
      {
        "question": "Is this a year-round indoor water park?",
        "answer": "The primary facility is indoors under a retractable roof, and its operator markets it as a year-round destination. Temporary maintenance closures and special operating calendars still apply, as the October 2026 closure demonstrates.",
        "sourceUrl": "https://epicwatersgp.com/"
      },
      {
        "question": "What kinds of activities are available beyond slides?",
        "answer": "Epic Waters identifies a FlowRider surf attraction, family splash area, indoor lazy river and an arcade in addition to thrill slides. Confirm activity-specific hours and any extra fees before the trip.",
        "sourceUrl": "https://epicwatersgp.com/"
      }
    ]
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17",
    "visitorAddress": "5300 E. Road, Baytown, TX 77521",
    "visitorHighlights": [
      "The operator lists a lazy river, wave pool, younger-child play structures, FlowRider surf simulation, body slides, Boomerango and four-lane mat racing.",
      "FlowRider and Body Slides list a 42-inch minimum rider height, while Space Bowl and Snap Dragon list 48-inch minimums.",
      "The park's attraction page explicitly marks its Drop Slides temporarily closed because of mechanical issues; do not count them as available rides.",
      "This is the Pirates Bay location at Wayne Gray Sports Complex, distinct from Calypso Cove, another Baytown water-play park with its own admission and policies.",
      "The operator's 2026 season began May 23; the live calendar controls available dates, and its October 2026 listing does not advertise regular operating sessions."
    ],
    "visitorFaqs": [
      {
        "question": "Where is Pirates Bay, and is it the same as Calypso Cove?",
        "answer": "Pirates Bay is at 5300 East Road within Baytown's Wayne Gray Sports Complex. Calypso Cove is a separate Baytown park, so check the exact attraction and admission page before purchasing.",
        "sourceUrl": "https://baytownpiratesbay.com/plan-visit/"
      },
      {
        "question": "Are all of the big slides currently available?",
        "answer": "No. The park's own attraction list marks its Drop Slides as temporarily closed due to mechanical problems. Other slides have posted minimum heights and weight restrictions, and current ride conditions should be checked before arrival.",
        "sourceUrl": "https://baytownpiratesbay.com/attractions/"
      },
      {
        "question": "Can we bring our own food cooler?",
        "answer": "A paid Cooler Ticket or qualifying cooler pass is required for food coolers. The operator's policy caps cooler size at 48 quarts, requires all food and drinks to fit with the lid closed and subjects containers to inspection.",
        "sourceUrl": "https://baytownpiratesbay.com/cooler-pass-policy/"
      },
      {
        "question": "Are life jackets and lockers available?",
        "answer": "The operator says US Coast Guard-approved life jackets are supplied free on a first-come basis. Lockers are offered in more than one park area for a separate daily fee.",
        "sourceUrl": "https://baytownpiratesbay.com/faq/"
      },
      {
        "question": "Can I count on the park being open in October?",
        "answer": "No. Pirates Bay is a seasonal park; its operator's October 2026 calendar currently shows no scheduled public hours. Verify the live calendar and weather notices rather than extrapolating from summer tickets or passes.",
        "sourceUrl": "https://baytownpiratesbay.com/park-hours/"
      }
    ]
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "county": "Harris"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    "reviewedAt": "2026-10-17"
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
    ]
  }
];
export const texasWaterParksBySlug = new Map(texasWaterParks.map((park) => [park.slug, park]));
export const texasWaterParkRegions = [...new Set(texasWaterParks.map((park) => park.region))].sort();
export const waterParkRoute = (slug: string) => `/explore/water-parks/${slug}`;
