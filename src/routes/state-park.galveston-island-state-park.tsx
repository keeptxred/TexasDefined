import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/state-park/galveston-island-state-park")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/galveston-island-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
