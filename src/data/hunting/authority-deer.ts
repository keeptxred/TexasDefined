import type { HuntingAuthorityTopic } from "./authority";
import { deerSeasonRange, deerSeasonYear, texasDeerSeason } from "./deer-season-format";

/**
 * Texas white-tailed deer authority guide with TPWD-synced season dates.
 * Editorial review of TPWD primary rules and screwworm advisories updated 2026-11-13.
 *
 * Annual season dates, official calendar and structured legal facts are synchronized
 * only after dual-source TPWD verification, protected CI and production deployment.
 * The historical editorial review date is not changed by automated data updates.
 */
export const TEXAS_DEER_AUTHORITY_TOPIC: HuntingAuthorityTopic = {
  slug: "texas-deer-hunting",
  eyebrow: `${deerSeasonYear} Texas white-tailed deer guide`,
  title: "Texas White-Tailed Deer Hunting Guide",
  description: `${deerSeasonYear} Texas deer season dates, county limits, antler rules, licenses, tagging, CWD and screwworm precautions, public hunts and regional planning, with links to TPWD.`,
  reviewedOn: "2026-11-13",
  reviewedLabel: "November 13, 2026",
  quickAnswer: `Texas\'s ${deerSeasonYear} white-tailed deer archery-only season runs ${deerSeasonRange("archery")}. General season runs ${deerSeasonRange("generalNorth")} in the North Zone and ${deerSeasonRange("generalSouth")} in the South Zone. Those are statewide zone frameworks, not permission to hunt every county or property: check the exact county\'s season, legal deer, bag and antler limits, access, and harvest requirements with TPWD before you go.`,
  about: [
    `${deerSeasonYear} Texas white-tailed deer season`,
    "Texas deer hunting regulations",
    "Texas buck and antlerless bag limits",
    "Texas antler restrictions",
    "Texas deer hunting public land",
    "Texas deer tagging and chronic wasting disease",
  ],
  sections: [
    {
      heading: `${deerSeasonYear} Texas white-tailed deer season dates`,
      paragraphs: [
        "Use the season table above for the eight statewide white-tailed deer date ranges. It includes both general-season zones and archery-only dates. This table is a planning reference—not a license to hunt in every county, or a mule-deer calendar.",
        `The early youth-only season is ${deerSeasonRange("earlyYouth")}. The North Zone also has a late youth-only season ${deerSeasonRange("lateYouthNorth")}. Muzzleloader season is ${deerSeasonRange("muzzleloader")} only in designated counties. Special late season runs ${deerSeasonRange("specialNorth")} (North) and ${deerSeasonRange("specialSouth")} (South) where offered; TPWD currently restricts eligible harvest to ${texasDeerSeason.regulations.specialLateRestriction}; confirm the county.`,
        `TPWD lists white-tailed deer seasons in ${texasDeerSeason.regulations.openCountyCount} of Texas\'s 254 counties for ${deerSeasonYear}, but county exceptions, land-management permits and restrictions on methods or sex of deer matter. Use the official county selector rather than assuming a North/South date applies automatically. MLDP properties can have different authorized frameworks.`,
      ],
      links: [
        { label: "Official TPWD deer dates, county selector and zone map", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: `TPWD statewide ${deerSeasonYear} hunting calendar`, href: texasDeerSeason.officialCalendarUrl, external: true },
        { label: "Texas hunting seasons explained", href: "/hunting/hunting-seasons" },
      ],
    },
    {
      heading: "Start with the county, not just the season zone",
      paragraphs: [
        "The North/South zone tells you which general-season framework may apply; it does not tell you whether you may take a buck or antlerless deer on a particular date. Locate the property on a map, establish the county, and read TPWD's county-specific white-tailed deer rules for the type of hunt planned.",
        "Check whether the county has an open season for your method, whether antlerless harvest is limited to specific days, and whether antler, reporting or CWD restrictions apply. TPWD expanded antlerless doe days to November 14–29, 2026 in 21 designated counties or portions of counties; it is not a statewide antlerless season. Boundary descriptions sometimes use highways, so the property location matters.",
        "Private-property permission, hunting leases, Wildlife Management Area (WMA) hunt notices and other public-land permits are separate from the statewide season. A legal season does not itself authorize entry or hunting on a property.",
      ],
      links: [
        { label: "TPWD white-tailed deer county regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "TPWD 2026–27 hunting rule changes, including antlerless deer dates", href: "https://tpwd.texas.gov/newsmedia/releases/?req=20260904a", external: true },
        { label: "Browse Texas counties", href: "/browse/counties" },
        { label: "Texas public hunting access", href: "/hunting/public-hunting" },
      ],
    },
    {
      heading: "Bag limits and what counts as a legal buck",
      paragraphs: [
        `TPWD sets deer bag limits by county. Its current statewide ceiling for regular license-tag harvest is ${texasDeerSeason.regulations.annualBagMax} white-tailed deer annually, no more than ${texasDeerSeason.regulations.annualBuckMax} of them bucks; that statewide annual limit does not apply on MLDP properties. County-specific limits may be substantially lower.`,
        `In counties with special antler restrictions, TPWD currently describes a legal buck as one with at least one unbranched antler or an inside spread of ${texasDeerSeason.regulations.specialAntlerSpreadInches} inches or greater. Limits on legal bucks and branched antlers also apply: check the complete TPWD wording and county listing before harvest. The ear-tip-to-ear-tip comparison is an estimation aid, not a legal measurement.`,
        "Do not assume any antlerless deer can be taken on any general-season day. County restrictions, antlerless-only days, legal means and MLDP conditions may change the answer. The person taking the animal must also have an appropriate available tag or permit.",
      ],
      links: [
        { label: "TPWD official bag limits and antler diagrams", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "Texas hunting bag limits guide", href: "/hunting/bag-limits" },
        { label: "TPWD Managed Lands Deer Program", href: "https://tpwd.texas.gov/business/permits/land/wildlife_management/mldp/mldp-information.phtml", external: true },
      ],
    },
    {
      heading: "Licenses, archery endorsement and hunter education",
      paragraphs: [
        "Obtain the appropriate current Texas hunting license for your residency and age before hunting; a public-land hunt may require an additional permit. TPWD requires an archery endorsement when hunting during archery-only season. Confirm legal equipment and county-specific means and methods rather than treating archery, firearm and muzzleloader seasons as interchangeable.",
        `For the ${deerSeasonYear} license year, review TPWD\'s current hunter-education birthdate, age, supervision, deferral and exemption requirements. The requirements are distinct from buying a hunting license, and acceptable proof of education should be available in the field.`,
        "Youth-only white-tailed deer seasons have TPWD age, licensing, supervision and education requirements. Use TPWD’s current eligibility rules rather than relying on an old age cutoff before booking a family hunt.",
      ],
      links: [
        { label: "TPWD hunter education and age requirements", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/hunter-education", external: true },
        { label: "TPWD hunting license information", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting", external: true },
        { label: "Texas hunting license guide", href: "/hunting/texas-hunting-license" },
        { label: "Youth hunting guide", href: "/hunting/youth-hunting" },
        { label: "Archery hunting guide", href: "/hunting/archery-hunting" },
      ],
    },
    {
      heading: "Deer tagging, harvest logs and digital licenses",
      paragraphs: [
        "For paper licenses, follow current TPWD rules for the correct buck or antlerless tag, harvest date, attachment and license harvest log. The timing of each step matters, and special-issued tags such as MLDP tags use their own procedures. Consult the current TPWD instructions before field dressing or moving a harvested deer.",
        "Fully digital license holders should follow TPWD’s current Texas Hunt & Fish digital tagging, carcass identification and reporting process; online and offline procedures may differ. A paper license purchased online is not necessarily a fully digital license. Use TPWD’s official instructions for required timing and physical documentation.",
        "Keep the necessary proof of sex and documentation with the animal during transportation and consult TPWD guidance before quartering, transferring or taking a carcass out of a CWD zone.",
      ],
      links: [
        { label: "TPWD paper deer tagging instructions", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/tagging-instructions/tagging-deer", external: true },
        { label: "TPWD digital licenses and deer tags", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/tagging-instructions/digitaltags", external: true },
        { label: "TPWD after harvesting a deer", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/after-killing-a-deer/", external: true },
      ],
    },
    {
      heading: "Which counties require deer harvest reporting?",
      paragraphs: [
        `For hunting-license-tag harvest in ${deerSeasonYear}, TPWD currently requires buck and antlerless deer reporting within ${texasDeerSeason.regulations.reportingHours} hours in these counties: ${texasDeerSeason.regulations.buckAndAntlerlessReportingCounties}. Confirm the county’s complete legal-method requirements before hunting.`,
        `TPWD currently requires antlerless deer reporting in these additional counties or portions of counties: ${texasDeerSeason.regulations.antlerlessReportingCounties}. Boundary qualifiers matter; check the latest official county map and listing.`,
        "Report as required through Texas Hunt & Fish or TPWD's online reporting service. Executing a valid digital tag also serves as mandatory reporting where applicable. Do not assume the absence of a statewide reporting rule means your county has none.",
      ],
      links: [
        { label: "Official reporting county list and instructions", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "TPWD deer tagging and reporting", href: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/tagging-instructions/tagging-deer", external: true },
      ],
    },
    {
      heading: "Chronic wasting disease: testing and carcass movement",
      paragraphs: [
        "Chronic wasting disease (CWD) is a fatal neurological disease affecting deer and certain other cervids. TPWD uses containment, surveillance and other designated zones where harvest testing, carcass movement and disposal restrictions may apply. Zone boundaries and check-station details can change, so consult the current map for the exact property.",
        "TPWD may require timely testing, designated check-station submission, and specific specimen handling in CWD zones. Testing windows and requirements vary by zone and season; consult the current TPWD CWD zone instructions before field dressing or transporting a deer.",
        "Avoid moving high-risk carcass parts contrary to TPWD requirements, and consider voluntary testing outside mandatory zones. Report visibly sick animals to TPWD.",
        "New World screwworm is a separate 2026 wildlife-health concern, not a form of CWD. TPWD advises hunters to inspect harvested animals for suspicious wounds or live larvae and promptly report suspected infestation in living native wildlife to a local TPWD biologist or (512) 389-4505. Do not transport or dispose of a potentially infested carcass without consulting current TPWD guidance; check the official, changing NWS zone map before a trip. Avoid handling suspicious larvae without appropriate precautions.",
      ],
      links: [
        { label: "TPWD CWD regulations, zones and check stations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/after-killing-a-deer/", external: true },
        { label: "TPWD white-tailed deer CWD information", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "TPWD New World screwworm hunter and landowner guidance", href: "https://tpwd.texas.gov/huntwild/wild/diseases/screwworm/", external: true },
      ],
    },
    {
      heading: "Where to hunt: Texas deer habitat by region",
      paragraphs: [
        "The regional comparison above identifies useful differences between Texas landscapes, but a region name cannot tell you how deer use a specific property. During a scouting visit, locate legal entry points, likely food sources, water, cover and travel corridors without crossing a boundary you do not have permission to enter.",
        "For a dry fall, prioritize recent signs near dependable water and forage rather than last year's trail patterns; after heavy rain, use fresh tracks and browse to reassess. In timber, look at safe visibility and backstops. In open country, plan distance, wind and approach routes without treating a long sightline as permission to shoot.",
        "Before deciding on a region, check the current county-specific legal deer, access type and whether the area's public-hunting dates actually overlap the trip. Neither this editorial comparison nor an observed deer track proves a property is open to hunting.",
      ],
      links: [
        { label: "Texas white-tailed deer species profile", href: "/wildlife-species/white-tailed-deer" },
        { label: "Mule deer identification and hunting guide", href: "/hunting/mule-deer" },
        { label: "Explore Texas wildlife", href: "/explore/wildlife" },
      ],
    },
    {
      heading: "The Texas rut is not the same week everywhere",
      paragraphs: [
        "Deer breeding activity varies considerably across the state's ecological regions. TPWD's white-tailed deer rut research places typical Cross Timbers breeding activity in mid-November, while the South Texas Plains commonly peaks later, around mid-to-late December; local patterns and individual-year conditions still vary.",
        "A useful hunting plan accounts for the region, actual deer sign and pressure rather than relying on a single statewide 'rut week.' The first legal season day is not necessarily the peak movement period in a particular county.",
        "Focus on habitat and ethical observation: consider prevailing wind, access routes, suitable visibility, known food and water availability, and the safety of everyone on adjoining properties. Weather and hunting pressure may change daily movement even within the same week.",
      ],
      links: [
        { label: "TPWD regional study: rut in white-tailed deer", href: "https://tpwd.texas.gov/huntwild/hunt/planning/rut_whitetailed_deer/", external: true },
      ],
    },
    {
      heading: "Public-land deer hunting: walk-in and drawn hunts",
      paragraphs: [
        "Texas has public hunting opportunities, but an Annual Public Hunting (APH) Permit is not a blanket deer permit for every public parcel. An APH Permit is separate from a valid hunting license and any required endorsements; verify the current TPWD permit price before purchasing. Each property listing specifies legal game, dates, hunting methods, parking, entry procedures and limits.",
        "Some deer opportunities are drawn hunts, E-Postcard hunts or other permit types with applications, deadlines, fees and designated check-in conditions. State parks, national forests and WMAs cannot be treated as automatically open to general deer hunting. Read the exact area's current legal-game listing before traveling.",
        "Compare drive time, access requirements, terrain, available public-hunting dates and whether a scouting trip is permitted. On a private lease, obtain the landowner's permission and clarify boundaries, guest rules, harvest reporting and any special land-management tags.",
      ],
      links: [
        { label: "TPWD APH/walk-in hunt program", href: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/", external: true },
        { label: "TPWD drawn hunts", href: "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/", external: true },
        { label: "Texas public hunting guide", href: "/hunting/public-hunting" },
        { label: "Annual Public Hunting Permit guide", href: "/hunting/annual-public-hunting-permit" },
        { label: "Texas drawn hunts guide", href: "/hunting/drawn-hunts" },
      ],
    },
    {
      heading: "Practical deer-hunt checklist",
      paragraphs: [
        "Before departure: identify the property and county; verify its exact TPWD season and legal deer; confirm your current license, archery endorsement if applicable, hunter-education compliance and property access; check whether county reporting, MLDP or CWD requirements apply.",
        "For the trip: plan legal and safe access routes; check weather, wind and daylight; carry communication, water, navigation and first aid supplies; confirm firearms and archery safety practices, blaze-orange requirements where applicable, and emergency contact arrangements. Do not trespass to retrieve an animal—arrange legal access.",
        "After harvest: confirm species, sex and antler legality; complete the correct paper or digital tag before movement or field dressing; fill in the required harvest log and county reporting; follow CWD check-station and carcass rules; inspect for possible screwworm larvae and consult TPWD if infestation is suspected; preserve proof of sex during transport.",
      ],
      links: [
        { label: "TPWD deer regulations and county exceptions", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "TPWD after-harvest procedures", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/after-killing-a-deer/", external: true },
      ],
    },
  ],
  related: [
    { label: "Texas hunting seasons", href: "/hunting/hunting-seasons" },
    { label: "Texas bag limits", href: "/hunting/bag-limits" },
    { label: "Texas public hunting", href: "/hunting/public-hunting" },
    { label: "Texas hunting licenses", href: "/hunting/texas-hunting-license" },
    { label: "Texas youth hunting", href: "/hunting/youth-hunting" },
    { label: "Texas mule deer hunting", href: "/hunting/mule-deer" },
    { label: "Explore Texas wildlife", href: "/explore/wildlife" },
  ],
  faq: [
    {
      question: "Can I take an antlerless deer throughout general deer season?",
      answer: "Not automatically. Antlerless harvest dates, legal methods, tags and limits are county-specific. TPWD expanded 2026 doe days to November 14–29 for 21 designated counties or county portions, but that is not a statewide permission. Check the exact property and county listing.",
    },
    {
      question: "What if my deer-hunting property crosses a county line?",
      answer: "Locate where you intend to hunt, check the applicable county or county-portion TPWD regulations for each location, and confirm boundaries and permission with the property owner. Highway-based exceptions and nearby CWD zones can matter. Ask TPWD if a boundary is unclear.",
    },
    {
      question: "How many bucks can I shoot in Texas?",
      answer: `TPWD currently sets a statewide regular license-tag ceiling of ${texasDeerSeason.regulations.annualBuckMax} bucks within ${texasDeerSeason.regulations.annualBagMax} white-tailed deer, but counties can have lower limits and antler restrictions. MLDP uses a different permit framework; check the official county entry.`,
    },
    {
      question: "Is a 13-inch spread required for every Texas buck?",
      answer: `No. The current ${texasDeerSeason.regulations.specialAntlerSpreadInches}-inch inside-spread measure is part of the rules only in designated counties, and unbranched-antler exceptions may apply. Check the full official county rules and diagrams.`,
    },
    {
      question: "Do Texas deer hunters need to report every harvest?",
      answer: `Not every county has identical reporting rules. TPWD currently requires reporting within ${texasDeerSeason.regulations.reportingHours} hours for applicable license-tag deer in ${texasDeerSeason.regulations.buckAndAntlerlessReportingCounties}, plus antlerless-only reporting in additional counties and county portions. Special tags and fully digital licenses may have different procedures.`,
    },
    {
      question: "Can I hunt deer on public land with just a hunting license?",
      answer: "Not automatically. The APH program, drawn-hunt permits and specific public properties have additional access requirements, legal-game lists and hunt dates. A valid hunting license is necessary but may not be sufficient.",
    },
    {
      question: "How quickly must a harvested deer be tagged?",
      answer: "Follow current TPWD rules for the precise deadline and process. Paper tags, fully digital tags and special-issued management permits can have different attachment, reporting and handling requirements.",
    },
    {
      question: "When is CWD testing mandatory for a Texas deer?",
      answer: "It depends on the current TPWD CWD zone requirements, designated check-station procedures, and specimen rules. Look up the exact property and current testing deadline before the hunt; restrictions also govern carcass movement.",
    },
    {
      question: "What is the best time for the rut in Texas?",
      answer: "There is no single statewide rut week. TPWD research places typical Cross Timbers breeding around mid-November and South Texas Plains peaks around mid-to-late December, but timing varies by region and year.",
    },
  ],
};
