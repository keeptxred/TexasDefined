import { createFileRoute } from '@tanstack/react-router';
import {
  INTERNAL_LINK_POLICIES,
  INTERNAL_LINK_POLICY_REVIEWED_AT,
  INTERNAL_LINK_POLICY_VERSION,
  validateInternalLinkPolicies,
} from '@/platform/internal-link-policies';
import {
  INTERNAL_LINK_POLICY_HISTORY,
  currentInternalLinkPolicyRelease,
  validateInternalLinkPolicyHistory,
} from '@/platform/internal-link-policy-history';

export const Route = createFileRoute('/api/internal-link-policies')({
  server: {
    handlers: {
      GET: async () => Response.json({
        generatedAt: new Date().toISOString(),
        version: INTERNAL_LINK_POLICY_VERSION,
        reviewedAt: INTERNAL_LINK_POLICY_REVIEWED_AT,
        currentRelease: currentInternalLinkPolicyRelease(),
        validation: validateInternalLinkPolicies(),
        historyValidation: validateInternalLinkPolicyHistory(),
        policies: Object.values(INTERNAL_LINK_POLICIES),
        history: INTERNAL_LINK_POLICY_HISTORY,
      }, {
        headers: {
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex, nofollow',
        },
      }),
    },
  },
});
