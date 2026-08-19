import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/historic-site/seminole-canyon-state-park-state-historic-site")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/seminole-canyon-state-park-and-historic-site${location.searchStr || ""}`, statusCode: 301 });
  },
});
