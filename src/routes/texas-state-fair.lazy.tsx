import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-state-fair")({
  component: TexasStateFairPage,
});

function TexasStateFairPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
