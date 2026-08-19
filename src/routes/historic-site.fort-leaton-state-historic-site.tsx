import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/historic-site/fort-leaton-state-historic-site")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/fort-leaton-state-historic-site${location.searchStr || ""}`, statusCode: 301 });
  },
});
