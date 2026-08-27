import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/county/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/browse/counties#county-${params.slug}`, statusCode: 301 });
  },
});
