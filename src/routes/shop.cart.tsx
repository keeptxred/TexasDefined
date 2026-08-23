import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/cart")({
  head: () => ({ meta: [{ title: "Your Bag | Texas Defined Shop" }, { name: "robots", content: "noindex,follow" }] }),
});
