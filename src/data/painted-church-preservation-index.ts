import {
  paintedChurchPreservationEvents as legacyPreservationEvents,
  type PaintedChurchPreservationEvent,
} from "./painted-church-preservation-chronology";
import { paintedChurchPreindexDeepPreservationEvents } from "./painted-church-preservation-preindex-deep";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type { PaintedChurchPreservationEvent, PaintedChurchPreservationEventType } from "./painted-church-preservation-chronology";

/** Canonical preservation read surface. Later evidence layers override by event id. */
export const canonicalPaintedChurchPreservationEvents: PaintedChurchPreservationEvent[] = [
  ...new Map(
    [...legacyPreservationEvents, ...paintedChurchPreindexDeepPreservationEvents]
      .map((event) => [event.id, event]),
  ).values(),
];

export const canonicalPaintedChurchPreservationEventsBySlug = new Map(
  expandedPaintedChurches.map((church) => [
    church.slug,
    canonicalPaintedChurchPreservationEvents
      .filter((event) => event.churchSlug === church.slug)
      .sort((a, b) => a.year - b.year || a.id.localeCompare(b.id)),
  ]),
);

export const canonicalPaintedChurchPreservationChronologyGaps = expandedPaintedChurches
  .filter((church) => !(canonicalPaintedChurchPreservationEventsBySlug.get(church.slug)?.length))
  .map((church) => ({
    slug: church.slug,
    name: church.name,
    city: church.city,
    reason: "No church-specific intervention, disaster, repainting, conservation or stewardship chronology has yet cleared the source standard. This remains a launch blocker under the pre-index authority floor; it is not evidence that the interior was never altered.",
  }));
