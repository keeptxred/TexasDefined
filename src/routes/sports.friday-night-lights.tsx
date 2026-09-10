import { createFileRoute } from "@tanstack/react-router";

import { getFridayNightLightsStructuredData } from "@/data/friday-night-lights-structured-data.functions";

const canonicalPath = "/sports/friday-night-lights";

export const Route = createFileRoute(canonicalPath)({
  loader: () => getFridayNightLightsStructuredData(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide" },
      { name: "description", content: "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning." },
    ],
    links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
    scripts: loaderData ? [{ type: "application/ld+json", children: loaderData }] : [],
  }),
});
