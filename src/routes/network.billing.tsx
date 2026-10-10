import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/network/billing")({
  head: () => ({
    meta: [
      { title: "Manage Your Network Membership | Texas Defined" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
});
