import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

/** Shared, crawlable route head without three eagerly bundled JSON-LD builders. */
export function wacoPageHead(path: string, title: string, description: string, label: string) {
  const url = absoluteUrl(texasDefinedBrand, path);
  return {
    meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title, description }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${url}#page`, url, name: title, description, dateModified: "2026-10-20" },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "TexasDefined", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: label, item: url },
        ] },
      ],
    })],
  };
}
