import { z } from "zod";

/** Shared validation schemas. No brand assumptions — reusable by any brand. */

export const imageRefSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string().optional(),
});

export const geoPointSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const brandIdSchema = z.enum(["texasdefined", "keeptxred"]);

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a lowercase hyphenated slug");

export const articleSchema = z.object({
  id: z.string(),
  brandId: brandIdSchema,
  slug: slugSchema,
  title: z.string().min(3),
  dek: z.string().min(10),
  category: z.string(),
  hero: imageRefSchema,
  authorId: z.string(),
  publishedAt: z.string(),
  readingMinutes: z.number().int().positive(),
  tags: z.array(z.string()),
  relatedCollections: z.array(slugSchema),
  relatedDestinations: z.array(slugSchema),
});

export const destinationSchema = z.object({
  id: z.string(),
  brandId: brandIdSchema,
  slug: slugSchema,
  name: z.string().min(2),
  summary: z.string().min(10),
  region: z.string(),
  coordinates: geoPointSchema,
  hero: imageRefSchema,
});

export const productSchema = z.object({
  id: z.string(),
  brandId: brandIdSchema,
  slug: slugSchema,
  name: z.string().min(2),
  priceCents: z.number().int().nonnegative(),
  currency: z.literal("USD"),
  image: imageRefSchema,
});

export const newsletterSignupSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  brandId: brandIdSchema,
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;

export const searchParamsSchema = z.object({
  q: z.string().optional(),
});
