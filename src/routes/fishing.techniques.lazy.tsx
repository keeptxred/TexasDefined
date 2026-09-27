import { Outlet, createLazyFileRoute, useRouterState } from "@tanstack/react-router";

import { FishingTechniqueDirectory } from "@/components/fishing/FishingTechniqueDirectory";

export const Route = createLazyFileRoute("/fishing/techniques")({
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath !== "/fishing/techniques") return <Outlet />;

  return <FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()} />;
}
