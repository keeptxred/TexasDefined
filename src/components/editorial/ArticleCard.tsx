import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { cn } from "@/lib/utils";

const editorialLabel = (value: string) =>
  value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

export function ArticleCard({
  article,
  size = "default",
  eager = false,
  className,
}: {
  article: Article;
  size?: "compact" | "default" | "feature";
  eager?: boolean;
  className?: string;
}) {
  const brand = useBrand();
  const sectionLabel = editorialLabel(article.tags[0] ?? article.category);

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="block overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden
      >
        <img
          src={article.hero.src}
          alt={article.hero.alt}
          width={article.hero.width}
          height={article.hero.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]",
            size === "compact" && "aspect-[4/3]",
            size === "default" && "aspect-[3/2]",
            size === "feature" && "aspect-[16/10]",
          )}
        />
      </Link>
      <div className={cn("flex flex-1 flex-col", size === "compact" ? "pt-3" : "pt-4")}>
        <p className="eyebrow text-primary">{sectionLabel}</p>
        <h3
          className={cn(
            "mt-2 font-display leading-snug",
            size === "compact" && "text-lg",
            size === "default" && "text-2xl",
            size === "feature" && "text-3xl sm:text-4xl",
          )}
        >
          <Link
            to="/article/$slug"
            params={{ slug: article.slug }}
            className="transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
        {size !== "compact" && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.dek}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {formatDate(article.publishedAt, brand.identity.locale)} ·{" "}
          {formatReadingTime(article.readingMinutes)}
        </p>
      </div>
    </article>
  );
}
