import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { articlesQuery } from '@/data/queries';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical starting point for moving, buying a home, understanding local costs and handling the everyday details of life here.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-living`;
const sections = [
  ['Places worth knowing', '/explore', 'Parks, lakes, small towns and road trips for the weekends you want to remember.'],
  ['Making the move', '/moving-to-texas', 'Compare places, understand the costs and arrive with fewer surprises.'],
  ['Home buying and ownership', '/real-estate', 'Mortgages, closing costs, insurance, equity and the complete cost of owning a Texas home.'],
  ['Money Made Clearer', '/decide/financial-tools', 'Straightforward calculators for housing, paychecks, utilities, insurance and household costs.'],
  ['Understanding property taxes', '/learn/property-taxes', 'A plain-English look at appraisals, exemptions, protests, bills and payments.'],
  ['Find your county', '/browse/counties', 'Start with your county and continue to the offices and information that matter.'],
  ['Find a city', '/browse/cities', 'Look up cities across the state and see what we have nearby.'],
  ['Getting your car settled', '/find-my-dmv', 'The steps new residents need, plus the right local office to contact.'],
  ['Finding your school district', '/find-my-school-district', 'Use the official sources that show which district serves an address.'],
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
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-living', title: 'Living Here', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-living')],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'Living Here', description, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${pageUrl}#topics` }, breadcrumb: { '@id': `${pageUrl}#breadcrumbs` } },
        { '@type': 'ItemList', '@id': `${pageUrl}#topics`, name: 'Guides for living here', numberOfItems: topicItems.length + articleItems.length, itemListElement: [...topicItems, ...articleItems] },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Living Here', item: pageUrl }] },
      ] }) }],
    };
  },
  component: TexasLivingPage,
});

function TexasLivingPage() {
  const { homeArticles, movingArticles } = Route.useLoaderData();
  return <>
    <Container className="pb-10 pt-16 sm:pt-24">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-foreground">Living Here</li></ol></nav>
        <div className="mt-10 max-w-4xl border-b border-border pb-12">
          <p className="eyebrow text-primary">The Texas Living Guide</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-7xl">Making a life in Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(([title, to, copy], index) => <Link key={to} to={to} className="group border-t border-border pt-5">
            <span className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open guide →</span>
          </Link>)}
        </div>
      </main>
    </Container>

    {homeArticles.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Home & ownership" title="The practical side of putting down roots" description="Mortgages, closing costs, insurance, equity, utilities and the true cost of owning a home in Texas." actionLabel="See all home guides" actionTo="/real-estate" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{homeArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>}

    {movingArticles.length > 0 && <Section><Container><SectionHeader eyebrow="Moving to Texas" title="What to know before you unpack" description="City-by-city help with commutes, schools, utilities, taxes, insurance and regional costs." actionLabel="See all moving guides" actionTo="/moving-to-texas" /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{movingArticles.slice(0, 9).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>}
  </>;
}
