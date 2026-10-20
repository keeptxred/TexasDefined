import { LEGACY_EDITORIAL_REDIRECTS } from "@/lib/legacy-editorial-redirects";
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/state-park/$slug')({
  beforeLoad: ({ params, location }) => {
    throw redirect({ href: `${LEGACY_EDITORIAL_REDIRECTS[`/state-park/${params.slug}`] ?? `/destination/${params.slug}`}${location.searchStr || ""}`, statusCode: 301 });
  },
});
