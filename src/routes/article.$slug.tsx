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

const TexasWaterSearchResource = lazy(() => import("@/components/content/TexasWaterSearchResource").then((module) => ({ default: module.TexasWaterSearchResource })));
const TexasRiversAuthorityHub = lazy(() => import("@/components/content/TexasRiversAuthorityHub").then((module) => ({ default: module.TexasRiversAuthorityHub })));
const TexasRiversAfterArticle = lazy(() => import("@/components/content/TexasRiversAuthorityHub").then((module) => ({ default: module.TexasRiversAfterArticle })));
const TexasRiverBasinReference = lazy(() => import("@/components/content/TexasRiverBasinReference").then((module) => ({ default: module.TexasRiverBasinReference })));

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const DISCOVER_MIN_IMAGE_WIDTH = 1200;
const MOVING_TO_TEXAS_PILLAR_SLUG = "moving-to-texas-what-nobody-tells-you";
const texasExplainedPillarOrder = ["texas-rivers-explained","texas-lakes-reservoirs-explained","texas-farm-to-market-roads-explained","texas-courthouses-town-square","texas-wildflowers-guide","texas-trees-guide","texas-home-architecture-regions","buying-land-in-texas-guide","texas-wildlife-guide","texas-cultural-regions-explained"] as const;
const texasExplainedSupportOrder = ["texas-river-basins-guide","texas-highway-designations-explained","texas-courthouse-architecture-guide","texas-ecoregions-habitats-guide","texas-settlement-patterns-explained","texas-aquifers-springs-explained","texas-prairies-grasslands-guide","texas-main-street-downtowns-guide","texas-railroads-town-growth-explained","texas-rural-wells-water-guide","texas-brazos-river-guide","texas-colorado-river-guide","texas-guadalupe-river-guide","texas-trinity-river-guide","texas-rio-grande-river-guide","lake-buchanan-water-system-guide","lake-travis-water-system-guide","lake-whitney-water-system-guide","possum-kingdom-water-system-guide","toledo-bend-water-system-guide","texas-ranch-to-market-roads-explained","texas-loops-spurs-explained","texas-business-routes-explained","texas-park-recreational-roads-explained","texas-historic-memorial-highways-explained"] as const;
const texasExplainedPillarSlugs = new Set<string>(texasExplainedPillarOrder);
const texasExplainedSupportSlugs = new Set<string>(texasExplainedSupportOrder);
const texasExplainedCollectionSlugs = new Set<string>([...texasExplainedPillarOrder, ...texasExplainedSupportOrder]);
const schoolSupplyArticleSlugs = new Set(["texas-school-districts-explained", "texas-schools-family-life"]);

type FaqEntry = { question: string; answer: string };
type FaqBlock = { type: string; text?: string; items?: string[] };
const FAQ_ARTICLE_SLUGS = new Set([MOVING_TO_TEXAS_PILLAR_SLUG,"history-of-the-texas-flag","texas-flag-etiquette-display-guide","texas-loops-spurs-explained"]);
const FAQ_START_HEADING_BY_SLUG: Readonly<Record<string, string>> = {
  [MOVING_TO_TEXAS_PILLAR_SLUG]: "Frequently asked questions about moving to Texas",
  "texas-loops-spurs-explained": "Frequently asked questions about Texas Loops and Spurs",
};

function faqEntriesForArticle(article: { slug: string; body: FaqBlock[] }): FaqEntry[] | null {
  if (!FAQ_ARTICLE_SLUGS.has(article.slug)) return null;
  const marker = FAQ_START_HEADING_BY_SLUG[article.slug];
  const markerIndex = marker ? article.body.findIndex((block) => block.type === "heading" && block.text?.trim() === marker) : -1;
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
function articleText(article: { title: string; dek: string; body: Array<{ type: string; text?: string; items?: string[] }> }) { return [article.title, article.dek, ...article.body.flatMap((block) => block.type === "list" ? block.items ?? [] : block.text ? [block.text] : [])].join(" "); }
function articleAutoLinkGraph(article: { title: string; dek: string; body: Array<{ type: string; text?: string; items?: string[] }> }, graph: Awaited<ReturnType<typeof loadTexasKnowledgeGraph>>) {
  const text = articleText(article); if (!text.trim()) return [];
  return graph.filter((entity) => [entity.name, ...entity.aliases].some((rawLabel) => { const label = rawLabel.trim(); if (label.length < 4) return false; const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text); }));
}
function wordCount(value: string) { return value.trim().split(/\s+/).filter(Boolean).length; }
function articlePrimarySource(article: { slug: string; sourceName?: string; sourceUrl?: string }) { const fallback = remoteEvergreenAuthoritySources[article.slug]?.[0]; const url = article.sourceUrl ?? fallback?.url; if (!url) return null; return { label: article.sourceName ?? fallback?.label ?? "Source material", url }; }
function hasSourcesAndFurtherReading(body: FaqBlock[]) { return body.some((block) => block.type === "heading" && block.text?.trim().toLowerCase() === "sources and further reading"); }

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug)); if (!article) throw notFound();
    const [authors, categories, related, destinations, completeGraph] = await Promise.all([context.queryClient.ensureQueryData(authorsQuery()),context.queryClient.ensureQueryData(categoriesQuery()),context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),getDestinationsBySlugs({ data: { slugs: article.relatedDestinations.slice(0, 8) } }),loadTexasKnowledgeGraph()]);
    const graph = articleAutoLinkGraph(article, completeGraph); return { article, authors, categories, related, destinations, graph };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { article, authors, categories, destinations, graph } = loaderData; const primarySource = articlePrimarySource(article); const canonicalPath = `/article/${params.slug}`; const articleUrl = `${siteUrl}${canonicalPath}`; const imageUrl = absoluteUrl(texasDefinedBrand, article.hero.src); const imageRights = imageRightsFor(article.hero.src); const author = authors.find((item) => item.id === article.authorId); const authorUrl = author ? `${siteUrl}/authors/${author.id}` : null; const authorId = authorUrl ? `${authorUrl}#desk` : `${siteUrl}/#organization`; const fullText = articleText(article); const text = fullText.toLowerCase();
    const mentions = graph.filter((entity) => [entity.name, ...entity.aliases].some((label) => { if (label.length < 4) return false; const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text); })).slice(0, 20);
    const categoryName = categories.find((category) => category.slug === article.category)?.name ?? article.category.replace(/-/g, " "); const department = articleDepartment(article.category); const isTexasExplainedCollectionArticle = texasExplainedCollectionSlugs.has(article.slug); const faqEntries = faqEntriesForArticle(article); const relatedDestinations = article.relatedDestinations.map((slug) => destinations.find((destination) => destination.slug === slug)).filter((destination): destination is NonNullable<typeof destination> => Boolean(destination)).slice(0, 8);
    const imageSchema = { "@type": "ImageObject", "@id": `${articleUrl}#primaryimage`, url: imageUrl, contentUrl: imageUrl, caption: article.hero.alt, width: article.hero.width, height: article.hero.height, representativeOfPage: true, ...(article.hero.credit ? { creditText: article.hero.credit } : {}), ...(imageRights ?? {}) };
    const webPageSchema = { "@type": "WebPage", "@id": articleUrl, url: articleUrl, name: article.title, description: article.dek, inLanguage: texasDefinedBrand.identity.locale, isPartOf: { "@id": `${siteUrl}/#website` }, primaryImageOfPage: { "@id": `${articleUrl}#primaryimage` }, mainEntity: { "@id": `${articleUrl}#article` }, breadcrumb: { "@id": `${articleUrl}#breadcrumbs` }, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt };
    const authorSchema = author && authorUrl ? { "@type": "Organization", "@id": authorId, name: author.name, description: author.bio, url: authorUrl, parentOrganization: { "@id": `${siteUrl}/#organization` }, publishingPrinciples: `${siteUrl}/editorial-policy` } : null;
    const articleSchema = { "@type": "Article", "@id": `${articleUrl}#article`, url: articleUrl, mainEntityOfPage: { "@id": articleUrl }, headline: article.title, description: article.dek, abstract: article.dek, inLanguage: texasDefinedBrand.identity.locale, image: [{ "@id": `${articleUrl}#primaryimage` }], thumbnailUrl: imageUrl, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, articleSection: categoryName, genre: department.name, keywords: article.tags, wordCount: wordCount(fullText), isAccessibleForFree: true, author: { "@id": authorId }, publisher: { "@id": `${siteUrl}/#organization` }, publishingPrinciples: `${siteUrl}/editorial-policy`, ...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {}), ...((texasExplainedPillarSlugs.has(article.slug) || texasExplainedSupportSlugs.has(article.slug)) ? { isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-explained#collection`, name: "Texas Explained", url: `${siteUrl}/texas-explained` } } : {}), about: mentions.slice(0, 8).map((entity) => ({ "@id": `${siteUrl}${canonicalEntityPath(entity)}#entity` })), mentions: mentions.map((entity) => ({ "@type": schemaTypeForEntityKind(entity.kind), "@id": `${siteUrl}${canonicalEntityPath(entity)}#entity`, name: entity.name, url: `${siteUrl}${canonicalEntityPath(entity)}` })), ...(relatedDestinations.length ? { hasPart: relatedDestinations.map((destination) => ({ "@type": "TouristAttraction", "@id": `${siteUrl}/destination/${destination.slug}#entity`, name: destination.name, url: `${siteUrl}/destination/${destination.slug}` })) } : {}) };
    const faqSchema = faqEntries ? { "@type": "FAQPage", "@id": `${articleUrl}#faq`, mainEntity: faqEntries.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) } : null;
    const collectionPosition = isTexasExplainedCollectionArticle ? texasExplainedPillarOrder.indexOf(article.slug as (typeof texasExplainedPillarOrder)[number]) >= 0 ? texasExplainedPillarOrder.indexOf(article.slug as (typeof texasExplainedPillarOrder)[number]) + 1 : texasExplainedPillarOrder.length + texasExplainedSupportOrder.indexOf(article.slug as (typeof texasExplainedSupportOrder)[number]) + 1 : null;
    const texasExplainedCollectionSchema = isTexasExplainedCollectionArticle ? { "@type": "CollectionPage", "@id": `${siteUrl}/texas-explained#collection`, name: "Texas Explained", url: `${siteUrl}/texas-explained`, mainEntity: { "@type": "ItemList", itemListElement: [...texasExplainedPillarOrder,...texasExplainedSupportOrder].map((slug, index) => ({ "@type": "ListItem", position: index + 1, url: `${siteUrl}/article/${slug}` })) } } : null;
    const graphSchema = [{ "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: texasDefinedBrand.identity.name, publisher: { "@id": `${siteUrl}/#organization` } },{ "@type": "Organization", "@id": `${siteUrl}/#organization`, name: texasDefinedBrand.identity.name, url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.svg` } },...(authorSchema ? [authorSchema] : []),imageSchema,webPageSchema,articleSchema,...(faqSchema ? [faqSchema] : []),...(texasExplainedCollectionSchema ? [texasExplainedCollectionSchema] : []),{ "@type": "BreadcrumbList", "@id": `${articleUrl}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },{ "@type": "ListItem", position: 2, name: department.name, item: `${siteUrl}${department.path}` },...(department.usesExploreCategory ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `${siteUrl}/explore/${article.category}` }] : []),{ "@type": "ListItem", position: department.usesExploreCategory ? 4 : 3, name: article.title, item: articleUrl }] },...mentions.map((entity) => ({ "@type": schemaTypeForEntityKind(entity.kind), "@id": `${siteUrl}${canonicalEntityPath(entity)}#entity`, name: entity.name, url: `${siteUrl}${canonicalEntityPath(entity)}` }))];
    return { meta: buildMeta({ brand: texasDefinedBrand,title: article.title,description: article.dek,image: imageUrl,canonicalPath,type: "article",publishedTime: article.publishedAt,modifiedTime: article.updatedAt,section: categoryName,tags: article.tags,authorUrl,...(shouldNoindexTexasGatewayArticle(article.slug) ? { robots: "noindex,follow" } : {}) }),links: [canonicalLink(texasDefinedBrand, canonicalPath)],scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graphSchema }) }] };
  }, component: ArticlePage,
});

function ArticlePage() {
  const { article, authors, categories, related, destinations, graph } = Route.useLoaderData(); const author = authors.find((item) => item.id === article.authorId) ?? null; const category = categories.find((item) => item.slug === article.category); const department = articleDepartment(article.category); const isTexasExplainedCollectionArticle = texasExplainedCollectionSlugs.has(article.slug); const primarySource = articlePrimarySource(article); const showPrimarySource = primarySource && !hasSourcesAndFurtherReading(article.body); const relatedItems = related.filter((item) => item.slug !== article.slug).slice(0, 3); const showWaterSearch = article.slug === "texas-rivers-explained" || article.slug === "texas-lakes-reservoirs-explained"; const showRiversAuthority = article.slug === "texas-rivers-explained"; const showRiverBasinReference = article.slug === "texas-river-basins-guide"; const showCitiesComparison = article.slug === "texas-major-cities-regional-differences"; const showSchoolSupplyPartners = schoolSupplyArticleSlugs.has(article.slug); const heroIsEligible = article.hero.width >= DISCOVER_MIN_IMAGE_WIDTH && !isDestinationPhotoPlaceholder(article.hero.src); const heroPriority = heroIsEligible ? "high" : "auto"; const heroSrcSet = heroIsEligible ? `${article.hero.src} ${article.hero.width}w` : undefined; const heroSizes = heroIsEligible ? "(max-width: 768px) 100vw, 1200px" : undefined; const heroFetchPriority = heroPriority as "high" | "auto"; const heroWidth = heroIsEligible ? article.hero.width : undefined; const heroHeight = heroIsEligible ? article.hero.height : undefined; const heroDecoding = heroIsEligible ? "async" : undefined; const heroLoading = heroIsEligible ? "eager" : undefined; const heroImage = <img src={article.hero.src} alt={article.hero.alt} width={heroWidth} height={heroHeight} loading={heroLoading} decoding={heroDecoding} fetchPriority={heroFetchPriority} srcSet={heroSrcSet} sizes={heroSizes} className="h-full w-full object-cover" onError={(event) => recoverOrHideImage(event.currentTarget)} />;
  return <><Container className="pt-8 sm:pt-10"><nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" aria-label="Breadcrumb"><Link to={department.path} className="hover:text-primary">{department.name}</Link><span aria-hidden="true">/</span>{department.usesExploreCategory ? <><Link to="/explore/$category" params={{ category: article.category }} className="hover:text-primary">{category?.name ?? article.category.replace(/-/g, " ")}</Link><span aria-hidden="true">/</span></> : null}<span className="text-foreground">{article.title}</span></nav><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)] lg:items-start"><div className="min-w-0"><div className="eyebrow text-primary">{category?.name ?? article.category}</div><h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.75rem,6vw,5.7rem)] font-semibold leading-[0.94] tracking-[-0.04em]">{article.title}</h1><p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">{article.dek}</p><div className="mt-7"><Byline author={author} meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`} /></div></div><figure className="min-w-0 overflow-hidden rounded-2xl border border-border bg-muted/20"><div className="aspect-[16/10] bg-muted/20">{heroImage}</div>{(article.hero.credit || article.hero.alt) ? <figcaption className="px-4 py-3 text-sm leading-6 text-muted-foreground">{article.hero.alt}{article.hero.credit ? ` · ${article.hero.credit}` : ""}</figcaption> : null}</figure></div></Container><Container className="pb-16 pt-10 sm:pt-12"><div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start"><article className="min-w-0">{isTexasExplainedCollectionArticle ? <div className="mb-8 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6"><p className="eyebrow text-primary">Texas Explained</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Part {collectionPosition} of the Texas Explained reference collection.</p><Link to="/texas-explained" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">Browse the complete Texas Explained collection →</Link></div> : null}<ArticleBody blocks={article.body} entities={graph} />{showWaterSearch ? <Suspense fallback={null}><TexasWaterSearchResource /></Suspense> : null}{showRiversAuthority ? <Suspense fallback={null}><TexasRiversAuthorityHub /></Suspense> : null}{showRiverBasinReference ? <Suspense fallback={null}><TexasRiverBasinReference /></Suspense> : null}{showCitiesComparison ? <TexasCitiesComparison /> : null}{showSchoolSupplyPartners ? <SchoolSupplyPartners /> : null}{showPrimarySource ? <section className="mt-12 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6" aria-labelledby="article-source-heading"><h2 id="article-source-heading" className="font-display text-2xl font-semibold">Source</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This guide was checked against the following primary or authoritative reference:</p><a href={primarySource.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">{primarySource.label} ↗</a></section> : null}</article><aside className="space-y-8 lg:sticky lg:top-24">{destinations.length ? <Section><SectionHeader eyebrow="Nearby" title="Places to explore" /><div className="mt-5 space-y-5">{destinations.slice(0, 3).map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}</div></Section> : null}{relatedItems.length ? <Section><SectionHeader eyebrow="Keep reading" title="Related guides" /><div className="mt-5 space-y-5">{relatedItems.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></Section> : null}<div className="rounded-2xl border border-border bg-muted/20 p-5 text-sm leading-6 text-muted-foreground"><strong className="block text-foreground">Editorial standards</strong><span>Texas Defined publishes practical Texas guides using authoritative public sources and documented editorial review.</span><Link to="/editorial-policy" className="mt-3 inline-flex font-semibold text-primary hover:underline">Read our editorial policy →</Link></div></aside></div></Container></>;
}
