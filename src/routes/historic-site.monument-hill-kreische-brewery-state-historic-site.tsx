import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/historic-site/monument-hill-kreische-brewery-state-historic-site")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/monument-hill-and-kreische-brewery-state-historic-sites${location.searchStr || ""}`, statusCode: 301 });
  },
});
