import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { cn } from "@/lib/utils";

const SECTION_LABELS: Record<string, string> = {
  "moving-to-texas": "Moving Here",
  "home-garden": "Front Porch",
  "texas-history": "Then & Now",
  "food-bbq": "The Texas Table",
  outdoors: "Wild Texas",
  "real-estate": "Putting Down Roots",
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

const editorialLabel = (value: string) => SECTION_LABELS[value.toLowerCase()] ?? value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());

export function ArticleCard({ article, size = "default", eager = false, className }: { article: Article; size?: "compact" | "default" | "feature"; eager?: boolean; className?: string; }) {
  const brand = useBrand();
  const sectionLabel = editorialLabel(article.category || article.tags[0] || "Story");

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block overflow-hidden bg-muted" tabIndex={-1} aria-hidden>
        <img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} loading={eager ? "eager" : "lazy"} decoding="async" className={cn("w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]", size === "compact" && "aspect-[4/3]", size === "default" && "aspect-[3/2]", size === "feature" && "aspect-[16/10]")} />
      </Link>
      <div className={cn("flex flex-1 flex-col", size === "compact" ? "pt-4" : "pt-5")}>
        <p className="eyebrow text-primary">{sectionLabel}</p>
        <h3 className={cn("mt-2 font-display font-semibold leading-[1.08]", size === "compact" && "text-[1.45rem]", size === "default" && "text-[1.85rem]", size === "feature" && "text-[2.3rem] sm:text-[2.75rem]")}>
          <Link to="/article/$slug" params={{ slug: article.slug }} className="transition-colors hover:text-primary">{article.title}</Link>
        </h3>
        {size !== "compact" && <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground">{article.dek}</p>}
        <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">{formatDate(article.publishedAt, brand.identity.locale)} · {formatReadingTime(article.readingMinutes)}</p>
      </div>
    </article>
  );
}
