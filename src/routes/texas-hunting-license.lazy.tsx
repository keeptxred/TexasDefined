import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-hunting-license")({ component: Page });

function Page() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
