import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { getMetroProximityHubPageData } from "@/data/metro-proximity-page-data.functions";

const MetroProximityHubRich = lazy(() =>
  import("./explore.near.$metro.lazy").then((module) => ({ default: module.MetroProximityHubRich })),
);

export const Route = createFileRoute("/explore/near/$metro")({
  loader: async ({ params }) => {
    const pageData = await getMetroProximityHubPageData({ data: { metro: params.metro } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  component: MetroProximityHubPage,
});

function MetroProximityHubPage() {
  const pageData = Route.useLoaderData();
  const { metro, collections } = pageData;

  return <>
    <main>
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="text-foreground">Near {metro.name}</li>
          </ol>
        </nav>
      </div>

      <section className="mt-5 border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-primary">{metro.regionLabel} drive market</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pageData.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{metro.context}</p>
          <p className="mt-7 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">TexasDefined ranks these nearby guides with destination coordinates and source-backed place records. Mileages are straight-line geographic estimates for comparison, not promised driving distances or travel times.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <p className="eyebrow text-primary">Explore by trip type</p>
        <h2 className="mt-3 font-display text-4xl">Choose the kind of escape you want</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {collections.map(({ collection, results }) => <article key={collection.slug} className="border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">{results.length} nearby options</p>
            <h3 className="mt-2 font-display text-2xl"><Link to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: collection.slug }} className="hover:text-primary">{collection.label}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{collection.summary}</p>
          </article>)}
        </div>
      </section>

      <Suspense fallback={null}>
        <MetroProximityHubRich pageData={pageData} />
      </Suspense>
    </main>
  </>;
}
