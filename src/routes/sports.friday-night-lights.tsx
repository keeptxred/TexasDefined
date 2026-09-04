import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/sports/friday-night-lights";
const origin = "https://texasdefined.com";
const canonicalUrl = `${origin}${canonicalPath}`;
const title = "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide";
const description = "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning.";
const itemPaths = [
  "/article/texas-high-school-football-newcomers",
  "/article/texas-high-school-football-friday-night-lights",
  "/texas-homecoming-mums",
  "/sports-venues/high-school-football",
  "/find-my-school-district",
  "/sports",
  "/texas-tailgating-guide",
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Friday Night Lights, Defined",
      description,
      url: canonicalUrl,
    },
    {
      "@type": "ItemList",
      itemListElement: itemPaths.map((path, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${origin}${path}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: "Texas Sports", item: `${origin}/sports` },
        { "@type": "ListItem", position: 3, name: "Friday Night Lights, Defined", item: canonicalUrl },
      ],
    },
  ],
};

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
});
