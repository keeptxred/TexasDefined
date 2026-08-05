import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-state-parks-guide")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/state-parks${location.searchStr || ""}`, statusCode: 301 });
  },
});
