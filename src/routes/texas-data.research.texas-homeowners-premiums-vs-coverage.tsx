import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/research/texas-homeowners-premiums-vs-coverage';
const csvPath = '/texas-data/research/texas-homeowners-premiums-vs-coverage.csv';
const sourceUrl = 'https://tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html';
const description = 'TexasDefined Research Desk compares Texas homeowners average annual premiums and average insured coverage, 2016–2025, using one Texas Department of Insurance statistical-plan series.';

export const Route = createFileRoute('/texas-data/research/texas-homeowners-premiums-vs-coverage')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Did Texas Home Insurance Premiums Outpace Coverage Growth?', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      '@id': `${absoluteUrl(texasDefinedBrand, canonicalPath)}#dataset`,
      name: 'Texas Homeowners Premiums Versus Coverage, 2016–2025',
      description,
      url: absoluteUrl(texasDefinedBrand, canonicalPath),
      datePublished: '2026-10-10',
      dateModified: '2026-10-10',
      temporalCoverage: '2016/2025',
      spatialCoverage: { '@type': 'State', name: 'Texas' },
      creator: { '@type': 'Organization', name: 'TexasDefined Research Desk', url: absoluteUrl(texasDefinedBrand, '/texas-data') },
      publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
      isBasedOn: sourceUrl,
      citation: sourceUrl,
      measurementTechnique: 'Year-matched TDI Texas Statistical Plan statewide homeowners averages; TexasDefined calculates nominal dollar and percentage changes, year-over-year changes, indexed values, and the ratio of the two reported averages. The ratio is not an insurer rate or the average individual-policy ratio.',
      variableMeasured: ['Average annual homeowners premium (USD)', 'Average insured coverage (USD)', 'Annual absolute change (USD)', 'Annual percentage change (%)', 'Premium per $100,000 of average coverage (derived ratio of averages)'],
      distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, csvPath) },
      keywords: ['Texas homeowners insurance', 'premiums', 'coverage', 'TexasDefined original research'],
    })],
  }),
});
