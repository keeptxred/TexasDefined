import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-fishing-license")({
  component: TexasFishingLicensePage,
});

function TexasFishingLicensePage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
