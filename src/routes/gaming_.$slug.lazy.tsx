import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { COLLEGE_ESPORTS, GAMING_REVIEWED_AT, GEARUP_LINKS, TEXAS_GAME_COMPANIES } from "@/data/gaming";
import { trackAffiliateClick } from "@/lib/affiliate-click";

export const Route = createLazyFileRoute("/gaming/$slug")({ component: GamingTopicPage });

function GamingTopicPage() {
  const page = Route.useLoaderData();
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span>
            <Link to="/gaming" className="hover:text-foreground">Gaming &amp; Esports</Link><span className="mx-2">/</span>
            <span className="text-foreground">{page.shortTitle}</span>
          </nav>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{page.summary}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Source review · {GAMING_REVIEWED_AT}</p>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article>
              {page.sections.map((section) => (
                <section key={section.title} className="mb-12">
                  <h2 className="font-display text-3xl">{section.title}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => <li key={item} className="border border-border bg-surface p-4 text-sm leading-6">{item}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}

              {page.slug === "companies" ? <CompanyDirectory /> : null}
              {page.slug === "college-esports" ? <CollegeDirectory /> : null}
              {page.slug === "esports-stadium-arlington" ? <ArlingtonStayCallout /> : null}
              {page.gearup === "evergreen" ? <GearUpCallout placement={`gaming-${page.slug}`} /> : null}

              <section className="mt-14 border-t border-border pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Related TexasDefined guides</p>
                <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
                  {page.related.map((item) => (
                    <a key={item.href} href={item.href} className="bg-background p-5 transition-colors hover:bg-muted/30">
                      <strong className="font-display text-xl">{item.label}</strong>
                      <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                    </a>
                  ))}
                </div>
              </section>
            </article>

            <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Sources and official links</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Use these first-party and official sources for current status, schedules, programs and operational details.</p>
              <ul className="mt-5 space-y-4">
                {page.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4">{source.label} ↗</a>
                    <span className="mt-1 block text-xs uppercase tracking-[0.1em] text-muted-foreground">{source.kind}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

function CompanyDirectory() {
  return (
    <section className="mt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Reviewed directory</p>
      <h2 className="mt-3 font-display text-3xl">Texas game-development employers</h2>
      <div className="mt-6 overflow-x-auto border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-surface"><tr><th className="p-4">Company</th><th className="p-4">Texas city</th><th className="p-4">Focus</th><th className="p-4">Official links</th></tr></thead>
          <tbody>
            {TEXAS_GAME_COMPANIES.map((company) => (
              <tr key={company.name} className="border-t border-border align-top">
                <td className="p-4"><strong>{company.name}</strong><span className="mt-2 block max-w-sm text-xs leading-5 text-muted-foreground">{company.source}</span></td>
                <td className="p-4">{company.city}</td>
                <td className="p-4">{company.focus}</td>
                <td className="p-4"><a href={company.official} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">Company ↗</a><br/><a href={company.careers} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">Careers ↗</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CollegeDirectory() {
  return (
    <section className="mt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Verified programs</p>
      <h2 className="mt-3 font-display text-3xl">College esports in Texas</h2>
      <div className="mt-6 grid gap-px border border-border bg-border">
        {COLLEGE_ESPORTS.map((program) => (
          <article key={program.school} className="bg-background p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">{program.school}</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{program.city}</span>
            </div>
            <p className="mt-2 text-sm font-semibold">{program.status}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{program.detail}</p>
            <a href={program.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">Official program ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArlingtonStayCallout() {
  const destination = "https://www.hotels.com/ho1066640416/live-by-loews-arlington-tx-arlington-united-states-of-america/";
  const href = `https://www.anrdoezrs.net/links/101876465/type/dlg/${destination}`;
  const placement = "gaming-esports-stadium-arlington-stay";
  return (
    <aside className="mt-12 border border-border bg-surface p-6" data-affiliate-module="gaming-event-stay">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Stay nearby</p>
      <h2 className="mt-2 font-display text-2xl">An Entertainment District hotel option</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Live! by Loews – Arlington, TX is one of TexasDefined's already reviewed Arlington Entertainment District lodging records.
        Check the event date first, then compare the current rate and booking terms directly with the booking provider.
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        data-affiliate-partner="hotels.com"
        data-affiliate-placement={placement}
        data-commercial-partner="hotels.com"
        data-commercial-placement={placement}
        onClick={() => trackAffiliateClick({ partner: "hotels.com", label: "Live! by Loews – Arlington, TX", placement, module: "gaming-event-stay" })}
        className="mt-5 inline-flex min-h-11 items-center border border-primary px-4 py-2.5 text-sm font-semibold text-primary"
      >
        View Live! by Loews on Hotels.com ↗
      </a>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from a qualifying Hotels.com booking, at no additional cost to you.</p>
    </aside>
  );
}

function GearUpCallout({ placement }: { placement: string }) {
  const link = GEARUP_LINKS.evergreen;
  return (
    <aside className="mt-12 border border-border bg-surface p-6" data-affiliate-module="gaming-network-optimization">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Optional network optimization</p>
      <h2 className="mt-2 font-display text-2xl">A routing optimizer can sometimes change a poor network path</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Services such as GearUP route game traffic through alternate network paths. That can help when the normal route is inefficient,
        but it cannot fix every source of latency and may not improve a connection that is already well routed. Test your local network first.
      </p>
      <a
        href={link.url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        data-affiliate-partner="gearup"
        data-affiliate-placement={placement}
        data-commercial-partner="gearup"
        data-commercial-placement={placement}
        data-cj-link-id={link.id}
        onClick={() => trackAffiliateClick({ partner: "gearup", label: link.label, placement, module: "gaming-network-optimization" })}
        className="mt-5 inline-flex min-h-11 items-center border border-primary px-4 py-2.5 text-sm font-semibold text-primary"
      >
        Learn about GearUP ↗
      </a>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission if you purchase through this GearUP link, at no additional cost to you.</p>
    </aside>
  );
}
