import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingGuideProfile } from "@/components/fishing/FishingGuideProfile";

export const Route = createLazyFileRoute("/fishing/guides/$slug")({
  component: FishingGuideProfileRoute,
});

function FishingGuideProfileRoute() {
  return <FishingGuideProfile pageData={Route.useLoaderData()} />;
}
