import { createServerFn } from "@tanstack/react-start";

type FishingReportSubmissionInput = {
  intent: "submit-report" | "request-contributor-approval";
  contactName: string;
  email: string;
  businessName: string;
  guideListingUrl: string;
  lakeSlug: string;
  speciesSlugs: string[];
  reportDate: string;
  title: string;
  summary: string;
  conditionsNotes: string;
  techniqueNotes: string;
  sourceUrls: string;
  authorized: boolean;
  accuracyAttested: boolean;
  addressLine2: string;
};

function acceptFishingReportSubmissionInput(data: FishingReportSubmissionInput) {
  if (!data || typeof data !== "object") throw new Error("Invalid fishing report submission.");
  return data;
}

export const getFishingReportOnboardingOptions = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingReportOnboardingOptionsServer } = await import("./report-onboarding.server");
  return loadFishingReportOnboardingOptionsServer();
});

export const submitFishingReport = createServerFn({ method: "POST" })
  .inputValidator(acceptFishingReportSubmissionInput)
  .handler(async ({ data }) => {
    const { saveFishingReportSubmissionServer } = await import("./report-onboarding.server");
    return saveFishingReportSubmissionServer(data);
  });
