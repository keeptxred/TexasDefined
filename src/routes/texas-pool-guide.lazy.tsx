import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasHomeNatureGuide } from "@/components/editorial/TexasHomeNatureGuide";

export const Route = createLazyFileRoute("/texas-pool-guide")({
  component: PoolGuidePage,
});

function PoolGuidePage() {
  const data = Route.useLoaderData();
  return <TexasHomeNatureGuide data={data} />;
}
