import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Useful Texas facts, local directories and planning resources gathered in one place — whether you are researching a move, comparing costs or simply getting to know the state better.';

const resources = [
  ['Texas counties', '/browse/counties', 'Explore all 254 counties and find trusted local resources for each one.'],
  ['Texas cities', '/browse/cities', 'Browse major cities, regional centers and communities across the state.'],
  ['Places to explore', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money and moving tools', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resource guide', '/texas-resources', 'Start with helpful directories, official contacts and practical guides.'],
] as const;

export const Route = createFileRoute('/texas-data')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-data',
      title: 'Texas Facts and Directories',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-data')],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-6xl">
        <p className="eyebrow text-primary">Texas at a glance</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas facts, places and practical resources</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(([title, to, copy]) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              <span className="mt-5 block text-sm font-medium text-primary">Take a look →</span>
            </Link>
          ))}
        </div>
        <aside className="mt-10 rounded-lg border border-border p-5 text-sm leading-6 text-muted-foreground">
          We favor clear explanations and trusted public sources so you can use these pages as a starting point, not a substitute for official advice.
        </aside>
      </main>
    </Container>
  );
}
