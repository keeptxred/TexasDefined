import { notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";
import { getTexasRoute66Stop, TEXAS_ROUTE_66_STOPS } from "@/data/texas-route-66";

const HUB_SLUG = "texas-road-trip";
const hubDescription = "Drive the complete Texas stretch of Historic Route 66 from the Oklahoma line to Glenrio with 13 linked stop guides, landmark planning, 1–3 day itineraries and official historic-road sources.";

function buildHubHead(canonicalPath: string, pageUrl: string) {
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

function buildStopHead(canonicalPath: string, pageUrl: string, stop: (typeof TEXAS_ROUTE_66_STOPS)[number], index: number) {
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
}

export async function loadTexasRoute66Page(slug: string) {
  const canonicalPath = `/explore/route-66/${slug}`;
  const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

  if (slug === HUB_SLUG) {
    return {
      pageData: { kind: "hub" as const, stops: TEXAS_ROUTE_66_STOPS },
      head: buildHubHead(canonicalPath, pageUrl),
    };
  }

  const stop = getTexasRoute66Stop(slug);
  if (!stop) throw notFound();
  const index = TEXAS_ROUTE_66_STOPS.findIndex((item) => item.slug === stop.slug);
  return {
    pageData: {
      kind: "stop" as const,
      stop,
      index,
      previous: index > 0 ? TEXAS_ROUTE_66_STOPS[index - 1] : undefined,
      next: index < TEXAS_ROUTE_66_STOPS.length - 1 ? TEXAS_ROUTE_66_STOPS[index + 1] : undefined,
      total: TEXAS_ROUTE_66_STOPS.length,
    },
    head: buildStopHead(canonicalPath, pageUrl, stop, index),
  };
}
