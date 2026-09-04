import { texasDefinedBrand } from "@/brand/texasdefined";

const canonicalPath = "/sports/friday-night-lights";
const title = "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide";
const description = "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning.";
const origin = `https://${texasDefinedBrand.identity.domain}`;
const canonicalUrl = `${origin}${canonicalPath}`;
const collectionItems = [
  ["Texas high school football newcomer guide", "/article/texas-high-school-football-newcomers"],
  ["Why Friday night lights matter in Texas", "/article/texas-high-school-football-friday-night-lights"],
  ["Texas homecoming mums explained", "/texas-homecoming-mums"],
  ["Texas high-school football stadiums", "/sports-venues/high-school-football"],
  ["Find your Texas school district", "/find-my-school-district"],
  ["Texas sports hub", "/sports"],
  ["Texas tailgating guide", "/texas-tailgating-guide"],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${canonicalUrl}#page`,
      name: "Friday Night Lights, Defined",
      headline: title,
      description,
      url: canonicalUrl,
      inLanguage: texasDefinedBrand.identity.locale,
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: { "@id": `${canonicalUrl}#guides` },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumbs` },
      dateModified: "2026-09-04",
    },
    {
      "@type": "ItemList",
      "@id": `${canonicalUrl}#guides`,
      name: "Texas high school football guides and planning resources",
      numberOfItems: collectionItems.length,
      itemListElement: collectionItems.map(([name, path], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${origin}${path}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: "Texas Sports", item: `${origin}/sports` },
        { "@type": "ListItem", position: 3, name: "Friday Night Lights, Defined", item: canonicalUrl },
      ],
    },
  ],
};

export function FridayNightLightsStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
