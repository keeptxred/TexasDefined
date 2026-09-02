import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleInternalLinks } from "@/data/article-internal-links";
import { shouldNoindexTexasGatewayArticle } from "@/data/fixtures/texas-gateway-index-readiness";
import { articleQuery, articlesQuery, authorsQuery, categoriesQuery, destinationsQuery } from "@/data/queries";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { remoteEvergreenAuthoritySources } from "@/data/remote-evergreen-authority-sources";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink, schemaTypeForEntityKind } from "@/lib/seo";

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

type FaqEntry = { question: string; answer: string };
type FaqBlock = { type: string; text?: string; items?: string[] };
const FAQ_ARTICLE_SLUGS = new Set([
  MOVING_TO_TEXAS_PILLAR_SLUG,
  "history-of-the-texas-flag",
  "texas-flag-etiquette-display-guide",
]);
const FAQ_START_HEADING_BY_SLUG: Readonly<Record<string, string>> = {
  [MOVING_TO_TEXAS_PILLAR_SLUG]: "Frequently asked questions about moving to Texas",
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
    const [authors, categories, related, destinations, graph] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      loadTexasKnowledgeGraph(),
    ]);
    return { article, authors, categories, related, destinations, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, categories, destinations, graph } = loaderData;
    const primarySource = articlePrimarySource(article);
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
          "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
          name: destination.name,
          url: `${siteUrl}/destination/${destination.slug}`,
        })),
      } : {}),
    };
    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ...(isTexasExplainedCollectionArticle
        ? [{ "@type": "ListItem", position: 2, name: "Texas Explained", item: `${siteUrl}/texas-explained` }]
        : [
            { "@type": "ListItem", position: 2, name: department.name, item: `${siteUrl}${department.path}` },
            ...(department.usesExploreCategory ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${article.category}` }] : []),
          ]),
      { "@type": "ListItem", position: isTexasExplainedCollectionArticle ? 3 : department.usesExploreCategory ? 4 : 3, name: article.title, item: articleUrl },
    ];
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumbs`,
      itemListElement: breadcrumbItems,
    };
    const faqSchema = faqEntries ? {
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      mainEntity: faqEntries.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    } : null;
    const schemaGraph = [
      webPageSchema,
      imageSchema,
      ...(authorSchema ? [authorSchema] : []),
      articleSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
    ];

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
        robots: shouldNoindexTexasGatewayArticle(article) ? "noindex, follow, max-image-preview:large" : undefined,
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
  const { article, graph, categories, destinations, authors, related } = Route.useLoaderData();
  const primarySource = articlePrimarySource(article);
  const authoritySources = remoteEvergreenAuthoritySources[article.slug] ?? [];
  const hasAuthoritySourceSection = hasSourcesAndFurtherReading(article.body);
  const author = authors.find((item) => item.id === article.authorId) ?? null;
  const categoryName = categories.find((category) => category.slug === article.category)?.name
    ?? article.category.replace(/-/g, " ");
  const department = articleDepartment(article.category);
  const texasExplainedPillarPosition = texasExplainedPillarOrder.findIndex((pillarSlug) => pillarSlug === article.slug);
  const isTexasExplainedPillar = texasExplainedPillarPosition >= 0;
  const isTexasExplainedSupport = texasExplainedSupportSlugs.has(article.slug);
  const isTexasExplainedCollectionArticle = isTexasExplainedPillar || isTexasExplainedSupport;
  const texasExplainedQuickAnswer = isTexasExplainedPillar ? article.dek.trim() : null;
  const previousTexasExplainedSlug = texasExplainedPillarPosition > 0
    ? texasExplainedPillarOrder[texasExplainedPillarPosition - 1]
    : null;
  const nextTexasExplainedSlug = texasExplainedPillarPosition >= 0 && texasExplainedPillarPosition < texasExplainedPillarOrder.length - 1
    ? texasExplainedPillarOrder[texasExplainedPillarPosition + 1]
    : null;
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
    <Container className="pt-8 sm:pt-12">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="py-1 hover:text-foreground">Front page</Link></li><li aria-hidden="true">·</li>
          {isTexasExplainedCollectionArticle ? <>
            <li><Link to="/texas-explained" className="py-1 hover:text-foreground">Texas Explained</Link></li>
          </> : <>
            <li><Link to={department.path} className="py-1 hover:text-foreground">{department.name}</Link></li>
            {department.usesExploreCategory && <><li aria-hidden="true">·</li><li><Link to="/explore/$category" params={{ category: article.category }} className="py-1 hover:text-foreground">{categoryName}</Link></li></>}
          </>}
          <li aria-hidden="true">·</li><li aria-current="page" className="max-w-full truncate py-1 text-foreground">{article.title}</li>
        </ol>
      </nav>
    </Container>
    <section className="relative isolate mt-4 overflow-hidden bg-ink text-ink-foreground">
      <img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <Container className="relative flex min-h-[52vh] flex-col justify-end pb-10 pt-28 sm:min-h-[62vh] sm:pb-16 sm:pt-36">
        <p className="eyebrow text-ink-foreground/80">{isTexasExplainedCollectionArticle ? "Texas Explained" : categoryName}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1] sm:text-6xl lg:text-7xl">{article.title}</h1>
        {!isTexasExplainedPillar && <p className="mt-5 max-w-2xl text-base leading-7 text-ink-foreground/86 sm:mt-6 sm:text-lg sm:leading-8">{article.dek}</p>}
      </Container>
    </section>
    <Container className="max-w-3xl py-10 sm:py-16">
      <Byline author={author} meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`} />
      <nav aria-label="Editorial standards" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <a href="/editorial-policy" className="py-1 underline decoration-border underline-offset-4 hover:text-primary">Editorial policy</a>
        <a href="/sourcing-methodology" className="py-1 underline decoration-border underline-offset-4 hover:text-primary">How we source</a>
        <a href="/corrections-policy" className="py-1 underline decoration-border underline-offset-4 hover:text-primary">Corrections &amp; updates</a>
      </nav>
      {isTexasExplainedPillar && <aside className="mt-8 border-l-2 border-primary pl-5" aria-label="Texas Explained series">
        <p className="eyebrow text-primary">Texas Explained · Guide {texasExplainedPillarPosition + 1} of {texasExplainedPillarOrder.length}</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Part of our 10-guide series on the systems, landscapes and people that explain how Texas works. <Link to="/texas-explained" className="border-b border-primary py-1 text-foreground transition-colors hover:text-primary">See all 10 guides →</Link></p>
        <nav aria-label="Texas Explained guide navigation" className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs font-semibold uppercase tracking-[0.12em] sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <Link to="/texas-explained" className="col-span-2 text-center text-primary sm:col-span-1 sm:col-start-2 sm:row-start-1">All 10 guides</Link>
          <div className="sm:col-start-1 sm:row-start-1">{previousTexasExplainedSlug ? <Link to="/article/$slug" params={{ slug: previousTexasExplainedSlug }} className="inline-block py-2 text-foreground transition-colors hover:text-primary">← Guide {texasExplainedPillarPosition} of {texasExplainedPillarOrder.length}</Link> : null}</div>
          <div className="text-right sm:col-start-3 sm:row-start-1">{nextTexasExplainedSlug ? <Link to="/article/$slug" params={{ slug: nextTexasExplainedSlug }} className="inline-block py-2 text-foreground transition-colors hover:text-primary">Guide {texasExplainedPillarPosition + 2} of {texasExplainedPillarOrder.length} →</Link> : null}</div>
        </nav>
      </aside>}
      {isTexasExplainedSupport && <aside className="mt-8 border-l-2 border-primary pl-5" aria-label="Texas Explained supporting explainer">
        <p className="eyebrow text-primary">Texas Explained · Supporting explainer</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">This focused guide extends one of the collection's core topics. <Link to="/texas-explained" className="border-b border-primary py-1 text-foreground transition-colors hover:text-primary">Browse the full Texas Explained collection →</Link></p>
      </aside>}
      {texasExplainedQuickAnswer && <section className="mt-8 rounded-sm border border-border bg-surface p-6 sm:p-7" aria-labelledby="texas-explained-quick-answer">
        <p className="eyebrow text-primary">Quick answer</p>
        <h2 id="texas-explained-quick-answer" className="mt-3 font-display text-2xl">The short version</h2>
        <p className="mt-3 text-base leading-8 text-foreground/85">{texasExplainedQuickAnswer}</p>
        <a href="#guide-body" className="mt-4 inline-block py-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">Read the full guide ↓</a>
      </section>}
      <div id={isTexasExplainedPillar ? "guide-body" : undefined} className="mt-10 scroll-mt-28"><ArticleBody blocks={article.body} entities={graph} /></div>
      {article.hero.credit && <p className="mt-10 text-xs text-muted-foreground">Image credit: {article.hero.credit}</p>}
      {primarySource && <p className="mt-4 text-xs leading-6 text-muted-foreground">Primary source: <a href={primarySource.url} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary">{primarySource.label} ↗</a></p>}
      {!hasAuthoritySourceSection && authoritySources.length > 0 && <section className="mt-10 border-t border-border pt-6" aria-labelledby="authority-sources-heading">
        <h2 id="authority-sources-heading" className="font-display text-2xl">Sources and further reading</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">{authoritySources.map((source) => <li key={source.url}>
          <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary">{source.label} ↗</a>
          <span className="block">{source.scope}</span>
        </li>)}</ul>
      </section>}
      {internalLinks.length > 0 && <aside className="mt-14 border-y border-border py-8" aria-label="Related reading">
        <p className="eyebrow text-primary">Related reading</p>
        <ul className="mt-5 divide-y divide-border">{internalLinks.map((item) => <li key={item.href} className="py-4 first:pt-0 last:pb-0">
          <a href={item.href} className="group block py-1">
            <span className="font-display text-xl group-hover:text-primary">{item.label}</span>
            {item.description && <span className="mt-1 block text-sm leading-7 text-muted-foreground">{item.description}</span>}
          </a>
        </li>)}</ul>
      </aside>}
      {article.tags.length > 0 && <div className="mt-10 border-t border-border pt-5"><p className="eyebrow text-muted-foreground">Filed under</p><ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{article.tags.map((tag) => <li key={tag} className="text-sm text-foreground/75">{tag}</li>)}</ul></div>}
    </Container>
    {relatedDestinations.length > 0 && <Section><Container><SectionHeader eyebrow="Plan the trip" title="Places connected to this story" description="Destinations explicitly tied to this article in the Texas Defined guide." /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{relatedDestinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} /></li>)}</ul></Container></Section>}
    <Section tone="surface"><Container><SectionHeader eyebrow="From the magazine" title="More stories to read next" /><ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{related.filter((item) => item.id !== article.id).slice(0, 3).map((item) => <li key={item.id}><ArticleCard article={item} size="compact" /></li>)}</ul><nav aria-label="Continue through this section" className="mt-10 border-t border-border pt-6"><div className="flex flex-wrap gap-x-7 gap-y-3"><Link to={department.path} className="eyebrow border-b border-primary py-1 text-primary">More from {department.name} →</Link>{department.usesExploreCategory && <Link to="/explore/$category" params={{ category: article.category }} className="eyebrow border-b border-primary py-1 text-primary">Browse {categoryName} →</Link>}</div></nav></Container></Section>
  </article>;
}