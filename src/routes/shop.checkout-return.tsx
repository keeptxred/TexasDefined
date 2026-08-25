import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/checkout-return")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({ meta: [{ title: "Checkout Status | Texas Defined" }, { name: "robots", content: "noindex,nofollow" }] }),
});
