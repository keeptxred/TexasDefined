import { paintedChurchVisitorStatuses as legacyStatuses } from "./painted-church-visitor-status-legacy";
import { preindexPaintedChurchVisitorStatuses } from "./painted-church-visitor-status-preindex";
import type { PaintedChurchVisitorStatus } from "./painted-church-visitor-status-legacy";

export type {
  PaintedChurchVisitorEvidenceScope,
  PaintedChurchVisitorStatus,
} from "./painted-church-visitor-status-legacy";

export const paintedChurchVisitorStatuses: PaintedChurchVisitorStatus[] = [
  ...legacyStatuses,
  ...preindexPaintedChurchVisitorStatuses,
];

export const paintedChurchVisitorStatusBySlug = new Map(paintedChurchVisitorStatuses.map((item) => [item.slug, item]));

export function resolvePaintedChurchVisitorStatus(slug: string): PaintedChurchVisitorStatus {
  const result = paintedChurchVisitorStatusBySlug.get(slug);
  if (!result) throw new Error(`Missing explicit visitor-status research for verified Painted Church: ${slug}`);
  return result;
}
