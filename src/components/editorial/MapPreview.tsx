import { useState } from "react";
import { ExternalLink } from "lucide-react";

import type { GeoPoint } from "@/data/types";
import { maps, type MapMarker } from "@/services/maps";

export function MapPreview({
  markers,
  zoom = 9,
  directionsLabel,
  origin,
  originLabel,
  className,
}: {
  markers: MapMarker[];
  zoom?: number;
  directionsLabel: string;
  origin?: GeoPoint;
  originLabel?: string;
  className?: string;
}) {
  const validMarkers = markers.filter(({ point: primary }) => Number.isFinite(primary.lat) && Number.isFinite(primary.lng) && primary.lat >= -90 && primary.lat <= 90 && primary.lng >= -180 && primary.lng <= 180 && !(primary.lat === 0 && primary.lng === 0));
  const primary = validMarkers[0];
  const image = maps.staticImageUrl(validMarkers, zoom);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const showImage = Boolean(image && failedImage !== image);
  if (!primary) return null;

  return (
    <div className={className}>
      <div className="border-t-2 border-foreground pt-5">
        <p className="eyebrow text-primary">Map & routes</p>
        {showImage && image ? <img src={image} alt={`Map showing ${directionsLabel}`} width={800} height={400} loading="lazy" className="mt-4 w-full" onError={() => setFailedImage(image)} /> : <p className="mt-3 font-display text-2xl">Find it on the map and compare routes</p>}
        <ul className="mt-4 space-y-1 text-sm leading-6 text-muted-foreground">{validMarkers.map((marker) => <li key={marker.id}>
          {marker.label}{origin ? <> · <a href={maps.drivingRouteUrl(origin, marker.point)} target="_blank" rel="noreferrer noopener" className="text-primary">Drive from {originLabel ?? "metro center"}</a></> : null}
        </li>)}</ul>
        {!origin && <a href={maps.directionsUrl(primary.point, primary.label)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-primary">View {primary.label} on map <ExternalLink className="size-3.5" aria-hidden /></a>}
      </div>
    </div>
  );
}
