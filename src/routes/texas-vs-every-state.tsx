import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TEXAS_VS_STATES, texasVsStateHref } from "@/data/texas-vs-states-index";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-vs-every-state";
const title = "Texas vs Every Other State: 49 State-by-State Comparisons";
const description = "Compare Texas with every other U.S. state across cost of living, housing, taxes, jobs, climate, geography and everyday life, with a consistent comparison framework.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

const faq = [
  { q: "Is Texas cheaper than every other state?", a: "No. Costs vary by household and by the specific cities or counties being compared. Housing, insurance, utilities, transportation, wages and taxes should be compared together rather than relying on one statewide average." },
  { q: "Does Texas have a state individual income tax?", a: "Texas does not impose an individual state income tax, but households still pay other state and local taxes and should compare total costs rather than one tax category." },
  { q: "What is the best way to compare Texas with another state before moving?", a: "Compare the actual communities you would live in, occupation-specific wages, housing, insurance, utilities, taxes, commute patterns, climate risks and the services your household uses." },
] as const;

export const Route = createFileRoute("/texas-vs-every-state")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: "2026-09-05" },
        { "@type": "ItemList", "@id": `${pageUrl}#states`, name: "Texas compared with every other U.S. state", numberOfItems: TEXAS_VS_STATES.length, itemListElement: TEXAS_VS_STATES.map((state, index) => ({ "@type": "ListItem", position: index + 1, name: `Texas vs ${state}`, url: absoluteUrl(texasDefinedBrand, texasVsStateHref(state)) })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Texas Explained", item: absoluteUrl(texasDefinedBrand, "/texas-explained") },
          { "@type": "ListItem", position: 3, name: "Texas vs Every State", item: pageUrl },
        ] },
        { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
      ],
    })],
  }),
});

export { faq as texasVsEveryStateFaq };
