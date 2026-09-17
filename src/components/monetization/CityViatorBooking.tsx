import { hasVerifiedViatorMarketUrl, verifiedViatorMarketUrl } from "@/data/viator-destination-links";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";

function cityNameFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function CityViatorBooking({ citySlug }: { citySlug: string }) {
  if (!hasVerifiedViatorMarketUrl(citySlug)) return null;

  const cityName = cityNameFromSlug(citySlug);
  const placement = `viator-city-${citySlug}`;
  const label = `Browse current ${cityName} experiences`;
  const href = buildViatorAffiliateUrl(
    verifiedViatorMarketUrl(citySlug),
    `texasdefined-city-${citySlug}`,
  );

  return (
    <section className="border-b border-border bg-surface/55 px-0 py-7 sm:py-8" aria-labelledby={`viator-city-${citySlug}`}>
      <p className="eyebrow text-primary">Tours & bookable experiences</p>
      <h2 id={`viator-city-${citySlug}`} className="mt-2 max-w-3xl font-display text-3xl leading-tight">
        Find things to do in {cityName}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        TexasDefined covers the city context and practical planning. Viator can be useful when you are ready to check current guided tours, tickets and organized experiences in {cityName}. Inventory and availability can change.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="viator"
          data-affiliate-placement={placement}
          data-commercial-partner="viator"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "city-experiences" })}
          className="inline-flex min-h-11 items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {label} ↗
        </a>
        <a href="/explore#tours-experiences" className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">
          Explore Texas experience markets →
        </a>
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you.
      </p>
    </section>
  );
}
