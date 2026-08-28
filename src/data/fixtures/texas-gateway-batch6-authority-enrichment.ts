import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayBatch6AuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
  relatedCollections?: string[];
  relatedDestinations?: string[];
}

const homeownerMistakes: ArticleBlock[] = [
  { type: "heading", text: "The first mistake is treating every Texas house as though it faces the same risks" },
  { type: "paragraph", text: "A home on the Gulf Coast, a slab house on expansive North Texas soil, a Hill Country property with drainage crossings and a West Texas house exposed to wind or wildfire do not need identical maintenance plans. Start with the inspection report, disclosures, survey, roof age, HVAC history, drainage pattern, insurance declarations and the systems actually installed at the property. Generic Texas advice should be a prompt for property-specific questions, not a diagnosis." },
  { type: "paragraph", text: "Create a dated baseline during the first month. Photograph ceilings, exterior walls, visible foundation cracks, roof edges that can be seen safely from the ground, drainage paths, major trees, fences, plumbing connections, the equipment pad and other conditions that may change. Comparing photographs over time is more useful than trying to remember whether a crack, stain or erosion pattern was always there. Structural, electrical, gas, roofing and major plumbing concerns should be evaluated by an appropriately qualified professional." },
  { type: "heading", text: "Do not learn the insurance policy after the storm" },
  { type: "paragraph", text: "The Texas Department of Insurance explains that home policies vary in covered perils, deductibles and settlement terms. Most standard home policies do not cover flooding, and some coastal homeowners need separate wind and hail coverage. Review the declarations and policy language for dwelling coverage, personal property, additional living expenses, liability, wind and hail deductibles, exclusions and any separate flood or wind policy that applies." },
  { type: "paragraph", text: "Replacement cost and actual cash value can produce very different claim outcomes. Roof settlement provisions can also matter. Do not assume that having insurance means every type of loss or the full cost of every damaged item is covered. Ask the insurer or agent to explain unclear terms before renewal, and document the explanation. A home inventory with photographs, serial numbers and receipts can make a future claim easier to support." },
  { type: "heading", text: "Drainage problems are easier to understand while it is raining" },
  { type: "paragraph", text: "Observe the property during a normal heavy rain from a safe location. Note where roof runoff lands, whether gutters overflow, where downspouts discharge, whether water ponds near the slab, and whether erosion forms along fences, beds or sidewalks. Keep drains and intended flow paths clear, but do not casually regrade a property or redirect runoff toward a neighboring lot. Persistent ponding or foundation-area drainage concerns deserve site-specific advice." },
  { type: "paragraph", text: "Know the main water shutoff and make sure another responsible person in the household can find it. Inspect supply hoses, visible plumbing, toilets, the water-heater area and under-sink cabinets periodically. Small leaks can become expensive damage. Before freezing weather, follow appropriate plumbing and equipment guidance rather than improvising after temperatures fall." },
  { type: "heading", text: "Summer HVAC planning should happen before the first failure" },
  { type: "paragraph", text: "Learn the filter size, thermostat behavior, condensate-drain locations and service history before peak heat. Keep outdoor equipment reasonably clear according to manufacturer guidance. Repeated breaker trips, burning smells, abnormal sounds, unexplained water near indoor equipment or a sudden loss of cooling are not invitations to bypass controls; they are reasons to stop and use qualified service." },
  { type: "paragraph", text: "Energy use is also a house-specific problem. Window orientation, shade, insulation, duct condition, thermostat settings, pool equipment and appliance loads can all matter. Compare utility use over time before buying a large upgrade based on a neighbor's experience. A low-cost air-sealing or maintenance issue may be different from a capacity problem, and a professional assessment can distinguish them." },
  { type: "heading", text: "Trees, pests and irrigation need observation rather than a once-a-year checklist" },
  { type: "paragraph", text: "Dead limbs over a roof, irrigation spraying structures, standing water that supports mosquitoes, active termite evidence and recurring wasp or fire-ant problems are different categories of risk. Address the actual condition instead of blanket-treating everything on a calendar. Pest-control products and tree work can create their own hazards when misused, so labels and qualified professionals matter." },
  { type: "paragraph", text: "Irrigation should respond to soil, rainfall, plant needs and local watering rules. More water is not automatically better for a lawn or foundation, and a sprinkler schedule copied from another city or soil type may be inappropriate. Watch for runoff, broken heads, overspray and saturated areas, then adjust using local guidance rather than intuition alone." },
  { type: "heading", text: "End year one with a house-specific operating manual" },
  { type: "paragraph", text: "Keep one record of contractor visits, HVAC service, roof work, plumbing repairs, pest treatment, irrigation changes, insurance renewals and major storm observations. Add photographs of normal valve positions and shutoffs where useful. The goal after the first year is not to have eliminated every future surprise; it is to know the property's weak points, who to call and what normal looks like before the next heat wave, hailstorm or freeze." },
];

const gardeningMistakes: ArticleBlock[] = [
  { type: "heading", text: "Start with the site instead of the plant label" },
  { type: "paragraph", text: "Texas gardens fail when a statewide plant list is treated as more important than the actual yard. Soil texture, drainage, reflected heat, afternoon sun, wind, irrigation coverage and winter exposure can vary dramatically even within the same city. Texas A&M AgriLife's Earth-Kind approach emphasizes matching plants to local conditions and managing the landscape for resource efficiency rather than assuming native automatically means maintenance-free." },
  { type: "paragraph", text: "Map the site before buying plants. Mark full morning sun, harsh western exposure, deep shade, roof runoff, low areas that stay wet, slopes that shed water, utility lines and the mature canopy of existing trees. A plant suited to Texas in general can still be wrong for one bed. Mature height and width matter too; repeated pruning is often a sign that the original plant was placed in a space too small for it." },
  { type: "heading", text: "Do not assume all Texas soil behaves like clay" },
  { type: "paragraph", text: "Expansive clay is common in many populated areas, but Texas also has sandy, rocky, calcareous and loamy soils with very different drainage and nutrient behavior. Before changing soil aggressively, learn what is present. Water that runs off compacted clay may need a different irrigation strategy than water disappearing rapidly through sand. Raised beds, containers and native soils also behave differently from one another." },
  { type: "paragraph", text: "Amending every planting hole heavily can create a small pocket that behaves differently from surrounding soil. Follow plant- and site-appropriate Extension guidance rather than using one amendment recipe everywhere. When drainage is persistently poor, changing the plant choice or bed design can be more reliable than trying to force a poorly suited species to survive." },
  { type: "heading", text: "Watering errors are often scheduling errors" },
  { type: "paragraph", text: "Texas A&M AgriLife notes that irrigation runoff is a major source of landscape water waste and promotes cycle-and-soak approaches where appropriate. Long sprinkler runs on clay or slopes can exceed the soil's infiltration rate, sending water into streets instead of roots. Splitting irrigation into shorter cycles can allow water to soak in, while sandy soils or drip systems require different timing. The correct schedule depends on soil, slope, system and weather." },
  { type: "paragraph", text: "Adjust irrigation seasonally rather than leaving a summer program running all year. Rainfall, temperature and plant demand change. Inspect for broken, tilted or blocked heads and overspray onto pavement. Grouping plants with similar water needs makes scheduling easier. Newly planted native or adapted plants can still require establishment watering before becoming lower-input landscape plants." },
  { type: "heading", text: "Mulch helps when it is used as a soil cover, not piled against trunks" },
  { type: "paragraph", text: "AgriLife describes mulch as a tool for reducing evaporation, erosion and weeds while moderating soil conditions. Keep organic mulch over the root zone at an appropriate depth for the material, but avoid piling it against tree trunks or plant crowns. Volcano-shaped mulch around trunks traps moisture where it is not wanted and can hide problems." },
  { type: "paragraph", text: "Mulch is not a substitute for fixing drainage. If a bed remains saturated after rain or irrigation, adding more mulch does not solve the water movement problem. Likewise, a dry bed under a roof overhang may need targeted irrigation even when the rest of the yard has received rain." },
  { type: "heading", text: "Plant timing can matter as much as plant choice" },
  { type: "paragraph", text: "Installing a large landscape during extreme summer heat creates an avoidable establishment challenge. In many parts of Texas, fall or milder-season planting gives roots more time to establish before peak heat, though species and region matter. If summer planting cannot be avoided, monitor moisture carefully without turning the root zone into a permanently saturated environment." },
  { type: "paragraph", text: "Freeze sensitivity deserves the same regional thinking. A plant that performs reliably in the Lower Rio Grande Valley may be damaged repeatedly in North Texas. Microclimates near south-facing walls can also differ from exposed beds. Use local Extension resources and plant-hardiness information instead of assuming a statewide recommendation has identical winter performance everywhere." },
  { type: "heading", text: "A lower-input garden is usually designed, not rescued" },
  { type: "paragraph", text: "The most durable Texas landscapes reduce mismatch: less high-input lawn where grass struggles, adapted plants in the right exposure, efficient irrigation, protected soil and realistic mature sizes. That reduces the temptation to solve every problem with more water, more fertilizer or more pesticide. When a plant repeatedly fails despite reasonable care, replacing it with something better suited to the site can be the most sustainable correction." },
];

export const texasGatewayBatch6AuthorityEnrichment: Record<string, GatewayBatch6AuthorityEnrichment> = {
  "texas-homeowner-mistakes": {
    body: homeownerMistakes,
    sourceName: "Texas Department of Insurance — Home insurance guide",
    sourceUrl: "https://agate.tdi.texas.gov/pubs/consumer/cb025.html",
    internalLinks: [
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
      { href: "/article/texas-hurricane-home-prep-checklist", label: "Texas hurricane home-prep checklist" },
      { href: "/article/prepare-texas-pool-for-winter", label: "Prepare a Texas pool for freezing weather" },
    ],
    relatedDestinations: ["houston", "dallas"],
  },
  "texas-gardening-mistakes": {
    body: gardeningMistakes,
    sourceName: "Texas A&M AgriLife Extension — Earth-Kind Publications",
    sourceUrl: "https://aggie-horticulture.tamu.edu/earthkind/publications/",
    internalLinks: [
      { href: "/article/texas-native-garden-that-survives-august", label: "A Texas garden that survives August" },
      { href: "/article/best-native-plants-texas-yard", label: "Best native plants for a Texas yard" },
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
    ],
    relatedCollections: ["home-garden"],
    relatedDestinations: ["austin"],
  },
};
