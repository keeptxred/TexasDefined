import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchFieldworkStatus = "not-yet-field-verified" | "field-visit-complete";
export type PaintedChurchExpertReviewStatus = "not-claimed" | "documented-external-review";

export type PaintedChurchEditorialRevision = {
  date: string;
  label: string;
  note: string;
};

export type PaintedChurchEditorialStatus = {
  slug: string;
  authoredBy: string;
  authorshipNote: string;
  documentaryReviewDate: string;
  fieldworkStatus: PaintedChurchFieldworkStatus;
  expertReviewStatus: PaintedChurchExpertReviewStatus;
  revisions: PaintedChurchEditorialRevision[];
  note: string;
};

export const paintedChurchEditorialStatuses: PaintedChurchEditorialStatus[] = expandedPaintedChurches.map((church) => {
  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  const reviewDates = [...new Set([church.sourceCheckedAt, visitor?.checkedAt].filter((date): date is string => Boolean(date)))].sort();
  const documentaryReviewDate = reviewDates.at(-1) ?? church.sourceCheckedAt;
  const revisions = reviewDates.map((date) => ({
    date,
    label: "Documentary source review checkpoint",
    note: date === visitor?.checkedAt && date !== church.sourceCheckedAt
      ? "Current visitor/access evidence was checked at this checkpoint."
      : "Church identity, history, classification and supporting source records were checked at this checkpoint.",
  }));

  return {
    slug: church.slug,
    authoredBy: "Texas Defined Editorial Research",
    authorshipNote: "Organizational byline for Texas Defined's documentary research. Individual researcher or expert credit is added only when a documented contribution supports it.",
    documentaryReviewDate,
    fieldworkStatus: "not-yet-field-verified",
    expertReviewStatus: "not-claimed",
    revisions,
    note: "This profile is documentary research assembled from cited primary, official, archival, parish/congregation, scholarly and public-history sources. Texas Defined does not represent it as original fieldwork or expert peer review until a documented visit/interview/review record exists.",
  };
});

export const paintedChurchEditorialStatusBySlug = new Map(paintedChurchEditorialStatuses.map((status) => [status.slug, status]));
