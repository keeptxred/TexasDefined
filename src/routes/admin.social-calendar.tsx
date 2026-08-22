import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/social-calendar")({
  head: () => ({ meta: [
    { title: "Social calendar | TexasDefined" },
    { name: "robots", content: "noindex,nofollow" },
  ] }),
});
