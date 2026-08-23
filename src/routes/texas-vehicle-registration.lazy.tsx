import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-vehicle-registration")({
  component: TexasVehicleRegistrationPage,
});

function TexasVehicleRegistrationPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} />;
}
