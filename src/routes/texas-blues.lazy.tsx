import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";

export const Route = createLazyFileRoute("/texas-blues")({ component: GuidePage });

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasEvergreenGuide guide={guide} />;
}
