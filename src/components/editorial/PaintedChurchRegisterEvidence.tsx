import { PaintedChurchCanonicalRecord } from "@/components/editorial/PaintedChurchCanonicalRecord";
import { PaintedChurchNominationEvidence } from "@/components/editorial/PaintedChurchNominationEvidence";
import { paintedChurchRegisterRecordBySlug } from "@/data/painted-church-register-evidence";

export function PaintedChurchRegisterEvidence({ slug }: { slug: string }) {
  const record = paintedChurchRegisterRecordBySlug(slug);

  return (
    <>
      <PaintedChurchCanonicalRecord slug={slug} />
      {record ? (
        <section aria-labelledby="historic-designation-record" className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Primary designation evidence</p>
          <h2 id="historic-designation-record" className="mt-3 font-display text-4xl">Historic designation record</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/90">
            This church is documented in the National Register under the <em>{record.multipleListing}</em> listing. Texas Defined keeps this formal designation separate from the broader popular use of “Painted Churches of Texas.”
          </p>
          <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">National Register ID</dt><dd className="mt-2 text-base">{record.nris}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Listed</dt><dd className="mt-2 text-base">{record.listed}</dd></div>
            <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Areas of significance</dt><dd className="mt-2 text-base">{record.areasOfSignificance.join(", ")}</dd></div>
            <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Architectural style</dt><dd className="mt-2 text-base">{record.architecturalStyle ?? "Not asserted in this summary"}</dd></div>
            {record.architects?.length ? <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Architect / builder names in record</dt><dd className="mt-2 text-base">{record.architects.join(" · ")}</dd></div> : null}
            {record.significantYears?.length ? <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Significant years</dt><dd className="mt-2 text-base">{record.significantYears.join(" · ")}</dd></div> : null}
          </dl>
          {record.note ? <p className="mt-6 max-w-3xl border-l-2 border-primary bg-surface p-5 text-sm leading-7 text-muted-foreground">{record.note}</p> : null}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={record.npsUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">National Park Service digital record</a>
            <a href={record.thcUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Historical Commission record</a>
          </div>
        </section>
      ) : null}
      <PaintedChurchNominationEvidence slug={slug} />
    </>
  );
}
