import { TEXAS_DEER_AUTHORITY_TOPIC } from "./authority-deer";
import { TURKEY_HUNTING_TOPIC } from "./turkey-guide";
export type HuntingAuthorityLink = { label: string; href: string; external?: boolean };
export type HuntingAuthoritySection = { heading: string; paragraphs: string[]; links?: HuntingAuthorityLink[] };
export type HuntingAuthorityFaq = { question: string; answer: string };

export type HuntingAuthorityTopic = {
  slug: string;
  reviewedOn?: string;
  reviewedLabel?: string;
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
  publicAreaSearch: { label: "TPWD public hunting area and legal game search", href: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml", external: true },
  currentChanges: { label: "TPWD: what's new for hunting this year", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/new-this-year-hunting", external: true },
  seasonChanges: { label: "TPWD: September 4, 2026 hunting regulation changes", href: "https://tpwd.texas.gov/newsmedia/releases/?req=20260904a", external: true },
  purchaseRequirements: { label: "TPWD license purchase and identity requirements", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/purchase-requirements", external: true },
  feralHogs: { label: "TPWD feral hog private-property license exception", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/", external: true },
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
    // Never construct thin, title-derived Q&A; FAQs must be authored for the topic.
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
  ruleHighlights?: string[];
  sourceNotes?: HuntingAuthorityLink[];
  currentAnswer?: string;
}): HuntingAuthorityTopic {
  const source = input.source ?? HUNTING_OFFICIAL_SOURCES.regulations;
  return topic({
    slug: input.slug,
    eyebrow: "Texas hunting species",
    title: input.title,
    description: input.description,
    quickAnswer: input.currentAnswer ?? `${input.species} hunting in Texas depends on the current season framework, location, legal means and methods, property access and any tagging or reporting requirements. Verify the exact hunt with TPWD before going afield.`,
    about: [`Texas ${input.species} hunting`, `${input.species} season Texas`, `TPWD ${input.species}`],
    sections: [
      { heading: "Start with the current TPWD rule", paragraphs: [`${input.species} rules can change by season year, county, zone or property. TexasDefined keeps the planning framework durable rather than copying a date or limit that can go stale.`, verifyRules], links: [source, HUNTING_OFFICIAL_SOURCES.seasonDates] },
      { heading: "Match habitat to geography", paragraphs: [input.habitat, "Use county, wildlife and public-land discovery to narrow the trip before checking the specific hunt unit or private-property permission."], links: [INTERNAL.publicLands, INTERNAL.wildlife, INTERNAL.counties] },
      { heading: "Plan access before travel", paragraphs: [input.planning, "For public hunting, confirm whether the opportunity uses APH access, a drawn hunt, another permit or site-specific registration."], links: [HUNTING_OFFICIAL_SOURCES.publicHunting, { label: "Texas public hunting guide", href: "/hunting/public-hunting" }, INTERNAL.tripPlanner] },
      ...(input.ruleHighlights?.length ? [{ heading: "Specific 2026–27 rule highlights", paragraphs: input.ruleHighlights, links: [source, ...(input.sourceNotes ?? [])] }] : []),
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
      { heading: "Choose the actual license before you pay", paragraphs: ["Compare TPWD resident, nonresident general, eligible five-day, youth and combination license products. Nonresident five-day products do not cover every species. Match your eligibility to the specific activity and confirm current prices with TPWD.", "Endorsements, federal stamps, hunter education or public-property permits may be separate requirements. Do not treat a license alone as permission to enter a hunt area."], links: [HUNTING_OFFICIAL_SOURCES.licenses, HUNTING_OFFICIAL_SOURCES.permits] },
      { heading: "2026 digital-license and identity requirements", paragraphs: ["Texas updated license-buyer identity verification beginning August 2026. Digital recreational licenses and endorsement stamps can be purchased online; applicable electronic tagging must be performed using the Texas Hunt & Fish app.", "Carry usable license proof and review TPWD's digital-tag procedures, including device access, before a remote hunt."], links: [HUNTING_OFFICIAL_SOURCES.purchaseRequirements, HUNTING_OFFICIAL_SOURCES.seasonChanges] },
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
      { heading: "Find open units in the official area finder", paragraphs: ["TPWD's Area/Legal Game Search shows the designated hunting units and legal game for the current program. A wildlife management area, campground or state park listing by itself does not establish legal access.", "Confirm the individual unit map, permitted game, dates, restrictions, check-in and any APH, e-postcard, regular permit or drawn-hunt requirement before travel."], links: [HUNTING_OFFICIAL_SOURCES.publicAreaSearch, HUNTING_OFFICIAL_SOURCES.aph] },
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
      { heading: "Use the current APH map and area search", paragraphs: ["Only selected properties and legal game are covered by the APH program. Use TPWD's current area-search listing and map booklet. Wildlife management and recreational use alone do not grant hunting permission."], links: [HUNTING_OFFICIAL_SOURCES.aph, HUNTING_OFFICIAL_SOURCES.publicAreaSearch] },
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
  "texas-deer-hunting": TEXAS_DEER_AUTHORITY_TOPIC,
  "mule-deer": speciesTopic({ slug: "mule-deer", title: "Texas Mule Deer Hunting Guide", species: "mule deer", description: "Plan mule-deer hunting in the parts of Texas where the species and current TPWD seasons apply.", source: HUNTING_OFFICIAL_SOURCES.muleDeer, habitat: "Texas mule-deer hunting is concentrated in western parts of the state, making region, county and habitat selection central to trip planning.", planning: "Public mule-deer opportunities are limited enough that drawn-hunt and property-specific planning should begin early.", currentAnswer: "TPWD lists different 2026–27 Panhandle and Trans-Pecos archery and general mule deer dates. County limits and some antler-spread restrictions apply, so check your exact county before hunting.", ruleHighlights: ["2026–27 Panhandle mule deer archery runs October 3–November 20, and general November 21–December 6; Trans-Pecos archery runs October 3–November 26, and general November 27–December 13. County-specific exceptions and antlerless permit rules still control.","TPWD lists a statewide annual maximum of two mule deer, no more than one buck, except MLDP properties; individual county limits can be stricter. Certain counties also have a 20-inch outside antler-spread restriction for legal bucks. Confirm current tags, CWD zone instructions and the exact county."] }),
  "dove-hunting": speciesTopic({ slug: "dove-hunting", title: "Texas Dove Hunting Guide", species: "dove", description: "Plan Texas dove hunting around zones, migratory-bird requirements, public fields and current TPWD rules.", habitat: "Dove hunting quality follows food, water, agricultural patterns and migration, so conditions can change quickly within the same zone.", planning: "Public dove fields can be popular and may use APH or site-specific access; review maps, parking and legal-game instructions before travel.", currentAnswer: "The 2026–27 North, Central and South dove zones have different first and second segments. Texas migratory game bird endorsement and HIP certification are part of the legal checklist.", ruleHighlights: ["TPWD lists North Zone September 1–November 8 and December 18–January 7; Central September 1–October 25 and December 11–January 14; South September 1–October 25 and December 18–January 21. The Southern zone special white-winged dove days were removed for 2026–27.","Dove hunters need Texas migratory game bird endorsement and HIP certification; distinguish legal species, bag limits and shooting hours. Public dove fields are accessible only under the particular lease, TPWD legal-game listing and permit rules."] }),
  "turkey-hunting": TURKEY_HUNTING_TOPIC,
  "quail-hunting": speciesTopic({ slug: "quail-hunting", title: "Texas Quail Hunting Guide", species: "quail", description: "Plan Texas quail hunting around habitat, weather-sensitive populations, public access and current regulations.", habitat: "Quail abundance can vary substantially with rainfall and habitat conditions, making recent TPWD population information useful alongside durable habitat guidance.", planning: "Public quail access depends on the legal-game listing for each area; do not assume suitable habitat is open to hunting.", currentAnswer: "TPWD lists November 1, 2026–February 28, 2027 for open quail species, with a 15-bird daily limit and 45 in possession. Mearns’ (Montezuma) quail are not open to hunting.", ruleHighlights: ["The 2026–27 statewide quail season for bobwhite, scaled/blue and Gambel’s quail runs November 1 through February 28. TPWD lists a daily limit of 15 quail in aggregate and 45 in possession.","Mearns’ (Montezuma) quail have no open season. A Texas upland game bird endorsement is required, and any hunt on TPWD property additionally requires a legal-game listing and unit-specific authorization."] }),
  "waterfowl-hunting": speciesTopic({ slug: "waterfowl-hunting", title: "Texas Waterfowl Hunting Guide", species: "waterfowl", description: "Plan duck and goose hunting around zones, federal migratory-bird rules, wetlands and public access.", habitat: "Texas waterfowl hunting spans coastal marshes, reservoirs, river corridors, playa country and agricultural landscapes, with migration and water conditions changing through the season.", planning: "Waterfowl hunts can involve federal stamps, migratory-bird certifications and property-specific rules in addition to Texas licensing.", currentAnswer: "Texas duck and goose hunting requires careful zone-specific 2026–27 dates, migratory endorsements, HIP and a federal duck stamp for applicable hunters; the public-land unit must separately authorize the hunt.", ruleHighlights: ["For regular duck seasons TPWD uses High Plains Mallard, North and South zones with split date windows; youth-only and veteran/active-duty opportunities follow separate dates. Special species-specific restrictions include dusky duck closures at the beginning of regular seasons.","For 2026–27 the published general duck aggregate limit is six, but species sublimits differ. Migratory game bird endorsement, HIP certification and federal duck stamp apply as TPWD specifies; check the current zone map, legal methods and public-unit legal-game box."] }),
  "javelina-hunting": speciesTopic({ slug: "javelina-hunting", title: "Texas Javelina Hunting Guide", species: "javelina", description: "Plan javelina hunting around current county rules, South and West Texas habitat and public-hunt opportunities.", source: HUNTING_OFFICIAL_SOURCES.javelina, habitat: "Javelina are associated especially with brush-country and arid landscapes in South and West Texas, so regional habitat is a useful first filter.", planning: "Check the exact property and county rules because public opportunities and seasons can differ from private-land assumptions.", currentAnswer: "TPWD lists a northern javelina season October 1, 2026–February 28, 2027 and a southern season September 1, 2026–August 31, 2027, in 99 open counties, with a maximum of two per license year.", ruleHighlights: ["The 2026–27 TPWD javelina regulation divides northern and southern zones. Northern hunting is October 1–February 28; southern hunting is September 1–August 31. A nearby county can have no open season, so use TPWD county search.","TPWD lists a limit of two javelina per license year. A javelina is not a feral hog; do not apply private-land feral hog exemptions or assumptions to javelina hunting."] }),
  "feral-hogs": topic({
    slug: "feral-hogs", eyebrow: "Texas hunting species", title: "Texas Feral Hog Hunting Guide",
    description: "Private-land feral hog hunting license rules, hunter education and the separate public-land requirements.",
    quickAnswer: "TPWD says no hunting license is required to hunt feral hogs on private property with landowner authorization. Hunter education requirements still apply. On public land, check the unit's legal-game listing, hunting license and permits.",
    about: ["Texas feral hog hunting", "feral hog private land hunting license", "TPWD hog hunting"],
    sections: [
      { heading: "Private property: permission and the license exception", paragraphs: ["TPWD expressly exempts feral hog hunting on private property from the hunting-license requirement when the landowner has authorized the hunt. Hunter education still applies. Verify consent, property boundaries and lawful means and methods before hunting.", "The private-property exemption is not proof that you may hunt a public unit or trespass onto another property."], links: [HUNTING_OFFICIAL_SOURCES.feralHogs, HUNTING_OFFICIAL_SOURCES.hunterEducation] },
      { heading: "Public access is separately regulated", paragraphs: ["Hogs being present in a Wildlife Management Area does not mean hog hunting is allowed there. TPWD's current public-hunt area record states the legal game, permits, dates, methods and individual unit restrictions."], links: [HUNTING_OFFICIAL_SOURCES.publicAreaSearch, HUNTING_OFFICIAL_SOURCES.publicHunting] },
      { heading: "Hog movement and disease controls", paragraphs: ["Transportation and release of live feral hogs is restricted unless handled in compliance with Texas Animal Health Commission regulations. Those rules are separate from hunting permissions.", "Hogs use brush, agricultural landscapes, forests and river bottoms, but habitat suitability is not evidence of hunting access."], links: [HUNTING_OFFICIAL_SOURCES.feralHogs, INTERNAL.wildlife] },
    ],
    related: [{ label: "Public hunting guide", href: "/hunting/public-hunting" }, { label: "APH permit guide", href: "/hunting/annual-public-hunting-permit" }, { label: "Hunter education", href: "/hunting/hunter-education" }, INTERNAL.counties],
    faq: [
      { question: "Do I need a license for feral hogs on private land?", answer: "TPWD says no hunting license is required with landowner authorization. Hunter education requirements still apply." },
      { question: "Can I hunt feral hogs on any public WMA?", answer: "No. Check whether the exact unit lists hogs as legal game and confirm permit, license, legal methods and dates." },
    ],
  }),
  "exotic-game": speciesTopic({ slug: "exotic-game", title: "Texas Exotic Game Hunting Guide", species: "exotic game", description: "Understand how exotic-species hunting differs across private ranches, public hunts and current Texas rules.", habitat: "Exotic species are distributed unevenly across Texas and are often associated with private ranches, while some public drawn-hunt opportunities may also exist.", planning: "Verify the exact species classification, license requirements, property permission and hunt notice instead of treating all exotic animals as one rules category.", currentAnswer: "Texas exotic animal hunting on private property generally lacks a closed season or state bag limit under TPWD’s 2026–27 framework, but a hunting license and landowner permission are still required.", ruleHighlights: ["TPWD defines exotics to include animals not indigenous to Texas such as axis deer, aoudad, nilgai and blackbuck. On private property, the 2026–27 nongame/exotic framework generally has no closed season or state bag or possession limit, but species-specific federal or other rules can apply.","A valid hunting license and landowner permission are mandatory for exotic hunting; possession and public-road restrictions also apply. A privately booked exotic ranch hunt does not confer any authority on a state-managed public hunting unit."] }),
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
