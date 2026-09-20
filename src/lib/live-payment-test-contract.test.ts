import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const route = readFileSync(new URL("../routes/shop.live-payment-test.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../routes/shop.live-payment-test.lazy.tsx", import.meta.url), "utf8");
const serverFn = readFileSync(new URL("../data/live-payment-test.functions.ts", import.meta.url), "utf8");

describe("Texas Defined one-shot live payment verification", () => {
  it("keeps the route private from search", () => {
    expect(route).toContain('noindex,nofollow');
  });

  it("uses the Texas Defined diagnostic run through a same-origin server function", () => {
    expect(page).toContain('td-20260920-8c2e41');
    expect(page).toContain('runTexasDefinedLivePaymentTest');
    expect(page).not.toContain('commerceApiBase()');
    expect(serverFn).toContain('new URL("/api/public/payments/live-test", base)');
    expect(serverFn).toContain('target.searchParams.set("site", "texasdefined")');
    expect(serverFn).toContain('origin: TEXAS_DEFINED_ORIGIN');
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


describe("Texas Defined live payment proxy security", () => {
  it("only permits the fixed one-shot run and never accepts an arbitrary upstream URL", () => {
    expect(serverFn).toContain('data.run !== LIVE_TEST_RUN');
    expect(serverFn).toContain('const DEFAULT_COMMERCE_API = "https://keeptxred.com"');
    expect(serverFn).not.toContain('data.url');
  });

  it("uses server-side timeouts for both status and checkout creation", () => {
    expect(serverFn.match(/AbortSignal\.timeout\(15000\)/g)?.length).toBe(2);
  });
});
