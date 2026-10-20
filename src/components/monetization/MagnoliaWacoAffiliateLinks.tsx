import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";
import { trackAffiliateClick } from "@/lib/affiliate-click";

/** Existing approved Viator affiliate builder + sitewide governed stay widget.
 * No invented tour products, room rates or property-specific affiliate URLs.
 */
export function MagnoliaWacoAffiliateLinks() {
  const placement = "chip-joanna-magnolia-waco-visit";
  const label = "View Magnolia Market guided day tour from Dallas";
  const href = buildViatorAffiliateUrl("https://www.viator.com/tours/Dallas/Waco-Texas-and-Magnolia-Market-at-the-Silos/d918-123176P6", placement);
  return (
    <>
      <section aria-labelledby="magnolia-waco-tours" className="my-10 border-y border-border bg-surface px-5 py-8 sm:px-8">
        <p className="eyebrow text-primary">Plan a Waco visit</p>
        <h2 id="magnolia-waco-tours" className="mt-2 font-display text-3xl">Guided tours and Magnolia-related experiences</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          This independently operated private day tour includes Magnolia Market and other Waco stops, departing from the Dallas area—not Waco. Check available dates, pickup rules, total price and its nonrefundable cancellation policy before booking. This is not an official Magnolia experience, a meet-and-greet or a ticket to a paid Magnolia event.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-affiliate-partner="viator" data-affiliate-placement={placement}
            data-commercial-partner="viator" data-commercial-placement={placement}
            onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "experiences" })}
            className="inline-flex bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            {label} ↗
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
