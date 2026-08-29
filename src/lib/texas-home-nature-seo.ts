import { texasDefinedBrand } from "@/brand/texasdefined";
import type { TexasHomeNaturePublicGuide } from "@/data/texas-home-nature-public";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export function texasHomeNatureGuideHead(data: TexasHomeNaturePublicGuide | undefined, canonicalPath: string) {
  if (!data) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
  const { guide, sources, reviewedAt } = data;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: guide.title,
        description: guide.dek,
        inLanguage: texasDefinedBrand.identity.locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#article` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        dateModified: reviewedAt,
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        mainEntityOfPage: { "@id": pageUrl },
        headline: guide.title,
        description: guide.dek,
        datePublished: "2026-08-29",
        dateModified: reviewedAt,
        articleSection: "Texas Home & Nature",
        isAccessibleForFree: true,
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        citation: sources.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Texas Life", item: `${siteUrl}/texas-living` },
          { "@type": "ListItem", position: 3, name: "Home & Garden", item: `${siteUrl}/home-garden` },
          { "@type": "ListItem", position: 4, name: guide.title, item: pageUrl },
        ],
      },
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, {
      title: guide.title,
      description: guide.dek,
      type: "article",
      canonicalPath,
      publishedTime: "2026-08-29",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  };
}
