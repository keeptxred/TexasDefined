import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/start-a-business-in-texas")({
  component: StartABusinessInTexasPage,
});

function StartABusinessInTexasPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}