import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TexasRoute66PageContent } from "@/components/explore/TexasRoute66Page";

const HUB_SLUG = "texas-road-trip";

export const Route = createLazyFileRoute("/explore/route-66/$slug")({
  component: TexasRoute66Page,
  notFoundComponent: () => <Container className="py-24">
    <p className="eyebrow text-primary">Texas Route 66</p>
    <h1 className="mt-3 font-display text-4xl">That stop isn’t on this route yet</h1>
    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the complete <a href={`/explore/route-66/${HUB_SLUG}`} className="border-b border-primary text-primary">Texas Route 66 road trip</a> to see every stop in the current guide.</p>
  </Container>,
});

function TexasRoute66Page() {
  const { pageData } = Route.useLoaderData();
  return <TexasRoute66PageContent data={pageData} />;
}
