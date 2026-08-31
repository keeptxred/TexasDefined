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
    title: "State Fair of Texas 2026: Dates, Fair Park, Food, Rides and Planning",
    intro: "Plan a 2026 State Fair of Texas visit with the dates, Fair Park basics, transportation strategy, Big Tex, food, rides, exhibits and the links worth checking before you go.",
    updated: "August 20, 2026",
    quickAnswer: "The 2026 State Fair of Texas is scheduled for September 25 through October 18, 2026 at Fair Park in Dallas. Check the official fair calendar before your visit for daily hours, ticket offers, concerts, livestock events and attraction schedules.",
    sections: [
      { heading: "2026 dates and location", paragraphs: ["The 2026 State Fair of Texas is scheduled to run Friday, September 25 through Sunday, October 18 at Fair Park in Dallas. Fair schedules can vary by day, so confirm opening hours and event times for the date you plan to attend."], links: [{ label: "Official State Fair of Texas", href: "https://bigtex.com/", external: true }] },
      { heading: "What the fair is known for", paragraphs: ["Big Tex, the Midway, fried-food competition, livestock and agriculture, auto exhibits, live music, college football and the historic Fair Park setting all contribute to the fair's identity. A good first visit mixes a few headline attractions with time to walk the grounds rather than trying to do everything."], links: [{ label: "Texas events", href: "/events" }, { label: "Texas food history", href: "/texas-food-history" }] },
      { heading: "Planning the day", paragraphs: ["Decide before arriving whether your priority is rides, food, livestock, football, concerts or architecture. Public transportation can reduce parking stress, and weekday visits are often easier for seeing exhibits at a slower pace. Check the official site for bag rules, coupons, ticket promotions and daily schedules."], links: [{ label: "Explore Texas", href: "/explore" }] },
    ],
    related: [{ label: "Texas events", href: "/events" }, { label: "Texas food trail", href: "/texas-food-trail" }, { label: "Texas road trips", href: "/explore/road-trips" }, { label: "Texas sports venues", href: "/sports-venues" }],
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
