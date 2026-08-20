import { texasDefinedBrand } from "@/brand/texasdefined";
import { PRIORITY_SEARCH_PAGES, type PrioritySearchPageKey } from "@/data/priority-search-pages";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export function prioritySearchHead(path: string, key: PrioritySearchPageKey) {
  const data = PRIORITY_SEARCH_PAGES[key];
  const url = absoluteUrl(texasDefinedBrand, path);
  return {
    meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title: data.title, description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": `${url}#page`, url, name: data.title, description: data.intro, dateModified: "2026-08-20", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` } },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Texas Defined", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: data.title, item: url }] },
      ],
    })],
  };
}
