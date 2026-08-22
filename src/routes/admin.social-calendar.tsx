import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/social-calendar")({
  head: () => ({ meta: [{ name: "robots", content: "noindex,nofollow" }] }),
});
