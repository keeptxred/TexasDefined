import { useState } from "react";

import type { GeoPoint } from "@/data/types";

export type FishingMapResult = {
  id: string;
  name: string;
  href: string;
  region: string;
  coordinates: GeoPoint;
  fullGuide: boolean;
  distanceMiles: number | null;
  matchedSpecies: string[];
};

const bounds = { minLon: -106.8, maxLon: -93.45, minLat: 25.65, maxLat: 36.7 };
const mapWidth = 860;
const mapHeight = 620;
const pad = 30;

const texasOutline = [
  [-106.65, 31.76], [-103.0, 31.76], [-103.0, 36.5], [-100.0, 36.5], [-100.0, 34.56],
  [-99.2, 34.15], [-97.0, 33.85], [-94.05, 33.55], [-94.05, 29.7], [-95.2, 29.15],
  [-96.3, 28.5], [-97.4, 27.1], [-97.2, 25.85], [-99.0, 26.4], [-100.1, 28.2],
  [-101.4, 29.8], [-103.1, 29.0], [-104.7, 29.7], [-106.65, 31.76],
] as const;

function project(point: GeoPoint) {
  return {
    x: pad + ((point.lng - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (mapWidth - pad * 2),
    y: pad + ((bounds.maxLat - point.lat) / (bounds.maxLat - bounds.minLat)) * (mapHeight - pad * 2),
  };
}

const outlinePoints = texasOutline.map(([lng, lat]) => {
  const projected = project({ lat, lng });
  return `${projected.x},${projected.y}`;
}).join(" ");

export function FishingResultsMap({ rows }: { rows: FishingMapResult[] }) {
  const visible = rows.filter((row) =>
    Number.isFinite(row.coordinates.lat)
    && Number.isFinite(row.coordinates.lng)
    && row.coordinates.lat >= bounds.minLat
    && row.coordinates.lat <= bounds.maxLat
    && row.coordinates.lng >= bounds.minLon
    && row.coordinates.lng <= bounds.maxLon,
  );
  const [selectedId, setSelectedId] = useState(visible[0]?.id ?? "");
  const selected = visible.find((row) => row.id === selectedId) ?? visible[0];

  if (!visible.length) {
    return <p className="mt-7 border-y border-border py-8 text-sm leading-7 text-muted-foreground">These matching lake records do not yet have verified coordinates, so map view is unavailable for this result set. Switch to List to open the lake profiles.</p>;
  }

  return <div className="mt-7 grid gap-8 lg:grid-cols-2">
    <div className="overflow-hidden border border-border bg-surface p-2 sm:p-5">
      <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="fishing-map-title fishing-map-desc" className="h-auto w-full">
        <title id="fishing-map-title">Map of matching Texas fishing lakes</title>
        <desc id="fishing-map-desc">A simplified Texas outline with matching fishing lakes positioned from published latitude and longitude records. Select a lake pin to inspect the result.</desc>
        <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
        {[30, 32, 34, 36].map((lat) => {
          const y = project({ lat, lng: -100 }).y;
          return <g key={lat}><line x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 8" /><text x={pad + 4} y={y - 5} className="fill-muted-foreground text-[11px]">{lat}°N</text></g>;
        })}
        {[-104, -102, -100, -98, -96, -94].map((lng) => {
          const x = project({ lat: 31, lng }).x;
          return <g key={lng}><line y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 8" /><text x={x + 4} y={mapHeight - pad - 5} className="fill-muted-foreground text-[11px]">{Math.abs(lng)}°W</text></g>;
        })}
        <polyline points={outlinePoints} className="fill-background stroke-foreground/40" strokeWidth="3" />
        {visible.map((row) => {
          const { x, y } = project(row.coordinates);
          const selectedPin = selected?.id === row.id;
          return <g
            key={row.id}
            role="button"
            tabIndex={0}
            aria-label={`Select ${row.name}`}
            onClick={() => setSelectedId(row.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedId(row.id);
              }
            }}
            className="cursor-pointer focus:outline-none"
          >
            <circle cx={x} cy={y} r={selectedPin ? 10 : 7} className={selectedPin ? "fill-primary stroke-background" : "fill-foreground stroke-background"} strokeWidth="3">
              <title>{row.name}{row.distanceMiles != null ? ` · ${Math.round(row.distanceMiles)} miles` : ""}</title>
            </circle>
            {selectedPin ? <text x={x + 13} y={y + 4} className="fill-foreground text-[12px] font-semibold">{row.name}</text> : null}
          </g>;
        })}
      </svg>
      <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">The Texas outline is simplified for orientation. Lake pins use the published coordinates in the TexasDefined fishing catalog; the map does not imply shoreline-access coordinates.</p>
    </div>

    <aside className="border-t-2 border-foreground pt-6">
      {selected ? <>
        <p className="eyebrow text-primary">Selected lake</p>
        <h3 className="mt-3 font-display text-3xl leading-tight">{selected.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{formatRegion(selected.region)} · {selected.fullGuide ? "Full fishing guide" : "Lake profile"}</p>
        {selected.distanceMiles != null ? <p className="mt-4 font-display text-2xl">{Math.round(selected.distanceMiles)} miles away</p> : null}
        {selected.matchedSpecies.length ? <div className="mt-6"><p className="eyebrow text-muted-foreground">Matching fish</p><div className="mt-3 flex flex-wrap gap-2">{selected.matchedSpecies.map((name) => <span key={name} className="border border-border px-3 py-1.5 text-xs">{name}</span>)}</div></div> : null}
        <a href={selected.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {selected.name} →</a>
      </> : null}
    </aside>
  </div>;
}

function formatRegion(value: string) {
  if (value === "prairies-lakes") return "Prairies & Lakes";
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
