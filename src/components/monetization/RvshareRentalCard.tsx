import { trackAffiliateClick } from "@/lib/affiliate-click";

type Props = {
  className?: string;
  placement: string;
  title?: string;
};

const CJ_PUBLISHER_ID = "101876465";
const RVSHARE_DESTINATION = "https://rvshare.com/";
const RVSHARE_URL = `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/${encodeURI(RVSHARE_DESTINATION)}`;
const RVSHARE_LABEL = "Compare RV rentals on RVshare";

export function RvshareRentalCard({ className = "", placement, title = "Would an RV fit this trip better?" }: Props) {
  return (
    <aside className={className} aria-label="RV rental booking option">
      <div className="border border-border bg-surface p-6 sm:p-7">
        <p className="eyebrow text-primary">Camping & road-trip option</p>
        <h2 className="mt-3 font-display text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Compare RV rentals when camping, lake access or a multi-stop road trip makes taking your lodging with you useful. Availability, delivery, mileage and cancellation rules are handled by RVshare.
        </p>
        <a
          href={RVSHARE_URL}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          data-affiliate-partner="rvshare"
          data-affiliate-placement={placement}
          data-commercial-partner="rvshare"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({
            partner: "rvshare",
            label: RVSHARE_LABEL,
            placement,
            module: "rv-rental",
          })}
        >
          {RVSHARE_LABEL} ↗
        </a>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Affiliate disclosure: TexasDefined may earn a commission from qualifying RVshare reservations, at no additional cost to you.
        </p>
      </div>
    </aside>
  );
}

export const rvshareRentalAffiliate = {
  publisherId: CJ_PUBLISHER_ID,
  destination: RVSHARE_DESTINATION,
  affiliateUrl: RVSHARE_URL,
} as const;
