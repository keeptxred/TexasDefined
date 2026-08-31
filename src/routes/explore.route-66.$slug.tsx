import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasRoute66Hub } from "@/components/explore/TexasRoute66Hub";
import { Container } from "@/components/layout/Container";
import { getTexasRoute66Stop, TEXAS_ROUTE_66_STOPS } from "@/data/texas-route-66";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const HUB_SLUG = "texas-road-trip";
const hubDescription = "Drive the complete Texas stretch of Historic Route 66 from the Oklahoma line to Glenrio with 13 linked stop guides, landmark planning, 1–3 day itineraries and official historic-road sources.";

export const Route = createFileRoute("/explore/route-66/$slug")({
  loader: ({ params }) => {
    if (params.slug === HUB_SLUG) return { kind: "hub" as const };
    const stop = getTexasRoute66Stop(params.slug);
    if (!stop) throw notFound();
    const index = TEXAS_ROUTE_66_STOPS.findIndex((item) => item.slug === stop.slug);
    return {
      kind: "stop" as const,
      stop,
      index,
      previous: index > 0 ? TEXAS_ROUTE_66_STOPS[index - 1] : undefined,
      next: index < TEXAS_ROUTE_66_STOPS.length - 1 ? TEXAS_ROUTE_66_STOPS[index + 1] : undefined,
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Route 66 guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/explore/route-66/${params.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

    if (loaderData.kind === "hub") {
      return {
        meta: buildMeta(texasDefinedBrand, {
          canonicalPath,
          title: "Texas Route 66 Road Trip: Complete Stop-by-Stop Guide | Texas Defined",
          description: hubDescription,
        }),
        links: [canonicalLink(texasDefinedBrand, canonicalPath)],
        scripts: [jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: "Texas Route 66 Road Trip",
              description: hubDescription,
              isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
              mainEntity: { "@id": `${pageUrl}#itinerary` },
              dateModified: "2026-08-31",
            },
            {
              "@type": "TouristTrip",
              "@id": `${pageUrl}#itinerary`,
              name: "Historic Route 66 across Texas",
              description: hubDescription,
              touristType: ["Road trip travelers", "Route 66 travelers", "Texas history travelers"],
              itinerary: {
                "@type": "ItemList",
                numberOfItems: TEXAS_ROUTE_66_STOPS.length,
                itemListOrder: "https://schema.org/ItemListOrderAscending",
                itemListElement: TEXAS_ROUTE_66_STOPS.map((stop, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: stop.name,
                  url: absoluteUrl(texasDefinedBrand, `/explore/route-66/${stop.slug}`),
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
                { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
                { "@type": "ListItem", position: 3, name: "Texas Route 66", item: pageUrl },
              ],
            },
          ],
        })],
      };
    }

    const { stop, index } = loaderData;
    const description = `${stop.name} on Texas Route 66: what to see, why the stop matters, planning notes and authoritative sources for a complete Texas Mother Road itinerary.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${stop.name} Route 66 Guide | Texas Defined`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: `${stop.name} Route 66 Guide`,
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            about: { "@id": `${pageUrl}#place` },
            citation: stop.sourceLinks.map((source) => source.href),
            dateModified: "2026-08-31",
          },
          {
            "@type": "Place",
            "@id": `${pageUrl}#place`,
            name: stop.name,
            description: stop.summary,
            address: { "@type": "PostalAddress", addressRegion: stop.slug === "glenrio" ? "TX" : "TX", addressCountry: "US" },
            isPartOf: { "@type": "TouristTrip", name: "Historic Route 66 across Texas", url: absoluteUrl(texasDefinedBrand, `/explore/route-66/${HUB_SLUG}`) },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Texas Route 66", item: absoluteUrl(texasDefinedBrand, `/explore/route-66/${HUB_SLUG}`) },
              { "@type": "ListItem", position: 4, name: stop.name, item: pageUrl },
            ],
          },
          { "@type": "ListItem", position: index + 1, name: stop.name, url: pageUrl },
        ],
      })],
    };
  },
  notFoundComponent: () => <Container className="py-24">
    <p className="eyebrow text-primary">Texas Route 66</p>
    <h1 className="mt-3 font-display text-4xl">That stop isn’t on this route yet</h1>
    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the complete <a href={`/explore/route-66/${HUB_SLUG}`} className="border-b border-primary text-primary">Texas Route 66 road trip</a> to see every stop in the current guide.</p>
  </Container>,
  component: TexasRoute66Page,
});

function TexasRoute66Page() {
  const data = Route.useLoaderData();
  if (data.kind === "hub") return <TexasRoute66Hub />;

  const { stop, index, previous, next } = data;
  return <>
    <Container className="pb-10 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><a href={`/explore/route-66/${HUB_SLUG}`}>Route 66</a><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{stop.name}</span>
      </nav>
      <header className="py-10 sm:py-16">
        <p className="eyebrow text-primary">Stop {index + 1} of {TEXAS_ROUTE_66_STOPS.length} · {stop.county}</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{stop.name} on Texas Route 66</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{stop.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`/explore/route-66/${HUB_SLUG}`} className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">← Complete Route 66 trip</a>
          <Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted">Open Trip Planner →</Link>
        </div>
      </header>
      <section className="grid gap-4 border-y border-border py-7 sm:grid-cols-3" aria-label={`${stop.name} at a glance`}>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Route order</p><p className="mt-2 font-display text-3xl">#{index + 1}</p></div>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">County</p><p className="mt-2 font-display text-2xl">{stop.county}</p></div>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Stop type</p><p className="mt-2 font-display text-2xl capitalize">{stop.kind.replace("-", " ")}</p></div>
      </section>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
        <div><p className="eyebrow text-primary">Why it belongs</p><h2 className="mt-2 font-display text-4xl">The Route 66 story here</h2></div>
        <div><p className="text-base leading-8 text-muted-foreground">{stop.routeContext}</p><p className="mt-5 text-base leading-8 text-muted-foreground">A complete Texas Route 66 road trip works because the famous landmarks are connected by places like this one. The route was a transportation system before it became a nostalgia trail: service stations, cafes, motels, bridges, commercial blocks, grain elevators and roadside advertising all developed around motorists moving across the Panhandle. Reading the communities in sequence gives the road more meaning than jumping directly from one photo stop to another.</p></div>
      </div>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl"><p className="eyebrow text-primary">On the ground</p><h2 className="mt-2 font-display text-4xl">What to look for in {stop.name}</h2></div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">{stop.highlights.map((highlight, itemIndex) => <article key={highlight} className="border border-border p-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{String(itemIndex + 1).padStart(2, "0")}</p><p className="mt-3 text-base leading-7">{highlight}</p></article>)}</div>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
        <div><p className="eyebrow text-primary">Plan the stop</p><h2 className="mt-2 font-display text-4xl">Before you pull off the highway</h2></div>
        <ul className="space-y-4">{stop.planning.map((note) => <li key={note} className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">{note}</li>)}</ul>
      </div>
    </Container>

    {stop.internalLinks?.length ? <Container className="py-10"><div className="border-y border-border py-8"><p className="eyebrow text-primary">Keep exploring TexasDefined</p><h2 className="mt-2 font-display text-3xl">Related guides for this stop</h2><div className="mt-5 flex flex-wrap gap-4">{stop.internalLinks.map((link) => <a key={link.to} href={link.to} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{link.label} →</a>)}</div></div></Container> : null}

    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Source desk</p><h2 className="mt-2 font-display text-4xl">Verify the historic record and current access</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses preservation and transportation authorities for the historic corridor. Hours, business operations, construction, private-property access and road conditions can change after publication, so use these sources and current local information before departure.</p>
      <ul className="mt-6 space-y-3">{stop.sourceLinks.map((source) => <li key={source.href}><a href={source.href} rel="noreferrer" target="_blank" className="border-b border-primary pb-1 text-sm font-semibold text-primary">{source.label} →</a></li>)}</ul>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? <a href={`/explore/route-66/${previous.slug}`} className="group border border-border p-6 transition-colors hover:bg-muted"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Previous stop</p><p className="mt-2 font-display text-3xl group-hover:text-primary">← {previous.name}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{previous.summary}</p></a> : <div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Eastern gateway</p><p className="mt-2 font-display text-3xl">Oklahoma line near Texola</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Cross into Texas and begin the state itinerary with {stop.name}.</p></div>}
        {next ? <a href={`/explore/route-66/${next.slug}`} className="group border border-border p-6 transition-colors hover:bg-muted"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Next stop</p><p className="mt-2 font-display text-3xl group-hover:text-primary">{next.name} →</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{next.summary}</p></a> : <div className="border border-border p-6"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Western gateway</p><p className="mt-2 font-display text-3xl">Continue into New Mexico →</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The Texas segment ends at the state line; Historic Route 66 continues west toward Tucumcari.</p></div>}
      </div>
    </Container>
  </>;
}
