import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { COUNTY_EDITORIAL_ARTICLE_SLUGS } from '@/data/county-editorial';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const Route = createFileRoute('/county')({
  loader: async () => {
    const graph = await loadTexasKnowledgeGraph();
    return graph
      .filter((entity) => entity.kind === 'county')
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/county',
      title: 'Texas Counties',
      description: 'Browse Texas Defined guides to all 254 Texas counties, combining verified county facts, local resources and original county profiles as they are published.',
    }),
    links: [canonicalLink(texasDefinedBrand, '/county')],
  }),
  component: CountyIndexPage,
});

function CountyIndexPage() {
  const counties = Route.useLoaderData();
  const enriched = new Set(Object.keys(COUNTY_EDITORIAL_ARTICLE_SLUGS));

  return <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <header className="border-b border-border pb-10">
        <p className="eyebrow text-primary">Texas reference</p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">Texas counties</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">All 254 counties in one place. Every county page keeps its verified geography, communities and local-government resources; the Texas County Series adds long-form history, culture and place reporting to the same canonical guide.</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
        <span><strong className="text-foreground">{counties.length}</strong> county guides</span>
        <span><strong className="text-foreground">{counties.filter((county) => enriched.has(county.slug)).length}</strong> currently include full editorial profiles</span>
      </div>

      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {counties.map((county) => <li key={county.id} className="border-b border-border sm:px-4">
          <a href={`/county/${county.slug}`} className="group block py-5">
            <span className="font-display text-2xl leading-tight group-hover:text-primary">{county.name}</span>
            <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{enriched.has(county.slug) ? 'Full county profile' : 'County reference'} →</span>
          </a>
        </li>)}
      </ul>
    </main>
  </Container>;
}
