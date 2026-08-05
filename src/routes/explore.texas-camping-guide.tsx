import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-camping-guide")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/outdoors${location.searchStr || ""}`, statusCode: 301 });
  },
});
