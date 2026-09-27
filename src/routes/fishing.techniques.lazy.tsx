import { Outlet, createLazyFileRoute, useChildMatches } from "@tanstack/react-router";

import { FishingTechniqueDirectory } from "@/components/fishing/FishingTechniqueDirectory";

export const Route = createLazyFileRoute("/fishing/techniques")({
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()} />;
}
