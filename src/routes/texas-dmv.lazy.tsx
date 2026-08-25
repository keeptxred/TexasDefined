import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-dmv")({
  component: TexasDmvPage,
});

function TexasDmvPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
