import { describe, expect, it } from "vitest";

import {
  MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS,
  MINIMUM_INDEXABLE_TOURNAMENT_ITEMS,
  buildTournamentCollectionIndexabilityNote,
  shouldIndexEvergreenEventCollection,
  shouldIndexTournamentCollection,
} from "./event-collection-indexability";

describe("event collection indexability", () => {
  it("opens evergreen collections only at the substantive three-guide threshold", () => {
    expect(MINIMUM_INDEXABLE_EVERGREEN_EVENT_ITEMS).toBe(3);
    expect(shouldIndexEvergreenEventCollection(2)).toBe(false);
    expect(shouldIndexEvergreenEventCollection(3)).toBe(true);
  });

  it("opens tournament collections only at five entries", () => {
    expect(MINIMUM_INDEXABLE_TOURNAMENT_ITEMS).toBe(5);
    expect(shouldIndexTournamentCollection(4)).toBe(false);
    expect(shouldIndexTournamentCollection(5)).toBe(true);
  });

  it("does not describe a thin tournament collection as indexable", () => {
    const note = buildTournamentCollectionIndexabilityNote(4, 1, false);
    expect(note).toContain("temporarily noindex");
    expect(note).toContain("only 4 entries");
    expect(note).toContain("at least 5 entries");
    expect(note).toContain("1 entry currently links");
    expect(note).not.toContain("This collection is indexable");
  });

  it("retains the substantive-directory note when the threshold is met", () => {
    const note = buildTournamentCollectionIndexabilityNote(5, 2, true);
    expect(note).toContain("This collection is indexable as a substantive discovery directory");
    expect(note).toContain("2 entries currently link");
    expect(note).not.toContain("temporarily noindex");
  });
});
