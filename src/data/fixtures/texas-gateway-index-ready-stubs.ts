import type { Article } from "../types";

/**
 * Lightweight public-discovery records for gateway articles that have been
 * explicitly promoted for indexing. Keep this list aligned one-for-one with
 * TEXAS_GATEWAY_INDEX_READY_SLUGS.
 *
 * The list intentionally starts empty: all 140 gateway drafts remain directly
 * QA-accessible through the lazy full-article loader, but none should appear in
 * public article lists, search, or sitemap discovery until editorial promotion.
 */
export const texasGatewayIndexReadyStubs: Article[] = [];
