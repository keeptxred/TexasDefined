import { lazy, Suspense } from "react";
import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

const HuntingPublicLandDiscovery = lazy(() => import("./HuntingPublicLandDiscovery"));

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const showPublicLandDiscovery = topic.slug === "public-hunting" || topic.slug === "annual-public-hunting-permit" || topic.slug === "drawn-hunts";
  return (
    <>
      <HuntingTopicSchema topic={topic} />
      <HuntingAuthorityTopicPage topic={topic} />
      {showPublicLandDiscovery ? <Suspense fallback={null}><HuntingPublicLandDiscovery /></Suspense> : null}
    </>
  );
}
