import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Container } from "@/components/layout/Container";
import { articlesQuery } from "@/data/queries";
import type { Article } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-explained";
const description = "Ten deeply reported Texas Defined guides explaining the water, roads, towns, landscapes, wildlife, homes, land and migration patterns that make Texas work the way it does.";

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

const quickAnswers = [
  {
    question: "Why are most Texas lakes man-made?",
    answer: "Texas has long river systems but relatively few large natural inland lakes. Reservoir construction became a practical way to store water, reduce flood risk, support cities and farms, and create dependable surface-water supplies.",
    to: "/article/texas-lakes-reservoirs-explained",
    label: "Read the reservoir guide",
  },
  {
    question: "What is a farm-to-market road?",
    answer: "FM is a Texas state-highway designation, not a generic name for any rural road. The system was built to connect farms, ranches and smaller communities with markets and larger highways, and many FM roads now run through developed suburbs and cities.",
    to: "/article/texas-farm-to-market-roads-explained",
    label: "Understand FM roads",
  },
  {
    question: "Why do so many Texas towns have courthouse squares?",
    answer: "County seats concentrated government, records, courts and commerce in one place. In many communities, the courthouse became the civic anchor and the surrounding square became the town's most important public and commercial space.",
    to: "/article/texas-courthouses-town-square",
    label: "Explore courthouse squares",
  },
  {
    question: "Why does Texas feel so different from one region to another?",
    answer: "Rainfall, soils, elevation, rivers and plant communities change dramatically across the state. Migration and settlement then layered different languages, foods, architecture, industries and traditions onto those different landscapes.",
    to: "/article/texas-cultural-regions-explained",
    label: "See the cultural regions",
  },
  {
    question: "Why do Texas homes and land decisions depend so much on location?",
    answer: "Clay soils, drought, heat, wind, flood exposure, water access, septic needs, utilities and local development patterns vary by region. A house or parcel that makes sense in one part of Texas can require very different due diligence somewhere else.",
    to: "/article/buying-land-in-texas-guide",
    label: "Read the land-buying guide",
  },
] as const;

const supportingExplainers = [
  {
    to: "/article/texas-regions-explained",
    title: "Texas regions explained",
    description: "Start with the physical map—forests, prairies, coast, limestone country, plains and desert—underneath many of the patterns in the core guides.",
  },
  {
    to: "/article/why-texas-has-254-counties",
    title: "Why Texas has 254 counties",
    description: "See why Texas built such a dense local-government map and how county seats became organizing points for roads, records and civic life.",
  },
  {
    to: "/article/texas-hill-country-what-makes-it",
    title: "What makes the Hill Country the Hill Country?",
    description: "Zoom into one region where limestone, rivers, live oak, juniper, ranch roads and settlement history visibly reinforce one another.",
  },
  {
    to: "/article/best-native-plants-texas-yard",
    title: "Best native plants for a Texas yard",
    description: "Turn statewide knowledge about Texas plants, rainfall and regions into practical choices for a home landscape.",
  },
  {
    to: "/article/texas-barbecue-styles-explained",
    title: "Texas barbecue styles explained",
    description: "Follow migration, ranching, community traditions and regional identity into one of the state's most recognizable cultural maps.",
  },
] as const;

const sections = [
  {
    eyebrow: "Land and water",
    title: "The natural systems underneath Texas",
    description: "Rivers, reservoirs, plants, trees and wildlife explain why different parts of Texas look, feel and function so differently.",
    slugs: [
      "texas-rivers-explained",
      "texas-lakes-reservoirs-explained",
      "texas-wildflowers-guide",
      "texas-trees-guide",
      "texas-wildlife-guide",
    ],
  },
  {
    eyebrow: "Built Texas",
    title: "The systems Texans created on top of the landscape",
    description: "Road designations, courthouse squares, regional architecture and rural land ownership reveal how settlement, government and growth shaped everyday Texas.",
    slugs: [
      "texas-farm-to-market-roads-explained",
      "texas-courthouses-town-square",
      "texas-home-architecture-regions",
      "buying-land-in-texas-guide",
    ],
  },
  {
    eyebrow: "People and place",
    title: "Why Texas became several cultures inside one state",
    description: "Migration and settlement patterns created regional identities that still show up in language, food, architecture, towns and traditions.",
    slugs: ["texas-cultural-regions-explained"],
  },
] as const;

function orderedPillars(catalog: Article[]) {
  const bySlug = new Map(catalog.map((article) => [article.slug, article]));
  return pillarSlugs.map((slug) => bySlug.get(slug)).filter((article): article is Article => Boolean(article));
}

export const Route = createFileRoute("/texas-explained")({
  head: ({ loaderData }: { loaderData?: { articles: Article[] } }) => {
    if (!loaderData?.articles.length) {
      return {
        meta: buildMeta(texasDefinedBrand, {
          canonicalPath,
          title: "Texas Explained: 10 Guides to How the State Works",
          description,
        }),
        links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      };
    }

    const hero = loaderData.articles[0]?.hero;
    return buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Explained: 10 Guides to How the State Works",
      collectionName: "Texas Explained",
      description,
      image: hero?.src,
      imageAlt: hero?.alt,
      imageWidth: hero?.width,
      imageHeight: hero?.height,
      breadcrumbParentName: "Start Here",
      breadcrumbParentPath: "/texas-resources",
      items: loaderData.articles.map((article) => ({
        type: "Article" as const,
        name: article.title,
        url: `/article/${article.slug}`,
        image: article.hero.src,
        description: article.dek,
      })),
    });
  },
  loader: async ({ context }): Promise<{ articles: Article[] }> => {
    const catalog = await context.queryClient.ensureQueryData(articlesQuery());
    return { articles: orderedPillars(catalog) };
  },
  component: TexasExplainedPage,
});

function TexasExplainedPage() {
  const { articles } = Route.useLoaderData();
  const bySlug = new Map(articles.map((article) => [article.slug, article]));

  return (
    <>
      <DepartmentHero
        current="Texas Explained"
        eyebrow="The Texas Guidebook"
        title="The systems, landscapes and people that explain Texas"
        description={description}
      />

      <Container className="py-12 sm:py-16">
        <section className="grid gap-8 border-y border-border py-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Start with the big picture</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Texas makes more sense when the pieces connect.</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              These are not ten unrelated stories. Rivers influenced settlement. Reservoirs changed where cities could grow. Roads connected farms and ranches to markets. Courthouse squares organized towns. Plants, wildlife, architecture and migration all followed the geography in different ways. Read together, the guides form a working explanation of the state.
            </p>
          </div>
          <aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
            <p className="font-semibold text-foreground">10 evergreen guides</p>
            <p className="mt-2">Built for readers who want the “why” behind familiar Texas places, systems and patterns—not just a list of facts.</p>
          </aside>
        </section>

        <section className="mt-12" aria-labelledby="texas-explained-quick-answers">
          <header className="max-w-3xl">
            <p className="eyebrow text-primary">Quick answers</p>
            <h2 id="texas-explained-quick-answers" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Five Texas questions, answered before you dive deeper</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">Each answer is the short version. The linked guide explains the history, geography and practical details behind it.</p>
          </header>
          <dl className="mt-8 grid border-t border-border md:grid-cols-2">
            {quickAnswers.map((item, index) => (
              <div key={item.question} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}>
                <dt className="font-display text-2xl leading-tight">{item.question}</dt>
                <dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
                <Link to={item.to} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{item.label} →</Link>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-16 space-y-16">
          {sections.map((section) => {
            const sectionArticles = section.slugs.map((slug) => bySlug.get(slug)).filter((article): article is Article => Boolean(article));
            if (!sectionArticles.length) return null;

            return (
              <section key={section.title}>
                <header className="grid gap-4 border-b border-border pb-6 lg:grid-cols-[18rem_1fr] lg:items-end">
                  <div>
                    <p className="eyebrow text-primary">{section.eyebrow}</p>
                    <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{section.title}</h2>
                  </div>
                  <p className="max-w-3xl text-base leading-7 text-muted-foreground">{section.description}</p>
                </header>

                <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
                  {sectionArticles.map((article, index) => (
                    <ArticleCard key={article.slug} article={article} size={index === 0 && sectionArticles.length > 2 ? "default" : "compact"} eager={section === sections[0] && index === 0} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="texas-explained-go-deeper">
          <header className="max-w-3xl">
            <p className="eyebrow text-primary">Go deeper</p>
            <h2 id="texas-explained-go-deeper" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Five supporting explainers</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">These sit outside the core 10-guide series, but each extends one of its central ideas into a more specific Texas landscape, system or tradition.</p>
          </header>
          <ul className="mt-8 grid border-t border-border md:grid-cols-2">
            {supportingExplainers.map((item, index) => (
              <li key={item.to} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}>
                <Link to={item.to} className="group block h-full">
                  <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Read the explainer →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {articles.length < pillarSlugs.length ? (
          <p className="mt-12 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
            This collection is showing {articles.length} of {pillarSlugs.length} guides while the remaining editorial record is refreshed.
          </p>
        ) : null}

        <footer className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <Link to="/explore" className="group border border-border p-6 transition-colors hover:border-primary">
            <p className="eyebrow text-primary">See the places</p>
            <p className="mt-2 font-display text-2xl group-hover:text-primary">Explore Texas →</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Turn the explanations into destinations, road trips, parks, waterways and towns to visit.</p>
          </Link>
          <Link to="/texas-resources" className="group border border-border p-6 transition-colors hover:border-primary">
            <p className="eyebrow text-primary">Use the state</p>
            <p className="mt-2 font-display text-2xl group-hover:text-primary">Texas Resources →</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Move from background knowledge to practical guides, agencies, records and everyday Texas tools.</p>
          </Link>
        </footer>
      </Container>
    </>
  );
}
