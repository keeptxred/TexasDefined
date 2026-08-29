import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/trip/$token")({
  beforeLoad: ({ params, location }) => {
    const search = new URLSearchParams(location.searchStr || "");
    search.set("trip", params.token);

    throw redirect({
      href: `/explore/trip-planner?${search.toString()}`,
      statusCode: 301,
    });
  },
});
