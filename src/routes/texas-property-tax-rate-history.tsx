import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-property-tax-rate-history';
const description = 'Explore annual Texas property-tax rates for counties, cities, school districts and special districts using historical Comptroller statewide files.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

const faq = [
  {
    question: 'Does a lower property-tax rate mean my bill went down?',
    answer: 'Not necessarily. A property-tax bill depends on taxable value, exemptions and every applicable taxing unit. A rate can fall while the bill rises if taxable value grows enough.',
  },
  {
    question: 'Can this explorer prove what a specific parcel paid in prior years?',
    answer: 'No. Use historical tax bills, appraisal records and official parcel-level records for that. This explorer tracks taxing-unit rate records rather than parcel jurisdiction.',
  },
  {
    question: 'Why do some taxing units have only a few years of history?',
    answer: 'A unit may be new, renamed, dissolved, absent from an older statewide file or represented in a source format that cannot be safely normalized.',
  },
  {
    question: 'Why can a property-tax bill rise when the tax rate falls?',
    answer: 'Taxable value can rise faster than the rate falls, and a parcel can be subject to multiple taxing units whose rates move independently.',
  },
];

export const Route = createFileRoute('/texas-property-tax-rate-history')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Rate History Explorer', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${pageUrl}#tool`,
        name: 'Texas Property Tax Rate History Explorer',
        description,
        url: pageUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        featureList: [
          'Historical taxing-unit rate lookup',
          'Comparable-year tax-rate trend',
          'M&O and debt-service components when reported',
          'Reported levy history when available',
          'Missing and variable-rate preservation',
        ],
      }),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: absoluteUrl(texasDefinedBrand, '/property-tax-calculators') },
          { '@type': 'ListItem', position: 3, name: 'Rate history', item: pageUrl },
        ],
      }),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    ],
  }),
});
