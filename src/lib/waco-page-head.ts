import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

/** Route-specific metadata is loaded with its route, not bundled into every visitor's initial shell. */
const WACO_PAGES = {
  "/waco-attractions": [
    "Seven Waco Attractions: Full Visitor Guides and Tours",
    "Seven independent Waco attraction authority guides: Dr Pepper Museum, Cottonland Castle, Suspension Bridge, Cameron Park, Texas Ranger Hall of Fame, McLane Stadium and Cameron Park Zoo.",
    "Waco attractions",
  ],
  "/waco-ghost-tours": [
    "Waco Ghost Tours: Guided Walk vs. Self-Guided Audio Tour",
    "Compare Waco guided ghost walks and self-guided haunted audio routes, including the Dr Pepper Museum meeting point, Magnolia Market and Suspension Bridge, with direct booking links.",
    "Waco ghost tours",
  ],
  "/dallas-to-waco-magnolia-tours": [
    "Dallas to Waco & Magnolia Market: Guided Day Trips Compared",
    "Plan a guided Dallas-to-Waco Magnolia Market day trip, including the actual Dallas pickup, Dr Pepper Museum admission exclusions, Cottonland Castle access and direct Viator booking links.",
    "Dallas to Waco tours",
  ],
} as const;

export function wacoPageHead(path: keyof typeof WACO_PAGES) {
  const [title, description, label] = WACO_PAGES[path];
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
