import { wacoViatorAttractionForSlug } from "@/data/waco-viator-attraction-links";
import { WacoViatorExperienceCards } from "@/components/monetization/WacoViatorExperienceCards";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";
import { trackAffiliateClick } from "@/lib/affiliate-click";

/** Render only on researched Waco attraction pages, or the Magnolia visitor guide.
 * Viator attraction summaries are editorial overviews, never assumed admission tickets.
 */
export function WacoDestinationOffer({ slug }: { slug: string }) {
  const attraction = wacoViatorAttractionForSlug(slug);
  const isMagnolia = slug === "magnolia-market-at-the-silos";
  if (!attraction && !isMagnolia) return null;
  const placement = `viator-attraction-${slug}`;
  const label = attraction ? `Read Viator's ${attraction.name} attraction overview` : "";

  return (
    <div className="mt-8 space-y-5">
      {attraction ? (
        <section className="border border-border bg-surface p-5 sm:p-6" aria-label={`Viator attraction overview for ${attraction.name}`}>
          <p className="eyebrow text-primary">Explore more in Waco</p>
          <h3 className="mt-2 font-display text-2xl">{attraction.name} attraction overview</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Viator's attraction overview is not an entry ticket, a confirmed guided tour, or evidence that the attraction is open. Check the operator's official site for admission and access.
          </p>
          <a href={buildViatorAffiliateUrl(attraction.viatorUrl, placement)}
            target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-affiliate-partner="viator" data-affiliate-placement={placement}
            data-commercial-partner="viator" data-commercial-placement={placement}
            onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "experiences" })}
            className="mt-4 inline-flex text-sm font-semibold text-primary underline underline-offset-4">
            {label} ↗
          </a>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Affiliate disclosure: TexasDefined may earn a commission on qualifying Viator bookings, at no additional cost to you.
          </p>
        </section>
      ) : null}
      {["dr-pepper-museum-waco", "waco-suspension-bridge", "magnolia-market-at-the-silos"].includes(slug)
        ? <WacoViatorExperienceCards kind="ghost" title="Compare independently bookable Waco ghost walks" showDetails={false} /> : null}
      <nav aria-label="Waco attraction and tour guides" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <a href="/waco-attractions" className="text-primary underline underline-offset-4">Seven Waco attraction guides →</a>
        <a href="/waco-ghost-tours" className="text-primary underline underline-offset-4">Waco ghost-tour comparison →</a>
        <a href="/dallas-to-waco-magnolia-tours" className="text-primary underline underline-offset-4">Dallas-to-Waco day trips →</a>
      </nav>
    </div>
  );
}
