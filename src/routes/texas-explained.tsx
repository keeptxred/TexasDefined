import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Container } from "@/components/layout/Container";
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

const quickAnswers = [
  { question: "What are the major rivers of Texas?", answer: "Major Texas river systems include the Rio Grande, Pecos, Brazos, Colorado, Guadalupe, Nueces, San Antonio, Trinity, Sabine, Neches, Red and Canadian. Their basins cross very different landscapes, from West Texas mountains and desert to Central Texas plains, Hill Country limestone and the wetter forests of East Texas.", to: "/article/texas-rivers-explained", label: "See the major rivers and basins" },
  { question: "Why are most Texas lakes man-made?", answer: "Texas has long river systems but relatively few large natural inland lakes. Reservoir construction became a practical way to store water, reduce flood risk, support cities and farms, and create dependable surface-water supplies.", to: "/article/texas-lakes-reservoirs-explained", label: "Read the reservoir guide" },
  { question: "What is a farm-to-market road?", answer: "FM is a Texas state-highway designation, not a generic name for any rural road. The system was built to connect farms, ranches and smaller communities with markets and larger highways, and many FM roads now run through developed suburbs and cities.", to: "/article/texas-farm-to-market-roads-explained", label: "Understand FM roads" },
  { question: "Why do so many Texas towns have courthouse squares?", answer: "County seats concentrated government, records, courts and commerce in one place. In many communities, the courthouse became the civic anchor and the surrounding square became the town's most important public and commercial space.", to: "/article/texas-courthouses-town-square", label: "Explore courthouse squares" },
  { question: "Why does Texas feel so different from one region to another?", answer: "Rainfall, soils, elevation, rivers and plant communities change dramatically across the state. Migration and settlement then layered different languages, foods, architecture, industries and traditions onto those different landscapes.", to: "/article/texas-cultural-regions-explained", label: "See the cultural regions" },
  { question: "Why do Texas homes and land decisions depend so much on location?", answer: "Clay soils, drought, heat, wind, flood exposure, water access, septic needs, utilities and local development patterns vary by region. A house or parcel that makes sense in one part of Texas can require very different due diligence somewhere else.", to: "/article/buying-land-in-texas-guide", label: "Read the land-buying guide" },
] as const;

const supportingExplainers = [
  { to: "/article/texas-regions-explained", title: "Texas regions explained", description: "Start with the physical map—forests, prairies, coast, limestone country, plains and desert—underneath many of the patterns in the core guides." },
  { to: "/article/why-texas-has-254-counties", title: "Why Texas has 254 counties", description: "See why Texas built such a dense local-government map and how county seats became organizing points for roads, records and civic life." },
  { to: "/article/texas-hill-country-what-makes-it", title: "What makes the Hill Country the Hill Country?", description: "Zoom into one region where limestone, rivers, live oak, juniper, ranch roads and settlement history visibly reinforce one another." },
  { to: "/article/best-native-plants-texas-yard", title: "Best native plants for a Texas yard", description: "Turn statewide knowledge about Texas plants, rainfall and regions into practical choices for a home landscape." },
  { to: "/article/texas-barbecue-styles-explained", title: "Texas barbecue styles explained", description: "Follow migration, ranching, community traditions and regional identity into one of the state's most recognizable cultural maps." },
] as const;

const sections = [
  { id: "land-and-water", eyebrow: "Land and water", title: "The natural systems underneath Texas", description: "Rivers, reservoirs, plants, trees and wildlife explain why different parts of Texas look, feel and function so differently.", slugs: ["texas-rivers-explained", "texas-lakes-reservoirs-explained", "texas-wildflowers-guide", "texas-trees-guide", "texas-wildlife-guide"] },
  { id: "built-texas", eyebrow: "Built Texas", title: "The systems Texans created on top of the landscape", description: "Road designations, courthouse squares, regional architecture and rural land ownership reveal how settlement, government and growth shaped everyday Texas.", slugs: ["texas-farm-to-market-roads-explained", "texas-courthouses-town-square", "texas-home-architecture-regions", "buying-land-in-texas-guide"] },
  { id: "people-and-place", eyebrow: "People and place", title: "Why Texas became several cultures inside one state", description: "Migration and settlement patterns created regional identities that still show up in language, food, architecture, towns and traditions.", slugs: ["texas-cultural-regions-explained"] },
] as const;

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
  component: TexasExplainedPage,
});

function DepthGrid({ articles, label }: { articles: Article[]; label: string }) {
  if (!articles.length) return null;
  return <div className="mt-8"><p className="eyebrow mb-5 text-muted-foreground">{label}</p><ul className="grid gap-x-8 gap-y-10 md:grid-cols-2">{articles.map((article) => <li key={article.slug} className="border-t border-border pt-5"><ArticleCard article={article} size="compact" /></li>)}</ul></div>;
}

function TexasExplainedPage() {
  const { pillars, supportArticles, depthArticles, riverProfiles, reservoirProfiles, roadSystems } = Route.useLoaderData();
  const bySlug = new Map(pillars.map((article) => [article.slug, article]));
  const pillarPosition = new Map<string, number>(pillarSlugs.map((slug, index) => [slug, index + 1]));
  return <>
    <DepartmentHero current="Texas Explained" eyebrow="The Texas Guidebook" title="The systems, landscapes and people that explain Texas" description={description} />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-y border-border py-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="max-w-3xl"><p className="eyebrow text-primary">Start with the big picture</p><h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Texas makes more sense when the pieces connect.</h2><p className="mt-4 text-base leading-8 text-muted-foreground">These are not ten unrelated stories. Rivers influenced settlement. Reservoirs changed where cities could grow. Roads connected farms and ranches to markets. Courthouse squares organized towns. Plants, wildlife, architecture and migration all followed the geography in different ways. Read together, the guides form a working explanation of the state.</p></div>
        <aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><p className="font-semibold text-foreground">10 core guides · 25 deeper explainers</p><p className="mt-2">Start with a core guide, then follow supporting explainers and focused water- and road-system profiles when you want the next layer of detail.</p></aside>
      </section>
      <nav aria-label="Texas Explained sections" className="border-b border-border py-6"><p className="eyebrow text-muted-foreground">Jump to</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a href="#quick-answers" className="border-b border-transparent py-1 transition-colors hover:border-primary hover:text-primary">Quick answers</a><a href="#land-and-water" className="border-b border-transparent py-1 transition-colors hover:border-primary hover:text-primary">Land &amp; water</a><a href="#built-texas" className="border-b border-transparent py-1 transition-colors hover:border-primary hover:text-primary">Built Texas</a><a href="#people-and-place" className="border-b border-transparent py-1 transition-colors hover:border-primary hover:text-primary">People &amp; place</a><a href="#go-deeper" className="border-b border-transparent py-1 transition-colors hover:border-primary hover:text-primary">Go deeper</a></div></nav>
      <section id="quick-answers" className="mt-12 scroll-mt-28" aria-labelledby="texas-explained-quick-answers"><header className="max-w-3xl"><p className="eyebrow text-primary">Quick answers</p><h2 id="texas-explained-quick-answers" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Six Texas questions, answered before you dive deeper</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Each answer is the short version. The linked guide explains the history, geography and practical details behind it.</p></header><dl className="mt-8 grid border-t border-border md:grid-cols-2">{quickAnswers.map((item, index) => <div key={item.question} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}><dt className="font-display text-2xl leading-tight">{item.question}</dt><dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd><Link to={item.to} className="eyebrow mt-5 inline-block border-b border-primary py-1 text-primary">{item.label} →</Link></div>)}</dl></section>
      <div className="mt-16 space-y-16">{sections.map((section) => { const sectionArticles = section.slugs.map((slug) => bySlug.get(slug)).filter((article): article is Article => Boolean(article)); if (!sectionArticles.length) return null; return <section key={section.id} id={section.id} className="scroll-mt-28"><header className="grid gap-4 border-b border-border pb-6 lg:grid-cols-[18rem_1fr] lg:items-end"><div><p className="eyebrow text-primary">{section.eyebrow}</p><h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{section.title}</h2></div><p className="max-w-3xl text-base leading-7 text-muted-foreground">{section.description}</p></header><div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">{sectionArticles.map((article, index) => <div key={article.slug}><p className="eyebrow mb-3 text-muted-foreground">Guide {pillarPosition.get(article.slug)} of {pillarSlugs.length}</p><ArticleCard article={article} size={index === 0 && sectionArticles.length > 2 ? "default" : "compact"} eager={section === sections[0] && index === 0} /></div>)}</div></section>; })}</div>
      <section id="go-deeper" className="mt-16 scroll-mt-28 border-t border-border pt-10" aria-labelledby="texas-explained-go-deeper"><header className="max-w-3xl"><p className="eyebrow text-primary">Go deeper</p><h2 id="texas-explained-go-deeper" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Twenty-five focused explainers behind the core guides</h2><p className="mt-4 text-base leading-7 text-muted-foreground">The first two layers break broad pillars into systems such as basins, aquifers, prairies, downtowns and railroads. River and reservoir profiles apply that framework to water, while the road-system layer decodes RM routes, loops, spurs, business routes, park roads and highway names.</p></header><DepthGrid articles={supportArticles} label="Supporting explainers" /><DepthGrid articles={depthArticles} label="Deeper guides" /><DepthGrid articles={riverProfiles} label="Major river profiles" /><DepthGrid articles={reservoirProfiles} label="Reservoir water systems" /><DepthGrid articles={roadSystems} label="Texas road systems" /></section>
      <section className="mt-16 border-t border-border pt-10" aria-labelledby="texas-explained-related-primers"><header className="max-w-3xl"><p className="eyebrow text-primary">Related primers</p><h2 id="texas-explained-related-primers" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Five supporting explainers and related primers</h2><p className="mt-4 text-base leading-7 text-muted-foreground">These sit outside the core 10-guide series. They connect naturally to Texas Explained, but they are not part of the 35-article core-and-depth collection.</p></header><ul className="mt-8 grid border-t border-border md:grid-cols-2">{supportingExplainers.map((item, index) => <li key={item.to} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}><Link to={item.to} className="group block h-full py-1"><h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p><span className="eyebrow mt-5 inline-block border-b border-primary py-1 text-primary">Read the primer →</span></Link></li>)}</ul></section>
      {pillars.length < pillarSlugs.length ? <p className="mt-12 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">This collection is showing {pillars.length} of {pillarSlugs.length} core guides while the remaining editorial record is refreshed.</p> : null}
      <footer className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"><Link to="/explore" className="group border border-border p-6 transition-colors hover:border-primary"><p className="eyebrow text-primary">See the places</p><p className="mt-2 font-display text-2xl group-hover:text-primary">Explore Texas →</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Turn the explanations into destinations, road trips, parks, waterways and towns to visit.</p></Link><Link to="/texas-resources" className="group border border-border p-6 transition-colors hover:border-primary"><p className="eyebrow text-primary">Use the state</p><p className="mt-2 font-display text-2xl group-hover:text-primary">Texas Resources →</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Move from background knowledge to practical guides, agencies, records and everyday Texas tools.</p></Link></footer>
    </Container>
  </>;
}
