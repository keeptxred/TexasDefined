import type { Destination } from "@/data/types";
import { currentVerifiedOffers } from "@/data/authority/experience-registry";

const money = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
}).format(amount);

/**
 * Venue-specific projection of the SAME dated operator registry used by the
 * Fredericksburg multi-venue guide. No retyped prices or independent dates.
 */
export function VerifiedExperienceOffers({ destination }: { destination: Destination }) {
  const offers = currentVerifiedOffers().filter((offer) => offer.destinationSlug === destination.slug);
  if (!offers.length) return null;
  return (
    <section data-verified-experience-offers aria-labelledby="operator-offerings-heading"
      className="mt-10 border-t border-border pt-8">
      <p className="eyebrow text-primary">Published operator offerings</p>
      <h2 id="operator-offerings-heading" className="mt-2 font-display text-2xl">
        Current researched tastings at {destination.name}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        These prices and policies come from the winery's own published information, not a live booking feed.
        They are hidden when the source check expires. Choose an experience on the official operator page.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer.id} className="border border-border p-4">
            <h3 className="font-semibold">{offer.label}</h3>
            <p className="mt-1 text-lg font-semibold">{money(offer.priceUsd)} per guest</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {offer.durationMinutes === null ? "Ask operator about duration" : String(offer.durationMinutes) + " minutes"}
              {" · "}
              {offer.maxParty === null ? "Confirm group limit" : "Up to " + offer.maxParty + " guests"}
              {" · "}
              {offer.minAge === null ? "Verify age policy" : String(offer.minAge) + "+"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{offer.notes}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Checked <time dateTime={offer.checkedAt}>{offer.checkedAt}</time>
              {" · "}
              <a href={offer.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="text-primary underline underline-offset-4">Official offer details</a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
