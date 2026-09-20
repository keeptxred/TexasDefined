import { createServerFn } from "@tanstack/react-start";

const DEFAULT_COMMERCE_API = "https://keeptxred.com";
const LIVE_TEST_RUN = "td-20260920-8c2e41";
const TEXAS_DEFINED_ORIGIN = "https://texasdefined.com";

export type TexasDefinedLivePaymentTestResult = {
  ok?: boolean;
  found?: boolean;
  paid?: boolean;
  webhookReceived?: boolean;
  amountTotal?: number | null;
  currency?: string | null;
  status?: string | null;
  paymentStatus?: string | null;
  url?: string;
  error?: string;
};

type LivePaymentTestInput =
  | { action: "status"; run: string; sessionId?: string }
  | { action: "start"; run: string };

const livePaymentTestServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: LivePaymentTestInput) => data)
  .handler(async ({ data }): Promise<TexasDefinedLivePaymentTestResult> => {
    if (data.run !== LIVE_TEST_RUN) {
      return { ok: false, error: "Live test link is invalid or expired" };
    }

    const base = (process.env["COMMERCE_API_BASE_URL"] || DEFAULT_COMMERCE_API).replace(/\/$/, "");
    const target = new URL("/api/public/payments/live-test", base);
    target.searchParams.set("site", "texasdefined");
    target.searchParams.set("run", LIVE_TEST_RUN);

    const commonHeaders = {
      accept: "application/json",
      origin: TEXAS_DEFINED_ORIGIN,
    };

    try {
      const upstream = data.action === "start"
        ? await fetch(target, {
            method: "POST",
            headers: {
              ...commonHeaders,
              "content-type": "application/json",
            },
            body: JSON.stringify({ site: "texasdefined", run: LIVE_TEST_RUN }),
            signal: AbortSignal.timeout(15000),
          })
        : await (async () => {
            if (data.sessionId) target.searchParams.set("session_id", data.sessionId);
            return fetch(target, {
              headers: commonHeaders,
              signal: AbortSignal.timeout(15000),
              cache: "no-store",
            });
          })();

      const text = await upstream.text();
      let payload: TexasDefinedLivePaymentTestResult;
      try {
        payload = JSON.parse(text) as TexasDefinedLivePaymentTestResult;
      } catch {
        return {
          ok: false,
          error: `Shared commerce backend returned a non-JSON response (${upstream.status})`,
        };
      }

      if (!upstream.ok) {
        return {
          ok: false,
          error: payload.error || `Shared commerce backend unavailable (${upstream.status})`,
        };
      }
      return payload;
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Shared commerce backend unavailable",
      };
    }
  });

export function runTexasDefinedLivePaymentTest(
  input: LivePaymentTestInput,
): Promise<TexasDefinedLivePaymentTestResult> {
  return livePaymentTestServerFn({ data: input });
}
