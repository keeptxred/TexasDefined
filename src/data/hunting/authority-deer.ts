import type { HuntingAuthorityTopic } from "./authority";
import { deerSeasonRange, deerSeasonYear, texasDeerSeason } from "./deer-season-format";

/**
 * Texas white-tailed deer authority guide with TPWD-synced season dates.
 * Human-reviewed against TPWD Outdoor Annual on 2026-10-28.
 *
 * Regulatory dates and county requirements are season-specific. Never advance
 * the review date or roll over season dates solely because a scheduled fetch
 * succeeds: verify the official TPWD content before publishing amendments.
 */
export const TEXAS_DEER_AUTHORITY_TOPIC: HuntingAuthorityTopic = {
  slug: "texas-deer-hunting",
  eyebrow: `${deerSeasonYear} Texas white-tailed deer guide`,
  title: "Texas White-Tailed Deer Hunting Guide",
  description: `${deerSeasonYear} Texas deer season dates, county limits, antler rules, licenses, tagging, CWD precautions, public hunts and region-by-region planning, with links to TPWD.`,
  reviewedOn: "2026-10-28",
  reviewedLabel: "October 28, 2026",
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
        `For counties with an open season, archery-only season is ${deerSeasonRange("archery")}. General season is ${deerSeasonRange("generalNorth")} in the North Zone and ${deerSeasonRange("generalSouth")} in the South Zone. These are different from the mule-deer calendar.`,
        `The early youth-only season is ${deerSeasonRange("earlyYouth")}. The North Zone also has a late youth-only season ${deerSeasonRange("lateYouthNorth")}. Muzzleloader season is ${deerSeasonRange("muzzleloader")} only in designated counties. Special late season runs ${deerSeasonRange("specialNorth")} (North) and ${deerSeasonRange("specialSouth")} (South) where offered; it is restricted to antlerless and qualifying unbranched-antlered deer.`,
        "TPWD lists white-tailed deer seasons in 252 of Texas's 254 counties, but county exceptions, land-management permits and restrictions on methods or sex of deer matter. Use the official county selector rather than assuming a North/South date applies automatically. Properties in the Managed Lands Deer Program (MLDP) can have a different authorized framework.",
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
        "Check whether the county has an open archery, general, muzzleloader, youth-only or special-late season; whether antlerless harvest is restricted to specified days; whether antler restrictions apply; and whether the location is subject to special harvest reporting or CWD rules. Some boundary descriptions use highways or portions of counties, not simply county names.",
        "Private-property permission, hunting leases, Wildlife Management Area (WMA) hunt notices and other public-land permits are separate from the statewide season. A legal season does not itself authorize entry or hunting on a property.",
      ],
      links: [
        { label: "TPWD white-tailed deer county regulations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
        { label: "Browse Texas counties", href: "/browse/counties" },
        { label: "Texas public hunting access", href: "/hunting/public-hunting" },
      ],
    },
    {
      heading: "Bag limits and what counts as a legal buck",
      paragraphs: [
        "TPWD sets deer bag limits by county. Across ordinary hunting-license-tag harvest, no hunter may exceed five white-tailed deer annually, no more than three of them bucks; that statewide annual limit does not apply on MLDP properties. A county may allow substantially fewer deer, so five is a ceiling, not a county-specific entitlement.",
        "In counties with special antler restrictions, TPWD defines a legal buck as one with at least one unbranched antler or an inside spread of 13 inches or more. In those counties, the maximum is two legal bucks, with no more than one buck meeting the specified branched-antler/13-inch category; check the full TPWD wording and the county before making a harvest decision. The familiar ear-tip-to-ear-tip comparison is only an estimation aid, not a guarantee of a legal measurement.",
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
        `For the ${deerSeasonYear} license year, hunters born on or after September 2, 1971 generally must satisfy Texas hunter-education requirements or an applicable supervision/deferral provision. Rules differ by age, and TPWD lists certain military and law-enforcement exemptions. Certification is separate from buying a hunting license; retain acceptable proof in the field.`,
        "Youth-only white-tailed deer seasons are for licensed hunters age 16 and younger, with other supervision and education requirements applying as relevant. Check those requirements before booking a family hunt.",
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
      heading: "Tag your deer immediately and complete the harvest log",
      paragraphs: [
        "For paper licenses, immediately complete the appropriate buck or antlerless tag, mark the harvest date as TPWD instructs, and attach it to the deer before field dressing or moving it. Complete the white-tailed deer harvest log on the hunting license when required. Special-issued tags such as MLDP tags use their own applicable procedures.",
        "Fully digital license holders must execute the appropriate digital tag in the Texas Hunt & Fish app immediately after harvest, and deer still require physical handwritten documentation attached to the carcass. With service, record the app confirmation number on durable material; without service, follow TPWD's offline identification instructions and submit the saved report once connectivity returns. A digital license is not the same as a paper license purchased online.",
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
        `For hunting-license-tag harvest in ${deerSeasonYear}, TPWD requires reporting within 24 hours for bucks and antlerless deer taken in Collin, Dallas, Grayson and Rockwall counties. Those counties also have special legal-method rules, so review their entire county entry.`,
        "An additional group of counties, and specified portions of some counties, requires reporting of antlerless deer. Examples include Austin, Bastrop, Fayette, Guadalupe, Waller and Washington counties; parts of Comal, Goliad, Hays, Jackson, Travis, Victoria and Wharton also have designated requirements. This is not a substitute for the complete current TPWD list.",
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
        "In areas with mandatory CWD testing, TPWD requires the intact, unfrozen head of a hunter-harvested deer to be presented at a designated check station within 48 hours of harvest. Confirm the precise zone requirements before field dressing or transporting the animal; some locations have additional carcass-handling restrictions.",
        "Avoid moving high-risk carcass parts contrary to TPWD requirements, and use available voluntary testing outside mandatory zones when appropriate. Report visibly sick animals to TPWD rather than assuming symptoms are harmless.",
      ],
      links: [
        { label: "TPWD CWD regulations, zones and check stations", href: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/after-killing-a-deer/", external: true },
        { label: "TPWD white-tailed deer CWD information", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true },
      ],
    },
    {
      heading: "Where to hunt: Texas deer habitat by region",
      paragraphs: [
        "Hill Country and Edwards Plateau: oak-juniper hills, creek bottoms and agricultural edges support many white-tailed deer, but density varies with rainfall, forage and local management. Glassing openings and evaluating browse, acorn availability, water and travel corridors are more helpful than assuming all Hill Country ranches hunt alike.",
        "South Texas brush country: thornscrub, mesquite flats, senderos and riparian corridors create a different landscape from wooded Central Texas. Deer movement depends on cover, forage, pressure and weather. Some ranches use intensive herd management, but private ranch access and MLDP rules must be checked independently.",
        "East Texas Pineywoods and Post Oak Savannah: timber, hardwood bottoms, cutovers and food-source edges are central. Visibility is often shorter, so safe shot selection and identifying backstops matter. Cross Timbers and North Texas add patchworks of oak woodland, pasture and cropland with a mix of cover and open areas.",
        "West Texas: white-tailed deer are present in portions of western Texas, but do not confuse their hunt rules or habitat with mule deer, especially in Trans-Pecos and Panhandle country. Property-scale conditions, altitude and species identification matter.",
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
        "After harvest: confirm species, sex and antler legality; complete the correct paper or digital tag before movement or field dressing; fill in the white-tailed deer harvest log where required; complete county reporting; follow CWD check-station and carcass movement rules; preserve proof of sex during transport.",
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
      question: `When does Texas deer season start in ${texasDeerSeason.startYear}?`,
      answer: `White-tailed deer archery-only season begins ${texasDeerSeason.rows.find((row) => row.id === "archery")?.start ?? "see TPWD"} in counties with an open season. The general North and South Zone dates are ${deerSeasonRange("generalNorth")} and ${deerSeasonRange("generalSouth")}, respectively. County exceptions and property-specific rules still apply.`,
    },
    {
      question: `When does the ${deerSeasonYear} general deer season end?`,
      answer: `The standard North Zone general season runs ${deerSeasonRange("generalNorth")}; the South Zone general season runs ${deerSeasonRange("generalSouth")}. Some counties offer late or muzzleloader seasons under different restrictions.`,
    },
    {
      question: "How many bucks can I shoot in Texas?",
      answer: "TPWD's statewide annual ceiling for regular license-tag harvest is three bucks within a total of five white-tailed deer, but individual counties can impose lower bag limits and special antler restrictions. MLDP properties use a different permit framework. Always look up your county.",
    },
    {
      question: "Is a 13-inch spread required for every Texas buck?",
      answer: "No. Antler restrictions only apply in designated counties, and even there the legal-buck definition includes some bucks with an unbranched antler. Check the full TPWD county rules and diagrams; do not decide legality from a general statewide summary.",
    },
    {
      question: "Do Texas deer hunters need to report every harvest?",
      answer: "No statewide 24-hour reporting requirement applies identically to every deer. TPWD requires reporting for buck and antlerless deer in four named counties and for antlerless deer in additional counties or county portions; some special tags have their own rules. Digital-tag execution satisfies mandatory reporting where applicable.",
    },
    {
      question: "Can I hunt deer on public land with just a hunting license?",
      answer: "Not automatically. The APH program, drawn-hunt permits and specific public properties have additional access requirements, legal-game lists and hunt dates. A valid hunting license is necessary but may not be sufficient.",
    },
    {
      question: "How quickly must a harvested deer be tagged?",
      answer: "Immediately after harvest and before field dressing or moving the animal. The precise process differs for paper tags, fully digital tags and special-issued management permits.",
    },
    {
      question: "When is CWD testing mandatory for a Texas deer?",
      answer: "It depends on whether the deer is harvested inside a TPWD CWD zone with mandatory testing. In such zones, the intact, unfrozen head must generally be presented at a designated check station within 48 hours. Check current zone maps and movement rules before the hunt.",
    },
    {
      question: "What is the best time for the rut in Texas?",
      answer: "There is no single statewide rut week. TPWD research places typical Cross Timbers breeding around mid-November and South Texas Plains peaks around mid-to-late December, but timing varies by region and year.",
    },
  ],
};
