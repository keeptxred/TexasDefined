import { useBrand } from "@/brand/context";
import type { TexasEvent } from "@/data/types";
import { formatDateRange } from "@/domain/utils/format";

function categoryLabel(category: string) {
  return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function EventCard({ event, regionLabel }: { event: TexasEvent; regionLabel?: string | undefined }) {
  const brand = useBrand();

  return (
    <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-7">
      <div>
        <p className="eyebrow text-primary">{categoryLabel(event.category)}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{formatDateRange(event.startDate, event.endDate, brand.identity.locale)}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{event.city}{regionLabel ? ` · ${regionLabel}` : ""}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl leading-tight">{event.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{event.blurb}</p>
      </div>
    </article>
  );
}
