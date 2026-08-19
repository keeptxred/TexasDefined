import { createFileRoute, Link } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";
const imageAlt = "The granite dome of Enchanted Rock under a wide sky";

export const Route = createFileRoute("/texas-history")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/texas-history",
    title: "Texas History",
    collectionName: "Texas History",
    description,
    image: enchantedRock,
    imageAlt,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      { type: "WebPage" as const, name: "Painted Churches of Texas", url: "/explore/painted-churches", description: "A source-checked statewide collection connecting church history, immigrant communities, architecture, decorative arts and preservation." },
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/texas-history", title: "Texas History", description }), links: [canonicalLink(texasDefinedBrand, "/texas-history")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: TexasHistoryPage,
});

function TexasHistoryPage() {
  return <>
    <CategoryPage category="texas-history" eyebrow="Texas History" title="The stories that still shape this place" intro={description} image={{ src: enchantedRock, alt: imageAlt, width: 1600, height: 1067 }} />
    <Container className="pb-16">
      <section className="border-y border-border bg-surface p-6 sm:p-8" aria-labelledby="painted-churches-history">
        <p className="eyebrow text-primary">Immigration · architecture · decorative arts</p>
        <h2 id="painted-churches-history" className="mt-3 font-display text-4xl">The Painted Churches are a Texas history network, not just a road trip.</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Follow Czech and Moravian, German, Wendish, Polish and Mexican American histories through 24 verified churches, then trace the architects, painters, symbols, decorative techniques, restorations and archival evidence that connect them.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/explore/painted-churches" className="border-b border-primary text-primary">Painted Churches collection</Link>
          <Link to="/explore/painted-churches/heritage" className="border-b border-primary text-primary">Cultural heritage</Link>
          <Link to="/explore/painted-churches/timeline" className="border-b border-primary text-primary">Statewide timeline</Link>
          <Link to="/explore/painted-churches/people" className="border-b border-primary text-primary">Artists & architects</Link>
          <Link to="/explore/painted-churches/harwood-archive" className="border-b border-primary text-primary">Harwood archive guide</Link>
        </div>
      </section>
    </Container>
  </>;
}
