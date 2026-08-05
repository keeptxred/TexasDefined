import { useBrand } from "@/brand/context";
import type { Guide } from "@/data/types";
import { getCalculator } from "@/domain/calculators/registry";

const KIND_LABEL: Record<Guide["kind"], string> = {
  article: "How-to guide",
  calculator: "Try the calculator",
  dataset: "Quick reference",
  checklist: "Step-by-step checklist",
};

export function GuideCard({ guide }: { guide: Guide }) {
  const brand = useBrand();
  const contract = getCalculator(guide.calculatorId);

  return (
    <article className="flex h-full flex-col border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-primary">{KIND_LABEL[guide.kind]}</p>
        {guide.status === "coming-soon" && (
          <span className="rounded-sm bg-secondary px-2 py-1 text-[0.625rem] uppercase tracking-widest text-secondary-foreground">
            {brand.copy.comingSoon}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
      {contract && (
        <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
          <p>
            Use a few basic details to get a practical estimate you can use while planning your next move.
          </p>
          {guide.status === "coming-soon" && <p className="mt-3">{brand.copy.comingSoonBody}</p>}
        </div>
      )}
      <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{guide.topic}</p>
    </article>
  );
}
