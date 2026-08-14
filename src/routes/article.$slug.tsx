import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleInternalLinks } from "@/data/article-internal-links";
import { articleQuery, articlesQuery, authorsQuery, categoriesQuery, destinationsQuery } from "@/data/queries";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink, schemaTypeForEntityKind } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const DISCOVER_MIN_IMAGE_WIDTH = 1200;
const texasExplainedPillarSlugs = new Set([
  "texas-rivers-explained",
  "texas-lakes-reservoirs-explained",
  "texas-farm-to-market-roads-explained",
  "texas-courthouses-town-square",
  "texas-wildflowers-guide",
  "texas-trees-guide",
  "texas-home-architecture-regions",
  "buying-land-in-texas-guide",
  "texas-wildlife-guide",
  "texas-cultural-regions-explained",
]);

type ArticleDepartment = { name: string; path: string; usesExploreCategory: boolean };

function articleDepartment(category: string): ArticleDepartment {
  const livingHere = new Set(["moving-to-texas", "home-garden", "real-estate", "property-taxes"]);
  if (livingHere.has(category)) return { name: "Texas Life", path: "/texas-living", usesExploreCategory: false };
  if (category === "sports") return { name: "Sports", path: "/sports", usesExploreCategory: false };
  if (category === "texas-history" || category === "history") return { name: "History", path: "/texas-history", usesExploreCategory: false };
  return { name: "Explore", path: "/explore", usesExploreCategory: true };
}

function articleText(article: { title: string; dek: string; body: Array<{ type: string; text?: string; items?: string[] }> }) {
  return [article.title, article.dek, ...article.body.flatMap((block) => block.type === "list" ? block.items ?? [] : block.text ? [block.text] : [])].join(" ");
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    const [authors, categories, , destinations, graph] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      loadTexasKnowledgeGraph(),
    ]);
    return { article, authors, categories, destinations, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, categories, destinations, graph } = loaderData;
    const canonicalPath = `/article/${params.slug}`;
    const articleUrl = `${siteUrl}${canonicalPath}`;
    const imageUrl = absoluteUrl(texasDefinedBrand, article.hero.src);
    const author = authors.find((item) => item.id === article.authorId);
    const authorUrl = author ? `${siteUrl}/authors/${author.id}` : null;
    const authorId = authorUrl ? `${authorUrl}#desk` : `${siteUrl}/#organization`;
    const fullText = articleText(article);
    const text = fullText.toLowerCase();
    const mentions = graph.filter((entity) => [entity.name, ...entity.aliases].some((label) => {
      if (label.length < 4) return false;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text);
    })).slice(0, 20);
    const categoryName = categories.find((category) => category.slug === article.category)?.name
      ?? article.category.replace(/-/g, " ");
    const department = articleDepartment(article.category);
    const relatedDestinations = article.relatedDestinations
      .map((slug) => destinations.find((destination) => destination.slug === slug))
      .filter((destination): destination is NonNullable<typeof destination> => Boolean(destination))
      .slice(0, 8);
    const imageSchema = {
      "@type": "ImageObject",
      "@id": `${articleUrl}#primaryimage`,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: article.hero.alt,
      width: article.hero.width,
      height: article.hero.height,
      representativeOfPage: true,
      ...(article.hero.credit ? { creditText: article.hero.credit } : {}),
    };

    const webPageSchema = {
      "@type": "WebPage",
      "@id": articleUrl,
      url: articleUrl,
      name: article.title,
      description: article.dek,
      inLanguage: texasDefinedBrand.identity.locale,
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: { "@id": `${articleUrl}#primaryimage` },
      mainEntity: { "@id": `${articleUrl}#article` },
      breadcrumb: { "@id": `${articleUrl}#breadcrumbs` },
      datePublished: article.publishedAt,
    };
    const authorSchema = author && authorUrl ? {
      "@type": "Organization",
      "@id": authorId,
      name: author.name,
      description: author.bio,
      url: authorUrl,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
    } : null;
    const articleSchema = {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      url: articleUrl,
      mainEntityOfPage: { "@id": articleUrl },
      headline: article.title,
      description: article.dek,
      inLanguage: texasDefinedBrand.identity.locale,
      image: [{ "@id": `${articleUrl}#primaryimage` }],
      thumbnailUrl: imageUrl,
      datePublished: article.publishedAt,
      articleSection: categoryName,
      genre: department.name,
      keywords: article.tags,
      wordCount: wordCount(fullText),
      isAccessibleForFree: true,
      author: { "@id": authorId },
      publisher: { "@id": `${siteUrl}/#organization` },
      ...(texasExplainedPillarSlugs.has(article.slug) ? {
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${siteUrl}/texas-explained#collection`,
          name: "Texas Explained",
          url: `${siteUrl}/texas-explained`,
        },
      } : {}),
      about: mentions.slice(0, 8).map((entity) => ({ "@id": `${siteUrl}${canonicalEntityPath(entity)}#entity` })),
      mentions: mentions.map((entity) => ({ "@type": schemaTypeForEntityKind(entity.kind), "@id": `${siteUrl}${canonicalEntityPath(entity)}#entity`, name: entity.name, url: `${siteUrl}${canonicalEntityPath(entity)}` })),
      ...(relatedDestinations.length ? {
        hasPart: relatedDestinations.map((destination) => ({
          "@type": "TouristAttraction",
          "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
          name: destination.name,
          url: `${siteUrl}/destination/${destination.slug}`,
        })),
      } : {}),
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
    const schemaGraph = [webPageSchema, imageSchema, ...(authorSchema ? [authorSchema] : []), articleSchema, breadcrumbSchema];

    return {
      meta: buildMeta(texasDefinedBrand, {
        title: article.title,
        description: article.dek,
        type: "article",
        canonicalPath,
        image: article.hero.src,
        imageAlt: article.hero.alt,
        imageWidth: article.hero.width,
        imageHeight: article.hero.height,
        publishedTime: article.publishedAt,
      }),
      links: [
        canonicalLink(texasDefinedBrand, canonicalPath),
        ...(article.hero.width >= DISCOVER_MIN_IMAGE_WIDTH ? [{ rel: "preload", as: "image", href: article.hero.src, fetchPriority: "high" as const }] : []),
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Story unavailable</p><h1 className="mt-3 font-display text-4xl">This story is no longer available</h1><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Browse current stories and field guides in <Link to="/explore" className="border-b border-primary text-primary">Explore Texas</Link>.</p></Container>,
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { graph, categories, destinations } = Route.useLoaderData();
  const { data: article } = useSuspenseQuery(articleQuery(slug));
  const { data: authors } = useSuspenseQuery(authorsQuery());
  const { data: related } = useSuspenseQuery(articlesQuery(article ? { category: article.category, limit: 4 } : { limit: 4 }));
  if (!article) return null;
  const author = authors.find((item) => item.id === article.authorId) ?? null;
  const categoryName = categories.find((category) => category.slug === article.category)?.name
    ?? article.category.replace(/-/g, " ");
  const department = articleDepartment(article.category);
  const isTexasExplainedPillar = texasExplainedPillarSlugs.has(article.slug);
  const embeddedInternalLinks = article.internalLinks ?? [];
  const supplementalInternalLinks = articleInternalLinks[article.slug] ?? [];
  const internalLinks = [
    ...embeddedInternalLinks,
    ...supplementalInternalLinks.filter(
      (link) => !embeddedInternalLinks.some((existing) => existing.href === link.href),
    ),
  ];
  const relatedDestinations = article.relatedDestinations
    .map((destinationSlug) => destinations.find((destination) => destination.slug === destinationSlug))
    .filter((destination): destination is NonNullable<typeof destination> => Boolean(destination))
    .slice(0, 6);

  return <article>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">·</li>
          <li><Link to={department.path} className="hover:text-foreground">{department.name}</Link></li>
          {department.usesExploreCategory && <><li aria-hidden="true">·</li><li><Link to="/explore/$category" params={{ category: article.category }} className="hover:text-foreground">{categoryName}</Link></li></>}
          <li aria-hidden="true">·</li><li aria-current="page" className="max-w-full truncate text-foreground">{article.title}</li>
        </ol>
      </nav>
    </Container>
    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground"><img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-60" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" /><Container className="relative flex min-h-[62vh] flex-col justify-end pb-14 pt-36 sm:pb-16"><p className="eyebrow text-ink-foreground/80">{categoryName}</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{article.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/86">{article.dek}</p></Container></section>
    <Container className="max-w-3xl py-12 sm:py-16">
      <Byline author={author} meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`} />
      {isTexasExplainedPillar && <aside className="mt-8 border-l-2 border-primary pl-5" aria-label="Texas Explained series">
        <p className="eyebrow text-primary">Texas Explained</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Part of our 10-guide series on the systems, landscapes and people that explain how Texas works. <Link to="/texas-explained" className="border-b border-primary text-foreground transition-colors hover:text-primary">See all 10 guides →</Link></p>
      </aside>}
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
    {relatedDestinations.length > 0 && <Section><Container><SectionHeader eyebrow="Plan the trip" title="Places connected to this story" description="Destinations explicitly tied to this article in the Texas Defined guide." /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{relatedDestinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} /></li>)}</ul></Container></Section>}
    <Section tone="surface"><Container><SectionHeader eyebrow="From the magazine" title="More stories to read next" /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{related.filter((item) => item.id !== article.id).slice(0, 3).map((item) => <li key={item.id}><ArticleCard article={item} size="compact" /></li>)}</ul><nav aria-label="Continue through this section" className="mt-10 border-t border-border pt-6"><div className="flex flex-wrap gap-x-7 gap-y-3"><Link to={department.path} className="eyebrow border-b border-primary pb-1 text-primary">More from {department.name} →</Link>{department.usesExploreCategory && <Link to="/explore/$category" params={{ category: article.category }} className="eyebrow border-b border-primary pb-1 text-primary">Browse {categoryName} →</Link>}</div></nav></Container></Section>
  </article>;
}