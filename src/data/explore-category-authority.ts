import type { CategorySlug } from "@/data/types";

export type ExploreAuthoritySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ExploreAuthoritySource = {
  name: string;
  url: string;
};

export type ExploreAuthorityGuide = {
  title: string;
  dek: string;
  sections: ExploreAuthoritySection[];
  sources: ExploreAuthoritySource[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const exploreCategoryAuthority: Partial<Record<CategorySlug, ExploreAuthorityGuide>> = {
  outdoors: {
    title: "How to explore wild Texas",
    dek: "Texas outdoor travel changes dramatically by region and season. Use habitat, public-land access, weather and wildlife behavior—not a single statewide checklist—to decide where to go and how to prepare.",
    sections: [
      {
        heading: "Start with habitat, not just a park name",
        paragraphs: [
          "Texas spans deserts, mountains, prairie, pine forest, coastal marsh, brush country, limestone canyons and spring-fed river corridors. That range is why an outdoors trip in the Trans-Pecos can feel completely different from one on the Upper Texas Coast or in the Piney Woods. The most useful first question is not simply which park is popular, but which landscape supports the experience you want: bird migration, dark skies, paddling, desert hiking, wildlife viewing or a family nature walk.",
          "Texas Parks and Wildlife organizes wildlife-viewing opportunities by region and habitat, and the Great Texas Wildlife Trails use nine driving-map systems to connect places where travelers can look for birds, butterflies, bats, pronghorn and other wildlife. That makes the trails especially useful when one park is full or when you want several stops in the same ecological region rather than a single destination.",
        ],
        bullets: [
          "For birds and migration, compare coastal, Rio Grande Valley, Hill Country and West Texas habitat rather than relying on one statewide species list.",
          "For dark skies, favor remote parks and natural areas with documented low-light conditions and check moon phase before the trip.",
          "For short family outings, look for nature or interpretive trails before committing to remote backcountry mileage.",
          "For wildlife photography, treat distance and habitat protection as part of the trip plan, not as optional etiquette.",
        ],
      },
      {
        heading: "Texas wildlife viewing is seasonal",
        paragraphs: [
          "Texas is useful for birding all year, but the mix changes with spring migration, summer nesting, fall movement and winter residents. A place that is quiet in one month can be exceptional in another. Along the Gulf Coast and Lower Rio Grande Valley, migration can concentrate birds into relatively small areas. In West Texas and the Panhandle, open-country species and desert or mountain habitat create a very different field experience.",
          "The same seasonal thinking applies beyond birds. Bat emergence, wildflower bloom, heat, river flow and nighttime temperatures all change the value and difficulty of an outing. A low-value itinerary says to visit a place; a useful Texas itinerary explains when the place is most rewarding and what conditions could change the plan. Before a long drive, check the managing agency's current alerts, hours, reservation rules, burn restrictions and trail conditions.",
        ],
      },
      {
        heading: "Public access varies by land type",
        paragraphs: [
          "State parks are only one part of the outdoor-access picture. State natural areas often protect more sensitive habitat and may have fewer developed facilities or more limited access. Wildlife management areas are managed primarily for wildlife and research, and some require specific public-use permits or advance planning. National parks, wildlife refuges, local preserves and river-access points each operate under their own rules.",
          "That difference matters in Texas because a map pin does not automatically mean unrestricted public access. Verify the land manager, entrance requirements, gate hours, reservation system and whether the activity you want is actually permitted. For remote sites, confirm water availability, road conditions and whether cell coverage should be expected. This is particularly important in hot-weather and desert environments, where a minor planning mistake can become a safety issue quickly.",
        ],
      },
      {
        heading: "Heat, water and distance are core trip-planning variables",
        paragraphs: [
          "Texas Parks and Wildlife specifically directs visitors to heat, trail, swimming and wildlife safety guidance. In practice, that means carrying more water than an ordinary urban walk would require, knowing your turnaround point, using a real trail map, and adjusting plans when heat or storms make the original itinerary unreasonable. Remote Texas landscapes can offer extraordinary solitude, but the same distance from services that improves the experience also increases the consequences of poor preparation.",
          "Wildlife should be observed from a safe distance. Do not build a route around approaching animals for photographs, and do not treat state natural areas as developed theme parks. Staying on established routes where required, packing out waste and respecting closures protects both visitors and the habitats that make these trips worthwhile.",
        ],
      },
      {
        heading: "Dark skies are one of Texas' strongest outdoor assets",
        paragraphs: [
          "Several Texas state parks and natural areas are recognized for especially dark skies, and TPWD maintains stargazing guidance and Bortle-scale information for parks. Big Bend Ranch, Copper Breaks, Enchanted Rock, South Llano River and other sites can turn an ordinary overnight trip into a night-sky trip if clouds, moonlight and local conditions cooperate.",
          "Plan stargazing separately from daytime sightseeing. Check the moon, arrive before dark, identify where nighttime access is allowed and preserve night vision by limiting bright white light. In remote country, the drive after dark can be more demanding than the viewing itself, so overnight lodging or camping can be part of the safety plan rather than an afterthought.",
        ],
      },
      {
        heading: "A practical Texas outdoors checklist",
        paragraphs: [
          "Before leaving, match the outing to the region, season and managing agency. Then verify the current operational details directly with that agency. Texas Defined uses destination pages and regional guides to help narrow the choices, but official land managers remain the source of truth for closures, permits, capacity limits and same-day conditions.",
        ],
        bullets: [
          "Confirm managing agency, hours, fees, reservations and access rules.",
          "Check forecast, heat risk, recent rain and trail or river conditions.",
          "Carry water, navigation, sun protection and a backup light appropriate to the route.",
          "Use wildlife-viewing ethics: distance, quiet observation and no feeding.",
          "For remote trips, tell someone the route and expected return time.",
          "Recheck official alerts immediately before departure; old trip reports are not operational guidance.",
        ],
      },
    ],
    sources: [
      { name: "Texas Parks & Wildlife — Wildlife Viewing", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/wildlife-watching" },
      { name: "Texas Parks & Wildlife — Great Texas Wildlife Trails", url: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/" },
      { name: "Texas Parks & Wildlife — Birding", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/birding-in-state-parks" },
      { name: "Texas Parks & Wildlife — Hiking", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/hiking-in-state-parks" },
      { name: "Texas Parks & Wildlife — Visitor Safety", url: "https://tpwd.texas.gov/state-parks/park-information/safety" },
      { name: "Texas Parks & Wildlife — Stargazing", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks" },
    ],
    relatedLinks: [
      { label: "Browse Texas state parks", href: "/explore/state-parks" },
      { label: "Explore Texas regions", href: "/explore" },
      { label: "Texas wildlife guide", href: "/article/texas-wildlife-guide" },
      { label: "Texas ecoregions explained", href: "/article/texas-ecoregions-habitats-guide" },
    ],
  },
  caverns: {
    title: "A practical guide to caves and caverns in Texas",
    dek: "Texas caves range from developed show-cave tours to protected wild systems. Geology, access rules, weather and conservation determine what kind of visit is possible.",
    sections: [
      {
        heading: "Why Central and Southwest Texas have so many caves",
        paragraphs: [
          "Much of the best-known cave country in Texas is tied to thick limestone formations. Slightly acidic groundwater moves through fractures and gradually enlarges them, creating passages, rooms, shafts and underground drainage systems. The result is not one uniform cave type: different limestone units, faults, water history and erosion patterns produce very different underground landscapes.",
          "Longhorn Cavern is a useful example because Texas Parks and Wildlife describes a complex history involving ancient limestone, faulting and water that both dissolved and physically cut through rock. Kickapoo Cavern sits in Devils River limestone and preserves a different expression of the same broad relationship between carbonate rock and groundwater. Understanding that geology makes the visit more than a photo stop: caves are records of how water has moved through the Texas landscape for immense spans of time.",
        ],
      },
      {
        heading: "Show caves and wild caves are different trips",
        paragraphs: [
          "A developed cavern tour is designed around controlled access, established routes and scheduled entry. Longhorn Cavern State Park, for example, uses paid guided cavern tours while the park grounds themselves are day-use. Kickapoo Cavern State Park is more lightly developed and restricts unauthorized cave entry; guided access is used to protect both visitors and cave resources.",
          "Wild-cave experiences can demand permits, specialized equipment, route knowledge and a much higher tolerance for confined, wet or uneven conditions. Do not assume that finding a cave name on a map means it is open for self-guided exploration. Ownership and access rules matter, and many caves are closed or tightly controlled because of safety, habitat and resource-protection concerns.",
        ],
      },
      {
        heading: "Caves are wildlife habitat, not empty rooms",
        paragraphs: [
          "Texas caves support animals adapted to darkness and stable underground conditions, while cave entrances and sinkholes can also serve as major bat habitat. Kickapoo Cavern State Park contains multiple known caves, including Stuart Bat Cave, which hosts seasonal Mexican free-tailed bats. That means visitor behavior affects more than rock formations.",
          "Avoid touching formations, disturbing roosting animals or entering closed passages. Cave conservation is unusually sensitive because damage can be permanent on a human timescale. Oils from hands, broken formations, graffiti and off-route traffic can alter features that formed over thousands of years. Agency restrictions that feel inconvenient are often part of keeping the cave viable for wildlife, research and future visitors.",
        ],
      },
      {
        heading: "Rain can change a cave plan",
        paragraphs: [
          "Caves are drainage systems. Water that falls far from an entrance can move underground and change conditions quickly, which is why Texas Parks and Wildlife warns against caving in rainy weather. A clear sky at the trailhead is not the only factor; recent and upstream rainfall can matter depending on the system.",
          "For any trip beyond a developed guided route, use a conservative weather threshold. Tell someone where you are going, never cave alone, carry multiple independent light sources and know when to turn around. Helmets, footwear, clothing and route-finding needs depend on the cave. A commercial walking tour and a permit-based wild-cave trip should never share the same packing assumptions.",
        ],
      },
      {
        heading: "Longhorn Cavern and Kickapoo Cavern offer two different models",
        paragraphs: [
          "Longhorn Cavern, northwest of Austin, combines a developed guided-tour experience with above-ground trails, Civilian Conservation Corps history and nearby Hill Country attractions. It works well for travelers who want an accessible introduction to Texas cave geology without planning a technical caving trip. The park is day-use, so overnight plans belong elsewhere.",
          "Kickapoo Cavern, west of San Antonio near Brackettville, is deliberately less developed. TPWD highlights caves, hiking, mountain biking, camping, birding and seasonal bat-flight viewing. The park has numerous known caves, but unauthorized cave entry is prohibited. This is a better fit for visitors who value a more remote landscape and are comfortable planning around limited services, operating schedules and reservations.",
        ],
      },
      {
        heading: "How to choose a Texas cave trip",
        paragraphs: [
          "Start by deciding whether you want geology, family sightseeing, bats, photography, hiking or technical caving. Then confirm the exact access model with the land manager. Texas Defined can help compare destinations, but official park and cave operators control schedules, tour availability and closures.",
        ],
        bullets: [
          "For a first cave visit, choose a developed guided tour with clear operating information.",
          "For bat viewing, check seasonal timing and viewing rules rather than assuming bats are present year-round.",
          "For remote parks, plan fuel, water, camping and arrival time before leaving a major town.",
          "For wild caving, never enter without confirming permission, conditions and required safety equipment.",
          "Avoid cave trips during threatening rain and carry redundant light sources on any undeveloped route.",
          "Treat formations, cave wildlife and closures as protected resources, not obstacles to the visit.",
        ],
      },
    ],
    sources: [
      { name: "Texas Parks & Wildlife — Caving in State Parks", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/caves-at-state-parks" },
      { name: "Texas Parks & Wildlife — Longhorn Cavern State Park", url: "https://tpwd.texas.gov/state-parks/longhorn-cavern/" },
      { name: "Texas Parks & Wildlife — Longhorn Cavern geology", url: "https://tpwd.texas.gov/state-parks/longhorn-cavern/nature" },
      { name: "Texas Parks & Wildlife — Kickapoo Cavern State Park", url: "https://tpwd.texas.gov/state-parks/kickapoo-cavern" },
      { name: "Texas Parks & Wildlife — Kickapoo Cavern nature", url: "https://tpwd.texas.gov/state-parks/kickapoo-cavern/nature" },
    ],
    relatedLinks: [
      { label: "Longhorn Cavern State Park", href: "/destination/longhorn-cavern-state-park" },
      { label: "Kickapoo Cavern State Park", href: "/destination/kickapoo-cavern-state-park" },
      { label: "Browse Texas state parks", href: "/explore/state-parks" },
      { label: "Texas aquifers and springs explained", href: "/article/texas-aquifers-springs-explained" },
    ],
  },
};
