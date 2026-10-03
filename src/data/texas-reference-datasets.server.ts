import { supabase } from '@/integrations/supabase/client';

export type TexasReferenceCell = string | number | null;

export type TexasReferenceColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
};

export type TexasReferenceSource = {
  name: string;
  url: string;
  note: string;
};

export type TexasReferenceDataset = {
  kind: 'reference';
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  coverage: string;
  methodology: string;
  columns: TexasReferenceColumn[];
  rows: Array<Record<string, TexasReferenceCell>>;
  rowCount: number;
  previewLimited: boolean;
  csvPath: string;
  csvFilename: string;
  sources: TexasReferenceSource[];
};

type DatasetDefinition = Omit<TexasReferenceDataset, 'rows' | 'rowCount' | 'previewLimited'> & {
  loadRows: () => Promise<Array<Record<string, TexasReferenceCell>>>;
  previewLimit?: number;
};

const MAINTAINED_DATA_STATEMENT = 'Data compiled and maintained by TexasDefined; source methodology below.';
const DATA_UPDATED = '2026-10-03';

const riverRows = [
  ['Brazos', 'Brazos', 840, 840, 45573, 42865, 6074000, 'Confluence of the Salt Fork and Double Mountain Fork in Stonewall County', 'Gulf of Mexico', ''],
  ['Canadian', 'Canadian', 906, 213, 47705, 12865, 196000, 'Sangre de Cristo Mountains in New Mexico', 'Arkansas River in Oklahoma', ''],
  ['Colorado', 'Colorado', 865, 865, 42318, 39428, 1904000, 'West Texas headwaters', 'Matagorda Bay / Gulf Coast', ''],
  ['Cypress', 'Cypress', 90, 75, 3552, 2929, 493700, '', '', ''],
  ['Guadalupe', 'Guadalupe', 409, 409, 5953, 5953, 1422000, 'Confluence of the North and South forks in Kerr County', 'San Antonio Bay', ''],
  ['Lavaca', 'Lavaca', 117, 117, 2309, 2309, 277000, '', 'Lavaca Bay', ''],
  ['Neches', 'Neches', 416, 416, 9937, 9937, 4323000, 'East Texas headwaters', 'Sabine Lake', ''],
  ['Nueces', 'Nueces', 315, 315, 16700, 16700, 539700, 'Edwards Plateau', 'Corpus Christi Bay', ''],
  ['Red', 'Red', 1360, 695, 93450, 24297, 3464000, 'Southern Great Plains headwaters', 'Lower Red River system in Louisiana', ''],
  ['Rio Grande', 'Rio Grande', 1896, 889, 182215, 49387, 645500, 'San Juan Mountains in Colorado', 'Gulf of Mexico', ''],
  ['Sabine', 'Sabine', 360, 360, 9756, 7570, 5864000, 'Northeast Texas headwaters', 'Sabine Lake', ''],
  ['San Antonio', 'San Antonio', 238, 238, 4180, 4180, 562700, 'San Antonio Springs / upper San Antonio River', 'Guadalupe River', ''],
  ['San Jacinto', 'San Jacinto', 85, 85, 3936, 3936, 1365000, 'East and West forks north of Houston', 'Galveston Bay', ''],
  ['Sulphur', 'Sulphur', 222, 200, 3767, 3580, 932700, 'Northeast Texas headwaters', 'Red River system', ''],
  ['Trinity', 'Trinity', 550, 550, 17913, 17913, 5727000, 'North Texas fork system', 'Trinity Bay', ''],
] as const;

function textFromDestination(destination: any) {
  const body = (destination.body ?? []).flatMap((block: any) => {
    if (typeof block?.text === 'string') return [block.text];
    if (Array.isArray(block?.items)) return block.items.filter((item: unknown) => typeof item === 'string');
    return [];
  });
  return [destination.summary, destination.entryNote, ...(destination.highlights ?? []), ...body].filter(Boolean).join(' ');
}

function explicitAcreage(text: string) {
  const matches = [...text.matchAll(/(?:^|\b)([0-9][0-9,]*(?:\.\d+)?)\s*-?\s*acres?\b/gi)];
  if (!matches.length) return null;
  const value = Number(matches[0][1].replaceAll(',', ''));
  return Number.isFinite(value) ? value : null;
}

function explicitAnnualVisitation(text: string) {
  const patterns = [
    /(?:annual(?:ly)?|each year|per year)[^0-9]{0,28}([0-9][0-9,]+)\s+(?:visitors?|visits?)/i,
    /([0-9][0-9,]+)\s+(?:annual\s+)?(?:visitors?|visits?)\s+(?:a year|annually|per year)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const value = Number(match[1].replaceAll(',', ''));
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function activitySignal(text: string, words: RegExp) {
  return words.test(text) ? 'Yes' : '';
}

async function loadStateParkRows() {
  const { listResolvedDestinations } = await import('@/data/destination-query-runtime');
  const parks = await listResolvedDestinations({ category: 'state-parks', limit: 5000 });
  return parks
    .map((park) => {
      const text = textFromDestination(park);
      return {
        name: park.name,
        county: park.county ?? '',
        region: park.region,
        acreage: explicitAcreage(text),
        camping: activitySignal(text, /\bcamp(?:ing|ground|site|sites|ed)?\b/i),
        water_access: activitySignal(text, /\b(swim|swimming|paddl|kayak|canoe|boat|fishing|river|lake|reservoir|creek|spring)\b/i),
        annual_visitation: explicitAnnualVisitation(text),
        managing_authority: park.managingAuthority ?? 'Texas Parks & Wildlife Department',
        last_source_check: park.sourceCheckedAt ?? '',
        official_url: park.officialUrl ?? '',
        texasdefined_url: `/destination/${park.slug}`,
      };
    })
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

async function loadLakeRows() {
  const { fishingPlatform, fishingScope } = await import('@/data/fishing');
  const [lakes, species, relationships, reports] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: 'published', limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: 'published', limit: 5000 }),
    fishingPlatform.lakeSpecies.list({ ...fishingScope }),
    fishingPlatform.reports.list({ ...fishingScope, status: 'published', limit: 5000 }),
  ]);
  const speciesById = new Map(species.map((row) => [row.id, row.commonName]));
  const speciesByLake = new Map<string, string[]>();
  for (const relation of relationships) {
    const name = speciesById.get(relation.speciesId);
    if (!name) continue;
    const current = speciesByLake.get(relation.lakeId) ?? [];
    if (!current.includes(name)) current.push(name);
    speciesByLake.set(relation.lakeId, current);
  }
  const latestReport = new Map<string, (typeof reports)[number]>();
  for (const report of reports) {
    if (!latestReport.has(report.lakeId)) latestReport.set(report.lakeId, report);
  }
  return lakes
    .map((lake) => {
      const report = latestReport.get(lake.id);
      const checked = [lake.verifiedAt, ...lake.sources.map((source) => source.checkedAt)].filter(Boolean).sort().at(-1) ?? '';
      const currentConditions = report
        ? [report.waterLevelSummary, report.waterClarity, report.summary].filter(Boolean).join(' — ')
        : '';
      return {
        name: lake.name,
        surface_acres: lake.surfaceAcres ?? null,
        max_depth_feet: lake.maxDepthFeet ?? null,
        river_basin: lake.riverBasin ?? '',
        primary_waterway: lake.primaryWaterway ?? '',
        counties: lake.counties.join('; '),
        fishing_species: (speciesByLake.get(lake.id) ?? []).sort().join('; '),
        current_conditions: currentConditions,
        conditions_date: report?.publishedAt ?? '',
        last_source_check: checked,
        texasdefined_url: `/fishing/lakes/${lake.slug}`,
        source_urls: lake.sources.map((source) => source.url).join('; '),
      };
    })
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

async function fetchAllTaxRows() {
  const db = supabase as any;
  const pageSize = 1000;
  const output: any[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await db
      .from('texas_property_tax_rates')
      .select('*')
      .in('type', ['county', 'city', 'school-district'])
      .order('year', { ascending: true })
      .order('type', { ascending: true })
      .order('name', { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw error;
    output.push(...(data ?? []));
    if ((data ?? []).length < pageSize) break;
  }
  return output;
}

function numeric(value: unknown) {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function loadPropertyTaxRows() {
  const rows = await fetchAllTaxRows();
  const prior = new Map<string, number | null>();
  return rows.map((row) => {
    const key = `${row.type}:${row.slug}`;
    const rate = numeric(row.total_rate);
    const previous = prior.get(key);
    prior.set(key, rate);
    return {
      year: Number(row.year),
      unit_type: row.type,
      taxing_unit: row.name,
      counties: (row.county_slugs ?? []).join('; '),
      total_rate: rate,
      annual_change_percentage_points: rate != null && previous != null ? Number((rate - previous).toFixed(6)) : null,
      maintenance_operations_rate: numeric(row.maintenance_operations_rate),
      debt_service_rate: numeric(row.debt_service_rate),
      levy: numeric(row.levy),
      variable_rate: row.variable_rate ? 'Yes' : '',
      rate_unavailable: row.rate_unavailable ? 'Yes' : '',
      source_url: row.source_url ?? '',
    };
  });
}

async function loadFootballRows() {
  const [{ getAllUilFootballPrograms }, { getVerifiedFootballVenueLinks }] = await Promise.all([
    import('@/data/high-school-football/football-program-profile.server'),
    import('@/data/high-school-football/football-venue-links.server'),
  ]);
  const base = getAllUilFootballPrograms();
  let directory = new Map<string, any>();
  try {
    const { loadAllFootballProgramsWithDirectory } = await import('@/data/high-school-football/football-directory.server');
    directory = new Map((await loadAllFootballProgramsWithDirectory()).map((row) => [row.schoolName, row]));
  } catch (error) {
    console.error('Texas Data football directory enrichment unavailable; using verified UIL alignment', error);
  }
  return base.map((program) => {
    const enriched = directory.get(program.schoolName);
    const venueLinks = getVerifiedFootballVenueLinks({
      schoolName: program.schoolName,
      officialSchoolName: enriched?.officialSchoolName,
      districtName: enriched?.districtName,
    });
    return {
      school: program.schoolName,
      classification: program.classification,
      division: program.division ? `Division ${program.division === 1 ? 'I' : 'II'}` : '',
      district: program.district,
      football_type: program.footballType,
      uil_enrollment: program.uilEnrollment || null,
      school_district: enriched?.districtName ?? '',
      city: enriched?.city ?? '',
      county: enriched?.countyName ?? '',
      verified_venue: venueLinks.map((row) => row.venueName).join('; '),
      texasdefined_url: program.profilePath,
    };
  });
}

async function loadCountyRows() {
  const [{ loadTexasCountyComparison }, { loadTexasCountyGrowth }, { listResolvedDestinations }] = await Promise.all([
    import('@/data/county-comparison'),
    import('@/data/census-county-growth'),
    import('@/data/destination-query-runtime'),
  ]);
  const [counties, growth, destinations] = await Promise.all([
    loadTexasCountyComparison(),
    loadTexasCountyGrowth(),
    listResolvedDestinations({ limit: 5000 }),
  ]);
  const growthByFips = new Map(growth.rows.map((row) => [row.fips, row]));
  const destinationByCounty = new Map<string, string[]>();
  for (const destination of destinations) {
    const county = destination.county?.replace(/\s+County$/i, '').trim().toLowerCase();
    if (!county) continue;
    const current = destinationByCounty.get(county) ?? [];
    if (!current.includes(destination.name)) current.push(destination.name);
    destinationByCounty.set(county, current);
  }

  const db = supabase as any;
  const { data: latestYearRows, error: latestYearError } = await db.from('texas_property_tax_rates').select('year').order('year', { ascending: false }).limit(1);
  if (latestYearError) throw latestYearError;
  const latestYear = Number(latestYearRows?.[0]?.year) || 2025;
  const { data: countyRates, error: rateError } = await db
    .from('texas_property_tax_rates')
    .select('name,slug,county_slugs,total_rate,year')
    .eq('year', latestYear)
    .eq('type', 'county')
    .range(0, 400);
  if (rateError) throw rateError;
  const rateByCounty = new Map<string, any>();
  for (const rate of countyRates ?? []) {
    for (const slug of rate.county_slugs ?? []) rateByCounty.set(slug, rate);
    if (!rateByCounty.has(rate.slug)) rateByCounty.set(rate.slug, rate);
  }

  return counties.map((county) => {
    const growthRow = growthByFips.get(county.fipsCode);
    const attractions = destinationByCounty.get(county.name.replace(/\s+County$/i, '').toLowerCase()) ?? [];
    const rate = rateByCounty.get(county.slug);
    return {
      county: county.name,
      fips: county.fipsCode,
      county_seat: county.countySeat ?? '',
      population_2020: county.population2020,
      population_2025_estimate: growthRow?.populationEstimate2025 ?? null,
      growth_2020_2025_percent: growthRow ? Number(growthRow.populationChangePercent.toFixed(4)) : null,
      county_property_tax_rate: numeric(rate?.total_rate),
      property_tax_year: rate?.year ?? null,
      land_area_sq_mi: county.landAreaSquareMiles,
      attraction_count: attractions.length,
      sample_attractions: attractions.slice(0, 5).join('; '),
      texasdefined_url: `/county/${county.slug}`,
      official_directory_url: county.officialDirectoryUrl,
    };
  });
}

async function loadRiverRows() {
  return riverRows.map(([river, basin, totalLength, texasLength, totalArea, texasArea, averageFlow, source, mouth, counties]) => ({
    river,
    basin,
    total_length_miles: totalLength,
    texas_length_miles: texasLength,
    basin_area_total_sq_mi: totalArea,
    basin_area_texas_sq_mi: texasArea,
    average_flow_acre_feet_per_year: averageFlow,
    source,
    mouth,
    counties_crossed: counties,
    twdb_url: `https://www.twdb.texas.gov/surfacewater/rivers/river_basins/${basin.toLowerCase().replaceAll(' ', '')}/`,
  }));
}

const definitions: DatasetDefinition[] = [
  {
    kind: 'reference',
    slug: 'state-parks',
    title: 'Texas State Parks Data',
    description: `A maintained reference table of Texas state-park records, including county, acreage when explicitly verified, camping and water-access signals, visitation when available, and source dates. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'Parks & Outdoors',
    updated: DATA_UPDATED,
    coverage: 'Maintained TexasDefined state-park catalog; fields remain blank when a value has not been explicitly verified.',
    methodology: 'TexasDefined resolves its maintained state-park destination catalog, retains each park’s official source and verification date, and surfaces acreage or annual visitation only when those values are explicitly present in the verified record. Camping and water-access fields are conservative activity signals derived from the maintained park record; blank means not yet structured, not necessarily unavailable at the park.',
    columns: [
      { key: 'name', label: 'State park' }, { key: 'county', label: 'County' }, { key: 'region', label: 'Region' },
      { key: 'acreage', label: 'Acres', align: 'right' }, { key: 'camping', label: 'Camping' }, { key: 'water_access', label: 'Water access' },
      { key: 'annual_visitation', label: 'Annual visitation', align: 'right' }, { key: 'last_source_check', label: 'Source checked' },
    ],
    csvPath: '/texas-data/state-parks.csv',
    csvFilename: 'texas-state-parks-data.csv',
    sources: [{ name: 'Texas Parks & Wildlife Department', url: 'https://tpwd.texas.gov/state-parks/', note: 'Primary official park information, operating details and park-specific source pages.' }],
    loadRows: loadStateParkRows,
  },
  {
    kind: 'reference',
    slug: 'lakes',
    title: 'Texas Lakes & Reservoirs Data',
    description: `A maintained lake and reservoir database with acreage, maximum depth, river basin, counties, fishing species and the latest maintained conditions where available. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'Water & Fishing',
    updated: DATA_UPDATED,
    coverage: 'Published TexasDefined fishing-lake network with verified source metadata and report relationships.',
    methodology: 'TexasDefined joins the published fishing-lake catalog to its species relationships and most recent maintained fishing report. Physical facts remain blank when a verified source has not supplied them. Current-conditions text is dated and is not presented as real-time when the latest maintained report is older.',
    columns: [
      { key: 'name', label: 'Lake / reservoir' }, { key: 'surface_acres', label: 'Surface acres', align: 'right' }, { key: 'max_depth_feet', label: 'Max depth (ft)', align: 'right' },
      { key: 'river_basin', label: 'River basin' }, { key: 'counties', label: 'Counties' }, { key: 'fishing_species', label: 'Fishing species' }, { key: 'conditions_date', label: 'Conditions date' },
    ],
    csvPath: '/texas-data/lakes.csv',
    csvFilename: 'texas-lakes-reservoirs-data.csv',
    sources: [
      { name: 'Texas Parks & Wildlife Department', url: 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/', note: 'Fishery, access and lake-reference material.' },
      { name: 'Texas Water Development Board — Water Data for Texas', url: 'https://waterdatafortexas.org/reservoirs/statewide', note: 'Reservoir and water-condition context used by maintained lake records.' },
    ],
    loadRows: loadLakeRows,
  },
  {
    kind: 'reference',
    slug: 'property-tax-rates',
    title: 'Texas Property-Tax Rates by Taxing Unit',
    description: `County, city and school-district property-tax rates with retained annual history and year-over-year rate changes. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'Property Tax',
    updated: DATA_UPDATED,
    coverage: 'Texas Comptroller annual property-tax rate workbooks retained in the TexasDefined rate database.',
    methodology: 'TexasDefined imports Texas Comptroller Property Tax Assistance Division annual rate workbooks into a normalized taxing-unit table. The download includes county, city and school-district records across retained years. Annual change is the difference in total tax rate, in percentage points, from the prior retained year for the same normalized taxing unit.',
    columns: [
      { key: 'year', label: 'Year', align: 'right' }, { key: 'unit_type', label: 'Type' }, { key: 'taxing_unit', label: 'Taxing unit' }, { key: 'counties', label: 'Counties' },
      { key: 'total_rate', label: 'Total rate', align: 'right' }, { key: 'annual_change_percentage_points', label: 'Annual change (pp)', align: 'right' },
    ],
    csvPath: '/texas-data/property-tax-rates.csv',
    csvFilename: 'texas-property-tax-rates-history.csv',
    sources: [{ name: 'Texas Comptroller of Public Accounts — Property Tax Assistance Division', url: 'https://comptroller.texas.gov/taxes/property-tax/rates/', note: 'Official annual taxing-unit rate workbooks.' }],
    loadRows: loadPropertyTaxRows,
    previewLimit: 500,
  },
  {
    kind: 'reference',
    slug: 'high-school-football',
    title: 'Texas High-School Football Teams & Districts Data',
    description: `The current UIL football alignment with every maintained program, classification, division, district, enrollment where available and verified venue relationships where available. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'High-School Football',
    updated: DATA_UPDATED,
    coverage: '1,268 current UIL football programs in the 2026–28 alignment cycle; venue fields appear only for verified relationships.',
    methodology: 'The core alignment is generated from UIL 2026–28 realignment material and validated against expected classification counts. TexasDefined enriches records with exact UIL enrollment where available, TEA AskTED school-directory matches when the official directory is reachable, and only explicitly verified stadium relationships. A blank venue is intentionally not guessed.',
    columns: [
      { key: 'school', label: 'Program' }, { key: 'classification', label: 'Class' }, { key: 'division', label: 'Division' }, { key: 'district', label: 'District', align: 'right' },
      { key: 'uil_enrollment', label: 'UIL enrollment', align: 'right' }, { key: 'county', label: 'County' }, { key: 'verified_venue', label: 'Verified venue' },
    ],
    csvPath: '/texas-data/high-school-football.csv',
    csvFilename: 'texas-high-school-football-2026-28.csv',
    sources: [
      { name: 'University Interscholastic League', url: 'https://realignment.uiltexas.org/', note: 'Official 2026–28 football classification and district alignment.' },
      { name: 'Texas Education Agency AskTED', url: 'https://tealprod.tea.state.tx.us/Tea.AskTed.Web/Forms/DownloadSite.aspx', note: 'Official school/district directory enrichment when available.' },
    ],
    loadRows: loadFootballRows,
  },
  {
    kind: 'reference',
    slug: 'rivers',
    title: 'Texas Major Rivers & River Basins Data',
    description: `Reference data for Texas’s 15 major river basins, including river length, basin area, average flow and maintained source/mouth notes where verified. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'Water & Geography',
    updated: DATA_UPDATED,
    coverage: 'All 15 major river basins recognized by the Texas Water Development Board.',
    methodology: 'Lengths, basin areas and average flows are transcribed from the Texas Water Development Board statewide river-basin summary. Source and mouth descriptions are maintained as editorial reference fields and are left blank when TexasDefined has not yet completed source-level verification. County-crossing data is intentionally left blank until a GIS-derived county intersection workflow is complete rather than inferring county lists from prose.',
    columns: [
      { key: 'river', label: 'River' }, { key: 'basin', label: 'Basin' }, { key: 'total_length_miles', label: 'Total miles', align: 'right' }, { key: 'texas_length_miles', label: 'Texas miles', align: 'right' },
      { key: 'basin_area_texas_sq_mi', label: 'Texas basin sq. mi.', align: 'right' }, { key: 'average_flow_acre_feet_per_year', label: 'Avg. flow (acre-ft/yr)', align: 'right' }, { key: 'source', label: 'Source' }, { key: 'mouth', label: 'Mouth' },
    ],
    csvPath: '/texas-data/rivers.csv',
    csvFilename: 'texas-major-rivers-basins-data.csv',
    sources: [{ name: 'Texas Water Development Board — River Basins', url: 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp', note: 'Official statewide major-river-basin summary, lengths, basin areas and average flows.' }],
    loadRows: loadRiverRows,
  },
  {
    kind: 'reference',
    slug: 'counties',
    title: 'Texas Counties Data',
    description: `All 254 Texas counties with county seat, population, recent growth where available, county property-tax rate, land area and TexasDefined attraction coverage. ${MAINTAINED_DATA_STATEMENT}`,
    category: 'Counties & Population',
    updated: DATA_UPDATED,
    coverage: 'All 254 Texas counties; 2025 population estimates are included when the current Census source is available.',
    methodology: 'TexasDefined joins its 254-county comparison index to U.S. Census population estimates, the latest normalized Texas Comptroller county tax-rate records and the maintained destination catalog. Attraction count means TexasDefined destinations assigned to that county; it is a site-coverage measure, not an official count of every attraction in the county.',
    columns: [
      { key: 'county', label: 'County' }, { key: 'county_seat', label: 'County seat' }, { key: 'population_2025_estimate', label: '2025 population', align: 'right' },
      { key: 'growth_2020_2025_percent', label: '2020–25 growth %', align: 'right' }, { key: 'county_property_tax_rate', label: 'County tax rate', align: 'right' },
      { key: 'land_area_sq_mi', label: 'Land sq. mi.', align: 'right' }, { key: 'attraction_count', label: 'TD attractions', align: 'right' },
    ],
    csvPath: '/texas-data/counties.csv',
    csvFilename: 'texas-counties-data.csv',
    sources: [
      { name: 'U.S. Census Bureau', url: 'https://www.census.gov/programs-surveys/popest/data/tables.html', note: 'County population estimates and recent growth.' },
      { name: 'Texas State Library and Archives Commission', url: 'https://www.tsl.texas.gov/ref/abouttx/county.html', note: 'County-seat and official county-reference context.' },
      { name: 'Texas Comptroller of Public Accounts', url: 'https://comptroller.texas.gov/taxes/property-tax/rates/', note: 'Latest county property-tax rates.' },
    ],
    loadRows: loadCountyRows,
  },
];

const bySlug = new Map(definitions.map((definition) => [definition.slug, definition]));

export function getTexasReferenceDatasetDefinitions() {
  return definitions.map(({ loadRows: _loadRows, ...definition }) => ({ ...definition, rowCount: 0, previewLimited: false }));
}

export async function loadTexasReferenceDataset(slug: string, options: { full?: boolean } = {}): Promise<TexasReferenceDataset | null> {
  const definition = bySlug.get(slug);
  if (!definition) return null;
  const rows = await definition.loadRows();
  const previewLimit = definition.previewLimit ?? 1500;
  const visibleRows = options.full ? rows : rows.slice(0, previewLimit);
  const { loadRows: _loadRows, previewLimit: _previewLimit, ...metadata } = definition;
  return {
    ...metadata,
    rows: visibleRows,
    rowCount: rows.length,
    previewLimited: !options.full && rows.length > previewLimit,
  };
}

export function texasReferenceDatasetSlugs() {
  return definitions.map((definition) => definition.slug);
}
