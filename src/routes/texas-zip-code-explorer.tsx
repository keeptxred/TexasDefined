import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const TexasZipCodeExplorerPage = lazy(() => import('@/components/relocation/TexasZipCodeExplorerPage'));

const canonicalPath = '/texas-zip-code-explorer';
const title = 'Texas ZIP Code Explorer and Address Research Tool';
const description = 'Use a Texas ZIP code as the starting point for address research, then verify county, school, utilities, broadband, flood risk and local services with authoritative sources.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'ReferenceApplication', operatingSystem: 'Web' })],
  }),
  component: () => <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">Loading Texas ZIP explorer…</div>}><TexasZipCodeExplorerPage /></Suspense>,
});
