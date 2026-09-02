import { lazy, Suspense } from "react";

import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

const HuntingPublicLandDiscovery = lazy(() => import("./HuntingPublicLandDiscovery"));
const PUBLIC_LAND_DISCOVERY_TOPICS = new Set(["public-hunting", "annual-public-hunting-permit", "drawn-hunts"]);

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const showPublicLandDiscovery = PUBLIC_LAND_DISCOVERY_TOPICS.has(topic.slug);
  return (
    <>
      <HuntingTopicSchema topic={topic} />
      <HuntingAuthorityTopicPage topic={topic} />
      {showPublicLandDiscovery ? <Suspense fallback={null}><HuntingPublicLandDiscovery /></Suspense> : null}
    </>
  );
}
