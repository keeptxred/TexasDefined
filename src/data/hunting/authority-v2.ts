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
  alligator: tpwd("TPWD: alligator regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/alligator"),
  goose: tpwd("TPWD: goose regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/goose"),
  teal: tpwd("TPWD: teal regulations", "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/teal"),
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

export const HUNTING_AUTHORITY_TOPICS_V2: Record<string, HuntingAuthorityTopic> = {
  "youth-hunting": topic({
    slug: "youth-hunting",
    eyebrow: "Texas youth hunting",
    title: "Texas Youth Hunting Guide: 2026–27 Youth-Only Seasons & Requirements",
    description: "Plan youth hunting in Texas with current TPWD youth-only season structure, licensing, hunter education, adult-accompaniment and public-hunt guidance.",
    quickAnswer: "TPWD has youth-only opportunities for duck, squirrel, wild turkey and white-tailed deer in 2026–27, but eligibility, adult accompaniment and county-specific rules differ by hunt. Verify the exact youth season and the youth hunter's license and education requirements before going afield.",
    about: ["Texas youth hunting", "Texas youth-only seasons", "TPWD youth hunts", "youth deer hunting Texas", "youth duck hunting Texas"],
    sections: [
      { heading: "Use the current youth-only season page", paragraphs: ["Youth-only seasons are not one universal statewide calendar. TPWD publishes species-specific and county-specific youth opportunities, including separate waterfowl zones and East Texas squirrel coverage.", legalReminder], links: [OFFICIAL.youthOnly, OFFICIAL.seasonDates] },
      { heading: "Resolve license, education and accompaniment first", paragraphs: ["Youth licensing and youth-only season eligibility are related but not identical. Hunter-education and accompaniment requirements can depend on age and circumstances, and waterfowl youth seasons include adult-accompaniment rules."], links: [LICENSE, EDUCATION, OFFICIAL.regulations] },
      { heading: "Public youth hunts can add another layer", paragraphs: ["A youth season does not automatically open every public property. APH areas, drawn hunts and individual properties can have their own legal-game listings, applications, permits, check-in procedures and adult-supervision instructions."], links: [PUBLIC, APH, DRAWN] },
    ],
    related: [HUNTING, PUBLIC, DRAWN, OUTDOORS, COUNTIES],
    faq: [
      { question: "Which species have youth-only seasons in Texas for 2026–27?", answer: "TPWD lists youth-only opportunities for duck, squirrel, wild turkey and white-tailed deer. The dates, zones and eligible counties differ by species." },
      { question: "Does a youth hunting license automatically make every youth-only hunt legal?", answer: "No. Season eligibility, hunter education, accompaniment, endorsements, permits and property-specific rules can still apply." },
      { question: "Where should I verify a youth hunt?", answer: "Use TPWD's current youth-only season page plus the county, species and property-specific rules for the exact hunt." },
    ],
  }),

  "squirrel-hunting": topic({
    slug: "squirrel-hunting",
    eyebrow: "Texas small game",
    title: "Texas Squirrel Hunting Guide",
    description: "Plan Texas squirrel hunting around East Texas season structure, other open counties, youth opportunities, habitat and public-land access.",
    quickAnswer: "Texas squirrel seasons differ between East Texas and other open counties, and East Texas also has a youth-only opportunity in 2026–27. Check the county and property before hunting rather than assuming one statewide season.",
    about: ["Texas squirrel hunting", "squirrel season Texas", "East Texas squirrel hunting", "public squirrel hunting Texas"],
    sections: [
      { heading: "Start with county and season structure", paragraphs: ["TPWD's 2026–27 season table distinguishes East Texas from other open counties, so the county is part of the legal check."], links: [OFFICIAL.squirrel, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Treat public access as property specific", paragraphs: ["Suitable hardwood habitat does not mean a WMA or other public tract is open to squirrel hunting on the day you plan to visit. Confirm legal game, dates, boundaries and access instructions."], links: [PUBLIC, APH, OUTDOORS] },
      { heading: "Youth squirrel hunting has its own window", paragraphs: ["TPWD lists an East Texas youth-only squirrel opportunity for the 2026–27 season. Check youth eligibility, hunter education and the exact county rule."], links: [internal("Texas youth hunting guide", "/hunting/youth-hunting"), OFFICIAL.youthOnly] },
    ],
    related: [HUNTING, SEASONS, PUBLIC, OUTDOORS, COUNTIES],
    faq: [
      { question: "Is squirrel season the same everywhere in Texas?", answer: "No. TPWD separates East Texas from other open counties, and county-specific rules control." },
      { question: "Can I hunt squirrels on a Texas WMA?", answer: "Only when that property lists squirrel as legal game for the applicable hunt and you meet its access and permit requirements." },
      { question: "Is there a youth squirrel season?", answer: "TPWD lists a youth-only East Texas squirrel opportunity for 2026–27; verify the current dates and county rules." },
    ],
  }),

  "rabbit-hare-hunting": topic({
    slug: "rabbit-hare-hunting",
    eyebrow: "Texas small game",
    title: "Texas Rabbit & Hare Hunting Guide",
    description: "Understand Texas rabbit and hare hunting rules, private-property permissions, legal methods and the difference between private and public-land access.",
    quickAnswer: "TPWD's 2026–27 rabbit and hare page states there is no closed season, bag limit or possession limit and allows lawful means on private property, but public-land rules are separate and property-specific.",
    about: ["Texas rabbit hunting", "Texas hare hunting", "rabbit season Texas", "small game Texas"],
    sections: [
      { heading: "Private-property rules are not public-land rules", paragraphs: ["The statewide rabbit-and-hare rule is unusually broad on private property, but it should not be carried over to WMAs, parks or other public lands. Public properties can restrict legal game, dates, methods and access."], links: [OFFICIAL.rabbits, PUBLIC, OUTDOORS] },
      { heading: "Confirm lawful means and landowner permission", paragraphs: ["Private-property hunting still depends on permission and lawful means and methods. Local restrictions and safety rules can also matter."], links: [OFFICIAL.meansMethods, OFFICIAL.regulations] },
      { heading: "Use public-hunt listings for public opportunities", paragraphs: ["For a public-land rabbit hunt, start with TPWD's public-hunting system and the individual property's legal-game listing rather than assuming statewide private-land rules apply."], links: [PUBLIC, APH] },
    ],
    related: [HUNTING, PUBLIC, OUTDOORS, COUNTIES],
    faq: [
      { question: "Does Texas have a closed rabbit season?", answer: "TPWD's 2026–27 rabbit-and-hare page says there is no closed season, bag limit or possession limit on private property; public properties can have different rules." },
      { question: "Can I assume a WMA is open for rabbit hunting?", answer: "No. Check the WMA's current legal-game, dates, permit and method rules." },
      { question: "Do I still need permission on private property?", answer: "Yes. Broad statewide season language does not replace landowner permission or other applicable law." },
    ],
  }),

  "pheasant-hunting": topic({
    slug: "pheasant-hunting",
    eyebrow: "Texas upland game birds",
    title: "Texas Pheasant Hunting Guide",
    description: "Plan Texas pheasant hunting around the current Panhandle and South Plains season, county rules, habitat and access.",
    quickAnswer: "Texas pheasant hunting is concentrated in the Panhandle and South Plains and uses a defined 2026–27 season rather than a statewide open season. Verify the county, current dates, limits and access before hunting.",
    about: ["Texas pheasant hunting", "pheasant season Texas", "Panhandle pheasant hunting", "South Plains pheasant"],
    sections: [
      { heading: "Geography matters first", paragraphs: ["Pheasant opportunity is tied to the Panhandle and South Plains framework, making county selection part of the regulation check."], links: [OFFICIAL.pheasant, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Habitat does not guarantee access", paragraphs: ["Agricultural habitat can be productive but is often private. Confirm permission or a verified public-hunt opportunity before travel."], links: [PUBLIC, OUTDOORS] },
      { heading: "Verify endorsements, limits and methods", paragraphs: [legalReminder], links: [OFFICIAL.regulations, LICENSE] },
    ],
    related: [HUNTING, SEASONS, PUBLIC, COUNTIES],
    faq: [
      { question: "Where is Texas pheasant hunting concentrated?", answer: "TPWD's current season framework centers on the Panhandle and South Plains; confirm the exact county." },
      { question: "Is pheasant season statewide?", answer: "No. Use the current TPWD pheasant and county rules." },
      { question: "How do I find public pheasant access?", answer: "Use TPWD public-hunting and APH tools, then verify the individual property's legal-game listing." },
    ],
  }),

  "chachalaca-hunting": topic({
    slug: "chachalaca-hunting",
    eyebrow: "Texas upland game birds",
    title: "Texas Chachalaca Hunting Guide",
    description: "Plan chachalaca hunting in the limited South Texas counties where TPWD provides a season and confirm habitat and public access.",
    quickAnswer: "Texas chachalaca hunting is geographically narrow: TPWD's 2026–27 season table identifies Cameron, Hidalgo, Starr and Willacy counties. Verify current county, limit and property rules before hunting.",
    about: ["Texas chachalaca hunting", "chachalaca season Texas", "South Texas chachalaca"],
    sections: [
      { heading: "Start with the four-county range", paragraphs: ["The legal season is tied to Cameron, Hidalgo, Starr and Willacy counties, so broad statewide hunting assumptions do not apply."], links: [OFFICIAL.chachalaca, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Match access to habitat", paragraphs: ["Brush, riparian habitat and refuge or WMA landscapes can overlap chachalaca range, but hunting permission varies by property."], links: [PUBLIC, OUTDOORS] },
      { heading: "Verify the exact hunt", paragraphs: [legalReminder], links: [OFFICIAL.regulations, LICENSE] },
    ],
    related: [HUNTING, SEASONS, PUBLIC, OUTDOORS, COUNTIES],
    faq: [
      { question: "Which Texas counties have a chachalaca season?", answer: "TPWD's 2026–27 season table identifies Cameron, Hidalgo, Starr and Willacy counties." },
      { question: "Can I hunt chachalaca anywhere in South Texas?", answer: "No. Confirm the county and property-specific rule." },
      { question: "Where should I verify current dates and limits?", answer: "Use TPWD's current chachalaca page and county regulation page." },
    ],
  }),

  "pronghorn-hunting": topic({
    slug: "pronghorn-hunting",
    eyebrow: "Texas game animals",
    title: "Texas Pronghorn Hunting Guide",
    description: "Plan Texas pronghorn hunting around the limited-county season framework, permits, private-land access and drawn public opportunities.",
    quickAnswer: "Texas pronghorn hunting is limited geographically and uses a defined season framework. Confirm the current eligible county, permit or land-management requirements and exact property before making travel plans.",
    about: ["Texas pronghorn hunting", "pronghorn season Texas", "antelope hunting Texas"],
    sections: [
      { heading: "Start with the current county map", paragraphs: ["TPWD's 2026–27 season table lists pronghorn opportunity in a subset of Texas counties, so geography is the first filter."], links: [OFFICIAL.pronghorn, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Access and permits can be decisive", paragraphs: ["Pronghorn hunting frequently depends on private-land permission, land-management arrangements or limited public opportunities. Do not treat an open county as universal access."], links: [PUBLIC, DRAWN, OUTDOORS] },
      { heading: "Check after-harvest requirements", paragraphs: ["Pronghorn harvest can involve tagging, proof-of-sex or reporting duties. Verify current instructions before hunting."], links: [OFFICIAL.regulations] },
    ],
    related: [HUNTING, SEASONS, DRAWN, COUNTIES],
    faq: [
      { question: "Is pronghorn hunting open statewide in Texas?", answer: "No. TPWD limits the season to eligible counties and current property or permit rules still apply." },
      { question: "Are there public pronghorn hunts?", answer: "Some limited-entry opportunities can appear in TPWD drawn-hunt systems; use the current catalog." },
      { question: "Should I rely on last year's pronghorn dates?", answer: "No. Verify the current TPWD season and county rule each year." },
    ],
  }),

  "alligator-hunting": topic({
    slug: "alligator-hunting",
    eyebrow: "Texas game animals",
    title: "Texas Alligator Hunting Guide",
    description: "Understand Texas alligator hunting zones, special properties, tagging and public-hunt planning without copying rules that can change by season.",
    quickAnswer: "Texas alligator hunting uses different season structures for core counties and special properties versus other counties, with additional tag and property rules. Verify the exact county, property and current TPWD requirements before hunting.",
    about: ["Texas alligator hunting", "alligator season Texas", "Texas alligator tags", "public alligator hunts Texas"],
    sections: [
      { heading: "County and property determine the framework", paragraphs: ["TPWD separates core counties and special properties from other counties. That distinction affects when and how a hunt can occur."], links: [OFFICIAL.alligator, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Tags and harvest procedures matter", paragraphs: ["Alligator hunting has species-specific tagging and harvest requirements that should be reviewed before the hunt rather than after a harvest."], links: [OFFICIAL.alligator, OFFICIAL.regulations] },
      { heading: "Public opportunities are limited and controlled", paragraphs: ["Use TPWD public-hunt or drawn-hunt materials for any public alligator opportunity and follow the individual hunt notice."], links: [PUBLIC, DRAWN] },
    ],
    related: [HUNTING, SEASONS, DRAWN, OUTDOORS, COUNTIES],
    faq: [
      { question: "Is Texas alligator season the same in every county?", answer: "No. TPWD uses different season frameworks for core counties and special properties versus other counties." },
      { question: "Do alligator hunts have tagging requirements?", answer: "Yes, species-specific tagging and harvest rules apply; verify current TPWD instructions for the exact hunt." },
      { question: "Can I find public alligator hunts?", answer: "Check TPWD's current public and drawn-hunt systems for any available opportunities." },
    ],
  }),

  "migratory-game-birds": topic({
    slug: "migratory-game-birds",
    eyebrow: "Texas migratory game birds",
    title: "Texas Migratory Game Bird Hunting Guide",
    description: "Understand the shared Texas and federal planning layer for dove, waterfowl, teal, geese, sandhill crane, rails, gallinules, snipe and woodcock.",
    quickAnswer: "Migratory game bird hunting adds requirements beyond a general hunting license. Depending on species, hunters may need the Texas Migratory Game Bird Endorsement, HIP certification, a federal duck stamp or a species-specific federal permit, plus current season, zone and method rules.",
    about: ["Texas migratory game birds", "Texas migratory bird endorsement", "HIP certification Texas", "Texas waterfowl regulations", "Texas dove regulations"],
    sections: [
      { heading: "Treat migratory birds as a separate regulatory layer", paragraphs: ["Migratory game bird rules combine Texas season structures with federal requirements. Endorsements, HIP certification, stamps or permits vary by species."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Species and zone still control the season", paragraphs: ["Dove, duck, goose, teal, crane, rail, gallinule, snipe and woodcock do not share one statewide calendar. Use the current TPWD species page and zone or county rule."], links: [OFFICIAL.seasonDates, internal("Texas dove hunting guide", "/hunting/dove-hunting"), internal("Texas waterfowl hunting guide", "/hunting/waterfowl-hunting")] },
      { heading: "Methods can be more restrictive", paragraphs: ["Migratory game bird rules can differ from general hunting rules on baiting, calls, shot and other methods. Verify the current special regulations rather than carrying over a rule from non-migratory game."], links: [OFFICIAL.migratoryBirds, OFFICIAL.meansMethods] },
    ],
    related: [HUNTING, SEASONS, PUBLIC, APH, OUTDOORS],
    faq: [
      { question: "Do all migratory game birds use the same Texas season?", answer: "No. Seasons and zones differ by species." },
      { question: "Is a Texas hunting license the only requirement?", answer: "Not always. Migratory-bird endorsement, HIP certification, a federal duck stamp or another permit can apply depending on the species." },
      { question: "Where should I verify migratory-bird methods?", answer: "Use TPWD's current migratory game bird regulations and the species-specific page." },
    ],
  }),

  "goose-hunting": topic({
    slug: "goose-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Goose Hunting Guide",
    description: "Plan Texas goose hunting around East and West zone structures, light and dark goose seasons, migratory-bird requirements and public access.",
    quickAnswer: "Texas goose seasons vary by zone and goose group, so verify the current East or West framework, endorsements, HIP and any federal stamp requirements before hunting.",
    about: ["Texas goose hunting", "goose season Texas", "light goose Texas", "dark goose Texas"],
    sections: [
      { heading: "Zone and goose group come first", paragraphs: ["TPWD's current season table separates East and West zones and distinguishes light and dark geese, with an early Canada goose opportunity in part of the state."], links: [OFFICIAL.goose, OFFICIAL.seasonDates] },
      { heading: "Resolve migratory-bird credentials", paragraphs: ["Goose hunting sits inside the migratory game bird framework. Verify the current Texas endorsement, HIP and federal requirements for the hunter."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Public fields and wetlands have property rules", paragraphs: ["APH and other public-hunt areas can add access dates, check-in, legal-game and method restrictions."], links: [PUBLIC, APH, OUTDOORS] },
    ],
    related: [internal("Migratory game bird guide", "/hunting/migratory-game-birds"), internal("Texas waterfowl hunting guide", "/hunting/waterfowl-hunting"), HUNTING, PUBLIC],
    faq: [
      { question: "Are Texas goose seasons the same statewide?", answer: "No. TPWD uses zone and goose-group season structures." },
      { question: "Do goose hunters need migratory-bird credentials?", answer: "Yes. Verify the current Texas and federal requirements, including HIP and any applicable stamp or endorsement." },
      { question: "Can APH areas offer goose hunting?", answer: "Some public areas may list goose as legal game; verify the individual property and current dates." },
    ],
  }),

  "teal-hunting": topic({
    slug: "teal-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Teal Hunting Guide",
    description: "Plan the September teal-only season with current TPWD dates, migratory-bird credentials, water conditions and public-hunt access.",
    quickAnswer: "Texas has a September teal-only season, but legal participation still depends on the current hunting license, migratory-bird requirements, federal waterfowl requirements, legal methods and the property being open to teal hunting.",
    about: ["Texas teal hunting", "September teal season Texas", "teal season Texas", "public teal hunting Texas"],
    sections: [
      { heading: "Use the teal-only season, not the general duck calendar", paragraphs: ["The September teal-only opportunity has its own dates and should be checked separately from regular duck seasons."], links: [OFFICIAL.teal, OFFICIAL.seasonDates] },
      { heading: "Waterfowl credentials still apply", paragraphs: ["Teal are migratory waterfowl. Verify the current Texas migratory-bird endorsement, HIP and federal duck-stamp requirements for the hunter."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Check the public property", paragraphs: ["Wetland habitat alone does not establish legal access. Confirm the property's legal-game list, permit, shooting hours, methods and check-in rules."], links: [PUBLIC, APH, OUTDOORS] },
    ],
    related: [internal("Migratory game bird guide", "/hunting/migratory-game-birds"), internal("Texas waterfowl hunting guide", "/hunting/waterfowl-hunting"), HUNTING, PUBLIC],
    faq: [
      { question: "Is September teal season the same as regular duck season?", answer: "No. TPWD lists a separate teal-only season." },
      { question: "Do teal hunters need waterfowl credentials?", answer: "Verify the current Texas migratory-bird, HIP and federal duck-stamp requirements before hunting." },
      { question: "Where can I find public teal opportunities?", answer: "Use TPWD public-hunting and APH property listings and confirm teal is legal game for that property." },
    ],
  }),

  "sandhill-crane-hunting": topic({
    slug: "sandhill-crane-hunting",
    eyebrow: "Texas migratory game birds",
    title: "Texas Sandhill Crane Hunting Guide",
    description: "Plan sandhill crane hunting around Zones A, B and C, closed areas, migratory-bird credentials, the federal crane permit and public access.",
    quickAnswer: "Texas sandhill crane hunting uses Zones A, B and C plus closed areas, and TPWD lists a Migratory Game Bird Endorsement, HIP certification and a federal Sandhill Crane Permit as requirements. Verify the exact zone and county before hunting.",
    about: ["Texas sandhill crane hunting", "sandhill crane season Texas", "Texas crane permit", "sandhill crane zones Texas"],
    sections: [
      { heading: "Identify the zone and closed area first", paragraphs: ["The current TPWD page maps Zones A, B and C and a closed area; the county and precise location determine whether a season is open."], links: [OFFICIAL.sandhillCrane, OFFICIAL.seasonDates, COUNTIES] },
      { heading: "Crane hunting has a species-specific permit", paragraphs: ["TPWD lists the Texas Migratory Game Bird Endorsement, HIP certification and a federal Sandhill Crane Permit for sandhill crane hunting. Confirm current requirements before travel."], links: [OFFICIAL.sandhillCrane, OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Public access is still property specific", paragraphs: ["Even inside an open crane zone, a public property must list sandhill crane as legal game and may add permit or method restrictions."], links: [PUBLIC, APH, OUTDOORS] },
    ],
    related: [internal("Migratory game bird guide", "/hunting/migratory-game-birds"), HUNTING, PUBLIC, COUNTIES],
    faq: [
      { question: "Does all of Texas have a sandhill crane season?", answer: "No. TPWD uses Zones A, B and C and identifies closed areas." },
      { question: "Is a federal sandhill crane permit required?", answer: "TPWD's current crane page lists a federal Sandhill Crane Permit along with the Texas migratory-bird endorsement and HIP certification." },
      { question: "Can I rely on the zone alone?", answer: "No. Confirm the county, exact location, public or private access and current property rules." },
    ],
  }),

  "other-migratory-game-birds": topic({
    slug: "other-migratory-game-birds",
    eyebrow: "Texas migratory game birds",
    title: "Texas Rails, Gallinules, Snipe & Woodcock Hunting Guide",
    description: "Cover the Texas migratory-bird opportunities often missed by general hunting guides: rails, gallinules, moorhens, snipe and woodcock.",
    quickAnswer: "Rails, gallinules, moorhens, snipe and woodcock use their own 2026–27 seasons and limits, while sharing migratory-game-bird credential and method rules. Verify the individual species page before hunting.",
    about: ["Texas rail hunting", "Texas gallinule hunting", "Texas snipe hunting", "Texas woodcock hunting", "Texas migratory game birds"],
    sections: [
      { heading: "Do not hide these species inside a generic waterfowl page", paragraphs: ["TPWD publishes distinct season and limit information for rails, gallinules and moorhens, snipe and woodcock. Their calendars are not interchangeable with duck or dove seasons."], links: [OFFICIAL.rails, OFFICIAL.woodcock, OFFICIAL.seasonDates] },
      { heading: "Migratory-bird requirements still apply", paragraphs: ["These species sit inside the migratory game bird framework, including endorsement and HIP requirements. Verify current methods and any species-specific rules."], links: [OFFICIAL.migratoryBirds, LICENSE] },
      { heading: "Confirm habitat and legal access separately", paragraphs: ["Marsh, wetland or bottomland habitat can identify where to look, but legal access and legal game remain property-specific."], links: [PUBLIC, APH, OUTDOORS] },
    ],
    related: [internal("Migratory game bird guide", "/hunting/migratory-game-birds"), HUNTING, PUBLIC, OUTDOORS],
    faq: [
      { question: "Are rails and woodcock covered by Texas migratory-game-bird rules?", answer: "Yes. TPWD includes them in the migratory game bird framework and publishes species-specific seasons and limits." },
      { question: "Do they use the duck season dates?", answer: "No. Use the individual TPWD season page for the species you intend to hunt." },
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
      { heading: "Know what Texas classifies as a fur-bearing animal", paragraphs: ["TPWD's fur-bearing rules cover animals including badger, beaver, fox, mink, muskrat, nutria, opossum, raccoon, otter, skunk and ring-tailed cat, with additional species-specific requirements in some cases."], links: [OFFICIAL.furbearers] },
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
