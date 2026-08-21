import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-state-index";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-vs-every-state";
const title = "Texas vs Every Other State: 49 State-by-State Comparisons";
const description = "Compare Texas with every other U.S. state across cost of living, housing, taxes, jobs, climate, geography and everyday life, with a consistent comparison framework.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute("/texas-vs-every-state")({
  loader: async () => {
    const [{ TEXAS_VS_STATE_PROFILES }, { texasVsEveryStateFaq }] = await Promise.all([
      import("@/data/texas-vs-states"),
      import("@/data/priority-route-extras"),
    ]);
    return {
      comparisonFocus: Object.fromEntries(Object.entries(TEXAS_VS_STATE_PROFILES).map(([state, profile]) => [state, profile.comparisonFocus])) as Record<string, string>,
      faq: texasVsEveryStateFaq,
    };
  },
  head: ({ loaderData }) => {
    const faq = loaderData?.faq ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: "2026-08-20" },
          { "@type": "ItemList", "@id": `${pageUrl}#states`, name: "Texas compared with every other U.S. state", numberOfItems: TEXAS_VS_STATES.length, itemListElement: TEXAS_VS_STATES.map((state, index) => ({ "@type": "ListItem", position: index + 1, name: `Texas vs ${state}`, url: absoluteUrl(texasDefinedBrand, `/texas-vs/${texasVsStateSlug(state)}`) })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Explained", item: absoluteUrl(texasDefinedBrand, "/texas-explained") },
            { "@type": "ListItem", position: 3, name: "Texas vs Every State", item: pageUrl },
          ] },
          ...(faq.length ? [{ "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }] : []),
        ],
      })],
    };
  },
});
