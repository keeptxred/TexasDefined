import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasSepticSystemsHomeownerGuideArticle: Article = {
  id: "evergreen-texas-septic-systems-homeowner-guide",
  brandId: "texasdefined",
  slug: "texas-septic-systems-homeowner-guide",
  title: "Texas Septic Systems: A Homeowner Guide to Conventional, Aerobic and OSSF Systems",
  dek: "A practical guide to owning, buying and maintaining a Texas home with an on-site sewage facility: permits, conventional and aerobic systems, maintenance contracts, alarms, drainfields, flooding, drought, records and the questions to ask before closing.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Infiltrator_Quick4_leach_field_septic_system.jpg?width=1600",
    alt: "Residential septic tank and absorption-field chambers being installed",
    width: 1600,
    height: 1200,
    credit: "Raquel Baranow · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 16,
  tags: ["texas septic system", "texas ossf", "aerobic septic texas", "conventional septic texas", "septic maintenance", "rural texas home", "septic permit texas", "home and garden"],
  featured: true,
  sourceName: "Texas Commission on Environmental Quality",
  sourceUrl: "https://www.tceq.texas.gov/permitting/ossf/ossfhomeowners.html",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Put septic ownership into the larger Texas home systems picture: water, drainage, foundations, utilities, insurance and emergency records." },
    { href: "/article/texas-rural-wells-water-guide", label: "Texas rural wells and water guide", description: "Understand the private-water side of rural ownership and why well and septic locations must be evaluated together." },
    { href: "/article/buying-land-in-texas-guide", label: "Buying land in Texas", description: "Add site suitability, water and wastewater questions to rural land due diligence." },
    { href: "/article/texas-foundation-care-clay-soil-drought", label: "Texas foundation and drainage guide", description: "See how drainage, expansive soils and plumbing leaks interact with the rest of a property." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "Plan for flooding, outages and damaged wastewater equipment before tropical weather arrives." },
    { href: "/article/texas-household-pests-guide", label: "Texas household pests guide", description: "Manage moisture and access conditions that can change after wastewater or drainage problems." },
    { href: "https://www.tceq.texas.gov/permitting/ossf/ossfhomeowners.html", label: "TCEQ OSSF information for homeowners", description: "Official Texas starting point for permits, maintenance, professionals, rules and local permitting authorities." },
    { href: "https://www.tceq.texas.gov/permitting/ossf/ossfadvice.html", label: "TCEQ advice for septic-system owners", description: "Official homeowner guidance on choosing a system, site evaluation, installers, costs and documentation." },
    { href: "https://www.tceq.texas.gov/permitting/ossf/ossfmaintenance.html", label: "TCEQ OSSF maintenance requirements", description: "Official guidance on aerobic-system service policies, maintenance providers, homeowner maintenance and local variations." },
    { href: "https://www.tceq.texas.gov/permitting/ossf/ossfpermits.html", label: "TCEQ OSSF permit guidance", description: "Official Texas rules on permits, approved plans, owner installation limits and local permitting authority requirements." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("In Texas law and regulation, a residential septic system is usually called an on-site sewage facility, or OSSF. That term covers more than one kind of system. A conventional septic tank with an absorption field, an aerobic treatment unit with pumps and disinfection, a low-pressure dosing system and other approved designs all solve the same basic problem in different ways: treating and dispersing household wastewater on the property instead of sending it to a municipal sewer."),
    p("That distinction matters because a septic system is not just buried plumbing. It is part of the property's permitted infrastructure, and the maintenance burden can range from mostly passive inspection and pumping to an active mechanical system with alarms, aeration, pumps, disinfection and recurring service requirements."),

    h("1. Start by identifying exactly what system you own"),
    p("Do not assume every rural house has the same kind of septic system. The permit, approved site plan, installer records and equipment on the property should tell you whether the system is conventional, aerobic or another approved design. That information drives maintenance, repair options and what a buyer should budget after closing."),
    list("Locate the permit and approved site or design plan.", "Identify every tank, pump, control panel, alarm, cleanout and disposal area.", "Confirm whether disposal is through an absorption field, spray application, drip distribution or another approved method.", "Record the installer, maintenance provider and any manufacturer/model information still available.", "Keep the system drawing with the permanent house file so future owners and contractors do not have to rediscover buried components."),

    h("2. Texas septic systems are locally permitted under a statewide framework"),
    p("TCEQ sets the statewide OSSF framework through Texas law and rules, but counties, cities, river authorities and other authorized agents can serve as the local permitting authority. TCEQ specifically tells homeowners to identify that permitting authority because local requirements can be more stringent than the statewide baseline."),
    p("A person generally needs a permit and an approved plan before constructing, altering, repairing, extending or operating an OSSF. When planning a repair or addition, contact the permitting authority before excavation rather than assuming an old layout can simply be modified."),

    h("3. Conventional septic systems depend on soil and the disposal field"),
    p("A conventional system usually separates solids in a septic tank and sends clarified wastewater to an absorption area where soil completes treatment. The disposal field is therefore part of the treatment system, not spare yard space."),
    list("Keep buildings, pools, sheds and major grading out of the permitted disposal area unless the permitting authority approves a change.", "Avoid routinely driving heavy vehicles over tanks and absorption trenches.", "Keep roof runoff and major drainage flows from saturating the disposal area.", "Know where the field is before planting large trees or excavating.", "Treat persistent surfacing wastewater, sewage odors or unusually wet ground as a system warning rather than a landscaping nuisance."),

    h("4. Aerobic treatment units are small wastewater plants"),
    p("Aerobic treatment systems add mechanical treatment stages and usually rely on electricity. A typical residential setup may include pretreatment, an aeration chamber, settling, pumps, controls, disinfection and a disposal system such as surface spray or drip distribution. The exact configuration depends on the approved design."),
    p("Because the system is mechanical, an aerobic unit can fail differently from a passive tank-and-field system. A tripped breaker, failed aerator, pump problem, clogged component or empty disinfection unit can matter even when toilets still flush."),

    h("5. Learn what the alarm means before it sounds at midnight"),
    p("An audible or visual alarm usually means the system needs attention; it does not automatically identify the failed component. Owners should know where the control panel is, what normal lights look like and whom to call before an alarm occurs."),
    list("Keep the maintenance-provider number near the control panel and in the emergency home file.", "Do not silence an alarm and then forget it.", "Reduce unnecessary water use until the cause is understood if the system appears hydraulically overloaded.", "Do not open tanks or enter confined spaces to troubleshoot; septic tanks can contain dangerous gases and are not homeowner workspaces.", "Record the date, symptom and repair so recurring failures are visible over time."),

    h("6. The first two years of aerobic-system service are different"),
    p("TCEQ says aerobic and certain other advanced OSSFs receive an initial two-year service policy from the installer. After that initial period, state rules can allow a single-family homeowner to maintain certain systems personally, but local permitting authorities may impose stricter requirements, including homeowner training or continued professional maintenance."),
    p("That means a buyer should not accept the phrase 'you can maintain it yourself' without checking the local authority. The rules that matter are the rules for that address and that system."),

    h("7. If you use a maintenance contract, know what you are buying"),
    p("TCEQ says a maintenance contract should identify what is covered, response time for owner complaints, the individual performing maintenance, routine visit and testing frequency, reporting requirements and responsibility for the disinfection unit. A contract is more useful when those responsibilities are explicit rather than assumed."),
    list("Verify that the person providing regulated maintenance is properly licensed or registered for the work.", "Keep every inspection or service report.", "Ask whether parts, emergency calls and chlorine or other consumables are included.", "Know who sends required reports to the permitting authority.", "Track the contract expiration date before coverage lapses."),

    h("8. Water use is a design assumption, not an unlimited input"),
    p("OSSFs are designed around expected wastewater flows. A large leak, running toilet, unusually heavy laundry day or sudden occupancy increase can send much more water through the system than normal. That can reduce treatment time or saturate the disposal area."),
    list("Repair leaking toilets and faucets promptly.", "Spread high-water-use tasks when the system is stressed.", "Do not route roof, pool, sump or stormwater into the OSSF.", "Before adding bedrooms or substantially changing use, determine whether the existing permitted system remains adequate.", "Watch for changes in pump frequency, alarms or wet disposal areas after household water use changes."),

    h("9. What goes down the drain can damage treatment"),
    p("A septic system is designed for normal household wastewater and human waste, not as a disposal system for grease, paint, solvents, pesticides, wipes or large quantities of harsh chemicals. Products marketed as flushable can still create mechanical and solids-handling problems."),
    list("Keep cooking grease out of drains.", "Do not flush wipes, hygiene products or other non-biodegradable solids.", "Dispose of paint, solvents and pesticides through appropriate waste channels.", "Use household cleaning products as intended rather than assuming more chemical is better.", "Follow the system manufacturer's instructions for any treatment-specific restrictions."),

    h("10. Pumping intervals are conditions-based, not a universal calendar"),
    p("Septic tanks accumulate solids over time, but the correct pumping interval depends on tank capacity, occupancy, wastewater load and system design. A fixed internet rule cannot account for all of those variables."),
    p("The useful record is the actual sludge/scum condition when the tank is inspected and pumped. Keep pumping receipts and note what the service provider observed so future timing is based on your household rather than a generic number."),

    h("11. Protect the drainfield and spray area from other projects"),
    p("Home improvements can accidentally compromise an OSSF. A new pool, shop, driveway, fence, irrigation project or landscaping plan may conflict with buried tanks, setback requirements or the permitted disposal area."),
    list("Pull out the approved system drawing before planning construction.", "Mark tanks and disposal zones before excavation.", "Check with the permitting authority when a project changes grades, drainage or structures near the system.", "Do not assume unused-looking lawn is available for building.", "Preserve access for service vehicles and tank pumping."),

    h("12. Drought can hide problems; heavy rain can expose them"),
    p("Texas weather creates two very different operating conditions. During long dry periods, soil can crack and vegetation can mask changes in disposal-area moisture. During saturated conditions, the soil's ability to accept additional wastewater can fall sharply."),
    p("After prolonged rain, reduce unnecessary hydraulic load if the disposal area is saturated and watch for surfacing wastewater or alarms. Do not divert floodwater into open tanks or damaged components."),

    h("13. Flooding changes septic safety"),
    p("A flooded or inundated septic system should be treated cautiously. Electrical components, pumps, tanks and disposal areas can all be affected. If wastewater is surfacing or the system has been underwater, avoid contact and get qualified guidance before returning it to normal operation."),
    list("Keep people and pets away from sewage-contaminated areas.", "Do not enter or lean into septic tanks.", "Have submerged electrical equipment evaluated before use.", "Document flood damage for insurance and repair records.", "Contact the local permitting authority when repairs or system changes may require authorization."),

    h("14. Buying a Texas house with septic requires its own due diligence"),
    p("A general home inspection does not replace OSSF records and system-specific evaluation. Before closing, the buyer should understand what system is present, whether it is permitted, where it is located, how old the components are and what ongoing service obligations follow the property."),
    list("Request the permit, approved design or site plan and final approval records.", "Ask for pumping, inspection, maintenance and repair history.", "Confirm whether an aerobic maintenance contract is active and transferable.", "Identify the local permitting authority and check available records.", "Inspect for obvious surfacing wastewater, damaged spray heads, alarms, broken lids or inaccessible components.", "Budget for pumps, aerators, controls and other mechanical parts when buying an aerobic system."),

    h("15. Selling a home: records make a septic system easier to understand"),
    p("A clean OSSF file reduces uncertainty for the next owner. Keep permits, plans, maintenance contracts, reports, pumping receipts, repair invoices and manufacturer documents together. If the property changes hands, the new owner should know which responsibilities transfer with the system rather than beginning with guesswork."),

    h("16. Know which professional you actually need"),
    p("Texas licenses different OSSF roles. Site evaluators assess site suitability, Installer I licensees can install standard systems, Installer II licensees can install all OSSF types, and maintenance providers or technicians have defined roles for aerobic-system service. The correct professional depends on whether the problem is site evaluation, installation, repair design, routine maintenance or another regulated task."),
    p("TCEQ maintains homeowner resources for finding licensed OSSF professionals. For a major repair, verify licensing and ask the local authority whether a permit or updated planning materials are required before work begins."),

    h("17. The best septic emergency plan is ordinary documentation"),
    list("Know the tank and disposal-field locations.", "Know which breakers and controls serve an aerobic unit.", "Keep the local permitting authority and maintenance provider contacts accessible.", "Record service and pumping dates.", "Keep the permit and approved plan with the home file.", "Teach household members what the alarm sounds or looks like and what not to flush."),

    h("The operating principle: protect treatment, soil and records"),
    p("A Texas septic system works when three things stay aligned: the treatment equipment functions, the property can safely accept the treated wastewater, and the owner knows what system was approved for that site. Most expensive surprises begin when one of those becomes invisible—buried records disappear, drainage changes, maintenance lapses or a new owner assumes the system is just a tank in the yard."),
    p("Treat the OSSF as permanent home infrastructure. Know its design, protect its disposal area, keep water and waste loads reasonable, respond to alarms and visible changes, and preserve the records that explain the system to the next professional or owner."),
  ],
};
