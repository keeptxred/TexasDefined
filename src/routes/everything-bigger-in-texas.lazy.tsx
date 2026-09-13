import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/everything-bigger-in-texas")({
  component: EverythingBiggerPage,
});

function EverythingBiggerPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
