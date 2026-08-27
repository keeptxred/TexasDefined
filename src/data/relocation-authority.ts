export type RelocationSource = {
  name: string;
  url: string;
  purpose: string;
  freshness: string;
};

export const RELOCATION_SOURCE_VERIFIED = "August 27, 2026";

export const RELOCATION_SOURCES = {
  censusMigration: {
    name: "U.S. Census Bureau — State-to-State Migration Flows",
    url: "https://www.census.gov/data/tables/time-series/demo/geographic-mobility/state-to-state-migration.html",
    purpose: "Latest ACS one-year state-to-state migration flow tables and margins of error.",
    freshness: "2024 ACS flows released January 2026",
  },
  censusCountyMigration: {
    name: "U.S. Census Bureau — State-to-County Migration Flows",
    url: "https://www.census.gov/data/tables/time-series/demo/geographic-mobility/state-to-county-migration.html",
    purpose: "ACS five-year flows showing prior state of residence for people now living in a county.",
    freshness: "2018–2022 ACS five-year flow file",
  },
  censusPopulation: {
    name: "U.S. Census Bureau — Vintage 2025 Population Estimates",
    url: "https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html",
    purpose: "Current consistent Texas population estimate series and components of change. Census revises the full post-2020 series with each vintage, so older vintages should not be mixed with Vintage 2025.",
    freshness: "Vintage 2025 state totals and components released January 27, 2026",
  },
  blsMetro: {
    name: "U.S. Bureau of Labor Statistics — Metropolitan Area Employment",
    url: "https://www.bls.gov/news.release/metro.t03.htm",
    purpose: "Current metropolitan nonfarm payroll employment for Texas labor markets.",
    freshness: "June 2026 preliminary release; July 2026 release scheduled September 2, 2026",
  },
  tdiInsurance: {
    name: "Texas Department of Insurance — Homeowners Insurance Market",
    url: "https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html",
    purpose: "Statewide premium history, insured losses, peril losses and county-level homeowners market data.",
    freshness: "2025 preliminary market data and July 2026 filings",
  },
  teaSchools: {
    name: "Texas Education Agency — Finding a School",
    url: "https://tea.texas.gov/families-and-students/finding-school-your-child/finding-school",
    purpose: "Official district boundaries, school locations, accountability data and school-finder resources.",
    freshness: "Verified August 2026",
  },
  comptrollerProperty: {
    name: "Texas Comptroller — Local Property Appraisal and Tax Information",
    url: "https://comptroller.texas.gov/taxes/property-tax/county-directory/",
    purpose: "County appraisal districts, tax assessor-collector offices and taxing-unit contacts.",
    freshness: "Continuously maintained county directory",
  },
  txdotTraffic: {
    name: "TxDOT — Traffic Count Maps",
    url: "https://www.txdot.gov/data-maps/traffic-count-maps.html",
    purpose: "Statewide traffic counts, GIS count data and STARS II traffic monitoring records.",
    freshness: "Current TxDOT monitoring program",
  },
  txdotDiscos: {
    name: "TxDOT — District and County Statistics (DISCOS)",
    url: "https://www.txdot.gov/data-maps/district-county-statistics-discos.html",
    purpose: "Annual transportation statistics for all 254 Texas counties and 25 TxDOT districts.",
    freshness: "Fiscal Year 2025 dashboard",
  },
  pucUtilities: {
    name: "Public Utility Commission of Texas",
    url: "https://www.puc.texas.gov/",
    purpose: "Official electric, water and sewer utility information and address-searchable utility map viewers.",
    freshness: "Verified August 2026",
  },
  femaFlood: {
    name: "FEMA Flood Map Service Center",
    url: "https://msc.fema.gov/portal/home",
    purpose: "Official National Flood Insurance Program flood maps, FIRM panels and National Flood Hazard Layer data.",
    freshness: "Current effective FEMA mapping",
  },
} satisfies Record<string, RelocationSource>;

export type RelocationMetro = {
  id: string;
  name: string;
  guideHref: string;
  counties: string[];
  places: string[];
  jobMarket: string;
  jobCountJune2026?: number;
  researchNote: string;
};

export const RELOCATION_METROS: RelocationMetro[] = [
  {
    id: "dfw",
    name: "Dallas–Fort Worth",
    guideHref: "/article/moving-to-dallas-fort-worth-guide",
    counties: ["Dallas", "Tarrant", "Collin", "Denton"],
    places: ["Dallas", "Fort Worth", "Frisco", "Plano", "McKinney", "Denton", "Arlington"],
    jobMarket: "Dallas–Fort Worth–Arlington",
    jobCountJune2026: 4_363_300,
    researchNote: "Choose the repeated work corridor first, then test toll exposure, school boundaries, utility providers and the full local tax stack.",
  },
  {
    id: "houston",
    name: "Greater Houston",
    guideHref: "/article/moving-to-houston-address-checklist",
    counties: ["Harris", "Fort Bend", "Montgomery", "Brazoria", "Galveston"],
    places: ["Houston", "Katy", "Sugar Land", "The Woodlands", "Pearland", "Cypress"],
    jobMarket: "Houston–Pasadena–The Woodlands",
    jobCountJune2026: 3_521_500,
    researchNote: "Treat each address as a jurisdiction, drainage, insurance, utility and commute decision rather than relying on the mailing-city name.",
  },
  {
    id: "austin",
    name: "Austin & Central Texas",
    guideHref: "/article/moving-to-austin-guide",
    counties: ["Travis", "Williamson", "Hays"],
    places: ["Austin", "Round Rock", "Georgetown", "Cedar Park", "Pflugerville"],
    jobMarket: "Austin–Round Rock–San Marcos",
    jobCountJune2026: 1_432_100,
    researchNote: "Compare city limits, utility territories, special districts, school boundaries and actual peak-hour travel across the regional job centers.",
  },
  {
    id: "san-antonio",
    name: "San Antonio corridor",
    guideHref: "/article/moving-to-san-antonio-guide",
    counties: ["Bexar", "Comal", "Guadalupe", "Kendall"],
    places: ["San Antonio", "New Braunfels", "Boerne"],
    jobMarket: "San Antonio–New Braunfels",
    jobCountJune2026: 1_196_800,
    researchNote: "Verify the exact utility territory, district stack and repeated commute, especially on fast-growing suburban corridors.",
  },
  {
    id: "el-paso",
    name: "El Paso",
    guideHref: "/article/moving-to-el-paso-guide",
    counties: ["El Paso"],
    places: ["El Paso"],
    jobMarket: "El Paso",
    jobCountJune2026: 365_100,
    researchNote: "The Franklin Mountains, Fort Bliss, desert water use and El Paso County vehicle-emissions rules make address and route selection unusually important.",
  },
];

export type RelocationPlace = {
  name: string;
  metro: string;
  region: "North Texas" | "Gulf Coast" | "Central Texas" | "San Antonio corridor" | "West Texas" | "Panhandle" | "South Texas" | "East Texas";
  setting: "urban" | "suburban" | "small-city";
  planningBand: "value" | "balanced" | "location-first";
  commuteStyle: "core" | "corridor" | "regional";
  climate: "humid" | "central" | "dry" | "coastal";
  counties: string[];
  guideHref: string;
};

export const RELOCATION_PLACES: RelocationPlace[] = [
  { name: "Dallas", metro: "Dallas–Fort Worth", region: "North Texas", setting: "urban", planningBand: "location-first", commuteStyle: "core", climate: "central", counties: ["Dallas"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Fort Worth", metro: "Dallas–Fort Worth", region: "North Texas", setting: "urban", planningBand: "balanced", commuteStyle: "core", climate: "central", counties: ["Tarrant"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Frisco", metro: "Dallas–Fort Worth", region: "North Texas", setting: "suburban", planningBand: "location-first", commuteStyle: "corridor", climate: "central", counties: ["Collin", "Denton"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Plano", metro: "Dallas–Fort Worth", region: "North Texas", setting: "suburban", planningBand: "location-first", commuteStyle: "corridor", climate: "central", counties: ["Collin", "Denton"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "McKinney", metro: "Dallas–Fort Worth", region: "North Texas", setting: "suburban", planningBand: "balanced", commuteStyle: "regional", climate: "central", counties: ["Collin"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Denton", metro: "Dallas–Fort Worth", region: "North Texas", setting: "small-city", planningBand: "balanced", commuteStyle: "regional", climate: "central", counties: ["Denton"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Arlington", metro: "Dallas–Fort Worth", region: "North Texas", setting: "urban", planningBand: "balanced", commuteStyle: "corridor", climate: "central", counties: ["Tarrant"], guideHref: "/article/moving-to-dallas-fort-worth-guide" },
  { name: "Houston", metro: "Greater Houston", region: "Gulf Coast", setting: "urban", planningBand: "balanced", commuteStyle: "core", climate: "humid", counties: ["Harris"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "Katy", metro: "Greater Houston", region: "Gulf Coast", setting: "suburban", planningBand: "balanced", commuteStyle: "corridor", climate: "humid", counties: ["Harris", "Fort Bend", "Waller"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "Sugar Land", metro: "Greater Houston", region: "Gulf Coast", setting: "suburban", planningBand: "location-first", commuteStyle: "corridor", climate: "humid", counties: ["Fort Bend"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "The Woodlands", metro: "Greater Houston", region: "Gulf Coast", setting: "suburban", planningBand: "location-first", commuteStyle: "regional", climate: "humid", counties: ["Montgomery", "Harris"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "Pearland", metro: "Greater Houston", region: "Gulf Coast", setting: "suburban", planningBand: "balanced", commuteStyle: "corridor", climate: "humid", counties: ["Brazoria", "Harris"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "Cypress", metro: "Greater Houston", region: "Gulf Coast", setting: "suburban", planningBand: "balanced", commuteStyle: "regional", climate: "humid", counties: ["Harris"], guideHref: "/article/moving-to-houston-address-checklist" },
  { name: "Austin", metro: "Austin & Central Texas", region: "Central Texas", setting: "urban", planningBand: "location-first", commuteStyle: "core", climate: "central", counties: ["Travis"], guideHref: "/article/moving-to-austin-guide" },
  { name: "Round Rock", metro: "Austin & Central Texas", region: "Central Texas", setting: "suburban", planningBand: "balanced", commuteStyle: "corridor", climate: "central", counties: ["Williamson", "Travis"], guideHref: "/article/moving-to-austin-guide" },
  { name: "Georgetown", metro: "Austin & Central Texas", region: "Central Texas", setting: "small-city", planningBand: "balanced", commuteStyle: "regional", climate: "central", counties: ["Williamson"], guideHref: "/article/moving-to-austin-guide" },
  { name: "Cedar Park", metro: "Austin & Central Texas", region: "Central Texas", setting: "suburban", planningBand: "balanced", commuteStyle: "corridor", climate: "central", counties: ["Williamson", "Travis"], guideHref: "/article/moving-to-austin-guide" },
  { name: "Pflugerville", metro: "Austin & Central Texas", region: "Central Texas", setting: "suburban", planningBand: "balanced", commuteStyle: "corridor", climate: "central", counties: ["Travis", "Williamson"], guideHref: "/article/moving-to-austin-guide" },
  { name: "San Antonio", metro: "San Antonio corridor", region: "San Antonio corridor", setting: "urban", planningBand: "balanced", commuteStyle: "core", climate: "central", counties: ["Bexar"], guideHref: "/article/moving-to-san-antonio-guide" },
  { name: "New Braunfels", metro: "San Antonio corridor", region: "San Antonio corridor", setting: "small-city", planningBand: "balanced", commuteStyle: "regional", climate: "central", counties: ["Comal", "Guadalupe"], guideHref: "/article/moving-to-san-antonio-guide" },
  { name: "Boerne", metro: "San Antonio corridor", region: "San Antonio corridor", setting: "small-city", planningBand: "location-first", commuteStyle: "regional", climate: "central", counties: ["Kendall"], guideHref: "/article/moving-to-san-antonio-guide" },
  { name: "El Paso", metro: "El Paso", region: "West Texas", setting: "urban", planningBand: "value", commuteStyle: "core", climate: "dry", counties: ["El Paso"], guideHref: "/article/moving-to-el-paso-guide" },
  { name: "Corpus Christi", metro: "Corpus Christi", region: "Gulf Coast", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "coastal", counties: ["Nueces"], guideHref: "/moving-to-texas" },
  { name: "Lubbock", metro: "Lubbock", region: "West Texas", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "dry", counties: ["Lubbock"], guideHref: "/moving-to-texas" },
  { name: "Amarillo", metro: "Amarillo", region: "Panhandle", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "dry", counties: ["Potter", "Randall"], guideHref: "/moving-to-texas" },
  { name: "Waco", metro: "Waco", region: "Central Texas", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "central", counties: ["McLennan"], guideHref: "/moving-to-texas" },
  { name: "College Station", metro: "Bryan–College Station", region: "Central Texas", setting: "small-city", planningBand: "balanced", commuteStyle: "core", climate: "humid", counties: ["Brazos"], guideHref: "/moving-to-texas" },
  { name: "Tyler", metro: "Tyler", region: "East Texas", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "humid", counties: ["Smith"], guideHref: "/moving-to-texas" },
  { name: "Brownsville", metro: "Brownsville–Harlingen", region: "South Texas", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "coastal", counties: ["Cameron"], guideHref: "/moving-to-texas" },
  { name: "McAllen", metro: "McAllen–Edinburg–Mission", region: "South Texas", setting: "small-city", planningBand: "value", commuteStyle: "core", climate: "humid", counties: ["Hidalgo"], guideHref: "/moving-to-texas" },
];

export const RELOCATION_RESEARCH_STEPS = [
  { title: "School district and campus", copy: "Verify the serving district and campus from the exact address; city names and school boundaries often do not match.", href: "/find-my-school-district", external: false, source: "TexasDefined + TEA" },
  { title: "Appraisal district and taxing units", copy: "Identify the county appraisal district, tax office and every taxing unit before comparing an owner-occupied address.", href: "https://comptroller.texas.gov/taxes/property-tax/county-directory/", external: true, source: "Texas Comptroller" },
  { title: "Electric, water and sewer territory", copy: "Confirm the actual utility territory. Texas utility arrangements can change across municipal and cooperative boundaries.", href: "https://www.puc.texas.gov/", external: true, source: "PUCT" },
  { title: "Flood mapping and drainage", copy: "Use the official FEMA map as one layer, then check local drainage and flood-history sources where available.", href: "https://msc.fema.gov/portal/home", external: true, source: "FEMA" },
  { title: "Homeowners insurance context", copy: "Compare a real quote for the property with TDI market, county and loss information rather than applying a statewide premium to one house.", href: "https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html", external: true, source: "TDI" },
  { title: "Traffic and transportation", copy: "Test the repeated commute and use TxDOT traffic counts and county statistics to understand the corridor around the address.", href: "https://www.txdot.gov/data-maps/traffic-count-maps.html", external: true, source: "TxDOT" },
] as const;
