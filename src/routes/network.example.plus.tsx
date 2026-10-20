import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/network/example/plus")({
  head: () => ({ meta: [
    { title: "Plus Listing Example | Texas Defined Network" },
    { name: "robots", content: "noindex,nofollow,noarchive" },
  ] }),
});
