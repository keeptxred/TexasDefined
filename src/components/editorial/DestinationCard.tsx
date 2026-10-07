import { Link } from "@tanstack/react-router";

import caddoLake from "@/assets/caddo-lake.jpg";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";
import type { Destination } from "@/data/types";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { cn } from "@/lib/utils";

type DestinationCardDestination = Pick<Destination, "slug" | "name" | "summary" | "nearestTown" | "county" | "hero" | "bestSeason" | "highlights" | "sourceCheckedAt">;

function countyLabel(value?: string) {
  if (!value) return undefined;
  return /\bcount(?:y|ies)\b/i.test(value) ? value : `${value} County`;
}

function locationLabel(destination: DestinationCardDestination, regionLabel?: string) {
  return [destination.nearestTown, countyLabel(destination.county), regionLabel]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" · ");
}

function checkedLabel(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return `Updated ${date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

function cardHighlights(destination: DestinationCardDestination) {
  return destination.highlights
    .map((item) => item.trim())
    .filter((item) => /[\p{L}\p{N}]/u.test(item))
    .slice(0, 3);
}

function destinationAccent(destination: DestinationCardDestination) {
  const haystack = `${destination.name} ${destination.summary} ${destination.highlights.join(" ")}`.toLowerCase();
  if (/lake|river|spring|water|beach|coast|island|bay|gulf/.test(haystack)) return "oklch(0.58 0.105 218)";
  if (/forest|pine|trail|wildlife|refuge|park|canyon/.test(haystack)) return "oklch(0.46 0.09 148)";
  if (/historic|museum|mission|fort|courthouse|heritage/.test(haystack)) return "oklch(0.55 0.13 38)";
  if (/desert|big bend|mountain|mesa/.test(haystack)) return "oklch(0.71 0.105 70)";
  if (/garden|flower|botanic|prairie/.test(haystack)) return "oklch(0.79 0.09 92)";
  return "oklch(0.48 0.145 278)";
}

const caddoAlt = "Cypress trees draped in Spanish moss at Caddo Lake in East Texas";
const destinationCardImageFallbacks: Record<string, { src: string; alt: string }> = {
  "caddo-lake-national-wildlife-refuge": { src: caddoLake, alt: caddoAlt },
};

function cardHero(destination: DestinationCardDestination) {
  return destination.slug === "caddo-lake"
    ? { src: caddoLake, alt: caddoAlt, width: 1600, height: 1067 }
    : destination.hero;
}

function hasEditorialImage(destination: DestinationCardDestination) {
  return !isDestinationPhotoPlaceholder(cardHero(destination).src);
}

function DestinationImage({ destination, eager, overlay, accent }: { destination: DestinationCardDestination; eager: boolean; overlay: boolean; accent: string }) {
  const hero = cardHero(destination);
  if (isDestinationPhotoPlaceholder(hero.src)) return null;

  return <div data-image-frame className={cn(overlay ? "aspect-[4/5]" : "aspect-[3/2]", "relative w-full overflow-hidden bg-muted")}>
    <img src={hero.src} alt={hero.alt || `${destination.name}, Texas`} width={hero.width || 1600} height={hero.height || 1067} sizes={overlay ? "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" onError={(event) => recoverOrHideImage(event.currentTarget, destinationCardImageFallbacks[destination.slug])} />
    <div aria-hidden style={{ position: "absolute", insetInline: 0, bottom: 0, height: "6rem", background: `linear-gradient(to top, color-mix(in oklch, ${accent} 18%, transparent), transparent)` }} />
  </div>;
}

export function DestinationCard({ destination, regionLabel, tone = "light", eager = false, className }: { destination: DestinationCardDestination; regionLabel?: string; tone?: "light" | "overlay"; eager?: boolean; className?: string }) {
  const location = locationLabel(destination, regionLabel);
  const sourceChecked = checkedLabel(destination.sourceCheckedAt);
  const highlights = cardHighlights(destination);
  const hasImage = hasEditorialImage(destination);
  const accent = destinationAccent(destination);

  if (tone === "overlay") return <Link to="/destination/$slug" params={{ slug: destination.slug }} className={cn("group relative block min-h-[22rem] overflow-hidden", hasImage ? "bg-muted" : "bg-ink", className)} style={{ borderRadius: "0.4rem", boxShadow: "var(--shadow-soft)", borderTop: `4px solid ${accent}` }}><DestinationImage destination={destination} eager={eager} overlay accent={accent} /><div className={cn("absolute inset-0", hasImage ? "bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" : "bg-ink")} /><div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground sm:p-7">{location && <p className="eyebrow line-clamp-2 opacity-75">{location}</p>}<h3 className="mt-2 line-clamp-2 font-display text-[2rem] leading-[1.02]">{destination.name}</h3><p className="mt-3 line-clamp-2 max-w-md text-sm leading-6 opacity-85">{destination.summary}</p><span className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-ink-foreground/70 pb-1">Explore this place <span aria-hidden="true">→</span></span></div></Link>;

  return <article className={cn("group", className)} style={{ display: "flex", height: "100%", flexDirection: "column", overflow: "hidden", borderRadius: "0.4rem", border: "1px solid var(--border)", background: "var(--card)", boxShadow: "var(--shadow-soft)" }}>{hasImage ? <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block overflow-hidden bg-muted" tabIndex={-1} aria-hidden><DestinationImage destination={destination} eager={eager} overlay={false} accent={accent} /></Link> : <div aria-hidden style={{ minHeight: "6rem", background: `color-mix(in oklch, ${accent} 15%, var(--surface))` }} />}<div style={{ position: "relative", display: "flex", flex: "1 1 auto", flexDirection: "column", padding: "1.25rem" }}><div aria-hidden style={{ position: "absolute", insetInline: 0, top: 0, height: "0.25rem", background: accent }} />{location && <p className="eyebrow" style={{ color: accent }}>{location}</p>}<h3 className="mt-2 font-display text-[1.8rem] leading-[1.05]"><Link to="/destination/$slug" params={{ slug: destination.slug }} className="transition-colors hover:text-primary">{destination.name}</Link></h3><p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">{destination.summary}</p>{(destination.bestSeason || sourceChecked) && <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{destination.bestSeason && <span>Best season: {destination.bestSeason}</span>}{sourceChecked && <span>{sourceChecked}</span>}</div>}{highlights.length > 0 && <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label={`${destination.name} highlights`}>{highlights.map((highlight) => <li key={highlight} className="text-xs text-foreground/75 after:ml-3 after:text-border after:content-['•'] last:after:hidden">{highlight}</li>)}</ul>}<Link to="/destination/$slug" params={{ slug: destination.slug }} className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-primary">Explore this place <span aria-hidden="true">→</span></Link></div></article>;
}
