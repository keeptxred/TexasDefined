import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/network/example/basic")({
  head: () => ({ meta: [
    { title: "Basic Listing Example | Texas Defined Network" },
    { name: "robots", content: "noindex,nofollow,noarchive" },
  ] }),
});
