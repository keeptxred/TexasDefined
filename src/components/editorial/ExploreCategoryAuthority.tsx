import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { exploreCategoryAuthority } from "@/data/explore-category-authority";
import type { CategorySlug } from "@/data/types";

export function ExploreCategoryAuthority({ category }: { category: CategorySlug }) {
  const guide = exploreCategoryAuthority[category];
  if (!guide) return null;

  return (
    <section className="border-y border-border bg-background py-16 sm:py-20" aria-labelledby={`${category}-authority-title`}>
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Texas field guide</p>
          <h2 id={`${category}-authority-title`} className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{guide.title}</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{guide.dek}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading} className="max-w-3xl">
                <h3 className="font-display text-2xl leading-tight sm:text-3xl">{section.heading}</h3>
                <div className="mt-4 space-y-4 text-[1.02rem] leading-8 text-foreground/88">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-2 pl-5 text-[1rem] leading-7 text-foreground/85">
                    {section.bullets.map((bullet) => <li key={bullet} className="list-disc pl-1">{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface p-6">
              <h3 className="font-display text-xl">Official sources</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Use managing agencies for current hours, closures, permits, reservations and safety notices.</p>
              <ul className="mt-4 space-y-3">
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer" className="text-sm font-medium leading-5 text-primary underline-offset-4 hover:underline">{source.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border p-6">
              <h3 className="font-display text-xl">Keep exploring</h3>
              <ul className="mt-4 space-y-3">
                {guide.relatedLinks.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-sm font-medium text-primary underline-offset-4 hover:underline">{item.label} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
