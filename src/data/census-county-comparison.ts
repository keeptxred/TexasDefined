const CENSUS_PEP_COUNTY_CSV = 'https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/counties/totals/co-est2025-alldata.csv';
const ACS_2024_COUNTY_URL = 'https://api.census.gov/data/2024/acs/acs5?get=NAME,B25077_001E,B25064_001E,B19013_001E&for=county:*&in=state:48';

export const COUNTY_GROWTH_SOURCE = {
  name: 'U.S. Census Bureau Population Estimates Program — Vintage 2025 county totals',
  url: CENSUS_PEP_COUNTY_CSV,
  coverage: 'April 1, 2020 estimates base through July 1, 2025 population estimate',
} as const;

export const COUNTY_HOUSING_SOURCE = {
  name: 'U.S. Census Bureau 2024 American Community Survey 5-Year Estimates',
  url: ACS_2024_COUNTY_URL,
  coverage: '2024 ACS 5-year estimates',
} as const;

export type CensusCountyComparisonRow = {
  fips: string;
  county: string;
  populationBase2020: number;
  populationEstimate2025: number;
  populationChange: number;
  populationChangePercent: number;
  medianHomeValue: number | null;
  medianGrossRent: number | null;
  medianHouseholdIncome: number | null;
};

export type CensusCountyComparison = {
  rows: CensusCountyComparisonRow[];
  populationAvailable: boolean;
  housingAvailable: boolean;
  fetchedAt: string;
  warnings: string[];
};

type PopulationRow = {
  fips: string;
  county: string;
  base2020: number;
  estimate2025: number;
};

type HousingRow = {
  fips: string;
  medianHomeValue: number | null;
  medianGrossRent: number | null;
  medianHouseholdIncome: number | null;
};

let comparisonPromise: Promise<CensusCountyComparison> | undefined;

export function loadCensusCountyComparison() {
  comparisonPromise ??= buildComparison();
  return comparisonPromise;
}

async function buildComparison(): Promise<CensusCountyComparison> {
  const warnings: string[] = [];
  const [populationResult, housingResult] = await Promise.allSettled([
    fetchPopulationRows(),
    fetchHousingRows(),
  ]);

  const populationRows = populationResult.status === 'fulfilled' ? populationResult.value : [];
  const housingRows = housingResult.status === 'fulfilled' ? housingResult.value : [];
  if (populationResult.status === 'rejected') warnings.push(`Population Estimates source unavailable: ${errorMessage(populationResult.reason)}`);
  if (housingResult.status === 'rejected') warnings.push(`ACS housing source unavailable: ${errorMessage(housingResult.reason)}`);

  const housingByFips = new Map(housingRows.map((row) => [row.fips, row] as const));
  const rows = populationRows.map((population) => {
    const housing = housingByFips.get(population.fips);
    const populationChange = population.estimate2025 - population.base2020;
    const populationChangePercent = population.base2020 > 0
      ? (populationChange / population.base2020) * 100
      : 0;
    return {
      fips: population.fips,
      county: population.county,
      populationBase2020: population.base2020,
      populationEstimate2025: population.estimate2025,
      populationChange,
      populationChangePercent,
      medianHomeValue: housing?.medianHomeValue ?? null,
      medianGrossRent: housing?.medianGrossRent ?? null,
      medianHouseholdIncome: housing?.medianHouseholdIncome ?? null,
    } satisfies CensusCountyComparisonRow;
  });

  return {
    rows: rows.sort((a, b) => a.county.localeCompare(b.county)),
    populationAvailable: populationRows.length > 0,
    housingAvailable: housingRows.length > 0,
    fetchedAt: new Date().toISOString(),
    warnings,
  };
}

async function fetchPopulationRows(): Promise<PopulationRow[]> {
  const response = await fetch(CENSUS_PEP_COUNTY_CSV);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  const records = parseCsv(text);
  const rows: PopulationRow[] = [];

  for (const record of records) {
    if (record.STNAME !== 'Texas' || !record.COUNTY || record.COUNTY === '000') continue;
    const base2020 = asNumber(record.ESTIMATESBASE2020);
    const estimate2025 = asNumber(record.POPESTIMATE2025);
    if (base2020 == null || estimate2025 == null) continue;
    rows.push({
      fips: `${record.STATE}${record.COUNTY}`,
      county: normalizeCountyName(record.CTYNAME),
      base2020,
      estimate2025,
    });
  }

  if (rows.length < 250) throw new Error(`Expected roughly 254 Texas counties; parsed ${rows.length}`);
  return rows;
}

async function fetchHousingRows(): Promise<HousingRow[]> {
  const response = await fetch(ACS_2024_COUNTY_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json() as string[][];
  if (!Array.isArray(data) || data.length < 2) throw new Error('Unexpected ACS response');
  const [header, ...records] = data;
  const index = Object.fromEntries(header.map((name, position) => [name, position]));
  const required = ['B25077_001E', 'B25064_001E', 'B19013_001E', 'state', 'county'];
  for (const field of required) if (index[field] == null) throw new Error(`ACS field missing: ${field}`);

  const rows = records.map((record) => ({
    fips: `${record[index.state]}${record[index.county]}`,
    medianHomeValue: asEstimate(record[index.B25077_001E]),
    medianGrossRent: asEstimate(record[index.B25064_001E]),
    medianHouseholdIncome: asEstimate(record[index.B19013_001E]),
  }));
  if (rows.length < 250) throw new Error(`Expected roughly 254 Texas counties; parsed ${rows.length}`);
  return rows;
}

function asEstimate(value: string | undefined) {
  const number = asNumber(value);
  return number != null && number >= 0 ? number : null;
}

function asNumber(value: string | undefined) {
  if (value == null || value.trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeCountyName(value: string | undefined) {
  return (value ?? '').replace(/ County$/, '').trim();
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  const [headers, ...dataRows] = rows.filter((item) => item.length > 1);
  if (!headers) return [] as Record<string, string>[];
  return dataRows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
