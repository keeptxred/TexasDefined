import { describe, expect, it } from "vitest";

import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";

describe("Viator affiliate URL builder", () => {
  it("applies the approved TexasDefined attribution defaults and campaign", () => {
    const url = new URL(buildViatorAffiliateUrl("https://www.viator.com/Texas/d296", "texasdefined-test"));

    expect(url.hostname).toBe("www.viator.com");
    expect(url.searchParams.get("pid")).toBe("P00318227");
    expect(url.searchParams.get("mcid")).toBe("42383");
    expect(url.searchParams.get("campaign")).toBe("texasdefined-test");
  });

  it("preserves existing tracking values instead of duplicating them", () => {
    const url = new URL(buildViatorAffiliateUrl("https://www.viator.com/Austin/d5021?pid=existing&mcid=existing-mcid&campaign=existing-campaign", "new-campaign"));

    expect(url.searchParams.getAll("pid")).toEqual(["existing"]);
    expect(url.searchParams.getAll("mcid")).toEqual(["existing-mcid"]);
    expect(url.searchParams.getAll("campaign")).toEqual(["existing-campaign"]);
  });

  it("fails closed to Viator for an untrusted outbound target", () => {
    const url = new URL(buildViatorAffiliateUrl("https://example.com/not-viator", "texasdefined-safe-fallback"));

    expect(url.origin).toBe("https://www.viator.com");
    expect(url.searchParams.get("pid")).toBe("P00318227");
    expect(url.searchParams.get("mcid")).toBe("42383");
  });
});
