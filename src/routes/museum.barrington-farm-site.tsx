import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/museum/barrington-farm-site")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/barrington-living-history-farm${location.searchStr || ""}`, statusCode: 301 });
  },
});
