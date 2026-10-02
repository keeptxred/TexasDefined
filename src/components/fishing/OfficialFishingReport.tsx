import type { TpwdFishingReportSnapshot } from "@/data/fishing/tpwd-fishing-report.types";

export function OfficialFishingReport({
  report,
  fallbackUrl,
  lakeName,
}: {
  report: TpwdFishingReportSnapshot | null;
  fallbackUrl: string;
  lakeName: string;
}) {
  if (!report) {
    return <div className="mt-8 max-w-3xl border-l-2 border-primary pl-5">
      <h3 className="font-display text-2xl">Latest official fishing report</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">A dated TPWD report could not be loaded automatically for {lakeName}. Open the official lake page to check the newest report available.</p>
      <a href={fallbackUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open TPWD lake page →</a>
    </div>;
  }

  const statusLabel = report.freshness === "current"
    ? "Current official report"
    : report.freshness === "stale"
      ? "Latest official report · older than 2 weeks"
      : "Latest official report · historical";

  return <article className="mt-8 border-t-2 border-foreground pt-6">
    <p className="eyebrow text-primary">{statusLabel}</p>
    <h3 className="mt-2 font-display text-3xl">TPWD report for {lakeName}</h3>
    <p className="mt-2 text-sm font-medium">Published {formatDate(report.publishedAt)}</p>
    <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">{report.summary}</p>
    <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined provides fishing-report information from TPWD and other clearly attributed sources. Source status notices are shown only while they remain published by TPWD.</p>
    {report.sourceNotice ? <div className="mt-5 max-w-4xl border-l-2 border-primary pl-5"><p className="text-sm leading-7 text-muted-foreground"><strong className="text-foreground">TPWD status:</strong> {report.sourceNotice}</p></div> : null}
    <a href={report.sourceUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">View report at TPWD →</a>
  </article>;
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
