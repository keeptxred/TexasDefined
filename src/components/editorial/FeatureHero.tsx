import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article, ImageRef } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";

/** Hero variants. `fullbleed` is for article/feature pages; `split` is for the homepage. */
interface FeatureHeroProps {
  eyebrow: string;
  title: string;
  dek: string;
  image: ImageRef;
  to: string;
  params?: Record<string, string>;
  meta?: string;
  variant?: "fullbleed" | "split";
}

/** Editorial hero. Supports a full-bleed immersive layout or a 40/60 split. */
export function FeatureHero({
  eyebrow,
  title,
  dek,
  image,
  to,
  params,
  meta,
  variant = "fullbleed",
}: FeatureHeroProps) {
  const brand = useBrand();

  if (variant === "split") {
    return (
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto flex min-h-[55vh] w-full max-w-7xl flex-col lg:min-h-[600px] lg:max-h-[700px] lg:flex-row">
          <div className="animate-rise relative z-10 flex w-full flex-col justify-center px-6 py-14 sm:px-8 lg:w-[42%] lg:px-14 lg:py-20">
            <p className="eyebrow text-ink-foreground/75">{eyebrow}</p>
            <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-foreground/85">
              {dek}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to={to}
                params={params}
                className="eyebrow group inline-flex items-center gap-2 border-b-2 border-ink-foreground pb-1 transition-opacity hover:opacity-75"
              >
                {brand.copy.readMore}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              {meta && <p className="text-xs text-ink-foreground/70">{meta}</p>}
            </div>
          </div>

          <div className="relative isolate min-h-[40vh] w-full lg:min-h-0 lg:w-[58%]">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              decoding="async"
              className="animate-slow-zoom absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>
    );
  }

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
