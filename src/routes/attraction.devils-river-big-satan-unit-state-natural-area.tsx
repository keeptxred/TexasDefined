import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/attraction/devils-river-big-satan-unit-state-natural-area")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/devils-river-state-natural-area${location.searchStr || ""}`, statusCode: 301 });
  },
});
