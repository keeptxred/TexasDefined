import { z } from "zod";

export const fishingReportSubmissionSchema = z.object({
  intent: z.enum(["submit-report", "request-contributor-approval"]),
  contactName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  businessName: z.string().trim().min(2).max(160),
  guideListingUrl: z.string().trim().max(500).default(""),
  lakeSlug: z.string().trim().regex(/^[a-z0-9-]+$/),
  speciesSlugs: z.array(z.string().trim().regex(/^[a-z0-9-]+$/)).min(1).max(12),
  reportDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().trim().min(8).max(180),
  summary: z.string().trim().min(80).max(4000),
  conditionsNotes: z.string().trim().max(2500).default(""),
  techniqueNotes: z.string().trim().max(2500).default(""),
  sourceUrls: z.string().trim().min(8).max(5000),
  authorized: z.literal(true),
  accuracyAttested: z.literal(true),
  addressLine2: z.string().max(0).default(""),
});

export type FishingReportSubmission = z.infer<typeof fishingReportSubmissionSchema>;
