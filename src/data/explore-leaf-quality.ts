import type { EnrichedLandscapeRecord } from "@/data/texas-landscape-profile-enrichment";
import type { LandscapeGuide } from "@/data/texas-landscapes";
import { enrichTexasRoute66Stop } from "@/data/texas-route-66-enrichment";
import type { TexasRoute66Stop } from "@/data/texas-route-66";

export type ExploreLeafQualityAudit = {
  readyForIndexing: boolean;
  wordCount: number;
  reasons: string[];
};

function wordCount(parts: Array<string | undefined>) {
  return parts
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function auditLandscapeRecord(item: EnrichedLandscapeRecord): ExploreLeafQualityAudit {
  const words = wordCount([
    item.intro,
    item.where,
    item.terrain,
    item.vegetation,
    item.geology,
    item.water,
    ...item.signature,
    ...item.bestFor,
    ...item.fieldNotes.map((note) => `${note.heading} ${note.body}`),
  ]);
  const reasons: string[] = [];

  if (words < 180) reasons.push(`field-guide copy has only ${words} words; expected at least 180`);
  if (item.fieldNotes.length < 2) reasons.push(`only ${item.fieldNotes.length} field notes; expected at least 2`);
  if (item.sourceLinks.length < 2) reasons.push(`only ${item.sourceLinks.length} authority sources; expected at least 2`);
  if (item.signature.length < 5) reasons.push(`only ${item.signature.length} signature features; expected at least 5`);
  if (item.bestFor.length < 5) reasons.push(`only ${item.bestFor.length} trip-use signals; expected at least 5`);
  if (item.related.length < 1) reasons.push("missing a related TexasDefined path");

  return { readyForIndexing: reasons.length === 0, wordCount: words, reasons };
}

function auditLandscapeGuide(item: LandscapeGuide): ExploreLeafQualityAudit {
  const words = wordCount([item.intro, ...item.sections.map((section) => `${section.heading} ${section.body}`)]);
  const reasons: string[] = [];

  if (words < 220) reasons.push(`guide copy has only ${words} words; expected at least 220`);
  if (item.sections.length < 4) reasons.push(`only ${item.sections.length} substantive sections; expected at least 4`);
  if (item.related.length < 2) reasons.push(`only ${item.related.length} related paths; expected at least 2`);

  return { readyForIndexing: reasons.length === 0, wordCount: words, reasons };
}

export function auditTexasLandscapeItem(item: EnrichedLandscapeRecord | LandscapeGuide): ExploreLeafQualityAudit {
  return "name" in item ? auditLandscapeRecord(item) : auditLandscapeGuide(item);
}

export function isTexasLandscapeIndexReady(item: EnrichedLandscapeRecord | LandscapeGuide) {
  return auditTexasLandscapeItem(item).readyForIndexing;
}

export function auditRoute66Stop(stop: TexasRoute66Stop): ExploreLeafQualityAudit {
  const candidate = enrichTexasRoute66Stop(stop);
  const words = wordCount([
    candidate.summary,
    candidate.routeContext,
    ...candidate.highlights,
    ...candidate.planning,
  ]);
  const reasons: string[] = [];

  if (words < 110) reasons.push(`stop-specific copy has only ${words} words; expected at least 110`);
  if (candidate.sourceLinks.length < 2) reasons.push(`only ${candidate.sourceLinks.length} authority source; expected at least 2`);
  if (candidate.highlights.length < 3) reasons.push(`only ${candidate.highlights.length} stop-specific highlights; expected at least 3`);
  if (candidate.planning.length < 3) reasons.push(`only ${candidate.planning.length} planning notes; expected at least 3`);

  return { readyForIndexing: reasons.length === 0, wordCount: words, reasons };
}

export function isRoute66StopIndexReady(stop: TexasRoute66Stop) {
  return auditRoute66Stop(stop).readyForIndexing;
}
