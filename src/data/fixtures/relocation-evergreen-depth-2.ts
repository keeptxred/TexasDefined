import roadTrip from "@/assets/road-trip.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const hero: Article["hero"] = { src: roadTrip, alt: "A Texas highway leading toward a new city and a new home", width: 1600, height: 1067 };

const base = (
  record: Omit<Article, "id" | "brandId" | "hero" | "authorId" | "relatedCollections" | "relatedDestinations">,
  id: string,
): Article => ({
  id,
  brandId: "texasdefined",
  hero,
  authorId: "a-hollis",
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

const houston = base({
  slug: "moving-to-houston-address-checklist",
  title: "Moving to Houston: The Address Checklist",
  dek: "Flood history, drainage, taxing units, utilities, insurance and commute can change block by block across the Houston region.",
  category: "moving-to-texas",
  region: "gulf-coast",
  publishedAt: "2026-07-23",
  readingMinutes: 12,
  tags: ["houston", "relocation", "flood risk", "property taxes"],
  internalLinks: [
    { href: "/moving-to-texas", label: "Moving to Texas", description: "Use the statewide relocation framework before narrowing the decision to Greater Houston." },
    { href: "/browse/counties", label: "Compare Texas counties", description: "Check Harris, Fort Bend, Montgomery, Brazoria, Galveston and other Houston-area county references." },
    { href: "/find-my-school-district", label: "Find a Texas school district", description: "Verify the district tied to the exact address instead of assuming the city or mailing name determines schools." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Build a household estimate for electricity, water, wastewater, gas, internet and trash." },
    { href: "/article/muds-pids-hoas-special-districts-texas", label: "MUDs, PIDs, HOAs and special districts", description: "Understand the local districts and assessments that can materially change a Houston-area housing budget." },
    { href: "https://www.harriscountyfws.org/", label: "Harris County Flood Warning System", description: "Official rainfall, channel-status, inundation and address-search tools from the Harris County Flood Control District." },
    { href: "https://www.houstonpublicworks.org/utility-billing", label: "Houston Public Works utility billing", description: "Official City of Houston water and wastewater billing, service and residential charge-calculator information." },
    { href: "https://hcad.org/", label: "Harris Central Appraisal District", description: "Official property, exemption and appraisal information for Harris County addresses." },
  ],
  body: [
    p("Moving to Houston is an address-level decision. A listing may say Houston while the property sits in a different municipality, an unincorporated area, another school district or a utility district with its own taxes and services. Two houses with similar prices and similar drive times can produce very different insurance, flood, tax, utility and commuting costs."),
    h("Start with the exact jurisdiction stack"),
    p("For every candidate address, write down the county, municipality or unincorporated status, school district, appraisal district, emergency-service districts, MUD or other special districts and HOA. Do not use the postal city name as a substitute. The jurisdiction stack determines who taxes the property, who provides services and where official records must be checked."),
    h("Treat flooding as more than one map color"),
    p("FEMA flood zones are important, but a Houston-area flood review should also consider street flooding, bayou or channel proximity, drainage, prior water entry and local projects. Harris County Flood Control District's Flood Warning System provides rainfall, channel-status and inundation tools, including address search. Use current official mapping and ask direct questions about the individual structure rather than treating one countywide reputation as the answer."),
    p("For buyers, obtain homeowners and flood-insurance quotes early enough that the real premium and deductible can affect the purchase decision. For renters, ask about prior flooding, parking exposure and what the lease requires during storms. Insurance and drainage can change substantially between nearby neighborhoods."),
    h("Houston-area taxes can hide in special districts"),
    p("Newer suburban communities frequently use municipal utility districts and other local entities to finance water, wastewater, drainage and development infrastructure. List every taxing unit and assessment tied to the parcel, then estimate taxes at the expected purchase value rather than carrying forward the seller's current bill. A lower purchase price can be offset by a different tax stack."),
    h("Verify each utility provider"),
    p("City of Houston water and wastewater service applies only where Houston Public Works serves the address; surrounding properties may use another city, utility district, private provider, well or septic system. Confirm electricity, water, wastewater, gas, trash and internet one by one. Ask for historical usage when available and separate provider rates from the amount a previous household happened to consume."),
    h("Commute from the address to the real job center"),
    p("Houston employment is distributed across Downtown, the Texas Medical Center, Uptown, the Energy Corridor, the Ship Channel, airports and suburban centers. Test the exact route during the hour the household will actually travel. Include toll roads, parking, school drop-off, flood-prone route segments and a backup route instead of judging a location by freeway distance alone."),
    h("School boundaries deserve direct verification"),
    p("Houston-area school districts cross city and county assumptions in ways that surprise newcomers. Verify the serving district and assigned campuses from official district information for the exact address. In high-growth areas, ask about current rezoning or new-campus plans rather than assuming today's assignment is permanent."),
    h("Build one comparison sheet for every address"),
    list(
      "County, municipality or unincorporated status and school district.",
      "MUD, PID, HOA and every other recurring tax, assessment or fee.",
      "Flood-zone, drainage and prior-water-entry questions plus insurance quotes.",
      "Electricity, water, wastewater, gas, trash and internet providers.",
      "Peak-hour commute, tolls, parking and backup route.",
      "Property-tax estimate at the expected purchase value.",
      "Major planned drainage, road, school or development projects nearby."
    ),
    p("Houston relocation becomes much easier when every candidate home is treated as a bundle of jurisdictions, infrastructure and daily routes. The neighborhood name is useful for orientation; the exact address is what determines the household's real obligations."),
  ],
}, "migration-relocation-depth-2-houston");

const sanAntonio = base({
  slug: "moving-to-san-antonio-guide",
  title: "Moving to San Antonio",
  dek: "How to compare Bexar-area commutes, city boundaries, school districts, CPS Energy, SAWS and fast-growing suburban corridors.",
  category: "moving-to-texas",
  region: "south-texas",
  publishedAt: "2026-07-23",
  readingMinutes: 11,
  tags: ["san antonio", "relocation", "utilities", "commute"],
  internalLinks: [
    { href: "/moving-to-texas", label: "Moving to Texas", description: "Start with the statewide relocation framework before comparing San Antonio-area addresses." },
    { href: "/browse/counties", label: "Compare Texas counties", description: "Check Bexar, Comal, Guadalupe and surrounding county references and official local resources." },
    { href: "/find-my-school-district", label: "Find a Texas school district", description: "Verify the district serving an address rather than assuming city and district boundaries match." },
    { href: "/texas-cost-of-living-calculator", label: "Texas cost-of-living calculator", description: "Compare recurring household-cost assumptions across candidate Texas locations." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Model electricity, gas, water, wastewater, internet and trash before choosing an address." },
    { href: "https://www.cpsenergy.com/content/corporate/en/my-home/savings-programs/rate_estimator_residential.html", label: "CPS Energy residential bill estimator", description: "Official San Antonio-area electric and gas bill estimator using expected household usage." },
    { href: "https://www.saws.org/service/water-sewer-rates/", label: "SAWS water and sewer rates", description: "Official 2026 San Antonio Water System residential water, sewer, fees and rate information." },
    { href: "https://www.viainfo.net/", label: "VIA Metropolitan Transit", description: "Official San Antonio transit routes, schedules, trip planning, fares and service information." },
  ],
  body: [
    p("Moving to San Antonio usually means comparing a regional network of city neighborhoods, military communities and fast-growing suburban corridors rather than choosing one simple urban core. Bexar County dominates the map, but household trips and development extend toward Comal and Guadalupe counties and communities such as Boerne, New Braunfels, Schertz and Cibolo."),
    h("Start with the household's repeated destinations"),
    p("Map work, school, childcare, medical care, military access and family obligations before choosing a side of the metro. Downtown, the Medical Center, Joint Base San Antonio installations, Port San Antonio and the I-10 and I-35 employment corridors create very different commute patterns. Test the actual route at the time it will be driven."),
    h("City limits, mailing address and school district can differ"),
    p("A San Antonio mailing label does not by itself establish that a property is inside San Antonio city limits or that it receives city services. Confirm municipality, county, school district and special districts for the exact parcel. This is particularly important on the fast-growing north, west and northeast edges of the region."),
    h("Verify CPS Energy and SAWS service instead of assuming it"),
    p("CPS Energy supplies electric and gas service across a large part of the San Antonio area, and its official residential estimator allows a household to model bills from expected usage. SAWS publishes current water and sewer rates and uses tiered pricing that makes consumption important. But neither utility serves every address in the broader metro, so confirm the actual provider before carrying a city assumption into a suburb or unincorporated area."),
    h("Put special districts and property taxes beside the mortgage"),
    p("Rapid-growth communities can carry MUDs, PIDs, emergency-service districts, HOA dues or other recurring charges in addition to county, school and municipal taxes. List the complete stack for each address and estimate the tax bill at the expected purchase value. This makes an older neighborhood and a new subdivision comparable on the same basis."),
    h("School districts cross familiar city boundaries"),
    p("The region includes multiple independent school districts, and city boundaries do not determine school assignment. Verify the district and assigned campuses for the property using official district information. In expanding corridors, ask about planned schools and boundary processes as well as the current assignment."),
    h("Transit works when the specific trip works"),
    p("VIA Metropolitan Transit provides route, schedule and trip-planning information across its service area. Use the actual home-to-destination trip rather than judging transit access by the nearest bus stop. Include the walk, wait, transfer and operating-hours portions of the trip."),
    h("Military households need an extra address test"),
    p("For households tied to Joint Base San Antonio, gate access and installation location can matter as much as mileage. Lackland, Fort Sam Houston and Randolph are on different sides of the region. Check the exact daily destination, school and medical needs before choosing a home based only on a generic distance to 'the base.'"),
    h("A practical San Antonio comparison sheet"),
    list(
      "County, municipality, school district and special districts.",
      "Actual CPS Energy, SAWS or alternative utility providers.",
      "Property taxes, HOA dues and district assessments.",
      "Peak-hour commute and the household's specific military or employment gate if relevant.",
      "VIA trip from the address to the regular destination.",
      "Insurance, drainage and major home-specific operating costs.",
      "Known road, school and development projects around the property."
    ),
    p("San Antonio is easiest to compare when the decision is built around systems rather than neighborhood reputation. The right address is the one where daily travel, schools, utilities, taxes and services fit the household's real routine."),
  ],
}, "migration-relocation-depth-2-san-antonio");

const elPaso = base({
  slug: "moving-to-el-paso-guide",
  title: "Moving to El Paso",
  dek: "Choose the right side of the mountain, plan vehicle registration and emissions, and budget for desert utilities and Fort Bliss access.",
  category: "moving-to-texas",
  region: "big-bend",
  publishedAt: "2026-07-23",
  readingMinutes: 11,
  tags: ["el paso", "relocation", "fort bliss", "desert living"],
  internalLinks: [
    { href: "/moving-to-texas", label: "Moving to Texas", description: "Use the statewide relocation checklist before narrowing the move to El Paso." },
    { href: "/browse/counties", label: "Compare Texas counties", description: "Open the El Paso County reference and official local information." },
    { href: "/find-my-school-district", label: "Find a Texas school district", description: "Verify the district and campus assignment for a candidate address." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Build a desert-household estimate for electricity, water, wastewater, internet and trash." },
    { href: "https://www.txdmv.gov/motorists/register-your-vehicle", label: "TxDMV vehicle registration", description: "Official Texas registration guidance, including the continuing emissions-inspection requirement for non-commercial vehicles registered in El Paso County." },
    { href: "https://www.epwater.org/business/billing-and-rates/rates-and-fees", label: "El Paso Water rates and fees", description: "Official 2026 water, wastewater, stormwater, deposit and service-charge information." },
    { href: "https://sunmetro.net/", label: "Sun Metro", description: "Official El Paso transit trip planner, routes, schedules, fares and service alerts." },
  ],
  body: [
    p("El Paso is geographically different from Texas's larger central and eastern metros. The Franklin Mountains split travel patterns, Fort Bliss occupies a major part of the region, the international border shapes daily life and the desert climate changes how households think about water, cooling and outdoor space. Choosing the right side of town can matter more than a small difference in home price."),
    h("Map the daily destination around the mountain"),
    p("Start with the place the household must reach most often: Fort Bliss, Downtown, UTEP, a hospital, a port of entry, the airport or a school. A route that appears short in straight-line distance can behave differently when it crosses the Franklin Mountains, funnels through a limited corridor or meets military-gate traffic. Test the trip at the actual hour."),
    h("Confirm vehicle and emissions requirements before the move"),
    p("Texas no longer requires a routine safety inspection for most non-commercial vehicle registrations, but TxDMV currently lists El Paso County among the counties where a passing emissions inspection is still required before registration. A relocating household should verify the current registration, title and emissions steps instead of relying on older Texas inspection advice."),
    h("Water belongs in the housing budget"),
    p("El Paso Water publishes current water, wastewater and stormwater rates and uses a rate structure tied in part to consumption and average winter use. The utility also publishes deposits and fixed charges. Ask for historical water use when available, note the property's landscaping and irrigation, and compare the current official rate structure instead of applying a statewide average."),
    h("Cooling, shade and orientation matter in a desert home"),
    p("Two similar-size houses can use different amounts of electricity because of insulation, windows, orientation, cooling equipment, shade and thermostat habits. Verify the HVAC type and age, window exposure and any evaporative-cooling equipment. Treat a pool, large irrigated landscape or poorly shaded west-facing glass as a real operating-cost variable."),
    h("School and jurisdiction checks still happen at the address"),
    p("Verify the municipality, county, school district and assigned campus for the exact property. Military households should also confirm installation access, medical care and any school procedures that matter to their family. Do not assume a neighborhood name answers those questions."),
    h("Transit can change the car requirement for a specific trip"),
    p("Sun Metro provides current routes, schedules, real-time trip planning and service alerts. Test the exact origin and destination before treating transit as a practical replacement for a car. The useful measure is the complete trip—including walking and transfers—not whether a bus route merely passes near the neighborhood."),
    h("Budget for the borderland household, not a Texas average"),
    list(
      "Mortgage or rent plus address-specific property taxes and insurance.",
      "Electricity and cooling assumptions for the actual house.",
      "Current El Paso Water, wastewater and stormwater charges.",
      "Vehicle registration, emissions inspection and commuting costs.",
      "School district, municipal services and any HOA or special-district charges.",
      "Travel time around or through the mountain at the household's actual hours.",
      "Fort Bliss gate, airport or port-of-entry access when those are regular destinations."
    ),
    p("El Paso rewards address-level planning because geography and infrastructure are unusually visible in everyday life. The strongest relocation decision connects the house to the mountain, water system, military or work destination, schools and transportation network before the lease or purchase contract makes those tradeoffs permanent."),
  ],
}, "migration-relocation-depth-2-el-paso");

export const relocationEvergreenDepth2Articles: Article[] = [houston, sanAntonio, elPaso];
