import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasBackupPowerGeneratorGuideArticle: Article = {
  id: "evergreen-texas-backup-power-generator-guide",
  brandId: "texasdefined",
  slug: "texas-backup-power-generator-guide",
  title: "Texas Backup Power Guide: Portable Generators, Standby Systems, Transfer Switches and Outage Safety",
  dek: "A practical Texas homeowner guide to backup power: sizing essential loads, portable versus standby generators, transfer switches, carbon monoxide, fuel, weather, freeze outages, maintenance, batteries and what to inspect before buying a home with backup power.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/FEMA_-_44727_-_Generators_staged_in_Texas.jpg?width=1600",
    alt: "Emergency generators staged in Seguin, Texas before Hurricane Alex",
    width: 1600,
    height: 1062,
    credit: "Patsy Lynch / FEMA · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 17,
  tags: ["texas generator", "backup power texas", "portable generator safety", "standby generator", "transfer switch", "power outage texas", "generator carbon monoxide", "home backup power", "home and garden"],
  featured: true,
  sourceName: "U.S. Consumer Product Safety Commission",
  sourceUrl: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Put backup power into the larger system of freezes, hurricanes, utilities, insurance and emergency records." },
    { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze", description: "Coordinate generator planning with plumbing, heating, pools and other freeze-sensitive systems." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "Build outage planning into storm preparation, evacuation and post-storm recovery." },
    { href: "/article/texas-pool-owner-guide", label: "Texas pool owner guide", description: "Decide whether pool circulation belongs on the essential-load list during freezes and outages." },
    { href: "/article/how-to-choose-electricity-plan-texas", label: "Choose a Texas electricity plan", description: "Understand the normal grid-supplied side of the household energy system." },
    { href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center", label: "CPSC carbon monoxide and generator safety", description: "Current federal guidance for generator placement, CO alarms and poisoning prevention." },
    { href: "https://www.cpsc.gov/Newsroom/News-Releases/2026/As-Winter-Storms-Threaten-Millions-in-the-US-CPSC-Issues-Safety-Tips-to-Help-Families-Prevent-Carbon-Monoxide-Poisoning-and-Fires", label: "CPSC 2026 winter generator guidance", description: "Current outage guidance for portable generator placement, weather and maintenance." },
    { href: "https://www.esfi.org/wp-content/uploads/2021/08/ESFI-Generator-Safety.pdf", label: "Electrical Safety Foundation generator and transfer-switch guidance", description: "Electrical-safety guidance covering transfer switches, backfeeding, cords, grounding and generator operation." },
    { href: "https://www.ready.gov/power-outages", label: "Ready.gov power outage preparedness", description: "Federal household guidance for outage planning, food, communications and carbon monoxide prevention." },
    { href: "https://tdem.texas.gov/", label: "Texas Division of Emergency Management", description: "Statewide Texas emergency information and preparedness resources." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Backup power is most useful when it is designed before the outage. Texas homes can lose electricity during hurricanes, severe thunderstorms, ice, freezes, wildfire conditions and ordinary equipment failures. The right system depends on what must stay powered, how long the outage may last and whether the household can operate the equipment safely under bad weather and stress."),
    p("The first decision is not brand or generator size. It is the essential-load list. A refrigerator, a few lights and phone charging are a very different electrical problem from central air conditioning, electric heat, a well pump, a pool pump, medical equipment and an entire house."),

    h("1. Build the essential-load list before choosing equipment"),
    p("Write down the appliances and systems that truly need power during an outage. Record running watts and starting or surge requirements from nameplates, manuals or qualified equipment data rather than guessing from household size."),
    list("Refrigerator and freezer.", "Medical equipment and communications.", "Gas-furnace blower or other essential heating equipment where applicable.", "Well pump on rural property.", "Selected lights and outlets.", "Internet equipment if service remains available.", "Pool circulation only when it is genuinely part of a freeze-protection plan.", "Central air conditioning only when the generator and transfer equipment were designed for that load."),

    h("2. Portable and standby generators solve different problems"),
    p("A portable generator can supply selected loads and can be stored when not needed, but it requires safe outdoor placement, fuel, setup, weather protection and active operation. A permanently installed standby generator can start automatically and feed selected circuits or a larger electrical service through purpose-built transfer equipment, but it adds installation, fuel-system and maintenance costs."),
    p("Do not treat a portable generator as a cheaper standby generator by improvising a connection to the house. The method used to connect power is a safety system, not an accessory."),

    h("3. Never run a portable generator in a garage, shed or other enclosed space"),
    p("CPSC's current guidance says portable generators should never be operated inside a home, garage, basement, crawlspace, shed or other enclosed space, even when doors or windows are open. Carbon monoxide can accumulate to lethal concentrations despite apparent ventilation."),
    p("CPSC says to operate a portable generator outdoors at least 20 feet from the house, direct exhaust away from the home and other occupied buildings, and keep nearby openings such as windows and vents out of the exhaust path."),

    h("4. Carbon monoxide alarms are part of the generator system"),
    p("CPSC recommends battery-operated CO alarms or alarms with battery backup on every level of the home and outside sleeping areas. Test and maintain them before storm or freeze season rather than discovering a failed alarm while a generator is running."),
    p("Headache, dizziness, weakness, nausea, vomiting, sleepiness and confusion can be signs of carbon monoxide exposure. If CO poisoning is suspected, move to fresh air and seek emergency help rather than troubleshooting the generator first."),

    h("5. A transfer switch prevents the dangerous shortcut called backfeeding"),
    p("Electrical Safety Foundation guidance explains that a transfer switch selects between utility power and backup power for the home electrical system and prevents backfeeding. A generator should not be connected to a house by plugging it into a wall outlet or another improvised connection."),
    p("Backfeeding can energize wiring outside the house and expose utility workers and neighbors to danger while also damaging equipment. Whole-home or panel connections belong with properly designed transfer equipment and qualified electrical work."),

    h("6. Extension cords are for selected loads, not a substitute electrical system"),
    p("When a portable generator powers individual appliances directly, use outdoor-rated cords sized for the electrical load and inspect them for damage. Keep connections dry and follow generator instructions for grounding and ground-fault protection."),
    p("Running cords through pinched doors, wet areas or damaged insulation creates shock and fire risks. If the outage plan regularly requires a maze of cords through the house, a professionally installed inlet and transfer arrangement may be a more appropriate long-term design."),

    h("7. Starting watts matter when motors and compressors start"),
    p("Motors can draw substantially more power while starting than while running. Refrigerators, freezers, well pumps, air conditioners and some pool equipment can therefore overload a generator that appears large enough when only running watts are added."),
    p("Sequence major loads rather than assuming every appliance must start at once. A load-management plan can reduce the generator size required while still keeping the important systems available."),

    h("8. Central air conditioning can dominate generator sizing"),
    p("Texas summer outages make air conditioning an obvious priority, but central cooling can be one of the largest starting and running loads in the house. Do not assume a generator can start an HVAC compressor because its advertised wattage exceeds the unit's normal running consumption."),
    p("A qualified installer can evaluate starting current, soft-start or load-management options and whether the electrical service and generator are designed for the intended equipment. Portable window units or other smaller cooling strategies may be easier to support during a limited outage."),

    h("9. Winter outages create a different essential-load list"),
    p("During a Texas freeze, the goal may shift from comfort to damage prevention: heating controls, furnace blowers, well equipment, pipe protection and selected pool circulation can matter more than ordinary convenience loads."),
    p("Do not rely on one generator-dependent freeze plan without knowing what happens if the generator fails, fuel runs out or weather makes operation unsafe. Drain-down procedures and other equipment-specific fallback plans should exist before the freeze arrives."),

    h("10. Fuel planning is runtime planning"),
    p("Gasoline, propane and natural-gas systems each have different storage, delivery and outage constraints. A generator's rated tank runtime is not the same as guaranteed multi-day availability during a regional emergency."),
    p("Store fuel only in approved containers and according to applicable fire and manufacturer guidance. Shut down and allow portable equipment to cool before refueling. Never create a large informal fuel cache inside a home or attached garage because a storm is approaching."),

    h("11. Natural gas is convenient, but it is not an absolute outage guarantee"),
    p("Permanent standby generators commonly use natural gas or propane. Natural-gas service can be highly reliable, but homeowners should not assume that every disaster leaves gas pressure and local service unaffected. Ask the installer how fuel supply and generator output interact, especially on large whole-home units."),
    p("Propane systems add tank sizing, fill level and delivery logistics to the outage plan. Know the usable fuel on site before severe weather rather than estimating from a gauge after the grid goes down."),

    h("12. Rain and standing water create electrical hazards"),
    p("CPSC says generator owners should follow manufacturer instructions for shock hazards during rain or snow. Some equipment guidance may call for an appropriate noncombustible generator tent or may advise waiting until precipitation passes."),
    p("Do not move a running generator into a garage, carport or porch to keep it dry. Weather protection cannot come at the cost of carbon monoxide exposure."),

    h("13. Exercise and maintain backup equipment before the emergency"),
    p("A generator that has not started in months is not proven backup power. Follow manufacturer maintenance schedules for oil, batteries, fuel systems, air filters and periodic operation. Permanent standby systems also need exercise cycles and service even when the neighborhood has not had a recent outage."),
    p("Test the transfer arrangement and the intended essential loads under controlled conditions so the first real test is not a freezing night or hurricane outage."),

    h("14. Batteries and generators can complement each other"),
    p("A home battery can provide silent short-duration backup and can handle loads without running an engine, while a generator can extend outage duration when fuel is available. The correct design depends on electrical loads, solar equipment if present, outage goals and budget."),
    p("Do not assume a rooftop solar system automatically powers the house when the grid is down. Grid-tied systems require appropriate islanding and backup equipment to operate safely during an outage."),

    h("15. Buying a Texas house with a generator: verify the installation, not just the machine"),
    p("A generator beside the house does not prove that the system is safe or functional. Ask for permits where applicable, installer records, service history, fuel information, transfer-switch documentation and a demonstration of operation."),
    list("Identify which circuits or loads are actually backed up.", "Confirm whether the system is portable, manual-transfer, automatic standby or another design.", "Inspect visible electrical and fuel equipment for condition and labeling.", "Ask when the generator was last serviced and tested under load.", "Verify that CO alarms are present and functional.", "Understand where a portable unit is intended to operate safely—not merely where it is stored."),

    h("16. Keep a written outage operating plan"),
    p("A simple one-page operating plan is more useful than trying to remember every step during a storm. Record the essential-load priority, safe generator location, transfer-switch sequence, fuel plan, shutdown/refueling procedure and the fallback plan if backup power fails."),
    p("Make sure more than one responsible household member understands the system. If the plan works only when one person is home, it is not yet a resilient household system."),

    h("The operating principle: power fewer things safely before trying to power everything"),
    p("Backup power should reduce risk during an outage, not create a new carbon monoxide, fire or electrical hazard. Start with the smallest essential-load list that protects people, food, communications and critical home systems, then expand only when the electrical and fuel system has been designed for it."),
    p("Texas outages can arrive with heat, ice, wind or flooding. The safest backup system is one whose placement, connection, fuel, maintenance and operating steps were decided while the grid was still on."),
  ],
};
