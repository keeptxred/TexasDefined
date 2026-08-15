import { createFileRoute } from "@tanstack/react-router";

import { getFishingGuideOnboardingOptions } from "@/data/fishing/guide-onboarding.functions";

export const Route = createFileRoute("/fishing/guides/submit")({
  loader: () => getFishingGuideOnboardingOptions(),
  head: () => ({
    meta: [
      { title: "Submit or Update a Texas Fishing Guide Listing | TexasDefined" },
      { name: "description", content: "Submit, claim, correct or remove a Texas fishing-guide listing for independent verification before publication in the TexasDefined guide directory." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});
