import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/state-park/davis-mountains-state-park")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/davis-mountains-state-park${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
