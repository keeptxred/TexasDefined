export type TpwdFishingReportSnapshot = {
  publishedAt: string;
  summary: string;
  sourceUrl: string;
  sourceNotice: string | null;
  freshness: "current" | "stale" | "historical";
};
