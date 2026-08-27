import type { ArticleBlock } from "../types";

interface GatewayAuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
}

const snakeSafety: ArticleBlock[] = [
  { type: "heading", text: "What Texas Parks and Wildlife says about risk" },
  { type: "paragraph", text: "Texas Parks and Wildlife emphasizes two facts that belong together: Texas has substantial snake diversity, and the large majority of snakes are not dangerous to people. TPWD groups the potentially dangerous native snakes into copperheads, cottonmouths, rattlesnakes and coral snakes, while also stressing that bites commonly follow surprise, cornering or unnecessary handling. That makes behavior around the animal more important than trying to identify every snake instantly." },
  { type: "paragraph", text: "If you encounter a snake on a trail or in a yard, stop, locate it and create distance. Do not try to move it with your hands, pin it, pose beside it or kill it. TPWD specifically notes that snakes generally retreat when given the opportunity. A snake that has a clear escape route is usually a lower-risk situation than one surrounded by people, pets or improvised tools." },
  { type: "heading", text: "Reduce the conditions that create surprise encounters" },
  { type: "paragraph", text: "Around homes, TPWD recommends reducing shelter and prey opportunities: keep brush, wood, debris and similar hiding places away from heavily used areas; use care around barns, sheds, crawl spaces and stored materials; and avoid placing hands or feet where you cannot see. In the field, the same principle applies to logs, rocks, creek banks, tall grass and animal burrows. A flashlight at night and closed footwear reduce the chance that a routine step becomes a close-range encounter." },
  { type: "paragraph", text: "Pets change the risk calculation because a dog may approach an animal that a person would avoid. Keep dogs under control on trails and in wildlife-prone yards, especially after dark. Children should be taught to stop and call an adult rather than touching or chasing an unfamiliar snake. If a snake is inside a building or trapped where people cannot reasonably avoid it, use an appropriate local animal-control or wildlife professional rather than attempting a capture." },
  { type: "heading", text: "If a bite may be venomous" },
  { type: "paragraph", text: "Treat a suspected venomous bite as a medical emergency. Get professional medical help promptly and follow emergency-dispatch guidance. Do not cut the wound, try to suck out venom, apply improvised electrical treatments or risk a second bite by trying to catch the snake. A photo taken from a safe distance may be useful if it already exists, but identification is never worth delaying care or approaching the animal again." },
  { type: "paragraph", text: "The useful takeaway is not to fear every snake. It is to avoid the handful of behaviors that create preventable close contact: blind reaching, stepping where you cannot see, handling snakes, allowing pets to investigate, and trying to kill an animal that already has a route away. Distance and visibility solve most encounters before they become emergencies." },
];

const wildlifeSafety: ArticleBlock[] = [
  { type: "heading", text: "Most wildlife conflicts start with food, pets or lost distance" },
  { type: "paragraph", text: "Texas Parks and Wildlife's urban-wildlife guidance repeatedly returns to the same prevention strategy: do not feed wild animals, remove easy food sources and keep pets under control. Coyotes, raccoons, foxes and other adaptable wildlife can become more comfortable around homes when pet food, unsecured garbage, fallen fruit or intentional feeding rewards repeated visits. Removing those attractants is usually more effective than reacting dramatically to a single sighting." },
  { type: "paragraph", text: "A wild animal passing through a neighborhood is different from an animal that repeatedly approaches people, loses its normal wariness or becomes trapped in a building. Observe from a distance first. Keep children and pets away. Give the animal a route out. If behavior looks abnormal, threatening or impossible to avoid safely, contact the appropriate local wildlife, animal-control or public-health authority rather than trying to solve the encounter by hand." },
  { type: "heading", text: "Species change the details" },
  { type: "paragraph", text: "Coyotes are common across Texas and can adapt to urban areas. TPWD advises keeping pet food and water indoors, securing trash, supervising pets and avoiding ground-level feeding that can attract rodents and other prey. Alligators require a different kind of distance: TPWD advises people to stay well back, never feed or harass them, and report animals that create a genuine public-safety problem. Deer demand extra attention on roads around dawn and dusk, while feral hogs should be given a wide escape route and kept separate from dogs." },
  { type: "paragraph", text: "Smaller wildlife also deserves hands-off treatment. Raccoons, skunks, opossums and foxes can carry disease, bite when cornered and cause property problems if food or denning access is available. Grounded bats should never be handled bare-handed, especially when possible contact with a person or pet has occurred. In any situation involving a possible bite, scratch or rabies exposure, use medical or public-health guidance rather than relying on a wildlife-identification article." },
  { type: "heading", text: "What coexistence actually looks like" },
  { type: "paragraph", text: "Coexistence does not mean ignoring a dangerous animal. It means distinguishing ordinary wildlife movement from a true conflict. A bobcat crossing a greenbelt, an armadillo digging at night or a coyote moving through an open field may need nothing more than distance and removal of attractants. An animal repeatedly approaching people, entering occupied structures, threatening pets at close range or behaving neurologically abnormal deserves escalation to professionals." },
  { type: "paragraph", text: "The practical rule is simple: manage the human side first. Secure food and trash, close access points, supervise pets, avoid feeding wildlife and preserve an escape route. Then use species-specific official guidance for the unusual cases. That approach lowers risk without turning every sighting into an emergency." },
];

const pestSafety: ArticleBlock[] = [
  { type: "heading", text: "Start with identification and prevention, not the strongest pesticide" },
  { type: "paragraph", text: "Texas A&M AgriLife Extension teaches integrated pest management as a prevention-first system: identify the pest, understand why it is present, remove food, water and shelter, seal entry points, monitor the result and then use targeted control when necessary. That order matters because many household pest problems are driven by moisture, clutter, food storage, landscaping or structural gaps that a one-time spray does not fix." },
  { type: "paragraph", text: "Termites, rodents and some persistent indoor infestations are different from a few nuisance insects. AgriLife specifically notes that professional help may be appropriate when public-health risks or structural damage are involved. Mud tubes, unexplained wood damage, recurring rodent evidence or an entrenched German cockroach problem justify accurate identification before repeated do-it-yourself treatments hide the symptoms without addressing the source." },
  { type: "heading", text: "Texas yards create their own pest cycle" },
  { type: "paragraph", text: "Fire ants, mosquitoes and ticks are strongly influenced by outdoor conditions. AgriLife recommends research-based fire-ant management rather than improvised remedies, and mosquito reduction starts with eliminating standing water where practical. Gutters, saucers, toys, tarps, birdbaths and other small containers can produce mosquito habitat after rain. Brush, tall grass and wildlife corridors can increase tick exposure, so yard maintenance and post-exposure checks are part of the prevention strategy." },
  { type: "paragraph", text: "Pesticides should be treated as labeled tools, not generic chemicals. Match the product to the pest and site, follow the label, protect children and pets, and avoid mixing products or using agricultural, outdoor or unlabeled chemicals indoors. Gasoline, bleach mixtures and other improvised treatments can create fire, poisoning or environmental hazards without solving the infestation." },
  { type: "heading", text: "Moisture and access explain many indoor problems" },
  { type: "paragraph", text: "Cockroaches, silverfish, ants and other indoor invaders often track plumbing leaks, condensation, food residue or exterior entry points. Rodents and squirrels exploit roofline gaps, vents and openings around utilities. Fixing water sources and access can reduce pest pressure before bait or treatment is added. It also helps distinguish an occasional invader from a reproducing indoor population." },
  { type: "paragraph", text: "The goal is not a chemically sterile house. It is a home where pests do not have easy access to food, water, shelter or structural entry. Accurate identification, sanitation, exclusion and targeted control usually outperform repeated broad treatments—and they make it easier to recognize when a licensed professional is actually needed." },
];

const hurricanePrep: ArticleBlock[] = [
  { type: "heading", text: "Build the plan before a forecast forces decisions" },
  { type: "paragraph", text: "FEMA's hurricane guidance emphasizes preparation before a storm is close enough to create shortages or evacuation traffic. Know whether your home is in an evacuation or flood-risk area, identify more than one route, decide where you would go, include pets and mobility or medical needs, and keep critical documents in a protected physical location with secure digital copies. A plan that exists only in someone's head is harder to use when family members are separated or communications are overloaded." },
  { type: "paragraph", text: "Supplies should reflect several days without normal services rather than a single dramatic night of wind. Water, food, medicines, flashlights, charging options, weather information, first-aid supplies and pet needs are the basics. People who depend on powered medical equipment need a more specific backup-power and relocation plan. Review insurance early enough to understand flood, wind and homeowner coverage before a storm is already forming in the Gulf." },
  { type: "heading", text: "Evacuation orders are not the moment to improvise" },
  { type: "paragraph", text: "If local authorities order or advise evacuation, follow their instructions and leave using designated routes. FEMA warns against driving around barricades or treating the last possible departure time as a target. Traffic, fuel demand, flooding and bridge or road closures can worsen quickly. Take medicines, identification, insurance information, chargers, pet supplies and enough essentials that you are not depending on immediate reentry." },
  { type: "paragraph", text: "If you are not evacuating, sheltering decisions still depend on both wind and flood risk. FEMA recommends a sturdy interior location away from windows for high winds, but flooding can make lower levels dangerous. Never move into a closed attic where rising water could trap you. Monitor local emergency instructions because the safest location can change as the hazard changes." },
  { type: "heading", text: "Generator and carbon-monoxide safety are non-negotiable" },
  { type: "paragraph", text: "Portable generators and other fuel-burning equipment create carbon monoxide, an odorless gas that can kill. FEMA and the U.S. Fire Administration direct people to use generators outdoors, well away from doors, windows and vents, and never inside a home, garage, shed or partially enclosed space. Grills and camp stoves also belong outdoors. Carbon-monoxide alarms provide another layer of protection when outages change how a household is using equipment." },
  { type: "heading", text: "After the storm, the hazards are different" },
  { type: "paragraph", text: "Do not assume the danger ends when the wind stops. Floodwater can hide debris, contamination and electrical hazards. Downed lines may still be energized. Trees and damaged structures can fail after the storm. Follow local reentry instructions, document damage when it is safe, and avoid cleanup tasks that require expertise you do not have. The safest hurricane checklist covers the days after landfall as carefully as the hours before it." },
];

export const texasGatewayBatch3AuthorityEnrichment: Record<string, GatewayAuthorityEnrichment> = {
  "texas-snakes-what-to-do-if-you-see-one": {
    body: snakeSafety,
    sourceName: "Texas Parks and Wildlife Department — Venomous Texas Snakes",
    sourceUrl: "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/snakes-alive/venomous-texas-snakes",
  },
  "texas-wildlife-encounters-what-to-do": {
    body: wildlifeSafety,
    sourceName: "Texas Parks and Wildlife Department — Urban Wildlife Program",
    sourceUrl: "https://tpwd.texas.gov/wildlife/wildlife-diversity/urban-wildlife-program/",
  },
  "texas-pests-homeowners-should-know": {
    body: pestSafety,
    sourceName: "Texas A&M AgriLife Extension — Integrated Pest Management",
    sourceUrl: "https://agrilifeextension.tamu.edu/asset-external/pest-prevention-what-is-integrated-pest-management-ipm/",
  },
  "texas-hurricane-home-prep-checklist": {
    body: hurricanePrep,
    sourceName: "FEMA Ready.gov — Hurricane Preparedness",
    sourceUrl: "https://www.ready.gov/hurricanes",
  },
};
