import { lazy, Suspense } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const TexasCityComparisonTool = lazy(async () => {
  const module = await import('@/components/relocation/TexasCityComparisonTool');
  return { default: module.TexasCityComparisonTool };
});

const canonicalPath = '/compare-texas-cities';
const title = 'Compare Texas Cities for a Move';
const description = 'Compare TexasDefined relocation-planning context for Texas cities and suburbs, including region, setting, commute pattern, climate and county context.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Compare Texas Cities for a Move', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'ReferenceApplication', operatingSystem: 'Web' })],
  }),
  component: Page,
});

function Page() {
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page" className="text-foreground">Compare cities</span></nav>
    <header className="border-b border-border py-10"><p className="eyebrow text-primary">Choosing a place</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Compare Texas cities before you narrow to a neighborhood</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></header>
    <section className="py-10"><Suspense fallback={<div className="min-h-48 py-12 text-sm text-muted-foreground">Loading Texas city comparison…</div>}><TexasCityComparisonTool /></Suspense></section>
    <section className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3"><Link to="/browse/cities" className="bg-background p-5 font-semibold hover:text-primary">Browse Texas cities →</Link><Link to="/texas-cost-of-living-calculator" className="bg-background p-5 font-semibold hover:text-primary">Compare household costs →</Link><Link to="/find-my-school-district" className="bg-background p-5 font-semibold hover:text-primary">Verify school district →</Link></section>
  </article></Container>;
}
