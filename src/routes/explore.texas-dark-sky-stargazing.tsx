import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/texas-dark-sky-stargazing")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/article/best-texas-stargazing-weekend-trips${location.searchStr || ""}`,
      statusCode: 301,
    });
  },
});
