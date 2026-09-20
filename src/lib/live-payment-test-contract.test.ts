import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const route = readFileSync(new URL("../routes/shop.live-payment-test.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../routes/shop.live-payment-test.lazy.tsx", import.meta.url), "utf8");

describe("Texas Defined one-shot live payment verification", () => {
  it("keeps the route private from search", () => {
    expect(route).toContain('noindex,nofollow');
  });

  it("uses the Texas Defined diagnostic run and shared commerce endpoint", () => {
    expect(page).toContain('td-20260920-8c2e41');
    expect(page).toContain('site: "texasdefined"');
    expect(page).toContain('/api/public/payments/live-test');
  });

  it("requires both paid status and webhook receipt before reporting success", () => {
    expect(page).toContain('status?.paid && status?.webhookReceived');
    expect(page).toContain('Printify fulfillment was intentionally suppressed');
  });

  it("recovers an existing diagnostic payment when the return URL is lost", () => {
    expect(page).toContain('if (!validRun) return');
    expect(page).toContain('if (session_id) url.searchParams.set("session_id", session_id)');
    expect(page).toContain('payload.found === false');
    expect(page).toContain('No existing Texas Defined diagnostic payment found');
  });
});
