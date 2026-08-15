import { createServerFn } from "@tanstack/react-start";

import { fishingGuideSubmissionSchema } from "./guide-onboarding.server";

export const getFishingGuideOnboardingOptions = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingGuideOnboardingOptionsServer } = await import("./guide-onboarding.server");
  return loadFishingGuideOnboardingOptionsServer();
});

export const submitFishingGuideListing = createServerFn({ method: "POST" })
  .inputValidator(fishingGuideSubmissionSchema)
  .handler(async ({ data }) => {
    const { saveFishingGuideSubmissionServer } = await import("./guide-onboarding.server");
    return saveFishingGuideSubmissionServer(data);
  });
