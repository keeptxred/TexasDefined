import { createServerFn } from "@tanstack/react-start";

type FishingGuideSubmissionInput = {
  intent: "new-listing" | "claim-listing" | "update-listing" | "remove-listing";
  contactName: string;
  email: string;
  businessName: string;
  guideName: string;
  website: string;
  phone: string;
  bookingUrl: string;
  lakeSlugs: string[];
  speciesSlugs: string[];
  serviceRegions: string;
  boatDescription: string;
  maxGuests: string;
  startingPrice: string;
  sourceUrls: string;
  notes: string;
  authorized: boolean;
  addressLine2: string;
};

function acceptFishingGuideSubmissionInput(data: FishingGuideSubmissionInput) {
  if (!data || typeof data !== "object") throw new Error("Invalid fishing guide submission.");
  return data;
}

export const getFishingGuideOnboardingOptions = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingGuideOnboardingOptionsServer } = await import("./guide-onboarding.server");
  return loadFishingGuideOnboardingOptionsServer();
});

export const submitFishingGuideListing = createServerFn({ method: "POST" })
  .inputValidator(acceptFishingGuideSubmissionInput)
  .handler(async ({ data }) => {
    const { saveFishingGuideSubmissionServer } = await import("./guide-onboarding.server");
    return saveFishingGuideSubmissionServer(data);
  });
