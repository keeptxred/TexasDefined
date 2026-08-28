import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayAuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
}

const firstYearHomeowner: ArticleBlock[] = [
  { type: "heading", text: "Build a maintenance plan around the house you actually bought" },
  { type: "paragraph", text: "A first year of Texas homeownership is easier when statewide risks are separated from property-specific ones. A Gulf Coast house may need more attention to wind, flood exposure and salt air, while a North Texas home may see more hail and hard-freeze risk. Expansive soils matter in many communities, but not every foundation behaves the same way. Keep the inspection report, seller disclosures, survey, warranty information, appliance manuals and insurance policy together, then build a calendar from the roof, drainage, HVAC, plumbing, irrigation, trees, pool equipment and other systems that are actually present." },
];

export const texasGatewayBatch4AuthorityEnrichment: Record<string, GatewayAuthorityEnrichment> = {};
