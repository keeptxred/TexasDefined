import { Link } from '@tanstack/react-router';

export type ResearchSource = {
  name: string;
  url: string;
  note?: string;
};

export function ResearchBriefTrustBlock({
  methodology,
  sources,
  lastVerified,
  nextUpdate,
  citation,
  csvHref,
}: {
  methodology: string;
  sources: ResearchSource[];
  lastVerified: string;
  nextUpdate: string;
  citation: string;
  csvHref?: string;
}) {
  return (
    <section className="mt-12 border-y border-border py-8" aria-labelledby="research-methodology-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Research record</p>
          <h2 id="research-methodology-heading" className="mt-2 font-display text-3xl">How to verify and cite this analysis</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Analysis</dt><dd className="mt-1 font-semibold">TexasDefined Research Desk</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Editor</dt><dd className="mt-1 font-semibold">TexasDefined Editorial</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Last verified</dt><dd className="mt-1 font-semibold">{lastVerified}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Next review</dt><dd className="mt-1 font-semibold">{nextUpdate}</dd></div>
          </dl>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-2xl">Methodology</h3>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{methodology}</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">Primary sources</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6">
              {sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">{source.name}</a>{source.note ? <span className="text-muted-foreground"> — {source.note}</span> : null}</li>)}
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-5">
            <p className="eyebrow text-primary">Recommended citation</p>
            <p className="mt-2 text-sm leading-7">{citation}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {csvHref ? <a href={csvHref} className="text-primary underline underline-offset-4">Download source table (CSV) ↓</a> : null}
            <Link to="/citation-guide" className="underline underline-offset-4">TexasDefined citation guide</Link>
            <Link to="/texas-data/research" className="underline underline-offset-4">More original research</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
