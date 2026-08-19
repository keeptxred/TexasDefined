import { createFileRoute, Link } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { historicSiteClusters } from "@/data/historic-site-clusters";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Missions and cattle trails, oil booms and courthouse squares — the people, places and turning points that still shape how Texas looks and feels today.";
const imageAlt = "The granite dome of Enchanted Rock under a wide sky";

function mergeDestinations(...groups: Destination[][]) {
  return [...new Map(groups.flat().map((destination) => [destination.slug, destination])).values()];
}

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
      { type: "WebPage" as const, name: "Texas Historic Sites & Museums", url: "/explore/historic-sites", description: "A statewide guide to historic sites, battlefields, missions, museums, homes, forts and monuments." },
      { type: "WebPage" as const, name: "Painted Churches of Texas", url: "/explore/painted-churches", description: "A source-checked statewide collection connecting church history, immigrant communities, architecture, decorative arts and preservation." },
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/texas-history", title: "Texas History", description }), links: [canonicalLink(texasDefinedBrand, "/texas-history")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, historyDestinations, historicSites] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "texas-history" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "historic-sites" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations: mergeDestinations(historyDestinations, historicSites) };
  },
  component: TexasHistoryPage,
});

function TexasHistoryPage() {
  const { destinations } = Route.useLoaderData();
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));

  return <>
    <CategoryPage category="texas-history" eyebrow="Texas History" title="The stories that still shape this place" intro={description} image={{ src: enchantedRock, alt: imageAlt, width: 1600, height: 1067 }} />

    <Container className="pb-10 sm:pb-14">
      <section className="grid gap-6 border-y border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="eyebrow text-primary">Go to the places themselves</p>
          <h2 className="mt-2 font-display text-4xl">Historic Sites & Museums across Texas</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore battlefields, missions, forts, presidential homes, plantations, museums and historic landscapes, with trip-planning context and official visitor sources.</p>
        </div>
        <Link to="/explore/$category" params={{ category: "historic-sites" }} className="eyebrow inline-block border-b border-primary pb-1 text-primary">
          Browse all historic sites →
        </Link>
      </section>
    </Container>

    <Container className="pb-14 sm:pb-18">
      <div className="grid gap-8 lg:grid-cols-2">
        {historicSiteClusters.map((cluster) => {
          const sites = cluster.slugs.map((slug) => bySlug.get(slug)).filter((site): site is Destination => Boolean(site));
          if (!sites.length) return null;
          return (
            <section key={cluster.id} className="border-t-2 border-foreground pt-6" aria-labelledby={`history-cluster-${cluster.id}`}>
              <p className="eyebrow text-primary">{cluster.eyebrow}</p>
              <h2 id={`history-cluster-${cluster.id}`} className="mt-2 font-display text-3xl">{cluster.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{cluster.description}</p>
              <div className="mt-5 grid gap-3">
                {sites.map((site) => (
                  <Link key={site.slug} to="/destination/$slug" params={{ slug: site.slug }} className="group border-b border-border pb-3">
                    <span className="font-semibold group-hover:text-primary">{site.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{site.nearestTown}{site.county ? ` · ${site.county}` : ""}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>

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
