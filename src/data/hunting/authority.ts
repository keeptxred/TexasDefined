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

export const HUNTING_REGULATION_FRESHNESS = {
  seasonYear: "2026–27",
  validFrom: "2026-09-01",
  validThrough: "2027-08-31",
  lastVerified: "2026-09-01",
  lastVerifiedLabel: "September 1, 2026",
  disclaimer: "TexasDefined is an independent planning and educational publication, not the legal authority for Texas hunting rules. Verify current seasons, county rules, legal means and methods, endorsements, tagging, reporting requirements and bag limits with Texas Parks and Wildlife Department before hunting.",
} as const;

export const HUNTING_OFFICIAL_SOURCES = {
  regulations: { label: "TPWD Outdoor Annual: hunting regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/", external: true },
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
const standardRelated = [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.wildlife, INTERNAL.counties, INTERNAL.tripPlanner];

function topic(input: Omit<HuntingAuthorityTopic, "faq"> & { faq?: HuntingAuthorityFaq[] }): HuntingAuthorityTopic {
  return {
    ...input,
    faq: input.faq ?? [
      { question: `Where should I verify current ${input.title.toLowerCase()} rules?`, answer: "Use the current TPWD Outdoor Annual and the official property or hunt notice before hunting." },
      { question: "Can TexasDefined replace the official regulations?", answer: "No. TexasDefined is an independent planning publication; TPWD and applicable federal rules control legal requirements." },
      { question: "Can county or public-land rules differ?", answer: "Yes. Season structure, legal game, methods and access can vary by county, zone and property." },
    ],
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
      { heading: "Start with the hunter, then the species", paragraphs: ["Texas license choices differ for residents, non-residents, youth and some special eligibility groups. Species can also trigger endorsements or federal requirements.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "License and hunter education are separate", paragraphs: ["TPWD treats license eligibility and hunter-education compliance as related but distinct requirements. Resolve both before the hunt."], links: [{ label: "Texas hunter education guide", href: "/hunting/hunter-education" }, HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Public-land access may require another permit", paragraphs: ["A hunting license does not automatically grant access to every public hunting area. APH areas, drawn hunts and individual properties can have additional requirements."], links: [{ label: "Texas public hunting guide", href: "/hunting/public-hunting" }, HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.publicLands] },
    ],
    related: [INTERNAL.resources, INTERNAL.publicLands, INTERNAL.counties, INTERNAL.hunting],
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
    related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.resources, INTERNAL.tripPlanner],
  }),
  "public-hunting": topic({
    slug: "public-hunting",
    eyebrow: "Texas public hunting",
    title: "Where Can You Hunt on Public Land in Texas?",
    description: "Find the main Texas public-hunting systems, including APH areas, drawn hunts, TPWD lands and official access tools.",
    quickAnswer: "Texas public hunting is a network rather than one open-land rule. Access can come through the Annual Public Hunting Permit, drawn hunts and area-specific permits or registrations.",
    about: ["Texas public hunting", "public hunting land Texas", "Texas WMAs"],
    sections: [
      { heading: "Start with TPWD's public-hunting system", paragraphs: ["TPWD manages public-hunting opportunities on department lands and cooperating properties. Legal game, dates, methods and access vary by unit."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.publicLands] },
      { heading: "Walk-in and drawn hunts solve different needs", paragraphs: ["APH is the broad walk-in framework for designated lands. Drawn hunts cover separate limited-entry opportunities, and some properties use other procedures."], links: [HUNTING_OFFICIAL_SOURCES.aph, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
      { heading: "Public does not mean unrestricted", paragraphs: ["Every hunt still depends on legal game, season, county or zone, methods, boundaries and property instructions."], links: [HUNTING_OFFICIAL_SOURCES.regulations, INTERNAL.tripPlanner] },
    ],
    related: [INTERNAL.publicLands, INTERNAL.wildlife, INTERNAL.camping, INTERNAL.fishing, INTERNAL.parks, INTERNAL.counties],
  }),
  "annual-public-hunting-permit": topic({
    slug: "annual-public-hunting-permit",
    eyebrow: "Public hunting permits",
    title: "Texas Annual Public Hunting Permit (APH) Guide",
    description: "Understand what the Annual Public Hunting Permit does, where it applies and what to verify before using a walk-in hunting area.",
    quickAnswer: "APH provides access to designated public-hunting lands and participating walk-in areas. It does not replace the hunting license, endorsements, hunter education or unit-specific rules.",
    about: ["Annual Public Hunting Permit", "APH permit Texas", "Texas walk-in hunting"],
    sections: [
      { heading: "Use the current APH map and area search", paragraphs: ["The participating properties and legal game are controlled by TPWD's current APH materials and area search."], links: [HUNTING_OFFICIAL_SOURCES.aph] },
      { heading: "APH does not replace hunting rules", paragraphs: ["Licenses, endorsements, hunter education, seasons, tagging, reporting and legal methods still apply."], links: [HUNTING_OFFICIAL_SOURCES.regulations, HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "Check property instructions", paragraphs: ["Registration, parking, boundaries, closures and other access instructions can be property-specific."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.tripPlanner] },
    ],
    related: [INTERNAL.publicLands, INTERNAL.camping, INTERNAL.wildlife, INTERNAL.counties],
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
    related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.parks, INTERNAL.tripPlanner],
  }),
  "hunting-seasons": topic({
    slug: "hunting-seasons", eyebrow: "Texas hunting seasons", title: "Texas Hunting Seasons: How to Check the Current Dates", description: "Use TPWD's current season tables without relying on stale dates copied into evergreen guides.", quickAnswer: "Texas hunting seasons vary by species, county or zone, method and sometimes property. Start with TPWD's current season-date tables, then open the species and county rules that apply to your hunt.", about: ["Texas hunting seasons", "2026–27 Texas hunting seasons", "TPWD season dates"],
    sections: [
      { heading: "Use season tables as the starting point", paragraphs: ["Season summaries help orient the calendar, but they are not the final check for every hunt."], links: [HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Then check species and geography", paragraphs: ["County, zone, method and special-property rules can narrow or alter the general season framework.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations, INTERNAL.counties] },
      { heading: "Treat public-hunt dates as property specific", paragraphs: ["APH and drawn-hunt opportunities may have their own legal-game windows and access instructions."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
    ], related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.counties, INTERNAL.tripPlanner],
  }),
  "bag-limits": topic({
    slug: "bag-limits", eyebrow: "Texas hunting regulations", title: "Texas Hunting Bag Limits Explained", description: "Understand daily, possession, season and county-specific limit concepts while keeping the current TPWD rule as the source of truth.", quickAnswer: "Bag limits are species- and location-specific and can involve daily, possession, season, sex or antler restrictions. Verify the exact current limit in TPWD's Outdoor Annual before hunting.", about: ["Texas bag limits", "Texas hunting limits", "TPWD bag limits"],
    sections: [
      { heading: "Do not assume one statewide number", paragraphs: ["Limits may vary by species, county, zone, sex, antler classification or hunt type."], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Tagging and reporting can be separate duties", paragraphs: ["A lawful harvest can also trigger tagging, proof-of-sex or reporting requirements depending on species and method.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Public-hunt permits do not override limits", paragraphs: ["APH and drawn hunts operate inside the applicable legal framework unless the hunt notice states a specific controlled-hunt condition."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
    ], related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.counties],
  }),
  "archery-hunting": topic({
    slug: "archery-hunting", eyebrow: "Texas archery hunting", title: "Texas Archery Hunting Guide", description: "Plan archery-only opportunities while checking species, county, equipment and public-land rules with TPWD.", quickAnswer: "Archery opportunities can have distinct season windows and equipment rules. Confirm the current species, county or zone and legal means-and-methods rules before hunting.", about: ["Texas archery hunting", "Texas bow season", "archery-only season Texas"],
    sections: [
      { heading: "Archery season is not one statewide rule", paragraphs: ["Species and geography still control the applicable season structure."], links: [HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Check legal equipment definitions", paragraphs: ["Legal archery equipment and any special restrictions belong to the current means-and-methods rules.", verifyRules], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
      { heading: "Public-land archery access varies", paragraphs: ["Some public lands offer archery opportunities through APH or drawn hunts; verify the property listing."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, INTERNAL.publicLands] },
    ], related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.camping, INTERNAL.counties],
  }),
  "youth-hunting": topic({
    slug: "youth-hunting", eyebrow: "Texas youth hunting", title: "Texas Youth Hunting Guide", description: "Connect youth hunting opportunities with hunter education, licenses, supervision and TPWD public-hunt programs.", quickAnswer: "Youth hunts can use special eligibility, supervision and application rules. Check the current TPWD hunt notice plus license and hunter-education requirements for the youth hunter and accompanying adult.", about: ["Texas youth hunting", "youth hunts Texas", "TPWD youth hunts"],
    sections: [
      { heading: "Start with age and education rules", paragraphs: ["Youth status does not eliminate hunter-education or supervision rules; the exact requirement depends on age and circumstances."], links: [HUNTING_OFFICIAL_SOURCES.hunterEducation, HUNTING_OFFICIAL_SOURCES.licenses] },
      { heading: "Look for youth-specific public hunts", paragraphs: ["TPWD public-hunting and drawn-hunt catalogs can include youth-only or youth-focused opportunities."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, HUNTING_OFFICIAL_SOURCES.drawnHunts] },
      { heading: "Read the adult-supervision instructions", paragraphs: ["Each opportunity can specify who must accompany the youth and what licenses or permits apply."], links: [HUNTING_OFFICIAL_SOURCES.regulations] },
    ], related: [INTERNAL.hunting, INTERNAL.publicLands, INTERNAL.tripPlanner, INTERNAL.resources],
  }),
  "texas-deer-hunting": speciesTopic({ slug: "texas-deer-hunting", title: "Texas White-Tailed Deer Hunting Guide", species: "white-tailed deer", description: "Plan a Texas deer hunt around county rules, antler restrictions, tagging, habitat and public access.", source: HUNTING_OFFICIAL_SOURCES.whiteTailedDeer, habitat: "White-tailed deer occur across much of Texas, but habitat, herd management and county regulations differ sharply among regions.", planning: "For public deer hunting, verify legal game, antler or sex restrictions, permit type and check-in requirements for the exact property." }),
  "mule-deer": speciesTopic({ slug: "mule-deer", title: "Texas Mule Deer Hunting Guide", species: "mule deer", description: "Plan mule-deer hunting in the parts of Texas where the species and current TPWD seasons apply.", source: HUNTING_OFFICIAL_SOURCES.muleDeer, habitat: "Texas mule-deer hunting is concentrated in western parts of the state, making region, county and habitat selection central to trip planning.", planning: "Public mule-deer opportunities are limited enough that drawn-hunt and property-specific planning should begin early." }),
  "dove-hunting": speciesTopic({ slug: "dove-hunting", title: "Texas Dove Hunting Guide", species: "dove", description: "Plan Texas dove hunting around zones, migratory-bird requirements, public fields and current TPWD rules.", habitat: "Dove hunting quality follows food, water, agricultural patterns and migration, so conditions can change quickly within the same zone.", planning: "Public dove fields can be popular and may use APH or site-specific access; review maps, parking and legal-game instructions before travel." }),
  "turkey-hunting": speciesTopic({ slug: "turkey-hunting", title: "Texas Turkey Hunting Guide", species: "wild turkey", description: "Connect turkey seasons and county rules to habitat, public access and current TPWD requirements.", source: HUNTING_OFFICIAL_SOURCES.turkey, habitat: "Turkey distribution and season structure differ across Texas, so county and species subspecies context matter before selecting a destination.", planning: "Public turkey opportunities can be limited-entry or property-specific; drawn hunts may be important in some areas." }),
  "quail-hunting": speciesTopic({ slug: "quail-hunting", title: "Texas Quail Hunting Guide", species: "quail", description: "Plan Texas quail hunting around habitat, weather-sensitive populations, public access and current regulations.", habitat: "Quail abundance can vary substantially with rainfall and habitat conditions, making recent TPWD population information useful alongside durable habitat guidance.", planning: "Public quail access depends on the legal-game listing for each area; do not assume suitable habitat is open to hunting." }),
  "waterfowl-hunting": speciesTopic({ slug: "waterfowl-hunting", title: "Texas Waterfowl Hunting Guide", species: "waterfowl", description: "Plan duck and goose hunting around zones, federal migratory-bird rules, wetlands and public access.", habitat: "Texas waterfowl hunting spans coastal marshes, reservoirs, river corridors, playa country and agricultural landscapes, with migration and water conditions changing through the season.", planning: "Waterfowl hunts can involve federal stamps, migratory-bird certifications and property-specific rules in addition to Texas licensing." }),
  "javelina-hunting": speciesTopic({ slug: "javelina-hunting", title: "Texas Javelina Hunting Guide", species: "javelina", description: "Plan javelina hunting around current county rules, South and West Texas habitat and public-hunt opportunities.", source: HUNTING_OFFICIAL_SOURCES.javelina, habitat: "Javelina are associated especially with brush-country and arid landscapes in South and West Texas, so regional habitat is a useful first filter.", planning: "Check the exact property and county rules because public opportunities and seasons can differ from private-land assumptions." }),
  "feral-hogs": speciesTopic({ slug: "feral-hogs", title: "Texas Feral Hog Hunting Guide", species: "feral hog", description: "Understand the difference between private-land feral-hog control and regulated public-land hunting access.", habitat: "Feral hogs occur across broad parts of Texas and use many habitat types, but landowner permission and property rules remain fundamental.", planning: "Do not carry private-land assumptions onto public property. WMAs, parks and other public lands can impose hunt-specific permits, legal-game listings and method restrictions." }),
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
