import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fishing/lake/lake-conroe")({
  beforeLoad: () => {
    throw redirect({ href: "/fishing/lakes/lake-conroe", statusCode: 301 });
  },
});
