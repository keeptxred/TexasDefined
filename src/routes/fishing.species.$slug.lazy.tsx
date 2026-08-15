import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingSpeciesProfile } from "@/components/fishing/FishingSpeciesProfile";

export const Route = createLazyFileRoute("/fishing/species/$slug")({
  component: FishingSpeciesProfilePage,
});

function FishingSpeciesProfilePage() {
  return <FishingSpeciesProfile data={Route.useLoaderData()} />;
}
