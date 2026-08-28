import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayAuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
}

export const texasGatewayBatch4AuthorityEnrichment: Record<string, GatewayAuthorityEnrichment> = {};
