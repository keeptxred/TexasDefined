import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/sports/friday-night-lights";
const canonicalUrl = "https://texasdefined.com/sports/friday-night-lights";
const title = "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide";
const description = "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning.";
const structuredData = `{"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","name":"Friday Night Lights, Defined","url":"https://texasdefined.com/sports/friday-night-lights"},{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"url":"https://texasdefined.com/article/texas-high-school-football-newcomers"},{"@type":"ListItem","position":2,"url":"https://texasdefined.com/article/texas-high-school-football-friday-night-lights"},{"@type":"ListItem","position":3,"url":"https://texasdefined.com/texas-homecoming-mums"},{"@type":"ListItem","position":4,"url":"https://texasdefined.com/sports-venues/high-school-football"},{"@type":"ListItem","position":5,"url":"https://texasdefined.com/find-my-school-district"},{"@type":"ListItem","position":6,"url":"https://texasdefined.com/sports"},{"@type":"ListItem","position":7,"url":"https://texasdefined.com/texas-tailgating-guide"}]},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://texasdefined.com/"},{"@type":"ListItem","position":2,"name":"Texas Sports","item":"https://texasdefined.com/sports"},{"@type":"ListItem","position":3,"name":"Friday Night Lights, Defined","item":"https://texasdefined.com/sports/friday-night-lights"}]}]}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [{ type: "application/ld+json", children: structuredData }],
  }),
});
