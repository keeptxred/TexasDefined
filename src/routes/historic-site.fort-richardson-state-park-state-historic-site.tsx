import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/historic-site/fort-richardson-state-park-state-historic-site")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/fort-richardson-state-park-state-historic-site${location.searchStr || ""}`, statusCode: 301 });
  },
});
