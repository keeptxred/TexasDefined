import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { GAMING_PAGES, GAMING_REVIEWED_AT, TEXAS_GAME_COMPANIES, COLLEGE_ESPORTS } from "@/data/gaming";

export const Route = createLazyFileRoute("/gaming")({ component: GamingHubPage });

function GamingHubPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Gaming &amp; Esports</span>
          </nav>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas technology · games · esports</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Gaming &amp; Esports in Texas</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
            Texas gaming is bigger than a list of studios. Development, online gaming, collegiate and professional esports, live events,
            digital-media careers and internet infrastructure overlap across Austin, Dallas–Fort Worth and other Texas markets.
            This section keeps those pieces connected without pretending they are the same industry.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Source review · {GAMING_REVIEWED_AT}</p>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Start with the system</p>
              <h2 className="mt-3 font-display text-4xl">How the Texas gaming ecosystem connects</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Game development is the production business. Esports is competitive play, teams, broadcasts and live events.
                Online-gaming performance depends on access networks, routing, interconnection and server placement. Careers and education
                cut across all three. Follow the path that matches what you are actually researching.
              </p>
              <div className="mt-7 space-y-3 text-sm font-semibold">
                <a href="/gaming/video-game-industry" className="block text-primary">Texas video game industry →</a>
                <a href="/gaming/companies" className="block text-primary">Video game companies in Texas →</a>
                <a href="/gaming/esports" className="block text-primary">Texas esports →</a>
                <a href="/gaming/latency" className="block text-primary">Online gaming latency guide →</a>
              </div>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {GAMING_PAGES.map((page) => (
                <a key={page.slug} href={`/gaming/${page.slug}`} className="group bg-background p-6 transition-colors hover:bg-muted/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{page.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{page.shortTitle}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{page.description}</p>
                  <p className="mt-5 text-sm font-semibold group-hover:text-primary">Open guide →</p>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Two directories, two different questions</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl">Employers and college esports are tracked separately</h2>
          <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
            <article className="bg-background p-6">
              <p className="font-display text-4xl">{TEXAS_GAME_COMPANIES.length}</p>
              <h3 className="mt-2 font-display text-2xl">Reviewed game-company entries</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Current employer research emphasizes official company and Texas Film Commission sources rather than historical office lists.</p>
              <a href="/gaming/companies" className="mt-5 inline-block text-sm font-semibold text-primary">Browse companies →</a>
            </article>
            <article className="bg-background p-6">
              <p className="font-display text-4xl">{COLLEGE_ESPORTS.length}</p>
              <h3 className="mt-2 font-display text-2xl">Verified college programs</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Varsity teams, varsity-level programs, clubs and student organizations are labeled according to each institution's own terminology.</p>
              <a href="/gaming/college-esports" className="mt-5 inline-block text-sm font-semibold text-primary">Compare programs →</a>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Bridge title="Austin / Central Texas" href="/gaming/austin" body="Follow studios, employers, careers and Round Rock into the Central Texas development cluster." />
            <Bridge title="Dallas–Fort Worth" href="/gaming/dfw" body="Separate North Texas game development, esports, venues and internet infrastructure into their proper roles." />
            <Bridge title="Texas-wide careers" href="/gaming/careers" body="Understand role families and use current official employer resources instead of a stale jobs snapshot." />
            <Bridge title="Texas gaming history" href="/gaming/history" body="Trace the documented North Texas and Austin milestones that shaped Texas game development." />
            <Bridge title="Gaming conventions & events" href="/gaming/events-conventions" body="Use current official schedules and TexasDefined's event system without treating old editions as upcoming." />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Editorial standard</p>
            <h2 className="mt-3 font-display text-4xl">What this section will not claim</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              TexasDefined does not treat a routing product as a Texas employer, data-center owner or game-server operator without direct evidence.
              Commercial network tools appear only where they are relevant to routing or latency, with disclosure and tracked sponsored links.
              Studio, team, university and venue status is tied to current first-party sources and reviewed dates.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Bridge({ title, href, body }: { title: string; href: string; body: string }) {
  return <article className="border border-border bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><a href={href} className="mt-5 inline-block text-sm font-semibold text-primary">Explore →</a></article>;
}
