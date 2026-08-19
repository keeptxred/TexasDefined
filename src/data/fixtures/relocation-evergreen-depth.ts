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

const austin = base({
  slug: "moving-to-austin-guide",
  title: "Moving to Austin and Central Texas",
  dek: "Compare total monthly cost, city limits, utility territories, school districts and the real commute across Travis, Williamson and Hays counties.",
  category: "moving-to-texas",
  region: "hill-country",
  publishedAt: "2026-07-23",
  readingMinutes: 11,
  tags: ["austin", "central texas", "relocation", "cost of living"],
  internalLinks: [
    { href: "/moving-to-texas", label: "Moving to Texas", description: "Use the statewide relocation hub before narrowing the decision to Central Texas." },
    { href: "/browse/counties", label: "Compare Texas counties", description: "Check Travis, Williamson and Hays county references and official local resources." },
    { href: "/find-my-school-district", label: "Find a Texas school district", description: "Verify school-district assignment from the address instead of relying on city or mailing names." },
    { href: "/texas-cost-of-living-calculator", label: "Texas cost-of-living calculator", description: "Compare household-cost assumptions before choosing a Central Texas location." },
    { href: "/texas-utility-cost-calculator", label: "Texas utility-cost calculator", description: "Build an address-specific utility budget for electricity, water, wastewater, gas, internet and trash." },
    { href: "https://www.austintexas.gov/services/pay-utility-bill", label: "City of Austin utility billing", description: "Official City of Austin explanation of utility services that may appear on a city utility bill." },
    { href: "https://www.austintexas.gov/water/rates-and-fees", label: "Austin Water rates and fees", description: "Official Austin Water current rate and fee information for customers in its service area." },
    { href: "https://www.capmetro.org/", label: "CapMetro", description: "Official Central Texas transit information, maps, schedules and trip planning." },
  ],
  body: [
    p("Moving to Austin usually means choosing among a much larger Central Texas region, not simply deciding whether to live inside Austin city limits. Jobs, housing, schools, utilities and daily trips spread across Travis, Williamson and Hays counties, and two addresses marketed as 'Austin area' can sit under different cities, school districts, utility providers, tax units and transportation patterns."),
    h("Start with the work and school anchors"),
    p("Choose the places the household must reach repeatedly: work, school, childcare, medical care and family obligations. Then test candidate neighborhoods against those anchors at the times the trips will actually happen. A map distance that looks short late at night can behave very differently during a weekday commute."),
    h("City name and city limits are not the same thing"),
    p("An Austin mailing address does not by itself prove that a property is inside Austin city limits or receives City of Austin services. Confirm the municipality, county, school district and special districts tied to the exact address. This matters for taxes, utility service, permitting, trash collection and other local responsibilities."),
    h("Build the complete monthly housing cost"),
    list(
      "Rent or mortgage principal and interest.",
      "Address-specific property taxes for buyers.",
      "Homeowners or renters insurance.",
      "HOA dues and any MUD, PID or other special-district obligations.",
      "Electricity, water, wastewater, trash, internet and other utilities.",
      "Tolls, parking and the transportation cost created by the chosen location."
    ),
    p("A less expensive home can be a poor trade if it creates a costly daily commute, higher special-district taxes or a utility arrangement the household did not budget for. Compare the complete recurring cost rather than the listing price alone."),
    h("Verify the utility territory before carrying an old bill forward"),
    p("City of Austin utility bills can include electricity, water, wastewater, solid waste, drainage and street-service charges for customers receiving those services. That does not mean every Central Texas address gets the same bundle. Confirm the electric provider, water and wastewater provider, trash service and any separate gas or propane service for the specific property."),
    p("Austin Water publishes current rate and fee information for its customers. On the metro edge, water can come from another city, a utility district, a private system or a well. The provider matters as much as the county name when estimating recurring costs."),
    h("Transit is useful only when both ends of the trip work"),
    p("CapMetro provides bus, rail and other transit services in the Austin region, but a station or bus stop near home does not automatically make a work trip practical. Use the current trip planner for the exact origin, destination and schedule. Include the walk, transfer and first/last-mile portions rather than comparing only in-vehicle time."),
    h("School districts cross familiar city lines"),
    p("Central Texas school-district boundaries do not simply follow municipal boundaries. A home marketed with one city name may attend a district associated with another nearby community. Verify the assigned district and campus through official district tools before signing a lease or purchase contract, especially in fast-growing areas where attendance zones can change."),
    h("Growth can change the infrastructure around the house"),
    p("New subdivisions and road projects can alter traffic, drainage, nearby construction and school assignments. On the metro edge, ask who maintains roads and drainage, how water and wastewater are provided, whether a special district carries debt and what major transportation projects are planned nearby."),
    h("A practical Austin-area comparison sheet"),
    list(
      "County, municipality and whether the property is inside city limits.",
      "School district and current assigned campuses.",
      "Electric, water, wastewater, trash and internet providers.",
      "Property-tax estimate and every special taxing unit or assessment.",
      "Weekday commute at the actual hour, including tolls and parking.",
      "Transit option using the current CapMetro trip planner.",
      "Insurance quote, flood/drainage questions and major home-specific costs."
    ),
    p("Austin-area relocation gets easier when the address is treated as a bundle of systems rather than a neighborhood name. Verify who serves it, who taxes it and how the household will move through the region every week; the right part of Central Texas is the one where those systems fit the household rather than merely the map."),
  ],
}, "migration-relocation-depth-austin");

const dfw = base({
  slug: "moving-to-dallas-fort-worth-guide",
  title: "Moving to Dallas–Fort Worth",
  dek: "Choose the work corridor first, then compare tolls, local governments, school boundaries, utilities and total housing costs.",
  category: "moving-to-texas",
  region: "prairies-lakes",
  publishedAt: "2026-07-23",
  readingMinutes: 12,
  tags: ["dallas", "fort worth", "dfw", "relocation"],
  internalLinks: [
    { href: "/moving-to-texas", label: "Moving to Texas", description: "Start with the statewide relocation framework before narrowing the move to North Texas." },
    { href: "/browse/counties", label: "Compare Texas counties", description: "Check Dallas, Tarrant, Collin, Denton and other North Texas county references." },
    { href: "/find-my-school-district", label: "Find a Texas school district", description: "Verify the district serving a candidate address instead of assuming city and district names match." },
    { href: "/texas-cost-of-living-calculator", label: "Texas cost-of-living calculator", description: "Compare recurring household costs across candidate Texas locations." },
    { href: "/texas-moving-cost-calculator", label: "Texas moving-cost calculator", description: "Estimate the one-time costs of getting the household to North Texas." },
    { href: "https://www.ntta.org/plan-your-trip", label: "NTTA trip and toll planning", description: "Official North Texas Tollway Authority maps, toll roads, trip planning and toll information." },
    { href: "https://www.dart.org/about/about-dart/about-dart/dart-service-area", label: "DART service area", description: "Official Dallas Area Rapid Transit service-area information for its member cities and regional connections." },
    { href: "https://www.dart.org/guide/transit-and-use/dart-schedules-and-maps", label: "DART schedules and maps", description: "Official rail, bus, TRE and trip-planning information for the Dallas-side transit network." },
  ],
  body: [
    p("Dallas–Fort Worth is not a single-center metro where every commute points toward one downtown. Jobs, housing and daily trips spread across Dallas, Fort Worth, Arlington, Irving, Las Colinas, Plano, Richardson, Frisco, the airport area and many other employment centers. A successful move starts with the household's repeated trips, not with a generic list of the metro's best suburbs."),
    h("Choose the work corridor before the neighborhood"),
    p("Map every location the household must reach several times each week. Then drive or model the routes during the actual commute window. A home that is close to a freeway entrance can still create an unpredictable trip when the destination requires crossing several major corridors or using a toll road every day."),
    h("DFW spans many governments and school districts"),
    p("The region crosses multiple large counties, dozens of municipalities and many independent school districts. City boundaries, school boundaries and county lines do not align neatly. Confirm the exact jurisdiction stack for each address before comparing taxes, schools, trash service, permitting and other local services."),
    h("Put tolls into the monthly budget"),
    p("North Texas has an extensive toll-road system. NTTA's network includes major corridors such as the Dallas North Tollway, President George Bush Turnpike, Sam Rayburn Tollway, Chisholm Trail Parkway and 360 Tollway, while TEXpress managed lanes operate on other highways under different operators. A route that is fastest on the map can create a meaningful recurring toll expense."),
    p("Use the official NTTA trip planner or toll calculator for the routes you expect to drive, and model a no-toll alternative as well. TollTag and non-tag billing can also have different rates, so use the payment arrangement the household will actually maintain."),
    h("Transit is regional, but coverage is not universal"),
    p("DART operates rail, bus and other services in its member-city service area and connects to Fort Worth through the Trinity Railway Express. That does not mean every DFW suburb has the same transit access. Verify the exact home-to-work trip on current DART, TRE, Trinity Metro or other relevant agency schedules instead of choosing a community simply because a rail line appears somewhere nearby."),
    h("Airport access can be a real location decision"),
    p("Frequent flyers should test travel time to DFW International Airport and Dallas Love Field at the hours they commonly travel. Airport-oriented households may value different corridors from commuters who travel to Downtown Dallas, Fort Worth, Plano or another employment center."),
    h("Compare the full property-cost stack"),
    list(
      "Mortgage or rent and recurring property fees.",
      "Address-specific property taxes and special districts.",
      "Homeowners or renters insurance.",
      "Electricity, water, wastewater, trash and internet providers.",
      "HOA dues and special assessments where applicable.",
      "Tolls, parking, fuel and vehicle miles created by the location."
    ),
    h("School assignment deserves address-level verification"),
    p("North Texas school districts often cross city boundaries, and a single municipality can contain more than one district. Verify the district and assigned campuses for the exact property using official district information. In fast-growing areas, also ask about planned schools, rezoning processes and current boundary proposals rather than assuming today's assignment can never change."),
    h("Utilities vary across the Metroplex"),
    p("Electric-market options, municipal water and sewer, utility districts and city services differ by address. Do not carry a Dallas utility assumption into a Collin, Denton or Tarrant County suburb without checking the actual provider. A new subdivision can also have district taxes or fees that older nearby neighborhoods do not share."),
    h("A practical DFW comparison sheet"),
    list(
      "Primary work, school and family destinations.",
      "County, municipality, school district and special districts.",
      "Actual peak-hour commute, tolls and parking.",
      "Transit route from the address to the destination—not merely the nearest station.",
      "Property taxes, insurance, utilities and HOA costs.",
      "Airport travel time if flying is a regular part of the household's life.",
      "Known major road, rail, school or development projects around the property."
    ),
    p("The best DFW location is rarely the one with the strongest city reputation in isolation. It is the address whose jurisdiction, commute, toll, school, utility and housing-cost combination fits the household's real weekly geography."),
  ],
}, "migration-relocation-depth-dfw");

export const relocationEvergreenDepthArticles: Article[] = [austin, dfw];
