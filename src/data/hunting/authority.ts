export type HuntingAuthorityLink = { label: string; href: string; external?: boolean };
export type HuntingAuthoritySection = { heading: string; paragraphs: string[]; links?: HuntingAuthorityLink[] };
export type HuntingAuthorityFaq = { question: string; answer: string };

export type HuntingAuthorityTopic = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  quickAnswer: string;
  about: string[];
  sections: HuntingAuthoritySection[];
  related: HuntingAuthorityLink[];
  faq: HuntingAuthorityFaq[];
};

export { HUNTING_REGULATION_FRESHNESS } from "./freshness";

export const HUNTING_OFFICIAL_SOURCES = {
  regulations: { label: "TPWD Outdoor Annual: hunting regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/", external: true },
  publicAreaSearch: { label: "TPWD: search 2026–27 public hunting areas", href: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml", external: true },
  seasonChanges: { label: "TPWD: 2026–27 hunting regulation changes", href: "https://tpwd.texas.gov/newsmedia/releases/?req=20260904a", external: true },
  purchaseRequirements: { label: "TPWD: current license purchase and ID requirements", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/purchase-requirements", external: true },
  feralHogs: { label: "TPWD: feral hog licensing and hunter education", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/", external: true },
  seasonDates: { label: "TPWD: 2026–27 hunting season dates", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates", external: true },
  licenses: { label: "TPWD: hunting licenses", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses", external: true },
  permits: { label: "TPWD: hunting permits and certifications", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-permits-certifications", external: true },
  publicHunting: { label: "TPWD: public hunting in Texas", href: "https://tpwd.texas.gov/huntwild/hunt/public/", external: true },
  aph: { label: "TPWD: Annual Public Hunting Permit / walk-in hunts", href: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/", external: true },
  drawnHunts: { label: "TPWD: drawn hunts", href: "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/", external: true },
  hunterEducation: { label: "TPWD: hunter education", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/hunter-education", external: true },
  whiteTailedDeer: { label: "TPWD: white-tailed deer regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
  muleDeer: { label: "TPWD: mule deer regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/mule-deer", external: true },
  turkey: { label: "TPWD: wild turkey regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey", external: true },
  javelina: { label: "TPWD: javelina regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/javelina", external: true },
} as const satisfies Record<string, HuntingAuthorityLink>;

const INTERNAL = {
  hunting: { label: "Texas hunting hub", href: "/hunting" },
  publicLands: { label: "Texas public lands and outdoor discovery", href: "/explore/outdoors" },
  wildlife: { label: "Texas wildlife destinations", href: "/explore/wildlife" },
  camping: { label: "Texas camping guide", href: "/best-places-to-go-camping-in-texas" },
  fishing: { label: "Texas fishing guide", href: "/fishing" },
  parks: { label: "Texas state parks", href: "/explore/state-parks" },
  counties: { label: "Browse Texas counties", href: "/browse/counties" },
  tripPlanner: { label: "Texas trip planner", href: "/explore/trip-planner" },
  resources: { label: "Texas services and resources", href: "/texas-resources" },
} as const satisfies Record<string, HuntingAuthorityLink>;

const verifyRules = "Use TexasDefined to understand the planning framework, then confirm the current legal rule with TPWD for the exact species, county, property and method you plan to hunt.";
const standardRelated = [
  INTERNAL.hunting,
  { label: "Texas hunting seasons", href: "/hunting/hunting-seasons" },
  { label: "Texas bag limits", href: "/hunting/bag-limits" },
  { label: "Texas public hunting", href: "/hunting/public-hunting" },
  INTERNAL.wildlife,
  INTERNAL.counties,
];

function topic(input: Omit<HuntingAuthorityTopic, "faq"> & { faq?: HuntingAuthorityFaq[] }): HuntingAuthorityTopic {
  return {
    ...input,
    // Avoid repetitive, automatically generated questions across many guides.
    faq: input.faq ?? [],
  };
}

function speciesTopic(input: {
  slug: string;
  title: string;
  species: string;
  description: string;
  source?: HuntingAuthorityLink;
  habitat: string;
  planning: string;
}): HuntingAuthorityTopic {
  const source = input.source ?? HUNTING_OFFICIAL_SOURCES.regulations;
  return topic({
    slug: input.slug,
    eyebrow: "Texas hunting species",
    title: input.title,
    description: input.description,
    quickAnswer: `${input.species} hunting in Texas depends on the current season framework, location, legal means and methods, property access and any tagging or reporting requirements. Verify the exact hunt with TPWD before going afield.`,
    about: [`Texas ${input.species} hunting`, `${input.species} season Texas`, `TPWD ${input.species}`],
    sections: [
      { heading: "Start with the current TPWD rule", paragraphs: [`${input.species} rules can change by season year, county, zone or property. TexasDefined keeps the planning framework durable rather than copying a date or limit that can go stale.`, verifyRules], links: [source, HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Match habitat to geography", paragraphs: [input.habitat, "Use county, wildlife and public-land discovery to narrow the trip before checking the specific hunt unit or private-property permission."], links: [INTERNAL.publicLands, INTERNAL.wildlife, INTERNAL.counties] },
      { heading: "Plan access before travel", paragraphs: [input.planning, "For public hunting, confirm whether the opportunity uses APH access, a drawn hunt, another permit or site-specific registration."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, { label: "Texas public hunting guide", href: "/hunting/public-hunting" }, INTERNAL.tripPlanner] },
    ],
    related: [...standardRelated, INTERNAL.camping],
  });
}

export const HUNTING_AUTHORITY_TOPICS: Record<string, HuntingAuthorityTopic> = {
  "texas-hunting-license": topic({
    slug: "texas-hunting-license",
    eyebrow: "Texas hunting licenses",
    title: "Texas Hunting License Guide",
    description: "Understand Texas hunting-license choices, endorsements and the official TPWD path for buying the correct license before a hunt.",
    quickAnswer: "Most hunters need an appropriate Texas hunting license, and the exact license, endorsement or certification depends on residency, age, species and activity. Use TPWD's current license pages for current products, eligibility and fees.",
    about: ["Texas hunting license", "TPWD hunting licenses", "Texas hunting endorsements"],
    sections: [
      { heading: "Choose the correct license product", paragraphs: ["Start with TPWD's resident hunting license, nonresident general or eligible five-day license, youth license, or qualifying combination or special-eligibility product. A five-day license is not interchangeable with a nonresident general license for every species.", "A hunting license may not be the only credential: some species and methods require endorsements or federal permissions. Review official products, eligibility and fees before purchase."], links: [HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "2026 license identity checks and digital tags", paragraphs: ["New identity-verification rules took effect August 3, 2026, including additional checks for recreational-license buyers age 17 and over and online ID validation. Digital recreational licenses and endorsements are available online; hunters using digital tags must follow the Texas Hunt & Fish app requirements for applicable harvests.", "TPWD's purchase rules and current fees control. License and hunter education requirements must be checked separately."], links: [HUNTING_OFFICIAL_SOURCES.purchaseRequirements, HUNTING_OFFICIAL_SOURCES.seasonChanges] },
      { heading: "License and hunter education are separate", paragraphs: ["TPWD treats license eligibility and hunter-education compliance as related but distinct requirements. Resolve both before the hunt."], links: [{ label: "Texas hunter education guide", href: "/hunting/hunter-education" }, HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Public-land access may require another permit", paragraphs: ["A hunting license does not automatically grant access to every public hunting area. APH areas, drawn hunts and individual properties can have additional requirements."], links: [{ label: "Texas public hunting guide", href: "/hunting/public-hunting" }, HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.publicLands] },
    ],
    related: [{ label: "Texas hunter education", href: "/hunting/hunter-education" }, { label: "Texas hunting seasons", href: "/hunting/hunting-seasons" }, { label: "Texas public hunting", href: "/hunting/public-hunting" }, INTERNAL.resources, INTERNAL.counties],
  }),
  "hunter-education": topic({
    slug: "hunter-education",
    eyebrow: "Hunter education",
    title: "Texas Hunter Education Requirements Explained",
    description: "A plain-English guide to Texas hunter education, course options, proof of certification and the current TPWD source.",
    quickAnswer: "For the 2026–27 license year, TPWD says hunters born on or after September 2, 1971 generally must complete hunter education or qualify under an allowed accompaniment or deferral path. Confirm the rule that applies to your situation before hunting.",
    about: ["Texas hunter education", "hunter safety", "TPWD hunter education"],
    sections: [
      { heading: "Check the current age and accompaniment rules", paragraphs: ["Texas uses a birth-date-based hunter-education requirement with age-specific conditions. Because those details determine whether someone may hunt independently, use the current TPWD rule."], links: [HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Certification and deferral are different", paragraphs: ["A completed certification is the durable credential. Limited alternatives can carry conditions and do not erase license or hunt-area requirements.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Resolve education before applying", paragraphs: ["Drawn hunts, youth opportunities and mentored hunts can involve deadlines well before opening day."], links: [{ label: "Texas drawn hunts", href: "/hunting/drawn-hunts" }, { label: "Texas youth hunting", href: "/hunting/youth-hunting" }] },
    ],
    related: [{ label: "Texas hunting license", href: "/hunting/texas-hunting-license" }, { label: "Texas youth hunting", href: "/hunting/youth-hunting" }, { label: "Texas public hunting", href: "/hunting/public-hunting" }, INTERNAL.resources, INTERNAL.tripPlanner],
  }),
  "public-hunting": topic({
    slug: "public-hunting",
    eyebrow: "Texas public hunting",
    title: "Where Can You Hunt on Public Land in Texas?",
    description: "Find the main Texas public-hunting systems, including APH areas, drawn hunts, TPWD lands and official access tools.",
    quickAnswer: "Texas public hunting is a network rather than one open-land rule. Access can come through the Annual Public Hunting Permit, drawn hunts and area-specific permits or registrations.",
    about: ["Texas public hunting", "public hunting land Texas", "Texas WMAs"],
    sections: [
      { heading: "Start with TPWD's searchable public-hunting areas", paragraphs: ["Use TPWD's official 2026–27 area search by legal game, county and unit. A Wildlife Management Area conservation designation, state park, campground or nearby wildlife destination is not itself permission to hunt.", "Open each area's legal-game listing and current property conditions before choosing a date."], links: [HUNTING_OFFICIAL_SOURCES.publicAreaSearch, HUNTING_OFFICIAL_SOURCES.publicHunting] },
      { heading: "Walk-in and drawn hunts solve different needs", paragraphs: ["APH is the broad walk-in framework for designated lands. Drawn hunts cover separate limited-entry opportunities, and some properties use other procedures."], links: [HUNTING_OFFICIAL_SOURCES.aph, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
      { heading: "Public does not mean unrestricted", paragraphs: ["Every hunt still depends on legal game, season, county or zone, methods, boundaries and property instructions."], links: [HUNTING_OFFICIAL_SOURCES.regulations, INTERNAL.tripPlanner] },
    ],
    related: [{ label: "Annual Public Hunting Permit", href: "/hunting/annual-public-hunting-permit" }, { label: "Texas drawn hunts", href: "/hunting/drawn-hunts" }, { label: "Texas hunting seasons", href: "/hunting/hunting-seasons" }, INTERNAL.publicLands, INTERNAL.wildlife, INTERNAL.counties],
  }),
  "annual-public-hunting-permit": topic({
    slug: "annual-public-hunting-permit",
    eyebrow: "Public hunting permits",
    title: "Texas Annual Public Hunting Permit (APH) Guide",
    description: "Understand what the Annual Public Hunting Permit does, where it applies and what to verify before using a walk-in hunting area.",
    quickAnswer: "APH provides access to designated public-hunting lands and participating walk-in areas. It does not replace the hunting license, endorsements, hunter education or unit-specific rules.",
    about: ["Annual Public Hunting Permit", "APH permit Texas", "Texas walk-in hunting"],
    sections: [
      { heading: "Use the current APH map and area search", paragraphs: ["Only specific participating properties and legal game are covered. Consult TPWD's current APH booklet and official unit search; a WMA or other conservation property is not automatically open to hunting."], links: [HUNTING_OFFICIAL_SOURCES.aph, HUNTING_OFFICIAL_SOURCES.publicAreaSearch] },
      { heading: "APH does not replace hunting rules", paragraphs: ["Licenses, endorsements, hunter education, seasons, tagging, reporting and legal methods still apply."], links: [HUNTING_OFFICIAL_SOURCES.regulations, HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "Check property instructions", paragraphs: ["Registration, parking, boundaries, closures and other access instructions can be property-specific."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.tripPlanner] },
    ],
    related: [{ label: "Texas public hunting", href: "/hunting/public-hunting" }, { label: "Texas drawn hunts", href: "/hunting/drawn-hunts" }, { label: "Texas hunting seasons", href: "/hunting/hunting-seasons" }, INTERNAL.publicLands, INTERNAL.counties],
  }),
  "drawn-hunts": topic({
    slug: "drawn-hunts",
    eyebrow: "Limited-entry hunting",
    title: "Texas Drawn Hunts Guide",
    description: "Plan Texas public-hunt drawings, deadlines and limited-entry opportunities through the official TPWD system.",
    quickAnswer: "TPWD runs drawn hunts through an online application catalog with hunt-specific eligibility, deadlines, fees and instructions. Use the current catalog rather than last year's calendar.",
    about: ["Texas drawn hunts", "TPWD drawn hunts", "public hunt drawing"],
    sections: [
      { heading: "Use the current catalog", paragraphs: ["Opportunities, deadlines, costs and participating properties can change each year. TexasDefined intentionally does not duplicate the full deadline calendar."], links: [HUNTING_OFFICIAL_SOURCES.drawnHunts] },
      { heading: "Read the individual hunt notice", paragraphs: ["Party size, eligibility, permits, lodging or camping and required licenses can differ by hunt."], links: [HUNTING_OFFICIAL_SOURCES.drawnHunts, INTERNAL.publicLands, INTERNAL.parks] },
      { heading: "Plan travel after selection", paragraphs: ["Build lodging, county and travel plans around the final assignment and check-in instructions."], links: [INTERNAL.counties, INTERNAL.camping, INTERNAL.tripPlanner] },
    ],
    related: [{ label: "Texas public hunting", href: "/hunting/public-hunting" }, { label: "Annual Public Hunting Permit", href: "/hunting/annual-public-hunting-permit" }, { label: "Texas youth hunting", href: "/hunting/youth-hunting" }, INTERNAL.parks, INTERNAL.tripPlanner],
  }),
  "hunting-seasons": topic({
    slug: "hunting-seasons", eyebrow: "Texas hunting seasons", title: "Texas Hunting Seasons: How to Check the Current Dates", description: "Use TPWD's current season tables without relying on stale dates copied into evergreen guides.", quickAnswer: "Texas hunting seasons vary by species, county or zone, method and sometimes property. Start with TPWD's current season-date tables, then open the species and county rules that apply to your hunt.", about: ["Texas hunting seasons", "2026–27 Texas hunting seasons", "TPWD season dates"],
    sections: [
      { heading: "Use season tables as the starting point", paragraphs: ["Season summaries help orient the calendar, but they are not the final check for every hunt."], links: [HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Then check species and geography", paragraphs: ["County, zone, method and special-property rules can narrow or alter the general season framework.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations, INTERNAL.counties] },
      { heading: "Treat public-hunt dates as property specific", paragraphs: ["APH and drawn-hunt opportunities may have their own legal-game windows and access instructions."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
    ], related: [{ label: "Texas bag limits", href: "/hunting/bag-limits" }, { label: "Texas archery hunting", href: "/hunting/archery-hunting" }, { label: "Texas public hunting", href: "/hunting/public-hunting" }, INTERNAL.counties, INTERNAL.tripPlanner],
  }),
  "bag-limits": topic({
    slug: "bag-limits", eyebrow: "Texas hunting regulations", title: "Texas Hunting Bag Limits Explained", description: "Understand daily, possession, season and county-specific limit concepts while keeping the current TPWD rule as the source of truth.", quickAnswer: "Bag limits are species- and location-specific and can involve daily, possession, season, sex or antler restrictions. Verify the exact current limit in TPWD's Outdoor Annual before hunting.", about: ["Texas bag limits", "Texas hunting limits", "TPWD bag limits"],
    sections: [
      { heading: "Do not assume one statewide number", paragraphs: ["Limits may vary by species, county, zone, sex, antler classification or hunt type."], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Tagging and reporting can be separate duties", paragraphs: ["A lawful harvest can also trigger tagging, proof-of-sex or reporting requirements depending on species and method.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Public-hunt permits do not override limits", paragraphs: ["APH and drawn hunts operate inside the applicable legal framework unless the hunt notice states a specific controlled-hunt condition."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
    ], related: [{ label: "Texas hunting seasons", href: "/hunting/hunting-seasons" }, { label: "Texas archery hunting", href: "/hunting/archery-hunting" }, { label: "Texas public hunting", href: "/hunting/public-hunting" }, INTERNAL.counties],
  }),
  "archery-hunting": topic({
    slug: "archery-hunting", eyebrow: "Texas archery hunting", title: "Texas Archery Hunting Guide", description: "Plan archery-only opportunities while checking species, county, equipment and public-land rules with TPWD.", quickAnswer: "Archery opportunities can have distinct season windows and equipment rules. Confirm the current species, county or zone and legal means-and-methods rules before hunting.", about: ["Texas archery hunting", "Texas bow season", "archery-only season Texas"],
    sections: [
      { heading: "Archery season is not one statewide rule", paragraphs: ["Species and geography still control the applicable season structure."], links: [HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Check legal equipment definitions", paragraphs: ["Legal archery equipment and any special restrictions belong to the current means-and-methods rules.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Public-land archery access varies", paragraphs: ["Some public lands offer archery opportunities through APH or drawn hunts; verify the property listing."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.publicLands] },
    ], related: [{ label: "Texas hunting seasons", href: "/hunting/hunting-seasons" }, { label: "Texas bag limits", href: "/hunting/bag-limits" }, { label: "Texas public hunting", href: "/hunting/public-hunting" }, INTERNAL.camping, INTERNAL.counties],
  }),
  "youth-hunting": topic({
    slug: "youth-hunting", eyebrow: "Texas youth hunting", title: "Texas Youth Hunting Guide", description: "Connect youth hunting opportunities with hunter education, licenses, supervision and TPWD public-hunt programs.", quickAnswer: "Youth hunts can use special eligibility, supervision and application rules. Check the current TPWD hunt notice plus license and hunter-education requirements for the youth hunter and accompanying adult.", about: ["Texas youth hunting", "youth hunts Texas", "TPWD youth hunts"],
    sections: [
      { heading: "Start with age and education rules", paragraphs: ["Youth status does not eliminate hunter-education or supervision rules; the exact requirement depends on age and circumstances."], links: [HUNTING_OFFICIAL_SOURCES.hunterEducation, HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "Look for youth-specific public hunts", paragraphs: ["TPWD public-hunting and drawn-hunt catalogs can include youth-only or youth-focused opportunities."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
      { heading: "Read the adult-supervision instructions", paragraphs: ["Each opportunity can specify who must accompany the youth and what licenses or permits apply."], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
    ], related: [{ label: "Texas hunter education", href: "/hunting/hunter-education" }, { label: "Texas drawn hunts", href: "/hunting/drawn-hunts" }, { label: "Texas hunting license", href: "/hunting/texas-hunting-license" }, INTERNAL.tripPlanner, INTERNAL.resources],
  }),
  "texas-deer-hunting": speciesTopic({ slug: "texas-deer-hunting", title: "Texas White-Tailed Deer Hunting Guide", species: "white-tailed deer", description: "Plan a Texas deer hunt around county rules, antler restrictions, tagging, habitat and public access.", source: HUNTING_OFFICIAL_SOURCES.whiteTailedDeer, habitat: "White-tailed deer occur across much of Texas, but habitat, herd management and county regulations differ sharply among regions.", planning: "For public deer hunting, verify legal game, antler or sex restrictions, permit type and check-in requirements for the exact property." }),
  "mule-deer": speciesTopic({ slug: "mule-deer", title: "Texas Mule Deer Hunting Guide", species: "mule deer", description: "Plan mule-deer hunting in the parts of Texas where the species and current TPWD seasons apply.", source: HUNTING_OFFICIAL_SOURCES.muleDeer, habitat: "Texas mule-deer hunting is concentrated in western parts of the state, making region, county and habitat selection central to trip planning.", planning: "Public mule-deer opportunities are limited enough that drawn-hunt and property-specific planning should begin early." }),
  "dove-hunting": speciesTopic({ slug: "dove-hunting", title: "Texas Dove Hunting Guide", species: "dove", description: "Plan Texas dove hunting around zones, migratory-bird requirements, public fields and current TPWD rules.", habitat: "Dove hunting quality follows food, water, agricultural patterns and migration, so conditions can change quickly within the same zone.", planning: "Public dove fields can be popular and may use APH or site-specific access; review maps, parking and legal-game instructions before travel." }),
  "turkey-hunting": speciesTopic({ slug: "turkey-hunting", title: "Texas Turkey Hunting Guide", species: "wild turkey", description: "Connect turkey seasons and county rules to habitat, public access and current TPWD requirements.", source: HUNTING_OFFICIAL_SOURCES.turkey, habitat: "Turkey distribution and season structure differ across Texas, so county and species subspecies context matter before selecting a destination.", planning: "Public turkey opportunities can be limited-entry or property-specific; drawn hunts may be important in some areas." }),
  "quail-hunting": speciesTopic({ slug: "quail-hunting", title: "Texas Quail Hunting Guide", species: "quail", description: "Plan Texas quail hunting around habitat, weather-sensitive populations, public access and current regulations.", habitat: "Quail abundance can vary substantially with rainfall and habitat conditions, making recent TPWD population information useful alongside durable habitat guidance.", planning: "Public quail access depends on the legal-game listing for each area; do not assume suitable habitat is open to hunting." }),
  "waterfowl-hunting": speciesTopic({ slug: "waterfowl-hunting", title: "Texas Waterfowl Hunting Guide", species: "waterfowl", description: "Plan duck and goose hunting around zones, federal migratory-bird rules, wetlands and public access.", habitat: "Texas waterfowl hunting spans coastal marshes, reservoirs, river corridors, playa country and agricultural landscapes, with migration and water conditions changing through the season.", planning: "Waterfowl hunts can involve federal stamps, migratory-bird certifications and property-specific rules in addition to Texas licensing." }),
  "javelina-hunting": speciesTopic({ slug: "javelina-hunting", title: "Texas Javelina Hunting Guide", species: "javelina", description: "Plan javelina hunting around current county rules, South and West Texas habitat and public-hunt opportunities.", source: HUNTING_OFFICIAL_SOURCES.javelina, habitat: "Javelina are associated especially with brush-country and arid landscapes in South and West Texas, so regional habitat is a useful first filter.", planning: "Check the exact property and county rules because public opportunities and seasons can differ from private-land assumptions." }),
  "feral-hogs": topic({
    slug: "feral-hogs",
    eyebrow: "Texas hunting species",
    title: "Texas Feral Hog Hunting Guide",
    description: "Understand the private-land hunting-license exception, hunter education and public-area restrictions for Texas feral hogs.",
    quickAnswer: "TPWD says no hunting license is required to hunt feral hogs on private property with landowner authorization, but hunter-education requirements still apply. Public-land hunting is different: use the current TPWD legal-game listings, licenses and permit rules.",
    about: ["Texas feral hog hunting", "Feral hog private land license exception", "Texas public hunting access"],
    sections: [
      { heading: "Private land: landowner authorization and hunter education", paragraphs: ["TPWD states that no hunting license is required for feral hogs on private property with landowner authorization. Hunter education requirements still apply. Verify property boundaries, local restrictions and lawful means and methods.", "Do not extend the private-land licensing exception to public property or assume it overrides any other law."], links: [HUNTING_OFFICIAL_SOURCES.feralHogs, HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Public land: check the legal-game list and permit", paragraphs: ["Feral hogs may be present in WMAs and other public areas without being legal game there. TPWD's current area record controls hunt dates, methods, legal game, license and APH or drawn-hunt access.", "Never rely on an unrelated place listing or private-land rule as proof of public hunting access."], links: [HUNTING_OFFICIAL_SOURCES.publicAreaSearch, HUNTING_OFFICIAL_SOURCES.publicHunting] },
      { heading: "Habitat, property consent and transport", paragraphs: ["Feral hogs occur in Texas river bottoms, brush, farmland and timber. The location of hog sign does not establish hunting permission. Coordinate control activities with the landowner.", "The transport or release of live feral hogs is restricted under Texas Animal Health Commission disease-control rules; that is a separate issue from lawful harvest."], links: [HUNTING_OFFICIAL_SOURCES.feralHogs, INTERNAL.wildlife] },
    ],
    related: [{ label: "Texas public hunting", href: "/hunting/public-hunting" }, { label: "Annual Public Hunting Permit", href: "/hunting/annual-public-hunting-permit" }, { label: "Hunter education", href: "/hunting/hunter-education" }, INTERNAL.counties],
    faq: [
      { question: "Do I need a license to hunt feral hogs on private land in Texas?", answer: "Not with landowner authorization, according to TPWD. Hunter education requirements still apply; public-land hunting follows separate rules." },
      { question: "Can I hunt feral hogs on any Wildlife Management Area?", answer: "No. Confirm that the specific TPWD unit lists feral hogs as legal game and check the current dates, permits, methods and area instructions." },
    ],
  }),
  "exotic-game": speciesTopic({ slug: "exotic-game", title: "Texas Exotic Game Hunting Guide", species: "exotic game", description: "Understand how exotic-species hunting differs across private ranches, public hunts and current Texas rules.", habitat: "Exotic species are distributed unevenly across Texas and are often associated with private ranches, while some public drawn-hunt opportunities may also exist.", planning: "Verify the exact species classification, license requirements, property permission and hunt notice instead of treating all exotic animals as one rules category." }),
};

export const HUNTING_AUTHORITY_PATHS = [
  "/hunting",
  ...Object.keys(HUNTING_AUTHORITY_TOPICS).map((slug) => `/hunting/${slug}`),
] as const;

export function getHuntingAuthorityTopic(slug: string) {
  return HUNTING_AUTHORITY_TOPICS[slug] ?? null;
}

export const HUNTING_HUB_GROUPS = [
  {
    title: "Licenses, education & regulations",
    description: "Get the legal-planning framework right before choosing a destination.",
    slugs: ["texas-hunting-license", "hunter-education", "hunting-seasons", "bag-limits", "archery-hunting", "youth-hunting"],
  },
  {
    title: "Public hunting & access",
    description: "Find the permit or drawing that actually opens the gate to a public hunt.",
    slugs: ["public-hunting", "annual-public-hunting-permit", "drawn-hunts"],
  },
  {
    title: "Species planning",
    description: "Connect species to counties, zones, habitats and current TPWD rules.",
    slugs: ["texas-deer-hunting", "mule-deer", "dove-hunting", "turkey-hunting", "quail-hunting", "waterfowl-hunting", "javelina-hunting", "feral-hogs", "exotic-game"],
  },
] as const;
