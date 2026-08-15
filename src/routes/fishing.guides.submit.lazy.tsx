import { createLazyFileRoute } from "@tanstack/react-router";

import { FishingGuideOnboardingForm } from "@/components/fishing/FishingGuideOnboardingForm";

export const Route = createLazyFileRoute("/fishing/guides/submit")({
  component: FishingGuideSubmitPage,
});

function FishingGuideSubmitPage() {
  return <FishingGuideOnboardingForm pageData={Route.useLoaderData()} />;
}
