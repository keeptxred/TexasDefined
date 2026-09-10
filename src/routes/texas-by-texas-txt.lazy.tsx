import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-by-texas-txt")({
  component: TexasByTexasTxtPage,
});

function TexasByTexasTxtPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}