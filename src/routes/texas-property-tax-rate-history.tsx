import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-property-tax-rate-history';
const description = 'Explore annual Texas property-tax rates for counties, cities, school districts and special districts using historical Comptroller statewide files.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute('/texas-property-tax-rate-history')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Rate History Explorer', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${pageUrl}#tool`,
      name: 'Texas Property Tax Rate History Explorer',
      description,
      url: pageUrl,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
    })],
  }),
});
