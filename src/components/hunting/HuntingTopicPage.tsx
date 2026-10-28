import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

function HuntingPublicLandDiscovery() {
  return <section className="border-y border-border bg-surface py-12 md:py-16" aria-labelledby="hunting-public-land-heading">
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <p className="eyebrow text-primary">Official public hunting areas</p>
      <h2 id="hunting-public-land-heading" className="mt-3 font-display text-3xl md:text-4xl">Search areas where hunting is permitted</h2>
      <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">Use TPWD's Area/Legal Game Search to locate authorized hunts by unit, county, region and game. A conservation area, nearby campground or general statewide place-search result is not evidence of legal hunting access.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" target="_blank" rel="noopener noreferrer">TPWD public hunting area and legal game search ↗</a>
        <a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/" target="_blank" rel="noopener noreferrer">APH maps and booklet ↗</a>
        <a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/" target="_blank" rel="noopener noreferrer">Drawn hunts ↗</a>
        <a className="font-semibold text-primary underline decoration-primary/40 underline-offset-4" href="/explore/outdoors">Explore other outdoors destinations</a>
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Confirm the exact area's legal game, dates, map, boundaries, license, endorsements, hunter education and required APH, drawn or other permit. Read our <a className="font-semibold text-primary underline" href="/hunting/annual-public-hunting-permit">APH guide</a> or <a className="font-semibold text-primary underline" href="/hunting/public-hunting">public hunting guide</a> for explanations. TPWD's search requires JavaScript and offers a map booklet alternative.</p>
    </div>
  </section>;
}

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const showPublicLandDiscovery = topic.slug === "public-hunting" || topic.slug === "annual-public-hunting-permit" || topic.slug === "drawn-hunts";
  return <><HuntingTopicSchema topic={topic} /><HuntingAuthorityTopicPage topic={topic} />{showPublicLandDiscovery ? <HuntingPublicLandDiscovery /> : null}</>;
}