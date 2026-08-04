import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { resolveInternalEntityLinks } from '@/platform/internal-linking';

export const Route = createFileRoute('/api/internal-links')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { text?: unknown; maxLinks?: unknown; excludedEntityIds?: unknown; entityExposureWeights?: unknown } | null;
        const text = typeof body?.text === 'string' ? body.text.trim() : '';
        if (!text) return Response.json({ error: 'A non-empty text field is required.' }, { status: 400 });
        if (text.length > 50000) return Response.json({ error: 'Text exceeds the 50,000-character preview limit.' }, { status: 413 });
        const graph = await loadTexasKnowledgeGraph();
        const maxLinks = Math.min(25, Math.max(1, Number(body?.maxLinks ?? 8) || 8));
        const excludedEntityIds = Array.isArray(body?.excludedEntityIds) ? body.excludedEntityIds.filter((value): value is string => typeof value === 'string').slice(0, 100) : [];
        const entityExposureWeights = normalizeExposureWeights(body?.entityExposureWeights);
        const result = resolveInternalEntityLinks(text, graph, { maxLinks, excludedEntityIds, entityExposureWeights });
        return Response.json({
          textLength: text.length,
          graphEntities: graph.length,
          exposureWeightsApplied: Object.keys(entityExposureWeights).length,
          diagnostics: result.diagnostics,
          matches: result.matches.map((match) => ({
            label: match.label,
            start: match.start,
            end: match.end,
            href: match.href,
            score: match.score,
            reasons: match.reasons,
            entity: { id: match.entity.id, kind: match.entity.kind, name: match.entity.name, sourceConfidence: match.entity.sourceConfidence },
          })),
        }, { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
      },
    },
  },
});

function normalizeExposureWeights(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value as Record<string, unknown>)
    .filter(([entityId, weight]) => entityId.length <= 160 && Number.isFinite(Number(weight)))
    .slice(0, 250)
    .map(([entityId, weight]) => [entityId, Math.min(4, Math.max(0, Number(weight)))]));
}
