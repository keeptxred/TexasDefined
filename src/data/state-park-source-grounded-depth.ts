import type { Destination } from "./types";
import { isTexasStateParkDestination, VERIFIED_PARK_FACILITIES } from "./state-park-authority";

/**
 * Recover older short park dossiers without manufacturing generic SEO copy.
 *
 * A destination is NOT auto-indexed by this curator. It still has to pass
 * the same image, source, coordinates, and editorial gates as every other
 * TexasDefined destination. TPWD research is only used when the original
 * park-specific editorial copy is insufficient.
 *
 * This only appends source-checked facts about that particular park, unlike
 * the generic destination-quality fallback that repeats statewide advice.
 */
export function applyStateParkSourceGroundedDepth(destination: Destination): Destination {
  if (!isTexasStateParkDestination(destination)) return destination;
  const source = VERIFIED_PARK_FACILITIES[destination.slug];
  if (!source || !/^https:\/\/tpwd\.texas\.gov\/state-parks\//.test(source.sourceUrl)) return destination;

  const body = (destination.body ?? []).map((text) => text.trim()).filter(Boolean);
  if (body.length >= 3 && body.join(" ").length >= 450) return destination;

  const candidates = [
    [source.parking, source.access],
    [source.camping, source.restrooms],
    [source.maps],
  ].map((group) => group.filter(Boolean).join(" ").trim())
    .filter((paragraph) => paragraph.length >= 65);

  const extended = [...body];
  const existing = body.join(" ").toLowerCase();
  for (const paragraph of candidates) {
    if (extended.length >= 3 && extended.join(" ").length >= 600) break;
    // Avoid repeating an entire source fact already quoted by older curation.
    if (existing.includes(paragraph.toLowerCase().slice(0, 75))) continue;
    extended.push(paragraph);
  }

  // Do not fabricate readiness when research is still insufficient.
  if (extended.length < 3 || extended.join(" ").length < 450) return destination;
  return { ...destination, body: extended };
}
