import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { TexasHomeNaturePublicGuide } from "@/data/texas-home-nature-public";

const HOME_NATURE_GUIDES = [
  { href: "/texas-pool-guide", label: "Texas pool guide" },
  { href: "/texas-pests-guide", label: "Texas pests guide" },
  { href: "/texas-snakes-guide", label: "Texas snakes guide" },
  { href: "/texas-birds-guide", label: "Texas birds guide" },
] as const;

export function TexasHomeNatureGuide({ data }: { data: TexasHomeNaturePublicGuide }) {
  const { guide, sources, reviewedAt } = data;
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/texas-living" className="hover:text-foreground">Texas Life</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/home-garden" className="hover:text-foreground">Home &amp; Garden</Link>
        </nav>
      </Container>

      <Container className="pt-10">
        <article className="mx-auto max-w-4xl">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{guide.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{guide.dek}</p>
          <p className="mt-4 text-sm text-muted-foreground">Editorial guidance reviewed {reviewedAt}.</p>

          <section className="mt-10 rounded-2xl border bg-card p-6 sm:p-8" aria-labelledby="quick-answer">
            <h2 id="quick-answer" className="font-display text-2xl">Quick answer</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{guide.quickAnswer}</p>
          </section>

          <nav aria-label="Texas home and nature guides" className="mt-8 rounded-2xl border p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">Texas home &amp; nature</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {HOME_NATURE_GUIDES.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{item.label}</a>
              ))}
            </div>
          </nav>

          <div className="mt-12 space-y-12">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl leading-tight">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground">
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
                {section.links?.length ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <a key={link.href} href={link.href} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-14 border-t pt-10" aria-labelledby="sources">
            <h2 id="sources" className="font-display text-3xl">Sources and current guidance</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Texas conditions and equipment vary. These sources support the factual guidance on this page; local officials and manufacturer instructions should control when conditions or equipment-specific procedures differ.</p>
            <ul className="mt-6 space-y-4">
              {sources.map((source) => (
                <li key={source.url} className="rounded-xl border p-4">
                  <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">{source.name}</a>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 border-t pt-10" aria-labelledby="related-guides">
            <h2 id="related-guides" className="font-display text-3xl">Keep planning</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {guide.related.map((item) => (
                <a key={item.href} href={item.href} className="rounded-xl border p-5 transition-colors hover:bg-muted/40">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        </article>
      </Container>
    </main>
  );
}
