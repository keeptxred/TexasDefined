import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasHomeNatureGuide } from "@/components/editorial/TexasHomeNatureGuide";

export const Route = createLazyFileRoute("/texas-pests-guide")({
  component: PestsGuidePage,
});

function PestsGuidePage() {
  const data = Route.useLoaderData();
  return <TexasHomeNatureGuide data={data} />;
}
