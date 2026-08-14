import { useEffect } from 'react';

import { recordSportsVenuePageviewFn } from '@/data/sports-traffic.functions';

export function SportsTrafficTracker({ surfacePath }: { surfacePath: string }) {
  useEffect(() => {
    if (!/^\/sports-venue\/[a-z0-9-]+$/.test(surfacePath)) return;
    const key = `texasdefined:sports-venue-view:${surfacePath}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Session storage is only a client-side duplicate guard; analytics still works without it.
    }

    void recordSportsVenuePageviewFn({ data: { surfacePath } }).catch(() => {
      try { sessionStorage.removeItem(key); } catch { /* no-op */ }
    });
  }, [surfacePath]);

  return null;
}
