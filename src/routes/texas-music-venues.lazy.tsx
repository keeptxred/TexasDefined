import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasMusicVenueGuide } from "@/components/editorial/TexasMusicVenueGuide";

export const Route = createLazyFileRoute("/texas-music-venues")({ component: GuidePage });

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasMusicVenueGuide guide={guide} />;
}
