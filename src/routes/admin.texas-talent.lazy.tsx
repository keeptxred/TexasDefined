import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import {
  TEXAS_TALENT_CATEGORIES,
  TEXAS_TALENT_ELIGIBILITY_RULES,
  TEXAS_TALENT_PROFILE_REQUIREMENTS,
  TEXAS_TALENT_TAGLINE,
} from "@/data/texas-talent";

export const Route = createLazyFileRoute("/admin/texas-talent")({
  component: TexasTalentPage,
});

function TexasTalentPage() {
  const { profiles, launchAudit } = Route.useRouteContext();
  const mechanicallyReadySlugs = new Set(
    launchAudit.assessments
      .filter((assessment) => assessment.mechanicalReady && !assessment.editorialApproved)
      .map((assessment) => assessment.slug),
  );
  const mechanicallyReadyProfiles = profiles.filter((profile) => mechanicallyReadySlugs.has(profile.slug));
  const categorySeed = TEXAS_TALENT_CATEGORIES.flatMap((category) =>
    mechanicallyReadyProfiles.filter((profile) => profile.category === category.id).slice(0, 2),
  );
  const reviewCohort = [
    ...new Map(
      [...categorySeed, ...mechanicallyReadyProfiles].map((profile) => [profile.slug, profile] as const),
    ).values(),
  ].slice(0, 12);

  return (
    <main>
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-14 sm:py-20 lg:py-24">
          <p className="eyebrow text-primary">New Texas Defined pillar · Internal preview</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">Texas Talent</h1>
              <p className="mt-4 font-display text-3xl italic text-primary sm:text-4xl">{TEXAS_TALENT_TAGLINE}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-background/75 sm:text-lg">
                Musicians, actors, filmmakers, writers, artists and performers whose Texas stories helped shape their work — and whose work carried some of Texas into the wider world.
              </p>
            </div>
            <div className="border-l border-background/20 pl-6 text-sm leading-7 text-background/70">
              <p className="font-semibold text-background">{profiles.length} profile pages now in the workbench.</p>
              <p className="mt-2">Every page remains internal and noindex until fact-checking, image rights, internal links and explicit editorial approval meet the public-launch standard.</p>
            </div>
          </div>

          <figure className="mt-10 overflow-hidden border border-background/20 bg-background/5 shadow-2xl shadow-black/20">
            <img
              src="/images/editorial/texas-talent-hero.webp"
              alt="Illustrated Texas Talent banner celebrating Texas musicians, actors, filmmakers, writers, artists and performers"
              width={1800}
              height={720}
              className="aspect-[5/2] w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="border-t border-background/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-background/50 sm:px-5">
              Approved Texas Talent visual direction · internal preview
            </figcaption>
          </figure>
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        <section aria-labelledby="launch-audit">
          <p className="eyebrow text-primary">Launch audit</p>
          <h2 id="launch-audit" className="mt-2 font-display text-4xl">A hard gate between drafts and publication</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            Mechanical readiness and editorial approval are separate. The workbench now mechanically certifies a link set only while every stored link still resolves through the current indexable Texas Defined graph. That derived certification can clear a mechanical blocker, but it never changes stored editorial approval or makes a profile publishable.
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Profiles tracked" value={launchAudit.totalProfiles} />
            <Metric label="Mechanically ready now" value={launchAudit.mechanicallyReady} />
            <Metric label="Editorially approved" value={launchAudit.editorialApproved} />
            <Metric label="Publishable now" value={launchAudit.publishable} />
          </div>
          <div className="mt-px grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            <Metric label="Stored mechanically ready" value={launchAudit.storedMechanicallyReady} />
            <Metric label="Current graph link-certified" value={launchAudit.mechanicallyLinkCertified} />
            <Metric label="Stored reviews eligible" value={launchAudit.linkCertificationCandidates} />
            <Metric label="Unsafe recorded-link sets" value={launchAudit.profilesWithUnsafeRecordedLinks} />
            <Metric label="Profiles with no safe links" value={launchAudit.profilesWithNoSafeLinks} />
          </div>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            Mechanical link certification is deliberately reversible: if a destination stops meeting indexability rules, the derived review is demoted again. Profiles whose stored link review is still pending are never auto-certified. Publication continues to use the conservative stored readiness record plus explicit launch approval.
          </p>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="review-cohort" className="border-t border-border pt-10">
          <p className="eyebrow text-primary">Next editorial pass</p>
          <h2 id="review-cohort" className="mt-2 font-display text-4xl sm:text-5xl">Mechanically cleared review cohort</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            This queue is generated from the current mechanical gate, then lightly balanced across disciplines so editorial review does not begin with one category alone. Inclusion here is not approval and does not change launch status.
          </p>
          {reviewCohort.length ? (
            <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {reviewCohort.map((profile) => (
                <article key={profile.slug} className="bg-background p-5 sm:p-6">
                  <p className="eyebrow text-primary">{labelCategory(profile.category)}</p>
                  <h3 className="mt-2 font-display text-2xl">{profile.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile.texasConnection}</p>
                  <Link
                    to="/admin/texas-talent/$slug"
                    params={{ slug: profile.slug }}
                    className="mt-4 inline-block text-sm font-semibold text-primary"
                  >
                    Review profile →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 border border-border bg-surface p-5 text-sm leading-7 text-muted-foreground">
              No profile has cleared every mechanical launch requirement yet. The queue will populate automatically as source, image, content-depth and safe-link gates clear.
            </p>
          )}
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="talent-categories">
          <p className="eyebrow text-primary">The collection</p>
          <h2 id="talent-categories" className="mt-2 font-display text-4xl sm:text-5xl">Five ways Texas talent reaches the world</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {TEXAS_TALENT_CATEGORIES.map((category) => {
              const count = profiles.filter((profile) => profile.category === category.id).length;
              return (
                <article key={category.id} className="bg-background p-6 sm:p-7">
                  <p className="eyebrow text-primary">{count} profile pages</p>
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
                  <div key={requirement} className="border border-border bg-background p-4 text-sm font-semibold leading-6">{requirement}</div>
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
        <section aria-labelledby="profile-workbench">
          <div className="max-w-4xl">
            <p className="eyebrow text-primary">Profile workbench</p>
            <h2 id="profile-workbench" className="mt-2 font-display text-4xl sm:text-5xl">The first {profiles.length} Texas Talent pages</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Every card opens an internal profile draft and shows the current mechanical blockers plus a route-quality-aware live-link audit.
            </p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((person) => {
              const assessment = launchAudit.assessments.find((item) => item.slug === person.slug);
              const linkAudit = launchAudit.linkAudits.find((item) => item.slug === person.slug);
              return (
                <article key={person.slug} className="bg-background p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-primary">{labelCategory(person.category)}</p>
                      <h3 className="mt-2 font-display text-3xl">{person.name}</h3>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {assessment?.publishable ? "publishable" : person.readiness.launchStatus.replace("-", " ")}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{person.texasConnection}</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">Texas places</p>
                    <p className="mt-2 text-sm text-muted-foreground">{person.primaryPlaces.join(" · ")}</p>
                  </div>
                  {linkAudit ? (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">Live-link audit</p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {linkAudit.safeResolvedLinkCount} safe live · {linkAudit.unsafeRecordedLinkCount} dropped · stored review {linkAudit.reviewStatus}
                      </p>
                      {linkAudit.mechanicallyCertified ? (
                        <p className="mt-2 text-xs font-semibold text-primary">Current graph mechanically certifies this link set</p>
                      ) : linkAudit.certificationCandidate ? (
                        <p className="mt-2 text-xs font-semibold text-primary">Eligible for mechanical link certification</p>
                      ) : null}
                    </div>
                  ) : null}
                  {assessment?.blockers.length ? (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">Mechanical blockers</p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {assessment.blockers.map(humanizeBlocker).join(" · ")}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 border-t border-border pt-4 text-xs font-semibold text-primary">
                      Mechanical gate cleared · awaiting explicit editorial approval
                    </p>
                  )}
                  <Link to="/admin/texas-talent/$slug" params={{ slug: person.slug }} className="mt-5 inline-block text-sm font-semibold text-primary">
                    Open profile draft →
                  </Link>
                </article>
              );
            })}
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

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="bg-background p-6">
      <p className="font-display text-4xl text-primary">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </article>
  );
}

function labelCategory(category: string) {
  return TEXAS_TALENT_CATEGORIES.find((item) => item.id === category)?.label ?? category;
}

function humanizeBlocker(value: string) {
  return value.replaceAll("-", " ");
}
