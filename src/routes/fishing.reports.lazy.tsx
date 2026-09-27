import { Outlet, createLazyFileRoute, useRouterState } from "@tanstack/react-router";

import { FishingReportDirectory } from "@/components/fishing/FishingReportDirectory";
import { FISHING_REPORTS_DIRECTORY_PATH } from "@/data/fishing/report-routing";

export const Route = createLazyFileRoute("/fishing/reports")({
  component: FishingReportsRoute,
});

function FishingReportsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== FISHING_REPORTS_DIRECTORY_PATH && pathname !== `${FISHING_REPORTS_DIRECTORY_PATH}/`) return <Outlet />;
  return <FishingReportDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} />;
}
