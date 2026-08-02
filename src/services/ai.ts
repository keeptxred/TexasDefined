/**
 * AI service boundary. No model calls in Phase 1 — the interface exists so the
 * shared package can implement it once for both brands.
 */

export interface AiRecommendation {
  id: string;
  title: string;
  href: string;
  reason: string;
}

export interface AiService {
  recommend(input: { brandId: string; seedId: string; limit?: number }): Promise<AiRecommendation[]>;
  summarize(input: { brandId: string; text: string }): Promise<string | null>;
}

export const noopAi: AiService = {
  async recommend() {
    return [];
  },
  async summarize() {
    return null;
  },
};

export const ai: AiService = noopAi;
