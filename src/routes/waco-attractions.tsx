import { createFileRoute } from "@tanstack/react-router";
import { wacoPageHead } from "@/lib/waco-page-head";

export const Route = createFileRoute("/waco-attractions")({
  head: () => wacoPageHead("/waco-attractions", "Seven Waco Attractions: Full Visitor Guides and Tours", "Seven independent Waco attraction authority guides: Dr Pepper Museum, Cottonland Castle, Suspension Bridge, Cameron Park, Texas Ranger Hall of Fame, McLane Stadium and Cameron Park Zoo.", "Waco attractions"),
});
