import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingTechniqueDirectory } from "@/components/fishing/FishingTechniqueDirectory";

export const Route = createLazyFileRoute("/fishing/techniques")({
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  return <FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()} />;
}
