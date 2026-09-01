import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const HUB_SLUG = "texas-road-trip";
const TexasRoute66PageContent = lazy(() => import("@/components/explore/TexasRoute66Page").then((module) => ({ default: module.TexasRoute66PageContent })));

export const Route = createFileRoute("/explore/route-66/$slug")({
  loader: async ({ params }) => {
    const { loadTexasRoute66Page } = await import("@/data/texas-route-66-page");
    return loadTexasRoute66Page(params.slug);
  },
  head: ({ loaderData }) => loaderData?.head ?? {
    meta: [{ title: "Route 66 guide unavailable" }, { name: "robots", content: "noindex, nofollow" }],
  },
  notFoundComponent: () => <Container className="py-24">
    <p className="eyebrow text-primary">Texas Route 66</p>
    <h1 className="mt-3 font-display text-4xl">That stop isn’t on this route yet</h1>
    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the complete <a href={`/explore/route-66/${HUB_SLUG}`} className="border-b border-primary text-primary">Texas Route 66 road trip</a> to see every stop in the current guide.</p>
  </Container>,
  component: TexasRoute66Page,
});

function TexasRoute66Page() {
  const { pageData } = Route.useLoaderData();
  return <Suspense fallback={<Container className="py-24"><p className="text-sm text-muted-foreground">Loading Texas Route 66 guide…</p></Container>}>
    <TexasRoute66PageContent data={pageData} />
  </Suspense>;
}
