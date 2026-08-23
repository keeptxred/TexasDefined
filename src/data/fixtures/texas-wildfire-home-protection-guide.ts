import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasWildfireHomeProtectionGuideArticle: Article = {
  id: "evergreen-texas-wildfire-home-protection-guide",
  brandId: "texasdefined",
  slug: "texas-wildfire-home-protection-guide",
  title: "Texas Wildfire Home Protection: Embers, Defensible Space, Evacuation and Rural Property Risk",
  dek: "A practical Texas homeowner guide to wildfire risk: TxWRAP, ember hardening, home ignition zones, roofs and vents, landscaping, decks and fences, responder access, evacuation, insurance records and what to check before buying rural property.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Home_destroyed_by_Bastrop_County_complex_fire_(311-MAD-51537).jpg?width=1600",
    alt: "Bastrop County home destroyed by wildfire in September 2011",
    width: 1600,
    height: 1062,
    credit: "Patsy Lynch / FEMA · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 17,
  tags: ["texas wildfire", "wildfire home protection", "defensible space texas", "texas wildfire risk", "home ignition zone", "ember hardening", "rural texas home", "wildfire evacuation", "home and garden"],
  featured: true,
  sourceName: "Texas A&M Forest Service",
  sourceUrl: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/homeowners-prevention-and-preparedness/prepare-for-wildfires-home/",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Put wildfire preparation into the larger Texas system of insurance, roofs, trees, utilities, weather and emergency records." },
    { href: "/article/texas-trees-around-home-guide", label: "Texas trees around a house", description: "Manage tree structure, storm damage, drought stress and arborist decisions around the home." },
    { href: "/article/best-native-plants-texas-yard", label: "Best native plants for a Texas yard", description: "Choose region-appropriate plants while thinking about placement, maintenance and fuel continuity near structures." },
    { href: "/article/buying-land-in-texas-guide", label: "Buying land in Texas", description: "Add wildfire exposure, access and emergency-response constraints to rural-property due diligence." },
    { href: "/article/texas-home-insurance-guide", label: "Texas home insurance guide", description: "Review coverage, deductibles, documentation and replacement-cost assumptions before a disaster." },
    { href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/burn-bans-and-information/wildfire-risk/", label: "Texas A&M Forest Service wildfire risk", description: "Use TxWRAP and the Texas Wildfire Risk Explorer to understand mapped wildfire risk and mitigation context." },
    { href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/homeowners-prevention-and-preparedness/prepare-for-wildfires-home/", label: "Texas A&M Forest Service prepare for wildfires", description: "Current Texas homeowner guidance for embers, construction, landscaping, access and evacuation." },
    { href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/homeowners-prevention-and-preparedness/prepare-for-wildfires-home/fire-resistant-landscaping/", label: "Texas fire-resistant landscaping", description: "Current ignition-zone and vegetation-spacing guidance from Texas A&M Forest Service." },
    { href: "https://tfsweb.tamu.edu/wildfire-and-other-disasters/homeowners-prevention-and-preparedness/prepare-for-wildfires-home/fire-resistant-construction/", label: "Texas fire-resistant construction", description: "Texas A&M Forest Service home-hardening guidance for roofs, vents, siding, windows, decks and ember vulnerabilities." },
    { href: "https://www.tdem.texas.gov/prepare", label: "Texas emergency preparedness", description: "Statewide preparedness information for plans, evacuation and household emergency readiness." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Wildfire is not only a remote West Texas or Panhandle problem. Texas A&M Forest Service warns that rapid growth into the wildland-urban interface—the places where development meets or mixes with undeveloped vegetation—puts more homes in landscapes where grass, brush and trees can carry fire toward neighborhoods."),
    p("The useful homeowner approach is to separate wildfire risk into four systems: the regional fire environment, the house's vulnerability to embers, the fuels immediately around the structure, and the household's ability to leave early. A beautiful green yard or a brick exterior solves only part of that equation."),

    h("1. Start with Texas wildfire risk, not a national map"),
    p("Texas A&M Forest Service maintains the Texas Wildfire Risk Assessment Portal, or TxWRAP, as a statewide planning tool for mapped wildfire risk, mitigation and prevention. The Texas Wildfire Risk Explorer inside that system can help put a property or community into regional context before a homeowner starts spending money on mitigation."),
    p("A risk map is not a guarantee that a particular house will or will not burn. Use it to ask better questions about surrounding vegetation, slope, road access, nearby undeveloped land, historical fire conditions and the practical evacuation routes available to the property."),

    h("2. Embers can matter more than the flame front"),
    p("Texas A&M Forest Service emphasizes ember intrusion because windborne burning debris can travel well ahead of a wildfire and collect in roofs, gutters, vents, decks, mulch, fencing and other vulnerable places. That means a home can ignite even when a continuous wall of flame never reaches the structure."),
    p("Walk the house looking for places dry leaves collect. Those same corners, roof valleys, gutter sections, deck gaps and wall transitions are places where embers can collect during a fire."),

    h("3. The immediate zone—zero to five feet—is the highest-priority landscape"),
    p("Texas A&M Forest Service defines the Immediate Zone as the home itself and the first 0–5 feet from the furthest attached exterior point. It calls this the most important zone for reducing fuels because it is especially vulnerable to embers."),
    list("Keep roofs and gutters free of leaves, needles and dead vegetation.", "Move firewood, combustible mulch and other flammable material away from exterior walls.", "Do not use the area under decks and porches as combustible storage.", "Repair damaged screens, roofing and exterior openings.", "Use noncombustible surfaces close to the structure where practical."),

    h("4. The five-to-thirty-foot zone should interrupt fire, not feed it"),
    p("The Intermediate Zone extends roughly 5–30 feet from the structure, including wooden attachments such as fences and decks. The goal is not a sterile yard. It is to break continuous fuel paths so grass, shrubs and trees do not create an uninterrupted route to the house."),
    list("Use driveways, walkways, patios and other hardscape as fuel breaks.", "Remove ladder fuels that can carry a surface fire into tree crowns.", "Separate shrubs and small tree groups instead of creating continuous dense vegetation.", "Keep vegetation managed around large stationary propane tanks.", "Plan mature tree canopies so they do not overhang or crowd the structure."),

    h("5. The thirty-to-one-hundred-foot zone is about slowing the fire"),
    p("In the Extended Zone, Texas A&M Forest Service focuses on interrupting the fire's path and keeping flames smaller and closer to the ground. Heavy litter, dead woody material and continuous vegetation can make that job harder."),
    p("The actual distance available depends on the parcel. A suburban lot may end before 100 feet; a rural property may extend far beyond it. Work within property boundaries and coordinate with neighbors or community programs when the shared landscape creates the larger risk."),

    h("6. Roofs, vents and gutters are part of wildfire preparation"),
    p("Home hardening begins with places embers can enter or lodge. Texas A&M Forest Service recommends fire-resistant roof materials, repairing damaged roofing, covering vulnerable openings and screening vents with metal mesh no larger than 1/8 inch where appropriate."),
    p("A roof with excellent materials can still be vulnerable when gutters are packed with dry leaves or branches rest directly over the structure. Routine maintenance and material choice work together."),

    h("7. Decks, porches and wooden fences can bridge fire to the house"),
    p("Combustible material stored under a deck can become a concentrated fuel source. Keep decks and porches clear of vegetative debris and avoid storing firewood, cardboard, fuel containers or other easily ignited material beneath them."),
    p("A wooden privacy fence attached directly to a house can also become a path for fire. Texas A&M Forest Service recommends considering a noncombustible break—such as a metal gate or section—between a wooden fence and the structure."),

    h("8. Trees need spacing and maintenance, not automatic removal"),
    p("Fire-resistant landscaping is not a rule to remove every tree near a Texas home. Texas A&M Forest Service emphasizes plant placement, spacing, moisture, maintenance and the removal of dead material. The goal is to break vertical and horizontal fuel continuity."),
    p("Pruning and tree removal near structures can also create fall hazards and damage healthy trees. Use qualified tree professionals for large, hazardous or technically difficult work rather than turning wildfire mitigation into unsafe cutting."),

    h("9. Drought changes the fuel picture"),
    p("A landscape that was relatively resistant in a wet year can become much more combustible after prolonged drought, freeze damage or tree mortality. Dead grass, fallen limbs and stressed shrubs can increase available fuel even when the basic landscape plan has not changed."),
    p("Reassess the yard after major drought, freezes, storms and tree loss. Wildfire preparation is a maintenance cycle rather than a one-time landscaping project."),

    h("10. Emergency access is part of protecting the house"),
    p("A long rural driveway may be picturesque but difficult for large emergency vehicles. Texas A&M Forest Service preparedness guidance asks homeowners to consider visible address markings, vegetation clearance, overhead obstructions and whether long driveways provide suitable turnaround space."),
    p("Do not wait for smoke to discover that a locked gate, narrow drive or unmarked rural address delays responders. Access improvements should be planned before fire season and coordinated with local requirements where applicable."),

    h("11. Evacuation comes before property defense"),
    p("Home hardening improves a structure's chance of survival; it does not turn a residence into a guaranteed refuge. Follow local officials and evacuate when instructed. Leaving early can avoid the worst traffic, smoke and road closures and keeps household members from making last-minute property-protection decisions under dangerous conditions."),
    list("Know more than one route out when geography allows.", "Keep vehicles fueled or charged when elevated fire conditions are expected.", "Include pets, livestock and mobility needs in the plan.", "Keep essential medications, identification and insurance information accessible.", "Do not delay evacuation to finish landscaping or hose down a property."),

    h("12. Rural propane, equipment and outbuildings deserve their own review"),
    p("Rural Texas properties can have propane tanks, barns, sheds, tractors, trailers, hay, fuel and equipment yards in addition to the house. Keep vegetation managed around stationary tanks and avoid allowing outbuildings or storage piles to create a continuous chain of combustible material toward the residence."),
    p("Livestock evacuation requires more time and equipment than moving household pets. Trailer readiness, gate access and destination planning belong in the pre-fire plan rather than the final hour."),

    h("13. Insurance documentation should exist before smoke appears"),
    p("Create current exterior and interior photos, retain roof and major-remodel records and keep an inventory of expensive equipment and furnishings. After mitigation work, preserve invoices and before-and-after photographs that document what was changed."),
    p("Review the homeowners policy for dwelling limits, replacement-cost assumptions, deductibles, detached structures and personal-property coverage. Wildfire preparation cannot correct an underinsured rebuilding limit after the loss."),

    h("14. Buying a rural Texas home: wildfire belongs in due diligence"),
    p("A rural-property inspection should look beyond the house itself. Review mapped wildfire risk, road access, vegetation near structures, neighboring unmanaged acreage, roof and vent construction, water availability, propane placement and whether evacuation depends on a single narrow route."),
    list("Use TxWRAP as a planning reference.", "Walk the immediate 0–5-foot zone around every structure.", "Look for combustible fencing or decks that connect directly to the house.", "Inspect roof and gutter debris and visible vent openings.", "Ask about previous wildfire or smoke damage and insurance claims.", "Get an insurance quote before the purchase timeline removes your leverage."),

    h("15. Community conditions can overwhelm a perfect individual yard"),
    p("Wildfire does not respect lot lines. Dense vegetation on adjoining parcels, narrow subdivision roads and shared evacuation bottlenecks can affect risk even when one homeowner maintains an excellent immediate zone."),
    p("Where wildfire exposure is meaningful, community-level Firewise, fuels-reduction and emergency-planning work can reduce risks an individual parcel cannot solve alone."),

    h("The operating principle: make ember ignition difficult and leaving easy"),
    p("A resilient Texas wildfire plan does two things at once. It makes the house and immediate landscape less likely to ignite from embers, and it makes evacuation easier enough that nobody feels forced to stay behind to protect the property."),
    p("Start with the first five feet, roofs, gutters and vents; then work outward through vegetation, access and the wider parcel. Revisit the plan after drought, storms, landscape changes and major construction because wildfire risk is a property system, not a one-time checklist."),
  ],
};
