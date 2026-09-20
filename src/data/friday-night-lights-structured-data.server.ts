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
  ["Texas high school football classifications and history", "/article/texas-high-school-football-classifications-1a-6a"],
  ["Texas high school football playoffs explained", "/article/texas-high-school-football-playoffs-explained"],
  ["Texas six-man football rules explained", "/article/texas-six-man-football-rules-explained"],
  ["Texas high school football team finder", "/texas-high-school-football-teams"],
  ["Texas high school football scores and schedules", "/article/texas-high-school-football-scores-schedules"],
  ["Texas high school football 2026 season calendar", "/article/texas-high-school-football-2026-season-calendar"],
  ["Texas high school football district directory", "/texas-high-school-football-districts"],
  ["Find your Texas school district", "/find-my-school-district"],
  ["Texas sports hub", "/sports"],
  ["Texas tailgating guide", "/texas-tailgating-guide"],
] as const;

export function loadFridayNightLightsStructuredDataServer() {
  return JSON.stringify({
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
        dateModified: "2026-09-19",
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
  });
}
