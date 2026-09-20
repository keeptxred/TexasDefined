import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/live-payment-test")({
  validateSearch: (search: Record<string, unknown>) => ({
    run: typeof search.run === "string" ? search.run : undefined,
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Live Payment Verification | Texas Defined" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
