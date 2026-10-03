import { useLocation } from '@tanstack/react-router';
import { Download, ExternalLink } from 'lucide-react';

export type CitationSource = {
  name: string;
  url?: string | null;
  note?: string | null;
};

export type CitationDownload = {
  label: string;
  href: string;
  format?: string;
};

export interface CitationTrustPanelProps {
  sources: CitationSource[];
  methodology: string;
  lastVerified: string;
  title?: string;
  citationTitle?: string;
  authorName?: string;
  authorHref?: string;
  downloads?: CitationDownload[];
  className?: string;
}

export function CitationTrustPanel({
  sources,
  methodology,
  lastVerified,
  title = 'Sources and verification',
  citationTitle,
  authorName = 'Texas Defined Editorial Desk',
  authorHref = '/authors/a-hollis',
  downloads = [],
  className = '',
}: CitationTrustPanelProps) {
  const pathname = useLocation({ select: (location) => location.pathname.replace(/\/+$/, '') || '/' });
  const stableUrl = `https://texasdefined.com${pathname}`;
  const recommendedCitation = `${authorName}. “${citationTitle ?? title}.” TexasDefined. Last verified: ${lastVerified}. ${stableUrl}`;

  return (
    <section aria-labelledby="citation-trust-heading" className={`border-y border-border py-8 ${className}`.trim()}>
      <div className="grid gap-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-primary">Citation & verification</p>
          <h2 id="citation-trust-heading" className="mt-2 font-display text-3xl">{title}</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Author/editor:{' '}
            <a href={authorHref} className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">{authorName}</a>
          </p>
        </div>

        <div className="grid gap-7 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-foreground">Sources</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.12em]">Primary and authoritative records</p>
            <ul className="mt-2 space-y-2">
              {sources.map((source) => (
                <li key={`${source.name}-${source.url ?? ''}`}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-primary/50 underline-offset-4">
                      {source.name}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : <span className="font-semibold text-foreground">{source.name}</span>}
                  {source.note ? <span className="block">{source.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div><h3 className="font-semibold text-foreground">Methodology</h3><p className="mt-2">{methodology}</p></div>
            <div><h3 className="font-semibold text-foreground">Last verified</h3><p className="mt-2">{lastVerified}</p></div>
            <div>
              <h3 className="font-semibold text-foreground">Stable URL</h3>
              <a href={stableUrl} className="mt-2 block break-all font-medium text-foreground underline decoration-primary/50 underline-offset-4">{stableUrl}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-border pt-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div><p className="eyebrow text-primary">Reuse this page</p></div>
        <div className="space-y-5">
          {downloads.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-foreground">Download data</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {downloads.map((download) => (
                  <a key={download.href} href={download.href} className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {download.label}{download.format ? ` (${download.format})` : ''}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Recommended citation</h3>
            <p className="mt-2 border-l-2 border-primary/40 pl-4 text-sm leading-7 text-muted-foreground">{recommendedCitation}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CitationTrustPanel;
