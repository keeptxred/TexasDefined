import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/attraction/honey-creek-state-natural-area")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/destination/honey-creek-state-natural-area${location.searchStr || ""}`, statusCode: 301 });
  },
});
