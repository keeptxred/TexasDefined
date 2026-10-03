import { useId } from 'react';
import { useLocation } from '@tanstack/react-router';
import { Copy, Download, ExternalLink } from 'lucide-react';

export type CitationSource = {
  name: string;
  url?: string | null;
  note?: string | null;
};

export type CitationDataDownload = {
  label: string;
  url: string;
  format?: string | null;
};

export type CitationKeyStat = {
  label: string;
  value: string;
};

export interface CitationTrustPanelProps {
  sources: CitationSource[];
  methodology: string;
  lastVerified: string;
  title?: string;
  className?: string;
  citationTitle?: string;
  canonicalUrl?: string;
  editorName?: string;
  editorHref?: string;
  recommendedCitation?: string;
  dataDownloads?: CitationDataDownload[];
  keyStats?: CitationKeyStat[];
}

export function CitationTrustPanel({
  sources,
  methodology,
  lastVerified,
  title = 'Sources and verification',
  className = '',
  citationTitle,
  canonicalUrl,
  editorName = 'Texas Defined Editorial Desk',
  editorHref = '/authors/a-hollis',
  recommendedCitation,
  dataDownloads = [],
  keyStats = [],
}: CitationTrustPanelProps) {
  const headingId = useId();
  const pathname = useLocation({ select: (location) => location.pathname });
  const stableUrl = canonicalUrl ?? `https://texasdefined.com${pathname}`;
  const citation = recommendedCitation ?? `${editorName}. “${citationTitle ?? title}.” Texas Defined. Last verified ${lastVerified}. ${stableUrl}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`border-y border-border py-8 ${className}`.trim()}
    >
      <div className="grid gap-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Citation ready</p>
          <h2 id={headingId} className="mt-2 font-display text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Use the primary sources below to verify claims, or cite the stable Texas Defined URL for this maintained reference.</p>
        </div>

        <div className="space-y-7">
          {keyStats.length ? (
            <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key reference statistics">
              {keyStats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className="border-l-2 border-primary pl-3">
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-foreground">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="grid gap-7 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-foreground">Primary sources</h3>
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
              <div>
                <h3 className="font-semibold text-foreground">Editor</h3>
                <p className="mt-2"><a href={editorHref} className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">{editorName}</a></p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 border-t border-border pt-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Stable URL</h3>
                <a href={stableUrl} className="mt-2 block break-all text-sm font-medium text-primary underline underline-offset-4">{stableUrl}</a>
              </div>

              {dataDownloads.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Downloadable data</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dataDownloads.map((download) => (
                      <a key={`${download.label}-${download.url}`} href={download.url} className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        {download.label}{download.format ? ` · ${download.format}` : ''}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">Recommended citation</h3>
                <button
                  type="button"
                  onClick={() => void navigator.clipboard?.writeText(citation)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-4"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy citation
                </button>
              </div>
              <blockquote className="mt-2 border-l-2 border-primary pl-4 text-sm leading-7 text-foreground">{citation}</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CitationTrustPanel;
