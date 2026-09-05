import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/sports/friday-night-lights";
const canonicalUrl = "https://texasdefined.com/sports/friday-night-lights";
const schema = '{"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","name":"Friday Night Lights, Defined","url":"https://texasdefined.com/sports/friday-night-lights"},{"@type":"ItemList","name":"Texas high school football guides","numberOfItems":7},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://texasdefined.com/"},{"@type":"ListItem","position":2,"name":"Texas Sports","item":"https://texasdefined.com/sports"},{"@type":"ListItem","position":3,"name":"Friday Night Lights, Defined","item":"https://texasdefined.com/sports/friday-night-lights"}]}]}';

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
