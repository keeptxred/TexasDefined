import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/admin/texas-talent/relationships")({
  component: TexasTalentRelationshipsPage,
});

function TexasTalentRelationshipsPage() {
  const { reverseLinkAudit } = Route.useRouteContext();

  return (
    <main>
      <section className="border-b border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <Link to="/admin/texas-talent" className="eyebrow text-primary">← Texas Talent workbench</Link>
          <p className="mt-7 eyebrow text-primary">Internal relationship audit</p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Where Texas Talent links back into Texas Defined</h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-background/70">
            This hidden view reverses the profile-to-place graph. It shows which existing indexable county, city and cultural destinations already have enough verified Texas Talent relationships to support a future “Texas Talent from here” module. Nothing on this page enables those public modules.
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <Metric label="Profiles tracked" value={reverseLinkAudit.totalProfiles} />
          <Metric label="Profiles with a safe link" value={reverseLinkAudit.profilesWithResolvedLinks} />
          <Metric label="Profiles with no safe link" value={reverseLinkAudit.profilesWithoutResolvedLinks} />
          <Metric label="Reverse-link destinations" value={reverseLinkAudit.destinationCount} />
          <Metric label="County destinations" value={reverseLinkAudit.countyDestinationCount} />
          <Metric label="City destinations" value={reverseLinkAudit.cityDestinationCount} />
          <Metric label="Culture destinations" value={reverseLinkAudit.cultureDestinationCount} />
        </div>
      </Container>

      <Container className="pb-14 sm:pb-20">
        <section aria-labelledby="reverse-links">
          <p className="eyebrow text-primary">Reverse-link candidates</p>
          <h2 id="reverse-links" className="mt-2 font-display text-4xl sm:text-5xl">Profile → place becomes place → profile</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            These destinations come only from the current indexable Texas Defined knowledge graph. The list is a launch-planning audit, not authorization to change any public county, city or cultural page.
          </p>

          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {reverseLinkAudit.reverseLinks.map((destination) => (
              <article key={destination.href} className="bg-background p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="eyebrow text-primary">{destination.kind}</p>
                    <h3 className="mt-2 font-display text-3xl">{destination.label}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{destination.href}</p>
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-muted-foreground">
                    {destination.profiles.length} profile{destination.profiles.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {destination.profiles.map((profile) => (
                    <Link
                      key={profile.slug}
                      to="/admin/texas-talent/$slug"
                      params={{ slug: profile.slug }}
                      className="border border-border px-3 py-2 text-xs font-semibold text-primary"
                    >
                      {profile.name}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="bg-background p-5 sm:p-6">
      <p className="font-display text-4xl text-primary">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </article>
  );
}
