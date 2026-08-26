import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_TALENT_CATEGORIES, TEXAS_TALENT_TAGLINE } from "@/data/texas-talent";

export const Route = createLazyFileRoute("/admin/texas-talent/$slug")({
  component: TexasTalentProfilePreview,
});

function TexasTalentProfilePreview() {
  const { profile } = Route.useRouteContext();
  const category = TEXAS_TALENT_CATEGORIES.find((item) => item.id === profile.category)?.label ?? profile.category;
  const readiness = profile.readiness;
  const heroImage = readiness.imageReview.heroImage;
  const launchAssessment = profile.launchAssessment;
  const resolvedInternalLinks = profile.resolvedInternalLinks;
  const reviewedSourceUrls = new Set(readiness.sourceReview.verifiedSources);

  return (
    <main>
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <Link to="/admin/texas-talent" className="eyebrow text-primary">← Texas Talent workbench</Link>
          <div className={`mt-5 grid gap-8 ${heroImage ? "lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end" : "max-w-5xl"}`}>
            <div>
              <p className="eyebrow text-primary">{category} · Profile draft</p>
              <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">{profile.name}</h1>
              <p className="mt-4 font-display text-2xl italic text-primary sm:text-3xl">{TEXAS_TALENT_TAGLINE}</p>
              <p className="mt-6 max-w-4xl text-base leading-8 text-background/75 sm:text-lg">{profile.dek}</p>
            </div>
            {heroImage ? (
              <figure className="overflow-hidden border border-background/20 bg-background/5">
                <img src={heroImage.src} alt={heroImage.alt} className="aspect-[4/5] w-full object-cover" loading="eager" />
                <figcaption className="border-t border-background/20 p-4 text-xs leading-5 text-background/65">
                  <p>{heroImage.credit} · {heroImage.licenseLabel}</p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <a href={heroImage.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary">Commons source ↗</a>
                    {heroImage.licenseUrl ? <a href={heroImage.licenseUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary">License ↗</a> : null}
                  </p>
                </figcaption>
              </figure>
            ) : null}
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
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Launch readiness</p>
            <p className="mt-2 text-sm font-semibold capitalize text-primary">{readiness.launchStatus.replace("-", " ")}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Mechanical gate</p>
            <p className="mt-2 text-sm font-semibold text-primary">{launchAssessment.mechanicalReady ? "Cleared" : "Blocked"}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Last reviewed</p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.lastReviewedAt}</p>
          </aside>
        </div>
      </Container>

      <section className="border-y border-border bg-background">
        <Container className="py-10">
          <p className="eyebrow text-primary">Launch-quality review</p>
          <h2 className="mt-2 font-display text-4xl">What is cleared and what remains</h2>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            <ReviewCard title="Sources" status={readiness.sourceReview.status} note={readiness.sourceReview.note} />
            <ReviewCard title="Image rights" status={readiness.imageReview.status} note={heroImage?.rightsNote ?? "No cleared hero image has been recorded yet."} />
            <ReviewCard title="Internal links" status={readiness.internalLinkReview.status} note={readiness.internalLinkReview.note} />
          </div>
          <div className="mt-6 border border-border bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Mechanical publication gate</p>
                <p className="mt-2 font-display text-3xl text-primary">{launchAssessment.mechanicalReady ? "Cleared" : "Blocked"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Explicit editorial approval</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{launchAssessment.editorialApproved ? "Approved" : "Not approved"}</p>
              </div>
            </div>
            {launchAssessment.blockers.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {launchAssessment.blockers.map((blocker) => (
                  <span key={blocker} className="border border-border bg-background px-3 py-2 text-xs font-semibold capitalize text-muted-foreground">
                    {blocker.replaceAll("-", " ")}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                The profile has cleared the mechanical quality gate, but it still remains unpublished until the launch status is explicitly changed to launch-ready.
              </p>
            )}
          </div>
        </Container>
      </section>

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

        <section className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Legacy</p>
            <h2 className="mt-2 font-display text-4xl">Why the story still matters</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              {profile.legacy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">Internal links</p>
            {resolvedInternalLinks.length ? (
              <div className="mt-4 grid gap-2">
                {resolvedInternalLinks.map((link) => (
                  <a key={link.href} href={link.href} className="border border-border px-4 py-3 text-sm font-semibold text-primary">
                    {link.label} →
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted-foreground">No safe indexable internal destination has been resolved yet.</p>
            )}
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Still planned</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.plannedCrossLinks.map((link) => <span key={link} className="border border-border px-3 py-2 text-xs font-semibold">{link}</span>)}
            </div>
          </div>
        </section>
      </Container>

      <section className="border-t border-border bg-foreground text-background">
        <Container className="py-10">
          <p className="eyebrow text-primary">Research record</p>
          <h2 className="mt-2 font-display text-3xl">Sources used for this draft</h2>
          <p className="mt-3 max-w-3xl text-xs leading-6 text-background/60">
            {readiness.sourceReview.verifiedSources.length} source{readiness.sourceReview.verifiedSources.length === 1 ? "" : "s"} in this record cleared the formal authority review. Other citations remain useful draft support but are not substitutes for the reviewed set.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {profile.sources.map((source) => {
              const reviewed = reviewedSourceUrls.has(source.url);
              return (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="border border-background/20 p-4 text-sm font-semibold hover:border-primary hover:text-primary">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-background/50">
                    {reviewed ? "Reviewed authority" : "Supplemental draft source"}
                  </span>
                  <span className="mt-2 block">{source.label} ↗</span>
                </a>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-6 text-background/60">This is an internal editorial preview. Public launch still requires final fact-checking, completed internal links, a cleared image record and explicit editorial approval.</p>
        </Container>
      </section>
    </main>
  );
}

function ReviewCard({ title, status, note }: { title: string; status: string; note: string }) {
  return (
    <article className="bg-background p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <p className="mt-2 font-display text-2xl capitalize text-primary">{status}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{note}</p>
    </article>
  );
}
