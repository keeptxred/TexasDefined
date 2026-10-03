const SITE_URL = "https://texasdefined.com";
const PAGE_URL = `${SITE_URL}/guides/citypass-texas`;

export function CityPassStructuredData({ description, reviewedAt }: { description: string; reviewedAt: string }) {
  const faq = [
    ["How long is a Texas CityPASS valid?", "Dallas, Houston and San Antonio CityPASS tickets are currently valid for nine consecutive days, starting with the first attraction visit or earliest reservation."],
    ["Do I choose my attractions before buying?", "No. CityPASS says travelers can decide which participating attractions to visit after purchase and then make any required reservations."],
    ["Does CityPASS include parking or transportation?", "No. Transportation and parking are separate from the included attraction admission."],
    ["Can I visit the same attraction twice?", "Generally no. CityPASS tickets include one-time admission to each included attraction unless otherwise noted."],
  ];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: "Is CityPASS Worth It in Texas? Dallas, Houston & San Antonio Compared",
        description,
        dateModified: reviewedAt,
        author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${SITE_URL}/authors/a-hollis` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        citation: ["https://www.citypass.com/dallas", "https://www.citypass.com/houston", "https://www.citypass.com/san-antonio", "https://support.citypass.com/"],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "Texas CityPASS Guide", item: PAGE_URL },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
