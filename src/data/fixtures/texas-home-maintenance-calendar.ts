import heroHillCountry from "@/assets/hero-hill-country.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHomeMaintenanceCalendarArticle: Article = {
  id: "evergreen-texas-home-maintenance-calendar",
  brandId: "texasdefined",
  slug: "texas-home-maintenance-calendar",
  title: "The Texas Home Maintenance Calendar: What to Do Each Season",
  dek: "Texas weather can swing from freezes to triple-digit heat, hail, drought and tropical rain. A seasonal maintenance rhythm helps homeowners catch small problems before the next stretch of extreme weather finds them.",
  category: "home-garden",
  hero: {
    src: heroHillCountry,
    alt: "Texas homes beneath a wide evening sky in a neighborhood shaped by heat and seasonal weather",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 12,
  tags: [
    "texas home maintenance",
    "home maintenance calendar",
    "texas homeowners",
    "hvac maintenance",
    "roof maintenance",
    "freeze preparation",
    "summer home maintenance",
    "home and garden",
  ],
  featured: true,
  internalLinks: [
    {
      href: "/home-garden",
      label: "More from Home & Garden",
      description: "Practical Texas advice for yards, houses and living well through the heat.",
    },
    {
      href: "/article/best-native-plants-texas-yard",
      label: "The best native plants for a Texas yard",
      description: "Build a landscape that works with Texas heat, rainfall and local wildlife instead of fighting them.",
    },
    {
      href: "/article/true-cost-of-owning-a-home-in-texas",
      label: "The true cost of owning a home in Texas",
      description: "See how maintenance, insurance, utilities and repairs fit into the real cost of ownership.",
    },
    {
      href: "/texas-living",
      label: "Living Here",
      description: "More guides to the practical side of making a home in Texas.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("A Texas house does not experience four tidy seasons. It experiences whatever Texas decides to do next: a hard freeze after a warm week, spring hail, a month of thunderstorms, a long dry spell, triple-digit afternoons or a tropical system pushing rain inland from the Gulf."),
    p("That makes home maintenance less about following a national checklist and more about preparing the house for the next likely stress. Air conditioning matters before summer. Drainage matters before storm season. Hose bibs matter before a freeze. Roofs, caulk, irrigation and trees need attention before weather exposes a weakness."),
    p("The goal is not to turn every weekend into a repair project. A good maintenance calendar spreads the work across the year so the expensive systems get checked before they are working hardest."),

    h("The Texas rule: maintain before the weather changes"),
    p("Most emergency repairs feel sudden even when the underlying problem was not. An air conditioner that quits in August may have been struggling in May. A roof leak that appears during a thunderstorm may have started with damaged flashing months earlier. A burst exterior pipe may have been preventable before the first freeze warning."),
    p("The useful rhythm is simple: inspect, clean, test and repair during the mild window before each system reaches its peak season."),

    h("January: recover from cold weather and watch for hidden leaks"),
    p("January is a good month to look for damage after freezes, especially if temperatures dropped hard enough to stress plumbing, irrigation or exterior materials."),
    list(
      "Walk the exterior and look for cracked hose bibs, damaged irrigation heads and new gaps in caulk.",
      "Check beneath sinks, around water heaters and near exterior-wall plumbing for signs of slow leaks.",
      "Inspect attic areas you can safely access for water staining or signs of roof leaks.",
      "Change or inspect HVAC filters according to the system and filter type.",
      "Check smoke and carbon-monoxide alarms and replace batteries where needed.",
    ),
    p("If a pipe froze during a cold snap, keep watching after temperatures rise. Small splits and fittings can leak only once the line thaws and pressure returns."),

    h("February: get ahead of spring growth"),
    p("Late winter is one of the easiest times to inspect the yard before warm-season growth hides problems. Look at tree limbs over the roof, fence condition, drainage paths and irrigation coverage."),
    list(
      "Trim dead or hazardous tree growth using a qualified tree professional when work is high, heavy or near utilities.",
      "Clear leaves and debris from visible drainage paths.",
      "Check fence posts and gates before spring storms add wind load.",
      "Inspect exterior faucets and hose connections.",
      "Plan landscape changes before summer heat makes establishment harder.",
    ),

    h("March: prepare the air conditioner before everyone needs one"),
    p("In much of Texas, March is the month to stop thinking of air conditioning as a summer problem. HVAC companies are easier to schedule before the first sustained heat arrives, and small issues are less painful when the house is still comfortable without full-time cooling."),
    list(
      "Schedule routine HVAC service if it is due.",
      "Clear leaves, weeds and debris away from the outdoor condenser while maintaining manufacturer-recommended clearance.",
      "Check filters and confirm supply and return vents are unobstructed.",
      "Run the system before the first hot week and listen for unusual sounds or short cycling.",
      "Inspect visible condensate drain areas for signs of backup or overflow.",
    ),
    p("Do not wait for a 100-degree afternoon to discover that the system has been struggling since spring."),

    h("April: roof, gutters and storm readiness"),
    p("Spring storm season makes April a natural month to look up. Hail, high wind and heavy rain can expose roofing and drainage problems quickly."),
    list(
      "Inspect the roof from the ground or use a qualified roofer when a closer inspection is needed.",
      "Look for lifted or missing shingles, damaged flashing and signs of impact after hail.",
      "Clean gutters and confirm downspouts discharge where water can move away from the structure.",
      "Watch the yard during a hard rain and note where water ponds or flows toward the foundation.",
      "Review trees for broken limbs after strong storms.",
    ),
    p("The best time to learn where water goes is while it is raining. A five-minute walk under an umbrella can reveal more about drainage than a dry-weather inspection."),

    h("May: irrigation, sprinklers and the yard before summer"),
    p("May is a useful transition month. Plants are growing, but the worst heat may still be ahead. That makes it a good time to tune irrigation and correct waste before summer water use climbs."),
    list(
      "Run each irrigation zone and look for broken heads, clogged nozzles and water spraying pavement.",
      "Check drip lines for leaks and missing emitters.",
      "Adjust watering to actual plant needs, soil and local restrictions rather than a fixed habit.",
      "Refresh mulch where appropriate while keeping it away from direct contact with trunks and structural materials.",
      "Inspect exterior doors and weatherstripping before cooling season peaks.",
    ),
    p("A Texas yard should not require every square foot to receive the same amount of water. Turf, native beds, trees and foundation landscaping all have different needs."),

    h("June: reduce heat load before the longest stretch"),
    p("By June, the house is entering the part of the year when cooling, shade and moisture control become daily concerns."),
    list(
      "Check attic access weatherstripping and obvious air leaks around doors and windows.",
      "Inspect exterior caulk around penetrations and trim where water or hot air could enter.",
      "Confirm bathroom and kitchen exhaust fans vent properly.",
      "Clean ceiling fans and verify their seasonal direction if you use that feature.",
      "Check pool equipment, irrigation and other outdoor systems that will run heavily through summer.",
    ),
    p("The purpose is not to chase every degree of efficiency. It is to prevent the cooling system from carrying loads that sealing, shade or basic maintenance could reduce."),

    h("July: watch the systems working hardest"),
    p("July is less about starting projects and more about noticing stress. Air conditioners, irrigation systems, pool pumps, refrigerators and outdoor materials are all living through punishing conditions."),
    list(
      "Check HVAC filters more often when the system runs heavily or indoor dust is high.",
      "Watch for rooms that suddenly become harder to cool.",
      "Look for water around the air-handler or condensate drain area.",
      "Inspect irrigation early in the morning for leaks that disappear by midday.",
      "Watch wood fences, gates and exterior sealants for heat-related movement or drying.",
    ),
    p("A rising electric bill can be weather, but an abrupt change in performance can also be a clue that equipment or ductwork needs attention."),

    h("August: protect the yard without overwatering the house"),
    p("August tests landscapes. Soil can pull away from foundations in dry conditions, lawns can decline and trees can show stress. The answer is not simply to run irrigation longer everywhere."),
    list(
      "Check the soil and plant condition before increasing watering.",
      "Look for leaks around irrigation valves and underground lines.",
      "Keep vegetation from blocking condenser airflow.",
      "Inspect young trees for drought stress and damaged supports.",
      "Avoid allowing sprinklers to soak siding, doors or other building materials unnecessarily.",
    ),
    p("Consistent, appropriate moisture is more useful than dramatic swings between bone-dry soil and heavy watering. Local soil type matters, so Gulf Coast clay, Hill Country limestone and West Texas conditions should not be treated as the same problem."),

    h("September: inspect what summer exposed"),
    p("Late summer can reveal which parts of the house and landscape took the hardest beating. September is a useful month to make a repair list while the evidence is still obvious."),
    list(
      "Look for failed caulk, peeling exterior finishes and warped weatherstripping.",
      "Check fence lines and gates for movement.",
      "Inspect attic areas for signs of pests or moisture where safely accessible.",
      "Review tree health after the summer drought cycle.",
      "Check the roof and gutters again if severe storms passed through during summer.",
    ),

    h("October: the best all-around maintenance month"),
    p("For much of Texas, October offers the rare gift of reasonable weather. Use it. This is one of the best months for exterior projects, roof work, painting, caulking, tree care and preparing mechanical systems for winter."),
    list(
      "Schedule heating-system service if the equipment needs it.",
      "Test the heat before the first cold night.",
      "Inspect exterior doors, windows and weatherstripping.",
      "Clean gutters after early leaf drop where applicable.",
      "Complete exterior repairs that were miserable to consider in August.",
    ),

    h("November: get freeze-ready before the forecast turns urgent"),
    p("Texas freezes are easier to handle when supplies and plans are already in place. Waiting until a freeze warning is issued means competing with everyone else for faucet covers, insulation and repair appointments."),
    list(
      "Know where the main water shutoff is and make sure household members who may need it can find it.",
      "Protect vulnerable exterior faucets and exposed plumbing using methods appropriate for the property.",
      "Review irrigation-system freeze procedures for your equipment.",
      "Disconnect garden hoses when freezing weather approaches.",
      "Check weatherstripping and obvious drafts around exterior doors.",
      "Confirm fireplaces, space-heating equipment and carbon-monoxide alarms are safe and ready before use.",
    ),
    p("Freeze preparation should be tailored to the actual house. Pier-and-beam homes, slab homes, exposed backflow devices and outdoor kitchens do not share the same vulnerabilities."),

    h("December: test the emergency basics"),
    p("December is a good month to check the quiet systems you hope not to need."),
    list(
      "Test smoke and carbon-monoxide alarms.",
      "Review fire extinguishers and replace expired or damaged units as appropriate.",
      "Check flashlights, weather radios and backup charging options.",
      "Confirm the household knows where water, gas and electrical shutoffs are located, while leaving gas service work to qualified professionals when required.",
      "Review insurance records and keep current photos or video of major rooms and valuable property.",
    ),

    h("Four things to check after every major Texas storm"),
    p("A calendar cannot predict hail, tornadoes, tropical systems or severe thunderstorms. After significant weather, a short inspection can catch damage before the next rain."),
    list(
      "Roof and visible flashing from a safe location.",
      "Gutters, downspouts and where water collected around the house.",
      "Trees, fences and exterior structures for movement or breakage.",
      "Interior ceilings, attic areas and windows for new water staining.",
    ),
    p("Document storm damage with photos before temporary repairs when it is safe to do so, and avoid climbing onto a wet or damaged roof."),

    h("The systems that deserve their own long-term replacement plan"),
    p("Seasonal maintenance helps equipment last, but no amount of maintenance makes a roof, water heater or air conditioner permanent. Homeowners should keep a separate list of major systems, their approximate age and likely replacement exposure."),
    list(
      "Roof and flashing.",
      "Heating and air-conditioning equipment.",
      "Water heaters.",
      "Major appliances.",
      "Fences, gates and exterior paint or finishes.",
      "Pool equipment and irrigation systems where present.",
      "Windows, doors and weather seals.",
    ),
    p("That list turns a surprise into a forecast. You may not know the exact year a system will fail, but knowing what is aging helps you build reserves instead of treating every replacement as an emergency."),

    h("A Texas house rewards attention more than perfection"),
    p("You do not need to complete fifty chores every month. The most useful habit is simply noticing the house before weather forces you to notice it."),
    p("Listen when equipment sounds different. Watch where water travels. Look at the roof after storms. Check the air conditioner before summer and the plumbing before a freeze. Keep trees, drainage and irrigation from quietly becoming structural problems."),
    p("Texas weather will always be unpredictable. Home maintenance does not have to be."),
  ],
};
