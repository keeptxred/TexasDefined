import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { guideHref, guideIsAvailable } from "@/data/guide-links";
import type { Guide } from "@/data/types";
import { getCalculator } from "@/domain/calculators/registry";

const KIND_LABEL: Record<Guide["kind"], string> = {
  article: "Guide",
  calculator: "Calculator",
  dataset: "Reference",
  checklist: "Checklist",
};

function topicLabel(topic: string) {
  return topic.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function GuideCard({ guide }: { guide: Guide }) {
  const brand = useBrand();
  const contract = getCalculator(guide.calculatorId);
  const href = guideHref(guide);
  const available = guideIsAvailable(guide);

  const card = (
    <article className="flex h-full flex-col border-t border-border pt-5 transition-colors group-hover:border-primary">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-primary">{KIND_LABEL[guide.kind]} · {topicLabel(guide.topic)}</p>
        {!available && <span className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{brand.copy.comingSoon}</span>}
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight">{guide.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{guide.summary}</p>
      {contract && <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground"><p>Bring the basic numbers and use the result as a practical starting point.</p>{!available && <p className="mt-3">{brand.copy.comingSoonBody}</p>}</div>}
      {href && <span className="eyebrow mt-6 inline-flex items-center gap-2 text-primary">Open guide <span aria-hidden>→</span></span>}
    </article>
  );

  return href ? <Link to={href} className="group block h-full">{card}</Link> : card;
}
