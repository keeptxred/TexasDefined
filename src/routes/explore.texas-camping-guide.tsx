import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-camping-guide")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/best-places-to-go-camping-in-texas${location.searchStr || ""}`, statusCode: 301 });
  },
});
