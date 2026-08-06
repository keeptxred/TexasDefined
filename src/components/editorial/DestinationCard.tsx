import { Link } from "@tanstack/react-router";

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
  return `Source checked ${date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

function cardHighlights(destination: Destination) {
  return destination.highlights
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function isPlaceholderImage(src: string) {
  return src.includes("texasdefined-destination-placeholder") || src.includes("texasdefined-placeholder");
}

function DestinationImage({ destination, eager, overlay }: { destination: Destination; eager: boolean; overlay: boolean }) {
  const imageClass = overlay
    ? "aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
    : "aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]";

  if (isPlaceholderImage(destination.hero.src)) {
    return (
      <div
        role="img"
        aria-label={destination.hero.alt || `${destination.name}, Texas`}
        className={cn(
          imageClass,
          "relative overflow-hidden bg-[linear-gradient(145deg,hsl(var(--muted)),hsl(var(--secondary))_52%,hsl(var(--primary)/0.28))]",
        )}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_72%_24%,hsl(var(--primary))_0,transparent_28%),linear-gradient(160deg,transparent_42%,hsl(var(--ink)/0.35)_43%,hsl(var(--ink)/0.35)_58%,transparent_59%)]" />
        <span className="eyebrow absolute left-5 top-5 text-foreground/65">Explore Texas</span>
      </div>
    );
  }

  return (
    <img
      src={destination.hero.src}
      alt={destination.hero.alt}
      width={destination.hero.width}
      height={destination.hero.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={imageClass}
    />
  );
}

export function DestinationCard({
  destination,
  regionLabel,
  tone = "light",
  eager = false,
  className,
}: {
  destination: Destination;
  regionLabel?: string | undefined;
  tone?: "light" | "overlay";
  eager?: boolean;
  className?: string | undefined;
}) {
  const location = locationLabel(destination, regionLabel);
  const sourceChecked = checkedLabel(destination.sourceCheckedAt);
  const highlights = cardHighlights(destination);

  if (tone === "overlay") {
    return (
      <Link
        to="/destination/$slug"
        params={{ slug: destination.slug }}
        className={cn("group relative block overflow-hidden bg-muted", className)}
      >
        <DestinationImage destination={destination} eager={eager} overlay />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
          {location && <p className="eyebrow line-clamp-2 opacity-80">{location}</p>}
          <h3 className="mt-1 line-clamp-2 font-display text-2xl leading-tight">{destination.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-5 opacity-85">{destination.summary}</p>
          {destination.bestSeason && <p className="mt-3 line-clamp-2 text-xs leading-5 opacity-80">Best time: {destination.bestSeason}</p>}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
            Plan a visit
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link
        to="/destination/$slug"
        params={{ slug: destination.slug }}
        className="block overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden
      >
        <DestinationImage destination={destination} eager={eager} overlay={false} />
      </Link>
      <div className="pt-4">
        {location && <p className="eyebrow text-primary">{location}</p>}
        <h3 className="mt-2 font-display text-2xl leading-snug">
          <Link
            to="/destination/$slug"
            params={{ slug: destination.slug }}
            className="transition-colors hover:text-primary"
          >
            {destination.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{destination.summary}</p>
        {(destination.bestSeason || sourceChecked) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {destination.bestSeason && <span>Best time: {destination.bestSeason}</span>}
            {sourceChecked && <span>{sourceChecked}</span>}
          </div>
        )}
        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${destination.name} highlights`}>
            {highlights.map((highlight) => (
              <li key={highlight} className="border border-border px-2.5 py-1 text-xs text-muted-foreground">
                {highlight}
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/destination/$slug"
          params={{ slug: destination.slug }}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Plan a visit
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
