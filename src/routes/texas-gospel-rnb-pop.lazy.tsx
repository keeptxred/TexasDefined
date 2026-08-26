import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";

export const Route = createLazyFileRoute("/texas-gospel-rnb-pop")({ component: GuidePage });

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasEvergreenGuide guide={guide} />;
}
