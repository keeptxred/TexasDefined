import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/network/checkout-return")({
  head: () => ({
    meta: [
      { title: "Membership Application Received | Texas Defined" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
});
