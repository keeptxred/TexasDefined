import { createFileRoute } from '@tanstack/react-router';
import { getGovernanceHealth } from '@/platform/governance-health.functions';

export const Route = createFileRoute('/admin/governance-health')({
  head: () => ({ meta: [{ title: 'Governance Health | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  loader: async () => getGovernanceHealth(),
});
