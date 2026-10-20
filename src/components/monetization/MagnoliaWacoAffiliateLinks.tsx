import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";
import { trackAffiliateClick } from "@/lib/affiliate-click";

/** Existing approved Viator affiliate builder + sitewide governed stay widget.
 * No invented tour products, room rates or property-specific affiliate URLs.
 */
export function MagnoliaWacoAffiliateLinks() {
  const placement = "chip-joanna-magnolia-waco-visit";
  const localPlacement = `${placement}-waco-local`;
  const localLabel = "See guided Fixer Upper homes tour in Waco";
  const localHref = buildViatorAffiliateUrl("https://www.viator.com/tours/Waco/Brazos-Tours/d50076-62589P1", localPlacement);
  const dallasPlacement = `${placement}-dallas-transfer`;
  const dallasLabel = "See Dallas-to-Magnolia private day tour";
  const dallasHref = buildViatorAffiliateUrl("https://www.viator.com/tours/Dallas/Waco-Texas-and-Magnolia-Market-at-the-Silos/d918-123176P6", dallasPlacement);
  return (
    <>
      <section aria-labelledby="magnolia-waco-tours" className="my-10 border-y border-border bg-surface px-5 py-8 sm:px-8">
        <p className="eyebrow text-primary">Plan a Waco visit</p>
        <h2 id="magnolia-waco-tours" className="mt-2 font-display text-3xl">Guided tours and Magnolia-related experiences</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Already in Waco? The local, independently operated guided tour visits Fixer Upper homes and landmarks and meets at the former Harp Design shop in Waco—not at the Silos. A separate private day tour departs from Dallas and includes Magnolia Market, with different pickup and cancellation terms. Neither is an official Magnolia event ticket or a chance to meet Chip and Joanna. Check current availability, accessibility and cancellation rules before booking.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <a href={localHref} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-affiliate-partner="viator" data-affiliate-placement={localPlacement}
            data-commercial-partner="viator" data-commercial-placement={localPlacement}
            onClick={() => trackAffiliateClick({ partner: "viator", label: localLabel, placement: localPlacement, module: "experiences" })}
            className="inline-flex bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            {localLabel} ↗
          </a>
          <a href={dallasHref} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-affiliate-partner="viator" data-affiliate-placement={dallasPlacement}
            data-commercial-partner="viator" data-commercial-placement={dallasPlacement}
            onClick={() => trackAffiliateClick({ partner: "viator", label: dallasLabel, placement: dallasPlacement, module: "experiences" })}
            className="inline-flex border border-primary px-5 py-3 text-sm font-semibold text-primary">
            {dallasLabel} ↗
          </a>
          <a href="https://magnolia.com/pages/visit" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline underline-offset-4">
            Official Magnolia hours and ticketed experiences ↗
          </a>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission on qualifying Viator bookings, at no additional cost to you. Editorial content and official Magnolia information are independent of these links.</p>
      </section>
      <div data-stay-nearby-slot aria-label="Compare Waco hotels and places to stay" className="my-10">
        <p className="text-sm text-muted-foreground">Compare hotels near downtown Waco and Magnolia Market using our travel booking partners.</p>
      </div>
    </>
  );
}
