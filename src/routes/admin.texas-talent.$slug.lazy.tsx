import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_TALENT_CATEGORIES, TEXAS_TALENT_TAGLINE } from "@/data/texas-talent";

export const Route = createLazyFileRoute("/admin/texas-talent/$slug")({
  component: TexasTalentProfilePreview,
});

function TexasTalentProfilePreview() {
  const { profile } = Route.useRouteContext();
  const category = TEXAS_TALENT_CATEGORIES.find((item) => item.id === profile.category)?.label ?? profile.category;

  return (
    <main>
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <Link to="/admin/texas-talent" className="eyebrow text-primary">← Texas Talent workbench</Link>
          <div className="mt-5 max-w-5xl">
            <p className="eyebrow text-primary">{category} · Profile draft</p>
            <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">{profile.name}</h1>
            <p className="mt-4 font-display text-2xl italic text-primary sm:text-3xl">{TEXAS_TALENT_TAGLINE}</p>
            <p className="mt-6 max-w-4xl text-base leading-8 text-background/75 sm:text-lg">{profile.dek}</p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article>
            <p className="eyebrow text-primary">The Texas story</p>
            <h2 className="mt-2 font-display text-4xl">Why {profile.name} belongs in Texas Talent</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              {profile.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>

          <aside className="border-t-2 border-foreground pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="eyebrow text-primary">Texas connection</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{profile.texasConnection}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Primary places</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{profile.primaryPlaces.join(" · ")}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Editorial status</p>
            <p className="mt-2 text-sm font-semibold capitalize text-primary">{profile.profileStatus}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Last reviewed</p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.lastReviewedAt}</p>
          </aside>
        </div>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <section>
              <p className="eyebrow text-primary">Defining work</p>
              <h2 className="mt-2 font-display text-4xl">The work people remember</h2>
              <ul className="mt-6 grid gap-3">
                {profile.definingWorks.map((work) => <li key={work} className="border-b border-border pb-3 text-sm font-semibold">{work}</li>)}
              </ul>
            </section>
            <section>
              <p className="eyebrow text-primary">Milestones</p>
              <h2 className="mt-2 font-display text-4xl">Timeline</h2>
              <ol className="mt-6 grid gap-5">
                {profile.timeline.map((item) => (
                  <li key={`${item.year}-${item.event}`} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border pb-4">
                    <span className="font-display text-2xl text-primary">{item.year}</span>
                    <span className="text-sm leading-7 text-muted-foreground">{item.event}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <section>
          <p className="eyebrow text-primary">Texas places</p>
          <h2 className="mt-2 font-display text-4xl">Where the story touches Texas</h2>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {profile.texasPlaces.map((place) => (
              <article key={place.name} className="bg-background p-6">
                <h3 className="font-display text-2xl">{place.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{place.context}</p>
                {place.href ? <a href={place.href} className="mt-4 inline-block text-sm font-semibold text-primary">Open related page →</a> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow text-primary">Legacy</p>
            <h2 className="mt-2 font-display text-4xl">Why the story still matters</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              {profile.legacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">Planned internal links</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.plannedCrossLinks.map((link) => <span key={link} className="border border-border px-3 py-2 text-xs font-semibold">{link}</span>)}
            </div>
          </div>
        </section>
      </Container>

      <section className="border-t border-border bg-foreground text-background">
        <Container className="py-10">
          <p className="eyebrow text-primary">Research record</p>
          <h2 className="mt-2 font-display text-3xl">Sources used for this draft</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {profile.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="border border-background/20 p-4 text-sm font-semibold hover:border-primary hover:text-primary">
                {source.label} ↗
              </a>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-6 text-background/60">This is an internal editorial preview. Public launch still requires final fact-checking, licensed imagery, completed internal links and an explicit index-readiness review.</p>
        </Container>
      </section>
    </main>
  );
}
