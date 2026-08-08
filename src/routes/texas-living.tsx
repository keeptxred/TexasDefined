import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { articlesQuery } from '@/data/queries';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Homes, history, sports, moving and the practical details of making a life in Texas — gathered into one magazine department.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-living`;
const sections = [
  ['Explore Texas', '/explore', 'Parks, lakes, small towns, road trips and places worth making time for.'],
  ['Texas Sports', '/sports', 'The games, rivalries and rituals that are part of life here.'],
  ['Texas History', '/texas-history', 'The people, places and turning points that still shape the state.'],
  ['Home & Garden', '/home-garden', 'Texas homes, yards, seasons and the practical projects that come with them.'],
  ['Moving Here', '/moving-to-texas', 'Compare places, understand the costs and arrive with fewer surprises.'],
  ['Homes & Land', '/real-estate', 'Home buying, ownership, mortgages, insurance, equity and land.'],
  ['Practical Guides', '/guides', 'Useful answers for the decisions and details that come with living in Texas.'],
  ['Money & Property', '/decide/financial-tools', 'Calculators and explainers for housing, paychecks, utilities, insurance and property taxes.'],
] as const;

export const Route = createFileRoute('/texas-living')({
  loader: async ({ context }) => {
    const [homeArticles, movingArticles] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: 'real-estate' })),
      context.queryClient.ensureQueryData(articlesQuery({ category: 'moving-to-texas' })),
    ]);
    return { homeArticles, movingArticles };
  },
  head: ({ loaderData }) => {
    const articles = [...(loaderData?.homeArticles ?? []), ...(loaderData?.movingArticles ?? [])];
    const topicItems = sections.map(([name, path, copy], index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'WebPage', name, description: copy, url: `${siteUrl}${path}` } }));
    const articleItems = articles.map((article, index) => ({ '@type': 'ListItem', position: topicItems.length + index + 1, item: { '@type': 'Article', name: article.title, description: article.dek, url: `${siteUrl}/article/${article.slug}` } }));
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-living', title: 'Texas Life', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-living')],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Life', description, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${pageUrl}#topics` }, breadcrumb: { '@id': `${pageUrl}#breadcrumbs` } },
        { '@type': 'ItemList', '@id': `${pageUrl}#topics`, name: 'Texas Life departments and guides', numberOfItems: topicItems.length + articleItems.length, itemListElement: [...topicItems, ...articleItems] },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Texas Life', item: pageUrl }] },
      ] }) }],
    };
  },
  component: TexasLivingPage,
});

function TexasLivingPage() {
  const { homeArticles, movingArticles } = Route.useLoaderData();
  return <>
    <Container className="pb-10 pt-14 sm:pt-20">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-foreground">Texas Life</li></ol></nav>
        <div className="mt-9 max-w-5xl border-b border-border pb-12">
          <p className="eyebrow text-primary">Texas Life</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">How Texans live, move, play and put down roots</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(([title, to, copy], index) => <Link key={to} to={to} className="group border-t border-border pt-5">
            <span className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open section →</span>
          </Link>)}
        </div>
      </main>
    </Container>

    {homeArticles.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Homes & ownership" title="The practical side of putting down roots" description="Mortgages, closing costs, insurance, equity, utilities and the true cost of owning a home in Texas." actionLabel="See all home guides" actionTo="/real-estate" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{homeArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>}

    {movingArticles.length > 0 && <Section><Container><SectionHeader eyebrow="Moving here" title="What to know before you unpack" description="City-by-city help with commutes, schools, utilities, taxes, insurance and regional costs." actionLabel="See all moving guides" actionTo="/moving-to-texas" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{movingArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>}
  </>;
}
