import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/editorial-outreach")({
  head: () => ({
    meta: [
      { title: "Backlink Command Center | TexasDefined" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
});
