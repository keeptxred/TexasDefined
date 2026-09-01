import { lazy, Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const HUB_SLUG = "texas-road-trip";
const hubDescription = "Drive the complete Texas stretch of Historic Route 66 from the Oklahoma line to Glenrio with 13 linked stop guides, landmark planning, 1–3 day itineraries and official historic-road sources.";
const TexasRoute66PageContent = lazy(() => import("@/components/explore/TexasRoute66Page").then((module) => ({ default: module.TexasRoute66PageContent })));

export const Route = createFileRoute("/explore/route-66/$slug")({
  loader: async ({ params }) => {
    const { getTexasRoute66Stop, TEXAS_ROUTE_66_STOPS } = await import("@/data/texas-route-66");
    if (params.slug === HUB_SLUG) return { kind: "hub" as const, stops: TEXAS_ROUTE_66_STOPS };
    const stop = getTexasRoute66Stop(params.slug);
    if (!stop) throw notFound();
    const index = TEXAS_ROUTE_66_STOPS.findIndex((item) => item.slug === stop.slug);
    return {
      kind: "stop" as const,
      stop,
      index,
      previous: index > 0 ? TEXAS_ROUTE_66_STOPS[index - 1] : undefined,
      next: index < TEXAS_ROUTE_66_STOPS.length - 1 ? TEXAS_ROUTE_66_STOPS[index + 1] : undefined,
      total: TEXAS_ROUTE_66_STOPS.length,
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Route 66 guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/explore/route-66/${params.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

    if (loaderData.kind === "hub") {
      const stops = loaderData.stops;
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
                numberOfItems: stops.length,
                itemListOrder: "https://schema.org/ItemListOrderAscending",
                itemListElement: stops.map((stop, index) => ({
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
            address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
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
  return <Suspense fallback={<Container className="py-24"><p className="text-sm text-muted-foreground">Loading Texas Route 66 guide…</p></Container>}>
    <TexasRoute66PageContent data={data} />
  </Suspense>;
}
