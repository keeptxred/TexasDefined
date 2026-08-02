import { Link } from "@tanstack/react-router";

import type { Destination } from "@/data/types";
import { cn } from "@/lib/utils";

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
  if (tone === "overlay") {
    return (
      <Link
        to="/destination/$slug"
        params={{ slug: destination.slug }}
        className={cn("group relative block overflow-hidden", className)}
      >
        <img
          src={destination.hero.src}
          alt={destination.hero.alt}
          width={destination.hero.width}
          height={destination.hero.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
          {regionLabel && <p className="eyebrow opacity-80">{regionLabel}</p>}
          <h3 className="mt-1 font-display text-2xl">{destination.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm opacity-85">{destination.summary}</p>
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
        <img
          src={destination.hero.src}
          alt={destination.hero.alt}
          width={destination.hero.width}
          height={destination.hero.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="pt-4">
        {regionLabel && <p className="eyebrow text-primary">{regionLabel}</p>}
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
      </div>
    </article>
  );
}
