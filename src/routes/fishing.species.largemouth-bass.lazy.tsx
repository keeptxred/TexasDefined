import { createLazyFileRoute } from "@tanstack/react-router";

import { FishSpeciesGuide } from "@/components/fishing/FishSpeciesGuide";

export const Route = createLazyFileRoute("/fishing/species/largemouth-bass")({
  component: LargemouthBassRoute,
});

function LargemouthBassRoute() {
  return <FishSpeciesGuide pageData={Route.useLoaderData()} />;
}
