import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-services";
const title = "Texas Services: DMV, Records, Property, Licenses & Business";
const description = "Plain-English independent guides to common Texas government and public-service tasks, with official links, current requirements, fees, local-office routing and verification dates.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

const categories = ["Driver and vehicle services", "Records and documents", "Property and home", "Business and licenses"];

export const Route = createFileRoute("/texas-services")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: "2026-09-01",
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
          mainEntity: { "@id": `${pageUrl}#services` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#services`,
          name: "Texas service guide categories",
          numberOfItems: categories.length,
          itemListElement: categories.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Resources", item: absoluteUrl(texasDefinedBrand, "/texas-resources") },
            { "@type": "ListItem", position: 3, name: "Texas Services", item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
