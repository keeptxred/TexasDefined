import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-wildflower-seasons")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/road-trips${location.searchStr || ""}`, statusCode: 301 });
  },
});
