import { useBrand } from "@/brand/context";
import type { Guide } from "@/data/types";
import { getCalculator } from "@/domain/calculators/registry";

const KIND_LABEL: Record<Guide["kind"], string> = {
  article: "Guide",
  calculator: "Calculator",
  dataset: "Reference",
  checklist: "Checklist",
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
        <dl className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
          <dt className="eyebrow">Inputs</dt>
          <dd className="mt-1">{contract.inputs.map((field) => field.label).join(" · ")}</dd>
          <dt className="eyebrow mt-3">Outputs</dt>
          <dd className="mt-1">{contract.outputs.map((field) => field.label).join(" · ")}</dd>
          <dd className="mt-4 text-muted-foreground">{brand.copy.comingSoonBody}</dd>
        </dl>
      )}
      <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{guide.topic}</p>
    </article>
  );
}
