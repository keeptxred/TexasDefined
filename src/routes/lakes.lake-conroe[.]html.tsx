import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lakes/lake-conroe.html")({
  beforeLoad: () => {
    throw redirect({ href: "/fishing/lakes/lake-conroe", statusCode: 301 });
  },
});
