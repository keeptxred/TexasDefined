import { useEffect } from 'react';

import { trackFishingSponsorMetric } from '@/data/fishing-sponsorship.functions';
import type { PublicFishingSponsorPlacement } from '@/data/fishing-sponsorship.types';

export function SponsoredFishingPlacements({ placements }: { placements: PublicFishingSponsorPlacement[] }) {
  useEffect(() => {
    for (const placement of placements) {
      void trackFishingSponsorMetric({ data: { placementId: placement.id, event: 'impression' } }).catch(() => undefined);
    }
  }, [placements]);

  if (!placements.length) return null;

  return <aside aria-label="Sponsored fishing partners" className="border-y border-border bg-muted/20">
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:px-6 lg:grid-cols-3 lg:px-8">
      {placements.map((placement) => <article key={placement.id} className="border-l-2 border-primary pl-4">
        <p className="eyebrow text-primary">Sponsored · {placement.sponsorName}</p>
        <h2 className="mt-2 font-display text-2xl">{placement.headline}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{placement.body}</p>
        <a
          href={placement.destinationUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          onClick={() => void trackFishingSponsorMetric({ data: { placementId: placement.id, event: 'click' } }).catch(() => undefined)}
          className="mt-3 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary"
        >{placement.ctaLabel} →</a>
      </article>)}
    </div>
  </aside>;
}
