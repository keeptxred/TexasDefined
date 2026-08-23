import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-two-step")({
  component: TexasTwoStepPage,
});

function TexasTwoStepPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
