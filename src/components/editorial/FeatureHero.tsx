import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article, ImageRef } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";

/** Full-bleed hero. Content and copy come from props, never brand constants. */
export function FeatureHero({
  eyebrow,
  title,
  dek,
  image,
  to,
  params,
  meta,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  image: ImageRef;
  to: string;
  params?: Record<string, string>;
  meta?: string;
}) {
  const brand = useBrand();

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        decoding="async"
        className="animate-slow-zoom absolute inset-0 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="relative mx-auto flex min-h-[76vh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <p className="eyebrow animate-rise text-ink-foreground/80">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/85">
          {dek}
        </p>
        <div className="animate-rise mt-8 flex flex-wrap items-center gap-6">
          <Link
            to={to}
            params={params}
            className="eyebrow border-b-2 border-ink-foreground pb-1 transition-opacity hover:opacity-75"
          >
            {brand.copy.readMore}
          </Link>
          {meta && <p className="text-xs text-ink-foreground/70">{meta}</p>}
        </div>
      </div>
    </section>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  const brand = useBrand();
  return (
    <FeatureHero
      eyebrow={article.tags[0] ?? article.category}
      title={article.title}
      dek={article.dek}
      image={article.hero}
      to="/article/$slug"
      params={{ slug: article.slug }}
      meta={`${formatDate(article.publishedAt, brand.identity.locale)} · ${formatReadingTime(
        article.readingMinutes,
      )}`}
    />
  );
}
