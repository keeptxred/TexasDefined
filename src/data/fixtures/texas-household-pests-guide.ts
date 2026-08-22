import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHouseholdPestsGuideArticle: Article = {
  id: "evergreen-texas-household-pests-guide",
  brandId: "texasdefined",
  slug: "texas-household-pests-guide",
  title: "Texas Household Pests: Termites, Fire Ants, Mosquitoes, Scorpions, Roaches and What to Do",
  dek: "A practical Texas homeowner guide to the pests that actually matter: how to recognize the problem, reduce the conditions that attract it, know when DIY prevention is reasonable and when a licensed professional or public-health response makes more sense.",
  category: "home-garden",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fire_ant_mound_(16371103174).jpg?width=1600",
    alt: "Red imported fire ant mound in a Texas research field",
    width: 1600,
    height: 1200,
    credit: "Alex Wild / University of Texas Insects Unlocked · CC0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 17,
  tags: ["texas pests", "texas termites", "fire ants texas", "texas mosquitoes", "texas scorpions", "texas roaches", "texas rodents", "pest control texas", "home and garden"],
  featured: true,
  sourceName: "Texas Department of Agriculture Structural Pest Control Service",
  sourceUrl: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Consumer-Information",
  internalLinks: [
    { href: "/article/texas-homeowner-field-manual", label: "Texas Homeowner Field Manual", description: "Put pest prevention into the larger Texas systems picture: drainage, roofs, foundations, utilities, wildlife and emergency records." },
    { href: "/article/texas-home-maintenance-calendar", label: "Texas home maintenance calendar", description: "Build pest checks into a monthly home-maintenance rhythm." },
    { href: "/article/best-native-plants-texas-yard", label: "Best native plants for a Texas yard", description: "Use region-appropriate plants while managing moisture, mulch and habitat around the house." },
    { href: "/article/texas-wildlife-guide", label: "Texas wildlife field guide", description: "Separate ordinary wildlife encounters from actual household pest conflicts." },
    { href: "/article/texas-foundation-care-clay-soil-drought", label: "Texas foundation and drainage guide", description: "Understand how leaks, drainage and soil moisture can create conditions that also matter for pests." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "After storms, standing water and damaged structures can change mosquito and pest pressure." },
    { href: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Consumer-Information", label: "Texas Department of Agriculture pest-control consumer information", description: "Official Texas licensing, consumer-protection and complaint information for structural pest control." },
    { href: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Termite-Fumigation-Applications", label: "Texas termite and WDI consumer information", description: "Official requirements for termite proposals, wood-destroying-insect reports and licensed work." },
    { href: "https://www.dshs.texas.gov/disease-surveillance-epidemiology-section/zoonosis-control/mosquito-borne-diseases", label: "Texas DSHS mosquito-borne disease prevention", description: "Official guidance on standing water, repellents, screens and mosquito-borne disease prevention." },
    { href: "https://fireant.tamu.edu/", label: "Texas A&M fire ant program", description: "Texas-focused identification and management information for imported fire ants." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas has enough climate zones that the word 'pest' means different things from one region to another. Gulf Coast homeowners may spend much of the year thinking about mosquitoes, termites and large roaches. Central Texas yards can develop fire-ant mounds almost overnight after rain. West Texas homes see more scorpion conversations. Rodents become noticeable anywhere food, shelter and an entry point line up."),
    p("The useful approach is not to treat every insect as an emergency. It is to identify the pest, remove the condition helping it thrive and choose the least complicated control method that fits the actual risk. Structural damage, repeated interior infestations, pesticide-sensitive settings and wood-destroying insects deserve a different response from one cricket in a garage."),

    h("Start with the house, not the pesticide aisle"),
    p("Many household pest problems are really access, moisture or food problems. A chemical treatment can reduce the population without correcting the leaking hose bib, open weep gap, unsealed utility penetration, overflowing pet bowl, wet mulch or food residue that keeps inviting the next population."),
    list("Repair plumbing and irrigation leaks.", "Keep gutters and drains moving water away from the structure.", "Store food and pet food in closed containers.", "Seal practical gaps around utility penetrations, doors and screens.", "Move firewood and clutter away from the house.", "Avoid letting mulch, soil or stored materials conceal the foundation edge."),

    h("Termites: the pest where documentation matters"),
    p("Termites deserve a different level of attention because they can damage structural wood while remaining hidden. Mud tubes, damaged or hollow-sounding wood, discarded wings and indoor swarmers can justify an inspection, but a professional wood-destroying-insect inspection is more useful than trying to diagnose a whole house from one photograph."),
    p("Texas regulates structural pest-control businesses and termite work through the Texas Department of Agriculture. In a real-estate transaction, the official wood-destroying-insect inspection report uses the state's required form. TDA also requires written disclosures with termite treatment proposals, including treatment areas, evidence of activity, warranty terms and product information."),
    list("Do not let soil, mulch or siding conceal the slab-to-wall transition where inspection is possible.", "Correct persistent moisture and plumbing leaks.", "Ask whether visible evidence is active, previous or merely conducive conditions.", "Compare treatment scope and warranty terms, not only price.", "Keep reports and treatment records with the home's permanent file."),

    h("Fire ants: manage the colony, not just the mound you can see"),
    p("Red imported fire ants are among the most recognizable Texas yard pests. Their mounds become especially noticeable after rainfall, but the colony extends underground beyond the visible pile of soil. Disturbing a mound can bring defensive workers rapidly to the surface."),
    p("Texas A&M's fire-ant program emphasizes management strategies built around correctly labeled products and colony biology rather than folk remedies. The right method depends on whether the goal is treating one mound, an entire yard or a larger property."),
    list("Keep children and pets away from active mounds while deciding how to treat them.", "Read the pesticide label and use only products labeled for the site where they will be applied.", "Do not assume more product works better.", "Recheck the area after treatment instead of judging success only by the mound surface."),

    h("Mosquitoes: the most important control step may be one cup of water"),
    p("Texas DSHS emphasizes removing standing water because mosquitoes can breed in very small containers. Buckets, plant saucers, clogged gutters, toys, tarps, bird baths, neglected pools and rain-collection openings can all hold enough water to matter."),
    p("DSHS recommends a weekly property check, properly maintained pools and hot tubs, intact screens and EPA-registered repellents used according to their labels. That prevention matters because Texas mosquitoes can transmit illnesses including West Nile virus."),
    list("Dump or refresh small water containers at least weekly.", "Clear gutters and low spots that remain wet.", "Screen rain barrels, cistern openings and water tanks.", "Keep pools chlorinated and free of debris.", "Repair door and window screens.", "Use repellent according to the product label when mosquitoes are active."),

    h("Large roaches: outdoors and indoors are different problems"),
    p("Texas homes commonly encounter large cockroaches that can live outdoors in moist organic material, drains, utility systems and landscaping. One large roach that wanders indoors after weather changes is not the same diagnosis as repeated nymphs and adults reproducing inside a kitchen."),
    p("Interior sanitation still matters, but so do exterior moisture and entry points. Leaking pipes, damp voids, loose weatherstripping and openings around utilities can turn an occasional intruder into a repeated problem."),

    h("German cockroaches: repeated indoor sightings deserve faster action"),
    p("Small German cockroaches are much more closely associated with indoor infestations. They reproduce quickly around kitchens, bathrooms and other places with food, warmth and moisture. Seeing multiple life stages is a stronger signal than a single outdoor species wandering inside."),
    p("Successful control usually combines sanitation, moisture correction, targeted bait or other labeled treatment and follow-up. Spraying every visible insect without addressing harborages can scatter the problem without eliminating it."),

    h("Scorpions: reduce shelter and entry points first"),
    p("Scorpion encounters are more familiar in parts of Central and West Texas, though species occur across the state. They seek shelter in cracks, wood piles, rocks, landscape materials and structures, and they feed on other arthropods."),
    list("Shake out shoes, gloves and stored items when scorpions are active in the area.", "Move stacked firewood and debris away from exterior walls.", "Seal practical cracks and door gaps.", "Reduce the insects that serve as prey.", "Use care when moving rocks, boards and landscape materials by hand."),

    h("Spiders: identification matters more than fear"),
    p("Most spiders around Texas homes are not a medical emergency and help control insects. The practical concern is avoiding bites from medically important species and reducing conditions that bring large numbers of prey insects indoors."),
    p("Do not identify an unfamiliar spider from one color or body-shape shortcut. If a bite or exposure produces serious symptoms, seek appropriate medical guidance rather than relying on an internet identification."),

    h("Rodents: close the route before setting the trap"),
    p("Mice and rats need food, water, shelter and an opening. Trapping can remove animals already inside, but exclusion is what changes the building from an attractive route into a barrier."),
    list("Inspect garage-door edges, rooflines, utility penetrations, vents and damaged screens.", "Store bird seed, pet food and bulk food in durable closed containers.", "Clean fruit, nuts and feed that collect around the structure.", "Trim access routes where vegetation directly bridges to the roof or walls.", "When sealing an opening, make sure an animal is not being trapped inside a wall or attic."),

    h("Fleas and ticks: the pet, yard and wildlife connection"),
    p("Flea problems often require treating the animal under veterinary guidance while also cleaning the indoor environment and addressing where immature stages persist. Treating only the visible adult fleas on a pet can miss much of the life cycle."),
    p("Ticks are more tied to outdoor exposure, host animals and habitat. Yard edges, brush, tall vegetation and wildlife movement can shape risk. After outdoor activity in tick habitat, checking people and pets promptly is a simple preventive habit."),

    h("Bed bugs: do not confuse them with a cleanliness problem"),
    p("Bed bugs move with people and belongings and can infest clean or cluttered spaces. The challenge is finding the harborages and treating all relevant life stages rather than merely changing sheets or discarding one piece of furniture."),
    p("Because treatment methods can involve heat, insecticides and detailed preparation, a persistent infestation is a reasonable place to compare qualified structural pest-control professionals rather than repeatedly buying unrelated products."),

    h("Pantry and fabric pests: find the source item"),
    p("Small beetles, moths and larvae in stored foods or natural-fiber materials often originate from one infested product. The fastest progress can come from finding and removing that source, vacuuming cracks and storing replacement products in sealed containers."),

    h("When Texas requires a licensed pest-control professional"),
    p("Texas requires licensing for businesses and individuals performing structural pest control for compensation. The Texas Department of Agriculture's Structural Pest Control Service licenses businesses and applicators, inspects regulated establishments and investigates complaints involving unlicensed work or pesticide misuse."),
    p("For homeowners, that creates a useful consumer check: before paying someone to inspect, recommend or treat structural pests, verify that the business and applicator are properly licensed for the work being offered."),

    h("Buying a Texas home: pest records belong in due diligence"),
    p("A home purchase is one of the best times to establish a pest baseline. A wood-destroying-insect report, prior termite treatment records, warranties, moisture history and evidence of previous rodent or roach work can help a buyer understand whether a problem was corrected or merely treated temporarily."),
    list("Ask for transferable termite warranties and treatment diagrams.", "Check attics, garages and utility spaces for droppings, nests or damaged screens.", "Look for chronic moisture, not just live insects.", "Verify the pest-control company's Texas license when relying on a professional report.", "Keep the final inspection and treatment records after closing."),

    h("After a storm or flood: expect pest pressure to change"),
    p("Heavy rain, tropical weather and flooding can displace insects and rodents, create standing water and expose damaged building materials. A sudden increase in ants, roaches or mosquitoes after a major weather event may reflect changed habitat rather than a mysterious new infestation."),
    p("Restore drainage, remove water-holding debris, repair openings and dry damaged materials as part of the pest response. Pesticides cannot substitute for a wet building remaining wet."),

    h("A simple Texas pest decision tree"),
    list("Identify the pest as confidently as possible before treating it.", "Ask whether the problem is structural damage, health risk, nuisance or a one-time intruder.", "Remove food, water, shelter and entry conditions first where practical.", "Use only products labeled for the pest and application site.", "Escalate to a licensed professional when the infestation is persistent, structural, difficult to identify or requires specialized treatment.", "Preserve reports, diagrams and warranties when the work affects the home's long-term history."),

    h("The goal is a less hospitable house, not a chemically perfect yard"),
    p("Texas will always have insects and wildlife. A well-managed home is not one where nothing crawls, flies or crosses the property. It is one where the building is dry, reasonably sealed, food is controlled, standing water is managed and a real infestation is recognized early enough to choose the right response."),
  ],
};
