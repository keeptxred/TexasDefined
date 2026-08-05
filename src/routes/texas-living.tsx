import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Practical Texas guides, calculators, directories, moving resources, homeownership help, and everyday planning tools.';
const resources = [
  ['Explore Texas', '/explore', 'Parks, lakes, caverns, destinations, regions, and trip planning.'],
  ['Moving to Texas', '/moving-to-texas', 'Choose where to live, understand costs, and organize the move.'],
  ['Financial tools', '/decide/financial-tools', 'Housing, salary, utility, insurance, tax, and household calculators.'],
  ['Property taxes', '/learn/property-taxes', 'Appraisals, exemptions, rates, protests, bills, and payments.'],
  ['County directory', '/browse/counties', 'All 254 counties and official local resources.'],
  ['City directory', '/browse/cities', 'Browse Texas cities by county and region.'],
  ['Vehicle registration', '/find-my-dmv', 'New-resident steps and official county office links.'],
  ['School districts', '/find-my-school-district', 'Official tools for identifying the district serving an address.'],
] as const;

export const Route = createFileRoute('/texas-living')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-living',
      title: 'Texas Living', description }),
    links: [canonicalLink(texasDefinedBrand, '/texas-living')] }),
  component: () => <Container className="py-16 sm:py-24"><main className="mx-auto max-w-6xl"><p className="eyebrow text-primary">Everyday Texas</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas Living</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{resources.map(([title,to,copy]) => <Link key={to} to={to} className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm"><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 block text-sm font-medium text-primary">Open resource →</span></Link>)}</div></main></Container>,
});
