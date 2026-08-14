import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-wildflower-seasons")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/article/texas-wildflowers-guide${location.searchStr || ""}`, statusCode: 301 });
  },
});
