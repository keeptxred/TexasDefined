import type { ParkingMapAsset } from '@/data/parking-map-model';
import { isPublishableParkingMap } from '@/data/parking-map-model';

export function ParkingMapPanel({
  map,
  contextName,
  embedded = false,
}: {
  map?: ParkingMapAsset;
  contextName: string;
  embedded?: boolean;
}) {
  if (!isPublishableParkingMap(map)) return null;

  const sourceLabel = map.origin === 'ai-generated'
    ? 'TexasDefined-created parking orientation diagram'
    : `Reusable parking map${map.sourceName ? ` via ${map.sourceName}` : ''}`;

  const content = (
    <div className="min-w-0">
      <figure>
        <div className="overflow-hidden border border-border bg-muted/30">
          <img
            src={map.imageUrl}
            alt={map.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
          {sourceLabel}. {map.origin === 'ai-generated'
            ? 'It is a schematic, not a scale drawing, and does not reproduce third-party map artwork.'
            : map.licenseName
              ? `Licensed under ${map.licenseName}.`
              : ''}{' '}
          Parking assignments, traffic routing and accessible parking can change by event.
        </figcaption>
      </figure>

      <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold">Parking details</h3>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
            {map.accuracyNotes.slice(0, 4).map((note) => <li key={note}>• {note}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Current venue source{map.verificationSources.length === 1 ? '' : 's'}</h3>
          <ul className="mt-2 space-y-2 text-sm leading-6">
            {map.verificationSources.map((source) => (
              <li key={source.url}>
                <a className="font-semibold text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Always use the linked current venue/event source for final lot assignments before travel.</p>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="mt-6 border-t border-border pt-5" aria-label={`Parking orientation for ${contextName}`}>
        {content}
      </div>
    );
  }

  return (
    <section className="border-b border-border py-10 sm:py-12" aria-labelledby={`parking-map-${map.id.replace(/[^a-z0-9]+/gi, '-')}`}>
      <div className="grid gap-7 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Parking map</p>
          <h2 id={`parking-map-${map.id.replace(/[^a-z0-9]+/gi, '-')}`} className="mt-2 font-display text-3xl leading-tight">
            Parking orientation for {contextName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {map.origin === 'ai-generated'
              ? `This original diagram is based on current venue parking information reviewed on ${formatDate(map.verifiedAt)}.`
              : `Map reuse rights and current parking information were reviewed on ${formatDate(map.verifiedAt)}.`}
          </p>
        </div>
        {content}
      </div>
    </section>
  );
}

function formatDate(value: string | undefined) {
  if (!value) return 'the most recent source review';
  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(parsed.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(parsed);
}