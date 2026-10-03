import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { cn } from "@/lib/utils";

const SECTION_LABELS: Record<string, string> = {
  "moving-to-texas": "Moving Here",
  "home-garden": "Front Porch",
  "texas-history": "Then & Now",
  "food-bbq": "The Texas Table",
  outdoors: "Wild Texas",
  "real-estate": "Homes and Land",
  sports: "The Texas Game",
  "lakes-rivers": "Lakes & Rivers",
  "state-parks": "State Parks",
  "national-parks": "National Parks",
  "road-trips": "Road Trips",
  "small-towns": "Small Towns",
  "beaches-coast": "Beaches & Coast",
  caverns: "Caverns & Caves",
  "major-springs": "Springs & Swimming",
  "historic-sites": "Historic Sites",
  guides: "The Texas Guidebook",
};

const SECTION_ACCENTS: Record<string, string> = {
  "moving-to-texas": "oklch(0.79 0.09 92)",
  "home-garden": "oklch(0.52 0.075 58)",
  "texas-history": "oklch(0.55 0.13 38)",
  "food-bbq": "oklch(0.69 0.15 52)",
  outdoors: "oklch(0.46 0.09 148)",
  "real-estate": "oklch(0.52 0.075 58)",
  sports: "oklch(0.48 0.145 278)",
  "lakes-rivers": "oklch(0.58 0.105 218)",
  "state-parks": "oklch(0.66 0.065 135)",
  "national-parks": "oklch(0.71 0.105 70)",
  "road-trips": "oklch(0.69 0.15 52)",
  "small-towns": "oklch(0.52 0.075 58)",
  "beaches-coast": "oklch(0.58 0.105 218)",
  caverns: "oklch(0.55 0.13 38)",
  "major-springs": "oklch(0.68 0.105 190)",
  "historic-sites": "oklch(0.55 0.13 38)",
  guides: "oklch(0.48 0.145 278)",
};

const editorialLabel = (value: string) => SECTION_LABELS[value.toLowerCase()] ?? value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());

function cardSizes(size: "compact" | "default" | "feature") {
  if (size === "compact") return "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw";
  if (size === "feature") return "(min-width: 1024px) 58vw, 100vw";
  return "(min-width: 1024px) 45vw, (min-width: 640px) 48vw, 100vw";
}

export function ArticleCard({ article, size = "default", eager = false, className }: { article: Article; size?: "compact" | "default" | "feature"; eager?: boolean; className?: string; }) {
  const brand = useBrand();
  const sectionKey = (article.category || article.tags[0] || "Story").toLowerCase();
  const sectionLabel = editorialLabel(sectionKey);
  const accent = SECTION_ACCENTS[sectionKey] ?? "oklch(0.48 0.145 278)";

  return (
    <article
      className={cn("group flex flex-col", className)}
      style={{ height: "100%", overflow: "hidden", borderRadius: "0.4rem", border: "1px solid var(--border)", borderTop: `4px solid ${accent}`, background: "var(--card)", boxShadow: "var(--shadow-soft)" }}
    >
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block overflow-hidden bg-muted" tabIndex={-1} aria-hidden>
        <div className={cn("relative w-full overflow-hidden bg-muted", size === "compact" && "aspect-[4/3]", size === "default" && "aspect-[3/2]", size === "feature" && "aspect-[16/10]")}>
          <img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} sizes={cardSizes(size)} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" onError={(event) => recoverOrHideImage(event.currentTarget)} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-20" style={{ background: `linear-gradient(to top, color-mix(in oklch, ${accent} 18%, transparent), transparent)` }} />
        </div>
      </Link>
      <div className={cn("flex flex-1 flex-col", size === "compact" ? "pt-4" : "pt-5")} style={{ paddingInline: size === "compact" ? "1rem" : "1.25rem", paddingBottom: size === "compact" ? "1rem" : "1.25rem", background: `linear-gradient(180deg, color-mix(in oklch, ${accent} 4%, var(--card)), var(--card))` }}>
        <p className="eyebrow" style={{ color: accent }}>{sectionLabel}</p>
        <h3 className={cn("mt-2 font-display font-semibold leading-[1.08]", size === "compact" && "text-[1.45rem]", size === "default" && "text-[1.85rem]", size === "feature" && "text-[2.3rem] sm:text-[2.75rem]")}>
          <Link to="/article/$slug" params={{ slug: article.slug }} className="transition-colors hover:text-primary">{article.title}</Link>
        </h3>
        {size !== "compact" && <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground">{article.dek}</p>}
        <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">{formatDate(article.publishedAt, brand.identity.locale)} · {formatReadingTime(article.readingMinutes)}</p>
      </div>
    </article>
  );
}
