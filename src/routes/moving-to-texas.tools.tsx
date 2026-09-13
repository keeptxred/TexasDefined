import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const RelocationToolsPage = lazy(() => import('@/components/relocation/RelocationToolsPage'));

const canonicalPath = '/moving-to-texas/tools';
const title = 'Texas Relocation Tools';
const description = 'TexasDefined relocation finders for school districts, DMV and county offices, utilities, voter registration, homestead exemptions, property taxes, emergency services, ZIP research and city comparison.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: `${siteUrl}${canonicalPath}` })],
  }),
  component: () => <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">Loading Texas relocation tools…</div>}><RelocationToolsPage /></Suspense>,
});
