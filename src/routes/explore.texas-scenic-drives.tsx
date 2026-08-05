import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-scenic-drives")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/road-trips${location.searchStr || ""}`, statusCode: 301 });
  },
});
