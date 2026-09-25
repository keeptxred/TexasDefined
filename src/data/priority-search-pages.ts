import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";

const relatedServices = [
  { label: "Texas resources", href: "/texas-resources" },
  { label: "Find my DMV", href: "/find-my-dmv" },
  { label: "Texas guidebook", href: "/guides" },
  { label: "Texas vs every state", href: "/texas-vs-every-state" },
] as const;

export const PRIORITY_SEARCH_PAGES: Record<string, PrioritySearchPageData> = {
  "texas-fishing-license": {
    eyebrow: "Texas outdoors",
    title: "Texas Fishing License: Requirements, Options and Official Links",
    intro: "What to know before you fish Texas public waters, including freshwater and saltwater endorsements, resident and nonresident options, exceptions, digital licenses and where to buy an official license.",
    updated: "August 20, 2026",
    quickAnswer: "Most people fishing Texas public waters need a current Texas fishing license with the appropriate freshwater or saltwater endorsement unless a statutory exception applies. Texas Parks and Wildlife is the official source for current packages, fees and exceptions.",
    sections: [
      { heading: "Who generally needs a Texas fishing license", paragraphs: ["Texas Parks and Wildlife requires a current license for most people who take or attempt to take fish or other aquatic life from public waters. Resident and nonresident requirements differ, and the Outdoor Annual lists exceptions such as certain age-based and location-based situations."], links: [{ label: "Official TPWD fishing-license requirements", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages", external: true }] },
      { heading: "Freshwater, saltwater and packages", paragraphs: ["The correct package depends on where you fish and your residency status. Freshwater and saltwater endorsements are separate, while all-water and combination packages can cover broader use cases."], links: [{ label: "Fishing licenses and packages", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/fishing-licenses-and-packages", external: true }] },
      { heading: "Where to buy", paragraphs: ["Official licenses can be purchased through Texas Parks and Wildlife's authorized online sales system and at participating license retailers. Verify the current season and identification requirements before purchase."], links: [{ label: "Official online license sales", href: "https://tpwd.texas.gov/business/licenses/online_sales/index.phtml", external: true }, { label: "Texas fishing guide", href: "/fishing" }] },
    ],
    related: [{ label: "Texas fishing", href: "/fishing" }, { label: "Fishing regulations", href: "/fishing/regulations" }, { label: "Texas lakes", href: "/fishing/lakes" }, { label: "Best places to camp in Texas", href: "/best-places-to-go-camping-in-texas" }],
  },
  "texas-drivers-license": {
    eyebrow: "Texas driving",
    title: "Texas Driver License: Renewals, Appointments, REAL ID and Address Changes",
    intro: "A practical Texas driver-license guide covering who runs the system, online services, office appointments, renewals, replacements, REAL ID and address changes.",
    updated: "August 20, 2026",
    quickAnswer: "Texas driver licenses are issued by the Texas Department of Public Safety, not TxDMV. DPS handles driver-license and ID services; TxDMV handles vehicle titles and registration.",
    sections: [
      { heading: "DPS, not DMV, handles Texas driver licenses", paragraphs: ["One of the most common Texas service mix-ups is the division between DPS and TxDMV. Driver licenses and state identification cards are DPS services. Vehicle registration and titles are TxDMV services."], links: [{ label: "Official DPS driver-license services", href: "https://www.dps.texas.gov/section/driver-license", external: true }] },
      { heading: "Renew, replace or change your address", paragraphs: ["Many eligible Texans can renew, replace or update a license or ID through DPS online services. Eligibility varies, so use the official DPS service to determine whether an office visit is required."], links: [{ label: "DPS online driver-license services", href: "https://www.dps.texas.gov/apps/DriverLicense/", external: true }] },
      { heading: "Appointments and REAL ID", paragraphs: ["Texas driver-license offices operate primarily by appointment. If you need an in-person visit, review the required documents before booking. DPS also publishes REAL ID information and document-check resources."], links: [{ label: "Driver-license appointments and information", href: "https://www.dps.texas.gov/section/driver-license", external: true }] },
    ],
    related: [{ label: "Texas DMV", href: "/texas-dmv" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-dmv": {
    eyebrow: "Texas driving",
    title: "Texas DMV: Vehicle Registration, Titles and TxDMV Services",
    intro: "What the Texas Department of Motor Vehicles actually handles, how it differs from DPS, and where to go for registration, titles, dealer and motor-carrier services.",
    updated: "August 20, 2026",
    quickAnswer: "TxDMV handles vehicle registration, titles, dealer licensing and motor-carrier services. Texas DPS handles driver licenses and identification cards.",
    sections: [
      { heading: "What TxDMV handles", paragraphs: ["The Texas Department of Motor Vehicles oversees vehicle titles and registration, motor carriers, dealer licensing and related motor-vehicle programs."], links: [{ label: "Official TxDMV website", href: "https://www.txdmv.gov/", external: true }] },
      { heading: "Vehicle registration", paragraphs: ["Texas registration transactions are closely tied to county tax assessor-collector offices, while TxDMV sets statewide requirements and provides online renewal services and guidance."], links: [{ label: "Texas vehicle registration guide", href: "/texas-vehicle-registration" }, { label: "Find my DMV and local office", href: "/find-my-dmv" }] },
      { heading: "Need a driver license instead?", paragraphs: ["Driver licenses are a Department of Public Safety service, not a TxDMV service. If your task is a license renewal, replacement, appointment or REAL ID question, use the Texas Defined driver-license guide or the official DPS service."], links: [{ label: "Texas driver-license guide", href: "/texas-drivers-license" }, { label: "Official DPS driver-license services", href: "https://www.dps.texas.gov/section/driver-license", external: true }] },
    ],
    related: [{ label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Texas vehicle registration", href: "/texas-vehicle-registration" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-vehicle-registration": {
    eyebrow: "Texas driving",
    title: "Texas Vehicle Registration: Renewals, County Offices and TxDMV",
    intro: "A practical guide to Texas vehicle registration, including online renewal, county tax offices, registration notices, inspections and the difference between TxDMV and DPS.",
    updated: "August 20, 2026",
    quickAnswer: "Texas vehicle registration is a TxDMV program administered with county tax assessor-collector offices. Many registrations can be renewed online; driver-license services are handled separately by Texas DPS.",
    sections: [
      { heading: "How Texas vehicle registration works", paragraphs: ["TxDMV establishes statewide registration requirements while county tax assessor-collector offices handle many local registration and title transactions. The exact documents and fees depend on the transaction."], links: [{ label: "Official TxDMV registration information", href: "https://www.txdmv.gov/motorists/register-your-vehicle", external: true }] },
      { heading: "Renewing registration", paragraphs: ["Eligible vehicles can often be renewed online. Use the official TxDMV renewal system or your county office instructions and check the current inspection and emissions requirements that apply in your county."], links: [{ label: "TxDMV online services", href: "https://www.txdmv.gov/", external: true }, { label: "Find a local office", href: "/find-my-dmv" }] },
      { heading: "Registration is not a driver-license service", paragraphs: ["TxDMV handles registration and titles. DPS handles driver licenses and IDs. Keeping the two agencies straight can save an unnecessary office visit."], links: [{ label: "Texas driver-license guide", href: "/texas-drivers-license" }, { label: "Texas DMV guide", href: "/texas-dmv" }] },
    ],
    related: [{ label: "Texas DMV", href: "/texas-dmv" }, { label: "Texas driver license", href: "/texas-drivers-license" }, { label: "Find my DMV", href: "/find-my-dmv" }, { label: "Moving to Texas", href: "/moving-to-texas" }],
  },
  "texas-flag": {
    eyebrow: "Texas symbols",
    title: "Texas Flag: History, Meaning, Rules and the Lone Star",
    intro: "A complete starting point for the Texas flag: where the Lone Star design came from, what its colors represent, how Texas law describes the flag and how to display it respectfully.",
    updated: "August 20, 2026",
    quickAnswer: "The modern Texas flag uses one vertical blue stripe with a single white five-pointed star and two horizontal stripes, white over red. It was adopted by the Republic of Texas in 1839 and remains the state flag today.",
    sections: [
      { heading: "History of the Lone Star flag", paragraphs: ["The familiar Lone Star design dates to the Republic of Texas era and was adopted in 1839. Its continued use makes the flag one of the strongest visual links between the Republic and the modern state."], links: [{ label: "TSLAC: original 1839 Lone Star flag design", href: "https://www.tsl.texas.gov/exhibits/texas175/flag.html", external: true }, { label: "History of the Texas flag", href: "/article/history-of-the-texas-flag" }, { label: "Texas history", href: "/texas-history" }] },
      { heading: "Design and meaning", paragraphs: ["Texas law specifies the flag's basic colors and geometry. The Lone Star is the defining symbol, while state law also assigns meanings to the colors: blue for loyalty, white for purity and red for bravery."], links: [{ label: "Texas Government Code Chapter 3100 — State Flag", href: "https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf", external: true }, { label: "Texas State Library flag description", href: "https://www.tsl.texas.gov/ref/abouttx/flagdes", external: true }, { label: "Texas symbols", href: "/texas-symbols" }] },
      { heading: "How to display the Texas flag", paragraphs: ["Texas has statutory flag-display rules and customs covering placement, respect and use alongside other flags. For practical examples, use the dedicated etiquette guide."], links: [{ label: "Texas Government Code Chapter 3100 — display rules", href: "https://statutes.capitol.texas.gov/Docs/GV/pdf/GV.3100.pdf", external: true }, { label: "Texas flag etiquette and display guide", href: "/article/texas-flag-etiquette-display-guide" }] },
    ],
    related: [{ label: "Texas symbols", href: "/texas-symbols" }, { label: "Texas history", href: "/texas-history" }, { label: "Texas facts", href: "/texas-facts" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }],
  },
  "texas-state-fair": {
    eyebrow: "Texas events",
    title: "State Fair of Texas 2026: Dates, Hours, Tickets, Food, Rides and Fair Park",
    intro: "A current 2026 State Fair of Texas planning guide for Fair Park in Dallas, including hours, admission, parking and DART, coupons, discounts, new foods, Big Tex Choice Award winners, rides, college football, family planning and first-timer itineraries.",
    updated: "September 25, 2026",
    quickAnswer: "The 2026 State Fair of Texas is now open at Fair Park in Dallas and runs September 25 through October 18. Gates are open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays, with last entry at 9 p.m. Ticket prices vary by day and discount, so check the official ticket page before you go.",
    sections: [
      {
        heading: "2026 dates, hours and Fair Park location",
        paragraphs: [
          "The 2026 State Fair of Texas runs Friday, September 25 through Sunday, October 18 at Fair Park in Dallas. The Fair is open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays. Last entry is 9 p.m.",
          "Parking gates and ticket booths open daily at 9:30 a.m. The Midway opens at 11 a.m. Sundays through Fridays and 10 a.m. Saturdays. Fair Park museum hours can differ from the Fair's operating hours, so check individual museum schedules if they are part of your visit."
        ],
        links: [
          { label: "Official State Fair hours", href: "https://bigtex.com/faqs/fair-hours/", external: true },
          { label: "Official daily schedule", href: "https://bigtex.com/schedule/", external: true }
        ]
      },
      {
        heading: "2026 ticket prices and admission",
        paragraphs: [
          "State Fair admission is dynamically priced by day and discount. The Fair currently lists general admission from $7 to $25, children ages 3–12 from $7 to $10, children age 2 and younger free, and senior admission from $7 to $20. Season-pass options are also available.",
          "Because prices and promotions can change by date, buy from the official Fair ticket page and compare the day's general admission price with any discount that applies to you before checkout."
        ],
        links: [
          { label: "Official tickets and packages", href: "https://bigtex.com/buy-tickets-new/", external: true },
          { label: "Official discounts and ways to save", href: "https://bigtex.com/discounts/", external: true }
        ]
      },
      {
        heading: "Parking, DART and getting to Fair Park",
        paragraphs: [
          "Public transit is often the simplest option on high-traffic weekends. DART's Green Line serves Fair Park Station and MLK Jr. Station, giving visitors two rail access points near the fairgrounds.",
          "If you drive, use official Fair parking guidance and allow extra time for traffic around Fair Park. The Fair also publishes rideshare and taxi guidance, including designated pickup and drop-off information."
        ],
        links: [
          { label: "Official getting-here and parking guide", href: "https://bigtex.com/plan-your-visit/getting-here/", external: true },
          { label: "Dallas County guide", href: "/county/dallas" }
        ]
      },
      {
        heading: "How Food & Midway Coupons work",
        paragraphs: [
          "Food, Midway rides and Midway games use State Fair coupons rather than ordinary cash at the point of sale. One coupon is currently valued at $1, making the posted coupon price easy to translate into dollars.",
          "Unused coupons do not expire under the Fair's current policy, so older valid coupons can be used on a later visit. Merchandise vendors may use other payment methods, so keep coupons mainly for food, rides and games."
        ],
        links: [
          { label: "Official coupon FAQ", href: "https://bigtex.com/faqs/coupons/", external: true }
        ]
      },
      {
        heading: "Best 2026 State Fair foods and award winners",
        paragraphs: [
          "The 2026 Big Tex Choice Awards winners are Burger Chop Tater Tacos for Best Taste – Savory, Fletcher's Chocolate Corny Dog for Best Taste – Sweet, Tropical Coco Fresca for Best Taste – Sipper, and Berry Me in Matcha for Most Creative.",
          "The broader 2026 new-food lineup includes items such as Texas Brisket Pierogies, Spicy Carbonara Ramen Korean Corn Dog, Triple Chocolate Flautas and Twinkle Twinkle Brisket Star. Use the official food map once you are on the grounds so you do not spend your day backtracking."
        ],
        links: [
          { label: "TexasDefined 2026 State Fair food guide", href: "/article/state-fair-texas-2026-new-foods-guide" },
          { label: "Official 2026 Big Tex Choice winners", href: "https://bigtex.com/big-tex-choice-awards/", external: true },
          { label: "Official 2026 new foods", href: "https://bigtex.com/new-food/", external: true }
        ]
      },
      {
        heading: "Big Tex, the Midway and must-see attractions",
        paragraphs: [
          "Big Tex remains the Fair's most recognizable landmark and an easy meeting point for groups. First-time visitors should also budget time for the Midway, livestock and agriculture exhibits, the Texas Auto Show, creative arts, live shows and Fair Park's historic architecture.",
          "Do not try to see every attraction in one visit. Pick two or three anchors for the day, then use the official schedule to fill gaps with nearby shows and exhibits."
        ],
        links: [
          { label: "Official attraction schedule", href: "https://bigtex.com/schedule/", external: true },
          { label: "Explore Texas", href: "/explore" }
        ]
      },
      {
        heading: "College football at the State Fair",
        paragraphs: [
          "College football is part of the State Fair identity, with major games played at the Cotton Bowl inside Fair Park. Game days create a very different traffic and crowd pattern from an ordinary Fair day, so arrive earlier and plan transportation around kickoff.",
          "If you are attending the State Fair Classic, use the dedicated TexasDefined event guide for game-specific planning and then combine it with this Fair guide for food, rides and attractions before or after the game."
        ],
        links: [
          { label: "State Fair Classic guide", href: "/event/state-fair-classic" },
          { label: "Texas sports venues", href: "/sports-venues" }
        ]
      },
      {
        heading: "Can you bring food, drinks and bags?",
        paragraphs: [
          "The State Fair allows outside food and nonalcoholic beverages subject to its current container, cooler and bag restrictions. That can be useful for families, dietary needs and visitors trying to control costs.",
          "Rules can change and prohibited-item lists are time-sensitive, so check the Fair's current FAQ immediately before leaving home rather than relying on an old screenshot or social post."
        ],
        links: [
          { label: "Official food and drink rules", href: "https://bigtex.com/faqs/food-drinks/", external: true },
          { label: "Official State Fair FAQ", href: "https://bigtex.com/faq/", external: true }
        ]
      },
      {
        heading: "State Fair with kids",
        paragraphs: [
          "For families, a lower-stress visit usually means arriving near opening, doing animal and educational areas before the afternoon crowds, scheduling a few Midway rides rather than unlimited wandering, and building in a sit-down break before evening shows.",
          "Write a phone number on a child's wristband or card, choose a clear family meeting point near a major landmark, and review height requirements before promising a specific ride."
        ],
        links: [
          { label: "Official visitor planning", href: "https://bigtex.com/plan-your-visit/", external: true },
          { label: "Children's Aquarium at Fair Park", href: "/destination/childrens-aquarium-dallas-fair-park" }
        ]
      },
      {
        heading: "Accessibility and sensory planning",
        paragraphs: [
          "Fair Park is large, noisy and crowded, so visitors who need mobility, sensory or accessibility accommodations should review the official accessibility information before arrival and identify quieter breaks in advance.",
          "If stamina is a concern, prioritize one side of the grounds at a time instead of repeatedly crossing Fair Park. A planned meal break and a scheduled indoor exhibit can make a long day easier."
        ],
        links: [
          { label: "Official State Fair FAQ", href: "https://bigtex.com/faq/", external: true }
        ]
      },
      {
        heading: "A first-timer full-day itinerary",
        paragraphs: [
          "Morning: enter near opening, visit Big Tex, livestock and agriculture areas, then the Texas Auto Show or another major indoor exhibit before the biggest crowds arrive.",
          "Afternoon: make lunch your food-sampling window, try one 2026 award winner, then spend a focused block on the Midway or museums. Evening: use the official schedule to choose live music, a parade or another timed attraction instead of wandering without a plan."
        ],
        links: [
          { label: "Official 2026 Visitor's Guide", href: "https://bigtex.com/visitors-guide/", external: true },
          { label: "Texas road trips", href: "/explore/road-trips" }
        ]
      },
      {
        heading: "A half-day or budget-focused visit",
        paragraphs: [
          "For a half-day, choose either a morning-to-afternoon visit centered on exhibits and food or an afternoon-to-evening visit centered on the Midway, dinner and entertainment. Trying to compress the entire Fair into four hours usually produces more walking than enjoyment.",
          "For a budget visit, compare admission discounts, use DART if it is cheaper than parking for your group, bring allowed water or snacks, set a coupon budget before entering the Midway and use included shows and exhibits to fill the day."
        ],
        links: [
          { label: "Official discounts", href: "https://bigtex.com/discounts/", external: true },
          { label: "Official plan-your-visit hub", href: "https://bigtex.com/plan-your-visit/", external: true }
        ]
      },
      {
        heading: "What is new for 2026",
        paragraphs: [
          "The 2026 Fair theme is Stars, Stripes, and Howdies. This year's Fair also includes new food and value programs plus changes to entertainment locations, so returning visitors should not assume every attraction is in the same place or priced the same way as last year.",
          "Use the current Fair schedule and map on the day you visit. Those sources are more reliable than an old map saved from a previous year."
        ],
        links: [
          { label: "Official State Fair news", href: "https://bigtex.com/category/press-releases/", external: true },
          { label: "Official schedule", href: "https://bigtex.com/schedule/", external: true }
        ]
      },
      {
        heading: "Where to stay and what else to do in Dallas",
        paragraphs: [
          "If the Fair is part of a Dallas weekend, staying near a DART Green Line connection can be more useful than choosing a hotel only by straight-line distance from Fair Park. That lets you avoid some event traffic while keeping rail access.",
          "Pair the Fair with nearby Dallas attractions or another city itinerary rather than adding unnecessary cross-town driving during peak event periods."
        ],
        links: [
          { label: "Dallas County guide", href: "/county/dallas" },
          { label: "Texas events calendar", href: "/events" },
          { label: "Explore Texas", href: "/explore" }
        ]
      },
      {
        heading: "State Fair history and why Fair Park matters",
        paragraphs: [
          "The State Fair of Texas dates to 1886 and has become one of the state's most recognizable annual traditions. Fair Park itself is a major part of the experience, with architecture, museums and the Cotton Bowl creating a setting that is more than a temporary carnival site.",
          "That history is why a strong first visit should include at least some time outside the Midway. The livestock, exhibits, buildings and civic history are central to understanding why the Fair has remained important for generations."
        ],
        links: [
          { label: "Official State Fair history and mission", href: "https://bigtex.com/", external: true },
          { label: "Texas history", href: "/texas-history" }
        ]
      }
    ],
    related: [
      { label: "2026 State Fair food guide", href: "/article/state-fair-texas-2026-new-foods-guide" },
      { label: "State Fair Classic", href: "/event/state-fair-classic" },
      { label: "Dallas County", href: "/county/dallas" },
      { label: "Children's Aquarium at Fair Park", href: "/destination/childrens-aquarium-dallas-fair-park" },
      { label: "Texas events", href: "/events" },
      { label: "Texas food trail", href: "/texas-food-trail" },
      { label: "Texas road trips", href: "/explore/road-trips" },
      { label: "Texas sports venues", href: "/sports-venues" }
    ],
  },
  "texas-two-step": {
    eyebrow: "Texas explained",
    title: "Texas Two Step: How the Texas Lottery Game Works",
    intro: "A plain-English guide to Texas Two Step, including the number draw, Bonus Ball, drawing schedule, prize structure, odds and the official rules that control the game.",
    updated: "August 20, 2026",
    quickAnswer: "Texas Two Step is a Texas Lottery draw game. Players select four numbers from 1 to 35 plus a Bonus Ball number from 1 to 35. Drawings are held Mondays and Thursdays, and the jackpot starts at $200,000 under the current official game information.",
    sections: [
      { heading: "How Texas Two Step is played", paragraphs: ["A play consists of four different numbers from 1 through 35 plus one Bonus Ball number from 1 through 35. The official Texas Lottery game rule controls if promotional material and the rule ever differ."], links: [{ label: "Official Texas Two Step how-to-play guide", href: "https://www.texaslottery.com/export/sites/lottery/Documents/HTP_TexasTwoStep_ENG.pdf", external: true }] },
      { heading: "Drawings, prizes and odds", paragraphs: ["The Texas Lottery currently advertises drawings on Monday and Thursday. The game includes a jackpot and lower prize tiers, including a guaranteed prize for matching only the Bonus Ball. Prize amounts and pari-mutuel tiers can change, so verify the current prize table before relying on an amount."], links: [{ label: "Texas Lottery", href: "https://www.texaslottery.com/", external: true }] },
      { heading: "Use the official rules", paragraphs: ["Lottery drawings and prize claims are governed by official Texas Lottery rules, not summaries. Players must meet the legal age requirement and should treat lottery play as entertainment rather than a financial strategy."], links: [{ label: "Texas facts", href: "/texas-facts" }] },
    ],
    related: [{ label: "Texas facts", href: "/texas-facts" }, { label: "Things unique to Texas", href: "/things-unique-to-texas" }, { label: "Texas history", href: "/texas-history" }, { label: "Texas guidebook", href: "/guides" }],
  },
};
