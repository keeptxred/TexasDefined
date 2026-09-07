import { createFileRoute } from '@tanstack/react-router';
import { getReaderQualityDashboard } from '@/platform/reader-quality.functions';

export const Route = createFileRoute('/admin/analytics-quality')({
  head: () => ({
    meta: [
      { title: 'Analytics Quality | TexasDefined' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
    ],
  }),
  loader: async () => getReaderQualityDashboard(),
});
