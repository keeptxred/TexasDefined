import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingReportDirectory } from "@/components/fishing/FishingReportDirectory";

export const Route = createLazyFileRoute("/fishing/reports")({
  component: FishingReportsRoute,
});

function FishingReportsRoute() {
  return <FishingReportDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} />;
}
