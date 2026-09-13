import type { LandscapeGuide, LandscapeRecord } from "@/data/texas-landscapes";
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

function auditLandscapeRecord(item: LandscapeRecord): ExploreLeafQualityAudit {
  const words = wordCount([
    item.intro,
    item.where,
    item.terrain,
    item.vegetation,
    item.geology,
    item.water,
    ...item.signature,
    ...item.bestFor,
  ]);
  const reasons: string[] = [];

  if (words < 90) reasons.push(`field-guide copy has only ${words} words; expected at least 90`);
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

export function auditTexasLandscapeItem(item: LandscapeRecord | LandscapeGuide): ExploreLeafQualityAudit {
  return "name" in item ? auditLandscapeRecord(item) : auditLandscapeGuide(item);
}

export function isTexasLandscapeIndexReady(item: LandscapeRecord | LandscapeGuide) {
  return auditTexasLandscapeItem(item).readyForIndexing;
}

export function auditRoute66Stop(stop: TexasRoute66Stop): ExploreLeafQualityAudit {
  const words = wordCount([
    stop.summary,
    stop.routeContext,
    ...stop.highlights,
    ...stop.planning,
  ]);
  const reasons: string[] = [];

  if (words < 110) reasons.push(`stop-specific copy has only ${words} words; expected at least 110`);
  if (stop.sourceLinks.length < 2) reasons.push(`only ${stop.sourceLinks.length} authority source; expected at least 2`);
  if (stop.highlights.length < 3) reasons.push(`only ${stop.highlights.length} stop-specific highlights; expected at least 3`);
  if (stop.planning.length < 3) reasons.push(`only ${stop.planning.length} planning notes; expected at least 3`);

  return { readyForIndexing: reasons.length === 0, wordCount: words, reasons };
}

export function isRoute66StopIndexReady(stop: TexasRoute66Stop) {
  return auditRoute66Stop(stop).readyForIndexing;
}
