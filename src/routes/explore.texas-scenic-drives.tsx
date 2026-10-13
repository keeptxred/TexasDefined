import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-scenic-drives")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/article/scenic-drives-in-texas${location.searchStr || ""}`, statusCode: 301 });
  },
});
