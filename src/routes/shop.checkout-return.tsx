import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/checkout-return")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({ links: [{ rel: "canonical", href: "https://texasdefined.com/shop/checkout-return" }], meta: [{ title: "Checkout Status | Texas Defined" }, { name: "referrer", content: "no-referrer" }, { name: "robots", content: "noindex,nofollow" }] }),
});
