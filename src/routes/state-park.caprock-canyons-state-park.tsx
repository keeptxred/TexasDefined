import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/state-park/caprock-canyons-state-park")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/caprock-canyons-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
