import { z } from 'zod';

const sourcePathSchema = z.string().trim().min(1).max(500).regex(/^\//, 'Source path must be site-relative.');
const sourceSchema = z.string().trim().min(1).max(100).regex(/^[a-z0-9][a-z0-9-]*$/i);
const consentVersionSchema = z.string().trim().min(1).max(80).regex(/^[a-z0-9][a-z0-9._-]*$/i);
const interestSchema = z.string().trim().min(1).max(40).regex(/^[a-z0-9][a-z0-9-]*$/i);

export const newsletterSignupSchema = z.object({
  email: z.string().trim().email().max(320),
  sourcePath: sourcePathSchema.default('/'),
  source: sourceSchema.default('texasdefined-site'),
  consentVersion: consentVersionSchema.default('v1'),
  interests: z.array(interestSchema).max(12).default([]),
  // Honeypot. Real signup forms leave this blank.
  addressLine2: z.string().max(200).default(''),
});

export const newsletterTokenSchema = z.object({
  token: z.string().uuid(),
});

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
export type NewsletterTokenInput = z.infer<typeof newsletterTokenSchema>;
