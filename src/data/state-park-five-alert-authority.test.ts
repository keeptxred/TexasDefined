import { describe, expect, it } from "vitest";
import { applyFiveParkAuthorityAlerts } from "./state-park-five-alert-authority";
import type { Destination } from "./types";

function park(slug: string): Destination {
  return {
    slug, officialUrl: "https://tpwd.texas.gov/state-parks/" + slug.replace(/-state-park$/, ""),
    body: [], visitorFaqs: [],
  } as unknown as Destination;
}

describe("Lake Mineral Wells source freshness and fire restriction accuracy", () => {
  it("does not present expired August 2026 no-propane guidance as current", () => {
    const updated = applyFiveParkAuthorityAlerts(park("lake-mineral-wells-state-park"));
    const content = [updated.entryNote, ...(updated.body ?? []),
      ...(updated.visitorFaqs ?? []).map(faq => faq.answer)].join(" ");
    expect(updated.sourceCheckedAt).toBe("2026-11-02");
    expect(content).toContain("NO BURN BAN");
    expect(content).toContain("November 2, 2026");
    expect(content).toContain("can change");
    expect(content).toContain("ground fires");
    expect(content).not.toContain("prohibits ALL fires");
    expect(content).not.toContain("containerized cooking stoves such as propane");
    expect((updated.visitorFaqs ?? []).every(faq =>
      faq.sourceUrl === "https://tpwd.texas.gov/state-parks/lake-mineral-wells")).toBe(true);
  });

  it("does not falsely mark other park sources as reviewed November 2", () => {
    const bastrop = applyFiveParkAuthorityAlerts(park("bastrop-state-park"));
    expect(bastrop.sourceCheckedAt).toBe("2026-10-17");
  });
});
