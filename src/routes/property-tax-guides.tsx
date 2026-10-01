import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax-guides';
const title = 'Texas Property Tax Guide 2026: Exemptions, Protests & Rates';
const description = 'Texas property tax guide for 2026: understand appraisals, homestead exemptions, protests, local rates, MUDs, bills, deadlines, county offices and official-rate calculators.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const siteUrl = absoluteUrl(texasDefinedBrand, '/');

const PropertyTaxHubPage = lazy(() => import('@/components/guides/PropertyTaxHubPage').then((module) => ({
  default: module.PropertyTaxHubPage,
})));

function PropertyTaxGuidesPage() {
  return <Suspense fallback={null}><PropertyTaxHubPage /></Suspense>;
}

export const Route = createFileRoute('/property-tax-guides')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Property Tax Guide 2026: Exemptions, Protests & Rates',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: '2026-10-01',
          isPartOf: { '@id': `${siteUrl}#website` },
          publisher: { '@id': `${siteUrl}#organization` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
            { '@type': 'ListItem', position: 3, name: 'Texas Property Tax Guide', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: PropertyTaxGuidesPage,
});
