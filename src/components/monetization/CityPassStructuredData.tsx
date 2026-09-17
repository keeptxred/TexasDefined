const SITE_URL = "https://texasdefined.com";
const PAGE_URL = `${SITE_URL}/guides/citypass-texas`;

export function CityPassStructuredData({ description, reviewedAt }: { description: string; reviewedAt: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: "CityPASS® in Texas: Dallas, Houston & San Antonio",
        description,
        dateModified: reviewedAt,
        author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${SITE_URL}/authors/a-hollis` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        citation: ["https://www.citypass.com/dallas", "https://www.citypass.com/houston", "https://www.citypass.com/san-antonio"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "CityPASS® in Texas", item: PAGE_URL },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
