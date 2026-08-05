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
];

export const getTexasDataset = (slug: string) => TEXAS_DATASETS.find((dataset) => dataset.slug === slug);
export const formatDatasetValue = (value: number, unit: TexasDataset['unit']) => unit === 'dollars'
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  : unit === 'percent' ? `${value.toFixed(4)}%` : new Intl.NumberFormat('en-US').format(value);
