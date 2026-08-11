import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Friday night lights, dusty rodeo arenas, big-league Sundays and the small rituals that turn a game into a Texas tradition.";
const seoTitle = "Texas Sports: Football, Rodeo, Teams & Traditions";

export const Route = createFileRoute("/sports")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/sports",
    title: seoTitle,
    collectionName: "Texas Sports",
    description,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
      { type: "TouristAttraction" as const, name: "NRG Stadium", url: "/sports-venue/nrg-stadium", description: "NRG Stadium reference guide for Houston sports, rodeo and major-event planning." },
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { title: seoTitle, description, canonicalPath: "/sports" }), links: [canonicalLink(texasDefinedBrand, "/sports")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: SportsPage,
});

function SportsPage() {
  return <>
    <CategoryPage category="sports" eyebrow="Texas Sports" title="The games, rituals and rivalries that matter here" intro={description} />
    <Container className="pb-16 sm:pb-24">
      <section className="mx-auto max-w-6xl border-t border-border pt-10">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Texas venues</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Stadiums and event grounds</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Link to="/sports-venue/$slug" params={{ slug: "nrg-stadium" }} className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">NRG Stadium, Houston</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Reference guide for the Houston stadium, major sports and event context, and official venue information.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open NRG Stadium guide →</span>
            </Link>
            <Link to="/rodeo/$slug" params={{ slug: "houston-livestock-show-and-rodeo" }} className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">Houston Livestock Show and Rodeo</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Follow the event relationship from the venue to one of the biggest recurring sports-and-culture events in Texas.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open RodeoHouston guide →</span>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  </>;
}
