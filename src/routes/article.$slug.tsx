import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleQuery, articlesQuery, authorsQuery } from "@/data/queries";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink, schemaTypeForEntityKind } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    const [authors, , graph] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
      loadTexasKnowledgeGraph(),
    ]);
    return { article, authors, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, graph } = loaderData;
    const canonicalPath = `/article/${params.slug}`;
    const articleUrl = `${siteUrl}${canonicalPath}`;
    const author = authors.find((item) => item.id === article.authorId);
    const text = [article.title, article.dek, ...article.body.flatMap((block) => block.type === "list" ? block.items : "text" in block ? [block.text] : [])].join(" ").toLowerCase();
    const mentions = graph.filter((entity) => [entity.name, ...entity.aliases].some((label) => {
      if (label.length < 4) return false;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text);
    })).slice(0, 20);
    const categoryName = article.category.replace(/-/g, " ");

    const articleSchema = {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      url: articleUrl,
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      headline: article.title,
      description: article.dek,
      image: [{ "@type": "ImageObject", url: absoluteUrl(texasDefinedBrand, article.hero.src), caption: article.hero.alt, width: article.hero.width, height: article.hero.height }],
      datePublished: article.publishedAt,
      articleSection: article.category,
      keywords: article.tags,
      isAccessibleForFree: true,
      author: author ? { "@type": "Person", name: author.name } : { "@type": "Organization", name: texasDefinedBrand.identity.name },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: texasDefinedBrand.identity.name, url: siteUrl },
      mentions: mentions.map((entity) => ({ "@type": schemaTypeForEntityKind(entity.kind), name: entity.name, url: `${siteUrl}${canonicalEntityPath(entity)}` })),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${article.category}` },
        { "@type": "ListItem", position: 4, name: article.title, item: articleUrl },
      ],
    };

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
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [articleSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><h1 className="font-display text-3xl">That story isn't here</h1><p className="mt-3 text-sm text-muted-foreground">It may have moved. <Link to="/explore" className="text-primary underline">Browse Explore</Link>.</p></Container>,
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { graph } = Route.useLoaderData();
  const { data: article } = useSuspenseQuery(articleQuery(slug));
  const { data: authors } = useSuspenseQuery(authorsQuery());
  const { data: related } = useSuspenseQuery(articlesQuery(article ? { category: article.category, limit: 4 } : { limit: 4 }));
  if (!article) return null;
  const author = authors.find((item) => item.id === article.authorId) ?? null;
  const categoryName = article.category.replace(/-/g, " ");

  return <article>
    <Container className="pt-24">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li><li aria-hidden="true">/</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden="true">/</li>
          <li><Link to="/explore/$category" params={{ category: article.category }} className="capitalize hover:text-foreground">{categoryName}</Link></li><li aria-hidden="true">/</li>
          <li aria-current="page" className="truncate text-foreground">{article.title}</li>
        </ol>
      </nav>
    </Container>
    <section className="relative isolate mt-4 overflow-hidden bg-ink text-ink-foreground"><img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-60" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" /><Container className="relative flex min-h-[60vh] flex-col justify-end pb-14 pt-32"><p className="eyebrow text-ink-foreground/80">{categoryName}</p><h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">{article.title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/85">{article.dek}</p></Container></section>
    <Container className="max-w-3xl py-12"><Byline author={author} meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`} /><div className="mt-10"><ArticleBody blocks={article.body} entities={graph} /></div>{article.hero.credit && <p className="mt-10 text-xs text-muted-foreground">Photograph: {article.hero.credit}</p>}<ul className="mt-10 flex flex-wrap gap-2">{article.tags.map((tag) => <li key={tag} className="rounded-sm bg-secondary px-3 py-1 text-xs uppercase tracking-widest text-secondary-foreground">{tag}</li>)}</ul></Container>
    <Section tone="surface"><Container><SectionHeader eyebrow="Keep reading" title="More in this section" /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{related.filter((item) => item.id !== article.id).slice(0, 3).map((item) => <li key={item.id}><ArticleCard article={item} size="compact" /></li>)}</ul></Container></Section>
  </article>;
}
