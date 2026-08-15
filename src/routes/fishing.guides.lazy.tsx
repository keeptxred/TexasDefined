import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingGuideDirectory } from "@/components/fishing/FishingGuideDirectory";

export const Route = createLazyFileRoute("/fishing/guides")({
  component: FishingGuideDirectoryRoute,
});

function FishingGuideDirectoryRoute() {
  return <FishingGuideDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} />;
}
