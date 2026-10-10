import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/network-listings")({
  head: () => ({ meta: [{ title: "Network Applications | Texas Defined Operations" }, { name: "robots", content: "noindex,nofollow,noarchive" }] }),
});
