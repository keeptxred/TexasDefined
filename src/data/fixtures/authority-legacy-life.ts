import type { Article, ArticleBlock, ArticleInternalLink } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

interface AuthorityPatch {
  dek?: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  links: ArticleInternalLink[];
  blocks: ArticleBlock[];
}

const patches: Record<string, AuthorityPatch> = {
  "moving-to-houston-address-checklist": {
    dek: "Moving to Houston is an address-level decision. Flood history, drainage, taxing units, schools, utilities, insurance and the real commute can change within a few miles—and sometimes across a street.",
    tags: ["moving to houston", "houston relocation", "houston flood risk", "houston property taxes", "houston MUD", "houston commute", "houston utilities"],
    sourceName: "Harris County Flood Education Mapping Tool",
    sourceUrl: "https://www.harriscountyfemt.org/",
    links: [
      { href: "/moving-to-texas", label: "Moving to Texas", description: "Start with the statewide framework for taxes, insurance, utilities, schools and regional differences." },
      { href: "/find-my-school-district", label: "Find my school district", description: "Verify the district tied to the exact address instead of relying on the mailing city." },
      { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Estimate electricity, water, wastewater, gas, internet and trash at the household level." },
      { href: "/article/muds-pids-hoas-special-districts-texas", label: "MUDs, PIDs, HOAs and special districts", description: "Understand the local entities that can materially change a Houston-area housing budget." },
      { href: "/browse/counties", label: "Compare Houston-area counties", description: "Review Harris, Fort Bend, Montgomery, Brazoria, Galveston and surrounding counties before narrowing neighborhoods." },
      { href: "https://www.harriscountyfemt.org/", label: "Harris County Flood Education Mapping Tool", description: "Address-level floodplain, watershed and ponding information for Harris County." },
      { href: "https://www.tdi.texas.gov/consumer/storms/flood-insurance.html", label: "Texas Department of Insurance flood guide", description: "Official guidance on flood coverage, flood zones and why homeowners policies usually do not cover flooding." },
      { href: "https://comptroller.texas.gov/transparency/local/special-purpose.php", label: "Texas Comptroller special-purpose districts", description: "State information on the local districts that may levy taxes, fees or debt-supported charges." },
    ],
    blocks: [
      h("Houston is not one housing market with one set of rules"),
      p("People moving from outside Texas often search for ‘Houston’ as though the metro were a single municipal system. It is not. The region sprawls across incorporated cities, unincorporated county areas, master-planned communities, school districts, municipal utility districts, emergency-service districts and multiple counties. A postal address that says Houston may not be inside Houston city limits, and two homes with the same mailing city can have different taxes, schools, water providers and flood exposure."),
      p("That is why neighborhood rankings are a weak starting point for relocation. The correct unit of analysis is the exact address. Every serious comparison should begin by building what amounts to a jurisdiction stack: county, city or unincorporated status, school district, appraisal district, utility districts, emergency-service districts, HOA, floodplain, watershed, utility providers and the roads that connect the house to daily life."),
      h("Do a flood review in layers, not with one map"),
      p("A FEMA flood zone is essential information, but it is not the whole Houston flood story. The Texas Department of Insurance notes that flooding can occur outside designated high-risk zones and that most homeowners policies do not cover flood damage. Harris County’s Flood Education Mapping Tool adds local floodplain, watershed and ponding information that can make an address-level review more useful than simply asking whether a listing is ‘in the floodplain.’"),
      p("For each property, look at mapped floodplain status, nearby bayous or drainage channels, local ponding information where available, street elevation, visible drainage, detention facilities and any known history of water entering the structure or garage. Ask the seller or landlord direct questions. During a showing after rain, look at curb lines, storm drains, swales and places where water appears to collect. A house can avoid riverine flooding and still sit on a street that drains poorly."),
      p("Insurance belongs in the research phase, not after the offer is emotionally settled. Obtain homeowners and flood quotes for the exact address. Compare deductibles as well as premiums, especially wind and hail deductibles that may be percentage-based. On the Gulf Coast side of the metro, wind coverage questions can become more important. The cheapest policy is not necessarily the cheapest risk."),
      h("Read the drainage system around the neighborhood"),
      p("Houston’s flat terrain means drainage infrastructure carries enormous weight. Bayous, channels, detention basins, roadside ditches, storm sewers and neighborhood grading all work together. New construction can look reassuring because streets and detention areas are engineered, but a buyer still needs to understand where water is designed to go and what happens when rainfall exceeds design assumptions."),
      p("Drive the neighborhood beyond the front entrance. Look for detention ponds, channel crossings, low spots, underpasses and feeder-road depressions. Ask whether access roads flood before houses do. A home that stays dry but becomes difficult to reach during major rainfall presents a different kind of resilience problem."),
      h("The tax bill is a stack of local governments"),
      p("Houston-area property taxes can include county, school district, city, municipal utility district, emergency-service district and other local entities. The Texas Comptroller maintains information on special-purpose districts because thousands of such governments operate across the state. In newer suburban areas, MUD debt and tax rates can be a meaningful part of the housing cost even when the base purchase price looks attractive."),
      p("Never compare homes using only the seller’s current tax bill. Exemptions, appraisal history and prior ownership can distort the number. Identify every taxing unit attached to the parcel, then estimate the likely bill based on the expected value and the exemptions you realistically qualify for. If a development advertises a low city tax or no city tax, that does not mean the address has a low total tax burden."),
      h("Utilities can change at subdivision boundaries"),
      p("Electricity, water, wastewater, natural gas, trash and internet should be verified one service at a time. Much of the Houston region participates in Texas’s competitive retail electricity market, but that does not mean every address has identical choices or rates. Water may come from the City of Houston, another municipality, a MUD or a different utility. Some outer-area properties use wells or septic systems."),
      p("Ask for historical utility usage when it is available, but treat it as evidence about the previous household, not a guaranteed budget for yours. Pool pumps, irrigation, electric resistance heat, EV charging, older HVAC equipment, home size and thermostat habits can overwhelm neighborhood averages. The useful question is not ‘What are utilities in Houston?’ It is ‘What does this house consume and what will my household change?’"),
      h("Commute to the job center you actually use"),
      p("Houston’s employment geography is unusually dispersed. Downtown is only one node. The Texas Medical Center, Uptown, Greenway, the Energy Corridor, the Ship Channel, airports and suburban employment centers each create their own commute logic. A house that looks central on a regional map can still produce a difficult daily trip if the relevant freeway interchange or toll-road access is wrong."),
      p("Test the route during the hour you will actually travel. Include school drop-off, toll costs, parking and a backup route. Pay attention to bridges, low spots and underpasses that can become chokepoints during heavy rain. If hybrid work is part of the plan, calculate how many bad commutes per week you are willing to buy in exchange for more house or a different school district."),
      h("School district and campus are two separate checks"),
      p("Houston-area school district boundaries do not follow city names cleanly. A Houston mailing address can fall in Houston ISD, Katy ISD, Cy-Fair ISD, Alief ISD, Spring Branch ISD, Fort Bend ISD or another district depending on location. Then campus assignment adds another layer. Verify both the district and the assigned schools from official district information for the exact address."),
      p("In high-growth areas, ask about rezoning, new campuses and attendance-boundary changes. A real-estate listing should never be treated as the final authority on future school assignment. If a particular campus matters to the move, the buyer should verify it directly and understand that boundaries can change."),
      h("Do the 60-minute address audit before falling in love with the house"),
      list(
        "Confirm county, municipality or unincorporated status and school district.",
        "List every taxing unit, MUD, PID, HOA and recurring assessment.",
        "Check Harris County or applicable county flood tools, FEMA mapping and local drainage context.",
        "Request homeowners and flood insurance quotes for the exact structure.",
        "Verify water, wastewater, electricity, gas, trash and internet providers.",
        "Estimate property taxes at the expected purchase value rather than using the seller’s bill.",
        "Drive the work commute at peak time and price tolls and parking.",
        "Drive the neighborhood after rain if possible and inspect drainage, detention and access routes.",
        "Check planned roads, schools, drainage projects and nearby large developments that could change the area."
      ),
      h("How to compare two Houston homes without fooling yourself"),
      p("Build one spreadsheet row per address and force every cost into the same monthly frame: mortgage principal and interest, estimated property tax, homeowners insurance, flood insurance, HOA, district assessments, electricity, water, wastewater, gas, tolls, parking and a maintenance reserve. Then add the nonfinancial costs: commute minutes, storm access, school confidence and how dependent the household is on one freeway."),
      p("Houston rewards this kind of discipline because the metro offers so many legitimate tradeoffs. A lower-priced home farther out may come with newer construction and a higher district tax. An older close-in home may save commute time but require more maintenance or carry different drainage questions. A property outside city limits may avoid one jurisdiction while adding another. There is no universal best answer—only addresses whose complete systems fit a particular household better."),
      p("That is the central relocation lesson: do not move to a neighborhood name. Move to an address after you understand what the address is attached to."),
    ],
  },

  "texas-native-garden-that-survives-august": {
    dek: "A Texas garden survives August because it was designed months earlier for the right soil, roots, shade, irrigation and region—not because somebody watered harder after the leaves started burning.",
    tags: ["texas native plants", "texas landscaping", "drought tolerant plants", "texas xeriscape", "fall planting texas", "texas garden heat", "water wise landscape"],
    sourceName: "Texas A&M AgriLife Extension — Xeriscape: Landscape Water Conservation",
    sourceUrl: "https://agrilifeextension.tamu.edu/asset-external/xeriscape-landscape-water-conservation/",
    links: [
      { href: "/texas-life/home-garden", label: "Texas home and garden", description: "Browse practical TexasDefined guides for landscapes, yards and home maintenance." },
      { href: "/article/bluebonnet-season-field-guide", label: "Chasing bluebonnet season", description: "See how native wildflowers fit their own planting calendar and regional conditions." },
      { href: "https://agrilifeextension.tamu.edu/asset-external/xeriscape-landscape-water-conservation/", label: "AgriLife xeriscape guide", description: "Research-based Texas guidance on planning, soil, plants, irrigation, mulch and water-efficient maintenance." },
      { href: "https://agrilifeextension.tamu.edu/asset-external/easy-gardening-mulching/", label: "AgriLife mulching guide", description: "How mulch reduces evaporation, suppresses weeds and protects Texas garden soil." },
      { href: "https://aggie-horticulture.tamu.edu/", label: "Aggie Horticulture", description: "Texas A&M horticulture resources for region-specific plants, soils, turf and landscape care." },
    ],
    blocks: [
      h("There is no single Texas native garden"),
      p("The phrase ‘Texas native’ is useful and dangerous at the same time. Texas is large enough to contain Piney Woods, Gulf Coast prairie, Blackland clay, limestone Hill Country, South Texas brush, High Plains, Panhandle canyons and Chihuahuan Desert. A plant native to one of those systems can fail badly in another. Native status is a starting point; site match is the decision."),
      p("Before buying plants, identify four things: sun hours, drainage, soil behavior and irrigation reality. A west-facing bed beside brick can be dramatically hotter than the rest of the yard. Heavy clay may hold water for days after a storm. Thin limestone soil may drain almost immediately. A plant label that says ‘full sun’ cannot tell you whether the plant wants Houston humidity, Lubbock wind or Hill Country alkalinity."),
      h("August failure usually begins in spring"),
      p("The plant that collapses in August may have been doomed when it was installed in late May with a small root ball, surrounded by compacted soil and watered shallowly every day. Heat exposes weak establishment; it does not always create it. Texas A&M AgriLife emphasizes planning, soil preparation, plant selection, irrigation and mulch because water efficiency is a system, not a product category."),
      p("Fall planting is one of the strongest advantages Texas gardeners can use. In much of the state, cooler air and still-warm soil allow roots to establish before the next hot season. Trees, shrubs, many perennials and grasses can enter spring with a larger root system than comparable plants installed right before summer."),
      h("Build the garden in layers"),
      p("A resilient landscape starts with structure rather than flowers. Trees determine future shade and cooling. Shrubs create mass and wind buffering. Grasses and perennials fill the middle layer. Groundcovers and mulch protect soil. Seasonal color becomes the final layer instead of the entire design."),
      list(
        "Canopy: region-appropriate shade trees placed with mature size, utilities and foundations in mind.",
        "Framework: evergreen and deciduous shrubs that tolerate the site without constant shearing.",
        "Perennials and grasses: plants selected for bloom, habitat, texture and the actual sun and soil.",
        "Ground plane: mulch, low groundcovers or reduced turf to keep bare soil from baking.",
        "Seasonal layer: annuals and temporary color used where irrigation and maintenance can support them."
      ),
      h("Mulch is climate control for soil"),
      p("AgriLife’s mulching guidance is simple but powerful: mulch slows evaporation, suppresses weeds and protects soil. In a Texas summer, that means the root zone experiences less extreme drying between irrigation cycles. Organic mulch also breaks down gradually and improves the surface soil."),
      p("More is not always better. Keep mulch away from trunks and woody crowns rather than piling it into volcanoes. The goal is to cover soil, not bury the plant. Refresh depth as material decomposes and avoid creating a constantly wet collar around plants that need good airflow."),
      h("Water deeply enough to train roots downward"),
      p("Frequent shallow watering can create a root system concentrated near the hottest part of the soil. Established landscapes generally perform better when irrigation wets the intended root zone and then allows appropriate drying, though exact frequency varies by soil, plant, season and local watering restrictions. New plants need a different schedule from established ones, and containers are a separate category entirely."),
      p("Check irrigation instead of trusting the controller. Broken spray heads, tilted rotors, clogged drip emitters and runoff onto pavement can waste more water than a schedule adjustment saves. Use simple catch-can checks where appropriate, inspect drip lines physically and change seasonal settings instead of letting a spring program run unchanged into August."),
      h("Hydrozone the yard"),
      p("One of the most practical xeriscape ideas is grouping plants by water need. Put thirstier plants where irrigation is easy and justified. Keep drought-adapted plants together so they are not drowned to satisfy a neighboring hydrangea. Separate turf irrigation from shrub beds when possible. A landscape becomes easier to manage when one valve is not responsible for plants with opposite expectations."),
      h("Choose plants by Texas region, not by Instagram"),
      p("In Central Texas and the Hill Country, plants adapted to alkaline soils and periodic drought often outperform generic nursery selections. Along the Gulf Coast, drainage, humidity and disease pressure matter more. In East Texas, acidic soils and higher rainfall change the palette. North Texas must handle both summer heat and sharper winter cold. West Texas and the Panhandle add wind, low humidity and, in many areas, large temperature swings."),
      p("Local AgriLife Extension offices and regional plant lists are more useful than a statewide ‘top ten natives’ graphic because they can narrow recommendations to county-scale conditions. The authority move is to choose fewer plants that are genuinely suited to the site rather than collecting one of everything labeled Texas-friendly."),
      h("Turf should have a job"),
      p("Grass is not automatically bad, but irrigated turf is expensive to maintain where nobody uses it. Keep lawn where it serves play, pets, walking, visual relief or erosion control. Convert narrow strips, steep slopes and isolated corners that are difficult to irrigate efficiently. A smaller healthy lawn surrounded by durable beds often uses less water and looks more intentional than a large stressed lawn with decorative plants around the edges."),
      h("What to do when August has already arrived"),
      list(
        "Stop planting large amounts of new material during extreme heat unless there is a compelling reason and a realistic establishment plan.",
        "Check soil moisture below the surface before assuming every wilted plant needs more water.",
        "Repair irrigation failures and redirect water that is hitting pavement or fences.",
        "Restore mulch where soil is exposed, keeping it off trunks and crowns.",
        "Delay major pruning that stimulates tender growth during severe heat unless safety or damage requires it.",
        "Take notes on what failed and why. August is a diagnostic month for next fall’s redesign."
      ),
      h("The best Texas garden is designed backward from August"),
      p("Spring sells plants because spring makes almost everything look possible. August reveals whether the design understood Texas. A resilient landscape is not brown gravel with three agaves, and it is not a lush imported garden kept alive by panic irrigation. It is a site-specific system that uses shade, roots, mulch, efficient water and plants matched to the region."),
      p("Design for the hottest ordinary month and the garden will usually look better in the easy months too."),
    ],
  },
};

export function enrichLegacyLifeArticle(article: Article): Article {
  const patch = patches[article.slug];
  if (!patch) return article;
  const links = [...(article.internalLinks ?? [])];
  for (const link of patch.links) {
    if (!links.some((existing) => existing.href === link.href)) links.push(link);
  }
  return {
    ...article,
    dek: patch.dek ?? article.dek,
    tags: [...new Set([...article.tags, ...patch.tags])],
    sourceName: patch.sourceName,
    sourceUrl: patch.sourceUrl,
    internalLinks: links,
    body: [...article.body, ...patch.blocks],
  };
}
