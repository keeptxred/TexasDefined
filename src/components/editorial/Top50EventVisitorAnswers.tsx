import { getTop50EventAnswers } from "@/data/top50-event-visitor-answers";

/** Visible answers and primary operator links for three ranked annual events.
 * Core event metadata, dated admissions and schema stay with the event system.
 */
export function Top50EventVisitorAnswers({ slug }: { slug: string }) {
  const guide = getTop50EventAnswers(slug);
  if (!guide) return null;
  return (
    <section aria-labelledby={`top50-event-questions-${slug}`} className="mt-10 border-t-2 border-foreground py-8">
      <p className="eyebrow text-primary">Verified visit essentials</p>
      <h2 id={`top50-event-questions-${slug}`} className="mt-3 font-display text-3xl sm:text-4xl">
        Important questions about {guide.name}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        These answers distinguish admission types, seasonal dates and practical access.
        For current operations and purchases, the linked organizer controls the rules.
      </p>
      <dl className="mt-7 divide-y divide-border border-y border-border">
        {guide.questions.map((item) => (
          <div key={item.question} className="py-5">
            <dt className="font-display text-xl sm:text-2xl">{item.question}</dt>
            <dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
               className="mt-3 inline-block border-b border-primary text-xs font-semibold text-primary">
              Verify with the official organizer ↗
            </a>
          </div>
        ))}
      </dl>
      <a href="/explore/top-50-attractions" className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">
        Explore the statewide Top 50 attractions →
      </a>
    </section>
  );
}
