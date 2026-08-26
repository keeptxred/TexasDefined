import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const TEXAS_TALENT_TAGLINE = "The Stars of Texas Shine Bright";
const TEXAS_TALENT_CATEGORIES = [
  { id: "music", label: "Music", description: "Country, blues, rock, Tejano, R&B, pop and the Texas scenes that shaped them." },
  { id: "film-tv", label: "Film & Television", description: "Actors, filmmakers and screen storytellers with a meaningful Texas connection." },
  { id: "literature", label: "Literature", description: "Novelists, poets, playwrights, journalists and other writers whose work carries Texas outward." },
  { id: "visual-arts", label: "Visual Arts", description: "Painters, photographers, sculptors, designers and artists whose work helps explain the state." },
  { id: "comedy-performance", label: "Comedy & Performance", description: "Comedians and stage performers whose careers or artistic identities are tied to Texas." },
] as const;

export const Route = createLazyFileRoute("/admin/texas-talent/preview")({
  component: TexasTalentPublicPreview,
});

function TexasTalentPublicPreview() {
  const { profiles, launchAudit } = Route.useRouteContext();
  const mechanicallyReady = new Set(
    launchAudit.assessments
      .filter((assessment) => assessment.mechanicalReady)
      .map((assessment) => assessment.slug),
  );
  const candidates = profiles.filter((profile) => profile.readiness.imageReview.heroImage);
  const categoryPicks = TEXAS_TALENT_CATEGORIES.flatMap((category) => {
    const categoryProfiles = candidates.filter((profile) => profile.category === category.id);
    return [
      ...categoryProfiles.filter((profile) => mechanicallyReady.has(profile.slug)),
      ...categoryProfiles.filter((profile) => !mechanicallyReady.has(profile.slug)),
    ].slice(0, 2);
  });
  const featured = [
    ...new Map(categoryPicks.map((profile) => [profile.slug, profile] as const)).values(),
  ];

  return (
    <main>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src="/images/editorial/texas-talent-hero.webp"
          alt="Illustrated Texas Talent banner celebrating Texas musicians, actors, filmmakers, writers, artists and performers"
          width={1800}
          height={720}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/45" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <p className="eyebrow text-primary">Texas Defined · Internal launch preview</p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">Texas Talent</h1>
          <p className="mt-5 max-w-4xl font-display text-3xl italic text-primary sm:text-4xl lg:text-5xl">{TEXAS_TALENT_TAGLINE}</p>
          <p className="mt-7 max-w-3xl text-base leading-8 text-background/80 sm:text-lg">
            Musicians, actors, filmmakers, writers, artists and performers whose Texas stories helped shape their work — and whose work carried some of Texas into the wider world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em]">
            <span className="border border-background/30 bg-foreground/45 px-4 py-3">{profiles.length} profiles researched</span>
            <span className="border border-background/30 bg-foreground/45 px-4 py-3">{TEXAS_TALENT_CATEGORIES.length} creative disciplines</span>
            <span className="border border-primary/60 bg-primary/10 px-4 py-3 text-primary">Preview only · noindex</span>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">A Texas people pillar</p>
            <h2 className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">The people who gave Texas a voice, a camera, a canvas and a stage.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              Texas Talent is built around the connection generic biographies often leave out: where Texas enters the story. Birthplaces, hometowns, universities, venues, landscapes, scenes and communities become part of each profile — and part of the larger Texas Defined knowledge graph.
            </p>
          </div>
          <div className="border-l-2 border-primary pl-6">
            <p className="font-display text-2xl">Profile → Place → Story → Profile</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Every eventual public profile should help readers discover more of Texas, while relevant Texas pages can point readers back to the people connected with them.</p>
          </div>
        </div>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <p className="eyebrow text-primary">Explore by discipline</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Five ways Texas talent reaches the world</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
            {TEXAS_TALENT_CATEGORIES.map((category) => {
              const count = profiles.filter((profile) => profile.category === category.id).length;
              return (
                <article key={category.id} className="bg-background p-6">
                  <p className="font-display text-4xl text-primary">{count}</p>
                  <h3 className="mt-3 font-display text-2xl">{category.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Across the collection</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Texas stories worth knowing</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            These cards simulate the public hub treatment. They still open internal drafts, and appearing here does not constitute editorial approval or publication authorization.
          </p>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featured.map((profile) => {
            const image = profile.readiness.imageReview.heroImage;
            if (!image) return null;
            return (
              <article key={profile.slug} className="group overflow-hidden border border-border bg-background">
                <div className="aspect-[4/5] overflow-hidden bg-surface">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="eyebrow text-primary">{categoryLabel(profile.category)}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{profile.name}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{profile.texasConnection}</p>
                  <Link
                    to="/admin/texas-talent/$slug"
                    params={{ slug: profile.slug }}
                    className="mt-5 inline-flex text-sm font-semibold text-primary"
                  >
                    Preview profile →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <section className="border-t border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div>
              <p className="eyebrow text-primary">Launch boundary</p>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl">Built like the public pillar. Still safely behind the curtain.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">
                This preview exists so design, content hierarchy and profile selection can be reviewed before Texas Talent receives a public URL. Search engines, the sitemap, homepage and navigation remain untouched.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/admin/texas-talent" className="border border-background/25 px-5 py-4 text-sm font-semibold text-background">Open editorial workbench →</Link>
              <Link to="/admin/texas-talent/relationships" className="border border-background/25 px-5 py-4 text-sm font-semibold text-background">Open relationship audit →</Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function categoryLabel(category: string) {
  return TEXAS_TALENT_CATEGORIES.find((item) => item.id === category)?.label ?? category;
}
