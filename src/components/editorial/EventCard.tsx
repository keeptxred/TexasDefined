import { useBrand } from "@/brand/context";
import type { TexasEvent } from "@/data/types";
import { formatDateRange } from "@/domain/utils/format";

export function EventCard({ event, regionLabel }: { event: TexasEvent; regionLabel?: string | undefined }) {
  const brand = useBrand();

  return (
    <article className="flex gap-5 border-t border-border py-6">
      <div className="w-28 shrink-0">
        <p className="eyebrow text-primary">{event.category}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDateRange(event.startDate, event.endDate, brand.identity.locale)}
        </p>
      </div>
      <div>
        <h3 className="font-display text-xl leading-snug">{event.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{event.blurb}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          In {event.city}{regionLabel ? ` · ${regionLabel}` : ""}
        </p>
      </div>
    </article>
  );
}
