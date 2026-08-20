import { paintedChurchCandidateCensus as legacyCensus } from "./painted-church-census-legacy";
import type { PaintedChurchCensusEntry } from "./painted-church-census-legacy";

export type { PaintedChurchCandidateStatus, PaintedChurchCensusEntry } from "./painted-church-census-legacy";

const promoted = new Set([
  "palestine-first-presbyterian-church",
  "houston-annunciation-catholic-church",
  "waco-st-francis-on-the-brazos",
]);

/** Research ledger after removing churches that cleared the verified inclusion standard. */
export const paintedChurchCandidateCensus: PaintedChurchCensusEntry[] = legacyCensus.filter((entry) => !promoted.has(entry.slug));

export const paintedChurchCandidates = paintedChurchCandidateCensus.filter((entry) => entry.status === "candidate");
export const paintedChurchResearchLeads = paintedChurchCandidateCensus.filter((entry) => entry.status === "research-lead");
export const paintedChurchScopeReviews = paintedChurchCandidateCensus.filter((entry) => entry.status === "scope-review");
export const paintedChurchHistoricLosses = paintedChurchCandidateCensus.filter((entry) => entry.status === "historic-loss");
export const paintedChurchExclusions = paintedChurchCandidateCensus.filter((entry) => entry.status === "excluded");
