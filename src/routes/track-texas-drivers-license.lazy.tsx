import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/track-texas-drivers-license")({
  component: TrackTexasDriversLicensePage,
});

function TrackTexasDriversLicensePage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
