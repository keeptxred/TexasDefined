import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Browse TexasDefined guides, calculators, directories, moving resources, property-tax help, and official-resource finders from one independent directory.';

const groups = [
  {
    title: 'Moving and settling in',
    links: [
      ['Moving to Texas', '/moving-to-texas'],
      ['Moving checklist', '/moving-to-texas-checklist'],
      ['Vehicle registration finder', '/find-my-dmv'],
      ['School district finder', '/find-my-school-district'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Financial tools', '/decide/financial-tools'],
      ['Property-tax guide', '/learn/property-taxes'],
      ['Homestead exemption', '/do/homestead-exemption'],
      ['Property-tax protest', '/do/property-tax-protest'],
      ['First-time homebuyer programs', '/texas-first-time-homebuyer-programs'],
      ['Texas sales tax', '/texas-sales-tax-explained'],
    ],
  },
  {
    title: 'Places and exploration',
    links: [
      ['Explore Texas', '/explore'],
      ['County directory', '/browse/counties'],
      ['City directory', '/browse/cities'],
      ['Texas Living', '/texas-living'],
    ],
  },
] as const;

export const Route = createFileRoute('/texas-resources')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-resources',
      title: 'Texas Resources', description }),
    links: [canonicalLink(texasDefinedBrand, '/texas-resources')],
  }),
  component: Page,
});

function Page() {
  return <Container className="py-16 sm:py-24"><main className="mx-auto max-w-6xl">
    <p className="eyebrow text-primary">Independent TexasDefined directory</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas Resources</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {groups.map((group) => <section key={group.title} className="rounded-lg border border-border p-6">
        <h2 className="font-display text-2xl">{group.title}</h2>
        <div className="mt-5 space-y-3">{group.links.map(([label, to]) => <Link key={to} to={to} className="block rounded border border-border px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary">{label} →</Link>)}</div>
      </section>)}
    </div>
    <p className="mt-10 rounded-lg bg-muted p-5 text-sm leading-6 text-muted-foreground">Political coverage, elections, legislation, officeholders, and government-accountability resources remain on KeepTXRed. TexasDefined owns the nonpolitical guides and tools listed here.</p>
  </main></Container>;
}
