import { PublishableGraphic } from "@/components/editorial/PublishableGraphic";

export type TexasGraphicPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
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

function project(lat: number, lng: number) {
  return {
    x: pad + ((lng - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (mapWidth - pad * 2),
    y: pad + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * (mapHeight - pad * 2),
  };
}

const outlinePoints = texasOutline.map(([lng, lat]) => {
  const point = project(lat, lng);
  return `${point.x},${point.y}`;
}).join(" ");

export function TexasPointMapGraphic({
  id,
  title,
  description,
  points,
  filename,
  sourceNote,
  methodologyHref = "/sourcing-methodology",
}: {
  id: string;
  title: string;
  description: string;
  points: TexasGraphicPoint[];
  filename: string;
  sourceNote: string;
  methodologyHref?: string;
}) {
  const visible = points.filter((point) =>
    Number.isFinite(point.lat)
    && Number.isFinite(point.lng)
    && point.lat >= bounds.minLat
    && point.lat <= bounds.maxLat
    && point.lng >= bounds.minLon
    && point.lng <= bounds.maxLon,
  );

  return <figure className="overflow-hidden border border-border bg-surface">
    <div className="p-3 sm:p-6">
      <svg id={id} viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="h-auto w-full">
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
        {[30, 32, 34, 36].map((lat) => {
          const y = project(lat, -100).y;
          return <g key={lat}><line x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 8" /><text x={pad + 4} y={y - 5} className="fill-muted-foreground text-[11px]">{lat}°N</text></g>;
        })}
        {[-104, -102, -100, -98, -96, -94].map((lng) => {
          const x = project(31, lng).x;
          return <g key={lng}><line y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 8" /><text x={x + 4} y={mapHeight - pad - 5} className="fill-muted-foreground text-[11px]">{Math.abs(lng)}°W</text></g>;
        })}
        <polyline points={outlinePoints} className="fill-background stroke-foreground/40" strokeWidth="3" />
        <g>
          {visible.map((point) => {
            const { x, y } = project(point.lat, point.lng);
            return <circle key={point.id} cx={x} cy={y} r="6" className="fill-primary stroke-background" strokeWidth="2"><title>{point.name}{point.detail ? ` · ${point.detail}` : ""}</title></circle>;
          })}
        </g>
        <g className="fill-foreground">
          <rect x="48" y="48" width="250" height="70" rx="2" className="fill-background stroke-border" />
          <text x="68" y="76" className="fill-muted-foreground text-[11px] font-semibold" style={{ letterSpacing: "0.08em" }}>TEXASDEFINED ORIGINAL</text>
          <text x="68" y="99" className="fill-foreground text-[18px] font-semibold">{visible.length} mapped locations</text>
        </g>
      </svg>
      <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">Texas outline simplified for orientation. Hover or focus in a supporting browser to identify plotted locations. Exact access points, legal boundaries and property entrances should be verified with the responsible source.</p>
      <PublishableGraphic targetId={id} filename={filename} title={title} methodologyHref={methodologyHref} sourceNote={sourceNote} compact />
    </div>
  </figure>;
}
