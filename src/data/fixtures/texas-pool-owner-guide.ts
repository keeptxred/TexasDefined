import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasPoolOwnerGuideArticle: Article = {
  id: "evergreen-texas-pool-owner-guide",
  brandId: "texasdefined",
  slug: "texas-pool-owner-guide",
  title: "Texas Pool Owner Guide: Chemistry, Pumps, Freeze Protection, Storms, Leaks and Energy Use",
  dek: "A practical year-round guide to owning a residential pool in Texas: water chemistry, circulation, filters, variable-speed pumps, evaporation, leaks, storms, freezes, safety, electricity use and what to inspect before buying a house with a pool.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hunters_Creek_neighborhood_pool.jpg?width=1600",
    alt: "Outdoor neighborhood swimming pool in San Antonio, Texas",
    width: 1600,
    height: 1200,
    credit: "Spheroidite · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 17,
  tags: ["texas pool owner", "pool maintenance texas", "pool pump texas", "pool chemistry", "pool freeze protection", "pool hurricane preparation", "pool electricity cost", "swimming pool safety", "home and garden"],
  featured: true,
  sourceName: "CDC Healthy Swimming",
  sourceUrl: "https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Put the pool into the larger system of weather, electricity, insurance, drainage and annual home maintenance." },
    { href: "/article/texas-home-maintenance-calendar", label: "Texas home maintenance calendar", description: "Build pool inspection and seasonal equipment checks into a month-by-month maintenance rhythm." },
    { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze", description: "Coordinate pool freeze protection with plumbing, power, irrigation and other outdoor systems." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "Prepare the pool, yard and house together before tropical weather and extended outages." },
    { href: "/article/how-to-choose-electricity-plan-texas", label: "Choose a Texas electricity plan", description: "Account for pool-pump load when comparing plans against real household usage." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility cost calculator", description: "Estimate recurring electricity and water costs for a Texas household." },
    { href: "https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html", label: "CDC home pool water treatment and testing", description: "Current residential guidance for chlorine, pH and routine water testing." },
    { href: "https://www.cdc.gov/healthy-swimming/toolkit/pool-chemical-safety.html", label: "CDC pool chemical safety", description: "Current guidance for storing and handling pool chemicals without unsafe mixing." },
    { href: "https://www.cpsc.gov/safety-education/safety-guides/pools-and-spas/safety-barrier-guidelines-home-pools", label: "CPSC residential pool barrier guidance", description: "Federal consumer-safety guidance covering fences, gates, alarms and home-pool barriers." },
    { href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Pool-Safely", label: "CPSC Pool Safely guidance", description: "Drowning and drain-entrapment prevention guidance for families and pool owners." },
    { href: "https://www.energy.gov/cmei/buildings/dedicated-purpose-pool-pumps", label: "U.S. Department of Energy pool-pump standards", description: "Federal efficiency standards and test procedures for dedicated-purpose pool pumps." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("A Texas pool is not a summer-only feature. In much of the state it operates through long heat seasons, sudden thunderstorms, drought, blowing debris and occasional hard freezes. That makes the pool a year-round mechanical and water-treatment system with a meaningful electricity load, not just a backyard amenity."),
    p("The easiest way to keep ownership manageable is to track a few systems separately: water chemistry, circulation, filtration, water level, structural condition, electrical equipment and safety barriers. When one changes, diagnose that system before adding more chemicals or increasing pump runtime."),

    h("1. Start with a baseline you can measure"),
    p("A pool becomes easier to manage when you know what normal looks like. Record the water level, ordinary pump schedule, filter pressure when clean, typical sanitizer and pH readings, and the amount of water the pool usually loses during stable weather."),
    p("That baseline lets you recognize whether a high electric bill, falling water level, cloudy water or weak return flow is a new problem instead of normal Texas summer behavior."),
    list("Record clean-filter pressure after service.", "Write down the pump schedule and speed settings.", "Keep a simple chemistry log during periods of change.", "Photograph equipment labels and valve positions.", "Mark a normal water level at the skimmer."),

    h("2. Chlorine and pH are the first water-quality controls"),
    p("CDC says residential pool owners should routinely test disinfectant and pH. Its current home-pool guidance recommends pH from 7.0 to 7.8 and at least 1 ppm free chlorine in a pool, or at least 2 ppm when cyanuric acid or stabilized chlorine products are being used."),
    p("Texas sun and heavy swimmer use can consume chlorine quickly. A pool that looked fine several days ago can change after a hot weekend, a storm or a large gathering. Test before guessing, especially when the water has changed appearance or odor."),

    h("3. Stabilizer helps outdoors, but more is not automatically better"),
    p("Cyanuric acid protects chlorine from ultraviolet loss, which matters in full Texas sun. But because stabilizer also changes how chlorine behaves, the useful approach is to measure it and manage sanitizer around the actual concentration rather than continuously adding stabilized products without testing."),
    p("If a pool becomes difficult to sanitize despite apparently high chlorine readings, look at the full chemistry picture before assuming the answer is simply more tablets or more shock."),

    h("4. Pump runtime should solve a circulation problem—not satisfy a folklore number"),
    p("There is no universal Texas rule that every residential pool must run one fixed number of hours each day. Runtime depends on pump size, plumbing, speed, filter condition, water features, sanitizer systems, debris load and how the pool is actually used."),
    p("Variable-speed pumps make this especially important. Long periods at a lower efficient speed can move water with much less power than operating at maximum speed for the same number of hours, but some equipment may still need minimum flow to function correctly."),
    list("Set enough flow for skimming and sanitation equipment to work.", "Use higher speeds only when a cleaner, heater, spa spillway or other feature requires them.", "Watch return strength and skimmer action after changing speed.", "Treat an unexplained increase in pump power or runtime as a diagnostic clue."),

    h("5. Filters tell you when circulation is being restricted"),
    p("Cartridge, sand and diatomaceous-earth filters all remove suspended material differently, but each works best when the owner knows the clean baseline and the manufacturer's service method. Weak flow can come from a dirty filter, blocked basket, closed valve, low water level or suction-side air leak."),
    p("Do not clean a filter only because a calendar date arrived. Use pressure change, flow behavior, visible condition and the equipment maker's instructions. Over-cleaning can waste water and time without fixing the actual restriction."),

    h("6. A falling water level needs an evaporation test before excavation"),
    p("Texas heat, wind and low humidity can remove substantial water through evaporation. A sudden increase in water loss, however, can also come from plumbing, equipment, a autofill problem or the pool shell."),
    p("Compare pool loss with a controlled container or another consistent reference before assuming the pool is leaking. Then inspect equipment pads, backwash lines, autofill behavior, visible cracks and wet areas before moving toward invasive leak detection."),

    h("7. Storm preparation is mostly about water level, power and debris"),
    p("A tropical system or severe thunderstorm can load a pool with leaves, roof debris and dirty runoff while power interruptions stop normal circulation. The pool should be part of the same storm plan as trees, drainage, outdoor furniture and electrical equipment."),
    p("Do not drain an in-ground pool solely because a major storm is coming. Groundwater pressure can become a structural issue when soil is saturated. Follow the pool builder or equipment manufacturer's storm guidance and manage surrounding drainage instead of improvising during the event."),

    h("8. After a storm, restore circulation before chasing perfect chemistry"),
    p("Remove large debris safely, confirm the equipment pad has not flooded or been damaged, restore the proper water level and verify circulation. Once the system is mechanically sound, test and correct chemistry rather than blindly adding a large stack of products."),
    p("If electrical equipment was submerged, damaged or exposed to unsafe conditions, keep it off until it has been evaluated appropriately. Water treatment is not worth energizing compromised electrical gear."),

    h("9. Freeze protection is an equipment plan, not one switch"),
    p("Texas freezes are dangerous to pool equipment because exposed plumbing, pumps, filters, heaters and valves can hold water in places not designed for ice expansion. Automation freeze protection can help, but it depends on power, sensors, valves and programmed speeds all working correctly."),
    p("Know in advance whether your equipment should circulate continuously during a freeze, be drained under manufacturer procedures, or use another winterization method. The correct method depends on the equipment and installation; do not invent one during a power outage."),

    h("10. Power outages change the freeze strategy"),
    p("If freezing weather and a prolonged outage occur together, a plan that depends entirely on circulation may no longer protect the system. This is why owners should identify drain plugs, shutoffs and equipment instructions before winter weather arrives."),
    p("Never run a portable generator in a garage, near doors or windows, or in another unsafe location simply to keep pool equipment operating. Household life safety comes before pool protection."),

    h("11. Pool electricity belongs in the household energy model"),
    p("A pool pump can be one of the larger continuous electrical loads at a Texas house. The meaningful variables are pump power at each speed, hours at those speeds, seasonal schedules and whether water features or cleaners add additional load."),
    p("When comparing electricity plans, include the pool in real monthly usage rather than estimating from a generic house. A plan with bill-credit thresholds can behave very differently when a pool moves summer consumption across those thresholds."),

    h("12. Chemical storage deserves the same respect as electrical equipment"),
    p("CDC pool-chemical guidance emphasizes preventing accidental mixing and keeping chemical systems maintained. Residential owners should preserve labels, keep incompatible products separated and dry, use the manufacturer's instructions and avoid transferring chemicals into unlabeled household containers."),
    p("If chlorine and acid products are both used, store and handle them so accidental contact cannot occur. More product is not a substitute for testing, and combining products can create a serious chemical hazard."),

    h("13. Safety barriers and drains are ownership systems too"),
    p("CPSC recommends a four-sided barrier approach for residential pools, with self-closing and self-latching gates and additional protections where the house forms part of the barrier. Local requirements can be more specific, so owners should also verify their city, county, HOA or other applicable rules."),
    p("Drain and suction safety matters even when chemistry is perfect. Broken, missing or questionable drain covers deserve prompt attention from a qualified pool professional, and children should be taught to stay away from drains and suction openings."),

    h("14. Buying a Texas house with a pool: inspect the system, not the water color"),
    p("Clear blue water on inspection day does not tell you whether the pump is near failure, the heater works, the shell leaks, the automation is reliable or the filter has been neglected. Ask for equipment age, invoices, remodel history and recurring service records when available."),
    list("Run pumps, cleaners, heaters, lights and water features that are part of the sale.", "Check filter pressure and inspect accessible equipment for leaks or corrosion.", "Ask whether the pool has required structural or electrical permits where applicable.", "Review recent electricity and water usage for unexplained patterns.", "Ask about resurfacing, leak repairs and underground plumbing work.", "Verify fences, gates and alarms against current local requirements."),

    h("15. Know the difference between cosmetic wear and system failure"),
    p("Faded plaster, tile staining and weathered decking can be maintenance issues without being emergencies. By contrast, persistent air in the pump, repeated loss of prime, unexplained water loss, electrical faults, structural cracking or equipment that cannot maintain circulation deserve faster diagnosis."),
    p("Separate cosmetic projects from functional ones before accepting a large renovation proposal. The most expensive-looking problem is not always the system that is actually failing."),

    h("16. Keep a permanent pool file"),
    p("Pool ownership gets cheaper and easier when the next technician does not have to rediscover the system. Keep model numbers, manuals, installation dates, valve diagrams, pump schedules, heater information, automation notes, warranties and major repair invoices together."),
    list("Pump and filter model numbers.", "Heater and sanitizer information.", "Automation login or controller documentation without storing passwords in an unsafe place.", "Valve-position photos.", "Surface and remodel dates.", "Leak-repair history.", "Electrical and plumbing permits when applicable.", "Storm or freeze damage documentation."),

    h("The operating principle: measure first, then change one system at a time"),
    p("Most frustrating pool problems become harder when several settings and chemicals are changed at once. Measure the water, observe flow, compare equipment behavior with the normal baseline and make the smallest useful correction first."),
    p("A Texas pool will always respond to heat, sun, wind, storms, freezes and heavy use. The goal is not to make it immune to weather. The goal is to know the system well enough that weather-related changes are obvious, manageable and documented before they become expensive failures."),
  ],
};
