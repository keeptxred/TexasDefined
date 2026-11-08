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
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Texas Property Tax Rate History Explorer',
          description,
          url: pageUrl,
        },
        {
          '@type': 'Dataset',
          '@id': `${pageUrl}#dataset`,
          name: 'Texas local property-tax rate history',
          description,
          url: pageUrl,
          creator: { '@type': 'Organization', name: 'Texas Defined', url: absoluteUrl(texasDefinedBrand, '/about') },
          publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
          isBasedOn: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
          license: absoluteUrl(texasDefinedBrand, '/dataset-reference-license-v1.txt'),
          isAccessibleForFree: true,
        },
      ],
    })],
  }),
});
