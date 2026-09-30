import { lazy, Suspense } from "react";
import { createFileRoute, notFound, Outlet, useRouterState } from "@tanstack/react-router";

import { getMetroProximityHubPageData } from "@/data/metro-proximity-page-data.functions";

const MetroProximityHubPage = lazy(() =>
  import("@/components/explore/MetroProximityHubPage").then((module) => ({ default: module.MetroProximityHubPage })),
);

export const Route = createFileRoute("/explore/near/$metro")({
  loader: async ({ params }) => {
    const pageData = await getMetroProximityHubPageData({ data: { metro: params.metro } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData, matches, match }) => {
    const isLeaf = matches[matches.length - 1]?.routeId === match.routeId;
    return isLeaf ? (loaderData?.head ?? {}) : {};
  },
  component: MetroProximityBoundary,
});

function MetroProximityBoundary() {
  const pageData = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hubPath = "/explore/near/" + pageData.metro.slug;
  if (pathname !== hubPath && pathname !== hubPath + "/") return <Outlet />;

  return <Suspense fallback={null}>
    <MetroProximityHubPage pageData={pageData} />
  </Suspense>;
}
