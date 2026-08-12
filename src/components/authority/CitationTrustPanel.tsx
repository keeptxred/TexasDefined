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
}

export function CitationTrustPanel({
  sources,
  methodology,
  lastVerified,
  title = 'Sources and verification',
  className = '',
}: CitationTrustPanelProps) {
  return (
    <section
      aria-labelledby="citation-trust-heading"
      className={`border-y border-border py-8 ${className}`.trim()}
    >
      <div className="grid gap-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Reference notes</p>
          <h2 id="citation-trust-heading" className="mt-2 font-display text-3xl">{title}</h2>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default CitationTrustPanel;
