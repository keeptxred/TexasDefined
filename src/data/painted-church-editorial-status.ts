import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchFieldworkStatus = "not-yet-field-verified" | "field-visit-complete";
export type PaintedChurchExpertReviewStatus = "not-claimed" | "documented-external-review";

export type PaintedChurchEditorialStatus = {
  slug: string;
  documentaryReviewDate: string;
  fieldworkStatus: PaintedChurchFieldworkStatus;
  expertReviewStatus: PaintedChurchExpertReviewStatus;
  note: string;
};

export const paintedChurchEditorialStatuses: PaintedChurchEditorialStatus[] = expandedPaintedChurches.map((church) => {
  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  const documentaryReviewDate = [church.sourceCheckedAt, visitor?.checkedAt].filter(Boolean).sort().at(-1) ?? church.sourceCheckedAt;
  return {
    slug: church.slug,
    documentaryReviewDate,
    fieldworkStatus: "not-yet-field-verified",
    expertReviewStatus: "not-claimed",
    note: "This profile is documentary research assembled from cited primary, official, archival, parish/congregation, scholarly and public-history sources. Texas Defined does not represent it as original fieldwork or expert peer review until a documented visit/interview/review record exists.",
  };
});

export const paintedChurchEditorialStatusBySlug = new Map(paintedChurchEditorialStatuses.map((status) => [status.slug, status]));
