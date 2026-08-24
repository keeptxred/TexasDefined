import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-flag")({
  component: TexasFlagPage,
});

function TexasFlagPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
