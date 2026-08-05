import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Open TexasDefined-owned county, city, Explore, property-tax, and planning datasets without depending on KeepTXRed production data.';

const datasets = [
  ['Texas counties', '/browse/counties', 'All 254 counties with official local-resource pathways.'],
  ['Texas cities', '/browse/cities', 'Major and regional cities organized for local research.'],
  ['Explore catalog', '/explore', 'Texas parks, lakes, caverns, regions, counties, and trip-planning records.'],
  ['Property-tax planning', '/decide/property-taxes', 'Browser-based estimates and official-source guidance.'],
  ['Financial calculators', '/decide/financial-tools', 'Independent browser-only household and homeownership tools.'],
  ['Texas resource directory', '/texas-resources', 'Guides, finders, directories, and official starting points.'],
] as const;

export const Route = createFileRoute('/texas-data')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: 'Texas Data and Directories', description }),
    links: [canonicalLink(texasDefinedBrand, '/texas-data')],
  }),
  component: Page,
});

function Page() {
  return <Container className="py-16 sm:py-24"><main className="mx-auto max-w-6xl">
    <p className="eyebrow text-primary">TexasDefined data</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas Data and Directories</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {datasets.map(([title, to, copy]) => <Link key={to} to={to} className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm">
        <h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 block text-sm font-medium text-primary">Open dataset →</span>
      </Link>)}
    </div>
    <aside className="mt-10 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground">TexasDefined data is site-owned and nonpolitical. Election, bill, officeholder, and legislative datasets remain exclusively on KeepTXRed.</aside>
  </main></Container>;
}
