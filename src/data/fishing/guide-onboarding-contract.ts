import { z } from "zod";

export const fishingGuideSubmissionIntentSchema = z.enum(["new-listing", "claim-listing", "update-listing", "remove-listing"]);

export const fishingGuideSubmissionSchema = z.object({
  intent: fishingGuideSubmissionIntentSchema,
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  businessName: z.string().trim().min(2).max(180),
  guideName: z.string().trim().max(160).default(""),
  website: z.string().trim().max(500).default(""),
  phone: z.string().trim().max(80).default(""),
  bookingUrl: z.string().trim().max(500).default(""),
  lakeSlugs: z.array(z.string().trim().regex(/^[a-z0-9-]+$/)).max(20).default([]),
  speciesSlugs: z.array(z.string().trim().regex(/^[a-z0-9-]+$/)).max(30).default([]),
  serviceRegions: z.string().trim().max(1000).default(""),
  boatDescription: z.string().trim().max(1000).default(""),
  maxGuests: z.string().trim().max(20).default(""),
  startingPrice: z.string().trim().max(80).default(""),
  sourceUrls: z.string().trim().min(8).max(3000),
  notes: z.string().trim().max(3000).default(""),
  authorized: z.boolean().refine((value) => value, "Authorization is required."),
  addressLine2: z.string().max(200).default(""),
});

export type FishingGuideSubmission = z.infer<typeof fishingGuideSubmissionSchema>;
