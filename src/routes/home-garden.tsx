import { createFileRoute, Link } from "@tanstack/react-router";

import bluebonnets from "@/assets/bluebonnets.jpg";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Destination } from "@/data/types";
import { buildEditorialCollectionHead, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Native plants that survive August, porches made for evening and rooms designed for Texas heat, light and everyday living.";
const imageAlt = "Bluebonnets running to a fence line in spring";

const practicalGuides = [
  ["/texas-hurricane-home-prep", "Hurricane Home Prep", "Prepare the house, yard, food, documents, generator, pool and evacuation plan before a Gulf storm threatens."],
  ["/texas-pool-guide", "Texas Pool Guide", "Opening, winterizing, freeze protection, summer operation and storm preparation for pools across very different Texas climates."],
  ["/texas-pests-guide", "Texas Pests", "Fire ants, mosquitoes, termites, scorpions, roaches, ticks and the seasonal pest pressures Texas homeowners regularly face."],
  ["/texas-snakes-guide", "Texas Snakes", "Recognize venomous groups, avoid risky encounters and understand what to do around snakes in yards, trails and water."],
  ["/texas-wildlife-guide", "Texas Wildlife", "Coyotes, armadillos, alligators, feral hogs, javelinas and practical guidance for sharing space with native and invasive wildlife."],
  ["/texas-birds-guide", "Texas Birds", "Backyard birds, migration, birding seasons and where to start identifying the species moving through Texas."],
  ["/texas-flowers-wildflowers-guide", "Texas Flowers & Wildflowers", "Bluebonnets, native wildflowers, bloom timing and practical ways to landscape with plants adapted to Texas."],
] as const;

export const Route = createFileRoute("/home-garden")({
  head: ({ loaderData }: { loaderData?: { articles: Article[]; destinations: Destination[] } }) => loaderData ? buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath: "/home-garden",
    title: "Texas Home & Garden",
    collectionName: "Texas Home & Garden",
    description,
    image: bluebonnets,
    imageAlt,
    breadcrumbParentName: "Texas Life",
    breadcrumbParentPath: "/texas-living",
    items: [
      ...loaderData.articles.map((article) => ({ type: "Article" as const, name: article.title, url: `/article/${article.slug}`, image: article.hero.src, description: article.dek })),
      ...loaderData.destinations.map((destination) => ({ type: "TouristAttraction" as const, name: destination.name, url: `/destination/${destination.slug}`, image: destination.hero.src, description: destination.summary })),
    ],
  }) : ({ meta: buildMeta(texasDefinedBrand, { canonicalPath: "/home-garden", title: "Texas Home & Garden", description }), links: [canonicalLink(texasDefinedBrand, "/home-garden")] }),
  loader: async ({ context }): Promise<{ articles: Article[]; destinations: Destination[] }> => {
    const [articles, destinations] = await Promise.all([
      context.queryClient.ensureQueryData(articlesQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(destinationsQuery({ category: "home-garden" })),
      context.queryClient.ensureQueryData(regionsQuery()),
    ]);
    return { articles, destinations };
  },
  component: HomeGardenPage,
});

function HomeGardenPage() {
  return <>
    <CategoryPage category="home-garden" eyebrow="Home & Garden" title="A distinctly Texas way of living at home" intro={description} image={{ src: bluebonnets, alt: imageAlt, width: 1600, height: 1067 }} />
    <section className="border-t border-border bg-muted/20 py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-muted-foreground">Practical Texas guides</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Storms, pools, pests and the wildlife outside the back door</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Texas homeownership changes with the season and the region. These guides connect practical household decisions with weather, plants, pests and wildlife instead of treating each subject as a one-off article.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {practicalGuides.map(([to, title, copy]) => <Link key={to} to={to} className="group bg-background p-6">
            <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Read guide →</span>
          </Link>)}
        </div>
      </Container>
    </section>
  </>;
}
