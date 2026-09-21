import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-colleges-universities")({
  component: TexasCollegesUniversitiesPage,
});

function TexasCollegesUniversitiesPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
