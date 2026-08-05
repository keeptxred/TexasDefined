import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { guideHref, guideIsAvailable } from "@/data/guide-links";
import type { Guide } from "@/data/types";
import { getCalculator } from "@/domain/calculators/registry";

const KIND_LABEL: Record<Guide["kind"], string> = {
  article: "How-to guide",
  calculator: "Try the calculator",
  dataset: "Quick reference",
  checklist: "Step-by-step",
};

function topicLabel(topic: string) {
  return topic
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function GuideCard({ guide }: { guide: Guide }) {
  const brand = useBrand();
  const contract = getCalculator(guide.calculatorId);
  const href = guideHref(guide);
  const available = guideIsAvailable(guide);

  const card = (
    <article className="flex h-full flex-col border border-border bg-card p-6 transition-colors group-hover:border-primary/50">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-primary">{KIND_LABEL[guide.kind]}</p>
        {!available && (
          <span className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            {brand.copy.comingSoon}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
      {contract && (
        <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
          <p>Bring a few basic numbers and we’ll help you turn them into a useful starting point.</p>
          {!available && <p className="mt-3">{brand.copy.comingSoonBody}</p>}
        </div>
      )}
      <p className="mt-5 text-sm text-muted-foreground">Good to know · {topicLabel(guide.topic)}</p>
      {href && <span className="mt-4 text-sm font-medium text-primary">Open this guide →</span>}
    </article>
  );

  return href ? (
    <Link to={href} className="group block h-full">
      {card}
    </Link>
  ) : card;
}
