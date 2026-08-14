import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery } from "@/data/queries";
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
      { type: "TouristAttraction" as const, name: "Reliant Stadium", url: "/sports-venue/reliant-stadium", description: "Houston stadium guide for Texans football, RODEOHOUSTON and major-event travel planning." },
      { type: "TouristAttraction" as const, name: "Circuit of The Americas", url: "/sports-venue/circuit-of-the-americas", description: "Austin motorsports destination guide for major race weekends and visitor planning." },
      { type: "TouristAttraction" as const, name: "AT&T Stadium", url: "/sports-venue/att-stadium", description: "Arlington stadium guide for Dallas Cowboys games and major national events." },
      { type: "TouristAttraction" as const, name: "Galaxy Stadium", url: "/sports-venue/jones-att-stadium", description: "Lubbock guide for Texas Tech football at the venue historically known as Jones AT&T Stadium." },
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { title: seoTitle, description, canonicalPath: "/sports" }), links: [canonicalLink(texasDefinedBrand, "/sports")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "sports" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "sports" })),
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
            <h2 className="mt-2 font-display text-3xl leading-tight">Stadiums, arenas and racetracks</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Browse the statewide venue guide for professional sports, college traditions, motorsports, horse racing, rodeo and regional ballparks.</p>
            <Link to="/sports-venues" className="mt-5 inline-block text-sm font-semibold text-primary">Browse all Texas sports venues →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Link to="/sports-venue/$slug" params={{ slug: "reliant-stadium" }} className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">Reliant Stadium, Houston</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Texans football, RODEOHOUSTON and one of the state's largest major-event venues.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open Reliant Stadium guide →</span>
            </Link>
            <Link to="/sports-venue/$slug" params={{ slug: "circuit-of-the-americas" }} className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">Circuit of The Americas, Austin</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Texas's flagship international motorsports destination and a major race-weekend tourism draw.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open COTA guide →</span>
            </Link>
            <Link to="/sports-venue/$slug" params={{ slug: "att-stadium" }} className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">AT&T Stadium, Arlington</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Dallas Cowboys football, stadium tours and major national and international events.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open AT&T Stadium guide →</span>
            </Link>
            <a href="/sports-venue/jones-att-stadium" className="group border-t border-border py-5">
              <strong className="block font-display text-2xl group-hover:text-primary">Galaxy Stadium, Lubbock</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Texas Tech football at the Lubbock venue historically known as Jones AT&T Stadium.</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open Galaxy Stadium guide →</span>
            </a>
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
