import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayAuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
}

const firstYearHomeowner: ArticleBlock[] = [
  { type: "heading", text: "Build a maintenance plan around the house you actually bought" },
  { type: "paragraph", text: "A first year of Texas homeownership is easier when statewide risks are separated from property-specific ones. A Gulf Coast house may need more attention to wind, flood exposure and salt air, while a North Texas home may see more hail and hard-freeze risk. Expansive soils matter in many communities, but not every foundation behaves the same way. Keep the inspection report, seller disclosures, survey, warranty information, appliance manuals and insurance policy together, then build a calendar from the roof, drainage, HVAC, plumbing, irrigation, trees, pool equipment and other systems that are actually present." },
  { type: "paragraph", text: "Make a dated baseline. Photograph ceilings, visible plumbing connections, the water-heater area, exterior walls, drainage paths, large trees, fences, equipment pads and cracks that already exist. The purpose is not to diagnose every mark as damage; it is to know what was present so later change is easier to identify. Structural, electrical, gas, roofing and major plumbing concerns deserve a qualified professional rather than an internet diagnosis." },
  { type: "heading", text: "Read the insurance policy before severe weather makes you read it" },
  { type: "paragraph", text: "The Texas Department of Insurance explains that home policies differ in what losses they cover and whether property is settled at replacement cost or actual cash value. Flooding is not covered by a standard homeowners policy, and some coastal properties need separate wind coverage arrangements. During the first year, confirm the dwelling limit, deductible structure, personal-property treatment, additional living expense coverage, wind and hail terms, and exclusions that matter to the property. Store insurer and agent contact details somewhere accessible even if the house is temporarily inaccessible." },
  { type: "paragraph", text: "Create a home inventory with photographs, serial numbers and receipts for major possessions, and keep a copy away from the house or in secure cloud storage. Review coverage when the property changes rather than waiting until renewal week. A new pool, major remodel, home-sharing use, roof replacement or other material change may affect what the insurer needs to know. Insurance is not a maintenance substitute, but clear records make a real loss easier to document." },
  { type: "heading", text: "Water and drainage deserve year-round attention" },
  { type: "paragraph", text: "Observe the property during an ordinary heavy rain. Note where roof runoff lands, whether gutters overflow, where downspouts discharge, whether water ponds near the slab and whether erosion is developing. Keep existing drainage paths clear, but do not casually regrade a lot or redirect runoff onto neighboring property. Repeated ponding, erosion or moisture near the foundation is a reason for site-specific advice from an appropriate drainage, foundation or engineering professional." },
  { type: "paragraph", text: "Know where the main water shutoff is and make sure another adult in the household can find it. Periodically inspect under sinks, around toilets, at washing-machine connections and near the water heater for leaks or corrosion. Before a freeze, protect exposed plumbing according to the house and local conditions. If a pipe freezes, do not use an open flame to thaw it; when the location or condition is uncertain, a plumber is the safer choice." },
  { type: "heading", text: "Treat cooling, heat and freeze planning as household infrastructure" },
  { type: "paragraph", text: "In much of Texas the air-conditioning system carries a heavy load for months. Learn the filter size, thermostat behavior, condensate-drain locations and service history. Keep outdoor equipment reasonably clear of vegetation without damaging it, and pay attention to new water around the indoor unit, repeated breaker trips, unusual noises or a sudden loss of cooling. Those symptoms can have many causes and are reasons to use a qualified HVAC technician rather than bypassing controls or guessing at electrical or refrigerant work." },
  { type: "paragraph", text: "Build separate plans for heat outages, severe thunderstorms and freezes. Heat planning should include drinking water, backup charging, alerts and a safe cooled location for vulnerable people. Storm planning should include a known interior shelter location and multiple warning methods. Freeze planning should cover exposed plumbing and manufacturer-specific procedures for outdoor equipment such as irrigation and pool systems. If automation includes freeze protection, learn what it can and cannot protect before the first hard freeze." },
  { type: "heading", text: "End the first year with better records than you started with" },
  { type: "paragraph", text: "Keep a simple log of HVAC service, roof work, plumbing repairs, pest treatment, irrigation changes, appliance replacements, insurance updates and major weather damage. Add permit or contractor information when relevant. At the end of the year, repeat the baseline photo walk-through. Comparing like-for-like photographs helps distinguish normal aging from a meaningful change and gives the second year a maintenance plan based on how the house actually behaved rather than on a generic checklist." },
];

const summerPoolOpening: ArticleBlock[] = [
  { type: "heading", text: "Opening a Texas pool starts with safety, not chemicals" },
  { type: "paragraph", text: "Before extending pump run time or adding chemicals, inspect the pool area as a system. Confirm barriers and self-closing, self-latching gates work; check drain covers and rescue equipment; and make sure household door or window safeguards used to prevent unsupervised access still function. Federal pool-safety guidance emphasizes layers of protection because no single barrier replaces active supervision. If a drain cover is missing, broken or questionable, keep swimmers out until it is evaluated and corrected." },
  { type: "paragraph", text: "Walk the equipment pad while equipment is off and look for cracked housings, damaged wiring enclosures, corrosion, winter leaks and debris that could interfere with ventilation. Start circulation only according to the equipment manual, then watch for persistent leaks, abnormal sounds, failure to prime or loss of flow. A pump that will not operate normally is not a reason to bypass a safety device. Electrical faults, gas odors, heater problems and damaged pressure vessels call for qualified service." },
  { type: "heading", text: "Test the water before making corrections" },
  { type: "paragraph", text: "CDC identifies disinfectant level and pH as the first defense against germs in residential pools and hot tubs. Its home-pool guidance recommends pH from 7.0 to 7.8 and at least 1 ppm free chlorine in pools without cyanuric acid; when cyanuric acid or stabilized chlorine is used, CDC recommends at least 2 ppm free chlorine. The product label, installed equipment and local conditions still matter, so measure first and follow the chemical manufacturer's directions rather than relying on a universal dose." },
  { type: "paragraph", text: "Sunlight, heat, swimmers and debris can change chlorine demand quickly during a Texas summer. CDC recommends testing chlorine and pH at least twice per day and more often during heavy use. That is more frequent than many casual routines, but it highlights the core principle: conditions change. A repeatable test process is more reliable than judging water by clarity or odor alone." },
  { type: "heading", text: "Store and handle pool chemicals deliberately" },
  { type: "paragraph", text: "Pool chemicals can cause fires, toxic gas releases and serious injury when incompatible products contact one another or water reaches stored material. Keep products in their original labeled containers, dry and secured from children and pets, and follow label directions for protective equipment and addition sequence. Never combine leftover products in a common container. If a spill, unexpected reaction or strong irritating vapor occurs, move people away and follow emergency guidance rather than improvising a cleanup." },
  { type: "paragraph", text: "Make small, measured corrections with circulation operating as directed, allow the manufacturer's specified circulation time, and retest before adding more. If water is extremely out of balance, the pool was neglected for a long period, there is visible contamination or you do not know what was previously added, a qualified pool professional can establish a safer baseline without creating a sequence of competing chemical additions." },
  { type: "heading", text: "Verify filtration and circulation in the real pool" },
  { type: "paragraph", text: "Clean skimmer and pump baskets, inspect the filter according to its manual and confirm that returns are moving water through the pool. Steps, benches and shelves often need brushing even when the main body looks clean. Do not borrow another pool's pressure reading as a universal filter-cleaning threshold; establish the clean operating pressure for the installed filter and follow its manufacturer guidance. A sudden pressure or flow change is a diagnostic clue, not an invitation to defeat a valve or safety feature." },
  { type: "paragraph", text: "There is no single statewide pump schedule that fits every Texas pool. Variable-speed equipment, plumbing design, sanitizer system, water volume, shade, debris and bather load all matter. Start from manufacturer guidance and measured water quality, then adjust based on performance. Longer run time cannot compensate for broken circulation, inadequate disinfectant or an overloaded filter." },
  { type: "heading", text: "Do not open the season until all safety gates pass" },
  { type: "paragraph", text: "A clean-looking pool can still be unsafe if a gate does not latch, a drain cover is compromised, disinfectant is inadequate or electrical equipment is damaged. Treat startup as five independent gates: controlled access, sound equipment, working circulation, acceptable water chemistry and a supervision plan. Children need continuous, close supervision around water, and adults should know where rescue equipment is and how to respond to a swimmer in distress." },
];

const winterPoolPrep: ArticleBlock[] = [
  { type: "heading", text: "A Texas pool freeze plan starts with the forecast and equipment manuals" },
  { type: "paragraph", text: "Texas pools use many different plumbing layouts, pumps, filters, heaters, chlorinators, automation systems and water features, so there is no safe universal valve position or drain sequence. Before freezing weather arrives, identify each installed component, locate its manual and record the manufacturer's freeze or winterization instructions. If the plumbing layout is unclear, have a qualified pool professional explain which lines and components are vulnerable before an emergency rather than learning by trial and error during a hard freeze." },
  { type: "paragraph", text: "National Weather Service cold-weather guidance emphasizes preparing before temperatures fall. Monitor the actual forecast instead of relying on the calendar. A brief dip near freezing is different from many hours well below 32°F. Wind can accelerate heat loss from exposed equipment even though wind chill does not lower an object below the actual air temperature. Duration, severity, equipment exposure and power reliability all influence risk." },
  { type: "heading", text: "Know what automated freeze protection can and cannot do" },
  { type: "paragraph", text: "Many pool automation systems can run pumps when an air sensor reaches a programmed threshold. That can reduce freezing risk in plumbing that is actually receiving flow, but it is not a guarantee against damage. A closed valve, blocked line, failed sensor, tripped breaker, pump problem or utility outage can defeat the strategy. Confirm the feature is enabled and configured according to the equipment manual before the cold front, and do not assume an app showing 'on' proves every water path is moving." },
  { type: "paragraph", text: "Water features, booster pumps, solar loops, outdoor showers, autofill assemblies and seldom-used lines may not be protected just because the main circulation pump is running. Inventory those branches. If the manufacturer calls for isolation, draining or another procedure, follow those instructions or use qualified service. Avoid improvised valve changes during a freeze if you do not understand the plumbing because closing the wrong path can create trapped water and a new failure point." },
  { type: "heading", text: "Plan for a power outage before relying on circulation" },
  { type: "paragraph", text: "A circulation-based freeze strategy depends on electricity. Decide in advance what the manufacturer recommends if power is lost during freezing conditions. Some systems can be safely drained at specified plugs or unions while others require a different sequence. Pressure filters, heaters and pumps can be damaged if opened, drained or restarted incorrectly. If you have not practiced the approved procedure in normal weather, call a qualified pool professional rather than improvising in darkness and freezing temperatures." },
  { type: "paragraph", text: "Portable generators add a separate life-safety risk. Weather and federal safety guidance warns that portable generators must operate outdoors and away from doors, windows and garages because carbon monoxide can accumulate indoors. A generator should connect only through an appropriate code-compliant setup; never backfeed a house through an improvised connection. Protecting pool plumbing is never worth creating an electrical or carbon-monoxide hazard." },
  { type: "heading", text: "Do not invent a heater-based freeze strategy" },
  { type: "paragraph", text: "A pool heater is not automatically a freeze-protection device. Running one in extreme conditions can be inappropriate for some equipment and may not protect unheated branches of plumbing. Follow the heater and automation manufacturer's cold-weather guidance. If a heater shows an error, loses flow, smells of gas or behaves abnormally, shut it down as directed and use qualified service. Never defeat a flow switch, pressure switch, exhaust safeguard or other safety control to keep heat running." },
  { type: "heading", text: "Inspect after the thaw before returning to normal operation" },
  { type: "paragraph", text: "When temperatures recover, look for cracked housings, displaced unions, wet areas, abnormal pressure, loss of prime and new leaks. If ice may still be present, do not force valves or start equipment against an obstruction. Water expands as it freezes, so damage can become visible only after thawing. If a component is cracked or water is reaching electrical equipment, shut the system down safely and call for service." },
  { type: "paragraph", text: "Use the first freeze to improve the written plan for the next one. Record what temperature triggered automation, whether all features circulated, what happened during any outage, which components were difficult to access and what a technician recommended. Keep photographs of normal valve positions and labels for shutoffs or manufacturer-approved drain points. The goal is not to turn every owner into a pool technician; it is to remove uncertainty before the next hard freeze arrives." },
];

const roadTripCarKit: ArticleBlock[] = [
  { type: "heading", text: "Build the kit around the failure that would leave you waiting" },
  { type: "paragraph", text: "NHTSA recommends carrying an emergency roadside kit even in a well-maintained vehicle. Texas makes that advice especially useful because a breakdown can happen in urban traffic, on a ranch-to-market road, in desert heat or during a winter front. Start with items that help you summon assistance, stay visible and remain safe while waiting: a charged phone and vehicle charger, first-aid supplies, flashlight, reflective warning equipment, drinking water, nonperishable food, needed medicines, basic maps and weather-appropriate clothing or blankets." },
  { type: "paragraph", text: "The exact kit should change with the route. A short drive between major cities does not require the same reserve as a remote West Texas segment. Add extra water and sun protection for hot-weather travel, warmer layers for winter, and enough medication for an unexpected delay. If traveling with children, older adults or pets, include their needs explicitly. Check expiration dates, batteries and supplies before long trips instead of assuming the kit is still ready because it remains in the trunk." },
  { type: "heading", text: "Carry tools only if you can use them without creating a traffic hazard" },
  { type: "paragraph", text: "NHTSA's suggested roadside items include jumper cables, a tire-pressure gauge, a jack with a ground mat, work gloves and basic tools. Those can help with a simple problem, but traffic location matters more than finishing a repair. Do not change a tire or work beside the vehicle where passing traffic makes the position unsafe. If you cannot move to a safer location, stay protected as circumstances allow, contact emergency or roadside assistance and follow law-enforcement instructions." },
  { type: "paragraph", text: "Before departure, confirm the spare tire or inflation system is present and usable, know where the wheel-lock key is stored and verify that the jack matches the vehicle. Some modern vehicles have no spare, and electric vehicles have model-specific towing and high-voltage requirements. The owner's manual controls. Never crawl under a vehicle supported only by an emergency jack, and do not attempt repairs involving fuel, high-voltage systems or roadside exposure beyond your training." },
  { type: "heading", text: "Heat can turn a mechanical delay into a medical emergency" },
  { type: "paragraph", text: "In a Texas summer, a failed air conditioner or breakdown on exposed pavement can become a heat emergency before the mechanical problem is solved. Carry drinking water, know the signs of heat illness and have a plan to move vulnerable passengers to a safer cooled location when that can be done without entering traffic or another hazard. Never leave a child, dependent adult or pet in a parked vehicle while troubleshooting or seeking help." },
  { type: "paragraph", text: "Route planning belongs in the emergency plan. NHTSA advises checking weather, road conditions and traffic before departure. For Texas trips, current state-road information can be checked through DriveTexas, while local alerts matter during flooding, wildfires, severe storms or winter weather. Do not drive around barricades or into floodwater because the destination appears close. Offline maps are useful when cell service disappears, but they do not override a closure or evacuation instruction." },
  { type: "heading", text: "Fuel or charge margin beats a heroic rescue plan" },
  { type: "paragraph", text: "Identify fuel or charging stops before entering long sparsely served segments and avoid arriving at the last planned stop with no alternative. Detours, headwinds, extreme temperatures, towing and idling can change consumption. Electric-vehicle drivers should verify charger compatibility and current status through the network when possible. Gasoline drivers should not treat loose fuel containers inside the passenger compartment as an improvised range solution." },
  { type: "paragraph", text: "A pre-trip mechanical check prevents more trouble than most emergency gear can repair. Inspect tire condition and pressure, lights, wipers and visible fluid issues; address warning lights that indicate a real fault; and make sure scheduled maintenance is current. NHTSA's road-trip guidance specifically emphasizes tires and vehicle readiness. If the vehicle is already showing overheating, charging, braking or tire problems, fix the problem before choosing a remote route." },
  { type: "heading", text: "Know who to call and how to describe where you are" },
  { type: "paragraph", text: "Save roadside-assistance information before leaving and know whether coverage comes from insurance, a vehicle manufacturer, membership service or another provider. In an emergency, call 911. For a non-emergency breakdown, give the road name or number, direction of travel, nearest mile marker or intersecting road and any recognizable landmark. Phone coordinates can help, but a dispatcher or roadside operator still needs a clear description of the situation and whether the vehicle is blocking traffic." },
  { type: "paragraph", text: "If stranded, conserve phone battery and keep people together unless remaining with the vehicle creates a greater hazard. Use warning equipment according to its instructions and conditions; flares can create fire risk in dry vegetation, so reflective devices may be more appropriate. Do not walk a long distance along a high-speed roadway unless authorities direct it and there is no safer option." },
  { type: "heading", text: "Refresh the kit instead of letting it become trunk archaeology" },
  { type: "paragraph", text: "Twice a year and before major trips, pull the kit out. Charge or replace batteries, inspect the flashlight, replace expired food and medicine, rotate drinking water as needed, verify cables and tools are still present and update emergency contacts. Adjust clothing for the season. A kit built years ago for a different vehicle may no longer match the current jack points, tire equipment, charging needs or passengers." },
];

export const texasGatewayBatch4AuthorityEnrichment: Record<string, GatewayAuthorityEnrichment> = {
  "things-texas-homeowners-learn-first-year": {
    body: firstYearHomeowner,
    sourceName: "Texas Department of Insurance — Home insurance guide",
    sourceUrl: "https://www.tdi.texas.gov/pubs/consumer/cb025.html",
    internalLinks: [
      { href: "/texas-home-insurance-calculator", label: "Texas home insurance calculator" },
      { href: "/article/texas-hurricane-home-prep-checklist", label: "Texas hurricane home-prep checklist" },
      { href: "/article/texas-pests-homeowners-should-know", label: "Texas pests homeowners should know" },
      { href: "/article/texas-homeowner-mistakes", label: "Common Texas homeowner mistakes" },
    ],
  },
  "open-pool-for-texas-summer": {
    body: summerPoolOpening,
    sourceName: "CDC — Home Pool and Hot Tub Water Treatment and Testing",
    sourceUrl: "https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html",
    internalLinks: [
      { href: "/article/prepare-texas-pool-for-winter", label: "Prepare a Texas pool for freezing weather" },
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
      { href: "/article/texas-homeowner-mistakes", label: "Common Texas homeowner mistakes" },
    ],
  },
  "prepare-texas-pool-for-winter": {
    body: winterPoolPrep,
    sourceName: "National Weather Service — Prepare for Cold Weather",
    sourceUrl: "https://www.weather.gov/safety/cold-before",
    internalLinks: [
      { href: "/article/open-pool-for-texas-summer", label: "Open a Texas pool for summer" },
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
      { href: "/article/texas-homeowner-mistakes", label: "Common Texas homeowner mistakes" },
      { href: "/article/texas-weather-surprises-newcomers", label: "Texas weather surprises newcomers" },
    ],
  },
  "what-to-keep-in-car-for-texas-road-trip": {
    body: roadTripCarKit,
    sourceName: "NHTSA — Summer Driving & Road Trip Tips",
    sourceUrl: "https://www.nhtsa.gov/summer-driving-tips",
    internalLinks: [
      { href: "/article/things-you-see-on-a-texas-road-trip", label: "What you notice on a Texas road trip" },
      { href: "/article/texas-road-trip-stops-worth-the-detour", label: "Texas road-trip stops worth the detour" },
      { href: "/article/best-first-texas-road-trip", label: "Plan a first Texas road trip" },
      { href: "/road-trips", label: "Texas road trips" },
    ],
  },
};
