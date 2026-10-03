export type TexasDefinedResearchDomain = 'counties' | 'property-tax' | 'fishing' | 'state-parks' | 'rivers' | 'football' | 'wildlife' | 'historic-sites';
export type TexasDefinedResearchPath = '/texas-data/county-growth' | '/texas-data/property-tax-changes' | '/texas-data/lake-game-fish-diversity';
export type TexasDefinedResearchCsvPath = '/texas-data/county-growth.csv' | '/texas-data/property-tax-changes.csv' | '/texas-data/lake-game-fish-diversity.csv';

export type TexasDefinedResearchBrief = {
  slug: string;
  title: string;
  question: string;
  description: string;
  domain: TexasDefinedResearchDomain;
  path: TexasDefinedResearchPath;
  csvPath: TexasDefinedResearchCsvPath;
  sourceName: string;
  updated: string;
  updateCadence: string;
};

export const TEXASDEFINED_RESEARCH_AUTHOR = 'Texas Defined Editorial Desk';
export const TEXASDEFINED_RESEARCH_EDITOR = 'Texas Defined Editorial Desk';

export const TEXASDEFINED_RESEARCH_BRIEFS: readonly TexasDefinedResearchBrief[] = [
  {
    slug: 'county-growth',
    title: 'Texas County Population Growth, 2020–2025',
    question: 'Which Texas counties gained population fastest from the 2020 estimates base to July 1, 2025?',
    description: 'TexasDefined calculates both percentage growth and absolute population gain for all Texas counties from the U.S. Census Bureau Vintage 2025 county file.',
    domain: 'counties',
    path: '/texas-data/county-growth',
    csvPath: '/texas-data/county-growth.csv',
    sourceName: 'U.S. Census Bureau Population Estimates Program',
    updated: '2026-10-03',
    updateCadence: 'Annual, after the Census Bureau releases a new completed county-estimates vintage.',
  },
  {
    slug: 'property-tax-changes',
    title: 'Texas Property-Tax Rate Changes',
    question: 'Which Texas local taxing units changed their adopted property-tax rates the most in the latest two finalized years?',
    description: 'TexasDefined compares matched county, city and school-district adopted total rates across the two latest finalized Texas Comptroller datasets.',
    domain: 'property-tax',
    path: '/texas-data/property-tax-changes',
    csvPath: '/texas-data/property-tax-changes.csv',
    sourceName: 'Texas Comptroller Property Tax Assistance Division',
    updated: '2026-10-03',
    updateCadence: 'Annual, after a new finalized Texas Comptroller adopted-rate year is loaded and verified.',
  },
  {
    slug: 'lake-game-fish-diversity',
    title: 'Texas Lakes With the Most Documented Game-Fish Targets',
    question: 'Which TexasDefined lake profiles have the widest verified mix of game-fish targets?',
    description: 'TexasDefined counts verified lake-to-fish relationships in the maintained fishing dataset and normalizes the count by lake surface area as a secondary comparison.',
    domain: 'fishing',
    path: '/texas-data/lake-game-fish-diversity',
    csvPath: '/texas-data/lake-game-fish-diversity.csv',
    sourceName: 'Texas Parks & Wildlife Department and TexasDefined verified fishing records',
    updated: '2026-10-03',
    updateCadence: 'Recalculated whenever verified lake or fish relationships are added or materially changed.',
  },
] as const;

export const TEXASDEFINED_RESEARCH_EXTENSION_DOMAINS: readonly TexasDefinedResearchDomain[] = [
  'state-parks',
  'rivers',
  'football',
  'wildlife',
  'historic-sites',
];

export function getTexasDefinedResearchBrief(slug: string) {
  return TEXASDEFINED_RESEARCH_BRIEFS.find((brief) => brief.slug === slug) ?? null;
}
