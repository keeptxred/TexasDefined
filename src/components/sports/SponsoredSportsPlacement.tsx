import { useEffect, useRef } from 'react';

import { trackSportsSponsorMetric } from '@/data/sports-sponsorship.functions';
import type { PublicSportsSponsorPlacement } from '@/data/sports-sponsorship.types';

export function SponsoredSportsPlacement({ placement }: { placement: PublicSportsSponsorPlacement }) {
  const impressionSent = useRef(false);
  const clickSent = useRef(false);

  useEffect(() => {
    if (impressionSent.current) return;
    impressionSent.current = true;
    void trackSportsSponsorMetric({ data: { placementId: placement.id, event: 'impression' } }).catch(() => undefined);
  }, [placement.id]);

  function trackClick() {
    if (clickSent.current) return;
    clickSent.current = true;
    void trackSportsSponsorMetric({ data: { placementId: placement.id, event: 'click' } }).catch(() => undefined);
  }

  return <aside className="border-y border-border bg-muted/25 px-5 py-6 sm:px-7" aria-label={`Sponsored placement from ${placement.sponsorName}`}>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="border border-primary px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary">Sponsored</span>
      <span className="text-xs font-medium text-muted-foreground">Paid placement by {placement.sponsorName}</span>
    </div>
    <h2 className="mt-4 font-display text-3xl leading-tight">{placement.headline}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{placement.body}</p>
    <a
      href={placement.destinationUrl}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onPointerDown={trackClick}
      onClick={trackClick}
      className="mt-5 inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
    >
      {placement.ctaLabel} ↗
    </a>
  </aside>;
}
