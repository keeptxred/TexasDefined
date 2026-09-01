import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { museumCollectionDestinations } from "@/data/museum-collection";
import { destinationsQuery } from "@/data/queries";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/museums";
const description = "Browse source-checked Texas museum destination guides covering art, science, history, presidential, military, children's and specialty museums.";

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => museumCollectionDestinations(
    await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
  ),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Museums | Art, Science, History & Cultural Museums",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: TexasMuseumsPage,
});

function TexasMuseumsPage() {
  const museums = Route.useLoaderData();
  return <main>
    <Container className="py-14 sm:py-20">
      <p className="eyebrow text-primary">Texas culture · source-checked guides</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Museums across Texas</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description} Hours, admission and temporary exhibitions can change, so each destination guide points back to its controlling visitor source.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link to="/explore/historic-sites" className="border-b border-primary pb-1 text-primary">Historic Sites & Museums</Link>
        <Link to="/explore/trip-planner" className="border-b border-primary pb-1 text-primary">Trip planner</Link>
      </div>
      <section className="mt-12 border-t border-border pt-8" aria-labelledby="museum-guides">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="museum-guides" className="font-display text-3xl">{museums.length} museum guides</h2>
          <p className="text-sm text-muted-foreground">Sorted by community</p>
        </div>
        <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {museums.map((museum) => <li key={museum.slug} className="border-t border-border py-4">
            <Link to="/destination/$slug" params={{ slug: museum.slug }} className="font-semibold text-foreground hover:text-primary">{museum.name}</Link>
            <p className="mt-1 text-sm text-muted-foreground">{museum.nearestTown}</p>
          </li>)}
        </ul>
      </section>
    </Container>
  </main>;
}
