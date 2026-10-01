import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property';
const description = 'Texas homeowner hub for property taxes, exemptions, protests, county guides, calculators and ownership costs.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const structuredGuides = [
  { to: '/learn/property-taxes', label: 'How Texas Property Taxes Work', body: 'Plain-English guide to values, exemptions, local taxing units, protests and payments.' },
  { to: '/decide/property-taxes', label: 'Property Tax Decisions', body: 'Decision path through exemptions, protests and payments.' },
  { to: '/do/homestead-exemption', label: 'Homestead Exemption', body: 'Eligibility, filing and appraisal protections.' },
  { to: '/do/property-tax-protest', label: 'Property Tax Protest', body: 'Deadlines, evidence and appraisal review board hearings.' },
  { to: '/learn/agricultural-valuation', label: 'Agricultural Valuation', body: 'Productivity appraisal for qualifying agricultural land.' },
  { to: '/learn/wildlife-management-valuation', label: 'Wildlife Management Valuation', body: 'Special appraisal for qualifying wildlife-management land.' },
  { to: '/learn/mud-taxes-explained', label: 'Municipal Utility District (MUD) Taxes', body: 'How utility-district taxes affect ownership cost.' },
] as const;

const PropertyHubPage = lazy(() => import('@/components/property/PropertyHubPage').then((module) => ({ default: module.PropertyHubPage })));

function PropertyPage() {
  return <Suspense fallback={null}><PropertyHubPage /></Suspense>;
}

export const Route = createFileRoute('/property')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property & Homeowner Guide', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Property & Homeowner Guide', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, mainEntity: { '@id': `${pageUrl}#guides` } },
        { '@type': 'ItemList', '@id': `${pageUrl}#guides`, name: 'Texas property guides', numberOfItems: structuredGuides.length, itemListElement: structuredGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'WebPage', '@id': absoluteUrl(texasDefinedBrand, guide.to), url: absoluteUrl(texasDefinedBrand, guide.to), name: guide.label, description: guide.body } })) },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Property', item: pageUrl }] },
      ],
    })],
  }),
  component: PropertyPage,
});
