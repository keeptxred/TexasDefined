import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingReportOnboardingForm } from "@/components/fishing/FishingReportOnboardingForm";

export const Route = createLazyFileRoute("/fishing/reports/submit")({
  component: FishingReportSubmitRoute,
});

function FishingReportSubmitRoute() {
  return <FishingReportOnboardingForm pageData={Route.useLoaderData()} />;
}
