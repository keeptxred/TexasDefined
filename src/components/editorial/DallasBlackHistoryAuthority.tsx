import { dallasBlackHistoryFor, dallasBlackHistoryResearch } from "@/data/dallas-black-history-research";

/** Visible researched source evidence, visitor FAQs and reciprocal connections.
 * Used on BOTH previously existing destinations and all newly added sites.
 */
export function DallasBlackHistoryAuthority({ slug }: { slug: string }) {
  const profile = dallasBlackHistoryFor(slug);
  if (!profile) return null;
  const related = dallasBlackHistoryResearch.filter((entry) => entry.slug !== slug);
  return (
    <div className="mt-12 space-y-12 border-t border-border pt-10" data-dallas-black-history-authority={slug}>
      <section aria-labelledby="dallas-heritage-history">
        <p className="eyebrow text-primary">Research and historical context</p>
        <h2 id="dallas-heritage-history" className="mt-3 font-display text-3xl sm:text-4xl">
          Understanding {profile.shortName}
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          <strong>Historic period:</strong> {profile.period}. <strong>Primary focus:</strong> {profile.focus}.
          This material was fact-checked on October 12, 2026 using the sources below. Visitor and event arrangements can change.
        </p>
        <div className="mt-8 space-y-10">
          {profile.sections.map((section) => (
            <div key={section.heading} className="border-l-2 border-primary/40 pl-5">
              <h3 className="font-display text-2xl leading-snug">{section.heading}</h3>
              <div className="editorial-body mt-4 space-y-4 text-foreground/90">
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-8">{paragraph}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="dallas-heritage-faq" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Frequently asked questions</p>
        <h2 id="dallas-heritage-faq" className="mt-3 font-display text-3xl">Questions about this historic place</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {profile.faqs.map(({ question, answer }) => (
            <details key={question} className="py-5">
              <summary className="cursor-pointer font-semibold leading-6">
                <span>{question}</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="dallas-heritage-sources" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Evidence and verification</p>
        <h2 id="dallas-heritage-sources" className="mt-3 font-display text-3xl">Primary sources and further reading</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Sources are listed with their purpose so that readers can check claims directly. Historic facts are checked at least
          quarterly; visitor operations for this location are scheduled for {profile.reviewFrequency} rechecking.
          A scheduled recheck is not a claim that a live automated run has succeeded.
        </p>
        <ul className="mt-6 space-y-4">
          {profile.sources.map((source) => (
            <li key={source.url} className="border-b border-border pb-4">
              <a href={source.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                {source.label} <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.supports}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="dallas-heritage-nearby" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Read the connected history</p>
        <h2 id="dallas-heritage-nearby" className="mt-3 font-display text-3xl">Other Dallas Black history landmarks</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          These sites document different Black Dallas communities and institutions. Their shared themes do not mean
          they were one neighborhood or that every site offers indoor tourist access.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {related.map(({ slug: destinationSlug, shortName, focus }) => (
            <li key={destinationSlug}>
              <a href={`/destination/${destinationSlug}`} className="block rounded-md border border-border p-4 hover:text-primary">
                <span className="font-semibold text-primary">{shortName} →</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{focus}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="/dallas-black-history" className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">
          Explore the full Dallas Black History guide →
        </a>
      </section>
    </div>
  );
}
