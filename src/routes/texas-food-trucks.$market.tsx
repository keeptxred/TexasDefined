import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import {
  FOOD_TRUCK_MARKETS,
  FOOD_TRUCK_SOURCE_CHECKED_AT,
  foodTruckMarketMeta,
} from "@/data/food-truck-markets";
import { getFoodTrucksForMarket } from "@/data/food-trucks.functions";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/texas-food-trucks/$market")({
  loader: async ({ params }) => {
    const market = foodTruckMarketMeta(params.market);
    if (!market) throw notFound();
    const trucks = await getFoodTrucksForMarket(market.slug);
    if (!trucks) throw notFound();
    return { market, trucks };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { market, trucks } = loaderData;
    const canonicalPath = market.path;
    const description = `${market.description} Browse ${trucks.length} TexasDefined food-truck picks, with source and freshness notes and a reminder to confirm live locations before traveling.`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: market.seoTitle,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: market.title,
            description,
            dateModified: FOOD_TRUCK_SOURCE_CHECKED_AT,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${pageUrl}#food-trucks` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#food-trucks`,
            name: `${market.city} notable food trucks and trailers`,
            numberOfItems: trucks.length,
            itemListElement: trucks.map((truck, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "FoodEstablishment",
                name: truck.name,
                areaServed: { "@type": "City", name: market.city },
              },
            })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Texas Food Trucks", item: absoluteUrl(texasDefinedBrand, "/texas-food-trucks") },
              { "@type": "ListItem", position: 3, name: market.city, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: FoodTruckMarketPage,
});

function FoodTruckMarketPage() {
  const { market, trucks } = Route.useLoaderData();
  const editorial = trucks.filter((truck) => truck.sourceType === "editorial");
  const otherMarkets = FOOD_TRUCK_MARKETS.filter((candidate) => candidate.slug !== market.slug);

  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.13em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/texas-food-trucks">Texas food trucks</a><span className="mx-2">/</span><span aria-current="page">{market.city}</span>
        </nav>
        <p className="eyebrow mt-8 text-primary">{market.region} food-truck guide</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">{market.title}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{market.description}</p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <span><strong className="font-display text-2xl text-foreground">{trucks.length}</strong> <span className="text-muted-foreground">launch picks</span></span>
          <span><strong className="font-display text-2xl text-foreground">{formatDate(FOOD_TRUCK_SOURCE_CHECKED_AT)}</strong> <span className="text-muted-foreground">source review</span></span>
        </div>
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Before you go</p><h2 className="mt-2 font-display text-3xl">Food trucks move</h2></div>
          <div className="max-w-3xl">
            <p className="leading-8 text-muted-foreground">This is a curated discovery list, not a real-time schedule. A truck can change addresses, service days, hours, event bookings or operating status faster than a durable travel guide can update. Confirm the current location and hours directly with the operator before making a special trip.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">The city category below was reviewed as a discovery baseline on {formatDate(market.sourceCheckedAt)}. TexasDefined removed obvious non-truck false positives before publishing this collection.</p>
            <a href={market.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Open discovery baseline ↗</a>
          </div>
        </div>

        {editorial.length ? <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Editorial signal</p><h2 className="mt-2 font-display text-3xl">Independent coverage added</h2></div>
          <div className="grid gap-5 sm:grid-cols-2">
            {editorial.map((truck) => <article key={truck.id} className="border border-border p-6">
              <span className="eyebrow text-primary">Current editorial selection</span>
              <h3 className="mt-2 font-display text-3xl">{truck.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{truck.sourceLabel}</p>
              <a href={truck.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">Read source ↗</a>
            </article>)}
          </div>
        </section> : null}

        <section className="py-12" aria-labelledby="truck-list-heading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Launch collection</p>
              <h2 id="truck-list-heading" className="mt-2 font-display text-3xl">{market.city} trucks and trailers</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Names are presented as a market collection rather than 300 thin standalone pages.</p>
            </div>
            <ol className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
              {trucks.map((truck, index) => <li key={truck.id} className="bg-background p-5">
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-2 block font-display text-2xl leading-tight">{truck.name}</strong>
                <span className="mt-3 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{market.city} · {market.region}</span>
              </li>)}
            </ol>
          </div>
        </section>

        {market.primaryCountySlug ? <aside className="border-y border-border py-9">
          <p className="eyebrow text-primary">County connection</p>
          <h2 className="mt-2 font-display text-3xl">Continue into the local TexasDefined guide</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">This market has a safe one-county anchor in the current food-truck dataset, so it can connect directly into the county discovery graph without guessing across city boundaries.</p>
          <a href={`/county/${market.primaryCountySlug}`} className="mt-5 inline-block text-sm font-semibold text-primary">Open the county guide →</a>
        </aside> : null}

        <section className="py-12">
          <p className="eyebrow text-primary">More Texas food trucks</p>
          <h2 className="mt-2 font-display text-3xl">Browse another market</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {otherMarkets.map((candidate) => <a key={candidate.slug} href={candidate.path} className="group bg-background p-5">
              <span className="eyebrow text-primary">{candidate.region}</span>
              <strong className="mt-2 block font-display text-2xl group-hover:text-primary">{candidate.city}</strong>
              <span className="mt-3 block text-sm text-muted-foreground">Open market guide →</span>
            </a>)}
          </div>
          <a href="/texas-food-trucks" className="mt-7 inline-block text-sm font-semibold text-primary">Back to all 300 Texas food trucks →</a>
        </section>
      </Container>
    </section>
  </main>;
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
