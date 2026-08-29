import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/scenic-rivers")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/article/texas-rivers-explained${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
