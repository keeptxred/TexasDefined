import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { resolveInternalEntityLinks } from '@/platform/internal-linking';

export const Route = createFileRoute('/api/internal-links')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { text?: unknown; maxLinks?: unknown; excludedEntityIds?: unknown } | null;
        const text = typeof body?.text === 'string' ? body.text.trim() : '';
        if (!text) return Response.json({ error: 'A non-empty text field is required.' }, { status: 400 });
        if (text.length > 50000) return Response.json({ error: 'Text exceeds the 50,000-character preview limit.' }, { status: 413 });
        const graph = await loadTexasKnowledgeGraph();
        const maxLinks = Math.min(25, Math.max(1, Number(body?.maxLinks ?? 8) || 8));
        const excludedEntityIds = Array.isArray(body?.excludedEntityIds) ? body.excludedEntityIds.filter((value): value is string => typeof value === 'string').slice(0, 100) : [];
        const result = resolveInternalEntityLinks(text, graph, { maxLinks, excludedEntityIds });
        return Response.json({
          textLength: text.length,
          graphEntities: graph.length,
          diagnostics: result.diagnostics,
          matches: result.matches.map((match) => ({
            label: match.label,
            start: match.start,
            end: match.end,
            href: match.href,
            entity: { id: match.entity.id, kind: match.entity.kind, name: match.entity.name, sourceConfidence: match.entity.sourceConfidence },
          })),
        }, { headers: { 'cache-control': 'no-store' } });
      },
    },
  },
});
