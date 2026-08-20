import { paintedChurchEditorialStatusBySlug } from "@/data/painted-church-editorial-status";

export function PaintedChurchEditorialStatus({ slug }: { slug: string }) {
  const status = paintedChurchEditorialStatusBySlug.get(slug);
  if (!status) return null;
  const reviewed = new Date(`${status.documentaryReviewDate}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <section aria-labelledby="editorial-review-status" className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8">
      <p className="eyebrow text-primary">Research status</p>
      <h2 id="editorial-review-status" className="mt-3 font-display text-3xl">Documentary research, with fieldwork status disclosed.</h2>
      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        <div><dt className="eyebrow text-muted-foreground">Documentary review</dt><dd className="mt-2 text-sm leading-6">{reviewed}</dd></div>
        <div><dt className="eyebrow text-muted-foreground">Texas Defined fieldwork</dt><dd className="mt-2 text-sm leading-6">{status.fieldworkStatus.replaceAll("-", " ")}</dd></div>
        <div><dt className="eyebrow text-muted-foreground">External expert review</dt><dd className="mt-2 text-sm leading-6">{status.expertReviewStatus.replaceAll("-", " ")}</dd></div>
      </dl>
      <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">{status.note}</p>
    </section>
  );
}
