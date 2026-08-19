import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/destination/palo-duro-canyon")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/palo-duro-canyon-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
