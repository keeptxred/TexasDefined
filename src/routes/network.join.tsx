import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/network/join")({
  head: () => ({
    meta: [
      { title: "Join the Texas Defined Network | Texas Defined" },
      { name: "description", content: "Join the Texas Defined Network. Explore free and enhanced profiles for Texas organizations." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
