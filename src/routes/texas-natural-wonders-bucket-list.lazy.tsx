import { createLazyFileRoute } from "@tanstack/react-router";

import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { TexasNaturalWondersAuthority } from "@/components/editorial/TexasNaturalWondersAuthority";

export const Route = createLazyFileRoute("/texas-natural-wonders-bucket-list")({
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <>
    <TexasEvergreenGuide guide={guide} />
    <TexasNaturalWondersAuthority />
  </>;
}
