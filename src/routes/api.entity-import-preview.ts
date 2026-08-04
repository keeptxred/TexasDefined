import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import type { TexasEntityRecord } from '@/data/knowledge-graph';
import { buildEntityPromotionManifest, promotableEntities } from '@/platform/entity-promotion';

export const Route = createFileRoute('/api/entity-import-preview')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); }
        catch { return json({ error: 'Request body must be valid JSON.' }, 400); }
        const proposed = normalizeProposed(body);
        if (!proposed) return json({ error: 'Body must contain a proposed array with no more than 10,000 entity records.' }, 400);
        const current = await loadTexasKnowledgeGraph();
        const manifest = buildEntityPromotionManifest(current, proposed);
        return json({
          mode: 'preview-only',
          generatedAt: new Date().toISOString(),
          manifest,
          promotableEntityIds: promotableEntities(proposed, manifest).map((entity) => entity.id),
        }, manifest.safeToPromote ? 200 : 422);
      },
    },
  },
});

function normalizeProposed(body: unknown): TexasEntityRecord[] | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const proposed = (body as { proposed?: unknown }).proposed;
  if (!Array.isArray(proposed) || proposed.length > 10000) return undefined;
  return proposed as TexasEntityRecord[];
}
function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' },
  });
}
