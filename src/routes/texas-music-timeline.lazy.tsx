import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasMusicTimeline } from "@/components/editorial/TexasMusicTimeline";

export const Route = createLazyFileRoute("/texas-music-timeline")({
  component: TexasMusicTimelinePage,
});

function TexasMusicTimelinePage() {
  return <TexasMusicTimeline />;
}
