import type { HuntingAuthorityTopic } from "@/data/hunting/authority";

import { HuntingAuthorityTopicPage } from "./HuntingAuthority";
import { HuntingTopicSchema } from "./HuntingSchema";

function HuntingPublicLandDiscovery() {
  return (
    <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="hunting-public-land-heading">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="eyebrow text-primary">Official public-hunt area finder</p>
        <h2 id="hunting-public-land-heading" className="mt-3 max-w-4xl font-display text-3xl leading-tight sm:text-5xl">Find land where hunting is actually authorized.</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Search Texas Parks and Wildlife Department's 2026–27 public-hunt areas by county, unit, region or legal game. A Wildlife Management Area is not automatically open to hunting. A campground, park or wildlife guide is not evidence of permission to hunt.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-primary px-5 py-3 text-primary-foreground hover:opacity-90">Search TPWD hunting areas ↗</a>
          <a href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-border px-5 py-3 hover:border-primary">APH maps &amp; booklet ↗</a>
          <a href="https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-border px-5 py-3 hover:border-primary">Drawn hunts ↗</a>
        </div>
        <ol className="mt-8 grid gap-4 text-sm leading-6 sm:grid-cols-3">
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">1. Select an area and legal game</strong>Not all units offer every species. Some only offer drawn or youth hunts.</li>
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">2. Verify dates and restrictions</strong>Check current area maps, methods, closures, check-in, boundaries and hunt conditions.</li>
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">3. Confirm credentials</strong>Check hunting license, endorsements, hunter education, and any APH, drawing or other permit.</li>
        </ol>
        <p className="mt-7 max-w-4xl text-sm leading-6 text-muted-foreground">The official TPWD search requires JavaScript. Its page also provides a public hunting lands booklet. Read our <a href="/hunting/annual-public-hunting-permit" className="font-semibold underline decoration-primary/40 underline-offset-4">APH guide</a> and <a href="/hunting/public-hunting" className="font-semibold underline decoration-primary/40 underline-offset-4">public hunting guide</a> for context, not as proof of access.</p>
      </div>
    </section>
  );
}

export default function HuntingTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const showPublicLandDiscovery = topic.slug === "public-hunting" || topic.slug === "annual-public-hunting-permit" || topic.slug === "drawn-hunts";
  return <><HuntingTopicSchema topic={topic} /><HuntingAuthorityTopicPage topic={topic} />{showPublicLandDiscovery ? <HuntingPublicLandDiscovery /> : null}</>;
}