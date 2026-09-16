import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const RelocationToolsIndex = lazy(() => import('@/components/relocation/RelocationToolsIndex'));
const canonicalPath = '/moving-to-texas/tools';
const description = 'TexasDefined tools for county, school, utility, voter, homestead, property-tax, ZIP and city research when moving to Texas.';

function Page() {
  return <Suspense fallback={<main className="min-h-screen" />}><RelocationToolsIndex /></Suspense>;
}

export const Route = createFileRoute('/moving-to-texas/tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Relocation Tools',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: Page,
});
