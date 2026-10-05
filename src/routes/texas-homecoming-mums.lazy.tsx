import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasHomecomingMumsGuide } from "@/components/editorial/TexasHomecomingMumsGuide";

export const Route = createLazyFileRoute("/texas-homecoming-mums")({
  component: TexasHomecomingMumsGuide,
});
