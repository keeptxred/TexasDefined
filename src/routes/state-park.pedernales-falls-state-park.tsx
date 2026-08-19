import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/state-park/pedernales-falls-state-park")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/pedernales-falls-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
