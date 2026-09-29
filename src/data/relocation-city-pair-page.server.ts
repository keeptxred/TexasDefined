import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

import {
  getRelocationCityPair,
  relocationCityPairDescription,
  relocationCityPairPath,
  relocationCityPairProfile,
  relocationCityPairTitle,
} from "./relocation-city-pairs";

export async function loadRelocationCityPairPageServer(slug: string) {
  const pair = getRelocationCityPair(slug);
  if (!pair) return null;
  const profile = relocationCityPairProfile(pair);
  if (!profile) return null;

  const canonicalPath = relocationCityPairPath(pair.slug);
  const title = relocationCityPairTitle(pair);
  const description = relocationCityPairDescription(pair);
  const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
  const siteUrl = absoluteUrl(texasDefinedBrand, "/");
  const faq = [
    {
      q: `Is ${pair.cityA} cheaper than ${pair.cityB}?`,
      a: `There is no reliable citywide answer for every household. Compare the housing you would actually rent or buy, property taxes, insurance, utilities, transportation and the commute tied to the exact address in each metro.`,
    },
    {
      q: `Which is better for a move: ${pair.cityA} or ${pair.cityB}?`,
      a: `TexasDefined does not rank one city as universally better. The stronger fit depends on your job location, household budget, commute tolerance, school or service needs, insurance exposure and the neighborhoods or suburbs you are actually considering.`,
    },
    {
      q: `What should I compare before choosing between ${pair.cityA} and ${pair.cityB}?`,
      a: `Start with employment location, housing, total ownership or rental costs, commute, utilities, insurance, school or childcare needs and the local tax stack. Then verify the exact address with current official sources.`,
    },
  ];

  return {
    ...profile,
    canonicalPath,
    title,
    description,
    verifiedAt: "2026-09-29",
    head: {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
        { name: "robots", content: "index, follow, max-image-preview:large" },
      ],
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
            dateModified: "2026-09-29",
            isPartOf: { "@id": `${siteUrl}#website` },
            about: [
              { "@type": "City", name: pair.cityA },
              { "@type": "City", name: pair.cityB },
            ],
            breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Texas Defined", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Moving to Texas", item: absoluteUrl(texasDefinedBrand, "/moving-to-texas") },
              { "@type": "ListItem", position: 3, name: "Compare Texas cities", item: absoluteUrl(texasDefinedBrand, "/compare-texas-cities") },
              { "@type": "ListItem", position: 4, name: `${pair.cityA} vs ${pair.cityB}`, item: pageUrl },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ],
      })],
    },
    faq,
  };
}
