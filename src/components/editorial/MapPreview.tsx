import { ExternalLink } from "lucide-react";

import type { GeoPoint } from "@/data/types";
import { maps, type MapMarker } from "@/services/maps";

/**
 * Provider-agnostic map surface. Phase 1 renders a static locator card with an
 * external directions link; swapping in a tile provider is one adapter change.
 */
export function MapPreview({
  markers,
  zoom = 9,
  directionsLabel,
  className,
}: {
  markers: MapMarker[];
  zoom?: number;
  directionsLabel: string;
  className?: string;
}) {
  const primary: GeoPoint | undefined = markers[0]?.point;
  const image = maps.staticImageUrl(markers, zoom);

  if (!primary) return null;

  return (
    <div className={className}>
      <div className="border border-border bg-secondary/60 p-6">
        <p className="eyebrow text-muted-foreground">Find Your Way</p>
        {image ? (
          <img src={image} alt="Map showing the destination location" width={800} height={400} loading="lazy" className="mt-4 w-full" />
        ) : (
          <p className="mt-3 font-display text-2xl">
            {primary.lat.toFixed(4)}, {primary.lng.toFixed(4)}
          </p>
        )}
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {markers.map((marker) => (
            <li key={marker.id}>{marker.label}</li>
          ))}
        </ul>
        <a
          href={maps.directionsUrl(primary, directionsLabel)}
          target="_blank"
          rel="noreferrer noopener"
          className="eyebrow mt-4 inline-flex items-center gap-2 border-b border-primary pb-1 text-primary"
        >
          Get directions
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
