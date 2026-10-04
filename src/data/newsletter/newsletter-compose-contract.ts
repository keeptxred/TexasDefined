import { z } from 'zod';

export const newsletterStorySchema = z.object({
  kicker: z.string().trim().max(80).optional(),
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().min(1).max(600),
  url: z.string().trim().min(1).max(2_000),
  imageUrl: z.string().trim().max(2_000).optional(),
});

export const newsletterDraftSchema = z.object({
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  subject: z.string().trim().min(1).max(180),
  preheader: z.string().trim().max(240).optional().nullable(),
  issueLabel: z.string().trim().min(1).max(120),
  headline: z.string().trim().min(1).max(180),
  intro: z.string().trim().min(1).max(1_000),
  stories: z.array(newsletterStorySchema).min(1).max(12),
  closing: z.string().trim().max(600).optional(),
  fromName: z.string().trim().min(1).max(120).optional(),
  replyTo: z.string().email().optional().nullable(),
  audience: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type TexasDefinedNewsletterDraftInput = z.infer<typeof newsletterDraftSchema>;
