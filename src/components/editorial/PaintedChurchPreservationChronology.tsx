import { paintedChurchPreservationEventsBySlug } from "@/data/painted-church-preservation-chronology";

function typeLabel(value: string) {
  return value.replaceAll("-", " ");
}

export function PaintedChurchPreservationChronology({ slug }: { slug: string }) {
  const events = paintedChurchPreservationEventsBySlug.get(slug) ?? [];
  if (!events.length) {
    return (
      <section aria-labelledby="preservation-chronology" className="mt-14 border-t border-border pt-8">
        <p className="eyebrow text-primary">Preservation chronology</p>
        <h2 id="preservation-chronology" className="mt-3 font-display text-4xl">What changed—and what still needs documentation</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Texas Defined has not yet located a church-specific intervention, disaster, repainting or conservation chronology that clears the source standard for this property. That is a documented research gap, not evidence that the interior has never changed.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="preservation-chronology" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Preservation chronology</p>
      <h2 id="preservation-chronology" className="mt-3 font-display text-4xl">How the visible interior reached the present day</h2>
      <div className="mt-8 space-y-0 border-y border-border">
        {events.map((event) => (
          <article key={event.id} className="grid gap-3 border-b border-border py-6 last:border-b-0 sm:grid-cols-[140px_minmax(0,1fr)]">
            <div>
              <p className="font-display text-2xl">{event.yearLabel ?? event.year}</p>
              <p className="eyebrow mt-1 text-muted-foreground">{typeLabel(event.type)}</p>
            </div>
            <div>
              <p className="text-sm leading-7 text-foreground/90">{event.summary}</p>
              {event.qualification ? <p className="mt-2 text-xs leading-6 text-muted-foreground">Qualification: {event.qualification}</p> : null}
              <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block border-b border-primary text-xs text-primary">{event.sourceLabel}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
