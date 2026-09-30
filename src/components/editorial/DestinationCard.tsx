import { Link } from "@tanstack/react-router";

import caddoLake from "@/assets/caddo-lake.jpg";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";
import type { Destination } from "@/data/types";

type DestinationCardDestination = Pick<Destination, "slug" | "name" | "summary" | "nearestTown" | "county" | "hero" | "bestSeason" | "highlights" | "sourceCheckedAt">;
import { cn } from "@/lib/utils";

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

const destinationCardImageFallbacks: Record<string, { src: string; alt: string }> = {
  "caddo-lake-national-wildlife-refuge": {
    src: caddoLake,
    alt: "Bald cypress trees draped in Spanish moss across the Caddo Lake ecosystem in East Texas",
  },
};

function cardHero(destination: DestinationCardDestination) {
  return destination.slug === "caddo-lake"
    ? { src: caddoLake, alt: "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn", width: 1600, height: 1067 }
    : destination.hero;
}

function hasEditorialImage(destination: DestinationCardDestination) {
  return !isDestinationPhotoPlaceholder(cardHero(destination).src);
}

function DestinationImage({ destination, eager, overlay }: { destination: DestinationCardDestination; eager: boolean; overlay: boolean }) {
  const frameClass = overlay ? "aspect-[4/5] w-full" : "aspect-[3/2] w-full";
  const imageClass = overlay
    ? "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
    : "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]";
  const hero = cardHero(destination);

  // A governed placeholder is not editorial imagery. Omit the media frame rather
  // than shipping a faux-photo gradient or an empty reserved image box.
  if (isDestinationPhotoPlaceholder(hero.src)) return null;

  return <div data-image-frame className={cn(frameClass, "relative overflow-hidden bg-muted")}>
    <img
      src={hero.src}
      alt={hero.alt || `${destination.name}, Texas`}
      width={hero.width || 1600}
      height={hero.height || 1067}
      sizes={overlay ? "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={cn("absolute inset-0", imageClass)}
      onError={(event) => {
        const image = event.currentTarget;
        const fallback = destinationCardImageFallbacks[destination.slug];
        if (fallback && image.dataset.fallback !== "local") {
          image.dataset.fallback = "local";
          image.src = fallback.src;
          image.alt = fallback.alt;
          return;
        }
        const frame = image.closest<HTMLElement>("[data-image-frame]");
        if (frame) frame.style.display = "none";
        else image.style.display = "none";
      }}
    />
  </div>;
}

export function DestinationCard({ destination, regionLabel, tone = "light", eager = false, className }: { destination: DestinationCardDestination; regionLabel?: string; tone?: "light" | "overlay"; eager?: boolean; className?: string }) {
  const location = locationLabel(destination, regionLabel);
  const sourceChecked = checkedLabel(destination.sourceCheckedAt);
  const highlights = cardHighlights(destination);
  const hasImage = hasEditorialImage(destination);

  if (tone === "overlay") {
    return <Link to="/destination/$slug" params={{ slug: destination.slug }} className={cn("group relative block min-h-[22rem] overflow-hidden", hasImage ? "bg-muted" : "bg-ink", className)}>
      <DestinationImage destination={destination} eager={eager} overlay />
      <div className={cn("absolute inset-0", hasImage ? "bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" : "bg-ink")} />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground sm:p-7">
        {location && <p className="eyebrow line-clamp-2 opacity-75">{location}</p>}
        <h3 className="mt-2 line-clamp-2 font-display text-[2rem] leading-[1.02]">{destination.name}</h3>
        <p className="mt-3 line-clamp-2 max-w-md text-sm leading-6 opacity-85">{destination.summary}</p>
        <span className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-ink-foreground/70 pb-1">Explore this place <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </Link>;
  }

  return <article className={cn("group", className)}>
    {hasImage ? <Link to="/destination/$slug" params={{ slug: destination.slug }} className="block overflow-hidden bg-muted" tabIndex={-1} aria-hidden>
      <DestinationImage destination={destination} eager={eager} overlay={false} />
    </Link> : null}
    <div className={cn("border-t border-border/70 pt-4", !hasImage && "border-t-0 pt-0")}>
      {location && <p className="eyebrow text-primary">{location}</p>}
      <h3 className="mt-2 font-display text-[1.8rem] leading-[1.05]"><Link to="/destination/$slug" params={{ slug: destination.slug }} className="transition-colors hover:text-primary">{destination.name}</Link></h3>
      <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">{destination.summary}</p>
      {(destination.bestSeason || sourceChecked) && <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">{destination.bestSeason && <span>Best season: {destination.bestSeason}</span>}{sourceChecked && <span>{sourceChecked}</span>}</div>}
      {highlights.length > 0 && <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label={`${destination.name} highlights`}>{highlights.map((highlight) => <li key={highlight} className="text-xs text-foreground/75 after:ml-3 after:text-border after:content-['•'] last:after:hidden">{highlight}</li>)}</ul>}
      <Link to="/destination/$slug" params={{ slug: destination.slug }} className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-primary">Explore this place <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link>
    </div>
  </article>;
}
