import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/sports/friday-night-lights";
const origin = "https://texasdefined.com";
const canonicalUrl = `${origin}${canonicalPath}`;
const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", name: "Friday Night Lights, Defined", url: canonicalUrl },
    { "@type": "ItemList", itemListElement: [
      "/article/texas-high-school-football-newcomers",
      "/article/texas-high-school-football-friday-night-lights",
      "/texas-homecoming-mums",
      "/sports-venues/high-school-football",
      "/find-my-school-district",
      "/sports",
      "/texas-tailgating-guide",
    ].map((path, index) => ({ "@type": "ListItem", position: index + 1, url: `${origin}${path}` })) },
    { "@type": "BreadcrumbList", itemListElement: [
      ["Home", "/"],
      ["Texas Sports", "/sports"],
      ["Friday Night Lights, Defined", canonicalPath],
    ].map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: `${origin}${path}` })) },
  ],
});

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide" },
      { name: "description", content: "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning." },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [{ type: "application/ld+json", children: schema }],
  }),
});
