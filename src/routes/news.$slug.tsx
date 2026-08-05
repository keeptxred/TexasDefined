import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { migratedEditorialSlugs } from "@/data/fixtures/migrated-editorial";

export const Route = createFileRoute("/news/$slug")({
  beforeLoad: ({ params }) => {
    if (!migratedEditorialSlugs.includes(params.slug)) throw notFound();
    throw redirect({ href: `/article/${params.slug}`, statusCode: 301 });
  },
});
