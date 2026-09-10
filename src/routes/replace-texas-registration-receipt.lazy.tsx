import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/replace-texas-registration-receipt")({
  component: ReplaceTexasRegistrationReceiptPage,
});

function ReplaceTexasRegistrationReceiptPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}