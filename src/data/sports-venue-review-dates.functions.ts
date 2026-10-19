import { createServerFn } from "@tanstack/react-start";

type SportsVenueReviewDatesInput = {
  slugs: string[];
};

export const getSportsVenueReviewDates = createServerFn({ method: "POST" })
  .inputValidator((data: SportsVenueReviewDatesInput) => ({
    slugs: [...new Set((data.slugs ?? []).map((slug) => String(slug).trim()).filter(Boolean))].slice(0, 250),
  }))
  .handler(async ({ data }) => {
    const { getSportsVenueQualityProfileAll } = await import("./sports-venue-enrichment-all");
    return Object.fromEntries(
      data.slugs.map((slug) => {
        const reviewedAt = getSportsVenueQualityProfileAll(slug)?.sourceReview.reviewedAt;
        return [slug, reviewedAt] as const;
      }).filter((entry): entry is readonly [string, string] => Boolean(entry[1])),
    );
  });
