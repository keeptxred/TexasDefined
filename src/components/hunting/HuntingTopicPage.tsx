import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

function HuntingPublicLandDiscovery() {
  return (
    <section className="border-y border-border bg-surface py-14 sm:py-18" aria-labelledby="hunting-public-land-heading">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="eyebrow text-primary">Public-land discovery</p>
        <h2 id="hunting-public-land-heading" className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">Find a Texas Wildlife Management Area.</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Use TexasDefined&apos;s statewide search to find Wildlife Management Area place guides by name, county or nearby town, then confirm current access and hunt rules with TPWD before traveling.</p>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
          <a href="/search?q=Wildlife%20Management%20Area" className="eyebrow border-b border-primary pb-1 text-primary">Search Wildlife Management Areas →</a>
          <a href="/explore/outdoors" className="eyebrow border-b border-primary pb-1 text-primary">Browse Texas outdoors →</a>
        </div>
        <p className="mt-7 max-w-3xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Permit rules vary by area.</strong> Start with <a href="/hunting/annual-public-hunting-permit" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">the Annual Public Hunting Permit guide</a> or return to <a href="/hunting/public-hunting" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas public hunting</a> before choosing a place.</p>
      </div>
    </section>
  );
}

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const showPublicLandDiscovery = topic.slug === "public-hunting" || topic.slug === "annual-public-hunting-permit" || topic.slug === "drawn-hunts";
  return <><HuntingTopicSchema topic={topic} /><HuntingAuthorityTopicPage topic={topic} />{showPublicLandDiscovery ? <HuntingPublicLandDiscovery /> : null}</>;
}