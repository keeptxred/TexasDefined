import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasHomeNatureGuide } from "@/components/editorial/TexasHomeNatureGuide";

export const Route = createLazyFileRoute("/texas-snakes-guide")({
  component: SnakesGuidePage,
});

function SnakesGuidePage() {
  const data = Route.useLoaderData();
  return <TexasHomeNatureGuide data={data} />;
}
