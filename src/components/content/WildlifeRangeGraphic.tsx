import { PublishableGraphic } from "@/components/editorial/PublishableGraphic";

const regions = [
  { id: "trans-pecos", label: "Trans-Pecos" },
  { id: "hill-country", label: "Hill Country / Edwards" },
  { id: "south-texas", label: "South Texas" },
  { id: "lower-rio-grande", label: "Lower Rio Grande Valley" },
  { id: "east-gulf", label: "East Texas / Gulf Coast" },
  { id: "north-plains", label: "North Texas / Plains" },
] as const;

type RegionId = (typeof regions)[number]["id"];

type RangeGraphic = {
  regions: RegionId[];
  qualifier: string;
};

const wildlifeRanges: Record<string, RangeGraphic> = {
  "white-tailed-deer": {
    regions: ["trans-pecos", "hill-country", "south-texas", "lower-rio-grande", "east-gulf", "north-plains"],
    qualifier: "Occurs across most of Texas; abundance varies sharply with habitat, rainfall and management.",
  },
  javelina: {
    regions: ["trans-pecos", "hill-country", "south-texas"],
    qualifier: "Important populations are associated with South Texas brush country, the Trans-Pecos and portions of the Edwards Plateau.",
  },
  ocelot: {
    regions: ["south-texas", "lower-rio-grande"],
    qualifier: "Remaining Texas population is concentrated in South Texas and the Lower Rio Grande Valley, especially dense thornscrub habitat.",
  },
  "black-bear": {
    regions: ["trans-pecos"],
    qualifier: "Resident breeding populations are documented in parts of West Texas; dispersing individuals may appear well outside established breeding range.",
  },
  "mountain-lion": {
    regions: ["trans-pecos", "hill-country", "south-texas"],
    qualifier: "Important range includes the Trans-Pecos, South Texas brushlands and portions of the Hill Country; individuals can travel far beyond core areas.",
  },
  "american-alligator": {
    regions: ["east-gulf"],
    qualifier: "Texas alligator range is centered on wetter eastern and coastal landscapes with swamps, marshes, bayous, rivers and other suitable waters.",
  },
};

export function WildlifeRangeGraphic({ slug, speciesName }: { slug: string; speciesName: string }) {
  const range = wildlifeRanges[slug];
  if (!range) return null;

  const width = 900;
  const height = 330;
  const startX = 42;
  const top = 112;
  const cellWidth = 130;
  const gap = 8;

  return <section className="border-b border-border py-12" aria-labelledby={`${slug}-range-graphic-heading`}>
    <div className="grid gap-8 lg:grid-cols-4">
      <div>
        <p className="eyebrow text-primary">Range graphic</p>
        <h2 id={`${slug}-range-graphic-heading`} className="mt-2 font-display text-4xl">{speciesName} range at a glance</h2>
      </div>
      <figure className="max-w-4xl overflow-hidden border border-border bg-surface p-3 sm:p-6 lg:col-span-3">
        <svg id={`${slug}-texas-range-graphic`} viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${slug}-range-title ${slug}-range-desc`} className="h-auto w-full">
          <title id={`${slug}-range-title`}>{speciesName} broad Texas range by region</title>
          <desc id={`${slug}-range-desc`}>{range.qualifier} Highlighted cells show broad regions associated with established or important range, not exact distribution boundaries.</desc>
          <rect width={width} height={height} className="fill-background" />
          <text x="42" y="45" className="fill-foreground font-semibold" style={{ fontSize: 24 }}>{speciesName} · broad Texas range</text>
          <text x="42" y="72" className="fill-muted-foreground" style={{ fontSize: 12 }}>TexasDefined.com · regional orientation, not a precision sighting map</text>
          {regions.map((region, index) => {
            const active = range.regions.includes(region.id);
            const x = startX + index * (cellWidth + gap);
            return <g key={region.id}>
              <rect x={x} y={top} width={cellWidth} height="92" rx="3" className={active ? "fill-primary" : "fill-muted-foreground"} opacity={active ? 1 : 0.18} />
              <text x={x + cellWidth / 2} y={top + 111} className="fill-foreground font-semibold" style={{ fontSize: 11 }} textAnchor="middle">
                {region.label.split(" / ").map((part, partIndex) => <tspan key={part} x={x + cellWidth / 2} dy={partIndex === 0 ? 0 : 15}>{part}</tspan>)}
              </text>
              <text x={x + cellWidth / 2} y={top + 55} className={active ? "fill-background font-semibold" : "fill-muted-foreground font-semibold"} style={{ fontSize: 13 }} textAnchor="middle">{active ? "CORE / IMPORTANT" : "NOT SHOWN AS CORE"}</text>
            </g>;
          })}
          <text x="42" y="290" className="fill-muted-foreground" style={{ fontSize: 12 }}>{range.qualifier}</text>
        </svg>
        <p className="border-t border-border px-2 pt-4 text-xs leading-6 text-muted-foreground">This is intentionally a broad regional graphic. Wildlife range is continuous and patchy rather than confined to these boxes, and individual animals may occur outside core areas. Use current TPWD information for management, legal or safety decisions.</p>
        <PublishableGraphic
          targetId={`${slug}-texas-range-graphic`}
          filename={`${slug}-texas-range`}
          title={`${speciesName} broad Texas range`}
          methodologyHref="/sourcing-methodology"
          sourceNote="The highlighted regions summarize the TPWD-grounded range language used in this TexasDefined species profile. They do not represent exact habitat polygons, current population density or a live sighting map."
          compact
        />
      </figure>
    </div>
  </section>;
}
