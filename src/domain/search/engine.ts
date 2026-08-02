import type { SearchDocument } from "@/data/types";

/**
 * Source-agnostic search engine. Accepts documents from any repository and a
 * brand filter, so a second brand uses the identical implementation.
 */

export interface SearchQuery {
  term: string;
  brandId?: string;
  kinds?: SearchDocument["kind"][];
  limit?: number;
}

export interface SearchHit {
  document: SearchDocument;
  score: number;
}

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function scoreDocument(doc: SearchDocument, tokens: string[]): number {
  const title = doc.title.toLowerCase();
  const summary = doc.summary.toLowerCase();
  const keywords = doc.keywords.map((k) => k.toLowerCase());

  let score = 0;
  for (const token of tokens) {
    if (title.includes(token)) score += 6;
    if (keywords.some((k) => k.includes(token))) score += 3;
    if (summary.includes(token)) score += 2;
    if (title.startsWith(token)) score += 2;
  }
  return score;
}

export function search(documents: SearchDocument[], query: SearchQuery): SearchHit[] {
  const tokens = tokenize(query.term);
  if (tokens.length === 0) return [];

  return documents
    .filter((doc) => (query.brandId ? doc.brandId === query.brandId : true))
    .filter((doc) => (query.kinds?.length ? query.kinds.includes(doc.kind) : true))
    .map((document) => ({ document, score: scoreDocument(document, tokens) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, query.limit ?? 20);
}
