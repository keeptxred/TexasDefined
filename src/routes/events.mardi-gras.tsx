import { createFileRoute } from "@tanstack/react-router";
const canonicalPath = "/events/mardi-gras";
export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: [
      { title: "Texas Mardi Gras 2027 | Texas Defined" },
      { name: "description", content: "2027 Texas Mardi Gras parades, routes, dates and trip tips." },
    ],
    links: [{ rel: "canonical", href: "https://texasdefined.com" + canonicalPath }],
  }),
});
