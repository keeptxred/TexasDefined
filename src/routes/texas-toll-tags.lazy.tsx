import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-toll-tags")({
  component: TexasTollTagsPage,
});

function TexasTollTagsPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
