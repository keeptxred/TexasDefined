export type TexasDataset = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  updated: string;
  sourceName: string;
  sourceUrl: string;
  methodology: string;
  rows: Array<{ label: string; value: number; note?: string }>;
  unit: 'percent' | 'dollars' | 'count';
};

export const TEXAS_DATASETS: TexasDataset[] = [
  {
    slug: 'county-property-tax-rates',
    title: 'Texas County Property-Tax Rate Examples',
    description: 'Compare selected adopted county government property-tax rates. City, school-district, and special-district rates are separate.',
    category: 'Property taxes', year: 2024, updated: '2026-07-30', unit: 'percent',
    sourceName: 'Texas Comptroller property-tax rate data',
    sourceUrl: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    methodology: 'Selected adopted county rates are shown for planning and comparison. Missing counties are not treated as zero, and the values do not represent a complete combined property-tax bill.',
    rows: [
      { label: 'El Paso County', value: 0.45 }, { label: 'Fort Bend County', value: 0.4383 },
      { label: 'Harris County', value: 0.3769 }, { label: 'Williamson County', value: 0.3331 },
      { label: 'Travis County', value: 0.3047 }, { label: 'Bexar County', value: 0.2768 },
      { label: 'Dallas County', value: 0.2179 }, { label: 'Tarrant County', value: 0.1945 },
      { label: 'Denton County', value: 0.1898 }, { label: 'Collin County', value: 0.1499 },
    ],
  },
  {
    slug: 'school-district-tax-rates',
    title: 'Texas School-District Tax Rate Examples',
    description: 'Compare selected school-district adopted rates from the statewide property-tax dataset.',
    category: 'Education', year: 2024, updated: '2026-07-30', unit: 'percent',
    sourceName: 'Texas Comptroller property-tax rate data',
    sourceUrl: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    methodology: 'This is a selected comparison, not a complete ranking of every Texas school district. Verify current parcel-level taxing units with the appraisal district and tax offices.',
    rows: [
      { label: 'Judson ISD', value: 1.3022, note: 'Bexar County' }, { label: 'Hutto ISD', value: 1.2925, note: 'Williamson County' },
      { label: 'Mesquite ISD', value: 1.2746, note: 'Dallas County' }, { label: 'Argyle ISD', value: 1.2675, note: 'Denton County' },
      { label: 'Pflugerville ISD', value: 1.2546, note: 'Travis County' }, { label: 'Socorro ISD', value: 1.2293, note: 'El Paso County' },
    ],
  },
  {
    slug: 'homestead-exemption-history',
    title: 'Texas School Homestead Exemption History',
    description: 'Track major statewide mandatory school-district residence-homestead exemption levels.',
    category: 'Historical trends', year: 2025, updated: '2026-07-30', unit: 'dollars',
    sourceName: 'Texas Constitution and Texas Comptroller guidance',
    sourceUrl: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/residence-faq.php',
    methodology: 'Major statewide mandatory school-district exemption levels are shown. Local optional exemptions and special exemptions are not included.',
    rows: [
      { label: '2025', value: 140000 }, { label: '2023', value: 100000 },
      { label: '2022', value: 40000 }, { label: '2015', value: 25000 },
    ],
  },
  {
    slug: 'texas-population-and-migration-2025',
    title: 'Texas Population and Migration Snapshot, 2025',
    description: 'Texas population change from 2024 to 2025 using the current Census Vintage 2025 estimates, including domestic migration, international migration and natural change.',
    category: 'Relocation and migration', year: 2025, updated: '2026-08-27', unit: 'count',
    sourceName: 'U.S. Census Bureau, Vintage 2025 Population Estimates',
    sourceUrl: 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html',
    methodology: 'Vintage 2025 is the Census Bureau’s most recent completed and internally consistent population-estimate vintage. Values cover the July 1, 2024 to July 1, 2025 estimate period. Net domestic migration is a net balance, not a count of everyone who moved to Texas. Population change can differ slightly from the sum of natural change and migration components because Census estimate tables include residual and revision accounting. Do not combine these values with an older Census vintage.',
    rows: [
      { label: 'Texas population — July 1, 2025', value: 31709821, note: 'Vintage 2025 resident population estimate.' },
      { label: 'Numeric population growth — 2024 to 2025', value: 391243, note: 'Texas ranked first among states in numeric population growth for this period.' },
      { label: 'Net domestic migration', value: 67299, note: 'Net gain from movement between Texas and other U.S. states or areas during the 2024–2025 estimate period.' },
      { label: 'Net international migration', value: 167475, note: 'Net international migration during the 2024–2025 estimate period.' },
      { label: 'Natural increase', value: 157711, note: 'Births minus deaths during the 2024–2025 estimate period.' },
    ],
  },
  {
    slug: 'texas-population-and-migration-2024',
    title: 'Texas Population and Migration Snapshot, 2024 — Revised Vintage 2025',
    description: 'The 2023-to-2024 Texas population-change period restated on the current Census Vintage 2025 series so historical comparisons stay within one consistent vintage.',
    category: 'Relocation and migration', year: 2024, updated: '2026-08-27', unit: 'count',
    sourceName: 'U.S. Census Bureau, Vintage 2025 Population Estimates',
    sourceUrl: 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html',
    methodology: 'Census revises the full post-2020 estimate series with each new annual vintage and states that older vintages are superseded. This page retains its 2024 URL for continuity but now reports the 2023–2024 period from Vintage 2025 rather than the superseded Vintage 2024 release. Use the 2025 snapshot for the current statewide estimate.',
    rows: [
      { label: 'Texas population — July 1, 2024', value: 31318578, note: 'Revised July 1, 2024 estimate within Vintage 2025.' },
      { label: 'Numeric population growth — 2023 to 2024', value: 598297, note: 'Restated within the Vintage 2025 series.' },
      { label: 'Net domestic migration', value: 86067, note: 'Vintage 2025 estimate for the 2023–2024 period.' },
      { label: 'Net international migration', value: 354864, note: 'Vintage 2025 estimate for the 2023–2024 period.' },
      { label: 'Natural increase', value: 157366, note: 'Births minus deaths during the 2023–2024 estimate period in Vintage 2025.' },
    ],
  },
  {
    slug: 'where-new-texans-came-from-2024',
    title: 'Where New Texans Came From in 2024',
    description: 'The leading prior states of residence for people who moved to Texas, using the Census Bureau 2024 ACS state-to-state migration flow table.',
    category: 'Relocation and migration', year: 2024, updated: '2026-08-26', unit: 'count',
    sourceName: 'U.S. Census Bureau, 2024 ACS State-to-State Migration Flows',
    sourceUrl: 'https://www.census.gov/data/tables/time-series/demo/geographic-mobility/state-to-state-migration.html',
    methodology: 'The 2024 ACS one-year flow table crosses current state of residence with state of residence one year earlier. Values shown here are rounded to the nearest 100 for a readable relocation brief. ACS flow estimates are sample estimates with 90 percent margins of error; this list describes estimated movers, not permanent intent or a causal reason for moving.',
    rows: [
      { label: 'California', value: 77200, note: 'Estimated people living in Texas in 2024 whose residence one year earlier was California.' },
      { label: 'Florida', value: 52200 },
      { label: 'New York', value: 28200 },
      { label: 'Louisiana', value: 24200 },
      { label: 'Illinois', value: 23500 },
      { label: 'Colorado', value: 23000 },
      { label: 'Georgia', value: 19500 },
      { label: 'Oklahoma', value: 18600 },
      { label: 'Virginia', value: 18000 },
      { label: 'Washington', value: 15900, note: 'Washington state.' },
    ],
  },
  {
    slug: 'texas-homeowners-premium-history',
    title: 'Texas Homeowners Insurance Average Premium History',
    description: 'Track Texas statewide average annual homeowners premiums from 2019 through the preliminary 2025 market estimate.',
    category: 'Insurance', year: 2025, updated: '2026-08-26', unit: 'dollars',
    sourceName: 'Texas Department of Insurance homeowners insurance market overview',
    sourceUrl: 'https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html',
    methodology: 'Texas Department of Insurance statewide average annual homeowners premiums are shown for trend context. The 2025 figure is preliminary. A statewide average is not a quote and should not be used as a substitute for address-specific coverage, deductible, roof, wind, flood or insurer pricing research.',
    rows: [
      { label: '2019', value: 1961 },
      { label: '2020', value: 1987 },
      { label: '2021', value: 2124 },
      { label: '2022', value: 2374 },
      { label: '2023', value: 2800 },
      { label: '2024', value: 3291 },
      { label: '2025', value: 3506, note: 'Preliminary TDI statewide average.' },
    ],
  },
  {
    slug: 'texas-metro-payrolls-june-2026',
    title: 'Texas Metro Nonfarm Payroll Employment — June 2026',
    description: 'Compare total nonfarm payroll employment across major Texas metropolitan areas used in relocation research.',
    category: 'Jobs', year: 2026, updated: '2026-08-26', unit: 'count',
    sourceName: 'U.S. Bureau of Labor Statistics metropolitan area employment table',
    sourceUrl: 'https://www.bls.gov/news.release/metro.t03.htm',
    methodology: 'Values are June 2026 preliminary total nonfarm payroll employment from the BLS metropolitan area table and are not seasonally adjusted. BLS publishes the source table in thousands; Texas Defined multiplies those values by 1,000 for display. Payroll employment is one labor-market indicator and is not a ranking of relocation quality.',
    rows: [
      { label: 'Dallas–Fort Worth–Arlington', value: 4363300 },
      { label: 'Houston–Pasadena–The Woodlands', value: 3521500 },
      { label: 'Austin–Round Rock–San Marcos', value: 1432100 },
      { label: 'San Antonio–New Braunfels', value: 1196800 },
      { label: 'El Paso', value: 365100 },
      { label: 'McAllen–Edinburg–Mission', value: 309700 },
      { label: 'Corpus Christi', value: 203200 },
      { label: 'Lubbock', value: 176500 },
      { label: 'Brownsville–Harlingen', value: 159900 },
      { label: 'College Station–Bryan', value: 143900 },
      { label: 'Waco', value: 143300 },
      { label: 'Amarillo', value: 131400 },
      { label: 'Tyler', value: 122100 },
    ],
  },
  {
    slug: 'texas-traffic-monitoring-coverage',
    title: 'TxDOT Statewide Traffic Monitoring Coverage',
    description: 'Understand the scale of the Texas traffic-count system behind address, corridor and commute research.',
    category: 'Transportation', year: 2026, updated: '2026-08-26', unit: 'count',
    sourceName: 'Texas Department of Transportation traffic count maps',
    sourceUrl: 'https://www.txdot.gov/data-maps/traffic-count-maps.html',
    methodology: 'TxDOT describes a statewide program with more than 75,000 short-term traffic counts collected each year and more than 350 permanent continuous-count stations. These values describe monitoring coverage, not the traffic volume on a specific road. Use TxDOT STARS II and current local project information for a candidate address or commute.',
    rows: [
      { label: 'Short-term traffic counts collected each year', value: 75000, note: 'TxDOT states that it collects more than 75,000 short-term traffic counts annually.' },
      { label: 'Permanent continuous traffic monitoring stations', value: 350, note: 'TxDOT states that it maintains more than 350 permanent monitoring stations.' },
      { label: 'Texas counties covered by DISCOS statistics', value: 254, note: 'TxDOT publishes annual district and county statistics across every Texas county.' },
    ],
  },
];

export const getTexasDataset = (slug: string) => TEXAS_DATASETS.find((dataset) => dataset.slug === slug);
export const formatDatasetValue = (value: number, unit: TexasDataset['unit']) => unit === 'dollars'
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  : unit === 'percent' ? `${value.toFixed(4)}%` : new Intl.NumberFormat('en-US').format(value);
