import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasHomeownerFieldManualArticle: Article = {
  id: "evergreen-texas-homeowner-field-manual",
  brandId: "texasdefined",
  slug: "texas-homeowner-field-manual",
  title: "The Texas Homeowner Field Manual: Weather, Utilities, Insurance, Wildlife and the Systems That Matter",
  dek: "A practical operating manual for owning a house in Texas: storms, freezes, foundations, roofs, electricity, insurance, water, pools, pests, wildlife, school districts, emergency records and the annual maintenance rhythm that ties them together.",
  category: "home-garden",
  hero: {
    src: "https://images.unsplash.com/photo-1768941124710-1a42b3195208?auto=format&fit=crop&w=1600&h=1067&q=82",
    alt: "Brick and stucco suburban home exterior with a green lawn and walkway",
    width: 1600,
    height: 1067,
    credit: "Kellen Riggin · Unsplash",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 19,
  tags: ["texas homeowner guide", "texas home maintenance", "texas weather", "texas insurance", "texas electricity", "texas wildlife", "texas foundation", "texas roof", "moving to texas"],
  featured: true,
  sourceName: "Texas Department of Insurance",
  sourceUrl: "https://www.tdi.texas.gov/consumer/homeowners.html",
  internalLinks: [
    { href: "/article/texas-home-maintenance-calendar", label: "Texas home maintenance calendar", description: "Turn this field manual into a month-by-month maintenance rhythm." },
    { href: "/article/texas-hurricane-preparation-guide", label: "Texas hurricane preparation guide", description: "Build a storm plan for wind, flooding, evacuation, outages and insurance documentation." },
    { href: "/article/prepare-texas-house-freeze", label: "Prepare a Texas house for a freeze", description: "Protect plumbing, pools, plants, pets and backup power before temperatures fall." },
    { href: "/article/texas-foundation-care-clay-soil-drought", label: "Texas foundation care", description: "Understand expansive clay, drought, drainage and the warning signs worth investigating." },
    { href: "/article/texas-roofs-hail-wind-heat", label: "Texas roofs, hail, wind and heat", description: "Know what Texas weather does to a roof and how to document storm damage." },
    { href: "/article/how-to-choose-electricity-plan-texas", label: "Choose a Texas electricity plan", description: "Compare plans using your real usage instead of the headline rate." },
    { href: "/article/texas-school-districts-explained", label: "Texas school districts explained", description: "Verify ISD and campus assignments at the address level before buying." },
    { href: "/article/texas-wildlife-guide", label: "Texas wildlife field guide", description: "Learn the animals Texans actually encounter and how to share space safely." },
    { href: "/texas-home-insurance-calculator", label: "Texas home insurance calculator", description: "Estimate insurance as part of the real carrying cost of a Texas house." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility cost calculator", description: "Estimate electricity, water and other recurring household utility costs." },
    { href: "https://www.tdi.texas.gov/consumer/homeowners.html", label: "Texas Department of Insurance homeowners guidance", description: "Official Texas guidance on homeowners coverage, claims and shopping for insurance." },
    { href: "https://www.tdem.texas.gov/prepare", label: "Texas Division of Emergency Management preparedness", description: "Official statewide guidance for household emergency planning and disaster readiness." },
    { href: "https://www.puc.texas.gov/consumer/electricity/", label: "Public Utility Commission electricity information", description: "Official Texas consumer guidance for electricity service and retail choice." },
    { href: "https://tpwd.texas.gov/huntwild/wild/species/", label: "Texas Parks and Wildlife species guidance", description: "Official Texas wildlife profiles and safety information." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Owning a house in Texas means managing several systems that national homeownership advice often treats as separate topics. Weather affects roofs, foundations, drainage, insurance and electricity. School-district and special-district boundaries affect the real monthly cost of a property. Wildlife and pests change with region. Pools, irrigation and air conditioning become major mechanical systems rather than optional extras."),
    p("The useful way to think about a Texas house is as a small operating system. You do not need to become a roofer, electrician, insurance adjuster or wildlife biologist. You do need to know which parts of the system deserve attention, where failures usually begin and which records make the next decision easier."),

    h("1. Learn the address before you learn the house"),
    p("In Texas, the address controls more than the mailing label. It determines the school district, taxing units, utility territory, flood exposure, emergency jurisdiction and sometimes whether the home sits inside a MUD, PID or another special district. Two nearly identical houses a few streets apart can have materially different recurring costs."),
    list("Verify the school district and assigned campuses from official district sources.", "Identify every taxing unit attached to the parcel.", "Check whether the address is in a municipal utility district, public improvement district or other special district.", "Confirm electricity service territory and whether retail choice applies.", "Review flood maps and local drainage history instead of relying only on a seller description."),

    h("2. Treat drainage as a structural system"),
    p("Water management is one of the most important homeowner jobs in Texas because heavy rain and long dry spells can both stress a property. Gutters, downspouts, lot grading, swales, drains, irrigation and soil moisture all influence what happens around the foundation."),
    p("The best drainage inspection happens during or immediately after a hard rain. Watch where water collects, whether downspouts discharge beside the slab, whether neighboring runoff crosses the lot and whether standing water persists near the house."),
    list("Keep roof runoff moving away from the structure.", "Do not bury foundation edges under soil or mulch without understanding drainage consequences.", "Repair irrigation leaks quickly.", "Document recurring ponding with photos so you can compare conditions over time.", "When movement appears, investigate plumbing and drainage before assuming every crack means the same thing."),

    h("3. Know what expansive clay can do"),
    p("Large parts of Texas have soils that expand when wet and shrink when dry. That movement does not automatically mean a house is failing, but it explains why foundation care belongs in ordinary home maintenance rather than only in emergency repair conversations."),
    p("The most useful habit is consistency. Watch drainage, avoid dramatic moisture swings where practical, record new cracks or sticking doors, and compare changes over seasons. If symptoms accelerate or appear together, seek an independent diagnosis rather than relying on a sales pitch from the company that benefits from the repair."),

    h("4. Roofs need a storm history, not just an age"),
    p("A Texas roof lives through heat, ultraviolet exposure, hail, wind and sudden temperature changes. Age matters, but so does storm history. A newer roof with repeated hail exposure can deserve more scrutiny than an older roof in a quieter weather history."),
    list("Keep invoices, warranty documents and the installation date.", "Photograph the roofline and exterior before storm season so you have a baseline.", "Inspect from the ground after major hail or wind events and use qualified professionals when a closer inspection is necessary.", "Document damage before temporary repairs when it is safe to do so.", "Understand whether your policy settles roof losses at replacement cost, actual cash value or another basis."),

    h("5. Air conditioning is part of the house's survival system"),
    p("In much of Texas, cooling is not a convenience for a few hot afternoons. It is the system that carries the house through months of heat. That makes preventive service, filters, condensate drainage, airflow and basic envelope maintenance more important than in milder climates."),
    p("The warning sign worth noticing is change. A room that suddenly becomes harder to cool, a system that cycles differently, new water around the air handler or an abrupt rise in energy use can be more informative than one high summer bill by itself."),

    h("6. Electricity plans should be modeled with your real usage"),
    p("In competitive retail areas, the cheapest-looking electricity plan can become expensive when bill credits, minimum-use fees or time-of-use rules interact with your actual consumption. Read the Electricity Facts Label and compare the plan across a full year of realistic kilowatt-hour use."),
    list("Use low-, middle- and high-usage months.", "Check every bill-credit threshold.", "Include base and delivery charges.", "Account for pools, electric vehicles and electric heating if they materially change load.", "Pay attention to contract expiration month and early termination terms."),

    h("7. Water systems differ dramatically across Texas"),
    p("A house may use city water, a municipal utility district, a rural water supply corporation or a private well. Wastewater may run to a public sewer or an on-site septic system. Those differences change maintenance obligations, outage planning and the records a buyer should verify."),
    p("Well owners should know the pump, pressure equipment, electrical supply and water-testing routine. Septic owners should know the system type, permit records, service requirements and where the components are located before landscaping or construction begins."),

    h("8. Pools are mechanical systems, not just backyard features"),
    p("A Texas pool adds pumps, filtration, sanitation, freeze protection, electrical equipment, water chemistry and substantial seasonal electricity use. It also becomes part of storm preparation and winter planning."),
    list("Know which equipment must run or drain during a freeze under the manufacturer's instructions.", "Keep a simple record of pump schedules, filter cleaning and chemical trends.", "Inspect for leaks before assuming evaporation explains every water-level change.", "After major storms, remove debris carefully and inspect equipment before normal operation.", "Treat pool electricity use as part of the household load when comparing retail plans."),

    h("9. Insurance should be reviewed before a claim exists"),
    p("Texas homeowners face different combinations of wind, hail, tornado, freeze, wildfire and tropical risk depending on region. Flood insurance is generally separate from a standard homeowners policy, and coastal wind coverage can involve additional market structures."),
    p("A useful annual insurance review checks deductibles, roof-loss terms, dwelling limits, personal-property documentation, liability coverage and major exclusions. Keep the declarations page and carrier contact information somewhere accessible even if the home loses power or internet service."),

    h("10. Build the emergency file before the emergency"),
    p("The best disaster paperwork is created on an ordinary afternoon. A simple home file can shorten insurance claims, contractor conversations and emergency decisions because the information already exists."),
    list("Current photos or video of every major room and the exterior.", "Serial numbers and receipts for expensive equipment when practical.", "Roof, HVAC, water-heater and major appliance installation dates.", "Insurance declarations and claim contact information.", "Utility account information and emergency numbers.", "Location of water, electrical and other shutoffs household members may need to access safely."),

    h("11. Wildlife is normal; food-conditioning wildlife is the problem"),
    p("Deer, armadillos, raccoons, opossums, coyotes, snakes, bats and other wildlife live surprisingly close to Texas neighborhoods. The safest response is usually to reduce attractants and preserve distance rather than trying to remove every animal that crosses a yard."),
    list("Keep pet food indoors when possible.", "Secure garbage and clean repeated food sources.", "Supervise small pets, especially near dusk and dawn in wildlife corridors.", "Never handle an unfamiliar snake or grounded bat.", "Close structural entry points only after confirming an animal is not trapped inside."),

    h("12. Pest pressure is seasonal and regional"),
    p("Termites, mosquitoes, fire ants, scorpions, rodents and other household pests do not affect every part of Texas equally. Moisture, vegetation, construction type and region matter. The most reliable pest strategy begins with exclusion and moisture control before routine chemical treatment becomes the default answer."),
    list("Repair leaks and persistent damp areas.", "Seal obvious structural entry points.", "Avoid storing firewood directly against the house.", "Eliminate standing water where mosquitoes can breed.", "Use licensed professionals when treatment involves structural termites or another problem that requires specialized diagnosis."),

    h("13. Trees can protect a house and threaten it"),
    p("Shade can materially reduce heat exposure, but poorly maintained trees can damage roofs, fences and utility lines during storms. Roots, irrigation and soil moisture can also interact with drainage and foundations."),
    p("Tree work involving large limbs, heights or utilities belongs with qualified professionals. Keep records of major removals and inspections when a tree's condition could later become an insurance or property-disclosure question."),

    h("14. The yearly rhythm matters more than a giant checklist"),
    p("A Texas homeowner does not need fifty chores every month. The practical cycle is to prepare cooling before heat, drainage before storm season, plumbing and outdoor systems before freezes, and records before insurance claims. The maintenance calendar linked from this guide turns that principle into manageable monthly work."),

    h("15. When buying, verify the systems—not just the finishes"),
    p("Fresh paint and a remodeled kitchen are easy to see. The expensive Texas questions are often hidden in the roof age, foundation history, drainage, HVAC condition, insurance eligibility, utility territory, school assignment, special-district debt and flood exposure."),
    list("Ask for permits, invoices and warranties for major work.", "Verify property-tax and special-district information independently.", "Request insurance quotes before the option period ends when timing allows.", "Confirm school assignments directly with the district.", "Use inspection findings to decide what deserves specialist review rather than treating the general inspection as the final word."),

    h("The operating principle: know what changed"),
    p("Houses usually tell you when something is changing. Doors begin sticking. A room becomes harder to cool. Water ponds in a new place. A pump runs longer. A roof loses material after a storm. A utility bill changes without an obvious weather explanation."),
    p("The strongest Texas homeowner habit is not perfection. It is having enough baseline information to notice those changes early, know which system they belong to and reach the right official source or qualified professional before a small problem becomes an expensive one."),
  ],
};
