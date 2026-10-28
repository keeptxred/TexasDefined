import { texasDefinedBrand } from "@/brand/texasdefined";
import type { HuntingAuthorityTopic } from "@/data/hunting/authority";
import { HUNTING_REGULATION_FRESHNESS } from "@/data/hunting/freshness";
import { texasDeerSeason } from "@/data/hunting/deer-season-format";
import { absoluteUrl } from "@/lib/seo";

function JsonLd({ value }: { value: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />;
}

export function HuntingHubSchema() {
  const pageUrl = absoluteUrl(texasDefinedBrand, "/hunting");
  const homeUrl = absoluteUrl(texasDefinedBrand, "/");

  return <JsonLd value={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: "Texas Hunting Guide — Public Land, Licenses, Seasons & Species",
        description: "Plan hunting in Texas with guides to public land, licenses, hunter education, APH, drawn hunts, species and current-season TPWD verification.",
        dateModified: HUNTING_REGULATION_FRESHNESS.lastVerified,
        isPartOf: { "@id": `${homeUrl}#website` },
        about: [
          { "@type": "Thing", name: "Texas hunting" },
          { "@type": "Thing", name: "Texas public hunting" },
          { "@type": "Thing", name: "Texas wildlife management areas" },
          { "@type": "Thing", name: "Texas hunting licenses" },
        ],
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
          { "@type": "ListItem", position: 2, name: "Hunting", item: pageUrl },
        ],
      },
    ],
  }} />;
}

export function HuntingTopicSchema({ topic }: { topic: HuntingAuthorityTopic }) {
  const canonicalPath = `/hunting/${topic.slug}`;
  const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
  const homeUrl = absoluteUrl(texasDefinedBrand, "/");
  const huntingUrl = absoluteUrl(texasDefinedBrand, "/hunting");

  return <JsonLd value={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: topic.title,
        description: topic.description,
        dateModified: topic.slug === "texas-deer-hunting" ? texasDeerSeason.sourceCheckedAt : (topic.reviewedOn ?? HUNTING_REGULATION_FRESHNESS.lastVerified),
        isPartOf: { "@id": `${homeUrl}#website` },
        about: topic.about.map((name) => ({ "@type": "Thing", name })),
        mainEntity: { "@id": `${pageUrl}#${topic.slug === "texas-deer-hunting" ? "article" : "sections"}` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      ...(topic.slug === "texas-deer-hunting" ? [{
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: topic.title,
        description: topic.description,
        image: { "@type": "ImageObject", url: "https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/banner_images/2021-05/White-tailed%20deer.jpg?itok=tsL8BNDt", width: 1300, height: 863, creditText: "Tom Koerner / US Fish and Wildlife Service", license: "https://www.fws.gov/media/white-tailed-deer-buck-0" },
        dateModified: topic.slug === "texas-deer-hunting" ? texasDeerSeason.sourceCheckedAt : (topic.reviewedOn ?? HUNTING_REGULATION_FRESHNESS.lastVerified),
        mainEntityOfPage: { "@id": `${pageUrl}#page` },
        author: { "@type": "Organization", name: "TexasDefined" },
        publisher: { "@type": "Organization", name: "TexasDefined" },
        about: topic.about.map((name) => ({ "@type": "Thing", name })),
        citation: [...new Set(topic.sections.flatMap((section) => (section.links ?? []).filter((link) => link.external).map((link) => link.href)))],
      }] : []),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#sections`,
        name: `${topic.title} guide sections`,
        numberOfItems: topic.sections.length,
        itemListElement: topic.sections.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.heading,
          description: section.paragraphs.join(" "),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
          { "@type": "ListItem", position: 2, name: "Hunting", item: huntingUrl },
          { "@type": "ListItem", position: 3, name: topic.title, item: pageUrl },
        ],
      },
      ...(topic.faq.length ? [{
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: topic.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }] : []),
    ],
  }} />;
}
