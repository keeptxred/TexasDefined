import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayAuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
}

const homeownerMistakes: ArticleBlock[] = [
  { type: "heading", text: "The expensive mistakes usually start with assumptions" },
  { type: "paragraph", text: "Texas is too large for one home-maintenance formula. A Gulf Coast property may have very different wind, flood and corrosion exposure from a house in the Panhandle; expansive soils matter in many communities but not every lot behaves alike. The first mistake is treating a statewide checklist as a diagnosis. Start with the inspection report, survey, drainage pattern, roof age, HVAC history, insurance declarations, utility setup and the systems that are actually present on the property." },
  { type: "paragraph", text: "Create a baseline during the first calm month rather than waiting for a claim or repair. Photograph visible cracks, roof and fence condition from safe locations, drainage paths, equipment pads, ceilings and major plumbing connections. Keep receipts and service records. A baseline does not tell you whether a condition is structural or cosmetic, but it makes change easier to identify and gives a qualified contractor, engineer or insurer better information later." },
  { type: "heading", text: "Do not assume the insurance policy covers every Texas weather loss" },
  { type: "paragraph", text: "The Texas Department of Insurance says most home policies do not cover flood damage, and coastal homes may need separate wind and hail coverage. Policies also differ in deductibles, replacement-cost versus actual-cash-value treatment, exclusions and coverage limits. Read the declarations and endorsements before storm season, not after damage. Ask the insurer or agent to explain anything unclear and keep contact information and policy records somewhere you can reach away from home." },
  { type: "paragraph", text: "Roof age deserves attention because it can affect both maintenance and insurance economics. Do not wait for a hailstorm to discover what the policy will pay or how the roof is valued. If wind or hail damage occurs, document it promptly and prevent additional damage when that can be done safely. Avoid signing rushed repair or assignment documents with an unfamiliar contractor simply because a storm created neighborhood demand." },
  { type: "heading", text: "Drainage problems are easier to see in the rain than in a listing photo" },
  { type: "paragraph", text: "Watch the property during a heavy but ordinary storm. Note where gutters overflow, where downspouts discharge, whether water ponds against the slab, which fence lines collect runoff and whether soil is eroding. Keep drains and existing flow paths clear, but do not casually regrade the lot or redirect runoff toward a neighbor. Persistent ponding or erosion calls for property-specific advice rather than a generic landscaping fix." },
  { type: "paragraph", text: "Mapped flood zones are important, but they are not a guarantee that flooding cannot occur elsewhere. TDI notes that floods can happen outside designated flood zones. Homeowners should separate two questions: what the property's drainage and flood exposure looks like, and what insurance would respond if rising water enters the home. A standard home policy generally does not answer the second question." },
  { type: "heading", text: "Overwatering is not a foundation-maintenance plan" },
  { type: "paragraph", text: "Some Texas soils shrink and swell as moisture changes, but that does not justify soaking every foundation perimeter on a fixed daily schedule. Soil, grading, vegetation, rainfall, foundation type and local conditions differ. Irrigation should meet landscape needs without creating runoff or persistently wet soil beside the structure. If movement appears significant or progressive, use an appropriate licensed or qualified professional rather than trying to correct a structural concern with more sprinkler time." },
  { type: "paragraph", text: "Learn the irrigation controller before summer. Repair broken heads, keep spray off pavement and adjust schedules to weather, restrictions and plant needs. A system inherited from the prior owner may contain old programs that run far more often than expected. Water bills and soggy beds are often the first clues." },
  { type: "heading", text: "HVAC maintenance becomes urgent when the cooling season is long" },
  { type: "paragraph", text: "A neglected air-conditioning system can become a comfort and safety problem during extreme heat. Learn the filter size and replacement pattern, know where condensate drains, keep outdoor equipment reasonably clear and schedule qualified service when the system shows abnormal noise, repeated breaker trips, water where it should not be or a sudden loss of capacity. Do not bypass electrical or pressure safeguards to keep a failing unit running." },
  { type: "paragraph", text: "Energy use is also a building-envelope question. Shade, insulation, duct condition, window exposure and air leakage affect how hard the system works. Before assuming the only solution is a larger unit, diagnose the house as a system. Oversizing or equipment changes should be based on professional load and system evaluation, not a rule of thumb copied from another property." },
  { type: "heading", text: "Freeze preparation belongs on the calendar before the warning" },
  { type: "paragraph", text: "Know the main water shutoff, protect exposed plumbing as appropriate, disconnect hoses when freezing weather approaches and understand manufacturer guidance for irrigation, pools and other outdoor equipment. If the house depends on electric heat or automated freeze protection, plan for power loss too. Portable generators must stay outdoors and away from openings; protecting plumbing is never worth creating a carbon-monoxide or backfeed hazard." },
  { type: "paragraph", text: "After a freeze, inspect for leaks as temperatures recover. A cracked line or equipment housing may not reveal itself until thawing. If water reaches electrical equipment or a leak cannot be isolated safely, shut systems down as appropriate and use a qualified professional." },
  { type: "heading", text: "The first-year goal is a documented operating plan" },
  { type: "paragraph", text: "By the end of the first year, a homeowner should know when the roof was last replaced, how the HVAC has been serviced, where water shuts off, how drainage behaves, what the insurance excludes, what freezes require and which contractors or utilities to call. Keep that information with photographs, warranties and receipts. The best way to avoid repeating first-year mistakes is to turn each surprise into a documented procedure for the next season." },
];

const gardeningMistakes: ArticleBlock[] = [
  { type: "heading", text: "The first Texas gardening mistake is treating the state as one growing region" },
  { type: "paragraph", text: "Texas A&M AgriLife Extension organizes landscape guidance around regional adaptability because rainfall, winter cold, summer heat, soil and humidity vary widely across the state. A plant that thrives in East Texas may struggle in alkaline Hill Country soil or West Texas dryness. Before buying by appearance, identify the site's sun exposure, drainage, soil limitations, mature plant size and local hardiness conditions." },
  { type: "paragraph", text: "County Extension and regional plant resources are more useful than a generic national list. Native and well-adapted plants can reduce inputs when they fit the actual site, but 'native to Texas' is still too broad by itself. Match the plant to the region and microclimate rather than assuming every Texas native belongs in every Texas yard." },
  { type: "heading", text: "Full sun on a tag does not describe every Texas exposure" },
  { type: "paragraph", text: "Six or more hours of sun can mean mild morning light or intense reflected west-afternoon heat beside masonry and pavement. Observe the bed through a summer day before placing expensive plants. Buildings, fences and trees also change exposure across seasons. A plant may receive winter sun and deep summer shade, or the opposite, as the sun angle and tree canopy change." },
  { type: "paragraph", text: "Designing around the site's existing exposure is usually easier than repeatedly replacing plants that dislike it. Use tougher heat-adapted material in reflected hot zones, reserve moisture-loving plants for places where irrigation and soil can support them, and do not force turf beneath dense shade simply because lawn exists elsewhere on the property." },
  { type: "heading", text: "Water deeply enough to matter, but not so fast that it runs away" },
  { type: "paragraph", text: "AgriLife irrigation guidance emphasizes matching application to soil, slope and plant needs. Clay soils and slopes may accept water more slowly than a sprinkler applies it, causing runoff long before the root zone receives what was intended. Cycle-and-soak scheduling can split a needed runtime into shorter applications so water has time to infiltrate instead of moving down the street." },
  { type: "paragraph", text: "The opposite mistake is frequent shallow watering that keeps only the surface wet. Established plants generally benefit from irrigation that reaches the root zone and then allows appropriate drying between events, but exact frequency depends on species, soil, weather and establishment stage. Newly planted material needs closer attention than an established drought-adapted bed. Use soil moisture and plant response rather than a calendar alone." },
  { type: "heading", text: "Mulch should protect soil, not bury trunks" },
  { type: "paragraph", text: "Texas A&M AgriLife notes that mulch reduces evaporation, suppresses weeds and protects soil. Apply it over the root zone at an appropriate depth for the material, but keep it from being piled against tree trunks and plant crowns. A deep volcano of mulch against bark can hold unwanted moisture and hide problems. Replenish based on decomposition rather than automatically adding another full layer every season." },
  { type: "paragraph", text: "Organic mulch also changes over time. It can improve surface soil as it breaks down, but it does not correct severe drainage problems or unsuitable soil structure by itself. If water stands for long periods after rain, determine whether the problem is grading, compaction, soil, drainage infrastructure or another site condition before simply adding compost or mulch." },
  { type: "heading", text: "More fertilizer is not the cure for heat stress" },
  { type: "paragraph", text: "A plant wilting during extreme heat may be short of water, suffering root problems, newly transplanted, exposed to reflected heat or simply responding to midday conditions. Fertilizer does not fix those problems and excessive nutrients can create new stress. Test soil when nutrient or pH questions matter, follow product labels and species guidance, and avoid treating every yellow leaf as a nitrogen deficiency." },
  { type: "paragraph", text: "The same restraint applies to pesticides. Identify the pest before treating, use the least disruptive effective approach and follow labels exactly. Beneficial insects, pollinators and harmless organisms share the landscape with pests. A routine broad-spectrum spray schedule can damage the ecological help the garden is receiving for free." },
  { type: "heading", text: "Planting season can matter more than plant size" },
  { type: "paragraph", text: "Installing trees and shrubs immediately before peak summer can force a new root system to establish under the hardest conditions of the year. In many parts of Texas, cooler-season planting gives woody plants more time to establish before intense heat, though species and region matter. When summer planting is unavoidable, irrigation monitoring and protection from transplant stress become more important." },
  { type: "paragraph", text: "Freeze sensitivity also deserves planning before purchase. A plant marketed locally may still be tender in an unusual cold event. Know whether it can be protected, whether it will resprout if damaged and whether repeated replacement makes sense for the role it fills." },
  { type: "heading", text: "A WaterWise garden is a design decision, not a brown-yard aesthetic" },
  { type: "paragraph", text: "AgriLife's Texas Urban Landscape Guide emphasizes putting the right plant in the right place and minimizing unnecessary water and fertilizer inputs. Group plants with similar water needs, reduce turf where it consistently fails, capture useful rainfall where appropriate and choose a landscape structure that still looks intentional when irrigation is restricted." },
  { type: "paragraph", text: "The strongest Texas garden is not the one with the longest plant list. It is the one whose soil, exposure, irrigation, plant palette and maintenance expectations agree with one another. Designing around those constraints makes August less of a rescue operation and gives the landscape a better chance to recover from drought, downpours and freezes." },
];

export const texasGatewayBatch6AuthorityEnrichment: Record<string, GatewayAuthorityEnrichment> = {
  "texas-homeowner-mistakes": {
    body: homeownerMistakes,
    sourceName: "Texas Department of Insurance — Home insurance guide",
    sourceUrl: "https://www.tdi.texas.gov/pubs/consumer/cb025.html",
    internalLinks: [
      { href: "/article/things-texas-homeowners-learn-first-year", label: "First-year lessons for Texas homeowners" },
      { href: "/texas-home-insurance-calculator", label: "Texas home insurance calculator" },
      { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze" },
      { href: "/article/texas-weather-surprises-newcomers", label: "Texas weather surprises newcomers" },
      { href: "/home-garden", label: "Texas home and garden" },
    ],
  },
  "texas-gardening-mistakes": {
    body: gardeningMistakes,
    sourceName: "Texas A&M AgriLife Extension — Texas Urban Landscape Guide",
    sourceUrl: "https://agrilifeextension.tamu.edu/asset-local/texas-urban-landscape-guide/",
    internalLinks: [
      { href: "/article/texas-native-garden-that-survives-august", label: "Build a Texas garden that survives August" },
      { href: "/article/best-native-plants-texas-yard", label: "Native plants for a Texas yard" },
      { href: "/article/texas-homeowner-mistakes", label: "Common Texas homeowner mistakes" },
      { href: "/home-garden", label: "Texas home and garden" },
      { href: "/guides", label: "Texas practical guides" },
    ],
  },
};
