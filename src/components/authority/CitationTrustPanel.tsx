import { ExternalLink } from 'lucide-react';

export type CitationSource = {
  name: string;
  url?: string | null;
  note?: string | null;
};

export interface CitationTrustPanelProps {
  sources: CitationSource[];
  methodology: string;
  lastVerified: string;
  title?: string;
  className?: string;
  author?: string;
  editor?: string;
  nextReview?: string;
  recommendedCitation?: string;
}

export function CitationTrustPanel({
  sources,
  methodology,
  lastVerified,
  title = 'Sources and verification',
  className = '',
  author,
  editor,
  nextReview,
  recommendedCitation,
}: CitationTrustPanelProps) {
  return (
    <section
      aria-labelledby="citation-trust-heading"
      className={`border-y border-border py-8 ${className}`.trim()}
    >
      <div className="grid gap-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Sources & notes</p>
          <h2 id="citation-trust-heading" className="mt-2 font-display text-3xl">{title}</h2>
          {(author || editor) ? (
            <dl className="mt-5 space-y-3 text-xs leading-5 text-muted-foreground">
              {author ? <div><dt className="font-semibold uppercase tracking-[0.12em] text-foreground">Research & analysis</dt><dd>{author}</dd></div> : null}
              {editor ? <div><dt className="font-semibold uppercase tracking-[0.12em] text-foreground">Editorial review</dt><dd>{editor}</dd></div> : null}
            </dl>
          ) : null}
        </div>
        <div className="grid gap-7 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">Sources</h3>
            <ul className="mt-2 space-y-2">
              {sources.map((source) => (
                <li key={`${source.name}-${source.url ?? ''}`}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-primary/50 underline-offset-4"
                    >
                      {source.name}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : <span className="font-semibold text-foreground">{source.name}</span>}
                  {source.note ? <span className="block">{source.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-foreground">Methodology</h3>
              <p className="mt-2">{methodology}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Last verified</h3>
              <p className="mt-2">{lastVerified}</p>
            </div>
            {nextReview ? <div><h3 className="font-semibold text-foreground">Next review</h3><p className="mt-2">{nextReview}</p></div> : null}
          </div>
        </div>
      </div>
      {recommendedCitation ? (
        <div className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Recommended citation</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-foreground">{recommendedCitation}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">You may quote or reuse the findings with attribution to TexasDefined.com. Link to the stable research URL when practical.</p>
        </div>
      ) : null}
    </section>
  );
}

export default CitationTrustPanel;
