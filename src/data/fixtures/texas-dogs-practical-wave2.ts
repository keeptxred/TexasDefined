import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasDogsCoastArticle: Article = {
  id: "evergreen-taking-your-dog-to-the-texas-coast",
  brandId: "texasdefined",
  slug: "taking-your-dog-to-the-texas-coast",
  title: "Taking Your Dog to the Texas Coast: Beach Rules, Heat, Water and Wildlife",
  dek: "A Texas coast trip with a dog works best when you check the exact beach rules, heat, water quality, wildlife and vehicle access before the paws ever hit the sand.",
  category: "beaches-coast",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog_on_a_beach.jpg?width=1600",
    alt: "A dog standing on a sandy beach near the water, used as a general illustration for planning a Texas coast trip with a dog",
    width: 3024,
    height: 4032,
    credit: "Unbeatable101 · CC0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-22",
  readingMinutes: 10,
  tags: [
    "Texas dogs",
    "Texas beaches",
    "dog-friendly Texas coast",
    "Padre Island National Seashore",
    "beach safety",
    "Texas Beach Watch",
    "Texas Dogs Defined",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Breed personalities and practical Texas dog-life planning.",
    },
    {
      href: "/article/texas-dog-heat-safety",
      label: "Texas dog heat safety",
      description: "Use the ground, shade, water and distance check before a hot-weather outing.",
    },
    {
      href: "/article/best-dog-friendly-texas-trip-ideas",
      label: "Dog-friendly Texas trip ideas",
      description: "Choose a weekend where the dog can realistically be part of the plan.",
    },
    {
      href: "/explore/beaches-coast",
      label: "Texas beaches and coast",
      description: "Explore barrier islands, beach parks, bays and Gulf Coast destinations.",
    },
    {
      href: "/article/taking-your-dog-to-texas-state-parks",
      label: "Texas state parks with a dog",
      description: "Know the statewide pet rules before building a park day around the dog.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: ["padre-island-national-seashore"],
  sourceName: "National Park Service — Padre Island National Seashore pet rules",
  sourceUrl: "https://www.nps.gov/pais/planyourvisit/pets.htm",
  body: [
    p("A Texas beach can look like the easiest possible dog day: sand, water, room to walk and no complicated itinerary. The part that makes it work is everything you check before arrival. Pet rules are set by the agency or local government managing the exact beach, Gulf weather can make a short outing punishing, wildlife deserves space, and some Texas beaches mix recreation with vehicle traffic on the sand."),
    p("Start by treating “the Texas coast” as a collection of different managed places rather than one statewide dog policy. A national seashore, state park, city beach and county beach can all have different access rules. The useful habit is simple: choose the exact beach first, then read that beach's current official pet rules close to the trip date."),

    h("Padre Island National Seashore shows how dog-friendly can still mean rule-heavy"),
    p("Padre Island National Seashore is a strong example because the National Park Service publishes unusually clear pet guidance. Leashed pets are allowed across more than 60 miles of park beaches and may also use campgrounds, trails and boardwalks. Pets are not allowed in park buildings, and the leash can be no longer than six feet. The park also tells visitors not to leave pets unattended in or outside a vehicle."),
    p("That combination matters: “pets allowed” does not mean off-leash, unattended or welcome in every facility. The visitor-center portion of a beach day can work differently from the open shoreline. Build the human itinerary around the dog's access instead of assuming one rule covers the entire stop."),

    h("Check the exact local beach rule before you drive"),
    p("Rules can vary elsewhere on the coast. Port Aransas, for example, publishes a leash requirement for pets on its beaches. Other local beaches and parks may have their own access, parking, camping, wildlife or seasonal restrictions. Do not rely on a social-media post, hotel desk answer or a listicle written several years ago when an official beach or park page is available."),
    list(
      "Identify the agency that manages the exact beach or park.",
      "Confirm whether pets are allowed and whether a leash length is specified.",
      "Check whether dogs are excluded from buildings, swimming zones, wildlife areas or special events.",
      "Look for current alerts, closures, tides, surf conditions and beach-driving rules.",
      "Recheck near the trip date because temporary restrictions and conditions can change."
    ),

    h("The sand can become the heat problem"),
    p("A sea breeze can make the coast feel cooler to a person while sand, pavement and parking areas are still hard on paws. Use the same heat discipline you would use on a Texas trail: move the outing earlier or later, bring the dog's water, create shade and shorten the plan before the dog is tired. If the walking surface is too hot for your hand, do not treat the beach as an exception."),
    p("The National Park Service specifically warns Padre Island visitors that summer temperatures can affect pets and tells owners to carry enough water. It also prohibits leaving pets unattended. That is especially important on a coast trip where a person may be tempted to leave the dog in the vehicle for a visitor-center, restaurant or supply stop."),

    h("Water access is not the same as safe water"),
    p("A dog that loves water will often enter surf, standing water or a bay edge without evaluating conditions. Humans have to make that decision. At Padre Island National Seashore there are no lifeguards on the Gulf beaches, and the park warns about currents, tides and sudden drop-offs. A dog-friendly shoreline is not automatically a safe swimming spot."),
    p("Before a Texas coast trip, also check Texas Beach Watch from the Texas General Land Office for current recreational beach water-quality information. The program monitors selected coastal beaches and posts advisories when bacteria results indicate a possible increased illness risk. A water-quality advisory is planning information, not a universal closure order; local authorities make beach-closure decisions."),

    h("Wildlife is a reason for the leash, not just a rule"),
    p("Coastal beaches are habitat, not empty playgrounds. Padre Island National Seashore tells owners to keep pets leashed because rattlesnakes, coyotes, birds and other wildlife are present, and it warns that coyotes can prey on pets, including small dogs. The park also prohibits pets from chasing or disturbing wildlife."),
    p("Sea-turtle and shorebird activity makes this especially important on the Texas coast. Give marked nesting or release areas a wide berth, follow temporary closures, and do not let a dog investigate wildlife on the sand. A long lead that allows a dog to reach dunes, birds or traffic is not meaningful control."),

    h("Beach driving changes the dog plan"),
    p("Several Texas beaches allow driving on portions of the sand. That can make gear hauling easier, but it adds moving vehicles to the dog's environment. Keep the dog controlled when unloading, do not assume a quiet stretch will stay quiet, and choose a setup that does not put the leash or resting area across a travel lane."),
    p("If you are driving farther down-island at Padre Island National Seashore, vehicle access becomes its own trip-planning problem. Conditions and four-wheel-drive recommendations vary by section. A dog should not be the reason you skip the vehicle, tide and fuel planning required for remote beach travel."),

    h("Pack for the dog you are bringing, not the beach photo"),
    list(
      "A fixed-length leash that complies with the site's rule.",
      "More drinking water than you expect to use, plus a bowl.",
      "Shade the dog can actually stay under as the sun moves.",
      "Waste bags and a plan to carry waste to a proper receptacle.",
      "A towel and fresh water for rinsing salt and sand when appropriate.",
      "A first-aid kit and your veterinarian's contact information.",
      "Current identification and vaccination records for longer trips.",
      "A backup activity if heat, water quality, surf or wildlife conditions make the beach a bad choice."
    ),

    h("The better Texas coast rule: verify the place, then verify the day"),
    p("A dog-friendly coast trip has two separate approvals. First, the place has to allow the dog under rules you can follow. Second, the actual day has to make sense for that dog: heat, surf, water quality, wildlife activity, driving conditions and how long you plan to stay."),
    p("When both answers are yes, a Texas beach can be one of the easiest places to build a dog-centered day. When either answer is shaky, choose a shorter shoreline walk, a cooler time, a different beach or a non-beach stop. The coast will still be there on a better day."),
  ],
};

export const texasDogFriendlyPatiosArticle: Article = {
  id: "evergreen-texas-dog-friendly-patios-law",
  brandId: "texasdefined",
  slug: "texas-dog-friendly-patios-law",
  title: "Texas Dog-Friendly Patios: What State Law Allows and What to Check Before You Go",
  dek: "Texas law lets food-service establishments choose to allow dogs in qualifying outdoor dining areas, but it does not make every patio dog-friendly. Here is what the statute actually requires.",
  category: "guides",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/A_cheerful_white_dog_is_resting_on_the_green_grass_beneath_a_table_at_an_outdoor_gathering.jpg?width=1600",
    alt: "A white dog resting beneath a table at an outdoor gathering, used as a general illustration for Texas dog-friendly patio planning",
    width: 6048,
    height: 4024,
    credit: "Shixart1985 · CC BY 2.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-22",
  readingMinutes: 9,
  tags: [
    "Texas dogs",
    "dog-friendly patios Texas",
    "Texas restaurant patios",
    "Texas Health and Safety Code",
    "outdoor dining with dogs",
    "Texas Dogs Defined",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/dogs",
      label: "Texas Dogs Defined",
      description: "Breed personalities and practical Texas dog-life planning.",
    },
    {
      href: "/article/texas-dog-heat-safety",
      label: "Texas dog heat safety",
      description: "Decide whether the patio temperature and ground surface make sense for the dog.",
    },
    {
      href: "/article/best-dog-friendly-texas-trip-ideas",
      label: "Dog-friendly Texas trip ideas",
      description: "Build a weekend around places where the dog can realistically participate.",
    },
    {
      href: "/food-bbq",
      label: "Texas food and barbecue",
      description: "Explore Texas food coverage, then verify an individual restaurant's current pet policy.",
    },
    {
      href: "/texas-living",
      label: "Texas Life",
      description: "More practical guides to everyday life across Texas.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  sourceName: "Texas Legislature — Health and Safety Code § 437.025",
  sourceUrl: "https://tcss.legis.texas.gov/docs/HS/htm/HS.437.htm#437.025",
  body: [
    p("“Dog-friendly patio” sounds like a restaurant category. In Texas, the useful starting point is more precise: state law creates a set of conditions under which a food-service establishment may permit a customer to bring a dog into an outdoor dining area. The establishment still gets to decide whether it wants to allow dogs."),
    p("That distinction prevents the most common planning mistake. Texas Health and Safety Code Section 437.025 does not require every restaurant with outdoor tables to accept pet dogs. It tells an establishment what conditions apply if it chooses to do so. A patio can be outdoors and still be a no-dog patio by the business's own policy."),

    h("What the Texas statute actually requires"),
    p("Under Section 437.025, a food-service establishment may permit a dog in an outdoor dining area when the statutory conditions are met. In practical terms, the setup must keep the dog and customer in the outdoor area without routing the dog through the restaurant interior, and the customer has to keep the dog controlled."),
    list(
      "The establishment posts a conspicuous sign in the outdoor area stating that dogs are permitted.",
      "The customer and dog can enter the outdoor dining area directly from the exterior.",
      "The dog does not enter the interior of the establishment.",
      "The customer keeps the dog on a leash and controls the dog.",
      "The dog is not allowed on a seat, table, countertop or similar surface.",
      "Food is not prepared in that outdoor area.",
      "Open food in the area is limited to food being served to a customer."
    ),
    p("The statute also says a municipality may not impose a more stringent requirement on a food-service establishment for a dog in an outdoor dining area than the requirements in that subsection. The section separately says those requirements do not apply to a service animal as defined elsewhere in Chapter 437."),

    h("What the law does not mean"),
    p("The word “may” matters. The statute authorizes a restaurant to permit dogs under the listed conditions; it does not force the restaurant to do so. A business can decide that its patio is not appropriate for pet dogs, can change its policy, or can have only some outdoor seating configured for dogs."),
    p("It also does not turn every outdoor table into a qualifying dog area. If reaching the patio requires walking through the restaurant, that conflicts with the statute's direct-from-the-exterior condition for pet dogs. If food preparation happens in the area, the setup does not match the conditions listed in Section 437.025."),

    h("Call or check the restaurant's current policy"),
    p("A crowd-sourced “dog-friendly” tag can be useful for discovering possibilities, but it should not be the last check. Restaurant layouts, ownership, patio sections and operating policies change. Verify the establishment's current policy directly, especially if the patio is central to a longer trip."),
    list(
      "Ask whether pet dogs are currently allowed on the patio, not merely whether the restaurant has outdoor seating.",
      "Ask where the dog-and-customer entrance is if the layout is not obvious.",
      "Confirm whether all patio tables or only a designated section allows dogs.",
      "Check whether the patio is open during the hours you plan to visit.",
      "If weather is marginal, have a second plan that does not depend on leaving the dog unattended."
    ),

    h("A legal patio can still be a bad dog patio"),
    p("The statute answers a food-service question; it does not answer whether the outing is comfortable for your dog. A west-facing concrete patio at 5 p.m. in August can comply with the law and still be a poor place for a dog. Shade, airflow, ground temperature, crowding, noise and water access matter."),
    p("Use the same heat check you would use for a walk. If the pavement is hot, if the dog cannot settle in the available shade, or if the only plan is to keep extending the visit while the dog pants under the table, pick a different time or leave the dog home."),

    h("Control means more than holding a leash"),
    p("Section 437.025 specifically requires the customer to keep the dog on a leash and control the dog. In a restaurant setting, good control means keeping the leash out of server walkways, preventing the dog from approaching neighboring tables, and choosing enough distance that the dog does not have to manage a constant stream of strangers and other pets."),
    p("A retractable leash stretched across an aisle creates exactly the kind of problem a patio does not need. Use a short, predictable setup and keep the dog on the ground rather than on chairs or other dining surfaces."),

    h("Bring the few things that make patio time easier"),
    list(
      "A short leash that stays clear of walkways.",
      "A collapsible water bowl instead of assuming the restaurant provides one.",
      "Waste bags for the walk before and after the meal.",
      "A small mat or towel if the patio surface is comfortable enough for the dog but dusty or rough.",
      "A backup plan for sudden heat, storms, crowding or a changed restaurant policy."
    ),

    h("Do not confuse pet-dog rules with service-animal rules"),
    p("Section 437.025 expressly separates its pet-dog patio requirements from service animals. The restaurant's optional pet-patio policy is therefore not the framework to use when the question is lawful access for a service animal. This guide is about ordinary pet dogs accompanying customers in outdoor dining areas."),
    p("If you need guidance about service-animal access, use the applicable service-animal law and official guidance rather than a restaurant's “dog-friendly patio” page."),

    h("The practical Texas patio rule"),
    p("For a pet dog, think in three layers. First: does the restaurant choose to allow dogs? Second: does the outdoor setup follow the state's conditions? Third: do today's heat, crowd and surface conditions make the visit reasonable for your dog?"),
    p("When all three answers line up, a patio can be an easy way to keep the dog inside the day instead of planning every meal around leaving the dog somewhere else. When one answer fails, the correct move is not to argue that Texas is “dog-friendly.” It is to choose another patio, another time or another plan."),
  ],
};

export const texasDogsPracticalWave2Articles = [
  texasDogsCoastArticle,
  texasDogFriendlyPatiosArticle,
];
