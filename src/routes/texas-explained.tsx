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

        <div className="mt-12 space-y-16">
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
