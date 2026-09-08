import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const CITYPASS_GUIDE_DESCRIPTION = "How Dallas CityPASS®, Houston CityPASS® and San Antonio CityPASS® work, which attractions participate, when a pass may be worth it, and what to compare before buying.";
export const CITYPASS_GUIDE_REVIEWED_AT = "2026-09-08";

const canonicalPath = "/guides/citypass-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute("/guides/citypass-texas")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "CityPASS® in Texas: Dallas, Houston & San Antonio",
      description: CITYPASS_GUIDE_DESCRIPTION,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          url: pageUrl,
          headline: "CityPASS® in Texas: Dallas, Houston & San Antonio",
          description: CITYPASS_GUIDE_DESCRIPTION,
          dateModified: CITYPASS_GUIDE_REVIEWED_AT,
          author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: absoluteUrl(texasDefinedBrand, "/authors/a-hollis") },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          citation: ["https://www.citypass.com/dallas", "https://www.citypass.com/houston", "https://www.citypass.com/san-antonio"],
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl(texasDefinedBrand, "/guides") },
            { "@type": "ListItem", position: 3, name: "CityPASS® in Texas", item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
