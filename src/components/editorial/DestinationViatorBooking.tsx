import type { Destination } from "@/data/types";

interface DestinationViatorBookingData {
  href: string;
  hasDedicatedInventory: boolean;
  signalMarketName: string | null;
  signalLanes: string[];
  reviewedAt: string;
  reviewedLabel: string;
}

function WmaHuntingLinks() {
  return (
    <nav aria-label="Hunting guides for this Wildlife Management Area" className="mt-8 border-t border-border pt-6">
      <p className="eyebrow text-primary">Plan a public hunt</p>
      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
        <a href="/hunting/public-hunting" className="eyebrow border-b border-primary pb-1 text-primary">Texas public hunting →</a>
        <a href="/hunting/annual-public-hunting-permit" className="eyebrow border-b border-primary pb-1 text-primary">Annual Public Hunting Permit →</a>
        <a href="/hunting/drawn-hunts" className="eyebrow border-b border-primary pb-1 text-primary">Texas drawn hunts →</a>
      </div>
    </nav>
  );
}

export function DestinationViatorBooking({ destination, booking }: { destination: Destination; booking: DestinationViatorBookingData | null }) {
  const huntingLinks = destination.id.startsWith("texas-wma-") ? <WmaHuntingLinks /> : null;
  if (!booking) return huntingLinks;

  return <>
    <section className="mt-10 border border-border bg-surface p-6 sm:p-7" aria-labelledby={`viator-${destination.slug}`}>
      <p className="eyebrow text-primary">Tours & bookable experiences</p>
      <h3 id={`viator-${destination.slug}`} className="mt-2 font-display text-3xl leading-tight">Add an experience around {destination.name}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">TexasDefined handles the destination planning. Viator can be useful for guided tours, tickets and organized activities near {destination.nearestTown}. Availability changes, so the booking link checks current inventory rather than promising a specific product.</p>
      {booking.signalMarketName && booking.signalLanes.length ? <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="font-semibold text-foreground">Recent {booking.signalMarketName} inventory signals:</strong> {booking.signalLanes.join(" · ")}. Reviewed <time dateTime={booking.reviewedAt}>{booking.reviewedLabel}</time>; exact products and availability can change.</p> : null}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a href={booking.href} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">{booking.hasDedicatedInventory ? `See current experiences near ${destination.name} ↗` : "Browse current Texas experiences ↗"}</a>
        <a href="/explore#tours-experiences" className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Explore Texas experience markets →</a>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>
    </section>
    {huntingLinks}
  </>;
}
