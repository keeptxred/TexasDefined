import { createFileRoute } from "@tanstack/react-router";

const canonicalPath = "/sports/friday-night-lights";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: "Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide" },
      { name: "description", content: "Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning." },
    ],
    links: [{ rel: "canonical", href: `https://texasdefined.com${canonicalPath}` }],
  }),
});
