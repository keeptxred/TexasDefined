import { useEffect, useMemo, useState } from 'react';

export type TexasReferenceMapRecord = {
  id: string;
  name: string;
  href: string;
  latitude: number;
  longitude: number;
  eyebrow?: string;
  detail?: string;
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

function project(latitude: number, longitude: number) {
  return {
    x: pad + ((longitude - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (mapWidth - pad * 2),
    y: pad + ((bounds.maxLat - latitude) / (bounds.maxLat - bounds.minLat)) * (mapHeight - pad * 2),
  };
}

const outlinePoints = texasOutline.map(([longitude, latitude]) => {
  const point = project(latitude, longitude);
  return `${point.x},${point.y}`;
}).join(' ');

function valid(record: TexasReferenceMapRecord) {
  return Number.isFinite(record.latitude)
    && Number.isFinite(record.longitude)
    && record.latitude >= bounds.minLat
    && record.latitude <= bounds.maxLat
    && record.longitude >= bounds.minLon
    && record.longitude <= bounds.maxLon;
}

export function TexasReferenceMap({ records, title, description }: { records: TexasReferenceMapRecord[]; title: string; description: string }) {
  const visible = useMemo(() => records.filter(valid), [records]);
  const [selectedId, setSelectedId] = useState(visible[0]?.id ?? '');

  useEffect(() => {
    if (!visible.some((record) => record.id === selectedId)) setSelectedId(visible[0]?.id ?? '');
  }, [selectedId, visible]);

  const selected = visible.find((record) => record.id === selectedId) ?? visible[0];
  if (!visible.length) return <p className="border-y border-border py-8 text-sm leading-7 text-muted-foreground">Map view is unavailable because the current filtered records do not have verified coordinates.</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="overflow-hidden border border-border bg-surface p-2 sm:p-5">
        <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="texas-reference-map-title texas-reference-map-desc" className="h-auto w-full">
          <title id="texas-reference-map-title">{title}</title>
          <desc id="texas-reference-map-desc">{description}</desc>
          <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
          {[30, 32, 34, 36].map((latitude) => {
            const y = project(latitude, -100).y;
            return <g key={latitude}><line x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 8" /><text x={pad + 4} y={y - 5} className="fill-muted-foreground text-[11px]">{latitude}°N</text></g>;
          })}
          {[-104, -102, -100, -98, -96, -94].map((longitude) => {
            const x = project(31, longitude).x;
            return <g key={longitude}><line y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 8" /><text x={x + 4} y={mapHeight - pad - 5} className="fill-muted-foreground text-[11px]">{Math.abs(longitude)}°W</text></g>;
          })}
          <polyline points={outlinePoints} className="fill-background stroke-foreground/40" strokeWidth="3" />
          {visible.map((record) => {
            const point = project(record.latitude, record.longitude);
            const isSelected = selected?.id === record.id;
            return (
              <g
                key={record.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${record.name}`}
                onClick={() => setSelectedId(record.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedId(record.id);
                  }
                }}
                className="cursor-pointer focus:outline-none"
              >
                <circle cx={point.x} cy={point.y} r={isSelected ? 10 : 7} className={isSelected ? 'fill-primary stroke-background' : 'fill-foreground stroke-background'} strokeWidth="3"><title>{record.name}</title></circle>
                {isSelected ? <text x={point.x + 13} y={point.y + 4} className="fill-foreground text-[12px] font-semibold">{record.name}</text> : null}
              </g>
            );
          })}
        </svg>
        <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">The Texas outline is simplified for orientation. Pins use the coordinates stored with each source-backed TexasDefined record and should not be interpreted as entrances, property boundaries or shoreline access points.</p>
      </div>
      <aside className="border-t-2 border-foreground pt-6">
        {selected ? <>
          {selected.eyebrow ? <p className="eyebrow text-primary">{selected.eyebrow}</p> : null}
          <h3 className="mt-3 font-display text-3xl leading-tight">{selected.name}</h3>
          {selected.detail ? <p className="mt-4 text-sm leading-7 text-muted-foreground">{selected.detail}</p> : null}
          <a href={selected.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open record →</a>
        </> : null}
      </aside>
    </div>
  );
}

export default TexasReferenceMap;
