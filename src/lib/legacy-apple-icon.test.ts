import { describe, expect, it } from "vitest";
import { legacyAppleIconRedirect } from "./legacy-apple-icon";

describe("Apple precomposed touch icon legacy path", () => {
  it("301 redirects only the old filename to a real existing same-origin PNG", () => {
    const response = legacyAppleIconRedirect(new Request("https://texasdefined.com/apple-touch-icon-precomposed.png"));
    expect(response?.status).toBe(301);
    expect(response?.headers.get("Location")).toBe("https://texasdefined.com/apple-touch-icon.png");
    expect(response?.headers.get("Cache-Control")).toContain("max-age=86400");
    expect(legacyAppleIconRedirect(new Request("https://texasdefined.com/apple-touch-icon.png"))).toBeNull();
  });
  it("preserves method protection for unexpected writes", () => {
    const response = legacyAppleIconRedirect(new Request("https://texasdefined.com/apple-touch-icon-precomposed.png", {method:"POST"}));
    expect(response?.status).toBe(405);
    expect(response?.headers.get("Allow")).toBe("GET, HEAD");
  });
});
