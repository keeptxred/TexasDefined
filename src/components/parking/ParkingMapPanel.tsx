import { useState } from 'react';
import type { ParkingMapAsset } from '@/data/parking-map-model';
import { isPublishableParkingMap } from '@/data/parking-map-model';

export function ParkingMapPanel({
  map,
  contextName,
}: {
  map?: ParkingMapAsset;
  contextName: string;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  if (!isPublishableParkingMap(map)) return null;

  const imageAvailable = failedImage !== map.imageUrl;
  const sourceLabel = map.origin === 'ai-generated'
    ? 'TexasDefined-created parking orientation diagram'
    : `Reusable parking map${map.sourceName ? ` via ${map.sourceName}` : ''}`;

  const mapFigure = (
    <figure>
      {imageAvailable ? <div className="overflow-hidden border border-border bg-muted/30">
        <img
          src={map.imageUrl}
          alt={map.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
          onError={() => setFailedImage(map.imageUrl)}
        />
      </div> : <div className="flex items-center justify-center py-12 border border-border bg-muted/30 px-6 text-center text-sm text-muted-foreground" role="img" aria-label={`${contextName} parking map unavailable`}>Parking map image unavailable. Use the official parking sources beside this panel for current lot and access information.</div>}
      <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
        {imageAvailable ? `${sourceLabel}. ${map.origin === 'ai-generated' ? 'It is a schematic, not a scale drawing, and does not reproduce third-party map artwork.' : map.licenseName ? `Licensed under ${map.licenseName}.` : ''} Parking assignments, traffic routing and accessible parking can change by event.` : 'The embedded map could not be loaded. Official parking sources and the last verification date remain available.'}
      </figcaption>
    </figure>
  );

  const sourceLinks = (
    <>
      <h3 className="text-sm font-semibold">Official parking source{map.verificationSources.length === 1 ? '' : 's'}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6">
        {map.verificationSources.map((source) => (
          <li key={source.url}>
            <a className="font-semibold text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">
              {source.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Reviewed {formatDate(map.verifiedAt)}. Use the linked venue or event source for current lot assignments before travel.
      </p>
    </>
  );

  return (
    <div className="mt-6 grid gap-6 border-t border-border pt-5 lg:grid-cols-2 lg:items-start" aria-label={`Parking orientation for ${contextName}`}>
      {mapFigure}
      <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">{sourceLinks}</div>
    </div>
  );
}

function formatDate(value: string | undefined) {
  if (!value) return 'the most recent source review';
  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(parsed.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(parsed);
}
