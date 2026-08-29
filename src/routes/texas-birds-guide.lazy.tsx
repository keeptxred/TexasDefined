import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasHomeNatureGuide } from "@/components/editorial/TexasHomeNatureGuide";

export const Route = createLazyFileRoute("/texas-birds-guide")({
  component: BirdsGuidePage,
});

function BirdsGuidePage() {
  const data = Route.useLoaderData();
  return <TexasHomeNatureGuide data={data} />;
}
