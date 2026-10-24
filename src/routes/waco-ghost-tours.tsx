import { createFileRoute } from "@tanstack/react-router";
import { wacoPageHead } from "@/lib/waco-page-head";

export const Route = createFileRoute("/waco-ghost-tours")({
  head: () => wacoPageHead("/waco-ghost-tours", "Waco Ghost Tours: Guided Walk vs. Self-Guided Audio Tour", "Compare Waco guided ghost walks and self-guided haunted audio routes, including the Dr Pepper Museum meeting point, Magnolia Market and Suspension Bridge, with direct booking links.", "Waco ghost tours"),
});
