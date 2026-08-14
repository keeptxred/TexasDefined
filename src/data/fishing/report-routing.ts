import { assertCanonicalFishingSlug } from "./slugs";
import type { FishingReport } from "./types";

export const FISHING_REPORTS_DIRECTORY_PATH = "/fishing/reports";
export const FISHING_REPORTS_VERIFIED_AT = "2026-08-14";
export type FishingReportFreshness = "current" | "stale" | "expired";

export function fishingReportCanonicalPath(slug: string) {
  assertCanonicalFishingSlug(slug);
  return `${FISHING_REPORTS_DIRECTORY_PATH}/${slug}`;
}

export function fishingReportFreshness(report: Pick<FishingReport, "publishedAt" | "expiresAt">, now = new Date()): FishingReportFreshness {
  const published = new Date(report.publishedAt);
  if (Number.isNaN(published.getTime()) || published.getTime() > now.getTime()) return "expired";
  if (report.expiresAt) {
    const expires = new Date(report.expiresAt);
    if (Number.isNaN(expires.getTime()) || expires.getTime() < now.getTime()) return "expired";
  }
  const ageDays = (now.getTime() - published.getTime()) / 86_400_000;
  if (ageDays <= 7) return "current";
  if (ageDays <= 30) return "stale";
  return "expired";
}
