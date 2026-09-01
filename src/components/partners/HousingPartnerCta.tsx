type HousingPartnerType = 'insurance' | 'mortgage' | 'real-estate';

export function HousingPartnerCta({
  partnershipType,
  sourcePath,
  title,
  copy,
}: {
  partnershipType: HousingPartnerType;
  sourcePath: string;
  title: string;
  copy: string;
}) {
  const href = `/partner-with-us?type=${encodeURIComponent(partnershipType)}&source=${encodeURIComponent(sourcePath)}`;
  return (
    <aside className="mt-12 border-y border-border py-7" aria-label="Texas Defined business partnership">
      <p className="eyebrow text-primary">For Texas businesses</p>
      <div className="mt-2 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-display text-2xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{copy}</p>
        </div>
        <a href={href} className="min-h-11 border border-primary px-5 py-3 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Partnership standards & inquiry →</a>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Commercial relationships are clearly disclosed and cannot change calculator results, editorial rankings or factual conclusions. Reader calculator inputs are not attached to this business inquiry.</p>
    </aside>
  );
}
