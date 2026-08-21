import {
  paintedChurchEvidenceLedgerBySlug as legacyEvidenceLedgerBySlug,
  type PaintedChurchEvidenceClaim,
} from "./painted-church-evidence-ledger";
import { canonicalPaintedChurchPreservationEventsBySlug } from "./painted-church-preservation-index";

export type { PaintedChurchClaimStatus, PaintedChurchEvidenceClaim, PaintedChurchEvidenceSource } from "./painted-church-evidence-ledger";

/** Canonical claim ledger. New preservation research replaces legacy preservation claims by category. */
export function canonicalPaintedChurchEvidenceLedgerBySlug(slug: string): PaintedChurchEvidenceClaim[] {
  const baseClaims = legacyEvidenceLedgerBySlug(slug).filter((claim) => claim.category !== "preservation");
  const preservationClaims: PaintedChurchEvidenceClaim[] = (canonicalPaintedChurchPreservationEventsBySlug.get(slug) ?? []).map((event) => ({
    id: `${slug}-preservation-${event.id}`,
    category: "preservation" as const,
    label: `${event.yearLabel ?? event.year} — ${event.type.replaceAll("-", " ")}`,
    claim: event.summary,
    status: event.qualification ? "qualified" as const : "accepted" as const,
    qualification: event.qualification,
    sources: [{
      label: event.sourceLabel,
      url: event.sourceUrl,
      use: `church-specific ${event.type.replaceAll("-", " ")} chronology evidence`,
    }],
  }));
  return [...baseClaims, ...preservationClaims];
}
