import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const TEXAS_TALENT_TAGLINE = "The Stars of Texas Shine Bright";

export const Route = createLazyFileRoute("/admin/texas-talent/preview")({
  component: TexasTalentPublicPreview,
});

function TexasTalentPublicPreview() {
  const { profiles } = Route.useRouteContext();
  const featured = profiles.filter((profile) => profile.readiness.imageReview.heroImage).slice(0, 10);

  return (
    <main>
      <section className="relative overflow-hidden bg-foreground text-background">
        <img src="/images/editorial/texas-talent-hero.webp" alt="Illustrated Texas Talent banner" width={1800} height={720} className="absolute inset-0 h-full w-full object-cover opacity-35" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/45" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <p className="eyebrow text-primary">Texas Defined · Internal launch preview</p>
          <h1 className="mt-4 font-display text-6xl sm:text-7xl lg:text-8xl">Texas Talent</h1>
          <p className="mt-5 font-display text-3xl italic text-primary sm:text-4xl">{TEXAS_TALENT_TAGLINE}</p>
          <p className="mt-7 max-w-3xl text-base leading-8 text-background/80">Texas stories behind the musicians, actors, filmmakers, writers, artists and performers who carried part of the state into the wider world.</p>
          <span className="mt-8 inline-flex border border-primary/60 bg-primary/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Preview only · noindex</span>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">A Texas people pillar</p>
        <h2 className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">The people who gave Texas a voice, a camera, a canvas and a stage.</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">Birthplaces, hometowns, universities, venues, landscapes, scenes and communities are part of each profile and part of the larger Texas Defined knowledge graph.</p>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featured.map((profile) => {
            const image = profile.readiness.imageReview.heroImage;
            if (!image) return null;
            return (
              <article key={profile.slug} className="overflow-hidden border border-border bg-background">
                <img src={image.src} alt={image.alt} className="aspect-[4/5] h-auto w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="eyebrow text-primary">{profile.category}</p>
                  <h3 className="mt-2 font-display text-2xl">{profile.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{profile.texasConnection}</p>
                  <Link to="/admin/texas-talent/$slug" params={{ slug: profile.slug }} className="mt-5 inline-flex text-sm font-semibold text-primary">Preview profile →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <section className="border-t border-border bg-foreground text-background">
        <Container className="py-12 sm:py-16">
          <p className="eyebrow text-primary">Launch boundary</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Built like the public pillar. Still safely behind the curtain.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">This preview exists for design and editorial review before Texas Talent receives a public URL. Search engines, the sitemap, homepage and navigation remain untouched.</p>
          <Link to="/admin/texas-talent" className="mt-6 inline-flex border border-background/25 px-5 py-4 text-sm font-semibold text-background">Open editorial workbench →</Link>
        </Container>
      </section>
    </main>
  );
}
