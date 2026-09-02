import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  return (
    <>
      <HuntingTopicSchema topic={topic} />
      <HuntingAuthorityTopicPage topic={topic} />
    </>
  );
}
