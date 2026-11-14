import { createFileRoute } from "@tanstack/react-router";

// Keep canonical and JSON-LD SEO data on both SSR and client navigation without eagerly
// embedding three long head payloads in the universal route registry.
export const Route = createFileRoute("/waco-ghost-tours")({
  loader: async () => (await import("@/lib/waco-page-head")).wacoPageHead("/waco-ghost-tours"),
  head: ({ loaderData }) => loaderData,
});
