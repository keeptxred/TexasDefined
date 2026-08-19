import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/destination/enchanted-rock")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/enchanted-rock-state-natural-area${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
