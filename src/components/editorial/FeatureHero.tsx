import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import type { Article, ImageRef } from "@/data/types";
import { formatDate, formatReadingTime } from "@/domain/utils/format";

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

const CATEGORY_LABELS: Record<string, string> = {
  "moving-to-texas": "Moving Here",
  "home-garden": "Front Porch",
  "real-estate": "Homes and Land",
  "texas-history": "Then & Now",
  "food-bbq": "The Texas Table",
  outdoors: "Wild Texas",
  sports: "The Texas Game",
};

function editorialLabel(value: string) {
  return (
    CATEGORY_LABELS[value] ??
    value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

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
      <section className="relative isolate overflow-hidden bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:h-[600px] lg:flex-row">
          <div className="animate-rise relative z-20 flex w-full flex-col justify-center bg-background px-6 py-14 sm:px-10 lg:w-[40%] lg:px-16 lg:py-0">
            <p className="eyebrow text-primary">{editorialLabel(eyebrow)}</p>
            <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.06] text-ink sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              {dek}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to={to}
                params={params}
                className="eyebrow group inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-ink transition-opacity hover:opacity-70"
              >
                {brand.copy.readMore}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
            </div>
          </div>

          <div className="relative isolate h-[52vh] w-full sm:h-[58vh] lg:h-full lg:w-[60%]">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              decoding="async"
              className="animate-slow-zoom absolute inset-0 size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-40 bg-gradient-to-r from-background via-background/70 to-transparent lg:block" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background via-background/50 to-transparent lg:hidden" />
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
        <p className="eyebrow animate-rise text-ink-foreground/80">{editorialLabel(eyebrow)}</p>
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
            className="eyebrow group inline-flex items-center gap-2 border-b-2 border-ink-foreground pb-1 transition-opacity hover:opacity-75"
          >
            {brand.copy.readMore}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
