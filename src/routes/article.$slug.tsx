import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { SchoolSupplyPartners } from "@/components/monetization/SchoolSupplyPartners";
import { articleInternalLinks } from "@/data/article-internal-links";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";
import { shouldNoindexTexasGatewayArticle } from "@/data/fixtures/texas-gateway-index-readiness";
import { imageRightsFor } from "@/data/image-rights";
import { articleQuery, articlesQuery, authorsQuery, categoriesQuery } from "@/data/queries";
import { getDestinationsBySlugs } from "@/data/destination-collections.functions";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { localArticleAuthoritySources } from "@/data/local-article-authority-sources";
import { remoteEvergreenAuthoritySources } from "@/data/remote-evergreen-authority-sources";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { absoluteUrl, buildMeta, canonicalLink, schemaTypeForEntityKind } from "@/lib/seo";
import { unusualBusinessAnalyticsAttributes } from "@/lib/unusual-business-analytics";
import { TexasCitiesComparison } from "@/components/content/TexasCitiesComparison";

const TexasWaterSearchResource = lazy(() =>
  import("@/components/content/TexasWaterSearchResource").then((module) => ({ default: module.TexasWaterSearchResource })),
);

const TexasRiversAuthorityHub = lazy(() =>
  import("@/components/content/TexasRiversAuthorityHub").then((module) => ({ default: module.TexasRiversAuthorityHub })),
);
const TexasRiversAfterArticle = lazy(() =>
  import("@/components/content/TexasRiversAuthorityHub").then((module) => ({ default: module.TexasRiversAfterArticle })),
);
const TexasRiverBasinReference = lazy(() =>
  import("@/components/content/TexasRiverBasinReference").then((module) => ({ default: module.TexasRiverBasinReference })),
);

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const DISCOVER_MIN_IMAGE_WIDTH = 1200;
const MOVING_TO_TEXAS_PILLAR_SLUG = "moving-to-texas-what-nobody-tells-you";
const texasExplainedPillarOrder = [
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
] as const;
const texasExplainedSupportOrder = [
  "texas-river-basins-guide",
  "texas-highway-designations-explained",
  "texas-courthouse-architecture-guide",
  "texas-ecoregions-habitats-guide",
  "texas-settlement-patterns-explained",
  "texas-aquifers-springs-explained",
  "texas-prairies-grasslands-guide",
  "texas-main-street-downtowns-guide",
  "texas-railroads-town-growth-explained",
  "texas-rural-wells-water-guide",
  "texas-brazos-river-guide",
  "texas-colorado-river-guide",
  "texas-guadalupe-river-guide",
  "texas-trinity-river-guide",
  "texas-rio-grande-river-guide",
  "lake-buchanan-water-system-guide",
  "lake-travis-water-system-guide",
  "lake-whitney-water-system-guide",
  "possum-kingdom-water-system-guide",
  "toledo-bend-water-system-guide",
  "texas-ranch-to-market-roads-explained",
  "texas-loops-spurs-explained",
  "texas-business-routes-explained",
  "texas-park-recreational-roads-explained",
  "texas-historic-memorial-highways-explained",
] as const;
const texasExplainedPillarSlugs = new Set<string>(texasExplainedPillarOrder);
const texasExplainedSupportSlugs = new Set<string>(texasExplainedSupportOrder);
const texasExplainedCollectionSlugs = new Set<string>([...texasExplainedPillarOrder, ...texasExplainedSupportOrder]);
const schoolSupplyArticleSlugs = new Set(["texas-school-districts-explained", "texas-schools-family-life"]);

type FaqEntry = { question: string; answer: string };
type FaqBlock = { type: string; text?: string; items?: string[] };
const FAQ_ARTICLE_SLUGS = new Set([
  MOVING_TO_TEXAS_PILLAR_SLUG,
  "history-of-the-texas-flag",
  "texas-flag-etiquette-display-guide",
  "texas-loops-spurs-explained",
]);
const FAQ_START_HEADING_BY_SLUG: Readonly<Record<string, string>> = {
  [MOVING_TO_TEXAS_PILLAR_SLUG]: "Frequently asked questions about moving to Texas",
  "texas-loops-spurs-explained": "Frequently asked questions about Texas Loops and Spurs",
};

function faqEntriesForArticle(article: { slug: string; body: FaqBlock[] }): FaqEntry[] | null {
  if (!FAQ_ARTICLE_SLUGS.has(article.slug)) return null;
  const marker = FAQ_START_HEADING_BY_SLUG[article.slug];
  const markerIndex = marker
    ? article.body.findIndex((block) => block.type === "heading" && block.text?.trim() === marker)
    : -1;
  const entries: FaqEntry[] = [];

  for (let index = Math.max(0, markerIndex + 1); index < article.body.length; index += 1) {
    const block = article.body[index];
    const question = block.type === "heading" ? block.text?.trim() : "";
    if (!question?.endsWith("?")) continue;

    const answerParts: string[] = [];
    for (let next = index + 1; next < article.body.length; next += 1) {
      const candidate = article.body[next];
      if (candidate.type === "heading") break;
      if (candidate.type === "paragraph" && candidate.text?.trim()) answerParts.push(candidate.text.trim());
      if (candidate.type === "quote" && candidate.text?.trim()) answerParts.push(candidate.text.trim());
      if (candidate.type === "list" && candidate.items?.length) answerParts.push(candidate.items.join(" "));
      if (answerParts.length >= 2) break;
    }
    const answer = answerParts.join(" ").trim();
    if (answer) entries.push({ question, answer });
  }

  return entries.length ? entries.slice(0, 10) : null;
}

type ArticleDepartment = { name: string; path: string; usesExploreCategory: boolean };

function articleDepartment(category: string): ArticleDepartment {
  const livingHere = new Set(["moving-to-texas", "home-garden", "real-estate"]);
  if (livingHere.has(category)) return { name: "Texas Life", path: "/texas-living", usesExploreCategory: false };
  if (category === "sports") return { name: "Sports", path: "/sports", usesExploreCategory: false };
  if (category === "texas-history" || category === "history") return { name: "History", path: "/texas-history", usesExploreCategory: false };
  return { name: "Explore", path: "/explore", usesExploreCategory: true };
}

function articleText(article: { title: string; dek: string; body: Array<{ type: string; text?: string; items?: string[] }> }) {
  return [article.title, article.dek, ...article.body.flatMap((block) => block.type === "list" ? block.items ?? [] : block.text ? [block.text] : [])].join(" ");
}
function articleAutoLinkGraph(
  article: { title: string; dek: string; body: Array<{ type: string; text?: string; items?: string[] }> },
  graph: Awaited<ReturnType<typeof loadTexasKnowledgeGraph>>,
) {
  const text = articleText(article);
  if (!text.trim()) return [];

  return graph.filter((entity) =>
    [entity.name, ...entity.aliases].some((rawLabel) => {
      const label = rawLabel.trim();
      if (label.length < 4) return false;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text);
    }),
  );
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function articlePrimarySource(article: { slug: string; sourceName?: string; sourceUrl?: string }) {
  const fallback = remoteEvergreenAuthoritySources[article.slug]?.[0];
  const url = article.sourceUrl ?? fallback?.url;
  if (!url) return null;
  return {
    label: article.sourceName ?? fallback?.label ?? "Source material",
    url,
  };
}

function hasSourcesAndFurtherReading(body: FaqBlock[]) {
  return body.some(
    (block) => block.type === "heading" && block.text?.trim().toLowerCase() === "sources and further reading",
  );
}

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    const [authors, categories, related, destinations, completeGraph] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
      getDestinationsBySlugs({ data: { slugs: article.relatedDestinations.slice(0, 8) } }),
      loadTexasKnowledgeGraph(),
    ]);
    const graph = articleAutoLinkGraph(article, completeGraph);
    return { article, authors, categories, related, destinations, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, categories, destinations, graph } = loaderData;
    const primarySource = articlePrimarySource(article);
    const canonicalPath = `/article/${params.slug}`;
    const articleUrl = `${siteUrl}${canonicalPath}`;
    const imageUrl = absoluteUrl(texasDefinedBrand, article.hero.src);
    const imageRights = imageRightsFor(article.hero.src);
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
    const isTexasExplainedCollectionArticle = texasExplainedCollectionSlugs.has(article.slug);
    const faqEntries = faqEntriesForArticle(article);
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
      ...(imageRights ?? {}),
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
      dateModified: article.updatedAt ?? article.publishedAt,
    };
    const authorSchema = author && authorUrl ? {
      "@type": "Organization",
      "@id": authorId,
      name: author.name,
      description: author.bio,
      url: authorUrl,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      publishingPrinciples: `${siteUrl}/editorial-policy`,
    } : null;
    const articleSchema = {
      "@type": "Article",
      "@id": `${articleUrl}#article`,
      url: articleUrl,
      mainEntityOfPage: { "@id": articleUrl },
      headline: article.title,
      description: article.dek,
      abstract: article.dek,
      inLanguage: texasDefinedBrand.identity.locale,
      image: [{ "@id": `${articleUrl}#primaryimage` }],
      thumbnailUrl: imageUrl,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      articleSection: categoryName,
      genre: department.name,
      keywords: article.tags,
      wordCount: wordCount(fullText),
      isAccessibleForFree: true,
      author: { "@id": authorId },
      publisher: { "@id": `${siteUrl}/#organization` },
      publishingPrinciples: `${siteUrl}/editorial-policy`,
      ...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {}),
      ...((texasExplainedPillarSlugs.has(article.slug) || texasExplainedSupportSlugs.has(article.slug)) ? {
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
          "@id": `${siteUrl}/destination/${destination.slug}#place`,
          name: destination.name,
          url: `${siteUrl}/destination/${destination.slug}`,
        })),
      } : {}),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: department.name, item: `${siteUrl}${department.path}` },
        ...(department.usesExploreCategory
          ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${article.category}` }]
          : []),
        ...(isTexasExplainedCollectionArticle
          ? [{ "@type": "ListItem", position: department.usesExploreCategory ? 4 : 3, name: "Texas Explained", item: `${siteUrl}/texas-explained` }]
          : []),
        {
          "@type": "ListItem",
          position: (department.usesExploreCategory ? 3 : 2) + (isTexasExplainedCollectionArticle ? 1 : 0) + 1,
          name: article.title,
          item: articleUrl,
        },
      ],
    };
    const faqSchema = faqEntries ? {
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      mainEntity: faqEntries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    } : null;
    const collectionSchema = isTexasExplainedCollectionArticle ? {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/texas-explained#collection`,
      name: "Texas Explained",
      url: `${siteUrl}/texas-explained`,
      hasPart: { "@id": `${articleUrl}#article` },
    } : null;
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [webPageSchema, imageSchema, articleSchema, breadcrumbSchema, ...(authorSchema ? [authorSchema] : []), ...(faqSchema ? [faqSchema] : []), ...(collectionSchema ? [collectionSchema] : [])],
    };
    const shouldNoindex = shouldNoindexTexasGatewayArticle(article.slug);
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { title: article.title, description: article.dek, image: article.hero.src, imageAlt: article.hero.alt, type: "article" }),
        { name: "article:published_time", content: article.publishedAt },
        { name: "article:modified_time", content: article.updatedAt ?? article.publishedAt },
        { name: "article:section", content: categoryName },
        { name: "article:author", content: author?.name ?? "Texas Defined Editorial Desk" },
        { name: "article:publisher", content: texasDefinedBrand.identity.name },
        { name: "author", content: author?.name ?? "Texas Defined Editorial Desk" },
        { name: "robots", content: shouldNoindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { "script:ld+json": structuredData },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, authors, categories, related, destinations, graph } = Route.useLoaderData();
  const author = authors.find((a) => a.id === article.authorId);
  const category = categories.find((c) => c.slug === article.category);
  const imageRights = imageRightsFor(article.hero.src);
  const internalLinks = articleInternalLinks[article.slug] ?? article.internalLinks ?? [];
  const primarySource = articlePrimarySource(article);
  const authoritySources = localArticleAuthoritySources[article.slug] ?? remoteEvergreenAuthoritySources[article.slug] ?? [];
  const isTexasExplainedCollectionArticle = texasExplainedCollectionSlugs.has(article.slug);
  const isTexasRiversExplainer = article.slug === "texas-rivers-explained";
  const isTexasCitiesRegionalDifferences = article.slug === "texas-major-cities-regional-differences";
  const isTexasRiverBasinReference = article.slug === "texas-river-basins-guide";
  const isMovingToTexasPillar = article.slug === MOVING_TO_TEXAS_PILLAR_SLUG;
  const articleLinks = isTexasExplainedCollectionArticle
    ? internalLinks.filter((link) => link.href !== "/texas-explained")
    : internalLinks;
  const department = articleDepartment(article.category);
  const categoryName = category?.name ?? article.category.replace(/-/g, " ");
  const hasInlineSources = hasSourcesAndFurtherReading(article.body);
  const texasExplainedArticles = isTexasExplainedCollectionArticle
    ? articlesQuery
    : null;
  const texasExplainedOrder = isTexasExplainedCollectionArticle
    ? [...texasExplainedPillarOrder, ...texasExplainedSupportOrder].filter((slug) => slug !== article.slug)
    : [];
  const texasExplainedMap = isTexasExplainedCollectionArticle
    ? new Map(related.map((item) => [item.slug, item]))
    : new Map();
  const relatedArticles = isTexasExplainedCollectionArticle
    ? texasExplainedOrder.map((slug) => texasExplainedMap.get(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item)).slice(0, 4)
    : related.filter((item) => item.slug !== article.slug).slice(0, 3);
  const autoLinkEntities = graph.slice(0, 8);
  const unusualBusinessAttrs = unusualBusinessAnalyticsAttributes({
    articleSlug: article.slug,
    articleTags: article.tags,
    categorySlug: article.category,
    section: "article_page",
  });

  return (
    <main>
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span aria-hidden="true">/</span>
            <Link to={department.path} className="hover:text-foreground">{department.name}</Link><span aria-hidden="true">/</span>
            {department.usesExploreCategory ? <><Link to="/explore/$category" params={{ category: article.category }} className="hover:text-foreground">{categoryName}</Link><span aria-hidden="true">/</span></> : null}
            {isTexasExplainedCollectionArticle ? <><Link to="/texas-explained" className="hover:text-foreground">Texas Explained</Link><span aria-hidden="true">/</span></> : null}
            <span className="normal-case tracking-normal text-foreground/80" aria-current="page">{article.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span>{categoryName}</span><span aria-hidden="true">·</span><span>{formatReadingTime(article.readingMinutes)}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">{article.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{article.dek}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {author ? <Byline author={author} /> : <span>Texas Defined Editorial Desk</span>}
            <span aria-hidden="true">·</span><time dateTime={article.updatedAt ?? article.publishedAt}>Updated {formatDate(article.updatedAt ?? article.publishedAt)}</time>
          </div>
        </div>
      </Container>

      <Container>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-muted/30">
          <img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" onError={recoverOrHideImage} />
        </div>
      </Container>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="min-w-0">
            <ArticleBody blocks={article.body} />
            {isTexasRiversExplainer ? <Suspense fallback={null}><TexasRiversAfterArticle /></Suspense> : null}
          </article>
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {primarySource ? <div className="rounded-xl border border-border bg-muted/20 p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Primary source</p><a href={primarySource.url} className="mt-2 block text-sm font-semibold text-primary hover:underline" target="_blank" rel="noopener noreferrer">{primarySource.label}</a></div> : null}
            {articleLinks.length ? <div><h2 className="font-serif text-xl font-semibold">Keep exploring</h2><div className="mt-4 space-y-3">{articleLinks.slice(0, 6).map((link) => <Link key={link.href} to={link.href} className="block rounded-lg border border-border p-3 text-sm font-semibold hover:border-primary/50">{link.label}</Link>)}</div></div> : null}
          </aside>
        </div>
      </Container>

      {isTexasCitiesRegionalDifferences ? <TexasCitiesComparison /> : null}
      {isTexasRiversExplainer ? <Suspense fallback={null}><TexasRiversAuthorityHub /></Suspense> : null}
      {isTexasRiverBasinReference ? <Suspense fallback={null}><TexasRiverBasinReference /></Suspense> : null}
      {article.slug === "texas-water-data-guide" ? <Suspense fallback={null}><TexasWaterSearchResource /></Suspense> : null}
      {schoolSupplyArticleSlugs.has(article.slug) ? <SchoolSupplyPartners /> : null}

      {authoritySources.length && !hasInlineSources ? <Section><SectionHeader eyebrow="Sources" title="Sources and further reading" /><div className="grid gap-3 sm:grid-cols-2">{authoritySources.slice(0, 8).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border p-4 text-sm hover:border-primary/50"><span className="font-semibold">{source.label}</span></a>)}</div></Section> : null}

      {relatedArticles.length ? <Section><SectionHeader eyebrow="Keep exploring" title="Related Texas stories" /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{relatedArticles.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></Section> : null}
      {destinations.length ? <Section><SectionHeader eyebrow="Go deeper" title="Places connected to this story" /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{destinations.slice(0, 4).map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}</div></Section> : null}
    </main>
  );
}
