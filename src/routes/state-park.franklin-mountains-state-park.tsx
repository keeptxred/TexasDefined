import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/state-park/franklin-mountains-state-park")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/franklin-mountains-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
