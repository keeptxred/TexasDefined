import { Outlet, createLazyFileRoute, useRouterState } from "@tanstack/react-router";

import { FishingTechniqueDirectory } from "@/components/fishing/FishingTechniqueDirectory";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";

export const Route = createLazyFileRoute("/fishing/techniques")({
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== FISHING_TECHNIQUES_DIRECTORY_PATH && pathname !== `${FISHING_TECHNIQUES_DIRECTORY_PATH}/`) return <Outlet />;
  return <FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()} />;
}
