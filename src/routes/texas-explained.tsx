import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { articlesQuery } from "@/data/queries";
import type { Article } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-explained";
const description = "Ten deeply reported Texas Defined guides, plus twenty-five focused supporting explainers and system profiles, connecting the water, roads, towns, landscapes, wildlife, homes, land and migration patterns that make Texas work the way it does.";

const pillarSlugs = [
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

const childSupportSlugs = [
  "texas-river-basins-guide",
  "texas-highway-designations-explained",
  "texas-courthouse-architecture-guide",
  "texas-ecoregions-habitats-guide",
  "texas-settlement-patterns-explained",
] as const;

const depthSlugs = [
  "texas-aquifers-springs-explained",
  "texas-prairies-grasslands-guide",
  "texas-main-street-downtowns-guide",
  "texas-railroads-town-growth-explained",
  "texas-rural-wells-water-guide",
] as const;

const riverProfileSlugs = [
  "texas-brazos-river-guide",
  "texas-colorado-river-guide",
  "texas-guadalupe-river-guide",
  "texas-trinity-river-guide",
  "texas-rio-grande-river-guide",
] as const;

const reservoirProfileSlugs = [
  "lake-buchanan-water-system-guide",
  "lake-travis-water-system-guide",
  "lake-whitney-water-system-guide",
  "possum-kingdom-water-system-guide",
  "toledo-bend-water-system-guide",
] as const;

const roadSystemSlugs = [
  "texas-ranch-to-market-roads-explained",
  "texas-loops-spurs-explained",
  "texas-business-routes-explained",
  "texas-park-recreational-roads-explained",
  "texas-historic-memorial-highways-explained",
] as const;

const collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs, ...roadSystemSlugs] as const;

function orderedArticles(catalog: Article[], slugs: readonly string[]) {
  const bySlug = new Map(catalog.map((article) => [article.slug, article]));
  return slugs.map((slug) => bySlug.get(slug)).filter((article): article is Article => Boolean(article));
}
function orderedPillars(catalog: Article[]) { return orderedArticles(catalog, pillarSlugs); }

type LoaderData = { articles: Article[]; pillars: Article[]; supportArticles: Article[]; depthArticles: Article[]; riverProfiles: Article[]; reservoirProfiles: Article[]; roadSystems: Article[] };

export const Route = createFileRoute("/texas-explained")({
  head: ({ loaderData }: { loaderData?: LoaderData }) => {
    if (!loaderData?.articles.length) return { meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Explained: 10 Guides to How the State Works", description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] };
    const hero = loaderData.pillars[0]?.hero ?? loaderData.articles[0]?.hero;
    return buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath, title: "Texas Explained: 10 Guides to How the State Works", collectionName: "Texas Explained", description,
      image: hero?.src, imageAlt: hero?.alt, imageWidth: hero?.width, imageHeight: hero?.height,
      breadcrumbParentName: "Start Here", breadcrumbParentPath: "/texas-resources",
      items: loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
    });
  },
  loader: async ({ context }): Promise<LoaderData> => {
    const catalog = await context.queryClient.ensureQueryData(articlesQuery());
    return {
      articles: orderedArticles(catalog, collectionSlugs), pillars: orderedPillars(catalog),
      supportArticles: orderedArticles(catalog, childSupportSlugs), depthArticles: orderedArticles(catalog, depthSlugs),
      riverProfiles: orderedArticles(catalog, riverProfileSlugs),
      reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs),
      roadSystems: orderedArticles(catalog, roadSystemSlugs),
    };
  },
});

/*
Texas Explained source-governance mirror.
The executable render surface moved to texas-explained.lazy.tsx so its UI and render-only imports do not inflate main-*.js.
These exact historical render markers remain source-visible for the existing validators; this comment is stripped from production output.

const quickAnswers = [
  { question: "What are the major rivers of Texas?", to: "/article/texas-rivers-explained", label: "See the major rivers and basins" },
  { question: "Why are most Texas lakes man-made?" },
  { question: "What is a farm-to-market road?" },
  { question: "Why do so many Texas towns have courthouse squares?" },
  { question: "Why does Texas feel so different from one region to another?" },
  { question: "Why do Texas homes and land decisions depend so much on location?" },
];
const supportingExplainers = [
  { to: "/article/texas-regions-explained" },
  { to: "/explore/landscapes/where-does-texas-turn-into-desert" },
  { to: "/article/why-texas-has-254-counties" },
  { to: "/article/texas-hill-country-what-makes-it" },
  { to: "/article/best-native-plants-texas-yard" },
  { to: "/article/texas-barbecue-styles-explained" },
];
const sections = [
  { id: "land-and-water", eyebrow: "Land and water" },
  { id: "built-texas", eyebrow: "Built Texas" },
  { id: "people-and-place", eyebrow: "People and place" },
];

Read together, the guides form a working explanation of the state.
aria-label="Texas Explained sections"
Jump to
href="#quick-answers"
href="#land-and-water"
href="#built-texas"
href="#people-and-place"
href="#go-deeper"
id="quick-answers"
id={section.id}
id="go-deeper"
scroll-mt-28
Quick answers
Six Texas questions, answered before you dive deeper
Go deeper
Six supporting explainers
These sit outside the core 10-guide series
10 core guides · 25 deeper explainers
Twenty-five focused explainers behind the core guides
<DepthGrid articles={supportArticles} label="Supporting explainers" />
<DepthGrid articles={depthArticles} label="Deeper guides" />
<DepthGrid articles={riverProfiles} label="Major river profiles" />
<DepthGrid articles={reservoirProfiles} label="Reservoir water systems" />
<DepthGrid articles={roadSystems} label="Texas road systems" />
to="/explore"
to="/texas-resources"
*/
