import { createServerFn } from "@tanstack/react-start";

type SportsVenueReviewDatesInput = {
  slugs: string[];
};

export const getSportsVenueReviewDates = createServerFn({ method: "POST" })
  .inputValidator((data: SportsVenueReviewDatesInput) => ({
    slugs: [...new Set((data.slugs ?? []).map((slug) => String(slug).trim()).filter(Boolean))].slice(0, 250),
  }))
  .handler(async ({ data }) => {
    const { getSportsVenueEnrichmentAll, getSportsVenueQualityProfileAll } = await import("./sports-venue-enrichment-all");
    return Object.fromEntries(
      data.slugs.map((slug) => {
        const qualityProfile = getSportsVenueQualityProfileAll(slug);
        const enrichment = getSportsVenueEnrichmentAll(slug);
        const reviewedAt = [
          qualityProfile?.sourceReview.reviewedAt,
          enrichment?.verifiedAt,
        ].filter((value): value is string => Boolean(value))
          .map((value) => value.slice(0, 10))
          .sort()
          .at(-1);
        return [slug, reviewedAt] as const;
      }).filter((entry): entry is readonly [string, string] => Boolean(entry[1])),
    );
  });
