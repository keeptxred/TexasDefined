import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { WACO_VIATOR_ATTRACTIONS } from "@/data/waco-viator-attraction-links";

const path = "/waco-attractions";
const description = "Seven independent Waco attraction authority guides: Dr Pepper Museum, Cottonland Castle, Suspension Bridge, Cameron Park, Texas Ranger Hall of Fame, McLane Stadium and Cameron Park Zoo.";
const guideNotes: Readonly<Record<string, { bestFor: string; entry: string; timing: string; tip: string }>> = {
  "dr-pepper-museum-waco": {
    bestFor: "Industrial, drink and advertising history",
    entry: "Paid museum general admission purchased on arrival",
    timing: "Allow 1–2 hours",
    tip: "Regular admission covers two historic buildings and a fountain drink; special programs cost extra.",
  },
  "cottonland-castle": {
    bestFor: "Architecture, restoration and Fixer Upper",
    entry: "Official Magnolia Castle Tour reservation required for interior access",
    timing: "About 1 hour for a booked tour",
    tip: "This is a private residential-area property, not an open-to-all sightseeing stop.",
  },
  "waco-suspension-bridge": {
    bestFor: "Brazos River, engineering and cattle-drive history",
    entry: "Public pedestrian landmark; no general admission",
    timing: "20–40 minutes plus Riverwalk time",
    tip: "Pair the bridge with Indian Spring Park and the Branding the Brazos sculptures.",
  },
  "cameron-park-waco": {
    bestFor: "Hiking, bluff overlooks and family recreation",
    entry: "Free municipal park; zoo admission is separate",
    timing: "45 minutes to half a day",
    tip: "Pick a specific destination such as Lovers Leap or Pecan Bottoms; trails vary in difficulty.",
  },
  "texas-ranger-hall-of-fame-museum-waco": {
    bestFor: "Texas law-enforcement history and archives",
    entry: "Paid public museum; research center has separate weekday arrangements",
    timing: "About 2 hours",
    tip: "The historic interpretation is more extensive than a Hall of Fame alone; parking is usually free.",
  },
  "mclane-stadium": {
    bestFor: "Baylor football and the Brazos River campus",
    entry: "Event tickets and any tours controlled by Baylor",
    timing: "Plan around the specific event",
    tip: "Parking, entry gates, accessible arrival and stroller handling depend on current Baylor policies.",
  },
  "cameron-park-zoo": {
    bestFor: "Wildlife, natural-habitat exhibits and families",
    entry: "Separate paid zoo admission; official online tickets",
    timing: "Around 2–3 hours",
    tip: "This is a ticketed zoo within the larger free park; bring water and check seasonal conditions.",
  },
};

export const Route = createLazyFileRoute("/waco-attractions")({ component: WacoAttractionsAuthorityDirectory });

function WacoAttractionsAuthorityDirectory() {
  return (
    <main>
      <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-wider text-muted-foreground">
          <a href="/" className="underline underline-offset-4">TexasDefined</a> / Waco attractions
        </nav>
        <header className="max-w-5xl py-10">
          <p className="eyebrow text-primary">Waco · McLennan County · Brazos River</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">Seven Waco attractions worth knowing before you go</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            These are not seven interchangeable tickets. Some are free outdoor landmarks; some are museums with on-site admission;
            Cottonland Castle has reservation-only interior access; McLane Stadium is primarily an event venue.
            Explore our individual, source-backed authority guides for the history, hours, access rules and nearby stops at each.
          </p>
        </header>

        <section aria-labelledby="waco-seven-guides">
          <h2 id="waco-seven-guides" className="font-display text-4xl">Individual attraction guides</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {WACO_VIATOR_ATTRACTIONS.map((item) => {
              const note = guideNotes[item.slug];
              return (
                <article key={item.slug} className="border border-border p-6">
                  <p className="eyebrow text-primary">{note.bestFor}</p>
                  <h3 className="mt-2 font-display text-3xl">{item.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm leading-6">
                    <div><dt className="font-semibold">Access</dt><dd className="text-muted-foreground">{note.entry}</dd></div>
                    <div><dt className="font-semibold">Suggested time</dt><dd className="text-muted-foreground">{note.timing}</dd></div>
                  </dl>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{note.tip}</p>
                  <a href={item.href} className="mt-5 inline-block border-b border-primary pb-1 font-semibold text-primary">Read the complete {item.name} visitor and history guide →</a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-4xl">How to combine these attractions</h2>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            <article className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl">Downtown history</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Visit the Dr Pepper Museum, explore Magnolia Market at the Silos, then walk to the Suspension Bridge and riverfront. Museum admission, shopping and any guided experiences are independent choices.</p>
            </article>
            <article className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl">Families and outdoors</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Spend the morning at Cameron Park Zoo, then choose a short park overlook or shaded family recreation stop. Avoid long strenuous trails in summer heat.</p>
            </article>
            <article className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl">Sports and state history</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Combine the Texas Ranger Hall of Fame with the Baylor riverfront and McLane Stadium area. Event entry requires Baylor tickets; daytime museum visits use their own schedules.</p>
            </article>
          </div>
        </section>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Where Viator fits—and where it does not</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
            Viator attraction pages describe landmarks and may list nearby tours; they are not proof that museum or castle admission is included.
            We provide direct affiliate-supported booking comparisons where there is a specific bookable product, separately from the attraction's official access information.
            Read product inclusions, current date availability, pickup rules and cancellation terms before reserving.
          </p>
          <nav className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold" aria-label="Waco tour guides">
            <a href="/waco-ghost-tours" className="text-primary underline underline-offset-4">Guided vs. self-guided Waco ghost walks →</a>
            <a href="/dallas-to-waco-magnolia-tours" className="text-primary underline underline-offset-4">Dallas-to-Waco Magnolia day trips →</a>
            <a href="/article/chip-and-joanna-gaines-magnolia-waco" className="text-primary underline underline-offset-4">Chip and Joanna's Waco story →</a>
            <a href="/county/mclennan" className="text-primary underline underline-offset-4">McLennan County visitor guide →</a>
          </nav>
        </section>
        <p className="mt-10 text-xs leading-6 text-muted-foreground">TexasDefined publishes independent editorial visitor guides. Information last reviewed October 20, 2026; official operators control hours, access rules, and ticket availability. Affiliate booking information is separate from editorial assessment.</p>
      </Container>
    </main>
  );
}
