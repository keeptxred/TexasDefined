import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingTechniqueProfile } from "@/components/fishing/FishingTechniqueProfile";

export const Route = createLazyFileRoute("/fishing/techniques/$slug")({
  component: FishingTechniqueProfilePage,
});

function FishingTechniqueProfilePage() {
  return <FishingTechniqueProfile data={Route.useLoaderData()} />;
}
