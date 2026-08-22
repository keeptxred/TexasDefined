import { paintedChurchEditorialStatusBySlug } from "@/data/painted-church-editorial-status";

const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export function PaintedChurchEditorialStatus({ slug }: { slug: string }) {
  const status = paintedChurchEditorialStatusBySlug.get(slug);
  if (!status) return null;
  const reviewed = formatDate(status.documentaryReviewDate);
  return (
    <section aria-labelledby="editorial-review-status" className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8">
      <p className="eyebrow text-primary">Research status</p>
      <h2 id="editorial-review-status" className="mt-3 font-display text-3xl">Documentary research, with authorship and review status disclosed.</h2>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div><dt className="eyebrow text-muted-foreground">Editorial authorship</dt><dd className="mt-2 text-sm leading-6">{status.authoredBy}</dd></div>
        <div><dt className="eyebrow text-muted-foreground">Documentary review</dt><dd className="mt-2 text-sm leading-6">{reviewed}</dd></div>
        <div><dt className="eyebrow text-muted-foreground">Texas Defined fieldwork</dt><dd className="mt-2 text-sm leading-6">{status.fieldworkStatus.replaceAll("-", " ")}</dd></div>
        <div><dt className="eyebrow text-muted-foreground">External expert review</dt><dd className="mt-2 text-sm leading-6">{status.expertReviewStatus.replaceAll("-", " ")}</dd></div>
      </dl>
      <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">{status.authorshipNote}</p>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{status.note}</p>

      <div className="mt-7 border-t border-border pt-6">
        <p className="eyebrow text-muted-foreground">Review & revision history</p>
        <ol className="mt-4 space-y-4">
          {[...status.revisions].reverse().map((revision) => (
            <li key={`${revision.date}-${revision.label}`} className="grid gap-1 text-sm sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5">
              <time dateTime={revision.date} className="font-semibold text-foreground">{formatDate(revision.date)}</time>
              <div><p className="font-semibold text-foreground">{revision.label}</p><p className="mt-1 leading-6 text-muted-foreground">{revision.note}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
