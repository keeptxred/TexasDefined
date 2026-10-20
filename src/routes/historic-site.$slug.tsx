import { LEGACY_EDITORIAL_REDIRECTS } from "@/lib/legacy-editorial-redirects";
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/historic-site/$slug')({
  beforeLoad: ({ params, location }) => {
    throw redirect({ href: `${LEGACY_EDITORIAL_REDIRECTS[`/historic-site/${params.slug}`] ?? `/destination/${params.slug}`}${location.searchStr || ""}`, statusCode: 301 });
  },
});
