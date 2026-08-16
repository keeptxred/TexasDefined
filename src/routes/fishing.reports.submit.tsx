import { createFileRoute } from "@tanstack/react-router";

import { getFishingReportOnboardingOptions } from "@/data/fishing/report-onboarding.functions";

export const Route = createFileRoute("/fishing/reports/submit")({
  loader: () => getFishingReportOnboardingOptions(),
  head: () => ({
    meta: [
      { title: "Submit a Texas Fishing Report | TexasDefined" },
      { name: "description", content: "Submit a dated Texas fishing report or request contributor approval for independent verification before publication on TexasDefined." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});
