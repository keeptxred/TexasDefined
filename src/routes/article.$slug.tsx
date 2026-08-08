import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleInternalLinks } from "@/data/article-internal-links";
import { articleQuery, articlesQuery, authorsQuery, categoriesQuery } from "@/data/queries";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink, schemaTypeForEntityKind } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

type ArticleDepartment = { name: string; path: string; usesExploreCategory: boolean };

function articleDepartment(category: string): ArticleDepartment {
  const livingHere = new Set(["moving-to-texas", "home-garden", "real-estate", "property-taxes"]);
  if (livingHere.has(category)) return { name: "Texas Life", path: "/texas-living", usesExploreCategory: false };
  if (category === "sports") return { name: "Sports", path: "/sports", usesExploreCategory: false };
  if (category === "texas-history" || category === "history") return { name: "History", path: "/texas-history", usesExploreCategory: false };
  return { name: "Explore", path: "/explore", usesExploreCategory: true };
}

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    const [authors, categories, , graph] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
      loadTexasKnowledgeGraph(),
    ]);
    return { article, authors, categories, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, categories, graph } = loaderData;
    const canonicalPath = `/article/${params.slug}`;
    const articleUrl = `${siteUrl}${canonicalPath}`;
    const imageUrl = absoluteUrl(texasDefinedBrand, article.hero.src);
    const author = authors.find((item) => item.id === article.authorId);
    const authorId = author ? `${articleUrl}#author-${author.id}` : `${siteUrl}/#organization`;
    const text = [article.title, article.dek, ...article.body.flatMap((block) => block.type === "list" ? block.items : "text" in block ? [block.text] : [])].join(" ").toLowerCase();
    const mentions = graph.filter((entity) => [entity.name, ...entity.aliases].some((label) => {
      if (label.length < 4) return false;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text);
    })).slice(0, 20);
    const categoryName = categories.find((category) => category.slug === article.category)?.name
      ?? article.category.replace(/-/g, " ");
    const department = articleDepartment(article.category);

    const webPageSchema = {
      "@type": "WebPage",
      "@id": articleUrl,
      url: articleUrl,
      name: article.title,
      description: article.dek,
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: { "@id": `${articleUrl}#primaryimage` },
      mainEntity: { "@id": `${articleUrl}#article` },
      breadcrumb: { "@id": `${articleUrl}#breadcrumbs` },
    };
    const authorSchema = author ? {
      "@type": "Person",
      "@id": authorId,
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
    } : null;
    const articleSchema = {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      url: articleUrl,
      mainEntityOfPage: { "@id": articleUrl },
      headline: article.title,
      description: article.dek,
      image: [{ "@type": "ImageObject", "@id": `${articleUrl}#primaryimage`, url: imageUrl, caption: article.hero.alt, width: article.hero.width, height: article.hero.height }],
      datePublished: article.publishedAt,
      articleSection: categoryName,
      keywords: article.tags,
      isAccessibleForFree: true,
      author: { "@id": authorId },
      publisher: { "@id": `${siteUrl}/#organization` },
      mentions: mentions.map((entity) => ({ "@type": schemaTypeForEntityKind(entity.kind), name: entity.name, url: `${siteUrl}${canonicalEntityPath(entity)}` })),
    };
    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: department.name, item: `${siteUrl}${department.path}` },
      ...(department.usesExploreCategory ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${article.category}` }] : []),
      { "@type": "ListItem", position: department.usesExploreCategory ? 4 : 3, name: article.title, item: articleUrl },
    ];
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumbs`,
      itemListElement: breadcrumbItems,
    };
    const schemaGraph = [webPageSchema, ...(authorSchema ? [authorSchema] : []), articleSchema, breadcrumbSchema];

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: article.title,
        description: article.dek,
        type: "article",
        canonicalPath,
        image: article.hero.src,
        imageAlt: article.hero.alt,
        publishedTime: article.publishedAt,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Story unavailable</p><h1 className="mt-3 font-display text-4xl">This story is no longer available</h1><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Browse current stories and field guides in <Link to="/explore" className="border-b border-primary text-primary">Explore Texas</Link>.</p></Container>,
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { graph, categories } = Route.useLoaderData();
  const { data: article } = useSuspenseQuery(articleQuery(slug));
  const { data: authors } = useSuspenseQuery(authorsQuery());
  const { data: related } = useSuspenseQuery(articlesQuery(article ? { category: article.category, limit: 4 } : { limit: 4 }));
  if (!article) return null;
  const author = authors.find((item) => item.id === article.authorId) ?? null;
  const categoryName = categories.find((category) => category.slug === article.category)?.name
    ?? article.category.replace(/-/g, " ");
  const department = articleDepartment(article.category);
  const internalLinks = article.internalLinks ?? articleInternalLinks[article.slug] ?? [];

  return <article>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">·</li>
          <li><Link to={department.path} className="hover:text-foreground">{department.name}</Link></li>
          {department.usesExploreCategory && <><li aria-hidden="true">·</li><li><Link to="/explore/$category" params={{ category: article.category }} className="hover:text-foreground">{categoryName}</Link></li></>}
        </ol>
      </nav>
    </Container>
    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground"><img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-60" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" /><Container className="relative flex min-h-[62vh] flex-col justify-end pb-14 pt-36 sm:pb-16"><p className="eyebrow text-ink-foreground/80">{categoryName}</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{article.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/86">{article.dek}</p></Container></section>
    <Container className="max-w-3xl py-12 sm:py-16">
      <Byline author={author} meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`} />
      <div className="mt-10"><ArticleBody blocks={article.body} entities={graph} /></div>
      {article.hero.credit && <p className="mt-10 text-xs text-muted-foreground">Photography: {article.hero.credit}</p>}
      {internalLinks.length > 0 && <aside className="mt-14 border-y border-border py-8" aria-label="Related reading">
        <p className="eyebrow text-primary">Related reading</p>
        <ul className="mt-5 divide-y divide-border">{internalLinks.map((item) => <li key={item.href} className="py-4 first:pt-0 last:pb-0">
          <a href={item.href} className="group block">
            <span className="font-display text-xl group-hover:text-primary">{item.label}</span>
            {item.description && <span className="mt-1 block text-sm leading-7 text-muted-foreground">{item.description}</span>}
          </a>
        </li>)}</ul>
      </aside>}
      {article.tags.length > 0 && <div className="mt-10 border-t border-border pt-5"><p className="eyebrow text-muted-foreground">Filed under</p><ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{article.tags.map((tag) => <li key={tag} className="text-sm text-foreground/75">{tag}</li>)}</ul></div>}
    </Container>
    <Section tone="surface"><Container><SectionHeader eyebrow="From the magazine" title="More stories to read next" /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{related.filter((item) => item.id !== article.id).slice(0, 3).map((item) => <li key={item.id}><ArticleCard article={item} size="compact" /></li>)}</ul></Container></Section>
  </article>;
}
