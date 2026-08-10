import { Link } from "@tanstack/react-router";

import caddoLake from "@/assets/caddo-lake.jpg";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";
import type { Destination } from "@/data/types";
import { cn } from "@/lib/utils";

function locationLabel(destination: Destination, regionLabel?: string) {
  return [destination.nearestTown, destination.county ? `${destination.county} County` : undefined, regionLabel]
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

function cardHighlights(destination: Destination) {
  return destination.highlights.map((item) => item.trim()).filter(Boolean).slice(0, 3);
}

function DestinationImage({ destination, eager, overlay }: { destination: Destination; eager: boolean; overlay: boolean }) {
  const imageClass = overlay
    ? "aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
    : "aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]";
  const hero = destination.slug === "caddo-lake"
    ? { src: caddoLake, alt: "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn", width: 1600, height: 1067 }
    : destination.hero;

  if (isDestinationPhotoPlaceholder(hero.src)) {
    return <div role="img" aria-label={`${destination.name} — destination-specific photograph not yet available`} className={cn(imageClass, "relative overflow-hidden bg-[linear-gradient(145deg,hsl(var(--muted)),hsl(var(--secondary))_52%,hsl(var(--primary)/0.18))]")}>
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_72%_24%,hsl(var(--primary))_0,transparent_28%),linear-gradient(160deg,transparent_42%,hsl(var(--ink)/0.28)_43%,hsl(var(--ink)/0.28)_58%,transparent_59%)]" />
      <span className="eyebrow absolute left-5 top-5 text-foreground/65">Photo coming soon</span>
    </div>;
  }

  return <img src={hero.src} alt={hero.alt || `${destination.name}, Texas`} width={hero.width || 1600} height={hero.height || 1067} sizes={overlay ? "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className={imageClass} />;
}

export function DestinationCard({ destination, regionLabel, tone = "light", eager = false, className }: { destination: Destination; regionLabel?: string; tone?: "light" | "overlay"; eager?: boolean; className?: string }) {
  const location = locationLabel(destination, regionLabel);
  const sourceChecked = checkedLabel(destination.sourceCheckedAt);
  const highlights = cardHighlights(destination);

  if (tone === "overlay") {
    return <Link to="/destination/$slug" params={{ slug: destination.slug }} className={cn("group relative block overflow-hidden bg-muted", className)}>
      <DestinationImage destination={destination} eager={eager} overlay />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground sm:p-7">
        {location && <p className="eyebrow line-clamp-2 opacity-75">{location}</p>}
        <h3 className="mt-2 line-clamp-2 font-display text-[2rem] leading-[1.02]">{destination.name}</h3>
        <p className="mt-3 line-clamp-2 max-w-md text-sm leading-6 opacity-85">{destination.summary}</p>
        <span className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-ink-foreground/70 pb-1">Explore this place <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </Link>;
  }

  return <article className={cn("group", className)}>
    <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block overflow-hidden bg-muted" tabIndex={-1} aria-hidden>
      <DestinationImage destination={destination} eager={eager} overlay={false} />
    </Link>
    <div className="border-t border-border/70 pt-4">
      {location && <p className="eyebrow text-primary">{location}</p>}
      <h3 className="mt-2 font-display text-[1.8rem] leading-[1.05]"><Link to="/destination/$slug" params={{ slug: destination.slug }} className="transition-colors hover:text-primary">{destination.name}</Link></h3>
      <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">{destination.summary}</p>
      {(destination.bestSeason || sourceChecked) && <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{destination.bestSeason && <span>Best season: {destination.bestSeason}</span>}{sourceChecked && <span>{sourceChecked}</span>}</div>}
      {highlights.length > 0 && <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label={`${destination.name} highlights`}>{highlights.map((highlight) => <li key={highlight} className="text-xs text-foreground/75 after:ml-3 after:text-border after:content-['•'] last:after:hidden">{highlight}</li>)}</ul>}
      <Link to="/destination/$slug" params={{ slug: destination.slug }} className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-primary">Explore this place <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link>
    </div>
  </article>;
}
