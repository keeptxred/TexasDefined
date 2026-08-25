import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import {
  TEXAS_TALENT_CATEGORIES,
  TEXAS_TALENT_ELIGIBILITY_RULES,
  TEXAS_TALENT_LAUNCH_ROSTER,
  TEXAS_TALENT_PROFILE_REQUIREMENTS,
  TEXAS_TALENT_TAGLINE,
  getTexasTalentByCategory,
} from "@/data/texas-talent";

export const Route = createLazyFileRoute("/admin/texas-talent")({
  component: TexasTalentPage,
});

function TexasTalentPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-14 sm:py-20 lg:py-24">
          <p className="eyebrow text-primary">New Texas Defined pillar · Preview</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">Texas Talent</h1>
              <p className="mt-4 font-display text-3xl italic text-primary sm:text-4xl">{TEXAS_TALENT_TAGLINE}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-background/75 sm:text-lg">
                Musicians, actors, filmmakers, writers, artists and performers whose Texas stories helped shape their work — and whose work carried some of Texas into the wider world.
              </p>
            </div>
            <div className="border-l border-background/20 pl-6 text-sm leading-7 text-background/70">
              <p className="font-semibold text-background">Built as an authority cluster, not a celebrity directory.</p>
              <p className="mt-2">Every future profile must explain the Texas connection, show the places behind the story and connect back into the wider Texas Defined knowledge network.</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="talent-categories">
          <p className="eyebrow text-primary">The collection</p>
          <h2 id="talent-categories" className="mt-2 font-display text-4xl sm:text-5xl">Five ways Texas talent reaches the world</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {TEXAS_TALENT_CATEGORIES.map((category) => {
              const count = getTexasTalentByCategory(category.id).length;
              return (
                <article key={category.id} className="bg-background p-6 sm:p-7">
                  <p className="eyebrow text-primary">{count} launch profiles planned</p>
                  <h3 className="mt-2 font-display text-3xl">{category.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)]">
            <section aria-labelledby="profile-standard">
              <p className="eyebrow text-primary">Editorial standard</p>
              <h2 id="profile-standard" className="mt-2 font-display text-4xl">What every profile must earn</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                A Texas Talent page should answer a question generic biographies usually skip: what did Texas contribute to this person's story, and where can a reader see that connection for themselves?
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {TEXAS_TALENT_PROFILE_REQUIREMENTS.map((requirement) => (
                  <div key={requirement} className="border border-border bg-background p-4 text-sm font-semibold leading-6">
                    {requirement}
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="eligibility-rules" className="border-t-2 border-foreground pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="eyebrow text-primary">Who belongs here?</p>
              <h2 id="eligibility-rules" className="mt-2 font-display text-3xl">Texas connection rules</h2>
              <ol className="mt-5 grid gap-4">
                {TEXAS_TALENT_ELIGIBILITY_RULES.map((rule, index) => (
                  <li key={rule} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="font-display text-2xl text-primary">{index + 1}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="launch-roster">
          <div className="max-w-4xl">
            <p className="eyebrow text-primary">Founding class</p>
            <h2 id="launch-roster" className="mt-2 font-display text-4xl sm:text-5xl">The first {TEXAS_TALENT_LAUNCH_ROSTER.length} stories to research</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              These are editorial candidates, not published profile pages. Each stays in planning until the biography, source set, image rights and Texas cross-linking meet the standard above.
            </p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {TEXAS_TALENT_LAUNCH_ROSTER.map((person) => (
              <article key={person.slug} className="bg-background p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-primary">{labelCategory(person.category)}</p>
                    <h3 className="mt-2 font-display text-3xl">{person.name}</h3>
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {person.profileStatus}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{person.texasConnection}</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">Texas places</p>
                  <p className="mt-2 text-sm text-muted-foreground">{person.primaryPlaces.join(" · ")}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">Planned cross-links</p>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{person.plannedCrossLinks.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>

      <section className="border-t border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
            <div>
              <p className="eyebrow text-primary">Relationship model</p>
              <h2 className="mt-2 font-display text-4xl">Profiles should strengthen the rest of Texas Defined.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">
                A musician from Lubbock should help readers reach Lubbock, Lubbock County and Texas music history. A San Antonio filmmaker should connect into Bexar County, the city, historic venues and related cultural guides. Those pages should eventually link back through restrained “Texas Talent from here” modules.
              </p>
            </div>
            <div className="border border-background/20 p-6">
              <p className="font-display text-2xl">Profile → Place → Story → Profile</p>
              <p className="mt-3 text-sm leading-7 text-background/65">The pillar is designed to become part of the site's knowledge graph rather than a disconnected set of biographies.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function labelCategory(category: (typeof TEXAS_TALENT_LAUNCH_ROSTER)[number]["category"]) {
  return TEXAS_TALENT_CATEGORIES.find((item) => item.id === category)?.label ?? category;
}
