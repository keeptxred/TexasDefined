import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasMusicHistoricVenueGuide } from "@/components/editorial/TexasMusicHistoricVenueGuide";

export const Route = createLazyFileRoute("/longhorn-ballroom-dallas-history")({ component: GuidePage });

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasMusicHistoricVenueGuide guide={guide} />;
}
