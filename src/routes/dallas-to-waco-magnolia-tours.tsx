import { createFileRoute } from "@tanstack/react-router";
import { wacoPageHead } from "@/lib/waco-page-head";

export const Route = createFileRoute("/dallas-to-waco-magnolia-tours")({
  head: () => wacoPageHead("/dallas-to-waco-magnolia-tours", "Dallas to Waco & Magnolia Market: Guided Day Trips Compared", "Plan a guided Dallas-to-Waco Magnolia Market day trip, including the actual Dallas pickup, Dr Pepper Museum admission exclusions, Cottonland Castle access and direct Viator booking links.", "Dallas to Waco tours"),
});
