import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-property-tax-lookup")({ component: Page });

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData().data} />;
}
