import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

export const TEXAS_EVERGREEN_GUIDES_BATCH8: Record<string, TexasEvergreenGuide> = {
  "texas-hurricane-home-prep": {
    slug: "texas-hurricane-home-prep",
    eyebrow: "Storm-ready Texas homes",
    title: "How to Prepare Your Texas Home for a Hurricane",
    dek: "A practical Texas hurricane-preparation guide for protecting people, property, pets, pools and essential records before Gulf weather reaches your community.",
    quickAnswer: "Start before a storm is named for your area: know your evacuation zone and routes, review insurance, photograph the property, trim risky limbs, secure outdoor objects and keep a basic supply kit. When a storm threatens, follow local emergency officials and the National Hurricane Center, charge devices, protect openings where appropriate, move vehicles and loose items to safer locations, and leave promptly if officials order an evacuation. Never stay solely to protect property.",
    sections: [
      { heading: "Prepare long before the forecast turns urgent", body: ["Hurricane preparation works best as routine home maintenance rather than a shopping trip the night before landfall. Keep insurance information, identification, medication lists, pet records and important contacts accessible, and maintain a current photo or video inventory of the home.", "Know whether you are in an evacuation zone, where you would go and how you would get there. Coastal and surge-prone households should make that decision before roads become crowded."], links: [{ href: "/guides", label: "Texas practical guides" }] },
      { heading: "Protect the outside of the house", body: ["Loose furniture, grills, planters, toys, umbrellas and tools can become wind-driven debris. Bring them inside or secure them well before tropical-storm-force winds arrive.", "Inspect trees, gutters, fencing and drainage before hurricane season. Do not climb ladders or cut limbs once dangerous weather begins."] },
      { heading: "Protect water, power and essential supplies", body: ["Keep enough drinking water, food, medications, batteries and other essentials to follow current emergency-management guidance. Charge phones and backup batteries before outages begin.", "If you use a portable generator, operate it outdoors and well away from doors, windows and vents. Carbon-monoxide poisoning is a major post-storm hazard."], links: [{ href: "/texas-living", label: "Texas Living" }] },
      { heading: "Pools need storm preparation too", body: ["Do not empty an in-ground pool simply because a hurricane is approaching; groundwater pressure can damage an empty shell. Remove loose pool furniture and accessories, balance water beforehand, and follow the equipment manufacturer's storm guidance.", "After the storm, keep people out until debris is removed, electrical equipment is safe and water chemistry is restored."], links: [{ href: "/texas-pool-guide", label: "Texas pool ownership guide" }] },
      { heading: "When officials say evacuate, go", body: ["Storm surge, flooding and wind can make familiar neighborhoods dangerous very quickly. Evacuation orders are life-safety decisions, not forecasts about whether your individual house will be damaged.", "Take pets, medications, documents and essential supplies and use the route recommended by local authorities whenever possible."] },
      { heading: "After the storm", body: ["Avoid floodwater, downed power lines, unstable trees and damaged electrical systems. Photograph damage before major cleanup when it is safe to do so, and keep receipts for emergency repairs.", "Use local emergency information for boil-water notices, debris rules, shelter information and road closures. Conditions can vary block by block."], links: [{ href: "/explore/outdoors", label: "Texas outdoors" }] }
    ],
    related: [
      { href: "/texas-pool-guide", label: "Texas pool guide", description: "Protect pool equipment during storms and freezes." },
      { href: "/texas-pests-guide", label: "Texas pests guide", description: "Deal with mosquitoes, ants and other pests that often surge after wet weather." },
      { href: "/guides", label: "Texas guides", description: "More practical Texas how-to resources." }
    ]
  },
  "texas-pool-guide": {
    slug: "texas-pool-guide",
    eyebrow: "Pool ownership in a state of heat, freezes and storms",
    title: "Texas Pool Guide: Winterizing, Opening, Freezes and Storm Prep",
    dek: "Texas pool care is regional. Gulf Coast owners may run pools all winter while North Texas owners face longer freezes, and every owner has to plan for heat, evaporation, storms and equipment protection.",
    quickAnswer: "Many Texas pools are not fully closed for winter because swimming systems can operate year-round, especially in warmer regions. The key is freeze protection: keep circulation available when freezing weather threatens, protect exposed plumbing according to the equipment maker's instructions, and never assume an automated freeze mode removes the need to monitor power and equipment. Spring opening should include debris removal, equipment inspection, circulation, testing and balanced water chemistry before swimming.",
    sections: [
      { heading: "Do Texas pools need to be closed for winter?", body: ["There is no single statewide answer. A pool in Houston or the Rio Grande Valley experiences a very different winter from one in Dallas, Amarillo or the Panhandle.", "Many owners keep systems operational through winter and focus on freeze protection rather than a traditional northern-style closing. If a pool is intentionally winterized, follow the builder and equipment manufacturer's procedures for that specific plumbing layout."] },
      { heading: "Protect equipment during a Texas freeze", body: ["Running water is harder to freeze than standing water, so functioning circulation is important when temperatures fall below freezing. Confirm that freeze-protection settings actually work before the cold front arrives.", "If power fails or equipment cannot circulate, the correct shutdown and draining procedure varies by pump, filter, heater and plumbing design. Manufacturer instructions should control rather than a generic internet sequence."] },
      { heading: "Opening a pool for the warm season", body: ["Remove debris, inspect the waterline and deck, check baskets and equipment, restore normal circulation and examine the system for leaks before heavy use.", "Test and balance sanitizer, pH, alkalinity and other chemistry appropriate to the pool. Cloudy or green water needs correction before swimmers return."] },
      { heading: "Summer heat changes pool maintenance", body: ["Texas heat increases evaporation, swimmer load and sanitizer demand. Full sun can make chemistry drift faster than owners expect, especially during long stretches of triple-digit weather.", "Check water level and chemistry more frequently during heavy use and extreme heat, and keep skimmers supplied with enough water to operate correctly."] },
      { heading: "Prepare a pool for hurricanes and severe storms", body: ["Bring in loose furniture, umbrellas, toys and maintenance equipment before high winds. Do not intentionally drain an in-ground pool for a hurricane without professional direction.", "After severe weather, inspect electrical equipment and remove large debris before restarting anything that appears damaged."], links: [{ href: "/texas-hurricane-home-prep", label: "Texas hurricane home preparation" }] },
      { heading: "Build a Texas-specific maintenance calendar", body: ["A useful annual plan includes spring startup, summer chemistry and evaporation checks, fall leaf management, winter freeze readiness and storm-season preparation. Shift the calendar for your region rather than following a national schedule blindly."], links: [{ href: "/texas-living", label: "Texas Living" }] }
    ],
    related: [
      { href: "/texas-hurricane-home-prep", label: "Hurricane home prep", description: "Prepare the house and pool before Gulf storms." },
      { href: "/texas-pests-guide", label: "Texas pests", description: "Reduce mosquitoes and other pests around standing water and yards." },
      { href: "/guides", label: "Texas guides", description: "Practical guides for living in Texas." }
    ]
  },
  "texas-pests-guide": {
    slug: "texas-pests-guide",
    eyebrow: "What bites, stings, chews and invades",
    title: "Texas Pests: Identification, Seasons and What to Do",
    dek: "A statewide guide to common Texas household and yard pests, from fire ants and mosquitoes to termites, scorpions, ticks, roaches and wasps.",
    quickAnswer: "Texas's warm climate supports pests through much of the year, but timing and severity vary by region. Eliminate standing water for mosquitoes, keep food and moisture sources controlled indoors, seal entry points, inspect structures for termite warning signs and use Texas A&M AgriLife and local extension guidance for identification and treatment. For dangerous infestations, structural termites or uncertain pesticide use, use a licensed professional.",
    sections: [
      { heading: "Fire ants", body: ["Imported fire ants build mounds in lawns, parks and disturbed ground and can sting repeatedly. Avoid disturbing active mounds, particularly when children or pets are nearby.", "Treatment choices depend on the property and infestation. Texas A&M AgriLife's integrated approach is a stronger starting point than indiscriminate pesticide use."] },
      { heading: "Mosquitoes", body: ["The most effective household step is often source reduction: empty containers, refresh pet water and birdbaths, clean gutters and remove other standing water where larvae develop.", "Mosquito activity often rises after rain and warm weather. Protective clothing and properly used repellents add another layer when exposure is high."] },
      { heading: "Termites", body: ["Subterranean termites can cause expensive structural damage while remaining hidden. Mud tubes, discarded wings and damaged wood deserve closer inspection.", "Because identification and treatment can affect an entire structure, suspected termite activity is a good reason to involve a qualified pest professional rather than relying on spot treatment alone."] },
      { heading: "Scorpions, roaches, ticks and wasps", body: ["Scorpions often enter through small gaps and may hide in shoes, boxes or undisturbed areas. Roaches are strongly associated with access to food, water and shelter. Ticks matter most where people and pets move through brush or tall grass, while wasps become a concern when nests overlap with frequently used spaces.", "Integrated pest management starts with identification, sanitation, exclusion and habitat reduction before chemical treatment."], links: [{ href: "/texas-wildlife-guide", label: "Texas wildlife guide" }] },
      { heading: "When a pest is actually wildlife", body: ["Snakes, bats, raccoons, opossums and other animals sometimes enter structures but should not automatically be treated like insects or rodents. Removal rules, disease risks and conservation status can differ.", "Use species-appropriate guidance and avoid handling wildlife bare-handed."], links: [{ href: "/texas-snakes-guide", label: "Texas snakes" }, { href: "/texas-wildlife-guide", label: "Texas wildlife" }] }
    ],
    related: [
      { href: "/texas-snakes-guide", label: "Texas snakes", description: "Identify venomous groups and learn safer encounter behavior." },
      { href: "/texas-wildlife-guide", label: "Texas wildlife", description: "What to do around coyotes, alligators, feral hogs and more." },
      { href: "/texas-flowers-wildflowers-guide", label: "Texas flowers", description: "Build native, pollinator-friendly landscapes." }
    ]
  },
  "texas-snakes-guide": {
    slug: "texas-snakes-guide",
    eyebrow: "Identify first, give space always",
    title: "Texas Snakes: Venomous Species, Common Lookalikes and Safe Encounters",
    dek: "Texas has many snake species and only a minority are medically significant. Learn the major venomous groups, why distance is safer than confrontation and what to do after a bite.",
    quickAnswer: "Texas's medically significant native snakes fall into four familiar groups: rattlesnakes, copperheads, cottonmouths and coral snakes. If you encounter a snake, give it room and do not attempt to catch, move or kill it. If a venomous bite is possible, seek emergency medical care promptly; do not cut the wound, apply ice or attempt to suck out venom.",
    sections: [
      { heading: "The four venomous groups Texans should know", body: ["Rattlesnakes, copperheads and cottonmouths are pit vipers; coral snakes belong to a different family. Range, habitat and appearance vary, so a single color rule is not reliable enough for every field identification.", "Learning broad groups is useful, but safe behavior does not require close identification: distance is the right first response to any unknown snake."] },
      { heading: "Most Texas snakes are not a threat", body: ["Nonvenomous snakes play important ecological roles by eating rodents and other prey. Rat snakes, water snakes, racers and many other species are commonly encountered around yards, trails, farms and water.", "Trying to kill a snake can turn a distant animal into a close-contact situation, increasing bite risk."], links: [{ href: "/texas-wildlife-guide", label: "Texas wildlife guide" }] },
      { heading: "Around homes, yards and pools", body: ["Reduce hiding places, control rodents, keep grass and clutter managed and seal building gaps where practical. Pools sometimes attract snakes because they provide water or because prey is nearby.", "Use a professional or appropriate wildlife resource when a snake must be removed from an occupied space and you cannot do so safely without handling it."] },
      { heading: "If someone is bitten", body: ["Move away from the snake, keep the person as calm and still as practical and seek emergency medical care. Note the snake's appearance only from a safe distance if that can be done without delaying care.", "Do not use folk remedies such as cutting, suction, electric shock or ice. Modern medical evaluation is the priority."] },
      { heading: "Pets and snakes", body: ["Dogs are often bitten because they investigate movement at close range. Keep pets leashed in snake habitat, especially around rocks, brush and tall grass.", "A suspected bite to a pet needs prompt veterinary guidance; swelling and symptoms can progress quickly."] }
    ],
    related: [
      { href: "/texas-wildlife-guide", label: "Texas wildlife encounters", description: "Safe behavior around larger Texas wildlife." },
      { href: "/texas-pests-guide", label: "Texas pests", description: "Reduce rodents and hiding places that can attract snakes." },
      { href: "/explore/outdoors", label: "Explore Texas outdoors", description: "Plan outdoor trips with wildlife awareness." }
    ]
  },
  "texas-wildlife-guide": {
    slug: "texas-wildlife-guide",
    eyebrow: "Share the landscape without creating conflict",
    title: "Texas Wildlife Encounters: What to Do Around Coyotes, Alligators, Hogs and More",
    dek: "Texas wildlife ranges from backyard armadillos and raccoons to alligators, feral hogs, black bears, mountain lions and coyotes. The safest reaction depends on the animal and situation.",
    quickAnswer: "The universal starting rule is distance: do not feed, corner, chase or approach wildlife for a photo. Keep pets controlled and children close. For potentially dangerous animals, increase distance and follow species-specific TPWD guidance. Never assume a wild animal is tame because it appears calm or lives near people.",
    sections: [
      { heading: "Coyotes and bobcats", body: ["Coyotes and bobcats often avoid people, but food conditioning can increase conflict. Secure trash and pet food and supervise small pets, particularly around dawn, dusk and undeveloped edges.", "If a coyote approaches too closely, do not feed or encourage it. Give it an escape route and use current local or TPWD guidance for persistent problem animals."] },
      { heading: "Alligators", body: ["Alligators occur in suitable waters primarily in eastern and coastal parts of Texas. Keep a substantial distance, never feed them and keep pets away from the water's edge where alligators are present.", "Feeding alligators teaches them to associate people with food and can create dangerous animals."], links: [{ href: "/explore/outdoors", label: "Texas outdoors" }] },
      { heading: "Feral hogs and javelinas", body: ["Feral hogs are powerful animals and can damage landscapes; javelinas are native peccaries found mainly in southern and western Texas. They are different species and should not be treated as interchangeable.", "Do not crowd either animal. Keep dogs controlled because dogs can trigger defensive encounters."] },
      { heading: "Black bears and mountain lions", body: ["Both occur in parts of Texas, especially western and some border or forested regions. Encounters are uncommon, but people in habitat should know current TPWD recommendations before hiking or camping.", "Do not run blindly from a large predator. Stay composed, create distance and use species-specific guidance for the exact encounter."], links: [{ href: "/explore", label: "Explore Texas" }] },
      { heading: "Bats, raccoons and skunks", body: ["These animals can carry rabies, so avoid bare-handed contact with wildlife that is acting abnormally, trapped indoors or found with a person or pet who may have been exposed.", "Contact animal-control or public-health resources when exposure is possible rather than releasing an animal before guidance if testing may be needed."] },
      { heading: "The rule that prevents most conflicts", body: ["Do not feed wildlife. Intentional feeding and unsecured trash can change animal behavior and bring wildlife into repeated contact with homes, roads and pets.", "Observe from a distance and use binoculars or a zoom lens rather than closing the gap."], links: [{ href: "/texas-birds-guide", label: "Texas birds" }] }
    ],
    related: [
      { href: "/texas-snakes-guide", label: "Texas snakes", description: "Venomous groups, lookalikes and bite response." },
      { href: "/texas-birds-guide", label: "Texas birds", description: "Common birds, migration and birding." },
      { href: "/texas-pests-guide", label: "Texas pests", description: "Household and yard pest identification." }
    ]
  },
  "texas-birds-guide": {
    slug: "texas-birds-guide",
    eyebrow: "Backyards, flyways and wild places",
    title: "Texas Birds: Common Species, Migration and Where to Watch",
    dek: "Texas sits at the meeting point of major habitats and migration routes, making it one of the country's richest states for bird diversity from Gulf Coast migrants to Hill Country specialties.",
    quickAnswer: "Start with common birds such as northern mockingbirds, cardinals, mourning doves, grackles, blue jays, white-winged doves and seasonal hummingbirds, then learn your region. Texas birding changes dramatically between the Gulf Coast, Rio Grande Valley, Hill Country, Piney Woods, Panhandle and West Texas. eBird and Texas Parks and Wildlife are useful companions for current sightings and habitat information.",
    sections: [
      { heading: "Why Texas has so many birds", body: ["Texas spans coast, prairie, desert, mountains, forests, wetlands and subtropical habitat. That geographic range supports resident species while also funneling enormous numbers of migrants through the state.", "The same trip can produce very different birds simply by changing region or season."], links: [{ href: "/explore/outdoors", label: "Explore Texas outdoors" }] },
      { heading: "Backyard birds Texans recognize", body: ["Northern mockingbirds, cardinals, doves, grackles, jays, wrens and other adaptable species are common around many communities, though abundance varies by region.", "Water, native cover and appropriate plants can make a yard more useful to birds without relying entirely on feeders."] },
      { heading: "Migration makes spring and fall special", body: ["The Gulf Coast can be spectacular during migration because birds crossing or moving around the Gulf concentrate in coastal habitat. Weather can strongly influence what birders see on any particular day.", "Use current sighting tools as a supplement to habitat knowledge rather than a guarantee that a reported bird will remain in place."] },
      { heading: "Hummingbirds", body: ["Ruby-throated and black-chinned hummingbirds are familiar in different parts of Texas, while migration can bring additional species. Clean feeders regularly and use plain sugar-water recipes recommended by bird authorities rather than dyed mixtures.", "Native flowering plants can provide additional nectar and insect food."], links: [{ href: "/texas-flowers-wildflowers-guide", label: "Texas flowers and native plants" }] },
      { heading: "Birding trips", body: ["The Rio Grande Valley, Gulf Coast, Hill Country, Big Bend region and East Texas each offer distinct birding experiences. Build a trip around habitat and season rather than a generic statewide checklist.", "State parks, refuges and wildlife-management areas can provide both access and educational resources."], links: [{ href: "/explore", label: "Explore Texas" }] }
    ],
    related: [
      { href: "/texas-flowers-wildflowers-guide", label: "Texas flowers", description: "Native plants, pollinators and wildflower seasons." },
      { href: "/texas-wildlife-guide", label: "Texas wildlife", description: "Broader wildlife encounter guidance." },
      { href: "/explore/outdoors", label: "Texas outdoors", description: "Parks and outdoor destinations across the state." }
    ]
  },
  "texas-flowers-wildflowers-guide": {
    slug: "texas-flowers-wildflowers-guide",
    eyebrow: "Bluebonnets are only the beginning",
    title: "Texas Flowers & Wildflowers: What Blooms, When and Where",
    dek: "A practical guide to Texas bluebonnets, Indian paintbrush, firewheel, winecups, evening primrose, native landscaping and responsible wildflower viewing.",
    quickAnswer: "Texas wildflower timing changes with temperature, rain and region, but spring is the signature season across much of the state. Bluebonnets often headline March and April in Central and North Texas, with paintbrush, phlox, primrose, winecups and many other species overlapping. Use current park, highway and local reports for bloom conditions, stay off private property and never stop unsafely on high-speed roads for photos.",
    sections: [
      { heading: "Bluebonnets", body: ["Bluebonnets are Texas's best-known wildflowers, but bloom timing varies by year and location. Rainfall and winter temperatures can shift both the start and intensity of the season.", "Popular viewing areas become crowded quickly. Choose legal parking, respect fences and private property and avoid trampling flowers simply to stage a photograph."], links: [{ href: "/explore", label: "Explore Texas" }] },
      { heading: "Paintbrush, firewheel, winecups and primrose", body: ["Texas roadsides and prairies can produce layers of red, orange, pink, yellow and purple around the bluebonnets. Learning a handful of common companion species makes a spring drive much more interesting than searching for one flower alone.", "Flower communities vary with soil, moisture and region, so a Hill Country roadside will not look exactly like a coastal prairie or Panhandle grassland."] },
      { heading: "Wildflowers by season", body: ["Spring carries the largest public bloom season, but Texas has flowering natives across much of the year. Summer favors heat-tolerant species, while fall can bring goldenrods, asters and other late-season color depending on region and rainfall.", "A month-by-month guide should be treated as an expectation window rather than a fixed calendar."] },
      { heading: "Plant native at home", body: ["Native and well-adapted plants can support pollinators and birds while reducing the mismatch between a landscape and local heat, rainfall and soils. The best plant list is regional rather than simply labeled Texas-wide.", "Texas A&M AgriLife, native-plant organizations and local extension resources can help homeowners select species for their part of the state."], links: [{ href: "/texas-birds-guide", label: "Texas birds" }] },
      { heading: "Wildflower road-trip etiquette", body: ["Never park in a travel lane, block gates, trespass or assume a beautiful field is public. Many famous-looking flower fields are working ranches or private property.", "Use public parks, trails, designated viewing areas and safe pull-offs when available. Leave flowers and habitat intact for the next visitor."], links: [{ href: "/events", label: "Texas events" }] }
    ],
    related: [
      { href: "/texas-birds-guide", label: "Texas birds", description: "Connect native plants with backyard and migratory birds." },
      { href: "/texas-wildlife-guide", label: "Texas wildlife", description: "Explore the animals sharing Texas habitats." },
      { href: "/explore/outdoors", label: "Texas outdoors", description: "Find parks and outdoor destinations." }
    ]
  }
};

export function getTexasEvergreenGuideBatch8(slug: string): TexasEvergreenGuide {
  const guide = TEXAS_EVERGREEN_GUIDES_BATCH8[slug];
  if (!guide) throw new Error(`Unknown Texas evergreen guide batch 8 slug: ${slug}`);
  return guide;
}
