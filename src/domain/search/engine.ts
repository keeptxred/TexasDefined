import type { SearchDocument } from "@/data/types";

export interface SearchQuery {
  term: string;
  brandId?: string;
  kinds?: SearchDocument["kind"][];
  limit?: number;
}
export interface SearchHit { document: SearchDocument; score: number; }

const ALIASES: Record<string, string> = {
  bbq: "barbecue", barbeque: "barbecue", rv: "camping", campground: "camping",
  kids: "family", kid: "family", dmv: "txdmv", museum: "museums",
};

export function tokenize(input: string): string[] {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((token) => token.length > 1);
}

function scoreDocument(doc: SearchDocument, tokens: string[], phrase: string) {
  const title = doc.title.toLowerCase();
  const summary = doc.summary.toLowerCase();
  const keywords = doc.keywords.map((keyword) => keyword.toLowerCase());
  let score = title === phrase ? 30 : title.startsWith(phrase) ? 12 : 0;
  for (const token of tokens) {
    const alias = ALIASES[token];
    if (title.includes(token) || (alias && title.includes(alias))) score += 6;
    if (keywords.some((keyword) => keyword.includes(token) || Boolean(alias && keyword.includes(alias)))) score += 3;
    if (summary.includes(token) || Boolean(alias && summary.includes(alias))) score += 2;
  }
  return score;
}

export function search(documents: SearchDocument[], query: SearchQuery): SearchHit[] {
  const tokens = tokenize(query.term);
  if (!tokens.length) return [];
  const phrase = tokens.join(" ");
  return documents
    .filter((doc) => (!query.brandId || doc.brandId === query.brandId) && (!query.kinds?.length || query.kinds.includes(doc.kind)))
    .map((document) => ({ document, score: scoreDocument(document, tokens, phrase) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, query.limit ?? 20);
}
