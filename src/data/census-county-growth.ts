const CENSUS_PEP_2025_URL = 'https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/counties/totals/co-est2025-alldata.csv';
const CENSUS_PEP_2025_SOURCE = 'https://www.census.gov/programs-surveys/popest/data/tables.html';

export type TexasCountyGrowthRow = {
  fips: string;
  countyName: string;
  populationBase2020: number;
  populationEstimate2025: number;
  populationChange: number;
  populationChangePercent: number;
};

export type TexasCountyGrowthDataset = {
  rows: TexasCountyGrowthRow[];
  available: boolean;
  sourceUrl: string;
  sourceFileUrl: string;
  asOf: '2025-07-01';
};

let datasetPromise: Promise<TexasCountyGrowthDataset> | undefined;

export function loadTexasCountyGrowth() {
  datasetPromise ??= fetchTexasCountyGrowth();
  return datasetPromise;
}

async function fetchTexasCountyGrowth(): Promise<TexasCountyGrowthDataset> {
  try {
    const response = await fetch(CENSUS_PEP_2025_URL, { headers: { accept: 'text/csv' } });
    if (!response.ok) throw new Error(`Census PEP returned ${response.status}`);
    const rows = parsePopulationCsv(await response.text());
    return {
      rows,
      available: rows.length >= 250,
      sourceUrl: CENSUS_PEP_2025_SOURCE,
      sourceFileUrl: CENSUS_PEP_2025_URL,
      asOf: '2025-07-01',
    };
  } catch (error) {
    console.error('Texas county growth source unavailable', error);
    return {
      rows: [],
      available: false,
      sourceUrl: CENSUS_PEP_2025_SOURCE,
      sourceFileUrl: CENSUS_PEP_2025_URL,
      asOf: '2025-07-01',
    };
  }
}

function parsePopulationCsv(text: string): TexasCountyGrowthRow[] {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((value) => value.toUpperCase());
  const index = Object.fromEntries(headers.map((header, position) => [header, position]));
  const required = ['STATE', 'COUNTY', 'CTYNAME', 'ESTIMATESBASE2020', 'POPESTIMATE2025'];
  if (required.some((field) => index[field] == null)) return [];

  return lines.slice(1).flatMap((line) => {
    const cells = parseCsvLine(line);
    if (cells[index.STATE] !== '48' || cells[index.COUNTY] === '000') return [];
    const populationBase2020 = numeric(cells[index.ESTIMATESBASE2020]);
    const populationEstimate2025 = numeric(cells[index.POPESTIMATE2025]);
    if (populationBase2020 == null || populationEstimate2025 == null || populationBase2020 <= 0) return [];
    const populationChange = populationEstimate2025 - populationBase2020;
    return [{
      fips: `48${String(cells[index.COUNTY]).padStart(3, '0')}`,
      countyName: cells[index.CTYNAME],
      populationBase2020,
      populationEstimate2025,
      populationChange,
      populationChangePercent: (populationChange / populationBase2020) * 100,
    }];
  });
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let quoted = false;
  for (let position = 0; position < line.length; position += 1) {
    const character = line[position];
    if (character === '"') {
      if (quoted && line[position + 1] === '"') { current += '"'; position += 1; }
      else quoted = !quoted;
    } else if (character === ',' && !quoted) {
      cells.push(current.trim()); current = '';
    } else current += character;
  }
  cells.push(current.trim());
  return cells;
}

function numeric(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
