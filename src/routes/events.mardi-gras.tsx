import { createFileRoute } from "@tanstack/react-router";
const canonicalPath = "/events/mardi-gras";
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: "Mardi Gras in Texas 2027 | Texas Defined" },
      { name: "description", content: "2027 Texas Mardi Gras parades, official dates, routes and travel guides." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});
