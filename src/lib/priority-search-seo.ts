import type { PrioritySearchPageData } from "@/components/editorial/PrioritySearchPage";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export function buildPrioritySearchHead({
  canonicalPath,
  title,
  description,
  data,
  about = [],
}: {
  canonicalPath: string;
  title: string;
  description: string;
  data: PrioritySearchPageData;
  about?: string[];
}) {
  const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
  const sectionItems = data.sections.map((section, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: section.heading,
    description: section.paragraphs.join(" "),
  }));

  return {
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: "2026-08-20",
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          about: about.map((name) => ({ "@type": "Thing", name })),
          mainEntity: { "@id": `${pageUrl}#sections` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#sections`,
          name: `${data.title} guide sections`,
          numberOfItems: sectionItems.length,
          itemListElement: sectionItems,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Resources", item: absoluteUrl(texasDefinedBrand, "/texas-resources") },
            { "@type": "ListItem", position: 3, name: data.title, item: pageUrl },
          ],
        },
      ],
    })],
  };
}
