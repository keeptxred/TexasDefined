import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/what-does-chud-mean")({
  component: WhatDoesChudMeanPage,
});

function WhatDoesChudMeanPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
