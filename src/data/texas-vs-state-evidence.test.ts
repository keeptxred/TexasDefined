import { describe, expect, it } from "vitest";

import {
  getTexasVsStateEvidence,
  isTexasVsStateEvidenceQualified,
} from "./texas-vs-state-evidence.server";

const promotedStates = ["Georgia", "North Carolina", "Tennessee"] as const;

describe("Texas-vs state evidence qualification", () => {
  it("qualifies the wave-6 states on the review date", () => {
    const reviewDate = new Date("2026-09-05T12:00:00Z");
    for (const state of promotedStates) {
      expect(isTexasVsStateEvidenceQualified(state, reviewDate), state).toBe(true);
    }
  });

  it("requires deep state-specific content, unique FAQs and diverse official sources", () => {
    for (const state of promotedStates) {
      const evidence = getTexasVsStateEvidence(state);
      expect(evidence, state).not.toBeNull();
      expect(evidence!.taxLens.length, `${state}:tax`).toBeGreaterThanOrEqual(180);
      expect(evidence!.housingLens.length, `${state}:housing`).toBeGreaterThanOrEqual(180);
      expect(evidence!.jobsLens.length, `${state}:jobs`).toBeGreaterThanOrEqual(180);
      expect(evidence!.transportationLens.length, `${state}:transportation`).toBeGreaterThanOrEqual(180);
      expect(evidence!.hazardLens.length, `${state}:hazard`).toBeGreaterThanOrEqual(180);
      expect(evidence!.faq.length, `${state}:faq`).toBeGreaterThanOrEqual(3);
      expect(evidence!.sources.length, `${state}:sources`).toBeGreaterThanOrEqual(8);

      const hosts = new Set(evidence!.sources.map((source) => new URL(source.url).hostname.replace(/^www\./, "")));
      expect(hosts.size, `${state}:source-hosts`).toBeGreaterThanOrEqual(6);
      expect(evidence!.sources.every((source) => source.checkedAt === evidence!.lastVerifiedAt), `${state}:checkedAt`).toBe(true);
    }
  });

  it("does not manufacture qualification for an unremediated state", () => {
    expect(getTexasVsStateEvidence("Alabama")).toBeNull();
    expect(isTexasVsStateEvidenceQualified("Alabama", new Date("2026-09-05T12:00:00Z"))).toBe(false);
  });

  it("expires stale evidence instead of leaving a permanent sitemap promotion", () => {
    expect(isTexasVsStateEvidenceQualified("Georgia", new Date("2027-01-04T12:00:00Z"))).toBe(false);
  });
});
