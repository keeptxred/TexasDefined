import { Outlet, createLazyFileRoute, useRouterState } from "@tanstack/react-router";

import { FishingGuideDirectory } from "@/components/fishing/FishingGuideDirectory";
import { FISHING_GUIDES_DIRECTORY_PATH } from "@/data/fishing/guide-routing";

export const Route = createLazyFileRoute("/fishing/guides")({
  component: FishingGuideDirectoryRoute,
});

function FishingGuideDirectoryRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== FISHING_GUIDES_DIRECTORY_PATH && pathname !== `${FISHING_GUIDES_DIRECTORY_PATH}/`) return <Outlet />;
  return <FishingGuideDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} />;
}
