import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-drivers-license")({
  component: TexasDriversLicensePage,
});

function TexasDriversLicensePage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
