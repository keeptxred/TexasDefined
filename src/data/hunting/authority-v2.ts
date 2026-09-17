import type { HuntingAuthorityLink, HuntingAuthorityTopic } from "./authority";

const tpwd = (label: string, href: string): HuntingAuthorityLink => ({ label, href, external: true });
const internal = (label: string, href: string): HuntingAuthorityLink => ({ label, href });

const OFFICIAL = {
  regulations: tpwd("TPWD Outdoor Annual: hunting regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/"),
  seasonDates: tpwd("TPWD: 2026–27 hunting season dates", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates"),
  youthOnly: tpwd("TPWD: 2026–27 youth-only seasons", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/season-types/youth-only"),
  migratoryBirds: tpwd("TPWD: migratory game bird regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/migratory-game-bird-regulations"),
  squirrel: tpwd("TPWD: squirrel regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/squirrel"),
  rabbits: tpwd("TPWD: rabbits and hares regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/rabbits-and-hares"),
  pheasant: tpwd("TPWD: pheasant regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/pheasant"),
  chachalaca: tpwd("TPWD: chachalaca regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/chachalaca"),
  pronghorn: tpwd("TPWD: pronghorn regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/pronghorn"),
  alligator: tpwd("TPWD: alligator regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/alligator/"),
  goose: tpwd("TPWD: goose regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/goose"),
  teal: tpwd("TPWD: teal regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/blue-winged-green-winged-and-cinnamon-teal"),
  sandhillCrane: tpwd("TPWD: sandhill crane regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/sandhill-crane"),
  rails: tpwd("TPWD: rails, gallinules and moorhens", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/king-and-clapper-rails"),
  woodcock: tpwd("TPWD: woodcock regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/woodcock/"),
  furbearers: tpwd("TPWD: fur-bearing animal regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/fur-bearing-animal-regulations"),
  furbearerLicenses: tpwd("TPWD: fur-bearing animal license requirements", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/fur-bearing-animal-regulations/license-requirements"),
  meansMethods: tpwd("TPWD: hunting means and methods", "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/means-and-methods"),
} as const;

const HUNTING = internal("Texas hunting hub", "/hunting");
const PUBLIC = internal("Texas public hunting guide", "/hunting/public-hunting");
const APH = internal("Annual Public Hunting Permit guide", "/hunting/annual-public-hunting-permit");
const DRAWN = internal("Texas drawn hunts guide", "/hunting/drawn-hunts");
const LICENSE = internal("Texas hunting license guide", "/hunting/texas-hunting-license");
const EDUCATION = internal("Texas hunter education guide", "/hunting/hunter-education");
const SEASONS = internal("Texas hunting seasons guide", "/hunting/hunting-seasons");
const OUTDOORS = internal("Texas outdoors and public lands", "/explore/outdoors");
const COUNTIES = internal("Browse Texas counties", "/browse/counties");

const legalReminder = "TexasDefined is a planning publication, not the legal authority. Confirm the current species, county or zone, property, license, endorsement, permit, legal means and methods, limits, tagging and reporting requirements with TPWD before hunting.";

function topic(input: HuntingAuthorityTopic): HuntingAuthorityTopic {
  return input;
}

function speciesTopic(input: {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  quickAnswer: string;
  about: string[];
  source: HuntingAuthorityLink;
  geography: string;
  access: string;
  related?: HuntingAuthorityLink[];
  extraSources?: HuntingAuthorityLink[];
}): HuntingAuthorityTopic {
  return topic({
    slug: input.slug,
    eyebrow: input.eyebrow,
    title: input.title,
    description: input.description,
    quickAnswer: input.quickAnswer,
    about: input.about,
    sections: [
      { heading: "Start with the current TPWD rule", paragraphs: [input.geography, legalReminder], links: [input.source, OFFICIAL.seasonDates, ...(input.extraSources ?? [])] },
      { heading: "Access is a separate legal check", paragraphs: [input.access], links: [PUBLIC, APH, OUTDOORS] },
      { heading: "Confirm the exact county and property", paragraphs: ["Season structure and legal game can vary by county, zone and property. Use the county and property-specific TPWD information before travel."], links: [COUNTIES, OFFICIAL.regulations] },
    ],
    related: input.related ?? [HUNTING, SEASONS, PUBLIC, OUTDOORS, COUNTIES],
    faq: [
      { question: `Where should I verify current ${input.title.toLowerCase()} rules?`, answer: "Use the current TPWD species page, county rules and the individual public-property or hunt notice when applicable." },
      { question: "Can public-land rules differ from private-land rules?", answer: "Yes. Public properties can add legal-game, permit, method, date, boundary, check-in and other access restrictions." },
      { question: "Can TexasDefined replace the official regulations?", answer: "No. TexasDefined is an independent planning publication; TPWD and applicable federal rules remain the legal sources." },
    ],
  });
}

export const HUNTING_AUTHORITY_TOPICS_V2: Record<string, HuntingAuthorityTopic> = {
  "youth-hunting": topic({
    slug: "youth-hunting",
    eyebrow: "Texas youth hunting",
    title: "Texas Youth Hunting Guide: 2026–27 Youth-Only Seasons & Requirements",
    description: "Plan youth hunting in Texas with current TPWD youth-only season structure, licensing, hunter education, adult-accompaniment and public-hunt guidance.",
    quickAnswer: "TPWD lists 2026–27 youth-only opportunities for duck, squirrel, wild turkey and white-tailed deer, but eligibility, adult accompaniment and county-specific rules differ by hunt. Verify the exact youth season plus license and hunter-education requirements before going afield.",
    about: ["Texas youth hunting", "Texas youth-only seasons", "TPWD youth hunts", "youth deer hunting Texas", "youth duck hunting Texas"],
    sections: [
      { heading: "Use the current youth-only season page", paragraphs: ["Youth-only seasons are not one universal statewide calendar. TPWD publishes species-specific and county-specific opportunities, including separate waterfowl zones and East Texas squirrel coverage.", legalReminder], links: [OFFICIAL.youthOnly, OFFICIAL.seasonDates] },
      { heading: "Resolve license, education and accompaniment first", paragraphs: ["Youth licensing and youth-only season eligibility are related but not identical. Hunter-education and accompaniment requirements can depend on age and circumstances."], links: [LICENSE, EDUCATION, OFFICIAL.regulations] },
      { heading: "Public youth hunts can add another layer", paragraphs: ["A youth season does not automatically open every public property. APH areas, drawn hunts and individual properties can have their own legal-game listings, applications, permits, check-in procedures and supervision instructions."], links: [PUBLIC, APH, DRAWN] },
    ],
    related: [HUNTING, PUBLIC, DRAWN, OUTDOORS, COUNTIES],
    faq: [
      { question: "Which species have youth-only seasons in Texas for 2026–27?", answer: "TPWD lists youth-only opportunities for duck, squirrel, wild turkey and white-tailed deer. Dates, zones and eligible counties differ by species." },
      { question: "Does a youth hunting license automatically make every youth-only hunt legal?", answer: "No. Season eligibility, hunter education, accompaniment, endorsements, permits and property-specific rules can still apply." },
      { question: "Where should I verify a youth hunt?", answer: "Use TPWD's current youth-only season page plus the county, species and property-specific rules for the exact hunt." },
    ],
  }),

  "squirrel-hunting": speciesTopic({
    slug: "squirrel-hunting",
    eyebrow: "Texas small game",
    title: "Texas Squirrel Hunting Guide",
    description: "Plan Texas squirrel hunting around East Texas season structure, other open counties, youth opportunities, habitat and public-land access.",
    quickAnswer: "Texas squirrel seasons differ between East Texas and other open counties, and East Texas also has a youth-only opportunity in 2026–27. Check the county and property before hunting rather than assuming one statewide season.",
    about: ["Texas squirrel hunting", "squirrel season Texas", "East Texas squirrel hunting", "public squirrel hunting Texas"],
    source: OFFICIAL.squirrel,
    geography: "TPWD's 2026–27 framework distinguishes East Texas from other open counties and separately lists an East Texas youth-only opportunity.",
    access: "Suitable hardwood habitat does not mean a WMA or other public tract is open to squirrel hunting on the day you plan to visit. Confirm legal game, dates, boundaries and access instructions.",
    extraSources: [OFFICIAL.youthOnly],
  }),

  "rabbit-hare-hunting": speciesTopic({
    slug: "rabbit-hare-hunting",
    eyebrow: "Texas small game",
    title: "Texas Rabbit & Hare Hunting Guide",
    description: "Understand Texas rabbit and hare hunting rules, private-property permissions, legal methods and the difference between private and public-land access.",
    quickAnswer: "TPWD's 2026–27 rabbit and hare page states there is no closed season, bag limit or possession limit on private property, but public-land rules are separate and property-specific.",
    about: ["Texas rabbit hunting", "Texas hare hunting", "rabbit season Texas", "small game Texas"],
    source: OFFICIAL.rabbits,
    geography: "The current statewide rabbit-and-hare rule is broad on private property, but that private-property framework should not be carried over to WMAs, parks or other public lands.",
    access: "For a public-land rabbit hunt, start with TPWD's public-hunting system and the individual property's legal-game listing rather than assuming the private-property rule applies.",
    extraSources: [OFFICIAL.meansMethods],
  }),

  "pheasant-hunting": speciesTopic({
    slug: "pheasant-hunting",
    eyebrow: "Texas upland game birds",
    title: "Texas Pheasant Hunting Guide",
    description: "Plan Texas pheasant hunting around the current Panhandle season, county rules, upland-game-bird endorsement, habitat and access.",
    quickAnswer: "TPWD's 2026–27 pheasant framework is a defined Panhandle season rather than a statewide open season. Verify the exact county, current dates, endorsement, limits and access before hunting.",
    about: ["Texas pheasant hunting", "pheasant season Texas", "Panhandle pheasant hunting"],
    source: OFFICIAL.pheasant,
    geography: "TPWD's current pheasant page identifies the Panhandle season and county-specific coverage, making county selection part of the legal check.",
    access: "Agricultural habitat can be productive but is often private. Confirm landowner permission or a verified public-hunt opportunity before travel.",
  }),

  "chachalaca-hunting": speciesTopic({
    slug: "chachalaca-hunting",
    eyebrow: "Texas upland game birds",
    title: "Texas Chachalaca Hunting Guide",
    description: "Plan chachalaca hunting in the limited South Texas counties where TPWD provides a season and confirm endorsement, habitat and access.",
    quickAnswer: "Texas chachalaca hunting is geographically narrow: TPWD's 2026–27 rule covers four counties. Verify the exact county, endorsement, current limits and property rules before hunting.",
    about: ["Texas chachalaca hunting", "chachalaca season Texas", "South Texas chachalaca"],
    source: OFFICIAL.chachalaca,
    geography: "TPWD's current chachalaca page shows an open season in four Texas counties, so broad statewide hunting assumptions do not apply.",
    access: "Brush and riparian habitat can overlap chachalaca range, but legal hunting access still depends on the property and current rules.",
  }),

  "pronghorn-hunting": topic({
    slug: "pronghorn-hunting",
    eyebrow: "Texas game animals",
    title: "Texas Pronghorn Hunting Guide",
    description: "Plan Texas pronghorn hunting around the limited-county season, permit-only harvest framework and verified property access.",
    quickAnswer: "Texas pronghorn harvest is permit-only. TPWD says permits are issued to landowners or their agents in areas with huntable populations, and hunters are responsible for verifying the permit applies to the property they are hunting.",
    about: ["Texas pronghorn hunting", "pronghorn season Texas", "Texas pronghorn permit", "antelope hunting Texas"],
    sections: [
      { heading: "Pronghorn harvest is permit-only", paragraphs: ["TPWD's 2026–27 rule lists a limited-county season and requires a permit for harvest. The hunter should verify that the permit was issued to the property being hunted.", legalReminder], links: [OFFICIAL.pronghorn, OFFICIAL.seasonDates] },
      { heading: "Property permission and permit validity are separate checks", paragraphs: ["An open county does not create general access. Confirm landowner permission and that the TPWD permit is valid for that property before making travel plans."], links: [OFFICIAL.pronghorn, COUNTIES] },
      { heading: "Review after-harvest requirements before the hunt", paragraphs: ["Pronghorn harvest has species-specific tagging, proof-of-sex and transport rules. Review the current TPWD instructions in advance."], links: [OFFICIAL.pronghorn, OFFICIAL.regulations] },
    ],
    related: [HUNTING, SEASONS, COUNTIES],
    faq: [
      { question: "Can I hunt pronghorn in Texas without a permit?", answer: "No. TPWD states that pronghorn harvest is by permit only." },
      { question: "Does an open county mean any property is huntable?", answer: "No. Hunters need lawful property access and must verify the permit was issued to that property." },
      { question: "Where should I verify pronghorn rules?", answer: "Use TPWD's current pronghorn page and the county-specific rule for the property." },
    ],
  }),

  "alligator-hunting": topic({
    slug: "alligator-hunting",
    eyebrow: "Texas game animals",
    title: "Texas Alligator Hunting Guide",
    description: "Understand Texas alligator core and non-core season structures, private-property requirements, CITES tags and current TPWD harvest rules.",
    quickAnswer: "Texas alligator rules differ between core and non-core counties, and TPWD's current rule says alligators may only be taken on private property. CITES tagging and other harvest requirements also apply, so verify the exact county and property before hunting.",
    about: ["Texas alligator hunting", "alligator season Texas", "Texas alligator tags", "Texas alligator private property"],
    sections: [
      { heading: "Start with core versus non-core county rules", paragraphs: ["TPWD uses different 2026–27 season windows for core and non-core counties and special properties. County classification affects the legal framework."], links: [OFFICIAL.alligator, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Alligator take is tied to private property", paragraphs: ["TPWD's current means-and-methods section says alligators may only be taken on private property. Do not use TexasDefined's public-hunting discovery as an alligator-access shortcut."], links: [OFFICIAL.alligator] },
      { heading: "CITES tags and harvest procedures matter", paragraphs: ["CITES tags are required in both core and non-core counties, with different issuance and documentation procedures. Review the current TPWD instructions before the hunt."], links: [OFFICIAL.alligator, OFFICIAL.regulations] },
    ],
    related: [HUNTING, SEASONS, COUNTIES],
    faq: [
      { question: "Can alligators be taken on ordinary public hunting land in Texas?", answer: "TPWD's current alligator rule says alligators may only be taken on private property. Verify any property-specific authorization directly with TPWD." },
      { question: "Is alligator season the same in every Texas county?", answer: "No. Core and non-core counties use different season structures." },
      { question: "Are CITES tags required?", answer: "Yes. TPWD states that CITES tags are required in both core and non-core counties, with different issuance procedures." },
    ],
  }),

  "migratory-game-birds": topic({
    slug: "migratory-game-birds",
    eyebrow: "Texas migratory game birds",
    title: "Texas Migratory Game Bird Hunting Guide",
    description: "Understand the shared Texas and federal planning layer for dove, waterfowl, teal, geese, sandhill crane, rails, gallinules, snipe and woodcock.",
    quickAnswer: "Migratory game bird hunting adds requirements beyond a general hunting license. Depending on species and hunter age, the Texas Migratory Game Bird Endorsement, HIP certification, a federal duck stamp or a species-specific federal permit can apply, plus current season, zone and method rules.",
    about: ["Texas migratory game birds", "Texas migratory bird endorsement", "HIP certification Texas", "Texas waterfowl regulations", "Texas dove regulations"],
    sections: [
      { heading: "Treat migratory birds as a separate regulatory layer", paragraphs: ["Migratory game bird rules combine Texas season structures with federal requirements. Endorsements, HIP certification, stamps or permits vary by species."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Species and zone still control the season", paragraphs: ["Dove, duck, goose, teal, crane, rail, gallinule, snipe and woodcock do not share one statewide calendar. Use the current TPWD species page and zone or county rule."], links: [OFFICIAL.seasonDates, internal("Texas dove hunting guide", "/hunting/dove-hunting"), internal("Texas waterfowl hunting guide", "/hunting/waterfowl-hunting")] },
      { heading: "Methods can be more restrictive", paragraphs: ["Migratory game bird rules can differ from general hunting rules on methods and federal requirements. Verify the current special regulations rather than carrying over a rule from non-migratory game."], links: [OFFICIAL.migratoryBirds, OFFICIAL.meansMethods] },
    ],
    related: [HUNTING, SEASONS, PUBLIC, APH, OUTDOORS],
    faq: [
      { question: "Do all migratory game birds use the same Texas season?", answer: "No. Seasons and zones differ by species." },
      { question: "Is a Texas hunting license the only requirement?", answer: "Not always. Migratory-bird endorsement, HIP certification, a federal duck stamp or another permit can apply depending on species and hunter age." },
      { question: "Where should I verify migratory-bird methods?", answer: "Use TPWD's current migratory game bird regulations and the species-specific page." },
    ],
  }),

  "goose-hunting": speciesTopic({
    slug: "goose-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Goose Hunting Guide",
    description: "Plan Texas goose hunting around East and West zones, light and dark goose seasons, migratory-bird requirements and legal access.",
    quickAnswer: "Texas goose seasons vary by zone and goose group. TPWD currently lists a Migratory Game Bird Endorsement, HIP certification and a federal duck stamp as requirements, so verify the current East or West framework before hunting.",
    about: ["Texas goose hunting", "goose season Texas", "light goose Texas", "dark goose Texas"],
    source: OFFICIAL.goose,
    geography: "TPWD separates East and West goose zones and distinguishes light and dark geese, with an early Canada goose opportunity in the Eastern Zone.",
    access: "Public fields, wetlands and APH areas can add access dates, check-in, legal-game and method restrictions even when the statewide zone is open.",
    extraSources: [OFFICIAL.migratoryBirds],
  }),

  "teal-hunting": speciesTopic({
    slug: "teal-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Teal Hunting Guide",
    description: "Plan the September teal-only season with current TPWD dates, migratory-bird credentials, water conditions and legal access.",
    quickAnswer: "Texas has a statewide September teal-only season for 2026–27. TPWD currently lists the Migratory Game Bird Endorsement, HIP certification and a federal duck stamp as requirements, and the property must also be open to teal hunting.",
    about: ["Texas teal hunting", "September teal season Texas", "teal season Texas", "public teal hunting Texas"],
    source: OFFICIAL.teal,
    geography: "The September teal-only opportunity has its own statewide dates and should be checked separately from regular duck seasons.",
    access: "Wetland habitat alone does not establish legal access. Confirm the property's legal-game list, permit, shooting hours, methods and check-in rules.",
    extraSources: [OFFICIAL.migratoryBirds],
  }),

  "sandhill-crane-hunting": speciesTopic({
    slug: "sandhill-crane-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Sandhill Crane Hunting Guide",
    description: "Plan sandhill crane hunting around Zones A, B and C, closed areas, migratory-bird credentials, the federal crane permit and legal access.",
    quickAnswer: "Texas sandhill crane hunting uses Zones A, B and C plus closed areas. TPWD currently lists a Migratory Game Bird Endorsement, HIP certification and a federal Sandhill Crane Permit as requirements, so verify the exact zone and county before hunting.",
    about: ["Texas sandhill crane hunting", "sandhill crane season Texas", "Texas crane permit", "sandhill crane zones Texas"],
    source: OFFICIAL.sandhillCrane,
    geography: "The current TPWD rule maps Zones A, B and C and a closed area; the county and exact location determine whether a crane season is open.",
    access: "Even inside an open crane zone, a public property must list sandhill crane as legal game and may add permit or method restrictions.",
    extraSources: [OFFICIAL.migratoryBirds],
  }),

  "other-migratory-game-birds": topic({
    slug: "other-migratory-game-birds",
    eyebrow: "Texas migratory game birds",
    title: "Texas Rails, Gallinules, Snipe & Woodcock Hunting Guide",
    description: "Cover the Texas migratory-bird opportunities often missed by general hunting guides: rails, gallinules, moorhens, snipe and woodcock.",
    quickAnswer: "Rails, gallinules, moorhens, snipe and woodcock use their own 2026–27 seasons and limits while sharing migratory-game-bird credential and method rules. Verify the individual species rule before hunting.",
    about: ["Texas rail hunting", "Texas gallinule hunting", "Texas snipe hunting", "Texas woodcock hunting", "Texas migratory game birds"],
    sections: [
      { heading: "Do not hide these species inside a generic waterfowl page", paragraphs: ["TPWD publishes distinct season information for rails, gallinules and moorhens, snipe and woodcock. Their calendars are not interchangeable with duck or dove seasons."], links: [OFFICIAL.rails, OFFICIAL.woodcock, OFFICIAL.seasonDates] },
      { heading: "Migratory-bird requirements still apply", paragraphs: ["These species sit inside the migratory game bird framework, including endorsement and HIP requirements. Verify current methods and any species-specific rules."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Confirm habitat and legal access separately", paragraphs: ["Marsh, wetland or bottomland habitat can identify where to look, but legal access and legal game remain property-specific."], links: [PUBLIC, APH, OUTDOORS] },
    ],
    related: [internal("Migratory game bird guide", "/hunting/migratory-game-birds"), HUNTING, PUBLIC, OUTDOORS],
    faq: [
      { question: "Are rails and woodcock covered by Texas migratory-game-bird rules?", answer: "Yes. TPWD includes them in the migratory game bird framework and publishes species-specific seasons and limits." },
      { question: "Do they use the duck season dates?", answer: "No. Use the individual TPWD season information for the species you intend to hunt." },
      { question: "Can I hunt them on any public wetland?", answer: "No. Confirm the property's legal-game list, dates, permit requirements and methods." },
    ],
  }),

  "trapping-furbearers": topic({
    slug: "trapping-furbearers",
    eyebrow: "Texas fur-bearing animals",
    title: "Texas Trapping & Fur-Bearer Guide",
    description: "Understand the difference between recreational take, commercial trapping, fur-bearer licenses, lawful methods and property-specific access in Texas.",
    quickAnswer: "Texas treats recreational take of fur-bearing animals differently from commercial harvest for sale. TPWD says a hunting license can cover recreational take when the animal or pelt is not sold, while a trapper's license is required for commercial harvest for sale; method, season and property rules still apply.",
    about: ["Texas trapping regulations", "Texas fur bearer hunting", "Texas trapper license", "furbearer season Texas", "raccoon trapping Texas"],
    sections: [
      { heading: "Separate recreational take from commercial trapping", paragraphs: ["The licensing framework changes when fur-bearing animals or pelts are taken for sale. Do not use a recreational hunting summary to plan commercial trapping."], links: [OFFICIAL.furbearers, OFFICIAL.furbearerLicenses, LICENSE] },
      { heading: "Know what Texas classifies as a fur-bearing animal", paragraphs: ["TPWD's fur-bearing rules include badger, beaver, fox, mink, muskrat, nutria, opossum, raccoon, otter, skunk and ring-tailed cat, with additional species-specific requirements in some cases."], links: [OFFICIAL.furbearers] },
      { heading: "Methods and property rules remain separate checks", paragraphs: ["Legal means, commercial or recreational season structure, public-land restrictions and landowner permission can all change the answer for a particular take."], links: [OFFICIAL.meansMethods, PUBLIC, OUTDOORS] },
    ],
    related: [HUNTING, LICENSE, EDUCATION, PUBLIC, OUTDOORS],
    faq: [
      { question: "Do I need a Texas trapper's license for every fur-bearer take?", answer: "Not necessarily. TPWD distinguishes recreational take from commercial harvest for sale. Use the current license requirements for your purpose and method." },
      { question: "Which animals are fur-bearers in Texas?", answer: "TPWD's fur-bearing framework includes badger, beaver, fox, mink, muskrat, nutria, opossum, raccoon, otter, skunk and ring-tailed cat." },
      { question: "Can I apply private-property trapping rules to a WMA?", answer: "No. Public properties can impose separate legal-game, method, permit, season and access restrictions." },
    ],
  }),
};

export const HUNTING_V2_HUB_GROUPS = [
  {
    title: "More Texas game & small-game coverage",
    description: "Fill the species gaps that do not fit neatly inside deer, turkey, quail or waterfowl planning.",
    slugs: ["squirrel-hunting", "rabbit-hare-hunting", "pheasant-hunting", "chachalaca-hunting", "pronghorn-hunting", "alligator-hunting"],
  },
  {
    title: "Migratory game bird depth",
    description: "Separate the shared migratory-bird requirements from the species and zone rules that actually control a hunt.",
    slugs: ["migratory-game-birds", "goose-hunting", "teal-hunting", "sandhill-crane-hunting", "other-migratory-game-birds"],
  },
  {
    title: "Fur-bearing animals & trapping",
    description: "Keep recreational hunting, commercial trapping, fur-bearer licensing and property rules distinct.",
    slugs: ["trapping-furbearers"],
  },
] as const;

export function getHuntingAuthorityTopicV2(slug: string) {
  return HUNTING_AUTHORITY_TOPICS_V2[slug] ?? null;
}
