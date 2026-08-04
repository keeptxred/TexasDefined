import { createFileRoute } from '@tanstack/react-router';
import { previewInternalLinkPolicyRollback } from '@/platform/internal-link-policy-diff';

export const Route = createFileRoute('/api/internal-link-policy-rollback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const targetVersion = url.searchParams.get('version')?.trim() || undefined;
        if (targetVersion && !/^\d+\.\d+\.\d+$/.test(targetVersion)) {
          return Response.json({ error: 'version must use semantic versioning.' }, { status: 400, headers: headers() });
        }
        const preview = previewInternalLinkPolicyRollback(targetVersion);
        if (targetVersion && !preview.available && !preview.toVersion) {
          return Response.json({ error: `No rollback snapshot is available for ${targetVersion}.` }, { status: 404, headers: headers() });
        }
        return Response.json({
          mode: 'preview-only',
          generatedAt: new Date().toISOString(),
          ...preview,
        }, { headers: headers() });
      },
    },
  },
});

function headers() {
  return {
    'cache-control': 'no-store',
    'x-robots-tag': 'noindex, nofollow',
  };
}
