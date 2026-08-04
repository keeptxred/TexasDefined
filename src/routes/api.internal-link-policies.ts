import { createFileRoute } from '@tanstack/react-router';
import {
  INTERNAL_LINK_POLICIES,
  INTERNAL_LINK_POLICY_REVIEWED_AT,
  INTERNAL_LINK_POLICY_VERSION,
  validateInternalLinkPolicies,
} from '@/platform/internal-link-policies';

export const Route = createFileRoute('/api/internal-link-policies')({
  server: {
    handlers: {
      GET: async () => Response.json({
        generatedAt: new Date().toISOString(),
        version: INTERNAL_LINK_POLICY_VERSION,
        reviewedAt: INTERNAL_LINK_POLICY_REVIEWED_AT,
        validation: validateInternalLinkPolicies(),
        policies: Object.values(INTERNAL_LINK_POLICIES),
      }, {
        headers: {
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex, nofollow',
        },
      }),
    },
  },
});
