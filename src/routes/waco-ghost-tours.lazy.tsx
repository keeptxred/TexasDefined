import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { WacoViatorExperienceCards } from "@/components/monetization/WacoViatorExperienceCards";

const path = "/waco-ghost-tours";
const description = "Compare Waco guided ghost walks and self-guided haunted audio routes, including the Dr Pepper Museum meeting point, Magnolia Market and Suspension Bridge, with direct booking links.";
const sourceCheckedAt = "2026-10-20";
const sources = [
  { label: "Live guided ghost walking tour", href: "https://www.viator.com/tours/Waco/Waco-Ghosts/d50076-455209P1" },
  { label: "Self-guided haunted walking tour", href: "https://www.viator.com/tours/Waco/Haunted-Private-App-Guided-Ghost-Walking-Tour-in-Waco/d50076-222222P107" },
  { label: "Waco Suspension Bridge — City of Waco", href: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area" },
];

export const Route = createLazyFileRoute("/waco-ghost-tours")({ component: WacoGhostToursPage });

function WacoGhostToursPage() {
  return (
    <main>
      <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-wider text-muted-foreground">
          <a href="/" className="underline underline-offset-4">TexasDefined</a> / Waco ghost tours
        </nav>
        <header className="max-w-5xl py-10">
          <p className="eyebrow text-primary">Waco, Texas · After-dark history & local lore</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">Waco ghost tours: which experience should you book?</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
            Two very different products can turn downtown Waco into an evening walk: one has a live storyteller and a set meeting point;
            the other is a self-paced audio route controlled from your phone. Compare them before booking rather than assuming every “ghost tour” comes with a guide.
          </p>
        </header>

        <section className="grid gap-8 border-y border-border py-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Choose a guided ghost walk</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Wild Whispers of the Wicked advertises a roughly one-hour walking tour led by a person. Meet outside the Dr Pepper Museum,
              then move among historic downtown landmarks as the guide shares locally told legends. It is an outdoor storytelling
              experience, not an investigation inside the museum or other buildings.
            </p>
            <p className="mt-4 text-sm leading-7"><strong>Best fit:</strong> Travelers who want a live guide, group atmosphere and the chance to hear the stories narrated in person.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Choose the self-guided app</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The Haunted Private App-Guided tour is not a private human-led experience. It begins at Magnolia Market
              at the Silos, heads through downtown Waco and ends at the Suspension Bridge. Expect roughly 70–90
              minutes plus optional stops. Bring a charged phone, headphones if useful, and review the app-access instructions.
            </p>
            <p className="mt-4 text-sm leading-7"><strong>Best fit:</strong> Visitors who prefer flexible timing and walking without a tour group.</p>
          </div>
        </section>

        <WacoViatorExperienceCards kind="ghost" title="Compare the two bookable Waco ghost experiences" />

        <section className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Know the difference between history and ghost stories</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Waco's Dr Pepper Museum, ALICO Building, Hippodrome and Suspension Bridge are real landmarks with documented histories.
              Ghost stories and supernatural claims are folklore and tour entertainment, not independently verified historical facts.
              Both product routes use city sidewalks and exterior stops rather than granting admission to museum interiors.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              If visiting after dark, check weather and downtown street conditions, wear comfortable shoes, use designated pedestrian routes
              and verify your product's meeting or starting location. The guide-led experience and self-paced app do not begin at the same place.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Pair your tour with an authoritative Waco guide</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li><a className="text-primary underline underline-offset-4" href="/destination/dr-pepper-museum-waco">Dr Pepper Museum visitor and history guide →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/destination/waco-suspension-bridge">Waco Suspension Bridge and riverfront →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/destination/cameron-park-waco">Cameron Park: trails and history →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/county/mclennan">McLennan County and Waco attractions →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/dallas-to-waco-magnolia-tours">Dallas-to-Waco Magnolia day-trip guide →</a></li>
            </ul>
          </div>
        </section>

        <p className="mt-8 text-sm leading-7 text-muted-foreground">Compare locally researched stops in the <a href="/waco-attractions" className="font-semibold text-primary underline underline-offset-4">Waco attractions and visitor guide</a>, with independent museum, food, and family itinerary information.</p>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Before you book</h2>
          <dl className="mt-6 grid gap-6 md:grid-cols-2">
            <div><dt className="font-semibold">Does either tour include Dr Pepper Museum admission?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">No. The guided walk meets outside and the app route passes by the museum; purchase museum admission separately through the museum.</dd></div>
            <div><dt className="font-semibold">Does “private app tour” mean a live guide?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">No. This product is a smartphone-led route completed on your own schedule.</dd></div>
            <div><dt className="font-semibold">Are supernatural claims verified?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">No. The stories are folklore and entertainment layered onto real downtown places.</dd></div>
            <div><dt className="font-semibold">Where can I check price and cancellation terms?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">Use the specific Viator listing and check the details for your selected date and traveler count before checkout.</dd></div>
          </dl>
        </section>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-2xl">Sources and review</h2>
          <p className="mt-2 text-sm text-muted-foreground">Reviewed October 20, 2026. Supplier itineraries can change, and original municipal and museum sites govern actual public access.</p>
          <ul className="mt-4 space-y-2 text-sm">
            {sources.map((source) => <li key={source.href}><a className="text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}
          </ul>
        </section>
      </Container>
    </main>
  );
}
