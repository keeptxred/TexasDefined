import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const CompareTexasCitiesPage = lazy(() => import('@/components/relocation/CompareTexasCitiesPage'));

const canonicalPath = '/compare-texas-cities';
const title = 'Compare Texas Cities for a Move';
const description = 'Compare TexasDefined relocation-planning context for Texas cities and suburbs, including region, setting, commute pattern, climate and county context.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'ReferenceApplication', operatingSystem: 'Web' })],
  }),
  component: () => <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">Loading Texas city comparison…</div>}><CompareTexasCitiesPage /></Suspense>,
});
