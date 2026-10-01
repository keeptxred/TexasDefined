import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/property-tax-guides';
const description = 'Texas property tax guide for 2026: understand appraisals, homestead exemptions, protests, local rates, MUDs, bills, deadlines, county offices and official-rate calculators.';

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
  }),
  component: PropertyTaxGuidesPage,
});
