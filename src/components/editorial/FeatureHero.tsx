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
  "real-estate": "Homes & Land",
  "texas-history": "Then & Now",
  "food-bbq": "The Texas Table",
  outdoors: "Wild Texas",
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

function editorialLabel(value: string) {
  return CATEGORY_LABELS[value] ?? value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function FeatureHero({ eyebrow, title, dek, image, to, params, meta, variant = "fullbleed" }: FeatureHeroProps) {
  const brand = useBrand();

  if (variant === "split") {
    return (
      <section className="relative isolate overflow-hidden border-b border-border/70 bg-background text-foreground">
        <div className="mx-auto grid w-full max-w-[1600px] lg:min-h-[610px] lg:grid-cols-[42%_58%]">
          <div className="animate-rise relative z-20 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
            <p className="eyebrow text-primary">{editorialLabel(eyebrow)}</p>
            <h2 className="mt-5 max-w-[10.5em] font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[3.7rem] lg:text-[4.25rem]">{title}</h2>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-7 text-muted-foreground">{dek}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/70 pt-5">
              <Link to={to} params={params} className="eyebrow group inline-flex items-center gap-2 border-b border-primary pb-1 text-primary transition-opacity hover:opacity-70">{brand.copy.readMore}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
              {meta && <p className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">{meta}</p>}
            </div>
          </div>
          <div className="relative isolate min-h-[420px] w-full sm:min-h-[520px] lg:min-h-0">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 58vw, 100vw" loading="eager" fetchPriority="high" decoding="async" className="animate-slow-zoom absolute inset-0 size-full object-cover" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-background/65 to-transparent lg:block" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="100vw" loading="eager" fetchPriority="high" decoding="async" className="animate-slow-zoom absolute inset-0 size-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="relative mx-auto flex min-h-[76vh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <p className="eyebrow animate-rise text-ink-foreground/80">{editorialLabel(eyebrow)}</p>
        <h1 className="animate-rise mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="animate-rise mt-5 max-w-2xl text-[1.05rem] leading-7 text-ink-foreground/85">{dek}</p>
        <div className="animate-rise mt-8 flex flex-wrap items-center gap-6 border-t border-ink-foreground/20 pt-5">
          <Link to={to} params={params} className="eyebrow group inline-flex items-center gap-2 border-b border-ink-foreground pb-1 transition-opacity hover:opacity-75">{brand.copy.readMore}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
          {meta && <p className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-ink-foreground/70">{meta}</p>}
        </div>
      </div>
    </section>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  const brand = useBrand();
  return <FeatureHero eyebrow={article.category || article.tags[0] || "Story"} title={article.title} dek={article.dek} image={article.hero} to="/article/$slug" params={{ slug: article.slug }} meta={`${formatDate(article.publishedAt, brand.identity.locale)} · ${formatReadingTime(article.readingMinutes)}`} />;
}
