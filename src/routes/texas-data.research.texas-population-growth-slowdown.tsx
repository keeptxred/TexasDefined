import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/research/texas-population-growth-slowdown';
const sourceUrl = 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html';
const verified = '2026-10-03';
const description = 'TexasDefined Research calculates how much Texas population growth slowed in 2024–2025 versus 2023–2024 using one consistent U.S. Census Bureau Vintage 2025 series.';

export const Route = createFileRoute('/texas-data/research/texas-population-growth-slowdown')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How Much Did Texas Population Growth Slow in 2025?', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org', '@type': 'Dataset',
      name: 'Texas population growth slowdown, 2023–2025 — Vintage 2025', description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath), dateModified: verified,
      temporalCoverage: '2023-07-01/2025-07-01', spatialCoverage: { '@type': 'Place', name: 'Texas' },
      creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: sourceUrl,
      variableMeasured: ['numeric population growth', 'net domestic migration', 'net international migration', 'natural increase', 'absolute change', 'percentage change'],
      distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/research/texas-population-growth-slowdown.csv') },
      measurementTechnique: 'TexasDefined Research Desk calculation from U.S. Census Bureau Vintage 2025 annual state population estimates and components of change; both comparison periods use the same vintage.',
    })],
  }),
});
