import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/replace-texas-registration-receipt")({
  component: ReplaceRegistrationReceiptPage,
});

function ReplaceRegistrationReceiptPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
