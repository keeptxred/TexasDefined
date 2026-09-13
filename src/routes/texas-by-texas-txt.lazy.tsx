import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-by-texas-txt")({
  component: TexasByTexasPage,
});

function TexasByTexasPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
