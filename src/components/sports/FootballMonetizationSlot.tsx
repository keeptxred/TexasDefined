/**
 * Consistent football sponsorship and shop entry points for all existing and
 * future school/district pages. No unapproved ads or affiliate URLs are used.
 */
export function FootballMonetizationSlot({ surfacePath, hasSponsor }: {
  surfacePath: string;
  hasSponsor: boolean;
}) {
  const footballPackage = surfacePath.startsWith('/texas-high-school-football-districts/') ? 'district' : 'school';
  const inquiry = `/partner-with-us?type=sports-travel&tier=custom&football=${footballPackage}&focus=contact&source=${encodeURIComponent(surfacePath)}`;
  return (
    <aside data-football-monetization="v1" aria-label="Independent football advertising and shopping" className="border-b border-border py-5">
      {!hasSponsor && (
        <div className="flex flex-wrap items-center justify-between gap-4 border border-border bg-surface p-4 sm:p-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Local business sponsorship</p>
            <h2 className="mt-2 font-display text-2xl">Reach Texas high-school football families</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Founding placements start at $49/month, subject to available inventory, approval and agreement. Local businesses can request a clearly labeled, editorially independent placement on this page. Sponsorship does not imply school approval, rankings, or guaranteed clicks.</p>
          </div>
          <a href={inquiry} className="inline-flex min-h-11 items-center justify-center border border-primary px-4 py-3 text-sm font-semibold text-primary" data-football-sponsor-interest="true">Sponsor this page →</a>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border border-border p-4 sm:p-6">
        <div>
          <p className="font-semibold">Texas game-day gear and independent designs</p>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">Shop TexasDefined apparel and gifts. Original designs are not school-licensed or official team merchandise.</p>
        </div>
        <a href="/shop" className="inline-flex min-h-11 items-center justify-center bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground" data-football-shop-cta="true">Browse the shop →</a>
      </div>
    </aside>
  );
}
